import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { appointmentService } from '../services/appointmentService';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    upcoming: 0,
    scheduled: 0,
    completed: 0,
    cancelled: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('appointment_date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAppointments, setTotalAppointments] = useState(0);

  // Fetch Dashboard Stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await appointmentService.getDashboardStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats', err);
    }
  }, []);

  // Fetch Appointments
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await appointmentService.getAppointments({
        search: searchTerm,
        status: statusFilter,
        sortBy,
        order: sortOrder,
        page,
        limit: 10,
      });

      if (res.success) {
        setAppointments(res.data);
        setTotalPages(res.totalPages);
        setTotalAppointments(res.total);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch appointments';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, sortBy, sortOrder, page]);

  // Initial load and refetch when filters change
  useEffect(() => {
    fetchAppointments();
    fetchStats();
  }, [fetchAppointments, fetchStats]);

  // Add Appointment
  const createAppointment = async (formData) => {
    try {
      const res = await appointmentService.createAppointment(formData);
      if (res.success) {
        toast.success('Appointment scheduled successfully!');
        fetchAppointments();
        fetchStats();
        return { success: true };
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      const errorMsg = errors ? errors.join(' ') : err.response?.data?.message || 'Error creating appointment';
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Update Appointment
  const updateAppointment = async (id, formData) => {
    try {
      const res = await appointmentService.updateAppointment(id, formData);
      if (res.success) {
        toast.success('Appointment updated successfully!');
        fetchAppointments();
        fetchStats();
        return { success: true };
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      const errorMsg = errors ? errors.join(' ') : err.response?.data?.message || 'Error updating appointment';
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Delete Appointment
  const deleteAppointment = async (id) => {
    try {
      const res = await appointmentService.deleteAppointment(id);
      if (res.success) {
        toast.success('Appointment deleted successfully!');
        fetchAppointments();
        fetchStats();
        return { success: true };
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error deleting appointment';
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        stats,
        loading,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        page,
        setPage,
        totalPages,
        totalAppointments,
        fetchAppointments,
        fetchStats,
        createAppointment,
        updateAppointment,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};
