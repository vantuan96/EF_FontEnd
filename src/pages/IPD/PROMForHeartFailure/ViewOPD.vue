<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <!-- <span v-if="Form" class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="Form.UpdatedBy" /> {{__t('lúc')}} {{Form.UpdatedAt}}</span> -->
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}}: {{FormV2 ? FormV2.UpdateAt :  Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <PROMForHeartFailure :viewOnly="true" :VisitId="VisitId" :VisitType="VisitType"/>
    </template>
  </Vcollapse>
</template>
<script>
import PROMForHeartFailure from './Index'

export default {
  name: 'OPDPROMForheartFailure',
  props: ['Form', 'VisitId', 'VisitType', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false
    }
  },
  components: {
    PROMForHeartFailure
  },
  mounted () {
    console.log('FormV2FormV2', this.FormV2)
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
