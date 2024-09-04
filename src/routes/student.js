const express = require("express");
const studentController = require('../controllers/student.controller');
const upload = require('../middleware/uploadImage');

const router = express.Router();

//= ===============================
// Student routes
//= ===============================
router.get('/', studentController.allStudent);
router.get('/me', studentController.profile);
router.post('/uploadpp', upload.single('image'), studentController.uploadProfilePicture);
router.put('/', studentController.updateProfile);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;