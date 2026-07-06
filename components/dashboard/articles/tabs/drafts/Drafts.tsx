import { ReUseAbleTable } from '@/components/shared';
import { PaginationControls } from '@/components/shared/PaginationControls';
import { CrawlerArticlesResponse, CrwalerArticle } from '@/interface';
import { dateAndTimeFormatter } from '@/utils/helpers';
import { ColumnDef } from '@tanstack/react-table';
import { PencilLine, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface draftProp {
  draftArticles: CrawlerArticlesResponse;
  setPage: (page: number) => void;
}
export function Drafts({ draftArticles, setPage }: draftProp) {
  const router = useRouter();
  const pagination = draftArticles && draftArticles.meta.pagination;
  const draftColumns: ColumnDef<CrwalerArticle>[] = [
    {
      accessorKey: 'title',
      header: 'Article',
      cell: ({ row }) => (
        <div className="min-w-[400px]">
          <p className="text-lg font-semibold text-[#0F172A]">
            {row.original.title}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {row.original.matchedKeywords.map((tag) => (
              <span
                key={tag}
                className="rounded-xs bg-[#EEF2F6] px-3 py-1 text-xs font-medium text-[#45556C]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'author',
      header: 'Author',
      cell: ({ row }) => (
        <span className="text-sm text-[#111111] sm:text-base">
          {row.original.author}
        </span>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => <CategoryPill label={row.original.categories[0]} />,
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => (
        <span className="text-sm text-[#45556C] sm:text-base">
          {dateAndTimeFormatter(row.original.createdAt)}
        </span>
      ),
    },

    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const id = row.original._id;
        return (
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              className="cursor-pointer rounded-sm p-1 text-[#111827] transition hover:bg-[#F1F5F9] hover:text-[#0B1533]"
              aria-label="Edit draft"
              onClick={() => router.push(`/articles/create-article?id=${id}`)}
            >
              <PencilLine className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-sm p-1 text-[#EF4444] transition hover:bg-[#FEF2F2] hover:text-[#DC2626]"
              aria-label="Delete draft"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-[#0F172A]">Draft Queue</h3>
      </div>
      {draftArticles && draftArticles.data.length > 0 ? (
        <ReUseAbleTable
          data={draftArticles.data}
          columns={draftColumns}
          entityName="drafts"
        />
      ) : (
        <div className="rounded-xl border border-dashed border-[#D1D5DB] p-8 text-center text-sm text-gray-500">
          No drafts found for this category.
        </div>
      )}
      {pagination && (
        <PaginationControls
          currentPage={pagination.current}
          totalItems={pagination.total_count}
          itemsPerPage={pagination.per_page}
          onPageChange={setPage}
          entityName="draft-articles"
        />
      )}
    </div>
  );
}

function CategoryPill({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-sm border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#2563EB]">
      {label}
    </span>
  );
}
