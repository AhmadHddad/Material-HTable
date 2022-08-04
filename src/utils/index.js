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


export const callFuncOrReturn = (first, ...rest) => typeof first === 'function' ? first(...rest) : first;

var hasOwn = {}.hasOwnProperty;
export function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg) continue;

        var argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            if (arg.length) {
                var inner = classNames.apply(null, arg);
                if (inner) {
                    classes.push(inner);
                }
            }
        } else if (argType === 'object') {
            if (arg.toString === Object.prototype.toString) {
                for (var key in arg) {
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