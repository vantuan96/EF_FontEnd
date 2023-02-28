<template>
  <div>
    <div class="row mt-10 mb-10">
      <div v-if="MASTERDATA['OPDFRSFOPLOC']" class="col-md-4">
        <div class="flex-box flex-center">
          <label class="display-inline no-wrap mr-5 my-0">{{__label(MASTERDATA['OPDFRSFOPLOC'])}}:</label>
          <div v-if="_VisitType === 'EOC'">
            <FakeInput style="margin-left: 0;" v-model="MASTERDATA['OPDFRSFOPLOC'].Items[0].Value" />
          </div>
          <div v-else-if="getCilinicName">
            <FakeInput v-if="getCilinicName" style="margin-left: 0;" v-model="getCilinicName.ViName" />
            <p class="fake-input" v-else >N/A</p>
          </div>
          <div v-else>
            <FakeInput v-if="DataSubmit.ClinicOfDoctorPrimary" style="margin-left: 0;" v-model="DataSubmit.ClinicOfDoctorPrimary" />
            <p class="fake-input" v-else >N/A</p>
          </div>
        </div>
      </div>
      <div v-if="MASTERDATA['OPDFRSFOPTD0']" class="col-md-4">
        <div class="flex-box flex-center">
          <label class="display-inline no-wrap mr-5 my-0">{{__label(MASTERDATA['OPDFRSFOPTD0'])}}:</label>
          <VDateTimePicker3 :readonly="true" :hideTooltip="true" v-model="MASTERDATA['OPDFRSFOPTD0'].Items[0].Value" :format="vDateTimeFormat"/>
        </div>
      </div>
      <div v-if="DataSubmit && DataSubmit.Version < 9" class="col-md-4">
        <div style="transform: translateY(7px);" class="flex-box flex-center">
          <label class="display-inline no-wrap mr-5 my-0">{{__t('ETR.nguoi_thuc_hien')}}:</label>
          <ad-Info class="no-margin" :ad="DataSubmit.CreatedBy"/>
        </div>
      </div>
    </div>
    <table class="table v-table-1 table-bordered">
      <tr v-if="MASTERDATA['OPDFRSFOPTD0']">
        <th class="align-left">{{__t('ETR.screening')}}</th>
        <th width="35%" class="text-center">{{__t('ETR.thuc_hien')}}</th>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPUTH']">
        <td class="text-bold">{{__t('ETR.doi_tuong_co_nguy_co_nga_cao')}} ?</td>
        <td>
          <div class="v-btn-checkbox text-center">
            <span class="el-radio-view" :class="{'disable': !YESNO[MASTERDATA['OPDFRSFOPUTH'].Items[0].Value]}">{{__t(YESNO[MASTERDATA['OPDFRSFOPUTH'].Items[0].Value]) || 'N/A'}}</span>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPDPH'] && (!checkHiddenRow() && MASTERDATA['OPDFRSFOPUTH'].Items[0].Value === '1')">
        <td>1. {{__label(MASTERDATA['OPDFRSFOPDPH'])}}</td>
        <td>
          <div class="v-btn-checkbox text-center">
            <span class="el-radio-view" :class="{'disable': !YESNO[MASTERDATA['OPDFRSFOPDPH'].Items[0].Value]}">{{__t(YESNO[MASTERDATA['OPDFRSFOPDPH'].Items[0].Value]) || 'N/A'}}</span>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPDPN'] && (!checkHiddenRow() && MASTERDATA['OPDFRSFOPUTH'].Items[0].Value === '1')">
        <td>2. {{__t('ETR.screening_2')}} ?</td>
        <td>
          <div class="v-btn-checkbox text-center">
            <span class="el-radio-view" :class="{'disable': !YESNO[MASTERDATA['OPDFRSFOPDPN'].Items[0].Value]}">{{__t(YESNO[MASTERDATA['OPDFRSFOPDPN'].Items[0].Value]) || 'N/A'}}</span>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPHPF'] && (!checkHiddenRow() && MASTERDATA['OPDFRSFOPUTH'].Items[0].Value === '1')">
        <td>3. {{__label(MASTERDATA['OPDFRSFOPHPF'])}}</td>
        <td>
          <div class="v-btn-checkbox text-center">
            <span class="el-radio-view" :class="{'disable': !YESNO[MASTERDATA['OPDFRSFOPHPF'].Items[0].Value]}">{{__t(YESNO[MASTERDATA['OPDFRSFOPHPF'].Items[0].Value]) || 'N/A'}}</span>
          </div>
        </td>
      </tr>
      <template v-if="hasInitialAssessment">
        <tr v-if="MASTERDATA['OPDFRSFOPINT']">
          <th colspan="4" style="text-align: left;">{{__label(MASTERDATA['OPDFRSFOPINT'])}}</th>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPFRS']">
          <td>1. {{__t('ETR.intervention_1')}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['OPDFRSFOPFRS'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPPIO']">
          <td>2. {{__label(MASTERDATA['OPDFRSFOPPIO'])}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['OPDFRSFOPPIO'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPLUA']">
          <td>3. {{__t('ETR.intervention_3')}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['OPDFRSFOPLUA'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPIOE']">
          <td>4. {{__t('ETR.intervention_4')}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['OPDFRSFOPIOE'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPSPM']">
          <td>5. {{__label(MASTERDATA['OPDFRSFOPSPM'])}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['OPDFRSFOPSPM'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPPAA']">
          <td>6. {{__t('ETR.intervention_6')}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['OPDFRSFOPPAA'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPEDF']">
          <td>7. {{__t('ETR.intervention_7')}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['OPDFRSFOPEDF'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPRM0']">
          <td>8. {{__label(MASTERDATA['OPDFRSFOPRM0'])}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['OPDFRSFOPRM0'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPRBR']">
          <td>9. {{__t('ETR.intervention_9')}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['OPDFRSFOPRBR'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPUTY']">
          <td>10. {{__t('ETR.intervention_10')}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['OPDFRSFOPUTY'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPOTH']">
          <td>
            11. {{__label(MASTERDATA['OPDFRSFOPOTH'])}}
            <FakeInput style="margin-left: 0;" v-model="MASTERDATA['OPDFRSFOPOTH'].Items[0].Value" />
          </td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['OPDFRSFOPOTH'].Items[1].Value" />
          </td>
        </tr>
      </template>
    </table>
    <div v-if="DataSubmit.Version >= 9">
      <Confirm
        class="mt-10"
        :key="reset"
        :MasterDataCode="'FALLRISKSCREENINGCONFIRM'"
        :FormCode="getConfirmFormCode"
        :ReadOnly="true"
        :AdInfo="[DataSubmit.CreatedBy]"
        :VisitId="_VisitId"
        :FormId="DataSubmit.Id"
        :saveSuccesss="false"
      />
    </div>
  </div>
</template>
<script>
import Confirm from '@/components/Form/Confirm3'
import VSelect from '@/components/VSelect.vue'
import VDateTimePicker3 from '@/components/VDateTimePicker3.vue'
export default {
  name: 'FallRiskScreenViewV2',
  props: ['VisitId', 'VisitType', 'MASTERDATA', 'options', 'DataSubmit', 'checkHiddenRow'],
  components: {VSelect, VDateTimePicker3, Confirm},
  data () {
    return {
      hasData: false,
      YESNO: ['Không', 'Có'],
      CHECKED: ['&#9745;', '&#9744;'],
      reset: 0
    }
  },
  watch: {
    DataSubmit: {
      handler () {
        this.reset++
      },
      deep: true
    }
  },
  computed: {
    getConfirmFormCode () {
      if (this._VisitType === 'EOC') {
        return 'EOC_A02_007_220321_VE'
      }
      if (this._VisitType === 'OPD') {
        return 'OPD_A02_007_220321_VE'
      }
    },
    hasInitialAssessment: function () {
      var list = [
        ...(this.MASTERDATA['OPDFRSFOPDPH'] ? this.MASTERDATA['OPDFRSFOPDPH'].Items : []),
        ...(this.MASTERDATA['OPDFRSFOPDPN'] ? this.MASTERDATA['OPDFRSFOPDPN'].Items : []),
        ...(this.MASTERDATA['OPDFRSFOPHPF'] ? this.MASTERDATA['OPDFRSFOPHPF'].Items : []),
        ...(this.MASTERDATA['OPDFRSFOPUTH'] ? this.MASTERDATA['OPDFRSFOPUTH'].Items : [])
      ]
      return list.find(e => e.Value === '1')
    },
    getCilinicName () {
      let listCilinics = this.options
      return listCilinics.find(e => e.value === this.MASTERDATA['OPDFRSFOPLOC'].Items[0].Value)
    }
  },
  methods: {
  }
}
</script>
