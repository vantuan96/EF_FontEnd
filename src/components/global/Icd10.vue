<template>
  <v-select :class="readonly ? 'readonly' : null" :readonly="readonly" @input="emit" :placeholder="'ICD10'" :multiple="!single" :options="options" :filterable="false" @search="onSearch" v-model="query">
    <template slot="no-options">
      {{__t('Gõ để tìm ICD10...')}}
    </template>
  </v-select>
</template>
<script>
import ICD10Service from '@/services/ICD10'
import _ from 'lodash'
import EventBus from '@/lib/eventBus'
export default {
  name: 'Icd10',
  props: ['value', 'readonly', 'single', 'mdCode'],
  data () {
    return {
      query: '',
      options: []
    }
  },
  components: {
  },
  mounted () {
    if (this.value) {
      this.options = this.value.filter(e => e)
      if (this.single) {
        this.query = this.value[0]
      } else {
        this.query = this.value
      }
    } else {
      new ICD10Service({search: 'a'}).create({search: 'a', pageSize: 25}).then(res => {
        this.options = res.map(e => {
          return {
            code: e.Code,
            label: e.Code + ', ' + e.ViName,
            ViName: e.ViName,
            EnName: e.EnName,
            EnLabel: e.Code + ', ' + e.EnName
          }
        })
      })
    }
  },
  computed: {
  },
  watch: {
    value: function (val) {
      this.query = this.value ? this.value.filter(e => e) : []
      // this.options.concat(this.value)
    }
  },
  methods: {
    emit () {
      setTimeout(() => {
        var nVal = (this.single ? [this.query] : this.query).filter(e => e)
        var cloneIcd = this.cloneObj(nVal)
        if (this.$i18n.locale === 'en') {
          cloneIcd = cloneIcd.map(e => {
            e.ViName = e.EnName
            return e
          })
        }
        this.$emit('input', nVal.length ? nVal : '')
        if (this.query) {
          this.$emit('icdChange', cloneIcd, this.mdCode)
          EventBus.$emit('ICDUPDATED', this.query)
        } else {
          this.$emit('icdChange', cloneIcd, this.mdCode)
        }
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
            label: e.Code + ', ' + e.ViName,
            ViName: e.ViName,
            EnName: e.EnName,
            EnLabel: e.Code + ', ' + e.EnName
          }
        })
      })
    }, 350)
  }
}
</script>
<style scoped lang="stylus">
.readonly {
  background: #EEEEEE;
}
</style>
