import { sendGAEvent } from '@next/third-parties/google';
import { GA_EVENT_NAME } from '@/constants';

export const GA = {
  onClickTestStart: () => {
    sendGAEvent('event', GA_EVENT_NAME.BUTTON_TEST_START, {
      button_name: '나의_개운법_알아보기',
    });
  },

  onClickShare: () => {
    sendGAEvent('event', GA_EVENT_NAME.BUTTON_SHARE, {
      button_name: '공유하기',
    });
  },

  onClickRetry: () => {
    sendGAEvent('event', GA_EVENT_NAME.BUTTON_RETRY, {
      button_name: '다시해보기',
    });
  },

  onClickAppStore: () => {
    sendGAEvent('event', GA_EVENT_NAME.BUTTON_APP_STORE, {
      button_name: '럭키즈_알아보기',
    });
  },
};
