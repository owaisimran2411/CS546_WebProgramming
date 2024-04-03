//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/movies.js that you will call in your routes below
import { Router } from "express";
import {
  searchMoviesByName,
  searchMovieById
} from './../data/movies.js'
import { argumentProvidedValidation, primitiveTypeValidation } from "../helpers.js";
import { log } from "console";

const router = Router()


router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try {
    res.render('home', {
      title: "Movie Finder"
    })
  } catch (e) {
    res.status(400).render('error', {
      error: e
    })
  }
});

router.route('/searchmovies').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchMoviesByName and then call your data function passing in the searchMoviesByName and then rendering the search results of up to 20 Movies.
  try {
    console.log(req.body);
    argumentProvidedValidation(req.body.searchMoviesByName, "searchMoviesByName")
    // const title = req.body.searchMoviesByName.replace(/[^a-zA-Z ]/g, "")
    const title=req.body.searchMoviesByName
    const movieNameToSearch = primitiveTypeValidation(title, "movieName", "String")
    if(movieNameToSearch.length === 0) {
      throw 'No Input Provided'
    }
    const data = await searchMoviesByName(movieNameToSearch)
    // console.log(data.results.length)
    if (typeof data != 'string' ) {
      // console.log(data.results);
      return res.status(200).render('movieSearchResults', {
        moviesList: data.results,
        title: "Movies Found",
        searchMoviesByName: movieNameToSearch
      })
    } else if (typeof data == 'string' && data === 'Movie not found!') {
      return res.status(404).render('error', {
        error: movieNameToSearch,
        notFoundError: true
      })
    } else {
      // console.log(data)
      return res.status(400).render('error', {
        error: data,
        badRequestError: true
      })
    }
  } catch (e) {
    // console.log(e)
    return res.status(400).render('error', {
      error: e,
      badRequestError: true
    })
  }
});

router.route('/movie/:id').get(async (req, res) => {
  //code here for GET a single movie
  try {
    argumentProvidedValidation(req.params.id, 'id')
    const id = primitiveTypeValidation(req.params.id, 'id', 'String')

    const data = await searchMovieById(id)
    if(typeof data === 'string') {
      res.status(404).render('error', {
        error: data,
        notFoundError: true

      })
    } else {
      res.status(200).render('movieById', {
        data: data.data,
        title: data.data.Title
      })
    }
    

  } catch (e) {
    res.status(400).render('error', {
      error: e,
      validationError: true
    })
  }
});

//export router
export default router;
