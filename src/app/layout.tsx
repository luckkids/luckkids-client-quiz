import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import React from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'luckkids | 럭키즈',
  description:
    '우리는 행운아! 행운을 키우지! 건강하고 긍정적인 몸과 마음을 만드는 습관이 우리의 행운을 키워줄 거예요.',
  keywords: ['습관', '행운', '투두리스트', '계획', '스케쥴'],
  metadataBase: new URL('https://info-luckkids.netlify.app'),
  openGraph: {
    type: 'website',
    title: 'luckkids | 럭키즈',
    description:
      '우리는 행운아! 행운을 키우지! 건강하고 긍정적인 몸과 마음을 만드는 습관이 우리의 행운을 키워줄 거예요.',
    url: 'https://info-luckkids.netlify.app/',
    images: [
      {
        url: '/img/luckkids-share.png',
        width: 1200,
        height: 630,
        alt: 'luckkids',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'luckkids | 럭키즈',
    description:
      '우리는 행운아! 행운을 키우지! 건강하고 긍정적인 몸과 마음을 만드는 습관이 우리의 행운을 키워줄 거예요.',
    images: ['/img/luckkids-share.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/img/apple-icon.png',
    apple: '/img/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
