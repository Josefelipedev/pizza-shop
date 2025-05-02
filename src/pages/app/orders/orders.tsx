import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router';
import { z } from 'zod';

import { getOrder } from '@/api/get-order.ts';
import { Pagination } from '@/components/pagination.tsx';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx';
import { OrderTableFilters } from '@/pages/app/orders/order-table-filters.tsx';
import { OrderTalbeRow } from '@/pages/app/orders/order-talbe-row.tsx';

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get('orderId');
  const customerName = searchParams.get('customerName');
  const status = searchParams.get('status');

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') || '1');
  const { data: result } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrder({
        pageIndex: pageIndex,
        orderId,
        customerName,
        status: status == 'all' ? null : status,
      }),
  });

  function handlePageChange(page: number) {
    setSearchParams((prev) => {
      prev.set('page', (page + 1).toString());
      return prev;
    });
  }

  return (
    <div>
      <Helmet title="Orders" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]"> Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>CLiente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result?.orders?.map((order) => (
                  <OrderTalbeRow key={order.orderId} order={order} />
                ))}
              </TableBody>
            </Table>
          </div>
          {result && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
