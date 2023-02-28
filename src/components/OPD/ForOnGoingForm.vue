<template>
  <div>
    <table class="table v-table-1 no-margin">
      <tr v-if="DataSubmit.InitialAssessmentForm && item.Id === VisitId && !hideInitialAssessmentForm" :data="item" :key="index + 'InitialAssessmentForm'" v-for="(item,index) in DataSubmit.InitialAssessmentForm">
        <td colspan="2">
          <labelvalue :label="__t('Phòng khám')" :value="__label(item.Clinic)" />
          <labelvalue :label="__t('Thời gian khám')" :value="item.AdmittedDate" />
          <labelvalue v-if="item.PrimaryDoctor" :label="__t('Bác sĩ khám')" :value="item.PrimaryDoctor.Fullname" />
        </td>
      </tr>
    </table>
    <div v-if="_VisitType === 'EOC' && hideInitialAssessmentForm" class="tbl-title">2. {{__t('Thông tin chung')}}</div>
    <div v-if="_VisitType === 'OPD' && hideInitialAssessmentForm" class="tbl-title">1. {{__t('Thông tin chung')}}</div>
    <table class="table v-table-1 no-margin">
      <tr v-if="MASTERDATA['OPDIAFOGOPLAN']">
        <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPLAN'])}}</th>
        <td>
          <div class="flex-box flex-center">
            <MDRadioView :data="MASTERDATA['OPDIAFOGOPLAN'].Items"/>
            <span class="fake-input disable"  v-if="MASTERDATA['OPDIAFOGOPLAN'].Items[1].Value">{{MASTERDATA['OPDIAFOGOPLAN'].Items[2].Value || 'N/A'}}</span>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFOGOPREL']">
        <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPREL'])}}</th>
        <td>
          <div class="flex-box flex-center">
            <VSelectBox v-model="MASTERDATA['OPDIAFOGOPREL'].Items[0].Value" :items="select2Suggest(MASTERDATA['OPDIAFOGOPREL'].Items[0].Data)"/>
            <span class="fake-input disable" v-if="MASTERDATA['OPDIAFOGOPREL'].Items[0].Value == 6">{{MASTERDATA['OPDIAFOGOPREL'].Items[1].Value || 'N/A'}}</span>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFOGOPCAR']">
        <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPCAR'])}}</th>
        <td>
          <div :data="item" :key="index"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPCAR'].Items">
            <span class="fake-input disable">{{item.Value || 'N/A'}}</span>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFOGOPSP0']">
        <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPSP0'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['OPDIAFOGOPSP0'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFOGOPPRE']">
        <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPPRE'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['OPDIAFOGOPPRE'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFOGOPBF0']">
        <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPBF0'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['OPDIAFOGOPBF0'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFOGOPCPS']">
        <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPCPS'])}}</th>
        <td>
          <div class="flex-box flex-center">
            <MDRadioView :data="MASTERDATA['OPDIAFOGOPCPS'].Items"/>
            <span class="fake-input disable" v-if="MASTERDATA['OPDIAFOGOPCPS'].Items[3].Value">{{MASTERDATA['OPDIAFOGOPCPS'].Items[4].Value || 'N/A'}}</span>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFOGOPADL']">
        <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPADL'])}}</th>
        <td>
          <table class="no-border">
            <tr v-if="MASTERDATA['OPDIAFOGOPBT0']">
              <th width="180">{{__label(MASTERDATA['OPDIAFOGOPBT0'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFOGOPBT0'].Items"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['OPDIAFOGOPEAT']">
              <th>{{__label(MASTERDATA['OPDIAFOGOPEAT'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFOGOPEAT'].Items"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['OPDIAFOGOPMOV']">
              <th>{{__label(MASTERDATA['OPDIAFOGOPMOV'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFOGOPMOV'].Items"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['OPDIAFOGOPGRO']">
              <th>{{__label(MASTERDATA['OPDIAFOGOPGRO'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFOGOPGRO'].Items"/>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFOGOPNA0']">
        <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPNA0'])}}</th>
        <td>
          <table class="no-border">
            <tr v-if="MASTERDATA['OPDIAFOGOPWLO']">
              <th width="180">{{__label(MASTERDATA['OPDIAFOGOPWLO'])}}</th>
              <td>
                <div class="flex-box flex-center">
                  <MDRadioView :data="MASTERDATA['OPDIAFOGOPWLO'].Items"/>
                  <b v-if="MASTERDATA['OPDIAFOGOPWLO'].Items[0].Value">{{__t('Tăng/giảm bao nhiêu kg?')}}</b>
                  <span class="fake-input disable" v-if="MASTERDATA['OPDIAFOGOPWLO'].Items[0].Value">{{MASTERDATA['OPDIAFOGOPWLO'].Items[2].Value || 'N/A'}}</span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['OPDIAFOGOPREA'] && MASTERDATA['OPDIAFOGOPWLO'].Items[0].Value">
              <th>{{__label(MASTERDATA['OPDIAFOGOPREA'])}}</th>
              <td>
                <div class="flex-box flex-center">
                  <MDRadioView :data="MASTERDATA['OPDIAFOGOPREA'].Items"/>
                  <span class="fake-input disable" v-if="MASTERDATA['OPDIAFOGOPREA'].Items[0].Value">{{MASTERDATA['OPDIAFOGOPREA'].Items[2].Value || 'N/A'}}</span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['OPDIAFOGOPDIE']">
              <th>{{__label(MASTERDATA['OPDIAFOGOPDIE'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFOGOPDIE'].Items"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['OPDIAFOGOPAPP']">
              <th>{{__label(MASTERDATA['OPDIAFOGOPAPP'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFOGOPAPP'].Items"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['OPDIAFOGOPFR0']">
              <th>{{__label(MASTERDATA['OPDIAFOGOPFR0'])}}</th>
              <td>
                <div class="flex-box flex-center">
                  <MDRadioView :data="MASTERDATA['OPDIAFOGOPFR0'].Items"/>
                  <span class="fake-input disable" v-if="MASTERDATA['OPDIAFOGOPFR0'].Items[2].Value">{{MASTERDATA['OPDIAFOGOPFR0'].Items[3].Value || 'N/A'}}</span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['OPDIAFOGOPBH0']">
              <th>{{__label(MASTERDATA['OPDIAFOGOPBH0'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFOGOPBH0'].Items"/>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <div v-if="this.DataSubmit.Version >= 7 && !hideInitialAssessmentForm" class="row mt-10">
      <div class="col-md-6 col-sm-6 col-md-offset-6 col-sm-offset-6 text-center" v-if="ConfirmInfo.length > 0 ? ConfirmInfo[0].ConfirmBy : false">
        <p class="text-center">{{ConfirmInfo[0].ConfirmAt | formatDateWithoutSecon}}</p>
        <EformSignature2 :title="__t('Noi_tru_san.nguoi_thuc_hien')" :ad="ConfirmInfo[0].ConfirmBy || ''"/>
      </div>
      <div class="col-md-6 col-sm-6 col-md-offset-6 col-sm-offset-6 text-center" v-else>
        <p class="mt-10"><b>{{__t('Noi_tru_san.nguoi_thuc_hien')}}:</b></p>
        <div v-if="_VisitType === 'EOC'">
          <ad-Info v-if="DataSubmit.CreatedBy && !DataSubmit.IsNew" :ad="DataSubmit.CreatedBy || ''" class="mb-5"/>
        </div>
        <div>
          <ad-Info v-if="DataSubmit.UpdatedBy && !DataSubmit.IsNew" :ad="DataSubmit.UpdatedBy || ''" class="mb-5"/>
        </div>
        <p class="italic" style="color: green">({{(__t('Chưa ký xác nhận'))}})</p>
      </div>
    </div>
  </div>
</template>
<script>
// import InitialAssessmentForm from '@/components/OPD/InitialAssessmentForm.vue'
import VSelectBox from '@/components/VSelectDisplay.vue'
export default {
  name: 'ForOnGoingForm',
  props: ['MASTERDATA', 'DataSubmit', 'VisitId', 'hideInitialAssessmentForm', 'ConfirmInfo', 'VisitType'],
  components: {VSelectBox},
  data () {
    return {
    }
  },
  computed: {
    bmiCalculation: function () {
      var weight = this.MASTERDATA['OPDIAFSTOPWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDIAFSTOPWEI'].Items[0].Value) : 0
      var height = this.MASTERDATA['OPDIAFSTOPHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDIAFSTOPHEI'].Items[0].Value) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    }
  },
  mounted () {
    console.log('VisitType', this._VisitType)
  },
  created () {
  },
  methods: {
    select2Suggest (data) {
      var list = this.JSONParse(data)
      if (list) {
        return list.map(e => {
          e.id = e.value
          e.name = e.vilabel
          e.label = e.vilabel
          return e
        })
      } else {
        return []
      }
    }
  }
}
</script>
