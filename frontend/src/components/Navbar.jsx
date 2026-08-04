import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Plus, LayoutDashboard, Stethoscope } from 'lucide-react';

const Navbar = ({ onOpenCreateModal }) => {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <div className="navbar-brand">
          <div className="logo-icon">
            <Stethoscope size={22} color="#ffffff" />
          </div>
          <div className="brand-text">
            <span className="brand-title">MedBook</span>
            <span className="brand-subtitle">Appointment Booking System</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            end
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/appointments"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <Calendar size={18} />
            <span>Appointments</span>
          </NavLink>
        </nav>

        {/* Action Button */}
        <div className="navbar-actions">
          <button className="btn btn-primary" onClick={onOpenCreateModal}>
            <Plus size={18} />
            <span>New Appointment</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
