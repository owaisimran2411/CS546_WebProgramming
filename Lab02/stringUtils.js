/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import {
  arrayValidator, 
  functionValidator, 
  parameterSuppliedValidator, 
  primitiveDataTypeValidator
} from './helpers.js'

let swapChars = (string1, string2) => {
  //code goes here
  parameterSuppliedValidator(string1)
  parameterSuppliedValidator(string2)
  primitiveDataTypeValidator(string1, "String")
  primitiveDataTypeValidator(string2, "String")
  string1 = string1.trim()
  string2 = string2.trim()
  if(string1 === "" || string2 === "") {
    throw `String is an empty string`
  }
  if(string1.length < 4 || string2.length < 4) {
    throw `length is less than 4 characters`
  }
  return`${string2.substring(0,4)}${string1.substring(4,string1.length)} ${string1.substring(0,4)}${string2.substring(4, string2.length)}`
  
};

let longestCommonSubstring = (str1, str2) => {
  //code goes here
  parameterSuppliedValidator(str1)
  parameterSuppliedValidator(str2)
  primitiveDataTypeValidator(str1, "String")
  primitiveDataTypeValidator(str2, "String")
  const substrings1 = []
  const substrings2 = []
  str1 = str1.trim()
  str2 = str2.trim()
  

  if(str1 === "" || str2 === "" ) {
    throw `String is an empty string`
  }
  if(str1.length <= 4 || str2.length <= 4) {
    throw `length is less than 5 characters`
  }

  for (let i = 0; i < str1.length; i++) {
    for (let j = i + 1; j <= str1.length; j++) {
        substrings1.push(str1.slice(i, j));
    }
  };

  for (let i = 0; i < str2.length; i++) {
    for (let j = i + 1; j <= str2.length; j++) {
        substrings2.push(str2.slice(i, j));
    }
  };

  let result = ""

  for(let i=0; i<substrings1.length; i++) {
    if (substrings2.includes(substrings1[i])) {
      if (result.length < substrings1[i].length) {
        result = substrings1[i]
      }
    }
  }
  return result




};

let palindromeOrIsogram = (arrStrings) => {
  //code goes here
  parameterSuppliedValidator(arrStrings)
  arrayValidator(arrStrings)
  for(let i=0; i<arrStrings.length; i++) {
    primitiveDataTypeValidator(arrStrings[i], "String")
    arrStrings[i] = arrStrings[i].trim()
    if(arrStrings[i] === "") {
      throw `Error: String is an empty String`
    }
  }
  if(arrStrings.length < 2) {
    throw `The length of supplied array is less than 2`
  }

  const result = {}
  arrStrings.forEach(el => {
    let isPalindrome = true
    let isIsogram = true
    
    let s = el
    el = el.toLowerCase()
    el = el.replace(/[^0-9a-z]/gi, '')
    // console.log(el);
    // console.log(el)
    // palindrome check
    // if (el.length % 2 == 0) {
      // console.log(el.length/2)
      for(let i=0; i<el.length/2 >> 0; i++) {
        if (el[i] != el[el.length-i-1]) {
          isPalindrome = false
          break
        }
      }
    // }
    // else {
    //   for(let i=0; i<(el.length/2 >> 0)-1; i++) {
    //     if (el[i] != el[el.length-i]) {
    //       isPalindrome = false
    //       break
    //     }
    //   }
    // }
    

    // isogram check
    let uniqueCharacters = [... new Set(el)]
    // console.log(uniqueCharacters)
    if (el.length != uniqueCharacters.length) {
      isIsogram = false
    }

    if (isPalindrome && isIsogram) {
      result[s] = "Both"
    }
    else if (isPalindrome && !isIsogram) {
      result[s] = "Palindrome"
    }
    else if (!isPalindrome && isIsogram) {
      result[s] = "Isogram"
    }
    else {
      result[s] = "Neither"
    }
  })
  return result
};

export {
  swapChars,
  longestCommonSubstring,
  palindromeOrIsogram
}