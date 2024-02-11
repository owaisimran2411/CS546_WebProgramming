/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/
const parameterSuppliedValidator = (argName) => {
    if(!argName) {
        throw `${argName || "parameter"} is not supplied`
    }
}
const arrayValidator = (argName) => {
    if (!Array.isArray(argName)) {
        throw `${argName} is not an array`
    }
    return
}

const functionValidator = (argName) => {
    if(typeof argName !== 'function') {
        throw `input parameter is not a function`
    }
    return
}

const primitiveDataTypeValidator = (argName, dataType) => {
    switch(dataType) {
        case "String":
            if (typeof argName !== "string") {
                throw `${argName} is not a string`
            }
            break;
        case "Number":
            if (typeof argName !== "number") {
                throw `${argName} is not a number`
            }
            break;
        case "Boolean":
            if (typeof argName !== "boolean") {
                throw `${argName} is not a boolean`
            }
            break;
        case "Object":
            if (typeof argName !== "object") {
                throw `${argName} is not an object`
            }
            break;
        default:
            break;
    }
}

export {
    parameterSuppliedValidator,
    arrayValidator,
    functionValidator,
    primitiveDataTypeValidator
}