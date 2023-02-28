<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{__label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="Form.UpdatedBy" /> {{__t('lúc')}} {{Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <ExFormView :viewOnly="true" :VisitId="VisitId" :VisitType="_VisitType"/>
    </template>
  </Vcollapse>
</template>
<script>
import ExFormView from './Index.vue'

export default {
  name: 'ExFormView',
  props: ['VisitId', 'Form', 'VisitType'],
  mixins: [],
  data () {
    return {
      hasData: false
    }
  },
  components: {
    ExFormView
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
