<template>
  <p v-if="readonly" class="fake-input disable">{{value.Value || 'N/A'}}</p>
  <textarea-autosize :id="value.Code" v-else class="form-control" rows="3" :placeholder="__t('Nhập')" v-model="value.Value"/>
</template>
<script>
export default {
  name: 'MdRextarea',
  props: ['value', 'readonly'],
  watch: {
    // value: function (val) {
    //   this.$emit('input', this.value)
    // }
  }
}
</script>
