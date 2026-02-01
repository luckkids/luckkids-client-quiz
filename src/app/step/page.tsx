'use client';
import styled from '@emotion/styled';
import mq from '@/util/mq';
import Section from '@/components/core/coreSection';
import Content from '@/components/core/coreContent';
import { useAnswerState } from '@/hooks/useAnswerState';
import { QUIZ_QUESTIONS } from '@/constants';
import QuizNickname from '@/components/quiz/quizNickname';
import QuizNavigation from '@/components/quiz/quizNavigation';
import QuizProgress from '@/components/quiz/quizProgress';
import QuizProgressbar from '@/components/quiz/quizProgressbar';
import { useEffect, useMemo, useState } from 'react';
import { IQuizAnswer, TQuizType, TResult } from '@/interface/interface';
import { useRouter } from 'next/navigation';
import QuizLoading from '@/app/step/QuizLoading';

const S = {
  Container: styled.div(
    mq({
      width: '100%',
    })
  ),
  Title: styled.h1(
    mq({
      fontSize: ['24px', '32px'],
      marginBottom: '30px',
      textAlign: 'center',
      color: '#333',
    })
  ),
  SectionTitle: styled.h2(
    mq({
      fontSize: ['18px', '24px'],
      marginBottom: '20px',
      color: '#44763b',
    })
  ),
  Input: styled.input(
    mq({
      width: '100%',
      padding: '12px 16px',
      fontSize: ['14px', '16px'],
      border: '2px solid #ddd',
      borderRadius: '8px',
      marginBottom: '20px',
      '&:focus': {
        outline: 'none',
        borderColor: '#44763b',
      },
    })
  ),
  Button: styled.button(
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
      border: 'none',
      width: '100%',
      margin: ['0 5px'],
      '&:disabled': {
        background: '#DCDDDD',
        cursor: 'not-allowed',
      },
    })
  ),
  SecondaryButton: styled.button(
    mq({
      padding: ['12px 24px', '14px 28px'],
      fontSize: ['14px', '16px'],
      background: '#fff',
      color: '#44763b',
      border: '2px solid #44763b',
      borderRadius: '8px',
      cursor: 'pointer',
      marginRight: '10px',
      marginBottom: '10px',
      '&:hover': {
        background: '#f5f5f5',
      },
    })
  ),
  QuizContainer: styled.div(
    mq({
      width: '100%',
      marginBottom: '30px',
    })
  ),
  QuizQuestion: styled.h3(
    mq({
      fontSize: ['16px', '20px'],
      marginBottom: '20px',
      color: '#333',
    })
  ),
  OptionButton: styled.button<{ isSelected: boolean }>((props) =>
    mq({
      width: '100%',
      padding: '14px 20px',
      fontSize: ['14px', '16px'],
      marginBottom: '12px',
      textAlign: 'left',
      border: `2px solid ${props.isSelected ? '#44763b' : '#ddd'}`,
      borderRadius: '8px',
      background: props.isSelected ? '#f0f7ef' : '#fff',
      color: props.isSelected ? '#44763b' : '#333',
      cursor: 'pointer',
      transition: 'all 0.2s',
      '&:hover': {
        borderColor: '#44763b',
        background: props.isSelected ? '#f0f7ef' : '#f9f9f9',
      },
    })
  ),
  StatusText: styled.p(
    mq({
      marginTop: '15px',
      padding: '12px',
      background: '#f5f5f5',
      borderRadius: '8px',
      fontSize: ['12px', '14px'],
      color: '#666',
    })
  ),
  InfoBox: styled.div(
    mq({
      padding: '15px',
      background: '#f0f7ef',
      borderRadius: '8px',
      marginTop: '15px',
      fontSize: ['12px', '14px'],
      color: '#44763b',
    })
  ),
};

const getResultType = (ans: IQuizAnswer) => {
  const resultTypeScore: TResult = {};
  let mostPic: TQuizType | undefined = undefined;
  let currentMostScore = 0;

  //선택한 옵션 개수 카운트
  for (const value of Object.values(ans)) {
    resultTypeScore[value] = (resultTypeScore[value] || 0) + 1;
  }

  //제일 높은 타입 리턴
  for (const [k, v] of Object.entries(resultTypeScore)) {
    if (v > currentMostScore) {
      mostPic = k as TQuizType;
      currentMostScore = v;
    }
  }

  return mostPic;
};

export default function Home() {
  const navigation = useRouter();
  const { nickname, step, setStep, setResultType } = useAnswerState();
  const [answer, setAnswer] = useState<IQuizAnswer>({});

  useEffect(() => {
    if (step !== 7) return;
    setResultType(getResultType(answer));
  }, [answer, step]);

  const stepByRender = useMemo(() => {
    switch (step) {
      case undefined:
        return <QuizNickname />;
      case 7:
        return <QuizLoading />;
      default:
        return (
          <>
            <QuizProgressbar step={step} />
            {/*퀴즈*/}
            <QuizProgress {...QUIZ_QUESTIONS[step]} setAnswer={setAnswer} />
          </>
        );
    }
  }, [step]);

  return (
    <Section>
      <Content
        css={mq({
          padding: ['20px 20px 30px 20px'],
          width: '100%',
            height:'100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-between',
        })}
      >
        <S.Container>
          {step !== 7 && (
            <QuizNavigation
              onClick={() => {
                if (step === undefined) {
                  navigation.push('/');
                } else if (step > 0) {
                  setStep(step - 1);
                } else {
                  setStep(undefined);
                }
              }}
            />
          )}
          {stepByRender}
        </S.Container>
        {step === undefined && (
          <S.Button disabled={!nickname?.trim()} onClick={() => setStep(0)}>
            다음
          </S.Button>
        )}
      </Content>
    </Section>
  );
}
