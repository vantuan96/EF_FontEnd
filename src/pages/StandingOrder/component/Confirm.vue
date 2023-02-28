<template>
  <div v-if="item">
    <div class="flex align-center" v-if="!isLocked && item.Id && (item.ConfirmCreated && !item.ConfirmCreated.ConfirmAt)">
      <span v-if="item.MedicalStaffName" style="display: inline-flex;">
        <div><i :class="{
            'v-icon v-icon-doctor': item.Position.includes('Doctor'),
            'v-icon v-icon-nurse': item.Position.includes('Nurse'),
            'v-icon v-icon-medical-secretary': item.Position.includes('Medical Secretary'),
            'v-icon v-icon-administrator': item.Position.includes('Administrator')
            }" aria-hidden="true"></i></div>
          <div style="display: grid; margin-left: 5px;position: relative;">
            <b>{{__t('Người tạo và thực hiện')}}</b>
            <ad-Info :ad="item.MedicalStaffName" />
            <button style="position: absolute;right: -30px;bottom: 1px;" @click="showDoctorConfirm('Người tạo và thực hiện', item)" class="btn v-white-btn">
              {{ __t("Xác nhận") }}
            </button>
          </div>
      </span>
    </div>
    <span v-else-if="item.Id" style="display: inline-flex;">
      <div><i :class="{
          'v-icon v-icon-doctor': item.Position.includes('Doctor'),
          'v-icon v-icon-nurse': item.Position.includes('Nurse'),
          'v-icon v-icon-medical-secretary': item.Position.includes('Medical Secretary'),
          'v-icon v-icon-administrator': item.Position.includes('Administrator')
          }" aria-hidden="true"></i></div>
      <div style="display: grid; margin-left: 5px;">
        <div class="text-center">
          <div class="italic">{{getFTime(item.ConfirmCreated.ConfirmAt)}}</div>
          <b>{{__t('Người tạo và thực hiện')}}</b>
          <div class="flex align-center" v-if="item.ConfirmCreated && item.ConfirmCreated.ConfirmAt">
            <div class="fw600">{{item.ConfirmCreated.UserName}}</div>
            <div style="color: green" class="mrl5 italic">{{__t('(Đã ký xác nhận)')}}</div>
          </div>
          <div v-else>
            <div style="color: green" class="mrl5 italic">{{__t('(Chưa ký xác nhận)')}}</div>
          </div>
          <b>{{item.ConfirmCreated.FullName}}</b>
        </div>
      </div>
    </span>
    <span v-else-if="item.MedicalStaffName" style="display: inline-flex;">
      <div><i :class="{
          'v-icon v-icon-doctor': item.Position.includes('Doctor'),
          'v-icon v-icon-nurse': item.Position.includes('Nurse'),
          'v-icon v-icon-medical-secretary': item.Position.includes('Medical Secretary'),
          'v-icon v-icon-administrator': item.Position.includes('Administrator')
          }" aria-hidden="true"></i></div>
        <div style="display: grid; margin-left: 5px;">
          <b>{{__t('Người tạo và thực hiện')}}</b>
          <ad-Info :ad="item.MedicalStaffName" />
        </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
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
