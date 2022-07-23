import { GetServerSideProps } from 'next';
import TravelTimeDifference from 'components/TravelTimeDifference';
import Congestion from 'components/Congestion';
import Footer from 'components/Footer';
import Header from 'components/Header';
import * as playwright from 'playwright-aws-lambda';
import Head from 'next/head';

type IndexPageProps = {
  data: {
    updatedAt: string;
    direction: string;
    travelTime: string;
    averageTravelTime: string;
    speed: string;
  };
};

export default function IndexPage({ data }: IndexPageProps) {
  return (
    <>
      <Head>
        <title>ExpressChi | Chicago Express Lane Status</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex flex-col h-screen bg-gray-200 dark:bg-gray-800'>
        <Header />
        <main className='mt-10 mx-auto mb-auto max-w-7xl px-4'>
          <div className='text-center'>
            <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl'>
              <span className='block xl:inline'>
                {' '}
                Chicago Express Lane Status
              </span>
            </h1>
            <p className='mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
              Up to date information on the Chicago Kennedy Express lanes
            </p>
          </div>
          <div className='mt-8'>
            <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-white mb-6'>
              {data?.updatedAt}
            </h3>
            {data.direction === 'Unknown' ? (
              <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl'>
                <span className='block xl:inline'>Status: </span>
                <span className='block text-blue-300 xl:inline'>Unknown</span>
              </h1>
            ) : (
              <dl className='mt-5 grid grid-cols-1 rounded-lg bg-white dark:bg-gray-900 overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x'>
                <div>
                  <div className='px-4 py-5 sm:p-6'>
                    <dt className='text-base font-normal  text-gray-900 dark:text-white'>
                      Direction
                    </dt>
                    <dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
                      <div className='flex items-baseline text-2xl font-semibold text-blue-300'>
                        {data.direction}
                      </div>
                    </dd>
                  </div>
                </div>

                <div>
                  <div className='px-4 py-5 sm:p-6'>
                    <dt className='text-base font-normal text-gray-900 dark:text-white'>
                      Travel Time
                    </dt>
                    <dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
                      <div className='flex items-baseline text-2xl mr-2 font-semibold text-blue-300'>
                        {data.travelTime} minutes
                        <span className='ml-2 text-sm font-medium text-gray-500'>
                          {data.averageTravelTime} min avg
                        </span>
                      </div>

                      <TravelTimeDifference
                        travelTime={+data.travelTime}
                        averageTravelTime={+data.averageTravelTime}
                      />
                    </dd>
                  </div>
                </div>

                <div>
                  <div className='px-4 py-5 sm:p-6'>
                    <dt className='text-base font-normal text-gray-900 dark:text-white'>
                      Speed
                    </dt>
                    <dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
                      <div className='flex items-baseline text-2xl font-semibold text-blue-300'>
                        {data.speed} mph
                      </div>
                      <Congestion speed={+data.speed} />
                    </dd>
                  </div>
                </div>
              </dl>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let browser: any = null;
  let direction: string = 'Unknown';
  let travelTime: string | null = '';
  let averageTravelTime: string | null = '';
  let speed: string | null = '';
  let data = {};
  try {
    const browser = await playwright.launchChromium({ headless: true });
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(
      'https://www.travelmidwest.com/lmiga/traveltimes.jsp?location=GATEWAY.IL.KENNEDY'
    );
    const updatedAt = await page.$eval(
      '.pageHeaderRight',
      (el: any) => el.textContent?.trim().split('\n')[0]
    );

    const travelTimeIn = await page.$eval(
      '[headers=travelTime2]',
      (el) => el.textContent
    );
    const averageTravelTimeIn = await page.$eval(
      '[headers=avgTravelTime2]',
      (el) => el.textContent
    );
    const speedIn = await page.$eval(
      '[headers=speed2]',
      (el) => el.textContent
    );

    const travelTimeOut = await page.$eval(
      '[headers=travelTime3]',
      (el) => el.textContent
    );
    const averageTravelTimeOut = await page.$eval(
      '[headers=avgTravelTime3]',
      (el) => el.textContent
    );
    const speedOut = await page.$eval(
      '[headers=speed3]',
      (el) => el.textContent
    );

    if (travelTimeIn !== 'N/A') {
      (direction = 'Inbound'), (travelTime = travelTimeIn);
      averageTravelTime = averageTravelTimeIn;
      speed = speedIn;
    } else if (travelTimeOut !== 'N/A') {
      (direction = 'Outbound'), (travelTime = travelTimeOut);
      averageTravelTime = averageTravelTimeOut;
      speed = speedOut;
    }

    data = { updatedAt, direction, travelTime, averageTravelTime, speed };
  } catch (error) {
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  return { props: { data } };
};
