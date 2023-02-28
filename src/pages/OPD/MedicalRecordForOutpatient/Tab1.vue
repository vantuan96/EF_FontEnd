<template>
  <div v-if="infoCustomer">
    <table width="100%" class="tbl-b2">
      <tr>
        <td colspan="2">
          <div style="position: relative;">
            <div class="fw600 fs20">I. HÀNH CHÍNH:</div>
            <div class="tuoi" style="position: absolute;top: 8px!important;right: 0px;">
              Tuổi
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td width="49%">{{dex[1]}} Họ và tên <i>(In hoa)</i>: {{infoCustomer.Fullname | touppercase}}</td>
        <td>
          <div class="flex align-center space-between">
            <div class="inline">{{dex[2]}} Sinh ngày:</div>
            <CharWithSquare class="inline" v-if="infoCustomer" :text="infoCustomer.DateOfBirth ? infoCustomer.DateOfBirth.replace(/[^\w\s]/gi, '') : ''"  />
            <div class="inline" style="position: relative;"><CharWithSquare :text="age[0]" :defaultlength="2"  />
              <div style="position: absolute;right: -42px;top: 5px;" v-if="age && age.length">{{getTypeAge(age[1]).ViName}}</div>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          {{dex[3]}} Giới:
          <span style="margin-left: 10px;">
          1. Nam <span class="square-text" :class="infoCustomer.Gender === 1 ? '' : 'hidden-text'">&#10003;</span> <span style="margin-left: 20px"></span>
          2. Nữ <span class="square-text" :class="infoCustomer.Gender === 0 ? '' : 'hidden-text'">&#10003;</span>
          </span>
        </td>
        <td>
          <div class="flex align-center space-between">
            <div class="inline">{{dex[4]}} Nghề nghiệp: {{infoCustomer.MOHJob}}</div>
            <div class="inline" style="position: relative;"><CharWithSquare :text="infoCustomer.MOHJobCode" :defaultlength="2" /></div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="flex align-center space-between">
            <div class="inline">{{dex[5]}} Dân tộc: {{infoCustomer.MOHEthnic}}</div>
            <div class="inline" style="position: relative;"><CharWithSquare :text="infoCustomer.MOHEthnicCode" :defaultlength="2" /></div>
          </div>
        </td>
        <td>
          <div class="flex align-center space-between">
            <div class="inline">{{dex[6]}} Ngoại kiều: {{infoCustomer.MOHNationality}}</div>
            <div class="inline" style="position: relative;"><CharWithSquare :text="infoCustomer.MOHNationalityCode" :defaultlength="2" /></div>
          </div>
        </td>
        <!-- <td>{{dex[5]}} Dân tộc: {{infoCustomer.MOHEthnic}}<div class="float-right"><CharWithSquare :text="infoCustomer.MOHEthnicCode" :defaultlength="2"  /></div></td>
        <td>
          {{dex[6]}} Ngoại kiều: {{infoCustomer.MOHNationality}}<div class="float-right"><CharWithSquare :text="infoCustomer.MOHNationalityCode" :defaultlength="2"  /></div>
        </td> -->
      </tr>
      <tr>
        <td colspan="2"><div>{{dex[7]}} Địa chỉ: {{infoCustomer.MOHAddress}}</div></td>
      </tr>
      <tr>
        <td>
          <div class="flex align-center space-between">
            <div class="inline">Huyện (Quận, Thị xã): {{infoCustomer.MOHDistrict}}</div>
            <div class="inline" style="position: relative;"><CharWithSquare :text="infoCustomer.MOHDistrictCode" :defaultlength="2" /></div>
          </div>
        </td>
        <td>
          <div class="flex align-center space-between">
            <div class="inline">Tỉnh, Thành phố: {{infoCustomer.MOHProvince}}</div>
            <div class="inline" style="position: relative;"><CharWithSquare :text="infoCustomer.MOHProvinceCode" :defaultlength="2" /></div>
          </div>
        </td>
        <!-- <td>
          <div class="mr10">
            <div class="flex space-between">
              <div>Huyện (Quận, Thị xã):</div>
              <div style="margin-top: 4px;">{{infoCustomer.MOHDistrict}}</div>
              <div><CharWithSquare :text="infoCustomer.MOHDistrictCode" :defaultlength="2"/></div>
            </div>
          </div>
        </td>
        <td>
          <div>Tỉnh, Thành phố:</div>
          <div class="flex space-between">
            <div style="margin-top: 4px;">{{infoCustomer.MOHProvince}}</div>
            <div><CharWithSquare :text="infoCustomer.MOHProvinceCode" :defaultlength="2"  /></div>
          </div>
        </td> -->
      </tr>
    </table>
    <table width="100%" class="tbl-b2">
      <tr class="on-top">
        <td colspan="2">{{dex[8]}} Nơi làm việc: {{infoCustomer.WorkPlace}}</td>
      </tr>
      <tr colspan="2">
        <td class="inline-block" v-if="MASTERDATA['OPDOENPT603']">
          <span class="mt-5">{{dex[9]}} Đối tượng:</span>
          <i>1. BHYT</i> <span class="square-text mrr5" :class="{'hidden-text': infoCustomer.MOHObject !== '1'}">&#10003;</span>
          <i>2. Thu phí</i> <span class="square-text mrr5" :class="{'hidden-text': infoCustomer.MOHObject !== '2'}">&#10003;</span>
          <i>3. Miễn</i> <span class="square-text mrr5" :class="{'hidden-text': infoCustomer.MOHObject !== '3'}">&#10003;</span>
          <i>4. Khác</i> <span class="square-text" :class="{'hidden-text': infoCustomer.MOHObject !== '4'}">&#10003;</span>
        </td>
      </tr>
      <!-- <tr>
        <td style="white-space: nowrap;" colspan="2">
          <div class="inline-block">{{dex[9]}} Đối tượng:</div>
          <div class="inline-block">
            <i>1. BHYT</i> <span class="square-text mrr5" :class="{'hidden-text': infoCustomer.MOHObject !== '1'}">&#10003;</span>
            <i>2. Thu phí</i> <span class="square-text mrr5" :class="{'hidden-text': infoCustomer.MOHObject !== '2'}">&#10003;</span>
          </div>
          <div class="inline-block">
            <i>3. Miễn</i> <span class="square-text mrr5" :class="{'hidden-text': infoCustomer.MOHObject !== '3'}">&#10003;</span>
            <i>4. Khác</i> <span class="square-text" :class="{'hidden-text': infoCustomer.MOHObject !== '4'}">&#10003;</span>
          </div>
        </td>
      </tr> -->
    </table>
    <table width="100%" class="tbl-b2">
      <tr>
        <td colspan="2">
          <div class="flex align-center">
            <div class="mrr20">{{dex[10]}} BHYT giá trị đến ngày: {{infoCustomer.ExpireHealthInsuranceDate || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
            <div>Số thẻ BHYT: {{infoCustomer.HealthInsuranceNumber}}</div>
          </div>
        </td>
      </tr>
       <tr>
        <td colspan="2">
          <div>{{dex[11]}} Họ tên, địa chỉ người nhà khi cần báo tin: {{trim_(infoCustomer.Relationship) || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
          <div style="margin-left: 20px;">Điện thoại số: {{infoCustomer.RelationshipContact || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div>{{dex[12]}} Đến khám bệnh lúc: {{infoCustomer.AdmittedDate}}</div>
        </td>
      </tr>
      <tr colspan="2">
        <td>
          <p class="mt-5 inline-block" v-if="MASTERDATA['OPDOENPT606']">{{dex[13]}} Chẩn đoán của nơi giới thiệu: {{MASTERDATA['OPDOENPT606'].Items[1].Value}}</p>
        </td>
        <td class="inline-block float-right" v-if="MASTERDATA['OPDOENPT603']">
          <i>1. Y tế</i> <span class="square-text mrr5" :class="{'hidden-text': DiagnosisFromReferred1}">&#10003;</span>
          <i>2. Tự đến</i> <span class="square-text mrr5" :class="{'hidden-text': DiagnosisFromReferred2}">&#10003;</span>
        </td>
      </tr>
      <!-- <tr>
        <td style="white-space: nowrap;" colspan="2">
          <div v-if="MASTERDATA['OPDOENPT606']" class="inline-block mt-5">{{dex[13]}} Chẩn đoán của nơi giới thiệu: {{MASTERDATA['OPDOENPT606'].Items[1].Value}}</div>
          <div class="inline-block float-right" v-if="MASTERDATA['OPDOENPT603']">
            <i>1. Y tế</i> <span class="square-text mrr5" :class="{'hidden-text': MASTERDATA['OPDOENPT603'].Items[1].Value && !MASTERDATA['OPDOENPT603'].Items[0].Value}">&#10003;</span>
            <i>2. Tự đến</i> <span class="square-text mrr5" :class="{'hidden-text': MASTERDATA['OPDOENPT603'].Items[0].Value && !MASTERDATA['OPDOENPT603'].Items[1].Value}">&#10003;</span>
          </div>
        </td>
      </tr> -->
    </table>
    <table width="100%" class="tbl-b2" v-if="MASTERDATA['OPDOENCC0']">
      <tr>
        <td colspan="2">
          <div style="position: relative;">
            <div class="fw600 fs20">II. LÝ DO VÀO VIỆN:</div>
            <p style="margin: 0">{{MASTERDATA['OPDOENCC0'].Items[0].Value}}</p>
          </div>
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
    this.dex = this.getIndex(this.$route.meta.type)
    console.log(this.DataSubmit, 'check visitVersion')
  },
  computed: {
    DiagnosisFromReferred1 () {
      console.log(this.MASTERDATA['OPDOENPT603'])
      if (this.MASTERDATA['OPDOENPT603'].Items[1].Value && !this.MASTERDATA['OPDOENPT603'].Items[0].Value) {
        return true
      }
      if (this.VisitVersion < 12) {
        return true
      }
      if (!this.MASTERDATA['OPDOENPT603'].Items[1].Value && !this.MASTERDATA['OPDOENPT603'].Items[0].Value) {
        return true
      }
      return false
    },
    DiagnosisFromReferred2 () {
      if (this.MASTERDATA['OPDOENPT603'].Items[0].Value && !this.MASTERDATA['OPDOENPT603'].Items[1].Value) {
        return true
      }
      if (this.VisitVersion < 12) {
        return true
      }
      if (!this.MASTERDATA['OPDOENPT603'].Items[1].Value && !this.MASTERDATA['OPDOENPT603'].Items[0].Value) {
        return true
      }
      return false
    },
    age () {
      if (this.infoCustomer && this.infoCustomer.AgeFormated) {
        return this.infoCustomer.AgeFormated.split('-')
      }
      return ''
    }
  },
  methods: {
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
      // if (str === 'YYYY') {
      //   obj = {
      //     ViName: 'Năm',
      //     EnName: 'Year'
      //   }
      // }
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
