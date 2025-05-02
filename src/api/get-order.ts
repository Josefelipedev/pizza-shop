import { api } from '@/lib/axios.ts';

export interface GetOrderQuery {
  pageIndex: number | null;
  orderId?: string | null;
  customerName?: string | null;
  status?: string | null;
}

export interface GetOrderResponse {
  orders: {
    orderId: string;
    createdAt: string;
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getOrder({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrderQuery) {
  const response = await api.get<GetOrderResponse>(`/orders`, {
    params: {
      pageIndex: pageIndex,
      orderId,
      customerName,
      status,
    },
  });
  return response.data;
}
