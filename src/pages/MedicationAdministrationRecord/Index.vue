<template>
  <div>
    <div class="container">
      <section class="content">
        <transition name="page" mode="out-in">
          <router-view />
        </transition>
      </section>
    </div>
  </div>
</template>
<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */

// import NProgress from 'nprogress'
export default {
  /**
   * The name of the page.
   */
  name: 'MedicationAdministrationRecord',
  data () {
    return {}
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {}
}
</script>
