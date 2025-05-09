import { zodResolver } from '@hookform/resolvers/zod';
import { Search, X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFilter = z.infer<typeof orderFilterSchema>;

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get('orderId');
  const customerName = searchParams.get('customerName');
  const status = searchParams.get('status');
  const { register, handleSubmit, control, reset } = useForm<OrderFilter>({
    resolver: zodResolver(orderFilterSchema),
    defaultValues: {
      orderId: orderId || '',
      customerName: customerName || '',
      status: status || 'all',
    },
  });

  function handleFilter({ orderId, customerName, status }: OrderFilter) {
    setSearchParams((state) => {
      if (orderId) {
        state.set('orderId', orderId);
      } else {
        state.delete('orderId');
      }

      if (customerName) {
        state.set('customerName', customerName);
      } else {
        state.delete('customerName');
      }

      if (status) {
        state.set('status', status);
      } else {
        state.delete('status');
      }
      state.set('page', '1');
      return state;
    });
  }

  function handleClearFilter() {
    setSearchParams((state) => {
      state.delete('orderId');
      state.delete('customerName');
      state.delete('status');
      state.set('page', '1');
      reset({
        orderId: '',
        customerName: '',
        status: 'all',
      });
      return state;
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtrar por:</span>
      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        {...register('orderId')}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register('customerName')}
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, value, name, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              onValueChange={onChange}
              name={name}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em processamento</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />
      <Button
        type="submit"
        variant="secondary"
        size="xs"
        className="h-8 w-auto"
      >
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button
        onClick={handleClearFilter}
        type="button"
        variant="outline"
        size="xs"
        className="h-8 w-auto"
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}
