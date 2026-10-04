import { test, expect } from '@playwright/test';

test.describe('Chroma Chords - Full UI Prototype Alignment (Playwright)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for main web component to mount
    await expect(page.locator('chroma-chords-app')).toBeVisible({ timeout: 15000 });
  });

  test('Desktop: 3-column stage layout matches Chroma Melody prototype', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');

    const app = page.locator('chroma-chords-app');

    // 1. Top Header Bar (Branding only, main nav not jammed here)
    const headerContainer = app.locator('.app-header-container');
    await expect(headerContainer).toBeVisible();
    await expect(headerContainer.locator('app-header')).toBeVisible();

    // 2. Vibe Rail is removed per prototype design (Chroma Melody.dc.html:4575 vibeRailDisp: 'none')
    const vibeRail = app.locator('.vibe-rail');
    await expect(vibeRail).toHaveCount(0);

    // Vibe Pill is present on Chords header
    const tabChords = app.locator('tab-chords');
    const vibeBtn = tabChords.locator('.vibe-pill-btn');
    await expect(vibeBtn).toBeVisible();
    await expect(vibeBtn).toContainText(/BPM/i);

    // 3. Center Main Column with Sub-Header Nav Row
    const mainCol = app.locator('.main-column');
    await expect(mainCol).toBeVisible();

    const subHeaderNav = mainCol.locator('.sub-nav-row');
    await expect(subHeaderNav).toBeVisible();

    // Verify 4 Tier-1 Nav Tabs (Chords, Melody, Song, Play it)
    const navTabs = subHeaderNav.locator('.nav-tabs-track .nav-tab-btn');
    await expect(navTabs).toHaveCount(4);
    await expect(navTabs.nth(0)).toContainText('Chords');
    await expect(navTabs.nth(1)).toContainText('Melody');
    await expect(navTabs.nth(2)).toContainText('Song');
    await expect(navTabs.nth(3)).toContainText('Play it');

    // Theory Toggle Switch on the right side of the nav row
    const theoryToggle = subHeaderNav.locator('.theory-nav-toggle');
    await expect(theoryToggle).toBeVisible();
    await expect(theoryToggle).toContainText('Theory');

    // 4. Docked Transport Bar (Docked inside .main-column, bounded between rails, NOT full 100vw)
    const transportDock = mainCol.locator('.transport-dock-wrapper');
    await expect(transportDock).toBeVisible();
    const transportBar = transportDock.locator('transport-bar');
    await expect(transportBar).toBeVisible();

    const dockBox = await transportDock.boundingBox();
    const viewportSize = page.viewportSize();
    // Docked width must be strictly less than full viewport width because of side rails
    expect(dockBox?.width).toBeLessThan(viewportSize?.width || 1280);

    // 5. Right Desktop Aside (Chord Inspector column)
    const rightAside = app.locator('.desktop-aside');
    await expect(rightAside).toBeVisible();
    await expect(rightAside.locator('chord-inspector')).toBeVisible();
  });

  test('Vibe Popover: Opens from header pill, displays search prompt & pills, and closes', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');

    const app = page.locator('chroma-chords-app');
    const tabChords = app.locator('tab-chords');
    const vibeBtn = tabChords.locator('.vibe-pill-btn');
    const popover = app.locator('.vibe-popover');

    // Popover is initially closed
    await expect(popover).not.toBeVisible();

    // Click Vibe header pill button to open
    await vibeBtn.click();
    await expect(popover).toBeVisible();

    // Check prompt input, genre pills, mood pills
    const promptInput = popover.locator('.vibe-search-input');
    await expect(promptInput).toBeVisible();

    const genrePills = popover.locator('.vibe-chip');
    expect(await genrePills.count()).toBeGreaterThan(5);

    // Click close button
    const closeBtn = popover.locator('.vibe-popover-close');
    await closeBtn.click();
    await expect(popover).not.toBeVisible();
  });

  test('Melody Tab: Renders chord-lane matrix (MelodyGrid.dc.html) and Bloom note picker', async ({ page }) => {
    const app = page.locator('chroma-chords-app');

    // Switch to Melody tab
    const melodyNavBtn = app.locator('.nav-tab-btn', { hasText: 'Melody' });
    await melodyNavBtn.click();

    const tabMelody = app.locator('tab-melody');
    await expect(tabMelody).toBeVisible();

    // Header label & note count
    await expect(tabMelody.locator('.small-caps-label')).toHaveText('MELODY');
    await expect(tabMelody.locator('.note-count')).toBeVisible();

    // Tier-2 segmented control (Strict, Guide, Free)
    const modeBtns = tabMelody.locator('.segmented-control .segment-btn');
    await expect(modeBtns).toHaveCount(3);
    await expect(modeBtns.nth(0)).toHaveText('Strict');
    await expect(modeBtns.nth(1)).toHaveText('Guide');
    await expect(modeBtns.nth(2)).toHaveText('Free');

    // Step numbers header row (1 through 16, unpadded)
    const stepNumCols = tabMelody.locator('.step-numbers-track .step-num-col');
    await expect(stepNumCols).toHaveCount(16);
    await expect(stepNumCols.first()).toContainText('1');
    await expect(stepNumCols.last()).toContainText('16');

    // 4 Horizontal Chord Lanes
    const chordLanes = tabMelody.locator('.chord-lane.bar-column');
    await expect(chordLanes).toHaveCount(4);

    // Each lane has chord badge and 16 circular step pads
    const firstLane = chordLanes.first();
    await expect(firstLane.locator('.lane-chord-badge')).toBeVisible();
    await expect(firstLane.locator('.bar-role')).toBeVisible();
    await expect(firstLane.locator('.bar-chord-name')).toBeVisible();

    const stepCells = tabMelody.locator('.step-cell');
    await expect(stepCells).toHaveCount(64);

    // Click on a step cell to open Bloom Note Picker Popover
    const targetStep = stepCells.first();
    await targetStep.click();

    const bloomPopover = tabMelody.locator('.bloom-popover');
    await expect(bloomPopover).toBeVisible();

    // Micro Keyboard inside bloom popover (7 white keys, 5 black keys)
    const whiteKeys = bloomPopover.locator('.white-key');
    await expect(whiteKeys).toHaveCount(7);

    const blackKeys = bloomPopover.locator('.black-key');
    await expect(blackKeys).toHaveCount(5);

    // Header info with pitch and navigation buttons
    await expect(bloomPopover.locator('.bloom-pitch-title')).toBeVisible();
    await expect(bloomPopover.locator('.bloom-nav-btn')).toHaveCount(2);

    // Clicking outside closes the Bloom popover
    await tabMelody.locator('.bloom-overlay').click({ position: { x: 10, y: 10 } });
    await expect(bloomPopover).not.toBeVisible();

    // Test dragging note tail or grip handle to adjust duration
    const tailGrip = tabMelody.locator('.step-cell .tail-grip, .step-cell.is-tail-step').first();
    if (await tailGrip.isVisible()) {
      const gripBox = await tailGrip.boundingBox();
      if (gripBox) {
        await page.mouse.move(gripBox.x + gripBox.width / 2, gripBox.y + gripBox.height / 2);
        await page.mouse.down();
        await page.mouse.move(gripBox.x + gripBox.width / 2 + 80, gripBox.y + gripBox.height / 2, { steps: 5 });
        await page.mouse.up();
        await expect(tabMelody.locator('.step-cell.has-note').first()).toBeVisible();
      }
    }
  });

  test('Song Tab: Renders 2-column arranger (Sticky Song Order on left, Sections on right)', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');

    const app = page.locator('chroma-chords-app');

    // Switch to Song tab
    const songNavBtn = app.locator('.nav-tab-btn', { hasText: 'Song' });
    await songNavBtn.click();

    const tabSong = app.locator('tab-song');
    await expect(tabSong).toBeVisible();

    // 1. Left Sticky Column: Song Order
    const timelineContainer = tabSong.locator('.timeline-container');
    await expect(timelineContainer).toBeVisible();
    await expect(timelineContainer.locator('.col-title')).toHaveText('SONG ORDER');
    await expect(timelineContainer.locator('.col-sub')).toBeVisible();

    // Timeline cards exist
    const timelineCards = timelineContainer.locator('.timeline-card');
    const initialCount = await timelineCards.count();
    expect(initialCount).toBeGreaterThan(0);

    // Timeline card has drag handle, step number, name, and repeat counter stepper
    const firstTimelineItem = timelineCards.first();
    await expect(firstTimelineItem.locator('.drag-handle')).toBeVisible();
    await expect(firstTimelineItem.locator('.step-idx')).toHaveText('01');
    await expect(firstTimelineItem.locator('.repeat-stepper')).toBeVisible();

    // Test repeat stepper
    const initialRepeatText = await firstTimelineItem.locator('.repeat-label').textContent();
    const plusRepeatBtn = firstTimelineItem.locator('.stepper-btn[aria-label="More repeats"]');
    await plusRepeatBtn.click();
    const updatedRepeatText = await firstTimelineItem.locator('.repeat-label').textContent();
    expect(updatedRepeatText).not.toBe(initialRepeatText);

    // 2. Right Column: Sections · Edit once, used everywhere
    const sectionsLibrary = tabSong.locator('.sections-library');
    await expect(sectionsLibrary).toBeVisible();
    await expect(sectionsLibrary.locator('.col-title')).toContainText('SECTIONS');

    const sectionCards = sectionsLibrary.locator('.section-card');
    expect(await sectionCards.count()).toBeGreaterThan(0);

    // Section card has badge, name, meta, + Add to song button, chord chips with 8-dot rhythm matrices
    const firstSection = sectionCards.first();
    await expect(firstSection.locator('.section-badge')).toBeVisible();
    await expect(firstSection.locator('.section-name')).toBeVisible();
    await expect(firstSection.locator('.action-btn.primary')).toContainText('+ Add to song');

    const chordChips = firstSection.locator('.chord-chip');
    expect(await chordChips.count()).toBeGreaterThan(0);
    await expect(chordChips.first().locator('.rhythm-dots-matrix .rhythm-dot')).toHaveCount(8);

    // Click '+ Add to song' and verify timeline card count increases
    const addBtn = firstSection.locator('.action-btn.primary');
    await addBtn.click();
    await expect(timelineContainer.locator('.timeline-card')).toHaveCount(initialCount + 1);

    // Edit chords & Edit melody action buttons are available
    await expect(firstSection.locator('.action-btn', { hasText: 'Edit chords' })).toBeVisible();
    await expect(firstSection.locator('.action-btn', { hasText: 'Edit melody' })).toBeVisible();
  });

  test('Play it Tab: Renders playable instrument voicings (Piano, Guitar, Ukulele)', async ({ page }) => {
    const app = page.locator('chroma-chords-app');

    // Switch to Play it tab
    const playNavBtn = app.locator('.nav-tab-btn', { hasText: 'Play it' });
    await playNavBtn.click();

    const tabPlay = app.locator('tab-play');
    await expect(tabPlay).toBeVisible();

    // Verify instrument selector options
    const instrumentControls = tabPlay.locator('.tier2-chip');
    await expect(instrumentControls).toHaveCount(3);
    await expect(instrumentControls.nth(0)).toContainText('Piano');
    await expect(instrumentControls.nth(1)).toContainText('Guitar');
    await expect(instrumentControls.nth(2)).toContainText('Ukulele');

    // Chord cards on play tab are visible
    const playChordCards = tabPlay.locator('.play-card');
    expect(await playChordCards.count()).toBeGreaterThan(0);
  });

  test('Design Parity Audit: All 8 core design parity requirements strictly verified', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');
    const app = page.locator('chroma-chords-app');

    // 1. Try another button with 5-dot dice SVG icon
    const tabChords = app.locator('tab-chords');
    await expect(tabChords).toBeVisible();
    const tryAnotherBtn = tabChords.locator('.try-another-btn');
    await expect(tryAnotherBtn).toBeVisible();
    await expect(tryAnotherBtn).toContainText('Try another');
    // Check 5-dot dice SVG
    const diceSvg = tryAnotherBtn.locator('svg');
    await expect(diceSvg).toBeVisible();
    await expect(diceSvg.locator('circle')).toHaveCount(5);

    // 2. Key helper icons are 3D keyboard key caps with .pad-key-badge & .pad-key-cap
    const keyBadges = tabChords.locator('.pad-key-badge');
    expect(await keyBadges.count()).toBeGreaterThanOrEqual(4);
    const firstKeyCap = keyBadges.first().locator('.pad-key-cap');
    await expect(firstKeyCap).toBeVisible();
    await expect(firstKeyCap).toHaveText('A');

    // 3. Eye icon is NOT present on chord cards
    const eyeIcons = tabChords.locator('.pad-actions, button:has-text("👁"), svg.eye-icon');
    await expect(eyeIcons).toHaveCount(0);

    // 4. Swap button is at bottom of chord card with exchange SVG
    const swapBtns = tabChords.locator('.pad-tray-btn');
    expect(await swapBtns.count()).toBeGreaterThanOrEqual(4);
    await expect(swapBtns.first()).toBeVisible();
    await expect(swapBtns.first().locator('svg')).toBeVisible();

    // 5. Tension dots (5 rung dots)
    const rungDots = tabChords.locator('.rung-dots').first();
    await expect(rungDots.locator('.rung-dot')).toHaveCount(5);

    // 6. Right side column: Chord Inspector with Tension Arc Chart (height: 152px)
    const chordInspector = app.locator('chord-inspector');
    await expect(chordInspector).toBeVisible();
    await expect(chordInspector.locator('.kicker')).toHaveText('THIS LOOP');
    const arcBars = chordInspector.locator('.arc-bars-container .arc-bar-col');
    await expect(arcBars).toHaveCount(4);
    await expect(chordInspector.locator('.arc-hint-text')).toContainText('Taller means more unresolved');

    // 7. Click overlay and animation + vibe overlay update
    const vibeBtn = tabChords.locator('.vibe-pill-btn');
    await vibeBtn.click();
    const vibeOverlay = app.locator('.vibe-overlay');
    await expect(vibeOverlay).toBeVisible();
    const vibePopover = app.locator('.vibe-popover');
    await expect(vibePopover).toBeVisible();
    // Mood pills with circular badges & SVGs
    const moodBtns = vibePopover.locator('.vibe-mood-btn');
    expect(await moodBtns.count()).toBeGreaterThanOrEqual(6);
    await expect(moodBtns.first().locator('.vibe-mood-badge svg')).toBeVisible();
    // Band signature pills
    const bandChips = vibePopover.locator('.vibe-section-label:has-text("Band")');
    await expect(bandChips).toBeVisible();
    // Click overlay to dismiss
    await vibeOverlay.click({ position: { x: 10, y: 10 } });
    await expect(vibePopover).not.toBeVisible();
    await expect(vibeOverlay).not.toBeVisible();

    // 8. Song tab: Clean 2-column layout without duplicate top header
    const songNavBtn = app.locator('.nav-tab-btn', { hasText: 'Song' });
    await songNavBtn.click();
    const tabSong = app.locator('tab-song');
    await expect(tabSong).toBeVisible();
    // Verify no redundant top header with duplicate play button
    await expect(tabSong.locator('.panel-header')).toHaveCount(0);
    await expect(tabSong.locator('.song-columns')).toBeVisible();
    await expect(tabSong.locator('.timeline-container')).toBeVisible();
    await expect(tabSong.locator('.sections-library')).toBeVisible();
  });

  test('Interactive Parity: Swap button under card, full-width swap drawer, Sound popover without scrollbar, Save and Loops pills', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');
    const app = page.locator('chroma-chords-app');
    const tabChords = app.locator('tab-chords');
    await expect(tabChords).toBeVisible();

    // 1. Swap button is under the chord card in .pad-cell-column
    const padColumns = tabChords.locator('.pad-cell-column');
    expect(await padColumns.count()).toBeGreaterThanOrEqual(4);

    const firstCol = padColumns.first();
    const padCell = firstCol.locator('.pad-cell');
    const swapBtn = firstCol.locator('.pad-tray-btn');
    await expect(padCell).toBeVisible();
    await expect(swapBtn).toBeVisible();
    await expect(swapBtn).toContainText('Swap');

    // Click Swap button to open swap drawer
    await swapBtn.click();
    await expect(swapBtn).toContainText('Close');

    // Verify redesigned full-width swap drawer
    const swapLane = tabChords.locator('chord-swap-lane');
    await expect(swapLane).toBeVisible();
    const trayCard = swapLane.locator('.tray-card');
    await expect(trayCard).toBeVisible();
    await expect(swapLane.locator('.tray-pointer')).toBeVisible();

    // Verify feel groups and chips
    const groupsGrid = swapLane.locator('.tray-groups-grid');
    await expect(groupsGrid).toBeVisible();
    const chips = swapLane.locator('.tray-chip');
    expect(await chips.count()).toBeGreaterThanOrEqual(6);

    // Click a swap chip
    const initialTitle = await swapLane.locator('.tray-title').textContent();
    const candidateChip = chips.nth(1);
    const chipText = (await candidateChip.textContent())?.trim();
    await candidateChip.click();

    // Tray title updates to "Bar 1 is now ..." and revert button appears
    await expect(swapLane.locator('.tray-title')).toContainText('is now');
    const revertBtn = swapLane.locator('.tray-revert-btn');
    await expect(revertBtn).toBeVisible();
    await expect(revertBtn).toContainText('Back to');

    // Reverting restores initial chord
    await revertBtn.click();
    await expect(swapLane.locator('.tray-title')).toContainText('swap');

    // Close drawer via close button
    const closeBtn = swapLane.locator('.tray-close-btn');
    await closeBtn.click();
    await expect(swapLane).not.toBeVisible();
    await expect(swapBtn).toContainText('Swap');

    // 2. Transport Sound popover has NO scrollbar and clean 2-col grid
    const transportBar = app.locator('transport-bar');
    const soundTrigger = transportBar.locator('.tb-btn', { hasText: 'Sound' });
    await soundTrigger.click();

    const soundPopover = transportBar.locator('.sound-popover');
    await expect(soundPopover).toBeVisible();
    const soundGrid = soundPopover.locator('.sound-grid');
    await expect(soundGrid).toBeVisible();
    const soundItems = soundPopover.locator('.sound-item');
    expect(await soundItems.count()).toBeGreaterThanOrEqual(8);

    // Verify scrollbar is hidden on .sound-popover
    const scrollbarCheck = await soundPopover.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.scrollbarWidth === 'none' || style.overflowY === 'visible' || el.scrollHeight <= el.clientHeight;
    });
    expect(scrollbarCheck).toBe(true);

    // Close sound popover
    await transportBar.locator('.backdrop').click({ position: { x: 10, y: 10 } });
    await expect(soundPopover).not.toBeVisible();

    // 3. Right column Save and Loops pills
    const chordInspector = app.locator('chord-inspector');
    await expect(chordInspector).toBeVisible();

    const saveBtn = chordInspector.locator('.action-btn', { hasText: /Save/i });
    const loopsBtn = chordInspector.locator('.action-btn', { hasText: /Loops/i });
    await expect(saveBtn).toBeVisible();
    await expect(loopsBtn).toBeVisible();

    // Click Save button: triggers project save and updates to "Saved"
    await saveBtn.click();
    await expect(saveBtn).toContainText('Saved');

    // Click Loops button: toggles the saved loops popover menu
    await loopsBtn.click();
    const loopsPopover = chordInspector.locator('.popover-menu');
    await expect(loopsPopover).toBeVisible();
    await expect(loopsPopover.locator('.kicker')).toContainText('SAVED LOOPS');

    // Saved set item is present
    const savedItems = loopsPopover.locator('.saved-set-item');
    expect(await savedItems.count()).toBeGreaterThanOrEqual(1);

    // Close loops popover
    await loopsBtn.click();
    await expect(loopsPopover).not.toBeVisible();
  });

  test('Share Modal: Opens from transport-bar, displays destinations and export options, and closes', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only - transport-bar is desktop-docked');
    const app = page.locator('chroma-chords-app');
    const transportBar = app.locator('transport-bar');
    const shareBtn = transportBar.locator('.share-btn');
    await expect(shareBtn).toBeVisible();

    const shareModal = app.locator('share-modal');
    // Initially not open
    await expect(shareModal.locator('.share-drawer')).not.toHaveClass(/open/);

    // Click share button in transport-bar
    await shareBtn.click();
    await expect(shareModal.locator('.share-drawer')).toHaveClass(/open/);

    // Verify destinations and actions
    await expect(shareModal.locator('.dest-card')).toHaveCount(2); // M8 Tracker and Circuit Tracks
    const exportRows = shareModal.locator('.export-row');
    expect(await exportRows.count()).toBeGreaterThanOrEqual(2);

    // Close share modal
    const closeBtn = shareModal.locator('.close-btn');
    await closeBtn.click();
    await expect(shareModal.locator('.share-drawer')).not.toHaveClass(/open/);
  });

  test('Chord Cards: 2D click effects for voicing zones (octave, inversion, root) and extension reach', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only test');
    const app = page.locator('chroma-chords-app');
    const tabChords = app.locator('tab-chords');
    const firstPad = tabChords.locator('.pad-cell').first();
    await expect(firstPad).toBeVisible();

    const box = await firstPad.boundingBox();
    expect(box).toBeTruthy();
    if (!box) return;

    // 1. Press near top-left on home rung (x ~ 10%, y < 34%) -> triggers Octave Up voicing
    await page.mouse.move(box.x + box.width * 0.1, box.y + box.height * 0.15);
    await page.mouse.down();
    await expect(firstPad.locator('.pad-meta-label')).toHaveText('OCTAVE UP');
    await expect(firstPad.locator('.grid-hit-pill')).toBeVisible();

    // 2. Move near middle-left (34% < y < 67%) -> triggers 1st Inversion voicing
    await page.mouse.move(box.x + box.width * 0.1, box.y + box.height * 0.5);
    await expect(firstPad.locator('.pad-meta-label')).toHaveText('1ST INVERSION');

    // 3. Move near bottom-left (y > 67%) -> triggers Low Root voicing
    await page.mouse.move(box.x + box.width * 0.1, box.y + box.height * 0.85);
    await expect(firstPad.locator('.pad-meta-label')).toHaveText('LOW ROOT');

    // 4. Move horizontally to the right across extensions (x ~ 85%)
    await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.85);
    const metaText = await firstPad.locator('.pad-meta-label').textContent();
    expect(metaText).toMatch(/→/);

    // 5. Release mouse button -> latches extension and sticks voicing
    await page.mouse.up();
    await expect(firstPad.locator('.pad-cell.pad-held')).toHaveCount(0);
  });
});


