import { useState } from 'react';
import {
    Modal,
    Group,
    Avatar,
    Text,
    CloseButton,
    Image,
    Divider,
    TextInput,
    ActionIcon,
    Box,
    ScrollArea
} from '@mantine/core';
import { IconHeart, IconHeartFilled, IconSend, IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

import classes from './PostDetailOverlay.module.css';

interface Comment {
    id: string;
    username: string;
    avatar: string;
    text: string;
    timestamp: string;
}

interface PostDetailOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    post: {
        name: string;
        icon: string;
        content: string;
        time: string;
        images?: string[];
        likes?: string;
        comments?: string;
    };
    currentImageIndex: number;
}

export function PostDetailOverlay({ isOpen, onClose, post, currentImageIndex }: PostDetailOverlayProps) {
    const [comments, setComments] = useState<Comment[]>([
        {
            id: '1',
            username: 'Jane Doe',
            avatar: 'https://placehold.co/40x40',
            text: 'This is amazing!',
            timestamp: '2h ago'
        },
        {
            id: '2',
            username: 'John Smith',
            avatar: 'https://placehold.co/40x40',
            text: 'I really like this post. Keep up the good work!',
            timestamp: '1h ago'
        },
        {
            id: '3',
            username: 'Alex Johnson',
            avatar: 'https://placehold.co/40x40',
            text: 'Great content!',
            timestamp: '30m ago'
        }
    ]);
    const [currentComment, setCurrentComment] = useState('');
    const [currentImageIdx, setCurrentImageIdx] = useState(currentImageIndex);
    const [liked, setLiked] = useState(false);

    const handleSubmitComment = () => {
        if (currentComment.trim()) {
            const newComment: Comment = {
                id: `${Date.now()}`,
                username: 'You',
                avatar: 'https://placehold.co/40x40',
                text: currentComment,
                timestamp: 'Just now'
            };

            setComments([...comments, newComment]);
            setCurrentComment('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmitComment();
        }
    };

    const handlePrevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (post.images && currentImageIdx > 0) {
            setCurrentImageIdx(prevIdx => prevIdx - 1);
        }
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (post.images && currentImageIdx < post.images.length - 1) {
            setCurrentImageIdx(prevIdx => prevIdx + 1);
        }
    };

    const toggleLike = () => {
        setLiked(!liked);
    };

    const renderImageNavigation = () => {
        if (!post.images || post.images.length <= 1) return null;

        return (
            <>
                <ActionIcon
                    className={`${classes.navButton} ${classes.prevButton}`}
                    disabled={currentImageIdx === 0}
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    variant="filled"
                >
                    <IconArrowLeft size={24} />
                </ActionIcon>
                <ActionIcon
                    className={`${classes.navButton} ${classes.nextButton}`}
                    disabled={!post.images || currentImageIdx === post.images.length - 1}
                    onClick={handleNextImage}
                    aria-label="Next image"
                    variant="filled"
                >
                    <IconArrowRight size={24} />
                </ActionIcon>
                <div className={classes.imageCounter}>
                    {currentImageIdx + 1} / {post.images.length}
                </div>
            </>
        );
    };

    const getCurrentImage = () => {
        if (!post.images || post.images.length === 0) {
            return "https://placehold.co/600x400/e2e2e2/808080?text=Post";
        }
        return post.images[currentImageIdx];
    };

    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            size="xl"
            fullScreen
            classNames={{
                content: classes.modalContent,
                header: classes.modalHeader,
                body: classes.modalBody
            }}
            transitionProps={{ transition: 'fade', duration: 200 }}
        >
            <div className={classes.container}>
                <div className={classes.layout}>
                    <div className={classes.imageSection}>
                        <div className={classes.imageContainer}>
                            <CloseButton
                                onClick={onClose}
                                className={classes.closeButton}
                                aria-label="Close modal"
                                size="lg"
                            />
                            <Image
                                src={getCurrentImage()}
                                alt="Post image"
                                className={classes.image}
                                fit="contain"
                            />
                            {renderImageNavigation()}
                        </div>
                    </div>

                    <div className={classes.contentSection}>
                        <div className={classes.postHeader}>
                            <Group>
                                <Avatar src={post.icon} alt={post.name} radius="xl" size="md" />
                                <div>
                                    <Text fw={600}>{post.name}</Text>
                                    <Text size="xs" c="dimmed">{post.time}</Text>
                                </div>
                            </Group>
                        </div>

                        <Divider my="sm" />

                        <ScrollArea className={classes.contentScrollArea}>
                            <div className={classes.scrollContent}>
                                <div className={classes.postContent}>
                                    <Text>{post.content}</Text>
                                </div>

                                <Group className={classes.interactions} align="center">
                                    <ActionIcon
                                        variant="transparent"
                                        onClick={toggleLike}
                                        aria-label={liked ? "Unlike post" : "Like post"}
                                    >
                                        {liked ? <IconHeartFilled size={24} color="red" /> : <IconHeart size={24} />}
                                    </ActionIcon>
                                    <Text size="sm">{post.likes}</Text>
                                </Group>

                                <Divider my="sm" />

                                <div className={classes.commentsSection}>
                                    {comments.length > 0 ? (
                                        comments.map(comment => (
                                            <Box key={comment.id} className={classes.comment}>
                                                <Group align="flex-start" mb="xs">
                                                    <Avatar src={comment.avatar} alt={comment.username} radius="xl" size="sm" />
                                                    <div className={classes.commentBody}>
                                                        <Text fw={600} size="sm">{comment.username}</Text>
                                                        <Text size="sm">{comment.text}</Text>
                                                        <Text size="xs" c="dimmed" mt={4}>{comment.timestamp}</Text>
                                                    </div>
                                                </Group>
                                            </Box>
                                        ))
                                    ) : (
                                        <Text ta="center" c="dimmed" py="xl">No comments yet. Be the first to comment!</Text>
                                    )}
                                </div>
                            </div>
                        </ScrollArea>

                        <div className={classes.commentInputContainer}>
                            <Group grow>
                                <TextInput
                                    placeholder="Write a comment..."
                                    value={currentComment}
                                    onChange={(e) => setCurrentComment(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    rightSection={
                                        <ActionIcon
                                            onClick={handleSubmitComment}
                                            disabled={!currentComment.trim()}
                                            aria-label="Send comment"
                                        >
                                            <IconSend size={20} />
                                        </ActionIcon>
                                    }
                                    className={classes.commentInput}
                                />
                            </Group>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default PostDetailOverlay; 