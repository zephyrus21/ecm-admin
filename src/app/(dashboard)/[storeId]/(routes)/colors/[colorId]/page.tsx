import React from 'react';
import { NextPage } from 'next';
import prismadb from '@/lib/prismadb';
import ColorForm from '@/components/dashboard/color/color-form';

type ColorPageProps = {
  params: {
    colorId: string;
  };
};

const ColorPage: NextPage<ColorPageProps> = async ({ params: { colorId } }) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: colorId,
    },
  });
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
