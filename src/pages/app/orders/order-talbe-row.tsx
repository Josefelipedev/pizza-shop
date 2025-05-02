import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

import { cencelOrder } from '@/api/cancel-order.ts';
import { GetOrderResponse } from '@/api/get-order.ts';
import { OrderStatus } from '@/components/order-status/order-status.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx';
import { TableCell, TableRow } from '@/components/ui/table.tsx';
import { OrderDetails } from '@/pages/app/orders/order-details.tsx';

export interface OrderTalbeRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
    customerName: string;
    total: number;
  };
}

export function OrderTalbeRow({ order }: OrderTalbeRowProps) {
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cencelOrder,
    async onSuccess(_, { orderId }) {
      const ordersListCache = queryClient.getQueriesData<GetOrderResponse>({
        queryKey: ['orders'],
      });

      ordersListCache.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) {
          return;
        }

        queryClient.setQueryData<GetOrderResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order) => {
            if (order.orderId === orderId) {
              return { ...order, status: 'canceled' };
            }

            return order;
          }),
        });
      });
    },
  });

  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog open={isDetailsOpen} onOpenChange={setDetailsOpen}>
            <DialogTrigger>
              <Button variant="outline" size="xs">
                <Search className="h-3 w-3" />
                <span className="sr-only">Detalhes do pedido</span>
              </Button>
            </DialogTrigger>
            <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {order.orderId}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {' '}
          {formatDistanceToNow(order.createdAt, {
            locale: ptBR,
            addSuffix: true,
          })}
        </TableCell>
        <TableCell>
          <OrderStatus status={order.status} />
        </TableCell>
        <TableCell className="font-medium"> {order.customerName}</TableCell>
        <TableCell className="font-medium">
          R${' '}
          {(order.total / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </TableCell>
        <TableCell>
          <Button variant="ghost" size="xs">
            <X className="h-3 w-3" />
            Aprovar
          </Button>
        </TableCell>
        <TableCell>
          <Button
            onClick={() => cancelOrderFn({ orderId: order.orderId })}
            disabled={!['pending', 'processing'].includes(order.status)}
            variant="ghost"
            size="xs"
          >
            <X className="h-3 w-3" />
            Cancelar
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
