import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {
  const { isSignedIn } = useAppContext();
  return (
    <div className='bg-blue-800 pt-5 pb-10 px-0 md:px-60'>
      <div className='mx-auto flex justify-between'>
        <span className='text-3xl text-white font-bold tracking-tight'>
          <Link to='/'>Holyday.com</Link>
        </span>
        <div className='flex space-x-3'>
          {isSignedIn ? (
            <>
              <Link
                className='flex items-center rounded-md px-3 text-white font-bold hover:bg-blue-600'
                to='my-bookings'
              >
                My Bookings
              </Link>
              <Link
                className='flex items-center rounded-md px-3 text-white font-bold hover:bg-blue-600'
                to='my-hotels'
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                to='/sign-in'
                className='flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100 rounded-md'
              >
                Sign in
              </Link>
              <Link
                to='/register'
                className='flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100 rounded-md'
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
