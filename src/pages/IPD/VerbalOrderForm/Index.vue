<template>
  <div class="IPDVerbalOrderForm">
    <h1 class="text-center form-title disable_ccp6" style="margin-bottom: 0px!important;" v-if="_VisitType === 'IPD'">{{__t('Phiếu ghi nhận thuốc y lệnh miệng')}}</h1>
    <orders-table v-if="!IsLocked24h" :EdId="this.VisitId"/>
    <ViewOnly v-else :viewOnly="true" :VisitId="_VisitId" :VisitType="_VisitType"/>
  </div>
</template>

<script>
import $ from 'jquery'
import storage from '@/lib/storage'
import OrdersTable from '@/components/ED/Orders.vue'
import Orders from '@/services/ED/Orders'
import ViewOnly from '@/components/ED/OrdersTableView.vue'

export default {
  name: 'IPDVerbalOrderForm',
  props: ['VisitId'],
  components: {
    OrdersTable,
    ViewOnly
  },
  data () {
    return {
      IsLocked24h: false
    }
  },
  mounted () {
    $('.disable_ccp6' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
    this.getLock()
  },
  methods: {
    getLock () {
      new Orders({}, this._VisitType).find(this._VisitId).then(response => {
        this.IsLocked24h = response.IsLocked24h
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
