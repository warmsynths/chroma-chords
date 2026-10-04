import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as http from 'http';
import * as fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/d384512/.gemini/antigravity-ide/brain/8dd2a434-56ab-4ed8-8815-202cb8127bed';
const DESIGN_DIR = 'c:/reyn/Projects/chroma-chords-design';
const DESIGN_PORT = 43302;

let designServer: http.Server;

test.beforeAll(async () => {
  designServer = http.createServer((req, res) => {
    let reqUrl = decodeURIComponent(req.url?.split('?')[0] || '/');
    if (reqUrl === '/') reqUrl = '/Chroma Melody.dc.html';
    const filePath = path.join(DESIGN_DIR, reqUrl);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      if (filePath.endsWith('.html')) res.setHeader('Content-Type', 'text/html; charset=utf-8');
      else if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      else if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css; charset=utf-8');
      else if (filePath.endsWith('.json')) res.setHeader('Content-Type', 'application/json; charset=utf-8');
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });
  await new Promise<void>((resolve) => designServer.listen(DESIGN_PORT, resolve));
});

test.afterAll(async () => {
  if (designServer) {
    await new Promise<void>((resolve) => designServer.close(() => resolve()));
  }
});

test.describe('Playwright Deep Comparison: Prototype Chroma Melody vs Our App', () => {
  test('Capture prototype and app states across Melody features', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop inspection');

    // 1. Load Chroma Melody prototype via HTTP
    console.log('Loading Prototype Chroma Melody via HTTP...');
    await page.goto(`http://localhost:${DESIGN_PORT}/Chroma%20Melody.dc.html`);
    await page.waitForTimeout(2000);

    // Initial Chords view
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'playwright_proto_chords_view.png'),
    });

    // Click Melody Tab in prototype
    console.log('Navigating to Melody tab in prototype...');
    const protoMelodyTab = page.locator('button, [role="button"], div, a').filter({ hasText: /^Melody$/i }).first();
    await expect(protoMelodyTab).toBeVisible({ timeout: 10000 });
    await protoMelodyTab.click();
    await page.waitForTimeout(1500);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'playwright_proto_melody_tab.png'),
    });

    // In Prototype Melody view, check if dc-import MelodyGrid is loaded
    // Try clicking a step cell to open bloom keyboard
    const protoStep = page.locator('[data-step]').first();
    if (await protoStep.isVisible()) {
      await protoStep.click();
      await page.waitForTimeout(600);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'playwright_proto_melody_bloomed.png'),
      });
    }

    // 2. Also load standalone MelodyGrid for pristine engine comparison
    console.log('Loading Prototype MelodyGrid.dc.html via HTTP...');
    await page.goto(`http://localhost:${DESIGN_PORT}/MelodyGrid.dc.html`);
    await page.waitForTimeout(1500);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'playwright_proto_melodygrid_initial.png'),
    });

    // Bloom keyboard on an existing note if any, or empty step
    const gridStep = page.locator('[data-step]').first();
    if (await gridStep.isVisible()) {
      await gridStep.click();
      await page.waitForTimeout(600);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'playwright_proto_melodygrid_bloomed.png'),
      });
    }

    // 3. Load our App
    console.log('Loading Our App at http://localhost:43301/ ...');
    await page.goto('http://localhost:43301/');
    const app = page.locator('chroma-chords-app');
    await expect(app).toBeVisible({ timeout: 20000 });

    // Switch to Melody tab
    await app.locator('.nav-tab-btn', { hasText: 'Melody' }).click();
    await page.waitForTimeout(800);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'playwright_app_melody_initial.png'),
    });

    // Click step cell with existing note to bloom keyboard
    const noteCell = app.locator('tab-melody .step-cell.has-note.is-note-start').first();
    await noteCell.click();
    await page.waitForTimeout(600);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'playwright_app_melody_note_bloomed.png'),
    });

    // Hover over a key in the micro-keyboard (e.g. C key)
    const cKey = app.locator('tab-melody .white-key').first();
    await cKey.hover();
    await page.waitForTimeout(300);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'playwright_app_melody_key_hovered.png'),
    });

    // Close bloom with Escape key
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // Click an empty step to verify the 36px bloomed empty ring
    const emptyStep = app.locator('tab-melody .step-cell:not(.has-note)').first();
    await emptyStep.click();
    await page.waitForTimeout(600);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'playwright_app_melody_empty_bloomed.png'),
    });

    // Click a key on the micro-keyboard to place a note
    const gKey = app.locator('tab-melody .white-key').nth(4); // G key
    await gKey.click();
    await page.waitForTimeout(400);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'playwright_app_melody_note_placed.png'),
    });

    // Close bloom
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // Test dragging the tail of a note
    const tailGrip = app.locator('tab-melody .tail-grip').first();
    if (await tailGrip.isVisible()) {
      const box = await tailGrip.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + 80, box.y, { steps: 5 });
        await page.mouse.up();
        await page.waitForTimeout(400);
      }
    }

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'playwright_app_melody_tail_dragged.png'),
    });
  });
});

