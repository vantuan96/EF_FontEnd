<template>
  <div class="mt-10">
    <div class="form-control" v-if="DataSubmit.IsNew && DataSubmit.IsShowSyncButton"><button class="btn btn-sync-data pull-right" @click="syncData()">{{__t('Lấy dữ liệu đánh giá gần nhất trong vòng 24 giờ')}}</button></div>
    <initial-assessment-form
      v-if="DataSubmit.InitialAssessmentForm"
      v-model="DataSubmit.InitialAssessmentForm"
      :showBtn="!allowEditDoctor"
      :FormType="'OnGoing'"
      ref="InitialAssessmentForm"
      :readonly="!((allowEditDoctor) && !IsFormLocked(DataSubmit))"
    />
    <div v-if="allowEdit && !IsFormLocked(DataSubmit)">
      <div class="tbl-title">1. Thông tin chung</div>
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
    <div v-if="this.DataSubmit.Version >= 7" class="row mt-10">
      <div class="col-md-6 col-sm-6 col-md-offset-6 col-sm-offset-6 text-center" v-if="ConfirmInfo.length > 0 ? ConfirmInfo[0].ConfirmBy : false">
        <p class="text-center">{{ConfirmInfo[0].ConfirmAt | formatDateWithoutSecon}}</p>
        <EformSignature2 :title="__t('Noi_tru_san.nguoi_thuc_hien')" :ad="ConfirmInfo[0].ConfirmBy || ''"/>
      </div>
      <div class="col-md-6 col-sm-6 col-md-offset-6 col-sm-offset-6 text-center" v-else>
        <p class="mt-10"><b>{{__t('Noi_tru_san.nguoi_thuc_hien')}}:</b></p>
        <ad-Info v-if="DataSubmit.UpdatedBy && !DataSubmit.IsNew" :ad="DataSubmit.UpdatedBy || ''" class="mb-5"/>
        <p v-if="allowEdit && !IsFormLocked(DataSubmit)">
          <button v-if="DataSubmit.UpdatedBy && !DataSubmit.IsNew" @click="showDoctorConfirm('Người thực hiện')" class="btn v-white-btn">
            {{ __t("Xác nhận") }}
          </button>
        </p>
        <div v-else >
          <p v-if="DataSubmit.UpdatedBy && !DataSubmit.IsNew" class="italic" style="color: green">({{(__t('Chưa ký xác nhận'))}})</p>
        </div>
      </div>
    </div>
    <div class="status-float-block" v-if="allowEditDoctor && !IsFormLocked(DataSubmit)">
      <div class="action-btn-block">
        <div class="container">
          <div class="content-container">
            <div class="row">
              <div class="col-sm-2 col-md-1">
                <div class="form-group1">
                  <button class="btn v-red-btn btn-block" type="button" @click="removeETR()">{{__t('btn.xoa')}}</button>
                </div>
              </div>
              <div class="col-sm-2 col-md-2">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                </div>
              </div>
              <div class="col-sm-4 col-md-4">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="$router.push({name: 'OPDInitialAssessmentFallRiskScreening', params: {Id: $route.params.Id}})"><i class="fa fa-file-o" aria-hidden="true"></i> {{__t('Sàng lọc ngã')}}</button>
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
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import VSelectBox from '@/components/VSelect.vue'
import InitialAssessment from '@/services/OPD/InitialAssessment'
import ConfirmForms from '@/services/ConfirmForms'
import DoctorConfirm from './popup/PopupDoctorConfirm'
import NProgress from 'nprogress'
import VDatePicker from '@/components/VDateTimePicker.vue'
// import ListOfCurrentMedications from '@/components/OPD/ListOfCurrentMedications.vue'
import Logs from '@/components/Logs.vue'
import _ from 'lodash'
import InitialAssessmentForm from '@/components/OPD/InitialAssessmentForm.vue'
import InitialAssessmentForLongTerm from '@/components/OPD/ForOnGoingForm.vue'

export default {
  name: 'InitialAssessmentLong',
  mixins: [MixinMasterData, MixinForm],
  props: ['OpdId'],
  components: {VSelectBox, VDatePicker, Logs, InitialAssessmentForm, InitialAssessmentForLongTerm, DoctorConfirm},
  data () {
    return {
      DataSubmit: {
        Datas: [],
        IsShowSyncButton: false,
        IsNew: false,
        PrimaryDoctor: {}
      },
      FormId: '',
      popupTitle: '',
      dataMaster: {},
      ConfirmInfo: [],
      PrimaryDoctors: [],
      syncing: false
    }
  },
  computed: {
    bmiCalculation: function () {
      var weight = this.MASTERDATA['OPDIAFOGOPWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDIAFOGOPWEI'].Items[0].Value) : 0
      var height = this.MASTERDATA['OPDIAFOGOPHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDIAFOGOPHEI'].Items[0].Value) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    },
    allowEdit () {
      if (this.DataSubmit.Version >= 7) {
        return (this.DataSubmit.IsNew || this.DataSubmit.UpdatedBy === this.$store.state.account.Username || this.ImSuperAdmin()) && !(this.ConfirmInfo.length > 0 ? this.ConfirmInfo[0].ConfirmBy : false)
      }
      return this.DataSubmit.IsNew || this.DataSubmit.UpdatedBy === this.$store.state.account.Username || this.ImSuperAdmin()
    },
    allowEditDoctor () {
      return this.DataSubmit.IsNew || this.DataSubmit.UpdatedBy === this.$store.state.account.Username || this.ImSuperAdmin()
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
    removeETR () {
      this.$modal.show('dialog', {
        title: 'Bạn muốn xóa bệnh nhân này không?',
        text: '<p>Hành động xóa hồ sơ bệnh án của bạn sẽ được lưu lại, dữ liệu đã nhập tại hồ sơ này sẽ bị mất.</p> <b>Chú ý</b>: Chỉ người tạo hồ sơ mới có quyền xóa, bạn cũng sẽ không thể xóa hồ sơ khi bác sĩ đã nhập thông tin.',
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'Đồng ý',
            class: 'btn',
            handler: () => {
              this.removeETRConfirmed()
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Hủy bỏ',
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    removeETRConfirmed () {
      new InitialAssessment().update('Delete/' + this.$route.params.Id, this.DataSubmit).then(response => {
        this.go2Home()
      })
    },
    updateDoctor (item) {
      item.DisplayName = item.Fullname
      this.DataSubmit.PrimaryDoctor = item
    },
    syncHisDoctor () {
      this.$refs.HisDoctor.open(this.DataSubmit.PrimaryDoctor)
    },
    syncData () {
      this.syncing = true
      new InitialAssessment().update('ForOnGoing/Sync/' + this.$route.params.Id).then(response => {
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
      var isNoValidate = this.DataSubmit.InitialAssessmentForm.find(form => {
        return !form.Removed && (!(form.PrimaryDoctor && form.PrimaryDoctor.Id) || !(form.Clinic && form.Clinic.Id))
      })
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
      // if (DataSubmit.AdmittedDate) {
      //   DataSubmit._Exception.push({
      //     key: 'AdmittedDate',
      //     value: DataSubmit.AdmittedDate
      //   })
      // }
      if (DataSubmit.Clinic) {
        DataSubmit._Exception.push({
          key: 'Clinic',
          value: DataSubmit.Clinic.ViName
        })
      }
      if (DataSubmit.PrimaryDoctor) {
        DataSubmit._Exception.push({
          key: 'PrimaryDoctor',
          value: DataSubmit.PrimaryDoctor.Fullname
        })
      }
      DataSubmit.ClinicId = DataSubmit.Clinic ? DataSubmit.Clinic.Id : null
      setTimeout(() => {
        // this.DataSubmit.Clinic = {}
        this.saveData(DataSubmit)
      }, 100)
    },
    async saveData (DataSubmit) {
      if (this.allowEdit) {
        await new InitialAssessment().update(this.$route.params.Id, DataSubmit, 'ForOnGoing/').then(async response => {
          this.toastedSuccess()
          this.edited = false
        }).catch(e => {
          this._401ResponseError(e)
        })
      }
      await this.$refs.InitialAssessmentForm.save(this.allowEdit)
      await this.getData()
    },
    getData () {
      new InitialAssessment().find('ForOnGoing/' + this.$route.params.Id).then(response => {
        this.DataSubmit = response
        this.$store.dispatch('setCurrentFormId', response.Id)
        this.FormId = response.Id
        this.getConfirm(this.FormId)
        if (!this.DataSubmit.AdmittedDate) {
          this.DataSubmit.AdmittedDate = new Date()
        } else {
          this.DataSubmit.AdmittedDate = this.string2Moment(this.DataSubmit.AdmittedDate)
        }
        this.DataSubmit.Clinic = this.Clinics.find(e => e.Id === this.DataSubmit.ClinicId)
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
        setTimeout(() => {
          this.dataMaster = JSON.stringify(this.MASTERDATA)
          this.edited = false
        }, 500)
      }).catch(e => {
        console.log(e)
        if (e.status === 400) {
          this._404()
        }
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
      new ConfirmForms().update('/Created/' + this.$route.params.Id + '/' + this.FormId + '/' + 'OPDIAFOGOP', data).then(response => {
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
      data.Created = this.DataSubmit.UpdatedBy
      this.confirm(data)
    }
  }
}
</script>
