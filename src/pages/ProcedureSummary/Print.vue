<template>
  <div class="BreakPage">
    <div style="display: flex; justify-content: space-around;">
      <div>
        <embed
          height="120px"
          width="120px"
          src="static/img/logo_vinmec.svg"
          class="text-center"
          style="justify-content: center;"
        />
      </div>
      <div style="text-align: center; margin-top: 40px;">
        <div class="text-center" style="font-size: 14pt; padding: 5px; ">
          <b>PHIẾU PHẪU THUẬT/THỦ THUẬT</b>
        </div>
        <div class="text-center" style="font-size: 14pt; padding: 5px">
          <b>SURGERY AND PROCEDURE NOTE</b>
        </div>
      </div>
    </div>
    <div style="border: 1px solid black; display: flex">
      <div style="width: 70%; padding: 12px; border-right: 1px solid black">
        <div style="text-align: center; padding-top: 0px !important;">(Dán PID người bệnh vào đây)</div>
        <div><b>Họ và tên/ Full name of Patient:</b> {{PatientInfo.Fullname}}</div>
        <div><b>Số PID/ PID:</b> {{PatientInfo.PID}}</div>
        <div style="display: flex">
            <div style="width: 50%"><b>Ngày sinh/ DOB:</b> {{PatientInfo.DateOfBirth}}</div>
            <div style="width: 50%"><b>Giới tính/ Gender:</b> {{GENDER[PatientInfo.Gender]}}</div>
        </div>
      </div>
      <div style="width: 30%; text-align: center; padding: 12px;">
          <div style="text-align: center;"><b>Ngày, giờ phẫu thuật/</b></div>
          <div style="text-align: center;"><b>Surgery Date, time</b></div>
          <div style="text-align: center;" >{{SurgeryTime}}</div>
          <div style="text-align: center;">{{SurgeryDate}}</div>
      </div>
    </div>
    <div class="mainContent" style="margin-top: 15px;">
      <div>
        <div><b>Chẩn đoán/ <i>Diagnosis</i>:</b>
          <p style="margin-left: 20px">Trước phẫu thuật/ <i>Pre-Operation</i>: {{getValueByCode('EIOPS12')}}</p>
          <p style="margin-left: 20px">Sau phẫu thuật/ <i>Post-Operation</i>: {{getValueByCode('EIOPS10')}}</p>
        </div>
        <table>
          <tr>
            <td><p><b>Phương pháp phẫu thuật/ <i>Procedure Performed</i>:</b> {{getValueByCode('EIOPS18')}}</p></td>
          </tr>
          <tr>
            <td><p><b>Loại phẫu thuật/ <i>Type of Surgery</i>: </b>{{TypeOfSurgery}}</p></td>
          </tr>
          <tr>
            <td><p><b>Phân loại vết mổ/ <i>Surgical wound classification</i>: </b>{{SurgicalWoundClassification}}</p></td>
          </tr>
          <tr>
            <td><p><b>Phương pháp vô cảm/ <i>Method of anesthesia</i>: </b>{{getValueByCode('EIOPS20')}}</p></td>
          </tr>
          <tr>
            <td><p><b>Phẫu thuật viên chính/ <i>Surgeon's name</i>: </b>{{getValueByCode('EIOPS42')}}</p></td>
          </tr>
          <tr>
            <td><p><b>Phẫu thuật viên phụ/ <i>Surgeon assistant</i>: </b>{{getValueByCode('EIOPS16')}}</p></td>
          </tr>
          <tr>
            <td><p><b>Bác sĩ gây mê hồi sức/ <i>Anesthetist's name</i>: </b>{{getValueByCode('EIOPS02')}}</p></td>
          </tr>
          <tr>
            <td><p><b>Điều dưỡng phụ mê/ <i>Anesthesia nurse</i>: </b>{{getValueByCode('EIOPS44')}}</p></td>
          </tr>
          <tr>
            <td><p><b>Điều dưỡng dụng cụ/ <i>Scrub Nurse's name</i>: </b>{{getValueByCode('EIOPS46')}}</p></td>
          </tr>
          <tr>
            <td><p><b>Điều dưỡng chạy ngoài/ <i>Circulating Nurse's name</i>: </b>{{getValueByCode('EIOPS48')}}</p></td>
          </tr>
        </table>
      </div>
      <div style="margin-top: 15px;">
        <div style="text-align: center;"><b>LƯỢC ĐỒ PHẪU THUẬT / SURGERY CHART</b></div>
        <div class="text-center pomc-upload-area" v-if="PaintingData && PaintingData.length > 0">
          <div class="EDARRPAMAPALO-BG" >
            <div class="paint-content">
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
        <div v-else style="height: 300px;">

        </div>
      </div>
      <div style="margin-top: 15px;">
        <div class="divText">Dẫn lưu/ <i>Drain</i>: {{Drain}}</div>
        <div v-if="ListPositionAndNumber.length > 0" :data="item" :key="index" v-for="(item, index) in ListPositionAndNumber" style="margin-left: 20px; display: flex">
          <div class="divText" style="width: 50%">Vị trí/ <i>Position</i>: {{item.Position}}</div>
          <div class="divText" style="width: 50%">Số lượng/ <i>Number</i>: {{item.Number}}</div>
        </div>
        <div style="display: flex;">
          <div class="divText" style="width: 50%">Lượng máu mất/ <i>Blood loss</i>: {{getValueByCode('EIOPS14')}}</div>
          <div class="divText" style="width: 50%">Lượng máu truyền vào/ <i>Amount of transfused blood</i>: {{getValueByCode('EIOPS54')}}</div>
        </div>
        <div class="divText">Số mẫu bệnh phẩm/ <i>Number of speciments</i>: {{getValueByCode('EIOPS24')}}</div>
        <p class="divText">Khác / <i>Other</i>: {{getValueByCode('EIOPS56')}}</p>
      </div>
      <div  style="margin-top: 15px;">
        <div style="text-align: center;">
          <b>TRÌNH TỰ PHẪU THUẬT / STEPS OF SURGERY</b>
        </div>
        <p style="margin-top: 0px;">{{getValueByCode('EIOPS28')}}</p>
        <div class="divText">Các biến chứng hoặc các diễn biến bất thường ngoài dự kiến trong quá trình phẫu thuật/ <i>Complications or unexpected surgical events</i>:</div>
        <p class="divText">{{getValueByCode('EIOPS58')}}</p>
        <div style="margin-top: 15px; float: right; text-align: center;">
          <p class="divText" style="text-align: center;">{{ProcedureTime === '' ? `.....Giờ/Hour........Ngày/Date.........../........./........` : ProcedureTime}}</p>
          <div class="divText" style="text-align: center;">BS phẫu thuật/ Surgeon (Name, Signature)</div>
          <br><br><br><br><br><br>
          <div class="divText" style="text-align: center;">{{DoctorFullname}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import constants from '@/constants'
import Painting from '@/components/Painting.vue'
import moment from 'moment'

export default {
  name: 'ViewToPrintSurgeryAndProcedureSummary',
  components: {Painting},
  props: ['Data'],
  data () {
    return {
      PatientInfo: {},
      GENDER: constants.GENDERS,
      TypeOfSurgery: '',
      SurgicalWoundClassification: '',
      PaintingData: [],
      Drain: '',
      ListPositionAndNumber: [],
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
      var data = (this.Data.Datas.find(e => e.Code === code) || {}).Value
      if (data != null) {
        if (code === 'EIOPS42' || code === 'EIOPS16' || code === 'EIOPS02' || code === 'EIOPS44' || code === 'EIOPS46' || code === 'EIOPS48') {
          if (data.indexOf('(') === -1) {
            // nothing
          } else {
            data = data.slice(0, data.indexOf('('))
          }
        }
      }
      return data
    },
    generateData () {
      this.PatientInfo = this.$store.state.account.CurrentPatientObj
      if (this.getValueByCode('EIOPS26') !== undefined) {
        this.SurgeryTimeArray = this.getValueByCode('EIOPS26').trim().split(' ')
      } else {
        this.SurgeryTimeArray = moment().format('HH:mm DD/MM/YYYY').trim().split(' ')
      }
      if (this.SurgeryTimeArray.length > 0) {
        this.SurgeryTime = this.SurgeryTimeArray[0].replace(':', ' Giờ/hour ')
        this.SurgeryDate = 'Ngày/date ' + this.SurgeryTimeArray[1]
      }

      if (this.getValueByCode('EIOPS32') === 'True') {
        this.TypeOfSurgery = 'Đặc biệt/Special'
      } else if (this.getValueByCode('EIOPS33') === 'True') {
        this.TypeOfSurgery = 'Loại I/Type I'
      } else if (this.getValueByCode('EIOPS34') === 'True') {
        this.TypeOfSurgery = 'Loại II/Type II'
      } else if (this.getValueByCode('EIOPS35') === 'True') {
        this.TypeOfSurgery = 'Loại III/Type III'
      }

      if (this.getValueByCode('EIOPS37') === 'True') {
        this.SurgicalWoundClassification = 'Sạch/Clean'
      } else if (this.getValueByCode('EIOPS38') === 'True') {
        this.SurgicalWoundClassification = 'Sạch nhiễm/Clean-contaminated'
      } else if (this.getValueByCode('EIOPS39') === 'True') {
        this.SurgicalWoundClassification = 'Nhiễm/Contaminated'
      } else if (this.getValueByCode('EIOPS40') === 'True') {
        this.SurgicalWoundClassification = 'Bẩn/Dirty-infected'
      }

      this.PaintingData = this.getValueByCode('EIOPS04')

      if (this.getValueByCode('EIOPS51') === 'True') {
        this.Drain = 'Không/No'
      } else if (this.getValueByCode('EIOPS50') === 'True') {
        this.Drain = 'Có/Yes'
        var stringDatas = this.getValueByCode('EIOPS52')
        if (stringDatas !== '' && stringDatas !== undefined) {
          this.ListPositionAndNumber = this.JSONParse(stringDatas)
        }
      }

      if (this.Data.ProcedureTime !== undefined && this.Data.ProcedureTime !== null) {
        this.ProcedureTimeArray = this.Data.ProcedureTime.trim().split(' ')
        this.ProcedureTime = this.ProcedureTimeArray[0].replace(':', ' Giờ/hour ') + ' Ngày/date ' + this.ProcedureTimeArray[1]
      }

      var stringImagesData = this.getValueByCode('EIOPS30')
      if (stringImagesData !== '' && stringImagesData !== undefined) {
        var imagePaths = JSON.parse(this.getValueByCode('EIOPS30') || [])
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

      this.DoctorFullname = this.Data.ProcedureDoctor.Fullname
    }
  }
}
</script>
<style scoped>
  td {
    font-size: 13pt;
  }
</style>
