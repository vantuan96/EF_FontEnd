<template>
  <div>
    <table width="100%" class="tbl-b2">
      <tr>
        <td colspan="2">
          <div style="position: relative;">
            <div class="fw600 fs20">III. HỎI BỆNH:</div>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDOENHPI']">
        <td><b>{{dex[1]}} Quá trình bệnh lý:</b> <br>{{MASTERDATA['OPDOENHPI'].Items[0].Value}}</td>
      </tr>
      <tr>
        <td><b>{{dex[2]}} Tiền sử bệnh:</b></td><br>
      </tr>
      <tr>
        <td colspan="2" v-if="!showWithClinic('FreeTextOnly-000') && MASTERDATA['OPDOENPMH']">
          <div><b>- Bản thân:</b></div>
          <div class="mrl10"> + Tiền sử bệnh - Bản thân: {{MASTERDATA['OPDOENPMH'].Items[0].Value}}</div>
          <div class="mrl10"> + Tiền sử dị ứng: {{MASTERDATA['OPDOENHOA'].Items[0].Value}}</div>
        </td>
        <td colspan="2" v-else-if="showWithClinic('FreeTextOnly-000')">
          <div><b>- Bản thân:</b></div>
          <div class="mrl10"> + Tiền sử bệnh - Bản thân: {{MedicalHistory}}</div>
          <div class="mrl10"> + Tiền sử dị ứng: {{MASTERDATA['OPDOENHOA'].Items[0].Value}}</div>
        </td>
      </tr>
      <tr>
        <td colspan="2" v-if="MASTERDATA['OPDOENPT621']">
          <div><b>- Gia đình:</b> {{VisitVersion >= 12 ? MASTERDATA['OPDOENPT621'].Items[0].Value : ''}}</div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import MixinForm from '@/mixins/FormOutpatientExaminationNew.js'
import MedicalRecordMixinForm from '@/pages/IPD/MedicalRecord/Mixin.js'
export default {
  /**
   * The name of the page.
   */
  name: 'OPDMedicalRecordPrinterPart1',
  mixins: [MixinForm, MedicalRecordMixinForm],
  props: [
    'routeType',
    'ListSoSinh',
    'optionChild',
    'infoCustomer',
    'DataSubmit',
    'MASTERDATA',
    'VisitVersion'
  ],
  data () {
    return {
      MedicalHistoryData: ['OPDOENTSSK', 'OPDOENTSK', 'OPDOENTSKN'],
      hasData: false,
      icd10Code: ['IPDMRPTICDTANSx', 'IPDMRPTICDKANSx', 'IPDMRPTICDCANSx', 'IPDMRPTICDPANS', 'IPDMRPTICDTANSx', 'IPDMRPTICDKANSx', 'IPDMRPEICDCANSx', 'IPDMRPEICDPANS'],
      InterHospitalInfoTo: '',
      InterHospitalInfo: [
        {
          ViName: '1. Tuyến trên',
          EnName: '1. Tuyến trên',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVITTR',
          Value: ''
        },
        {
          ViName: '2. Tuyến dưới',
          EnName: '2. Tuyến dưới',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVITDU',
          Value: ''
        },
        {
          ViName: '3. Chuyên khoa',
          EnName: '3. Chuyên khoa',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVICKH',
          Value: ''
        }
      ],
      VisitTypes: [
        {
          ViName: '1. Cấp cứu',
          EnName: '1. Cấp cứu',
          DataType: 'Checkbox',
          Value: 'ED'
        },
        {
          ViName: '2. Khoa khám bệnh',
          EnName: '2. Khoa khám bệnh',
          DataType: 'Checkbox',
          Value: 'OPD'
        },
        {
          ViName: '3. Khoa điều trị',
          EnName: '3. Khoa điều trị',
          DataType: 'Checkbox',
          Value: 'IPD'
        }
      ],
      NgheNghiepMeCode: null,
      NgheNghiepBoCode: null,
      dex: [],
      indexs: []
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
    console.log(this.DataSubmit, 'check datasubmit ')
    this.dex = this.getIndex(this.$route.meta.type)
  },
  computed: {
    age () {
      if (this.infoCustomer) {
        return this.infoCustomer.AgeFormated.split('-')
      }
      return ''
    },
    MedicalHistory: function () {
      if (this.MASTERDATA['OPDOENTSSK'] && this.MASTERDATA['OPDOENTSKN'] && this.MASTERDATA['OPDOENTSK']) {
        var arrData = []
        for (let i of this.MedicalHistoryData) {
          const data = this.MASTERDATA[i].Items[0].Value
          if (data) {
            arrData.push(data)
          }
        }
        return arrData.join(', ')
      }
      return null
    }
  },
  methods: {
    showWithClinic (codes) {
      let check = false
      if (codes === 'Normal' && this.DataSubmit && this.DataSubmit.SetupClinic && !this.DataSubmit.SetupClinic.length) {
        check = true
      }
      if (this.DataSubmit && this.DataSubmit.SetupClinic && this.DataSubmit.SetupClinic.length) {
        this.DataSubmit.SetupClinic.forEach(code => {
          if (codes.includes(code)) {
            check = true
          }
        })
      }
      return check
    },
    getTypeAge (str) {
      let obj = {}
      if (str === 'DD') {
        obj = {
          ViName: 'Ngày',
          EnName: 'Day'
        }
      }
      if (str === 'MM') {
        obj = {
          ViName: 'Tháng',
          EnName: 'Month'
        }
      }
      if (str === 'YYYY') {
        obj = {
          ViName: 'Năm',
          EnName: 'Year'
        }
      }
      return obj
    }
  }
}
</script>
<style scoped>
.tuoi {
  top: 25px!important;
}
</style>
