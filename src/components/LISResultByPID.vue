<template>
  <div v-if="!loading">
    <div v-if="datas && datas.length">
      <table class="table table-striped table-bordered v-table" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <th width="1px" class="text-center">{{__t('Ngày trả kết quả')}}</th>
            <th>{{__t('Người chỉ định')}}</th>
            <th :key="index" v-for="(col, index) in cols">{{col.Title}}</th>
            <th width="120px">{{__t('Đơn vị')}}</th>
            <th width="140px">{{__t('Khoảng tham chiếu')}}</th>
            <th width="100px">{{__t('Xem biểu đồ')}}</th>
          </tr>
        </thead>
      </table>
    </div>
    <div v-else class="text-center">Không có kết quả</div>
  </div>
  <div v-else class="text-center"><v-loading/></div>
</template>
<script>
import GetLISResultByPID from '@/services/GetLISResultByPID'
const MODAL_WIDTH = 980
export default {
  name: 'LISResultByPID',
  props: ['Sids', 'PID'],
  data () {
    return {
      loading: true,
      datas: null,
      cols: [],
      modalWidth: 780
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
    this.getData()
  },
  methods: {
    getData () {
      new GetLISResultByPID().find(this.PID).then(data => {
        this.cols = data.cols
        this.datas = data.results
        setTimeout(() => {
          this.loading = false
        }, 500)
      }).catch(() => {
        this.loading = false
      })
    },
    statusClass (status) {
      if (status === -1) {
        return null
      }
      return ['warning', 'default', 'danger', 'info'][status]
    }
  }
}
</script>
