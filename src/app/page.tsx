'use client';
import styled from '@emotion/styled';
import mq from '@/util/mq';
import Section from '@/components/core/core.section';
import Content from '@/components/core/core.content';
import { typography } from '@/typography';

const S = {
  Banner: styled.div(
    mq({
      textAlign: 'center',
      height: '100vh',
      background: '#44763b',
    })
  ),
  buttonWrap: styled.article(
    mq({
      display: 'flex',
      gap: ['10px', '20px'],
      justifyContent: 'center',
    })
  ),
  button: styled.button(
    mq({
      padding: ['14px 0', '14px 0'],
      textAlign: 'center',
      background: '#80F466',
      borderRadius: ['15px'],
      border: 0,
    })
  ),
};

export default function Home() {
  return (
    <Section>
      <Content>
        <S.Banner>
          <h3>Test</h3>
          <S.buttonWrap>
            <S.button>나의 개운법 찾기</S.button>
          </S.buttonWrap>
        </S.Banner>
      </Content>
    </Section>
  );
}
