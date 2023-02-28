<template>
  <div>
    <div class="row mt-10 mb-10">
      <div v-if="MASTERDATA['ETRLOC']" class="col-md-4">
        <div class="flex-box flex-center">
          <label class="display-inline no-wrap mr-5 my-0">{{__label(MASTERDATA['ETRLOC'])}}:</label>
          <FakeInput style="margin-left: 0;" v-model="MASTERDATA['ETRLOC'].Items[0].Value" />
        </div>
      </div>
      <div v-if="MASTERDATA['ETRTD0']" class="col-md-4">
        <div class="flex-box flex-center">
          <label class="display-inline no-wrap mr-5 my-0">{{__label(MASTERDATA['ETRTD0'])}}:</label>
          <VDateTimePicker3 :readonly="true" :hideTooltip="true" v-model="MASTERDATA['ETRTD0'].Items[0].Value" :format="vDateTimeFormat"/>
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
      <tr v-if="MASTERDATA['ETRTD0']">
        <th class="align-left">{{__t('ETR.screening')}}</th>
        <th width="35%" class="text-center">{{__t('ETR.thuc_hien')}}</th>
      </tr>
      <tr v-if="MASTERDATA['ETRUTH']">
        <td class="text-bold">{{__t('ETR.doi_tuong_co_nguy_co_nga_cao')}} ?</td>
        <td>
          <div class="v-btn-checkbox text-center">
            <span class="el-radio-view" :class="{'disable': !YESNO[MASTERDATA['ETRUTH'].Items[0].Value]}">{{__t(YESNO[MASTERDATA['ETRUTH'].Items[0].Value]) || 'N/A'}}</span>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['ETRDPH'] && (!checkHiddenRow() && MASTERDATA['ETRUTH'].Items[0].Value === '1')">
        <td>1. {{__label(MASTERDATA['ETRDPH'])}}</td>
        <td>
          <div class="v-btn-checkbox text-center">
            <span class="el-radio-view" :class="{'disable': !YESNO[MASTERDATA['ETRDPH'].Items[0].Value]}">{{__t(YESNO[MASTERDATA['ETRDPH'].Items[0].Value]) || 'N/A'}}</span>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['ETRDPN'] && (!checkHiddenRow() && MASTERDATA['ETRUTH'].Items[0].Value === '1')">
        <td>2. {{__t('ETR.screening_2')}} ?</td>
        <td>
          <div class="v-btn-checkbox text-center">
            <span class="el-radio-view" :class="{'disable': !YESNO[MASTERDATA['ETRDPN'].Items[0].Value]}">{{__t(YESNO[MASTERDATA['ETRDPN'].Items[0].Value]) || 'N/A'}}</span>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['ETRHPS'] && (!checkHiddenRow() && MASTERDATA['ETRUTH'].Items[0].Value === '1')">
        <td>3. {{__label(MASTERDATA['ETRHPS'])}}</td>
        <td>
          <div class="v-btn-checkbox text-center">
            <span class="el-radio-view" :class="{'disable': !YESNO[MASTERDATA['ETRHPS'].Items[0].Value]}">{{__t(YESNO[MASTERDATA['ETRHPS'].Items[0].Value]) || 'N/A'}}</span>
          </div>
        </td>
      </tr>
      <template v-if="hasInitialAssessment">
        <tr v-if="MASTERDATA['ETRINT']">
          <th colspan="4" style="text-align: left;">{{__label(MASTERDATA['ETRINT'])}}</th>
        </tr>
        <tr v-if="MASTERDATA['ETRFRS']">
          <td>1. {{__t('ETR.intervention_1')}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['ETRFRS'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRPIO']">
          <td>2. {{__label(MASTERDATA['ETRPIO'])}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['ETRPIO'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRLUA']">
          <td>3. {{__t('ETR.intervention_3')}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['ETRLUA'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRIOE']">
          <td>4. {{__t('ETR.intervention_4')}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['ETRIOE'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRSMA']">
          <td>5. {{__label(MASTERDATA['ETRSMA'])}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['ETRSMA'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRPAA']">
          <td>6. {{__t('ETR.intervention_6')}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['ETRPAA'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETREDF']">
          <td>7. {{__t('ETR.intervention_7')}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['ETREDF'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRRM0']">
          <td>8. {{__label(MASTERDATA['ETRRM0'])}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['ETRRM0'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRRBR']">
          <td>9. {{__t('ETR.intervention_9')}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['ETRRBR'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRUTY']">
          <td>10. {{__t('ETR.intervention_10')}}</td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['ETRUTY'].Items[0].Value" />
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRIOT']">
          <td>
            11. {{__label(MASTERDATA['ETRIOT'])}}
            <FakeInput style="margin-left: 0;" v-model="MASTERDATA['ETRIOT'].Items[0].Value" />
          </td>
          <td class="v-checkbox" align="center">
            <CheckboxValue v-model="MASTERDATA['ETRIOT'].Items[1].Value" />
          </td>
        </tr>
      </template>
    </table>
    <div v-if="DataSubmit.Version >= 9">
      <Confirm
        class="mt-10"
        ref="Confirm"
        :key="reset"
        :MasterDataCode="'FALLRISKSCREENINGCONFIRM'"
        :FormCode="'ED_A02_007_220321_VE'"
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
  props: ['VisitId', 'MASTERDATA', 'options', 'DataSubmit', 'checkHiddenRow'],
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
    hasInitialAssessment: function () {
      var list = [
        ...(this.MASTERDATA['ETRDPH'] ? this.MASTERDATA['ETRDPH'].Items : []),
        ...(this.MASTERDATA['ETRDPN'] ? this.MASTERDATA['ETRDPN'].Items : []),
        ...(this.MASTERDATA['ETRHPS'] ? this.MASTERDATA['ETRHPS'].Items : []),
        ...(this.MASTERDATA['ETRUTH'] ? this.MASTERDATA['ETRUTH'].Items : [])
      ]
      return list.find(e => e.Value === '1')
    }
  },
  methods: {
  }
}
</script>
