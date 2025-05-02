import { api } from '@/lib/axios.ts';

export interface CencelOrderParams {
  orderId: string;
}

export async function cencelOrder({ orderId }: CencelOrderParams) {
  await api.patch(`/orders/${orderId}/cancel`);
}
