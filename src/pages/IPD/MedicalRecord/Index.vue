<template>
  <div class="main-content disable_ccp_page_dex" id="InitialAssessment-page">
    <div v-if="data">
      <div v-if="data.IsLocked">
        <ViewOnly :routeType="routeType" :Version="data.Version"/>
      </div>
      <template v-else>
        <div :key="index" v-for="(form, index) in Forms" class="mb-10">
          <div v-if="form.Datas">
            <component v-if="form.Type in $options.components" :pkFormat="true" :Form="form" v-bind:is="form.Type" :VisitId="_VisitId"/>
          </div>
        </div>
        <h1 class="text-center form-title">{{getBigLabel()}}</h1>
        <div v-if="routeType === 'Oncology' && DataProp && DataProp.MedicalRecordOncologyOld && DataProp.MedicalRecordOncologyOld.VisitId && showSelect" class="text-center flex align-center space-center">
          <div class="btn btn-flat v-yellow-btn mrr20" @click="openPopupFillDataBa">Tiếp tục bệnh án</div>
          <div class="btn btn-flat btn-create" style="border: 1px solid #c4c0c0;" @click="showSelect = false">Tạo mới bệnh án</div>
        </div>
        <div v-else class="v-tab">
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" :class="activeClass(`IPD${getNameType()}Part1`)">
              <router-link :to="{name: `IPD${getNameType()}Part1`, params: { Id: this._VisitId }}">
                {{__t('Hành chính')}}
              </router-link>
            </li>
            <li role="presentation" :class="activeClass(`IPD${getNameType()}Part2`)">
              <router-link :to="{name: `IPD${getNameType()}Part2`, params: { Id: this._VisitId }}">
                {{__t('Bệnh án')}}
              </router-link>
            </li>
            <li role="presentation" :class="activeClass(`IPD${getNameType()}Part3`)">
              <router-link :to="{name: `IPD${getNameType()}Part3`, params: { Id: this._VisitId }}">
                <span>{{__t('Tổng kết bệnh án')}}</span>
              </router-link>
            </li>
            <li role="presentation" :class="activeClass(`IPD${getNameType()}Print`)">
              <router-link :to="{name: `IPD${getNameType()}Print`, params: { Id: this._VisitId }}">
                {{__t('Bản in')}}
              </router-link>
            </li>
            <li role="presentation" v-if="getNameType() === 'CardiovascularForm' && Version >= 2 && IsShowTab4" :class="activeClass(`IPDCardiovascularFormPart4`)">
              <router-link :to="{name: `IPDCardiovascularFormPart4`, params: { Id: this._VisitId }}">
                {{__t('Đánh giá nguy cơ người bệnh')}}
              </router-link>
            </li>
            <li role="presentation" v-if="getNameType() === 'MedicalRecord' && Version >= 2 && IsShowTab4" :class="activeClass(`PreProcedureRiskAssessmentForCardiacCatheterization`)">
              <router-link :to="{name: `PreProcedureRiskAssessmentForCardiacCatheterization`, params: { Id: this._VisitId }}">
                {{__t('Đánh giá nguy cơ người bệnh')}}
              </router-link>
            </li>
          </ul>
          <div class="tab-content">
            <transition name="page" mode="out-in">
              <router-view/>
            </transition>
          </div>
        </div>
      </template>
      <get-data-ba @popupSave="popupSave" :routeType="routeType" :DataProp="DataProp"/>
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
import MedicalRecord from '@/services/MedicalRecord.js'
import MedicalRecordIpd from '@/services/IPD/MedicalRecord'
import MedicalRecordMixinForm from './Mixin.js'
import $ from 'jquery'
import storage from '@/lib/storage'
// eslint-disable-next-line const/no-duplicates
const InitialAssessmentForAudult = () => import(/* webpackChunkName: "InitialAssessmentForAudult" */ '@/pages/IPD/InitialAssessment/ForAdultView.vue')
const InitialAssessmentForFrailElderly = () => import(/* webpackChunkName: "InitialAssessmentForFrailElderly" */ '@/pages/IPD/InitialAssessment/ForFrailElderlyView.vue')
const InitialAssessmentForChemotherapy = () => import(/* webpackChunkName: "InitialAssessmentForChemotherapy" */ '@/pages/IPD/InitialAssessment/ForChemotherapyView.vue')
// eslint-disable-next-line const/no-duplicates
const InitialAssessmentForPediatricInPatient = () => import(/* webpackChunkName: "InitialAssessmentForPediatricInPatient" */ '@/pages/IPD/InitialAssessment/ForAdultView.vue')
const InitialAssessmentForNeonatal = () => import(/* webpackChunkName: "InitialAssessmentForNeonatal" */ '@/pages/IPD/InitialAssessment/ForNewBornView.vue')
const InitialAssessmentForNeonatalMaternity = () => import(/* webpackChunkName: "InitialAssessmentForNeonatalMaternity" */ '@/pages/IPD/InitialAssessment/ForNeonatalMaternity/NeonatalMaternityView.vue')
const InitialAssessmentForPregnantWomen = () => import(/* webpackChunkName: "InitialAssessmentForPregnantWomen" */ '@/pages/IPD/InitialAssessment/ForWomenInLabourView.vue')
// eslint-disable-next-line const/no-duplicates
const ThrombosisRiskFactorAssessmentFor = () => import(/* webpackChunkName: "ThrombosisRiskFactorAssessmentFor" */ '@/pages/IPD/ThrombosisRiskFactorAssessmentForGeneralSurgeryPatients/View.vue')
const MonitoringSheetForPatientsWith = () => import(/* webpackChunkName: "MonitoringSheetForPatientsWith" */ '@/pages/IPD/MonitorSheetForPatient/View.vue')
const CoronaryIntervention = () => import(/* webpackChunkName: "CoronaryIntervention" */ '@/pages/IPD/CoronaryIntervention/View.vue')
const PlanOfCare = () => import(/* webpackChunkName: "PlanOfCare" */ '@/pages/IPD/PlanOfCare/View.vue')
const ViewOnly = () => import(/* webpackChunkName: "ViewOnly" */ './View/Index.vue')
const getDataBa = () => import(/* webpackChunkName: "getDataBa" */ '@/pages/IPD/MedicalRecord/popup/PopupGetDataBA.vue')
// const MixinForm = () => import(/* webpackChunkName: "MedicalRecord" */ '@/mixins/form.js'
export default {
  /**
   * The name of the page.
   */
  name: 'IPDMedicalRecord',
  mixins: [MedicalRecordMixinForm],
  // mixins: [MixinForm],
  data () {
    return {
      Forms: [],
      data: null,
      showSelect: true,
      DataProp: null,
      Version: 0,
      IsShowTab4: false
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    InitialAssessmentForAudult,
    InitialAssessmentForFrailElderly,
    InitialAssessmentForChemotherapy,
    InitialAssessmentForPediatricInPatient,
    InitialAssessmentForNeonatal,
    InitialAssessmentForNeonatalMaternity,
    InitialAssessmentForPregnantWomen,
    MonitoringSheetForPatientsWith,
    ThrombosisRiskFactorAssessmentFor,
    PlanOfCare,
    CoronaryIntervention,
    ViewOnly,
    getDataBa
  },
  mounted () {
    $('.disable_ccp_page_dex' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
    new MedicalRecord().find('IPD/' + this._VisitId).then(response => {
      this.Forms = response
    })
    new MedicalRecordIpd().find('Info/' + this.MedicalRecordFormCode + '/' + this._VisitId).then(response => {
      this.data = response
      this.Version = response.Version
      this.IsShowTab4 = response.IsTab4
      if (this.routeType === 'Oncology' && response.MedicalRecordOncologyOld) {
        this.DataProp = response
      }
    })

    console.log(this.getNameType())
    console.log(this.Version)
  },
  computed: {
    routeType () {
      return this.$route.meta.type || ''
    }
  },
  methods: {
    activeClass (link) {
      if (typeof link === 'string') return link === this.$route.name ? 'active' : ''
      return link.includes(this.$route.name) ? 'active' : ''
    },
    getBigLabel () {
      return this.__t('BỆNH ÁN ' + this.MedicalRecordFormName)
    },
    openPopupFillDataBa () {
      this.$modal.show('getDataBa')
    },
    popupSave (idDrop) {
      if (idDrop) {
        const obj = {
          VisitID: idDrop
        }
        new MedicalRecordIpd().update('SyncMedicalRecordOncology/' + 'A01_196_050919_V' + '/' + this._VisitId, obj).then(res => {
          console.log('res: ', res)
          this.reload()
        })
      }
    }
  }
}
</script>
<style scoped>
.btn-create:hover {
  background: #c4c0c0;
}
</style>
