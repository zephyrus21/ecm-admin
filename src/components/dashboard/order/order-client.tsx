'use client';

import Heading from '@/components/ui/heading';
import { DataTable } from '@/components/ui/data-table';
import { OrderColumn, columns } from './order-column';

type OrderClientProps = {
  data: OrderColumn[];
};

const OrderClient = ({ data }: OrderClientProps) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description='Manage Orders for your store'
      />
      <DataTable searchKey='products' columns={columns} data={data} />
    </>
  );
};

export default OrderClient;
