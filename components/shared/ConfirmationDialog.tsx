'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type ConfirmationDialogVariant =
  | 'default'
  | 'delete'
  | 'activate'
  | 'deactivate';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: (comment?: string) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  isCommentRequired?: boolean;
  commentLabel?: string;
  commentPlaceholder?: string;
  variant?: ConfirmationDialogVariant;
}

const variantConfig: Record<
  ConfirmationDialogVariant,
  { defaultTitle: string; defaultDescription: string }
> = {
  default: {
    defaultTitle: 'Confirm action',
    defaultDescription: 'Are you sure you want to continue?',
  },
  delete: {
    defaultTitle: 'Delete item',
    defaultDescription: 'This action cannot be undone.',
  },
  activate: {
    defaultTitle: 'Activate item',
    defaultDescription: 'This item will become active immediately.',
  },
  deactivate: {
    defaultTitle: 'Deactivate item',
    defaultDescription: 'This item will no longer be active.',
  },
};

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
  isCommentRequired = false,
  commentLabel = 'Comment',
  commentPlaceholder = 'Add a comment',
  variant = 'default',
}: ConfirmationDialogProps) {
  const config = variantConfig[variant];
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => {
        setComment('');
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    await onConfirm(comment.trim());
  };

  const handleCancel = () => {
    if (isLoading) return;
    setComment('');
    onCancel?.();
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (isLoading) return;
    if (!newOpen) {
      setComment('');
    }
    onOpenChange(newOpen);
  };

  const getConfirmButtonText = () => {
    if (confirmText) return confirmText;
    switch (variant) {
      case 'delete':
        return 'Delete';
      case 'activate':
        return 'Activate';
      case 'deactivate':
        return 'Deactivate';
      default:
        return 'Confirm';
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="mx-4 max-w-[calc(100vw-2rem)] rounded-lg p-4 sm:mx-auto sm:max-w-md sm:p-6 md:max-w-lg">
        <AlertDialogHeader className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:gap-4">
          <div className="flex-1 text-center sm:text-left">
            <AlertDialogTitle className="text-base font-semibold sm:text-xl">
              {title || config.defaultTitle}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground mt-1.5 text-xs leading-relaxed sm:mt-2 sm:text-sm">
              {description || config.defaultDescription}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        {isCommentRequired ? (
          <div className="mt-2 space-y-2">
            <p className="text-sm font-medium">{commentLabel}</p>
            <Textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder={commentPlaceholder}
              className="min-h-28"
            />
          </div>
        ) : null}
        <AlertDialogFooter className="mt-0 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <AlertDialogCancel
            onClick={handleCancel}
            disabled={isLoading}
            className="bg-surface h-9 w-full text-sm sm:h-10 sm:w-auto sm:min-w-[100px]"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading || (isCommentRequired && !comment.trim())}
            className={cn(
              'h-9 w-full text-sm sm:h-10 sm:w-auto sm:min-w-[100px]',
              variant === 'delete' && 'bg-red-600 text-white hover:bg-red-700',
            )}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {getConfirmButtonText()}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
