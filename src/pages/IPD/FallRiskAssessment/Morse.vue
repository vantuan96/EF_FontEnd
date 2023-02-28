<template>
  <div>
    <div class="text-center" v-if="!readonly"><button @click="open(false)" class="uppercase btn v-yellow-btn">{{___t('THÊM LƯỢT ĐÁNH GIÁ')}}</button></div>
    <modal name="AdultMasterDataPopup" transition="pop-out" height="auto" :clickToClose="false" :width="modalWidth">
      <div class="sync-ed-header">{{__t('Bảng đánh giá nguy cơ ngã ở NB nội trú người lớn')}} <i @click="$modal.hide('AdultMasterDataPopup')" class="fa fa-times pull-right fa-2" aria-hidden="true"></i></div>
      <div class="sync-ed-box">
        <table class="standing-order-tbl" :class="{'disable': readonly}">
          <tr>
            <th width="270">{{___t('Tiêu chí')}}</th>
            <th>{{___t('')}}</th>
            <th width="1">{{___t('Điểm')}}</th>
          </tr>
          <tr v-if="MASTERDATA['IPDMMFSAGE']">
            <td class="bg-head" width="270">
              {{__label(MASTERDATA['IPDMMFSAGE'])}}
            </td>
            <td class="disabel-table">
              <div :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDMMFSAGE'].Items" v-if="item.DataType === 'Label' && ageIndex.includes(index)">
                {{__label(item)}}
              </div>
            </td>
            <td class="disabel-table">
              <div class="group-radio full-width" :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDMMFSAGE'].Items" v-if="item.DataType === 'Radio' && ageIndex.includes(index)">
                <span>
                  <input type="checkbox" :id="'IPDMMFSAGEradio-' + index" v-model="item.Value">
                  <label :for="'IPDMMFSAGEradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDMMFSAGE'].Items, item)">{{__label(item)}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMMFSHOF']">
            <td class="bg-head" width="270">
              {{__label(MASTERDATA['IPDMMFSHOF'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMMFSHOF'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width" :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDMMFSHOF'].Items" v-if="item.DataType === 'Radio'">
                <span>
                  <input type="checkbox" :id="'IPDMMFSHOFradio-' + index" v-model="item.Value">
                  <label :for="'IPDMMFSHOFradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDMMFSHOF'].Items, item)">{{__label(item)}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMMFSSED']">
            <td class="bg-head" width="270">
              {{__label(MASTERDATA['IPDMMFSSED'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMMFSSED'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width" :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDMMFSSED'].Items" v-if="item.DataType === 'Radio'">
                <span>
                  <input type="checkbox" :id="'IPDMMFSSEDradio-' + index" v-model="item.Value">
                  <label :for="'IPDMMFSSEDradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDMMFSSED'].Items, item)">{{__label(item)}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMMFSAMA']">
            <td class="bg-head" width="270" rowspan="3">
              {{__label(MASTERDATA['IPDMMFSAMA'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMMFSAMA'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMMFSAMAradio-' + 1" v-model="MASTERDATA['IPDMMFSAMA'].Items[1].Value">
                  <label :for="'IPDMMFSAMAradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMMFSAMA'].Items, MASTERDATA['IPDMMFSAMA'].Items[1])">{{__label(MASTERDATA['IPDMMFSAMA'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMMFSAMA']">
            <td>
              {{__label(MASTERDATA['IPDMMFSAMA'].Items[2])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMMFSAMAradio-' + 3" v-model="MASTERDATA['IPDMMFSAMA'].Items[3].Value">
                  <label :for="'IPDMMFSAMAradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMMFSAMA'].Items, MASTERDATA['IPDMMFSAMA'].Items[3])">{{__label(MASTERDATA['IPDMMFSAMA'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMMFSAMA']">
            <td>
              {{__label(MASTERDATA['IPDMMFSAMA'].Items[4])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMMFSAMAradio-' + 5" v-model="MASTERDATA['IPDMMFSAMA'].Items[5].Value">
                  <label :for="'IPDMMFSAMAradio-' + 5" @click="checkbox2Radio(MASTERDATA['IPDMMFSAMA'].Items, MASTERDATA['IPDMMFSAMA'].Items[5])">{{__label(MASTERDATA['IPDMMFSAMA'].Items[5])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMMFSRIV']">
            <td class="bg-head" width="270">
              {{__label(MASTERDATA['IPDMMFSRIV'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMMFSRIV'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width" :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDMMFSRIV'].Items" v-if="item.DataType === 'Radio'">
                <span>
                  <input type="checkbox" :id="'IPDMMFSRIVradio-' + index" v-model="item.Value">
                  <label :for="'IPDMMFSRIVradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDMMFSRIV'].Items, item)">{{__label(item)}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMMFSTOG']">
            <td class="bg-head" width="270" rowspan="3">
              {{__label(MASTERDATA['IPDMMFSTOG'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMMFSTOG'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMMFSTOGradio-' + 1" v-model="MASTERDATA['IPDMMFSTOG'].Items[1].Value">
                  <label :for="'IPDMMFSTOGradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMMFSTOG'].Items, MASTERDATA['IPDMMFSTOG'].Items[1])">{{__label(MASTERDATA['IPDMMFSTOG'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMMFSTOG']">
            <td>
              {{__label(MASTERDATA['IPDMMFSTOG'].Items[2])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMMFSTOGradio-' + 3" v-model="MASTERDATA['IPDMMFSTOG'].Items[3].Value">
                  <label :for="'IPDMMFSTOGradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMMFSTOG'].Items, MASTERDATA['IPDMMFSTOG'].Items[3])">{{__label(MASTERDATA['IPDMMFSTOG'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMMFSTOG']">
            <td>
              {{__label(MASTERDATA['IPDMMFSTOG'].Items[4])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMMFSTOGradio-' + 5" v-model="MASTERDATA['IPDMMFSTOG'].Items[5].Value">
                  <label :for="'IPDMMFSTOGradio-' + 5" @click="checkbox2Radio(MASTERDATA['IPDMMFSTOG'].Items, MASTERDATA['IPDMMFSTOG'].Items[5])">{{__label(MASTERDATA['IPDMMFSTOG'].Items[5])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMMFSMES']">
            <td class="bg-head" width="270" rowspan="2">
              {{__label(MASTERDATA['IPDMMFSMES'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMMFSMES'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMMFSMESradio-' + 1" v-model="MASTERDATA['IPDMMFSMES'].Items[1].Value">
                  <label :for="'IPDMMFSMESradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMMFSMES'].Items, MASTERDATA['IPDMMFSMES'].Items[1])">{{__label(MASTERDATA['IPDMMFSMES'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMMFSMES']">
            <td>
              {{__label(MASTERDATA['IPDMMFSMES'].Items[2])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMMFSMESradio-' + 3" v-model="MASTERDATA['IPDMMFSMES'].Items[3].Value">
                  <label :for="'IPDMMFSMESradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMMFSMES'].Items, MASTERDATA['IPDMMFSMES'].Items[3])">{{__label(MASTERDATA['IPDMMFSMES'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="bg-head" width="270">
              {{___t('Tổng điểm')}}
            </td>
            <td>
            </td>
            <td><label class="label-yellow">{{total}}</label></td>
          </tr>
          <tr>
            <td class="bg-head" width="270">
              {{___t('Phân loại')}}
            </td>
            <td>
            </td>
            <td><label class="label-yellow">{{LEVELS[level]}}</label></td>
          </tr>
          <tr>
            <th colspan="2">{{___t('Can thiệp tương ứng với phân loại nguy cơ ngã')}}</th>
            <th class="no-wrap">{{___t('Tích thực hiện')}}</th>
          </tr>
          <!-- <template v-if="MASTERDATA['IPDMMFSSAD']">
          <tr :data="item" :key="index + item.Code" v-for="(item, index) in MASTERDATA['IPDMMFSSAD'].Items.filter(e => e.Data[level] === '1')">
            <td v-if="index === 0" :rowspan="MASTERDATA['IPDMMFSSAD'].Items.filter(e => e.Data[level] === '1').length" class="bg-head" width="270">
              {{__label(MASTERDATA['IPDMMFSSAD'])}}
            </td>
            <td>{{__label(item)}}</td>
            <td>
              <label class="container-checkbox reset" :for="'IPDMMFSSAD-' + index">
                <input type="checkbox" :id="'IPDMMFSSAD-' + index" v-model="item.Value">
                <span class="checkmark"></span>
              </label>
            </td>
          </tr>
          </template>
          <template v-if="MASTERDATA['IPDMMFSIRP']">
          <tr :data="item" :key="index + item.Code" v-for="(item,index) in MASTERDATA['IPDMMFSIRP'].Items.filter(e => e.Data[level] === '1')">
            <td v-if="index === 0" :rowspan="MASTERDATA['IPDMMFSIRP'].Items.filter(e => e.Data[level] === '1').length" class="bg-head" width="270">
              {{__label(MASTERDATA['IPDMMFSIRP'])}}
            </td>
            <td>{{__label(item)}}</td>
            <td>
              <label class="container-checkbox reset" :for="'IPDMMFSIRP-' + index">
                <input type="checkbox" :id="'IPDMMFSIRP-' + index" v-model="item.Value">
                <span class="checkmark"></span>
              </label>
            </td>
          </tr>
          </template>
          <template v-if="MASTERDATA['IPDMMFSCON']">
          <tr :data="item" :key="index + item.Code" v-for="(item,index) in MASTERDATA['IPDMMFSCON'].Items.filter(e => e.Data[level] === '1')">
            <td v-if="index === 0" :rowspan="MASTERDATA['IPDMMFSCON'].Items.filter(e => e.Data[level] === '1').length" class="bg-head" width="270">
              {{__label(MASTERDATA['IPDMMFSCON'])}}
            </td>
            <td>{{__label(item)}}</td>
            <td>
              <label class="container-checkbox reset" :for="'IPDMMFSCON-' + index">
                <input type="checkbox" :id="'IPDMMFSCON-' + index" v-model="item.Value">
                <span class="checkmark"></span>
              </label>
            </td>
          </tr>
          </template>
          <template v-if="MASTERDATA['IPDMMFSAWT']">
          <tr :data="item" :key="index + item.Code" v-for="(item,index) in MASTERDATA['IPDMMFSAWT'].Items.filter(e => e.Data[level] === '1')">
            <td v-if="index === 0" :rowspan="MASTERDATA['IPDMMFSAWT'].Items.filter(e => e.Data[level] === '1').length" class="bg-head" width="270">
              {{__label(MASTERDATA['IPDMMFSAWT'])}}
            </td>
            <td>{{__label(item)}}</td>
            <td>
              <label class="container-checkbox reset" :for="'IPDMMFSAWT-' + index">
                <input type="checkbox" :id="'IPDMMFSAWT-' + index" v-model="item.Value">
                <span class="checkmark"></span>
              </label>
            </td>
          </tr>
          </template>
          <template v-if="MASTERDATA['IPDMMFSAWA']">
          <tr :data="item" :key="index + item.Code" v-for="(item,index) in MASTERDATA['IPDMMFSAWA'].Items.filter(e => e.Data[level] === '1')">
            <td v-if="index === 0" :rowspan="MASTERDATA['IPDMMFSAWA'].Items.filter(e => e.Data[level] === '1').length" class="bg-head" width="270">
              {{__label(MASTERDATA['IPDMMFSAWA'])}}
            </td>
            <td>{{__label(item)}}</td>
            <td>
              <label class="container-checkbox reset" :for="'IPDMMFSAWA-' + index">
                <input type="checkbox" :id="'IPDMMFSAWA-' + index" v-model="item.Value">
                <span class="checkmark"></span>
              </label>
            </td>
          </tr>
          </template>
          <template v-if="MASTERDATA['IPDMMFSOOB']">
          <tr :data="item" :key="index + item.Code" v-for="(item,index) in MASTERDATA['IPDMMFSOOB'].Items.filter(e => e.Data[level] === '1')">
            <td v-if="index === 0" :rowspan="MASTERDATA['IPDMMFSOOB'].Items.filter(e => e.Data[level] === '1').length" class="bg-head" width="270">
              {{__label(MASTERDATA['IPDMMFSOOB'])}}
            </td>
            <td>{{__label(item)}}</td>
            <td>
              <label class="container-checkbox reset" :for="'IPDMMFSOOB-' + index">
                <input type="checkbox" :id="'IPDMMFSOOB-' + index" v-model="item.Value">
                <span class="checkmark"></span>
              </label>
            </td>
          </tr>
          </template>
          <template v-if="MASTERDATA['IPDMMFSBEA']">
          <tr :data="item" :key="index + item.Code" v-for="(item,index) in MASTERDATA['IPDMMFSBEA'].Items.filter(e => e.Data[level] === '1')">
            <td v-if="index === 0" :rowspan="MASTERDATA['IPDMMFSBEA'].Items.filter(e => e.Data[level] === '1').length" class="bg-head" width="270">
              {{__label(MASTERDATA['IPDMMFSBEA'])}}
            </td>
            <td>{{__label(item)}}</td>
            <td>
              <label class="container-checkbox reset" :for="'IPDMMFSBEA-' + index">
                <input type="checkbox" :id="'IPDMMFSBEA-' + index" v-model="item.Value">
                <span class="checkmark"></span>
              </label>
            </td>
          </tr>
          </template>
          <template v-if="MASTERDATA['IPDMMFSICO']" class="bg-head" width="270">
          <tr :data="item" :key="index + item.Code" v-for="(item,index) in MASTERDATA['IPDMMFSICO'].Items.filter(e => e.Data[level] === '1')">
            <td v-if="index === 0" :rowspan="MASTERDATA['IPDMMFSICO'].Items.filter(e => e.Data[level] === '1').length" class="bg-head" width="270">
              {{__label(MASTERDATA['IPDMMFSICO'])}}
            </td>
            <td>{{__label(item)}}</td>
            <td>
              <label class="container-checkbox reset" :for="'IPDMMFSICO-' + index">
                <input type="checkbox" :id="'IPDMMFSICO-' + index" v-model="item.Value">
                <span class="checkmark"></span>
              </label>
            </td>
          </tr>
          </template> -->
          <template v-for="dd in MDCODES2">
            <template v-if="MASTERDATA[dd]">
              <tr :data="item" :key="index + item.Code" v-for="(item, index) in MASTERDATA[dd].Items.filter(e => e.Data[level] === '1')">
                <td v-if="index === 0" :rowspan="MASTERDATA[dd].Items.filter(e => e.Data[level] === '1').length" class="bg-head font-bold" width="270">
                  {{__label(MASTERDATA[dd])}}
                </td>
                <td>{{__label(item)}}</td>
                <td>
                  <label class="container-checkbox reset" :for="dd + 'IPDMOFRSAD-' + index">
                    <input type="checkbox" :id="dd + 'IPDMOFRSAD-' + index" v-model="item.Value">
                    <span class="checkmark"></span>
                  </label>
                </td>
              </tr>
            </template>
          </template>
        </table>
        <br/>
        <button v-if="!readonly" class="btn btn-yellow-gradient btn-block" v-shortkey="['ctrl', 's']" @shortkey="save()" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
      </div>
    </modal>
  </div>
</template>
<script>
import FallRiskAssessment from '@/services/IPD/FallRiskAssessment'
import MixinMasterData from '@/mixins/masterdata.js'
import NProgress from 'nprogress'
import _ from 'lodash'

const MODAL_WIDTH = 980
// const age = 15
const MDCODES = [
  'IPDMMFSAGE',
  'IPDMMFSHOF',
  'IPDMMFSSED',
  'IPDMMFSAMA',
  'IPDMMFSRIV',
  'IPDMMFSTOG',
  'IPDMMFSMES'
]
const MDCODES2 = [
  'IPDMMFSIRP',
  'IPDMMFSCON',
  'IPDMMFSAWS',
  'IPDMMFSAWW',
  'IPDMMFSPAA'
]
export default {
  name: 'Morse',
  props: ['readonly', 'VisitId'],
  mixins: [MixinMasterData],
  data () {
    return {
      DataSubmit: {
      },
      modalWidth: MODAL_WIDTH,
      ageIndex: [0, 1],
      LEVELS: ['Thấp', 'Trung Bình', 'Cao'],
      formId: null,
      MDCODES2: MDCODES2
    }
  },
  computed: {
    age () {
      if (this.$store.state.account.CurrentPatientObj && this.$store.state.account.CurrentPatientObj.DateOfBirth && this.$store.state.account.CurrentPatientObj.AdmittedDate) {
        var now = this.$store.state.account.CurrentPatientObj.AdmittedDate.split('/')
        var dob = this.$store.state.account.CurrentPatientObj.DateOfBirth.split('/')
        return this.parseInt(now[2]) - this.parseInt(dob[2])
      }
      return 'N/A'
    },
    total: function () {
      var total = 0
      MDCODES.forEach(code => {
        if (this.MASTERDATA[code]) {
          this.MASTERDATA[code].Items.forEach(item => {
            if (item.DataType === 'Radio' && item.Data && item.Value) {
              total = total + this.parseInt(item.Data)
            }
          })
        }
      })
      return total
    },
    level: function () {
      var level = 0
      var total = this.total
      if (total >= 30 && total <= 49) {
        level = 1
      }
      if (total >= 50) {
        level = 2
      }
      return level
    }
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
    this.getTotal()
    this.getMasterDatas({Form: 'IPDMMFS'}, () => {
    })
  },
  methods: {
    open (formId) {
      this.formId = formId
      // this.getData()
      this.resetMdDataValue()
      if (this.formId) {
        this.getData()
      } else {
        this.$modal.show('AdultMasterDataPopup')
        this.setAgeIndex()
      }
    },
    setAgeIndex () {
      if (this.age >= 60 && this.age < 70) {
        this.ageIndex = [2, 3]
      }
      if (this.age >= 70 && this.age < 80) {
        this.ageIndex = [4, 5]
      }
      if (this.age >= 80) {
        this.ageIndex = [6, 7]
      }
      this.MASTERDATA['IPDMMFSAGE'].Items[this.ageIndex[1]].Value = true
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            if (code === 'IPDMMFSIRPUAC' && this.age > 16) {
              item.Data = '9999'
            }
            if (code === 'IPDMMFSCONPRC' && this.age <= 16) {
              item.Data = '9999'
            }
          })
        }
      }
    },
    getData () {
      new FallRiskAssessment().find('Adult/Detail/' + this.formId).then(response => {
        this.DataSubmit = response
        this.loaded = true
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else {
                  item.Value = exited.Value
                }
              } else {
                if (code === 'IPDIAAULANGANS') {
                  item.Value = null
                }
              }
            })
          }
        }
        this.edited = false
        this.$modal.show('AdultMasterDataPopup')
        this.setAgeIndex()
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    getTotal () {
    },
    getIntervention () {
    },
    save () {
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      this.DataSubmit.Total = this.total
      this.DataSubmit.Level = this.level
      this.DataSubmit.Intervention = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (MDCODES2.includes(property)) {
              val = item.Value && item.Data[this.level] === '1'
              if (val) {
                this.DataSubmit.Intervention.push({
                  ViName: item.ViName,
                  EnName: item.EnName
                })
              }
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      var url = 'Adult/Create/' + this._VisitId
      if (this.formId) {
        url = 'Adult/Detail/' + this.formId
      }
      this.DataSubmit.Intervention = JSON.stringify(this.DataSubmit.Intervention)
      new FallRiskAssessment().update(url, this.DataSubmit).then(response => {
        this.toastedSuccess()
        setTimeout(() => {
          this.reload()
        }, 500)
      }).catch(e => {
        // this._401ResponseError(e)
      })
    }
  }
}
</script>
