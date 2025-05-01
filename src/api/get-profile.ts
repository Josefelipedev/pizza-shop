import { api } from '@/lib/axios.ts';

export interface GetProfile {
  name: string;
  id: string;
  email: string;
  phone: string | null;
  role: 'manager' | 'customer';
  createdAt: Date | null;
  updatedAt: Date | null;
}

export async function getProfile() {
  const response = await api.get<GetProfile>('/me');
  return response.data;
}
