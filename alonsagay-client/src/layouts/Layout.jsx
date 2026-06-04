import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer';
import Navbar from '../components/NavBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#fff9ea]">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;