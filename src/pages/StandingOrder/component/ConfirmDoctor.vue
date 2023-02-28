<template>
  <div v-if="item">
    <span v-if="item.MedicalStaffName" class="text-center" style="display: inline-flex;">
      <div><i class="v-icon v-icon-doctor"></i></div>
      <div style="display: grid; margin-left: 5px;">
        <div class="italic fw400">{{getFTime(item.DoctorTime)}}</div>
        <b>{{__t('Bác sĩ xác nhận')}}</b>
        <template v-if="item.DoctorTime">
          <div><ad-Info class="fw600" v-if="item.DoctorConfirm" :ad="item.DoctorConfirm" /><span style="color: green" class="italic"> {{__t('(Đã ký xác nhận)')}}</span></div>
          <div><b>{{item.FullNameDoctorConfirm}}</b></div>
        </template>
        <template v-else>
          <div class="italic" style="color: green">{{__t('(Chưa ký xác nhận)')}}</div>
        </template>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDoctor',
  props: ['item', 'isLocked'],
  computed: {
  },
  methods: {
    showDoctorConfirm (str, item) {
      let obj = {
        'title': str,
        'item': item
      }
      this.$emit('showDoctorConfirm', obj)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
