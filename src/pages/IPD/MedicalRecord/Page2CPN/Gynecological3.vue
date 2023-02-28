<template>
  <div v-if="MASTERDATA && DataSubmit">
    <div v-if="box1">
      <!-- Chuẩn đoán trước phẫu thuật -->
      <template v-if="routeType === '_A01_039_050919_V' || routeType === '_A01_040_050919_V'">
        <div class="flex-box" v-if="MASTERDATA['IPDMRPEQTBLPTTT'] && readonly">
          <CheckboxsValue class="mrr10" :data="MASTERDATA['IPDMRPEQTBLPTTT'].Items" :showall="true" />
        </div>
        <div class="flex-box" v-if="MASTERDATA['IPDMRPEQTBLPTTT'] && !readonly">
          <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['IPDMRPEQTBLPTTT'].Items">
            <div class="flex-box flex-center" v-if="item.DataType === 'Checkbox'">
              <div class="v-checkbox">
                <input type="checkbox" :id="'IPDMRPEQTBLPTTTcxo-' + index" v-model="item.Value">
                <label :for="'IPDMRPEQTBLPTTTcxo-' + index"></label>
              </div>
              <span class="displaytbl"><span>{{__label(item)}}</span></span>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
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
      </template>
      <TblWithMasterData
        :readonly="readonly"
        :FormCode="'IPDSANTHPT1'"
        :VisitId="_VisitId"
        :headerStyle="[{width: '170px'}, {}, {}, {}]"
        :VisitType="'IPD'"
        :FormID="DataSubmit.Id"
        ref="TblWithMasterData"/>
      <template>
        <MdRadiosInput2 :t2="true" @change="handleChange(6)" :readonly="readonly" mrr="40" class="mrb10" v-if="MASTERDATA['IPDMRPE898']" :value="MASTERDATA['IPDMRPE898']"/>
        <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE898'] && (MASTERDATA['IPDMRPE898'].Items[0].Value || MASTERDATA['IPDMRPE898'].Items[1].Value)">
          <MdCheckBoxLabel3 :t2="true" @change="handleChange(5)" :noneDex="4" v-if="MASTERDATA['IPDMRPE901']" :readonly="readonly" :data="MASTERDATA['IPDMRPE901']" widthMiniBox="width: 155px;"/>
          <textarea-autosize style="width: 516px" v-if="MASTERDATA['IPDMRPE901'] && MASTERDATA['IPDMRPE901'].Items[3].Value" :readonly="readonly" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPE901'].Items[4].Value"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import VSelect from '@/components/VSelect.vue'
import TblWithMasterData from '@/components/global/TblWithMasterData'
export default {
  name: 'Gynecological3',
  props: ['box1', 'MASTERDATA', 'readonly', 'DataSubmit', 'VisitId', 'VisitIdDrop', 'routeType'],
  components: {
    VSelect,
    TblWithMasterData
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
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
    }
  }
}
</script>
<style scoped>
</style>
