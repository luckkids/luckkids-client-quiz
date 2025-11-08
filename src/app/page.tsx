'use client';
import styled from '@emotion/styled';
import mq from '@/util/mq';
import Section from '@/components/core/core.section';
import Content from '@/components/core/core.content';

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
      padding: '10px 50px',
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
            <S.button>A</S.button>
            <S.button>B</S.button>
          </S.buttonWrap>
        </S.Banner>
      </Content>
    </Section>
  );
}
