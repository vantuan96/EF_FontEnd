<template>
  <div v-if="hasDatas">
    <h3>{{__t('OS0.bang_theo_doi_dien_bien')}}</h3>
    <table class="table observation-table">
      <template v-if="Datas && Datas.length">
        <thead>
          <tr>
            <th width="150">{{__t('OS0.ngay_gio')}}</th>
            <th width="35%">{{__t('OS0.dien_bien_nguoi_benh')}}</th>
            <th width="35%">{{__t('OS0.can_thiep')}}</th>
            <!-- <th width="1">-/-</th> -->
            <th width="1" class="no-wrap">{{__t('Người tạo')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in Datas" :key="index">
            <td width="200">{{item.NoteAt}}</td>
            <td><p>{{item.Note}}</p></td>
            <td><p>{{item.Interventions}}</p></td>
            <td><ad-Info :ad="item.Username" /></td>
            <!-- <td><button class="btn btn-xs btn-flat btn-primary pull-right" @click="openForm(item)">{{__t('btn.sua')}}</button></td> -->
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
</template>
<script>
// import _ from 'lodash'
import PatientProgressNotes from '@/services/PatientProgressNotes'
export default {
  name: 'v-PatientProgressNotes',
  props: ['VisitId', 'Type'],
  components: {
  },
  data () {
    return {
      Datas: [],
      open: false,
      hasDatas: false
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
    hasData (t) {
      this.hasDatas = t
    },
    collapse () {
      this.open = !this.open
    },
    getData () {
      new PatientProgressNotes({VisitType: this.Type}).find(this.VisitId).then(response => {
        this.Datas = response.Datas
        this.hasDatas = this.Datas.length
      })
    }
  }
}
</script>
