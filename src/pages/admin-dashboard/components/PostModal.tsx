import React from 'react';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    fullName: string;
    date: string;
    time: string;
    post: {
      type: 'text' | 'image';
      content: string;
      text?: string;
    };
  } | null;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, post }) => {
  if (!isOpen || !post) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="post-card">
          <div className="post-header">
            <div className="user-avatar">
              <img 
                src={`https://picsum.photos/40/40?random=${post.fullName}`}
                alt={post.fullName} 
              />
            </div>
            <div className="user-info">
              <div className="user-name">
                {post.fullName}
                <span className="post-time">· {post.time}</span>
              </div>
            </div>
          </div>
          <div className="post-content">
            {post.post.type === 'image' && (
              <img 
                src={post.post.content} 
                alt="Post content" 
                className="post-image"
              />
            )}
            <p className="post-text">
              {post.post.type === 'text' ? post.post.content : post.post.text}
            </p>
      
          </div>
          <div className="post-stats">
            <span>❤️ 200</span>
            <span>💬 120</span>
            <span>🔄 4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal; 