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
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Appointment Records</h1>
          <p className="mt-1 text-sm text-slate-500">Search, filter, edit, and export patient appointment data.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700" onClick={onOpenCreateModal}>
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
