<template>
  <div class="main-content" id="di0-page">
    <template v-if="data">
      <medical-report-view :viewOnly="viewOnly" :data="data" :CheckDate="CheckDate"/>
      <div class="a4-page no-style" v-if="data.Translations && data.Translations.length">
        {{__t('Xem các bản dịch tiếng')}} :
        <button @click="view(item)" class="btn v-white-btn btn-round" :data="item" :key="index" v-for="(item ,index) in data.Translations">
          <i class="fa fa-share-square-o" aria-hidden="true" v-if="item.Status === 0"></i>
          <i class="fa fa-commenting" aria-hidden="true" v-if="item.Status === 1"></i>
          <i class="fa fa-clock-o" aria-hidden="true" v-if="item.Status === 2"></i>
          <i class="fa fa-check green-color" aria-hidden="true" v-if="item.Status === 3"></i>
          {{__t(item.ToLanguage)}}
        </button>
      </div>
      <div class="a4-page translation-area" v-if="!viewOnly">
        <translation-request :name="'BCYT ra viện'" :VisitId="_VisitId" :ViName="'BÁO CÁO Y TẾ  RA VIỆN'" :EnName="'DISCHARGE MEDICAL REPORT'" />
      </div>
      <div class="a4-page no-style">
        <p v-if="CheckDate === 1">A01_143_050919_VE</p>
        <p v-else-if="CheckDate === 2">A01_143_120521_VE</p>
        <p v-else>A01_143_290922_VE</p>
      </div>
      <!-- <FloatBlock> -->
      <FloatBlock v-if="!viewOnly">
        <template slot='buttons'>
          <div class="col-md-4">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-8">
            <div class="form-group1">
              <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
            </div>
          </div>
        </template>
      </FloatBlock>
      <modal :name="'view-modal'" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth" :class="'no-scroll-x'">
        <div v-if="TranItem && TranItem.Status !== 3">
          <view-item :isTranslate="true" @confirmed="confirmed" :Id="TranItem.Id" :ForDoctor="true" />
        </div>
        <div v-else>
          <MedicalReportViewIndex :dataParent="data" v-if="dataTranslated" :isTranView="true" :data="dataTranslated" :CheckDate="CheckDate" :viewOnly="viewOnly" :printId="'printview'"/>
          <div v-else class="loading-text"><v-loading/></div>
        </div>
      </modal>
      <div class="a4-page no-style">
        <div class="row only-web-page">
          <br/>
          <div class="col-md-4 col-sm-4 text-center">
            <template v-if="data.PhysicianInCharge && data.PhysicianInCharge.Username">
              <p>{{data.PhysicianInChargeTime}}</p>
              <eform-signature :ad="data.PhysicianInCharge.Username" :title="'Bác sĩ/ PHYSICIAN-IN-CHARGE'" />
            </template>
            <template v-else>
              <p><b>BÁC SĨ ĐIỀU TRỊ/ </b><i>PHYSICIAN-IN-CHARGE</i></p>
              <p v-if="!viewOnly"><button @click="showDoctorConfirm('PhysicianInCharge', 'Bác sĩ/ PHYSICIAN-IN-CHARGE')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
            </template>
          </div>
          <div class="col-md-4 col-sm-4 text-center">
            <template v-if="data.DeptHead && data.DeptHead.Username">
              <p>{{data.DeptHeadTime}}</p>
              <eform-signature :ad="data.DeptHead.Username" :title="'Trưởng khoa/ DEPT HEAD'" />
            </template>
            <template v-else>
              <p><b>TRƯỞNG KHOA/ </b><i>DEPT HEAD</i></p>
              <p v-if="!viewOnly"><button @click="showDoctorConfirm('DeptHead', 'Trưởng khoa/ DEPT HEAD')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
            </template>
          </div>
          <div class="col-md-4 col-sm-4 text-center">
            <template v-if="data.Director && data.Director.Username">
              <p>{{data.DirectorTime}}</p>
              <eform-signature :ad="data.Director.Username" :title="'Giám đốc/ DIRECTOR'" />
            </template>
            <template v-else>
              <p><b>GIÁM ĐỐC/ </b><i>DIRECTOR</i></p>
              <p v-if="!viewOnly"><button @click="showDoctorConfirm('Director', 'Giám đốc/ DIRECTOR')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
            </template>
          </div>
          <br/>
          <br/>
          <br/>
        </div>
      </div>
      <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
        <div class="box v-model-content-popup">
          <div class="box-header text-center">
            <h3 class="box-title">{{popupTitle}} xác nhận</h3>
            <div style="color: #fff">{{__t('Vui lòng nhập tài khoản ad để xác nhận')}}</div>
          </div>
          <div class="form-confirm">
            <div class="form-group has-feedback">
              <input v-model="user.username" type="text" class="form-control" :placeholder="__t('Tên đăng nhập')"/>
              <span class="glyphicon glyphicon-user form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
              <input v-model="user.password" type="password" class="form-control current-password" :placeholder="__t('Mật khẩu')"/>
              <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="row">
              <div class="col-xs-6">
                <button type="button" class="btn btn-block v-white-btn" @click="$modal.hide('doctorConfirm')">{{__t('Thoát')}}</button>
              </div>
              <div class="col-xs-6">
                <button type="button" class="btn btn-block v-yellow-btn" @click="confirm()">{{__t('Xác nhận')}}</button>
              </div>
            </div>
            <p style="margin-top: 10px; text-align:center"> {{__t('Sử dụng tài khoản máy tính')}}</p>
          </div>
        </div>
      </modal>
    </template>
    <div v-else-if="!viewOnly" class="text-center">
      <h4>{{errMsg}}</h4>
      <p><button class="btn btn-back v-white-btn" type="button" @click="back()">{{__t('btn.back')}}</button></p>
    </div>
  </div>
</template>
<script>
/* ============
 * KLM Page vi sao đặt tên là KLM hỏi dungnv53
 * ============
 *
 * The home index page.
 */
import MedicalReportView from './View/Index.vue'
import MedicalReportViewIndex from './View/IndexView.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import DischargeMedicalReport from '@/services/IPD/DischargeMedicalReport'
import MixinView from '@/mixins/view.js'
import MixinForm from '@/mixins/form.js'
import TranslationRequest from '@/components/Translation/Request.vue'
import ViewItem from '@/components/Translation/View.vue'
import Translation from '@/services/Translation'
import moment from 'moment'
const MODAL_WIDTH = 870
export default {
  /**
   * The name of the page.
   */
  name: 'KLM',
  mixins: [MixinMasterData, MixinView, MixinForm],
  props: ['viewOnly', 'VisitId'],
  data () {
    return {
      data: null,
      modalWidth: MODAL_WIDTH,
      TranItem: null,
      dataTranslated: null,
      Kind: null,
      loaded: false,
      popupTitle: '',
      user: {},
      errMsg: 'Hồ sơ bệnh án chưa đầy đủ, vui lòng thực hiện trước khi sử dụng tính năng này'
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    TranslationRequest,
    ViewItem,
    MedicalReportView,
    MedicalReportViewIndex
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.getData()
  },
  computed: {
  },
  methods: {
    confirmed () {
      var id = this.TranItem.Id
      this.TranItem = null
      this.view({
        Status: 3,
        Id: id
      })
      this.getData()
    },
    view (item) {
      if (item.Status === 3) {
        new Translation().find('MedicalReport/Document/' + (item.Id)).then(response => {
          this.dataTranslated = this.mappingTranslation(response)
        })
      } else {
        this.TranItem = item
      }
      this.$modal.show('view-modal')
    },
    mappingTranslation (res) {
      var translation = res.Translation
      var objNotTran = [
        'Fullname',
        'Admission',
        'AdmittedDateFirstIpd',
        'DateOfBirth',
        'Date',
        'DeptHead',
        'DeptHeadTime',
        'Director',
        'DirectorTime',
        'Location',
        'PID',
        'PhysicianInCharge',
        'PhysicianInChargeTime',
        'Province',
        'Site',
        'Specialty',
        'Translations',
        'Discharge',
        'ICDCoMorbidities',
        'ICDDiagnosis'
      ]
      for (var key of Object.keys(res)) {
        if (!objNotTran.includes(key)) {
          if (key === 'ClinicalExaminationAndFindings') {
            if (typeof translation[key] === 'string') {
              translation[key] = this.JSONParse(translation[key]) || []
            }
            if (key === 'ClinicalExaminationAndFindings' && !!translation[key]) {
              res[key].forEach(item => {
                var tranEd = (translation[key].find(e => e.ViName === item.ViName) || {Value: ''}).Value
                item.Value = this.trim_(item.Value + (tranEd ? ('/ ' + tranEd) : ''), '/ ')
              })
            }
          } else {
            res[key] = this.trim_([res[key], '/ ', translation[key]].map(e => e).join(''), '/ ')
          }
        }
      }
      return res
    },
    print () {
      this.$htmlToPaperA01_143_120521_VE('printMe', true, 'A01_143_120521_VE', this.getHotlineEd())
      // this.$htmlToPaperKLM('printMe', true, 'A01_143_120521_VE', this.getHotlineEd())
    },
    confirm () {
      new DischargeMedicalReport().update(this._VisitId, this.user, '/Confirm/').then(response => {
        this.getData()
        this.$modal.hide('doctorConfirm')
      }).catch(e => {
        // this.back()
      })
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    getData () {
      new DischargeMedicalReport().find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.data = response
        this.$store.dispatch('setCurrentFormId', response.Id)
        if (response.Admission) {
          this.handleCheckDate(response.Admission)
        }
      })
    },
    handleCheckDate (AdmittedDate) {
      // this.CheckDate = AdmittedDate && moment(new Date(2022, 1, 16, 14, 0, 0)) > moment(AdmittedDate, 'HH:mm DD/MM/YYYY')
      if (moment(AdmittedDate, 'HH:mm DD/MM/YYYY') > moment(new Date(2022, 8, 30, 17, 0, 0))) {
        this.CheckDate = 3
      }
      if (moment(AdmittedDate, 'HH:mm DD/MM/YYYY') > moment(new Date(2022, 1, 16, 14, 0, 0)) && moment(AdmittedDate, 'HH:mm DD/MM/YYYY') <= moment(new Date(2022, 8, 30, 17, 0, 0))) {
        this.CheckDate = 2
      }
      if (moment(AdmittedDate, 'HH:mm DD/MM/YYYY') <= moment(new Date(2022, 1, 16, 14, 0, 0))) {
        this.CheckDate = 1
      }
      console.log(`AdmittedDate: ${AdmittedDate} ${moment(new Date(2022, 8, 30, 17, 0, 0))} => Version: ${this.CheckDate}`)
    }
  }
}
</script>
