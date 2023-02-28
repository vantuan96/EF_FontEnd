<template>
  <MDRadioView v-if="readonly" :data="value.Items" :noneDex="noneDex" :indexs="indexs" />
  <div v-else class="group-radio" :class="fullWidth ? 'full-width' : null" :id="value.Code">
    <template v-for="(item, index) in value.Items">
      <span :style="mrr ? `margin-right:${mrr}px` : null" :data="item" :key="index" v-if="index !== noneDex && (!indexs || indexs.includes(index))" :class="fullWidth ? 'mrr10' : null">
        <input @change="handleChange" type="checkbox" :id="'radio-' + item.Code" v-model="item.Value">
        <label v-if="!t2" :style="width ? `width:${width}px` : null" :for="'radio-' + item.Code" @click="checkbox2Radio(value.Items, value.Items[index])">{{__label(item)}}</label>
        <label v-else :style="width ? `width:${width}px` : null" :for="'radio-' + item.Code" @click="checkbox2Radio(value.Items, value.Items[index])">{{__t2(item.ViName)}}</label>
      </span>
      <!-- <div v-if="index === (BreakOn || 3) || BreakAll" :key="index + 'flexIPDIAAUREASradio'" class="flex-break-sm"></div> -->
    </template>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'MdRadiosInput2',
  props: ['value', 'readonly', 'noneDex', 'fullWidth', 'width', 'mrr', 'indexs', 't2'],
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
