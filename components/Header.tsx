const Header = () => {
  return (
    <header>
      <div className='flex justify-end mx-auto max-w-7xl px-4'>
        <button
          type='button'
          className='ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Create
        </button>
      </div>
    </header>
  );
};

export default Header;
