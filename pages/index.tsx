import { GetServerSideProps } from 'next';
import axios from 'axios';

export default function IndexPage({ data }) {
  console.log({ data });
  return (
    <div className='py-20'>
      <main className='mt-16 mx-auto max-w-7xl px-4 sm:mt-24'>
        <div className='text-center'>
          <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
            <span className='block xl:inline'>
              {' '}
              Chicago Express Lane Status
            </span>
          </h1>
          <p className='mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
            Up to date information on the Chicago Kennedy Express lanes
          </p>
        </div>
        <div>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            {data?.updatedAt}
          </h3>
          <dl className='mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x'>
            <div>
              <div className='px-4 py-5 sm:p-6'>
                <dt className='text-base font-normal text-gray-900'>
                  Direction
                </dt>
                <dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
                  <div className='flex items-baseline text-2xl font-semibold text-blue-300'>
                    71,897
                  </div>
                </dd>
              </div>
            </div>

            <div>
              <div className='px-4 py-5 sm:p-6'>
                <dt className='text-base font-normal text-gray-900'>
                  Travel Time
                </dt>
                <dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
                  <div className='flex items-baseline text-2xl font-semibold text-blue-300'>
                    58.16%
                    <span className='ml-2 text-sm font-medium text-gray-500'>
                      from 56.14%
                    </span>
                  </div>

                  <div className='inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0'>
                    <svg
                      className='-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='sr-only'>Increased by</span>
                    2.02%
                  </div>
                </dd>
              </div>
            </div>

            <div>
              <div className='px-4 py-5 sm:p-6'>
                <dt className='text-base font-normal text-gray-900'>
                  Congestion Level
                </dt>
                <dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
                  <div className='flex items-baseline text-2xl font-semibold text-blue-300'>
                    24.57%
                    <span className='ml-2 text-sm font-medium text-gray-500'>
                      from 28.62%
                    </span>
                  </div>

                  <div className='inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 md:mt-2 lg:mt-0'>
                    <svg
                      className='-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='sr-only'>Decreased by</span>
                    4.05%
                  </div>
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('http://localhost:3000/api/kennedy');
  const data = await res.json();
  return { props: { data } };
};
