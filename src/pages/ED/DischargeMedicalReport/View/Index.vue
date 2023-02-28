<template>
  <div class="main-content" id="di0-page" tabindex="0">
    <div v-if="CheckDate === 2" class="box-msg" style="text-align: center; padding: 10px">{{__t('Toàn bộ bệnh nhân được tiếp nhận thực tế sau 16/02/2022 và trước 30/09/2022 sẽ sử dụng Báo cáo y tế ra viện mã A01_143_120521_VE !')}}</div>
    <div v-if="CheckDate === 3" class="box-msg" style="text-align: center; padding: 10px">{{__t('Toàn bộ bệnh nhân được tiếp nhận thực tế sau 30/09/2022 sẽ sử dụng Báo cáo y tế ra viện mới mã A01_143_290922_VE !')}}</div>
    <div class="a4-page box" :id="printId || 'printTranslate'">
      <div class="text-center" style="text-align: center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
      <h2 class="title-page text-center" style="text-align: center">BÁO CÁO Y TẾ RA VIỆN</h2>
      <h2 class="text-center" style="text-align: center;font-size: 14px;"><i>DISCHARGE MEDICAL REPORT</i></h2>
      <p><b>Khoa</b>/ <i>Department </i>: {{(dataParent && dataParent.Specialty) ? dataParent.Specialty : ''}}</p>
      <p><b>Họ và tên người bệnh</b>/ <i>Patient’s name </i>: {{data.Fullname}}</p>
      <table width="100%">
        <tr>
          <td><p><b>Ngày tháng năm sinh</b>/ <i>D.O.B</i>: {{data.DateOfBirth}}</p></td>
          <td width="40%"><p><b>Giới tính</b>/ <i>Gender</i>: {{data.Gender}}</p></td>
        </tr>
        <tr>
          <td><p><b>Quốc tịch</b>/ <i>Nationality</i>: {{data.Nationality}}</p></td>
          <td><p><b>PID</b>: {{data.PID}}</p></td>
        </tr>
      </table>
      <p><b>Địa chỉ</b>/ <i>Address</i>: {{data.Address}}</p>
      <p v-if="CheckDate === 3"><b>Vào viện lúc</b>/ <i>Hospital Admission (Time, Date):</i> {{data.AdmittedDate}}</p>
      <p v-else><b>Vào viện lúc</b>/ <i>Adminssion at (Time, Date):</i> {{data.AdmittedDate}}</p>
      <p v-if="CheckDate === 3"><b>Ra viện lúc</b>/ <i>Hospital Discharge (Time, Date):</i> {{data.DischargeDate}}</p>
      <p v-else><b>Ra viện lúc</b>/ <i>Discharge at (Time, Date):</i> {{data.DischargeDate}}</p>
      <p><b>Lý do vào viện</b>/ <i>Chief complaint</i>: {{data.ChiefComplain}}</p>
      <div>
        <p><b>Quá trình bệnh lý và diễn biến lâm sàng</b>/ <i>Clinical evolution</i>:</p>
        <!-- <div>Tiền sử/ Past Health History: {{data.PastHealthHistory}}</div> -->
        <p @dblclick="addBreakPage" class="hasBreakPage">Bệnh sử/ History: {{data.History}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">Thăm khám/ Assessment:</p>
        <div style="padding-left: 5px;">
          <p style="margin: 7px 0;font-size: 14px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.ClinicalExaminationAndFindings">+ {{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</p>
        </div>
        <p></p>
      </div>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Kết quả cận lâm sàng</b>/ <i>Result of paraclinical tests</i>:{{'\n'}}{{data.ReadOnlyResultOfParaclinicalTests}}{{data.ResultOfParaclinicalTests}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Chẩn đoán</b>/ <i>Diagnose</i>: {{data.Diagnosis}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage" v-if="CheckDate === 2 || CheckDate === 3"><b>Mã bệnh</b>/ <i>ICD</i>: {{getICD10s2(dataParent ? dataParent.ICDDiagnosis : data.ICDDiagnosis, '')}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage" v-if="CheckDate === 2 || CheckDate === 3"><b>Bệnh kèm theo</b>/ <i>Co morbidities</i>: {{data.CoMorbidities}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage" v-if="CheckDate === 2 || CheckDate === 3"><b>Mã bệnh</b>/ <i>ICD</i>: {{getICD10s2(dataParent ? dataParent.ICDCoMorbidities : data.ICDCoMorbidities, '')}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Phương pháp điều trị</b>/ <i>Treatment and procedures</i>: {{data.TreatmentAndProcedures}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Các thuốc chính đã dùng: </b>{{data.SignificantMedications}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Tình trạng bệnh nhân hiện tại</b>/ <i>Current status</i>: {{data.CurrentStatus}}</p>
      <div>
        <p @dblclick="addBreakPage" class="hasBreakPage"><b>Kế hoạch điều trị và chăm sóc tiếp theo</b>/ <i>Follow-up care plan</i>: {{data.PlanOfCare}}</p>
        <p v-if="data.DoctorRecommendations"><b>Lời dặn của thầy thuốc</b>/ <i>Doctor recommendations</i>: {{data.DoctorRecommendations ? ('\n' + data.DoctorRecommendations) : ''}}</p>
      </div>
      <table class="table" style="width: 100%">
        <tr>
          <td width="33%">
            <p v-if="DISCHARGEMEDICALREPORT_TIME_PHY">{{DISCHARGEMEDICALREPORT_TIME_PHY | bilingualFormatDateTimeKLM}}</p>
            <p v-else>...Giờ/hour ....Ngày/Date..../...../.........</p>
          </td>
          <td width="33%">
            <p v-if="DISCHARGEMEDICALREPORT_TIME_DEP">{{DISCHARGEMEDICALREPORT_TIME_DEP | bilingualFormatDateTimeKLM}}</p>
            <p v-else>...Giờ/hour ....Ngày/Date..../...../.........</p>
          </td>
          <td class="text-center">
            <p v-if="DISCHARGEMEDICALREPORT_TIME_DIR">{{DISCHARGEMEDICALREPORT_TIME_DIR | bilingualFormatDateTimeKLM}}</p>
            <p v-else>...Giờ/hour ....Ngày/Date..../...../.........</p>
          </td>
        </tr>
        <tr>
          <td width="33%" height="150" class="text-center" style="text-align: center" valign="top">
            <b>Bác sỹ điều trị</b>
            <br/><i>PHYSICIAN-IN-CHARGE</i>
            <p v-if="DISCHARGEMEDICALREPORT_PHY" style="text-align: center; margin-top: 60px; margin-bottom: 0;">{{DISCHARGEMEDICALREPORT_PHY}}</p>
          </td>
          <td width="33%" height="150" class="text-center" style="text-align: center" valign="top">
            <b>Trưởng khoa</b>
            <br/><i>DEPT HEAD</i>
            <p v-if="DISCHARGEMEDICALREPORT_DEP" style="text-align: center; margin-top: 60px; margin-bottom: 0;">{{DISCHARGEMEDICALREPORT_DEP}}</p>
          </td>
          <td width="33%" height="150" class="text-center" style="text-align: center" valign="top">
            <b>Giám đốc</b>
            <br/><i>DIRECTOR</i>
            <p v-if="DISCHARGEMEDICALREPORT_DIR" style="text-align: center; margin-top: 60px; margin-bottom: 0;">{{DISCHARGEMEDICALREPORT_DIR}}</p>
          </td>
          <td>
            <img style="width: 100%" src="/static/chu_ky.png" />
          </td>
        </tr>
      </table>
    </div>
    <div v-if="isTranView" class="print-area">
      <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
    </div>
    <div v-if="dataParent.Version" class="a4-page no-style">
      <Confirm
        class="mt-10"
        style="display: none;"
        :MasterDataCode="'DISCHARGEMEDICALREPORT'"
        :FormCode="'A01_143_290922_VE'"
        :VisitId="_VisitId"
        :FormId="dataParent.Id"
        :ReadOnly="viewOnly"
        :Bilingual="true"
        @ResponseData="getListConfirm"
      />
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
 * DMR Page vi sao đặt tên là DMR hỏi dungnv53
 * ============
 *
 * The home index page.
 */
import Confirm from '@/components/Form/Confirm3'
import moment from 'moment'
export default {
  /**
   * The name of the page.
   */
  name: 'DMR-View',
  mixins: [],
  props: ['data', 'isTranView', 'printId', 'dataParent', 'CheckDate'],
  data () {
    return {
      popupTitle: '',
      user: {},
      DISCHARGEMEDICALREPORT_PHY: '',
      DISCHARGEMEDICALREPORT_DEP: '',
      DISCHARGEMEDICALREPORT_DIR: '',
      DISCHARGEMEDICALREPORT_TIME_PHY: '',
      DISCHARGEMEDICALREPORT_TIME_DEP: '',
      DISCHARGEMEDICALREPORT_TIME_DIR: ''
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    Confirm
  },
  mounted () {
  },
  computed: {
    getFormCode () {
      if (this.CheckDate === 1) {
        return 'A01_143_050919_VE'
      } else if (this.CheckDate === 2) {
        return 'A01_143_120521_VE'
      } else {
        return 'A01_143_290922_VE'
      }
    }
  },
  methods: {
    getListConfirm (val) {
      val.map(item => {
        if (item.ConfirmType === 'DISCHARGEMEDICALREPORT_PHY') {
          this.DISCHARGEMEDICALREPORT_PHY = item.Fullname
          this.DISCHARGEMEDICALREPORT_TIME_PHY = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
        }
        if (item.ConfirmType === 'DISCHARGEMEDICALREPORT_DEP') {
          this.DISCHARGEMEDICALREPORT_DEP = item.Fullname
          this.DISCHARGEMEDICALREPORT_TIME_DEP = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
        }
        if (item.ConfirmType === 'DISCHARGEMEDICALREPORT_DIR') {
          this.DISCHARGEMEDICALREPORT_DIR = item.Fullname
          this.DISCHARGEMEDICALREPORT_TIME_DIR = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
        }
      })
    },
    print () {
      this.$htmlToPaperKLM(this.printId || 'printTranslate', true, this.getFormCode, this.getHotlineEd())
    },
    handleCheckDate () {
      if (moment(this.dataParent.AdmittedDate, 'HH:mm DD/MM/YYYY') > moment(new Date(2022, 8, 30, 17, 0, 0))) {
        this.CheckDate = 3
      }
      if (moment(this.dataParent.AdmittedDate, 'HH:mm DD/MM/YYYY') > moment(new Date(2022, 1, 16, 14, 0, 0)) && moment(this.dataParent.AdmittedDate, 'HH:mm DD/MM/YYYY') <= moment(new Date(2022, 8, 30, 17, 0, 0))) {
        this.CheckDate = 2
      }
      if (moment(this.dataParent.AdmittedDate, 'HH:mm DD/MM/YYYY') <= moment(new Date(2022, 1, 16, 14, 0, 0))) {
        this.CheckDate = 1
      }
      console.log(`AdmittedDate: ${this.dataParent.AdmittedDate} ${moment(new Date(2022, 8, 30, 17, 0, 0)).format()} => Version: ${this.CheckDate}`)
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    }
  }
}
</script>
<style scoped>
.box-msg {
  padding-right: 161px;
}
</style>
