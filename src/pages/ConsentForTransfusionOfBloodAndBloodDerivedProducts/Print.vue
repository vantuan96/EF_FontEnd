<template style="margin-left: 10px;">
  <div class="a4-page box" id="printMe" v-if="DataSubmit">
      <table width="100%">
        <tr>
          <td width="20%" valign="top">
            <img src="/static/Logo Vinmec International Hospitall 1.png" />
          </td>
          <td class="text-center">
            <div class="font20 font-bold text-center">
              PHIẾU CAM KẾT TRUYỀN MÁU VÀ CÁC CHẾ PHẨM MÁU
            </div>
            <div class="font14 font-bold text-center" style="font-style: italic">
              CONSENT FOR TRANSFUSION OF BLOOD AND/ OR BLOOD DERIVED PRODUCTS
            </div>
          </td>
          <!-- <td align="middle"><CustomerBarCode :customer="customer" :height="50"/></td> -->
        </tr>
      </table>
      <div class="box form-content">
        <div class="box-body">
          <p class="font14 font-bold mt-20">1. THÔNG TIN NGƯỜI BỆNH/ <i class="font14 font-bold">PATIENT'S INFORMATION</i>:</p>
          <div class="box-center mrb10 text-center" style="border: 1px solid black; padding: 5px; width: 307px; margin: auto">
            <div class="flex" style="display: flex; justify-content: center; text-align: center;">
              <VueBarcode v-if="customer.PID" v-bind:value="customer.PID" :height="40" :displayValue="false" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
            </div>
            <div class="mrb10" style="margin-bottom: 8px;">Họ và tên/ <i>Full name</i>: {{customer.Fullname || 'N/A'}}</div>
            <div class="mrb10" style="margin-bottom: 8px;">Số PID/ <i>PID No.</i>: {{customer.PID || 'N/A'}}</div>
            <div class="mrb10" style="margin-bottom: 8px;">Ngày tháng năm sinh/ <i>Date of birth</i>: {{customer.DateOfBirth ? getFTime2(customer.DateOfBirth) : 'N/A'}}</div>
            <div>Giới tính/ <i>Gender</i>: {{GENDER[customer.Gender] || 'N/A'}}</div>
          </div>
          <!-- <div class="box-center mrb10" style="border: 1px solid black; padding: 5px; width: 307px;">
            <div class="flex" style="justify-content: center;">
              <CustomerBarCode :customer="customer" :height="50"/>
            </div>
            <div class="mrb10">Họ và tên/ <i>Full name</i>: {{'N/A'}}</div>
            <div class="mrb10">Số PID/ <i>PID No</i>: {{ 'N/A'}}</div>
            <div class="mrb10">Ngày tháng năm sinh/ <i>Date of birth</i>: {{'N/A'}}</div>
            <div>Giới tính/ <i>Gender</i>: {{'N/A'}}</div>
          </div> -->
          <p class="ml-20">Chẩn đoán/ <i>Diagnosis</i>: {{getChuanDoanVer1(DataSubmit)}}</p>
          <p class="ml-20">Hiện đang điều trị tại khoa/ <i>Currently being treated at the following department</i>: {{MASTERDATA["TOBABDP3"].Items[0].Value}}</p>
          <p class="font14 font-bold mt-20">2. CAM KẾT CỦA NGƯỜI BỆNH/ NGƯỜI ĐẠI DIỆN/ <i class="font14 font-bold">CONSENT OF THE PATIENT/ REPRESENTATIVE</i>:</p>
          <ul style="list-style-type: lower-alpha;" class="justify">
            <li style="margin: 0 0 4px !important;">Tôi xác nhận những thông tin sau đã được giải thích cho tôi/ <i>I acknowledge that, the following have been explained to me.</i></li>
            <p style="margin: 0 0 7px !important;">Mục đích và các nguy cơ, lợi ích, biến chứng có thể xảy ra khi nhận truyền máu, bao gồm cả việc truyền máu tự thân hoặc của người khác. Tôi hiểu/ <i>The purposes, risks, benefits of autologous or heterologous transfusion. I understand</i>:</p>
            <ul style="list-style-type: disc; padding: 1px;" v-if="MASTERDATA['TOBABDP17'] && MASTERDATA['TOBABDP20']">
              <li style="margin: 0 0 7px !important;"><p style="margin: 0 0 7px !important;">Việc nhận truyền máu là cần thiết để điều trị khi người bệnh bị mất máu do bất kỳ nguyên nhân nào./ <i>Blood transfusion is essential when patient suffers blood loss due to surgery or injury.</i></p></li>
              <li style="margin: 0 0 7px !important;"><p style="margin: 0 0 7px !important;">Truyền máu không phải lúc nào cũng thành công, đạt kết quả điều trị như mong muốn./ <i>No guarantee has been made to me about the outcome of blood transfusion.</i></p></li>
              <li style="margin: 0 0 7px !important;"><p style="margin: 0 0 7px !important;">Các nguy cơ từ truyền máu trong và/ hoặc sau quá trình truyền máu (bao gồm nhưng không giới hạn trong những tình huống sau): Phản ứng truyền máu như rét run, nồi mề đay; Nhiễm khuẩn; Nguy cơ lây nhiễm các bệnh lý lây truyền qua đường máu như viêm gan virus, HIV hoặc các bệnh truyền nhiễm khác./ <i>The potential risks during/ after blood transfusion (including but not limited to): blood transfusion reaction - chills or rashes; bacteria contamination, and transmission of blood borne diseases such as Hepatitis, HIV and/ or other known/unknown infectious diseases.</i></p></li>
              <li style="margin: 0 0 7px !important;" v-if="MASTERDATA['TOBABDP17'].Items[0].Value === true">Các phương pháp điều trị thay thế/ <i>The alternatives available</i>: <p style="margin: 0 0 7px !important;">{{MASTERDATA['TOBABDP17'].Items[1].Value}}</p></li>
              <li style="margin: 0 0 7px !important;" v-if="MASTERDATA['TOBABDP20'].Items[0].Value === true">Những nguy cơ có thể xảy ra nếu không thực hiện việc truyền máu/ <i>The potential risk of not carrying out the transfusion</i>: <p style="margin: 0 0 7px !important;">{{MASTERDATA['TOBABDP20'].Items[1].Value}}</p></li>
            </ul>
            <li><p style="margin: 0 0 7px !important;">Tôi hiểu rằng bác sỹ của tôi đã cố gắng để mô tả các biến chứng phổ biến nhất có thể xảy ra trong/sau khi truyền máu. Tuy nhiên, bác sỹ sẽ không thể liệt kê hết các biến chứng có thể xảy ra. Nếu một biến chứng mà tôi chưa được cảnh báo xảy ra, bác sỹ sẽ xử lý theo chuyên môn cần thiết và thông báo cho tôi sớm nhất có thể./ <i>I understand the doctor has made the best effort to describe the most common complications which may occur during and/or after blood transfusion. However, not all potential complications can be included in the explanation. If any unexpected complications arise, doctor will solve them in respect to the protocol and inform me as soon as possible.</i></p></li>
          </ul>
          <!-- <div style="display: flex; justify-content: flex-end">Thời gian/ <i>Time</i>: {{MASTERDATA['TOBABDP24'].Items[0].Value || '.....................................'}}</div> -->
          <!-- <div style="display: flex; justify-content: flex-end">Thời gian/ <i>Time</i>: {{MASTERDATA['TOBABDP24'].Items[0].Value || ''}}</div> -->
          <div style="display: flex; justify-content: flex-end; width: 100%">
            <div style="width: 70%">
              <!-- Nothing -->
            </div>
            <div style="width: 30%;">Thời gian/ <i>Time</i>: {{MASTERDATA['TOBABDP24'].Items[0].Value || ''}}</div>
          </div>
          <p class="font14 font-bold mt-20" style="padding-left: 25px;">2.1. XÁC NHẬN CỦA NGƯỜI BỆNH/ NGƯỜI ĐẠI DIỆN/ <i class="font14 font-bold">PATIENT/ GUARDIAN’S CONFIRMATION</i>:</p>
          <p style="padding-left: 25px;">Tôi xác nhận đã hiểu nội dung của bản cam kết này thông qua trao đổi với bác sỹ và xác nhận tôi đã có cơ hội hỏi và nhận được các đầy đủ các câu trả lời, thông tin mong muốn. Tôi không còn bất cứ thắc mắc hay câu hỏi nào và <b>ĐỒNG Ý</b> nhận truyền máu/ chế phẩm máu./ <i>I hereby acknowledge that I fully understand the content of this consent form through discussion with the doctor and I have had the opportunity to ask questions and have received satisfactory answers and information. I <b>AGREE</b> to give my consent to the transfusion.</i></p>
          <div style="display: flex; justify-content: space-between; width: 100%" v-if="MASTERDATA['TOBABDP5']">
            <p v-if="MASTERDATA['TOBABDP5'].Items[0].Value === true" class="mt-10" style="width: 70%; padding-left: 25px;">Họ tên của người bệnh/ <i>Patient’s name</i>: {{MASTERDATA['TOBABDP27'].Items[0].Value}}</p>
            <p v-else-if="MASTERDATA['TOBABDP5'].Items[2].Value === true" class="mt-10" style="width: 70%; padding-left: 25px;">Họ tên của người đại diện/ <i>Representative’s name</i>: {{MASTERDATA['TOBABDP58'].Items[0].Value}}</p>
            <!-- <p class="mt-10" v-if="MASTERDATA['TOBABDP5'].Items[0].Value === true || MASTERDATA['TOBABDP5'].Items[2].Value === true">Chữ ký/ <i>Signature</i>:.................................</p> -->
            <p class="mt-10" v-if="MASTERDATA['TOBABDP5'].Items[0].Value === true || MASTERDATA['TOBABDP5'].Items[2].Value === true" style="width: 30%">Chữ ký/ <i>Signature</i>:                                 </p>
          </div>
          <!-- <p v-if="MASTERDATA['TOBABDP54'].Items[0].Value === 'Khác/ Other'" class="mt-10">(Ghi rõ quan hệ với người bệnh nếu người ký là người đại diện/ <i>Please specify relationship to patient below if a patient’s representative signs this consent form</i>): {{MASTERDATA['TOBABDP56'].Items[0].Value}}</p>
          <p v-else class="mt-10">(Ghi rõ quan hệ với người bệnh nếu người ký là người đại diện/ <i>Please specify relationship to patient below if a patient’s representative signs this consent form</i>): {{MASTERDATA['TOBABDP54'].Items[0].Value}}</p> -->
          <p v-if="MASTERDATA['TOBABDP5'].Items[2].Value === true" class="mt-10" style="padding-left: 25px;">(Ghi rõ quan hệ với người bệnh nếu người ký là người đại diện/ <i>Please specify relationship to patient below if a patient’s representative signs this consent form</i>): {{getNameDaiDien()}}</p>
          <p class="font14 font-bold mt-20" style="padding-left: 25px;">2.2. XÁC NHẬN CỦA PHIÊN DỊCH VIÊN (nếu có)/ <i class="font14 font-bold">TRANSLATOR’S CONFIRMATION (if applicable)</i>:</p>
          <p v-if="MASTERDATA['TOBABDP5'].Items[0].Value === true" style="padding-left: 25px;">Tôi đã phiên dịch trung thực, khách quan, đúng nghĩa toàn bộ nội dung bản cam kết này cho người bệnh và phiên dịch đầy đủ những trao đổi bằng lời nói hay văn bản giữa bác sĩ và người bệnh/ <i>I have made my best effort to translate all the information and assure that the Patient can understand.</i></p>
          <p v-else-if="MASTERDATA['TOBABDP5'].Items[2].Value === true" style="padding-left: 25px;">Tôi đã phiên dịch trung thực, khách quan, đúng nghĩa toàn bộ nội dung bản cam kết này cho người đại diện và phiên dịch đầy đủ những trao đổi bằng lời nói hay văn bản giữa bác sĩ và người đại diện/ <i>I have made my best effort to translate all the information and assure that the Patient’s representative can understand.</i></p>
          <div style="display: flex; justify-content: space-between; width: 100%" v-if="MASTERDATA['TOBABDP34']">
            <p class="mt-10" style="width: 72%; padding-left: 25px;">Họ tên của phiên dịch viên/ <i>Translator’s name</i>: {{MASTERDATA['TOBABDP34'].Items[0].Value}}</p>
            <!-- <p class="mt-10" style="width: 40%;">Chữ ký/ <i>Signature</i>:................</p> -->
            <p class="mt-10" style="width: 28%;">Chữ ký/ <i>Signature</i>:</p>
          </div>
          <p class="font14 font-bold mt-20" style="padding-left: 25px;">2.3. XÁC NHẬN CỦA BÁC SỸ/ <i class="font14 font-bold">PHYSICIAN’S CONFIRMATION</i>:</p>
          <p v-if="MASTERDATA['TOBABDP5'].Items[0].Value === true" style="padding-left: 25px;">Tôi đã giải thích cho người bệnh về bản chất, lợi ích, rủi ro của việc truyền máu cũng như các phương pháp thay thế (nếu có)./ <i>I have explained to the Patient the nature, benefits, risks of the above mentioned transfusion as well as other alternative solutions (if any).</i></p>
          <p v-else-if="MASTERDATA['TOBABDP5'].Items[2].Value === true" style="padding-left: 25px;">Tôi đã giải thích cho người đại diện về bản chất, lợi ích, rủi ro của việc truyền máu cũng như các phương pháp thay thế (nếu có)./ <i>I have explained to the Patient’s representative the nature, benefits, risks of the above mentioned transfusion as well as other alternative solutions (if any).</i></p>
          <div style="display: flex; justify-content: space-between; width: 100%">
            <p class="mt-10" style="width: 70%; padding-left: 25px;">Họ tên bác sĩ/ <i>Physician’s name</i>: {{MASTERDATA['TOBABDP37'].Items[0].Value}}</p>
            <!-- <p style="margin-left: 20px;" class="mt-10">Chữ ký/ <i>Signature</i>:.................................</p> -->
            <p style="margin-left: 20px; width: 30%;" class="mt-10">Chữ ký/ <i>Signature</i>:</p>
          </div>
          <p class="mt-10" style="padding-left: 25px;">Lưu ý/ Nhận xét khác từ bác sĩ (nếu có)/ <i>Other notes/comments from physician (if any)</i>: {{MASTERDATA['TOBABDP39'].Items[1].Value}}</p>
          <p class="font14 font-bold mt-20" style="word-spacing: 0px;">3. XÁC NHẬN HỦY CAM KẾT ĐÃ KÝ (nếu áp dụng)/ <i class="font14 font-bold">WITHDRAWAL OF PATIENT CONSENT (if applicable)</i>:</p>
          <p>Tôi muốn xác nhận hủy cam kết đã ký cho cam kết truyền máu/ chế phẩm máu nói trên./ <i>I would like to withdrawn the consent for the above mentioned transfusion.</i></p>
          <!-- <div style="display: flex; justify-content: flex-end">Thời gian/ <i>Time</i>: {{MASTERDATA['TOBABDP43'].Items[0].Value || '.....................................'}}</div> -->
          <div style="display: flex; justify-content: flex-end; width: 100%">
            <div style="width: 70%">
              <!-- Nothing -->
            </div>
            <div style="width: 30%;">Thời gian/ <i>Time</i>: {{MASTERDATA['TOBABDP43'].Items[0].Value || ''}}</div>
          </div>
          <div style="display: flex; justify-content: space-between; width: 100%">
            <p v-if="MASTERDATA['TOBABDP5'].Items[0].Value === true" class="mt-10" style="width: 70%">Họ tên của người bệnh/ <i>Patient’s name</i>: {{MASTERDATA['TOBABDP27'].Items[0].Value}}</p>
            <p v-else-if="MASTERDATA['TOBABDP5'].Items[2].Value === true" class="mt-10" style="width: 70%">Họ tên của người đại diện/ <i>Representative’s name</i>: {{MASTERDATA['TOBABDP58'].Items[0].Value}}</p>
            <!-- <p v-if="MASTERDATA['TOBABDP5'].Items[0].Value === true || MASTERDATA['TOBABDP5'].Items[2].Value === true" class="mt-10">Chữ ký/ <i>Signature</i>:.................................</p> -->
            <p v-if="MASTERDATA['TOBABDP5'].Items[0].Value === true || MASTERDATA['TOBABDP5'].Items[2].Value === true" class="mt-10" style="width: 30%">Chữ ký/ <i>Signature</i>:                                 </p>
          </div>
          <!-- <p v-if="MASTERDATA['TOBABDP54'].Items[0].Value === 'Khác/ Other'" class="mt-10">(Ghi rõ quan hệ với người bệnh nếu người ký là người đại diện/ <i>Please specify relationship to patient below if a patient’s representative signs this consent form</i>): {{MASTERDATA['TOBABDP56'].Items[0].Value}}</p> -->
          <!-- <p v-else class="mt-10">(Ghi rõ quan hệ với người bệnh nếu người ký là người đại diện/ <i>Please specify relationship to patient below if a patient’s representative signs this consent form</i>): {{MASTERDATA['TOBABDP54'].Items[0].Value}}</p> -->
          <p v-if="MASTERDATA['TOBABDP5'].Items[2].Value === true" class="mt-10">(Ghi rõ quan hệ với người bệnh nếu người ký là người đại diện/ <i>Please specify relationship to patient below if a patient’s representative signs this consent form</i>): {{getNameDaiDien()}}</p>
          <div style="display: flex; justify-content: space-between; width: 100%">
            <p class="mt-10" style="width: 70%">Họ tên bác sĩ/ <i>Physician’s name</i>: {{MASTERDATA['TOBABDP37'].Items[0].Value}}</p>
            <!-- <p class="mt-10">Chữ ký/ <i>Signature</i>:.................................</p> -->
            <p class="mt-10" style="width: 30%">Chữ ký/ <i>Signature</i>:</p>
          </div>
          <!-- <drop-files
            v-if="dataPicture"
            id="mini-upload"
            :readonly="true"
            v-model="dataPicture"
        /> -->
        </div>
      </div>
    <!-- <p class="mt-5"> A01_006_070721_V</p> -->
  </div>
</template>
<script>
// import moment from 'moment'
import DropFiles from '@/components/DropFiles.vue'
import constants from '@/constants'
import VueBarcode from 'vue-barcode'
import _ from 'lodash'
const GENDER = constants.GENDER
export default {
  props: ['MASTERDATA', 'DataSubmit', 'CDHA', 'hasCDHA', 'valueICD10'],
  components: {DropFiles, VueBarcode},
  data () {
    return {
      userData: {},
      customer: this.$store.state.account.CurrentPatientObj,
      GENDER: GENDER
    }
  },
  mounted () {
    this.getData()
  },
  created () {
  },
  methods: {
    getChuanDoanVer1 (response) {
      let str = ''
      let str2 = ''
      var res = null
      if (response) {
        res = response
      }
      if (res) {
        if (res.ChanDoanBenhChinh) {
          if (str) {
            str += '/ '
          }
          str += res.ChanDoanBenhChinh
        }
        if (res.ChanDoanBenhKemTheo) {
          if (str) {
            str += '/ '
          }
          str += res.ChanDoanBenhKemTheo
        }
        if (res.ICD10 && res.ICD10 !== '""') {
          var str3 = ''
          let ICD = this.JSONParse(res.ICD10)
          ICD.forEach(e => {
            if (str3) {
              str3 += ', '
            }
            str3 += e.code
          })
        }
        if (res.ICDOptions && res.ICDOptions !== '""' && res.ICDOptions !== 'null') {
          var str4 = ''
          let ICDOptions = this.JSONParse(res.ICDOptions || [], true)
          ICDOptions.forEach(e => {
            if (str4) {
              str4 += ', '
            }
            str4 += e.code
          })
        }
        if (str3) {
          str2 += str3
        }
        if (str4) {
          if (str2) {
            str2 += '/ '
          }
          str2 += str4
        }
        if (str2) {
          str += ` (${str2})`
        }
      }
      return str
    },
    getNameDaiDien () {
      let name = ''
      if (this.MASTERDATA['TOBABDP54']) {
        if (this.MASTERDATA['TOBABDP54'].Items[0].Value === 'Khác/ Other') {
          name = this.MASTERDATA['TOBABDP56'].Items[0].Value
        }
        if (this.MASTERDATA['TOBABDP54'].Items[0].Value !== 'Khác/ Other') {
          name = this.MASTERDATA['TOBABDP54'].Items[0].Value
        }
      }
      return name
    },
    getData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'Checkbox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else {
                item.Value = exited.Value
              }
            }
          })
        }
      }
    }
  }
}
</script>
<style scoped>
.margin-top {
  margin-top: -15px;
}
.justify {
    text-align: justify;
}
.font14 {
  font-size: 14.5px;
}
</style>
