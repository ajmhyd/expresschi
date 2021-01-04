import type { NextApiRequest, NextApiResponse } from 'next'
import * as playwright from 'playwright-aws-lambda';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  let browser = null;
  let direction: string = 'Unknown';
  let travelTime: string | null = '';
  let averageTravelTime: string | null = '';
  let speed: string | null = '';

  try {
    const browser = await playwright.launchChromium({ headless: true});
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto('https://www.travelmidwest.com/lmiga/traveltimes.jsp?location=GATEWAY.IL.KENNEDY');
    const updatedAt = await page.$eval('.pageHeaderRight', el => el.textContent.trim().split('\n')[0]);

    const travelTimeIn = await page.$eval('[headers=travelTime2]', el => el.textContent);
    const averageTravelTimeIn = await page.$eval('[headers=avgTravelTime2]', el => el.textContent);
    const speedIn = await page.$eval('[headers=speed2]', el => el.textContent);

    const travelTimeOut = await page.$eval('[headers=travelTime3]', el => el.textContent);
    const averageTravelTimeOut = await page.$eval('[headers=avgTravelTime3]', el => el.textContent);
    const speedOut = await page.$eval('[headers=speed3]', el => el.textContent);

    if (travelTimeIn !== 'N/A') {
      direction = 'Inbound',
      travelTime = travelTimeIn;
      averageTravelTime = averageTravelTimeIn;
      speed = speedIn;
    } else if (travelTimeOut !== 'N/A') {
      direction = 'Outbound',
      travelTime = travelTimeOut;
      averageTravelTime = averageTravelTimeOut;
      speed = speedOut;
    }

    res.status(200).json(JSON.stringify({updatedAt, direction, travelTime, averageTravelTime, speed}));
  } catch (error) {
    res.status(500).send({error});
    throw error;
  } finally {
    if (browser) {
      await browser.close();
      res.status(500).end();
    }
  }
}