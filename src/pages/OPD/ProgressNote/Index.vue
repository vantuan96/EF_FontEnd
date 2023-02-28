<template>
  <div id="PatientProgressNote-Page" class="main-content disable_ccp">
    <h2 class="text-center">{{__t('OS0.theo_doi_dien_bien')}}</h2>
    <observation-table :VisitId="this.$route.params.Id" :Type="'OPD'"/>
    <br/>
    <patient-progress-notes :VisitId="this.$route.params.Id"/>
    <div class="text-center">
      <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">{{__t('btn.quay_lai')}}</button>
    </div>
  </div>
</template>
<script>
// import _ from 'lodash'
import PatientProgressNotes from '@/components/OPD/PatientProgressNotes.vue'
import ObservationTable from '@/components/ObservationTable.vue'
import $ from 'jquery'
import storage from '@/lib/storage'
export default {
  name: 'PatientProgressNote',
  data () {
    return {
    }
  },
  mixins: [],
  /**
   * The components that the page can use.
   */
  components: {
    PatientProgressNotes, ObservationTable
  },
  mounted () {
    $('.disable_ccp' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
  },
  computed: {
  },
  methods: {
  }
}
</script>
