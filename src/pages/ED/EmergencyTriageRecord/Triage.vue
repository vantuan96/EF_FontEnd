<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <table class="table v-table-1">
        <tr>
          <td colspan="2"><b>{{__t('ETR.ngay_gio')}}</b> {{DataSubmit.TriageDateTime || 'N/A'}} <b>{{__t('ETR.giuong')}}</b> {{DataSubmit.Bed || 'N/A'}}</td>
        </tr>
        <tr v-if="MASTERDATA['ETRATS']">
          <th width="20%">{{__label(MASTERDATA['ETRATS'])}}</th>
          <td>
            <MDRadioView :data="MASTERDATA['ETRATS'].Items" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRCC0']">
          <th width="20%">
            <!-- Than phiền chính -->
            {{__label(MASTERDATA['ETRCC0'])}}
            <!-- <tpc ref="VisioPopup" /> -->
          </th>
          <td>
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRCC0'].Items" class="cursor">
              <textarea-autosize readonly="readonly" class="form-control" v-model="item.Value"/>
            </span>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRIA0']">
          <th width="20%">
            <!-- Đánh giá sơ bộ -->
            {{__label(MASTERDATA['ETRIA0'])}}
          </th>
          <td>
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRIA0'].Items">
              <textarea-autosize readonly="readonly" class="form-control" v-model="item.Value"/>
            </span>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRALL']" class="borded-bottom highlighted-radio">
          <!-- dị ứng -->
          <th width="20%">{{__label(MASTERDATA['ETRALL'])}}</th>
          <td>
            <MDRadioView :data="MASTERDATA['ETRALL'].Items" />
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRALL'].Items">
              <template v-if="item.DataType === 'Radio' && item.Value"></template>
              <template v-else-if="item.DataType === 'Select' && item.Value && MASTERDATA['ETRALL'].Items[0].Value">
                <allergies-select :view="true" v-model="item.Value" :items="JSON.parse(item.Data)"/>
              </template>
              <template v-else-if="item.Value && MASTERDATA['ETRALL'].Items[0].Value">, {{item.Value}}</template>
            </span>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRRES']">
          <th width="20%">{{__label(MASTERDATA['ETRRES'])}}</th>
          <td>
            <MDRadioView :data="MASTERDATA['ETRRES'].Items" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRBGL']">
          <th width="20%">{{__label(MASTERDATA['ETRBGL'])}}</th>
          <td>
            <div :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRBGL'].Items">
              <span class="fake-input disable">{{item.Value || 'N/A'}}</span>
              <span>{{item.Note}}</span>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRHEA']">
          <th width="20%">{{__label(MASTERDATA['ETRHEA'])}}</th>
          <td>
            <div class="flex-box flex-center">
              <MDRadioView :data="MASTERDATA['ETRHEA'].Items" />
              <div class="fake-input disable" v-if="MASTERDATA['ETRHEA'].Items[2].Value">{{MASTERDATA['ETRHEA'].Items[3].Value || 'N/A'}}</div>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRRP0']">
          <th width="20%">{{__label(MASTERDATA['ETRRP0'])}}</th>
          <td>
            <MDRadioView :data="MASTERDATA['ETRRP0'].Items" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRGCS']">
          <th width="20%">
            {{__label(MASTERDATA['ETRGCS'])}}
            <!-- Glasgow comma Scale -->
          </th>
          <td>
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRGCS'].Items">
              <span class="fake-input disable">{{ETRGCS}}</span>
            </span>
            <b>{{__label(MASTERDATA['ETREYE'])}}</b>
            <template v-for="it in MASTERDATA['ETREYE'].Items">
              <span :key="it.Code + '-label'" class="fake-input disable">{{it.Value || 'N/A'}}</span>
            </template>
            <b>{{__label(MASTERDATA['ETRVOI'])}}</b>
            <template v-for="it in MASTERDATA['ETRVOI'].Items">
              <span :key="it.Code + '-label'" class="fake-input disable">{{it.Value || 'N/A'}}</span>
            </template>
            <b>{{__label(MASTERDATA['ETRMOV'])}}</b>
            <template v-for="it in MASTERDATA['ETRMOV'].Items">
              <span :key="it.Code + '-label'" class="fake-input disable">{{it.Value || 'N/A'}}</span>
            </template>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRAVP']">
          <th width="20%">{{__label(MASTERDATA['ETRAVP'])}}</th>
          <td>
            <MDRadioView :data="MASTERDATA['ETRAVP'].Items" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRPS0']" class="borded-bottom hidden-on-production">
          <!-- Điểm đau -->
          <th width="20%">{{__label(MASTERDATA['ETRPS0'])}} Cũ, tạm thời giữ lại để test đồng bộ cũ mới</th>
          <td>
            <MDRadioView :data="MASTERDATA['ETRPS0'].Items" />
            <div class="group-radio">
              <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRPS0'].Items">
                <template v-if="item.DataType === 'Radio'">
                </template>
                <template v-else-if="item.DataType === 'Select'">
                  <v-select :placeholder="__t('Đơn vị')" v-model="item.Value" :items="JSONParse(item.Data, true)"/>
                </template>
                <template v-else>
                  <span class="fake-input disable">{{item.Value || 'N/A'}}</span>
                </template>
              </span>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRPAI']">
          <th width="20%">{{__label(MASTERDATA['ETRPAI'])}}</th>
          <td>
            <MDRadioView :data="MASTERDATA['ETRPAI'].Items" />
            <template v-if="MASTERDATA['ETRPAI'].Items[0].Value">
              <hr/>
              <div class="row">
                <template v-if="MASTERDATA['ETRPSC']">
                  <div class="col-md-3">
                    <label>{{__label(MASTERDATA['ETRPSC'])}}</label>
                    <div class="fake-input disable" :data="item" :key="index + 'ETRPSC'" v-for="(item,index) in MASTERDATA['ETRPSC'].Items">{{item.Value || 'N/A'}}</div>
                  </div>
                </template>
                <template v-if="MASTERDATA['ETRPL0']">
                  <div class="col-md-3">
                    <label>{{__label(MASTERDATA['ETRPL0'])}}</label>
                    <div class="fake-input disable" :data="item" :key="index + 'ETRPL0'" v-for="(item,index) in MASTERDATA['ETRPL0'].Items">{{item.Value || 'N/A'}}</div>
                  </div>
                </template>
                <template v-if="MASTERDATA['ETRPSD']">
                  <div class="col-md-6">
                    <label>{{__label(MASTERDATA['ETRPSD'])}}</label>
                    <div class="fake-input disable" :data="item" :key="index + 'ETRPSD'" v-for="(item,index) in MASTERDATA['ETRPSD'].Items">{{item.Value || 'N/A'}}</div>
                  </div>
                </template>
              </div>
              <div class="v-row">
                <div class="flex-box flex-center">
                  <b class="no-wrap">Tần suất đau</b>
                  <MDRadioView :data="MASTERDATA['ETRPF0'].Items" />
                  <div class="fake-input disable" v-if="MASTERDATA['ETRPF0'].Items[3].Value">{{MASTERDATA['ETRPF0'].Items[4].Value || 'N/A'}}</div>
                </div>
              </div>
              <div class="v-row ">
                <div class="flex-box flex-center">
                  <template v-if="MASTERDATA['ETRPC0']">
                    <b class="no-wrap">{{__label(MASTERDATA['ETRPC0'])}}</b>
                    <div class="fake-input disable" :data="item" :key="index + 'ETRPC0'" v-for="(item,index) in MASTERDATA['ETRPC0'].Items">{{item.Value || 'N/A'}}</div>
                  </template>
                </div>
              </div>
              <div class="v-row">
                <template v-if="MASTERDATA['ETRHPU']">
                  <div class="flex-box  flex-center">
                    <b>{{__label(MASTERDATA['ETRHPU'])}}</b>
                    <MDRadioView :data="MASTERDATA['ETRHPU'].Items" />
                    <i class="flex-box-label" v-if="MASTERDATA['ETRHPU'].Items[0].Value">Bác sĩ khai thác thông tin tại phiếu khám ngoại trú</i>
                  </div>
                </template>
              </div>
              <div class="v-row" v-if="MASTERDATA['ETRHPU'] && MASTERDATA['ETRHPU'].Items[0].Value">
                <template v-if="MASTERDATA['ETRPME']">
                  <div class="flex-box  flex-center">
                    <b>{{__label(MASTERDATA['ETRPME'])}}</b>
                    <MDRadioView :data="MASTERDATA['ETRPME'].Items" />
                  </div>
                </template>
              </div>
            </template>
          </td>
        </tr>
        <template v-if="DataSubmit.Version === 1">
        <tr v-if="MASTERDATA['ETRAF0']" class="borded-bottom">
          <th width="20%">{{__label(MASTERDATA['ETRAF0'])}}</th>
          <td>
            <div class="row">
              <div class="col-md-2">
                <MDRadioView :data="MASTERDATA['ETRAF0'].Items" />
              </div>
              <div class="col-md-10" v-if="MASTERDATA['ETRAF0'].Items[0].Value && MASTERDATA['ETRARO']">
                <b>{{__label(MASTERDATA['ETRARO'])}}</b>
                <MDRadioView :data="MASTERDATA['ETRARO'].Items" />
                <hr/>
                <b>{{__label(MASTERDATA['ETRTOC'])}}</b>
                <MDRadioView :data="MASTERDATA['ETRTOC'].Items" />
                <hr/>
                <b>{{__label(MASTERDATA['ETRSOB'])}}</b>
                <MDRadioView :data="MASTERDATA['ETRSOB'].Items" />
                <hr/>
                <b>{{__label(MASTERDATA['ETRACC'])}}</b>
                <MDRadioView :data="MASTERDATA['ETRACC'].Items" />
                <hr/>
                <b>{{__label(MASTERDATA['ETRDGL'])}}</b>
                <MDRadioView :data="MASTERDATA['ETRDGL'].Items" />
                <hr/>
                <template v-if="MASTERDATA['ETRDGL'] && MASTERDATA['ETRDGL'].Items[1].Value">
                <div class="flex-box flex-center">
                  <b>{{__label(MASTERDATA['ETRLCL'])}}</b>
                  <MDRadioView :data="MASTERDATA['ETRLCL'].Items" />
                  <div v-if="MASTERDATA['ETRLCL'].Items[3].Value" class="fake-input disable">{{MASTERDATA['ETRLCL'].Items[4].Value || 'N/A'}}</div>
                </div>
                </template>
              </div>
            </div>
          </td>
        </tr>
        </template>
        <tr v-else>
          <th width="20%">{{___t('Câu hỏi sàng lọc')}}</th>
          <td colspan="3">
            <CommunicableDiseasesScreening v-model="MASTERDATA" :type="'EDET'" :version="DataSubmit.Version" :readonly="true"/>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRPHH']">
          <th width="20%">{{__label(MASTERDATA['ETRPHH'])}}</th>
          <td>
            <div class="flex-box flex-center">
              <MDRadioView :data="MASTERDATA['ETRPHH'].Items" />
              <div v-if="MASTERDATA['ETRPHH'].Items[0].Value" class="fake-input disable">{{MASTERDATA['ETRPHH'].Items[2].Value || 'N/A'}}</div>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRPML']" class="borded-bottom">
          <th width="20%">{{__label(MASTERDATA['ETRPML'])}}</th>
          <td>
            <MDRadioView :data="MASTERDATA['ETRPML'].Items" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRHEI']" class="borded-bottom">
          <th width="20%">{{__label(MASTERDATA['ETRHEI'])}}</th>
          <td>
            <template :data="item"  v-for="(item, index) in MASTERDATA['ETRHEI'].Items">
              <div class="v-addone-input-group" :key="item.Code + '-' +index" >
                <input type="number" readonly v-model="item.Value" class="v-input-md2 form-control"/>
                <span>{{item.Note}}</span>
              </div>
            </template>
            <label>{{__label(MASTERDATA['ETRWEI'])}}</label>
            <template :data="item"  v-for="(item, index) in MASTERDATA['ETRWEI'].Items">
              <div class="v-addone-input-group" :key="item.Code + '-' +index" >
                <input type="number" readonly v-model="item.Value" class="v-input-md2 form-control"/>
                <span>{{item.Note}}</span>
              </div>
            </template>
            <label>{{__t('ETR.chi_so_bmi')}}</label>
            <input type="number" readonly class="v-input-md2 form-control" :value="bmiCalculation"/>
            <height-and-weight v-if="DataSubmit.IsNew" @copy="push2Wh" />
          </td>
        </tr>
      </table>
      <template v-if="MASTERDATA['ETRPML'] && MASTERDATA['ETRPML'].Items[0].Value">
      <div class="wap-table">
        <h3>{{__t('Khai thác thông tin thuốc đã dùng')}}</h3>
        <list-of-current-medications
          ref="ListOfCurrentMedications"
          :Type="'ED-PatientMedicationList'"
          :VisitTypeGroupCode="'ED'"
          :RealOnly="true"
          :VisitId="_VisitId"
          />
      </div>
      </template>
    </template>
  </Vcollapse>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import EmergencyTriageRecords from '@/services/ED/EmergencyTriageRecords'
import VSelect from '@/components/VSelectDisplay.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
import ObservationTable from '@/pages/ProgressNote/ObservationTable.vue'
import _ from 'lodash'
export default {
  name: 'EDEmergencyTriageRecord',
  mixins: [MixinMasterData],
  props: ['VisitId', 'Form', 'FormV2'],
  components: {VSelect, ListOfCurrentMedications, ObservationTable, CommunicableDiseasesScreening},
  data () {
    return {
      hasData: false,
      DataSubmit: {}
    }
  },
  created () {
  },
  computed: {
    ETRGCS: function () {
      return parseFloat(this.MASTERDATA['ETREYE'].Items[0].Value || 0) + parseFloat(this.MASTERDATA['ETRVOI'].Items[0].Value || 0) + parseFloat(this.MASTERDATA['ETRMOV'].Items[0].Value || 0)
    },
    bmiCalculation: function () {
      var weight = parseFloat(this.MASTERDATA['ETRWEI'].Items[0].Value)
      var height = parseFloat(this.MASTERDATA['ETRHEI'].Items[0].Value) / 100
      return (weight / (height * height)).toFixed(2)
    }
  },
  methods: {
    getData () {
      this.getMasterDatas({Form: 'ETR'}, () => {
        new EmergencyTriageRecords().find(this.VisitId).then(response => {
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
