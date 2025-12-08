import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'proposal' | 'estimate' | 'invoice' | 'payment' | 'creditNote';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'proposal' }) => {
  const getStatusClass = () => {
    const statusLower = status.toLowerCase();
    
    // Common statuses
    if (statusLower === 'draft') return 'badge-secondary';
    if (statusLower === 'sent') return 'badge-info';
    if (statusLower === 'accepted' || statusLower === 'paid' || statusLower === 'completed') return 'badge-success';
    if (statusLower === 'declined' || statusLower === 'overdue' || statusLower === 'expired') return 'badge-danger';
    if (statusLower === 'pending' || statusLower === 'processing' || statusLower === 'open') return 'badge-warning';
    if (statusLower === 'revised') return 'badge-info';
    if (statusLower === 'unpaid') return 'badge-danger';
    if (statusLower === 'partially paid') return 'badge-warning';
    if (statusLower === 'invoiced' || statusLower === 'issued' || statusLower === 'applied') return 'badge-success';
    if (statusLower === 'not invoiced') return 'badge-secondary';
    
    return 'badge-secondary';
  };

  return (
    <span className={`badge ${getStatusClass()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
