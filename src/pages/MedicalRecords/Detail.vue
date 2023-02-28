<template>
  <div class="main-content" id="iam-page" v-if="loaded">
    <ed-component :recordV2="true" v-if="customerType === 'ED'" :EdId="customerId" @onChange="getDataDone"/>
    <opd-component :recordV2="true" v-if="customerType === 'OPD'" :OpdId="customerId" @onChange="getDataDone"/>
    <TopbarInfoV2 :recordV2="true" v-if="customerType === 'IPD'" :VisitId="customerId" @onChange="getDataDone"/>
    <EDCComponentV2 :recordV2="true" v-if="customerType === 'EOC'" :VisitId="customerId" @onChange="getDataDone"/>
    <br/>
    <h1 class="title-page">{{ __t('Chi tiết bệnh án') }} </h1>
    <br/>
    <div v-if="!loading" class="flex mt-20 mb-10" style="cursor: pointer; text-align: -webkit-center;">
      <div class="col-md-1" :class="getActiveMenu(item.Code) ? 'backColor' : ''"  @click="filterMenu(item.Code)" style="height:74px;padding: 8px;border: 0.5px solid #efefef;border-radius: 8px;" v-for="item in groupMenu" :key="item.value">{{__t(item.title)}}</div>
    </div>
    <div v-if="!loading" class="mb-10">
      <input type="text" class="form-control" v-model="search" :placeholder="__t('Gõ để tìm tên phiếu...')"/>
    </div>
    <div v-if="loading" class="text-center"><v-loading/></div>
    <div v-else class="mb-5" v-for="(Form, index) in Forms" :key="index">
      <MedicalRecordWrap :Form="Form">
        <template slot="content"  style="background: yellow">
          <div v-for="(visit, indexvisit) in Form.Datas" :key="indexvisit">
          <!-- <ViewHsAll :UpdatedBy="visit.UpdatedBy" :UpdateAt="formatDateHourMinutesDDMMYYY(visit.UpdatedAt)" :Label="formatDateHourMinutesDDMMYYY(visit.AdmittedDate) + ' - ' + __t('Lượt khám hsba') + ' ' + visit.VisitCode + ' - ' +  getSpecialty(visit) + ' - ' + visit.PrimaryDoctor" :Form="visit" :VisitType="visit.Area" :VisitId="visit.Id" :Version="visit.Datas[0].Version" :Type="visit.Type" /> -->
          <ViewHsAll :Version="visit.Datas[0].Version" :Code="visit.Code || ''" :UpdatedBy="visit.UpdatedBy" :UpdateAt="formatDateHourMinutesDDMMYYY(visit.UpdatedAt)" :Label="formatDateHourMinutesDDMMYYY(visit.AdmittedDate) + ' - ' + __t('Lượt khám hsba') + ' ' + visit.VisitCode + ' - ' +  getSpecialty(visit) + ' - ' + visit.PrimaryDoctor" :Form="visit" :VisitType="visit.Area" :VisitId="visit.Id" :Type="visit.Type" />
          </div>
        </template>
      </MedicalRecordWrap>
    </div>
  </div>
</template>

<script>
// import { includes } from 'lodash'
import TopbarInfoV2 from '@/components/IPD/TopbarInfo.vue'
import OpdComponent from '@/components/OPD/VIEW_OPD.vue'
import EdComponent from '@/components/ED/VIEW_ED.vue'
import EDCComponentV2 from '@/components/EOC/InfoBar.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import ViewHsAll from '@/pages/IPD/Detail/IndexV2All.vue'
import MedicalRecords from '@/services/MedicalRecordsV2'
import FormDetailComponents from './FormDetailComponents.vue'
import MedicalRecordWrap from '@/components/MedicalRecordWrap.vue'
export default {
  name: 'Patient-Records',
  mixins: [MixinMasterData],
  data () {
    return {
      loaded: false,
      Records: {
        Visit: []
      },
      hasData: false,
      Id: this.$route.params.Id,
      propVisitId: null,
      propVisitType: '',
      parameters: {
        status: [],
        recordCode: null,
        visitCode: null,
        visitTypeGroupCode: [],
        specialty: [],
        startExaminationTime: null,
        endExaminationTime: null,
        pageNumber: 1,
        pages: 1,
        PageSize: 99999
      },
      img: null,
      pin: false,
      Forms: [],
      responseList: [],
      search: '',
      visitGroup: {
        visitGroup: null
      },
      customerType: '',
      customerId: '',
      formResponse: [],
      firstData: [],
      groupMenu: [
        {
          title: 'Tất cả',
          value: 0,
          Code: 'TC'
        },
        {
          title: 'Hành chính, Cam kết',
          value: 1,
          Code: 'HCCK'
        },
        {
          title: 'Bệnh án hội chẩn',
          value: 2,
          Code: 'BAHC'
        },
        {
          title: 'Y lệnh',
          value: 3,
          Code: 'YL'
        },
        {
          title: 'Y lệnh khác',
          value: 4,
          Code: 'YLK'
        },
        {
          title: 'Theo dõi điều dưỡng',
          value: 5,
          Code: 'TDDD'
        },
        {
          title: 'Phẫu thuật, Thủ thuật',
          value: 6,
          Code: 'PTTT'
        },
        {
          title: 'Kết quả xét nghiệm',
          value: 7,
          Code: 'KQXN'
        },
        {
          title: 'Kết quả CĐHA',
          value: 8,
          Code: 'KQCDHA'
        },
        {
          title: 'Ra viện',
          value: 9,
          Code: 'RAVIEN'
        },
        {
          title: 'Khác',
          value: 10,
          Code: 'KHAC'
        },
        {
          title: 'Biểu mẫu không thuộc HSBA',
          value: 11,
          Code: 'BMKTHSBA'
        }],
      tabActive: ['TC'],
      VisitType: this.$route.params.TYPE || this.$store.state.account.Specialty.VisitTypeGroupCode,
      loading: true
    }
  },
  components: {
    MedicalRecordWrap, FormDetailComponents, ViewHsAll, TopbarInfoV2, OpdComponent, EdComponent, EDCComponentV2
  },
  watch: {
    search (value) {
      if (!value) {
        this.Forms = []
        this.hasData = false
        this.Forms = this.responseList
        // setTimeout(() => {
        //   this.hasData = false
        //   this.Forms = this.responseList
        // }, 300)
      } else {
        this.filterForm()
      }
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'NHOMBIEUMAU'}, () => {
    })
    this.getData()
  },
  computed: {
  },
  methods: {
    getSpecialty (visit) {
      if (this.$i18n.locale === 'en') {
        return visit.EnSpecialty
      } else {
        return visit.Specialty
      }
    },
    getDataDone (data) {
      setTimeout(() => {
        this.hasData = true
      }, 300)
    },
    updateQuery () {
      return Object.assign({}, this.parameters, {
        status: this.parameters.status.map(e => { return e.value }),
        visitCode: this.parameters.visitCode,
        recordCode: this.parameters.recordCode,
        visitTypeGroupCode: this.parameters.visitTypeGroupCode.map(e => { return e.value }),
        specialty: this.parameters.specialty.map(e => { return e.value }),
        startExaminationTime: this.parameters.startExaminationTime,
        endExaminationTime: this.parameters.endExaminationTime
      })
    },
    getActiveMenu (code) {
      if (this.tabActive.filter(name => name === code).length > 0) {
        return true
      } else {
        return false
      }
    },
    filterMenu (code) {
      console.log('code', code)
      this.hasData = false
      if (this.tabActive.filter(name => name === code).length > 0) {
        this.tabActive = this.tabActive.filter(name => name !== code)
      } else {
        if (code === 'TC') {
          this.tabActive = ['TC']
        } else {
          this.tabActive.push(code)
          this.tabActive = this.tabActive.filter(name => name !== 'TC')
        }
      }
      if (this.tabActive.length > 0) {
        if (this.tabActive.filter(name => name.includes('TC')).length > 0) {
          this.Forms = this.formResponse
        } else {
          var list1 = []
          for (let i = 0; i < this.tabActive.length; i++) {
            console.log('i', this.tabActive[i])
            var list = this.MASTERDATA[this.tabActive[i]].Items
            list1 = list1.concat(list)
          }
          console.log('list1', list1)
          console.log('response', this.formResponse)
          var arr = this.formResponse.filter((el) => {
            return list1.some((f) => {
              return f.Code === el.Type
            })
          })
          this.Forms = arr
        }
      } else {
        this.Forms = []
      }
    },
    formatDateHourMinutesDDMMYYY (value) {
      if (!value) {
        return ''
      }
      const date = new Date(value)
      return (
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
        ':' +
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ' ' +
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
        '/' +
        (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
        '/' +
        date.getFullYear()
      )
    },
    getDataByIndex (index) {
      console.log(index)
    },
    filterForm () {
      this.Forms = []
      if (this.$i18n.locale === 'vi') {
        this.Forms = this.responseList.filter(item => {
          return this.mapingStr(this.removeVietnameseTones(this.search), this.removeVietnameseTones(item.Datas[0].ViName))
        })
      } else {
        this.Forms = this.responseList.filter(item => {
          return this.mapingStr(this.removeVietnameseTones(this.search), this.removeVietnameseTones(item.Datas[0].EnName))
        })
      }
    },
    getData () {
      new MedicalRecords({PID: this.$route.params.PID})
        .find(this.$route.params.PID)
        .then(response => {
          this.getDataItem()
          this.customerType = response[0].VisitList[response[0].VisitList.length - 1].Type
          this.customerId = response[0].VisitList[response[0].VisitList.length - 1].Id
          console.log('response', this.customerType)
          console.log('type', this.customerId)
        })
    },
    getDataItem (id) {
      const params = {
        Id: this.$route.params.Id,
        VisitType: this.$route.params.TYPE
      }
      new MedicalRecords()
        .create(params)
        .then(response => {
          this.responseList = response
          this.firstData = response
          this.Forms = response
          this.formResponse = response
          // const checkHasPre = response.filter(item => item.Type === 'PreAnesthesiaConsultation')
          // if (checkHasPre) {
          //   this.formResponse = response.filter(item => item.Type !== 'MedicalReport')
          //   this.Forms = response.filter(item => item.Type !== 'MedicalReport')
          // }
          for (let i = 0; i < this.formResponse.length; i++) {
            for (let j = 0; j < this.formResponse[i].Datas.length; j++) {
              this.formResponse[i].Datas[j].Type = this.formResponse[i].Datas[j].Area + this.formResponse[i].Datas[j].Type
              if (this.formResponse[i].Datas[j].Type === 'OPDMedicalReport' && this.formResponse[i].Datas[j].IsAnesthesia) {
                console.log('bcyt')
                this.formResponse[i].Datas = this.formResponse[i].Datas.filter(i => !i.IsAnesthesia)
                this.Forms = this.formResponse
                const a = this.Forms.filter(item => item.Type === 'MedicalReport' || item.Type === 'OPDMedicalReport')
                if (a[0].Datas.length === 0) {
                  this.Forms = this.Forms.filter(item => item.Type !== 'MedicalReport' && item.Type !== 'OPDMedicalReport')
                }
              }
            }
          }
          // this.Forms = this.formResponse
          // console.log('formResponse', this.formResponse)
          this.loading = false
        })
      this.loaded = true
    },
    removeVietnameseTones (str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/đ/g, 'd')
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      str = str.replace(/Đ/g, 'D')
      // Some system encode vietnamese combining accent as individual utf-8 characters
      // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
      str = str.replace(/\u02C6|\u0306|\u031B/g, '') // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
      // Remove extra spaces
      // Bỏ các khoảng trắng liền nhau
      str = str.replace(/ + /g, ' ')
      str = str.trim()
      // Remove punctuations
      // Bỏ dấu câu, kí tự đặc biệt
      // eslint-disable-next-line no-useless-escape
      str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\'|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ')
      return str
    }
  }
}
</script>
<style scoped>
  .backColor {
    background-color: #337ab7;
    color: #fff;
  }
</style>
