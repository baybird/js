// Closure
// * "A closure is the combination of a function and the lexical environment within which that
//    function was declared." - MDN
// * The ability to reference an instance of local variables in an enclosing function.
// * Functions that "closes" local variables.
// * The ability to treat functions as values, combined with the fact that local variables are
//   "re-created" every time a function is called.
// * The ability to use function as class.
//
// Purpose
//    Closure can be used to access internal variables of a function that the variables re-created
// every time the function is called and to keep the value of those internal variables remain in memory.
//
// Note://
// 1) Because closure will keep the variables in memory, so do not use the closure unnecessarily,
//    otherwise it will negatively affect the performance both in processing speed and memory
//    consumption. The solution is to delete all local variables that are not used before exiting
//    the function. And when creating a new object/class, methods should normally be associated to the
//    object's prototype rather than defined into the object constructor. The reason is that whenever
//    the constructor is called, the methods would get reassigned (that is, for every object creation).

// 2) Closure can change the value of the parent function's internal variable outside the parent function.
//    If you using the parent function as an object, using the closure as its public method or treat the
//    internal variable as its private value. You should be very careful if you are going to change the
//    value of the internal variable of the parent function.
//
// Author         : Robert Tang
// Date           : 5/6/2017
// Last Modified  : 7/26/2017


function foo(){ // Lexical scoping
  var val = 0;

  this.increase = function(){
    val += 1
    return this
  }

  this.showVal = function(){
    console.log(val);
    return this
  }
}

var obj = new foo();
obj.showVal().increase().showVal()
