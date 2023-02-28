<template>
 <basepopup name="DeleteNote" width="400px" :isShowFooter="false" :clickToClose="true">
      <div slot="title" class="text-center">
        <h3 class="box-title">{{__t('Bạn muốn xóa bệnh nhân này không?')}}</h3>
      </div>
      <div class="body-content">
        <p>Hành động xóa hồ sơ bệnh án của bạn sẽ được lưu lại, dữ liệu đã nhập tại hồ sơ này sẽ bị mất.</p>
        <p><b>Chú ý: </b>Chỉ người tạo hồ sơ mới có quyền xóa, bạn cũng sẽ không thể xóa hồ sơ khi bác sĩ đã nhập thông tin.</p>
        <textarea-autosize class="form-control mrb10" :class="error ? 'error' : null" rows="2" placeholder="Vui lòng nhập lý xoá"  v-model="Note"/>
        <p class="msg-error" :class="!error ? 'none' : null">Vui lòng nhập lý do xoá</p>
      </div>
      <div slot="footer">
          <div class="row">
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-white-btn" @click="hamdleSubmit()">{{__t('Đồng ý')}}</button>
            </div>
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-yellow-btn" @click="handleClose()">{{__t('Hủy bỏ')}}</button>
            </div>
          </div>
      </div>
    </basepopup>
</template>

<script>
export default {
  name: 'PopupDelete',
  props: {
  },
  data () {
    return {
      Note: '',
      error: false
    }
  },
  computed: {
  },
  methods: {
    handleResetData () {
      this.Note = ''
      this.error = false
    },
    handleClose () {
      this.handleResetData()
      this.$modal.hide('DeleteNote')
    },
    validate () {
      if (!this.Note) {
        this.error = true
      } else {
        this.error = false
      }
    },
    hamdleSubmit () {
      this.validate()
      if (!this.error) {
        this.$emit('handleSubmit', this.Note)
        this.handleClose()
      } else {
        console.log('error')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.box-check-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  .mini-box-radio {
    width: 150px;
  }
}
.error {
  border: 1px solid red!important;
  margin-bottom: 2px!important;
}
.msg-error {
  color: red;
}
</style>
