const express = require("express");
const adminController = require('../controllers/admin.controller');
const studentController = require("../controllers/student.controller");
const courseController = require("../controllers/course.controller");

const router = express.Router();

//= ===============================
// Public routes
//= ===============================
router.post('/admin/login', adminController.loginAdmin);

router.post('/student/register', studentController.register);
router.post('/student/login', studentController.loginStudent);

router.get('/course', courseController.allCourse)
router.get('/course/:id', courseController.getCoursebyID)


module.exports = router;