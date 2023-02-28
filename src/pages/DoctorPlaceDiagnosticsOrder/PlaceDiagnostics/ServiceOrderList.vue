<template>
  <div>
    <div v-if="Packages.length" class="ServiceOrderList">
      <div class="mb-15 box form-content">
        <h4><b>{{__t('Nhóm gói dịch vụ')}}</b></h4>
        <div :key="ind" :data="item" v-for="(item, ind) in Packages">
          <div class="d-flex packageOrderList-item">
            <span class="flex-grow-1">
              {{ind + 1}}, {{item.Code}} - {{(item.Name)}}
            </span>
            <i @click="removePackageConfirm(item.Id)" class="fa fa-times cursor-pointer" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-if="servicesData.length" class="ServiceOrderList">
      <div :class="{'warning-box': index === 3}" v-if="services.length" class="mb-15 box form-content" :key="index" :data="services" v-for="(services, index) in servicesData">
        <p class="warning-msg" v-if="index === 3"><i>{{__t('Các dịch vụ này chưa được thiết lập giá, Cost Centre hoặc GL Account. Vui lòng chọn dịch vụ tương ứng khác.')}} </i></p>
        <h4 v-else><b>{{__t(Types[index])}}</b></h4>
        <div :key="ind" :data="service" v-for="(service, ind) in services">
          <div class="d-flex ServiceOrderList-item"  :class="{'warning-box-2': (service.ItemType === 0 && !isValidateDataMicrobiology(service) && !service.Microbiology) || (service.ItemType === 1 && !service.Pathology) || (service.RadiologyProcedurePlanRef && service.RadiologyProcedurePlanRef.length && !service.RadiologyProcedureId)}">
            <span class="flex-grow-1" @click="edit(service)">
              <a :title="(service.ItemType === 0 || service.ItemType === 1) ? __t('Click vào dịch vụ để nhập bổ sung thông tin') : ''">{{ind + 1}}, {{service.Code}} - {{__label(service)}}</a>
              <label v-if="service.msg" class="label label-danger label-danger-2 hover-tooltip ml-5">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                <span class="tooltiptext">{{service.msg}}</span>
              </label>
              <i v-if="service.ItemType === 0" aria-hidden="true" class="fa fa-flag"></i>
              <i v-if="service.ItemType === 1" aria-hidden="true" class="fa fa-flag-o"></i>
              <label v-if="service.Msg" class="label label-danger label-danger-2 hover-tooltip ml-5">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                <span class="tooltiptext">{{service.Msg}}</span>
              </label>
              <HasChargeOnDay :item="service" :items="lastItemChargeByPID" />
              <div class="text-right" v-if="!isNoPrice(service.Price) && step == 2">{{service.Price | currency}} VNĐ</div>
              <div class="tooltiptext-PriceWarMsg" v-if="service.PriceWarMsg">{{__label(service.PriceWarMsg)}}</div>
            </span>
            <i @click="removeService(service, index)" class="fa fa-times cursor-pointer" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Services from '@/services/Services'
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import HasChargeOnDay from './HasChargeOnDay'
// import _ from 'lodash'
import { mapGetters } from 'vuex'
export default {
  mixins: [MixinPlaceDiagnostics],
  name: 'ServiceOrderList',
  props: ['value', 'type', 'lastItemChargeByPID', 'step'],
  data () {
    return {
      // ServicesData: [],
      Types: ['Dịch vụ xét nghiệm', 'Dịch vụ CĐHA', 'Dịch vụ chung', 'Dịch vụ không có giá']
    }
  },
  components: {
    HasChargeOnDay
  },
  created () {
    this.getPrice()
  },
  computed: {
    ...mapGetters({
      servicesData: 'PlaceDiagnostics/getServices',
      Packages: 'PlaceDiagnostics/getPackages'
    })
  },
  watch: {
    // value: {
    //   handler (a, b) {
    //     this.getPrice()
    //   },
    //   deep: true
    // }
  },
  beforeDestroy () {
  },
  methods: {
    updateServices (data) {
      this.ServicesData[data.type] = data.Item
    },
    removeService (item, type) {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Bạn có chắc chắn xóa dịch vụ này?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.removeItem({Id: item.Id, type: type}, item)
              this.$modal.hide('dialog')
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    removeItem (obj, item) {
      this.remove(obj)
      if (item.PackageId) {
        setTimeout(() => {
          var allService = [].concat(this.servicesData[0]).concat(this.servicesData[1]).concat(this.servicesData[2])
          var hasClearAll = allService.find(e => e.PackageId === item.PackageId)
          if (!hasClearAll) this.removePackagee(item.PackageId)
        }, 500)
      }
    },
    removePackagee (id) {
      var arr = [].concat(this.servicesData[0]).concat(this.servicesData[1]).concat(this.servicesData[2])
      arr.forEach(item => {
        if (item.PackageId === id) this.remove({Id: item.Id, type: item.ServiceType})
      })
      this.removePackage(id)
    },
    removePackageConfirm (id) {
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
              this.removePackagee(id)
              this.$modal.hide('dialog')
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    emit () {
      this.$emit('setDetails', this.Services, this.type)
    },
    getPrice () {
      if (!this.value) return false
      new Services({noLoading: true}).GetPriceService({Ids: this.value}).then(res => {
        this.Services = res.items.map(e => {
          return {
            ...e,
            code: e.Id,
            label: e.Code + ' - ' + e.ViName
          }
        })
        this.emit()
      })
    }
  }
}
</script>
