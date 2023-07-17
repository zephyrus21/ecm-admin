import React from 'react';
import { NextPage } from 'next';

import BillboardClient from '@/components/dashboard/billboard-client';

type BillboardsProps = {};

const Billboards: NextPage<BillboardsProps> = ({}) => {
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient />
      </div>
    </div>
  );
};

export default Billboards;
