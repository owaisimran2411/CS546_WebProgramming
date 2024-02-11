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


let setElementsToOne = (row, col, matrixLength, matrix) => {
  for(let i=0; i<matrixLength; i++) {
    matrix[row][i] = 1
  }
  for(let i=0; i<matrixLength; i++) {
    matrix[i][col] = 1
  }

  return matrix
}

let arrayPartition = (arrayToPartition, partitionFunc) => {
  //code goes here
  parameterSuppliedValidator(arrayPartition)
  arrayValidator(arrayToPartition)
  if(arrayToPartition.length === 0) {
    throw `arrayToPartition is an empty array`
  }
  if(arrayToPartition.length < 2) {
    throw `arrayToPartition is less than 2`
  }
  parameterSuppliedValidator(partitionFunc)
  functionValidator(partitionFunc)
  const result = [[], []]

  arrayToPartition.forEach(element => {
    if(typeof element === "string") {
      element = element.trim()
    }
    if(partitionFunc(element)) {
      result[0].push(element)
    }
    else {
      result[1].push(element)
    }
  });
  return result
};

let arrayShift = (arr, n) => {
  //code goes here
  const result = []
  parameterSuppliedValidator(arr)
  arrayValidator(arr)
  if(arr.length < 2) {
    throw `arr parameter has length less than 2`
  }
  if(n === 0) {
    // do nothing
    return arr
  }
  primitiveDataTypeValidator(n, "Number")
  if(n.toString().indexOf(".") != -1) {
    throw `${n} is not a Whole Number`
  }
  if(n>0) {
    for(let i=n-1; i>=0; i--) {
      let num = arr.pop()
      arr.unshift(num)
    }
  }
  else if (n<0) {
    for(let i=0; i<Math.abs(n); i++) {
      let num = arr[0];
      arr.shift()
      arr.push(num)
    }
  }
  // code logic for rotation
  return arr
};

let matrixOne = (matrix) => {
  //code goes here
  parameterSuppliedValidator(matrix)
  arrayValidator(matrix)
  if(matrix.length === 0) {
    throw `length of matrix is zero`
  }
  const matrixSubArrayLength = []
  matrix.forEach(element => {
    arrayValidator(element)
    if(element.length === 0) {
      throw `length of subarray ${element} is zero`
    }
    matrixSubArrayLength.push(element.length)
    element.forEach(el => {
      primitiveDataTypeValidator(el, "Number")
    })
  });
  if ([... new Set(matrixSubArrayLength)].length > 1) {
    throw `subarray lengths are not equal`
  } 

  for(let i=0; i<matrix.length; i++) {
    for(let j=0; j<matrixSubArrayLength[0]; j++) {
      if(matrix[i][j] === 0) {
        matrix = setElementsToOne(i, j, matrix.length, matrix)
      }
    }
  }
  return matrix

};

export {
  arrayPartition,
  arrayShift,
  matrixOne
}