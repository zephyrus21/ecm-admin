import React from 'react';
import { NextPage } from 'next';
import prismadb from '@/lib/prismadb';
import SizeForm from '@/components/dashboard/size/size-form';

type SizePageProps = {
  params: {
    sizeId: string;
  };
};

const SizePage: NextPage<SizePageProps> = async ({ params: { sizeId } }) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: sizeId,
    },
  });
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
