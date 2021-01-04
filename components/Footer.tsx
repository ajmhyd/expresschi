import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='bg-gray-200'>
      <div className='max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8'>
        <p className='mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
          Gateway traffic information courtesy of the Illinois Department of
          Transportation
        </p>
        <div className='mt-8 flex justify-center space-x-6'>
          <Image src='/idotLogo.png' width={400} height={100} />
        </div>
        <p className='mt-8 text-center text-base text-gray-400'>
          Made with ❤ by{' '}
          <a className='text-gray-500' href='https://github.com/ajmhyd'>
            Tësh
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
