import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-600 py-10  px-60">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Holyday.com</Link>
        </span>
        <div className="flex space-x-2">
          <Link to="/sign-in" className="flex items-center bg-white text-blue-400 px-3 font-bold hover:bg-gray-100 rounded-md">Sign in</Link>
          <Link to="/sign-up" className="flex items-center bg-white text-blue-400 px-3 font-bold hover:bg-gray-100 rounded-md">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;