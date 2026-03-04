'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useLogin } from '@/hook/auth/useLogin';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Checkbox } from '../ui/checkbox';
import { Spinner } from '../ui/spinner';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password too long'),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { loginFn, isLoading } = useLogin();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    await loginFn({
      ...data,
      email: data.email.toLowerCase().trim(),
      userDevice: navigator.userAgent,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-sm space-y-4 p-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  email
                  placeholder="email@example.com"
                  {...field}
                  autoComplete="false"
                  className="w-full rounded bg-[#E6E8EB] p-2 text-gray-800 placeholder:text-gray-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  password
                  placeholder="Enter password"
                  {...field}
                  className="w-full rounded bg-[#E6E8EB] p-2 text-gray-800 placeholder:text-gray-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <div className="flex gap-2 text-sm items-center">
            <Checkbox /> <span>Remember me</span>
          </div>
          <Link
            href="/forgot-password"
            className="text-blue-500 text-sm hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || isLoading}
          className=" w-full rounded p-4 "
        >
          {form.formState.isSubmitting || isLoading ? (
            <div className="flex items-center">
              <span> Loading...</span> <Spinner />
            </div>
          ) : (
            <span>Login</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
