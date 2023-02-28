<template style="margin-left: 10px;">
  <div class="a4-page box" id="printMe">
    <table width="100%">
      <tr>
        <td width="20%" valign="top" style="text-align: end;">
          <embed
            height="120px"
            width="120px"
            src="static/img/logo_vinmec.svg"
            class="text-center"
            style="justify-content: center;"
          />
        </td>
        <td width="48%" class="text-center">
          <div class="font20 font-bold text-center" style="font-size:18pt">
            TÓM TẮT THỦ THUẬT
          </div>
        </td>
        <td width="32%" style="padding-left:5px">
          <table style="width: 100%;" class="tbl-b">
            <tr>
              <td style="padding-left:5px">
                <!-- <p class="text-center"><i>{{__t('Dán PID người bệnh vào đây')}} </i></p>
                <p>{{__t('Họ và tên')}}: {{PatientInfo.Fullname}}</p>
                <p>{{__t('Số PID')}}: {{PatientInfo.PID}}</p>
                <p>{{__t('Ngày tháng năm sinh')}}: {{PatientInfo.DateOfBirth}}</p>
                <p style="margin: 0;">{{__t('Giới tính')}}: {{GENDER[PatientInfo.Gender] || 'N/A'}}</p> -->
                <div style="display: flex; justify-content: center;">
                  <VueBarcode class="sizeBarCode" v-if="PatientInfo.PID" v-bind:value="PatientInfo.PID" :height="40" :displayValue="false" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
                </div>
                <div>{{__t('Họ và tên')}}: {{PatientInfo.Fullname}}</div>
                <div>{{__t('Số PID')}}:  {{PatientInfo.PID}}</div>
                <div>{{__t('Ngày tháng năm sinh')}}: {{PatientInfo.DateOfBirth}}</div>
                <div style="margin: 0;">{{__t('Giới tính')}}: {{GENDER[PatientInfo.Gender] || 'N/A'}}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <div class="mainContent" style="margin-top: 15px;">
      <div>
        <div style="margin-bottom: 12px;"><p><b>Chẩn đoán trước thủ thuật:</b> {{getValueByCode('EIOPSNEW6')}}</p></div>
        <div><p><b>Chẩn đoán sau thủ thuật:</b> {{getValueByCode('EIOPSNEW10')}}</p></div>
        <table>
          <tr>
            <td><p><b>Phương pháp làm thủ thuật:</b> {{getValueByCode('EIOPSNEW12')}}</p></td>
          </tr>
          <tr>
            <td><p><b>Phương pháp vô cảm: </b>{{getValueByCode('EIOPSNEW14')}}</p></td>
          </tr>
          <tr>
            <td><p><b>Bác sỹ làm thủ thuật:</b> {{getValueByCode('EIOPSNEW16')}}</p></td>
          </tr>
          <tr>
            <td><p><b>Nhân viên phụ:</b> {{getValueByCode('EIOPSNEW18')}}</p></td>
          </tr>
          <tr>
            <td><p><b>Bác sỹ gây mê hồi sức (nếu có):</b> {{getValueByCode('EIOPSNEW20')}}</p></td>
          </tr>
          <tr>
            <td><p><b>Thời gian làm thủ thuật: </b>{{SurgeryTime === '' ? `.....Giờ........Ngày.........../........./........`: SurgeryTime}}</p></td>
          </tr>
        </table>
      </div>
      <div style="margin-top: 15px;">
        <div style="text-align: center;"><b>LƯỢC ĐỒ THỦ THUẬT</b></div>
        <div class="text-center pomc-upload-area" style="height: 500px; margin-top: 20px;" v-if="PaintingData && PaintingData.length > 0">
          <div class="EDARRPAMAPALO-BG" >
            <div class="paint-content svgv3">
              <Painting
                :readonly="true"
                v-if="PaintingData !== null"
                v-model="PaintingData"
              />
            </div>
          </div>
        </div>
        <div style="text-align: center;" class="listImages text-center" v-if="ListImages && ListImages.length > 0">
          <div style="text-align: center;width: 600px; margin: 10px auto;" class="text-center" :key="index" v-for="(item, index) in ListImages">
            <img style="text-align: center; margin: 10px auto;" class="text-center" :src="item" width="600px" height="auto">
          </div>
        </div>
        <div v-else style="height: 20px;">

        </div>
      </div>
      <div style="margin-top: 15px;">
        <div style="text-align: center;">
          <b>TÓM TẮT QUÁ TRÌNH LÀM THỦ THUẬT</b>
        </div>
        <p style="margin-top: 0px">{{getValueByCode('EIOPSNEW22')}}</p>
        <div class="divText"><b>Các biến chứng hoặc các diễn biến bất thường ngoài dự kiến trong quá trình phẫu thuật:</b></div>
        <p class="divText">{{getValueByCode('EIOPSNEW28')}}</p>
        <div><p><b>Lượng máu mất: </b>{{getValueByCode('EIOPSNEW32')}}</p></div>
        <div><p><b>Số mẫu bệnh phẩm (nếu có): </b>{{getValueByCode('EIOPSNEW30')}}</p></div>
        <div><p><b>Số đăng ký của thiết bị cấy ghép (nếu có): </b>{{getValueByCode('EIOPSNEW34')}}</p></div>
      </div>
      <div style="margin-top: 15px; float: right; text-align: center;">
        <p class="divText" style="text-align: center;">{{ProcedureTime === '' ? `.....Giờ........Ngày.........../........./........` : ProcedureTime}}</p>
        <div class="divText" style="text-align: center;">Bác sỹ làm thủ thuật</div>
        <div class="divText" style="text-align: center;">(Ký và ghi rõ họ tên)</div>
        <br><br><br><br><br><br>
        <div class="divText" style="text-align: center;">{{DoctorFullname}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import constants from '@/constants'
import Painting from '@/components/Painting.vue'
import GetUsers from '../../components/global/GetUsers.vue'
import moment from 'moment'
import VueBarcode from 'vue-barcode'
const GENDER = constants.GENDER

export default {
  name: 'ViewToPrintTrickSummary',
  components: {Painting, GetUsers, VueBarcode},
  props: ['DataSubmit'],
  data () {
    return {
      PatientInfo: {},
      GENDER: GENDER,
      TypeOfSurgery: '',
      SurgicalWoundClassification: '',
      PaintingData: [],
      Drain: '',
      ListPositionAndNumber: [],
      ListTable: [],
      SurgeryTime: '',
      SurgeryDate: '',
      ListImages: [],
      SurgeryTimeArray: [],
      DoctorFullname: '',
      ProcedureTime: ''
    }
  },
  mounted () {
    this.generateData()
  },
  methods: {
    getValueByCode (code) {
      // console.log(this.DataSubmit, 'check dataSubmit')
      var data = (this.DataSubmit.Datas.find(e => e.Code === code) || {}).Value
      console.log(data, 'check data')
      if (data != null) {
        if (code === 'EIOPSNEW16' || code === 'EIOPSNEW18' || code === 'EIOPSNEW20') {
          if (typeof data === 'object' || data.includes('[')) {
            data = JSON.parse(data).map(e => { return e.label ? e.label : e })
            if (data) {
              data = data.join(',').replace(/ *\([^)]*\) */g, '')
            }
          } else if (typeof data === 'string') {
            data = data.replace(/ *\([^)]*\) */g, '')
          }
        }
      }
      return data
    },
    // getValueByCodeVer1 (code) {
    //   var dataVer1 = (this.Data.Datas.find(e => e.Code === code || []))
    //   console.log(dataVer1, 'aaaaaa')
    //   if (dataVer1 != null) {
    //     if (code === 'SSNEW30' || code === 'SSNEW34' || code === 'SSNEW36' || code === 'SSNEW38') {
    //       console.log(dataVer1, 'checker')
    //     }
    //   }
    //   return dataVer1
    // },
    generateData () {
      this.PatientInfo = this.$store.state.account.CurrentPatientObj
      if (this.getValueByCode('EIOPSNEW2') !== undefined) {
        this.SurgeryTimeArray = this.getValueByCode('EIOPSNEW2').trim().split(' ')
      } else {
        this.SurgeryTimeArray = moment().format('HH:mm DD/MM/YYYY').trim().split(' ')
      }
      if (this.SurgeryTimeArray.length > 0) {
        this.SurgeryTime = this.SurgeryTimeArray[0].replace(':', ' Giờ ') + ' Ngày ' + this.SurgeryTimeArray[1]
      }

      this.PaintingData = this.getValueByCode('EIOPSNEW26')

      if (this.DataSubmit.ProcedureTime !== undefined && this.DataSubmit.ProcedureTime !== null) {
        this.ProcedureTimeArray = moment(this.DataSubmit.ProcedureTime).format('HH:mm DD/MM/YYYY').trim().split(' ')
        this.ProcedureTime = this.ProcedureTimeArray[0].replace(':', ' Giờ ') + ' Ngày ' + this.ProcedureTimeArray[1]
      }

      var stringImagesData = this.getValueByCode('EIOPSNEW24')
      if (stringImagesData !== '' && stringImagesData !== undefined) {
        var imagePaths = JSON.parse(this.getValueByCode('EIOPSNEW24') || [])
        var listImagePaths = [...imagePaths]
        listImagePaths.forEach(element => {
          var path = `${element}`
          if (path.includes('.jpg')) {
            path = path.replace('.jpg', '/jpg')
          }
          if (path.includes('.png')) {
            path = path.replace('.png', '/png')
          }
          if (path.includes('.jpeg')) {
            path = path.replace('.jpeg', '/jpeg')
          }
          this.ListImages.push(path)
        })
      }

      this.DoctorFullname = this.DataSubmit.DoctorConfirm.FullName
    }
  }
}
</script>
<style scoped>
  td {
    font-size: 13pt;
  }
  .svgv3 {
    height: 500px !important;
  }
</style>
