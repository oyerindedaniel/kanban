import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TRPCError } from '@trpc/server';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { ZodError } from 'zod';

export const handleServerError = (error: TRPCError | ZodError) => {
  if (error instanceof PrismaClientKnownRequestError) {
    // Handle Prisma unique constraint violation error
    if (error.code === 'P2002' && error.meta?.modelName) {
      const targetField = Array.isArray(error.meta.target) ? error.meta.target[0] : undefined;
      return {
        type: 'prisma',
        statusCode: 400, // Bad Request
        // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
        message: `${error?.meta?.modelName} ${targetField}: Unique constraint violation`
      };
    }
  } else if (error instanceof ZodError || error?.code === 'BAD_REQUEST') {
    // Handle Zod errors
    return {
      type: 'zod',
      statusCode: 400,
      message: error instanceof ZodError ? error.flatten() : error?.message
    };
  } else if (error instanceof TRPCError) {
    // Handle tRPC errors
    const httpCode = getHTTPStatusCodeFromError(error);
    return {
      type: 'trpc',
      statusCode: httpCode,
      message: error.message
    };
  }
  // For other errors, provide a generic error response
  return {
    type: 'unknown',
    statusCode: 500,
    message: 'An unexpected error occurred.'
  };
};
