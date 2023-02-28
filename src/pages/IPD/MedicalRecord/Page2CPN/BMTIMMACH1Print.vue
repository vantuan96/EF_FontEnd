<template>
  <div v-if="MASTERDATA">
    <VTich2 :t3="true" v-if="MASTERDATA['IPDMRPONOGT']" :noneDex="true" :showLabel="true" :listData="MASTERDATA['IPDMRPONOGT'].Items" :indexs="[4]" />
    <VTich2 :t3="true" v-if="MASTERDATA['IPDMRPONOGT']" :noneDex="true" :showLabel="true" :listData="MASTERDATA['IPDMRPONOGT'].Items" :indexs="[5]" />
    <div class="flex align-center">
      <VTich2 class="mrr5" :t3="true" v-if="MASTERDATA['IPDMRPONOGT']" :noneDex="true" :showLabel="true" :listData="MASTERDATA['IPDMRPONOGT'].Items" :indexs="[0]"/>
      <div v-if="getValueOfMASTERDATA('IPDMRPO160', 'IPDMRPO164')">
        {{getValueOfMASTERDATA('IPDMRPO160', 'IPDMRPO164')}}
      </div>
    </div>
    <div class="flex align-center">
      <VTich2 class="mrr5" :t3="true" v-if="MASTERDATA['IPDMRPONOGT']" :noneDex="true" :showLabel="true" :listData="MASTERDATA['IPDMRPONOGT'].Items" :indexs="[2]"/>
      <div v-if="getValueOfMASTERDATA('IPDMRPONOGT', 'IPDMRPONOGTANS')">
        {{getValueOfMASTERDATA('IPDMRPONOGT', 'IPDMRPONOGTANS')}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BMTIMMACH1Print',
  props: ['MASTERDATA'],
  mounted () {
    this.changeData()
  },
  methods: {
    changeData () {
      if (this.MASTERDATA['IPDMRPONOGT']) {
        this.MASTERDATA['IPDMRPONOGT'].Items[0].ViName = '3. Cơ quan y tế'
        this.MASTERDATA['IPDMRPONOGT'].Items[0].EnName = '3. Transfer from another hospitals'
        this.MASTERDATA['IPDMRPONOGT'].Items[2].ViName = '4. Khác'
        this.MASTERDATA['IPDMRPONOGT'].Items[2].EnName = '4. Other'
        this.MASTERDATA['IPDMRPONOGT'].Items[3].ViName = '4. Khác'
        this.MASTERDATA['IPDMRPONOGT'].Items[3].EnName = '4. Other'
        this.MASTERDATA['IPDMRPONOGT'].Items[4].ViName = '1. Nhà'
        this.MASTERDATA['IPDMRPONOGT'].Items[4].EnName = '1. Home'
        this.MASTERDATA['IPDMRPONOGT'].Items[5].ViName = '2. Đặt hẹn khám ngoại trú'
        this.MASTERDATA['IPDMRPONOGT'].Items[5].EnName = '2. Clinic/Appointment'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
