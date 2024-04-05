import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Represents an error object.
 * @interface
 */
export interface ErrorObject {
  /**
   * The type of the error.
   */
  type?: string;
  /**
   * The error message.
   */
  message?: string;
  /**
   * The HTTP status code associated with the error.
   */
  statusCode?: number;
}

/**
 * Formats an error object with default values if any of its properties are missing.
 * @param {ErrorObject} errorObject - The error object to format.
 * @returns {ErrorObject} The formatted error object.
 */
export function formatErrorObject({ message, type, statusCode }: ErrorObject): ErrorObject {
  return {
    message: message ?? 'An error occurred',
    type: type ?? 'Unknown',
    statusCode: statusCode ?? 500
  };
}

/**
 * Formats an error or an array of errors.
 * @param {ErrorObject | ErrorObject[]} error - The error or array of errors to format.
 * @returns {ErrorObject[]} An array of formatted error objects.
 */
export function formatError(error: ErrorObject | ErrorObject[]): ErrorObject[] {
  if (Array.isArray(error)) {
    return error.map(formatErrorObject);
  } else if (error instanceof Object) {
    return [formatErrorObject(error)];
  } else {
    return [formatErrorObject({})];
  }
}

export function capitalizeFirstWord(sentence: string) {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
