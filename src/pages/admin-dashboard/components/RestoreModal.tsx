import React from 'react';

interface RestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'restore' | 'success';
}

const RestoreModal: React.FC<RestoreModalProps> = ({ isOpen, onClose, onConfirm, type }) => {
  if (!isOpen) return null;

  if (type === 'success') {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content success-modal" onClick={e => e.stopPropagation()}>
          <div className="success-icon">✓</div>
          <h2>post successfully restored!</h2>
          <button className="back-home" onClick={onClose}>
            back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content restore-confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="restore-icon">🕒</div>
        <h2>are you sure you want to restore a flagged post?</h2>
        <div className="restore-actions">
          <button className="restore-confirm" onClick={onConfirm}>
            restore
          </button>
          <button className="restore-cancel" onClick={onClose}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestoreModal; 