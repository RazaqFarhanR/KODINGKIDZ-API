const models = require("../models/index")
const Admin = models.admin
const Response = require("../helpers/response")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require('dotenv').config()

module.exports = {
    allAdmin: async (req, res) => {
        try {
            const result = await Admin.findAll({
                attributes: ['id', 'username']
            })
            return Response.getResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    profile: async (req, res) => {
        try {
            const result = await Admin.findOne({
                where: {id: req.user.id},
                attributes: ['id','username']
            })
            return Response.getResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    addAdmin: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(12);
            const hashPass = await bcrypt.hash(req.body.password, salt);

            let data = {
                username: req.body.username,
                password: hashPass
            }

            const result = await Admin.create(data)
            return Response.addResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    updateAdmin: async (req, res) => {
        try {
            let param = {id: req.params.id}
            let data = {
                username: req.body.username
            }
            const result = await Admin.update(data, {where:param})
            Response.editResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    deleteAdmin: async (req, res) => {
        try {
            let param = {id: req.params.id}
            const result = await Admin.destroy({where:param})
            Response.deleteResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    loginAdmin: async (req, res) => {
        try {
            const admin = await Admin.findOne({
                where: {
                    username: req.body.username
                }
            })
            if (admin) {
                const match = await bcrypt.compare(req.body.password, admin.password);
                if (!match) return res.status(400).json({ msg: "Username or password is incorrect" });

                const data = {
                    id: admin.id,
                    username: admin.username
                }

                const token = jwt.sign({id: admin.id, role: "admin"}, process.env.JWT_SECRET)
                res.json({
                    logged: true,
                    data: data,
                    token: token
                })
            } else {
                res.json({
                    logged: false,
                    message: "Username or password is incorrect",
                    data: []
                })
            }   
        } catch (error) {
            Response.errorResponse(req, res, error.message)
        }
    }
}
