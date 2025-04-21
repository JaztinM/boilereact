import { useNavigate, useLocation } from 'react-router-dom'
import { Stack, Avatar, Text, Button, Card, Image, Divider } from '@mantine/core'
import classes from './NavbarMinimal.module.css'

interface PersonNearbyProps {
  name: string;
  message: string;
  avatarUrl?: string;
  distance: string;
  isOnline: boolean;
  mutualInterests?: string[];
  lastActive?: string;
}

function PersonNearby({
  name,
  message,
  avatarUrl,
  distance,
  isOnline,
  mutualInterests,
  lastActive
}: PersonNearbyProps) {
  return (
    <div className={classes.personCard}>
      <div className={classes.avatarWrapper}>
        <Avatar src={avatarUrl} radius="xl" size="md" color="blue">
          {name.charAt(0)}
        </Avatar>
        {isOnline && <div className={classes.onlineIndicator} />}
      </div>
      <div className={classes.personInfo}>
        <div className={classes.personHeader}>
          <Text size="sm" fw={500}>{name}</Text>
          <Text size="xs" c="dimmed">{distance}</Text>
        </div>
        <Text size="xs" c="dimmed" lineClamp={1}>{message}</Text>
        {mutualInterests && mutualInterests.length > 0 && (
          <Text size="xs" c="blue.5" mt={4}>
            {mutualInterests.length} mutual interests
          </Text>
        )}
        {!isOnline && lastActive && (
          <Text size="xs" c="dimmed.5" mt={4}>
            Active {lastActive}
          </Text>
        )}
      </div>
    </div>
  );
}

interface CommunityItemProps {
  name: string;
  memberCount: number;
  description: string;
}

function CommunityItem({ name, memberCount, description }: CommunityItemProps) {
  return (
    <div className={classes.communityItem}>
      <div className={classes.communityIcon} />
      <div className={classes.communityInfo}>
        <Text size="sm" fw={500}>{name}</Text>
        <Text size="xs" c="dimmed">{memberCount} members</Text>
        <Text size="xs" mt={4}>{description}</Text>
      </div>
    </div>
  );
}

export function Navbar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.scrollWrapper}>
        <div className={classes.scrollContainer}>
          <div className={classes.section}>
            <Text className={classes.sectionTitle}>people near me</Text>
            <Text c="dimmed" mb="md">Looking for someone near your place?</Text>

            <Stack gap="sm">
              <PersonNearby
                name="David Zaleski"
                message="hi, looking forward to meeting"
                distance="2.5 km away"
                isOnline={true}
                mutualInterests={["Skateboarding", "Photography"]}
              />
              <PersonNearby
                name="Ann Tubato"
                message="Wanna hang out?"
                distance="3.8 km away"
                isOnline={false}
                lastActive="2h ago"
                mutualInterests={["Basketball"]}
              />
              <PersonNearby
                name="John Doe"
                message="Hope we can be friends!"
                distance="5 km away"
                isOnline={true}
                mutualInterests={["Volleyball", "Gaming"]}
              />
            </Stack>

            <Button
              variant="filled"
              fullWidth
              mt="md"
              color="blue"
              className={classes.viewMoreBtn}
            >
              View More
            </Button>
          </div>

          <Divider my="md" />

          <div className={classes.section}>
            <Text className={classes.sectionTitle}>communities</Text>
            <Text c="dimmed" mb="md">Join groups of people that you can vibe with</Text>

            <Stack gap="sm">
              <CommunityItem
                name="Skateboarding"
                memberCount={23}
                description="Join us and enjoy life as we please."
              />
              <CommunityItem
                name="Basketball"
                memberCount={45}
                description="Join us and enjoy life as we please."
              />
              <CommunityItem
                name="Volleyball"
                memberCount={34}
                description="Join us and enjoy life as we please."
              />
            </Stack>

            <Button
              variant="filled"
              fullWidth
              mt="md"
              color="blue"
              className={classes.viewMoreBtn}
            >
              View More
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
