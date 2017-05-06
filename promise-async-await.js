// Promise, async and await - the solution to wait asynchronous operations as traditional functions.
// Author : Robert Tang
// Date   : 5/6/2017

function httpGet(url){
    // XMLHttpRequest is an API that provides client functionality for transferring data between a client and a server.
    // It provides an easy way to retrieve data from a URL without having to do a full page refresh.

    return new Promise((resolve, reject)=>{
      // Load XMLHttpRequest module
      var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

      // instantiation
      var req = new XMLHttpRequest();

      // Initializes a request.
      req.open('GET', url);

      // Assign funciton for HTTP request returns after successfully fetching content
      // and the load event is received by this object.
      req.onload = function() {
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          // console.log(req);
          resolve(req);
        }else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(req.status));
          // console.log(req.status)
        }
      };

      // req.onprogress = function(event){
      //   console.log(event)
      // };

      // Handle network errors
      req.onerror = function() {
        reject(req)
      };


      // Make the request
      req.send();
    })

}// func


async function asyncAjaxGet(){
  try {
    let url = "http://www.google.com1";
    var ret = await httpGet(url)
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