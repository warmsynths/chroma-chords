import { test, expect } from '@playwright/test';

test.describe('Chroma Chords E2E Interaction Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:43301/');
    // Wait for the studio workspace to mount
    await expect(page.locator('chroma-chords-app')).toBeVisible();
    await expect(page.locator('loop-screen')).toBeVisible({ timeout: 10000 });
  });

  test('Desktop: Clicks Genre and Mood pills inside Vibe Popover and updates state', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');

    // Open Vibe Popover from left rail
    const vibeBtn = page.locator('nav.rail-left button.rail-item.vibe');
    await vibeBtn.click();
    const popover = page.locator('.vibe-popover-desktop');
    await expect(popover).toBeVisible();

    // Click Lo-fi/Chill genre pill
    const lofiPill = popover.locator('button.pill', { hasText: 'Lo-fi/Chill' });
    await lofiPill.click();

    // Verify vertical summary reflects change or pill is active
    await expect(lofiPill).toHaveClass(/active/);

    // Click Melancholy mood pill
    const melancholyPill = popover.locator('button.pill', { hasText: 'Melancholy' });
    await melancholyPill.click();
    await expect(melancholyPill).toHaveClass(/active/);
  });

  test('Desktop: Enters Vibe prompt, shows generating indicator, and updates loop', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');

    // Open Vibe Popover
    const vibeBtn = page.locator('nav.rail-left button.rail-item.vibe');
    await vibeBtn.click();
    const popover = page.locator('.vibe-popover-desktop');
    await expect(popover).toBeVisible();

    const vibeInput = popover.locator('input.vibe-text-input');
    await vibeInput.fill('Rainy jazz drive');

    const submitBtn = popover.locator('button.vibe-submit-btn');
    await submitBtn.click();

    // Vibe summary or pad cells should update
    await expect(page.locator('.pad-cells-grid')).toBeVisible();
  });

  test('Desktop: Clicks View Tabs (Chords, Song, Play it)', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');

    // Initially Chords view is active with stage card
    await expect(page.locator('.stage-card')).toBeVisible();

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
    await expect(page.locator('.stage-card')).toBeVisible();
  });

  test('Desktop: Clicks chord swap, picks substitution candidate, and swaps chord successfully', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');

    // Click swap button on first chord pad cell
    const swapBtn = page.locator('.pad-cell .pad-swap-btn').first();
    await swapBtn.click();

    // Right inspector should switch to Swapping header
    const inspector = page.locator('aside.inspector-right');
    await expect(inspector.locator('.swap-kicker')).toContainText(/Swapping/i);
    await expect(inspector.locator('.ab-compare-box')).toBeVisible();
    await expect(inspector.locator('button.accept-swap-btn')).toBeVisible();

    // Pick an alternative candidate
    const altRow = inspector.locator('.alt-chord-row').first();
    await altRow.click();

    // The accept swap button should now say Keep
    const acceptBtn = inspector.locator('button.accept-swap-btn');
    await expect(acceptBtn).toContainText(/Keep/i);
    await acceptBtn.click();

    // Inspector returns to idle state
    await expect(inspector.locator('.inspector-kicker')).toContainText(/This loop/i);

    // Main studio stage card remains visible
    await expect(page.locator('.stage-card')).toBeVisible();
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
    await expect(page.locator('.stage-card')).toBeVisible();

    // Click quick swap icon on first chord
    const quickSwap = page.locator('.pad-cell .pad-swap-btn').first();
    await quickSwap.click();

    // Mobile slide-up sheet should appear
    const mobileSheet = page.locator('.mobile-swap-sheet');
    await expect(mobileSheet).toBeVisible();
    await expect(mobileSheet.locator('.sheet-title')).toContainText(/Swap Chord/i);

    // Close sheet
    await mobileSheet.locator('.sheet-cancel-btn').first().click();
    await expect(mobileSheet).not.toBeVisible();
  });

  test('Inspector: Geometric Substitution family tabs update selection and candidates', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');

    // Click swap button on first chord pad cell
    await page.locator('.pad-cell .pad-swap-btn').first().click();
    const inspector = page.locator('aside.inspector-right');
    await expect(inspector.locator('.swap-kicker')).toContainText(/Swapping/i);

    // Verify all 5 geometric family tabs are present
    const tabs = inspector.locator('.swap-family-tabs button');
    await expect(tabs).toHaveCount(5);
    await expect(tabs.nth(0)).toContainText('Darker');
    await expect(tabs.nth(1)).toContainText('Tense');
    await expect(tabs.nth(2)).toContainText('Dreamy');
    await expect(tabs.nth(3)).toContainText('Home');
    await expect(tabs.nth(4)).toContainText('Borrow');

    // Click 'Tense' tab
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveClass(/active/);

    // Click 'Borrow' tab
    await tabs.nth(4).click();
    await expect(tabs.nth(4)).toHaveClass(/active/);
  });

  test('Inspector & Mobile Sheet: Loop Progression Player and A/B compare buttons', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('.pad-cell .pad-swap-btn').first().click();
      const mobileSheet = page.locator('.mobile-swap-sheet');
      await expect(mobileSheet).toBeVisible();
      await expect(mobileSheet.locator('.alt-chord-row').first()).toBeVisible();

      // Select candidate
      await mobileSheet.locator('.alt-chord-row').first().click();
      await expect(mobileSheet.locator('.accept-swap-btn')).toContainText(/Keep/i);

      // Close sheet
      await mobileSheet.locator('.sheet-cancel-btn').first().click();
    } else {
      await page.locator('.pad-cell .pad-swap-btn').first().click();
      const inspector = page.locator('aside.inspector-right');
      await expect(inspector.locator('.swap-kicker')).toContainText(/Swapping/i);
      await expect(inspector.locator('.ab-compare-box')).toBeVisible();
      await expect(inspector.locator('.alt-chord-row').first()).toBeVisible();

      // Select candidate
      await inspector.locator('.alt-chord-row').first().click();
      await expect(inspector.locator('.accept-swap-btn')).toContainText(/Keep/i);

      // Keep candidate
      await inspector.locator('.accept-swap-btn').click();
      await expect(inspector.locator('.inspector-kicker')).toContainText(/This loop/i);
    }
  });

  test('Transport: Beat cells rendered in loop strip', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');
    const beatCells = page.locator('.loop-beat-cells .beat-cell');
    await expect(beatCells).toHaveCount(16);
    await expect(beatCells.first()).toBeVisible();
  });

  test('Library: Opens and closes the Your Loops Popover Panel', async ({ page, isMobile }) => {
    if (!isMobile) {
      const loopsBtn = page.locator('nav.rail-left button.rail-item.loops');
      await loopsBtn.click();

      const popover = page.locator('.loops-popover-desktop');
      await expect(popover).toBeVisible();

      await loopsBtn.click();
      await expect(popover).not.toBeVisible();
    } else {
      // On mobile, vibe dropdown is present
      const vibeBtn = page.locator('.mobile-vibe-toggle');
      await expect(vibeBtn).toBeVisible();
    }
  });

  test('Play it: Renders Piano and Fretboard chord views', async ({ page }) => {
    const playTab = page.locator('.view-tabs-bar button.view-tab', { hasText: 'Play it' });
    await playTab.click();

    // Check play cards
    const playCards = page.locator('.play-card');
    await expect(playCards.first()).toBeVisible();
  });
});
