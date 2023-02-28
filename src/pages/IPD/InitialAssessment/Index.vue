<template>
  <div v-if="loaded" class="main-content" id="InitialAssessment-page">
    <h1 class="text-center form-title">{{__t('Đánh giá ban đầu người bệnh nội trú')}}</h1>
    <div class="v-tab">
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('IPDInitialAssessmentForAdult')">
          <router-link :to="{name: 'IPDInitialAssessmentForAdult', params: { Id: this.$route.params.Id }}">
            {{__t('Người bệnh nội trú thông thường')}}
          </router-link>
        </li>
        <li role="presentation" v-if="checkShowTab('IPDInitialAssessmentSpecial')" :class="activeClass(['IPDInitialAssessmentSpecial', 'IPDInitialAssessmentForFrailElderly', 'IPDInitialAssessmentForChemotherapy'])">
          <router-link :to="{name: 'IPDInitialAssessmentSpecial', params: { Id: this.$route.params.Id }}">
            {{__t('Người bệnh nội trú đặc biệt')}}
          </router-link>
        </li>
        <!-- <li role="presentation" v-if="checkShowTab('InitialAssessmentForPediatricInPatient') || checkSetupBaNoi()" :class="activeClass('IPDInitialAssessmentForChild')"> -->
        <li role="presentation" v-if="checkShowTab('A02_014_220321_VE')" :class="activeClass('IPDInitialAssessmentForChild')">
          <router-link :to="{name: 'IPDInitialAssessmentForChild', params: { Id: this.$route.params.Id }}">
            {{__t('Trẻ nội trú nhi')}}
          </router-link>
        </li>
        <!-- <li role="presentation" v-if="checkShowTab('InitialAssessmentForNeonatal')" :class="activeClass('IPDInitialAssessmentForNewBorn')"> -->
        <li role="presentation" v-if="checkShowTab('A02_015_220321_VE')" :class="activeClass('IPDInitialAssessmentForNewBorn')">
          <router-link :to="{name: 'IPDInitialAssessmentForNewBorn', params: { Id: this.$route.params.Id }}">
            {{__t('Trẻ sơ sinh nội trú')}}
          </router-link>
        </li>
        <!-- <li role="presentation" v-if="checkShowTabFromCode('A01_035_050919_V')" :class="activeClass('IPDInitialAssessmentForWomenInLabour')"> -->
        <li role="presentation" v-if="checkShowTab('A02_069_080121_VE')" :class="activeClass('IPDInitialAssessmentForWomenInLabour')">
          <router-link :to="{name: 'IPDInitialAssessmentForWomenInLabour', params: { Id: this.$route.params.Id }}">
            {{__t('Sản phụ chuyển dạ')}}
          </router-link>
        </li>
        <!-- <li role="presentation" v-if="checkShowTabFromCode('A01_035_050919_V') || checkShowTabFromCode('A01_038_050919_V') || checkIsCreate" :class="activeClass(['IPDInitialAssessmentNeonatalMaternity', 'IPDInitialForNeonatalMaternity', 'IPDInitialAssessmentForNeonatalMaternity', 'IPDInitialAssessmentForAdmissionAssessment', 'IPDInitialAssessmentForUterineLife2Hours', 'IPDNeonatalMaternityV2'])"> -->
        <li role="presentation" v-if="checkShowTab('A02_016_050919_VE') || checkIsCreate" :class="activeClass(['IPDInitialAssessmentNeonatalMaternity', 'IPDInitialForNeonatalMaternity', 'IPDInitialAssessmentForNeonatalMaternity', 'IPDInitialAssessmentForAdmissionAssessment', 'IPDInitialAssessmentForUterineLife2Hours', 'IPDNeonatalMaternityV2'])">
          <router-link :to="{name: 'IPDInitialAssessmentForNeonatalMaternity', params: { Id: this.$route.params.Id }}">
            {{__t('Trẻ vừa sinh')}}
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
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import CustomersIPD from '@/services/IPD/Customer'
import InitialAssessment from '@/services/IPD/InitialAssessment'
export default {
  /**
   * The name of the page.
   */
  name: 'IPDInitialAssessment',
  data () {
    return {
      Id: this.$route.params.Id,
      showTab: false,
      listDGBD: [],
      listMedicalRecord: [],
      HideFormNewborn: false,
      infoVersion: '',
      isCreateOldNewBorn: false,
      isCreateNewBorn: false,
      isCreateWomen: false,
      MedicalRecordType: [],
      checkNhi: false,
      loaded: false
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
    this.getDataOld()
    this.getDataNewBorn()
    this.getDataWomen()
    this.getTypeOfSpecial()
    this.getData()
  },
  computed: {
    checkType: function () {
      return this.CurrentPatientObj && this.CurrentPatientObj.InitialAssessmentForPediatricInPatient
    },
    checkIsCreate: function () {
      return this.isCreateOldNewBorn || this.isCreateNewBorn || this.isCreateWomen
    }
  },
  methods: {
    getTypeOfSpecial () {
      new InitialAssessment().find('ForNeonatalMaternityV2/InforVersion/' + this._VisitId).then(response => {
        this.infoVersion = response.MedicalRecordCode
      }).catch(err => {
        console.log(err)
      })
    },
    getDataOld () {
      new InitialAssessment().find('ForNewborns/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity/' + '?hidemsg=' + true).then(response => {
        console.log('new born old', response)
        this.isCreateOldNewBorn = true
      }).catch(e => {
        this.isCreateOldNewBorn = false
        if (e.status === 404) {}
      })
    },
    getDataNewBorn () {
      new InitialAssessment().find('ForNeonatalMaternityV2/A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity').then(response => {
        this.isCreateNewBorn = true
      }).catch(err => {
        this.isCreateNewBorn = false
        console.log(err)
      })
    },
    getDataWomen () {
      new InitialAssessment().find('ForNeonatalMaternityV2/GetList/' + this._VisitId).then(response => {
        this.isCreateWomen = response.Forms.length > 0
      }).catch(err => {
        console.log(err)
      })
    },
    getData () {
      new CustomersIPD().find(this.$route.params.Id).then(response => {
        this.MedicalRecordType = response.MedicalRecordType
        this.listDGBD = response.Danhgiabandau
        this.listMedicalRecord = response.MedicalRecordType
        this.HideFormNewborn = response.HideFormNewborn
        this.checkSetupBaNoi()
        this.loaded = true
      }).then(err => {
        console.log(err)
      })
    },
    checkShowTabFromCode (code) {
      if (this.listMedicalRecord && this.listMedicalRecord.filter(i => i.FormCode === code).length > 0) {
        return true
      } else {
        return false
      }
      // return this.listMedicalRecord && this.listMedicalRecord.some(i => i.FormCode === code)
    },
    checkShowTab (type) {
      if (type === 'IPDInitialAssessmentSpecial') {
        return true
      }
      // return this.listDGBD && this.listDGBD.some(i => i.Type === type)
      return this.listDGBD && this.listDGBD.some(i => i.Form === type)
    },
    checkSetupBaNoi () {
      if (this.MedicalRecordType && this.MedicalRecordType.filter(i => i.FormCode === 'A01_034_050919_V').length > 0) {
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
