<template>
  <div>
    <button class="btn-sm btn-warning btn" @click="open()">{{__t('Tạo gói cá nhân mới')}}</button>
    <modal name="OrderSetForm" transition="pop-out" id="OrderSetForm" height="auto" :clickToClose="false" :width="modalWidth">
      <div class="box v-model-content-popup" v-if="item">
        <div class="box-header text-center">
          <h3 class="box-title" v-if="item.Id">{{item.Code}} - {{item.Name}}</h3>
          <h3 class="box-title" v-else>{{__t('Tạo gói cá nhân mới')}}</h3>
        </div>
        <div class="box-body padding-15">
          <div class="row">
            <div class="col-md-7" v-if="!readonly">
              <table class="table v-table-1 no-margin col-1-1 mt-15">
                <tr>
                  <th width="1"><div class="w160">{{__t('Mã gói')}}<span class="required">*</span></div></th>
                  <td>
                    <input type="text" class="form-control" :placeholder="__t('Mã gói')" v-model="item.Code">
                  </td>
                </tr>
                <tr>
                  <th width="1"><div class="w160">{{__t('Tên gói')}}<span class="required">*</span></div></th>
                  <td>
                    <input type="text" class="form-control" :placeholder="__t('Tên gói')" v-model="item.Name">
                  </td>
                </tr>
                <tr>
                  <th width="1"><div class="w160">{{__t('Tìm kiếm dịch vụ')}}</div></th>
                  <td>
                    <v-select
                      :resetOnOptionsChange="true"
                      :closeOnSelect="false"
                      :multiple="true"
                      v-model="ServicesSelected"
                      :filterable="false"
                      :options="Services"
                      @search="onSearch"
                      @input="selectedService"
                      :placeholder="__t('Gõ để tìm dịch vụ ...')"
                      :clearable="false"
                      style="background-color: #fff; min-width: 200px;">
                      <template slot="no-options">
                        {{__t('Gõ để tìm dịch vụ ...')}}
                      </template>
                    </v-select>
                  </td>
                </tr>
                <tr>
                  <th width="1"><div class="w160">{{__t('Chia sẻ cho')}}</div></th>
                  <td>
                    <UsersAdv2 v-model="item.Users"/>
                  </td>
                </tr>
              </table>
            </div>
            <div :class="{'col-md-5': !readonly, 'col-md-12': readonly}">
              <h5 class="text-center"><b>{{__t('Danh sách dịch vụ')}}</b></h5>
              <div v-if="item.Services && item.Services.length" class="lis-service">
                <div :key="ind" :data="service" v-for="(service, ind) in item.Services">
                  <div class="d-flex ServiceOrderList-item">
                    <span class="flex-grow-1">
                      {{ind + 1}}, {{service.Code}} - {{__label(service)}}
                    </span>
                    <i  v-if="!readonly" @click="removeService(service, ind)" class="fa fa-times cursor-pointer" aria-hidden="true"></i>
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
          <div class="row" v-if="!readonly">
            <div class="col-sm-6 col-md-6"><button type="button"  class="btn btn-block" @click="close()">{{__t('Hủy')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button" :class="{'disabled': !isValidate}" class="btn btn-block v-yellow-btn" @click="submit()">{{__t('Đồng ý')}}</button></div>
          </div>
          <div class="row" v-else>
            <div class="col-sm-6 col-md-6"><button type="button"  class="btn btn-block" @click="close()">{{__t('Quay lại')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button"  class="btn btn-block btn-info" @click="copy()">{{__t('Sao chép')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import DoctorPlaceDiagnosticsOrder from '@/services/DoctorPlaceDiagnosticsOrder'
import Services from '@/services/Services'
import EventBus from '@/lib/eventBus'
import _ from 'lodash'
import UsersAdv2 from '@/components/global/UsersAdv2.vue'
const MODAL_WIDTH = 1280
export default {
  mixins: [],
  name: 'OrderSetsForm',
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      item: {},
      Services: [],
      ServicesSelected: [],
      defaultItem: {
        Services: [],
        UserIds: [],
        ServiceIds: [],
        Name: '',
        Code: ''
      },
      readonly: false
    }
  },
  components: {
    UsersAdv2
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    EventBus.$on('openOrdersetPopup', this.open)
  },
  beforeDestroy () {
    EventBus.$off('openOrdersetPopup')
  },
  computed: {
    isValidate: function () {
      return this.item.Services && this.item.Services.length && this.item.Name && this.item.Code
    }
  },
  watch: {
  },
  methods: {
    removeService (service) {
      this.item.Services = this.item.Services.filter(e => e.Id !== service.Id)
      this.toastedInfo(this.__t('Đã xóa dịch vụ'))
    },
    openPopup () {},
    open (item, readonly) {
      this.item = {...(item || this.defaultItem)}
      this.readonly = readonly
      this.$modal.show('OrderSetForm')
    },
    submit () {
      this.item.ServiceIds = (this.item.Services || []).map(e => e.Id)
      this.item.UserIds = (this.item.Users || []).map(e => e.Id)
      new DoctorPlaceDiagnosticsOrder()
        .createOrderSet(this.item)
        .then(res => {
          this.toastedSuccess()
          this.reload()
        })
    },
    copy () {
      this.item.Id = null
      this.item.Users = []
      this.item.UserIds = []
      this.readonly = false
    },
    close () {
      this.item = {}
      this.$modal.hide('OrderSetForm')
    },
    selectedService () {
      var exited = this.item.Services.find(e => e.Id === this.ServicesSelected[0].Id)
      if (!exited) {
        this.item.Services.push(this.ServicesSelected[0])
        this.toastedSuccess(this.__t('Đã thêm dịch vụ'))
      } else {
        this.toastedError(this.__t('Dịch vụ đã được chọn trong danh sách'))
      }
      setTimeout(() => {
        this.ServicesSelected = []
      }, 1)
    },
    onSearch (search, loading) {
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      new Services({search: search, PageSize: process.env.PAGE_SIZE}).all().then(res => {
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
