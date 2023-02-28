<template>
  <div class="main-content">
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <div class="box box-table">
          <div class="box-body">
            <template v-if="routeType === 'Obstetrics'">
              <Obstetrics3
              ref="Obstetrics3"
              :box1="true"
              :MASTERDATA="MASTERDATA"
              :DataSubmit="DataSubmit"
              :ListSoSinh="ListSoSinh"
              :optionChild="optionChild"
              @confirmPopup="confirmPopupObstetrics3"
              @changeDataSync="syncHistoryOfPatientIllnessAndAssessment"/>
            </template>
            <div>
              <label class="block-title" v-if="routeType === 'Gynecological'">I. {{__t2('TỔNG KẾT BỆNH ÁN-mdcGy')}}:</label>
              <label class="block-title" v-else-if="routeType !== 'Obstetrics'">I. {{__t2('TỔNG KẾT BỆNH ÁN')}}:</label>
              <div :class="routeType !== 'Obstetrics' ? 'ml-10' : null">
                <div class="bg-gray-2">
                  <div v-if="routeType === 'Gynecological'" class="fw600" id="MedicalRecord-part3-block1">{{__t2('1. Quá trình bệnh lý và diễn biến lâm sàng-mdcGy')}}:</div>
                  <div v-else-if="routeType !== 'Obstetrics'" class="fw600" id="MedicalRecord-part3-block1">{{__label(MASTERDATA['IPDMRPEQTBL'])}}:</div>
                  <md-input-text :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPEQTBL'] && routeType !== 'Obstetrics'" v-model="MASTERDATA['IPDMRPEQTBL']">
                    <button class="btn btn-sync-data pull-right" @click="syncHistoryOfPatientIllnessAndAssessment()">{{__t2('Lấy bệnh sử và thăm khám')}}</button>
                  </md-input-text>
                  <label v-if="routeType === 'Gynecological'">{{__t2('2. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán-mdcGy')}}</label>
                  <label v-else-if="MASTERDATA['IPDMRPETTKQ']">{{__label(MASTERDATA['IPDMRPETTKQ'])}}</label>
                  <md-input-text :hidelabel="true" id="MedicalRecord-part3-block6" :placeholder="routeType === 'Oncology' ? plan : __t('Nhập')" v-if="MASTERDATA['IPDMRPETTKQ']" v-model="MASTERDATA['IPDMRPETTKQ']">
                    <SyncPrincipalTest :typeForm="typeForm" @copy="copy2IPDMRPETTKQ" :value="MASTERDATA['IPDMRPETTKQ'].Items[0].Value" />
                  </md-input-text>
                  <Eye3 v-if="routeType === 'Eye'"
                    ref="Eye3"
                    :box1="true"
                    :MASTERDATA="MASTERDATA"
                    :DataSubmit="DataSubmit"/>
                  <label v-if="routeType === 'Gynecological'">{{__t2('3. Phương pháp điều trị-mdcGy')}}</label>
                  <label v-else-if="MASTERDATA['IPDMRPEPPDT'] && routeType !== 'Oncology'">{{__label(MASTERDATA['IPDMRPEPPDT'])}}</label>
                  <template v-if="routeType === 'CardiovascularForm'">
                    <BMTIMMACH3 class="mrb10" ref="BMTIMMACH3box1" id="MedicalRecord-part3-block12" :box1="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit"/>
                  </template>
                  <template v-else>
                    <md-input-text :hidelabel="true" v-if="MASTERDATA['IPDMRPEPPDT'] && routeType !== 'Oncology'" id="MedicalRecord-part3-block7" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPEPPDT']"/>
                  </template>
                  <Eye3 v-if="routeType === 'Eye'"
                    :box2="true"
                    :MASTERDATA="MASTERDATA"
                    :DataSubmit="DataSubmit"/>
                  <Oncology3
                    v-if="routeType === 'Oncology'"
                    ref="Oncology3"
                    :box1="true"
                    :MASTERDATA="MASTERDATA"
                    :DataSubmit="DataSubmit"/>
                  <Gynecological3
                    v-if="routeType === 'Gynecological' || routeType === 'A01_195_050919_V' || routeType === 'A01_039_050919_V' || routeType === 'A01_040_050919_V'"
                    ref="Gynecological3Box1"
                    :box1="true"
                    :routeType="routeType"
                    :MASTERDATA="MASTERDATA"
                    :DataSubmit="DataSubmit"/>
                  <template>
                    <label v-if="MASTERDATA['IPDMRPETCDD']">{{__label(MASTERDATA['IPDMRPETCDD'])}}</label>
                    <md-input-text :hidelabel="true" id="MedicalRecord-part3-block8" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPETCDD']" v-model="MASTERDATA['IPDMRPETCDD']">
                      <ListOfCurrentMedications
                        ref="ListOfCurrentMedications"
                        :Type="'IPD-PatientMedicationList'"
                        :VisitTypeGroupCode="'IPD'"
                        @copy="copy2IPDMRPETCDD"
                      />
                    </md-input-text>
                  </template>
                  <label v-if="MASTERDATA['IPDMRPETTNB']">{{__label(MASTERDATA['IPDMRPETTNB'])}}</label>
                  <md-input-text :hidelabel="true" id="MedicalRecord-part3-block9" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPETTNB']" v-model="MASTERDATA['IPDMRPETTNB']"/>
                  <template>
                    <label style="display: block">{{__t('Chẩn đoán ra viện')}}:</label>
                    <div class="form-group" v-if="MASTERDATA['IPDMRPEICDC']">
                      <label>{{__t2('+ Mã ICD10 bệnh chính-mdcGy')}}:</label>
                      <DiagnosisPart2 :data="getDiagnosisPart2(1)" @copy="copyToIcd"/>
                      <icd10 @icdChange="icdChange" :mdCode="'IPDMRPEICDC'" :single="true" v-model="MASTERDATA['IPDMRPEICDC'].Items[0].Value"/>
                    </div>
                    <label>{{__t2('+ Chẩn đoán bệnh chính-mdcGy')}}</label>
                    <md-input-text :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPECDBC']" v-model="MASTERDATA['IPDMRPECDBC']"/>
                    <div class="form-group" :class="!MASTERDATA['IPDMRPECDKT'].Items[1].Value ? 'none' : null" v-if="MASTERDATA['IPDMRPEICDP']">
                      <label>{{__label(MASTERDATA['IPDMRPEICDP'])}}:</label>
                      <DiagnosisPart2 :data="getDiagnosisPart2(2)" @copy="copyToIcd"/>
                      <icd10 @icdChange="icdChange" :mdCode="'IPDMRPEICDP'" v-model="MASTERDATA['IPDMRPEICDP'].Items[0].Value"/>
                    </div>
                    <Oncology3
                      v-if="routeType === 'Oncology'"
                      class="mrb10"
                      ref="Oncology3Box2"
                      :box2="true"
                      :MASTERDATA="MASTERDATA"
                      :DataSubmit="DataSubmit"/>
                    <label>{{__t2('+ Chẩn đoán bệnh kèm theo (nếu có)-mdcGy')}}:</label>
                    <MdRadiosInput2 v-if="MASTERDATA['IPDMRPECDKT']" @change="handleChange('IPDMRPEICDP')" class="mrb10" :value="MASTERDATA['IPDMRPECDKT']" :noneDex="0"/>
                    <textarea-autosize v-if="MASTERDATA['IPDMRPECDKT'] && MASTERDATA['IPDMRPECDKT'].Items[1].Value" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPECDKT'].Items[0].Value"/>
                    <!-- <md-input-text :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPECDKT']" v-model="MASTERDATA['IPDMRPECDKT']"/> -->
                    <md-input-text :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPEPHBI']" v-model="MASTERDATA['IPDMRPEPHBI']"/>
                    <template v-if="routeType === 'CardiovascularForm'">
                      <BMTIMMACH3 class="mrb10" ref="BMTIMMACH3box2" :box2="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit"/>
                    </template>
                    <template v-else>
                      <!-- Tai biến / biến chứng -->
                      <div class="flex-box" v-if="MASTERDATA['IPDMRPETHPT'] && routeType === 'A01_034_050919_V' && DataSubmit.Version >= 2">
                        <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['IPDMRPETHPT'].Items">
                          <div class="flex-box flex-center" v-if="item.DataType === 'CheckBox' && index !== 0">
                            <div class="v-checkbox">
                              <input type="checkbox" :id="'IPDMRPETHPTcxo-' + index" v-model="item.Value">
                              <label :for="'IPDMRPETHPTcxo-' + index"></label>
                            </div>
                            <span class="displaytbl"><span>{{__label(item)}}</span></span>
                          </div>
                        </div>
                        <div style="flex-grow: 1;" class="ml-10">
                          <textarea-autosize class="form-control" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPETHPT'].Items[2].Value"/>
                        </div>
                      </div>
                      <div class="flex-box" v-else-if="MASTERDATA['IPDMRPETHPT'] && routeType !== 'Obstetrics' && routeType !== 'Gynecological' && routeType !== 'A01_195_050919_V' && routeType !== 'A01_039_050919_V' && routeType !== 'A01_040_050919_V' && routeType !== 'Eye'">
                        <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['IPDMRPETHPT'].Items">
                          <div class="flex-box flex-center" v-if="item.DataType === 'CheckBox'">
                            <div class="v-checkbox">
                              <input type="checkbox" :id="'IPDMRPETHPTcxo-' + index" v-model="item.Value">
                              <label :for="'IPDMRPETHPTcxo-' + index"></label>
                            </div>
                            <span class="displaytbl"><span>{{__label(item)}}</span></span>
                          </div>
                        </div>
                        <div style="flex-grow: 1;" class="ml-10">
                          <textarea-autosize class="form-control" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPETHPT'].Items[2].Value"/>
                        </div>
                      </div>
                    </template>
                    <div class="row" v-if="MASTERDATA['IPDMRPEKQDT']">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>{{__t('Kết quả điều trị')}}<i class="unit-label">{{MASTERDATA['IPDMRPEKQDT'].Note}}</i>:</label>
                          <MDRadio v-if="MASTERDATA['IPDMRPEKQDT'] && routeType !== 'Obstetrics'" :indexs="[0, 1, 2, 3, 4]" v-model="MASTERDATA['IPDMRPEKQDT']"/>
                          <div class="flex" v-else-if="MASTERDATA['IPDMRPEKQDT']">
                            <MDRadio v-if="MASTERDATA['IPDMRPEKQDT']" class="block" :indexs="[0, 1, 2, 3, 5]" v-model="MASTERDATA['IPDMRPEKQDT']"/>
                            <MDRadio v-if="MASTERDATA['IPDMRPEKQDT']" class="block" style="margin-left: -9px;" :indexs="[4]" v-model="MASTERDATA['IPDMRPEKQDT']"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="MASTERDATA['IPDMRPEGIPB']">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>{{__t2('Giải phẫu bệnh')}}<i class="unit-label">{{MASTERDATA['IPDMRPEGIPB'].Note}}</i>:</label>
                          <MDRadio v-if="MASTERDATA['IPDMRPEGIPB']" v-model="MASTERDATA['IPDMRPEGIPB']"/>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="MASTERDATA['IPDMRPEGPBT'] && MASTERDATA['IPDMRPEGIPB'].Items[0].Value">
                      <div class="col-md-12">
                        <div class="form-group">
                          <MDRadio :t2="true" v-if="MASTERDATA['IPDMRPEGPBT']" v-model="MASTERDATA['IPDMRPEGPBT']"/>
                        </div>
                      </div>
                    </div>
                    <label v-if="MASTERDATA['IPDMRPEBEPH'] && MASTERDATA['IPDMRPEGIPB'].Items[0].Value">{{__label(MASTERDATA['IPDMRPEBEPH'])}}:</label>
                    <md-input-text :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPEBEPH'] && MASTERDATA['IPDMRPEGIPB'].Items[0].Value" v-model="MASTERDATA['IPDMRPEBEPH']"/>
                    <template v-if="routeType === 'CardiovascularForm'">
                      <BMTIMMACH3 class="mrb10" ref="BMTIMMACH3box3" id="MedicalRecord-part3-block13" :box3="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit"/>
                    </template>
                    <!-- 6. Hướng điều trị và các chế độ tiếp theo -->
                    <label id="MedicalRecord-part3-block10" v-if="routeType === 'Gynecological'">{{__t2('6. Hướng điều trị và các chế độ tiếp theo-mdcGy')}}</label>
                    <label id="MedicalRecord-part3-block10" v-else-if="routeType !== 'Eye'">{{__label(MASTERDATA['IPDMRPEHDTV'])}}</label>
                    <div v-if="routeType === 'Pediatric'">{{getNameBoMe()}} <BtnCopy v-if="getNameBoMe()" :hideCopy="true" :value="null" @copy="handleCopy"/></div>
                    <md-input-text v-if="MASTERDATA['IPDMRPEHDTV'] && routeType !== 'Eye'" :hidelabel="true" :defaultLib="'LOIDAN061021'" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPEHDTV']"/>
                  </template>
                </div>
              </div>
            </div>
            <div id="MedicalRecord-part2-block5" class="mt-10 mrb10">
              <label class="block-title" v-if="routeType === 'Obstetrics'">V. {{__t('Trạng thái bệnh nhân')}}: {{__label(DataSubmit.Status)}}</label>
              <label class="block-title" v-else>II. {{__t('Trạng thái bệnh nhân')}}: {{__label(DataSubmit.Status)}}</label>
              <IPDMRPG :IsCheckTransfer="DataSubmit.IsCheckTransfer" :status="activeWithStatus" :routeType="routeType" v-model="DataSubmit.GeneralDatas" :Version="DataSubmit.Version" :IsUseHandOverCheckList="IsUseHandOverCheckList" />
              <div class="bg-gray-2 mt-10">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-gro2up">
                        <label>{{__label(MASTERDATA['IPDMRPECOIN'])}}:</label>
                        <MdRadiosInput2 :value="MASTERDATA['IPDMRPECOIN']"/>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="bg-gray-2 mt-10"  v-if="DataSubmit.Status && DataSubmit.Status.ViName === 'Chuyển khoa'" style="display: flex;">
                <input :readonly="IsReadOnLy" type="checkbox" style="display: inline !important; height: 25px; width: 25px; margin-right: 6px;" v-model="IsUseHandOverCheckList">
                <b style="display: contents !important; line-height: 2.5;">{{__t('Sử dụng biên bản bàn giao NB')}}</b>
              </div>
            </div>
          </div>
        </div>
        <br/><br/><br/>
        <div>
          <logs :EdId="this._VisitId" :Type="'MedicalRecord/Part3'" :noDetail="true" />
          <p v-if="routeType === 'A01_034_050919_V' && DataSubmit && (DataSubmit.Version >= 2)">A01_034_290422_V</p>
          <p v-else>{{getMaForm(typeForm)}}</p>
        </div>
        <br/><br/><br/><br/><br/>
        <FloatBlock :showForm="!nullContent" :nullContent="nullContent" @handleBack="handleBack">
          <template slot='top'>
            <template v-if="syncInfo">
              <div style="color: #fff;text-align: right;"><b>{{__t('Dữ liệu được đồng bộ từ khoa')}}:</b> {{__label(syncInfo.Specialty)}}</div>
            </template>
            <div class="group-radio" v-if="DataSubmit.ListStatus">
              <template  v-for="(status, index) in DataSubmit.ListStatus">
                <template v-if="routeType === 'Oncology'">
                  <input :data="status" :key="index" type="radio" :id="'a' + index" name="status" :value="status" v-model="DataSubmit.Status">
                  <label :key="'a' + index" :for="'a' + index">{{__label(status)}}</label>
                </template>
                <template v-else>
                  <input v-if="status && status.ViName !== 'Kết thúc điều trị'" :data="status" :key="index" type="radio" :id="'a' + index" name="status" :value="status" v-model="DataSubmit.Status">
                  <label v-if="status && status.ViName !== 'Kết thúc điều trị'" :key="'a' + index" :for="'a' + index">{{__label(status)}}</label>
                </template>
              </template>
            </div>
          </template>
          <template slot='buttons'>
            <div class="col-md-5">
              <div class="form-group1">
                <button class="btn btn-block v-white-btn" type="button" @click="$router.push({name: 'IPDDischargeMedicalReport', params: {Id: _VisitId}})"><i class="fa fa-file-o" aria-hidden="true"></i> {{__t('Báo cáo y tế ra viện')}}</button>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-group1">
                <!-- <button class="btn v-yellow-btn pull-right"  v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In ngay')}}</button> -->
              </div>
            </div>
            <div class="col-md-5">
              <div class="form-group1">
                <button v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'No examination'" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="noExaminationConfirm()" @click="noExaminationConfirm()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                <button v-else-if="DataSubmit.Status && DataSubmit.Status.EnName === 'Nonhospitalization'" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="NonhopitalizationConfirm()" @click="NonhopitalizationConfirm()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                <button v-else class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </template>
      <div v-else style="padding: 20px;">
        <div class="text-center">
          <p>{{__t(getTextWarning())}}</p>
          <button class="btn btn-warning" @click="confirmPopup(nameRoute, 'TỔNG KẾT BỆNH ÁN')">{{__t('Tạo mới')}}</button>
        </div>
      </div>
     <popup-create-so-sinh :optionChild="optionChild" :ListSoSinh="ListSoSinh" @handleCreate="handleCreate"/>
     </template>
     <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MedicalRecordMixinForm from './Mixin.js'
import MedicalRecord from '@/services/IPD/MedicalRecord'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import Logs from '@/components/Logs.vue'
// import OutpatientExaminationNote from '@/services/OPD/OutpatientExaminationNote'
import VSelectBox from '@/components/VSelect.vue'
import ListOfCurrentMedications from './ListOfCurrentMedications.vue'
import _ from 'lodash'
import NProgress from 'nprogress'
import EventBus from '@/lib/eventBus'
import IPDMRPG from './IPDMRPG.vue'
import SyncPrincipalTest from './SyncPrincipalTest.vue'
import DiagnosisPart2 from './DiagnosisPart2.vue'
// import $ from 'jquery'
// import _ from 'lodash'
// import moment from 'moment'
import $ from 'jquery'
import Obstetrics3 from '@/pages/IPD/MedicalRecord/Page2CPN/Obstetrics3.vue'
import Gynecological3 from '@/pages/IPD/MedicalRecord/Page2CPN/Gynecological3.vue'
import Oncology3 from '@/pages/IPD/MedicalRecord/Page2CPN/Oncology3.vue'
import Eye3 from '@/pages/IPD/MedicalRecord/Page2CPN/Eye3.vue'
import BMTIMMACH3 from '@/pages/IPD/MedicalRecord/Page2CPN/BMTIMMACH3.vue'
import PopupCreateSoSinh from '@/pages/IPD/MedicalRecord/popup/PopupCreateSoSinh.vue'
export default {
  name: 'IPDMedicalRecordPart3',
  mixins: [MixinMasterData, MedicalRecordMixinForm],
  data () {
    return {
      isErrorPop: false,
      checkMessage: 0,
      DataSubmit: null,
      loaded: false,
      isFirst: true,
      icd10Code: ['IPDMRPTICDTANS', 'IPDMRPTICDKANS', 'IPDMRPEICDCANS', 'IPDMRPEICDPANS', 'IPDMRPE889', 'IPDMRPE892', 'IPDMRPE806', 'IPDMRPE927'],
      syncIPDMRPETTKQAt: null,
      syncInfo: null,
      dataMaster: '',
      nullContent: true,
      menu: [],
      IsUseHandOverCheckList: true,
      IsAcceptPhysician: false,
      IsAcceptNurse: false,
      IsReadOnLy: false,
      plan: '- XN máu:\n- XN tế bào:\n- XN GPB:\n- X quang:\n- Siêu âm:\n- Các XN khác:',
      GroupCodeMasterData: [
        'IPDMRPE803',
        'IPDMRPE807',
        'IPDMRPE907',
        'IPDMRPE909',
        'IPDMRPE911',
        'IPDMRPE914',
        'IPDMRPE916',
        'IPDMRPE917',
        'IPDMRPE819',
        'IPDMRPE821',
        'IPDMRPE812',
        'IPDMRPE919',
        'IPDMRPE922',
        'IPDMRPE913',
        'IPDMRPE915',
        'IPDMRPE809'
      ],
      ListSoSinh: [],
      optionChild: []
    }
  },
  components: {
    DiagnosisPart2,
    ListOfCurrentMedications,
    VSelectBox,
    VDateTimePicker,
    Logs,
    IPDMRPG,
    SyncPrincipalTest,
    Obstetrics3,
    Gynecological3,
    Oncology3,
    Eye3,
    BMTIMMACH3,
    PopupCreateSoSinh
  },
  watch: {
    'DataSubmit.Status' () {
      if (!this.isFirst) {
        setTimeout(() => {
          $('html, body').animate({ scrollTop: 99000 }, 500)
        }, 100)
      }
      this.isFirst = false
    }
  },
  mounted () {
    this.getSpecialities()
    this.getData()
  },
  computed: {
    activeWithStatus: function () {
      return this.DataSubmit.Status ? this.DataSubmit.Status : ''
    },
    getValueOfPatientIllnessAndAssessment () {
      return this.valueOfPatientIllnessAndAssessment
    },
    getValueOfPatientIllnessAndAssessmentEye () {
      return this.valueOfPatientIllnessAndAssessmentEye
    },
    routeType () {
      return this.$route.meta.type || ''
    },
    nameRoute () {
      return this.MedicalRecordFormName
    },
    typeForm () {
      return this.MedicalRecordFormCode
    }
  },
  methods: {
    NonhopitalizationConfirm () {
      this.$modal.show('dialog', {
        title: this.__t('Bạn có chắc chắn không sử dụng hồ sơ bệnh án này cho NB?'),
        text: this.__t('Lưu ý: Toàn bộ thông tin đã làm sẽ được giữ nguyên!'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi đồng ý'),
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
              this.resetMdDataValue()
              this.submit()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    copyToIcd (value) {
      if (value.type === 1) {
        this.MASTERDATA['IPDMRPEICDC'].Items[0].Value = value.icd
        this.MASTERDATA['IPDMRPECDBC'].Items[0].Value = value.diagnosis
      }
      if (value.type >= 2) {
        this.MASTERDATA['IPDMRPEICDP'].Items[0].Value = value.icd
        this.MASTERDATA['IPDMRPECDKT'].Items[0].Value = value.diagnosis
      }
    },
    getDiagnosisPart2 (type) {
      var DiagnosisCode = ['IPDMRPTICDCANS', 'IPDMRPTCDBCANS', 'IPDMRPTICDPANS', 'IPDMRPTCDKTANS']
      if (this.DataSubmit && this.DataSubmit.Part2 && this.DataSubmit.Part2.length) {
        var DiagnosisInfo = this.DataSubmit.Part2.filter(e => DiagnosisCode.includes(e.Code))
        var icdcode = ''
        var diagnosiscode = ''
        if (type === 1) {
          icdcode = 'IPDMRPTICDCANS'
          diagnosiscode = 'IPDMRPTCDBCANS'
        } else {
          icdcode = 'IPDMRPTICDPANS'
          diagnosiscode = 'IPDMRPTCDKTANS'
        }
        var icdData = DiagnosisInfo.find(e => e.Code === icdcode) || {}
        var icd = this.JSONParse(icdData.Value, true)
        var diagnosisData = DiagnosisInfo.find(e => e.Code === diagnosiscode) || {}
        var diagnosis = diagnosisData.Value
        var UpdatedAt = icdData.UpdatedAt || diagnosisData.UpdatedAt
        var UpdatedBy = icdData.UpdatedBy || diagnosisData.UpdatedBy
        if (icd && diagnosis) {
          return {
            icd, diagnosis, UpdatedAt, UpdatedBy, type
          }
        }
      }
      return null
    },
    print () {
      this.$refs.Printer.submit(true)
    },
    icdChange (value, code) {
      var val = (value || []).map(e => e.ViName)
      switch (code) {
        case 'IPDMRPEICDC':
          // IPDMRPECDBC
          if (!this.MASTERDATA['IPDMRPECDBC'].Items[0].Value) this.MASTERDATA['IPDMRPECDBC'].Items[0].Value = val.join(', ')
          break
        case 'IPDMRPEICDP':
          // IPDMRPECDKT
          // IPDMRPEICDP
          var currentValue = this.MASTERDATA['IPDMRPECDKT'].Items[0].Value || ''
          this.MASTERDATA['IPDMRPECDKT'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
          break
        default:
          break
      }
    },
    copy2IPDMRPETCDD (str) {
      if (this.MASTERDATA['IPDMRPETCDD'].Items[0].Value && this.MASTERDATA['IPDMRPETCDD'].Items[0].Value.includes(str)) {
      } else {
        var old = this.MASTERDATA['IPDMRPETCDD'].Items[0].Value ? (this.trim_(this.MASTERDATA['IPDMRPETCDD'].Items[0].Value) + '\n') : ''
        this.MASTERDATA['IPDMRPETCDD'].Items[0].Value = old + str
        this.toastedInfo('Đã copy')
      }
    },
    copy2IPDMRPETTKQ (str) {
      this.MASTERDATA['IPDMRPETTKQ'].Items[0].Value = str
    },
    async syncHistoryOfPatientIllnessAndAssessment () {
      if (this.routeType === 'Eye') {
        await this.getDataFillBAEye(this.typeForm)
        this.MASTERDATA['IPDMRPEQTBL'].Items[0].Value = this.valueOfPatientIllnessAndAssessmentEye
      } else if (this.routeType === 'CardiovascularForm') {
        await this.getDataFillBA('A01_034_050919_V')
        this.MASTERDATA['IPDMRPEQTBL'].Items[0].Value = this.valueOfPatientIllnessAndAssessment
      } else {
        await this.getDataFillBA(this.typeForm)
        this.MASTERDATA['IPDMRPEQTBL'].Items[0].Value = this.valueOfPatientIllnessAndAssessment
      }
    },
    syncDiagnosis () {
      new MedicalRecord().update('Part3/SyncDiagnosis' + '/' + this.typeForm, {Id: this._VisitId}).then(response => {
        var mapingCode = {
          IPDMRPEICDCANS: 'IPDMRPTICDCANS',
          IPDMRPECDBCANS: 'IPDMRPTCDBCANS',
          IPDMRPEICDPANS: 'IPDMRPTICDPANS',
          IPDMRPECDKTANS: 'IPDMRPTCDKTANS'
        }
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var exited = _.find(response, {Code: mapingCode[item.Code]})
              if (exited) {
                if (this.icd10Code.includes(item.Code)) {
                  item.Value = this.JSONParse(exited.Value)
                } else {
                  item.Value = exited.Value
                }
              }
            })
          }
        }
      })
    },
    async submit () {
      if (this.routeType === 'Obstetrics') {
        this.$refs.Obstetrics3.handleClear5(true)
      }
      if (this.MASTERDATA['IPDMRPECDKT'] && (this.MASTERDATA['IPDMRPECDKT'].Items[2].Value || (!this.MASTERDATA['IPDMRPECDKT'].Items[2].Value && !this.MASTERDATA['IPDMRPECDKT'].Items[1].Value))) {
        this.MASTERDATA['IPDMRPECDKT'].Items[0].Value = ''
      }
      if (this.routeType === 'CardiovascularForm') {
        await this.$refs.BMTIMMACH3box1.handleCheckMapMD(true)
      }
      var DataSubmit = this.getDataSubmit()
      DataSubmit.IsUseHandOverCheckList = this.IsUseHandOverCheckList
      console.log('DataSubmit', DataSubmit)
      NProgress.start()
      setTimeout(() => {
        new MedicalRecord().update('Part3/' + this.typeForm + '/' + this._VisitId, DataSubmit).then(response => {
          if (response.Error) {
            this.handlerResponse(response)
          }
          if (this.routeType === 'Obstetrics') {
            this.$refs.Obstetrics3.$refs.TblWithMasterData.submit(true)
          }
          if (this.routeType === 'Gynecological' || this.routeType === 'A01_195_050919_V' || this.routeType === 'A01_039_050919_V' || this.routeType === 'A01_040_050919_V') {
            this.$refs.Gynecological3Box1.$refs.TblWithMasterData.submit(true)
          }
          if (this.routeType === 'Eye') {
            this.$refs.Eye3.$refs.TblWithMasterData.submit(true)
          }
          this.toastedSuccess()
          this.reload()
          // this.$refs.ListOfCurrentMedications.submit(true)
        }).catch(e => {
          // this.$router.push({name: 'IPDMedicalRecordPart1', params: {Id: this._VisitId, Check: true}})
          if (e.data && e.data.NeedSyncVisitCode) {
            this.alert(this.__t('Thông báo'), this.__t('Vui lòng đồng bộ PID và lượt khám!'))
          } else {
            if (e.data.IsErorr) {
              this.popUpWarning(e.data.ViMessage)
            }
          }
          // this._401ResponseError(e)
        })
      }, 100)
    },
    pushRoute () {
      this.$router.push({name: 'IPDMedicalRecordPart1', params: {Id: this._VisitId, Check: true}})
    },
    popUpWarning (message) {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t(message),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng bộ'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              if (message === 'Vui lòng đồng bộ PID của NB!') {
                this.checkMessage = 1
              } else if (message === 'Vui lòng đồng bộ lượt tiếp nhận của NB!') {
                this.checkMessage = 2
              } else {
                this.checkMessage = 3
              }
              if (this.$route.name) {
                this.$router.push({
                  name: this.$route.name.replace('Part3', 'Part1'),
                  params: {Id: this.$route.params.Id, Check: this.checkMessage}
                })
              }
            }
          },
          {
            title: this.__t('Quay lại'),
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
      new MedicalRecord().update('Part3/Create/' + this.typeForm + '/' + this._VisitId, {}).then(response => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    mapData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (item.Code === 'IPDMRPTHTRVBOV') item.Viname = item.Viname + ' ' + item.Note
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (this.icd10Code.includes(item.Code)) {
                item.Value = this.JSONParse(exited.Value)
              } else {
                item.Value = exited.Value
                if (!exited.Value && this.checkString(item.DataType, 'Text') && this.$store.state.account.Username === 'thangdc3') {
                  item.Value = item.ViName
                }
              }
            } else {
              item.Value = null
              if (this.checkString(item.DataType, 'Text') && this.$store.state.account.Username === 'thangdc3') {
                item.Value = item.ViName
              }
            }
          })
        }
      }
      if (this.MASTERDATA['IPDMRPECDKT'] && (this.MASTERDATA['IPDMRPECDKT'].Items[2].Value || (!this.MASTERDATA['IPDMRPECDKT'].Items[2].Value && !this.MASTERDATA['IPDMRPECDKT'].Items[1].Value))) {
        this.MASTERDATA['IPDMRPECDKT'].Items[0].Value = ''
      }
    },
    mapTableSan (data) {
      setTimeout(() => {
        if (this.routeType === 'Gynecological' || this.routeType === 'A01_195_050919_V' || this.routeType === 'A01_039_050919_V' || this.routeType === 'A01_040_050919_V') {
          this.$refs.Gynecological3Box1.$refs.TblWithMasterData.mapDataTable(data)
        }
        if (this.routeType === 'Obstetrics') {
          this.$refs.Obstetrics3.$refs.TblWithMasterData.mapDataTable(data)
        }
      }, 500)
    },
    syncLastIpdData () {
      new MedicalRecord().update('Part3/Sync/' + this.typeForm + '/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.DataSubmit.Datas = response.Datas
        this.DataSubmit.DataInfor = response.DataInfor
        this.syncInfo = response
        if (response.Datas && response.Datas.length) {
          response.Datas.find(e => {
            if (e.Code === 'IPDMRPE927' && e.Value !== 'null') {
              this.ListSoSinh = this.JSONParse(e.Value, true)
            }
          })
        }
        if (this.MASTERDATA && this.ListSoSinh && this.ListSoSinh.length) {
          this.ListSoSinh.forEach(elm => {
            this.GroupCodeMasterData.forEach(code => {
              if (this.MASTERDATA[code]) {
                let md = this.cloneObj(this.MASTERDATA[code])
                md.Code = code + '_' + elm.Id
                if (md.Items && md.Items.length) {
                  md.Items.forEach(e => {
                    if (!e.Code.includes('_') && md.Code.includes(elm.Id)) {
                      e.Code = e.Code + '_' + elm.Id
                    }
                  })
                }
                this.$set(this.MASTERDATA, md.Code, md)
              }
            })
          })
          this.$refs.Obstetrics3.setFormID(this.ListSoSinh[0].Id)
        }
        this.mapData()
        if (response.InfoOldSan) {
          this.mapTableSan(response.InfoOldSan)
        }
      })
    },
    async getData () {
      if (this.routeType === 'Obstetrics') {
        await new MedicalRecord().find('Part3/SyncInfoNewborn/' + this._VisitId).then(res => {
          this.optionChild = res.NewbornFromInitialAsseesment
        }).catch(e => {
          this.optionChild = []
        })
      }
      await new MedicalRecord().find('Part3/' + this.typeForm + '/' + this._VisitId).then(response => {
        this.DataSubmit = response
        this.ListSoSinh = []
        if (response.Datas && response.Datas.length) {
          response.Datas.find(e => {
            if (e.Code === 'IPDMRPE927') {
              this.ListSoSinh = this.JSONParse(e.Value, true)
            }
          })
        }
        this.IsUseHandOverCheckList = response.IsUseHandOverCheckList
        if (this.IsUseHandOverCheckList == null || this.IsUseHandOverCheckList === undefined) {
          this.IsUseHandOverCheckList = true
        }
        this.IsAcceptPhysician = response.IsAcceptPhysician
        this.IsAcceptNurse = response.IsAcceptNurse
        if (this.IsAcceptPhysician || this.IsAcceptNurse) {
          this.IsReadOnLy = true
        }
        if (response.UpdateBy) {
          let data = {
            UpdateAt: response.UpdateAt,
            UpdateBy: response.UpdateBy
          }
          this.pushUpdateBy(data)
        }
        this.getMasterDatas({Form: 'IPDMRPE'}, () => {
          if (this.MASTERDATA && this.ListSoSinh && this.ListSoSinh.length) {
            this.ListSoSinh.forEach(elm => {
              this.GroupCodeMasterData.forEach(code => {
                if (this.MASTERDATA[code]) {
                  let md = this.cloneObj(this.MASTERDATA[code])
                  md.Code = code + '_' + elm.Id
                  if (md.Items && md.Items.length) {
                    md.Items.forEach(e => {
                      if (!e.Code.includes('_') && md.Code.includes(elm.Id)) {
                        e.Code = e.Code + '_' + elm.Id
                      }
                    })
                  }
                  this.$set(this.MASTERDATA, md.Code, md)
                }
              })
            })
          }
          this.mapData()
          this.dataMaster = JSON.stringify(this.MASTERDATA)
          this.nullContent = false
          if (response.IsNew) {
            this.syncLastIpdData()
          }
          if (this.routeType === 'Neonatal' && this.MASTERDATA['IPDMRPETTNB']) {
            this.MASTERDATA['IPDMRPETTNB'].ViName = '4. Tình trạng sơ sinh ra viện'
            this.MASTERDATA['IPDMRPETTNB'].EnName = '4. Newborn’s status at discharge'
          }
          if (this.routeType === 'Neonatal' && this.MASTERDATA['IPDMRPEHDTV']) {
            this.MASTERDATA['IPDMRPEHDTV'].ViName = '5. Hướng điều trị và các chế độ tiếp theo'
            this.MASTERDATA['IPDMRPEHDTV'].EnName = '5. Indication and follow-up plan'
          }
          if (this.routeType === 'Neonatal' && this.MASTERDATA['IPDMRPETCDD'] && this.MASTERDATA['IPDMRPEHDTV']) {
            this.MASTERDATA['IPDMRPETTNB'].ViName = '5. Tình trạng người bệnh ra viện'
            this.MASTERDATA['IPDMRPETTNB'].EnName = '5. Patient status at discharge'
            this.MASTERDATA['IPDMRPEHDTV'].ViName = '6. Hướng điều trị và các chế độ tiếp theo'
            this.MASTERDATA['IPDMRPEHDTV'].EnName = '6. Indication and follow-up plan'
          }
          if (this.routeType === 'Obstetrics' && this.MASTERDATA['IPDMRPEHDTV']) {
            this.MASTERDATA['IPDMRPEHDTV'].ViName = '10. Hướng điều trị và các chế độ tiếp theo'
            this.MASTERDATA['IPDMRPEHDTV'].EnName = '10. Indication and follow-up plan'
          }
          if (this.routeType === 'Obstetrics' && this.MASTERDATA['IPDMRPETTNB']) {
            this.MASTERDATA['IPDMRPETTNB'].ViName = '9. Tình trạng người bệnh ra viện'
            this.MASTERDATA['IPDMRPETTNB'].EnName = '9. Patient status at discharge'
          }
          if (this.routeType === 'Obstetrics' && this.MASTERDATA['IPDMRPETCDD']) {
            this.MASTERDATA['IPDMRPETCDD'].ViName = '8. Các thuốc chính đã dùng'
            this.MASTERDATA['IPDMRPETCDD'].EnName = '8. Used Medication List'
          }
          if (this.routeType === 'Obstetrics' && this.MASTERDATA['IPDMRPEPPDT']) {
            this.MASTERDATA['IPDMRPEPPDT'].ViName = '7. Phương pháp điều trị'
            this.MASTERDATA['IPDMRPEPPDT'].EnName = '7. Treatment method'
          }
          if (this.routeType === 'Pediatric' && this.MASTERDATA['IPDMRPETTKQ']) {
            this.MASTERDATA['IPDMRPETTKQ'].ViName = '2. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán'
            this.MASTERDATA['IPDMRPETTKQ'].EnName = '2. Summary of laboratory tests for diagnosis'
          }
          if (this.routeType === 'Obstetrics' && this.MASTERDATA['IPDMRPETTKQ']) {
            this.MASTERDATA['IPDMRPETTKQ'].ViName = '6. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán'
            this.MASTERDATA['IPDMRPETTKQ'].EnName = '6. Summary of laboratory tests for diagnosis'
          }
          if (this.routeType === 'Obstetrics' && this.MASTERDATA['IPDMRPEQTBL']) {
            this.MASTERDATA['IPDMRPEQTBL'].ViName = '4. Quá trình bệnh lý và diễn biến lâm sàng'
            this.MASTERDATA['IPDMRPEQTBL'].EnName = '4. History of present illness and clinical developements'
          }
          if (this.routeType === 'Pediatric' && this.MASTERDATA['IPDMRPEPPDT']) {
            this.MASTERDATA['IPDMRPEPPDT'].ViName = '3. Phương pháp điều trị'
            this.MASTERDATA['IPDMRPEPPDT'].EnName = '3. Treatment method'
          }
          if (this.MASTERDATA['IPDMRPEKQDT'] && this.routeType === 'Obstetrics') {
            this.MASTERDATA['IPDMRPEKQDT'].Items[4].ViName = '6. Tử vong'
            this.MASTERDATA['IPDMRPEKQDT'].Items[4].EnName = '6. Deceased'
          }
          this.getMenu()
          setTimeout(() => {
            EventBus.$emit('updateGlobalIpdTopbaInfo', this.menu)
            this.loaded = true
            this.SyncDiagnosisAndICD()
            // this.getDiagnosisPart2()
          }, 100)
        })
      }).catch(e => {
        this.nullContent = true
        console.log(e)
        this.loaded = true
        this.DataSubmit = false
        if (e.status === 404) {}
      })
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    // popup canh bao
    confirmPopupBack () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn btn-warning',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    handleCopy () {
      if (this.MASTERDATA['IPDMRPEHDTV'] && !this.MASTERDATA['IPDMRPEHDTV'].Items[0].Value) {
        this.MASTERDATA['IPDMRPEHDTV'].Items[0].Value = this.getNameBoMe()
      }
      if (this.MASTERDATA['IPDMRPEHDTV'] && this.MASTERDATA['IPDMRPEHDTV'].Items[0].Value) {
        if (!this.MASTERDATA['IPDMRPEHDTV'].Items[0].Value.includes(this.getNameBoMe())) {
          this.MASTERDATA['IPDMRPEHDTV'].Items[0].Value = this.MASTERDATA['IPDMRPEHDTV'].Items[0].Value + '\n' + this.getNameBoMe()
        }
      }
    },
    getNameBoMe () {
      let name = ''
      this.DataSubmit.ParrentInfo.find(e => {
        if (e.Code === 'IPDMRPO57' && e.Value) {
          if (name) {
            name += ', '
          }
          name += this.__t('Bố') + ': ' + e.Value
        }
      })
      this.DataSubmit.ParrentInfo.find(e => {
        if (e.Code === 'IPDMRPO63' && e.Value) {
          if (name) {
            name += ', '
          }
          name += this.__t('Mẹ') + ': ' + e.Value
        }
      })
      return name
    },
    handleChange (code) {
      if (code === 'IPDMRPEICDP' && this.MASTERDATA['IPDMRPEICDP']) {
        if (this.MASTERDATA['IPDMRPECDKT'] && !this.MASTERDATA['IPDMRPECDKT'].Items[1].Value) {
          this.MASTERDATA['IPDMRPEICDP'].Items[0].Value = ''
        }
      }
    },
    getTextWarning () {
      return 'CHƯA CÓ BỆNH ÁN ' + this.MedicalRecordFormName + ' - TỔNG KẾT BỆNH ÁN'
    },
    changeDataSync (data) {
      let str = ''
      let row8 = {
        Code: 'MauSacDa',
        ViName: '+ Màu sắc da',
        Order: 9,
        Value: ''
      }
      let row = {
        Code: 'CacCoQuanKhac',
        ViName: 'Các cơ quan khác',
        Order: 10,
        Value: ''
      }
      data.push(row8)
      data.push(row)
      data.sort((a, b) => a.Order - b.Order)
      data.map(m => {
        if (m.Value === 'True') {
          m.Value = true
        }
        if (m.Value === 'False') {
          m.Value = false
        }
        if (m.ViName.includes(':')) {
          m.ViName = m.ViName.replace(':', '')
        }
        if (m.ViName.includes('-')) {
          m.ViName = m.ViName.replace('-', '+')
        }
        if (m.ViName.includes('. ')) {
          m.ViName = m.ViName.split('. ')[1]
        }
        if (m.Code === 'IPDMRPT61') {
          m.Order = 1
        }
        if (m.Code === 'IPDMRPT104') {
          m.Value = ''
          m.Order = 2
          m.ViName = 'Toàn thân'
        }
        if (m.Code === 'IPDMRPT105') {
          if (m.Value === true) {
            m.Value = 'Dị tật bẩm sinh'
          } else {
            m.Value = ''
          }
          m.Order = 3
          m.ViName = '+ Dị tật bẩm sinh/Có hậu môn'
        }

        if (m.Code === 'IPDMRPT106') {
          m.Order = 5
          m.ViName = ''
          if (m.Value === true) {
            data.find(e => {
              if (e.Code === 'IPDMRPT105') {
                if (e.Value) {
                  e.Value += ', '
                }
                e.Value += 'Có hậu môn'
              }
            })
          }
          m.Value = ''
        }

        if (m.Code === 'IPDMRPT108') {
          m.Order = 6
          m.ViName = ''
          if (m.Value) {
            data.find(e => {
              if (e.Code === 'IPDMRPT105') {
                if (e.Value) {
                  e.Value += '. Cụ thể dị tật: '
                }
                e.Value += m.Value
              }
            })
            m.Value = ''
          }
        }
        if (m.Code === 'IPDMRPT111') {
          m.Order = 7
        }
        if (m.Code === 'IPDMRPT113') {
          m.Order = 8
        }
        if ((m.Code === 'IPDMRPT115' && !m.Value) && (m.Code === 'IPDMRPT116' && !m.Value) && (m.Code === 'IPDMRPT117' && !m.Value) && (m.Code === 'IPDMRPT118' && !m.Value) && (m.Code === 'IPDMRPT119' && !m.Value)) {
          data.find(e => {
            if (e.Code === 'MauSacDa') {
              e.Value = ''
            }
          })
        }
        if ((m.Code === 'IPDMRPT115' || m.Code === 'IPDMRPT116' || m.Code === 'IPDMRPT117' || m.Code === 'IPDMRPT118' || m.Code === 'IPDMRPT119') && m.Value) {
          data.find(e => {
            if (e.Code === 'MauSacDa') {
              e.Value = m.ViName
            }
          })
        }
        if (m.Code === 'IPDMRPTHOHAANS') {
          m.Order = 11
        }
        if (m.Code === 'IPDMRPT122') {
          m.Order = 12
          m.ViName = ' ' + m.ViName
        }
        if (m.Code === 'IPDMRPT124') {
          m.Order = 13
          m.ViName = ' ' + m.ViName
        }
        if (m.Code === 'IPDMRPT126') {
          m.Order = 14
        }
        if (m.Code === 'IPDMRPT128') {
          m.Order = 15
        }
        if (m.Code === 'IPDMRPT130') {
          m.Order = 16
          m.ViName = '+ Cơ quan sinh dục ngoài'
        }
        if (m.Code === 'IPDMRPT132') {
          m.Order = 17
        }
        if (m.Code === 'IPDMRPT133') {
          m.Order = 18
        }
        if (m.Code === 'IPDMRPT135') {
          m.Order = 19
          m.ViName = ' + Phản xạ'
        }
        if (m.Code === 'IPDMRPT137') {
          m.Order = 20
          m.ViName = ' ' + m.ViName
        }
        if (m.Code === 'IPDMRPTCXNCANS') {
          m.Order = 21
        }
        if (m.Code === 'IPDMRPTTTBAANS') {
          m.Order = 22
        }
        if (m.Code === 'IPDMRPT139') {
          m.Order = 23
        }
      })
      data.sort((a, b) => a.Order - b.Order)
      data.forEach(e => {
        if (e.Order < 24) {
          str += (e.ViName ? e.ViName + ': ' : '') + (e.Value !== true ? e.Value : '')
          if (e.Order !== 3 && e.Order !== 5) {
            str += '\n'
          }
        }
      })
      return str
    },
    getMaForm (typeForm) {
      let maForm = ''
      if (typeForm === 'BMTIMMACH') {
        return ''
      }
      maForm = typeForm
      return maForm
    },
    getMenu () {
      if (this.routeType && this.routeType === 'Obstetrics') {
        const arr = [
          {
            index: '1 ',
            label: 'Đặc điểm trẻ sơ sinh',
            blockId: '#MedicalRecord-part3-block11'
          },
          {
            index: '2 ',
            label: 'Đặc điểm sổ rau',
            blockId: '#MedicalRecord-part3-block2'
          },
          {
            index: '3 ',
            label: 'Tình trạng sản phụ sau đẻ',
            blockId: '#MedicalRecord-part3-block3'
          },
          {
            index: '4 ',
            label: 'Quá trình bệnh lý và diễn biến lâm sàng',
            blockId: '#MedicalRecord-part3-block4'
          },
          {
            index: '5 ',
            label: 'Tình hình phẫu thuật (nếu có)',
            blockId: '#MedicalRecord-part3-block5'
          },
          {
            index: '6 ',
            label: 'Kết quả cận lâm sàng',
            blockId: '#MedicalRecord-part3-block6'
          },
          {
            index: '7 ',
            label: 'Phương pháp điều trị',
            blockId: '#MedicalRecord-part3-block7'
          },
          {
            index: '8 ',
            label: 'Các thuốc chính đã dùng',
            blockId: '#MedicalRecord-part3-block8'
          },
          {
            index: '9 ',
            label: 'Tình trạng người bệnh ra viện',
            blockId: '#MedicalRecord-part3-block9'
          },
          {
            index: '10 ',
            label: 'Hướng điều trị và các chế độ tiếp theo',
            blockId: '#MedicalRecord-part3-block10'
          }
        ]
        this.menu = arr
      }
      if (this.routeType && (this.routeType === 'Gynecological' || this.routeType === 'A01_195_050919_V' || this.routeType === 'A01_039_050919_V' || this.routeType === 'A01_040_050919_V')) {
        const arr = [
          {
            index: '1',
            label: 'Quá trình bệnh lý và diễn biến lâm sàng ',
            blockId: '#MedicalRecord-part3-block1'
          },
          {
            index: '2',
            label: 'Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán ',
            blockId: '#MedicalRecord-part3-block6'
          },
          {
            index: '3',
            label: 'Phương pháp điều trị ',
            blockId: '#MedicalRecord-part3-block7'
          },
          {
            index: '4',
            label: 'Các thuốc chính đã dùng ',
            blockId: '#MedicalRecord-part3-block8'
          },
          {
            index: '5',
            label: 'Tình trạng người bệnh ra viện ',
            blockId: '#MedicalRecord-part3-block9'
          },
          {
            index: '6',
            label: 'Hướng điều trị và các chế độ tiếp theo ',
            blockId: '#MedicalRecord-part3-block10'
          }
        ]
        this.menu = arr
      }
      if (this.routeType && this.routeType === 'Eye') {
        this.menu = [
          {
            index: '1 ',
            label: 'Quá trình bệnh lý và diễn biến lâm sàng',
            blockId: '#MedicalRecord-part3-block1'
          },
          {
            index: '2 ',
            label: 'Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán',
            blockId: '#MedicalRecord-part3-block6'
          },
          {
            index: '3 ',
            label: 'Chẩn đoán bệnh chính',
            blockId: '#MedicalRecordEye-part3-block3'
          },
          {
            index: '4 ',
            label: 'Quá trình điều trị',
            blockId: '#MedicalRecordEye-part3-block4'
          },
          {
            index: '5 ',
            label: 'Phương pháp điều trị',
            blockId: '#MedicalRecord-part3-block7'
          },
          {
            index: '6 ',
            label: 'Các thuốc chính đã dùng',
            blockId: '#MedicalRecord-part3-block8'
          },
          {
            index: '7 ',
            label: 'Tình trạng người bệnh ra viện',
            blockId: '#MedicalRecord-part3-block9'
          }
        ]
      }
      if (this.routeType && this.routeType === 'CardiovascularForm') {
        this.menu = [
          {
            index: '1 ',
            label: 'Quá trình bệnh lý và diễn biến lâm sàng',
            blockId: '#MedicalRecord-part3-block1'
          },
          {
            index: '2 ',
            label: 'Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán',
            blockId: '#MedicalRecord-part3-block6'
          },
          {
            index: '3 ',
            label: 'Phương pháp điều trị',
            blockId: '#MedicalRecord-part3-block12'
          },
          {
            index: '4 ',
            label: 'Các thuốc chính đã dùng',
            blockId: '#MedicalRecord-part3-block8'
          },
          {
            index: '5 ',
            label: 'Tình trạng người bệnh ra viện',
            blockId: '#MedicalRecord-part3-block9'
          },
          {
            index: '6 ',
            label: 'Các đánh giá được thực hiện hàng ngày đối với bệnh nhân suy tim',
            blockId: '#MedicalRecord-part3-block13'
          },
          {
            index: '7',
            label: 'Hướng điều trị và các chế độ tiếp theo ',
            blockId: '#MedicalRecord-part3-block10'
          }
        ]
      }
    },
    confirmPopupObstetrics3 () {
      this.$modal.show('PopupCreateSoSinh')
    },
    handleCreate (child) {
      console.log('IPDMRPE926: ', this.MASTERDATA['IPDMRPE926'])
      if (this.MASTERDATA['IPDMRPE926']) {
        if (!this.MASTERDATA['IPDMRPE926'].Items[0].Value) {
          this.MASTERDATA['IPDMRPE926'].Items[0].Value = []
        }
        if (Array.isArray(this.MASTERDATA['IPDMRPE926'].Items[0].Value)) {
          this.MASTERDATA['IPDMRPE926'].Items[0].Value.push({Id: child})
        }
        this.ListSoSinh = this.MASTERDATA['IPDMRPE926'].Items[0].Value || []
      }
      this.mapNewData(child)
      this.$refs.Obstetrics3.setFormID(child)
    },
    mapNewData (Id) {
      if (this.MASTERDATA && this.ListSoSinh && this.ListSoSinh.length) {
        this.GroupCodeMasterData.forEach(code => {
          if (this.MASTERDATA[code]) {
            let md = this.cloneObj(this.MASTERDATA[code])
            md.Code = code + '_' + Id
            if (md.Items && md.Items.length) {
              md.Items.forEach(e => {
                if (!e.Code.includes('_') && md.Code.includes(Id)) {
                  e.Code = e.Code + '_' + Id
                }
              })
            }
            this.$set(this.MASTERDATA, md.Code, md)
          }
        })
      }
    }
  }
}
</script>
