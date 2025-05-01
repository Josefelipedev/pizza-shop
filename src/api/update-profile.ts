import { api } from '@/lib/axios.ts';

export interface UpdateProfile {
  name: string;
  description: string;
}

export async function updateProfile({ name, description }: UpdateProfile) {
  const response = await api.put<UpdateProfile>('/profile', {
    name,
    description,
  });
  return response.data;
}
