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
          <router-view :count="count"/>
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
import moment from 'moment'
import DiagnosticReporting from '@/services/DiagnosticReporting'
// import NProgress from 'nprogress'
export default {
  /**
   * The name of the page.
   */
  name: 'DiagnosticReporting',
  data () {
    return {
      count: 0
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VLayout
  },
  mounted () {
  },
  created () {
    // this.getData()
  },
  methods: {
    getData () {
      new DiagnosticReporting({
        hidemsg: true,
        notRedirect: true,
        Search: null,
        pageNumber: 1,
        pages: 1,
        Type: '2',
        StartAt: moment(moment().subtract(365, 'day').startOf('day')).format(process.env.DATETIME_FORMAT),
        EndAt: moment(moment().endOf('day')).format(process.env.DATETIME_FORMAT),
        PageSize: process.env.PAGE_SIZE
      }).ListPending().then(response => {
        this.count = response.count
      })
    }
  }
}
</script>
