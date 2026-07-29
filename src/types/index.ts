export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}
