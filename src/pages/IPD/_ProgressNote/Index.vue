<template>
  <div class="main-content disable_ccp" id="di0-page">
    <h2 class="text-center">{{__t('OS0.theo_doi_dien_bien')}}</h2>
    <br/>
    <patient-progress-notes :VisitId="this.$route.params.Id" :Type="'IPD'"/>
    <div class="text-center">
      <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">{{__t('btn.quay_lai')}}</button>
    </div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import ObservationTable from '@/pages/ProgressNote/ObservationTable.vue'
import PatientProgressNotes from '@/pages/ProgressNote/PatientProgressNotes.vue'
import MixinForm from '@/mixins/form.js'
// import NProgress from 'nprogress'
// import $ from 'jquery'
export default {
  /**
   * The name of the page.
   */
  name: 'ProgressNote',
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    ObservationTable, PatientProgressNotes
  },
  mounted () {
    // $('.disable_ccp').bind('cut copy paste', e => {
    //   this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
    //   return false
    // })
  },
  computed: {
  },
  methods: {
    getData () {
    }
  }
}
</script>
