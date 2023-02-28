<template>
  <div v-if="chargeItems.length">
    <span class="link" @click="showDetail = !showDetail">
      <i aria-hidden="true" class="fa fa fa-caret-down" v-if="showDetail"></i>
      <i aria-hidden="true" class="fa fa fa-caret-right" v-else></i>
      {{__t(Types[type])}}
    </span>
    <div v-if="showDetail" class="pl-10">
      <div :key="indexxn" :data="chargeItem" v-for="(chargeItem, indexxn) in chargeItems" class="mb-5 border-bottom">
        {{chargeItem.CreatedAt | formatDate}} <ad-Info :ad="chargeItem.CreatedBy" /> {{chargeItem.Service.ViName}}
      </div>
    </div>
  </div>
</template>
<script>
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import { mapGetters } from 'vuex'
export default {
  name: 'HistoryItem',
  mixins: [MixinPlaceDiagnostics],
  props: ['type', 'Items'],
  data () {
    return {
      Types: ['Dịch vụ xét nghiệm', 'Dịch vụ CĐHA', 'Dịch vụ chung'],
      showDetail: false
    }
  },
  components: {
  },
  created () {
  },
  computed: {
    ...mapGetters({
      viewDetailItem: 'PlaceDiagnostics/getViewItem'
    }),
    chargeItems: function () {
      return this.Items ? this.Items.filter(e => e.ServiceType === this.type) : []
    }
  },
  methods: {
  }
}
</script>
