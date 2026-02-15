import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: '개운법 테스트 | 내 운이 트이는 방법은?',
  description:
    '언제까지나 행운을 기다릴 수만은 없으니까, 내 운이 트이는 개운법을 알아가보자!',
  keywords: ['습관', '행운', '투두리스트', '계획', '스케쥴', '오행'],
  metadataBase: new URL('https://quiz.luckkids.co.kr/'),
  openGraph: {
    type: 'website',
    title: '개운법 테스트 | 내 운이 트이는 방법은?',
    description:
      '언제까지나 행운을 기다릴 수만은 없으니까, 내 운이 트이는 개운법을 알아가보자!',
    url: 'https://quiz.luckkids.co.kr/',
    images: [
      {
        url: '/img/luckkids-share.jpg',
        width: 800,
        height: 400,
        alt: 'luckkids',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: '개운법 테스트 | 내 운이 트이는 방법은?',
    description:
      '언제까지나 행운을 기다릴 수만은 없으니까, 내 운이 트이는 개운법을 알아가보자!',
    images: ['/img/luckkids-share.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <GoogleAnalytics gaId={'G-PRLERHPBK6'} />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
