<template>
  <div class="">
    <div class="" v-if="!this.IsLocked">
      <p style="display: inline-block;width: 100%;"><button v-if="!Readonly" class="btn btn-xs btn-flat btn-primary pull-right" @click="openForm()">{{__t('btn.nhap_du_lieu')}}</button></p>
    </div>
    <div class="">
      <table class="table observation-table">
        <template v-if="Datas && Datas.length">
          <thead>
            <tr>
              <th width="200">{{__t('OS0.ngay_gio')}}</th>
              <th>{{__t('OS0.dien_bien_nguoi_benh')}}</th>
              <th>{{__t('OS0.can_thiep')}}</th>
              <th width="1" class="no-wrap">{{__t('Người tạo')}}</th>
              <th v-if="!Readonly" width="50"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in Datas" :key="index">
              <td width="200">{{item.NoteAt}}</td>
              <td><p>{{item.Note}}</p></td>
              <td><p>{{item.Interventions}}</p></td>
              <td><ad-Info :ad="item.Username" /></td>
              <td v-if="!Readonly"><button v-if="item.Username === $store.state.account.Username" class="btn btn-xs btn-flat btn-primary pull-right" @click="openForm(item)">{{__t('btn.sua')}}</button></td>
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
    <modal name="PatientProgressNoteTable" transition="pop-out" height="auto" :clickToClose="false">
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
            <div class="col-md-6"><button v-shortkey="['ctrl', 's']" @shortkey="submit()" :disabled="!item.Note || !item.Interventions || !item.NoteAt" type="button" class="btn btn-block v-yellow-btn" @click="submit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
// import _ from 'lodash'
import PatientProgressNote from '@/services/OPD/PatientProgressNote'
import VDatePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
export default {
  name: 'v-PatientProgressNote',
  props: ['VisitId', 'Readonly', 'VisitType'],
  components: {
    VDatePicker
  },
  data () {
    return {
      Datas: [],
      IsLocked: null,
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
      new PatientProgressNote({}, this.VisitType).update(this.VisitId, data).then(response => {
        this.toastedSuccess()
        this.close()
        this.getData()
      })
    },
    close () {
      this.$modal.hide('PatientProgressNoteTable')
    },
    openForm (item) {
      this.item = item ? JSON.parse(JSON.stringify(item)) : {
        NoteAt: new Date(),
        Interventions: null,
        Note: null,
        Id: null
      }
      this.$modal.show('PatientProgressNoteTable')
    },
    getData () {
      new PatientProgressNote({}, this.VisitType).find(this.VisitId).then(response => {
        this.IsLocked = response.IsLocked
        this.Datas = response.Datas
        this.$emit('hasData', this.Datas.length)
      })
    }
  }
}
</script>
