<template>
  <div class="main-content" id="InitialAssessment-page">
    <h1 class="text-center">Biên bản bàn giao người bệnh chuyển khoa</h1>
    <div class="v-tab">
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('OPDInitialAssessmentShort')">
          <router-link :to="{name: 'OPDInitialAssessmentShort', params: { Id: this.$route.params.Id }}">
            Biên bản bàn giao
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('OPDInitialAssessmentLong')">
          <router-link :to="{name: 'OPDInitialAssessmentLong', params: { Id: this.$route.params.Id }}">
            Bảng kiểm bàn giao
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
  name: 'HandoverRecord',
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
