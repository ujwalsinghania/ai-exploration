import { test, expect } from './fixtures/coverage';
import { validFormData } from './fixtures/test-data';

async function fillForm(page: import('@playwright/test').Page, data: typeof validFormData) {
  await page.getByTestId('input-first-name').fill(data.firstName);
  await page.getByTestId('input-last-name').fill(data.lastName);
  await page.getByTestId('input-email').fill(data.email);
  await page.getByTestId('input-card-number').fill(data.cardNumber);
  await page.getByTestId('input-expiry').fill(data.expiry);
  await page.getByTestId('input-cvv').fill(data.cvv);
  await page.getByTestId('input-address').fill(data.address);
  await page.getByTestId('input-city').fill(data.city);
  await page.getByTestId('input-zip').fill(data.zip);
  await page.getByTestId('input-country').selectOption(data.country);
}

test.describe('Payment Page - Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/payment/1');
  });

  test('Checkout heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
  });

  test('checkout form and order summary are visible', async ({ page }) => {
    await expect(page.getByTestId('checkout-form')).toBeVisible();
    await expect(page.getByTestId('order-summary')).toBeVisible();
  });

  test('back link navigates to course detail', async ({ page }) => {
    await page.getByRole('link', { name: /Back to course/i }).click();
    await expect(page).toHaveURL('/course/1');
  });
});

test.describe('Payment Page - Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/payment/1');
  });

  test('submitting empty form shows all required errors', async ({ page }) => {
    await page.getByTestId('submit-btn').click();
    await expect(page.getByTestId('error-first-name')).toBeVisible();
    await expect(page.getByTestId('error-last-name')).toBeVisible();
    await expect(page.getByTestId('error-email')).toBeVisible();
    await expect(page.getByTestId('error-card-number')).toBeVisible();
    await expect(page.getByTestId('error-expiry')).toBeVisible();
    await expect(page.getByTestId('error-cvv')).toBeVisible();
    await expect(page.getByTestId('error-address')).toBeVisible();
    await expect(page.getByTestId('error-city')).toBeVisible();
    await expect(page.getByTestId('error-zip')).toBeVisible();
    await expect(page.getByTestId('error-country')).toBeVisible();
  });

  test('invalid email shows email format error', async ({ page }) => {
    await page.getByTestId('input-email').fill('not-an-email');
    await page.getByTestId('submit-btn').click();
    await expect(page.getByTestId('error-email')).toBeVisible();
  });

  test('card number without spaces shows card error', async ({ page }) => {
    await page.getByTestId('input-card-number').fill('1234567890123456');
    await page.getByTestId('submit-btn').click();
    await expect(page.getByTestId('error-card-number')).toBeVisible();
  });

  test('invalid expiry format shows expiry error', async ({ page }) => {
    await page.getByTestId('input-expiry').fill('1227');
    await page.getByTestId('submit-btn').click();
    await expect(page.getByTestId('error-expiry')).toBeVisible();
  });

  test('CVV with fewer than 3 digits shows CVV error', async ({ page }) => {
    await page.getByTestId('input-cvv').fill('12');
    await page.getByTestId('submit-btn').click();
    await expect(page.getByTestId('error-cvv')).toBeVisible();
  });
});

test.describe('Payment Page - Happy Path', () => {
  test('complete purchase shows success page', async ({ page }) => {
    await page.goto('/payment/1');
    await fillForm(page, validFormData);
    await page.getByTestId('submit-btn').click();
    await expect(page.getByTestId('success-page')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Payment Successful/i })).toBeVisible();
  });

  test('success page shows enrolled course title', async ({ page }) => {
    await page.goto('/payment/1');
    await fillForm(page, validFormData);
    await page.getByTestId('submit-btn').click();
    await expect(page.getByTestId('success-page')).toBeVisible();
    await expect(page.getByText(/enrolled in/i)).toBeVisible();
  });

  test('Browse More Courses navigates to home', async ({ page }) => {
    await page.goto('/payment/1');
    await fillForm(page, validFormData);
    await page.getByTestId('submit-btn').click();
    await expect(page.getByTestId('success-page')).toBeVisible();
    await page.getByRole('button', { name: /Browse More Courses/i }).click();
    await expect(page).toHaveURL('/');
  });
});
