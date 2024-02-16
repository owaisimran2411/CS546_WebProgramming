/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as authors from "./authors.js");

    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/

import * as authors from './authors.js'
import * as books from './books.js'



try {
    // test case expectation: pass
    const authorData = await authors.getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c")
    console.log(authorData);
} catch (e) {
    console.error(e);
}
try {
    // test case expectation: fail (id not present)
    const authorData = await authors.getAuthorById("some dummy id")
    console.log(authorData);
} catch (e) {
    console.error(e);
}
try {
    // test case expectation: fail (invalid argument type)
    const authorData = await authors.getAuthorById(-1)
    console.log(authorData);
} catch (e) {
    console.error(e);
}
try {
    // test case expectation: fail (empty spaces)
    const authorData = await authors.getAuthorById("    ")
    console.log(authorData);
} catch (e) {
    console.error(e);
}
try {
    // test case expectation: pass (same as case 1 but with leading and trailing spaces)
    const authorData = await authors.getAuthorById(" 1871e6d7-551f-41cb-9a07-08240b86c95c   ")
    console.log(authorData);
} catch (e) {
    console.error(e);
}


try {
    // test case expectation: pass
    const authorData = await authors.searchAuthorsByAge(40)
    console.log(authorData);
} catch (e) {
    console.error(e);
}
try {
    // test case expectation: fail (age not b/w 1-100)
    const authorData = await authors.searchAuthorsByAge(400)
    console.log(authorData);
} catch (e) {
    console.error(e);
}
try {
    // test case expectation: fail (incorrect data type)
    const authorData = await authors.searchAuthorsByAge("40")
    console.log(authorData);
} catch (e) {
    console.error(e);
}
try {
    // test case expectation: no argument provided
    const authorData = await authors.searchAuthorsByAge()
    console.log(authorData);
} catch (e) {
    console.error(e);
}
try {
    // test case expectation: argument provided but a NaN
    const authorData = await authors.searchAuthorsByAge(NaN)
    console.log(authorData);
} catch (e) {
    console.error(e);
}


try {     
    // test case expectation: pass 
    const authorData = await authors.getBooksByState("NJ");
    console.log(authorData);
} catch (e) {
    console.error(e);
}
try {     
    // test case expectation: fail (incorrect state abbreviation) 
    const authorData = await authors.getBooksByState("Muha");
    console.log(authorData);
} catch (e) {
    console.error(e);
}
try {     
    // test case expectation: fail (incorrect agrument type) 
    const authorData = await authors.getBooksByState(12);
    console.log(authorData);
} catch (e) {
    console.error(e);
}
try {     
    // test case expectation: pass (valid state with leading and trailing spaces) 
    const authorData = await authors.getBooksByState("  nY ");
    console.log(authorData);
} catch (e) {
    console.error(e);
}

try {
    const authorData = await authors.searchAuthorsByHometown("New yOrk City", "NY");
    console.log(authorData);
} catch (e) {
    console.error(e);
}

try {
    // Test case expectation: fail (author id is not available in the data)
    const authorData = await authors.getAuthorBooks("some dummy id")
    console.log(authorData);
} catch (e) {
    console.error(e);
}
try {
    // Test case expectation: pass
    const authorData = await authors.getAuthorBooks("69b3f32f-5690-49d1-b9a6-9d2dd7d6e6cd")
    console.log(authorData);
} catch (e) {
    console.error(e);
}

try {
    // test case expectation: pass
    const booksData = await books.getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e")
    console.log(booksData);
} catch (e) {
    console.error(e);
}
try {
    // test case expectation: pass (leading and trailing space added)
    const booksData = await books.getBookById(" 99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e     ")
    console.log(booksData);
} catch (e) {
    console.error(e);
}
try {
    // test case expectation: fail (book not found)
    const booksData = await books.getBookById("some dummy id")
    console.log(booksData);
} catch (e) {
    console.error(e);
}

try {
    // test case expectation: pass
    const booksData = await books.booksByPageCount(300, 500); 
    console.log(booksData);
} catch (e) {
    console.error(e);
}
try {
    // test case expectation: fail (NaN passed as argument)
    const booksData = await books.booksByPageCount(300, NaN); 
    console.log(booksData);
} catch (e) {
    console.error(e);
}
try {
    // test case expectation: fail (max smaller than min)
    const booksData = await books.booksByPageCount(300, 299); 
    console.log(booksData);
} catch (e) {
    console.error(e);
}

try {
    // test case expectation: pass
    const booksData = await books.sameYear(2000); 
    console.log(booksData);
} catch (e) {
    console.error(e);
}
try {
    // test case expectation: fail (invalid year)
    const booksData = await books.sameYear(2025); 
    console.log(booksData);
} catch (e) {
    console.error(e);
}
try {
    // test case expectation: pass
    const booksData = await books.sameYear(1900); 
    console.log(booksData);
} catch (e) {
    console.error(e);
}

try {
    const booksData = await books.minMaxPrice(); 
    console.log(booksData);
} catch (e) {
    console.error(e);
}

try {
    // test case expectation: pass
    const booksData = await books.searchBooksByPublisher('  SkIlIth   '); 
    console.log(booksData);
} catch (e) {
    console.error(e);
}

try {
    // test case expectation: fail
    const booksData = await books.searchBooksByPublisher('some publIsHer'); 
    console.log(booksData);
} catch (e) {
    console.error(e);
}

