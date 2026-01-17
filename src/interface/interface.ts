import { Dispatch, SetStateAction } from 'react';

export type TQuizType = 'tokkingi' | 'taeyangi' | 'naby' | 'turkeyi' | 'gurumi';

export interface IQuizOption {
  text: string;
  type: TQuizType;
}

export interface IQuizQuestion {
  question: string;
  options: IQuizOption[];
}

export interface IQuizProgress {
  question: string;
  options: IQuizOption[];
  setAnswer: Dispatch<SetStateAction<IQuizAnswer>>;
}

export interface IQuizAnswer {
  [key: string]: TQuizType;
}
