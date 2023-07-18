'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './product-cell-action';

export type ProductColumn = {
  id: string;
  name: string;
  isArchived: boolean;
  isFeatured: boolean;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-x-2'>
          <div
            className='w-6 h-6 rounded-full border'
            style={{ backgroundColor: row.original.color }}
          />
          <span>{row.original.color}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'action',
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
