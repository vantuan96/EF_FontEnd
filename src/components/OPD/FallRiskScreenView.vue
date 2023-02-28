<template>
  <table class="table v-table-1 table-bordered">
    <tr v-if="MASTERDATA['OPDFRSFOPTD0']">
      <th rowspan="2" class="align-left">{{__t('ETR.cau_hoi_sang_loc')}}</th>
      <th class="text-center" :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPTD0'].Items" width="200">
        {{item.Value}}
      </th>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPLOC']">
      <th :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPLOC'].Items">
        <v-select style="width: 180px" class='select-full-w text-center' :search="true" :readonly="true" :placeholder="__t('Địa điểm')" v-model="item.Value" :items="options"/>
      </th>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPDPH']">
      <td>{{__label(MASTERDATA['OPDFRSFOPDPH'])}}</td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPDPH'].Items">
        <div class="v-btn-checkbox text-center">
          <span class="el-radio-view" :class="{'disable': !YESNO[item.Value]}">{{YESNO[item.Value] || 'N/A'}}</span>
        </div>
      </td>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPDPN']">
      <td>{{__label(MASTERDATA['OPDFRSFOPDPN'])}}</td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPDPN'].Items">
        <div class="v-btn-checkbox text-center">
          <span class="el-radio-view" :class="{'disable': !YESNO[item.Value]}">{{YESNO[item.Value] || 'N/A'}}</span>
        </div>
      </td>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPHPF']">
      <td>{{__label(MASTERDATA['OPDFRSFOPHPF'])}}</td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPHPF'].Items">
        <div class="v-btn-checkbox text-center">
          <span class="el-radio-view" :class="{'disable': !YESNO[item.Value]}">{{YESNO[item.Value] || 'N/A'}}</span>
        </div>
      </td>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPUTH']">
      <td>{{__label(MASTERDATA['OPDFRSFOPUTH'])}}</td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPUTH'].Items">
        <div class="v-btn-checkbox text-center">
          <span class="el-radio-view" :class="{'disable': !YESNO[item.Value]}">{{YESNO[item.Value] || 'N/A'}}</span>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="4"><span style="color: red;font-size: 13px;font-style: italic;">{{__t('*Người bệnh có ít nhất 1 trong 4 câu hỏi sàng lọc thì được đánh giá là có nguy cơ ngã cao và cần áp dụng các biện pháp can thiệp phù hợp.')}}</span></td>
    </tr>
    <template v-if="hasInitialAssessment">
    <tr v-if="MASTERDATA['OPDFRSFOPINT']">
      <th colspan="4" style="text-align: left;">{{__label(MASTERDATA['OPDFRSFOPINT'])}}</th>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPFRS']">
      <td>{{__label(MASTERDATA['OPDFRSFOPFRS'])}}</td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPFRS'].Items" class="v-checkbox" align="center">
        <CheckboxValue v-model="item.Value" />
      </td>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPPIO']">
      <td>{{__label(MASTERDATA['OPDFRSFOPPIO'])}}</td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPPIO'].Items" class="v-checkbox" align="center">
        <CheckboxValue v-model="item.Value" />
      </td>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPLUA']">
      <td>{{__label(MASTERDATA['OPDFRSFOPLUA'])}}</td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPLUA'].Items" class="v-checkbox" align="center">
        <CheckboxValue v-model="item.Value" />
      </td>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPIOE']">
      <td>{{__label(MASTERDATA['OPDFRSFOPIOE'])}}</td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPIOE'].Items" class="v-checkbox" align="center">
        <CheckboxValue v-model="item.Value" />
      </td>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPSPM']">
      <td>{{__label(MASTERDATA['OPDFRSFOPSPM'])}}</td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPSPM'].Items" class="v-checkbox" align="center">
        <CheckboxValue v-model="item.Value" />
      </td>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPPAA']">
      <td>{{__label(MASTERDATA['OPDFRSFOPPAA'])}}</td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPPAA'].Items" class="v-checkbox" align="center">
        <CheckboxValue v-model="item.Value" />
      </td>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPEDF']">
      <td>{{__label(MASTERDATA['OPDFRSFOPEDF'])}}</td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPEDF'].Items" class="v-checkbox" align="center">
        <CheckboxValue v-model="item.Value" />
      </td>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPRM0']">
      <td>{{__label(MASTERDATA['OPDFRSFOPRM0'])}}</td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPRM0'].Items" class="v-checkbox" align="center">
        <CheckboxValue v-model="item.Value" />
      </td>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPRBR']">
      <td>{{__label(MASTERDATA['OPDFRSFOPRBR'])}}</td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPRBR'].Items" class="v-checkbox" align="center">
        <CheckboxValue v-model="item.Value" />
      </td>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPUTY']">
      <td>{{__label(MASTERDATA['OPDFRSFOPUTY'])}}</td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPUTY'].Items" class="v-checkbox" align="center">
        <CheckboxValue v-model="item.Value" />
      </td>
    </tr>
    <tr v-if="MASTERDATA['OPDFRSFOPOTH']">
      <td>
        {{__label(MASTERDATA['OPDFRSFOPOTH'])}}
        <template v-for="(item,index) in MASTERDATA['OPDFRSFOPOTH'].Items">
          <div v-if="item.DataType === 'Text'" :key="index">{{item.Value}}</div>
        </template>
      </td>
      <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPOTH'].Items" class="v-checkbox" align="center" v-if="item.DataType === 'CheckBox'">
        <CheckboxValue v-model="item.Value" />
      </td>
    </tr>
    </template>
  </table>
</template>
<script>
import VSelect from '@/components/VSelect.vue'
export default {
  name: 'FallRiskScreenView',
  props: ['VisitId', 'MASTERDATA', 'options'],
  components: {VSelect},
  data () {
    return {
      hasData: false,
      YESNO: ['Không', 'Có'],
      CHECKED: ['&#9745;', '&#9744;']
    }
  },
  created () {
  },
  computed: {
    hasInitialAssessment: function () {
      var list = [
        ...(this.MASTERDATA['OPDFRSFOPDPH'] ? this.MASTERDATA['OPDFRSFOPDPH'].Items : []),
        ...(this.MASTERDATA['OPDFRSFOPDPN'] ? this.MASTERDATA['OPDFRSFOPDPN'].Items : []),
        ...(this.MASTERDATA['OPDFRSFOPHPF'] ? this.MASTERDATA['OPDFRSFOPHPF'].Items : []),
        ...(this.MASTERDATA['OPDFRSFOPUTH'] ? this.MASTERDATA['OPDFRSFOPUTH'].Items : [])
      ]
      return list.find(e => e.Value === '1')
    }
  },
  methods: {
  }
}
</script>
