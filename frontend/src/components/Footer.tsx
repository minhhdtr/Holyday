import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-blue-800 py-10 px-60">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Holyday.com</Link>
        </span>
        <span className="text-white font-bold tracking-tight flex gap-5">
          <p className="hover:underline">
            <Link to="/#">About Us</Link>
          </p>
          <p className="hover:underline">
            <Link to="/#">Contact</Link>
          </p>
          <p className="hover:underline">
            <Link to="/#">Privacy Policy</Link>
          </p>
          <p className="hover:underline">
            <Link to="/#">Terms of Service</Link>
          </p>
        </span>
      </div>
    </div>
  );
};

export default Footer;