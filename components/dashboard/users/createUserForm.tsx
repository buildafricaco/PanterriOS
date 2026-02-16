'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ACCOUNT_STATUS,
  DEPARTMENTS,
  USER_ROLES,
} from '@/components/shared/dashboard/data';
import { Save } from 'lucide-react';
import { MultiSelect } from '@/components/ui/multiSelect';

const createUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number is required'),
  gender: z.string().min(1, 'Select gender'),
  role: z.array(z.string()).min(1, 'Select at least one role'),
  department: z.string().min(1, 'Select department'),
  status: z.string().min(1, 'Select status'),
});

type CreateUserFormData = z.infer<typeof createUserSchema>;

const genderOptions = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
];

const roleOptions = USER_ROLES;

const departmentOptions = DEPARTMENTS;

const statusOptions = ACCOUNT_STATUS;

interface Prop {
  closeModal: () => void;
  id?: string | number;
}

export function CreateUserForm({ closeModal, id }: Prop) {
  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      role: [],
      department: '',
      status: '',
    },
  });

  const onSubmit = async (values: CreateUserFormData) => {
    console.log(values);

    // 🔥 Call your create user mutation here
    // await createUserFn(values)
    closeModal();
    form.reset();
  };

  return (
    <div className="space-y-6 pb-6 w-full">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">
          {id ? 'Edit User detials' : 'Create New User'}
        </h1>
      </div>

      <Card className="col-span-2 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Enter user's first name"
                        className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Enter user's last name"
                        className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        {...field}
                        placeholder="Enter user's email"
                        className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Enter phone number"
                        className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="select gender" />
                        </SelectTrigger>
                        <SelectContent position={'popper'}>
                          <SelectGroup>
                            {genderOptions.map((option, i) => (
                              <SelectItem value={option.value} key={i}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={roleOptions}
                        value={field.value}
                        onChange={(roles) => field.onChange(roles)}
                        placeholder="Select roles"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Department */}
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="select department" />
                        </SelectTrigger>
                        <SelectContent position={'popper'}>
                          <SelectGroup>
                            {departmentOptions.map((option, i) => (
                              <SelectItem value={option.value} key={i}>
                                {option.title}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="select Status" />
                        </SelectTrigger>
                        <SelectContent position={'popper'}>
                          <SelectGroup>
                            {statusOptions.map((option, i) => (
                              <SelectItem value={option.value} key={i}>
                                {option.title}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Buttons */}
            <div className="space-y-3 flex gap-4 justify-center">
              <Button
                type="button"
                variant="outline"
                className=" font-medium"
                onClick={closeModal}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className=" font-medium flex items-center gap-2"
              >
                <Save />
                <span> Create User</span>
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
