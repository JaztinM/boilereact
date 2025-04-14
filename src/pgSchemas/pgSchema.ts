import { gql } from '@apollo/client'

export const GET_TOKENS = gql`
  query GetTokens($limit: Int, $offset: Int) {
    getTokens(limit: $limit, offset: $offset) {
      id
      name
      price
      description
    }
  }
`

export const GET_TOKEN = gql`
  query GetToken($id: ID!) {
    getToken(id: $id) {
      id
      name
      price
      description
    }
  }
`

export const ADD_TOKEN = gql`
  mutation AddToken($name: String!, $price: Float!, $description: String!) {
    addToken(name: $name, price: $price, description: $description) {
      id
      name
      price
      description
    }
  }
`

export const DELETE_TOKEN = gql`
  mutation DeleteToken($id: ID!) {
    deleteToken(id: $id)
  }
`

export const UPDATE_TOKEN = gql`
  mutation UpdateToken($updateTokenId: ID!) {
    updateToken(id: $updateTokenId) {
      id
      name
      price
      description
    }
  }
`
