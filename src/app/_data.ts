import { api } from '@/trpc/server';
import { unstable_cache as next_cache } from 'next/cache';
import { cache } from 'react';

export const getUserBoards = cache(async () => {
  return next_cache(
    async () => {
      const boards = (await api.board.findAll.query()).data;
      return boards;
    },
    undefined,
    { tags: ['user_boards'] }
  )();
});

export const getColumnsByBoardSlug = cache(async (slug: string) => {
  return next_cache(
    async () => {
      const columns = (await api.column.findByBoardSlug.query({ slug })).data;
      return columns;
    },
    ['columns', slug],
    { tags: ['board_columns'] }
  )();
});
