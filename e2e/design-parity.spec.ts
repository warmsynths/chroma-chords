import { test, expect } from '@playwright/test';

test.describe('Design Parity Tests: Chroma Chords App against Design Mockup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:43301/');
    await expect(page.locator('chroma-chords-app')).toBeVisible();
    await expect(page.locator('loop-screen')).toBeVisible({ timeout: 10000 });
  });

  test('Desktop: 62px narrow rail with Vibe and Loops buttons, and vertical summary', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop layout test');

    const rail = page.locator('.rail-left');
    await expect(rail).toBeVisible();
    const box = await rail.boundingBox();
    expect(box?.width).toBeCloseTo(62, 2);

    // Vibe button and Loops button
    const vibeBtn = rail.locator('.vibe-rail-btn');
    await expect(vibeBtn).toBeVisible();
    const loopsBtn = rail.locator('.loops-rail-btn');
    await expect(loopsBtn).toBeVisible();

    // Vertical vibe summary text
    const vibeSummary = rail.locator('.vibe-summary-vertical');
    await expect(vibeSummary).toBeVisible();
  });

  test('Desktop: Clicking Vibe rail button toggles floating popover (width ~322px)', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop layout test');

    const vibeBtn = page.locator('.rail-left .vibe-rail-btn');
    const vibePopover = page.locator('.vibe-popover-desktop');

    // Initially closed or can be opened
    await expect(vibePopover).not.toBeVisible();
    await vibeBtn.click();
    await expect(vibePopover).toBeVisible();

    const box = await vibePopover.boundingBox();
    expect(box?.width).toBeCloseTo(322, 5);

    // Verify genre and mood pills inside popover
    await expect(vibePopover.locator('button.pill', { hasText: 'Lo-fi/Chill' })).toBeVisible();
    await expect(vibePopover.locator('button.pill', { hasText: 'Melancholy' })).toBeVisible();

    // Clicking close button dismisses popover
    const closeBtn = vibePopover.locator('button.close-popover-btn');
    await closeBtn.click();
    await expect(vibePopover).not.toBeVisible();
  });

  test('Desktop: Center stage contains View Tabs, Surface Card with Loop Strip, and Pad Cells Grid', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop layout test');

    // View tabs: Chords, Song, Play it in rounded pill container
    const viewTabs = page.locator('.view-tabs-bar button.view-tab');
    await expect(viewTabs).toHaveCount(3);
    await expect(viewTabs.nth(0)).toContainText('Chords');
    await expect(viewTabs.nth(1)).toContainText('Song');
    await expect(viewTabs.nth(2)).toContainText('Play it');

    // Surface card
    const stageCard = page.locator('.stage-card');
    await expect(stageCard).toBeVisible();

    // Loop Play Strip at top of card
    const loopPlayBtn = stageCard.locator('.loop-play-btn');
    await expect(loopPlayBtn).toBeVisible();
    await expect(loopPlayBtn).toContainText(/Play loop|Stop/);

    const stripCells = stageCard.locator('.strip-cells-bar .strip-cell');
    await expect(stripCells).toHaveCount(16);

    const barChips = stageCard.locator('.loop-bar-chips button');
    await expect(barChips).toHaveCount(4);

    // Pad cells grid
    const padGrid = stageCard.locator('.pad-cells-grid');
    await expect(padGrid).toBeVisible();

    const pads = padGrid.locator('.pad-cell');
    await expect(pads).toHaveCount(4);

    // First pad cell internals: zone lines, swap button, detail button, key badge, role label, bold chord name
    const firstPad = pads.first();
    await expect(firstPad.locator('.zone-line-a')).toBeVisible();
    await expect(firstPad.locator('.zone-line-b')).toBeVisible();
    await expect(firstPad.locator('.pad-swap-btn')).toBeVisible();
    await expect(firstPad.locator('.pad-detail-btn')).toBeVisible();
    await expect(firstPad.locator('.pad-key-badge')).toBeVisible();
    await expect(firstPad.locator('.pad-chord-name')).toBeVisible();

    // Playing now row at bottom of card
    const playingNow = stageCard.locator('.playing-now-row');
    await expect(playingNow).toBeVisible();
    await expect(playingNow).toContainText(/Playing now/i);

    // Quick controls below stage card
    const quickControls = page.locator('.stage-quick-controls');
    await expect(quickControls).toBeVisible();
    await expect(quickControls.locator('.instrument-chip')).toBeVisible();
    await expect(quickControls.locator('.play-style-chip')).toBeVisible();
    await expect(quickControls.locator('.tempo-chip')).toBeVisible();
    await expect(quickControls.locator('.feel-chip')).toBeVisible();
    await expect(quickControls.locator('.bounce-btn')).toBeVisible();
  });

  test('Desktop: Right inspector shows Harmonic Arc (idle) and transitions to Swap / Detail', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop layout test');

    const inspector = page.locator('aside.inspector-right');
    await expect(inspector).toBeVisible();

    // In default idle state: "THIS LOOP" and arc bars
    await expect(inspector.locator('.inspector-kicker')).toContainText(/This loop/i);
    const arcBars = inspector.locator('.arc-bar-col');
    await expect(arcBars).toHaveCount(4);

    // Click detail (eye) button on first pad cell -> inspector switches to Chord Detail
    const eyeBtn = page.locator('.pad-cell .pad-detail-btn').first();
    await eyeBtn.click();

    await expect(inspector.locator('.detail-kicker').first()).toContainText(/Chord/i);
    await expect(inspector.locator('.detail-notes-pills')).toBeVisible();
    await expect(inspector.locator('.detail-quality-box')).toBeVisible();
    await expect(inspector.locator('.detail-extension-box')).toBeVisible();

    // Close detail
    const closeDetailBtn = inspector.locator('.close-detail-btn');
    await closeDetailBtn.click();
    await expect(inspector.locator('.inspector-kicker')).toContainText(/This loop/i);

    // Click swap button on first pad cell -> inspector switches to Swap mode
    const swapBtn = page.locator('.pad-cell .pad-swap-btn').first();
    await swapBtn.click();

    await expect(inspector.locator('.swap-kicker')).toContainText(/Swapping/i);
    await expect(inspector.locator('.ab-compare-box')).toBeVisible();
    await expect(inspector.locator('.accept-swap-btn')).toBeVisible();
    await expect(inspector.locator('.swap-family-tabs button')).toHaveCount(5);

    // Pick an alternative candidate and swap
    const altRow = inspector.locator('.alt-chord-row').first();
    await altRow.click();
    const keepBtn = inspector.locator('.accept-swap-btn');
    await expect(keepBtn).toContainText(/Keep/i);
    await keepBtn.click();

    // Inspector returns to idle state and chord on stage is updated
    await expect(inspector.locator('.inspector-kicker')).toContainText(/This loop/i);
  });

  test('Mobile: Responsive layout renders top vibe toggle, 2-column pad grid, and bottom sheets', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile layout test');

    // Vibe dropdown toggle button
    const vibeToggle = page.locator('.mobile-vibe-toggle');
    await expect(vibeToggle).toBeVisible();

    // View tabs
    const viewTabs = page.locator('.view-tabs-bar button.view-tab');
    await expect(viewTabs).toHaveCount(3);

    // 2-column pad grid
    const padGrid = page.locator('.pad-cells-grid');
    await expect(padGrid).toBeVisible();
    const pads = padGrid.locator('.pad-cell');
    await expect(pads).toHaveCount(4);

    // Clicking swap button opens mobile swap sheet
    const swapBtn = pads.first().locator('.pad-swap-btn');
    await swapBtn.click();

    const mobileSheet = page.locator('.mobile-swap-sheet');
    await expect(mobileSheet).toBeVisible();
    await expect(mobileSheet.locator('.accept-swap-btn')).toBeVisible();

    // Close sheet
    const cancelBtn = mobileSheet.locator('.sheet-cancel-btn').first();
    await cancelBtn.click();
    await expect(mobileSheet).not.toBeVisible();
  });

  test('Inbuilt Voicing: Pressing top, middle, and bottom zones on play pads activates corresponding voicing and zone line feedback', async ({ page }) => {
    const pad = page.locator('.pad-cell').first();
    await expect(pad).toBeVisible();

    const box = await pad.boundingBox();
    expect(box).not.toBeNull();
    const w = box!.width;
    const h = box!.height;

    // 1. Press top third (Zone 0: Octave up, y = 15% of pad height)
    await page.mouse.move(box!.x + w / 2, box!.y + h * 0.15);
    await page.mouse.down();
    await page.waitForTimeout(50);

    const zoneLineA = pad.locator('.zone-line-a');
    await expect(zoneLineA).toHaveClass(/active/);
    const metaVoicing = pad.locator('.pad-meta-voicing');
    await expect(metaVoicing).toContainText(/Octave up/i);

    const playingNowDesc = page.locator('.playing-now-desc');
    await expect(playingNowDesc).toContainText(/up an octave · velocity/i);
    await page.mouse.up();

    // 2. Press bottom third (Zone 2: Low root, y = 85% of pad height)
    await page.mouse.move(box!.x + w / 2, box!.y + h * 0.85);
    await page.mouse.down();
    await page.waitForTimeout(50);

    const zoneLineB = pad.locator('.zone-line-b');
    await expect(zoneLineB).toHaveClass(/active/);
    await expect(metaVoicing).toContainText(/Low root/i);
    await expect(playingNowDesc).toContainText(/low, root position · velocity/i);
    await page.mouse.up();

    // 3. Press middle third (Zone 1: 1st inversion, y = 50% of pad height)
    await page.mouse.move(box!.x + w / 2, box!.y + h * 0.5);
    await page.mouse.down();
    await page.waitForTimeout(50);

    await expect(zoneLineA).not.toHaveClass(/active/);
    await expect(zoneLineB).not.toHaveClass(/active/);
    await expect(metaVoicing).toContainText(/1st inversion/i);
    await expect(playingNowDesc).toContainText(/1st inversion · velocity/i);
    await page.mouse.up();
  });

  test('Keyboard accelerators: Pressing A triggers first chord pad', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop keyboard test');

    const firstPad = page.locator('.pad-cell').first();
    await expect(firstPad).toBeVisible();

    await page.keyboard.press('a');
    await page.waitForTimeout(50);

    const metaVoicing = firstPad.locator('.pad-meta-voicing');
    await expect(metaVoicing).toContainText(/1st inversion/i);

    const playingNowDesc = page.locator('.playing-now-desc');
    await expect(playingNowDesc).toContainText(/1st inversion · velocity/i);
  });

  test('Play Along view cards include inbuilt voicing zone lines and pointer interaction', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop view test');

    const playItTab = page.locator('.view-tabs-bar button.view-tab', { hasText: 'Play it' });
    await playItTab.click();

    const playCards = page.locator('.play-card');
    await expect(playCards.first()).toBeVisible();

    const firstCard = playCards.first();
    await expect(firstCard.locator('.zone-line-a')).toBeVisible();
    await expect(firstCard.locator('.zone-line-b')).toBeVisible();

    const box = await firstCard.boundingBox();
    expect(box).not.toBeNull();

    // Tap top of play card -> zone A becomes active
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height * 0.15);
    await page.mouse.down();
    await page.waitForTimeout(50);
    await expect(firstCard.locator('.zone-line-a')).toHaveClass(/active/);
    await page.mouse.up();
  });

  test('Desktop: Chord Info Card allows modifying chord quality and extensions', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop chord detail test');

    const firstPad = page.locator('.pad-cell').first();
    const eyeBtn = firstPad.locator('.pad-detail-btn');
    await eyeBtn.click();

    const inspector = page.locator('aside.inspector-right');
    await expect(inspector.locator('.detail-kicker').first()).toContainText(/Chord/i);

    // Mini-keyboard diagram is removed
    const miniKeyboard = inspector.locator('.detail-mini-keyboard');
    await expect(miniKeyboard).toHaveCount(0);

    // Quality and extension chip grids
    const qualityChips = inspector.locator('.quality-chips-grid .chord-mod-chip');
    await expect(qualityChips).toHaveCount(4);
    const extChips = inspector.locator('.ext-chips-grid .chord-mod-chip');
    await expect(extChips).toHaveCount(5);

    // Check initial state
    const initialName = (await firstPad.locator('.pad-chord-name').textContent())?.trim() || 'C';
    const rootMatch = initialName.match(/^[A-G][#b]?/);
    const root = rootMatch ? rootMatch[0] : 'C';

    await expect(qualityChips.filter({ hasText: 'Major' })).toBeVisible();
    await expect(extChips.filter({ hasText: 'None' })).toBeVisible();

    // Click Minor quality chip
    await qualityChips.filter({ hasText: 'Minor' }).click();
    await expect(firstPad.locator('.pad-chord-name')).toHaveText(`${root}m`);
    await expect(inspector.locator('.detail-quality-box')).toContainText('Minor');
    await expect(qualityChips.filter({ hasText: 'Minor' })).toHaveClass(/active/);

    // Click Major 7th (M7) extension chip
    await extChips.filter({ hasText: 'Major 7th (M7)' }).click();
    await expect(firstPad.locator('.pad-chord-name')).toHaveText(`${root}m(maj7)`);
    await expect(inspector.locator('.detail-extension-box')).toContainText('Major 7th');
    await expect(extChips.filter({ hasText: 'Major 7th (M7)' })).toHaveClass(/active/);

    // Click 7th (dom / m7) extension chip
    await extChips.filter({ hasText: '7th (dom / m7)' }).click();
    await expect(firstPad.locator('.pad-chord-name')).toHaveText(`${root}m7`);
    await expect(inspector.locator('.detail-extension-box')).toContainText('7th');

    // Click Suspended (sus) quality chip
    await qualityChips.filter({ hasText: 'Suspended (sus)' }).click();
    await expect(firstPad.locator('.pad-chord-name')).toHaveText(`${root}sus7`);

    // Close detail inspector
    const closeBtn = inspector.locator('.close-detail-btn');
    await closeBtn.click();
    await expect(inspector.locator('.inspector-kicker')).toContainText(/This loop/i);
  });

  test('Mobile: Chord Info Sheet allows modifying chord quality and extensions', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile chord detail test');

    const firstPad = page.locator('.pad-cells-grid .pad-cell').first();
    const initialName = (await firstPad.locator('.pad-chord-name').textContent())?.trim() || 'C';
    const rootMatch = initialName.match(/^[A-G][#b]?/);
    const root = rootMatch ? rootMatch[0] : 'C';

    const eyeBtn = firstPad.locator('.pad-detail-btn');
    await eyeBtn.click();

    const sheet = page.locator('.mobile-detail-sheet');
    await expect(sheet).toBeVisible();

    // Verify chip grids exist in mobile sheet
    const qualityChips = sheet.locator('.quality-chips-grid .chord-mod-chip');
    await expect(qualityChips).toHaveCount(4);

    const extChips = sheet.locator('.ext-chips-grid .chord-mod-chip');
    await expect(extChips).toHaveCount(5);

    // Change to Minor
    await qualityChips.filter({ hasText: 'Minor' }).click();
    await expect(firstPad.locator('.pad-chord-name')).toHaveText(`${root}m`);

    // Change to 6th
    await extChips.filter({ hasText: '6th' }).click();
    await expect(firstPad.locator('.pad-chord-name')).toHaveText(`${root}m6`);

    // Close sheet
    const closeBtn = sheet.locator('.sheet-cancel-btn');
    await closeBtn.click();
    await expect(sheet).not.toBeVisible();
  });
});

