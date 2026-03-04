'use client';

import { ResetPasswordReq } from '@/interface';
import { resetPassword } from '@/services/auth';
import { deleteOtp, deleteRegEmail } from '@/services/axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useResetPassword() {
  const router = useRouter();

  const { mutateAsync: resetPasswordFn, isPending: isLoading } = useMutation({
    mutationFn: async (payload: ResetPasswordReq) => resetPassword(payload),
    onSuccess: (data) => {
      toast.success(data.message || 'Password reset successful');
      deleteOtp();
      deleteRegEmail();
      router.push('/login');
    },
  });

  return { resetPasswordFn, isLoading };
}
