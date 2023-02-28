import Vue from 'vue'
import Notifications from 'vue-notification'
import Paginate from 'vuejs-paginate'
import vSelect from 'vue-select'
import VueLodash from 'vue-lodash'
import Vuelidate from 'vuelidate'
import 'vue-instant/dist/vue-instant.css'
import VueInstant from 'vue-instant'
import moment from 'moment'
import vmodal from 'vue-js-modal'
import money from 'v-money'
import VueSelect from 'vue-cool-select'
import Toasted from 'vue-toasted'
import JQuery from 'jquery'
import baseMixin from '@/mixins/base'
import printMixin from '@/mixins/print'
import store from '@/store'
// import VueHtmlToPaper from '@/lib/html-to-paper'
import FixedDiv from '@/lib/vue-affix'
import commonComponents from '@/components/global'
import VueAutosuggest from 'vue-autosuggest'
// import vSuggest from './V-Suggest'
import vSuggest from './V-Suggest'
import 'vue2-datepicker/index.css'
import MaskedInput from 'vue-masked-input'
import VueCookies from 'vue-cookies'
import VueShortkey from './VueShortkey.js'
import VueNumberInput from '@/plugins/number-input/index.js'
import utils from '@/utils.js'
import VueDragscroll from 'vue-dragscroll'
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)
Vue.use(VueDragscroll)
Vue.use(VueNumberInput)
Vue.use(VueShortkey)
Vue.use(vSuggest)
Vue.use(VueCookies)

Vue.use(FixedDiv)
window.$ = JQuery

Vue.use(Toasted)
Vue.mixin(baseMixin)
Vue.mixin(printMixin)
Vue.use(VueSelect, {
  theme: 'bootstrap' // or 'material-design'
})
Vue.use(money, {
  precision: 4
})
Vue.directive('permissionsx', {
  bind: function (el, binding) {
    console.log(el, binding.value)
  }
})
Vue.component('v-masked-input', {
  extends: MaskedInput,
  methods: {
    keyDown (e) {
      this.$emit('change', e)
      if (this.maskCore === null) {
        e.preventDefault()
        return
      }
      if (e.ctrlKey && e.keyCode === 86) {
        e.preventDefault()
        return
      }
      this.setNativeSelection()
      switch (e.keyCode) {
        case 8:
          e.preventDefault()
          if (
            this.maskCore.selection.start > this.marginLeft ||
            this.maskCore.selection.start !== this.maskCore.selection.end
          ) {
            this.maskCore.backspace()
            this.updateToCoreState()
          }
          break
        case 37:
          e.preventDefault()
          if (this.$refs.input.selectionStart === this.$refs.input.selectionEnd) {
            this.$refs.input.selectionStart -= 1
          }
          this.maskCore.selection = {
            start: this.$refs.input.selectionStart,
            end: this.$refs.input.selectionStart
          }
          this.updateToCoreState()
          break

        // right arrow
        case 39:
          e.preventDefault()
          if (this.$refs.input.selectionStart === this.$refs.input.selectionEnd) {
            this.$refs.input.selectionEnd += 1
          }
          this.maskCore.selection = {
            start: this.$refs.input.selectionEnd,
            end: this.$refs.input.selectionEnd
          }
          this.updateToCoreState()
          break

        // end
        case 35:
          e.preventDefault()
          this.$refs.input.selectionStart = this.$refs.input.value.length
          this.$refs.input.selectionEnd = this.$refs.input.value.length
          this.maskCore.selection = {
            start: this.$refs.input.selectionEnd,
            end: this.$refs.input.selectionEnd
          }
          this.updateToCoreState()
          break

        // home
        case 36:
          e.preventDefault()
          this.$refs.input.selectionStart = 0
          this.$refs.input.selectionEnd = 0
          this.maskCore.selection = {
            start: this.$refs.input.selectionStart,
            end: this.$refs.input.selectionStart
          }
          this.updateToCoreState()
          break

        // delete
        case 46:
          e.preventDefault()
          if (this.$refs.input.selectionStart === this.$refs.input.selectionEnd) {
            this.maskCore.setValue('')
            this.maskCore.setSelection({
              start: 0,
              end: 0
            })
            this.$refs.input.selectionStart = this.maskCore.selection.start
            this.$refs.input.selectionEnd = this.maskCore.selection.start
          } else {
            this.maskCore.backspace()
          }
          this.updateToCoreState()
          break

        default:
          break
      }
    }
  }
})
Vue.directive('uppercase', {
  update: function (el) {
    el.value = el.value.toUpperCase()
  }
})
Vue.directive('permissions', {
  bind: function (el, binding, node) {
    try {
      let roleCodes = store.state.account.Role.Datas
      if (!roleCodes.includes(binding.value)) {
        setTimeout(() => {
          JQuery(el).remove()
        }, 100)
      }
    } catch (error) {
      return false
    }
  }
})
Vue.directive('location', {
  bind: function (el, binding, node) {
    try {
      let VisitTypeGroupCode = store.state.account.Specialty.VisitTypeGroupCode
      if (VisitTypeGroupCode === binding.value) {
        setTimeout(() => {
          JQuery(el).remove()
        }, 100)
      }
    } catch (error) {
      return false
    }
  }
})
Vue.component('v-select', {
  extends: vSelect,
  props: {
    filterBy: {
      type: Function,
      default (option, label, search) {
        return utils.cleanSearchKey(label).indexOf(utils.cleanSearchKey(search)) > -1
      }
    },
    getOptionLabel: {
      type: Function,
      default (option) {
        if (this.index) {
          option = this.findOptionByIndexValue(option)
        }
        var locale = this.$i18n.locale
        if (typeof option === 'object') {
          if (!option.hasOwnProperty(this.label)) {
            return console.warn(
              `[vue-select warn]: Label key "option.${this.label}" does not` +
              ` exist in options object ${JSON.stringify(option)}.\n` +
              'http://sagalbot.github.io/vue-select/#ex-labels'
            )
          }
          if (locale === 'en' && option['EnLabel']) {
            return option['EnLabel']
          }
          return option[this.label]
        }
        return option
      }
    }
  },
  methods: {
    clearSelection () {
      this.mutableValue = this.multiple ? [] : null
      this.onInput(this.mutableValue)
      this.$emit('search:clear')
    }
  },
  computed: {
    // dropdownOpen() {
    //   return true
    // }
  }
})

commonComponents.forEach(component => {
  Vue.component(component.name, component)
})

Vue.use(vmodal)
Vue.use(VueInstant)
Vue.use(Vuelidate)
// customize the way you want to call it
// Vue.use(VueLodash, options) // options is optional
Vue.prototype._ = VueLodash

Vue.use(VueAutosuggest)
Vue.prototype.onForm = null
Vue.component('paginate', Paginate)
// Vue.component('v-select', vSelect)
Vue.use(Notifications)
Vue.filter('formatDate', value => {
  if (value) {
    return moment(String(value)).format('HH:mm:ss DD/MM/YYYY')
  }
})
Vue.filter('formatDateWithoutSecon', value => {
  if (value) {
    var t = moment(String(value))
    return t.isValid() ? t.format('HH:mm DD/MM/YYYY') : value
  }
})
Vue.filter('formatDateWithoutSecon2', value => {
  if (value) {
    // console.log(new Date(value))
    var t = moment(value.replace('"', '').replace('"', ''))
    return t.isValid() ? t.format('HH:mm DD/MM/YYYY') : value
  }
})
Vue.filter('formatDate2', value => {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})
Vue.filter('touppercase', value => {
  if (value) {
    return value ? value.toUpperCase() : ''
  }
})
// Vue.filter('datetimenowx', moment().format('HH:mm DD/MM/YYYY'))

// window.onbeforeunload = function () {
//   return Vue.prototype.onForm
// }
Vue.filter('breakLine', (value, char) => {
  if (value) {
    return value.split(char || '')
  }
})
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.filter('formatAge', function (value) {
  if (!value) return ''
  var locale = localStorage.getItem('locale') || 'vi'
  if (locale === 'en') {
    return value.replace('-DD', ' days').replace('-MM', ' months').replace('-YYYY', '')
  }
  return value.replace('-DD', ' ngày').replace('-MM', ' tháng').replace('-YYYY', '')
})
Vue.filter('formatAgeWithMultiLang', function (value) {
  if (!value) return ''
  return value.replace('-DD', ' ngày/days').replace('-MM', ' tháng/months').replace('-YYYY', '')
})
Vue.filter('getOnlyTime', value => {
  if (value) {
    return moment(value, 'HH:mm:ss DD/MM/YYYY').format('HH:mm')
  }
})
Vue.filter('viDisplayformatDateTime', value => {
  if (value) {
    // let s = value.split(' ')
    // let time = s[0].split(':')
    // let date = s[1].split('/')
    // return `${time[0]} giờ `
    return value.replace(' ', ' phút, ngày ').replace(':', ' giờ ').replace('/', ' tháng ').replace('/', ' năm ')
  }
})
Vue.filter('viDisplayformatDateTime2', value => {
  if (value) {
    // let s = value.split(' ')
    // let time = s[0].split(':')
    // let date = s[1].split('/')
    // return `${time[0]} giờ `
    return value.replace(' ', ' phút/minute, ngày/date ').replace(':', ' giờ/hour ')
  } else {
    return ''
  }
})
Vue.filter('viDisplayformatDateTime3', value => {
  if (value) {
    return value.replace(' ', ' phút/minute, ngày/date ').replace(':', ' giờ/hour ')
  } else {
    return ''
  }
})
Vue.filter('viDisplayformatDateTime4', value => {
  if (value) {
    return value.replace(' ', ' phút/minute ').replace(':', ' Giờ/Hour ')
  } else {
    return ''
  }
})
Vue.filter('viDisplayformatDate', (value, format) => {
  if (value) {
    var d = moment(String(value), format || 'HH:mm DD/MM/YYYY').format('DD/MM/YYYY')
    return d.replace('/', ' tháng ').replace('/', ' năm ')
  }
})
Vue.filter('ICDVIEW', (value) => {
  if (value) {
    return value.map(e => {
      return e.label
    }).join()
  }
})
Vue.filter('viDisplayformatDateTimeWithMoment', (value, format) => {
  if (value) {
    value = moment(String(value)).format(format || 'HH:mm DD/MM/YYYY')
    return value.replace(' ', ' phút, ngày ').replace(':', ' giờ ').replace('/', ' tháng ').replace('/', ' năm ')
  }
})
Vue.filter('enDisplayformatDateTimeWithMoment', (value, format) => {
  if (value) {
    value = moment(String(value)).format(format || 'HH:mm DD/MM/YYYY')
    console.log(value)
    return value.replace(' ', ' date ').replace(':', ' hour ').replace('/', ' month ').replace('/', ' year ')
  }
})
Vue.filter('viDisplayformatDateTimeWithMoment2', (value, format) => {
  if (value && typeof value === 'object') {
    // let s = value.split(' ')
    // let time = s[0].split(':')
    // let date = s[1].split('/')
    // return `${time[0]} giờ `
    value = moment(String(value)).format(format || 'HH:mm DD/MM/YYYY')
    return value.replace(' ', ' phút, ngày ').replace(':', ' giờ ').replace('/', ' tháng ').replace('/', ' năm ')
  }
  return value
})
Vue.filter('viDisplayformatDateTimeWithMomentForDischarge', (value, format) => {
  if (value) {
    value = moment(String(value)).format(format || 'HH:mm DD/MM/YYYY')
    return value.replace(' ', ' ngày ').replace(':', ' giờ ').replace('/', ' tháng ').replace('/', ' năm ')
  }
})
Vue.filter('enDisplayformatDateTimeWithMomentForDischarge', (value, format) => {
  if (value) {
    value = moment(String(value)).format(format || 'HH:mm DD/MM/YYYY')
    console.log(value)
    return value.replace(' ', ' date ').replace(':', ' hour ').replace('/', ' month ').replace('/', ' year ')
  }
})
Vue.filter('bilingualFormatDateTime', (value, format) => {
  if (value) {
    let date = value.split(' ')
    let timeSplit = date[0].split(':')
    let dateSplit = date[1].split('/')
    return `${timeSplit[0]} giờ/ hour ${timeSplit[1]} phút/ minute, ngày/ date ${dateSplit[0]} tháng/ month ${dateSplit[1]} năm/ year ${dateSplit[2]}`
  }
})
Vue.filter('bilingualFormatDateTimeKLM', (value, format) => {
  if (value) {
    let date = value.split(' ')
    let timeSplit = date[0].split(':')
    let dateSplit = date[1].split('/')
    return `${timeSplit[0]} giờ/hour ${timeSplit[1]} ngày/date ${dateSplit[0]}/${dateSplit[1]}/${dateSplit[2]}`
  }
})
Vue.filter('bilingualFormatDateTimeTwo', (value, format) => {
  if (value) {
    if (value.includes(':')) {
      let date = value.split(' ')
      let dateSplit = date[1].split('/')
      return `${date[0] ? date[0] : ''} ngày/ date ${dateSplit[0]} tháng/ month ${dateSplit[1]} năm/ year ${dateSplit[2]}`
    } else {
      let date = value.split('/')
      return `Ngày/ date ${date[0]} tháng/ month ${date[1]} năm/ year ${date[2]}`
    }
  }
})
Vue.filter('bilingualFormatDateTimeNoEng', (value, format) => {
  if (value) {
    if (value.includes(':')) {
      let date = value.split(' ')
      let dateSplit = date[1].split('/')
      return `${date[0] ? date[0] : ''} ngày ${dateSplit[0]} tháng ${dateSplit[1]} năm ${dateSplit[2]}`
    } else {
      let date = value.split('/')
      return `Ngày ${date[0]} tháng ${date[1]} năm ${date[2]}`
    }
  }
})
Vue.filter('bilingualFormatDate', (value, format) => {
  if (value) {
    let dateSplit = value.split('/')
    return `Ngày/ date ${dateSplit[0]} tháng/ month ${dateSplit[1]} năm/ year ${dateSplit[2]}`
  }
})
Vue.filter('bilingualFormatDateViHC', (value, format) => {
  if (value) {
    let date = value.split(' ')
    let dateSplit = date[1].split('/')
    return `Ngày/ date ${dateSplit[0]} tháng/ month ${dateSplit[1]} năm/ year ${dateSplit[2]}`
  }
})
// window.onbeforeunload = function () {
//   return 'Do you really want to leave our brilliant application?'
// }
Vue.filter('formatDateTime', (value, format) => {
  if (value) {
    return moment(String(value)).format(format || 'HH:mm DD/MM/YYYY')
  }
  return value
})
Vue.filter('formatDateTimeObj', (value, format) => {
  if (value && typeof value === 'object') {
    return moment(String(value)).format(format || 'HH:mm DD/MM/YYYY')
  }
  return value
})
Vue.filter('highlight', (words, query) => {
  return words.replace(query, '<span class="highlight">' + query + '</span>')
})
Vue.component('input-number', {
  template: '<input type="string" v-model="model">',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    model: {
      get () {
        if (this.value) {
          let value = this.getNum(parseFloat(this.value)).toString().split('.')
          let decimal = typeof value[1] !== 'undefined' ? '.' + value[1] : ''
          return Number(value[0]).toLocaleString('en-GB') + decimal
        } else {
          return 0
        }
      },
      set (newValue) {
        this.$emit('input', newValue.replace(/,/g, ''))
      }
    }
  },
  methods: {
    getNum (val) {
      if (isNaN(val)) {
        return 0
      }
      return val
    }
  }
})

Vue.filter('currency', (val) => {
  if (val === 0) return 0
  return val ? Number(val.toFixed(0)).toLocaleString() : '-'
})
