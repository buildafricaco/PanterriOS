'use client';

import { Login2FaReq, LoginRes, normalizeLoginRes } from '@/interface';
import { getCurrentUser, loginWithTwoFactor } from '@/services/auth';
import {
  deleteRegEmail,
  deleteTwoFactorTemporaryToken,
} from '@/services/axios';
import { useAuthStore } from '@/store/authStore';
import { tokenStore } from '@/store/tokenStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useVerify2faLogin() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const { mutateAsync: verify2faLoginFn, isPending: isLoading } = useMutation({
    mutationFn: async (payload: Login2FaReq) => loginWithTwoFactor(payload),
    onSuccess: async (rawData: LoginRes) => {
      const data = normalizeLoginRes(rawData);
      if (!data.accessToken) {
        toast.error('2FA verification did not return an access token.');
        return;
      }

      const currentUser = await getCurrentUser(data.accessToken);
      tokenStore.set(data.accessToken);
      await setAuth(currentUser);

      deleteTwoFactorTemporaryToken();
      deleteRegEmail();
      toast.success(data.message);
      router.push('/dashboard');
    },
  });

  return { verify2faLoginFn, isLoading };
}
