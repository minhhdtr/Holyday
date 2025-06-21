import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='flex flex-col w-full min-h-screen'>
      <Header />
      <Hero />
      <div className='py-10 px-5 md:px-60 flex-1'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
