'use client';
import { ReUseAbleTable } from '@/components/shared/reUseAbleTable';
import { Button } from '@/components/ui/button';
import { type ColumnDef } from '@tanstack/react-table';
import { Eye, MapPin, X } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { InvestmentDetailsView } from './details/investmentDetailsView';
interface PropertiesTableData {
  id: string;
  property: string;
  type: string;
  status: string;
  funding_progress: {
    value: number;
    formatted: string;
  };
  target_amount: {
    currency: string;
    value: number;
    formatted: string;
  };
  raised_amount: {
    currency: string;
    value: number;
    formatted: string;
  };
  returns: {
    value: number;
    unit: string;
    formatted: string;
  };
  investors: number;
  location: string;
}

export function AllInvestments() {
  const [tab, setTab] = useState('overview');
  const tabs = [
    {
      title: 'Overview',
      value: 'overview',
      content: '',
    },
    {
      title: 'Financial Details',
      value: 'financial-details',
      content: '',
    },
    {
      title: 'Property Info',
      value: 'property-info',
      content: '',
    },
    {
      title: 'Documents',
      value: 'documents',
      content: '',
    },
    {
      title: 'Investors',
      value: 'investors',
      content: '',
    },
  ];
  const properties = [
    {
      id: '200',
      property: 'Victoria Island Office Complex',
      type: 'Commercial',
      status: 'Active',
      funding_progress: {
        value: 85,
        formatted: '85%',
      },
      target_amount: {
        currency: 'NGN',
        value: 50000000,
        formatted: '₦50.0M',
      },
      raised_amount: {
        currency: 'NGN',
        value: 42500000,
        formatted: '₦42.5M',
      },
      returns: {
        value: 18,
        unit: 'percent',
        formatted: '18%',
      },
      investors: 127,
      location: 'Lagos',
    },
    {
      id: '2003',
      property: 'Lekki Phase 1 Apartments',
      type: 'Residential',
      status: 'Funded',
      funding_progress: {
        value: 85,
        formatted: '85%',
      },
      target_amount: {
        currency: 'NGN',
        value: 50000000,
        formatted: '₦50.0M',
      },
      raised_amount: {
        currency: 'NGN',
        value: 42500000,
        formatted: '₦42.5M',
      },
      returns: {
        value: 15,
        unit: 'percent',
        formatted: '15%',
      },
      investors: 127,
      location: 'Lagos',
    },
    {
      id: '20034',
      property: 'Abuja Mixed-Use Development',
      type: 'Mixed-Use',
      status: 'Active',
      funding_progress: {
        value: 85,
        formatted: '85%',
      },
      target_amount: {
        currency: 'NGN',
        value: 50000000,
        formatted: '₦50.0M',
      },
      raised_amount: {
        currency: 'NGN',
        value: 42500000,
        formatted: '₦42.5M',
      },
      returns: {
        value: 20,
        unit: 'percent',
        formatted: '20%',
      },
      investors: 127,
      location: 'Lagos',
    },
    {
      id: '200342',
      property: 'Ikoyi Luxury Residences',
      type: 'Residential',
      status: 'Active',
      funding_progress: {
        value: 85,
        formatted: '85%',
      },
      target_amount: {
        currency: 'NGN',
        value: 50000000,
        formatted: '₦50.0M',
      },
      raised_amount: {
        currency: 'NGN',
        value: 42500000,
        formatted: '₦42.5M',
      },
      returns: {
        value: 17,
        unit: 'percent',
        formatted: '17%',
      },
      investors: 127,
      location: 'Lagos',
    },
    {
      id: '2003423',
      property: 'Port Harcourt Shopping Mall',
      type: 'Commercial',
      status: 'Active',
      funding_progress: {
        value: 85,
        formatted: '85%',
      },
      target_amount: {
        currency: 'NGN',
        value: 50000000,
        formatted: '₦50.0M',
      },
      raised_amount: {
        currency: 'NGN',
        value: 42500000,
        formatted: '₦42.5M',
      },
      returns: {
        value: 18,
        unit: 'percent',
        formatted: '18%',
      },
      investors: 127,
      location: 'Lagos',
    },
  ];

  const columns: ColumnDef<PropertiesTableData>[] = [
    {
      accessorKey: 'property',
      header: 'property',
      cell: ({ row }) => {
        const location = row.original.location;
        return (
          <div className="">
            <p>{row.original.property} </p>
            <small className="text-gray-500 flex items-center gap-1">
              {' '}
              <MapPin className="w-3 h-3" /> <span> {location}</span>
            </small>
          </div>
        );
      },
    },
    {
      accessorKey: 'type',
      header: 'type',
      cell: ({ row }) => <div className="">{row.original.type}</div>,
    },

    {
      accessorKey: 'status',
      header: ' status',
      cell: ({ row }) => {
        const status = row.original.status;
        return status.toLowerCase() === 'active' ? (
          <div className="text-center capitalize bg-green-50 text-green-500 flex  items-center gap-1.5 border border-green-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <span> {status}</span>
          </div>
        ) : (
          <div className="text-center capitalize bg-blue-50 text-blue-500 flex  items-center gap-1.5 border border-blue-300 whitespace-nowrap p-1 rounded-sm w-fit ">
            <span> {status}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'funding',
      header: 'funding',
      cell: ({ row }) => {
        const value = row.original.funding_progress.value;
        return (
          <div className=" flex items-center gap-2">
            <Progress
              value={value}
              className={cn(
                'rounded-sm bg-gray-200',
                value > 85 && '[&>div]:bg-green-500',
                value <= 85 && value > 75 && '[&>div]:bg-blue-500',
                value <= 75 && '[&>div]:bg-red-500',
                '[&>div]:transition-colors duration-300',
              )}
            />
            {row.original.funding_progress.formatted}
          </div>
        );
      },
    },
    {
      accessorKey: 'target',
      header: 'target',
      cell: ({ row }) => (
        <div className="">{row.original.target_amount.formatted}</div>
      ),
    },
    {
      accessorKey: 'raised',
      header: 'raised',
      cell: ({ row }) => (
        <div className="">{row.original.raised_amount.formatted}</div>
      ),
    },

    {
      accessorKey: 'returns',
      header: 'returns',
      cell: ({ row }) => {
        return (
          <div className=" text-blue-600">{row.original.returns.formatted}</div>
        );
      },
    },
    {
      accessorKey: 'investors',
      header: 'invostors',
      cell: ({ row }) => {
        return <div className=" ">{row.original.investors}</div>;
      },
    },
    {
      accessorKey: 'action',
      header: 'action',
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <>
            <InvestmentDetailsView>
              <Button variant={'outline'}>
                <Eye className="w-5 h-5" />
              </Button>
            </InvestmentDetailsView>
            {/* <div className="lg:flex hidden ">
              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <Button variant={'outline'}>
                    <Eye className="w-5 h-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent
                  className=" lg:data-[vaul-drawer-direction=left]:sm:max-w-3xl
            lg:data-[vaul-drawer-direction=right]:sm:max-w-3xl overflow-y-auto
            "
                >
                  <DrawerHeader>
                    <DrawerTitle className="flex justify-between">
                      <div className=" w-full">
                        <div className="flex gap-14 items-center">
                          <div className="text-xl font-bold">
                            Lekki Phase 1 Apartments
                          </div>
                          {'funded' === 'funded' ? (
                            <div className="text-center capitalize bg-green-50 text-green-500 flex  items-center gap-1.5 border border-green-300 whitespace-nowrap p-1 rounded-sm w-fit ">
                              <span> funded</span>
                            </div>
                          ) : (
                            <div className="text-center capitalize bg-blue-50 text-blue-500 flex  items-center gap-1.5 border border-blue-300 whitespace-nowrap p-1 rounded-sm w-fit ">
                              <span> funded</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-500 flex items-center">
                          <MapPin className="w-4 h-4" />{' '}
                          <span>Lekki, Lagos</span>
                        </p>
                      </div>
                      <DrawerClose asChild>
                        <X />
                      </DrawerClose>
                    </DrawerTitle>
                    <Button className="w-fit">Edit investment</Button>
                    <DrawerDescription />

                    <Tabs defaultValue={tab} className="space-y-5 w-full">
                      <TabsList className="flex flex-wrap w-full">
                        {tabs.map((tab, i) => (
                          <TabsTrigger
                            value={tab.value}
                            key={i}
                            onClick={() => setTab(tab.value)}
                          >
                            {tab.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {tabs.map((tab, i) => (
                        <TabsContent value={tab.value} key={i}>
                          {tab.content}
                        </TabsContent>
                      ))}
                    </Tabs>
                  </DrawerHeader>
                </DrawerContent>
              </Drawer>
            </div> */}
            <Link href={'/investments/' + id} className="flex lg:hidden">
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
      {' '}
      <ReUseAbleTable data={properties} columns={columns} />
    </div>
  );
}
