import type { Page } from '@playwright/test';

/**
 * Returns the pathname with the search of a given page's url.
 *
 * @param page - The page to get the path of.
 * @returns The path of the page's url.
 */
export const getPath = (page: Page) => {
  const url = new URL(page.url());
  return `${url.pathname}${url.search}`;
};
