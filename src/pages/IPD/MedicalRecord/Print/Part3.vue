<template>
  <div>
    <ObstetricsPrint3 v-if="routeType === 'Obstetrics'" :box1="true" :Data="Data" :MASTERDATA="MASTERDATA" :ListSoSinh="ListSoSinh" :optionChild="optionChild"/>
    <table width="100%" class="tbl-b2 mrb10" v-else>
      <tr>
        <td>
          <p class="fw600" style="font-size: 24px;" v-if="routeType === 'Gynecological'">B. TỔNG KẾT BỆNH ÁN<i class="fs24">/ SUMMARY</i></p>
          <p class="fw600" style="font-size: 24px;" v-else>B. TỔNG KẾT BỆNH ÁN<i class="fs24">{{__t3('TỔNG KẾT BỆNH ÁN')}}</i></p>
        </td>
      </tr>
      <tr v-if="routeType === 'Oncology'">
        <td>
          <OncologyPrint3 :Data="Data" :MASTERDATA="MASTERDATA" />
        </td>
      </tr>
      <tr v-else-if="routeType === 'Eye'">
        <td>
          <EyePrint3 :Data="Data" :MASTERDATA="MASTERDATA" />
        </td>
      </tr>
      <tr v-else>
        <td>
          <div style="border: 1px solid #353535; padding-left: 3px; padding-right: 3px;">
            <p v-if="routeType === 'Gynecological'"><b>1. Quá trình bệnh lý và diễn biến lâm sàng<i>/ Disease progression and clinical evolution</i>:</b> {{getValueOfMASTERDATA('IPDMRPEQTBL', 'IPDMRPEQTBLANS')}}</p>
            <p v-else><b>1. Quá trình bệnh lý và diễn biến lâm sàng<i>{{__t3('1. Quá trình bệnh lý và diễn biến lâm sàng')}}</i>:</b> {{getValueOfMASTERDATA('IPDMRPEQTBL', 'IPDMRPEQTBLANS')}}</p>
            <p v-if="routeType === 'Gynecological'"><b>2. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán<i>/ Summary of valuable para-clinical laboratory test results</i>:</b> {{getValueOfMASTERDATA('IPDMRPETTKQ', 'IPDMRPETTKQANS')}}</p>
            <p v-else><b>2. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán<i>{{__t3('2. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán')}}</i>:</b> {{getValueOfMASTERDATA('IPDMRPETTKQ', 'IPDMRPETTKQANS')}}</p>
            <BMTIMMACH3Print class="mrb10" :MASTERDATA="MASTERDATA" v-if="routeType === 'CardiovascularForm'"/>
            <p v-else><b>3. Phương pháp điều trị<i>{{__t3('3. Phương pháp điều trị')}}</i>:</b> {{getValueOfMASTERDATA('IPDMRPEPPDT', 'IPDMRPEPPDTANS')}}</p>
            <div v-if="routeType === 'Gynecological' || routeType === 'A01_195_050919_V' || routeType === 'A01_039_050919_V' || routeType === 'A01_040_050919_V'">
              <VTich
                v-if="MASTERDATA['IPDMRPTTHPT']"
                :showLabel="true"
                :noneDex="true"
                :gachNgang="true"
                :haiCham="true"
                class="block mrb10"
                :styleCustom="'margin-right: 181px!important;'"
                :listData="MASTERDATA['IPDMRPTTHPT'].Items"
                :t3="true"
              />
              <VTich
                v-if="MASTERDATA['IPDMRPEQTBLPTTT'] && (routeType === '_A01_039_050919_V' || routeType === '_A01_040_050919_V')"
                :showLabel="true"
                :noneDex="true"
                :gachNgang="true"
                :haiCham="true"
                class="block mrb10"
                :styleCustom="'margin-right: 250px!important;'"
                :listData="MASTERDATA['IPDMRPEQTBLPTTT'].Items"
              />
              <table v-if="!DataTable && (routeType === 'Gynecological' || routeType === 'A01_195_050919_V' || routeType === 'A01_040_050919_V' || routeType === 'A01_039_050919_V')" width="100%" class="tbl-b mrb10">
                <tr>
                  <th class="text-center">
                    <div>Giờ, ngày</div>
                    <div class="italic">Hour, date</div>
                  </th>
                  <th class="text-center">
                    <div>Phương pháp phẫu thuật/vô cảm</div>
                    <div class="italic">Surgical/Anesthesia methods</div>
                  </th>
                  <th class="text-center">
                    <div>Bác sỹ phẫu thuật</div>
                    <div class="italic">Surgeon</div>
                  </th>
                  <th class="text-center">
                    <div>Bác sỹ gây mê</div>
                    <div class="italic">Anesthesiologist</div>
                  </th>
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
              <table v-else-if="!DataTable" width="100%" class="tbl-b mrb10">
                <tr>
                  <th class="text-center">Giờ, ngày</th>
                  <th class="text-center">Phương pháp phẫu thuật/vô cảm</th>
                  <th class="text-center">Bác sỹ phẫu thuật</th>
                  <th class="text-center">Bác sỹ gây mê</th>
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
                class="mrb10"
                @getCol="getCol"
                :FormCode="'IPDSANTHPT1'"
                :VisitId="_VisitId"
                :headerStyle="[{width: '120px'}, {}, {width: '150px'}, {width: '150px'}]"
                :VisitType="'IPD'"
                :FormID="Data.Id"
                :print="true"
                :checkShow="true"
                :formatTime="'date'"
                :thead="['','','Bác sỹ phẫu thuật','']"
                :ontop="true"
                ref="TblWithMasterData"/>
            </div>
            <p v-if="routeType === 'Neonatal'"><b>4. Tình trạng sơ sinh ra viện<i>/ Newborn’s status at discharge</i>: </b> {{getValueOfMASTERDATA('IPDMRPETTNB', 'IPDMRPETTNBANS')}}</p>
            <p v-else><b>4. Tình trạng người bệnh ra viện<i>{{__t3('5. Tình trạng người bệnh ra viện')}}</i>: </b> {{getValueOfMASTERDATA('IPDMRPETTNB', 'IPDMRPETTNBANS')}}</p>
            <p v-if="routeType === 'Gynecological'"><b>5. Hướng điều trị và các chế độ tiếp theo<i>/ Treatment plan and further recommendations</i>: </b> {{getValueOfMASTERDATA('IPDMRPEHDTV', 'IPDMRPEHDTVANS')}}</p>
            <p v-else><b>5. {{__label(MASTERDATA['IPDMRPEHDTV'])}}<i>{{__t3('6. Hướng điều trị và các chế độ tiếp theo')}}</i>: </b> {{getValueOfMASTERDATA('IPDMRPEHDTV', 'IPDMRPEHDTVANS')}}</p>
          </div>
        </td>
      </tr>
    </table>
    <table width="100%" class="tbl-b2">
      <tr>
        <td width="50%"></td>
        <td style="text-align: center;">
          <!-- <div>{{Data.DischargeDate | viDisplayformatDateTime}}</div> -->
          <div style="text-align: center;">{{HouseUpdated[0] || '&emsp;&emsp;'}} Giờ<span class="italic" v-if="routeType !== 'Oncology'">/Hour</span> {{HouseUpdated[1] || '&emsp;&emsp;'}} Ngày<span class="italic" v-if="routeType !== 'Oncology'">/Date</span> {{DateUpdated[0] || '&emsp;&emsp;'}} / {{DateUpdated[1] || '&emsp;&emsp;'}} / {{DateUpdated[2] || '&emsp;&emsp;'}}</div>
          <div style="text-align: center;"><b>Bác sỹ điều trị<i>{{__t3('Bác sỹ điều trị')}}</i></b></div>
          <div class="hidden-text"><b>Bác sỹ điều trị</b></div>
          <div class="hidden-text"><b>Bác sỹ điều trị</b></div>
          <div class="hidden-text"><b>Bác sỹ điều trị</b></div>
          <div class="hidden-text"><b>Bác sỹ điều trị</b></div>
          <div class="hidden-text"><b>Bác sỹ điều trị</b></div>
          <div style="text-align: center;"><i>Họ và tên<span class="italic" v-if="routeType !== 'Oncology'">/ Fullname</span>: {{Data.Signature ? Data.Signature.UpdatedBy : ''}}</i></div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import ObstetricsPrint3 from '@/pages/IPD/MedicalRecord/Page2CPN/ObstetricsPrint3.vue'
import OncologyPrint3 from '@/pages/IPD/MedicalRecord/Page2CPN/OncologyPrint3.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedicationsForPrinter.vue'
import TblWithMasterData from '@/components/global/TblWithMasterData'
import EyePrint3 from '@/pages/IPD/MedicalRecord/Page2CPN/EyePrint3.vue'
import BMTIMMACH3Print from '@/pages/IPD/MedicalRecord/Page2CPN/BMTIMMACH3Print.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'IPDMedicalRecordPrinterPart2',
  props: [
    'Data',
    'MASTERDATA',
    'VisitId',
    'routeType',
    'ListSoSinh',
    'optionChild'
  ],
  data () {
    return {
      DataTable: null
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    ListOfCurrentMedications,
    ObstetricsPrint3,
    TblWithMasterData,
    OncologyPrint3,
    EyePrint3,
    BMTIMMACH3Print
  },
  mounted () {
  },
  computed: {
    DateUpdated: function () {
      return (this.Data.Signature && this.Data.Signature.UpdatedAt) ? this.Data.Signature.UpdatedAt.split(' ')[1].split('/') : ['', '', '']
    },
    HouseUpdated: function () {
      return (this.Data.Signature && this.Data.Signature.UpdatedAt) ? this.$options.filters.formatDateWithoutSecon(this.Data.Signature.UpdatedAt).split(' ')[0].split(':') : ['', '']
    }
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
    checkDich () {
      let check = false
      if (
        !this.routeType ||
        this.routeType === 'Gynecological' ||
        this.routeType === 'Obstetrics' ||
        this.routeType === 'A01_195_050919_V' ||
        this.routeType === 'A01_040_050919_V' ||
        this.routeType === 'A01_039_050919_V' ||
        this.routeType === 'Pediatric' ||
        this.routeType === 'Eye' ||
        this.routeType === 'Neonatal' ||
        this.routeType === 'CardiovascularForm'
      ) {
        check = true
      }
      return check
    }
  }
}
</script>
