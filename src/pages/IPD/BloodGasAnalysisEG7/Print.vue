<template>
  <div class="main-content disable_ccp" id="BloodGasAnalysisEG7-Print">
    <div v-if="Data">
      <div style="width: 100%">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div width="20%">
            <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
          </div>
          <div class="text-center" style="width: 60%; transform: translateX(25px);">
            <p v-if="Data && Data.Specialty" class="text-center textUppercase">KHOA/ <i>DEPARTMENT</i>: {{Data.Specialty.ViName}}/ {{Data.Specialty.EnName}}</p>
            <p v-else class="text-center textUppercase">KHOA/ <i>DEPARTMENT</i>: . . . . . . . . . . . . . . . . . . . . . . . . .</p>
          </div>
          <div style="width: 20%; display: flex; justify-content: flex-end;">
            <VueBarcode v-if="Data.PID" :value="Data.PID" :height="40" :displayValue="true" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
          </div>
        </div>
      </div>
      <div class="text-center textUppercase font-bold" style="text-align: center; margin-top: 20px;">Xét nghiệm tại chỗ/ Point- Of- Care Testing (POCT)</div>
      <p class="text-center font-bold font20" style="margin-bottom: 0;">Khí máu và điện giải EG7+/ Blood gas analysis (Cartridge EG7+)</p>
      <p class="text-center font-bold font22" style="margin-bottom: 0;">Máy/ Equiqment: iSTAT</p>
      <table class="table" style="width: 100%; margin-top: 15px;">
        <tr>
          <td>
            <table style="width: 100%" class="tbl-b">
              <tr style="background-color: #f2f2f2;">
                <td v-if="MASTERDATA['BGACE1']" style="background-color: #f2f2f2;" colspan="2">
                  <p>
                    <b>Thông số bệnh nhân</b>
                    <span class="font-italic">  Thở máy () {{MASTERDATA['BGACE1'].Items[0].Value ? '&#9745; Có' : '&#9744; Có'}}   {{MASTERDATA['BGACE1'].Items[1].Value ? '&#9745; Không' : '&#9744; Không'}}</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td v-if="MASTERDATA['BGACE4']" width="50%"><p>Mode thở: {{MASTERDATA['BGACE4'].Items[0].Value || '.........................'}}</p></td>
                <td v-if="MASTERDATA['BGACE6']" width="50%"><p>Huyết áp: {{MASTERDATA['BGACE6'].Items[0].Value || '............'}} / {{MASTERDATA['BGACE6'].Items[1].Value || '............'}} mmHg</p></td>
              </tr>
              <tr>
                <td v-if="MASTERDATA['BGACE9']" width="50%"><p>Vt: {{MASTERDATA['BGACE9'].Items[0].Value || '..............'}} f: {{MASTERDATA['BGACE9'].Items[1].Value || '............'}}</p></td>
                <td v-if="MASTERDATA['BGACE12']" width="50%"><p>Nhịp thở: {{MASTERDATA['BGACE12'].Items[0].Value || '........................'}}</p></td>
              </tr>
              <tr>
                <td v-if="MASTERDATA['BGACE14']" width="50%"><p>FIO2: {{MASTERDATA['BGACE14'].Items[0].Value || '.......................'}} %</p></td>
                <td v-if="MASTERDATA['BGACE16']" width="50%"><p>Nhiệt độ: {{MASTERDATA['BGACE16'].Items[0].Value || '.......................'}} &#8451;</p></td>
              </tr>
            </table>
          </td>
          <td width="40%" style="padding-left:5px; vertical-align: top;">
            <table style="width: 100%;" class="tbl-b">
              <tr>
                <td style="padding-left:5px">
                  <p>Họ và tên/ <i>Patient's Name</i>: {{Data.FullNameNB}}</p>
                  <p>Số PID/ <i>PID</i>:  {{Data.PID}}</p>
                  <p>Ngày tháng năm sinh/ <i>DOB</i>: {{Data.DateOfBirth}}</p>
                  <p style="margin: 0;">Giới tính/ <i>Gender</i>: {{GENDER[Data.Gender] || 'N/A'}}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table class="table tbl-b tbl-b2" style="margin: 10px 0;">
        <tr v-if="MASTERDATA['BGACE18']">
          <td width="100px" class="no-wrap">Allen Test</td>
          <td>{{MASTERDATA['BGACE18'].Items[0].Value}}</td>
        </tr>
        <tr v-if="MASTERDATA['BGACE20']">
          <td width="100px" class="no-wrap">
            <p>Vị trí lấy mẫu/</p>
            <i>Collection site</i>
          </td>
          <td>{{MASTERDATA['BGACE20'].Items[0].Value}}</td>
        </tr>
      </table>
      <table class="tbl-b tbl-c" style="width: 100%">
        <tr>
          <td class="text-center content-center fw600" rowspan="2" width="20px" style="padding-top: 9px!important;">STT/ <i>No.</i></td>
          <td class="text-center content-center fw600" rowspan="2" colspan="2" style="padding-top: 9px!important;">Thông số/ <i>Parameter</i></td>
          <td class="text-center content-center fw600" rowspan="2" width="275px" style="padding-top: 9px!important;">Khoảng tham chiếu/ <i>Reference Interval</i></td>
          <td class="text-center fw600" colspan="2" width="90px" style="padding-top: 9px!important;">Chỉ số báo động/ <i>Critical Result</i></td>
          <td class="text-center fw600" colspan="3" style="border-bottom-width: 1px!important;">Kết quả/ <i>Result</i></td>
        </tr>
        <tr>
          <td class="text-center" width="80px">Giá trị thấp/ <i>Low</i></td>
          <td class="text-center" width="80px">Giá trị cao/ <i>High</i></td>
          <td class="text-center" width="80px">Kết quả/ <i>Result</i></td>
          <td class="text-center" width="80px">Đơn vị/ <i>Unit</i></td>
          <td class="text-center"></td>
        </tr>
        <!-- 1. -->
        <template>
          <tr>
            <td class="text-center" rowspan="2">1</td>
            <td class="text-center" rowspan="2" width="155px">
              pH
            </td>
            <td width="155px">Người trưởng thành</td>
            <td class="text-center">7.35 - 7.45</td>
            <td class="text-center" rowspan="2">&#8804; 7.21</td>
            <td class="text-center" rowspan="2">&#8805; 7.59</td>
            <td v-if="MASTERDATA['BGACE22']" class="text-center">
              {{MASTERDATA['BGACE22'].Items[0].Value}}
            </td>
            <td rowspan="2"></td>
            <th class="text-center" width="30px" style="text-align: left" rowspan="20">
              <img style="float: right;" width="20px" src="/static/print-note.png"/>
            </th>
          </tr>
          <tr>
            <td>Trẻ em</td>
            <td></td>
            <td v-if="MASTERDATA['BGACE22']" class="text-center">
              {{MASTERDATA['BGACE22'].Items[1].Value}}
            </td>
          </tr>
        </template>
        <!-- 2. -->
        <template>
          <tr>
            <td class="text-center" rowspan="2">2</td>
            <td class="text-center" rowspan="2">
              pCO<sub>2</sub>
            </td>
            <td>Người trưởng thành</td>
            <td class="text-center">35 - 45</td>
            <td class="text-center">&#8804; 19</td>
            <td class="text-center">&#8805; 67</td>
            <td v-if="MASTERDATA['BGACE25']" class="text-center">
              {{MASTERDATA['BGACE25'].Items[0].Value}}
            </td>
            <td class="text-center" rowspan="2">mmHg</td>
          </tr>
          <tr>
            <td>Trẻ em</td>
            <td></td>
            <td class="text-center">&#8804; 21</td>
            <td class="text-center">&#8805; 66</td>
            <td v-if="MASTERDATA['BGACE25']" class="text-center">
              {{MASTERDATA['BGACE25'].Items[1].Value}}
            </td>
          </tr>
        </template>
        <!-- 3. -->
        <template>
          <tr>
            <td class="text-center" rowspan="3">3</td>
            <td class="text-center" rowspan="3">
              pO<sub>2</sub>
            </td>
            <td>Người trưởng thành</td>
            <td class="text-center">80 - 105</td>
            <td class="text-center">&#8804; 43</td>
            <td class="text-center">{{__t('Không áp dụng')}}</td>
            <td v-if="MASTERDATA['BGACE28']" class="text-center">
              {{MASTERDATA['BGACE28'].Items[0].Value}}
            </td>
            <td class="text-center" rowspan="3">mmHg</td>
          </tr>
          <tr>
            <td>Trẻ em</td>
            <td></td>
            <td class="text-center">&#8804; 45</td>
            <td class="text-center">&#8805; 124</td>
            <td v-if="MASTERDATA['BGACE28']" class="text-center">
              {{MASTERDATA['BGACE28'].Items[1].Value}}
            </td>
          </tr>
          <tr>
            <td>Trẻ sơ sinh</td>
            <td></td>
            <td class="text-center">&#8804; 37</td>
            <td class="text-center">&#8805; 92</td>
            <td v-if="MASTERDATA['BGACE28']" class="text-center">
              {{MASTERDATA['BGACE28'].Items[2].Value}}
            </td>
          </tr>
        </template>
        <!-- 4. -->
        <template>
          <tr>
            <td class="text-center">4</td>
            <td class="text-center">
              BE
            </td>
            <td>Người trưởng thành</td>
            <td class="text-center">(-2) - (+3)</td>
            <td class="text-center">{{__t('Không áp dụng')}}</td>
            <td class="text-center">{{__t('Không áp dụng')}}</td>
            <td v-if="MASTERDATA['BGACE32']" class="text-center">
              {{MASTERDATA['BGACE32'].Items[0].Value}}
            </td>
            <td class="text-center">mmol/L</td>
          </tr>
        </template>
        <!-- 5. -->
        <template>
          <tr>
            <td class="text-center">5</td>
            <td class="text-center">
              HCO<sub>3</sub>
            </td>
            <td>Người trưởng thành</td>
            <td class="text-center">22 - 26</td>
            <td class="text-center">{{__t('Không áp dụng')}}</td>
            <td class="text-center">{{__t('Không áp dụng')}}</td>
            <td v-if="MASTERDATA['BGACE34']" class="text-center">
              {{MASTERDATA['BGACE34'].Items[0].Value}}
            </td>
            <td class="text-center">mmol/L</td>
          </tr>
        </template>
      </table>
      <div class="BreakPage"></div>
      <table class="tbl-b tbl-c mrt10" style="width: 100%">
        <tr>
          <td class="text-center content-center fw600" rowspan="2" width="20px" style="padding-top: 9px!important;">STT/ <i>No.</i></td>
          <td class="text-center content-center fw600" rowspan="2" colspan="2" style="padding-top: 9px!important;">Thông số/ <i>Parameter</i></td>
          <td class="text-center content-center fw600" rowspan="2" width="275px" style="padding-top: 9px!important;">Khoảng tham chiếu/ <i>Reference Interval</i></td>
          <td class="text-center fw600" colspan="2" width="90px" style="padding-top: 9px!important;">Chỉ số báo động/ <i>Critical Result</i></td>
          <td class="text-center fw600" colspan="3" style="border-bottom-width: 1px!important;">Kết quả/ <i>Result</i></td>
        </tr>
        <tr>
          <td class="text-center" width="80px">Giá trị thấp/ <i>Low</i></td>
          <td class="text-center" width="80px">Giá trị cao/ <i>High</i></td>
          <td class="text-center" width="80px">Kết quả/ <i>Result</i></td>
          <td class="text-center" width="80px">Đơn vị/ <i>Unit</i></td>
          <td class="text-center"></td>
        </tr>
        <!-- 6. -->
        <template>
          <tr>
            <td class="text-center">6</td>
            <td class="text-center" width="155px">
              TCO<sub>2</sub>
            </td>
            <td width="155px">Người trưởng thành</td>
            <td class="text-center">23 - 27</td>
            <td class="text-center">{{__t('Không áp dụng')}}</td>
            <td class="text-center">{{__t('Không áp dụng')}}</td>
            <td v-if="MASTERDATA['BGACE36']" class="text-center">
              {{MASTERDATA['BGACE36'].Items[0].Value}}
            </td>
            <td class="text-center">mmol/L</td>
            <th class="text-center" width="30px" style="text-align: left" rowspan="20">
              <img style="float: right;" width="20px" src="/static/print-note.png"/>
            </th>
          </tr>
        </template>
        <!-- 7. -->
        <template>
          <tr>
            <td class="text-center">7</td>
            <td class="text-center">
              SO<sub>2</sub>
            </td>
            <td>Người trưởng thành</td>
            <td class="text-center">95 - 98</td>
            <td class="text-center">{{__t('Không áp dụng')}}</td>
            <td class="text-center">{{__t('Không áp dụng')}}</td>
            <td v-if="MASTERDATA['BGACE38']" class="text-center">
              {{MASTERDATA['BGACE38'].Items[0].Value}}
            </td>
            <td class="text-center">%</td>
          </tr>
        </template>
        <!-- 8. -->
        <template>
          <tr>
            <td class="text-center" rowspan="2">8</td>
            <td class="text-center" rowspan="2">
              Na<sup>+</sup>
            </td>
            <td>Người trưởng thành</td>
            <td class="text-center">138 - 146</td>
            <td class="text-center">&#8804; 120</td>
            <td class="text-center">&#8805; 158</td>
            <td v-if="MASTERDATA['BGACE40']" class="text-center">
              {{MASTERDATA['BGACE40'].Items[0].Value}}
            </td>
            <td class="text-center" rowspan="2">mmol/L</td>
          </tr>
          <tr>
            <td>Trẻ em và trẻ sơ sinh</td>
            <td></td>
            <td class="text-center">&#8804; 121</td>
            <td class="text-center">&#8805; 156</td>
            <td v-if="MASTERDATA['BGACE40']" class="text-center">
              {{MASTERDATA['BGACE40'].Items[1].Value}}
            </td>
          </tr>
        </template>
        <!-- 9. -->
        <template>
          <tr>
            <td class="text-center" rowspan="3">9</td>
            <td class="text-center" rowspan="3">
              K<sup>+</sup>
            </td>
            <td>Người trưởng thành</td>
            <td class="text-center">3.5 - 4.9</td>
            <td class="text-center">&#8804; 2.8</td>
            <td class="text-center">&#8805; 6.2</td>
            <td v-if="MASTERDATA['BGACE43']" class="text-center">
              {{MASTERDATA['BGACE43'].Items[0].Value}}
            </td>
            <td class="text-center" rowspan="3">mmol/L</td>
          </tr>
          <tr>
            <td>Trẻ em</td>
            <td></td>
            <td class="text-center">&#8804; 2.8</td>
            <td class="text-center">&#8805; 6.4</td>
            <td v-if="MASTERDATA['BGACE43']" class="text-center">
              {{MASTERDATA['BGACE43'].Items[1].Value}}
            </td>
          </tr>
          <tr>
            <td>Trẻ sơ sinh</td>
            <td></td>
            <td class="text-center">&#8804; 2.8</td>
            <td class="text-center">&#8805; 6.5</td>
            <td v-if="MASTERDATA['BGACE43']" class="text-center">
              {{MASTERDATA['BGACE43'].Items[2].Value}}
            </td>
          </tr>
        </template>
        <!-- 10. -->
        <template>
          <tr>
            <td class="text-center" rowspan="2">10</td>
            <td class="text-center" rowspan="2">
              Cl<sup>-</sup>
            </td>
            <td>Người trưởng thành</td>
            <td class="text-center">98 - 109</td>
            <td class="text-center">&#8804; 75</td>
            <td class="text-center">&#8805; 126</td>
            <td v-if="MASTERDATA['BGACE47']" class="text-center">
              {{MASTERDATA['BGACE47'].Items[0].Value}}
            </td>
            <td class="text-center" rowspan="2">mmol/L</td>
          </tr>
          <tr>
            <td>Trẻ em và trẻ sơ sinh</td>
            <td></td>
            <td class="text-center">&#8804; 77</td>
            <td class="text-center">&#8805; 121</td>
            <td v-if="MASTERDATA['BGACE47']" class="text-center">
              {{MASTERDATA['BGACE47'].Items[1].Value}}
            </td>
          </tr>
        </template>
        <!-- 11. -->
        <template>
          <tr>
            <td class="text-center" rowspan="2">11</td>
            <td class="text-center" rowspan="2">
              Ion Calciun (iCa<sup>2+</sup>)
            </td>
            <td>Người trưởng thành</td>
            <td class="text-center">1.12 - 1.32</td>
            <td class="text-center">&#8804; 0.78</td>
            <td class="text-center">&#8805; 1.58</td>
            <td v-if="MASTERDATA['BGACE50']" class="text-center">
              {{MASTERDATA['BGACE50'].Items[0].Value}}
            </td>
            <td class="text-center" rowspan="2">mmol/L</td>
          </tr>
          <tr>
            <td>Trẻ em</td>
            <td></td>
            <td class="text-center">&#8804; 0.74</td>
            <td class="text-center">&#8805; 1.57</td>
            <td v-if="MASTERDATA['BGACE50']" class="text-center">
              {{MASTERDATA['BGACE50'].Items[1].Value}}
            </td>
          </tr>
        </template>
        <!-- 12. -->
        <template>
          <tr>
            <td class="text-center" rowspan="3">12</td>
            <td class="text-center" rowspan="3">
              HCT
            </td>
            <td>Người lớn</td>
            <td class="text-center">38 - 51</td>
            <td class="text-center">&#8804; 18</td>
            <td class="text-center">&#8805; 61</td>
            <td v-if="MASTERDATA['BGACE53']" class="text-center">
              {{MASTERDATA['BGACE53'].Items[0].Value}}
            </td>
            <td class="text-center" rowspan="3">% PCV</td>
          </tr>
          <tr>
            <td>Trẻ em</td>
            <td></td>
            <td class="text-center">&#8804; 20</td>
            <td class="text-center">&#8805; 62</td>
            <td v-if="MASTERDATA['BGACE53']" class="text-center">
              {{MASTERDATA['BGACE53'].Items[1].Value}}
            </td>
          </tr>
          <tr>
            <td>Trẻ sơ sinh</td>
            <td></td>
            <td class="text-center">&#8804; 33</td>
            <td class="text-center">&#8805; 71</td>
            <td v-if="MASTERDATA['BGACE53']" class="text-center">
              {{MASTERDATA['BGACE53'].Items[2].Value}}
            </td>
          </tr>
        </template>
        <!-- 13. -->
        <template>
          <tr>
            <td class="text-center">13</td>
            <td class="text-center">
              Hgb
            </td>
            <td>Người trưởng thành</td>
            <td class="text-center">12 - 17</td>
            <td class="text-center" colspan="2">{{__t('Không áp dụng')}}</td>
            <td v-if="MASTERDATA['BGACE57']" class="text-center">
              {{MASTERDATA['BGACE57'].Items[0].Value}}
            </td>
            <td class="text-center">g/dL</td>
          </tr>
        </template>
      </table>
      <p class="font-italic" style="margin-top: 10px; padding: 0 15px;">
        <b>Chú ý/ Note: </b>Khoảng tham chiếu trên dành cho Xét nghiệm khí máu động mạch cho người trưởng thành. Xét nghiệm khí máu tĩnh mạch và xét nghiệm cho đối tượng khác tham khảo thêm trong <b>Sổ tay khoảng tham chiếu</b>
      </p>
      <table class="table" style="width: 100%; font-size: 14px">
        <tr>
          <td width="50%" class="text-center" style="text-align: center">
            <p v-if="BGACECONFIRM_TIME_TEC" style="text-align: center;">{{BGACECONFIRM_TIME_TEC | viDisplayformatDateTimeWithMomentForDischarge}}</p>
            <p v-else style="text-align: center;">.... giờ ...., ngày .... tháng .... năm 20...</p>
            <p style="text-align: center;"><b>Người làm xét nghiệm</b>/ <i>Technician</i></p>
          </td>
          <td class="text-center" style="text-align: center">
            <p v-if="BGACECONFIRM_TIME_REF" style="text-align: center;">{{BGACECONFIRM_TIME_REF | viDisplayformatDateTimeWithMomentForDischarge}}</p>
            <p v-else style="text-align: center;">.... giờ ...., ngày .... tháng .... năm 20...</p>
            <p style="text-align: center;"><b>Bác sĩ chỉ định</b>/ <i>Referring Physician</i></p>
          </td>
        </tr>
        <tr>
          <td valign="top">
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p v-if="BGACECONFIRM_TEC" style="text-align: center;">{{BGACECONFIRM_TEC}}</p>
          </td>
          <td valign="top">
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p v-if="BGACECONFIRM_REF" style="text-align: center;">{{BGACECONFIRM_REF}}</p>
          </td>
        </tr>
      </table>
      <div v-if="MASTERDATA['BGACE59'] && MASTERDATA['BGACE59'].Items[1].Value.length > 0" :class="{'print-area': MASTERDATA['BGACE59'].Items[1].Value}">
        <p class="BreakPage"></p>
        <p>Dán kết quả</p>
        <template v-for="(val, index) in MASTERDATA['BGACE59'].Items[1].Value">
          <div :key="index" class="mrb10 text-center">
            <img :src="val" style="width: 100%;height: 420px;"/>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import VueBarcode from 'vue-barcode'
import constants from '@/constants'
// import moment from 'moment'

const GENDER = constants.GENDER

export default {
  name: 'BloodGasAnalysisEG7Print',
  components: {
    VueBarcode
  },
  props: ['Data', 'ConfirmInfo', 'MASTERDATA', 'viewOnly', 'VisitId', 'formId', 'VisitType'],
  data () {
    return {
      GENDER: GENDER,
      BGACECONFIRM_TEC: '',
      BGACECONFIRM_REF: '',
      BGACECONFIRM_TIME_TEC: '',
      BGACECONFIRM_TIME_REF: ''
    }
  },
  mounted () {
    this.getListConfirm(this.ConfirmInfo)
  },
  methods: {
    getListConfirm (val) {
      val.map(item => {
        if (item.ConfirmType === 'BGACECONFIRM_TEC_USERCREATED') {
          this.BGACECONFIRM_TEC = item.Fullname
          // this.BGACECONFIRM_TIME_TEC = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
          this.BGACECONFIRM_TIME_TEC = item.ConfirmAt
        }
        if (item.ConfirmType === 'BGACECONFIRM_REF') {
          this.BGACECONFIRM_REF = item.Fullname
          // this.BGACECONFIRM_TIME_REF = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
          this.BGACECONFIRM_TIME_REF = item.ConfirmAt
        }
      })
    }
  }
}
</script>
