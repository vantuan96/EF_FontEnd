<template>
  <div>
    <h2 class="text-center">{{__t('MortalityReport.label1')}}</h2>
    <div class="v-tab">
      <ul id="AmbulanceRunReportTab" class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('EDMedicalRecordPart1')">
          <a @click="type = 'MortalityReportPage1View'">Kiểm thảo tử vong1</a>
        </li>
        <li role="presentation" :class="activeClass('EDMedicalRecordPart2')">
          <a @click="type = 'MortalityReportPage2View'">Trích biên bản</a>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <component v-if="type in $options.components" v-bind:is="type" :VisitId="VisitId" :VisitType="_VisitType" :viewOnly="true"/>
    </div>
  </div>
</template>
<script>
// import NProgress from 'nprogress'
// import $ from 'jquery'
import MortalityReportPage1View from './Part1.vue'
import MortalityReportPage2View from './Part2.vue'

export default {
  /**
   * The name of the page.
   */
  name: 'ViewMedica',
  props: ['VisitId', 'VisitType', 'Form'],
  mixins: [],
  data () {
    return {
      hasData: false,
      type: 'MortalityReportPage1View',
      visitType: 'ED'
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    MortalityReportPage1View,
    MortalityReportPage2View
    // Part2,
    // Part3
  },
  mounted () {
    console.log(this.$route)
    this.type = this.$route.name
  },
  computed: {
  },
  methods: {
    activeClass (link) {
      return link === this.type ? 'active' : ''
    }
  }
}
</script>
