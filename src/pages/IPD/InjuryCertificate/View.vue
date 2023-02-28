<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span v-if="FormV2" class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="FormV2.UpdatedBy" :ad="FormV2.UpdatedBy" /> {{__t('lúc')}}: {{FormV2.UpdatedAt}}</span>
      <span v-else-if="Form" class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="Form.UpdatedBy" :ad="Form.UpdatedBy" /> {{__t('lúc')}}: {{Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <InjuryCertificate :viewOnly="true" :VisitId="VisitId" :VisitType="_VisitType"/>
    </template>
  </Vcollapse>
</template>
<script>
import InjuryCertificate from './Index.vue'

export default {
  name: 'IPDInjuryCertificate',
  props: ['VisitId', 'Form', 'VisitType', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false
    }
  },
  components: {
    InjuryCertificate
  },
  mounted () {
    console.log('FormV2-InjuryCertificate', this.FormV2)
  },
  computed: {
  },
  watch: {
  },
  methods: {
    getData () {
      console.log('ok')
      this.hasData = true
      if (this.$refs.Vcollapse) {
        this.$refs.Vcollapse.setHasData()
      }
    }
  }
}
</script>
