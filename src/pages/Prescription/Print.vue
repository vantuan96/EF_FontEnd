<template>
  <div class="BreakPage">
    <table width="100%" class="printx">
      <tbody>
        <tr>
          <td colspan="4">
            <table style="width: 100%">
              <tr>
                <td>
                  <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
                </td>
                <td>
                  <div class="text-center" style="font-size: 12pt;"><b>{{DetailData.MedicationInfo.HospitalInfo.ViName}}</b></div>
                  <div class="text-center" style="font-size: 11pt;"><b>{{DetailData.MedicationInfo.HospitalInfo.EnName}}</b></div>
                  <div class="text-center" style="font-size: 10pt;">Địa chỉ/ Add: {{DetailData.MedicationInfo.HospitalInfo.Address}}</div>
                  <div class="text-center" style="font-size: 10pt;">Điện thoại/ Tel: {{DetailData.MedicationInfo.HospitalInfo.PhoneNumber}} Hotline: {{DetailData.MedicationInfo.HospitalInfo.Hotline}} EMERGENCY: {{DetailData.MedicationInfo.HospitalInfo.Emergency}}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <VueBarcode v-if="customer.PID" v-bind:value="customer.PID" :height="30" :displayValue="true" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
                </td>
                <td>
                  <div class="text-center" style="font-size: 12pt; text-transform: uppercase;" v-if="type !== 'TP'">
                    <div class="text-center"><b>ĐƠN THUỐC/ prescription</b></div>
                    <b v-if="type !== 'A' && type !=='K'">'{{type}}'</b>
                  </div>
                  <div class="text-center" style="font-size: 12pt; text-transform: uppercase;" v-else>
                    <div class="text-center"><b>PHIẾU TƯ VẤN</b></div>
                  </div>
                </td>
              </tr>
            </table>
            <table width="100%">
              <tr>
                <td>Bệnh nhân/ Patient's name: <b>{{customer.Fullname}}</b></td>
                <td>Tuổi/Age: <b>{{customer.AgeFormated | formatAgeWithMultiLang}}</b></td>
                <td>Giới tính/ Gender: {{GENDER[customer.Gender]}}</td>
              </tr>
              <tr>
                <td>Mã đơn thuốc/ Prescription No.: {{data[0].PrescriptionCode}}</td>
                <td colspan="2">Ngày kê đơn/ Order date: {{data[0].CreatedDate | formatDate}}</td>
              </tr>
              <tr>
                <td colspan="3">Địa chỉ/ Address: {{customer.Address}}</td>
              </tr>
              <tr>
                <td>Ngày sinh/ DOB: {{customer.DateOfBirth}}</td>
                <td class="no-wrap">Chiều cao/ Height: {{DetailData.MedicationInfo.CustomerMedicationInfo.Height == '' ? '&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;' : DetailData.MedicationInfo.CustomerMedicationInfo.Height}} cm</td>
                <td class="no-wrap">Cân nặng/ Weight: {{DetailData.MedicationInfo.CustomerMedicationInfo.Weight == '' ? '&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;' : DetailData.MedicationInfo.CustomerMedicationInfo.Weight}} kg</td>
              </tr>
              <tr>
                <td>Số thẻ BHYT/ NI No.: {{customer.HealthInsuranceNumber}}</td>
                <td colspan="2">Thời hạn thẻ BHYT/ Expiry Date: {{DetailData.MedicationInfo.CustomerMedicationInfo.ExpireDate}}</td>
              </tr>
              <tr>
                <td colspan="3" v-if="this.$route.params.VisitType && this.$route.params.VisitType.includes('VMHC') && this.$route.query.VisitId === undefined">Chẩn đoán/ Diagnostic: {{DetailData.MedicationInfo.CustomerMedicationInfo.DiagnosisFromViHC}}</td>
                <td colspan="3" v-else>Chẩn đoán/ Diagnostic: {{getDiagnosis(DetailData.MedicationInfo.CustomerMedicationInfo.DiagnosisInfo)}}</td>
              </tr>
              <tr v-if="customer.Age.includes('months')">
                <td colspan="3">Họ tên người giám hộ/ Guardian's name: {{customer.Relationship}}</td>
              </tr>
              <tr v-if="customer.Age.includes('months')">
                <td colspan="3">CMND/CCCD của người giám hộ/ID No. of guardian: {{customer.RelationshipID}}</td>
              </tr>
              <tr>
                <td colspan="3" style="color: red;">Dị ứng/ Allergies: {{DetailData.MedicationInfo.CustomerMedicationInfo.Allergy}}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <p v-if="type !== 'TP'"><b style="font-size: 11pt;border-bottom: 2px solid #000;padding-bottom: 5px;">Chỉ định thuốc/ Medication:  {{"   "}}</b></p>
            <p v-else><b style="font-size: 11pt;border-bottom: 2px solid #000;padding-bottom: 5px;">Có thể dùng phối hợp thêm/ Can use in combination with:  {{"   "}}</b></p>
            <div class="text-center"><i>Lưu ý: Chỉ sử dụng đúng liều được Bác sỹ kê đơn.</i></div>
            <div class="text-center"><i>Note: Only use the correct dose prescribed by the doctor.</i></div>
          </td>
        </tr>
        <tr :key="index" v-for="(item ,index) in sortPharmacies(data)" style="border-bottom: 2px dashed #ccc;">
          <th class="text-center" style="width: 40px;vertical-align: top;">{{index + 1}}</th>
          <td class="lh-1">
            <div><b>{{item.PharmacyName}}</b></div>
            <div style="display: flex;">
              <p style="margin-right: 10px;line-height: 1;" class="no-wrap">Sử dụng/ Usage:</p>
              <p style="line-height: 1;">{{trim_(item.Usage, '\n')}}<template v-if="item.Note">{{'\nGhi chú: ' + item.Note}}</template></p>
            </div>
          </td>
          <th class="text-center" style="width: 100px;vertical-align: top;">{{item.Quantity}}</th>
        </tr>
        <tr v-if="type === 'N' || type ==='H'" >
          <td colspan="4">
            <div style="margin-top: 10px; margin-bottom: 10px;" class="only-web-page">
              <b>Đợt/ Episode: </b>
              <span style="display: inline-block !important;">
                <MDNumberInput v-model="RoundInfo.Round" style="padding-top: 3px; padding-bottom: 3px; "/>
              </span>
              <b style="margin-left: 20px;">Từ ngày/ From:</b>
              <!-- v-if="RoundInfo.FromDate" -->
              <span>
                <div class="inputCustom" style="display: inline-block">
                  <v-date-picker  v-model="RoundInfo.FromDate" :hideTooltip="true" :allday="'allday'" @input="setMinDate" />
                </div>
              </span>
              <b style="margin-left: 20px;">Đến hết ngày/ To:</b>
              <!-- v-if="RoundInfo.ToDate" -->
              <span>
                <div class="inputCustom" style="display: inline-block">
                  <v-date-picker  v-model="RoundInfo.ToDate" :hideTooltip="true"  :minDate="fromDate"/>
                </div>
              </span>
              <span>
                <button type="button" class="btn v-yellow-btn" style="width: 10%; padding-top: 6px !important;" v-shortkey="['ctrl', 's']" @shortkey="saveRoundInfo()" @click="saveRoundInfo"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
              </span>
            </div>
            <div style="margin-top: 10px; margin-bottom: 10px;" class="only-print-page">
              <b>Đợt/ Episode: </b>
              <span>{{RoundInfo.Round}}</span>
              <b style="margin-left: 20px;">Từ ngày/ From:</b>
              <span>{{RoundInfo.FromDate}}</span>
              <b style="margin-left: 20px;">Đến ngày/ To:</b>
              <span>{{RoundInfo.ToDate}}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <div style="overflow: hidden;margin-bottom: 10px;" class="only-web-page">
              <p><b style="font-size: 11pt;border-bottom: 1px solid #000;padding-bottom: 5px;">Lời dặn của bác sĩ/ Advice of doctor:  {{"   "}}</b></p>
              <div class="flex-box" v-if="this.DetailData.ListPharmacies[0].PrescriberAD.toUpperCase() !== '' && (_currentUserName.toUpperCase() === this.DetailData.ListPharmacies[0].PrescriberAD.toUpperCase())">
                <VTextarea v-model="note" style="flex-grow: 1; flex-shrink: 0; margin-right: 10px;" id="prescriptionNote"/>
                <button type="button" class="btn btn-block v-yellow-btn" style="width: 10%" v-shortkey="['ctrl', 's']" @shortkey="saveNotes()" @click="saveNotes"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
              </div>
              <p v-else style="color: red !important;">{{note}}</p>
            </div>
            <div style="overflow: hidden;" class="only-print-page">
              <p><b style="font-size: 11pt;border-bottom: 2px solid #000;padding-bottom: 3px;">Lời dặn của bác sĩ/ Advice of doctor: </b> {{note}}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <table width="100%">
              <tr>
                <td class="text-center" width="33%" style="vertical-align: top;">
                </td>
                <td class="text-center no-wrap" width="33%" style="vertical-align: top;">
                </td>
                <td class="text-center no-wrap" style="vertical-align: top;">
                  <div class="text-center">{{data[0].CreatedDate | formatDate}}</div>
                </td>
              </tr>
              <tr>
                <td class="text-center" width="33%" style="vertical-align: top;">
                  <div class="text-center"><b>Bệnh nhân ký ghi rõ họ tên</b></div>Patient (Full name and Signnature)
                </td>
                <td class="text-center no-wrap" width="33%" style="vertical-align: top;">
                  <div class="text-center"><b>Người cấp phát thuốc</b></div>(Dispensed by)
                </td>
                <td class="text-center no-wrap" style="vertical-align: top;">
                  <div  class="text-center"><b>Bác sĩ ký và ghi tên</b></div>Doctor (Full name and Signnature)
                </td>
              </tr>
              <tr style="visibility: hidden;">
                <td class="text-center" width="33%">
                  <div class="text-center"><b>Bệnh nhân ký ghi rõ họ tên</b></div>Patient (Full name and Signnature)
                </td>
                <td class="text-center no-wrap" width="33%">
                  <div class="text-center"><b>Người cấp phát thuốc</b></div>(Dispensed by)
                </td>
                <td class="text-center no-wrap">
                  <div class="text-center"><b>Bác sĩ ký và ghi tên</b></div>Doctor (Full name and Signnature)
                </td>
              </tr>
              <tr>
                <td class="text-center" width="33%">
                </td>
                <td class="text-center no-wrap" width="33%">
                </td>
                <td class="text-center no-wrap">
                  <br/>
                  <div class="text-center"><b>{{data[0].PrescriberName}}</b></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
      <tfoot class="only-web-page">
        <tr>
          <td colspan="4">
            <div class="text-center" style="color: red"><span><b>Chú ý:</b><i> Để được sắp xếp lịch hẹn khám, quý khách đặt hẹn với tổng đài trước khi đến bệnh viện.</i></span></div>
            <div class="text-center" style="color: red"><span><b>Note:</b><i> To schedule an appointment, please contact our call center to book before coming to the hospital.</i></span></div>
            <table width="100%">
              <tr>
                <td class="text-center" width="50%" style="vertical-align: top;color: red">
                  <span style="font-size: 12px !important;"><b>Nhà thuốc Bệnh viện Vinmec:</b><br> Tư vấn sử dụng thuốc an toàn, hiệu quả <br> Cung cấp thuốc đảm bảo chất lượng - Giá thuốc cạnh tranh</span>
                </td>
                <td class="text-center" style="vertical-align: top;color: red">
                  <span style="font-size: 12px !important;"><b>Vinmec pharmacy:</b><br>Implementing safe and effective medication counselling service<br>Providing high quality medicines with competitive price</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
// import $ from 'jquery'
import _ from 'lodash'
// import moment from 'moment'
import VueBarcode from 'vue-barcode'
import constants from '@/constants'
import Prescription from '@/services/Prescription'
import moment from 'moment'

export default {
  name: 'Printerx',
  props: ['customer', 'data', 'type', 'DetailData'],
  data () {
    return {
      GENDER: constants.GENDERS,
      DataSubmit: {
      },
      note: '',
      RoundInfo: {
        Round: '',
        FromDate: null,
        ToDate: null
      },
      fromDate: null,
      isViewOnly: true
    }
  },
  components: {
    VueBarcode
  },
  mounted () {
    this.getData()
    this.getRoundInfo()
    if (this.DetailData.ListPharmacies[0].PrescriberAD.toUpperCase() !== '' && (this._currentUserName.toUpperCase() === this.DetailData.ListPharmacies[0].PrescriberAD.toUpperCase())) {
      this.isViewOnly = false
    }
  },
  computed: {
  },
  methods: {
    getData () {
      this.note = (this.DetailData.Notes.find(e => e.PrescriptionType === this.type) || {}).Note
    },
    saveNotes () {
      new Prescription().create({PrescriptionId: this.DetailData.ListPharmacies[0].PrescriptionId, Note: this.note, PrescriptionType: this.type}, `/Note/Create`).then(response => {
        if (response.ViMessage === 'Thành công') {
          this.toastedSuccess()
        }
      })
    },
    sortPharmacies (data) {
      if (this.DetailData.SortBy === '1') {
        data = _.orderBy(data, ['OrderReferenceNumber'], ['asc'])
        return data
      } else if (this.DetailData.SortBy === '2') {
        var newData = [...data]
        newData.forEach(element => {
          element.SeqNum = element.SeqNum.padStart(3, '0')
        })
        data = newData.map(function (element) {
          return {...element, newSeq: `${element.SeqNum}${element.NameSX}`}
        })
        data = _.orderBy(data, ['newSeq'], ['asc'])
        return data
      } else {
        data = _.orderBy(data, ['OrderReferenceNumber'], ['asc'])
        return data
      }
    },
    saveRoundInfo () {
      new Prescription().create({
        PrescriptionId: this.DetailData.ListPharmacies[0].PrescriptionId,
        Round: this.RoundInfo.Round,
        FromDate: this.RoundInfo.FromDate,
        ToDate: this.RoundInfo.ToDate,
        PrescriptionType: this.type
      }, '/RoundInfo/Create').then(response => {
        if (response.ViMessage === 'Thành công') {
          this.toastedSuccess()
        }
      })
    },
    getRoundInfo () {
      if (this.DetailData.RoundInfo.length > 0) {
        this.RoundInfo.Round = (this.DetailData.RoundInfo.find(e => e.PrescriptionType === this.type) || {}).Round
        this.RoundInfo.FromDate = moment((this.DetailData.RoundInfo.find(e => e.PrescriptionType === this.type) || {}).FromDate).format('DD/MM/YYYY')
        this.RoundInfo.ToDate = moment((this.DetailData.RoundInfo.find(e => e.PrescriptionType === this.type) || {}).ToDate).format('DD/MM/YYYY')
        this.fromDate = moment(this.RoundInfo.FromDate).format('DD/MM/YYYY')
        if (this.RoundInfo.FromDate.toString() === 'Invalid date') {
          this.RoundInfo.FromDate = null
        }

        if (this.RoundInfo.ToDate.toString() === 'Invalid date') {
          this.RoundInfo.ToDate = null
        }
      }
    },
    setMinDate () {
      this.fromDate = moment(this.RoundInfo.FromDate).format('DD/MM/YYYY')
    }
  }
}
</script>
<style >
#prescriptionNote > textarea {
  color: red !important;
  border-color: red !important;
}
</style>
