<template>
  <v-layout>
    <section class="content-header">
      <div class="container">
        <ol class="breadcrumb">
          <li v-if="this.$route.meta.localKey" class="active">{{ $t(this.$route.meta.localKey) }}</li>
        </ol>
      </div>
    </section>
    <div class="container">
      <section class="content">
        <transition name="page" mode="out-in">
          <router-view/>
        </transition>
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
export default {
  /**
   * The name of the page.
   */
  name: 'DoctorPlaceDiagnosticsOrder',
  data () {
    return {
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VLayout
  },
  mounted () {
  }
}
</script>
