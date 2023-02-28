<template>
  <div class="main-content" id="etr-page">
    <!-- <h1 v-if="DataSubmit.Customer">Bệnh nhân: {{DataSubmit.Customer.Fullname}} - {{DataSubmit.Customer.PID}} <a href="#" class="pull-right">Xem chi tiết</a></h1> -->
    <h2 class="text-center">{{__t('general.bien_ban_ban_giao_nguoi_benh_chuyen_khoa')}}</h2>
    <template v-if="loaded && IsUseHandOverCheckList">
      <div class="v-tab" v-if="DataSubmit">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="#tab1" aria-controls="tab1" role="tab" data-toggle="tab">{{__t('PHR.bien_ban_ban_giao')}}</a></li>
          <li v-if="DataSubmit" role="presentation"><a href="#tab2" aria-controls="tab2" role="tab" data-toggle="tab">{{__t('PHR.bang_kiem_ban_giao')}}</a></li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="tab1">
            <div class="box-table">
              <div class="box-table-header">
                {{__t('PHR.tinh_huong')}}
              </div>
              <div class="box-table-content">
                <p>
                  <b>{{__t('PHR.ly_do_chuyen')}}: </b>{{data.ReasonForTransfer}}
                </p>
              </div>
              <div class="box-table-header">
                {{__t('PHR.dien_bien')}}
              </div>
              <div class="box-table-content">
                <p><b>{{__t('PHR.ly_do_vao_vien')}}: </b>{{data.ChiefComplain}}</p>
                <p><b>{{__t('PHR.qua_trinh_benh_ly')}}: </b></p>
                <!-- <p>Tiền sử: {{data.PastHealthHistory}}</p> -->
                <p>{{__t('Bệnh sử')}}: {{data.History}}</p>
                <!-- <div v-if="data.IsTelehealth">
                  <p><b>{{__t('Thăm khám')}}: </b>{{data.ClinicalExaminationAndFindings}}</p>
                </div> -->
                <div>
                <div>{{__t('Thăm khám')}}: </div>
                <div style="padding-left: 5px;">
                  <p v-if="item.Code !== 'OPDOENTUOI519' && item.Code !== 'OPDOENTUOI19' && item.Code !== 'OPDOENTUOI5'" :data="item" :key="index" v-for="(item ,index) in data.ClinicalExaminationAndFindings">+ <span>{{__label(item)}}: {{item.Value}}</span></p>
                </div>
                </div>
                <p><b>{{__t('PHR.chuan_doan')}}: </b>{{data.Diagnosis}}</p>
                <p><b>{{__t('Đã can thiệp')}}: </b>{{data.TreatmentAndProcedures}}.<template v-if="data.SignificantMedications"><br/> {{__t('Các xét nghiệm thăm dò chính')}}:<br/> {{data.SignificantMedications}}</template></p>
              </div>
              <div class="box-table-header">
                {{__t('PHR.danh_gia')}}
              </div>
              <div class="box-table-content">
                <p><b>{{__t('PHR.tinh_trang_nguoi_benh_hien_tai')}}: </b>{{data.CurrentStatus}}</p>
              </div>
              <div class="box-table-header">
                {{__t('PHR.de_xuat')}}
              </div>
              <div class="box-table-content">
                <p><b>{{__t('PHR.ke_hoach_tiep_theo')}}: </b>{{data.FollowupCarePlan}}</p>
              </div>
              <div class="">
                <table class="table table-bordered padding-td">
                  <tr>
                    <td width="33%" style="vertical-align: top;">
                    </td>
                    <td width="33%">
                      <div class="form-group">
                        <label>{{__t('PHR.noi_ban_giao')}}</label>
                        <input type="text" class="form-control" v-model="data.HandOverUnitPhysician" readonly>
                      </div>
                      <div class="form-group">
                        <label>{{__t('PHR.ho_va_ten_bac_si')}}</label>
                      </div>
                      <div :class="{'min-h-60': !data.UserNameHandOverPhysician}">
                        <div v-if="data.UserNameHandOverPhysician" class="text-center">
                          <div class="italic">{{data.HandOverTimePhysician}}</div>
                          <div class="flex align-center" style="margin-left: 90px;">
                            <div class="fw600 mrr5">
                              <ad-Info class="fw600" :ad="data.UserNameHandOverPhysician" />
                            </div>
                            <div class="italic fw400" style="color: green">({{__t('Đã ký xác nhận')}})</div>
                          </div>
                          <div class="fw600">{{data.HandOverPhysician}}</div>
                        </div>
                      </div>
                    </td>
                    <td width="33%">
                      <div class="form-group">
                        <label>{{__t('PHR.noi_nhan_ban_giao')}}</label>
                        <input type="text" class="form-control" v-model="data.ReceivingUnitPhysician" readonly>
                      </div>
                      <div class="form-group">
                        <label>{{__t('PHR.ho_va_ten_bac_si')}}</label>
                      </div>
                      <div :class="{'min-h-60': !data.UserNameReceivingPhysician}">
                        <div v-if="data.UserNameReceivingPhysician" class="text-center">
                          <div class="italic">{{data.PhysicianAcceptTime}}</div>
                          <div class="flex align-center" style="margin-left: 90px;">
                            <div class="fw600 mrr5">
                              <ad-Info class="fw600" :ad="data.UserNameReceivingPhysician" />
                            </div>
                            <div class="italic fw400" style="color: green">({{__t('Đã ký xác nhận')}})</div>
                          </div>
                          <div class="fw600">{{data.ReceivingPhysician}}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <!-- <tr v-else>
                    <td width="33%" style="vertical-align: top;">
                    </td>
                    <td width="33%">
                      <div class="form-group">
                        <label>{{__t('PHR.noi_ban_giao')}}</label>
                        <input type="text" class="form-control" v-model="data.HandOverUnitPhysician" readonly>
                      </div>
                      <div class="form-group">
                        <label>{{__t('PHR.ho_va_ten_bac_si')}}</label>
                        <input type="text" class="form-control" v-model="data.HandOverPhysician" readonly>
                      </div>
                    </td>
                    <td width="33%">
                      <div class="form-group">
                        <label>{{__t('PHR.noi_nhan_ban_giao')}}</label>
                        <input type="text" class="form-control" v-model="data.ReceivingUnitPhysician" readonly>
                      </div>
                      <div class="form-group">
                        <label>{{__t('PHR.ho_va_ten_bac_si')}}</label>
                        <input type="text" class="form-control" v-model="data.ReceivingPhysician" readonly>
                      </div>
                    </td>
                  </tr> -->
                </table>
                <div class="tabs-footer">
                  <!-- <button class="btn v-yellow-btn pull-right long-btn" type="button" @click="SavePatientHandOverRecord">Lưu</button>
                  <button class="btn btn-back v-white-btn" type="button" @click="back">{{__t('Quay lại')}}</button>
                  <button class="btn btn-back pull-right btn-info" v-shortkey="['ctrl', 'p']" @shortkey="print()" type="button" @click="print()">{{__t('In')}}</button> -->
                </div>
                <FloatBlock>
                  <template slot='buttons'>
                    <div class="col-md-4">
                      <div class="form-group1">
                        <button class="btn v-white-btn pull-right btn-block" type="button" v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('In')}}</button>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <div class="form-group1">
                      </div>
                    </div>
                  </template>
                </FloatBlock>
                <logs :EdId="this.$route.params.Id" :Type="'PatientHandOverRecord'" />
              </div>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane" id="tab2" v-if="DataSubmit">
            <div class="box-table">
              <div class="box-table-header">
                {{__t('PHR.tinh_huong')}}
              </div>
              <div class="box-table-content">
                <p><b>{{__t('Tên, ngày sinh, PID')}}: </b> {{data.Fullname}}, {{data.DateOfBirth}}, {{data.PID}}</p>
                <p><b>{{__t('Chẩn đoán')}}: </b> {{data.Diagnosis}}</p>
                <p><b>{{__t('Bác sĩ')}}: </b>{{DataSubmit.Physician}}</p>
                <p><b>{{__t('PHR.ly_do_chuyen')}}: </b> {{data.ReasonForTransfer}}</p>
              </div>
              <div class="box-table-header">
                {{__t('PHR.dien_bien')}}
              </div>
              <table class="table v-table-1 table-bordered">
                <tr v-if="MASTERDATA['OPDHOCALL']" class="borded-bottom highlighted">
                  <!-- dị ứng -->
                  <th width="20%">{{__label(MASTERDATA['OPDHOCALL'])}}</th>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCALL'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'">
                          <input type="checkbox" :id="'HOCALLradio-' + index" v-model="item.Value">
                          <label :for="'HOCALLradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCALL'].Items, item)">{{__label(item)}}</label>
                        </span>
                        <span :key="index" v-else-if="item.DataType === 'Select'">
                          <allergies-select v-model="item.Value" :multi="true" :items="JSON.parse(item.Data)" v-if="MASTERDATA['OPDHOCALL'].Items[0].Value"/>
                        </span>
                        <span :key="index" v-else style="flex-grow: 1;">
                          <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCALL'].Items[0].Value"/>
                        </span>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCICI']" class="borded-bottom">
                  <!-- Yêu cầu KSNK, cách ly -->
                  <th width="20%">{{__label(MASTERDATA['OPDHOCICI'])}}</th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCICI'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCICIradio-' + index" v-model="item.Value">
                            <label :for="'HOCICIradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCICI'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCICI'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['OPDHOCICI'].Items[0].Value" class="v-checkbox v-checkbox-list w300">
                            <input type="checkbox" :id="'HOCICIradio-' + index" v-model="item.Value">
                            <label :for="'HOCICIradio-' + index"></label>{{__label(item)}}
                          </span>
                          <span :key="index" v-if="item.DataType === 'Text' && MASTERDATA['OPDHOCICI'].Items[5].Value && MASTERDATA['OPDHOCICI'].Items[0].Value" style="flex-grow: 1;">
                            <input type="text" class="form-control" v-model="item.Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCRS0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCRS0'])}}</th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCRS0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCRS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCRS0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCRS0'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCRS0'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['OPDHOCRS0'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCRS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCRS0radio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCCLC']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCCLC'])}}</th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCCLC'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCCLCradio-' + index" v-model="item.Value">
                            <label :for="'HOCCLCradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCCLC'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCCLC'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['OPDHOCCLC'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCCLCradio-' + index" v-model="item.Value">
                            <label :for="'HOCCLCradio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCPL0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCPL0'])}}</th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCPL0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCPL0radio-' + index" v-model="item.Value">
                            <label :for="'HOCPL0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCPL0'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCPL0'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['OPDHOCPL0'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCPL0radio-' + index" v-model="item.Value">
                            <label :for="'HOCPL0radio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCAC0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCAC0'])}}</th>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCAC0'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                          <input type="checkbox" :id="'HOCAC0radio-' + index" v-model="item.Value">
                          <label :for="'HOCAC0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCAC0'].Items, item)">{{__label(item)}}</label>
                        </span>
                        <span :key="index" v-else style="flex-grow: 1;">
                          <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCAC0'].Items[0].Value"/>
                        </span>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCOPC']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCOPC'])}}</th>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCOPC'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                          <input type="checkbox" :id="'HOCOPCradio-' + index" v-model="item.Value">
                          <label :for="'HOCOPCradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCOPC'].Items, item)">{{__label(item)}}</label>
                        </span>
                        <span :key="index" v-else style="flex-grow: 1;">
                          <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCOPC'].Items[0].Value"/>
                        </span>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCSS0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCSS0'])}}</th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCSS0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCSS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCSS0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCSS0'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCSS0'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['OPDHOCSS0'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCSS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCSS0radio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCDRA']" class="borded-bottom">
                  <th width="20%">
                    {{__label(MASTERDATA['OPDHOCDRA'])}}
                    <!-- Dẫn lưu tổng số -->
                  </th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCDRA'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCDRAradio-' + index" v-model="item.Value">
                            <label :for="'HOCDRAradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCDRA'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCDRA'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['OPDHOCDRA'].Items[0].Value" class="v-checkbox v-checkbox-list w300">
                            <input type="checkbox" :id="'HOCDRAradio-' + index" v-model="item.Value">
                            <label :for="'HOCDRAradio-' + index"></label>{{__label(item)}}
                          </span>
                          <span :key="index" v-if="item.DataType === 'Text' && MASTERDATA['OPDHOCDRA'].Items[4].Value" style="flex-grow: 1;">
                            <input type="text" class="form-control" v-model="item.Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCCBG']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCCBG'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCCBG'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCCBGradio-' + index" v-model="item.Value">
                            <label :for="'HOCCBGradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCCBG'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCCBG'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCID0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCID0'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCID0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCID0radio-' + index" v-model="item.Value">
                            <label :for="'HOCID0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCID0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCID0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCDR0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCDR0'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCDR0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCDR0radio-' + index" v-model="item.Value">
                            <label :for="'HOCDR0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCDR0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCDR0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
              <div class="box-table-header">
                {{__t('PHR.danh_gia')}}
              </div>
              <table class="table v-table-1 table-bordered">
                <tr v-if="MASTERDATA['OPDHOCVS0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCVS0'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCVS0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCVS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCVS0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCVS0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <div style="position: relative;" v-if="MASTERDATA['OPDHOCVS0'].Items[0].Value">
                              <textarea-autosize class="form-control" v-model="item.Value"/>
                              <!-- <button @click="loadObservation(MASTERDATA['OPDHOCVS0'].Items)" class="btn-sync-sign"><i class="fa fa-refresh" aria-hidden="true"></i></button> -->
                            </div>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCFR0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCFR0'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCFR0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCFR0radio-' + index" v-model="item.Value">
                            <label :for="'HOCFR0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCFR0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCFR0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCPAI']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCPAI'])}}</th>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCPAI'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                          <input type="checkbox" :id="'HOCPAIradio-' + index" v-model="item.Value">
                          <label :for="'HOCPAIradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCPAI'].Items, item)">{{__label(item)}}</label>
                        </span>
                        <span :key="index" v-else style="flex-grow: 1;">
                          <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCPAI'].Items[0].Value"/>
                        </span>
                      </template>
                      <div style="flex-grow: 1;" v-if="MASTERDATA['OPDHOCPS0'] && MASTERDATA['OPDHOCPAI'].Items[0].Value" class="borded-bottom">
                        {{__label(MASTERDATA['OPDHOCPS0'])}}
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCPS0'].Items">
                          <template v-if="item.DataType === 'Select'">
                            <v-select :key="index" :placeholder="__t('Đơn vị')" v-model="item.Value" :items="JSONParse(item.Data) || []"/>
                          </template>
                          <template v-else>
                            <input :key="index" type="text" class="v-input-sm form-control" v-model="item.Value"/>
                          </template>
                        </template>
                      </div>
                    </div>
                    <template v-if="MASTERDATA['OPDHOCRP0'] && MASTERDATA['OPDHOCPAI'].Items[0].Value">
                    <p><label>{{__label(MASTERDATA['OPDHOCRP0'])}}</label></p>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCRP0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCRP0radio-' + index" v-model="item.Value">
                            <label :for="'HOCRP0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCRP0'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="" v-if="MASTERDATA['OPDHOCRP0'].Items[0].Value">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCRP0'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCRP0radio-' + index" v-model="item.Value">
                            <label :for="'HOCRP0radio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                        <div v-if="MASTERDATA['OPDHOCRP0'].Items[8].Value">
                          <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCRP0'].Items">
                            <template v-if="checkString(item.DataType, 'text')">
                              <input :key="index" :placeholder="__label(item)" type="text" class="form-control" v-model="item.Value"/>
                            </template>
                          </template>
                        </div>
                      </div>
                    </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCCON']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCCON'])}}</th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCCON'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCCONradio-' + index" v-model="item.Value">
                            <label :for="'HOCCONradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCCON'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCCON'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['OPDHOCCON'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCCONradio-' + index" v-model="item.Value">
                            <label :for="'HOCCONradio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCOSS']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCOSS'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCOSS'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOSSradio-' + index" v-model="item.Value">
                            <label :for="'HOCOSSradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCOSS'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCOSS'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
              <div class="box-table-header">
                {{__t('PHR.de_xuat')}}
              </div>
              <table class="table v-table-1 table-bordered">
                <tr v-if="MASTERDATA['OPDHOCFUC']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCFUC'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCFUC'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCFUCradio-' + index" v-model="item.Value">
                            <label :for="'HOCFUCradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCFUC'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCFUC'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCMO0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCMO0'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCMO0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCMO0radio-' + index" v-model="item.Value">
                            <label :for="'HOCMO0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCMO0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCMO0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCWOU']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCWOU'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCWOU'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCWOUradio-' + index" v-model="item.Value">
                            <label :for="'HOCWOUradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCWOU'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCWOU'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCBLE']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCBLE'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCBLE'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCBLEradio-' + index" v-model="item.Value">
                            <label :for="'HOCBLEradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCBLE'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCBLE'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCPDT']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCPDT'])}}</th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCPDT'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCPDTradio-' + index" v-model="item.Value">
                            <label :for="'HOCPDTradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCPDT'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCPDT'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['OPDHOCPDT'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCPDTradio-' + index" v-model="item.Value">
                            <label :for="'HOCPDTradio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCPP0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCPP0'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCPP0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCPP0radio-' + index" v-model="item.Value">
                            <label :for="'HOCPP0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCPP0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCPP0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCMR0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCMR0'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCMR0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCMR0radio-' + index" v-model="item.Value">
                            <label :for="'HOCMR0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCMR0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCMR0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCOTH']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['OPDHOCOTH'])}}<button v-if="IPDHOCOTCount < 4" @click="newIPDHOCOTH" class="btn-sync-data btn">THÊM</button></th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCOTH'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOTHradio-' + index" v-model="item.Value">
                            <label :for="'HOCOTHradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCOTH'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCOTH'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCOT2'] && IPDHOCOTCount > 0" class="borded-bottom">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCOT2'].Items">
                    <th style="position: relative" :key="index" width="20%" v-if="index === 0">
                      <input class="form-control" v-model="item.Value" />
                      <button v-if="IPDHOCOTCount === 1" @click="setIPDHOCOTCount(0)" class="btn-pos-left"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </th>
                  </template>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCOT2'].Items" >
                        <template v-if="index > 0">
                          <span :key="index"  v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOT2radio-' + index" v-model="item.Value">
                            <label :for="'HOCOT2radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCOT2'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCOT2'].Items[1].Value"/>
                          </span>
                        </template>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCOT3'] && IPDHOCOTCount > 1" class="borded-bottom">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCOT3'].Items">
                    <th style="position: relative" :key="index" width="20%" v-if="index === 0">
                      <input class="form-control" v-model="item.Value" />
                      <button v-if="IPDHOCOTCount === 2" @click="setIPDHOCOTCount(1)" class="btn-pos-left"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </th>
                  </template>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCOT3'].Items" >
                        <template v-if="index > 0">
                          <span :key="index"  v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOT3radio-' + index" v-model="item.Value">
                            <label :for="'HOCOT3radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCOT3'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCOT3'].Items[1].Value"/>
                          </span>
                        </template>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCOT4'] && IPDHOCOTCount > 2" class="borded-bottom">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCOT4'].Items">
                    <th style="position: relative" :key="index" width="20%" v-if="index === 0">
                      <input class="form-control" v-model="item.Value" />
                      <button v-if="IPDHOCOTCount === 3" @click="setIPDHOCOTCount(2)" class="btn-pos-left"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </th>
                  </template>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCOT4'].Items" >
                        <template v-if="index > 0">
                          <span :key="index"  v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOT4radio-' + index" v-model="item.Value">
                            <label :for="'HOCOT4radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCOT4'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCOT4'].Items[1].Value"/>
                          </span>
                        </template>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDHOCOT5'] && IPDHOCOTCount > 3" class="borded-bottom">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCOT5'].Items">
                    <th style="position: relative" :key="index" width="20%" v-if="index === 0">
                      <input class="form-control" v-model="item.Value" />
                      <button v-if="IPDHOCOTCount === 4" @click="setIPDHOCOTCount(3)" class="btn-pos-left"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </th>
                  </template>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['OPDHOCOT5'].Items" >
                        <template v-if="index > 0">
                          <span :key="index"  v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOT5radio-' + index" v-model="item.Value">
                            <label :for="'HOCOT5radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDHOCOT5'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDHOCOT5'].Items[1].Value"/>
                          </span>
                        </template>
                      </template>
                    </div>
                  </td>
                </tr>
              </table>
              <table class="table table-bordered padding-td">
                <tr>
                  <td width="33%" style="vertical-align: top;">
                    <div class="form-group">
                      <label>{{__t('PHR.thoi_gian_ban_giao')}}</label>
                      <v-date-picker class="full-w" :format="vDateTimeFormat" v-model="DataSubmit.HandOverTimeNurse"/>
                    </div>
                  </td>
                  <td width="33%">
                    <div class="form-group">
                      <label>{{__t('PHR.noi_ban_giao')}}</label>
                      <input type="text" class="form-control" v-model="DataSubmit.HandOverUnitNurse" readonly>
                    </div>
                    <div class="form-group">
                      <label>{{__t('PHR.nguoi_ban_giao')}}</label>
                    </div>
                    <div :class="{'min-h-60': !DataSubmit.UserNameHandOverNurse}">
                      <div v-if="DataSubmit.UserNameHandOverNurse" class="text-center">
                        <div class="italic">{{DataSubmit.HandOverTimeNurse | formatDateWithoutSecon}}</div>
                        <div class="flex align-center" style="margin-left: 90px;">
                          <div class="fw600 mrr5">
                            <ad-Info class="fw600" :ad="DataSubmit.UserNameHandOverNurse" />
                          </div>
                          <div class="italic fw400" style="color: green">({{__t('Đã ký xác nhận')}})</div>
                        </div>
                        <div class="fw600">{{DataSubmit.HandOverNurse}}</div>
                      </div>
                    </div>
                  </td>
                  <td width="33%">
                    <div class="form-group">
                      <label>{{__t('PHR.noi_nhan_ban_giao')}}</label>
                      <input type="text" class="form-control" v-model="DataSubmit.ReceivingUnitNurse" readonly>
                    </div>
                    <div class="form-group">
                      <label>{{__t('PHR.nguoi_nhan_ban_giao')}}</label>
                    </div>
                    <div :class="{'min-h-60': !DataSubmit.UserNameReceivingNurse}">
                      <div v-if="DataSubmit.UserNameReceivingNurse" class="text-center">
                        <div class="italic">{{DataSubmit.NurseAcceptTime}}</div>
                        <div class="flex align-center" style="margin-left: 90px;">
                          <div class="fw600 mrr5">
                            <ad-Info class="fw600" :ad="DataSubmit.UserNameReceivingNurse" />
                          </div>
                          <div class="italic fw400" style="color: green">({{__t('Đã ký xác nhận')}})</div>
                        </div>
                        <div class="fw600">{{DataSubmit.ReceivingNurse}}</div>
                      </div>
                    </div>
                  </td>
                </tr>
                <!-- <tr v-else>
                  <td width="33%" style="vertical-align: top;">
                    <div class="form-group">
                      <label>{{__t('PHR.thoi_gian_ban_giao')}}</label>
                      <v-date-picker class="full-w" :format="vDateTimeFormat" v-model="DataSubmit.HandOverTimeNurse"/>
                    </div>
                  </td>
                  <td width="33%">
                    <div class="form-group">
                      <label>{{__t('PHR.noi_ban_giao')}}</label>
                      <input type="text" class="form-control" v-model="DataSubmit.HandOverUnitNurse" readonly>
                    </div>
                    <div class="form-group">
                      <label>{{__t('PHR.nguoi_ban_giao')}}</label>
                      <input type="text" class="form-control" v-model="DataSubmit.HandOverNurse" readonly>
                    </div>
                  </td>
                  <td width="33%">
                    <div class="form-group">
                      <label>{{__t('PHR.noi_nhan_ban_giao')}}</label>
                      <input type="text" class="form-control" v-model="DataSubmit.ReceivingUnitNurse" readonly>
                    </div>
                    <div class="form-group">
                      <label>{{__t('PHR.nguoi_nhan_ban_giao')}}</label>
                      <input type="text" class="form-control" v-model="DataSubmit.ReceivingNurse" readonly>
                    </div>
                  </td>
                </tr> -->
              </table>
              <!-- <div class="tabs-footer">
                <button class="btn v-white-btn" type="button" @click="back">{{__t('btn.back')}}</button>
                <button class="btn v-yellow-btn pull-right long-btn" type="button" v-shortkey="['ctrl', 's']" @shortkey="SaveHandOverCheckList()" @click="SaveHandOverCheckList()">{{__t('btn.save')}}</button>
                <button class="btn btn-back pull-right btn-info" type="button" v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print()">{{__t('btn.print')}}</button>
              </div> -->
              <FloatBlock>
                <template slot='buttons'>
                  <div class="col-md-4">
                    <div class="form-group1">
                      <button class="btn v-white-btn pull-right btn-block" type="button" v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('In')}}</button>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group1">
                      <button class="btn v-yellow-btn pull-right long-btn" type="button" v-shortkey="['ctrl', 's']" @shortkey="SaveHandOverCheckList()" @click="SaveHandOverCheckList()">{{__t('btn.save')}}</button>
                    </div>
                  </div>
                </template>
              </FloatBlock>
              <logs :EdId="this.$route.params.Id" :Type="'OPD/HandOverCheckList'" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <h4>{{__t('Bệnh nhân không ở trạng thái chuyển khoa biên bản không tồn tại!')}}</h4>
        <p><button class="btn btn-back v-white-btn" type="button" @click="back()">{{__t('btn.back')}}</button></p>
      </div>
      <div v-if="DataSubmit && data && hasPrint" hidden>
        <print-phr :data="data" :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA"/>
      </div>
    </template>
    <div v-else-if="IsUseHandOverCheckList == false" class="text-center">
      <h4>{{__t('Người bệnh không sử dụng Biên bản bàn giao!')}}</h4>
      <p><button class="btn btn-back v-white-btn" type="button" @click="back()">{{__t('btn.back')}}</button></p>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */

import MaskedInput from 'vue-masked-input'
import PatientHandOverRecord from '@/services/OPD/PatientHandOverRecord'
import HandOverCheckList from '@/services/OPD/HandOverCheckList'
import NProgress from 'nprogress'
// import moment from 'moment'
// const isDate = (value) => !helpers.req(value) || moment(value, 'DD-MM-YYYY', true).isValid()
import MixinMasterData from '@/mixins/masterdata.js'
import _ from 'lodash'
import VSelect from '@/components/VSelect.vue'
import VDatePicker from '@/components/VDateTimePicker.vue'
import VSelectView from '@/components/VSelectDisplay.vue'
import MixinForm from '@/mixins/form.js'
import Logs from '@/components/Logs.vue'
import PrintPhr from '@/components/OPD/PRINT_PHR.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'PHR',
  data () {
    return {
      Version: 9,
      data: {},
      DataSubmit: null,
      hasPrint: false,
      loaded: false,
      IPDHOCOT: ['OPDHOCOT2', 'OPDHOCOT3', 'OPDHOCOT4', 'OPDHOCOT5'],
      IPDHOCOTCount: 0,
      IsUseHandOverCheckList: true
    }
  },
  mixins: [MixinMasterData, MixinForm],
  /**
   * The components that the page can use.
   */
  components: {
    MaskedInput,
    VSelect,
    VDatePicker,
    VSelectView,
    Logs,
    PrintPhr
  },
  mounted () {
    this.getData()
    this.getHandOverCheckList()
  },
  computed: {
  },
  watch: {
    DataSubmit: {
      handler () {
        this.edited = true
      },
      deep: true
    }
  },
  methods: {
    validateIPDHOCOT () {},
    setIPDHOCOTCount (c) {
      this.IPDHOCOTCount = c
      this.MASTERDATA['OPDHOCOT6'].Items[0].Value = this.IPDHOCOTCount
      this.MASTERDATA[this.IPDHOCOT[c]].Items.forEach(e => {
        e.Value = null
      })
    },
    newIPDHOCOTH () {
      this.IPDHOCOTCount++
      this.MASTERDATA['OPDHOCOT6'].Items[0].Value = this.IPDHOCOTCount
    },
    removeIPDHOCOTH () {
      this.IPDHOCOTCount--
      this.MASTERDATA['OPDHOCOT6'].Items[0].Value = this.IPDHOCOTCount
    },
    checkbox2Radio (items, item) {
      items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          if (this.checkString(element.DataType, 'text')) {
            element.Value = ''
          }
          if (this.checkString(element.DataType, 'select')) {
            element.Value = ''
          }
          if (this.checkString(element.DataType, 'checkbox')) {
            element.Value = ''
          }
        }
      })
    },
    close () {
      this.$modal.hide('printview')
    },
    print () {
      this.hasPrint = true
      // this.DataSubmit.HandOverTimeNurse = this.moment2String(this.DataSubmit.HandOverTimeNurse)
      setTimeout(() => {
        this.$htmlToPaperPHR('A4PrintPage')
      }, 100)
      setTimeout(() => {
        this.hasPrint = false
      }, 2000)
    },
    printview () {
      this.$modal.show('printview')
    },
    SaveHandOverCheckList () {
      NProgress.start()
      var obj = {}
      this.DataSubmit.Datas = []
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
      if (!obj['OPDHOCPAIYES']) {
        this.resetMData('OPDHOCPS0')
        this.resetMData('OPDHOCRP0')
      }
      var DataSubmit = Object.assign({}, this.DataSubmit)
      if (typeof DataSubmit.HandOverTimeNurse === 'object') {
        DataSubmit.HandOverTimeNurse = this.moment2String(DataSubmit.HandOverTimeNurse)
      }
      setTimeout(() => {
        this.DataSubmit.Room = {}
        new HandOverCheckList().update(this.$route.params.Id, DataSubmit).then(response => {
          this.toastedSuccess()
          this.reload()
        }).catch(e => {
          this._401ResponseError(e)
        })
      }, 100)
    },
    resetMData (key) {
      // console.log(key)
      this.MASTERDATA[key].Items.forEach(item => {
        item.Value = null
      })
      this.DataSubmit.Datas.forEach(item => {
        if (item.Group === key) {
          // console.log(key)
          item.Value = null
        }
      })
    },
    reloadDataForm () {
      new HandOverCheckList().find(this.$route.params.Id).then(response => {
        this.DataSubmit = response
        this.DataSubmit.HandOverNurse = response.HandOverNurse
        setTimeout(() => {
          this.edited = false
        }, 100)
      })
    },
    getHandOverCheckList () {
      this.getMasterDatas({Form: 'OPDHOC'}, () => {
        new HandOverCheckList().find(this.$route.params.Id + '?hidemsg=' + true).then(response => {
          this.loaded = true
          this.DataSubmit = response
          this.IsUseHandOverCheckList = response.IsUseHandOverCheckList
          if (!this.DataSubmit.HandOverTimeNurse) {
            this.DataSubmit.HandOverTimeNurse = new Date()
          } else {
            this.DataSubmit.HandOverTimeNurse = this.string2Moment(this.DataSubmit.HandOverTimeNurse)
          }
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(this.DataSubmit.Datas, {Code: code})
                // if ('OPDHOCICI' === property) {
                //   console.log(exited)
                // }
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
          this.IPDHOCOTCount = this.parseInt(this.MASTERDATA['OPDHOCOT6'].Items[0].Value, 0)
        }).catch(e => {
          console.log(e)
          if (e.status) {
            this.loaded = true
          }
        })
      })
    },
    OPDOENBMIlabel () {
      if (this.data.IsTelehealth) {
        return
      }
      var y1 = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENTUOI519')
      var OPDOENBMI = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENBMIANS')
      if (y1 && OPDOENBMI) {
        var y2 = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENTUOI19')
        var y3 = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENTUOI5')
        if (y2.Value === 'True') {
          OPDOENBMI.ViName = 'BMI'
          OPDOENBMI.EnName = 'BMI (over 19 years old)'
        }
        if (y1.Value === 'True') {
          OPDOENBMI.ViName = 'BMI theo Z-score'
          OPDOENBMI.EnName = 'BMI by Z-score (5-19 years old)'
        }
        if (y3.Value === 'True') {
          OPDOENBMI.ViName = 'Z-score theo cân nặng/tuổi, chiều/tuổi,cân nặng/chiều cao theo tuổi và giới'
          OPDOENBMI.EnName = 'Z-score by weight / age'
        }
      }
    },
    getData () {
      new PatientHandOverRecord().find(this.$route.params.Id + '?hidemsg=' + true).then(response => {
        response.History = response.PastMedicalHistory
        response.Assessment = response.ClinicalExaminationAndFindings
        response.TreatmentAndProcedures = response.TreatmentPlans
        response.CurrentStatus = response.PatientStatus
        response.FollowupCarePlan = response.FollowupPlan
        response.SignificantMedications = response.PrincipalTest

        this.data = response
        this.Version = response.Version
        // if (!this.data.HandOverTimePhysician) {
        //   this.data.HandOverTimePhysician = new Date()
        // } else {
        //   this.data.HandOverTimePhysician = moment(this.data.HandOverTimePhysician, this.vDateTimeFormat)
        // }
        this.OPDOENBMIlabel()
      }).catch(e => {
        if (e.status) {
          // this.go2Home()
        }
      })
    }
  }
}
</script>
