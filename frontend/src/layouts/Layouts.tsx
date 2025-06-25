import { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [marginTop, setMarginTop] = useState(0);

  useEffect(() => {
    if (searchBarRef.current) {
      const height = searchBarRef.current.offsetHeight;
      setMarginTop(-height / 2);
    }
  }, []);

  return (
    <div className='flex flex-col w-full min-h-screen'>
      <Header />
      <Hero />
      <div
        ref={searchBarRef}
        className='mx-auto px-5 sm:px-20 lg:px-40 w-full'
        style={{ marginTop: `${marginTop}px` }}
      >
        <SearchBar />
      </div>
      <div className='py-10 px-5 sm:px-20 lg:px-40 flex-1'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
