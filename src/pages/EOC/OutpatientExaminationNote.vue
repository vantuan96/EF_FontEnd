<template>
  <div v-if="DataSubmit" class="main-content" id="OutpatientExaminationNote-page">
    <template>
      <initial-assessment :OpdId="$route.params.Id" />
      <template v-if="isPrimaryDoctorOrAuthorizedDoctor">
        <!-- <patient-progress-notes :Readonly="true" :VisitId="this.$route.params.Id"/>
        <standing-order /> -->
        <div id="OutpatientExaminationNoteForm">
          <h1 class="text-center">{{__t('Phiếu khám bệnh')}}</h1>
          <div class="tbl-title">1. {{__t('Đánh giá chung')}}</div>
          <div class="box box-table">
            <div class="box-body">
              <div class="row">
                <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENPUL']">
                  <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENPUL'].Items">
                    <label>{{__label(item)}} <i class="unit-label">({{__t(item.Note)}})</i></label>
                    <div class="fake-input disable">{{DataSubmit.Customer.Pulse || 'N/A'}}</div>
                  </div>
                </div>
                <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENTEM']">
                  <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENTEM'].Items">
                    <label>{{__label(item)}} <i class="unit-label">({{__t(item.Note)}})</i></label>
                    <div class="fake-input disable">{{DataSubmit.Customer.T || 'N/A'}}</div>
                  </div>
                </div>
                <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENBP0']">
                  <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENBP0'].Items">
                    <label>{{__label(item)}} <i class="unit-label">({{__t(item.Note)}})</i></label>
                    <div class="fake-input disable">{{DataSubmit.Customer.BP || 'N/A'}}</div>
                  </div>
                </div>
                <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENSPO']">
                  <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENSPO'].Items">
                    <label>{{__label(item)}} <i class="unit-label">({{__t(item.Note)}})</i></label>
                    <div class="fake-input disable">{{DataSubmit.Customer.SpO2 || 'N/A'}}</div>
                  </div>
                </div>
                <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENRR0']">
                  <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENRR0'].Items">
                    <label>{{__label(item)}} <i class="unit-label" v-if="item.Note">({{__t(item.Note)}})</i></label>
                    <div class="fake-input disable">{{DataSubmit.Customer.RR || 'N/A'}}</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENHEI']">
                  <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENHEI'].Items">
                    <label>{{__label(item)}} <i class="unit-label" v-if="item.Note">({{__t(item.Note)}})</i></label>
                    <div class="fake-input disable">{{DataSubmit.Customer.Height || 'N/A'}}</div>
                  </div>
                </div>
                <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENWEI']">
                  <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENWEI'].Items">
                    <label>{{__label(item)}} <i class="unit-label" v-if="item.Note">({{__t(item.Note)}})</i></label>
                    <div class="fake-input disable">{{DataSubmit.Customer.Weight || 'N/A'}}</div>
                  </div>
                </div>
                <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENWEI']">
                  <div class="form-group">
                    <label>BMI <i class="unit-label"></i></label>
                    <input class="form-control" readonly :value="bmiCalculation">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>{{__t('Thời gian khám')}}</label>
                    <v-date-time-picker v-model="DataSubmit.ExaminationTime" class="full-w" :format="vDateTimeFormat"/>
                  </div>
                </div>
              </div>
              <md-input-text v-model="MASTERDATA['OPDOENCC0']"/>
              <!-- <div class="row">
                <div class="col-md-12" v-if="MASTERDATA['OPDOENCC0']">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['OPDOENCC0'])}} <i class="unit-label">{{MASTERDATA['OPDOENCC0'].Note}}</i></label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENCC0'].Items">
                      <textarea-autosize :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                    </div>
                  </div>
                </div>
              </div> -->
              <div class="row" v-if="MASTERDATA['OPDOENPMH'] && DataSubmit.Clinic && DataSubmit.Clinic.Code !== 'FreeTextOnly-000'">
                <div class="col-md-12">
                  <div class="form-group bg-gray-2">
                    <label>
                      {{__label(MASTERDATA['OPDOENPMH'])}} <i class="unit-label">{{MASTERDATA['OPDOENPMH'].Note}}</i>
                    </label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENPMH'].Items">
                      <textarea-autosize :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                    </div>
                    <div class="HistoryOfPresentIllness"  v-if="SyncPastMedicalHistory && SyncPastMedicalHistory.length">
                      <label>{{__t('Thông tin khai thác tiền sử bệnh')}}</label>
                      <vue-scrolling-table v-if="SyncPastMedicalHistory.length">
                        <template slot="tbl">
                          <table class="table table-bordered table-bordered-x">
                            <thead>
                              <tr>
                                <th width="1" class="no-wrap">{{__t('Ngày khám')}}</th>
                                <th width="1" class="no-wrap">{{__t('Bác sĩ khám')}}</th>
                                <th width="1" class="no-wrap">{{__t('Khoa Phòng')}}</th>
                                <th>{{__t('Tiền sử bệnh')}}</th>
                                <th width="1"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr :data="item" :key="index"  v-for="(item, index) in SyncPastMedicalHistory">
                                <td class="no-wrap">{{item.ExaminationTime}}</td>
                                <td class="no-wrap"><ad-Info :ad="item.PrimaryDoctor" :type="item.Type" /></td>
                                <td class="no-wrap">{{__label(item.Clinic)}}</td>
                                <td><p v-if="item.Value">{{item.Value}}</p></td>
                                <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyOPDOENPMH(item.Value)">Copy</button></td>
                              </tr>
                            </tbody>
                          </table>
                        </template>
                      </vue-scrolling-table>
                    </div>
                  </div>
                </div>
              </div>
              <template v-if="MASTERDATA['OPDOENPMH'] && DataSubmit.Clinic && DataSubmit.Clinic.Code === 'FreeTextOnly-000'">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group bg-gray-2">
                      <label>{{__t('Tiền sử bệnh')}}</label>
                      <div class="HistoryOfPresentIllness"  v-if="SyncPastMedicalHistory && SyncPastMedicalHistory.length">
                        <label>{{__t('Thông tin khai thác tiền sử bệnh')}}</label>
                        <vue-scrolling-table v-if="SyncPastMedicalHistory.length">
                          <template slot="tbl">
                            <table class="table table-bordered table-bordered-x">
                              <thead>
                                <tr>
                                  <th width="1" class="no-wrap">{{__t('Ngày khám')}}</th>
                                  <th width="1" class="no-wrap">{{__t('Bác sĩ khám')}}</th>
                                  <th width="1" class="no-wrap">{{__t('Khoa Phòng')}}</th>
                                  <th>{{__t('Tiền sử bệnh')}}</th>
                                  <th width="1"></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr :data="item" :key="index"  v-for="(item, index) in SyncPastMedicalHistory">
                                  <td class="no-wrap">{{item.ExaminationTime}}</td>
                                  <td class="no-wrap"><ad-Info :ad="item.PrimaryDoctor" :type="item.Type"/></td>
                                  <td class="no-wrap">{{__label(item.Clinic)}}</td>
                                  <td><p>{{item.Value}}</p></td>
                                  <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyOPDOENPMH(item.Value)">Copy</button></td>
                                </tr>
                              </tbody>
                            </table>
                          </template>
                        </vue-scrolling-table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row" :data="c" :key="'OPDOENTSSK' + j" v-for="(c,j) in OPDOENTSSK" v-if="MASTERDATA[c] && showWithClinic(MASTERDATA[c].Clinic)">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA[c])}} <i class="unit-label">{{MASTERDATA[c].Note}}</i></label>
                      <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA[c].Items">
                        <textarea-autosize :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div class="row highlighted-">
                <div class="col-md-12" v-if="MASTERDATA['OPDOENHOA']">
                  <div class="form-group bg-gray-2">
                    <div class="v-row" v-if="InitialAssessmentAllergies">
                      <div class="group-radio cp-block">
                        <b style="padding: 7px 10px 0 0" class="no-wrap">{{__t('Thông tin tiền sử dị ứng điều dưỡng đã khai khác')}}</b>
                        <input readonly v-model="InitialAssessmentAllergies" class="form-control " />
                        <button class="btn btn-xs v-white-btn" @click="copyToOPDOENHOA(InitialAssessmentAllergies)">Copy</button>
                      </div>
                    </div>
                    <label class="color-red"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> {{__label(MASTERDATA['OPDOENHOA'])}} <i class="unit-label">{{MASTERDATA['OPDOENHOA'].Note}}</i></label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENHOA'].Items">
                      <textarea-autosize :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                    </div>
                    <div class="HistoryOfPresentIllness"  v-if="HistoryOfAllergies && HistoryOfAllergies.length">
                      <label> {{HistoryOfAllergies.length ? 'Thông tin khai thác dị ứng' : 'Không có thông tin khai thác dị ứng'}}</label>
                      <vue-scrolling-table v-if="HistoryOfAllergies.length">
                        <template slot="tbl">
                          <table class="table table-bordered table-bordered-x" v-if="HistoryOfAllergies.length">
                            <thead>
                              <tr>
                                <th width="1" class="no-wrap">{{__t('Ngày khám')}}</th>
                                <th width="1" class="no-wrap">{{__t('Bác sĩ khám')}}</th>
                                <th width="1" class="no-wrap">{{__t('Khoa Phòng')}}</th>
                                <th>{{__t('Tiền sử dị ứng')}}</th>
                                <th width="1"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr :data="HistoryOfAllergie" :key="index"  v-for="(HistoryOfAllergie, index) in HistoryOfAllergies">
                                <td class="no-wrap">{{HistoryOfAllergie.ExaminationTime}}</td>
                                <td class="no-wrap"><ad-Info :ad="HistoryOfAllergie.Username" :type="HistoryOfAllergie.Type"/></td>
                                <td class="no-wrap">{{__label(HistoryOfAllergie)}}</td>
                                <td><p v-if="HistoryOfAllergie.HistoryOfAllergies">{{HistoryOfAllergie.HistoryOfAllergies}}</p></td>
                                <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyToOPDOENHOA(HistoryOfAllergie.HistoryOfAllergies)">Copy</button></td>
                              </tr>
                            </tbody>
                          </table>
                        </template>
                      </vue-scrolling-table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12" v-if="MASTERDATA['OPDOENHPI']">
                  <div class="form-group bg-gray-2">
                    <label>{{__label(MASTERDATA['OPDOENHPI'])}} <i class="unit-label">{{MASTERDATA['OPDOENHPI'].Note}}</i></label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENHPI'].Items">
                      <textarea-autosize :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                    </div>
                    <div class="HistoryOfPresentIllness"  v-if="SyncHistoryOfPresentIllness && SyncHistoryOfPresentIllness.length">
                      <label> {{__t('Thông tin khai thác bệnh sử')}}</label>
                      <vue-scrolling-table v-if="SyncHistoryOfPresentIllness.length">
                        <template slot="tbl">
                          <table class="table table-bordered table-bordered-x">
                            <thead>
                              <tr>
                                <th width="130" class="no-wrap">{{__t('Ngày khám')}}</th>
                                <th width="1" class="no-wrap">{{__t('Người tạo')}}</th>
                                <th width="1" class="no-wrap">{{__t('Khoa Phòng')}}</th>
                                <th>{{__t('Nội dung')}}</th>
                                <th width="1"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr :data="HistoryOfPresent" :key="index"  v-for="(HistoryOfPresent, index) in SyncHistoryOfPresentIllness">
                                <td class="no-wrap">{{HistoryOfPresent.ExaminationTime}}</td>
                                <td class="no-wrap"><ad-Info :ad="HistoryOfPresent.Username" :type="HistoryOfPresent.Type"/></td>
                                <td class="no-wrap">{{__label(HistoryOfPresent)}}</td>
                                <td><p v-if="HistoryOfPresent.HistoryOfPresentIllness">{{HistoryOfPresent.HistoryOfPresentIllness}}</p></td>
                                <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyToOPDOENHPI(HistoryOfPresent.HistoryOfPresentIllness)">Copy</button></td>
                              </tr>
                            </tbody>
                          </table>
                        </template>
                      </vue-scrolling-table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box box-table" v-if="Version === 2">
              <div class="box-body">
                <label>
                  {{__t('Khám lâm sàng (Hiển thị trên báo cáo y tế)')}}
                  <!-- <button id="btn-24hsync" class="btn btn-sync-data" @click="syncGetAction()">{{__t('Lấy dữ liệu')}}</button> -->
                </label>
                <div class="mt-20">
                  <!-- khám lâm sàng v2 -->
                  <md-input-text v-if="MASTERDATA['OPDOENKTTV2']" :placeholder="__t('Nhập')" :groupDefaultLib="'GENTVKBBGEEX'" v-model="MASTERDATA['OPDOENKTTV2']"/>
                  <!-- <p style="transform: translate(10px, -6px);
                    color: red;
                    font-style: italic;">không được để trống</p> -->
                </div>
                <!-- 2 -->
                <div class="mt-20">
                  <md-input-text v-if="MASTERDATA['OPDOENKCK']" v-model="MASTERDATA['OPDOENKCK']" :defaultLib="'GENTCTBL2'" :title="__t('Mở thư viện tham khảo')" />
                </div>
                <!-- 3 -->
                <div class="mt-20">
                  <md-input-text v-if="MASTERDATA['OPDOENKHHV2']" v-model="MASTERDATA['OPDOENKHHV2']"  :groupDefaultLib="'GENTVKBBCAEX'" :title="__t('Mở thư viện tham khảo')" />
                </div>
                <!-- 4 -->
                <div class="mt-20">
                  <md-input-text v-if="MASTERDATA['OPDOENKBPK']" v-model="MASTERDATA['OPDOENKBPK']" :groupDefaultLib="'GENTVKBBOTOE'" :title="__t('Mở thư viện tham khảo')"/>
                </div>
              </div>
            </div>
              <div v-if="Version === 1"><md-input-text v-if="MASTERDATA['OPDOENCEF'] && DataSubmit.Clinic && DataSubmit.Clinic.Code === 'Normal'" v-model="MASTERDATA['OPDOENCEF']"/></div>
            </div>
          </div>
          <div class="box box-table">
            <div class="box-body">
              <label>
                {{__t('Khai thác thông tin thuốc đã dùng tại nhà (nếu có)')}}
                <!-- <button id="btn-24hsync" class="btn btn-sync-data" @click="syncGetAction()">{{__t('Lấy dữ liệu')}}</button> -->
              </label>
              <list-of-current-medications
                ref="ListOfCurrentMedications"
                :Type="'EOC-PatientMedicationList'"
                :VisitTypeGroupCode="'EOC'"
              />
            </div>
          </div>
          <!-- <div class="tbl-title">3Khám lâm sàng (Hiển thị trên báo cáo y tế)></div> -->
          <div class="box box-table">
            <div class="box-body">
              <!-- khám lâm sàng -->
              <div class="kls-block" v-if="DataSubmit.Clinic && DataSubmit.Clinic.Code !== 'Normal'">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>{{__t('Khám lâm sàng (Hiển thị trên báo cáo y tế)')}}</label>
                    </div>
                  </div>
                </div>
                <div class="box box-table" style="background: #eceaea;" v-if="DataSubmit.Clinic.Code !== 'MultiSelect-002'">
                  <div class="box-body">
                    <div class="row" v-if="MASTERDATA['OPDOENNLHTE'] && showWithClinic(MASTERDATA['OPDOENNLHTE'].Clinic)">
                      <div class="col-md-12">
                        <div class="form-group">
                          <div class="group-radio">
                            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDOENNLHTE'].Items">
                              <input type="checkbox" :id="'OPDOENNLHTEradio-' + index" v-model="item.Value">
                              <label :for="'OPDOENNLHTEradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDOENNLHTE'].Items, item)">{{__label(item)}}</label>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="MASTERDATA['OPDOENTUOI'] && showWithClinic(MASTERDATA['OPDOENTUOI'].Clinic)">
                      <div class="col-md-12">
                        <div class="form-group">
                          <div class="group-radio">
                            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDOENTUOI'].Items">
                              <input type="checkbox" :id="'OPDOENTUOIradio-' + index" v-model="item.Value">
                              <label :for="'OPDOENTUOIradio-' + index" @click="checkbox2RadioOPDOENTUOI(MASTERDATA['OPDOENTUOI'].Items, item)">{{__label(item)}}</label>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="MASTERDATA['OPDOENBNTHPT'] && showWithClinic(MASTERDATA['OPDOENBNTHPT'].Clinic)">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>{{__label(MASTERDATA['OPDOENBNTHPT'])}} <i class="unit-label">{{MASTERDATA['OPDOENBNTHPT'].Note}}</i></label>
                          <div class="group-radio">
                            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDOENBNTHPT'].Items">
                              <input type="checkbox" :id="'OPDOENBNTHPTradio-' + index" v-model="item.Value">
                              <label :for="'OPDOENBNTHPTradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDOENBNTHPT'].Items, item)">{{__label(item)}}</label>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="MASTERDATA['OPDOENDG'] && showWithClinic(MASTERDATA['OPDOENDG'].Clinic)">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>{{__label(MASTERDATA['OPDOENDG'])}} <i class="unit-label">{{MASTERDATA['OPDOENDG'].Note}}</i></label>
                          <div class="group-radio">
                            <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDOENDG'].Items">
                              <input type="checkbox" :id="'OPDOENDGradio-' + index" v-model="item.Value">
                              <label :for="'OPDOENDGradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDOENDG'].Items, item)">{{__label(item)}}</label>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <md-input-text :groupDefaultLib="'GENTVKBBGEEX'" v-if="MASTERDATA['OPDOENKTT'] && showWithClinic(MASTERDATA['OPDOENKTT'].Clinic)" v-model="MASTERDATA['OPDOENKTT']"/>
                    <template v-if="hasKCK()">
                      <md-input-text :defaultLib="'GENTCTBL2'" v-if="MASTERDATA['OPDOENKCK'] && showWithClinic(MASTERDATA['OPDOENKCK'].Clinic)" v-model="MASTERDATA['OPDOENKCK']">
                      </md-input-text>
                    </template>
                    <md-input-text v-if="MASTERDATA['OPDOENKTP'] && hideWithOPDOENDG() && showWithClinic(MASTERDATA['OPDOENKTP'].Clinic)" :groupDefaultLib="'GENTVKBBCAEX'" v-model="MASTERDATA['OPDOENKTP']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENKTP'] && showWithOPDOENDG() && showWithClinic(MASTERDATA['OPDOENKTP'].Clinic)" :groupDefaultLib="'GENTVKBBCAEX'" v-model="MASTERDATA['OPDOENKTP']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENTSKN'] && showWithClinic(MASTERDATA['OPDOENTSKN'].Clinic) && DataSubmit.Clinic.Code !== 'FreeTextOnly-000'" v-model="MASTERDATA['OPDOENTSKN']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENTSK'] && showWithClinic(MASTERDATA['OPDOENTSK'].Clinic) && DataSubmit.Clinic.Code !== 'FreeTextOnly-000'" v-model="MASTERDATA['OPDOENTSK']"/>
                    <md-input-text :groupDefaultLib="'GENTVKBBCAEX'" v-if="MASTERDATA['OPDOENKTP1'] && showWithClinic(MASTERDATA['OPDOENKTP1'].Clinic) && MASTERDATA['OPDOENBNTHPT'].Items[0].Value === true" v-model="MASTERDATA['OPDOENKTP1']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENNGNG'] && showWithClinic(MASTERDATA['OPDOENNGNG'].Clinic)" v-model="MASTERDATA['OPDOENNGNG']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENNTTTXH'] && showWithClinic(MASTERDATA['OPDOENNTTTXH'].Clinic)" v-model="MASTERDATA['OPDOENNTTTXH']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENHVTTCY'] && showWithClinic(MASTERDATA['OPDOENHVTTCY'].Clinic)" v-model="MASTERDATA['OPDOENHVTTCY']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENCGXG'] && showWithClinic(MASTERDATA['OPDOENCGXG'].Clinic)" v-model="MASTERDATA['OPDOENCGXG']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENKTTPV'] && showWithClinic(MASTERDATA['OPDOENKTTPV'].Clinic)" v-model="MASTERDATA['OPDOENKTTPV']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENMSTTLCT'] && showWithClinic(MASTERDATA['OPDOENMSTTLCT'].Clinic)" v-model="MASTERDATA['OPDOENMSTTLCT']"/>
                    <md-input v-if="MASTERDATA['OPDOENBMI'] && showWithClinic(MASTERDATA['OPDOENBMI'].Clinic)" v-model="MASTERDATA['OPDOENBMI']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENKTTTHGC'] && showWithClinic(MASTERDATA['OPDOENKTTTHGC'].Clinic)" v-model="MASTERDATA['OPDOENKTTTHGC']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENDGCGNM'] && showWithClinic(MASTERDATA['OPDOENDGCGNM'].Clinic)" v-model="MASTERDATA['OPDOENDGCGNM']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENDGDNM'] && showWithClinic(MASTERDATA['OPDOENDGDNM'].Clinic)" v-model="MASTERDATA['OPDOENDGDNM']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENKLN'] && showWithClinic(MASTERDATA['OPDOENKLN'].Clinic)" v-model="MASTERDATA['OPDOENKLN']"/>
                    <md-input-text :groupDefaultLib="'GENTVKBBCAEX'" v-if="MASTERDATA['OPDOENKTM'] && showWithClinic(MASTERDATA['OPDOENKTM'].Clinic)" v-model="MASTERDATA['OPDOENKTM']"/>
                    <md-input-text :groupDefaultLib="'GENTVKBBPUEX'" v-if="MASTERDATA['OPDOENKHH'] && showWithClinic(MASTERDATA['OPDOENKHH'].Clinic)" v-model="MASTERDATA['OPDOENKHH']">
                    </md-input-text>
                    <md-input-text :groupDefaultLib="'GENTVKBBOTOE'" v-if="MASTERDATA['OPDOENKCBPK'] && showWithClinic(MASTERDATA['OPDOENKCBPK'].Clinic)" v-model="MASTERDATA['OPDOENKCBPK']">
                    </md-input-text>
                    <md-input-text v-if="MASTERDATA['OPDOENBHC'] && showWithClinic(MASTERDATA['OPDOENBHC'].Clinic)" v-model="MASTERDATA['OPDOENBHC']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENKYT'] && showWithClinic(MASTERDATA['OPDOENKYT'].Clinic)" v-model="MASTERDATA['OPDOENKYT']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENKCGTG'] && showWithClinic(MASTERDATA['OPDOENKCGTG'].Clinic)" v-model="MASTERDATA['OPDOENKCGTG']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENKTD'] && showWithClinic(MASTERDATA['OPDOENKTD'].Clinic)" v-model="MASTERDATA['OPDOENKTD']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENKCX'] && showWithClinic(MASTERDATA['OPDOENKCX'].Clinic)" v-model="MASTERDATA['OPDOENKCX']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENKHD'] && showWithClinic(MASTERDATA['OPDOENKHD'].Clinic)" v-model="MASTERDATA['OPDOENKHD']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENKCY'] && showWithClinic(MASTERDATA['OPDOENKCY'].Clinic)" v-model="MASTERDATA['OPDOENKCY']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENKTN'] && showWithClinic(MASTERDATA['OPDOENKTN'].Clinic)" v-model="MASTERDATA['OPDOENKTN']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENKTRT'] && showWithClinic(MASTERDATA['OPDOENKTRT'].Clinic)" v-model="MASTERDATA['OPDOENKTRT']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENTTL'] && showWithClinic(MASTERDATA['OPDOENTTL'].Clinic)" v-model="MASTERDATA['OPDOENTTL']"/>
                    <template v-if="isOPDOENKNKT()">
                      <md-input-text :defaultLib="'GENTCTBL2'" v-if="MASTERDATA['OPDOENKNKT'] && showWithClinic(MASTERDATA['OPDOENKNKT'].Clinic)" v-model="MASTERDATA['OPDOENKNKT']">
                      </md-input-text>
                    </template>
                    <template v-if="MASTERDATA['OPDOENDG'] && MASTERDATA['OPDOENDG'].Items[0].Value === true">
                      <md-input-text v-if="MASTERDATA['OPDOENMCN'] && showWithClinic(MASTERDATA['OPDOENMCN'].Clinic)" v-model="MASTERDATA['OPDOENMCN']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENDCT'] && showWithClinic(MASTERDATA['OPDOENDCT'].Clinic)" v-model="MASTERDATA['OPDOENDCT']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTDTT'] && showWithClinic(MASTERDATA['OPDOENTDTT'].Clinic)" v-model="MASTERDATA['OPDOENTDTT']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTHCVD'] && showWithClinic(MASTERDATA['OPDOENTHCVD'].Clinic)" v-model="MASTERDATA['OPDOENTHCVD']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENPHCN'] && showWithClinic(MASTERDATA['OPDOENPHCN'].Clinic)" v-model="MASTERDATA['OPDOENPHCN']"/>
                    </template>
                    <template v-if="MASTERDATA['OPDOENDG'] && MASTERDATA['OPDOENDG'].Items[1].Value === true">
                      <md-input-text v-if="MASTERDATA['OPDOENCNHH'] && showWithClinic(MASTERDATA['OPDOENCNHH'].Clinic)" v-model="MASTERDATA['OPDOENCNHH']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENSCD'] && showWithClinic(MASTERDATA['OPDOENSCD'].Clinic)" v-model="MASTERDATA['OPDOENSCD']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENKNGS'] && showWithClinic(MASTERDATA['OPDOENKNGS'].Clinic)" v-model="MASTERDATA['OPDOENKNGS']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTDNT'] && showWithClinic(MASTERDATA['OPDOENTDNT'].Clinic)" v-model="MASTERDATA['OPDOENTDNT']"/>
                    </template>
                    <template v-if="MASTERDATA['OPDOENDG'] && MASTERDATA['OPDOENDG'].Items[2].Value === true">
                      <md-input-text v-if="MASTERDATA['OPDOENKNGT'] && showWithClinic(MASTERDATA['OPDOENKNGT'].Clinic)" v-model="MASTERDATA['OPDOENKNGT']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTTRLN'] && showWithClinic(MASTERDATA['OPDOENTTRLN'].Clinic)" v-model="MASTERDATA['OPDOENTTRLN']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENNTKG'] && showWithClinic(MASTERDATA['OPDOENNTKG'].Clinic)" v-model="MASTERDATA['OPDOENNTKG']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENDVTH'] && showWithClinic(MASTERDATA['OPDOENDVTH'].Clinic)" v-model="MASTERDATA['OPDOENDVTH']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENDCDL'] && showWithClinic(MASTERDATA['OPDOENDCDL'].Clinic)" v-model="MASTERDATA['OPDOENDCDL']"/>
                    </template>
                    <md-input-text :defaultLib="'GENTCTBL2'" v-if="MASTERDATA['OPDOENCCQK'] && showWithClinic(MASTERDATA['OPDOENCCQK'].Clinic)" v-model="MASTERDATA['OPDOENCCQK']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENKTMH'] && showWithClinic(MASTERDATA['OPDOENKTMH'].Clinic)" v-model="MASTERDATA['OPDOENKTMH']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENKDD'] && showWithClinic(MASTERDATA['OPDOENKDD'].Clinic)" v-model="MASTERDATA['OPDOENKDD']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENTC'] && showWithClinic(MASTERDATA['OPDOENTC'].Clinic)" v-model="MASTERDATA['OPDOENTC']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENPTVD'] && showWithClinic(MASTERDATA['OPDOENPTVD'].Clinic)" v-model="MASTERDATA['OPDOENPTVD']"/>
                    <md-input-text v-if="MASTERDATA['OPDOENPTTT'] && showWithClinic(MASTERDATA['OPDOENPTTT'].Clinic)" v-model="MASTERDATA['OPDOENPTTT']"/>
                  </div>
                </div>
                <div class="box box-table" style="background: #eceaea;" v-else>
                  <div class="box-body">
                    <!-- MultiSelect-002 is PK tâm lý - trung tâm y học tái tạo -->
                    <div class="row">
                      <div class="col-md-12" v-if="MASTERDATA['OPDOENYTD']">
                        <div class="form-group">
                          <div class="group-radio NotAllowNull">
                            <template :data="item"  v-for="(item,index) in MASTERDATA['OPDOENYTD'].Items">
                              <span :key="index" v-if="item.DataType === 'Radio'">
                                <input type="checkbox" :id="'OPDOENYTDradio-' + index" v-model="item.Value">
                                <label :for="'OPDOENYTDradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDOENYTD'].Items, item)">{{__label(item)}}</label>
                              </span>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                    <template v-if="MASTERDATA['OPDOENYTD'].Items[0].Value">
                      <md-input-text v-if="MASTERDATA['OPDOENNGNG']" v-model="MASTERDATA['OPDOENNGNG']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENNTTTXH']" v-model="MASTERDATA['OPDOENNTTTXH']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENHVTTCY']" v-model="MASTERDATA['OPDOENHVTTCY']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENCGXG']" v-model="MASTERDATA['OPDOENCGXG']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENKTTPV']" v-model="MASTERDATA['OPDOENKTTPV']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENMSTTLCT']" v-model="MASTERDATA['OPDOENMSTTLCT']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENCCQK']" v-model="MASTERDATA['OPDOENCCQK']" :defaultLib="'GENTCTBL2'"/>
                    </template>
                    <template v-if="MASTERDATA['OPDOENYTD'].Items[1].Value">
                      <md-input-text v-if="MASTERDATA['OPDOENTK0001']" v-model="MASTERDATA['OPDOENTK0001']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0002']" v-model="MASTERDATA['OPDOENTK0002']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0003']" v-model="MASTERDATA['OPDOENTK0003']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0004']" v-model="MASTERDATA['OPDOENTK0004']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0005']" v-model="MASTERDATA['OPDOENTK0005']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0006']" v-model="MASTERDATA['OPDOENTK0006']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0007']" v-model="MASTERDATA['OPDOENTK0007']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0008']" v-model="MASTERDATA['OPDOENTK0008']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0009']" v-model="MASTERDATA['OPDOENTK0009']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0010']" v-model="MASTERDATA['OPDOENTK0010']" :defaultLib="'GENTCTBL2'"/>
                    </template>
                    <template v-if="MASTERDATA['OPDOENYTD'].Items[2].Value">
                      <md-input-text v-if="MASTERDATA['OPDOENTK0011']" v-model="MASTERDATA['OPDOENTK0011']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0012']" v-model="MASTERDATA['OPDOENTK0012']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0013']" v-model="MASTERDATA['OPDOENTK0013']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0014']" v-model="MASTERDATA['OPDOENTK0014']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0015']" v-model="MASTERDATA['OPDOENTK0015']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0016']" v-model="MASTERDATA['OPDOENTK0016']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0017']" v-model="MASTERDATA['OPDOENTK0017']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0018']" v-model="MASTERDATA['OPDOENTK0018']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0027']" v-model="MASTERDATA['OPDOENTK0027']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0019']" v-model="MASTERDATA['OPDOENTK0019']" :defaultLib="'GENTCTBL2'"/>
                    </template>
                    <template v-if="MASTERDATA['OPDOENYTD'].Items[3].Value">
                      <md-input-text v-if="MASTERDATA['OPDOENTK0020']" v-model="MASTERDATA['OPDOENTK0020']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0021']" v-model="MASTERDATA['OPDOENTK0021']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0022']" v-model="MASTERDATA['OPDOENTK0022']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0023']" v-model="MASTERDATA['OPDOENTK0023']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0024']" v-model="MASTERDATA['OPDOENTK0024']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0025']" v-model="MASTERDATA['OPDOENTK0025']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0028']" v-model="MASTERDATA['OPDOENTK0028']"/>
                      <md-input-text v-if="MASTERDATA['OPDOENTK0026']" v-model="MASTERDATA['OPDOENTK0026']" :defaultLib="'GENTCTBL2'"/>
                    </template>
                  </div>
                </div>
                <!-- end khams laam sangf -->
              </div>
              <md-input-text v-if="MASTERDATA['OPDOENSDBP'] && DataSubmit.IsTelehealth" v-model="MASTERDATA['OPDOENSDBP']"/>
              <!-- <p>chẩn đoán sơ bộ</p> -->
              <md-input-text v-if="MASTERDATA['OPDOENID0']" v-model="MASTERDATA['OPDOENID0']"/>
              <div class="row">
                <div class="col-md-12" v-if="MASTERDATA['OPDOENPT0']">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['OPDOENPT0'])}} <i class="unit-label">{{MASTERDATA['OPDOENPT0'].Note}}</i> </label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENPT0'].Items">
                      <div v-if="item.IsReadOnly">
                        <!-- <diorpt  :dataJson="item.Value" v-model="item.Value" @copy="copyToOPDOENPT0" /> -->
                        <SyncPrincipalTest :VisitId="_VisitId" :VisitType="'EOC'"  @copy="copyToOPDOENPT0"/>
                      </div>
                      <textarea-autosize v-else :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value"/>
                    </div>
                  </div>
                </div>
              </div>
              <template v-if="!isEHOS()">
                <ProblemList @copy="copyToOPDOENICD"/>
                <br/>
                </template>
              <div class="row">
                <div class="col-md-12" v-if="MASTERDATA['OPDOENDD0']">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['OPDOENDD0'])}} <i class="unit-label">{{MASTERDATA['OPDOENDD0'].Note}}</i></label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENDD0'].Items">
                      <template v-if="isEHOS()">
                        <p class="margin-bottom-10 label-text" v-if="item.DataType === 'Text'" :data="item" :key="index">{{item.Value || noDataMsg()}}</p>
                      </template>
                      <textarea-autosize v-else :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12" v-if="MASTERDATA['OPDOENICD']">
                  <div class="form-group">
                    <!-- <label>{{__label(MASTERDATA['OPDOENICD'])}} <i class="unit-label">{{MASTERDATA['OPDOENICD'].Note}}</i></label> -->
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENICD'].Items" :id="item.Code">
                      <div class="margin-bottom-10" v-if="item.DataType === 'ICD10'" :key="index">
                        <label>{{__label(item)}}</label>
                        <!--   -->
                        <template v-if="item.IsReadOnly && isEHOS()">
                          <p v-if="item.Value"><icd10-view v-model="item.Value" /></p>
                          <p v-else>{{noDataMsg()}}</p>
                        </template>
                        <template v-else>
                          <icd10 v-model="item.Value"/>
                        </template>
                      </div>
                    </div>
                  </div>
                  <p v-if="syncIcdAt" class="note-text text-right"><i aria-hidden="true" class="fa fa-check v-green"></i> {{__t('Đồng bộ lần cuối lúc')}}: {{syncIcdAt | formatDateTime('HH:mm:ss DD/MM/YYYY')}}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- end -->
          <div class="tbl-title">2. {{__t('Điều trị')}}</div>
          <div class="box box-table">
            <div class="box-body">
              <md-input-text v-if="MASTERDATA['OPDOENTP0']" v-model="MASTERDATA['OPDOENTP0']"/>
              <md-input-text v-if="MASTERDATA['OPDOENRFU']" v-model="MASTERDATA['OPDOENRFU']">
                <recommendation-lib :title="__t('Mở thư viện lời dặn')" @copy="copyOPDOENRFU" :defaultValue="MASTERDATA['OPDOENRFU'].Items[0].Value" />
              </md-input-text>
              <div class="row">
                <div class="col-md-12" v-if="MASTERDATA['OPDOENDOR']">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['OPDOENDOR'])}} <i class="unit-label">{{MASTERDATA['OPDOENDOR'].Note}}</i></label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENDOR'].Items">
                      <v-date-picker :allday="'allday'" v-model="item.Value" :format="vDateFormat" :id="item.Code"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="DataSubmit.Status && (DataSubmit.Status.Code === 'EOCA0')">
            <div class="tbl-title">{{__t('Nhập nội trú')}}</div>
            <div class="box box-table">
              <div class="box-body">
                <md-input-text v-if="MASTERDATA['OPDOENRFT'] && IsUseHandOverCheckList" v-model="MASTERDATA['OPDOENRFT']"/>
                <md-input-text v-if="MASTERDATA['OPDOENFP1'] && IsUseHandOverCheckList" v-model="MASTERDATA['OPDOENFP1']"/>
                <md-input-text v-if="MASTERDATA['OPDOENPS1'] && IsUseHandOverCheckList" v-model="MASTERDATA['OPDOENPS1']"/>
                <div class="row" v-if="IsCheckTransfer === false">
                  <div class="col-md-12" v-if="MASTERDATA['OPDOENREC']">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA['OPDOENREC'])}} <i class="unit-label">{{MASTERDATA['OPDOENREC'].Note}}</i></label>
                      <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENREC'].Items">
                        <v-select-box :search="true" class="full-w select-boox-full-w" v-model="item.Value" :items="getMDSPECIALITIESS" :id="item.Code"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row" v-else>
                  <div class="col-md-12" v-if="MASTERDATA['OPDOENREC']">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA['OPDOENREC'])}} <i class="unit-label">{{MASTERDATA['OPDOENREC'].Note}}</i></label>
                      <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENREC'].Items">
                        <!-- <MDText :readonly="IsCheckTransfer" class="mrr10" rows="1" v-model="item.Value" /> -->
                        <v-select-box :search="true" class="full-w select-boox-full-w" v-model="item.Value" :items="getMDSPECIALITIESS" :id="item.Code" :isConfirmedCheck="IsCheckTransfer"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-2 mt-10" style="display: flex;">
                  <input :readonly="IsReadOnLy" type="checkbox" style="display: inline !important; height: 25px; width: 25px; margin-right: 6px;" v-model="IsUseHandOverCheckList">
                  <b style="display: contents !important; line-height: 2.5;">{{__t('Sử dụng biên bản bàn giao NB')}}</b>
                </div>
              </div>
            </div>
          </div>
          <div v-if="DataSubmit.Status && (DataSubmit.Status.Code === 'EOCTE')">
            <div class="tbl-title">{{__t('Nhập cấp cứu')}}</div>
            <div class="box box-table">
              <div class="box-body">
                <md-input-text v-if="MASTERDATA['OPDOENRFT2'] && IsUseHandOverCheckList" v-model="MASTERDATA['OPDOENRFT2']"/>
                <md-input-text v-if="MASTERDATA['OPDOENFP2'] && IsUseHandOverCheckList" v-model="MASTERDATA['OPDOENFP2']"/>
                <md-input-text v-if="MASTERDATA['OPDOENPS2'] && IsUseHandOverCheckList" v-model="MASTERDATA['OPDOENPS2']"/>
                <div class="row">
                  <div class="col-md-12" v-if="MASTERDATA['OPDOENREC2']">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA['OPDOENREC2'])}} <i class="unit-label">{{MASTERDATA['OPDOENREC2'].Note}}</i></label>
                      <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENREC2'].Items">
                        <v-select-box :search="true" class="full-w select-boox-full-w" v-model="item.Value" :items="getMDSPECIALITIESS" :id="item.Code"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-2 mt-10" style="display: flex;">
                  <input :readonly="IsReadOnLy"  type="checkbox" style="display: inline !important; height: 25px; width: 25px; margin-right: 6px;" v-model="IsUseHandOverCheckList">
                  <b style="display: contents !important; line-height: 2.5;">{{__t('Sử dụng biên bản bàn giao NB')}}</b>
                </div>
              </div>
            </div>
          </div>
          <div v-if="DataSubmit.Status && (DataSubmit.Status.Code === 'EOCIHT')">
            <div class="tbl-title">{{__t('Chuyển viện')}}</div>
            <div class="box box-table">
              <div class="box-body">
                <md-input-text v-if="MASTERDATA['OPDOENRH1']" v-model="MASTERDATA['OPDOENRH1']"/>
                <md-input-text v-if="MASTERDATA['OPDOENRFT3']" v-model="MASTERDATA['OPDOENRFT3']"/>
                <div class="row">
                  <div class="col-md-12" v-if="MASTERDATA['OPDOENTOT']">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA['OPDOENTOT'])}} <i class="unit-label">{{MASTERDATA['OPDOENTOT'].Note}}</i></label>
                      <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENTOT'].Items">
                        <v-date-time-picker v-model="item.Value" class=" select-boox" :format="vDateTimeFormat"  :id="item.Code"/>
                      </div>
                    </div>
                  </div>
                </div>
                <md-input-text v-if="MASTERDATA['OPDOENSBC']" v-model="MASTERDATA['OPDOENSBC']"/>
                <md-input-text v-if="MASTERDATA['OPDOENTM1']" v-model="MASTERDATA['OPDOENTM1']"/>
                <md-input-text v-if="MASTERDATA['OPDOENME0']" v-model="MASTERDATA['OPDOENME0']"/>
                <md-input-text v-if="MASTERDATA['OPDOENDU0']" v-model="MASTERDATA['OPDOENDU0']"/>
                <md-input-text v-if="MASTERDATA['OPDOENPSA']" v-model="MASTERDATA['OPDOENPSA']"/>
              </div>
            </div>
          </div>
          <div v-if="DataSubmit.Status && (DataSubmit.Status.EnName === 'Upstream/Downstream transfer')">
            <div class="tbl-title">{{__t('Chuyển tuyến')}}</div>
            <div class="box box-table">
              <div class="box-body">
                <md-input-text v-if="MASTERDATA['OPDOENRH0']" v-model="MASTERDATA['OPDOENRH0']"/>
                <md-input-text v-if="MASTERDATA['OPDOENMTU']" v-model="MASTERDATA['OPDOENMTU']"/>
                <md-input-text v-if="MASTERDATA['OPDOENPS0']" v-model="MASTERDATA['OPDOENPS0']"/>
                <div class="row">
                  <div class="col-md-12" v-if="MASTERDATA['OPDOENRFT1']">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA['OPDOENRFT1'])}} <i class="unit-label">{{MASTERDATA['OPDOENRFT1'].Note}}</i></label>
                      <div class="group-radio" id="OPDOENRFT1">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['OPDOENRFT1'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'"  :id="item.Code">
                            <input type="checkbox" :id="'OPDOENRFT1radio-' + index" v-model="item.Value">
                            <label :for="'OPDOENRFT1radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDOENRFT1'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
                <md-input-text v-if="MASTERDATA['OPDOENTM0']" v-model="MASTERDATA['OPDOENTM0']"/>
                <md-input-text v-if="MASTERDATA['OPDOENNTM']" v-model="MASTERDATA['OPDOENNTM']"/>
                <div class="row">
                  <div class="col-md-12" v-if="MASTERDATA['OPDOENTD0']">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA['OPDOENTD0'])}} <i class="unit-label">{{MASTERDATA['OPDOENTD0'].Note}}</i></label>
                      <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENTD0'].Items">
                        <v-date-time-picker v-model="item.Value" class=" select-boox" :format="vDateTimeFormat" :id="item.Code"/>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <MDRadio
                 v-if="MASTERDATA['OPDOENXNBT']"
                v-model="MASTERDATA['OPDOENXNBT']"
              /> -->
              <!-- <p>Hasagi</p> -->
              </div>
            </div>
          </div>
          <OutpatientExaminationNoteInfo :DataSubmit="DataSubmit" :allowEdit="isPrimaryDoctor"/>
          <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit.UpdatedBy" :ad="DataSubmit.UpdatedBy" /> {{__t('lúc')}} {{ DataSubmit.UpdatedAt }}</p>
        </div>
        <FloatBlock>
          <template slot='top'>
            <TranferMsg :data="DataSubmit.visit_transfer" />
            <div class="group-radio"  :class="{'readonly': checkLockFloat}" v-if="DataSubmit.ListStatus">
              <template  v-for="(status, index) in DataSubmit.ListStatus">
                <input :data="status" :key="index" type="radio" :id="'a' + index" name="status" :value="status" v-model="DataSubmit.Status">
                <label :key="'a' + index" :for="'a' + index">{{__label(status)}}</label>
              </template>
            </div>
          </template>
          <template slot='buttons'>
            <div class="col-md-3">
            </div>
            <div class="col-md-3">
              <div class="form-group1">
                <button class="btn btn-block v-white-btn" type="button" @click="$router.push({name: 'EOCMedicalReport', params: {Id: $route.params.Id}})"><i class="fa fa-file-o" aria-hidden="true"></i> {{__t('Báo cáo y tế')}}</button>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group1">
                <button v-if="DataSubmit.Status && DataSubmit.Status.Code === 'EOCNE'" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="noExaminationConfirm()" @click="noExaminationConfirm()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                <button v-else class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </template>
      <div v-else>
        <p style="background-color: #f8c736; padding: 5px; border-radius: 3px" v-if="DataSubmit.locked"><i aria-hidden="true" class="fa fa-warning"></i> Hồ sơ đã khóa 24h</p>
        <EOCOutpatientExaminationNoteViewOnly
          v-if="checkEoc"
          :VisitId="this.$route.params.Id"
          :DataSubmit="DataSubmit"
          :MASTERDATA="MASTERDATA"
        />
        <OutpatientExaminationNoteViewOnly
           v-else
          :VisitId="this.$route.params.Id"
          :DataSubmit="DataSubmit"
          :MASTERDATA="MASTERDATA"
        />
      </div>
    </template>
    <logs :EdId="this.$route.params.Id" :Type="'OPD/OPDOutpatientExaminationNote'" />
    <div class="mg-bt-120"></div>
  </div>
   <div v-else class="p20">
    <template v-if="loaded">
    <div v-if="hasErrForm">Có lỗi xảy ra!</div>
    <div v-else>
      <div class="text-center ">
        <p>{{__t('Chưa có phiếu khám bệnh')}}</p>
        <button class="btn btn-warning" v-if="isPrimaryDoctor" @click="confirmPopup">{{__t('Tạo mới phiếu khám')}}</button>
      </div>
      <FloatBlock  v-if="isPrimaryDoctor">
        <template slot='top'>
          <p><label class="label label-warning">{{__label(xxyy)}}</label></p>
          <div class="group-radio"  v-if="noEONFormData.ListStatus">
            <template  v-for="(status, index) in noEONFormData.ListStatus">
              <input :data="status" :key="index" type="radio" :id="'a' + index" name="status" :value="status" v-model="noEONFormData.Status">
              <label :key="'a' + index" :for="'a' + index">{{__label(status)}}</label>
            </template>
          </div>
        </template>
        <template slot='buttons'>
          <div class="col-md-3">
          </div>
          <div class="col-md-3">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group1">
              <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="changeStatus()" @click="changeStatus()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
            </div>
          </div>
        </template>
      </FloatBlock>
    </div>
    </template>
    <v-loading v-else/>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import InitialAssessment from '@/pages/EOC/InitialAssessment/View.vue'
import OutpatientExaminationNote from '@/services/EOC/OutpatientExaminationNote'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/FormOutpatientExaminationNew.js'
import _ from 'lodash'
import TranferMsg from '@/components/TranferMsg.vue'
import Diorpt from '@/components/OPD/DI0RPT.vue'
// import moment from 'moment'
import ICD10Service from '@/services/ICD10'
import NProgress from 'nprogress'
import Logs from '@/components/Logs.vue'
import VSelectBox from '@/components/VSelect.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import PatientProgressNotes from '@/pages/ProgressNote/PatientProgressNotesView.vue'
import ProblemList from '@/components/ProblemList.vue'
import StandingOrder from '@/components/OPD/StandingOrder.vue'
import EventBus from '@/lib/eventBus'
import $ from 'jquery'
import SyncPrincipalTest from '@/components/SyncPrincipalTest.vue'
import storage from '@/lib/storage'
import FloatingMenu from '@/components/FloatingMenu.vue'
import OutpatientExaminationNoteViewOnly from '@/components/OPD/OutpatientExaminationNoteForm.vue'
import EOCOutpatientExaminationNoteViewOnly from '@/components/OPD/OutpatientExaminationNoteFormEOC.vue'
import OutpatientExaminationNoteInfo from '@/components/EOC/OutpatientExaminationNoteDoctorInfo.vue'
const MODAL_WIDTH = 750
export default {
  /**
   * The name of the page.
   */
  name: 'OutpatientExaminationNote',
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
      IsCheckTransfer: false,
      Version: 1,
      loaded: false,
      hasErrForm: false,
      errors: [],
      checkMessage: 0,
      modalWidth: MODAL_WIDTH,
      noEONFormData: {},
      MenuItems: [
      ],
      xxyy: {
        ViName: 'Lưu ý: Trường hợp không sử dụng phiếu khám, bác sĩ vui lòng chọn Hoàn thành khám/ Không khám cho bệnh nhân',
        EnName: 'Note: If the doctor does not use the examination note, please select Discharged/No examination of the patient.'
      },
      OPDOENPT0Timeout: null,
      CODE1: [
        'OPDOENKTT'
      ],
      CODE1y: [
        'OPDOENKCBPK',
        'OPDOENBHC', 'OPDOENKYT', 'OPDOENKCGTG', 'OPDOENKTD', 'OPDOENKCX', 'OPDOENKHD', 'OPDOENKCY', 'OPDOENKTN', 'OPDOENKTRT', 'OPDOENTTL'
      ],
      CODE1y_1: [
        'OPDOENKNKT'
      ],
      CODE1_1: [
        'OPDOENTSKN', 'OPDOENTSK'
      ],
      CODE2Adults: [
        // 'OPDOENBHC', 'OPDOENKYT', 'OPDOENKCGTG', 'OPDOENKTD', 'OPDOENKCX', 'OPDOENKHD',
        // 'OPDOENKCY', 'OPDOENKTN', 'OPDOENKTRT', 'OPDOENTTL'
      ],
      CODE2Child: [
        'OPDOENNGNG', 'OPDOENNTTTXH', 'OPDOENHVTTCY', 'OPDOENCGXG', 'OPDOENKTTPV', 'OPDOENMSTTLCT'
      ],
      CODE3: [
        'OPDOENKTTTHGC', 'OPDOENDGCGNM', 'OPDOENDGDNM', 'OPDOENKLN'
      ],
      CODE4: [
        'OPDOENKTM', 'OPDOENKHH'
      ],
      OPDOENDG: [
        'OPDOENMCN', 'OPDOENDCT', 'OPDOENTDTT', 'OPDOENTHCVD', 'OPDOENPHCN'
      ],
      OPDOENDG1: [
        'OPDOENCNHH', 'OPDOENSCD', 'OPDOENKNGS', 'OPDOENTDNT'
      ],
      OPDOENDG2: [
        'OPDOENKNGT', 'OPDOENTTRLN', 'OPDOENNTKG', 'OPDOENDVTH', 'OPDOENDCDL'
      ],
      CODE5: [
        'OPDOENCCQK', 'OPDOENKTMH', 'OPDOENKDD', 'OPDOENTC', 'OPDOENPTVD', 'OPDOENPTTT'
      ],
      OPDOENTSSK: ['OPDOENTSSK', 'OPDOENTSKN', 'OPDOENTSK'],
      DataSubmit: null,
      options: [],
      pId: null,
      message: null,
      SyncHistoryOfPresentIllness: null,
      HistoryOfAllergies: null,
      InitialAssessmentAllergies: null,
      SyncPastMedicalHistory: null,
      AdmittedCode: ['OPDOENRFT', 'OPDOENFP1', 'OPDOENPS1', 'OPDOENREC'],
      TransferToEDCode: ['OPDOENRFT2', 'OPDOENFP2', 'OPDOENPS2', 'OPDOENREC2'],
      InterHospitalTransferCode: ['OPDOENRH1', 'OPDOENRFT3', 'OPDOENTOT', 'OPDOENSBC', 'OPDOENTM1', 'OPDOENME0', 'OPDOENDU0', 'OPDOENPSA'],
      UpstreamDownstreamTransfer: ['OPDOENRH0', 'OPDOENMTU', 'OPDOENPS0', 'OPDOENRFT1', 'OPDOENTM0', 'OPDOENNTM'],
      isFirst: true,
      syncIcdInterval: null,
      syncIcdAt: null,
      syncOPDOENPT0At: null,
      OPDOENTUCO_TMP: [],
      MDITEMINFO: {},
      rawData: {},
      IsUseHandOverCheckList: true,
      IsAcceptPhysician: false,
      IsAcceptNurse: false,
      IsReadOnLy: false
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    EOCOutpatientExaminationNoteViewOnly,
    InitialAssessment,
    VDateTimePicker,
    Diorpt,
    VSelectBox,
    ListOfCurrentMedications,
    Logs,
    PatientProgressNotes,
    StandingOrder,
    FloatingMenu,
    OutpatientExaminationNoteViewOnly,
    TranferMsg,
    ProblemList,
    SyncPrincipalTest,
    OutpatientExaminationNoteInfo
  },
  mounted () {
    this.getSpecialities()
    this.loadDoctorRecommenWithIcd10()
    this.getMasterDatas({Form: 'OPDOEN'}, () => {
      this.getData()
    })
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    EventBus.$on('ICDUPDATED', this.updateIcd)
    new ICD10Service({search: 'a'}).create({search: 'a', pageSize: 25}).then(res => {
      this.options = res.map(e => {
        return {
          code: e.Code,
          label: e.Code + ', ' + e.ViName
        }
      })
    })
  },
  watch: {
    'DataSubmit.Status' () {
      if (!this.isFirst) {
        setTimeout(() => {
          $('html, body').animate({ scrollTop: 99000 }, 500)
        }, 100)
        this.autoSaveDraft()
      }
      this.isFirst = false
    },
    MASTERDATA: {
      handler () {
        this.edited = true
        if (!this.isFirst) {
          this.autoSaveDraft()
        }
      },
      deep: true
    },
    IsUseHandOverCheckList: {
      handler (val) {
        console.log('IsUseHandOverCheckList', val)
      }
    }
  },
  computed: {
    checkEoc: function () {
      if (this.$route.name === 'EOCOutpatientExaminationNote' || this.$route.name === 'EOCView') {
        return true
      } else {
        return false
      }
    },
    checkLockFloat: function () {
      return this.IsCheckTransfer || this.DataSubmit.visit_transfer
    },
    isPrimaryDoctorOrAuthorizedDoctor: function () {
      var currentUser = this.$store.state.account.Username
      if (this.ImSuperAdmin()) return true
      if (this.DataSubmit.locked) return false
      if (this.DataSubmit.PrimaryDoctor && this.DataSubmit.PrimaryDoctor.Username === currentUser) return true
      if (this.DataSubmit.AuthorizedDoctor && this.DataSubmit.AuthorizedDoctor.Username === currentUser) return true
      return false
    },
    isPrimaryDoctor: function () {
      if (this.ImSuperAdmin()) return true
      var currentUser = this.$store.state.account.Username
      if (this.noEONFormData && this.noEONFormData.PrimaryDoctor && this.noEONFormData.PrimaryDoctor.Username === currentUser) return true
      if (this.DataSubmit && this.DataSubmit.PrimaryDoctor && this.DataSubmit.PrimaryDoctor.Username === currentUser) return true
      return false
    },
    hasShowDe: function () {
      return this.MASTERDATA['OPDOENTUCO'].Items.find(e => e.Value)
    },
    OPDOENBMIlabel: function () {
      if (this.MASTERDATA['OPDOENTUOI'].Items[0].Value) {
        return 'BMI'
      }
      if (this.MASTERDATA['OPDOENTUOI'].Items[1].Value) {
        return 'BMI theo Z-score'
      }
      if (this.MASTERDATA['OPDOENTUOI'].Items[2].Value) {
        return 'Z-score theo cân nặng/tuổi, chiều/tuổi,cân nặng/chiều cao theo tuổi và giới'
      }
      return 'BMI'
    },
    OPDOENBMICalculation: function () {
      if (this.MASTERDATA['OPDOENTUOI'].Items[0].Value) {
        var weight = this.MASTERDATA['OPDOENWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value) : 0
        var height = this.MASTERDATA['OPDOENHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100) : 0
        return (weight / (height * height)).toFixed(2)
      } else {
        return this.MASTERDATA['OPDOENBMI'].Items[0].Value
      }
    },
    bmiCalculation: function () {
      var weight = this.DataSubmit.Customer.Weight ? parseFloat(this.DataSubmit.Customer.Weight) : 0
      var height = this.DataSubmit.Customer.Height ? (parseFloat(this.DataSubmit.Customer.Height) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    },
    getMDSPECIALITIESS: function () {
      var status = ''
      if (this.DataSubmit.Status) {
        status = this.DataSubmit.Status.Code === 'EOCA0' ? 'IPD' : 'ED'
      }
      return (this.getSpecialitiesInCurrentSite() || []).filter(e => {
        return e.VisitTypeGroup === status
      })
    }
  },
  methods: {
    getValueInput (value) {
      console.log('value', value)
    },
    pushRoute () {
      this.$router.push({name: 'EOCCustomerInfo', params: {Id: this.$route.params.Id, Check: true}})
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
              this.$router.push({
                name: 'EOCCustomerInfo',
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
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới phiếu khám bệnh'),
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
      new OutpatientExaminationNote().update(this.$route.params.Id, {}, '/Create/').then(response => {
        this.reload()
      })
    },
    onchangeOPDOENTUCO (item) {
      setTimeout(() => {
        var oldValue = item.Value
        var dataOldValue = oldValue ? oldValue.split(',\n') : []
        var defaultValueSelected = this.getSelectedValue()
        var newDataValue = dataOldValue.filter(e => {
          return !this.OPDOENTUCO_TMP.find(ev => {
            return ev.Data === e
          })
        })
        defaultValueSelected.forEach(d => {
          if (!newDataValue.includes(d.Data)) {
            newDataValue.push(d.Data)
          }
        })
        item.Value = newDataValue ? newDataValue.join(',\n') : ''
      }, 100)
    },
    getSelectedValue () {
      var data = []
      this.MASTERDATA['OPDOENTUCO'].Items.forEach(item => {
        var dataItem = item.Data.filter(e => {
          return !e.Code ||
            (e.Code === 'OPDOENCSMCYES' && this.MASTERDATA['OPDOENCSMC'].Items[0].Value) ||
            (e.Code === 'OPDOENCSMCNOO' && this.MASTERDATA['OPDOENCSMC'].Items[1].Value) ||
            (e.Code === 'OPDOENTRTRYES' && this.MASTERDATA['OPDOENTRTR'].Items[0].Value) ||
            (e.Code === 'OPDOENTRTRNOO' && this.MASTERDATA['OPDOENTRTR'].Items[1].Value) ||
            (e.Code === 'OPDOENBPSDYES' && this.MASTERDATA['OPDOENBPSD'].Items[0].Value) ||
            (e.Code === 'OPDOENBPSDNOO' && this.MASTERDATA['OPDOENBPSD'].Items[1].Value)
        })
        if (item.Value) data = data.concat(dataItem)
      })
      return data
    },
    setDefaultValue (item) {
      // item.Value = item.Data
      if (!item.Data) return false
      var defaultData = (this.JSONParse(item.Data) || [])
      var input = item.Value
      var inputValue = input ? input.split(',\n') : []
      defaultData.forEach(e => {
        if (!inputValue.includes(e)) input = (input || '') + ',\n' + e
      })
      input = this.trim_(input, ',\n')
      item.Value = input
    },
    copyOPDOENKTTV2 (selectedValue) {
      if (!selectedValue) return
      var input = this.MASTERDATA['OPDOENKTTV2'].Items[0].Value
      var inputValue = input ? input.split('\n') : []
      selectedValue.forEach(e => {
        if (!inputValue.includes(e)) input = (input || '') + '\n' + e
      })
      input = this.trim_(input || '', '\n')
      this.MASTERDATA['OPDOENKTTV2'].Items[0].Value = input
    },
    copyOPDOENRFU (selectedValue) {
      if (!selectedValue) return
      var input = this.MASTERDATA['OPDOENRFU'].Items[0].Value
      var inputValue = input ? input.split('\n') : []
      selectedValue.forEach(e => {
        if (!inputValue.includes(e)) input = (input || '') + '\n' + e
      })
      input = this.trim_(input || '', '\n')
      this.MASTERDATA['OPDOENRFU'].Items[0].Value = input
    },
    updateIcd (value) {
      var icdSelected = value.map(e => this.DoctorRecommendations[e.code]).filter(e => e)
      this.copyOPDOENRFU(icdSelected)
    },
    setMenuItems () {
      this.MenuItems = [
        {
          ViName: 'Đánh giá chung',
          EnName: 'Đánh giá chung'
        },
        this.MASTERDATA['OPDOENPMH'],
        this.MASTERDATA['OPDOENPT0'],
        this.MASTERDATA['OPDOENDD0'],
        {
          ViName: 'Điều trị',
          EnName: 'Điều trị'
        }
      ]
    },
    showWithOPDOENDG () {
      return this.MASTERDATA['OPDOENDG'].Items[0].Value || this.MASTERDATA['OPDOENDG'].Items[2].Value
    },
    hideWithOPDOENDG () {
      if (this.DataSubmit.Clinic) {
        return this.DataSubmit.Clinic.Code !== 'MultiSelect-001'
      }
      return false
    },
    isOPDOENKNKT () {
      if (this.DataSubmit.Clinic) {
        return this.DataSubmit.Clinic.Code === 'FreeTextOnly-007'
      }
      return false
    },
    hasKCK () {
      return this.DataSubmit.Clinic && ['FreeTextOnly-000', 'FreeTextOnly-001', 'FreeTextOnly-006', 'RadioYesNo-001'].includes(this.DataSubmit.Clinic.Code)
    },
    checkbox2RadioOPDOENTUOI (items, item) {
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
        if (this.MASTERDATA['OPDOENTUOI'].Items[0].Value) {
          var weight = this.MASTERDATA['OPDOENWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value) : 0
          var height = this.MASTERDATA['OPDOENHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100) : 0
          this.MASTERDATA['OPDOENBMI'].Items[0].Value = (weight / (height * height)).toFixed(2)
        } else {
          return ''
        }
      }, 10)
    },
    showWithClinic (codes) {
      if (this.DataSubmit.Clinic && this.DataSubmit.Clinic.Code && codes) {
        var codess = codes.replace(/\s/g, '').split(',')
        return codess.includes(this.DataSubmit.Clinic.Code)
      }
      return false
    },
    checkInClinic (codes) {
      if (codes === null || codes === '' || this.DataSubmit.Clinic) {
        return true
      }
      if (this.DataSubmit.Clinic && this.DataSubmit.Clinic.Code) {
        var codess = codes.replace(/\s/g, '').split(',')
        return codess.includes(this.DataSubmit.Clinic.Code)
      }
      return true
    },
    syncGetAction () {
      this.$refs.ListOfCurrentMedications.sync()
    },
    noExaminationConfirm () {
      this.$modal.show('dialog', {
        title: this.__t('Bạn có chắc chắn đây là bệnh nhân không sử dụng dịch vụ khám bệnh.'),
        text: this.__t('Chú ý: Mọi thông tin nhập trên form sẽ bị xóa'),
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
    changeStatus () {
      new OutpatientExaminationNote().update('changeStatus/' + this.$route.params.Id, this.noEONFormData).then(response => {
        this.toastedSuccess()
      })
    },
    submit () {
      // if (!this.MASTERDATA['OPDOENKTTV2'].Items[0].Value && !this.MASTERDATA['OPDOENKCK'].Items[0].Value) {
      //   this.toastedError('Khám toàn thân, Khám chuyên khoa không được để trống!')
      // } else if (this.MASTERDATA['OPDOENKCK'].Items[0].Value === '' || this.MASTERDATA['OPDOENKCK'].Items[0].Value === null) {
      //   this.toastedError('Khám chuyên khoa không được để trống!')
      // } else if (this.MASTERDATA['OPDOENKTTV2'].Items[0].Value === '' || this.MASTERDATA['OPDOENKTTV2'].Items[0].Value === null) {
      //   this.toastedError('Khám toàn thân không được để trống!')
      // } else {
      this.edited = false
      var DataSubmit = this.getDataSubmit()
      NProgress.start()
      setTimeout(() => {
        this.DataSubmit.Room = {}
        new OutpatientExaminationNote().update('update/' + this.$route.params.Id, DataSubmit).then(response => {
          this.handlerResponse(response)
          // this.$router.push({name: 'etr', params: {Id: response.Id}})
          storage.removeItem('OutpatientExaminationNote#' + this.$route.params.Id)
          this.getData()
          this.toastedSuccess()
          this.$refs.ListOfCurrentMedications.submit(true)
          this.setLastData()
          this.rawData = this.cloneObj(this.DataSubmit)
          if (response.IsChronic) {
            EventBus.$emit('updateGlobalOpd', 'thangdc in here')
            this.$modal.show('dialog', {
              title: this.__t('Cảnh báo!'),
              text: this.__t('Đây là ca bệnh ngoại trú phức tạp.'),
              class: 'v-dialog v-dialog-warning',
              buttons: [
                {
                  title: this.__t('Đi đến tóm tắt ca bệnh'),
                  class: 'btn bg-yellow',
                  handler: () => {
                    this.$modal.hide('dialog')
                    this.$router.push({name: 'EOCComplexOutpatientCaseSummary', params: {Id: this.$route.params.Id}})
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
          // this.getMasterDatas({Form: 'OPDOEN'}, () => {
          //   this.getData()
          // })
          }
        }).catch(e => {
          // this.edited = false
          if (e.data.IsErorr) {
            this.popUpWarning(e.data.ViMessage)
          }
          this.submiting = false
          if (!this.IsUseHandOverCheckList) {
            this.IsUseHandOverCheckList = true
          }
        })
      }, 100)
      // }
    },
    validateForm () {
      $('.error').removeClass('error')
      if (this.DataSubmit.Status.Code === 'EOCIH' || this.DataSubmit.Status.Code === 'EOCNE') return true
      var error = []
      $('#OutpatientExaminationNoteForm').find('textarea').each((e, elm) => {
        var val = $(elm).val() || ''
        if ($(elm).data('code') && !(val.trim())) {
          if (this.DataSubmit.Status.Code === 'EOCWR' && ['OPDOENTP0ANS', 'OPDOENRFUANS', 'OPDOENDORANS', 'OPDOENPT0ANS', 'OPDOENDD0ANS'].includes($(elm).data('code'))) {
            // pass
          } else {
            error.push(this.MDITEMINFO[$(elm).data('code')])
          }
        }
      })
      if (this.DataSubmit.Status.Code === 'EOCTE' && !this.MASTERDATA['OPDOENREC2'].Items[0].Value) {
        error.push(this.MASTERDATA['OPDOENREC2'].Items[0])
      }
      if (this.DataSubmit.Status.Code === 'EOCIHT' && !this.MASTERDATA['OPDOENTOT'].Items[0].Value) {
        error.push(this.MASTERDATA['OPDOENTOT'].Items[0])
      }
      if (this.DataSubmit.Status.Code === 'EOCA0' && !this.MASTERDATA['OPDOENREC'].Items[0].Value) {
        error.push(this.MASTERDATA['OPDOENREC'].Items[0])
      }
      if (this.DataSubmit.Status.Code === 'EOCUD' && (!this.MASTERDATA['OPDOENRFT1'].Items[0].Value && !this.MASTERDATA['OPDOENRFT1'].Items[1].Value)) {
        error.push(this.MASTERDATA['OPDOENRFT1'])
      }
      if (this.DataSubmit.Status.Code === 'EOCUD' && !this.MASTERDATA['OPDOENTD0'].Items[0].Value) {
        error.push(this.MASTERDATA['OPDOENTD0'].Items[0])
      }
      // if (this.MASTERDATA['OPDOENKTTV2'].Items[0].Value === '' || this.MASTERDATA['OPDOENKTTV2'].Items[0].Value === null) {
      //   error.push(this.MASTERDATA['OPDOENKTTV2'].Items[0])
      // }
      // if (this.MASTERDATA['OPDOENKCK'].Items[0].Value === '' || this.MASTERDATA['OPDOENKCK'].Items[0].Value === null) {
      //   error.push(this.MASTERDATA['OPDOENKCK'].Items[0])
      // }
      if (!this.isEHOS()) {
        if (this.DataSubmit.Status.Code !== 'EOCWR' && !this.MASTERDATA['OPDOENICD'].Items[0].Value) {
          error.push(this.MASTERDATA['OPDOENICD'].Items[0])
        }
      }
      this.errors = error
      this.errors = this.errors.filter(i => i.Code !== 'OPDOENKHHLV2' && i.Code !== 'OPDOENKBPKLV2')
      if (this.errors.length) {
        this.handlerResponse({Error: this.errors})
      }
    },
    getDataSubmit () {
      console.log('this.DataSubmit.Status', this.DataSubmit.Status)
      this.validateForm()
      this.DataSubmit.Datas = []
      this.DataSubmit._Exception = []
      // Check neu khong nhap noi tru hoac chuyen cap cuu
      if (this.DataSubmit.Status.Code !== 'EOCA0' && this.DataSubmit.Status.Code !== 'EOCTE') {
        this.IsUseHandOverCheckList = false
      }
      this.DataSubmit.IsUseHandOverCheckList = this.IsUseHandOverCheckList
      var obj = {}
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items && this.checkInClinic(this.MASTERDATA[property].Clinic)) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (item.Code === 'OPDOENICDANS' || item.Code === 'OPDOENICDOPT') {
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'OPDOENDORANS' && typeof item.Value === 'object') {
              val = this.moment2String(item.Value, this.vDateFormat)
            }
            if (item.Code === 'OPDOENTD0ANS' && typeof item.Value === 'object') {
              val = this.moment2String(item.Value)
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val
            })
            obj[item.Code] = item.Value
            if (item.Code === 'OPDOENREC2ANS') {
              var objOPDOENREC2ANS = this.MDSPECIALITIES.find(e => e.Id === obj['OPDOENREC2ANS'])
              this.DataSubmit._Exception.push({
                key: '_OPDOENREC2ANS',
                value: objOPDOENREC2ANS ? objOPDOENREC2ANS.ViName : 'N/A'
              })
            }
            if (item.Code === 'OPDOENRECANS') {
              var objOPDOENRECANS = this.MDSPECIALITIES.find(e => e.Id === obj['OPDOENRECANS'])
              this.DataSubmit._Exception.push({
                key: '_OPDOENRECANS',
                value: objOPDOENRECANS ? objOPDOENRECANS.ViName : 'N/A'
              })
            }
          })
        }
      }

      var DataSubmit = Object.assign({}, this.DataSubmit)
      if (typeof DataSubmit.ExaminationTime === 'object') {
        DataSubmit.ExaminationTime = this.moment2String(DataSubmit.ExaminationTime)
      }
      if (DataSubmit.ExaminationTime && this.rawData.ExaminationTime !== DataSubmit.ExaminationTime) {
        DataSubmit._Exception.push({
          key: 'ExaminationTime',
          value: DataSubmit.ExaminationTime
        })
      }
      return DataSubmit
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
    onSearch (search, loading) {
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      new ICD10Service({search: search, pageSize: 25}).create({search: search, pageSize: 25}).then(res => {
        vm.options = res.map(e => {
          return {
            code: e.Code,
            label: e.Code + ', ' + e.ViName
          }
        })
      })
    }, 350),
    // autoLoadOPDOENPT0 (loading) {
    //   if (this.MASTERDATA && this.MASTERDATA['OPDOENPT0']) {
    //     this.MASTERDATA['OPDOENPT0'].Items[0].Value = null
    //     new OutpatientExaminationNote({hidemsg: true, noLoading: !loading}).create({Id: this.$route.params.Id}, 'SyncPrincipalTest').then(response => {
    //       this.syncOPDOENPT0At = new Date()
    //       var val = response
    //       if (val) {
    //         this.MASTERDATA['OPDOENPT0'].Items[0].Value = JSON.stringify(response)
    //       }
    //     }).catch(e => {
    //       console.log(e)
    //     })
    //   }
    // },
    loadOPDOENHPI () {
      new OutpatientExaminationNote().update('SyncHistoryOfPresentIllness/' + this.$route.params.Id).then(response => {
        this.SyncHistoryOfPresentIllness = response
        if (response.length === 0) {
          this.toastedInfo(this.__t('Không có thông tin khai thác bệnh sử trong 24h'))
        }
      })
    },
    loadOPDOENHOA () {
      new OutpatientExaminationNote().update('SyncHistoryOfAllergies/' + this.$route.params.Id).then(response => {
        this.HistoryOfAllergies = response.HistoryOfAllergies
        this.InitialAssessmentAllergies = response.InitialAssessmentAllergies
        if (this.HistoryOfAllergies.length === 0) {
          this.toastedInfo('Không có thông tin khai thác dị ứng')
        }
      })
    },
    loadOPDOENPMH (data) {
      new OutpatientExaminationNote().update('SyncPastMedicalHistory/' + this.$route.params.Id).then(response => {
        this.SyncPastMedicalHistory = response
        if (this.SyncPastMedicalHistory.length === 0) {
          this.toastedError(this.__t('Không có dữ liệu'))
        }
      })
    },
    pushToOPDOENPT0 (pa) {
      var str1 = ''
      var str2 = ''
      if (pa[0]) {
        str1 = `${pa[0]}`
      }
      if (pa[1]) {
        str2 = `\nKết quả chẩn đoán hình ảnh: \n ${pa[1]}`
      }
      console.log(str1 + str2)
      this.MASTERDATA['OPDOENPT0'].Items[1].Value = (str1 ? 'Kết quả xét nghiệm: \n ' + str1 : '') + str2
      return str1 + str2
    },
    parserOPDOENPT0 (str) {
      if (!str) return ['', '']
      var parstring = str.replace('Kết quả xét nghiệm: \n', '').split('Kết quả chẩn đoán hình ảnh: \n')
      if (parstring.length === 1) return ['', parstring[0]]
      return parstring
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
      this.MASTERDATA['OPDOENPT0'].Items[1].Value = this.trim_(oldstr, '\n')
    },
    hasKQXN (str) {
      return str.includes('Kết quả xét nghiệm:')
    },
    hasCDHA (str) {
      return str.includes('Kết quả chẩn đoán hình ảnh:')
    },
    copyToOPDOENICD (data) {
      this.MASTERDATA['OPDOENDD0'].Items.forEach(item => {
        if (data.Diagnosis && item.Code === 'OPDOENDD0ANS') {
          item.Value = data.Diagnosis
        }
      })
      this.MASTERDATA['OPDOENICD'].Items.forEach(item => {
        if (data.PrimaryICD && item.Code === 'OPDOENICDANS') {
          item.Value = data.PrimaryICD.filter(e => e.code)
        }
      })
    },
    copyToOPDOENPT0 (str, type) {
      str = this.trim_(str)
      if (this.MASTERDATA['OPDOENPT0'].Items[1].Value && this.MASTERDATA['OPDOENPT0'].Items[1].Value.includes(str)) {
      } else {
        var old = this.MASTERDATA['OPDOENPT0'].Items[1].Value ? (this.trim_(this.MASTERDATA['OPDOENPT0'].Items[1].Value)) : ''
        // var old = this.MASTERDATA['OPDOENPT0'].Items[1].Value ? (this.trim_(this.MASTERDATA['OPDOENPT0'].Items[1].Value) + ', ') : ''
        if (type) {
          this.mapCDHAStr(old, str, type)
        } else {
          this.MASTERDATA['OPDOENPT0'].Items[1].Value = this.trim_(old + (str), ', ')
        }
      }
    },
    copyToOPDOENHOA (str) {
      str = this.trim_(str)
      if (this.MASTERDATA['OPDOENHOA'].Items[0].Value && this.MASTERDATA['OPDOENHOA'].Items[0].Value.includes(str)) {
      } else {
        var old = this.MASTERDATA['OPDOENHOA'].Items[0].Value ? (this.trim_(this.MASTERDATA['OPDOENHOA'].Items[0].Value) + ', ') : ''
        this.MASTERDATA['OPDOENHOA'].Items[0].Value = this.trim_(old + (str), ', ')
        this.toastedInfo('Đã copy')
      }
    },
    copyOPDOENPMH (str) {
      str = this.trim_(str)
      if (this.MASTERDATA['OPDOENPMH'].Items[0].Value && this.MASTERDATA['OPDOENPMH'].Items[0].Value.includes(str)) {
      } else {
        var old = this.MASTERDATA['OPDOENPMH'].Items[0].Value ? (this.trim_(this.MASTERDATA['OPDOENPMH'].Items[0].Value) + '\n') : ''
        this.MASTERDATA['OPDOENPMH'].Items[0].Value = this.trim_(old + '-' + str, ', ')
        this.toastedInfo('Đã copy')
      }
    },
    copyToOPDOENHPI (str) {
      str = this.trim_(str)
      if (this.MASTERDATA['OPDOENHPI'].Items[0].Value && this.MASTERDATA['OPDOENHPI'].Items[0].Value.includes(str)) {
      } else {
        var old = this.MASTERDATA['OPDOENHPI'].Items[0].Value ? (this.trim_(this.MASTERDATA['OPDOENHPI'].Items[0].Value) + '\n') : ''
        this.MASTERDATA['OPDOENHPI'].Items[0].Value = this.trim_(old + '-' + str, ', ')
        this.toastedInfo('Đã copy')
      }
    },
    SyncVisitHistory () {
      new OutpatientExaminationNote().update('SyncVisitHistory', {Id: this.$route.params.Id}).then(response => {
        console.log(response)
        this.HistoryOfAllergies = response.HistoryOfAllergies
        this.InitialAssessmentAllergies = response.InitialAssessmentAllergies
        this.SyncHistoryOfPresentIllness = response.HistoryOfPresentIllness
        this.SyncPastMedicalHistory = response.PastMedicalHistory
      })
    },
    getData () {
      this.OPDOENTUCO_TMP = []
      this.MDITEMINFO = {}
      if (this.$route.params.Id) {
        new OutpatientExaminationNote({hidemsg: true}).find(this.$route.params.Id).then(response => {
          this.DataSubmit = response
          this.IsCheckTransfer = response.IsCheckTranfer
          this.IsAcceptPhysician = response.IsAcceptPhysician
          this.IsAcceptNurse = response.IsAcceptNurse
          if (this.IsAcceptPhysician || this.IsAcceptNurse) {
            this.IsReadOnLy = true
          }
          this.IsUseHandOverCheckList = response.IsUseHandOverCheckList
          if (!this.IsUseHandOverCheckList) {
            this.IsUseHandOverCheckList = true
          }
          if (!this.DataSubmit.ExaminationTime) {
            this.DataSubmit.ExaminationTime = new Date()
          } else {
            this.DataSubmit.ExaminationTime = this.string2Moment(this.DataSubmit.ExaminationTime)
          }
          this.DataSubmit.Room = this.Rooms.find(e => e.Id === this.DataSubmit.RoomId)
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                this.$set(this.MDITEMINFO, item.Code, item)
                if (property === 'OPDOENTUCO') {
                  item.Data = this.JSONParse(item.Data)
                  this.OPDOENTUCO_TMP = [...this.OPDOENTUCO_TMP, ...item.Data]
                }
                var code = item.Code
                var exited = _.find(this.DataSubmit.Datas, {Code: code})
                if (exited) {
                  if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                    var isTrue = (exited.Value === 'True')
                    item.Value = isTrue
                  } else if (item.Code === 'OPDOENICDANS' || item.Code === 'OPDOENICDOPT') {
                    item.Value = this.JSONParse(exited.Value)
                  } else if (exited.Value && (item.Code === 'OPDOENDORANS_' || item.Code === 'OPDOENTD0ANS')) {
                    item.Value = this.string2Moment(exited.Value)
                  } else {
                    item.Value = exited.Value
                    // if (!exited.Value && this.checkString(item.DataType, 'Text') && item.Data) {
                    //   console.log((JSON.stringify(item.Data)).join(', \n'))
                    //   item.Value = (JSON.stringify(item.Data)).join(', \n')
                    // }
                  }
                } else {
                  item.Value = null
                  if (this.checkString(item.DataType, 'Text') && item.Data) {
                    console.log(item.Code)
                    // item.Value = (this.JSONParse(item.Data) || []).join(', \n')
                  }
                }
              })
            }
          }
          if (this.isEHOS() && this.isPrimaryDoctorOrAuthorizedDoctor) this.autoSyncIcd()
          setTimeout(() => {
            if (this.isPrimaryDoctorOrAuthorizedDoctor) this.SyncVisitHistory()
            this.setMenuItems()
            if (this.MASTERDATA['OPDOENYTD']) {
              if (!this.MASTERDATA['OPDOENYTD'].Items.find(e => e.Value)) this.MASTERDATA['OPDOENYTD'].Items[0].Value = true
            }
            this.rawData = this.cloneObj(this.DataSubmit)
            this.setLastData()
          }, 10)
          this.loaded = true
          this.Version = response.Version
        }).catch(e => {
          console.log(e)
          if (e.status !== 404) {
            this.hasErrForm = true
          } else {
            this.noEONFormData = e.data
          }
          this.loaded = true
        })
      }
    },
    autoSyncIcd () {
      new OutpatientExaminationNote({hidemsg: true, noLoading: true}).update('SyncDiagnosisAndICD/' + this.$route.params.Id, {Id: this.$route.params.Id}).then(response => {
        this.syncIcdAt = new Date()
        this.syncIcdInterval = setTimeout(() => {
          this.autoSyncIcd()
        }, 15 * 1000)
        if (response) {
          this.MASTERDATA['OPDOENID0'].Items.forEach(item => {
            if (response.InitialDiagnosis && item.Code === 'OPDOENID0ANS' && !item.Value) {
              item.Value = response.InitialDiagnosis
            }
          })
          this.MASTERDATA['OPDOENDD0'].Items.forEach(item => {
            if (response.Diagnosis && item.Code === 'OPDOENDD0ANS') {
              item.Value = response.Diagnosis
            }
          })
          this.MASTERDATA['OPDOENICD'].Items.forEach(item => {
            if (response.PrimaryICD && item.Code === 'OPDOENICDANS') {
              item.Value = response.PrimaryICD.filter(e => e.code)
            }
            if (response.OptionICD && item.Code === 'OPDOENICDOPT' && (!item.Value || item.Value.length === 0)) {
              item.Value = response.OptionICD.filter(e => e.code)
            }
          })
        }
        if (this.MASTERDATA['OPDOENRFU'] && !this.MASTERDATA['OPDOENRFU'].Items[0].Value) {
          if (response.PrimaryICD && this.isNew) this.updateIcd(response.PrimaryICD)
          if (response.OptionICD && this.isNew) this.updateIcd(response.OptionICD)
        }
      })
    },
    autoSaveDraft () {
      // var DataSubmit = this.getDataSubmit()
      // setTimeout(() => {
      //   storage.set('OutpatientExaminationNote#' + this.$route.params.Id, JSON.stringify(DataSubmit))
      // }, 100)
    },
    getDataDraft () {
      return storage.get('OutpatientExaminationNote#' + this.$route.params.Id)
    }
  },
  beforeDestroy () {
    if (this.syncIcdInterval) clearTimeout(this.syncIcdInterval)
    if (this.OPDOENPT0Timeout) clearTimeout(this.OPDOENPT0Timeout)
    EventBus.$off('ICDUPDATED')
  }
}
</script>
