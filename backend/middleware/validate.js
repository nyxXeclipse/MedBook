/**
 * Input validation middleware for Appointment Creation & Updates
 */

const validateAppointment = (req, res, next) => {
  const { patient_name, doctor_name, appointment_date, appointment_time, fee, status } = req.body;
  const errors = [];

  // Patient Name Validation
  if (!patient_name || typeof patient_name !== 'string' || !patient_name.trim()) {
    errors.push('Patient name is required.');
  }

  // Doctor Name Validation
  if (!doctor_name || typeof doctor_name !== 'string' || !doctor_name.trim()) {
    errors.push('Doctor name is required.');
  }

  // Appointment Date Validation
  if (!appointment_date) {
    errors.push('Appointment date is required.');
  } else {
    const inputDate = new Date(appointment_date);
    if (isNaN(inputDate.getTime())) {
      errors.push('Invalid appointment date format.');
    } else if (req.method === 'POST') {
      // Check if date is in the past (compare start of day in local time)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const checkDate = new Date(inputDate);
      checkDate.setHours(0, 0, 0, 0);

      if (checkDate < today) {
        errors.push('Appointment date cannot be in the past.');
      }
    }
  }

  // Appointment Time Validation
  if (!appointment_time || typeof appointment_time !== 'string' || !appointment_time.trim()) {
    errors.push('Appointment time is required.');
  }

  // Fee Validation
  if (fee === undefined || fee === null || isNaN(Number(fee))) {
    errors.push('Fee must be a valid number.');
  } else if (Number(fee) < 0) {
    errors.push('Fee cannot be negative.');
  }

  // Status Validation (if provided)
  if (status && !['Scheduled', 'Completed', 'Cancelled'].includes(status)) {
    errors.push('Status must be Scheduled, Completed, or Cancelled.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors,
    });
  }

  next();
};

module.exports = { validateAppointment };
