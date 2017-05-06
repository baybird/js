// Promises
//     Promise is a JS object that provides a mechanism to handle the results and errors from asynchronous operations.
//     You can do the same thing with callbacks, but promise provides improved readability, via method chaining and
//     succinct error handling.
//
// Motivation
//     For large complicated projects, it is difficult to write an asynchronous code just using callback method.
//     And it's easy to forget to check for errors or allow unexpected exceptions to cut the program in a rough
//     way.


//     Consider the following synchronous JavaScript function to read a file and parse it as JSON. It is simple
//     and easy to read, but you wouldn't want to use it in most applications as it is blocking. This means that
//     while you are reading the file from disk (a slow operation) nothing else can happen.

//     function readJSONSync(filename) {
//       return JSON.parse(fs.readFileSync(filename, 'utf8'));
//     }

// A Promise is in one of these states:
//      * pending: initial state, not fulfilled or rejected.
//      * fulfilled: meaning that the operation completed successfully.
//      * rejected: meaning that the operation failed.

// Promise.then()
//     The then() method returns a Promise. It takes up to two arguments: callback functions for the success and
//     failure cases of the Promise.
//     <script>
//     var p1 = new Promise((resolve, reject) => setTimeout(resolve, 400, "one"));
//     var p2 = new Promise((resolve, reject) => setTimeout(resolve, 200, "two"));
//     Promise.race([p1, p2]).then(function(value) {
//         console.log(value); //two
//     });
//     </script>
//
// Promise.resolve(value)
//      returns a Promise object that is resolved with the given value.
//      If the value is a thenable (i.e. has a "then" method), the returned promise will "follow" that thenable,
//      adopting its eventual state; otherwise the returned promise will be fulfilled with the value.
//
// Promise.catch()
//     The catch() method returns a Promise and deals with rejected cases only. It behaves the same as calling
//     Promise.prototype.then(undefined, onRejected).

// Promise.cast(value)
//     This method is really useful if you are dealing with existing functions or services that don’t return a
//     promise.  If the value passed in is a promise, cast returns the value, otherwise the value is coerced to
//     a promise.  Either way, you can deal with the result as a promise.
//
// Promise.all(iterable)
//     The Promise.all method returns a promise when all promises in the iterable have completed.
//     <script>
//     var p1 = new Promise((resolve, reject) => setTimeout(resolve, 400, "one"));
//     var p2 = new Promise((resolve, reject) => setTimeout(resolve, 200, "two"));
//     Promise.all([p1, p2]).then(function(value) {
//         console.log(value); //one, two
//     });
//     </script>
//
// Author : Robert Tang
// Date   : 5/6/2017

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var req = new XMLHttpRequest();

    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        // console.log(req)
        resolve(req.responseText);
        // resolve(req.status);
      }else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };



    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

// Use it!
let url = "http://workorder.oppzo.com:3001/api/status/all/id/1"


get(url).then(
  function(response) {
    // console.log("Success!");
    // console.log(response);
    let json  = JSON.parse(response)
    console.log(json);

    var urlDetail = "http://workorder.oppzo.com:3001/api/get/%s"
    for(var item of json){
      // console.log(item)
      let u = urlDetail.replace('%s', item._id)
      // console.log(u)
      return get(u);
    }
  }
).then((json)=>{
  console.log(json)
}).catch((error)=>{
  console.error(error)
})

// get status

// do second thing
function secondThing(status){
  console.log("do second thing:" + status);
}

// ES7
// function resolveAfter2Seconds(x) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(x);
//     }, 2000);
//   });
// }

// var x = await resolveAfter2Seconds(10);
// console.log(x); // 10