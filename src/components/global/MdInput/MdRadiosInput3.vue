<template>
  <MDRadioView v-if="readonly" :data="value.Items" />
  <div v-else class="group-radio" :class="fullWidth ? 'full-width' : null" :id="value.Code">
    <template v-for="(item, index) in value.Items">
      <span class="v-checkbox flex align-center mrr10" :data="item" :key="index" v-if="index !== noneDex" :class="fullWidth ? 'mrr10' : null">
        <span>{{__label(item)}}</span>
        <input @change="handleChange" type="checkbox" :id="'radio-' + item.Code" v-model="item.Value">
        <label v-if="item.DataType === 'Radio'" :for="'radio-' + item.Code" @click="checkbox2Radio(value.Items, value.Items[index])"></label>
        <label v-if="item.DataType === 'Checkbox'" :for="'radio-' + item.Code"></label>
      </span>
      <!-- <div v-if="index === (BreakOn || 3) || BreakAll" :key="index + 'flexIPDIAAUREASradio'" class="flex-break-sm"></div> -->
    </template>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'MdRadiosInput3',
  props: ['value', 'readonly', 'noneDex', 'fullWidth'],
  watch: {
    // value: function (val) {
    //   this.$emit('input', this.value)
    // }
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}
</script>
