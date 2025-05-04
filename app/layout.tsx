import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Fúria Fã CS Chat',
  description: 'Desenvolvido pela Fúria',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col" cz-shortcut-listen="true">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
