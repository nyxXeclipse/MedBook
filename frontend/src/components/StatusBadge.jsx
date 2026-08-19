import React from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  let badgeClass = 'bg-indigo-100 text-indigo-700';
  let Icon = Clock;

  if (status === 'Completed') {
    badgeClass = 'bg-emerald-100 text-emerald-700';
    Icon = CheckCircle2;
  } else if (status === 'Cancelled') {
    badgeClass = 'bg-red-100 text-red-700';
    Icon = XCircle;
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}>
      <Icon size={12} />
      <span>{status}</span>
    </span>
  );
};

export default StatusBadge;
