<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" id="printMe">
      <table class="table" style="width: 100%">
        <tr>
          <td width="25%"  style="vertical-align: top;" align="top">
            <p class="textUppercase text-center font12">Sở y tế {{data.Province}}</p>
            <p class="textUppercase text-center font12">BVĐKQT Vinmec {{data.Site}}</p>
            <p class="text-center font12">Khoa/ Department: {{this.$store.state.account.Specialty.ViName}}</p>
          </td>
          <th class="text-center" style="text-align: center;vertical-align: top;" align="top">
            <p class="text-center textUppercase font16">Cộng hòa xã hội chủ nghĩa Việt Nam</p>
            <p class="text-center"><span class="text-underline">Độc lập - Tự do - Hạnh phúc</span></p>
          </th>
          <td width="20%" style="vertical-align: top;" align="top">
            <p class="font12">MS: 01/BV-01</p>
            <p class="font12">Số lưu trữ/PID: {{data.PID}}</p>
            <p class="font12">Mã Y tế ......./...../.....</p>
          </td>
        </tr>
      </table>
      <h1 class="title-page" style="text-align: center;font-size: 20px;">GIẤY RA VIỆN</h1>
      <h1 class="title-page" style="text-align: center;font-size: 18px;"><i>DISCHARGE CERTIFICATE</i></h1>
      <p><br /></p>
      <table class="table" style="width: 100%">
        <tr>
          <td width="50%" style="text-align: left" align="top">
            <p><b>Họ tên người bệnh</b>/ <i>Patient's name</i>: <span  class="textUppercase">{{data.Fullname}}</span></p>
          </td>
          <td width="20%" class="text-left" style="text-align: left" align="top">
            <p><b>Tuổi</b>/ <i>Age</i>: {{data.Age}}</p>
          </td>
          <td class="text-left" style="text-align: left" align="top">
            <p><b>Giới tính</b>/ <i>Gender</i>: {{data.Gender}}</p>
          </td>
        </tr>
        <tr>
          <td width="50%" style="text-align: left" align="top">
            <p><b>Dân tộc</b>/ <i>Ethnic</i>: {{data.Folk}}</p>
          </td>
          <td width="20%" class="text-left" style="text-align: left" align="top" colspan="2">
            <p><b>Nghề nghiệp</b>/ <i>Occupation</i>: {{data.Job}}</p>
          </td>
        </tr>
      </table>
      <p>
        <b>Mã số BHXH/Thẻ BHYT số</b>/ <i>HI no.</i>: {{data.HealthInsuranceNumber}}
      </p>
      <p>
        <b>Địa chỉ</b>/ <i>Address</i>: {{data.Address}}
      </p>
      <p>
        <b>Vào viện lúc</b>/ <i>Adminssion at (Time, Date)</i>: {{data.AdmittedDate}}
      </p>
      <p>
        <b>Ra viện lúc</b>/ <i>Discharge at (Time, Date)</i>: {{data.DischareDate}}
      </p>
      <p>
        <b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{data.Diagnosis}}
      </p>
      <p>
        <b>Phương pháp điều trị</b>/ <i>Treatments and procedures</i>: {{data.TreatmentAndProcedures}}
      </p>
      <p>
        <b>Ghi chú</b>/ <i>Note</i>: {{'\n'}}{{data.DoctorRecommendations}}
      </p>
      <p><br /></p>
      <table class="table" style="width: 100%">
        <tr>
          <td width="50%" class="text-center" style="text-align: center"><i>Ngày {{data.Date | viDisplayformatDate('DD/MM/YYYY')}}</i></td>
          <td class="text-center" style="text-align: center"><i>Ngày {{data.Date | viDisplayformatDate('DD/MM/YYYY')}}</i></td>
        </tr>
        <tr>
          <td width="50%" class="text-center" style="text-align: center"><b>Thủ trưởng đơn vị</b><div style="text-align: center"><i>(Ký tên đóng dấu)</i></div></td>
          <th class="text-center" style="text-align: center;vertical-align: top;" align="top">Trưởng khoa</th>
        </tr>
        <tr>
          <th width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
          <th class="text-center" style="text-align: center"><p><br /></p></th>
        </tr>
        <tr>
          <th width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
          <th class="text-center" style="text-align: center"><p><br /></p></th>
        </tr>
        <tr>
          <th width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
          <th class="text-center" style="text-align: center"><p><br /></p></th>
        </tr>
        <tr>
          <th width="50%" class="text-center" style="text-align: center">Họ tên:.............................</th>
          <th width="50%" class="text-center" style="text-align: center">Họ tên:.............................</th>
        </tr>
      </table>
    </div>
    <p class="mt-10 mb-5" style="margin-left: 120px;">A01_146_050920_V</p>
    <div class="a4-page no-style">
      <div class="">
        <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">{{__t('Quay lại')}}</button>
        <button class="btn v-yellow-btn pull-right"  v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In ngay')}}</button>
      </div>
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
import MixinMasterData from '@/mixins/masterdata.js'
import DischargeCertificate from '@/services/ED/DischargeCertificate'
import MixinView from '@/mixins/view.js'
import MixinForm from '@/mixins/form.js'
export default {
  /**
   * The name of the page.
   */
  name: 'NPQ',
  mixins: [MixinMasterData, MixinView, MixinForm],
  data () {
    return {
      data: {}
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
    this.getData()
  },
  computed: {
  },
  methods: {
    print () {
      this.$htmlToPaper('printMe', false, 'A01_146_050919_V')
    },
    getData () {
      new DischargeCertificate().find(this.$route.params.Id).then(response => {
        this.data = response
      })
    }
  }
}
</script>
