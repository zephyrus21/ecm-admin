'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ColorColumn, columns } from './color-column';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

type ColorClientProps = {
  data: ColorColumn[];
};

const ColorClient = ({ data }: ColorClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Colors (${data.length})`}
          description='Manage Colors for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className='h-4 w-4' />
          Add New
        </Button>
      </div>
      <DataTable searchKey='name' columns={columns} data={data} />
      <Separator />
      <Heading title='API' description='API calls for Colors' />
      <ApiList entityName='colors' entityIdName='colorId' />
    </>
  );
};

export default ColorClient;
