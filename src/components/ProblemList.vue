<template>
  <div v-if="ProblemList">
    <label>{{__t('Thông tin chẩn đoán xác định từ OH')}} <button class="btn btn-sync-data" @click="getData(true)">{{__t('Lấy kết quả mới nhất')}}</button></label>
    <template v-if="ProblemList.length">
      <vue-scrolling-table>
        <template slot="tbl">
          <table class="table table-bordered table-bordered-x">
            <thead>
              <tr>
                <th width="1" class="no-wrap">{{__t('Ngày khám')}}</th>
                <th width="1" class="no-wrap">{{__t('Bác sĩ')}}</th>
                <th class="no-wrap">{{__t('Mã ICD')}}</th>
                <th>{{__t('Chẩn đoán')}}</th>
                <th width="1"></th>
              </tr>
            </thead>
            <tbody>
              <tr :data="item" :key="index"  v-for="(item, index) in ProblemList">
                <td class="no-wrap">{{item.NgayKham | formatDate}}</td>
                <td class="no-wrap"><ad-Info :ad="item.DoctorAD"/></td>
                <td><b>{{item.MaICD}}</b><div>{{item.TenICD}}</div></td>
                <td><p v-if="item.ChanDoan">{{item.ChanDoan}}</p></td>
                <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyOPDOENPMH(item)">Copy</button></td>
              </tr>
            </tbody>
          </table>
        </template>
      </vue-scrolling-table>
    </template>
    <template v-else>
      <p class="text-center">{{__t('Không có kết quả')}}</p>
    </template>
  </div>
</template>
<script>
import ProblemList from '@/services/ProblemList'
export default {
  name: 'ProblemList',
  mixins: [],
  data () {
    return {
      ProblemList: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    copyOPDOENPMH (data) {
      this.$emit('copy', {
        Diagnosis: data.ChanDoan,
        PrimaryICD: [{
          code: data.MaICD,
          label: data.MaICD + ', ' + data.TenICD,
          Code: data.MaICD,
          ViName: data.TenICD
        }]
      })
    },
    getData () {
      new ProblemList({notRedirect: true, hidemsg: true}, this.getVisitGroupCode()).find(this.$route.params.Id).then(data => {
        this.ProblemList = data
      })
    }
  }
}
</script>
