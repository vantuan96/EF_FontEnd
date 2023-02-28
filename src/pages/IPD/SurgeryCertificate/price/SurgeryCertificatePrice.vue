<template>
  <div class="main-content" id="di0-page" v-if="Data && MASTERDATA">
    <div class="a4-page box" id="SurgeryCertificate-price">
      <table class="table" style="width: 100%">
        <tr style="height: 100px;">
          <th style="text-align: center;" align="center">
            <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
          </th>
        </tr>
        <tr>
          <th class="text-center" style="text-align: center;vertical-align: bottom;" align="center">
            <p class="text-center textUppercase fs20 none-mrb">GIẤY CHỨNG NHẬN PHẪU THUẬT</p>
            <p class="text-center textUppercase fs20 none-mrb">SURGERY CERTIFICATE</p>
          </th>
        </tr>
      </table>
      <br>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Khoa/</b>Department: {{Data.Khoa ? Data.Khoa : ''}}</p>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Họ, tên người bệnh/</b>Patient's Name: {{Data.CustomerInfo ? Data.CustomerInfo.Fullname : ''}}</p>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Số đăng ký/</b>PID: {{Data.CustomerInfo ? Data.CustomerInfo.PID : ''}}</p>
      <p v-if="Data.CustomerInfo" style="margin-bottom: 10px;"><b style="display: inline;">Ngày sinh/</b>D.O.B: {{Data.CustomerInfo.DateOfBirth | formatDate2}}</p>
      <p v-if="Data.CustomerInfo" style="margin-bottom: 10px;"><b style="display: inline;">Giới tính/</b>Gender: {{GENDER[Data.CustomerInfo.Gender] || ''}}</p>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Quốc tịch/</b>Nationality: {{Data.CustomerInfo ? Data.CustomerInfo.Nationality : ''}}</p>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Địa chỉ/</b>Address: {{getAddress()}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER01']"><b style="display: inline;">Ngày vào viện/</b>Admission Date: {{MASTERDATA['IPDSURCER01'].Items[0].Value}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER05']"><b style="display: inline;">Ngày ra viện/</b>Discharge Date: {{MASTERDATA['IPDSURCER05'].Items[0].Value}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER03']"><b style="display: inline;">Ngày phẫu thuật/</b>Surgery Date: {{MASTERDATA['IPDSURCER03'].Items[0].Value}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER07']"><b style="display: inline;">Chẩn đoán trước mổ/</b>Preoperative diagnosis: {{getDiagnosisSC(MASTERDATA['IPDSURCER07'].Items[0].Value)}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER21']"><b style="display: inline;">Chẩn đoán sau mổ/</b>Postoperative diagnosis: {{getDiagnosisSC(MASTERDATA['IPDSURCER21'].Items[0].Value)}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER13']"><b style="display: inline;">Phương pháp phẫu thuật/</b>Procedure performed: {{MASTERDATA['IPDSURCER13'].Items[0].Value}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER15']"><b style="display: inline;">Phương pháp vô cảm/</b>Method of anesthesia: {{MASTERDATA['IPDSURCER15'].Items[0].Value}}</p>
      <p style="margin-bottom: 10px;" v-if="versionFormTT === '4' && DataFormTT.Datas.find(e => e.Code === 'SSNEW28') && DataFormTT.Datas.find(e => e.Code === 'SSNEW28').Value !== '[]'"><b style="display: inline;">Phẫu thuật viên/</b>Surgeon's name: <GetUsers :listUser="getName(DataFormTT.Datas.find(e => e.Code === 'SSNEW28').Value)"></GetUsers></p>
      <p style="margin-bottom: 10px;" v-else-if="versionFormTT === '3' && DataFormTT.Datas.find(e => e.Code === 'SAPSNEW28') && DataFormTT.Datas.find(e => e.Code === 'SAPSNEW28').Value !== '[]'"><b style="display: inline;">Phẫu thuật viên/</b>Surgeon's name: <GetUsers :listUser="getName(DataFormTT.Datas.find(e => e.Code === 'SAPSNEW28').Value)"></GetUsers></p>
      <!-- <p style="margin-bottom: 10px;" v-else><b style="display: inline;">Phẫu thuật viên/</b>Surgeon's name: <GetUsers :listUser="getName(MASTERDATA['IPDSURCER17'].Items[0].Value)"></GetUsers></p> -->
      <p style="margin-bottom: 10px;" v-else><b style="display: inline;">Phẫu thuật viên/</b>Surgeon's name: {{MASTERDATA['IPDSURCER17'] ? getName(MASTERDATA['IPDSURCER17'].Items[0].Value) : ''}}</p>
      <p style="margin-bottom: 10px;" v-if="versionFormTT === '4' && DataFormTT.Datas.find(e => e.Code === 'SSNEW32') && DataFormTT.Datas.find(e => e.Code === 'SSNEW32').Value !== '[]'"><b style="display: inline;">Bác sĩ gây mê/</b>Anesthetist: <GetUsers :listUser="getName(DataFormTT.Datas.find(e => e.Code === 'SSNEW32').Value)"></GetUsers></p>
      <p style="margin-bottom: 10px;" v-else-if="versionFormTT === '3' && DataFormTT.Datas.find(e => e.Code === 'SAPSNEW32') && DataFormTT.Datas.find(e => e.Code === 'SAPSNEW32').Value !== '[]'"><b style="display: inline;">Bác sĩ gây mê/</b>Anesthetist: <GetUsers :listUser="getName(DataFormTT.Datas.find(e => e.Code === 'SAPSNEW32').Value)"></GetUsers></p>
      <!-- <p style="margin-bottom: 10px;" v-else><b style="display: inline;">Bác sĩ gây mê/</b>Anesthetist: <GetUsers :listUser="getName(MASTERDATA['IPDSURCER19'].Items[0].Value)"></GetUsers></p> -->
      <p style="margin-bottom: 10px;" v-else><b style="display: inline;">Bác sĩ gây mê/</b>Anesthetist: {{MASTERDATA['IPDSURCER19'] ? getName(MASTERDATA['IPDSURCER19'].Items[0].Value) : ''}}</p>
      <div style="text-align: right;margin-bottom: 5px;" v-if="CreateAtHouse !== null">Giờ/Time {{CreateAtHouse}} Ngày/Date {{CreateAt}}</div>
      <div style="text-align: right;margin-bottom: 5px;" v-else>Giờ/Time <span>&emsp;&emsp;&emsp;&emsp;&emsp;</span> Ngày/Date <span>&emsp;&emsp;&emsp;&emsp;&emsp;</span></div>
      <table style="width: 100%">
        <tr>
          <td style="width: 33%" class="text-center">
            <p class="text-center none-mrb" style="font-size: 14px!important;"><b style="display: inline;">PHẪU THUẬT VIÊN</b></p>
            <p class="text-center none-mrb" style="font-size: 14px!important;">SURGEON</p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
          </td>
          <td style="width: 33%" class="text-center">
            <p class="text-center none-mrb" style="font-size: 14px!important;"><b style="display: inline;">TRƯỞNG KHOA</b>/HEAD</p>
            <p class="text-center none-mrb" style="font-size: 14px!important;">OF DEPARTMENT</p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
          </td>
          <td style="width: 33%; vertical-align: top;" class="text-center" align="top">
            <p class="text-center none-mrb" style="font-size: 14px!important;"><b style="display: inline;">GIÁM ĐỐC</b>/DIRECTOR</p>
            <br>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
          </td>
        </tr>
        <tr>
          <td><p class="text-center fw300" style="font-size: 14px!important;">{{Data.ProcedureDoctor ? Data.ProcedureDoctor.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p></td>
          <td><p class="text-center fw300" style="font-size: 14px!important;">{{Data.Dean ? Data.Dean.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p></td>
          <td><p class="text-center fw300" style="font-size: 14px!important;">{{Data.Director ? Data.Director.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import MixinForm from '@/mixins/form.js'
import constants from '@/constants'
import GetUsers from '@/components/global/GetUsers.vue'
// import GetSurgeryCertificate from '@/services/IPD/SurgeryCertificate/GetSurgeryCertificate'
const GENDER = constants.GENDER
export default {
  name: 'SurgeryCertificatePrice',
  mixins: [MixinForm],
  props: ['Data', 'MASTERDATA', 'DataFormTT', 'versionFormTT'],
  components: {GetUsers},
  data () {
    return {
      GENDER: GENDER
    }
  },
  computed: {
    CreateAtHouse: function () {
      return this.MASTERDATA['IPDSURCER05'].Items[0].Value ? this.$options.filters.formatDateWithoutSecon(this.MASTERDATA['IPDSURCER05'].Items[0].Value).split(' ')[0] : null
    },
    CreateAt: function () {
      return this.MASTERDATA['IPDSURCER05'].Items[0].Value ? this.MASTERDATA['IPDSURCER05'].Items[0].Value.split(' ')[1] : null
    },
    Datas: function () {
      return (this.Data.Datas.length || [])
    }
  },
  mounted () {
    // this.getData()
  },
  methods: {
    // getData () {
    //   new GetSurgeryCertificate().find(this._VisitId + '?hidemsg=' + true).then(response => {
    //     this.Data = response
    //     if (response.Datas.length > 0) {
    //       this.Datas = response.Datas
    //     } else {
    //       this.Datas = null
    //     }
    //   }).catch(e => {
    //     this.Data = {}
    //   })
    // }
    getAddress () {
      let str = ''
      if (this.Data && this.Data.CustomerInfo) {
        str = `${this.Data.CustomerInfo.MOHAddress || ''}${this.Data.CustomerInfo.MOHAddress && this.Data.CustomerInfo.MOHDistrict ? ',' : ''} ${this.Data.CustomerInfo.MOHDistrict || ''}${this.Data.CustomerInfo.MOHDistrict && this.Data.CustomerInfo.MOHProvince ? ',' : ''} ${this.Data.CustomerInfo.MOHProvince || ''}`
      }
      return str
    },
    getName (nameInfo) {
      if (typeof nameInfo === 'object' || nameInfo.includes('[')) {
        nameInfo = JSON.parse(nameInfo).map(e => e)
        if (nameInfo) {
          nameInfo = nameInfo.join(',').replace(/ *\([^)]*\) */g, '')
        }
      } else if (typeof nameInfo === 'string' && nameInfo.includes('(')) {
        console.log(nameInfo)
        if (nameInfo && nameInfo.split(' (').length) {
          nameInfo = nameInfo.split(' (')[0]
        }
      }
      return nameInfo
    },
    getDiagnosisSC (Diagnosis) {
      let str = Diagnosis
      if (Diagnosis && Diagnosis.includes('()')) {
        str = ''
      }
      return str
    }
  }
}
</script>

<style lang="stylus" scoped>
#SurgeryCertificate-price {
  b {
    display: block;
    font-size: 14px;
  }
}
</style>
