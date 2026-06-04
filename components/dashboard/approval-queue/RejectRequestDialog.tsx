'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Ban, RotateCcw, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type RejectAction = 'reject' | 'return' | 'terminate';

export function RejectRequestDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: { action: RejectAction; comment: string }) => Promise<void>;
  isLoading?: boolean;
}) {
  const [selectedAction, setSelectedAction] = useState<RejectAction>('reject');
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    await onSubmit({ action: selectedAction, comment });
    setComment('');
    setSelectedAction('reject');
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isLoading) return;
    if (!nextOpen) {
      setComment('');
      setSelectedAction('reject');
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-4xl rounded-[28px] border border-[#D6E4FF] p-0 shadow-2xl"
        showCloseButton={false}
      >
        <DialogHeader className="flex-row items-center justify-between border-b border-[#D6E4FF] px-8 py-7">
          <div className="flex items-center gap-4">
            <Ban className="h-8 w-8 " />
            <div>
              <DialogTitle className="text-lg font-semibold ">
                Reject Request
              </DialogTitle>
              <DialogDescription className="hidden" />
            </div>
          </div>
          <DialogClose asChild>
            <button type="button" aria-label="Close dialog">
              <X className="h-8 w-8 text-[#526581]" />
            </button>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-8 px-8 py-8">
          <div>
            <h3 className=" font-semibold text-[#1F2A44]">Your Action</h3>
            <div className="mt-6 space-y-6">
              <button
                type="button"
                onClick={() => setSelectedAction('reject')}
                className={cn(
                  'w-full rounded-[24px] border px-8 py-8 text-left',
                  selectedAction === 'reject'
                    ? 'bg-[#111827] text-white'
                    : 'border-[#D0D5DD] bg-white',
                )}
              >
                <div className="flex items-start gap-5">
                  <Ban className="mt-1 h-8 w-8 " />
                  <div>
                    <p className=" font-semibold ">Reject Request</p>
                    <p className="mt-2  ">
                      End this approval request with your rejection feedback.
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedAction('return')}
                className={cn(
                  'w-full rounded-[24px] border px-8 py-8 text-left',
                  selectedAction === 'return'
                    ? 'bg-[#111827] text-white'
                    : 'border-[#D0D5DD] bg-white',
                )}
              >
                <div className="flex items-start gap-5">
                  <RotateCcw className="mt-1 h-8 w-8 " />
                  <div>
                    <p className=" font-semibold ">Return For Revision</p>
                    <p className="mt-2  ">
                      Initiator gets your feedback and can resubmit
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedAction('terminate')}
                className={cn(
                  'w-full rounded-[24px] border px-8 py-8 text-left',
                  selectedAction === 'terminate'
                    ? 'bg-[#111827] text-white'
                    : 'border-[#D0D5DD] bg-white',
                )}
              >
                <div className="flex items-start gap-5">
                  <Ban className="mt-1 h-8 w-8 " />
                  <div>
                    <p className=" font-semibold ">Terminate Request</p>
                    <p className="mt-2  ">
                      Permanently closed. Invalid or fraudulent only.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div>
            <h3 className=" font-semibold text-[#1F2A44]">
              Feedback to Initiator
            </h3>
            <Textarea
              placeholder="E.g., Incorrect yield calculation,"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              className="mt-6 min-h-48 rounded-xl border-0 bg-[#EAF2FF] px-6 py-6  placeholder:text-[#6B7280]"
            />
          </div>
        </div>

        <DialogFooter className="grid grid-cols-2 gap-5 px-8 pb-8 pt-0">
          <Button
            className="h-14 rounded-xl bg-[#111111]  font-medium hover:bg-[#111111]/90"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {selectedAction === 'terminate'
              ? 'Terminate request'
              : selectedAction === 'return'
                ? 'Return for revision'
                : 'Reject request'}
          </Button>
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={isLoading}
              className="h-14 rounded-xl border-[#FCA5A5]  text-[#FF0000] hover:bg-white"
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
