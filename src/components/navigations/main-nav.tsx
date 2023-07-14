'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';

type MainNavProps = {
  className: string;
} & React.HTMLAttributes<HTMLElement>;

const MainNav = ({ className, ...props }: MainNavProps) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathName === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
