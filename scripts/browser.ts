import * as puppeteer from "npm:puppeteer";

const folder = Deno.args[0] || "";
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://garcez.dev");
  const path = `${folder}/screenshot.png`;
  await page.screenshot({ path, fullPage: true });
  await browser.close();
  console.log(`Screenshot path: ${path}`);
})();
