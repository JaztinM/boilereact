export interface User {
  id: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Post {
  id: string;
  title: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  date: string;
}

export interface FlaggedPost extends Post {
  reason: string;
}

export interface VerificationRequest {
  id: string;
  title: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  images: string[];
} 