<template>
  <div>
    <div v-if="loaded">
      <div v-if="DataSubmit.IsConsultation === false">
      <!-- <div v-if="nullContent === false"> -->
      <div class="box box-table">
          <div class="box-body" style="padding-right: 21px;">
            <!-- Block 1 -->
            <div id="Block1_PreAnesthesiaConsultation">
              <div class="row">
                <div class="col-md-2" style="width: 18.666667% !important;" v-if="MASTERDATA['PRANCO1']">
                  <label>{{__label(MASTERDATA["PRANCO1"])}}:</label>
                  <VDateTimePicker :class="{'form-control': isReadOnly, 'no-margin': isReadOnly}" :readonly="isReadOnly" v-model="DataSubmit.ExaminationTime" :format="vDateTimeFormat"/>
                </div>
                <div class="col-md-3" style="width:20% !important">
                  <label>{{__label(MASTERDATA["PRANCO8"])}}:</label>
                  <VDatePickerV2 :class="{'form-control': isReadOnly, 'no-margin': isReadOnly}" :readonly="isReadOnly" v-model="MASTERDATA['PRANCO8'].Items[0].Value" :hideTooltip="true" :format="'DD/MM/YYYY'" :minDate="timeMin"/>
                </div>
                <div class="col-md-3" style="width:22% !important">
                  <label>{{__label(MASTERDATA["PRANCO10"])}}:</label>
                  <VMaskedDateInput :readonly="isReadOnly" v-if="MASTERDATA['PRANCO10']" class="w160" v-model="MASTERDATA['PRANCO10'].Items[0].Value"/>
                </div>
                <div class="col-md-4" style="width: 39.333333% !important;">
                  <label>{{__label(MASTERDATA["PRANCO13"])}}:</label>
                  <UserAdV3 :single="true" v-if="MASTERDATA['PRANCO13'].Items[0] && !viewOnly" :readonly="isReadOnly" v-model="MASTERDATA['PRANCO13'].Items[0].Value" ref="userAd" :placeholder="__t('Phẫu thuật viên chính')"></UserAdV3>
                  <span v-else-if="viewOnly">{{MASTERDATA['PRANCO13'].Items[0].Value}}</span>
                  <!-- <UserAdV4 v-if="MASTERDATA['PRANCO13'].Items[0]" :readonly="isReadOnly" v-model="MASTERDATA['PRANCO13'].Items[0].Value" ref="userAd" :placeholder="__t('Phẫu thuật viên chính')"></UserAdV4> -->
                </div>
              </div>
              <!-- ICD10 -->
              <div class="row" style="margin-top: 10px;">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{ __t(__label(MASTERDATA["PRANCO3"])) }}:</label>
                    <icd10 class="mrb10" :mdCode="'PRANCO4'" :readonly="isReadOnly" @icdChange="icdChange" v-model="MASTERDATA['PRANCO3'].Items[0].Value" />
                  </div>
                </div>
              </div>
              <!-- Fill Value ICD10 -->
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <textarea-autosize
                      class="form-control"
                      rows="3"
                      v-model="MASTERDATA['PRANCO3'].Items[1].Value"
                      :placeholder="(__t('Nhập'))"
                      :readonly="isReadOnly"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA["PRANCO6"])}}:</label>
                    <div
                    >
                      <textarea-autosize
                        class="form-control"
                        rows="3"
                        v-model="MASTERDATA['PRANCO6'].Items[0].Value"
                        :placeholder="(__t('Nhập'))"
                        :readonly="isReadOnly"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- I. Đánh giá ban đầu -->
          <div id="Block2_PreAnesthesiaConsultation">
            <div class="tbl-title">I. {{__label(MASTERDATA["PRANCO15"])}}</div>
            <div>
              <div class="box-body">
                <div class="row" v-if="MASTERDATA['PRANCO16']">
                  <div class="col-md-2 col-25">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA["PRANCO17"])}}<i class="unit-label"> ({{__t(MASTERDATA["PRANCO17"].Items[0].Note)}})</i></label>
                      <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.Pulse || 'N/A'}}</div>
                    </div>
                  </div>
                  <div class="col-md-2 col-25">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA["PRANCO19"])}}<i class="unit-label"> ({{__t(MASTERDATA["PRANCO19"].Items[0].Note)}})</i></label>
                      <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.T || 'N/A'}}</div>
                    </div>
                  </div>
                  <div class="col-md-2 col-25">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA["PRANCO23"])}}<i class="unit-label"> ({{__t(MASTERDATA["PRANCO23"].Items[0].Note)}})</i></label>
                      <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.BP || 'N/A'}}</div>
                    </div>
                  </div>
                  <div class="col-md-2 col-25">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA["PRANCO25"])}}<i class="unit-label"> ({{__t(MASTERDATA["PRANCO25"].Items[0].Note)}})</i></label>
                      <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.SpO2 || 'N/A'}}</div>
                    </div>
                  </div>
                  <div class="col-md-2 col-25">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA["PRANCO27"])}}<i class="unit-label"> ({{__t(MASTERDATA["PRANCO27"].Items[0].Note)}})</i></label>
                      <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.RR || 'N/A'}}</div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-2 col-25">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA["PRANCO21"])}}<i class="unit-label"> ({{__t(MASTERDATA["PRANCO21"].Items[0].Note)}})</i></label>
                      <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.Height || 'N/A'}}</div>
                    </div>
                  </div>
                  <div class="col-md-2 col-25">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA["PRANCO33"])}}<i class="unit-label"> ({{__t(MASTERDATA["PRANCO33"].Items[0].Note)}})</i></label>
                      <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.Weight || 'N/A'}}</div>
                    </div>
                  </div>
                  <div class="col-md-2 col-25">
                    <div class="form-group">
                      <label>BMI</label>
                      <input class="form-control" readonly :value="bmiCalculation">
                    </div>
                  </div>
                  <div v-if="CurrentPatientObj.Gender === 0" class="col-md-4 col-25">
                    <div class="form-group">
                      <label class="no-wrap">{{__label(MASTERDATA["PRANCO31"])}}<i class="unit-label"> ({{__t(MASTERDATA["PRANCO31"].Items[0].Note)}})</i></label>
                      <div>
                        <b
                          v-if="(InitialAssessment.IsApplicationCNTMT === 'False' && InitialAssessment.IsNoApplicationCNTMT === 'False') ||
                          (!InitialAssessment.IsApplicationCNTMT && !InitialAssessment.IsNoApplicationCNTMT)"
                          class="el-radio-view disable m-0"
                        >
                          N/A
                        </b>
                        <b v-else-if="InitialAssessment.IsNoApplicationCNTMT === 'True'" class="el-radio-view disable m-0">{{__t('Không áp dụng')}}</b>
                        <div v-else-if="InitialAssessment.IsApplicationCNTMT === 'True'" class="d-flex flex-center">
                          <b class="el-radio-view m-0">{{__t('Có áp dụng')}}</b>
                          <div class="fake-input disable m-5">{{InitialAssessment.PrePregnancyWeight || 'N/A' }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row highlighted-">
                  <div class="col-md-12">
                    <div class="form-group">
                      <div class="v-row">
                        <div class="group-radio cp-block">
                          <b style="padding: 7px 10px 0 0" class="no-wrap">{{__t('Thông tin tiền sử dị ứng điều dưỡng đã khai khác')}}</b>
                          <div
                            v-if="InitialAssessment.HistoryOfAllergiesDGBD && InitialAssessment.HistoryOfAllergiesDGBD.Allergy"
                            class="fake-input disable m-0" style="width: 100%; white-space: normal"
                          >
                            {{InitialAssessment.HistoryOfAllergiesDGBD.KindOfAllergy ? getTypeAllergy(InitialAssessment.HistoryOfAllergiesDGBD.KindOfAllergy) : ''}}
                            {{InitialAssessment.HistoryOfAllergiesDGBD.Allergy ? InitialAssessment.HistoryOfAllergiesDGBD.Allergy : ''}}
                          </div>
                          <div v-else class="fake-input disable m-5" style="width: 100%">N/A</div>
                          <button v-if="!isReadOnly && (InitialAssessment.HistoryOfAllergiesDGBD  && InitialAssessment.HistoryOfAllergiesDGBD.Allergy)" @click="getAllergieStatus" class="btn btn-xs v-white-btn">Copy</button>
                        </div>
                      </div>
                      <!-- Tiền sử dị ứng -->
                      <label class="color-red"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> {{__t('Tiền sử dị ứng')}} <i class="unit-label"></i></label>
                      <div class="row" v-if="MASTERDATA['PRANCO35']">
                        <div class="col-md-12">
                          <div class="d-flex">
                            <!-- <MDRadio
                              v-if="MASTERDATA['PRANCO35']"
                              :readonly="isReadOnly"
                              v-model="MASTERDATA['PRANCO35']"
                            /> -->
                            <MDRadio
                              v-if="!isReadOnly"
                              v-model="MASTERDATA['PRANCO35']"
                            />
                            <MDRadio
                              v-else
                              v-model="MASTERDATA['PRANCO35']"
                              style="pointer-events: none;"
                            />
                            <div v-if="MASTERDATA['PRANCO35'].Items[0].Value" class="d-flex" style="width: 100%;">
                              <allergies-select v-if="MASTERDATA['PRANCO41']" :key="reset" style="transform: translateY(3px); z-index: 11" v-model="MASTERDATA['PRANCO41'].Items[3].Value" :readonly="isReadOnly" :multi="true" :items="JSON.parse(MASTERDATA['PRANCO41'].Items[3].Data)"/>
                              <textarea-autosize class="form-control" style="transform: translateY(4px)" v-model="MASTERDATA['PRANCO383'].Items[0].Value" :readonly="isReadOnly" :placeholder="'Nhập'" rows="1"/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Thông tin khai thác dị ứng -->
                      <div>
                        <label v-if="SyncHistoryOfAllergies">{{SyncHistoryOfAllergies.length ? 'Thông tin khai thác dị ứng' : ''}}</label>
                        <vue-scrolling-table v-if="SyncHistoryOfAllergies && SyncHistoryOfAllergies.length">
                          <template slot="tbl">
                            <table class="table table-bordered table-bordered-x">
                              <thead>
                                <tr>
                                  <th width="1">{{__t('Ngày khám')}}</th>
                                  <th width="1">{{__t('Bác sĩ khám')}}</th>
                                  <th width="1">{{__t('Khoa Phòng')}}</th>
                                  <th>{{__t('Tiền sử dị ứng')}}</th>
                                  <th width="1" v-if="!isReadOnly">
                                    <p class="m-0" style="visibility: hidden;">{{__t('Copy')}}</p>
                                  </th>
                                </tr>
                              </thead>
                              <tbody v-if="MASTERDATA['PRANCO35']">
                                <tr :data="SyncHistoryOfAllergies" :key="index" v-for="(item, index) in SyncHistoryOfAllergies">
                                  <td class="no-wrap">{{item.ExaminationTime}}</td>
                                  <td class="no-wrap"><AdInfo :ad="item.Username"/></td>
                                  <td class="no-wrap">{{__label(item)}}</td>
                                  <td><p v-if="item.HistoryOfAllergies">{{item.HistoryOfAllergies}}</p></td>
                                  <td v-if="!isReadOnly" class="text-center vertical-align-middle">
                                    <button @click="copyToMDWithCode('PRANCO383', item.HistoryOfAllergies)" class="btn btn-xs v-white-btn">Copy</button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </template>
                        </vue-scrolling-table>
                      </div>
                      <!-- Phản ứng dị ứng -->
                      <div>
                        <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA["PRANCO54"])}}:</label>
                        <div class="buttonChoose1" style="display: flex">
                          <template v-for="(item, index) in MASTERDATA['PRANCO54'].Items"  style="display: flex;">
                            <div v-if="index >= 0" :key="index">
                              <div :key="index" v-if="item.DataType === 'Checkbox'">
                                <div class="flex-box flex-center" style="margin-right: 7px;">
                                  <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                                  <span class="v-checkbox" v-else>
                                    <input type="checkbox" :id="'PRANCO54radio-' + index" v-model="item.Value">
                                    <label :for="'PRANCO54radio-' + index"></label>
                                  </span>
                                  <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                </div>
                              </div>
                            </div>
                          </template>
                          <textarea-autosize :readonly="isReadOnly" v-if="MASTERDATA['PRANCO54'].Items[3].Value === true" v-model="MASTERDATA['PRANCO54'].Items[5].Value" :code="MASTERDATA['PRANCO54'].Items[5].Code" class="form-control" rows="1" :placeholder="__t('Ghi cụ thể')"/>
                        </div>
                      </div>
                      <!-- Sở thích, thói quen -->
                      <div>
                        <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA["PRANCO60"])}}:</label>
                        <div class="buttonChoose2" style="display: flex">
                          <template v-for="(item, index) in MASTERDATA['PRANCO60'].Items"  style="display: flex;">
                            <div v-if="index >= 0" :key="index">
                              <div :key="index" v-if="item.DataType === 'Checkbox'">
                                <div class="flex-box flex-center" style="margin-right: 7px;">
                                  <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                                  <span class="v-checkbox" v-else>
                                    <input type="checkbox" :id="'PRANCO60radio-' + index" v-model="item.Value">
                                    <label :for="'PRANCO60radio-' + index"></label>
                                  </span>
                                  <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                </div>
                              </div>
                            </div>
                          </template>
                          <textarea-autosize :readonly="isReadOnly" v-if="MASTERDATA['PRANCO60'].Items[3].Value === true" :code="MASTERDATA['PRANCO60'].Items[4].Code" v-model="MASTERDATA['PRANCO60'].Items[4].Value" class="form-control" rows="1" :placeholder="__t('Ghi cụ thể')"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Fakeinput -->
          </div>
          <!-- II. Tiền sử -->
          <div id="Block3_PreAnesthesiaConsultation">
            <div class="tbl-title">II. {{ __t("Tiền sử")}}</div>
            <div>
              <div class="box-body">
                <!-- Tiền sử nội khoa -->
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <div class="flex-box flex-center">
                        <label class="display-inline no-wrap mt-10" style="font-weight: bold; padding-right: 15px;">{{__label(MASTERDATA["PRANCO67"])}}:</label>
                        <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['PRANCO67'].Items">
                          <div class="btn-action radio-left">
                            <MDRadio
                              v-if="!isReadOnly"
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO67']"
                            />
                            <MDRadio
                              v-else
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO67']"
                              style="pointer-events: none;"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- If choose Yes -->
                <div>
                  <div class="col-md-3">
                    <div v-if="MASTERDATA['PRANCO67'].Items[1].Value === true">
                      <div class="buttonChoose3">
                        <template v-for="(item, index) in MASTERDATA['PRANCO70'].Items">
                          <div v-if="index >= 0 && index <= 3" :key="index">
                            <div :key="index" v-if="item.DataType === 'Checkbox'">
                              <div class="flex-box flex-center">
                                <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                <span class="v-checkbox" v-else>
                                  <input type="checkbox" :id="'PRANCO70radio-' + index" v-model="item.Value">
                                  <label :for="'PRANCO70radio-' + index"></label>
                                </span>
                                <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                      <!-- <textarea-autosize v-if="MASTERDATA['PRANCO70'].Items[14].Value === true" v-model="MASTERDATA['PRANCO70'].Items[15].Value" class="form-control" rows="1" :placeholder="__t('Ghi cụ thể')"/> -->
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div v-if="MASTERDATA['PRANCO67'].Items[1].Value === true">
                      <div class="buttonChoose3">
                        <template v-for="(item, index) in MASTERDATA['PRANCO70'].Items">
                          <div v-if="index >= 4 && index <= 7" :key="index">
                            <div :key="index" v-if="item.DataType === 'Checkbox'">
                              <div class="flex-box flex-center">
                                <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                <span class="v-checkbox" v-else>
                                  <input type="checkbox" :id="'PRANCO70radio-' + index" v-model="item.Value">
                                  <label :for="'PRANCO70radio-' + index"></label>
                                </span>
                                <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div v-if="MASTERDATA['PRANCO67'].Items[1].Value === true">
                      <div class="buttonChoose3">
                        <template v-for="(item, index) in MASTERDATA['PRANCO70'].Items">
                          <div v-if="index >= 8 && index <= 11" :key="index">
                            <div :key="index" v-if="item.DataType === 'Checkbox'">
                              <div class="flex-box flex-center">
                                <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                <span class="v-checkbox" v-else>
                                  <input type="checkbox" :id="'PRANCO70radio-' + index" v-model="item.Value">
                                  <label :for="'PRANCO70radio-' + index"></label>
                                </span>
                                <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div v-if="MASTERDATA['PRANCO67'].Items[1].Value === true">
                      <div class="buttonChoose3">
                        <template v-for="(item, index) in MASTERDATA['PRANCO70'].Items">
                          <div v-if="index >= 12 && index <= 13" :key="index">
                            <div :key="index" v-if="item.DataType === 'Checkbox'">
                              <div class="flex-box flex-center">
                                <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                <span class="v-checkbox" v-else>
                                  <input type="checkbox" :id="'PRANCO70radio-' + index" v-model="item.Value">
                                  <label :for="'PRANCO70radio-' + index"></label>
                                </span>
                                <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                      <!-- <textarea-autosize :readonly="isReadOnly" style="margin-left: 0.4em; width:98%; margin-top:2px;" v-if="MASTERDATA['PRANCO70'].Items[14].Value === true" v-model="MASTERDATA['PRANCO70'].Items[15].Value" :code="MASTERDATA['PRANCO70'].Items[15].Code" class="form-control" rows="1" :placeholder="__t('Nhập')"/> -->
                    </div>
                  </div>
                </div>
                <!-- buttom thêm tiền sử nội khoa -->
                <div v-if="MASTERDATA['PRANCO67'].Items[1].Value === true" class="col-md-12">
                  <div class="row" v-if="tableTSNK && tableTSNK.length > 0">
                    <div class="col-md-3 mt-10" :key="index" v-for="(item, index) in tableTSNK">
                      <div class="flex-box flex-center" :style="isReadOnly ? 'cursor-pointer: none' : ''">
                        <div>
                          <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                          <span v-else class="v-checkbox">
                            <input type="checkbox" :id="'PRANCO701Cradio-' + index" v-model="item.checkValue">
                            <label :for="'PRANCO701Cradio-' + index"></label>
                          </span>
                        </div>
                        <div>
                          <textarea-autosize :readonly="isReadOnly" style="margin-left: 0.4em; width:98%; margin-top:2px;" v-model="item.textValue" class="form-control" rows="1" :placeholder="__t('Nhập')"/>
                        </div>
                        <div class="ml-5" v-if="!isReadOnly">
                          <button style="background-color: #f39c12;" class="btn" @click="removeItem(item, index);">
                          <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="MASTERDATA['PRANCO67'].Items[1].Value === true" class="text-center mt-10 col-md-12">
                  <button @click="handleAddtableTSNK" v-if="!isReadOnly && MASTERDATA['PRANCO67'].Items[1].Value" :readonly="isReadOnly" class="btn v-green-btn v-bottom-btn mrt10" style="margin: auto !important;">
                   <i aria-hidden="true" class="fa fa-plus"></i> {{ __t('Thêm') }}
                  </button>
                </div>
                <!-- Tiền sử ngoại khoa -->
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <div class="flex-box flex-center" style="margin-top: 5px; margin-bottom: 10px;">
                        <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA["PRANCO87"])}}:</label>
                        <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['PRANCO87'].Items">
                          <div class="btn-action radio-left">
                            <MDRadio
                              v-if="!isReadOnly"
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO87']"
                            />
                            <MDRadio
                              v-else
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO87']"
                              style="pointer-events: none;"
                            />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA['PRANCO87'].Items[1].Value === true">
                        <!-- <vue-scrolling-table>
                          <template slot="tbl"> -->
                        <table class="table table-bordered table-bordered-x">
                          <thead>
                            <tr>
                              <th width="5%" class="no-wrap">{{__t('STT')}}</th>
                              <th width="25%" class="no-wrap">{{__label(MASTERDATA["PRANCO90"])}}</th>
                              <th width="10%" class="no-wrap">{{__label(MASTERDATA["PRANCO92"])}}</th>
                              <th width="30%" class="no-wrap">{{__label(MASTERDATA["PRANCO94"])}}</th>
                              <th width="30%" class="no-wrap">{{__label(MASTERDATA["PRANCO103"])}}</th>
                              <!-- <th></th> -->
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-if="TableSurgical.length === 0">
                              <td colspan="5" class="text-center hide-counter">{{__t('Chưa có thông tin')}}</td>
                            </tr>
                            <tr v-else :data="item" :key="item.ahihi" v-for="(item, index) in TableSurgical">
                              <td style="position: relative;">
                                <button v-if="!isReadOnly" class="btn-pos-left" @click="handleDeleteTableSurgical(index)">
                                  <i aria-hidden="true" class="fa fa-trash"></i>
                                </button>
                                {{index + 1}}
                              </td>
                              <!-- <td class="no-wrap"></td> -->
                              <!-- <td class="no-wrap"><ad-Info :ad="HistoryOfAllergie.Username" :type="HistoryOfAllergie.Type"/></td> -->
                              <td class="no-wrap">
                                <textarea-autosize :readonly="isReadOnly" class="form-control" :placeholder="__t('Nhập')" v-model="item.surgicalHistory" required/>
                              </td>
                              <td>
                                <MDNumberInput :readonly="isReadOnly" class="form-control" v-model="item.year" :placeholder="__t('Nhập')" required/>
                                <!-- <textarea-autosize :readonly="isReadOnly" class="form-control" :placeholder="__t('Nhập')" v-model="item.year" required/> -->
                              </td>
                              <td>
                                <template v-for="(item1, i1) in item.tableCheckbox1"  style="display: flex;">
                                  <!-- Gây tê tại chỗ -->
                                  <div :key="i1">
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item1.Gaytetaicho" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO001radio-' + index + 1" v-model="item1.Gaytetaicho">
                                        <label :for="'PRANCO001radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Gây tê tại chỗ')}}</span></span>
                                    </div>
                                    <!-- An thần -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item1.Anthan" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO002radio-' + index + 1" v-model="item1.Anthan">
                                        <label :for="'PRANCO002radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('An thần')}}</span></span>
                                    </div>
                                    <!-- Gây mê toàn thân -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item1.Gaymetoanthan" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO003radio-' + index + 1" v-model="item1.Gaymetoanthan">
                                        <label :for="'PRANCO003radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Gây mê toàn thân')}}</span></span>
                                    </div>
                                    <!-- Gây tê tủy sống -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item1.Gaytetuysong" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO004radio-' + index + 1" v-model="item1.Gaytetuysong">
                                        <label :for="'PRANCO004radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Gây tê tủy sống')}}</span></span>
                                    </div>
                                    <!-- Gây tê ngoài màng cứng -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item1.Gaytengoaimangcung" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO005radio-' + index + 1" v-model="item1.Gaytengoaimangcung">
                                        <label :for="'PRANCO005radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Gây tê ngoài màng cứng')}}</span></span>
                                    </div>
                                    <!-- Gây tê vùng -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item1.Gaytevung" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO006radio-' + index + 1" v-model="item1.Gaytevung">
                                        <label :for="'PRANCO006radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Gây tê vùng')}}</span></span>
                                    </div>
                                    <!-- Khác -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item1.Khac" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO007radio-' + index + 1" v-model="item1.Khac">
                                        <label :for="'PRANCO007radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Khác')}}</span></span>
                                    </div>
                                    <div>
                                      <textarea-autosize :placeholder="__t('Nhập')" :readonly="isReadOnly" class="form-control" v-if="item1.Khac === true" v-model="item.khac"/>
                                    </div>
                                  </div>
                                </template>
                              </td>
                              <td>
                                <template v-for="(item2, i2) in item.tableCheckbox2"  style="display: flex;">
                                  <!-- Nhiễm trùng -->
                                  <div :key="i2 + 'B1'">
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item2.Nhiemtrung" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO101radio-' + index + 1" v-model="item2.Nhiemtrung">
                                        <label :for="'PRANCO101radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Nhiễm trùng')}}</span></span>
                                    </div>
                                    <!-- Chảy máu -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item2.Chaymau" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO102radio-' + index + 1" v-model="item2.Chaymau">
                                        <label :for="'PRANCO102radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Chảy máu')}}</span></span>
                                    </div>
                                    <!-- Sốc -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item2.Soc" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO103radio-' + index + 1" v-model="item2.Soc">
                                        <label :for="'PRANCO103radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Sốc')}}</span></span>
                                    </div>
                                    <!-- Đau đầu sau gây tê -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item2.Daudausaugayte" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO104radio-' + index + 1" v-model="item2.Daudausaugayte">
                                        <label :for="'PRANCO104radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Đau đầu sau gây tê')}}</span></span>
                                    </div>
                                    <!-- Đau sau mổ -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item2.Dausaumo" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO105radio-' + index + 1" v-model="item2.Dausaumo">
                                        <label :for="'PRANCO105radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Đau sau mổ')}}</span></span>
                                    </div>
                                    <!-- Khác -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item2.Khac" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO107radio-' + index + 1" v-model="item2.Khac">
                                        <label :for="'PRANCO107radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Khác')}}</span></span>
                                    </div>
                                    <div>
                                      <textarea-autosize :placeholder="__t('Nhập')" :readonly="isReadOnly" class="form-control" v-if="item2.Khac === true" v-model="item.khacBienChung"/>
                                    </div>
                                  </div>
                                </template>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                          <!-- </template>
                        </vue-scrolling-table> -->
                        <div style="text-align: center">
                          <button v-if="!isReadOnly" :readonly="isReadOnly" class="btn v-green-btn v-bottom-btn mrt10" style="margin: auto !important;" @click="handleAddTableSurgical">
                            <i aria-hidden="true" class="fa fa-plus"></i> {{ __t('Thêm') }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Tiền sử sản khoa -->
                <div class="row" v-if="DataCustomer === 0">
                  <div class="col-md-12">
                    <div class="form-group">
                      <div class="flex-box flex-center" style="margin-bottom: 10px;">
                        <label class="display-inline no-wrap mt-10" style="font-weight: bold; padding-right: 14px;">{{__label(MASTERDATA["PRANCO111"])}}:</label>
                        <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['PRANCO111'].Items">
                          <div class="btn-action radio-left">
                            <MDRadio
                              v-if="!isReadOnly"
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO111']"
                            />
                            <MDRadio
                              v-else
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO111']"
                              style="pointer-events: none;"
                            />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA['PRANCO111'].Items[1].Value === true">
                        <table class="table table-bordered table-bordered-x">
                          <thead>
                            <tr>
                              <th width="5%" class="no-wrap">{{__t('STT')}}</th>
                              <th width="22%" class="no-wrap">{{__t('Tiền sử sản khoa')}}</th>
                              <th width="13%" class="no-wrap">{{__label(MASTERDATA["PRANCO117"])}}</th>
                              <th width="30%" class="no-wrap">{{__label(MASTERDATA["PRANCO119"])}}</th>
                              <th width="30%" class="no-wrap">{{__label(MASTERDATA["PRANCO124"])}}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-if="TableObstetrical.length === 0">
                              <td colspan="5" class="text-center hide-counter">{{__t('Chưa có thông tin')}}</td>
                            </tr>
                            <tr v-else :data="item" :key="index + 'B2'" v-for="(item, index) in TableObstetrical">
                              <td style="position: relative;">
                                <button v-if="!isReadOnly" class="btn-pos-left" @click="handleDeleteTableObstetrical(index)">
                                  <i aria-hidden="true" class="fa fa-trash"></i>
                                </button>
                                {{index + 1}}
                              </td>
                              <!-- <td class="no-wrap">{{index + 1}}</td> -->
                              <td class="no-wrap">
                                <div class="flex-box flex-center">
                                  <div class="group-radio" :class="{'no-flex': true}" style="margin-right: 10px;">
                                    <template v-for="(itemObstetric, index) in item.obstetricHistory" style="flex-grow: 1">
                                      <span :data="itemObstetric" :key="index + 'D2'" @click="onChange()" style="margin-left: 5px;">
                                        <input :readonly="isReadOnly" type="checkbox" :id="'radio-' + itemObstetric.Code" v-model="itemObstetric.Value">
                                        <label :readonly="isReadOnly" style="width: 48%; margin-left: 3px" :class="{'label-b': highlightCode.includes(itemObstetric.Code)}" :for="'radio-' + itemObstetric.Code" @click="checkbox2Radio(item.obstetricHistory, itemObstetric)">{{__t2(itemObstetric.ViName)}}</label>
                                      </span>
                                    </template>
                                    <slot></slot>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <!-- <textarea-autosize :readonly="isReadOnly" class="form-control" :placeholder="__t('Nhập')" v-model="item.year" required/> -->
                                <MDNumberInput :readonly="isReadOnly" class='select-full-w' v-model="item.year" :placeholder="__t('Nhập')" />
                              </td>
                              <td>
                                <template v-for="(item3, i5) in item.tableCheckbox1"  style="display: flex;">
                                  <!-- Tê tủy sống -->
                                  <div :key="i5 + 'B3'">
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item3.Tetuysong" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO201radio-' + index + 1" v-model="item3.Tetuysong">
                                        <label :for="'PRANCO201radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Tê tủy sống')}}</span></span>
                                    </div>
                                    <!-- Gây tê ngoài màng cứng -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item3.Gaytengoaimangcung" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO202radio-' + index + 1" v-model="item3.Gaytengoaimangcung">
                                        <label :for="'PRANCO202radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Gây tê ngoài màng cứng')}}</span></span>
                                    </div>
                                    <!-- Khác -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item3.Khac" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO207radio-' + index + 1" v-model="item3.Khac">
                                        <label :for="'PRANCO207radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Khác')}}</span></span>
                                    </div>
                                    <div>
                                      <textarea-autosize :placeholder="__t('Nhập')" :readonly="isReadOnly" class="form-control" v-if="item3.Khac === true" v-model="item.khac"/>
                                    </div>
                                  </div>
                                </template>
                              </td>
                              <td>
                                <template v-for="(item4, i6) in item.tableCheckbox2"  style="display: flex;">
                                  <!-- Nhiễm trùng -->
                                  <div :key="i6 + 'B4'">
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item4.Nhiemtrung" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO301radio-' + index + 1" v-model="item4.Nhiemtrung">
                                        <label :for="'PRANCO301radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Nhiễm trùng')}}</span></span>
                                    </div>
                                    <!-- Chảy máu -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item4.Chaymau" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO302radio-' + index + 1" v-model="item4.Chaymau">
                                        <label :for="'PRANCO302radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Chảy máu')}}</span></span>
                                    </div>
                                    <!-- Sốc -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item4.Soc" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO303radio-' + index + 1" v-model="item4.Soc">
                                        <label :for="'PRANCO303radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Sốc')}}</span></span>
                                    </div>
                                    <!-- Đau đầu sau gây tê -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item4.Daudausaugayte" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO304radio-' + index + 1" v-model="item4.Daudausaugayte">
                                        <label :for="'PRANCO304radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Đau đầu sau gây tê')}}</span></span>
                                    </div>
                                    <!-- Đau sau mổ -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item4.Dausaumo" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO305radio-' + index + 1" v-model="item4.Dausaumo">
                                        <label :for="'PRANCO305radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Đau sau mổ')}}</span></span>
                                    </div>
                                    <!-- Khác -->
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item4.Khac" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO307radio-' + index + 1" v-model="item4.Khac">
                                        <label :for="'PRANCO307radio-' + index + 1"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__t('Khác')}}</span></span>
                                    </div>
                                    <div>
                                      <textarea-autosize :placeholder="__t('Nhập')" :readonly="isReadOnly" class="form-control" v-if="item4.Khac === true" v-model="item.khacBienChung"/>
                                    </div>
                                  </div>
                                </template>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div style="text-align: center">
                          <button v-if="!isReadOnly" :readonly="isReadOnly" class="btn v-green-btn v-bottom-btn mrt10" style="margin: auto !important;" @click="handleAddTableObstetrical">
                            <i aria-hidden="true" class="fa fa-plus"></i> {{ __t('Thêm') }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- III. Thuốc đang dùng -->
          <div id="Block4_PreAnesthesiaConsultation">
            <div class="tbl-title">III. {{__label(MASTERDATA["PRANCO132"])}}</div>
            <div style="padding: 10px; margin-bottom: -20px;">
              <TblWithMasterData
                :FormCode="'OPDPKGM1'"
                :VisitId="_VisitId"
                :VisitType="'OPD'"
                :FormID="DataSubmit.Id"
                :formatTime="vDateFormat"
                :dontGetDate="true"
                :readonly="isReadOnly"
                ref="TblWithMasterData"/>
            </div>
          </div>
          <!-- IV. Kết quả khám -->
          <div id="Block5_PreAnesthesiaConsultation">
            <div class="tbl-title">IV. {{__label(MASTERDATA["PRANCO146"])}}</div>
            <div>
              <div class="box-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA["PRANCO147"])}}:</label>
                      <table width="100%">
                        <td width="33.33333%">
                          <div class="flex-box flex-center">
                            <div class="buttonChoose2">
                              <div style="display: flex;">
                                <template v-for="(item, index) in MASTERDATA['PRANCO147'].Items">
                                  <div v-if="index === 0" :key="index + 'A1'">
                                    <div :key="index + 'A1'" v-if="item.DataType === 'Checkbox'">
                                      <div class="flex-box flex-center">
                                        <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                        <span class="v-checkbox" v-else>
                                          <input type="checkbox" :id="'PRANCO147radio-' + index" v-model="item.Value">
                                          <label :for="'PRANCO147radio-' + index"></label>
                                        </span>
                                        <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                      </div>
                                    </div>
                                  </div>
                                </template>
                                <textarea-autosize :placeholder="__t('Nhập')" :readonly="isReadOnly" style="margin-left: 7px; line-height: 22px; height:34px;" class="form-control" v-if="MASTERDATA['PRANCO147'].Items[0].Value === true" :code="MASTERDATA['PRANCO147'].Items[1].Code" v-model="MASTERDATA['PRANCO147'].Items[1].Value"/>
                              </div>
                              <template v-for="(item, index) in MASTERDATA['PRANCO147'].Items">
                                <div v-if="index >= 1 && index <= 3" :key="index + 'A2'">
                                  <div :key="index + 'A2'" v-if="item.DataType === 'Checkbox'">
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO147radio-' + index" v-model="item.Value">
                                        <label :for="'PRANCO147radio-' + index"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                    </div>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </div>
                        </td>
                        <td width="33.33333%">
                          <div class="flex-box flex-center">
                            <div class="buttonChoose2">
                              <template v-for="(item, index) in MASTERDATA['PRANCO147'].Items">
                                <div v-if="index >= 4 && index <= 6" :key="index + 'A3'">
                                  <div :key="index + 'A3'" v-if="item.DataType === 'Checkbox'">
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO147radio-' + index" v-model="item.Value">
                                        <label :for="'PRANCO147radio-' + index"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                    </div>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </div>
                        </td>
                        <td width="33.33333%">
                          <div class="flex-box flex-center">
                            <div class="buttonChoose2">
                              <template v-for="(item, index) in MASTERDATA['PRANCO147'].Items">
                                <div v-if="index >= 7" :key="index + 'A3'">
                                  <div :key="index + 'A3'" v-if="item.DataType === 'Checkbox'">
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO147radio-' + index" v-model="item.Value">
                                        <label :for="'PRANCO147radio-' + index"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                    </div>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </div>
                        </td>
                      </table>
                      <div>
                        <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA["PRANCO158"])}}:
                          <button
                            :readonly="isReadOnly"
                            class="btn btn-sync-data"
                            @click="autoLoadPRANCO158(true)"
                          >
                            {{ __t("Lấy kết quả mới nhất") }}
                          </button></label>
                        <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['PRANCO158'].Items">
                          <diorpt :copys="true" :dataJson="item.Value" v-model="item.Value" @copy="handleCopy"/>
                        </div>
                        <p class="note-text text-right">
                            <template v-if="syncOPDOENPT0At"
                              ><label class="label label-warning"
                                ><i
                                  aria-hidden="true"
                                  class="fa fa-check v-green"
                                ></i>
                                {{ __t("Đồng bộ lần cuối lúc") }}:
                                {{
                                  syncOPDOENPT0At
                                    | formatDateTime("HH:mm:ss DD/MM/YYYY")
                                }}</label
                              ></template
                            ><template v-else
                              ><label class="label label-warning"
                                ><i
                                  aria-hidden="true"
                                  class="fa fa-spin fa-loading v-green"
                                ></i
                                >{{ __t("Đang tải...") }}</label
                              ></template
                            >
                          </p>
                        <textarea-autosize :readonly="isReadOnly" v-if="MASTERDATA['PRANCO366']" v-model="MASTERDATA['PRANCO366'].Items[0].Value" class="form-control" rows="3" :placeholder="__t('Nhập')"/>
                      </div>
                      <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA["PRANCO160"])}}:</label>
                      <div class="flex-box flex-center">
                        <div>
                          <div class="buttonChoose3" style="display: flex">
                            <template v-for="(item, index) in MASTERDATA['PRANCO160'].Items">
                              <div v-if="index === 0" :key="index + 'A4'">
                                <div :key="index + 'A4'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO160radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO160radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                            <div v-if="MASTERDATA['PRANCO160'].Items[0].Value === true" :data="item" :key="index + 'A5'" v-for="(item, index) in MASTERDATA['PRANCO162'].Items">
                              <div class="btn-action radio-left">
                                <MDRadio
                                  v-if="!isReadOnly"
                                  :noFlex="true"
                                  :indexs="[index]"
                                  v-model="MASTERDATA['PRANCO162']"
                                />
                                <MDRadio
                                  v-else
                                  :noFlex="true"
                                  :indexs="[index]"
                                  v-model="MASTERDATA['PRANCO162']"
                                  style="pointer-events: none;"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="buttonChoose3" style="display: flex">
                            <template v-for="(item, index) in MASTERDATA['PRANCO160'].Items">
                              <div v-if="index === 1" :key="index + 'A6'">
                                <div :key="index + 'A6'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO160radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO160radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                            <div v-if="MASTERDATA['PRANCO160'].Items[1].Value === true" :data="item" :key="index + 'A7'" v-for="(item, index) in MASTERDATA['PRANCO166'].Items">
                              <div class="btn-action radio-left">
                                <MDRadio
                                  v-if="!isReadOnly"
                                  :noFlex="true"
                                  :indexs="[index]"
                                  v-model="MASTERDATA['PRANCO166']"
                                />
                                <MDRadio
                                  v-else
                                  :noFlex="true"
                                  :indexs="[index]"
                                  v-model="MASTERDATA['PRANCO166']"
                                  style="pointer-events: none;"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="buttonChoose3" style="display: flex">
                            <template v-for="(item, index) in MASTERDATA['PRANCO160'].Items">
                              <div v-if="index === 2" :key="index + 'A8'">
                                <div :key="index + 'A8'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO160radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO160radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                            <div v-if="MASTERDATA['PRANCO160'].Items[2].Value === true" style="margin-left: 10px;">
                              <VSelect :class="{'mb-5': MASTERDATA['PRANCO160'].Items[2].Value && MASTERDATA['PRANCO160'].Items[3].Value}" :unsetWidth="true" :isConfirmedCheck="isReadOnly" class='select-full-w' v-model="MASTERDATA['PRANCO170'].Items[0].Value" :placeholder="__t('Chọn')" :items="mallampatiOption" />
                            </div>
                          </div>
                          <div class="buttonChoose3" style="display: flex">
                            <template v-for="(item, index) in MASTERDATA['PRANCO160'].Items">
                              <div v-if="index === 3" :key="index + 'A9'">
                                <div :key="index + 'A9'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO160radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO160radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                            <div v-if="MASTERDATA['PRANCO160'].Items[3].Value === true" style="margin-left: 10px;">
                              <VSelect :unsetWidth="true" :isConfirmedCheck="isReadOnly" class='select-full-w' v-model="MASTERDATA['PRANCO173'].Items[0].Value" :placeholder="__t('Chọn')" :items="mouthOpenOption" />
                            </div>
                          </div>
                          <div class="buttonChoose3" style="display: flex">
                            <template v-for="(item, index) in MASTERDATA['PRANCO160'].Items">
                              <div v-if="index === 4" :key="index + 'A10'">
                                <div :key="index + 'A10'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO160radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO160radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                            <div v-if="MASTERDATA['PRANCO160'].Items[4].Value === true" style="margin-left: 10px; margin-top: 5px; display:flex;">
                              <MDNumberInput :readonly="isReadOnly" style="width: 66px;" :decimal="true" v-model="MASTERDATA['PRANCO176'].Items[0].Value" :placeholder="__t('Nhập')" />
                              <p style="margin-top: 5px; margin-left: 5px;">cm</p>
                            </div>
                          </div>
                          <div class="buttonChoose3">
                            <template v-for="(item, index) in MASTERDATA['PRANCO160'].Items">
                              <div v-if="index === 5" :key="index + 'A11'">
                                <div :key="index + 'A11'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO160radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO160radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                            <div v-if="MASTERDATA['PRANCO160'].Items[5].Value === true" style="margin-left: 60px; margin-top: 5px; display: inline-block">
                              <table>
                                <tr>
                                  <td style="display: flex">
                                    <span style="padding-top: 5px;" class="displaytbl no-wrap"><span>- {{__label(MASTERDATA['PRANCO179'])}}</span></span>
                                    <div :data="item" :key="index + 'A12'" v-for="(item, index) in MASTERDATA['PRANCO179'].Items">
                                      <div class="btn-action radio-left">
                                        <MDRadio
                                          v-if="!isReadOnly"
                                          :noFlex="true"
                                          :indexs="[index]"
                                          v-model="MASTERDATA['PRANCO179']"
                                        />
                                        <MDRadio
                                          v-else
                                          :noFlex="true"
                                          :indexs="[index]"
                                          v-model="MASTERDATA['PRANCO179']"
                                          style="pointer-events: none;"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="display: flex">
                                    <span class="displaytbl no-wrap"><span>- {{__label(MASTERDATA['PRANCO182'])}}</span></span>
                                    <div :data="item" :key="index + 'A13'" v-for="(item, index) in MASTERDATA['PRANCO182'].Items">
                                      <div class="btn-action radio-left">
                                        <MDRadio
                                          v-if="!isReadOnly"
                                          :noFlex="true"
                                          :indexs="[index]"
                                          v-model="MASTERDATA['PRANCO182']"
                                        />
                                        <MDRadio
                                          v-else
                                          :noFlex="true"
                                          :indexs="[index]"
                                          v-model="MASTERDATA['PRANCO182']"
                                          style="pointer-events: none;"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                          <div class="buttonChoose3" style="display: flex">
                            <template v-for="(item, index) in MASTERDATA['PRANCO160'].Items">
                              <div v-if="index === 6" :key="index + 'A14'">
                                <div :key="index + 'A14'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO160radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO160radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                            <div v-if="MASTERDATA['PRANCO160'].Items[6].Value === true" :data="item" :key="index + 'A15'" v-for="(item, index) in MASTERDATA['PRANCO186'].Items">
                              <div class="btn-action radio-left">
                                <MDRadio
                                  v-if="!isReadOnly"
                                  :noFlex="true"
                                  :indexs="[index]"
                                  v-model="MASTERDATA['PRANCO186']"
                                />
                                <MDRadio
                                  v-else
                                  :noFlex="true"
                                  :indexs="[index]"
                                  v-model="MASTERDATA['PRANCO186']"
                                  style="pointer-events: none;"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="buttonChoose3" style="display: flex">
                            <template v-for="(item, index) in MASTERDATA['PRANCO160'].Items">
                              <div v-if="index === 7" :key="index + 'A16'">
                                <div :key="index + 'A16'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO160radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO160radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                            <div v-if="MASTERDATA['PRANCO160'].Items[7].Value === true" :data="item" :key="index + 'A17'" v-for="(item, index) in MASTERDATA['PRANCO191'].Items">
                              <div class="btn-action radio-left">
                                <MDRadio
                                  v-if="!isReadOnly"
                                  :noFlex="true"
                                  :indexs="[index]"
                                  v-model="MASTERDATA['PRANCO191']"
                                />
                                <MDRadio
                                  v-else
                                  :noFlex="true"
                                  :indexs="[index]"
                                  v-model="MASTERDATA['PRANCO191']"
                                  style="pointer-events: none;"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="buttonChoose3" style="display: flex">
                            <template v-for="(item, index) in MASTERDATA['PRANCO160'].Items">
                              <div v-if="index === 8" :key="index + 'A18'">
                                <div :key="index + 'A18'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO160radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO160radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                            <div v-if="MASTERDATA['PRANCO160'].Items[8].Value === true" :data="item" :key="index + 'A19'" v-for="(item, index) in MASTERDATA['PRANCO195'].Items">
                              <div class="btn-action radio-left">
                                <MDRadio
                                  v-if="!isReadOnly"
                                  :noFlex="true"
                                  :indexs="[index]"
                                  v-model="MASTERDATA['PRANCO195']"
                                />
                                <MDRadio
                                  v-else
                                  :noFlex="true"
                                  :indexs="[index]"
                                  v-model="MASTERDATA['PRANCO195']"
                                  style="pointer-events: none;"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex-box flex-center">
                        <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA["PRANCO198"])}}:</label>
                        <div :data="item" :key="index + 'A20'" v-for="(item, index) in MASTERDATA['PRANCO198'].Items">
                          <div class="btn-action radio-left">
                            <MDRadio
                              v-if="!isReadOnly"
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO198']"
                            />
                            <MDRadio
                              v-else
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO198']"
                              style="pointer-events: none;"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex-box flex-center">
                        <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA["PRANCO201"])}}:</label>
                        <div :data="item" :key="index + 'A21'" v-for="(item, index) in MASTERDATA['PRANCO201'].Items">
                          <div class="btn-action radio-left">
                            <MDRadio
                              v-if="!isReadOnly"
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO201']"
                            />
                            <MDRadio
                              v-else
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO201']"
                              style="pointer-events: none;"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex-box flex-center">
                        <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA["PRANCO204"])}}:</label>
                        <div class="row col-md-12">
                          <!-- ASA -->
                          <div class="col-md-5" style="margin-top: 5px; margin-left:40px;">
                            <div class="flex-box flex-center">
                              <label style="margin-top:5px;">{{ __t(__label(MASTERDATA["PRANCO205"])) }}:</label>
                              <div :data="item" :key="index + 'A22'" v-for="(item, index) in MASTERDATA['PRANCO205'].Items">
                                <div class="btn-action radio-left" style="width: 100%;">
                                  <MDRadio
                                    v-if="!isReadOnly"
                                    :noFlex="true"
                                    :indexs="[index]"
                                    v-model="MASTERDATA['PRANCO205']"
                                  />
                                  <MDRadio
                                    v-else
                                    :noFlex="true"
                                    :indexs="[index]"
                                    v-model="MASTERDATA['PRANCO205']"
                                    style="pointer-events: none;"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- Goldman score -->
                          <div class="col-md-6" style="margin-top: 5px;">
                            <div class="flex-box flex-center">
                              <label style="margin-top:5px;">{{ __t(__label(MASTERDATA["PRANCO212"])) }}:</label>
                              <div :data="item" :key="index + 'A23'" v-for="(item, index) in MASTERDATA['PRANCO212'].Items">
                                <div class="btn-action radio-left" style="width: 100%;">
                                  <MDRadio
                                    v-if="!isReadOnly"
                                    :noFlex="true"
                                    :indexs="[index]"
                                    v-model="MASTERDATA['PRANCO212']"
                                  />
                                  <MDRadio
                                    v-else
                                    :noFlex="true"
                                    :indexs="[index]"
                                    v-model="MASTERDATA['PRANCO212']"
                                    style="pointer-events: none;"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex-box flex-center">
                        <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA["PRANCO217"])}}:</label>
                        <div :data="item" :key="index + 'A24'" v-for="(item, index) in MASTERDATA['PRANCO217'].Items">
                          <div class="btn-action radio-left">
                            <MDRadio
                              v-if="!isReadOnly"
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO217']"
                            />
                            <MDRadio
                              v-else
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO217']"
                              style="pointer-events: none;"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex-box flex-center">
                        <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA["PRANCO220"])}}:</label>
                        <div :data="item" :key="index + 'A25'" v-for="(item, index) in MASTERDATA['PRANCO220'].Items">
                          <div class="btn-action radio-left">
                            <MDRadio
                              v-if="!isReadOnly"
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO220']"
                            />
                            <MDRadio
                              v-else
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO220']"
                              style="pointer-events: none;"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex-box flex-center">
                        <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__t('Nguy cơ huyết khối tĩnh mạch sâu (Tuổi, BMI, hút thuốc, Oestrogen, ung thư, tiền sử DVT, đột biến Factor V Laiden, phẫu thuật)')}}:</label>
                        <div :data="item" :key="index + 'A26'" v-for="(item, index) in MASTERDATA['PRANCO223'].Items">
                          <div class="btn-action radio-left">
                            <MDRadio
                              v-if="!isReadOnly"
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO223']"
                            />
                            <MDRadio
                              v-else
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO223']"
                              style="pointer-events: none;"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- V. Khám chuyên khoa -->
          <div id="Block6_PreAnesthesiaConsultation">
            <div class="tbl-title">V. {{__label(MASTERDATA["PRANCO226"])}}</div>
            <div>
              <div class="box-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <div class="flex-box flex-center">
                        <div :data="item" :key="index + 'E1'" v-for="(item, index) in MASTERDATA['PRANCO226'].Items">
                          <div class="btn-action radio-left">
                            <MDRadio
                              v-if="!isReadOnly"
                              :class="{'readonly': checkLockChangeRequire}"
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO226']"
                            />
                            <MDRadio
                              v-else
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO226']"
                              style="pointer-events: none;"
                            />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA['PRANCO226'].Items[1].Value === true">
                        <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA["PRANCO227"])}}:</label>
                      </div>
                      <div class="box1 box-table1" id="PRANCO227">
                        <div v-if="MASTERDATA['PRANCO226'].Items[1].Value === true" class="flex-box flex-center">
                          <div :data="item" :key="index + 'E2'" v-for="(item, index) in MASTERDATA['PRANCO227'].Items">
                            <div :key="index + 'E2'" v-if="item.DataType === 'Radio' && index === 9">
                              <div class="btn-action radio-left" style="display: flex; flex-direction: column">
                                <MDRadioMulti
                                  :class="{'readonly': checkLockChangeTM}"
                                  v-if="!isReadOnly"
                                  :noFlex="true"
                                  :indexs="[9]"
                                  v-model="MASTERDATA['PRANCO227']"
                                />
                                <MDRadioMulti
                                  v-else
                                  :noFlex="true"
                                  :indexs="[9]"
                                  v-model="MASTERDATA['PRANCO227']"
                                  style="pointer-events: none;"
                                />
                              </div>
                            </div>
                          </div>
                          <VSelect
                            v-if="MASTERDATA['PRANCO227'].Items[9].Value === true"
                            style="width: 30.33333333% !important; margin: 5px 12px 5px 12px"
                            :search="true"
                            class="full-w select-boox-full-w"
                            :items="getMDSPECIALITIESS"
                            v-model="MASTERDATA['PRANCO227'].Items[12].Value"
                            :id="MASTERDATA['PRANCO227'].Items[12].Code"
                            :isCheckVSelect="isReadOnly || checkLockChangeTM"
                            @input="testData()"
                          />
                          <!-- <span v-if="MASTERDATA['PRANCO227'].Items[9].Value === true && dataCheck !== 0 && checkUserTM === 'KCKTM'" class="col-md-7" style="width: 59.33333333% !important">{{__t('NB')}} <b>{{__t(statusUserTM)}}</b> {{__t('tại')}} <b>{{siteUserTM}},</b> {{__t('Tiếp nhận bởi')}}: <AdInfo :ad="acceptByTM" />  <DetailInfo :visitId="receiveVisitIdTM"/></span> -->
                          <span v-if="MASTERDATA['PRANCO227'].Items[9].Value === true && dataCheck !== 0 && checkUserTM === 'KCKTM'" class="col-md-7" style="width: 59.33333333% !important">{{__t('NB')}} <b>{{__t(statusUserTM)}}</b> {{__t('tại')}} <b>{{siteUserTM}},</b> {{__t('Tiếp nhận bởi')}}: <AdInfo :ad="acceptByTM" /> <a  @click="openTM()" style="cursor: pointer">{{__t('Xem chi tiết')}}</a></span>
                          <div>
                            <modal name="histoyr-modalxx1" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth">
                              <div class="box v-model-content-popup">
                                <div class="box-body padding-15">
                                  <OPD-View :VisitId="receiveVisitIdTM" :checkAnesthesia="false"/>
                                </div>
                                <div class="box-footer padding-15">
                                  <div class="row">
                                    <div class="col-md-12"><button type="button" class="btn btn-block" @click="closeTM">{{__t('Quay lại')}}</button></div>
                                  </div>
                                </div>
                              </div>
                            </modal>
                          </div>
                        </div>
                        <div v-if="MASTERDATA['PRANCO226'].Items[1].Value === true" class="flex-box flex-center"  >
                          <div :data="item" :key="index + 'E3'" v-for="(item, index) in MASTERDATA['PRANCO227'].Items">
                            <div :key="index + 'E3'" v-if="item.DataType === 'Radio' && index === 10">
                              <div class="btn-action radio-left" style="display: flex; flex-direction: column">
                                <MDRadioMulti
                                  v-if="!isReadOnly"
                                  :class="{'readonly': checkLockChangeHH}"
                                  :noFlex="true"
                                  :indexs="[10]"
                                  v-model="MASTERDATA['PRANCO227']"
                                />
                                <MDRadioMulti
                                  v-else
                                  :noFlex="true"
                                  :indexs="[10]"
                                  v-model="MASTERDATA['PRANCO227']"
                                  style="pointer-events: none;"
                                />
                              </div>
                            </div>
                          </div>
                          <VSelect
                            v-if="MASTERDATA['PRANCO227'].Items[10].Value === true"
                            style="width: 30.33333333% !important; margin: 5px 12px 5px 12px"
                            :search="true"
                            class="full-w select-boox-full-w"
                            :items="getMDSPECIALITIESS"
                            v-model="MASTERDATA['PRANCO227'].Items[13].Value"
                            :id="MASTERDATA['PRANCO227'].Items[13].Code"
                            :isCheckVSelect="isReadOnly || checkLockChangeHH"
                            @input="testData()"
                          />
                          <!-- <span v-if="MASTERDATA['PRANCO227'].Items[10].Value === true && dataCheck !== 0 && checkUserHH === 'KCKHH'" class="col-md-7" style="width: 59.33333333% !important">{{__t('NB')}} <b>{{__t(statusUserHH)}}</b> {{__t('tại')}} <b>{{siteUserHH}},</b> {{__t('Tiếp nhận bởi')}}: <AdInfo :ad="acceptByHH" />  <DetailInfo :visitId="receiveVisitIdHH"/></span> -->
                          <span v-if="MASTERDATA['PRANCO227'].Items[10].Value === true && dataCheck !== 0 && checkUserHH === 'KCKHH'" class="col-md-7" style="width: 59.33333333% !important">{{__t('NB')}} <b>{{__t(statusUserHH)}}</b> {{__t('tại')}} <b>{{siteUserHH}},</b> {{__t('Tiếp nhận bởi')}}: <AdInfo :ad="acceptByHH" /> <a @click="openHH" style="cursor: pointer">{{__t('Xem chi tiết')}}</a></span>
                          <div>
                            <modal name="histoyr-modalxx2" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth">
                              <div class="box v-model-content-popup">
                                <div class="box-body padding-15">
                                  <OPD-View :VisitId="receiveVisitIdHH" :checkAnesthesia="false"/>
                                </div>
                                <div class="box-footer padding-15">
                                  <div class="row">
                                    <div class="col-md-12"><button type="button" class="btn btn-block" @click="closeHH">{{__t('Quay lại')}}</button></div>
                                  </div>
                                </div>
                              </div>
                            </modal>
                          </div>
                        </div>
                        <div v-if="MASTERDATA['PRANCO226'].Items[1].Value === true" class="flex-box flex-center">
                          <div :data="item" :key="index + 'E4'" v-for="(item, index) in MASTERDATA['PRANCO227'].Items">
                            <div :key="index + 'E4'" v-if="item.DataType === 'Radio' && index === 11">
                              <div class="btn-action radio-left" style="display: flex; flex-direction: column">
                                <MDRadioMulti
                                  v-if="!isReadOnly"
                                  :class="{'readonly': checkLockChangeK}"
                                  :noFlex="true"
                                  :indexs="[11]"
                                  v-model="MASTERDATA['PRANCO227']"
                                />
                                <MDRadioMulti
                                  v-else
                                  :noFlex="true"
                                  :indexs="[11]"
                                  v-model="MASTERDATA['PRANCO227']"
                                  style="pointer-events: none;"
                                />
                              </div>
                            </div>
                          </div>
                          <VSelect
                            v-if="MASTERDATA['PRANCO227'].Items[11].Value === true"
                            style="width: 30.33333333% !important; margin: 5px 12px 5px 12px"
                            :search="true"
                            class="full-w select-boox-full-w"
                            :items="getMDSPECIALITIESS"
                            v-model="MASTERDATA['PRANCO227'].Items[14].Value"
                            :id="MASTERDATA['PRANCO227'].Items[14].Code"
                            :isCheckVSelect="isReadOnly || checkLockChangeK"
                            @input="testData()"
                          />
                          <!-- <span v-if="MASTERDATA['PRANCO227'].Items[11].Value === true && dataCheck !== 0 && checkUserK === 'KCKK'" class="col-md-7" style="width: 59.33333333% !important">{{__t('NB')}} <b>{{__t(statusUserK)}}</b> {{__t('tại')}} <b>{{siteUserK}},</b> {{__t('Tiếp nhận bởi')}}: <AdInfo :ad="acceptByK" />  <DetailInfo :visitId="receiveVisitIdK"/></span> -->
                          <span v-if="MASTERDATA['PRANCO227'].Items[11].Value === true && dataCheck !== 0 && checkUserK === 'KCKK'" class="col-md-7" style="width: 59.33333333% !important">{{__t('NB')}} <b>{{__t(statusUserK)}}</b> {{__t('tại')}} <b>{{siteUserK}},</b> {{__t('Tiếp nhận bởi')}}: <AdInfo :ad="acceptByK" /> <a  @click="openK" style="cursor: pointer">{{__t('Xem chi tiết')}}</a></span>
                          <div>
                            <modal name="histoyr-modalxx3" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth">
                              <div class="box v-model-content-popup">
                                <div class="box-body padding-15">
                                  <OPD-View :VisitId="receiveVisitIdK" :checkAnesthesia="false"/>
                                </div>
                                <div class="box-footer padding-15">
                                  <div class="row">
                                    <div class="col-md-12"><button type="button" class="btn btn-block" @click="closeK">{{__t('Quay lại')}}</button></div>
                                  </div>
                                </div>
                              </div>
                            </modal>
                          </div>
                        </div>
                      </div>
                      <div class="v-row" v-if="MASTERDATA['PRANCO226'].Items[1].Value === true">
                        <template v-for="(item, index) in MASTERDATA['PRANCO334'].Items">
                          <div v-if="index >= 0" :key="index">
                            <div :key="index" v-if="item.DataType === 'Checkbox'">
                              <div class="flex-box flex-center">
                                <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                <span class="v-checkbox" v-else>
                                  <input type="checkbox" :id="'PRANCO334radio-' + index" v-model="item.Value">
                                  <label :for="'PRANCO334radio-' + index"></label>
                                </span>
                                <span class="displaytbl no-wrap"><span>{{__t('Đã xem báo cáo')}}</span></span>
                                <textarea-autosize :readonly="isReadOnly" v-if="MASTERDATA['PRANCO334'].Items[0].Value === true" v-model="MASTERDATA['PRANCO334'].Items[1].Value" :code="MASTERDATA['PRANCO334'].Items[1].Code" class="form-control" style="margin-top: 2px; margin-left: 5px" :placeholder="__t('Nhập')"/>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                      <div class="v-row">
                        <div class="flex-box flex-center">
                          <label class="display-inline no-wrap mt-5" style="font-weight: bold">{{__label(MASTERDATA["PRANCO236"])}}:</label>
                          <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['PRANCO236'].Items">
                            <div class="btn-action radio-left">
                              <MDRadio
                                v-if="!isReadOnly"
                                :noFlex="true"
                                :indexs="[index]"
                                v-model="MASTERDATA['PRANCO236']"
                              />
                              <MDRadio
                                v-else
                                :noFlex="true"
                                :indexs="[index]"
                                v-model="MASTERDATA['PRANCO236']"
                                style="pointer-events: none;"
                              />
                            </div>
                          </div>
                          <textarea-autosize :readonly="isReadOnly" v-if="MASTERDATA['PRANCO236'].Items[1].Value === true" :code="MASTERDATA['PRANCO236'].Items[2].Code" v-model="MASTERDATA['PRANCO236'].Items[2].Value" class="form-control" style="margin-top: 2px;" :placeholder="__t('Nhập')"/>
                        </div>
                      </div>
                      <div class="v-row">
                        <template v-for="(item, index) in MASTERDATA['PRANCO239'].Items">
                          <div v-if="index >= 0" :key="index">
                            <div :key="index" v-if="item.DataType === 'Checkbox'">
                              <div class="flex-box flex-center">
                                <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                <span class="v-checkbox" v-else>
                                  <input type="checkbox" :id="'PRANCO239radio-' + index" v-model="item.Value">
                                  <label :for="'PRANCO239radio-' + index"></label>
                                </span>
                                <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                <textarea-autosize :readonly="isReadOnly" v-if="MASTERDATA['PRANCO239'].Items[1].Value === true" :code="MASTERDATA['PRANCO239'].Items[0].Code" v-model="MASTERDATA['PRANCO239'].Items[0].Value" class="form-control" style="margin-top: 2px; margin-left: 5px" :placeholder="__t('Nhập')"/>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- VI. Nguy cơ -->
          <div id="Block7_PreAnesthesiaConsultation">
            <div class="tbl-title">VI. {{__label(MASTERDATA["PRANCO241"])}}</div>
            <div>
              <div class="box-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group col-md-4">
                      <div class="flex-box flex-center">
                        <div class="buttonChoose2">
                          <template v-for="(item, index) in MASTERDATA['PRANCO241'].Items">
                            <div v-if="index >= 0 && index <=3" :key="index">
                              <div :key="index" v-if="item.DataType === 'Checkbox'">
                                <div class="flex-box flex-center">
                                  <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                  <span class="v-checkbox" v-else>
                                    <input type="checkbox" :id="'PRANCO241radio-' + index" v-model="item.Value">
                                    <label :for="'PRANCO241radio-' + index"></label>
                                  </span>
                                  <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                </div>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-md-6">
                      <div class="flex-box flex-center">
                        <div class="buttonChoose2">
                          <template v-for="(item, index) in MASTERDATA['PRANCO241'].Items">
                            <div v-if="index >= 4 && index <= 6" :key="index">
                              <div :key="index" v-if="item.DataType === 'Checkbox'">
                                <div class="flex-box flex-center">
                                  <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                  <span class="v-checkbox" v-else>
                                    <input type="checkbox" :id="'PRANCO241radio-' + index" v-model="item.Value">
                                    <label :for="'PRANCO241radio-' + index"></label>
                                  </span>
                                  <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                </div>
                              </div>
                            </div>
                          </template>
                          <template v-for="(item, index) in MASTERDATA['PRANCO241'].Items">
                            <div v-if="index === 8" :key="index">
                              <div :key="index" v-if="item.DataType === 'Checkbox'">
                                <div class="flex-box flex-center">
                                  <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                  <span class="v-checkbox" v-else>
                                    <input type="checkbox" :id="'PRANCO241radio-' + index" v-model="item.Value">
                                    <label :for="'PRANCO241radio-' + index"></label>
                                  </span>
                                  <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                </div>
                              </div>
                            </div>
                          </template>
                          <template v-for="(item, index) in MASTERDATA['PRANCO241'].Items">
                            <div v-if="index === 7" :key="index">
                              <div :key="index" v-if="item.DataType === 'Checkbox'">
                                <div class="flex-box flex-center">
                                  <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                  <span class="v-checkbox" v-else>
                                    <input type="checkbox" :id="'PRANCO241radio-' + index" v-model="item.Value">
                                    <label :for="'PRANCO241radio-' + index"></label>
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
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <div class="flex-box flex-center">
                        <label class="display-inline no-wrap mt-10" style="font-weight: bold">{{__label(MASTERDATA["PRANCO250"])}}:</label>
                        <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['PRANCO250'].Items">
                          <div class="btn-action radio-left" style="width: 100%;">
                            <MDRadio
                              v-if="!isReadOnly"
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO250']"
                            />
                            <MDRadio
                              v-else
                              :noFlex="true"
                              :indexs="[index]"
                              v-model="MASTERDATA['PRANCO250']"
                              style="pointer-events: none;"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- VII. Kế hoạch -->
          <div id="Block8_PreAnesthesiaConsultation">
            <div class="tbl-title">VII. {{__label(MASTERDATA["PRANCO254"])}}</div>
            <div>
              <div class="box-body">
                <div class="row">
                  <div class="col-md-12">
                    <!-- Kế hoạch kiểm soát đường thở khi gây mê -->
                    <label>{{ __t(__label(MASTERDATA["PRANCO255"])) }}:</label>
                    <div class="form-group">
                      <div class="flex-box flex-center" style="width: 100%;">
                        <div class="buttonChoose2" style="width: 100%;">
                          <template v-for="(item, index) in MASTERDATA['PRANCO255'].Items">
                            <div v-if="index === 0" :key="index + 'M'">
                              <div :key="index" v-if="item.DataType === 'Checkbox'">
                                <div class="flex-box flex-center">
                                  <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                  <span class="v-checkbox" v-else>
                                    <input type="checkbox" :id="'PRANCO255radio-' + index" v-model="item.Value">
                                    <label :for="'PRANCO255radio-' + index"></label>
                                  </span>
                                  <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                </div>
                              </div>
                            </div>
                          </template>
                          <table width="100%" class="box1 box-table1" id="PRANCO347">
                            <td width="10%">
                              <template v-if="MASTERDATA['PRANCO255'].Items[0].Value === true" v-for="(item, index) in MASTERDATA['PRANCO347'].Items">
                                <div v-if="index >= 0 && index <= 3" :key="index + 'N'">
                                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                                    <div class="checkbox-rounded flex-box flex-center ml-20">
                                      <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO347radio-' + index" v-model="item.Value">
                                        <label :for="'PRANCO347radio-' + index"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                    </div>
                                  </div>
                                </div>
                              </template>
                            </td>
                            <td width="50%">
                              <template v-if="MASTERDATA['PRANCO255'].Items[0].Value === true" v-for="(item, index) in MASTERDATA['PRANCO347'].Items">
                                <div v-if="index >= 4 && index <= 5" :key="index + 'N'">
                                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                                    <div class="checkbox-rounded flex-box flex-center ml-20">
                                      <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO347radio-' + index" v-model="item.Value">
                                        <label :for="'PRANCO347radio-' + index"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <template v-if="MASTERDATA['PRANCO255'].Items[0].Value === true" v-for="(item, index) in MASTERDATA['PRANCO347'].Items">
                                <div v-if="index === 6" :key="index + 'N'">
                                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                                    <div class="checkbox-rounded flex-box flex-center ml-20">
                                      <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO347radio-' + index" v-model="item.Value">
                                        <label :for="'PRANCO347radio-' + index"></label>
                                      </span>
                                      <div class="d-flex flex-center">
                                        <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                        <textarea-autosize id="PRANCO377" :readonly="isReadOnly" v-if="MASTERDATA['PRANCO347'].Items[6].Value === true" style="width:234px; margin-left: 25px;" class="form-control" :placeholder="__t('Nhập')" :code="MASTERDATA['PRANCO347'].Items[8].Code" v-model="MASTERDATA['PRANCO347'].Items[8].Value"/>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </template>
                            </td>
                          </table>
                        </div>
                      </div>
                      <!-- <div class="flex-box flex-center">
                        <div class="buttonChoose2">
                          <template v-for="(item, index) in MASTERDATA['PRANCO255'].Items">
                            <div v-if="index === 1" :key="index + 'A'">
                              <div :key="index" v-if="item.DataType === 'Checkbox'">
                                <div class="flex-box flex-center">
                                  <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                                  <span class="v-checkbox" v-else>
                                    <input type="checkbox" :id="'PRANCO255radio-' + index" v-model="item.Value">
                                    <label :for="'PRANCO255radio-' + index"></label>
                                  </span>
                                  <span class="displaytbl no-wrap"><span>{{__label(item)}}:</span></span>
                                </div>
                              </div>
                            </div>
                          </template>
                        </div>
                        <textarea-autosize :readonly="isReadOnly" style="margin-left: 17px;" class="form-control" :placeholder="__t('Ghi cụ thể')" v-if="MASTERDATA['PRANCO255'].Items[1].Value === true" v-model="MASTERDATA['PRANCO266'].Items[1].Value"/>
                      </div> -->
                      <div class="flex-box flex-center" style="width: 100%;">
                        <div class="buttonChoose2" style="width: 100%;">
                          <template v-for="(item, index) in MASTERDATA['PRANCO255'].Items">
                            <div v-if="index === 2" :key="index + 'B'">
                              <div :key="index" v-if="item.DataType === 'Checkbox'">
                                <div class="flex-box flex-center">
                                  <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                  <span class="v-checkbox" v-else>
                                    <input type="checkbox" :id="'PRANCO255radio-' + index" v-model="item.Value">
                                    <label :for="'PRANCO255radio-' + index"></label>
                                  </span>
                                  <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                </div>
                              </div>
                            </div>
                          </template>
                          <div class="box1 box-table1" id="PRANCO269">
                            <table width="100%" >
                              <td width="10%">
                                <template v-if="MASTERDATA['PRANCO255'].Items[2].Value === true" v-for="(item, index) in MASTERDATA['PRANCO269'].Items">
                                  <div v-if="index >= 0 && index <= 3" :key="index + 'O'">
                                    <div :key="index" v-if="item.DataType === 'Checkbox'">
                                      <div class="checkbox-rounded flex-box flex-center ml-20">
                                        <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                        <span class="v-checkbox" v-else>
                                          <input type="checkbox" :id="'PRANCO269radio-' + index" v-model="item.Value">
                                          <label :for="'PRANCO269radio-' + index"></label>
                                        </span>
                                        <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                      </div>
                                    </div>
                                  </div>
                                </template>
                              </td>
                              <td width="50%">
                                <template v-if="MASTERDATA['PRANCO255'].Items[2].Value === true" v-for="(item, index) in MASTERDATA['PRANCO269'].Items">
                                  <div v-if="index >= 4 && index <= 5" :key="index + 'O'">
                                    <div :key="index" v-if="item.DataType === 'Checkbox'">
                                      <div class="checkbox-rounded flex-box flex-center ml-20">
                                        <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                        <span class="v-checkbox" v-else>
                                          <input type="checkbox" :id="'PRANCO269radio-' + index" v-model="item.Value">
                                          <label :for="'PRANCO269radio-' + index"></label>
                                        </span>
                                        <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                      </div>
                                    </div>
                                  </div>
                                </template>
                                <template v-if="MASTERDATA['PRANCO255'].Items[2].Value === true" v-for="(item, index) in MASTERDATA['PRANCO269'].Items">
                                  <div v-if="index === 6" :key="index + 'O'">
                                    <div :key="index" v-if="item.DataType === 'Checkbox'">
                                      <div class="checkbox-rounded flex-box flex-center ml-20">
                                        <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                        <span class="v-checkbox" v-else>
                                          <input type="checkbox" :id="'PRANCO269radio-' + index" v-model="item.Value">
                                          <label :for="'PRANCO269radio-' + index"></label>
                                        </span>
                                        <div class="d-flex flex-center">
                                          <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                          <textarea-autosize id="PRANCO376" :readonly="isReadOnly" v-if="MASTERDATA['PRANCO269'].Items[6].Value === true" style="width:234px; margin-left: 25px;" class="form-control" :placeholder="__t('Nhập')" :code="MASTERDATA['PRANCO269'].Items[8].Code" v-model="MASTERDATA['PRANCO269'].Items[8].Value"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </template>
                              </td>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Kế hoạch vô cảm chi tiết -->
                    <label>{{ __t(__label(MASTERDATA["PRANCO278"])) }}:</label>
                    <table width="100%">
                      <td width="33.33333%">
                        <div class="flex-box flex-center">
                          <div class="buttonChoose2">
                            <template v-for="(item, index) in MASTERDATA['PRANCO278'].Items">
                              <div v-if="index >= 0 && index <= 2" :key="index + 'N1'">
                                <div :key="index + 'N1'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO278radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO278radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </td>
                      <td width="33.33333%">
                        <div class="flex-box flex-center">
                          <div class="buttonChoose2">
                            <template v-for="(item, index) in MASTERDATA['PRANCO278'].Items">
                              <div v-if="index >= 3 && index <= 5" :key="index + 'N2'">
                                <div :key="index + 'N2'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO278radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO278radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </td>
                      <td width="33.33333%">
                        <div class="flex-box flex-center">
                          <div class="buttonChoose2">
                            <template v-for="(item, index) in MASTERDATA['PRANCO278'].Items">
                              <div v-if="index === 6" :key="index + 'N3'">
                                <div :key="index + 'n3'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO278radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO278radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                            <div style="display: flex;">
                              <template v-for="(item, index) in MASTERDATA['PRANCO278'].Items">
                                <div v-if="index === 7" :key="index + 'N3'">
                                  <div :key="index + 'n3'" v-if="item.DataType === 'Checkbox'">
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO278radio-' + index" v-model="item.Value">
                                        <label :for="'PRANCO278radio-' + index"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <textarea-autosize id="PRANCO378" :placeholder="__t('Nhập')" :readonly="isReadOnly" style="width: 234px; margin-left: 7px; line-height: 22px; height: 35px !important;" class="form-control" v-if="MASTERDATA['PRANCO278'].Items[7].Value === true" :code="MASTERDATA['PRANCO278'].Items[10].Code" v-model="MASTERDATA['PRANCO278'].Items[10].Value"/>
                            </div>
                            <template v-for="(item, index) in MASTERDATA['PRANCO278'].Items">
                              <div v-if="index === 9" :key="index + 'N3'">
                                <div :key="index + 'n3'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO278radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO278radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </td>
                    </table>
                    <!-- Kế hoạch giảm đau -->
                    <label>{{ __t(__label(MASTERDATA["PRANCO289"])) }}:</label>
                    <table width="100%">
                      <td width="33.33333%">
                        <div class="flex-box flex-center">
                          <div class="buttonChoose2">
                            <template v-for="(item, index) in MASTERDATA['PRANCO289'].Items">
                              <div v-if="index >= 0 && index <= 2" :key="index + 'N11'">
                                <div :key="index + 'N11'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO289radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO289radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </td>
                      <td width="33.33333%">
                        <div class="flex-box flex-center">
                          <div class="buttonChoose2">
                            <template v-for="(item, index) in MASTERDATA['PRANCO289'].Items">
                              <div v-if="index >= 3 && index <= 4" :key="index + 'N21'">
                                <div :key="index + 'N21'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO289radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO289radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                            <div style="display: flex;">
                              <template v-for="(item, index) in MASTERDATA['PRANCO289'].Items">
                                <div v-if="index === 5" :key="index + 'N22'">
                                  <div :key="index + 'N22'" v-if="item.DataType === 'Checkbox'">
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO289radio-' + index" v-model="item.Value">
                                        <label :for="'PRANCO289radio-' + index"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <textarea-autosize :placeholder="__t('Nhập')" :readonly="isReadOnly" style="width: 234px; margin-left: 7px; line-height: 22px; height: 35px !important;" class="form-control" v-if="MASTERDATA['PRANCO289'].Items[5].Value === true" :code="MASTERDATA['PRANCO289'].Items[8].Code" v-model="MASTERDATA['PRANCO289'].Items[8].Value"/>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td width="33.33333%">
                        <div class="flex-box flex-center">
                          <div class="buttonChoose2">
                            <template v-for="(item, index) in MASTERDATA['PRANCO289'].Items">
                              <div v-if="index === 7" :key="index + 'N31'">
                                <div :key="index + 'N31'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO289radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO289radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </td>
                    </table>
                    <!-- Dặn dò trước phẫu thuật -->
                    <label>{{ __t(__label(MASTERDATA["PRANCO298"])) }}:</label>
                    <table width="100%">
                      <td width="33.33333%">
                        <div class="flex-box flex-center">
                          <div class="buttonChoose2">
                            <template v-for="(item, index) in MASTERDATA['PRANCO298'].Items">
                              <div v-if="index >= 0 && index <= 1" :key="index + 'NN11'">
                                <div :key="index + 'NN11'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO298radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO298radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </td>
                      <td width="33.33333%">
                        <div class="flex-box flex-center">
                          <div class="buttonChoose2">
                            <template v-for="(item, index) in MASTERDATA['PRANCO298'].Items">
                              <div v-if="index >= 2 && index <= 3" :key="index + 'NN21'">
                                <div :key="index + 'NN21'" v-if="item.DataType === 'Checkbox'">
                                  <div class="flex-box flex-center">
                                    <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                    <span class="v-checkbox" v-else>
                                      <input type="checkbox" :id="'PRANCO298radio-' + index" v-model="item.Value">
                                      <label :for="'PRANCO298radio-' + index"></label>
                                    </span>
                                    <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                  </div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </td>
                      <td width="33.33333%">
                        <div class="flex-box flex-center">
                          <div class="buttonChoose2">
                            <div style="display: flex;">
                              <template v-for="(item, index) in MASTERDATA['PRANCO298'].Items">
                                <div v-if="index === 4" :key="index + 'NN22'">
                                  <div :key="index + 'NN22'" v-if="item.DataType === 'Checkbox'">
                                    <div class="flex-box flex-center">
                                      <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                                      <span class="v-checkbox" v-else>
                                        <input type="checkbox" :id="'PRANCO298radio-' + index" v-model="item.Value">
                                        <label :for="'PRANCO298radio-' + index"></label>
                                      </span>
                                      <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <textarea-autosize :placeholder="__t('Nhập')" :readonly="isReadOnly" style="width: 234px; margin-left: 7px; line-height: 22px; height: 35px !important;" class="form-control" v-if="MASTERDATA['PRANCO298'].Items[4].Value === true" :code="MASTERDATA['PRANCO298'].Items[6].Code" v-model="MASTERDATA['PRANCO298'].Items[6].Value"/>
                            </div>
                          </div>
                        </div>
                      </td>
                    </table>
                    <!-- Nhịn ăn -->
                    <div class="flex-box flex-center">
                      <label>{{ __t(__label(MASTERDATA["PRANCO305"])) }}:</label>
                      <div :data="item" :key="index + 'AA25'" v-for="(item, index) in MASTERDATA['PRANCO305'].Items">
                        <div class="btn-action radio-left">
                          <MDRadio
                            v-if="!isReadOnly"
                            :noFlex="true"
                            :indexs="[index]"
                            v-model="MASTERDATA['PRANCO305']"
                          />
                          <MDRadio
                            v-else
                            :noFlex="true"
                            :indexs="[index]"
                            v-model="MASTERDATA['PRANCO305']"
                            style="pointer-events: none;"
                          />
                        </div>
                      </div>
                    </div>
                    <!-- Thuốc tiền gây mê -->
                    <div class="flex-box flex-center">
                      <label>{{ __t(__label(MASTERDATA["PRANCO308"])) }}:</label>
                      <div :data="item" :key="index + 'AA25'" v-for="(item, index) in MASTERDATA['PRANCO308'].Items">
                        <div class="btn-action radio-left">
                          <MDRadio
                            v-if="!isReadOnly"
                            :noFlex="true"
                            :indexs="[index]"
                            v-model="MASTERDATA['PRANCO308']"
                          />
                          <MDRadio
                            v-else
                            :noFlex="true"
                            :indexs="[index]"
                            v-model="MASTERDATA['PRANCO308']"
                            style="pointer-events: none;"
                          />
                        </div>
                      </div>
                    </div>
                    <textarea-autosize :readonly="isReadOnly" style="margin-top:7px;" v-if="MASTERDATA['PRANCO308'].Items[1].Value === true" :code="MASTERDATA['PRANCO308'].Items[3].Code" v-model="MASTERDATA['PRANCO308'].Items[3].Value" class="form-control" rows="1" :placeholder="__t('Nhập')"/>
                    <!-- Thông tin khác -->
                    <div class="flex-box flex-center">
                      <label>{{ __t(__label(MASTERDATA["PRANCO312"])) }}:</label>
                      <div :data="item" :key="index + 'AA25'" v-for="(item, index) in MASTERDATA['PRANCO312'].Items">
                        <div class="btn-action radio-left">
                          <MDRadio
                            v-if="!isReadOnly"
                            :noFlex="true"
                            :indexs="[index]"
                            v-model="MASTERDATA['PRANCO312']"
                          />
                          <MDRadio
                            v-else
                            :noFlex="true"
                            :indexs="[index]"
                            v-model="MASTERDATA['PRANCO312']"
                            style="pointer-events: none;"
                          />
                        </div>
                      </div>
                    </div>
                    <textarea-autosize :readonly="isReadOnly" style="margin-top:7px;" v-if="MASTERDATA['PRANCO312'].Items[1].Value === true" :code="MASTERDATA['PRANCO312'].Items[3].Code" v-model="MASTERDATA['PRANCO312'].Items[3].Value" class="form-control" rows="1" :placeholder="__t('Nhập')"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- VIII. Thông tin khác -->
          <div id="Block9_PreAnesthesiaConsultation">
            <div class="tbl-title">VIII. {{ __t("Thông tin khác") }}</div>
            <div>
              <div class="box-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <OutpatientExaminationNoteInfo
                        :checkReadOnly="isReadOnly"
                        :DataSubmit="DataSubmit"
                        :allowEdit="isPrimaryDoctor"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Trạng thái bệnh nhân -->
          <div id="Block10_PreAnesthesiaConsultation" v-if="isReadOnlyStatus">
            <div class="tbl-title">{{ __t("Trạng thái bệnh nhân") }}:</div>
            <div>
              <div class="box-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <b>{{statusPatient}}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- DoctorConfirm -->
          <doctor-confirm :popupTitle="popupTitle" @popupSave="popupSave"/>
        </div>
        <!-- Chân ký -->
        <div class="row" style="width: 100%; display: flex;">
          <div style="width: 50%;"></div>
          <div style="width: 50%;" class="text-center">
            <template v-if="DataSubmit.Confirm.length !== 0">
              <p class="text-center">{{confirmAt}}</p>
              <eform-signature :ad="confirmBy" :title="'Bác sĩ khám mê'" />
            </template>
            <template v-else>
              <p><b>{{__t('Bác sĩ khám mê')}}:</b></p>
              <p><i v-if="isReadOnly">{{__t('Chưa xác nhận')}}</i><button v-else-if="!viewOnly && !IsLocked" @click="showDoctorConfirm('Bác sĩ khám mê ')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
            </template>
          </div>
        </div>
      </div>
      <div class="text-center" v-else>
        <p v-if="!viewOnly && !IsLocked">{{__t('Chưa có Phiếu khám gây mê')}}</p>
        <div v-else class="null-content">{{__t('AdultVitalSigns.labelNull')}}</div>
        <button class="btn btn-warning" @click="DataSubmit.IsConsultation !== false && createPopup(false)" v-if="!viewOnly && !IsLocked">{{__t('Tạo mới')}}</button>
      </div>
      <div v-if="DataSubmit.IsConsultation === false">
        <p class="mt-10">A03_034_200520_VE</p>
      </div>
      <div v-if="hiddenLog && DataSubmit.IsConsultation === false">
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="timeLog" :ad="timeLog[1]" /> {{__t('lúc')}} {{ timeLog[0] }}</p>
      </div>
      <FloatBlock v-if="!viewOnly && DataSubmit.IsConsultation === false" @handleBack='handleBack()' :openBack="true">
        <template slot="top" v-if="!isReadOnlyStatus">
          <label v-if="statusUserTM === 'Đang khám' || statusUserHH === 'Đang khám' || statusUserK === 'Đang khám'" class="label label-warning">{{__t('Bệnh nhân đã chuyển đến ')}} {{siteUserTM !== '' && statusUserTM === 'Đang khám' ? siteUserTM : ''}}{{statusUserTM === 'Đang khám' && (statusUserHH === 'Đang khám' || statusUserK === 'Đang khám') ? ', ' : ''}}{{siteUserHH !== '' && statusUserHH === 'Đang khám' ? siteUserHH : ''}}{{siteUserHH && siteUserK && statusUserHH === 'Đang khám' && statusUserK === 'Đang khám'  ? ', ' : ''}}{{siteUserK !== ''  && statusUserK === 'Đang khám'  ? siteUserK : ''}} {{__t('nên không thể chuyển trạng thái.')}}</label>
          <div class="group-radio mt-5" v-if="MASTERDATA['PRANCO321'].Items" width="25%">
            <template  v-for="(status, index) in MASTERDATA['PRANCO321'].Items">
              <input @change="testData" :class="{'readonlyTest': checkLockFloat}" v-if="status.DataType === 'Radio' && index === 0" :data="status" :key="index" type="checkbox" :id="'a' + index" name="status" v-model="status.Value" @click="checkbox2RadioNotAllowNull(MASTERDATA['PRANCO321'].Items, status)">
              <label :class="{'readonlyTest': checkLockFloat}" v-if="status.DataType === 'Radio' && index === 0" :key="'a' + index" :for="'a' + index"><b>{{__label(status)}}</b></label>
            </template>
            <template  v-for="(status, index) in MASTERDATA['PRANCO321'].Items" style="pointer-events: none">
              <input @change="testData" :class="{'readonlyStatus': checkLockChange}" v-if="status.DataType === 'Radio' && index === 1" :data="status" :key="index" type="checkbox" :id="'a' + index" name="status" v-model="status.Value" @click="checkbox2RadioNotAllowNull(MASTERDATA['PRANCO321'].Items, status)">
              <label :class="{'readonlyStatus': checkLockChange}" v-if="status.DataType === 'Radio' && index === 1" :key="'a' + index" :for="'a' + index"><b>{{__label(status)}}</b></label>
            </template>
            <template  v-for="(status, index) in MASTERDATA['PRANCO321'].Items" style="pointer-events: none">
              <input @change="testData" :class="{'readonlyTest': checkLockFloat}" v-if="status.DataType === 'Radio' && index === 2" :data="status" :key="index" type="checkbox" :id="'a' + index" name="status" v-model="status.Value" @click="checkbox2RadioNotAllowNull(MASTERDATA['PRANCO321'].Items, status)">
              <label :class="{'readonlyTest': checkLockFloat}" v-if="status.DataType === 'Radio' && index === 2" :key="'a' + index" :for="'a' + index"><b>{{__label(status)}}</b></label>
            </template>
            <template  v-for="(status, index) in MASTERDATA['PRANCO321'].Items" >
              <input @change="testData" :class="{'readonlyStatus': checkLockChange}" v-if="status.DataType === 'Radio' && index === 3 && dataCheck === 0" :data="status" :key="index" type="checkbox" :id="'a' + index" name="status" v-model="status.Value" @click="checkbox2RadioNotAllowNull(MASTERDATA['PRANCO321'].Items, status)">
              <label :class="{'readonlyStatus': checkLockChange}" v-if="status.DataType === 'Radio' && index === 3 && dataCheck === 0" :key="'a' + index" :for="'a' + index"><b>{{__label(status)}}</b></label>
            </template>
          </div>
        </template>
        <template slot='buttons'>
          <div v-if="!isReadOnly" class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group1">
            </div>
          </div>
          <!-- <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div> -->
          <div class="col-md-6 col-sm-6" v-if="!isReadOnlyStatus">
            <div class="form-group1">
              <button v-if="!nullContent && this.MASTERDATA['PRANCO321'].Items[3].Value === true" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="noExaminationConfirm()" @click="noExaminationConfirm()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
              <button v-else class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
            </div>
          </div>
          <div class="col-md-6 col-sm-6" v-else>
            <!-- Nothing -->
          </div>
        </template>
      </FloatBlock>
      <div class="mg-bt-120"></div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>

<script>
// import EventBus from '@/lib/eventBus'
import DetailInfo from '@/components/DetailInfo'
import OPDView from '@/pages/OPD/View.vue'
import InitialAssessment from '@/pages/OPD/InitialAssessment/View.vue'
import CustomerOPD from '@/services/OPD/Customer'
import DoctorConfirm from './popup/PopupDoctorConfirm.vue'
import storage from '@/lib/storage'
import Specialities from '@/services/Specialities'
import OutpatientExaminationNote from '@/services/OPD/OutpatientExaminationNote'
import Diorpt from '@/components/OPD/DI0RPT.vue'
import TblWithMasterData from '@/components/global/TblWithMasterData'
import moment from 'moment'
import MDRadioMulti from '@/components/global/MDRadioMulti.vue'
import VSelect from '@/components/VSelect.vue'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import VDatePickerV2 from '@/components/global/VDatePickerV2.vue'
import MixinMasterdata from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import UserAdV4 from '@/components/global/UserAdV4.vue'
import UserAdV3 from '@/components/global/UserAdV3.vue'
import PreAnesthesiaConsultation from '@/services/OPD/PreAnesthesiaConsultation.js'
import PreAnesthesiaConsultation1 from '@/services/OPD/PreAnesthesiaConsultation1.js'
import OutpatientExaminationNoteInfo from '@/components/OPD/PreAnesthesiaConsultationDoctorInfo.vue'
import VMaskedDateInput from './components/VMaskedDateInput.vue'
// import VSelectBox from '@/components/VSelect.vue'
import _ from 'lodash'
const MODAL_WIDTH = 1280

export default {
  name: 'PreAnesthesiaConsultationItem',
  mixins: [MixinForm, MixinMasterdata],
  props: ['viewOnly', 'VisitId', 'VisitType'],
  components: { InitialAssessment,
    DetailInfo,
    UserAdV4,
    UserAdV3,
    VDateTimePicker,
    VDatePickerV2,
    OutpatientExaminationNoteInfo,
    TblWithMasterData,
    Diorpt,
    MDRadioMulti,
    VSelect,
    DoctorConfirm,
    VMaskedDateInput,
    'OPD-View': OPDView
  },
  data () {
    return {
      checkTM: 0,
      checkHH: 0,
      checkK: 0,
      checker: 0,
      syncOPDOENPT0At: null,
      hasClick: 0,
      hasSave: 0,
      iChoose: 0,
      reset: 0,
      modalWidth: MODAL_WIDTH,
      receiveVisitId: '',
      receiveVisitIdTM: '',
      receiveVisitIdHH: '',
      receiveVisitIdK: '',
      hasPopupTM: false,
      hasPopupHH: false,
      hasPopupK: false,
      handleRadioCheck: false,
      isOnClick: false,
      createForm: false,
      IsApplication: '',
      widthVSelect: '354px',
      popupTitle: '',
      statusPatient: '',
      IspreSRespiratory: false,
      IspreSCcardiology: false,
      confirmAt: '',
      confirmBy: '',
      DataCustomer: '',
      APIService: null,
      dataMaster: null,
      timeLog: [],
      hiddenLog: true,
      checkUser: '',
      statusUser: '',
      siteUser: '',
      acceptBy: '',
      isChooseStatusTM: 0,
      isChooseStatusHH: 0,
      isChooseStatusK: 0,
      statusUserTM: '',
      checkUserTM: '',
      siteUserTM: '',
      acceptByTM: '',
      statusUserHH: '',
      checkUserHH: '',
      siteUserHH: '',
      acceptByHH: '',
      statusUserK: '',
      checkUserK: '',
      siteUserK: '',
      acceptByK: '',
      dataRequire: '',
      dataCheck: '',
      pickSuccess: '',
      isAccept: '',
      MDSPECIALITIES: [],
      highlightCode: [
        'IPDIAAUREASDIS',
        'IPDIAAUCOLOCYA',
        'IPDIAAUMESTDRO',
        'IPDIAAUMESTUNC',
        'IPDIACPEATTNOO',
        'IPDIACPCONDNES',
        'IPDIACPCONDCOD',
        'IPDIACPSKCOABN',
        'IPDIACPHEENABN',
        'IPDIACPTWDIYES',
        'IPDIACPANORYES',
        'IPDIACPCTPTYES',
        'IPDIACPDIARYES',
        'IPDIACPDMOMYES',
        'IPDIACPNAUSYES',
        'IPDIACPVOMIYES',
        'IPDIACPALHLYES',
        'IPDIACPNRTXYES',
        'IPDIACPNTPNYES',
        'IPDIACPHBTCYES',
        'IPDIAFEHASNYSN',
        'IPDIAFEHAFCYSN',
        'IPDIAFEDICFYSN',
        'IPDIAFEAFPTYSN',
        'IPDIAFEAAICYSN'
        // 'EIOPS32',
        // 'EIOPS33',
        // 'EIOPS34',
        // 'EIOPS35',
        // 'EIOPS37',
        // 'EIOPS38',
        // 'EIOPS39',
        // 'EIOPS40',
        // 'EIOPS50',
        // 'EIOPS51',
        // 'EIOPS52'
      ],
      dataIndex: Math.floor((Math.random() * 10000000) + 1),
      dataBloodTestFinding: {
        XetNghiem: [],
        CDHA: [],
        DiagnosticReporting: []
      },
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
      mallampatiOption: [
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
      IsLocked: false,
      InitialAssessmentAllergies: null,
      timeMin: moment(new Date()).format('DD/MM/YYYY'),
      nullContent: true,
      loaded: false,
      test: [],
      timeSurgery: '',
      InitialAssessment: '',
      SyncHistoryOfAllergies: null,
      TableObstetrical: [],
      TableSurgical: [],
      TableDrug: [],
      DataSubmit: null,
      DataExamination: {
        IsSpecialistExamination: true,
        Datas: []
      },
      DataSpeciality: [],
      tableTSNK: [
      ]
    }
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.getMasterDataForStogate()
    this.getMasterDatas({Form: 'A03_034_200520_VE'}, async () => {
      await this.getInfo()
      console.log('not die')
      this.getData()
    })
  },
  watch: {
    MASTERDATA: {
      handler () {
        console.log(this.checkTM, 'check statusTM')
        console.log(this.checkHH, 'check statusHH')
        console.log(this.checkK, 'check statusK')
        console.log(this.checker, 'checkkkkkkkkkkkkkkkk')
        if (this.MASTERDATA['PRANCO227'].Items[9].Value === true && this.MASTERDATA['PRANCO227'].Items[12].Value && this.checkTM === 0) {
          this.checkTM = parseInt(this.checkTM) + 1
        }
        if (this.MASTERDATA['PRANCO227'].Items[10].Value === true && this.MASTERDATA['PRANCO227'].Items[13].Value && this.checkHH === 0) {
          this.checkHH = parseInt(this.checkHH) + 1
        }
        if (this.MASTERDATA['PRANCO227'].Items[11].Value === true && this.MASTERDATA['PRANCO227'].Items[14].Value && this.checkK === 0) {
          this.checkK = parseInt(this.checkK) + 1
        }
        if (this.MASTERDATA['PRANCO226'].Items[1].Value === true) {
          this.hasClick = this.hasClick + 1
        }
        if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
          this.hasSave = this.hasSave + 1
        }
        if (this.viewOnly === true && this.MASTERDATA['PRANCO13'].Items[0].Value !== '') {
          let nameData = this.MASTERDATA['PRANCO13'].Items[0].Value
          if (nameData) {
            nameData = nameData.replace(/ *\([^)]*\) */g, '')
            this.MASTERDATA['PRANCO13'].Items[0].Value = nameData
          }
        }
        this.resetData()
        // this.handleTestRadio()
        this.handleChoose()
        this.checkStatusPatient()
        console.log('watch live')
      },
      deep: true
    }
  },
  computed: {
    checkLockFloat: function () {
      if (
        this.dataCheck === 0 && this.MASTERDATA['PRANCO226'].Items[1].Value === true
      ) { return true }
      if (
        this.dataCheck === 0 && this.MASTERDATA['PRANCO226'].Items[0].Value === true
      ) { return false }
      return this.isAccept
    },
    checkLockChange: function () {
      // if (this.checkLockFloat === true) return true
      if (
        this.dataCheck !== 0 && (this.statusUserHH === 'Đang khám' || this.statusUserTM === 'Đang khám' || this.statusUserK === 'Đang khám')
      ) { return true }
      return false
    },
    checkLockChangeRequire: function () {
      if (
        this.dataCheck !== 0 && (this.statusUserHH !== '' || this.statusUserTM !== '' || this.statusUserK !== '')
      ) { return true }
      return false
    },
    checkLockChangeTM: function () {
      if (
        this.dataCheck !== 0 && this.statusUserTM !== ''
      ) { return true }
      return false
    },
    checkLockChangeHH: function () {
      if (
        this.dataCheck !== 0 && this.statusUserHH !== ''
      ) { return true }
      return false
    },
    checkLockChangeK: function () {
      if (
        this.dataCheck !== 0 && this.statusUserK !== ''
      ) { return true }
      return false
    },
    getMDSPECIALITIESS: function () {
      // var status = ''
      // if (this.DataSubmit.Status) {
      //   status = this.DataSubmit.Status.EnName === 'Admitted' ? 'IPD' : 'ED'
      // }
      if (this.isReadOnly) {
        return this.MDSPECIALITIES.map(e => {
          // e.label = e.VisitTypeGroup + ' - ' + e.label
          return e
        })
      }
      return (this.getSpecialitiesInCurrentSite() || []).filter((e) => {
        return e.VisitTypeGroup === 'OPD'
      })
    },
    isPrimaryDoctor: function () {
      if (this.ImSuperAdmin()) return true
      var currentUser = this.$store.state.account.Username
      if (
        this.DataSubmit.PrimaryDoctor &&
        this.DataSubmit.PrimaryDoctor.Username === currentUser
      ) { return true }
      return false
    },
    bmiCalculation: function () {
      var weight = this.InitialAssessment.Weight ? parseFloat(this.InitialAssessment.Weight) : 0
      var height = this.InitialAssessment.Height ? (parseFloat(this.InitialAssessment.Height) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    },
    isReadOnly () {
      if (this.getUser() === 'tungpa1' || this.getUser() === 'haulv4') {
        return false
      }
      return this.viewOnly || this.IsLocked || this.confirmBy !== ''
      // return false
    },
    isReadOnlyStatus () {
      if (this.getUser() === 'tungpa1' || this.getUser() === 'haulv4') {
        return false
      }
      return this.viewOnly || this.IsLocked
      // return false
    }
  },
  methods: {
    handleSendInfo (type) {
      console.log(type, 'check type')
      if (type === 'TM') {
        console.log('đâfaggg')
        this.$refs.TMSend.receiveVisitId = ''
        // EventBus.$emit('sendDataTM', this.receiveVisitIdTM)
        this.$refs.TMSend.open()
        console.log(this.$refs.TMSend.receiveVisitId, 'check refffffffffff1')
        this.$nextTick(() => {
          this.$refs.TMSend.receiveVisitId = this.receiveVisitIdTM
        })
        console.log(this.receiveVisitIdTM, 'check receive id')
        console.log(this.$refs.TMSend.receiveVisitId, 'check refffffffffff2')
      }
      if (type === 'HH') {
        this.$refs.HHSend.receiveVisitId = ''
        console.log('đâfaggg')
        // EventBus.$emit('sendDataTM', this.receiveVisitIdHH)
        this.$refs.HHSend.open()
        console.log(this.$refs.HHSend.receiveVisitId, 'check refffffffffff1')
        this.$nextTick(() => {
          this.$refs.HHSend.receiveVisitId = this.receiveVisitIdHH
        })
        console.log(this.$refs.HHSend.receiveVisitIdHH, 'check refffffffffff2')
      }
      if (type === 'K') {
        this.$refs.KSend.receiveVisitId = ''
        console.log('đâfaggg')
        // EventBus.$emit('sendDataTM', this.receiveVisitIdHH)
        this.$refs.KSend.open()
        this.$refs.KSend.receiveVisitId = this.receiveVisitIdK
        console.log(this.$refs.KSend, 'check refffffffffff')
      }
    },
    testData () {
      this.checker = this.checker + 1
      if (this.MASTERDATA['PRANCO227'].Items[12].Value) {
        this.checkTM = this.checkTM + 1
      }
      if (this.MASTERDATA['PRANCO227'].Items[13].Value) {
        this.checkHH = this.checkHH + 1
      }
      if (this.MASTERDATA['PRANCO227'].Items[14].Value) {
        this.checkK = this.checkK + 1
      }
      console.log(this.checker, 'point receive')
    },
    resetDataNoExam () {
      this.$refs.TblWithMasterData.clear(true)
      this.TableSurgical = []
      this.TableObstetrical = []
    },
    closeTM () {
      this.hasPopupTM = false
      this.$modal.hide('histoyr-modalxx1')
    },
    openTM () {
      // if (this.isReadOnly) return false
      this.hasPopupTM = true
      this.$modal.show('histoyr-modalxx1')
    },
    closeHH () {
      this.hasPopupHH = false
      this.$modal.hide('histoyr-modalxx2')
    },
    openHH () {
      // if (this.isReadOnly) return false
      this.hasPopupHH = true
      this.$modal.show('histoyr-modalxx2')
    },
    closeK () {
      this.hasPopupK = false
      this.$modal.hide('histoyr-modalxx3')
    },
    openK () {
      // if (this.isReadOnly) return false
      this.hasPopupK = true
      this.$modal.show('histoyr-modalxx3')
    },
    handleAddtableTSNK () {
      const item = {
        checkValue: false,
        textValue: ''
      }
      this.tableTSNK.push(item)
    },
    removeItem (value, i) {
      this.tableTSNK = this.tableTSNK.filter((_, index) => index !== i)
    },
    copyToMDWithCode (mdCode, str) {
      this.MASTERDATA['PRANCO35'].Items.map(item => {
        if (item.DataType === 'Radio') item.Value = ''
      })
      if (!this.MASTERDATA['PRANCO35'].Items[0].Value) {
        this.MASTERDATA['PRANCO35'].Items[0].Value = 'True'
      }
      str = this.trim_(str)
      let old = ''
      old = this.MASTERDATA[mdCode].Items[0].Value ? (this.trim_(this.MASTERDATA[mdCode].Items[0].Value) + '\n') : ''
      this.MASTERDATA[mdCode].Items[0].Value = this.trim_(old + (str), ', ')
      this.toastedInfo('Đã copy')
    },
    getAllergieStatus () {
      this.MASTERDATA['PRANCO35'].Items.map(item => {
        if (item.DataType === 'Radio') item.Value = ''
      })
      if (this.InitialAssessment.HistoryOfAllergiesDGBD.KindOfAllergy) {
        this.MASTERDATA['PRANCO41'].Items[3].Value = this.InitialAssessment.HistoryOfAllergiesDGBD.KindOfAllergy
        this.reset++
      }
      if (this.InitialAssessment.HistoryOfAllergiesDGBD.IsAllergy) {
        this.MASTERDATA['PRANCO35'].Items[0].Value = 'True'
      }
      if (this.InitialAssessment.HistoryOfAllergiesDGBD.Allergy === 'Không') {
        this.MASTERDATA['PRANCO35'].Items[1].Value = 'True'
      }
      if (this.InitialAssessment.HistoryOfAllergiesDGBD.Allergy === 'Không xác định') {
        this.MASTERDATA['PRANCO35'].Items[2].Value = 'True'
      }
      if (this.InitialAssessment.HistoryOfAllergiesDGBD.IsAllergy && this.InitialAssessment.HistoryOfAllergiesDGBD.Allergy) {
        this.MASTERDATA['PRANCO383'].Items[0].Value = this.trim_(this.InitialAssessment.HistoryOfAllergiesDGBD.Allergy)
      }
    },
    checkStatusPatient () {
      // if (this.MASTERDATA['PRANCO226'].Items[1].Value === false && this.MASTERDATA['PRANCO226'].Items[0].Value === false) {
      //   this.isAccept = false
      //   console.log('join check accept 1')
      // }
      if (this.DataSubmit) {
        if (this.DataSubmit.StatusCode === 'OPDIH') {
          this.statusPatient = this.__t('Đang khám')
        } else if (this.DataSubmit.StatusCode === 'OPDWR') {
          this.statusPatient = this.__t('Chờ KQ CLS')
        } else if (this.DataSubmit.StatusCode === 'OPDDC') {
          this.statusPatient = this.__t('Hoàn thành khám')
        } else {
          this.statusPatient = this.__t('Không khám')
        }
      }
      if (this.isOnClick === true) {
        console.log('join check status patient')
        if (this.MASTERDATA['PRANCO226'].Items[0].Value === false && this.MASTERDATA['PRANCO226'].Items[1].Value === true) {
          if (this.statusUserTM !== 'Đang khám' || this.statusUserHH !== 'Đang khám' || this.statusUserK !== 'Đang khám') {
            if (this.statusUserTM !== '' && this.statusUserHH !== '' && this.statusUserK !== '') {
              // this.MASTERDATA['PRANCO321'].Items[1].Value = true
              // this.MASTERDATA['PRANCO321'].Items[0].Value = false
              // this.MASTERDATA['PRANCO321'].Items[2].Value = false
              // this.MASTERDATA['PRANCO321'].Items[3].Value = false
              // this.isOnClick = false
            } else {
              if (this.MASTERDATA['PRANCO227'].Items[9].Value === true && this.MASTERDATA['PRANCO227'].Items[10].Value === true && this.MASTERDATA['PRANCO227'].Items[11].Value === true) {
                if (this.MASTERDATA['PRANCO227'].Items[12].Value !== '' && this.MASTERDATA['PRANCO227'].Items[13].Value !== '' && this.MASTERDATA['PRANCO227'].Items[14].Value !== '') {
                  this.isAccept = true
                } else {
                  if (this.statusUserTM === 'Đang khám' || this.statusUserHH === 'Đang khám' || this.statusUserK === 'Đang khám') {
                    this.isAccept = true
                  } else {
                    this.isAccept = false
                  }
                }
              } else {
                if (this.hasClick === 1 && this.checker !== 0) {
                  console.log('anyone here ??????????')
                  this.MASTERDATA['PRANCO321'].Items[1].Value = true
                  if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
                    this.MASTERDATA['PRANCO321'].Items[0].Value = false
                  } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
                    this.MASTERDATA['PRANCO321'].Items[2].Value = false
                  } else if (this.MASTERDATA['PRANCO321'].Items[3].Value === true) {
                    this.MASTERDATA['PRANCO321'].Items[3].Value = false
                  }
                }
                // this.MASTERDATA['PRANCO321'].Items[0].Value = false
                // this.MASTERDATA['PRANCO321'].Items[2].Value = false
                // this.MASTERDATA['PRANCO321'].Items[3].Value = false
              }
            }
          }
          console.log('join here')
          if (this.DataSubmit.StatusCode !== null) {
            if (this.DataSubmit.StatusCode === 'OPDNE' && this.hasSave === 2 && this.checker !== 0) {
              console.log(this.hasSave, 'join this case 1')
              this.MASTERDATA['PRANCO321'].Items[3].Value = true
              if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
                this.MASTERDATA['PRANCO321'].Items[0].Value = false
              } else if (this.MASTERDATA['PRANCO321'].Items[1].Value === true) {
                this.MASTERDATA['PRANCO321'].Items[1].Value = false
              } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
                this.MASTERDATA['PRANCO321'].Items[2].Value = false
              }
            }
            if (this.DataSubmit.StatusCode === 'OPDIH' && this.isOnClick !== true) {
              console.log(this.hasSave, 'join this case 2')
              this.MASTERDATA['PRANCO321'].Items[0].Value = true
            } else if (this.DataSubmit.StatusCode === 'OPDIH' && this.hasSave === 2 && this.checker !== 0) {
              this.MASTERDATA['PRANCO321'].Items[0].Value = true
              if (this.MASTERDATA['PRANCO321'].Items[1].Value === true) {
                this.MASTERDATA['PRANCO321'].Items[1].Value = false
              } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
                this.MASTERDATA['PRANCO321'].Items[2].Value = false
              } else if (this.MASTERDATA['PRANCO321'].Items[3].Value === true) {
                this.MASTERDATA['PRANCO321'].Items[3].Value = false
              }
            }
            if (this.DataSubmit.StatusCode === 'OPDWR' && this.hasSave === 2 && this.checker !== 0) {
              console.log(this.hasSave, 'join this case 3')
              this.MASTERDATA['PRANCO321'].Items[1].Value = true
              if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
                this.MASTERDATA['PRANCO321'].Items[0].Value = false
              } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
                this.MASTERDATA['PRANCO321'].Items[2].Value = false
              } else if (this.MASTERDATA['PRANCO321'].Items[3].Value === true) {
                this.MASTERDATA['PRANCO321'].Items[3].Value = false
              }
            }
            if (this.DataSubmit.StatusCode === 'OPDDC' && this.hasSave === 2 && this.checker !== 0) {
              console.log(this.hasSave, 'join this case 4')
              this.MASTERDATA['PRANCO321'].Items[2].Value = true
              if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
                this.MASTERDATA['PRANCO321'].Items[0].Value = false
              } else if (this.MASTERDATA['PRANCO321'].Items[1].Value === true) {
                this.MASTERDATA['PRANCO321'].Items[1].Value = false
              } else if (this.MASTERDATA['PRANCO321'].Items[3].Value === true) {
                this.MASTERDATA['PRANCO321'].Items[3].Value = false
              }
            }
          }
          // Nothing
        } else if (this.MASTERDATA['PRANCO226'].Items[1].Value === false && this.MASTERDATA['PRANCO226'].Items[0].Value === true) {
          console.log('join here 1')
          // Nothing
        } else if (this.MASTERDATA['PRANCO226'].Items[0].Value === false && this.MASTERDATA['PRANCO226'].Items[1].Value === false) {
          this.isAccept = false
          console.log('join check accept 1')
        } else {
          console.log('case false')
          if (this.checker !== 0) {
            this.MASTERDATA['PRANCO321'].Items[1].Value = true
            this.MASTERDATA['PRANCO321'].Items[0].Value = false
            this.MASTERDATA['PRANCO321'].Items[2].Value = false
            this.MASTERDATA['PRANCO321'].Items[3].Value = false
          }
          this.isAccept = true
        }
        // this.isOnClick = false
      }
    },
    checkPopupTMHH () {
      console.log(this.MASTERDATA['PRANCO227'].Items[9].Value, this.MASTERDATA['PRANCO227'].Items[10].Value, 'check TMHH đã được tích')
      if (this.IspreSCcardiology === false && this.MASTERDATA['PRANCO227'].Items[9].Value === true && this.IspreSRespiratory === false && this.MASTERDATA['PRANCO227'].Items[10].Value === true) {
        console.log('case 1')
        this.popupTMHH()
      } else if (this.IspreSCcardiology === false && this.IspreSRespiratory === true && this.MASTERDATA['PRANCO227'].Items[9].Value === true && this.MASTERDATA['PRANCO227'].Items[10].Value === true) {
        this.popupTMHH()
        console.log('case 11')
      } else if (this.IspreSCcardiology === true && this.IspreSRespiratory === false && this.MASTERDATA['PRANCO227'].Items[9].Value === true && this.MASTERDATA['PRANCO227'].Items[10].Value === true) {
        this.popupTMHH()
        console.log('case 12')
      } else if (this.IspreSCcardiology === false && this.MASTERDATA['PRANCO227'].Items[9].Value === true && this.MASTERDATA['PRANCO227'].Items[10].Value !== true) {
        console.log('case 2')
        this.popupTMHH()
      } else if (this.IspreSRespiratory === false && this.MASTERDATA['PRANCO227'].Items[10].Value === true && this.MASTERDATA['PRANCO227'].Items[9].Value !== true) {
        this.popupTMHH()
        console.log('case 3')
      } else {
        console.log('case 4')
        this.handleSubmit()
        // Nothing
      }
    },
    checkStatus () {
      if (this.statusUserTM === 'Đang khám' || this.statusUserHH === 'Đang khám' || this.statusUserK === 'Đang khám') {
        this.isAccept = true
      } else if (this.statusUserTM === '' && this.statusUserHH === '' && this.statusUserK === '') {
        // this.isAccept = false
      } else {
        this.isAccept = false
        console.log('join check accept 2')
      }
      if (this.DataSubmit.StatusCode === 'OPDNE' && this.checker !== 0) {
        this.MASTERDATA['PRANCO321'].Items[3].Value = true
        if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
          this.MASTERDATA['PRANCO321'].Items[0].Value = false
        } else if (this.MASTERDATA['PRANCO321'].Items[1].Value === true) {
          this.MASTERDATA['PRANCO321'].Items[1].Value = false
        } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
          this.MASTERDATA['PRANCO321'].Items[2].Value = false
        }
      }
      if (this.DataSubmit.StatusCode === 'OPDIH' && this.checker !== 0) {
        this.MASTERDATA['PRANCO321'].Items[0].Value = true
        if (this.MASTERDATA['PRANCO321'].Items[1].Value === true) {
          this.MASTERDATA['PRANCO321'].Items[1].Value = false
        } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
          this.MASTERDATA['PRANCO321'].Items[2].Value = false
        } else if (this.MASTERDATA['PRANCO321'].Items[3].Value === true) {
          this.MASTERDATA['PRANCO321'].Items[3].Value = false
        }
      }
      if (this.DataSubmit.StatusCode === 'OPDWR' && this.checker !== 0) {
        this.MASTERDATA['PRANCO321'].Items[1].Value = true
        if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
          this.MASTERDATA['PRANCO321'].Items[0].Value = false
        } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
          this.MASTERDATA['PRANCO321'].Items[2].Value = false
        } else if (this.MASTERDATA['PRANCO321'].Items[3].Value === true) {
          this.MASTERDATA['PRANCO321'].Items[3].Value = false
        }
      }
      if (this.DataSubmit.StatusCode === 'OPDDC' && this.checker !== 0) {
        this.MASTERDATA['PRANCO321'].Items[2].Value = true
        if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
          this.MASTERDATA['PRANCO321'].Items[0].Value = false
        } else if (this.MASTERDATA['PRANCO321'].Items[1].Value === true) {
          this.MASTERDATA['PRANCO321'].Items[1].Value = false
        } else if (this.MASTERDATA['PRANCO321'].Items[3].Value === true) {
          this.MASTERDATA['PRANCO321'].Items[3].Value = false
        }
      }
    },
    takeInfo () {
      if (this.DataSubmit.Spec_Datas.length !== 0) {
        for (let i in this.dataRequire) {
          if (this.dataRequire[i].CodeCK === 'KCKHH') {
            if (this.$i18n.locale === 'en') {
              this.siteUserHH = this.dataRequire[i].Specialyty.EnNameSpec
              this.statusUserHH = this.dataRequire[i].Status.EnName
            } else {
              this.siteUserHH = this.dataRequire[i].Specialyty.ViNameSpec
              this.statusUserHH = this.dataRequire[i].Status.ViName
            }
            this.receiveVisitIdHH = this.dataRequire[i].ReciveVisitId
            if (this.dataRequire[i].AcceptByNurse.IsAcceptByNurse === true) {
              this.acceptByHH = this.dataRequire[i].AcceptByNurse.AcceptBy
            } else {
              this.acceptByHH = this.dataRequire[i].AcceptByPhysician.AcceptBy
            }
            this.checkUserHH = this.dataRequire[i].CodeCK
          } else if (this.dataRequire[i].CodeCK === 'KCKK') {
            if (this.$i18n.locale === 'en') {
              this.siteUserK = this.dataRequire[i].Specialyty.EnNameSpec
              this.statusUserK = this.dataRequire[i].Status.EnName
            } else {
              this.siteUserK = this.dataRequire[i].Specialyty.ViNameSpec
              this.statusUserK = this.dataRequire[i].Status.ViName
            }
            this.receiveVisitIdK = this.dataRequire[i].ReciveVisitId
            if (this.dataRequire[i].AcceptByNurse.IsAcceptByNurse === true) {
              this.acceptByK = this.dataRequire[i].AcceptByNurse.AcceptBy
            } else {
              this.acceptByK = this.dataRequire[i].AcceptByPhysician.AcceptBy
            }
            this.checkUserK = this.dataRequire[i].CodeCK
          } else {
            if (this.$i18n.locale === 'en') {
              this.siteUserTM = this.dataRequire[i].Specialyty.EnNameSpec
              this.statusUserTM = this.dataRequire[i].Status.EnName
            } else {
              this.siteUserTM = this.dataRequire[i].Specialyty.ViNameSpec
              this.statusUserTM = this.dataRequire[i].Status.ViName
            }
            this.receiveVisitIdTM = this.dataRequire[i].ReciveVisitId
            if (this.dataRequire[i].AcceptByNurse.IsAcceptByNurse === true) {
              this.acceptByTM = this.dataRequire[i].AcceptByNurse.AcceptBy
            } else {
              this.acceptByTM = this.dataRequire[i].AcceptByPhysician.AcceptBy
            }
            this.checkUserTM = this.dataRequire[i].CodeCK
          }
        }
      }
      if (this.DataSubmit.Confirm.length !== 0) {
        for (let i in this.DataSubmit.Confirm) {
          this.confirmAt = this.getFTime(this.DataSubmit.Confirm[i].ConfirmAt)
          this.confirmBy = this.DataSubmit.Confirm[i].ConfirmBy
        }
      } else {
        // Nothing
      }
    },
    handleChoose () {
      // Chọn khám chuyên khoa
      if (this.MASTERDATA['PRANCO226'].Items[1].Value === true) {
        this.isOnClick = true
        console.log('join this condition')
        this.isAccept = true
        console.log(this.MASTERDATA['PRANCO226'].Items[0].Value, 'join case 1')
        console.log('join case 1.1')
        if (this.iChoose === 0) {
          // this.MASTERDATA['PRANCO321'].Items[1].Value = true
          // this.MASTERDATA['PRANCO321'].Items[0].Value = false
          // this.MASTERDATA['PRANCO321'].Items[2].Value = false
          // this.MASTERDATA['PRANCO321'].Items[3].Value = false
          // this.isOnClick = false
          this.iChoose = this.iChoose + 1
        }
        if (this.MASTERDATA['PRANCO227'].Items[9].Value === true && this.MASTERDATA['PRANCO227'].Items[12].Value) {
          if (this.statusUserTM !== 'Đang khám' && this.statusUserTM !== '') {
            if (this.statusUserHH === 'Đang khám' || this.statusUserK === 'Đang khám') {
              console.log('join case 2')
              this.isAccept = true
              if (this.statusUserHH === 'Đang khám' && this.statusUserK !== 'Đang khám') {
                if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
                  // this.MASTERDATA['PRANCO321'].Items[0].Value = false
                  // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
                  // this.MASTERDATA['PRANCO321'].Items[2].Value = false
                  // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                }
              } else if (this.statusUserK === 'Đang khám' && this.statusUserHH !== 'Đang khám') {
                if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
                  // this.MASTERDATA['PRANCO321'].Items[0].Value = false
                  // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
                  // this.MASTERDATA['PRANCO321'].Items[2].Value = false
                  // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                }
              }
            } else {
              this.isAccept = false
              console.log('join check accept 4')
            }
          } else if (this.statusUserTM === '') {
            console.log('join case TM === rỗng')
            this.isAccept = true
            if (this.dataCheck !== 0) {
              if (this.statusUserHH === 'Đang khám' || this.statusUserK === 'Đang khám') {
                console.log('join case 3')
                // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                // this.MASTERDATA['PRANCO321'].Items[0].Value = false
                // this.MASTERDATA['PRANCO321'].Items[2].Value = false
                // this.MASTERDATA['PRANCO321'].Items[3].Value = false
              } else {
                console.log(this.isAccept, 'join case 4')
                if (this.checker === 0) {
                  // Nothing
                } else {
                  this.MASTERDATA['PRANCO321'].Items[1].Value = true
                  this.MASTERDATA['PRANCO321'].Items[0].Value = false
                  this.MASTERDATA['PRANCO321'].Items[2].Value = false
                  this.MASTERDATA['PRANCO321'].Items[3].Value = false
                }
              }
            } else if (this.isOnClick === true && this.dataCheck === 0) {
              console.log('join case 5')
              if (this.checker === 0) {
                // Nothing
              } else {
                if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
                  this.MASTERDATA['PRANCO321'].Items[0].Value = false
                  this.MASTERDATA['PRANCO321'].Items[1].Value = true
                } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
                  this.MASTERDATA['PRANCO321'].Items[2].Value = false
                  this.MASTERDATA['PRANCO321'].Items[1].Value = true
                } else if (this.MASTERDATA['PRANCO321'].Items[3].Value === true && this.checkTM === 1) {
                  console.log('check status when choose tm')
                  this.isChooseStatusTM = parseInt(this.isChooseStatusTM) + 1
                  this.MASTERDATA['PRANCO321'].Items[3].Value = false
                  this.MASTERDATA['PRANCO321'].Items[1].Value = true
                }
              }
              // this.MASTERDATA['PRANCO321'].Items[1].Value = true
              // this.MASTERDATA['PRANCO321'].Items[0].Value = false
              // this.MASTERDATA['PRANCO321'].Items[2].Value = false
              // this.MASTERDATA['PRANCO321'].Items[3].Value = false
              // this.isOnClick = false
            }
          }
        }
        if (this.MASTERDATA['PRANCO227'].Items[10].Value === true && this.MASTERDATA['PRANCO227'].Items[13].Value) {
          if (this.statusUserHH !== 'Đang khám' && this.statusUserHH !== '') {
            if (this.statusUserTM === 'Đang khám' || this.statusUserK === 'Đang khám') {
              this.isAccept = true
              if (this.statusUserTM === 'Đang khám' && this.statusUserK !== 'Đang khám') {
                if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
                  // this.MASTERDATA['PRANCO321'].Items[0].Value = false
                  // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
                  // this.MASTERDATA['PRANCO321'].Items[2].Value = false
                  // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                }
              } else if (this.statusUserK === 'Đang khám' && this.statusUserTM !== 'Đang khám') {
                if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
                  // this.MASTERDATA['PRANCO321'].Items[0].Value = false
                  // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
                  // this.MASTERDATA['PRANCO321'].Items[2].Value = false
                  // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                }
              }
            } else {
              var checkData = this.MASTERDATA['PRANCO227'].Items[12].Value
              if (this.MASTERDATA['PRANCO227'].Items[9].Value === true && checkData.length !== 0 && this.statusUserTM === '') {
                // Nothing
                if (this.checker !== 0) {
                  this.MASTERDATA['PRANCO321'].Items[1].Value = true
                  this.MASTERDATA['PRANCO321'].Items[0].Value = false
                  this.MASTERDATA['PRANCO321'].Items[2].Value = false
                  this.MASTERDATA['PRANCO321'].Items[3].Value = false
                }
                this.isAccept = true
              } else {
                this.isAccept = false
              }
              // this.isAccept = false
              console.log('join check accept 5')
            }
          } else if (this.statusUserHH === '') {
            this.isAccept = true
            if (this.dataCheck !== 0) {
              if (this.statusUserTM === 'Đang khám' || this.statusUserK === 'Đang khám') {
                console.log('join case 6')
                // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                // this.MASTERDATA['PRANCO321'].Items[0].Value = false
                // this.MASTERDATA['PRANCO321'].Items[2].Value = false
                // this.MASTERDATA['PRANCO321'].Items[3].Value = false
              } else {
                if (this.checker === 0) {
                  // Nothing
                } else {
                  console.log('join case 7')
                  this.MASTERDATA['PRANCO321'].Items[1].Value = true
                  this.MASTERDATA['PRANCO321'].Items[0].Value = false
                  this.MASTERDATA['PRANCO321'].Items[2].Value = false
                  this.MASTERDATA['PRANCO321'].Items[3].Value = false
                }
              }
            } else if (this.isOnClick === true && this.dataCheck === 0) {
              console.log('join case 8')
              if (this.checker === 0) {
                // Nothing
              } else {
                console.log('join case 8.1')
                if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
                  console.log('join case 811')
                  this.MASTERDATA['PRANCO321'].Items[0].Value = false
                  this.MASTERDATA['PRANCO321'].Items[1].Value = true
                } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
                  console.log('join case 822')
                  this.MASTERDATA['PRANCO321'].Items[2].Value = false
                  this.MASTERDATA['PRANCO321'].Items[1].Value = true
                } else if (this.MASTERDATA['PRANCO321'].Items[3].Value === true && this.checkHH === 1) {
                  console.log('join case 833')
                  this.MASTERDATA['PRANCO321'].Items[3].Value = false
                  this.MASTERDATA['PRANCO321'].Items[1].Value = true
                  this.isChooseStatusHH = parseInt(this.isChooseStatusHH) + 1
                }
              }
              // this.MASTERDATA['PRANCO321'].Items[1].Value = true
              // this.MASTERDATA['PRANCO321'].Items[0].Value = false
              // this.MASTERDATA['PRANCO321'].Items[2].Value = false
              // this.MASTERDATA['PRANCO321'].Items[3].Value = false
              // this.isOnClick = false
            }
          }
        }
        if (this.MASTERDATA['PRANCO227'].Items[11].Value === true && this.MASTERDATA['PRANCO227'].Items[14].Value) {
          if (this.statusUserK !== 'Đang khám' && this.statusUserK !== '') {
            if (this.statusUserTM === 'Đang khám' || this.statusUserHH === 'Đang khám') {
              this.isAccept = true
              if (this.statusUserHH === 'Đang khám' && this.statusUserTM !== 'Đang khám') {
                if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
                  // this.MASTERDATA['PRANCO321'].Items[0].Value = false
                  // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
                  // this.MASTERDATA['PRANCO321'].Items[2].Value = false
                  // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                }
              } else if (this.statusUserTM === 'Đang khám' && this.statusUserHH !== 'Đang khám') {
                if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
                  // this.MASTERDATA['PRANCO321'].Items[0].Value = false
                  // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
                  // this.MASTERDATA['PRANCO321'].Items[2].Value = false
                  // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                }
              }
            } else {
              this.isAccept = false
              console.log('join check accept 6')
            }
          } else if (this.statusUserK === '') {
            this.isAccept = true
            if (this.dataCheck !== 0) {
              if (this.statusUserTM === 'Đang khám' || this.statusUserHH === 'Đang khám') {
                console.log('join case 9')
                // this.MASTERDATA['PRANCO321'].Items[1].Value = true
                // this.MASTERDATA['PRANCO321'].Items[0].Value = false
                // this.MASTERDATA['PRANCO321'].Items[2].Value = false
                // this.MASTERDATA['PRANCO321'].Items[3].Value = false
              } else {
                if (this.checker === 0) {
                  // Nothing
                } else {
                  console.log('join case 10')
                  this.MASTERDATA['PRANCO321'].Items[1].Value = true
                  this.MASTERDATA['PRANCO321'].Items[0].Value = false
                  this.MASTERDATA['PRANCO321'].Items[2].Value = false
                  this.MASTERDATA['PRANCO321'].Items[3].Value = false
                }
              }
            } else if (this.isOnClick === true && this.dataCheck === 0) {
              if (this.checker === 0) {
                // Nothing
              } else {
                if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
                  this.MASTERDATA['PRANCO321'].Items[0].Value = false
                  this.MASTERDATA['PRANCO321'].Items[1].Value = true
                } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
                  this.MASTERDATA['PRANCO321'].Items[2].Value = false
                  this.MASTERDATA['PRANCO321'].Items[1].Value = true
                } else if (this.MASTERDATA['PRANCO321'].Items[3].Value === true && this.checkK === 1) {
                  this.MASTERDATA['PRANCO321'].Items[3].Value = false
                  this.MASTERDATA['PRANCO321'].Items[1].Value = true
                  this.isChooseStatusK = parseInt(this.isChooseStatusK) + 1
                }
              }
              console.log('join case 11')
              // this.MASTERDATA['PRANCO321'].Items[1].Value = true
              // this.MASTERDATA['PRANCO321'].Items[0].Value = false
              // this.MASTERDATA['PRANCO321'].Items[2].Value = false
              // this.MASTERDATA['PRANCO321'].Items[3].Value = false
              // this.isOnClick = false
            }
          }
        } else {
          // Nothing
        }
      } else if (this.MASTERDATA['PRANCO226'].Items[0].Value === true) {
        this.iChoose = 0
        this.isOnClick = true
        console.log('join')
        this.isAccept = true
      } else {
        this.iChoose = 0
        this.isAccept = false
        console.log('join check accept 3')
      }
      // if (this.MASTERDATA['PRANCO231'].Items[0].Value === true) {
      //   console.log('join here eeeeeeeeeeeeeeeeeeeeeee')
      // }
      // End chọn khám chuyên khoa
    },
    resetData () {
      if (this.MASTERDATA['PRANCO227'].Items[9].Value === false) {
        this.MASTERDATA['PRANCO227'].Items[12].Value = ''
      }
      if (this.MASTERDATA['PRANCO227'].Items[10].Value === false) {
        this.MASTERDATA['PRANCO227'].Items[13].Value = ''
      }
      if (this.MASTERDATA['PRANCO227'].Items[11].Value === false) {
        this.MASTERDATA['PRANCO227'].Items[14].Value = ''
      }
      if (this.MASTERDATA['PRANCO226'].Items[0].Value === false && this.MASTERDATA['PRANCO226'].Items[1].Value === false) {
        this.resetMdData('PRANCO227')
      }
      if (this.MASTERDATA['PRANCO226'].Items[0].Value === true) {
        this.resetMdData('PRANCO227')
      }
    },
    resetCheck () {
      // if (this.MASTERDATA['PRANCO321'].Items[3].Value === true) {
      //   this.MASTERDATA['PRANCO227'].Items[12].Value = ''
      //   this.MASTERDATA['PRANCO227'].Items[13].Value = ''
      //   this.MASTERDATA['PRANCO227'].Items[14].Value = ''
      // }
      // Reset khám chuyên khoa
      if (this.MASTERDATA['PRANCO227'].Items[9].Value === false) {
        this.MASTERDATA['PRANCO227'].Items[12].Value = ''
      }
      if (this.MASTERDATA['PRANCO227'].Items[10].Value === false) {
        console.log('delete data')
        this.MASTERDATA['PRANCO227'].Items[13].Value = ''
      }
      if (this.MASTERDATA['PRANCO227'].Items[11].Value === false) {
        console.log('join this condition')
        this.MASTERDATA['PRANCO227'].Items[14].Value = ''
      }
      if (this.MASTERDATA['PRANCO226'].Items[0].Value === false && this.MASTERDATA['PRANCO226'].Items[1].Value === false) {
        this.resetMdData('PRANCO227')
      }
      if (this.MASTERDATA['PRANCO226'].Items[0].Value === true) {
        this.resetMdData('PRANCO227')
      }
      // End reset khám chuyên khoa
      if (this.MASTERDATA['PRANCO236'].Items[1].Value === false) {
        this.MASTERDATA['PRANCO236'].Items[2].Value = ''
      }
      if (this.MASTERDATA['PRANCO239'].Items[1].Value === false) {
        this.MASTERDATA['PRANCO239'].Items[0].Value = ''
      }
      if (this.MASTERDATA['PRANCO334'].Items[0].Value === false) {
        this.MASTERDATA['PRANCO334'].Items[1].Value = ''
      }
      if (this.MASTERDATA['PRANCO278'].Items[7].Value === false) {
        this.MASTERDATA['PRANCO278'].Items[10].Value = ''
      }
      if (this.MASTERDATA['PRANCO289'].Items[5].Value === false) {
        this.MASTERDATA['PRANCO289'].Items[8].Value = ''
      }
      if (this.MASTERDATA['PRANCO298'].Items[4].Value === false) {
        this.MASTERDATA['PRANCO298'].Items[6].Value = ''
      }
      if (this.MASTERDATA['PRANCO347'].Items[6].Value === false) {
        this.MASTERDATA['PRANCO347'].Items[8].Value = ''
      }
      if (this.MASTERDATA['PRANCO269'].Items[6].Value === false) {
        this.MASTERDATA['PRANCO269'].Items[8].Value = ''
      }
      if (this.MASTERDATA['PRANCO255'].Items[0].Value === false) {
        this.resetMdData('PRANCO347')
      }
      if (this.MASTERDATA['PRANCO255'].Items[2].Value === false) {
        this.resetMdData('PRANCO269')
      }
      if (this.MASTERDATA['PRANCO160'].Items[0].Value === false) {
        this.resetMdData('PRANCO162')
      }
      if (this.MASTERDATA['PRANCO160'].Items[1].Value === false) {
        this.resetMdData('PRANCO166')
      }
      if (this.MASTERDATA['PRANCO160'].Items[2].Value === false) {
        this.resetMdData('PRANCO170')
      }
      if (this.MASTERDATA['PRANCO160'].Items[3].Value === false) {
        this.resetMdData('PRANCO173')
      }
      if (this.MASTERDATA['PRANCO160'].Items[4].Value === false) {
        this.resetMdData('PRANCO176')
      }
      if (this.MASTERDATA['PRANCO160'].Items[5].Value === false) {
        this.resetMdData('PRANCO179')
        this.resetMdData('PRANCO182')
      }
      if (this.MASTERDATA['PRANCO160'].Items[6].Value === false) {
        this.resetMdData('PRANCO186')
      }
      if (this.MASTERDATA['PRANCO160'].Items[7].Value === false) {
        this.resetMdData('PRANCO191')
      }
      if (this.MASTERDATA['PRANCO160'].Items[8].Value === false) {
        this.resetMdData('PRANCO195')
      }
      // Reset Tien su di ung
      if (!this.MASTERDATA['PRANCO35'].Items[0].Value) {
        this.MASTERDATA['PRANCO41'].Items[3].Value = ''
        this.MASTERDATA['PRANCO383'].Items[0].Value = ''
      }
      // Reset tiền sử nội khoa
      if (this.MASTERDATA['PRANCO67'].Items[1].Value === false) {
        this.resetMdData('PRANCO70')
        this.tableTSNK = []
      }
      // Reset tiền sử ngoại khoa
      if (this.MASTERDATA['PRANCO87'].Items[1].Value === false) {
        this.TableSurgical = []
        // Nothing
      }
      if (this.MASTERDATA['PRANCO111'].Items[1].Value === false) {
        this.TableObstetrical = []
      }
    },
    ConfirmKyNhay (data) {
      new PreAnesthesiaConsultation1({}).update('/' + this._VisitId, data).then(res => {
        if (!this.isReadOnly) {
          this.handleSubmit('confirm')
        }
        this.scroll2Bottom()
        this.toastedSuccess(this.$t('Xác nhận thành công'))
      }).catch((e) => {
      })
    },
    // emit kind
    popupSave (data) {
      data.kind = 'Anesthesiologist'
      this.ConfirmKyNhay(data)
    },
    // Gọi popup confirm
    showDoctorConfirm (title) {
      this.popupTitle = title
      this.$modal.show('doctorConfirm')
    },
    getTimeLog (val1, val2) {
      this.timeLog = [val1, val2]
    },
    setHiddenLog () {
      this.hiddenLog = true
    },
    validateForm () {
      console.log('go to here')
      let errors = []
      // Validate khám chuyên khoa
      var planOfCare3 = [
        this.MASTERDATA['PRANCO227'].Items[9].Value,
        this.MASTERDATA['PRANCO227'].Items[10].Value,
        this.MASTERDATA['PRANCO227'].Items[11].Value
      ]
      if (planOfCare3.filter(e => e).length < 1 && this.MASTERDATA['PRANCO226'].Items[1].Value === true) {
        errors.push(this.MASTERDATA['PRANCO227'])
      }
      console.log(this.MASTERDATA['PRANCO227'], 'still alive')
      if (this.MASTERDATA['PRANCO227'].Items[9].Value === true && !this.MASTERDATA['PRANCO227'].Items[12].Value) {
        console.log('still alive1')
        errors.push(this.MASTERDATA['PRANCO227'].Items[12])
      }
      if (this.MASTERDATA['PRANCO227'].Items[10].Value === true && !this.MASTERDATA['PRANCO227'].Items[13].Value) {
        errors.push(this.MASTERDATA['PRANCO227'].Items[13])
      }
      if (this.MASTERDATA['PRANCO227'].Items[11].Value === true && !this.MASTERDATA['PRANCO227'].Items[14].Value) {
        errors.push(this.MASTERDATA['PRANCO227'].Items[14])
      }
      var planOfCare = [
        this.MASTERDATA['PRANCO347'].Items[0].Value,
        this.MASTERDATA['PRANCO347'].Items[1].Value,
        this.MASTERDATA['PRANCO347'].Items[2].Value,
        this.MASTERDATA['PRANCO347'].Items[3].Value,
        this.MASTERDATA['PRANCO347'].Items[4].Value,
        this.MASTERDATA['PRANCO347'].Items[5].Value,
        this.MASTERDATA['PRANCO347'].Items[6].Value
      ]
      if (planOfCare.filter(e => e).length < 1 && this.MASTERDATA['PRANCO255'].Items[0].Value === true) {
        errors.push(this.MASTERDATA['PRANCO347'])
      }
      var planOfCare2 = [
        this.MASTERDATA['PRANCO269'].Items[0].Value,
        this.MASTERDATA['PRANCO269'].Items[1].Value,
        this.MASTERDATA['PRANCO269'].Items[2].Value,
        this.MASTERDATA['PRANCO269'].Items[3].Value,
        this.MASTERDATA['PRANCO269'].Items[4].Value,
        this.MASTERDATA['PRANCO269'].Items[5].Value,
        this.MASTERDATA['PRANCO269'].Items[6].Value
      ]
      if (planOfCare2.filter(e => e).length < 1 && this.MASTERDATA['PRANCO255'].Items[2].Value === true) {
        errors.push(this.MASTERDATA['PRANCO269'])
      }
      if (this.MASTERDATA['PRANCO289'].Items[5].Value === true && !this.MASTERDATA['PRANCO289'].Items[8].Value) {
        errors.push(this.MASTERDATA['PRANCO289'].Items[8])
      }
      if (this.MASTERDATA['PRANCO298'].Items[4].Value === true && !this.MASTERDATA['PRANCO298'].Items[6].Value) {
        errors.push(this.MASTERDATA['PRANCO298'].Items[6])
      }
      if (this.MASTERDATA['PRANCO236'].Items[1].Value === true && !this.MASTERDATA['PRANCO236'].Items[2].Value) {
        errors.push(this.MASTERDATA['PRANCO236'].Items[2])
      }
      if (this.MASTERDATA['PRANCO334'].Items[0].Value === true && !this.MASTERDATA['PRANCO334'].Items[1].Value) {
        errors.push(this.MASTERDATA['PRANCO334'].Items[1])
      }
      if (this.MASTERDATA['PRANCO312'].Items[1].Value === true && !this.MASTERDATA['PRANCO312'].Items[3].Value) {
        errors.push(this.MASTERDATA['PRANCO312'].Items[3])
      }
      if (this.MASTERDATA['PRANCO308'].Items[1].Value === true && !this.MASTERDATA['PRANCO308'].Items[3].Value) {
        errors.push(this.MASTERDATA['PRANCO308'].Items[3])
      }
      if (this.MASTERDATA['PRANCO239'].Items[1].Value === true && !this.MASTERDATA['PRANCO239'].Items[0].Value) {
        errors.push(this.MASTERDATA['PRANCO239'].Items[0])
      }
      if (this.MASTERDATA['PRANCO147'].Items[0].Value === true && !this.MASTERDATA['PRANCO147'].Items[1].Value) {
        errors.push(this.MASTERDATA['PRANCO147'].Items[1])
      }
      if (this.MASTERDATA['PRANCO54'].Items[3].Value === true && !this.MASTERDATA['PRANCO54'].Items[5].Value) {
        errors.push(this.MASTERDATA['PRANCO54'].Items[5])
      }
      if (this.MASTERDATA['PRANCO60'].Items[3].Value === true && !this.MASTERDATA['PRANCO60'].Items[4].Value) {
        errors.push(this.MASTERDATA['PRANCO60'].Items[4])
      }
      if (this.getValueOfMASTERDATA2('PRANCO278', 'PRANCO286')) {
        if (!this.getValueOfMASTERDATA2('PRANCO278', 'PRANCO378')) {
          const obj = {
            ViName: 'Kế hoạch vô cảm chi tiết',
            EnName: 'Detailed Anesthesia Plan',
            Code: 'PRANCO378'
          }
          errors.push(obj)
        }
      }
      if (this.getValueOfMASTERDATA2('PRANCO347', 'PRANCO354')) {
        if (!this.getValueOfMASTERDATA2('PRANCO347', 'PRANCO377')) {
          const obj = {
            ViName: 'Phương án A',
            EnName: 'Plan A',
            Code: 'PRANCO377'
          }
          errors.push(obj)
        }
      }
      if (this.getValueOfMASTERDATA2('PRANCO269', 'PRANCO276')) {
        if (!this.getValueOfMASTERDATA2('PRANCO269', 'PRANCO376')) {
          const obj = {
            ViName: 'Phương án B',
            EnName: 'Plan B',
            Code: 'PRANCO376'
          }
          errors.push(obj)
        }
      }
      if (errors.length) {
        this.handlerResponse({Error: errors})
      }
    },
    onChangeStatus () {
      this.$emit('onChange', this.MASTERDATA['PRANCO321'])
    },
    handleUpdateExamRequired () {
      var params = {
        IsSpecialistExamination: true,
        Datas: this.DataSpeciality
      }
      new PreAnesthesiaConsultation({}).update('/' + 'UpdateExamRequire' + '/' + this._VisitId, params).then(res => {
        this.reload()
      })
    },
    getSpecialities () {
      var fromStorage = storage.get('MDSPECIALITIES')
      if (!fromStorage) {
        new Specialities({noLoading: true})
          .all()
          .then(response => {
            response.forEach(element => {
              element.value = element.Id
              element.label = element.ViName
              element.code = element.Id
            })
            this.MDSPECIALITIES = response
            storage.set('MDSPECIALITIES', JSON.stringify(response))
          }).catch(e => {
          })
      } else {
        this.MDSPECIALITIES = fromStorage
      }
    },
    getCustomer () {
      new CustomerOPD({noLoading: true, readonlyview: this.readonlyview}).find(this._VisitId).then(response => {
        this.DataCustomer = response.Gender
      })
    },
    autoLoadPRANCO158 (loading) {
      if (this.MASTERDATA && this.MASTERDATA['PRANCO158']) {
        this.MASTERDATA['PRANCO158'].Items[0].Value = null
        new OutpatientExaminationNote({ hidemsg: true, noLoading: !loading })
          .create({ Id: this.$route.params.Id }, 'SyncPrincipalTest')
          .then((response) => {
            this.syncOPDOENPT0At = new Date()
            var val = response
            if (val) {
              this.MASTERDATA['PRANCO158'].Items[0].Value =
                JSON.stringify(response)
            }
            // this.OPDOENPT0Timeout = setTimeout(() => {
            //   this.autoLoadOPDOENPT0()
            // }, 30 * 1000)
          })
          .catch((e) => {
            console.log(e)
            // data[0].Value = ''
          })
      }
    },
    onChange () {
      this.$emit('onChange', this.TableDrug)
    },
    create (type) {
      new PreAnesthesiaConsultation({consultation: type ? 'true' : 'false'}).update('/SetConsultation' + '/' + this._VisitId).then(response => {
        this.createForm = true
        this.reload()
      }).catch(e => {
        // Nothing
      })
    },
    getData () {
      this.loaded = false
      new PreAnesthesiaConsultation({}).find(this._VisitId).then(response => {
        this.IsLocked = response.IsLock24h
        this.nullContent = false
        this.DataSubmit = response
        console.log(this.checker, 'aloha')
        this.IspreSCcardiology = response.IspreSCcardiology
        this.IspreSRespiratory = response.IspreSRespiratory
        if (this.DataSubmit.ExaminationTime === null) {
          this.DataSubmit.ExaminationTime = moment(this.DataSubmit.CreatedAt).format('HH:mm DD/MM/YYYY')
        } else {
          this.DataSubmit.ExaminationTime = this.DataSubmit.ExaminationTime
        }
        // if (this.createForm === true) {
        //   this.MASTERDATA['PRANCO321'].Items[0].Value = true
        // }
        // if (this.noExam === true) {
        //   this.MASTERDATA['PRANCO321'].Items[3].Value = true
        // }
        this.dataCheck = response.Spec_Datas.length
        this.dataRequire = response.Spec_Datas
        this.timeLog = [moment(response.UpdatedAt).format('HH:mm DD/MM/YYYY'), response.UpdatedBy]
        this.$store.dispatch('setCurrentFormId', response.Id)
        for (let i = 0; i < response.Datas.length; i++) {
          if (response.Datas[i].Value === 'True' && response.Datas[i].Code === 'PRANCO322') {
            this.MASTERDATA['PRANCO321'].Items[0].Value = true
          }
          if (response.Datas[i].Value === 'True' && response.Datas[i].Code === 'PRANCO323') {
            this.MASTERDATA['PRANCO321'].Items[1].Value = true
          }
          if (response.Datas[i].Value === 'True' && response.Datas[i].Code === 'PRANCO324') {
            this.MASTERDATA['PRANCO321'].Items[2].Value = true
          }
          if (response.Datas[i].Value === 'True' && response.Datas[i].Code === 'PRANCO325') {
            this.MASTERDATA['PRANCO321'].Items[3].Value = true
          }
          if (response.Datas[i].Value && response.Datas[i].Code === 'PRANCO86') {
            this.tableTSNK = JSON.parse(response.Datas[i].Value)
          }
        }
        console.log('down here 11111')
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'Checkbox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else if (exited.Value && item.Code === 'PRANCO14') {
                  // item.Value = this.JSONParse(exited.Value, true).map(e => {
                  //   if (typeof e === 'string') return this.getUsernameFromString(e)
                  //   return e
                  // })
                  if (exited.Value !== '') {
                    item.Value = (this.JSONParse(exited.Value, true))
                  }
                } else if (exited.Value && item.Code === 'PRANCO4') {
                  if (exited.Value !== '') {
                    item.Value = (this.JSONParse(exited.Value, true))
                  }
                } else if (exited.Value && item.Code === 'PRANCO346') {
                  if (exited.Value !== '') {
                    item.Value = (this.JSONParse(exited.Value, true))
                  }
                } else if (exited.Value && item.Code === 'PRANCO91') {
                  this.TableSurgical = this.JSONParse(exited.Value, true)
                } else if (exited.Value && item.Code === 'PRANCO93') {
                  this.TableSurgical = this.JSONParse(exited.Value, true)
                } else if (exited.Value && item.Code === 'PRANCO118') {
                  this.TableObstetrical = this.JSONParse(exited.Value, true)
                } else if (exited.Value && ['PRANCO134', 'PRANCO136', 'PRANCO138', 'PRANCO140', 'PRANCO142', 'PRANCO143', 'PRANCO145'].includes(item.Code)) {
                  this.TableDrug = this.JSONParse(exited.Value, true)
                } else {
                  item.Value = exited.Value
                }
                // if (this.MASTERDATA['PRANCO226'].Items[1].Value === true) {
                //   this.isAccept = true
                // } else {
                //   this.isAccept = false
                // }
                // if (this.MASTERDATA['PRANCO321'].Items[3].Value === true) {
                //   this.isAccept = false
                //   this.MASTERDATA['PRANCO227'].Items[12].Value = ''
                //   this.MASTERDATA['PRANCO227'].Items[13].Value = ''
                //   this.MASTERDATA['PRANCO227'].Items[14].Value = ''
                //   this.MASTERDATA['PRANCO227'].Items[9].Value = false
                //   this.MASTERDATA['PRANCO227'].Items[10].Value = false
                //   this.MASTERDATA['PRANCO227'].Items[11].Value = false
                //   this.MASTERDATA['PRANCO226'].Items[0].Value = true
                //   this.MASTERDATA['PRANCO226'].Items[1].Value = false
                // }
              } else {
                // Nothing
              }
              this.dataMaster = JSON.stringify(this.MASTERDATA)
            })
          }
        }
        if (this.DataSubmit.StatusCode !== null) {
          if (this.DataSubmit.StatusCode === 'OPDNE') {
            console.log(this.hasSave, 'join this case 1')
            this.MASTERDATA['PRANCO321'].Items[3].Value = true
            if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[0].Value = false
            } else if (this.MASTERDATA['PRANCO321'].Items[1].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[1].Value = false
            } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[2].Value = false
            }
          }
          if (this.DataSubmit.StatusCode === 'OPDIH' && this.isOnClick !== true) {
            console.log(this.hasSave, 'join this case 2')
            this.MASTERDATA['PRANCO321'].Items[0].Value = true
            if (this.MASTERDATA['PRANCO321'].Items[1].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[1].Value = false
            } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[2].Value = false
            } else if (this.MASTERDATA['PRANCO321'].Items[3].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[3].Value = false
            }
          } else if (this.DataSubmit.StatusCode === 'OPDIH') {
            this.MASTERDATA['PRANCO321'].Items[0].Value = true
            if (this.MASTERDATA['PRANCO321'].Items[1].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[1].Value = false
            } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[2].Value = false
            } else if (this.MASTERDATA['PRANCO321'].Items[3].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[3].Value = false
            }
          }
          if (this.DataSubmit.StatusCode === 'OPDWR') {
            console.log(this.hasSave, 'join this case 3')
            this.MASTERDATA['PRANCO321'].Items[1].Value = true
            if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[0].Value = false
            } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[2].Value = false
            } else if (this.MASTERDATA['PRANCO321'].Items[3].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[3].Value = false
            }
          }
          if (this.DataSubmit.StatusCode === 'OPDDC') {
            console.log(this.hasSave, 'join this case 4')
            this.MASTERDATA['PRANCO321'].Items[2].Value = true
            if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[0].Value = false
            } else if (this.MASTERDATA['PRANCO321'].Items[1].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[1].Value = false
            } else if (this.MASTERDATA['PRANCO321'].Items[3].Value === true) {
              this.MASTERDATA['PRANCO321'].Items[3].Value = false
            }
          }
        }
        console.log('down here 22222')
        this.autoLoadPRANCO158()
        this.getCustomer()
        this.takeInfo()
        this.checkStatus()
        console.log('down here 3333')
        setTimeout(() => {
          this.loaded = true
          this.createForm = false
          this.noExam = false
        }, 500)
      }).catch(e => {
        console.log(e)
        this.loaded = true
      })
    },
    save () {
      this.resetCheck()
      this.validateForm()
      if (this.IspreSRespiratory === true && this.IspreSCcardiology === true) {
        this.handleSubmit()
      } else {
        this.checkPopupTMHH()
      }
    },
    handleSubmit () {
      this.MASTERDATA['PRANCO70'].Items[15].Value = JSON.stringify(this.tableTSNK)
      var obj = {}
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            // this.DataSpeciality = []
            if (item.Code === 'PRANCO370') {
              const a = {
                Code: 'KCKTM',
                SpecialytyId: item.Value || ''
              }
              this.DataSpeciality.push(a)
            }
            if (item.Code === 'PRANCO371') {
              const a = {
                Code: 'KCKHH',
                SpecialytyId: item.Value || ''
              }
              this.DataSpeciality.push(a)
            }
            if (item.Code === 'PRANCO372') {
              const a = {
                Code: 'KCKK',
                SpecialytyId: item.Value || ''
              }
              this.DataSpeciality.push(a)
            }
            if (item.Code === 'PRANCO2') {
              item.Value = this.moment2String(item.Value) || ''
            }
            if (item.Code === 'PRANCO14') {
              if (item.Value !== '') {
                item.Value = JSON.stringify(item.Value)
              }
            }
            if (item.Code === 'PRANCO91' || item.Code === 'PRANCO93') {
              var stringTableSurgical = JSON.stringify(this.TableSurgical)
              item.Value = stringTableSurgical
            }
            if (item.Code === 'PRANCO118') {
              var stringTableObstetrical = JSON.stringify(this.TableObstetrical)
              item.Value = stringTableObstetrical
            }
            if (item.Code === 'PRANCO134' || item.Code === 'PRANCO136' || item.Code === 'PRANCO138' || item.Code === 'PRANCO140' || item.Code === 'PRANCO145') {
              var stringTableMedicine = JSON.stringify(this.TableDrug)
              item.Value = stringTableMedicine
            }
            if (item.Code === 'PRANCO4') {
              item.Value = JSON.stringify(item.Value)
            }
            if (item.Code === 'PRANCO346') {
              item.Value = JSON.stringify(item.Value)
            }
            if (this.MASTERDATA['PRANCO321'].Items[0].Value === true) {
              this.DataSubmit.Status = 'OPDIH'
            } else if (this.MASTERDATA['PRANCO321'].Items[1].Value === true) {
              this.DataSubmit.Status = 'OPDWR'
            } else if (this.MASTERDATA['PRANCO321'].Items[2].Value === true) {
              this.DataSubmit.Status = 'OPDDC'
            } else {
              this.DataSubmit.Status = 'OPDNE'
            }
            this.DataSubmit.RequestExam = ''
            this.DataSubmit.ExaminationTime = this.moment2String(this.DataSubmit.ExaminationTime)
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      new PreAnesthesiaConsultation({}).update('/' + 'Update' + '/' + this._VisitId + '/' + this.DataSubmit.Id, this.DataSubmit).then(response => {
        this.handleUpdateExamRequired()
        this.$refs.TblWithMasterData.submit(true)
        // this.reload()
        this.toastedSuccess()
      }).catch(e => {
        if (e.data.IsErorr) {
          this.popUpWarning(e.data.ViMessage)
          this.$refs.TblWithMasterData.submit(true)
        }
        // this.getData()
        // Nothing
      })
      // if (this.MASTERDATA['PRANCO226'].Items[1].Value === true) {
      //   console.log('join 1')
      //   this.DataExamination.Datas = []
      //   console.log('join 2')
      //   for (const property in this.MASTERDATA) {
      //     console.log('join 3')
      //     if (this.MASTERDATA[property].Items && property === 'PRANCO227') {
      //       this.MASTERDATA[property].Items.forEach(item => {
      //         console.log(item, 'check item ')
      //         this.DataExamination.IsSpecialistExamination = true
      //         this.DataExamination.Datas.push({
      //           Code: item.Code,
      //           Value: item.Value,
      //           Group: property
      //         })
      //         obj[item.Code] = item.Value
      //       })
      //     }
      //   }
      //   new PreAnesthesiaConsultation({}).update('/' + 'UpdateExamRequire' + '/' + this._VisitId, this.DataExamination).then(res => {
      //     console.log(res, 'checkkkkkkkkkkk coooooooooo viet')
      //   })
      // }
    },
    getUsernameFromString (str) {
      if (!str) return ''
      console.log(str)
      var nstri = str.substring(
        str.indexOf('(') + 1,
        str.indexOf(')')
      )
      return nstri || str
    },
    handleAddTableObstetrical () {
      var newTableObstetrical = {
        obstetricalHistory: '',
        year: '',
        tableCheckbox1: [
          {
            Tetuysong: false,
            Gaytengoaimangcung: false,
            Khac: false
          }
        ],
        tableCheckbox2: [
          {
            Nhiemtrung: false,
            Chaymau: false,
            Soc: false,
            Daudausaugayte: false,
            Dausaumo: false,
            Khac: false
          }
        ],
        obstetricHistory: [
          {
            Clinic: '',
            Code: 'Obstetric1' + Math.floor((Math.random() * 1000000000) + 1),
            Data: '',
            DataType: 'Radio',
            DefaultValue: null,
            EnName: 'Sinh thường',
            Group: 'Obstetric',
            Id: '',
            IsReadOnly: false,
            Items: [],
            Level: 2,
            Note: '',
            Order: 1,
            Value: '',
            ViName: 'Sinh thường'
          },
          {
            Clinic: '',
            Code: 'Obstetric2' + Math.floor((Math.random() * 1000000000) + 1),
            Data: '',
            DataType: 'Radio',
            DefaultValue: null,
            EnName: 'Sinh mổ',
            Group: 'Obstetric',
            Id: '',
            IsReadOnly: false,
            Items: [],
            Level: 2,
            Note: '',
            Order: 2,
            Value: '',
            ViName: 'Sinh mổ'
          }
        ],
        khac: '',
        khacBienChung: ''
      }
      this.TableObstetrical.push(newTableObstetrical)
    },
    handleDeleteTableObstetrical (index) {
      this.TableObstetrical.splice(index, 1)
    },
    handleAddTableSurgical () {
      var newTableSurgical = {
        surgicalHistory: '',
        year: '',
        tableCheckbox1: [
          {
            Gaytetaicho: false,
            Anthan: false,
            Gaymetoanthan: false,
            Gaytetuysong: false,
            Gaytengoaimangcung: false,
            Gaytevung: false,
            Khac: false
          }
        ],
        tableCheckbox2: [
          {
            Nhiemtrung: false,
            Chaymau: false,
            Soc: false,
            Daudausaugayte: false,
            Dausaumo: false,
            Khac: false
          }
        ],
        khac: '',
        khacBienChung: '',
        ahihi: Math.floor((Math.random() * 100) + 1)
      }
      this.TableSurgical.push(newTableSurgical)
    },
    handleDeleteTableSurgical (index) {
      this.TableSurgical.splice(index, 1)
    },
    handleAddTableDrug () {
      var newTableDrug = {
        drugName: '',
        dose: '',
        route: '',
        lastDayUsed: '',
        replacedBy: '',
        needToStop: [
          {
            Clinic: '',
            Code: 'Drug1' + Math.floor((Math.random() * 1000000000) + 1),
            Data: '',
            DataType: 'Radio',
            DefaultValue: null,
            EnName: 'Yes',
            Group: 'Drug',
            Id: '',
            IsReadOnly: false,
            Items: [],
            Level: 2,
            Note: '',
            Order: 1,
            Value: '',
            ViName: 'Có'
          },
          {
            Clinic: '',
            Code: 'Drug2' + Math.floor((Math.random() * 1000000000) + 1),
            Data: '',
            DataType: 'Radio',
            DefaultValue: null,
            EnName: 'No',
            Group: 'Drug',
            Id: '',
            IsReadOnly: false,
            Items: [],
            Level: 2,
            Note: '',
            Order: 2,
            Value: '',
            ViName: 'Không'
          }
        ]
      }
      this.TableDrug.push(newTableDrug)
    },
    handleDeleteTableDrug (index) {
      this.TableDrug.splice(index, 1)
    },
    getInfo () {
      this.loaded = false
      new PreAnesthesiaConsultation({}).find('Info' + '/' + this._VisitId).then(response => {
        this.InitialAssessment = response.VitalSigns
        // if (response.VitalSigns.IsApplication === 'False') {
        //   this.IsApplication = 'Không áp dụng'
        // } else if (response.VitalSigns.IsApplication === '') {
        //   this.IsApplication = 'N/A'
        // }
        this.SyncHistoryOfAllergies = response.HistoryOfAllergies
        // if (this.SyncHistoryOfAllergies.length === 0) {
        //   this.toastedInfo('Không có thông tin khai thác dị ứng')
        // }
      }).catch(e => {
        // Nothing
      })
    },
    icdChange (value, code) {
      var val = (value || []).map(e => e.ViName)
      switch (code) {
        case 'PRANCO4':
          var currentValuePRANCO4 = this.MASTERDATA['PRANCO3'].Items[1].Value || ''
          this.MASTERDATA['PRANCO3'].Items[1].Value = ([currentValuePRANCO4].concat(val.filter(e => !currentValuePRANCO4.includes(e)))).filter(e => e).join(', ')
          // break
      }
    },
    createPopup (type) {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới Phiếu khám gây mê'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create(type)
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
    handleBack () {
      this.edited = false
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    popupTMHH () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Lưu ý!'),
        text: this.__t('Vui lòng hoàn thiện Phiếu yêu cầu chuyên khoa hô hấp/ tim mạch tiền phẫu!'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.handleSubmit()
              // this.back()
            }
          }
        ]
      })
    },
    noExaminationConfirm () {
      this.$modal.show('dialog', {
        title: this.__t(
          'Bạn có chắc chắn đây là bệnh nhân không sử dụng dịch vụ khám bệnh.'
        ),
        text: this.__t('Chú ý: Mọi thông tin nhập trên form sẽ bị xóa'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi đồng ý'),
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
              this.resetMdDataValue()
              this.resetDataNoExam()
              this.noExam = true
              this.handleSubmit()
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
    handleCopy (str) {
      this.toastedInfo('Đã copy')
      if (this.MASTERDATA['PRANCO366']) {
        if (this.MASTERDATA['PRANCO366'].Items[0].Value) {
          this.MASTERDATA['PRANCO366'].Items[0].Value += '\n'
          this.MASTERDATA['PRANCO366'].Items[0].Value += str
        } else {
          this.MASTERDATA['PRANCO366'].Items[0].Value = str
        }
      }
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
                name: 'CustomerOPDInfo',
                params: {Id: this.$route.params.Id, Check: this.checkMessage}
              })
            }
          },
          {
            title: this.__t('Quay lại'),
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
.readonlyTest {
  pointer-events: none;
  opacity: 0.7
}
.readonlyStatus {
  pointer-events: none;
}
.v-checkbox input[type=checkbox] + label:before {
  width: 25px;
  height: 25px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkbox-rounded {
  .v-checkbox input[type=checkbox] + label:before {
    border-radius: 50%;
  }
}
.pointer-none {
  pointer-events: none;
}
.disable-text {
  color: #b1b1b1;
  .v-checkbox input[type=checkbox] + label:before {
    border-color: #b1b1b1
  }
}
.isReadOnly {
  .value-checkbox {
    margin-bottom: 5px;
  }
  .displaytbl {
    span {
      transform: translateY(-3px);
    }
  }
}
.error {
  border: 1px solid red!important;
}
</style>
