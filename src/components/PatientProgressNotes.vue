<template>
  <div class="ed-info box-collapse open" id="disable-x3828ahxh">
    <div class="ed-customer-title">
      <b>{{__t('OS0.bang_theo_doi_dien_bien')}}</b>
      <button v-if="!readonlyview" class="btn btn-xs btn-flat btn-primary pull-right" @click="openForm()">{{__t('btn.nhap_du_lieu')}}</button>
    </div>
    <div class="box-collapse-content">
      <table class="table observation-table">
        <template v-if="Datas && Datas.length">
          <thead>
            <tr>
              <th width="150">{{__t('OS0.ngay_gio')}}</th>
              <th width="35%">{{__t('OS0.dien_bien_nguoi_benh')}}</th>
              <th width="35%">{{__t('OS0.can_thiep')}}</th>
              <th width="1" class="no-wrap">{{__t('Người tạo')}}</th>
              <th width="1"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in Datas" :key="index">
              <td width="200">{{item.NoteAt}}</td>
              <td><p>{{item.Note}}</p></td>
              <td><p>{{item.Interventions}}</p></td>
              <td><ad-Info :ad="item.Username" /></td>
              <td><button v-if="item.Username === $store.state.account.Username" class="btn btn-xs btn-flat btn-primary pull-right" @click="openForm(item)">{{__t('btn.sua')}}</button></td>
            </tr>
          </tbody>
        </template>
        <tbody v-else>
          <tr>
            <td class="text-center">{{__t('OS0.chua_co_dien_bien')}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <modal name="PatientProgressNotesTable" transition="pop-out" height="auto" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t('OS0.bang_theo_doi')}}</h3>
        </div>
        <div class="box-body padding-15">
          <div class="form-group">
            <label>{{__t('OS0.ngay_gio')}}</label>
            <v-date-picker v-model="item.NoteAt" :format="vDateTimeFormat" class="full-w"/>
          </div>
          <div class="form-group">
            <label>{{__t('OS0.dien_bien_nguoi_benh')}}</label>
            <textarea-autosize v-model="item.Note" class="form-control" rows="3"/>
          </div>
          <div class="form-group">
            <label>{{__t('OS0.can_thiep')}}</label>
            <textarea-autosize v-model="item.Interventions" class="form-control" rows="3"/>
          </div>
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-md-6"><button type="button" class="btn btn-block" @click="close">{{__t('btn.huy')}}</button></div>
            <div class="col-md-6"><button :disabled="!item.Note || !item.Interventions || !item.NoteAt" v-shortkey="['ctrl', 's']" @shortkey="submit()" type="button" class="btn btn-block v-yellow-btn" @click="submit"><i class="fa fa-floppy-o" aria-hidden="true"></i>  {{__t('btn.luu')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
// import _ from 'lodash'
import PatientProgressNotes from '@/services/PatientProgressNotes'
import VDatePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
import $ from 'jquery'
import storage from '@/lib/storage'
export default {
  name: 'v-PatientProgressNotes',
  props: ['VisitId', 'readonlyview', 'Type'],
  components: {
    VDatePicker
  },
  data () {
    return {
      Datas: [],
      item: {
        NoteAt: new Date(),
        Interventions: null,
        Note: null,
        Id: null
      }
    }
  },
  watch: {
  },
  created () {
    this.getData()
  },
  computed: {
  },
  methods: {
    submit () {
      var data = this.item
      if (typeof data.NoteAt === 'object') {
        data.NoteAt = moment(this.item.NoteAt).format(this.vDateTimeFormat)
      }
      new PatientProgressNotes({VisitType: this.Type}).update(this.VisitId, data).then(response => {
        this.toastedSuccess()
        this.close()
        this.getData()
      })
    },
    close () {
      this.$modal.hide('PatientProgressNotesTable')
    },
    openForm (item) {
      this.item = item ? JSON.parse(JSON.stringify(item)) : {
        NoteAt: new Date(),
        Interventions: null,
        Note: null,
        Id: null
      }
      this.$modal.show('PatientProgressNotesTable')
    },
    getData () {
      new PatientProgressNotes({VisitType: this.Type}).find(this.VisitId).then(response => {
        $('#disable-x3828ahxh' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
          this.toastedError(this.__t('Bạn không thể thực hiện thao tác này trên hệ thống!'))
          return false
        })
        this.Datas = response.Datas
      })
    }
  }
}
</script>
