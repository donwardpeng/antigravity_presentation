import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ARTIFACT_DIR = '/Users/donward/.gemini/antigravity/brain/a3ebc007-24eb-40c1-86e9-06130527523e';

async function capture() {
  console.log('🚀 Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const targetUrl = 'http://localhost:8080/download#antigravity-ide';
  console.log(`🌐 Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Scroll into view of #antigravity-ide
  console.log('📜 Scrolling into #antigravity-ide section...');
  await page.evaluate(() => {
    const el = document.getElementById('antigravity-ide');
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1000));

  const ideSectionPath = path.join(ARTIFACT_DIR, 'antigravity_ide_section.png');
  console.log(`📸 Taking screenshot at ${ideSectionPath}...`);
  await page.screenshot({ path: ideSectionPath, fullPage: false });

  // 2. Scroll all the way down to bottom
  console.log('📜 Scrolling page to bottom...');
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
  });
  await new Promise(r => setTimeout(r, 1000));

  const scrolledBottomPath = path.join(ARTIFACT_DIR, 'antigravity_download_scrolled_bottom.png');
  console.log(`📸 Taking scrolled bottom screenshot at ${scrolledBottomPath}...`);
  await page.screenshot({ path: scrolledBottomPath, fullPage: false });

  // 3. Full page screenshot
  const fullpagePath = path.join(ARTIFACT_DIR, 'antigravity_download_fullpage.png');
  console.log(`📸 Taking full page screenshot at ${fullpagePath}...`);
  await page.screenshot({ path: fullpagePath, fullPage: true });

  await browser.close();
  console.log('✅ All screenshots captured!');
}

capture().catch(err => {
  console.error('❌ Error capturing screenshot:', err);
  process.exit(1);
});
