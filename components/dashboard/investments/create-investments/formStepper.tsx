import { cn } from '@/lib/utils';
import {
  Banknote,
  Check,
  CircleAlert,
  CircleCheck,
  FileText,
} from 'lucide-react';

export function FormStepper({
  activeStep,
  className,
}: {
  activeStep: number;
  className: string;
}) {
  const steppers = [
    {
      title: 'Basic Information',
      icon: CircleAlert,
    },
    {
      title: 'Financial Details',
      icon: Banknote,
    },
    {
      title: 'Media & Documents',
      icon: FileText,
    },
    {
      title: 'Review & Publish',
      icon: Check,
    },
  ];
  return (
    <div className={cn(` space-y-4 p-4 last:[&_div:hidden ${className}`)}>
      {steppers.map((step, i) => {
        const Icon = step.icon;
        const isLast = i === steppers.length - 1;
        const stepCount = i + 1;
        const isCompleted = activeStep > stepCount;

        return (
          <div key={i} className="space-y-3">
            <div
              className={cn(
                ` text-gray-400 flex items-center gap-4 p-4 rounded-md ${activeStep === stepCount && 'bg-green-900 text-white'} ${isCompleted && 'bg-green-100 text-green-950'}`,
              )}
            >
              <div
                className={cn(
                  `bg-gray-50/20 p-4 rounded-md ${isCompleted && 'bg-white'}`,
                )}
              >
                {isCompleted ? <CircleCheck /> : <Icon className="" />}
              </div>
              <div className="">
                <span>Step {i + 1}</span>
                <p className=" font-bold">{step.title}</p>
              </div>
            </div>
            <div
              className={cn(
                ` w-1.5 rounded-md h-10 bg-gray-100 mx-auto ${isLast && 'hidden'} ${isCompleted && 'bg-green-700'}`,
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
