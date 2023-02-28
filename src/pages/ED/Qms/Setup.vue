<template>
  <div class="main-content" id="Home-page">
    <h1 class="title-page">{{ __t('Hoạt động chuyên môn') }}</h1>
    <br/>
    <div class="v-tab">
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('EDQMSPatientManagement')">
          <router-link :to="{name: 'EDQMSPatientManagement'}">
            {{__t('Hoạt động chuyên môn')}}
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('EDHumanResourceAssessment')">
          <router-link :to="{name: 'EDHumanResourceAssessment'}">
            {{__t('Phân công nhân lực')}}
          </router-link>
        </li>
      </ul>
      <div class="tab-content">
        <router-view/>
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
  name: 'ED-QMS-SETUP',
  data () {
    return {
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
  },
  created () {
  },
  beforeDestroy () {
  }
}
</script>
