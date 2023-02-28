<template>
  <div class="form-group1">
    <button class="btn btn-block v-white-btn" type="button" @click="remove()">{{__t('Xóa')}}</button>
    <popup-delete-ipd @handleSubmit="removeConfirmed"/>
  </div>
</template>
<script>
import PopupDeleteIpd from './popup/PopupDeleteIpd.vue'
import InitialAssessment from '@/services/IPD/InitialAssessment'
export default {
  name: 'DeleteBtnIPDInitialAssessment',
  components: {
    PopupDeleteIpd
  },
  methods: {
    remove () {
      this.$modal.show('DeleteNoteIPD')
      // this.$modal.show('dialog', {
      //   title: 'Bạn muốn xóa dữ liệu form này không?',
      //   text: '<p>Hành động xóa hồ sơ bệnh án của bạn sẽ được lưu lại, dữ liệu đã nhập tại hồ sơ này sẽ bị mất.</p> <b>Chú ý</b>: Chỉ người tạo hồ sơ mới có quyền xóa, bạn cũng sẽ không thể xóa hồ sơ khi bác sĩ đã nhập thông tin.',
      //   class: 'v-dialog v-dialog-warning',
      //   buttons: [
      //     {
      //       title: 'Đồng ý',
      //       class: 'btn',
      //       handler: () => {
      //         this.removeConfirmed()
      //         this.$modal.hide('dialog')
      //       }
      //     },
      //     {
      //       title: 'Hủy bỏ',
      //       class: 'btn bg-yellow',
      //       handler: () => {
      //         this.$modal.hide('dialog')
      //       }
      //     }
      //   ]
      // })
    },
    removeConfirmed (note) {
      const data = {
        Note: ''
      }
      if (note) {
        data.Note = note
      } else {
        data.Note = ''
      }
      new InitialAssessment().update('Delete/' + this.$route.params.Id, data).then(response => {
        this.$router.push({name: 'ListPatientInIPD'})
      }).catch(e => {
        // this._401ResponseError(e)
      })
    }
  }
}
</script>
