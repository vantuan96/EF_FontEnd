<template>
  <div v-if="MASTERDATA">
    <div v-if="box1">
      <label class="mrb10">+ {{__label(MASTERDATA['IPDMRPE1101'])}}:</label>
      <MDText class="mrb10" :rows="'3'" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPE1101']" :readonly="readonly" v-model="MASTERDATA['IPDMRPE1101'].Items[0].Value"/>
      <label class="mrb10">+ {{__label(MASTERDATA['IPDMRPE1103'])}}:</label>
      <MDText class="mrb10" :rows="'3'" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPE1103']" :readonly="readonly" v-model="MASTERDATA['IPDMRPE1103'].Items[0].Value"/>
      <div class="flex align-center mrb10">
        <label class="mrr10">+ {{__label(MASTERDATA['IPDMRPE1105'])}}:</label>
        <MdRadiosInput4 :indexs="[0, 1]" :readonly="readonly" v-if="MASTERDATA['IPDMRPE1105']" v-model="MASTERDATA['IPDMRPE1105']"/>
      </div>
      <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE1105'] && MASTERDATA['IPDMRPE1105'].Items[0].Value">
        <MdRadiosInput4 class="mrr5" :indexs="[2, 3]" :readonly="readonly" v-if="MASTERDATA['IPDMRPE1105']" v-model="MASTERDATA['IPDMRPE1105']"/>
        <MDText :rows="'1'" :id="MASTERDATA['IPDMRPE1105'].Items[4].Code" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPE1105'].Items[3].Value" :readonly="readonly" v-model="MASTERDATA['IPDMRPE1105'].Items[4].Value"/>
      </div>
    </div>
    <div v-if="box2">
      <!-- Tai biến / biến chứng -->
      <div class="flex align-center" v-if="MASTERDATA['IPDMRPETHPT']">
        <MdRadiosInput4 :readonly="readonly" class="block mrr10" :vcheckbox="true" :indexs="[0]" v-model="MASTERDATA['IPDMRPETHPT']"/>
        <MDText :placeholder="__t('Nhập')" :readonly="readonly" v-if="MASTERDATA['IPDMRPETHPT'] && MASTERDATA['IPDMRPETHPT'].Items[0].Value" :rows="'3'" v-model="MASTERDATA['IPDMRPETHPT'].Items[3].Value"/>
      </div>
      <MdRadiosInput4 :readonly="readonly" class="block mrr10" :vcheckbox="true" :indexs="[1]" v-model="MASTERDATA['IPDMRPETHPT']"/>
        <table class="table observation-table" v-if="MASTERDATA['IPDMRPE1112'] && MASTERDATA['IPDMRPETHPT'] && MASTERDATA['IPDMRPETHPT'].Items[1].Value">
          <thead>
            <tr>
              <th>{{__t('Biến chứng trong quá trình nằm viện')}}</th>
              <th width="50px" class="text-center">{{__t('Có')}}</th>
              <th width="50px" class="text-center">{{__t('Không')}}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in groupCode">
              <tr :key="index">
                <td>{{__label(MASTERDATA[item])}}</td>
                <td>
                  <MdRadiosInput4 :hidelabel="true" :vcheckbox="true" :indexs="[0]" :readonly="readonly" v-if="MASTERDATA[item]" v-model="MASTERDATA[item]"/>
                </td>
                <td>
                  <MdRadiosInput4 :hidelabel="true" :vcheckbox="true" :indexs="[1]" :readonly="readonly" v-if="MASTERDATA[item]" v-model="MASTERDATA[item]"/>
                </td>
              </tr>
            </template>
            <tr>
              <td colspan="3">
                <div class="flex align-center">
                  <div class="mrr5 white-space">
                    {{__t('Khác')}}
                  </div>
                  <div style="width: 100%!important;">
                    <MDText :placeholder="__t('Nhập')" :readonly="readonly" :rows="'1'" v-model="MASTERDATA['IPDMRPE1112'].Items[5].Value"/>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
    <div v-if="box3">
      <div class="fw600 mrb10">6. {{__label(MASTERDATA['IPDMRPE1119'])}}</div>
      <MdRadiosInput4 class="mrr5 mrb10" :indexs="[0, 1]" :readonly="readonly" v-if="MASTERDATA['IPDMRPE1119']" v-model="MASTERDATA['IPDMRPE1119']"/>
      <table class="table observation-table" v-if="MASTERDATA['IPDMRPE1119'] && MASTERDATA['IPDMRPE1119'].Items[0].Value">
        <thead>
          <tr>
            <th>{{__t('Đánh giá')}}</th>
            <th width="50px" class="text-center">{{__t('Có')}}</th>
            <th width="50px" class="text-center">{{__t('Không')}}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in groupCode2">
            <tr :key="index">
              <td>{{__label(MASTERDATA[item])}}</td>
              <td>
                <MdRadiosInput4 :hidelabel="true" :vcheckbox="true" :indexs="[0]" :readonly="readonly" v-if="MASTERDATA[item]" v-model="MASTERDATA[item]"/>
              </td>
              <td>
                <MdRadiosInput4 :hidelabel="true" :vcheckbox="true" :indexs="[1]" :readonly="readonly" v-if="MASTERDATA[item]" v-model="MASTERDATA[item]"/>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BMTIMMACH3',
  props: ['MASTERDATA', 'DataSubmit', 'readonly', 'box1', 'box2', 'box3'],
  data () {
    return {
      groupCode: [
        'IPDMRPE1130',
        'IPDMRPE1133',
        'IPDMRPE1136',
        'IPDMRPE1139',
        'IPDMRPE1142'
      ],
      groupCode2: [
        'IPDMRPE1154',
        'IPDMRPE1157',
        'IPDMRPE1160',
        'IPDMRPE1163',
        'IPDMRPE1166'
      ]
    }
  },
  mounted () {
    setTimeout(() => {
      this.changeLabel()
    }, 500)
  },
  methods: {
    changeLabel () {
      if (this.MASTERDATA['IPDMRPEHDTV']) {
        this.MASTERDATA['IPDMRPEHDTV'].ViName = '7. Hướng điều trị và các chế độ tiếp theo'
        this.MASTERDATA['IPDMRPEHDTV'].EnName = '7. Indication and follow-up plan'
      }
    },
    handleCheckMapMD () {
      if (this.MASTERDATA['IPDMRPE1105']) {
        if (!this.MASTERDATA['IPDMRPE1105'].Items[0].Value) {
          this.MASTERDATA['IPDMRPE1105'].Items[2].Value = false
          this.MASTERDATA['IPDMRPE1105'].Items[3].Value = false
        }
        if (!this.MASTERDATA['IPDMRPE1105'].Items[3].Value) {
          this.MASTERDATA['IPDMRPE1105'].Items[4].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPETHPT'] && !this.MASTERDATA['IPDMRPETHPT'].Items[1].Value) {
        this.groupCode.forEach(code => {
          if (this.MASTERDATA[code]) {
            this.MASTERDATA[code].Items[0].Value = false
            this.MASTERDATA[code].Items[1].Value = false
          }
        })
        if (this.MASTERDATA['IPDMRPE1112']) {
          this.MASTERDATA['IPDMRPE1112'].Items[5].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPE1119'] && !this.MASTERDATA['IPDMRPE1119'].Items[0].Value) {
        this.groupCode2.forEach(code => {
          if (this.MASTERDATA[code]) {
            this.MASTERDATA[code].Items[0].Value = false
            this.MASTERDATA[code].Items[1].Value = false
          }
        })
      }
    }
    // validateForm () {
    //   let errors = []
    //   if (this.MASTERDATA['IPDMRPE1105'].Items[3].Value &&
    //   !this.MASTERDATA['IPDMRPE1105'].Items[4].Value) {
    //     errors.push(this.MASTERDATA['IPDMRPE1105'].Items[4])
    //   }
    //   if (errors.length) {
    //     this.handlerResponse({Error: errors})
    //   }
    // }
  }
}
</script>

<style lang="stylus" scoped>

</style>
