import { Inter } from 'next/font/google';
import Navbar from '../app/components/NavBar';
import Footer from '../app/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Your Company - Modern Next.js Application',
  description: 'A beautiful, responsive web application built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}