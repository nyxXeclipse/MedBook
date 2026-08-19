import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { X, Calendar, Clock, DollarSign, User, Stethoscope, FileText } from 'lucide-react';
import { formatDateForInput } from '../utils/dateUtils';

export const indianDoctorOptions = [
  'Dr. Rajesh Sharma (Cardiology)',
  'Dr. Ananya Patel (Dermatology)',
  'Dr. Vikram Malhotra (Neurology)',
  'Dr. Priya Sundaram (Orthopedics)',
  'Dr. Amitav Mukherji (General Medicine)',
  'Dr. Sunita Deshmukh (Pediatrics)',
  'Dr. Suresh Verma (ENT Specialist)',
];

const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
];

// Formik Validation Schema using Yup
const appointmentValidationSchema = Yup.object().shape({
  patient_name: Yup.string()
    .trim()
    .min(2, 'Patient name must be at least 2 characters.')
    .required('Patient name is required.'),
  doctor_name: Yup.string().required('Doctor selection is required.'),
  appointment_date: Yup.string()
    .required('Appointment date is required.')
    .test('not-in-past', 'Appointment date cannot be in the past.', function (value) {
      if (!value || this.options.context?.isEditing) return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(value);
      selectedDate.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),
  appointment_time: Yup.string().required('Time slot selection is required.'),
  reason: Yup.string().max(250, 'Reason cannot exceed 250 characters.'),
  fee: Yup.number()
    .typeError('Fee must be a valid number.')
    .min(0, 'Fee cannot be negative.')
    .required('Fee is required.'),
  status: Yup.string().oneOf(['Scheduled', 'Completed', 'Cancelled']),
});

const AppointmentModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const isEditing = !!initialData;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      patient_name: initialData?.patient_name || '',
      doctor_name: initialData?.doctor_name || indianDoctorOptions[0],
      appointment_date: formatDateForInput(initialData?.appointment_date) || formatDateForInput(new Date()),
      appointment_time: initialData?.appointment_time || '10:00 AM',
      reason: initialData?.reason || '',
      fee: initialData?.fee !== undefined ? initialData.fee : 500,
      status: initialData?.status || 'Scheduled',
    },
    validationSchema: appointmentValidationSchema,
    validationContext: { isEditing },
    onSubmit: async (values, { setSubmitting }) => {
      const result = await onSubmit(values);
      setSubmitting(false);
      if (result && result.success) {
        onClose();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{isEditing ? 'Edit Appointment' : 'Schedule New Appointment'}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {isEditing ? `Updating ${initialData.appointment_id}` : 'Fill in patient and consultation details'}
            </p>
          </div>
          <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Form using Formik */}
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 p-6 sm:grid-cols-2">
            {/* Patient Name */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700" htmlFor="patient_name">
                <User size={15} /> Patient Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="patient_name"
                name="patient_name"
                placeholder="e.g. Aarav Sharma"
                value={formik.values.patient_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${formik.touched.patient_name && formik.errors.patient_name ? 'border-red-400 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'}`}
              />
              {formik.touched.patient_name && formik.errors.patient_name && (
                <span className="mt-1 block text-xs text-red-600">{formik.errors.patient_name}</span>
              )}
            </div>

            {/* Doctor Selection */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700" htmlFor="doctor_name">
                <Stethoscope size={15} /> Select Doctor <span className="required">*</span>
              </label>
              <select
                id="doctor_name"
                name="doctor_name"
                value={formik.values.doctor_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${formik.touched.doctor_name && formik.errors.doctor_name ? 'border-red-400 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'}`}
              >
                {indianDoctorOptions.map((doc) => (
                  <option key={doc} value={doc}>
                    {doc}
                  </option>
                ))}
              </select>
              {formik.touched.doctor_name && formik.errors.doctor_name && (
                <span className="mt-1 block text-xs text-red-600">{formik.errors.doctor_name}</span>
              )}
            </div>

            {/* Appointment Date */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700" htmlFor="appointment_date">
                <Calendar size={15} /> Appointment Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="appointment_date"
                name="appointment_date"
                value={formik.values.appointment_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${formik.touched.appointment_date && formik.errors.appointment_date ? 'border-red-400 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'}`}
              />
              {formik.touched.appointment_date && formik.errors.appointment_date && (
                <span className="mt-1 block text-xs text-red-600">{formik.errors.appointment_date}</span>
              )}
            </div>

            {/* Time Slot */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700" htmlFor="appointment_time">
                <Clock size={15} /> Time Slot <span className="required">*</span>
              </label>
              <select
                id="appointment_time"
                name="appointment_time"
                value={formik.values.appointment_time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${formik.touched.appointment_time && formik.errors.appointment_time ? 'border-red-400 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'}`}
              >
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {formik.touched.appointment_time && formik.errors.appointment_time && (
                <span className="mt-1 block text-xs text-red-600">{formik.errors.appointment_time}</span>
              )}
            </div>

            {/* Consultation Fee */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700" htmlFor="fee">
                <DollarSign size={15} /> Consultation Fee <span className="required">*</span>
              </label>
              <input
                type="number"
                id="fee"
                name="fee"
                min="0"
                step="50"
                placeholder="500"
                value={formik.values.fee}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${formik.touched.fee && formik.errors.fee ? 'border-red-400 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'}`}
              />
              {formik.touched.fee && formik.errors.fee && (
                <span className="mt-1 block text-xs text-red-600">{formik.errors.fee}</span>
              )}
            </div>

            {/* Status Choice */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="status">Appointment Status</label>
              <select className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Reason */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700" htmlFor="reason">
                <FileText size={15} /> Reason for Visit (Optional)
              </label>
              <textarea
                id="reason"
                name="reason"
                rows="2"
                placeholder="e.g. Routine health checkup or specific symptoms..."
                value={formik.values.reason}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${formik.touched.reason && formik.errors.reason ? 'border-red-400 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'}`}
              ></textarea>
              {formik.touched.reason && formik.errors.reason && (
                <span className="mt-1 block text-xs text-red-600">{formik.errors.reason}</span>
              )}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              onClick={onClose}
              disabled={formik.isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Saving...' : isEditing ? 'Update Appointment' : 'Confirm Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
