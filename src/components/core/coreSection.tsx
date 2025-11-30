import styled from '@emotion/styled';
import { ReactNode } from 'react';

export interface ISection {
  children: ReactNode;
  className?: string;
}

const S = {
  Section: styled.section({
    minHeight: '100vh',
  }),
};

export default function Section({ children, ...rest }: ISection) {
  return <S.Section {...rest}>{children}</S.Section>;
}
