<template>
  <div v-if="MASTERDATA && formId && DataSubmit" class="pdt10">
    <div class="flex align-center mrb10">
      <VDateTimeInput
        :format="vDateTimeFormat"
        :readonly="readonly"
        class="mrr10"
        v-if="MASTERDATA[getCode('IPDMRPE803')]"
        :label="MASTERDATA[getCode('IPDMRPE803')]"
        v-model="MASTERDATA[getCode('IPDMRPE803')].Items[0].Value"/>
      <VDateTimeInput
        :readonly="true"
        class="mrr10"
        :format="vDateTimeFormat"
        v-if="MASTERDATA[getCode('IPDMRPE807')] && MASTERDATA[getCode('IPDMRPE803')]"
        :label="MASTERDATA[getCode('IPDMRPE807')]"
        v-model="MASTERDATA[getCode('IPDMRPE803')].Items[0].Value"/>
      <div style="min-width: 468px;" v-if="Datas">
        <span class="mrr40">{{__t('Cân nặng (gr)')}}: {{Datas.CanNang || 'N/A'}}</span>
        <span class="mrr40">{{__t('Cao (cm)')}}: {{Datas.ChieuCao || 'N/A'}}</span>
        <span class="mrr40">{{__t('Vòng đầu (cm)')}}: {{Datas.VongDau || 'N/A'}}</span>
      </div>
    </div>
    <div class="flex align-center mrb10">
      <div class="mrr20">
        <div class="mrb10">{{__t('Apgar')}}:</div>
        <DropApgar />
      </div>
      <div>
        <div class="flex align-center mrb10" v-if="MASTERDATA[getCode('IPDMRPE907')]">
          <div style="min-width:70px;" class="mrr10">{{__label(MASTERDATA[getCode('IPDMRPE907')])}}</div>
          <div class="mrr10">
            <v-select :readonly="readonly" :unsetWidth="true" class='select-full-w' v-model="MASTERDATA[getCode('IPDMRPE907')].Items[0].Value" :placeholder="__t('Chọn')" :items="optionApgar"/>
          </div>
          <div class="mrr10">{{__t('điểm-mdc')}}</div>
          <div v-if="MASTERDATA[getCode('IPDMRPE907')] && MASTERDATA[getCode('IPDMRPE907')].Items[0].Value !== null && MASTERDATA[getCode('IPDMRPE907')].Items[0].Value !== ''" class="box-color flex align-center" :class="getColor(MASTERDATA[getCode('IPDMRPE907')].Items[0].Value) ? getColor(MASTERDATA[getCode('IPDMRPE907')].Items[0].Value) : null">
            <div>{{__t(getText(MASTERDATA[getCode('IPDMRPE907')].Items[0].Value))}}</div>
          </div>
        </div>
        <div class="flex align-center mrb10" v-if="MASTERDATA[getCode('IPDMRPE909')]">
          <div style="min-width:70px;" class="mrr10">{{__label(MASTERDATA[getCode('IPDMRPE909')])}}</div>
          <div class="mrr10">
            <v-select :readonly="readonly" :unsetWidth="true" class='select-full-w' v-model="MASTERDATA[getCode('IPDMRPE909')].Items[0].Value" :placeholder="__t('Chọn')" :items="optionApgar"/>
          </div>
          <div class="mrr10">{{__t('điểm-mdc')}}</div>
          <div v-if="MASTERDATA[getCode('IPDMRPE909')] && MASTERDATA[getCode('IPDMRPE909')].Items[0].Value !== null && MASTERDATA[getCode('IPDMRPE909')].Items[0].Value !== ''" class="box-color flex align-center" :class="getColor(MASTERDATA[getCode('IPDMRPE909')].Items[0].Value) ? getColor(MASTERDATA[getCode('IPDMRPE909')].Items[0].Value) : null">
            <div>{{__t(getText(MASTERDATA[getCode('IPDMRPE909')].Items[0].Value))}}</div>
          </div>
        </div>
        <div class="flex align-center mrb10" v-if="MASTERDATA[getCode('IPDMRPE911')]">
          <div style="min-width:70px;" class="mrr10">{{__label(MASTERDATA[getCode('IPDMRPE911')])}}</div>
          <div class="mrr10">
            <v-select :readonly="readonly" :unsetWidth="true" class='select-full-w' v-model="MASTERDATA[getCode('IPDMRPE911')].Items[0].Value" :placeholder="__t('Chọn')" :items="optionApgar"/>
          </div>
          <div class="mrr10">{{__t('điểm-mdc')}}</div>
          <div v-if="MASTERDATA[getCode('IPDMRPE911')] && MASTERDATA[getCode('IPDMRPE911')].Items[0].Value !== null && MASTERDATA[getCode('IPDMRPE911')].Items[0].Value !== ''" class="box-color flex align-center" :class="getColor(MASTERDATA[getCode('IPDMRPE911')].Items[0].Value) ? getColor(MASTERDATA[getCode('IPDMRPE911')].Items[0].Value) : null">
            <div>{{__t(getText(MASTERDATA[getCode('IPDMRPE911')].Items[0].Value))}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex align-center mrb10">
      <div class="flex align-center">
        <div class="mrr30">{{__label(MASTERDATA[getCode('IPDMRPE809')])}}:</div>
        <MdRadiosInput2
          :readonly="readonly"
          v-if="MASTERDATA[getCode('IPDMRPE809')]"
          width="130" mrr="10"
          :value="MASTERDATA[getCode('IPDMRPE809')]"/>
      </div>
    </div>
    <div class="flex align-center mrb10" v-if="MASTERDATA[getCode('IPDMRPE812')]">
      <div class="mrr30" style="color: white;">{{__label(MASTERDATA[getCode('IPDMRPE809')])}}:</div>
      <div class="group-radio" :id="'IPDMRPE812'" v-if="!readonly">
        <span :data="MASTERDATA[getCode('IPDMRPE812')].Items[0]" class="mrr10">
          <input @change="handleChange(0)" type="checkbox" :id="'radio-' + MASTERDATA[getCode('IPDMRPE812')].Items[0].Code" v-model="MASTERDATA[getCode('IPDMRPE812')].Items[0].Value">
          <label style="width: 127px; padding: 7px 12px;" :for="'radio-' + MASTERDATA[getCode('IPDMRPE812')].Items[0].Code" @click="checkbox2Radio(MASTERDATA[getCode('IPDMRPE812')].Items, MASTERDATA[getCode('IPDMRPE812')].Items[0])">{{__label(MASTERDATA[getCode('IPDMRPE812')].Items[0])}}</label>
        </span>
        <MdCheckBoxLabel
          v-if="MASTERDATA[getCode('IPDMRPE919')] && MASTERDATA[getCode('IPDMRPE812')].Items[0].Value"
          :data="MASTERDATA[getCode('IPDMRPE919')]"
          widthLabel="min-width: 30px"
          :unset="true"
          />
        <span :data="MASTERDATA[getCode('IPDMRPE812')].Items[1]">
          <input @change="handleChange(1)" type="checkbox" :id="'radio-' + MASTERDATA[getCode('IPDMRPE812')].Items[1].Code" v-model="MASTERDATA[getCode('IPDMRPE812')].Items[1].Value">
          <label style="width: 127px; padding: 7px 12px;" :for="'radio-' + MASTERDATA[getCode('IPDMRPE812')].Items[1].Code" @click="checkbox2Radio(MASTERDATA[getCode('IPDMRPE812')].Items, MASTERDATA[getCode('IPDMRPE812')].Items[1])">{{__label(MASTERDATA[getCode('IPDMRPE812')].Items[1])}}</label>
        </span>
        <MdCheckBoxLabel
          v-if="MASTERDATA[getCode('IPDMRPE922')] && MASTERDATA[getCode('IPDMRPE812')].Items[1].Value"
          :data="MASTERDATA[getCode('IPDMRPE922')]"
          widthLabel="min-width: 30px"
          :unset="true"
          />
      </div>
      <div v-else class="flex align-center">
        <MDRadioView :data="MASTERDATA[getCode('IPDMRPE812')].Items" />
        <MdCheckBoxLabel
          v-if="MASTERDATA[getCode('IPDMRPE919')] && MASTERDATA[getCode('IPDMRPE812')].Items[0].Value"
          :readonly="true"
          :data="MASTERDATA[getCode('IPDMRPE919')]"
          widthLabel="min-width: 30px"
          :unset="true"/>
        <MdCheckBoxLabel
          v-if="MASTERDATA[getCode('IPDMRPE922')] && MASTERDATA[getCode('IPDMRPE812')].Items[1].Value"
          :readonly="true"
          :data="MASTERDATA[getCode('IPDMRPE922')]"
          widthLabel="min-width: 30px"
          :unset="true"
          />
      </div>
    </div>
    <MdCheckBoxLabel
      v-if="MASTERDATA[getCode('IPDMRPE913')]"
      class="mrb10"
      :readonly="readonly"
      :unset="true"
      :data="MASTERDATA[getCode('IPDMRPE913')]" />
    <div class="flex align-center mrb10">
      <MdCheckBoxLabel
        class="mrr20"
        @change="handleChange(2)"
        v-if="MASTERDATA[getCode('IPDMRPE915')]"
        :readonly="readonly"
        :data="MASTERDATA[getCode('IPDMRPE915')]" />
      <div class="flex align-center" style="padding-bottom: 7px;flex-grow: 1;" v-if="MASTERDATA[getCode('IPDMRPE915')] && MASTERDATA[getCode('IPDMRPE915')].Items[0].Value">
        <div class="mrr10 no-wrap">{{__label(MASTERDATA[getCode('IPDMRPE917')])}}:</div>
        <VText v-if="MASTERDATA[getCode('IPDMRPE917')]" class="full-width" type="text" v-model="MASTERDATA[getCode('IPDMRPE917')].Items[0].Value" :readonly="readonly" :placeholder="__t('Nhập')"/>
      </div>
    </div>
    <p>{{__label(MASTERDATA[getCode('IPDMRPE819')])}}:</p>
    <VText v-if="MASTERDATA[getCode('IPDMRPE819')]" class="mrb10" v-model="MASTERDATA[getCode('IPDMRPE819')].Items[0].Value" :readonly="readonly" :placeholder="__t('Nhập')"/>
    <p>{{__label(MASTERDATA[getCode('IPDMRPE821')])}}:</p>
    <VText v-if="MASTERDATA[getCode('IPDMRPE821')]" v-model="MASTERDATA[getCode('IPDMRPE821')].Items[0].Value" :readonly="readonly" :placeholder="__t('Nhập')"/>
  </div>
</template>
<script>
import DropApgar from '@/pages/IPD/MedicalRecord/Page2CPN/DropApgar.vue'
import VSelect from '@/components/VSelect.vue'
import VText from '@/components/Form/Input/VText.vue'
export default {
  props: ['MASTERDATA', 'DataSubmit', 'readonly', 'formId', 'optionChild'],
  name: 'Obstetrics3Item',
  components: {
    DropApgar,
    VSelect,
    VText
  },
  watch: {
    MASTERDATA_TPM: {
      handler () {
        this.OnChangeMasterData()
      },
      deep: true
    },
    formId (val) {
      this.getDataVongDau()
    }
  },
  data () {
    return {
      optionApgar: [
        {
          value: '0',
          label: '0'
        },
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        },
        {
          value: '6',
          label: '6'
        },
        {
          value: '7',
          label: '7'
        },
        {
          value: '8',
          label: '8'
        },
        {
          value: '9',
          label: '9'
        },
        {
          value: '10',
          label: '10'
        }
      ],
      Datas: {},
      MASTERDATA_TPM: null
    }
  },
  mounted () {
    this.getDataVongDau()
  },
  methods: {
    getDataVongDau () {
      if (this.optionChild && this.optionChild.length && this.formId) {
        this.optionChild.find(e => {
          if (e.Newborn && e.Newborn.Id === this.formId) {
            this.Datas = e.Datas
          }
        })
      }
    },
    handleChange (num) {
      if (this.MASTERDATA[this.getCode('IPDMRPE812')] && this.MASTERDATA[this.getCode('IPDMRPE919')]) {
        if (num === 0 || num === 1) {
          this.MASTERDATA[this.getCode('IPDMRPE922')].Items.forEach(e => {
            if (e.DataType === 'Radio') {
              e.Value = false
            } else if (e.DataType === 'Checkbox') {
              e.Value = false
            } else {
              e.Value = ''
            }
          })
          this.MASTERDATA[this.getCode('IPDMRPE919')].Items.forEach(e => {
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
      if (num === 2 && this.MASTERDATA[this.getCode('IPDMRPE915')] && !this.MASTERDATA[this.getCode('IPDMRPE915')].Items[0].Value && this.MASTERDATA[this.getCode('IPDMRPE917')]) {
        this.MASTERDATA[this.getCode('IPDMRPE917')].Items[0].Value = ''
      }
      if (num === 3 && this.MASTERDATA[this.getCode('IPDMRPE846')] && !this.MASTERDATA[this.getCode('IPDMRPE846')].Items[0].Value && this.MASTERDATA[this.getCode('IPDMRPE848')]) {
        this.MASTERDATA[this.getCode('IPDMRPE848')].Items[0].Value = ''
      }
      if (num === 4 && this.MASTERDATA[this.getCode('IPDMRPE871')] && this.MASTERDATA[this.getCode('IPDMRPE875')] && !this.MASTERDATA[this.getCode('IPDMRPE871')].Items[1].Value && !this.MASTERDATA[this.getCode('IPDMRPE871')].Items[2].Value) {
        this.MASTERDATA[this.getCode('IPDMRPE875')].Items[0].Value = ''
      }
      if (num === 5 && this.MASTERDATA[this.getCode('IPDMRPE901')] && !this.MASTERDATA[this.getCode('IPDMRPE901')].Items[3].Value) {
        this.MASTERDATA[this.getCode('IPDMRPE901')].Items[4].Value = ''
      }
      if (num === 6 && this.MASTERDATA[this.getCode('IPDMRPE901')] && this.MASTERDATA[this.getCode('IPDMRPE898')] && !this.MASTERDATA[this.getCode('IPDMRPE898')].Items[0].Value && !this.MASTERDATA[this.getCode('IPDMRPE898')].Items[1].Value) {
        this.MASTERDATA[this.getCode('IPDMRPE901')].Items.forEach(e => {
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
    getCode (code) {
      // return code
      return code + '_' + this.formId
    },
    getText (diem) {
      let text = ''
      if (parseInt(diem) <= 3 && parseInt(diem) >= 0) {
        text = 'Trẻ bị ngạt nặng, cần hồi sức thở và hồi sức tim.'
      }
      if (parseInt(diem) <= 7 && parseInt(diem) >= 4) {
        text = 'Trẻ bị ngạt nhẹ, cần hồi sức thở.'
      }
      if (parseInt(diem) <= 10 && parseInt(diem) >= 8) {
        text = 'Là chỉ số bình thường, không cần hồi sức. Chỉ cần làm thông đường thở của trẻ, kích thích qua xúc giác, giữ ấm và quan sát giai đoạn chuyển tiếp của trẻ một cách sát sao.'
      }
      return text
    },
    getColor (diem) {
      let text = ''
      if (parseInt(diem) <= 3 && parseInt(diem) >= 0) {
        text = 'Tim'
      }
      if (parseInt(diem) <= 7 && parseInt(diem) >= 4) {
        text = 'Cam'
      }
      if (parseInt(diem) <= 10 && parseInt(diem) >= 8) {
        text = 'Xanh'
      }
      return text
    }
  }
}
</script>

<style lang="stylus" scoped>
  .box-color {
    border: 1px solid;
    min-height: 36px;
    max-width: 750px;
    padding: 3px;
    box-sizing: border-box;
  }
  .Xanh {
    background: #93c47d;
  }
  .Cam {
    background: #ff9900;
  }
  .Tim {
    background: #c27ba0;
  }
</style>
