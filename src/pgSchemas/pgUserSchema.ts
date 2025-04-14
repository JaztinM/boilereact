import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
        username
        email
        created_at
      }
    }
  }
`

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $mobile: String!, $password: String!) {
    registerUser(email: $email, mobile: $mobile, password: $password) {
      user {
        id
        username
        email
        mobile
        created_at
      }
    }
  }
`
