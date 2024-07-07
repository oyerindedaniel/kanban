import test, { expect } from '@playwright/test';

test.describe('board action', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('given an empty board Column array: shows the correct error messages', async ({ page }) => {
    await page.route('http://localhost:3000/api/trpc/board.create?batch=1', (route) => {
      route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: {
            json: {
              data: {
                type: 'zod',
                message: 'Missing create board fields.',
                statusCode: 400
              }
            }
          }
        })
      });
    });

    await page.getByRole('button', { name: 'add new board + Create New' }).click();
    await page.getByLabel(/Board Name/i).fill('walk cat');
    await page.getByTestId('button.0').click();
    await page.getByRole('button', { name: /Create New Board/i }).click();

    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByText(/An error occurred/i)).toBeVisible();
  });
});
