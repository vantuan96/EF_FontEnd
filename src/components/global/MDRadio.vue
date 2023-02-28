<template>
  <MDRadioView v-if="readonly" :data="value.Items" />
  <div v-else-if="splitData" class="group-radio" :class="{'no-flex': noFlex}" style="margin-right: 10px;">
    <template v-for="(item, index) in value.Items" v-if="item.Code !== 'IPDIAAUHYGIOTH' && item.Code !== 'IPDIAAUHYGIOTHANS'">
      <span :data="item" :key="index" @click="onChange()" v-if="item.DataType === 'Radio' && (!indexs || indexs.includes(index))" style="margin-left: 5px">
        <input type="checkbox" :id="'radio-' + item.Code" v-model="item.Value">
        <label v-if="!t2" style="width: 100%; margin-left: 3px" :class="{'label-b': highlightCode.includes(item.Code)}" :for="'radio-' + item.Code" @click="checkbox2Radio(value.Items, item)">{{__label(item)}}</label>
        <label v-else style="width: 100%; margin-left: 3px" :class="{'label-b': highlightCode.includes(item.Code)}" :for="'radio-' + item.Code" @click="checkbox2Radio(value.Items, item)">{{__t2(item.ViName)}}</label>
      </span>
      <!-- <div v-if="index === (BreakOn || 3) || BreakAll" :key="index + 'flexIPDIAAUREASradio'" class="flex-break-sm"></div> -->
    </template>
    <slot></slot>
  </div>
  <div v-else-if="fullWidth" class="group-radio full-width" :class="{'no-flex': noFlex}" style="margin-right: 10px;">
    <template v-for="(item, index) in value.Items">
      <span :data="item" :key="index" @click="onChange()" v-if="item.DataType === 'Radio' && (!indexs || indexs.includes(index))">
        <input type="checkbox" :id="'radio-' + item.Code" v-model="item.Value">
        <label v-if="!t2"  style="width: 100%" :class="{'label-b': highlightCode.includes(item.Code)}" :for="'radio-' + item.Code" @click="checkbox2Radio(value.Items, item)">{{__label(item)}}</label>
        <label v-else style="width: 100%" :class="{'label-b': highlightCode.includes(item.Code)}" :for="'radio-' + item.Code" @click="checkbox2Radio(value.Items, item)">{{__t2(item.ViName)}}</label>
      </span>
      <!-- <div v-if="index === (BreakOn || 3) || BreakAll" :key="index + 'flexIPDIAAUREASradio'" class="flex-break-sm"></div> -->
    </template>
    <slot></slot>
  </div>
  <div v-else class="group-radio" :class="{'no-flex': noFlex}" style="margin-right: 10px;">
    <template v-for="(item, index) in value.Items">
      <span :data="item" :key="index" @click="onChange()" v-if="item.DataType === 'Radio' && (!indexs || indexs.includes(index))" style="margin-left: 5px">
        <input type="checkbox" :id="'radio-' + item.Code" v-model="item.Value">
        <label v-if="!t2" style="width: 100%; margin-left: 3px" :class="{'label-b': highlightCode.includes(item.Code)}" :for="'radio-' + item.Code" @click="checkbox2Radio(value.Items, item)">{{__label(item)}}</label>
        <label v-else style="width: 100%; margin-left: 3px" :class="{'label-b': highlightCode.includes(item.Code)}" :for="'radio-' + item.Code" @click="checkbox2Radio(value.Items, item)">{{__t2(item.ViName)}}</label>
      </span>
      <!-- <div v-if="index === (BreakOn || 3) || BreakAll" :key="index + 'flexIPDIAAUREASradio'" class="flex-break-sm"></div> -->
    </template>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'MDRadio',
  props: ['value', 'BreakOn', 'noFlex', 'BreakAll', 'indexs', 'readonly', 'fullWidth', 't2', 'splitData'],
  watch: {
    value: function (val) {
      this.$emit('input', this.value)
    }
  },
  data () {
    return {
      codeDelete: [
        'IPDIAAUHYGIOTH',
        'IPDIAAUHYGIOTHANS'
      ],
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
