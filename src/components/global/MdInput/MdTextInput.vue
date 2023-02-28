<template>
  <p v-if="readonly" class="fake-input disable">{{value.Value || 'N/A'}}</p>
  <input v-else :id="value.Code" class="form-control" rows="3" :placeholder="__t('Nhập')" v-model="value.Value"/>
</template>
<script>
export default {
  name: 'MdTextInput',
  props: ['value', 'readonly'],
  watch: {
    // value: function (val) {
    //   this.$emit('input', this.value)
    // }
  }
}
</script>
