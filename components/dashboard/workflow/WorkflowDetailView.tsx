'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ConfirmationDialog, WorkflowDetailSkeleton } from '@/components/shared';
import { Check, ChevronLeft } from 'lucide-react';
import { useDeleteWorkflow, useRetrieveWorkflowDetails } from '@/hook/workflow';
import { useRouter } from 'next/navigation';

export function WorkflowDetailView({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { data: workflowDetails, isLoading } = useRetrieveWorkflowDetails(
    Number(id),
  );
  const { mutateAsync: deleteWorkflowFn, isPending: isDeletingWorkflow } =
    useDeleteWorkflow();
  const workflow = workflowDetails?.data.data;
  if (isLoading || !workflow) {
    return <WorkflowDetailSkeleton />;
  }

  const handleDeleteWorkflow = async () => {
    await deleteWorkflowFn(workflow.id);
    setIsDeleteDialogOpen(false);
    router.push('/workflow');
  };

  return (
    <div className="w-full space-y-8">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="max-w-4xl rounded-2xl border border-[#E5E7EB] bg-white p-8">
        <div>
          <h1 className="text-base font-bold tracking-tight text-[#0F172A]">
            {workflow.name}
          </h1>
          <p className="mt-3  text-[#526581]">Created {workflow.createdAt}</p>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-4">
            <h2 className=" font-semibold uppercase tracking-[0.12em] text-[#669DF6]">
              General Information
            </h2>
            <div className="h-px flex-1 bg-[#E5E7EB]" />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-[#E5E7EB] p-5">
              <p className="text-sm text-[#111827]">Module</p>
              <p className="mt-5 text-lg text-[#111827]">{workflow.module}</p>
            </div>
            <div className="rounded-md border border-[#E5E7EB] p-5">
              <p className="text-sm text-[#111827]">Action</p>
              <p className="mt-5 text-lg text-[#111827]">{workflow.action}</p>
            </div>
          </div>

          <div className="mt-8 rounded-md border border-[#E5E7EB] p-5">
            <p className="text-sm text-[#111827]">Description</p>
            <p className="mt-5 text-lg leading-10 text-[#111827]">
              {workflow.description}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-4">
            <h2 className=" font-semibold uppercase tracking-[0.12em] text-[#669DF6]">
              Approval Steps
            </h2>
            <div className="h-px flex-1 bg-[#E5E7EB]" />
          </div>

          <div className="mt-10 space-y-10">
            {workflow.steps.map((step) => (
              <div key={step.id}>
                <h3 className=" font-semibold text-[#111827]">
                  Step {step.stepNumber}
                </h3>
                <div className="mt-5 grid gap-4 lg:grid-cols-3">
                  <div className="rounded-md border border-[#E5E7EB] px-5 py-3 text-base text-[#526581]">
                    {step.approvalType}
                  </div>
                  {step.role && (
                    <div className="rounded-md border border-[#E5E7EB] px-5 py-3 text-base text-[#526581]">
                      {step.role}
                    </div>
                  )}
                  {step.userNameSnapshot && (
                    <div className="rounded-md border border-[#E5E7EB] px-5 py-3 text-base text-[#526581]">
                      {step.userNameSnapshot}
                    </div>
                  )}

                  <div className="rounded-md border border-[#E5E7EB] px-5 py-3 text-base text-[#526581]">
                    {step.commentRequired ? (
                      <span className="inline-flex items-center gap-3">
                        <Check className="h-5 w-5 text-[#111827]" />
                        Comment Required
                      </span>
                    ) : (
                      'No Comment Required'
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Button variant="outline" className="h-12 " asChild>
            <Link href={`/workflow/create-workflow/${workflow.id}`}>Edit</Link>
          </Button>
          <Button
            className="h-12 bg-[#111111]  hover:bg-[#111111]/90"
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={isDeletingWorkflow}
          >
            Delete
          </Button>
        </div>
      </div>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        variant="delete"
        title="Delete workflow"
        description={`This will permanently delete "${workflow.name}" and cannot be undone.`}
        onConfirm={handleDeleteWorkflow}
        isLoading={isDeletingWorkflow}
      />
    </div>
  );
}
