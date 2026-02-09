import { IQuizQuestion } from '@/interface/interface';

export const Constants = {
  BREAKPOINT_MOBILE: 390,
  BREAKPOINT_TABLET: 1024,
  BREAKPOINT_DESKTOP: 1920,
  MQ_RATIO: 1,
  POST_URL: 'https://api.luckkids.co.kr/api/v1/fortuneTest',
};

export const QUIZ_QUESTIONS: IQuizQuestion[] = [
  {
    question: '아침에 일어났을 때, \n제일 먼저 떠오르는 생각은?',
    options: [
      { text: '오늘은 뭔가 새롭게 시작하고 싶어!', type: 'TOKKINGI' },
      { text: '오늘 누구랑 점심 먹지?', type: 'TAEYANGI' },
      { text: '오늘 해야 할 걸 차근차근 정리하자.', type: 'NABY' },
      { text: '오늘 일정 효율적으로 배치해야지.', type: 'TURKEYI' },
      { text: '조용히 커피 한 잔 하며 마음 정리부터.', type: 'GURUMI' },
    ],
  },
  {
    question: '운이 좋은 날, \n당신은 어떤 행동을 하나요?',
    options: [
      { text: '새로운 시도를 하거나 즉흥 여행을 간다', type: 'TOKKINGI' },
      { text: '사람들에게 연락하고 기분을 나눈다', type: 'TAEYANGI' },
      { text: '그간 미뤘던 일들을 정리한다', type: 'NABY' },
      { text: '미뤄둔 계획을 실행에 옮긴다', type: 'TURKEYI' },
      { text: '혼자 시간을 보내며 여운을 즐긴다', type: 'GURUMI' },
    ],
  },
  {
    question: '일이 막히거나 \n스트레스 받을 때 나는…',
    options: [
      { text: '바로 다른 방법을 시도한다', type: 'TOKKINGI' },
      { text: '주변 사람들과 수다 떤다', type: 'TAEYANGI' },
      { text: '잠시 쉬며 계획을 다시 세운다', type: 'NABY' },
      { text: '우선순위를 다시 정리한다', type: 'TURKEYI' },
      { text: '음악을 들으며 감정을 가라앉힌다', type: 'GURUMI' },
    ],
  },
  {
    question: '지금의 나를 \n한마디로 표현한다면?',
    options: [
      { text: '앞으로 나아가는 중!', type: 'TOKKINGI' },
      { text: '사람들에게 에너지를 주는 중!', type: 'TAEYANGI' },
      { text: '균형을 찾는 중!', type: 'NABY' },
      { text: '디테일을 다듬는 중!', type: 'TURKEYI' },
      { text: '내면을 정리하는 중.', type: 'GURUMI' },
    ],
  },
  {
    question: "나에게 '행운'은 \n어떤 모습에 가까울까?",
    options: [
      { text: '새로운 기회가 열릴 때', type: 'TOKKINGI' },
      { text: '좋은 인연을 만날 때', type: 'TAEYANGI' },
      { text: '마음이 편안할 때', type: 'NABY' },
      { text: '일이 완벽하게 마무리될 때', type: 'TURKEYI' },
      { text: '마음이 가벼워질 때', type: 'GURUMI' },
    ],
  },
  {
    question: '주말 오전, \n당신은 주로 무엇을 하나요?',
    options: [
      { text: '운동하거나 산책하며 기분 전환', type: 'TOKKINGI' },
      { text: '친구에게 연락해 즉흥 약속', type: 'TAEYANGI' },
      { text: '청소하거나 정리', type: 'NABY' },
      { text: '계획 세우거나 정리정돈', type: 'TURKEYI' },
      { text: '음악 들으며 늦잠', type: 'GURUMI' },
    ],
  },
  {
    question: '요즘 가장 자주 드는 \n생각은?',
    options: [
      { text: '새로운 걸 해보고 싶어.', type: 'TOKKINGI' },
      { text: '좋은 사람들과 함께하고 싶어.', type: 'TAEYANGI' },
      { text: '지금 페이스가 나쁘지 않아.', type: 'NABY' },
      { text: '더 효율적인 방법이 없을까?', type: 'TURKEYI' },
      { text: '조용히 나를 돌보고 싶어.', type: 'GURUMI' },
    ],
  },
];
