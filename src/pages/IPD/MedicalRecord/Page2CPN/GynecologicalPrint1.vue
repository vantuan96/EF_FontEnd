<template>
  <div v-if="MASTERDATA && Data">
    <div v-if="box1">
      <table width="100%" class="tbl-b2">
        <tr>
          <td>
            {{dex[19]}} Nơi chuyển đến<i>{{__t3('Nơi chuyển đến')}}</i>: {{MASTERDATA['IPDMRPOCDNC'] ? MASTERDATA['IPDMRPOCDNC'].Items[0].Value : ''}}
          </td>
          <td style="text-align: right;" v-if="MASTERDATA['IPDMRPOMICD']"><CharWithSquare :text="getICD10Code(DataSubmitReadOnlyICD20)" :defaultlength="4"  /></td>
        </tr>
        <tr>
          <td>
            {{dex[20]}} Khoa khám bệnh, cấp cứu<i>{{__t3('Khoa khám bệnh, cấp cứu')}}</i>: {{(Data.ReadOnly.TwentyOne && Data.ReadOnly.TwentyOne.CurrentDiagnosis) ? Data.ReadOnly.TwentyOne.CurrentDiagnosis : ''}}
          </td>
          <td style="text-align: right;"><CharWithSquare :text="(Data.ReadOnly.TwentyOne && Data.ReadOnly.TwentyOne.CurrentICD) && getICD10Code(DataSubmitReadOnlyICD21)" :defaultlength="4"  /></td>
        </tr>
        <tr>
          <td>
            {{dex[21]}} Khi vào khoa điều trị<i>/ At admission</i>: {{MASTERDATA['IPDMRPTCDBC'] ? MASTERDATA['IPDMRPTCDBC'].Items[0].Value : ''}}
          </td>
          <td style="text-align: right;" v-if="MASTERDATA['IPDMRPTICDC']"><CharWithSquare :text="getICD10Code(MASTERDATA['IPDMRPTICDC'].Items[0].Value)" :defaultlength="4"  /></td>
        </tr>
        <tr>
          <td colspan="2" v-if="MASTERDATA['IPDMRPE898']">
            <span class="mrr10">- Tai biến<i>{{__t3('Tai biến')}}</i>:</span> <VTich :t3="true" class="mrr10" v-model="MASTERDATA['IPDMRPE898'].Items[0].Value" /><br><span class="mrr10">- Biến chứng<i>{{__t3('Biến chứng')}}</i>:</span> <VTich :t3="true" v-model="MASTERDATA['IPDMRPE898'].Items[1].Value" />
          </td>
        </tr>
        <tr>
          <td colspan="2" v-if="MASTERDATA['IPDMRPE901']">
            <i><VTich2 :t3="true" :listData="MASTERDATA['IPDMRPE901'].Items" /></i>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="flex align-center space-between" v-if="MASTERDATA['IPDMRPE896']">
              <div class="mrr10">{{dex[22]}} Tổng số ngày điều trị sau phẫu thuật<i>{{__t3('Tổng số ngày điều trị sau phẫu thuật')}}</i>:</div>
              <div><CharWithSquare :text="MASTERDATA['IPDMRPE896'].Items[0].Value" :defaultlength="3"  /></div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="flex align-center space-between" v-if="MASTERDATA['IPDMRPE894']">
              <div class="mrr10">{{dex[23]}} Tổng số lần phẫu thuật<i>{{__t3('Tổng số lần phẫu thuật')}}</i>: </div>
              <div><CharWithSquare :text="MASTERDATA['IPDMRPE894'].Items[0].Value" :defaultlength="2"  /></div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="box2">
      {{dex[24]}} Ra viện<i>/ Hospital discharge</i>:<br/>
      <table width="100%" class="tbl-b2">
        <tr>
          <td>
            + Bệnh chính<i>/ Primary diagnosis</i>: <i>(tổn thương/ disease)</i>{{MASTERDATA['IPDMRPECDBC'] ? MASTERDATA['IPDMRPECDBC'].Items[0].Value : ''}}
          </td>
          <td style="text-align: right;"><CharWithSquare v-if="MASTERDATA['IPDMRPEICDC']" :text="getICD10Code(MASTERDATA['IPDMRPEICDC'].Items[0].Value)" :defaultlength="4"  /></td>
        </tr>
        <tr>
          <td v-if="MASTERDATA['IPDMRPECDKT']">
            + Bệnh kèm theo<i>/ Co-morbidities</i>: {{MASTERDATA['IPDMRPECDKT'].Items[0].Value}}
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
  name: 'GynecologicalPrint1',
  props: ['box1', 'box2', 'MASTERDATA', 'Data', 'DataSubmitReadOnlyICD20', 'DataSubmitReadOnlyICD21', 'routeType'],
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
  },
  computed: {
    dex () {
      let array = []
      for (let i = 0; i < 50; i++) {
        array.push(i + '.')
      }
      if (this.routeType === 'Eye' || this.routeType === 'A01_040_050919_V' || this.routeType === 'A01_039_050919_V') {
        for (let i = 19; i < 50; i++) {
          array[i] = (i + 1) + '.'
        }
      }
      return array
    }
  }
}
</script>
<style scoped>
</style>
