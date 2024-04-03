import { type QueryObserverResult } from '@tanstack/react-query';
import { type FC } from 'react';
import { BiSolidError } from 'react-icons/bi';
import { Button } from './button';

interface ErrorComponentProps {
  refetchButtonText?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch?: Promise<QueryObserverResult<any>>;
  isRefetching?: boolean;
  description?: string;
  actionFunc?: () => void;
}

const ErrorComponent: FC<ErrorComponentProps> = ({
  refetchButtonText,
  refetch,
  isRefetching,
  description,
  actionFunc
}) => {
  return (
    <div
      role="alert"
      className="text-destructive bg-white flex flex-col items-center justify-center absolute inset-0"
    >
      <BiSolidError size="85px" fill="currentColor" />
      {description && (
        <p className="text-md text-center font-medium sm:text-lg md:text-xl">{description}</p>
      )}
      {actionFunc && (
        <Button variant="default" size="sm" onClick={() => actionFunc?.()}>
          Try Again
        </Button>
      )}
      {refetchButtonText && (
        <Button
          type="button"
          variant="outline"
          size="xs"
          onClick={() => refetch}
          disabled={isRefetching}
        >
          {refetchButtonText}
        </Button>
      )}
    </div>
  );
};

export default ErrorComponent;
