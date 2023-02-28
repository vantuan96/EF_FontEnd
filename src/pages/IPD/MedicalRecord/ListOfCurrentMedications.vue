<template>
  <div class="mb-10">
    <div class="sync-medications-list" style="width: 100%" v-if="SyncMedications && SyncMedications.length">
      <label class="mt-5 mb-5 pl-5">{{__t('Thông tin khai thác các thuốc đã dùng trên hệ thống')}}</label>
      <vue-scrolling-table>
        <template slot="tbl">
          <table class="table mini-table">
            <thead>
              <tr>
                <th class="text-left">{{__t('Tên thuốc')}}</th>
                <th width="110px" class="text-left">{{__t('Liều dùng')}}</th>
                <th width="170px" class="text-left">{{__t('Đường dùng')}}</th>
                <th width="120px" class="text-left">{{__t('Ngày dùng')}}</th>
                <th width="1"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in SyncMedications" :key="index">
                <td><p>{{(item.TenThuoc)}}</p></td>
                <td>{{item.LieuDung}}</td>
                <td>{{item.DuongDung}}</td>
                <td>{{item.NgayDung}}</td>
                <td>
                  <button class="btn btn-xs" @click="copy(item)">Copy</button>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </vue-scrolling-table>
    </div>
  </div>
</template>
<script>
import PatientMedicationList from '@/services/Custome'
export default {
  name: 'ListOfCurrentMedications',
  mixins: [],
  props: ['Type', 'VisitTypeGroupCode', 'RealOnly', 'VisitId'],
  components: {},
  data () {
    return {
      SyncMedications: [],
      loading: true
    }
  },
  computed: {
  },
  mounted () {
  },
  created () {
    if (!this.RealOnly) this.sync()
  },
  methods: {
    copy (item) {
      var str = [item.TenThuoc, item.LieuDung, item.DuongDung, item.NgayDung].filter(e => e).map(m => {
        return (this.trim_(m, ' ')).replace(/(\r\n|\n|\r)/gm, '')
      }).join(', ')
      this.$emit('copy', str)
    },
    sync () {
      new PatientMedicationList('api/IPD/MedicalRecord/SyncReadOnlySignificantMedications/?hidemsg=' + true).create({
        Type: this.Type,
        VisitTypeGroupCode: this.VisitTypeGroupCode,
        Id: (this.VisitId || this._VisitId)
      }).then(response => {
        this.SyncMedications = response || []
      })
    }
  }
}
</script>
