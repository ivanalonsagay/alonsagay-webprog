import { Outlet } from 'react-router-dom';

import NavBar from './NavBar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#fff9ea]">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;