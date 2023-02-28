<template>
  <div class="p-10" v-if="viewDetailItem">
    <h4 class="mt-0"><b>{{__t('Danh sách đã chỉ định')}}</b></h4>
    <p>{{__t('Đã chỉ định bởi')}} <ad-Info :ad="viewDetailItem.CreatedBy" /> {{__t('lúc')}} {{viewDetailItem.CreatedAt | formatDate}}<label v-if="viewDetailItem.Priority === 'W'" class="label label-danger label-danger-2 ml-5"> <i class="fa fa-info-circle" aria-hidden="true"></i> <span class="tooltiptext">{{__t('Khẩn cấp')}}</span> </label></p>
    <!-- <p v-if="viewDetailItem.Reason"><b>{{__t('Lý do chỉ định')}}</b></p> -->
    <!-- <p v-if="viewDetailItem.Reason" class="fake-input ml-0 mb-10">{{viewDetailItem.Reason}}</p> -->
    <p><b>{{__t('Chẩn đoán/ Lịch sử lâm sàng')}}</b></p>
    <p class="fake-input ml-0 mb-10">{{viewDetailItem.Diagnosis}}</p>
    <table class="table mb-10 tbl-5">
      <thead>
        <tr>
          <th></th>
          <th width="100px">{{__t('Trạng thái')}}</th>
          <th width="150px">{{__t('Ngày chỉ định')}}</th>
        </tr>
      </thead>
    </table>
    <ItemsDetailList :type="0" :Items="viewDetailItem.Items"/>
    <ItemsDetailList :type="1" :Items="viewDetailItem.Items"/>
    <ItemsDetailList :type="2" :Items="viewDetailItem.Items"/>
    <div class="text-right">
      <button v-if="viewDetailItem.Items.find(e => e.Pathology && e.Status === 'Placed' && e.Pathology.PathologyType !== '001')" class="btn btn-sm btn-warning" @click="printGPBAction(viewDetailItem.Id)"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In Phiếu khai GPB')}}</button>
      <button v-if="viewDetailItem.Items.find(e => e.Status && e.Status === 'Placed')" class="btn btn-sm btn-warning" @click="printAction(viewDetailItem.Id)"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In Phiếu chỉ định')}}</button>
    </div>
    <!-- <Print :data="viewDetailItem" :Site="Site" :User="User" :Customer="Customer" :ref="'PrintPopup' + viewDetailItem.Id" /> -->
  </div>
</template>
<script>
// Placed
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import ItemsDetailList from './ItemsDetailList.vue'
import EventBus from '@/lib/eventBus'
export default {
  name: 'ChargeDetail',
  mixins: [MixinPlaceDiagnostics],
  props: ['viewDetailItem', 'Site', 'Customer', 'User', 'chargeData'],
  data () {
    return {
    }
  },
  components: {
    ItemsDetailList
  },
  created () {
  },
  computed: {
  },
  methods: {
    printAction () {
      EventBus.$emit('openPrintPopup', this.viewDetailItem, this.Site, this.User, this.chargeData)
    },
    printGPBAction () {
      EventBus.$emit('openPathologyPrint', this.viewDetailItem, this.User, this.chargeData)
    }
  }
}
</script>
