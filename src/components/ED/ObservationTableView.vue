<template>
  <div>
    <h3>{{__t('Bảng theo dõi')}}</h3>
    <table class="table table-bordered table-view">
      <template v-if="data.Datas && data.Datas.length">
        <thead>
          <tr>
            <th rowspan="2" width="1">{{__t('Ngày giờ')}}</th>
            <th colspan="3">{{__t('Mạch, Huyết áp')}}</th>
            <th rowspan="2">{{__t('Nhiệt độ')}}</th>
            <th rowspan="2">{{__t('Nhịp thở')}}</th>
            <th rowspan="2">{{__t('Spo2')}}</th>
            <th colspan="2">{{__t('Đau')}}</th>
            <!-- <th rowspan="2">-/-</th> -->
            <th rowspan="2" width="25%">{{__t('Khác')}}</th>
            <th rowspan="2" class="no-wrap">{{__t('Người tạo')}}</th>
          </tr>
          <tr>
            <th>Sys BP</th>
            <th>Dia BP</th>
            <th>Pulse</th>
            <th>Rest</th>
            <th>Moving</th>
          </tr>
          </thead>
          <tbody v-if="data.Datas && data.Datas.length">
            <tr v-for="(item, index) in data.Datas" :key="index" :class="{'is_new': !item.Id}">
              <td>{{item.NoteAt}}</td>
              <td>{{item.SysBP}}</td>
              <td>{{item.DiaBP}}</td>
              <td>{{item.Pulse}}</td>
              <td>{{item.Temperature}}</td>
              <td>{{item.Resp}}</td>
              <td>{{item.SpO2}}</td>
              <td>{{item.RestPainScore}}</td>
              <td>{{item.MovePainScore}}</td>
              <td>{{item.Other}}</td>
              <td><ad-Info :ad="item.Fullname" /></td>
              <!-- <td>
                <button class="btn btn-xs btn-flat btn-warning"><span class="glyphicon glyphicon-trash"></span></button>
              </td> -->
            </tr>
          </tbody>
        </template>
        <tbody v-else>
          <tr>
            <th class="text-center">{{__t('Chưa có dữ liệu')}}</th>
          </tr>
        </tbody>
    </table>
  </div>
</template>
<script>
// import _ from 'lodash'
import ObservationChart from '@/services/ObservationChart'
export default {
  name: 'v-ObservationTable',
  props: ['VisitId', 'onEtr', 'Type'],
  components: {
  },
  data () {
    return {
      data: {}
    }
  },
  watch: {
  },
  created () {
    this.loadData()
  },
  computed: {
  },
  methods: {
    loadData () {
      new ObservationChart({VisitType: this.Type}).find(this.VisitId).then(response => {
        this.data = response
      })
    }
  }
}
</script>
