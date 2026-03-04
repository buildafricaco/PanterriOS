'use client';

import { VerifyOtpReq } from '@/interface';
import { verifyResetPasswordOtp } from '@/services/auth';
import { setOtp } from '@/services/axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useVerifyResetPasswordOtp() {
  const router = useRouter();

  const { mutateAsync: verifyResetPasswordOtpFn, isPending: isLoading } =
    useMutation({
      mutationFn: async (payload: VerifyOtpReq) =>
        verifyResetPasswordOtp(payload),
      onSuccess: (data) => {
        if (data.passwordResetToken) {
          setOtp(data.passwordResetToken);
        }
        toast.success(data.message || 'OTP verified successfully');
        router.push('/forgot-password/reset-password');
      },
    });

  return { verifyResetPasswordOtpFn, isLoading };
}
