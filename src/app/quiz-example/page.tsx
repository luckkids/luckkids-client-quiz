'use client';
import { useState } from 'react';
import styled from '@emotion/styled';
import mq from '@/util/mq';
import Section from '@/components/core/coreSection';
import Content from '@/components/core/coreContent';
import { useAnswerState } from '@/hooks/useAnswerState';
import { QUIZ_QUESTIONS } from '@/constants';

const S = {
  Container: styled.div(
    mq({
      padding: ['40px 20px', '60px 40px'],
      minHeight: '100vh',
      maxWidth: '800px',
      margin: '0 auto',
    })
  ),
  Title: styled.h1(
    mq({
      fontSize: ['24px', '32px'],
      marginBottom: '30px',
      textAlign: 'center',
      color: '#333',
    })
  ),
  Section: styled.section(
    mq({
      marginBottom: '40px',
      padding: '20px',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    })
  ),
  SectionTitle: styled.h2(
    mq({
      fontSize: ['18px', '24px'],
      marginBottom: '20px',
      color: '#44763b',
    })
  ),
  Input: styled.input(
    mq({
      width: '100%',
      padding: '12px 16px',
      fontSize: ['14px', '16px'],
      border: '2px solid #ddd',
      borderRadius: '8px',
      marginBottom: '20px',
      '&:focus': {
        outline: 'none',
        borderColor: '#44763b',
      },
    })
  ),
  Button: styled.button(
    mq({
      padding: ['12px 24px', '14px 28px'],
      fontSize: ['14px', '16px'],
      background: '#44763b',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginRight: '10px',
      marginBottom: '10px',
      '&:hover': {
        background: '#35602d',
      },
      '&:disabled': {
        background: '#ccc',
        cursor: 'not-allowed',
      },
    })
  ),
  SecondaryButton: styled.button(
    mq({
      padding: ['12px 24px', '14px 28px'],
      fontSize: ['14px', '16px'],
      background: '#fff',
      color: '#44763b',
      border: '2px solid #44763b',
      borderRadius: '8px',
      cursor: 'pointer',
      marginRight: '10px',
      marginBottom: '10px',
      '&:hover': {
        background: '#f5f5f5',
      },
    })
  ),
  QuizContainer: styled.div(
    mq({
      width: '100%',
      marginBottom: '30px',
    })
  ),
  QuizQuestion: styled.h3(
    mq({
      fontSize: ['16px', '20px'],
      marginBottom: '20px',
      color: '#333',
    })
  ),
  OptionButton: styled.button<{ isSelected: boolean }>((props) =>
    mq({
      width: '100%',
      padding: '14px 20px',
      fontSize: ['14px', '16px'],
      marginBottom: '12px',
      textAlign: 'left',
      border: `2px solid ${props.isSelected ? '#44763b' : '#ddd'}`,
      borderRadius: '8px',
      background: props.isSelected ? '#f0f7ef' : '#fff',
      color: props.isSelected ? '#44763b' : '#333',
      cursor: 'pointer',
      transition: 'all 0.2s',
      '&:hover': {
        borderColor: '#44763b',
        background: props.isSelected ? '#f0f7ef' : '#f9f9f9',
      },
    })
  ),
  StatusText: styled.p(
    mq({
      marginTop: '15px',
      padding: '12px',
      background: '#f5f5f5',
      borderRadius: '8px',
      fontSize: ['12px', '14px'],
      color: '#666',
    })
  ),
  InfoBox: styled.div(
    mq({
      padding: '15px',
      background: '#f0f7ef',
      borderRadius: '8px',
      marginTop: '15px',
      fontSize: ['12px', '14px'],
      color: '#44763b',
    })
  ),
};

export default function QuizExamplePage() {
  const { nickname, setNickname, setAnswer, getAnswer, clearAnswers } =
    useAnswerState();
  const [inputNickname, setInputNickname] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    if (inputNickname.trim()) {
      setNickname(inputNickname.trim());
      setQuizStarted(true);
    }
  };

  const handleAnswerSelect = (quizIndex: number, answerIndex: number) => {
    const answerContent = QUIZ_QUESTIONS[quizIndex].options[answerIndex];
    setAnswer(quizIndex, answerIndex, answerContent.text);
  };

  const handleReset = () => {
    clearAnswers();
    setInputNickname('');
    setQuizStarted(false);
  };

  const allAnswered = QUIZ_QUESTIONS.every(
    (_, index) => getAnswer(index) !== undefined
  );

  return (
    <Section>
      <Content>
        <S.Container>
          <S.Title>객관식 퀴즈 예제</S.Title>

          {/* 닉네임 입력 섹션 */}
          {!quizStarted ? (
            <S.Section>
              <S.SectionTitle>닉네임을 입력해주세요</S.SectionTitle>
              <S.Input
                type="text"
                placeholder="닉네임을 입력하세요"
                value={inputNickname}
                onChange={(e) => setInputNickname(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleStartQuiz();
                  }
                }}
              />
              <S.Button
                onClick={handleStartQuiz}
                disabled={!inputNickname.trim()}
              >
                퀴즈 시작하기
              </S.Button>
            </S.Section>
          ) : (
            <>
              {/* 퀴즈 섹션 */}
              <S.Section>
                <S.SectionTitle>
                  안녕하세요, {nickname}님! 퀴즈를 풀어보세요
                </S.SectionTitle>

                {QUIZ_QUESTIONS.map((quiz, quizIndex) => {
                  const selectedAnswer = getAnswer(quizIndex);

                  return (
                    <S.QuizContainer key={quizIndex}>
                      <S.QuizQuestion>
                        {quizIndex + 1}. {quiz.question}
                      </S.QuizQuestion>
                      {quiz.options.map((option, optionIndex) => (
                        <S.OptionButton
                          key={optionIndex}
                          isSelected={selectedAnswer === optionIndex}
                          onClick={() =>
                            handleAnswerSelect(quizIndex, optionIndex)
                          }
                        >
                          {String.fromCharCode(65 + optionIndex)}. {option.text}
                        </S.OptionButton>
                      ))}
                      {selectedAnswer !== undefined && (
                        <S.StatusText>
                          선택한 답변: {quiz.options[selectedAnswer].text}
                        </S.StatusText>
                      )}
                    </S.QuizContainer>
                  );
                })}

                {allAnswered && (
                  <S.InfoBox>
                    <strong>🎉 모든 퀴즈를 완료했습니다!</strong>
                    <br />
                    답변을 초기화하고 다시 시작할 수 있습니다.
                  </S.InfoBox>
                )}

                <div style={{ marginTop: '20px' }}>
                  <S.SecondaryButton onClick={handleReset}>
                    초기화하기
                  </S.SecondaryButton>
                </div>
              </S.Section>

              {/* 현재 상태 표시 */}
              <S.Section>
                <S.SectionTitle>현재 저장된 상태</S.SectionTitle>
                <S.StatusText>
                  <strong>닉네임:</strong> {nickname || '없음'}
                  <br />
                  <strong>답변 개수:</strong>{' '}
                  {
                    QUIZ_QUESTIONS.filter(
                      (_, index) => getAnswer(index) !== undefined
                    ).length
                  }{' '}
                  / {QUIZ_QUESTIONS.length}
                </S.StatusText>
              </S.Section>
            </>
          )}
        </S.Container>
      </Content>
    </Section>
  );
}
