<template>
  <div class="Page2CPNMedicalRecordNeonatal ml-10">
    <template v-if="box1">
      <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPT60']" v-model="MASTERDATA['IPDMRPT60']"  :hidelabel="true"/>
      <div>
        <label>{{__label(MASTERDATA['IPDMRPT62'])}}:</label>
      </div>
      <div class="flex align-center mrb10">
        <VDateTimeInput :format="vDateTimeFormat" :readonly="readonly" width="50%" v-if="MASTERDATA['IPDMRPT63']" :label="MASTERDATA['IPDMRPT63']" v-model="MASTERDATA['IPDMRPT63'].Items[0].Value"/>
        <div v-if="MASTERDATA['IPDMRPT65']" class="flex align-center" style="width: 50%">
          <div class="mrr10">{{__label(MASTERDATA['IPDMRPT65'])}}</div>
          <div>
            <textarea-autosize style="width: 300px;" :readonly="readonly" class="form-control block" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT65'].Items[0].Value"/>
          </div>
        </div>
      </div>
      <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPT67']">
        <div class="mrr20">{{__label(MASTERDATA['IPDMRPT67'])}}</div>
        <div style="margin-right: 213px!important;">
          <MdRadiosInput2 @change="handleChange2" :readonly="readonly" width="130" mrr="10" :value="MASTERDATA['IPDMRPT67']"/>
        </div>
        <div style="margin-right: 57px;">{{__t('lúc')}}</div>
        <div>
          <v-date-time-picker :readonly="readonly" v-if="MASTERDATA['IPDMRPT70']" :hideTooltip="true" v-model="MASTERDATA['IPDMRPT70'].Items[0].Value" :format="vDateTimeFormat"/>
        </div>
      </div>
      <p v-if="MASTERDATA['IPDMRPT72'] && MASTERDATA['IPDMRPT67'] && MASTERDATA['IPDMRPT67'].Items[1].Value">{{__label(MASTERDATA['IPDMRPT72'])}}:</p>
      <textarea-autosize :readonly="readonly" v-if="MASTERDATA['IPDMRPT72'] && MASTERDATA['IPDMRPT67'] && MASTERDATA['IPDMRPT67'].Items[1].Value" class="form-control block mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT72'].Items[0].Value"/>
      <div class="flex align-center mrb10">
        <b class="block mrr30">{{__label(MASTERDATA['IPDMRPT74'])}}</b>
        <div>
          <MdRadiosInput2 :readonly="readonly" v-if="MASTERDATA['IPDMRPT74']" width="130" mrr="10" :value="MASTERDATA['IPDMRPT74']" :noneDex="3"/>
        </div>
      </div>
      <textarea-autosize :readonly="readonly" v-if="MASTERDATA['IPDMRPT74'] && MASTERDATA['IPDMRPT74'].Items[2].Value" class="form-control block mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT74'].Items[3].Value"/>
      <div v-if="MASTERDATA['IPDMRPT78']" class="flex align-center mrb10">
        <div class="mrr10" style="width: 380px;">{{__label(MASTERDATA['IPDMRPT78'])}}:</div>
        <user-auto-suggest
            :position="'ALL'"
            :readonly="readonly"
            :data-code="MASTERDATA['IPDMRPT78'].Code"
            :id="MASTERDATA['IPDMRPT78'].Code"
            :data="MASTERDATA['IPDMRPT78']"
            :placeholder="__t('Gõ để tìm kiếm')"
            :getTitle="true"
            v-model="MASTERDATA['IPDMRPT78'].Items[0].Value"
            style="width: 100%;"
          />
      </div>
      <div class="flex align-center mrb10">
        <div class="mrr20">
          <div class="mrb10">Apgar</div>
          <DropApgar />
        </div>
        <div>
          <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPT82']">
            <div style="width:50px;" class="mrr10">{{__label(MASTERDATA['IPDMRPT82'])}}</div>
            <div class="mrr10">
              <v-select :readonly="readonly" :unsetWidth="true" class='select-full-w' v-model="MASTERDATA['IPDMRPT82'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionApgar"/>
            </div>
            <div class="mrr10">{{__label(MASTERDATA['IPDMRPT82'].Items[1])}}</div>
            <div class="box-color flex align-center" :class="getColor(MASTERDATA['IPDMRPT82'].Items[0].Value) ? getColor(MASTERDATA['IPDMRPT82'].Items[0].Value) : null" v-if="MASTERDATA['IPDMRPT82'].Items[0].Value !== null && MASTERDATA['IPDMRPT82'].Items[0].Value !== ''">
              <div>{{getText(MASTERDATA['IPDMRPT82'].Items[0].Value)}}</div>
            </div>
          </div>
          <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPT85']">
            <div style="width:50px;" class="mrr10">{{__label(MASTERDATA['IPDMRPT85'])}}</div>
            <div class="mrr10">
              <v-select :readonly="readonly" :unsetWidth="true" class='select-full-w' v-model="MASTERDATA['IPDMRPT85'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionApgar"/>
            </div>
            <div class="mrr10">{{__label(MASTERDATA['IPDMRPT85'].Items[1])}}</div>
            <div class="box-color flex align-center" :class="getColor(MASTERDATA['IPDMRPT85'].Items[0].Value) ? getColor(MASTERDATA['IPDMRPT85'].Items[0].Value) : null" v-if="MASTERDATA['IPDMRPT85'].Items[0].Value !== null && MASTERDATA['IPDMRPT85'].Items[0].Value !== ''">
              <div>{{getText(MASTERDATA['IPDMRPT85'].Items[0].Value)}}</div>
            </div>
          </div>
          <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPT88']">
            <div style="width:50px;" class="mrr10">{{__label(MASTERDATA['IPDMRPT88'])}}</div>
            <div class="mrr10">
              <v-select :readonly="readonly" :unsetWidth="true" class='select-full-w' v-model="MASTERDATA['IPDMRPT88'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionApgar"/>
            </div>
            <div class="mrr10">{{__label(MASTERDATA['IPDMRPT88'].Items[1])}}</div>
            <div class="box-color flex align-center" :class="getColor(MASTERDATA['IPDMRPT88'].Items[0].Value) ? getColor(MASTERDATA['IPDMRPT88'].Items[0].Value) : null" v-if="MASTERDATA['IPDMRPT88'].Items[0].Value !== null && MASTERDATA['IPDMRPT88'].Items[0].Value !== ''">
              <div>{{getText(MASTERDATA['IPDMRPT88'].Items[0].Value)}}</div>
            </div>
          </div>
          <div class="flex align-center" v-if="MASTERDATA['IPDMRPTCANA']">
            <div class="mrr10">{{__t('Cân nặng')}}: </div>
            <div>{{MASTERDATA['IPDMRPTCANA'].Items[0].Value * 1000 || 'N/A'}} (gram)</div>
          </div>
        </div>
      </div>
      <p v-if="MASTERDATA['IPDMRPT91']">{{__label(MASTERDATA['IPDMRPT91'])}}</p>
      <textarea-autosize :readonly="readonly" v-if="MASTERDATA['IPDMRPT91']" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT91'].Items[0].Value"/>
    </template>
    <template v-if="box2">
      <div class="flex align-center mrb10">
        <span class="mrr20 block" style="width:350px;">{{__label(MASTERDATA['IPDMRPT102'])}}:</span>
        <user-auto-suggest
            :position="'ALL'"
            :readonly="readonly"
            :data-code="MASTERDATA['IPDMRPT102'].Code"
            :id="MASTERDATA['IPDMRPT102'].Code"
            :data="MASTERDATA['IPDMRPT102']"
            :placeholder="__t('Gõ để tìm kiếm')"
            :getTitle="true"
            v-model="MASTERDATA['IPDMRPT102'].Items[0].Value"
            class="full-width"
          />
      </div>
      <div class="flex align-center">
        <b class="block mrr40 mrb10">{{__label(MASTERDATA['IPDMRPT104'])}}</b>
        <MdCheckBoxLabel @change="handleChange" :readonly="readonly" :reverse="true" :data="MASTERDATA['IPDMRPT104']" />
      </div>
      <p v-if="MASTERDATA['IPDMRPT107'] && MASTERDATA['IPDMRPT104'] && MASTERDATA['IPDMRPT104'].Items[0].Value">{{__label(MASTERDATA['IPDMRPT107'])}}</p>
      <textarea-autosize :readonly="readonly" v-if="MASTERDATA['IPDMRPT107'] && MASTERDATA['IPDMRPT104'] && MASTERDATA['IPDMRPT104'].Items[0].Value" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT107'].Items[0].Value"/>
      <div v-if="MASTERDATA['IPDMRPT109']">{{__label(MASTERDATA['IPDMRPT109'])}}:</div>
      <div class="mb-5 flex align-center">
        <span class="mr-10 block" v-if="MASTERDATA['IPDMRPTMACH']"><b>{{__label(MASTERDATA['IPDMRPTMACH'])}}:</b> {{MASTERDATA['IPDMRPTMACH'].Items[0].Value || 'N/A'}} {{__t('lần/phút')}}</span>
        <span class="mr-10 block" v-if="MASTERDATA['IPDMRPTNHDO']"><b>{{__label(MASTERDATA['IPDMRPTNHDO'])}}:</b> {{MASTERDATA['IPDMRPTNHDO'].Items[0].Value || 'N/A'}} {{__t('độ C')}}</span>
        <span class="mr-10 block" v-if="MASTERDATA['IPDMRPTHUAP']"><b>{{__label(MASTERDATA['IPDMRPTHUAP'])}}:</b> {{MASTERDATA['IPDMRPTHUAP'].Items[0].Value || 'N/A'}} {{__t('mmHg')}}</span>
        <span class="mr-10 block" v-if="MASTERDATA['IPDMRPTNHTH']"><b>{{__label(MASTERDATA['IPDMRPTNHTH'])}}:</b> {{MASTERDATA['IPDMRPTNHTH'].Items[0].Value || 'N/A'}} {{__t('lần/phút')}}</span>
        <span class="mr-10 block" v-if="MASTERDATA['IPDMRPTCICA']"><b>{{__t('Chiều dài')}}:</b> {{MASTERDATA['IPDMRPTCICA'].Items[0].Value || 'N/A'}} {{__t('cm')}}</span>
        <span class="mr-10 block" v-if="MASTERDATA['IPDMRPTCANA']"><b>{{__t('Cân')}}:</b> {{MASTERDATA['IPDMRPTCANA'].Items[0].Value * 1000 || 'N/A'}} gr</span>
        <span class="mr-10 block" v-if="MASTERDATA['IPDMRPTBBMI']"><b>{{__label(MASTERDATA['IPDMRPTBBMI'])}}:</b> {{MASTERDATA['IPDMRPTBBMI'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTBBMI'].Note)}}</span>
        <span class="mr-10 flex align-center" v-if="MASTERDATA['IPDMRPT109']">
          <div class="mr-10"><b>{{__label(MASTERDATA['IPDMRPT109'].Items[0])}}</b></div>
          <div class="mr-5">{{MASTERDATA['IPDMRPT109'].Items[0].Value || 'N/A'}}</div>
          <div> cm</div>
        </span>
        <BtnCopy :hideCopy="true" :value="null" @copy="handleCopy"/>
      </div>
      <textarea-autosize :readonly="readonly" v-if="MASTERDATA['IPDMRPT109']" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT109'].Items[1].Value"/>
      <p>{{__label(MASTERDATA['IPDMRPT112'])}}</p>
      <textarea-autosize :readonly="readonly" v-if="MASTERDATA['IPDMRPT112']" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT112'].Items[0].Value"/>
      <div class="flex align-center mrb10">
        <div class="mrr20">{{__label(MASTERDATA['IPDMRPT114'])}}</div>
        <MdRadiosInput2 :readonly="readonly" v-if="MASTERDATA['IPDMRPT114']" width="130" mrr="10" :value="MASTERDATA['IPDMRPT114']" :noneDex="5"/>
      </div>
      <textarea-autosize :readonly="readonly" v-if="MASTERDATA['IPDMRPT114'] && MASTERDATA['IPDMRPT114'].Items[4].Value" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT114'].Items[5].Value"/>
      <label class="mt-10" v-if="MASTERDATA['IPDMRPTCACQ']">2. {{__t('Các cơ quan khác')}}:</label>
      <div class="bg-gray-2 mrb10">
        <label>- {{__t('Hô hấp')}}:</label>
        <md-input-text :readonly="readonly" :hidelabel="true" :placeholder="__t('Nhập')" :groupDefaultLib="MASTERDATA['IPDMRPTHOHA'].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA['IPDMRPTHOHA']"/>
        <div class="mrb10 flex align-center" v-if="MASTERDATA['IPDMRPT141']">
          <label class="block" style="margin-right: 66px!important;">+ {{__label(MASTERDATA['IPDMRPT141'])}}</label>
          <VNumberInput style="width: 150px;" :readonly="readonly" class="form-control mrr10" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT141'].Items[0].Value"/>
          <div>{{__t('lần/ phút')}}</div>
        </div>
      <div v-if="MASTERDATA['IPDMRPT121']" class="mrb10"><b>{{__label(MASTERDATA['IPDMRPT121'])}}</b></div>
      <textarea-autosize :readonly="readonly" v-if="MASTERDATA['IPDMRPT121']" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT121'].Items[0].Value"/>
      <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPT123']">
        <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPT123'])}}</b></div>
        <VNumberInput :readonly="readonly" class="mrr10" style="width: 150px;" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT123'].Items[0].Value"/>
        <div> {{__t('Điểm')}}</div>
      </div>
      <DropSliverman />
      <div class="flex align-center mrb10">
        <div v-if="MASTERDATA['IPDMRPT125']" class="mrr20"><b>{{__label(MASTERDATA['IPDMRPT125'])}}</b></div>
        <div class="flex align-center">
          <div class="mrr10">{{__label(MASTERDATA['IPDMRPT143'])}}</div>
          <VNumberInput style="width: 130px;" :readonly="readonly" v-if="MASTERDATA['IPDMRPT143']" class="form-control mrr10" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT143'].Items[0].Value"/>
          <div>{{__t('lần/ phút')}}</div>
        </div>
      </div>
      <textarea-autosize :readonly="readonly" v-if="MASTERDATA['IPDMRPT125']" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT125'].Items[0].Value"/>
      <div v-for="(e, index) in groupCode" :key="index">
        <template v-if="e !== 'IPDMRPT133'">
          <p v-if="MASTERDATA[e]"><b>{{__label(MASTERDATA[e])}}</b></p>
          <textarea-autosize :readonly="readonly" v-if="MASTERDATA[e]" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA[e].Items[0].Value"/>
        </template>
        <template v-else>
          <p v-if="MASTERDATA[e]"><b>{{__label(MASTERDATA[e])}}</b></p>
        </template>
      </div>
      </div>
      <label class="mt-10 mrb10" v-if="MASTERDATA['IPDMRPTCXNC']">{{__label(MASTERDATA['IPDMRPTCXNC'])}}:</label>
      <div class="bg-gray-2">
        <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTCXNC']" v-model="MASTERDATA['IPDMRPTCXNC']"  :hidelabel="true"/>
      </div>
      <label class="mt-10" v-if="MASTERDATA['IPDMRPTTTBA']">{{__label(MASTERDATA['IPDMRPTTTBA'])}}:</label>
      <div class="bg-gray-2 mrb10">
        <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTTTBA']" v-model="MASTERDATA['IPDMRPTTTBA']"  :hidelabel="true"/>
      </div>
      <label class="mt-10" v-if="MASTERDATA['IPDMRPT138']">{{__label(MASTERDATA['IPDMRPT138'])}}</label>
      <div class="bg-gray-2 mrb10">
        <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPT138']" v-model="MASTERDATA['IPDMRPT138']"  :hidelabel="true"/>
      </div>
    </template>
  </div>
</template>
<script>
import DropSliverman from './DropSliverman.vue'
import DropApgar from './DropApgar.vue'
import VSelect from '@/components/VSelect.vue'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
export default {
  name: 'Page2CPNMedicalRecordNeonatal',
  props: ['MASTERDATA', 'box1', 'box2', 'readonly', 'DataSubmit'],
  data () {
    return {
      groupCode: [
        'IPDMRPT127',
        'IPDMRPT129',
        'IPDMRPT131',
        'IPDMRPT133',
        'IPDMRPT134',
        'IPDMRPT136'
      ],
      optionApgar: [
        {
          value: 0,
          label: '0'
        },
        {
          value: 1,
          label: '1'
        },
        {
          value: 2,
          label: '2'
        },
        {
          value: 3,
          label: '3'
        },
        {
          value: 4,
          label: '4'
        },
        {
          value: 5,
          label: '5'
        },
        {
          value: 6,
          label: '6'
        },
        {
          value: 7,
          label: '7'
        },
        {
          value: 8,
          label: '8'
        },
        {
          value: 9,
          label: '9'
        },
        {
          value: 10,
          label: '10'
        }
      ]
    }
  },
  components: {
    DropSliverman,
    DropApgar,
    VSelect,
    VDateTimePicker
  },
  created () {
  },
  methods: {
    getText (diem) {
      let text = ''
      if (diem <= 3 && diem >= 0) {
        text = 'Trẻ bị ngạt nặng, cần hồi sức thở và hồi sức tim.'
      }
      if (diem <= 7 && diem >= 4) {
        text = 'Trẻ bị ngạt nhẹ, cần hồi sức thở.'
      }
      if (diem <= 10 && diem >= 8) {
        text = 'Là chỉ số bình thường, không cần hồi sức. Chỉ cần làm thông đường thở của trẻ, kích thích qua xúc giác, giữ ấm và quan sát giai đoạn chuyển tiếp của trẻ một cách sát sao.'
      }
      return text
    },
    getColor (diem) {
      let text = ''
      if (diem <= 3 && diem >= 0) {
        text = 'Tim'
      }
      if (diem <= 7 && diem >= 4) {
        text = 'Cam'
      }
      if (diem <= 10 && diem >= 8) {
        text = 'Xanh'
      }
      return text
    },
    handleChange () {
      if (this.MASTERDATA['IPDMRPT104'] && this.MASTERDATA['IPDMRPT107']) {
        if (!this.MASTERDATA['IPDMRPT104'].Items[0].Value) {
          this.MASTERDATA['IPDMRPT107'].Items[0].Value = ''
        }
      }
    },
    handleChange2 () {
      if (this.MASTERDATA['IPDMRPT67'] && this.MASTERDATA['IPDMRPT72']) {
        if (!this.MASTERDATA['IPDMRPT67'].Items[1].Value) {
          this.MASTERDATA['IPDMRPT72'].Items[0].Value = ''
        }
      }
    },
    handleCopy () {
      let str = ''
      if (this.MASTERDATA['IPDMRPTMACH'] && this.MASTERDATA['IPDMRPTMACH'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTMACH']) + ': ' + this.MASTERDATA['IPDMRPTMACH'].Items[0].Value + ' ' + 'bpm'
      }
      if (this.MASTERDATA['IPDMRPTNHDO'] && this.MASTERDATA['IPDMRPTNHDO'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTNHDO']) + ': ' + this.MASTERDATA['IPDMRPTNHDO'].Items[0].Value + ' ' + this.__t('độ C')
      }
      if (this.MASTERDATA['IPDMRPTHUAP'] && this.MASTERDATA['IPDMRPTHUAP'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTHUAP']) + ': ' + this.MASTERDATA['IPDMRPTHUAP'].Items[0].Value + ' ' + 'mmHg'
      }
      if (this.MASTERDATA['IPDMRPTNHTH'] && this.MASTERDATA['IPDMRPTNHTH'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTNHTH']) + ': ' + this.MASTERDATA['IPDMRPTNHTH'].Items[0].Value + ' ' + 'bpm'
      }
      if (this.MASTERDATA['IPDMRPTCICA'] && this.MASTERDATA['IPDMRPTCICA'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__t('Chiều dài') + ': ' + this.MASTERDATA['IPDMRPTCICA'].Items[0].Value + ' ' + 'cm'
      }
      if (this.MASTERDATA['IPDMRPTCANA'] && this.MASTERDATA['IPDMRPTCANA'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__t('Cân') + ': ' + (this.MASTERDATA['IPDMRPTCANA'].Items[0].Value * 1000) + ' gr'
      }
      if (this.MASTERDATA['IPDMRPTBBMI'] && this.MASTERDATA['IPDMRPTBBMI'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTBBMI']) + ': ' + this.MASTERDATA['IPDMRPTBBMI'].Items[0].Value + ' ' + this.___t(this.MASTERDATA['IPDMRPTBBMI'].Note)
      }
      if (this.MASTERDATA['IPDMRPT109'] && this.MASTERDATA['IPDMRPT109'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPT109'].Items[0]) + ': ' + this.MASTERDATA['IPDMRPT109'].Items[0].Value + ' cm'
      }
      if (this.MASTERDATA['IPDMRPT109'] && !this.MASTERDATA['IPDMRPT109'].Items[1].Value) {
        this.MASTERDATA['IPDMRPT109'].Items[1].Value = str
      }
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
