'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const revalidateBoard = (path?: string) => {
  revalidateTag('user_boards');
  revalidatePath(`/`);
  path && redirect(path);
};

export const revalidateBoardBySlug = (path?: string) => {
  revalidateTag('board_columns');
  revalidatePath(`/`);
  path && redirect(path);
};
