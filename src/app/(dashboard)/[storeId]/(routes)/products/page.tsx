import React from 'react';
import { NextPage } from 'next';
import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import ProductClient from '@/components/dashboard/product/product-client';
import { ProductColumn } from '@/components/dashboard/product/product-column';
import { formatter } from '@/lib/utils';

type ProductsProps = {
  params: {
    storeId: string;
  };
};

const Products: NextPage<ProductsProps> = async ({ params: { storeId } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatter.format(product.price.toNumber()),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: format(product.createdAt, 'do MMMM, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default Products;
