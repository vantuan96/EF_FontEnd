<template>
  <vue-autosuggest
    v-model="query"
    :suggestions="suggestions"
    @closed="close"
    @input="fetchResults"
    @selected="selectHandler"
    :input-props="{id:'autosuggest__input', class: 'form-control', placeholder:__t('Nhập')}">
  </vue-autosuggest>
</template>
<script>
import MedicationMasterdata from '@/services/MedicationMasterdata'
export default {
  name: 'Medication',
  props: ['value'],
  data () {
    return {
      suggestions: [{data: [this.__t('Không xác định')]}],
      query: '',
      default: [this.__t('Không xác định')]
    }
  },
  components: {
    // VAuto
  },
  created () {
    this.query = this.value
    // if (this.value) this.default.push(this.value)
  },
  computed: {
  },
  watch: {
    value: function (val) {
      this.query = val
    }
  },
  methods: {
    close () {
      setTimeout(() => {
        this.$emit('input', this.query)
      }, 100)
    },
    selectHandler (item, e) {
      // this.$emit('input', item.item)
      this.query = item.item
    },
    fetchResults () {
      clearTimeout(this.timeout)
      this.$emit('input', this.query)
      this.timeout = setTimeout(() => {
        new MedicationMasterdata({
          noLoading: true,
          pageNumber: 1,
          pages: 1,
          PageSize: process.env.PAGE_SIZE,
          search: this.query,
          notRedirectAndLoginPopup: true
        }).all().then(response => {
          var data = response.map(e => {
            return e.Name
          })
          this.suggestions = [{data: this.default.concat(data)}]
        })
      }, 350)
    }
  }
}
</script>
