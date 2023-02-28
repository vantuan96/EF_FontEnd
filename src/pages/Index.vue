<template>
  <v-layout>
    <div class="container">
      <section class="content">
        <div class="main-content">
          <h1>Hệ thống bệnh án điện tử</h1>
        </div>
      </section>
    </div>
  </v-layout>
</template>
<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */

import VLayout from '@/layouts/Default.vue'
// import NProgress from 'nprogress'
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  /**
   * The name of the page.
   */
  name: 'Home',

  /**
   * The components that the page can use.
   */
  components: {
    VLayout
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      Sites: 'account/getSites',
      Site: 'account/getSite',
      Specialty: 'account/getSpecialty',
      Position: 'account/getPosition'
    })
  },
  watch: {
  },
  created () {
    // this.Site = this.$store.state.account.Site
    // this.Specialty = this.$store.state.account.Specialty
    if (this.$store.state.account && this.$store.state.account.Specialty && this.$store.state.account.Specialty.VisitTypeGroupCode) {
      this.go2Home()
    }
  },
  methods: {
  }
}
</script>
