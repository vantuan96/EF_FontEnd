<template>
  <div v-if="DataSubmit" id="printMe" class="a4-page box">
    <table class="table" width="100%">
      <tr>
        <td width="20%" valign="top">
          <p><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png"/></p>
        </td>
        <td class="text-center">
          <div class="font16 font-bold text-center">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
          <div class="font14 font-bold text-center"><span class="text-underline">Độc lập - Tự do - Hạnh phúc</span></div>
        </td>
        <td width="20%" style="vertical-align: top;" align="bottom">
          <VueBarcode style="text-align: center;" v-if="DataSubmit.Customer.PID" v-bind:value="DataSubmit.Customer.PID" :height="40" :displayValue="false" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
          <p style="text-align: center;">{{DataSubmit.Customer.PID}}</p>
        </td>
      </tr>
    </table>
    <table width="100%">
      <tr>
        <td width="30%">
          <p class="textUppercase font12">Sở y tế: {{DataSubmit.Site.LocationUnit}} {{DataSubmit.Site.Province}}</p>
          <p class="font12">Bệnh viện: <span class="textUppercase">Vinmec {{DataSubmit.Site.Name}}</span></p>
          <p class="font12">Khoa: <span> {{ DataSubmit.Specialty.ViName }}</span></p>
        </td>
      </tr>
    </table>
    <h1 class="title-page font18" style="text-align: center">TRÍCH BIÊN BẢN KIỂM THẢO TỬ VONG</h1>
    <div class="box form-content mbt30">
      <p>- Họ tên người bệnh:<span class="tab404" style="margin-right: 35px;">{{DataSubmit.Customer.Fullname}}</span> Tuổi: <span class="tab404" style="margin-right: 35px;">{{DataSubmit.Customer.AgeFormated | formatAge}}</span> Giới tính: <span class="tab404">{{__t(DataSubmit.Customer.Gender)}}</span></p>
      <p>- Số vào viện:<span class="tab404">{{DataSubmit.Customer.PID || ''}}</span></p>
      <p>- Vào viện lúc: {{DataSubmit.AdmittedDate}}</p>
      <p>- Tử vong lúc: {{DataSubmit.DeathAt}}</p>
      <p>- Tại khoa:<span class="tab404">{{__label(DataSubmit.Specialty)}}</span></p>
      <p>- Kiểm điểm tử vong lúc: {{DataSubmit.Time}}</p>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <p style="width: 50%;">- Chủ tọa: <span>{{getNameMember(DataSubmit.Chairman)}}</span></p>
        <p style="width: 50%;">Thư ký: <span>{{getNameMember(DataSubmit.Secretary)}}</span></p>
      </div>
      <div class="mrb10">
        <div class="mgr-5">
          <p>- Thành viên tham gia: <span  v-for="(item, index) in Members" :key="index">{{getNameMember(item)}}<span v-if="index !== (Members.length - 1)">, </span></span></p>
        </div>
      </div>
      <p class="text-bold font16" style="font-weight: bold;">Tóm tắt quá trình diễn biến bệnh, quá trình điều trị và chăm sóc người bệnh</p>
      <p v-if="DataSubmit.PastMedicalHistory">1. Tóm tắt tiền sử bệnh:</p>
      <p>{{ DataSubmit.PastMedicalHistory }}</p>
      <p v-if="DataSubmit.Status">2. Tình trạng lúc vào viện: <i>(toàn thân, các bộ phận, các xét nghiệm ...)</i></p>
      <p>{{ DataSubmit.Status }}</p>
      <p v-if="DataSubmit.Diagnosis">3. Chẩn đoán: <i>(của cơ sở, khoa khám bệnh, khoa điều trị, khi tử vong, giải phẫu bệnh nếu có...)</i></p>
      <p>{{ DataSubmit.Diagnosis }}</p>
      <p v-if="DataSubmit.Progress">4. Tóm tắt diễn biến bệnh, quá trình điều trị, quá trình chăm sóc .... từng giai đoạn của bệnh:</p>
      <p>{{ DataSubmit.Progress }}</p>
      <br/>
      <p v-if="DataSubmit.Welcome">5. Tiếp đón người bệnh:</p>
      <p>{{ DataSubmit.Welcome }}</p>
      <p v-if="DataSubmit.Assessment">6. Thăm khám và chẩn đoán bệnh, nguyên nhân, triệu chứng, tiên lượng:</p>
      <p>{{ DataSubmit.Assessment }}</p>
      <p v-if="DataSubmit.TreatmentAndProcedures">7. Điều trị:</p>
      <p>{{ DataSubmit.TreatmentAndProcedures }}</p>
      <p v-if="DataSubmit.Care">8. Chăm sóc:</p>
      <p>{{ DataSubmit.Care }}</p>
      <p v-if="DataSubmit.RelationShip">9. Mối quan hệ với gia đình người bệnh<i> (tình trạng bệnh, tài sản tư trang...):</i></p>
      <p>{{DataSubmit.RelationShip}}</p>
      <br/>
      <p class="text-bold font16" style="font-weight: bold;">Kết luận</p>
      <p v-if="DataSubmit.Conclusion">{{ DataSubmit.Conclusion }}</p>
    </div>
    <div class="row" style="display: flex;">
      <p style="width: 50%; text-align: center;"></p>
      <p style="width: 50%; text-align: center;">Ngày {{DOBFormart[0] || '.......'}} Tháng {{DOBFormart[1] || '.......'}} Năm {{DOBFormart[2] || '.......'}}</p>
    </div>
    <div class="row" style="display: flex;">
      <div style="width: 50%;">
        <p style="text-align: center;"><b>THƯ KÝ:</b></p>
        <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
        <p v-if="DataSubmit.Secretary && DataSubmit.Secretary.Username" style="text-align: center;">{{getNameMember(DataSubmit.Secretary)}}</p>
        <p v-else style="text-align: center;">Họ tên: ..............................</p>
      </div>
      <div style="width: 50%;">
        <p style="text-align: center;"><b>CHỦ TỌA:</b></p>
        <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
        <p v-if="DataSubmit.Chairman && DataSubmit.Chairman.Username" style="text-align: center;">{{getNameMember(DataSubmit.Chairman)}}</p>
        <p v-else style="text-align: center;">Họ tên: ..............................</p>
      </div>
    </div>
  </div>
</template>

<script>
import DropFiles from '@/components/DropFiles.vue'
import VueBarcode from 'vue-barcode'
import { cloneDeep } from 'lodash'

export default {
  props: ['DataSubmit'],
  components: {
    DropFiles, VueBarcode
  },
  data () {
    return {
      AdmittedDate: '',
      Members: []
    }
  },
  mounted () {
    this.Members = cloneDeep(this.DataSubmit.Members.filter(item => !item.IsNotMember))
  },
  computed: {
    DOBFormart: function () {
      let ChairmanTime = ''
      if (this.DataSubmit.ChairmanTime) {
        ChairmanTime = this.DataSubmit.ChairmanTime.split(' ')[1]
      }
      return ChairmanTime ? ChairmanTime.split('/') : ['.....', '.....', '.....']
    }
  },
  methods: {
    getFormatDate (date) {
      if (date) {
        let splitDate = {
          hour: date.split(' ')[0].split(':')[0],
          minutes: date.split(' ')[0].split(':')[1],
          day: date.split(' ')[1].split('/')[0],
          month: date.split(' ')[1].split('/')[1],
          years: date.split(' ')[1].split('/')[2],
          fullDate: date.split(' ')[1]
        }
        return `${splitDate.hour} giờ ${splitDate.minutes} phút, ngày ${splitDate.day} tháng ${splitDate.month} năm ${splitDate.years}`
      } else {
        return `...... giờ ...... phút, ngày ...... tháng ...... năm ......`
      }
    },
    getNameMember (item) {
      let name = ''
      if (item.FullName) {
        name = item.FullName
      } else if (item.DisplayName) {
        name = item.DisplayName.split('(')[0]
      }
      return name
    }
  }
}
</script>

<style scoped>
p {
  white-space: normal !important;
}
</style>
