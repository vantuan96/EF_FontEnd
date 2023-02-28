<template>
  <v-layout>
    <div>
      <div id="print-page-a4">
        <div style="page-break-after: always">Page 1</div>
        <div style="page-break-after: always">Page 2</div>
      </div>
      <button class="btn pull-right btn-back v-white-btn" type="button" @click="print">Quay lại</button>
    </div>
  </v-layout>
</template>
<script>
/* ============
 * Po Index Page
 * ============
 *
 * The home index page.
 */
import VLayout from '@/layouts/Default.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'printpage',
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
  mounted () {
  },
  methods: {
    print () {
      this.$htmlToPaper('print-page-a4')
    }
  }
}
</script>
