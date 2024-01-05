'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { KanbanLogo } from '@/assets';
import Image from 'next/image';

const TopBar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-brand-ebony-clay text-white dark:text-black flex h-24 items-center justify-between shadow-sm md:p-1.5">
      <Image src={KanbanLogo} alt="logo" />
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <p>Aqib</p>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
