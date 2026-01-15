import styled from '@emotion/styled';
import { useAnswerState } from '@/hooks/useAnswerState';
import mq from '@/util/mq';

const S = {
  Wrapper: styled.div(
    mq({
      paddingTop: ['70px'],
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    })
  ),
  Title: styled.h2(
    mq({
      fontSize: ['24px'],
      textAlign: 'center',
      lineHeight: 1.3333,
    })
  ),
  Input: styled.input(
    mq({
      textAlign: 'center',
      fontSize: ['17px'],
      padding: ['20px'],
      width: '100%',
      marginTop: ['30px'],
      fontWeight: '500',
      borderRadius: ['5px'],
      border: '1px solid #BCBCBC',
      '&::placeholder': {
        color: '#545454',
        opacity: 0.35,
      },
    })
  ),
  Button: styled.button(),
  InputWrapper: styled.article(),
};

export default function QuizNickname() {
  const { nickname, setNickname } = useAnswerState();
  return (
    <S.Wrapper>
      <S.InputWrapper>
        <S.Title>행운아로 태어난 당신의 닉네임은?</S.Title>
        <S.Input
          name={'nickname'}
          type="text"
          placeholder="7자 이내로 입력해주세요!"
          value={nickname ?? ''}
          onChange={(e) => setNickname(e.target.value)}
        />
      </S.InputWrapper>
    </S.Wrapper>
  );
}
