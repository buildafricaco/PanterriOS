'use client';

import { usePathname } from 'next/navigation';
import { DashboardLayout } from '@/components/shared';
import { DashboardUser } from '@/interface/dashboard';
import { useAuthStore } from '@/store/authStore';
import { ProtectedRoute } from '@/hook/protectedRoute';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Ignore routes from dashboard layout
  const noDashboardRoutes = [
    '/',
    '/login',
    '/login/verify-2fa',
    '/create-password',
    '/forgot-password',
    '/forgot-password/reset-password',
    '/forgot-password/verify-otp',
    '/not-found',
  ];

  const isAuthRoute = noDashboardRoutes.includes(pathname);
  const { user } = useAuthStore();

  const currentUser: DashboardUser = {
    // firstName: user.firstName,
    // lastName: user.lastName,
    // email: user.email,
    // role: user.role as UserRoles[],

    email: 'Ahmed@email.com',
    firstName: 'Ahmed',
    lastName: 'Faruq',
    role: ['Admin.Officer'],

    initials: `${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}`,
  };

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute>
      <DashboardLayout currentUser={currentUser}>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}
