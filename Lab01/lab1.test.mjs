import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input

// test calls questionOne
console.log(lab1.questionOne(3))    // expected 2
console.log(lab1.questionOne(7))    // expected 13
console.log(lab1.questionOne(10))   // expected 55
console.log(lab1.questionOne(4))    // expected 3
console.log(lab1.questionOne(0))    // expected 0
console.log(lab1.questionOne(-1))   // expected 0
console.log(lab1.questionOne(1))    // expected 1


// test calls for questionTwo
console.log(lab1.questionTwo())
console.log(lab1.questionTwo([]))
console.log(lab1.questionTwo([1, 5, 7, 11, 12]))
console.log(lab1.questionTwo([-1, 6, 7, 4, 8]))
console.log(lab1.questionTwo([-1, -6, 3, 9, 11]))
console.log(lab1.questionTwo([2]))
console.log(lab1.questionTwo([5, 10, 9]))
console.log(lab1.questionTwo([2, 7, 9, 1013]))
console.log(lab1.questionTwo([5, 3, 10]))


// test calls for questionThree
console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog.")); 
// returns and then outputs: {consonants: 24, vowels: 11, numbers: 0, spaces: 8, punctuation: 1, specialCharacters: 0}

console.log(lab1.questionThree("How now brown cow!!!"));
// returns and then outputs: {consonants: 10, vowels: 4, numbers: 0, spaces: 3, punctuation: 3, specialCharacters: 0}


console.log(lab1.questionThree("One day, the kids from the neighborhood carried my mother's groceries all the way home. You know why? It was out of respect."));
// returns and then outputs: {consonants: 61, vowels: 36, numbers: 0, spaces: 22, punctuation: 5, specialCharacters: 0}


console.log(lab1.questionThree("CS 546 is going to be fun & I'm looking forward to working with you all this semester!!" )); 
// returns and then outputs: {consonants: 40, vowels: 23, numbers: 3, spaces: 17, punctuation: 3, specialCharacters: 1}

console.log(lab1.questionThree("")); 
// returns and then outputs: {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}

console.log(lab1.questionThree("CS 546 is going... to be fun for him/her. I'm looking forward to working with you all this semester & have a great start of semester!!")); 
console.log(lab1.questionThree("Test--- em dash and-- --- - ...for test....")); 


console.log(lab1.questionFour([1, 1, 1, 1, 1, 1])); 
//returns and then outputs: [1]

console.log(lab1.questionFour([1, '1', 1, '1', 2])); 
// returns and then outputs: [1, '1', 2] 

console.log(lab1.questionFour([3, 'a', 'b', 3, '1'])); 
// returns and then outputs: [3, 'a', 'b', '1']

console.log(lab1.questionFour([])); 
//returns and then outputs: []

console.log(lab1.questionFour([4, 5, '5', '5', '5', 'a', 'av', '4', 4]));
//returns and then outputs: [4, 5, '5', 'a', 'av', '4']