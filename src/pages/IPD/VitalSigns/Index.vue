<template>
  <div class="main-content" id="InitialAssessment-page">
    <h1 class="text-center form-title">{{__t('Bảng theo dõi dấu hiệu sinh tồn')}}</h1>
    <div v-if="loaded">
      <div class="v-tab">
        <ul class="nav nav-tabs" role="tablist">
          <li v-if="checkShowTabAdult" :class="activeClass('IpdAdultVitalSigns')">
            <router-link :to="{name: 'IpdAdultVitalSigns', params: { Id: this.$route.params.Id }}">
              {{__t('Người lớn')}}
            </router-link>
          </li>
          <!-- <li v-if="checkShowTabFromCode('A01_035_050919_V', 'A01_035_050919_V')" role="presentation" :class="activeClass('IpdPregnantVitalSigns')"> -->
          <li v-if="checkShowTab('VSFPW')" role="presentation" :class="activeClass('IpdPregnantVitalSigns')">
            <router-link :to="{name: 'IpdPregnantVitalSigns', params: { Id: this.$route.params.Id }}">
              {{__t('Sản phụ')}}
            </router-link>
          </li>
          <!-- <li v-if="checkShowTabFromCode('A01_038_050919_V', 'A01_038_050919_V')" role="presentation" :class="activeClass('IpdNeonatalVitalSigns')"> -->
          <li v-if="checkShowTab('IPDNOC')" role="presentation" :class="activeClass('IpdNeonatalVitalSigns')">
            <router-link :to="{name: 'IpdNeonatalVitalSigns', params: { Id: this.$route.params.Id }}">
              {{__t('Sơ sinh')}}
            </router-link>
          </li>
          <li v-if="(checkShowTab('A02_036_080322_V') && monthOfAge >= 1 && monthOfAge < 3) || checkShowTabFromExisted('A02_036_080322_V')" role="presentation" :class="activeClass('IpdPediatric1ToUnder3Month')">
            <router-link :to="{name: 'IpdPediatric1ToUnder3Month', params: { Id: this.$route.params.Id }}">
              {{__t('Từ 1 đến dưới 3 tháng tuổi')}}
            </router-link>
          </li>
          <li v-if="(checkShowTab('A02_035_080322_V') && monthOfAge >= 3 && monthOfAge <= 12 && yearOfAge < 1) || checkShowTabFromExisted('A02_035_080322_V')"  role="presentation" :class="activeClass('IpdPediatric3To12Month')">
            <router-link :to="{name: 'IpdPediatric3To12Month', params: { Id: this.$route.params.Id }}">
              {{__t('Từ 3 đến 12 tháng tuổi')}}
            </router-link>
          </li>
          <li v-if="(checkShowTab('A02_034_080322_V') && yearOfAge >= 1 && yearOfAge < 4) || checkShowTabFromExisted('A02_034_080322_V')" role="presentation" :class="activeClass('IpdPediatric1ToUnder4Old')">
            <router-link :to="{name: 'IpdPediatric1ToUnder4Old', params: { Id: this.$route.params.Id }}">
              {{__t('Từ 1 đến dưới 4 tuổi')}}
            </router-link>
          </li>
          <li v-if="(checkShowTab('A02_033_080322_V') && yearOfAge >= 4 && yearOfAge <= 12) || checkShowTabFromExisted('A02_033_080322_V')" role="presentation" :class="activeClass('IpdPediatric4To12Old')">
            <router-link :to="{name: 'IpdPediatric4To12Old', params: { Id: this.$route.params.Id }}">
              {{__t('Từ 4 đến 12 tuổi')}}
            </router-link>
          </li>
          <li v-if="(checkShowTab('A02_032_220321_VE') && yearOfAge >= 13) || checkShowTabFromExisted('A02_032_220321_VE')" role="presentation" :class="activeClass('IpdPediatricOver12Old')">
            <router-link :to="{name: 'IpdPediatricOver12Old', params: { Id: this.$route.params.Id }}">
              {{__t('Trên 12 tuổi')}}
            </router-link>
          </li>
        </ul>
        <div class="tab-content">
          <transition name="page" mode="out-in">
            <router-view/>
          </transition>
        </div>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import CustomersIPD from '@/services/IPD/Customer'
import IPDPediatricVitalSign from '@/services/IPD/PediatricVitalSigns'
import moment from 'moment'
export default {
  /**
   * The name of the page.
   */
  name: 'IpdVitalSigns',
  data () {
    return {
      checkShowTabAdult: false,
      Id: this.$route.params.Id,
      listMedicalRecord: [],
      listExisted: [],
      monthOfAge: null,
      yearOfAge: null,
      loaded: false,
      listDGBD: []
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      new IPDPediatricVitalSign().find('GetHistory' + '/' + this._VisitId).then(response => {
        this.listExisted = response
      }).catch(error => {
        console.log(error)
      })
      new CustomersIPD().find(this.$route.params.Id).then(response => {
        this.listMedicalRecord = response.MedicalRecordType
        this.listDGBD = response.Danhgiabandau
        let countNhi = 0
        let countSoSinh = 0
        let countKhac = 0
        for (let i = 0; i < this.listMedicalRecord.length; i++) {
          if (this.listMedicalRecord[i].FormCode === 'A01_037_050919_V') {
            countNhi++
          } else if (this.listMedicalRecord[i].FormCode === 'A01_038_050919_V') {
            countSoSinh++
          } else if (this.listMedicalRecord[i].FormCode !== 'A01_038_050919_V' && this.listMedicalRecord[i].FormCode !== 'A01_037_050919_V') {
            countKhac++
          }
        }
        if (countSoSinh > 0) {
          this.checkShowTabAdult = false
        }
        if (countNhi > 0) {
          this.checkShowTabAdult = false
        }
        if (countNhi === 0 && countSoSinh === 0) {
          this.checkShowTabAdult = true
        }
        if (countSoSinh > 0 && countKhac > 0) {
          this.checkShowTabAdult = true
        }
        if (countNhi > 0 && countKhac > 0) {
          this.checkShowTabAdult = true
        }
        if (countSoSinh > 0 && countNhi > 0 && countKhac > 0) {
          this.checkShowTabAdult = false
        }

        this.dayOfAge = Math.floor(moment(new Date()).diff(moment(response.DateOfBirth, 'DD/MM/YYYY'), 'days', true))
        this.monthOfAge = Math.floor(moment(new Date()).diff(moment(response.DateOfBirth, 'DD/MM/YYYY'), 'months', true))
        this.yearOfAge = Math.floor(moment(new Date()).diff(moment(response.DateOfBirth, 'DD/MM/YYYY'), 'years', true))

        // let testDateOfBidth = '23/06/2021'
        // let getAgeDay = moment(new Date()).diff(moment(testDateOfBidth, 'DD/MM/YYYY'), 'days', true)
        // let getAgeMonth = moment(new Date()).diff(moment(testDateOfBidth, 'DD/MM/YYYY'), 'months', true)
        // let getAgeYear = moment(new Date()).diff(moment(testDateOfBidth, 'DD/MM/YYYY'), 'years', true)

        // console.log(`Age from ${testDateOfBidth} to ${moment().format('DD/MM/YYYY')}: ${getAgeDay} day, ${getAgeMonth} month, ${getAgeYear} year`)
        // console.log('☣️ ~ newCustomersIPD ~ dayOfAge', this.dayOfAge)
        // console.log('☣️ ~ newCustomersIPD ~ monthOfAge', this.monthOfAge)
        // console.log('☣️ ~ newCustomersIPD ~ yearOfAge', this.yearOfAge)
        this.loaded = true
      }).catch(error => {
        console.log(error)
        this.loaded = true
      })
    },
    checkShowTab (type) {
      return this.listDGBD && this.listDGBD.some(i => i.Form === type)
    },
    // checkShowTabFromCodeNhi () {
    //   if (this.listMedicalRecord.length > 0) {
    //     if (this.listMedicalRecord.filter(i => i.FormCode === 'A01_037_050919_V' || i.FormCode === 'A01_195_050919_V' || i.FormCode === 'A01_034_050919_V').length > 0) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   } else {
    //     return false
    //   }
    // },
    // checkShowTabFromCode (code, code1) {
    //   if (this.listMedicalRecord.length > 0) {
    //     if (this.listMedicalRecord.filter(i => i.FormCode === code || i.FormCode === code1).length > 0) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   } else {
    //     return false
    //   }
    // },
    checkShowTabFromExisted (code) {
      if (this.listExisted.filter(i => i === code).length > 0) {
        return true
      } else {
        return false
      }
    },
    activeClass (link) {
      if (typeof link === 'string') return link === this.$route.name ? 'active' : ''
      return link.includes(this.$route.name) ? 'active' : ''
    }
  }
}
</script>
