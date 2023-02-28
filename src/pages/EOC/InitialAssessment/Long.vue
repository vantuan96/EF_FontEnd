<template>
<div>
  <div v-if="DataSubmit">
    <div class="form-control" v-if="allowEdit && DataSubmit.IsNew && DataSubmit.IsShowSyncButton"><button class="btn btn-sync-data pull-right" @click="syncData()">{{__t('Lấy dữ liệu đánh giá gần nhất trong vòng 24 giờ')}}</button></div>
    <div class="tbl-title">1. {{__t('Chọn bác sĩ')}}</div>
    <table class="table v-table-1 no-margin">
      <tr>
        <template v-if="!allowEditDoctor || DataSubmit.hasOEN">
        <th class="text-left">{{__t('Bác sĩ')}}</th>
        <td><div class="fake-input disable">{{DataSubmit.PrimaryDoctor.Fullname || DataSubmit.PrimaryDoctor.Username}}</div></td>
        <th class="text-left">{{__t('Thời gian khám')}}</th>
        <td><div class="fake-input disable">{{DataSubmit.AdmittedDate | formatDateTime}}</div></td>
      </template>
      <template v-else>
        <th width="20%">{{__t('Bác sĩ')}}</th>
        <td>
          <div class="input-group input-group-sm">
            <input
              type="text"
              readonly
              class="form-control"
              :value="DataSubmit.PrimaryDoctor.Fullname || DataSubmit.PrimaryDoctor.Username"
            />
            <span class="input-group-btn">
              <button type="button" class="btn btn-info btn-flat" @click="syncHisDoctor(DataSubmit)">
                <span class="glyphicon glyphicon-refresh green-color"></span>
              </button>
            </span>
          </div>
        </td>
        <th>{{__t('Thời gian khám')}}</th>
        <td width="20%">
          <VDatePicker
            v-model="DataSubmit.AdmittedDate"
            class="full-w"
            :format="'HH:mm DD/MM/YYYY'"
          />
        </td>
        </template>
      </tr>
    </table>
    <div v-if="allowEdit">
      <div class="tbl-title">2. Thông tin chung</div>
      <table class="table v-table-1 no-margin" v-if="!syncing">
        <tr v-if="MASTERDATA['OPDIAFOGOPLAN']">
          <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPLAN'])}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPLAN'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDIAFOGOPLANradio-' + index" v-model="item.Value">
                  <label :for="'OPDIAFOGOPLANradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPLAN'].Items, item)">{{__label(item)}}</label>
                </span>
                <span :key="index" v-else style="flex-grow: 1;">
                  <input type="text" class="form-control" v-model="item.Value" :placeholder="__label(item)" v-if="MASTERDATA['OPDIAFOGOPLAN'].Items[1].Value"/>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDIAFOGOPREL']">
          <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPREL'])}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPREL'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDIAFOGOPRELradio-' + index" v-model="item.Value">
                  <label :for="'OPDIAFOGOPRELradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPREL'].Items, item)">{{__label(item)}}</label>
                </span>
                <span :key="index" v-else-if="item.DataType === 'AutoComplete'">
                  <v-select-box v-model="item.Value" :items="select2Suggest(item.Data)"/>
                </span>
                <span :key="index" v-else style="flex-grow: 1;" >
                  <input class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFOGOPREL'].Items[0].Value == 6"/>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDIAFOGOPCAR']">
          <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPCAR'])}}</th>
          <td>
            <div :data="item" :key="index"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPCAR'].Items">
              <input type="text" class="form-control" v-model="item.Value" :placeholder="__label(item)"/>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDIAFOGOPSP0']">
          <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPSP0'])}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPSP0'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDIAFOGOPSP0radio-' + index" v-model="item.Value">
                  <label :for="'OPDIAFOGOPSP0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPSP0'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDIAFOGOPPRE']">
          <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPPRE'])}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPPRE'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDIAFOGOPPREradio-' + index" v-model="item.Value">
                  <label :for="'OPDIAFOGOPPREradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPPRE'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDIAFOGOPBF0']">
          <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPBF0'])}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPBF0'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDIAFOGOPBF0radio-' + index" v-model="item.Value">
                  <label :for="'OPDIAFOGOPBF0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPBF0'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDIAFOGOPCPS']">
          <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPCPS'])}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPCPS'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDIAFOGOPCPSradio-' + index" v-model="item.Value">
                  <label :for="'OPDIAFOGOPCPSradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPCPS'].Items, item)">{{__label(item)}}</label>
                </span>
                <span :key="index" v-else style="flex-grow: 1;">
                  <input type="text" class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFOGOPCPS'].Items[3].Value"/>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDIAFOGOPADL']">
          <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPADL'])}}</th>
          <td>
            <table class="no-border">
              <tr v-if="MASTERDATA['OPDIAFOGOPBT0']">
                <th width="180">{{__label(MASTERDATA['OPDIAFOGOPBT0'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPBT0'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFOGOPBT0radio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFOGOPBT0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPBT0'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFOGOPBT0'].Items[2].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['OPDIAFOGOPEAT']">
                <th>{{__label(MASTERDATA['OPDIAFOGOPEAT'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPEAT'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFOGOPEATradio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFOGOPEATradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPEAT'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFOGOPEAT'].Items[2].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['OPDIAFOGOPMOV']">
                <th>{{__label(MASTERDATA['OPDIAFOGOPMOV'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPMOV'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFOGOPMOVradio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFOGOPMOVradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPMOV'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFOGOPMOV'].Items[2].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['OPDIAFOGOPGRO']">
                <th>{{__label(MASTERDATA['OPDIAFOGOPGRO'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPGRO'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFOGOPGROradio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFOGOPGROradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPGRO'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFOGOPGRO'].Items[2].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDIAFOGOPNA0']">
          <th width="20%">{{__label(MASTERDATA['OPDIAFOGOPNA0'])}}</th>
          <td>
            <table class="no-border">
              <tr v-if="MASTERDATA['OPDIAFOGOPWLO']">
                <th width="180">{{__label(MASTERDATA['OPDIAFOGOPWLO'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPWLO'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFOGOPWLOradio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFOGOPWLOradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPWLO'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize :placeholder="__t('Tăng/giảm bao nhiêu kg?')" class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFOGOPWLO'].Items[0].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['OPDIAFOGOPREA'] && MASTERDATA['OPDIAFOGOPWLO'].Items[0].Value">
                <th>{{__label(MASTERDATA['OPDIAFOGOPREA'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPREA'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFOGOPREAradio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFOGOPREAradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPREA'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" :placeholder="__t('Chủ ý')" v-model="item.Value" v-if="MASTERDATA['OPDIAFOGOPREA'].Items[0].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['OPDIAFOGOPDIE']">
                <th>{{__label(MASTERDATA['OPDIAFOGOPDIE'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPDIE'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFOGOPDIEradio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFOGOPDIEradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPDIE'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFOGOPDIE'].Items[2].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['OPDIAFOGOPAPP']">
                <th>{{__label(MASTERDATA['OPDIAFOGOPAPP'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPAPP'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFOGOPAPPradio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFOGOPAPPradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPAPP'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFOGOPAPP'].Items[2].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['OPDIAFOGOPFR0']">
                <th>{{__label(MASTERDATA['OPDIAFOGOPFR0'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPFR0'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFOGOPFR0radio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFOGOPFR0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPFR0'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFOGOPFR0'].Items[2].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['OPDIAFOGOPBH0']">
                <th>{{__label(MASTERDATA['OPDIAFOGOPBH0'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFOGOPBH0'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFOGOPBH0radio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFOGOPBH0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFOGOPBH0'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFOGOPBH0'].Items[2].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      <InitialAssessmentForLongTerm
        :DataSubmit="DataSubmit"
        :MASTERDATA="MASTERDATA"
        :VisitId="$route.params.Id"
        :hideInitialAssessmentForm="true"
      />
    </div>
    <his-doctor :OpdId="this.$route.params.Id" ref="HisDoctor" @close="updateDoctor" />
    <div v-if="this.DataSubmit.Version >= 7" class="row mt-10">
      <div class="col-md-6 col-sm-6 col-md-offset-6 col-sm-offset-6 text-center" v-if="ConfirmInfo && ConfirmInfo.length > 0 ? ConfirmInfo[0].ConfirmBy : false">
        <p class="text-center">{{ConfirmInfo[0].ConfirmAt | formatDateWithoutSecon}}</p>
        <EformSignature2 :title="__t('Noi_tru_san.nguoi_thuc_hien')" :ad="ConfirmInfo[0].ConfirmBy || ''"/>
      </div>
      <div class="col-md-6 col-sm-6 col-md-offset-6 col-sm-offset-6 text-center" v-else>
        <p class="mt-10"><b>{{__t('Noi_tru_san.nguoi_thuc_hien')}}:</b></p>
        <ad-Info v-if="DataSubmit.CreatedBy" :ad="DataSubmit.CreatedBy || ''" class="mb-5"/>
        <p v-if="allowEdit && !IsFormLocked(DataSubmit)">
          <button @click="showDoctorConfirm('Người thực hiện')" class="btn v-white-btn">
            {{ __t("Xác nhận") }}
          </button>
        </p>
        <p v-else class="italic" style="color: green">({{(__t('Chưa ký xác nhận'))}})</p>
      </div>
    </div>
    <div class="status-float-block" v-if="allowEdit || !DataSubmit.hasOEN">
      <div class="action-btn-block">
        <div class="container">
          <div class="content-container">
            <div class="row">
              <div class="col-sm-2 col-md-1">
                <div class="form-group1">
                </div>
              </div>
              <div class="col-sm-2 col-md-2">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                </div>
              </div>
              <div class="col-sm-4 col-md-4">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="$router.push({name: 'EOCInitialAssessmentFallRiskScreening', params: {Id: $route.params.Id}})"><i class="fa fa-file-o" aria-hidden="true"></i> {{__t('Sàng lọc ngã')}}</button>
                </div>
              </div>
              <div class="col-sm-4 col-md-5">
                <div class="form-group1">
                  <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" v-shortkey="['ctrl', 's']" @shortkey="save()" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <DoctorConfirm :popupTitle="popupTitle" @popupSave="popupSave"/>
    <logs :EdId="this.$route.params.Id" :Type="'OPD/InitialAssessments/ForOnGoing'" />
    <p>A02_008_080121_VE</p>
    <br/>
  </div>
  <div v-else class="text-center p20">
    <template v-if="loaded">
    <div v-if="hasErrForm">Có lỗi xảy ra!</div>
    <div v-else>
      <p>{{__t('Chưa có đánh giá ban đầu')}}</p>
      <button class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button>
    </div>
    </template>
    <v-loading v-else/>
  </div>
</div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import HisDoctor from '@/components/OPD/HisDoctor.vue'
import DoctorConfirm from './popup/PopupDoctorConfirm'
import VSelectBox from '@/components/VSelect.vue'
import InitialAssessment from '@/services/EOC/InitialAssessment'
import ConfirmForms from '@/services/ConfirmForms'
import NProgress from 'nprogress'
import VDatePicker from '@/components/VDateTimePicker.vue'
// import ListOfCurrentMedications from '@/components/OPD/ListOfCurrentMedications.vue'
import Logs from '@/components/Logs.vue'

import _ from 'lodash'
import InitialAssessmentForLongTerm from '@/components/OPD/ForOnGoingForm.vue'

export default {
  name: 'InitialAssessmentLong',
  mixins: [MixinMasterData, MixinForm],
  props: ['OpdId'],
  components: {
    VSelectBox,
    VDatePicker,
    Logs,
    InitialAssessmentForLongTerm,
    HisDoctor,
    DoctorConfirm
  },
  data () {
    return {
      syncing: false,
      DataSubmit: null,
      loaded: false,
      hasErrForm: false,
      FormId: '',
      popupTitle: '',
      dataMaster: {},
      ConfirmInfo: [],
      primaryDoctorChange: false
    }
  },
  computed: {
    bmiCalculation: function () {
      var weight = this.MASTERDATA['OPDIAFOGOPWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDIAFOGOPWEI'].Items[0].Value) : 0
      var height = this.MASTERDATA['OPDIAFOGOPHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDIAFOGOPHEI'].Items[0].Value) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    },
    allowEdit () {
      if (this.Version >= 7) {
        return (this.DataSubmit.CreatedBy === this.getCurrentUsername() || this.ImSuperAdmin()) && !(this.ConfirmInfo.length > 0 ? this.ConfirmInfo[0].ConfirmBy : false)
      }
      return this.DataSubmit.CreatedBy === this.getCurrentUsername() || this.ImSuperAdmin()
    },
    allowEditDoctor () {
      return this.DataSubmit.CreatedBy === this.getCurrentUsername() || this.ImSuperAdmin()
    }
  },
  mounted () {
  },
  created () {
    this.getMasterDatas({Form: 'OPDIAFOGOP'}, () => {
      this.getClinics()
      this.getData()
    })
  },
  methods: {
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới đánh giá ban đầu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    create () {
      new InitialAssessment().update(this.$route.params.Id, {}, '/ForOnGoing/Create/').then(response => {
        this.reload()
      })
    },
    updateDoctor (item) {
      item.DisplayName = item.Fullname
      this.DataSubmit.PrimaryDoctor = item
      this.primaryDoctorChange = true
    },
    syncHisDoctor () {
      this.$refs.HisDoctor.open(this.DataSubmit.PrimaryDoctor)
    },
    syncData () {
      this.syncing = true
      new InitialAssessment().update('/ForOnGoing/Sync/' + this.$route.params.Id).then(response => {
        // this.toastedSuccess(`Dữ liệu đồng bộ từ: ${response.Clinic ? (response.Clinic.ViName || 'N/A') : 'N/A'} khám lúc ${response.AdmittedDate}`)
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(response.Datas, {Code: code})
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
        this.syncing = false
      }).catch(e => {
        this.syncing = false
      })
    },
    select2Suggest (data) {
      var list = this.JSONParse(data)
      if (list) {
        return list.map(e => {
          e.id = e.value
          e.name = e.vilabel
          e.label = e.vilabel
          return e
        })
      } else {
        return []
      }
    },
    validateForm () {
      // abc
      var isNoValidate = !this.DataSubmit.PrimaryDoctor || !this.DataSubmit.PrimaryDoctor.Id
      if (isNoValidate) {
        this.$modal.show('dialog', {
          title: 'Có lỗi xảy ra',
          text: 'Bạn vui lòng nhập đầy đủ thông tin phòng khám và bác sĩ',
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: 'Đồng ý',
              class: 'btn bg-yellow',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
        })
        throw new Error('validate form')
      }
    },
    save () {
      this.validateForm()
      NProgress.start()
      this.DataSubmit.Datas = []
      this.DataSubmit._Exception = []
      if (this.MASTERDATA['OPDIAFOGOPREL'].Items[0].Value !== '6') {
        this.MASTERDATA['OPDIAFOGOPREL'].Items[1].Value = null
      }
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
          })
        }
      }
      var DataSubmit = Object.assign({}, this.DataSubmit)
      if (typeof DataSubmit.AdmittedDate === 'object') {
        DataSubmit.AdmittedDate = this.moment2String(DataSubmit.AdmittedDate)
      }
      if (DataSubmit.PrimaryDoctor) {
        DataSubmit._Exception.push({
          key: 'PrimaryDoctor',
          value: DataSubmit.PrimaryDoctor.Fullname
        })
      }
      setTimeout(() => {
        this.saveData(DataSubmit)
      }, 100)
    },
    async saveData (DataSubmit) {
      if (this.allowEditDoctor) {
        await new InitialAssessment().update(this.$route.params.Id, DataSubmit, '/ForOnGoing/Update/').then(async response => {
          this.toastedSuccess()
          this.edited = false
        }).catch(e => {
          this._401ResponseError(e)
        })
      }
      this.primaryDoctorChange = false
      await this.getData()
    },
    getData () {
      new InitialAssessment({hidemsg: true}).find('ForOnGoing/' + this.$route.params.Id).then(response => {
        this.DataSubmit = response
        if (!this.DataSubmit.AdmittedDate) {
          this.DataSubmit.AdmittedDate = new Date()
        } else {
          this.DataSubmit.AdmittedDate = this.string2Moment(this.DataSubmit.AdmittedDate)
        }
        this.Version = response.Version
        console.log('newInitialAssessment ~ this.Version', this.Version)
        this.$store.dispatch('setCurrentFormId', response.Id)
        this.FormId = response.Id
        this.getConfirm(this.FormId)
        this.mapMdData2Data()
        setTimeout(() => {
          this.dataMaster = JSON.stringify(this.MASTERDATA)
          this.edited = false
        }, 500)
        this.loaded = true
      }).catch(e => {
        if (e.status !== 404) this.hasErrForm = true
        this.loaded = true
      })
    },
    getConfirm (FormId) {
      new ConfirmForms().find('GetList' + '/' + FormId).then(response => {
        response.length > 0 ? this.ConfirmInfo = _.cloneDeep(response) : this.ConfirmInfo = []
      }).catch((e) => {
        console.log(e)
      })
    },
    async confirm (data) {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        await this.save()
      }
      new ConfirmForms().update('/Created/' + this.$route.params.Id + '/' + this.FormId + '/' + 'A02_008_080121_VE', data).then(response => {
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.$modal.hide('doctorConfirm')
        this.reload()
      })
    },
    // gọi popup confirm
    showDoctorConfirm (title) {
      this.popupTitle = title
      this.$modal.show('doctorConfirm')
    },
    // emit từ popup về confirm
    popupSave (data) {
      data.Kind = 'COMPLETEDBY_USERCREATED'
      data.Created = this.DataSubmit.CreatedBy
      this.confirm(data)
    }
  }
}
</script>
