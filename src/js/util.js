const AUTHOR = 'xx'

export function setSession (key, obj) {
  window.sessionStorage.setItem(AUTHOR + key, JSON.stringify(obj))
}

export function getSession (key) {
  return JSON.parse(window.sessionStorage.getItem(AUTHOR + key))
}

export function delSession (key) {
  window.localStorage.removeItem(AUTHOR + key)
}

export function setLocal (key, obj) {
  window.localStorage.setItem(AUTHOR + key, JSON.stringify(obj))
}

export function getLocal (key) {
  return JSON.parse(window.localStorage.getItem(AUTHOR + key))
}

export function delLocal (key) {
  window.localStorage.removeItem(AUTHOR + key)
}
