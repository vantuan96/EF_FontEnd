<template>
  <span class="no-wrap">
    <template v-if="hasData">
      <b class="el-radio-view" :class="{'label-b': highlightCode.includes(item.Code)}" :data="item" v-for="(item, index) in data"  :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value && index !== noneDex && (!indexs || indexs.includes(index))">
        <span v-if="!t2">{{__label(item)}}</span>
        <span v-else>{{__t2(item.ViName)}}</span>
      </b>
    </template>
    <b class="el-radio-view disable" v-else>
      N/A
    </b>
  </span>
</template>
<script>
export default {
  name: 'MDRadioView',
  props: ['data', 'DataType', 'noneDex', 'indexs', 't2'],
  mixins: [],
  data () {
    return {
      highlightCode: ['IPDIAAUREASDIS', 'IPDIAAUCOLOCYA', 'IPDIAAUMESTDRO', 'IPDIAAUMESTUNC', 'IPDIAAUPSASUNC', 'IPDIAAUWLOGYES', 'IPDIAAUDIETSPE', 'IPDIAAUSWALIMFL', 'IPDIAAUSWALIMSO', 'IPDIAAUFEROTUF', 'IPDIAAUBOHAINC', 'IPDIAAUBOHACON', 'IPDIAAUURASURC', 'IPDIAAUURASINC', 'IPDIAFEHASNYSN', 'IPDIAFEHAFCYSN', 'IPDIAFEDICFYSN', 'IPDIAFEAFPTYSN', 'IPDIAFEAAICYSN', 'IPDIACPEATTNOO', 'IPDIACPCONDNES', 'IPDIACPCONDCOD', 'IPDIACPSKCOABN', 'IPDIACPHEENABN', 'IPDIACPTWDIYES', 'IPDIACPHBTCYES', 'IPDIACPANORYES', 'IPDIACPCTPTYES', 'IPDIACPDIARYES', 'IPDIACPDMOMYES', 'IPDIACPNAUSYES', 'IPDIACPVOMIYES', 'IPDIACPALHLYES', 'IPDIACPNRTXYES', 'IPDIACPNTPNYES']
    }
  },
  computed: {
    hasData: function () {
      return this.data.find(e => (e.Value && this.checkString(e.DataType, (this.DataType || 'Radio'))))
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
