import { type ErrorObject } from '@/lib/utils';
import React from 'react';
import { IoIosAlert } from 'react-icons/io';
import { Alert, AlertDescription } from './alert';

interface ErrorAlertProps {
  errors: Array<ErrorObject>;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ errors }) => {
  return (
    <div className="flex flex-col gap-2 max-w-[600px] w-full">
      {errors.map((error, Idx) => (
        <Alert key={Idx} variant="destructive">
          <IoIosAlert size="24px" />
          <AlertDescription className="capitalize">{error.message!}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default ErrorAlert;
