'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BillboardColumn, columns } from './billboard-column';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

type BillboardClientProps = {
  data: BillboardColumn[];
};

const BillboardClient = ({ data }: BillboardClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Billboards (${data.length})`}
          description='Manage Billboards for your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className='h-4 w-4' />
          Add New
        </Button>
      </div>
      <DataTable searchKey='label' columns={columns} data={data} />
      <Separator />
      <Heading title='API' description='API calls for BillBoards' />
      <ApiList entityName='billboards' entityIdName='billboardId' />
    </>
  );
};

export default BillboardClient;
