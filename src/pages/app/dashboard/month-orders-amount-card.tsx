import { Utensils } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';

export function MonthOrdersAmountCard() {
  return (
    <>
      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">
            Quantidade de pedidos (mês)
          </CardTitle>
          <Utensils className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent className="space-y-1">
          <span className="text-2xl font-bold tracking-tight"> 100</span>
          <p className="text-muted-foreground text-xs">
            <span className="text-emerald-500 dark:text-emerald-400">+20%</span>
            em relação ao mês passado
          </p>
        </CardContent>
      </Card>
    </>
  );
}
