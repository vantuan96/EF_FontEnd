<template>
  <div class="text-center" v-if="loading">
    <i>{{__t('Đang đồng bộ')}}...</i>
  </div>
  <div class="text-center hidden-text" v-else>
    <i>{{__t('Đang đồng bộ')}}...</i>
  </div>
</template>
<script>
import DoctorPlaceDiagnosticsOrder from '@/services/DoctorPlaceDiagnosticsOrder'

export default {
  name: 'NeedGetUpdate',
  props: ['value', 'ChargeId'],
  mixins: [],
  data () {
    return {
      loading: false,
      data: null,
      timeout: null
    }
  },
  watch: {
    // value: {
    //   handler (a, b) {
    //     this.data = this.value
    //     console.log('here')
    //   },
    //   deep: true
    // },
    value (val, oldVal) {
      console.log('here')
    }
  },
  created () {
    this.data = this.value
    this.getData()
    setTimeout(() => {
      this.getDatas()
    }, 30 * 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeout)
  },
  methods: {
    getData () {
      this.timeout = setInterval(() => {
        this.getDatas()
      }, 60 * 1000)
    },
    getDatas () {
      this.loading = true
      new DoctorPlaceDiagnosticsOrder().hideErrorMsg().hideLoading()
        .update('/GetUpdate', {
          ChargeId: this.data.Id
        })
        .then(response => {
          this.loading = false
          // this.data.Items = response.ChargeItem
          this.data.Items.forEach(item => {
            var finded = response.ChargeItem.find(e => e.Id === item.Id)
            if (finded) {
              item.RadiologyScheduledStatus = finded.RadiologyScheduledStatus
              item.PaymentStatus = finded.PaymentStatus
              item.PlacerOrderStatus = finded.PlacerOrderStatus
              item.FailedReason = finded.FailedReason
              item.CancelFailedReason = finded.CancelFailedReason
              item.FailedReason = finded.FailedReason
              item.Status = finded.Status
              item.CancelBy = finded.CancelBy
              item.UpdatedAt = finded.UpdatedAt
              item.AllowCancel = finded.AllowCancel
              item.DiagnosticReported = finded.DiagnosticReported
            }
          })
          setTimeout(() => {
            this.$emit('input', this.data)
          }, 100)
        }).catch(e => {
          this.loading = false
        })
    }
  }
}
</script>
