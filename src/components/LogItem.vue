<template>
  <div v-for="(item, index) in Items" :key="index">
  </div>
</template>
<script>
export default {
  name: 'LogItem',
  props: ['Items'],
  mixins: [],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
