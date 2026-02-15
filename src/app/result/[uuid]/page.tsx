'use client';
import Section from '@/components/core/coreSection';
import Content from '@/components/core/coreContent';
import Image from 'next/image';
import styled from '@emotion/styled';
import mq from '@/util/mq';
import { createImageSaveHandler } from '@/util/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Constants } from '@/constants';
import { TQuizType } from '@/interface/interface';
import { GA } from '@/util/ga';

const KAKAO_TMP_ID = process.env.NEXT_PUBLIC_KAKAO_TEMPLATE_ID;

const S = {
  DownloadImgWrap: styled.figure(
    mq({
      height: ['682px'],
      fontSize: 0,
      position: 'relative',
    })
  ),
  PcDisclaimer: styled.span(
    mq({
      display: ['none', 'none', 'flex'],
      alignItems: 'center',
      justifyContent: 'center',
      gap: ['4px'],
      marginTop: ['20px'],
      fontSize: ['15px'],
      color: '#666E79',
    })
  ),
  MoDisclaimer: styled.span(
    mq({
      display: ['flex', 'flex', 'none'],
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
      color: '#191F28',
      borderRadius: ['16px'],
      cursor: 'pointer',
      gap: ['8px'],
    })
  ),
  RetryButton: styled.a(
    mq({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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

  const KaKaoShare = () => {
    window.Kakao.Share.sendCustom({
      templateId: Number(KAKAO_TMP_ID),
      templateArgs: {
        title: '개운법 테스트 | 내 운이 트이는 방법은?',
        description: `언제까지 행운을 기다릴 수만은 없으니까, 내 운이 트이는 개운법(開運法)을 알아보세요!`,
        buttonUrl: window.location.pathname.substring(1),
      },
    });
  };
  const handleImageContextMenu = (res: IResponse) => {
    const image = resultImage(res.resultType);
    return createImageSaveHandler(
      image,
      `${res.nickname}님_개운법결과_${res.resultType.toLowerCase()}.jpg`
    );
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

  if (!result) return <></>;
  return (
    <>
      <Section>
        <Content>
          <S.DownloadImgWrap>
            <img
              src={resultImage(result.resultType)}
              alt=""
              style={{ width: '100%' }}
              onContextMenu={handleImageContextMenu(result)}
            />
          </S.DownloadImgWrap>
          <S.PcDisclaimer>
            <S.Triangle>
              <Image
                width={'10'}
                height={'9'}
                src="/img/icon/icon-triangle.svg"
                alt={''}
                style={{ display: 'block' }}
              />
            </S.Triangle>
            이미지를 우클릭하여 나의 개운법을 저장해보세요!
          </S.PcDisclaimer>
          <S.MoDisclaimer>
            <S.Triangle>
              <Image
                width={'10'}
                height={'9'}
                src="/img/icon/icon-triangle.svg"
                alt={''}
                style={{ display: 'block' }}
              />
            </S.Triangle>
            이미지를 꾹 눌러 나의 개운법을 저장해보세요!
          </S.MoDisclaimer>
        </Content>
        <Content
          css={mq({
            padding: ['0 20px'],
            textAlign: 'center',
          })}
        >
          <S.TextWrap>
            <S.Title>행운아 {result.nickname} 님의 개운법은 ‘시작'</S.Title>
            <p>
              개운 루틴이 어렵게 느껴질 때, <br />앱 <em>‘luckkids 럭키즈’</em>
              와 함께 실천해보세요!
            </p>
            <p>
              정해진 시간마다 <em>행운의 습관을 알림으로 받고, </em>
              <br />
              습관을 실천할수록 럭키즈 캐릭터도 함께 성장해요.
            </p>
            <p>
              작은 습관이 쌓일수록 <br />
              <em>운의 흐름도 서서히 트이기 시작할 거예요!</em>
            </p>
          </S.TextWrap>
          <S.More
            href={
              'https://apps.apple.com/kr/app/luckkids-%EB%9F%AD%ED%82%A4%EC%A6%88-%ED%96%89%EC%9A%B4%EC%9D%84-%ED%82%A4%EC%9A%B0%EB%8A%94-%EC%8A%B5%EA%B4%80-%EC%95%B1/id6475259179'
            }
            target={'_blank'}
            onClick={() => GA.onClickAppStore()}
          >
            럭키즈 알아보기
          </S.More>
          <S.ButtonWrap>
            <S.ShareButton
              onClick={() => {
                KaKaoShare();
                GA.onClickShare();
              }}
            >
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
              공유하기
            </S.ShareButton>
            <S.RetryButton href={'/'} onClick={() => GA.onClickRetry()}>
              다시 해보기
            </S.RetryButton>
          </S.ButtonWrap>
        </Content>
      </Section>
    </>
  );
}
