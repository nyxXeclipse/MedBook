const Appointment = require('../models/Appointment');

/**
 * @desc    Get all appointments (with Search, Filter, Sort, Pagination)
 * @route   GET /api/appointments
 * @access  Public
 */
const getAllAppointments = async (req, res, next) => {
  try {
    const { search, status, sortBy, order, page = 1, limit = 50 } = req.query;

    // Build Search & Filter Query
    const query = {};

    if (search) {
      query.$or = [
        { patient_name: { $regex: search, $options: 'i' } },
        { doctor_name: { $regex: search, $options: 'i' } },
        { reason: { $regex: search, $options: 'i' } },
        { appointment_id: { $regex: search, $options: 'i' } },
      ];
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    // Build Sorting
    const sortField = sortBy || 'appointment_date';
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortOption = { [sortField]: sortOrder };

    // Execute query with pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const appointments = await Appointment.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    const totalCount = await Appointment.countDocuments(query);

    res.status(200).json({
      success: true,
      count: appointments.length,
      total: totalCount,
      page: pageNum,
      totalPages: Math.ceil(totalCount / limitNum) || 1,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single appointment by ID
 * @route   GET /api/appointments/:id
 * @access  Public
 */
const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new appointment
 * @route   POST /api/appointments
 * @access  Public
 */
const createAppointment = async (req, res, next) => {
  try {
    const { patient_name, doctor_name, appointment_date, appointment_time, reason, fee, status } = req.body;

    const appointment = await Appointment.create({
      patient_name: patient_name.trim(),
      doctor_name: doctor_name.trim(),
      appointment_date,
      appointment_time: appointment_time.trim(),
      reason: reason ? reason.trim() : 'General Consultation',
      fee: Number(fee),
      status: status || 'Scheduled',
    });

    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully!',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update appointment
 * @route   PUT /api/appointments/:id
 * @access  Public
 */
const updateAppointment = async (req, res, next) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully!',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete appointment
 * @route   DELETE /api/appointments/:id
 * @access  Public
 */
const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    await appointment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully!',
      id: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get Summary Statistics for Dashboard
 * @route   GET /api/appointments/stats
 * @access  Public
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const completedAppointments = await Appointment.countDocuments({ status: 'Completed' });
    const cancelledAppointments = await Appointment.countDocuments({ status: 'Cancelled' });
    const scheduledAppointments = await Appointment.countDocuments({ status: 'Scheduled' });

    // Calculate Today's Appointments
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const todayAppointments = await Appointment.countDocuments({
      appointment_date: { $gte: startOfToday, $lte: endOfToday },
    });

    // Calculate Upcoming Appointments (date > end of today and status === Scheduled)
    const upcomingAppointments = await Appointment.countDocuments({
      appointment_date: { $gt: endOfToday },
      status: 'Scheduled',
    });

    // Calculate Total Revenue from Completed appointments
    const revenueResult = await Appointment.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$fee' } } },
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      data: {
        total: totalAppointments,
        today: todayAppointments,
        upcoming: upcomingAppointments,
        scheduled: scheduledAppointments,
        completed: completedAppointments,
        cancelled: cancelledAppointments,
        revenue: totalRevenue,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getDashboardStats,
};
