<template>
  <div style="padding-top: 20px;">
    <div class="fw600 fs40 text-center color-blue mrb10">{{__label({ViName: 'Lịch sử khám tại Vinmec', EnName: 'Medical history at Vinmec'})}}<BaseIcon :url="'lichsukhamtaivinmec.png'" class="mrl10" :width="'60px'"/></div>
    <PatientRecords :tomtatthongtinnguoibenh="true"/>
  </div>
</template>

<script>
import PatientRecords from '@/pages/MedicalRecords/PatientRecords.vue'
export default {
  name: 'IPD-TomTatThongTinNguoiBenh',
  components: {
    PatientRecords
  }
}
</script>

<style lang="stylus" scoped>
</style>
