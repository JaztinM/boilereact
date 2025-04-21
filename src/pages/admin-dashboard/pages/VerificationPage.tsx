import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_VERIFICATION_REQUESTS, UPDATE_VERIFICATION_STATUS } from '../queries/posts';

interface VerificationRequest {
  id: string;
  date: string;
  time: string;
  fullName: string;
  idNumber: string;
  profilePhoto: string;
  verificationPhoto: string;
}

interface VerificationResponse {
  verificationRequests: VerificationRequest[];
}

// Initial data for testing
const initialRequests: VerificationRequest[] = [
  {
    id: '1',
    date: 'january 20, 2025',
    time: '11:30am',
    fullName: 'david zaleski',
    idNumber: '#######',
    profilePhoto: 'https://picsum.photos/200/200?random=1',
    verificationPhoto: 'https://picsum.photos/200/200?random=2'
  },
  {
    id: '2',
    date: 'january 20, 2025',
    time: '11:30am',
    fullName: 'david zaleski',
    idNumber: '#######',
    profilePhoto: 'https://picsum.photos/200/200?random=3',
    verificationPhoto: 'https://picsum.photos/200/200?random=4'
  }
];

const VerificationPage: React.FC = () => {
  const { loading, error, data } = useQuery<VerificationResponse>(GET_VERIFICATION_REQUESTS);
  const [updateStatus] = useMutation(UPDATE_VERIFICATION_STATUS);
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<VerificationRequest[]>(initialRequests);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [imageType, setImageType] = useState<'profile' | 'verification'>('profile');
  const [showVerifySuccessModal, setShowVerifySuccessModal] = useState(false);

  const handleVerify = async (request: VerificationRequest) => {
    try {
      await updateStatus({
        variables: { id: request.id, status: 'VERIFIED' }
      });
      setRequests(prev => prev.filter(req => req.id !== request.id));
      setSelectedRequest(request);
      setShowVerifySuccessModal(true);
    } catch (error) {
      console.error('Error verifying request:', error);
      // Even if there's an error with the API, still update the UI
      setRequests(prev => prev.filter(req => req.id !== request.id));
      setSelectedRequest(request);
      setShowVerifySuccessModal(true);
    }
  };

  const handleReject = (request: VerificationRequest) => {
    setSelectedRequest(request);
    setShowRejectionModal(true);
  };

  const confirmRejection = async () => {
    if (selectedRequest) {
      try {
        await updateStatus({
          variables: { id: selectedRequest.id, status: 'REJECTED', reason: rejectionReason }
        });
        setRequests(prev => prev.filter(req => req.id !== selectedRequest.id));
        setShowRejectionModal(false);
        setShowConfirmationModal(true);
        setSelectedRequest(null);
      } catch (error) {
        console.error('Error rejecting request:', error);
        setRequests(prev => prev.filter(req => req.id !== selectedRequest.id));
        setShowRejectionModal(false);
        setShowConfirmationModal(true);
        setSelectedRequest(null);
      }
    }
  };

  const handleImageClick = (image: string, type: 'profile' | 'verification') => {
    setPreviewImage(image);
    setImageType(type);
    setShowImagePreview(true);
  };

  const filteredRequests = useMemo(() => {
    const reqs = data?.verificationRequests || requests;
    if (!searchQuery) return reqs;
    
    const searchTerm = searchQuery.toLowerCase().trim();
    return reqs.filter(req => 
      req.fullName.toLowerCase().includes(searchTerm)
    );
  }, [data?.verificationRequests, requests, searchQuery]);

  return (
    <div className="dashboard">
      <h1>verification requests</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="search usernames"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="dashboard-content">
        <table className="verification-table">
          <thead>
            <tr>
              <th>date</th>
              <th>time</th>
              <th>full name</th>
              <th>ID number</th>
              <th>profile photo</th>
              <th>verification photo</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request.id}>
                <td>{request.date}</td>
                <td>{request.time}</td>
                <td>{request.fullName}</td>
                <td>{request.idNumber}</td>
                <td>
                  <img 
                    src={request.profilePhoto} 
                    alt="Profile" 
                    className="verification-photo"
                    onClick={() => handleImageClick(request.profilePhoto, 'profile')}
                  />
                </td>
                <td>
                  <img 
                    src={request.verificationPhoto} 
                    alt="Verification" 
                    className="verification-photo"
                    onClick={() => handleImageClick(request.verificationPhoto, 'verification')}
                  />
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="verify-button"
                      onClick={() => handleVerify(request)}
                    >
                      verify
                    </button>
                    <button 
                      className="reject-button"
                      onClick={() => handleReject(request)}
                    >
                      reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Card-based view */}
        <div className="verification-cards-container">
          {filteredRequests.map(request => (
            <div key={request.id} className="verification-card">
              <div className="verification-photos-container">
                <div className="verification-photo-column">
                  <div className="photo-label">profile photo</div>
                  <img 
                    src={request.profilePhoto} 
                    alt="Profile" 
                    className="card-photo"
                    onClick={() => handleImageClick(request.profilePhoto, 'profile')}
                  />
                </div>
                <div className="verification-photo-column">
                  <div className="photo-label">verification photo</div>
                  <img 
                    src={request.verificationPhoto} 
                    alt="Verification" 
                    className="card-photo"
                    onClick={() => handleImageClick(request.verificationPhoto, 'verification')}
                  />
                </div>
              </div>
              <div className="verification-card-details">
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{request.date}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">{request.time}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">full name:</span>
                  <span className="detail-value">{request.fullName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Id number</span>
                  <span className="detail-value">{request.idNumber}</span>
                </div>
              </div>
              <div className="verification-card-actions">
              <button 
                      className="verify-button"
                      onClick={() => handleVerify(request)}
                    >
                      verify
                    </button>
                    <button 
                      className="reject-button"
                      onClick={() => handleReject(request)}
                    >
                      reject
                    </button>
              </div>
            </div>
          ))}
        </div>

        {/* Image Preview Modal */}
        {showImagePreview && previewImage && (
          <div className="modal-overlay" onClick={() => setShowImagePreview(false)}>
            <div className="modal-content image-preview-modal" onClick={(e) => e.stopPropagation()}>
              <div className="image-preview-header">
                <h3>{imageType} photo</h3>
                <button 
                  className="close-button" 
                  onClick={() => setShowImagePreview(false)}
                >
                  ×
                </button>
              </div>
              <div className="image-preview-container">
                <img 
                  src={previewImage} 
                  alt={`${imageType} preview`} 
                  className="preview-image"
                />
              </div>
            </div>
          </div>
        )}

        {/* Verify Success Modal */}
        {showVerifySuccessModal && (
          <div className="modal-overlay" onClick={() => setShowVerifySuccessModal(false)}>
            <div className="modal-content success-modal" style={{ maxWidth: '300px', padding: '24px' }}>
              <div className="checkmark">✓</div>
              <h2>verification approved</h2>
              <button onClick={() => setShowVerifySuccessModal(false)} className="back-button">back to home</button>
            </div>
          </div>
        )}

        {showRejectionModal && (
          <div className="modal-overlay">
            <div className="modal-content rejection-modal">
              <div className="flag-icon">
              🚩
              </div>
              <h2>select reason for rejection:</h2>
              <form className="rejection-reasons">
                <label>
                  <input type="radio" value="poor image quality" checked={rejectionReason === 'poor image quality'} onChange={(e) => setRejectionReason(e.target.value)} />
                  <div className="reason-content">
                    <div className="reason-title">poor image quality</div>
                    <div className="reason-description">blurry, dark, overexposed, or low-resolution images make it hard to verify your identity.</div>
                  </div>
                </label>
                <label>
                  <input type="radio" value="face not clearly visible" checked={rejectionReason === 'face not clearly visible'} onChange={(e) => setRejectionReason(e.target.value)} />
                  <div className="reason-content">
                    <div className="reason-title">face not clearly visible</div>
                    <div className="reason-description">if your face is partially covered (by hair, glasses, mask, hat, or hands) or not well-lit, verification may fail.</div>
                  </div>
                </label>
                <label>
                  <input type="radio" value="mismatch with selfie" checked={rejectionReason === 'mismatch with selfie'} onChange={(e) => setRejectionReason(e.target.value)} />
                  <div className="reason-content">
                    <div className="reason-title">mismatch with selfie</div>
                    <div className="reason-description">if your selfie doesn't match with the photo due to lighting differences, angles, or facial expressions, it may be rejected.</div>
                  </div>
                </label>
                <label>
                  <input type="radio" value="edited or altered image" checked={rejectionReason === 'edited or altered image'} onChange={(e) => setRejectionReason(e.target.value)} />
                  <div className="reason-content">
                    <div className="reason-title">edited or altered image</div>
                    <div className="reason-description">if the image has been edited, filtered, or manipulated in any way, it will likely be rejected.</div>
                  </div>
                </label>
                <label>
                  <input type="radio" value="glare or reflection" checked={rejectionReason === 'glare or reflection'} onChange={(e) => setRejectionReason(e.target.value)} />
                  <div className="reason-content">
                    <div className="reason-title">glare or reflection</div>
                    <div className="reason-description">if the selfie has glare, shadows, or reflections, it might not be accepted.</div>
                  </div>
                </label>
                <label>
                  <input type="radio" value="multiple faces detected" checked={rejectionReason === 'multiple faces detected'} onChange={(e) => setRejectionReason(e.target.value)} />
                  <div className="reason-content">
                    <div className="reason-title">multiple faces detected</div>
                    <div className="reason-description">if more than one person appears in the photo, the system may not be able to verify the correct individual.</div>
                  </div>
                </label>
                <label>
                  <input type="radio" value="not following pose instructions" checked={rejectionReason === 'not following pose instructions'} onChange={(e) => setRejectionReason(e.target.value)} />
                  <div className="reason-content">
                    <div className="reason-title">not following pose instructions</div>
                    <div className="reason-description">some platforms require specific poses (holding three fingers up) to ensure it's a live capture and not a static image.</div>
                  </div>
                </label>
              </form>
              <div className="rejection-actions">
                <button onClick={confirmRejection} className="reject-verification-button">reject verification</button>
                <button className="restore-cancel" onClick={() => setShowRejectionModal(false)}>
                  cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showConfirmationModal && (
          <div className="modal-overlay" onClick={() => setShowConfirmationModal(false)}>
            <div className="modal-content success-modal" style={{ maxWidth: '300px', padding: '24px' }} onClick={e => e.stopPropagation()}>
              <div className="checkmark">✓</div>
              <h2>verification rejected</h2>
              <button className="back-home" onClick={() => setShowConfirmationModal(false)}>
                back to home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationPage; 