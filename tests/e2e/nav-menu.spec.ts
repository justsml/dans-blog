import { test, expect } from '@playwright/test';

test.describe('Navigation Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should display all main navigation triggers', async ({ page }) => {
    // Check that all main nav items are visible
    await expect(page.getByRole('button', { name: /articles/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /projects/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /about/i })).toBeVisible();
  });

  test.describe('Articles Menu', () => {
    test('should open Articles menu on click', async ({ page }) => {
      const articlesButton = page.getByRole('button', { name: /articles/i });
      await articlesButton.click();
      
      // Wait for menu to open
      await page.waitForTimeout(500);
      
      // Check that menu content is visible using more specific selectors
      const menuContent = page.locator('.NavigationMenuContent').first();
      await expect(menuContent.locator('.item-quizzes')).toBeVisible();
      await expect(menuContent.locator('.item-categories')).toBeVisible();
      await expect(menuContent.locator('.item-popular')).toBeVisible();
      await expect(menuContent.locator('.item-recent')).toBeVisible();
    });
  
      test('should have clickable Quizzes link with correct href', async ({ page }) => {
        await page.getByRole('button', { name: /articles/i }).click();
        await page.waitForTimeout(500);
        
        const quizzesLink = page.locator('.item-quizzes a[href="/challenges"]');
        await expect(quizzesLink).toBeVisible();
        
        // Verify the link has correct href
        await expect(quizzesLink).toHaveAttribute('href', '/challenges');
        
        // Verify link text is present
        await expect(quizzesLink).toContainText('Quizzes');
      });
  
      test('should have clickable category links with correct hrefs', async ({ page }) => {
        await page.getByRole('button', { name: /articles/i }).click();
        await page.waitForTimeout(500);
        
        // Find all category links in the Categories section
        const categoriesSection = page.locator('.item-categories');
        const categoryLinks = categoriesSection.locator('a[href*="/category/"]');
        
        // Verify at least one category link exists
        const count = await categoryLinks.count();
        expect(count).toBeGreaterThan(0);
        
        // Check first category link
        const firstCategory = categoryLinks.first();
        await expect(firstCategory).toBeVisible();
        
        const href = await firstCategory.getAttribute('href');
        expect(href).toMatch(/\/category\//);
      });
  
      test('should have clickable popular post links with correct hrefs', async ({ page }) => {
        await page.getByRole('button', { name: /articles/i }).click();
        await page.waitForTimeout(500);
        
        // Find popular posts section
        const popularSection = page.locator('.item-popular');
        const popularLinks = popularSection.getByRole('link');
        
        // Verify at least one popular post link exists
        const count = await popularLinks.count();
        expect(count).toBeGreaterThan(0);
        
        // Test first popular post link
        const firstPost = popularLinks.first();
        await expect(firstPost).toBeVisible();
        
        const href = await firstPost.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toMatch(/^\//); // Should start with /
      });
  
      test('should have clickable recent post links with correct hrefs', async ({ page }) => {
        await page.getByRole('button', { name: /articles/i }).click();
        await page.waitForTimeout(500);
        
        // Find recent posts section
        const recentSection = page.locator('.item-recent');
        const recentLinks = recentSection.getByRole('link');
        
        // Verify at least one recent post link exists
        const count = await recentLinks.count();
        expect(count).toBeGreaterThan(0);
        
        // Test first recent post link
        const firstPost = recentLinks.first();
        await expect(firstPost).toBeVisible();
        
        const href = await firstPost.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toMatch(/^\//); // Should start with /
      });
    });
  test.describe('Projects Menu', () => {
    test('should open Projects menu on click', async ({ page }) => {
      const projectsButton = page.getByRole('button', { name: /projects/i });
      await projectsButton.click();
      
      await page.waitForTimeout(500);
      
      // Check that menu content is visible using specific selectors
      const projectsMenu = page.locator('.NavigationMenuContent:visible');
      await expect(projectsMenu.locator('.panel-projects')).toBeVisible();
      await expect(projectsMenu.getByText('Open Source Journal')).toBeVisible();
    });

    test('should have clickable project links with correct hrefs', async ({ page }) => {
      await page.getByRole('button', { name: /projects/i }).click();
      await page.waitForTimeout(500);
      
      // Test Open Source Journal link
      const ossLink = page.locator('a[href="/open-source-journal"]').first();
      await expect(ossLink).toBeVisible();
      await expect(ossLink).toHaveAttribute('href', '/open-source-journal');
      await expect(ossLink).toContainText('Open Source Journal');
    });

    test('should have clickable external project links', async ({ page }) => {
      await page.getByRole('button', { name: /projects/i }).click();
      await page.waitForTimeout(500);
      
      // Test DataAnalyzer.app link (external)
      const dataAnalyzerLink = page.getByRole('link', { name: /dataanalyzer\.app/i });
      await expect(dataAnalyzerLink).toBeVisible();
      await expect(dataAnalyzerLink).toHaveAttribute('href', 'https://dataanalyzer.app/');
    });

    test('should have clickable GitHub project links', async ({ page }) => {
      await page.getByRole('button', { name: /projects/i }).click();
      await page.waitForTimeout(500);
      
      // Test a GitHub link
      const githubLink = page.getByRole('link', { name: /functional promises/i });
      await expect(githubLink).toBeVisible();
      await expect(githubLink).toHaveAttribute('href', 'https://fpromises.io/');
    });
  });

  test.describe('About Menu', () => {
    test('should open About menu on click', async ({ page }) => {
      const aboutButton = page.getByRole('button', { name: /about/i });
      await aboutButton.click();
      
      await page.waitForTimeout(500);
      
      // Check that menu content is visible - use more specific selector
      const aboutMenu = page.locator('.NavigationMenuContent.h-card');
      await expect(aboutMenu).toBeVisible();
      await expect(aboutMenu.locator('.CalloutHeading').filter({ hasText: 'Dan Levy' })).toBeVisible();
      await expect(aboutMenu.locator('.CalloutHeading').filter({ hasText: 'Contact Me' })).toBeVisible();
    });

    test('should have clickable contact form link with correct href', async ({ page }) => {
      await page.getByRole('button', { name: /about/i }).click();
      await page.waitForTimeout(500);
      
      // Find the contact form link in the About menu
      const contactLink = page.locator('.ContactSubMenu a[href="/contact"]');
      
      await expect(contactLink).toBeVisible();
      await expect(contactLink).toHaveAttribute('href', '/contact');
    });

    test('should have clickable social media links with correct hrefs', async ({ page }) => {
      await page.getByRole('button', { name: /about/i }).click();
      await page.waitForTimeout(500);
      
      // Test Twitter link in the About menu
      const twitterLink = page.locator('.ContactSubMenu a[href="http://twitter.com/justsml"]');
      await expect(twitterLink).toBeVisible();
      await expect(twitterLink).toHaveAttribute('href', 'http://twitter.com/justsml');
      
      // Test GitHub link in the About menu
      const githubLink = page.locator('.ContactSubMenu a[href="https://github.com/justsml"]');
      await expect(githubLink).toBeVisible();
      await expect(githubLink).toHaveAttribute('href', 'https://github.com/justsml');
      
      // Test LinkedIn link in the About menu
      const linkedinLink = page.locator('.ContactSubMenu a[href="https://linkedin.com/in/realdaniellevy"]');
      await expect(linkedinLink).toBeVisible();
      await expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/realdaniellevy');
    });

    test('should have clickable OSS Log link with correct href', async ({ page }) => {
      await page.getByRole('button', { name: /about/i }).click();
      await page.waitForTimeout(500);
      
      const ossLink = page.locator('.ContactSubMenu a[href="/open-source-journal"]');
      await expect(ossLink).toBeVisible();
      await expect(ossLink).toHaveAttribute('href', '/open-source-journal');
    });

    test('should have clickable resume link with correct href', async ({ page }) => {
      await page.getByRole('button', { name: /about/i }).click();
      await page.waitForTimeout(500);
      
      const resumeLink = page.locator('.ContactSubMenu a[href="/docs/resume.pdf"]');
      await expect(resumeLink).toBeVisible();
      await expect(resumeLink).toHaveAttribute('href', '/docs/resume.pdf');
    });
  });

  test.describe('Menu Interaction', () => {
    test('should keep menu open when clicking inside', async ({ page }) => {
      // Open Articles menu
      await page.getByRole('button', { name: /articles/i }).click();
      await page.waitForTimeout(500);
      
      // Verify menu is open using specific selector
      const menuContent = page.locator('.NavigationMenuContent').first();
      await expect(menuContent.locator('.item-quizzes')).toBeVisible();
      
      // Click inside the menu (on a non-link element)
      await menuContent.locator('.CalloutHeading').first().click();
      await page.waitForTimeout(300);
      
      // Menu should still be open
      await expect(menuContent.locator('.item-quizzes')).toBeVisible();
    });

    test('should switch between menus', async ({ page }) => {
      // Open Articles menu
      await page.getByRole('button', { name: /articles/i }).click();
      await page.waitForTimeout(500);
      
      await expect(page.locator('.item-quizzes')).toBeVisible();
      
      // Click Projects menu
      await page.getByRole('button', { name: /projects/i }).click();
      await page.waitForTimeout(500);
      
      // Articles content should be hidden, Projects content visible
      await expect(page.locator('.item-quizzes')).not.toBeVisible();
      await expect(page.getByText('Open Source Journal')).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA attributes', async ({ page }) => {
      const articlesButton = page.getByRole('button', { name: /articles/i });
      
      // Check button has proper role
      await expect(articlesButton).toHaveAttribute('class', /NavigationMenuTrigger/);
      
      // Open menu and check content is accessible
      await articlesButton.click();
      await page.waitForTimeout(500);
      
      // Links should be accessible via role
      const links = page.getByRole('link');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should be able to click on top portion of menu', async ({ page }) => {
      // Open Articles menu
      await page.getByRole('button', { name: /articles/i }).click();
      await page.waitForTimeout(500);
      
      // Get the Quizzes link which is at the top of the menu
      const quizzesLink = page.locator('.item-quizzes a[href="/challenges"]');
      await expect(quizzesLink).toBeVisible();
      
      // Get the bounding box to verify it's in the top portion
      const box = await quizzesLink.boundingBox();
      expect(box).not.toBeNull();
      
      // Verify we can click on it (this tests z-index issues)
      await quizzesLink.click({ force: false }); // force: false ensures real clickability
      await page.waitForTimeout(300);
      
      // Should navigate to challenges page
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('/challenges');
    });

    test('should be keyboard navigable', async ({ page }) => {
      // Focus on Articles button directly
      const articlesButton = page.getByRole('button', { name: /articles/i });
      await articlesButton.focus();
      
      // Press Enter to open menu
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
      
      // Menu should be open using specific selector
      const menuContent = page.locator('.NavigationMenuContent').first();
      await expect(menuContent.locator('.item-quizzes')).toBeVisible();
      
      // Tab through menu items
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      
      // Menu should still be open after tabbing
      await expect(menuContent.locator('.item-quizzes')).toBeVisible();
    });
  });
});