import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Your GraphQL backend URL
  cache: new InMemoryCache(),
  credentials: 'include',
})

export default client
