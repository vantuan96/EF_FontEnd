<template>
  <div class="main-content" id="InitialAssessment-page">
    <h1 class="text-center">{{__t('Đánh giá ban đầu người bệnh')}}</h1>
    <div class="v-tab">
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('OPDInitialAssessmentShort')">
          <router-link :to="{name: 'OPDInitialAssessmentShort', params: { Id: this.$route.params.Id }}">
            {{__t('Ngoại trú thông thường')}}
          </router-link>
        </li>
        <!-- An theo setup Gay me -->
        <li v-if="!this.CurrentPatientObj.IsAnesthesia" role="presentation" :class="activeClass('OPDInitialAssessmentLong')">
          <router-link :to="{name: 'OPDInitialAssessmentLong', params: { Id: this.$route.params.Id }}">
            {{__t('Ngoại trú dài hạn')}}
          </router-link>
        </li>
        <li v-if="!this.CurrentPatientObj.IsAnesthesia" role="presentation" :class="activeClass('OPDInitialAssessmentFallRiskScreeningItem') || activeClass('OPDInitialAssessmentFallRiskScreening')">
          <router-link :to="{name: 'OPDInitialAssessmentFallRiskScreening', params: { Id: this.$route.params.Id }}">
            {{__t('Sàng lọc ngã')}}
          </router-link>
        </li>
        <li v-if="!this.CurrentPatientObj.IsAnesthesia" role="presentation" :class="activeClass('OPDInitialAssessmentTelehealth')">
          <router-link :to="{name: 'OPDInitialAssessmentTelehealth', params: { Id: this.$route.params.Id }}">
            Telehealth
          </router-link>
        </li>
        <li v-if="!this.CurrentPatientObj.IsAnesthesia" role="presentation" :class="activeClass('OPDAssessmentForRetailServicePatient')">
          <router-link :to="{name: 'OPDAssessmentForRetailServicePatient', params: { Id: this.$route.params.Id }}">
            {{__t('Đánh giá NB dịch vụ lẻ')}}
          </router-link>
        </li>
        <!-- <li v-if="!this.CurrentPatientObj.IsAnesthesia" role="presentation" :class="activeClass('OPDAssessmentForChemotherapyPatient')">
          <router-link :to="{name: 'OPDAssessmentForChemotherapyPatient', params: { Id: this.$route.params.Id }}">
            {{__t('NB điều trị hóa trị trong ngày')}}
          </router-link>
        </li> -->
      </ul>
      <div class="tab-content">
        <transition name="page" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
export default {
  /**
   * The name of the page.
   */
  name: 'InitialAssessment',
  data () {
    return {
      Id: this.$route.params.Id
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    activeClass (link) {
      return link === this.$route.name ? 'active' : ''
    }
  }
}
</script>
