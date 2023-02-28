<template>
  <span class="no-wrap checkboxs-value-box" v-if="hasData">
    <template :data="item" v-for="(item, index) in datas">
      <template v-if="checkString(item.DataType, (DataType || 'Checkbox')) && (!indexs || indexs.includes(index))">
        <span v-if="!t2" :key="index"><CheckboxValue v-model="item.Value"/> <template v-if="!hideLabel"><span :class="{'label-b': highlightCode.includes(item.Code)}"><span v-if="showdex">{{(index + 1 + parseInt(pushdex ? pushdex : 0)) + '. '}}</span>{{__label(item)}}</span></template></span>
        <span v-else :key="index"><CheckboxValue v-model="item.Value"/> <template v-if="!hideLabel"><span :class="{'label-b': highlightCode.includes(item.Code)}"><span v-if="showdex">{{(index + 1 + parseInt(pushdex ? pushdex : 0)) + '. '}}</span>{{__t2(item.ViName)}}</span></template></span>
      </template>
    </template>
  </span>
</template>
<script>
export default {
  name: 'CheckboxsValue',
  props: ['data', 'DataType', 'hideLabel', 'showall', 'showdex', 'pushdex', 'indexs', 't2'],
  mixins: [],
  data () {
    return {
      highlightCode: ['IPDIAAUREASDIS', 'IPDIAAUCOLOCYA', 'IPDIAAUMESTDRO', 'IPDIAAUMESTUNC', 'IPDIAAUPSASUNC', 'IPDIAAUWLOGYES', 'IPDIAAUDIETSPE', 'IPDIAAUSWALIMFL', 'IPDIAAUSWALIMSO', 'IPDIAAUFEROTUF', 'IPDIAAUBOHAINC', 'IPDIAAUBOHACON', 'IPDIAAUURASURC', 'IPDIAAUURASINC', 'IPDIAFEHASNYSN', 'IPDIAFEHAFCYSN', 'IPDIAFEDICFYSN', 'IPDIAFEAFPTYSN', 'IPDIAFEAAICYSN', 'IPDIACPEATTNOO', 'IPDIACPCONDNES', 'IPDIACPCONDCOD', 'IPDIACPSKCOABN', 'IPDIACPHEENABN', 'IPDIACPTWDIYES', 'IPDIACPHBTCYES', 'IPDIACPANORYES', 'IPDIACPCTPTYES', 'IPDIACPDIARYES', 'IPDIACPDMOMYES', 'IPDIACPNAUSYES', 'IPDIACPVOMIYES', 'IPDIACPALHLYES', 'IPDIACPNRTXYES', 'IPDIACPNTPNYES']
    }
  },
  computed: {
    hasData: function () {
      return this.data.find(e => ((e.Value || this.showall) && this.checkString(e.DataType, (this.DataType || 'Checkbox'))))
    },
    datas: function () {
      return this.data.filter(e => ((e.Value || this.showall) && this.checkString(e.DataType, (this.DataType || 'Checkbox')))) || []
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
