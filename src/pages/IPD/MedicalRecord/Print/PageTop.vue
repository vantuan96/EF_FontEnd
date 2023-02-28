<template>
  <table width="100%">
    <tr>
      <td width="35%" valign="top">
        <p>
          <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
        </p>
        <div>Sở y tế<i>{{getEnName(0)}}</i>: {{Data.LocationUnit}} {{Data.Province}}</div>
        <div>Bệnh viện<i>{{getEnName(1)}}</i>: VINMEC {{Data.Site}}</div>
        <div>Khoa<i>{{getEnName(2)}}</i>: {{Data.SpecialtyName}}</div>
      </td>
      <td align="center"
        v-if="routeType &&
          routeType !== 'Gynecological' &&
          routeType !== 'Obstetrics' &&
          routeType !== 'A01_195_050919_V' &&
          routeType !== 'A01_040_050919_V' &&
          routeType !== 'A01_039_050919_V' &&
          routeType !== 'Pediatric' &&
          routeType !== 'Eye' &&
          routeType !== 'Neonatal' &&
          routeType !== 'CardiovascularForm'
        ">
        <h2 style="font-size: 30px;white-space: nowrap;">{{getBigLabel()}}</h2>
      </td>
      <td width="50%" align="center" style="vertical-align: bottom!important;" v-else>
        <div v-if="routeType === 'A01_040_050919_V'">
          <div class="fw500" style="font-size: 30px;white-space: nowrap;">BỆNH ÁN<br>RĂNG - HÀM - MẶT</div>
          <div class="italic text-center" style="font-size: 20px;white-space: nowrap;">DENTAL-MAXILLOFACIAL<br>MEDICAL RECORD</div>
        </div>
        <div v-else-if="routeType === 'Obstetrics'">
          <div class="fw500" style="font-size: 30px;white-space: nowrap;">BỆNH ÁN SẢN KHOA</div>
          <div class="italic text-center" style="font-size: 20px;white-space: nowrap;">OBSTETRIC MEDICAL RECORD</div>
        </div>
        <div v-else-if="routeType === 'A01_195_050919_V'">
          <div class="fw500" style="font-size: 30px;white-space: nowrap;">BỆNH ÁN NGOẠI KHOA</div>
          <div class="italic text-center" style="font-size: 20px;white-space: nowrap;">SURGICAL MEDICAL RECORD</div>
        </div>
        <div v-else-if="routeType === 'A01_039_050919_V'">
          <div class="fw500" style="font-size: 30px;white-space: nowrap;">BỆNH ÁN<br>TAI - MŨI - HỌNG</div>
          <div class="italic text-center" style="font-size: 20px;white-space: nowrap;">E.N.T MEDICAL RECORD</div>
        </div>
        <div v-else-if="routeType === 'Eye'">
          <div class="fw500" style="font-size: 30px;white-space: nowrap;">BỆNH ÁN MẮT</div>
          <div class="italic text-center" style="font-size: 20px;white-space: nowrap;">OPHTHALMOLOGY  MEDICAL<br>RECORD</div>
        </div>
        <div v-else-if="routeType === 'Neonatal'">
          <div class="fw500" style="font-size: 30px;white-space: nowrap;">BỆNH ÁN SƠ SINH</div>
          <div class="italic text-center" style="font-size: 20px;white-space: nowrap;">NEONATAL MEDICAL RECORD</div>
        </div>
        <div v-else-if="routeType === 'CardiovascularForm'">
          <div class="fw500" style="font-size: 30px;white-space: nowrap;">BỆNH ÁN NỘI KHOA</div>
          <div class="italic text-center" style="font-size: 20px;white-space: nowrap;">Medical report for inpatient</div>
        </div>
        <div v-else>
          <div class="fw500" style="font-size: 30px;white-space: nowrap;">{{getBigLabel()}}</div>
          <div class="italic text-center" style="font-size: 20px;white-space: nowrap;">{{__t5(getBigLabel())}}</div>
        </div>
      </td>
      <td align="middle"><CustomerBarCode :customer="Data.Customer" :height="50"/></td>
    </tr>
    <tr v-if="allergyInfo">
      <td>
      </td>
      <td>
      </td>
      <td>
        <div class="customDT">
          Dị ứng<i>{{getEnName(3)}}</i>: {{allergyInfo}}
        </div>
      </td>
    </tr>
  </table>
</template>
<script>
import constants from '@/constants'

/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
export default {
  /**
   * The name of the page.
   */
  name: 'IPDMedicalRecordPrinterTop',
  props: ['Data', 'DataAT', 'routeType'],
  data () {
    return {
      EnName: [
        'Department of Health',
        'Hospital',
        'Department',
        'Allergy'
      ]
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
  },
  computed: {
    allergyInfo: function () {
      console.log(this.DataAt, 'check data AT')
      if (this.DataAT.Allergy.KindOfAllergy) {
        var allergyOption = this.DataAT.Allergy.KindOfAllergy
        return constants.ALLERGY.filter(e => allergyOption.includes(e.value)).map(e => e.label).join(' ,')
      }
      return null
    }
  },
  methods: {
    getBigLabel () {
      return 'BỆNH ÁN ' + this.MedicalRecordFormName
    },
    getEnName (dex) {
      let str = ''
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
        str = '/ ' + this.EnName[dex]
      }
      return str
    }
  }
}
</script>
<style lang="css">
  .customDT {
    width: 100%;
    max-width: 130px;
    word-wrap: break-word;
  }
</style>
