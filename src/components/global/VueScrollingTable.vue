<template>
  <div class="box-border">
    <div class="tableContainer" :id="elmId">
      <slot name="tbl"/>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import 'floatthead/dist/jquery.floatThead.js'
export default {
  name: 'VueScrollingTable',
  data () {
    return {
      elmId: ''
      // Sites: []
    }
  },
  props: {},
  computed: {
  },
  watch: {
  },
  mounted () {
    this.elmId = this.makeid()
    setTimeout(() => {
      $('#' + this.elmId + ' table').floatThead({
        scrollContainer: function ($table) {
          return $table.closest('.tableContainer')
        },
        zIndex: 10
      })
    }, 1000)
  },
  methods: {}
}
</script>
<style>
</style>
