import React from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass, subtext, onClick }) => {
  return (
    <div className={`stat-card ${colorClass}`} onClick={onClick} role={onClick ? 'button' : 'region'}>
      <div className="stat-card-header">
        <span className="stat-title">{title}</span>
        {Icon && (
          <div className="stat-icon-wrapper">
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="stat-card-body">
        <h3 className="stat-value">{value}</h3>
        {subtext && <p className="stat-subtext">{subtext}</p>}
      </div>
    </div>
  );
};

export default StatCard;
