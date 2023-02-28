<template>
  <div class="main-content" id="InitialAssessment-page">
    <br/><br/><br/>
    <div class="a4-page box" style="padding: 20px 60px;" id="MedicalRecordPrinter" v-if="hasData">
      <PageTop :Data="Data" :DataAT="DataAT" :routeType="routeType"/>
      <br/>
      <Part1 :Data="Data" :MASTERDATA="MASTERDATA" :routeType="routeType" :optionChild="optionChild" :ListSoSinh="ListSoSinh"/>
      <div class="BreakPage"></div>
      <Part2 :Data="Data" :MASTERDATA="MASTERDATA" :VisitId="_VisitId" :routeType="routeType"/>
      <div class="BreakPage"></div>
      <Part3 :Data="Data" :MASTERDATA="MASTERDATA" :VisitId="_VisitId" :routeType="routeType" :optionChild="optionChild" :ListSoSinh="ListSoSinh"/>
      <template v-if="['Eye', 'A01_039_050919_V', 'A01_040_050919_V'].includes(routeType)">
        <Part4 :Data="Data" :MASTERDATA="MASTERDATA" :VisitId="_VisitId" :routeType="routeType"/>
      </template>
      <div class="BreakPage" v-if="Data && Data.Version && Data.Version >= 2 && routeType === 'A01_034_050919_V'"></div>
      <PreProcedureRiskAssessment class="BreakPage" v-if="(Data && Data.Version && Data.Version >= 2 && routeType === 'A01_034_050919_V') || routeType === 'CardiovascularForm'" :Data="Data" :MASTERDATA="MASTERDATA"/>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
    <p v-if="Data && Data.Version && Data.Version >= 2 && routeType === 'A01_034_050919_V'">A01_034_290422_V</p>
    <p v-else>{{getMaForm(typeForm)}}</p>
    <FloatBlock v-if="hasData">
      <template slot='buttons'>
        <div class="col-md-4">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-group1">
            <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In ngay')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import PageTop from './PageTop.vue'
import Part1 from './Part1.vue'
import Part2 from './Part2.vue'
import Part3 from './Part3.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MedicalRecordMixinForm from '@/pages/IPD/MedicalRecord/Mixin.js'
import Customer from '@/services/IPD/Customer'
import _ from 'lodash'
import MedicalRecord from '@/services/IPD/MedicalRecord'
import EventBus from '@/lib/eventBus'
import Part4 from './Part4.vue'
import PreProcedureRiskAssessment from './PreProcedureRiskAssessmentForCardiacCatheterization.vue'
// import PreProcedureRiskAssessmentForCardiacCatheterization from '@/services/IPD/MedicalRecordExtenstion/PreProcedureRiskAssessmentForCardiacCatheterization.js'

export default {
  /**
   * The name of the page.
   */
  name: 'IPDMedicalRecordPrinter',
  mixins: [MixinMasterData, MedicalRecordMixinForm],
  props: ['VisitId'],
  data () {
    return {
      Data: null,
      Part1: null,
      hasData: false,
      DataAT: null,
      icd10Code: ['IPDMRPE806'],
      DataSubmit: {},
      GroupCodeMasterData: [
        'IPDMRPE803',
        'IPDMRPE807',
        'IPDMRPE907',
        'IPDMRPE909',
        'IPDMRPE911',
        'IPDMRPE914',
        'IPDMRPE916',
        'IPDMRPE917',
        'IPDMRPE819',
        'IPDMRPE821',
        'IPDMRPE812',
        'IPDMRPE919',
        'IPDMRPE922',
        'IPDMRPE913',
        'IPDMRPE915',
        'IPDMRPE809'
      ],
      ListSoSinh: [],
      optionChild: []
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    PageTop,
    Part1,
    Part3,
    Part2,
    Part4,
    PreProcedureRiskAssessment
  },
  mounted () {
    this.getData()
    EventBus.$emit('updateGlobalIpdTopbaInfo', [])
  },
  computed: {
    routeType () {
      return this.$route.meta.type || ''
    },
    codeForm () {
      return this.MedicalRecordFormCode
    },
    typeForm () {
      return this.MedicalRecordFormCode
    }
  },
  methods: {
    submit () {
      this.getData()
    },
    print () {
      let code = this.codeForm
      if (!this.routeType && this.Data.Version >= 2) {
        code = 'A01_034_290422_V'
      }
      if (code === 'BMTIMMACH') {
        code = ''
      }
      this.$MedicalRecordPrinter('MedicalRecordPrinter', false, code)
    },
    async getData () {
      await new Customer({noLoading: true}).find(this._VisitId).then(response => {
        this.DataAT = response
      })
      if (this.routeType === 'Obstetrics') {
        await new MedicalRecord().find('Part3/SyncInfoNewborn/' + this._VisitId).then(res => {
          this.optionChild = res.NewbornFromInitialAsseesment
        }).catch(e => {
          this.optionChild = []
        })
      }
      await new MedicalRecord().find('Part1/' + this.typeForm + '/' + this._VisitId + '?hidemsg=' + true).then(response => {
        if (response.IsDone) {
          this.Data = response
          console.log('DatasPart3', response)
          if (response && response.DatasPart3 && response.DatasPart3.length) {
            response.DatasPart3.find(e => {
              if (e.Code === 'IPDMRPE927') {
                this.ListSoSinh = this.JSONParse(e.Value)
              }
            })
          }
          this.getDatas()
        } else {
          this.alert(this.__t('Hồ sơ bệnh án chưa hoàn thành'), this.__t('Vui lòng hoàn thành bệnh án để thực hiện chức năng này'))
        }
      }).catch(e => {
        this.alert(this.__t('Hồ sơ bệnh án chưa hoàn thành'), this.__t('Vui lòng hoàn thành bệnh án để thực hiện chức năng này'))
      })
    },
    alert (title, msg) {
      this.$modal.show('dialog', {
        title: title,
        text: msg,
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'OK',
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          }
        ]
      })
    },
    getPart2 () {},
    getPart3 () {},
    async getDatas () {
      await this.getAsyncMasterDatas({Form: 'IPDMRPT'})
      await this.getAsyncMasterDatas({Form: 'IPDMRPE'})
      await this.getAsyncMasterDatas({Form: 'IPDMRPG'})
      await this.getAsyncMasterDatas({Form: 'IPDMRPO'})
      await this.getAsyncMasterDatas({Form: 'A01_034_290422_V'})
      if (this.MASTERDATA && this.ListSoSinh && this.ListSoSinh.length) {
        this.ListSoSinh.forEach(elm => {
          this.GroupCodeMasterData.forEach(code => {
            if (this.MASTERDATA[code]) {
              let md = this.cloneObj(this.MASTERDATA[code])
              md.Code = code + '_' + elm.Id
              if (md.Items && md.Items.length) {
                md.Items.forEach(e => {
                  if (!e.Code.includes('_') && md.Code.includes(elm.Id)) {
                    e.Code = e.Code + '_' + elm.Id
                  }
                })
              }
              this.$set(this.MASTERDATA, md.Code, md)
            }
          })
        })
      }
      this.mapData()
      this.setBMI()
      this.changeLabelIndex()
      if (this.Data.IsNew) {
        this.pushDataIsNew()
      }
    },
    mapData () {
      var Datas = [...this.Data.Datas, ...this.Data.GeneralDatas, ...(this.Data.DatasPart2 || []), ...(this.Data.DatasPart3 || []), ...this.Data.PreProcedureRiskAssessmentDatas]
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (this.icd10Code.includes(item.Code)) {
                item.Value = this.JSONParse(exited.Value)
              } else {
                item.Value = exited.Value
              }
            } else {
            }
          })
        }
      }
      this.hasData = true
      setTimeout(() => {
        // this.print()
      }, 500)
    },
    setBMI () {
      var weight = this.MASTERDATA['IPDMRPTCANA'].Items[0].Value ? parseFloat(this.MASTERDATA['IPDMRPTCANA'].Items[0].Value) : 0
      var height = this.MASTERDATA['IPDMRPTCICA'].Items[0].Value ? parseFloat(this.MASTERDATA['IPDMRPTCICA'].Items[0].Value) / 100 : 0
      this.MASTERDATA['IPDMRPTBBMI'].Items[0].Value = (weight / (height * height)).toFixed(2)
      if (isNaN(Number(this.MASTERDATA['IPDMRPTBBMI'].Items[0].Value))) {
        this.MASTERDATA['IPDMRPTBBMI'].Items[0].Value = 'N/A'
      }
    },
    changeLabelIndex () {
      this.MASTERDATA['IPDMRPETTNB'].ViName = 'Tình trạng người bệnh ra viện'
      this.MASTERDATA['IPDMRPETTNB'].EnName = 'Tình trạng người bệnh ra viện'
      this.MASTERDATA['IPDMRPEHDTV'].ViName = 'Hướng điều trị và các chế độ tiếp theo'
      this.MASTERDATA['IPDMRPEHDTV'].EnName = 'Hướng điều trị và các chế độ tiếp theo'
      if (this.MASTERDATA['IPDMRPETTNB'] && this.routeType === 'Neonatal') {
        this.MASTERDATA['IPDMRPETTNB'].ViName = 'Tình trạng sơ sinh ra viện'
        this.MASTERDATA['IPDMRPETTNB'].EnName = 'Tình trạng sơ sinh ra viện'
      }
      if (this.MASTERDATA['IPDMRPT867']) {
        this.MASTERDATA['IPDMRPT867'].Items[0].ViName = '1. Tự nhiên'
        this.MASTERDATA['IPDMRPT867'].Items[0].EnName = '1. Tự nhiên'
      }
    },
    pushDataIsNew () {
      if (this.MASTERDATA['IPDMRPT109'] && !this.MASTERDATA['IPDMRPT109'].Items[0].Value && this.Data.VongDau) {
        this.MASTERDATA['IPDMRPT109'].Items[0].Value = this.Data.VongDau
      }
      if (this.MASTERDATA['IPDMRPT141'] && !this.MASTERDATA['IPDMRPT141'].Items[0].Value && this.Data.NhipTho) {
        this.MASTERDATA['IPDMRPT141'].Items[0].Value = parseInt(this.Data.NhipTho)
      }
    },
    getMaForm (typeForm) {
      let maForm = ''
      if (typeForm === 'BMTIMMACH') {
        return ''
      }
      maForm = typeForm
      return maForm
    }
  }
}
</script>
