import { Answer } from '@/store/answerStore';

export interface IQuizProgress {
  question: string;
  options: IQuizOptions[];
}

export interface IQuizOptions {
  text: string;
}
