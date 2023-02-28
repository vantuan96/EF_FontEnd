<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}}: {{FormV2 ? FormV2.UpdateAt :  Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <div class="v-tab">
        <ul id="AmbulanceRunReportTab" class="nav nav-tabs" role="tablist">
          <li role="presentation" :class="activeClass('Part1')">
            <a @click="type = 'Part1'">{{__t('Hành chính')}}</a>
          </li>
          <li role="presentation" :class="activeClass('Part2')">
            <a @click="type = 'Part2'">{{__t('Bệnh án')}}</a>
          </li>
          <li role="presentation" :class="activeClass('Part3')">
            <a @click="type = 'Part3'" v-if="routeType === 'Gynecological'">{{__t('Tổng kết bệnh án-mdcGy')}}</a>
            <a @click="type = 'Part3'" v-else>{{__t('Tổng kết bệnh án')}}</a>
          </li>
          <li v-if="Version === '2' || routeType === 'CardiovascularForm'" role="presentation" :class="activeClass('PreProcedureRiskAssessmentForCardiacCatheterization')">
            <a @click="type = 'PreProcedureRiskAssessmentForCardiacCatheterization'">{{__t('Đánh giá nguy cơ người bệnh')}}</a>
          </li>
        </ul>
      </div>
      <div class="tab-content">
        <component v-if="type in $options.components" v-bind:is="type" :VisitType="visitType" :viewOnly="true" :routeType="routeType" :VisitIdDrop="VisitId"/>
        <div v-if="routeType === 'A01_034_050919_V' && Version && Version === '2'">A01_034_290422_V</div>
        <div v-if="routeType && routeType !== 'A01_034_050919_V'">{{getMaForm(typeForm)}}</div>
      </div>
    </template>
  </Vcollapse>
</template>
<script>
// import NProgress from 'nprogress'
// import $ from 'jquery'
import Part1 from './View/Part1.vue'
import Part2 from './View/Part2.vue'
import Part3 from './View/Part3.vue'
import PreProcedureRiskAssessmentForCardiacCatheterization from './View/PreProcedureRiskAssessmentForCardiacCatheterization.vue'

export default {
  /**
   * The name of the page.
   */
  name: 'IPDCardiovascularForm',
  props: ['VisitId', 'VisitType', 'Form', 'version', 'Version', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false,
      type: 'Part1',
      visitType: 'ED'
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    Part1,
    Part2,
    Part3,
    PreProcedureRiskAssessmentForCardiacCatheterization
    // Part2,
    // Part3
  },
  mounted () {
    this.visitType = this._VisitType
  },
  computed: {
    routeType () {
      return 'CardiovascularForm'
    },
    typeForm () {
      return 'BMTIMMACH'
    }
  },
  methods: {
    getData () {
      this.hasData = true
      if (this.$refs.Vcollapse) {
        this.$refs.Vcollapse.setHasData()
      }
    },
    activeClass (link) {
      return link === this.type ? 'active' : ''
    },
    getMaForm (typeForm) {
      let maForm = ''
      if (typeForm === 'BMTIMMACH') {
        return ''
      }
      maForm = typeForm
      return maForm
    }
  }
}
</script>
