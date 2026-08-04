import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppointmentProvider, useAppointments } from './context/AppointmentContext';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import AppointmentsPage from './pages/AppointmentsPage';
import AppointmentModal from './components/AppointmentModal';
import DeleteModal from './components/DeleteModal';

const AppContent = () => {
  const { createAppointment, updateAppointment, deleteAppointment } = useAppointments();

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [deletingAppointment, setDeletingAppointment] = useState(null);

  // Handlers
  const handleOpenCreate = () => {
    setEditingAppointment(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (appointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAppointment(null);
  };

  const handleFormSubmit = async (formData) => {
    if (editingAppointment) {
      return await updateAppointment(editingAppointment._id, formData);
    } else {
      return await createAppointment(formData);
    }
  };

  const handleOpenDelete = (appointment) => {
    setDeletingAppointment(appointment);
  };

  const handleCloseDelete = () => {
    setDeletingAppointment(null);
  };

  const handleConfirmDelete = async (id) => {
    return await deleteAppointment(id);
  };

  return (
    <div className="app-container">
      {/* React Hot Toast Provider Container */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            borderRadius: '10px',
            padding: '12px 16px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          },
          success: {
            style: {
              background: '#15803d',
              color: '#ffffff',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#15803d',
            },
          },
          error: {
            style: {
              background: '#b91c1c',
              color: '#ffffff',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#b91c1c',
            },
          },
        }}
      />

      <Navbar onOpenCreateModal={handleOpenCreate} />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                onOpenCreateModal={handleOpenCreate}
                onEditAppointment={handleOpenEdit}
                onDeleteAppointment={handleOpenDelete}
              />
            }
          />
          <Route
            path="/appointments"
            element={
              <AppointmentsPage
                onOpenCreateModal={handleOpenCreate}
                onEditAppointment={handleOpenEdit}
                onDeleteAppointment={handleOpenDelete}
              />
            }
          />
        </Routes>
      </main>

      {/* Clean Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <p>© {new Date().getFullYear()} MedBook Appointment Booking System. All rights reserved.</p>
        </div>
      </footer>

      {/* Appointment Create/Edit Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={editingAppointment}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!deletingAppointment}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        appointment={deletingAppointment}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppointmentProvider>
        <AppContent />
      </AppointmentProvider>
    </Router>
  );
}

export default App;
