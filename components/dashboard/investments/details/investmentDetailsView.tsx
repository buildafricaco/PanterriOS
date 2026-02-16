'use client';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import Overview from './overview';
import { FinancialDetails } from './financialDetails';
import PropertyInfo from './propertyInfo';
import { Documents } from './documents';
import PropertyInvestors from './propertyInvestors';

interface DetailsPageViewProp {
  children?: React.ReactNode;
}
export function InvestmentDetailsView({ children }: DetailsPageViewProp) {
  const [tab, setTab] = useState('overview');
  const tabs = [
    {
      title: 'Overview',
      value: 'overview',
      content: <Overview />,
    },
    {
      title: 'Financial Details',
      value: 'financial-details',
      content: <FinancialDetails />,
    },
    {
      title: 'Property Info',
      value: 'property-info',
      content: <PropertyInfo />,
    },
    {
      title: 'Documents',
      value: 'documents',
      content: <Documents />,
    },
    {
      title: 'Investors',
      value: 'investors',
      content: <PropertyInvestors />,
    },
  ];
  return (
    <div className=" ">
      {children ? (
        <Drawer direction="right">
          <DrawerTrigger asChild>{children}</DrawerTrigger>
          <DrawerContent
            className=" lg:data-[vaul-drawer-direction=left]:sm:max-w-xl
            lg:data-[vaul-drawer-direction=right]:sm:max-w-xl  overflow-hidden overflow-y-auto
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
                    <MapPin className="w-4 h-4" /> <span>Lekki, Lagos</span>
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
      ) : (
        <>
          <div className=" w-full">
            <div className="flex gap-14 items-center">
              <div className="text-xl font-bold">Lekki Phase 1 Apartments</div>
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
              <MapPin className="w-4 h-4" /> <span>Lekki, Lagos</span>
            </p>
          </div>
          <Button className="w-fit">Edit investment</Button>
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
        </>
      )}
    </div>
  );
}
