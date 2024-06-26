interface QueryCache {}
interface QueryClientConfig {
  queryCache: QueryCache;
}
export class QueryClient {
  queryCache: any;

  queryDefaults: Map<string, any>;

  mountCount: number;

  constructor(config: QueryClientConfig) {
    this.queryCache = config.queryCache;
    this.queryDefaults = new Map();
    this.mountCount = 0;
  }

  mount(): void {
    // mount가 일어난 한번만 구독
    this.mountCount += 1;

    if (this.mountCount !== 1) return;
  }

  unmount(): void {
    // unmount 시 구독해지
    this.mountCount -= 1;
    if (this.mountCount !== 0) return;
  }

  clear(): void {
    // 캐시에 저장되어 있는 모든 데이터 제거
    this.queryCache.clear();
  }
}
