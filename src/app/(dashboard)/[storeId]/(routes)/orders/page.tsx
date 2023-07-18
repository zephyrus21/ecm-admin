import React from 'react';
import { NextPage } from 'next';
import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import { OrderColumn } from '@/components/dashboard/order/order-column';
import OrderClient from '@/components/dashboard/order/order-client';
import { formatter } from '@/lib/utils';

type OrdersProps = {
  params: {
    storeId: string;
  };
};

const Orders: NextPage<OrdersProps> = async ({ params: { storeId } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    isPaid: order.isPaid,
    address: order.address,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(', '),
    totalPrice: formatter.format(
      order.orderItems.reduce((total, orderItem) => {
        return total + Number(orderItem.product.price);
      }, 0)
    ),
    createdAt: format(order.createdAt, 'do MMMM, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default Orders;
