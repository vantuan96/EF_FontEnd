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
  name: 'MedicationRoute',
  props: ['value', 'option'],
  data () {
    return {
      routes: [{data: [
        'Không xác định',
        'Uống',
        'Tiêm bắp',
        'Tiêm dưới da',
        'Tiêm tĩnh mạch',
        'Truyền tĩnh mạch',
        'Bơm trực tràng',
        'Dán vào trán',
        'Dán vết thương',
        'Đặt âm đạo',
        'Đặt hậu môn',
        'Hít',
        'Khí dung',
        'Ngậm',
        'Ngậm dưới lưỡi',
        'Nhỏ mắt',
        'Nhỏ mũi',
        'Nhỏ tai',
        'Súc họng',
        'Súc miệng',
        'Thoa miệng',
        'Thoa ngoài da',
        'Thoa nướu răng',
        'Thụt',
        'Xịt'
      ]}],
      filteredOptions: [],
      query: '',
      inputProps: {
        // id: 'autosuggest__input',
        class: 'form-control',
        placeholder: this.__t('Nhập'),
        onInputChange: this.onInputChange
      }
    }
  },
  components: {
  },
  created () {
    this.query = this.value
    this.filteredOptions = this.routes
    // if (this.option) this.routes = [{data: ['Không xác định']}]
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
      if (text === '' || text === undefined) {
        this.filteredOptions = this.routes
        return
      }
      const filteredData = this.routes[0].data.filter(item => {
        return this.mapingStr(text, item)
        // item.toLowerCase().indexOf(text.toLowerCase()) > -1
      }).slice(0, this.limit)
      this.filteredOptions = [{
        data: filteredData
      }]
    }
  }
}
</script>
