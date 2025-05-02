import { api } from '@/lib/axios.ts';

export interface GetOrderDetalisParams {
  orderId: string;
}
export interface GetOrderDetalisResponse {
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
  id: string;
  createdAt: string;
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
}
export async function getOrderDetails({ orderId }: GetOrderDetalisParams) {
  const response = await api.get<GetOrderDetalisResponse>(`/orders/${orderId}`);
  return response.data;
}
