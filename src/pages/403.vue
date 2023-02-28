<template>
  <v-layout>
    <div class="error-page text-center">
      <h2 class="text-2" style="font-size: 160px; font-weight: bold;"> 403</h2>
      <div class="">
        <h3><i class="fa fa-warning text-yellow"></i> {{errmsg || __t('Bạn không có quyền truy cập vào trang này.')}}</h3>
        <p>
          Vui lòng liên hệ với IT cơ sở hoặc IT Helpdesk (<a href="mailto:it@vinmec.com">it@vinmec.com</a>) để được phân quyền
        </p>
        <p><button class="btn btn-back v-white-btn" type="button" @click="go2Home()">{{__t('Trang chủ')}}</button></p>
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
  name: 'page403',

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
  }
}
</script>
