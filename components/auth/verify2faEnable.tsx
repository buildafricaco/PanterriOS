'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useVerify2faLogin } from '@/hook/auth/useVerify2faLogin';
import { Spinner } from '../ui/spinner';
import { getTwoFactorTemporaryToken } from '@/services/axios';
import { useEnableTwoFactor } from '@/hook/auth/useEnableTwoFactor';

const FormSchema = z.object({
  token: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

export function Verify2faEnable() {
  const { mutateAsync: enable2fa, isPending: isLoading } = useEnableTwoFactor();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const temporaryToken = await getTwoFactorTemporaryToken();
    if (!temporaryToken) return;

    const payload = {
      // temporaryToken,
      token: data.token,
      userDevice: navigator.userAgent,
    };

    await enable2fa(payload);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-sm items-center justify-center space-y-6 lg:p-4 mt-4"
      >
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="w-ull mx-auto space-x-4">
                    <InputOTPSlot
                      index={0}
                      className="bg-gray-100 rounded-lg text-gray-800 placeholder:text-gray-500"
                    />
                    <InputOTPSlot
                      index={1}
                      className="bg-gray-100 rounded-lg text-gray-800 placeholder:text-gray-500"
                    />
                    <InputOTPSlot
                      index={2}
                      className="bg-gray-100 rounded-lg text-gray-800 placeholder:text-gray-500"
                    />
                    <InputOTPSlot
                      index={3}
                      className="bg-gray-100 rounded-lg text-gray-800 placeholder:text-gray-500"
                    />
                    <InputOTPSlot
                      index={4}
                      className="bg-gray-100 rounded-lg text-gray-800 placeholder:text-gray-500"
                    />
                    <InputOTPSlot
                      index={5}
                      className="bg-gray-100 rounded-lg text-gray-800 placeholder:text-gray-500"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full p-6" disabled={isLoading}>
          {form.formState.isSubmitting || isLoading ? (
            <div className="flex items-center">
              <span> Verifying...</span> <Spinner />
            </div>
          ) : (
            <span>Verify code</span>
          )}
        </Button>
      </form>
      <div className="text-center space-y-5 mt-4">
        <p className="text-blue-500">Lost your device? Use a backup code</p>
        <p className="">Having trouble? Contact support</p>
      </div>
    </Form>
  );
}
