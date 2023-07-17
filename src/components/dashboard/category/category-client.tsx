'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';
import { CategoryColumn, columns } from './category-column';

type CategoryClientProps = {
  data: CategoryColumn[];
};

const CategoryClient = ({ data }: CategoryClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Categories (${data.length})`}
          description='Manage Categories for your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className='h-4 w-4' />
          Add New
        </Button>
      </div>
      <DataTable searchKey='name' columns={columns} data={data} />
      <Separator />
      <Heading title='API' description='API calls for Categories' />
      <ApiList entityName='categories' entityIdName='categoryId' />
    </>
  );
};

export default CategoryClient;
