import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { useShape } from '@electric-sql/react'
import {
  Button, Container, Text,
  Avatar, TextInput, Group, Stack, Drawer, useMantineColorScheme, UnstyledButton
} from '@mantine/core'
import { useDisclosure, useViewportSize } from '@mantine/hooks'
import {
  IconSearch,
  IconMessage2,
  IconBell,
  IconSun,
  IconMoon,
  IconHome2,
  IconUsers,
  IconLogout,
  IconPencilPlus
} from '@tabler/icons-react'

import { PostCreator, RightSidebar } from '@/components'
import { Header, Navbar } from '@/components'
import { axios } from '@/libs'
import { GET_TOKENS } from '@/pgSchemas'
import classes from './Home.module.css'

import Posts from '@/components/Posts'

type Item = { id: string }
const baseUrl = import.meta.env.ELECTRIC_URL ?? `http://localhost:4000`

const Home: FC = (): JSX.Element => {
  const [config, setConfig] = useState({
    type: '',
    timeRange: '',
    influencerName: '',
    claimsNumber: 10,
    scientificJournalType: [],
  })

  const { data, loading, error } = useQuery(GET_TOKENS)
  const { width } = useViewportSize();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();

  const showHeader = width <= 1100;
  const showRightSidebar = width > 1100;
  const showLeftSidebar = width > 900;
  const showBurger = width <= 900;

  // Custom Header component that has access to our drawer state
  const CustomHeader = () => {
    return (
      <Header
        showTrending={width <= 1100 && width > 900}
        drawerOpened={drawerOpened}
        toggleDrawer={toggleDrawer}
      />
    );
  };

  const { data: items } = useShape<Item>({
    url: `${baseUrl}/v1/shape`,
    params: {
      table: `items`,
    },
  })

  console.log(items)

  const fetchData = async () => {
    const apiKey = 'AIzaSyDZ2Oyd4t13MGm42D1YrZ8N2oncumQDTuw'
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

    const payload = {
      contents: [
        {
          parts: [
            {
              text: 'give me a list of famous health influencer that you know even if its not real time, their latest tweets and follower counts.',
            },
          ],
        },
      ],
    }

    try {
      const response = await axios.post(endpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log(response.data) // Process the response
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Test data for multiple image examples
  const samplePosts = [
    {
      name: 'Lighthouse',
      content: 'We help people connect boldly without fear of judgment, harm, or shame.',
      time: '6h',
      icon: 'https://placehold.co/40x40/007bff/ffffff?text=L',
      images: ['https://placehold.co/600x400/e2e2e2/808080?text=Single+Image'],
      likes: '1.8k others',
      comments: 'no comments yet'
    },
    {
      name: 'John',
      content: 'Check out these two photos from my vacation! The beach was absolutely stunning with crystal clear waters and pristine white sand. We spent the entire day just relaxing and soaking up the sun. The mountains were even more breathtaking - we hiked for hours and the views from the summit were worth every step.',
      time: '10 minutes ago',
      icon: 'https://placehold.co/40x40/17a2b8/ffffff?text=J',
      images: [
        'https://placehold.co/600x400/87CEEB/333333?text=Beach',
        'https://placehold.co/600x400/98FB98/333333?text=Mountain'
      ],
      likes: '42 others',
      comments: '5 comments'
    },
    {
      name: 'Sarah',
      content: 'My trip to the museum was amazing! Here are some highlights: The art exhibition featured works from renowned artists spanning three centuries. The modern art section was particularly fascinating, with interactive installations that challenged conventional perspectives. I spent hours in the historical artifacts section, where they had a special display of ancient Egyptian relics that were recently discovered. The guided tour provided so much insight into the creative processes behind each masterpiece.',
      time: '2h',
      icon: 'https://placehold.co/40x40/fd7e14/ffffff?text=S',
      images: [
        'https://placehold.co/600x800/FFB6C1/333333?text=Art+1',
        'https://placehold.co/600x400/F0E68C/333333?text=Art+2',
        'https://placehold.co/600x400/D8BFD8/333333?text=Art+3'
      ],
      likes: '128 others',
      comments: '24 comments'
    },
    {
      name: 'Mike',
      content: 'Photos from yesterday\'s conference:',
      time: '1d',
      icon: 'https://placehold.co/40x40/20c997/ffffff?text=M',
      images: [
        'https://placehold.co/600x400/B0C4DE/333333?text=Panel',
        'https://placehold.co/600x400/ADD8E6/333333?text=Speaker',
        'https://placehold.co/600x400/AFEEEE/333333?text=Audience',
        'https://placehold.co/600x400/B0E0E6/333333?text=Venue'
      ],
      likes: '301 others',
      comments: '42 comments'
    },
    {
      name: 'Emily',
      content: 'Photos from our team building event: It was such a productive day filled with fun activities and meaningful discussions. We started with icebreakers, followed by problem-solving challenges that really pushed us to think creatively and work together. The afternoon session included a workshop on effective communication, where we practiced active listening and giving constructive feedback. We ended the day with a casual dinner where everyone shared their personal goals for the upcoming quarter. This kind of team bonding is absolutely essential for building a positive workplace culture and improving overall collaboration.',
      time: '3d',
      icon: 'https://placehold.co/40x40/dc3545/ffffff?text=E',
      images: [
        'https://placehold.co/600x400/F08080/333333?text=Team+1',
        'https://placehold.co/600x400/E9967A/333333?text=Team+2',
        'https://placehold.co/600x400/FA8072/333333?text=Team+3',
        'https://placehold.co/600x400/FFA07A/333333?text=Team+4',
        'https://placehold.co/600x400/FF7F50/333333?text=Team+5',
        'https://placehold.co/600x400/FF6347/333333?text=Team+6'
      ],
      likes: '98 others',
      comments: '15 comments'
    }
  ];

  return (
    <>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title={
          <div className={classes.drawerHeader}>
            <svg width="22" height="38" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg" className={classes.drawerLogo}>
              <path d="M11.6759 28.1842C13.5006 27.486 15.0641 26.2427 16.1551 24.6254L16.7063 29.0354C16.9319 30.8402 15.8491 32.5525 14.1217 33.1223L4.00216 36.4607C2.36397 37.0011 0.983011 38.119 0.112825 39.5995L0.795944 34.4761C0.980285 33.0935 1.90602 31.9225 3.20871 31.4241L11.6759 28.1842Z" fill="currentColor" stroke="currentColor" strokeWidth="0.129032" />
              <path d="M10.9406 17.7976C12.5791 17.1539 13.913 15.9185 14.6812 14.3403L15.2578 18.0034C15.5373 19.7787 14.5369 21.5077 12.8585 22.1502L4.84106 25.2192C3.38744 25.7756 2.20951 26.8677 1.54271 28.2614L2.16061 23.3756C2.33524 21.9947 3.24961 20.8193 4.54505 20.3103L10.9406 17.7976Z" fill="currentColor" stroke="currentColor" strokeWidth="0.129032" />
              <path d="M8.9149 9.09467C10.8358 8.41018 12.3715 6.94279 13.1448 5.06352L13.6814 7.8914C14.0159 9.654 13.0742 11.4109 11.4212 12.1082L6.55219 14.1622C4.90935 14.8552 3.55262 16.0819 2.69761 17.6384L3.26615 13.3081C3.45219 11.8911 4.41627 10.6977 5.7625 10.218L8.9149 9.09467Z" fill="currentColor" stroke="currentColor" strokeWidth="0.129032" />
              <rect x="5.84766" width="5.16129" height="5.16129" rx="2.58065" fill="currentColor" />
            </svg>
            <Text className={classes.drawerTitleText}>LightHouse</Text>
          </div>
        }
        size="sm"
        classNames={{
          body: classes.drawerBody,
          header: classes.drawerHeaderContainer,
          content: classes.drawerContent,
          inner: classes.drawerInner
        }}
        withCloseButton
      >
        <div className={classes.mobileSearchSection}>
          <TextInput
            placeholder="Search"
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
          />
        </div>

        <div className={classes.drawerNavSection}>
          <Group className={classes.drawerNavGroup} p="sm">
            <UnstyledButton className={classes.navButton} onClick={() => navigate('/profile')}>
              <Avatar size="md" radius="xl" src="https://placehold.co/40x40/007bff/ffffff?text=J" />
            </UnstyledButton>
            <UnstyledButton className={classes.navButton} onClick={() => navigate('/messages')}>
              <IconMessage2 size={24} stroke={1.5} />
            </UnstyledButton>
            <UnstyledButton className={classes.navButton} onClick={() => navigate('/notifications')}>
              <IconBell size={24} stroke={1.5} />
            </UnstyledButton>
            <UnstyledButton className={classes.navButton} onClick={toggleColorScheme}>
              {colorScheme === 'dark' ? <IconSun size={24} stroke={1.5} /> : <IconMoon size={24} stroke={1.5} />}
            </UnstyledButton>
          </Group>
        </div>

        <div className={classes.drawerContent}>
          <Stack gap="md" style={{ height: '100%', justifyContent: 'space-between' }}>
            <Stack gap="sm" p="sm">
              <UnstyledButton className={classes.drawerLink} onClick={() => navigate('/')}>
                <Group>
                  <IconHome2 size={24} stroke={1.5} />
                  <Text size="md">Home</Text>
                </Group>
              </UnstyledButton>
              <UnstyledButton className={classes.drawerLink} onClick={() => navigate('/search')}>
                <Group>
                  <IconSearch size={24} stroke={1.5} />
                  <Text size="md">Search</Text>
                </Group>
              </UnstyledButton>
              <UnstyledButton className={classes.drawerLink} onClick={() => navigate('/notifications')}>
                <Group>
                  <IconBell size={24} stroke={1.5} />
                  <Text size="md">Notifications</Text>
                </Group>
              </UnstyledButton>
              <UnstyledButton className={classes.drawerLink} onClick={() => navigate('/groups')}>
                <Group>
                  <IconUsers size={24} stroke={1.5} />
                  <Text size="md">Groups</Text>
                </Group>
              </UnstyledButton>
            </Stack>

            <Stack gap="md" p="sm">
              <Button
                fullWidth
                size="md"
                radius="xl"
                className={classes.postButton}
                leftSection={<IconPencilPlus size={20} />}
              >
                post
              </Button>
              <UnstyledButton className={classes.drawerLink} onClick={toggleColorScheme}>
                <Group>
                  {colorScheme === 'dark' ? <IconSun size={24} stroke={1.5} /> : <IconMoon size={24} stroke={1.5} />}
                  <Text size="md">{colorScheme === 'dark' ? 'Light mode' : 'Dark mode'}</Text>
                </Group>
              </UnstyledButton>
              <UnstyledButton
                className={classes.drawerLink}
                onClick={() => {
                  // Add your logout logic here
                  navigate('/login')
                }}
              >
                <Group>
                  <IconLogout size={24} stroke={1.5} />
                  <Text size="md">Logout</Text>
                </Group>
              </UnstyledButton>
            </Stack>
          </Stack>
        </div>
      </Drawer>

      <Container className={classes.container} fluid>
        {<CustomHeader />}

        <div className={classes.content_container}>
          {showLeftSidebar && (
            <div className={classes.sidebar}>
              <Navbar />
            </div>
          )}
          <div className={classes.post_container}>
            <PostCreator />
            {samplePosts.map((post, index) => (
              <Posts key={index} posts={post} />
            ))}
          </div>
          {showRightSidebar && <RightSidebar />}
        </div>

      </Container>
    </>
  )
}

export { Home }
