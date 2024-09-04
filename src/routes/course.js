const express = require("express");
const courseController = require('../controllers/course.controller');

const router = express.Router();

//= ===============================
// Course routes
//= ===============================
router.post('/', courseController.addCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;