type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered';

interface OrderStatusProps {
  status: OrderStatus;
}

const OrderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  processing: 'Em processamento',
  delivering: 'Em entrega',
  delivered: 'Entregue',
};
export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}
      {status === 'canceled' && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}
      {['processing', 'delivering'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      )}

      {status === 'delivered' && (
        <span className="h-2 w-2 rounded-full bg-green-400" />
      )}
      <span className="text-muted-foreground font-medium">
        {' '}
        {OrderStatusMap[status]}
      </span>
    </div>
  );
}
