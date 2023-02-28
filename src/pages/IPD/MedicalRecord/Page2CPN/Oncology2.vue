<template>
<div v-if="MASTERDATA && DataSubmit">
  <div v-if="box1">
    <div class="ml-10">
      <label v-if="MASTERDATA['IPDMRPTTTYT']">{{__label(MASTERDATA['IPDMRPTTTYT'])}}</label>
      <div class="bg-gray-2 mrb10">
        <div class="mb-5">
          <span class="mr-10" v-if="MASTERDATA['IPDMRPTMACH']"><b>{{__label(MASTERDATA['IPDMRPTMACH'])}}:</b> {{MASTERDATA['IPDMRPTMACH'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTMACH'].Note)}}</span>
          <span class="mr-10" v-if="MASTERDATA['IPDMRPTNHDO']"><b>{{__label(MASTERDATA['IPDMRPTNHDO'])}}:</b> {{MASTERDATA['IPDMRPTNHDO'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTNHDO'].Note)}}</span>
          <span class="mr-10" v-if="MASTERDATA['IPDMRPTHUAP']"><b>{{__label(MASTERDATA['IPDMRPTHUAP'])}}:</b> {{MASTERDATA['IPDMRPTHUAP'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTHUAP'].Note)}}</span>
          <span class="mr-10" v-if="MASTERDATA['IPDMRPTNHTH']"><b>{{__label(MASTERDATA['IPDMRPTNHTH'])}}:</b> {{MASTERDATA['IPDMRPTNHTH'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTNHTH'].Note)}}</span>
          <span class="mr-10" v-if="MASTERDATA['IPDMRPTCICA']"><b>{{__label(MASTERDATA['IPDMRPTCICA'])}}:</b> {{MASTERDATA['IPDMRPTCICA'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTCICA'].Note)}}</span>
          <span class="mr-10" v-if="MASTERDATA['IPDMRPTCANA']"><b>{{__label(MASTERDATA['IPDMRPTCANA'])}}:</b> {{MASTERDATA['IPDMRPTCANA'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTCANA'].Note)}}</span>
          <span class="mr-10" v-if="MASTERDATA['IPDMRPTBBMI']"><b>{{__label(MASTERDATA['IPDMRPTBBMI'])}}:</b> {{MASTERDATA['IPDMRPTBBMI'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTBBMI'].Note)}}</span>
          <span class="mr-10"><b>BSA:</b> {{Bsa}} (m2)</span>
          <BtnCopy :hideCopy="true" :value="null" @copy="handleCopy3"/>
        </div>
        <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTTTYT']" v-model="MASTERDATA['IPDMRPTTTYT']" :hidelabel="true" :getFirstRow="true"/>
      </div>
      <label v-if="MASTERDATA['IPDMRPT1002']">{{__label(MASTERDATA['IPDMRPT1002'])}}</label>
      <MDText :readonly="readonly" v-if="MASTERDATA['IPDMRPT1002']" class="mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT1002'].Items[0].Value"/>
      <label v-if="MASTERDATA['IPDMRPT1004']">{{__label(MASTERDATA['IPDMRPT1004'])}}</label>
      <!-- upload ảnh -->
        <VUpload
          code="IPDMRPT1004"
          v-if="MASTERDATA['IPDMRPT1004']"
          planUpdate="Bác sĩ tải hình ảnh mô tả bộ phận tổn thương tại đây (cho phép tải 1 hoặc nhiều ảnh)"
          :readonly="readonly"
          :dataFile="MASTERDATA['IPDMRPT1004'].Items[0]"
          :dataImg="MASTERDATA['IPDMRPT1004'].Items[1]"
          :index="[1, 2]"
          :dataDropfile="dataDropfile"
          />
      <label v-if="MASTERDATA['IPDMRPT1006']">{{__label(MASTERDATA['IPDMRPT1006'])}}</label>
      <MDText :readonly="readonly" v-if="MASTERDATA['IPDMRPT1006']" class="mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT1006'].Items[0].Value"/>
      <label class="mt-10" v-if="MASTERDATA['IPDMRPTCACQ']">{{__label(MASTERDATA['IPDMRPTCACQ'])}}:</label>
      <div class="bg-gray-2" v-if="!readonly">
        <div :key="index" v-for="(code, index) in IPDMRPTCACQ">
          <template v-if="MASTERDATA[code]">
            <label v-if="code === 'IPDMRPT830'">{{__label(MASTERDATA[code])}}</label>
            <label v-else>{{__label(MASTERDATA[code])}}</label>
            <md-input-text :hidelabel="true" v-if="code === 'IPDMRPTTHKI'" :placeholder="__t('Nhập')" :defaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
            <md-input-text :hidelabel="true" v-else-if="code === 'IPDMRPTTIHO' || code === 'IPDMRPT830'" :placeholder="__t('Nhập')" v-model="MASTERDATA[code]"/>
            <md-input-text :hidelabel="true" v-else-if="code === 'IPDMRPT1000' || code === 'IPDMRPT1026'" :placeholder="__t('Nhập')" :groupDefaultLib="MASTERDATA['IPDMRPTTTNS'].Data" v-model="MASTERDATA[code]"/>
            <md-input-text :hidelabel="true" v-else :placeholder="__t('Nhập')" :groupDefaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
          </template>
        </div>
      </div>
      <div class="bg-gray-2" v-else>
        <div :key="index" v-for="(code, index) in IPDMRPTCACQ">
          <template v-if="MASTERDATA[code]">
            <label>{{__label(MASTERDATA[code])}}</label>
            <md-input-text :readonly="true" :hidelabel="true" :placeholder="__t('Nhập')" v-model="MASTERDATA[code]"/>
          </template>
        </div>
      </div>
      <label class="mt-10" v-if="MASTERDATA['IPDMRPTCXNC']">{{__label(MASTERDATA['IPDMRPTCXNC'])}}:</label>
      <div class="bg-gray-2">
        <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTCXNC']" v-model="MASTERDATA['IPDMRPTCXNC']"  :hidelabel="true"/>
      </div>
      <label class="mt-10" v-if="MASTERDATA['IPDMRPTTTBA']">{{__label(MASTERDATA['IPDMRPTTTBA'])}}:</label>
      <div class="bg-gray-2">
        <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTTTBA']" v-model="MASTERDATA['IPDMRPTTTBA']"  :hidelabel="true"/>
      </div>
      <hr/>
    </div>
  </div>
  <div v-if="box2" class="flex align-center">
    <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPT1009'])}}</div>
    <MDText :readonly="readonly" v-if="MASTERDATA['IPDMRPT1009']" style="width: 120px;" class="mrr30" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT1009'].Items[0].Value"/>
    <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPT1010'])}}</div>
    <MDText :readonly="readonly" v-if="MASTERDATA['IPDMRPT1010']" style="width: 120px;" class="mrr30" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT1010'].Items[0].Value"/>
    <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPT1011'])}}</div>
    <MDText :readonly="readonly" v-if="MASTERDATA['IPDMRPT1011']" style="width: 120px;" class="mrr30" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT1011'].Items[0].Value"/>
    <div class="mrr10 fw600" style="width: 125px;">{{__label(MASTERDATA['IPDMRPT1012'])}}</div>
    <MDText :readonly="readonly" v-if="MASTERDATA['IPDMRPT1012']" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT1012'].Items[0].Value"/>
  </div>
  <div v-if="box3">
    <MdRadiosInput2 :readonly="readonly" mrr="40" class="mrb10" v-if="MASTERDATA['IPDMRPT1018']" :value="MASTERDATA['IPDMRPT1018']"/>
    <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPT1018'] && MASTERDATA['IPDMRPT1021'] && (MASTERDATA['IPDMRPT1018'].Items[0].Value || MASTERDATA['IPDMRPT1018'].Items[1].Value)">
      <MdCheckBoxLabel3 :noneDex="4" :readonly="readonly" :data="MASTERDATA['IPDMRPT1021']" widthMiniBox="width: 155px;"/>
      <!-- <textarea-autosize style="width: 516px" v-if="MASTERDATA['IPDMRPT1021'] && MASTERDATA['IPDMRPT1021'].Items[3].Value" :readonly="readonly" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT1021'].Items[4].Value"/> -->
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Oncology2',
  props: ['box1', 'box2', 'box3', 'MASTERDATA', 'readonly', 'DataSubmit'],
  components: {
  },
  data () {
    return {
      Bsa: 'N/A',
      IPDMRPTCACQ: [
        'IPDMRPTTHKI',
        'IPDMRPTTUHO',
        'IPDMRPTHOHA',
        'IPDMRPTTIHO',
        'IPDMRPTCOXK',
        'IPDMRPT1026',
        'IPDMRPT1000',
        'IPDMRPT830'
      ],
      tab: 'tab1',
      dataDropfile: {}
    }
  },
  created () {
  },
  mounted () {
    console.log('submit', this.DataSubmit)
    this.dataDropfile = {
      ...this.dataDropfile,
      contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
      titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
      visittypeImg: this._VisitType,
      visitidImg: this._VisitId,
      formidImg: this.DataSubmit.Id || this.DataSubmit.data.Id
    }
    // this.tab = this.MASTERDATA['IPDMRPT1004'] && (JSON.stringify(this.MASTERDATA['IPDMRPT1004'].Items[1].Value) === '[]' || this.MASTERDATA['IPDMRPT1004'].Items[1].Value === '""' || this.MASTERDATA['IPDMRPT1004'].Items[1].Value === null) ? 'tab2' : 'tab1'
    this.changeData()
  },
  methods: {
    handleCopy3 () {
      let str = ''
      if (this.MASTERDATA['IPDMRPTMACH'] && this.MASTERDATA['IPDMRPTMACH'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTMACH']) + ': ' + this.MASTERDATA['IPDMRPTMACH'].Items[0].Value + ' ' + this.___t(this.MASTERDATA['IPDMRPTMACH'].Note)
      }
      if (this.MASTERDATA['IPDMRPTNHDO'] && this.MASTERDATA['IPDMRPTNHDO'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTNHDO']) + ': ' + this.MASTERDATA['IPDMRPTNHDO'].Items[0].Value + ' ' + this.___t(this.MASTERDATA['IPDMRPTNHDO'].Note)
      }
      if (this.MASTERDATA['IPDMRPTHUAP'] && this.MASTERDATA['IPDMRPTHUAP'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTHUAP']) + ': ' + this.MASTERDATA['IPDMRPTHUAP'].Items[0].Value + ' ' + this.___t(this.MASTERDATA['IPDMRPTHUAP'].Note)
      }
      if (this.MASTERDATA['IPDMRPTNHTH'] && this.MASTERDATA['IPDMRPTNHTH'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTNHTH']) + ': ' + this.MASTERDATA['IPDMRPTNHTH'].Items[0].Value + ' ' + this.___t(this.MASTERDATA['IPDMRPTNHTH'].Note)
      }
      if (this.MASTERDATA['IPDMRPTCICA'] && this.MASTERDATA['IPDMRPTCICA'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTCICA']) + ': ' + this.MASTERDATA['IPDMRPTCICA'].Items[0].Value + ' ' + this.___t(this.MASTERDATA['IPDMRPTCICA'].Note)
      }
      if (this.MASTERDATA['IPDMRPTCANA'] && this.MASTERDATA['IPDMRPTCANA'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTCANA']) + ': ' + this.MASTERDATA['IPDMRPTCANA'].Items[0].Value + ' ' + this.___t(this.MASTERDATA['IPDMRPTCANA'].Note)
      }
      if (this.MASTERDATA['IPDMRPTBBMI'] && this.MASTERDATA['IPDMRPTBBMI'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTBBMI']) + ': ' + this.MASTERDATA['IPDMRPTBBMI'].Items[0].Value + ' ' + this.___t(this.MASTERDATA['IPDMRPTBBMI'].Note)
      }
      if (this.Bsa) {
        if (str) {
          str += ', '
        }
        str += 'BSA' + ': ' + this.Bsa + ' ' + '(m2)'
      }
      if (this.MASTERDATA['IPDMRPTTTYT'] && !this.MASTERDATA['IPDMRPTTTYT'].Items[0].Value) {
        this.MASTERDATA['IPDMRPTTTYT'].Items[0].Value = str
      }
      // return str
    },
    changeData () {
      if (this.MASTERDATA['IPDMRPTTTYT']) {
        this.MASTERDATA['IPDMRPTTTYT'].ViName = '1. Toàn thân:'
        this.MASTERDATA['IPDMRPTTTYT'].EnName = '1. Toàn thân:'
      }
      if (this.MASTERDATA['IPDMRPTCACQ']) {
        this.MASTERDATA['IPDMRPTCACQ'].ViName = '3. Các cơ quan'
        this.MASTERDATA['IPDMRPTCACQ'].EnName = '3. Các cơ quan'
      }
      if (this.MASTERDATA['IPDMRPTCXNC']) {
        this.MASTERDATA['IPDMRPTCXNC'].ViName = '4. Các xét nghiệm cận lâm sàng cần làm'
        this.MASTERDATA['IPDMRPTCXNC'].EnName = '4. Các xét nghiệm cận lâm sàng cần làm'
      }
      if (this.MASTERDATA['IPDMRPTTTBA']) {
        this.MASTERDATA['IPDMRPTTTBA'].ViName = '5. Tóm tắt bệnh án'
        this.MASTERDATA['IPDMRPTTTBA'].EnName = '5. Tóm tắt bệnh án'
      }
      if (this.MASTERDATA['IPDMRPT1026']) {
        this.MASTERDATA['IPDMRPT1026'].ViName = '+ Tiết niệu'
        this.MASTERDATA['IPDMRPT1026'].EnName = '+ Tiết niệu'
      }
      if (this.MASTERDATA['IPDMRPT830']) {
        this.MASTERDATA['IPDMRPT830'].ViName = '+ Khác'
        this.MASTERDATA['IPDMRPT830'].EnName = '+ Khác'
      }
      if (this.MASTERDATA['IPDMRPTCICA'].Items[0].Value && this.MASTERDATA['IPDMRPTCANA'].Items[0].Value) {
        var weight = this.MASTERDATA['IPDMRPTCANA'].Items[0].Value
          ? parseFloat(this.MASTERDATA['IPDMRPTCANA'].Items[0].Value)
          : 0
        var height = this.MASTERDATA['IPDMRPTCICA'].Items[0].Value
          ? parseFloat(this.MASTERDATA['IPDMRPTCICA'].Items[0].Value)
          : 0
        const a = Math.sqrt(((weight * height) / 3600)).toFixed(2)
        this.Bsa = a.toString()
      }
    // }
    }
    // handleChange () {
    //   if (this.MASTERDATA['IPDMRPT1018'] && this.MASTERDATA['IPDMRPT1021'] && !this.MASTERDATA['IPDMRPT1018'].Items[0].Value && !this.MASTERDATA['IPDMRPT1018'].Items[1].Value) {
    //     this.MASTERDATA['IPDMRPT1021'].Items.forEach(e => {
    //       if (e.DataType === 'Radio') {
    //         e.Value = false
    //       } else if (e.DataType === 'Checkbox') {
    //         e.Value = false
    //       } else {
    //         e.Value = ''
    //       }
    //     })
    //   }
    // }
  }
}
</script>
