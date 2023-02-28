<template>
  <div v-if="ItemsData.length">
    <span class="link">
      {{__t(Types[type])}}
    </span>
    <div class="pl-10">
      <table class="table mb-0 tbl-5">
        <tbody :key="index" :data="group" v-for="(group, index) in Grouped">
          <tr>
            <th><input class="mr-5" :disabled="noItemPlacing(group.Code)" type="checkbox" @click="setSelectAll(group.Code, $event)"  v-model="group.Selected" />{{group.Label}}</th>
            <th width="100px"></th>
            <th width="150px"></th>
          </tr>
          <template v-if="chargeItem.ServiceGroupCode === group.Code" v-for="(chargeItem, indexxn) in ItemsData">
          <tr :key="indexxn" :data="chargeItem" :class="'status-' + chargeItem.Status">
            <td style="padding-left: 15px !important;">
              <input class="mr-5" :disabled="!chargeItem.AllowCancel || chargeItem.DiagnosticReported" type="checkbox" v-model="chargeItem.Selected" @click="setSelected(chargeItem)"/>
              <a title="Xem chi tiết" @click="openPi('openMicrobiologyPopup', chargeItem)" class="link">{{chargeItem.Service.Code}} - {{chargeItem.Service.ViName}} <span v-if="chargeItem.Quantity && chargeItem.Quantity > 1">({{__t('SL')}}: {{chargeItem.Quantity}})</span></a>
              <label v-if="chargeItem.Priority === 'W'" class="label label-danger label-danger-2">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                <span class="tooltiptext">{{__t('Khẩn cấp')}}</span>
              </label>
              <i aria-hidden="true" v-if="chargeItem.ItemType === 0" class="fa fa-flag"></i>
              <i aria-hidden="true" v-if="chargeItem.ItemType === 1" class="fa fa-flag-o"></i>
            </td>
            <td :class="'status-' + chargeItem.Status">
              <template v-if="chargeItem.Status === 'Cancelled'">
                <a class="hover-tooltip" :title="[chargeItem.RadiologyScheduledStatus, chargeItem.PaymentStatus, chargeItem.PlacerOrderStatus].filter(e => e).join(', ')" >
                  {{chargeItem.Status}} <i class="fa fa-info-circle" aria-hidden="true"></i>
                  <span class="tooltiptext">{{__t('Đã hủy bởi')}} <ad-Info :ad="chargeItem.CancelBy" /> {{__t('lúc')}} {{chargeItem.UpdatedAt | formatDate}}</span>
                </a>
              </template>
              <a v-else :title="[chargeItem.RadiologyScheduledStatus, chargeItem.PaymentStatus, chargeItem.PlacerOrderStatus].filter(e => e).join(', ')" >{{chargeItem.Status}}</a>
              <label v-if="chargeItem.FailedReason || chargeItem.CancelFailedReason" class="label label-danger label-danger-2 hover-tooltip ml-5">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                <span class="tooltiptext">{{chargeItem.CancelFailedReason ? ('Cancel: ' + chargeItem.CancelFailedReason) : chargeItem.FailedReason}}</span>
              </label>
            </td>
            <td @dblclick="opening(chargeItem)">{{chargeItem.CreatedAt | formatDate}}</td>
          </tr>
          </template>
        </tbody>
      </table>
      <button v-if="ItemsData.filter(e => e.Selected).length" type="button" class="btn btn-flat btn-warning btn-sm" @click="cancel()">{{ __t('Hủy chỉ định') }}</button>
    </div>
  </div>
</template>
<script>
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import DoctorPlaceDiagnosticsOrder from '@/services/DoctorPlaceDiagnosticsOrder'
import EventBus from '@/lib/eventBus'
import _ from 'lodash'
export default {
  name: 'ItemsDetailList',
  mixins: [MixinPlaceDiagnostics],
  props: ['type', 'Items'],
  data () {
    return {
      ItemsData: [],
      Grouped: [],
      Types: ['Dịch vụ xét nghiệm', 'Dịch vụ CĐHA', 'Dịch vụ chung'],
      showDetail: false,
      Selecteds: []
    }
  },
  watch: {
    Items: {
      handler (a, b) {
        this.setData()
      },
      deep: true
    },
    ItemsData: {
      handler (a, b) {
        this.setSelecteds()
      },
      deep: true
    }
  },
  components: {
  },
  created () {
    this.setData()
  },
  computed: {
    chargeItems: function () {
      return this.cloneObj(this.Items ? this.Items.filter(e => e.ServiceType === this.type) : [])
    }
  },
  methods: {
    setSelecteds () {
      this.ItemsData.forEach(e => {
        this.setSelected(e)
      })
    },
    setSelected (item) {
      if (item.Selected) {
        this.Selecteds.push(item.Id)
      } else {
        this.Selecteds = this.Selecteds.filter(e => e !== item.Id)
      }
    },
    openPi (type, item) {
      EventBus.$emit('openDetailPopup', item)
    },
    setData () {
      this.ItemsData = _.orderBy(this.cloneObj(this.Items ? this.Items.filter(e => e.ServiceType === this.type) : []).map(e => {
        e.ServiceGroup = e.Service.ServiceGroup.ViName
        e.ServiceGroupCode = e.Service.ServiceGroup.Code
        e.Selected = e.AllowCancel && !e.DiagnosticReported && (e.Selected || this.Selecteds.includes(e.Id))
        return e
      }), ['ServiceCode'], ['asc'])
      this.ItemsData.forEach(item => {
        var f = this.Grouped.find(e => e.Code === item.ServiceGroupCode)
        if (!f) {
          this.Grouped.push({
            Code: item.ServiceGroupCode,
            Label: item.ServiceGroup,
            Selected: false
          })
        }
      })
    },
    noItemPlacing (code) {
      return this.ItemsData.filter(item => {
        return item.ServiceGroupCode === code && item.AllowCancel && !item.DiagnosticReported
      }).length === 0
    },
    setSelectAll (code) {
      setTimeout(() => {
        this.ItemsData.forEach(item => {
          if (item.ServiceGroupCode === code && item.AllowCancel && !item.DiagnosticReported) item.Selected = this.Grouped.find(e => e.Code === item.ServiceGroupCode).Selected
        })
      }, 100)
    },
    opening (item) {
      this.alert('', JSON.stringify(item))
    },
    cancel () {
      this.$modal.show('dialog', {
        title: this.__t('Cảnh báo'),
        text: this.__t('Bạn chắc chắn hủy các dịch vụ đã chọn?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
              new DoctorPlaceDiagnosticsOrder()
                .update('Charge/Cancel', {Ids: this.ItemsData.filter(e => e.Selected).map(e => e.Id)})
                .then(({Failed, OK, Total, Items, NotAllowCancel}) => {
                  if (OK === Total) {
                    this.alert(this.__t('Thông báo'), 'Hủy chỉ định thành công')
                  } else if (Failed === Total) {
                    this.alert(this.__t('Thông báo'), 'Hủy chỉ định thất bại, vui lòng xem chi tiết để biết thêm thông tin')
                  } else if (NotAllowCancel) {
                    this.alert(this.__t('Thông báo'), `Có ${NotAllowCancel} dịch vụ không được phép hủy vì lý do đã được thực hiện hoặc đã được thanh toán`)
                  } else {
                    this.alert(this.__t('Thông báo'), `Hủy chỉ định thành công ${OK} dịch vụ, chỉ định thất bại ${Failed} dịch vụ, vui lòng xem chi tiết để biết thêm thông tin`)
                  }
                  this.ItemsData.forEach(item => {
                    var isUpdated = Items.find(e => e.Id === item.Id)
                    if (isUpdated) {
                      item.Status = isUpdated.Status
                      item.FailedReason = isUpdated.FailedReason
                      item.CancelFailedReason = isUpdated.CancelFailedReason
                      item.Selected = false
                      item.AllowCancel = isUpdated.AllowCancel
                      item.DiagnosticReported = isUpdated.DiagnosticReported
                    }
                    // item.Selected = false
                  })
                }).catch(e => {
                  this.loaded = true
                })
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>
