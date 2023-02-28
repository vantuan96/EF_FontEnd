<template>
  <div>
    <div v-if="this.CurrentPatientObj.IsAnesthesia && !hideInitialAssessmentForm" class="tbl-title">1. {{__t('Đánh giá chung')}}</div>
    <table class="table v-table-1 no-margin">
      <tr v-if="DataSubmit.InitialAssessmentForm && item.Id === VisitId && !hideInitialAssessmentForm" :data="item" :key="index + 'InitialAssessmentForm'" v-for="(item,index) in DataSubmit.InitialAssessmentForm">
        <td colspan="2">
          <labelvalue :label="'Phòng khám'" :value="__label(item.Clinic)" />
          <labelvalue :label="'Thời gian khám'" :value="item.AdmittedDate" />
          <labelvalue v-if="item.PrimaryDoctor" :label="'Bác sĩ khám'" :value="item.PrimaryDoctor.Fullname" />
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFSTOPVS0']">
        <th width="20%">{{__label(MASTERDATA['OPDIAFSTOPVS0'])}}</th>
        <td>
          <template v-if="MASTERDATA['OPDIAFSTOPPUL']">
            <div class="vcol150" :data="item" :key="index + 'OPDIAFSTOPPUL'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPPUL'].Items">
              <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
            </div>
          </template>
          <template v-if="MASTERDATA['OPDIAFSTOPBP0']">
            <div class="vcol150" :data="item" :key="index + 'OPDIAFSTOPBP0'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPBP0'].Items">
              <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
            </div>
          </template>
          <template v-if="MASTERDATA['OPDIAFSTOPTEM']">
            <div class="vcol150" :data="item" :key="index + 'OPDIAFSTOPTEM'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPTEM'].Items">
              <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
            </div>
          </template>
          <template v-if="MASTERDATA['OPDIAFSTOPSPO']">
            <div class="vcol150" :data="item" :key="index + 'OPDIAFSTOPSPO'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPSPO'].Items">
              <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
            </div>
          </template>
          <template v-if="MASTERDATA['OPDIAFSTOPRR0']">
            <div class="vcol150" :data="item" :key="index + 'OPDIAFSTOPRR0'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPRR0'].Items">
              <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
            </div>
          </template>
          <template v-if="MASTERDATA['OPDIAFSTOPHEI']">
            <div class="vcol150" :data="item" :key="index + 'OPDIAFSTOPHEI'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPHEI'].Items">
              <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
            </div>
          </template>
          <template v-if="MASTERDATA['OPDIAFSTOPWEI']">
            <div class="vcol150" :data="item" :key="index + 'OPDIAFSTOPWEI'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPWEI'].Items">
              <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
            </div>
          </template>
          <div class="vcol150">
            <label>BMI</label>
            <input type="number" class="form-control fake-input disable" style="max-width: 141px;" readonly :value="bmiCalculation"/>
          </div>
          <template v-if="MASTERDATA['OPDIAFSTOPWEIPR'] && DataSubmit.IsAnesthesia && $store.state.account.CurrentPatientObj.Gender === 0">
            <div class="vcol150" style="width: 335px;">
              <label class="no-wrap">{{__label(MASTERDATA['OPDIAFSTOPWEIPR'])}}</label>
              <div class="d-flex flex-center">
                <MDRadio v-if="MASTERDATA['OPDIAFSTOPWEIPR']" :readonly="true" v-model="MASTERDATA['OPDIAFSTOPWEIPR']"/>
                <VNumberInput v-if="MASTERDATA['OPDIAFSTOPWEIPR'].Items[2].Value" class="ml-5" :readonly="true" :decimal="true" v-model="MASTERDATA['OPDIAFSTOPWEIPR'].Items[0].Value" :placeholder="__t('Nhập')"/>
              </div>
            </div>
          </template>
          <br style="clear: both;"/>
          <p style="clear: both;"/>
          <div>
            <template v-if="MASTERDATA['OPDIAFSTOPNOT']">
              <div :data="item" :key="index + 'OPDIAFSTOPNOT'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPNOT'].Items">
                <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              </div>
            </template>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFSTOPALL']" class="highlightedsss">
        <th width="20%">{{__label(MASTERDATA['OPDIAFSTOPALL'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['OPDIAFSTOPALL'].Items" />
          <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDIAFSTOPALL'].Items">
            <template v-if="item.DataType === 'Radio' && item.Value"></template>
            <template v-else-if="item.DataType === 'Select' && item.Value && MASTERDATA['OPDIAFSTOPALL'].Items[0].Value">
              <allergies-select :view="true" v-model="item.Value" :items="JSON.parse(item.Data)"/>
            </template>
            <template v-else-if="item.Value && MASTERDATA['OPDIAFSTOPALL'].Items[0].Value">, {{item.Value}}</template>
          </span>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFSTOPPAI']">
        <th width="20%">{{__label(MASTERDATA['OPDIAFSTOPPAI'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['OPDIAFSTOPPAI'].Items" />
          <template v-if="MASTERDATA['OPDIAFSTOPPAI'].Items[0].Value">
            <hr/>
            <div class="row">
              <template v-if="MASTERDATA['OPDIAFSTOPPS0']">
                <div class="col-md-3">
                  <label>{{__label(MASTERDATA['OPDIAFSTOPPS0'])}}</label>
                  <div class="fake-input disable">{{MASTERDATA['OPDIAFSTOPPS0'].Items[0].Value || 'N/A'}}</div>
                </div>
              </template>
              <template v-if="MASTERDATA['OPDIAFSTOPPL0']">
                <div class="col-md-3">
                  <label>{{__label(MASTERDATA['OPDIAFSTOPPL0'])}}</label>
                  <div class="fake-input disable">{{MASTERDATA['OPDIAFSTOPPL0'].Items[0].Value || 'N/A'}}</div>
                </div>
              </template>
              <template v-if="MASTERDATA['OPDIAFSTOPPSD']">
                <div class="col-md-6">
                  <label>{{__label(MASTERDATA['OPDIAFSTOPPSD'])}}</label>
                  <div class="fake-input disable">{{MASTERDATA['OPDIAFSTOPPSD'].Items[0].Value || 'N/A'}}</div>
                </div>
              </template>
            </div>
            <div class="v-row">
              <div class="flex-box flex-center">
                <b>Tần suất đau</b>
                <MDRadioView :data="MASTERDATA['OPDIAFSTOPPF0'].Items"/>
                <span class="fake-input disable" v-if="MASTERDATA['OPDIAFSTOPPF0'].Items[3].Value">{{MASTERDATA['OPDIAFSTOPPF0'].Items[4].Value || 'N/A'}}</span>
              </div>
            </div>
            <div class="v-row" v-if="MASTERDATA['OPDIAFSTOPPC0']">
              <div class="flex-box flex-center">
                <b>{{__label(MASTERDATA['OPDIAFSTOPPC0'])}}</b>
                <div class="fake-input disable">{{MASTERDATA['OPDIAFSTOPPC0'].Items[0].Value || 'N/A'}}</div>
              </div>
            </div>
            <div class="v-row" v-if="MASTERDATA['OPDIAFSTOPHPU']">
              <div class="flex-box flex-center">
                <b>{{__label(MASTERDATA['OPDIAFSTOPHPU'])}}</b>
                <MDRadioView :data="MASTERDATA['OPDIAFSTOPHPU'].Items"/>
              </div>
            </div>
            <div class="v-row" v-if="MASTERDATA['OPDIAFSTOPHPU'] && MASTERDATA['OPDIAFSTOPHPU'].Items[0].Value">
              <div class="flex-box flex-center">
                <b>{{__label(MASTERDATA['OPDIAFSTOPPME'])}}</b>
                <MDRadioView :data="MASTERDATA['OPDIAFSTOPPME'].Items"/>
              </div>
            </div>
          </template>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFSTOPPRE']">
        <th width="20%">{{__label(MASTERDATA['OPDIAFSTOPPRE'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['OPDIAFSTOPPRE'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFSTOPBRE']">
        <th width="20%">{{__label(MASTERDATA['OPDIAFSTOPBRE'])}}</th>
        <td>
          <MDRadioView :data="MASTERDATA['OPDIAFSTOPBRE'].Items"/>
        </td>
      </tr>
      <template v-if="DataSubmit.Version === 1">
      <tr v-if="MASTERDATA['OPDIAFSTOPCDI']">
        <th width="20%">{{__label(MASTERDATA['OPDIAFSTOPCDI'])}}</th>
        <td>
          <table class="no-border">
            <tr>
              <th width="20%">{{__label(MASTERDATA['OPDIAFSTOPAFI'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFSTOPAFI'].Items"/>
              </td>
            </tr>
            <template v-if="MASTERDATA['OPDIAFSTOPAFI'].Items[0].Value">
            <tr>
              <th class="no-border">{{__label(MASTERDATA['OPDIAFSTOPARO'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFSTOPARO'].Items"/>
              </td>
            </tr>
            <tr>
              <th class="no-border">{{__label(MASTERDATA['OPDIAFSTOPTOC'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFSTOPTOC'].Items"/>
              </td>
            </tr>
            <tr>
              <th class="no-border">{{__label(MASTERDATA['OPDIAFSTOPSOB'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFSTOPSOB'].Items"/>
              </td>
            </tr>
            <tr>
              <th class="no-border">{{__label(MASTERDATA['OPDIAFSTOPACC'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFSTOPACC'].Items"/>
              </td>
            </tr>
            <tr>
              <th class="no-border">{{__label(MASTERDATA['OPDIAFSTOPDGL'])}}</th>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFSTOPDGL'].Items"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['OPDIAFSTOPDGL'] && MASTERDATA['OPDIAFSTOPDGL'].Items[1].Value">
              <th class="no-border">{{__label(MASTERDATA['OPDIAFSTOPLCL'])}}</th>
              <td>
                <div class="flex-box flex-center">
                  <MDRadioView :data="MASTERDATA['OPDIAFSTOPLCL'].Items"/>
                  <span class="fake-input disable" v-if="MASTERDATA['OPDIAFSTOPLCL'].Items[3].Value">{{MASTERDATA['OPDIAFSTOPLCL'].Items[4].Value || 'N/A'}}</span>
                </div>
              </td>
            </tr>
            </template>
          </table>
        </td>
      </tr>
      </template>
      <tr v-else>
        <th width="20%">{{___t('Câu hỏi sàng lọc')}}</th>
        <td colspan="3">
          <CommunicableDiseasesScreening v-model="MASTERDATA" :type="'ODST'" :version="DataSubmit.Version" :readonly="true"/>
        </td>
      </tr>
    </table>
    <div v-if="this.CurrentPatientObj.IsAnesthesia && !hideInitialAssessmentForm" class="tbl-title">2. {{__t('Các thuốc đang dùng')}}</div>
    <div v-if="this.CurrentPatientObj.IsAnesthesia && !hideInitialAssessmentForm">
      <TblWithMasterData
        class="pointer-none"
        :FormCode="'OPDPKGM1'"
        :VisitId="_VisitId"
        :VisitType="'OPD'"
        :FormID="DataSubmit.Id"
        :formatTime="vDateFormat"
        :dontGetDate="true"
        :readonly="true"
        ref="TblWithMasterData"
      />
    </div>
    <div v-if="DataSubmit.Version >= 9 && !hideInitialAssessmentForm">
      <Confirm
        class="mt-10"
        :MasterDataCode="'INITIALASSESSMENTSHORTCONFIRM'"
        :FormCode="'EOC_A02_007_080121_VE'"
        :ReadOnly="true"
        :AdInfo="[DataSubmit.UserNameReceiving, DataSubmit.IsNew ? '' : DataSubmit.Username || DataSubmit.CreatedBy]"
        :VisitId="$route.params.Id"
        :FormId="DataSubmit.Id"
      />
    </div>
  </div>
</template>
<script>
import Confirm from '@/components/Form/Confirm3'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
import TblWithMasterData from '@/components/global/TblWithMasterData'
export default {
  name: 'ForShortTermForm',
  props: ['MASTERDATA', 'DataSubmit', 'VisitId', 'hideInitialAssessmentForm'],
  data () {
    return {
    }
  },
  components: {
    CommunicableDiseasesScreening,
    TblWithMasterData,
    Confirm
  },
  computed: {
    bmiCalculation: function () {
      var weight = this.MASTERDATA['OPDIAFSTOPWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDIAFSTOPWEI'].Items[0].Value) : 0
      var height = this.MASTERDATA['OPDIAFSTOPHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDIAFSTOPHEI'].Items[0].Value) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    }
  },
  mounted () {
  },
  created () {
  },
  methods: {
  }
}
</script>
