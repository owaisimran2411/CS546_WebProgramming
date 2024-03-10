// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

import { ObjectId } from "mongodb";

const argumentProvidedValidation = (arg, argName) => {
    // console.log(`Arg: ${argName}, Value: ${arg}`)
    if(!arg) {
        throw `${argName || "Argument"} not provided`
    }
}
const primitiveTypeValidation = (arg, argName, primitiveType) => {
    switch(primitiveType) {
        case "String":
            if (typeof arg !== "string" || arg.trim().length === 0) {
                throw `${argName || "Argument"} is not a String or an empty string`
            }
            break
        case "Number":
            if (typeof arg !== "number" || isNaN(arg)) {
                throw `${argName || "Argument"} is not a Number`
            }
            break
        case "Boolean":
            if (typeof arg !== "boolean") {
                throw `${argName || "Argument"} is not a Boolean`
            }
            break
        case "Array":
            if (!Array.isArray(arg) || arg.length === 0) {
                throw `${argName || "Argument"} is not an Array or is an empty array`
            }
            break
    }
}

const objectIdValidation = (_id) => {
    if(!ObjectId.isValid(_id)) {
        throw `${_id} is not a valid object id`
    }
}

export {
    argumentProvidedValidation,
    primitiveTypeValidation,
    objectIdValidation
}