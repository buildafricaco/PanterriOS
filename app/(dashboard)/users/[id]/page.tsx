'use client';
import { UsersDetialsPage } from '@/components/dashboard/users/page';
import { useParams } from 'next/navigation';

export default function UsersIdPage() {
  const { id } = useParams<{ id: string }>();

  return <UsersDetialsPage id={id} />;
}
