'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../app/components/NavBar';
import Footer from '../app/components/Footer';

export default function NavbarFooterWrapper({ children }) {
  const pathname = usePathname();

  const noNavFooterRoutes = ['/admin/login', '/admin/dashboard'];
  const showNavFooter = !noNavFooterRoutes.includes(pathname);

  return (
    <>
      {showNavFooter && <Navbar />}
      {children}
      {showNavFooter && <Footer />}
    </>
  );
}
