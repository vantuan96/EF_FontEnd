<template>
  <div>
    <div class="form-control" v-if="DataSubmit.IsNew && DataSubmit.IsShowSyncButton"><button class="btn btn-sync-data pull-right" @click="syncData()">{{__t('Lấy dữ liệu đánh giá gần nhất trong vòng 24 giờ')}}</button></div>
    <initial-assessment-form
      v-if="DataSubmit.InitialAssessmentForm"
      v-model="DataSubmit.InitialAssessmentForm"
      :showBtn="!allowEditDoctor"
      :FormType="'ShortTerm'"
      :FormId="DataSubmit.Id"
      ref="InitialAssessmentForm"
      :readonly="IsFormLocked(DataSubmit)"
    />
    <div v-if="(allowEdit || DataDb.length === 0) && !IsFormLocked(DataSubmit)">
      <div class="tbl-title">1. {{__t('Đánh giá chung')}}
        <button v-if="VisitType === 'VMHC'" class="btn btn-sync-data pull-right" @click="showPopupInfo()">{{__t('Đồng bộ từ ViHC')}}</button>
      </div>
      <table class="table v-table-1 no-margin" v-if="!syncing">
        <tr v-if="MASTERDATA['OPDIAFSTOPVS0']">
          <th width="20%">{{__label(MASTERDATA['OPDIAFSTOPVS0'])}}</th>
          <td>
            <div>
              <template v-if="MASTERDATA['OPDIAFSTOPPUL']">
                <div class="vcol150" :data="item" :key="index + 'OPDIAFSTOPPUL'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPPUL'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <input class="form-control" :placeholder="item.Note" type="text" v-model="item.Value">
                </div>
              </template>
              <template v-if="MASTERDATA['OPDIAFSTOPBP0']">
                <div class="vcol150" :data="item" :key="index + 'OPDIAFSTOPBP0'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPBP0'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <input class="form-control" :placeholder="item.Note" type="text" v-model="item.Value">
                </div>
              </template>
              <template v-if="MASTERDATA['OPDIAFSTOPTEM']">
                <div class="vcol150" :data="item" :key="index + 'OPDIAFSTOPTEM'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPTEM'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <input class="form-control" :placeholder="item.Note" type="text" v-model="item.Value">
                </div>
              </template>
              <template v-if="MASTERDATA['OPDIAFSTOPSPO']">
                <div class="vcol150" :data="item" :key="index + 'OPDIAFSTOPSPO'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPSPO'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <input class="form-control" :placeholder="item.Note" type="text" v-model="item.Value">
                </div>
              </template>
              <template v-if="MASTERDATA['OPDIAFSTOPRR0']">
                <div class="vcol150" :data="item" :key="index + 'OPDIAFSTOPRR0'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPRR0'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <input class="form-control" :placeholder="item.Note" type="text" v-model="item.Value">
                </div>
              </template>
              <template v-if="MASTERDATA['OPDIAFSTOPHEI']">
                <div class="vcol150" :data="item" :key="index + 'OPDIAFSTOPHEI'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPHEI'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <number-input class="w-input-150" inline v-model="item.Value" :placeholder="__t('Nhập')"/>
                </div>
              </template>
              <template v-if="MASTERDATA['OPDIAFSTOPWEI']">
                <div class="vcol150" :data="item" :key="index + 'OPDIAFSTOPWEI'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPWEI'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <number-input class="w-input-150" inline v-model="item.Value" :placeholder="__t('Nhập')"/>
                </div>
              </template>
              <div class="vcol150">
                <label>BMI</label>
                <input type="number" class="form-control" readonly :value="bmiCalculation"/>
              </div>
              <height-and-weight v-if="DataSubmit.IsNew" @copy="push2Wh"/>
              <template v-if="MASTERDATA['OPDIAFSTOPWEIPR'] && DataSubmit.IsAnesthesia && $store.state.account.CurrentPatientObj.Gender === 0">
                <div class="vcol150" style="width: 327px;">
                  <label class="no-wrap">{{__label(MASTERDATA['OPDIAFSTOPWEIPR'])}}</label>
                  <div class="d-flex flex-center" style="transform: translate(-7px, -7px);">
                    <MDRadio v-if="MASTERDATA['OPDIAFSTOPWEIPR']" v-model="MASTERDATA['OPDIAFSTOPWEIPR']"/>
                    <MDNumberInput v-if="MASTERDATA['OPDIAFSTOPWEIPR'].Items[2].Value" :code="MASTERDATA['OPDIAFSTOPWEIPR'].Items[0].Code" class="ml-5" :decimal="true" v-model="MASTERDATA['OPDIAFSTOPWEIPR'].Items[0].Value" :placeholder="__t('Nhập')"/>
                  </div>
                </div>
              </template>
              <p style="clear: both;"/>
            </div>
            <div>
              <template v-if="MASTERDATA['OPDIAFSTOPNOT']">
                <div :data="item" :key="index + 'OPDIAFSTOPNOT'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPNOT'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <textarea-autosize class="form-control" v-model="item.Value"/>
                </div>
              </template>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDIAFSTOPALL']" class="highlightedsss">
          <th width="20%">{{__label(MASTERDATA['OPDIAFSTOPALL'])}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFSTOPALL'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input :class="'highlight-yes-radio-' + index" type="checkbox" :id="'OPDIAFSTOPALLradio-' + index" v-model="item.Value">
                  <label :for="'OPDIAFSTOPALLradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFSTOPALL'].Items, item)">{{__label(item)}}</label>
                </span>
                <span :key="index" v-else-if="item.DataType === 'Select'">
                  <allergies-select v-model="item.Value" :multi="true" :items="JSON.parse(item.Data)" v-if="MASTERDATA['OPDIAFSTOPALL'].Items[0].Value"/>
                </span>
                <span :key="index" v-else style="flex-grow: 1;">
                  <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFSTOPALL'].Items[0].Value"/>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDIAFSTOPPAI']">
          <th width="20%">{{__label(MASTERDATA['OPDIAFSTOPPAI'])}}</th>
          <td>
            <div class="group-radio">
              <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDIAFSTOPPAI'].Items">
                <input type="checkbox" :id="'OPDIAFSTOPPAIradio-' + index" v-model="item.Value">
                <label :for="'OPDIAFSTOPPAIradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFSTOPPAI'].Items, item)">{{__label(item)}}</label>
              </span>
            </div>
            <template v-if="MASTERDATA['OPDIAFSTOPPAI'].Items[0].Value">
              <div class="row">
                <template v-if="MASTERDATA['OPDIAFSTOPPS0']">
                  <div class="col-md-3">
                    <label>{{__label(MASTERDATA['OPDIAFSTOPPS0'])}}</label>
                    <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'OPDIAFSTOPPS0'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPPS0'].Items">
                  </div>
                </template>
                <template v-if="MASTERDATA['OPDIAFSTOPPL0']">
                  <div class="col-md-3">
                    <label>{{__label(MASTERDATA['OPDIAFSTOPPL0'])}}</label>
                    <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'OPDIAFSTOPPL0'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPPL0'].Items">
                  </div>
                </template>
                <template v-if="MASTERDATA['OPDIAFSTOPPSD']">
                  <div class="col-md-6">
                    <label>{{__label(MASTERDATA['OPDIAFSTOPPSD'])}}</label>
                    <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'OPDIAFSTOPPSD'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPPSD'].Items">
                  </div>
                </template>
              </div>
              <div class="v-row">
                <div class="group-radio">
                  <b class="flex-box-label">Tần suất đau</b>
                  <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFSTOPPF0'].Items">
                    <span :key="index" v-if="item.DataType === 'Radio'">
                      <input type="checkbox" :id="'OPDIAFSTOPPF0radio-' + index" v-model="item.Value">
                      <label :for="'OPDIAFSTOPPF0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFSTOPPF0'].Items, item)">{{__label(item)}}</label>
                    </span>
                    <span :key="index" v-else style="flex-grow: 1;">
                      <textarea-autosize  :placeholder="__label(item)" class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFSTOPPF0'].Items[3].Value"/>
                    </span>
                  </template>
                </div>
              </div>
              <div class="v-row ">
                <div class="group-radio">
                  <template v-if="MASTERDATA['OPDIAFSTOPPC0']">
                    <b>{{__label(MASTERDATA['OPDIAFSTOPPC0'])}}</b>
                    <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'OPDIAFSTOPPC0'" v-for="(item,index) in MASTERDATA['OPDIAFSTOPPC0'].Items">
                  </template>
                </div>
              </div>
              <div class="v-row">
                <template v-if="MASTERDATA['OPDIAFSTOPHPU']">
                  <div class="flex-box">
                    <label class="flex-box-label">{{__label(MASTERDATA['OPDIAFSTOPHPU'])}}</label>
                    <div class="group-radio">
                      <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDIAFSTOPHPU'].Items">
                        <template v-if="checkString(item.DataType, 'Radio')">
                          <input type="checkbox" :id="'OPDIAFSTOPHPUradio-' + index" v-model="item.Value">
                          <label :for="'OPDIAFSTOPHPUradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFSTOPHPU'].Items, item)">{{__label(item)}}</label>
                        </template>
                      </span>
                    </div>
                    <i class="flex-box-label" v-if="MASTERDATA['OPDIAFSTOPHPU'].Items[0].Value">Bác sĩ khai thác thông tin tại phiếu khám ngoại trú</i>
                  </div>
                </template>
              </div>
              <div class="v-row" v-if="MASTERDATA['OPDIAFSTOPHPU'] && MASTERDATA['OPDIAFSTOPHPU'].Items[0].Value">
                <template v-if="MASTERDATA['OPDIAFSTOPPME']">
                  <div class="flex-box">
                    <label class="flex-box-label">{{__label(MASTERDATA['OPDIAFSTOPPME'])}}</label>
                    <div class="group-radio">
                      <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDIAFSTOPPME'].Items">
                        <template v-if="checkString(item.DataType, 'Radio')">
                          <input type="checkbox" :id="'OPDIAFSTOPPMEradio-' + index" v-model="item.Value">
                          <label :for="'OPDIAFSTOPPMEradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFSTOPPME'].Items, item)">{{__label(item)}}</label>
                        </template>
                      </span>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDIAFSTOPPRE']">
          <th width="20%">{{__label(MASTERDATA['OPDIAFSTOPPRE'])}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFSTOPPRE'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDIAFSTOPPREradio-' + index" v-model="item.Value">
                  <label :for="'OPDIAFSTOPPREradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFSTOPPRE'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDIAFSTOPBRE']">
          <th width="20%">{{__label(MASTERDATA['OPDIAFSTOPBRE'])}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFSTOPBRE'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDIAFSTOPBREradio-' + index" v-model="item.Value">
                  <label :for="'OPDIAFSTOPBREradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFSTOPBRE'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <tr v-if="DataSubmit.Version === 1">
          <th width="20%" v-if="MASTERDATA['OPDIAFSTOPCDI']">{{__label(MASTERDATA['OPDIAFSTOPCDI'])}}</th>
          <td v-if="MASTERDATA['OPDIAFSTOPCDI']">
            <table class="no-border">
              <tr>
                <th width="20%">{{__label(MASTERDATA['OPDIAFSTOPAFI'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFSTOPAFI'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFSTOPAFIradio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFSTOPAFIradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['OPDIAFSTOPAFI'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFSTOPAFI'].Items[3].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              <template v-if="MASTERDATA['OPDIAFSTOPAFI'].Items[0].Value">
              <tr>
                <th class="no-border">{{__label(MASTERDATA['OPDIAFSTOPARO'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFSTOPARO'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFSTOPAROradio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFSTOPAROradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['OPDIAFSTOPARO'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFSTOPARO'].Items[3].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="no-border">{{__label(MASTERDATA['OPDIAFSTOPTOC'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFSTOPTOC'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFSTOPTOCradio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFSTOPTOCradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['OPDIAFSTOPTOC'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFSTOPTOC'].Items[3].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="no-border">{{__label(MASTERDATA['OPDIAFSTOPSOB'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFSTOPSOB'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFSTOPSOBradio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFSTOPSOBradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['OPDIAFSTOPSOB'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFSTOPSOB'].Items[3].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="no-border">{{__label(MASTERDATA['OPDIAFSTOPACC'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFSTOPACC'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFSTOPACCradio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFSTOPACCradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['OPDIAFSTOPACC'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFSTOPACC'].Items[3].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="no-border">{{__label(MASTERDATA['OPDIAFSTOPDGL'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFSTOPDGL'].Items">
                      <span :key="index">
                        <input type="checkbox" :id="'OPDIAFSTOPDGLradio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFSTOPDGLradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFSTOPDGL'].Items, item)">{{__label(item)}}</label>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['OPDIAFSTOPDGL'] && MASTERDATA['OPDIAFSTOPDGL'].Items[1].Value">
                <th class="no-border">{{__label(MASTERDATA['OPDIAFSTOPLCL'])}}</th>
                <td>
                  <div class="group-radio">
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFSTOPLCL'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFSTOPLCLradio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFSTOPLCLradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFSTOPLCL'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFSTOPLCL'].Items[3].Value"/>
                      </span>
                    </template>
                  </div>
                </td>
              </tr>
              </template>
            </table>
          </td>
        </tr>
        <tr v-else>
          <th width="20%">{{___t('Câu hỏi sàng lọc')}}</th>
          <td>
            <CommunicableDiseasesScreening v-model="MASTERDATA" :type="'ODST'" :version="DataSubmit.Version"/>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      <div class="tbl-title">1. {{__t('Đánh giá chung')}}</div>
      <InitialAssessmentForShortTerm
        :DataSubmit="DataSubmit"
        :MASTERDATA="MASTERDATA"
        :VisitId="$route.params.Id"
        :hideInitialAssessmentForm="true"
      />
    </div>
    <div class="tbl-title">2. {{__t('Các thuốc đang dùng')}}</div>
    <list-of-current-medications
      v-if="!this.CurrentPatientObj.IsAnesthesia"
      ref="ListOfCurrentMedications"
      :Type="'OPD-PatientMedicationList'"
      :VisitTypeGroupCode="'OPD'"
      :RealOnly="true"
    />
    <TblWithMasterData
      v-else
      class="pointer-none"
      :FormCode="'OPDPKGM1'"
      :VisitId="_VisitId"
      :VisitType="'OPD'"
      :FormID="DataSubmit.Id"
      :formatTime="vDateFormat"
      :dontGetDate="true"
      :readonly="true"
      ref="TblWithMasterData"
    />
    <div v-if="DataSubmit.Version >= 9">
      <Confirm
        class="mt-10"
        :MasterDataCode="'INITIALASSESSMENTSHORTCONFIRM'"
        :FormCode="'OPD_A02_007_080121_VE'"
        :ReadOnly="!(!IsFormLocked(DataSubmit))"
        :AdInfo="[DataSubmit.UserNameReceiving, DataSubmit.IsNew ? '' : DataSubmit.Username]"
        :VisitId="$route.params.Id"
        :FormId="DataSubmit.Id"
        :saveSuccesss="saveSuccesss"
        @getListConfirm="getListConfirm"
        @handleConfirm="save('confirm')"
      />
    </div>
    <div class="status-float-block" v-if="!IsFormLocked(DataSubmit)">
      <div class="action-btn-block">
        <div class="container">
          <div class="content-container">
            <div class="row">
              <div class="col-md-1 col-sm-2">
                <div class="form-group1">
                  <button class="btn v-red-btn btn-block" type="button" @click="removeETR()">{{__t('btn.xoa')}}</button>
                </div>
              </div>
              <div class="col-md-2 col-sm-2">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group1">
                  <!-- An theo setup Gay me -->
                  <button v-if="!this.CurrentPatientObj.IsAnesthesia" class="btn btn-block v-white-btn" type="button" @click="$router.push({name: 'OPDInitialAssessmentFallRiskScreening', params: {Id: $route.params.Id}})"><i class="fa fa-file-o" aria-hidden="true"></i> {{__t('Sàng lọc ngã')}}</button>
                </div>
              </div>
              <div class="col-md-5 col-sm-4" v-if="!IsLocked">
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
    <logs :EdId="this.$route.params.Id" :Type="'OPD/InitialAssessments/ForShortTerm'" />
    <!-- <his-doctor :OpdId="this.$route.params.Id" ref="HisDoctor" @close="updateDoctor" /> -->
    <p>A02_007_080121_VE</p>
    <br/>
    <popup-delete-opd @handleSubmit="removeETRConfirmed"/>
    <modal v-if="DataFromViHC" name="VitalSign" transition="pop-out" height="auto" :clickToClose="false" :width="modalWidth">
      <div class="sync-ed-header">{{__t('Đồng bộ dấu hiệu sinh tồn từ ViHC')}} <i style="cursor: pointer" @click="closeModal()" class="fa fa-times pull-right fa-2" aria-hidden="true"></i></div>
      <table style="margin: 12px">
        <tr>
          <td>
            <label>{{__t('Mạch')}} ({{__t("nhịp/phút")}})</label>
            <input disabled="true" class="form-control" type="text" v-model="DataFromViHC.Pulse">
          </td>
          <td style="padding-left: 12px;">
            <label>{{__t('Huyết áp')}} (mmHg)</label>
            <input disabled="true" class="form-control" type="text" v-model="DataFromViHC.BP">
          </td>
          <td style="padding-left: 12px;">
            <label>{{__t('Nhiệt độ')}} ({{__t("độ C")}})</label>
            <input disabled="true" class="form-control" type="text" v-model="DataFromViHC.T">
          </td>
          <td style="padding-left: 12px;">
            <label>{{__t('Nhịp thở')}} ({{__t("lần/phút")}})</label>
            <input disabled="true" class="form-control" type="text" v-model="DataFromViHC.RR">
          </td>
          <td style="padding-left: 12px;">
            <label>{{__t('Chiều cao')}} (cm)</label>
            <input disabled="true" class="form-control" type="text" v-model="DataFromViHC.Height">
          </td>
          <td style="padding-left: 12px;">
            <label>{{__t('Cân nặng')}} (kg)</label>
            <input disabled="true" class="form-control" type="text" v-model="DataFromViHC.Weight">
          </td>
        </tr>
      </table>
      <div style="display: flex; margin: 12px; justify-content: space-evenly;">
        <div>
          <button class="btn v-yellow-btn" type="button" @click="syncConfirm()">{{__t(' Đồng ý ')}}</button>
        </div>
        <div>
          <button class="btn"  @click="closePopUp()">{{__t('Bỏ qua')}}</button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import PopupDeleteOpd from './popup/PopupDeleteOpd.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import HisDoctor from '@/components/OPD/HisDoctor.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import TblWithMasterData from '@/components/global/TblWithMasterData'
import InitialAssessment from '@/services/OPD/InitialAssessment'
import VDatePicker from '@/components/VDateTimePicker.vue'
import NProgress from 'nprogress'
import _ from 'lodash'
import MaskedInput from 'vue-masked-input'
import VSelectBox from '@/components/VSelect.vue'
import Logs from '@/components/Logs.vue'
import InitialAssessmentForm from '@/components/OPD/InitialAssessmentForm.vue'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
import InitialAssessmentForShortTerm from '@/components/OPD/ForShortTermForm.vue'
import Confirm from '@/components/Form/Confirm'

const MODAL_WIDTH = 1200

export default {
  name: 'InitialAssessmentShort',
  mixins: [MixinMasterData, MixinForm],
  props: ['OpdId'],
  components: {
    ListOfCurrentMedications,
    VDatePicker,
    VSelectBox,
    MaskedInput,
    Logs,
    HisDoctor,
    InitialAssessmentForm,
    CommunicableDiseasesScreening,
    InitialAssessmentForShortTerm,
    PopupDeleteOpd,
    TblWithMasterData,
    Confirm
  },
  data () {
    return {
      DataDb: [],
      DataSubmit: {
        Datas: [],
        IsShowSyncButton: false,
        IsNew: false,
        PrimaryDoctor: {},
        Note: ''
      },
      PrimaryDoctors: [],
      syncing: false,
      modalWidth: MODAL_WIDTH,
      VisitType: '',
      DataFromViHC: null,
      IsLocked: false,
      ConfirmInfo: [],
      dataMaster: {},
      saveSuccesss: false
    }
  },
  computed: {
    bmiCalculation: function () {
      var weight = this.MASTERDATA['OPDIAFSTOPWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDIAFSTOPWEI'].Items[0].Value) : 0
      var height = this.MASTERDATA['OPDIAFSTOPHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDIAFSTOPHEI'].Items[0].Value) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    },
    allowEdit () {
      if (this.DataSubmit.Version >= 9) {
        return (this.DataSubmit.IsNew || this.DataSubmit.Username === this.getCurrentUsername() || this.ImSuperAdmin()) &&
        !((this.ConfirmInfo.length > 0 && this.ConfirmInfo[0].ConfirmBy) || (this.ConfirmInfo.length > 0 && this.ConfirmInfo[1].ConfirmBy))
      }
      return this.DataSubmit.IsNew || this.DataSubmit.Username === this.getCurrentUsername() || this.ImSuperAdmin()
    },
    allowEditDoctor () {
      return this.DataSubmit.IsNew || this.DataSubmit.Username === this.getCurrentUsername()
    },
    isConfirm () {
      return (this.ConfirmInfo.length > 0 && this.ConfirmInfo[0].ConfirmBy) || (this.ConfirmInfo.length > 0 && this.ConfirmInfo[1].ConfirmBy)
    }
  },
  mounted () {
  },
  created () {
    this.getMasterDatas({Form: 'OPDIAFSTOP'}, () => {
      this.getClinics()
      this.getData()
    })
  },
  methods: {
    // async handleSave () {
    //   if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
    //     await this.save()
    //   }
    // },
    getListConfirm (val) {
      this.ConfirmInfo = val
    },
    checkbox2RadioAndTSI (items, item) {
      items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          if (this.checkString(element.DataType, 'Text')) {
            element.Value = ''
          }
          if (this.checkString(element.DataType, 'Select')) {
            element.Value = ''
          }
        }
      })
      setTimeout(() => {
        var checked = (this.MASTERDATA['OPDIAFSTOPAFI'].Items[0].Value && this.MASTERDATA['OPDIAFSTOPARO'].Items[0].Value) ||
                      (this.MASTERDATA['OPDIAFSTOPAFI'].Items[0].Value && this.MASTERDATA['OPDIAFSTOPTOC'].Items[0].Value) ||
                      (this.MASTERDATA['OPDIAFSTOPAFI'].Items[0].Value && this.MASTERDATA['OPDIAFSTOPSOB'].Items[0].Value && this.MASTERDATA['OPDIAFSTOPACC'].Items[0].Value)
        this.MASTERDATA['OPDIAFSTOPDGL'].Items[1].Value = checked
        this.MASTERDATA['OPDIAFSTOPDGL'].Items[0].Value = !checked
      }, 10)
    },
    push2Wh (data) {
      if (data.Weight) this.MASTERDATA['OPDIAFSTOPWEI'].Items[0].Value = data.Weight
      if (data.Height) this.MASTERDATA['OPDIAFSTOPHEI'].Items[0].Value = data.Height
    },
    removeETR () {
      this.$modal.show('DeleteNoteOPD')
    },
    removeETRConfirmed (note) {
      if (note) {
        this.DataSubmit.Note = note
      } else {
        this.DataSubmit.Note = ''
      }
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
      new InitialAssessment().update('ForShortTerm/Sync/' + this.$route.params.Id).then(response => {
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
      var errors = []
      if (this.MASTERDATA['OPDIAFSTOPALL'].Items[0].Value && !this.MASTERDATA['OPDIAFSTOPALL'].Items[3].Value) {
        errors.push(this.MASTERDATA['OPDIAFSTOPALL'].Items[3])
      }
      if (this.MASTERDATA['OPDIAFSTOPALL'].Items[0].Value && !this.MASTERDATA['OPDIAFSTOPALL'].Items[4].Value) {
        errors.push(this.MASTERDATA['OPDIAFSTOPALL'].Items[4])
      }
      if (this.MASTERDATA['OPDIAFSTOPWEIPR'].Items[2].Value && !this.MASTERDATA['OPDIAFSTOPWEIPR'].Items[0].Value) {
        errors.push(this.MASTERDATA['OPDIAFSTOPWEIPR'].Items[0])
      }
      if (errors.length) {
        this.handlerResponse({Error: errors})
      }
    },
    save (confirm) {
      this.validateForm()
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      this.DataSubmit._Exception = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      if (!obj['OPDIAFSTOPPAIYES']) {
        this.resetMdData('OPDIAFSTOPPS0')
        this.resetMdData('OPDIAFSTOPPL0')
        this.resetMdData('OPDIAFSTOPPSD')
        this.resetMdData('OPDIAFSTOPPF0')
        this.resetMdData('OPDIAFSTOPPC0')
        this.resetMdData('OPDIAFSTOPHPU')
        this.resetMdData('OPDIAFSTOPPME')
      }
      if (!obj['OPDIAFSTOPAFIYES']) {
        this.resetMdData('OPDIAFSTOPARO')
        this.resetMdData('OPDIAFSTOPTOC')
        this.resetMdData('OPDIAFSTOPSOB')
        this.resetMdData('OPDIAFSTOPACC')
        this.resetMdData('OPDIAFSTOPDGL')
        this.resetMdData('OPDIAFSTOPLCL')
      }
      if (!obj['OPDIAFSTOPHPUYES']) {
        this.resetMdData('OPDIAFSTOPPME')
      }
      if (!obj['OPDIAFSTOPDGLPOS']) {
        this.resetMdData('OPDIAFSTOPLCL')
      }
      var DataSubmit = Object.assign({}, this.DataSubmit)
      if (DataSubmit.AdmittedDate && typeof DataSubmit.AdmittedDate === 'object') {
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
        this.saveData(DataSubmit, confirm)
      }, 100)
    },
    async saveData (DataSubmit, confirm) {
      console.log('saveData')
      if (this.allowEdit || this.DataDb.length === 0) {
        await new InitialAssessment().update(this.$route.params.Id, DataSubmit, 'ForShortTerm/' + 'A02_007_080121_VE/').then(response => {
          this.toastedSuccess()
          this.edited = false
          this.$refs.InitialAssessmentForm.save(this.allowEdit, confirm)
        }).catch(e => {
          this._401ResponseError(e)
        })
      } else {
        this.$refs.InitialAssessmentForm.save(!this.allowEdit, confirm)
      }
      if (confirm === 'confirm') {
        console.log('confirm sldjflj')
        this.saveSuccesss = !this.saveSuccesss
      }
      this.getData()
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
    getData () {
      new InitialAssessment().find('ForShortTerm/' + 'A02_007_080121_VE/' + this.$route.params.Id).then(response => {
        this.IsLocked = response.IsLocked
        this.DataSubmit = response
        this.DataDb = response.Datas
        this.VisitType = response.VisitType
        this.$store.dispatch('setCurrentFormId', response.Id)
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
        if (response.IsNew) {
          this.getAllergy('OPDIAFSTOPALL')
          // this.getHeightAndWeight('OPDIAFSTOPHEI', 'OPDIAFSTOPWEI')
        }
        setTimeout(() => {
          this.dataMaster = JSON.stringify(this.MASTERDATA)
          this.edited = false
        }, 500)
      }).catch(e => {
        if (e.status === 400) {
          this._404()
        }
      })
    },
    showPopupInfo () {
      new InitialAssessment().find('ForShortTerm/DataFromViHC/' + this.$route.params.Id).then(response => {
        this.DataFromViHC = response.DataFromViHC
        setTimeout(() => {
          this.$modal.show('VitalSign')
        }, 500)
      })
    },
    closeModal () {
      this.$modal.hide('VitalSign')
    },
    syncConfirm () {
      // OPDIAFSTOPPUL - Mạch
      this.MASTERDATA['OPDIAFSTOPPUL'].Items[0].Value = this.DataFromViHC.Pulse != null ? this.DataFromViHC.Pulse : ''
      // OPDIAFSTOPBP0 - Huyết áp
      this.MASTERDATA['OPDIAFSTOPBP0'].Items[0].Value = this.DataFromViHC.BP != null ? this.DataFromViHC.BP : ''
      // OPDIAFSTOPTEM - Nhiệt độ
      this.MASTERDATA['OPDIAFSTOPTEM'].Items[0].Value = this.DataFromViHC.T != null ? this.DataFromViHC.T : ''
      // OPDIAFSTOPRR0 - Nhịp thở
      this.MASTERDATA['OPDIAFSTOPRR0'].Items[0].Value = this.DataFromViHC.RR != null ? this.DataFromViHC.RR : ''
      // OPDIAFSTOPHEI - Chiều cao
      this.MASTERDATA['OPDIAFSTOPHEI'].Items[0].Value = this.DataFromViHC.Height != null ? this.DataFromViHC.Height : ''
      // OPDIAFSTOPWEI - Cân nặng
      this.MASTERDATA['OPDIAFSTOPWEI'].Items[0].Value = this.DataFromViHC.Weight != null ? this.DataFromViHC.Weight : ''

      this.$modal.hide('VitalSign')
    },
    closePopUp () {
      this.$modal.hide('VitalSign')
    }
  }
}
</script>
<style lang="stylus" scoped>
>>>.w-input-150 input {
  min-width: 150px;
}
</style>
