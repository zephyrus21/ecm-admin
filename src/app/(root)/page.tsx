'use client';

import { useEffect } from 'react';

import { useStoreModal } from '@/hooks/use-store-modal';

const Root = () => {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return <div>Root</div>;
};

export default Root;
