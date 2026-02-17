'use client';
import { DetailsView } from '@/components/dashboard/investors';
import { PageHead, StatCard } from '@/components/shared';
import { ReUseAbleTable } from '@/components/shared/reUseAbleTable';
import { Button } from '@/components/ui/button';
import { type ColumnDef } from '@tanstack/react-table';
import {
  Banknote,
  CircleAlert,
  CircleCheckBig,
  CircleX,
  Eye,
  Share,
  TriangleAlert,
  Users,
  Wallet,
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
interface InvestorsDataTableProp {
  id: string;
  name: string;
  email: string;
  kyc_status: string;
  tier: string;
  total_invested: {
    currency: string;
    value: number;
    formatted: string;
  };
  portfolio_value: {
    currency: string;
    value: number;
    formatted: string;
  };
  account_status: string;
}

export default function Investorspage() {
  const metrics = [
    {
      label: 'Total Investors',
      value: 6,
      description: 'All registered users',
      icon: Users,
    },
    {
      label: 'Pending KYC',
      value: 1,
      description: 'Requires review',
      icon: TriangleAlert,
      color: 'text-orange-500',
    },
    {
      label: 'Total Invested',
      // currency: 'NGN',
      // value: 190000000,
      value: '₦190M',
      description: 'Across all investors',
      icon: Banknote,
    },
    {
      label: 'Avg Portfolio',
      // currency: 'NGN',
      // value: 3000000,
      value: '₦3M',
      description: 'Per investor',
      icon: Wallet,
    },
  ];

  const investors = [
    {
      id: '000001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      kyc_status: 'Approved',
      tier: 'Platinum',
      total_invested: {
        currency: 'NGN',
        value: 50000000,
        formatted: '₦50.00M',
      },
      portfolio_value: {
        currency: 'NGN',
        value: 20000000,
        formatted: '₦20.00M',
      },
      account_status: 'active',
    },
    {
      id: '000001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      kyc_status: 'Approved',
      tier: 'Platinum',
      total_invested: {
        currency: 'NGN',
        value: 50000000,
        formatted: '₦50.00M',
      },
      portfolio_value: {
        currency: 'NGN',
        value: 20000000,
        formatted: '₦20.00M',
      },
      account_status: 'active',
    },
    {
      id: '000001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      kyc_status: 'Approved',
      tier: 'Platinum',
      total_invested: {
        currency: 'NGN',
        value: 50000000,
        formatted: '₦50.00M',
      },
      portfolio_value: {
        currency: 'NGN',
        value: 20000000,
        formatted: '₦20.00M',
      },
      account_status: 'active',
    },
    {
      id: '000002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      kyc_status: 'Pending',
      tier: 'Gold',
      total_invested: {
        currency: 'NGN',
        value: 30000000,
        formatted: '₦30.00M',
      },
      portfolio_value: {
        currency: 'NGN',
        value: 10000000,
        formatted: '₦10.00M',
      },
      account_status: 'active',
    },
    {
      id: '000003',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      kyc_status: 'Rejected',
      tier: 'Silver',
      total_invested: {
        currency: 'NGN',
        value: 20000000,
        formatted: '₦20.00M',
      },
      portfolio_value: {
        currency: 'NGN',
        value: 5000000,
        formatted: '₦5.00M',
      },
      account_status: 'suspended',
    },
    {
      id: '000003',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      kyc_status: 'Rejected',
      tier: 'Silver',
      total_invested: {
        currency: 'NGN',
        value: 20000000,
        formatted: '₦20.00M',
      },
      portfolio_value: {
        currency: 'NGN',
        value: 5000000,
        formatted: '₦5.00M',
      },
      account_status: 'suspended',
    },
  ];
  const columns: ColumnDef<InvestorsDataTableProp>[] = [
    {
      accessorKey: 'name',
      header: 'name',
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className="  text-center">
            <p>{row.original.name} </p>
            <small className="text-gray-500">{id}</small>
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
      accessorKey: 'kyc_status',
      header: 'kyc status',
      cell: ({ row }) => {
        const status = row.original.kyc_status;
        return status.toLowerCase() === 'approved' ? (
          <div className="text-center capitalize bg-green-50 text-green-500 flex  items-center gap-1.5 border border-green-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <CircleCheckBig className="w-3 h-3" />
            <span> {status}</span>
          </div>
        ) : status === 'Pending' ? (
          <div className="text-center capitalize bg-orange-50 text-orange-500 flex  items-center gap-1.5 border border-orange-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <CircleAlert className="w-3 h-3" />
            <span> {status}</span>
          </div>
        ) : (
          <div className="text-center capitalize bg-red-50 text-red-500 flex  items-center gap-1.5 border border-red-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <CircleX className="w-3 h-3" />
            <span> {status}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'tier',
      header: 'tier',
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.original.tier}</div>
      ),
    },
    {
      accessorKey: 'total_invested',
      header: 'total invested',
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.total_invested.formatted}
        </div>
      ),
    },
    {
      accessorKey: 'portfolio_value',
      header: 'Wallet Balance',
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.portfolio_value.formatted}
        </div>
      ),
    },

    {
      accessorKey: 'account_status',
      header: 'account status',
      cell: ({ row }) => {
        const status = row.original.account_status;
        return status.toLowerCase() === 'active' ? (
          <div className="text-center capitalize bg-green-50 text-green-500 flex  items-center gap-1.5 border border-green-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <CircleCheckBig className="w-3 h-3" />
            <span> {status}</span>
          </div>
        ) : (
          <div className="text-center capitalize bg-red-50 text-red-500 flex  items-center gap-1.5 border border-red-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <CircleX className="w-3 h-3" />
            <span> {status}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'action',
      header: 'action',
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <>
            <div className="lg:flex hidden ">
              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <Button variant={'outline'}>
                    <Eye className="w-5 h-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent
                  className=" lg:data-[vaul-drawer-direction=left]:sm:max-w-xl
            lg:data-[vaul-drawer-direction=right]:sm:max-w-xl overflow-hidden overflow-y-auto
            "
                >
                  <DrawerHeader>
                    <DrawerTitle className="flex justify-between">
                      <div>
                        <div className="text-xl font-bold">
                          Investor Profile{' '}
                        </div>
                        <p className="text-gray-500">
                          Complete details and activity for John Doe
                        </p>
                      </div>
                      <DrawerClose asChild>
                        <X />
                      </DrawerClose>
                    </DrawerTitle>
                    <DrawerDescription />
                    <DetailsView id={id} />
                  </DrawerHeader>
                </DrawerContent>
              </Drawer>
            </div>
            <Link href={'/investors/' + id} className="flex lg:hidden">
              <Button variant={'outline'}>
                <Eye className="w-5 h-5" />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <PageHead
        pageTitle="Investor Management"
        subTitle="View and manage all investor accounts"
        className=" [&_h2]:text-green-500"
      >
        <Button
          variant={'outline'}
          className="flex items-center gap-2 rounded-sm"
        >
          <Share /> <span className="hidden lg:block"> Export CSV</span>
        </Button>
      </PageHead>
      <div className="grid lg:grid-cols-4 grid-cols-2 flex-wrap lg:gap-6 gap-3 my-8 ">
        {metrics.map((stat, i) => (
          <StatCard
            label={stat.label}
            description={stat.description}
            value={stat.value}
            Icon={stat.icon}
            color={stat.color}
            key={i}
          />
        ))}
      </div>

      <ReUseAbleTable data={investors} columns={columns} />
    </div>
  );
}
