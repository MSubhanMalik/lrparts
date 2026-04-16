import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LR Parts',
  description: 'Land Rover parts for Ireland and EU buyers.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
