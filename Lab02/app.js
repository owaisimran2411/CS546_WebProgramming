/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

import { arrayPartition, arrayShift, matrixOne } from './arrayUtils.js'
import { swapChars, longestCommonSubstring, palindromeOrIsogram } from './stringUtils.js'
import { objectStats, nestedObjectsDiff, mergeAndSumValues } from './objectUtils.js'


// ================= arrayUtils.js =========================

// function calls for arrayPartition
try {
    // passing case
    const arr1 = [1, 2, 3, 4, 15, 20, 11]
    const func = (num) => num % 5 === 0
    console.log(arrayPartition(arr1, func))
} catch (e) {
    console.error(e)
}

try {
    // failing case; will throw an error
    const arr1 = []
    const func = (num) => num % 5 === 0
    console.log(arrayPartition(arr1, func))
} catch (e) {
    console.error(e)
}

// try {
//     // failing case; function not supplied
//     const arr1 = ["string", "fail", "pass", "this will pass", "   th"]
//     console.log(arrayPartition(arr1))
// } catch (e) {
//     console.error(e)
// }

// try {
//     // passing case
//     const arr1 = ["string", "fail", "pass", "this will pass", "   th"]
//     const func = (arg) => arg.length > 4
//     console.log(arrayPartition(arr1, func))
// } catch (e) {
//     console.error(e)
// }

// try {
//     // invalid case of datatype
//     const arr1 = "string parameter"
//     const func = (arg) => arg.length > 4
//     console.log(arrayPartition(arr1, func))
// } catch (e) {
//     console.error(e)
// }

// function calls for arraySift
try {
    // passing case
    const arr1 = [1, 4, "some", "dummy", "input"]
    console.log(arrayShift(arr1, 4));
} catch (e) {
    console.error(e)
}

try {
    // failing case; array length less than 2
    const arr1 = [1]
    console.log(arrayShift(arr1, 4));
} catch (e) {
    console.error(e)
}
// try {
//     // failing case; incorrect data type for arr
//     const arr1 = {}
//     console.log(arrayShift(arr1, 4));
// } catch (e) {
//     console.error(e)
// }
// try {
//     // failing case; Value of n is decimal
//     const arr1 = [1, 4, "some", "dummy", "input"]
//     console.log(arrayShift(arr1, 4.5));
// } catch (e) {
//     console.error(e)
// }

// function calls for matrixOne
try {
    // passing case
    console.log(matrixOne([[2,2,2],[2,0,2],[2,2,2]]));
} catch (e) {
    console.error(e);
}
try {
    // failing case; inconsistent length of each subarray
    console.log(matrixOne([[2,2,2,4],[2,0,2],[2,2,2]]));
} catch (e) {
    console.error(e);
}
// try {
//     // failing case; inconsistent datatype of matrix array
//     console.log(matrixOne({}));
// } catch (e) {
//     console.error(e);
// }
// try {
//     // failing case; matrix subarray is empty
//     console.log(matrixOne([[],[4,5]]));
// } catch (e) {
//     console.error(e);
// }
// try {
//     // failing case; matrix subarray is contains string
//     console.log(matrixOne([["4",5,5],[4,5,6]]));
// } catch (e) {
//     console.error(e);
// }

// ================= stringUtils.js =========================

// function calls for swapChars
try {
    // passing case
    console.log(swapChars("Muhammad", "Owais"));
} catch (e) {
    console.error(e);
}
try {
    // failing case; string1 is less than 4 chars
    console.log(swapChars("Muh", "Owais"));
} catch (e) {
    console.error(e);
}

// try {
//     // failing case; incorrect data type
//     console.log(swapChars(4, 5));
// } catch (e) {
//     console.error(e);
// }

// function calls for longestCommonSubstring
try {
    // passing case
    console.log(longestCommonSubstring("programming", "progasdas"));
} catch (e) {
    console.error(e);
}
try {
    // failing case; string1 is less than 4 chars with trailing spaces
    console.log(longestCommonSubstring("prog    ", "p           "));
} catch (e) {
    console.error(e);
}

// try {
//     // failing case; string1 and string2 are empty with blank spaces only
//     console.log(longestCommonSubstring("            ", "             "));
// } catch (e) {
//     console.error(e);
// }
// try {
//     // failing case; inconsistent data type
//     console.log(longestCommonSubstring(4, 4));
// } catch (e) {
//     console.error(e);
// }

// function calls for palindromeOrIsogram
try {
    // passing case
    const arr = ["Madam", "Lumberjack", "He did, eh?", "Background", "Taco cat? Taco cat.", "Invalid String"]
    console.log(palindromeOrIsogram(arr))
} catch(e) {
    console.error(e);
}
try {
    // failing case; input parameter is not an array
    const arr = "testing"
    console.log(palindromeOrIsogram(arr))
} catch(e) {
    console.error(e);
}

// try {
//     // failing case; input parameter contains a number
//     const arr = ["Madam", "Lumberjack", 4, "Background", "Taco cat? Taco cat.", "Invalid String"]
//     console.log(palindromeOrIsogram(arr))
// } catch(e) {
//     console.error(e);
// }
// try {
//     // failing case; input parameter contains empty strings
//     const arr = ["     ", "     ", "string"]
//     console.log(palindromeOrIsogram(arr))
// } catch(e) {
//     console.error(e);
// }



// ================= objectUtils.js =========================

// function call for objectStats
try {
    // passing case
    const arrayOfObjects = [ { a: 12, b: 8, c: 15, d: 12, e: 10, f: 15 }, { x: 5, y: 10, z: 15 }, { p: -2, q: 0, r: 5, s: 3.5 }, ]; 
    console.log(objectStats(arrayOfObjects))
} catch(e) {
    console.error(e);
}

try {
    // failing case; contains a number with more than 3 decimal places
    const arrayOfObjects = [ { a: 12, b: 8, c: 15.5555, d: 12, e: 10, f: 15 }, { x: 5, y: 10, z: 15 }, { p: -2, q: 0, r: 5, s: 3.5 }, ]; 
    console.log(objectStats(arrayOfObjects))
} catch(e) {
    console.error(e);
}
// try {
//     // failing case; one element in an array is not an object
//     const arrayOfObjects = [ { a: 12, b: 8, c: 15, d: 12, e: 10, f: 15 }, "string", { x: 5, y: 10, z: 15 }, { p: -2, q: 0, r: 5, s: 3.5 }, ]; 
//     console.log(objectStats(arrayOfObjects))
// } catch(e) {
//     console.error(e);
// }
// try {
//     // failing case; one element does not have atleast 1key/value pair
//     const arrayOfObjects = [ { a: 12, b: 8, c: 15, d: 12, e: 10, f: 15 }, {}, { x: 5, y: 10, z: 15 }, { p: -2, q: 0, r: 5, s: 3.5 }, ]; 
//     console.log(objectStats(arrayOfObjects))
// } catch(e) {
//     console.error(e);
// }

// function call for nestedObjectDiff
try {
    // passing case
    const obj1 = { a: 1, b: { c: 2, d: [3, 4] }, e: "hello" }; 
    const obj2 = { a: 1, b: { c: 2, d: [3, 5] }, f: "world" }; 
    console.log(nestedObjectsDiff(obj1, obj2))
} catch (e) {
    console.error(e);
}

try {
    // failing case; input parameters are empty
    const obj1 = []; 
    const obj2 = { a: 1, b: { c: 2, d: [3, 5] }, f: "world" }; 
    console.log(nestedObjectsDiff(obj1, obj2))
} catch (e) {
    console.error(e);
}

// function calls for mergeAndSumValues
try {
    // passing case
    const object1 = { a: 3, b: 7, c: "5" };
    const object2 = { b: 2, c: "8", d: "4" };
    const object3 = { a: 5, c: 3, e: 6 };
    console.log(mergeAndSumValues(object1, object2, object3))
} catch(e) {
    console.error(e);
}

try {
    // failing case, object3 has a string which does not represent a number
    const object1 = { a: 1, b: "2", c: 3 }; 
    const object2 = { b: 3, c: 4, d: 5 }; 
    const object3 = { a: 2, c: "hello", e: 6 }; 
    console.log(mergeAndSumValues(object1, object2, object3))
} catch(e) {
    console.error(e);
}

