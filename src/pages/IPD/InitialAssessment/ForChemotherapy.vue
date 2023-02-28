<template>
  <div>
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <!-- content -->
        <ViewOnly v-if="readonly" :MASTERDATA="MASTERDATA" />
        <template v-else>
          <div class="tbl-title">I. {{___t('Thông tin chung')}} <button class="btn btn-sync-data" @click="SynsGeneralAssessment()">{{__t('Lấy dữ liệu gần nhất')}}</button></div>
          <table class="table v-table-1 no-margin" id="InitialAssessment-ForChemotherapy-block1">
            <tr v-if="MASTERDATA['IPDIACPONDI']">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDIACPONDI'])}}</div></th>
              <td>
                <textarea-autosize rows="1" :placeholder="__t('Nhập')" class="form-control" v-model="MASTERDATA['IPDIACPONDI'].Items[0].Value" />
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPDAOD']">
              <th width="1">{{__label(MASTERDATA['IPDIACPDAOD'])}}</th>
              <td>
                <v-date-picker :hideTooltip="true" class="w1510 display-inline" :format="'DD/MM/YYYY'" v-model="MASTERDATA['IPDIACPDAOD'].Items[0].Value"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPOCIA']">
              <th width="1">{{__label(MASTERDATA['IPDIACPOCIA'])}}</th>
              <td>
                <textarea-autosize rows="1" :placeholder="__t('Nhập')" class="form-control" v-model="MASTERDATA['IPDIACPOCIA'].Items[0].Value" />
              </td>
            </tr>
          </table>
          <table  class="table v-table-1 no-margin" id="InitialAssessment-ForChemotherapy-block2">
            <tr>
              <td colspan="2" class="no-padding">
                <div class="tbl-title">II. {{___t('Thông tin điều trị')}}</div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPPTCA']">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDIACPPTCA'])}}</div></th>
              <td>
                <textarea-autosize rows="1" :placeholder="__t('Nhập')" class="form-control" v-model="MASTERDATA['IPDIACPPTCA'].Items[0].Value" />
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPAPTR']">
              <th width="1">{{__label(MASTERDATA['IPDIACPAPTR'])}}</th>
              <td>
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDIACPAPTR'].Items">
                    <input type="checkbox" :id="'IPDIACPAPTRradio-' + index" v-model="item.Value">
                    <label :for="'IPDIACPAPTRradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIACPAPTR'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPELOS']">
              <th width="1">{{__label(MASTERDATA['IPDIACPELOS'])}}</th>
              <td>
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDIACPELOS'].Items">
                    <input type="checkbox" :id="'IPDIACPELOSradio-' + index" v-model="item.Value">
                    <label :for="'IPDIACPELOSradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIACPELOS'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPEATT']">
              <th width="1">{{__label(MASTERDATA['IPDIACPEATT'])}}</th>
              <td>
                <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV1')" v-if="MASTERDATA['IPDIACPEATT']" v-model="MASTERDATA['IPDIACPEATT']"/>
              </td>
            </tr>
          </table>
          <table  class="table v-table-1 no-margin" id="InitialAssessment-ForChemotherapy-block3">
            <tr>
              <td colspan="2" class="no-padding">
                <div class="tbl-title">III. {{___t('Đánh giá của điều dưỡng')}}</div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPECOG']">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDIACPECOG'])}}</div></th>
              <td>
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDIACPECOG'].Items">
                    <input type="checkbox" :id="'IPDIACPECOGradio-' + index" v-model="item.Value">
                    <label :for="'IPDIACPECOGradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIACPECOG'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPCOND']">
              <th width="1">{{__label(MASTERDATA['IPDIACPCOND'])}}</th>
              <td>
                <div class="flex-box flex-center">
                  <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV1')" v-if="MASTERDATA['IPDIACPCOND']" v-model="MASTERDATA['IPDIACPCOND']"/>
                  <span>{{__label(MASTERDATA['IPDIACPCOND'].Items[4])}}:</span>
                  <number-input class="w100 ml-5 mr-5" :min="0" inline v-model="MASTERDATA['IPDIACPCOND'].Items[4].Value" :placeholder="__t('Nhập')"/>
                  <span>m2</span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPSKCO']">
              <th width="1">{{__label(MASTERDATA['IPDIACPSKCO'])}}</th>
              <td>
                <div class="flex-box flex-center">
                  <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV1')" v-model="MASTERDATA['IPDIACPSKCO']"/>
                  <span>{{__label(MASTERDATA['IPDIACPSKCO'].Items[2])}}:</span>
                  <number-input class="w100 ml-5 mr-5" :min="0" inline v-model="MASTERDATA['IPDIACPSKCO'].Items[2].Value" :placeholder="__t('Nhập')"/>
                  <span>m2</span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPHEEN']">
              <th width="1">{{__label(MASTERDATA['IPDIACPHEEN'])}}</th>
              <td>
                <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV1')" v-model="MASTERDATA['IPDIACPHEEN']"/>
              </td>
            </tr>
          </table>
          <!-- loi -->
          <table  class="table v-table-1 no-margin" id="InitialAssessment-ForChemotherapy-block4">
            <tr>
              <td colspan="2" class="no-padding">
                <div class="tbl-title">IV. {{___t('Đánh giá tình trạng ven')}}</div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPCVC']">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDIACPCVC'])}}</div></th>
              <td>
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDIACPCVC'].Items">
                    <input type="checkbox" :id="'IPDIACPCVCradio-' + index" v-model="item.Value">
                    <label :for="'IPDIACPCVCradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIACPCVC'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPCATY']">
              <th width="1">{{__label(MASTERDATA['IPDIACPCATY'])}}</th>
              <td>
                <textarea-autosize rows="1" :placeholder="__t('Nhập')" class="form-control" v-model="MASTERDATA['IPDIACPCATY'].Items[0].Value" />
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPLOOC']">
              <th width="1">{{__label(MASTERDATA['IPDIACPLOOC'])}}</th>
              <td>
                <textarea-autosize rows="1" :placeholder="__t('Nhập')" class="form-control" v-model="MASTERDATA['IPDIACPLOOC'].Items[0].Value" />
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPTWDI']">
              <th width="1">{{__label(MASTERDATA['IPDIACPTWDI'])}}</th>
              <td>
                <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV1')" v-model="MASTERDATA['IPDIACPTWDI']"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPITV1']">
              <th width="1"><span class="">{{__label(MASTERDATA['IPDIACPITV1'])}}</span></th>
              <td>
                <div class="flex-box flex-center">
                  <div class="v-checkbox">
                    <input type="checkbox" :id="'IPDIACPITV1cxo-' + 0" v-model="MASTERDATA['IPDIACPITV1'].Items[0].Value">
                    <label :for="'IPDIACPITV1cxo-' + 0"></label>
                  </div>
                  <span class="displaytbl"><span>{{__label(MASTERDATA['IPDIACPITV1'].Items[0])}}</span></span>
                  <template v-if="MASTERDATA['IPDIACPITV1'].Items.length">
                    <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['IPDIACPITV1'].Items" v-if="index">
                      <div class="flex-box flex-center" :class="{'disabel-table': item.Code === 'IPDIACPITV1ITA' && onIPDIACPITV1()}">
                        <div class="v-checkbox">
                          <input type="checkbox" :id="'IPDIACPITV1cxo-' + index" v-model="item.Value">
                          <label :for="'IPDIACPITV1cxo-' + index"></label>
                        </div>
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      </div>
                    </div>
                  </template>
                </div>
              </td>
            </tr>
          </table>
          <table  class="table v-table-1 no-margin" id="InitialAssessment-ForChemotherapy-block5">
            <tr>
              <td colspan="2" class="no-padding">
                <div class="tbl-title">V. {{___t('Đánh giá các phản ứng có hại của điều trị trước đó')}}</div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPHBTC']">
              <th width="1">
                <div class="w160">
                  {{__label(MASTERDATA['IPDIACPHBTC'])}}
                  <p class="note-text"><i>* Nếu lựa chọn không thì bỏ qua phần này</i></p>
                </div>
              </th>
              <td>
                <div class="flex-box flex-center">
                  <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV2')" v-model="MASTERDATA['IPDIACPHBTC']"/>
                  <template v-if="MASTERDATA['IPDIACPHBTC'].Items[0].Value">
                  <span class="mr-5">{{__label(MASTERDATA['IPDIACPHBTC'].Items[2])}}:</span>
                  <v-date-picker :hideTooltip="true" class="w1510 display-inline" :format="'DD/MM/YYYY'" v-model="MASTERDATA['IPDIACPHBTC'].Items[2].Value"/>
                  </template>
                </div>
              </td>
            </tr>
            <template v-if="MASTERDATA['IPDIACPHBTC'].Items[0].Value">
            <tr v-if="MASTERDATA['IPDIACPANOR']">
              <th width="1">{{__label(MASTERDATA['IPDIACPANOR'])}}</th>
              <td>
                <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV2')" v-model="MASTERDATA['IPDIACPANOR']"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPCTPT']">
              <th width="1">{{__label(MASTERDATA['IPDIACPCTPT'])}}</th>
              <td>
                <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV2')" v-model="MASTERDATA['IPDIACPCTPT']"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPDIAR']">
              <th width="1">{{__label(MASTERDATA['IPDIACPDIAR'])}}</th>
              <td>
                <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV2')" v-model="MASTERDATA['IPDIACPDIAR']"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPDMOM']">
              <th width="1">{{__label(MASTERDATA['IPDIACPDMOM'])}}</th>
              <td>
                <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV2')" v-model="MASTERDATA['IPDIACPDMOM']"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPNAUS']">
              <th width="1">{{__label(MASTERDATA['IPDIACPNAUS'])}}</th>
              <td>
                <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV2')" v-model="MASTERDATA['IPDIACPNAUS']"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPVOMI']">
              <th width="1">{{__label(MASTERDATA['IPDIACPVOMI'])}}</th>
              <td>
                <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV2')" v-model="MASTERDATA['IPDIACPVOMI']"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPALHL']">
              <th width="1">{{__label(MASTERDATA['IPDIACPALHL'])}}</th>
              <td>
                <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV2')" v-model="MASTERDATA['IPDIACPALHL']"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPNRTX']">
              <th width="1">{{__label(MASTERDATA['IPDIACPNRTX'])}}</th>
              <td>
                <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV2')" v-model="MASTERDATA['IPDIACPNRTX']"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPNTPN']">
              <th width="1">{{__label(MASTERDATA['IPDIACPNTPN'])}}</th>
              <td>
                <MDRadio @onChange="setIPDIAAUITV2('IPDIACPITV2')" v-model="MASTERDATA['IPDIACPNTPN']"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDIACPITV2']">
              <th width="1"><span class="">{{__label(MASTERDATA['IPDIACPITV2'])}}</span></th>
              <td>
                <div class="disabel-table">
                  <MDRadio v-model="MASTERDATA['IPDIACPITV2']"/>
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
          <div>
            <Confirm
              v-if="DataSubmit.VersionApp >= 11"
              class="mt-10"
              :MasterDataCode="'FORCHEMOTHERAPYCONFIRM_USERCREATED'"
              :FormCode="'A02_011_080121_VE'"
              :ReadOnly="readonly"
              :AdInfo="[DataSubmit.CreatedBy]"
              :VisitId="_VisitId"
              :FormId="DataSubmit.InfoForChemotherapy.FormId"
              :saveSuccesss="saveSuccesss"
              @handleConfirm="submit('confirm')"
              @confirmSuccess="getData()"
            />
        </div>
        </div>
        <br/>
        <br/>
        <div style="padding-left: 10px">
          <logs :EdId="this.$route.params.Id" :Type="'InitialAssessment/ForChemotherapy'" :noDetail="true" />
          <p>A02_011_080121_VE</p>
        </div>
        <p v-if="DataSubmit.VersionApp >= 11"  style="padding-left: 10px">
        {{ __t("Chỉnh sửa lần cuối bởi") }} <AdInfo
          v-if="DataSubmit.InfoForChemotherapy.UpdatedBy"
          :ad="DataSubmit.InfoForChemotherapy.UpdatedBy"
        /> {{ __t("lúc") }} {{ DataSubmit.InfoForChemotherapy.UpdatedAt | formatDateWithoutSecon }}
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
                <button v-if="!isConfirm" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </template>
      <div v-else style="padding: 20px;">
        <div class="text-center">
          <p>{{___t('Chưa có đánh giá ban đầu người bệnh nội trú cho người hóa trị')}}</p>
          <button v-if="!IsLocked" class="btn btn-warning" @click="confirmPopup">{{___t('Tạo mới')}}</button>
        </div>
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
// import VDatePicker from '@/components/VDatePicker.vue'
import MixinForm from '@/mixins/form.js'
import Logs from '@/components/Logs.vue'
import V2Select from '@/components/VSelect.vue'
import InitialAssessment from '@/services/IPD/InitialAssessment'
import ViewOnly from '@/components/IPD/ForChemotherapyView.vue'
import EventBus from '@/lib/eventBus'
import _ from 'lodash'
// import moment from 'moment'
import NProgress from 'nprogress'
import Confirm from '@/components/Form/Confirm'
import EIOService from '@/services/IPD/EIOService'

export default {
  name: 'IPDInitialAssessmentForChemotherapyIndex',
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      DataSubmit: {
      },
      loaded: false,
      menu: [
        {
          index: 'I. ',
          label: 'Thông tin chung',
          blockId: '#InitialAssessment-ForChemotherapy-block1'
        },
        {
          index: 'II. ',
          label: 'Thông tin điều trị',
          blockId: '#InitialAssessment-ForChemotherapy-block2'
        },
        {
          index: 'III. ',
          label: 'Đánh giá của điều dưỡng',
          blockId: '#InitialAssessment-ForChemotherapy-block3'
        },
        {
          index: 'IV. ',
          label: 'Đánh giá tình trạng ven',
          blockId: '#InitialAssessment-ForChemotherapy-block4'
        },
        {
          index: 'V. ',
          label: 'Đánh giá các phản ứng có hại của điều trị trước đó',
          blockId: '#InitialAssessment-ForChemotherapy-block5'
        }
      ],
      syncInfo: null,
      IsLocked: false,
      isConfirm: false
    }
  },
  components: {
    Logs, V2Select, ViewOnly, Confirm
  },
  mounted () {
    this.getMasterDatas({Form: 'IPDIACP'}, () => {
      this.getData()
    })
  },
  computed: {
    readonly: function () {
      return (this.DataSubmit.CreatedBy !== this.$store.state.account.Username) || this.IsLocked || this.isConfirm
    }
  },
  watch: {
    DataSubmit (a, b) {
    }
  },
  methods: {
    getListConfirm (id) {
      this.isConfirm = false
      new EIOService().find('ConfirmForms/GetList/' + id).then(res => {
        if (this.$route.name === 'IPDInitialAssessmentForChemotherapy') {
          if (res && res.length > 0) {
            this.isConfirm = true
          }
        }
        console.log('confirm child 1', this.isConfirm)
      })
    },
    setIPDIAAUITV2 (type) {
      setTimeout(() => {
        if (type === 'IPDIACPITV1') {
          this.MASTERDATA['IPDIACPITV1'].Items[3].Value = this.onIPDIACPITV1()
        }
        if (type === 'IPDIACPITV2') {
          this.MASTERDATA['IPDIACPITV2'].Items[1].Value = this.onIPDIACPITV2()
          this.MASTERDATA['IPDIACPITV2'].Items[0].Value = !this.onIPDIACPITV2()
        }
      }, 300)
    },
    onIPDIACPITV1 () {
      return this.MASTERDATA['IPDIACPTWDI'].Items[0].Value ||
        this.MASTERDATA['IPDIACPEATT'].Items[1].Value ||
        this.MASTERDATA['IPDIACPCOND'].Items[2].Value ||
        this.MASTERDATA['IPDIACPCOND'].Items[3].Value ||
        this.MASTERDATA['IPDIACPSKCO'].Items[1].Value ||
        this.MASTERDATA['IPDIACPHEEN'].Items[1].Value
    },
    onIPDIACPITV2 () {
      return this.MASTERDATA['IPDIACPHBTC'].Items[0].Value ||
        this.MASTERDATA['IPDIACPANOR'].Items[0].Value ||
        this.MASTERDATA['IPDIACPCTPT'].Items[0].Value ||
        this.MASTERDATA['IPDIACPDIAR'].Items[0].Value ||
        this.MASTERDATA['IPDIACPDMOM'].Items[0].Value ||
        this.MASTERDATA['IPDIACPNAUS'].Items[0].Value ||
        this.MASTERDATA['IPDIACPVOMI'].Items[0].Value ||
        this.MASTERDATA['IPDIACPALHL'].Items[0].Value ||
        this.MASTERDATA['IPDIACPNRTX'].Items[0].Value ||
        this.MASTERDATA['IPDIACPNTPN'].Items[0].Value
    },
    SynsGeneralAssessment () {
      new InitialAssessment().update('ForChemotherapy/SynsGeneralAssessment/' + this.$route.params.Id, this.DataSubmit).then(response => {
        console.log(response)
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(response, {Code: code})
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
      })
    },
    validateForm () {
      var errors = []
      if (this.MASTERDATA['OPDOENTD0'].Items[1].Value && !this.MASTERDATA['OPDOENTD0'].Items[2].Value) {
        errors.push(this.MASTERDATA['OPDOENTD0'].Items[2])
      }
      if (this.MASTERDATA['OPDOENTD0'].Items[1].Value && !this.MASTERDATA['OPDOENTD0'].Items[3].Value) {
        errors.push(this.MASTERDATA['OPDOENTD0'].Items[3])
      }
      if (errors.length) {
        this.handlerResponse({Error: this.errors})
      }
    },
    submit (confirm) {
      // this.validateForm()
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
      if (!obj['IPDIACPHBTCYES']) {
        this.resetMdData('IPDIACPANOR')
        this.resetMdData('IPDIACPCTPT')
        this.resetMdData('IPDIACPDIAR')
        this.resetMdData('IPDIACPDMOM')
        this.resetMdData('IPDIACPNAUS')
        this.resetMdData('IPDIACPVOMI')
        this.resetMdData('IPDIACPALHL')
        this.resetMdData('IPDIACPNRTX')
        this.resetMdData('IPDIACPNTPN')
        this.resetMdData('IPDIACPITV2')
      }
      setTimeout(() => {
        new InitialAssessment().update('ForChemotherapy/' + this.$route.params.Id, this.DataSubmit).then(response => {
          if (confirm === 'confirm') {
            this.saveSuccesss = !this.saveSuccesss
            this.toastedSuccess().getData()
          } else {
            this.toastedSuccess().getData()
            this.reload()
          }
        }).catch(e => {
          // this._401ResponseError(e)
        })
      }, 300)
    },
    resetMdData (key) {
      if (!this.MASTERDATA[key]) return
      this.MASTERDATA[key].Items.forEach(item => {
        item.Value = null
      })
      this.DataSubmit.Datas.forEach(item => {
        if (item.Group === key) {
          item.Value = null
        }
      })
    },
    create () {
      new InitialAssessment().update(this.$route.params.Id, {}, 'ForChemotherapy/Create/').then(response => {
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
        text: 'Tạo mới đánh giá ban đầu người bệnh nội trú cho người hóa trị *?',
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
      new InitialAssessment().update('ForChemotherapy/Sync/' + this.$route.params.Id + '?hidemsg=' + true).then(response => {
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
      new InitialAssessment().find('ForChemotherapy/' + this.$route.params.Id + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        this.$store.dispatch('setCurrentFormId', response.InfoForChemotherapy.FormId)
        this.getListConfirm(response.InfoForChemotherapy.FormId)
        this.loaded = true
        console.log('loaded: ', this.loaded)
        this.IsLocked = response.IsLocked
        this.mapData()
        if (response.IsNew) {
          this.syncLastIpdData()
        }
        setTimeout(() => {
          EventBus.$emit('updateGlobalIpdTopbaInfo', this.menu)
        }, 500)
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
