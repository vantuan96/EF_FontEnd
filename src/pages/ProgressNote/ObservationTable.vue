<template>
  <table class="table table-bordered table-bordered-focus" id="disable-x388ahxh">
    <thead>
      <tr>
        <th rowspan="2" width="130">{{__t('Ngày giờ')}}</th>
        <th colspan="3" class="text-center">{{__t('Mạch, Huyết áp')}}</th>
        <th rowspan="2">{{__t('Nhiệt độ')}}</th>
        <th rowspan="2">{{__t('Nhịp thở')}}</th>
        <th rowspan="2">{{__t('Spo2')}}</th>
        <th colspan="2" class="text-center">{{__t('Đau')}}</th>
        <!-- <th rowspan="2">-/-')}}</th> -->
        <th rowspan="2" width="25%" v-if="!onEtr">{{__t('Khác')}}</th>
        <th rowspan="2" class="no-wrap" v-if="!onEtr">{{__t('Người tạo')}}</th>
      </tr>
      <tr>
        <th>{{__t('Sys BP')}}</th>
        <th>{{__t('Dia BP')}}</th>
        <th>{{__t('Pulse')}}</th>
        <th>{{__t('Rest')}}</th>
        <th>{{__t('Moving')}}</th>
      </tr>
      </thead>
      <template v-if="onEtr">
        <tbody v-if="data.Datas && data.Datas.length">
          <template v-for="(item, index) in data.Datas" :class="{'is_new': !item.Id}">
            <tr :key="index + 'x'">
              <template v-if="IsFirst && !readonly && (!item.Id || (item.Id && item.Fullname === $store.state.account.Username))">
                <td><v-date-picker v-model="item.NoteAt" :format="vDateTimeFormat"/></td>
                <td><input type="text" class="form-control" v-model="item.SysBP"/></td>
                <td><input type="text" class="form-control" v-model="item.DiaBP"/></td>
                <td><input type="text" class="form-control" v-model="item.Pulse"/></td>
                <td><input type="text" class="form-control" v-model="item.Temperature"/></td>
                <td><input type="text" class="form-control" v-model="item.Resp"/></td>
                <td><input type="text" class="form-control" v-model="item.SpO2"/></td>
                <td><input type="text" class="form-control" v-model="item.RestPainScore"/></td>
                <td><input type="text" class="form-control" v-model="item.MovePainScore"/></td>
              </template>
              <template v-else>
                <td>{{item.NoteAt}}</td>
                <td>{{item.SysBP}}</td>
                <td>{{item.DiaBP}}</td>
                <td>{{item.Pulse}}</td>
                <td>{{item.Temperature}}</td>
                <td>{{item.Resp}}</td>
                <td>{{item.SpO2}}</td>
                <td>{{item.RestPainScore}}</td>
                <td>{{item.MovePainScore}}</td>
              </template>
            </tr>
            <tr :key="index + 'y'">
              <template v-if="IsFirst && !readonly && (!item.Id || (item.Id && item.Fullname === $store.state.account.Username))">
                <td colspan="9">
                  <label>{{__t('Ghi chú (khác)')}}:</label><textarea-autosize class="form-control" v-model="item.Other"/>
                </td>
              </template>
              <template v-else>
                <td colspan="9">
                  <label>{{__t('Ghi chú (khác)')}}:</label><p class="fake-input disable">{{item.Other}}</p>
                </td>
              </template>
            </tr>
            <!-- <td>
              <button class="btn btn-xs btn-flat btn-warning"><span class="glyphicon glyphicon-trash"></span></button>
            </td> -->
          </template>
        </tbody>
      </template>
      <template v-else>
      <tbody v-if="data.Datas && data.Datas.length">
        <tr v-for="(item, index) in data.Datas" :key="index" :class="{'is_new': !item.Id}">
          <template v-if="!readonly && (!item.Id || (item.Id && item.Fullname === $store.state.account.Username)) && !IsLocked">
            <td><v-date-picker v-model="item.NoteAt" :format="vDateTimeFormat"/></td>
            <td><input type="text" class="form-control" v-model="item.SysBP"/></td>
            <td><input type="text" class="form-control" v-model="item.DiaBP"/></td>
            <td><input type="text" class="form-control" v-model="item.Pulse"/></td>
            <td><input type="text" class="form-control" v-model="item.Temperature"/></td>
            <td><input type="text" class="form-control" v-model="item.Resp"/></td>
            <td><input type="text" class="form-control" v-model="item.SpO2"/></td>
            <td><input type="text" class="form-control" v-model="item.RestPainScore"/></td>
            <td><input type="text" class="form-control" v-model="item.MovePainScore"/></td>
            <td><textarea-autosize class="form-control" v-model="item.Other"/></td>
            <td v-if="!onEtr"><ad-Info :ad="item.Fullname" /></td>
          </template>
          <template v-else>
            <td><v-date-picker style="white-space: nowrap;" :readonly="true" v-model="item.NoteAt" :format="vDateTimeFormat"/></td>
            <td>{{item.SysBP}}</td>
            <td>{{item.DiaBP}}</td>
            <td>{{item.Pulse}}</td>
            <td>{{item.Temperature}}</td>
            <td>{{item.Resp}}</td>
            <td>{{item.SpO2}}</td>
            <td>{{item.RestPainScore}}</td>
            <td>{{item.MovePainScore}}</td>
            <td><p>{{item.Other}}</p></td>
            <td v-if="!onEtr"><ad-Info :ad="item.Fullname" /></td>
          </template>
          <!-- <td>
            <button class="btn btn-xs btn-flat btn-warning"><span class="glyphicon glyphicon-trash"></span></button>
          </td> -->
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center" colspan="50">{{__t('Không có ghi nhận')}}</td>
        </tr>
      </tbody>
      </template>
      <tfoot v-if="!IsLocked">
        <tr v-if="!onEtr">
          <td colspan="11" class="text-center"><button type="button" class="btn" @click="add"><span class="glyphicon glyphicon-plus"></span> {{__t('Thêm lượt theo dõi')}}</button></td>
        </tr>
        <tr v-if="!onEtr">
          <td colspan="11">
            <div class="row">
              <div class="col-md-6"><button type="button" class="btn btn-block" @click="close">{{__t('Hủy')}}</button></div>
              <div class="col-md-6"><button type="button" class="btn btn-block v-yellow-btn" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button></div>
            </div>
          </td>
        </tr>
      </tfoot>
  </table>
</template>
<script>
// import _ from 'lodash' || (item.Id && item.Fullname === $store.state.account.Username)
import PatientProgressNote from '@/services/OPD/PatientProgressNote'
import ObservationChart from '@/services/ObservationChart'
import VDatePicker from '@/components/VDateTimePicker.vue'
import storage from '@/lib/storage'
import moment from 'moment'
import $ from 'jquery'
export default {
  name: 'v-ObservationTable',
  props: ['VisitId', 'onEtr', 'VisitType', 'readonly'],
  components: {
    VDatePicker,
    PatientProgressNote
  },
  data () {
    return {
      data: {
        Datas: [],
        IsFirst: false
      },
      IsLocked: false
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
    close () {
      // this.$emit('close', this.data)
      this.loadData()
    },
    isNullOrNA (value) {
      return !value || this.isNaNValue(value)
    },
    loadData () {
      new PatientProgressNote({}, this.VisitType).find(this.VisitId).then(response => {
        this.IsLocked = response.IsLocked
      })
      new ObservationChart({VisitType: this.VisitType}).find(this.VisitId).then(response => {
        $('#disable-x388ahxh' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
          this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
          return false
        })
        this.data = response
        this.IsFirst = this.data.Datas.length === 0
        if (this.data.Datas.length === 0 && !this.readonly) {
          this.data.Datas.push({
            SysBP: 'N/A',
            DiaBP: 'N/A',
            Pulse: 'N/A',
            Temperature: 'N/A',
            Resp: 'N/A',
            SpO2: 'N/A',
            RestPainScore: 'N/A',
            MovePainScore: 'N/A',
            NoteAt: new Date(),
            Other: ''
          })
        }
      })
    },
    add () {
      this.data.Datas.push({
        SysBP: 'N/A',
        DiaBP: 'N/A',
        Pulse: 'N/A',
        Temperature: 'N/A',
        Resp: 'N/A',
        SpO2: 'N/A',
        RestPainScore: 'N/A',
        MovePainScore: 'N/A',
        NoteAt: new Date(),
        Other: ''
      })
    },
    submitFromEtr () {
      console.log('her')
      if (this.onEtr && this.data.Datas.filter(item => !item.Id).length && this.hasValue()) this.submit()
    },
    hasValue () {
      return this.data.Datas.filter(item => {
        return !this.isNullOrNA(item.SysBP) ||
                !this.isNullOrNA(item.DiaBP) ||
                !this.isNullOrNA(item.Pulse) ||
                !this.isNullOrNA(item.Temperature) ||
                !this.isNullOrNA(item.Resp) ||
                !this.isNullOrNA(item.SpO2) ||
                !this.isNullOrNA(item.RestPainScore) ||
                !this.isNullOrNA(item.MovePainScore) ||
                !this.isNullOrNA(item.Other)
      }).length
    },
    submit () {
      this.data.Datas.map(i => {
        if (typeof i.NoteAt === 'object') {
          i.NoteAt = moment(i.NoteAt).format(process.env.DATETIME_FORMAT)
        }
      })
      new ObservationChart({VisitType: this.VisitType}).update(this.VisitId, this.data).then(response => {
        this.loadData()
      })
    }
  }
}
</script>
