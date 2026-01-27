'use client';
import Section from '@/components/core/coreSection';
import Content from '@/components/core/coreContent';
import Image from 'next/image';
import styled from '@emotion/styled';
import mq from '@/util/mq';
import { createImageSaveHandler } from '@/util/image';
import { copyToClipboard, getShareContextInfo, share } from '@/util/share';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Constants } from '@/constants';
import { TQuizType } from '@/interface/interface';

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
      fontWeight: 600,
      padding: ['15px 30px'],
      margin: '0 auto',
      background: '#24303F',
      borderRadius: ['30px'],
      color: '#fff',
    })
  ),
  ButtonWrap: styled.div(
    mq({
      padding: ['35px 5px'],
      fontWeight: 600,
      fontSize: ['17px'],
      display: 'flex',
      gap: ['8px'],
    })
  ),
  ShareButton: styled.button(
    mq({
      flex: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      padding: ['18px 0'],
      background: '#FEE500',
      borderRadius: ['16px'],
      cursor: 'pointer',
      gap: ['8px'],
    })
  ),
  RetryButton: styled.a(
    mq({
      flex: 1,
      fontSize: 'inherit',
      fontWeight: 'inherit',
      padding: ['18px 0'],
      background: '#24303F',
      color: '#fff',
      borderRadius: ['16px'],
      cursor: 'pointer',
    })
  ),
  TextWrap: styled.article(
    mq({
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      fontSize: ['16px'],
      lineHeight: 24 / 16,
      gap: ['30px'],
      margin: ['30px 0 35px'],
      color: '#24303F',
      em: {
        fontStyle: 'normal',
        fontWeight: 600,
      },
    })
  ),
  Title: styled.strong(
    mq({
      fontSize: ['20px'],
      lineHeight: 25 / 20,
      fontWeight: 600,
    })
  ),
  Svg: styled.span(
    mq({
      display: 'block',
      width: ['24px'],
      fontSize: 0,
    })
  ),
};

interface IResponse {
  id: string;
  nickname: string;
  resultType: TQuizType;
}

const resultImage = (resultType?: TQuizType) => {
  switch (resultType) {
    case 'TOKKINGI':
      return '/img/result-tokkingi.jpg';
    case 'TAEYANGI':
      return '/img/result-taeyangi.jpg';
    case 'NABY':
      return '/img/result-naby.jpg';
    case 'TURKEYI':
      return '/img/result-turkeyi.jpg';
    case 'GURUMI':
      return '/img/result-gurumi.jpg';
    default:
      return '/img/result-naby.jpg';
  }
};

export default function Result() {
  const { uuid } = useParams();
  const navigate = useRouter();
  const [result, setResult] = useState<IResponse>();
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
      url: window.location.href,
      ...(result?.nickname && {
        text: `${result?.nickname}님의 오행 결과를 확인해 보세요!`,
      }),
    });
  };

  useEffect(() => {
    if (!uuid) navigate.push('/');

    const getResult = async () => {
      try {
        const response = await fetch(`${Constants.POST_URL}?uuid=${uuid}`);
        return response.json();
      } catch {}
    };

    getResult().then((r) => setResult(r.data));
  }, []);

  if (!result?.nickname) return <></>;

  return (
    <Section>
      <Content>
        <figure>
          <img
            src={resultImage(result?.resultType)}
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
        <S.TextWrap>
          <S.Title>행운아 {result?.nickname} 님의 개운법은 ‘시작'</S.Title>
          <p>
            개운 루틴이 어렵게 느껴질 때는, <br />
            <em>앱 ‘luckkids 럭키즈’</em>를 활용해보자.
          </p>
          <p>
            럭키즈와 함께면 정해진 시간마다 <em>행운의 습관을 알림 받고,</em>{' '}
            습관을 수행할 때마다 함께 성장하는 럭키즈 캐릭터와 개운법을 실천할
            수 있다.
          </p>
          <p>
            작은 습관이 쌓이면 <em>운의 흐름이 서서히 트여갈 것이다.</em>
          </p>
        </S.TextWrap>
        <S.More
          href={
            'https://apps.apple.com/kr/app/luckkids-%EB%9F%AD%ED%82%A4%EC%A6%88-%ED%96%89%EC%9A%B4%EC%9D%84-%ED%82%A4%EC%9A%B0%EB%8A%94-%EC%8A%B5%EA%B4%80-%EC%95%B1/id6475259179'
          }
          target={'_blank'}
        >
          럭키즈 알아보기
        </S.More>
        <S.ButtonWrap>
          <S.ShareButton onClick={handleShare}>
            <S.Svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2.83325C6.47667 2.83325 2 6.23005 2 10.4201C2 13.0253 3.73167 15.3231 6.36833 16.6892L5.25889 20.6691C5.16056 21.0215 5.57056 21.3017 5.885 21.0975L10.7483 17.9456C11.1583 17.9842 11.5756 18.007 12 18.007C17.5228 18.007 22 14.6096 22 10.4201C22 6.23005 17.5228 2.83325 12 2.83325Z"
                  fill="black"
                  fillOpacity="0.902"
                />
              </svg>
            </S.Svg>
            카톡 공유하기
          </S.ShareButton>
          <S.RetryButton href={'/'}>나도 해보기</S.RetryButton>
        </S.ButtonWrap>
      </Content>
    </Section>
  );
}
