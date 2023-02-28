<template>
  <div class="main-content" id="etr-page">
    <!-- <h1 v-if="DataSubmit.Customer">Bệnh nhân: {{DataSubmit.Customer.Fullname}} - {{DataSubmit.Customer.PID}} <a href="#" class="pull-right">Xem chi tiết</a></h1> -->
    <h2 class="text-center">{{__t('Biên bản - Bảng kiểm bàn giao NB chuyển khoa')}}</h2>
    <template v-if="loaded && IsUseHandOverCheckList">
      <div class="v-tab" v-if="DataSubmit">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active" @click="tab = 'tab1'"><a href="#tab1" aria-controls="tab1" role="tab" data-toggle="tab">{{__t('PHR.bien_ban_ban_giao')}}</a></li>
          <li v-if="DataSubmit" role="presentation" @click="tab = 'tab2'"><a href="#tab2" aria-controls="tab2" role="tab" data-toggle="tab">{{__t('PHR.bang_kiem_ban_giao')}}</a></li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="tab1">
            <div class="box-table" v-if="tab === 'tab1'">
              <div class="box-table-header">
                {{__t('PHR.tinh_huong')}}
              </div>
              <div class="box-table-content">
                <p>
                  <b>{{__t('PHR.ly_do_chuyen')}}: </b>{{data.ReasonsForTransfer}}
                </p>
              </div>
              <div class="box-table-header">
                {{__t('PHR.dien_bien')}}
              </div>
              <div class="box-table-content">
                <p><b>{{__t('Lý do nhập viện')}}: </b>{{data.ReasonsForAdmission}}</p>
                <p><b>{{__t('PHR.qua_trinh_benh_ly')}}: </b>{{data.ClinicalEvolution}}</p>
                <p><b>{{__t('PHR.chuan_doan')}}: </b>{{fomartIcd(data.Diagnosis, data.ICDDiagnosis, data.CoMorbidities, data.ICDCoMorbidities)}}</p>
                <p style="margin-bottom: 0px!important;padding-bottom: 0px!important;"><b>{{__t('PHR.da_can_thiep')}}: </b><span v-html="data.TreatmentsAndProcedures"></span></p>
                <p v-if="data.SignificantMedications">{{__t('Các thuốc chính đã dùng')}}: {{data.SignificantMedications}}</p>
              </div>
              <div class="box-table-header">
                {{__t('PHR.danh_gia')}}
              </div>
              <div class="box-table-content">
                <p><b>{{__t('PHR.tinh_trang_nguoi_benh_hien_tai')}}: </b>{{data.CurrentCondition}}</p>
              </div>
              <div class="box-table-header">
                {{__t('PHR.de_xuat')}}
              </div>
              <div class="box-table-content">
                <p><b>{{__t('PHR.ke_hoach_tiep_theo')}}: </b>{{data.Recommendation}}</p>
              </div>
              <div class="">
                <table class="table table-bordered padding-td">
                  <tr>
                    <td width="33%" style="vertical-align: top;">
                    </td>
                    <td width="33%">
                      <div class="form-group">
                        <label>{{__t('noi_ban_giao')}}</label>
                        <input type="text" class="form-control" v-model="data.HandOverUnitPhysician" readonly>
                      </div>
                      <div class="form-group">
                        <label>{{__t('PHR.ho_va_ten_bac_si')}}</label>
                      </div>
                      <div :class="{'min-h-60': !data.UserNameHandOverPhysician}">
                        <div v-if="data.UserNameHandOverPhysician" class="text-center" style="transform: translateX(-90px);">
                          <div class="italic">{{data.HandOverTimePhysician | formatDateWithoutSecon}}</div>
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
                      <div class="form-group" :style ="data.PhysicianAcceptTime ? '' : 'margin-top: -60px !important'">
                        <label>{{__t('noinhanbn')}}</label>
                        <input type="text" class="form-control" v-model="data.ReceivingUnitPhysician" readonly>
                      </div>
                      <div class="form-group">
                        <label>{{__t('PHR.ho_va_ten_bac_si')}}</label>
                      </div>
                      <div :class="{'min-h-60': !data.UserNameReceivingPhysician}">
                        <div v-if="data.UserNameReceivingPhysician" class="text-center" style="transform: translateX(-80px) !important;">
                          <div class="italic">{{data.PhysicianAcceptTime}}</div>
                          <div class="flex align-center" style="margin-left: 90px !important">
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
                        <label>{{__t('noi_ban_giao')}}</label>
                        <input type="text" class="form-control" v-model="data.HandOverUnitPhysician" readonly>
                      </div>
                      <div class="form-group">
                        <label>{{__t('PHR.ho_va_ten_bac_si')}}</label>
                        <input type="text" class="form-control" v-model="data.HandOverPhysician" readonly>
                      </div>
                    </td>
                    <td width="33%">
                      <div class="form-group">
                        <label>{{__t('noinhanbn')}}</label>
                        <input type="text" class="form-control" v-model="data.ReceivingUnitPhysician" readonly>
                      </div>
                      <div class="form-group">
                        <label>{{__t('PHR.ho_va_ten_bac_si')}}</label>
                        <input type="text" class="form-control" v-model="data.ReceivingPhysician" readonly>
                      </div>
                    </td>
                  </tr> -->
                </table>
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
            <div class="box-table" v-if="tab === 'tab2'">
              <div class="box-table-header">
                {{__t('PHR.tinh_huong')}}
              </div>
              <div class="box-table-content">
                <p><b>{{__t('PHR.ten_ngay_sinh_PID')}}: </b> {{data.Fullname}}, {{data.DateOfBirth}}, {{data.PID}}</p>
                <p><b>{{__t('PHR.chan_doan_ten_phau_thuat')}}:</b> {{fomartIcd(data.Diagnosis, data.ICDDiagnosis, data.CoMorbidities, data.ICDCoMorbidities)}}</p>
                <p><b>{{__t('PHR.ten_bs_ktv')}}: </b>{{DataSubmit.Physician}}</p>
                <p><b>{{__t('PHR.ly_do_chuyen')}}: </b> {{data.ReasonsForTransfer}}</p>
              </div>
              <div class="box-table-header">
                {{__t('PHR.dien_bien')}}
              </div>
              <table class="table v-table-1 table-bordered">
                <tr v-if="MASTERDATA['IPDHOCALL']" class="borded-bottom highxlighted">
                  <!-- dị ứng -->
                  <th width="20%">{{__label(MASTERDATA['IPDHOCALL'])}}</th>
                  <td>
                    <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCALL'].Items" />
                    <div class="group-radio" v-else>
                      <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCALL'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'">
                          <input :class="'highlight-no-radio-' + (index + 1)"  type="checkbox" :id="'HOCALLradio-' + index" v-model="item.Value">
                          <label :for="'HOCALLradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCALL'].Items, item)">{{__label(item)}}</label>
                        </span>
                        <span :key="index" v-else-if="item.DataType === 'Select'">
                          <allergies-select v-model="item.Value" :multi="true" :items="JSON.parse(item.Data)" v-if="MASTERDATA['IPDHOCALL'].Items[0].Value"/>
                        </span>
                        <span :key="index" v-else style="flex-grow: 1;">
                          <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCALL'].Items[0].Value"/>
                        </span>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCICI']" class="borded-bottom">
                  <!-- Yêu cầu KSNK, cách ly -->
                  <th width="20%">{{__label(MASTERDATA['IPDHOCICI'])}}</th>
                  <td>
                    <div class="flex-box">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCICI'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCICI'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCICIradio-' + index" v-model="item.Value">
                            <label :for="'HOCICIradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCICI'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCICI'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['IPDHOCICI'].Items[0].Value" class="v-checkbox v-checkbox-list w300">
                            <input type="checkbox" :id="'HOCICIradio-' + index" v-model="item.Value">
                            <label :for="'HOCICIradio-' + index"></label>{{__label(item)}}
                          </span>
                          <span :key="index" v-if="item.DataType === 'Text' && MASTERDATA['IPDHOCICI'].Items[5].Value && MASTERDATA['IPDHOCICI'].Items[0].Value" style="flex-grow: 1;">
                            <input type="text" class="form-control" v-model="item.Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCRS0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCRS0'])}}</th>
                  <td>
                    <div class="flex-box">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCRS0'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCRS0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCRS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCRS0radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCRS0'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCRS0'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['IPDHOCRS0'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCRS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCRS0radio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCCLC']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCCLC'])}}</th>
                  <td>
                    <div class="flex-box">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCCLC'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCCLC'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCCLCradio-' + index" v-model="item.Value">
                            <label :for="'HOCCLCradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCCLC'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCCLC'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['IPDHOCCLC'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCCLCradio-' + index" v-model="item.Value">
                            <label :for="'HOCCLCradio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCPL0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCPL0'])}}</th>
                  <td>
                    <div class="flex-box">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCPL0'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCPL0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCPL0radio-' + index" v-model="item.Value">
                            <label :for="'HOCPL0radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCPL0'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCPL0'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['IPDHOCPL0'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCPL0radio-' + index" v-model="item.Value">
                            <label :for="'HOCPL0radio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCAC0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCAC0'])}}</th>
                  <td>
                    <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCAC0'].Items" />
                    <div class="group-radio" v-else>
                      <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCAC0'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                          <input type="checkbox" :id="'HOCAC0radio-' + index" v-model="item.Value">
                          <label :for="'HOCAC0radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCAC0'].Items, item)">{{__label(item)}}</label>
                        </span>
                        <span :key="index" v-else style="flex-grow: 1;">
                          <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCAC0'].Items[0].Value"/>
                        </span>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCOPC']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCOPC'])}}</th>
                  <td>
                    <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCOPC'].Items" />
                    <div class="group-radio" v-else>
                      <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCOPC'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                          <input type="checkbox" :id="'HOCOPCradio-' + index" v-model="item.Value">
                          <label :for="'HOCOPCradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCOPC'].Items, item)">{{__label(item)}}</label>
                        </span>
                        <span :key="index" v-else style="flex-grow: 1;">
                          <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCOPC'].Items[0].Value"/>
                        </span>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCSS0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCSS0'])}}</th>
                  <td>
                    <div class="flex-box">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCSS0'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCSS0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCSS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCSS0radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCSS0'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCSS0'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['IPDHOCSS0'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCSS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCSS0radio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCDRA']" class="borded-bottom">
                  <th width="20%">
                    {{__label(MASTERDATA['IPDHOCDRA'])}}
                    <!-- Dẫn lưu tổng số -->
                  </th>
                  <td>
                    <div class="flex-box">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCDRA'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCDRA'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCDRAradio-' + index" v-model="item.Value">
                            <label :for="'HOCDRAradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCDRA'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCDRA'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['IPDHOCDRA'].Items[0].Value" class="v-checkbox v-checkbox-list w300">
                            <input type="checkbox" :id="'HOCDRAradio-' + index" v-model="item.Value">
                            <label :for="'HOCDRAradio-' + index"></label>{{__label(item)}}
                          </span>
                          <span :key="index" v-if="item.DataType === 'Text' && MASTERDATA['IPDHOCDRA'].Items[4].Value" style="flex-grow: 1;">
                            <input type="text" class="form-control" v-model="item.Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCCBG']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCCBG'])}}</th>
                  <td>
                    <div class="">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCCBG'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCCBG'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCCBGradio-' + index" v-model="item.Value">
                            <label :for="'HOCCBGradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCCBG'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCCBG'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCID0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCID0'])}}</th>
                  <td>
                    <div class="">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCID0'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCID0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCID0radio-' + index" v-model="item.Value">
                            <label :for="'HOCID0radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCID0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCID0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCDR0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCDR0'])}}</th>
                  <td>
                    <div class="">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCDR0'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCDR0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCDR0radio-' + index" v-model="item.Value">
                            <label :for="'HOCDR0radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCDR0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCDR0'].Items[0].Value"/>
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
                <tr v-if="MASTERDATA['IPDHOCVS0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCVS0'])}}</th>
                  <td>
                    <div class="">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCVS0'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCVS0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCVS0radio-' + index" v-model="item.Value">
                            <label :for="'HOCVS0radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCVS0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <div style="position: relative;" v-if="MASTERDATA['IPDHOCVS0'].Items[0].Value">
                              <textarea-autosize class="form-control" v-model="item.Value"/>
                              <!-- <button @click="loadObservation(MASTERDATA['IPDHOCVS0'].Items)" class="btn-sync-sign"><i class="fa fa-refresh" aria-hidden="true"></i></button> -->
                            </div>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCFR0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCFR0'])}}</th>
                  <td>
                    <div class="">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCFR0'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCFR0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCFR0radio-' + index" v-model="item.Value">
                            <label :for="'HOCFR0radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCFR0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCFR0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCPAI']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCPAI'])}}</th>
                  <td>
                    <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCPAI'].Items" />
                    <div class="group-radio" v-else>
                      <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCPAI'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                          <input type="checkbox" :id="'HOCPAIradio-' + index" v-model="item.Value">
                          <label :for="'HOCPAIradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCPAI'].Items, item)">{{__label(item)}}</label>
                        </span>
                        <span :key="index" v-else style="flex-grow: 1;">
                          <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCPAI'].Items[0].Value"/>
                        </span>
                      </template>
                      <div style="flex-grow: 1;" v-if="MASTERDATA['IPDHOCPS0'] && MASTERDATA['IPDHOCPAI'].Items[0].Value" class="borded-bottom">
                        {{__label(MASTERDATA['IPDHOCPS0'])}}
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCPS0'].Items">
                          <template v-if="item.DataType === 'Select'">
                            <v-select :key="index" :placeholder="__t('Đơn vị')" v-model="item.Value" :items="JSONParse(item.Data) || []"/>
                          </template>
                          <template v-else>
                            <input :key="index" type="text" class="v-input-sm form-control" v-model="item.Value"/>
                          </template>
                        </template>
                      </div>
                    </div>
                    <template v-if="MASTERDATA['IPDHOCRP0'] && MASTERDATA['IPDHOCPAI'].Items[0].Value">
                    <p><label>{{__label(MASTERDATA['IPDHOCRP0'])}}</label></p>
                    <div class="flex-box">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCRP0'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCRP0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCRP0radio-' + index" v-model="item.Value">
                            <label :for="'HOCRP0radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCRP0'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="" v-if="MASTERDATA['IPDHOCRP0'].Items[0].Value">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCRP0'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCRP0radio-' + index" v-model="item.Value">
                            <label :for="'HOCRP0radio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                        <div v-if="MASTERDATA['IPDHOCRP0'].Items[8].Value">
                          <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCRP0'].Items">
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
                <tr v-if="MASTERDATA['IPDHOCCON']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCCON'])}}</th>
                  <td>
                    <div class="flex-box">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCCON'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCCON'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCCONradio-' + index" v-model="item.Value">
                            <label :for="'HOCCONradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCCON'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCCON'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['IPDHOCCON'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCCONradio-' + index" v-model="item.Value">
                            <label :for="'HOCCONradio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCOSS']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCOSS'])}}</th>
                  <td>
                    <div class="">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCOSS'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCOSS'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOSSradio-' + index" v-model="item.Value">
                            <label :for="'HOCOSSradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCOSS'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCOSS'].Items[0].Value"/>
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
                <tr v-if="MASTERDATA['IPDHOCFUC']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCFUC'])}}</th>
                  <td>
                    <div class="">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCFUC'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCFUC'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCFUCradio-' + index" v-model="item.Value">
                            <label :for="'HOCFUCradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCFUC'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCFUC'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCMO0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCMO0'])}}</th>
                  <td>
                    <div class="">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCMO0'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCMO0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCMO0radio-' + index" v-model="item.Value">
                            <label :for="'HOCMO0radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCMO0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCMO0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCWOU']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCWOU'])}}</th>
                  <td>
                    <div class="">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCWOU'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCWOU'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCWOUradio-' + index" v-model="item.Value">
                            <label :for="'HOCWOUradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCWOU'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCWOU'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCBLE']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCBLE'])}}</th>
                  <td>
                    <div class="">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCBLE'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCBLE'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCBLEradio-' + index" v-model="item.Value">
                            <label :for="'HOCBLEradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCBLE'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCBLE'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCPDT']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCPDT'])}}</th>
                  <td>
                    <div class="flex-box">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCPDT'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCPDT'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCPDTradio-' + index" v-model="item.Value">
                            <label :for="'HOCPDTradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCPDT'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                      <div class="">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCPDT'].Items">
                          <span :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['IPDHOCPDT'].Items[0].Value" class="v-checkbox v-checkbox-list">
                            <input type="checkbox" :id="'HOCPDTradio-' + index" v-model="item.Value">
                            <label :for="'HOCPDTradio-' + index"></label>{{__label(item)}}
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCPP0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCPP0'])}}</th>
                  <td>
                    <div class="">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCPP0'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCPP0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCPP0radio-' + index" v-model="item.Value">
                            <label :for="'HOCPP0radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCPP0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCPP0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCMR0']" class="borded-bottom">
                  <th width="20%">{{__label(MASTERDATA['IPDHOCMR0'])}}</th>
                  <td>
                    <div class="">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCMR0'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCMR0'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCMR0radio-' + index" v-model="item.Value">
                            <label :for="'HOCMR0radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCMR0'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCMR0'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCOTH']" class="borded-bottom">
                  <th width="20%">
                    {{__label(MASTERDATA['IPDHOCOTH'])}}<br/>
                    <button v-if="IPDHOCOTCount < 4 && viewOnly == false" @click="newIPDHOCOTH" class="btn-sync-data btn">THÊM</button>
                  </th>
                  <td>
                    <div class="">
                      <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCOTH'].Items" />
                      <div class="group-radio" v-else>
                        <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCOTH'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOTHradio-' + index" v-model="item.Value">
                            <label :for="'HOCOTHradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCOTH'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCOTH'].Items[0].Value"/>
                          </span>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCOT2'] && IPDHOCOTCount > 0" class="borded-bottom">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCOT2'].Items">
                    <th style="position: relative" :key="index" width="20%" v-if="index === 0">
                      <input class="form-control" v-model="item.Value" />
                      <button v-if="IPDHOCOTCount === 1" @click="setIPDHOCOTCount(0)" class="btn-pos-left"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </th>
                  </template>
                  <td>
                    <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCOT2'].Items" />
                    <div class="group-radio" v-else>
                      <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCOT2'].Items" >
                        <template v-if="index > 0">
                          <span :key="index"  v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOT2radio-' + index" v-model="item.Value">
                            <label :for="'HOCOT2radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCOT2'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCOT2'].Items[1].Value"/>
                          </span>
                        </template>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCOT3'] && IPDHOCOTCount > 1" class="borded-bottom">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCOT3'].Items">
                    <th style="position: relative" :key="index" width="20%" v-if="index === 0">
                      <input class="form-control" v-model="item.Value" />
                      <button v-if="IPDHOCOTCount === 2" @click="setIPDHOCOTCount(1)" class="btn-pos-left"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </th>
                  </template>
                  <td>
                    <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCOT3'].Items" />
                    <div class="group-radio" v-else>
                      <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCOT3'].Items" >
                        <template v-if="index > 0">
                          <span :key="index"  v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOT3radio-' + index" v-model="item.Value">
                            <label :for="'HOCOT3radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCOT3'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCOT3'].Items[1].Value"/>
                          </span>
                        </template>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCOT4'] && IPDHOCOTCount > 2" class="borded-bottom">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCOT4'].Items">
                    <th style="position: relative" :key="index" width="20%" v-if="index === 0">
                      <input class="form-control" v-model="item.Value" />
                      <button v-if="IPDHOCOTCount === 3" @click="setIPDHOCOTCount(2)" class="btn-pos-left"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </th>
                  </template>
                  <td>
                    <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCOT4'].Items" />
                    <div class="group-radio" v-else>
                      <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCOT4'].Items" >
                        <template v-if="index > 0">
                          <span :key="index"  v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOT4radio-' + index" v-model="item.Value">
                            <label :for="'HOCOT4radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCOT4'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCOT4'].Items[1].Value"/>
                          </span>
                        </template>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDHOCOT5'] && IPDHOCOTCount > 3" class="borded-bottom">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCOT5'].Items">
                    <th style="position: relative" :key="index" width="20%" v-if="index === 0">
                      <input class="form-control" v-model="item.Value" />
                      <button v-if="IPDHOCOTCount === 4" @click="setIPDHOCOTCount(3)" class="btn-pos-left"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </th>
                  </template>
                  <td>
                    <MDRadioView v-if="viewOnly" :data="MASTERDATA['IPDHOCOT5'].Items" />
                    <div class="group-radio" v-else>
                      <template :data="item"  v-for="(item,index) in MASTERDATA['IPDHOCOT5'].Items" >
                        <template v-if="index > 0">
                          <span :key="index"  v-if="item.DataType === 'Radio'" class="yes-no-box">
                            <input type="checkbox" :id="'HOCOT5radio-' + index" v-model="item.Value">
                            <label :for="'HOCOT5radio-' + index" @click="checkbox2Radio(MASTERDATA['IPDHOCOT5'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['IPDHOCOT5'].Items[1].Value"/>
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
                      <label>{{__t('noi_ban_giao')}}</label>
                      <input type="text" class="form-control" v-model="DataSubmit.HandOverUnitNurse" readonly>
                    </div>
                    <div class="form-group">
                      <label>{{__t('nguoibangiao')}}</label>
                    </div>
                    <div :class="{'min-h-60': !data.HandOverNurse}">
                      <div v-if="DataSubmit.HandOverNurse" class="text-center">
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
                      <label>{{__t('noinhanbn')}}</label>
                      <input type="text" class="form-control" v-model="DataSubmit.ReceivingUnitNurse" readonly>
                    </div>
                    <div class="form-group">
                      <label>{{__t('nguoinhanbangiao')}}</label>
                    </div>
                    <div :class="{'min-h-60': !data.ReceivingNurse}">
                      <div v-if="DataSubmit.ReceivingNurse" class="text-center">
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
                      <v-date-picker :readonly="viewOnly" class="full-w" :format="vDateTimeFormat" v-model="DataSubmit.HandOverTimeNurse"/>
                    </div>
                  </td>
                  <td width="33%">
                    <div class="form-group">
                      <label>{{__t('noi_ban_giao')}}</label>
                      <input type="text" class="form-control" v-model="DataSubmit.HandOverUnitNurse" readonly>
                    </div>
                    <div class="form-group">
                      <label>{{__t('nguoibangiao')}}</label>
                      <input type="text" class="form-control" v-model="DataSubmit.HandOverNurse" readonly>
                    </div>
                  </td>
                  <td width="33%">
                    <div class="form-group">
                      <label>{{__t('PHR.noi_nhan_ban_giao')}}</label>
                      <input type="text" class="form-control" v-model="DataSubmit.ReceivingUnitNurse" readonly>
                    </div>
                    <div class="form-group">
                      <label>{{__t('nguoinhanbangiao')}}</label>
                      <input type="text" class="form-control" v-model="DataSubmit.ReceivingNurse" readonly>
                    </div>
                  </td>
                </tr> -->
              </table>
              <FloatBlock>
                <template slot='buttons'>
                  <div class="col-md-4">
                    <div class="form-group1">
                      <button class="btn v-white-btn pull-right btn-block" type="button" v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('In')}}</button>
                    </div>
                  </div>
                  <div class="col-md-8" v-if="!viewOnly">
                    <div class="form-group1">
                      <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" v-shortkey="['ctrl', 's']" @shortkey="SaveHandOverCheckList()" type="button" @click="SaveHandOverCheckList()">{{__t('btn.save')}}</button>
                    </div>
                  </div>
                </template>
              </FloatBlock>
              <logs :EdId="this.$route.params.Id" :Type="'IPD/HandOverCheckList'" />
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
import PatientHandOverRecord from '@/services/IPD/PatientHandOverRecord'
import HandOverCheckList from '@/services/IPD/HandOverCheckList'
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
// import ObservationChart from '@/services/ED/ObservationChart'
import PrintPhr from '@/components/IPD/PRINT_PHR.vue'
import moment from 'moment'
export default {
  /**
   * The name of the page.
   */
  name: 'PHR',
  // props: ['viewOnly'],
  data () {
    return {
      tab: 'tab1',
      data: {},
      DataSubmit: null,
      hasPrint: false,
      loaded: false,
      IPDHOCOT: ['IPDHOCOT2', 'IPDHOCOT3', 'IPDHOCOT4', 'IPDHOCOT5'],
      IPDHOCOTCount: 0,
      viewOnly: false,
      IsUseHandOverCheckList: true,
      Version: 0
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
      this.MASTERDATA['IPDHOCOT6'].Items[0].Value = this.IPDHOCOTCount
      this.MASTERDATA[this.IPDHOCOT[c]].Items.forEach(e => {
        e.Value = null
      })
    },
    newIPDHOCOTH () {
      this.IPDHOCOTCount++
      this.MASTERDATA['IPDHOCOT6'].Items[0].Value = this.IPDHOCOTCount
    },
    removeIPDHOCOTH () {
      this.IPDHOCOTCount--
      this.MASTERDATA['IPDHOCOT6'].Items[0].Value = this.IPDHOCOTCount
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
    // SavePatientHandOverRecord () {
    //   var DataSubmit = Object.assign({}, this.data)
    //   if (typeof DataSubmit.HandOverTimePhysician === 'object') {
    //     DataSubmit.HandOverTimePhysician = this.moment2String(DataSubmit.HandOverTimePhysician)
    //   }
    //   new PatientHandOverRecord().update(this.$route.params.Id, DataSubmit).then(response => {
    //   }).catch(e => {
    //     if (e.status) {
    //     }
    //   })
    // },
    loadObservation (data) {
      // new ObservationChart().find(this.$route.params.Id).then(response => {
      //   var val = response.Datas[response.Datas.length - 1]
      //   if (val) {
      //     data[2].Value = this.trim(`Huyết áp ${val.SysBP}/${val.DiaBP} mmHg, Mạch ${val.Pulse} lần/phút, Nhiệt độ: ${val.Temperature} độ C, Nhịp thở: ${val.Resp} lần/phút, Spo2: ${val.SpO2}%, Đau: ${val.RestPainScore}, Moving: ${val.MovePainScore}`, ', ')
      //   }
      // })
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
      if (!obj['IPDHOCPAIYES']) {
        this.resetMData('IPDHOCPS0')
        this.resetMData('IPDHOCRP0')
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
      this.getMasterDatas({Form: 'IPDHOC'}, () => {
        new HandOverCheckList().find(this.$route.params.Id + '?hidemsg=' + true).then(response => {
          this.loaded = true
          this.DataSubmit = response
          if (!this.DataSubmit.HandOverTimeNurse) {
            this.DataSubmit.HandOverTimeNurse = moment(new Date()).format(this.format || 'HH:mm DD/MM/YYYY' || 'DD/MM/YYYY')
          } else {
            this.DataSubmit.HandOverTimeNurse = this.string2Moment(this.DataSubmit.HandOverTimeNurse)
          }
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(this.DataSubmit.Datas, {Code: code})
                // if ('IPDHOCICI' === property) {
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
          this.IPDHOCOTCount = this.parseInt(this.MASTERDATA['IPDHOCOT6'].Items[0].Value, 0)
        }).catch(e => {
          console.log(e)
          if (e.status) {
            this.loaded = true
          }
        })
      })
    },
    IPDOENBMIlabel () {
      if (this.data.IsTelehealth) {
        return
      }
      var y1 = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'IPDOENTUOI519')
      var IPDOENBMI = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'IPDOENBMIANS')
      if (y1 && IPDOENBMI) {
        var y2 = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'IPDOENTUOI19')
        var y3 = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'IPDOENTUOI5')
        if (y2.Value === 'True') {
          IPDOENBMI.ViName = 'BMI'
          IPDOENBMI.EnName = 'BMI (over 19 years old)'
        }
        if (y1.Value === 'True') {
          IPDOENBMI.ViName = 'BMI theo Z-score'
          IPDOENBMI.EnName = 'BMI by Z-score (5-19 years old)'
        }
        if (y3.Value === 'True') {
          IPDOENBMI.ViName = 'Z-score theo cân nặng/tuổi, chiều/tuổi,cân nặng/chiều cao theo tuổi và giới'
          IPDOENBMI.EnName = 'Z-score by weight / age'
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
        this.data = response
        this.Version = response.Version
        this.viewOnly = response.IsLocked
        this.IsUseHandOverCheckList = response.IsUseHandOverCheckList
        if (this.IsUseHandOverCheckList === undefined || this.IsUseHandOverCheckList === null) {
          this.IsUseHandOverCheckList = true
        }
        console.log(this.IsUseHandOverCheckList)
        // if (!this.data.HandOverTimePhysician) {
        //   this.data.HandOverTimePhysician = new Date()
        // } else {
        //   this.data.HandOverTimePhysician = moment(this.data.HandOverTimePhysician, this.vDateTimeFormat)
        // }
        this.IPDOENBMIlabel()
      }).catch(e => {
        if (e.status) {
          // this.go2Home()
        }
      })
    }
  }
}
</script>
