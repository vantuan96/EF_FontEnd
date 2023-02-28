<template>
  <div>
    <div class="ed-info box-collapse" :class="{'open': open}" v-if="datas">
      <div class="ed-customer-title">
        <b>{{__t('Kết quả xét nghiệm')}}</b>
      </div>
      <div class="box-collapse-content">
        <table class="table mini-table" v-if="datas['XetNghiem'] && datas['XetNghiem'].length">
          <thead>
            <th>{{__t('Tên xét nghiệm')}}</th>
            <th>{{__t('Tham chiếu')}}</th>
            <th>{{__t('Kết quả')}}</th>
            <th>{{__t('Đơn vị')}}</th>
            <th>{{__t('Thời gian')}}</th>
            <th></th>
          </thead>
          <tbody :key="index" v-for="(item,index) in datas['XetNghiem']">
            <tr>
              <th colspan="6">{{item.Name}}</th>
            </tr>
            <tr :key="i" v-for="(it,i) in item.Datas">
              <td>{{it.TestName}}</td>
              <td><template v-if="it.Status > -1">{{it.LowerLimit}} - {{it.HigherLimit}}</template></td>
              <td :class="statusClass(it.Status)">{{it.Result}}</td>
              <td>{{it.Unit}}</td>
              <td>{{it.UpdateTime}}</td>
              <td width="1"><button class="btn btn-flat btn-xs" @click="copy(it)">Copy</button></td>
            </tr>
          </tbody>
        </table>
        <h5 class="text-center msg-no-data" v-else>{{__t('Chưa có kết quả xét nghiệm')}}</h5>
      </div>
      <div class="box-action" @click="collapse()">
        <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
        <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
      </div>
    </div>
    <div v-else>
      {{this.dataJson}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'OPDOENPT0',
  props: ['dataJson'],
  data () {
    return {
      datas: null,
      open: false,
      open2: false
    }
  },
  watch: {
    dataJson: function (val) {
      this.datas = this.JSONParse(this.dataJson)
    }
  },
  created () {
  },
  methods: {
    collapse () {
      this.open = !this.open
    },
    copy (item) {
      if (item.TenDichVu) {
        this.$emit('copy', item.TenDichVu + ': ' + item.KetLuan.replace(/\r\n\r\n/g, ''))
      } else {
        this.$emit('copy', item.TestName + ': ' + item.Result + ' ' + (item.Unit || ''))
      }
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
