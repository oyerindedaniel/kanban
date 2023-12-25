/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import { LINKS } from './constants';
import { cn } from '@/lib/utils';

const Platform = () => {
  return (
    <div>
      <div>
        {LINKS.map((link, Idx) => {
          return (
            <div
              className={cn(
                ' h-[88px] w-[280px] bg-white flex flex-col justify-center rounded-lg cursor-pointer px-4 py-3 shadow-md'
              )}
            >
              <p className="font-medium">{link.platformTitle}</p>
              <p className=" font-medium text-brand-regent-grey">{link.subtaskStatus}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Platform;
