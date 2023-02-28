<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" id="printMe">
      <div class="form-print">
        <template v-if="hasData">
          <table class="table" style="width: 100%">
            <tr>
              <td width="30%"  style="vertical-align: top;" align="top">
                <p><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></p>
              </td>
              <td style="vertical-align: top;" align="top">
                <div>
                  <div class="fw600 text-center" style="font-size: 25px;white-space: nowrap;">PHIẾU CAM KẾT PHẪU THUẬT/ THỦ THUẬT/<br> ĐIỀU TRỊ NGUY CƠ CAO</div>
                  <div class="text-center italic" style="font-size: 20px;white-space: nowrap;">CONSENT FOR OPERATION/ PROCEDURE/<br> HIGH RISK TREATMENT</div>
                </div>
              </td>
            </tr>
          </table>
          <div class="fs16 fw600 mrt10">1. THÔNG TIN NGƯỜI BỆNH/ <i>PATIENT’S INFORMATION</i>:</div>
          <div class="box-center mrt10" style="border: 1px solid black; padding: 5px; width: 307px;">
            <div class="flex" style="justify-content: center;">
              <VueBarcode v-if="DataSubmit.PID" v-bind:value="DataSubmit.PID" :height="40" :displayValue="false" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
            </div>
            <div class="mrt10">Họ và tên/ <i>Full name</i>: {{DataSubmit.FullNameNB || 'N/A'}}</div>
            <div class="mrt10">Số PID/ <i>PID No</i>: {{DataSubmit.PID || 'N/A'}}</div>
            <div class="mrt10">Ngày tháng năm sinh/ <i>Date of birth</i>: {{DataSubmit.DateOfBirth ? getFTime2(DataSubmit.DateOfBirth) : 'N/A'}}</div>
            <div>Giới tính/ <i>Gender</i>: {{GENDER[DataSubmit.Gender] || 'N/A'}}</div>
          </div>
          <div class="fs16 fw600 mrt10">2. CAM KẾT CỦA NGƯỜI BỆNH/ NGƯỜI ĐẠI DIỆN/ <i>CONSENT OF THE PATIENT/ REPRESENTATIVE</i>:</div>
          <div class="mrt10">{{Vi('PCKPTTT7')}} <i>{{En('PCKPTTT7')}}</i>:</div>
          <div class="pre-line">{{getValueOfMASTERDATA('PCKPTTT7', 'PCKPTTT8')}}</div>
          <div class="mrt10">{{Vi('PCKPTTT9')}} <i>{{En('PCKPTTT9')}}</i></div>
          <div class="mrl10 mrt10">
            <div class="mrt10">i. {{Vi('PCKPTTT11')}} <i>{{En('PCKPTTT11')}}</i>
              <span v-if="_VisitType === 'IPD'">{{getChuanDoan(DataSubmit)}}</span>
              <span v-else>{{getChuanDoan2(DataSubmit)}}</span>
            </div>
            <div class="mrt10 justify">ii. {{Vi('PCKPTTT12')}} <i>{{En('PCKPTTT12')}}</i>.</div>
            <div class="mrt10 justify">iii. {{Vi('PCKPTTT13')}} <i>{{En('PCKPTTT13')}}</i>.</div>
            <div class="mrt10">{{Vi('PCKPTTT14')}} <i>{{En('PCKPTTT14')}}</i>:</div>
            <div class="pre-line">{{getValueOfMASTERDATA('PCKPTTT14', 'PCKPTTT15')}}</div>
            <div class="mrt10">{{Vi('PCKPTTT16')}} <i>{{En('PCKPTTT16')}}</i>:</div>
            <div class="pre-line">{{getValueOfMASTERDATA('PCKPTTT16', 'PCKPTTT17')}}</div>
            <div class="mrt10 justify">iv. {{Vi('PCKPTTT18')}} <i>{{En('PCKPTTT18')}}</i>.</div>
            <div class="pre-line">{{getValueOfMASTERDATA('PCKPTTT18', 'PCKPTTT19')}}</div>
            <div class="mrt10">v. {{Vi('PCKPTTT20')}} <i>{{En('PCKPTTT20')}}</i>.</div>
            <div class="pre-line">{{getValueOfMASTERDATA('PCKPTTT20', 'PCKPTTT21')}}</div>
            <div class="mrt10">vi. {{Vi('PCKPTTT22')}} <i>{{En('PCKPTTT22')}}</i>.</div>
            <div class="pre-line">{{getValueOfMASTERDATA('PCKPTTT22', 'PCKPTTT23')}}</div>
            <div class="mrt10 justify">vii. {{Vi('PCKPTTT24')}} <i>{{En('PCKPTTT24')}}</i>.</div>
            <div class="pre-line">{{getValueOfMASTERDATA('PCKPTTT24', 'PCKPTTT25')}}</div>
          </div>
          <div class="mrt10 justify">{{Vi('PCKPTTT26')}} <i>{{En('PCKPTTT26')}}</i>.</div>
          <div class="mrt10 justify">{{Vi('PCKPTTT28')}} <i>{{En('PCKPTTT28')}}</i>.</div>
          <div class="mrt10 justify">{{Vi('PCKPTTT30')}} <i>{{En('PCKPTTT30')}}</i>.</div>
          <div class="mrt10 justify">{{Vi('PCKPTTT31')}} <i>{{En('PCKPTTT31')}}</i>.</div>
          <div class="mrt10">
            <table class="tbl-b tbl-c" style="width: 100%">
              <tr>
                <td></td>
                <td width="230px" class="text-center">Đồng ý (Chỉ tick nếu người bệnh đồng ý)/ <i>Agrees (Only tick if patient agrees)</i></td>
              </tr>
              <template v-for="(e, index) in MASTERDATA['PCKPTTT32'].Items">
                <tr :key="index">
                  <td>
                    <div class="flex" style="padding: 5px;">
                      <div v-if="MASTERDATA['PCKPTTT32']" style="width: 500px;">
                        {{e.ViName}}/ <i>{{e.EnName}}</i>
                      </div>
                    </div>
                  </td>
                  <td align="center">
                    <VTich2 v-model="e.Value" />
                  </td>
                </tr>
              </template>
            </table>
          </div>
          <div class="mrt10">{{Vi('PCKPTTT37')}} <i>{{En('PCKPTTT37')}}</i>.</div>
          <div class="mrt10">{{Vi('PCKPTTT38')}} <i>{{En('PCKPTTT38')}}</i>.</div>
          <div class="mrt10">
            <div style="float: right;" v-if="Date1 && House1 && House1.length && Date1.length">Thời gian/ <i>Time</i>: {{House1[0] ? House1[0] : `&emsp;&emsp;`}}:{{House1[1] ? House1[1] : `&emsp;&emsp;`}}, ngày/ <i>date</i>: {{Date1[0] ? Date1[0] : `&emsp;&emsp;`}}/{{Date1[1] ? Date1[1] : `&emsp;&emsp;`}}/{{Date1[2] ? Date1[2] : `&emsp;&emsp;`}}</div>
            <div style="float: right;" v-else>Thời gian/ <i>Time</i>: {{`&emsp;&emsp;`}}, ngày/ <i>date</i>: {{`&emsp;&emsp;`}}/{{`&emsp;&emsp;`}}/20{{`&emsp;&emsp;`}};</div>
            <br/>
          </div>
          <div class="fs16 fw600 mrt10">2.1. XÁC NHẬN CỦA NGƯỜI BỆNH/ NGƯỜI ĐẠI DIỆN/ <i>PATIENT/ REPRESENTATIVE’S CONFIRMATION</i>:</div>
          <div class="mrt10 justify">{{Vi('PCKPTTT42')}} <i>{{En('PCKPTTT42')}}</i>:</div>
          <div class="mrt10" v-if="getValueOfMASTERDATA('PCKPTTT3', 'PCKPTTT4')">
            <div class="flex align-center mrt10">
              <div class="mrr100">
                Họ tên của người bệnh/ <i>Patient’s name</i>: {{getNBorDD()}}
              </div>
              <div>
                Chữ ký/ <i>Signature</i>:
              </div>
            </div>
          </div>
          <div class="flex align-center mrt10" v-if="getValueOfMASTERDATA('PCKPTTT3', 'PCKPTTT5')">
            <div class="mrr100">
              Người đại diện/ <i>Representative’s name</i>: {{getNBorDD()}}
            </div>
            <div>
              Chữ ký/ <i>Signature</i>:
            </div>
          </div>
          <div class="mrt10" v-if="getValueOfMASTERDATA('PCKPTTT3', 'PCKPTTT5')">
            ({{Vi('PCKPTTT76')}} <i>{{En('PCKPTTT76')}}</i>: {{getValueOfMASTERDATA('PCKPTTT3', 'PCKPTTT5') ? getNameDaiDien() : ''}})
          </div>
          <div class="fs16 fw600 mrt10">2.2. XÁC NHẬN CỦA PHIÊN DỊCH VIÊN (nếu có)/ <i>TRANSLATOR’S CONFIRMATION (if applicable)</i>:</div>
          <div class="mrt10 justify">Tôi đã phiên dịch trung thực, khách quan, đúng nghĩa toàn bộ nội dung bản cam kết này cho {{getTextVi()}} và phiên dịch đầy đủ những trao đổi bằng lời nói hay văn bản giữa bác sĩ và {{getTextVi()}}/ <i>I have made my best effort to translate all the information and assure that the {{getTextEn()}} can understand</i>.</div>
          <div class="flex align-center mrt10">
            <div class="mrr100">
              {{Vi('PCKPTTT45')}} <i>{{En('PCKPTTT45')}}</i>: {{getValueOfMASTERDATA('PCKPTTT45', 'PCKPTTT46')}}
            </div>
            <div>
              Chữ ký/ <i>Signature</i>:
            </div>
          </div>
          <div class="fs16 fw600 mrt10 white-space">2.3. XÁC NHẬN CỦA BÁC SĨ/ PHẪU THUẬT VIÊN/ <i>PHYSICIAN’S/ SURGEON’S CONFIRMATION</i>:</div>
          <div class="mrt10 justify">Tôi đã giải thích cho {{getTextVi()}} về bản chất, lợi ích, rủi ro của phương pháp phẫu thuật/ thủ thuật/ điều trị có nguy cơ cao cũng như các phương pháp điều trị thay thế (nếu có)/ <i>I have explained to the {{getTextEn()}} the nature, benefits, risks of the above-mentioned operation/ procedure/ treatment as well as other alternative solutions (if any)</i>.</div>
          <div class="flex align-center mrt10">
            <div class="mrr50">
              {{Vi('PCKPTTT50')}} <i>{{En('PCKPTTT50')}}</i>: {{DataSubmit.CreatedByFullName}}
            </div>
            <div>
              Chữ ký/ <i>Signature</i>:
            </div>
          </div>
          <div class="mrt10" v-if="getValueOfMASTERDATA('PCKPTTT55', 'PCKPTTT56')">{{Vi('PCKPTTT55')}} <i>{{En('PCKPTTT55')}}</i>:</div>
          <div class="pre-line">{{getValueOfMASTERDATA('PCKPTTT55', 'PCKPTTT68')}}</div>
          <div></div>
          <div class="fs16 fw600 mrt10 white-space">3. XÁC NHẬN HUỶ CAM KẾT ĐÃ KÝ (nếu áp dụng)/ <i>WITHDRAWAL OF PATIENT CONSENT (if applicable)</i>:</div>
          <div class="mrt10 justify">{{Vi('PCKPTTT58')}} <i>{{En('PCKPTTT58')}}</i>.</div>
          <div class="mrt10 flex" style="justify-content: end;">
            <div v-if="Date2 && House2 && House2.length && Date2.length">Thời gian/ <i>Time</i>: {{House2[0] ? House2[0] : `&emsp;&emsp;`}}:{{House2[1] ? House2[1] : `&emsp;&emsp;`}}, ngày/ <i>date</i>: {{Date2[0] ? Date2[0] : `&emsp;&emsp;`}}/{{Date2[1] ? Date2[1] : `&emsp;&emsp;`}}/{{Date2[2] ? Date2[2] : `&emsp;&emsp;`}}</div>
            <div v-else>Thời gian/ <i>Time</i>: {{`&emsp;&emsp;`}}, ngày/ <i>date</i>: {{`&emsp;&emsp;`}}/{{`&emsp;&emsp;`}}/20{{`&emsp;&emsp;`}};</div>
            <br/>
          </div>
          <div class="flex align-center mrt10" v-if="getValueOfMASTERDATA('PCKPTTT3', 'PCKPTTT4') || getValueOfMASTERDATA('PCKPTTT3', 'PCKPTTT5')">
            <div class="mrr100">
              <span v-if="getValueOfMASTERDATA('PCKPTTT3', 'PCKPTTT4')">
                Họ tên của người bệnh/ <i>Patient’s name</i>: {{getNBorDD()}}
              </span>
              <span v-if="getValueOfMASTERDATA('PCKPTTT3', 'PCKPTTT5')">
                Người đại diện/ <i>Representative’s name</i>: {{getNBorDD()}}
              </span>
            </div>
            <div>
              Chữ ký/ <i>Signature</i>:
            </div>
          </div>
          <div class="mrt10" v-if="getValueOfMASTERDATA('PCKPTTT3', 'PCKPTTT5')">
            ({{Vi('PCKPTTT76')}} <i>{{En('PCKPTTT76')}}</i>: {{getNameDaiDien()}})
          </div>
          <div class="flex align-center mrt10">
            <div class="mrr50">
              {{Vi('PCKPTTT64')}} <i>{{En('PCKPTTT64')}}</i>: {{DataSubmit.CreatedByFullName}}
            </div>
            <div>
              Chữ ký/ <i>Signature</i>:
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="a4-page code-form">A01_001_080721_V</div>
  </div>
</template>

<script>
import _ from 'lodash'
import constants from '@/constants'
import MixinMasterData from '@/mixins/masterdata.js'
import VueBarcode from 'vue-barcode'
import ConsentForOperationOrrProcedure from '@/services/ConsentForOperationOrrProcedure'
const GENDER = constants.GENDER
export default {
  name: 'ConsentForOperation-Print',
  props: ['viewOnly', 'VisitId', 'VisitType'],
  mixins: [MixinMasterData],
  components: {
    VueBarcode
  },
  data () {
    return {
      GENDER: GENDER,
      DataSubmit: null,
      hasData: false,
      icd10Code: ['PCKPTTT67']
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'PCKPTTT'}, () => {
      this.getData()
    })
  },
  computed: {
    Date1: function () {
      return (this.MASTERDATA['PCKPTTT39'] && this.MASTERDATA['PCKPTTT39'].Items[0].Value) ? this.getFTime(this.MASTERDATA['PCKPTTT39'].Items[0].Value).split(' ')[1].split('/') : ['', '', '']
    },
    House1: function () {
      return (this.MASTERDATA['PCKPTTT39'] && this.MASTERDATA['PCKPTTT39'].Items[0].Value) ? this.getFTime(this.MASTERDATA['PCKPTTT39'].Items[0].Value).split(' ')[0].split(':') : ['', '']
    },
    Date2: function () {
      return (this.MASTERDATA['PCKPTTT59'] && this.MASTERDATA['PCKPTTT59'].Items[0].Value) ? this.getFTime(this.MASTERDATA['PCKPTTT59'].Items[0].Value).split(' ')[1].split('/') : ['', '', '']
    },
    House2: function () {
      return (this.MASTERDATA['PCKPTTT59'] && this.MASTERDATA['PCKPTTT59'].Items[0].Value) ? this.getFTime(this.MASTERDATA['PCKPTTT59'].Items[0].Value).split(' ')[0].split(':') : ['', '']
    }
  },
  methods: {
    async getData () {
      await new ConsentForOperationOrrProcedure({}, this._VisitType).find('Get' + '/' + this._VisitId + '?hidemsg=' + true).then(res => {
        this.DataSubmit = res.data
        this.mapData()
      }).catch((e) => {
        this.DataSubmit = null
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
    },
    Vi (code, index) {
      if (this.MASTERDATA[code]) {
        if (index) {
          return this.MASTERDATA[code].Items[index].ViName
        }
        return this.MASTERDATA[code].ViName
      }
    },
    En (code, index) {
      if (this.MASTERDATA[code]) {
        if (index) {
          if (this.MASTERDATA[code].Items[index].EnName.includes('a. ')) {
            return '/ ' + this.MASTERDATA[code].Items[index].EnName.split('a. ')[1]
          }
          if (this.MASTERDATA[code].Items[index].EnName.includes('b. ')) {
            return '/ ' + this.MASTERDATA[code].Items[index].EnName.split('b. ')[1]
          }
          if (this.MASTERDATA[code].Items[index].EnName.includes('c. ')) {
            return '/ ' + this.MASTERDATA[code].Items[index].EnName.split('c. ')[1]
          }
          if (this.MASTERDATA[code].Items[index].EnName.includes('d. ')) {
            return '/ ' + this.MASTERDATA[code].Items[index].EnName.split('d. ')[1]
          }
          if (this.MASTERDATA[code].Items[index].EnName.includes('e. ')) {
            return '/ ' + this.MASTERDATA[code].Items[index].EnName.split('e. ')[1]
          }
          if (this.MASTERDATA[code].Items[index].EnName.includes('f. ')) {
            return '/ ' + this.MASTERDATA[code].Items[index].EnName.split('f. ')[1]
          }
          if (this.MASTERDATA[code].Items[index].EnName.includes('g. ')) {
            return '/ ' + this.MASTERDATA[code].Items[index].EnName.split('g. ')[1]
          }
          if (this.MASTERDATA[code].Items[index].EnName.includes('h. ')) {
            return '/ ' + this.MASTERDATA[code].Items[index].EnName.split('h. ')[1]
          }
          return '/ ' + this.MASTERDATA[code].Items[index].EnName
        }
        if (this.MASTERDATA[code].EnName.includes('a. ')) {
          return '/ ' + this.MASTERDATA[code].EnName.split('a. ')[1]
        }
        if (this.MASTERDATA[code].EnName.includes('b. ')) {
          return '/ ' + this.MASTERDATA[code].EnName.split('b. ')[1]
        }
        if (this.MASTERDATA[code].EnName.includes('c. ')) {
          return '/ ' + this.MASTERDATA[code].EnName.split('c. ')[1]
        }
        if (this.MASTERDATA[code].EnName.includes('d. ')) {
          return '/ ' + this.MASTERDATA[code].EnName.split('d. ')[1]
        }
        if (this.MASTERDATA[code].EnName.includes('e. ')) {
          return '/ ' + this.MASTERDATA[code].EnName.split('e. ')[1]
        }
        if (this.MASTERDATA[code].EnName.includes('f. ')) {
          return '/ ' + this.MASTERDATA[code].EnName.split('f. ')[1]
        }
        if (this.MASTERDATA[code].EnName.includes('g. ')) {
          return '/ ' + this.MASTERDATA[code].EnName.split('g. ')[1]
        }
        if (this.MASTERDATA[code].EnName.includes('h. ')) {
          return '/ ' + this.MASTERDATA[code].EnName.split('h. ')[1]
        }
        return '/ ' + this.MASTERDATA[code].EnName
      }
    },
    getNameDaiDien () {
      let name = ''
      if (this.MASTERDATA['PCKPTTT3']) {
        if (this.MASTERDATA['PCKPTTT3'].Items[3].Value && this.MASTERDATA['PCKPTTT3'].Items[3].Value !== 'Khác/Other') {
          name = this.MASTERDATA['PCKPTTT3'].Items[3].Value
        }
        if (this.MASTERDATA['PCKPTTT3'].Items[3].Value && this.MASTERDATA['PCKPTTT3'].Items[3].Value === 'Khác/Other') {
          name = this.MASTERDATA['PCKPTTT3'].Items[4].Value
        }
      }
      return name
    },
    getNBorDD () {
      let name = ''
      if (this.MASTERDATA['PCKPTTT3']) {
        if (this.MASTERDATA['PCKPTTT3'].Items[0].Value) {
          name = this.DataSubmit.FullNameNB
        }
        if (this.MASTERDATA['PCKPTTT3'].Items[1].Value) {
          name = this.MASTERDATA['PCKPTTT3'].Items[2].Value
        }
      }
      return name
    },
    getTextVi () {
      let str = 'người bệnh'
      if (this.MASTERDATA['PCKPTTT3']) {
        if (this.MASTERDATA['PCKPTTT3'].Items[0].Value) {
          str = 'người bệnh'
        }
        if (this.MASTERDATA['PCKPTTT3'].Items[1].Value) {
          str = 'người đại diện'
        }
      }
      return str
    },
    getTextEn () {
      let str = 'patient'
      if (this.MASTERDATA['PCKPTTT3']) {
        if (this.MASTERDATA['PCKPTTT3'].Items[0].Value) {
          str = 'patient'
        }
        if (this.MASTERDATA['PCKPTTT3'].Items[1].Value) {
          str = 'representative'
        }
      }
      return str
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
