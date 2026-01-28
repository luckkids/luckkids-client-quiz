/**
 * Web Share API를 사용한 공유 기능
 * 모바일과 데스크톱 모두에서 동작합니다.
 */

export interface ShareData {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];
}

/**
 * Web Share API를 사용하여 콘텐츠를 공유합니다.
 *
 * @param data - 공유할 데이터 (title, text, url, files)
 * @returns Promise<boolean> - 공유 성공 여부
 *
 * @example
 * ```tsx
 * const handleShare = async () => {
 *   const success = await share({
 *     title: '럭키즈 오행 테스트',
 *     text: '나의 오행을 확인해보세요!',
 *     url: window.location.href,
 *   });
 *   if (!success) {
 *     // Web Share API를 지원하지 않는 경우 fallback 처리
 *     alert('공유 기능을 사용할 수 없습니다.');
 *   }
 * };
 * ```
 */
export async function share(data: ShareData): Promise<boolean> {
  // Web Share API 지원 여부 확인
  if (!navigator.share) {
    return false;
  }

  // HTTPS 또는 localhost가 아닌 경우 Web Share API가 작동하지 않음
  const isSecureContext =
    window.location.protocol === 'https:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  if (!isSecureContext) {
    console.warn(
      'Web Share API는 HTTPS 또는 localhost에서만 작동합니다. ' +
        `현재 프로토콜: ${window.location.protocol}, 호스트: ${window.location.hostname}`
    );
    return false;
  }

  try {
    // TODO: 공유할 내용을 실제 데이터로 수정 필요
    await navigator.share({
      title: data.title || '럭키즈 오행 테스트', // TODO: 실제 제목으로 변경
      url: data.url || window.location.href, // TODO: 실제 공유 URL로 변경
      ...(data.text && { text: data.text }),
      ...(data.files && { files: data.files }),
    });
    return true;
  } catch (error) {
    // 사용자가 공유를 취소한 경우는 에러로 처리하지 않음
    if ((error as Error).name === 'AbortError') {
      return false;
    }
    console.error('공유 중 오류가 발생했습니다:', error);
    return false;
  }
}

/**
 * Web Share API 지원 여부를 확인합니다.
 *
 * @returns boolean - Web Share API 지원 여부
 */
export function isShareSupported(): boolean {
  if (typeof navigator === 'undefined' || !('share' in navigator)) {
    return false;
  }

  // HTTPS 또는 localhost가 아닌 경우 false 반환
  if (typeof window !== 'undefined') {
    return (
      window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    );
  }

  return true;
}

/**
 * 현재 컨텍스트가 Web Share API를 사용할 수 있는지 확인합니다.
 *
 * @returns object - 지원 여부와 이유
 */
export function getShareContextInfo(): {
  supported: boolean;
  reason?: string;
} {
  if (typeof navigator === 'undefined' || !('share' in navigator)) {
    return {
      supported: false,
      reason: '브라우저가 Web Share API를 지원하지 않습니다.',
    };
  }

  if (typeof window !== 'undefined') {
    const isSecureContext =
      window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    if (!isSecureContext) {
      return {
        supported: false,
        reason: `Web Share API는 HTTPS 또는 localhost에서만 작동합니다. 현재: ${window.location.protocol}//${window.location.hostname}`,
      };
    }
  }

  return { supported: true };
}

/**
 * 클립보드에 텍스트를 복사합니다.
 * Web Share API를 지원하지 않는 경우의 fallback으로 사용할 수 있습니다.
 *
 * @param text - 복사할 텍스트
 * @returns Promise<boolean> - 복사 성공 여부
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('클립보드 복사 중 오류가 발생했습니다:', error);
    return false;
  }
}
