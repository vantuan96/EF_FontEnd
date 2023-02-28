<template>
  <div>
    <basepopup name="doctorConfirm" width="600px" :isShowFooter="false" :clickToClose="true">
      <div slot="title" class="text-center">
        <h3 class="box-title">{{__t(popupTitle)}}.</h3>
        <div style="color: #fff">{{__t('Vui lòng nhập tài khoản ad để xác nhận')}}</div>
      </div>
      <div class="body-content">
        <div class="form-group has-feedback">
          <input v-model="data.username" type="text" class="form-control" :placeholder="__t('Tên đăng nhập')"/>
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input v-model="data.password" type="password" class="form-control current-password" :placeholder="__t('Mật khẩu')"/>
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
      </div>
      <div slot="footer">
          <div class="row">
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-white-btn" @click="handleClose()">{{__t('Thoát')}}</button>
            </div>
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-yellow-btn" @click="hamdleSubmit()">{{__t('Xác nhận')}}</button>
            </div>
          </div>
          <p style="margin-top: 10px; text-align:center">{{__t('Sử dụng tài khoản máy tính')}}</p>
          <p style="margin-top: 10px; text-align:center">{{__t('Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu')}}</p>
      </div>
    </basepopup>
  </div>
</template>

<script>
export default {
  name: 'PopupDoctorConfirm',
  props: {
    popupTitle: ''
  },
  data () {
    return {
      data: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleResetData () {
      this.data = {
        username: '',
        password: ''
      }
    },
    handleClose () {
      this.handleResetData()
      this.$modal.hide('doctorConfirm')
    },
    hamdleSubmit () {
      this.$emit('popupSave', this.data)
      this.handleClose()
    }
  }
}
</script>

<style scoped>

</style>
