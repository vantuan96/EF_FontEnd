<template>
  <table id="ylenh" class="print t1" style="width: 100%">
    <thead>
      <tr>
        <td colspan="999">
          <div style="display: flex; justify-content: space-around;">
            <div>
              <embed height="120px" width="120px" src="static/img/logo_vinmec.svg"  class="text-center" style="justify-content: center;" />
            </div>
            <div style="text-align: center;">
              <div class="text-center" style="font-size: 15pt; padding: 5px; ">
                <b style="font-size: 16pt !important">{{IPDPrescriptions[0].HospitalInfo.ViName}}</b>
              </div>
              <div class="text-center" style="font-size: 15pt; padding: 5px">
                <b style="font-size: 16pt !important">{{IPDPrescriptions[0].HospitalInfo.EnName}}</b>
              </div>
              <div class="text-center" style="font-size: 12pt; padding: 5px">
                Địa chỉ/ Add:{{ IPDPrescriptions[0].HospitalInfo.Address }}
              </div>
              <div class="text-center" style="font-size: 12pt; padding: 5px">
                Điện thoại/ Tel:
                {{IPDPrescriptions[0].HospitalInfo.PhoneNumber}}
                Hotline: {{ IPDPrescriptions[0].HospitalInfo.Hotline }}
                EMERGENCY:{{ IPDPrescriptions[0].HospitalInfo.Emergency }}
              </div>
            </div>
          </div>
          <div style="justify-content: center; text-align: center;">
            <div class="text-center" style="padding: 5px; display: flex; justify-content: center;">
              <p><b style="width: 80%; padding-left: 20px; font-size: 15pt !important">{{Title}}</b></p>
              <div id="pageNumber" style="display: flex; justify-content: center; width: 20%; visibility: hidden">
                <p>Tờ số/ No &#160;&#160;</p>
                <div style="height: 30px; width: 50px; border: 1px solid black"></div>
              </div>
            </div>
            <div class="text-center" style="font-size: 12pt; padding: 5px">
              (Thời gian từ/ From: 09:00:00 ngày <b>{{ FromDate }}</b> - Đến/ To 08:59:00 ngày <b>{{ ToDate }}</b>)
            </div>
            <div class="text-center" style="font-size: 12pt; padding: 5px">
              {{ IPDPrescriptions[0].PatientArea }}
            </div>
          </div>
          <div style="font-size: 12pt;">
            <div style="display: flex; justify-content: start;">
              <div style="width: 54%; font-size: 12pt;" class="infoRow1">
                Bệnh nhân/ Patient's name: <b style="font-size: 13pt; text-align: left !important;">{{ Customer.Fullname }}</b>
              </div>
            </div>
            <div style="display: flex; justify-content: start; font-size: 12pt;">
              Địa chỉ/ Address: {{ Customer.Address }}
            </div>
            <div style="display: flex; justify-content: start;">
              <div style="width: 25%; font-size: 12pt;">
                Ngày sinh/ DOB: {{Customer.DateOfBirth}}
              </div>
              <div style="width: 25%; font-size: 12pt;" class="infoRow1">Mã BN/ HN: <b>{{ Customer.PID }}</b></div>
              <div class="infoRow1" style="font-size: 12pt;">
                Giới tính/ Gender: {{ GENDER[Customer.Gender] }}
              </div>
            </div>
            <div style="display: flex; justify-content: start;">
              <div style="width: 25%; font-size: 12pt;" v-if="!IsMommy">
                Chiều cao/ Height: {{(MedicationAdministrationRecordInfo.CustomerMedicationInfo.Height == '' || MedicationAdministrationRecordInfo.CustomerMedicationInfo.Height == null) ? '&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;' : MedicationAdministrationRecordInfo.CustomerMedicationInfo.Height}} cm
              </div>
              <div style="width: 25%; font-size: 12pt;" v-else>
                Chiều cao/ Height: {{(BabyVitalSigns.Height == '' || BabyVitalSigns.Height == null) ? '&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;' : BabyVitalSigns.Height}} cm
              </div>
              <div style="width: 25%; font-size: 12pt;" v-if="!IsMommy">
                Cân nặng/ Weight: {{(MedicationAdministrationRecordInfo.CustomerMedicationInfo.Weight == '' || MedicationAdministrationRecordInfo.CustomerMedicationInfo.Weight == null)  ? '&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;' : MedicationAdministrationRecordInfo.CustomerMedicationInfo.Weight}} kg
              </div>
              <div style="width: 25%; font-size: 12pt;" v-else>
                Cân nặng/ Weight: {{(BabyVitalSigns.Weight == '' || BabyVitalSigns.Weight == null)  ? '&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;' : BabyVitalSigns.Weight}} kg
              </div>
              <div style="font-size: 12pt;" v-if="MedicationAdministrationRecordInfo.CustomerMedicationInfo.IsOver18Age">{{MedicationAdministrationRecordInfo.CustomerMedicationInfo.BMI}}</div>
            </div>
            <div style="display: flex; justify-content: start;">
              <div style="width: 50%; font-size: 12pt;">
                Số thẻ BHYT/ NI No.: {{Customer.HealthInsuranceNumber}}
              </div>
              <div style="font-size: 12pt;">
                Thời hạn thẻ BHYT/ Expiry Date: {{MedicationAdministrationRecordInfo.CustomerMedicationInfo.ExpireDate}}
              </div>
            </div>
            <div style="font-size: 12pt;" v-if="!IsMommy">
              Chẩn đoán/ Diagnostic: {{getDiagnosis(MedicationAdministrationRecordInfo.CustomerMedicationInfo.DiagnosisInfo)}}
            </div>
            <div style="font-size: 12pt;" v-else>
              Chẩn đoán/ Diagnostic:
            </div>
            <div id="dietCodeChoice" v-if="isViewOnly === false">
              <label for="">Chế độ dinh dưỡng:</label>
              <div style="display: flex">
                <DietCode v-model="DietCode" style="width: 80%" />
                <button type="button" class="btn v-yellow-btn" style="width: 10%; margin-left: 12px;" @click="saveDietCode"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
              </div>
            </div>
            <div id="dietCodeShow" v-else>
              <p style="font-size: 12pt;">Chế độ dinh dưỡng: {{DietCodeView}}</p>
            </div>
            <div id="dietCodeView">
              <p style="font-size: 12pt;">Chế độ dinh dưỡng: {{DietCodeView}}</p>
            </div>
            <div style="color: red; font-size: 12pt;" v-if="!IsMommy">
              Dị ứng/ Allergies: {{MedicationAdministrationRecordInfo.CustomerMedicationInfo.Allergy}}
            </div>
            <div style="color: red; font-size: 12pt;" v-else>
              Dị ứng/ Allergies:
            </div>
            <div style="margin-bottom: 15px;">
              <b style="text-decoration: underline;">{{MedicationText}}</b>
            </div>
          </div>
        </td>
      </tr>
    </thead>
    <tbody class="tbl-b">
      <tr>
        <th colspan="6" class="text-center">Kế hoạch dùng thuốc/ Scheduled</th>
      </tr>
      <tr>
        <th style="width: 4mm"></th>
        <th style="width: 30mm; text-align: center">
          Bắt đầu/ Kết thúc <br>
          Start/ Stop
        </th>
        <th style="width: 70mm; text-align: center">Thuốc/ Medication</th>
        <th style="width: 20mm; text-align: center">
          Nguồn/ Source
        </th>
        <th style="width: 20mm; text-align: center" >09:00 - 21:29</th>
        <th style="width: 20mm; text-align: center" >21:30 - 08:59</th>
      </tr>
      <tr :key="index" v-for="(item, index) in IPDPrescriptions">
        <td style="width: 4mm; text-align: center">
          <div style="height: 30px; width: 30px; border: 1px solid black; margin: auto"></div>
        </td>
        <td style="width: 30mm; text-align: center">
          <p style="text-align: center">{{ item.StartDate | formatDateWithoutSecon }}</p>
          <p v-if="item.StopDate != null" style="text-align: center"><br>{{item.StopDate | formatDateWithoutSecon}}</p>
        </td>
        <td style="width: 70mm">
          <p>
            <b>{{ item.PharmacyName }}</b><br />{{ item.Usage }}<br><template v-if="item.Note != null">Ghi chú: {{item.Note}}</template>
          </p>
        </td>
        <td style="width: 20mm;text-align: center">
          <p>{{ item.PharmacySource }}</p>
        </td>
        <td style="width: 18mm; text-align: center">
          <p v-html="item.Shift01" style="text-align: center"></p>
        </td>
        <td style="width: 18mm; text-align: center">
          <p v-html="item.Shift02" style="text-align: center"></p>
        </td>
      </tr>
      <tr></tr>
      <tr id="rowChanKi" style="visibility: hidden; border: 0px; border-style: hidden !important;" class="trChanKi" >
        <td id="rowBS" colspan="999" >
          <div style="text-align: right; padding-top: 30px !important; margin-right: 20px;"><b>Bác sĩ ký và ghi tên</b></div>
          <p style="text-align: right;"><i>Doctor (Full name and Signature)</i></p>
          <br><br><br><br>
          <p v-if="SelectedDoctorFullname !== ''" style="text-align: right; margin-right: 20px;">{{SelectedDoctorFullname}}</p>
          <div style="text-align: center; margin-top: 100px;">
            <b style="text-align: center">Chú ý:</b> Để được sắp xếp lịch hẹn khám, quý khách đặt hẹn với tổng đài trước khi đến viện.<br>
            <b style="text-align: center">Note:</b> To schedule an appointment, please contact our call center to book before comming to the hospital.
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import constants from '@/constants'
import DietCode from '@/components/global/DietCode.vue'
import MedicationAdministrationRecord from '@/services/MedicationAdministrationRecord'

export default {
  name: 'ViewToPrint',
  props: [
    'IPDPrescriptions',
    'MedicationAdministrationRecordInfo',
    'FromDate',
    'ToDate',
    'Customer',
    'ListGroupByVisitCode',
    'Title',
    'MedicationText',
    'VisitCode',
    'PrescriptionCode',
    'ListMedicationAdministrationRecords',
    'BabyVitalSigns',
    'IsMommy',
    'SelectedDoctorFullname'
  ],
  components: {DietCode},
  data () {
    return {
      GENDER: constants.GENDERS,
      DataSubmit: {},
      DietCodeView: '',
      DietCode: [],
      listItems: [],
      isViewOnly: true
    }
  },
  mounted () {
    this.filterViaVisitCode()
    this.$on('filterViaVisitCode', this.filterViaVisitCode())
    this.DietCodeView = ''
    this.DietCodeView = this.DietCode.map(e => e.code).join(', ')
    this.checkViewOnly()
  },
  methods: {
    saveDietCode () {
      this.DataSubmit.DietCode = JSON.stringify(this.DietCode)
      this.DataSubmit.VisitCode = this.VisitCode
      this.DataSubmit.PrescriptionCode = this.PrescriptionCode
      this.DataSubmit.PID = this.Customer.PID
      this.DataSubmit.VisitId = ''
      new MedicationAdministrationRecord().create(this.DataSubmit, '/DietCode/Create')
        .then(response => {
          this.toastedSuccess()
          this.DietCodeView = ''
          this.DietCodeView = this.DietCode.map(e => e.code).join(',')
          this.reload()
        })
    },
    filterViaVisitCode () {
      this.listItems = this.ListMedicationAdministrationRecords
      if (this.listItems.length > 0) {
        this.listItems = this.listItems.filter(item => item.VisitCode === this.VisitCode)
      }
      if (this.listItems.length > 0) {
        if (this.listItems[0].DietCode.trim() !== '""') {
          this.DietCode = JSON.parse(this.listItems[0].DietCode)
        } else {
          this.DietCode = []
        }
      } else {
        this.DietCode = []
      }
    },
    checkViewOnly () {
      var primaryDoctorAd = this.IPDPrescriptions.map(e => e.PrimaryDoctorAD.toLowerCase())
      var prescriberAD = this.IPDPrescriptions.map(e => e.PrescriberAD.toLowerCase())
      var doctors = primaryDoctorAd.concat(prescriberAD)
      var user = this.getUser()
      doctors.forEach(element => {
        if (element === user.toLowerCase()) {
          this.isViewOnly = false
          return true
        }
      })
    }
  }
}
</script>
<style scoped>
  #dietCodeView {
    display: none;
  }
</style>
