'use client';
import styled from '@emotion/styled';
import mq from '@/util/mq';
import Section from '@/components/core/core.section';
import Content from '@/components/core/core.content';
import Link from 'next/link';

const S = {
  TextWrap: styled.article(
    mq({
      background: '#9BB77B',
      textAlign: 'center',
      color: '#24303F',
      padding: ['79px 0 36px'],
      span: {
        fontSize: ['17px'],
        lineHeight: 22 / 17,
        fontWeight: 500,
      },
      h2: {
        fontSize: ['40px'],
        lineHeight: 1,
        fontWeight: 700,
        marginTop: ['12px'],
      },
    })
  ),
  Figure: styled.figure(
    mq({
      img: {
        width: '100%',
      },
    })
  ),
  Caption: styled.figcaption(
    mq({
      padding: ['10px 16px'],
      fontSize: ['20px'],
      lineHeight: 25 / 20,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      background: '#F1F4EC',
      strong: {
        display: 'flex',
        fontSize: ['22px'],
        fontWeight: 700,
        width: ['50px'],
        height: ['50px'],
        background: '#9BB77B',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: ['10px'],
        borderRadius: ['8px'],
        color: '#fff',
      },
    })
  ),
  P: styled.p(
    mq({
      fontSize: ['16px'],
      lineHeight: 24 / 16,
      padding: ['12px 16px'],
    })
  ),
  ContentWrapper: styled.div(),
  ButtonWrapper: styled.div(
    mq({
      padding: ['30px 25px'],
    })
  ),
};

const Button = styled(Link)(
  mq({
    fontSize: ['17px'],
    lineHeight: 22 / 17,
    fontWeight: 500,
    color: '#fff',
    backgroundColor: '#000',
    display: 'block',
    textAlign: 'center',
    padding: ['17px 0 18px'],
    borderRadius: ['15px'],
  })
);

export default function Home() {
  return (
    <Section>
      <Content
        css={mq({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh',
        })}
      >
        <S.ContentWrapper>
          <S.TextWrap>
            <span>내 운이 트이는 방법은?</span>
            <h2>개운법 테스트</h2>
          </S.TextWrap>
          <S.Figure>
            <S.Caption>
              <strong>1</strong>개운법 알아보기
            </S.Caption>
            <img src="/img/main-visual.png" alt="그래도 해야지 어떡해" />
          </S.Figure>
          <S.P>
            온 마음을 쏟고, 밤낮 없이 노력해도 막히는 때가 있다. <br />
            그렇다고 언제까지 행운을 기다릴 수만은 없으니까,
            <br />
            <strong>내 운이 트이는 개운법(開運法)</strong>을 알아가보자!
          </S.P>
        </S.ContentWrapper>
        <S.ButtonWrapper>
          <Button href={'/'}>나의 개운법 알아보기</Button>
        </S.ButtonWrapper>
      </Content>
    </Section>
  );
}
