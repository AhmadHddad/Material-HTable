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

