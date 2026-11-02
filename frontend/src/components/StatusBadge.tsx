import React from 'react';

interface StatusBadgeProps {
  status: 'Pending' | 'Approved' | 'Under Review' | 'Rejected';
}

const statusStyles = {
  Approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  'Under Review': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Rejected: 'bg-red-500/10 text-red-400 border-red-500/30',
};

/**
 * Claim and policy status pill badge component.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-mono font-medium rounded-full border backdrop-blur-sm ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};
