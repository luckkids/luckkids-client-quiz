import styled, { CSSObject } from '@emotion/styled';
import mq from '@/util/mq';
import { ReactNode } from 'react';
import { DynamicStyle } from 'facepaint';

export interface IContent {
  children: ReactNode;
  className?: string;
  css?: CSSObject | DynamicStyle[];
}

const S = {
  Content: styled.div(
    mq({
      maxWidth: '390px',
      margin: '0 auto',
    }),
    (props: { css: CSSObject | DynamicStyle[] | undefined }) => props.css
  ),
};

export default function Content({ children, className, css }: IContent) {
  return (
    <S.Content css={css} className={className}>
      {children}
    </S.Content>
  );
}
