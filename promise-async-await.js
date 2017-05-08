// Promise, async and await - the solution for waiting asynchronous operations.
// Author : Robert Tang
// Date   : 5/6/2017

function httpGet(url){
    
    return new Promise((resolve, reject)=>{
      // Load XMLHttpRequest module
      // XMLHttpRequest provides an easy way to retrieve data from a URL without having to do a full page refresh.
      var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

      // instantiation
      var req = new XMLHttpRequest();

      // initializes a request.
      req.open('GET', url);

      // Assign funciton for HTTP request returns after successfully fetching content
      // and the load event is received by this object.
      req.onload = function() {
        // check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          resolve(req);
        }else {
          // Otherwise reject with the status text
          reject(Error(req.status));
        }
      };

      // Handle network errors
      req.onerror = function() {
        reject(req)
      };


      // make the request
      req.send();
    })

}// func

let url = "http://www.google.com";

async function asyncAjaxGet(){
  try {
    var ret = await httpGet(url) // Wait the GET request get done
    console.log(ret.status);

    if (ret.status==200) {
      console.log("done.");
    }else{
      console.log("fail.");
    }

  } catch (err) {
    console.log(err)
  }
};

asyncAjaxGet();

// Above same as:
httpGet(url).then((rep)=>{
  console.log(rep.status);
  console.log("done.");
}).catch((err)=>{
  console.log(err)
});
