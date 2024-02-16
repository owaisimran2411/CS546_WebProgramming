//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import { 
    primitiveTypeValidation,
    argumentProvidedValidation,
    readDataFromGist,
    bookGistGithub
} from './helpers.js'

const getBookById = async (id) => {
    argumentProvidedValidation(id, "id")
    primitiveTypeValidation(id, "id", "String")
    id = id.trim()
    if (id.length > 0) {
        
        const data = await readDataFromGist(bookGistGithub)
        const idFlatted = data.filter((el) => el.id === id)
        if (idFlatted.length > 0) {
            return idFlatted[0]
        } else {
            throw `book not found`
        }
    } else {
        throw `Book ID is just empty spaces`
    }
};

const booksByPageCount = async (min, max) => {
    argumentProvidedValidation(min, "min")
    argumentProvidedValidation(max, "max")
    primitiveTypeValidation(min, "min", "Number")
    primitiveTypeValidation(max, "max", "Number")
    if (min<0 || max < 1) {
        throw `Argument is not a positive whole number`
    }
    if (max<min) {
        throw `Maximum is not greater than minimum`
    }
    const data = await readDataFromGist(bookGistGithub)
    const dataFiltered = []
    for(let i=0; i<data.length; i++) {
        if (data[i].pageCount>=min && data[i].pageCount<=max) {
            dataFiltered.push(data[i].id)
        }
    }
    return dataFiltered

};

const sameYear = async (year) => {
    argumentProvidedValidation(year, "year")
    primitiveTypeValidation(year, "year", "Number")
    if(year<0) {
        throw `Year is not a positive whole number`
    }
    if(year<1900 || year>2024) {
        throw `Year is not a valid year`
    }
    const data = await readDataFromGist(bookGistGithub)
    const dataFiltered = data.filter( (el) => new Date(el.publicationDate).getFullYear() === year)
    // console.log(dataFiltered);
    return dataFiltered

};

const minMaxPrice = async () => {
    const data = await readDataFromGist(bookGistGithub)
    const priceList = data.map(el => el.price)
    const min = Math.min(...priceList)
    const max = Math.max(...priceList)
    const res = {
        cheapest: [],
        mostExpensive: []
    }
    for(let i=0; i<data.length; i++) {
        if(data[i].price === min) {
            res.cheapest.push(data[i].id)
        }

        if(data[i].price === max) {
            res.mostExpensive.push(data[i].id)
        }
    }
    return res
};

const searchBooksByPublisher = async (publisher) => {
    argumentProvidedValidation(publisher, "publisher")
    primitiveTypeValidation(publisher, "publisher", "String")
    publisher = publisher.toLowerCase().trim()
    if (publisher.length > 0) {
        const data = await readDataFromGist(bookGistGithub)

        const publisherList = data.map(el => el.publisher.toLowerCase())
        if (publisherList.indexOf(publisher) < 0) {
            throw `Invalid Publisher`
        } else {
            const dataFiltered = data.filter(el => el.publisher.toLowerCase() === publisher)
            if (dataFiltered.length>0) {
                return dataFiltered.map(el => el.id)
            } else {
                throw `no books found for the publisher`
            }
            
        }
    } else {
        throw `publisher is just an empty string`
    }
    

};

export {
    getBookById,
    booksByPageCount,
    sameYear,
    minMaxPrice,
    searchBooksByPublisher
}
