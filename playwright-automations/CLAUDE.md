# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server at http://localhost:5173
npm run build        # Type-check and build for production
npm run lint         # Run ESLint
npm run test         # Run all Playwright tests (auto-starts dev server)
npm run test:ui      # Open Playwright interactive UI
npm run test:report  # View last HTML test report
```

To run a single test file:
```bash
npx playwright test tests/my-test.spec.ts
```

To run tests matching a title pattern:
```bash
npx playwright test -g "test name pattern"
```

## Architecture

This is a **React 19 + TypeScript + Vite** course platform app used as a target for Playwright end-to-end tests.

**App structure:**
- `src/data/courses.ts` — static course data (the single source of truth for all course content)
- `src/pages/` — three route pages: `HomePage`, `CourseDetailPage`, `PaymentPage`
- `src/components/` — shared UI: `Navbar`, `CourseCard`
- Routes: `/` → home, `/course/:id` → detail, `/payment/:id` → payment

**Testing setup:**
- Tests live in `tests/` and are written with `@playwright/test`
- Playwright config (`playwright.config.ts`) targets Chromium only, uses `baseURL: http://localhost:5173`, and automatically starts the dev server via `webServer`
- Traces are captured on first retry; screenshots on failure
- Test results/reports output to `playwright-report/` and `test-results/`
