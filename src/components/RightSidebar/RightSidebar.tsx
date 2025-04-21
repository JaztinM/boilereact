import React from 'react';
import {
    Text,
    Stack,
    Group,
    Button,
    Card,
    Badge,
    UnstyledButton,
    Avatar,
    Image,
    List
} from '@mantine/core';
import {
    IconUsers,
    IconHeart,
    IconMapPin,
    IconActivity,
    IconChevronRight
} from '@tabler/icons-react';
import classes from './RightSidebar.module.css';

const nearbyPeople = [
    {
        id: 1,
        name: 'Sarah Chen',
        interests: ['Photography', 'Travel'],
        distance: '0.5 miles away',
        avatar: 'https://placehold.co/80x80/228be6/ffffff?text=SC'
    },
    {
        id: 2,
        name: 'Mike Rivera',
        interests: ['Music', 'Gaming'],
        distance: '1.2 miles away',
        avatar: 'https://placehold.co/80x80/228be6/ffffff?text=MR'
    }
];

const trendingCommunities = {
    name: 'Photography Enthusiasts',
    members: '2.5k members',
    activity: 'Very active',
    todaysPosts: '15 new posts today',
    image: 'https://placehold.co/200x150/228be6/ffffff?text=Photography'
};

const popularInterests = [
    'Art & Creative Expression',
    'Tech & Innovation',
    'Outdoor Adventures',
    'Music & Performance',
    'Food & Cooking'
];

export function RightSidebar() {
    return (
        <div className={classes.rightSidebar}>
            <div className={classes.scrollWrapper}>
                <div className={classes.scrollContainer}>
                    <Stack gap="md">
                        {/* People Nearby */}
                        <Card className={classes.section} withBorder>
                            <Group justify="space-between" mb="xs">
                                <Text fw={700} size="sm">People Nearby</Text>
                                <Badge color="blue" variant="filled">2 New</Badge>
                            </Group>
                            <Stack gap="md">
                                {nearbyPeople.map((person) => (
                                    <UnstyledButton key={person.id} className={classes.personItem}>
                                        <Group wrap="nowrap" gap="sm">
                                            <Avatar
                                                src={person.avatar}
                                                alt={person.name}
                                                size="md"
                                                radius="xl"
                                                style={{ alignSelf: 'flex-start' }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <Text size="sm" fw={500}>{person.name}</Text>
                                                <Text size="xs" c="dimmed">{person.distance}</Text>
                                                <Group gap={4} mt={4}>
                                                    {person.interests.map((interest, idx) => (
                                                        <Badge
                                                            key={idx}
                                                            size="xs"
                                                            variant="light"
                                                            color="blue"
                                                        >
                                                            {interest}
                                                        </Badge>
                                                    ))}
                                                </Group>
                                            </div>
                                            <Button variant="light" size="xs" radius="xl">
                                                Connect
                                            </Button>
                                        </Group>
                                    </UnstyledButton>
                                ))}
                            </Stack>
                        </Card>

                        {/* Active Community */}
                        <Card className={classes.communityCard} withBorder>
                            <Group justify="space-between" mb="xs">
                                <Text fw={700} size="sm">Featured Community</Text>
                                <IconUsers size={20} className={classes.sectionIcon} />
                            </Group>
                            <Card.Section p="md">
                                <Image
                                    src={trendingCommunities.image}
                                    alt={trendingCommunities.name}
                                    className={classes.communityImage}
                                />
                            </Card.Section>
                            <Stack gap="xs">
                                <Text fw={500} size="sm">{trendingCommunities.name}</Text>
                                <Group gap="xs">
                                    <IconUsers size={16} />
                                    <Text size="xs" c="dimmed">{trendingCommunities.members}</Text>
                                </Group>
                                <Group gap="xs">
                                    <IconActivity size={16} />
                                    <Text size="xs" c="dimmed">{trendingCommunities.todaysPosts}</Text>
                                </Group>
                                <Button fullWidth variant="filled" color="blue" leftSection={<IconHeart size={16} />}>
                                    Join Community
                                </Button>
                            </Stack>
                        </Card>

                        {/* Popular Interests */}
                        <Card className={classes.section} withBorder>
                            <Group justify="space-between" mb="md">
                                <Text fw={700} size="sm">Discover Interests</Text>
                                <IconMapPin size={20} className={classes.sectionIcon} />
                            </Group>
                            <List spacing="xs" size="sm" className={classes.interestList}>
                                {popularInterests.map((interest, index) => (
                                    <List.Item
                                        key={index}
                                        className={classes.interestItem}
                                    >
                                        <Group justify="space-between" wrap="nowrap">
                                            <Text size="sm">{interest}</Text>
                                            <IconChevronRight size={16} className={classes.chevron} />
                                        </Group>
                                    </List.Item>
                                ))}
                            </List>
                        </Card>
                    </Stack>
                </div>
            </div>
        </div>
    );
}

export default RightSidebar; 