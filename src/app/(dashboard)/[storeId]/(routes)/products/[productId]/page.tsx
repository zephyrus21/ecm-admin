import React from 'react';
import { NextPage } from 'next';
import prismadb from '@/lib/prismadb';
import ProductForm from '@/components/dashboard/product/product-form';

type BillBoardPageProps = {
  params: {
    productId: string;
    storeId: string;
  };
};

const BillBoardPage: NextPage<BillBoardPageProps> = async ({
  params: { productId, storeId },
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default BillBoardPage;
