<template>
  <MDRadioView v-if="readonly" :data="value.Items" />
  <div v-else class="group-radio">
    <template v-for="(item, index) in value.Items">
      <span :data="item" :key="index" v-if="index !== noneDex" :class="fullWidth ? 'mrr10' : null">
        <input type="checkbox" :id="'radio-' + item.Code" v-model="item.Value">
        <label  :for="'radio-' + item.Code">{{__label(item)}}</label>
      </span>
      <!-- <div v-if="index === (BreakOn || 3) || BreakAll" :key="index + 'flexIPDIAAUREASradio'" class="flex-break-sm"></div> -->
    </template>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'MdRadiosInput',
  props: ['value', 'readonly', 'noneDex', 'fullWidth'],
  watch: {
    // value: function (val) {
    //   this.$emit('input', this.value)
    // }
  }
}
</script>
