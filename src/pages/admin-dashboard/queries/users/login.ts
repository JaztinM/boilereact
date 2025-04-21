import { gql } from '@apollo/client';
import { LoginResponse } from '../../types';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export interface LoginVariables {
  email: string;
  password: string;
}

export interface LoginResponseData {
  login: LoginResponse;
} 