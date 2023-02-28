<template>
  <v-layout>
    <section class="content-header">
      <div class="container">
        <ol class="breadcrumb">
          <li v-if="this.$store.state.account.Specialty"><router-link :to="{path: '/ED'}"><i class="fa fa-dashboard"></i> {{__label(this.$store.state.account.Specialty)}}</router-link></li>
          <li v-if="this.$route.meta.localKey" class="active">{{ $t(this.$route.meta.localKey) }}</li>
        </ol>
      </div>
    </section>
    <div class="container">
      <section class="content">
        <ed-component v-if="this.$route.params.Id" :EdId="this.$route.params.Id" @onChange="getDataDone"/>
        <transition name="page" mode="out-in" v-if="hasData">
          <div v-if="!changeing"><router-view/></div>
          <div v-else class="text-center"><v-loading/></div>
        </transition>
        <div v-else class="text-center"><v-loading/></div>
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
import EdComponent from '@/components/ED/VIEW_ED.vue'
// import NProgress from 'nprogress'
export default {
  /**
   * The name of the page.
   */
  name: 'ED-PAGE',

  /**
   * The components that the page can use.
   */
  components: {
    VLayout, EdComponent
  },
  watch: {
    $route (to, from) {
      this.loging(to)
    }
  },
  data () {
    return {
      hasData: false,
      changeing: false
    }
  },
  created () {
    this.hasData = !this.$route.params.Id
  },
  methods: {
    loging (to) {
      if (to.name !== 'EDPatientAndFamilyEducationView' &&
      to.name !== 'EDPatientAndFamilyEducation' &&
      to.name !== 'IPDPatientAndFamilyEducationView' &&
      to.name !== 'IPDPatientAndFamilyEducation' &&
      to.name !== 'OPDPatientAndFamilyEducationView' &&
      to.name !== 'OPDPatientAndFamilyEducation' &&
      to.name !== 'EOCPatientAndFamilyEducationView' &&
      to.name !== 'EOCPatientAndFamilyEducation' &&
      to.name !== 'ArterialBloodGasTestList' &&
      to.name !== 'ArterialBloodGasTest' &&
      to.name !== 'ChemicalBiologyTestList' &&
      to.name !== 'ChemicalBiologyTest') {
        this.changeing = true
      }
      setTimeout(() => {
        this.changeing = false
      }, 333)
    },
    getDataDone (data) {
      setTimeout(() => {
        this.hasData = true
      }, 300)
    }
  }
}
</script>
