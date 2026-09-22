import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// MSW Worker 설정 (개발 모드에서만 사용)
export const worker = setupWorker(...handlers);

// TODO: 실제 앱 bootstrap에서 worker.start() 호출
// Mock API가 필요한 단계 (STEP 5+)에서 연결
