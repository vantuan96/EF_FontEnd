<template>
  <p v-if="readonly">{{value}}</p>
  <div v-else>
    <div v-if="defaultLib">
      <recommendation-lib :mdCode="defaultLib" :title="__t('Mở thư viện tham khảo')" @copy="copyOPDOENRFU" />
    </div>
    <textarea-autosize
      class="form-control"
      rows="3"
      :placeholder="placeholder || 'Nhập'"
      v-model="inputVal"
      @onChange="updateInput"
    />
  </div>
</template>
<script>
export default {
  name: 'VTextarea',
  props: ['value', 'defaultLib', 'placeholder', 'readonly'],
  mixins: [],
  watch: {
    value: {
      handler (after) {
        this.inputVal = after
      },
      immediate: true
    }
  },
  data () {
    return {
      inputVal: ''
    }
  },
  created () {
  },
  methods: {
    updateInput () {
      this.$emit('input', this.inputVal)
    },
    copyOPDOENRFU (selectedValue) {
      if (!selectedValue) return
      var input = this.inputVal
      var inputValue = input ? input.split('\n') : []
      selectedValue.forEach(e => {
        if (!inputValue.includes(this.trim_(e, '\n'))) input = (input || '') + '\n' + e
      })
      input = this.trim_(input, '\n')
      this.inputVal = input
    }
  }
}
</script>
