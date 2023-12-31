import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import SettingsForm from '@/components/dashboard/settings-form';

type SettingsProps = {
  params: {
    storeId: string;
  };
};

const Settings = async ({ params: { storeId } }: SettingsProps) => {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) redirect('/');

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default Settings;
