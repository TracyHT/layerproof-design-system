import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const svgGrid = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
</svg>`;
const svgBase64 = Buffer.from(svgGrid).toString('base64');

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Roboto:wght@400&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background: #0a0a0a;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .bg-gradients {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 80% 80% at 50% 30%, color-mix(in srgb, #e8336c 22%, transparent), transparent 65%),
        radial-gradient(ellipse 60% 60% at 80% 80%, color-mix(in srgb, #ffde42 18%, transparent), transparent 60%),
        radial-gradient(ellipse 50% 50% at 50% 50%, color-mix(in srgb, #ffffff 6%, transparent), transparent 55%),
        #0a0a0a;
      z-index: -1;
    }

    .grid-wrapper {
      position: absolute;
      inset: -20px;
      transform: skewY(-6deg);
      transform-origin: top left;
      z-index: 0;
      -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%);
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%);
      pointer-events: none;
    }

    .grid {
      width: 100%;
      height: 100%;
      background-image: url('data:image/svg+xml;base64,${svgBase64}');
      background-size: 40px 40px;
      background-repeat: repeat;
    }

    .content {
      position: relative;
      z-index: 10;
      isolation: isolate;
      text-align: center;
      padding: 0 80px;
      max-width: 1000px;
    }

    h1 {
      font-family: 'Anton', sans-serif;
      font-size: 80px;
      font-weight: 400;
      line-height: 1.0;
      text-transform: uppercase;
      color: #ffffff;
      letter-spacing: 0.02em;
      margin-bottom: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .line-plain {
      display: block;
    }

    .highlight {
      display: inline-block;
      background: #e8336c;
      color: #ffffff;
      padding: 0.08em 0.2em;
      line-height: 1.15;
    }

    p {
      font-family: 'Roboto', sans-serif;
      font-size: 20px;
      font-weight: 400;
      line-height: 1.7;
      color: #d4d4d4;
    }
  </style>
</head>
<body>
  <div class="bg-gradients"></div>
  <div class="grid-wrapper"><div class="grid"></div></div>
  <div class="content">
    <h1>
      <span class="line-plain">LAYERPROOF</span>
      <span class="highlight">DESIGN SYSTEM</span>
    </h1>
    <p>A comprehensive design system built on precision, authority, and clarity.</p>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle0' });
const screenshot = await page.screenshot({ type: 'png' });
const outPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../public/og-image.png'
);
writeFileSync(outPath, screenshot);
await browser.close();
console.log('✓ public/og-image.png written');
