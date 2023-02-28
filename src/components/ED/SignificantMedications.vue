<template>
  <div v-if="datas">
    <div class="ed-info box-collapse" :class="{'open': open}">
      <div class="ed-customer-title">
        <b>{{__t('Các thuốc chính đã dùng')}}</b>
      </div>
      <div class="box-collapse-content">
        <table class="table mini-table" v-if="datas && datas.length">
          <thead>
            <th>{{__t('Tên thuốc')}}</th>
            <th>{{__t('Số lượng')}}</th>
            <th>{{__t('Đơn vị tính')}}</th>
            <th>{{__t('Đường dùng')}}</th>
            <th>{{__t('Liều dùng')}}</th>
            <th>{{__t('Ngày dùng')}}</th>
            <th></th>
          </thead>
          <tr :key="index" v-for="(item,index) in datas">
            <td>{{item.TenThuoc}}</td>
            <td>{{item.SoLuong}}</td>
            <td>{{item.DonViTinh}}</td>
            <td>{{item.DuongDung}}</td>
            <td>{{item.LieuDung}}</td>
            <td>{{item.NgayDung}}</td>
            <td width="1"><button class="btn btn-flat btn-xs" @click="copy(item)">Copy</button></td>
          </tr>
        </table>
        <h5 class="text-center msg-no-data" v-else>{{__t('Chưa có thông tin')}}</h5>
      </div>
      <div class="box-action" @click="collapse()">
        <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
        <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
      </div>
    </div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
export default {
  /**
   * The name of the page.
   */
  name: 'SignificantMedications',
  props: ['data', 'copyAllData'],
  watch: {
    data: function (val) {
      this.datas = this.JSONParse(this.data)
    }
  },
  data () {
    return {
      datas: null,
      open: false
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
    // this.addItem()
    this.datas = this.JSONParse(this.data)
  },
  computed: {
  },
  methods: {
    collapse () {
      this.open = !this.open
    },
    copy (item) {
      if (this.copyAllData) {
        this.$emit('copy', item)
        return
      }
      this.$emit('copy', item.TenThuoc + ' SL: ' + (item.SoLuong || 'N/A') + ' ' + (item.DonViTinh || '') + ' ' + (item.NgayDung || ''))
    }
  }
}
</script>
