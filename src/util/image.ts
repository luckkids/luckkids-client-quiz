/**
 * 이미지 관련 유틸리티 함수
 * 특정 이미지에 우클릭 저장 기능을 추가합니다.
 */

/**
 * 이미지를 다운로드합니다.
 *
 * @param imageUrl - 다운로드할 이미지 URL (로컬 경로 또는 외부 URL)
 * @param filename - 저장할 파일명 (기본값: 'image.png')
 *
 * @example
 * ```tsx
 * const handleImageSave = (e: React.MouseEvent<HTMLImageElement>) => {
 *   e.preventDefault();
 *   downloadImage('/images/result.png', 'my-result.png');
 * };
 *
 * <img
 *   src="/images/result.png"
 *   onContextMenu={handleImageSave}
 *   alt="결과 이미지"
 * />
 * ```
 */
export function downloadImage(
  imageUrl: string,
  filename: string = 'image.png'
): void {
  // 이미지 URL이 상대 경로인 경우 절대 경로로 변환
  const absoluteUrl = imageUrl.startsWith('http')
    ? imageUrl
    : `${window.location.origin}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;

  // 이미지를 fetch하여 Blob으로 변환
  fetch(absoluteUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('이미지를 불러올 수 없습니다.');
      }
      return response.blob();
    })
    .then((blob) => {
      // Blob URL 생성
      const blobUrl = window.URL.createObjectURL(blob);

      // 임시 링크 생성하여 다운로드
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // 정리
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => {
      console.error('이미지 다운로드 중 오류가 발생했습니다:', error);
      // Fallback: 새 창에서 이미지 열기
      window.open(absoluteUrl, '_blank');
    });
}

/**
 * React 이미지 요소에 우클릭 저장 기능을 추가하는 이벤트 핸들러를 반환합니다.
 *
 * @param imageUrl - 저장할 이미지 URL
 * @param filename - 저장할 파일명 (기본값: 이미지 URL에서 추출)
 * @returns React.MouseEvent 핸들러 함수
 *
 * @example
 * ```tsx
 * <img
 *   src="/images/result.png"
 *   onContextMenu={createImageSaveHandler('/images/result.png', 'my-result.png')}
 *   alt="결과 이미지"
 * />
 * ```
 */
export function createImageSaveHandler(
  imageUrl: string,
  filename?: string
): (e: React.MouseEvent<HTMLImageElement>) => void {
  return (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    // 파일명이 제공되지 않은 경우 이미지 URL에서 추출
    const defaultFilename =
      filename || imageUrl.split('/').pop() || 'image.png';

    downloadImage(imageUrl, defaultFilename);
  };
}

/**
 * 이미지 URL에서 파일명을 추출합니다.
 *
 * @param imageUrl - 이미지 URL
 * @returns 추출된 파일명
 */
export function extractFilenameFromUrl(imageUrl: string): string {
  const urlParts = imageUrl.split('/');
  const filename = urlParts[urlParts.length - 1];

  // 쿼리 파라미터 제거
  return filename.split('?')[0] || 'image.png';
}
