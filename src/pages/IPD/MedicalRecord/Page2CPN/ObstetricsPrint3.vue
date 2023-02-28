<template>
<table width="100%" class="tbl-b2" v-if="box1 && Data && MASTERDATA">
  <tr>
    <td colspan="2">
      <template>
        <p class="fw600" style="font-size: 18px;">IV. Theo dõi tại buồng đẻ<i>/ Monitoring in labour ward</i></p>
        <p>- Vào buồng đẻ lúc<i>/ Admitted to labour ward at</i>: {{getValueOfMASTERDATA('IPDMRPE801', 'IPDMRPE802')}}</p>
        <VNameCD2 v-if="MASTERDATA['IPDMRPE805']" :print="true" :t3="true" :widthCD="[{width: '80px'}, {width: '300px'}]" :label="MASTERDATA['IPDMRPE805']" :readonly="true" v-model="MASTERDATA['IPDMRPE805'].Items[0].Value"/>
        <p class="mrt10"><b>1. Đặc điểm trẻ sơ sinh<i>/ Newborn characteristics</i>:</b></p>
        <template v-if="Data.Version >= 8">
          <template v-if="ListSoSinh" v-for="(elm, index) in ListSoSinh">
            <div :key="index" style="padding-left: 10px;">
              <div class="fw600" style="margin-left: -10px;">{{getName(elm.Id)}}</div>
              <div class="mrb10">
                <div class="mrr10 line-height inline-block" v-if="MASTERDATA[getCode('IPDMRPE803', elm.Id)]">- Đẻ lúc<i>/ Delivery at</i>: {{MASTERDATA[getCode('IPDMRPE803', elm.Id)].Items[0].Value}}</div>
                <div class="mrr10 line-height inline-block" v-if="MASTERDATA[getCode('IPDMRPE907', elm.Id)]">- Apgar: 1 phút<i>/ minute</i>: {{MASTERDATA[getCode('IPDMRPE907', elm.Id)].Items[0].Value || '&emsp;&emsp;'}} điểm<i>/ score</i></div>
                <div class="mrr10 line-height inline-block" v-if="MASTERDATA[getCode('IPDMRPE909', elm.Id)]">5 phút<i>/ minute</i>: {{MASTERDATA[getCode('IPDMRPE909', elm.Id)].Items[0].Value || '&emsp;&emsp;'}} điểm<i>/ score</i></div>
                <div class="line-height inline-block" v-if="MASTERDATA[getCode('IPDMRPE911', elm.Id)]">10 phút<i>/ minute</i>: {{MASTERDATA[getCode('IPDMRPE911', elm.Id)].Items[0].Value || '&emsp;&emsp;'}} điểm<i>/ score</i></div>
              </div>
              <div class="mrb10">
                <div class="mrr10 inline-block">- Cân nặng<i>/ Weight</i>: {{getDatasCoThe('CanNang', elm.Id) || ' &emsp; '}} gram</div>
                <div class="mrr10 inline-block">Cao<i>/ Height</i>: {{getDatasCoThe('ChieuCao', elm.Id) || ' &emsp; '}} cm,</div>
                <div class="inline-block">Vòng đầu<i>/ Head circumference</i>: {{getDatasCoThe('VongDau', elm.Id) || ' &emsp; '}} cm</div>
              </div>
              <div class="mrb10">
                <span>- Con<i>/ Neonate</i>:</span>&emsp;&emsp;<span>- Đơn thai<i>/ Single</i></span>
                <VTich v-if="MASTERDATA[getCode('IPDMRPE812', elm.Id)]" v-model="MASTERDATA[getCode('IPDMRPE812', elm.Id)].Items[0].Value" />
                <VTich :t3="true" style="display: inline-block" :listData="MASTERDATA[getCode('IPDMRPE919', elm.Id)].Items" />
                <div style="margin-left: 117px;">
                  <span>- Đa thai<i>/ Multiple</i>: </span>
                  <VTich v-if="MASTERDATA[getCode('IPDMRPE812', elm.Id)]" v-model="MASTERDATA[getCode('IPDMRPE812', elm.Id)].Items[1].Value" />
                  <VTich :t3="true" style="display: inline-block" :listData="MASTERDATA[getCode('IPDMRPE922', elm.Id)].Items" />
                </div>
                <div style="margin-left: 117px;">
                  <span v-if="MASTERDATA[getCode('IPDMRPE915', elm.Id)]">- Tật bẩm sinh<i>/ Congenital disabilities</i>: <VTich :t3="true" v-model="MASTERDATA[getCode('IPDMRPE915', elm.Id)].Items[0].Value"/></span>
                  <span v-if="MASTERDATA[getCode('IPDMRPE913', elm.Id)]">- Có hậu môn<i>/ Anus presence</i> <VTich :t3="true" v-model="MASTERDATA[getCode('IPDMRPE913', elm.Id)].Items[0].Value"/></span>
                </div>
              </div>
              <p v-if="MASTERDATA[getCode('IPDMRPE917', elm.Id)]">Cụ thể tật bẩm sinh<i>/ Detailed congenital disabilities</i>: {{MASTERDATA[getCode('IPDMRPE917', elm.Id)].Items[0].Value}}</p>
              <p v-if="MASTERDATA[getCode('IPDMRPE819', elm.Id)]">- Tình trạng trẻ sơ sinh sau khi đẻ<i>/ Baby physical status after birth</i>: {{MASTERDATA[getCode('IPDMRPE819', elm.Id)].Items[0].Value}}</p>
              <p v-if="MASTERDATA[getCode('IPDMRPE821', elm.Id)]">- Xử lý và kết quả<i>/ Interventions and results</i>: {{MASTERDATA[getCode('IPDMRPE821', elm.Id)].Items[0].Value}}</p>
            </div>
          </template>
        </template>
        <template v-else>
          <div class="mrb10">
            <span class="mrr10 line-height">- Đẻ lúc<i>/ Delivery at</i>: {{getValueOfMASTERDATA('IPDMRPE803', 'IPDMRPE804')}}</span>
            <span class="mrr10 line-height" v-if="MASTERDATA['IPDMRPE907']">- Apgar: 1 phút<i>/ minute</i>: {{MASTERDATA['IPDMRPE907'].Items[0].Value || '&emsp;&emsp;'}} điểm<i>/ score</i></span>
            <span class="mrr10 line-height" v-if="MASTERDATA['IPDMRPE909']">5 phút<i>/ minute</i>: {{MASTERDATA['IPDMRPE909'].Items[0].Value || '&emsp;&emsp;'}} điểm<i>/ score</i></span>
            <span v-if="MASTERDATA['IPDMRPE911']" class="line-height">10 phút<i>/ minute</i>: {{MASTERDATA['IPDMRPE911'].Items[0].Value || '&emsp;&emsp;'}} điểm<i>/ score</i></span>
          </div>
          <div class="mrb10">
            <span class="mrr10" v-if="DataInfor">- Cân nặng<i>/ Weight</i>: {{DataInfor[0].Value || ' &emsp; '}} gram</span>
            <span class="mrr10" v-if="DataInfor">Cao<i>/ Height</i>: {{DataInfor[1].Value || ' &emsp; '}} cm,</span>
            <span v-if="DataInfor">Vòng đầu<i>/ Head circumference</i>: {{DataInfor[2].Value || ' &emsp; '}} cm</span>
          </div>
          <div class="mrb10">
            <span>- Con<i>/ Neonate</i>:</span>&emsp;&emsp;<span>- Đơn thai<i>/ Single</i></span>
            <VTich v-if="MASTERDATA['IPDMRPE812']" v-model="MASTERDATA['IPDMRPE812'].Items[0].Value" />
            <VTich :t3="true" style="display: inline-block" :listData="MASTERDATA['IPDMRPE919'].Items" />
            <div style="margin-left: 117px;">
              <span>- Đa thai<i>/ Multiple</i>: </span>
              <VTich v-if="MASTERDATA['IPDMRPE812']" v-model="MASTERDATA['IPDMRPE812'].Items[1].Value" />
              <VTich :t3="true" style="display: inline-block" :listData="MASTERDATA['IPDMRPE922'].Items" />
            </div>
            <div style="margin-left: 117px;">
              <span v-if="MASTERDATA['IPDMRPE915']">- Tật bẩm sinh<i>/ Congenital disabilities</i>: <VTich :t3="true" v-model="MASTERDATA['IPDMRPE915'].Items[0].Value"/></span>
              <span v-if="MASTERDATA['IPDMRPE913']">- Có hậu môn<i>/ Anus presence</i> <VTich :t3="true" v-model="MASTERDATA['IPDMRPE913'].Items[0].Value"/></span>
            </div>
          </div>
          <p v-if="MASTERDATA['IPDMRPE917']">Cụ thể tật bẩm sinh<i>/ Detailed congenital disabilities</i>: {{MASTERDATA['IPDMRPE917'].Items[0].Value}}</p>
          <p v-if="MASTERDATA['IPDMRPE819']">- Tình trạng trẻ sơ sinh sau khi đẻ<i>/ Baby physical status after birth</i>: {{MASTERDATA['IPDMRPE819'].Items[0].Value}}</p>
          <p v-if="MASTERDATA['IPDMRPE821']">- Xử lý và kết quả<i>/ Interventions and results</i>: {{MASTERDATA['IPDMRPE821'].Items[0].Value}}</p>
        </template>
        <div class="mrb10">
          <b>2. Đặc điểm sổ rau<i>/ Delivery of placenta</i>: </b>
          <span>Rau<i>/ Placenta</i>: <i><VTich :t3="true" class="inline" v-if="MASTERDATA['IPDMRPE826']" :listData="MASTERDATA['IPDMRPE826'].Items"/></i></span>
        </div>
      </template>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <div class="inline line-height mrr20">
        - Rau sổ lúc<i>/ Delivery of placenta at</i>: {{getValueOfMASTERDATA('IPDMRPE829', 'IPDMRPE830')}}
      </div>
      <div class="inline line-height" v-if="MASTERDATA['IPDMRPE834']">
        - Cách sổ rau<i>/ Type of placenta delivery</i>: {{MASTERDATA['IPDMRPE834'].Items[0].Value}}
      </div>
    </td>
  </tr>
  <tr>
    <td v-if="MASTERDATA['IPDMRPE836'] && MASTERDATA['IPDMRPE838']" colspan="2">
      <div class="inline line-height mrr20">
        - Mặt màng<i>/ Fetal surface</i>: {{MASTERDATA['IPDMRPE836'].Items[0].Value}}
      </div>
      <div class="inline line-height">
        - Mặt múi<i>/ Maternal surface</i>: {{MASTERDATA['IPDMRPE838'].Items[0].Value}}
      </div>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <div class="inline line-height mrr20">
        <span v-if="MASTERDATA['IPDMRPE840']" class="mrr10">- Bánh rau<i>/ Placenta</i>: {{MASTERDATA['IPDMRPE840'].Items[0].Value || '&emsp;&emsp;'}}</span>
        <span v-if="MASTERDATA['IPDMRPE842']">- Cân nặng<i>/ Weight</i>: {{MASTERDATA['IPDMRPE842'].Items[0].Value || '&emsp;&emsp;'}} gram</span>
      </div>
      <div class="line-height">
        - Rau cuốn cổ<i>/ Placenta asound the neck</i>: <VTich :t3="true" v-if="MASTERDATA['IPDMRPE824']" v-model="MASTERDATA['IPDMRPE824'].Items[0].Value" />
      </div>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <div v-if="MASTERDATA['IPDMRPE844']" class="mrr20 inline">- Cuống rau dài<i>/ Length of placenta stem</i>: {{MASTERDATA['IPDMRPE844'].Items[0].Value || '&emsp;&emsp;'}} cm</div>
      <div class="mrl10">Có chảy máu sau sổ<i>/ Bleeding after placenta delivery</i> <VTich :t3="true" v-if="MASTERDATA['IPDMRPE831']" v-model="MASTERDATA['IPDMRPE831'].Items[0].Value" /></div>
    </td>
  </tr>
  <tr>
    <td colspan="2" v-if="MASTERDATA['IPDMRPE831']">
      <div class="mrl10">Nếu có, lượng máu mất<i>/ Blood loss volume, if any</i>: {{MASTERDATA['IPDMRPE831'].Items[1].Value || '&emsp;&emsp;'}} ml</div>
    </td>
  </tr>
  <tr>
    <td colspan="2">- Kiểm soát tử cung<i>/ Uterine management</i>: <VTich :t3="true" v-if="MASTERDATA['IPDMRPE846']" v-model="MASTERDATA['IPDMRPE846'].Items[0].Value"/></td>
  </tr>
  <tr>
    <td colspan="2" v-if="MASTERDATA['IPDMRPE848']">- Xử lý và kết quả<i>/ Intervention and results</i>: {{MASTERDATA['IPDMRPE848'].Items[0].Value}}</td>
  </tr>
  <tr>
    <td colspan="2">
      <b>3. Tình trạng sản phụ sau đẻ<i>/ Status of new mother after delivery</i>: </b>
      <span> - Da, niêm mạc<i>/ Skin, mucosa</i>: {{MASTERDATA['IPDMRPE859'].Items[0].Value}}</span>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <div class="flex space-between">
        <div class="mrr10">
          <div class="mrb10" style="width: 228px;">- Phương pháp đẻ<i>/ Type of delivery</i>:</div>
          <div class="mrl10">
            <VTich :indexs="[0, 1, 2]" :t3="true" class="block" v-if="MASTERDATA['IPDMRPE861']" :listData="MASTERDATA['IPDMRPE861'].Items"/>
            <VTich :indexs="[3, 4, 5]" :t3="true" class="block" v-if="MASTERDATA['IPDMRPE861']" :listData="MASTERDATA['IPDMRPE861'].Items"/>
          </div>
        </div>
        <div style="border: 1px solid;padding: 5px;">
          <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPE851']">Mạch<i>/ Pulse</i>: {{MASTERDATA['IPDMRPE851'].Items[0].Value || 'N/A'}} <i>/ lần/ph/bpm</i></span></div>
          <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPE853']">Nhiệt độ<i>/ T</i>: {{MASTERDATA['IPDMRPE853'].Items[0].Value || 'N/A'}} &#8451;</span></div>
          <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPE855']">Huyết áp<i>/ BP</i>: {{MASTERDATA['IPDMRPE855'].Items[0].Value || 'N/A'}} mmHg</span></div>
          <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPE857']">Nhịp thở<i>/ RR</i>: {{MASTERDATA['IPDMRPE857'].Items[0].Value || 'N/A'}} <i>/ lần/ph/bpm</i></span></div>
        </div>
      </div>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <p v-if="MASTERDATA['IPDMRPE869']">- Lý do can thiệp<i>/ Intervention reason</i>: {{MASTERDATA['IPDMRPE869'].Items[0].Value}}</p>
      <div class="mrb10">
        <span>- Tầng sinh môn<i>/ Perineum</i>:</span>
        <VTich :t3="true" class="inline" v-if="MASTERDATA['IPDMRPE871']" :listData="MASTERDATA['IPDMRPE871'].Items" />
      </div>
      <div class="mrb10 line-height mrl10">
        <div class="mrr10 inline-block">Nếu có, phương pháp khâu và loại chỉ<i>/ If any, type of suture and stitch</i>: {{MASTERDATA['IPDMRPE875'].Items[0].Value || '&emsp;&emsp;'}}</div>
        <div v-if="MASTERDATA['IPDMRPE877']" class="inline-block">Số mũi khâu<i>/ Number of stitches</i>: {{MASTERDATA['IPDMRPE877'].Items[0].Value}}</div>
      </div>
      <div class="mrb10">
        <span>- Cổ tử cung<i>/ Cervix</i>: </span>
        <i><VTich :t3="true" class="inline" v-if="MASTERDATA['IPDMRPE879']" :listData="MASTERDATA['IPDMRPE879'].Items"/></i>
      </div>
      <p><b>4. Tình hình phẫu thuật</b> <i>(nếu có)</i><i>/ Surgical status (If any)</i></p>
      <div v-if="MASTERDATA['IPDMRPE888']" class="flex align-center mrb10">
        <div class="mrr10">- Chẩn đoán trước phẫu thuật<i>/ Pre-operative diagnosis</i>: {{MASTERDATA['IPDMRPE888'].Items[1].Value}}</div>
        <div>{{getICD10Code(MASTERDATA['IPDMRPE888'].Items[0].Value) ? '(' + getICD10Code(MASTERDATA['IPDMRPE888'].Items[0].Value) + ')' : null}}</div>
      </div>
      <div v-if="MASTERDATA['IPDMRPE891']" class="flex align-center">
        <div class="mrr10">- Chẩn đoán sau phẫu thuật<i>/ Post-operative diagnosis</i>: {{MASTERDATA['IPDMRPE891'].Items[1].Value}}</div>
        <div>{{getICD10Code(MASTERDATA['IPDMRPE891'].Items[0].Value) ? '(' + getICD10Code(MASTERDATA['IPDMRPE891'].Items[0].Value) + ')' : null}}</div>
      </div>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <table v-if="!DataTable" width="100%" class="tbl-b mrb10">
        <tr>
          <th class="text-center">Giờ, ngày/<br><i>Hour, date</i></th>
          <th class="text-center">Phương pháp phẫu thuật/vô cảm/<br><i>Surgical/ Anesthesia method</i></th>
          <th class="text-center">Phẫu thuật viên/<br><i>Surgeon</i></th>
          <th class="text-center">Bác sỹ gây mê<br><i>Anesthesiologist</i></th>
        </tr>
        <tr>
          <td style="height: 30px"></td>
          <td style="height: 30px"></td>
          <td style="height: 30px"></td>
          <td style="height: 30px"></td>
        </tr>
        <tr>
          <td style="height: 30px"></td>
          <td style="height: 30px"></td>
          <td style="height: 30px"></td>
          <td style="height: 30px"></td>
        </tr>
        <tr>
          <td style="height: 30px"></td>
          <td style="height: 30px"></td>
          <td style="height: 30px"></td>
          <td style="height: 30px"></td>
        </tr>
      </table>
      <TblWithMasterData
        v-else
        class="mrb10"
        @getCol="getCol"
        :FormCode="'IPDSANTHPT1'"
        :VisitId="_VisitId"
        :VisitType="'IPD'"
        :FormID="Data.Id"
        :print="true"
        :checkShow="true"
        :formatTime="'date'"
        :ontop="true"
        ref="TblWithMasterDataPrint"/>
      <div class="mrb10 BreakPage" v-if="MASTERDATA['IPDMRPE901'] && MASTERDATA['IPDMRPE898']">
        <span>1. Tai biến phẫu thuật<i>/ Surgical accident</i></span>
        <span class="square-text" style="margin-right: 8px" :class="{'hidden-text': !MASTERDATA['IPDMRPE898'].Items[0].Value}">{{'&#10003;'}}</span>
        <span>2. Biến chứng<i>/ Complication</i></span>
        <span class="square-text" style="margin-right: 8px" :class="{'hidden-text': !MASTERDATA['IPDMRPE898'].Items[1].Value}">{{'&#10003;'}}</span>
        <span>1. Do phẫu thuật<i>/ Surgic duced</i></span>
        <span class="square-text" style="margin-right: 8px" :class="{'hidden-text': !MASTERDATA['IPDMRPE901'].Items[0].Value}">{{'&#10003;'}}</span>
        <span>2. Do gây mê<i>/ Anesthesia-induced</i></span>
        <span class="square-text" style="margin-right: 8px" :class="{'hidden-text': !MASTERDATA['IPDMRPE901'].Items[1].Value}">{{'&#10003;'}}</span>
        <span>3. Do nhiễm khuẩn<i>/ Infection-induced</i></span>
        <span class="square-text" style="margin-right: 8px" :class="{'hidden-text': !MASTERDATA['IPDMRPE901'].Items[2].Value}">{{'&#10003;'}}</span>
        <span>4. Khác<i>/ Other causes</i></span>
        <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPE901'].Items[3].Value}">{{'&#10003;'}}</span>
      </div>
      <p v-if="MASTERDATA['IPDMRPEHDTV']"><b>5. Hướng điều trị và các chế độ tiếp theo<i>/ Treatment plan and further recommendations</i>: </b>{{MASTERDATA['IPDMRPEHDTV'].Items[0].Value}}</p>
    </td>
  </tr>
</table>
</template>

<script>
import TblWithMasterData from '@/components/global/TblWithMasterData'
import VNameCD2 from '@/components/global/VNameCD2.vue'
export default {
  components: {
    TblWithMasterData,
    VNameCD2
  },
  name: 'ObstetricsPrint3',
  props: [
    'Data',
    'MASTERDATA',
    'box1',
    'VisitId',
    'VisitIdDrop',
    'optionChild',
    'ListSoSinh'
  ],
  data () {
    return {
      DataInfor: null,
      DataTable: 1
    }
  },
  created () {
    if (this.Data.DataInfor) {
      this.Data.DataInfor.sort((a, b) => a.Order - b.Order)
      this.DataInfor = this.Data.DataInfor
    }
  },
  mounted () {
    this.handleClear5()
  },
  methods: {
    getICD10Code (icd) {
      var arr = this.JSONParse(icd) || []
      return arr.map(e => {
        return e.code
      }).join(',')
    },
    getCol (col) {
      this.DataTable = ''
      if (col && col.length) {
        this.DataTable = col.length
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
          this.DataTable = ''
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
    getDatasCoThe (str, Id) {
      let str2 = ''
      if (this.optionChild && this.optionChild.length && Id) {
        this.optionChild.find(e => {
          if (e.Newborn && e.Newborn.Id === Id) {
            if (str === 'CanNang') {
              str2 = e.Datas.CanNang
            }
            if (str === 'ChieuCao') {
              str2 = e.Datas.ChieuCao
            }
            if (str === 'VongDau') {
              str2 = e.Datas.VongDau
            }
          }
        })
      }
      return str2
    },
    getCode (code, Id) {
      // return code
      return code + '_' + Id
    }
  },
  computed: {
    getICD10Codex2 (icd) {
      let check = false
      if (this.JSONParse(icd)) {
        check = true
      }
      return check
    }
  }
}
</script>
