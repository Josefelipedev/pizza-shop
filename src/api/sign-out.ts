import { api } from '@/lib/axios.ts';

export async function signOut() {
  return await api.post('/sign-out');
}
