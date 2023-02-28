
<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <!-- <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="Form.UpdatedBy" /> {{__t('lúc')}} {{Form.UpdatedAt }}</span> -->
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}}: {{FormV2 ? FormV2.UpdateAt :  Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <div class="wap-table">
        <observation-table :Readonly="true" :VisitId="VisitId || this.$route.params.Id" :Type="'OPD'"/>
      </div>
      <div class="wap-table">
        <patient-progress-notes :Readonly="true" :VisitId="VisitId || this.$route.params.Id" :Type="'OPD'"/>
      </div>
    </template>
  </Vcollapse>
</template>
<script>
import ObservationTable from '@/components/ED/ObservationTableView.vue'
import PatientProgressNotes from '@/components/OPD/PatientProgressNotes.vue'
// import NProgress from 'nprogress'
// import $ from 'jquery'
export default {
  /**
   * The name of the page.
   */
  name: 'OPDPatientProgressNote',
  props: ['VisitId', 'Form', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    PatientProgressNotes, ObservationTable
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
      this.hasData = true
      if (this.$refs.Vcollapse) {
        this.$refs.Vcollapse.setHasData()
      }
    }
  }
}
</script>
