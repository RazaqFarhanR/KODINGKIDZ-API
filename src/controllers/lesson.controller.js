const models = require("../models/index")
const Lesson = models.lesson
const Response = require("../helpers/response")
require('dotenv').config()

module.exports = {
    allLesson: async (req, res) => {
        try {
            let param
            if (req.query.course) {
                param = {courseId: req.query.course}
            }

            const result = await Lesson.findAll({
                where: param,
                order: [['chapter', 'ASC']]
            })
            return Response.getResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    getLessonbyID: async (req, res) => {
        try {
            const param = {id: req.params.id}
            const result = await Lesson.findOne({where: param})

            return Response.getResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    addLesson: async (req, res) => {
        try {
            let chapterNow = 1
            const lessons = await Lesson.findOne({
                order: [['chapter', 'DESC']],
                attributes: ['chapter'],
            })

            if (lessons) {
                chapterNow += lessons.chapter
            }
            let data = {
                title: req.body.title,
                courseId: req.body.courseId,
                description: req.body.description,
                chapter: chapterNow
            }

            const result = await Lesson.create(data)
            return Response.addResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    updateLesson: async (req, res) => {
        try {
            const param = {id: req.params.id}

            let data = {
                title: req.body.title,
                description: req.body.description
            }

            const result = await Lesson.update(data, {where: param})
            return Response.editResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    },

    deleteLessson: async (req, res) => {
        try {
            const param = {id: req.params.id}
            const result = await Lesson.destroy({where: param})
            return Response.deleteResponse(req, res, result)
        } catch (error) {
            return Response.errorResponse(req, res, error.message)
        }
    }
}