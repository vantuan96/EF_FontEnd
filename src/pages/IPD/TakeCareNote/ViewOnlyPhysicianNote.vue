<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{__label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="Form.UpdatedBy" /> {{__t('lúc')}}: {{getFTime(Form.UpdatedAt)}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <view-form :ViewOnly="true" :VisitType="'IPD'" :VisitId="_VisitId"/>
    </template>
  </Vcollapse>
</template>
<script>
import ViewForm from '@/pages/IPD/PhysicianNote/View/Index.vue'
export default {
  name: 'ViewOnlyPhysicianNote',
  props: ['VisitId', 'VisitType', 'Form'],
  mixins: [],
  data () {
    return {
      hasData: false
    }
  },
  components: {
    ViewForm
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
