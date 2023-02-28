<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
      <!-- {{'Bảng theo dõi diễn biến người bệnh'}} -->
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}}: {{FormV2 ? FormV2.UpdateAt :  pkFormat ? $options.filters.formatDateWithoutSecon(Form.UpdatedAt) : Form.UpdatedAt }}</span>
      <!-- <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="Form.UpdatedBy" /> {{__t('lúc')}} {{pkFormat ? $options.filters.formatDateWithoutSecon(Form.UpdatedAt) : Form.UpdatedAt }}</span> -->
    </template>
    <template slot='content' v-if="hasData">
      <div class="wap-table">
        <observation-table :Readonly="true" :VisitId="_VisitId" :VisitType="_VisitType"/>
      </div>
      <div class="wap-table">
        <patient-progress-notes :Readonly="true" :VisitId="_VisitId" :VisitType="_VisitType"/>
      </div>
    </template>
  </Vcollapse>
</template>
<script>
import ObservationTable from './ObservationTableView.vue'
import PatientProgressNotes from './PatientProgressNotes.vue'
// import NProgress from 'nprogress'
// import $ from 'jquery'
export default {
  /**
   * The name of the page.
   */
  name: 'EOCPatientProgressNote',
  props: ['VisitId', 'Form', 'VisitType', 'pkFormat', 'FormV2'],
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
