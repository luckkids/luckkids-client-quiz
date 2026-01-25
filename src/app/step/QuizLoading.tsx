import Lottie from 'lottie-react';
import loadingJson from '../../../public/lottie/loading.json';
import styled from '@emotion/styled';
import mq from '@/util/mq';
import { useEffect, useState } from 'react';
import { useAnswerState } from '@/hooks/useAnswerState';
import { useRouter } from 'next/navigation';
import { Constants } from '@/constants';

const S = {
  Wrapper: styled.div(
    mq({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      paddingBottom: ['60px'],
    })
  ),
  DesClaimer: styled.p(
    mq({
      color: '#545454',
      fontSize: ['17px'],
      fontWeight: 500,
    })
  ),
  LottieWrapper: styled.figure(
    mq({
      width: ['100px'],
      marginTop: ['30px'],
    })
  ),
};

export default function QuizLoading() {
  const navigation = useRouter();
  const { nickname, resultType } = useAnswerState();
  const [dots, setDots] = useState<string>('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : `${prev + '.'}`));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onSubmit = async () => {
      const uuid = crypto.randomUUID().replace(/-/g, '');
      try {
        const response = await fetch(Constants.POST_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            if: uuid,
            nickname,
            resultType,
          }),
        });

        return await response.json();
      } catch {}
    };

    onSubmit().then((r) => {
      if (r.statusCode === 200) {
        navigation.push(`/result/${r.id}`);
      }
    });
  }, [resultType]);
  return (
    <S.Wrapper>
      <S.DesClaimer>개운법을 찾는 중{dots}</S.DesClaimer>
      <S.LottieWrapper>
        <Lottie animationData={loadingJson} loop={true}></Lottie>
      </S.LottieWrapper>
    </S.Wrapper>
  );
}
