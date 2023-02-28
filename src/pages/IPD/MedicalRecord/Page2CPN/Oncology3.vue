<template>
<div v-if="MASTERDATA && DataSubmit">
  <div v-if="box1">
    <label v-if="MASTERDATA['IPDMRPE1001']">{{__label(MASTERDATA['IPDMRPE1001'])}}:</label>
    <MdRadiosInput2 @change="handleChange(1)" v-if="MASTERDATA['IPDMRPE1001']" class="mrb10" :readonly="readonly" mrr="20" :value="MASTERDATA['IPDMRPE1001']"/>
    <div class="flex align-center mrb10">
      <div class="mrr20" style="width: 213px;">{{__label(MASTERDATA['IPDMRPE1004'])}}</div>
      <div style="width: 60px;" class="mrr10">tại u:</div>
      <textarea-autosize v-if="MASTERDATA['IPDMRPE1004']" style="width: 190px" :readonly="readonly" class="form-control mrr10" rows="1" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPE1004'].Items[0].Value"/>
      <div class="mrr40">Gy</div>
      <div style="width: 100px;" class="mrr10">Tại hạch: </div>
      <textarea-autosize v-if="MASTERDATA['IPDMRPE1006']" :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPE1006'].Items[0].Value"/>
    </div>
    <div class="flex align-center mrb10">
      <div class="mrr20" style="width: 213px;">{{__label(MASTERDATA['IPDMRPE1008'])}}</div>
      <div style="width: 60px;" class="mrr10">tại u:</div>
      <textarea-autosize v-if="MASTERDATA['IPDMRPE1008']" style="width: 190px" :readonly="readonly" class="form-control mrr10" rows="1" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPE1008'].Items[0].Value"/>
      <div class="mrr40">Gy</div>
      <div style="width: 100px;" class="mrr10">Tại hạch: </div>
      <textarea-autosize v-if="MASTERDATA['IPDMRPE1010']" :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPE1010'].Items[0].Value"/>
    </div>
    <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE1012']">
      <div style="width: 232px;">{{__label(MASTERDATA['IPDMRPE1012'])}}</div>
      <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPE1012'].Items[0].Value"/>
    </div>
    <div class="flex align-center mrb10">
      <div class="mrr10" style="width: 230px;">{{__label(MASTERDATA['IPDMRPE1014'])}}</div>
      <div style="width: 60px;" class="mrr10">tại u:</div>
      <textarea-autosize v-if="MASTERDATA['IPDMRPE1014']" style="width: 190px" :readonly="readonly" class="form-control mrr10" rows="1" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPE1014'].Items[0].Value"/>
      <div class="mrr40">Gy</div>
      <div style="width: 100px;" class="mrr10">Tại hạch: </div>
      <textarea-autosize v-if="MASTERDATA['IPDMRPE1016']" :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPE1016'].Items[0].Value"/>
    </div>
    <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE1018']">
      <div style="width: 232px;">{{__label(MASTERDATA['IPDMRPE1018'])}}</div>
      <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPE1018'].Items[0].Value"/>
    </div>
    <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE1020']">
      <div style="width: 232px;">{{__label(MASTERDATA['IPDMRPE1020'])}}</div>
      <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPE1020'].Items[0].Value"/>
    </div>
    <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE1022']">
      <div style="min-width: 187px;">{{__label(MASTERDATA['IPDMRPE1022'])}}</div>
      <MdRadiosInput2 @change="handleChange(2)" :readonly="readonly" mrr="20" :value="MASTERDATA['IPDMRPE1022']" :noneDex="3"/>
      <textarea-autosize v-if="MASTERDATA['IPDMRPE1022'].Items[0].Value || MASTERDATA['IPDMRPE1022'].Items[1].Value || MASTERDATA['IPDMRPE1022'].Items[2].Value" :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPE1022'].Items[3].Value"/>
    </div>
    <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE1027']">
      <div style="width: 232px;">{{__label(MASTERDATA['IPDMRPE1027'])}}</div>
      <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPE1027'].Items[0].Value"/>
    </div>
    <!-- Chuẩn đoán trước phẫu thuật -->
    <p v-if="MASTERDATA['IPDMRPE888']">{{__label(MASTERDATA['IPDMRPE888'])}}:</p>
    <icd10
      v-if="MASTERDATA['IPDMRPE888'] && !readonly"
      @icdChange="icdChange"
      :mdCode="'IPDMRPE888'"
      v-model="MASTERDATA['IPDMRPE888'].Items[0].Value"/>
    <icd10View v-if="MASTERDATA['IPDMRPE888'] && readonly" :mdCode="'IPDMRPE888'" :single="true" v-model="MASTERDATA['IPDMRPE888'].Items[0].Value"/>
    <textarea-autosize
      v-if="MASTERDATA['IPDMRPE888']"
      :readonly="readonly"
      class="form-control mrb10 mrt10"
      rows="3" :placeholder="__t('Nhập')"
      v-model="MASTERDATA['IPDMRPE888'].Items[1].Value"/>
    <!-- Chuẩn đoán sau phẫu thuật -->
    <p v-if="MASTERDATA['IPDMRPE891']">{{__label(MASTERDATA['IPDMRPE891'])}}:</p>
    <icd10
      v-if="MASTERDATA['IPDMRPE891'] && !readonly"
      @icdChange="icdChange"
      :mdCode="'IPDMRPE891'"
      v-model="MASTERDATA['IPDMRPE891'].Items[0].Value"/>
    <icd10View v-if="MASTERDATA['IPDMRPE891'] && readonly" :mdCode="'IPDMRPE891'" :single="true" v-model="MASTERDATA['IPDMRPE891'].Items[0].Value"/>
    <textarea-autosize
      v-if="MASTERDATA['IPDMRPE891']"
      :readonly="readonly"
      class="form-control mrb10 mrt10"
      rows="3" :placeholder="__t('Nhập')"
      v-model="MASTERDATA['IPDMRPE891'].Items[1].Value"/>
      <div class="flex align-center space-between mrb10">
        <div class="flex align-center">
          <div v-if="MASTERDATA['IPDMRPE894']" class="mrr10" style="width: 148px">{{__label(MASTERDATA['IPDMRPE894'])}}: </div>
          <textarea-autosize
            style="width: 300px; margin-right: 100px;"
            v-if="MASTERDATA['IPDMRPE894']"
            :readonly="readonly"
            class="form-control"
            rows="1" :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDMRPE894'].Items[0].Value"/>
        </div>
        <div class="flex align-center">
          <div v-if="MASTERDATA['IPDMRPE896']" class="mrr10" style="width: 232px">{{__label(MASTERDATA['IPDMRPE896'])}}: </div>
          <textarea-autosize
            style="width: 300px"
            v-if="MASTERDATA['IPDMRPE896']"
            :readonly="readonly"
            class="form-control"
            rows="1" :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDMRPE896'].Items[0].Value"/>
        </div>
      </div>
  </div>
  <div v-if="box2" class="flex align-center">
    <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPE1029'])}}</div>
    <MDText :readonly="readonly" v-if="MASTERDATA['IPDMRPE1029']" style="width: 120px;" class="mrr30" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE1029'].Items[0].Value"/>
    <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPE1031'])}}</div>
    <MDText :readonly="readonly" v-if="MASTERDATA['IPDMRPE1031']" style="width: 120px;" class="mrr30" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE1031'].Items[0].Value"/>
    <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPE1033'])}}</div>
    <MDText :readonly="readonly" v-if="MASTERDATA['IPDMRPE1033']" style="width: 120px;" class="mrr30" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE1033'].Items[0].Value"/>
    <div class="mrr10 fw600" style="width: 125px;">{{__label(MASTERDATA['IPDMRPE1035'])}}</div>
    <MDText :readonly="readonly" v-if="MASTERDATA['IPDMRPE1035']" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE1035'].Items[0].Value"/>
  </div>
</div>
</template>

<script>
export default {
  name: 'Oncology3',
  props: ['box1', 'box2', 'MASTERDATA', 'readonly', 'DataSubmit'],
  components: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    handleChange (num) {
      if (num === 1) {
        console.log('num: ', num)
      }
      if (num === 2) {
        if (this.MASTERDATA['IPDMRPE1022'] && !this.MASTERDATA['IPDMRPE1022'].Items[0].Value && !this.MASTERDATA['IPDMRPE1022'].Items[1].Value && !this.MASTERDATA['IPDMRPE1022'].Items[2].Value) {
          this.MASTERDATA['IPDMRPE1022'].Items[3].Value = ''
        }
      }
    },
    // icdChange (value, code) {
    //   var val = (value || []).map(e => e.ViName)
    //   switch (code) {
    //     // case 'IPDMRPE888':
    //     //   // IPDMRPECDBC
    //     //   if (!this.MASTERDATA['IPDMRPE888'].Items[0].Value) this.MASTERDATA['IPDMRPE888'].Items[0].Value = val.join(', ')
    //     //   break
    //     case 'IPDMRPE888':
    //       var currentValue = this.MASTERDATA['IPDMRPE888'].Items[0].Value || ''
    //       this.MASTERDATA['IPDMRPE888'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
    //       break
    //     default:
    //       break
    //   }
    // }
    icdChange (value, code) {
      var val = (value || []).map(e => e.ViName)
      console.log('code', code)
      if (code === 'IPDMRPE888') {
        var currentValue = this.MASTERDATA['IPDMRPE888'].Items[1].Value || ''
        this.MASTERDATA['IPDMRPE888'].Items[1].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
      }
      if (code === 'IPDMRPE891') {
        var currentValue1 = this.MASTERDATA['IPDMRPE891'].Items[1].Value || ''
        this.MASTERDATA['IPDMRPE891'].Items[1].Value = ([currentValue1].concat(val.filter(e => !currentValue1.includes(e)))).filter(e => e).join(', ')
      }
    }
  }
}
</script>
