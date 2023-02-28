<template>
  <div>
    <div v-if="datas">
      <div class="ed-info box-collapse" :class="{'open': open1}" v-if="datas">
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
                <td>{{it.NormalRange}}</td>
                <td :class="statusClass(it.Status)">{{it.Result}}</td>
                <td>{{it.Unit}}</td>
                <td>{{it.UpdateTime}}</td>
                <td width="1"><button class="btn btn-flat btn-xs" @click="copy(it)">Copy</button></td>
              </tr>
            </tbody>
          </table>
          <h5 class="text-center msg-no-data" v-else>{{__t('Chưa có kết quả xét nghiệm')}}</h5>
        </div>
        <div class="box-action  hidden" @click="collapse()">
          <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
          <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
        </div>
      </div>
      <div class="ed-info box-collapse" :class="{'open': open2}" v-if="datas">
        <div class="ed-customer-title">
          <b>{{__t('Kết quả chẩn đoán hình ảnh')}}</b>
        </div>
        <div class="box-collapse-content">
          <table class="table mini-table" v-if="datas['CDHA'] && datas['CDHA'].length">
            <thead>
              <tr>
                <th width="30%">{{__t('Tên dịch vụ')}}</th>
                <th>{{__t('Kết luận')}}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="(item,index) in datas['CDHA']">
                <td>{{item.TenDichVu}}</td>
                <td>{{item.KetLuan}}</td>
                <td width="1"><button class="btn btn-flat btn-xs" @click="copy(item)">Copy</button></td>
              </tr>
            </tbody>
          </table>
          <h5 class="text-center msg-no-data" v-else>{{__t('Chưa có kết quả CĐHA')}}</h5>
        </div>
        <div class="box-action hidden" @click="collapse2()">
          <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
          <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
        </div>
      </div>
      <DiagnosticReporting v-if="datas && datas.DiagnosticReporting" :datas="datas.DiagnosticReporting" :isReadonly="isReadonly" @onCopyText="copyText"/>
    </div>
    <div v-else>
      {{this.dataJson}}
    </div>
  </div>
</template>
<script>
import DiagnosticReporting from '@/components/DiagnosticReporting.vue'

export default {
  name: 'DI0RPT-VIEW',
  components: {
    DiagnosticReporting
  },
  props: ['dataJson', 'isReadonly'],
  data () {
    return {
      datas: null,
      open1: true,
      open2: true
    }
  },
  watch: {
    dataJson: function (val) {
      this.datas = this.JSONParse(this.dataJson)
    }
  },
  created () {
    this.datas = this.JSONParse(this.dataJson)
  },
  methods: {
    collapse () {
      this.open1 = !this.open1
    },
    collapse2 () {
      this.open2 = !this.open2
    },
    copyText (t) {
      this.$emit('copy', t)
    },
    copy (item) {
      if (!item.KetLuan) {
        item.KetLuan = 'N/A'
      }
      if (item.TenDichVu) {
        this.$emit('copy', this.trim(item.TenDichVu + ': ' + item.KetLuan.replace(/\r\n\r\n/g, '')))
      } else {
        this.$emit('copy', this.trim(item.TestName + ': ' + item.Result + ' ' + (item.Unit || '')))
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
