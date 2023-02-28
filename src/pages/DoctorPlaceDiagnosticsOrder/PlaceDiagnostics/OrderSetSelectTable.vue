<template>
  <div class="mb-10">
    <Vcollapse @getData="open('VcollapsePK')" ref="VcollapsePK">
      <template slot='title'>
        <div class="d-flex">
          <span>{{__t('Gói chỉ định')}}</span>
        </div>
      </template>
      <template slot='content'>
        <div>
          <div class="mb-10">
            <div class="d-flex flex-center flex-between mb-10">
              <div class="d-flex flex-center">
                <span class="no-wrap mr-10">{{__t('Gói chỉ định')}}</span>
                <v-select :placeholder="'Chọn'" @onChange="onSearch" v-model="filterType" :searchable="false" :items="filterTypes"/>
                <input type="text" v-model.trim="query" class="form-control" :placeholder="__t('Gõ để tìm kiếm ...')"/>
              </div>
              <button class="btn btn-sm mr-10" @click="$router.push({path: '/DoctorPlaceDiagnostics/OrderSets/'})">{{__t('Tạo gói cá nhân')}}</button>
            </div>
          </div>
          <div class="service-list d-flex">
            <div class="service-item d-flex" style="width: 20%" :key="index" :data="service"  v-for="(service, index) in Services">
              <div class="v-checkbox v-checkbox-2">
                <input type="checkbox" :id="'service-item-' + service.Id + type" :value="service" v-model="ServicesSelected[service.Id]">
                <label :for="'service-item-' + service.Id + type" @click="selectPackage(service)"></label>
              </div>
              <span>
                {{service.Code}} - {{service.Name}}
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
    </Vcollapse>
    <modal name="OrderSetFormReviewForm" transition="pop-out" id="OrderSetFormReviewForm" height="auto" :clickToClose="false" :width="modalWidth">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{packageSelected.Code}} - {{packageSelected.Name}}</h3>
        </div>
        <div class="box-body padding-15">
          <div class="row">
            <div class="col-md-12">
              <div v-if="selectedServices && selectedServices.length" class="lis-service">
                <div :key="ind" :data="service" v-for="(service, ind) in selectedServices">
                  <div class="d-flex ServiceOrderList-item">
                    <span class="flex-grow-1">
                      {{ind + 1}}, {{service.Code}} - {{__label(service)}}
                    </span>
                  </div>
                </div>
              </div>
              <div v-else class="text-center">
                {{__t('Chưa có dịch vụ')}}
              </div>
            </div>
          </div>
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-sm-6 col-md-6"><button type="button"  class="btn btn-block" @click="cancel()">{{__t('Hủy')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button"  class="btn btn-block v-yellow-btn" @click="submit()">{{__t('Chọn gói')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import _ from 'lodash'
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import DoctorPlaceDiagnosticsOrder from '@/services/DoctorPlaceDiagnosticsOrder'
import Services from '@/services/Services'
import { mapGetters } from 'vuex'
import constants from '@/constants'
import VSelect from '@/components/VSelect.vue'
const MODAL_WIDTH = 970
export default {
  mixins: [MixinPlaceDiagnostics, MixinMasterData],
  name: 'OrderSetSelectTable',
  props: ['type', 'value', 'lastItemChargeByPID', 'PatientLocationId'],
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      filterTypes: constants.ORDERSET_FILTER_TYPE,
      filterType: null,
      ServicesSelected: {
      },
      query: '',
      packageSelected: {},
      Services: [],
      parameters: {
        pageNumber: 1,
        pages: 1,
        PageSize: process.env.PAGE_SIZE,
        count: 0,
        Type: 3
      },
      item: null,
      selectedServices: []
    }
  },
  computed: {
    ...mapGetters({
      servicesData: 'PlaceDiagnostics/getServices',
      Packages: 'PlaceDiagnostics/getPackages'
    })
  },
  components: {
    VSelect
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
  },
  watch: {
    query: {
      handler (a, b) {
        this.onSearch()
      },
      deep: true
    },
    Packages: {
      handler (val, b) {
        this.setValue()
      },
      deep: true
    }
  },
  methods: {
    setValue () {
      setTimeout(() => {
        this.ServicesSelected = {}
        this.Packages.forEach(item => {
          this.$set(this.ServicesSelected, item.Id, true)
        })
      }, 100)
    },
    cancel () {
      this.$modal.hide('OrderSetFormReviewForm')
      this.ServicesSelected[this.packageSelected.Id] = false
      this.packageSelected = {}
    },
    close () {
      this.$modal.hide('OrderSetFormReviewForm')
      this.packageSelected = {}
    },
    open (type) {
      if (this.$refs[type]) {
        if (Array.isArray(this.$refs[type])) {
          this.$refs[type][0].setHasData()
        } else {
          this.$refs[type].setHasData()
        }
      }
      this.onSearch()
    },
    selectPackage (val) {
      setTimeout(() => {
        if (this.ServicesSelected[val.Id]) {
          this.packageSelected = val
          this.addToList(val)
        } else {
          this.removeList(val)
        }
      }, 100)
    },
    addToList (val) {
      new Services().GetDetailService({Ids: val.ServiceIds}).then(({items}) => {
        this.selectedServices = items.map(e => {
          if (e.RadiologyProcedurePlanRef && e.RadiologyProcedurePlanRef.length === 1) {
            e.RadiologyProcedureId = e.RadiologyProcedurePlanRef[0].Id
          }
          e.PackageId = val.Id
          return e
        })
        this.$modal.show('OrderSetFormReviewForm')
      })
    },
    removePackagee (val) {
      var arr = [].concat(this.servicesData[0]).concat(this.servicesData[1]).concat(this.servicesData[2])
      arr.forEach(item => {
        if (item.PackageId === val.Id) this.remove({Id: item.Id, type: item.ServiceType})
      })
      this.removePackage(val.Id)
    },
    removeList (val) {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Bạn có chắc chắn hủy chọn gói dịch vụ này?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.removePackagee(val)
              this.$modal.hide('dialog')
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
              this.ServicesSelected[val.Id] = true
            }
          }
        ]
      })
    },
    submit () {
      var arr = [].concat(this.servicesData[0]).concat(this.servicesData[1]).concat(this.servicesData[2])
      this.selectedServices.forEach(item => {
        if (!arr.find(e => e.Id === item.Id)) this.add({items: [{...item, type: item.ServiceType}], type: item.ServiceType})
      })
      this.addPackage([this.packageSelected])
      this.close()
    },
    onSearch () {
      this.search(this.query, this)
    },
    search: _.debounce((search, vm) => {
      new DoctorPlaceDiagnosticsOrder({search: search, ...vm.parameters, filterType: vm.filterType}).find('/OrderSets/List/').then(res => {
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
      })
    }, 350)
  }
}
</script>
