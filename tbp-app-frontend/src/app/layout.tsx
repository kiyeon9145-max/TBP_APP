import type { Metadata } from 'next';
import { QueryProvider } from '@/providers/query-provider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'PDS - Player Development System',
  description: 'TBP 선수 성장 기록 시스템',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
