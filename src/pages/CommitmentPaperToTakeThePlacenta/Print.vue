<template>
  <div class="a4-page box" id="printMe" v-if="DataSubmit">
    <br><br>
    <table width="100%">
      <tr>
        <td width="10%" valign="top">
          <img src="/static/Logo Vinmec International Hospitall 1.png" />
        </td>
        <td width="85%" valign="top" class="text-center">
          <div class="font20 font-bold text-center" v-if="Version >= 13">
            BẢN CAM KẾT XIN CHUYỂN BÁNH RAU/ TỔ CHỨC THAI/<br/>BỘ PHẬN CƠ THỂ RA NGOÀI BỆNH VIỆN <br/> VÀ TUÂN THỦ QUY ĐỊNH PHÁP LUẬT
          </div>
          <div class="font20 font-bold text-center" v-else>
            BẢN CAM KẾT XIN LẤY BÁNH RAU <br> KHÔNG THEO QUY ĐỊNH QUẢN LÝ CỦA BỆNH VIỆN
          </div>
          <div class="font16 font-bold text-center" style="font-style: italic" v-if="Version >= 13">
            (COMMITMENT PAPER TO TAKE THE PLACENTA /NONVIABLE/BODY PARTS REMOVED OUT OF HOSPITAL AND COMPLY WITH THE LAW)
          </div>
          <div class="font16 font-bold text-center" style="font-style: italic" v-else>
            (COMMITMENT PAPER TO TAKE THE PLACENTA OUT OF HOSPITAL <br> BYEON THE REGULATIONS OF PLACENTA MANAGEMENT OF THE HOSPITAL)
          </div>
        </td>
      </tr>
    </table>
    <br>
    <div class="box-center mrb10 text-center" style="border: 1px solid black; padding: 5px; width: 307px; margin: auto">
      <div class="flex" style="justify-content: center;">
        <VueBarcode v-if="DataSubmit.data.PID" v-bind:value="DataSubmit.data.PID" :height="40" :displayValue="false" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
      </div>
      <div class="mrb10">Họ và tên/ <i>Full name</i>: {{DataSubmit.data.FullNameNB || 'N/A'}}</div>
      <div class="mrb10">Số PID/ <i>PID No</i>: {{DataSubmit.data.PID || 'N/A'}}</div>
      <div class="mrb10">Ngày tháng năm sinh/ <i>Date of birth</i>: {{DataSubmit.data.DateOfBirth ? getFTime2(DataSubmit.data.DateOfBirth) : 'N/A'}}</div>
      <div>Giới tính/ <i>Gender</i>: {{GENDER[DataSubmit.data.Gender] || 'N/A'}}</div>
    </div>
    <br>
    <div class="box form-content">
      <div class="box-body">
        <p v-if="CustomerInfo">{{__t2('Họ và tên sản phụ')}}/ <i>{{__t2('Full name of patient')}}: </i>{{CustomerInfo.CustomerName}}</p>
        <p v-if="CustomerInfo">Số CMND/Hộ Chiếu/ Thẻ căn cước/ <i>Identify number/Passport number: </i>{{CustomerInfo.CustomerPassportNumber}}</p>
        <p v-if="CustomerInfo">Địa chỉ/ <i>Address: </i>{{CustomerInfo.CustomerAddress}}</p>
        <p v-if="CustomerInfo">Số điện thoại liên lạc/ <i>The telephone number to contact: </i>{{CustomerInfo.CustomerPhone}}</p>
        <p v-if="CustomerInfo && CustomerInfo.CustomerRelationship">{{__t2('Họ tên chồng sản phụ')}}/ <i>{{__t2('The name of the husband')}}: </i>{{CustomerInfo.CustomerRelationship.ContactName}}</p>
        <p v-else>{{__t2('Họ tên chồng sản phụ')}}/ <i>{{__t2('The name of the husband')}}: </i></p>
        <p v-if="MASTERDATA['CPTTTP01']">Số CMND/Hộ Chiếu/ Thẻ căn cước/ <i>Identify number/Passport number: </i>{{MASTERDATA['CPTTTP01'].Items[0].Value}}</p>
        <p v-else>Số CMND/Hộ Chiếu/ Thẻ căn cước/ <i>Identify number/Passport number: </i></p>
        <p v-if="CustomerInfo && CustomerInfo.CustomerRelationship">Địa chỉ/ <i>Address: </i>{{CustomerInfo.CustomerRelationship.ContactAddress}}</p>
        <p v-else>Địa chỉ/ <i>Address: </i></p>
        <p v-if="CustomerInfo && CustomerInfo.CustomerRelationship">Số điện thoại liên lạc/ <i>The telephone number to contact: </i>{{CustomerInfo.CustomerRelationship.ContactPhoneNumber}}</p>
        <p v-else>Số điện thoại liên lạc/ <i>The telephone number to contact: </i></p>
        <p v-if="MASTERDATA['CPTTTP03']">{{__t2('Phương pháp sinh')}}/ <i>{{__t2('Method of delivery')}}:</i>{{MASTERDATA['CPTTTP03'].Items[0].Value}}</p>
        <p v-else>{{__t2('Phương pháp sinh')}}/ <i>{{__t2('Method of delivery')}}:</i></p>
        <p>{{__t2('Giờ sinh con')}}/ <i>{{__t2('Time of delivery')}}: </i>{{time}}&emsp;{{__t2('Ngày sinh con')}}/ <i>{{__t2('Date of delivery')}}: </i>{{day}}</p>
        <p>{{__t2('Sau khi sinh con, Tôi có nguyện vọng xin được mang bánh nhau về nhà')}}/ <i>{{__t2('After giving birth, I have intentions to bring home the placenta')}}</i></p>
        <p v-if="MASTERDATA['CPTTTP09']">{{__t2('Lý do xin nhau thai')}}/ <i>{{__t2('The reasons to collect the placenta')}}: </i> {{MASTERDATA['CPTTTP09'].Items[0].Value}}</p>
        <p v-else>{{__t2('Lý do xin nhau thai')}}/ <i>{{__t2('The reasons to collect the placenta')}}: </i> </p>
        <p>{{__t2('Mặc dù đã được BS giải thích về trách nhiệm kiểm soát nhiễm khuẩn và chịu trách nhiệm sử dụng bánh nhau cho mục đích cá nhân, tôi vẫn mong muốn xin lấy bánh nhau về')}}/ <i>{{__t2('Although it has been explained about the responsibilities of infection control and utilization of placenta for personal purposes, I still request to take the placenta home.')}}</i></p>
        <p>{{__t2('Tôi cam kết tuân thủ các quy định của bệnh viện và xác nhận đã hiểu rõ sự giải thích và tự nguyện viết giấy cam kết này làm bằng chứng chịu hoàn toàn trách nhiệm với việc sử dụng nhau thai không theo quy định của bệnh viện')}}/ <i>{{__t2('I commit to comply with the regulations of the hospital and confirm that I have understood the explanation and voluntarily to write the commitment as an evidence to hold full responsibility for the utilization of the placenta that is beyond the regulations of the hospital.')}}</i></p>
        <div class="BreakPage"></div>
        <table style="width: 100%;">
          <tr>
            <td></td>
            <td></td>
            <td>
              <p style="text-align: end;">{{hour}} giờ/ hours {{minute}} ngày/ date {{date}}</p>
            </td>
          </tr>
        </table>
        <br>
        <table style="width: 100%;">
          <tr>
            <td class="text-center">
              <div class="text-center"><b>{{__t2('Họ và tên sản phụ/chồng')}}/ <br><i>{{__t2('Name and Signature of the husband')}}</i></b></div>
              <div class="text-center"><i>(Ký và ghi rõ họ tên/ <br> Fullname and Signature)</i></div>
              <div>
                <br><br><br><br><br><br><br><br>
              </div>
            </td>
            <td class="text-center">
              <div class="text-center"><b>Người đại diện bệnh  viện/ <br><i>Name and Signature of Hospital's Representative</i></b></div>
              <div class="text-center"><i>(Ký và ghi rõ họ tên/ <br> Fullname and Signature)</i></div>
              <div class="text-center" v-if="DaiDienBenhVien">
                <br><br><br><br><br><br><br>
                <div class="text-center">{{DaiDienBenhVien.Note}}</div>
              </div>
              <div v-else>
                <br><br><br><br><br><br><br><br>
              </div>
            </td>
            <td >
              <div class="text-center"><b>Nhân viên y tế đỡ đẻ/ <br><i>{{__t2('Doctor (assisting delivery)')}}</i></b></div>
              <div class="text-center"><i>(Ký và ghi rõ họ tên/ <br> Fullname and Signature)</i></div>
              <div class="text-center" v-if="NhanVienDoDe">
                <br><br><br><br><br><br><br>
                <div class="text-center">{{NhanVienDoDe.Note}}</div>
              </div>
              <div v-else>
                <br><br><br><br><br><br><br><br>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>

import VueBarcode from 'vue-barcode'
import constants from '@/constants'
const GENDER = constants.GENDER
export default {
  props: ['MASTERDATA', 'DataSubmit', 'dataPicture', 'CustomerInfo', 'Version'],
  components: {VueBarcode},
  data () {
    return {
      userData: {},
      customer: this.$store.state.account.CurrentPatientObj,
      time: null,
      day: null,
      hour: null,
      minute: null,
      date: null,
      GENDER: GENDER,
      DaiDienBenhVien: null,
      NhanVienDoDe: null
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let value = this.moment2String(this.MASTERDATA['CPTTTP05'].Items[0].Value)
      if (value) {
        let timeAndDate = value.split(' ')
        this.time = timeAndDate[0]
        this.day = timeAndDate[1]
      }

      if (this.DataSubmit) {
        let lastUpdateValue = this.DataSubmit.data.UpdatedAt.split(' ')
        let hourAndMinute = lastUpdateValue[0].split(':')
        this.hour = hourAndMinute[0]
        this.minute = hourAndMinute[1]
        this.date = lastUpdateValue[1]
      }

      if (this.DataSubmit.data.ConfirmInfos) {
        this.DaiDienBenhVien = this.DataSubmit.data.ConfirmInfos.find(e => e.ConfirmType === 'DaiDienBenhVien')
        this.NhanVienDoDe = this.DataSubmit.data.ConfirmInfos.find(e => e.ConfirmType === 'NhanVienDoDe')
      }
    },
    __t2 (str) {
      let text = ''
      if (this.Version < 13) {
        text = str
      } else {
        switch (str) {
          case 'Họ và tên sản phụ':
            text = 'Họ và tên người bệnh'
            break
          case 'Họ tên chồng sản phụ':
            text = 'Họ và tên người thân/ người giám hộ người bệnh'
            break
          case 'Phương pháp sinh':
            text = 'Phương pháp sinh/ phẫu thuật'
            break
          case 'Thời gian sinh con':
            text = 'Thời gian sinh con/ phẫu thuật'
            break
          case 'Sau khi sinh con, Tôi có nguyện vọng xin được mang bánh nhau về nhà':
            text = 'Tôi có nguyện vọng xin được mang nhau thai/tổ chức thai/bộ phận cơ thể về nhà.'
            break
          case 'Lý do xin nhau thai':
            text = 'Lý do xin nhau thai/ tổ chức thai/bộ phận cơ thể'
            break
          case 'Mặc dù đã được BS giải thích về trách nhiệm kiểm soát nhiễm khuẩn và chịu trách nhiệm sử dụng bánh nhau cho mục đích cá nhân, tôi vẫn mong muốn xin lấy bánh nhau về':
            text = 'Mặc dù đã được BS giải thích về trách nhiệm kiểm soát nhiễm khuẩn và chịu trách nhiệm sử dụng bánh nhau/tổ chức thai/bộ phận cơ thể cho mục đích cá nhân/tâm linh, tôi vẫn mong muốn xin lấy bánh nhau/tổ chức thai/bộ phận cơ thể về.'
            break
          case 'Tôi cam kết tuân thủ các quy định của bệnh viện và xác nhận đã hiểu rõ sự giải thích và tự nguyện viết giấy cam kết này làm bằng chứng chịu hoàn toàn trách nhiệm với việc sử dụng nhau thai không theo quy định của bệnh viện':
            text = 'Tôi cam kết tuân thủ các quy định của bệnh viện và xác nhận đã hiểu rõ sự giải thích và tự nguyện viết giấy cam kết này làm bằng chứng chịu hoàn toàn trách nhiệm với việc chuyển rau thai/tổ chức thai/bộ phận cơ thể ra ngoài bệnh viện và tuân thủ quy định của pháp luật Việt Nam.'
            break
          case 'Họ và tên sản phụ/chồng':
            text = 'Họ và tên người bệnh/người nhà'
            break
          case 'Giờ sinh con':
            text = 'Giờ sinh con/ phẫu thuật'
            break
          case 'Ngày sinh con':
            text = 'Ngày sinh con/ phẫu thuật'
            break
          case 'Time of delivery':
            text = 'Time of delivery/ surgery'
            break
          case 'Date of delivery':
            text = 'Date of delivery/ surgery'
            break
          case 'The name of the husband':
            text = 'The name of the family patient'
            break
          case 'Method of delivery':
            text = 'Method of delivery/ surgery'
            break
          case 'Date time of delivery':
            text = 'Date time of delivery / surgery'
            break
          case 'After giving birth I have intentions to bring home the placenta.':
            text = 'I have intentions to bring home the placenta/nonviable fetus/body parts removed.'
            break
          case 'The reasons to collect the placenta':
            text = 'The reasons to collect the placenta/ nonviable fetus/body parts removed'
            break
          case 'Although it has been explained about the responsibilities of infection control and utilization of placenta for personal purposes, I still request to take the placenta home.':
            text = 'Although it has been explained about the responsibilities of infection control and utilization of placenta/ nonviable fetus/body parts removed for personal purposes/spiritualities, I still request to take the placenta nonviable fetus/body parts removed home.'
            break
          case 'I commit to comply with the regulations of the hospital and confirm that I have understood the explanation and voluntarily to write the commitment as an evidence to hold full responsibility for the utilization of the placenta that is beyond the regulations of the hospital.':
            text = 'I commit to comply with the regulations of the hospital and confirm that I have understood the explanation and voluntarily to write the commitment as an evidence to hold full responsibility for the utilization of the placenta/ nonviable fetus/body parts removed and compliance with the law in Vietnam.'
            break
          case 'Name and Signature of the husband.':
            text = 'Name and Signature of the patient/family patient.'
            break
          case 'After giving birth, I have intentions to bring home the placenta':
            text = 'I have intentions to bring home the placenta/ nonviable fetus/body parts removed'
            break
          case 'Name and Signature of the husband':
            text = 'Name and Signature of the patient/family patient'
            break
          case 'Doctor (assisting delivery)':
            text = 'Name and Signature of nurse/doctor'
            break
          case 'Full name of patient':
            text = 'Patient’s name'
            break
        }
      }
      return text
    }
  }
}
</script>
