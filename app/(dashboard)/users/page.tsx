'use client';
import { InvestorCard } from '@/components/dashboard/investors';
import { PageHead, StatCard } from '@/components/shared';
import { ReUseAbleTable } from '@/components/shared/reUseAbleTable';
import { Button } from '@/components/ui/button';
import { type ColumnDef } from '@tanstack/react-table';
import {
  CircleAlert,
  CircleCheckBig,
  CircleX,
  Eye,
  Pen,
  Plus,
  Shield,
  SquarePen,
  User,
  Users,
  X,
} from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import Link from 'next/link';
import { UsersDetialsPage } from '@/components/dashboard/users/page';
import EditCreateModal from '@/components/dashboard/users/modal/editCreateModal';
interface usersProp {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  last_login: string;
}

export default function UsersPage() {
  const usersRes = {
    users: [
      {
        id: 1,
        name: 'John Doe',
        email: 'admin@panterrium.com',
        role: 'Super Admin',
        status: 'active',
        last_login: '2024-01-25T14:30:00',
      },
      {
        id: 2,
        name: 'Chidi Okonkwo',
        email: 'chidi@panterrium.com',
        role: 'Finance Admin',
        status: 'active',
        last_login: '2024-01-25T10:15:00',
      },
      {
        id: 3,
        name: 'Amara Ana',
        email: 'amara@panterrium.com',
        role: 'Real Estate Analyst',
        status: 'active',
        last_login: '2024-01-24T16:45:00',
      },
      {
        id: 4,
        name: 'Ngozi Edit',
        email: 'ngozi@panterrium.com',
        role: 'Content Editor',
        status: 'active',
        last_login: '2024-01-24T12:20:00',
      },
      {
        id: 5,
        name: 'Kunle Modera',
        email: 'kunle@panterrium.com',
        role: 'Event Moderator',
        status: 'inactive',
        last_login: '2024-01-20T09:30:00',
      },
    ],
    admin_summary: [
      {
        label: 'Total Admin Users',
        value: 5,
        icon: Users,
        bgColor: 'text-blue-500 bg-blue-100 rounded-md p-2',
      },
      {
        label: 'Active Users',
        value: 4,
        icon: Shield,
        bgColor: 'text-green-500 bg-green-100 rounded-md p-2',
      },
      {
        label: 'Roles Defined',
        value: 5,
        icon: Shield,
        bgColor: 'text-purple-500 bg-purple-100 rounded-md p-2',
      },
    ],
  };

  const columns: ColumnDef<usersProp>[] = [
    {
      accessorKey: 'name',
      header: 'name',
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className=" ">
            <p>{row.original.name} </p>
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="text-gray-400">{row.original.email}</div>
      ),
    },

    {
      accessorKey: 'role',
      header: 'role',
      cell: ({ row }) => {
        const role = row.original.role;
        return role.toLowerCase() === 'approved' ? (
          <div className="text-center capitalize bg-green-50 text-green-500 flex  items-center gap-1.5 border border-green-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <CircleCheckBig className="w-3 h-3" />
            <span> {role}</span>
          </div>
        ) : role === 'Pending' ? (
          <div className="text-center capitalize bg-orange-50 text-orange-500 flex  items-center gap-1.5 border border-orange-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <CircleAlert className="w-3 h-3" />
            <span> {role}</span>
          </div>
        ) : (
          <div className="text-center capitalize bg-gray-50 text-gray-500 flex  items-center gap-1.5 border border-gray-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <User className="w-3 h-3" />
            <span> {role}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: ' status',
      cell: ({ row }) => {
        const status = row.original.status;
        return status.toLowerCase() === 'active' ? (
          <div className="text-center capitalize bg-green-50 text-green-500 flex  items-center gap-1.5 border border-green-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <CircleCheckBig className="w-3 h-3" />
            <span> {status}</span>
          </div>
        ) : (
          <div className="text-center capitalize bg-gray-50 text-gray-500 flex  items-center gap-1.5 border border-gray-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <CircleX className="w-3 h-3" />
            <span> {status}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'last_login',
      header: 'last login',
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.original.last_login}</div>
      ),
    },

    {
      accessorKey: 'action',
      header: 'action',
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className="flex gap-2">
            <>
              <div className="lg:flex hidden ">
                <Drawer direction="right">
                  <DrawerTrigger asChild>
                    <Button variant={'outline'}>
                      <Eye className="w-5 h-5" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent
                  //       className=" lg:data-[vaul-drawer-direction=left]:sm:max-w-3xl
                  // lg:data-[vaul-drawer-direction=right]:sm:max-w-3xl overflow-y-auto
                  // "
                  >
                    <DrawerHeader>
                      <DrawerTitle className="flex justify-between">
                        <div>
                          <div className="text-xl font-bold">User Profile </div>
                          {/* <p className="text-gray-500">
                          Complete details and activity for John Doe
                        </p> */}
                        </div>
                        <DrawerClose asChild>
                          <X />
                        </DrawerClose>
                      </DrawerTitle>
                      <DrawerDescription />
                      <UsersDetialsPage id={id} />
                    </DrawerHeader>
                  </DrawerContent>
                </Drawer>
              </div>
              <Link href={'/users/' + id} className="flex lg:hidden">
                <Button variant={'outline'}>
                  <Eye className="w-5 h-5" />
                </Button>
              </Link>
            </>
            <EditCreateModal id={id}>
              <Button
                className="flex items-center gap-2 rounded-sm"
                variant={'outline'}
              >
                <SquarePen className="w-5 h-5" />
              </Button>
            </EditCreateModal>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <PageHead
        pageTitle="Users & Roles"
        subTitle="Manage admin users and permissions (Super Admin only)"
      >
        <EditCreateModal>
          <Button className="flex items-center gap-2 rounded-sm">
            <Plus /> <span className="hidden lg:block"> Create New User</span>
          </Button>
        </EditCreateModal>
      </PageHead>
      <div className="grid lg:grid-cols-3 grid-cols-2 flex-wrap lg:gap-6 gap-3 my-8 ">
        {usersRes.admin_summary.map((user, i) => (
          <StatCard
            label={user.label}
            value={user.value}
            Icon={user.icon}
            bgColor={user.bgColor}
            key={i}
          />
        ))}
      </div>

      <ReUseAbleTable data={usersRes.users} columns={columns} />
    </div>
  );
}
