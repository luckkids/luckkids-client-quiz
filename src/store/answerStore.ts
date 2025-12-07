import { create } from 'zustand';

export interface Answer {
  quizIndex: number;
  answerIndex: number;
  answerContent: string;
  step?: number;
}

interface AnswerState {
  nickname: string | null;
  answers: Answer[];
  step?: number;
  setNickname: (nickname: string) => void;
  setStep: (step?: number) => void;
  setAnswer: (
    quizIndex: number,
    answerIndex: number,
    answerContent: string
  ) => void;
  getAnswer: (quizIndex: number) => number | undefined;
  clearAnswers: () => void;
}

export const useAnswerStore = create<AnswerState>((set, get) => ({
  nickname: null,
  step: undefined,
  answers: [],

  setStep: (step?: number) => {
    set({ step });
  },

  setNickname: (nickname: string) => {
    set({ nickname });
  },

  setAnswer: (
    quizIndex: number,
    answerIndex: number,
    answerContent: string
  ) => {
    const { answers } = get();
    const existingAnswerIndex = answers.findIndex(
      (answer) => answer.quizIndex === quizIndex
    );

    if (existingAnswerIndex !== -1) {
      // 같은 퀴즈에 대한 답변이 있으면 덮어쓰기
      const newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = {
        quizIndex,
        answerIndex,
        answerContent,
      };
      set({ answers: newAnswers });
    } else {
      // 새로운 답변 추가
      set({ answers: [...answers, { quizIndex, answerIndex, answerContent }] });
    }
  },

  getAnswer: (quizIndex: number) => {
    const { answers } = get();
    const answer = answers.find((answer) => answer.quizIndex === quizIndex);
    return answer?.answerIndex;
  },

  clearAnswers: () => {
    set({ nickname: null, answers: [] });
  },
}));
