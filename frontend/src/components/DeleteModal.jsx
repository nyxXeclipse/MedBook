import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, appointment }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !appointment) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    await onConfirm(appointment._id);
    setIsDeleting(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()} role="dialog">
        <div className="delete-modal-body">
          <div className="delete-icon-wrapper">
            <AlertTriangle size={28} className="delete-icon" />
          </div>
          <h3>Delete Appointment?</h3>
          <p>
            Are you sure you want to delete appointment for{' '}
            <strong>{appointment.patient_name}</strong> with <strong>{appointment.doctor_name}</strong>?
          </p>
          <span className="delete-warning-subtext">This action cannot be undone.</span>
        </div>

        <div className="modal-footer justify-center">
          <button className="btn btn-secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Appointment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
