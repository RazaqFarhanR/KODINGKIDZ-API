const express = require("express");
const lessonController = require('../controllers/lesson.controller');

const router = express.Router();

//= ===============================
// Course routes
//= ===============================
router.get('/', lessonController.allLesson);
router.get('/:id', lessonController.getLessonbyID);
router.post('/', lessonController.addLesson);
router.put('/:id', lessonController.updateLesson);
router.delete('/:id', lessonController.deleteLessson);

module.exports = router;