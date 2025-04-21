import { FC, Suspense } from 'react'
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import { Header, Navbar, Spinner } from '@/components'
import MainLayout from '@/pages/admin-dashboard/layouts/MainLayout'

const RouterStack = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
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

      {/* Admin Routes */}
      <Route
        element={
          <Suspense fallback={<Spinner />}>
            <MainLayout />
          </Suspense>
        }
      >
        <Route
          path="/admin/dashboard"
          lazy={async () => {
            const { default: Dashboard } = await import('@/pages/admin-dashboard/pages/Dashboard')
            return {
              Component: Dashboard,
            }
          }}
        />
        <Route
          path="/admin/flagged"
          lazy={async () => {
            const { default: FlaggedPosts } = await import('@/pages/admin-dashboard/pages/FlaggedPosts')
            return {
              Component: FlaggedPosts,
            }
          }}
        />
        <Route
          path="/admin/verification"
          lazy={async () => {
            const { default: VerificationPage } = await import('@/pages/admin-dashboard/pages/VerificationPage')
            return {
              Component: VerificationPage,
            }
          }}
        />
      </Route>

      <Route
        path="/admin/login"
        lazy={async () => {
          const { default: AdminLogin } = await import('@/pages/admin-dashboard/pages/Login')
          return {
            Component: AdminLogin,
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
