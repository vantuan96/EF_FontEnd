<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      <!-- {{FormV2}} -->
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? getFTime(FormV2.UpdateAt) : getFTime(Form.UpdatedAt)}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <only-view-pn :ViewOnly="true" :VisitType="_VisitType" :VisitId="_VisitId"/>
    </template>
  </Vcollapse>
</template>
<script>
import OnlyViewPn from '@/pages/PhysicianNote/View/Index.vue'
export default {
  name: 'EDPhysicianNote',
  props: ['VisitId', 'VisitType', 'Form', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false
    }
  },
  components: {
    OnlyViewPn
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
