<template>
  <div>
    <div class="mb-10">
      <div class="d-flex flex-center mb-10">
        <div>
          <input type="text" v-model.trim="query" class="form-control" :placeholder="__t('Gõ để tìm kiếm dịch vụ...')"/>
        </div>
        <b class="pl-10 pr-10">{{__t('Nhóm dịch vụ')}}:</b>
        <div>
          <v-select
            @input="servicesGroupsOptionSelected"
            :options="ServicesGroupsOption"
            :placeholder="__t('Gõ để tìm ...')"
            v-model="ServiceGroup"
            style="background-color: #fff; min-width: 200px;">
            <template slot="no-options">
              {{__t('Gõ để tìm ...')}}
            </template>
          </v-select>
        </div>
      </div>
    </div>
    <p v-if="type === 0"> {{__t('Vi sinh')}}: <i class="fa fa-flag"></i> {{__t('Giải phẫu bệnh')}}: <i class="fa fa-flag-o"></i></p>
    <div class="service-list d-flex">
      <div class="service-item d-flex" style="width: 20%" :key="index" :data="service"  v-for="(service, index) in Services">
        <div class="v-checkbox v-checkbox-2">
          <input type="checkbox" :id="'service-item-' + service.Id + type" :value="service" v-model="ServicesSelected[service.Id]">
          <label :for="'service-item-' + service.Id + type" @click="emit(service)"></label>
        </div>
        <span>
          {{__label(service)}} - {{service.Code}}
          <i v-if="service.ItemType === 0" aria-hidden="true" class="fa fa-flag"></i>
          <i v-if="service.ItemType === 1" aria-hidden="true" class="fa fa-flag-o"></i>
          <HasChargeOnDay :item="service" :items="lastItemChargeByPID" />
        </span>
      </div>
    </div>
    <div class="p-10 text-right">
      <paginate
        :clickHandler="onSearch"
        :container-class="'pagination pagination-sm no-margin v-pagination'"
        :next-text="'»'"
        :page-count="parameters.pages"
        :prev-text="'«'"
        v-if="parameters.count > parameters.PageSize"
        v-model="parameters.pageNumber">
      </paginate>
    </div>
  </div>
</template>
<script>
import Services from '@/services/Services'
import MixinMasterData from '@/mixins/masterdata.js'
import _ from 'lodash'
import HasChargeOnDay from './HasChargeOnDay'
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import { mapGetters } from 'vuex'
import DoctorPlaceDiagnosticsOrder from '@/services/DoctorPlaceDiagnosticsOrder'
export default {
  mixins: [MixinPlaceDiagnostics, MixinMasterData],
  name: 'ServiceSelectTable',
  props: ['type', 'value', 'lastItemChargeByPID', 'PatientLocationId'],
  data () {
    return {
      ServiceGroup: null,
      GroupId: null,
      ServicesGroupsOption: [],
      query: '',
      Services: [],
      ServicesSelected: {
      },
      parameters: {
        pageNumber: 1,
        pages: 1,
        PageSize: process.env.PAGE_SIZE,
        count: 0
      }
    }
  },
  components: {
    HasChargeOnDay
  },
  created () {
    this.getLastChargeByDoctor()
    this.getServicesGroups()
  },
  computed: {
    ...mapGetters({
      servicesData: 'PlaceDiagnostics/getServices'
    })
  },
  watch: {
    query: {
      handler (a, b) {
        this.onSearch()
      },
      deep: true
    },
    servicesData: {
      handler (val, b) {
        this.setValue()
      },
      deep: true
    }
  },
  methods: {
    getLastChargeByDoctor () {
      var type = this.type
      if (type === 0) type = '0'
      new Services({ PageSize: process.env.PAGE_SIZE, Type: type, hidemsg: true, notRedirect: true }).find('lastItemChargeByDoctor').then(res => {
        this.parameters.count = 0
        this.Services = res.items.map(e => {
          return {
            ...e,
            code: e.Id,
            label: e.Code + ' - ' + e.ViName
          }
        })
      })
    },
    servicesGroupsOptionSelected (vak) {
      this.parameters = {
        pageNumber: 1,
        pages: 1,
        PageSize: process.env.PAGE_SIZE,
        count: 0
      }
      this.search(this.query, this)
    },
    setValue () {
      setTimeout(() => {
        this.ServicesSelected = []
        this.servicesData.forEach((services, type) => {
          if (type === this.type) {
            services.forEach(service => {
              this.$set(this.ServicesSelected, service.Id, true)
            })
          }
        })
      }, 100)
    },
    emit (service) {
      setTimeout(() => {
        if (this.ServicesSelected[service.Id]) {
          this.find({Id: service.Id, type: this.type, PatientLocationId: this.PatientLocationId})
        } else {
          this.remove({Id: service.Id, type: this.type})
        }
      }, 100)
    },
    onSearchServicesGroups (search, loading) {
      this.searchServicesGroups(loading, search, this)
    },
    getServicesGroups () {
      // this.getRawMasterDatas({Group: this.masterdataType[this.type]}, data => {
      //   this.ServicesGroupsOption = data.map(e => {
      //     e.code = e.Code
      //     e.label = e.ViName
      //     return e
      //   })
      // })
      // console.log(this.type)
      new DoctorPlaceDiagnosticsOrder({
        Type: this.type + '',
        PageSize: 2000
      }).find('ServicesGroup').then(res => {
        this.ServicesGroupsOption = res.items.map(e => {
          e.code = e.Id
          e.label = e.ViName
          e.EnLabel = e.EnName
          return e
        })
      })
    },
    onSearch () {
      this.search(this.query, this)
    },
    search: _.debounce((search, vm) => {
      if (!search && !(vm.ServiceGroup && vm.ServiceGroup.Id)) {
        vm.getLastChargeByDoctor()
      } else {
        var type = vm.type
        var ext = {}
        if (type === 0) type = '0'
        if (vm.ServiceGroup && vm.ServiceGroup.Id) ext = {GroupId: vm.ServiceGroup.Id}
        new Services({search: search, ...vm.parameters, Type: type, ...ext}).all().then(res => {
          var bonussssss = 1
          if ((res.count % vm.parameters.PageSize) === 0) {
            bonussssss = 0
          }
          vm.parameters.count = res.count
          vm.parameters.pages = parseInt(res.count / vm.parameters.PageSize) + bonussssss
          vm.Services = res.items.map(e => {
            return {
              ...e,
              code: e.Id,
              label: e.Code + ' - ' + e.ViName
            }
          })
          vm.setValue()
        })
      }
    }, 350)
  }
}
</script>
