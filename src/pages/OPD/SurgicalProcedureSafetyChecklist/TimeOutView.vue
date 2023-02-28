<template>
  <div class="tab-form-content">
    <div class="tab-title bg-1e5584 text-center">Time Out</div>
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <table class="table form-table">
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOATMI']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOATMI'])}}</th>
              <td class="text-center" width="25%">
                <CheckboxsValue :hideLabel="true" :data="MASTERDATA['EIOSOSCTOATMI'].Items" />
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOSSMV']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOSSMV'])}}</th>
              <td width="25%">
                <MDRadioView :data="MASTERDATA['EIOSOSCTOSSMV'].Items" />
              </td>
            </template>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOCPND']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOCPND'])}}</th>
              <td class="text-center" width="25%">
                <CheckboxsValue :hideLabel="true" :data="MASTERDATA['EIOSOSCTOCPND'].Items" />
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOKNAL']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOKNAL'])}}</th>
              <td width="25%">
                <MDRadioView :data="MASTERDATA['EIOSOSCTOKNAL'].Items" />
              </td>
            </template>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOCSSP']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOCSSP'])}}</th>
              <td class="text-center" width="25%">
                <CheckboxsValue :hideLabel="true" :data="MASTERDATA['EIOSOSCTOCSSP'].Items" />
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOPCPO']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOPCPO'])}}</th>
              <td width="25%">
                <MDRadioView :data="MASTERDATA['EIOSOSCTOPCPO'].Items" />
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['EIOSOSCTOSURE']">
            <td colspan="4" class="bgdadce0">{{__label(MASTERDATA['EIOSOSCTOSURE'])}}</td>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTODSPT']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTODSPT'])}}</th>
              <td class="text-center" width="25%">
                <CheckboxsValue :hideLabel="true" :data="MASTERDATA['EIOSOSCTODSPT'].Items" />
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOOPDU']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOOPDU'])}} <span class="note-text">({{__t('Phút')}})</span></th>
              <td width="25%">
                <div :data="item" :key="'EIOSOSCTOOPDU-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOOPDU'].Items" v-if="item.DataType === 'Text'">
                  <p class="fake-input disable">{{item.Value || 'N/A'}}</p>
                </div>
              </td>
            </template>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOWCUS']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOWCUS'])}}</th>
              <td class="text-center" width="25%">
                <CheckboxsValue :hideLabel="true" :data="MASTERDATA['EIOSOSCTOWCUS'].Items" />
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOABLO']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOABLO'])}} <span class="note-text">(ml)</span></th>
              <td width="25%">
                <div :data="item" :key="'EIOSOSCTOABLO-' + index" v-for="(item,index) in MASTERDATA['EIOSOSCTOABLO'].Items" v-if="item.DataType === 'Text'">
                  <p class="fake-input disable">{{item.Value || 'N/A'}}</p>
                </div>
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['EIOSOSCTOATRE']">
            <td colspan="4" class="bgdadce0">{{__label(MASTERDATA['EIOSOSCTOATRE'])}}</td>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOPACR']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOPACR'])}}</th>
              <td width="25%">
                <MDRadioView :data="MASTERDATA['EIOSOSCTOPACR'].Items" />
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOAPGW']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOAPGW'])}}</th>
              <td width="25%">
                <MDRadioView :data="MASTERDATA['EIOSOSCTOAPGW'].Items" />
              </td>
            </template>
          </tr>
          <tr v-if="MASTERDATA['EIOSOSCTONTRE']">
            <td colspan="4" class="bgdadce0">{{__label(MASTERDATA['EIOSOSCTONTRE'])}}</td>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOSOIC']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOSOIC'])}}</th>
              <td width="25%">
                <MDRadioView :data="MASTERDATA['EIOSOSCTOSOIC'].Items" />
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOTAEI']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOTAEI'])}}</th>
              <td width="25%">
                <MDRadioView :data="MASTERDATA['EIOSOSCTOTAEI'].Items" />
              </td>
            </template>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOSMEQ']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOSMEQ'])}}</th>
              <td width="25%">
                <MDRadioView :data="MASTERDATA['EIOSOSCTOSMEQ'].Items" />
              </td>
            </template>
            <template v-if="MASTERDATA['EIOSOSCTOIIDI']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOIIDI'])}}</th>
              <td width="25%">
                <MDRadioView :data="MASTERDATA['EIOSOSCTOIIDI'].Items" />
              </td>
            </template>
          </tr>
          <tr>
            <template v-if="MASTERDATA['EIOSOSCTOCNSI']">
              <th width="25%">{{__label(MASTERDATA['EIOSOSCTOCNSI'])}}</th>
              <td width="25%">
                <MDRadioView :data="MASTERDATA['EIOSOSCTOCNSI'].Items" />
              </td>
            </template>
            <td colspan="2"></td>
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
        <p>{{__t('Chưa có bảng kiểm an toàn phẫu thuật/thủ thuật, (Trước khi rạch da)')}}</p>
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
  name: 'SurgicalProcedureSafetyChecklistTimeOut',
  mixins: [MixinMasterData],
  props: ['FormId', 'VisitId', 'Form', 'VisitType'],
  data () {
    return {
      loaded: false,
      DataSubmit: null,
      type: 'OPD',
      id: null
    }
  },
  components: {
  },
  mounted () {
    this.id = 'TimeOut/' + this.FormId
    this.getMasterDatas({Form: 'EIOSOSCTO'}, () => {
      this.getData()
    })
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
