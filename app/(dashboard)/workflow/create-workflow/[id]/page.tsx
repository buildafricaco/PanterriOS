import { CreateWorkflowView } from '@/components/dashboard/workflow';

export default async function EditWorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <CreateWorkflowView id={id} />;
}
