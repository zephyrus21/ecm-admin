'use client';

import { ColumnDef } from '@tanstack/react-table';

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'billboard',
    header: 'Billboard',
    cell: ({ row }) => {
      return row.original.billboardLabel;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  // {
  //   id: 'action',
  //   cell: ({ row }) => {
  //     return <CellAction data={row.original} />;
  //   },
  // },
];
