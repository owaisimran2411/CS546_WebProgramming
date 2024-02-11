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

let compareValues = (a1, a2) => {
  let local_a1 = a1
  let local_a2 = a2
  let counter=0
  local_a2.forEach(el => {
    let ind = local_a1.indexOf(el)
    if (ind > -1) {
      local_a1.splice(ind, 1)
      counter += 1
    }
    else {
      return false
    }

  })
  if (local_a1.length == 0 && counter  == local_a2.length) {
    return true
  } else {
    return false
  }
}
let nestedObjectsDiffHelper = (obj1, obj2, res) => {
  let ob1K = Object.keys(obj1)
  let ob2K = Object.keys(obj2)

  for(let el of ob2K) {
    // console.log(el)
    if(obj1[el]) {
      // if obj1 and obj2 contains el
      ob1K.splice(ob1K.indexOf(el), 1)
      let obj1V = obj1[el]
      let obj2V = obj2[el]

      if(Array.isArray(obj1V) && Array.isArray(obj2V)) {
        // both are arrays and call array compare function
        if(!compareValues(obj1V, obj2V)) {
          // both array elements are not equal
          res[el] = obj2V
        }
      }
      else if (typeof obj1V === "object" && typeof obj2V === "object") {
        // need to make recursive call to the same function
        let result = nestedObjectsDiffHelper(obj1V, obj2V, {})
        // console.log(el, Object.values(result))
        if(Object.values(result).length != 0) {
          res[el] = result
        }
        
        
      }
      else if (obj1V !== obj2V) {
        // keys are common but value is not same
        // add value of that key in obj2 in the result
        res[el] = obj2V
      }
    }
    else {
      // if el is not in obj1
      res[el] = obj2[el]
    }
  }
  for(let el of ob1K) {
    res[el] = undefined
  }
  return res
}


let objectStats = (arrObjects) => {
  //Code goes here
  const flatList = []
  const result = {
    mean: null,
    median: null,
    mode: null,
    range: null,
    minimum: null,
    maximum: null,
    count: null,
    sum: null
  }
  parameterSuppliedValidator(arrObjects)
  arrayValidator(arrObjects)
  arrObjects.forEach(element => {
    primitiveDataTypeValidator(element, "Object")
    if (Object.keys(element).length <= 0) {
      throw `${element} does not have any key/value`
    }
    Object.keys(element).forEach(el => {
      primitiveDataTypeValidator(element[el], "Number")
      if(Math.floor(element[el]) !== element[el]) {
        if(element[el].toString().split(".")[1].length > 3) {
          throw `Decimal Digits greater than 3`
        }
      }
      flatList.push(element[el])
    }) 
  });
  flatList.sort()
  // console.log(flatList)
  result.count = flatList.length;

  // calculating sum
  let calculation = 0
  flatList.forEach(element => {
    calculation += element
  })
  result.sum = calculation

  // calculating mean
  result.mean = result.sum/result.count
  result.maximum = Math.max(...flatList)
  result.minimum = Math.min(...flatList)
  result.range = result.maximum - result.minimum

  const middleIndex = Math.floor(flatList.length / 2);

  if (flatList.length % 2 === 0) {
    result.median = (flatList[middleIndex - 1] + flatList[middleIndex]) / 2;
  } else {
    result.median = flatList[middleIndex];
  }


  // calculating mode
  const counter = {}
  flatList.forEach(el => {
    counter[el] = (!counter[el] ? 1: counter[el]+1)
  })
  // console.log(counter)
  const maxFrequency = Math.max(...Object.values(counter))
  const mode = []
  
  Object.keys(counter).forEach(el => {
    if (counter[el] === maxFrequency) {
      mode.push(el)
    }
  })
  for(let i=0; i<mode.length; i++) {
    mode[i] = parseInt(mode[i])
  }
  mode.sort()

  result.mode = (mode.length > 1 ? mode: mode[0])

  result.sum = Math.round(result.sum*1000)/1000
  result.mean = Math.round(result.mean*1000)/1000
  result.maximum = Math.round(result.maximum*1000)/1000
  result.minimum = Math.round(result.minimum*1000)/1000
  result.range = Math.round(result.range*1000)/1000
  result.median = Math.round(result.median*1000)/1000
  return result
};

let nestedObjectsDiff = (obj1, obj2) => {
  //Code goes here
  parameterSuppliedValidator(obj1)
  parameterSuppliedValidator(obj2)

  if(Array.isArray(obj1) || Array.isArray(obj2)) {
    throw `supplied input is array and not object`
  }
  primitiveDataTypeValidator(obj1, "Object")
  primitiveDataTypeValidator(obj2, "Object")

  if(Object.keys(obj1).length <=0 || Object.keys(obj2).length <=0) {
    throw "object is empty"
  }

  return nestedObjectsDiffHelper(obj1, obj2, {})

};

let mergeAndSumValues = (...args) => {
  //this function takes in a variable number of objects that's what the ...args signifies
  const result = {}

  for(const arg of args) {
    primitiveDataTypeValidator(arg, "Object")
    if(Object.keys(arg).length <= 0 || Object.values(arg).length <= 0) {
      throw `Object does not have atleast 1 key/value`
    }

    for(const key of Object.keys(arg)) {
      if (typeof arg[key] === "string") {
        try {
          const parseIntValue = parseInt(arg[key])
          if(isNaN(parseIntValue)) {
            throw `Value is not a string representing a number`
          }
          arg[key] = parseIntValue
        } catch (e) {
          throw `Value is not a string representing a number`
        }
      }
      primitiveDataTypeValidator(arg[key], "Number")
      result[key] = (result[key] ? result[key] + arg[key] : arg[key])
    }


  }
  return result
  
};


export {
  objectStats,
  nestedObjectsDiff,
  mergeAndSumValues
}