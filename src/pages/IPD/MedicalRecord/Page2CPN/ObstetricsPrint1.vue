<template>
<table width="100%" class="tbl-b tbl-b3" v-if="Data && MASTERDATA">
  <tr>
    <td class="font9pt-" style="width: 50%; padding: 10px!important;vertical-align: top;">
      <table width="100%" class="tbl-b2">
        <tr>
          <td v-if="MASTERDATA['IPDMRPOCDNC']">
            19. Nơi chuyển đến<i>{{__t3('Nơi chuyển đến')}}</i>: {{MASTERDATA['IPDMRPOCDNC'].Items[0].Value}}
          </td>
          <td style="text-align: right;" v-if="MASTERDATA['IPDMRPOMICD'] && DataSubmitReadOnlyICD20"><CharWithSquare :text="getICD10Code(DataSubmitReadOnlyICD20)" :defaultlength="4"  /></td>
        </tr>
        <tr>
          <td>
            20. Khoa khám bệnh, cấp cứu<i>{{__t3('Khoa khám bệnh, cấp cứu')}}</i>: {{(Data.ReadOnly.TwentyOne && Data.ReadOnly.TwentyOne.CurrentDiagnosis) ? Data.ReadOnly.TwentyOne.CurrentDiagnosis : ''}}
          </td>
          <td style="text-align: right;"><CharWithSquare v-if="DataSubmitReadOnlyICD21" :text="(Data.ReadOnly.TwentyOne && Data.ReadOnly.TwentyOne.CurrentICD) && getICD10Code(DataSubmitReadOnlyICD21)" :defaultlength="4"  /></td>
        </tr>
        <tr>
          <td v-if="MASTERDATA['IPDMRPTCDBC']">
            21. Lúc vào đẻ<i>{{__t3('Lúc vào đẻ')}}</i>: {{MASTERDATA['IPDMRPTCDBC'].Items[0].Value}}
          </td>
          <td v-if="MASTERDATA['IPDMRPTICDC']" style="text-align: right;"><CharWithSquare :text="getICD10Code(MASTERDATA['IPDMRPTICDC'].Items[0].Value)" :defaultlength="4"  /></td>
        </tr>
        <tr>
          <td colspan="2" v-if="MASTERDATA['IPDMRPE803']">
            22. Ngày đẻ (mổ đẻ)<i>{{__t3('Ngày đẻ (mổ đẻ)')}}</i>: {{MASTERDATA['IPDMRPE803'].Items[0].Value}}
          </td>
        </tr>
        <tr>
          <td colspan="2" v-if="MASTERDATA['IPDMRPT874']">
            23. Ngôi thai<i>{{__t3('Ngôi thai')}}</i>: {{MASTERDATA['IPDMRPT874'].Items[0].Value}}
          </td>
        </tr>
        <tr>
          <td colspan="2">
            24. Cách thức đẻ<i>{{__t3('Cách thức đẻ')}}</i>: {{getCachThuc()}}
          </td>
        </tr>
        <tr>
          <td v-if="MASTERDATA['IPDMRPE848'] && MASTERDATA['IPDMRPE846']">
            <div class="mrl10">
              - Kiểm soát tử cung<i>{{__t3('Kiểm soát tử cung')}}</i>: {{MASTERDATA['IPDMRPE848'].Items[0].Value}}
            </div>
          </td>
          <td class="text-right"><VTich :t3="true" v-model="MASTERDATA['IPDMRPE846'].Items[0].Value" /></td>
        </tr>
        <tr>
          <td colspan="2" v-if="MASTERDATA['IPDMRPE898']">
            <div class="mrl10">
              <span class="mrr10">- Tai biến<i>{{__t3('Tai biến')}}</i>:</span> <VTich :t3="true" class="mrr10" v-model="MASTERDATA['IPDMRPE898'].Items[0].Value" /><br><span class="mrr10">- Biến chứng<i>{{__t3('Biến chứng')}}</i>:</span> <VTich :t3="true" v-model="MASTERDATA['IPDMRPE898'].Items[1].Value" />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2" v-if="MASTERDATA['IPDMRPE901']">
            <i><VTich :t3="true" :listData="MASTERDATA['IPDMRPE901'].Items" /></i>
          </td>
        </tr>
      </table>
    </td>
    <td class="font9pt-" style="width: 50%; padding: 10px;vertical-align: top;">
      <table width="100%" class="tbl-b2">
        <tr>
          <td colspan="2">
            <div>25. Tình hình phẫu thuật<i>{{__t3('Tình hình phẫu thuật')}}</i>:</div>
            <VTich :indexs="[0]" :t3="true" class="block" :showLabel="true" :listData="MASTERDATA['IPDMRPE885'].Items" :noneDex="true" />
            <VTich :indexs="[1]" :t3="true" class="block" :showLabel="true" :listData="MASTERDATA['IPDMRPE885'].Items" :noneDex="true" />
          </td>
        </tr>
        <!-- Chẩn đoán trước phẫu thuật -->
        <tr>
          <td v-if="MASTERDATA['IPDMRPE888']">
            + Chẩn đoán trước phẫu thuật<i>/ re-operative diagnosis</i>: {{MASTERDATA['IPDMRPE888'].Items[1].Value}}
          </td>
          <td style="text-align: right;">
            <CharWithSquare v-if="MASTERDATA['IPDMRPE888'] && !getICD10Codex2(MASTERDATA['IPDMRPE888'].Items[0].Value)" :defaultlength="4"/>
          </td>
        </tr>
        <tr :key="index" v-for="(item, index) in getICD10Codex(MASTERDATA['IPDMRPE888'].Items[0].Value)">
          <td>
            {{item.ViName}}
          </td>
          <td style="text-align: right;">
            <CharWithSquare :text="item.code" :defaultlength="4"  />
          </td>
        </tr>
        <!-- end -->
        <!-- Chẩn đoán sau phẫu thuật -->
        <tr>
          <td v-if="MASTERDATA['IPDMRPE891']">
            + Chẩn đoán sau phẫu thuật<i>/ Post-operative diagnosis</i>: {{MASTERDATA['IPDMRPE891'].Items[1].Value}}
          </td>
          <td style="text-align: right;">
            <CharWithSquare v-if="MASTERDATA['IPDMRPE891'] && !getICD10Codex2(MASTERDATA['IPDMRPE891'].Items[0].Value)" :defaultlength="4"/>
          </td>
        </tr>
        <tr :key="index" v-for="(item, index) in getICD10Codex(MASTERDATA['IPDMRPE891'].Items[0].Value)">
          <td>
            {{item.ViName}}
          </td>
          <td style="text-align: right;">
            <CharWithSquare :text="item.code" :defaultlength="4"  />
          </td>
        </tr>
        <!-- end -->
        <tr>
          <td colspan="2">
            <div>+ Phương pháp phẫu thuật<i>{{__t3('Phương pháp phẫu thuật-mdc')}}</i>:</div>
            <p class="mrl10" style="margin-bottom: 0px" v-if="MASTERDATA['IPDMRPE882'] && MASTERDATA['IPDMRPE882'].Items[1].Value">{{phuongPhap}}</p>
          </td>
        </tr>
        <template v-if="Data.Version >= 8">
          <tr>
            <td v-if="MASTERDATA['IPDMRPE812']" colspan="2">
              <div class="mrb10">
                26. Trẻ sơ sinh<i>{{__t3('Trẻ sơ sinh')}}</i>
              </div>
              <template v-for="(elm, index) in ListSoSinh">
                <div class="mrl10 mrb10" :key="index">
                  <div class="fw600">
                    {{getName(elm.Id)}}
                  </div>
                  <div>
                    <i><VTich :t3="true" class="inline" :listData="MASTERDATA[getCode('IPDMRPE812', elm.Id)].Items" /></i>
                  </div>
                  <div>
                    <div class="flex align-center space-between">
                      <div class="italic">
                        <span class="mrr10">3.Trai<i>{{__t3('Trai')}}</i></span>
                        <span class="mrr10">4.Gái<i>{{__t3('Gái')}}</i></span>
                        <br/>
                        <span class="mrr10">a - Sống<i>{{__t3('Sống')}}</i></span>
                        <span class="mrr10">b - Chết<i>{{__t3('Chết')}}</i></span>
                      </div>
                      <CharWithSquare class="block" :text="getText2(elm.Id)" :defaultlength="2"  />
                    </div>
                  </div>
                  <div>
                    <div class="flex space-between align-center">
                      <i class="block">
                        <span v-if="MASTERDATA[getCode('IPDMRPE917', elm.Id)]">5. Dị tật<i>{{__t3('Dị tật')}}</i>: {{MASTERDATA[getCode('IPDMRPE917', elm.Id)].Items[0].Value}}</span>
                      </i>
                      <VTich :t3="true" v-if="MASTERDATA[getCode('IPDMRPE915', elm.Id)]" class="block" v-model="MASTERDATA[getCode('IPDMRPE915', elm.Id)].Items[0].Value" />
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>6. Cân nặng<i>{{__t3('Cân nặng')}}</i>: {{getDataCanNang(elm.Id) || '&emsp;&emsp;'}} gram</i>
                    </div>
                  </div>
                </div>
              </template>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td v-if="MASTERDATA['IPDMRPE812']" colspan="2">
              26. Trẻ sơ sinh<i>{{__t3('Trẻ sơ sinh')}}</i>:
              <div class="mrl10">
                <i><VTich :t3="true" class="inline" :listData="MASTERDATA['IPDMRPE812'].Items" /></i>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <div class="flex align-center space-between mrl10">
                <div class="italic">
                  <span class="mrr10">3.Trai<i>{{__t3('Trai')}}</i></span>
                  <span class="mrr10">4.Gái<i>{{__t3('Gái')}}</i></span>
                  <br/>
                  <span class="mrr10">a - Sống<i>{{__t3('Sống')}}</i></span>
                  <span class="mrr10">b - Chết<i>{{__t3('Chết')}}</i></span>
                </div>
                <CharWithSquare class="block" :text="getText()" :defaultlength="2"  />
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <div class="flex space-between align-center mrl10">
                <i class="block">
                  <span v-if="MASTERDATA['IPDMRPE917']">5. Dị tật<i>{{__t3('Dị tật')}}</i>: {{MASTERDATA['IPDMRPE917'].Items[0].Value}}</span>
                </i>
                <VTich :t3="true" v-if="MASTERDATA['IPDMRPE915']" class="block" v-model="MASTERDATA['IPDMRPE915'].Items[0].Value" />
              </div>
            </td>
          </tr>
          <tr>
            <td v-if="Data && Data.DataInfor && Data.DataInfor.length">
              <div class="mrl10">
                <i>6. Cân nặng<i>{{__t3('Cân nặng')}}</i>: {{Data.DataInfor[0].Value || '&emsp;&emsp;'}} gram</i>
              </div>
            </td>
          </tr>
        </template>
      </table>
    </td>
  </tr>
  <tr>
    <td class="font9pt-" style="width: 50%; padding: 10px;vertical-align: top;">
      <div class="flex align-center" v-if="MASTERDATA['IPDMRPE896']">
        <div class="mrr10">27. Tổng số ngày điều trị sau phẫu thuật<i>{{__t3('Tổng số ngày điều trị sau phẫu thuật')}}</i>:</div>
        <div><CharWithSquare :text="MASTERDATA['IPDMRPE896'].Items[0].Value" :defaultlength="2"  /></div>
      </div>
      <TblWithMasterData
        @getCol="getCol"
        class="none"
        :FormCode="'IPDSANTHPT1'"
        :VisitId="_VisitId"
        :VisitType="'IPD'"
        :FormID="Data.Id"
        ref="TblWithMasterData"/>
    </td>
    <td class="font9pt-" style="padding: 10px;vertical-align: top;">
      <div class="flex align-center" v-if="MASTERDATA['IPDMRPE894']">
        <div class="mrr10">28. Tổng số lần phẫu thuật<i>{{__t3('Tổng số lần phẫu thuật')}}</i>: </div>
        <div><CharWithSquare :text="MASTERDATA['IPDMRPE894'].Items[0].Value" :defaultlength="2"  /></div>
      </div>
    </td>
  </tr>
</table>
</template>

<script>
import TblWithMasterData from '@/components/global/TblWithMasterData'
export default {
  name: 'ObstetricsPrint1',
  props:
  ['Data',
    'MASTERDATA',
    'DataSubmitReadOnlyICD20',
    'DataSubmitReadOnlyICD21',
    'VisitId',
    'VisitIdDrop',
    'optionChild',
    'ListSoSinh'
  ],
  components: {
    TblWithMasterData
  },
  data () {
    return {
      phuongPhap: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this.handleClear5()
    }, 500)
  },
  methods: {
    getData () {
      if (this.MASTERDATA['IPDMRPE926'] && this.MASTERDATA['IPDMRPE926'].Items[0].Value) {
        this.ListSoSinh = this.JSONParse(this.MASTERDATA['IPDMRPE926'].Items[0].Value)
      }
    },
    getICD10Code (icd) {
      var arr = this.JSONParse(icd) || []
      return arr.map(e => {
        return e.code
      }).join(',')
    },
    getCachThuc () {
      let str = ''
      if (this.MASTERDATA['IPDMRPE861']) {
        if (this.MASTERDATA['IPDMRPE861'].Items[5].Value) {
          str = this.MASTERDATA['IPDMRPE861'].Items[6].Value
        } else {
          this.MASTERDATA['IPDMRPE861'].Items.find(e => {
            if (e.Value) {
              if (e.EnName === 'Forceps') {
                str = e.ViName
              } else {
                str = e.ViName + '/ ' + e.EnName
              }
            }
          })
        }
      }
      return str
    },
    getCol (col) {
      this.phuongPhap = ''
      if (col && col.length) {
        col.forEach(e => {
          if (e.Datas && e.Datas.length) {
            e.Datas.find(elm => {
              if (elm.Code === 'IPDSANTHPT3' && elm.Value) {
                this.phuongPhap += elm.Value + '\n'
              }
            })
          }
        })
      }
    },
    getText () {
      let text = ''
      if (this.MASTERDATA['IPDMRPE919'] && this.MASTERDATA['IPDMRPE919'].Items[0].Value) {
        text = '3'
      }
      if (this.MASTERDATA['IPDMRPE919'] && this.MASTERDATA['IPDMRPE919'].Items[1].Value) {
        text = '4'
      }
      if (this.MASTERDATA['IPDMRPE922'] && this.MASTERDATA['IPDMRPE922'].Items[0].Value) {
        text = '3'
      }
      if (this.MASTERDATA['IPDMRPE922'] && this.MASTERDATA['IPDMRPE922'].Items[1].Value) {
        text = '4'
      }
      if (this.MASTERDATA['IPDMRPE922'] && this.MASTERDATA['IPDMRPE922'].Items[0].Value && this.MASTERDATA['IPDMRPE922'].Items[1].Value) {
        text = '34'
      }
      if (this.MASTERDATA['IPDMRPE809'] && this.MASTERDATA['IPDMRPE809'].Items[0].Value) {
        text += 'a'
      }
      if (this.MASTERDATA['IPDMRPE809'] && this.MASTERDATA['IPDMRPE809'].Items[1].Value) {
        text += 'b'
      }
      return text
    },
    getText2 (Id) {
      let text = ''
      if (this.MASTERDATA[this.getCode('IPDMRPE919', Id)] && this.MASTERDATA[this.getCode('IPDMRPE919', Id)].Items[0].Value) {
        text = '3'
      }
      if (this.MASTERDATA[this.getCode('IPDMRPE919', Id)] && this.MASTERDATA[this.getCode('IPDMRPE919', Id)].Items[1].Value) {
        text = '4'
      }
      if (this.MASTERDATA[this.getCode('IPDMRPE922', Id)] && this.MASTERDATA[this.getCode('IPDMRPE922', Id)].Items[0].Value) {
        text = '3'
      }
      if (this.MASTERDATA[this.getCode('IPDMRPE922', Id)] && this.MASTERDATA[this.getCode('IPDMRPE922', Id)].Items[1].Value) {
        text = '4'
      }
      if (this.MASTERDATA[this.getCode('IPDMRPE922', Id)] && this.MASTERDATA[this.getCode('IPDMRPE922', Id)].Items[0].Value && this.MASTERDATA[this.getCode('IPDMRPE922', Id)].Items[1].Value) {
        text = '34'
      }
      if (this.MASTERDATA[this.getCode('IPDMRPE809', Id)] && this.MASTERDATA[this.getCode('IPDMRPE809', Id)].Items[0].Value) {
        text += 'a'
      }
      if (this.MASTERDATA[this.getCode('IPDMRPE809', Id)] && this.MASTERDATA[this.getCode('IPDMRPE809', Id)].Items[1].Value) {
        text += 'b'
      }
      return text
    },
    getICD10Codex2 (icd) {
      let check = false
      if (icd) {
        if (this.JSONParse(icd)) {
          check = true
        }
      }
      return check
    },
    getICD10Codex (icd) {
      if (icd) {
        return this.JSONParse(icd, true)
      }
    },
    handleClear5 () {
      if (this.MASTERDATA['IPDMRPE882'] && !this.MASTERDATA['IPDMRPE882'].Items[1].Value) {
        let group = ['IPDMRPE885', 'IPDMRPE888', 'IPDMRPE891', 'IPDMRPE894', 'IPDMRPE896', 'IPDMRPE898', 'IPDMRPE901']
        group.forEach(elm => {
          if (this.MASTERDATA[elm]) {
            this.MASTERDATA[elm].Items.forEach(e => {
              if (e.DataType === 'Radio') {
                e.Value = false
              } else if (e.DataType === 'Checkbox') {
                e.Value = false
              } else {
                e.Value = ''
              }
            })
          }
        })
        setTimeout(() => {
          this.phuongPhap = ''
        }, 500)
      }
    },
    getName (Id) {
      let str = ''
      if (this.optionChild && this.optionChild.length) {
        this.optionChild.find(e => {
          if (e.Newborn && e.Newborn.Id && e.Newborn.Id === Id) {
            str = e.Newborn.FullNameNewborn
          }
        })
      }
      return str
    },
    getCode (code, Id) {
      // return code
      return code + '_' + Id
    },
    getDataCanNang (Id) {
      let cannang = ''
      if (this.optionChild && this.optionChild.length && Id) {
        this.optionChild.find(e => {
          if (e.Newborn && e.Newborn.Id === Id) {
            cannang = e.Datas.CanNang
          }
        })
      }
      return cannang
    }
  }
}
</script>
