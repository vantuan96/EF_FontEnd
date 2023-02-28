<template>
  <div class="main-content" id="di0-page" v-if="!nullContent">
    <div class="a4-page box" id="printMe">
      <table class="table" style="width: 100%">
        <tr>
          <td width="26%"  style="vertical-align: top; transform: translateX(-21px);" align="top">
            <p><img  style="margin-left: 21px;" class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></p>
            <p class="textUppercase font12" style="text-align: center; max-width: 160px!important;">Sở y tế/ <i>DEPARTMENT OF HEALTH</i> : {{data.LocationUnit}} {{data.Province}}</p>
            <p class="font12" style="text-align: center; max-width: 150px!important;">Bệnh viện/ <i>Hospital</i>: <span>Vinmec {{data.SiteName}}</span></p>
          </td>
          <th style="vertical-align: top;" align="top">
            <p class="text-center textUppercase font16">Cộng hòa xã hội chủ nghĩa Việt Nam</p>
            <p class="text-center textUppercase font16"><i>SOCIALIST REPUBLIC OF VIETNAM</i></p>
            <p class="text-center"><span class="text-underline">Độc lập - Tự do - Hạnh phúc</span></p>
            <p class="text-center"><span class="text-underline"><i>Independence – Freedom - Happiness</i></span></p>
          </th>
          <td width="20%" style="vertical-align: top; padding-left:20px" align="bottom">
            <p class="font12">MS/ <i>Code</i> 01/BV-01</p>
            <p class="font12" style="margin: 0;text-align: center;padding: 20px 50px;border: 1px solid #000;">PID: {{data.CustomerId}}</p>
          </td>
        </tr>
      </table>
      <h1 class="title-page font18" style="text-align: center">GIẤY CHỨNG NHẬN THƯƠNG TÍCH</h1>
      <h1 class="title-page font18" style="text-align: center"><i>INJURY CERTIFICATE</i></h1>
      <br/>
      <p><b>Giám đốc bệnh viện/ <i>Director of</i>:</b> <span class="textUppercase fs14">ĐA KHOA QUỐC TẾ VINMEC/ <i>VINMEC INTERNATIONAL GENERAL HOSPITAL</i> {{data.SiteName}} </span> Chứng nhận/ <i>certifies that</i>:</p>
      <p>- Họ và tên người bệnh/ <i>Patient’s name</i>: <span class="">{{data.CustomerName}}</span> <span class="tab404" style="font-size: 14px!important;"> Sinh ngày/ <i>Date of birth</i>: {{DOBFormart[0] ? DOBFormart[0] : ' &emsp; ' }} tháng {{DOBFormart[1] ? DOBFormart[1] : ' &emsp; '}} năm  {{DOBFormart[2] ? DOBFormart[2] : ` &emsp; `}}</span><span class="tab404 fs14" style="font-size: 14px!important">Giới tính/ <i>Gender</i>: {{data.Gender}}</span></p>
      <p>- Nghề nghiệp/ <i>Occupation</i>: {{data.MOHJob || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}} <span style="margin-left: 10px;font-size: 14px!important;">Nơi làm việc/ <i>Working place</i>: {{data.WorkPlace}}</span></p>
      <p>- Giấy CMND/Thẻ căn cước/Hộ chiếu số/ <i>Personal ID number/ Passport number</i> <small style="font-size: 12px">(2)</small>: {{data.IdCard}}</p>
      <p>Ngày cấp/ <i>Issue date</i>: {{data.IssueDate ? data.IssueDate : ` &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; `}} <span class="tab404" style="font-size: 14px!important;">Nơi cấp/ <i>Issue place</i>: {{data.IssuePlace}}</span></p>
      <p>- Địa chỉ/ <i>Address</i>: {{data.Address}}</p>
      <p v-if="data.AdmittedDate">- Vào viện lúc/ <i>Hospital Admission (Time, Date)</i>: {{data.AdmittedDate | viDisplayformatDateTime}}</p>
      <p v-else>- Vào viện lúc: &emsp; giờ &emsp;  phút, ngày &emsp; tháng &emsp; năm &emsp; </p>
      <p v-if="statusCustomer && statusCustomer.ViName !== 'Đang nằm nội trú' && statusCustomer.ViName !== 'Chuyển khoa' && statusCustomer.ViName !== 'NB chờ KQDV' && data.DischargeDate">- Ra viện lúc/ <i>Hospital Discharge (Time, Date)</i>: {{data.DischargeDate | viDisplayformatDateTime}}</p>
      <p v-else>- Ra viện lúc: &emsp; giờ &emsp; phút, ngày &emsp; tháng &emsp; năm &emsp; </p>
      <p><b>- Lý do vào viện/ <i>Chief complaint</i>:</b> {{data.PresentComplain}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>- Chẩn đoán/ <i>Diagnosis</i>:</b> {{data.Diagnosis}}</p>
      <div @dblclick="addBreakPage" class="hasBreakPage"><b>- Điều trị/ <i>Treatment</i>:</b></div>
      <p v-html="data.TreatmentProcedures"></p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>- Tình trạng thương tích lúc vào viện/ <i>Injury condition upon admission</i>:</b> <span>{{data.HospitalizedStatus ? data.HospitalizedStatus : null}}</span></p>
      <div style="padding-left: 5px;" v-if="data.Assessment">
        <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.Assessment">+ {{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</p>
      </div>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>- Tình trạng thương tích lúc ra viện/ <i>Injury condition upon discharge</i>:</b> {{data.DischargeStatus}}</p>
      <p class="vhidden" style="text-align: right; font-style: italic; margin-right:50px;">Ngày {{DOBFormart2[0] ? DOBFormart2[0] : ' &emsp; ' }} tháng {{DOBFormart2[1] ? DOBFormart2[1] : ' &emsp; ' }} năm {{DOBFormart2[2] ? DOBFormart2[2] : ' &emsp; ' }} </p>
      <table class="vhidden" style="width: 100%">
        <tr>
          <td style="width: 33%" class="text-center">
            <!-- <p class="text-center" style="font-size: 14px!important;"><b>{{__t('Giám đốc bệnh viện')}}</b></p> -->
            <p class="text-center" style="font-size: 14px!important;"><b>Giám đốc bệnh viện/ <i>Hospital director</i></b></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p class="text-center fw300" style="font-size: 14px!important;">Họ tên: {{data.DirectorTime ? data.Director.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p>
          </td>
          <td style="width: 33%" class="text-center">
            <!-- <p class="text-center" style="font-size: 14px!important;"><b>{{__t('Trưởng khoa')}}</b></p> -->
            <p class="text-center" style="font-size: 14px!important;"><b>Trưởng khoa/ <i>Head of department</i></b></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p class="text-center fw300" style="font-size: 14px!important;">Họ tên: {{data.HeadOfDeptTime ? data.HeadOfDept.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p>
          </td>
          <td style="width: 33%" class="text-center">
            <!-- <p class="text-center" style="font-size: 14px!important;"><b>{{__t('Bác sĩ điều trị')}}</b></p> -->
            <p class="text-center" style="font-size: 14px!important;"><b>Bác sĩ điều trị/ <i>Treating doctor</i></b></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p class="text-center fw300" style="font-size: 14px!important;">Họ tên: {{data.DoctorTime ? data.Doctor.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="a4-page translation-area">
      <p>- (2) Trường hợp chưa có thẻ căn cước hoặc hộ chiếu thì ghi giấy tờ tùy thân hợp lệ khác (giấy khai sinh, giấy xác nhận của công an cấp xã nơi cư trú kèm theo ảnh có đóng dấu giáp lai trên ảnh)/ <i>In case of no ID card nor passport, please write down other valid personal documents (birth certificate, certificate from residential commune-level police along with photo and affixed seal)</i> </p>
      <p>- Ghi chú/ <i>Note</i>: Giấy giới thiệu có giá trị trong vòng hai tháng kể từ ngày ký giới thiệu/ <i>Reference letter is valid within 2 months after it is signed</i></p>
    </div>
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
      <translation-request :name="'giấy chứng nhận thương tích'" :VisitId="_VisitId" :ViName="'GIẤY CHỨNG NHẬN THƯƠNG TÍCH'" :EnName="'INJURY CERTIFICATE'" />
    </div>
    <div class="a4-page code-form">A01_170_050919_VE</div>
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
    <modal :name="'view-modal'" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth" :class="'no-scroll-x'">
      <div v-if="TranItem && TranItem.Status !== 3">
        <view-item :isTranslate="true" @confirmed="confirmed" :Id="TranItem.Id" :ForDoctor="true" />
      </div>
      <div v-else>
        <InjuryCertificateView :dataParent="data" v-if="dataTranslated" :isTranView="true" :data="dataTranslated" :CheckDate="CheckDate" :viewOnly="viewOnly" :printId="'printview'"/>
        <div v-else class="loading-text"><v-loading/></div>
      </div>
    </modal>
    <div class="status-float-block" v-if="!viewOnly">
      <div class="action-btn-block">
        <div class="container box-footer-container">
          <div class="content-container">
            <div class="box-footer-container-mini">
              <div class="col-md-2 col-sm-2">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
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

import InjuryCertificate from '@/services/IPD/InjuryCertificate'
import MixinForm from '@/mixins/form.js'
import TranslationRequest from '@/components/Translation/Request.vue'
import InjuryCertificateView from './View/Index.vue'
import ViewItem from '@/components/Translation/View.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinView from '@/mixins/view.js'
import Translation from '@/services/Translation'
const MODAL_WIDTH = 870

export default {
  /**
   * The name of the page.
   */
  name: 'InjuryCertificateIndex',
  mixins: [MixinForm, MixinMasterData, MixinView],
  props: ['viewOnly', 'VisitId', 'VisitType'],
  data () {
    return {
      TranItem: null,
      dataTranslated: null,
      modalWidth: MODAL_WIDTH,
      data: {},
      popupTitle: '',
      user: {},
      nullContent: true
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
      return this.data.DateOfBirth ? this.data.DateOfBirth.split('/') : ['', '', '']
    },
    DOBFormart2: function () {
      let data = []
      if (this.statusCustomer && this.statusCustomer.ViName !== 'Đang nằm nội trú' && this.statusCustomer.ViName !== 'Chuyển khoa' && this.statusCustomer.ViName !== 'NB chờ KQDV' && this.data.DischargeDate) {
        data = this.data.DischargeDate.split(' ')[1].split('/') || ['', '', '']
      } else {
        data = ['', '', '']
      }
      return data
    },
    statusCustomer: function () {
      return this.$store.state.listInfo.statusCustomer
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
      this.$htmlToPaper3('printMe', true, 'A01_170_050919_VE')
    },
    confirm () {
      new InjuryCertificate().update('/Confirm/' + this._VisitId + '?hidemsg=' + true, this.user).then(response => {
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
      new InjuryCertificate({hidemsg: true}).find(this._VisitId).then(response => {
        this.nullContent = false
        this.data = response
      }).catch(e => {
        this.nullContent = true
      })
    }
  }
}
</script>
<style scoped>
.code-form {
  padding: 0px;
  border: none!important;
}
.box-footer-container {
  width: 900px;
  margin: 0 auto;
  padding: 0px;
}
.box-footer-container-mini {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-container {
  padding: 0px;
}
</style>
