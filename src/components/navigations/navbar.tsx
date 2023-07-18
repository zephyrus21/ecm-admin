import React from 'react';
import { redirect } from 'next/navigation';
import { UserButton, auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import MainNav from '@/components/navigations/main-nav';
import StoreSwitcher from '@/components/navigations/store-switcher';
import ThemeToggle from '../ui/theme-toggler';

type NavbarProps = {};

const Navbar = async ({}: NavbarProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className='border-b'>
      <div className='flex h-14 items-center px-4'>
        <StoreSwitcher items={stores} />
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <UserButton afterSignOutUrl='/' />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
