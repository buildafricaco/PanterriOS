'use client';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ReusableSelect } from '@/components/ui/ReusableSelect';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Plus, Trash2 } from 'lucide-react';
import {
  useCreateWorkflow,
  useRetrieveWorkflowDetails,
  useUpdateWorkflow,
} from '@/hook/workflow';
import { modulePermission } from './data';
import { useRetrieveAllUsers } from '@/hook/user-management/useRetrieveAllUsers';
import { USER_ROLES } from '@/components/shared/dashboard/data';
import { WorkflowDetailSkeleton } from '@/components/shared';

const stepSchema = z.object({
  stepNumber: z.number().min(1, 'Select approval type'),
  approvalType: z.enum(['role', 'user']),
  role: z.string().optional(),
  userId: z.number().optional(),
  commentRequired: z.boolean(),
});

const createWorkflowSchema = z.object({
  module: z.string().min(1, 'Select module'),
  subModule: z.string().min(1, 'Select sub Module'),
  action: z.string().min(1, 'Select action'),
  name: z.string().min(3, 'Workflow name is required'),
  description: z.string().min(10, 'Description is required'),
  isActive: z.boolean(),
  steps: z.array(stepSchema).min(1, 'Add at least one approval step'),
});

type CreateWorkflowValues = z.infer<typeof createWorkflowSchema>;

const approvalTypeOptions = [
  { label: 'Approve by Role', value: 'role' },
  { label: 'Approve by User', value: 'user' },
];

const approverOptions = USER_ROLES.map((role) => ({
  label: role.title,
  value: role.value,
}));

const defaultStep = {
  stepNumber: 1,
  approvalType: 'role' as 'role' | 'user',
  role: '',
  commentRequired: false,
  userId: undefined,
};

export function CreateWorkflowView({ id }: { id?: number | string }) {
  const router = useRouter();
  const workflowId = id;
  const isEditMode = Boolean(workflowId);

  const { mutateAsync: CreateWorkflowFn, isPending: isCreatingWorkflow } =
    useCreateWorkflow();
  const { mutateAsync: updateWorkflowFn, isPending: isUpdatingWorkflow } =
    useUpdateWorkflow();
  const { data: workflowDetails, isLoading: isWorkflowLoading } =
    useRetrieveWorkflowDetails(workflowId, isEditMode);

  const { data: platformUsers, isLoading: isPlatformUsersLoading } =
    useRetrieveAllUsers();

  const form = useForm<CreateWorkflowValues>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      module: '',
      subModule: '',
      action: '',
      name: '',
      description: '',
      isActive: true,
      steps: [{ ...defaultStep }],
    },
  });

  const { fields, append, remove, insert } = useFieldArray({
    control: form.control,
    name: 'steps',
  });

  const workflow = workflowDetails?.data.data;
  const isSubmitting = isCreatingWorkflow || isUpdatingWorkflow;

  const moduleOptions = modulePermission.map((p) => ({
    label: p.module,
    value: p.module,
  }));

  const watchedModule = useWatch({
    control: form.control,
    name: 'module',
  });
  const watchedSubModule = useWatch({
    control: form.control,
    name: 'subModule',
  });

  const subModuleOptions = useMemo(() => {
    const selectedModule = modulePermission.find(
      (p) => p.module === watchedModule,
    );
    return (
      selectedModule?.subModules.map((sm) => ({
        label: sm.subModule,
        value: sm.subModule,
      })) || []
    );
  }, [watchedModule]);

  const actionOptions = useMemo(() => {
    const selectedModule = modulePermission.find(
      (p) => p.module === watchedModule,
    );
    const selectedSubModule = selectedModule?.subModules.find(
      (sm) => sm.subModule === watchedSubModule,
    );
    return (
      selectedSubModule?.actions.map((action) => ({
        label: action,
        value: action,
      })) || []
    );
  }, [watchedModule, watchedSubModule]);

  const USER =
    platformUsers?.data.data
      .filter((user) => user.id != null)
      .map((user) => ({
        label: user.fullName,
        value: user.publicId as string,
      })) || [];
  const handleDuplicateStep = (index: number) => {
    const step = form.getValues(`steps.${index}`);
    insert(index + 1, {
      ...step,
      stepNumber: index + 2,
    });
  };

  useEffect(() => {
    if (!isEditMode || !workflow) return;

    form.reset({
      module: workflow.module,
      subModule: workflow.subModule,
      action: workflow.action,
      name: workflow.name,
      description: workflow.description,
      isActive: workflow.status === 'active',
      steps: workflow.steps.map((step) => ({
        stepNumber: step.stepNumber,
        approvalType: step.approvalType,
        role: step.role ?? '',
        userId: step.userId ?? undefined,
        commentRequired: step.commentRequired,
      })) || [{ ...defaultStep }],
    });
  }, [form, isEditMode, workflow]);

  const handleFormSubmit = async (values: CreateWorkflowValues) => {
    const normalizedSteps = values.steps.map((step, index) => {
      const normalizedStep = {
        stepNumber: index + 1,
        approvalType: step.approvalType,
        commentRequired: step.commentRequired,
      };

      if (step.approvalType === 'role' && step.role && step.role.trim()) {
        return {
          ...normalizedStep,
          role: step.role.trim(),
        };
      }

      if (
        step.approvalType === 'user' &&
        typeof step.userId === 'number' &&
        Number.isFinite(step.userId)
      ) {
        return {
          ...normalizedStep,
          userId: step.userId,
        };
      }

      return normalizedStep;
    });

    const payload = {
      ...values,
      steps: normalizedSteps,
    };

    if (isEditMode) {
      const response = await updateWorkflowFn({
        id: workflowId!,
        payload,
      });
      router.push(`/workflow/${response.data.publicId ?? response.data.id}`);
      return;
    }

    const response = await CreateWorkflowFn(payload);
    form.reset();
    router.push(`/workflow/${response.data.publicId ?? response.data.id}`);
  };

  if (isEditMode && (isWorkflowLoading || !workflow)) {
    return <WorkflowDetailSkeleton />;
  }

  return (
    <div className="w-full space-y-8">
      <div className="max-w-4xl rounded-2xl border border-[#E5E7EB] bg-white p-8">
        <h1 className="text-xl font-semibold text-[#111827]">
          {isEditMode ? 'Edit workflow' : 'Create workflow'}
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              handleFormSubmit(values);
            })}
            className="mt-10 space-y-10"
          >
            <section>
              <div className="flex items-center gap-4">
                <h2 className="text-base font-semibold uppercase  text-[#669DF6]">
                  General Information
                </h2>
                <div className="h-px flex-1 bg-[#E5E7EB]" />
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="module"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-[#111827]">
                        Module
                      </FormLabel>
                      <FormControl>
                        <ReusableSelect
                          items={moduleOptions}
                          placeholder="Select Module"
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            form.setValue('subModule', '', {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                            form.setValue('action', '', {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }}
                          className="h-12 rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subModule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-[#111827]">
                        Sub Module
                      </FormLabel>
                      <FormControl>
                        <ReusableSelect
                          items={subModuleOptions}
                          placeholder="Select Sub Module"
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            form.setValue('action', '', {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }}
                          className="h-12 rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="action"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-[#111827]">
                        Action
                      </FormLabel>
                      <FormControl>
                        <ReusableSelect
                          items={actionOptions}
                          placeholder="Select Action"
                          value={field.value}
                          onChange={field.onChange}
                          className="h-12 rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-[#111827]">
                        Workflow Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. Investment Approval"
                          className="h-12 rounded-md text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-[#111827]">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Brief description of what this workflow controls..."
                          className="min-h-36 rounded-md px-4 py-4 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4">
                <h2 className="text-base font-semibold uppercase  text-[#669DF6]">
                  Add Approval Steps
                </h2>
                <div className="h-px flex-1 bg-[#E5E7EB]" />
              </div>

              <div className="mt-8 space-y-6">
                {fields.map((field, index) => (
                  <div key={field.id} className="rounded-xl bg-[#F8FAFC] p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-medium text-[#111827]">
                        Step {index + 1}
                      </h3>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleDuplicateStep(index)}
                          aria-label={`Duplicate step ${index + 1}`}
                        >
                          <Copy className="h-5 w-5 text-[#111827]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (fields.length > 1) remove(index);
                          }}
                          aria-label={`Remove step ${index + 1}`}
                        >
                          <Trash2 className="h-5 w-5 text-danger" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-5 space-y-5">
                      <FormField
                        control={form.control}
                        name={`steps.${index}.approvalType`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ReusableSelect
                                items={approvalTypeOptions}
                                placeholder="approval type"
                                value={field.value}
                                onChange={(value) => {
                                  field.onChange(value);
                                  if (value === 'role') {
                                    form.setValue(
                                      `steps.${index}.userId`,
                                      undefined,
                                    );
                                  } else {
                                    form.setValue(`steps.${index}.role`, '');
                                  }
                                }}
                                className="h-12 rounded-md bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {form.getValues(`steps.${index}.approvalType`) ===
                        'role' && (
                        <FormField
                          control={form.control}
                          name={`steps.${index}.role`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <ReusableSelect
                                  items={approverOptions}
                                  placeholder="Select Role"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="h-12 rounded-md bg-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {form.getValues(`steps.${index}.approvalType`) ===
                        'user' && (
                        <FormField
                          control={form.control}
                          name={`steps.${index}.userId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <ReusableSelect
                                  items={
                                    // platformUsers?.data.data
                                    //   .filter((user) => user.id != null)
                                    //   .map((user) => ({
                                    //     label: user.fullName,
                                    //     value: user.id.toString(),
                                    //   })) || []
                                    USER
                                  }
                                  placeholder="Select User"
                                  value={field.value?.toString()}
                                  onChange={(value) =>
                                    field.onChange(Number(value))
                                  }
                                  className="h-12 rounded-md bg-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name={`steps.${index}.commentRequired`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-base text-[#6B7280]">
                              Require comment on approval
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    append({ ...defaultStep, stepNumber: fields.length + 1 })
                  }
                  className="flex h-14 w-full items-center gap-3 rounded-md border border-dashed border-[#CBD5E1] bg-white px-5  text-[#111827]"
                >
                  <Plus className="h-5 w-5" />
                  Add Step
                </button>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <p className="text-base text-[#111827]">Work flow status</p>
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-4 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className=" h-10 w-16"
                        />
                      </FormControl>
                      <FormLabel className=" text-[#526581]">
                        {field.value ? 'Active' : 'Inactive'}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Link href="/workflow">
                  <Button variant="outline" className="h-12 w-full ">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isSubmitting || isPlatformUsersLoading}
                  className="h-12 bg-[#111111]  hover:bg-[#111111]/90"
                >
                  {isSubmitting
                    ? isEditMode
                      ? 'Updating...'
                      : 'Saving...'
                    : isEditMode
                      ? 'Update Workflow'
                      : 'Save Workflow'}
                </Button>
              </div>
            </section>
          </form>
        </Form>
      </div>
    </div>
  );
}
