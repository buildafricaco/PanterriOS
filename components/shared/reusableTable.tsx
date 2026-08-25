'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  type ColumnDef,
  columnVisibilityFeature,
  createPaginatedRowModel,
  rowPaginationFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table';

import { Inbox } from 'lucide-react';
import { PaginationControls } from './PaginationControls';

interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
}

interface PaginationRenderProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  entityName: string;
}

const reusableTableFeatures = tableFeatures({
  columnVisibilityFeature,
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
});

export type ReusableTableColumnDef<TData extends object> = ColumnDef<
  typeof reusableTableFeatures,
  TData
>;

interface TableProp<TData extends object> {
  data: TData[];
  columns: ReusableTableColumnDef<TData>[];
  entityName?: string;
  pagination?: PaginationConfig;
  pageSize?: number;
  renderPagination?: (props: PaginationRenderProps) => React.ReactNode;
  hidePagination?: boolean;
}
export function ReUseAbleTable<TData extends object>({
  data,
  columns,
  entityName = 'results',
  pagination,
  pageSize = 10,
  renderPagination,
  hidePagination = false,
}: TableProp<TData>) {
  const table = useTable({
    features: reusableTableFeatures,
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
    manualPagination: Boolean(pagination),
  });

  const hasData = data?.length > 0;

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border border-[#E2E2E2] bg-white">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#FAFAFA] ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-[#F9FAFB]">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-14 whitespace-nowrap px-4 py-3 font-medium uppercase text-[#737373] sm:px-4"
                    >
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {hasData ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b min-h-20  border-[#E2E2E2] hover:bg-[#F9FAFB]/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-4 text-sm font-normal  capitalize whitespace-normal wrap-break-word sm:px-4"
                      >
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-64 text-center"
                  >
                    <div className="flex flex-col items-center justify-center py-12">
                      <Inbox className="h-12 w-12 text-[#9CA3AF] mb-4" />
                      <h3 className="text-lg font-semibold text-[#111827] mb-2">
                        No data available
                      </h3>
                      <p className="text-sm text-[#6B7280]">
                        There are no records to display at the moment.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {hasData && !hidePagination && (
          <div className="px-4 py-4 sm:px-6">
            {renderPagination ? (
              renderPagination(
                pagination
                  ? {
                      currentPage: pagination.currentPage,
                      totalPages: pagination.totalPages,
                      totalItems: pagination.totalItems,
                      itemsPerPage: pagination.limit,
                      onPageChange: pagination.onPageChange,
                      entityName,
                    }
                  : {
                      currentPage: table.state.pagination.pageIndex + 1,
                      totalPages: table.getPageCount(),
                      totalItems: data.length,
                      itemsPerPage: table.state.pagination.pageSize,
                      onPageChange: (page) => table.setPageIndex(page - 1),
                      entityName,
                    },
              )
            ) : pagination ? (
              <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.limit}
                onPageChange={pagination.onPageChange}
                entityName={entityName}
                className="pt-0"
              />
            ) : (
              <PaginationControls
                currentPage={table.state.pagination.pageIndex + 1}
                totalPages={table.getPageCount()}
                totalItems={data.length}
                itemsPerPage={table.state.pagination.pageSize}
                onPageChange={(page) => table.setPageIndex(page - 1)}
                entityName={entityName}
                className="pt-0"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
