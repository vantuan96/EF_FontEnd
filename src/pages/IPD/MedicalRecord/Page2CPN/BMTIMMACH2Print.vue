<template>
  <div v-if="MASTERDATA">
    <b>2. Tiền sử bệnh<i>{{__t3('2. Tiền sử bệnh')}}</i>:</b>
    <div>+ Bản thân/ Personal history:</div>
    <template v-for="(e, index) in array1">
      <div :key="index" class="flex mrl5 on-top">
        <div v-if="MASTERDATA['IPDMRPT3000'] && MASTERDATA['IPDMRPT3000'].Items[e + 9].Value" class="mrr5">- </div>
        <div v-if="MASTERDATA['IPDMRPT3000'] && MASTERDATA['IPDMRPT3000'].Items[e + 9].Value">{{MASTERDATA['IPDMRPT3000'].Items[e].ViName + '/ ' + MASTERDATA['IPDMRPT3000'].Items[e].EnName}}: {{MASTERDATA['IPDMRPT3000'].Items[e + 9].Value}}</div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'BMTIMMACH2Print',
  props: ['MASTERDATA'],
  data () {
    return {
      array1: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>

</style>
