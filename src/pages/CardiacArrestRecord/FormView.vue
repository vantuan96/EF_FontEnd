<template>
  <div>
    <div class="tab-form-content padding-form" v-if="DataSubmit">
      <div class="tab-form-content">
        <div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label v-if="MASTERDATA['EIOCAARRETIM']">{{__label(MASTERDATA['EIOCAARRETIM'])}}:<span class="fake-input disable">{{MASTERDATA['EIOCAARRETIM'].Items[0].Value || 'N/A'}}</span></label>
                <label style="margin-left: 10px" v-if="MASTERDATA['EIOCAARREWEI']">{{__label(MASTERDATA['EIOCAARREWEI'])}}: <span class="fake-input disable">{{MASTERDATA['EIOCAARREWEI'].Items[0].Value || 'N/A'}}</span></label> kg
                <label style="margin-left: 10px" v-if="MASTERDATA['EIOCAARREHEI']">{{__label(MASTERDATA['EIOCAARREHEI'])}}: <span class="fake-input disable">{{MASTERDATA['EIOCAARREHEI'].Items[0].Value || 'N/A'}}</span></label> cm
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12" v-if="MASTERDATA['EIOCAARREDIA']">
              <div class="form-group">
                <label>{{__label(MASTERDATA['EIOCAARREDIA'])}}<i class="unit-label" v-if="MASTERDATA['EIOCAARREDIA'].Note"> {{MASTERDATA['EIOCAARREDIA'].Note}}</i>:</label>
                <div :value="item" :key="index + '-' + item.Code"  v-for="(item, index) in MASTERDATA['EIOCAARREDIA'].Items">
                  <p class="fake-input disable">{{item.Value}}</p>
                </div>
              </div>
            </div>
          </div>
          <table class="table v-table-1">
            <tr v-if="MASTERDATA['EIOCAARRELOA']">
              <th rowspan="2" style="width: 150px">
                {{__label(MASTERDATA['EIOCAARRELOA'])}}
              </th>
              <td>
                <div class="flex-box flex-center">
                  <label class="flex-box-label">{{__label(MASTERDATA['EIOCAARRELOA'].Items[0])}}: </label>
                  <MDRadioView :data="[MASTERDATA['EIOCAARRELOA'].Items[1], MASTERDATA['EIOCAARRELOA'].Items[2], MASTERDATA['EIOCAARRELOA'].Items[3]]" />
                  <div class="fake-input disable" v-if="MASTERDATA['EIOCAARRELOA'].Items[3].Value">{{MASTERDATA['EIOCAARRELOA'].Items[4].Value || 'N/A'}}</div>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['EIOCAARRELOA']">
              <td>
                <div class="flex-box flex-center">
                  <label class="flex-box-label">{{__label(MASTERDATA['EIOCAARRELOA'].Items[5])}}: </label>
                  <MDRadioView :data="[MASTERDATA['EIOCAARRELOA'].Items[6], MASTERDATA['EIOCAARRELOA'].Items[7], MASTERDATA['EIOCAARRELOA'].Items[8], MASTERDATA['EIOCAARRELOA'].Items[9], MASTERDATA['EIOCAARRELOA'].Items[10]]" />
                  <div class="fake-input disable" v-if="MASTERDATA['EIOCAARRELOA'].Items[10].Value">{{MASTERDATA['EIOCAARRELOA'].Items[11].Value || 'N/A'}}</div>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['EIOCAARRECCA']">
              <th style="width: 200px">
                {{__label(MASTERDATA['EIOCAARRECCA'])}}
              </th>
              <td>
                <div class="rows">
                  <div class="col-md-6 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EIOCAARRECCA'].Items" v-if="index !== 1 && item.Value">
                    <div class="flex-box flex-center">
                      <CheckboxValue v-model="item.Value" />
                      <span class="displaytbl" :class="{'no-wrap': index === 0}"><span>{{__label(item)}}</span></span>
                      <div class="fake-input disable" v-if="MASTERDATA['EIOCAARRECCA'].Items[0].Value && index === 0">{{MASTERDATA['EIOCAARRECCA'].Items[1].Value || 'N/A'}}</div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['EIOCAARREMR0']">
              <th style="width: 150px">
                {{__label(MASTERDATA['EIOCAARREMR0'])}}
              </th>
              <td>
                <MDRadioView :data="MASTERDATA['EIOCAARREMR0'].Items" />
              </td>
            </tr>
            <tr v-if="MASTERDATA['EIOCAARREVEN']">
              <th style="width: 150px">
                {{__label(MASTERDATA['EIOCAARREVEN'])}}
              </th>
              <td>
                <div class="flex-box flex-center">
                  <MDRadioView :data="MASTERDATA['EIOCAARREVEN'].Items" />
                  <div class="fake-input disable" v-if="MASTERDATA['EIOCAARREVEN'].Items[1].Value">{{MASTERDATA['EIOCAARREVEN'].Items[2].Value || 'N/A'}}</div>
                  <div class="fake-input disable" v-if="MASTERDATA['EIOCAARREVEN'].Items[3].Value">{{MASTERDATA['EIOCAARREVEN'].Items[4].Value || 'N/A'}}</div>
                  <div class="fake-input disable" v-if="MASTERDATA['EIOCAARREVEN'].Items[5].Value">{{MASTERDATA['EIOCAARREVEN'].Items[6].Value || 'N/A'}}</div>
                  <div class="fake-input disable" v-if="MASTERDATA['EIOCAARREVEN'].Items[9].Value && MASTERDATA['EIOCAARREVEN'].Items[8].Value">{{MASTERDATA['EIOCAARREVEN'].Items[9].Value || 'N/A'}}</div>
                </div>
              </td>
            </tr>
            <tr>
              <th style="width: 150px">
                {{__label(MASTERDATA['EIOCAARRENOT'])}}
              </th>
              <td>
                <div :data="item" :key="'EIOCAARRENOT-' + index" v-for="(item,index) in MASTERDATA['EIOCAARRENOT'].Items">
                  <textarea-autosize readonly :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value"/>
                </div>
              </td>
            </tr>
          </table>
          <br/><br/>
          <div class="row">
            <div class="col-md-4 col-sm-4 text-center">
            </div>
            <div class="col-md-4 col-sm-4 text-center">
            </div>
            <div class="col-md-4 col-sm-4 text-center">
              <p v-if="DataSubmit.DoctorComfirm">{{DataSubmit.DoctorComfirm}}</p>
              <div><b>{{__t('Bác sĩ')}}</b></div>
              <div v-if="DataSubmit.DoctorComfirm"><ad-Info :ad="DataSubmit.Doctor.Username" /></div>
              <div v-else><p class="italic" style="color: green">({{__t('Chưa ký xác nhận')}})</p></div>
            </div>
          </div>
          <br/><br/>
        </div>
      </div>
    </div>
    <div v-else class="text-center">{{__t('Không có dữ liệu')}}</div>
    <div>
      <LastUpdateWithFormCode :FormCode="'A03_050_050919_VE'" :DataSubmit="DataSubmit"/>
    </div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import _ from 'lodash'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import CardiacArrestRecord from '@/services/CardiacArrestRecord'
export default {
  name: 'CardiacArrestRecordForm',
  props: ['formdata', 'VisitType', 'VisitId'],
  mixins: [MixinMasterData, MixinForm],
  components: {
    VDateTimePicker
  },
  data () {
    return {
      DataSubmit: null
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'EIOCAARRE'}, () => {
      this.getData()
    })
  },
  methods: {
    getData () {
      new CardiacArrestRecord(this._VisitType).find('Info/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        // if (this.MASTERDATA['EIOCAARRETIM'] && !this.MASTERDATA['EIOCAARRETIM'].Items[0].Value) this.MASTERDATA['EIOCAARRETIM'].Items[0].Value = new Date()
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
      })
    }
  }
}
</script>
