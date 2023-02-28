<template>
  <div class="gender-select flex-box" style="flex-grow: 1">
    <template  v-for="(item, index) in value.Items" v-if="item.DataType === 'Radio'">
      <input :data="item" :key="index"  type="checkbox" :id="'radio-' + index + '-' + id" v-model="item.Value">
      <label @click="checkbox2Radio(value.Items, item)" :data="item" :key="index + 'label'" :for="'radio-' + index + '-' + id">{{__label(item)}}</label>
    </template>
  </div>
</template>
<script>
export default {
  name: 'MDRadioStyle2',
  props: ['value'],
  watch: {
    value: function (val) {
      this.$emit('input', this.value)
    }
  },
  data () {
    return {
      id: this.makeid(),
      highlightCode: [
        'IPDIAAUREASDIS',
        'IPDIAAUCOLOCYA'
      ]
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
  }
}
</script>
