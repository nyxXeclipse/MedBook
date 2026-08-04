const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    appointment_id: {
      type: String,
      unique: true,
      trim: true,
    },
    patient_name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
      minlength: [2, 'Patient name must be at least 2 characters long'],
    },
    doctor_name: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },
    appointment_date: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    appointment_time: {
      type: String,
      required: [true, 'Appointment time is required'],
      trim: true,
    },
    reason: {
      type: String,
      trim: true,
      default: 'General Consultation',
    },
    status: {
      type: String,
      enum: {
        values: ['Scheduled', 'Completed', 'Cancelled'],
        message: '{VALUE} is not a valid status',
      },
      default: 'Scheduled',
    },
    fee: {
      type: Number,
      required: [true, 'Appointment fee is required'],
      min: [0, 'Fee cannot be negative'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// Pre-save hook to generate readable appointment_id if not present
appointmentSchema.pre('save', async function (next) {
  if (!this.appointment_id) {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    this.appointment_id = `APT-${Date.now().toString().slice(-4)}${randomCode}`;
  }
  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);
