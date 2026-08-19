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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()} role="dialog">
        <div className="px-6 pb-2 pt-7 text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle size={28} />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900">Delete Appointment?</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Are you sure you want to delete appointment for{' '}
            <strong>{appointment.patient_name}</strong> with <strong>{appointment.doctor_name}</strong>?
          </p>
          <span className="mt-2 block text-xs font-medium text-red-600">This action cannot be undone.</span>
        </div>

        <div className="flex justify-center gap-3 px-6 py-5">
          <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50" onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Appointment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
