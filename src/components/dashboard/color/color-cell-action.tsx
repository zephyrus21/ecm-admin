'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { ColorColumn } from './color-column';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Copy, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import axios from 'axios';
import AlertModal from '../../modals/alert-modal';

type CellActionProps = {
  data: ColorColumn;
};

const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Color Id Copied to Clipboard!');
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${data.id}`);
      router.refresh();
      toast.success('Color deleted!');
    } catch (error) {
      toast.error('Make sure you remove all products and categories first.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className='h-8 w-8 p-0'>
            <span className='sr-only'>Open Menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className='mr-2 h-4 w-4' />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}>
            <Edit className='mr-2 h-4 w-4' />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash2 className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
