<template>
  <div>
    <table class="table v-table-1 no-margin col-1-1" id="InitialAssessment-ForAdult-block2">
      <tr>
        <td colspan="3" class="no-padding">
          <div class="tbl-title">I. {{___t('Đánh giá gián tiếp khả năng nuốt')}}</div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDDGRLNMDTT']">
        <th width="1">
          <div class="w160">
            <div class="mb-5 no-wrap">{{__label(MASTERDATA['IPDDGRLNMDTT'])}}</div>
          </div>
        </th>
        <td width="1">
          <div class="w260">
            {{__label(MASTERDATA['IPDDGRLNMDTT'].Items[0])}}
          </div>
        </td>
        <td>
          <MDRadioView v-if="readonly || IsLocked" :data="MASTERDATA['IPDDGRLNMDTT'].Items"/>
          <MDRadio v-else v-model="MASTERDATA['IPDDGRLNMDTT']"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDDGRLNHKLS']">
        <th width="1">
          <div class="w160">
            <div class="mb-5 no-wraxp">{{__label(MASTERDATA['IPDDGRLNHKLS'])}}</div>
          </div>
        </th>
        <td width="1">
          <div class="w260">
            {{__label(MASTERDATA['IPDDGRLNHKLS'].Items[0])}}
          </div>
        </td>
        <td>
          <MDRadioView v-if="readonly || IsLocked" :data="MASTERDATA['IPDDGRLNHKLS'].Items"/>
          <MDRadio v-else v-model="MASTERDATA['IPDDGRLNHKLS']"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDDGRLNNNBM']">
        <th width="1" rowspan="3">
          <div class="w160">
            <div class="mb-5 no-wrap">{{__label(MASTERDATA['IPDDGRLNNNBM'])}}</div>
          </div>
        </th>
        <td width="1">
          <div class="w260">
            {{__label(MASTERDATA['IPDDGRLNNNBM'].Items[0])}}
          </div>
        </td>
        <td>
          <MDRadioView v-if="readonly || IsLocked" :data="MASTERDATA['IPDDGRLNNNBM'].Items"/>
          <MDRadio v-else v-model="MASTERDATA['IPDDGRLNNNBM']"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDDGRLNNNBH']">
        <td width="1">
          <div class="w260">
            {{__label(MASTERDATA['IPDDGRLNNNBH'].Items[0])}}
          </div>
        </td>
        <td>
          <MDRadioView v-if="readonly || IsLocked" :data="MASTERDATA['IPDDGRLNNNBH'].Items"/>
          <MDRadio v-else v-model="MASTERDATA['IPDDGRLNNNBH']"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDDGRLNNNBB']">
        <td width="1">
          <div class="w260">
            {{__label(MASTERDATA['IPDDGRLNNNBB'].Items[0])}}
          </div>
        </td>
        <td>
          <MDRadioView v-if="readonly || IsLocked" :data="MASTERDATA['IPDDGRLNNNBB'].Items"/>
          <MDRadio v-else v-model="MASTERDATA['IPDDGRLNNNBB']"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['IPDDGRLNTDPM']">
        <th width="1">
          <div class="w160">
            <div class="no-wrap">{{__label(MASTERDATA['IPDDGRLNTDPM'])}}</div>
          </div>
        </th>
        <td colspan="2">
          <div class="flex-box flex-center">
            <input type="text" class="form-control w50 mr-5" readonly :value="IPDDGRLNTDPM" /> /{{__t('5 điểm')}}
            <div class="el01">
              <div><b>{{__t('1-4 điểm')}}</b>: {{__t('khó nuốt nặng (trên lâm sàng), cần làm thêm các thăm dò khác.')}}</div>
              <div><b>{{__t('5 điểm')}}</b>: {{__t('tiếp tục làm phần 2 của nghiệm pháp')}}</div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <table  class="table v-table-1 no-margin col-1-1" id="InitialAssessment-ForAdult-block3" v-if="IPDDGRLNTDPM >= 5">
      <tr>
        <td colspan="6" class="no-padding">
          <div class="tbl-title">II. {{___t('Đánh giá trực tiếp khả năng nuốt')}}</div>
        </td>
      </tr>
      <tr>
        <td colspan="6">
          <b>{{___t('Theo thứ tự (1) -> (2) -> (3)')}}</b> {{___t('(Dụng cụ: nước, thìa nhỏ, sữa chua, bánh mỳ khô hoặc cơm)')}}
        </td>
      </tr>
      <tr>
        <th rowspan="2" width="1" class="text-center w1">
          {{__t('STT')}}
        </th>
        <th rowspan="2" colspan="2" class="text-left">
          {{__t('Các nội dung đánh giá')}}
        </th>
        <th colspan="3" class="text-center">
          {{__t('Thức ăn')}}
        </th>
      </tr>
      <tr>
        <th class="text-center">
          <b>{{__t('Đặc (1)')}} <i @click="openNote('IPDDGRLNTNDD')" aria-hidden="true" class="fa fa-question-circle"></i></b>
          <div class="w140">{{__t('(Sữa chua)')}}</div>
        </th>
        <th class="text-center">
          <b>{{__t('Lỏng (2)')}} <i @click="openNote('IPDDGRLNTNDL')" aria-hidden="true" class="fa fa-question-circle"></i></b>
          <div class="w140">{{__t('(Nước)')}}</div>
        </th>
        <th class="text-center">
          <b>{{__t('Cứng (3)')}} <i @click="openNote('IPDDGRLNTNDC')" aria-hidden="true" class="fa fa-question-circle"></i></b>
          <div class="w140">{{__t('(Cơm/ bánh mỳ)')}}</div>
        </th>
      </tr>
      <tr>
        <td class="text-center" rowspan="3">1</td>
        <td rowspan="3"><b>{{__label(MASTERDATA['IPDDGRLNNNBT'])}}</b></td>
        <td>
          <b>{{__label(MASTERDATA['IPDDGRLNNKND'].Items[0])}}</b>
        </td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDDGRLNNKND'].Items" v-if="item.DataType === 'Checkbox'">
          <div class="group-radio full-width" :class="disableByTotal(index)">
            <span :class="{'readonly': readonly || IsLocked}">
              <input type="checkbox" :id="'IPDDGRLNNKNDradio-' + index" v-model="item.Value">
              <label @click="resetByGroup('IPDDGRLNNKND', index, ['IPDDGRLNNNBT', 'IPDDGRLNNNCH'])" :for="'IPDDGRLNNKNDradio-' + index">{{item.Data}}</label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <b>{{__label(MASTERDATA['IPDDGRLNNNCH'].Items[0])}}</b>
          <div v-html="__t(MASTERDATA['IPDDGRLNNNCH'].Items[0].Note)"></div>
        </td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDDGRLNNNCH'].Items" v-if="item.DataType === 'Checkbox'">
          <div class="group-radio full-width" :class="disableByTotal(index)">
            <span :class="{'readonly': readonly}">
              <input type="checkbox" :id="'IPDDGRLNNNCHradio-' + index" v-model="item.Value">
              <label @click="resetByGroup('IPDDGRLNNNCH', index, ['IPDDGRLNNNBT', 'IPDDGRLNNKND'])" :for="'IPDDGRLNNNCHradio-' + index">{{item.Data}}</label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td><b>{{__label(MASTERDATA['IPDDGRLNNNBT'].Items[0])}}</b></td>
        <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['IPDDGRLNNNBT'].Items" v-if="item.DataType === 'Checkbox'">
          <div class="group-radio full-width" :class="disableByTotal(index)">
            <span :class="{'readonly': readonly || IsLocked}">
              <input type="checkbox" :id="'IPDDGRLNNNBTradio-' + index" v-model="item.Value">
              <label :for="'IPDDGRLNNNBTradio-' + index" @click="resetByGroup('IPDDGRLNNNBT', index, ['IPDDGRLNNNCH', 'IPDDGRLNNKND'])">{{item.Data}}</label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="text-center" rowspan="2">2</td>
        <td rowspan="2" class="w1">
          <b>{{__label(MASTERDATA['IPDDGRLNHOCO'])}}</b>
          <div class="w260" v-html="__t(MASTERDATA['IPDDGRLNHOCO'].Note)"></div>
        </td>
        <td><b>{{__label(MASTERDATA['IPDDGRLNHOCO'].Items[0])}}</b></td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDDGRLNHOCO'].Items" v-if="item.DataType === 'Checkbox'">
          <div class="group-radio full-width" :class="disableByTotal(index)">
            <span :class="{'readonly': readonly}">
              <input type="checkbox" :id="'IPDDGRLNHOCOradio-' + index" v-model="item.Value">
              <label @click="resetByGroup('IPDDGRLNHOCO', index, ['IPDDGRLNHOKO'])" :for="'IPDDGRLNHOCOradio-' + index">{{item.Data}}</label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <b>{{__label(MASTERDATA['IPDDGRLNHOKO'].Items[0])}}</b>
        </td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDDGRLNHOKO'].Items" v-if="item.DataType === 'Checkbox'">
          <div class="group-radio full-width" :class="disableByTotal(index)">
            <span :class="{'readonly': readonly || IsLocked}">
              <input type="checkbox" :id="'IPDDGRLNHOKOradio-' + index" v-model="item.Value">
              <label @click="resetByGroup('IPDDGRLNHOKO', index, ['IPDDGRLNHOCO'])" :for="'IPDDGRLNHOKOradio-' + index">{{item.Data}}</label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="text-center" rowspan="2">3</td>
        <td rowspan="2" class="w1">
          <b>{{__label(MASTERDATA['IPDDGRLNCNDC'])}}</b>
          <div class="w260" v-html="__t(MASTERDATA['IPDDGRLNCNDC'].Note)"></div>
        </td>
        <td><b>{{__label(MASTERDATA['IPDDGRLNCNDC'].Items[0])}}</b></td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDDGRLNCNDC'].Items" v-if="item.DataType === 'Checkbox'">
          <div class="group-radio full-width" :class="disableByTotal(index)">
            <span :class="{'readonly': readonly}">
              <input type="checkbox" :id="'IPDDGRLNCNDCradio-' + index" v-model="item.Value">
              <label @click="resetByGroup('IPDDGRLNCNDC', index, ['IPDDGRLNCNDK'])" :for="'IPDDGRLNCNDCradio-' + index">{{item.Data}}</label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <b>{{__label(MASTERDATA['IPDDGRLNCNDK'].Items[0])}}</b>
        </td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDDGRLNCNDK'].Items" v-if="item.DataType === 'Checkbox'">
          <div class="group-radio full-width" :class="disableByTotal(index)">
            <span :class="{'readonly': readonly || IsLocked}">
              <input type="checkbox" :id="'IPDDGRLNCNDKradio-' + index" v-model="item.Value">
              <label @click="resetByGroup('IPDDGRLNCNDK', index, ['IPDDGRLNCNDC'])" :for="'IPDDGRLNCNDKradio-' + index">{{item.Data}}</label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="text-center" rowspan="2">4</td>
        <td rowspan="2" class="w1">
          <b>{{__label(MASTERDATA['IPDDGRLNTDGC'])}}</b>
          <div class="w260" v-html="__t(MASTERDATA['IPDDGRLNTDGC'].Note)"></div>
        </td>
        <td><b>{{__label(MASTERDATA['IPDDGRLNTDGC'].Items[0])}}</b></td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDDGRLNTDGC'].Items" v-if="item.DataType === 'Checkbox'">
          <div class="group-radio full-width" :class="disableByTotal(index)">
            <span :class="{'readonly': readonly || IsLocked}">
              <input type="checkbox" :id="'IPDDGRLNTDGCradio-' + index" v-model="item.Value">
              <label @click="resetByGroup('IPDDGRLNTDGC', index, ['IPDDGRLNTDGK'])" :for="'IPDDGRLNTDGCradio-' + index">{{item.Data}}</label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <b>{{__label(MASTERDATA['IPDDGRLNTDGK'].Items[0])}}</b>
        </td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDDGRLNTDGK'].Items" v-if="item.DataType === 'Checkbox'">
          <div class="group-radio full-width" :class="disableByTotal(index)">
            <span :class="{'readonly': readonly || IsLocked}">
              <input type="checkbox" :id="'IPDDGRLNTDGKradio-' + index" v-model="item.Value">
              <label  @click="resetByGroup('IPDDGRLNTDGK', index, ['IPDDGRLNTDGC'])" :for="'IPDDGRLNTDGKradio-' + index">{{item.Data}}</label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="text-right">
          <b>{{__t('Tổng điểm')}}</b>
        </td>
        <td class="text-center">
          {{total21}}
        </td>
        <td class="text-center">
          {{total22}}
        </td>
        <td class="text-center">
          {{total23}}
        </td>
      </tr>
      <tr>
        <td colspan="3" class="text-right">
          <b>{{__t('Cho điểm')}}</b>
        </td>
        <td class="text-center">
          <div><b>{{__t('1 - 4 điểm')}}</b>: {{__t('Dừng')}}</div>
          <div><b>{{__t('5 điểm')}}</b>: {{__t('Tiếp bước 2')}}</div>
        </td>
        <td class="text-center">
          <div><b>{{__t('1 - 4 điểm')}}</b>: {{__t('Dừng')}}</div>
          <div><b>{{__t('5 điểm')}}</b>: {{__t('Tiếp bước 3')}}</div>
        </td>
        <td class="text-center">
          <div><b>{{__t('1 - 4 điểm')}}</b>: {{__t('Dừng')}}</div>
          <div><b>{{__t('5 điểm')}}</b>: {{__t('Bình thường')}}</div>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="text-right">
          <b>{{__label(MASTERDATA['IPDDGRLNTDPH'])}}</b>
        </td>
        <td colspan="3" class="text-center">
          <b>{{total2}}</b>/15 {{__t('điểm')}}
        </td>
      </tr>
    </table>
    <table  class="table v-table-1 no-margin col-1-1" id="InitialAssessment-ForAdult-block5">
      <tr>
        <td colspan="4" class="no-padding">
          <div class="tbl-title">III. {{___t('Kết quả')}} <b>{{total}}</b>/20 {{__t('điểm')}}</div>
        </td>
      </tr>
      <tr>
        <th class="text-left" width="1">{{__t('Điểm')}}</th>
        <th class="text-left">{{__t('Diễn giải')}}</th>
        <th class="text-left">{{__t('Mức độ khó nuốt')}}</th>
        <th class="text-left">{{__t('Nguy cơ hít sặc')}}</th>
      </tr>
      <tr v-for="(code, index) in explainCode" :key="index" v-if="MASTERDATA[code] && parseNote(MASTERDATA[code].Note)">
        <td width="1" class="no-wrap">{{MASTERDATA[code].Note}}</td>
        <td>{{__label(MASTERDATA[code])}}</td>
        <td>{{__label(MASTERDATA[code].Items[0])}}</td>
        <td>{{__label(MASTERDATA[code].Items[1])}}</td>
      </tr>
    </table>
    <br/><br/>
    <div class="row">
      <div class="col-md-5">
        <logs v-if="!readonly || !IsLocked" :EdId="this.$route.params.Id" :Type="'IPD/GuggingSwallowingScreen'"/>
        <p v-if="readonly">A02_050_050919_V</p>
      </div>
      <div class="col-md-7 text-right" v-if="MASTERDATA['IPDDGRLNNGDG']">
        <b>{{__t('Ngày/ giờ đánh giá')}}:</b>
        <span v-if="readonly || IsLocked" class="fake-input disable">{{MASTERDATA['IPDDGRLNNGDG'].Items[0].Value}}</span>
        <VDateTimePicker style="display: inline-block;" v-else v-model="MASTERDATA['IPDDGRLNNGDG'].Items[0].Value" class=" select-boox" :format="vDateTimeFormat"/>
        <b v-if="UpdatedBy" class="ml-20">{{__t('Người đánh giá')}}:</b>
        <ad-Info v-if="UpdatedBy" :ad="UpdatedBy" />
      </div>
    </div>
    <br/>
    <br/>
    <FloatBlock v-if="!readonly && !IsLocked && condition === 'Nurse'" :openBack="true" @handleBack="handleBack">
      <template slot='buttons'>
        <div class="col-md-2 col-sm-2">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group1">
            <p class="hidden-text">hidden-text</p>
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-group1">
            <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
  </div>
</template>

<script>
import MixinMasterData from '@/mixins/masterdata.js'
import Logs from '@/components/Logs.vue'
import NProgress from 'nprogress'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import GuggingSwallowingScreen from '@/services/IPD/GuggingSwallowingScreen'
import GuggingSwallowingScreenChecked from '@/services/IPD/GuggingSwallowingScreenChecked'
export default {
  name: 'GuggingSwallowingScreenItem',
  mixins: [MixinMasterData],
  props: ['VisitId', 'VisitType', 'readonly', 'formId'],
  components: {
    Logs,
    VDateTimePicker
  },
  data () {
    return {
      IsLocked: false,
      DataSubmit: null,
      UpdatedBy: '',
      loaded: false,
      part2Codes: ['IPDDGRLNNNBT', 'IPDDGRLNHOCO', 'IPDDGRLNHOKO', 'IPDDGRLNNNCH', 'IPDDGRLNNKND', 'IPDDGRLNCNDC', 'IPDDGRLNCNDK', 'IPDDGRLNTDGC', 'IPDDGRLNTDGK'],
      explainCode: ['IPDDGRLNTBTN', 'IPDDGRLNCNDV', 'IPDDGRLNNDVC', 'IPDDGRLNNDVB'],
      Type: 'A02_050_050919_V',
      Lists: null,
      dataMaster: [],
      checkEdited: false
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'IPDDGRLN'}, () => {
      this.getDataDetail()
    })
  },
  watch: {
    total21: {
      handler (a, b) {
        if (a < 5) {
          this.resetPart2ByIndex(3)
          this.resetPart2ByIndex(2)
        }
      },
      deep: true
    },
    total22: {
      handler (a, b) {
        if (a < 5) {
          this.resetPart2ByIndex(3)
        }
      },
      deep: true
    },
    MASTERDATA: {
      handler () {
        if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
          this.checkEdited = true
        }
      },
      deep: true
    },
    formId () {
      this.getMasterDatas({Form: 'IPDDGRLN'}, () => {
        this.getDataDetail()
      })
    }
  },
  computed: {
    total21: function () {
      return this.getPartTotal(1)
    },
    total22: function () {
      return this.getPartTotal(2)
    },
    total23: function () {
      return this.getPartTotal(3)
    },
    total2: function () {
      return this.total21 + this.total22 + this.total23
    },
    total: function () {
      return this.total2 + this.IPDDGRLNTDPM
    },
    IPDDGRLNTDPM: function () {
      if (this.MASTERDATA['IPDDGRLNMDTT'] || this.MASTERDATA['IPDDGRLNNNBH'] || this.MASTERDATA['IPDDGRLNHKLS'] || this.MASTERDATA['IPDDGRLNNNBM'] || this.MASTERDATA['IPDDGRLNNNBB']) {
        var t = ([
          this.MASTERDATA['IPDDGRLNMDTT'].Items[1].Value,
          this.MASTERDATA['IPDDGRLNNNBH'].Items[2].Value,
          this.MASTERDATA['IPDDGRLNHKLS'].Items[1].Value,
          this.MASTERDATA['IPDDGRLNNNBM'].Items[1].Value,
          this.MASTERDATA['IPDDGRLNNNBB'].Items[2].Value
        ].filter(e => e)).length
        if (t < 5) {
          this.resetAllPart2()
        }
        return t
      }
    },
    condition () {
      let name = ''
      if (this.$store.state.account.Position.includes('Nurse')) {
        name = 'Nurse'
      }
      if (this.$store.state.account.Position.includes('Doctor')) {
        name = 'Doctor'
      }
      return name
    },
    _ItemId: function () {
      return this.$route.params.Item || this.formId
    }
  },
  methods: {
    disableByTotal (index) {
      if (index === 2 && this.total21 < 5) return 'disable'
      if (index === 3 && (this.total22 < 5 || this.total21 < 5)) return 'disable'
    },
    resetByGroup (current, index, group) {
      group.forEach(code => {
        if (this.MASTERDATA[code]) this.MASTERDATA[code].Items[index].Value = null
      })
    },
    resetPart2ByIndex (index) {
      this.part2Codes.forEach(code => {
        if (this.MASTERDATA[code]) this.MASTERDATA[code].Items[index].Value = null
      })
    },
    resetAllPart2 () {
      this.part2Codes.forEach(code => {
        this.MASTERDATA[code].Items.forEach(e => {
          e.Value = null
        })
      })
    },
    openNote (code) {
      var title = this.__label(this.MASTERDATA[code])
      var text = '<p>' + this.__label(this.MASTERDATA[code].Items[0]) + '</p>' + '<b>' + this.__label(this.MASTERDATA[code].Items[1]) + '</b>'
      this.$modal.show('dialog', {
        clickToClose: false,
        title: title,
        text: text,
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đóng'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    parseNote (str) {
      var arr = str.split('-')
      if (arr.length) {
        return this.total >= this.parseInt(arr[0], 0) && this.total <= this.parseInt(arr[1], 200)
      }
      return false
    },
    getPartTotal (index) {
      var total = this.part2Codes.map(code => {
        return (this.MASTERDATA[code] && this.MASTERDATA[code].Items[index].Value) ? this.parseInt(this.MASTERDATA[code].Items[index].Data, 0) : 0
      }).reduce((acc, val) => {
        return acc + val
      }, 0)
      return total
    },
    submit () {
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      this.MASTERDATA['IPDDGRLNTDPM'].Items[0].Value = this.IPDDGRLNTDPM
      this.MASTERDATA['IPDDGRLNTODI'].Items[0].Value = this.total21
      this.MASTERDATA['IPDDGRLNTODI'].Items[1].Value = this.total22
      this.MASTERDATA['IPDDGRLNTODI'].Items[2].Value = this.total23
      this.MASTERDATA['IPDDGRLNTDPH'].Items[0].Value = this.total2
      this.MASTERDATA['IPDDGRLNKEQU'].Items[0].Value = this.total
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      new GuggingSwallowingScreen().update('/Update/' + this.Type + '/' + this.$route.params.Id + '/' + this._ItemId, this.DataSubmit).then(response => {
        this.toastedSuccess()
        setTimeout(() => {
          this.reload()
        }, 500)
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    getDataDetail () {
      if (this._VisitType === 'IPD') {
        new GuggingSwallowingScreenChecked().find(this.Type + '/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true).then(response => {
          this.IsLocked = response.IsLocked
          this.loaded = true
        }).catch(e => {
          this.loaded = true
        })
      }
      new GuggingSwallowingScreen().find(this.Type + '/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true).then(async response => {
        this.DataSubmit = response
        this.UpdatedBy = response.UpdatedBy
        this.loaded = true
        this.mapMdData2Data()
        this.dataMaster = await JSON.stringify(this.MASTERDATA)
        this.checkEdited = false
      }).catch(e => {
        this.loaded = true
        this.DataSubmit = false
        if (e.status === 404) {}
      })
    },
    handleBack () {
      this.edited = false
      if (this.checkEdited) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    // popup canh bao
    confirmPopupBack () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
