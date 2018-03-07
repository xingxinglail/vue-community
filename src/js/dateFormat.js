const ONEDAYTIME = 24 * 60 * 60 * 1000
const ONEHOURSTIME = 60 * 60 * 1000
const ONEMINUTETIME = 60 * 1000
const ONESECONDTIME = 1000

export function dateFormat (date) {
  const nowDate = new Date().getTime()
  date = new Date(date).getTime()
  date = nowDate - date
  if (date >= ONEDAYTIME * 30) {
    return `${parseInt(date / (ONEDAYTIME * 30))}个月前`
  } else if (date >= ONEDAYTIME) {
    return `${parseInt(date / ONEDAYTIME)}天前`
  } else if (date >= ONEHOURSTIME) {
    return `${parseInt(date / ONEHOURSTIME)}小时前`
  } else if (date >= ONEMINUTETIME) {
    return `${parseInt(date / ONEMINUTETIME)}分钟前`
  } else if (date >= ONESECONDTIME) {
    return '几秒前'
  }
}
