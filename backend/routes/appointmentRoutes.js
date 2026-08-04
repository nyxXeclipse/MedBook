const express = require('express');
const router = express.Router();
const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getDashboardStats,
} = require('../controllers/appointmentController');
const { validateAppointment } = require('../middleware/validate');

// Dashboard Stats Route
router.get('/stats', getDashboardStats);

// Main CRUD Routes
router.route('/')
  .get(getAllAppointments)
  .post(validateAppointment, createAppointment);

router.route('/:id')
  .get(getAppointmentById)
  .put(validateAppointment, updateAppointment)
  .delete(deleteAppointment);

module.exports = router;
