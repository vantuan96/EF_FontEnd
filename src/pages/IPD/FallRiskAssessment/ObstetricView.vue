<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <div class="wap-table">
        <Obstetric :VisitId="VisitId" :readonly="true"/>
      </div>
    </template>
  </Vcollapse>
</template>
<script>
import Obstetric from './Obstetric'
export default {
  /**
   * The name of the page.
   */
  name: 'IPDFallRiskAssessmentForObstetric',
  props: ['VisitId', 'Form', 'FormV2'],
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
    Obstetric
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
