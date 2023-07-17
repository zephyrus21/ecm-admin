import React from 'react';
import { NextPage } from 'next';
import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import BillboardClient from '@/components/dashboard/billboard-client';
import { BillboardColumn } from '@/components/dashboard/billboard-column';

type BillboardsProps = {
  params: {
    storeId: string;
  };
};

const Billboards: NextPage<BillboardsProps> = async ({
  params: { storeId },
}) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, 'do MMMM, yyyy'),
    })
  );

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default Billboards;
