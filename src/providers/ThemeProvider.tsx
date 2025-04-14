import { FC } from 'react'

import { MantineProvider, localStorageColorSchemeManager } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import { theme } from '@/styles'

type ThemeProviderProps = {
  children: JSX.Element | JSX.Element[]
}
const colorSchemeManager = localStorageColorSchemeManager({
  key: 'app-color-scheme',
})

const ThemeProvider: FC<ThemeProviderProps> = ({ children }): JSX.Element => {
  return (
    <MantineProvider
      defaultColorScheme="dark"
      theme={theme}
      colorSchemeManager={colorSchemeManager}
    >
      {children}
    </MantineProvider>
  )
}

export { ThemeProvider }
