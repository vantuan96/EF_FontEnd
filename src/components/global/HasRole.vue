<template>
  <div v-if="hasRole">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'HasRole',
  props: ['rolecode'],
  mixins: [],
  data () {
    return {
    }
  },
  computed: {
    hasRole: function () {
      return true
    }
  },
  methods: {
  }
}
</script>
