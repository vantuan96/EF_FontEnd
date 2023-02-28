<template>
 <div class="a4-page box" id="printMe" v-if="DataSubmit">
  <table class="table" style="width: 100%">
      <tr>
        <td width="30%"  style="vertical-align: top;" align="top">
          <p><img style="margin-left: 10px" class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></p>
          <p class="textUppercase font12" style="text-align: left; max-width: 164px!important;">Sở y tế: {{ DataSubmit.Site.LocationUnit || ''}} {{ DataSubmit.Site.Location || ''}}</p>
          <p class="textUppercase font12" style="text-align: left;">{{DataSubmit.Site.ViName || ''}}</p>
          <p class="textUppercase font12" style="text-align: left;">Khoa: {{DataSubmit.Specialty.ViName || ''}}</p>
          <!-- <p class="font12" style="text-align: left; max-width: 170px!important;">Bệnh viện: <span class="textUppercase">Vinmec {{$store.state.account.Site.Name}}</span></p> -->
          <!-- <p class="font12" style="text-align: left; max-width: 170px!important;">Khoa: <span> {{ DataSubmit.Specialty.ViName }}</span></p> -->
        </td>
        <th class="text-center" style="text-align: center;vertical-align: top;" align="top">
          <p class="text-center textUppercase font16">Cộng hòa xã hội chủ nghĩa Việt Nam</p>
          <p class="text-center"><span class="text-underline">Độc lập - Tự do - Hạnh phúc</span></p>
        </th>
        <td width="30%" style="vertical-align: top;" align="bottom">
          <VueBarcode style="text-align: center;" v-if="DataSubmit.Customer.PID" v-bind:value="DataSubmit.Customer.PID" :height="40" :displayValue="false" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
          <p style="text-align: center;">{{DataSubmit.Customer.PID}}</p>
        </td>
      </tr>
    </table>
    <h1 class="title-page font18" style="text-align: center">TRÍCH BIÊN BẢN KIỂM THẢO TỬ VONG</h1>
    <br/>
    <!-- <h1 class="text-bold text-center">Trích biên bản kiểm thảo tử vong</h1> -->
      <div class="box form-content mbt30">
        <p style="font-size:16px">- Họ tên người bệnh:<span class="tab404" style="margin-right:30px">{{DataSubmit.Customer.Fullname}}</span> Tuổi: <span class="tab404" style="margin-right:30px">{{DataSubmit.Customer.AgeFormated | formatAge}}</span> Giới tính: <span class="tab404">{{__t(DataSubmit.Customer.Gender)}}</span></p>
        <p style="font-size:16px">- Số vào viện:<span class="tab404">{{DataSubmit.Customer.PID || ''}}</span></p>
        <p style="font-size:16px">- Vào viện lúc:{{DataSubmit.AdmittedDate || ''}}
        </p>
        <p style="font-size:16px">- Tử vong lúc: {{DataSubmit.DeathAt || ''}}
        </p>
        <p style="font-size:16px">- Tại khoa:<span class="tab404">{{__label(DataSubmit.Specialty)}}</span></p>
        <p style="font-size:16px">- Kiểm điểm tử vong lúc: {{DataSubmit.Time || ''}}
        </p>
        <div style="width: 800px;">
          <div class="mgr-5 box-inline flex align-center">
            <div><p style="font-size:16px">- Chủ tọa: <span>{{getNameMember(DataSubmit.Chairman)}}</span></p></div>
            <div><p style="font-size:16px; margin-left: 50px;">Thư ký: <span>{{getNameMember(DataSubmit.Secretary)}}</span></p></div>
          </div>
        </div>
        <div class="mrb10">
          <div class="mgr-5">
            <p>- Thành viên tham gia: <span  v-for="(item, index) in Members" :key="index">{{getNameMember(item)}}<span v-if="index !== (Members.length - 1)">, </span></span></p>
          </div>
        </div>
        <p class="text-bold font16" style="font-weight: bold;font-size: 16px;">Tóm tắt quá trình diễn biến bệnh, quá trình điều trị và chăm sóc người bệnh</p>

        <p style="font-size:16px" v-if="DataSubmit.PastMedicalHistory">1. Tóm tắt tiền sử bệnh:</p>
        <p style="font-size:16px">{{ DataSubmit.PastMedicalHistory }}</p>
        <p style="font-size:16px" v-if="DataSubmit.Status">2. Tình trạng lúc vào viện}: <i>(toàn thân, các bộ phận, các xét nghiệm ...)</i></p>
        <p style="font-size:16px">{{ DataSubmit.Status }}</p>
        <p style="font-size:16px" v-if="DataSubmit.Diagnosis">3. Chẩn đoán: <i>(của cơ sở, khoa khám bệnh, khoa điều trị, khi tử vong, giải phẫu bệnh nếu có...)</i></p>
        <p style="font-size:16px">{{ DataSubmit.Diagnosis }}</p>
        <p style="font-size:16px" v-if="DataSubmit.Progress">4. Tóm tắt diễn biến bệnh, quá trình điều trị, quá trình chăm sóc .... từng giai đoạn của bệnh:</p>
        <p style="font-size:16px">{{ DataSubmit.Progress }}</p>
        <p style="font-size:16px" v-if="DataSubmit.Welcome">5. Tiếp đón người bệnh:</p>
        <p style="font-size:16px">{{ DataSubmit.Welcome }}</p>
        <p style="font-size:16px" v-if="DataSubmit.Assessment">6. Thăm khám và chẩn đoán bệnh, nguyên nhân, triệu chứng, tiên lượng:</p>
        <p style="font-size:16px">{{ DataSubmit.Assessment }}</p>
        <p style="font-size:16px" v-if="DataSubmit.TreatmentAndProcedures">7. Điều trị:</p>
        <p style="font-size:16px">{{ DataSubmit.TreatmentAndProcedures }}</p>
        <p style="font-size:16px" v-if="DataSubmit.Care">8. Chăm sóc:</p>
        <p style="font-size:16px">{{ DataSubmit.Care }}</p>
        <p style="font-size:16px" v-if="DataSubmit.RelationShip">9. Mối quan hệ với gia đình người bệnh<i> (tình trạng bệnh, tài sản tư trang...):</i></p>
        <p style="font-size:16px">{{DataSubmit.RelationShip}}</p>
        <p v-if="DataSubmit.Conclusion" class="text-bold font16" style="font-weight: bold; font-size: 16px;">Kết luận</p>
        <p>{{ DataSubmit.Conclusion }}</p>
      </div>
      <br/>
      <br/>
      <!-- <div class="row" style="float: right;">
        <p>Ngày {{DOBFormart[0] || '.......'}} Tháng {{DOBFormart[1] || '.......'}} Năm {{DOBFormart[2] || '.......'}}</p>
      </div> -->
      <div class="row" style="display: flex;">
        <div style="width: 40%;"></div>
        <div style="width: 59%;"><div><p style="text-align: center;">Ngày {{DOBFormart[0] || '.......'}} Tháng {{DOBFormart[1] || '.......'}} Năm {{DOBFormart[2] || '.......'}}</p></div></div>
      </div>
      <div class="row" style="display: flex;">
        <div style="width: 40%;">
          <p style="text-align: center;"><b>THƯ KÝ:</b></p>
          <br/>
          <br/>
          <br/>
          <p style="text-align: center;">{{getNameMember(DataSubmit.Secretary)}}</p>
        </div>
        <div style="width: 59%;">
          <!-- style="float: right;transform: translateY(-30px); transform: translateX(-100px)" -->
          <p style="text-align: center;"><b>CHỦ TỌA:</b></p>
          <br/>
          <br/>
          <br/>
          <p style="text-align: center;">{{getNameMember(DataSubmit.Chairman)}}</p>
        </div>
      </div>
 </div>
</template>
<script>
import constants from '@/constants'
import CustomersIPD from '@/services/IPD/Customer'
import DropFiles from '@/components/DropFiles.vue'
import VueBarcode from 'vue-barcode'
import { cloneDeep } from 'lodash'
export default {
  props: ['MASTERDATA', 'DataSubmit'],
  data () {
    return {
      LDBV: '',
      TKTKT: '',
      BSTC1: '',
      DateTime: {},
      checkBoxTrue: true,
      checkBoxFalse: false,
      responseList: [],
      checkboxValue: false,
      Customer: null,
      GENDER: constants.GENDER,
      userData: {},
      customer: this.$store.state.account.CurrentPatientObj,
      itemDate: {},
      AdmittedDate: {},
      DeathAt: {},
      Members: []
    }
  },
  components: {
    DropFiles, VueBarcode
  },
  mounted () {
    console.log('DataSubmit.ICD10.label', this.DataSubmit.ICD10)
    if (this.DataSubmit.Time) {
      const date = this.DataSubmit.Time.toString()
      this.itemDate = {
        hour: date.split(' ')[0].split(':')[0],
        minutes: date.split(' ')[0].split(':')[1],
        day: date.split(' ')[1].split('/')[0],
        month: date.split(' ')[1].split('/')[1],
        years: date.split(' ')[1].split('/')[2],
        fullDate: date.split(' ')[1]
      }
    }
    if (this.DataSubmit.AdmittedDate) {
      const date = this.DataSubmit.AdmittedDate.toString()
      this.AdmittedDate = {
        hour: date.split(' ')[0].split(':')[0],
        minutes: date.split(' ')[0].split(':')[1],
        day: date.split(' ')[1].split('/')[0],
        month: date.split(' ')[1].split('/')[1],
        years: date.split(' ')[1].split('/')[2],
        fullDate: date.split(' ')[1]
      }
    }
    if (this.DataSubmit.DeathAt) {
      const date = this.DataSubmit.DeathAt.toString()
      this.DeathAt = {
        hour: date.split(' ')[0].split(':')[0],
        minutes: date.split(' ')[0].split(':')[1],
        day: date.split(' ')[1].split('/')[0],
        month: date.split(' ')[1].split('/')[1],
        years: date.split(' ')[1].split('/')[2],
        fullDate: date.split(' ')[1]
      }
    }
    this.Members = cloneDeep(this.DataSubmit.Members.filter(item => !item.IsNotMember))
  },
  created () {
    new CustomersIPD().find(this.$route.params.Id).then(response => {
      this.Customer = response
      console.log('response', response)
    }).then(er => {
    })
  },
  computed: {
    age () {
      if (this.DataSubmit.Customer.DateOfBirth) {
        // return moment().diff(moment(this.DataSubmit.Customer.DateOfBirth, this.vDateFormat), 'years')
        var now = new Date()
        var y = now.getFullYear()
        var dob = this.DataSubmit.Customer.DateOfBirth.split('/')
        return y - parseInt(dob[2])
      }
      return ''
    },
    DOBFormart: function () {
      let ChairmanTime = ''
      if (this.DataSubmit.ChairmanTime) {
        ChairmanTime = this.DataSubmit.ChairmanTime.split(' ')[1]
      }
      return ChairmanTime ? ChairmanTime.split('/') : ['.....', '.....', '.....']
    }
  },
  methods: {
    getNameMember (item) {
      let name = ''
      if (item.FullName) {
        name = item.FullName
      } else if (item.DisplayName) {
        name = item.DisplayName.split('(')[0]
      } else {
        name = ''
      }
      return name
    }
  }
}
</script>
<style lang="stylus" scoped>
.margin-top {
 margin-top: -15px;
}
.flex {
  display: flex;
}
.ml-5 {
  margin-left: 5px;
}
.chairman-time {
  padding-right: 190px;
  font-weight: 600;
  font-style: italic;
  display: flex;
  justify-content: right;
}
</style>
