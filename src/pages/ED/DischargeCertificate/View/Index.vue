<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" :id="printId || 'printTranslate'">
      <table class="table" style="width: 100%">
        <tr>
          <td width="25%"  style="vertical-align: top;" align="top">
            <p class="textUppercase text-center font12">Sở y tế/ <i>DEPARTMENT OF HEALTH</i> {{data.Province}}</p>
            <p class="textUppercase text-center font12">BVĐKQT Vinmec/ <i>VINMEC INTERNATIONAL GENERAL HOSPITAL</i> {{data.Site}}</p>
            <p class="text-center font12">Khoa/ <i>Department</i>: {{(dataParent && dataParent.Specialty) ? dataParent.Specialty : ''}}</p>
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
      <h1 class="title-page" style="text-align: center">GIẤY RA VIỆN</h1>
      <h1 class="text-center" style="text-align: center;font-size: 14px;"><i>HOSPITAL DISCHARGE FORM</i></h1>
      <p><br /></p>
      <table class="table" style="width: 100%">
        <tr>
          <td width="410px" style="text-align: left" align="top">
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
          <td width="410px" style="text-align: left" align="top">
            <p><b>Dân tộc</b>/ <i>Ethnic</i>: {{dataParent ? dataParent.Folk : ''}}</p>
          </td>
          <td colspan="2" class="text-left" style="text-align: left; padding: 0 5px;" align="top">
            <p><b>Nghề nghiệp</b>/ <i>Occupation</i>: {{data.Job}}</p>
          </td>
        </tr>
      </table>
      <p>
        <b>Mã số BHXH/Thẻ BHYT số</b>/ <i>HI no.</i>: {{dataParent ? dataParent.HealthInsuranceNumber : ''}}
      </p>
      <p>
        <b>Địa chỉ</b>/ <i>Address</i>: {{data.Address}}
      </p>
      <p v-if="Version === 2">
        <b>Vào viện lúc</b>/ <i>Hospital Admission (Time, Date)</i>: {{data.AdmittedDate}}
      </p>
      <p v-else>
        <b>Vào viện lúc</b>/ <i>Adminssion at (Time, Date)</i>: {{data.AdmittedDate}}
      </p>
      <p v-if="Version === 2">
        <b>Ra viện lúc</b>/ <i>Hospital Discharge (Time, Date)</i>: {{data.DischargeDate}}
      </p>
      <p v-else>
        <b>Ra viện lúc</b>/ <i>Discharge at (Time, Date)</i>: {{data.DischargeDate}}
      </p>
      <p>
        <b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{data.Diagnosis}}
      </p>
      <p>
        <b>Phương pháp điều trị</b>/ <i>Treatment method</i>: {{data.TreatmentAndProcedures}}
      </p>
      <p>
        <b>Ghi chú</b>/ <i>Note</i>: {{'\n'}}{{data.DoctorRecommendations}}
      </p>
      <p><br /></p>
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
        <tr>
          <th width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
          <th class="text-center" style="text-align: center"><p><br /></p></th>
        </tr>
        <tr v-if="Version === 1">
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
    <p class="a4-page no-style">{{getFormCode}}</p>
    <div v-if="isTranView" class="print-area">
      <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
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
  </div>
</template>
<script>
/* ============
 * KLM Page vi sao đặt tên là KLM hỏi dungnv53
 * ============
 *
 * The home index page.
 */
import moment from 'moment'
export default {
  /**
   * The name of the page.
   */
  name: 'NPQ-View',
  mixins: [],
  props: ['data', 'isTranView', 'printId', 'Director', 'DeptHead', 'dataParent'],
  data () {
    return {
      Version: null,
      popupTitle: '',
      user: {
        username: '',
        kind: ''
      }
      // Director: null,
      // DeptHead: null
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
      return this.data.Date ? this.data.Date.split('/') : ['', '', '']
    },
    getFormCode () {
      return this.Version === 1 ? 'A01_146_050920_V' : 'A01_146_290922_V'
    }
  },
  methods: {
    print () {
      this.$htmlToPaper(this.printId || 'printTranslate', false, this.getFormCode)
    },
    handleCheckDate (AdmittedDate) {
      if (moment(AdmittedDate, 'HH:mm DD/MM/YYYY') > moment(new Date(2022, 8, 30, 17, 0, 0))) {
        this.Version = 2
      } else {
        this.Version = 1
      }
      console.log(`AdmittedDate: ${AdmittedDate} ${moment(new Date(2022, 8, 30, 17, 0, 0)).format()} => Version: ${this.Version}`)
    },
    getConfirmDate (value) {
      let confirmDate = {}
      if (value) {
        value = moment(value).format('DD/MM/YYYY')
        confirmDate = {
          day: value.split('/')[0],
          month: value.split('/')[1],
          year: value.split('/')[2]
        }
      }
      return confirmDate
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    }
  }
}
</script>
