<template>
  <div v-if="MASTERDATA && Data">
    <div v-if="box1">
      <table width="100%" class="tbl-b2">
        <tr>
          <td>
            20. Nơi chuyển đến: {{MASTERDATA['IPDMRPOCDNC'] ? MASTERDATA['IPDMRPOCDNC'].Items[0].Value : ''}}
          </td>
          <td style="text-align: right;" v-if="MASTERDATA['IPDMRPOMICD']"><CharWithSquare :text="getICD10Code(DataSubmitReadOnlyICD20)" :defaultlength="4"  /></td>
        </tr>
        <tr>
          <td>
            21. Khoa khám bệnh, cấp cứu: {{(Data.ReadOnly.TwentyOne && Data.ReadOnly.TwentyOne.CurrentDiagnosis) ? Data.ReadOnly.TwentyOne.CurrentDiagnosis : ''}}
          </td>
          <td style="text-align: right;"><CharWithSquare :text="(Data.ReadOnly.TwentyOne && Data.ReadOnly.TwentyOne.CurrentICD) && getICD10Code(DataSubmitReadOnlyICD21)" :defaultlength="4"  /></td>
        </tr>
        <tr>
          <td>
            <div>
              22. Khi vào khoa điều trị: {{MASTERDATA['IPDMRPTCDBC'] ? MASTERDATA['IPDMRPTCDBC'].Items[0].Value : ''}}
            </div>
            <div class="flex align-center">
              <span class="mrr20" v-if="MASTERDATA['IPDMRPT1009']">T {{MASTERDATA['IPDMRPT1009'].Items[0].Value || '&emsp;&emsp;&emsp;'}}</span>
              <span class="mrr20" v-if="MASTERDATA['IPDMRPT1010']">N {{MASTERDATA['IPDMRPT1010'].Items[0].Value || '&emsp;&emsp;&emsp;'}}</span>
              <span v-if="MASTERDATA['IPDMRPT1011']">M {{MASTERDATA['IPDMRPT1011'].Items[0].Value || '&emsp;&emsp;&emsp;'}}</span>
            </div>
            <div v-if="MASTERDATA['IPDMRPT1012']">giai đoạn {{MASTERDATA['IPDMRPT1012'].Items[0].Value || '&emsp;&emsp;&emsp;'}}</div>
          </td>
          <td style="text-align: right;" v-if="MASTERDATA['IPDMRPTICDC']"><CharWithSquare :text="getICD10Code(MASTERDATA['IPDMRPTICDC'].Items[0].Value)" :defaultlength="4"  /></td>
        </tr>
        <tr>
          <td colspan="2" v-if="MASTERDATA['IPDMRPT1018']">
            <span class="mrr10">- Tai biến:</span> <VTich class="mrr10" v-model="MASTERDATA['IPDMRPT1018'].Items[0].Value" /> <span class="mrr10">- Biến chứng:</span> <VTich v-model="MASTERDATA['IPDMRPT1018'].Items[1].Value" />
          </td>
        </tr>
        <tr>
          <td colspan="2" v-if="MASTERDATA['IPDMRPT1021']">
            <i><VTich :styleCustom="'margin-right: 50px!important;'" :listData="MASTERDATA['IPDMRPT1021'].Items" /></i>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="flex align-center space-between" v-if="MASTERDATA['IPDMRPE896']">
              <div class="mrr10">23. Tổng số ngày điều trị sau phẫu thuật:</div>
              <div><CharWithSquare :text="MASTERDATA['IPDMRPE896'].Items[0].Value" :defaultlength="3"  /></div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="flex align-center space-between" v-if="MASTERDATA['IPDMRPE894']">
              <div class="mrr10">24. Tổng số lần phẫu thuật: </div>
              <div><CharWithSquare :text="MASTERDATA['IPDMRPE894'].Items[0].Value" :defaultlength="2"  /></div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="box2">
      25. Ra viện:<br/>
      <table width="100%" class="tbl-b2">
        <tr>
          <td>
            <div>+ Bệnh chính: {{MASTERDATA['IPDMRPECDBC'] ? MASTERDATA['IPDMRPECDBC'].Items[0].Value : ''}}</div>
          </td>
          <td style="text-align: right;"><CharWithSquare v-if="MASTERDATA['IPDMRPEICDC']" :text="getICD10Code(MASTERDATA['IPDMRPEICDC'].Items[0].Value)" :defaultlength="4"  /></td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="flex align-center">
              <span class="mrr20" v-if="MASTERDATA['IPDMRPE1029']">T {{MASTERDATA['IPDMRPE1029'].Items[0].Value || '&emsp;&emsp;&emsp;'}}</span>
              <span class="mrr20" v-if="MASTERDATA['IPDMRPE1031']">N {{MASTERDATA['IPDMRPE1031'].Items[0].Value || '&emsp;&emsp;&emsp;'}}</span>
              <span v-if="MASTERDATA['IPDMRPE1033']">M {{MASTERDATA['IPDMRPE1033'].Items[0].Value || '&emsp;&emsp;&emsp;'}}</span>
            </div>
            <div v-if="MASTERDATA['IPDMRPE1035']">giai đoạn {{MASTERDATA['IPDMRPE1035'].Items[0].Value || '&emsp;&emsp;&emsp;'}}</div>
          </td>
        </tr>
        <tr>
          <td v-if="MASTERDATA['IPDMRPECDKT']">
            + Bệnh kèm theo: {{MASTERDATA['IPDMRPECDKT'].Items[0].Value}}
          </td>
          <td style="text-align: right;"><CharWithSquare v-if="MASTERDATA['IPDMRPEICDP'] && !getICD10Codex2(MASTERDATA['IPDMRPEICDP'].Items[0].Value)" :defaultlength="4"/></td>
        </tr>
        <tr :key="index" v-for="(item, index) in getICD10Codex(MASTERDATA['IPDMRPEICDP'].Items[0].Value)">
          <td>
            {{item.ViName}}
          </td>
          <td style="text-align: right;">
            <CharWithSquare :text="item.code" :defaultlength="4"  />
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
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OncologylPrint1',
  props: ['box1', 'box2', 'MASTERDATA', 'Data', 'DataSubmitReadOnlyICD20', 'DataSubmitReadOnlyICD21'],
  components: {
  },
  data () {
    return {
      DateOfBirth: null
    }
  },
  created () {
  },
  methods: {
    getICD10Code (icd) {
      var arr = this.JSONParse(icd) || []
      return arr.map(e => {
        return e.code
      }).join(',')
    },
    getICD10Codex (icd) {
      return this.JSONParse(icd, true)
    },
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
<style scoped>
</style>
