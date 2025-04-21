import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content success-modal" onClick={e => e.stopPropagation()}>
        <div className="success-icon">✓</div>
        <h2>post successfully deleted!</h2>
        <button className="back-home" onClick={onClose}>
          back to home
        </button>
      </div>
    </div>
  );
};

export default SuccessModal; 