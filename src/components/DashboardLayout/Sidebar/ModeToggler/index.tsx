import React from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { MoonIcon, SunIcon } from '@/assets';
import { Switch } from '@/components/ui/switch';

const ModeToggler = () => {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="py-3 rounded-lg w-full bg-brand-lavender-mist dark:bg-brand-dark flex gap-6 mb-6 items-center justify-center">
      <span className="text-[#828FA3]">
        <Image src={SunIcon} style={{ fill: 'currentColor' }} alt="img" />
      </span>
      <Switch className="" onClick={handleThemeChange} />
      <span className="text-[#828FA3]">
        <Image src={MoonIcon} style={{ color: '#828FA3' }} alt="img" />
      </span>
    </div>
  );
};

export default ModeToggler;
