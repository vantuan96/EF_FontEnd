<template>
  <div
    v-if="loaded"
    id="HospitalDischargeTable-Page"
    class="main-content disable_ccp hospital_dischargeTable"
  >
    <!-- dua phieu GDSK cho NB -->
    <div v-if="$route.name === 'IpdHospitalDischargeTable'">
      <div :key="index" v-for="(form, index) in Forms" class="mb-10">
        <div v-if="form.Datas">
          <component
            v-if="form.Type in $options.components"
            :Form="form"
            v-bind:is="form.Type"
            :VisitId="VisitId"
            :pkFormat="true"
          />
        </div>
      </div>
    </div>
    <h2 class="text-center cap mrb30 fw600">
      {{ __t("HospitalDischargeTable.bigTitle") }}
    </h2>
    <div class="content-body">
      <PageDoctor
        :condition="condition"
        :isNull="isNullDocter"
        @reloadIsNull="reloadIsNullDocter"
        :viewOnly="viewOnly"
        :viewOnly2="viewOnlyDoctor"
        :VisitId="VisitId"
        :VisitVersion="VisitVersion"
      />
      <PageNurse
        :condition="condition"
        :isNull="isNullNurse"
        @reloadIsNull="reloadIsNullNurse"
        @reloadTimeUpdate="reloadTimeUpdate"
        :viewOnly="viewOnly"
        :viewOnly2="viewOnlyNurse"
        :visitStatus="visitStatus"
        :VisitId="VisitId"
        :VisitVersion="VisitVersion"
      />
    </div>
    <div>
      <!-- Check form code -->
      <p v-if="VisitVersion >= 12">A03_046_261222_VE</p>
      <p v-else>A03_046_050919_VE</p>
      <!-- Log time -->
      <div v-if="!isNullDocter && condition === 'Doctor' && LastUpdateDoctor.UpdatedAt">
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="LastUpdateDoctor.UpdatedBy" /> {{__t('lúc')}} {{LastUpdateDoctor.UpdatedAt | formatDateWithoutSecon}}</p>
      </div>
      <div v-if="!isNullNurse && condition === 'Nurse' && LastUpdateNurse.UpdatedAt">
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="LastUpdateNurse.UpdatedBy" /> {{__t('lúc')}} {{LastUpdateNurse.UpdatedAt | formatDateWithoutSecon}}</p>
      </div>
    </div>
  </div>
  <div v-else class="loading-text"><v-loading/></div>
</template>
<script>
import EIOService from '@/services/IPD/EIOService'
import $ from 'jquery'
import storage from '@/lib/storage'
import PageDoctor from './PageDoctor.vue'
import PageNurse from './PageNurse.vue'
import IPDDischargePreparationChecklist from '@/services/IPD/HospitalDischargeTable/GetProfileDoctor'
import IPDDischargePreparationChecklistNurse from '@/services/IPD/HospitalDischargeTable/GetProfileNurse'
import MedicalRecord from '@/services/MedicalRecord.js'
import PFEF from '@/pages/PatientAndFamilyEducation/View.vue'

export default {
  name: 'HospitalDischargeTable',
  props: ['VisitId', 'VisitType', 'viewOnly'],
  data () {
    return {
      isNullDocter: true,
      isNullNurse: true,
      LastUpdateDoctor: {},
      LastUpdateNurse: {},
      visitStatus: '',
      viewOnlyDoctor: false,
      viewOnlyNurse: false,
      Forms: [],
      VisitVersion: null,
      loaded: false
    }
  },
  mixins: [],
  components: {
    PageDoctor, PageNurse, PFEF
  },
  computed: {
    condition () {
      let name = ''
      if (this.$store.state.account.Position.includes('Nurse')) {
        name = 'Nurse'
      }
      if (this.$store.state.account.Position.includes('Doctor')) {
        name = 'Doctor'
      }
      return name
    }
  },
  async mounted () {
    $('.disable_ccp' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
    await this.getVisitVersion()
    await new MedicalRecord().find('IPD/' + this._VisitId).then(response => {
      this.Forms = response
    })
    this.getDataDocter()
  },
  methods: {
    getVisitVersion () {
      new EIOService().find('EMRForm/GetVersionByVisit/' + this._VisitId + '/' + this._VisitType).then(response => {
        this.VisitVersion = response.Version
      }).catch((e) => {
        console.log(e)
      })
    },
    getDataDocter () {
      new IPDDischargePreparationChecklist().hideErrorMsg()
        .find(this._VisitId)
        .then((res) => {
          if (res) {
            this.viewOnlyDoctor = res.IsLocked
            this.LastUpdateDoctor = res.LastUpdate
          }
          this.isNullDocter = false
        }).catch(e => {
          if (e.status === 404) {
            this.isNullDocter = true
          }
        })
      new IPDDischargePreparationChecklistNurse().hideErrorMsg()
        .find(this._VisitId)
        .then((res) => {
          if (res) {
            this.visitStatus = res.VisitStatus.EnName
            this.viewOnlyNurse = res.IsLocked
            this.LastUpdateNurse = res.LastUpdate
          }
          this.isNullNurse = false
        }).catch(e => {
          if (e.status === 404) {
            this.isNullNurse = true
          }
        })
      this.loaded = true
    },
    reloadIsNullDocter () {
      this.isNullDocter = false
    },
    reloadIsNullNurse () {
      this.isNullNurse = false
    },
    reloadTimeUpdate () {
      this.getDataDocter()
    }
  }
}
</script>
