'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { CreateUserForm } from '../createUserForm';
interface ComProp {
  children: React.ReactNode;
  id?: string | number;
}
export default function EditCreateModal({ children, id }: ComProp) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="h-100 lg:h-auto overflow-auto">
          <DialogTitle className="hidden" />
          <DialogDescription className="hidden" />
          <CreateUserForm closeModal={() => setOpen(false)} id={id} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
