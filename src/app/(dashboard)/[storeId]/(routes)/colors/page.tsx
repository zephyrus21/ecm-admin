import React from 'react';
import { NextPage } from 'next';
import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import { ColorColumn } from '@/components/dashboard/color/color-column';
import ColorClient from '@/components/dashboard/color/color-client';

type ColorProps = {
  params: {
    storeId: string;
  };
};

const Color: NextPage<ColorProps> = async ({ params: { storeId } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedColors: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, 'do MMMM, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default Color;
