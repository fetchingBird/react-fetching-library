# Vitest 실행하기 
### 목적 
- jest는 vite의 플러그인 동작방식 때문에 완전히 지원하지 않고 있습니다. 따라서 Vite 기반으로 작동하는 테스팅 프레임워크 Vitest를 사용합니다. 
### 사용방법
- `test`스크립트는 Vitest를 감시(watch)모드로 실행해줍니다. 
```shell
yarn test
```
- `test:run`스크립트는 Vitest를 일회성으로 실행해줍니다. 
```shell
yarn test:run
```

하이