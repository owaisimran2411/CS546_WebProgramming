//import express, express router as shown in lecture code
import { Router } from 'express'

import {
  argumentProvidedValidation,
  primitiveTypeValidation
} from './../helpers.js'

import {
  loginUser,
  registerUser
} from './../data/users.js'

const router = Router()

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
    return res.render(
      'register', {
        title: 'Register',
        themePreference: 'light'
      }
    )
    //code here for GET
  })
  .post(async (req, res) => {
    // console.log(req.body)
    if(
      "firstName" in req.body &&
      "lastName" in req.body &&
      "username" in req.body &&
      "password" in req.body &&
      "confirmPassword" in req.body &&
      "favoriteQuote" in req.body &&
      "themePreference" in req.body &&
      "role" in req.body
    ) {
      try {
        // console.log(req.body)
        let username = undefined
        let password = undefined
        let firstName = undefined
        let lastName = undefined
        let favoriteQuote = undefined
        let themePreference = undefined
        let role = undefined
        argumentProvidedValidation(req.body.firstName, 'firstName')
        argumentProvidedValidation(req.body.lastName, 'lastName')
        argumentProvidedValidation(req.body.username, 'username')
        argumentProvidedValidation(req.body.password, 'password')
        argumentProvidedValidation(req.body.favoriteQuote, 'favoriteQuote')
        argumentProvidedValidation(req.body.themePreference, 'themePreference')
        argumentProvidedValidation(req.body.role, 'role')

        username = primitiveTypeValidation(req.body.username, 'username', 'String')
        password = primitiveTypeValidation(req.body.password, 'password', 'String')
        firstName = primitiveTypeValidation(req.body.firstName, 'firstName', 'String')
        lastName = primitiveTypeValidation(req.body.lastName, 'lastName', 'String')
        favoriteQuote = primitiveTypeValidation(req.body.favoriteQuote, 'favoriteQuote', 'String')
        themePreference = primitiveTypeValidation(req.body.themePreference, 'themePreference', 'String')
        role = primitiveTypeValidation(req.body.role, 'role', 'String')

        if(firstName.length < 2 || firstName.length > 25 || /\d/.test(firstName)) {
          throw `First Name constraint(s) violated`
        }
        if(lastName.length < 2 || lastName.length > 25 || /\d/.test(lastName)) {
          throw `Last Name constraint(s) violated`
        }
        if(username.length > 4 && username.length <= 10 && !/\d/.test(username)) {
          username = username.toLowerCase()
        } else {
          throw `Username constraint(s) violated`
        }
        if(
          !/\d/.test(password) || 
          !/[A-Z]/.test(password) || 
          !/[a-z]/.test(password) || 
          !/[^A-Z0-9a-z]/.test(password) || 
          /\s/.test(password) ||
          password.length < 8 ) {
            throw `Password constraint(s) violated`
        }
        if(favoriteQuote.length<20 || favoriteQuote.length>255 || /\d/.test(favoriteQuote)) {
          throw `Favourite Quote constraint(s) violated`
        }
        if (themePreference !== 'light' && themePreference !== 'dark') {
          throw `Theme Preference can only be Dark/Light`
        }
        if (role !== 'admin' && role !== 'user') {
          throw `Role can only be Admin/User`
        }

        const userRegistration = await registerUser(firstName, lastName, username, password, favoriteQuote, themePreference, role)
        if(typeof userRegistration === 'String') {
          return res.status(500).render(
            'error', {
              title: 'Internal Server Error',
              errorMessage: 'Internal Server Error',
              themePreference: 'light'
            }
          )
        } else {
          return res.redirect('/login')
        }


      } catch (e) {
        return res.status(400).render(
          'register', {
            firstName: req.body.firstName || "",
            lastName: req.body.lastName || "",
            username: req.body.username || "",
            favoriteQuote: req.body.favoriteQuote || "",
            errorMessage: e,
            themePreference: 'light',
            title: 'Register'
          }
        )
      }


    } else {
      return res.status(400).render(
        'register', {
          firstName: req.body.firstName || "",
          lastName: req.body.lastName || "",
          username: req.body.username || "",
          favoriteQuote: req.body.favoriteQuote || "",
          errorMessage: "Incomplete input provided",
          themePreference: 'light'
        }
      )
    }
    
    //code here for POST
  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    return res.render(
      'login', {
        themePreference: 'light', // the value will be passed from req.session.user.themePreference
        title: 'Login'
      }
    )
  })
  .post(async (req, res) => {
    //code here for POST
    // console.log(req.body)
    if(
      "username" in req.body &&
      "password" in req.body
    ) {
      try {
        let username = undefined
        let password = undefined

        argumentProvidedValidation(req.body.username, 'username')
        argumentProvidedValidation(req.body.password, 'password')
        // username validation
        username = primitiveTypeValidation(req.body.username, 'username', 'String')
        if(username.length > 4 && username.length <= 10 && !/\d/.test(username)) {
          username = username.toLowerCase()
        } else {
          throw `Username constraint(s) violated`
        }

        // password validation
        password = primitiveTypeValidation(req.body.password, 'password', 'String')
        if(
          !/\d/.test(password) || 
          !/[A-Z]/.test(password) || 
          !/[a-z]/.test(password) || 
          !/[^A-Z0-9a-z]/.test(password) || 
          /\s/.test(password) ||
          password.length < 8 ) {
            throw `Password constraint(s) violated`
        }

        // console.log(username, password)
        const loginObject = await loginUser(username, password)

        if(typeof loginObject === 'String') {
          console.log('Unable to verify', loginObject)
        } else {
          req.session.user = loginObject
          const redirectRoute = loginObject.role === 'admin' ? '/admin' : '/user'
          // console.log(req.session)
          return res.redirect(redirectRoute)
        }
      } catch (e) {
        return res.status(400).render(
          'login', {
            themePreference: 'light',
            title: 'Login',
            errorMessage: e
          }
        )
      }



    } else {
      return res.status(400).render(
        'login', {
          themePreference: 'light',
          title: 'Login',
          errorMessage: 'Please enter username or password'
        }
      )
    }
    
  });

router.route('/user').get(async (req, res) => {
  //code here for GET
  return res.render(
    'user', {
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      currentTime: new Date().toUTCString(),
      role: req.session.user.role,
      favoriteQuote: req.session.user.favoriteQuote,
      title: 'User',
      themePreference: req.session.user.themePreference
    }
  )
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  return res.render(
    'admin', {
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      currentTime: new Date().toUTCString(),
      role: req.session.user.role,
      favoriteQuote: req.session.user.favoriteQuote,
      title: 'Admin',
      themePreference: req.session.user.themePreference
    }
  )
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  req.session.destroy()
  res.render(
    'logout', {
      title: 'Logout',
      message: 'You have been successfully logged out!',
      themePreference: 'light',
      
    }
  )
});

export default router
