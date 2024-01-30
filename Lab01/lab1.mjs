export const questionOne = (index) => {
  // Implement question 1 here
  let num1 = 0
  let num2 = 1
  if (index < 1) {
    num2 = 0
  }
  else if (index === 1) {
    num2 = 1
  }
  else {
    for(let i=1; i<index; i++) {
      let num3  = num2 + num1
      num1 = num2
      num2 = num3
    }
  }
  // console.log(num2)
  return num2; //return result
};

export const questionTwo = (arr) => {
  // Implement question 2 here
  let output;
  if (!arr) {
    output = {}
  }
  else {
    output = {}
    if (arr.length > 0) {
      // console.log(arr)
      for(let el of arr) {
        let isPrime = true
        if (el > 1) {
          for(let i=2; i<el; i++) {
            if( el%i === 0 ) {
              isPrime = false
              break
            }
          }
        }
        else {
          isPrime = false
        }
        output[el] = isPrime
      }
      
    }
    
  }
  return output; //return result
};

export const questionThree = (str) => {
  // Implement question 3 here
  let output = {
    consonants: 0,
    vowels: 0,
    numbers: 0,
    spaces: 0,
    punctuation: 0,
    specialCharacters: 0
  }

  // convert the input string into lower case
  let strLower = str.toLowerCase()
  if (str.length > 0) {
    let counter = 0;
    let testCharacters = 'aeiou'
    for(let el of testCharacters) {
      counter += (strLower.split(el).length - 1)
    }

    output.vowels = counter

    counter = 0;
    testCharacters = 'qwrtypsdfghjklzxcvbnm'
    for(let el of testCharacters) {
      counter += (strLower.split(el).length - 1)
    }

    output.consonants = counter

    counter = 0;
    testCharacters = ' '
    for(let el of testCharacters) {
      counter += (strLower.split(el).length - 1)
    }

    output.spaces = counter

    counter = 0;
    testCharacters = '0123456789'
    for(let el of testCharacters) {
      counter += (strLower.split(el).length - 1)
    }

    output.numbers = counter

    counter = 0;
    testCharacters = '?!,:;[](){}\'"'
    for(let el of testCharacters) {
      counter += (strLower.split(el).length - 1)
    }

    output.punctuation = counter

    // checking for ellipses and period
    counter = 0;
    counter += (strLower.split('...').length - 1)
    if (counter > 0) {
      // means there is ellipses present, remove them from the existing string first, then count the periods
      let tempStr = strLower.split('...').toString()
      counter += (tempStr.split('.').length - 1)
    }
    else {
      counter += (strLower.split('.').length - 1)
    }
    output.punctuation += counter


    // checking for - and -- and ---
    let tempStr = ''
    counter = 0;
    counter += (strLower.split('---').length - 1)
    if (counter > 0) {
      tempStr = strLower.split('---').toString()
    }

    output.punctuation += counter

    counter = 0;
    counter += (tempStr.split('--').length - 1)
    if (counter > 0) {
      tempStr = tempStr.split('--').toString()
    }

    output.punctuation += counter

    counter = 0;
    counter += (tempStr.split('-').length - 1)
    if (counter > 0) {
      tempStr = tempStr.split('-').toString()
    }

    output.punctuation += counter

    counter = 0
    testCharacters = '~@#$%^&*=<>/\\|_'
    for(let el of testCharacters) {
      counter += (strLower.split(el).length - 1)
    }
    output.specialCharacters += counter
    
    // output.specialCharacters = ( str.length - output.consonants - output.numbers - output.punctuation - output.spaces - output.vowels )
  }

  
  return output; //return result
};

export const questionFour = (arr) => {
  // Implement question 4 here
  const output = []
  for(let el of arr) {
    let isUnique = true
    for(let x of output) {
      if (x === el) {
        isUnique = false
      }
    }
    if (isUnique) {
      output.push(el)
      // console.log(el)
    }
    else {
      continue
    }
  }
  // console.log(output)
  return output; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'MUHAMMAD OWAIS',
  lastName: 'IMRAN',
  studentId: '20025554'
};
