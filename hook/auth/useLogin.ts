'use client';

import { LoginReq, LoginRes, normalizeLoginRes } from '@/interface';
import { getCurrentUser, login } from '@/services/auth';
import { setRegEmail, setTwoFactorTemporaryToken } from '@/services/axios';
import { useAuthStore } from '@/store/authStore';
import { tokenStore } from '@/store/tokenStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useLogin() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const { mutateAsync: loginFn, isPending: isLoading } = useMutation({
    mutationFn: async (payload: LoginReq) => login(payload),
    onSuccess: async (rawData: LoginRes, variables) => {
      const data = normalizeLoginRes(rawData);
      toast.success(data.message);

      if (data.temporaryToken) {
        setTwoFactorTemporaryToken(data.temporaryToken);
        setRegEmail(variables.email);
      }

      if (
        data.isTwoFactorEnabled &&
        data.temporaryToken &&
        data.isTwoFactorSetup
      ) {
        router.push('/login/verify-2fa');
        return;
      }
      if (data.isTwoFactorEnabled && !data.isTwoFactorSetup) {
        if (!data.temporaryToken) {
          toast.error(
            'Login did not return a temporary token for 2FA setup. Please try again.',
          );
          return;
        }
        router.push('/login/set-up-2fa');
        return;
      }

      if (!data.accessToken) {
        return;
      }

      const currentUser = await getCurrentUser(data.accessToken);
      tokenStore.set(data.accessToken);
      await setAuth(currentUser);

      router.push('/dashboard');
    },
  });

  return { loginFn, isLoading };
}
