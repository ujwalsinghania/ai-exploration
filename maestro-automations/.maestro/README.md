# Maestro E2E Tests

Place your Maestro test flow `.yaml` files in this directory.

## Quick Start

```bash
# Run all E2E tests
npm run e2e

# Run a specific flow
maestro test .maestro/<flow-name>.yaml

# Interactive debugging
maestro studio

# Inspect device view hierarchy
maestro hierarchy
```

## Writing Flows

Each flow file targets `appId: host.exp.Exponent` (Expo Go). Use `testID` values defined on components for reliable element targeting.

Available `testID`s:

### Home Screen (`app/(tabs)/index.tsx`)

- `home-screen` — root scroll view
- `home-header` — delivery header
- `search-bar` — search container
- `search-input` — search text input
- `search-clear` — clear search button
- `hero-banner` — hero image banner
- `cuisine-section-title` — "What's on your mind?" heading
- `cuisine-grid` — 4×2 cuisine grid container
- `cuisine-item-{id}` — individual cuisine card (e.g. `cuisine-item-biryani`)
- `offers-button` — offers icon button

### Restaurant List (`app/restaurants/[cuisine].tsx`)

- `restaurant-list` — FlatList
- `restaurant-list-header` — header with cuisine emoji + count
- `restaurant-card-{id}` — restaurant card (e.g. `restaurant-card-b1`)
- `restaurant-name-{id}` — restaurant name text
- `restaurant-popup` — detail popup modal
- `restaurant-popup-content` — popup content container
- `restaurant-popup-title` — popup restaurant name
- `close-popup-button` — close popup button
- `menu-item-{id}` — menu item row (e.g. `menu-item-b1m1`)
- `menu-item-name-{id}` — menu item name text
- `menu-item-price-{id}` — menu item price text
- `menu-item-desc-{id}` — menu item description text
- `add-to-cart-{id}` — add to cart button for item

### Cart Screen (`app/(tabs)/cart.tsx`)

- `cart-screen` — root scroll view
- `cart-badge` — tab bar cart count badge
- `empty-cart` — empty state view
- `cart-items` — cart items container
- `cart-item-{id}` — individual cart item row
- `decrease-{id}` — decrease quantity button
- `quantity-{id}` — quantity text
- `increase-{id}` — increase quantity button
- `order-summary` — bill details section
- `cart-total` — total amount text
- `checkout-form` — delivery details form section
- `address-input` — address text input
- `address-error` — address validation error
- `phone-input` — phone text input
- `phone-error` — phone validation error
- `email-input` — email text input
- `email-error` — email validation error
- `place-order-button` — place order CTA
- `success-modal` — order success modal
- `success-modal-content` — success modal content
- `success-modal-close` — "Done" button on success modal

## Cuisine IDs

`biryani`, `pizza`, `burgers`, `chinese`, `south-indian`, `north-indian`, `desserts`, `healthy`

## Example Flow

```yaml
appId: host.exp.Exponent
---
- launchApp
- assertVisible: "Hungry?"
- tapOn:
    id: "cuisine-item-pizza"
- assertVisible: "Pizza Restaurants"
- tapOn:
    id: "restaurant-card-p1"
- assertVisible: "Margherita"
- tapOn:
    id: "add-to-cart-p1m1"
- assertVisible: "✓ Added"
```
