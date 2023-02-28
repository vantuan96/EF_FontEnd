<template>
  <vue-autosuggest
    v-model="query"
    :suggestions="filteredOptions"
    @closed="close"
    @selected="selectHandler"
    @input="onInputChange"
    :input-props="inputProps">
  </vue-autosuggest>
</template>
<script>
export default {
  name: 'VInputAutosuggest',
  props: ['value', 'options', 'placeholder'],
  data () {
    return {
      filteredOptions: [],
      query: '',
      inputProps: {
        // id: 'autosuggest__input',
        class: 'form-control',
        placeholder: this.placeholder || this.__t('Nhập'),
        onInputChange: this.onInputChange
      },
      default: []
    }
  },
  components: {
  },
  created () {
    navigator.clipboard.readText()
      .then(text => {
        if (text && text.length < 20) this.default = [text]
      }).catch(err => {
        console.error('Failed to read clipboard contents: ', err)
      })
    this.query = this.value
    this.filteredOptions = [{data: this.default.concat(this.options)}]
  },
  computed: {
  },
  watch: {
    query: function (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    selectHandler (item, e) {
      this.query = item.item
    },
    close () {
      this.$emit('input', this.query)
    },
    onInputChange (text) {
    }
  }
}
</script>
