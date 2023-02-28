<template>
  <div class="main-content" id="di0-page">
    <template>
      <template>
        <div class="a4-page box" :id="printId || 'printTranslate'">
          <table class="table" style="width: 100%">
            <tr>
              <td width="25%"  style="vertical-align: top;" align="top">
                <p class="textUppercase text-center font12">Sở y tế/ <i>DEPARTMENT OF HEALTH</i> {{data.Province}}</p>
                <p class="textUppercase text-center font12">BVĐKQT Vinmec/ <i>VINMEC INTERNATIONAL GENERAL HOSPITAL</i> {{data.Site}}</p>
                <p class="text-center font12">Khoa/ Department: {{(data && data.Specialty) ? data.Specialty : ''}}</p>
              </td>
              <th class="text-center" style="text-align: center;vertical-align: top;" align="top">
                <p class="text-center textUppercase font16">Cộng hòa xã hội chủ nghĩa Việt Nam</p>
                <p class="text-center textUppercase font16"><i>SOCIALIST REPUBLIC OF VIETNAM</i></p>
                <p class="text-center"><span class="text-underline">Độc lập - Tự do - Hạnh phúc</span></p>
                <p class="text-center"><span class="text-underline"><i>Independence – Freedom - Happiness</i></span></p>
              </th>
              <td width="20%" style="vertical-align: top;" align="top">
                <p class="font12">MS: 01/BV-01</p>
                <p class="font12">Số lưu trữ/ PID: {{data.PID}}</p>
                <p class="font12">Mã Y tế ......./...../.....</p>
              </td>
            </tr>
          </table>
          <h1 class="title-page" style="text-align: center;font-size: 20px">GIẤY RA VIỆN</h1>
          <h1 class="title-page" style="text-align: center;font-size: 18px;"><i>HOSPITAL DISCHARGE FORM</i></h1>
          <p><br /></p>
          <table class="table" style="width: 100%">
            <tr>
              <td width="435px" style="text-align: left" align="top">
                <p style="white-space: nowrap;"><b>Họ tên người bệnh</b>/ <i>Patient's name</i>: <span class="textUppercase no-wrap">{{data.Fullname}}</span></p>
              </td>
              <td class="text-left" style="text-align: left; padding: 0 5px;" align="top">
                <p style="white-space: nowrap;"><b>Tuổi</b>/ <i>Age</i>: {{dataParent.AgeFormated | formatAgeWithMultiLang}}</p>
              </td>
              <td class="text-left" style="text-align: left" align="top">
                <p style="white-space: nowrap;"><b>Giới tính</b>/ <i>Gender</i>: {{data.Gender}}</p>
              </td>
            </tr>
            <tr>
              <td width="435px" style="text-align: left" align="top">
                <p><b>Dân tộc</b>/ <i>Ethnic</i>: {{data.Ethnic}}</p>
              </td>
              <td colspan="2" class="text-left" style="text-align: left; padding: 0 5px;" align="top">
                <p><b>Nghề nghiệp</b>/ <i>Occupation</i>: {{data.MOHJob}}</p>
              </td>
            </tr>
          </table>
          <p>
            <b>Mã số BHXH/Thẻ BHYT số</b>/ <i>HI no.</i>: {{dataParent.HealthInsuranceNumber ? dataParent.HealthInsuranceNumber : data.HealthInsuranceNumber}}
          </p>
          <p>
            <b>Địa chỉ</b>/ <i>Address</i>: {{data.Address}}
          </p>
          <p v-if="Version === 2">
            <b>Vào viện lúc</b>/ <i>Hospital Admission (Time, Date)</i>: {{data.Admission}}
          </p>
          <p v-else>
            <b>Vào viện lúc</b>/ <i>Adminssion at (Time, Date)</i>: {{data.Admission}}
          </p>
          <p v-if="Version === 2">
            <b>Vào khoa nội trú lúc</b>/ <i>Inpatient Admission (Time, Date)</i>: {{data.AdmittedDateFirstIpd}}
          </p>
          <p v-if="Version === 2">
            <b>Ra viện lúc</b>/ <i>Hospital Discharge (Time, Date)</i>: {{data.Discharge}}
          </p>
          <p v-else>
            <b>Ra viện lúc</b>/ <i>Discharge at (Time, Date)</i>: {{data.Discharge}}
          </p>
          <p>
            <b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{data.Diagnosis}}
          </p>
          <div>
            <b>Phương pháp điều trị</b>/ <i>Treatment method</i>:
          </div>
          <div v-if="(data.TreatmentsAndProcedures).toString().includes('/')">
            <p v-html="data.TreatmentsAndProcedures" :style="data.DrugsUsed ? 'margin-bottom: 0px!important;' : ''"></p>
          </div>
          <div v-else>
            <p v-if="dataParent && dataParent.TreatmentAndProcedures" v-html="dataParent.TreatmentAndProcedures"></p>
            <div style="display: flex;">
              <span style="margin-right: 5px;">/ </span>
              <p v-html="data.TreatmentsAndProcedures" :style="data.DrugsUsed ? 'margin-bottom: 0px!important;' : ''"></p>
            </div>
          </div>
          <p>
            <b>Ghi chú</b>/ <i>Note</i>: {{'\n'}}{{data.DoctorRecommendations}}
          </p>
          <p><br /></p>
          <!-- <table class="table hidden-only-form" style="width: 100%"> -->
          <table class="table" style="width: 100%">
            <tr v-if="false">
              <td width="50%">
                <p v-if="Director && Director.ConfirmAt" class="text-center" style="text-align: center">Ngày<i>/ date</i> {{getConfirmDate(Director.ConfirmAt).day || '&emsp;&emsp;'}} tháng<i>/ month</i> {{getConfirmDate(Director.ConfirmAt).month || '&emsp;&emsp;'}} năm<i>/ year</i> {{getConfirmDate(Director.ConfirmAt).year || '&emsp;&emsp;'}}</p>
                <p v-else class="text-center" style="text-align: center">Ngày<i>/ date</i> {{'&emsp;&emsp;'}} tháng<i>/ month</i> {{'&emsp;&emsp;'}} năm<i>/ year</i> {{'&emsp;&emsp;'}}</p>
              </td>
              <td>
                <p v-if="DeptHead && DeptHead.ConfirmAt" class="text-center" style="text-align: center">Ngày<i>/ date</i> {{getConfirmDate(DeptHead.ConfirmAt).day || '&emsp;&emsp;'}} tháng<i>/ month</i> {{getConfirmDate(DeptHead.ConfirmAt).month || '&emsp;&emsp;'}} năm<i>/ year</i> {{getConfirmDate(DeptHead.ConfirmAt).year || '&emsp;&emsp;'}}</p>
                <p v-else class="text-center" style="text-align: center">Ngày<i>/ date</i> {{'&emsp;&emsp;'}} tháng<i>/ month</i> {{'&emsp;&emsp;'}} năm<i>/ year</i> {{'&emsp;&emsp;'}}</p>
              </td>
            </tr>
            <tr v-else>
              <td width="50%">
                <p class="text-center" style="text-align: center">Ngày<i>/ date</i> {{DateCreated[0] || '&emsp;&emsp;'}} tháng<i>/ month</i> {{DateCreated[1] || '&emsp;&emsp;'}} năm<i>/ year</i> {{DateCreated[2] || '&emsp;&emsp;'}}</p>
              </td>
              <td>
                <p class="text-center" style="text-align: center">Ngày<i>/ date</i> {{DateCreated[0] || '&emsp;&emsp;'}} tháng<i>/ month</i> {{DateCreated[1] || '&emsp;&emsp;'}} năm<i>/ year</i> {{DateCreated[2] || '&emsp;&emsp;'}}</p>
              </td>
            </tr>
            <tr>
              <td width="50%" class="text-center" style="text-align: center"><b>Thủ trưởng đơn vị</b>/ <i>Head of Unit</i><div style="text-align: center"><i>(Ký tên đóng dấu/ Sign and seal)</i></div></td>
              <td class="text-center" style="text-align: center;vertical-align: top;" align="top"><b>Trưởng khoa</b>/ <i>Dept Head</i></td>
            </tr>
            <tr>
              <th v-if="!DeptHead" width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
              <th v-if="!Director" class="text-center" style="text-align: center"><p><br /></p></th>
            </tr>
            <tr v-if="Version === 2 && !viewOnly">
              <th width="50%" class="text-center" style="text-align: center">
                <p v-if="!Director"></p>
                <p v-else><br/><br/></p>
              </th>
              <th class="text-center" style="text-align: center">
                <p v-if="!DeptHead"></p>
                <p v-else><br/><br/></p>
              </th>
            </tr>
            <tr v-else>
              <th width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
              <th class="text-center" style="text-align: center"><p><br /></p></th>
            </tr>
            <tr>
              <th width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
              <th class="text-center" style="text-align: center"><p><br /></p></th>
            </tr>
            <tr>
              <td v-if="Director && Director.ConfirmBy" width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>: {{Director.FullName}}</td>
              <td v-else width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>:.............................</td>
              <td v-if="DeptHead && DeptHead.ConfirmBy" width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>: {{DeptHead.FullName}}</td>
              <td v-else width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>:.............................</td>
            </tr>
          </table>
        </div>
        <div v-if="isTranView && !viewOnly" class="print-area">
          <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
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
    </template>
  </div>
</template>
<script>
/* ============
 * KLM Page vi sao đặt tên là KLM hỏi dungnv53
 * ============
 *
 * The home index page.
 */
export default {
  /**
   * The name of the page.
   */
  name: 'NPQ',
  mixins: [],
  props: ['printId', 'viewOnly', 'VisitId', 'isTranView', 'Director', 'DeptHead', 'data', 'Version', 'dataParent'],
  data () {
    return {
      // Version: null,
      popupTitle: '',
      user: {}
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
  },
  computed: {
    DateCreated: function () {
      return this.dataParent.Date ? this.dataParent.Date.split('/') : ['', '', '']
    },
    getFormCode () {
      return this.Version === 1 ? 'A01_146_050920_V' : 'A01_146_290922_V'
    }
  },
  methods: {
    print () {
      this.$htmlToPaper(this.printId || 'printTranslate', false, this.getFormCode)
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    DiagnosisFormated () {
      let str = ''
      let str2 = ''
      if (this.data) {
        if (this.data.Diagnosis) {
          str += this.data.Diagnosis
        }
        if (this.data.DiagnosisOption) {
          if (str) {
            str += ', '
          }
          str += this.data.DiagnosisOption
        }
        if (this.data.ICDDiagnosis && this.data.ICDDiagnosis !== 'null' && this.JSONParse(this.data.ICDDiagnosis).length) {
          str2 += this.JSONParse(this.data.ICDDiagnosis).map(e => e.code).join(', ')
        }
        if (this.data.ICDOption && this.data.ICDOption !== 'null' && this.JSONParse(this.data.ICDOption).length) {
          if (str2) {
            str2 += ', '
          }
          str2 += this.JSONParse(this.data.ICDOption).map(e => e.code).join(', ')
        }
        if (str2) {
          str += ' (' + str2 + ')'
        }
      }
      return str
      // var icd = this.getICD10s(this.data.ICDDiagnosis, this.data.ICDOption)
      // return [this.data.Diagnosis, this.data.DiagnosisOption, icd ? `(${icd})` : null].filter(e => e).join(', ')
    }
  }
}
</script>
