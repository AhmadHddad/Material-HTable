export function isNullOrUndefined(val) {
    return val === null || val === undefined;
}


export function toObject(source) {
    return Object.assign({}, source)
}

export function toArray(source) {
    if (isNullOrUndefined(source)) return []
    return Array.isArray(source) ? source : [source]
}


export const conditionalReturn = (condition, first, second = null) => condition ? first : second
export const callIfFunctionOrReturnIfObj = (source, param) => typeof source === 'function' ? source(param) : toObject(source)
export const returnObjFromFunc = (source, param) => toObject(callIfFunctionOrReturnIfObj(source, param))


export function uuidv4() {
    //@ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
  }
  