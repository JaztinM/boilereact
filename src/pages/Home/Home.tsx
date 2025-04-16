import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { useShape } from '@electric-sql/react'
import {
  Anchor, Box, Button, Container, Flex, Image, Input, Text, Title,
  Avatar, TextInput, Group, Stack
} from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { S } from 'vitest/dist/reporters-yx5ZTtEV.js'

import { CarouselCard, PostCreator, RightSidebar } from '@/components'
import { Header, Navbar } from '@/components'
import { get } from '@/libs'
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
    <Container className={classes.container} fluid>
      <div className={classes.sidebar}>
        <Navbar />
      </div>
      <div className={classes.post_container}>
        <PostCreator />
        {samplePosts.map((post, index) => (
          <Posts key={index} posts={post} />
        ))}
      </div>
      <RightSidebar />
    </Container>
  )
}

export { Home }
