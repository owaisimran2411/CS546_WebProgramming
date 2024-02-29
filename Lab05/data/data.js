/*Here, you can export the data functions
to get the comapnies, people, getCompanyByID, getPersonById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/

import {
    peopleGithubGist,
    companiesGistGithub,
    readDataFromGist
} from './../helpers.js'

const getCompanies = async () => {
    const data = await readDataFromGist(companiesGistGithub)
    return data
};

const getPeople = async () => {
    const data = await readDataFromGist(peopleGithubGist)
    return data
};

const getCompanyById = async (id) => {
    const data = await getCompanies()
    const dataFiltered = data.filter((el) => el.id === id)
    return dataFiltered
};

const getPersonById = async (id) => {
    const data = await getPeople()
    const dataFiltered = data.filter((el) => el.id === id)
    return dataFiltered
};

export {
    getCompanies,
    getPeople,
    getCompanyById,
    getPersonById
}
