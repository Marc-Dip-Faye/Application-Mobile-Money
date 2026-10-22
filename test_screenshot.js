const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'desktop_preview.png', fullPage: true });

  // Mobile screenshot
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: 'mobile_preview.png' });

  await browser.close();
  console.log('Screenshots generated successfully');
})();
