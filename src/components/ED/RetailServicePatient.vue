<template>
  <div v-if="!isNew">
    <div v-if="loaded">
      <div class="ed-info box-collapse" :class="{'open': open}">
        <div class="ed-customer-title">
          <b>{{__t('Đánh giá ban đầu người bệnh sử dụng dịch vụ lẻ')}}</b>
          <router-link class="pull-right" :to="{name: 'ED-AssessmentForRetailServicePatient', params: { Id: DataSubmit.EDId }}">
            <span class="glyphicon glyphicon-pencil"></span>
          </router-link>
        </div>
        <div class="box-collapse-content no-padding">
          <div class="min-height-200">
            <table class="etr-tbl table">
              <!-- <tr>
                <td>
                  <labelvalue :label="'Phòng khám'" :value="__label(DataSubmit.Clinic)" />
                  <labelvalue :label="'Thời gian khám'" :value="DataSubmit.AdmittedDate" />
                  <labelvalue v-if="DataSubmit.PrimaryDoctor" :label="'Bác sĩ khám'" :value="DataSubmit.PrimaryDoctor.Fullname" />
                </td>
              </tr> -->
              <tr>
                <th><labelvalue :label="__t('Dấu hiệu sinh tồn')" :value="false"/></th>
              </tr>
              <tr>
                <td>
                  <template v-if="MASTERDATA['EDAFRSPPUL']">
                    <labelvalue :label="__label(item)" :note2="item.Note" :value="item.Value" :data="item" :key="index + 'EDAFRSPPUL'" v-for="(item,index) in MASTERDATA['EDAFRSPPUL'].Items" />
                  </template>
                  <template v-if="MASTERDATA['EDAFRSPBP0']">
                    <labelvalue :label="__label(item)" :note2="item.Note" :value="item.Value" :data="item" :key="index + 'EDAFRSPBP0'" v-for="(item,index) in MASTERDATA['EDAFRSPBP0'].Items" />
                  </template>
                  <template v-if="MASTERDATA['EDAFRSPTEM']">
                    <labelvalue :label="__label(item)" :note2="item.Note" :value="item.Value" :data="item" :key="index + 'EDAFRSPTEM'" v-for="(item,index) in MASTERDATA['EDAFRSPTEM'].Items" />
                  </template>
                  <template v-if="MASTERDATA['EDAFRSPSPO']">
                    <labelvalue :label="__label(item)" :note2="item.Note" :value="item.Value" :data="item" :key="index + 'EDAFRSPSPO'" v-for="(item,index) in MASTERDATA['EDAFRSPSPO'].Items" />
                  </template>
                  <template v-if="MASTERDATA['EDAFRSPRR0']">
                    <labelvalue :label="__label(item)" :note2="item.Note" :value="item.Value" :data="item" :key="index + 'EDAFRSPRR0'" v-for="(item,index) in MASTERDATA['EDAFRSPRR0'].Items" />
                  </template>
                  <div>
                    <template v-if="MASTERDATA['EDAFRSPHEI']">
                      <labelvalue :label="__label(item)" :note2="item.Note" :value="item.Value" :data="item" :key="index + 'EDAFRSPHEI'" v-for="(item,index) in MASTERDATA['EDAFRSPHEI'].Items" />
                    </template>
                    <template v-if="MASTERDATA['EDAFRSPWEI']">
                      <labelvalue :label="__label(item)" :note2="item.Note" :value="item.Value" :data="item" :key="index + 'EDAFRSPWEI'" v-for="(item,index) in MASTERDATA['EDAFRSPWEI'].Items" />
                    </template>
                    <labelvalue :label="'BMI'" :value="bmiCalculation"/>
                  </div>
                </td>
              </tr>
              <tr>
                <th v-if="MASTERDATA['EDAFRSPALL']" class="highlighted">
                  <labelvalue :label="__label(MASTERDATA['EDAFRSPALL'])" :value="__label(getMDRadioValue(MASTERDATA['EDAFRSPALL'].Items))"/>
                </th>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPALL'] && MASTERDATA['EDAFRSPALL'].Items[0].Value">
                <td class="highlighted">
                  <template :data="item"  v-for="(item, index) in MASTERDATA['EDAFRSPALL'].Items">
                    <labelvalue :key="index + 'EDAFRSPALL'" v-if="item.DataType === 'Text'" :label="__label(item)" :value="item.Value"/>
                    <labelvalue :key="index + 'EDAFRSPALL'" v-if="item.DataType === 'Select'" :label="__label(item)" :value="getMDSelectsValue(JSONParse(item.Data), item.Value)"/>
                  </template>
                </td>
              </tr>
              <tr>
                <th v-if="MASTERDATA['EDAFRSPPAI']">
                  <labelvalue :label="__label(MASTERDATA['EDAFRSPPAI'])" :value="__label(getMDRadioValue(MASTERDATA['EDAFRSPPAI'].Items))"/>
                </th>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPPAI'] && MASTERDATA['EDAFRSPPAI'].Items[0].Value">
                <td>
                  <template :data="item"  v-for="(item, index) in MASTERDATA['EDAFRSPPS0'].Items">
                    <labelvalue :key="index + 'EDAFRSPPS0'" v-if="item.DataType === 'Text'" :label="__label(item)" :value="item.Value"/>
                  </template>
                  <template :data="item"  v-for="(item, index) in MASTERDATA['EDAFRSPPL0'].Items">
                    <labelvalue :key="index + 'EDAFRSPPL0'" v-if="item.DataType === 'Text'" :label="__label(item)" :value="item.Value"/>
                  </template>
                  <template :data="item"  v-for="(item, index) in MASTERDATA['EDAFRSPPSD'].Items">
                    <labelvalue :key="index + 'EDAFRSPPSD'" v-if="item.DataType === 'Text'" :label="__label(item)" :value="item.Value"/>
                  </template>
                  <div>
                    <labelvalue :label="__label(MASTERDATA['EDAFRSPPF0'])" :value="__label(getMDRadioValue(MASTERDATA['EDAFRSPPF0'].Items))"/>
                    <template :data="item" v-for="(item, index) in MASTERDATA['EDAFRSPPF0'].Items">
                      <labelvalue :key="index + 'EDAFRSPPF0'" v-if="item.DataType === 'Text'" :label="''" :value="item.Value"/>
                    </template>
                  </div>
                  <template :data="item" v-for="(item, index) in MASTERDATA['EDAFRSPPC0'].Items">
                    <labelvalue :key="index + 'EDAFRSPPC0'" v-if="item.DataType === 'Text'" :label="__label(item)" :value="item.Value"/>
                  </template>
                  <div>
                    <labelvalue :label="__label(MASTERDATA['EDAFRSPHPU'])" :value="__label(getMDRadioValue(MASTERDATA['EDAFRSPHPU'].Items))"/>
                  </div>
                  <div v-if="MASTERDATA['EDAFRSPHPU'] && MASTERDATA['EDAFRSPHPU'].Items[0].Value">
                    <labelvalue :label="__label(MASTERDATA['EDAFRSPPME'])" :value="__label(getMDRadioValue(MASTERDATA['EDAFRSPPME'].Items))"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPPRE']">
                <td>
                  <div>
                    <labelvalue :label="__label(MASTERDATA['EDAFRSPPRE'])" :value="__label(getMDRadioValue(MASTERDATA['EDAFRSPPRE'].Items))"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPBRE']">
                <td>
                  <div>
                    <labelvalue :label="__label(MASTERDATA['EDAFRSPBRE'])" :value="__label(getMDRadioValue(MASTERDATA['EDAFRSPBRE'].Items))"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPCDI']">
                <th>
                  <div>
                    <labelvalue :label="__label(MASTERDATA['EDAFRSPCDI'])" :value="null"/>
                  </div>
                </th>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPAFI']">
                <td>
                  <div>
                    <labelvalue :label="__label(MASTERDATA['EDAFRSPAFI'])" :value="__label(getMDRadioValue(MASTERDATA['EDAFRSPAFI'].Items))"/>
                  </div>
                </td>
              </tr>

              <tr v-if="MASTERDATA['EDAFRSPARO'] && MASTERDATA['EDAFRSPAFI'].Items[0].Value">
                <td>
                  <div>
                    <labelvalue :label="__label(MASTERDATA['EDAFRSPARO'])" :value="__label(getMDRadioValue(MASTERDATA['EDAFRSPARO'].Items))"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPTOC'] && MASTERDATA['EDAFRSPAFI'].Items[0].Value">
                <td>
                  <div>
                    <labelvalue :label="__label(MASTERDATA['EDAFRSPTOC'])" :value="__label(getMDRadioValue(MASTERDATA['EDAFRSPTOC'].Items))"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPSOB'] && MASTERDATA['EDAFRSPAFI'].Items[0].Value">
                <td>
                  <div>
                    <labelvalue :label="__label(MASTERDATA['EDAFRSPSOB'])" :value="__label(getMDRadioValue(MASTERDATA['EDAFRSPSOB'].Items))"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPACC'] && MASTERDATA['EDAFRSPAFI'].Items[0].Value">
                <td>
                  <div>
                    <labelvalue :label="__label(MASTERDATA['EDAFRSPACC'])" :value="__label(getMDRadioValue(MASTERDATA['EDAFRSPACC'].Items))"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPDGL'] && MASTERDATA['EDAFRSPAFI'].Items[0].Value">
                <td>
                  <div>
                    <labelvalue :label="__label(MASTERDATA['EDAFRSPDGL'])" :value="__label(getMDRadioValue(MASTERDATA['EDAFRSPDGL'].Items))"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['EDAFRSPLCL'] && MASTERDATA['EDAFRSPAFI'].Items[0].Value &&  MASTERDATA['EDAFRSPDGL'].Items[1].Value">
                <td>
                  <div v-if="MASTERDATA['EDAFRSPLCL'].Items[3].Value">
                    <template :data="item"  v-for="(item, index) in MASTERDATA['EDAFRSPLCL'].Items">
                      <p :key="index + 'EDAFRSPLCL2'" v-if="item.DataType === 'Text'"><b class="labval">{{__t('Loại cách ly')}}:</b>{{item.Value}}</p>
                    </template>
                  </div>
                  <div v-else>
                    <labelvalue :label="__label(MASTERDATA['EDAFRSPLCL'])" :value="__label(getMDRadioValue(MASTERDATA['EDAFRSPLCL'].Items))"/>
                  </div>
                </td>
              </tr>
            </table>
            <hr/>
          </div>
        </div>
        <div class="box-action" @click="collapse()">
          <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
          <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
        </div>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import AssessmentForRetailServicePatient from '@/services/AssessmentForRetailServicePatient'
import MixinMasterData from '@/mixins/masterdata.js'
import _ from 'lodash'
export default {
  name: 'RetailServicePatient',
  mixins: [MixinMasterData],
  props: ['EdId', 'readonlyview'],
  data () {
    return {
      DataSubmit: {
        Data: []
      },
      loaded: false,
      isNew: false,
      collapseId: '',
      open: false
    }
  },
  computed: {
    bmiCalculation: function () {
      var weight = this.MASTERDATA['EDAFRSPWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['EDAFRSPWEI'].Items[0].Value) : 0
      var height = this.MASTERDATA['EDAFRSPHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['EDAFRSPHEI'].Items[0].Value) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    }
  },
  mounted () {
  },
  created () {
    setTimeout(() => {
      this.getMasterDatas({Form: 'EDAFRSP', noLoading: true}, () => {
        this.getData()
      })
    }, 1 * 1000)
  },
  methods: {
    collapse () {
      this.open = !this.open
    },
    getData () {
      new AssessmentForRetailServicePatient({}, this.getVisitTypeGroupCode()).find(this.EdId + '?hidemsg=' + true).then(response => {
        if (!response.IsNew) {
          this.isNew = false
          this.loaded = true
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
                  } else {
                    item.Value = exited.Value
                  }
                }
              })
            }
          }
        } else {
          this.isNew = true
        }
      }).catch(e => {
        this.isNew = true
      })
    }
  }
}
</script>
