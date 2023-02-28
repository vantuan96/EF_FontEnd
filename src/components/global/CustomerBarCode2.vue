<template>
  <div class="customer-bar-code text-left" v-if="customer"  style="text-align: left;">
    <div style="padding-left: 7px;font-size: 13px;white-space: nowrap; font-weight: bold;">{{customer.FullName}}</div>
    <div style="padding-left: 7px;font-size: 13px;white-space: nowrap">{{$options.filters.formatDate2(customer.DateOfBirth) || '....................'}} - {{GENDER[customer.Gender] || '.......'}}</div>
    <VueBarcode v-if="customer.PID" v-bind:value="customer.PID" :height="40" :displayValue="true" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
    <div v-else class="font-12" style="padding-left: 7px;">PID:...................</div>
  </div>
</template>
<script>
import VueBarcode from 'vue-barcode'
import constants from '@/constants'
const GENDER = constants.GENDER
export default {
  name: 'CustomerBarCode2',
  props: ['customer'],
  components: {
    VueBarcode
  },
  data () {
    return {
      GENDER: GENDER
    }
  }
}
</script>
