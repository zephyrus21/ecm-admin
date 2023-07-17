'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './billboard-cell-action';

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
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
