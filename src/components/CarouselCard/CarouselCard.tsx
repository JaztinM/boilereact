import { useRef } from 'react'

import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css'
import { Box, Button, Card, Group, Image, Text, Title } from '@mantine/core'
import '@mantine/core/styles.css'
import Autoplay from 'embla-carousel-autoplay'

import classes from './CarouselCard.module.css'

export function CarouselCard({ data, loading }: { data: any[]; loading: boolean }) {
  const autoplay = useRef(Autoplay({ delay: 5000 }))

  const slides = !loading ? (
    data.map((data) => (
      <Carousel.Slide key={data?.id} style={{ height: '400px' }}>
        <Image src={data?.details?.logo} style={{ height: '100%' }} />
        <Box
          style={{ backdropFilter: 'blur(25px) brightness(0.4)', position: 'absolute', inset: 0 }}
        ></Box>
        <Box className={classes.content}>
          <Box className={classes.image_container}>
            <Image src={data?.details?.logo} />
          </Box>
          <Box className={classes.text_container}>
            <Title order={1}>{data?.name}</Title>
            <p>{data?.details?.description}</p>
            <Box>
              <p>
                Market Cap: <span>${data?.quote?.USD.market_cap}</span>
              </p>
              <p>
                Current Price: <span>${data?.quote?.USD.price}</span>
              </p>
            </Box>
          </Box>
        </Box>
      </Carousel.Slide>
    ))
  ) : (
    <Carousel.Slide key={0} style={{ position: 'relative', height: '500px' }}>
      <Box style={{ position: 'absolute', inset: 0, border: 'none', outline: 'none' }}></Box>
      <Box className={classes.content}>
        <Box
          className={classes.image_container}
          style={{
            backgroundColor: 'rgb(128 128 128 / 18%)',
            height: '100%',
            border: 'none!important',
            outline: 'none',
          }}
        ></Box>
        <Box
          className={classes.text_container}
          style={{
            backgroundColor: 'rgb(128 128 128 / 18%)',
            height: '100%',
            border: 'none!important',
            outline: 'none',
          }}
        >
          <Title order={1}>{}</Title>
          <p>{}</p>
          <Box></Box>
        </Box>
      </Box>
    </Carousel.Slide>
  )
  return (
    <Card radius="md" withBorder padding="xl">
      <Card.Section>
        <Carousel
          withIndicators
          loop
          plugins={[autoplay.current]}
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
      </Card.Section>
    </Card>
  )
}
