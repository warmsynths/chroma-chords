# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: design-parity.spec.ts >> Design Parity Tests: Chroma Chords App against Design Mockup >> Desktop: Right inspector shows Harmonic Arc (idle) and transitions to Swap / Detail
- Location: e2e\design-parity.spec.ts:109:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('aside.inspector-right').locator('.ab-compare-box')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('aside.inspector-right').locator('.ab-compare-box')

```

```yaml
- img
- text: Chroma Chords
- button "Sign in"
- navigation:
  - button "Vibe, genre and mood":
    - img
  - text: Vibe Pop · dreamy
  - button "Your loops":
    - img
  - text: Loops
- main:
  - button "Chords"
  - button "Song"
  - button "Play it"
  - button "Play loop"
  - text: 4 bars · stopped Space plays the loop From bar
  - button "Play loop from bar 1": "1"
  - button "Play loop from bar 2": "2"
  - button "Play loop from bar 3": "3"
  - button "Play loop from bar 4": "4"
  - button "Ab, lifting — press to play it; press nearer the top for a higher voicing":
    - button "Swap Ab":
      - img
    - button "View voicing for Ab":
      - img
    - text: A lifting Ab
  - button "Bb, pulling home — press to play it; press nearer the top for a higher voicing":
    - button "Swap Bb":
      - img
    - button "View voicing for Bb":
      - img
    - text: S pulling home Bb
  - button "Cm, drifting — press to play it; press nearer the top for a higher voicing":
    - button "Swap Cm":
      - img
    - button "View voicing for Cm":
      - img
    - text: D drifting Cm
  - button "Gm, wistful — press to play it; press nearer the top for a higher voicing":
    - button "Swap Gm":
      - img
    - button "View voicing for Gm":
      - img
    - text: F wistful Gm
  - text: Playing now — Press a chord — nearer the top of a card plays a higher voicing. Home-row keys A S D F play them too.
  - button "Piano ⌄":
    - img
    - text: Piano ⌄
  - button "Block chords ⌄":
    - img
    - text: Block chords ⌄
  - button "Eb · 110"
  - button "Feel & tone"
  - button "Bounce":
    - img
    - text: Bounce
  - button "Fewer chords": −
  - text: 4 chords
  - button "More chords": +
  - button "Try another progression":
    - img
    - text: Try another
- complementary:
  - text: Swapping Bar 1 Ab lifting
  - button "Close chord inspector": ×
  - button "Now Ab"
  - button "Swap to Pick one below" [disabled]
  - button "Play loop with swap preview":
    - img
  - button "Preview Ab in bar 1": Ab
  - button "Preview Bb in bar 2": Bb
  - button "Preview Cm in bar 3": Cm
  - button "Preview Gm in bar 4": Gm
  - button "Pick a chord below" [disabled]
  - button "Darker"
  - button "Tense"
  - button "Dreamy"
  - button "Home"
  - button "Borrow"
  - text: Three chords that add weight without changing the key. Bmaj7 borrowed from Eb minor — the cinematic shadow
  - button "Hear"
  - text: Abm7 the minor subdominant — softer, sadder
  - button "Hear"
  - text: Gbmaj7 a step further out — cooler, more remote
  - button "Hear"
```

# Test source

```ts
  39  | 
  40  |     const box = await vibePopover.boundingBox();
  41  |     expect(box?.width).toBeCloseTo(322, 5);
  42  | 
  43  |     // Verify genre and mood pills inside popover
  44  |     await expect(vibePopover.locator('button.pill', { hasText: 'Lo-fi/Chill' })).toBeVisible();
  45  |     await expect(vibePopover.locator('button.pill', { hasText: 'Melancholy' })).toBeVisible();
  46  | 
  47  |     // Clicking close button dismisses popover
  48  |     const closeBtn = vibePopover.locator('button.close-popover-btn');
  49  |     await closeBtn.click();
  50  |     await expect(vibePopover).not.toBeVisible();
  51  |   });
  52  | 
  53  |   test('Desktop: Center stage contains View Tabs, Surface Card with Loop Strip, and Pad Cells Grid', async ({ page, isMobile }) => {
  54  |     test.skip(isMobile, 'Desktop layout test');
  55  | 
  56  |     // View tabs: Chords, Song, Play it in rounded pill container
  57  |     const viewTabs = page.locator('.view-tabs-bar button.view-tab');
  58  |     await expect(viewTabs).toHaveCount(3);
  59  |     await expect(viewTabs.nth(0)).toContainText('Chords');
  60  |     await expect(viewTabs.nth(1)).toContainText('Song');
  61  |     await expect(viewTabs.nth(2)).toContainText('Play it');
  62  | 
  63  |     // Surface card
  64  |     const stageCard = page.locator('.stage-card');
  65  |     await expect(stageCard).toBeVisible();
  66  | 
  67  |     // Loop Play Strip at top of card
  68  |     const loopPlayBtn = stageCard.locator('.loop-play-btn');
  69  |     await expect(loopPlayBtn).toBeVisible();
  70  |     await expect(loopPlayBtn).toContainText(/Play loop|Stop/);
  71  | 
  72  |     const stripCells = stageCard.locator('.strip-cells-bar .strip-cell');
  73  |     await expect(stripCells).toHaveCount(16);
  74  | 
  75  |     const barChips = stageCard.locator('.loop-bar-chips button');
  76  |     await expect(barChips).toHaveCount(4);
  77  | 
  78  |     // Pad cells grid
  79  |     const padGrid = stageCard.locator('.pad-cells-grid');
  80  |     await expect(padGrid).toBeVisible();
  81  | 
  82  |     const pads = padGrid.locator('.pad-cell');
  83  |     await expect(pads).toHaveCount(4);
  84  | 
  85  |     // First pad cell internals: zone lines, swap button, detail button, key badge, role label, bold chord name
  86  |     const firstPad = pads.first();
  87  |     await expect(firstPad.locator('.zone-line-a')).toBeVisible();
  88  |     await expect(firstPad.locator('.zone-line-b')).toBeVisible();
  89  |     await expect(firstPad.locator('.pad-swap-btn')).toBeVisible();
  90  |     await expect(firstPad.locator('.pad-detail-btn')).toBeVisible();
  91  |     await expect(firstPad.locator('.pad-key-badge')).toBeVisible();
  92  |     await expect(firstPad.locator('.pad-chord-name')).toBeVisible();
  93  | 
  94  |     // Playing now row at bottom of card
  95  |     const playingNow = stageCard.locator('.playing-now-row');
  96  |     await expect(playingNow).toBeVisible();
  97  |     await expect(playingNow).toContainText(/Playing now/i);
  98  | 
  99  |     // Quick controls below stage card
  100 |     const quickControls = page.locator('.stage-quick-controls');
  101 |     await expect(quickControls).toBeVisible();
  102 |     await expect(quickControls.locator('.instrument-chip')).toBeVisible();
  103 |     await expect(quickControls.locator('.play-style-chip')).toBeVisible();
  104 |     await expect(quickControls.locator('.tempo-chip')).toBeVisible();
  105 |     await expect(quickControls.locator('.feel-chip')).toBeVisible();
  106 |     await expect(quickControls.locator('.bounce-btn')).toBeVisible();
  107 |   });
  108 | 
  109 |   test('Desktop: Right inspector shows Harmonic Arc (idle) and transitions to Swap / Detail', async ({ page, isMobile }) => {
  110 |     test.skip(isMobile, 'Desktop layout test');
  111 | 
  112 |     const inspector = page.locator('aside.inspector-right');
  113 |     await expect(inspector).toBeVisible();
  114 | 
  115 |     // In default idle state: "THIS LOOP" and arc bars
  116 |     await expect(inspector.locator('.inspector-kicker')).toContainText(/This loop/i);
  117 |     const arcBars = inspector.locator('.arc-bar-col');
  118 |     await expect(arcBars).toHaveCount(4);
  119 | 
  120 |     // Click detail (eye) button on first pad cell -> inspector switches to Chord Detail
  121 |     const eyeBtn = page.locator('.pad-cell .pad-detail-btn').first();
  122 |     await eyeBtn.click();
  123 | 
  124 |     await expect(inspector.locator('.detail-kicker').first()).toContainText(/Chord/i);
  125 |     await expect(inspector.locator('.detail-notes-pills')).toBeVisible();
  126 |     await expect(inspector.locator('.detail-quality-box')).toBeVisible();
  127 |     await expect(inspector.locator('.detail-extension-box')).toBeVisible();
  128 | 
  129 |     // Close detail
  130 |     const closeDetailBtn = inspector.locator('.close-detail-btn');
  131 |     await closeDetailBtn.click();
  132 |     await expect(inspector.locator('.inspector-kicker')).toContainText(/This loop/i);
  133 | 
  134 |     // Click swap button on first pad cell -> inspector switches to Swap mode
  135 |     const swapBtn = page.locator('.pad-cell .pad-swap-btn').first();
  136 |     await swapBtn.click();
  137 | 
  138 |     await expect(inspector.locator('.swap-kicker')).toContainText(/Swapping/i);
> 139 |     await expect(inspector.locator('.ab-compare-box')).toBeVisible();
      |                                                        ^ Error: expect(locator).toBeVisible() failed
  140 |     await expect(inspector.locator('.accept-swap-btn')).toBeVisible();
  141 |     await expect(inspector.locator('.swap-family-tabs button')).toHaveCount(5);
  142 | 
  143 |     // Pick an alternative candidate and swap
  144 |     const altRow = inspector.locator('.alt-chord-row').first();
  145 |     await altRow.click();
  146 |     const keepBtn = inspector.locator('.accept-swap-btn');
  147 |     await expect(keepBtn).toContainText(/Keep/i);
  148 |     await keepBtn.click();
  149 | 
  150 |     // Inspector returns to idle state and chord on stage is updated
  151 |     await expect(inspector.locator('.inspector-kicker')).toContainText(/This loop/i);
  152 |   });
  153 | 
  154 |   test('Mobile: Responsive layout renders top vibe toggle, 2-column pad grid, and bottom sheets', async ({ page, isMobile }) => {
  155 |     test.skip(!isMobile, 'Mobile layout test');
  156 | 
  157 |     // Vibe dropdown toggle button
  158 |     const vibeToggle = page.locator('.mobile-vibe-toggle');
  159 |     await expect(vibeToggle).toBeVisible();
  160 | 
  161 |     // View tabs
  162 |     const viewTabs = page.locator('.view-tabs-bar button.view-tab');
  163 |     await expect(viewTabs).toHaveCount(3);
  164 | 
  165 |     // 2-column pad grid
  166 |     const padGrid = page.locator('.pad-cells-grid');
  167 |     await expect(padGrid).toBeVisible();
  168 |     const pads = padGrid.locator('.pad-cell');
  169 |     await expect(pads).toHaveCount(4);
  170 | 
  171 |     // Clicking swap button opens mobile swap sheet
  172 |     const swapBtn = pads.first().locator('.pad-swap-btn');
  173 |     await swapBtn.click();
  174 | 
  175 |     const mobileSheet = page.locator('.mobile-swap-sheet');
  176 |     await expect(mobileSheet).toBeVisible();
  177 |     await expect(mobileSheet.locator('.accept-swap-btn')).toBeVisible();
  178 | 
  179 |     // Close sheet
  180 |     const cancelBtn = mobileSheet.locator('.sheet-cancel-btn').first();
  181 |     await cancelBtn.click();
  182 |     await expect(mobileSheet).not.toBeVisible();
  183 |   });
  184 | 
  185 |   test('Inbuilt Voicing: Pressing top, middle, and bottom zones on play pads activates corresponding voicing and zone line feedback', async ({ page }) => {
  186 |     const pad = page.locator('.pad-cell').first();
  187 |     await expect(pad).toBeVisible();
  188 | 
  189 |     const box = await pad.boundingBox();
  190 |     expect(box).not.toBeNull();
  191 |     const w = box!.width;
  192 |     const h = box!.height;
  193 | 
  194 |     // 1. Press top third (Zone 0: Octave up, y = 15% of pad height)
  195 |     await page.mouse.move(box!.x + w / 2, box!.y + h * 0.15);
  196 |     await page.mouse.down();
  197 |     await page.waitForTimeout(50);
  198 | 
  199 |     const zoneLineA = pad.locator('.zone-line-a');
  200 |     await expect(zoneLineA).toHaveClass(/active/);
  201 |     const metaVoicing = pad.locator('.pad-meta-voicing');
  202 |     await expect(metaVoicing).toContainText(/Octave up/i);
  203 | 
  204 |     const playingNowDesc = page.locator('.playing-now-desc');
  205 |     await expect(playingNowDesc).toContainText(/up an octave · velocity/i);
  206 |     await page.mouse.up();
  207 | 
  208 |     // 2. Press bottom third (Zone 2: Low root, y = 85% of pad height)
  209 |     await page.mouse.move(box!.x + w / 2, box!.y + h * 0.85);
  210 |     await page.mouse.down();
  211 |     await page.waitForTimeout(50);
  212 | 
  213 |     const zoneLineB = pad.locator('.zone-line-b');
  214 |     await expect(zoneLineB).toHaveClass(/active/);
  215 |     await expect(metaVoicing).toContainText(/Low root/i);
  216 |     await expect(playingNowDesc).toContainText(/low, root position · velocity/i);
  217 |     await page.mouse.up();
  218 | 
  219 |     // 3. Press middle third (Zone 1: 1st inversion, y = 50% of pad height)
  220 |     await page.mouse.move(box!.x + w / 2, box!.y + h * 0.5);
  221 |     await page.mouse.down();
  222 |     await page.waitForTimeout(50);
  223 | 
  224 |     await expect(zoneLineA).not.toHaveClass(/active/);
  225 |     await expect(zoneLineB).not.toHaveClass(/active/);
  226 |     await expect(metaVoicing).toContainText(/1st inversion/i);
  227 |     await expect(playingNowDesc).toContainText(/1st inversion · velocity/i);
  228 |     await page.mouse.up();
  229 |   });
  230 | 
  231 |   test('Keyboard accelerators: Pressing A triggers first chord pad', async ({ page, isMobile }) => {
  232 |     test.skip(isMobile, 'Desktop keyboard test');
  233 | 
  234 |     const firstPad = page.locator('.pad-cell').first();
  235 |     await expect(firstPad).toBeVisible();
  236 | 
  237 |     await page.keyboard.press('a');
  238 |     await page.waitForTimeout(50);
  239 | 
```