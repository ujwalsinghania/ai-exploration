import { test, expect } from './fixtures/coverage';

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('logo is visible', async ({ page }) => {
    await expect(page.getByTestId('navbar')).toBeVisible();
    await expect(page.getByRole('link', { name: 'LearnHub' })).toBeVisible();
  });

  test('logo navigates to home', async ({ page }) => {
    await page.goto('/course/1');
    await page.getByRole('link', { name: 'LearnHub' }).click();
    await expect(page).toHaveURL('/');
  });

  test('search input is visible', async ({ page }) => {
    await expect(page.getByTestId('search-input')).toBeVisible();
  });

  test('Log in and Sign up buttons are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
  });
});

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hero heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Learn Without Limits' })).toBeVisible();
  });

  test('Explore Courses CTA is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Explore Courses' })).toBeVisible();
  });

  test('courses grid renders 3 course cards', async ({ page }) => {
    const grid = page.getByTestId('courses-grid');
    await expect(grid).toBeVisible();
    const cards = grid.locator('[data-testid^="course-card-"]');
    await expect(cards).toHaveCount(3);
  });

  test('first course card is clickable and navigates to course detail', async ({ page }) => {
    await page.getByTestId('course-link-1').click();
    await expect(page).toHaveURL('/course/1');
  });

  test('6 category filter pills are rendered', async ({ page }) => {
    // Category pills are buttons in the filter bar
    const categoryButtons = page.locator('button').filter({ hasText: /Web Development|Data Science|Cloud Computing|Machine Learning|Mobile Development|Cybersecurity/ });
    await expect(categoryButtons).toHaveCount(6);
  });
});
