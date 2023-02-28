<template>
  <div v-if="loading">
    <template v-if="confirminfo">
      <div class="italic">{{getFTime(confirminfo.ConfirmAt)}}</div>
        <div class="flex align-center">
          <div class="fw600 mrr5">{{confirminfo.ConfirmBy}}</div>
          <div class="italic fw400" style="color: green">({{__t('Đã ký xác nhận')}})</div>
        </div>
        <div class="fw600">{{confirminfo.Fullname}}</div>
    </template>
  </div>
  <div v-else class="text-center">
    <v-loading/>
  </div>
</template>
<script>
import EIOService from '@/services/IPD/EIOService'
export default {
  name: 'ConfirmInfo',
  props: ['ItemId'],
  data () {
    return {
      confirminfo: null,
      loading: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      new EIOService().find('ConfirmForms/GetDetail/' + this.ItemId).then(e => {
        this.confirminfo = e
        this.loading = true
      }).catch((e) => {
        this.loading = true
      })
    }
  }
}
</script>
