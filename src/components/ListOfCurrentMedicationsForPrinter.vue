<template>
  <div>
    <table class="tbl-b" width="100%" v-if="!loading">
        <tr v-if="!t3">
          <th class="text-left" :style="customHeader">{{('STT')}}</th>
          <th class="text-left" :style="customHeader">{{('Tên thuốc, nồng độ, hàm lượng')}}</th>
          <th width="110px" class="text-left no-wrap" :style="customHeader">{{('Liều dùng/ngày')}}</th>
          <th width="170px" class="text-left no-wrap" :style="customHeader">{{('Đường dùng')}}</th>
          <th width="120px" class="text-left no-wrap" :style="customHeader">{{('Thời gian dùng lần cuối')}}</th>
        </tr>
        <tr v-else-if="Gynecological">
          <th class="text-left" :style="customHeader">STT/No.</th>
          <th class="text-center" :style="customHeader">
            <div>Tên thuốc, nồng độ, hàm lượng/</div>
            <div class="italic">Name, Concentration</div>
          </th>
          <th width="110px" class="no-wrap text-center" :style="customHeader">
            <div>Liều dùng/ngày</div>
            <div class="italic">Dose/frequency</div>
          </th>
          <th width="100px" class="no-wrap text-center" :style="customHeader">
            <div>Đường dùng</div>
            <div class="italic">Route</div>
          </th>
          <th width="120px" class="no-wrap text-center" :style="customHeader">
            <div>Thời gian dùng lần cuối/</div>
            <div class="italic">Last given dose</div>
          </th>
        </tr>
        <tr v-else>
          <th class="text-left" :style="customHeader">STT/No.</th>
          <th class="text-center" :style="customHeader">
            <div>Tên thuốc, nồng độ, hàm lượng/</div>
            <div class="italic">Name, Strength</div>
          </th>
          <th width="110px" class="no-wrap text-center" :style="customHeader">
            <div>Liều dùng/ngày</div>
            <div class="italic">Dose/day</div>
          </th>
          <th width="100px" class="no-wrap text-center" :style="customHeader">
            <div>Đường dùng</div>
            <div class="italic">Route</div>
          </th>
          <th width="120px" class="no-wrap text-center" :style="customHeader">
            <div>Thời gian dùng lần cuối/</div>
            <div class="italic">The last time</div>
          </th>
        </tr>
      <template v-if="DataSubmit.Datas && DataSubmit.Datas.length">
        <tr :key="index + 'odl'" v-for="(item, index) in DataSubmit.Datas">
          <td class="text-center">{{index + 1}}</td>
          <td v-if="!RealOnly">{{item.Drug}}</td>
          <td v-if="RealOnly"><div class="inline" style="word-break: break-all;">{{item.Drug}}</div></td>
          <td>{{item.Dosage}}</td>
          <td>{{item.Route}}</td>
          <td>{{item.LastDoseDate}}</td>
        </tr>
      </template>
      <template v-if="DataSubmit.Datas.length < 5">
        <tr :key="index" v-for="(item, index) in (5 - DataSubmit.Datas.length)">
          <td class="text-center">{{DataSubmit.Datas.length + index + 1}}</td>
          <td v-if="!RealOnly">{{item.Drug}}</td>
          <td v-if="RealOnly"><div class="inline" style="word-break: break-all;">{{item.Drug}}</div></td>
          <td>{{item.Dosage}}</td>
          <td>{{item.Route}}</td>
          <td>{{item.LastDoseDate}}</td>
        </tr>
      </template>
    </table>
  </div>
</template>
<script>
import MaskedInput from 'vue-masked-input'
import PatientMedicationList from '@/services/PatientMedicationList'
export default {
  name: 'ListOfCurrentMedications',
  mixins: [],
  props: ['Type', 'VisitTypeGroupCode', 'RealOnly', 'VisitId', 'customHeader', 't3', 'Gynecological'],
  components: {MaskedInput},
  data () {
    return {
      DataSubmit: {
        Data: []
      },
      SyncMedications: [],
      loading: true
    }
  },
  computed: {
  },
  mounted () {
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      new PatientMedicationList({
        Type: this.Type,
        VisitTypeGroupCode: this.VisitTypeGroupCode,
        hidemsg: true
      }).find((this.VisitId || this.$route.params.Id)).then(response => {
        this.loading = false
        this.DataSubmit = response
      })
    }
  }
}
</script>
