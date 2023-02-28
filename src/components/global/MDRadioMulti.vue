<template>
  <MDRadioView v-if="readonly" :data="value.Items" />
  <div v-else class="group-radio" :class="{'no-flex': noFlex}" style="margin-right: 10px;">
    <template v-for="(item, index) in value.Items">
      <span :data="item" :key="index" @click="onChange()" v-if="item.DataType === 'Radio' && (!indexs || indexs.includes(index))" style="margin-left: 5px; width: 100px; border-radius: 3px !important;">
        <input type="checkbox" :id="'radio-' + item.Code" v-model="item.Value" style="border-radius: 3px !important;">
        <label v-if="!t2" style="width: 100%; width: 100px; height: 30px; line-height: 15px; margin-left: 3px; border-radius: 3px !important;" :for="'radio-' + item.Code">{{__label(item)}}</label>
        <label v-else style="width: 100%; width: 100px; height: 30px; line-height: 15px; margin-left: 3px; border-radius: 3px !important;" :for="'radio-' + item.Code">{{__t2(item.ViName)}}</label>
      </span>
      <!-- <div v-if="index === (BreakOn || 3) || BreakAll" :key="index + 'flexIPDIAAUREASradio'" class="flex-break-sm"></div> -->
    </template>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'MDRadioMulti',
  props: ['value', 'BreakOn', 'noFlex', 'BreakAll', 'indexs', 'readonly', 'fullWidth', 't2'],
  watch: {
    value: function (val) {
      this.$emit('input', this.value)
    }
  },
  data () {
    return {
      highlightCode: [
        'IPDIAAUREASDIS',
        'IPDIAAUCOLOCYA',
        'IPDIAAUMESTDRO',
        'IPDIAAUMESTUNC',
        'IPDIACPEATTNOO',
        'IPDIACPCONDNES',
        'IPDIACPCONDCOD',
        'IPDIACPSKCOABN',
        'IPDIACPHEENABN',
        'IPDIACPTWDIYES',
        'IPDIACPANORYES',
        'IPDIACPCTPTYES',
        'IPDIACPDIARYES',
        'IPDIACPDMOMYES',
        'IPDIACPNAUSYES',
        'IPDIACPVOMIYES',
        'IPDIACPALHLYES',
        'IPDIACPNRTXYES',
        'IPDIACPNTPNYES',
        'IPDIACPHBTCYES',
        'IPDIAFEHASNYSN',
        'IPDIAFEHAFCYSN',
        'IPDIAFEDICFYSN',
        'IPDIAFEAFPTYSN',
        'IPDIAFEAAICYSN'
        // 'EIOPS32',
        // 'EIOPS33',
        // 'EIOPS34',
        // 'EIOPS35',
        // 'EIOPS37',
        // 'EIOPS38',
        // 'EIOPS39',
        // 'EIOPS40',
        // 'EIOPS50',
        // 'EIOPS51',
        // 'EIOPS52'
      ]
    }
  },
  computed: {
  },
  methods: {
    onChange () {
      this.$emit('onChange', this.value)
    }
  }
}
</script>
