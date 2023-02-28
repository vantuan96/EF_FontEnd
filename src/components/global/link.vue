<template>
  <router-link :to="to" :class="styleClass" :id="styleId">
    <slot></slot>
  </router-link>
</template>
<script>
export default {
  name: 'vlink',
  props: ['to', 'styleClass', 'styleId'],
  mixins: [],
  data () {
    return {
    }
  },
  computed: {
    displayOnlyLable: function () {
      return true
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
