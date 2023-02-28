import Vue from 'vue'
import Rooms from '@/services/Rooms'
import Clinics from '@/services/Clinics'
import Specialities from '@/services/Specialities'
import storage from '@/lib/storage'
import moment from 'moment'
import $ from 'jquery'
import utils from '@/utils'
import MasterDatas from '@/services/MasterDatas'
import constants from '@/constants.js'
import EventBus from '@/lib/eventBus'
import MedicalRecord from '@/services/IPD/MedicalRecord'

let ALLERGY = constants.ALLERGY

export default {
  data () {
    return {
      vDateFormat: process.env.DATE_FORMAT,
      vDateTimeFormat: process.env.DATETIME_FORMAT,
      fromRoute: null,
      MedicalRecordType: constants.MEDICALRECORDTYPE,
      Rooms: [],
      Clinics: [],
      MDSPECIALITIES: [],
      DoctorRecommendations: {},
      NeedTranslate: [],
      CurrentLocale: 'vi',
      valueOfPatientIllnessAndAssessment: '',
      ALLERGY: ALLERGY
    }
  },
  computed: {
    MedicalRecordFormCode () {
      return this.MedicalRecordType[this.routeType || this.$route.meta.type] ? (this.MedicalRecordType[this.routeType || this.$route.meta.type].code || 'A01_034_050919_V') : 'A01_034_050919_V'
    },
    MedicalRecordFormName () {
      return this.MedicalRecordType[this.routeType || this.$route.meta.type] ? (this.MedicalRecordType[this.routeType || this.$route.meta.type].name || 'NỘI KHOA') : 'NỘI KHOA'
    },
    CurrentPatientObj () {
      return this.$store.state.account.CurrentPatientObj || {}
    },
    datetimenow () {
      return moment().format(this.vDateTimeFormat)
    },
    _VisitId () {
      return this.VisitIdDrop || this.VisitId || this.$route.params.Id
    },
    _VisitType () {
      return this.VisitType || this.getVisitGroupCode()
    },
    _currentUserName () {
      return this.$store.state.account.Username
    },
    _account () {
      return this.$store.state.account
    },
    _now () {
      return moment()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fromRoute = from
    })
  },
  created () {
    Vue.prototype.onForm = 'acc'
  },
  mounted () {
    // this.getMasterDatas({Form: 'IPDMRPT'}, () => {
    //   console.log('MASTERDATA: ', this.MASTERDATA)
    // })
  },
  methods: {
    isNaNValue (val) {
      return val && ['na', 'n/a'].includes(String(val).toLowerCase())
    },
    getSpecialtyName () {
      return this.$store.state.account.Specialty.ViName
    },
    getVisitGroupCode () {
      var VisitTypeGroupCode = this.$router.currentRoute.matched.find(m => m.meta.VisitTypeGroupCode)
      return VisitTypeGroupCode.meta.VisitTypeGroupCode
    },
    parseInt (str, NaNVal) {
      const parsed = Number.parseFloat(str)
      if (Number.isNaN(parsed)) {
        return NaNVal
      }
      return parsed
    },
    select2Suggest (data) {
      var list = this.JSONParse(data)
      if (list) {
        return list.map(e => {
          e.id = e.value
          e.name = e.vilabel
          e.label = e.vilabel
          return e
        })
      } else {
        return []
      }
    },
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
    getMDRadioValue (items) {
      var checked = items.find(item => {
        return item.Value && item.DataType === 'Radio'
      })
      return checked || {
        ViName: '',
        EnName: ''
      }
    },
    getMDCheckBoxsValue (items) {
      var checked = items.filter(item => {
        return item.Value && item.DataType === 'CheckBox'
      }).map(e => this.trim_(e.ViName, ' '))
      return checked ? checked.join(', ') : ''
    },
    inputKeyPressNumber (t, $evt) {
      var value = t
      var evt = $evt || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if (!value && charCode === 46) {
        evt.preventDefault()
      }
      if (value && charCode === 46 && value.includes('.')) {
        evt.preventDefault()
      }
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    getMDSPECIALITIES (value) {
      var selected = this.MDSPECIALITIES.find(item => {
        return item.Id === value
      })
      return selected ? selected.ViName : 'N/A'
    },
    getMDSelectsValue (items, value) {
      if (value) {
        value = value.split(',')
      } else {
        return 'N/A'
      }
      var selected = items.filter(item => {
        return value.includes(item.value)
      })
      return selected.map(e => {
        return e.label
      }).join(',')
    },
    getMDSelectValue (items, value) {
      var selected = items.find(item => {
        return item.value === value
      })
      return selected ? selected.label : 'N/A'
    },
    getMDSelectedValue (selecteds) {
      if (selecteds) {
        return selecteds.map(e => {
          return e.label
        }).join(' & ')
      }
      return 'N/A'
    },
    addBreakPage ($event) {
      $event.target.classList.toggle('BreakPage')
    },
    getMasterDataForStogate () {
      storage.removeItem('ROOMS')
      this.getRooms()
      storage.removeItem('MDSPECIALITIES')
      this.getSpecialities()
      storage.removeItem('CLINICS')
      this.getClinics()
      storage.removeItem('DoctorRecommendations')
      this.loadDoctorRecommenWithIcd10()
    },
    copyToClipboard (text) {
      // window.prompt("Copy to clipboard: Ctrl+C, Enter", text)
    },
    getSpecialitiesInCurrentSite (str) {
      var siteCode = this.$store.state.account.Site.Code
      if (str) {
        return this.MDSPECIALITIES.filter(e => e.SiteCode === siteCode)
      } else {
        return this.MDSPECIALITIES.filter(e => e.SiteCode === siteCode && e.Id !== this.$store.state.account.SpecialtyId)
      }
    },
    getSpecialities () {
      var fromStorage = storage.get('MDSPECIALITIES')
      if (!fromStorage) {
        new Specialities({noLoading: true})
          .all()
          .then(response => {
            response.forEach(element => {
              element.value = element.Id
              element.label = element.ViName
              element.code = element.Id
            })
            this.MDSPECIALITIES = response
            storage.set('MDSPECIALITIES', JSON.stringify(response))
          })
      } else {
        this.MDSPECIALITIES = fromStorage
      }
    },
    noDataMsg () {
      return this.isEHOS() ? 'Chưa có dữ liệu trên EHOS' : 'N/A'
    },
    isEHOS () {
      return this.getSiteCode() === 'times_city'
    },
    getHotlineEd () {
      return constants.EDHOTLINE[this.getSiteCode()] || constants.EDHOTLINE['times_city']
    },
    getSiteCode () {
      return this.$store.state.account.Site.Code
    },
    getSiteApiCode () {
      return this.$store.state.account.Site.ApiCode
    },
    ImSuperAdmin () {
      return process.env.SUPERMAN.includes(this.$store.state.account.Username)
    },
    getRooms () {
      var fromStorage = storage.get('ROOMS')
      if (!fromStorage) {
        new Rooms({noLoading: true})
          .all()
          .then(response => {
            response.forEach(element => {
              element.value = element.Floor
              element.label = element.ViName
              element.EnLabel = element.EnName || (element.ViName + '.')
              element.code = element.Id
            })
            this.Rooms = response
            storage.set('ROOMS', JSON.stringify(this.Rooms))
          })
      } else {
        this.Rooms = fromStorage
      }
    },
    getClinics () {
      var fromStorage = storage.get('CLINICS')
      if (!fromStorage) {
        new Clinics({noLoading: true, specicaltyId: this.$store.state.account.SpecialtyId})
          .all()
          .then(response => {
            response.forEach(element => {
              element.value = element.Id
              element.label = element.ViName
              element.EnLabel = element.EnName || (element.ViName + '.')
              element.code = element.Code
            })
            this.Clinics = response
            storage.set('CLINICS', JSON.stringify(this.Clinics))
          })
      } else {
        this.Clinics = fromStorage
      }
    },
    loadDoctorRecommenWithIcd10 () {
      var fromStorage = storage.get('DoctorRecommendations')
      if (!fromStorage) {
        new MasterDatas({Form: 'GENRELI'})
          .all()
          .then(response => {
            // this.$set(this.DoctorRecommendations, item.Code, item)
            response.forEach(item => {
              item.Items.forEach(e => {
                if (e.Note) {
                  var code = this.trim_(e.Note, ' ')
                  if (this.DoctorRecommendations[code]) {
                    this.$set(this.DoctorRecommendations, code, this.DoctorRecommendations[code] + '\n' + this.trim_(e.ViName, ' '))
                  } else {
                    this.$set(this.DoctorRecommendations, code, this.trim_(e.ViName, ' '))
                  }
                }
              })
            })
            storage.set('DoctorRecommendations', JSON.stringify(this.DoctorRecommendations))
          })
      } else {
        this.DoctorRecommendations = fromStorage
      }
    },
    getDaysBetweenDate (start, end) {
      if (start && end) {
        var ndays
        var d1 = new Date(start)
        var d2 = new Date(end)
        var tv1 = d1.valueOf() // msec since 1970
        var tv2 = d2.valueOf()
        ndays = (tv2 - tv1) / 1000 / 86400
        ndays = Math.round(ndays - 0.5)
        return ndays > 0 ? ndays : ''
      }
      return ''
    },
    getValueOfMASTERDATA (group, code) {
      if (!this.MASTERDATA[group]) return null
      var item = this.MASTERDATA[group].Items.find(e => e.Code === code) || {}
      return item.Value
    },
    getValueOfMASTERDATA2 (group, code) {
      if (!this.MASTERDATA[group]) return null
      var item = this.MASTERDATA[group].Items.find(e => e.Code === code) || {}
      if (item.Value !== null && item.Value !== '' && item.Value !== false) {
        return true
      }
      return false
    },
    trim_ (string, char) {
      if (!char) char = ' '
      if (string) {
        char = char.replace(/([()[{*+.$^\\|?])/g, '\\$1')
        var regex1 = new RegExp('^' + char + '+', 'g')
        var regex2 = new RegExp(char + '+$', 'g')
        return string.replace(regex1, '').replace(regex2, '')
      }
      return string
    },
    trim (str, chars) {
      return str.split(chars).filter(Boolean).join(chars).replace(/(\r\n|\n|\r)/gm, '')
    },
    mapingStr (query, str) {
      query = utils.cleanSearchKey(query)
      str = utils.cleanSearchKey(str)
      return str.indexOf(query) > -1
    },
    checkString (str1, str2) {
      if (str1 === str2 && (str1 === null || str2 === null)) {
        return true
      }
      if (str1 !== str2 && (str1 === null || str2 === null)) {
        return false
      }
      return str1.toLowerCase() === str2.toLowerCase()
    },
    getICD10 (str) {
      if (!str) return ''
      var data = this.JSONParse(str)
      if (data) {
        return data.map(e => e.code).join(', ')
      }
      return ''
    },
    alert (title, msg) {
      this.$modal.show('dialog', {
        title: title,
        text: this.__t(msg),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'OK',
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    go2Ed (ed) {
      this.$router.push({name: 'ed', params: {Id: ed}})
    },
    _404 () {
      this.$router.push({name: '404', query: { plan: 'private' }})
    },
    JSONParse (str, returnArr) {
      try {
        return (JSON.parse(str))
      } catch (error) {
        return returnArr ? [] : null
      }
    },
    // __t (str) {
    //   return str
    // },
    string2Moment (str, format) {
      if (!str) {
        return null
      }
      var newdt = moment(str, format || this.vDateTimeFormat)
      if (!newdt.isValid()) {
        return null
      }
      return newdt
    },
    moment2String (dt, format) {
      if (!dt) {
        return null
      }
      if (moment.isMoment(dt) && dt.isValid()) {
        return moment(dt).format(format || this.vDateTimeFormat)
      }
      if (typeof dt === 'object') {
        return moment(String(dt)).format(format || this.vDateTimeFormat)
      }
      return dt
    },
    cloneObj (item) {
      return this.JSONParse(JSON.stringify(item))
    },
    isLocahost () {
      return window.location.hostname === 'localhost'
    },
    isJson (str) {
      try {
        JSON.parse(str)
      } catch (e) {
        return false
      }
      return true
    },
    checkbox2RadioNotAllowNull (items, item) {
      if (item.Value) {
        setTimeout(() => {
          item.Value = true
        }, 1)
        return
      }
      items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          if (this.checkString(element.DataType, 'Text')) {
            element.Value = ''
          }
          if (this.checkString(element.DataType, 'Select')) {
            element.Value = ''
          }
        }
      })
    },
    checkbox2Radio (items, item) {
      items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          if (this.checkString(element.DataType, 'Text')) {
            element.Value = ''
          }
          if (this.checkString(element.DataType, 'Select')) {
            element.Value = ''
          }
        }
      })
    },
    checkbox2Radio2 (items, item) {
      items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          if (this.checkString(element.DataType, 'Text')) {
            element.Value = ''
          }
          if (this.checkString(element.DataType, 'Select')) {
            element.Value = ''
          }
          if (this.checkString(element.DataType, 'Checkbox')) {
            element.Value = ''
          }
        }
      })
    },
    checkbox2Radio3 (items, item) {
      item.Value = true
      items.forEach(element => {
        if (element.Label !== item.Label) {
          element.Value = false
        }
      })
    },
    checkbox2Radio4 (items, item) {
      items.forEach(element => {
        if (element.Code !== item.Code && element.Clinic === item.Clinic) {
          element.Value = false
        }
      })
    },
    checkbox2Radio5 (items, item, miniRadio) {
      items.forEach(element => {
        if (element.Code !== item.Code && item.DataType === 'Radio') {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
        }
        if (miniRadio) {
          if (miniRadio.length === 1) {
            if (miniRadio.includes(item.Code) && element.Code !== item.Code) {
              if (this.checkString(element.DataType, 'Checkbox')) {
                element.Value = false
              }
              if (this.checkString(element.DataType, 'Radio')) {
                element.Value = false
              }
            }
            if (miniRadio.includes(element.Code) && element.Code !== item.Code) {
              if (this.checkString(element.DataType, 'Checkbox')) {
                element.Value = false
              }
              if (this.checkString(element.DataType, 'Radio')) {
                element.Value = false
              }
            }
          } else {
            if (miniRadio.includes(element.Code) && miniRadio.includes(item.Code)) {
              if (element.Code !== item.Code) {
                if (this.checkString(element.DataType, 'Checkbox')) {
                  element.Value = false
                }
              }
            }
          }
        }
      })
    },
    checkbox2RadioText (items, item) {
      items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
        }
      })
    },
    reload () {
      // location.reload()
      EventBus.$emit('updatepage')
    },
    hasRole (code) {
      try {
        let roleCodes = this.$store.state.account.Role.Datas
        return roleCodes.includes(code)
      } catch (error) {
        return false
      }
    },
    hasRoles (codes) {
      try {
        let roleCodes = this.$store.state.account.Role.Datas
        return roleCodes.some(r => codes.includes(r))
      } catch (error) {
        return false
      }
    },
    getLastHistory () {
      var fromStorage = storage.get('back_url')
      var history = fromStorage && typeof fromStorage === 'object' ? fromStorage : []
      if (!history.length) {
        this.go2Home()
        return false
      }
      var tmp = this.cloneObj(history)
      var historyUrl = tmp.reverse().find(e => e !== this.$route.fullPath)
      var t = history.splice(0, history.length - 1)
      storage.set('back_url', JSON.stringify(t))
      setTimeout(() => {
        this.$router.push({path: historyUrl})
      }, 100)
    },
    getLastHistory2 (nameRow) {
      var fromStorage = storage.get('back_url')
      var history = fromStorage && typeof fromStorage === 'object' ? fromStorage : []
      if (!history.length) {
        this.go2Home()
        return false
      }
      var tmp = this.cloneObj(history)
      var historyUrl = ''
      if (nameRow) {
        historyUrl = tmp.reverse().find(e => {
          if (e !== this.$route.fullPath && e !== nameRow) {
            return e
          }
        })
      }
      var t = history.splice(0, history.length - 1)
      storage.set('back_url', JSON.stringify(t))
      setTimeout(() => {
        this.$router.push({path: historyUrl})
      }, 100)
    },
    back () {
      this.getLastHistory()
    },
    back2 (nameRow) {
      this.getLastHistory2(nameRow)
    },
    go2Home () {
      this.$router.push({path: '/' + this.getVisitTypeGroupCode() || 'dashboard', query: { plan: 'private' }})
    },
    getVisitTypeGroupCode () {
      if (this.$store.state.account.Specialty) {
        return (this.$store.state.account.Specialty.VisitTypeGroupCode)
      }
      return null
    },
    getUser () {
      return this.$store.state.account.Username
    },
    getCurrentUsername () {
      return this.$store.state.account.Username
    },
    ___t (key) {
      if (!this.NeedTranslate.includes(key)) this.NeedTranslate.push(key)
      localStorage.setItem('NeedTranslate', this.NeedTranslate.join('####'))
      return (key)
    },
    __t (key) {
      return this.$t(key)
    },
    __t5 (key) {
      if (this.$t(key, 'en')) {
        return this.$t(key, 'en')
      }
      return this.$t(key)
    },
    __t2 (key) {
      if (
        this.routeType === 'Gynecological' ||
        this.routeType === 'Obstetrics' ||
        this.routeType === 'A01_195_050919_V' ||
        this.routeType === 'A01_040_050919_V' ||
        this.routeType === 'A01_039_050919_V' ||
        this.routeType === 'Pediatric' ||
        this.routeType === 'Neonatal' ||
        this.routeType === 'Eye' ||
        this.routeType === 'Oncology' ||
        this.routeType === 'CardiovascularForm' ||
        !this.routeType
      ) {
        return this.$t(key)
      } else {
        if (key.includes('Gy')) {
          key.replace('Gy', '')
        }
        return (key.replace('-mdc', ''))
      }
    },
    __t3 (key, str) {
      if (
        !this.routeType ||
        this.routeType === 'Gynecological' ||
        this.routeType === 'Obstetrics' ||
        this.routeType === 'A01_195_050919_V' ||
        this.routeType === 'A01_040_050919_V' ||
        this.routeType === 'A01_039_050919_V' ||
        this.routeType === 'Pediatric' ||
        this.routeType === 'Neonatal' ||
        this.routeType === 'Eye' ||
        this.routeType === 'CardiovascularForm'
      ) {
        if (!str) {
          if (this.$t(key, 'en').includes('. ')) {
            return '/ ' + this.$t(key, 'en').split('. ')[1]
          }
          if (this.$t(key, 'en').includes('+ ')) {
            return '/ ' + this.$t(key, 'en').split('+ ')[1]
          }
          if (this.$t(key, 'en')) {
            return '/ ' + this.$t(key, 'en')
          }
        } else {
          if (str === 'daucach') {
            return '/ ' + this.$t(key, 'en')
          }
          if (str === 'andau') {
            return '\n' + this.$t(key, 'en')
          }
        }
      } else {
        return ''
      }
    },
    __t4 (key, str) {
      if (!this.routeType || (this.routeType && this.routeType === 'Gynecological')) {
        if (!str) {
          if (key.includes('. ')) {
            return '/ ' + key.split('. ')[1]
          }
          if (key.includes('+ ')) {
            return '/ ' + key.split('. ')[1]
          }
          return '/ ' + key
        }
      } else {
        return ''
      }
    },
    getFTime (time) {
      if (time) {
        if (time.includes('T')) {
          return this.$options.filters.formatDateWithoutSecon(time)
        }
        return time
      }
      return ''
    },
    getFTime2 (time) {
      if (time) {
        if (time.includes('T')) {
          return this.$options.filters.formatDate2(time)
        }
        return time
      }
      return ''
    },
    __label (masterData) {
      // console.log(storage.get('fordev2'))
      if (!masterData) {
        return 'N/A'
      }
      let locale = this.$i18n.locale
      if (locale === 'en') {
        return (masterData['EnName'] || 'N/A') + (storage.get('showmasterdatacode') ? ' ' + masterData['Code'] : '')
      }
      return (masterData['ViName'] || 'N/A') + (storage.get('showmasterdatacode') ? ' ' + masterData['Code'] : '')
    },
    __labelViEN (label) {
      // console.log(storage.get('fordev2'))
      if (!label) {
        return 'N/A'
      }
      let locale = this.$i18n.locale
      if (locale === 'en') {
        return (label.EnName || label.ViName || 'N/A')
      } else if (locale === 'vi') {
        return label.ViName || label.EnName || 'N/A'
      }
    },
    __labelMsg (masterData) {
      // console.log(storage.get('fordev2'))
      let locale = this.$i18n.locale
      if (locale === 'en') {
        return (masterData['EnMessage'] || 'N/A') + (storage.get('showmasterdatacode') ? ' ' + masterData['Code'] : '')
      }
      return (masterData['ViMessage'] || 'N/A') + (storage.get('showmasterdatacode') ? ' ' + masterData['Code'] : '')
    },
    __labelEnAndVi (masterData) {
      // console.log(storage.get('fordev2'))
      if (!masterData) {
        return 'N/A'
      }
      let locale = this.$i18n.locale
      if (locale === 'en') {
        return (`\t${masterData['EnName']}` || 'N/A') + (storage.get('showmasterdatacode') ? ' ' + masterData['Code'] : '')
      }
      return (`\t${masterData['ViName']}` || 'N/A') + (storage.get('showmasterdatacode') ? ' ' + masterData['Code'] : '')
    },
    getRandomColor () {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    fomartIcd (diagnosis, ICDDiagnosis, coMorbidities, ICDCoMorbidities) {
      var arrDiagnosis = []
      if (diagnosis) arrDiagnosis.push(diagnosis)
      if (coMorbidities) arrDiagnosis.push(coMorbidities)
      var icd = this.getICD10s(ICDDiagnosis, ICDCoMorbidities, true)
      return [...new Set(arrDiagnosis)].join(', ') + '' + icd
    },
    getICD10s (str, strICDOption, withDiagnosis) {
      var op = ''
      var data = this.JSONParse(str) || []
      var ICDOption = this.JSONParse(strICDOption) || []
      if (ICDOption) {
        data = [...data, ...ICDOption]
      }
      if (data) {
        op = [...new Set(data.map(e => e.code))].join(', ')
      }
      if (withDiagnosis) return op ? ` (${op})` : ''
      return op
    },
    getICD10s2 (str, strICDOption, withDiagnosis) {
      var op = ''
      var data = this.JSONParse(str) || []
      var ICDOption = this.JSONParse(strICDOption) || []
      if (ICDOption) {
        data = [...data, ...ICDOption]
      }
      if (data) {
        op = [...new Set(data.map(e => e.code))].join(', ')
      }
      if (withDiagnosis) return op ? ` ${op}` : ''
      return op
    },
    vcollapseHasData () {
      this.hasData = true
      if (this.$refs.Vcollapse) {
        this.$refs.Vcollapse.setHasData()
      }
    },
    makeid (length = 10) {
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    getAge (dob) {
      if (dob) {
        var now = (new Date()).getFullYear()
        var dataDob = dob.split('/')
        return now - this.parseInt(dataDob[2])
      }
      return null
    },
    getPosition () {
      return this.$store.state.account.Position
    },
    isDoctor () {
      return this.$store.state.account.Position.includes('Doctor')
    },
    isNurse () {
      return this.$store.state.account.Position.includes('Nurse') || this.$store.state.account.Position.includes('Administrator')
    },
    // change name vilidate
    handlerResponse (response) {
      var hasErr = response.ViMessage
      if (hasErr) {
        this.toastedError(response.ViMessage)
        throw hasErr
      }
      if (response.Error) {
        if (this.$route.meta.type === 'Pediatric') {
          response.Error.map(e => {
            if (e.Code === 'IPDMRPTNTDDANS') {
              e.ViName = '+ Dinh dưỡng và các bệnh lý khác'
              e.EnName = '+ Nutrition and other diseases'
            }
          })
        }
        $('.error').removeClass('error')
        if (this.$route.meta.type === 'Pediatric') {
          response.Error.map(e => {
            if (e.Code === 'IPDMRPTNTDDANS') {
              e.ViName = '+ Dinh dưỡng và các bệnh lý khác'
              e.EnName = '+ Nutrition and other diseases'
            }
          })
        }
        if (this.$route.meta.type === 'Obstetrics') {
          response.Error.map(e => {
            if (e.Code === 'IPDMRPTTTYTANS') {
              e.ViName = '+ Toàn trạng'
              e.EnName = '+ Overall condition'
            }
            if (e.Code === 'IPDMRPTTTNSANS') {
              e.ViName = '+ Tiết niệu'
              e.EnName = '+ Urinary system'
            }
            if (e.Code === 'IPDMRPTCXNCANS') {
              e.ViName = '4. Các xét nghiệm cận lâm sàng cần làm'
              e.EnName = '4. Para-clinical laboratory tests to do'
            }
            if (e.Code === 'IPDMRPEQTBLANS') {
              e.ViName = '4. Quá trình bệnh lý và diễn biến lâm sàng'
              e.EnName = '4. Disease progression and clinical evolution'
            }
            if (e.Code === 'IPDMRPETTKQANS') {
              e.ViName = '6. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán'
              e.EnName = '6. Summary of valuable'
            }
            if (e.Code === 'IPDMRPEPPDTANS') {
              e.ViName = '7. Phương pháp điều trị'
              e.EnName = '7. Treatment methods'
            }
            if (e.Code === 'IPDMRPETCDDANS') {
              e.ViName = '8. Các thuốc chính đã dùng'
              e.EnName = '8. Used Medication List'
            }
            if (e.Code === 'IPDMRPETTNBANS') {
              e.ViName = '9. Tình trạng người bệnh ra viện'
              e.EnName = '9. Patient status at discharge'
            }
            if (e.Code === 'IPDMRPEHDTVANS') {
              e.ViName = '10. Hướng điều trị và các chế độ tiếp theo'
              e.EnName = '10. Treatment plan and further recommendations'
            }
          })
        }
        if (this.$route.meta.type === 'Gynecological' || this.$route.meta.type === 'A01_195_050919_V') {
          response.Error.map(e => {
            if (e.Code === 'IPDMRPTCXNCANS') {
              e.ViName = '4. Các xét nghiệm cận lâm sàng cần làm'
              e.EnName = '4. Para-clinical laboratory tests to do'
            }
            if (e.Code === 'IPDMRPTTTBAANS') {
              e.ViName = '5. Tóm tắt bệnh án'
              e.EnName = '5. Summary'
            }
            if (this.$route.meta.type === 'Gynecological' && e.Code === 'IPDMRPTTTNSANS') {
              e.ViName = '+ Tiết niệu:'
              e.EnName = '+ Urinary system:'
            }
          })
        }
        if (this.$route.meta.type === 'Eye') {
          response.Error.map(e => {
            if (e.Code === 'IPDMRPTTTBAANS') {
              e.ViName = '9. Tóm tắt bệnh án'
              e.EnName = '9. Summary'
            }
            if (e.Code === 'IPDMRPEPPDTANS') {
              e.ViName = '5. Phương pháp điều trị'
              e.EnName = '5. Treatment methods'
            }
            if (e.Code === 'IPDMRPETCDDANS') {
              e.ViName = '6. Các thuốc chính đã dùng'
              e.EnName = '6. CUsed Medication List'
            }
            if (e.Code === 'IPDMRPETTNBANS') {
              e.ViName = '7. Tình trạng người bệnh ra viện'
              e.EnName = '7. Patient status at discharge'
            }
            if (e.Code === 'IPDMRPEHDTVANS') {
              e.ViName = 'Hướng điều trị tiếp theo'
              e.EnName = 'Next treatment plan'
            }
            if (e.Code === 'IPDMRPTCXNCANS') {
              e.ViName = '5. Xét nghiệm'
              e.EnName = '5. Lab tests'
            }
          })
        }
        if (['A01_039_050919_V', 'A01_040_050919_V'].includes(this.$route.meta.type)) {
          response.Error.map(e => {
            if (e.Code === 'IPDMRPTQTBLANS') {
              e.ViName = 'Quá trình bệnh lý'
            }
            if (e.Code === 'IPDMRPTTHKIANS') {
              e.ViName = '+ Tâm thần, Thần kinh'
            }
            if (e.Code === 'IPDMRPTTTYTANS') {
              e.ViName = 'Toàn thân'
            }
            if (e.Code === 'IPDMRPTCOXKANS') {
              e.ViName = '+ Cơ - Xương - Khớp'
            }
            if (e.Code === 'IPDMRPTTTNSANS') {
              e.ViName = '+ Tiết niệu - Sinh dục'
            }
            if (e.Code === 'IPDMRPTNTDDANS') {
              e.ViName = '+ Khác'
            }
            if (e.Code === 'IPDMRPTCXNCANS') {
              e.ViName = 'Các xét nghiệm cận lâm sàng cần làm'
            }
            if (e.Code === 'IPDMRPTTTBAANS') {
              e.ViName = 'Tóm tắt bệnh án'
            }
          })
        }
        this.errors = response.Error
        this.$modal.show('DialogError', {
          title: this.__t('Các thông tin còn thiếu'),
          text: this.__t('Bác sĩ/ Điều dưỡng vui lòng nhập đầy đủ thông tin để hoàn thành'),
          errors: response.Error
        })
        response.Error.forEach(item => {
          console.log('code: ', item.Code)
          $('#' + item.Code).addClass('error')
          $('#' + item.Code).on('keydown keyup click', (e) => {
            $('#' + item.Code).removeClass('error')
          })
        })
        throw hasErr
      }
      return hasErr
    },
    go2Input (item) {
      this.$modal.hide('error-validate-modal')
      if (!item.Code || !$('#' + item.Code).length) return
      $('body,html').animate(
        {
          scrollTop: $('#' + item.Code).offset().top - 150
        },
        400
      )
      setTimeout(() => {
        $('#' + item.Code).focus()
      }, 500)
    },
    toastedSuccess (msg) {
      this.$toasted.success(msg || this.__t('Lưu lại thành công!'), {
        duration: 3000,
        position: 'bottom-right'
      })
      return this
    },
    toastedError (msg) {
      this.$toasted.error(msg || this.__t('Có lỗi xảy ra, Vui lòng thử lại!'), {
        duration: 3000,
        position: 'bottom-right'
      })
    },
    toastedInfo (msg) {
      this.$toasted.info(msg, {
        duration: 3000,
        position: 'bottom-right'
      })
    },
    scroll2Bottom (height) {
      let h = 99000
      if (height) {
        h = height + 130
      }
      setTimeout(() => {
        $('html, body').animate({ scrollTop: h }, 500)
      }, 100)
    },
    scroll2Top () {
      setTimeout(() => {
        $('html, body').animate({ scrollTop: 0 }, 500)
      }, 100)
    },
    getDiagnosis (obj) {
      if (obj != null) {
        return this.fomartIcd(obj.Diagnosis, obj.ICD, obj.DiagnosisOption, obj.ICDOption).trim()
      } else {
        return ''
      }
    },
    getParameterString (parameters) {
      const keys = Object.keys(parameters)
      var parameterStrings = keys
        .filter(key => !!parameters[key])
        .map(key => `${key}=${parameters[key]}`)
      return parameterStrings.length === 0 ? '' : `?${parameterStrings.join('&')}`
    },
    xoaDau (str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/đ/g, 'd')
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      str = str.replace(/Đ/g, 'D')
      return str
    },
    getTextDiagnosis (data) {
      let str = ''
      if (data) {
        str = `${data.MainDisease ? data.MainDisease : ''} ${data.MainDisease && data.IncludingDisease ? '/' : ''} ${data.IncludingDisease ? data.IncludingDisease : ''} ${data.ICD10MainDisease || data.IDC10IncludingDisease ? '(' : ''} ${data.ICD10MainDisease ? `${this.JSONParse(data.ICD10MainDisease).map(e => e.code).join(', ')}` : ''} ${data.ICD10MainDisease && data.IDC10IncludingDisease ? '/' : ''} ${data.IDC10IncludingDisease ? `${this.JSONParse(data.IDC10IncludingDisease).map(e => e.code).join(', ')}` : ''} ${data.ICD10MainDisease || data.IDC10IncludingDisease ? ')' : ''}`
      }
      return str
    },
    async getDataFillBA (FormCode, noneDex) {
      // Đồng bộ từ các bệnh án
      await new MedicalRecord().update('Part3/SyncHistoryOfPatientIllnessAndAssessment' + '/' + FormCode + '?hidemsg=' + true, {Id: this._VisitId}).then(response => {
        let data = response.map(m => {
          // nhi khoa
          if (m.Code === 'IPDMRPTNTDDANS' && FormCode === 'A01_037_050919_V') {
            m.ViName = m.ViName.replace('Nội tiết, d', 'D')
          }
          return this.removeIndexText(m.ViName) + ': ' + (m.Value || '')
        })
        if (data.length) {
          if (FormCode === 'A01_035_050919_V') {
            // sản khoa
            this.valueOfPatientIllnessAndAssessment = this.changeDataSyncBase(response, noneDex)
          } else if (FormCode === 'A01_038_050919_V') {
            // sơ sinh
            this.valueOfPatientIllnessAndAssessment = this.changeDataSyncBase2(response, noneDex)
          } else if (FormCode === 'A01_036_050919_V') {
            // phụ khoa
            this.valueOfPatientIllnessAndAssessment = this.changeDataSyncBase3(response, noneDex)
          } else if (FormCode === 'A01_196_050919_V') {
            // ung bướu
            this.valueOfPatientIllnessAndAssessment = this.changeDataSyncBase4(response, noneDex)
          } else if (['A01_039_050919_V', 'A01_040_050919_V'].includes(FormCode)) {
            this.valueOfPatientIllnessAndAssessment = this.changeDataSyncBase5(response, noneDex)
          } else {
            // nội khoa, nhi khoa, ngoai khoa
            if (noneDex) {
              noneDex.forEach(e => {
                data.splice(e, 1)
              })
            }
            if (FormCode === 'A01_195_050919_V') {
              data.splice((noneDex ? 2 : 3), 0, 'Các cơ quan khác:')
            }
            console.log(data.join('\n'))
            if (data.length) this.valueOfPatientIllnessAndAssessment = data.join('\n')
          }
        }
      })
    },
    dichTextVer2Pknt (str) {
      str = str.replaceAll('Assessment of the function loss level of the lesion area', 'Level of loss of function at injury region')
      str = str.replaceAll('Assessment of the ability to move on a flat surface', 'Ability to move on flat surface')
      str = str.replaceAll('Assessment of the ability to change postures (lying - sitting - standing)', 'Ability to change position (lying – sitting – standing)')
      str = str.replaceAll('Assessment of the ability to perform coordinated movements (reaching out to shake hands, bending to pick up sandals)', 'Ability to perform coordinated motions (reach out to shake hands, bend down to pick up sandals)')
      str = str.replaceAll('Assessment of rehabilitation possibility and level of sequelae', 'Ability of rehabilitation and complication levels')
      str = str.replaceAll('Assessment of the ability to move on a flat surface', 'Respiratory function (Vital capacity, respiratory rate…)')
      str = str.replaceAll(`Assessment of thoracic cage's symmetry and mobility level`, 'Symmetry and movement of rib cage')
      str = str.replaceAll('Ðánh giá kh? nang g?ng s?c', 'Cardiovascular capacity (stress test for 06 minutes, Treadmill test…)')
      str = str.replaceAll('Assessment of the level of heart rate change after physical activities', 'Level of heart rate change after exercise')
      str = str.replaceAll('Assessment of the ability to communicate (spirit, pronunciation ...)', 'Communication ability (mentality, pronunciation/ speech…)')
      str = str.replaceAll('Assessment of swallowing disorders', 'Swallow disorder condition')
      str = str.replaceAll('Assessment of spatial and temporal cognition', 'Ability to perceive space and time')
      str = str.replaceAll('Assessment of capacity of movement coordination (movements, direction, balance)', 'Ability of motor adjustment (vision, direction, balance)')
      str = str.replaceAll('Assessment of the ability to move independently in flat places', 'Ability to move independently on flat surface')
      str = str.replaceAll('Khám dinh dưỡng', 'Đánh giá về dinh dưỡng')
      str = str.replaceAll('Nutrition examination', 'Nutritional assessment')
      str = str.replaceAll('Immunization assessment', 'Vaccination assessment')
      str = str.replaceAll('Assessment of motor development by age', 'Motor development appropriate to age')
      str = str.replaceAll('Assessment of mental development by age', 'Psychological development appropriate to age')
      str = str.replaceAll('Khám tình trạng tăng hoặc giảm cân', 'Đánh giá tình trạng tăng hoặc giảm cân và số cân tăng, giảm trong 1 - 3 tháng qua')
      str = str.replaceAll('Examination of weight gain or weight loss', 'Weight and height of patient, weight gain and weight loss condition for the last 1-3 months')
      str = str.replaceAll('Assessment of appetite, vomiting/ spitting up, urination and defecation', 'Appetite, whether patient is having nausea or vomiting, bladder and bowel habits')
      str = str.replaceAll('Assessment of skin, mucosa, hair, nails, teeth, sleep', 'Skin, mucosa, hair, nail, bone, tongue, teeth and sleeping of patient')
      str = str.replaceAll('Examination of chest, bone, skull joints, fontanel', 'Chest diameter, bone, fontanelle')
      str = str.replaceAll('Assessment of  mental development by age', 'Psychological development appropriate to age')
      str = str.replaceAll('Đánh giá cảm giác ngon miệng, nôn/trớ, đại tiểu tiện', 'Đánh giá cảm giác ngon miệng, buồn nôn và nôn/trớ, đại tiểu tiện')
      str = str.replaceAll('Khám lồng ngực, xương, khớp xương sọ, thóp', 'Đánh giá lồng ngực, xương, khớp xương sọ, thóp')
      str = str.replaceAll('Khám tim, phổi', 'Khám tim mạch, hô hấp')
      str = str.replaceAll('Cardiopulmonary examination', 'Respiratory and cardiac function')
      str = str.replaceAll('Tập trung chú ý', 'Chú ý')
      str = str.replaceAll('Attention and concentration', 'Attention')
      str = str.replaceAll('Cognition', 'Cognitive function')
      str = str.replaceAll('Sensation', 'Sensory')
      str = str.replaceAll('Emotion', 'Emotional')
      str = str.replaceAll('General expression', 'General manifestation')
      str = str.replaceAll('Gi?i tính', 'Giới tính')
      return str
    },
    dichTextTKCM (str) {
      str = str.replaceAll('Gi?i tính', 'Giới tính')
      str = str.replaceAll('Ðánh giá kh? nang g?ng s?c', 'Đánh giá khả năng gắng sức')
      return str
    },
    removeIndexText (value) {
      var t = this.trim_(value, '1. ')
      t = this.trim_(t, '2. ')
      t = this.trim_(t, '3. ')
      t = this.trim_(t, '4. ')
      t = this.trim_(t, '5. ')
      return t
    },
    changeDataSyncBase5 (data, noneDex) {
      let str = ''
      console.log(data)
      data.sort((a, b) => a.Order - b.Order)
      data.map(e => {
        if (e.Order >= 1) {
          e.Order = e.Order + 1
        }
        if (e.Code === 'IPDMRPTQTBLANS') {
          e.ViName = 'Quá trình bệnh lý'
        }
        if (e.Code === 'IPDMRPTTHKIANS') {
          e.ViName = '+ Tâm thần, Thần kinh'
        }
        if (e.Code === 'IPDMRPTTTYTANS') {
          e.ViName = 'Toàn thân'
        }
        if (e.Code === 'IPDMRPTCOXKANS') {
          e.ViName = '+ Cơ - Xương - Khớp'
        }
        if (e.Code === 'IPDMRPTTTNSANS') {
          e.ViName = '+ Tiết niệu - Sinh dục'
        }
        if (e.Code === 'IPDMRPTNTDDANS') {
          e.ViName = '+ Khác'
        }
        if (e.Code === 'IPDMRPTCXNCANS') {
          e.ViName = 'Các xét nghiệm cận lâm sàng cần làm'
        }
        if (e.Code === 'IPDMRPTTTBAANS') {
          e.ViName = 'Tóm tắt bệnh án'
        }
      })
      let row1 = {
        Code: 'KhamBenh',
        ViName: '- Khám bệnh',
        Order: 1,
        Value: ''
      }
      data.push(row1)
      data.sort((a, b) => a.Order - b.Order)
      if (noneDex) {
        noneDex.forEach(e => {
          data.splice(e, 1)
        })
      }
      data.forEach(e => {
        str += (e.ViName ? e.ViName + ': ' : '') + (e.Value ? e.Value : '')
        str += '\n'
      })
      return str
    },
    changeDataSyncBase (data, noneDex) {
      let str = ''
      data.sort((a, b) => a.Order - b.Order)
      data.map(e => {
        if (e.Order >= 1) {
          e.Order = e.Order + 1
        }
        if (e.Code === 'IPDMRPTBATHANS') {
          e.ViName = '- Tiền sử bệnh của bản thân:'
          e.EnName = '- Personal medical history:'
        }
        if (e.Code === 'IPDMRPTTTYTANS') {
          e.ViName = '+ Toàn trạng:'
          e.EnName = '+ Overall condition:'
        }
        if (e.Code === 'IPDMRPTTTNSANS') {
          e.ViName = '+ Tiết niệu:'
          e.EnName = '+ Urinary system:'
        }
        if (e.Code === 'IPDMRPTTUHOANS') {
          e.ViName = '+ Tuần hoàn:'
          e.EnName = '+ Circulatory system:'
        }
        if (e.Code === 'IPDMRPTHOHAANS') {
          e.ViName = '+ Hô hấp:'
          e.EnName = '+ Respiratory system:'
        }
        if (e.Code === 'IPDMRPTTIHOANS') {
          e.ViName = '+ Tiêu hoá:'
          e.EnName = '+ Digestive system:'
        }
        if (e.Code === 'IPDMRPT831') {
          e.ViName = '+ Các bộ phận khác:'
          e.EnName = '+ Other organs:'
        }
      })
      let row1 = {
        Code: 'KhamBenh',
        ViName: '- Khám bệnh: ',
        EnName: '- Examination: ',
        Order: 1,
        Value: ''
      }
      data.push(row1)
      data.sort((a, b) => a.Order - b.Order)
      if (noneDex) {
        noneDex.forEach(e => {
          data.splice(e, 1)
        })
      }
      data.forEach(e => {
        str += (this.__label(e) ? this.__label(e) + ' ' : '') + (e.Value ? e.Value : '')
        str += '\n'
      })
      return str
    },
    changeDataSyncBase2 (data, noneDex) {
      let str = ''
      let row8 = {
        Code: 'MauSacDa',
        ViName: '+ Màu sắc da',
        Order: 9,
        Value: ''
      }
      let row = {
        Code: 'CacCoQuanKhac',
        ViName: 'Các cơ quan khác',
        Order: 10,
        Value: ''
      }
      data.push(row8)
      data.push(row)
      data.sort((a, b) => a.Order - b.Order)
      data.map(m => {
        if (m.Value === 'True') {
          m.Value = true
        }
        if (m.Value === 'False') {
          m.Value = false
        }
        if (m.ViName.includes(':')) {
          m.ViName = m.ViName.replace(':', '')
        }
        if (m.ViName.includes('-')) {
          m.ViName = m.ViName.replace('-', '+')
        }
        if (m.ViName.includes('. ')) {
          m.ViName = m.ViName.split('. ')[1]
        }
        if (m.Code === 'IPDMRPT61') {
          m.Order = 1
        }
        if (m.Code === 'IPDMRPT104') {
          m.Value = ''
          m.Order = 2
          m.ViName = 'Toàn thân'
        }
        if (m.Code === 'IPDMRPT105') {
          if (m.Value === true) {
            m.Value = 'Dị tật bẩm sinh'
          } else {
            m.Value = ''
          }
          m.Order = 3
          m.ViName = '+ Dị tật bẩm sinh/Có hậu môn'
        }

        if (m.Code === 'IPDMRPT106') {
          m.Order = 5
          m.ViName = ''
          if (m.Value === true) {
            data.find(e => {
              if (e.Code === 'IPDMRPT105') {
                if (e.Value) {
                  e.Value += ', '
                }
                e.Value += 'Có hậu môn'
              }
            })
          }
          m.Value = ''
        }

        if (m.Code === 'IPDMRPT108') {
          m.Order = 6
          m.ViName = ''
          if (m.Value) {
            data.find(e => {
              if (e.Code === 'IPDMRPT105') {
                if (e.Value) {
                  e.Value += '. Cụ thể dị tật: '
                }
                e.Value += m.Value
              }
            })
            m.Value = ''
          }
        }
        if (m.Code === 'IPDMRPT111') {
          m.Order = 7
        }
        if (m.Code === 'IPDMRPT113') {
          m.Order = 8
        }
        if ((m.Code === 'IPDMRPT115' && !m.Value) && (m.Code === 'IPDMRPT116' && !m.Value) && (m.Code === 'IPDMRPT117' && !m.Value) && (m.Code === 'IPDMRPT118' && !m.Value) && (m.Code === 'IPDMRPT119' && !m.Value)) {
          data.find(e => {
            if (e.Code === 'MauSacDa') {
              e.Value = ''
            }
          })
        }
        if ((m.Code === 'IPDMRPT115' || m.Code === 'IPDMRPT116' || m.Code === 'IPDMRPT117' || m.Code === 'IPDMRPT118' || m.Code === 'IPDMRPT119') && m.Value) {
          data.find(e => {
            if (e.Code === 'MauSacDa') {
              e.Value = m.ViName
            }
          })
        }
        if (m.Code === 'IPDMRPTHOHAANS') {
          m.Order = 11
        }
        if (m.Code === 'IPDMRPT122') {
          m.Order = 12
          m.ViName = ' ' + m.ViName
        }
        if (m.Code === 'IPDMRPT124') {
          m.Order = 13
          m.ViName = ' ' + m.ViName
        }
        if (m.Code === 'IPDMRPT126') {
          m.Order = 14
        }
        if (m.Code === 'IPDMRPT128') {
          m.Order = 15
        }
        if (m.Code === 'IPDMRPT130') {
          m.Order = 16
          m.ViName = '+ Cơ quan sinh dục ngoài'
        }
        if (m.Code === 'IPDMRPT132') {
          m.Order = 17
        }
        if (m.Code === 'IPDMRPT133') {
          m.Order = 18
        }
        if (m.Code === 'IPDMRPT135') {
          m.Order = 19
          m.ViName = ' + Phản xạ'
        }
        if (m.Code === 'IPDMRPT137') {
          m.Order = 20
          m.ViName = ' ' + m.ViName
        }
        if (m.Code === 'IPDMRPTCXNCANS') {
          m.Order = 21
        }
        if (m.Code === 'IPDMRPTTTBAANS') {
          m.Order = 22
        }
        if (m.Code === 'IPDMRPT139') {
          m.Order = 23
        }
      })
      data.sort((a, b) => a.Order - b.Order)
      if (noneDex) {
        noneDex.forEach(e => {
          data.splice(e, 1)
        })
        data.map(e => {
          if (e.ViName === ' + Phản xạ' || e.ViName === ' + Trương lực cơ' || e.ViName === ' + Nghe phổi' || e.ViName === ' + Chỉ số Silverman') {
            e.ViName = '&nbsp;' + e.ViName
          }
        })
      }
      data.forEach(e => {
        if (e.Order < 24) {
          str += (e.ViName ? e.ViName + ': ' : '') + (e.Value !== true ? e.Value : '')
          if (e.Order !== 3 && e.Order !== 5) {
            str += '\n'
          }
        }
      })
      return str
    },
    changeDataSyncBase3 (data, noneDex) {
      let str = ''
      data.map(e => {
        if (e.Code === 'IPDMRPTQTBLANS') {
          e.ViName = 'Quá trình bệnh lý'
        }
        if (e.Code === 'IPDMRPTTTYTANS') {
          e.ViName = 'Toàn thân'
        }
        if (e.Code === 'IPDMRPT929') {
          e.ViName = '+ Da niêm mạc'
        }
        if (e.Code === 'IPDMRPT930') {
          e.ViName = '+ Hạch'
        }
        if (e.Code === 'IPDMRPT931') {
          e.ViName = '+ Vú'
        }
        if (e.Code === 'IPDMRPTCACQ') {
          e.ViName = 'Các cơ quan'
          e.Value = ''
        }
        if (e.Code === 'IPDMRPTCOXKANS') {
          e.ViName = '+ Cơ - Xương - Khớp'
        }
        if (e.Code === 'IPDMRPTTTNSANS') {
          e.ViName = '+ Thận - Tiết niệu'
        }
        if (e.Code === 'IPDMRPT831') {
          e.ViName = '+ Khác'
        }
      })
      data.sort((a, b) => a.Order - b.Order)
      if (noneDex) {
        noneDex.forEach(e => {
          data.splice(e, 1)
        })
      }
      data.sort((a, b) => a.Order - b.Order)
      console.log('data: ', data)
      data.forEach(e => {
        if (e.Order < 24) {
          str += (e.ViName ? e.ViName + ': ' : '') + (e.Value ? e.Value : '')
          str += '\n'
        }
      })
      return str
    },
    changeDataSyncBase4 (data, noneDex) {
      let str = ''
      data.map(e => {
        if (e.Code === 'IPDMRPTQTBLANS') {
          e.ViName = 'Quá trình bệnh lý'
        }
        if (e.Code === 'IPDMRPTTTYTANS') {
          e.ViName = 'Toàn thân'
        }
        if (e.Code === 'IPDMRPT1003') {
          e.ViName = 'Bộ phận tổn thương'
        }
        if (e.Code === 'IPDMRPT1007') {
          e.ViName = '+ Mô tả tổn thương'
        }
        if (e.Code === 'IPDMRPTCACQ') {
          e.ViName = 'Các cơ quan'
        }
        if (e.Code === 'IPDMRPT1027') {
          e.ViName = '+ Tiết niệu'
        }
        if (e.Code === 'IPDMRPT831') {
          e.ViName = '+ Khác'
        }
        if (e.Code === 'IPDMRPTCXNCANS') {
          e.ViName = 'Các xét nghiệm cận lâm sàng cần làm'
        }
        if (e.Code === 'IPDMRPTTTBAANS') {
          e.ViName = 'Tóm tắt bệnh án'
        }
      })
      data.sort((a, b) => a.Order - b.Order)
      if (noneDex) {
        noneDex.forEach(e => {
          data.splice(e, 1)
        })
      }
      data.sort((a, b) => a.Order - b.Order)
      console.log('data: ', data)
      data.forEach(e => {
        if (e.Order < 24) {
          str += (e.ViName ? e.ViName + ': ' : '') + (e.Value ? e.Value : '')
          str += '\n'
        }
      })
      return str
    },
    isPainDataNull (value, code) {
      if (code === 'IPDMRPT10010') console.log(value, 'IPDMRPT10010')
      return ['[]', ' [] '].includes(value)
    },
    getChuanDoan (info) {
      let str = ''
      let str2 = ''
      var opd = null
      if (info && info.DiagnosisAndICD) {
        opd = info.DiagnosisAndICD
      }
      if (opd) {
        if (opd.Diagnosis) {
          if (str) {
            str += '/ '
          }
          str += opd.Diagnosis
        }
        if (opd.DiagnosisOption) {
          if (str) {
            str += '/ '
          }
          str += opd.DiagnosisOption
        }
        if (opd.ICD && opd.ICD !== '""' && opd.ICD !== 'null') {
          var str3 = ''
          let ICD = this.JSONParse(opd.ICD || [], true)
          if (ICD && Array.isArray(ICD)) {
            ICD.forEach(e => {
              if (str3) {
                str3 += ', '
              }
              str3 += e.code
            })
          }
        }
        if (opd.ICDOption && opd.ICDOption !== '""' && opd.ICDOption !== 'null') {
          var str4 = ''
          let ICDOption = this.JSONParse(opd.ICDOption || [], true)
          if (ICDOption && Array.isArray(ICDOption)) {
            ICDOption.forEach(e => {
              if (str4) {
                str4 += ', '
              }
              str4 += e.code
            })
          }
        }
        if (str3) {
          str2 += str3
        }
        if (str4) {
          if (str2) {
            str2 += '/ '
          }
          str2 += str4
        }
        if (str2) {
          str += ` (${str2})`
        }
      }
      return str
    },
    getChuanDoan2 (info) {
      let str = ''
      let str2 = ''
      var opd = null
      if (info && info.DiagnosisAndICD) {
        opd = info.DiagnosisAndICD
      }
      if (opd) {
        if (opd.Diagnosis) {
          if (str) {
            str += '/ '
          }
          str += opd.Diagnosis
        }
        if (opd.ICD && opd.ICD !== '""' && opd.ICD !== 'null') {
          let ICD = this.JSONParse(opd.ICD || [], true)
          if (ICD && Array.isArray(ICD)) {
            ICD.forEach(e => {
              if (str2) {
                str2 += ', '
              }
              str2 += e.code
            })
          }
        }
        if (str2) {
          str += ` (${str2})`
        }
      }
      return str
    },
    getChuanDoanRoiKhoa (info) {
      let str = ''
      let str2 = ''
      var opd = null
      if (info && info.DiagnosisDischagre) {
        opd = info.DiagnosisDischagre
      }
      if (opd) {
        if (opd.Diagnosis) {
          if (str) {
            str += '/ '
          }
          str += opd.Diagnosis
        }
        if (opd.DiagnosisOption) {
          if (str) {
            str += '/ '
          }
          str += opd.DiagnosisOption
        }
        if (opd.ICD && opd.ICD !== '""' && opd.ICD !== 'null') {
          var str3 = ''
          let ICD = this.JSONParse(opd.ICD || [], true)
          if (ICD && Array.isArray(ICD)) {
            ICD.forEach(e => {
              if (str3) {
                str3 += ', '
              }
              str3 += e.code
            })
          }
        }
        if (opd.ICDOption && opd.ICDOption !== '""' && opd.ICDOption !== 'null') {
          var str4 = ''
          let ICDOption = this.JSONParse(opd.ICDOption || [], true)
          if (ICDOption && Array.isArray(ICDOption)) {
            ICDOption.forEach(e => {
              if (str4) {
                str4 += ', '
              }
              str4 += e.code
            })
          }
        }
        if (str3) {
          str2 += str3
        }
        if (str4) {
          if (str2) {
            str2 += '/ '
          }
          str2 += str4
        }
        if (str2) {
          str += ` (${str2})`
        }
      }
      return str
    },
    getTypeAllergy (data) {
      let str = ''
      if (data && data.split(',').length === 1) {
        this.ALLERGY.find(e => {
          if (data.includes(e.value)) {
            str = this.__t(e.label) + ': '
          }
        })
      }
      if (data && data.split(',').length > 1) {
        this.ALLERGY.find(e => {
          if (data.includes(e.value)) {
            if (str) {
              str = str.replace(': ', ', ')
            }
            str += this.__t(e.label) + ': '
          }
        })
      }
      return str
    },
    IsFormLocked (data) {
      if (data && data.IsLocked) {
        return true
      }
      return false
    }
  }
}
