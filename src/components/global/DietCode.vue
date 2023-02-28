<template>
  <v-select :class="readonly ? 'readonly' : null" :readonly="readonly" @input="emit" :placeholder="'Mã chế độ ăn'" :multiple="!single" :options="options" :filterable="false" @search="onSearch" v-model="query">
    <template slot="no-options">
      {{__t('Gõ mã để tìm kiếm...')}}
    </template>
  </v-select>
</template>
<script>
import DietCodeService from '@/services/DietCode'
import _ from 'lodash'
import EventBus from '@/lib/eventBus'
export default {
  name: 'DietCode',
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
      new DietCodeService({search: 'a'}).create({search: 'a', pageSize: 25}).then(res => {
        this.options = res.map(e => {
          return {
            code: e.Code,
            label: e.Code + ', ' + e.ViName,
            ViName: e.ViName
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
        this.$emit('input', nVal.length ? nVal : '')
        if (this.query) {
          this.$emit('DietCodeChange', nVal, this.mdCode)
          EventBus.$emit('DietCodeUPDATED', this.query)
        } else {
          this.$emit('DietCodeChange', nVal, this.mdCode)
        }
      }, 100)
    },
    onSearch (search, loading) {
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      new DietCodeService({search: search, pageSize: 25}).create({search: search, pageSize: 25}).then(res => {
        vm.options = res.map(e => {
          return {
            code: e.Code,
            label: e.Code + ', ' + e.ViName,
            ViName: e.ViName
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
