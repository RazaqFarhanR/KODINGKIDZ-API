const express = require("express");
const adminController = require('../controllers/admin.controller');

const router = express.Router();

//= ===============================
// Admin routes
//= ===============================
router.get('/', adminController.allAdmin);
router.get('/me', adminController.profile);
router.post('/', adminController.addAdmin);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;