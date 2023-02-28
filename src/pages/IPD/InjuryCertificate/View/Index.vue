<template>
  <div class="main-content" id="di0-page" v-if="nullContent">
    <div class="a4-page box" :id="printId || 'printMeTranslate'">
      <table class="table" style="width: 100%">
        <tr>
          <td width="26%" style="vertical-align: top; transform: translateX(-21px);" align="top">
            <p><img  style="margin-left: 21px;" class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></p>
            <p class="textUppercase font12"  style="text-align: center; max-width: 160px!important;">Sở y tế/ <i>DEPARTMENT OF HEALTH</i> : {{dataParent ? dataParent.LocationUnit : data.LocationUnit}} {{dataParent ? dataParent.Province : data.Province}}</p>
            <p class="font12" style="text-align: center; max-width: 151px!important;">Bệnh viện/ <i>Hospital</i>: <span class="textUppercase">Vinmec {{dataParent ? dataParent.SiteName : data.SiteName}}</span></p>
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
      <p><b>Giám đốc bệnh viện/ <i>Director of</i>:</b> <span class="textUppercase fs14">ĐA KHOA QUỐC TẾ VINMEC/ <i>VINMEC INTERNATIONAL GENERAL HOSPITAL</i> {{dataParent.SiteName ? dataParent.SiteName : data.SiteName}} </span> Chứng nhận/ <i>certifies that</i>:</p>
      <p>- Họ và tên người bệnh/ <i>Patient’s name</i>: <span class="">{{data.Fullname}}</span> <span class="tab404" style="font-size: 14px!important;"> Sinh ngày/ <i>Date of birth</i> {{DOBFormart[0] ? DOBFormart[0] : ' &emsp; ' }} tháng {{DOBFormart[1] ? DOBFormart[1] : ' &emsp; '}} năm  {{DOBFormart[2] ? DOBFormart[2] : ` &emsp; `}}</span><span class="tab404 fs14" style="font-size: 14px!important">Giới tính/ <i>Gender</i>: {{data.Gender}}</span></p>
      <p class="">- Nghề nghiệp/ <i>Occupation</i>: {{data.MOHJob || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}} <span style="margin-left: 10px;font-size: 14px!important;">Nơi làm việc/ <i>Working place</i>: {{data.WorkPlace}}</span></p>
      <p class="">- Giấy CMND/Thẻ căn cước/Hộ chiếu số/ <i>Personal ID number/ Passport number</i> <small style="font-size: 12px">(2)</small>: {{dataParent.IdCard ? dataParent.IdCard : data.IdCard}}</p>
      <p class="">Ngày cấp/ <i>Issue date</i>: {{dataParent.IssueDate ? getFTime2(dataParent.IssueDate) : ` &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; `}} <span class="tab404" style="font-size: 14px!important;">Nơi cấp/ <i>Issue place</i>: {{dataParent.IssuePlace ? dataParent.IssuePlace : data.IssuePlace}}</span></p>
      <p class="">- Địa chỉ/ <i>Address</i>: {{data.Address}}</p>
      <p v-if="dataParent.AdmittedDate">- Vào viện lúc/ <i>Hospital Admission (Time, Date)</i>: {{dataParent.AdmittedDate | viDisplayformatDateTime}}</p>
      <p v-else>- Vào viện lúc/ <i>Hospital Admission (Time, Date)</i>: &emsp; giờ &emsp;  phút, ngày &emsp; tháng &emsp; năm &emsp; </p>
      <p v-if="statusCustomer && statusCustomer.ViName !== 'Đang nằm nội trú' && statusCustomer.ViName !== 'Chuyển khoa' && statusCustomer.ViName !== 'NB chờ KQDV' && dataParent.DischargeDate">- Ra viện lúc/ <i>Hospital Discharge (Time, Date)</i>: {{dataParent.DischargeDate | viDisplayformatDateTime}}</p>
      <p v-else>- Ra viện lúc/ <i>Hospital Discharge (Time, Date)</i>: &emsp; giờ &emsp; phút, ngày &emsp; tháng &emsp; năm &emsp; </p>
      <p><b>- Lý do vào viện/ <i>Chief complaint</i>:</b> {{data.ChiefComplaint}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>- Chẩn đoán/ <i>Diagnosis</i>:</b> {{data.Diagnosis}}</p>
      <div @dblclick="addBreakPage" class="hasBreakPage"><b>- Điều trị/ <i>Treatment</i>:</b></div>
      <!-- <p v-html="data.TreatmentProcedures"></p> -->
      <div v-if="data && data.TreatmentsAndProcedures && (data.TreatmentsAndProcedures).toString().includes('/')">
        <p v-html="data.TreatmentsAndProcedures"></p>
      </div>
      <div v-else>
        <p v-if="dataParent && dataParent.TreatmentProcedures" v-html="dataParent.TreatmentProcedures"></p>
        <div style="display: flex;">
          <span v-if="dataParent && dataParent.TreatmentProcedures">/ </span>
          <p v-if="data && data.TreatmentsAndProcedures" v-html="data.TreatmentsAndProcedures"></p>
        </div>
      </div>
      <!-- <p v-if="dataParent && dataParent.TreatmentProcedures" v-html="dataParent.TreatmentProcedures"></p>
      <div style="display: flex;">
        <span v-if="dataParent && dataParent.TreatmentProcedures">/ </span>
        <p v-if="data && data.TreatmentsAndProcedures" v-html="data.TreatmentsAndProcedures"></p>
      </div> -->
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>- Tình trạng thương tích lúc vào viện/ <i>Injury condition upon admission</i>:</b> <span>{{data.HospitalizedStatus ? data.HospitalizedStatus : null}}</span></p>
      <div style="padding-left: 5px;" v-if="data.ClinicalExaminationAndFindings">
        <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.ClinicalExaminationAndFindings">+ {{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</p>
      </div>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>- Tình trạng thương tích lúc ra viện/ <i>Injury condition upon discharge</i>:</b> {{data.DischargeStatus}}</p>
      <p style="text-align: right; font-style: italic; margin-right:50px;">Ngày {{DOBFormart2[0] ? DOBFormart2[0] : ' &emsp; ' }} tháng {{DOBFormart2[1] ? DOBFormart2[1] : ' &emsp; ' }} năm {{DOBFormart2[2] ? DOBFormart2[2] : ' &emsp; ' }} </p>
      <table style="width: 100%">
        <tr>
          <td style="width: 33%" class="text-center">
            <!-- <p class="text-center" style="font-size: 14px!important;"><b>{{__t('Giám đốc bệnh viện')}}</b></p> -->
            <p class="text-center" style="font-size: 14px!important;"><b>Giám đốc bệnh viện/ <i>Hospital director</i></b></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p class="text-center fw300" style="font-size: 14px!important;">Họ tên: {{dataParent.DirectorTime ? dataParent.Director.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p>
          </td>
          <td style="width: 33%" class="text-center">
            <!-- <p class="text-center" style="font-size: 14px!important;"><b>{{__t('Trưởng khoa')}}</b></p> -->
            <p class="text-center" style="font-size: 14px!important;"><b>Trưởng khoa/ <i>Head of department</i></b></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p class="text-center fw300" style="font-size: 14px!important;">Họ tên: {{dataParent.HeadOfDeptTime ? dataParent.HeadOfDept.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p>
          </td>
          <td style="width: 33%" class="text-center">
            <!-- <p class="text-center" style="font-size: 14px!important;"><b>{{__t('Bác sĩ điều trị')}}</b></p> -->
            <p class="text-center" style="font-size: 14px!important;"><b>Bác sĩ điều trị/ <i>Treating doctor</i></b></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p class="text-center fw300" style="font-size: 14px!important;">Họ tên: {{dataParent.DoctorTime ? dataParent.Doctor.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="a4-page translation-area hidden-only-form">
      <p>- (2) Trường hợp chưa có thẻ căn cước hoặc hộ chiếu thì ghi giấy tờ tùy thân hợp lệ khác (giấy khai sinh, giấy xác nhận của công an cấp xã nơi cư trú kèm theo ảnh có đóng dấu giáp lai trên ảnh)/ <i>In case of no ID card nor passport, please write down other valid personal documents (birth certificate, certificate from residential commune-level police along with photo and affixed seal)</i> </p>
      <p>- Ghi chú/ <i>Note</i>: Giấy giới thiệu có giá trị trong vòng hai tháng kể từ ngày ký giới thiệu/ <i>Reference letter is valid within 2 months after it is signed</i></p>
    </div>
    <div class="a4-page code-form">A01_170_050919_VE</div>
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
    <div v-if="isTranView && !viewOnly" class="print-area">
      <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
    </div>
  </div>
  <div v-else class="text-center">
    <h1 class="title-page mrt30 mrb30" style="text-align: center">GIẤY CHỨNG NHẬN THƯƠNG TÍCH</h1>
    <h4>Bệnh nhân không có xác nhận thương tích</h4>
    <p><button class="btn btn-back v-white-btn" type="button" @click="back()">{{__t('btn.back')}}</button></p>
  </div>
</template>
<script>
/* ============
 * The home index page.
 */

export default {
  /**
   * The name of the page.
   */
  name: 'InjuryCertificate-View',
  mixins: [],
  props: ['viewOnly', 'VisitId', 'VisitType', 'data', 'isTranView', 'printId', 'dataParent'],
  data () {
    return {
      popupTitle: '',
      user: {},
      nullContent: true
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
    DOBFormart: function () {
      return this.data.DateOfBirth ? this.data.DateOfBirth.split('/') : ['', '', '']
    },
    DOBFormart2: function () {
      let data = []
      if (this.statusCustomer && this.statusCustomer.ViName !== 'Đang nằm nội trú' && this.statusCustomer.ViName !== 'Chuyển khoa' && this.statusCustomer.ViName !== 'NB chờ KQDV' && this.dataParent.DischargeDate) {
        data = this.dataParent.DischargeDate.split(' ')[1].split('/') || ['', '', '']
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
    print () {
      this.$htmlToPaper3(this.printId || 'printMeTranslate', true, 'A01_170_050919_VE')
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
