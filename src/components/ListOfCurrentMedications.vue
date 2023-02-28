<template>
  <div>
    <table class="table observation-table no-margin tbl-b2" v-if="!loading">
      <template v-if="DataSubmit.Datas && DataSubmit.Datas.length">
        <thead>
          <tr v-if="!t2">
            <th class="text-left">{{__t('Tên thuốc')}}</th>
            <th width="110px" class="text-left no-wrap">{{__t('Liều/ số ngày')}}</th>
            <th width="170px" class="text-left no-wrap">{{__t('Đường dùng')}}</th>
            <th width="120px" class="text-left no-wrap">{{__t('Ngày dùng gần nhất')}}</th>
          </tr>
          <tr v-else-if="Gynecological">
            <th class="text-left">{{__t('Tên thuốc-mdcGy')}}</th>
            <th width="110px" class="text-left no-wrap">{{__t('Liều/ số ngày-mdcGy')}}</th>
            <th width="170px" class="text-left no-wrap">{{__t('Đường dùng-mdcGy')}}</th>
            <th width="120px" class="text-left no-wrap">{{__t('Ngày dùng gần nhất-mdcGy')}}</th>
          </tr>
          <tr v-else>
            <th class="text-left">{{__t('Tên thuốc-mdc')}}</th>
            <th width="110px" class="text-left no-wrap">{{__t('Liều/ số ngày-mdc')}}</th>
            <th width="170px" class="text-left no-wrap">{{__t('Đường dùng-mdc')}}</th>
            <th width="120px" class="text-left no-wrap">{{__t('Ngày dùng gần nhất-mdc')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(item, index) in DataSubmit.Datas" v-if="!item.IsDeleted">
            <template v-if="!RealOnly" >
              <td style="position: relative" v-if="ShowDelete">
                <button class="btn-pos-left" @click="item.IsDeleted = true"><i class="fa fa-trash" aria-hidden="true"></i></button><medication v-model="item.Drug" />
              </td>
              <td style="position: relative" v-if="!ShowDelete">
                <button v-if="!item.Id" class="btn-pos-left" @click="item.IsDeleted = true"><i class="fa fa-trash" aria-hidden="true"></i></button><medication v-model="item.Drug" />
              </td>
              <td width="110px">
                <v-autosuggest v-model="item.Dosage" :options="[]" :placeholder="__t('Liều/ số ngày')"/>
              </td>
              <td width="170px"><medication-route v-model="item.Route"/></td>
              <td width="120px" class="text-center">
                <VDatePicker class="wmg2" :placeholder="__t('Nhập')"  :hideTooltip="true" style="display: inline-block;" v-model="item.LastDoseDate" :format="vDateFormat"/>
              </td>
            </template>
            <template v-else>
              <td>{{item.Drug}}</td>
              <td>{{item.Dosage}}</td>
              <td>{{item.Route}}</td>
              <td>{{item.LastDoseDate}}</td>
            </template>
          </tr>
        </tbody>
      </template>
      <template v-else>
        <tr>
          <td colspan="4" class="text-center">
            <div class="no-data-msg">{{__t('Không có thông tin thuốc đã dùng')}}</div>
          </td>
        </tr>
      </template>
      <tfoot v-if="!RealOnly">
        <tr>
          <td colspan="4" class="text-center"><button @click="add" class="btn btn-info"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('Thêm thuốc')}}</button></td>
        </tr>
      </tfoot>
    </table>
    <div class="sync-medications-list" style="width: 100%" v-if="SyncMedications && SyncMedications.length">
      <label class="mt-5 mb-5 pl-5">{{__t('Thông tin khai thác các thuốc đã dùng trên hệ thống')}}</label>
      <vue-scrolling-table>
        <template slot="tbl">
          <table class="table observation-table">
            <thead>
              <tr v-if="!t2">
                <th class="text-left">{{__t('Tên thuốc')}}</th>
                <th width="110px" class="text-left">{{__t('Liều/ số ngày')}}</th>
                <th width="170px" class="text-left">{{__t('Đường dùng')}}</th>
                <th width="120px" class="text-left">{{__t('Ngày dùng gần nhất')}}</th>
                <th width="1"></th>
              </tr>
              <tr v-else-if="Gynecological">
                <th class="text-left">{{__t('Tên thuốc-mdcGy')}}</th>
                <th width="110px" class="text-left no-wrap">{{__t('Liều/ số ngày-mdcGy')}}</th>
                <th width="170px" class="text-left no-wrap">{{__t('Đường dùng-mdcGy')}}</th>
                <th width="120px" class="text-left no-wrap">{{__t('Ngày dùng gần nhất-mdcGy')}}</th>
                <th width="1"></th>
              </tr>
              <tr v-else>
                <th class="text-left">{{__t('Tên thuốc-mdc')}}</th>
                <th width="110px" class="text-left no-wrap">{{__t('Liều/ số ngày-mdc')}}</th>
                <th width="170px" class="text-left no-wrap">{{__t('Đường dùng-mdc')}}</th>
                <th width="120px" class="text-left no-wrap">{{__t('Ngày dùng gần nhất-mdc')}}</th>
                <th width="1"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in SyncMedications" :key="index">
                <td>{{item.Drug}}</td>
                <td>{{item.Dosage}}</td>
                <td>{{item.Route}}</td>
                <td>{{item.LastDoseDate}}</td>
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
import MaskedInput from 'vue-masked-input'
import PatientMedicationList from '@/services/PatientMedicationList'
export default {
  name: 'ListOfCurrentMedications',
  mixins: [],
  props: ['Type', 'VisitTypeGroupCode', 'RealOnly', 'VisitId', 'VisitIdDrop', 't2', 'Gynecological', 'ShowDelete', 'urlFile', 'formId'],
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
    if (!this.RealOnly) this.sync()
  },
  methods: {
    copy (item) {
      var exited = this.DataSubmit.Datas.find(e => {
        return !e.IsDeleted && ((e.Drug || '') === (item.Drug || '') && (e.Dosage || '') === (item.Dosage || '') && (e.Route || '') === (item.Route || ''))
      })
      if (!exited) {
        this.DataSubmit.Datas.push({
          Drug: item.Drug,
          Dosage: item.Dosage,
          Route: item.Route,
          LastDoseDate: '',
          IsDeleted: false
        })
      }
    },
    add () {
      this.DataSubmit.Datas.push({
        Drug: '',
        Dosage: '',
        Route: '',
        LastDoseDate: '',
        IsDeleted: false
      })
    },
    sync () {
      new PatientMedicationList().update('Sync/' + (this._VisitId) + '?hidemsg=' + true, {
        Type: this.Type,
        VisitTypeGroupCode: this.VisitTypeGroupCode
      }).then(response => {
        this.SyncMedications = response.Datas || []
      })
    },
    submit (id) {
      this.loading = true
      var data = this.DataSubmit.Datas.filter(e => {
        if (e.LastDoseDate === null) {
          e.LastDoseDate = ''
        }
        return e.Drug
      })
      console.log('data ~ data', data)
      this.DataSubmit.Datas = data.filter(e => {
        if (e.IsDeleted) {
          if (e.Id) {
            return e
          }
        } else {
          return e
        }
      })
      console.log('submit ~ this.DataSubmit', this.DataSubmit)
      setTimeout(() => {
        new PatientMedicationList().update((this._VisitId), this.DataSubmit).then(async response => {
          this.getData()
        })
      }, 100)
    },
    getData () {
      new PatientMedicationList({
        Type: this.Type,
        VisitTypeGroupCode: this.VisitTypeGroupCode,
        hidemsg: true
      }).find((this._VisitId)).then(response => {
        this.loading = false
        var obj = response
        obj.Datas.map(element => {
          element.IsDeleted = false
        })
        this.DataSubmit = obj
      })
    },
    clear () {
      if (this.DataSubmit.Datas.length > 0) {
        this.DataSubmit.Datas.map(e => {
          e.IsDeleted = true
        })
      }
      console.log(this.DataSubmit.Datas)
    }
  }
}
</script>
