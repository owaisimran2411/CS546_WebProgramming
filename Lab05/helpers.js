//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import axios from 'axios'

const peopleGithubGist = 'https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json'
const companiesGistGithub = 'https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json'
const readDataFromGist = async (gistURL) => {
    const { data } = await axios.get(gistURL)
    return data
}

export {
    readDataFromGist,
    peopleGithubGist,
    companiesGistGithub
}
