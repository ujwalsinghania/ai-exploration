import { test, expect } from './fixtures/coverage';

test.describe('Course Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/course/1');
  });

  test('course title is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('breadcrumb shows Home and category', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByText('Web Development')).toBeVisible();
  });

  test('rating and review count are displayed', async ({ page }) => {
    await expect(page.getByText(/\d+\.\d+/).first()).toBeVisible();
    await expect(page.getByText(/ratings/i)).toBeVisible();
  });

  test('instructor name is displayed', async ({ page }) => {
    await expect(page.getByText(/Created by/i)).toBeVisible();
  });

  test('"What you\'ll learn" section has 6 items', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /What you'll learn/i })).toBeVisible();
    const items = page.locator('ul').filter({ has: page.locator('li svg') }).first().locator('li');
    await expect(items).toHaveCount(6);
  });

  test('Requirements section has 3 items', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Requirements/i })).toBeVisible();
    const items = page.getByRole('heading', { name: /Requirements/i }).locator('..').locator('ul li');
    await expect(items).toHaveCount(3);
  });

  test('sidebar is visible with price and Buy Now button', async ({ page }) => {
    await expect(page.getByTestId('course-sidebar')).toBeVisible();
    await expect(page.getByTestId('buy-now-btn')).toBeVisible();
  });

  test('clicking Buy Now navigates to payment page', async ({ page }) => {
    await page.getByTestId('buy-now-btn').click();
    await expect(page).toHaveURL('/payment/1');
  });

  test('Add to Cart button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Add to Cart/i })).toBeVisible();
  });
});
