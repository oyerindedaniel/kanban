import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-md border dark:border-brand-bright-grey border-input text-black dark:text-white bg-white dark:bg-brand-ebony-clay bg-background px-3 py-2 text-md file:border-0 file:bg-transparent file:text-sm focus-visible:ring-2 ring-offset-background focus-visible:ring-brand-iris focus-visible:ring-offset-2 file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-0 focus:border-0 active:outline-0 active:border-0',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
