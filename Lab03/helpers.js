import axios from "axios"

//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.
const authorGithubGist = 'https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json'
const bookGistGithub = 'https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json'
const argumentProvidedValidation = (arg, argName) => {
    if(!arg) {
        throw `${argName || "Argument"} not provided`
    }
}
const primitiveTypeValidation = (arg, argName, primitiveType) => {
    switch(primitiveType) {
        case "String":
            if (typeof arg !== "string") {
                throw `${argName || "Argument"} is not a String`
            }
            break;
        case "Number":
            if (typeof arg !== "number" || isNaN(arg)) {
                throw `${argName || "Argument"} is not a Number`
            }
            break;
    }
}

const readDataFromGist = async (gistURL) => {
    const { data } = await axios.get(gistURL)
    return data
}
export {
    argumentProvidedValidation,
    primitiveTypeValidation,
    readDataFromGist,
    authorGithubGist,
    bookGistGithub
}