import { useState, useRef, useEffect } from 'react';
import classes from './Posts.module.css'
import { PostDetailOverlay } from '../PostDetailOverlay';
import { FaRegHeart, FaHeart, FaRegComment, FaShare } from 'react-icons/fa';

interface PostImage {
    src: string;
    alt?: string;
}

interface PostProps {
    posts: {
        name: string;
        icon: string;
        content: string;
        time: string;
        images?: string[];
        likes?: string;
        comments?: string;
    };
}

export default function Posts({ posts }: PostProps) {
    const [liked, setLiked] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [contentTooLong, setContentTooLong] = useState(false);
    const contentRef = useRef<HTMLParagraphElement>(null);
    const [detailOverlay, setDetailOverlay] = useState({
        open: false,
        currentImageIndex: 0
    });

    // Check if content is too long after component mounts
    useEffect(() => {
        if (contentRef.current) {
            // Approximate characters per line (adjust as needed)
            const charsPerLine = 50;
            const maxLines = 3;
            const maxLength = charsPerLine * maxLines;

            setContentTooLong(posts.content.length > maxLength);
        }
    }, [posts.content]);

    console.log(posts)

    // Function to determine grid layout class based on image count
    const getImageGridClass = (images: string[] | undefined) => {
        if (!images || images.length === 0) return "";

        const count = images.length;
        if (count === 1) return classes.single_image;
        if (count === 2) return classes.two_images;
        if (count === 3) return classes.three_images;
        if (count === 4) return classes.four_images;
        return classes.multiple_images;
    };

    // Handle image click
    const handleImageClick = (src: string, index: number) => {
        setDetailOverlay({
            open: true,
            currentImageIndex: index
        });
    };

    // Handle like click
    const handleLikeClick = () => {
        setLiked(!liked);
    };

    // Handle see more click
    const handleSeeMoreClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setExpanded(!expanded);
    };

    // Handle comments click
    const handleCommentsClick = () => {
        setDetailOverlay({
            open: true,
            currentImageIndex: 0
        });
    };

    // Close overlay
    const closeOverlay = () => {
        setDetailOverlay({
            ...detailOverlay,
            open: false
        });
    };

    // Get truncated content
    const getTruncatedContent = () => {
        if (!contentTooLong || expanded) {
            return posts.content;
        }

        // Approximate characters per line (adjust as needed)
        const charsPerLine = 50;
        const maxLines = 3;
        const maxLength = charsPerLine * maxLines;

        return posts.content.substring(0, maxLength) + '...';
    };

    // Format post images
    const renderImages = () => {
        if (!posts.images || posts.images.length === 0) {
            // Default placeholder image if no images provided
            return (
                <div className={`${classes.image_container} ${classes.single_image}`}>
                    <div
                        className={classes.image_item}
                        onClick={() => handleImageClick("https://placehold.co/600x400/e2e2e2/808080?text=Post", 0)}
                        role="button"
                        tabIndex={0}
                        aria-label="View post image"
                    >
                        <img
                            src="https://placehold.co/600x400/e2e2e2/808080?text=Post"
                            alt="Post content"
                            className={classes.post_image}
                            loading="lazy"
                        />
                    </div>
                </div>
            );
        }

        const imageCount = posts.images.length;
        const maxDisplayImages = imageCount > 4 ? 4 : imageCount;
        const hasMoreImages = imageCount > 4;

        return (
            <div className={`${classes.image_container} ${getImageGridClass(posts.images)}`}>
                {posts.images.slice(0, maxDisplayImages).map((image: string, index: number) => (
                    <div
                        key={index}
                        className={classes.image_item}
                        onClick={() => handleImageClick(image, index)}
                        role="button"
                        tabIndex={0}
                        aria-label={`View image ${index + 1} of ${imageCount}`}
                    >
                        <img
                            src={image}
                            alt={`Post image ${index + 1}`}
                            className={classes.post_image}
                            loading="lazy"
                        />
                        {hasMoreImages && index === 3 && (
                            <div className={classes.more_images_overlay}>
                                <span>+{imageCount - 4}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className={classes.posts_container}>
                <div className={classes.user_icon_column}>
                    <div className={classes.user_icon}>
                        <img src={posts.icon || "https://placehold.co/40x40"} alt={`${posts.name}'s profile`} />
                    </div>
                    <div className={classes.thread_line} aria-hidden="true"></div>
                </div>
                <div className={classes.content_container}>
                    <div className={classes.user_name_container}>
                        <p className={classes.name}>{posts.name || "Lighthouse"}</p>
                        <span className={classes.dot}>•</span>
                        <p className={classes.time}>{posts.time || "6h"}</p>
                        <button aria-label="More options">
                            •••
                        </button>
                    </div>
                    <div className={classes.content_wrapper}>
                        <p ref={contentRef} className={classes.content}>
                            {getTruncatedContent()}
                        </p>
                        {contentTooLong && (
                            <button
                                className={classes.see_more_button}
                                onClick={handleSeeMoreClick}
                                aria-expanded={expanded}
                            >
                                {expanded ? 'See less' : 'See more'}
                            </button>
                        )}
                    </div>

                    {/* Dynamic image grid */}
                    {renderImages()}

                    <div className={classes.interaction_container}>
                        <div className={classes.interaction_buttons}>
                            <div
                                className={`${classes.interaction_button} ${liked ? classes.liked : ''}`}
                                onClick={handleLikeClick}
                                role="button"
                                tabIndex={0}
                                aria-label={liked ? "Unlike post" : "Like post"}
                            >
                                {liked ? <FaHeart className={classes.icon_liked} /> : <FaRegHeart className={classes.icon} />}
                                <span>{posts.likes || "200"}</span>
                            </div>

                            <div
                                className={classes.interaction_button}
                                onClick={handleCommentsClick}
                                role="button"
                                tabIndex={0}
                                aria-label="View comments"
                            >
                                <FaRegComment className={classes.icon} />
                                <span>{posts.comments || "120"}</span>
                            </div>

                            <div
                                className={classes.interaction_button}
                                role="button"
                                tabIndex={0}
                                aria-label="Share post"
                            >
                                <FaShare className={classes.icon} />
                                <span>4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Post Detail Overlay */}
            <PostDetailOverlay
                isOpen={detailOverlay.open}
                onClose={closeOverlay}
                post={posts}
                currentImageIndex={detailOverlay.currentImageIndex}
            />
        </>
    )
}