<template>
  <div class="main-content" id="ProcedureSummaryPage">
    <div v-if="loaded">
      <template v-if="data">
        <div class="a4-page box" id="printMe">
          <div class="text-center">
            <img style="width: 80px;" src="/static/Logo Vinmec International Hospitall 1.png" />
          </div>
          <h2 class="title-page text-center" style="text-align: center; font-size: 20px"><b>GIẤY CHỨNG NHẬN THỦ THUẬT</b></h2>
          <div class="title-2page text-center" style="text-align: center; font-size: 16px;font-style: italic">PROCEDURE CERTIFICATE</div>
          <br/>
          <p><b>Khoa</b>/ <i>Department</i>: {{data.Department}}</p>
          <p><b>Họ, tên người bệnh</b>/ <i> Patient’s Name</i>: {{data.Name}}</p>
          <p><b>Số đăng ký</b>/ <i>PID</i>: {{data.PID}}</p>
          <p><b>Ngày sinh</b>/ <i>D.O.B</i>: {{data.DOB}}</p>
          <p><b>Giới tính</b>/ <i>Gender</i>: {{data.Gender}}</p>
          <p><b>Quốc tịch</b>/ <i>Nationality</i>: {{data.Nationality}}</p>
          <p><b>Địa chỉ</b>/ <i>Address</i>: {{data.Address}}</p>
          <p><b>Ngày vào viện</b>/ <i>Admission Date</i>: {{data.AdmissionDate}}</p>
          <p><b>Ngày ra viện</b>/ <i>Discharge Date</i>: {{data.DischargeDate}}</p>
          <p><b>Ngày thủ thuật</b>/ <i>Procedure Date</i>: {{data.ProcedureDate}}</p>
          <p @dblclick="addBreakPage" class="hasBreakPage"><b>Chẩn đoán trước thủ thuật</b>/ <i>Preprocedural diagnosis</i>: {{data.PreproceduralDiagnosis}}</p>
          <p @dblclick="addBreakPage" class="hasBreakPage"><b>Chẩn đoán sau thủ thuật</b>/ <i>Postprocedural diagnosis</i>: {{data.PostproceduralDiagnosis}}</p>
          <p @dblclick="addBreakPage" class="hasBreakPage"><b>Phương pháp thủ thuật</b>/ <i>Procedure performed</i>: {{data.ProcedurePerformed}}</p>
          <p @dblclick="addBreakPage" class="hasBreakPage"><b>Phương pháp vô cảm</b>/ <i>Method of anesthesia</i>: {{data.MethodOfAnesthesia}}</p>
          <p @dblclick="addBreakPage" class="hasBreakPage"><b>Thủ thuật viên</b>/ <i>Surgeon’s name</i>: {{data.SurgeonName}}</p>
          <p @dblclick="addBreakPage" class="hasBreakPage"><b>Bác sĩ gây mê</b>/ <i>Anesthetist</i>: {{data.Anesthetist}}</p>
          <br/>
          <p style="text-align: right;font-style: italic;"> ....... giờ ....... phút ....... ngày ........ tháng ....... năm ........</p>
          <table width="100%">
            <tr>
              <td style="text-align: center;" valign="top" width="30%"><b>THỦ THUẬT VIÊN</b><br/>SURGEON</td>
              <td style="text-align: center;" valign="top" width="30%"><b>TRƯỞNG KHOA</b><br/>HEAD OF DEPARTMENT</td>
              <td style="text-align: center;" valign="top"><b>GIÁM ĐỐC</b><br/>DIRECTOR</td>
            </tr>
            <tr>
              <td valign="top" class="text-center">
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
                <p v-if="data.Surgeon && data.Surgeon">{{data.Surgeon}}</p>
              </td>
              <td valign="top" class="text-center">
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
                <p v-if="data.HeadOfDeft && data.HeadOfDeft">{{data.HeadOfDeft}}</p>
              </td>
              <td valign="top" class="text-center">
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
                <p v-if="data.Director && data.Director">{{data.Director}}</p>
              </td>
            </tr>
          </table>
        </div>
        <div class="a4-page no-style">
          <div class="">
            <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">Quay lại</button>
            <button class="btn v-yellow-btn pull-right" v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
          </div>
        </div>
      </template>
      <div v-else class="text-center p20">
        <p>Chưa có Phiếu phẫu thuật/thủ thuật!</p>
        <router-link class="btn btn-warning" :to="{name: 'ProcedureSummary', params: { Id: $route.params.Id }, query: { open: true}}">
          Đi đến tóm tắt thủ thuật
        </router-link>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
// import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import Document from '@/services/OPD/Document'
// import VDateTimePicker from '@/components/VDateTimePicker.vue'
// import _ from 'lodash'
// import NProgress from 'nprogress'
export default {
  name: 'ProcedureCertificate',
  mixins: [MixinForm],
  components: {},
  data () {
    return {
      data: null,
      loaded: false,
      user: {},
      now: new Date()
    }
  },
  computed: {
  },
  mounted () {
    this.getData()
  },
  methods: {
    print () {
      this.$htmlToPaper('printMe', false, 'A01_150_050919_VE')
    },
    getData () {
      new Document().find('ProcedureCertificate/' + this.$route.params.Id).then(response => {
        this.loaded = true
        this.data = response
      }).catch(e => {
        this.loaded = true
      })
    },
    creat () {
    }
  }
}
</script>
