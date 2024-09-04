const express = require("express");
const courseController = require('../controllers/course.controller');
const upload = require('../middleware/uploadImage');

const router = express.Router();

//= ===============================
// Course routes
//= ===============================
router.post('/', courseController.addCourse);
router.post('/uploadcover/:id', upload.single('image'), courseController.uploadCoursePicture);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;