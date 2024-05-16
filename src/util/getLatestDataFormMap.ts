import { CacheDataArgs } from '../context/CacheStoreProvider';

export const getLatestDataFromMap = (
  map: Map<string[], CacheDataArgs>,
  keyArray: string[]
): CacheDataArgs | null => {
  return Array.from(map.entries()).reduce((latest, [key, value]) => {
    if (
      Array.isArray(key) &&
      key.length === keyArray.length &&
      key.every((val, index) => val === keyArray[index])
    ) {
      if (!latest || value.createAt > latest.createAt) {
        return value;
      }
    }
    return latest;
  }, null as CacheDataArgs | null);
};
