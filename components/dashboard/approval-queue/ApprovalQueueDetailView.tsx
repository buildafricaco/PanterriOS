'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MultiSelect } from '@/components/ui/multiSelect';
import { Textarea } from '@/components/ui/textarea';
import { RejectRequestDialog } from './RejectRequestDialog';
import { useRetrieveApprovalQueueRequestDetails } from '@/hook/approval-queue/useRetrieveApprovalQueueRequestDetails';
import { ConfirmationDialog, StatusBadge } from '@/components/shared';
import {
  useAddApprovalQueueComment,
  useApproveApprovalQueueRequest,
  useRejectApprovalQueueRequest,
  useReturnApprovalQueueRequestForRevision,
  useTerminateApprovalQueueRequest,
} from '@/hook/approval-queue';
import { useRetrieveAllUsers } from '@/hook/user-management/useRetrieveAllUsers';
import { ApprovalQueueCcUser } from '@/interface/approval-queue.entity';

function formatSnapshotLabel(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatSnapshotValue(value: unknown): string {
  if (value == null) return 'N/A';

  if (Array.isArray(value)) {
    return value.map((item) => formatSnapshotValue(item)).join(', ');
  }

  if (typeof value === 'string') {
    const parsedDate = Date.parse(value);
    if (!Number.isNaN(parsedDate) && value.includes('T')) {
      return new Date(parsedDate).toLocaleDateString();
    }
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function ApprovalQueueDetailView({ id }: { id: string }) {
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [commentDraft, setCommentDraft] = useState('');
  const [selectedCcUserIds, setSelectedCcUserIds] = useState<string[]>([]);

  const { data: approvalQueue } = useRetrieveApprovalQueueRequestDetails(
    Number(id),
  );
  const { data: allUsers } = useRetrieveAllUsers();
  const { mutateAsync: approveRequest, isPending: isApproving } =
    useApproveApprovalQueueRequest();
  const { mutateAsync: rejectRequest, isPending: isRejecting } =
    useRejectApprovalQueueRequest();
  const { mutateAsync: returnRequest, isPending: isReturning } =
    useReturnApprovalQueueRequestForRevision();
  const { mutateAsync: terminateRequest, isPending: isTerminating } =
    useTerminateApprovalQueueRequest();
  const { mutateAsync: addComment, isPending: isAddingComment } =
    useAddApprovalQueueComment();
  const detail = approvalQueue?.data.data;
  const payloadSnapshot = detail?.payloadSnapshot;
  const requestId = Number(id);
  const isDecisionLoading =
    isApproving || isRejecting || isReturning || isTerminating;
  const ccOptions = useMemo(
    () =>
      allUsers?.data.data
        .filter((user) => user.id != null)
        .map((user) => ({
          label: user.fullName,
          value: user.id.toString(),
        })) || [],
    [allUsers],
  );
  const selectedCcUsers = useMemo<ApprovalQueueCcUser[]>(
    () =>
      allUsers?.data.data
        .filter(
          (user) =>
            user.id != null && selectedCcUserIds.includes(user.id.toString()),
        )
        .map((user) => ({
          id: user.id,
          email: user.email,
          name: user.fullName,
        })) || [],
    [allUsers, selectedCcUserIds],
  );
  const payloadSnapshotRows = useMemo(() => {
    if (!payloadSnapshot || typeof payloadSnapshot !== 'object') {
      return [];
    }

    return Object.entries(payloadSnapshot).map(([key, value]) => ({
      key,
      label: formatSnapshotLabel(key),
      value: formatSnapshotValue(value),
    }));
  }, [payloadSnapshot]);

  const overview = [
    { label: 'Workflow', value: detail?.workflowName || 'N/A' },
    {
      label: 'Initiated By',
      value: detail?.initiatedByName || 'N/A',
    },
    { label: 'Queue ID', value: detail?.reference || 'N/A' },
    { label: 'Date', value: detail?.updatedAt || 'N/A' },
    { label: 'Module', value: detail?.module || 'N/A' },
    // { label: 'Target Record', value: detail?.targetRecord || 'N/A' },
    { label: 'Action', value: detail?.action || 'N/A' },
    // { label: 'Version', value: detail?.version || 'N/A' },
  ];

  const handleApprove = async (comment?: string) => {
    await approveRequest({
      id: requestId,
      payload: { comment: comment?.trim() || '' },
    });
    setIsApproveOpen(false);
  };

  const handleRejectAction = async ({
    action,
    comment,
  }: {
    action: 'reject' | 'return' | 'terminate';
    comment: string;
  }) => {
    const payload = { comment };

    if (action === 'reject') {
      await rejectRequest({ id: requestId, payload });
    } else if (action === 'return') {
      await returnRequest({ id: requestId, payload });
    } else {
      await terminateRequest({ id: requestId, payload });
    }

    setIsRejectOpen(false);
  };

  const handleAddComment = async () => {
    const trimmedComment = commentDraft.trim();
    if (!trimmedComment) return;

    await addComment({
      id: requestId,
      payload: {
        comment: trimmedComment,
        ccUsers: selectedCcUsers,
      },
    });
    setCommentDraft('');
    setSelectedCcUserIds([]);
  };

  return (
    <div className="w-full space-y-8">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h1 className=" font-bold text-2xl tracking-tight text-[#0F172A]">
              {detail?.module}
            </h1>
            {detail?.canCurrentUserAct && (
              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  className="h-10 rounded-xl bg-[#111111] px-8  hover:bg-[#111111]/90"
                  onClick={() => setIsApproveOpen(true)}
                  disabled={isDecisionLoading}
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsRejectOpen(true)}
                  disabled={isDecisionLoading}
                  className="h-10 rounded-xl border-[#FCA5A5] px-8  text-[#FF0000] hover:bg-white"
                >
                  Reject
                </Button>
              </div>
            )}
          </div>

          <div className="mt-10">
            <h2 className="text-base font-semibold text-[#111827]">
              Request Overview
            </h2>
            <div className="mt-6 grid overflow-hidden rounded-2xl bg-[#EAF2FF] md:grid-cols-2">
              {overview.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="grid grid-cols-[180px_minmax(0,1fr)] gap-4 border-b border-r border-white px-6 py-6 odd:border-r md:last:border-b-0"
                >
                  <span className=" text-[#526581]">{item.label}</span>
                  <span className=" text-[#111827]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-base font-semibold text-[#111827]">
              Action Initiated
            </h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
              <div className="grid grid-cols-[1.2fr_2fr] border-b border-[#E5E7EB] px-8 py-3 uppercase text-[#62748E]">
                <span>Field</span>
                <span>Value</span>
              </div>
              {payloadSnapshotRows.map((row) => (
                <div
                  key={row.key}
                  className="grid grid-cols-[1.2fr_2fr] border-b border-[#E5E7EB] px-8 py-6 last:border-b-0"
                >
                  <span className="font-semibold text-[#111827]">
                    {row.label}
                  </span>
                  <span className="text-[#111827] break-words">
                    {row.value}
                  </span>
                </div>
              ))}
              {payloadSnapshotRows.length === 0 && (
                <div className="px-8 py-6 text-[#526581]">No payload data</div>
              )}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-base font-semibold text-[#111827]">Comments</h2>
            <div className="mt-6 space-y-5">
              {detail?.comments.map((comment) => (
                <div key={comment.id} className="rounded-2xl bg-[#EAF2FF] p-6">
                  <div className="grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
                    <div className="space-y-2">
                      <p className=" font-semibold text-[#111827]">
                        {comment.authorName}
                      </p>
                      {/* <p className=" text-[#111827]">{comment.}</p> */}
                      <p className="text-sm text-[#526581]">
                        {comment.createdAt}
                      </p>
                    </div>
                    <p className=" leading-9 text-[#526581]">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-base font-semibold text-[#111827]">
              Approval Chain
            </h3>
            <div className="mt-6 space-y-8">
              {detail?.steps.map((item, index) => (
                <div key={item.id} className="relative flex gap-4">
                  <div className="relative flex w-6 justify-center">
                    <div
                      className={`mt-1 h-4 w-4 rounded-full ${
                        item.status === 'approved'
                          ? 'bg-[#16A34A]'
                          : 'bg-[#A3A3A3]'
                      }`}
                    />
                    {index < detail.steps.length - 1 ? (
                      <div className="absolute top-6 h-24 w-px bg-[#A3A3A3]" />
                    ) : null}
                  </div>
                  <div className="space-y-2 ">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className=" text-[#111827] capitalize">
                        {item.approvalType} :
                      </p>
                      {item.approvalType === 'role' ? (
                        <p className=" text-[#111827]">
                          {item.role.replace('.', ' ')}
                        </p>
                      ) : (
                        <p className=" text-[#111827]">
                          {item.userNameSnapshot}
                        </p>
                      )}{' '}
                      <StatusBadge status={item.status} />
                    </div>

                    <p className=" text-[#111827] text-sm">{item.actedAt}</p>
                    <p className=" text-[#111827]">
                      Action by:{' '}
                      <span className="font-medium"> {item.actedByName}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
            <h3 className="text-base font-semibold text-[#111827]">Comments</h3>

            <Textarea
              placeholder="Add a comment relevant to this workflow request"
              value={commentDraft}
              onChange={(event) => setCommentDraft(event.target.value)}
              className="mt-5 min-h-36 rounded-xl px-5 py-5 "
            />
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-[#111827]">CC</p>
              <MultiSelect
                options={ccOptions}
                value={selectedCcUserIds}
                onChange={setSelectedCcUserIds}
                placeholder="Select users to cc"
              />
            </div>
            <Button
              className="mt-5 h-14 w-full rounded-xl bg-[#111111]  hover:bg-[#111111]/90"
              onClick={handleAddComment}
              disabled={isAddingComment || !commentDraft.trim()}
            >
              Add Comment
            </Button>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        open={isApproveOpen}
        onOpenChange={setIsApproveOpen}
        title="Approve request"
        description="This will approve the current approval queue request."
        confirmText="Approve"
        isCommentRequired={detail?.currentStep?.commentRequired}
        onConfirm={handleApprove}
        commentLabel="Approval comment"
        commentPlaceholder="Add a comment for this approval"
        isLoading={isApproving}
      />
      <RejectRequestDialog
        open={isRejectOpen}
        onOpenChange={setIsRejectOpen}
        onSubmit={handleRejectAction}
        isLoading={isRejecting || isReturning || isTerminating}
      />
    </div>
  );
}
