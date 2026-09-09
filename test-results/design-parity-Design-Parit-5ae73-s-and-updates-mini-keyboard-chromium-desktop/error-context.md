# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: design-parity.spec.ts >> Design Parity Tests: Chroma Chords App against Design Mockup >> Desktop: Chord Info Card allows modifying chord quality, extensions, and updates mini-keyboard
- Location: e2e\design-parity.spec.ts:271:3

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.pad-cell').first().locator('.pad-chord-name')
Expected: "Dbm7"
Received: "Db7"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('.pad-cell').first().locator('.pad-chord-name')
    14 × locator resolved to <div class="pad-chord-name">…</div>
       - unexpected value "Db7"

```

```yaml
- text: Db7
```

# Test source

```ts
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
  240 |     const metaVoicing = firstPad.locator('.pad-meta-voicing');
  241 |     await expect(metaVoicing).toContainText(/1st inversion/i);
  242 | 
  243 |     const playingNowDesc = page.locator('.playing-now-desc');
  244 |     await expect(playingNowDesc).toContainText(/1st inversion · velocity/i);
  245 |   });
  246 | 
  247 |   test('Play Along view cards include inbuilt voicing zone lines and pointer interaction', async ({ page, isMobile }) => {
  248 |     test.skip(isMobile, 'Desktop view test');
  249 | 
  250 |     const playItTab = page.locator('.view-tabs-bar button.view-tab', { hasText: 'Play it' });
  251 |     await playItTab.click();
  252 | 
  253 |     const playCards = page.locator('.play-card');
  254 |     await expect(playCards.first()).toBeVisible();
  255 | 
  256 |     const firstCard = playCards.first();
  257 |     await expect(firstCard.locator('.zone-line-a')).toBeVisible();
  258 |     await expect(firstCard.locator('.zone-line-b')).toBeVisible();
  259 | 
  260 |     const box = await firstCard.boundingBox();
  261 |     expect(box).not.toBeNull();
  262 | 
  263 |     // Tap top of play card -> zone A becomes active
  264 |     await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height * 0.15);
  265 |     await page.mouse.down();
  266 |     await page.waitForTimeout(50);
  267 |     await expect(firstCard.locator('.zone-line-a')).toHaveClass(/active/);
  268 |     await page.mouse.up();
  269 |   });
  270 | 
  271 |   test('Desktop: Chord Info Card allows modifying chord quality, extensions, and updates mini-keyboard', async ({ page, isMobile }) => {
  272 |     test.skip(isMobile, 'Desktop chord detail test');
  273 | 
  274 |     const firstPad = page.locator('.pad-cell').first();
  275 |     const eyeBtn = firstPad.locator('.pad-detail-btn');
  276 |     await eyeBtn.click();
  277 | 
  278 |     const inspector = page.locator('aside.inspector-right');
  279 |     await expect(inspector.locator('.detail-kicker').first()).toContainText(/Chord/i);
  280 | 
  281 |     // Mini-keyboard preview is visible
  282 |     const miniKeyboard = inspector.locator('.detail-mini-keyboard');
  283 |     await expect(miniKeyboard).toBeVisible();
  284 |     await expect(miniKeyboard.locator('.white-key')).toHaveCount(7);
  285 |     await expect(miniKeyboard.locator('.black-key')).toHaveCount(5);
  286 | 
  287 |     // Quality and extension chip grids
  288 |     const qualityChips = inspector.locator('.quality-chips-grid .chord-mod-chip');
  289 |     await expect(qualityChips).toHaveCount(4);
  290 |     const extChips = inspector.locator('.ext-chips-grid .chord-mod-chip');
  291 |     await expect(extChips).toHaveCount(5);
  292 | 
  293 |     // Check initial state
  294 |     const initialName = (await firstPad.locator('.pad-chord-name').textContent())?.trim() || 'C';
  295 |     const rootMatch = initialName.match(/^[A-G][#b]?/);
  296 |     const root = rootMatch ? rootMatch[0] : 'C';
  297 | 
  298 |     await expect(qualityChips.filter({ hasText: 'Major' })).toBeVisible();
  299 |     await expect(extChips.filter({ hasText: 'None' })).toBeVisible();
  300 | 
  301 |     // Click Minor quality chip
  302 |     await qualityChips.filter({ hasText: 'Minor' }).click();
  303 |     await expect(firstPad.locator('.pad-chord-name')).toHaveText(`${root}m`);
  304 |     await expect(inspector.locator('.detail-quality-box')).toContainText('Minor');
  305 |     await expect(qualityChips.filter({ hasText: 'Minor' })).toHaveClass(/active/);
  306 | 
  307 |     // Mini keyboard has at least one active key
  308 |     await expect(miniKeyboard.locator('.white-key.active, .black-key.active').first()).toBeVisible();
  309 | 
  310 |     // Click Major 7th (M7) extension chip
  311 |     await extChips.filter({ hasText: 'Major 7th (M7)' }).click();
  312 |     await expect(firstPad.locator('.pad-chord-name')).toHaveText(`${root}m(maj7)`);
  313 |     await expect(inspector.locator('.detail-extension-box')).toContainText('Major 7th');
  314 |     await expect(extChips.filter({ hasText: 'Major 7th (M7)' })).toHaveClass(/active/);
  315 | 
  316 |     // Click 7th (dom / m7) extension chip
  317 |     await extChips.filter({ hasText: '7th (dom / m7)' }).click();
> 318 |     await expect(firstPad.locator('.pad-chord-name')).toHaveText(`${root}m7`);
      |                                                       ^ Error: expect(locator).toHaveText(expected) failed
  319 |     await expect(inspector.locator('.detail-extension-box')).toContainText('7th');
  320 | 
  321 |     // Click Suspended (sus) quality chip
  322 |     await qualityChips.filter({ hasText: 'Suspended (sus)' }).click();
  323 |     await expect(firstPad.locator('.pad-chord-name')).toHaveText(`${root}sus7`);
  324 | 
  325 |     // Close detail inspector
  326 |     const closeBtn = inspector.locator('.close-detail-btn');
  327 |     await closeBtn.click();
  328 |     await expect(inspector.locator('.inspector-kicker')).toContainText(/This loop/i);
  329 |   });
  330 | 
  331 |   test('Mobile: Chord Info Sheet allows modifying chord quality and extensions', async ({ page, isMobile }) => {
  332 |     test.skip(!isMobile, 'Mobile chord detail test');
  333 | 
  334 |     const firstPad = page.locator('.pad-cells-grid .pad-cell').first();
  335 |     const initialName = (await firstPad.locator('.pad-chord-name').textContent())?.trim() || 'C';
  336 |     const rootMatch = initialName.match(/^[A-G][#b]?/);
  337 |     const root = rootMatch ? rootMatch[0] : 'C';
  338 | 
  339 |     const eyeBtn = firstPad.locator('.pad-detail-btn');
  340 |     await eyeBtn.click();
  341 | 
  342 |     const sheet = page.locator('.mobile-detail-sheet');
  343 |     await expect(sheet).toBeVisible();
  344 | 
  345 |     // Verify chip grids exist in mobile sheet
  346 |     const qualityChips = sheet.locator('.quality-chips-grid .chord-mod-chip');
  347 |     await expect(qualityChips).toHaveCount(4);
  348 | 
  349 |     const extChips = sheet.locator('.ext-chips-grid .chord-mod-chip');
  350 |     await expect(extChips).toHaveCount(5);
  351 | 
  352 |     // Change to Minor
  353 |     await qualityChips.filter({ hasText: 'Minor' }).click();
  354 |     await expect(firstPad.locator('.pad-chord-name')).toHaveText(`${root}m`);
  355 | 
  356 |     // Change to 6th
  357 |     await extChips.filter({ hasText: '6th' }).click();
  358 |     await expect(firstPad.locator('.pad-chord-name')).toHaveText(`${root}m6`);
  359 | 
  360 |     // Close sheet
  361 |     const closeBtn = sheet.locator('.sheet-cancel-btn');
  362 |     await closeBtn.click();
  363 |     await expect(sheet).not.toBeVisible();
  364 |   });
  365 | });
  366 | 
  367 | 
```