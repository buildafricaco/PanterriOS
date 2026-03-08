'use client';

import { useAuthStore } from '@/store/authStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, hasHydrated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  // public routes
  const publicRoutes = [
    '/',
    '/login',
    '/login/set-up-2fa',
    '/login/verify-2fa',
    '/create-password',
    '/forgot-password',
    '/forgot-password/reset-password',
    '/forgot-password/verify-otp',
    '/not-found',
  ];
  const isPublic = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!hasHydrated) return;

    // If it's a public route, do nothing
    if (isPublic) return;

    // If user not logged in and it's a private route → redirect
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, hasHydrated, pathname, isPublic, router]);

  if (!hasHydrated || isLoading) return <div />;

  // If it's public route → show page even when not logged in
  if (isPublic) return <>{children}</>;

  // If private route but still no user → block render
  if (!user) return null;

  return <>{children}</>;
}
