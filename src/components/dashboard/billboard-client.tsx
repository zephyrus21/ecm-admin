'use client';

import React from 'react';
import { Plus } from 'lucide-react';

import Heading from '@/components/ui/heading';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';

type BillboardClientProps = {};

const BillboardClient = ({}: BillboardClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Billboards (0)'
          description='Manage Billboards for your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className='h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default BillboardClient;
