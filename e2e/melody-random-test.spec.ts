import { test, expect } from '@playwright/test';
import * as path from 'path';

const ARTIFACT_DIR = 'C:/Users/d384512/.gemini/antigravity-ide/brain/8dd2a434-56ab-4ed8-8815-202cb8127bed';

test.describe('Melody Manual Random & Empty Initial State', () => {
  test('Melody is empty on load, generates via Random button, varies on Try another, and can be cleared', async ({ page }) => {
    await page.goto('http://localhost:43301/');
    const app = page.locator('chroma-chords-app');
    await expect(app).toBeVisible({ timeout: 20000 });

    // Switch to Melody tab
    await app.locator('.nav-tab-btn', { hasText: 'Melody' }).click();
    await page.waitForTimeout(1000);

    const tabMelody = app.locator('tab-melody');
    await expect(tabMelody).toBeVisible();

    // Verify initial state: 0 notes
    const noteCountEl = tabMelody.locator('.note-count');
    await expect(noteCountEl).toHaveText('0 notes');

    // Verify Random button is visible
    const randomBtn = tabMelody.locator('.random-melody-btn');
    await expect(randomBtn).toBeVisible();
    await expect(randomBtn).toContainText('Randomize');

    // Verify Clear button is NOT visible when note count is 0
    const clearBtn = tabMelody.locator('.clear-melody-btn');
    await expect(clearBtn).toHaveCount(0);

    // Screenshot initial empty state
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'melody_empty_initial_state.png'),
    });

    // 1. Click Randomize button
    console.log('Clicking Randomize button (1st time)...');
    await randomBtn.click();
    await page.waitForTimeout(800);

    // Verify notes are now generated (> 0 notes) and button text is 'Try another'
    const count1 = await noteCountEl.textContent();
    console.log('Note count after 1st generation:', count1);
    expect(count1).not.toContain('0 notes');
    await expect(randomBtn).toContainText('Try another');
    await expect(tabMelody.locator('.clear-melody-btn')).toBeVisible();

    // Collect first note positions & pitches
    const notePads1 = await tabMelody.locator('.note-badge').allTextContents();
    const noteSteps1 = await tabMelody.locator('.step-cell.has-note.is-note-start').evaluateAll((cells) =>
      cells.map(c => c.getAttribute('data-step'))
    );
    console.log('1st melody note steps:', noteSteps1.join(','));
    console.log('1st melody pitches:', notePads1.join(','));

    // Screenshot 1st generated melody
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'melody_generation_1.png'),
    });

    // 2. Click "Try another" button (2nd time)
    console.log('Clicking Try another button (2nd time)...');
    await randomBtn.click();
    await page.waitForTimeout(800);

    const count2 = await noteCountEl.textContent();
    console.log('Note count after 2nd generation:', count2);

    const notePads2 = await tabMelody.locator('.note-badge').allTextContents();
    const noteSteps2 = await tabMelody.locator('.step-cell.has-note.is-note-start').evaluateAll((cells) =>
      cells.map(c => c.getAttribute('data-step'))
    );
    console.log('2nd melody note steps:', noteSteps2.join(','));
    console.log('2nd melody pitches:', notePads2.join(','));

    // Verify the second melody is NOT identical to the first melody!
    const isDifferent = (noteSteps1.join(',') !== noteSteps2.join(',')) || (notePads1.join(',') !== notePads2.join(','));
    expect(isDifferent).toBe(true);

    // Screenshot 2nd generated melody
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'melody_generation_2.png'),
    });

    // 3. Click "Try another" button (3rd time)
    console.log('Clicking Try another button (3rd time)...');
    await randomBtn.click();
    await page.waitForTimeout(800);

    const noteSteps3 = await tabMelody.locator('.step-cell.has-note.is-note-start').evaluateAll((cells) =>
      cells.map(c => c.getAttribute('data-step'))
    );
    console.log('3rd melody note steps:', noteSteps3.join(','));

    // Screenshot 3rd generated melody
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'melody_generation_3.png'),
    });

    // 4. Click Clear button
    console.log('Clicking Clear button...');
    await tabMelody.locator('.clear-melody-btn').click();
    await page.waitForTimeout(500);

    // Verify note count is back to 0 notes
    await expect(noteCountEl).toHaveText('0 notes');
    await expect(randomBtn).toContainText('Randomize');
    await expect(tabMelody.locator('.clear-melody-btn')).toHaveCount(0);
  });
});
