# E2E Tests for Dan's Blog

This directory contains end-to-end tests using Playwright to verify the functionality of the blog's navigation menu and other interactive features.

## Running Tests

### Run all tests
```bash
bun run test:e2e
```

### Run tests with UI mode (interactive)
```bash
bun run test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
bun run test:e2e:headed
```

### Debug tests
```bash
bun run test:e2e:debug
```

### Run specific test file
```bash
bun run test:e2e tests/e2e/nav-menu.spec.ts
```

### Run tests in a specific browser
```bash
bun run test:e2e --project=chromium
bun run test:e2e --project=firefox
bun run test:e2e --project=webkit
```

## Test Coverage

### Navigation Menu Tests (`nav-menu.spec.ts`)

Tests verify that all navigation menu elements are clickable and functional, including a specific test for the top ~100px of the menu which was previously blocked by z-index issues:

#### Articles Menu
- ✅ Menu opens on click
- ✅ Quizzes link is clickable and navigates correctly
- ✅ Category links are clickable and navigate correctly
- ✅ Popular post links are clickable and navigate correctly
- ✅ Recent post links are clickable and navigate correctly

#### Projects Menu
- ✅ Menu opens on click
- ✅ Internal project links (Open Source Journal) are clickable
- ✅ External project links (DataAnalyzer.app, etc.) are clickable
- ✅ GitHub project links are clickable

#### About Menu
- ✅ Menu opens on click
- ✅ Contact form link is clickable
- ✅ Social media links (Twitter, GitHub, LinkedIn) are clickable
- ✅ OSS Log link is clickable
- ✅ Resume PDF link is clickable

#### Menu Interactions
- ✅ Menu stays open when clicking inside (as designed)
- ✅ Can switch between different menus

#### Accessibility & Clickability
- ✅ Proper ARIA attributes for accessibility
- ✅ Keyboard navigation works (Tab, Enter)
- ✅ Top portion of menu is clickable (z-index fix verified)

## Troubleshooting

### Tests fail with "Target closed" error
This usually means the dev server isn't running or took too long to start. The tests automatically start the dev server, but you can also run it manually:
```bash
bun run dev
```

### Tests are flaky
Try increasing the timeout in specific tests or running with retries:
```bash
bun run test:e2e --retries=2
```

### Need to update snapshots
If you've made intentional UI changes:
```bash
bun run test:e2e --update-snapshots
```

## Writing New Tests

When adding new tests:
1. Create a new `.spec.ts` file in `tests/e2e/`
2. Follow the existing test structure
3. Use descriptive test names
4. Group related tests with `test.describe()`
5. Use `test.beforeEach()` for common setup
6. Add appropriate waits for dynamic content

Example:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Your test code here
  });
});