<template>
  <span class="v-tags" v-if="icdNotNull && icdNotNull.length"><span class="v-tag" v-for="(item,index) in icdNotNull" :data="item" :key="index">{{getLabel(item)}}</span></span>
  <span class="v-tags" v-else><span class="v-tag" >N/A</span></span>
</template>
<script>
import ICD10Service from '@/services/ICD10'
import _ from 'lodash'
export default {
  name: 'Icd10View',
  props: ['value'],
  data () {
    return {
      query: '',
      options: []
    }
  },
  components: {
  },
  mounted () {
    // new ICD10Service({search: 'a'}).create({search: 'a', pageSize: 25}).then(res => {
    //   this.options = res.map(e => {
    //     return {
    //       code: e.Code,
    //       label: e.Code + ', ' + e.ViName
    //     }
    //   })
    //   // if (this.value) {
    //   //   this.options.concat(this.value)
    //   // }
    // })
  },
  computed: {
    icdNotNull: function () {
      return this.value ? this.value.filter(e => e.code) : null
    }
  },
  watch: {
    value: function (val) {
      this.query = this.value
      // this.options.concat(this.value)
    }
  },
  methods: {
    getLabel (item) {
      if (this.$i18n.locale === 'en') {
        return item.code + ', ' + (item.EnName || item.ViName)
      } else {
        return item.code + ', ' + (item.ViName)
      }
    },
    emit () {
      setTimeout(() => {
        this.$emit('input', this.query)
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
