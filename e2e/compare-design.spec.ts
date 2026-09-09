import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Visual & Structural Parity: App vs Design Mockup', () => {
  const designPath = 'file:///' + path.resolve('../chroma-chords-design/Chroma Chords App.dc.html').replace(/\\/g, '/');

  test('Desktop: side-by-side visual and computed style inspection', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only');

    // 1. Load Design
    await page.goto(designPath);
    await page.waitForTimeout(1200);

    // Hide the floating preview pill on design if present
    await page.evaluate(() => {
      const topBar = document.querySelector('div[style*="position:fixed"][style*="z-index:200"]');
      if (topBar) (topBar as HTMLElement).style.display = 'none';
    });
    await page.screenshot({ path: 'test-results/design-desktop.png', fullPage: true });

    // Extract key design metrics
    const designMetrics = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      const asideBox = aside ? aside.getBoundingClientRect() : null;

      const stageCards = Array.from(document.querySelectorAll('div')).filter(el => {
        const s = window.getComputedStyle(el);
        return s.borderRadius === '26px' && (s.backgroundColor === 'rgb(246, 234, 219)' || s.backgroundColor === 'rgb(241, 228, 204)');
      });
      const stageCard = stageCards[0];
      const stageBox = stageCard ? stageCard.getBoundingClientRect() : null;

      const padCells = Array.from(document.querySelectorAll('div[tabindex="0"][role="button"]'));
      const padsData = padCells.slice(0, 4).map(p => {
        const s = window.getComputedStyle(p);
        const rect = p.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          borderRadius: s.borderRadius,
          backgroundColor: s.backgroundColor,
          boxShadow: s.boxShadow,
          text: (p as HTMLElement).innerText.split('\n').filter(Boolean)
        };
      });

      const rightAside = Array.from(document.querySelectorAll('aside')).pop();
      const rightBox = rightAside ? rightAside.getBoundingClientRect() : null;
      const rightBg = rightAside ? window.getComputedStyle(rightAside).backgroundColor : null;

      return {
        asideWidth: asideBox?.width,
        stageCard: stageBox ? { width: stageBox.width, height: stageBox.height } : null,
        padsCount: padCells.length,
        padsData,
        rightAsideWidth: rightBox?.width,
        rightAsideBg: rightBg
      };
    });

    console.log('Design Metrics:', JSON.stringify(designMetrics, null, 2));

    // 2. Load Coded App
    await page.goto('http://localhost:43301/');
    await page.waitForTimeout(1200);
    await page.screenshot({ path: 'test-results/app-desktop.png', fullPage: true });

    const appMetrics = await page.evaluate(() => {
      const app = document.querySelector('chroma-chords-app');
      const loop = app?.shadowRoot?.querySelector('loop-screen');
      const root = loop?.shadowRoot || document;

      const rail = root.querySelector('.rail-left');
      const railBox = rail ? rail.getBoundingClientRect() : null;

      const stageCard = root.querySelector('.stage-card');
      const stageBox = stageCard ? stageCard.getBoundingClientRect() : null;

      const padCells = Array.from(root.querySelectorAll('.pad-cells-grid .pad-cell'));
      const padsData = padCells.map(p => {
        const s = window.getComputedStyle(p);
        const rect = p.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          borderRadius: s.borderRadius,
          backgroundColor: s.backgroundColor,
          boxShadow: s.boxShadow,
          text: (p as HTMLElement).innerText.split('\n').filter(Boolean)
        };
      });

      const inspector = root.querySelector('aside.inspector-right');
      const inspectorBox = inspector ? inspector.getBoundingClientRect() : null;
      const inspectorBg = inspector ? window.getComputedStyle(inspector).backgroundColor : null;

      return {
        asideWidth: railBox?.width,
        stageCard: stageBox ? { width: stageBox.width, height: stageBox.height } : null,
        padsCount: padCells.length,
        padsData,
        rightAsideWidth: inspectorBox?.width,
        rightAsideBg: inspectorBg
      };
    });

    console.log('App Metrics:', JSON.stringify(appMetrics, null, 2));

    // Assert parity
    expect(appMetrics.asideWidth).toBeGreaterThanOrEqual(60);
    expect(appMetrics.asideWidth).toBeLessThanOrEqual(65);
    expect(appMetrics.padsCount).toBe(designMetrics.padsCount);
    expect(appMetrics.stageCard?.width).toBeGreaterThan(600);
    expect(appMetrics.rightAsideWidth).toBeGreaterThan(300);

    // Pad cards parity: border radius 20px and key label format ("A", "S", "D", "F")
    for (let i = 0; i < appMetrics.padsData.length; i++) {
      expect(appMetrics.padsData[i].borderRadius).toBe('20px');
      const keyLabel = appMetrics.padsData[i].text[0];
      expect(['A', 'S', 'D', 'F']).toContain(keyLabel);
    }
  });

  test('Mobile: side-by-side visual comparison and controls check', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only');

    // 1. Load Design on Mobile
    await page.goto(designPath);
    await page.waitForTimeout(1000);
    // Click phone preview button if present
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const phoneBtn = buttons.find(b => b.innerText.trim() === 'Phone');
      if (phoneBtn) phoneBtn.click();
      const topBar = document.querySelector('div[style*="position:fixed"][style*="z-index:200"]');
      if (topBar) (topBar as HTMLElement).style.display = 'none';
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/design-mobile.png', fullPage: true });

    // 2. Load Coded App on Mobile
    await page.goto('http://localhost:43301/');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/app-mobile.png', fullPage: true });

    const mobileChecks = await page.evaluate(() => {
      const app = document.querySelector('chroma-chords-app');
      const loop = app?.shadowRoot?.querySelector('loop-screen');
      const root = loop?.shadowRoot || document;

      const vibeToggle = root.querySelector('.mobile-vibe-toggle');
      const viewTabs = root.querySelectorAll('.view-tabs-bar button');
      const padCells = root.querySelectorAll('.pad-cells-grid .pad-cell');
      const transportBar = root.querySelector('.mobile-bottom-transport-bar');
      const transportButtons = transportBar ? transportBar.querySelectorAll('button') : [];

      return {
        vibeToggleVisible: !!vibeToggle,
        viewTabsCount: viewTabs.length,
        padsCount: padCells.length,
        hasTransportBar: !!transportBar,
        transportButtonsCount: transportButtons.length
      };
    });

    expect(mobileChecks.vibeToggleVisible).toBe(true);
    expect(mobileChecks.viewTabsCount).toBe(3);
    expect(mobileChecks.padsCount).toBe(4);
    expect(mobileChecks.hasTransportBar).toBe(true);
    expect(mobileChecks.transportButtonsCount).toBeGreaterThanOrEqual(4); // Play + Dice + Save + Loops + Share
  });
});
