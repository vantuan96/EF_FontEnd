<template>
  <span class="labval">
    <template v-if="label">{{label}} <i class="unit-label" v-if="note2">({{note2}})</i>:</template>
    <i class="unit-label" v-if="note">({{note}})</i>
    <label v-if="value">{{value}}</label>
  </span>
</template>
<script>
export default {
  name: 'labelvalue',
  props: ['label', 'value', 'note', 'separator', 'note2'],
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
