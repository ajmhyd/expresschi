import type { NextApiRequest, NextApiResponse } from 'next'
import * as playwright from 'playwright-aws-lambda';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  let browser = null;
  try {
    const browser = await playwright.launchChromium({ headless: true});
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto('https://www.travelmidwest.com/lmiga/traveltimes.jsp?location=GATEWAY.IL.KENNEDY');
    const travelTimeIn = await page.$eval('[headers=travelTime2]', el => el.textContent);
    const travelTimeOut = await page.$eval('[headers=travelTime3]', el => el.textContent);

    res.status(200).json(JSON.stringify({travelTimeIn, travelTimeOut}));
  } catch (error) {
    throw error;
    res.status(500).send({error});
  } finally {
    if (browser) {
      await browser.close();
      res.status(500).end();
    }
  }
}
