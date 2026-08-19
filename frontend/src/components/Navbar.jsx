import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Plus, LayoutDashboard, Stethoscope } from 'lucide-react';

const Navbar = ({ onOpenCreateModal }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-18 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-blue-600 shadow-sm">
            <Stethoscope size={22} color="#ffffff" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900">MedBook</span>
            <span className="text-xs text-slate-500">Appointment Booking System</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="order-3 flex w-full gap-1 sm:order-2 sm:w-auto">
          <NavLink
            to="/"
            className={({ isActive }) => `flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition sm:flex-none ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            end
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/appointments"
            className={({ isActive }) => `flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition sm:flex-none ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            <Calendar size={18} />
            <span>Appointments</span>
          </NavLink>
        </nav>

        {/* Action Button */}
        <div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={onOpenCreateModal}>
            <Plus size={18} />
            <span>New Appointment</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
