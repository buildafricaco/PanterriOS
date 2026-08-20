'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResetPassword } from '@/hook/auth/useResetPassword';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

const createPasswordSchema = z
  .object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmNewPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

type CreatePasswordSchema = z.infer<typeof createPasswordSchema>;

export default function CreatePasswordForm() {
  const { resetPasswordFn, isLoading } = useResetPassword();

  const form = useForm<CreatePasswordSchema>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = async (data: CreatePasswordSchema) => {
    const resetToken = localStorage.getItem('passwordResetToken');
    if (!resetToken) return;

    await resetPasswordFn({
      resetToken,
      newPassword: data.newPassword,
      confirmPassword: data.confirmNewPassword,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  password
                  placeholder="Enter new password"
                  disabled={isLoading}
                  {...field}
                  className="bg-[#E6E8EB] text-gray-800 placeholder:text-gray-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  password
                  placeholder="Confirm password"
                  disabled={isLoading}
                  {...field}
                  className="bg-[#E6E8EB] text-gray-800 placeholder:text-gray-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center">
              <span>Updating...</span> <Spinner />
            </div>
          ) : (
            <span>Create Password</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
