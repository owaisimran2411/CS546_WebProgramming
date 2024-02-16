//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data
import { 
    primitiveTypeValidation,
    argumentProvidedValidation,
    readDataFromGist,
    authorGithubGist
} from './helpers.js'


import {
    getBookById
} from './books.js'

const getAuthorById = async (id) => {
    argumentProvidedValidation(id, "id")
    primitiveTypeValidation(id, "id", "String")
    id = id.trim()
    if (id.length > 0) {
        
        const data = await readDataFromGist(authorGithubGist)
        const idFlatted = data.filter((el) => el.id === id)
        if (idFlatted.length > 0) {
            return idFlatted[0]
        } else {
            throw `author not found`
        }
    } else {
        throw `Author ID is just empty spaces`
    }
    
};

const searchAuthorsByAge = async (age) => {
    argumentProvidedValidation(age, "age")
    primitiveTypeValidation(age, "age", "Number")
    if(age>0 && age<101) {
        const data = await readDataFromGist(authorGithubGist)
        const systemDate = new Date()
        const d1Str = `${systemDate.getMonth()+1}/${systemDate.getDate()}/${systemDate.getFullYear()}`
        const d1 = new Date(d1Str)
        const authorFilters = data.filter((el) => (Math.ceil(Math.abs(new Date(el.date_of_birth) - d1)/(1000*60*60*24*365)) >= age) )
        const res = authorFilters.map((el) => `${el.first_name} ${el.last_name}`)
        return res
        
    } else {
        throw `age is not a positive whole number b/w 1-100`
    }
    
};


const getBooksByState = async (state) => {
    argumentProvidedValidation(state, "state")
    primitiveTypeValidation(state, "state", "String")
    state = state.toUpperCase().trim()
    if(state.length === 0) {
        throw `State Name is an empty string`
    } else {
        if (state.length !== 2) {
            throw `State contains more than 2 characters`
        } else {
            const validStateAbbreviation = [
                'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
            ]
            if (validStateAbbreviation.indexOf(state) > -1) {
                const data = await readDataFromGist(authorGithubGist)
                const dataFiltered = data.filter((el) => el.HometownState === state)
                let bookIds = []
                dataFiltered.forEach(element => {
                    bookIds = bookIds.concat(element.books)
                });
                const result = []
                for(let i=0; i<bookIds.length; i++) {
                    const bookData = await getBookById(bookIds[i])
                    result.push(bookData.title)
                }
                return result
                
            } else {
                throw `Invalid State Abbreviation`
            }
        }
    }

};

const searchAuthorsByHometown = async (town, state) => {
    argumentProvidedValidation(state, "state")
    argumentProvidedValidation(town, "town")
    primitiveTypeValidation(town, "town", "String")
    primitiveTypeValidation(state, "state", "String")
    state = state.toUpperCase().trim()
    town = town.toLowerCase().trim()
    if(state.length === 0 || town.length === 0) {
        throw `State or Town Name is an empty string`
    } else {
        if (state.length !== 2) {
            throw `State contains more than 2 characters`
        } else {
            const validStateAbbreviation = [
                'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
            ]
            if (validStateAbbreviation.indexOf(state) > -1) {
                const data = await readDataFromGist(authorGithubGist)
                const dataFiltered = []
                for(let i=0; i<data.length; i++) {
                    if (data[i]['HometownCity'].toLowerCase() === town && data[i]['HometownState'] === state) {
                        dataFiltered.push({first_name: data[i].first_name, last_name: data[i].last_name})
                    }
                }
                const output = dataFiltered.sort((a, b) => {
                    if (a.last_name > b.last_name) {
                        return 1;
                    } else if (a.last_name < b.last_name) {
                        return -1;
                    }
                });

                const result = output.map(el => `${el.first_name} ${el.last_name}`)
                return (result);
                
                
            } else {
                throw `Invalid State Abbreviation`
            }
        }
    }
};

const getAuthorBooks = async (authorid) => {
    try {
        const authorData = await getAuthorById(authorid)
        const res = []
        for(let i=0; i< authorData["books"].length; i++) {
            const bookData = await getBookById(authorData["books"][i])
            res.push(bookData.title)
        }
        return res
    } catch (e) {
        throw e
    }
};

export {
    getAuthorById,
    searchAuthorsByAge,
    getBooksByState,
    searchAuthorsByHometown,
    getAuthorBooks
}
