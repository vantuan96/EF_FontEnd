<template>
  <div class="Eye3">
    <div v-if="box1">
      <label v-if="MASTERDATA['IPDMRPE1050']">{{__label(MASTERDATA['IPDMRPE1050'])}}</label>
      <div class="mrl10" id="MedicalRecordEye-part3-block3">
        <md-input-text :readonly="readonly" v-if="MASTERDATA['IPDMRPE1051']" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE1051']"/>
        <md-input-text :readonly="readonly" v-if="MASTERDATA['IPDMRPE1053']" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE1053']"/>
      </div>
      <label v-if="MASTERDATA['IPDMRPE1055']">{{__label(MASTERDATA['IPDMRPE1055'])}}</label>
      <div class="mrl10" id="MedicalRecordEye-part3-block4">
        <md-input-text :readonly="readonly" v-if="MASTERDATA['IPDMRPE1056']" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE1056']"/>
        <label class="block" v-if="MASTERDATA['IPDMRPE1058']">{{__label(MASTERDATA['IPDMRPE1058'])}}</label>
        <div style="width: 100%;">
          <TblWithMasterData
            :top="true"
            :headerStyle="[{width: '200px'}, {}, {width: '300px'}, {width: '100px'}]"
            :readonly="readonly"
            :FormCode="'IPDMATTBL1'"
            :VisitId="_VisitId"
            :VisitType="'IPD'"
            :FormID="DataSubmit.Id"
            :textBtnAdd="this.__t('Thêm mới')"
            :formatTime="vDateFormat"
            :checkUserEdit="true"
            :dontGetDate="true"
            :isNew="DataSubmit.IsNew"
          ref="TblWithMasterData"/>
        </div>
        <md-input-text :readonly="readonly" v-if="MASTERDATA['IPDMRPE1059']" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE1059']"/>
        <md-input-text :readonly="readonly" v-if="MASTERDATA['IPDMRPE1061']" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE1061']"/>
        <label id="MedicalRecord-part3-block10">{{__label(MASTERDATA['IPDMRPEHDTV'])}}</label>
        <md-input-text :readonly="readonly" v-if="MASTERDATA['IPDMRPEHDTV']" :hidelabel="true" :defaultLib="'LOIDAN061021'" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPEHDTV']"/>
      </div>
    </div>
    <div v-if="box2">
      <!-- Chuẩn đoán trước phẫu thuật -->
      <p v-if="MASTERDATA['IPDMRPE888']">{{__label(MASTERDATA['IPDMRPE888'])}}:</p>
      <icd10
        v-if="MASTERDATA['IPDMRPE888'] && !readonly"
        @icdChange="icdChange"
        :mdCode="'IPDMRPE888'"
        v-model="MASTERDATA['IPDMRPE888'].Items[0].Value"/>
      <icd10View v-if="MASTERDATA['IPDMRPE888'] && readonly" :mdCode="'IPDMRPE888'" v-model="MASTERDATA['IPDMRPE888'].Items[0].Value"/>
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
      <icd10View v-if="MASTERDATA['IPDMRPE891'] && readonly" :mdCode="'IPDMRPE891'" v-model="MASTERDATA['IPDMRPE891'].Items[0].Value"/>
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
      <MdRadiosInput2 @change="handleChange(6)" :readonly="readonly" mrr="10" class="mrb10" v-if="MASTERDATA['IPDMRPE898']" :value="MASTERDATA['IPDMRPE898']"/>
      <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE898'] && (MASTERDATA['IPDMRPE898'].Items[0].Value || MASTERDATA['IPDMRPE898'].Items[1].Value)">
        <MdCheckBoxLabel3 :hideWidthLabel="['min-width: 98px;', 'min-width: 80px;', 'min-width: 105px;', 'min-width: 50px;']" class="flex align-center" style="width: 600px" @change="handleChange(5)" :noneDex="4" v-if="MASTERDATA['IPDMRPE901']" :readonly="readonly" :data="MASTERDATA['IPDMRPE901']" widthMiniBox="width: auto!important;"/>
        <textarea-autosize class="full-width form-control" v-if="MASTERDATA['IPDMRPE901'] && MASTERDATA['IPDMRPE901'].Items[3].Value" :readonly="readonly" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE901'].Items[4].Value"/>
      </div>
    </div>
  </div>
</template>

<script>
import MixinMasterData from '@/mixins/masterdata.js'
import TblWithMasterData from '@/components/global/TblWithMasterData'
export default {
  name: 'Eye3',
  props: ['box1', 'box2', 'MASTERDATA', 'readonly', 'DataSubmit', 'VisitId', 'VisitIdDrop'],
  components: {
    TblWithMasterData
  },
  mixins: [MixinMasterData],
  data () {
    return {
    }
  },
  mounted () {
    this.getAsyncMasterDatas({Form: 'IPDMRPT'})
    this.changeData()
  },
  methods: {
    changeData () {
      if (this.MASTERDATA['IPDMRPEPPDT']) {
        this.MASTERDATA['IPDMRPEPPDT'].ViName = '5. Phương pháp điều trị'
        this.MASTERDATA['IPDMRPEPPDT'].EnName = '5. Treatment method'
      }
      if (this.MASTERDATA['IPDMRPETCDD']) {
        this.MASTERDATA['IPDMRPETCDD'].ViName = '6. Các thuốc chính đã dùng'
        this.MASTERDATA['IPDMRPETCDD'].EnName = '6. Used Medication List'
      }
      if (this.MASTERDATA['IPDMRPETTNB']) {
        this.MASTERDATA['IPDMRPETTNB'].ViName = '7. Tình trạng người bệnh ra viện'
        this.MASTERDATA['IPDMRPETTNB'].EnName = '7. Patient status at discharge'
      }
      if (this.MASTERDATA['IPDMRPEHDTV']) {
        this.MASTERDATA['IPDMRPEHDTV'].ViName = '+ Hướng điều trị tiếp theo'
        this.MASTERDATA['IPDMRPEHDTV'].EnName = '+ Next treatment plan'
      }
    },
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
    },
    handleChange (num) {
      if (num === 5 && this.MASTERDATA['IPDMRPE901'] && !this.MASTERDATA['IPDMRPE901'].Items[3].Value) {
        this.MASTERDATA['IPDMRPE901'].Items[4].Value = ''
      }
      if (num === 6 && this.MASTERDATA['IPDMRPE901'] && this.MASTERDATA['IPDMRPE898'] && !this.MASTERDATA['IPDMRPE898'].Items[0].Value && !this.MASTERDATA['IPDMRPE898'].Items[1].Value) {
        this.MASTERDATA['IPDMRPE901'].Items.forEach(e => {
          if (e.DataType === 'Radio') {
            e.Value = false
          } else if (e.DataType === 'Checkbox') {
            e.Value = false
          } else {
            e.Value = ''
          }
        })
      }
    }
  }
  // computed: {
  //   readonlyTbl: function () {
  //     return this.DataSubmit.IsNew || this.readonly
  //   }
  // }
}
</script>
