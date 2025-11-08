import styled from '@emotion/styled';
import mq from '@/util/mq';
import { ReactNode } from 'react';

export interface ISection {
  children: ReactNode;
  className?: string;
}

const S = {
  Section: styled.section(
    mq({
      background: 'linear-gradient(180deg, #A0DFFC, #70AFFB)',
    })
  ),
};

export default function Section({ children, ...rest }: ISection) {
  return <S.Section {...rest}>{children}</S.Section>;
}
