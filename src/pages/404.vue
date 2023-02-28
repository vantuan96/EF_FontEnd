<template>
  <v-layout>
    <div class="error-page text-center">
      <h2 class="text-2" style="font-size: 160px; font-weight: bold;"> 404</h2>
      <div class="">
        <h3><i class="fa fa-warning text-yellow"></i> {{__t('Trang bạn truy cập không tồn tại.')}}</h3>
        <p>
          <button class="btn btn-back btn-warning" type="button" @click="back()">{{__t('btn.quay_lai')}}</button>
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

export default {
  /**
   * The name of the page.
   */
  name: 'TeamIndex',

  /**
   * The components that the page can use.
   */
  components: {
    VLayout
  },
  mounted () {}
}
</script>
