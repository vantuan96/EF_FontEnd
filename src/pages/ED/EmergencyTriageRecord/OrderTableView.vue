<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <ViewOnly :viewOnly="true" :VisitId="_VisitId" :VisitType="_VisitType"/>
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
import ViewOnly from '@/components/ED/OrdersTableView.vue'

export default {
  name: 'IPDVerbalOrderForm',
  props: ['VisitId', 'VisitType', 'Form', 'FormV2'],
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
