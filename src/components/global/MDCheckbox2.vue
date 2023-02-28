<template>
  <div class="group-radio full-width" :class="{'no-flex': noFlex}">
    <template v-for="(item, index) in value.Items">
      <span :data="item" :key="index" @click="onChange()" v-if="item.DataType === 'Checkbox' && (!indexs || indexs.includes(index))">
        <input type="checkbox" :id="'radio-' + item.Code" v-model="item.Value">
        <label :class="{'label-b': highlightCode.includes(item.Code)}" :for="'radio-' + item.Code">{{__label(item)}}</label>
      </span>
    </template>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'MDCheckbox2',
  props: ['value', 'BreakOn', 'noFlex', 'BreakAll', 'indexs'],
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
      ]
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    onChange () {
      this.$emit('onChange', this.value)
      this.$emit('pushIndex', this.indexs[0], this.value)
    }
  }
}
</script>
