<template>
  <div class="a4-page box" id="printMe" v-if="DataSubmit">
    <table width="100%">
      <tr>
        <td width="20%" valign="top">
          <img src="/static/Logo Vinmec International Hospitall 1.png" />
        </td>
        <td class="text-center">
          <div class="font20 font-bold text-center">
            YÊU CẦU NGƯỜI BỆNH CHUẨN BỊ
          </div>
          <div class="font20 font-bold text-center">
            TRƯỚC KHI PHẪU THUẬT/ THỦ THUẬT
          </div>
        </td>
        <td align="middle"><CustomerBarCode :customer="customer" :height="50"/></td>
      </tr>
    </table>
    <div class="box form-content">
      <!-- <div class="box-body">
        <div class="box-center mrb10 text-center" style="border: 1px solid black; padding: 5px; width: 307px; margin: auto">
          <div class="flex" style="display: flex; justify-content: center; text-align: center;">
            <VueBarcode v-if="customer.PID" v-bind:value="customer.PID" :height="40" :displayValue="false" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
          </div>
          <div class="mrb10" style="margin-bottom: 8px;">Họ và tên/ <i>Full name</i>: {{customer.Fullname || 'N/A'}}</div>
          <div class="mrb10" style="margin-bottom: 8px;">Số PID/ <i>PID No.</i>: {{customer.PID || 'N/A'}}</div>
          <div class="mrb10" style="margin-bottom: 8px;">Ngày tháng năm sinh/ <i>Date of birth</i>: {{customer.DateOfBirth ? getFTime2(customer.DateOfBirth) : 'N/A'}}</div>
          <div>Giới tính/ <i>Gender</i>: {{GENDER[customer.Gender] || 'N/A'}}</div>
        </div>
      </div> -->
        <div class="box-body" style="margin-top:10px">
          <p>Đối với tất cả các cuộc phẫu thuật hay thủ thuật (như nội soi đại tràng, dạ dày, soi phế quản,...) được yêu cầu thực hiện gây mê toàn thân hoặc gây tê:</p>
        </div>
      <div class="box-body" style="border: 1px solid black; padding: 10px;">
        <div style="display:flex;">
          <div><p>Người bệnh cần&nbsp;</p></div>
          <div><p style="font-weight: bold">phải NHỊN ĂN, NHỊN UỐNG:</p></div>
        </div>
        <div><p style="font-weight: bold">- Từ 12 giờ đêm hôm trước, nếu như phẫu thuật vào buổi sáng hoặc</p></div>
        <div><p style="font-weight: bold">- Từ 7h giờ sáng cùng ngày nếu ca phẫu thuật được thực hiện vào buổi chiều.</p></div>
       </div>
       <div style="margin-top:10px"><p style="font-weight: bold">NHỊN ĂN CÓ NGHĨA LÀ:</p></div>
       <div style="display:flex">
        <div style="width:41.666667%">
            <div style="border: 1px solid black; height:90px; padding: 10px;width:200px">
              <div><p style="font-weight: bold; margin-left:55px">- Không ăn</p></div>
              <div><p style="font-weight: bold; margin-left: 55px;">- Không uống</p></div>
              <div><p style="font-weight: bold; margin-left: 55px">- Không hút thuốc</p></div>
          </div>
        </div>
        <div style="width:16.666667%">
          <div></div>
          <div class="text-center" style="margin-top: 26px;"><img src="/static/right-icon.PNG" /></div>
          <!-- <div class="text-center" style="margin-top: 26px;"><i style="font-size: 60px;" class="fa fa-arrow-right" aria-hidden="true"></i></div> -->
          <div></div>
        </div>
        <div style="width:41.666666667%;">
          <div style="border: 1px solid black; height:90px; padding: 10px;width:200px;float:right">
            <div><p style="font-weight: bold; text-align: center;">KHÔNG CÓ GÌ</p></div>
            <div><p style="font-weight: bold; text-align: center;">QUA ĐƯỜNG MIỆNG</p></div>
          </div>
        </div>
       </div>
       <!-- tại -->
       <div><p style="font-weight: bold">TẠI SAO PHẢI LÀM NHƯ VẬY?</p></div>
       <div><p>- Tất cả các thủ thuật gây mê đều được thực hiện chỉ khi DẠ DÀY RỖNG, vì nếu không dịch và thức ăn sẽ tràn vào phổi - điều này hết sức nguy hiểm.</p></div>
       <div><p>- Nếu như bạn không thực hiện theo đúng quy định trên, cuộc phẫu thuật/ thủ thuật của bạn sẽ bị hủy bỏ.</p></div>
       <div style="margin-top:10px"><p style="font-weight: bold">CHÚ Ý:</p></div>
       <div><p style="font-weight: bold">1. Trước khi nhập viện, người bệnh phải tẩy sạch móng chân, móng tay và không được đeo đồ trang sức.</p></div>
       <div><p style="font-weight: bold">2. Người bệnh nhớ mang theo phim chụp XQ (nếu có) khi đến bệnh viện.</p></div>
       <!-- <div class="flex">
        <div v-if="itemDate"><p>Thời gian: {{itemDate.hour}} giờ {{itemDate.minutes}} ngày {{itemDate.day}} / {{itemDate.month}} / {{itemDate.year}}</p></div>
      </div> -->
      <div>
          <div>
            <p>{{createdData.hour}} giờ {{createdData.minutes}} ngày {{createdData.day}}/{{createdData.month}}/{{createdData.year}}</p>
            <p>Người bệnh (tên, chữ ký):</p>
          </div>
      </div>
      </div>
    <!-- <p>A02_052_050919_V</p> -->
  </div>
</template>
<script>
import moment from 'moment'
import DropFiles from '@/components/DropFiles.vue'
import constants from '@/constants'
import VueBarcode from 'vue-barcode'
const GENDER = constants.GENDER
export default {
  props: ['DataSubmit', 'itemDate', 'createdAtProp'],
  components: {
    DropFiles,
    VueBarcode
  },
  data () {
    return {
      data: null,
      userData: {},
      customer: this.$store.state.account.CurrentPatientObj,
      GENDER: GENDER,
      createdData: {
        hour: '',
        minutes: '',
        day: '',
        month: '',
        year: ''
      }
    }
  },
  created () {
    this.data = this.DataSubmit
    console.log('DataSubmit', this.DataSubmit.CreatedAt)
    if (this.DataSubmit.CreatedAt) {
      const date = this.DataSubmit.CreatedAt
      this.createdData = {
        ...this.createdData,
        hour: date.split(' ')[0].split(':')[0],
        minutes: date.split(' ')[0].split(':')[1],
        day: date.split(' ')[1].split('/')[0],
        month: date.split(' ')[1].split('/')[1],
        year: date.split(' ')[1].split('/')[2]
      }
    }
    if (this.createdAtProp) {
      const date = this.createdAtProp
      this.createdData = {
        ...this.createdData,
        hour: date.split(' ')[0].split(':')[0],
        minutes: date.split(' ')[0].split(':')[1],
        day: date.split(' ')[1].split('/')[0],
        month: date.split(' ')[1].split('/')[1],
        year: date.split(' ')[1].split('/')[2]
      }
    }
    const date = this.DataSubmit.CreatedAt
    this.createdData = {
      ...this.createdData,
      hour: date.split(' ')[0].split(':')[0],
      minutes: date.split(' ')[0].split(':')[1],
      day: date.split(' ')[1].split('/')[0],
      month: date.split(' ')[1].split('/')[1],
      year: date.split(' ')[1].split('/')[2]
    }
  },
  methods: {
    getIcdInfo () {
      let opd = this.$store.state.account.CurrentPatientObj
      let str = ''
      if (opd) {
        let icd = this.getICD10s(opd.DiagnosisAndICD.ICD, opd.DiagnosisAndICD.ICDOption, true)
        str = [opd.DiagnosisAndICD.Diagnosis, opd.DiagnosisAndICD.DiagnosisOption].filter(e => e).join(', ') + ' ' + icd
      }
      return str
    },
    formatData (val) {
      if (val !== null && val !== undefined) {
        this.userData.time1 = (val).slice(0, 2)
        this.userData.time2 = (val).slice(3, 5)
        this.userData.date = (val).slice(6, 16)
        let text = this.userData.time1 + ' ' + 'giờ/Hours:' + ' ' + this.userData.time2 + ' ' + 'ngày/Date:' + ' ' + this.userData.date
        return text
      } else {
        return 'N/A'
      }
    },
    formatDatax (val) {
      console.log(val)
      if (!val) return 'N/A'
      if (typeof val === 'string') val = moment(val)
      val = val._i
      if (val !== null && val !== undefined) {
        this.userData.time3 = (val).slice(0, 2)
        this.userData.time4 = (val).slice(3, 5)
        this.userData.date2 = (val).slice(6, 16)
        let text = this.userData.time3 + ' ' + 'giờ/Hours:' + ' ' + this.userData.time4 + ' ' + 'ngày/Date:' + ' ' + this.userData.date2
        return text
      } else {
        return 'N/A'
      }
    }
  }
}
</script>
<style scoped>
.margin-top {
  margin-top: -15px;
}
</style>
