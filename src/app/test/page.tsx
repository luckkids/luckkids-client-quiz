'use client';
import styled from '@emotion/styled';
import mq from '@/util/mq';
import Section from '@/components/core/coreSection';
import Content from '@/components/core/coreContent';
import { share, copyToClipboard, getShareContextInfo } from '@/util/share';
import { createImageSaveHandler, downloadImage } from '@/util/image';

const S = {
  Container: styled.div(
    mq({
      padding: ['40px 20px', '60px 40px'],
      minHeight: '100vh',
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
  ImageContainer: styled.div(
    mq({
      marginTop: '20px',
      textAlign: 'center',
    })
  ),
  TestImage: styled.img(
    mq({
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '8px',
      border: '2px solid #44763b',
      cursor: 'pointer',
    })
  ),
  StatusText: styled.p(
    mq({
      marginTop: '10px',
      fontSize: ['12px', '14px'],
      color: '#666',
      fontStyle: 'italic',
    })
  ),
  InfoBox: styled.div(
    mq({
      padding: '15px',
      background: '#f5f5f5',
      borderRadius: '8px',
      marginTop: '15px',
      fontSize: ['12px', '14px'],
      color: '#555',
    })
  ),
};

export default function TestPage() {
  const handleShare = async () => {
    // 컨텍스트 정보 확인
    const contextInfo = getShareContextInfo();
    if (!contextInfo.supported) {
      // Fallback: 클립보드에 URL 복사
      await copyToClipboard(window.location.href);
      return;
    }

    await share({
      title: '럭키즈 오행 테스트',
      text: '나의 오행을 확인해보세요!',
      url: window.location.href,
    });
  };

  const handleImageContextMenu = createImageSaveHandler(
    '/apple-icon.png',
    'luckkids-icon.png'
  );

  return (
    <Section>
      <Content>
        <S.Container>
          <S.Title>유틸리티 테스트 페이지</S.Title>

          {/* 공유하기 테스트 섹션 */}
          <S.Section>
            <S.SectionTitle>1. 공유하기 기능 테스트</S.SectionTitle>
            <S.Button onClick={handleShare}>공유하기</S.Button>
            <S.InfoBox>
              <strong>테스트 방법:</strong>
              <br />
              • 모바일: 공유하기 버튼을 눌러 카카오톡 등으로 공유
              <br />
              • 데스크톱: Chrome/Edge에서 공유 메뉴 확인 (일부 브라우저만 지원)
              <br />• <strong>중요:</strong> Web Share API는 HTTPS 또는
              localhost에서만 작동합니다
              <br />
              • 로컬 IP(192.168.x.x)로 접속 시 HTTP이면 작동하지 않습니다
              <br />• 지원하지 않는 경우: 클립보드에 URL 복사
            </S.InfoBox>
          </S.Section>

          {/* 이미지 저장 테스트 섹션 */}
          <S.Section>
            <S.SectionTitle>2. 이미지 우클릭 저장 기능 테스트</S.SectionTitle>
            <S.ImageContainer>
              <S.TestImage
                src="/apple-icon.png"
                alt="테스트 이미지"
                onContextMenu={handleImageContextMenu}
              />
              <S.StatusText>
                이미지를 우클릭하면 저장할 수 있습니다!
              </S.StatusText>
            </S.ImageContainer>
            <S.InfoBox>
              <strong>테스트 방법:</strong>
              <br />• 이미지를 <strong>우클릭</strong>하면 자동으로
              다운로드됩니다
              <br />
              • 기본 우클릭 메뉴는 표시되지 않습니다
              <br />• 저장된 파일명: luckkids-icon.png
            </S.InfoBox>
          </S.Section>

          {/* 추가 테스트 섹션 */}
          <S.Section>
            <S.SectionTitle>3. 직접 다운로드 테스트</S.SectionTitle>
            <S.Button
              onClick={() => {
                downloadImage('/apple-icon.png', 'direct-download.png');
              }}
            >
              이미지 직접 다운로드
            </S.Button>
            <S.InfoBox>
              <strong>설명:</strong>
              <br />
              • downloadImage 함수를 직접 호출하여 이미지를 다운로드합니다
              <br />• 파일명: direct-download.png
            </S.InfoBox>
          </S.Section>
        </S.Container>
      </Content>
    </Section>
  );
}
