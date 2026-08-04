import React from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  let badgeClass = 'status-scheduled';
  let Icon = Clock;

  if (status === 'Completed') {
    badgeClass = 'status-completed';
    Icon = CheckCircle2;
  } else if (status === 'Cancelled') {
    badgeClass = 'status-cancelled';
    Icon = XCircle;
  }

  return (
    <span className={`status-badge ${badgeClass}`}>
      <Icon size={12} />
      <span>{status}</span>
    </span>
  );
};

export default StatusBadge;
