<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{__label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="Form.UpdatedBy" /> {{__t('lúc')}} {{Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <ViewOnly :viewOnly="true"/>
    </template>
  </Vcollapse>
</template>
<script>
/*
api/ED/ExternalTransportationAssessment/{id}
api/ED/ExternalTransportationAssessment/Create/{id}
api/ED/ExternalTransportationAssessment/{id}
api/ED/ExternalTransportationAssessment/Confirm/{id}
GENTDBM : thang điểm
EIOAEFET: form
*/
import ViewOnly from './Index.vue'

export default {
  name: 'ProcedureSummary',
  props: ['VisitId', 'Form'],
  mixins: [],
  data () {
    return {
      hasData: false
    }
  },
  components: {
    ViewOnly
  },
  mounted () {
  },
  computed: {
  },
  watch: {
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
