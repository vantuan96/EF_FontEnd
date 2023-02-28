<template>
  <div class="eform-signature">
    <template v-if="bilingual">
      <p><b>{{listUserConfirm.ViName}}/ <i>{{listUserConfirm.EnName}}</i>:</b></p>
    </template>
    <template v-else>
      <p v-if="title && !vi"><b>{{__t(title)}}:</b></p>
      <p v-else><b>{{title}}</b></p>
    </template>
    <div class="mrb3" v-if="ad"><b>{{ad}}</b> <i style="color: green">{{__t('(Đã ký xác nhận)')}}</i></div>
    <div v-if="info"><b>{{info.Fullname}}</b></div>
    <div v-if="info">{{info.Title}} {{info.Title && info.Department ? '-' : ''}} {{info.Department}}</div>
  </div>
</template>
<script>
import Account from '@/services/Account'
export default {
  name: 'EformSignature2',
  props: ['title', 'ad', 'vi', 'bilingual', 'listUserConfirm'],
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
