<template>
  <div>
    <div class="tbl-title">{{__t('1. Đánh giá chung')}}</div>
    <table class="table v-table-1 no-margin">
      <tr>
        <td colspan="4">{{__t('ETR.ngay_gio')}}: {{DataSubmit.TriageDateTime || 'N/A'}} {{__t('ETR.giuong')}}: {{DataSubmit.Bed || 'N/A'}}</td>
      </tr>
      <tr v-if="MASTERDATATMP['EDAFRSPVS0']">
        <th width="20%">{{__label(MASTERDATATMP['EDAFRSPVS0'])}}</th>
        <td>
          <template v-if="MASTERDATATMP['EDAFRSPPUL']">
            <div class="vcol150" :data="item" :key="index + 'EDAFRSPPUL'" v-for="(item,index) in MASTERDATATMP['EDAFRSPPUL'].Items">
              <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
            </div>
          </template>
          <template v-if="MASTERDATATMP['EDAFRSPBP0']">
            <div class="vcol150" :data="item" :key="index + 'EDAFRSPBP0'" v-for="(item,index) in MASTERDATATMP['EDAFRSPBP0'].Items">
              <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
            </div>
          </template>
          <template v-if="MASTERDATATMP['EDAFRSPTEM']">
            <div class="vcol150" :data="item" :key="index + 'EDAFRSPTEM'" v-for="(item,index) in MASTERDATATMP['EDAFRSPTEM'].Items">
              <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
            </div>
          </template>
          <template v-if="MASTERDATATMP['EDAFRSPSPO']">
            <div class="vcol150" :data="item" :key="index + 'EDAFRSPSPO'" v-for="(item,index) in MASTERDATATMP['EDAFRSPSPO'].Items">
              <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
            </div>
          </template>
          <template v-if="MASTERDATATMP['EDAFRSPRR0']">
            <div class="vcol150" :data="item" :key="index + 'EDAFRSPRR0'" v-for="(item,index) in MASTERDATATMP['EDAFRSPRR0'].Items">
              <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
            </div>
          </template>
          <template v-if="MASTERDATATMP['EDAFRSPHEI']">
            <div class="vcol150" :data="item" :key="index + 'EDAFRSPHEI'" v-for="(item,index) in MASTERDATATMP['EDAFRSPHEI'].Items">
              <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
            </div>
          </template>
          <template v-if="MASTERDATATMP['EDAFRSPWEI']">
            <div class="vcol150" :data="item" :key="index + 'EDAFRSPWEI'" v-for="(item,index) in MASTERDATATMP['EDAFRSPWEI'].Items">
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
      <tr v-if="MASTERDATATMP['EDAFRSPALL']" class="highlightedsss">
        <th width="20%">{{__label(MASTERDATATMP['EDAFRSPALL'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATATMP['EDAFRSPALL'].Items" />
          <span :data="item" :key="index" v-for="(item,index) in MASTERDATATMP['EDAFRSPALL'].Items">
            <template v-if="item.DataType === 'Radio' && item.Value"></template>
            <template v-else-if="item.DataType === 'Select' && item.Value && MASTERDATATMP['EDAFRSPALL'].Items[0].Value">
              <allergies-select :view="true" v-model="item.Value" :items="JSON.parse(item.Data)"/>
            </template>
            <template v-else-if="item.Value && MASTERDATATMP['EDAFRSPALL'].Items[0].Value">, {{item.Value}}</template>
          </span>
        </td>
      </tr>
      <tr v-if="MASTERDATATMP['EDAFRSPPAI']">
        <th width="20%">{{__label(MASTERDATATMP['EDAFRSPPAI'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATATMP['EDAFRSPPAI'].Items" />
          <hr/>
          <template v-if="MASTERDATATMP['EDAFRSPPAI'].Items[0].Value">
            <div class="row">
              <template v-if="MASTERDATATMP['EDAFRSPPS0']">
                <div class="col-md-3">
                  <label>{{__label(MASTERDATATMP['EDAFRSPPS0'])}}</label>
                  <div :key="index + 'EDAFRSPPS0'" v-for="(item,index) in MASTERDATATMP['EDAFRSPPS0'].Items"><div class="fake-input disable">{{item.Value || 'N/A'}}</div></div>
                </div>
              </template>
              <template v-if="MASTERDATATMP['EDAFRSPPL0']">
                <div class="col-md-3">
                  <label>{{__label(MASTERDATATMP['EDAFRSPPL0'])}}</label>
                  <div :key="index + 'EDAFRSPPL0'" v-for="(item,index) in MASTERDATATMP['EDAFRSPPL0'].Items"><div class="fake-input disable">{{item.Value || 'N/A'}}</div></div>
                </div>
              </template>
              <template v-if="MASTERDATATMP['EDAFRSPPSD']">
                <div class="col-md-6">
                  <label>{{__label(MASTERDATATMP['EDAFRSPPSD'])}}</label>
                  <div :key="index + 'EDAFRSPPSD'" v-for="(item,index) in MASTERDATATMP['EDAFRSPPSD'].Items"><div class="fake-input disable">{{item.Value || 'N/A'}}</div></div>
                </div>
              </template>
            </div>
            <div class="v-row">
              <div class="flex-box flex-center">
                <b>Tần suất đau</b>
                <MDRadioView :data="MASTERDATATMP['EDAFRSPPF0'].Items" />
                <template :data="item"  v-for="(item,index) in MASTERDATATMP['EDAFRSPPF0'].Items">
                  <span class="ml-5 mr-5" :key="index" v-if="item.DataType === 'Radio' && item.Value"></span>
                  <p :key="index" v-else-if="MASTERDATATMP['EDAFRSPPF0'].Items[3].Value && item.DataType === 'Text'" style="flex-grow: 1;margin: 0;" class="fake-input disable">{{item.Value}}</p>
                </template>
              </div>
            </div>
            <div class="v-row ">
              <div class="group-radio">
                <template v-if="MASTERDATATMP['EDAFRSPPC0']">
                  <b class="mr-5">{{__label(MASTERDATATMP['EDAFRSPPC0'])}}</b>
                  <div :key="index + 'EDAFRSPPC0'" v-for="(item,index) in MASTERDATATMP['EDAFRSPPC0'].Items"><p class="fake-input disable">{{item.Value || 'N/A'}}</p></div>
                </template>
              </div>
            </div>
            <div class="v-row">
              <div class="flex-box flex-center">
                {{__label(MASTERDATATMP['EDAFRSPHPU'])}}
                <MDRadioView :data="MASTERDATATMP['EDAFRSPHPU'].Items" />
              </div>
            </div>
            <div class="v-row" v-if="MASTERDATATMP['EDAFRSPHPU'] && MASTERDATATMP['EDAFRSPHPU'].Items[0].Value">
              <div class="flex-box flex-center">
                {{__label(MASTERDATATMP['EDAFRSPPME'])}}
                <MDRadioView :data="MASTERDATATMP['EDAFRSPPME'].Items" />
              </div>
            </div>
          </template>
        </td>
      </tr>
      <tr v-if="MASTERDATATMP['EDAFRSPPRE']">
        <th width="20%">{{__label(MASTERDATATMP['EDAFRSPPRE'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATATMP['EDAFRSPPRE'].Items" />
        </td>
      </tr>
      <tr v-if="MASTERDATATMP['EDAFRSPBRE']">
        <th width="20%">{{__label(MASTERDATATMP['EDAFRSPBRE'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATATMP['EDAFRSPBRE'].Items" />
        </td>
      </tr>
      <template v-if="DataSubmit.Version === 1">
      <tr v-if="MASTERDATATMP['EDAFRSPCDI']">
        <th width="20%">{{__label(MASTERDATATMP['EDAFRSPCDI'])}}</th>
        <td>
          <table class="no-border">
            <tr>
              <th width="20%">{{__label(MASTERDATATMP['EDAFRSPAFI'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATATMP['EDAFRSPAFI'].Items" />
              </td>
            </tr>
            <template v-if="MASTERDATATMP['EDAFRSPAFI'].Items[0].Value">
            <tr v-if="MASTERDATATMP['EDAFRSPARO']">
              <th class="no-border">{{__label(MASTERDATATMP['EDAFRSPARO'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATATMP['EDAFRSPARO'].Items" />
              </td>
            </tr>
            <tr v-if="MASTERDATATMP['EDAFRSPTOC']">
              <th class="no-border">{{__label(MASTERDATATMP['EDAFRSPTOC'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATATMP['EDAFRSPTOC'].Items" />
              </td>
            </tr>
            <tr v-if="MASTERDATATMP['EDAFRSPSOB']">
              <th class="no-border">{{__label(MASTERDATATMP['EDAFRSPSOB'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATATMP['EDAFRSPSOB'].Items" />
              </td>
            </tr>
            <tr v-if="MASTERDATATMP['EDAFRSPACC']">
              <th class="no-border">{{__label(MASTERDATATMP['EDAFRSPACC'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATATMP['EDAFRSPACC'].Items" />
              </td>
            </tr>
            <tr v-if="MASTERDATATMP['EDAFRSPDGL']">
              <th class="no-border">{{__label(MASTERDATATMP['EDAFRSPDGL'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATATMP['EDAFRSPDGL'].Items" />
              </td>
            </tr>
            <tr v-if="MASTERDATATMP['EDAFRSPLCL'] && MASTERDATATMP['EDAFRSPDGL'] && MASTERDATATMP['EDAFRSPDGL'].Items[1].Value">
              <th class="no-border">{{__label(MASTERDATATMP['EDAFRSPLCL'])}}</th>
              <td>
                <div class="flex-box flex-center">
                  <MDRadioView :data="MASTERDATATMP['EDAFRSPLCL'].Items" />
                  <span class="fake-input disable" v-if="MASTERDATATMP['EDAFRSPLCL'].Items[3].Value">{{MASTERDATATMP['EDAFRSPLCL'].Items[4].Value || 'N/A'}}</span>
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
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
export default {
  name: 'AssessmentViewOnlyOPD',
  mixins: [MixinMasterData],
  props: ['DataSubmit', 'MASTERDATATMP'],
  data () {
    return {
      hasData: false,
      YESNO: ['Không', 'Có']
    }
  },
  components: {
    ListOfCurrentMedications,
    CommunicableDiseasesScreening
  },
  computed: {
    ETRGCS: function () {
      return parseFloat(this.MASTERDATATMP['ETREYE'].Items[0].Value || 0) + parseFloat(this.MASTERDATATMP['ETRVOI'].Items[0].Value || 0) + parseFloat(this.MASTERDATATMP['ETRMOV'].Items[0].Value || 0)
    },
    bmiCalculation: function () {
      var weight = this.MASTERDATATMP['EDAFRSPWEI'].Items[0].Value ? parseFloat(this.MASTERDATATMP['EDAFRSPWEI'].Items[0].Value) : 0
      var height = this.MASTERDATATMP['EDAFRSPHEI'].Items[0].Value ? (parseFloat(this.MASTERDATATMP['EDAFRSPHEI'].Items[0].Value) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    }
  },
  methods: {
  }
}
</script>
