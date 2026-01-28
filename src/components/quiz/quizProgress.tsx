import { IQuizAnswer, IQuizProgress } from '@/interface/interface';
import styled from '@emotion/styled';
import mq from '@/util/mq';
import { useAnswerState } from '@/hooks/useAnswerState';

const S = {
  QuizTitle: styled.h2(
    mq({
      fontSize: ['24px'],
      textAlign: 'center',
      lineHeight: 1.3333,
      whiteSpace: 'pre-wrap',
      margin: ['25px 0 30px'],
    })
  ),
  QuizAnswers: styled.ul(
    mq({
      marginTop: ['30px'],
      display: 'flex',
      flexDirection: 'column',
      gap: ['10px'],
    })
  ),
  QuizAnswerItem: styled.li(),
  QuizButton: styled.button(
    mq({
      textAlign: 'center',
      fontSize: ['17px'],
      padding: ['20px'],
      width: '100%',
      fontWeight: '500',
      borderRadius: ['5px'],
      border: '1px solid #BCBCBC',
      cursor: 'pointer',
    })
  ),
};

export default function QuizProgress(props: IQuizProgress) {
  const { step, setStep } = useAnswerState();

  return (
    <>
      <S.QuizTitle>{props.question}</S.QuizTitle>
      <S.QuizAnswers>
        {props.options.map((quizOption, i) => {
          return (
            <S.QuizAnswerItem
              key={`${quizOption}-${i}`}
              onClick={() => {
                console.log('step', step);
                if (step !== undefined && step <= 6) {
                  setStep(step + 1);
                }
                props.setAnswer((prev: IQuizAnswer) => ({
                  ...prev,
                  [`${step}`]: quizOption.type,
                }));
              }}
            >
              <S.QuizButton type={'button'}>{quizOption.text}</S.QuizButton>
            </S.QuizAnswerItem>
          );
        })}
      </S.QuizAnswers>
    </>
  );
}
