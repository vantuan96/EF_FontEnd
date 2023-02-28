<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{__label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="Form.UpdatedBy" /> {{__t('lúc')}} {{Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <table class="table v-table-1 table-bordered">
        <tr>
          <td colspan="4">{{__t('ETR.ngay_gio')}}: {{DataSubmit.TriageDateTime || 'N/A'}} {{__t('ETR.giuong')}}: {{DataSubmit.Bed || 'N/A'}}</td>
        </tr>
        <tr v-if="MASTERDATA['ETRTD0']">
          <th rowspan="2" class="align-left">{{__t('ETR.cau_hoi_sang_loc')}}</th>
          <th  width="200px" :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRTD0'].Items" class="no-wrap">
            {{item.Value}}
          </th>
        </tr>
        <tr v-if="MASTERDATA['ETRLOC']">
          <th :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRLOC'].Items">
            <v-select style="width: 180px" class='select-full-w' :search="true" :placeholder="__t('Địa điểm')" v-model="item.Value" :items="listRooms"/>
          </th>
        </tr>
        <tr v-if="MASTERDATA['ETRDPH']">
          <td>{{__label(MASTERDATA['ETRDPH'])}}</td>
          <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['ETRDPH'].Items">
            <div class="v-btn-checkbox text-center">
              <span class="el-radio-view" :class="{'disable': !YESNO[item.Value]}">{{YESNO[item.Value] || 'N/A'}}</span>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRDPN']">
          <td>{{__label(MASTERDATA['ETRDPN'])}}</td>
          <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRDPN'].Items">
            <div class="v-btn-checkbox text-center">
              <span class="el-radio-view" :class="{'disable': !YESNO[item.Value]}">{{YESNO[item.Value] || 'N/A'}}</span>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRHPS']">
          <td>{{__label(MASTERDATA['ETRHPS'])}}</td>
          <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRHPS'].Items">
            <div class="v-btn-checkbox text-center">
              <span class="el-radio-view" :class="{'disable': !YESNO[item.Value]}">{{YESNO[item.Value] || 'N/A'}}</span>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRUTH']">
          <td>{{__label(MASTERDATA['ETRUTH'])}}</td>
          <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRUTH'].Items">
            <div class="v-btn-checkbox text-center">
              <span class="el-radio-view" :class="{'disable': !YESNO[item.Value]}">{{YESNO[item.Value] || 'N/A'}}</span>
            </div>
          </td>
        </tr>
        <tr>
          <th colspan="4" class="align-left">{{__t('ETR.bien_phap_can_thiep')}}</th>
        </tr>
        <tr v-if="MASTERDATA['ETRFRS']">
          <td>{{__label(MASTERDATA['ETRFRS'])}}</td>
          <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRFRS'].Items" class="v-checkbox" align="center">
            <CheckboxValue v-model="item.Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRPIO']">
          <td>{{__label(MASTERDATA['ETRPIO'])}}</td>
          <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRPIO'].Items" class="v-checkbox" align="center">
            <CheckboxValue v-model="item.Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRLUA']">
          <td>{{__label(MASTERDATA['ETRLUA'])}}</td>
          <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRLUA'].Items" class="v-checkbox" align="center">
            <CheckboxValue v-model="item.Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRIOE']">
          <td>{{__label(MASTERDATA['ETRIOE'])}}</td>
          <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRIOE'].Items" class="v-checkbox" align="center">
            <CheckboxValue v-model="item.Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRSMA']">
          <td>{{__label(MASTERDATA['ETRSMA'])}}</td>
          <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRSMA'].Items" class="v-checkbox" align="center">
            <CheckboxValue v-model="item.Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRPAA']">
          <td>{{__label(MASTERDATA['ETRPAA'])}}</td>
          <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRPAA'].Items" class="v-checkbox" align="center">
            <CheckboxValue v-model="item.Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETREDF']">
          <td>{{__label(MASTERDATA['ETREDF'])}}</td>
          <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETREDF'].Items" class="v-checkbox" align="center">
            <CheckboxValue v-model="item.Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRRM0']">
          <td>{{__label(MASTERDATA['ETRRM0'])}}</td>
          <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRRM0'].Items" class="v-checkbox" align="center">
            <CheckboxValue v-model="item.Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRRBR']">
          <td>{{__label(MASTERDATA['ETRRBR'])}}</td>
          <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRRBR'].Items" class="v-checkbox" align="center">
            <CheckboxValue v-model="item.Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRUTY']">
          <td>{{__label(MASTERDATA['ETRUTY'])}}</td>
          <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRUTY'].Items" class="v-checkbox" align="center">
            <CheckboxValue v-model="item.Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRIOT']">
          <td>
            {{__label(MASTERDATA['ETRIOT'])}}
            <template v-for="(item,index) in MASTERDATA['ETRIOT'].Items">
              <div v-if="item.DataType === 'Text'" :key="index">{{item.Value}}</div>
            </template>
          </td>
          <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRIOT'].Items" class="v-checkbox" align="center" v-if="item.DataType === 'CheckBox'">
            <CheckboxValue v-model="item.Value" />
          </td>
        </tr>
      </table>
    </template>
  </Vcollapse>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import EmergencyTriageRecords from '@/services/ED/EmergencyTriageRecords'
import VSelect from '@/components/VSelectDisplay.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import _ from 'lodash'
export default {
  name: 'FallRiskScreen',
  mixins: [MixinMasterData],
  props: ['VisitId', 'Form'],
  components: {VSelect, ListOfCurrentMedications},
  data () {
    return {
      hasData: false,
      YESNO: ['Không', 'Có'],
      CHECKED: ['&#9745;', '&#9744;'],
      DataSubmit: {},
      listRooms: []
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
        this.getRooms()
        new EmergencyTriageRecords().find(this.VisitId).then(response => {
          this.DataSubmit = response
          response.Rooms.map(room => {
            this.listRooms.push(
              {
                value: room.Value,
                label: room.ViName,
                EnLabel: room.EnName || (room.ViName + '.'),
                code: room.Id
              }
            )
          })
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
