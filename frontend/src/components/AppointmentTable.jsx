import React from 'react';
import { Edit2, Trash2, Search, Filter, ArrowUpDown, CalendarX, Plus } from 'lucide-react';
import DaysUntilBadge from './DaysUntilBadge';
import StatusBadge from './StatusBadge';
import SkeletonLoader from './SkeletonLoader';
import CSVExport from './CSVExport';
import { formatDate } from '../utils/dateUtils';
import { formatCurrency } from '../utils/currencyUtils';

const AppointmentTable = ({
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
  onEdit,
  onDelete,
  onOpenCreate,
}) => {
  return (
    <div className="table-card">
      {/* Table Toolbar */}
      <div className="table-toolbar">
        {/* Search Field */}
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search patient, doctor, or ID..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              ×
            </button>
          )}
        </div>

        {/* Filters & Actions Group */}
        <div className="toolbar-actions">
          {/* Status Filter */}
          <div className="filter-select-group">
            <Filter size={15} className="filter-icon" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="filter-select-group">
            <ArrowUpDown size={15} className="filter-icon" />
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
              }}
            >
              <option value="appointment_date">Sort by Date</option>
              <option value="patient_name">Sort by Patient</option>
              <option value="fee">Sort by Fee</option>
            </select>
          </div>

          {/* Sort Order Toggle */}
          <button
            className="btn btn-outline btn-icon"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
          </button>

          {/* CSV Export */}
          <CSVExport data={appointments} />
        </div>
      </div>

      {/* Table Container */}
      <div className="table-responsive">
        {loading ? (
          <SkeletonLoader rows={6} />
        ) : appointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <CalendarX size={48} />
            </div>
            <h3>No Appointments Found</h3>
            <p>
              {searchTerm || statusFilter !== 'All'
                ? 'No appointments match your search/filter criteria. Try resetting filters.'
                : 'There are no appointments scheduled yet.'}
            </p>
            <div className="empty-state-actions">
              {searchTerm || statusFilter !== 'All' ? (
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('All');
                  }}
                >
                  Reset Filters
                </button>
              ) : (
                <button className="btn btn-primary" onClick={onOpenCreate}>
                  <Plus size={16} />
                  <span>Schedule First Appointment</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Patient Details</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Days Until</th>
                <th>Fee</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id}>
                  {/* Patient Details */}
                  <td>
                    <div className="patient-cell">
                      <span className="patient-name">{appt.patient_name}</span>
                      <span className="patient-id">{appt.appointment_id || appt._id.slice(-6)}</span>
                    </div>
                  </td>

                  {/* Doctor Name */}
                  <td>
                    <span className="doctor-name">{appt.doctor_name}</span>
                    {appt.reason && <span className="reason-subtext">{appt.reason}</span>}
                  </td>

                  {/* Date & Time */}
                  <td>
                    <div className="date-time-cell">
                      <span className="date-text">{formatDate(appt.appointment_date)}</span>
                      <span className="time-text">{appt.appointment_time}</span>
                    </div>
                  </td>

                  {/* Days Until Appointment */}
                  <td>
                    <DaysUntilBadge date={appt.appointment_date} />
                  </td>

                  {/* Fee */}
                  <td>
                    <span className="fee-text">{formatCurrency(appt.fee)}</span>
                  </td>

                  {/* Status */}
                  <td>
                    <StatusBadge status={appt.status} />
                  </td>

                  {/* Actions */}
                  <td className="text-right">
                    <div className="action-buttons">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => onEdit(appt)}
                        title="Edit Appointment"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => onDelete(appt)}
                        title="Delete Appointment"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Table Pagination */}
      {!loading && appointments.length > 0 && (
        <div className="table-pagination">
          <span className="pagination-info">
            Showing <strong>{appointments.length}</strong> of <strong>{totalAppointments}</strong> appointments
          </span>
          <div className="pagination-controls">
            <button
              className="btn btn-secondary btn-sm"
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <span className="page-number">
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-secondary btn-sm"
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;
