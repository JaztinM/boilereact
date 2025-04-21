import { gql } from '@apollo/client';
import { Post, FlaggedPost, VerificationRequest } from '../../types';

// Posts Queries
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      status
      date
    }
  }
`;

export const GET_FLAGGED_POSTS = gql`
  query GetFlaggedPosts {
    flaggedPosts {
      id
      title
      reason
      date
      status
    }
  }
`;

export const UPDATE_POST_STATUS = gql`
  mutation UpdatePostStatus($id: ID!, $status: String!) {
    updatePostStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

// Verification Queries
export const GET_VERIFICATION_REQUESTS = gql`
  query GetVerificationRequests {
    verificationRequests {
      id
      title
      submittedDate
      status
      images
    }
  }
`;

export const UPDATE_VERIFICATION_STATUS = gql`
  mutation UpdateVerificationStatus($id: ID!, $status: String!) {
    updateVerificationStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

// Response Interfaces
export interface PostsResponse {
  posts: Post[];
}

export interface FlaggedPostsResponse {
  flaggedPosts: FlaggedPost[];
}

export interface VerificationRequestsResponse {
  verificationRequests: VerificationRequest[];
} 