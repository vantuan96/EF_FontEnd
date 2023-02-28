<template>
  <p v-if="data && data.Code === 400">
    <label class="label label-warning">{{__labelMsg(data.Message)}}</label>
  </p>
</template>
<script>
export default {
  name: 'TranferMsg',
  props: ['data'],
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
