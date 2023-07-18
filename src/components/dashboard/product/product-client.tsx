'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProductColumn, columns } from './product-column';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

type ProductClientProps = {
  data: ProductColumn[];
};

const ProductClient = ({ data }: ProductClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Products (${data.length})`}
          description='Manage Products for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className='h-4 w-4' />
          Add New
        </Button>
      </div>
      <DataTable searchKey='name' columns={columns} data={data} />
      <Separator />
      <Heading title='API' description='API calls for BillBoards' />
      <ApiList entityName='products' entityIdName='productId' />
    </>
  );
};

export default ProductClient;
