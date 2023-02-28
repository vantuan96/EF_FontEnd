<template>
  <div class="main-content" id="di0-page">
    <patient-progress-notes-view :VisitId="this.$route.params.Id" :VisitType="'ED'" />
    <standing-order />
    <h2 class="text-center">{{__t('DI0.danh_gia_ket_thuc')}}</h2>
    <div class="box form-content mb-20">
      <div class="box-body">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label required>{{__t('DI0.thoi_gian_nhap_cap_cuu')}}</label>
              <input readonly class="form-control" v-model="DataSubmit.AdmittedDate"/>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label required>{{__t('DI0.thoi_gian_roi_cap_cuu')}}</label>
              <v-date-picker :allday="'allday'" v-model="DataSubmit.AssessmentAt" class="full-w" :format="vDateTimeFormat"/>
            </div>
          </div>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0RPT']">
          <label>{{__label(MASTERDATA['DI0RPT'])}}<button class="btn btn-sync-data" @click="autoLoadDI0DIA()">{{__t('btn.lay_du_lieu_gan_nhat')}}</button></label>
          <div :key="index" v-for="(item,index) in MASTERDATA['DI0RPT'].Items">
            <div v-if="item.IsReadOnly">
              <diorpt :dataJson="item.Value" v-model="item.Value" @copy="copyToDI0RPT" />
              <p v-if="autoLoadDI0DIAAt" class="note-text text-right"><i aria-hidden="true" class="fa fa-check v-green"></i> {{__t('Đồng bộ lần cuối lúc')}}: {{autoLoadDI0DIAAt | formatDateTime('HH:mm:ss DD/MM/YYYY')}}</p>
            </div>
            <textarea-autosize :data="item" :id="item.Code" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" v-else/>
          </div>
        </div>
        <template v-if="!isEHOS()">
        <ProblemList @copy="copyToOPDOENICD"/>
        <br/>
        </template>
        <div class="form-group" v-if="MASTERDATA['DI0DIA'] && VersionApp >= 10" >
          <template v-for="(item,index) in MASTERDATA['DI0DIA'].Items">
            <div class="margin-bottom-10" v-if="item.Code === 'DI0DIAICD'" :key="index">
              <label>{{__t('Mã ICD10 bệnh chính')}}</label>
              <template>
                <icd10 :mdCode="'DI0DIAICD'" v-model="item.Value" :id="item.Code" @icdChange="icdChange"/>
              </template>
            </div>
            <template v-if="item.Code === 'DI0DIAANS'">
              <label :key="index + 'xxx'"  class="full-w">{{__t('Chẩn đoán bệnh chính (Hiển thị trên báo cáo y tế)')}}</label>
              <textarea-autosize :id="item.Code" :data="item" :key="index" class="form-control margin-bottom-10" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
            </template>
            <template v-if="item.Code === 'DI0DIAOPT2'">
              <label :key="index + 'nnn'"  class="full-w">{{__t('Chẩn đoán bệnh kèm theo (nếu có)')}}</label>
              <div :key="index + 'nnnb'" class="group-radio no-flex" v-if="MASTERDATA['DI0Check']">
                <span :data="itemCheck" :key="index1" v-for="(itemCheck, index1) in MASTERDATA['DI0Check'].Items">
                  <input type="checkbox" :id="'DI0Checkradio-' + index1" v-model="itemCheck.Value">
                  <label :for="'DI0Checkradio-' + index1"  @click="checkbox2Radio(MASTERDATA['DI0Check'].Items, itemCheck)">{{__label(itemCheck)}}</label>
                </span>
              </div>
              <textarea-autosize :class="MASTERDATA['DI0Check'].Items[0].Value === true ? 'form-control mt-10' : 'none'" :id="item.Code" :data="item" :key="index" rows="3" :placeholder="__t('Chẩn đoán bệnh kèm theo (nếu có)')" v-model="item.Value"/>
            </template>
            <div class="margin-bottom-10" v-if="item.Code === 'DI0DIAOPT' && MASTERDATA['DI0Check'].Items[0].Value === true" :key="index + 'bbb'">
              <label>{{__t('Mã ICD10 bệnh kèm theo (nếu có)')}}</label>
              <template>
                <icd10 :mdCode="'DI0DIAOPT'" v-model="item.Value" :id="item.Code" @icdChange="icdChange"/>
              </template>
            </div>
          </template>
        </div>
        <div class="form-group" v-else-if="MASTERDATA['DI0DIA'] && VersionApp < 10">
          <template v-for="(item,index) in MASTERDATA['DI0DIA'].Items">
            <template v-if="item.DataType === 'Text'">
              <label :key="index + 'xxx'"  class="full-w">{{__label(item)}}</label>
              <textarea-autosize :id="item.Code" :data="item" :key="index" class="form-control margin-bottom-10" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
            </template>
            <!-- <p class="margin-bottom-10" v-if="item.DataType === 'Text'" :data="item" :key="index">{{item.Value || 'Chưa có dữ liệu trên EHOS'}}</p> -->
            <!-- margin-bottom-10 ở đây là margin-bottom 15 (common css có từ trước) -->
            <div class="margin-bottom-10" v-if="item.DataType === 'ICD10'" :key="index">
              <label>{{__label(item)}}</label>
              <!-- <template v-if="item.IsReadOnly">
                <p v-if="item.Value"><icd10-view v-model="item.Value" /></p>
                <p v-else>{{__t('Chưa có dữ liệu trên EHOS')}}</p>
              </template> -->
              <template>
                <icd10 v-model="item.Value" :id="item.Code"/>
              </template>
            </div>
          </template>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0TAP']">
          <label>{{__label(MASTERDATA['DI0TAP'])}}</label>
          <template  v-for="(item,index) in MASTERDATA['DI0TAP'].Items">
            <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
          </template>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0SM0']">
          <label >{{__label(MASTERDATA['DI0SM0'])}}</label>
          <div :key="index" v-for="(item,index) in MASTERDATA['DI0SM0'].Items">
            <significant-medications v-if="item.IsReadOnly" :data="item.Value" @copy="copyToDI0SM0"/>
            <textarea-autosize :data="item" :id="item.Code" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" v-else/>
            <br />
          </div>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0CS0']">
          <label>{{__label(MASTERDATA['DI0CS0'])}} </label><button class="btn btn-xs btn-flat btn-primary pull-right" @click="loadObservation(MASTERDATA['DI0CS0'].Items)">{{__t('btn.lay_du_lieu_gan_nhat')}}</button>
          <template  v-for="(item,index) in MASTERDATA['DI0CS0'].Items">
            <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
          </template>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0FCP']">
          <label>{{__label(MASTERDATA['DI0FCP'])}}</label>
          <template  v-for="(item,index) in MASTERDATA['DI0FCP'].Items">
            <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
          </template>
        </div>
        <md-input-text :defaultLib="'LOIDAN061021'" :placeholder="__t('Nhập')" v-if="MASTERDATA['DI0DR0']" v-model="MASTERDATA['DI0DR0']"/>
        <div v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'Inter-hospital transfer'" class="transfered-info">
          <div class="form-group" v-if="MASTERDATA['DI0RH0']">
            <label>{{__label(MASTERDATA['DI0RH0'])}}</label>
            <template  v-for="(item,index) in MASTERDATA['DI0RH0'].Items">
              <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
            </template>
          </div>
          <div class="form-group" v-if="MASTERDATA['DI0RFT']">
            <label>{{__label(MASTERDATA['DI0RFT'])}}</label>
            <template  v-for="(item,index) in MASTERDATA['DI0RFT'].Items">
              <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
            </template>
          </div>
          <div class="form-group" v-if="MASTERDATA['DI0NRH']">
            <label>{{__label(MASTERDATA['DI0NRH'])}}</label>
            <template  v-for="(item,index) in MASTERDATA['DI0NRH'].Items">
              <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
            </template>
          </div>
          <div class="form-group" v-if="MASTERDATA['DI0TM0']">
            <label>{{__label(MASTERDATA['DI0TM0'])}}</label>
            <template  v-for="(item,index) in MASTERDATA['DI0TM0'].Items">
              <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
            </template>
          </div>
          <div class="form-group" v-if="MASTERDATA['DI0NAT']">
            <label>{{__label(MASTERDATA['DI0NAT'])}}</label>
            <template  v-for="(item,index) in MASTERDATA['DI0NAT'].Items">
              <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
            </template>
          </div>
        </div>
        <div v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'Admitted'" class="transfered-info">
          <div class="form-group" v-if="MASTERDATA['DI0RFA'] && IsUseHandOverCheckList">
            <label>{{__label(MASTERDATA['DI0RFA'])}}</label>
            <template  v-for="(item,index) in MASTERDATA['DI0RFA'].Items">
              <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
            </template>
          </div>
          <div class="form-group" v-if="MASTERDATA['DI0REC1']">
            <label>{{__label(MASTERDATA['DI0REC1'])}} <i class="unit-label">{{MASTERDATA['DI0REC1'].Note}}</i></label>
            <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['DI0REC1'].Items">
              <v-select-box :id="item.Code" :search="true" class="full-w select-boox-full-w" v-model="item.Value" :items="getMDSPECIALITIESs"/>
            </div>
          </div>
          <div class="bg-gray-2 mt-10" style="display: flex;">
            <input :readonly="IsReadOnLy" type="checkbox" style="display: inline !important; height: 25px; width: 25px; margin-right: 6px;" v-model="IsUseHandOverCheckList">
            <b style="display: contents !important; line-height: 2.5;">{{__t('Sử dụng biên bản bàn giao NB')}}</b>
          </div>
        </div>
        <div v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'Transfer to OPD'" class="transfered-info">
          <div class="form-group" v-if="MASTERDATA['DI0RFT2'] && IsUseHandOverCheckList">
            <label>{{__label(MASTERDATA['DI0RFT2'])}}</label>
            <template  v-for="(item,index) in MASTERDATA['DI0RFT2'].Items">
              <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
            </template>
          </div>
          <div class="form-group" v-if="MASTERDATA['DI0REC2']">
            <label>{{__label(MASTERDATA['DI0REC2'])}} <i class="unit-label">{{MASTERDATA['DI0REC2'].Note}}</i></label>
            <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['DI0REC2'].Items">
              <v-select-box :id="item.Code" :search="true" class="full-w select-boox-full-w" v-model="item.Value" :items="getMDSPECIALITIESs"/>
            </div>
          </div>
          <div class="bg-gray-2 mt-10" style="display: flex;">
            <input :readonly="this.IsReadOnLy" type="checkbox" style="display: inline !important; height: 25px; width: 25px; margin-right: 6px;" v-model="IsUseHandOverCheckList">
            <b style="display: contents !important; line-height: 2.5;">{{__t('Sử dụng biên bản bàn giao NB')}}</b>
          </div>
        </div>
        <div v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'Upstream/Downstream transfer'" class="transfered-info">
          <div class="form-group" v-if="MASTERDATA['DI0RH1']">
            <label>{{__label(MASTERDATA['DI0RH1'])}}</label>
            <template  v-for="(item,index) in MASTERDATA['DI0RH1'].Items">
              <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
            </template>
          </div>
          <div class="form-group" v-if="MASTERDATA['DI0MTU']">
            <label>{{__label(MASTERDATA['DI0MTU'])}}</label>
            <template  v-for="(item,index) in MASTERDATA['DI0MTU'].Items">
              <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
            </template>
          </div>
          <div class="form-group" v-if="MASTERDATA['DI0PS0']">
            <label>{{__label(MASTERDATA['DI0PS0'])}}</label>
            <template  v-for="(item,index) in MASTERDATA['DI0PS0'].Items">
              <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
            </template>
          </div>
          <div class="form-group" v-if="MASTERDATA['DI0RFT1']">
            <label>{{__label(MASTERDATA['DI0RFT1'])}}</label>
            <div class="group-radio" id="DI0RFT1">
              <template :data="item"  v-for="(item,index) in MASTERDATA['DI0RFT1'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'DI0RFT1radio-' + index" v-model="item.Value">
                  <label :for="'DI0RFT1radio-' + index" @click="checkbox2Radio(MASTERDATA['DI0RFT1'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </div>
          <div class="form-group" v-if="MASTERDATA['DI0TM1']">
            <label>{{__label(MASTERDATA['DI0TM1'])}}</label>
            <template  v-for="(item,index) in MASTERDATA['DI0TM1'].Items">
              <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
            </template>
          </div>
          <div class="form-group" v-if="MASTERDATA['DI0NTM']">
            <label>{{__label(MASTERDATA['DI0NTM'])}}</label>
            <template  v-for="(item,index) in MASTERDATA['DI0NTM'].Items">
              <textarea-autosize :data="item" :id="item.Code" :key="index" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value" :readonly="item.IsReadOnly"/>
            </template>
          </div>
          <div class="form-group" v-if="MASTERDATA['DI0TD0']">
            <label>{{__label(MASTERDATA['DI0TD0'])}}</label>
            <template v-for="(item,index) in MASTERDATA['DI0TD0'].Items">
              <v-date-picker :data="item" :key="index" :id="item.Code" v-model="item.Value" class="select-boox" :format="vDateTimeFormat"/>
            </template>
          </div>
        </div>
        <!-- Ra viện -->
        <template v-if="isActiveWithStatus('Discharged') && VersionApp >= 10">
          <div class="box form-content mb-20 transfered-info" id="DI0DT">
            <div class="form-group" v-if="MASTERDATA['DI0DT']">
              <label>{{__label(MASTERDATA['DI0DT'])}}</label>
              <MDRadio :t2="false" @onChange="setDefault()" :indexs="[0]" v-if="MASTERDATA['DI0DT']" v-model="MASTERDATA['DI0DT']"/>
              <hr/>
              <p>{{__t('Ra viện không theo chỉ định ')}}:</p>
              <div class="d-flex flex-center">
                <div style="flex-grow: 1;">
                  <div class="d-flex">
                    <MDRadio :t2="false" @onChange="setDefault()" :indexs="[1]" v-if="MASTERDATA['DI0DT']" v-model="MASTERDATA['DI0DT']"/>
                    <div v-if="MASTERDATA['DI0Reason'] && MASTERDATA['DI0DT'].Items[1].Value" class="d-flex" style="flex-grow: 1;">
                      <span id ="DI0Reason">
                        <MDRadio v-model="MASTERDATA['DI0Reason']" />
                      </span>
                      <textarea-autosize style="line-height: 27px;"  class="form-control" :placeholder="__t('Nhập')" :code="MASTERDATA['DI0Reason'].Items[3].Code" v-model="MASTERDATA['DI0Reason'].Items[3].Value" v-if="MASTERDATA['DI0Reason'].Items[2].Value === true && MASTERDATA['DI0DT'].Items[1].Value === true"/>
                    </div>
                  </div>
                  <div>
                    <MDRadio :t2="false" @onChange="setDefault()" :indexs="[2]" v-if="MASTERDATA['DI0DT']" v-model="MASTERDATA['DI0DT']"/>
                  </div>
                </div>
              </div>
              <MDRadio :t2="false" @onChange="setDefault()" :indexs="[3]" v-if="MASTERDATA['DI0DT']" v-model="MASTERDATA['DI0DT']"/>
            </div>
          </div>
        </template>
        <!-- <modal name="error-validate-modal" transition="pop-out" height="auto" :scrollable="true" :width="modalWidth">
          <div class="error-msg-box">
            <h4>{{__t('Các thông tin còn thiếu')}}</h4>
            <p>{{__t('Bác sĩ vui lòng nhập thêm thông tin để  hoàn thành')}}</p>
            <ul>
              <li :data="error" :key="index" v-for="(error, index) in errors"><i aria-hidden="true" class="fa fa-times v-red"></i> {{__label(error)}}</li>
            </ul>
          </div>
        </modal> -->
      </div>
    </div>
    <br/>
    <Endoscopy v-if="MASTERDATA['DI0TFEOC']" v-model="MASTERDATA['DI0TFEOC']" :EOCInfo="DataSubmit.EOCInfo"/>
    <div class="box form-content mb-20">
      <div class="form-group" v-if="MASTERDATA['DI0COEM']">
        <label>{{__label(MASTERDATA['DI0COEM'])}} <i class="unit-label">{{MASTERDATA['DI0COEM'].Note}}</i></label>
        <div class="group-radio no-flex" id="DI0COEM">
          <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['DI0COEM'].Items">
            <input type="checkbox" :id="'DI0COEMradio-' + index" v-model="item.Value">
            <label :for="'DI0COEMradio-' + index" @click="checkbox2Radio(MASTERDATA['DI0COEM'].Items, item)">{{__label(item)}}</label>
          </span>
        </div>
      </div>
    </div>
    <br/>
    <div class="box form-content mb-20">
      <div class="form-group" v-if="MASTERDATA['DI0COIN']">
        <label>{{__label(MASTERDATA['DI0COIN'])}} <i class="unit-label">{{MASTERDATA['DI0COIN'].Note}}</i></label>
        <div class="group-radio no-flex" id="DI0COIN">
          <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['DI0COIN'].Items">
            <input type="checkbox" :id="'DI0COINradio-' + index" v-model="item.Value">
            <label :for="'DI0COINradio-' + index" @click="checkbox2Radio(MASTERDATA['DI0COIN'].Items, item)">{{__label(item)}}</label>
          </span>
        </div>
      </div>
    </div>
    <br/>
    <FloatBlock>
      <template slot='top'>
        <TranferMsg :data="DataSubmit.visit_transfer" />
        <div class="group-radio" :class="{'readonly': DataSubmit.visit_transfer, 'only-wr': onlyWr}" v-if="DataSubmit.ListStatus">
          <template  v-for="(status, index) in DataSubmit.ListStatus">
            <input :data="status" :key="index" type="radio" :id="'a' + index" name="status" :value="status" v-model="DataSubmit.Status">
            <label :class="'status-' + status.Code" :id="'status-' + status.Id" :key="'a' + index" :for="'a' + index">{{__label(status)}}</label>
          </template>
        </div>
      </template>
      <template slot='buttons'>
        <div class="col-md-6 col-sm-6">
          <div class="form-group"></div>
        </div>
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <button class="btn v-yellow-btn pull-right long-btn hvr-ripple-out btn-block" v-shortkey="['ctrl', 's']" @shortkey="confirmSubmit()" type="button" @click="confirmSubmit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
    <logs :EdId="this.$route.params.Id" :Type="'DischargeInformation'"/>
    <div class="mg-bt-120"></div>
  </div>
</template>
<script>
/* ============
 * DI0 Page vi sao đặt tên là DI0 hỏi dungnv53
 * ============
 *
 * The home index page.
 */

import MixinMasterData from '@/mixins/masterdata.js'
import VDatePicker from '@/components/VDateTimePicker.vue'
import TranferMsg from '@/components/TranferMsg.vue'
import Diorpt from '@/components/OPD/DI0RPT.vue'
import DiorptOh from '@/components/ED/DI0RPT.vue'
import SignificantMedications from '@/components/ED/SignificantMedications.vue'
import DischargeInformation from '@/services/ED/DischargeInformation'
import ObservationChart from '@/services/ObservationChart'
import _ from 'lodash'
import NProgress from 'nprogress'
import moment from 'moment'
import PatientProgressNotesView from '@/pages/ProgressNote/PatientProgressNotesView.vue'
import MixinForm from '@/mixins/form.js'
import Logs from '@/components/Logs.vue'
import ProblemList from '@/components/ProblemList.vue'
import VSelectBox from '@/components/VSelect.vue'
import StandingOrder from '@/components/OPD/StandingOrder.vue'
import EventBus from '@/lib/eventBus'
import $ from 'jquery'
import Endoscopy from '@/components/Endoscopy.vue'

const MODAL_WIDTH = 750
export default {
  /**
   * The name of the page.
   */
  name: 'DischargeInformation',
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      errors: [],
      DataSubmit: {
        Datas: []
      },
      checkMessage: 0,
      datacollection: null,
      dateTest: null,
      options: [],
      pId: null,
      message: null,
      isErrorPop: false,
      isFirst: true,
      submiting: false,
      syncIcdInterval: null,
      autoLoadDI0DIAAt: null,
      DI0RPTTimeout: null,
      oldStatus: null,
      IsUseHandOverCheckList: true,
      IsAcceptPhysician: false,
      IsAcceptNurse: false,
      IsReadOnLy: false,
      VersionApp: null
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VDatePicker,
    Diorpt,
    DiorptOh,
    PatientProgressNotesView,
    Logs,
    SignificantMedications,
    VSelectBox,
    StandingOrder,
    TranferMsg,
    ProblemList,
    Endoscopy
  },
  watch: {
    // MASTERDATA: {
    //   handler () {
    //     console.log(this.MASTERDATA['DI0Check'], this.MASTERDATA['DI0Check'].Items[1].Value, ' join here')
    //     if (this.MASTERDATA['DI0Check'].Items[1].Value === true) {
    //       console.log('join this case')
    //       this.MASTERDATA['DI0DIA'].Items[2].Value = ''
    //       this.MASTERDATA['DI0DIA'].Items[3].Value = ''
    //     }
    //   },
    //   deep: true
    // },
    DataSubmit: {
      handler () {
        this.edited = true
      },
      deep: true
    },
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
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.getSpecialities()
    this.loadDoctorRecommenWithIcd10()
    this.getMasterDatas({Form: 'DI0'}, () => {
      this.getData()
    })
    EventBus.$on('ICDUPDATED', this.updateIcd)
  },
  computed: {
    onlyWr () {
      return this.MASTERDATA['DI0TFEOC'] && this.MASTERDATA['DI0TFEOC'].Items.find(e => e.Value) && !this.DataSubmit.EOCInfo.IsDone
    },
    getMDSPECIALITIESs: function () {
      var status = ''
      if (this.DataSubmit.Status) {
        status = this.DataSubmit.Status.EnName === 'Admitted' ? 'IPD' : 'OPD'
      }
      return (this.getSpecialitiesInCurrentSite() || []).filter(e => {
        return e.VisitTypeGroup === status
      })
    }
  },
  methods: {
    clearData () {
      if (this.MASTERDATA['DI0Check'].Items[1].Value && this.VersionApp >= 10) {
        this.MASTERDATA['DI0DIA'].Items[2].Value = ''
        this.MASTERDATA['DI0DIA'].Items[3].Value = ''
      }
      if (!this.MASTERDATA['DI0Check'].Items[1].Value && !this.MASTERDATA['DI0Check'].Items[0].Value && this.VersionApp >= 10) {
        this.MASTERDATA['DI0DIA'].Items[2].Value = ''
        this.MASTERDATA['DI0DIA'].Items[3].Value = ''
      }
    },
    icdChange (value, code) {
      var val = (value || []).map(e => e.ViName)
      switch (code) {
        case 'DI0DIAICD':
          var currentValueDI0DIAICD = this.MASTERDATA['DI0DIA'].Items[1].Value || ''
          this.MASTERDATA['DI0DIA'].Items[1].Value = ([currentValueDI0DIAICD].concat(val.filter(e => !currentValueDI0DIAICD.includes(e)))).filter(e => e).join(', ')
          break
        case 'DI0DIAOPT':
          var currentValueDI0DIAOPT = this.MASTERDATA['DI0DIA'].Items[3].Value || ''
          this.MASTERDATA['DI0DIA'].Items[3].Value = ([currentValueDI0DIAOPT].concat(val.filter(e => !currentValueDI0DIAOPT.includes(e)))).filter(e => e).join(', ')
          break
        // case 'DI0DIAICDNEW':
        //   var currentValueDI0DIAICDNEW = this.MASTERDATA['DI0DIANEW'].Items[1].Value || ''
        //   this.MASTERDATA['DI0DIANEW'].Items[1].Value = ([currentValueDI0DIAICDNEW].concat(val.filter(e => !currentValueDI0DIAICDNEW.includes(e)))).filter(e => e).join(', ')
        //   break
        // case 'DI0DIAOPTNEW':
        //   var currentValueDI0DIAOPTNEW = this.MASTERDATA['DI0DIANEW'].Items[3].Value || ''
        //   this.MASTERDATA['DI0DIANEW'].Items[3].Value = ([currentValueDI0DIAOPTNEW].concat(val.filter(e => !currentValueDI0DIAOPTNEW.includes(e)))).filter(e => e).join(', ')
        //   break
      }
    },
    setDefault () {
      if (!this.MASTERDATA['DI0DT'].Items[1].Value) {
        this.MASTERDATA['DI0Reason'].Items.forEach(e => {
          e.Value = null
        })
      }
    },
    isActiveWithStatus (type) {
      return this.DataSubmit.Status && this.DataSubmit.Status.EnName === type
    },
    pushRoute () {
      this.$router.push({name: 'CustomerInfo', params: {Id: this.$route.params.Id, Check: true}})
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
              // this.pushRoute()
              this.$modal.hide('dialog')
              if (message === 'Vui lòng đồng bộ PID của NB!') {
                this.checkMessage = 1
              } else if (message === 'Vui lòng đồng bộ lượt tiếp nhận của NB!') {
                this.checkMessage = 2
              } else {
                this.checkMessage = 3
              }
              this.$router.push({
                name: 'CustomerInfo',
                params: {Id: this.$route.params.Id, Check: this.checkMessage}
              })
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
    confirmSubmit () {
      if (this.oldStatus !== this.DataSubmit.Status && this.DataSubmit.Status.EnName === 'No examination') {
        this.$modal.show('dialog', {
          title: this.$t('Bạn có chắc chắn đây là bệnh nhân không sử dụng dịch vụ khám/chữa bệnh'),
          text: this.$t('Chú ý: Mọi thông tin trên form sẽ bị xóa.'),
          class: 'v-dialog v-dialog-warning',
          width: 900,
          buttons: [
            {
              title: this.$t('Đồng ý '),
              class: 'btn bg-yellow',
              handler: () => {
                this.$modal.hide('dialog')
                this.resetMdDataValue()
                this.submit()
              }
            },
            {
              title: this.$t('Hủy bỏ'),
              class: 'btn',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
        })
      } else {
        this.validateForm()
        this.submit()
      }
    },
    updateIcd (value) {
      var icdSelected = value.map(e => this.DoctorRecommendations[e.code]).filter(e => e)
      this.copyOPDOENRFU(icdSelected)
    },
    copyOPDOENRFU (selectedValue) {
      if (!selectedValue) return
      var input = this.MASTERDATA['DI0DR0'].Items[0].Value
      var inputValue = input ? input.split('\n') : []
      selectedValue.forEach(e => {
        if (!inputValue.includes(e)) input = (input || '') + '\n' + e
      })
      this.MASTERDATA['DI0DR0'].Items[0].Value = input
    },
    validateForm () {
      var error = []
      // Validate khám chuyên khoa
      // Ra viện
      // if (this.isActiveWithStatus('Discharged') && !this.MASTERDATA['DI0RPT'].Items[1].Value) {
      //   error.push(this.MASTERDATA['DI0RPT'].Items[1])
      // }
      // if (this.isActiveWithStatus('Discharged') && this.MASTERDATA['DI0DIA'].Items[0].Value.length === 0 && this.VersionApp < 10) {
      //   error.push(this.MASTERDATA['DI0DIA'].Items[0])
      // }
      // if (this.isActiveWithStatus('Discharged') && !this.MASTERDATA['DI0DIA'].Items[1].Value && this.VersionApp < 10) {
      //   error.push(this.MASTERDATA['DI0DIA'].Items[1])
      // }
      // if (this.isActiveWithStatus('Discharged') && this.MASTERDATA['DI0DIANEW'].Items[0].Value.length === 0 && this.VersionApp >= 10) {
      //   error.push(this.MASTERDATA['DI0DIANEW'].Items[0])
      // }
      // if (this.isActiveWithStatus('Discharged') && !this.MASTERDATA['DI0DIANEW'].Items[1].Value && this.VersionApp >= 10) {
      //   error.push(this.MASTERDATA['DI0DIANEW'].Items[1])
      // }
      // if (this.isActiveWithStatus('Discharged') && !this.MASTERDATA['DI0TAP'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0TAP'].Items[0])
      // }
      // if (this.isActiveWithStatus('Discharged') && !this.MASTERDATA['DI0SM0'].Items[1].Value) {
      //   error.push(this.MASTERDATA['DI0SM0'].Items[1])
      // }
      // if (this.isActiveWithStatus('Discharged') && !this.MASTERDATA['DI0CS0'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0CS0'].Items[0])
      // }
      // if (this.isActiveWithStatus('Discharged') && !this.MASTERDATA['DI0FCP'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0FCP'].Items[0])
      // }
      // if (this.isActiveWithStatus('Discharged') && !this.MASTERDATA['DI0DR0'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0DR0'].Items[0])
      // }
      // var Discharge = [
      //   this.MASTERDATA['DI0DT'].Items[0].Value,
      //   this.MASTERDATA['DI0DT'].Items[1].Value,
      //   this.MASTERDATA['DI0DT'].Items[2].Value,
      //   this.MASTERDATA['DI0DT'].Items[3].Value
      // ]
      // if (Discharge.filter(e => e).length < 1 && this.isActiveWithStatus('Discharged') && this.VersionApp >= 10) {
      //   error.push(this.MASTERDATA['DI0DT'])
      // }
      // var DischargeReason = [
      //   this.MASTERDATA['DI0Reason'].Items[0].Value,
      //   this.MASTERDATA['DI0Reason'].Items[1].Value,
      //   this.MASTERDATA['DI0Reason'].Items[2].Value
      // ]
      // if (DischargeReason.filter(e => e).length < 1 && this.MASTERDATA['DI0DT'].Items[1].Value && this.isActiveWithStatus('Discharged') && this.VersionApp >= 10) {
      //   error.push(this.MASTERDATA['DI0Reason'])
      // }
      // if (this.isActiveWithStatus('Discharged') && !this.MASTERDATA['DI0Reason'].Items[3].Value && this.MASTERDATA['DI0Reason'].Items[2].Value && this.VersionApp >= 10) {
      //   error.push(this.MASTERDATA['DI0Reason'].Items[3])
      // }
      // if (this.isActiveWithStatus('Discharged') && !this.MASTERDATA['DI0COEM'].Items[0].Value && !this.MASTERDATA['DI0COEM'].Items[1].Value) {
      //   error.push(this.MASTERDATA['DI0COEM'])
      // }
      // if (this.isActiveWithStatus('Discharged') && !this.MASTERDATA['DI0COIN'].Items[0].Value && !this.MASTERDATA['DI0COIN'].Items[1].Value) {
      //   error.push(this.MASTERDATA['DI0COIN'])
      // }
      // Nhập nội trú
      // if (this.isActiveWithStatus('Admitted') && !this.MASTERDATA['DI0RPT'].Items[1].Value) {
      //   error.push(this.MASTERDATA['DI0RPT'].Items[1])
      // }
      // if (this.isActiveWithStatus('Admitted') && !this.MASTERDATA['DI0DIA'].Items[0].Value.length === 0 && this.VersionApp < 10) {
      //   error.push(this.MASTERDATA['DI0DIA'].Items[0])
      // }
      // if (this.isActiveWithStatus('Admitted') && !this.MASTERDATA['DI0DIA'].Items[1].Value && this.VersionApp < 10) {
      //   error.push(this.MASTERDATA['DI0DIA'].Items[1])
      // }
      // if (this.isActiveWithStatus('Admitted') && !this.MASTERDATA['DI0DIANEW'].Items[0].Value.length === 0 && this.VersionApp >= 10) {
      //   error.push(this.MASTERDATA['DI0DIANEW'].Items[0])
      // }
      // if (this.isActiveWithStatus('Admitted') && !this.MASTERDATA['DI0DIANEW'].Items[1].Value && this.VersionApp >= 10) {
      //   error.push(this.MASTERDATA['DI0DIANEW'].Items[1])
      // }
      // if (this.isActiveWithStatus('Admitted') && !this.MASTERDATA['DI0TAP'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0TAP'].Items[0])
      // }
      // if (this.isActiveWithStatus('Admitted') && !this.MASTERDATA['DI0SM0'].Items[1].Value) {
      //   error.push(this.MASTERDATA['DI0SM0'].Items[1])
      // }
      // if (this.isActiveWithStatus('Admitted') && !this.MASTERDATA['DI0CS0'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0CS0'].Items[0])
      // }
      // if (this.isActiveWithStatus('Admitted') && !this.MASTERDATA['DI0FCP'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0FCP'].Items[0])
      // }
      // if (this.isActiveWithStatus('Admitted') && !this.MASTERDATA['DI0DR0'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0DR0'].Items[0])
      // }
      // if (this.DataSubmit.Status.EnName === 'Admitted' && !this.MASTERDATA['DI0REC1'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0REC1'].Items[0])
      // }
      // if (this.isActiveWithStatus('Admitted') && !this.MASTERDATA['DI0RFA'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0RFA'].Items[0])
      // }
      // if (this.isActiveWithStatus('Admitted') && !this.MASTERDATA['DI0COEM'].Items[0].Value && !this.MASTERDATA['DI0COEM'].Items[1].Value) {
      //   error.push(this.MASTERDATA['DI0COEM'])
      // }
      // if (this.isActiveWithStatus('Admitted') && !this.MASTERDATA['DI0COIN'].Items[0].Value && !this.MASTERDATA['DI0COIN'].Items[1].Value) {
      //   error.push(this.MASTERDATA['DI0COIN'])
      // }
      // Nhập ngoại trú
      // if (this.isActiveWithStatus('Transfer to OPD') && !this.MASTERDATA['DI0RPT'].Items[1].Value) {
      //   error.push(this.MASTERDATA['DI0RPT'].Items[1])
      // }
      // if (this.isActiveWithStatus('Transfer to OPD') && !this.MASTERDATA['DI0DIA'].Items[0].Value.length === 0 && this.VersionApp < 10) {
      //   error.push(this.MASTERDATA['DI0DIA'].Items[0])
      // }
      // if (this.isActiveWithStatus('Transfer to OPD') && !this.MASTERDATA['DI0DIA'].Items[1].Value && this.VersionApp < 10) {
      //   error.push(this.MASTERDATA['DI0DIA'].Items[1])
      // }
      // if (this.isActiveWithStatus('Transfer to OPD') && !this.MASTERDATA['DI0DIANEW'].Items[0].Value.length === 0 && this.VersionApp >= 10) {
      //   error.push(this.MASTERDATA['DI0DIANEW'].Items[0])
      // }
      // if (this.isActiveWithStatus('Transfer to OPD') && !this.MASTERDATA['DI0DIANEW'].Items[1].Value && this.VersionApp >= 10) {
      //   error.push(this.MASTERDATA['DI0DIANEW'].Items[1])
      // }
      // if (this.isActiveWithStatus('Transfer to OPD') && !this.MASTERDATA['DI0TAP'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0TAP'].Items[0])
      // }
      // if (this.isActiveWithStatus('Transfer to OPD') && !this.MASTERDATA['DI0SM0'].Items[1].Value) {
      //   error.push(this.MASTERDATA['DI0SM0'].Items[1])
      // }
      // if (this.isActiveWithStatus('Transfer to OPD') && !this.MASTERDATA['DI0CS0'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0CS0'].Items[0])
      // }
      // if (this.isActiveWithStatus('Transfer to OPD') && !this.MASTERDATA['DI0FCP'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0FCP'].Items[0])
      // }
      // if (this.isActiveWithStatus('Transfer to OPD') && !this.MASTERDATA['DI0DR0'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0DR0'].Items[0])
      // }
      // if (this.DataSubmit.Status.EnName === 'Transfer to OPD' && !this.MASTERDATA['DI0REC2'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0REC2'].Items[0])
      // }
      // if (this.DataSubmit.Status.EnName === 'Transfer to OPD' && !this.MASTERDATA['DI0RFT2'].Items[0].Value) {
      //   error.push(this.MASTERDATA['DI0RFT2'].Items[0])
      // }
      // if (this.isActiveWithStatus('Transfer to OPD') && !this.MASTERDATA['DI0COEM'].Items[0].Value && !this.MASTERDATA['DI0COEM'].Items[1].Value) {
      //   error.push(this.MASTERDATA['DI0COEM'])
      // }
      // if (this.isActiveWithStatus('Transfer to OPD') && !this.MASTERDATA['DI0COIN'].Items[0].Value && !this.MASTERDATA['DI0COIN'].Items[1].Value) {
      //   error.push(this.MASTERDATA['DI0COIN'])
      // }
      this.errors = error
      if (this.errors.length) {
        // this.$modal.show('error-validate-modal')
        this.handlerResponse({Error: this.errors})
        throw new Error('validate form')
      }
    },
    submit () {
      // this.validateForm()
      $('.error').removeClass('error')
      NProgress.start()
      this.DataSubmit.Datas = []
      this.DataSubmit._Exception = []
      var obj = {}
      this.clearData()
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (item.DataType === 'ICD10') {
              val = item.Value ? JSON.stringify(item.Value) : ''
              val = val.replace('[]', '')
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val
            })
            obj[item.Code] = item.Value
          })
        }
      }
      var DataSubmit = Object.assign({}, this.DataSubmit)
      if (typeof DataSubmit.AssessmentAt === 'object') {
        DataSubmit.AssessmentAt = moment(DataSubmit.AssessmentAt).format(this.vDateTimeFormat)
      }
      //  && this.DataSubmit.Status.EnName === 'Transfer to OPD'
      if (obj['DI0REC2ANS']) {
        var objDI0REC2ANS = this.MDSPECIALITIES.find(e => e.Id === obj['DI0REC2ANS'])
        DataSubmit._Exception.push({
          key: 'DI0REC2ANS',
          value: objDI0REC2ANS ? objDI0REC2ANS.ViName : 'N/A'
        })
      }
      //  && this.DataSubmit.Status.EnName === 'Admitted'
      if (obj['DI0REC1ANS']) {
        var objDI0REC1ANS = this.MDSPECIALITIES.find(e => e.Id === obj['DI0REC1ANS'])
        DataSubmit._Exception.push({
          key: 'DI0REC1ANS',
          value: objDI0REC1ANS ? objDI0REC1ANS.ViName : 'N/A'
        })
      }
      if (DataSubmit.AssessmentAt) {
        DataSubmit._Exception.push({
          key: 'AssessmentAt',
          value: DataSubmit.AssessmentAt
        })
      }
      this.submiting = true
      DataSubmit.IsUseHandOverCheckList = this.IsUseHandOverCheckList
      setTimeout(() => {
        this.DataSubmit.Room = {}
        new DischargeInformation().update(this.$route.params.Id, DataSubmit).then(async response => {
          await this.handlerResponse(response)
          // this.$router.push({name: 'etr', params: {Id: response.Id}})
          this.toastedSuccess()
          this.oldStatus = DataSubmit.Status
          this.submiting = false
          this.edited = false
          if (response.IsChronic) {
            EventBus.$emit('updateGlobalEd', 'thangdc in here')
            this.$modal.show('dialog', {
              title: 'Cảnh báo!',
              text: 'Đây là ca bệnh ngoại trú phức tạp.',
              class: 'v-dialog v-dialog-warning',
              buttons: [
                {
                  title: 'Đi đến tóm tắt ca bệnh',
                  class: 'btn bg-yellow',
                  handler: () => {
                    this.$modal.hide('dialog')
                    this.$router.push({name: 'EDComplexOutpatientCaseSummary', params: {Id: this.$route.params.Id}})
                  }
                },
                {
                  title: 'Hủy bỏ',
                  class: 'btn',
                  handler: () => {
                    this.$modal.hide('dialog')
                  }
                }
              ]
            })
          }
          await setTimeout(() => {
            this.reload()
          }, 500)
        }).catch(e => {
          if (e.data.IsErorr) {
            this.popUpWarning(e.data.ViMessage)
          }
          this.submiting = false
          // this._401ResponseError(e)
        })
      }, 100)
    },
    loadObservation (data) {
      new ObservationChart({notRedirect: true, VisitType: 'ED'}).find(this.$route.params.Id).then(response => {
        var val = response.Datas[response.Datas.length - 1]
        if (val) {
          data[0].Value = this.trim(data[0].Value + `, Huyết áp ${val.SysBP}/${val.DiaBP} mmHg, Mạch ${val.Pulse} lần/phút, Nhiệt độ: ${val.Temperature} độ C, Nhịp thở: ${val.Resp} lần/phút, Spo2: ${val.SpO2}%, Đau: ${val.RestPainScore}, Moving: ${val.MovePainScore}`, ', ')
        }
      })
    },
    loadDI0SM0 () {
      new DischargeInformation().create({Id: this.$route.params.Id}, 'SyncReadOnlySignificantMedications').then(response => {
        var val = response
        if (val) {
          this.MASTERDATA['DI0SM0'].Items[0].Value = JSON.stringify(val)
        }
      }).catch(e => {
        this.MASTERDATA['DI0SM0'].Items[0].Value = ''
      })
    },
    mapCDHAStr (oldstr, newstr, type) {
      newstr = '- ' + newstr
      if (type === 1) {
        if (this.hasCDHA(oldstr)) {
          oldstr = oldstr.replace('Kết quả chẩn đoán hình ảnh:', `Kết quả chẩn đoán hình ảnh:\n${newstr}`)
        } else {
          if (this.hasKQXN(oldstr)) {
            oldstr = oldstr + '\nKết quả chẩn đoán hình ảnh:\n' + newstr
          } else {
            oldstr = 'Kết quả chẩn đoán hình ảnh:\n' + newstr + '\n' + oldstr
          }
        }
      }
      if (type === 2) {
        if (this.hasKQXN(oldstr)) {
          oldstr = oldstr.replace('Kết quả xét nghiệm:', `Kết quả xét nghiệm:\n${newstr}`)
        } else {
          oldstr = 'Kết quả xét nghiệm:\n' + newstr + '\n' + oldstr
        }
      }
      this.MASTERDATA['DI0RPT'].Items[1].Value = this.trim_(oldstr, '\n')
    },
    hasKQXN (str) {
      return str.includes('Kết quả xét nghiệm:')
    },
    hasCDHA (str) {
      return str.includes('Kết quả chẩn đoán hình ảnh:')
    },
    copyToDI0RPT (str, type) {
      // if (this.MASTERDATA['DI0RPT'].Items[1].Value.includes(str)) {
      // } else {
      //   this.MASTERDATA['DI0RPT'].Items[1].Value = this.trim(this.MASTERDATA['DI0RPT'].Items[1].Value + ', ' + str, ', ')
      // }
      // this.toastedInfo('Đã copy')
      str = this.trim_(str)
      if (this.MASTERDATA['DI0RPT'].Items[1].Value && this.MASTERDATA['DI0RPT'].Items[1].Value.includes(str)) {
      } else {
        var old = this.MASTERDATA['DI0RPT'].Items[1].Value ? (this.trim_(this.MASTERDATA['DI0RPT'].Items[1].Value)) : ''
        // var old = this.MASTERDATA['DI0RPT'].Items[1].Value ? (this.trim_(this.MASTERDATA['DI0RPT'].Items[1].Value) + ', ') : ''
        if (type) {
          this.mapCDHAStr(old, str, type)
        } else {
          this.MASTERDATA['DI0RPT'].Items[1].Value = this.trim_(old + (str), ', ')
        }
      }
      this.toastedInfo('Đã copy')
    },
    copyToDI0SM0 (str) {
      if (this.MASTERDATA['DI0SM0'].Items[1].Value.includes(str)) {
      } else {
        this.MASTERDATA['DI0SM0'].Items[1].Value = this.trim(this.MASTERDATA['DI0SM0'].Items[1].Value + ', ' + str, ', ')
      }
      this.toastedInfo('Đã copy')
    },
    autoLoadDI0DIA () {
      if (this.MASTERDATA && this.MASTERDATA['DI0RPT']) {
        this.MASTERDATA['DI0RPT'].Items[0].Value = null
        new DischargeInformation({noLoading: true}).create({Id: this.$route.params.Id}, 'SyncReadOnlyResultOfParaclinicalTests').then(response => {
          var val = response
          if (val) {
            this.MASTERDATA['DI0RPT'].Items[0].Value = JSON.stringify(response)
          }
          // this.DI0RPTTimeout = setTimeout(() => {
          //   this.autoLoadDI0DIA()
          // }, 10 * 1000)
          if (!this.autoLoadDI0DIAAt) {
            setTimeout(() => {
              this.edited = false
            }, 150)
          }
          this.autoLoadDI0DIAAt = new Date()
        }).catch(e => {
          // data[0].Value = ''
          this.edited = false
        })
      }
    },
    getData () {
      new DischargeInformation().find(this.$route.params.Id).then(response => {
        if (response.IsCovidSpecialty) {
          if (response.Status && response.Status.EnName === 'In hospital') {
            response.Status.ViName = 'Đang theo dõi'
          }
          response.ListStatus = response.ListStatus.map(e => {
            if (e.EnName === 'In hospital') e.ViName = 'Đang theo dõi'
            return e
          })
        }
        this.VersionApp = response.VersionApp
        this.DataSubmit = response
        this.IsAcceptPhysician = response.IsAcceptPhysician
        this.IsAcceptNurse = response.IsAcceptNurse
        if (this.IsAcceptPhysician || this.IsAcceptNurse) {
          this.IsReadOnLy = true
        }
        this.IsUseHandOverCheckList = response.IsUseHandOverCheckList
        if (this.IsUseHandOverCheckList === undefined || this.IsUseHandOverCheckList === null) {
          this.IsUseHandOverCheckList = true
        }
        console.log(this.IsUseHandOverCheckList)
        this.oldStatus = response.Status
        if (!this.DataSubmit.AssessmentAt) {
          this.DataSubmit.AssessmentAt = new Date()
        } else {
          this.DataSubmit.AssessmentAt = moment(this.DataSubmit.AssessmentAt, this.vDateTimeFormat)
        }
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else if (item.DataType === 'ICD10') {
                  var icd = this.JSONParse(exited.Value)
                  item.Value = icd || []
                } else {
                  item.Value = exited.Value
                }
              }
            })
          }
        }
        this.edited = false
        this.syncIcd()
        this.autoLoadDI0DIA()
        this.loadDI0SM0()
      }).catch(e => {
        if (e.status === 400) {
          this._404()
        }
        this.edited = false
      })
    },
    copyToOPDOENICD (data) {
      this.MASTERDATA['DI0DIA'].Items.forEach(item => {
        if (data.Diagnosis && item.Code === 'DI0DIAANS') {
          item.Value = data.Diagnosis
        }
        if (data.PrimaryICD && item.Code === 'DI0DIAICD') {
          item.Value = data.PrimaryICD.filter(e => e.code)
        }
      })
    },
    syncIcd () {
      // return false
      // new DischargeInformation({noLoading: true}).update('SyncDiagnosisAndICD', {Id: this.$route.params.Id}).then(response => {
      //   this.syncIcdInterval = setTimeout(() => {
      //     this.syncIcd()
      //   }, 30 * 1000)
      //   if (response && response.length) {
      //     this.MASTERDATA['DI0DIA'].Items.forEach(item => {
      //       if (item.Code === 'DI0DIAANS' && item.Value) {
      //         item.Value = response[0].Diagnosis
      //       }
      //       if (item.Code === 'DI0DIAICD' && item.Value.length === 0) {
      //         item.Value = response[0].PrimaryICD
      //       }
      //       if (item.Code === 'DI0DIAOPT' && item.Value.length === 0) {
      //         console.log(item.Value)
      //         item.Value = response[0].OptionICD.filter(e => e.code)
      //       }
      //     })
      //   }
      // })
    }
  },
  beforeDestroy () {
    if (this.syncIcdInterval) clearTimeout(this.syncIcdInterval)
    if (this.DI0RPTTimeout) clearTimeout(this.DI0RPTTimeout)
    // console.log('beforeDestroy')
    EventBus.$off('ICDUPDATED')
  }
}
</script>
<style lang="stylus" scoped>
.box1 {
    position: relative;
    border-radius: 3px;
    background: #ffffff;
    width: 100%;
    -webkit-box-shadow: 0 0 0 rgb(0 0 0 / 10%);
    box-shadow: 0 0 0 rgb(0 0 0 / 10%);
}
.box1.box-table1 {
  border-top: 0;
  border: 0px solid #ccc;
  border-radius: 0;
}
.box1.box-table1.error {
  border: 1px solid red;
}
.error {
  border: 1px solid red!important;
}
</style>
