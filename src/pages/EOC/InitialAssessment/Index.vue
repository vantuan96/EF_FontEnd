<template>
  <div class="main-content" id="InitialAssessment-page">
    <h1 class="text-center">{{__t('Đánh giá ban đầu người bệnh')}}</h1>
    <div class="v-tab">
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('EOCInitialAssessmentShort')">
          <router-link :to="{name: 'EOCInitialAssessmentShort', params: { Id: this.$route.params.Id }}">
            {{__t('Đánh giá thông thường')}}
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('EOCInitialAssessmentLong')">
          <router-link :to="{name: 'EOCInitialAssessmentLong', params: { Id: this.$route.params.Id }}">
            {{__t('Đánh giá dài hạn')}}
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('EOCInitialAssessmentFallRiskScreening') || activeClass('EOCInitialAssessmentFallRiskScreeningItem')">
          <router-link :to="{name: 'EOCInitialAssessmentFallRiskScreening', params: { Id: this.$route.params.Id }}">
            {{__t('Sàng lọc ngã')}}
          </router-link>
        </li>
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
