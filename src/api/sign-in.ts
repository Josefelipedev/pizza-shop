import { api } from '@/lib/axios.ts';

export interface SignInBody {
  email: string;
}

export async function signIn({ email }: SignInBody) {
  return await api.post('/authenticate', { email });
}
