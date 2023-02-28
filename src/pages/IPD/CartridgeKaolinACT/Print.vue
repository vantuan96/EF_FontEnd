<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" id="printMe">
      <div class="form-print">
        <template v-if="hasData">
          <table class="table" style="width: 100%;margin-bottom: 0px!important;">
            <tr>
              <td width="100%" class="text-center" style="vertical-align: top;" align="top">
                <p><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></p>
              </td>
            </tr>
          </table>
          <div class="box-center mrt10" style="border: 1px solid black; padding: 5px; width: 307px;">
            <div class="flex" style="justify-content: center;">
              <VueBarcode v-if="DataSubmit.PID" v-bind:value="DataSubmit.PID" :height="40" :displayValue="false" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
            </div>
            <div class="mrt10">Họ và tên/ <i>Patient's Name</i>: {{DataSubmit.FullNameNB || 'N/A'}}</div>
            <div class="mrt10">Số PID/ <i>PID</i>: {{DataSubmit.PID || 'N/A'}}</div>
            <div class="mrt10">Ngày tháng năm sinh/ <i>Date of birth</i>: {{DataSubmit.DateOfBirth ? getFTime2(DataSubmit.DateOfBirth) : 'N/A'}}</div>
            <div class="mrt10">Giới tính/ <i>Gender</i>: {{GENDER[DataSubmit.Gender] || 'N/A'}}</div>
          </div>
          <div class="mrt20 mrb10 cap text-center fw600 fs16">Xét nghiệm tại chỗ</div>
          <div class="fw600 mrt10 text-center">Đông máu ACT/ Coagulation ACT (Catridge Kaolin ACT)</div>
          <div class="cap mrt10  text-center">KHOA/ <i>Department</i>: {{DataSubmit.Specialty.ViName}}/ <i>{{DataSubmit.Specialty.EnName}}</i></div>
          <table class="tbl-b tbl-c mrt10" style="width: 100%">
            <tr>
              <td class="text-center content-center fw600" rowspan="2" width="80px" style="padding-top: 9px!important;">Thông số/ <i>Parameter</i></td>
              <td class="text-center content-center fw600" rowspan="2" width="100px" style="padding-top: 9px!important;">Khoảng tham chiếu/ <i>Reference Interval</i></td>
              <td class="text-center fw600" colspan="2" width="90px" style="padding-top: 9px!important;">Chỉ số báo động/ <i>Critical Result</i></td>
              <td class="text-center fw600" colspan="3" style="border-bottom-width: 1px!important;">Kết quả/ <i>Result</i></td>
            </tr>
            <tr>
              <td class="text-center" width="80px">Giá trị thấp/ <i>Low value</i></td>
              <td class="text-center" width="80px">Giá trị cao/ <i>High value</i></td>
              <td class="text-center" width="80px">Kết quả/ <i>Result</i></td>
              <td class="text-center" width="80px">Đơn vị/ <i>Unit</i></td>
              <td class="text-center"></td>
            </tr>
            <tr style="height: 200px;">
              <td class="text-center">Thời gian đông máu - ACT (Kaolin ACT)</td>
              <td class="text-center">82 - 152</td>
              <td class="text-center">NA</td>
              <td class="text-center">≥ 240</td>
              <td class="text-center">{{getValueOfMASTERDATA('HLQDMACT01', 'HLQDMACT02')}}</td>
              <td class="text-center">giây/<br/><i>seconds</i></td>
              <td class="text-center" style="color: rgb(217 214 214);">
                Dán kết quả
              </td>
            </tr>
          </table>
          <div class="box-ngang mrt20">
            <div>
              <div v-if="Date1 && House1 && House1.length && Date1.length && Technician && Technician.ConfirmAt && Version >= 7">Thời gian/ <i>Time</i>: {{House1[0] ? House1[0] : `&emsp;&emsp;`}}:{{House1[1] ? House1[1] : `&emsp;&emsp;`}}, ngày/ <i>date</i>: {{Date1[0] ? Date1[0] : `&emsp;&emsp;`}}/{{Date1[1] ? Date1[1] : `&emsp;&emsp;`}}/{{Date1[2] ? Date1[2] : `&emsp;&emsp;`}}</div>
              <div v-else>Thời gian/ <i>Time</i>: {{`&emsp;&emsp;`}}, ngày/ <i>date</i>: {{`&emsp;&emsp;`}}/{{`&emsp;&emsp;`}}/{{`&emsp;&emsp;`}};</div>
              <div class="fw600 text-center">Người làm xét nghiệm/ <i>Technician</i></div>
              <br/>
              <br/>
              <br/>
              <div class="fw600 text-center" v-if="Technician && Technician.ConfirmAt && Version >= 7">{{Technician ? Technician.Note : ''}}</div>
              <div class="fw600 text-center" v-else-if="Version < 7">{{DataSubmit.FullNameUpdatedBy || DataSubmit.FullNameCreatedBy}}</div>
            </div>
            <div>
              <div v-if="Date2 && House2 && House2.length && Date2.length">Thời gian/ <i>Time</i>: {{House2[0] ? House2[0] : `&emsp;&emsp;`}}:{{House2[1] ? House2[1] : `&emsp;&emsp;`}}, ngày/ <i>date</i>: {{Date2[0] ? Date2[0] : `&emsp;&emsp;`}}/{{Date2[1] ? Date2[1] : `&emsp;&emsp;`}}/{{Date2[2] ? Date2[2] : `&emsp;&emsp;`}}</div>
              <div v-else>Thời gian/ <i>Time</i>: {{`&emsp;&emsp;`}}, ngày/ <i>date</i>: {{`&emsp;&emsp;`}}/{{`&emsp;&emsp;`}}/20{{`&emsp;&emsp;`}};</div>
              <div class="fw600 text-center">Bác sĩ chỉ định/ <i>Referring Physician</i></div>
              <br/>
              <br/>
              <br/>
              <div class="fw600 text-center">{{ReferringPhysician ? ReferringPhysician.Note : ''}}</div>
            </div>
          </div>
          <div class="BreakPage"></div>
          <div>Dán kết quả</div>
          <div v-if="MASTERDATA['HLQDMACT03']">
            <template v-for="(val, index) in MASTERDATA['HLQDMACT03'].Items[0].Value">
              <div :key="index" class="mrb10 text-center">
                <img :src="val" style="width: 100%;height: 420px;"/>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <div class="a4-page code-form">A03_041_080322_V</div>
  </div>
</template>

<script>
import _ from 'lodash'
import VueBarcode from 'vue-barcode'
import constants from '@/constants'
import API from '@/services/API'
import MixinMasterData from '@/mixins/masterdata.js'
const GENDER = constants.GENDER
export default {
  props: ['viewOnly', 'VisitId', 'VisitType', 'formId', 'Version', 'Technician'],
  name: 'CartridgeKaolinACT-print',
  mixins: [MixinMasterData],
  components: {
    VueBarcode
  },
  data () {
    return {
      GENDER: GENDER,
      DataSubmit: {},
      ReferringPhysician: {},
      hasData: false,
      icd10Code: ['HLQDMACT04']
    }
  },
  watch: {
    formId: function (val) {
      if (val) {
        this._ItemId = val
        this.getData()
      }
    }
  },
  computed: {
    _ItemId: function () {
      return this.formId || this.$route.params.Item
    },
    Date1: function () {
      if (this.DataSubmit) {
        if (this.DataSubmit.UpdatedAt) {
          return this.getFTime(this.DataSubmit.UpdatedAt).split(' ')[1].split('/')
        }
        if (this.DataSubmit.CreatedAt) {
          return this.getFTime(this.DataSubmit.CreatedAt).split(' ')[1].split('/')
        }
      }
      return ['', '', '']
    },
    House1: function () {
      if (this.DataSubmit) {
        if (this.DataSubmit.UpdatedAt) {
          return this.getFTime(this.DataSubmit.UpdatedAt).split(' ')[0].split(':')
        }
        if (this.DataSubmit.CreatedAt) {
          return this.getFTime(this.DataSubmit.CreatedAt).split(' ')[0].split(':')
        }
      }
      return ['', '']
    },
    Date2: function () {
      return (this.ReferringPhysician && this.ReferringPhysician.ConfirmAt) ? this.getFTime(this.ReferringPhysician.ConfirmAt).split(' ')[1].split('/') : ['', '', '']
    },
    House2: function () {
      return (this.ReferringPhysician && this.ReferringPhysician.ConfirmAt) ? this.getFTime(this.ReferringPhysician.ConfirmAt).split(' ')[0].split(':') : ['', '']
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'HLQDMACT'}, () => {
      this.getData()
    })
  },
  methods: {
    getData () {
      new API().find('GetDetail/' + this._VisitType + '/A03_041_080322_V/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true).then(res => {
        this.DataSubmit = res.data
        if (res.data && res.data.ConfirmInfos && res.data.ConfirmInfos.length) {
          res.data.ConfirmInfos.find(e => {
            if (e.ConfirmType === 'ReferringPhysician') {
              this.ReferringPhysician = e
            }
          })
        }
        this.mapData()
      }).catch((e) => {
        console.log(e)
      })
    },
    mapData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (this.icd10Code.includes(item.Code)) {
                item.Value = this.JSONParse(exited.Value || [], true)
              } else {
                item.Value = exited.Value
              }
            } else {
              item.Value = null
            }
          })
        }
      }
      this.hasData = true
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
