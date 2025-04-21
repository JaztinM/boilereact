import { gql } from '@apollo/client';
import { User } from '../../types';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $email: String!) {
    updateUser(id: $id, email: $email) {
      id
      email
    }
  }
`;

export interface CurrentUserResponse {
  currentUser: User;
}

export interface UpdateUserVariables {
  id: string;
  email: string;
} 