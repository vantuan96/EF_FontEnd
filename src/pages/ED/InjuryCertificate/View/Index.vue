<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" :id="printId || 'printTranslate'">
      <table class="table" style="width: 100%">
        <tr>
           <td width="26%"  style="vertical-align: top;" align="top">
            <p><img style="margin-left: 21px" class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></p>
            <p class="textUppercase font12" style="text-align: center; max-width: 164px!important;">Sở y tế/ <i>DEPARTMENT OF HEALTH</i>  {{dataParent.LocationUnit ? dataParent.LocationUnit : data.LocationUnit}} {{dataParent.Province ? dataParent.Province : data.Province}}</p>
            <p class="font12" style="text-align: center; max-width: 170px!important;">Bệnh viện/ <i>Hospital</i>: <span class="textUppercase">Vinmec {{dataParent.Site ? dataParent.Site : data.Site}}</span></p>
          </td>
          <th class="text-center" style="text-align: center;vertical-align: top;" align="top">
            <p class="text-center textUppercase font16">Cộng hòa xã hội chủ nghĩa Việt Nam</p>
            <p class="text-center textUppercase font16"><i>SOCIALIST REPUBLIC OF VIETNAM</i></p>
            <p class="text-center"><span class="text-underline">Độc lập - Tự do - Hạnh phúc</span></p>
            <p class="text-center"><span class="text-underline"><i>Independence – Freedom - Happiness</i></span></p>
          </th>
          <td width="20%" style="vertical-align: top;" align="bottom">
            <p class="font12">MS/ <i>Code</i>: 01/BV-01</p>
            <p class="font12" style="margin: 0;text-align: center;padding: 20px 50px;border: 1px solid #000;">PID: {{data.PID}}</p>
          </td>
        </tr>
      </table>
      <h1 class="title-page font18" style="text-align: center">GIẤY CHỨNG NHẬN THƯƠNG TÍCH</h1>
      <h1 class="title-page font18" style="text-align: center"><i>INJURY CERTIFICATE</i></h1>
      <br/>
      <p><b>Giám đốc bệnh viện/ <i>Director of</i>:</b> <span class="textUppercase">ĐA KHOA QUỐC TẾ VINMEC/ <i>VINMEC INTERNATIONAL GENERAL HOSPITAL</i> {{data.Site}} </span> Chứng nhận/ <i>certifies that</i>:</p>
      <p>- Họ và tên người bệnh/ <i>Patient’s name</i>:<span class="">{{data.Fullname}}</span> <span class="tab404"> Sinh ngày/ <i>Date of birth</i> {{DOBFormart[0]}} tháng {{DOBFormart[1]}} năm  {{DOBFormart[2]}}</span><span class="tab404">Giới tính/ <i>Gender</i>: {{data.Gender}}</span></p>
      <p>- Nghề nghiệp/ <i>Occupation</i>: {{data.Job || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}} <span class="tab404">Nơi làm việc/ <i>Working place</i>:  {{data.WorkPlace || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '}}</span></p>
      <p>- Giấy CMND/Thẻ căn cước/Hộ chiếu số/ <i>Personal ID number/ Passport number</i> <small style="font-size: 10px">(2)</small>: {{dataParent ? dataParent.IdentificationCard : '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
      <p>Ngày cấp/ <i>Issue date</i>: {{dataParent.IssueDate ? dataParent.IssueDate : '. . . . . . . . . . . . . . . . .'}} <span class="tab404">Nơi cấp/ <i>Issue place</i>: {{dataParent.IssuePlace ? dataParent.IssuePlace : '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</span></p>
      <p>- Địa chỉ/ <i>Address</i>: {{data.Address || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
      <p>- Vào viện lúc/ <i>Hospital Admission (Time, Date)</i>: {{data.AdmittedDate | formatDateWithoutSecon}}</p>
      <p v-if="data.DischargeDate">- Ra viện lúc: {{data.DischargeDate | formatDateWithoutSecon}}</p>
      <p v-else>- Ra viện lúc/ <i>Hospital Discharge (Time, Date)</i>: . . . . .  giờ . . . . .  phút, ngày . . . . .  tháng . . . . .  năm . . . . . . . . . . </p>
      <p><b>- Lý do vào viện/ <i>Chief complaint</i>:</b> {{data.ChiefComplain || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>- Chẩn đoán/ <i>Diagnosis</i>:</b> {{data.Diagnosis || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>- Điều trị/ <i>Treatment</i>:</b> <span v-html="data.TreatmentAndProcedures ||  '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'"></span></p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>- Tình trạng thương tích lúc vào viện/ <i>Injury condition upon admission</i>:</b> {{data.Assessment ? '' : ' . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
      <div style="padding-left: 5px;" v-if="data.ClinicalExaminationAndFindings">
        <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.ClinicalExaminationAndFindings">+ {{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</p>
      </div>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>- Tình trạng thương tích lúc ra viện/ <i>Injury condition upon discharge</i>:</b> {{data.CurrentStatus ||  ' . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
      <!-- <p class="vhidden" style="text-align: right">Ngày ........ tháng ......... năm ..............</p> -->
      <table style="width: 100%">
        <tr>
          <th style="width: 33%" class="text-center">
            <div class="text-center" v-if="dataParent.DirectorTime">{{dataParent.DirectorTime}}</div>
            <!-- <p class="text-center"><b>{{__t('Giám đốc bệnh viện')}}</b></p> -->
            <p class="text-center"><b>Giám đốc bệnh viện <i>Hospital director</i></b></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p class="text-center" v-if="dataParent.Director">Họ tên: {{dataParent.Director.Fullname || '............................'}}</p>
          </th>
          <th style="width: 33%" class="text-center">
            <div class="text-center" v-if="dataParent.DirectorTime">{{dataParent.HeadOfDeptTime}}</div>
            <!-- <p class="text-center"><b>{{__t('Trưởng khoa')}}</b></p> -->
            <p class="text-center"><b>Trưởng khoa <i>Head of department</i></b></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p class="text-center" v-if="dataParent.HeadOfDept">Họ tên: {{dataParent.HeadOfDept.Fullname || '............................'}}</p>
          </th>
          <th style="width: 33%" class="text-center">
            <div class="text-center" v-if="dataParent.DoctorTime">{{dataParent.DoctorTime}}</div>
            <!-- <p class="text-center"><b>{{__t('Bác sĩ điều trị')}}</b></p> -->
            <p class="text-center"><b>Bác sĩ điều trị <i>Treating doctor</i></b></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p class="text-center" v-if="dataParent.Doctor">Họ tên: {{dataParent.Doctor.Fullname || '............................'}}</p>
          </th>
        </tr>
      </table>
    </div>
    <div class="a4-page translation-area">
      <p>- (2) Trường hợp chưa có thẻ căn cước hoặc hộ chiếu thì ghi giấy tờ tùy thân hợp lệ khác (giấy khai sinh, giấy xác nhận của công an cấp xã nơi cư trú kèm theo ảnh có đóng dấu giáp lai trên ảnh)/ <i>In case of no ID card nor passport, please write down other valid personal documents (birth certificate, certificate from residential commune-level police along with photo and affixed seal)</i> </p>
      <p>- Ghi chú/ <i>Note</i>: Giấy giới thiệu có giá trị trong vòng hai tháng kể từ ngày ký giới thiệu/ <i>Reference letter is valid within 2 months after it is signed</i></p>
    </div>
    <!-- <div class="a4-page no-style">
      <table style="width: 100%">
        <tr>
          <th style="width: 33%" class="text-center">
            <div v-if="dataParent.DirectorTime">{{dataParent.DirectorTime}}</div>
            <p><b>{{__t('Giám đốc bệnh viện')}}</b></p>
            <div  v-if="data.DirectorTime"><ad-Info :ad="data.Director.Username" /></div>
          </th>
          <th style="width: 33%" class="text-center">
            <div v-if="dataParent.HeadOfDeptTime">{{dataParent.HeadOfDeptTime}}</div>
            <p><b>{{__t('Trưởng khoa')}}</b></p>
            <div  v-if="data.HeadOfDeptTime"><ad-Info :ad="data.HeadOfDept.Username" /></div>
          </th>
          <th style="width: 33%" class="text-center">
            <div v-if="dataParent.DoctorTime">{{dataParent.DoctorTime}}</div>
            <p><b>{{__t('Bác sĩ điều trị')}}</b></p>
            <div  v-if="data.DoctorTime"><ad-Info :ad="data.Doctor.Username" /></div>
          </th>
        </tr>
      </table>
    </div> -->
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
    <div v-if="isTranView" class="print-area">
      <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
    </div>
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
  props: ['data', 'isTranView', 'printId', 'dataParent'],
  mixins: [],
  data () {
    return {
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
    DOBFormart: function () {
      return this.data.DateOfBirth ? this.data.DateOfBirth.split('/') : ['.....', '.....', '.....']
    }
  },
  methods: {
    print () {
      this.$htmlToPaper2(this.printId || 'printTranslate', true, 'A01_170_050919_VE')
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    }
  }
}
</script>
