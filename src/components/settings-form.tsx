'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Store } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type SettingsFormProps = {
  initialData: Store;
};

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValue = z.infer<typeof formSchema>;

const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValue) => {
    console.log(data);
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title='Settings' description='Manage Store Preferneces' />
        <Button
          disabled={loading}
          variant={'destructive'}
          size={'sm'}
          onClick={() => setOpen(true)}>
          <Trash2 className='H-4 W-4' />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'>
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Store name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type='submit' className='ml-auto'>
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SettingsForm;
