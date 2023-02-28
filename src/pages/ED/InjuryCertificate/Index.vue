<template>
  <div class="main-content" id="di0-page" v-if="!nullContent">
    <div class="a4-page box" id="printMe">
      <table class="table" style="width: 100%">
        <tr>
          <td width="26%"  style="vertical-align: top;" align="top">
            <p><img style="margin-left: 21px" class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></p>
            <p class="textUppercase font12" style="text-align: center; max-width: 164px!important;">Sở y tế/ <i>DEPARTMENT OF HEALTH</i>  {{data.LocationUnit}} {{data.Province}}</p>
            <p class="font12" style="text-align: center; max-width: 170px!important;">Bệnh viện/ <i>Hospital</i>: <span class="textUppercase">Vinmec {{data.Site}}</span></p>
          </td>
          <th class="text-center" style="text-align: center;vertical-align: top;" align="top">
            <p class="text-center textUppercase font16">Cộng hòa xã hội chủ nghĩa Việt Nam</p>
            <p class="text-center textUppercase font16"><i>SOCIALIST REPUBLIC OF VIETNAM</i></p>
            <p class="text-center"><span class="text-underline">Độc lập - Tự do - Hạnh phúc</span></p>
            <p class="text-center"><span class="text-underline"><i>Independence – Freedom - Happiness</i></span></p>
          </th>
          <td width="20%" style="vertical-align: top;" align="bottom">
            <p class="font12">MS/ <i>Code </i>: 01/BV-01</p>
            <p class="font12" style="margin: 0;text-align: center;padding: 20px 50px;border: 1px solid #000;">PID: {{data.PID}}</p>
          </td>
        </tr>
      </table>
      <h1 class="title-page font18" style="text-align: center">GIẤY CHỨNG NHẬN THƯƠNG TÍCH</h1>
      <h1 class="title-page font18" style="text-align: center"><i>INJURY CERTIFICATE</i></h1>
      <br/>
      <p><b>Giám đốc bệnh viện/ <i>Director of</i>:</b> <span class="textUppercase">ĐA KHOA QUỐC TẾ VINMEC/ <i>VINMEC INTERNATIONAL GENERAL HOSPITAL</i> {{data.Site}} </span> Chứng nhận/ <i>certifies that</i>:</p>
      <p>- Họ và tên người bệnh/ <i>Patient’s name</i>:<span class="">{{data.Name}}</span> <span class="tab404"> Sinh ngày/ <i>Date of birth</i> {{DOBFormart[0]}} tháng {{DOBFormart[1]}} năm  {{DOBFormart[2]}}</span><span class="tab404">Giới tính/ <i>Gender</i>: {{data.Gender}}</span></p>
      <p>- Nghề nghiệp/ <i>Occupation</i>: {{data.Job || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}} <span class="tab404">Nơi làm việc/ <i>Working place</i>:  {{data.WorkPlace || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '}}</span></p>
      <p>- Giấy CMND/Thẻ căn cước/Hộ chiếu số/ <i>Personal ID number/ Passport number</i> <small style="font-size: 10px">(2)</small>: {{data.IdentificationCard || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
      <p>Ngày cấp/ <i>Issue date</i>: {{data.IssueDate || '. . . . . . . . . . . . . . . . .'}} <span class="tab404">Nơi cấp/ <i>Issue place</i>: {{data.IssuePlace || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</span></p>
      <p>- Địa chỉ/ <i>Address</i>: {{data.Address || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
      <p>- Vào viện lúc/ <i>Hospital Admission (Time, Date)</i>: {{data.AdmittedDate | formatDateWithoutSecon}}</p>
      <p v-if="data.DischargeDate">- Ra viện lúc/ <i>Hospital Discharge (Time, Date)</i>: {{data.DischargeDate | formatDateWithoutSecon}}</p>
      <p v-else>- Ra viện lúc: . . . . .  giờ . . . . .  phút, ngày . . . . .  tháng . . . . .  năm . . . . . . . . . . </p>
      <p><b>- Lý do vào viện/ <i>Chief complaint</i>:</b> {{data.ChiefComplain || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>- Chẩn đoán/ <i>Diagnosis</i>:</b> {{ getChuanDoan($store.state.account.CurrentPatientObj) }}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>- Điều trị/ <i>Treatment</i>:</b> <span v-html="data.TreatmentProcedures ||  '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'"></span></p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>- Tình trạng thương tích lúc vào viện/ <i>Injury condition upon admission</i>:</b> {{data.Assessment ? '' : ' . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
      <div style="padding-left: 5px;" v-if="data.Assessment">
        <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.Assessment">+ {{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</p>
      </div>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>- Tình trạng thương tích lúc ra viện/ <i>Injury condition upon discharge:</i>:</b> {{data.CurrentStatus ||  ' . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
      <p class="vhidden" style="text-align: right" v-if="data.DischargeDate">{{data.DischargeDate | bilingualFormatDateTimeNoEng}}</p>
      <p class="vhidden" style="text-align: right" v-else>Ngày ........ tháng ......... năm ..............</p>
      <table  class="vhidden" style="width: 100%">
        <tr>
          <th style="width: 33%" class="text-center">
            <!-- <p class="text-center"><b>{{__t('Giám đốc bệnh viện')}}</b></p> -->
            <p class="text-center"><b>Giám đốc bệnh viện <i>Hospital director</i></b></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p class="text-center" v-if="data.Director.Fullname">{{data.Director.Fullname}}</p>
            <p class="text-center" v-else>Họ tên:............................</p>
          </th>
          <th style="width: 33%" class="text-center">
            <!-- <p class="text-center"><b>{{__t('Trưởng khoa')}}</b></p> -->
            <p class="text-center"><b>Trưởng khoa/ <i>Head of department</i></b></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p class="text-center" v-if="data.HeadOfDept.Fullname">{{data.HeadOfDept.Fullname}}</p>
            <p class="text-center" v-else>Họ tên:............................</p>
          </th>
          <th style="width: 33%" class="text-center">
            <!-- <p class="text-center"><b>{{__t('Bác sĩ điều trị')}}</b></p> -->
            <p class="text-center"><b>Bác sĩ điều trị/ <i>Treating doctor</i></b></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p class="text-center" v-if="data.Doctor.Fullname">{{data.Doctor.Fullname}}</p>
            <p class="text-center" v-else>Họ tên:............................</p>
          </th>
        </tr>
      </table>
    </div>
    <div class="a4-page translation-area">
      <p>- (2) Trường hợp chưa có thẻ căn cước hoặc hộ chiếu thì ghi giấy tờ tùy thân hợp lệ khác (giấy khai sinh, giấy xác nhận của công an cấp xã nơi cư trú kèm theo ảnh có đóng dấu giáp lai trên ảnh)/ <i>In case of no ID card nor passport, please write down other valid personal documents (birth certificate, certificate from residential commune-level police along with photo and affixed seal)</i> </p>
      <p>- Ghi chú/ <i>Note</i>: Giấy giới thiệu có giá trị trong vòng hai tháng kể từ ngày ký giới thiệu/ <i>Reference letter is valid within 2 months after it is signed</i></p>
    </div>
    <div class="a4-page no-style" v-if="data.Translations && data.Translations.length && !viewOnly">
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
      <translation-request :name="'giấy chứng nhận thương tích'" :VisitId="VisitId" :ViName="'GIẤY CHỨNG NHẬN THƯƠNG TÍCH'" :EnName="'INJURY CERTIFICATE'" />
    </div>
    <modal :name="'view-modal'" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth" :class="'no-scroll-x'">
      <div v-if="TranItem && TranItem.Status !== 3">
        <view-item :isTranslate="true" @confirmed="confirmed" :Id="TranItem.Id" :ForDoctor="true" />
      </div>
      <div v-else>
        <InjuryCertificateView :dataParent="data" :isTranView="true" :data="dataTranslated" v-if="dataTranslated" :printId="'printview'"/>
        <div v-else class="loading-text"><v-loading/></div>
      </div>
    </modal>
    <div class="a4-page no-style">
      <p>A01_170_050919_V</p>
    </div>
    <div class="a4-page no-style">
      <table style="width: 100%">
        <tr>
          <th style="width: 33%" class="text-center">
            <div v-if="data.DirectorTime">{{data.DirectorTime}}</div>
            <!-- <p><b>{{__t('Giám đốc bệnh viện')}}</b></p> -->
            <p><b>Giám đốc bệnh viện/ <i>Hospital director</i></b></p>
            <div  v-if="data.DirectorTime"><ad-Info :ad="data.Director.Username" /></div>
            <div v-else-if="!viewOnly"><button @click="showDoctorConfirm('Director', 'Giám đốc bệnh viện')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div>
          </th>
          <th style="width: 33%" class="text-center">
            <div v-if="data.HeadOfDeptTime">{{data.HeadOfDeptTime}}</div>
            <!-- <p><b>{{__t('Trưởng khoa')}}</b></p> -->
            <p><b>Trưởng khoa/ <i>Head of department</i></b></p>
            <div  v-if="data.HeadOfDeptTime"><ad-Info :ad="data.HeadOfDept.Username" /></div>
            <div v-else-if="!viewOnly"><button @click="showDoctorConfirm('HeadOfDept', 'Trưởng khoa')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div>
          </th>
          <th style="width: 33%" class="text-center">
            <div v-if="data.DoctorTime">{{data.DoctorTime}}</div>
            <!-- <p><b>{{__t('Bác sĩ điều trị')}}</b></p> -->
            <p><b>Bác sĩ điều trị/ <i>Treating doctor</i></b></p>
            <div  v-if="data.DoctorTime"><ad-Info :ad="data.Doctor.Username" /></div>
            <div v-else-if="!viewOnly"><button @click="showDoctorConfirm('Doctor', 'Bác sĩ điều trị')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div>
          </th>
        </tr>
      </table>
    </div>
    <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t(popupTitle)}}.</h3>
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
          <p style="margin-top: 10px; text-align:center">{{__t('Sử dụng tài khoản máy tính')}}</p>
          <p style="margin-top: 10px; text-align:center">{{__t('Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu')}}</p>
        </div>
      </div>
    </modal>
    <div class="status-float-block" v-if="!viewOnly">
      <div class="action-btn-block">
        <div class="container">
          <div class="content-container">
            <div class="row">
              <div class="col-md-2 col-sm-2">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group1">
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
                <div class="form-group1">
                  <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"  v-shortkey="['ctrl', 'p']" @shortkey="print()" type="button" @click="print()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('In ngay')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center">
    <h1 class="title-page mrt30 mrb30" style="text-align: center">GIẤY CHỨNG NHẬN THƯƠNG TÍCH</h1>
    <h1 class="title-page mrt30 mrb30" style="text-align: center">INJURY CERTIFICATE</h1>
    <h4>{{__t('Bệnh nhân không có xác nhận thương tích')}}</h4>
    <p><button class="btn btn-back v-white-btn" type="button" @click="back()">{{__t('btn.back')}}</button></p>
  </div>
</template>
<script>
/* ============
 * The home index page.
 */

import InjuryCertificate from '@/services/ED/InjuryCertificate'
import MixinForm from '@/mixins/form.js'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinView from '@/mixins/view.js'
import TranslationRequest from '@/components/Translation/Request.vue'
import ViewItem from '@/components/Translation/View.vue'
import Translation from '@/services/Translation'
import InjuryCertificateView from './View/Index.vue'
const MODAL_WIDTH = 870
export default {
  /**
   * The name of the page.
   */
  name: 'InjuryCertificateIndex',
  props: ['viewOnly', 'VisitId'],
  mixins: [MixinForm, MixinMasterData, MixinView],
  data () {
    return {
      data: {},
      popupTitle: '',
      user: {},
      nullContent: true,
      modalWidth: MODAL_WIDTH,
      TranItem: null,
      dataTranslated: null
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    TranslationRequest,
    ViewItem,
    InjuryCertificateView
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.getData()
  },
  computed: {
    DOBFormart: function () {
      return this.data.DOB ? this.data.DOB.split('/') : ['.....', '.....', '.....']
    }
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
        'DateOfBirth',
        'Date',
        'ICD',
        'Location',
        'AdmittedDate',
        'DischargeDate',
        'PID',
        'ICDOption',
        'Site',
        'Province'
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
      this.$htmlToPaper2('printMe', true, 'A01_170_050919_VE')
    },
    confirm () {
      new InjuryCertificate().update('Confirm/' + this._VisitId, this.user).then(response => {
        this.toastedSuccess(this.$t('Xác nhận thành công')).getData()
        this.$modal.hide('doctorConfirm')
        this.reload()
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
      new InjuryCertificate().find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.nullContent = false
        this.data = response
      }).catch(e => {
        this.nullContent = true
      })
    }
  }
}
</script>
