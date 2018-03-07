export function hasClass (el, cls) {
  const reg = new RegExp(`(^|\\s)${cls}(\\s|$)`)
  return reg.test(el.className)
}
