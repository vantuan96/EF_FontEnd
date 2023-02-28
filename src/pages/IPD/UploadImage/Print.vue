<template>
  <div class="a4-page box" id="printMe" v-if="DataSubmit">
  <table width="100%">
      <tr>
        <td width="20%" valign="top">
          <img src="/static/Logo Vinmec International Hospitall 1.png" />
        </td>
        <td class="text-center">
          <div class="font20 font-bold text-center">
            YÊU CẦU KHÔNG HỒI SINH TIM PHỔI
          </div>
          <div class="font20 font-bold text-center" style="font-style: italic;">
            DO NOT RESUSCITATION ORDER
          </div>
        </td>
        <td align="middle"><CustomerBarCode :customer="customer" :height="50"/></td>
      </tr>
    </table>
    <div class="box form-content">
      <div class="box-body">
        <div style="display:flex; margin-top: 10px;">
        <div><p v-html="$t('Khoa/ Depatment:')"></p></div>
        <div style="margin-top: 10px; margin-left:5px">{{data.Specialty.ViName}}</div>
        </div>
        <div style="display:flex; margin-top: 10px;">
        <div><p v-html="$t('Chẩn đoán/ Diagnosis:')"></p></div>
        <div style="margin-top: 8px; margin-left:5px">{{data.Diagnosis}}</div>
        </div>
        <!-- <p>Khoa/ Depatment: {{data.Specialty.ViName}}</p>
        <p>Chẩn đoán/ Diagnosis: {{DataSubmit.Diagnosis || 'N/A'}}</p> -->
        <div style="display:flex; font-style: bold">
          <div><p class="font16 font-bold mt-20" style="float:left;">I. DÀNH CHO NGƯỜI BỆNH, THÂN NHÂN/ </p></div>
          <div><p style="margin-left:5px; font-style: italic !important;" class="font16 font-bold mt-20 italic ml-5">FOR PATIENT, FAMILY MEMBER</p></div>
        </div>
        <!-- <p class="font16 font-bold mt-20">I. DÀNH CHO NGƯỜI BỆNH, THÂN NHÂN/ FOR PATIENT, FAMILY MEMBER</p> -->
        <div v-if="data.IsCustormer === 'False'">
        <div style="display:flex;">
          <div><p v-html="$t('Tên tôi là/ My name is:')"></p></div>
          <div style="margin-top:8px; margin-left:3px" class="ml-5">{{data.Custormer}}, </div>
          <div style="margin-left:3px"><p v-html="$t('là người bệnh/ is patient.')"></p></div>
        </div>
        <div><p style="word-break:break-word" v-html="$t('Tôi đã được nghe bác sĩ điều trị giải thích và tôi hoàn toàn hiểu về tình trạng bệnh của tôi. Trong tình trạng tinh thần tỉnh táo và minh mẫn, tôi xác nhận việc từ chối thực hiện hồi sinh tim phổi cho tôi khi tình trạng bệnh của tôi đặt ra yêu cầu đó/ I have been explained and understood my health condition. In mentally healthy condition, I hereby state that I am making an informed decision and agree to the donot- resuscitate order when the condition required.')"></p></div>
      </div>
      <div v-else-if="DataSubmit.IsCustormer === 'True'" class="mt-10">
        <div>
        <div style="display: flex; flex-wrap: wrap;"><p>Tên tôi là/ <span style="font-style: italic;">My name is: </span> {{data.NameOfFamily || '......................'}}, là người nhà của người bệnh/ <span style="font-style: italic;">is family member of patient</span>: {{data.Custormer}}</p></div>
      </div>
        <!-- <div style="display:flex;">
          <div><p v-html="$t('Tên tôi là/ My name is:')"></p></div>
          <div style="margin-top:8px;" class="mt-10 mr-5">{{data.NameOfFamily || '......................'}}</div>
           <div style="" class="mt-10 mr-5"><p v-html="$t(', là người nhà của người bệnh/ is family member of patient:')"></p> </div>
           <div style="margin-top:8px; margin-left: 5px;" class="mt-10 mr-5">{{data.Custormer}}</div>
        </div> -->
        <p v-html="$t('Tôi đã được nghe bác sĩ điều trị giải thích và tôi hoàn toàn hiểu về tình trạng bệnh người thân của tôi. Trong tình trạng tinh thần tỉnh táo và minh mẫn, tôi xác nhận việc từ chối thực hiện hồi sinh tim phổi cho người thân của tôi khi tình trạng bệnh người thân của tôi đặt ra yêu cầu đó/ I have been explained and understood patient health condition. In mentally healthy condition, I hereby state that I am making an informed decision and agree to the donot- resuscitate order when the condition required.')"></p>
      </div>
      <!-- <div v-else class="mt-10">
        <div style="display:flex;">
          <div><p v-html="$t('Tên tôi là/ My name is:')"></p></div>
          <div style="margin-top:8px; margin-left:3px">......................</div>
          <div><p v-html="$t('là người bệnh/ người nhà của người bệnh/ is patient/ is family of')"></p></div>
          <div></div>
        </div>
        <p class="italic">......................................................</p>
        <p v-html="$t('Tôi đã được nghe bác sĩ điều trị giải thích và tôi hoàn toàn hiểu về tình trạng bệnh người thân của tôi. Trong tình trạng tinh thần tỉnh táo và minh mẫn, tôi xác nhận việc từ chối thực hiện hồi sinh tim phổi cho người thân của tôi khi tình trạng bệnh người thân của tôi đặt ra yêu cầu đó/ I have been explained and understood patient health condition. In mentally healthy condition, I hereby state that I am making an informed decision and agree to the donot- resuscitate order when the condition required.')"></p>
      </div> -->
      <!-- thời gian -->
      <div style="display:flex;">
        <div class="mt-10" :style="!isReadOnly ? 'mr-5' : ''"><p v-html="$t('Giờ, Ngày/Time, Date:')"></p></div>
        <div style="margin-top:8px; margin-left:5px" class="mt-10"> {{DataSubmit.DateTimeOfPatient | 'N/A'}}</div>
      </div>
      <!-- <div>Thời gian, Time: {{DataSubmit.DateTimeOfPatient || '........................................'}}</div> -->
      <div style="display:flex">
        <div><p v-html="$t('Họ và tên/ Full name')"></p></div>
        <div style="margin-top:8px; margin-left:5px; margin-right:100px" class="ml-5">{{data.IsCustormer === 'False' ? $store.state.account.CurrentPatientObj.Fullname : data.NameOfFamily}}</div>
        <p v-html="$t('Chữ ký/ Signature')"></p>
      </div>
      <!-- <p class="mt-10">Họ và tên/ Full name: {{data.IsCustormer === 'false' ? $store.state.account.CurrentPatientObj.Fullname : data.NameOfFamily}}</p>
      <p class="mt-10">Chữ ký/ Signature:........................................</p> -->
      <!-- <p class="font16 font-bold mt-20" v-html="$t('II. DÀNH CHO BÁC SĨ ĐIỀU TRỊ/ FOR MEDICAL PHYSICIAN:')"></p> -->
      <div style="display:flex; font-style: bold">
          <div><p class="font16 font-bold mt-20" style="float:left;">II.  DÀNH CHO BÁC SĨ ĐIỀU TRỊ/ </p></div>
          <div><p style="margin-left:5px; font-style: italic !important;" class="font16 font-bold mt-20 italic ml-5">FOR MEDICAL PHYSICIAN</p></div>
      </div>
      <div>
        <div style="display: flex; flex-wrap: wrap;"><p>Tên tôi là/ <span style="font-style: italic;">My name is: </span> {{data.FullNameDoctor}}, là bác sĩ điều trị của người bệnh/ <span style="font-style: italic;">is attending physician for patient</span>: {{data.Custormer}}</p></div>
      </div>
      <!-- <div style="display:flex; flex-wrap: wrap;">
          <div><p v-html="$t('Tên tôi là/ My name is:')"></p></div>
          <div style="margin-left:5px; margin-top:8px" class="ml-5">{{data.FullNameDoctor}}, </div>
          <div style="display: flex;"><p>là bác sĩ điều trị của người bệnh/</p><p>là bác sĩ điều trị của người bệnh/ is attending physician for patient:</p><p>{{data.Custormer}}</p></div>
        </div> -->
        <!-- <div style="margin-left:5px" class="ml-5">{{data.Custormer}}</div> -->
      <!-- <div style="display:flex;">
        <div><p v-html="$t('Tên tôi là/ My name is:')"></p></div>
        <div style="margin-top:8px; margin-left:5px" class="ml-5">{{data.FullNameDoctor}}, </div>
        <div class="ml-5"><p v-html="$t('là bác sĩ điều trị của người bệnh/ is attending physician for patient:')"></p></div>
        <div style="margin-top:8px; margin-left:5px" class="ml-5">{{data.Custormer}}</div>
      </div> -->
      <div v-if="data.IsCustormer === 'False'">
        <p>Tôi xác nhận rằng người bệnh {{data.Custormer}}, trong tình trạng tinh thần tỉnh táo và minh mẫn đã yêu cầu không thực hiện hồi sinh tim phổi cho người bệnh nếu tình trạng bệnh của người bệnh đặt ra yêu cầu đó. Tôi, thay mặt bệnh viện, xác nhận yêu cầu của người bệnh và tôn trọng quyết định đó của người bệnh.
        </p>
       <p style="font-style: italic !important;">I hereby certify, based on clear and convincing evidence presented to me, that patient is in mentally healthy condition and request in the event of cardiac or respiratory arrest, no resuscitation will be initiated.</p>
      </div>
      <div v-if="data.IsCustormer === 'True'">
        <p>Tôi xác nhận rằng người nhà của người bệnh {{ data.NameOfFamily}}, trong tình trạng tinh thần tỉnh táo và minh mẫn đã yêu cầu không thực hiện hồi sinh tim phổi cho người bệnh nếu tình trạng bệnh của người bệnh đặt ra yêu cầu đó. Tôi, thay mặt bệnh viện, xác nhận yêu cầu của người bệnh và tôn trọng quyết định đó của người nhà của người bệnh.
        </p>
       <p style="font-style: italic !important;">I hereby certify, based on clear and convincing evidence presented to me, that patient’s family member is in mentally healthy condition and request in the event of cardiac or respiratory arrest, no resuscitation will be initiated.</p>
      </div>
      <!-- <p>Tôi xác nhận rằng {{DataSubmit.IsCustormer === 'false' ? $store.state.account.CurrentPatientObj.Fullname : DataSubmit.NameOfFamily}}, trong tình trạng tinh thần tỉnh táo và minh mẫn đã yêu cầu không thực hiện hồi sinh tim phổi cho người bệnh nếu tình trạng bệnh của người bệnh đặt ra yêu cầu đó. Tôi, thay mặt bệnh viện, xác nhận yêu cầu của người bệnh và tôn trọng quyết định đó của người bệnh/người nhà của người bệnh. -->
      <!-- </p> -->
      <!-- <p style="font-style: italic !important;" class="italic">I hereby certify, based on clear and convincing evidence presented to me, that {{data.IsCustormer === 'False' ? $store.state.account.CurrentPatientObj.Fullname : data.NameOfFamily}} is in mentally healthy condition and request in the event of cardiac or respiratory arrest, no resuscitation will be initiated.</p> -->
      <!-- <div>Thời gian, Time: {{DataSubmit.DateTimeOfPhysician || '........................................'}}</div> -->
      <div style="display:flex;">
        <div class="mt-10" :class="!isReadOnly ? 'mr-5' : ''"><p v-html="$t('Giờ, Ngày/Time, Date:')"></p></div>
        <div style="margin-top:8px; margin-left:5px" class="mt-10">{{DataSubmit.DateTimeOfPhysician}}</div>
      </div>
      <div style="display:flex">
        <div><p v-html="$t('Họ và tên/ Full name')"></p></div>
        <div style="margin-top:8px; margin-left:5px;  margin-right:100px" class="ml-5">{{data.FullNameDoctor}}</div>
        <p v-html="$t('Chữ ký/ Signature')"></p>
      </div>
      <!-- upload -->
      <drop-files
        id="mini-upload"
        :readonly="true"
        v-model="DataSubmit.Picture"
       />
       <!-- upload2 -->
       <!-- <drop-files
        id="mini-upload"
        :readonly="true"
        v-model="DataSubmit.Picture1"
       /> -->
      </div>
    </div>
    <!-- <p class="mt-5"> A01_032_050919_VE</p> -->
  </div>
</template>
<script>
import moment from 'moment'
import DropFiles from '@/components/DropFiles.vue'
export default {
  props: ['MASTERDATA', 'DataSubmit', 'CDHA', 'hasCDHA'],
  components: {
    DropFiles
  },
  data () {
    return {
      data: null,
      userData: {},
      customer: this.$store.state.account.CurrentPatientObj
    }
  },
  created () {
    this.data = this.DataSubmit
    console.log('submit', this.DataSubmit)
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
