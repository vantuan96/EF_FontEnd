<template>
  <div>
    <table class="table v-table-1 no-margin">
      <tr v-if="DataSubmit.InitialAssessmentForm && item.Id === VisitId && !hideInitialAssessmentForm" :data="item" :key="index + 'InitialAssessmentForm'" v-for="(item,index) in DataSubmit.InitialAssessmentForm">
        <td colspan="200">
          <labelvalue :label="__t('Phòng khám')" :value="__label(item.Clinic)" />
          <labelvalue :label="__t('Thời gian khám')" :value="item.AdmittedDate" />
          <labelvalue v-if="item.PrimaryDoctor" :label="__t('Bác sĩ khám')" :value="item.PrimaryDoctor.Fullname" />
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFTPCC0']" class="border-bottom-blue">
        <th width="180px">{{__label(MASTERDATA['OPDIAFTPCC0'])}} <span class="unit-label" v-if="MASTERDATA['OPDIAFTPCC0'].Note"> ({{MASTERDATA['OPDIAFTPCC0'].Note}})</span></th>
        <td colspan="3">
          <div :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPCC0'].Items">
            <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
          </div>
        </td>
      </tr>
      <tr>
        <th>Thông số</th>
        <th class="text-left">{{__t('Kết quả')}} <i>{{__t('(cung cấp bởi NB)')}}</i></th>
        <th class="text-left">{{__t('Chọn nếu không có thông tin')}}</th>
        <th class="text-left" width="40%">{{__t('Một số ghi chú khác')}}</th>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFTPPUL']">
        <th>{{__label(MASTERDATA['OPDIAFTPPUL'])}}<span class="unit-label" v-if="MASTERDATA['OPDIAFTPPUL'].Note"> ({{MASTERDATA['OPDIAFTPPUL'].Note}})</span></th>
        <td :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPPUL'].Items">
          <div v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox text-center">
            <CheckboxValue v-model="item.Value" />
          </div>
          <div v-else>
            <div v-if="MASTERDATA['OPDIAFTPPUL'].Items[0].Value" class="fake-input disable">{{item.Value || 'N/A'}}</div>
          </div>
        </td>
        <td rowspan="8" style="vertical-align: top;">
          <div v-if="MASTERDATA['OPDIAFTPPTP']">
            <div class="flex-box flex-center">
              <b>{{__label(MASTERDATA['OPDIAFTPPTP'])}}</b>
              <MDRadioView :data="MASTERDATA['OPDIAFTPPTP'].Items"/>
            </div>
          </div>
          <div v-if="MASTERDATA['OPDIAFTPUMO']">
            <div class="flex-box flex-center">
              <b>{{__label(MASTERDATA['OPDIAFTPUMO'])}}</b>
              <MDRadioView :data="MASTERDATA['OPDIAFTPUMO'].Items"/>
            </div>
          </div>
          <div v-if="MASTERDATA['OPDIAFTPBSL']">
              <label class="flex-labelox-label">{{__label(MASTERDATA['OPDIAFTPBSL'])}}</label>
              <div :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPBSL'].Items">
                <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              </div>
          </div>
          <hr/>
          <div v-if="MASTERDATA['OPDIAFTPOTH']">
              <label class="flex-labelox-label">{{__label(MASTERDATA['OPDIAFTPOTH'])}}</label>
              <div :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPOTH'].Items">
                <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              </div>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFTPBP0']">
        <th>{{__label(MASTERDATA['OPDIAFTPBP0'])}}<span class="unit-label" v-if="MASTERDATA['OPDIAFTPBP0'].Note"> ({{MASTERDATA['OPDIAFTPBP0'].Note}})</span></th>
        <td :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPBP0'].Items">
          <div v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox text-center">
            <CheckboxValue v-model="item.Value" />
          </div>
          <div v-else>
            <div v-if="MASTERDATA['OPDIAFTPBP0'].Items[0].Value" class="fake-input disable">{{item.Value || 'N/A'}}</div>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFTPTEM']">
        <th>{{__label(MASTERDATA['OPDIAFTPTEM'])}}<span class="unit-label" v-if="MASTERDATA['OPDIAFTPTEM'].Note"> ({{MASTERDATA['OPDIAFTPTEM'].Note}})</span></th>
        <td :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPTEM'].Items">
          <div v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox text-center">
            <CheckboxValue v-model="item.Value" />
          </div>
          <div v-else>
            <div v-if="MASTERDATA['OPDIAFTPTEM'].Items[0].Value" class="fake-input disable">{{item.Value || 'N/A'}}</div>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFTPSPO']">
        <th>{{__label(MASTERDATA['OPDIAFTPSPO'])}}<span class="unit-label" v-if="MASTERDATA['OPDIAFTPSPO'].Note"> ({{MASTERDATA['OPDIAFTPSPO'].Note}})</span></th>
        <td :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPSPO'].Items">
          <div v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox text-center">
            <CheckboxValue v-model="item.Value" />
          </div>
          <div v-else>
            <div v-if="MASTERDATA['OPDIAFTPSPO'].Items[0].Value" class="fake-input disable">{{item.Value || 'N/A'}}</div>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFTPRR0']">
        <th>{{__label(MASTERDATA['OPDIAFTPRR0'])}}<span class="unit-label" v-if="MASTERDATA['OPDIAFTPRR0'].Note"> ({{MASTERDATA['OPDIAFTPRR0'].Note}})</span></th>
        <td :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPRR0'].Items">
          <div v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox text-center">
            <CheckboxValue v-model="item.Value" />
          </div>
          <div v-else>
            <div v-if="MASTERDATA['OPDIAFTPRR0'].Items[0].Value" class="fake-input disable">{{item.Value || 'N/A'}}</div>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFTPHEI']">
        <th>{{__label(MASTERDATA['OPDIAFTPHEI'])}}<span class="unit-label" v-if="MASTERDATA['OPDIAFTPHEI'].Note"> ({{MASTERDATA['OPDIAFTPHEI'].Note}})</span></th>
        <td :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPHEI'].Items">
          <div v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox text-center">
            <CheckboxValue v-model="item.Value" />
          </div>
          <div v-else>
            <div v-if="MASTERDATA['OPDIAFTPHEI'].Items[0].Value" class="fake-input disable">{{item.Value || 'N/A'}}</div>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFTPWEI']">
        <th>{{__label(MASTERDATA['OPDIAFTPWEI'])}}<span class="unit-label" v-if="MASTERDATA['OPDIAFTPWEI'].Note"> ({{MASTERDATA['OPDIAFTPWEI'].Note}})</span></th>
        <td :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPWEI'].Items">
          <div v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox text-center">
            <CheckboxValue v-model="item.Value" />
          </div>
          <div v-else>
            <div v-if="MASTERDATA['OPDIAFTPWEI'].Items[0].Value" class="fake-input disable">{{item.Value || 'N/A'}}</div>
          </div>
        </td>
      </tr>
      <tr>
        <th>BMI</th>
        <td colspan="2">
          <input type="number" class="form-control" readonly :value="bmiCalculation"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFTPALL']">
        <th>{{__label(MASTERDATA['OPDIAFTPALL'])}}</th>
        <td colspan="3">
          <MDRadioView :data="MASTERDATA['OPDIAFTPALL'].Items" />
          <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDIAFTPALL'].Items">
            <template v-if="item.DataType === 'Radio' && item.Value"></template>
            <template v-else-if="item.DataType === 'Select' && item.Value && MASTERDATA['OPDIAFTPALL'].Items[0].Value">
              <allergies-select :view="true" v-model="item.Value" :items="JSON.parse(item.Data)"/>
            </template>
            <template v-else-if="item.Value && MASTERDATA['OPDIAFTPALL'].Items[0].Value">, {{item.Value}}</template>
          </span>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFTPPAI']">
        <th>{{__label(MASTERDATA['OPDIAFTPPAI'])}}</th>
        <td colspan="3">
          <MDRadioView :data="MASTERDATA['OPDIAFTPPAI'].Items" />
          <template v-if="MASTERDATA['OPDIAFTPPAI'].Items[0].Value">
            <hr/>
            <div class="row">
              <template v-if="MASTERDATA['OPDIAFTPPS0']">
                <div class="col-sm- col-md-3">
                  <label>{{__label(MASTERDATA['OPDIAFTPPS0'])}}</label>
                  <div class="fake-input disable">{{MASTERDATA['OPDIAFTPPS0'].Items[0].Value || 'N/A'}}</div>
                </div>
              </template>
              <template v-if="MASTERDATA['OPDIAFTPPL0']">
                <div class="col-md-3">
                  <label>{{__label(MASTERDATA['OPDIAFTPPL0'])}}</label>
                  <div class="fake-input disable">{{MASTERDATA['OPDIAFTPPL0'].Items[0].Value || 'N/A'}}</div>
                </div>
              </template>
              <template v-if="MASTERDATA['OPDIAFTPPSD']">
                <div class="col-md-6">
                  <label>{{__label(MASTERDATA['OPDIAFTPPSD'])}}</label>
                  <div class="fake-input disable">{{MASTERDATA['OPDIAFTPPSD'].Items[0].Value || 'N/A'}}</div>
                </div>
              </template>
            </div>
            <div class="v-row">
              <div class="flex-box flex-center">
                <b>Tần suất đau</b>
                <MDRadioView :data="MASTERDATA['OPDIAFTPPF0'].Items"/>
                <span class="fake-input disable" v-if="MASTERDATA['OPDIAFTPPF0'].Items[3].Value">{{MASTERDATA['OPDIAFTPPF0'].Items[4].Value || 'N/A'}}</span>
              </div>
            </div>
            <div class="v-row ">
              <div class="group-radio">
                <template v-if="MASTERDATA['OPDIAFTPPC0']">
                  <b>{{__label(MASTERDATA['OPDIAFTPPC0'])}}</b>
                  <div class="fake-input disable">{{MASTERDATA['OPDIAFTPPC0'].Items[0].Value || 'N/A'}}</div>
                </template>
              </div>
            </div>
            <div class="v-row">
              <template v-if="MASTERDATA['OPDIAFTPHPU']">
                <div class="flex-box flex-center">
                  <b>{{__label(MASTERDATA['OPDIAFTPHPU'])}}</b>
                  <MDRadioView :data="MASTERDATA['OPDIAFTPHPU'].Items"/>
                </div>
              </template>
            </div>
            <div class="v-row" v-if="MASTERDATA['OPDIAFTPHPU'] && MASTERDATA['OPDIAFTPHPU'].Items[0].Value">
              <template v-if="MASTERDATA['OPDIAFTPPME']">
                <div class="flex-box flex-center">
                  <b>{{__label(MASTERDATA['OPDIAFTPPME'])}}</b>
                  <MDRadioView :data="MASTERDATA['OPDIAFTPPME'].Items"/>
                </div>
              </template>
            </div>
          </template>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFTPPRE']">
        <th>{{__label(MASTERDATA['OPDIAFTPPRE'])}}</th>
        <td colspan="3">
          <MDRadioView :data="MASTERDATA['OPDIAFTPPRE'].Items"/>
        </td>
      </tr>
      <template v-if="DataSubmit.Version === 1">
      <tr v-if="MASTERDATA['OPDIAFTPBRE']" >
        <th>{{__label(MASTERDATA['OPDIAFTPBRE'])}}</th>
        <td colspan="3">
          <MDRadioView :data="MASTERDATA['OPDIAFTPBRE'].Items"/>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDIAFTPBRE']" >
        <th>{{__label(MASTERDATA['OPDIAFTPGCD'])}} <p class="note-text">{{__t('Sàng lọc bằng bảng hỏi chung (hoàn thành 5 câu bên cạnh)')}}</p></th>
        <td :colspan="3" class="no-padding">
          <table class="no-border">
            <tr class="border-bottom" v-if="MASTERDATA['OPDIAFTPAFI']">
              <td width="380">1. {{__label(MASTERDATA['OPDIAFTPAFI'])}}</td>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFTPAFI'].Items"/>
              </td>
              <td :rowspan="rowspanOPDIAFTPTSI" style="vertical-align: top;" class="border-left" v-if="MASTERDATA['OPDIAFTPTSI'].Items[1].Value">
                <template >
                  <h3>{{__t('Hướng xử trí hỗ trợ')}}</h3>
                  {{__t(' Nhắc nhở người bệnh vệ sinh tay thường xuyên, lưu ý giữ thực hành vệ sinh ho hoặc hắt hơi')}}
                </template>
              </td>
            </tr>
            <tr class="border-bottom" v-if="MASTERDATA['OPDIAFTPARO'] && MASTERDATA['OPDIAFTPAFI'].Items[0].Value">
              <td width="380">2. {{__label(MASTERDATA['OPDIAFTPARO'])}}</td>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFTPARO'].Items"/>
              </td>
            </tr>
            <tr class="border-bottom" v-if="MASTERDATA['OPDIAFTPTOC'] && MASTERDATA['OPDIAFTPAFI'].Items[0].Value">
              <td width="380">3. {{__label(MASTERDATA['OPDIAFTPTOC'])}}</td>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFTPTOC'].Items"/>
              </td>
            </tr>
            <tr class="border-bottom" v-if="MASTERDATA['OPDIAFTPSOB'] && MASTERDATA['OPDIAFTPAFI'].Items[0].Value">
              <td width="380">4. {{__label(MASTERDATA['OPDIAFTPSOB'])}}</td>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFTPSOB'].Items"/>
              </td>
            </tr>
            <tr class="border-bottom" v-if="MASTERDATA['OPDIAFTPACC'] && MASTERDATA['OPDIAFTPAFI'].Items[0].Value">
              <td width="380">5. {{__label(MASTERDATA['OPDIAFTPACC'])}}</td>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFTPACC'].Items"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['OPDIAFTPTSI']">
              <td width="380">{{__label(MASTERDATA['OPDIAFTPTSI'])}}</td>
              <td>
                <MDRadioView :data="MASTERDATA['OPDIAFTPTSI'].Items"/>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      </template>
      <tr v-else>
        <th width="20%">{{___t('Câu hỏi sàng lọc')}}</th>
        <td colspan="3">
          <CommunicableDiseasesScreening v-model="MASTERDATA" :type="'ODTH'" :version="DataSubmit.Version" :readonly="true"/>
        </td>
      </tr>
    </table>
    <div v-if="DataSubmit.Version >= 7 && !hideInitialAssessmentForm">
      <Confirm
        class="mt-10"
        :ReadOnly="true"
        :MasterDataCode="'TELEHEALTHCONFIRM'"
        :FormCode="'OPDIAFTP'"
        :VisitId="VisitId"
        :FormId="DataSubmit.Id"
        :AdInfo="[DataSubmit.Username]"
      />
    </div>
  </div>
</template>
<script>
import Confirm from '@/components/Form/Confirm3'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
export default {
  name: 'TelehealthViewForm',
  props: ['MASTERDATA', 'DataSubmit', 'VisitId', 'hideInitialAssessmentForm'],
  data () {
    return {
    }
  },
  components: {
    CommunicableDiseasesScreening,
    Confirm
  },
  computed: {
    bmiCalculation: function () {
      var weight = this.MASTERDATA['OPDIAFTPWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDIAFTPWEI'].Items[0].Value) : 0
      var height = this.MASTERDATA['OPDIAFTPHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDIAFTPHEI'].Items[0].Value) / 100) : 0
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
