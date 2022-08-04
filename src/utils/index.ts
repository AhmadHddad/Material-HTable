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

export function classNames(..._: any) {
  var classes: any[] = [];
  const hasOwn = {}.hasOwnProperty;

  for (var i = 0; i < arguments.length; i++) {
    var arg: any = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        var inner = classNames.apply(null, arg as any);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === 'object') {
      if (arg.toString === Object.prototype.toString) {
        for (var key in arg as []) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      } else {
        classes.push(arg.toString());
      }
    }
  }

  return classes.join(' ');
}
