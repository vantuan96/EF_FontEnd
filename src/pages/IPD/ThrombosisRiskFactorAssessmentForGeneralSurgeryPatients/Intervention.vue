<template>
  <div class="intervention-view">
    <div :key="index" v-for="(item, index) in data" class="flex-box flex-center mb-5">
      <i class="fa fa-check fa-2 green-color mr-5" aria-hidden="true"></i>
      <p class="mb-0 mt-0 no-wrap">{{__label(item)}}</p>
      <div v-if="__label(item) === 'Nguy cơ chảy máu cao' || __label(item) === 'High bleeding risk'" class="flex-box flex-center ml-5">
        <i class="fa fa-arrow-right" aria-hidden="true"></i>
        <p class="mb-0 mt-0 ml-5">{{__t('Phẫu thuật tim mạch hoặc chấn thương nghiêm trọng')}}</p>
      </div>
      <div v-if="__label(item) === 'Nguy cơ chảy máu thấp' || __label(item) === 'Low bleeding risk'" class="flex-box flex-center ml-5">
        <i class="fa fa-arrow-right" aria-hidden="true"></i>
        <p class="mb-0 mt-0 ml-5">{{__t('Phẫu thuật vùng bụng- chậu, mạch, lồng ngực, tủy sống, thần kinh và phẫu thuật ngoại chung khác')}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Intervention',
  props: ['Intervention', 'view'],
  data () {
    return {
      data: null
    }
  },
  mounted () {
    this.data = JSON.parse(this.Intervention) || []
  },
  watch: {
    Intervention () {
      this.data = JSON.parse(this.Intervention) || []
    }
  }
}
</script>
<style lang="stylus" scoped>
p {
  font-style: italic;
  transform: translateY(1px)
}
</style>
