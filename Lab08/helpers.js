import axios from "axios";
import { log } from "console";

const APIEndpoint = 'http://www.omdbapi.com/'
const APIKey = 'API_KEY_GOES_HERE'

const requestWithMovieName = async (movieTitle, pageNumber) => {
    const URL = `${APIEndpoint}?apiKey=${APIKey}&s=${movieTitle}&page=${pageNumber || 1}`
    // console.log(URL);
    const data = await axios.get(URL)
    return data
}

const requestWithMovieID = async (movieID) => {
    const URL = `${APIEndpoint}?apiKey=${APIKey}&i=${movieID}`
    // console.log(URL);
    const data = await axios.get(URL)
    return data
}

const argumentProvidedValidation = (arg, argName) => {
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
            arg = arg.trim()
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
    return arg
}

export {
    requestWithMovieID,
    requestWithMovieName,
    argumentProvidedValidation,
    primitiveTypeValidation
}