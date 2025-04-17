import { useNavigate } from 'react-router-dom'

import { Autocomplete, Box, Burger, Button, Group, Text, TextInput } from '@mantine/core'
import { useMantineColorScheme } from '@mantine/core'
import { useDisclosure, useViewportSize } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'

import classes from './HeaderSearch.module.css'

interface LinkItem {
  link: string;
  label: string;
}

const links: LinkItem[] = [
  /*{ link: '/leaderboard', label: 'Leaderboard' },
  { link: '/products', label: 'Products' },
  { link: '/monetization', label: 'Monetization' },
  { link: '/about', label: 'About' },
  { link: '/contact', label: 'Contact' },
  { link: '/login', label: 'Login' },
   */
]

interface HeaderProps {
  showTrending?: boolean;
  drawerOpened?: boolean;
  toggleDrawer?: () => void;
}

export function Header({ showTrending = false, drawerOpened = false, toggleDrawer }: HeaderProps) {
  const navigate = useNavigate()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { width } = useViewportSize();
  const [localOpened, { toggle: localToggle }] = useDisclosure(false);

  // Use either the provided external toggle or the local one
  const opened = drawerOpened !== undefined ? drawerOpened : localOpened;
  const toggle = toggleDrawer || localToggle;

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

  return (
    <header className={classes.header}>

      <div className={classes.inner}>
        <div className={classes.logo}>
          <svg width="22" height="38" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6759 28.1842C13.5006 27.486 15.0641 26.2427 16.1551 24.6254L16.7063 29.0354C16.9319 30.8402 15.8491 32.5525 14.1217 33.1223L4.00216 36.4607C2.36397 37.0011 0.983011 38.119 0.112825 39.5995L0.795944 34.4761C0.980285 33.0935 1.90602 31.9225 3.20871 31.4241L11.6759 28.1842Z" fill="currentColor" stroke="currentColor" stroke-width="0.129032" />
            <path d="M10.9406 17.7976C12.5791 17.1539 13.913 15.9185 14.6812 14.3403L15.2578 18.0034C15.5373 19.7787 14.5369 21.5077 12.8585 22.1502L4.84106 25.2192C3.38744 25.7756 2.20951 26.8677 1.54271 28.2614L2.16061 23.3756C2.33524 21.9947 3.24961 20.8193 4.54505 20.3103L10.9406 17.7976Z" fill="currentColor" stroke="currentColor" stroke-width="0.129032" />
            <path d="M8.9149 9.09467C10.8358 8.41018 12.3715 6.94279 13.1448 5.06352L13.6814 7.8914C14.0159 9.654 13.0742 11.4109 11.4212 12.1082L6.55219 14.1622C4.90935 14.8552 3.55262 16.0819 2.69761 17.6384L3.26615 13.3081C3.45219 11.8911 4.41627 10.6977 5.7625 10.218L8.9149 9.09467Z" fill="currentColor" stroke="currentColor" stroke-width="0.129032" />
            <rect x="5.84766" width="5.16129" height="5.16129" rx="2.58065" fill="currentColor" />
          </svg>
        </div>
        <Group>
          {width <= 900 && (
            <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
          )}
        </Group>

        <Group>

          {/* Show search in header for tablet size */}
          {width <= 1100 && width > 900 && (
            <TextInput
              className={classes.search}
              placeholder="Search"
              leftSection={<IconSearch size={16} stroke={1.5} />}
              radius="md"
            />
          )}
        </Group>
      </div>

    </header>
  )
}
