<template>
  <div class="status-float-block">
    <div class="status-block" v-if="$slots.top">
      <div class="container">
        <div class="content-container">
          <slot name="top"></slot>
        </div>
      </div>
    </div>
    <div class="action-btn-block">
      <div class="container">
        <div class="content-container">
          <div class="row">
            <div class="col-md-2 col-sm-2">
              <div class="form-group">
                <slot v-if="$slots.backbtn" name="backbtn"></slot>
                <button v-else-if="songngu" class="btn pull-left btn-back v-white-btn" type="button" @click="handleBack"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Quay lại/ <i>Back</i></button>
                <button v-else class="btn pull-left btn-back v-white-btn" type="button" @click="handleBack"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> {{__t('btn.quay_lai')}}</button>
              </div>
            </div>
            <div v-if="price" class="col-md-7 col-sm-7 btn-action-save">
              <div class="row">
                <slot name="buttons"></slot>
              </div>
            </div>
            <div v-if="!price" class="col-md-9 col-sm-9 btn-action-save">
              <div class="row">
                <slot name="buttons"></slot>
              </div>
            </div>
            <div class="col-md-2 col-sm-2" v-if="price && !nullContent">
              <div @click="handlePrice" v-if="songngu" class="btn-block btn-in" title="Price"><i class="fa fa-print" aria-hidden="true"></i> In ngay/ <i>Print</i></div>
              <div @click="handlePrice" v-else class="btn-block btn-in" title="Price"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In ngay')}}</div>
            </div>
            <div class="col-md-1 col-sm-1 back-to-top" v-if="!nullContent">
              <button @click="scroll2Top()" class="btn v-yellow-btn btn-block" title="Go to top"><i class="fa fa-arrow-circle-up" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FloatBlock',
  props: {
    showForm: false,
    price: false,
    nullContent: false,
    openBack: false,
    songngu: false
  },
  methods: {
    handleBack () {
      if (this.showForm || this.openBack) {
        this.$emit('handleBack')
      } else {
        this.back()
      }
    },
    handlePrice () {
      this.$emit('handlePrice')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .none-btn-save {
    .btn-action-save {
      display: none;
    }
    .back-to-top {
      display: none;
    }
  }
</style>
