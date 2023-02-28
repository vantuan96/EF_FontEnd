<template>
  <Vcollapse @getData="getData()" ref="Vcollapse" v-if="Form">
    <template slot='title'>
      {{__label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="Form.UpdatedBy" /> {{__t('lúc')}} {{Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <MedicalReport :viewOnly="true" :VisitId="VisitId" :VisitType="_VisitType"/>
    </template>
  </Vcollapse>
</template>
<script>
import MedicalReport from './Index.vue'

export default {
  name: 'MedicalReportOPD',
  props: ['VisitId', 'Form', 'VisitType'],
  mixins: [],
  data () {
    return {
      hasData: false
    }
  },
  components: {
    MedicalReport
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
