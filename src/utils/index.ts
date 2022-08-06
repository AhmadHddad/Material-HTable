export function isNullOrUndefined<T = any>(val: T): boolean {
  return val === null || val === undefined;
}

export function toObject(source: any) {
  return Object.assign({}, source);
}

export function toArray<T>(source: [] | T): T[] {
  if (isNullOrUndefined(source)) return [];
  return Array.isArray(source) ? source : [source];
}

export const conditionalReturn = (
  condition: boolean,
  first: any,
  second = null
) => (condition ? first : second);

export function callIfFunctionOrReturnIfObj<T = any>(
  source: (param: any) => T,
  param: any
) {
  return typeof source === 'function' ? source(param) : toObject(source);
}

export function returnObjFromFunc<T = any>(source?: any, param?: T) {
  return toObject(callIfFunctionOrReturnIfObj(source, param));
}

export function callFuncOrReturn<T = any>(first: T, ...rest: any) {
  return typeof first === 'function' ? first(...rest) : first;
}
