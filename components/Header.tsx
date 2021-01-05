import { useTheme } from 'next-themes';

const Header = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header>
      <div className='flex justify-end mx-auto max-w-7xl px-4 mt-10'>
        {resolvedTheme === 'light' ? (
          <button
            onClick={() => setTheme('dark')}
            className='flex items-center justify-center h-12 w-12 rounded-md text-black'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='h-8 w-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => setTheme('light')}
            className='flex items-center justify-center h-12 w-12 rounded-md text-white'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='h-8 w-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
