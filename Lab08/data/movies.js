//import axios, md5
import {
  argumentProvidedValidation,
  primitiveTypeValidation,
  requestWithMovieID,
  requestWithMovieName
} from './../helpers.js'

export const searchMoviesByName = async (title) => {
  /*Function to make an axios call to search the api and return up to 20 movies matching the title param
  API endpoint: http://www.omdbapi.com/?apikey=CS546&s={title}
  */
  argumentProvidedValidation(title, "movieName")
  // title = title.replace(/[^a-zA-Z ]/g, "")
  title = primitiveTypeValidation(title, "title", "String")

  const data = await requestWithMovieName(title)
  // console.log(data)
  // console.log(Object.keys(data.data))
  if(!data.data['Error']) {
    if(data.data.totalResults!=undefined && data.data.totalResults>10) {
      const secondCall = await requestWithMovieName(title, 2)
      // console.log(secondCall.data.Search);
      return {
        results: data.data.Search.concat(secondCall.data.Search)
      }
    } else {
      return {
        results: data.data.Search
      }
    }
    
  } else {
    return data.data.Error
  }
};

export const searchMovieById = async (id) => {
  /*Function to make an axios call to the the api matching the id
 API endpoint: http://www.omdbapi.com/?apikey=CS546&i={id}
  */
  argumentProvidedValidation(id, 'id')
  id = primitiveTypeValidation(id, 'id', 'String')
  
  const data = await requestWithMovieID(id)
  // console.log(data.data)
  if(!data.data.Error) {
    return data 
  } else {
    return data.data.Error
  }
};
