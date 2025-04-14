import { useState, useRef } from 'react';
import {
    Avatar,
    Button,
    TextInput,
    Paper,
    Group,
    ActionIcon,
    Text,
    useMantineTheme,
    useMantineColorScheme,
    Image,
    CloseButton
} from '@mantine/core';
import {
    IconPhoto,
    IconVideo,
    IconMoodSmile,
    IconMapPin,
    IconPaperclip
} from '@tabler/icons-react';

import classes from './PostCreator.module.css';

export function PostCreator() {
    const [postText, setPostText] = useState('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    const handleSubmit = () => {
        if (postText.trim() || selectedImages.length > 0) {
            console.log('Post submitted:', { text: postText, images: selectedImages });
            setPostText('');
            setSelectedImages([]);
        }
    };

    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages: string[] = [];

            Array.from(files).forEach(file => {
                const imageUrl = URL.createObjectURL(file);
                newImages.push(imageUrl);
            });

            setSelectedImages(prev => [...prev, ...newImages]);
        }

        // Reset the file input value so the same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeImage = (index: number) => {
        setSelectedImages(prev => {
            const newImages = [...prev];
            // Revoke the object URL to avoid memory leaks
            URL.revokeObjectURL(newImages[index]);
            newImages.splice(index, 1);
            return newImages;
        });
    };

    return (
        <Paper className={classes.postCreator} shadow="sm">
            <div className={classes.inputContainer}>
                <Avatar
                    color="blue"
                    radius="xl"
                    className={classes.avatar}
                >
                    L
                </Avatar>

                <TextInput
                    placeholder="looking for something?"
                    className={classes.input}
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    classNames={{
                        input: classes.inputField,
                        root: classes.inputRoot
                    }}
                    size="md"
                    radius="xl"
                />
            </div>

            {selectedImages.length > 0 && (
                <div className={classes.imagesContainer}>
                    <div className={
                        selectedImages.length === 1
                            ? classes.singleImageLayout
                            : selectedImages.length === 2
                                ? classes.twoImagesLayout
                                : selectedImages.length === 3
                                    ? classes.threeImagesLayout
                                    : classes.fourImagesLayout
                    }>
                        {selectedImages.map((image, index) => (
                            <div key={index} className={classes.imageWrapper}>
                                <Image
                                    src={image}
                                    alt={`Uploaded image ${index + 1}`}
                                    className={classes.uploadedImage}
                                />
                                <CloseButton
                                    className={classes.removeImageBtn}
                                    onClick={() => removeImage(index)}
                                    aria-label="Remove image"
                                    size="sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className={classes.actionButtonsContainer}>
                <Group className={classes.actionButtons}>
                    <ActionIcon
                        variant="subtle"
                        color={isDark ? "blue" : "gray"}
                        onClick={handleFileUpload}
                    >
                        <IconPhoto size={20} stroke={1.5} />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            multiple
                            onChange={handleFileChange}
                        />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color={isDark ? "blue" : "gray"}>
                        <IconVideo size={20} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color={isDark ? "blue" : "gray"}>
                        <IconMoodSmile size={20} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color={isDark ? "blue" : "gray"}>
                        <IconMapPin size={20} stroke={1.5} />
                    </ActionIcon>
                </Group>

                <Button
                    className={classes.postButton}
                    disabled={!postText.trim() && selectedImages.length === 0}
                    onClick={handleSubmit}
                >
                    post
                </Button>
            </div>
        </Paper>
    );
}

export default PostCreator; 