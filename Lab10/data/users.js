//import mongo collections, bcrypt and implement the following data functions
import {
  argumentProvidedValidation,
  primitiveTypeValidation
} from './../helpers'

import {
  users
} from './../config/mongoCollections'

import { ObjectId } from "mongodb";
import bcrypt from 'bcryptjs';

export const registerUser = async (
  firstName,
  lastName,
  username,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  
  argumentProvidedValidation(firstName, 'firstName')
  argumentProvidedValidation(lastName, 'lastName')
  argumentProvidedValidation(username, 'username')
  argumentProvidedValidation(password, 'password')
  argumentProvidedValidation(favoriteQuote, 'favoriteQuote')
  argumentProvidedValidation(themePreference, 'themePreference')
  argumentProvidedValidation(role, 'role')

  // firstName validation
  firstName = primitiveTypeValidation(firstName, 'firstName', 'String')
  if(firstName.length < 2 || firstName.length > 25 || /\d/.test(firstName)) {
    throw `First Name constraint(s) violated`
  }

  // lastName validation
  lastName = primitiveTypeValidation(lastName, 'lastName', 'String')
  if(lastName.length < 2 || lastName.length > 25 || /\d/.test(lastName)) {
    throw `Last Name constraint(s) violated`
  }

  // username validation
  username = primitiveTypeValidation(username, 'username', 'String')
  if(username.length > 4 && lastName.length <= 10 && !/\d/.test(username)) {
    username = username.toLowerCase()
  } else {
    throw `Username constraint(s) violated`
  }
  if(checkUsernameDuplication(username)) {
    throw `Duplicate username`
  }

  // password validation
  password = primitiveTypeValidation(password, 'password', 'String')
  if(
    !/\d/.test(password) || 
    !/[A-Z]/.test(password) || 
    !/[a-z]/.test(password) || 
    !/[^A-Z0-9a-z]/.test(password) || 
    /\s/.test(password) ||
    password.length < 8 ) {
      throw `Password constraint(s) violated`
  }
  password = await bcrypt.hash(password, 10)

  // favouriteQuote validation
  favoriteQuote = primitiveTypeValidation(favoriteQuote, 'favoriteQuote', 'String')
  if(favoriteQuote.length<20 || favoriteQuote.length>255 || /\d/.test(favoriteQuote)) {
    throw `Favourite Quote constraint(s) violated`
  }

  // theme preference validation
  themePreference = primitiveTypeValidation(themePreference, 'themePreference', 'String')
  themePreference = themePreference.toLowerCase()
  if (themePreference !== 'dark' && themePreference !== 'light') {
    throw `Theme Preference can only be Dark/Light`
  }

  // role validation
  role = primitiveTypeValidation(role, 'role', 'String')
  role = role.toLowerCase()
  if (role !== 'dark' && role !== 'light') {
    throw `Theme Preference can only be Dark/Light`
  }

  // database insertion
  const userObject = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password,
    favoriteQuote: favoriteQuote,
    themePreference: themePreference,
    role: role
  }

  const userCollection = await users()
  const userInsertion = await userCollection.insertOne(userObject)

  if(!userInsertion.acknowledged || !userInsertion.insertedId) {
    throw `Insertion failed`
  } else {
    return {
      signupCompleted: true
    }
  }

};

export const loginUser = async (username, password) => {

  argumentProvidedValidation(username, 'username')
  argumentProvidedValidation(password, 'password')

  username = primitiveTypeValidation(username, 'username', 'String')
  if(username.length > 4 && lastName.length <= 10 && !/\d/.test(username)) {
    username = username.toLowerCase()
  } else {
    throw `Username constraint(s) violated`
  }

  password = primitiveTypeValidation(password, 'password', 'String')
  if(
    !/\d/.test(password) || 
    !/[A-Z]/.test(password) || 
    !/[a-z]/.test(password) || 
    !/[^A-Z0-9a-z]/.test(password) || 
    /\s/.test(password) ||
    password.length < 8 
  ) {
      throw `Password constraint(s) violated`
  }

  if(checkUsernameDuplication(username)) {
    const userCollection = await users()
    const userInformation = await userCollection.findOne({
      username: username
    })
    const passwordCompare = await bcrypt.compare(password, userInformation.password)
    if(!passwordCompare) {
      throw `Either the username or password is invalid`
    } else {
      return {
        firstName: userInformation.firstName,
        lastName: userInformation.lastName,
        favoriteQuote: userInformation.favoriteQuote,
        themePreference: userInformation.themePreference,
        role: userInformation.role
      }
    }
    
  } else {
    throw `Either the username or password is invalid`
  }


};

const checkUsernameDuplication = async (username) => {
  const userCollection = await users()
  const userInformation = await userCollection.findOne({
    username: username
  })
  console.log(userInformation)
  if(userInformation === null) {
    return true
  } else {
    return false
  }
}
