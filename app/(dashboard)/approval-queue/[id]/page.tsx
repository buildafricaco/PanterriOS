import { ApprovalQueueDetailView } from '@/components/dashboard/approval-queue';

export default async function ApprovalQueueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ApprovalQueueDetailView id={id} />;
}
