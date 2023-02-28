<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <div class="tbl-title">{{__t('1. Đánh giá chung')}}</div>
      <table class="table v-table-1 no-margin">
        <tr>
          <td colspan="4">{{__t('ETR.ngay_gio')}}: {{DataSubmit.TriageDateTime || 'N/A'}} {{__t('ETR.giuong')}}: {{DataSubmit.Bed || 'N/A'}}</td>
        </tr>
        <tr v-if="MASTERDATA['EDAFRSPVS0']">
          <th width="20%">{{__label(MASTERDATA['EDAFRSPVS0'])}}</th>
          <td>
            <template v-if="MASTERDATA['EDAFRSPPUL']">
              <div class="vcol150" :data="item" :key="index + 'EDAFRSPPUL'" v-for="(item,index) in MASTERDATA['EDAFRSPPUL'].Items">
                <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              </div>
            </template>
            <template v-if="MASTERDATA['EDAFRSPBP0']">
              <div class="vcol150" :data="item" :key="index + 'EDAFRSPBP0'" v-for="(item,index) in MASTERDATA['EDAFRSPBP0'].Items">
                <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              </div>
            </template>
            <template v-if="MASTERDATA['EDAFRSPTEM']">
              <div class="vcol150" :data="item" :key="index + 'EDAFRSPTEM'" v-for="(item,index) in MASTERDATA['EDAFRSPTEM'].Items">
                <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              </div>
            </template>
            <template v-if="MASTERDATA['EDAFRSPSPO']">
              <div class="vcol150" :data="item" :key="index + 'EDAFRSPSPO'" v-for="(item,index) in MASTERDATA['EDAFRSPSPO'].Items">
                <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              </div>
            </template>
            <template v-if="MASTERDATA['EDAFRSPRR0']">
              <div class="vcol150" :data="item" :key="index + 'EDAFRSPRR0'" v-for="(item,index) in MASTERDATA['EDAFRSPRR0'].Items">
                <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              </div>
            </template>
            <template v-if="MASTERDATA['EDAFRSPHEI']">
              <div class="vcol150" :data="item" :key="index + 'EDAFRSPHEI'" v-for="(item,index) in MASTERDATA['EDAFRSPHEI'].Items">
                <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              </div>
            </template>
            <template v-if="MASTERDATA['EDAFRSPWEI']">
              <div class="vcol150" :data="item" :key="index + 'EDAFRSPWEI'" v-for="(item,index) in MASTERDATA['EDAFRSPWEI'].Items">
                <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              </div>
            </template>
            <div class="vcol150">
              <label>BMI</label>
              <input type="number" class="form-control" readonly :value="bmiCalculation"/>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['EDAFRSPALL']" class="highlightedsss">
          <th width="20%">{{__label(MASTERDATA['EDAFRSPALL'])}}</th>
          <td>
            <MDRadioView :data="MASTERDATA['EDAFRSPALL'].Items" />
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['EDAFRSPALL'].Items">
              <template v-if="item.DataType === 'Radio' && item.Value"></template>
              <template v-else-if="item.DataType === 'Select' && item.Value && MASTERDATA['EDAFRSPALL'].Items[0].Value">
                <allergies-select :view="true" v-model="item.Value" :items="JSON.parse(item.Data)"/>
              </template>
              <template v-else-if="item.Value && MASTERDATA['EDAFRSPALL'].Items[0].Value">, {{item.Value}}</template>
            </span>
          </td>
        </tr>
        <tr v-if="MASTERDATA['EDAFRSPPAI']">
          <th width="20%">{{__label(MASTERDATA['EDAFRSPPAI'])}}</th>
          <td>
            <MDRadioView :data="MASTERDATA['EDAFRSPPAI'].Items" />
            <hr/>
            <template v-if="MASTERDATA['EDAFRSPPAI'].Items[0].Value">
              <div class="row">
                <template v-if="MASTERDATA['EDAFRSPPS0']">
                  <div class="col-md-3">
                    <label>{{__label(MASTERDATA['EDAFRSPPS0'])}}</label>
                    <div :key="index + 'EDAFRSPPS0'" v-for="(item,index) in MASTERDATA['EDAFRSPPS0'].Items"><div class="fake-input disable">{{item.Value || 'N/A'}}</div></div>
                  </div>
                </template>
                <template v-if="MASTERDATA['EDAFRSPPL0']">
                  <div class="col-md-3">
                    <label>{{__label(MASTERDATA['EDAFRSPPL0'])}}</label>
                    <div :key="index + 'EDAFRSPPL0'" v-for="(item,index) in MASTERDATA['EDAFRSPPL0'].Items"><div class="fake-input disable">{{item.Value || 'N/A'}}</div></div>
                  </div>
                </template>
                <template v-if="MASTERDATA['EDAFRSPPSD']">
                  <div class="col-md-6">
                    <label>{{__label(MASTERDATA['EDAFRSPPSD'])}}</label>
                    <div :key="index + 'EDAFRSPPSD'" v-for="(item,index) in MASTERDATA['EDAFRSPPSD'].Items"><div class="fake-input disable">{{item.Value || 'N/A'}}</div></div>
                  </div>
                </template>
              </div>
              <div class="v-row">
                <div class="flex-box flex-center">
                  <b>Tần suất đau</b>
                  <MDRadioView :data="MASTERDATA['EDAFRSPPF0'].Items" />
                  <template :data="item"  v-for="(item,index) in MASTERDATA['EDAFRSPPF0'].Items">
                    <span class="ml-5 mr-5" :key="index" v-if="item.DataType === 'Radio' && item.Value"></span>
                    <p :key="index" v-else-if="MASTERDATA['EDAFRSPPF0'].Items[3].Value && item.DataType === 'Text'" style="flex-grow: 1;margin: 0;" class="fake-input disable">{{item.Value}}</p>
                  </template>
                </div>
              </div>
              <div class="v-row ">
                <div class="group-radio">
                  <template v-if="MASTERDATA['EDAFRSPPC0']">
                    <b class="mr-5">{{__label(MASTERDATA['EDAFRSPPC0'])}}</b>
                    <div :key="index + 'EDAFRSPPC0'" v-for="(item,index) in MASTERDATA['EDAFRSPPC0'].Items"><p class="fake-input disable">{{item.Value || 'N/A'}}</p></div>
                  </template>
                </div>
              </div>
              <div class="v-row">
                <div class="flex-box flex-center">
                  {{__label(MASTERDATA['EDAFRSPHPU'])}}
                  <MDRadioView :data="MASTERDATA['EDAFRSPHPU'].Items" />
                </div>
              </div>
              <div class="v-row" v-if="MASTERDATA['EDAFRSPHPU'] && MASTERDATA['EDAFRSPHPU'].Items[0].Value">
                <div class="flex-box flex-center">
                  {{__label(MASTERDATA['EDAFRSPPME'])}}
                  <MDRadioView :data="MASTERDATA['EDAFRSPPME'].Items" />
                </div>
              </div>
            </template>
          </td>
        </tr>
        <tr v-if="MASTERDATA['EDAFRSPPRE']">
          <th width="20%">{{__label(MASTERDATA['EDAFRSPPRE'])}}</th>
          <td>
            <MDRadioView :data="MASTERDATA['EDAFRSPPRE'].Items" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['EDAFRSPBRE']">
          <th width="20%">{{__label(MASTERDATA['EDAFRSPBRE'])}}</th>
          <td>
            <MDRadioView :data="MASTERDATA['EDAFRSPBRE'].Items" />
          </td>
        </tr>
        <template v-if="DataSubmit.Version === 1">
        <tr v-if="MASTERDATA['EDAFRSPCDI']">
          <th width="20%">{{__label(MASTERDATA['EDAFRSPCDI'])}}</th>
          <td>
            <table class="no-border">
              <tr>
                <th width="20%">{{__label(MASTERDATA['EDAFRSPAFI'])}}</th>
                <td>
                  <MDRadioView :data="MASTERDATA['EDAFRSPAFI'].Items" />
                </td>
              </tr>
              <template v-if="MASTERDATA['EDAFRSPAFI'].Items[0].Value">
              <tr v-if="MASTERDATA['EDAFRSPARO']">
                <th class="no-border">{{__label(MASTERDATA['EDAFRSPARO'])}}</th>
                <td>
                  <MDRadioView :data="MASTERDATA['EDAFRSPARO'].Items" />
                </td>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPTOC']">
                <th class="no-border">{{__label(MASTERDATA['EDAFRSPTOC'])}}</th>
                <td>
                  <MDRadioView :data="MASTERDATA['EDAFRSPTOC'].Items" />
                </td>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPSOB']">
                <th class="no-border">{{__label(MASTERDATA['EDAFRSPSOB'])}}</th>
                <td>
                  <MDRadioView :data="MASTERDATA['EDAFRSPSOB'].Items" />
                </td>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPACC']">
                <th class="no-border">{{__label(MASTERDATA['EDAFRSPACC'])}}</th>
                <td>
                  <MDRadioView :data="MASTERDATA['EDAFRSPACC'].Items" />
                </td>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPDGL']">
                <th class="no-border">{{__label(MASTERDATA['EDAFRSPDGL'])}}</th>
                <td>
                  <MDRadioView :data="MASTERDATA['EDAFRSPDGL'].Items" />
                </td>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPLCL'] && MASTERDATA['EDAFRSPDGL'] && MASTERDATA['EDAFRSPDGL'].Items[1].Value">
                <th class="no-border">{{__label(MASTERDATA['EDAFRSPLCL'])}}</th>
                <td>
                  <div class="flex-box flex-center">
                    <MDRadioView :data="MASTERDATA['EDAFRSPLCL'].Items" />
                    <span class="fake-input disable" v-if="MASTERDATA['EDAFRSPLCL'].Items[3].Value">{{MASTERDATA['EDAFRSPLCL'].Items[4].Value || 'N/A'}}</span>
                  </div>
                </td>
              </tr>
              </template>
            </table>
          </td>
        </tr>
        </template>
        <tr v-else>
          <th width="20%">{{___t('Câu hỏi sàng lọc')}}</th>
          <td colspan="3">
            <CommunicableDiseasesScreening v-model="MASTERDATA" :type="'EDRS'" :version="DataSubmit.Version" :readonly="true"/>
          </td>
        </tr>
      </table>
      <div class="tbl-title">2. {{__t('Khai thác thông tin thuốc đã dùng')}}</div>
      <div class="box box-table">
        <list-of-current-medications
          :VisitId="_VisitId"
          ref="ListOfCurrentMedications"
          :Type="_VisitType + '-PatientMedicationList'"
          :VisitTypeGroupCode="_VisitType"
          :RealOnly="true"
        />
      </div>
    </template>
  </Vcollapse>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import AssessmentForRetailServicePatient from '@/services/AssessmentForRetailServicePatient'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import _ from 'lodash'
export default {
  name: 'EDAssessmentForRetailServicePatient',
  mixins: [MixinMasterData],
  props: ['VisitId', 'VisitType', 'Form', 'FormV2'],
  data () {
    return {
      hasData: false,
      YESNO: ['Không', 'Có'],
      DataSubmit: {}
    }
  },
  components: {
    ListOfCurrentMedications,
    CommunicableDiseasesScreening
  },
  computed: {
    ETRGCS: function () {
      return parseFloat(this.MASTERDATA['ETREYE'].Items[0].Value || 0) + parseFloat(this.MASTERDATA['ETRVOI'].Items[0].Value || 0) + parseFloat(this.MASTERDATA['ETRMOV'].Items[0].Value || 0)
    },
    bmiCalculation: function () {
      var weight = this.MASTERDATA['EDAFRSPWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['EDAFRSPWEI'].Items[0].Value) : 0
      var height = this.MASTERDATA['EDAFRSPHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['EDAFRSPHEI'].Items[0].Value) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    }
  },
  methods: {
    getData () {
      this.getMasterDatas({Form: 'EDAFRSP'}, () => {
        new AssessmentForRetailServicePatient({}, this._VisitType).find(this._VisitId + '?hidemsg=' + true).then(response => {
          this.DataSubmit = response
          this.hasData = true
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(response.Datas, {Code: code})
                if (exited) {
                  if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                    var isTrue = (exited.Value === 'True')
                    item.Value = isTrue
                  } else {
                    item.Value = exited.Value
                  }
                }
              })
            }
          }
        })
      })
    }
  }
}
</script>
