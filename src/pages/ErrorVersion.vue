<template>
  <v-layout>
    <div class="error-page text-center">
      <div class="">
        <h3><i class="fa fa-warning text-yellow"></i> {{errmsg || __t('Bạn đang truy cập tại phiên bản cũ của ứng dụng.')}}</h3>
        <p>
          Vui lòng click <button class="btn btn-back v-white-btn" type="button" @click="reloadPage()">{{__t('Tại đây')}}</button> để tiếp tục.
        </p>
      </div>
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

import VLayout from '@/layouts/Minimal.vue'
// import NProgress from 'nprogress'
export default {
  /**
   * The name of the page.
   */
  name: 'ErrorVersion',

  /**
   * The components that the page can use.
   */
  components: {
    VLayout
  },
  data () {
    return {
      errmsg: null
      // Sites: []
    }
  },
  mounted () {
    // setTimeout(() => {
    //   NProgress.start()
    // }, 1000)
    this.errmsg = this.$route.query.errmsg
  },
  methods: {
    reloadPage () {
      window.location.href = '/#/'
      setTimeout(() => {
        location.reload()
      }, 2000)
    }
  }
}
</script>
