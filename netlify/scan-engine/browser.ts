/**
 * A real Chromium, locally and on Netlify.
 *
 * On Netlify (AWS Lambda, Linux) the browser comes from @sparticuz/chromium-min,
 * which downloads a Lambda-compatible Chromium pack into /tmp on a cold start.
 * Locally it uses the Chrome installed on the machine (or CHROME_PATH).
 */
import puppeteer, { type Browser } from 'puppeteer-core';

const PACK_URL =
  process.env.CHROMIUM_PACK_URL ||
  'https://github.com/Sparticuz/chromium/releases/download/v153.0.0/chromium-v153.0.0-pack.x64.tar';

const LOCAL_CHROME: Record<string, string> = {
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  linux: '/usr/bin/google-chrome',
};

// netlify dev also sets Lambda variables locally, so require Linux as well.
const onLambda = () =>
  process.platform === 'linux' && Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT) && !process.env.CHROME_PATH;

export const launchBrowser = async (): Promise<Browser> => {
  if (onLambda()) {
    const { default: chromium } = await import('@sparticuz/chromium-min');
    chromium.setGraphicsMode = false;
    return puppeteer.launch({
      args: [...chromium.args, '--lang=da-DK'],
      executablePath: await chromium.executablePath(PACK_URL),
      headless: true,
      defaultViewport: null,
    });
  }
  return puppeteer.launch({
    executablePath: process.env.CHROME_PATH || LOCAL_CHROME[process.platform],
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--lang=da-DK', '--hide-scrollbars'],
    defaultViewport: null,
  });
};
