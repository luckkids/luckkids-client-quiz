import { useAnswerStore } from '@/store/answerStore';

export const useAnswerState = () => {
  const nickname = useAnswerStore((state) => state.nickname);
  const answers = useAnswerStore((state) => state.answers);
  const step = useAnswerStore((state) => state.step);
  const setNickname = useAnswerStore((state) => state.setNickname);
  const setAnswer = useAnswerStore((state) => state.setAnswer);
  const getAnswer = useAnswerStore((state) => state.getAnswer);
  const setStep = useAnswerStore((state) => state.setStep);
  const clearAnswers = useAnswerStore((state) => state.clearAnswers);

  return {
    nickname,
    answers,
    step,
    setStep,
    setNickname,
    setAnswer,
    getAnswer,
    clearAnswers,
  };
};
