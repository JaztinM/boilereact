import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { useShape } from '@electric-sql/react'
import { Anchor, Box, Button, Container, Flex, Image, Input, Text, Title } from '@mantine/core'
import { S } from 'vitest/dist/reporters-yx5ZTtEV.js'

import { CarouselCard } from '@/components'
import { Header, Navbar } from '@/components'
import { get } from '@/libs'
import { axios } from '@/libs'
import { GET_TOKENS } from '@/pgSchemas'

import classes from './Home.module.css'

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

  return (
    <Container className={classes.container} fluid style={{ margin: 0, padding: '0' }}>
      <Flex
        display="flex"
        direction="column"
        justify="center"
        align="center"
        h="100%"
        gap="lg"
        ml="80px"
      >
        <Header />
        <Box className={classes.content}>
          <Flex direction="column" justify="center" align="start" gap="1.5rem">
            <Title order={3}>Research Tasks</Title>
            <Box className={classes.top_voted}>
              <Title order={4}>Research Configurations</Title>
              <Box className={classes.research_config_container}>
                <Box>
                  <Button
                    className={classes.specific}
                    onClick={() => {
                      setConfig({ ...config, type: 'specific' })
                    }}
                  >
                    <Title order={3}>Specific Influerncer</Title>
                    <Text size="sm">Research a known health influencer by name</Text>
                  </Button>

                  <Box>
                    <Title order={4}>Time Range</Title>
                    <Box className={classes.research_config_container}>
                      <Box className={classes.timeframe_container}>
                        <Button
                          className={classes.specific}
                          onClick={() => {
                            setConfig({ ...config, timeRange: 'Last Week' })
                          }}
                        >
                          <Text size="md">Last Week</Text>
                        </Button>
                        <Button
                          className={classes.specific}
                          onClick={() => {
                            setConfig({ ...config, timeRange: 'Last Month' })
                          }}
                        >
                          <Text size="md">Last Month</Text>
                        </Button>
                        <Button
                          className={classes.specific}
                          onClick={() => {
                            setConfig({ ...config, timeRange: 'Last Year' })
                          }}
                        >
                          <Text size="md">Last Year</Text>
                        </Button>
                        <Button
                          className={classes.specific}
                          onClick={() => {
                            setConfig({ ...config, timeRange: 'All Time' })
                          }}
                        >
                          <Text size="md">All Time</Text>
                        </Button>
                      </Box>
                    </Box>
                  </Box>

                  <Box className={classes.search_influencer}>
                    <Title order={5}>Influencer Name</Title>
                    <Input
                      placeholder="Enter Influencer Name"
                      onChange={(e) => {
                        setConfig({ ...config, influencerName: e.target.value })
                      }}
                    />
                  </Box>

                  <Box className={classes.search_influencer}>
                    <Title order={5}>Claims to Analyze for Influencer</Title>
                    <Input
                      type="number"
                      placeholder="Enter Number"
                      onChange={(e) => {
                        setConfig({ ...config, claimsNumber: Number(e.target.value) })
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Button
                    className={classes.discover_new}
                    onClick={() => {
                      setConfig({ ...config, type: 'new' })
                    }}
                  >
                    <Title order={3}>Discover New</Title>
                    <Text size="sm">Research a known health influencer by name</Text>
                  </Button>
                </Box>
                <Box className={classes.journal_container}>
                  <Title order={5}>Scientific Journals</Title>
                  <Box className={classes.journal_button_container}>
                    <Button className={classes.journal_button}>
                      <Text size="md">PubMed Central</Text>
                      <Button></Button>
                    </Button>
                    <Button className={classes.journal_button}>
                      <Text size="md">JAMA Network</Text>
                      <Button></Button>
                    </Button>
                    <Button className={classes.journal_button}>
                      <Text size="md">Nature</Text>
                      <Button></Button>
                    </Button>
                    <Button className={classes.journal_button}>
                      <Text size="md">New England Journal of Medicine</Text>
                      <Button></Button>
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box className={classes.submit_button}>
                <Button>
                  <Title order={5}>+ Start Research</Title>
                </Button>
              </Box>
            </Box>
          </Flex>

          <Box style={{ height: '600px', display: 'flex', backgroundColor: '' }}></Box>

          <Box>
            <Text ta="center" p="sm">
              Edit <code>src/App.tsx</code> and save to test HMR
            </Text>

            <Text ta="center" p="sm">
              Click on the Vite, React and Eruption logos to learn more.
            </Text>
          </Box>

          <Box></Box>
        </Box>
      </Flex>
    </Container>
  )
}

export { Home }
