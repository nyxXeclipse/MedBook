import API from './api';

export const appointmentService = {
  // Get all appointments with query params
  getAppointments: async (params = {}) => {
    const response = await API.get('/appointments', { params });
    return response.data;
  },

  // Get single appointment by ID
  getAppointmentById: async (id) => {
    const response = await API.get(`/appointments/${id}`);
    return response.data;
  },

  // Create appointment
  createAppointment: async (appointmentData) => {
    const response = await API.post('/appointments', appointmentData);
    return response.data;
  },

  // Update appointment
  updateAppointment: async (id, appointmentData) => {
    const response = await API.put(`/appointments/${id}`, appointmentData);
    return response.data;
  },

  // Delete appointment
  deleteAppointment: async (id) => {
    const response = await API.delete(`/appointments/${id}`);
    return response.data;
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    const response = await API.get('/appointments/stats');
    return response.data;
  },
};
