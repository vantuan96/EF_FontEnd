<template>
  <button v-if="hideCopy" :class="{'btn btn-flat btn-xs': true}" @click="copy2">Copy</button>
  <button v-else :class="{'btn btn-flat btn-xs': true, 'disabled': copyed}" @click="copy">Copy</button>
</template>

<script>
export default {
  name: 'BtnCopy',
  props: ['index', 'value', 'hideCopy'],
  data () {
    return {
      copyed: false
    }
  },
  methods: {
    copy () {
      if (this.copyed) return false
      this.copyed = true
      this.$emit('copy', this.index)
    },
    copy2 () {
      this.$emit('copy', this.index)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
