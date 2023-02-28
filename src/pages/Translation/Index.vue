<template>
  <v-layout>
    <section class="content-header">
      <div class="container">
        <ol class="breadcrumb">
          <li v-if="this.$store.state.account.Specialty"><router-link :to="{path: '/TKCM'}"><i class="fa fa-dashboard"></i> {{__label(this.$store.state.account.Specialty)}}</router-link></li>
          <li v-if="this.$route.meta.localKey" class="active">{{ $t(this.$route.meta.localKey) }}</li>
        </ol>
      </div>
    </section>
    <div class="container">
      <section class="content">
        <!-- <ed-component v-if="this.$route.params.Id " :EdId="this.$route.params.Id"/>
        <opd-component v-if="this.$route.params.Id" :OpdId="this.$route.params.Id"/> -->
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
// import OpdComponent from '@/components/OPD/VIEW_OPD.vue'
// import EdComponent from '@/components/ED/VIEW_ED.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'Translation-PAGE',

  /**
   * The components that the page can use.
   */
  components: {
    VLayout
    // OpdComponent,
    // EdComponent
  },
  mounted () {
  }
}
</script>
