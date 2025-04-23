import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { TableCell, TableRow } from '@/components/ui/table.tsx';

export function OrderTalbeRow() {
  return (
    <>
      <TableRow>
        <TableCell>
          <Button variant="outline" size="xs">
            <Search className="h-3 w-3" />
            <span className="sr-only">Detalhes do pedido</span>
          </Button>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          123456789
        </TableCell>
        <TableCell className="text-muted-foreground"> há 1 dia</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            <span className="text-muted-foreground font-medium">Pendente</span>
          </div>
        </TableCell>
        <TableCell className="font-medium">João da Silva</TableCell>
        <TableCell className="font-medium">R$ 100,00</TableCell>
        <TableCell>
          <Button variant="ghost" size="xs">
            <X className="h-3 w-3" />
            Aprovar
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="ghost" size="xs">
            <X className="h-3 w-3" />
            Cancelar
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
