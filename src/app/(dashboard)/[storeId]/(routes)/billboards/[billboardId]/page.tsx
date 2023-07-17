import React from 'react';
import { NextPage } from 'next';
import prismadb from '@/lib/prismadb';
import BillboardForm from '@/components/dashboard/billboard-form';

type BillBoardPageProps = {
  params: {
    billboardId: string;
  };
};

const BillBoardPage: NextPage<BillBoardPageProps> = async ({
  params: { billboardId },
}) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillBoardPage;
