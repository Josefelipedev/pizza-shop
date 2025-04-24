import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import colors from 'tailwindcss/colors';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';

const data = [
  { date: '24/04', revenue: 4000 },
  { date: '25/04', revenue: 3000 },
  { date: '26/04', revenue: 2000 },
  { date: '27/04', revenue: 2780 },
  { date: '28/04', revenue: 1890 },
  { date: '29/04', revenue: 2390 },
  { date: '30/04', revenue: 3490 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no periodo
          </CardTitle>
          <CardDescription>Receita diária no periodo</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart style={{ fontSize: 12 }} data={data}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
            <YAxis
              width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
              axisLine={false}
              tickLine={false}
              stroke="#888"
            />

            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type="linear"
              dataKey="revenue"
              stroke={colors.violet['500']}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
