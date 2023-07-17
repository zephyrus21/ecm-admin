import React from 'react';
import { NextPage } from 'next';
import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import SizeClient from '@/components/dashboard/size/size-client';
import { SizeColumn } from '@/components/dashboard/size/size-column';

type SizesProps = {
  params: {
    storeId: string;
  };
};

const Sizes: NextPage<SizesProps> = async ({ params: { storeId } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, 'do MMMM, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default Sizes;
