import React from 'react';
import { calculateDaysUntil } from '../utils/dateUtils';
import { Clock } from 'lucide-react';

const DaysUntilBadge = ({ date }) => {
  const { label, badgeType } = calculateDaysUntil(date);

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badgeType === 'today' ? 'bg-emerald-100 text-emerald-700' : badgeType === 'past' ? 'bg-slate-100 text-slate-600' : 'bg-blue-100 text-blue-700'}`}>
      <Clock size={12} />
      {label}
    </span>
  );
};

export default DaysUntilBadge;
