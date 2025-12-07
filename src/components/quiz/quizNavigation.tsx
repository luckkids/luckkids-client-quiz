import styled from '@emotion/styled';
import mq from '@/util/mq';

const S = {
  Wrapper: styled.div(
    mq({
      margin: ['0 -6px'],
    })
  ),
  SvgWrapper: styled.span(
    mq({
      display: 'inline-flex',
      padding: ['3px 10px'],
      alignItems: 'center',
      cursor: 'pointer',
    })
  ),
};

export default function QuizNavigation() {
  return (
    <S.Wrapper>
      <S.SvgWrapper>
        <svg
          width="10"
          height="18"
          viewBox="0 0 10 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.675 17.475C8.375 17.475 8.075 17.375 7.875 17.075L0.375 9.575C-0.125 9.075 -0.125 8.375 0.375 7.875L7.875 0.375C8.375 -0.125 9.075 -0.125 9.575 0.375C10.075 0.875 10.075 1.575 9.575 2.075L2.775 8.775L9.475 15.475C9.975 15.975 9.975 16.675 9.475 17.175C9.275 17.375 8.975 17.475 8.675 17.475Z"
            fill="black"
          />
        </svg>
      </S.SvgWrapper>
    </S.Wrapper>
  );
}
