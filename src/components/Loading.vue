<template>
  <div id="loading" v-if="false">
    <div class="lds-dual-ring"></div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  mixins: [],
  data () {
    return {
      hasLoading: true
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
