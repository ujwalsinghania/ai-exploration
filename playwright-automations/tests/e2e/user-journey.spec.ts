import { test, expect } from './fixtures/coverage';
import { validFormData } from './fixtures/test-data';

test('full user journey: home → course detail → payment → success → home', async ({ page }) => {
  // 1. Start on home page
  await page.goto('/');
  await expect(page.getByTestId('courses-grid')).toBeVisible();
  await expect(page.locator('[data-testid^="course-card-"]')).toHaveCount(3);

  // 2. Click first course
  await page.getByTestId('course-link-1').click();
  await expect(page).toHaveURL('/course/1');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  // 3. Click Buy Now
  await page.getByTestId('buy-now-btn').click();
  await expect(page).toHaveURL('/payment/1');
  await expect(page.getByTestId('checkout-form')).toBeVisible();
  await expect(page.getByTestId('order-summary')).toBeVisible();

  // 4. Fill out payment form
  await page.getByTestId('input-first-name').fill(validFormData.firstName);
  await page.getByTestId('input-last-name').fill(validFormData.lastName);
  await page.getByTestId('input-email').fill(validFormData.email);
  await page.getByTestId('input-card-number').fill(validFormData.cardNumber);
  await page.getByTestId('input-expiry').fill(validFormData.expiry);
  await page.getByTestId('input-cvv').fill(validFormData.cvv);
  await page.getByTestId('input-address').fill(validFormData.address);
  await page.getByTestId('input-city').fill(validFormData.city);
  await page.getByTestId('input-zip').fill(validFormData.zip);
  await page.getByTestId('input-country').selectOption(validFormData.country);

  // 5. Submit and verify success
  await page.getByTestId('submit-btn').click();
  await expect(page.getByTestId('success-page')).toBeVisible();
  await expect(page.getByRole('heading', { name: /Payment Successful/i })).toBeVisible();

  // 6. Return to home
  await page.getByRole('button', { name: /Browse More Courses/i }).click();
  await expect(page).toHaveURL('/');
  await expect(page.getByTestId('courses-grid')).toBeVisible();
});
