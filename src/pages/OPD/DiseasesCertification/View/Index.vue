<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" :id="printId || 'printMeTranslate'">
      <div class="text-center" style="text-align: center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px">GIẤY XÁC NHẬN TÌNH TRẠNG BỆNH TẬT</h2>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px"><i>MEDICAL CERTIFICATE</i></h2>
      <p class="text-center mt-40">{{dataParent.Hospital.ViName}} XÁC NHẬN/ {{dataParent.Hospital.EnName}}:</p>
      <div class="mt-20" style="display: flex">
        <div style="width:70%"><p><b>Bệnh nhân/ <i>Patient’s name</i>: {{data.Fullname}}</b></p></div>
        <div><p><b>Giới tính/ <i>Gender</i>:</b>{{data.Gender}}</p></div>
      </div>
      <p><b>Ngày sinh/ <i>D.O.B</i>:</b>  {{data.DateOfBirth}}</p>
      <p><b>Họ tên bố/ <i>Father’s full name</i>:</b> {{dataParent.FatherCustumer ? dataParent.FatherCustumer : data.FatherCustumer}}</p>
      <p><b>Họ tên mẹ/ <i>Mother’s full name</i>:</b> {{dataParent.MotherCustumer ? dataParent.MotherCustumer : data.MotherCustumer }}</p>
      <p><b>Địa chỉ/ <i>Address</i>: </b>{{data.Address}}</p>
      <p>Đã khám ngoại trú taị bệnh viện đa khoa quốc tế Vinmec/ <i>Outpatient visits at Vinmec International Hospital</i></p>
      <div class="mt-10" style="display: flex">
        <div style="width:40%"><p><b>Số hồ sơ/ <i>PID</i>:</b> {{data.PID}}</p></div>
        <div><p><b>Ngày khám/ <i>Date of visit</i>:</b> ngày/ <i>day</i> {{nowDate.day}} tháng/ <i>month</i> {{nowDate.month}} năm/ <i>year</i> {{nowDate.year}}</p></div>
      </div>
      <p><b>Chẩn đoán/ <i>Diagnosis</i>:</b>  {{data.Diagnosis}}</p>
      <p><b>Hướng điều trị/ <i>Treatment plans</i>:</b>  {{data.TreatmentPlans}}</p>
      <div style="display: flex">
        <div style="width:50%; float: right">
        <br/>
        <br/>
        <p style="font-weight: bold; margin-left:20px">Xác nhận của bệnh viện/ <i>Hospital’s confirmation</i></p>
        <br/>
        <div style="display: flex">
          <div>
            <p>Chữ ký của bác sĩ/ <i>Doctor's signature</i>: {{dataParent.UserDoctorConfirmed.FullName}}</p>
            </div>
          <div class="ml-20" style="margin-top:-10px" v-if="!dataParent.UserHospitalConfirmation.UserName && !viewOnly"></div>
        </div>
        <p>Công tác tại khoa/ <i>Working at Department of</i>:  {{dataParent.Specialty.ViName}}</p>
        <p>Bệnh viện đa khoa quốc tế Vinmmec là đúng/ <i>At Vinmec International General Hospital is valid</i></p>
        <p style="font-style: italic">
          {{dataParent.Location}}, ngày/ <i>day</i> {{nowDate.day}} tháng/ <i>month</i> {{nowDate.month}} năm/ <i>year</i> {{nowDate.year}}
        </p>
        <br/>
        <br/>
        <p v-if="dataParent.UserHospitalConfirmation.UserName" style="margin-left:10px">{{dataParent.UserHospitalConfirmation.FullName}}</p>
        </div>
        <div style="width:50%; float: right">
        <p style="font-style: italic">
          {{dataParent.Location}}, ngày/ <i>day</i> {{nowDate.day}} tháng/ <i>month</i> {{nowDate.month}} năm/ <i>year</i> {{nowDate.year}}
        </p>
        <p class="text-center" style="font-weight: bold;">Bác sĩ/ <i>Doctor</i></p>
        <p class="text-center" style="font-style: italic">(Ký, ghi rõ họ tên)</p>
        <p class="text-center" v-if="!dataParent.UserDoctorConfirmed.UserName && !viewOnly"></p>
        <br/>
        <br/>
        <p class="text-center" v-if="dataParent.UserDoctorConfirmed.UserName">{{dataParent.UserDoctorConfirmed.FullName}}</p>
        </div>
      </div>
       <br/>
      <br/>
    </div>
    <p>A01_215_030820_V</p>
    <div v-if="isTranView" class="print-area">
        <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
    </div>
  </div>
</template>
<script>
/* ============
 * The home index page.
 */

export default {
  /**
   * The name of the page.
   */
  name: 'OPDDiseasesCertification-View',
  props: ['data', 'isTranView', 'printId', 'site', 'Status', 'PkntVersion', 'user', 'nowDate', 'dataParent'],
  mixins: [],
  data () {
    return {
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
    // this.nowDate = {
    //   day: date.getDate(),
    //   month: date.getMonth(),
    //   year: date.getFullYear()
    // }
    // console.log('now', this.nowDate)
  },
  computed: {
    HealthInsuranceNumber () {
      if (this.data.HealthInsuranceNumber) {
        var arr = this.data.HealthInsuranceNumber.split(' ')
        return arr.length === 4 ? arr : null
      }
      return null
    }
  },
  methods: {
    print () {
      this.$htmlToPaper(this.printId || 'printMeTranslate', false, 'A01_215_030820_V')
    }
  }
}
</script>
