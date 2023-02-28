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
        <ed-component v-if="this.$route.params.Id && $router.currentRoute.name === 'EDRECORD'" :EdId="this.$route.params.Id" @onChange="getDataDone"/>
        <opd-component v-if="this.$route.params.Id && $router.currentRoute.name === 'OPDRECORD'" :OpdId="this.$route.params.Id" @onChange="getDataDone"/>
        <TopbarInfo v-if="this.$route.params.Id && $router.currentRoute.name === 'IPDVIEWDETAIL'" :VisitId="this.$route.params.Id" @onChange="getDataDone"/>
        <EDCComponent v-if="this.$route.params.Id && $router.currentRoute.name === 'EOCRECORD'" :VisitId="this.$route.params.Id" @onChange="getDataDone"/>
        <transition name="page" mode="out-in" v-if="hasData">
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
import TopbarInfo from '@/components/IPD/TopbarInfo.vue'
import VLayout from '@/layouts/Default.vue'
import OpdComponent from '@/components/OPD/VIEW_OPD.vue'
import EdComponent from '@/components/ED/VIEW_ED.vue'
import EDCComponent from '@/components/EOC/InfoBar.vue'
// import NProgress from 'nprogress'
export default {
  /**
   * The name of the page.
   */
  name: 'Records-PAGE',
  data () {
    return {
      hasData: false
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VLayout, OpdComponent, EdComponent, TopbarInfo, EDCComponent
  },
  mounted () {
    this.hasData = !['EDRECORD', 'OPDRECORD', 'IPDVIEWDETAIL', 'EOCRECORD'].includes(this.$router.currentRoute.name)
  },
  methods: {
    getDataDone (data) {
      setTimeout(() => {
        this.hasData = true
      }, 300)
    }
  }
}
</script>
