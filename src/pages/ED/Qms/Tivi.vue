<template>
  <div class="main-content" id="tivi-screen">
    <div style="flex: 0;">
      <header>
        <div>
          <p><strong class="site-name-label f3">Bệnh viện Vinmec {{store.state.account.Site.Name}}</strong></p>
          <p><span class="speciality-name-label f3 no-wrap">Khu vực: <strong>{{store.state.account.Specialty.ViName}}</strong></span></p>
        </div>
        <div class="text-center">
          <a @click="go2Home">
            <img class="logo" src="/static/logo.png" />
          </a>
        </div>
        <div class="clock">
          <div class="hours f6">
            <b>
              {{clock.time.hour}}<b :style="{visibility: clock.time.seconds % 2 === 0 ? 'visible' : 'hidden'}">:</b>{{clock.time.minutes}}
            </b>
          </div>
          <div class="date f3">{{clock.date}}</div>
        </div>
      </header>
    </div>
    <div style="flex: 0;">
      <div class="tivi-main-title">
        <div class="tivi-main-title-left">
          <h2 class="f3 title no-bg"><strong>{{__t('HOẠT ĐỘNG CHUYÊN MÔN')}}</strong></h2>
        </div>
        <div class="tivi-main-title-right">
          <h2 class="f3 title no-bg"><strong>{{__t('PHÂN CÔNG NHÂN LỰC')}}</strong></h2>
        </div>
      </div>
    </div>
    <div class="tivi-main-content">
      <div class="tivi-main-content-left">
        <table class="tv-table">
          <thead>
            <tr>
              <th height="1" width="1">{{__t('STT')}}</th>
              <th height="1" width="1">{{__t('Giờ vào')}}</th>
              <th height="1">{{__t('Phòng')}}/ <br/>{{__t('Giường')}}</th>
              <th height="1">{{__t('Lý do')}}</th>
              <th height="1">{{__t('Điều dưỡng')}}</th>
              <th height="1">{{__t('Bác sĩ')}}</th>
              <th height="1">{{__t('Phân loại')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(item, index) in parameters.PageSize">
              <template v-if="Data[index]">
                <td class="text-center">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
                <td>{{Data[index].AdmittedDate}}</td>
                <td class="no-wrap">{{Data[index].Bed}}</td>
                <td><p style="margin: 0">{{Data[index].Reason}}</p></td>
                <td>
                  <template v-if="Data[index].CurrentNurse">
                    <UsersView :data="[Data[index].CurrentNurse]"/>
                  </template>
                </td>
                <td>
                  <template v-if="Data[index].CurrentDoctor">
                    <UsersView :data="[Data[index].CurrentDoctor]"/>
                  </template>
                </td>
                <td class="no-wrap">
                  <span v-if="Data[index].ATSScale && Data[index].ATSScale.Code" class="label e-label" :style="'background-color: ' + Data[index].ATSScale.Note">{{__label(Data[index].ATSScale)}}</span>
                  <span v-else class="label e-label">{{__t('home.chua_phan_loai')}}</span>
                </td>
              </template>
              <template v-else>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
              </template>
            </tr>
            <tr>
              <td colspan="7" style="position: relative;overflow: hidden;">
                {{parameters.pages ? parameters.pageNumber : 0}}/{{parameters.pages}}
                <!-- <paginate
                :disabled="true"
                :clickHandler="getData"
                :container-class="'pagination pagination-sm no-margin v-pagination'"
                :next-text="'»'"
                :page-count="parameters.pages"
                :prev-text="'«'"
                v-if="Data.length > 0"
                v-model="parameters.pageNumber">
                </paginate> -->
                <!-- <span class="spinner-icon">30</span> -->
                <div class="timer" :class="timerStyle" v-if="parameters.pages > 1"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tivi-main-content-right">
        <table class="tv-table b-white">
          <thead>
            <tr>
              <th height="1" width="1" class="no-wrap">{{__t('Vị trí')}}</th>
              <th height="1" width="23%">{{__t('Chính')}}</th>
              <th height="1" width="23%">{{__t('Phụ')}}</th>
              <th height="1" width="23%">{{__t('Tăng cường')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="ind" v-for="(staff, ind) in HumanResourceAssessmentData">
              <td>{{__label(staff)}}</td>
              <template v-if="ind === 0">
                <td :colspan="staff.GroupStaffs.length">
                  <UsersView :onlyUsername="true" :data="staff.GroupStaffs[0].Users"/>
                </td>
              </template>
              <template v-else>
              <td :key="i" v-for="(staf, i) in staff.GroupStaffs">
                <UsersView :onlyUsername="true" :data="staf.Users"/>
              </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import PatientManagement from '@/services/ED/PatientManagement'
import HumanResourceAssessment from '@/services/ED/HumanResourceAssessment'
import UsersSelect from '@/components/UsersSelect.vue'
import UsersView from './UsersList.vue'
import $ from 'jquery'
import store from '@/store'
const TIMEOUT = 30
// import _ from 'lodash'
// import NProgress from 'nprogress'
// import moment from 'moment'
export default {
  name: 'EDTIVI',
  mixins: [],
  data () {
    return {
      Data: [],
      store: store,
      HumanResourceAssessmentData: [],
      parameters: {
        pageNumber: 0,
        pages: 1,
        PageSize: 12
      },
      timeOut: null,
      clock: {
        time: '',
        date: ''
      },
      timerID: null,
      timer: 0,
      hasTimer: false,
      parrentHeight: 0
    }
  },
  components: {
    UsersSelect, UsersView
  },
  mounted () {
    // NProgress.start()
    this.parrentHeight = $('.tivi-main-content-left').height()
    console.log(this.parrentHeight)
    this.getData()
    this.timerID = setInterval(this.updateTime, 1000)
    setTimeout(() => {
      this.reload()
    }, 60 * 60 * 1000)
  },
  computed: {
    timerStyle: function () {
      return {
        // width: (this.timer / TIMEOUT * 100) + '%'
        animationW30: this.hasTimer
      }
    }
  },
  methods: {
    tableCalculator () {
      console.log(this.parrentHeight)
      $('.tv-table').height(this.parrentHeight)
    },
    zeroPadding (num, digit) {
      var zero = ''
      for (var i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    },
    updateTime () {
      this.timer++
      var cd = new Date()
      this.clock.time = {
        hour: this.zeroPadding(cd.getHours(), 2),
        minutes: this.zeroPadding(cd.getMinutes(), 2),
        seconds: cd.getSeconds()
      }
      this.clock.date = this.zeroPadding(cd.getDate(), 2) + '/' + this.zeroPadding(cd.getMonth() + 1, 2) + '/' + this.zeroPadding(cd.getFullYear(), 4)
    },
    getData () {
      if (this.$route.name !== 'ED-Tivi') return
      this.hasTimer = false
      this.parameters.pageNumber = (this.parameters.pageNumber >= this.parameters.pages) ? 1 : this.parameters.pageNumber + 1
      new PatientManagement(this.parameters)
        .all()
        .then(response => {
          setTimeout(() => {
            this.hasTimer = true
            this.tableCalculator()
          }, 1000)
          this.timer = 0
          this.Data = response.results || []
          var bonussssss = 1
          if ((response.count % this.parameters.PageSize) === 0) {
            bonussssss = 0
          }
          this.parameters.pages = parseInt(response.count / this.parameters.PageSize) + bonussssss
          this.timeOut = setTimeout(() => {
            this.getData()
          }, TIMEOUT * 1000)
        })
      new HumanResourceAssessment()
        .find('TV')
        .then(response => {
          this.HumanResourceAssessmentData = response
        })
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeOut)
    clearInterval(this.timerID)
    // console.log('OFF')
  }
}
</script>
