/**
 * Date Utility Functions for Appointment Booking System
 */

/**
 * Calculates the number of days until the appointment date
 * @param {string|Date} dateInput 
 * @returns {object} { label: string, days: number, badgeType: string }
 */
export const calculateDaysUntil = (dateInput) => {
  if (!dateInput) return { label: 'N/A', days: 0, badgeType: 'muted' };

  const apptDate = new Date(dateInput);
  const today = new Date();

  // Reset time portions for accurate date comparison
  apptDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = apptDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return { label: 'Today', days: 0, badgeType: 'today' };
  } else if (diffDays === 1) {
    return { label: 'Tomorrow', days: 1, badgeType: 'tomorrow' };
  } else if (diffDays > 1) {
    return { label: `In ${diffDays} Days`, days: diffDays, badgeType: 'upcoming' };
  } else if (diffDays === -1) {
    return { label: 'Yesterday', days: diffDays, badgeType: 'past' };
  } else {
    return { label: `${Math.abs(diffDays)} Days Ago`, days: diffDays, badgeType: 'past' };
  }
};

/**
 * Formats ISO date string to readable format e.g. "Oct 25, 2026"
 * @param {string|Date} dateInput 
 * @returns {string}
 */
export const formatDate = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Formats Date to YYYY-MM-DD format for HTML date input values
 * @param {string|Date} dateInput 
 * @returns {string}
 */
export const formatDateForInput = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
