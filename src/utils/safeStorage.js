const cache = {}


let polyfillStorage = {
  getItem(name) {
    return cache[name]
  },
  setItem(name, value) {
    cache[name] = value
  }
}

let storageApi = polyfillStorage

try {
  if (typeof localStorage !== "undefined" && localStorage.getItem('test')) {
    storageApi = localStorage
  }
} catch (error) {
  console.warn('localStorage disabled, results not cached', error)
}

export default storageApi
