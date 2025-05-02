import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';

export type PaginationProps = {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  onChange: (page: number) => void;
};

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  onChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">
        Total de {totalCount} item(s)
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          {' '}
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onChange(0)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            onClick={() => onChange(pageIndex - 1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Página Anterior</span>
          </Button>
          <Button
            onClick={() => onChange(pageIndex + 1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === pages - 1}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            onClick={() => onChange(pages - 1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === pages - 1}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Ultima página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
