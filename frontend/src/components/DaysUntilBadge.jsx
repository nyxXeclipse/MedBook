import React from 'react';
import { calculateDaysUntil } from '../utils/dateUtils';
import { Clock } from 'lucide-react';

const DaysUntilBadge = ({ date }) => {
  const { label, badgeType } = calculateDaysUntil(date);

  return (
    <span className={`badge badge-days badge-${badgeType}`}>
      <Clock size={12} className="badge-icon" />
      {label}
    </span>
  );
};

export default DaysUntilBadge;
