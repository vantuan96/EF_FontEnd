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
  name: 'VAutosuggest',
  props: ['value', 'options', 'placeholder', 'isNeedDefault'],
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
      default: ['Không xác định']
    }
  },
  components: {
  },
  created () {
    this.query = this.value
    // if (!this.options) this.options = []
    if (this.isNeedDefault !== false) {
      this.filteredOptions = [{data: this.default.concat(this.options)}]
    } else {
      this.filteredOptions = [{data: this.options}]
    }
  },
  computed: {
  },
  watch: {
    value: function (val) {
      this.query = val
    },
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
      if ((text === '' || text === undefined) && this.isNeedDefault !== false) {
        this.filteredOptions = [{data: this.default.concat(this.options)}]
        return
      } else {
        this.filteredOptions = [{data: this.options}]
      }

      const filteredData = this.options.filter(item => {
        return this.mapingStr(text, item)
        // item.toLowerCase().indexOf(text.toLowerCase()) > -1
      }).slice(0, this.limit)
      if (this.isNeedDefault !== false) {
        this.filteredOptions = [{
          data: this.default.concat(filteredData)
        }]
      } else {
        this.filteredOptions = [{
          data: filteredData
        }]
      }
    }
  }
}
</script>
