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
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Table Toolbar */}
      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Field */}
        <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 lg:w-80">
          <Search size={18} className="text-slate-400" />
          <input
            type="text" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            placeholder="Search patient, doctor, or ID..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
          {searchTerm && (
            <button className="text-slate-400 hover:text-slate-700" onClick={() => setSearchTerm('')}>
              ×
            </button>
          )}
        </div>

        {/* Filters & Actions Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1 rounded-lg border border-slate-300 px-2 py-2 text-slate-500">
            <Filter size={15} />
            <select
              value={statusFilter} className="bg-transparent text-sm outline-none"
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
          <div className="flex items-center gap-1 rounded-lg border border-slate-300 px-2 py-2 text-slate-500">
            <ArrowUpDown size={15} />
            <select
              value={sortBy} className="bg-transparent text-sm outline-none"
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
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
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
      <div className="overflow-x-auto">
        {loading ? (
          <SkeletonLoader rows={6} />
        ) : appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="rounded-full bg-slate-100 p-4 text-slate-400">
              <CalendarX size={48} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">No Appointments Found</h3>
            <p className="mt-1 max-w-md text-sm text-slate-500">
              {searchTerm || statusFilter !== 'All'
                ? 'No appointments match your search/filter criteria. Try resetting filters.'
                : 'There are no appointments scheduled yet.'}
            </p>
            <div className="mt-5">
              {searchTerm || statusFilter !== 'All' ? (
                <button
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('All');
                  }}
                >
                  Reset Filters
                </button>
              ) : (
                <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700" onClick={onOpenCreate}>
                  <Plus size={16} />
                  <span>Schedule First Appointment</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                {['Patient Details', 'Doctor', 'Date & Time', 'Days Until', 'Fee', 'Status'].map((label) => <th key={label} className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</th>)}
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.map((appt) => (
                <tr key={appt._id} className="transition hover:bg-slate-50">
                  {/* Patient Details */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">{appt.patient_name}</span>
                      <span className="mt-0.5 text-xs text-slate-500">{appt.appointment_id || appt._id.slice(-6)}</span>
                    </div>
                  </td>

                  {/* Doctor Name */}
                  <td className="max-w-52 px-5 py-4">
                    <span className="block font-medium text-slate-700">{appt.doctor_name}</span>
                    {appt.reason && <span className="mt-0.5 block truncate text-xs text-slate-500">{appt.reason}</span>}
                  </td>

                  {/* Date & Time */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-700">{formatDate(appt.appointment_date)}</span>
                      <span className="text-xs text-slate-500">{appt.appointment_time}</span>
                    </div>
                  </td>

                  {/* Days Until Appointment */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <DaysUntilBadge date={appt.appointment_date} />
                  </td>

                  {/* Fee */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="font-semibold text-slate-700">{formatCurrency(appt.fee)}</span>
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <StatusBadge status={appt.status} />
                  </td>

                  {/* Actions */}
                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        onClick={() => onEdit(appt)}
                        title="Edit Appointment"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
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
        <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="text-slate-500">
            Showing <strong>{appointments.length}</strong> of <strong>{totalAppointments}</strong> appointments
          </span>
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg border border-slate-300 px-3 py-1.5 font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <span className="text-slate-600">
              Page {page} of {totalPages}
            </span>
            <button
              className="rounded-lg border border-slate-300 px-3 py-1.5 font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
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
