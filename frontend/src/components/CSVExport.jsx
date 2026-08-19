import React from 'react';
import { Download } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import { formatCurrency } from '../utils/currencyUtils';

const CSVExport = ({ data }) => {
  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    const headers = ['ID', 'Patient Name', 'Doctor Name', 'Date', 'Time', 'Reason', 'Fee', 'Status'];

    const rows = data.map((item) => [
      `"${item.appointment_id || ''}"`,
      `"${item.patient_name || ''}"`,
      `"${item.doctor_name || ''}"`,
      `"${formatDate(item.appointment_date)}"`,
      `"${item.appointment_time || ''}"`,
      `"${(item.reason || '').replace(/"/g, '""')}"`,
      `"${item.fee || 0}"`,
      `"${item.status || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Appointments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50" onClick={exportToCSV} disabled={!data || data.length === 0} title="Export appointments list to CSV">
      <Download size={16} />
      <span>Export CSV</span>
    </button>
  );
};

export default CSVExport;
