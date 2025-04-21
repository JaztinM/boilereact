import { GoogleOAuthProvider } from '@react-oauth/google'

//import { axiosInstance } from '@/libs'
//import { useEffect } from 'react'
import { ApolloProvider } from '@apollo/client'

import client from '@/libs/apolloClient'
import {
  ErrorBoundaryProvider,
  NotificationProvider,
  QueryProvider,
  ThemeProvider,
} from '@/providers'
import { Routes } from '@/routes'

const App = () => {
  /*
  useEffect(() => {
    axiosInstance.get('/sanctum/csrf-cookie', { withCredentials: true }).then((res) => {
      console.log(res)
    })
  })*/

  return (
    <ErrorBoundaryProvider>
      <ThemeProvider>
        <GoogleOAuthProvider clientId="">
          <NotificationProvider>
            <ApolloProvider client={client}>
              <QueryProvider>
                <Routes />
              </QueryProvider>
            </ApolloProvider>
          </NotificationProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </ErrorBoundaryProvider>
  )
}

export { App }
