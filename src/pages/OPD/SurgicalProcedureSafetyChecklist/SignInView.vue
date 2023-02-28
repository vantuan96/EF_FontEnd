<template>
  <div>
    <div class="tab-form-content">
      <div class="tab-title bg-1e5584 text-center">Sign In</div>
      <template v-if="loaded">
        <template v-if="DataSubmit">
          <table class="table form-table">
            <tr>
              <template v-if="MASTERDATA['EIOSOSCSIPNDB']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIPNDB'])}}</th>
                <td width="25%">
                  <MDRadioView :data="MASTERDATA['EIOSOSCSIPNDB'].Items" />
                </td>
              </template>
              <template v-if="MASTERDATA['EIOSOSCSIBTPL']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIBTPL'])}}</th>
                <td width="25%">
                  <MDRadioView :data="MASTERDATA['EIOSOSCSIBTPL'].Items" />
                </td>
              </template>
            </tr>
            <tr>
              <template v-if="MASTERDATA['EIOSOSCSISNSP']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSISNSP'])}}</th>
                <td width="25%">
                  <MDRadioView :data="MASTERDATA['EIOSOSCSISNSP'].Items" />
                </td>
              </template>
              <template v-if="MASTERDATA['EIOSOSCSISPAP']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSISPAP'])}}</th>
                <td width="25%">
                  <MDRadioView :data="MASTERDATA['EIOSOSCSISPAP'].Items" />
                </td>
              </template>
            </tr>
            <tr>
              <template v-if="MASTERDATA['EIOSOSCSISPSM']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSISPSM'])}}</th>
                <td width="25%">
                  <MDRadioView :data="MASTERDATA['EIOSOSCSISPSM'].Items" />
                </td>
              </template>
              <template v-if="MASTERDATA['EIOSOSCSIAAPC']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIAAPC'])}}</th>
                <td width="25%">
                  <MDRadioView :data="MASTERDATA['EIOSOSCSIAAPC'].Items" />
                </td>
              </template>
            </tr>
            <tr>
              <template v-if="MASTERDATA['EIOSOSCSISPCF']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSISPCF'])}}</th>
                <td width="25%">
                  <MDRadioView :data="MASTERDATA['EIOSOSCSISPCF'].Items" />
                </td>
              </template>
              <template v-if="MASTERDATA['EIOSOSCSIKNAL']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIKNAL'])}}</th>
                <td width="25%">
                  <MDRadioView :data="MASTERDATA['EIOSOSCSIKNAL'].Items" />
                </td>
              </template>
            </tr>
            <tr>
              <template v-if="MASTERDATA['EIOSOSCSIACFS']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIACFS'])}}</th>
                <td width="25%">
                  <MDRadioView :data="MASTERDATA['EIOSOSCSIACFS'].Items" />
                </td>
              </template>
              <template v-if="MASTERDATA['EIOSOSCSIASME']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIASME'])}}</th>
                <td width="25%">
                  <MDRadioView :data="MASTERDATA['EIOSOSCSIASME'].Items" />
                </td>
              </template>
            </tr>
            <tr>
              <template v-if="MASTERDATA['EIOSOSCSIBTCF']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIBTCF'])}}</th>
                <td width="25%">
                  <MDRadioView :data="MASTERDATA['EIOSOSCSIBTCF'].Items" />
                </td>
              </template>
              <template v-if="MASTERDATA['EIOSOSCSIAIDR']">
                <th width="25%">{{__label(MASTERDATA['EIOSOSCSIAIDR'])}}</th>
                <td width="25%">
                  <MDRadioView :data="MASTERDATA['EIOSOSCSIAIDR'].Items" />
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
      </template>
      <div v-else class="loading-text"><v-loading/></div>
    </div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import SurgicalProcedureSafetyChecklist from '@/services/SurgicalProcedureSafetyChecklist'
import _ from 'lodash'
export default {
  name: 'SurgicalProcedureSafetyChecklistSignIn',
  props: ['FormId', 'Form', 'VisitType', 'VisitId'],
  mixins: [MixinMasterData],
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
    this.getMasterDatas({Form: 'EIOSOSCSI'}, () => {
      this.getData()
    })
    this.id = 'SignIn/' + this.FormId
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
