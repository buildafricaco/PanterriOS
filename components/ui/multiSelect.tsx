'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface Option {
  title?: string;
  label?: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Select options',
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggleOption = (optionValue: string) => {
    const current = value ?? [];
    if (current.includes(optionValue)) {
      onChange(current.filter((v) => v !== optionValue));
    } else {
      onChange([...current, optionValue]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span className="truncate text-gray-500">
            {value && value.length > 0
              ? options
                  .filter((opt) => value.includes(opt.value))
                  .map((opt) => opt.label || opt.title)
                  .join(', ')
              : placeholder}
          </span>
          <ChevronDown className="size-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandGroup>
            {options.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <CommandItem
                  key={option.value}
                  onSelect={() => toggleOption(option.value)}
                  className={cn(
                    'flex items-center justify-between',
                    isSelected ? 'font-medium' : '',
                  )}
                >
                  {option.label || option.title}
                  {isSelected && <Check className="size-4" />}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
