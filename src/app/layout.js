import { Inter } from 'next/font/google';
import './globals.css';

import NavbarFooterWrapper from './NavbarFooterWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Team Techno',
  description: 'A beautiful, responsive web application built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarFooterWrapper>
          {children}
        </NavbarFooterWrapper>
      </body>
    </html>
  );
}
