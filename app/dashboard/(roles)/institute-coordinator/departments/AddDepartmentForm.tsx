'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import InputBox from '@/components/ui/InputBox';
import { useRoles } from '@/context/RolesContext';
import { useUser } from '@/context/UserContext';
import addDepartmentFormSchema from '@/formSchemas/addDepartment';
import sendInviteEmail from '@/server/send-invite';
import updateUserByAuthId from '@/server/update-user';
import { supabaseClient } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-swr';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const AddDepartmentForm = () => {
  const { user } = useUser();
  const { roles } = useRoles();
  const supabase = supabaseClient();
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const form = useForm<z.infer<typeof addDepartmentFormSchema>>({
    resolver: zodResolver(addDepartmentFormSchema),
    defaultValues: {
      departmentName: '',
      departmentCoordinatorName: '',
      email: '',
      sendInvite: true,
    },
  });

  const instituteId: number = user?.user_metadata.institute_id;

  const { trigger: insertUser } = useInsertMutation(
    supabase.from('users'),
    ['id'],
    'id',
    {
      onError: async (error) => {
        if (error.code === '23505') {
          const email = form.getValues('email');
          if (!email) return;
          const { data: existingUser, error: fetchUserError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

          if (fetchUserError) {
            toast.error(fetchUserError.details);
            return;
          }

          const userId = existingUser.id;

          const { data: existingRole, error: roleError } = await supabase
            .from('user_roles')
            .select('*')
            .eq('uid', userId)
            .eq('role_id', roles!['department-coordinator']);

          if (roleError) {
            toast.error(roleError.details);
            return;
          }

          if (existingRole.length === 0) {
            const departmentName = form.getValues('departmentName');
            if (instituteId && existingUser.auth_id) {
              try {
                const data = await updateUserByAuthId(
                  existingUser.auth_id,
                  existingUser.name,
                  roles!['department-coordinator']
                );

                if (data) {
                  await supabase.from('departments').insert({
                    name: departmentName,
                    uid: userId,
                    institute_id: instituteId,
                  });

                  await supabase.from('user_roles').insert({
                    uid: userId,
                    role_id: roles!['department-coordinator'],
                  });
                }
              } catch (error) {
                if (typeof error === 'string') toast.error(error);
                else console.error(error);
              }
            }
          } else {
            toast.error('User is already a department coordinator.');
            return;
          }

          toast.success(
            'User already exists, assigned department coordinator role.'
          );
        } else {
          toast.error(error.message);
        }
      },
      onSuccess: async (data) => {
        const userId = data![0].id;
        const departmentName = form.getValues('departmentName');
        const departmentCoordinatorName = form.getValues(
          'departmentCoordinatorName'
        );
        const email = form.getValues('email');
        const sendInvite = form.getValues('sendInvite');

        if (instituteId) {
          await supabase.from('departments').insert({
            name: departmentName,
            uid: userId,
            institute_id: instituteId,
          });

          await supabase
            .from('user_roles')
            .insert({ uid: userId, role_id: roles!['department-coordinator'] });
        }

        if (sendInvite) {
          try {
            const data = await sendInviteEmail(
              email,
              userId,
              departmentCoordinatorName,
              instituteId,
              roles!['department-coordinator']
            );

            if (data) {
              await supabase
                .from('users')
                .update({ is_registered: true, auth_id: data.user.id })
                .eq('id', userId);
            }
          } catch (error) {
            if (typeof error === 'string') toast.error(error);
            else console.error(error);
          }
        }

        toast.success('Department added successfully.');
      },
    }
  );

  const handleAddRole = async (
    values: z.infer<typeof addDepartmentFormSchema>
  ) => {
    const { departmentCoordinatorName, email } = values;
    setOpenAddDialog(false);

    try {
      await insertUser([{ name: departmentCoordinatorName, email }]);
    } catch (error: any) {
      if (error.code !== '23505') console.error(error);
    }
  };

  return (
    <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="h-5 w-5 mr-2" />
          <span className="pr-1">Add</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="w-[calc(100vw-24px)] min-[450px]:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Add New Department</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddRole)}>
            <div className="pb-5 space-y-3">
              <InputBox
                label="Name"
                placeholder="Enter department name"
                id="departmentName"
                type="text"
                form={form}
              />
              <InputBox
                label="Department Coordinator"
                placeholder="Enter coordinator's full name"
                id="departmentCoordinatorName"
                type="text"
                form={form}
              />
              <InputBox
                label="Email"
                placeholder="Enter email"
                id="email"
                type="email"
                form={form}
              />
              <FormField
                control={form.control}
                name="sendInvite"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border-2 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Send an invite email</FormLabel>
                      <FormDescription>
                        The department registers via the invite email, which can
                        be sent later too. If the user is already registered,
                        the role is assigned directly without another email.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button>Add Department</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDepartmentForm;
