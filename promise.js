// Promises
//     Promise is a JS object that provides a mechanism to handle the results and errors from asynchronous operations.
//     You can do the same thing with callbacks, but promise provides improved readability, via method chaining and
//     succinct error handling.
//
// Motivation
//     For large complicated projects, it is difficult to write an asynchronous code just using callback method.
//     And it's easy to forget to check for errors or allow unexpected exceptions to cut the program in a rough
//     way.
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
