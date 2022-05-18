import { typedKeys } from './utils';

const obj = { a: 1, b: 2, c: 'three' };
const arr = Object.values(obj);
const valuesByType = {
  boolean: [true, false],
  complex: [arr, obj, new Date()],
  null: [null],
  number: [1, -1, 0, -0, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER],
  string: ['', 'ts-runtime-dx', JSON.stringify(obj)],
  undefined: [undefined],
};
type ValueKey = keyof typeof valuesByType;

export const falsyValues = [false, 0, -0, '', null, undefined, NaN];
export const truthyValues = [true, 1, -1, 'test', {}, [], Number.POSITIVE_INFINITY];

export function getValuesByType(keyOrKeys: ValueKey | ValueKey[]) {
  if (Array.isArray(keyOrKeys)) {
    return keyOrKeys.map(key => valuesByType[key]).flat();
  }

  return valuesByType[keyOrKeys];
}

export function getValuesByTypeWithout(excludedKeyOrKeys: ValueKey | ValueKey[]) {
  return typedKeys(valuesByType)
    .filter(key => {
      if (Array.isArray(excludedKeyOrKeys)) {
        return !excludedKeyOrKeys.includes(key);
      }

      return key !== excludedKeyOrKeys;
    })
    .map(key => valuesByType[key])
    .flat();
}
