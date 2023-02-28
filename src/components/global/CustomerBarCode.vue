<template>
  <div class="customer-bar-code text-left" v-if="customer"  style="text-align: left;">
    <div style="padding-left: 7px;font-size: 13px;white-space: nowrap; font-weight: bold;">{{customer.Fullname}}</div>
    <div style="padding-left: 7px;font-size: 13px;white-space: nowrap">{{customer.DateOfBirth ? getFTime2(customer.DateOfBirth) : '....................'}} - {{(customer.Gender !== null && customer.Gender !== '') ? GENDER[customer.Gender] + '/ ' + __t5(GENDER[customer.Gender]) : '.......'}}</div>
    <VueBarcode v-if="customer.PID" v-bind:value="customer.PID" :height="40" :displayValue="false" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
    <div v-else class="font-12" style="padding-left: 7px;">PID:...................</div>
  </div>
</template>
<script>
import VueBarcode from 'vue-barcode'
import constants from '@/constants'
const GENDER = constants.GENDER
export default {
  name: 'CustomerBarCode',
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
