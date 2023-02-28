<template>
  <div class="tab-form-content">
    <div class="tab-title bg-1e5584 text-center">Sign Out</div>
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <table class="table form-table">
          <tr v-if="MASTERDATA['EIOSOSCSONVCW']">
            <td colspan="4" class="bgdadce0">{{__label(MASTERDATA['EIOSOSCSONVCW'])}}</td>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCSONSPC']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCSONSPC'])}}</th>
              <td width="25%" class="text-center">
                <CheckboxsValue :hideLabel="true" :data="MASTERDATA['EIOSOSCSONSPC'].Items" />
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCSOSLCO']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCSOSLCO'])}} <span class="note-text" v-if="MASTERDATA['EIOSOSCSOSLCO'].Note">{{__t(MASTERDATA['EIOSOSCSOSLCO'].Note)}}</span></th>
              <td width="25%">
                <MDRadioView :data="MASTERDATA['EIOSOSCSOSLCO'].Items" />
              </td>
            </template>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCSOISNC']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCSOISNC'])}}</th>
              <td width="25%">
                <MDRadioView :data="MASTERDATA['EIOSOSCSOISNC'].Items" />
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCSOAEPR']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCSOAEPR'])}}</th>
              <td width="25%">
                <MDRadioView :data="MASTERDATA['EIOSOSCSOAEPR'].Items" />
              </td>
            </template>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCSONOSC']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCSONOSC'])}}</th>
              <td width="25%">
                <div :data="item" :key="'EIOSOSCSONOSC-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSONOSC'].Items" v-if="item.DataType === 'Text'">
                  <p class="fake-input disable">{{item.Value || 'N/A'}}</p>
                </div>
              </td>
            </template>
            <td colspan="2">
            </td>
          </tr>
          <tr v-if="MASTERDATA['EIOSOSCSOSAAN']">
            <td colspan="4" class="bgdadce0">{{__label(MASTERDATA['EIOSOSCSOSAAN'])}}</td>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCSOKCFR']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCSOKCFR'])}} <span class="note-text" v-if="MASTERDATA['EIOSOSCSOKCFR'].Note">{{__t(MASTERDATA['EIOSOSCSOKCFR'].Note)}}</span></th>
              <td width="25%" colspan="3">
                <div :data="item" :key="'EIOSOSCSOKCFR-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCSOKCFR'].Items" v-if="item.DataType === 'Text'">
                  <p class="fake-input disable">{{item.Value || 'N/A'}}</p>
                </div>
              </td>
            </template>
          </tr>
        </table>
        <br/>
        <div class="row" v-if="DataSubmit.Nurse && DataSubmit.Nurse.Username">
          <div class="col-md-8 col-sm-8">
          </div>
          <div class="col-md-4 col-sm-4">
            <p class="text-center">{{DataSubmit.CreatedAt}}</p>
            <EformSignature :title="__t('Điều dưỡng viên')" :ad="DataSubmit.Nurse.Username" />
          </div>
        </div>
        <div>
          <p>A02_053_050919_VE</p>
        </div>
      </template>
      <div class="text-center" v-else>
        <br/>
        <br/>
        <p>{{__t('Chưa có bảng kiểm an toàn phẫu thuật/thủ thuật, (Trước khi NB rời phòng phẫu thuật/thủ thuật)')}}</p>
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import SurgicalProcedureSafetyChecklist from '@/services/SurgicalProcedureSafetyChecklist'
import _ from 'lodash'
export default {
  name: 'SurgicalProcedureSafetyChecklistSignOut',
  mixins: [MixinMasterData],
  props: ['FormId', 'VisitType', 'VisitId'],
  components: {
  },
  data () {
    return {
      loaded: false,
      DataSubmit: null,
      type: 'OPD'
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'EIOSOSCSO'}, () => {
      this.getData()
    })
    this.id = 'SignOut/' + this.FormId
  },
  methods: {
    getData () {
      this.loaded = false
      new SurgicalProcedureSafetyChecklist({}, this._VisitType).find(this.id + '?hidemsg=' + true).then(response => {
        this.HasData = true
        this.DataSubmit = response
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = exited.Value ? isTrue : ''
                } else {
                  item.Value = exited.Value
                }
              }
            })
          }
        }
        this.loaded = true
      }).catch(e => {
        this.loaded = true
        if (e.status === 404) {}
      })
    }
  }
}
</script>
