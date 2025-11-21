import { useAnswerStore } from '@/store/answerStore';

export const useAnswerState = () => {
  const nickname = useAnswerStore((state) => state.nickname);
  const answers = useAnswerStore((state) => state.answers);
  const setNickname = useAnswerStore((state) => state.setNickname);
  const setAnswer = useAnswerStore((state) => state.setAnswer);
  const getAnswer = useAnswerStore((state) => state.getAnswer);
  const clearAnswers = useAnswerStore((state) => state.clearAnswers);

  return {
    nickname,
    answers,
    setNickname,
    setAnswer,
    getAnswer,
    clearAnswers,
  };
};
