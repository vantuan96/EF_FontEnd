<template>
  <div class="newform">
    <h3 v-if="TitleForm" class="text-center cap fw600" style="font-size:30px">{{__t(TitleForm)}}</h3>
    <div v-if="IsLocked" style="color: red;" class="italic">
      <h4><i class="fa fa-lock" aria-hidden="true"></i> {{__t('Bạn không được phép chỉnh sửa do hồ sơ đã bị khóa theo nguyên tắc 24h!')}}</h4>
    </div>
    <div v-else style="margin-top: 10px;">
      <h4 class="italic">{{message || __t('Chưa có thông tin')}}</h4>
      <button class="btn v-yellow-btn mt-10" @click="handleCreateForm()">{{__t('Tạo mới')}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewForm',
  props: {
    IsLocked: {
      type: Boolean,
      required: true
    },
    TitleForm: {
      type: String,
      required: true
    },
    message: {
      type: String
    }
  },
  methods: {
    handleCreateForm () {
      this.$emit('createForm')
    }
  }
}
</script>
