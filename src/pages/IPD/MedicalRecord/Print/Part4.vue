<template>
  <div>
    <EyePrint4 v-if="routeType === 'Eye'" :Data="Data" :MASTERDATA="MASTERDATA" />
    <div v-if="routeType === 'A01_039_050919_V' && MASTERDATA['IPDMRPT10002'] && hasData(MASTERDATA['IPDMRPT10002'])" class="mt-10">
      <div class="fw600 fs18 mrb10"><b>File đính kèm<i>/ Atachment</i></b></div>
      <IPDMRPT10002
        :isPrint="true"
        :onlyImage="true"
        :MASTERDATA="MASTERDATA"
        :index="[0, 1]"
        :t3="true"
      />
      <IPDMRPT10002
        :isPrint="true"
        :onlyImage="true"
        :MASTERDATA="MASTERDATA"
        :index="[2, 3]"
        :t3="true"
      />
      <IPDMRPT10002
        :isPrint="true"
        :onlyImage="true"
        :MASTERDATA="MASTERDATA"
        :index="[4, 5]"
        :t3="true"
      />
      <IPDMRPT10002
        :isPrint="true"
        :onlyImage="true"
        :MASTERDATA="MASTERDATA"
        :index="[6, 7]"
        :t3="true"
      />
      <IPDMRPT10002
        :isPrint="true"
        :onlyImage="true"
        :MASTERDATA="MASTERDATA"
        :index="[8, 9]"
        :t3="true"
      />
      <IPDMRPT10002
        :isPrint="true"
        :onlyImage="true"
        :MASTERDATA="MASTERDATA"
        :index="[10, 11]"
        :t3="true"
      />
      <IPDMRPT10002
        :isPrint="true"
        :onlyImage="true"
        :MASTERDATA="MASTERDATA"
        :index="[12, 13]"
        :t3="true"
      />
      <IPDMRPT10002
        :isPrint="true"
        :onlyImage="true"
        :MASTERDATA="MASTERDATA"
        :index="[14, 15]"
        :t3="true"
      />
    </div>
    <div v-if="routeType === 'A01_040_050919_V' && MASTERDATA['IPDMRPT10025'] && hasData(MASTERDATA['IPDMRPT10025'])" class="mt-10">
      <div class="fw600 fs18 mrb10"><b>File đính kèm</b></div>
      <IPDMRPT10002
        :isPrint="true"
        :onlyImage="true"
        :MASTERDATA="MASTERDATA"
        :MDCODE="'IPDMRPT10025'"
        :index="[0, 1]"
        :t3="true"
      />
      <IPDMRPT10002
        :isPrint="true"
        :onlyImage="true"
        :MASTERDATA="MASTERDATA"
        :MDCODE="'IPDMRPT10025'"
        :index="[2, 3]"
        :t3="true"
      />
      <IPDMRPT10002
        :isPrint="true"
        :onlyImage="true"
        :MASTERDATA="MASTERDATA"
        :MDCODE="'IPDMRPT10025'"
        :index="[4, 5]"
        :t3="true"
      />
      <IPDMRPT10002
        :isPrint="true"
        :onlyImage="true"
        :MASTERDATA="MASTERDATA"
        :MDCODE="'IPDMRPT10025'"
        :index="[6, 7]"
        :t3="true"
      />
      <IPDMRPT10002
        :isPrint="true"
        :onlyImage="true"
        :MASTERDATA="MASTERDATA"
        :MDCODE="'IPDMRPT10025'"
        :index="[8, 9]"
        :t3="true"
      />
      <IPDMRPT10002
        :isPrint="true"
        :onlyImage="true"
        :MASTERDATA="MASTERDATA"
        :MDCODE="'IPDMRPT10025'"
        :index="[10, 11]"
        :t3="true"
      />
    </div>
  </div>
</template>
<script>
import EyePrint4 from '@/pages/IPD/MedicalRecord/Page2CPN/EyePrint4.vue'
import IPDMRPT10002 from '../IPDMRPT10002.vue'
export default {
  name: 'IPDMedicalRecordPrinterPart4',
  props: ['Data', 'MASTERDATA', 'VisitId', 'routeType'],
  data () {
    return {
      DataTable: null
    }
  },
  components: {
    EyePrint4, IPDMRPT10002
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    hasData (mddata) {
      return mddata.Items.find(e => e.DataType === 'UploadFiles' && e.Value && e.Value !== '[]')
    }
  }
}
</script>
