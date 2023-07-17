'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './color-cell-action';

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-x-2'>
          <div
            className='w-6 h-6 rounded-full border'
            style={{ backgroundColor: row.original.value }}
          />
          <span>{row.original.value}</span>
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
