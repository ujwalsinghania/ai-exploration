# Test Plan — Maestro Automations (Food Delivery App)

## Overview

| Layer | Tool | Scope |
|-------|------|-------|
| E2E | Maestro | User flows across screens |
| Unit | Jest | Utility functions and business logic |

---

## E2E Tests (Maestro)

Each test is a `.yaml` flow file under `.maestro/`. Run with `maestro test .maestro/<flow>.yaml` or all at once with `npm run e2e`.

Prerequisites: App is running on simulator (`npm run ios` or `npm run android`).

---

### Flow 1: Home Screen — `home-screen.yaml`

**Goal:** Verify the home screen renders correctly and cuisine grid is accessible.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Launch app | Home screen visible |
| 2 | Assert visible | "DELIVERY TO" location chip present |
| 3 | Assert visible | Hero banner ("Hungry?") present |
| 4 | Assert visible | All 8 cuisine cards in grid |
| 5 | Assert testID `search-bar` | Search bar visible |

---

### Flow 2: Cuisine Search — `cuisine-search.yaml`

**Goal:** Verify search filters cuisines and clear button resets state.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Launch app | Home screen |
| 2 | Tap `search-input` | Keyboard opens |
| 3 | Type "piz" | Only Pizza card visible |
| 4 | Assert hidden | Biryani, Burgers, Chinese cards not visible |
| 5 | Tap `search-clear` | Search input cleared |
| 6 | Assert visible | All 8 cuisine cards visible again |
| 7 | Type "xyz" | Empty state shown |

---

### Flow 3: Restaurant List — `restaurant-list.yaml`

**Goal:** Tapping a cuisine navigates to its restaurant list.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Launch app | Home screen |
| 2 | Tap `cuisine-item-pizza` | Navigates to Pizza restaurant list |
| 3 | Assert visible | `restaurant-list-header` visible |
| 4 | Assert visible | "Pizza" in header |
| 5 | Assert visible | "3 restaurants near you" |
| 6 | Assert visible | `restaurant-card-p1` (Domino's) |
| 7 | Assert visible | `restaurant-card-p2` (Pizza Hut) |
| 8 | Assert visible | `restaurant-card-p3` (La Pino'z) |

---

### Flow 4: Restaurant Detail & Add to Cart — `add-to-cart.yaml`

**Goal:** Navigating to a restaurant and adding a menu item to cart.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Launch app | Home screen |
| 2 | Tap `cuisine-item-pizza` | Pizza restaurant list |
| 3 | Tap `restaurant-card-p1` | Restaurant detail screen |
| 4 | Assert `restaurant-detail-title` | "Domino's Pizza" visible |
| 5 | Assert visible | First menu item card |
| 6 | Tap `add-to-cart-p1m1` | Button text changes to "✓ Added" |
| 7 | Assert visible | "✓ Added" feedback |
| 8 | Wait 1.5s | Button reverts (feedback ends) |
| 9 | Assert `cart-badge` | Cart badge shows "1" |

---

### Flow 5: Cart — Quantity Controls — `cart-quantities.yaml`

**Goal:** Increase and decrease item quantity; removing last unit removes item.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Add 1 item to cart (via Flow 4 steps) | Cart badge = 1 |
| 2 | Navigate to Cart tab | Cart screen visible |
| 3 | Assert `quantity-p1m1` | Shows "1" |
| 4 | Tap `increase-p1m1` | Quantity becomes "2" |
| 5 | Tap `increase-p1m1` | Quantity becomes "3" |
| 6 | Assert `cart-total` | Reflects updated price |
| 7 | Tap `decrease-p1m1` | Quantity becomes "2" |
| 8 | Tap `decrease-p1m1` | Quantity becomes "1" |
| 9 | Tap `decrease-p1m1` | Item removed from cart |
| 10 | Assert `empty-cart` | Empty cart state visible |

---

### Flow 6: Cart — Bill Calculation — `cart-billing.yaml`

**Goal:** Verify item total, delivery fee, and grand total are calculated correctly.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Add item with known price (e.g. ₹249 Margherita) to cart | Cart badge = 1 |
| 2 | Navigate to Cart tab | Cart screen |
| 3 | Assert `order-summary` visible | Bill section shown |
| 4 | Assert visible | "Item Total" = ₹249 |
| 5 | Assert visible | "Delivery Fee" = ₹40 |
| 6 | Assert `cart-total` | Shows ₹289 |
| 7 | Tap `increase-p1m1` | Quantity = 2 |
| 8 | Assert `cart-total` | Shows ₹538 (249×2 + 40) |

---

### Flow 7: Checkout — Form Validation — `checkout-validation.yaml`

**Goal:** Verify inline error messages appear for invalid or missing inputs.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Add item to cart, go to Cart tab | Checkout form visible |
| 2 | Tap `place-order-button` with empty form | Errors shown |
| 3 | Assert `address-error` | "Address is required" |
| 4 | Assert `phone-error` | "Phone number is required" |
| 5 | Assert `email-error` | "Email is required" |
| 6 | Type "Hi" in `address-input` | Short address |
| 7 | Tap `place-order-button` | Address error updates |
| 8 | Assert `address-error` | "Please enter a complete address" |
| 9 | Type "12345" in `phone-input` | Too short |
| 10 | Tap `place-order-button` | Phone error shown |
| 11 | Assert `phone-error` | "Enter a valid 10-digit phone number" |
| 12 | Type "notanemail" in `email-input` | Invalid email |
| 13 | Tap `place-order-button` | Email error shown |
| 14 | Assert `email-error` | "Enter a valid email address" |

---

### Flow 8: Checkout — Phone Input Sanitization — `phone-sanitization.yaml`

**Goal:** Verify only digits are accepted in the phone field.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Navigate to Cart tab with item in cart | Checkout form visible |
| 2 | Tap `phone-input`, type "abc9876543210" | Input sanitizes to digits only |
| 3 | Assert `phone-input` value | Shows "9876543210" (letters stripped) |

---

### Flow 9: Happy Path — Full Order — `happy-path.yaml`

**Goal:** End-to-end order placement from home to success modal.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Launch app | Home screen |
| 2 | Tap `cuisine-item-biryani` | Restaurant list |
| 3 | Tap `restaurant-card-b1` | Restaurant detail |
| 4 | Tap `add-to-cart-b1m1` | "✓ Added" feedback |
| 5 | Tap Cart tab | Cart screen |
| 6 | Type valid address (≥10 chars) in `address-input` | Field filled |
| 7 | Type "9876543210" in `phone-input` | 10 digits |
| 8 | Type "test@example.com" in `email-input` | Valid email |
| 9 | Tap `place-order-button` | Success modal appears |
| 10 | Assert `success-modal` visible | Order confirmation shown |
| 11 | Assert visible | "Order Placed!" |
| 12 | Assert visible | Delivery address in modal |
| 13 | Tap `success-modal-close` | Modal dismissed |
| 14 | Assert `empty-cart` | Cart cleared |

---

### Flow 10: Cart Badge Cap — `cart-badge-cap.yaml`

**Goal:** Badge shows "9+" when cart count exceeds 9.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Add a single item to cart | Cart badge = 1 |
| 2 | Navigate to cart, increase qty to 10 | |
| 3 | Assert `cart-badge` | Shows "9+" |

---

## Unit Tests (Jest)

Files live in `__tests__/` at the same level as the source file. Run with `npm test`.

---

### Suite 1: `cart/utils.test.ts` — Form Validation

Tests for `validate()` in `app/(tabs)/cart/utils.ts`.

#### 1.1 — Address validation

| Test | Input | Expected Error |
|------|-------|----------------|
| Empty address | `{ address: "", phone: "9876543210", email: "a@b.com" }` | `address: "Address is required"` |
| Short address (< 10 chars) | `address: "123 St"` | `address: "Please enter a complete address"` |
| Valid address (≥ 10 chars) | `address: "123 Main Street Apt 4"` | No address error |

#### 1.2 — Phone validation

| Test | Input | Expected Error |
|------|-------|----------------|
| Empty phone | `phone: ""` | `phone: "Phone number is required"` |
| Too short (5 digits) | `phone: "12345"` | `phone: "Enter a valid 10-digit phone number"` |
| Too long (11 digits) | `phone: "12345678901"` | `phone: "Enter a valid 10-digit phone number"` |
| Contains letters | `phone: "98765abcde"` | `phone: "Enter a valid 10-digit phone number"` |
| Valid (exactly 10 digits) | `phone: "9876543210"` | No phone error |

#### 1.3 — Email validation

| Test | Input | Expected Error |
|------|-------|----------------|
| Empty email | `email: ""` | `email: "Email is required"` |
| Missing `@` | `email: "notanemail"` | `email: "Enter a valid email address"` |
| Missing domain | `email: "user@"` | `email: "Enter a valid email address"` |
| Missing TLD | `email: "user@domain"` | `email: "Enter a valid email address"` |
| Valid email | `email: "user@example.com"` | No email error |

#### 1.4 — All fields valid

| Test | Input | Expected |
|------|-------|----------|
| All valid | All fields passing | Returns `{}` (empty errors object) |

#### 1.5 — Multiple errors

| Test | Input | Expected |
|------|-------|----------|
| All empty | `{ address: "", phone: "", email: "" }` | All three error keys present |

---

### Suite 2: `cart/utils.test.ts` — Veg Dot Styles (Cart)

Tests for `getVegDotStyle()` and `getVegDotInnerStyle()` in `app/(tabs)/cart/utils.ts`.

| Test | Input | Expected |
|------|-------|----------|
| Veg border style | `getVegDotStyle(true)` | Contains `borderColor: "#0F8A65"` |
| Non-veg border style | `getVegDotStyle(false)` | Contains `borderColor: "#E43B4F"` |
| Veg fill style | `getVegDotInnerStyle(true)` | Contains `backgroundColor: "#0F8A65"` |
| Non-veg fill style | `getVegDotInnerStyle(false)` | Contains `backgroundColor: "#E43B4F"` |

---

### Suite 3: `home/utils.test.ts` — Cuisine Item Style

Tests for `getCuisineItemStyle()` in `app/(tabs)/home/utils.ts`.

| Test | Input | Expected |
|------|-------|----------|
| Returns correct color | `getCuisineItemStyle("#FF0000")` | Contains `backgroundColor: "#FF0000"` |
| Different color | `getCuisineItemStyle("#FFF3E0")` | Contains `backgroundColor: "#FFF3E0"` |
| Returns array | `getCuisineItemStyle(...)` | Result is an array |

---

### Suite 4: `restaurants/utils.test.ts` — List Container Style

Tests for `getListContainerStyle()` in `app/restaurants/utils.ts`.

| Test | Input | Expected |
|------|-------|----------|
| Zero inset | `getListContainerStyle(0)` | `paddingBottom: 40` |
| Non-zero inset | `getListContainerStyle(34)` | `paddingBottom: 74` |
| Negative inset | `getListContainerStyle(-10)` | `paddingBottom: 30` |

---

### Suite 5: `restaurants/[cuisine]/utils.test.ts` — Scroll Content Style

Tests for `getScrollContentStyle()` in `app/restaurants/[cuisine]/utils.ts`.

| Test | Input | Expected |
|------|-------|----------|
| Zero inset | `getScrollContentStyle(0)` | `paddingBottom: 24` |
| Non-zero inset | `getScrollContentStyle(34)` | `paddingBottom: 58` |
| Large inset | `getScrollContentStyle(100)` | `paddingBottom: 124` |

---

### Suite 6: `restaurants/[cuisine]/utils.test.ts` — Veg Dot Styles (Restaurant Detail)

Tests for `getVegDotStyle()` and `getVegDotInnerStyle()` in `app/restaurants/[cuisine]/utils.ts`.

Same cases as Suite 2 — these functions are duplicated in restaurant detail utils and should produce identical results.

---

## Test Execution

```bash
# Run all Maestro E2E flows
npm run e2e

# Run a single Maestro flow
maestro test .maestro/happy-path.yaml

# Interactive Maestro debugger
maestro studio

# Run all Jest unit tests
npm test

# Run a specific test suite
npx jest __tests__/cart/utils.test.ts
```

---

## Coverage Summary

| Area | E2E Flows | Unit Suites |
|------|-----------|-------------|
| Home screen render | Flow 1 | — |
| Cuisine search | Flow 2 | — |
| Restaurant list navigation | Flow 3 | — |
| Add to cart | Flow 4 | — |
| Quantity controls | Flow 5 | — |
| Bill calculation | Flow 6 | — |
| Form validation (UI) | Flow 7 | Suite 1 |
| Phone sanitization | Flow 8 | Suite 1 (phone rules) |
| Full order happy path | Flow 9 | — |
| Cart badge cap (9+) | Flow 10 | — |
| Veg/non-veg styles | — | Suites 2, 6 |
| Cuisine card styles | — | Suite 3 |
| Safe area padding (list) | — | Suite 4 |
| Safe area padding (scroll) | — | Suite 5 |
