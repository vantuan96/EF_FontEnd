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
        <div class="text-center a" style="padding: 5px; ">
          <b style="font-size:18pt">TÓM TẮT PHẪU THUẬT</b>
        </div>
        <div class="text-center a" style="padding: 5px">
          <b style="font-size:18pt">SURGERY AND PROCEDURE SUMMARY</b>
        </div>
      </div>
    </div>
    <div style="border: 1px solid black; display: flex">
      <div style="width: 70%; padding: 12px; border-right: 1px solid black">
        <div style="text-align: center; padding-top: 0px !important;">(Dán PID người bệnh vào đây/ Affix patient's sticky label here)</div>
        <div><b>Họ và tên/ Full name of Patient:</b> {{PatientInfo.Fullname}}</div>
        <div><b>Số PID/ PID no.:</b> {{PatientInfo.PID}}</div>
        <div style="display: flex">
            <div style="width: 50%"><b>Ngày sinh/ Date of birth:</b> {{PatientInfo.DateOfBirth}}</div>
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
          <p style="margin-left: 20px">Trước phẫu thuật/ <i>Pre-Operation</i>: {{getValueByCode('SAPSNEW6')}}</p>
          <p style="margin-left: 20px">Sau phẫu thuật/ <i>Post-Operation</i>: {{getValueByCode('SAPSNEW10')}}</p>
        </div>
        <table>
          <tr>
            <td><p><b>Phương pháp phẫu thuật/ <i>Procedure Performed</i>:</b> {{getValueByCode('SAPSNEW12')}}</p></td>
          </tr>
          <tr>
            <td><p><b>Loại phẫu thuật/ <i>Type of Surgery</i>: </b>{{TypeOfSurgery}}</p></td>
          </tr>
          <tr>
            <td><p><b>Phân loại vết mổ/ <i>Surgical wound classification</i>: </b>{{SurgicalWoundClassification}}</p></td>
          </tr>
          <tr>
            <td><p><b>Phương pháp vô cảm/ <i>Method of anesthesia</i>: </b>{{getValueByCode('SAPSNEW26')}}</p></td>
          </tr>
          <tr>
            <td><p><b>Phẫu thuật viên chính/ <i>Surgeon's name</i>: </b><GetUsers :listUser="getValueByCode('SAPSNEW28')"></GetUsers></p></td>
          </tr>
          <tr>
            <td><p><b>Phẫu thuật viên phụ/ <i>Surgeon assistant</i>: </b><GetUsers :listUser="getValueByCode('SAPSNEW30')"></GetUsers></p></td>
          </tr>
          <tr>
            <td><p><b>Bác sĩ gây mê hồi sức/ <i>Anesthetist's name</i>: </b><GetUsers :listUser="getValueByCode('SAPSNEW32')"></GetUsers></p></td>
          </tr>
          <tr>
            <td><p><b>Điều dưỡng phụ mê/ <i>Anesthesia nurse</i>: </b><GetUsers :listUser="getValueByCode('SAPSNEW34')"></GetUsers></p></td>
          </tr>
          <tr>
            <td><p><b>Điều dưỡng dụng cụ/ <i>Scrub Nurse's name</i>: </b><GetUsers :listUser="getValueByCode('SAPSNEW36')"></GetUsers></p></td>
          </tr>
          <tr>
            <td><p><b>Điều dưỡng chạy ngoài/ <i>Circulating Nurse's name</i>: </b><GetUsers :listUser="getValueByCode('SAPSNEW38')"></GetUsers></p></td>
          </tr>
        </table>
      </div>
      <div style="margin-top: 15px;">
        <div style="text-align: center;"><b>LƯỢC ĐỒ PHẪU THUẬT / SURGERY CHART</b></div>
        <div class="text-center pomc-upload-area" style="height: 700px;" v-if="PaintingData && PaintingData.length > 0">
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
          <div class="divText" style="width: 50%">Lượng máu mất/ <i>Blood loss</i>: {{getValueByCode('SAPSNEW48')}}</div>
          <div class="divText" style="width: 50%">Lượng máu truyền vào/ <i>Transfused blood volume</i>: {{getValueByCode('SAPSNEW50')}}</div>
        </div>
        <div class="divText">Số mẫu bệnh phẩm/ <i>Number of speciments</i>: {{getValueByCode('SAPSNEW52')}}</div>
        <p class="divText">Khác / <i>Other</i>: {{getValueByCode('SAPSNEW54')}}</p>
      </div>
      <div  style="margin-top: 15px;">
        <div style="text-align: center;">
          <b>TRÌNH TỰ PHẪU THUẬT / STEPS OF SURGERY</b>
        </div>
        <p style="margin-top: 0px;">{{getValueByCode('SAPSNEW56')}}</p>
        <div class="divText">Các biến chứng hoặc các diễn biến bất thường ngoài dự kiến trong quá trình phẫu thuật/ <i>Complications or unexpected surgical events</i>:</div>
        <p class="divText">{{getValueByCode('SAPSNEW58')}}</p>
        <div class="divText">Chi tiết công cụ dụng cụ cấy ghép trên người bệnh (nếu có). Điền NA nếu không áp dụng/ <i>Details of implantable instruments on the patient (if any). Put NA if not applicable</i>:</div>
        <table v-if="ListTable.length > 0" class="table tbl-b">
            <tr>
                <th style="text-align: center" width="5%">STT/ No.</th>
                <th style="text-align: center" width="30%">Loại cấy ghép/ Implant type</th>
                <th style="text-align: center" width="12%">Số lượng/ Quantity</th>
                <th style="text-align: center" width="12%">Kích thước/ Size</th>
                <th style="text-align: center" width="11%">Hãng/ Brand</th>
                <th style="text-align: center" width="30%">Ghi chú/ Note (VD: Số khía trên đinh vít/ E.g. Number of notches on the screw)</th>
            </tr>
            <tr :data="item" :key="index" v-for="(item, index) in ListTable">
              <td style="text-align: center">{{index + 1}}</td>
              <td>{{item.ImplantType}}</td>
              <td>{{item.Quantity}}</td>
              <td>{{item.Size}}</td>
              <td>{{item.Brand}}</td>
              <td>{{item.Note}}</td>
            </tr>
        </table>
        <table v-else class="table tbl-b">
          <tr>
            <th style="text-align: center" width="5%">STT/ No.</th>
            <th style="text-align: center" width="30%">Loại cấy ghép/ Implant type</th>
            <th style="text-align: center" width="12%">Số lượng/ Quantity</th>
            <th style="text-align: center" width="12%">Kích thước/ Size</th>
            <th style="text-align: center" width="11%">Hãng/ Brand</th>
            <th style="text-align: center" width="30%">Ghi chú/ Note (VD: Số khía trên đinh vít/ E.g. Number of notches on the screw)</th>
          </tr>
          <tr>
            <td style="text-align: center">1</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td style="text-align: center">2</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td style="text-align: center">3</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <div style="margin-top: 15px; float: right; text-align: center;">
          <p class="divText" style="text-align: center;">{{ProcedureTime === '' ? `.....Giờ/Hour........Ngày/Date.........../........./........` : ProcedureTime}}</p>
          <div class="divText" style="text-align: center;">BS phẫu thuật (ký và ghi rõ họ tên)/ Surgeon (Name, Signature)</div>
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
import Users from '@/services/Users'
import GetUsers from '../../components/global/GetUsers.vue'
export default {
  name: 'ViewToPrintSurgeryAndProcedureSummaryV3',
  components: {Painting, GetUsers},
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
      ListTable: [],
      SurgeryTime: '',
      SurgeryDate: '',
      ListImages: [],
      SurgeryTimeArray: [],
      DoctorFullname: '',
      ProcedureTime: '',
      Users: []
    }
  },
  mounted () {
    this.generateData()
  },
  methods: {
    async getDataUser (code) {
      var data1 = (this.Data.Datas.find(e => e.Code === code) || {}).Value
      await new Users({Usernames: JSON.parse(data1)}).all().then(res => {
        console.log(res, 'check res')
        this.Users = res.map(e => {
          return {
            FullShort: e.FullShort
          }
        })
      })
    },
    getValueByCode (code) {
      var data = (this.Data.Datas.find(e => e.Code === code) || {}).Value
      if (data != null) {
        if (code === 'SAPSNEW28' || code === 'SAPSNEW30' || code === 'SAPSNEW32' || code === 'SAPSNEW34' || code === 'SAPSNEW36' || code === 'SAPSNEW38') {
          // if (data.indexOf('(') === -1) {
          //   // nothing
          // } else {
          //   data = data.slice(0, data.indexOf('('))
          // }
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
    generateData () {
      this.PatientInfo = this.$store.state.account.CurrentPatientObj
      if (this.getValueByCode('SAPSNEW2') !== undefined) {
        this.SurgeryTimeArray = this.getValueByCode('SAPSNEW2').trim().split(' ')
      } else {
        this.SurgeryTimeArray = moment().format('HH:mm DD/MM/YYYY').trim().split(' ')
      }
      if (this.SurgeryTimeArray.length > 0) {
        this.SurgeryTime = this.SurgeryTimeArray[0].replace(':', ' Giờ/hour ')
        this.SurgeryDate = 'Ngày/date ' + this.SurgeryTimeArray[1]
      }

      if (this.getValueByCode('SAPSNEW15') === 'True') {
        this.TypeOfSurgery = 'Đặc biệt/Special'
      } else if (this.getValueByCode('SAPSNEW16') === 'True') {
        this.TypeOfSurgery = 'Loại I/Type I'
      } else if (this.getValueByCode('SAPSNEW17') === 'True') {
        this.TypeOfSurgery = 'Loại II/Type II'
      } else if (this.getValueByCode('SAPSNEW18') === 'True') {
        this.TypeOfSurgery = 'Loại III/Type III'
      }

      if (this.getValueByCode('SAPSNEW21') === 'True') {
        this.SurgicalWoundClassification = 'Sạch/Clean'
      } else if (this.getValueByCode('SAPSNEW22') === 'True') {
        this.SurgicalWoundClassification = 'Sạch nhiễm/Clean-contaminated'
      } else if (this.getValueByCode('SAPSNEW23') === 'True') {
        this.SurgicalWoundClassification = 'Nhiễm/Contaminated'
      } else if (this.getValueByCode('SAPSNEW24') === 'True') {
        this.SurgicalWoundClassification = 'Bẩn/Dirty-infected'
      }

      this.PaintingData = this.getValueByCode('SAPSNEW42')

      if (this.getValueByCode('SAPSNEW45') === 'True') {
        this.Drain = 'Không/No'
      } else if (this.getValueByCode('SAPSNEW44') === 'True') {
        this.Drain = 'Có/Yes'
        var stringDatas = this.getValueByCode('SAPSNEW46')
        if (stringDatas !== '' && stringDatas !== undefined) {
          this.ListPositionAndNumber = this.JSONParse(stringDatas)
        }
      }

      if (this.getValueByCode('SAPSNEW62') !== undefined) {
        var stringTable = this.getValueByCode('SAPSNEW62')
        if (stringTable !== '' && stringTable !== undefined) {
          this.ListTable = this.JSONParse(stringTable)
        }
      }

      if (this.Data.ProcedureTime !== undefined && this.Data.ProcedureTime !== null) {
        this.ProcedureTimeArray = this.Data.ProcedureTime.trim().split(' ')
        this.ProcedureTime = this.ProcedureTimeArray[0].replace(':', ' Giờ/hour ') + ' Ngày/date ' + this.ProcedureTimeArray[1]
      }

      var stringImagesData = this.getValueByCode('SAPSNEW40')
      if (stringImagesData !== '' && stringImagesData !== undefined) {
        var imagePaths = JSON.parse(this.getValueByCode('SAPSNEW40') || [])
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

      this.DoctorFullname = this.Data.DoctorConfirm.FullName
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
