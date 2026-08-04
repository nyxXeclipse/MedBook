import React from 'react';
import { useAppointments } from '../context/AppointmentContext';
import StatCard from '../components/StatCard';
import AppointmentTable from '../components/AppointmentTable';
import { Calendar, CalendarCheck, CalendarDays, CheckCircle2, XCircle, DollarSign, Plus } from 'lucide-react';
import { formatCurrency } from '../utils/currencyUtils';

const DashboardPage = ({ onOpenCreateModal, onEditAppointment, onDeleteAppointment }) => {
  const {
    stats,
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
    <div className="dashboard-page">
      {/* Welcome Banner */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Track, schedule, and manage patient appointments efficiently.</p>
        </div>
        <button className="btn btn-primary btn-lg" onClick={onOpenCreateModal}>
          <Plus size={18} />
          <span>New Appointment</span>
        </button>
      </div>

      {/* KPI Statistic Cards Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Appointments"
          value={stats.total}
          icon={Calendar}
          colorClass="stat-blue"
          subtext="All time appointments"
        />
        <StatCard
          title="Today's Appointments"
          value={stats.today}
          icon={CalendarCheck}
          colorClass="stat-teal"
          subtext="Scheduled for today"
        />
        <StatCard
          title="Upcoming Appointments"
          value={stats.upcoming}
          icon={CalendarDays}
          colorClass="stat-indigo"
          subtext="Scheduled in future"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          colorClass="stat-green"
          subtext="Successfully attended"
        />
        <StatCard
          title="Cancelled"
          value={stats.cancelled}
          icon={XCircle}
          colorClass="stat-red"
          subtext="Cancelled consultations"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.revenue)}
          icon={DollarSign}
          colorClass="stat-amber"
          subtext="From completed appointments"
        />
      </div>

      {/* Main Appointment Table Section */}
      <div className="section-header">
        <h2>Recent & Managed Appointments</h2>
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

export default DashboardPage;
