/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */

import Vue from 'vue'
import Axios from 'axios'
// import store from '@/store'
import EventBus from '@/lib/eventBus'
import NProgress from 'nprogress'
Axios.defaults.baseURL = process.env.API_URL
Axios.defaults.headers.common.Accept = 'application/json'
// Axios.defaults.headers.common.Authorization = `Bearer 123`
if (document.getElementsByName('__RequestVerificationToken').length) {
  Axios.defaults.headers.common.RequestVerificationToken = document.getElementsByName('__RequestVerificationToken')[0].value
}
function getParameterByName (name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  var results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
function redirect2Url (url, notRedirect) {
  if (!notRedirect) {
    if (url === '/#/login/?plan=private&status=401') localStorage.clear()
    window.location.href = url
  }
}
Axios.interceptors.response.use(
  response => {
    localStorage.setItem('logined', 1)
    // if (process.env.MAINTENANCE_MODE) {
    //   window.location.href = '/maintenance.html'
    // }
    return response
  },
  (error) => {
    localStorage.setItem('logined', 0)
    var msg = ''
    var locale = localStorage.getItem('locale') || 'vi'
    try {
      msg = locale === 'vi' ? error.response.data.ViMessage : error.response.data.EnMessage
      if (error.response.data.ViMessage.includes('không tồn tại')) {
        msg = ''
      }
    } catch (error) {
    }
    NProgress.done()
    var url = error.response.config.url
    if (error.response.status === 403) {
      if (error.response.config.method === 'post' && !getParameterByName('hidemsg', url)) {
        EventBus.$emit('403Event', msg)
        return Promise.reject(error)
      } else {
        redirect2Url('/#/403/?plan=private&errmsg=' + msg, getParameterByName('notRedirect', url))
        return Promise.reject(error)
      }
    }
    if (error.response.status === 401) {
      if ((error.response.config.method === 'post' && !getParameterByName('hidemsg', url)) || getParameterByName('notRedirectAndLoginPopup', url)) {
        EventBus.$emit('401Event', 'thangdc in here')
        return Promise.reject(error)
      } else {
        redirect2Url('/#/login/?plan=private&status=401', getParameterByName('notRedirect', url))
        window.location.reload()
        return Promise.reject(error)
      }
    }
    if (msg && !getParameterByName('hidemsg', url)) {
      Vue.toasted.show(msg, {
        type: 'error',
        duration: 3000
      })
    }
    if (error.response.status === 500 && !getParameterByName('hidemsg', url)) {
      Vue.toasted.show(locale === 'vi' ? (msg || 'Có lỗi xảy ra! Vui lòng thử lại') : 'Something went wrong!', {
        type: 'error',
        duration: 3000
      })
    }
    return Promise.reject(error)
  }
)
Axios.interceptors.request.use(config => {
  var url = config.url
  if (!getParameterByName('noLoading', url)) NProgress.start()
  EventBus.$emit('AxiosRequest', true)
  return config
})

// before a response is returned stop nprogress
Axios.interceptors.response.use(response => {
  setTimeout(() => {
    var url = response.config.url
    if (!getParameterByName('noLoading', url)) NProgress.done()
  }, 200)
  return response
})
// Bind Axios to Vue.
Vue.$http = Axios
Object.defineProperty(Vue.prototype, '$http', {
  get () {
    return Axios
  }
})
