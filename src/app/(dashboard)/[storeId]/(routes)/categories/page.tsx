import React from 'react';
import { NextPage } from 'next';
import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import CategoryClient from '@/components/dashboard/category/category-client';
import { CategoryColumn } from '@/components/dashboard/category/category-column';

type CategoriesProps = {
  params: {
    storeId: string;
  };
};

const Categories: NextPage<CategoriesProps> = async ({
  params: { storeId },
}) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, 'do MMMM, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default Categories;
