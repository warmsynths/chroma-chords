import { test, expect } from '@playwright/test';
import * as path from 'path';

const ARTIFACT_DIR = 'C:/Users/d384512/.gemini/antigravity-ide/brain/8dd2a434-56ab-4ed8-8815-202cb8127bed';

test.describe('Capture Visual Screenshots of Chroma Chords UI', () => {
  test('Desktop: Capture Chords, Melody, Bloom, Song, and Play it tabs', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop screenshots');

    await page.goto('/');
    const app = page.locator('chroma-chords-app');
    await expect(app).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(600);

    // 1. Chords Tab
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_desktop_chords.png'),
      fullPage: false,
    });

    // 1a. Voicing & Extension Click Visualizer on Chord Card
    const firstPad = app.locator('tab-chords .pad-cell').first();
    const padBox = await firstPad.boundingBox();
    if (padBox) {
      await page.mouse.move(padBox.x + padBox.width * 0.7, padBox.y + padBox.height * 0.2);
      await page.mouse.down();
      await page.waitForTimeout(200);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'screenshot_desktop_chord_voicing_reach.png'),
        fullPage: false,
      });
      await page.mouse.up();
      await page.waitForTimeout(200);
    }

    // 1b. Vibe Popover with Click Overlay
    await app.locator('tab-chords .vibe-pill-btn').click();
    await expect(app.locator('.vibe-popover')).toBeVisible();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_desktop_vibe.png'),
      fullPage: false,
    });
    // Click overlay to close
    await app.locator('.vibe-overlay').click({ position: { x: 10, y: 10 } });
    await expect(app.locator('.vibe-popover')).not.toBeVisible();

    // 1c. Swap Drawer (opened under chord pad 1)
    await app.locator('tab-chords .pad-tray-btn').first().click();
    await expect(app.locator('chord-swap-lane')).toBeVisible();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_desktop_swap_drawer.png'),
      fullPage: false,
    });
    // Click swap chip and capture swapped state
    await app.locator('chord-swap-lane .tray-chip').nth(1).click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_desktop_swap_drawer_swapped.png'),
      fullPage: false,
    });
    // Close swap drawer
    await app.locator('chord-swap-lane .tray-close-btn').click();
    await expect(app.locator('chord-swap-lane')).not.toBeVisible();

    // 1d. Transport Sound Popover
    await app.locator('transport-bar .tb-btn', { hasText: 'Sound' }).click();
    await expect(app.locator('transport-bar .sound-popover')).toBeVisible();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_desktop_sound_popover.png'),
      fullPage: false,
    });
    await app.locator('transport-bar .backdrop').click({ position: { x: 10, y: 10 } });

    // 1e. Loops Popover Menu
    await app.locator('chord-inspector .action-btn', { hasText: /Loops/i }).click();
    await expect(app.locator('chord-inspector .popover-menu')).toBeVisible();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_desktop_loops_popover.png'),
      fullPage: false,
    });
    await app.locator('chord-inspector .action-btn', { hasText: /Loops/i }).click();

    // 1f. Theory Mode Scale Strip
    await app.locator('.theory-nav-toggle').click();
    await expect(app.locator('tab-chords .scale-diatonic-strip')).toBeVisible();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_desktop_theory_scale.png'),
      fullPage: false,
    });
    // Toggle theory back off
    await app.locator('.theory-nav-toggle').click();
    await expect(app.locator('tab-chords .scale-diatonic-strip')).not.toBeVisible();

    // 2. Melody Tab
    await app.locator('.nav-tab-btn', { hasText: 'Melody' }).click();
    await expect(app.locator('tab-melody')).toBeVisible();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_desktop_melody.png'),
      fullPage: false,
    });

    // 3. Bloom Note Picker Popover in Melody Tab
    await app.locator('tab-melody .step-cell').first().click();
    await expect(app.locator('tab-melody .bloom-popover')).toBeVisible();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_desktop_melody_bloom.png'),
      fullPage: false,
    });
    // Close bloom
    await app.locator('tab-melody .bloom-overlay').click({ position: { x: 10, y: 10 } });

    // 4. Song Tab
    await app.locator('.nav-tab-btn', { hasText: 'Song' }).click();
    await expect(app.locator('tab-song')).toBeVisible();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_desktop_song.png'),
      fullPage: false,
    });

    // 5. Play it Tab
    await app.locator('.nav-tab-btn', { hasText: 'Play it' }).click();
    await expect(app.locator('tab-play')).toBeVisible();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_desktop_play.png'),
      fullPage: false,
    });

    // 6. Share Modal
    const shareBtn = app.locator('transport-bar .share-btn');
    await shareBtn.click();
    await expect(app.locator('share-modal .share-drawer')).toHaveClass(/open/);
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_desktop_share_modal.png'),
      fullPage: false,
    });
    await app.locator('share-modal .close-btn').click();
    await expect(app.locator('share-modal .share-drawer')).not.toHaveClass(/open/);
  });

  test('Mobile: Capture Mobile Layout', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile screenshots');

    await page.goto('/');
    const app = page.locator('chroma-chords-app');
    await expect(app).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(600);

    // Mobile Chords Tab
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_mobile_chords.png'),
      fullPage: false,
    });

    // Mobile Melody Tab
    await app.locator('.nav-tab-btn', { hasText: 'Melody' }).click();
    await expect(app.locator('tab-melody')).toBeVisible();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_mobile_melody.png'),
      fullPage: false,
    });

    // Mobile Song Tab
    await app.locator('.nav-tab-btn', { hasText: 'Song' }).click();
    await expect(app.locator('tab-song')).toBeVisible();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_mobile_song.png'),
      fullPage: false,
    });

    // Mobile Play it Tab
    await app.locator('.nav-tab-btn', { hasText: 'Play it' }).click();
    await expect(app.locator('tab-play')).toBeVisible();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'screenshot_mobile_play.png'),
      fullPage: false,
    });
  });
});
