<template><span v-if="value"><span :class="statusClass(value.Status)">{{value.Result}}</span><span>{{value.Unit}}</span></span></template>
<script>
export default {
  name: 'Hlabel',
  props: ['value', 'noStatusLabel'],
  mixins: [],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    statusClass (status) {
      if (status === -1 || this.noStatusLabel) {
        return null
      }
      return ['lb-warning', 'lb-default', 'lb-danger', 'lb-info'][status]
    }
  }
}
</script>
