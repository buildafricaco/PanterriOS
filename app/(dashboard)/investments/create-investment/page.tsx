'use client';
import {
  CreateInvestmentForm,
  FormStepper,
} from '@/components/dashboard/investments';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useState } from 'react';

export default function CreateNewInvestmentpage() {
  const [step, setStep] = useState(1);
  return (
    <div className=" space-y-4">
      <div className=" flex justify-between">
        <div>
          <h2 className="text-lg font-bold">Create new investment</h2>
          <small className=" text-gray-500">
            {' '}
            Step {step < 4 ? step : 4} of 4
          </small>
        </div>

        <Button className=" flex items-center gap-1.5" variant={'outline'}>
          <span>Save draft</span>
          <Download className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-4 relative">
        <div className="lg:w-1/3  p-2 lg:block hidden ">
          <FormStepper activeStep={step} className="fixed border-r pr-16" />
        </div>
        <div className="lg:w-3/3  rounded-md p-2">
          <CreateInvestmentForm step={step} setStep={(e) => setStep(e)} />
        </div>
      </div>
    </div>
  );
}
