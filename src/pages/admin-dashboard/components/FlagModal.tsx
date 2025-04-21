import React, { useState } from 'react';

interface FlagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const FlagModal: React.FC<FlagModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState('');

  const flagReasons = [
    {
      id: 'nudity',
      label: 'nudity or sexual content',
      description: 'content that includes explicit or suggestive material involving nudity, sexual acts, or content intended for the gratification of erotic desire.'
    },
    {
      id: 'violent',
      label: 'violent or repulsive content',
      description: 'material depicting graphic violence, gore, or content designed to provoke extreme disgust.'
    },
    {
      id: 'hateful',
      label: 'hateful or abusive content',
      description: 'content that promotes hate speech, discrimination, or abusive behavior against individuals or groups based on race, religion, gender, or other characteristics.'
    },
    {
      id: 'harassment',
      label: 'harassment or bullying',
      description: 'content that targets, i             ntimidates, or harasses an individual or group, leading to a hostile environment.'
    },
    {
      id: 'child-abuse',
      label: 'child abuse',
      description: 'any material that exploits, harms, or endangers the welfare of children, including child pornography or abusive incidents.'
    },
    {
      id: 'terrorism',
      label: 'promotes terrorism',
      description: 'content supporting, glorifying, or inciting acts of terrorism, violence, or extremism.'
    },
    {
      id: 'spam',
      label: 'spam or misleading',
      description: 'content that is deceptive, irrelevant, or repeated excessively to mislead users or promote unauthorized activities.'
    }
  ];

  const handleSubmit = () => {
    if (selectedReason) {
      onSubmit(selectedReason);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content flag-modal" onClick={e => e.stopPropagation()}>
        <div className="flag-header">
          <div className="flag-icon">🚩</div>
          <h2>select reason for flagging:</h2>
        </div>
        <div className="flag-options">
          {flagReasons.map(reason => (
            <label key={reason.id} className="flag-option">
              <input
                type="radio"                
                name="flag-reason"
                value={reason.id}
                checked={selectedReason === reason.id}
                onChange={(e) => setSelectedReason(e.target.value)}
              />
              <div className="flag-option-content">
                <div className="flag-option-label">{reason.label}</div>
                <div className="flag-option-description">{reason.description}</div>
              </div>
            </label>
          ))}
        </div>
        <div className="flag-actions">
          <button className="flag-submit" onClick={handleSubmit}>delete post</button>
          <button className="flag-cancel" onClick={onClose}>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default FlagModal; 