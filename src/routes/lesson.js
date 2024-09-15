const express = require("express");
const lessonController = require('../controllers/lesson.controller');
const upload = require('../middleware/uploadVideo');

const router = express.Router();

//= ===============================
// Lesson routes
//= ===============================
router.get('/', lessonController.allLesson);
router.get('/:id', lessonController.getLessonbyID);
router.post('/', lessonController.addLesson);
router.post('/uploadvideo/:id', upload.single('video'), lessonController.uploadVideo);
router.put('/:id', lessonController.updateLesson);
router.delete('/:id', lessonController.deleteLessson);

module.exports = router;