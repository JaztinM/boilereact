        import React, { useState, useMemo } from 'react';
        import { useQuery, useMutation } from '@apollo/client';
        import { GET_POSTS, UPDATE_POST_STATUS } from '../queries/posts';
        import PostModal from '../components/PostModal';
        import FlagModal from '../components/FlagModal';
        import SuccessModal from '../components/SuccessModal';

        interface DashboardPost {
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

        interface DashboardPostsResponse {
        posts: DashboardPost[];
        }

        const Dashboard: React.FC = () => {
        const { loading, error, data } = useQuery<DashboardPostsResponse>(GET_POSTS);
        const [updatePostStatus] = useMutation(UPDATE_POST_STATUS);
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedPost, setSelectedPost] = useState<DashboardPost | null>(null);
        const [isPostModalOpen, setIsPostModalOpen] = useState(false);
        const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
        const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
        const [postToFlag, setPostToFlag] = useState<DashboardPost | null>(null);
        const [posts, setPosts] = useState<DashboardPost[]>([
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
            },
            { 
            id: '3',
            date: 'january 20, 2025',
            time: '10:15am',
            fullName: 'ann tubato',
            idNumber: '#####',
            post: { type: 'text', content: "i've recently move to a new place" },
            type: 'text'
            },
            { 
            id: '4',
            date: 'january 20, 2025',
            time: '08:40am',
            fullName: 'solomon monotilla',
            idNumber: '#####',
            post: { type: 'image', content: 'https://picsum.photos/800/600?random=2' },
            type: 'image'
            }
        ]);

        const handleStatusUpdate = async (id: string, status: string) => {
            try {
            await updatePostStatus({
                variables: { id, status }
            });
            } catch (error) {
            console.error('Error updating post status:', error);
            }
        };

        const handlePostClick = (post: DashboardPost) => {
            setSelectedPost(post);
            setIsPostModalOpen(true);
        };

        const handleFlagClick = (post: DashboardPost, e: React.MouseEvent) => {
            e.stopPropagation();
            setPostToFlag(post);
            setIsFlagModalOpen(true);
        };

        const handleFlagSubmit = async (reason: string) => {
            if (postToFlag) {
            try {
                await updatePostStatus({
                variables: { id: postToFlag.id, status: 'Flagged', reason }
                });
                // Remove the flagged post from posts
                setPosts(currentPosts => currentPosts.filter(post => post.id !== postToFlag.id));
                setIsFlagModalOpen(false);
                setIsSuccessModalOpen(true);
            } catch (error) {
                console.error('Error flagging post:', error);
                // Even if the API call fails, remove from UI
                setPosts(currentPosts => currentPosts.filter(post => post.id !== postToFlag.id));
                setIsFlagModalOpen(false);
                setIsSuccessModalOpen(true);
            }
            }
        };

        // Filter posts based on search query
        const filteredPosts = useMemo(() => {
            const postsToFilter = data?.posts || posts;
            if (!searchQuery) return postsToFilter;
            
            const searchTerm = searchQuery.toLowerCase().trim();
            return postsToFilter.filter(post => 
            post.fullName.toLowerCase().includes(searchTerm)
            );
        }, [data?.posts, posts, searchQuery]);

        return (
            <div className="dashboard">
            <h1>dashboard</h1>
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
                            <div style={{display: 'flex', gap: '5px'}}>
                                        <button 
                            className="action-button approve"
                            onClick={() => handleStatusUpdate(post.id, 'Approved')}
                        >
                            ✓
                        </button>
                        <button 
                            className="action-button flag"
                            onClick={(e) => handleFlagClick(post, e)}
                        >
                            🚩
                        </button>
                            </div>
                
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
                    {post.post.type === 'image' ? (
                        <img 
                        src={post.post.content} 
                        alt="Post" 
                        onClick={() => handlePostClick(post)}
                        />
                    ) : (
                        <div className="text-post-card" onClick={() => handlePostClick(post)}>
                        "{post.post.content}"
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
                    <div className="detail-row">
                        <span className="detail-label">Type:</span>
                        <span className="detail-value">{post.type}</span>
                    </div>
                    </div>
                    <div className="verification-card-actions">
                        <button 
                            className="action-button approve"
                            onClick={() => handleStatusUpdate(post.id, 'Approved')}
                        >
                            ✓
                        </button>
                        <button 
                            className="action-button flag"
                            onClick={(e) => handleFlagClick(post, e)}
                        >
                            🚩
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
            <FlagModal      
                isOpen={isFlagModalOpen}
                onClose={() => setIsFlagModalOpen(false)}
                onSubmit={handleFlagSubmit}
            />
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
            />
            </div>
        );
        };

        export default Dashboard;               