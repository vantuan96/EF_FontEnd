<template>
  <div>
    <v-select @input="emit" :placeholder="'ICD10'" multiple :options="options" :filterable="false" @search="onSearch" v-model="currentValue">
      <template slot="no-options">
        {{__t('Gõ để tìm ICD10...')}}
      </template>
    </v-select>
    {{currentValue}}
  </div>
</template>
<script>
import ICD10Service from '@/services/ICD10'
import _ from 'lodash'
import EventBus from '@/lib/eventBus'
export default {
  name: 'Icd10Select',
  props: ['value'],
  data () {
    return {
      query: '',
      options: [],
      currentValue: []
    }
  },
  components: {
  },
  mounted () {
    this.getValueFromApi()
  },
  computed: {
  },
  watch: {
    value: function (val) {
      // this.query = this.value
      // this.options.concat(this.value)
    }
  },
  methods: {
    getCurrentValueFromApi () {
      if (this.value) {
        this.value.split(',').forEach(e => {
          this.getData(e)
        })
      }
    },
    getData (query) {
      return new ICD10Service({search: query, pageSize: 25}).create({search: query, pageSize: 25}).then(res => {
        var finded = res.map(e => {
          return {
            code: e.Code,
            label: e.Code + ', ' + e.ViName
          }
        }).find(r => r.code === query)
        if (finded) this.currentValue.push(finded)
      })
    },
    emit () {
      setTimeout(() => {
        this.$emit('input', this.query)
        EventBus.$emit('ICDUPDATED', this.query)
      }, 100)
    },
    onSearch (search, loading) {
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      new ICD10Service({search: search, pageSize: 25}).create({search: search, pageSize: 25}).then(res => {
        vm.options = res.map(e => {
          return {
            code: e.Code,
            label: e.Code + ', ' + e.ViName
          }
        })
      })
    }, 350)
  }
}
</script>
