import React from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass, subtext, onClick }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" onClick={onClick} role={onClick ? 'button' : 'region'}>
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        {Icon && (
          <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
        {subtext && <p className="mt-1 text-xs text-slate-500">{subtext}</p>}
      </div>
    </div>
  );
};

export default StatCard;
