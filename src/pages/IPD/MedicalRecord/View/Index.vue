<template>
  <div>
    <h1 class="text-center form-title" v-if="!VisitIdDrop">{{getBigLabel()}}</h1>
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
        <li role="presentation" :class="activeClass('Print')" v-if="!VisitIdDrop">
          <a @click="type = 'Print'">{{__t('Bản in')}}</a>
        </li>
        <li role="presentation" v-if="(this.Version == 2 && (routeType === 'MedicalRecord' || routeType === '')) || routeType === 'CardiovascularForm'" :class="activeClass('PreProcedureRiskAssessmentForCardiacCatheterization')">
          <a @click="type = 'PreProcedureRiskAssessmentForCardiacCatheterization'">{{__t('Đánh giá nguy cơ người bệnh')}}</a>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <component v-if="type in $options.components" v-bind:is="type" :VisitId="VisitId" :VisitType="_VisitType" :viewOnly="true" :routeType="routeType" :VisitIdDrop="VisitIdDrop"/>
    </div>
  </div>
</template>
<script>
// import NProgress from 'nprogress'
// import $ from 'jquery'
import Part1 from './Part1.vue'
import Part2 from './Part2.vue'
import Part3 from './Part3.vue'
import Print from '../Print/Index.vue'
import PreProcedureRiskAssessmentForCardiacCatheterization from './PreProcedureRiskAssessmentForCardiacCatheterization.vue'

export default {
  /**
   * The name of the page.
   */
  name: 'ViewMedica',
  props: ['VisitId', 'VisitType', 'Form', 'routeType', 'VisitIdDrop', 'Version'],
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
    Print,
    PreProcedureRiskAssessmentForCardiacCatheterization
    // Part2,
    // Part3
  },
  mounted () {
    console.log('test:' + this.routeType)
    console.log('test:' + this.Version)
  },
  computed: {
  },
  methods: {
    activeClass (link) {
      return link === this.type ? 'active' : ''
    },
    getBigLabel () {
      return this.__t2('BỆNH ÁN ' + this.MedicalRecordFormName)
    }
  }
}
</script>
