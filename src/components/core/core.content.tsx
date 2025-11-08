import styled, { CSSObject } from '@emotion/styled';
import mq from '@/util/mq';
import { ReactNode } from 'react';
import { DynamicStyle } from 'facepaint';

export interface ISection {
  children: ReactNode;
  className?: string;
  css?: CSSObject | DynamicStyle[];
}

const S = {
  Content: styled.div(
    mq({
      maxWidth: '390px',
      margin: '0 auto',
      padding: ['0 25px'],
      background: '#ccc',
    })
  ),
};

export default function Content({ children, ...rest }: ISection) {
  return <S.Content {...rest}>{children}</S.Content>;
}
