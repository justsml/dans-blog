// ## Handling Errors
// ### 1 Multiple `.catch`'s
var promise = new Promise((resolve, reject) => Promise.reject(Error('The Fails!')))
promise.catch(error => console.log(error.message))
promise.catch(error => console.log(error.message))
/* 
#### Q: What will the output be?
- print message once
- print message twice
* UnhandledPromiseRejectionWarning
- process exits

#### Explain
The Promise constructor doesn't use your return value. You must invoke one of the provided `resolve` and `reject` arguments. In this example the `Promise.reject(Error('The Fails!'))` effectively creates a new Promise chain which never gets a `.catch` and therefore triggers an unhandled promise rejection.
*/

// ### 2 Multiple `.catch`'s
var promise = new Promise((resolve, reject) => reject(Error('The Fails!')))
promise.catch(error => console.log(error.message))
promise.catch(error => console.log(error.message))
/*
#### Q: What will the output be?
- print message once
* print message twice
- UnhandledPromiseRejectionWarning
- process exits

#### Explain
First, inside the Promise constructor we correctly trigger an error by invoking `reject`.

Then the `.catch` handler works like the DOM's `.addEventListener(event, callback)` or Event Emitter's `.on(event, callback)` where multiple handler callbacks can be added. Usually this is undesirable as it's hard to visualize any cleanup or overriding you might want to do.
*/

// ### 3 Multiple `.catch`'s
var promise = new Promise((resolve, reject) => reject(Error('The Fails!')))
  .catch(error => console.log(error.message))
  .catch(error => console.log(error.message))
/*
#### Q: What will the output be?
* print message once
- print message twice
- UnhandledPromiseRejectionWarning
- process exits

#### Explain
First, inside the Promise constructor we correctly trigger an error by invoking `reject`.

*/



////// Helpers //////
function rejectedPromise() { return Promise.reject(new Error('*Rejected!*')) }
function unpackPromise() {
  let resolve, reject;
  let promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
  return {promise, resolve, reject}
}

