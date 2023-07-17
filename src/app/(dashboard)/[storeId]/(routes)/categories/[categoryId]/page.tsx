import React from 'react';
import { NextPage } from 'next';
import prismadb from '@/lib/prismadb';
import CategoryForm from '@/components/dashboard/category/category-form';

type CategoryPageProps = {
  params: {
    categoryId: string;
    storeId: string;
  };
};

const CategoryPage: NextPage<CategoryPageProps> = async ({
  params: { categoryId, storeId },
}) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
