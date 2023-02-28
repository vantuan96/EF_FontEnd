<template>
  <div>
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <!-- content -->
        <ViewOnly v-if="readonly" :MASTERDATA="MASTERDATA" />
        <template v-else>
          <div class="tbl-title">I. {{___t('Đánh giá chung')}}</div>
          <table class="table v-table-1 no-margin">
            <tr v-if="MASTERDATA['IPDIAFETYOP']">
              <th width="1">{{__label(MASTERDATA['IPDIAFETYOP'])}}</th>
              <td>
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDIAFETYOP'].Items">
                    <input type="checkbox" :id="'IPDIAFETYOPradio-' + index" v-model="item.Value">
                    <label :for="'IPDIAFETYOPradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIAFETYOP'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIAFEFRAI']">
              <th width="1">{{__label(MASTERDATA['IPDIAFEFRAI'])}}</th>
              <td>
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDIAFEFRAI'].Items">
                    <input type="checkbox" :id="'IPDIAFEFRAIradio-' + index" v-model="item.Value">
                    <label :for="'IPDIAFEFRAIradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIAFEFRAI'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIAFEITV1']">
              <th width="1"><span class="no-wrap">{{__label(MASTERDATA['IPDIAFEITV1'])}}</span></th>
              <td>
                <div class="flex-box" :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDIAFEITV1'].Items" v-if="item.Code !== 'IPDIAFEITV1ANS'">
                  <div class="group-radio no-flex">
                    <input type="checkbox" :id="'IPDIAFEITV1radio-' + index" v-model="item.Value">
                    <label :for="'IPDIAFEITV1radio-' + index" @click="checkbox2Radio2(MASTERDATA['IPDIAFEITV1'].Items, item)">{{__label(item)}}</label>
                  </div>
                  <textarea-autosize rows="1" v-if="MASTERDATA['IPDIAFEITV1'].Items[1].Value && index === 1" :placeholder="__t('Nhập')" class="form-control mgl-5" v-model="MASTERDATA['IPDIAFEITV1'].Items[2].Value" />
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="no-padding">
                <div class="tbl-title">II. {{___t('Đánh giá tâm thần')}}</div>
              </td>
            </tr>
            <tr>
              <th width="1">{{___t('Kiểm tra nhanh về tâm thần (AMT test4)')}}</th>
              <td>
                <div class="flex-box flex-center">
                  <div class="br1">
                    <table class="no-border">
                      <tr>
                        <td><b>{{__label(MASTERDATA['IPDIAFEAGEE'])}}</b></td>
                        <td>
                          <MDRadio @onChange="setIPDIAAUITV()" v-model="MASTERDATA['IPDIAFEAGEE']"/>
                        </td>
                      </tr>
                      <tr>
                        <td><b>{{__label(MASTERDATA['IPDIAFEDAOB'])}}</b></td>
                        <td>
                          <MDRadio @onChange="setIPDIAAUITV()" v-model="MASTERDATA['IPDIAFEDAOB']"/>
                        </td>
                      </tr>
                      <tr>
                        <td><b>{{__label(MASTERDATA['IPDIAFEDYKW'])}}</b></td>
                        <td>
                          <MDRadio @onChange="setIPDIAAUITV()" v-model="MASTERDATA['IPDIAFEDYKW']"/>
                        </td>
                      </tr>
                      <tr>
                        <td><b>{{__label(MASTERDATA['IPDIAFEWYII'])}}</b></td>
                        <td>
                          <MDRadio @onChange="setIPDIAAUITV()" v-model="MASTERDATA['IPDIAFEWYII']"/>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="flex-box flex-center">
                    <b class="no-wrap mr-5">{{__label(MASTERDATA['IPDIAFECOGN'])}}:</b>
                    <div class="group-radio no-flex disabel-table">
                      <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDIAFECOGN'].Items">
                        <input type="checkbox" :id="'IPDIAFECOGNradio-' + index" v-model="item.Value">
                        <label :for="'IPDIAFECOGNradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIAFECOGN'].Items, item)">{{__label(item)}}</label>
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIAFESLEE']">
              <th width="1">{{__label(MASTERDATA['IPDIAFESLEE'])}}</th>
              <td>
                <div class="flex-box flex-center">
                  <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['IPDIAFESLEE'].Items">
                    <div class="flex-box flex-center">
                      <div class="v-checkbox">
                        <input type="checkbox" :id="'IPDIAFESLEEcxo-' + index" v-model="item.Value">
                        <label :for="'IPDIAFESLEEcxo-' + index"></label>
                      </div>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIAFEITV2']">
              <th width="1">{{__label(MASTERDATA['IPDIAFEITV2'])}}</th>
              <td>
                <div class="flex-box" :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDIAFEITV2'].Items" v-if="item.Code !== 'IPDIAFEITV2ANS'">
                  <div class="group-radio no-flex">
                    <input type="checkbox" :id="'IPDIAFEITV2radio-' + index" v-model="item.Value">
                    <label :for="'IPDIAFEITV2radio-' + index" @click="checkbox2Radio2(MASTERDATA['IPDIAFEITV2'].Items, item)">{{__label(item)}}</label>
                  </div>
                  <textarea-autosize rows="1" v-if="MASTERDATA['IPDIAFEITV2'].Items[1].Value && index === 1" :placeholder="__t('Nhập')" class="form-control mgl-5" v-model="MASTERDATA['IPDIAFEITV2'].Items[2].Value" />
                </div>
              </td>
            </tr>
            <template v-if="MASTERDATA['IPDIAFETYOP'].Items[1].Value">
            <tr>
              <td colspan="2" class="no-padding">
                <div class="tbl-title">III. {{___t('Đánh giá tinh thần và xã hội')}}</div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIAFEHASN']">
              <th width="1">{{__label(MASTERDATA['IPDIAFEHASN'])}}</th>
              <td>
                <div class="flex-box">
                  <div class="w200">
                    <MDRadio :noFlex="true" @onChange="setIPDIAAUITV2('IPDIAFEITV3')" v-model="MASTERDATA['IPDIAFEHASN']"/>
                  </div>
                  <div class="w200 padding-left-15">
                    <b class="mb-5">{{__label(MASTERDATA['IPDIAFEHASN'].Items[3])}}</b>
                    <textarea-autosize rows="5" :placeholder="__t('Nhập')" class="form-control" v-model="MASTERDATA['IPDIAFEHASN'].Items[3].Value" />
                  </div>
                  <div class="padding-left-15">
                    <b class="mb-5">{{__label(MASTERDATA['IPDIAFEITV3'])}}</b>
                    <div :class="{'disabel-table': MASTERDATA['IPDIAFEHASN'].Items[2].Value}">
                      <MDRadio :noFlex="true" v-model="MASTERDATA['IPDIAFEITV3']"/>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIAFEHAFC']">
              <th width="1">{{__label(MASTERDATA['IPDIAFEHAFC'])}}</th>
              <td>
                <div class="flex-box">
                  <div class="w200">
                    <MDRadio :noFlex="true" @onChange="setIPDIAAUITV2('IPDIAFEITV4')" v-model="MASTERDATA['IPDIAFEHAFC']"/>
                  </div>
                  <div class="w200 padding-left-15">
                    <b class="mb-5">{{__label(MASTERDATA['IPDIAFEHAFC'].Items[3])}}</b>
                    <textarea-autosize rows="5" :placeholder="__t('Nhập')" class="form-control" v-model="MASTERDATA['IPDIAFEHAFC'].Items[3].Value" />
                  </div>
                  <div class="padding-left-15">
                    <b class="mb-5">{{__label(MASTERDATA['IPDIAFEITV4'])}}</b>
                    <div :class="{'disabel-table': MASTERDATA['IPDIAFEHAFC'].Items[2].Value}">
                      <MDRadio :noFlex="true" v-model="MASTERDATA['IPDIAFEITV4']"/>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="no-padding">
                <div class="tbl-title">IV. {{___t('Gia đình')}}</div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIAFEDICF']">
              <th width="1">{{__label(MASTERDATA['IPDIAFEDICF'])}}</th>
              <td>
                <div class="flex-box">
                  <div class="w200">
                    <MDRadio :noFlex="true" @onChange="setIPDIAAUITV2('IPDIAFEITV5')" v-model="MASTERDATA['IPDIAFEDICF']"/>
                  </div>
                  <div class="w200 padding-left-15">
                    <b class="mb-5">{{___t('Ghi chú')}}</b>
                    <div class="flex-box flex-center" :data="item" :key="index + 'checkboxIPDIAFEDICF'" v-for="(item,index) in MASTERDATA['IPDIAFEDICF'].Items" v-if="item.DataType === 'Checkbox'">
                      <div class="v-checkbox">
                        <input type="checkbox" :id="'IPDIAFEDICFcxo-' + index" v-model="item.Value">
                        <label :for="'IPDIAFEDICFcxo-' + index"></label>
                      </div>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                    <div class="mt-5" v-if="MASTERDATA['IPDIAFEDICF'].Items[6].Value">
                      <textarea-autosize :code="MASTERDATA['IPDIAFEDICF'].Items[7].Code" rows="1" :placeholder="__t('Nhập')" class="form-control" v-model="MASTERDATA['IPDIAFEDICF'].Items[7].Value" />
                    </div>
                  </div>
                  <div class="padding-left-15">
                    <b class="mb-5">{{__label(MASTERDATA['IPDIAFEITV5'])}}</b>
                    <div :class="{'disabel-table': MASTERDATA['IPDIAFEDICF'].Items[2].Value}">
                      <MDRadio :noFlex="true" v-model="MASTERDATA['IPDIAFEITV5']"/>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIAFEAFPT']">
              <th width="1">{{__label(MASTERDATA['IPDIAFEAFPT'])}}</th>
              <td>
                <div class="flex-box">
                  <div class="w200">
                    <MDRadio :noFlex="true" @onChange="setIPDIAAUITV2('IPDIAFEITV6')" v-model="MASTERDATA['IPDIAFEAFPT']"/>
                  </div>
                  <div class="w200 padding-left-15">
                    <b class="mb-5">{{__label(MASTERDATA['IPDIAFEAFPT'].Items[3])}}</b>
                    <textarea-autosize rows="5" :placeholder="__t('Nhập')" class="form-control" v-model="MASTERDATA['IPDIAFEAFPT'].Items[3].Value" />
                  </div>
                  <div class="padding-left-15">
                    <b class="mb-5">{{__label(MASTERDATA['IPDIAFEITV6'])}}</b>
                    <div :class="{'disabel-table': MASTERDATA['IPDIAFEAFPT'].Items[2].Value}">
                      <MDRadio :noFlex="true" v-model="MASTERDATA['IPDIAFEITV6']"/>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIAFEAAIC']">
              <th width="1">{{__label(MASTERDATA['IPDIAFEAAIC'])}}</th>
              <td>
                <div class="flex-box">
                  <div class="w200">
                    <MDRadio :noFlex="true" @onChange="setIPDIAAUITV2('IPDIAFEITV7')" v-model="MASTERDATA['IPDIAFEAAIC']"/>
                  </div>
                  <div class="w200 padding-left-15">
                    <b class="mb-5">{{__label(MASTERDATA['IPDIAFEAAIC'].Items[3])}}</b>
                    <textarea-autosize rows="5" :placeholder="__t('Nhập')" class="form-control" v-model="MASTERDATA['IPDIAFEAAIC'].Items[3].Value" />
                  </div>
                  <div class="padding-left-15">
                    <b class="mb-5">{{__label(MASTERDATA['IPDIAFEITV7'])}}</b>
                    <div :class="{'disabel-table': MASTERDATA['IPDIAFEAAIC'].Items[2].Value}">
                      <MDRadio :noFlex="true" v-model="MASTERDATA['IPDIAFEITV7']"/>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIAFECPRD']">
              <th width="1">{{__label(MASTERDATA['IPDIAFECPRD'])}}</th>
              <td>
                <div class="flex-box flex-center">
                  <div class="group-radio">
                    <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDIAFECPRD'].Items">
                      <input type="checkbox" :id="'IPDIAFECPRDradio-' + index" v-model="item.Value">
                      <label :for="'IPDIAFECPRDradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIAFECPRD'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                  <span>{{__t('Điều dưỡng báo bác sỹ hoàn thiện biểu mẫu “Yêu cầu không hồi sức tim phổi”')}}</span>
                </div>
              </td>
            </tr>
            </template>
          </table>
        </template>
        <br/><br/>
        <div class="row">
          <div class="col-md-6 col-sm-6 text-center">
          </div>
          <!-- <div class="col-md-6 col-sm-6 text-center">
            <template v-if="DataSubmit.UpdatedAt && DataSubmit.UpdatedBy">
              <p>{{DataSubmit.UpdatedAt}}</p>
              <eform-signature :ad="DataSubmit.UpdatedBy.Username" :title="__t('Điều dưỡng thực hiện')" />
            </template>
          </div> -->
          <div>
            <Confirm
              v-if="DataSubmit.VersionApp >= 11"
              class="mt-10"
              :MasterDataCode="'FORFRAILELDERLYCONFIRM_USERCREATED'"
              :FormCode="'A03_012_080121_VE'"
              :ReadOnly="readonly"
              :AdInfo="[DataSubmit.CreatedBy]"
              :VisitId="_VisitId"
              :FormId="DataSubmit.InfoForFrailElderly.FormId"
              :saveSuccesss="saveSuccesss"
              @handleConfirm="submit('confirm')"
              @confirmSuccess="getData()"
            />
        </div>
        </div>
        <br/>
        <br/>
        <div style="padding-left: 10px">
          <logs :EdId="this.$route.params.Id" :Type="'InitialAssessment/ForFrailElderly'" :noDetail="true" />
          <p v-if="DataSubmit.VersionApp >= 2">A03_012_080121_VE</p>
          <p v-else>A03_012_080121_V</p>
        </div>
        <p v-if="DataSubmit.VersionApp >= 11"  style="padding-left: 10px">
        {{ __t("Chỉnh sửa lần cuối bởi") }} <AdInfo
          v-if="DataSubmit.InfoForFrailElderly.UpdatedBy"
          :ad="DataSubmit.InfoForFrailElderly.UpdatedBy"
        /> {{ __t("lúc") }} {{ DataSubmit.InfoForFrailElderly.UpdatedAt | formatDateWithoutSecon }}
        </p>
        <br/>
        <br/>
        <FloatBlock>
          <template slot='top' v-if="syncInfo">
            <div style="color: #fff;text-align: right;"><b>Dữ liệu được đồng bộ từ khoa:</b> {{__label(syncInfo.Specialty)}}</div>
          </template>
          <template slot='buttons'>
            <div class="col-md-4">
              <div class="form-group1">
                <p class="hidden-text">hidden-text</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group1">
                <button class="btn pull-right btn-block" type="button" @click="$router.push({name: 'IPDFallRiskAssessment', params: {Id: $route.params.Id}})">{{__t('Đánh giá nguy cơ ngã')}}</button>
              </div>
            </div>
            <div class="col-md-5">
              <div class="form-group1">
                <button v-if="!readonly" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </template>
      <div v-else style="padding: 20px;">
        <div class="text-center">
          <p>{{___t('Chưa có đánh giá ban đầu người bệnh nội trú cho người cao tuổi')}}</p>
          <button v-if="!IsLocked" class="btn btn-warning" @click="confirmPopup">{{___t('Tạo mới')}}</button>
        </div>
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import VDatePicker from '@/components/VDateTimePicker.vue'
import MixinForm from '@/mixins/form.js'
import Logs from '@/components/Logs.vue'
import V2Select from '@/components/VSelect.vue'
import InitialAssessment from '@/services/IPD/InitialAssessment'
import ViewOnly from '@/components/IPD/ForFrailElderlyView.vue'
import _ from 'lodash'
// import moment from 'moment'
import NProgress from 'nprogress'
import Confirm from '@/components/Form/Confirm'
import EIOService from '@/services/IPD/EIOService'

export default {
  name: 'IPDInitialAssessmentForFrailElderlyIndex',
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      DataSubmit: {
      },
      loaded: false,
      syncInfo: null,
      IsLocked: false,
      saveSuccesss: false,
      isConfirm: false
    }
  },
  watch: {
    DataSubmit (a, b) {
    }
  },
  components: {
    VDatePicker, Logs, V2Select, ViewOnly, Confirm
  },
  mounted () {
    this.getMasterDatas({Form: 'IPDIAFE'}, () => {
      this.getData()
    })
  },
  computed: {
    readonly: function () {
      if (this.getUser() === 'tungpa1') {
        return false
      }
      return (this.DataSubmit.CreatedBy !== this.$store.state.account.Username) || this.IsLocked || this.isConfirm
    }
  },
  methods: {
    clearData () {
      console.log(this.MASTERDATA['IPDIAFEDICF'].Items[6], 'check Khác mô tả')
      if (this.MASTERDATA['IPDIAFEDICF'].Items[6].Value === false) {
        this.MASTERDATA['IPDIAFEDICF'].Items[7].Value = ''
      }
    },
    getListConfirm (id) {
      this.isConfirm = false
      new EIOService().find('ConfirmForms/GetList/' + id).then(res => {
        if (this.$route.name === 'IPDInitialAssessmentForFrailElderly') {
          if (res && res.length > 0) {
            this.isConfirm = true
          }
        }
        console.log('confirm child 1', this.isConfirm)
      })
    },
    validateForm () {
      var errors = []
      if (this.MASTERDATA['IPDIAFEDICF'].Items[6].Value && !this.MASTERDATA['IPDIAFEDICF'].Items[7].Value && this.DataSubmit.VersionApp >= 11) {
        errors.push(this.MASTERDATA['IPDIAFEDICF'].Items[7])
      }
      if (errors.length) {
        this.handlerResponse({ Error: errors })
      }
    },
    setIPDIAAUITV2 (type) {
      setTimeout(() => {
        if (type === 'IPDIAFEITV3') {
          this.MASTERDATA['IPDIAFEITV3'].Items[0].Value = this.MASTERDATA['IPDIAFEHASN'].Items[0].Value || this.MASTERDATA['IPDIAFEHASN'].Items[1].Value
          this.MASTERDATA['IPDIAFEITV3'].Items[1].Value = this.MASTERDATA['IPDIAFEHASN'].Items[2].Value
        }
        if (type === 'IPDIAFEITV4') {
          this.MASTERDATA['IPDIAFEITV4'].Items[0].Value = this.MASTERDATA['IPDIAFEHAFC'].Items[0].Value || this.MASTERDATA['IPDIAFEHAFC'].Items[1].Value
          this.MASTERDATA['IPDIAFEITV4'].Items[1].Value = this.MASTERDATA['IPDIAFEHAFC'].Items[2].Value
        }
        if (type === 'IPDIAFEITV5') {
          this.MASTERDATA['IPDIAFEITV5'].Items[0].Value = this.MASTERDATA['IPDIAFEDICF'].Items[0].Value || this.MASTERDATA['IPDIAFEDICF'].Items[1].Value
          this.MASTERDATA['IPDIAFEITV5'].Items[1].Value = this.MASTERDATA['IPDIAFEDICF'].Items[2].Value
        }
        if (type === 'IPDIAFEITV6') {
          this.MASTERDATA['IPDIAFEITV6'].Items[0].Value = this.MASTERDATA['IPDIAFEAFPT'].Items[0].Value || this.MASTERDATA['IPDIAFEAFPT'].Items[1].Value
          this.MASTERDATA['IPDIAFEITV6'].Items[1].Value = this.MASTERDATA['IPDIAFEAFPT'].Items[2].Value
        }
        if (type === 'IPDIAFEITV7') {
          this.MASTERDATA['IPDIAFEITV7'].Items[0].Value = this.MASTERDATA['IPDIAFEAAIC'].Items[0].Value || this.MASTERDATA['IPDIAFEAAIC'].Items[1].Value
          this.MASTERDATA['IPDIAFEITV7'].Items[1].Value = this.MASTERDATA['IPDIAFEAAIC'].Items[2].Value
        }
      }, 300)
    },
    setIPDIAAUITV () {
      setTimeout(() => {
        var IPDIAFEA = [
          this.MASTERDATA['IPDIAFEAGEE'].Items[0].Value,
          this.MASTERDATA['IPDIAFEDAOB'].Items[0].Value,
          this.MASTERDATA['IPDIAFEDYKW'].Items[0].Value,
          this.MASTERDATA['IPDIAFEWYII'].Items[0].Value
        ].filter(e => e).length
        var IPDIAFEA2 = [
          this.MASTERDATA['IPDIAFEAGEE'].Items[0].Value,
          this.MASTERDATA['IPDIAFEDAOB'].Items[0].Value,
          this.MASTERDATA['IPDIAFEDYKW'].Items[0].Value,
          this.MASTERDATA['IPDIAFEWYII'].Items[0].Value
        ].filter(e => e).length
        var IPDIAFEA3 = [
          this.MASTERDATA['IPDIAFEAGEE'].Items[1].Value,
          this.MASTERDATA['IPDIAFEDAOB'].Items[1].Value,
          this.MASTERDATA['IPDIAFEDYKW'].Items[1].Value,
          this.MASTERDATA['IPDIAFEWYII'].Items[1].Value
        ].filter(e => e).length
        this.MASTERDATA['IPDIAFECOGN'].Items[0].Value = IPDIAFEA === 4
        this.MASTERDATA['IPDIAFECOGN'].Items[1].Value = (IPDIAFEA2 < 4 && IPDIAFEA2 > 0) || IPDIAFEA3 === 4
      }, 300)
    },
    submit (confirm) {
      this.validateForm()
      this.clearData()
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      setTimeout(() => {
        new InitialAssessment().update('ForFrailElderly/' + this.$route.params.Id, this.DataSubmit).then(response => {
          if (confirm === 'confirm') {
            this.saveSuccesss = !this.saveSuccesss
            this.toastedSuccess()
          } else {
            this.toastedSuccess()
            setTimeout(() => {
              this.reload()
            }, 500)
          }
          // this.toastedSuccess()
          // this.reload()
        }).catch(e => {
          // this._401ResponseError(e)
        })
      }, 300)
    },
    create () {
      new InitialAssessment().update(this.$route.params.Id, {}, 'ForFrailElderly/Create/').then(response => {
        this.toastedSuccess()
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: 'Thông báo',
        text: 'Tạo mới đánh giá ban đầu người bệnh nội trú cho người cao tuổi *?',
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'Tôi xác nhận',
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: 'Bỏ qua',
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    syncLastIpdData () {
      new InitialAssessment().update('ForFrailElderly/Sync/' + this.$route.params.Id + '?hidemsg=' + true).then(response => {
        this.DataSubmit.Datas = response.Datas
        this.syncInfo = response
        this.mapData()
      })
    },
    mapData () {
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
            } else {
              // if (code === 'IPDIAAULANGANS') {
              //   item.Value = null
              // }
            }
          })
        }
      }
    },
    getData () {
      new InitialAssessment().find('ForFrailElderly/' + this.$route.params.Id + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        this.$store.dispatch('setCurrentFormId', response.InfoForFrailElderly.FormId)
        this.getListConfirm(response.InfoForFrailElderly.FormId)
        this.IsLocked = response.IsLocked
        this.loaded = true
        this.mapData()
        if (response.IsNew) {
          this.syncLastIpdData()
        }
      }).catch(e => {
        this.IsLocked = e.data.IsLocked
        this.loaded = true
        this.DataSubmit = false
        if (e.status === 404) {}
        this.edited = false
      })
    }
  }
}
</script>
