# Plan: E2E Playwright Tests for LearnHub User Journey

## Context

The playwright-automations project is a React course platform used as a target for Playwright tests. No test spec files exist yet. The goal is to write end-to-end tests covering the complete user journey: Home (listing) → Course Detail → Payment/Checkout → Success. A testing-plan.md in the repo specifies minimum 80% code coverage.

---

## Files to Create

| File                          | Purpose                              |
| ----------------------------- | ------------------------------------ |
| `tests/home.spec.ts`          | Navbar + HomePage tests              |
| `tests/course-detail.spec.ts` | CourseDetailPage tests               |
| `tests/payment.spec.ts`       | Payment form validation + happy path |
| `tests/user-journey.spec.ts`  | Full end-to-end flow                 |
| `tests/fixtures/test-data.ts` | Shared form data and helpers         |

---

## Test Specs

### 1. `tests/fixtures/test-data.ts`

Shared constants for reuse across spec files:

- `validFormData` — full valid payment payload matching Yup schema
- `FIRST_COURSE_URL` = `/course/1`
- `PAYMENT_URL` = `/payment/1`

---

### 2. `tests/home.spec.ts` — Navbar + Home Page

**Navbar:**

- Logo "LearnHub" is visible (`[data-testid="navbar"]`)
- Clicking logo navigates to `/`
- Search input is visible on desktop
- "Log in" and "Sign up" buttons are visible

**Hero section:**

- "Learn Without Limits" heading is visible
- "Explore Courses" CTA button scrolls/navigates to courses

**Course listing:**

- Courses grid renders (`[data-testid="courses-grid"]`)
- Exactly 3 course cards are displayed
- Each card shows title, instructor, price
- Only the first course card has a clickable link (`[data-testid="course-link-1"]`)
- Clicking first course navigates to `/course/1`

**Category filters:**

- 6 category pills are rendered

---

### 3. `tests/course-detail.spec.ts` — Course Detail Page

Navigate to `/course/1` directly.

- Page title / course title is visible
- Breadcrumb shows "Home > Web Development"
- Rating and review count displayed
- Instructor name displayed
- "What you'll learn" section has 6 items
- "Requirements" section has 3 items
- Sidebar is visible (`[data-testid="course-sidebar"]`)
- Price and original price shown in sidebar
- "Buy Now" button (`[data-testid="buy-now-btn"]`) is visible
- Clicking "Buy Now" navigates to `/payment/1`
- "Add to Cart" button is visible

---

### 4. `tests/payment.spec.ts` — Payment Page

Navigate to `/payment/1` directly.

**Layout:**

- "Checkout" heading visible
- Checkout form visible (`[data-testid="checkout-form"]`)
- Order summary visible (`[data-testid="order-summary"]`)
- "← Back to course" link navigates back to `/course/1`

**Form Validation (required field errors):**

- Submit empty form → all required error messages appear
  - `error-first-name`, `error-last-name`, `error-email`
  - `error-card-number`, `error-expiry`, `error-cvv`
  - `error-address`, `error-city`, `error-zip`, `error-country`
- Invalid email → `error-email` shows format error
- Card number without spaces (e.g. `1234567890123456`) → `error-card-number` shown
- Invalid expiry format → `error-expiry` shown
- CVV with 1–2 digits → `error-cvv` shown

**Happy Path:**

- Fill all fields with `validFormData`
  - Card number: `"1234 5678 9012 3456"` (spaces required by schema)
  - Expiry: `"12/27"` (MM/YY format)
  - CVV: `"123"`
  - Country: select `"US"`
- Click "Complete Purchase" (`[data-testid="submit-btn"]`)
- `[data-testid="success-page"]` appears
- "Payment Successful!" heading visible
- Enrolled course title visible
- "Browse More Courses" button navigates to `/`

---

### 5. `tests/user-journey.spec.ts` — Full E2E Flow

Single test covering the complete user journey:

1. Navigate to `/` (home)
2. Assert 3 course cards visible
3. Click first course link (`[data-testid="course-link-1"]`)
4. Assert URL is `/course/1`, course title visible
5. Click "Buy Now" (`[data-testid="buy-now-btn"]`)
6. Assert URL is `/payment/1`, checkout form visible
7. Fill all payment fields with `validFormData`
8. Click submit button
9. Assert success page appears (`[data-testid="success-page"]`)
10. Click "Browse More Courses"
11. Assert URL returns to `/`

---

## Key Selectors Reference

All pages use `data-testid` attributes — use `page.getByTestId()` throughout.

| Element           | Selector             |
| ----------------- | -------------------- |
| Courses grid      | `courses-grid`       |
| First course card | `course-card-1`      |
| First course link | `course-link-1`      |
| Course sidebar    | `course-sidebar`     |
| Buy Now           | `buy-now-btn`        |
| Checkout form     | `checkout-form`      |
| Order summary     | `order-summary`      |
| Submit button     | `submit-btn`         |
| Success page      | `success-page`       |
| Form inputs       | `input-{field-name}` |
| Form errors       | `error-{field-name}` |

---

## Validation Rules (from Yup schema in `src/utils/constants.ts`)

- Card number must match `\d{4}\s\d{4}\s\d{4}\s\d{4}` (spaces between groups)
- Expiry must match `MM/YY` pattern
- CVV must be 3–4 digits
- Email must be valid format
- All other fields: required

---

## Verification

```bash
npm run test                    # Run all tests (auto-starts dev server)
npm run test:report             # View HTML report
npx playwright test -g "full user journey"   # Run only E2E journey test
npx playwright test tests/payment.spec.ts    # Run only payment tests
```
