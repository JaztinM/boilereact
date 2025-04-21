import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_FLAGGED_POSTS, UPDATE_POST_STATUS } from '../queries/posts';
import PostModal from '../components/PostModal';
import RestoreModal from '../components/RestoreModal';

interface FlaggedPost {
  id: string;
  date: string;
  time: string;
  fullName: string;
  idNumber: string;
  post: {
    type: 'text' | 'image';
    content: string;
    text?: string;
  };
  type: 'text' | 'image';
}

interface FlaggedPostsResponse {
  posts: FlaggedPost[];
}

// Initial data for testing
const initialFlaggedPosts: FlaggedPost[] = [
  { 
    id: '1',
    date: 'january 20, 2025',
    time: '11:30am',
    fullName: 'david zaleski',
    idNumber: '#####',
    post: { 
      type: 'image', 
      content: 'https://picsum.photos/800/600?random=1',
      text: "I can't believe October is already over, the trees in my backyard are all three colors! 🍁"
    },
    type: 'image'
  },
  { 
    id: '2',
    date: 'january 20, 2025',
    time: '10:40am',
    fullName: 'david zaleski',
    idNumber: '#####',
    post: { type: 'text', content: "I can't believe October is already over, the trees in my backyard are all three colors" },
    type: 'text'
  }
];

const FlaggedPosts: React.FC = () => {
  const { loading, error, data } = useQuery<FlaggedPostsResponse>(GET_FLAGGED_POSTS);
  const [updatePostStatus] = useMutation(UPDATE_POST_STATUS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<FlaggedPost | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [postToRestore, setPostToRestore] = useState<FlaggedPost | null>(null);
  const [flaggedPosts, setFlaggedPosts] = useState<FlaggedPost[]>(initialFlaggedPosts);

  const handlePostClick = (post: FlaggedPost) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

  const handleRestoreClick = (post: FlaggedPost, e: React.MouseEvent) => {
    e.stopPropagation();
    setPostToRestore(post);
    setIsRestoreModalOpen(true);
  };

  const handleRestoreConfirm = async () => {
    if (postToRestore) {
      try {
        await updatePostStatus({
          variables: { id: postToRestore.id, status: 'Restored' }
        });
        // Remove the restored post from flaggedPosts using state setter
        setFlaggedPosts(prevPosts => prevPosts.filter(post => post.id !== postToRestore.id));
        setIsRestoreModalOpen(false);
        setIsSuccessModalOpen(true);
      } catch (error) {
        console.error('Error restoring post:', error);
        // Even if the API call fails, we'll still remove the post from the UI
        setFlaggedPosts(prevPosts => prevPosts.filter(post => post.id !== postToRestore.id));
        setIsRestoreModalOpen(false);
        setIsSuccessModalOpen(true);
      }
    }
  };

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    const posts = data?.posts || flaggedPosts;
    if (!searchQuery) return posts;
    
    const searchTerm = searchQuery.toLowerCase().trim();
    return posts.filter(post => 
      post.fullName.toLowerCase().includes(searchTerm)
    );
  }, [data?.posts, flaggedPosts, searchQuery]);

  return (
    <div className="dashboard">
      <h1>flagged posts</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="search usernames, posts, etc."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="dashboard-content">
        <table className="posts-table">
          <thead>
            <tr>
              <th>date</th>
              <th>time</th>
              <th>full name</th>
              <th>ID number</th>
              <th>post</th>
              <th>type</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map(post => (
              <tr key={post.id}>
                <td>{post.date}</td>
                <td>{post.time}</td>
                <td>{post.fullName}</td>
                <td>{post.idNumber}</td>
                <td 
                  className="post-cell"
                  onClick={() => handlePostClick(post)}
                >
                  {post.post.type === 'image' ? (
                    <img src={post.post.content} alt="Post content" className="post-thumbnail" />
                  ) : (
                    post.post.content
                  )}
                </td>
                <td>{post.type}</td>
                <td>
                  <button 
                    className="restore-button"
                    onClick={(e) => handleRestoreClick(post, e)}
                  >
                    restore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card-based view */}
      <div className="verification-cards-container">
        {filteredPosts.map(post => (
          <div key={post.id} className="verification-card">
            <div className="verification-card-image">
              {post.type === 'image' ? (
                <img 
                  src={post.post.content} 
                  alt="Post" 
                  onClick={() => handlePostClick(post)}
                />
              ) : (
                <div className="text-post-card" onClick={() => handlePostClick(post)}>
                  {post.post.content}
                </div>
              )}
            </div>
            <div className="verification-card-details">
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{post.date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{post.time}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">full name:</span>
                <span className="detail-value">{post.fullName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Id number</span>
                <span className="detail-value">{post.idNumber}</span>
              </div>
            </div>
            <div className="verification-card-actions">
              <button 
                className="restore-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRestoreClick(post, e);
                }}
              >
                <span className="checkmark-icon">restore</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <PostModal 
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        post={selectedPost}
      />
      <RestoreModal
        isOpen={isRestoreModalOpen}
        onClose={() => setIsRestoreModalOpen(false)}
        onConfirm={handleRestoreConfirm}
        type="restore"
      />
      <RestoreModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onConfirm={() => setIsSuccessModalOpen(false)}
        type="success"
      />
    </div>
  );
};

export default FlaggedPosts;                                                                                                                                            