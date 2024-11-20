import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import dynamic from 'next/dynamic';
import Container from '@/components/layout/Container';

const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'IPM Project',
  description: 'IPM Project 2024/25',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Container>
          <Navbar />
          <div className="flex-1 flex flex-col overflow-y-auto">
            {children}
          </div>
          <Footer />
        </Container>
      </body>
    </html>
  );
}
