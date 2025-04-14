import { FC } from 'react'
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import { Header, Navbar, Spinner } from '@/components'

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
    </>
  )
}

const RouterStack = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      lazy={async () => {
        const { Layout } = await import('@/components/Layout')
        return {
          Component: Layout,
        }
      }}
    >
      <Route
        index
        lazy={async () => {
          const { Home } = await import('@/pages/Home')
          return {
            Component: Home,
          }
        }}
      />

      <Route
        path="/Home"
        lazy={async () => {
          const { Home } = await import('@/pages/Home')
          return {
            Component: Home,
          }
        }}
      />

      <Route
        path="/Login"
        lazy={async () => {
          const { Login } = await import('@/pages/Login')
          return {
            Component: Login,
          }
        }}
      />

      <Route
        path="/signup"
        lazy={async () => {
          const { SignUp } = await import('@/pages/SignUp')
          return {
            Component: SignUp,
          }
        }}
      />

      <Route
        path="*"
        lazy={async () => {
          const { NotFound } = await import('@/pages/NotFound')
          return {
            Component: NotFound,
          }
        }}
      />
    </Route>,
  ),
)

const Routes: FC = () => {
  return <RouterProvider router={RouterStack} fallbackElement={<Spinner />} />
}

export { Routes }
