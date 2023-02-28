<template>
  <div class="main-content" id="etr-page">
    <!-- <h1 v-if="DataSubmit.Customer">Bệnh nhân: {{DataSubmit.Customer.Fullname}} - {{DataSubmit.Customer.PID}} <a href="#" class="pull-right">Xem chi tiết</a></h1> -->
    <h2 class="text-center">{{__t('general.bien_ban_ban_giao_nguoi_benh_chuyen_khoa')}}</h2>
    <div v-if="!loading && IsUseHandOverCheckList">
      <div v-if="hasData" class="v-tab">
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
                <p>{{__t('Thăm khám')}}:</p>
                <div style="padding-left: 5px;">
                  <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.Assessment">+ <span>{{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</span></p>
                </div>
                <p><b>{{__t('Kết quả cận lâm sàng')}}:</b> {{data.ResultOfParaclinicalTests}}</p>
                <p><b>{{__t('PHR.chuan_doan')}}: </b>{{data.Diagnosis}}</p>
                <p><b>{{__t('Đã can thiệp')}}: </b>{{data.TreatmentAndProcedures}} .<template v-if="data.SignificantMedications">Các thuốc chính đã dùng: {{data.SignificantMedications}}</template></p>
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
                  <button class="btn v-white-btn pull-right btn-block" type="button" v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print()"><i class="fa fa-print" aria-hidden="true"></i>{{__t('In')}}</button> -->
                </div>
                <FloatBlock>
                  <template slot='buttons'>
                    <div class="col-md-4">
                      <div class="form-group1">
                        <button class="btn v-white-btn pull-right btn-block" type="button" v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('In')}}</button>
                      </div>
                    </div>
                    <div class="col-md-8" v-if="!viewOnly">
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
                <p><b>{{__t('PHR.ten_ngay_sinh_PID')}}: </b> {{data.Fullname}}, {{data.DateOfBirth}}, {{data.PID}}</p>
                <p><b>{{__t('Chẩn đoán')}}: </b> {{data.Diagnosis}}</p>
                <p><b>{{__t('Bác sĩ')}}: </b>{{DataSubmit.Physician}}</p>
                <p><b>{{__t('PHR.ly_do_chuyen')}}: </b> {{data.ReasonForTransfer}}</p>
              </div>
              <div class="box-table-header">
                {{__t('PHR.dien_bien')}}
              </div>
              <table class="table v-table-1 table-bordered">
                <tr v-if="MASTERDATA['HOCALL']" class="borded-bottom highlighted">
                  <!-- dị ứng -->
                  <th width="20%">{{__label(MASTERDATA['HOCALL'])}}</th>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['HOCALL'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'">
                          <input type="checkbox" :id="'HOCALLradio-' + index" v-model="item.Value">
                          <label :for="'HOCALLradio-' + index" @click="checkbox2Radio(MASTERDATA['HOCALL'].Items, item)">{{__label(item)}}</label>
                        </span>
                        <span :key="index" v-else-if="item.DataType === 'Select'">
                          <allergies-select v-model="item.Value" :multi="true" :items="JSON.parse(item.Data)" v-if="MASTERDATA['HOCALL'].Items[0].Value"/>
                        </span>
                        <span :key="index" v-else style="flex-grow: 1;">
                          <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCALL'].Items[0].Value"/>
                        </span>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCICI']" class="borded-bottom">
                  <!-- Yêu cầu KSNK, cách ly -->
                  <th width="20%">{{__label(MASTERDATA['HOCICI'])}}</th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCICI'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCICIradio-' + index" v-model="item.Value">
                            <label :for="'HOCICIradio-' + index" @click="checkbox2Radio(MASTERDATA['HOCICI'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCICI'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['HOCICI'].Items[0].Value" class="v-checkbox v-checkbox-list w300">
                            <input type="checkbox" :id="'HOCICIradio-' + index" v-model="item.Value">
                            <label :for="'HOCICIradio-' + index"></label>{{__label(item)}}
                          </span>
                          <span :key="index" v-if="item.DataType === 'Text' && MASTERDATA['HOCICI'].Items[5].Value && MASTERDATA['HOCICI'].Items[0].Value" style="flex-grow: 1;">
                            <input type="text" class="form-control" v-model="item.Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCRS0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCRS0'])}}</th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCRS0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCRS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCRS0radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCRS0'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCRS0'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['HOCRS0'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCRS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCRS0radio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCCLC']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCCLC'])}}</th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCCLC'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCCLCradio-' + index" v-model="item.Value">
                            <label :for="'HOCCLCradio-' + index" @click="checkbox2Radio(MASTERDATA['HOCCLC'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCCLC'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['HOCCLC'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCCLCradio-' + index" v-model="item.Value">
                            <label :for="'HOCCLCradio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCPL0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCPL0'])}}</th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCPL0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCPL0radio-' + index" v-model="item.Value">
                            <label :for="'HOCPL0radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCPL0'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCPL0'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['HOCPL0'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCPL0radio-' + index" v-model="item.Value">
                            <label :for="'HOCPL0radio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCAC0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCAC0'])}}</th>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['HOCAC0'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                          <input type="checkbox" :id="'HOCAC0radio-' + index" v-model="item.Value">
                          <label :for="'HOCAC0radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCAC0'].Items, item)">{{__label(item)}}</label>
                        </span>
                        <span :key="index" v-else style="flex-grow: 1;">
                          <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCAC0'].Items[0].Value"/>
                        </span>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCOPC']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCOPC'])}}</th>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOPC'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                          <input type="checkbox" :id="'HOCOPCradio-' + index" v-model="item.Value">
                          <label :for="'HOCOPCradio-' + index" @click="checkbox2Radio(MASTERDATA['HOCOPC'].Items, item)">{{__label(item)}}</label>
                        </span>
                        <span :key="index" v-else style="flex-grow: 1;">
                          <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCOPC'].Items[0].Value"/>
                        </span>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCSS0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCSS0'])}}</th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCSS0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCSS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCSS0radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCSS0'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCSS0'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['HOCSS0'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCSS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCSS0radio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCDRA']" class="borded-bottom">
                  <th width="20%">
                    {{__label(MASTERDATA['HOCDRA'])}}
                    <!-- Dẫn lưu tổng số -->
                  </th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCDRA'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCDRAradio-' + index" v-model="item.Value">
                            <label :for="'HOCDRAradio-' + index" @click="checkbox2Radio(MASTERDATA['HOCDRA'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCDRA'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['HOCDRA'].Items[0].Value" class="v-checkbox v-checkbox-list w300">
                            <input type="checkbox" :id="'HOCDRAradio-' + index" v-model="item.Value">
                            <label :for="'HOCDRAradio-' + index"></label>{{__label(item)}}
                          </span>
                          <span :key="index" v-if="item.DataType === 'Text' && MASTERDATA['HOCDRA'].Items[4].Value" style="flex-grow: 1;">
                            <input type="text" class="form-control" v-model="item.Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCCBG']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCCBG'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCCBG'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCCBGradio-' + index" v-model="item.Value">
                            <label :for="'HOCCBGradio-' + index" @click="checkbox2Radio(MASTERDATA['HOCCBG'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCCBG'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCID0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCID0'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCID0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCID0radio-' + index" v-model="item.Value">
                            <label :for="'HOCID0radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCID0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCID0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCDR0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCDR0'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCDR0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCDR0radio-' + index" v-model="item.Value">
                            <label :for="'HOCDR0radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCDR0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCDR0'].Items[0].Value"/>
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
                <tr v-if="MASTERDATA['HOCVS0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCVS0'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCVS0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCVS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCVS0radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCVS0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <div style="position: relative;" v-if="MASTERDATA['HOCVS0'].Items[0].Value">
                              <textarea-autosize class="form-control" v-model="item.Value"/>
                              <!-- <button @click="loadObservation(MASTERDATA['HOCVS0'].Items)" class="btn-sync-sign"><i class="fa fa-refresh" aria-hidden="true"></i></button> -->
                            </div>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCFR0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCFR0'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCFR0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCFR0radio-' + index" v-model="item.Value">
                            <label :for="'HOCFR0radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCFR0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCFR0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCPAI']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCPAI'])}}</th>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['HOCPAI'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                          <input type="checkbox" :id="'HOCPAIradio-' + index" v-model="item.Value">
                          <label :for="'HOCPAIradio-' + index" @click="checkbox2Radio(MASTERDATA['HOCPAI'].Items, item)">{{__label(item)}}</label>
                        </span>
                        <span :key="index" v-else style="flex-grow: 1;">
                          <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCPAI'].Items[0].Value"/>
                        </span>
                      </template>
                      <div style="flex-grow: 1;" v-if="MASTERDATA['HOCPS0'] && MASTERDATA['HOCPAI'].Items[0].Value" class="borded-bottom">
                        {{__label(MASTERDATA['HOCPS0'])}}
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCPS0'].Items">
                          <template v-if="item.DataType === 'Select'">
                            <v-select :key="index" :placeholder="__t('Đơn vị')" v-model="item.Value" :items="JSON.parse(item.Data)"/>
                          </template>
                          <template v-else>
                            <input :key="index" type="text" class="v-input-sm form-control" v-model="item.Value"/>
                          </template>
                        </template>
                      </div>
                    </div>
                    <template v-if="MASTERDATA['HOCRP0'] && MASTERDATA['HOCPAI'].Items[0].Value">
                    <p><label>{{__label(MASTERDATA['HOCRP0'])}}</label></p>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCRP0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCRP0radio-' + index" v-model="item.Value">
                            <label :for="'HOCRP0radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCRP0'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="" v-if="MASTERDATA['HOCRP0'].Items[0].Value">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCRP0'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCRP0radio-' + index" v-model="item.Value">
                            <label :for="'HOCRP0radio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                        <div v-if="MASTERDATA['HOCRP0'].Items[8].Value">
                          <template :data="item"  v-for="(item,index) in MASTERDATA['HOCRP0'].Items">
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
                <tr v-if="MASTERDATA['HOCCON']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCCON'])}}</th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCCON'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCCONradio-' + index" v-model="item.Value">
                            <label :for="'HOCCONradio-' + index" @click="checkbox2Radio(MASTERDATA['HOCCON'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCCON'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['HOCCON'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCCONradio-' + index" v-model="item.Value">
                            <label :for="'HOCCONradio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCOSS']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCOSS'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOSS'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOSSradio-' + index" v-model="item.Value">
                            <label :for="'HOCOSSradio-' + index" @click="checkbox2Radio(MASTERDATA['HOCOSS'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCOSS'].Items[0].Value"/>
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
                <tr v-if="MASTERDATA['HOCFUC']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCFUC'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCFUC'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCFUCradio-' + index" v-model="item.Value">
                            <label :for="'HOCFUCradio-' + index" @click="checkbox2Radio(MASTERDATA['HOCFUC'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCFUC'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCMO0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCMO0'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCMO0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCMO0radio-' + index" v-model="item.Value">
                            <label :for="'HOCMO0radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCMO0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCMO0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCWOU']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCWOU'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCWOU'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCWOUradio-' + index" v-model="item.Value">
                            <label :for="'HOCWOUradio-' + index" @click="checkbox2Radio(MASTERDATA['HOCWOU'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCWOU'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCBLE']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCBLE'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCBLE'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCBLEradio-' + index" v-model="item.Value">
                            <label :for="'HOCBLEradio-' + index" @click="checkbox2Radio(MASTERDATA['HOCBLE'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCBLE'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCPDT']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCPDT'])}}</th>
                  <td>
                    <div class="flex-box">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCPDT'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCPDTradio-' + index" v-model="item.Value">
                            <label :for="'HOCPDTradio-' + index" @click="checkbox2Radio(MASTERDATA['HOCPDT'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCPDT'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['HOCPDT'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCPDTradio-' + index" v-model="item.Value">
                            <label :for="'HOCPDTradio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCPP0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCPP0'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCPP0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCPP0radio-' + index" v-model="item.Value">
                            <label :for="'HOCPP0radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCPP0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCPP0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCMR0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCMR0'])}}</th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCMR0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCMR0radio-' + index" v-model="item.Value">
                            <label :for="'HOCMR0radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCMR0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCMR0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCOTH']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['HOCOTH'])}}<button v-if="HOCOTCount < 4" @click="newIPDHOCOTH" class="btn-sync-data btn">{{__t('THÊM')}}</button></th>
                  <td>
                    <div class="">
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOTH'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOTHradio-' + index" v-model="item.Value">
                            <label :for="'HOCOTHradio-' + index" @click="checkbox2Radio(MASTERDATA['HOCOTH'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCOTH'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCOT2'] && HOCOTCount > 0" class="borded-bottom">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT2'].Items">
                    <th style="position: relative" :key="index" width="20%" v-if="index === 0">
                      <input class="form-control" v-model="item.Value" />
                      <button v-if="HOCOTCount === 1" @click="setHOCOTCount(0)" class="btn-pos-left"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </th>
                  </template>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT2'].Items" >
                        <template v-if="index > 0">
                          <span :key="index"  v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOT2radio-' + index" v-model="item.Value">
                            <label :for="'HOCOT2radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCOT2'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCOT2'].Items[1].Value"/>
                          </span>
                        </template>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCOT3'] && HOCOTCount > 1" class="borded-bottom">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT3'].Items">
                    <th style="position: relative" :key="index" width="20%" v-if="index === 0">
                      <input class="form-control" v-model="item.Value" />
                      <button v-if="HOCOTCount === 2" @click="setHOCOTCount(1)" class="btn-pos-left"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </th>
                  </template>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT3'].Items" >
                        <template v-if="index > 0">
                          <span :key="index"  v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOT3radio-' + index" v-model="item.Value">
                            <label :for="'HOCOT3radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCOT3'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCOT3'].Items[1].Value"/>
                          </span>
                        </template>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCOT4'] && HOCOTCount > 2" class="borded-bottom">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT4'].Items">
                    <th style="position: relative" :key="index" width="20%" v-if="index === 0">
                      <input class="form-control" v-model="item.Value" />
                      <button v-if="HOCOTCount === 3" @click="setHOCOTCount(2)" class="btn-pos-left"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </th>
                  </template>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT4'].Items" >
                        <template v-if="index > 0">
                          <span :key="index"  v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOT4radio-' + index" v-model="item.Value">
                            <label :for="'HOCOT4radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCOT4'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCOT4'].Items[1].Value"/>
                          </span>
                        </template>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['HOCOT5'] && HOCOTCount > 3" class="borded-bottom">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT5'].Items">
                    <th style="position: relative" :key="index" width="20%" v-if="index === 0">
                      <input class="form-control" v-model="item.Value" />
                      <button v-if="HOCOTCount === 4" @click="setHOCOTCount(3)" class="btn-pos-left"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </th>
                  </template>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT5'].Items" >
                        <template v-if="index > 0">
                          <span :key="index"  v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOT5radio-' + index" v-model="item.Value">
                            <label :for="'HOCOT5radio-' + index" @click="checkbox2Radio(MASTERDATA['HOCOT5'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['HOCOT5'].Items[1].Value"/>
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
                      <v-date-picker :readonly="viewOnly" class="full-w" :format="vDateTimeFormat" v-model="DataSubmit.HandOverTimeNurse"/>
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
                        <div class="italic">{{DataSubmit.HandOverTimeNurse}}</div>
                        <div class="flex align-center" style="justify-content: center;">
                          <div class="fw600 mrr5">
                            <ad-Info class="fw600" :ad="DataSubmit.UserNameHandOverNurse" />
                          </div>
                          <div class="italic fw400" style="color: green">({{__t('Đã ký xác nhận')}})</div>
                        </div>
                        <div class="fw600">{{DataSubmit.HandOverPhysician.Fullname}}</div>
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
                        <div class="flex align-center" style="justify-content: center;">
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
                      <v-date-picker :readonly="viewOnly" class="full-w" :format="vDateTimeFormat" v-model="DataSubmit.HandOverTimeNurse"/>
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
              <div class="tabs-footer">
                <!-- <button class="btn v-white-btn" type="button" @click="handleBack">{{__t('Quay lại')}}</button>
                <button class="btn v-yellow-btn pull-right long-btn" type="button" v-shortkey="['ctrl', 's']" @shortkey="SaveHandOverCheckList()" @click="SaveHandOverCheckList()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
                <button class="btn v-white-btn pull-right btn-block" type="button" @click="print()">In</button> -->
              </div>
              <FloatBlock>
                <template slot='buttons'>
                  <div class="col-md-4">
                    <div class="form-group1">
                      <button class="btn v-white-btn pull-right btn-block" type="button" v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('In')}}</button>
                    </div>
                  </div>
                  <div class="col-md-8" v-if="!viewOnly">
                    <div class="form-group1">
                      <button class="btn v-yellow-btn pull-right long-btn" type="button" v-shortkey="['ctrl', 's']" @shortkey="SaveHandOverCheckList()" @click="SaveHandOverCheckList()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
                    </div>
                  </div>
                </template>
              </FloatBlock>
              <logs :EdId="this.$route.params.Id" :Type="'ED/HandOverCheckList'" />
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
    </div>
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
import PatientHandOverRecord from '@/services/ED/PatientHandOverRecord'
import HandOverCheckList from '@/services/ED/HandOverCheckList'
import NProgress from 'nprogress'
import moment from 'moment'
// const isDate = (value) => !helpers.req(value) || moment(value, 'DD-MM-YYYY', true).isValid()
import MixinMasterData from '@/mixins/masterdata.js'
import _ from 'lodash'
import VSelect from '@/components/VSelect.vue'
import VDatePicker from '@/components/VDateTimePicker.vue'
import VSelectView from '@/components/VSelectDisplay.vue'
import MixinForm from '@/mixins/form.js'
import Logs from '@/components/Logs.vue'
import ObservationChart from '@/services/ObservationChart'
import PrintPhr from '@/components/ED/PRINT_PHR.vue'
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
      hasData: false,
      loading: true,
      HOCOTCount: 0,
      dataMaster: null,
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
    setHOCOTCount (c) {
      this.HOCOTCount = c
      this.MASTERDATA['HOCOT6'].Items[0].Value = this.HOCOTCount
      this.MASTERDATA[this.IPDHOCOT[c]].Items.forEach(e => {
        e.Value = null
      })
    },
    newIPDHOCOTH () {
      this.HOCOTCount++
      this.MASTERDATA['HOCOT6'].Items[0].Value = this.HOCOTCount
    },
    removeIPDHOCOTH () {
      this.HOCOTCount--
      this.MASTERDATA['HOCOT6'].Items[0].Value = this.HOCOTCount
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
    SavePatientHandOverRecord () {
      var DataSubmit = Object.assign({}, this.data)
      DataSubmit._Exception = []
      if (typeof DataSubmit.HandOverTimePhysician === 'object') {
        DataSubmit.HandOverTimePhysician = moment(DataSubmit.HandOverTimePhysician).format(this.vDateTimeFormat)
      }
      DataSubmit._Exception.push({
        key: 'HandOverTimePhysician',
        value: DataSubmit.HandOverTimePhysician
      })
      new PatientHandOverRecord().update(this.$route.params.Id, DataSubmit).then(response => {
        this.reload()
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    loadObservation (data) {
      new ObservationChart({VisitType: 'ED'}).find(this.$route.params.Id).then(response => {
        var val = response.Datas[response.Datas.length - 1]
        if (val) {
          data[2].Value = this.trim(`Huyết áp ${val.SysBP}/${val.DiaBP} mmHg, Mạch ${val.Pulse} nhịp/phút, Nhiệt độ: ${val.Temperature} độ C, Nhịp thở: ${val.Resp} lần/phút, Spo2: ${val.SpO2}%, Đau: ${val.RestPainScore}, Moving: ${val.MovePainScore}`, ', ')
        }
      })
    },
    SaveHandOverCheckList () {
      NProgress.start()
      var obj = {}
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

      if (!obj['HOCPAIYES']) {
        this.resetMdData('HOCPS0')
        this.resetMdData('HOCRP0')
      }
      var DataSubmit = Object.assign({}, this.DataSubmit)
      if (DataSubmit.HandOverTimeNurse && typeof DataSubmit.HandOverTimeNurse === 'object') {
        DataSubmit.HandOverTimeNurse = moment(DataSubmit.HandOverTimeNurse).format(this.vDateTimeFormat)
      }
      DataSubmit._Exception.push({
        key: 'HandOverTimeNurse',
        value: DataSubmit.HandOverTimeNurse
      })
      setTimeout(() => {
        this.DataSubmit.Room = {}
        new HandOverCheckList().update(this.$route.params.Id, DataSubmit).then(response => {
          this.toastedSuccess()
          this.edited = false
          this.reload()
        })
      }, 100)
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
    getHandOverCheckList () {
      this.getMasterDatas({Form: 'HOC'}, () => {
        new HandOverCheckList().find(this.$route.params.Id + '?hidemsg=' + true).then(response => {
          this.loading = false
          this.hasData = true
          // this.data = response
          this.DataSubmit = response
          this.IsUseHandOverCheckList = response.IsUseHandOverCheckList
          if (!this.DataSubmit.HandOverTimeNurse) {
            this.DataSubmit.HandOverTimeNurse = new Date()
          }
          // else {
          //   this.DataSubmit.HandOverTimeNurse = this.string2Moment(this.DataSubmit.HandOverTimeNurse)
          // }
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
          this.HOCOTCount = this.parseInt(this.MASTERDATA['HOCOT6'].Items[0].Value, 0)
          this.dataMaster = JSON.stringify(this.MASTERDATA)
        }).catch(e => {
          if (e.status) {
            // this.go2Home()
            this.loading = false
          }
        })
      })
    },
    getData () {
      new PatientHandOverRecord().find(this.$route.params.Id + '?hidemsg=' + true).then(response => {
        this.data = response
        this.Version = response.Version
        // if (!this.data.HandOverTimePhysician) {
        //   this.data.HandOverTimePhysician = new Date()
        // } else {
        //   this.data.HandOverTimePhysician = moment(this.data.HandOverTimePhysician, this.vDateTimeFormat)
        // }
      }).catch(e => {
        if (e.status) {
          // this.go2Home()
        }
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
    }
  }
}
</script>
