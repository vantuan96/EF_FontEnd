<template>
  <div class="box3" v-if="Info2">
    <div class="box2-top-info mrb10" v-if="Info2.MedicalRecordFirst">
      <div class="fw600 mrr10">{{__t('Lượt tiếp nhận')}}: <span class="fw400">{{Info2.MedicalRecordFirst.VisitCode || '&emsp;'}}</span></div>
      <div class="fw600 mrr10">{{__t('Ngày vào')}}: <span class="fw400">{{getFTime(Info2.MedicalRecordFirst.AdmittedDate) || '&emsp;'}}</span></div>
      <div class="fw600 mrr10">{{__t('Ngày ra')}}: <span class="fw400">{{getNgayRa() || '&emsp;'}}</span></div>
      <div class="fw600 mrr10">{{__t('info-khoa')}}: <span class="fw400">{{getKhoa(Info2.MedicalRecordFirst) || '&emsp;'}}</span></div>
      <div class="fw600 mrr10">{{__t('Bác sĩ')}}: <span class="fw400"><ad-info :ad="Info2.MedicalRecordFirst.DoctorUsername"/></span></div>
      <div class="fw600">{{__t('Điều dưỡng')}}: <span class="fw400"><ad-info :ad="Info2.MedicalRecordFirst.NurseUsername"/></span></div>
    </div>
    <div class="flex align-center mrb10" style="flex-wrap: wrap;min-height: 60px;">
      <BaseIcon :url="'info1.png'" :width="'60px'" class="mrr5"/>
      <div class="fw600 flex mrr20" style="height: 100%;flex-direction: column;justify-content: space-around;">
        <div class="fs18">{{Info2.Vitalsigns && Info2.Vitalsigns.height ? Info2.Vitalsigns.height + ' cm' : '&emsp;'}}</div>
        <div class="fs18">{{Info2.Vitalsigns && Info2.Vitalsigns.weight ? Info2.Vitalsigns.weight + ' kg' : '&emsp;'}}</div>
      </div>
      <BaseIcon :url="'info2.png'" :width="'60px'" class="mrr5"/>
      <div class="red fw600 mrr20" style="max-width: 265px;" v-if="Info2.Allergy && Info2.MedicalRecordFirst">{{Info2.Allergy.KindOfAllergy ? getAllergy(Info2.Allergy.KindOfAllergy) : ''}} <span style="word-break: break-word;">{{getNameAllergy(Info2.Allergy)}}</span></div>
      <BaseIcon :url="'info3.png'" :width="'60px'" class="mrr10"/>
      <template v-if="Info2 && Info2.Vitalsigns">
        <div class="flex align-center">
          <div class="mrr10 text-center">
            <div class="mrb5">{{__t('Huyết áp')}} (<i>mmHg</i>)</div>
            <div class="fw600 fs18">{{Info2.Vitalsigns.BP || '&emsp;'}}</div>
            <div class="color-blue">90-140 | 60-90</div>
          </div>
          <div class="mrr10 text-center">
            <div class="mrb5">{{__t('Mạch')}} (<i>{{__t('nhịp/phút')}}</i>)</div>
            <div class="fw600 fs18">{{Info2.Vitalsigns.Pulse || '&emsp;'}}</div>
            <div class="color-blue">60-140</div>
          </div>
          <div class="mrr10 text-center">
            <div class="mrb5">SpO2 (<i>%</i>)</div>
            <div class="fw600 fs18">{{Info2.Vitalsigns.SpO2 || '&emsp;'}}</div>
            <div class="color-blue">94-100</div>
          </div>
          <div class="mrr10 text-center">
            <div class="mrb5">{{__t('Nhịp thở ')}} (<i>{{__t('lần/phút')}}</i>)</div>
            <div class="fw600 fs18">{{Info2.Vitalsigns.RR || '&emsp;'}}</div>
            <div class="color-blue">16-60</div>
          </div>
          <div class="mrr10 text-center">
            <div class="mrb5">{{__t('Nhiệt độ')}} (<i>&#8451;</i>)</div>
            <div class="fw600 fs18">{{Info2.Vitalsigns.T || '&emsp;'}}</div>
            <div class="color-blue">36.1 - 37.5</div>
          </div>
        </div>
      </template>
    </div>
    <div class="flex align-center" style="flex-wrap: wrap;">
      <BaseIcon :url="'info4.png'" :width="'60px'" class="mrr10" style="display: block"/>
      <div class="block">
        <div class="fw600">{{__t('Lý do khám')}}: <span class="fw400">{{Info2.chiefComplaint || '&emsp;'}}</span></div>
        <template v-if="Info2.MedicalRecordFirst && Info2.MedicalRecordFirst.Type === 'IPD'">
          <div class="fw600">{{__t('Chẩn đoán điều trị tại khoa')}}: <span class="fw400">{{getChuanDoan(Info2)}}</span></div>
          <div class="fw600">{{__t('Chẩn đoán rời khỏi khoa')}}: <span class="fw400">{{getChuanDoanRoiKhoa(Info2)}}</span></div>
        </template>
        <div class="fw600" v-else-if="Info2.MedicalRecordFirst">{{__t('Chẩn đoán')}}: <span class="fw400">{{getChuanDoan(Info2)}}</span></div>
        <div class="fw600">{{__t('Điều trị')}}: <span class="fw400 pre-line" v-html="Info2.Treatment"></span></div>
      </div>
    </div>
  </div>
  <div v-else class="text-center">
    <v-loading/>
  </div>
</template>
<script>
// import CustomerInfor from '@/services/CustomerInfor'
export default {
  name: 'TopInfomationDetail',
  props: ['VisitId', 'VisitType', 'Info2'],
  data () {
    return {
      loaded: false
    }
  },
  mounted () {
    // this.getData()
  },
  methods: {
    getData () {
      // let VisitType = this.VisitType
      // if (this.$route.meta.LocalVisitType) {
      //   VisitType = this.$route.meta.LocalVisitType
      // }
      // new CustomerInfor().find(VisitType + '/' + this._VisitId).then(res => {
      //   this.Info2 = res
      //   this.loaded = true
      // }).catch(e => {
      //   this.loaded = true
      // })
    },
    checkShow (code) {
      let check = false
      if (code) {
        // chuyển khoa
        if (code === 'IPDTF') {
          check = true
        }
        // ra viện
        if (code === 'IPDDC') {
          check = true
        }
        // chuyển viện
        if (code === 'IPDIHT') {
          check = true
        }
        // chuyển tuyến
        if (code === 'IPDUDT') {
          check = true
        }
        // tử vong
        if (code === 'IPDDD') {
          check = true
        }
      }
      return check
    },
    getAllergy (data) {
      let str = ''
      if (data && data.split(',').length === 1) {
        this.ALLERGY.find(e => {
          if (data.includes(e.value)) {
            str = this.__t(e.label) + ': '
          }
        })
      }
      if (data && data.split(',').length > 1) {
        this.ALLERGY.find(e => {
          if (data.includes(e.value)) {
            if (str) {
              str = str.replace(': ', ', ')
            }
            str += this.__t(e.label) + ': '
          }
        })
      }
      return str
    },
    getNameAllergy (data) {
      let str = ''
      if (data) {
        if (data.KindOfAllergy && data.KindOfAllergy.length) {
          str = data.Allergy
        } else {
          if (data.Allergy === 'Không xác định') {
            str = this.__t('Không xác định-mdc')
          } else {
            str = this.__t(data.Allergy)
          }
        }
      }
      return str
    },
    getKhoa (data) {
      let khoa = ''
      if (data) {
        if (data.SpecialtyCode) {
          khoa += data.SpecialtyCode
        }
        if (data.SpecialtySite) {
          if (khoa) {
            khoa += ' - '
          }
          khoa += data.SpecialtySite
        }
        if (data.SpecialtyViName) {
          if (khoa) {
            khoa += ' - '
          }
          khoa += this.__label({ViName: data.SpecialtyViName, EnName: data.SpecialtyEnName})
        }
      }
      return khoa
    },
    getNgayRa () {
      let date = ''
      let arr = ['EDAM', 'EDTFOPD', 'EDTFIH', 'EDUDT', 'EDDC', 'EDDD', 'OPDDC', 'OPDAM', 'OPDTTE', 'OPDUDT', 'OPDIHT', 'EOCUD', 'EOCIHT', 'EOCA0', 'EOCTE', 'EOCDD', 'IPDIHT', 'IPDUDT', 'IPDTF', 'IPDDC', 'IPDDD', 'IPDCOTM']
      if (this.Info2 && this.Info2.MedicalRecordFirst && this.Info2.MedicalRecordFirst.StatusCode) {
        arr.find(e => {
          if (e === this.Info2.MedicalRecordFirst.StatusCode) {
            date = this.getFTime(this.Info2.MedicalRecordFirst.DischargeDate)
          }
        })
      }
      return date
    }
  }
}
</script>

<style lang="stylus" scoped>
  .box3 {
    .box2-top-info {
      width: 100%;
      display: flex;
      align-items: center;
      background: #DFF9F7;
      padding: 10px;
      border-radius: 4px;
    }
    .box-di-ung {
      color: #fff;
      font-weight: 600;
      background: #DD4B39;
      border-radius: 4px;
      font-size: 14px;
      padding: 5px;
      display: inline-block;
    }
    .color-blue {
      color: #337AB7!important;
    }
  }
</style>
