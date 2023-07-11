import React from 'react';
import Modal from '@/components/modals/modal';
import { useStoreModal } from '@/hooks/use-store-modal';

const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title='Create a store'
      description='Create a store to manage products'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}>
      Create Store
    </Modal>
  );
};

export default StoreModal;
