# react-fetching-library

<p align="center">
<img src="https://github.com/fetchingBird/react-fetching-library/assets/82128525/c93682bb-3231-4b77-9e29-d0114fd079a8.png" width="400" height="400"/>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

✅ 불러온 데이터를 다시 불러오지 않도록 **캐시에 저장** <br/>
✅ 캐시 스토어가 **상태관리 스토어로서 동작** <br/>
✅ 캐시를 invalidation <br/>
✅ 캐시의 키를 이용해서 같은 요청에 대해 다르게 저장 <br/>

## Short example of use

```js
import { useQuery } from '@react-fetching-library';


export const UsersListContainer = () => {

  const queryFn = () => {
    return 'https://example.com';
  };

  const { data, isPending, error } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => queryFn,
  });

  return <UsersList loading={loading} error={error} user={data} />;
};
```
