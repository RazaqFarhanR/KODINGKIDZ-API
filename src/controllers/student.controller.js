const models = require("../models/index")
const Student = models.student
const Response = require("../helpers/response")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { Sequelize } = require('sequelize');
const deleteImageFromCloudinary = require("../helpers/deleteImage");

module.exports = {
    allStudent: async (req, res) => {
        try {
            const result = await Student.findAll({
                attributes: {
                    exclude: ['imageId', 'password', 'createdAt', 'updatedAt']
                }
            })
            const updatedResults = result.map(student => {
                const studentObject = student.toJSON();
                if (!studentObject.imageUrl) {
                    studentObject.imageUrl = `${req.protocol}://${req.get('host')}/src/image/profile/avatar.jpg`;
                }
                return studentObject;
            });

            return Response.getResponse(req, res, updatedResults)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    profile: async (req, res) => {
        try {
            const result = await Student.findOne({
                where: {id: req.user.id},
                attributes: {
                    exclude: ['imageId', 'password', 'createdAt', 'updatedAt']
                }
            })
            if (result && !result.imageUrl) {
                result.imageUrl = `${req.protocol}://${req.get('host')}/src/image/profile/avatar.jpg`;
            }
            return Response.getResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(12);
            const hashPass = await bcrypt.hash(req.body.password, salt);

            let data = {
                name: req.body.name,
                email: req.body.email,
                no_tlp: req.body.no_tlp,
                password: hashPass
            }

            const result = await Student.create(data)
            delete data.password
            return Response.addResponse(req, res, data)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    updateProfile: async (req, res) => {
        try {
            let data = {
                name: req.body.name,
                email: req.body.email,
                no_tlp: req.body.no_tlp,
                dateOfBirth: req.body.dateOfBirth,
                gender: req.body.gender,
                domicile: req.body.domicile
            }

            const result = await Student.update(data, {where: {id: req.user.id}})
            return Response.editResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    uploadProfilePicture: async (req, res) => {
        try {
            const param = {id: req.user.id}
            if (!req.file) {
                return res.status(400).json({ message: 'No image uploaded' });
              }
            const student = await Student.findOne({where: param})
            if (student.imageId) {
                await deleteImageFromCloudinary(student.imageId)
            }

            let data = {
                imageId: req.file.filename,
                imageUrl: req.file.path
            }

            const result = await Student.update(data, {where: param})
            return Response.editResponse(req, res, result)
        } catch (error) {
            if (req.file) {
                await deleteImageFromCloudinary(student.imageId)
            }
            return Response.errorResponse(req, res, error.message)
        }
    },

    deleteStudent: async (req, res) => {
        try {
            const param = {id: req.params.id}
            const student = await Student.findOne({where: param})
            if (student && student.imageId) {
                await deleteImageFromCloudinary(student.imageId)
            }
    
            // delete data
            const delStndt = await Student.destroy({where: param})
            return Response.deleteResponse(req, res, delStndt)
        } catch (error) {
            res.json({
                message: error.message
            })
        }
    },

    loginStudent: async (req, res) => {
        try {
            const student = await Student.findOne({
                where: {
                    [Sequelize.Op.or]: [
                        { email: req.body.email },
                        { no_tlp: req.body.email }
                    ]
                }
            })
            if (student) {
                const match = await bcrypt.compare(req.body.password, student.password);
                if (!match) return res.status(401).json({ message: "Username or password is incorrect" });

                const data = {
                    id: student.id,
                    name: student.name,
                    email: student.email,
                    no_tlp: student.no_tlp
                }

                const token = jwt.sign({id: student.id, role: "student"}, process.env.JWT_SECRET)
                res.json({
                    message: "successfully logged in",
                    data: data,
                    token: token
                })
            } else {
                return res.status(401).json({ message: "Username or password is incorrect" });
            }   
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    }
}
