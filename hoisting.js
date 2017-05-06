// Scope and hoisting
//
// Scope
//  Scope is the part of the program that has access to the variables, objects and functions.
//  Scope refers to the visibility of variables, objects and functions.
//  JavaScript has local and global scopes.
//
// Hoisting
//  The ability to use variables before they are declared. Local variables used without declaration
//  will hoist the variables to be global.
//
//  Hoisting may lead to misunderstanding. For example, hoisting teached variables and functions
//  declarations are physically moved to the top of the code, but that's not what happend at all.
//  What happens are that the variables and function declarations are placed in memory during the
//  compiling time, but still remain in the place where they are typed.
//
// Author : Robert Tang
// Date   : 5/6/2017


// "use strict"
// The directive "use strict" will enable strict mode which prohibits hoisting, delete variables, etc.

function foo(){
  function bar(){
    v = 9 // v used without declaration would hoist to be a global variable
  }

  bar()
}

foo();
console.log(v)

// delete v;
// console.log(v)

// Hoisting in class is not allowed.
//
// class test{
//   // foo = 5;

//   constructor(){
//     foo = 5;
//   }

// }
// obj = new test();
// console.log(obj)