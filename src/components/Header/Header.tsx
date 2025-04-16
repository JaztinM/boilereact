import { useNavigate } from 'react-router-dom'

import { Autocomplete, Box, Burger, Button, Group } from '@mantine/core'
import { useMantineColorScheme } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

import classes from './HeaderSearch.module.css'

const links = [
  /*{ link: '/leaderboard', label: 'Leaderboard' },
  { link: '/products', label: 'Products' },
  { link: '/monetization', label: 'Monetization' },
  { link: '/about', label: 'About' },
  { link: '/contact', label: 'Contact' },
  { link: '/login', label: 'Login' },
   */
]

export function Header() {
  const navigate = useNavigate()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => {
        event.preventDefault()
        navigate(link.link)
      }}
    >
      {link.label}
    </a>
  ))

  console.log(colorScheme)

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group></Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          {/*
                         <Autocomplete
                        className={classes.search}
                        placeholder="Search"
                        leftSection={<IconSearch size={16} stroke={1.5} />}
                        data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                        visibleFrom="xs"
                    />
                        */}

          {
            //@ts-ignore
            <Button
              className={classes.theme_mode}
              scheme={colorScheme}
              onClick={() => toggleColorScheme()}
            >
              <div>
                <span>&#9788;</span>
              </div>
            </Button>
          }
        </Group>
      </div>
    </header>
  )
}
