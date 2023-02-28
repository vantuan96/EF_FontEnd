<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? getFTime(FormV2.UpdateAt) : getFTime(Form.UpdatedAt)}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <OutpatientExaminationNoteViewOnly
        v-if="DataSubmit.IsConsultation === false"
        :VisitId="_VisitId"
        :DataSubmit="DataSubmit"
        :MASTERDATA="MASTERDATA"
        :VisitType="VisitType"
      />
      <MedicalConsultationFormView v-if="DataSubmit.IsConsultation === true" :readonly="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit"/>
    </template>
  </Vcollapse>
</template>
<script>
import OutpatientExaminationNote from '@/services/OPD/OutpatientExaminationNote'
import MixinMasterData from '@/mixins/masterdata.js'
import _ from 'lodash'
import OutpatientExaminationNoteViewOnly from '@/components/OPD/OutpatientExaminationNoteForm.vue'
import MedicalConsultationFormView from '@/pages/OPD/OutpatientExaminationNote/MedicalConsultationFormView.vue'
export default {
  name: 'OPDTelehealthExaminationNote',
  mixins: [MixinMasterData],
  props: ['VisitId', 'readonlyview', 'Form', 'FormV2', 'VisitType'],
  components: {
    OutpatientExaminationNoteViewOnly, MedicalConsultationFormView
  },
  data () {
    return {
      CODE1: [
        'OPDOENKTT', 'OPDOENKCK', 'OPDOENKTP', 'OPDOENKCBPK',
        'OPDOENBHC', 'OPDOENKYT', 'OPDOENKCGTG', 'OPDOENKTD', 'OPDOENKCX', 'OPDOENKHD', 'OPDOENKCY', 'OPDOENKTN', 'OPDOENKTRT', 'OPDOENTTL'
      ],
      CODE1_1: [
        'OPDOENTSKN', 'OPDOENTSK'
      ],
      CODE2Adults: [
        // 'OPDOENBHC', 'OPDOENKYT', 'OPDOENKCGTG', 'OPDOENKTD', 'OPDOENKCX', 'OPDOENKHD',
        // 'OPDOENKCY', 'OPDOENKTN', 'OPDOENKTRT', 'OPDOENTTL'
      ],
      CODE2Child: [
        'OPDOENNGNG', 'OPDOENNTTTXH', 'OPDOENHVTTCY', 'OPDOENCGXG', 'OPDOENKTTPV', 'OPDOENMSTTLCT'
      ],
      CODE3: [
        'OPDOENKTTTHGC', 'OPDOENDGCGNM', 'OPDOENDGDNM', 'OPDOENKLN'
      ],
      CODE4: [
        'OPDOENKTM', 'OPDOENKHH'
      ],
      OPDOENDG: [
        'OPDOENMCN', 'OPDOENDCT', 'OPDOENTDTT', 'OPDOENTHCVD', 'OPDOENPHCN'
      ],
      OPDOENDG1: [
        'OPDOENCNHH', 'OPDOENSCD', 'OPDOENKNGS', 'OPDOENTDNT'
      ],
      OPDOENDG2: [
        'OPDOENKNGT', 'OPDOENTTRLN', 'OPDOENNTKG', 'OPDOENDVTH', 'OPDOENDCDL'
      ],
      CODE5: [
        'OPDOENCCQK', 'OPDOENKTMH', 'OPDOENKDD', 'OPDOENTC', 'OPDOENPTVD', 'OPDOENPTTT'
      ],
      OPDOENTSSK: ['OPDOENTSSK', 'OPDOENTSKN', 'OPDOENTSK'],
      DataSubmit: {
        Data: []
      },
      loaded: false,
      isNew: false,
      collapseId: '',
      open: false,
      pId: null,
      message: null,
      isErrorPop: false,
      hasData: false
    }
  },
  computed: {
    getMDSPECIALITIESS: function () {
      var status = ''
      if (this.DataSubmit.Status) {
        status = this.DataSubmit.Status.EnName === 'Admitted' ? 'IPD' : 'ED'
      }
      return this.MDSPECIALITIES.filter(e => {
        return e.VisitTypeGroup === status
      })
    },
    bmiCalculation: function () {
      var weight = this.MASTERDATA['OPDOENWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value) : 0
      var height = this.MASTERDATA['OPDOENHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    },
    OPDOENBMIlabel: function () {
      if (this.MASTERDATA['OPDOENTUOI'].Items[0].Value) {
        return 'BMI'
      }
      if (this.MASTERDATA['OPDOENTUOI'].Items[1].Value) {
        return 'BMI theo Z-score'
      }
      if (this.MASTERDATA['OPDOENTUOI'].Items[2].Value) {
        return 'Z-score theo cân nặng/tuổi, chiều/tuổi,cân nặng/chiều cao theo tuổi và giới'
      }
      return 'BMI'
    }
  },
  mounted () {
    // new OutpatientExaminationNote({IsConsultation: 'false'})
    //   .update('SetConsultation/' + this.$route.params.Id)
    //   .then(() => {
    //   })
  },
  created () {
  },
  methods: {
    showWithOPDOENDG () {
      return this.MASTERDATA['OPDOENDG'].Items[0].Value || this.MASTERDATA['OPDOENDG'].Items[2].Value
    },
    hideWithOPDOENDG () {
      if (this.DataSubmit.Clinic) {
        return this.DataSubmit.Clinic.Code !== 'MultiSelect-001'
      }
      return false
    },
    isOPDOENKNKT () {
      if (this.DataSubmit.Clinic) {
        return this.DataSubmit.Clinic.Code === 'FreeTextOnly-007'
      }
      return false
    },
    hasKCK () {
      return this.DataSubmit.Clinic && ['FreeTextOnly-000', 'FreeTextOnly-001', 'FreeTextOnly-006', 'RadioYesNo-001'].includes(this.DataSubmit.Clinic.Code)
    },
    showWithClinic (codes) {
      if (this.DataSubmit.Clinic && this.DataSubmit.Clinic.Code && codes) {
        var codess = codes.replace(/\s/g, '').split(',')
        return codess.includes(this.DataSubmit.Clinic.Code)
      }
      return false
    },
    collapse () {
      this.open = !this.open
    },
    getData () {
      this.getSpecialities()
      this.getMasterDatas({Form: 'OPDOEN'}, () => {
        new OutpatientExaminationNote().find(this._VisitId).then(response => {
          this.hasData = true
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          if (response.ErrorPopup) {
            this.pId = response.Id
            this.message = response.ViMessage
            this.isErrorPop = true
          }
          this.isNew = false
          this.loaded = true
          // test
          // if (response.Clinic && response.Clinic.Code) {
          //   response.Clinic.Code = 'MultiSelect-001'
          // }
          this.DataSubmit = response
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(this.DataSubmit.Datas, {Code: code})
                if (exited) {
                  if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                    var isTrue = (exited.Value === 'True')
                    item.Value = isTrue
                  } else if (item.Code === 'OPDOENICDANS' || item.Code === 'OPDOENICDOPT' || item.Code === 'OPDOENICD0101') {
                    item.Value = this.JSONParse(exited.Value)
                  } else {
                    item.Value = exited.Value
                  }
                }
              })
            }
          }
        }).catch(e => {
          this.isNew = true
        })
      })
    }
  }
}
</script>
