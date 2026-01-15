'use client';
import Section from '@/components/core/coreSection';
import Content from '@/components/core/coreContent';
import Image from 'next/image';

export default function Result() {
  return (
    <Section>
      <Content>
        <figure>
          <Image
            width={'385'}
            height={'670'}
            src="/img/result-naby.jpg"
            alt="result"
          />
        </figure>
      </Content>
    </Section>
  );
}
