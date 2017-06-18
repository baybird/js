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
				resolve(req.responseText);
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

// Test
let url = "https://itunes.apple.com/search?term=jack+johnson&limit=50"

get(url).then(
	function(response) {
		let json  = JSON.parse(response)

		var i =0
		for(var item of json.results){
			i++;
			console.log(i + "\t" + item.kind + "\t"+ item.trackName )
		}
	}
).catch((error)=>{
	console.error(error)
})

// Race Promise
var p1 = new Promise(function(resolve, reject) {
		setTimeout(resolve, 200, 'p1');
});
var p2 = new Promise(function(resolve, reject) {
		setTimeout(resolve, 100, 'p2');
});

Promise.race([p1, p2]).then(function(value) {
	console.log(value + " is faster"); // Both are resolved, but p2 is faster
});

Promise.all([p1, p2]).then((arr)=>{
	console.log(arr) // Both are resolved
})



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
