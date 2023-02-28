import moment from 'moment'
export default {
  getDateByDay (n) {
    const date = new Date()
    date.setTime(date.getTime() + n * 3600 * 1000 * 24)
    var dayOfweek = date.getDay()
    if (dayOfweek === 6) {
      date.setTime(date.getTime() + 2 * 3600 * 1000 * 24)
    }
    if (dayOfweek === 0) {
      date.setTime(date.getTime() + 1 * 3600 * 1000 * 24)
    }
    return date
  },
  uuidv4 () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = Math.random() * 16 | 0
      var v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  },
  getRandomColor () {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  },
  makeid (len) {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  },
  removeAccents (str) {
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/ig, 'a')
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ë)/ig, 'e')
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/ig, 'i')
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/ig, 'o')
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/ig, 'u')
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/ig, 'y')
    str = str.replace(/(đ)/ig, 'd')
    return str
  },
  convertObjectToQueryString (params) {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&')
  },

  cleanSearchKey: function (searchQuery, k = '') {
    if (!searchQuery) return ''
    let newValue = searchQuery.toLowerCase().trim()
    newValue = newValue.replace(/ +/g, k).replace(/[\u{0080}-\u{FFFF}]/gu, '')
    newValue = this.removeAccents(newValue)
    return newValue
  },
  removeAccentsSimple (str) {
    if (!str) return ''
    return this.removeAccents(this.cleanSearchKeySimple(str))
  },
  cleanSearchKeySimple: function (searchQuery) {
    if (!searchQuery) return ''
    let newValue = searchQuery.toLowerCase().trim()
    return newValue
  },

  generateSearchableValue: function (customer) {
    let name = customer.customer_name || customer.customer_name_free || customer.customer || ''
    let pid = customer.customer_pid || customer.pid || ''
    customer['searchableValue'] = this.cleanSearchKey(name) + pid
  },

  cleanCustomersData: function (customers) {
    customers.forEach((customer) => {
      this.generateSearchableValue(customer)
    })
  },

  isPositiveInteger: function (str) {
    return /^\+?[0-9][\d]*$/.test(str)
  },

  getYearFromDate: function (date) {
    return new Date(date).getFullYear()
  },

  shortenName: function (name, maxLength = 30) {
    if (name.length <= maxLength) return name
    const arrs = name.split(' ').filter(Boolean)
    // If the name has only one word, then return the name
    if (arrs.length === 1) return name

    for (let i = 1; i < arrs.length - 1; i++) {
      arrs[i] = arrs[i].charAt(0).toUpperCase() + '.'
    }
    name = arrs.join(' ')
    // after shortening, the name is still long, need to shorten the first name too
    if (name.length > maxLength) {
      name = name.substring(0, 1) + '.' + name.substring(name.indexOf(' '), name.length)
    }
    return name
  },

  shortenLastAndMiddleName: function (name, maxLength = 1) {
    return this.shortenName(name, maxLength)
  },

  shortenNameDeeply: function (name) {
    return name.split(' ').map((str) => { return str[0].toUpperCase() }).join('.')
  },

  addPrefixZero (i) {
    return i < 10 ? '0' + i : i
  },

  formatTimer: function (deltaTime) {
    let hours = Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((deltaTime % (1000 * 60)) / 1000)
    // Set timer to the item and display on screen
    let minutesDisplay = this.addPrefixZero(minutes)
    let secondsDisplay = this.addPrefixZero(seconds)
    let formatCoundown = minutesDisplay + ':' + secondsDisplay
    if (hours) {
      let hoursDisplay = this.addPrefixZero(hours)
      formatCoundown = hoursDisplay + ':' + formatCoundown
    }
    return formatCoundown
  },

  capitalize: function (str) {
    let arr = str.split(' ')
    for (var i = 0, x = arr.length; i < x; i++) {
      if (arr[i] === '') {
        continue
      }
      arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1)
    }
    return arr.join(' ')
  },

  debounce: function (func, wait, immediate) {
    let timeout
    return function () {
      const context = this
      const args = arguments
      const later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      const callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  },

  changeAlias: function (alias) {
    var str = alias
    str = str.toLowerCase()
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|[|]|~|\$|_|`|-|{|}|\||\\/g, ' ')
    str = str.replace(/ + /g, ' ')
    str = str.trim()
    return str
  },
  toAlias: function (alias) {
    var str = alias
    str = str.toLowerCase()
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|[|]|~|\$|_|`|-|{|}|\||\\/g, ' ')
    str = str.replace(/ + /g, ' ')
    str = str.trim().replace(/ /g, '-')
    return str
  },
  reformatDate: function (dateString) {
    if (!dateString) return ''
    const temp = dateString.split('-')
    return `${temp[2]}/${temp[1]}/${temp[0]}`
  },

  shortenRole: function (role) {
    if (!role) {
      return ''
    }
    let arr = role.split(' ')
    let chars = arr.map(function (item, index) {
      if (index === 0) {
        return item.trim()[0].toUpperCase()
      }
      return item.trim()[0].toLowerCase()
    })
    chars.push('.')
    return chars.join('')
  },
  setCookie (cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  },
  getCookie (cname) {
    let name = cname + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  },
  checkCookie (cname) {
    return this.getCookie(cname)
  },
  checkAndSetCookie (cname, cvalue, exdays) {
    if (!this.checkCookie(cname)) {
      this.setCookie(cname, cvalue, exdays)
    }
  },
  getAge (sdob) {
    if (sdob) {
      return moment().diff(moment(sdob, 'DD/MM/YYYY'), 'years')
    }
    return 'N/A'
    // if (sdob) {
    //   // return moment().diff(moment(this.DataSubmit.Customer.DateOfBirth, this.vDateFormat), 'years')
    //   var now = new Date()
    //   var y = now.getFullYear()
    //   var dob = sdob.split('/')
    //   return y - parseInt(dob[2])
    // }
    // return 'N/A'
  }
}
