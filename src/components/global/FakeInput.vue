<template>
  <p v-if="!dfl" class="fake-input disable" :class="nonemargin ? 'nonemargin' : ''">{{value || 'N/A'}}</p>
  <p v-else class="fake-input disable">{{getValue(value)}}</p>
</template>
<script>
export default {
  name: 'FakeInput',
  props: ['value', 'dfl', 'nonemargin'],
  methods: {
    getValue (value) {
      let number = ''
      if (value === 0) {
        number = value
      } else if (value === '' || value === null) {
        number = 'N/A'
      } else {
        number = value
      }
      return number
    }
  }
}
</script>
<style scoped>
  .nonemargin {
    margin: 0px!important;
  }
</style>
