'use client';

import { SendOtpReq } from '@/interface';
import { sendResetPasswordOtp } from '@/services/auth';
import { setRegEmail } from '@/services/axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useSendResetPasswordOtp() {
  const router = useRouter();

  const { mutateAsync: sendResetPasswordOtpFn, isPending: isLoading } =
    useMutation({
      mutationFn: async (payload: SendOtpReq) => sendResetPasswordOtp(payload),
      onSuccess: (data, variables) => {
        setRegEmail(variables.email);
        toast.success(data.message || 'OTP sent successfully');
        router.push('/forgot-password/verify-otp');
      },
    });

  return { sendResetPasswordOtpFn, isLoading };
}
