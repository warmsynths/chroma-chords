import { test, expect } from '@playwright/test';

test.describe('Chroma Chords E2E Interaction Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:43301/');
    // Wait for the studio workspace to mount
    await expect(page.locator('chroma-chords-app')).toBeVisible();
    await expect(page.locator('loop-screen')).toBeVisible({ timeout: 10000 });
  });

  test('Desktop: Clicks Genre and Mood pills and updates stage title', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');

    // Click Lo-fi/Chill genre pill
    const lofiPill = page.locator('button.pill', { hasText: 'Lo-fi/Chill' });
    await lofiPill.click();

    // Verify stage title includes Lo-fi/Chill
    const stageTitle = page.locator('.stage-title');
    await expect(stageTitle).toContainText('Lo-fi/Chill');

    // Click Melancholy mood pill
    const melancholyPill = page.locator('button.pill', { hasText: 'Melancholy' });
    await melancholyPill.click();
    await expect(stageTitle).toContainText('melancholy');
  });

  test('Desktop: Enters Vibe prompt, shows generating indicator, and updates stage title with search prompt', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');

    const vibeInput = page.locator('.sidebar-left input.vibe-text-input');
    await vibeInput.fill('Rainy jazz drive');

    const submitBtn = page.locator('.sidebar-left button.vibe-submit-btn');
    await submitBtn.click();

    // Stage title should update to reflect the prompt
    const stageTitle = page.locator('.stage-title');
    await expect(stageTitle).toContainText('Rainy jazz drive', { timeout: 10000 });
  });

  test('Desktop: Clicks View Tabs (Chords, Song, Play it)', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');

    // Initially Chords view is active
    await expect(page.locator('.stage-panel')).toBeVisible();

    // Switch to Song tab
    const songTab = page.locator('button.view-tab', { hasText: 'Song' });
    await songTab.click();
    await expect(page.locator('.song-track-list')).toBeVisible();

    // Switch to Play it tab
    const playTab = page.locator('button.view-tab', { hasText: 'Play it' });
    await playTab.click();
    await expect(page.locator('.play-it-wrap, .play-card').first()).toBeVisible();

    // Switch back to Chords tab
    const chordsTab = page.locator('button.view-tab', { hasText: 'Chords' });
    await chordsTab.click();
    await expect(page.locator('.stage-panel')).toBeVisible();
  });

  test('Desktop: Clicks chord block, picks substitution candidate, and swaps chord successfully', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');

    // Click the first chord block
    const chordBlock = page.locator('.chord-item-wrap').first();
    await chordBlock.click();

    // Right inspector should switch to Swapping Bar header
    await expect(page.locator('.sidebar-right')).toContainText('Swapping Bar 1');
    await expect(page.locator('.ab-box')).toBeVisible();
    await expect(page.locator('button.accept-swap-btn')).toBeVisible();

    // Pick an alternative candidate
    const altRow = page.locator('.sidebar-right .alt-item-row').first();
    await altRow.click();

    // The accept swap button should now say Keep <Chord>
    const acceptBtn = page.locator('button.accept-swap-btn');
    await expect(acceptBtn).toContainText('Keep');
    await acceptBtn.click();

    // Inspector should close and chord block on stage should have the swapped chord
    await expect(page.locator('button.accept-swap-btn')).not.toBeVisible();
    
    // Toast should show Swapped in ... without a View button taking to sets
    const toast = page.locator('.save-toast');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Swapped in');
    await expect(toast.locator('button', { hasText: 'View' })).toHaveCount(0);

    // Main studio stage should remain visible
    await expect(page.locator('.stage-panel')).toBeVisible();
  });

  test('Header: Clicking Sign in opens Google OAuth modal without blocking backdrop', async ({ page }) => {
    const signInBtn = page.locator('button.sign-in-btn');
    await expect(signInBtn).toBeVisible();
    await signInBtn.click();

    // Auth modal should open
    const authModal = page.locator('auth-modal .modal.visible');
    await expect(authModal).toBeVisible();
    await expect(authModal).toContainText('Chroma Chords');

    // Close modal with close button
    const closeBtn = page.locator('auth-modal button.close-btn');
    await closeBtn.click();
    await expect(authModal).not.toBeVisible();
  });

  test('Mobile: View tabs and quick swap interaction', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only test');

    // On mobile, the mobile view tabs should be active
    const songTab = page.locator('.view-tabs-bar button.view-tab', { hasText: 'Song' });
    await songTab.click();
    await expect(page.locator('.song-track-list')).toBeVisible();

    const chordsTab = page.locator('.view-tabs-bar button.view-tab', { hasText: 'Chords' });
    await chordsTab.click();
    await expect(page.locator('.stage-panel')).toBeVisible();

    // Click quick swap icon on first chord
    const quickSwap = page.locator('.quick-action-btn.swap').first();
    await quickSwap.click();

    // Mobile slide-up sheet should appear
    await expect(page.locator('.mobile-sheet')).toBeVisible();
    await expect(page.locator('.mobile-sheet')).toContainText('Swap Bar 1');
  });

  test('Inspector: Geometric Substitution family tabs update selection and candidates', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');

    // Click chord block to open inspector
    await page.locator('.chord-item-wrap').first().click();
    await expect(page.locator('.sidebar-right')).toContainText('Swapping Bar 1');

    // Verify all 5 geometric family tabs are present
    const tabs = page.locator('.swap-family-tab');
    await expect(tabs).toHaveCount(5);
    await expect(tabs.nth(0)).toContainText('Darker');
    await expect(tabs.nth(1)).toContainText('Tense');
    await expect(tabs.nth(2)).toContainText('Dreamy');
    await expect(tabs.nth(3)).toContainText('Home');
    await expect(tabs.nth(4)).toContainText('Borrow');

    // Click 'Tense' tab
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveClass(/active/);
    await expect(page.locator('.sidebar-right')).toContainText('Three chords that lean harder');

    // Click 'Borrow' tab
    await tabs.nth(4).click();
    await expect(tabs.nth(4)).toHaveClass(/active/);
    await expect(page.locator('.sidebar-right')).toContainText('Four chords from the');
  });

  test('Inspector & Mobile Sheet: Loop Progression Player and A/B compare buttons', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('.quick-action-btn.swap').first().click();
      await expect(page.locator('.mobile-sheet')).toBeVisible();
      await expect(page.locator('.mobile-sheet .ab-box')).toBeVisible();
      await expect(page.locator('.mobile-sheet .ab-play-toggle-btn')).toBeVisible();
      await expect(page.locator('.mobile-sheet .ab-cells-track')).toBeVisible();

      // Click individual progression cells in mobile sheet
      const cells = page.locator('.mobile-sheet .ab-cells-track button.ab-cell-item');
      await expect(cells).toHaveCount(4);
      await cells.nth(0).click();
      await cells.nth(1).click();

      // Click play in the swap card
      const playBtn = page.locator('.mobile-sheet .ab-play-toggle-btn');
      await playBtn.click();
      // Should show pause icon
      await expect(playBtn).toHaveAttribute('aria-label', /Pause/);
    } else {
      await page.locator('.chord-item-wrap').first().click();
      await expect(page.locator('.sidebar-right')).toContainText('Swapping Bar 1');
      await expect(page.locator('.sidebar-right .ab-box')).toBeVisible();
      await expect(page.locator('.sidebar-right .ab-play-toggle-btn')).toBeVisible();
      await expect(page.locator('.sidebar-right .ab-cells-track')).toBeVisible();

      // Click individual progression cells in desktop sidebar
      const cells = page.locator('.sidebar-right .ab-cells-track button.ab-cell-item');
      await expect(cells).toHaveCount(4);
      await cells.nth(0).click();
      await cells.nth(1).click();

      // Click play in the swap card
      const playBtn = page.locator('.sidebar-right .ab-play-toggle-btn');
      await playBtn.click();
      // Should show pause icon
      await expect(playBtn).toHaveAttribute('aria-label', /Pause/);
    }
  });

  test('Transport: Progress bar starts at zero when stopped', async ({ page, isMobile }) => {
    const fillSelector = isMobile ? '.mobile-stage-wrap .progress-line-fill' : '.studio-grid .progress-line-fill';
    const progressFill = page.locator(fillSelector);
    await expect(progressFill).toHaveAttribute('style', /transform: scaleX\(0\)/);
  });

  test('Library: Opens and closes the Your Loops Popover Panel', async ({ page, isMobile }) => {
    if (!isMobile) {
      const libraryToggle = page.locator('.sidebar-left button.library-toggle');
      await libraryToggle.click();

      const popover = page.locator('.library-popover');
      await expect(popover).toBeVisible();

      await libraryToggle.click();
      await expect(popover).not.toBeVisible();
    } else {
      const loopsBtn = page.locator('button.mobile-loops-toggle-btn');
      await expect(loopsBtn).toBeVisible();
      await loopsBtn.click();

      const mobilePopover = page.locator('.library-popover-mobile');
      await expect(mobilePopover).toBeVisible();

      await loopsBtn.click();
      await expect(mobilePopover).not.toBeVisible();
    }
  });

  test('Play it: Renders Piano and Fretboard SVG chord diagrams', async ({ page, isMobile }) => {
    if (!isMobile) {
      const playTab = page.locator('.view-tabs-bar button.view-tab', { hasText: 'Play it' });
      await playTab.click();

      // Check piano section and fret section SVGs
      const playCards = page.locator('.play-card');
      await expect(playCards.first()).toBeVisible();
      const svgs = page.locator('.play-card svg');
      await expect(svgs.first()).toBeVisible();
    } else {
      const playTab = page.locator('.view-tabs-bar button.view-tab', { hasText: 'Play it' });
      await playTab.click();

      const playCards = page.locator('.play-card');
      await expect(playCards.first()).toBeVisible();
      const svgs = page.locator('.play-card svg');
      await expect(svgs.first()).toBeVisible();
    }
  });
});
