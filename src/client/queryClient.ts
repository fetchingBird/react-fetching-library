interface QueryClientConfig {
  queryCache: any;
}
export class QueryClient {
  queryCache: any;
  queryDefault: Map<string, any>;
  mountCount: number;

  constructor(config: QueryClientConfig) {
    // config 값을 받아서 사용
    this.queryCache = config.queryCache; // 초기값
    this.queryDefault = new Map();
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
}
