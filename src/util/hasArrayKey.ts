import { CacheDataArgs } from '../context/CacheStoreProvider';

export const hasArrayKey = (
  map: Map<string[], CacheDataArgs>,
  keyArray: string[]
) => {
  return Array.from(map.keys()).some(
    (key) =>
      Array.isArray(key) &&
      key.length === keyArray.length &&
      key.every((val, index) => val === keyArray[index])
  );
};
