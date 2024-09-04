const models = require("../models/index")
const Course = models.course
const Response = require("../helpers/response")
require('dotenv').config()

module.exports = {
    allCourse: async (req, res) => {
        try {
            const result = await Course.findAll({})

            return Response.getResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    getCoursebyID: async (req, res) => {
        try {
            const param = {id: req.params.id}
            const result = await Course.findOne({where: param})

            return Response.getResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    addCourse: async (req, res) => {
        try {
            let data = {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            }

            const result = await Course.create(data)
            return Response.addResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    updateCourse: async (req, res) => {
        try {
            const param = {id: req.params.id}

            let data = {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            }

            const result = await Course.update(data, {where: param})
            return Response.editResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    deleteCourse: async (req, res) => {
        try {
            const param = {id: req.params.id}
            const result = await Course.destroy({where: param})
            return Response.deleteResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    }
}