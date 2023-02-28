<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <Pediatric3To12Month :viewOnly="true" :VisitId="VisitId" :VisitType="_VisitType"/>
    </template>
  </Vcollapse>
</template>
<script>
import Pediatric3To12Month from './Index'

export default {
  name: 'IPDVitalSignFor3To12',
  props: ['Form', 'VisitId', 'VisitType', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false
    }
  },
  components: {
    Pediatric3To12Month
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
