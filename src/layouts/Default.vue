<template>
  <div>
    <va-content-wrap>
      <slot />
    </va-content-wrap>
  </div>
</template>
<script>
import VAContentWrap from '@/components/shared/ContentWrap.vue'
export default {
  name: 'DefaultLayout',
  beforeCreate () {
    // document.body.className = 'fixed skin-blue layout-top-nav fixed-footer'
  },
  data () {
    return {
    }
  },
  components: {
    'va-content-wrap': VAContentWrap
  },
  mounted () {
  }
}
</script>
