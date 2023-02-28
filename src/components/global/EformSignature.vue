<template>
  <div class="eform-signature">
    <p v-if="title && !vi"><b>{{__t(title)}}:</b></p>
    <p v-else><b>{{title}}</b></p>
    <div class="mrb3"><b>{{ad}}</b> <i style="color: green">{{__t('(Đã xác nhận)')}}</i></div>
    <div v-if="info"><b>{{info.Fullname}}</b></div>
    <div v-if="info">{{info.Title}} {{info.Title && info.Department ? '-' : ''}} {{info.Department}}</div>
  </div>
</template>
<script>
import Account from '@/services/Account'
export default {
  name: 'EformSignature',
  props: ['title', 'ad', 'vi'],
  mixins: [],
  data () {
    return {
      info: null
    }
  },
  mounted () {
    this.getData()
  },
  watch: {
    ad: function (ad) {
      this.ad = ad
      this.getData()
    }
  },
  methods: {
    getData () {
      new Account({noLoading: true, username: this.ad, hidemsg: true}).getInfo().then(res => {
        this.info = res
      })
    }
  }
}
</script>
<style scoped>
.mrb3 {
  margin-bottom: 3px;
}
</style>
