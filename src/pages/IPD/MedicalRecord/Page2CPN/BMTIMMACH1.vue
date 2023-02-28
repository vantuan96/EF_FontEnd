<template>
  <div v-if="MASTERDATA">
    <div v-if="box1">
      <div class="mrb10 flex align-center">
        <div class="fw600 mrr10">14. {{__t2('Nơi giới thiệu')}}:</div>
        <div class="flex align-center">
          <!-- 4,5 -->
          <MdRadiosInput4 :indexs="[4, 5]" :readonly="readonly" v-if="MASTERDATA['IPDMRPONOGT']" v-model="MASTERDATA['IPDMRPONOGT']"/>
          <MdRadiosInput4 :indexs="[0, 2]" :readonly="readonly" v-if="MASTERDATA['IPDMRPONOGT']" v-model="MASTERDATA['IPDMRPONOGT']"/>
        </div>
      </div>
      <MDText class="mrb20" :rows="'1'" :id="MASTERDATA['IPDMRPO160'].Items[3].Code" :placeholder="__t('Nhập')" :class="(MASTERDATA['IPDMRPONOGT'] && MASTERDATA['IPDMRPONOGT'].Items[0].Value) ? '' : 'none'" :readonly="readonly" v-model="MASTERDATA['IPDMRPO160'].Items[3].Value"/>
      <MDText class="mrb20" :rows="'1'" :id="MASTERDATA['IPDMRPONOGT'].Items[3].Code" :placeholder="__t('Nhập')" :class="(MASTERDATA['IPDMRPONOGT'] && MASTERDATA['IPDMRPONOGT'].Items[2].Value) ? '' : 'none'" :readonly="readonly" v-model="MASTERDATA['IPDMRPONOGT'].Items[3].Value"/>
      <div class="flex align-center mrb10">
        <div class="fw600 mrr10">{{__t2('Vào viện do bệnh này lần thứ')}}:</div>
        <MDText :rows="'1'" style="width: 400px;" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPOVVDB']" :readonly="readonly" v-model="MASTERDATA['IPDMRPOVVDB'].Items[0].Value"/>
      </div>
    </div>
    <div v-if="box2">
      <div v-if="MASTERDATA['IPDMRPETHPT']">
        <div class="flex align-center mrb10">
          <MdRadiosInput4 :readonly="true" class="block mrr10" :vcheckbox="true" :indexs="[0]" v-model="MASTERDATA['IPDMRPETHPT']"/>
          <MdRadiosInput4 :readonly="true" class="block mrr10" :vcheckbox="true" :indexs="[1]" v-model="MASTERDATA['IPDMRPETHPT']"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BMTIMMACH1',
  props: ['MASTERDATA', 'DataSubmit', 'readonly', 'box1', 'box2'],
  data () {
    return {
      groupCode: [
        'IPDMRPE1130',
        'IPDMRPE1133',
        'IPDMRPE1136',
        'IPDMRPE1139',
        'IPDMRPE1142'
      ]
    }
  },
  mounted () {
    this.changeData()
  },
  methods: {
    handleCheckMapMD () {
      if (this.MASTERDATA['IPDMRPO160'] && this.MASTERDATA['IPDMRPONOGT']) {
        if (!this.MASTERDATA['IPDMRPONOGT'].Items[0].Value) {
          this.MASTERDATA['IPDMRPO160'].Items[3].Value = ''
        }
        if (!this.MASTERDATA['IPDMRPONOGT'].Items[2].Value) {
          this.MASTERDATA['IPDMRPONOGT'].Items[3].Value = ''
        }
      }
      this.validateForm()
    },
    validateForm () {
      let errors = []
      if (this.MASTERDATA['IPDMRPO160'] && this.MASTERDATA['IPDMRPONOGT']) {
        if (this.MASTERDATA['IPDMRPONOGT'].Items[0].Value &&
        !this.MASTERDATA['IPDMRPO160'].Items[3].Value) {
          errors.push(this.MASTERDATA['IPDMRPO160'].Items[3])
        }
        if (this.MASTERDATA['IPDMRPONOGT'].Items[2].Value &&
        !this.MASTERDATA['IPDMRPONOGT'].Items[3].Value) {
          errors.push(this.MASTERDATA['IPDMRPONOGT'].Items[3])
        }
      }
      if (errors.length) {
        this.handlerResponse({Error: errors})
      }
    },
    changeData () {
      if (this.MASTERDATA['IPDMRPONOGT']) {
        this.MASTERDATA['IPDMRPONOGT'].Items[0].ViName = 'Cơ sở y tế'
        this.MASTERDATA['IPDMRPONOGT'].Items[0].EnName = 'Hospitals'
        this.MASTERDATA['IPDMRPONOGT'].Items[2].ViName = 'Khác'
        this.MASTERDATA['IPDMRPONOGT'].Items[2].EnName = 'Other'
        this.MASTERDATA['IPDMRPONOGT'].Items[3].ViName = 'Khác'
        this.MASTERDATA['IPDMRPONOGT'].Items[3].EnName = 'Other'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
