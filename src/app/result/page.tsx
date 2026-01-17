'use client';
import Section from '@/components/core/coreSection';
import Content from '@/components/core/coreContent';
import Image from 'next/image';
import styled from '@emotion/styled';
import mq from '@/util/mq';
import { createImageSaveHandler } from '@/util/image';
import { copyToClipboard, getShareContextInfo, share } from '@/util/share';

const S = {
  Disclaimer: styled.span(
    mq({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: ['4px'],
      marginTop: ['20px'],
      fontSize: ['15px'],
      color: '#666E79',
    })
  ),
  Triangle: styled.span(
    mq({
      display: 'block',
      width: '10px',
      height: '10px',
    })
  ),
  More: styled.a(
    mq({
      display: 'inline-block',
      fontSize: ['16px'],
      padding: ['15px 30px'],
      margin: '0 auto',
      background: '#24303F',
      borderRadius: ['30px'],
      color: '#fff',
    })
  ),
  ButtonWrap: styled.div(
    mq({
      padding: ['0 5px'],
    })
  ),
};

export default function Result() {
  const handleImageContextMenu = createImageSaveHandler(
    '/apple-icon.png',
    'luckkids-icon.png'
  );

  const handleShare = async () => {
    // 컨텍스트 정보 확인
    const contextInfo = getShareContextInfo();
    if (!contextInfo.supported) {
      // Fallback: 클립보드에 URL 복사
      await copyToClipboard(window.location.href);
      return;
    }

    await share({
      title: '럭키즈 오행 테스트',
      text: '나의 오행을 확인해보세요!',
      url: window.location.href,
    });
  };

  return (
    <Section>
      <Content>
        <figure>
          {/*<Image
            width={'384'}
            height={'705'}
            unoptimized
            src="/img/result-naby.jpg"
            alt="result"
            style={{ width: '100%', height: 'auto' }}
          />*/}
          <img
            src="/img/result-naby.jpg"
            alt=""
            style={{ width: '100%' }}
            onContextMenu={handleImageContextMenu}
          />
        </figure>
        <S.Disclaimer>
          <S.Triangle>
            <Image
              width={'10'}
              height={'9'}
              src="/img/icon/icon-triangle.svg"
              alt={''}
              style={{ display: 'block' }}
            />
          </S.Triangle>
          이미지를 우클릭하여 나의 개운법을 저장하세요
        </S.Disclaimer>
      </Content>
      <Content
        css={mq({
          padding: ['0 20px'],
          textAlign: 'center',
        })}
      >
        <article style={{ textAlign: 'left' }}>
          <strong>행운아 도니 님의 개운법은 ‘시작'</strong>
          <p>
            개운 루틴이 어렵게 느껴질 때는, <br />앱 ‘luckkids 럭키즈’를
            활용해보자.
          </p>
          <p>
            럭키즈와 함께면 정해진 시간마다 행운의 습관을 알림 받고, 습관을
            수행할 때마다 함께 성장하는 럭키즈 캐릭터와 개운법을 실천할 수 있다.
          </p>
          <p>작은 습관이 쌓이면 운의 흐름이 서서히 트여갈 것이다.</p>
        </article>
        <S.More href={'https://naver.com'} target={'_blank'}>
          럭키즈 알아보기
        </S.More>
      </Content>
    </Section>
  );
}
