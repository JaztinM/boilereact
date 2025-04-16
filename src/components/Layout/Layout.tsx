import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Header, Navbar } from '@/components'

export function Layout() {
  return (
    <>
      {/* <Header /> 
      <Navbar />*/}
      <Outlet />
    </>
  )
}
