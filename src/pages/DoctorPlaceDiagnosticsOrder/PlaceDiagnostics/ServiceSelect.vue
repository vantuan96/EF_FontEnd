<template>
  <div>
    <v-select
      @input="emit"
      :resetOnOptionsChange="true"
      :closeOnSelect="false"
      :multiple="true"
      v-model="query"
      :filterable="false"
      @selected="onSelected"
      :options="Services"
      @search="onSearch"
      :placeholder="__t('Gõ để tìm dịch vụ ...')"
      :clearable="false"
      style="background-color: #fff; min-width: 200px;">
      <template slot="no-options">
        {{__t('Gõ để tìm dịch vụ ...')}}
      </template>
    </v-select>
  </div>
</template>
<script>
import Services from '@/services/Services'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import EventBus from '@/lib/eventBus'
export default {
  name: 'ServiceSelect',
  mixins: [MixinPlaceDiagnostics],
  props: ['type', 'PatientLocationId'],
  data () {
    return {
      suggestions: [],
      query: '',
      Services: [],
      Selected: []
    }
  },
  components: {
  },
  created () {
    EventBus.$on('removeEventService', this.removeEventService)
  },
  computed: {
    ...mapGetters({
      servicesData: 'PlaceDiagnostics/getServices'
    }),
    allData: function () {
      return [].concat(this.servicesData[0] || []).concat(this.servicesData[1] || []).concat(this.servicesData[2] || [])
    }
  },
  watch: {
  },
  methods: {
    removeEventService (item) {
      this.query = this.query ? this.query.filter(e => e.Id !== item.Id) : ''
    },
    onSelected (v, x, y) {
      console.log(v, x, y)
    },
    clear () {
      this.query = []
    },
    emit () {
      setTimeout(() => {
        if (this.query) {
          var addData = [].concat(this.servicesData[0] || []).concat(this.servicesData[1] || []).concat(this.servicesData[2] || [])
          this.query.forEach(item => {
            if (!addData.find(e => {
              return e.Id === item.Id
            })) {
              this.find({Id: item.Id, type: item.ServiceType, PatientLocationId: this.PatientLocationId})
            }
            this.removeEventService(item)
          })
        }
      }, 100)
    },
    onSearch (search, loading) {
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      new Services({search: search, PageSize: 15}).all().then(res => {
        vm.Services = res.items.map(e => {
          return {
            ...e,
            code: e.Id,
            label: e.Code + ' - ' + e.ViName
          }
        })
      })
    }, 350)
  }
}
</script>
