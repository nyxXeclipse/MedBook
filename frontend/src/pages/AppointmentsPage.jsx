import React from 'react';
import { useAppointments } from '../context/AppointmentContext';
import AppointmentTable from '../components/AppointmentTable';
import { Plus, Calendar } from 'lucide-react';

const AppointmentsPage = ({ onOpenCreateModal, onEditAppointment, onDeleteAppointment }) => {
  const {
    appointments,
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
  } = useAppointments();

  return (
    <div className="appointments-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Appointment Records</h1>
          <p className="page-subtitle">Search, filter, edit, and export patient appointment data.</p>
        </div>
        <button className="btn btn-primary" onClick={onOpenCreateModal}>
          <Plus size={18} />
          <span>New Appointment</span>
        </button>
      </div>

      <AppointmentTable
        appointments={appointments}
        loading={loading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        totalAppointments={totalAppointments}
        onEdit={onEditAppointment}
        onDelete={onDeleteAppointment}
        onOpenCreate={onOpenCreateModal}
      />
    </div>
  );
};

export default AppointmentsPage;
