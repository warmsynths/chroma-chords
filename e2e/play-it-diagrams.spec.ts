import { test, expect } from '@playwright/test';

test.describe('Play It View Chord Diagrams E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Desktop: Comprehensive verification of Piano and Guitar/Ukulele diagrams', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop specific test');

    // 1. Switch to 'Play it' view
    const playTab = page.locator('.view-tabs-bar button.view-tab', { hasText: 'Play it' });
    await playTab.click();

    // 2. Verify container is visible
    await expect(page.locator('.play-it-wrap')).toBeVisible();

    // 3. Verify Piano cards: exactly 4 cards in desktop piano grid
    const pianoCards = page.locator('.play-it-wrap .play-card');
    await expect(pianoCards).toHaveCount(8); // 4 piano + 4 fretted

    // 4. Verify first card has chord title and SVG keyboard
    const firstPianoCard = pianoCards.nth(0);
    await expect(firstPianoCard).toBeVisible();
    const firstPianoSvg = firstPianoCard.locator('svg');
    await expect(firstPianoSvg).toBeVisible();

    // Verify SVG contains white keys (14) and black keys (10) as actual SVG rect elements
    const whiteKeys = firstPianoSvg.locator('rect[fill="#FFFDF8"]');
    await expect(whiteKeys).toHaveCount(14);
    const blackKeys = firstPianoSvg.locator('rect[fill="#3A3128"]');
    await expect(blackKeys).toHaveCount(10);

    // 5. Verify root marker circle is rendered with red coral fill (#F2735F)
    const rootMarker = firstPianoSvg.locator('circle[fill="#F2735F"]');
    await expect(rootMarker).toBeAttached();

    // 6. Test Scale degrees toggle
    const scaleDegreesToggle = page.locator('.play-it-wrap').getByText('Scale degrees');
    await scaleDegreesToggle.click();

    // Check that degree text is now rendered in SVG
    const degreeTexts = firstPianoSvg.locator('text');
    await expect(degreeTexts.first()).toBeAttached();
    await expect(degreeTexts.first()).toHaveText('1');

    // 7. Verify Guitar fretted instruments section
    const guitarSection = pianoCards.nth(4);
    await expect(guitarSection).toBeVisible();
    const guitarSvg = guitarSection.locator('svg');
    await expect(guitarSvg).toBeVisible();
    await expect(guitarSvg.locator('rect')).toHaveCount(11); // 5 fret lines + 6 strings

    // 8. Switch to Ukulele tab
    const ukeBtn = page.locator('.play-it-wrap button', { hasText: 'Ukulele' });
    await ukeBtn.click();
    await expect(ukeBtn).toHaveCSS('font-weight', '800');

    // 9. Click on chord card to trigger audio preview
    await firstPianoCard.click();
    await guitarSection.click();
  });

  test('Mobile: Comprehensive verification of Instrument switcher and stacked diagrams', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile specific test');

    // 1. Switch to 'Play it' tab
    const playTab = page.locator('.view-tabs-bar button.view-tab', { hasText: 'Play it' });
    await playTab.click();

    // 2. Instrument pills should be present (Piano, Guitar, Ukulele)
    const pianoPill = page.locator('button.pill', { hasText: 'Piano' });
    const guitarPill = page.locator('button.pill', { hasText: 'Guitar' });
    const ukePill = page.locator('button.pill', { hasText: 'Ukulele' });

    await expect(pianoPill).toBeVisible();
    await expect(guitarPill).toBeVisible();
    await expect(ukePill).toBeVisible();

    // 3. Piano cards displayed (4 cards)
    const cards = page.locator('.play-card');
    await expect(cards).toHaveCount(4);
    await expect(cards.first().locator('svg')).toBeVisible();

    // 4. Toggle Scale degrees on mobile
    const scaleToggle = page.getByText('Scale degrees');
    await scaleToggle.click();
    const degreeText = cards.first().locator('svg text');
    await expect(degreeText.first()).toBeAttached();

    // 5. Switch to Guitar
    await guitarPill.click();
    await expect(cards).toHaveCount(4);
    const fretSvg = cards.first().locator('svg');
    await expect(fretSvg).toBeVisible();

    // 6. Switch to Ukulele
    await ukePill.click();
    await expect(cards).toHaveCount(4);
    await expect(cards.first().locator('svg')).toBeVisible();

    // 7. Click a chord card to verify interactive playback
    await cards.first().click();
  });
});
