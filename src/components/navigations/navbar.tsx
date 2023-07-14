import React from 'react';
import { UserButton } from '@clerk/nextjs';

import MainNav from '@/components/navigations/main-nav';
import StoreSwitcher from '@/components/navigations/store-switcher';

type NavbarProps = {};

const Navbar = ({}: NavbarProps) => {
  return (
    <div className='border-b'>
      <div className='flex h-14 items-center px-4'>
        <StoreSwitcher />
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
