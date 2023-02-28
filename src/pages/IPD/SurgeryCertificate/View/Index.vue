<template>
 <div class="SurgeryCertificate-content">
   <div class="main-content" v-if="DataSubmit">
    <div class="a4-page box" :id="printId || 'printMeTranslate'">
      <table class="table" style="width: 100%">
        <tr style="height: 100px;">
          <th style="text-align: center;" align="center">
            <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
          </th>
        </tr>
        <tr>
          <th class="text-center" style="text-align: center;vertical-align: bottom;" align="center">
            <p class="text-center textUppercase fs20 none-mrb">GIẤY CHỨNG NHẬN PHẪU THUẬT</p>
            <p class="text-center textUppercase fs20 none-mrb fw100">SURGERY CERTIFICATE</p>
          </th>
        </tr>
      </table>
      <br>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Khoa/</b>Department: {{DataSubmit.Specialty ? DataSubmit.Specialty : ''}}</p>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Họ, tên người bệnh/</b>Patient's Name: {{DataSubmit.Fullname ? DataSubmit.Fullname : ''}}</p>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Số đăng ký/</b>PID: {{DataSubmit.PID ? DataSubmit.PID : ''}}</p>
      <p v-if="DataSubmit" style="margin-bottom: 10px;"><b style="display: inline;">Ngày sinh/</b>D.O.B: {{DataSubmit.DateOfBirth}}</p>
      <p v-if="DataSubmit" style="margin-bottom: 10px;"><b style="display: inline;">Giới tính/</b>Gender: {{DataSubmit.Gender || ''}}</p>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Quốc tịch/</b>Nationality: {{DataSubmit.Nationality ? DataSubmit.Nationality : ''}}</p>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Địa chỉ/</b>Address: {{DataSubmit.Address}}</p>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Ngày vào viện/</b>Admission Date: {{DataSubmit.AdmittedDateFirstIpd}}</p>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Ngày ra viện/</b>Discharge Date: {{DataSubmit.Discharge}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER03']"><b style="display: inline;">Ngày phẫu thuật/</b>Surgery Date: {{MASTERDATA['IPDSURCER03'].Items[0].Value}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER07']"><b style="display: inline;">Chẩn đoán trước mổ/</b>Preoperative diagnosis: {{getDiagnosisSC(MASTERDATA['IPDSURCER07'].Items[0].Value)}}<span v-if="DataSubmit.PreoperativeDiagnosisTrans">/ {{DataSubmit.PreoperativeDiagnosisTrans}}</span></p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER21']"><b style="display: inline;">Chẩn đoán sau mổ/</b>Postoperative diagnosis: {{getDiagnosisSC(MASTERDATA['IPDSURCER21'].Items[0].Value)}}<span v-if="DataSubmit.PostoperativeDiagnosisTrans">/ {{DataSubmit.PostoperativeDiagnosisTrans}}</span></p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER13']"><b style="display: inline;">Phương pháp phẫu thuật/</b>Procedure performed: {{MASTERDATA['IPDSURCER13'].Items[0].Value}}<span v-if="DataSubmit.ProcedurePerformedTrans">/ {{DataSubmit.ProcedurePerformedTrans}}</span></p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER15']"><b style="display: inline;">Phương pháp vô cảm/</b>Method of anesthesia: {{MASTERDATA['IPDSURCER15'].Items[0].Value}}<span v-if="DataSubmit.MethodOfAnesthesiaTrans">/ {{DataSubmit.MethodOfAnesthesiaTrans}}</span></p>
      <p style="margin-bottom: 10px;" v-if="versionFormTT === '4'"><b style="display: inline;">Phẫu thuật viên/</b>Surgeon's name: <GetUsers :listUser="getName(DataFormTT.Datas.find(e => e.Code === 'SSNEW28').Value)"></GetUsers></p>
      <p style="margin-bottom: 10px;" v-else-if="versionFormTT === '3'"><b style="display: inline;">Phẫu thuật viên/</b>Surgeon's name: <GetUsers :listUser="getName(DataFormTT.Datas.find(e => e.Code === 'SAPSNEW28').Value)"></GetUsers></p>
      <p style="margin-bottom: 10px;" v-else><b style="display: inline;">Phẫu thuật viên/</b>Surgeon's name: {{MASTERDATA['IPDSURCER17'] ? getName(MASTERDATA['IPDSURCER17'].Items[0].Value) : ''}}</p>
      <p style="margin-bottom: 10px;" v-if="versionFormTT === '4'"><b style="display: inline;">Bác sĩ gây mê/</b>Anesthetist: <GetUsers :listUser="getName(DataFormTT.Datas.find(e => e.Code === 'SSNEW32').Value)"></GetUsers></p>
      <p style="margin-bottom: 10px;" v-else-if="versionFormTT === '3'"><b style="display: inline;">Bác sĩ gây mê/</b>Anesthetist: <GetUsers :listUser="getName(DataFormTT.Datas.find(e => e.Code === 'SAPSNEW32').Value)"></GetUsers></p>
      <p style="margin-bottom: 10px;" v-else><b style="display: inline;">Bác sĩ gây mê/</b>Anesthetist: {{MASTERDATA['IPDSURCER19'] ? getName(MASTERDATA['IPDSURCER19'].Items[0].Value) : ''}}</p>
      <div style="text-align: right;margin-bottom: 5px;" v-if="CreateAtHouse !== null">Giờ/Time {{CreateAtHouse}} Ngày/Date {{CreateAt}}</div>
      <div style="text-align: right;margin-bottom: 5px;" v-else>Giờ/Time &emsp;&emsp;&emsp;&emsp;&emsp; Ngày/Date &emsp;&emsp;&emsp;&emsp;&emsp;</div>
      <!-- <table style="width: 100%" class="hidden-only-form"> -->
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
          <td><p class="text-center fw300" style="font-size: 14px!important;">{{dataParent.ProcedureDoctor ? dataParent.ProcedureDoctor.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p></td>
          <td><p class="text-center fw300" style="font-size: 14px!important;">{{dataParent.Dean ? dataParent.Dean.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p></td>
          <td><p class="text-center fw300" style="font-size: 14px!important;">{{dataParent.Director ? dataParent.Director.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p></td>
        </tr>
      </table>
      <br/>
      <br/>
    </div>
    <!-- <p>A01_151_050919_VE</p> -->
    <div v-if="isTranView" class="print-area">
      <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
    </div>
  </div>
 </div>
</template>

<script>
import GetUsers from '@/components/global/GetUsers.vue'

export default {
  name: 'IPDSurgeryCertificateView',
  mixins: [],
  props: ['DataSubmit', 'isTranView', 'printId', 'DataFormTT', 'MASTERDATA', 'versionFormTT', 'dataParent'],
  watch: {
  },
  data () {
    return {
      data: null,
      TranItem: null,
      dataTranslated: null,
      popupTitle: '',
      kind: '',
      DataSubmit2: {
        text: '',
        ICD1: null,
        ICD2: null
      },
      IsLocked: false,
      DataAllList: [],
      open1: true,
      isConfirmed: true,
      formIdTT: ''
    }
  },
  components: {
    GetUsers
  },
  computed: {
    condition () {
      let name = ''
      if (this.$store.state.account.Position.includes('Nurse')) {
        name = 'Nurse'
      }
      if (this.$store.state.account.Position.includes('Doctor')) {
        name = 'Doctor'
      }
      return name
    },
    _ItemId: function () {
      return this.formId || this.$route.params.Item
    },
    CreateAtHouse: function () {
      return this.MASTERDATA['IPDSURCER05'].Items[0].Value ? this.$options.filters.formatDateWithoutSecon(this.MASTERDATA['IPDSURCER05'].Items[0].Value).split(' ')[0] : null
    },
    CreateAt: function () {
      return this.MASTERDATA['IPDSURCER05'].Items[0].Value ? this.MASTERDATA['IPDSURCER05'].Items[0].Value.split(' ')[1] : null
    },
    Datas: function () {
      return (this.DataSubmit.Datas.length || [])
    }
  },
  mounted () {
    console.log(this.DataSubmit, 'check dataSubmit i have receive')
  },
  methods: {
    print () {
      this.$htmlToPaper(this.printId || 'printMeTranslate', false, 'A01_145_050919_VE')
    },
    // popup canh bao
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.kind = kind
      this.$modal.show('doctorConfirm')
    },
    handlePrice () {
      this.$htmlToPaper3('SurgeryCertificate-price', false, 'A01_151_050919_VE')
    },
    getAddress () {
      let str = ''
      if (this.DataSubmit && this.DataSubmit.CustomerInfo) {
        return [
          this.DataSubmit.CustomerInfo.MOHAddress,
          this.DataSubmit.CustomerInfo.MOHDistrict,
          this.DataSubmit.CustomerInfo.MOHProvince
        ].filter(e => e).join(', ')
      }
      return str
    },
    // popup canh bao
    confirmPopupBack () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn btn-warning',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    getName (nameInfo) {
      // let name = nameInfo
      // if (nameInfo && nameInfo.split(' (').length) {
      //   name = nameInfo.split(' (')[0]
      // }
      // return name
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
.SurgeryCertificate-content {
  .btn-create {
    display: block;
    margin: 0 auto;
  }
  .inline {
    display: inline-block;
  }
  .box-select {
    width: 100%;
    border: 1px solid black;
    color: #fff;
    background: #337AB7;
    border-radius: 3px;
    font-weight: 600;
    padding: 5px;
    position relative;
    .text-label {
      margin-bottom: 0px!important;
    }
    .icon {
      color: #fff;
      position absolute;
      font-size: 18px;
      right: 5px;
      top: 5px;
      font-weight: 600;
      cursor: pointer;
    }
  }
  .box-ed-content {
      border-radius: 4px;
      th {
        padding: 2px 5px;
      }
      td {
        padding: 3px 5px;
      }
      .box-copy {
        border: 1px solid black;
        border-radius: 4px;
        font-weight: 400;
        background: #f5f5f5;
      }
    }
}
</style>
