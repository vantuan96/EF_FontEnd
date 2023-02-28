<template>
  <div class="maint-content" id="PreAnesthesiaConsultation">
    <h2 class="text-center mb-20"><b>{{__t('Phiếu khám gây mê')}}</b></h2>
    <div v-if="loaded">
      <div v-if="DataSubmit.Datas">
        <template>
          <div class="box box-table">
            <div class="box-body">
              <div class="row">
                <!-- Bac si kham gay me -->
                <div v-if="MASTERDATA['PRANCO1']" class="flex-box flex-center col-md-6">
                  <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO1'])}}:</label>
                  <UsersSelect2 v-model="MASTERDATA['PRANCO1'].Items[0].Value" />
                </div>
                <!-- Ngay gio tham kham -->
                <div v-if="MASTERDATA['PRANCO3']" class="flex-box flex-center col-md-6">
                  <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO3'])}}:</label>
                  <VDatePicker v-model="MASTERDATA['PRANCO3'].Items[0].Value" :allday="false" :hideTooltip="true" :format="vDateTimeFormat"/>
                </div>
              </div>
              <div class="bg-gray-2 mt-10">
                <!-- Loai phau thuat -->
                <div v-if="MASTERDATA['PRANCO5']">
                  <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO5'])}}:</label>
                  <textarea-autosize rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO5'].Items[0].Value"/>
                </div>
                <div class="row mt-10">
                  <!-- Ngay phau thuat -->
                  <div v-if="MASTERDATA['PRANCO7']" class="flex-box flex-center col-md-6">
                    <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO7'])}}:</label>
                    <VDatePicker v-model="MASTERDATA['PRANCO7'].Items[0].Value" :allday="false" :hideTooltip="true" :format="'DD/MM/YYYY'"/>
                  </div>
                  <!-- Thoi gian phau thuat du kien -->
                  <div v-if="MASTERDATA['PRANCO9']" class="flex-box flex-center col-md-6">
                    <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO9'])}}:</label>
                    <v-masked-input placeholder="hh:mm" mask="11:11" class="form-control" v-model="MASTERDATA['PRANCO9'].Items[0].Value"/>
                  </div>
                </div>
                <!-- Ten phau thuat vien -->
                <div v-if="MASTERDATA['PRANCO11']" class="mt-10">
                  <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO11'])}}:</label>
                  <div style="width: 450px">
                    <UsersSelect2 v-model="MASTERDATA['PRANCO11'].Items[0].Value" />
                  </div>
                </div>
              </div>
              <!-- Danh gia ban dau -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO13'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO13']" class="row">
                  <!-- Can nang hien tai -->
                  <div v-if="MASTERDATA['PRANCO13']" class="col-md-4">
                    <div class="flex-box flex-center">
                      <label class="display-inline mr-5 no-wrap w200" style="font-weight: bold">{{__label(MASTERDATA['PRANCO13'].Items[2])}}:</label>
                      <MDNumberInput :code="MASTERDATA['PRANCO13'].Items[1].Code" v-model="MASTERDATA['PRANCO13'].Items[2].Value" />
                    </div>
                  </div>
                  <!-- Chieu cao -->
                  <div v-if="MASTERDATA['PRANCO13']" class="col-md-4">
                    <div class="flex-box flex-center">
                      <label class="display-inline mr-5 no-wrap w100" style="font-weight: bold">{{__label(MASTERDATA['PRANCO13'].Items[3])}}:</label>
                      <MDNumberInput :code="MASTERDATA['PRANCO13'].Items[2].Code" v-model="MASTERDATA['PRANCO13'].Items[3].Value" />
                    </div>
                  </div>
                  <!-- BMI -->
                  <div v-if="MASTERDATA['PRANCO13']" class="col-md-4">
                    <div class="flex-box flex-center">
                      <label class="display-inline mr-5 w50" style="font-weight: bold">{{__label(MASTERDATA['PRANCO13'].Items[4])}}:</label>
                      <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO13'].Items[4].Value"/>
                    </div>
                  </div>
                </div>
                <div v-if="MASTERDATA['PRANCO13']" class="row mt-5">
                  <!-- SpO2 -->
                  <div v-if="MASTERDATA['PRANCO13']" class="col-md-4">
                    <div class="flex-box flex-center">
                      <label class="display-inline mr-5" style="font-weight: bold; width: 300px;">{{__label(MASTERDATA['PRANCO13'].Items[5])}}:</label>
                      <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO13'].Items[5].Value"/>
                    </div>
                  </div>
                  <!-- BP -->
                  <div v-if="MASTERDATA['PRANCO13']" class="col-md-4">
                    <div class="flex-box flex-center">
                      <label class="display-inline mr-5 w100" style="font-weight: bold">{{__label(MASTERDATA['PRANCO13'].Items[6])}}:</label>
                      <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO13'].Items[6].Value"/>
                    </div>
                  </div>
                  <!-- Mach -->
                  <div v-if="MASTERDATA['PRANCO13']" class="col-md-4">
                    <div class="flex-box flex-center">
                      <label class="display-inline mr-5 w50" style="font-weight: bold">{{__label(MASTERDATA['PRANCO13'].Items[7])}}:</label>
                      <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO13'].Items[7].Value"/>
                    </div>
                  </div>
                </div>
                <div class="mt-10">
                  <span>{{__t('Thông tin khai thác gần nhất:') }}</span>
                  <span class="mr-10" v-if="InitialAssessment"><b>{{__t('Cân nặng hiện tại')}}:</b> {{InitialAssessment.ActualWeigh || 'N/A'}} {{__t('kg')}}</span>
                  <span class="mr-10" v-if="InitialAssessment"><b>{{__t('Chiều cao')}}:</b> {{InitialAssessment.Height || 'N/A'}} {{__t('cm')}}</span>
                  <span class="mr-10" v-if="InitialAssessment"><b>{{__t('BMI')}}:</b> {{setBMI || 'N/A'}} {{___t('')}}</span>
                  <span class="mr-10" v-if="InitialAssessment"><b>{{__t('SpO2')}}:</b> {{InitialAssessment.SpO2 || 'N/A'}} {{__t('%')}}</span>
                  <span class="mr-10" v-if="InitialAssessment"><b>{{__t('BP')}}:</b> {{InitialAssessment.BP || 'N/A'}} {{___t('')}}</span>
                  <span class="mr-10" v-if="InitialAssessment"><b>{{__t('Mạch')}}:</b> {{InitialAssessment.Pulse || 'N/A'}} {{__t('lần/phút')}}</span>
                  <BtnCopy :hideCopy="true" :value="null" @copy="handleCopyInitialAssessment"/>
                </div>
              </div>
              <!-- Nguy co 0 1 2 -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO22'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO22']" class="row">
                  <div class="col-md-6">
                    <template  v-for="(item, index) in MASTERDATA['PRANCO22'].Items">
                      <div v-if="index <= 3" :key="index">
                        <div class="w25p" :key="index" v-if="item.DataType === 'Checkbox'">
                          <div class="flex-box flex-center">
                            <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                            <span class="v-checkbox" v-else>
                              <input type="checkbox" :id="'PRANCO22radio-' + index" v-model="item.Value">
                              <label :for="'PRANCO22radio-' + index"></label>
                            </span>
                            <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="col-md-6">
                    <template  v-for="(item, index) in MASTERDATA['PRANCO22'].Items">
                      <div v-if="index > 3" :key="index">
                        <div class="w25p" :key="index" v-if="item.DataType === 'Checkbox'">
                          <div class="flex-box flex-center">
                            <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                            <span class="v-checkbox" v-else>
                              <input type="checkbox" :id="'PRANCO22radio-' + index" v-model="item.Value">
                              <label :for="'PRANCO22radio-' + index"></label>
                            </span>
                            <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                <!-- Check nguy co 0 1 2 -->
                <div v-if="MASTERDATA['PRANCO31']">
                  <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO31'])}}:</label>
                  <textarea-autosize rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO31'].Items[0].Value"/>
                </div>
                <!-- Bac si gay me thuc hien vo cam -->
                <div v-if="MASTERDATA['PRANC33']" class="mt-10">
                  <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANC33'])}}:</label>
                  <div style="width: 450px">
                    <UsersSelect2 v-model="MASTERDATA['PRANC33'].Items[0].Value" />
                  </div>
                </div>
              </div>
              <!-- So thich, thoi quen -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO35'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO35']">
                  <template  v-for="(item, index) in MASTERDATA['PRANCO35'].Items">
                    <div :key="index">
                      <div :key="index" v-if="item.DataType === 'Checkbox'">
                        <div class="flex-box flex-center">
                          <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                          <span class="v-checkbox" v-else>
                            <input type="checkbox" :id="'PRANCO35radio-' + index" v-model="item.Value">
                            <label :for="'PRANCO35radio-' + index"></label>
                          </span>
                          <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                          <div style="width: 100%" class="ml-5" v-if="MASTERDATA['PRANCO35'].Items[3].Value && index === 3">
                            <div class="fake-input" v-if="isReadOnly">{{MASTERDATA['PRANCO35'].Items[4].Value || 'N/A'}}</div>
                            <textarea-autosize v-else class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO35'].Items[4].Value"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <!-- Tien su -->
              <label v-if="MASTERDATA['PRANCO41']" class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO41'])}}:</label>
              <div v-if="MASTERDATA['PRANCO41']" class="bg-gray-2">
                <!-- Da dieu tri -->
                <div v-if="MASTERDATA['PRANCO41']">
                  <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO41'].Items[0])}}:</label>
                  <textarea-autosize rows="3" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO41'].Items[0].Value"/>
                </div>
                <!-- Thong tin khai thac tien su benh -->
                <div v-if="MASTERDATA['PRANCO41']">
                  <div class="HistoryOfPresentIllness"  v-if="SyncPastMedicalHistory && SyncPastMedicalHistory.length">
                    <label>{{__t('Thông tin khai thác tiền sử bệnh')}}:</label>
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
                              <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyToMDWithCode('PRANCO41', item.Value)">Copy</button></td>
                            </tr>
                          </tbody>
                        </table>
                      </template>
                    </vue-scrolling-table>
                  </div>
                </div>
                <!-- Da duoc kiem soat -->
                <div v-if="MASTERDATA['PRANCO41']" class="mt-10">
                  <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO41'].Items[1])}}:</label>
                  <textarea-autosize rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO41'].Items[1].Value"/>
                </div>
              </div>
              <!-- Tien su ngoai khoa -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO44'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO44']">
                  <MDRadio v-if="MASTERDATA['PRANCO44']" v-model="MASTERDATA['PRANCO44']"/>
                  <div v-if="MASTERDATA['PRANCO44'].Items[0].Value">
                    <div class="mt-10">
                      <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO44'].Items[2])}}:</label>
                      <textarea-autosize rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO44'].Items[2].Value"/>
                    </div>
                    <div class="mt-10">
                      <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO44'].Items[3])}}:</label>
                      <textarea-autosize rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO44'].Items[3].Value"/>
                    </div>
                    <div class="mt-10">
                      <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO44'].Items[4])}}:</label>
                      <VNumberInput v-model="MASTERDATA['PRANCO44'].Items[4].Value"/>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Tien su san khoa -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO50'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO50']">
                  <MDRadio v-if="MASTERDATA['PRANCO50']" v-model="MASTERDATA['PRANCO50']"/>
                  <div v-if="MASTERDATA['PRANCO50'].Items[0].Value">
                    <div class="mt-10">
                      <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO50'].Items[2])}}:</label>
                      <textarea-autosize rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO50'].Items[2].Value"/>
                    </div>
                    <div class="mt-10">
                      <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO50'].Items[3])}}:</label>
                      <textarea-autosize rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO50'].Items[3].Value"/>
                    </div>
                    <div class="mt-10">
                      <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO50'].Items[4])}}:</label>
                      <textarea-autosize rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO50'].Items[4].Value"/>
                    </div>
                    <div class="mt-10">
                      <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO50'].Items[5])}}:</label>
                      <VNumberInput v-model="MASTERDATA['PRANCO50'].Items[5].Value"/>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Tien su di ung -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO57'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO57']">
                  <template  v-for="(item, index) in MASTERDATA['PRANCO57'].Items">
                    <div :key="index">
                      <div :key="index" v-if="item.DataType === 'Checkbox'">
                        <div class="flex-box flex-center">
                          <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                          <span class="v-checkbox" v-else>
                            <input type="checkbox" :id="'PRANCO57radio-' + index" v-model="item.Value">
                            <label :for="'PRANCO57radio-' + index"></label>
                          </span>
                          <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                          <div class="ml-5" v-if="MASTERDATA['PRANCO57'].Items[1].Value && index === 1">
                            <div class="fake-input" v-if="isReadOnly">{{MASTERDATA['PRANCO57'].Items[2].Value || 'N/A'}}</div>
                            <textarea-autosize v-else class="form-control" rows="1" :placeholder="__t('Bắt buộc phải nhập')" v-model="MASTERDATA['PRANCO57'].Items[2].Value"/>
                          </div>
                          <div class="ml-5" v-if="MASTERDATA['PRANCO57'].Items[3].Value && index === 3">
                            <div class="fake-input" v-if="isReadOnly">{{MASTERDATA['PRANCO57'].Items[4].Value || 'N/A'}}</div>
                            <textarea-autosize v-else class="form-control" rows="1" :placeholder="__t('Bắt buộc phải nhập')" v-model="MASTERDATA['PRANCO57'].Items[4].Value"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
                <!-- Thong tin khai thac di ung -->
                <div v-if="MASTERDATA['PRANCO58']">
                  <div class="HistoryOfPresentIllness"  v-if="SyncHistoryOfAllergies && SyncHistoryOfAllergies.length">
                    <label>{{__t('Thông tin khai thác tiền dị ứng')}}:</label>
                    <vue-scrolling-table v-if="SyncHistoryOfAllergies.length">
                      <template slot="tbl">
                        <table class="table table-bordered table-bordered-x">
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
                            <tr :data="item" :key="index"  v-for="(item, index) in SyncHistoryOfAllergies">
                              <td class="no-wrap">{{item.ExaminationTime}}</td>
                              <td class="no-wrap"><ad-Info :ad="item.PrimaryDoctor" :type="item.Type" /></td>
                              <td class="no-wrap">{{__label(item.Clinic)}}</td>
                              <td><p v-if="item.Value">{{item.Value}}</p></td>
                              <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyToMDWithCode('PRANCO58', item.Value)">Copy</button></td>
                            </tr>
                          </tbody>
                        </table>
                      </template>
                    </vue-scrolling-table>
                  </div>
                </div>
                <!-- Phan ung di ung -->
                <div v-if="MASTERDATA['PRANCO63']">
                  <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO63'])}}:</label>
                  <template v-for="(item, index) in MASTERDATA['PRANCO63'].Items">
                    <div :key="index">
                      <div :key="index" v-if="item.DataType === 'Checkbox'">
                        <div class="flex-box flex-center">
                          <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                          <span class="v-checkbox" v-else>
                            <input type="checkbox" :id="'PRANCO63radio-' + index" v-model="item.Value">
                            <label :for="'PRANCO63radio-' + index"></label>
                          </span>
                          <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                          <div class="ml-5" v-if="MASTERDATA['PRANCO63'].Items[3].Value && index === 3">
                            <div class="fake-input" v-if="isReadOnly">{{MASTERDATA['PRANCO63'].Items[4].Value || 'N/A'}}</div>
                            <textarea-autosize v-else class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO63'].Items[4].Value"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <!-- Thuoc dang dung -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO69'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO69']">
                </div>
              </div>
              <!-- Ket qua kham lam sang -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO76'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO76']">
                  <textarea-autosize class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO76'].Items[0].Value"/>
                </div>
              </div>
              <!-- Ket qua xet nghiem mau -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO78'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO78']">
                  <div class="flex-box flex-center">
                    <MDRadio v-if="MASTERDATA['PRANCO78']" v-model="MASTERDATA['PRANCO78']"/>
                    <div style="width: 81%" v-if="MASTERDATA['PRANCO78'].Items[1].Value">
                      <textarea-autosize class="form-control ml-5" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO78'].Items[2].Value"/>
                    </div>
                  </div>
                  <textarea-autosize class="form-control mt-10" rows="2" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO78'].Items[3].Value"/>
                </div>
                <!-- Ket qua xet nghiem -->
                <div>
                  <SyncPrincipalTest :VisitId="this._VisitId" :VisitType="this._VisitType" :Results="['lab']" :copyAllData="true" @copy="copyToForm"/>
                </div>
              </div>
              <!-- Kham chuyen khoa tim mach -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO83'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO83']">
                  <div class="flex-box flex-center">
                    <MDRadio v-if="MASTERDATA['PRANCO83']" v-model="MASTERDATA['PRANCO83']"/>
                    <div v-if="MASTERDATA['PRANCO83'].Items[1].Value">
                      <textarea-autosize class="form-control ml-5" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO83'].Items[2].Value"/>
                    </div>
                  </div>
                  <div v-if="MASTERDATA['PRANCO83'].Items[0].Value">
                    <textarea-autosize class="form-control mt-10" rows="2" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO83'].Items[1].Value"/>
                  </div>
                  <div v-if="MASTERDATA['PRANCO83'].Items[2].Value">
                    <textarea-autosize class="form-control mt-10" rows="2" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO83'].Items[3].Value"/>
                  </div>
                </div>
                <!-- Thong tin tham kham -->
                <div v-if="MASTERDATA['PRANCO83']">
                  <div class="HistoryOfPresentIllness"  v-if="SyncHistoryOfAllergies && SyncHistoryOfAllergies.length">
                    <label>{{__t('Thông tin khai thác tiền dị ứng')}}:</label>
                    <vue-scrolling-table v-if="SyncHistoryOfAllergies.length">
                      <template slot="tbl">
                        <table class="table table-bordered table-bordered-x">
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
                            <tr :data="item" :key="index"  v-for="(item, index) in SyncHistoryOfAllergies">
                              <td class="no-wrap">{{item.ExaminationTime}}</td>
                              <td class="no-wrap"><ad-Info :ad="item.PrimaryDoctor" :type="item.Type" /></td>
                              <td class="no-wrap">{{__label(item.Clinic)}}</td>
                              <td><p v-if="item.Value">{{item.Value}}</p></td>
                              <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyToMDWithCode('PRANCO83', item.Value)">Copy</button></td>
                            </tr>
                          </tbody>
                        </table>
                      </template>
                    </vue-scrolling-table>
                  </div>
                </div>
              </div>
              <!-- Can them cac xet nghiem hoac danh gia sau hon -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO89'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO89']">
                  <div class="flex-box flex-center">
                    <MDRadio v-if="MASTERDATA['PRANCO89']" v-model="MASTERDATA['PRANCO89']"/>
                  </div>
                  <div v-if="MASTERDATA['PRANCO89'].Items[0].Value">
                    <textarea-autosize class="form-control mt-10" rows="2" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO89'].Items[1].Value"/>
                  </div>
                </div>
              </div>
              <!-- Dan do truoc phau thuat -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO93'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO93']">
                  <div class="flex-box flex-center">
                    <MDRadio v-if="MASTERDATA['PRANCO93']" v-model="MASTERDATA['PRANCO93']"/>
                  </div>
                  <div v-if="MASTERDATA['PRANCO93'].Items[0].Value">
                    <textarea-autosize class="form-control mt-10" rows="2" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO93'].Items[1].Value"/>
                  </div>
                </div>
              </div>
              <!-- Nhin an -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO97'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO97']">
                  <template v-for="(item, index) in MASTERDATA['PRANCO97'].Items">
                    <div :key="index">
                      <div :key="index" v-if="item.DataType === 'Checkbox'">
                        <div class="flex-box flex-center">
                          <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                          <span class="v-checkbox" v-else>
                            <input type="checkbox" :id="'PRANCO97radio-' + index" v-model="item.Value">
                            <label :for="'PRANCO97radio-' + index"></label>
                          </span>
                          <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <!-- Thuoc tien gay me -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO100'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO100']">
                  <div>
                    <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO100'].Items[0])}}:</label>
                    <textarea-autosize rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO100'].Items[1].Value"/>
                  </div>
                  <div class="mt-10">
                    <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO100'].Items[2])}}:</label>
                    <textarea-autosize rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO100'].Items[3].Value"/>
                  </div>
                  <div class="mt-10">
                    <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO100'].Items[4])}}:</label>
                    <v-masked-input placeholder="hh" mask="11" class="form-control" v-model="MASTERDATA['PRANCO100'].Items[5].Value"/>
                  </div>
                </div>
              </div>
              <!-- Thong tinh khac -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO107'])}}:</label>
              <textarea-autosize v-if="MASTERDATA['PRANCO107']" rows="3" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO107'].Items[0].Value"/>
              <!-- Danh gia duong tho -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO109'])}}:</label>
              <div class="bg-gray-2">
                <!-- Tien luong dat mask khong khi kho -->
                <div v-if="MASTERDATA['PRANCO110']">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="MASTERDATA['PRANCO110'].Items[0].Value" v-if="isReadOnly"/>
                        <span class="v-checkbox" v-else>
                          <input type="checkbox" :id="'PRANCO110radio'" v-model="MASTERDATA['PRANCO110'].Items[0].Value">
                          <label :for="'PRANCO110radio'"></label>
                        </span>
                        <span class="displaytbl no-wrap"><span>{{__label(MASTERDATA['PRANCO110'])}}</span></span>
                      </div>
                      <div class="ml-20" v-if="MASTERDATA['PRANCO110'].Items[0].Value">
                        <!-- Tien su dat ong khi quan kho -->
                        <div class="flex-box flex-center">
                          <p style="margin: 0">{{__label(MASTERDATA['PRANCO112'])}}:</p>
                          <MDRadio v-if="MASTERDATA['PRANCO112']" v-model="MASTERDATA['PRANCO112']"/>
                        </div>
                        <!-- Diem Mallampati -->
                        <div class="flex-box flex-center mt-5">
                          <p class="no-wrap w250" style="margin: 0">{{__label(MASTERDATA['PRANCO110'].Items[1])}}:</p>
                          <VSelect class='select-full-w' v-model="MASTERDATA['PRANCO110'].Items[2].Value" :placeholder="__t('Chọn')" :items="mallampatiOption" />
                        </div>
                        <!-- Mo mieng -->
                        <div class="flex-box flex-center mt-5">
                          <p class="no-wrap w250" style="margin: 0">{{__label(MASTERDATA['PRANCO110'].Items[3])}}:</p>
                          <VSelect class='select-full-w' v-model="MASTERDATA['PRANCO110'].Items[4].Value" :placeholder="__t('Chọn')" :items="mouthOpenOption" />
                        </div>
                        <!-- Khoang cach cam giap -->
                        <div class="flex-box flex-center mt-5 mb-5">
                          <p class="no-wrap w250" style="margin: 0">{{__label(MASTERDATA['PRANCO110'].Items[5])}}:</p>
                          <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO110'].Items[6].Value"/>
                        </div>
                        <!-- Van dong -->
                        <p class="no-wrap w200" style="margin: 0">{{__label(MASTERDATA['PRANCO110'].Items[7])}}:</p>
                        <div class="ml-5">
                          <!-- Ham duoi -->
                          <div class="flex-box flex-center">
                            <p class="no-wrap w100" style="margin: 0">{{__label(MASTERDATA['PRANCO122'])}}:</p>
                            <MDRadio v-if="MASTERDATA['PRANCO122']" v-model="MASTERDATA['PRANCO122']"/>
                          </div>
                          <!-- Co -->
                          <div class="flex-box flex-center">
                            <p class="no-wrap w100" style="margin: 0">{{__label(MASTERDATA['PRANCO125'])}}:</p>
                            <MDRadio v-if="MASTERDATA['PRANCO125']" v-model="MASTERDATA['PRANCO125']"/>
                          </div>
                        </div>
                      </div>
                      <!-- Rang gia -->
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="MASTERDATA['PRANCO128'].Items[0].Value" v-if="isReadOnly"/>
                        <span class="v-checkbox" v-else>
                          <input type="checkbox" :id="'PRANCO128radio'" v-model="MASTERDATA['PRANCO128'].Items[0].Value">
                          <label :for="'PRANCO128radio'"></label>
                        </span>
                        <span class="displaytbl no-wrap"><span>{{__label(MASTERDATA['PRANCO128'])}}</span></span>
                      </div>
                      <div class="ml-5" v-if="MASTERDATA['PRANCO128'].Items[0].Value">
                        <MDRadio v-if="MASTERDATA['PRANCO128']" v-model="MASTERDATA['PRANCO128']"/>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <!-- Du kien duong tho kho -->
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="MASTERDATA['PRANCO132'].Items[0].Value" v-if="isReadOnly"/>
                        <span class="v-checkbox" v-else>
                          <input type="checkbox" :id="'PRANCO132radio'" v-model="MASTERDATA['PRANCO132'].Items[0].Value">
                          <label :for="'PRANCO132radio'"></label>
                        </span>
                        <span class="displaytbl no-wrap"><span>{{__label(MASTERDATA['PRANCO132'])}}</span></span>
                      </div>
                      <!-- Tien luong khong the dat ong -->
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="MASTERDATA['PRANCO134'].Items[0].Value" v-if="isReadOnly"/>
                        <span class="v-checkbox" v-else>
                          <input type="checkbox" :id="'PRANCO134radio'" v-model="MASTERDATA['PRANCO134'].Items[0].Value">
                          <label :for="'PRANCO134radio'"></label>
                        </span>
                        <span class="displaytbl no-wrap"><span>{{__label(MASTERDATA['PRANCO134'])}}</span></span>
                      </div>
                      <textarea-autosize v-if="MASTERDATA['PRANCO134'].Items[0].Value" rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO134'].Items[1].Value"/>
                    </div>
                  </div>
                  <!-- Ke hoach kiem soat duong tho khi gay me -->
                  <div class="mt-10">
                    <label class="display-inline mr-5 no-wrap" style="font-weight: bold">{{__label(MASTERDATA['PRANCO137'])}}:</label>
                    <textarea-autosize rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO137'].Items[0].Value"/>
                  </div>
                </div>
              </div>
              <!-- Tien luong gay te truc than kinh kho -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO139'])}}:</label>
              <div v-if="MASTERDATA['PRANCO139']" class="flex-box flex-center">
                <CheckboxValue v-model="MASTERDATA['PRANCO139'].Items[0].Value" v-if="isReadOnly"/>
                <span class="v-checkbox" v-else>
                  <input type="checkbox" :id="'PRANCO139radio'" v-model="MASTERDATA['PRANCO139'].Items[0].Value">
                  <label :for="'PRANCO139radio'"></label>
                </span>
                <span class="displaytbl no-wrap"><span>{{__label(MASTERDATA['PRANCO139'])}}</span></span>
              </div>
              <!-- Tien luong lay ven kho -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO141'])}}:</label>
              <div v-if="MASTERDATA['PRANCO141']" class="flex-box flex-center">
                <CheckboxValue v-model="MASTERDATA['PRANCO141'].Items[0].Value" v-if="isReadOnly"/>
                <span class="v-checkbox" v-else>
                  <input type="checkbox" :id="'PRANCO141radio'" v-model="MASTERDATA['PRANCO141'].Items[0].Value">
                  <label :for="'PRANCO141radio'"></label>
                </span>
                <span class="displaytbl no-wrap"><span>{{__label(MASTERDATA['PRANCO141'])}}</span></span>
              </div>
              <!-- Danh gia nguy co nguoi benh -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO143'])}}:</label>
              <div class="bg-gray-2">
                <div v-if="MASTERDATA['PRANCO143']" class="row">
                  <!-- ASA -->
                  <div class="col-md-3">
                    <div class="flex-box flex-center">
                      <p class="no-wrap" style="margin: 0">{{__label(MASTERDATA['PRANCO143'].Items[0])}}:</p>
                      <VSelect class='select-full-w ml-5' v-model="MASTERDATA['PRANCO143'].Items[0].Value" :placeholder="__t('Chọn')" :items="asaOption" />
                    </div>
                  </div>
                  <!-- Goldman Score -->
                  <div class="col-md-4">
                    <div class="flex-box flex-center">
                      <p class="no-wrap" style="margin: 0">{{__label(MASTERDATA['PRANCO143'].Items[1])}}:</p>
                      <VSelect class='select-full-w ml-5' v-model="MASTERDATA['PRANCO143'].Items[1].Value" :placeholder="__t('Chọn')" :items="goldManOption" />
                    </div>
                  </div>
                </div>
                <!-- Benh nhan co nguy co cao hoac nguy co dac biet -->
                <div v-if="MASTERDATA['PRANCO143']" class="flex-box flex-center">
                  <CheckboxValue v-model="MASTERDATA['PRANCO143'].Items[2].Value" v-if="isReadOnly"/>
                  <span class="v-checkbox" v-else>
                    <input type="checkbox" :id="'PRANCO143radio'" v-model="MASTERDATA['PRANCO143'].Items[2].Value">
                    <label :for="'PRANCO143radio'"></label>
                  </span>
                  <span class="displaytbl no-wrap"><span>{{__label(MASTERDATA['PRANCO143'].Items[2])}}</span></span>
                </div>
              </div>
              <!-- Phau thuat nguy co cao -->
              <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO147'])}}:</label>
              <div v-if="MASTERDATA['PRANCO147']" class="flex-box flex-center">
                <CheckboxValue v-model="MASTERDATA['PRANCO147'].Items[0].Value" v-if="isReadOnly"/>
                <span class="v-checkbox" v-else>
                  <input type="checkbox" :id="'PRANCO147radio'" v-model="MASTERDATA['PRANCO147'].Items[0].Value">
                  <label :for="'PRANCO147radio'"></label>
                </span>
                <span class="displaytbl no-wrap"><span>{{__label(MASTERDATA['PRANCO147'].Items[0])}}</span></span>
              </div>
              <!-- Nguy co huyet khoi tinh mach sau -->
              <div v-if="MASTERDATA['PRANCO149']" class="flex-box flex-center">
                <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO149'])}}:</label>
                <p style="margin: 0; transform: translateY(2px)">(Tuổi, BMI, hút thuốc, Oestrogen, ung thư, tiền sử DVT, đột biến Factor V Leiden, phẫu thuật)</p>
              </div>
              <!-- <div class="flex-box flex-center">
                <p>{{__t('Tuổi')}}: {{patientInfo.Age}}</p>
                <p class="ml-20">{{__t('BMI')}}: {{setBMI}}</p>
              </div> -->
              <textarea-autosize v-if="MASTERDATA['PRANCO149']" rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO149'].Items[0].Value"/>
              <!-- Ke hoach gay me chi tiet -->
              <div v-if="MASTERDATA['PRANCO151']" class="flex-box flex-center">
                <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA['PRANCO151'])}}:</label>
              </div>
              <textarea-autosize v-if="MASTERDATA['PRANCO151']" rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO151'].Items[0].Value"/>
              <!-- Ke hoach gay me chi tiet - checkbox -->
              <div v-if="MASTERDATA['PRANCO151']">
                <div class="row">
                  <div class="col-md-4">
                    <template v-for="(item, index) in MASTERDATA['PRANCO151'].Items">
                      <div :key="index">
                        <div :key="index" v-if="item.DataType === 'Checkbox' && index <= 4">
                          <div class="flex-box flex-center">
                            <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                            <span class="v-checkbox" v-else>
                              <input type="checkbox" :id="'PRANCO151radio-' + index" v-model="item.Value">
                              <label :for="'PRANCO151radio-' + index"></label>
                            </span>
                            <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                          </div>
                          <div v-if="MASTERDATA['PRANCO151'].Items[2].Value && index === 2">
                            <div class="ml-10">
                              <template v-for="(item, index) in MASTERDATA['PRANCO164'].Items">
                                <div :key="index">
                                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                                    <div class="flex-box flex-center">
                                      <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO164radio-' + index" v-model="item.Value">
                                        <label :for="'PRANCO164radio-' + index"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                    </div>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="col-md-4">
                    <template v-for="(item, index) in MASTERDATA['PRANCO151'].Items">
                      <div :key="index">
                        <div :key="index" v-if="item.DataType === 'Checkbox' && index > 4 && index <= 8">
                          <div class="flex-box flex-center">
                            <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                            <span class="v-checkbox" v-else>
                              <input type="checkbox" :id="'PRANCO151radio-' + index" v-model="item.Value">
                              <label :for="'PRANCO151radio-' + index"></label>
                            </span>
                            <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                          </div>
                          <div v-if="MASTERDATA['PRANCO151'].Items[5].Value && index === 5">
                            <MDRadio v-model="MASTERDATA['PRANCO167']"/>
                          </div>
                          <div v-if="MASTERDATA['PRANCO151'].Items[7].Value && index === 7" class="ml-10">
                            <template v-for="(item, index) in MASTERDATA['PRANCO170'].Items">
                              <div :key="index" v-if="item.DataType === 'Checkbox'">
                                <div class="flex-box flex-center">
                                  <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                                  <span class="v-checkbox" v-else>
                                    <input type="checkbox" :id="'PRANCO170radio-' + index" v-model="item.Value">
                                    <label :for="'PRANCO170radio-' + index"></label>
                                  </span>
                                  <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                </div>
                              </div>
                            </template>                            <MDRadio v-model="MASTERDATA['PRANCO170']"/>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="col-md-4">
                    <template v-for="(item, index) in MASTERDATA['PRANCO151'].Items">
                      <div :key="index">
                        <div :key="index" v-if="item.DataType === 'Checkbox' && index > 8">
                          <div class="flex-box flex-center">
                            <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                            <span class="v-checkbox" v-else>
                              <input type="checkbox" :id="'PRANCO151radio-' + index" v-model="item.Value">
                              <label :for="'PRANCO151radio-' + index"></label>
                            </span>
                            <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                          </div>
                          <div v-if="MASTERDATA['PRANCO151'].Items[11].Value && index === 11">
                            <textarea-autosize v-if="MASTERDATA['PRANCO149']" rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRANCO149'].Items[0].Value"/>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FloatBlock v-if="!ViewOnly && !IsLocked" :openBack="true" @handleBack="handleBack">
            <template slot='buttons'>
              <div class="col-md-2 col-sm-2">
                <div class="form-group1">
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group1">
                  <!-- <button class="btn btn-info pull-right" type="button" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button> -->
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
                <div class="form-group1">
                  <button v-if="!isReadOnly" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                </div>
              </div>
            </template>
          </FloatBlock>
        </template>
      </div>
      <div v-else style="padding: 20px;">
        <div class="text-center">
          <div v-if="!ViewOnly">
            <p>{{__t('Chưa có Phiếu khám gây mê')}}</p>
            <button v-if="!IsLocked" class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
    <p>A03_034_200520_VE</p>
  </div>
</template>
<script>
import PreAnesthesiaConsultation from '@/services/PreAnesthesiaConsultation'
import MedicalRecord from '@/services/IPD/MedicalRecord'
import SyncPrincipalTest from '@/components/SyncPrincipalTest.vue'
import MixinForm from '@/mixins/form.js'
import MixinMasterData from '@/mixins/masterdata.js'
import UsersSelect2 from '@/components/UsersSelect2.vue'
import VDatePicker from '@/components/VDateTimePicker.vue'
import VSelect from '@/components/VSelect.vue'
import _ from 'lodash'
export default {
  name: 'PreAnesthesiaConsultation',
  mixins: [MixinForm, MixinMasterData],
  components: {
    SyncPrincipalTest,
    UsersSelect2,
    VDatePicker,
    VSelect
  },
  props: {
    ViewOnly: {
      type: Boolean,
      default: false
    },
    VisitId: {
      type: String,
      default: ''
    },
    VisitType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      mallampatiOption: [
        {
          value: '0',
          label: '0'
        },
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        }
      ],
      mouthOpenOption: [
        {
          value: '0',
          label: '0'
        },
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        }
      ],
      asaOption: [
        {
          value: '0',
          label: '0'
        },
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        },
        {
          value: '6',
          label: '6'
        }
      ],
      goldManOption: [
        {
          value: 'I',
          label: 'I'
        },
        {
          value: 'II',
          label: 'II'
        },
        {
          value: 'III',
          label: 'III'
        },
        {
          value: 'IV',
          label: 'IV'
        },
        {
          value: 'V',
          label: 'V'
        },
        {
          value: '__VI',
          label: '__VI'
        }
      ],
      DataSubmit: {},
      patientInfo: null,
      loaded: false,
      SyncPastMedicalHistory: null,
      SyncHistoryOfAllergies: null,
      InitialAssessment: null,
      IsLocked: false
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'A03_034_200520_VE'}, async () => {
      await this.getInfo()
      // await this.SyncVisitHistory()
      this.getData()
    })
  },
  computed: {
    isReadOnly () {
      return false
    },
    typeForm () {
      return this.MedicalRecordFormCode
    },
    setBMI () {
      let weight = this.InitialAssessment.ActualWeigh ? parseFloat(this.InitialAssessment.ActualWeigh) : 0
      let height = this.InitialAssessment.Height ? parseFloat(this.InitialAssessment.Height) / 100 : 0
      return (weight / (height * height)).toFixed(2)
    }
  },
  methods: {
    getData () {
      new PreAnesthesiaConsultation({}, this._VisitType).find('A03_034_200520_VE' + '/' + this._VisitId).then(response => {
        this.DataSubmit = response
        this.IsLocked = response.IsLocked
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
        // if (this.MASTERDATA['PRANCO1'] && !this.MASTERDATA['PRANCO1'].Items[0].Value) {
        //   this.MASTERDATA['PRANCO1'].Items[0].Value = this.$store.state.
        // }
        this.loaded = true
      }).catch(e => {
        this.loaded = true
        // this.IsLocked = response.IsLocked
        // this.back()
      })
    },
    getInfo () {
      this.patientInfo = this.$store.state.account.CurrentPatientObj
      new PreAnesthesiaConsultation({}, this._VisitType).find('Info' + '/' + 'A03_034_200520_VE' + '/' + this._VisitId).then(response => {
        this.SyncHistoryOfAllergies = response.HistoryOfAllergies
        this.InitialAssessment = response.VitalSigns
        // this.InitialAssessment = { ActualWeigh: 75, Height: 167, SpO2: 100, BP: 10, Pulse: 89, RR: null }
      }).catch(e => {
        // this.back()
      })
    },
    create () {
      new PreAnesthesiaConsultation({}, this._VisitType).update('Create' + '/' + 'A03_034_200520_VE' + '/' + this._VisitId).then(response => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    submit () {
      this.validateForm()
      this.DataSubmit.Datas = []
      this.mapData2MDData()
      new PreAnesthesiaConsultation({}, this._VisitType).update('Update' + '/' + 'A03_034_200520_VE' + '/' + this._VisitId, this.DataSubmit).then(response => {
        this.toastedSuccess()
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    SyncVisitHistory () {
      new MedicalRecord().update('/Part2/SyncVisitHistory/' + this.typeForm, {Id: this._VisitId}).then(response => {
        this.SyncHistoryOfPresentIllness = response.HistoryOfPresentIllness
        this.SyncPastMedicalHistory = response.PastMedicalHistory
        this.SyncFamilyMedicalHistory = response.FamilyMedicalHistory
      })
    },
    handleCopyInitialAssessment () {
      if (this.MASTERDATA['PRANCO13'].Items[1] && !this.MASTERDATA['PRANCO13'].Items[1].Value) {
        if (this.InitialAssessment.ActualWeigh !== null) {
          this.MASTERDATA['PRANCO13'].Items[1].Value = this.InitialAssessment.ActualWeigh
        }
      }
      if (this.MASTERDATA['PRANCO13'].Items[2] && !this.MASTERDATA['PRANCO13'].Items[2].Value) {
        if (this.InitialAssessment.Height !== null) {
          this.MASTERDATA['PRANCO13'].Items[2].Value = this.InitialAssessment.Height
        }
      }
      if (this.MASTERDATA['PRANCO13'].Items[3] && !this.MASTERDATA['PRANCO13'].Items[3].Value) {
        if (this.setBMI !== null) {
          this.MASTERDATA['PRANCO13'].Items[3].Value = this.setBMI
        }
      }
      if (this.MASTERDATA['PRANCO13'].Items[4] && !this.MASTERDATA['PRANCO13'].Items[4].Value) {
        if (this.InitialAssessment.SpO2 !== null) {
          this.MASTERDATA['PRANCO13'].Items[4].Value = this.InitialAssessment.SpO2
        }
      }
      if (this.MASTERDATA['PRANCO13'].Items[5] && !this.MASTERDATA['PRANCO13'].Items[5].Value) {
        if (this.InitialAssessment.BP !== null) {
          this.MASTERDATA['PRANCO13'].Items[5].Value = this.InitialAssessment.BP
        }
      }
      if (this.MASTERDATA['PRANCO13'].Items[6] && !this.MASTERDATA['PRANCO13'].Items[6].Value) {
        if (this.InitialAssessment.Pulse !== null) {
          this.MASTERDATA['PRANCO13'].Items[6].Value = this.InitialAssessment.Pulse
        }
      }
    },
    copyToForm (value) {
      let str = `Tên xét nghiệm: ${value.TestName}. Kết quả: ${value.Result}${value.Unit || ''}. Thời gian: ${value.UpdateTime}`
      if (this.MASTERDATA['PRANCO78'].Items[3].Value && this.MASTERDATA['PRANCO78'].Items[3].Value.includes(str)) {
        return 0
      } else {
        var old = this.MASTERDATA['PRANCO78'].Items[3].Value ? (this.trim_(this.MASTERDATA['PRANCO78'].Items[3].Value) + '\n') : ''
        this.MASTERDATA['PRANCO78'].Items[3].Value = this.trim_(old + (str), ', ')
      }
    },
    copyToMDWithCode (mdCode, str) {
      str = this.trim_(str)
      if (this.MASTERDATA[mdCode].Items[0].Value && this.MASTERDATA[mdCode].Items[0].Value.includes(str)) {
      } else {
        var old = this.MASTERDATA[mdCode].Items[0].Value ? (this.trim_(this.MASTERDATA[mdCode].Items[0].Value) + '\n') : ''
        this.MASTERDATA[mdCode].Items[0].Value = this.trim_(old + (str), ', ')
        this.toastedInfo('Đã copy')
      }
    },
    validateForm () {
      let errors = []
      // so luong dich vao
      if ((this.MASTERDATA['PRANCO57'].Items[1].Value && this.MASTERDATA['PRANCO57'].Items[2].Value === '') || (this.MASTERDATA['PRANCO57'].Items[1].Value && this.MASTERDATA['PRANCO57'].Items[2].Value === null)) {
        errors.push(this.MASTERDATA['PRANCO57'].Items[1])
      }
      if ((this.MASTERDATA['PRANCO57'].Items[3].Value && this.MASTERDATA['PRANCO57'].Items[4].Value === '') || (this.MASTERDATA['PRANCO57'].Items[3].Value && this.MASTERDATA['PRANCO57'].Items[4].Value === null)) {
        errors.push(this.MASTERDATA['PRANCO57'].Items[3])
      }
      if (errors.length) {
        console.log('errors: ', errors)
        this.handlerResponse({Error: errors})
      }
    },
    handleBack () {
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới phiếu khám gây mê'),
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
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.text-normal {
  font-style: normal;
}
>>>.v-checkbox input[type=checkbox] + label {
  margin-left: 0;
  padding-left: 0;
}
</style>