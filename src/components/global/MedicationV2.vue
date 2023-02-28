<template>

  <!-- <vue-autosuggest
    v-model="query"
    :suggestions="suggestions"
    @closed="close"
    @input="fetchResults"
    @selected="selectHandler"
    :input-props="{id:'autosuggest__input', class: 'form-control', placeholder:__t('Nhập tên thuốc')}">
  </vue-autosuggest> -->
  <div v-if="readonly">
    <template v-if="query">
      <div v-for="(item, index) in query" :key="index">
        {{item}}
        <hr v-if="index < query.length - 1"/>
      </div>
    </template>
  </div>
  <v-select v-else @input="selectHandler" :multiple="true" taggable :options="suggestions" :filterable="false" @search="fetchResults" v-model="query">
    <template slot="no-options">
      {{__t('Nhập tên thuốc')}}
    </template>
  </v-select>
</template>
<script>
import MedicationMasterdata from '@/services/MedicationMasterdata'
export default {
  name: 'MedicationV2',
  props: ['value', 'readonly'],
  data () {
    return {
      suggestions: ['Không xác định'],
      query: '',
      default: ['Không xác định']
    }
  },
  components: {
    // VAuto
  },
  created () {
    this.query = this.value ? (this.isJson(this.value) ? this.JSONParse(this.value, true) : [this.value]) : []
  },
  computed: {
  },
  watch: {
  },
  methods: {
    selectHandler (item, e) {
      this.$emit('input', JSON.stringify(item))
    },
    fetchResults (text) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        new MedicationMasterdata({
          noLoading: true,
          pageNumber: 1,
          pages: 1,
          PageSize: process.env.PAGE_SIZE,
          search: text,
          notRedirectAndLoginPopup: true
        }).all().then(response => {
          var data = response.map(e => {
            return e.Name
          })
          this.suggestions = data
        })
      }, 350)
    }
  }
}
</script>
