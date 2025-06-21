import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-blue-800 py-10 px-0 md:px-60'>
      <div className='mx-auto flex flex-col md:flex-row justify-between items-center gap-5'>
        <span className='text-3xl text-white font-bold tracking-tight'>
          <Link to='/'>Holyday.com</Link>
        </span>
        <div className='flex text-white font-bold tracking-tight gap-5'>
          <p className='hover:underline'>
            <Link to='/#'>About Us</Link>
          </p>
          <p className='hover:underline'>
            <Link to='/#'>Contact</Link>
          </p>
          <p className='hover:underline'>
            <Link to='/#'>Privacy Policy</Link>
          </p>
          <p className='hover:underline'>
            <Link to='/#'>Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
