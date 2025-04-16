import React from 'react';
import {
    Text,
    TextInput,
    Avatar,
    Box,
    Stack
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from './RightSidebar.module.css';

export function RightSidebar() {
    return (
        <div className={classes.rightSidebar}>
            <div className={classes.searchSection}>
                <TextInput
                    placeholder="Search"
                    leftSection={<IconSearch size={16} />}
                    size="sm"
                    radius="md"
                    className={classes.trendingSearch}
                />
            </div>

            {/* Trending Section */}
            <div className={classes.trendingSection}>
                <Text className={classes.sectionHeader}>trending</Text>
                <div className={classes.trendingItem}>
                    <Text className={classes.trendingTag}>#ReactJS</Text>
                    <Text className={classes.trendingMeta}>1.2K posts</Text>
                </div>
                <div className={classes.trendingItem}>
                    <Text className={classes.trendingTag}>#WebDevelopment</Text>
                    <Text className={classes.trendingMeta}>845 posts</Text>
                </div>
                <div className={classes.trendingItem}>
                    <Text className={classes.trendingTag}>#JavaScript</Text>
                    <Text className={classes.trendingMeta}>2.5K posts</Text>
                </div>
                <div className={classes.trendingItem}>
                    <Text className={classes.trendingTag}>#TechNews</Text>
                    <Text className={classes.trendingMeta}>620 posts</Text>
                </div>
            </div>

            {/* Messages Section */}
            <div className={classes.messagesList}>
                <Text className={classes.sectionHeader}>messages</Text>
                <TextInput
                    placeholder="Search for people and groups"
                    leftSection={<IconSearch size={16} />}
                    size="sm"
                    radius="md"
                    className={classes.searchMessages}
                />

                <Stack gap={0}>
                    <div className={classes.messageItem}>
                        <Box pos="relative">
                            <Avatar src="https://placehold.co/40x40/007bff/ffffff?text=A" radius="xl" size="md" className={classes.avatar} />
                            <div className={classes.onlineIndicator}></div>
                        </Box>
                        <div>
                            <Text className={classes.userName}>AzizDjan</Text>
                            <Text className={classes.userHandle}>@A_AzizDjan</Text>
                        </div>
                    </div>

                    <div className={classes.messageItem}>
                        <Box pos="relative">
                            <Avatar src="https://placehold.co/40x40/17a2b8/ffffff?text=A" radius="xl" size="md" className={classes.avatar} />
                            <div className={classes.onlineIndicator}></div>
                        </Box>
                        <div>
                            <Text className={classes.userName}>Andrew Parker</Text>
                            <Text className={classes.userHandle}>@andrewww_</Text>
                        </div>
                    </div>

                    <div className={classes.messageItem}>
                        <Box pos="relative">
                            <Avatar src="https://placehold.co/40x40/343a40/ffffff?text=K" radius="xl" size="md" className={classes.avatar} />
                            <div className={classes.onlineIndicator}></div>
                        </Box>
                        <div>
                            <Text className={classes.userName}>Komol Kuchkarov</Text>
                            <Text className={classes.userHandle}>@kkuchkarov</Text>
                        </div>
                    </div>
                </Stack>
            </div>
        </div>
    );
}

export default RightSidebar; 