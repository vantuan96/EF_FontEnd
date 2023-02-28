<template>
  <div class="ed-info box-collapse" :class="{'open': open}">
    <div class="ed-customer-title">
      <b>{{__t('ETR.phan_loai_cap_cuu_benh_nhan')}}</b>
      <router-link :to="{name: 'ED-etr', params: { Id: EdId }}" class="pull-right" v-if="!readonlyview">
        <span class="glyphicon glyphicon-pencil"></span>
      </router-link>
    </div>
    <div class="box-collapse-content">
      <table class="etr-tbl table">
        <tr>
          <th width="20%" v-if="MASTERDATA['ETRCC0']">{{__label(MASTERDATA['ETRCC0'])}}</th>
          <td width="30%" v-if="MASTERDATA['ETRCC0']">
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRCC0'].Items">
              {{item.Value}}
            </span>
          </td>
          <th width="20%" v-if="MASTERDATA['ETRIA0']">{{__label(MASTERDATA['ETRIA0'])}}</th>
          <td width="30%" v-if="MASTERDATA['ETRIA0']">
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRIA0'].Items">
              {{item.Value}}
            </span>
          </td>
        </tr>
        <tr>
          <th v-if="MASTERDATA['ETRALL']" class="highlighted">
            {{__label(MASTERDATA['ETRALL'])}}
          </th>
          <td v-if="MASTERDATA['ETRALL']" class="highlighted">
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRALL'].Items">
              <template v-if="item.DataType === 'Radio' && item.Value">{{__label(item)}}</template>
              <template v-else-if="item.DataType === 'Select' && item.Value && MASTERDATA['ETRALL'].Items[0].Value">
                <allergies-select :view="true" v-model="item.Value" :items="JSON.parse(item.Data)"/>
              </template>
              <template v-else-if="item.Value && MASTERDATA['ETRALL'].Items[0].Value">, {{item.Value}}</template>
            </span>
          </td>
          <th v-if="MASTERDATA['ETRRES']">
            {{__label(MASTERDATA['ETRRES'])}}
          </th>
          <td v-if="MASTERDATA['ETRRES']">
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRRES'].Items">
              <template v-if="item.Value">
                {{__label(item)}}
              </template>
            </span>
          </td>
        </tr>
        <tr>
          <th v-if="MASTERDATA['ETRBGL']">
            {{__label(MASTERDATA['ETRBGL'])}}
          </th>
          <td v-if="MASTERDATA['ETRBGL']">
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRBGL'].Items">
              {{item.Value}} ({{item.Note}})
            </span>
          </td>
          <th v-if="MASTERDATA['ETRHEA']">
            {{__label(MASTERDATA['ETRHEA'])}}
          </th>
          <td v-if="MASTERDATA['ETRHEA']">
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRHEA'].Items">
              <template v-if="item.Value">
                {{item.DataType === 'Radio' ? __label(item) : `, ${item.Value || 'NA'}`}}
              </template>
            </span>
          </td>
        </tr>
        <tr>
          <th v-if="MASTERDATA['ETRRP0']">
            {{__label(MASTERDATA['ETRRP0'])}}
          </th>
          <td v-if="MASTERDATA['ETRRP0']">
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRRP0'].Items">
              <template v-if="item.Value">
                {{__label(item)}}
              </template>
            </span>
          </td>
          <th v-if="MASTERDATA['ETRGCS']">
            {{__label(MASTERDATA['ETRGCS'])}} ({{ETRGCS || 'N/A'}})
          </th>
          <td>
            <template v-if="MASTERDATA['ETRGCS']">
              <b>{{__label(MASTERDATA['ETREYE'])}}</b>
              <template v-for="it in MASTERDATA['ETREYE'].Items">
                {{it.Value || 'N/A'}}
              </template>
              <b>{{__label(MASTERDATA['ETRVOI'])}}</b>
              <template v-for="it in MASTERDATA['ETRVOI'].Items">
                {{it.Value || 'N/A'}}
              </template>
              <b>{{__label(MASTERDATA['ETRMOV'])}}</b>
              <template v-for="it in MASTERDATA['ETRMOV'].Items">
                {{it.Value || 'N/A'}}
              </template>
            </template>
          </td>
        </tr>
        <tr>
          <th v-if="MASTERDATA['ETRAVP']">
            {{__label(MASTERDATA['ETRAVP'])}}
          </th>
          <td v-if="MASTERDATA['ETRAVP']">
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRAVP'].Items">
              <template v-if="item.Value">
                {{__label(item)}}
              </template>
            </span>
          </td>
          <th v-if="MASTERDATA['ETRPAI']">
            {{__label(MASTERDATA['ETRPAI'])}}
          </th>
          <td v-if="MASTERDATA['ETRPAI']">
            <template v-if="MASTERDATA['ETRPAI'].Items[0].Value">
              <template :data="item"  v-for="(item, index) in MASTERDATA['ETRPSC'].Items">
                <labelvalue :key="index + 'ETRPSC'" v-if="item.DataType === 'Text'" :label="__label(item)" :value="item.Value"/>
              </template>
              <template :data="item"  v-for="(item, index) in MASTERDATA['ETRPL0'].Items">
                <labelvalue :key="index + 'ETRPL0'" v-if="item.DataType === 'Text'" :label="__label(item)" :value="item.Value"/>
              </template>
              <template :data="item"  v-for="(item, index) in MASTERDATA['ETRPSD'].Items">
                <labelvalue :key="index + 'ETRPSD'" v-if="item.DataType === 'Text'" :label="__label(item)" :value="item.Value"/>
              </template>
              <div>
                <labelvalue :label="__label(MASTERDATA['ETRPF0'])" :value="__label(getMDRadioValue(MASTERDATA['ETRPF0'].Items))"/>
                <template :data="item" v-for="(item, index) in MASTERDATA['ETRPF0'].Items">
                  <labelvalue :key="index + 'ETRPF0'" v-if="item.DataType === 'Text'" :label="''" :value="item.Value"/>
                </template>
              </div>
              <template :data="item" v-for="(item, index) in MASTERDATA['ETRPC0'].Items">
                <labelvalue :key="index + 'ETRPC0'" v-if="item.DataType === 'Text'" :label="__label(item)" :value="item.Value"/>
              </template>
              <div>
                <labelvalue :label="__label(MASTERDATA['ETRHPU'])" :value="__label(getMDRadioValue(MASTERDATA['ETRHPU'].Items))"/>
              </div>
              <div v-if="MASTERDATA['ETRHPU'] && MASTERDATA['ETRHPU'].Items[0].Value">
                <labelvalue :label="__label(MASTERDATA['ETRPME'])" :value="__label(getMDRadioValue(MASTERDATA['ETRPME'].Items))"/>
              </div>
            </template>
            <template v-else>
              <labelvalue :label="''" :value="__label(getMDRadioValue(MASTERDATA['ETRPAI'].Items))"/>
            </template>
          </td>
        </tr>
        <tr>
          <th v-if="MASTERDATA['ETRAF0']">
            {{__label(MASTERDATA['ETRAF0'])}}
          </th>
          <td v-if="MASTERDATA['ETRAF0']">
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRAF0'].Items">
              <template v-if="item.DataType === 'Radio' && item.Value">
                <b> {{__label(item)}}</b>
              </template>
              <template v-else-if="item.Value">
                {{item.Value}}
              </template>
            </span>
            <hr/>
            <p v-if="MASTERDATA['ETRARO'] && MASTERDATA['ETRAF0'].Items[0].Value">{{__label(MASTERDATA['ETRARO'])}}: <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRARO'].Items"><template v-if="item.Value"><b> {{__label(item)}}</b></template></span></p>
            <p v-if="MASTERDATA['ETRTOC'] && MASTERDATA['ETRAF0'].Items[0].Value">{{__label(MASTERDATA['ETRTOC'])}}: <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRTOC'].Items"><template v-if="item.Value"><b> {{__label(item)}}</b></template></span></p>
            <p v-if="MASTERDATA['ETRSOB'] && MASTERDATA['ETRAF0'].Items[0].Value">{{__label(MASTERDATA['ETRSOB'])}}: <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRSOB'].Items"><template v-if="item.Value"><b> {{__label(item)}}</b></template></span></p>
            <p v-if="MASTERDATA['ETRACC'] && MASTERDATA['ETRAF0'].Items[0].Value">{{__label(MASTERDATA['ETRACC'])}}: <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRACC'].Items"><template v-if="item.Value"><b> {{__label(item)}}</b></template></span></p>
            <p v-if="MASTERDATA['ETRDGL'] && MASTERDATA['ETRAF0'].Items[0].Value">{{__label(MASTERDATA['ETRDGL'])}}: <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRDGL'].Items"><template v-if="item.Value"><b> {{__label(item)}}</b></template></span></p>
            <p v-if="MASTERDATA['ETRLCL'] && MASTERDATA['ETRAF0'].Items[0].Value && MASTERDATA['ETRLCL'].Items[3].Value">{{__label(MASTERDATA['ETRLCL'])}}: <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRLCL'].Items" v-if="item.DataType === 'Text'">{{item.Value}}</span></p>
            <p v-if="MASTERDATA['ETRLCL'] && MASTERDATA['ETRAF0'].Items[0].Value && MASTERDATA['ETRDGL'].Items[1].Value && !MASTERDATA['ETRLCL'].Items[3].Value">{{__label(MASTERDATA['ETRLCL'])}}: <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRLCL'].Items"><template v-if="item.Value"><b> {{__label(item)}}</b></template></span></p>
          </td>
          <th v-if="MASTERDATA['ETRPHH']">
            {{__label(MASTERDATA['ETRPHH'])}}
          </th>
          <td v-if="MASTERDATA['ETRPHH']">
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRPHH'].Items">
              <template v-if="item.DataType === 'Radio' && item.Value">
                {{__label(item)}},
              </template>
              <template v-else-if="item.Value">
                {{item.Value}}
              </template>
            </span>
          </td>
        </tr>
        <tr>
          <th v-if="MASTERDATA['ETRPML']">
            {{__label(MASTERDATA['ETRPML'])}}
          </th>
          <td v-if="MASTERDATA['ETRPML']">
            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRPML'].Items">
              <template v-if="item.DataType === 'Radio' && item.Value">
                <b> {{__label(item)}}</b>
              </template>
              <template v-else-if="item.Value">
                {{item.Value}}
              </template>
            </span>
          </td>
          <td v-if="MASTERDATA['ETRHEI']" colspan="2">
            <b>{{__label(MASTERDATA['ETRHEI'])}}</b>
            <template v-if="MASTERDATA['ETRHEI']">
              <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRHEI'].Items">
                {{item.Value || 'N/A'}} {{item.Note}}
              </span>
              <b>{{__label(MASTERDATA['ETRWEI'])}}</b>
              <template v-for="it in MASTERDATA['ETRWEI'].Items">
                {{it.Value || 'N/A'}} {{it.Note}}
              </template>
              <b>{{__t('ETR.chi_so_bmi')}}</b> {{bmiCalculation}}
            </template>
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
          />
      </div>
      </template>
      <div class="wap-table">
        <observation-table-view :VisitId="this.$route.params.Id" :VisitType="'ED'"/>
      </div>
      <div class="wap-table">
        <orders-table-view :EdId="this.$route.params.Id"/>
      </div>
      <p></p>
    </div>
    <div class="box-action" @click="collapse()">
      <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
      <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
    </div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import EmergencyTriageRecords from '@/services/ED/EmergencyTriageRecords'
import VSelect from '@/components/VSelectDisplay.vue'
import ObservationTableView from '@/pages/ProgressNote/ObservationTableView.vue'
import OrdersTableView from '@/components/ED/OrdersTableView.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import _ from 'lodash'
export default {
  name: 'ETR-VIEW',
  mixins: [MixinMasterData],
  props: ['EdId', 'readonlyview'],
  components: {VSelect, OrdersTableView, ObservationTableView, ListOfCurrentMedications},
  data () {
    return {
      collapseId: '',
      open: false
    }
  },
  created () {
    this.collapseId = 'collapse_etr-' + Math.floor(Math.random() * 10)
    this.getMasterDatas({Form: 'ETR'}, () => {
      this.getData()
    })
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
    collapse () {
      this.open = !this.open
    },
    getData () {
      new EmergencyTriageRecords().find(this.EdId).then(response => {
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
    }
  }
}
</script>
