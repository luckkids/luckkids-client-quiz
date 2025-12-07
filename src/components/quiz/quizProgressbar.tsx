import styled from '@emotion/styled';
import mq from '@/util/mq';

interface IQuizProgressBar {
  step: number;
}

const S = {
  Wrapper: styled.div(
    mq({
      marginTop: ['32px'],
      display: 'flex',
      justifyContent: 'center',
    })
  ),
  ProgressWrapper: styled.div(
    mq({
      position: 'relative',
      width: '59%',
      height: ['12px'],
      display: 'flex',
      alignItems: 'center',
    })
  ),
  ProgressTrack: styled.span(
    mq({
      position: 'relative',
      borderRadius: '8px/60%',
      overflow: 'hidden',
      width: '100%',
      display: 'flex',
      height: '100%',
      background: '#D9D9D9',
    })
  ),
  ProgressThumb: styled.strong(
    mq({
      display: 'block',
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      transition: 'width 0.3s ease-in-out',
      borderRadius: '8px/8px',
      background: '#9BB67F',
    }),
    (props: { currentStep: number }) => {
      return {
        width:
          props.currentStep === 7 ? '100%' : `${14.28 * props.currentStep}%`,
      };
    }
  ),
  Step: styled.i(
    mq({
      fontStyle: 'normal',
      position: 'absolute',
      right: ['-20px'],
      transform: 'translateX(100%)',
    })
  ),
};

export default function QuizProgressbar(props: IQuizProgressBar) {
  return (
    <S.Wrapper>
      <S.ProgressWrapper>
        <S.ProgressTrack>
          <S.ProgressThumb currentStep={props.step + 1}></S.ProgressThumb>
        </S.ProgressTrack>
        <S.Step>{`${props.step + 1} 의 7`}</S.Step>
      </S.ProgressWrapper>
    </S.Wrapper>
  );
}
