---
description: How to run Maestro E2E tests for the mobile app
---

# Running Maestro E2E Tests

## Prerequisites

1. **Maestro CLI** must be installed. If not:

   ```bash
   curl -fsSL "https://get.maestro.mobile.dev" | bash
   ```

2. **The app must be running** on an emulator/simulator or physical device via Expo Go:

   ```bash
   npm start
   ```

   Then press `a` (Android) or `i` (iOS) to launch the app.

3. **Ensure an emulator/simulator is running** and the app is loaded before running tests.

## Running All E2E Tests

// turbo

```bash
npm run e2e
```

This runs all `.yaml` flows inside the `.maestro/` directory.

## Running Individual Test Flows

// turbo

```bash
npm run e2e:home          # Home screen tests
npm run e2e:explore       # Explore screen tests
npm run e2e:navigation    # Tab navigation tests
npm run e2e:modal         # Modal navigation tests
```

## Running with Maestro Studio (Interactive Mode)

To visually inspect and debug flows:

```bash
maestro studio
```

## Test Flow Files

All Maestro flow files are located in the `.maestro/` directory:

| Flow File                    | Description                                                |
| ---------------------------- | ---------------------------------------------------------- |
| `home_screen_test.yaml`      | Verifies Home screen loads with Welcome text and all steps |
| `explore_screen_test.yaml`   | Tests Explore tab and all collapsible sections             |
| `tab_navigation_test.yaml`   | Tests switching between Home and Explore tabs              |
| `modal_navigation_test.yaml` | Tests opening/closing the modal screen                     |

## Debugging Tips

- Use `maestro studio` for interactive flow building and debugging
- Screenshots from test runs are saved in the output directory
- Use `maestro test --debug-output <dir> <flow>` for detailed logs
- Use `maestro hierarchy` to inspect the current view hierarchy on the device
