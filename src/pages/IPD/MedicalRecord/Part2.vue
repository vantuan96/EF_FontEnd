<template>
  <div class="main-content">
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <div class="box box-table">
            <div class="box-body">
              <template v-if="routeType === 'Eye'">
                <Eye2 ref="Eye2" :routeType="routeType" :activeWithStatus="activeWithStatus" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :syncInfo="syncInfo" :SyncPastMedicalHistory="SyncPastMedicalHistory" :VisitId="_VisitId"/>
              </template>
              <template v-else>
                <div id="MedicalRecord-part2-block1">
                  <label class="block-title" v-if="MASTERDATA['IPDMRPTLDVV']">I. {{__label(MASTERDATA['IPDMRPTLDVV'])}}:</label>
                  <div class="ml-10">
                    <md-input-text :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTLDVV']" v-model="MASTERDATA['IPDMRPTLDVV']" :hidelabel="true"/>
                    <!-- <p v-if="routeType === 'Pediatric' && DataSubmit.TranferInfo && DataSubmit.TranferInfo.SpecialtyName && DataSubmit.TranferInfo.ResonForTransfer">Lý do chuyển nội trú từ khoa {{DataSubmit.TranferInfo.SpecialtyName}}: {{DataSubmit.TranferInfo.ResonForTransfer}} <BtnCopy :value="null" @copy="handleCopy2"/></p> -->
                    <template v-if="!syncInfo && DataSubmit.TranferInfo && DataSubmit.IsNew">
                      <div class="row">
                        <div class="col-md-12"><p class="note-text text-right"><label class="label label-warning"><i aria-hidden="true" class="fa fa-check v-green"></i> {{__t('Thông tin được đồng bộ từ khoa')}}: {{DataSubmit.TranferInfo.SpecialtyName}}</label></p></div>
                      </div>
                    </template>
                    <div class="flex-box flex-center" v-if="MASTERDATA['IPDMRPTVANT'] && routeType !== 'Neonatal' && routeType !== 'Gynecological' && routeType !== 'Oncology'">
                      <label>{{__t2('Vào ngày thứ-mdc')}}:</label>
                      <MDText style="width: 130px;" class="mrl5" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTVANT']" rows="1" v-model="MASTERDATA['IPDMRPTVANT'].Items[0].Value"/> <span class="ml-5">{{__t2('của bệnh')}}</span>
                      <!-- <number-input :min="0" :max="10000" inline v-model="MASTERDATA['IPDMRPTVANT'].Items[0].Value" :placeholder="__t('Nhập')" class="ml-5"/> <span class="ml-5">{{__t2('của bệnh')}}</span> -->
                    </div>
                    <!-- <MdMiniInputText
                      v-if="MASTERDATA['IPDMRPTVANT']"
                      :label="`${this.___t('Vào ngày thứ')}:`"
                      v-model="MASTERDATA['IPDMRPTVANT'].Items[0].Value"
                      :placeholder="__t('Nhập')"
                      widthLabel="99px"
                      widthInput="250px"
                    /> -->
                    <hr/>
                  </div>
                </div>
                <div id="MedicalRecord-part2-block2">
                  <label class="block-title">II. {{__t2('Hỏi bệnh')}}: <span v-if="routeType === 'Neonatal'" class="fw100">({{__t2('diễn biến bệnh của sơ sinh')}})</span></label>
                  <Neonatal :box1="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" v-if="routeType === 'Neonatal'"/>
                  <Obstetrics2 v-if="routeType === 'Obstetrics'"
                    :MASTERDATA="MASTERDATA"
                    :DataSubmit="DataSubmit"
                    :SyncPastMedicalHistory="SyncPastMedicalHistory"
                    :SyncFamilyMedicalHistory="SyncFamilyMedicalHistory"
                    ref="Obstetrics2box1"
                    :box1="true"/>
                  <template v-if="routeType !== 'Obstetrics'">
                    <div class="bg-gray-2 mt-10" v-if="routeType === 'Neonatal'">
                      <label>
                        {{__t('Thuốc đang dùng (Bao gồm cả thuốc kê đơn và không kê đơn)')}}:
                      </label>
                      <list-of-current-medications
                        ref="ListOfCurrentMedications"
                        :Type="'IPD-PatientMedicationList'"
                        :VisitTypeGroupCode="'IPD'"
                      />
                    </div>
                    <div class="ml-10" v-if="routeType !== 'Neonatal'">
                      <label v-if="routeType === 'Gynecological'">{{__t2('1. Quá trình bệnh lý-mdcGy')}}:</label>
                      <label v-else-if="MASTERDATA['IPDMRPTQTBL']">{{__t2(MASTERDATA['IPDMRPTQTBL'].ViName)}}:</label>
                      <div class="bg-gray-2">
                        <md-input-text :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTQTBL']" v-model="MASTERDATA['IPDMRPTQTBL']"  :hidelabel="true"/>
                        <div class="HistoryOfPresentIllness"  v-if="SyncHistoryOfPresentIllness && SyncHistoryOfPresentIllness.length">
                          <label> {{__t('Thông tin khai thác bệnh sử')}}:</label>
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
                                    <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyToMDWithCode('IPDMRPTQTBL', HistoryOfPresent.HistoryOfPresentIllness)">Copy</button></td>
                                  </tr>
                                </tbody>
                              </table>
                            </template>
                          </vue-scrolling-table>
                        </div>
                      </div>
                      <br/>
                      <label v-if="routeType === 'Gynecological'">{{__t2('2. Tiền sử bệnh-mdcGy')}}:</label>
                      <label v-else-if="MASTERDATA['IPDMRPTTISB']">{{__t2(MASTERDATA['IPDMRPTTISB'].ViName)}}:</label>
                      <div class="bg-gray-2" v-if="routeType === 'Pediatric' || routeType === 'Gynecological'">
                        <label>+ {{__t2('Dị ứng')}}:</label>
                        <md-input-text :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPT01']" v-model="MASTERDATA['IPDMRPT01']"/>
                        <span style="display: block" v-if="DataSubmit.Allergy">{{__t('Thông tin dị ứng đã được điều dưỡng khai thác')}}: {{DataSubmit.Allergy || ''}} <BtnCopy :value="null" @copy="handleCopy"/></span>
                      </div>
                      <div class="bg-gray-2 mt-10">
                        <label v-if="routeType === 'Gynecological'">{{__t2('+ Bản thân-mdcGy')}}:</label>
                        <label v-else>{{__t2(MASTERDATA['IPDMRPTBATH'].ViName)}}:</label>
                        <template v-if="routeType === 'CardiovascularForm'">
                          <BMTIMMACH2 ref="BMTIMMACH2box1" :box1="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit"/>
                        </template>
                        <template v-else>
                          <md-input-text :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTBATH']" v-model="MASTERDATA['IPDMRPTBATH']"/>
                        </template>
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
                                    <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyToMDWithCode('IPDMRPTBATH', item.Value)">Copy</button></td>
                                  </tr>
                                </tbody>
                              </table>
                            </template>
                          </vue-scrolling-table>
                        </div>
                        <label class="mt-10" v-if="routeType === 'A01_034_050919_V'">{{__t2('Đặc điểm liên quan bệnh')}} ({{__t2('Điền v nếu áp dụng')}}):</label>
                        <label class="mt-10" v-else-if="routeType !== 'Pediatric' && routeType !== 'Gynecological' && MASTERDATA['IPDMRPTDDLQ']">{{__t2('Đặc điểm liên quan bệnh')}} ({{__t2('Điền v nếu áp dụng')}}):</label>
                        <table class="table table-bordered table-bordered-x" v-if="routeType !== 'Pediatric' && routeType !== 'Gynecological' && MASTERDATA['IPDMRPTDDLQ']">
                          <tr>
                            <th width="1px">{{__t2('TT')}}</th>
                            <th width="100p">{{__t2('Ký hiệu')}}</th>
                            <th>{{__t2('Thời gian (tính theo tháng)')}}</th>
                            <th width="1px">{{__t2('TT')}}</th>
                            <th width="100px">{{__t2('Ký hiệu')}}</th>
                            <th>{{__t2('Thời gian (tính theo tháng)')}}</th>
                          </tr>
                          <tr>
                            <td>01</td>
                            <td v-if="MASTERDATA['IPDMRPTALLE']">{{__t2(MASTERDATA['IPDMRPTALLE'].ViName)}}</td>
                            <td>
                              <div class="flex-box flex-center">
                                <span class="v-checkbox" align="center">
                                  <input type="checkbox" :id="'IPDMRPTALLE'" :name="'IPDMRPTALLE'" v-model="MASTERDATA['IPDMRPTALLE'].Items[0].Value">
                                  <label @click="checkbox2Radio(MASTERDATA['IPDMRPTALLE'].Items, MASTERDATA['IPDMRPTALLE'].Items[0])" :for="'IPDMRPTALLE'"></label>
                                </span>
                                <input :readonly="!MASTERDATA['IPDMRPTALLE'].Items[0].Value" class="form-control" v-model="MASTERDATA['IPDMRPTALLE'].Items[1].Value" />
                              </div>
                            </td>
                            <td>04</td>
                            <td v-if="MASTERDATA['IPDMRPTTHLA']">{{__t2(MASTERDATA['IPDMRPTTHLA'].ViName)}}</td>
                            <td>
                              <div class="flex-box flex-center">
                                <span class="v-checkbox" align="center">
                                  <input type="checkbox" :id="'IPDMRPTTHLA'" :name="'IPDMRPTTHLA'" v-model="MASTERDATA['IPDMRPTTHLA'].Items[0].Value">
                                  <label @click="checkbox2Radio(MASTERDATA['IPDMRPTTHLA'].Items, MASTERDATA['IPDMRPTTHLA'].Items[0])" :for="'IPDMRPTTHLA'"></label>
                                </span>
                                <input :readonly="!MASTERDATA['IPDMRPTTHLA'].Items[0].Value" class="form-control" v-model="MASTERDATA['IPDMRPTTHLA'].Items[1].Value" />
                              </div>
                            </td>
                          </tr>
                          <tr v-if="MASTERDATA['IPDMRPTMATU']">
                            <td>02</td>
                            <td>{{__t2(MASTERDATA['IPDMRPTMATU'].ViName)}}</td>
                            <td>
                              <div class="flex-box flex-center">
                                <span class="v-checkbox" align="center">
                                  <input type="checkbox" :id="'IPDMRPTMATU'" :name="'IPDMRPTMATU'" v-model="MASTERDATA['IPDMRPTMATU'].Items[0].Value">
                                  <label @click="checkbox2Radio(MASTERDATA['IPDMRPTMATU'].Items, MASTERDATA['IPDMRPTMATU'].Items[0])" :for="'IPDMRPTMATU'"></label>
                                </span>
                                <input :readonly="!MASTERDATA['IPDMRPTMATU'].Items[0].Value" class="form-control" v-model="MASTERDATA['IPDMRPTMATU'].Items[1].Value" />
                              </div>
                            </td>
                            <td>05</td>
                            <td v-if="MASTERDATA['IPDMRPTTHLO']">{{__t2(MASTERDATA['IPDMRPTTHLO'].ViName)}}</td>
                            <td>
                              <div class="flex-box flex-center">
                                <span class="v-checkbox" align="center">
                                  <input type="checkbox" :id="'IPDMRPTTHLO'" :name="'IPDMRPTTHLO'" v-model="MASTERDATA['IPDMRPTTHLO'].Items[0].Value">
                                  <label @click="checkbox2Radio(MASTERDATA['IPDMRPTTHLO'].Items, MASTERDATA['IPDMRPTTHLO'].Items[0])" :for="'IPDMRPTTHLO'"></label>
                                </span>
                                <input :readonly="!MASTERDATA['IPDMRPTTHLO'].Items[0].Value" class="form-control" v-model="MASTERDATA['IPDMRPTTHLO'].Items[1].Value" />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>03</td>
                            <td v-if="MASTERDATA['IPDMRPTRUBI']">{{__t2(MASTERDATA['IPDMRPTRUBI'].ViName)}}</td>
                            <td>
                              <div class="flex-box flex-center">
                                <span class="v-checkbox" align="center">
                                  <input type="checkbox" :id="'IPDMRPTRUBI'" :name="'IPDMRPTRUBI'" v-model="MASTERDATA['IPDMRPTRUBI'].Items[0].Value">
                                  <label @click="checkbox2Radio(MASTERDATA['IPDMRPTRUBI'].Items, MASTERDATA['IPDMRPTRUBI'].Items[0])" :for="'IPDMRPTRUBI'"></label>
                                </span>
                                <input :readonly="!MASTERDATA['IPDMRPTRUBI'].Items[0].Value" class="form-control" v-model="MASTERDATA['IPDMRPTRUBI'].Items[1].Value" />
                              </div>
                            </td>
                            <td>06</td>
                            <td v-if="MASTERDATA['IPDMRPTKHAC']">{{__t2(MASTERDATA['IPDMRPTKHAC'].ViName)}}</td>
                            <td v-if="MASTERDATA['IPDMRPTKHAC']">
                              <div class="flex-box flex-center">
                                <span class="v-checkbox" align="center">
                                  <input type="checkbox" :id="'IPDMRPTKHAC'" :name="'IPDMRPTKHAC'" v-model="MASTERDATA['IPDMRPTKHAC'].Items[0].Value">
                                  <label @click="checkbox2Radio(MASTERDATA['IPDMRPTKHAC'].Items, MASTERDATA['IPDMRPTKHAC'].Items[0])" :for="'IPDMRPTKHAC'"></label>
                                </span>
                                <input :readonly="!MASTERDATA['IPDMRPTKHAC'].Items[0].Value" class="form-control" v-model="MASTERDATA['IPDMRPTKHAC'].Items[1].Value" />
                              </div>
                            </td>
                          </tr>
                        </table>
                        <hr/>
                      </div>
                      <div class="bg-gray-2 mt-10">
                        <label v-if="routeType === 'Gynecological'">{{__t2('+ Gia đình-mdcGy')}}:</label>
                        <label v-else-if="MASTERDATA['IPDMRPTGIDI']">{{__t2(MASTERDATA['IPDMRPTGIDI'].ViName)}}:</label>
                        <md-input-text :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTGIDI']" v-model="MASTERDATA['IPDMRPTGIDI']"/>
                        <div class="HistoryOfPresentIllness"  v-if="SyncFamilyMedicalHistory && SyncFamilyMedicalHistory.length">
                          <label>{{__t('Thông tin khai thác tiền sử bệnh của người thân')}}:</label>
                          <vue-scrolling-table v-if="SyncFamilyMedicalHistory.length">
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
                                  <tr :data="item" :key="index"  v-for="(item, index) in SyncFamilyMedicalHistory">
                                    <template v-if="item.PastMedicalHistory">
                                      <td class="no-wrap">{{item.ExaminationTime | formatDateWithoutSecon }}</td>
                                      <!-- <td class="no-wrap"><ad-Info :ad="item.PrimaryDoctor" :type="item.Type" /></td>
                                      <td class="no-wrap">{{__label(item.Clinic)}}</td>
                                      <td><p v-if="item.Value">{{item.Value}}</p></td>
                                      <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyToMDWithCode('IPDMRPTGIDI', item.Value)">Copy</button></td> -->
                                      <td class="no-wrap"><ad-Info :ad="item.DoctorExam" :type="item.Type" /></td>
                                      <td class="no-wrap">{{ $i18n.locale === 'en' ? item.SpecialtyEn : item.SpecialtyVi}}</td>
                                      <td><p v-if="item.PastMedicalHistory">{{item.PastMedicalHistory}}</p></td>
                                      <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyToMDWithCode('IPDMRPTGIDI', item.PastMedicalHistory)">Copy</button></td>
                                    </template>
                                  </tr>
                                </tbody>
                              </table>
                            </template>
                          </vue-scrolling-table>
                        </div>
                      </div>
                      <div class="bg-gray-2 mt-10">
                        <label>
                          {{__t2('Thuốc đang dùng-mdc')}} ({{__t2('Bao gồm cả thuốc kê đơn và không kê đơn')}}):
                        </label>
                        <list-of-current-medications
                          ref="ListOfCurrentMedications"
                          :Type="'IPD-PatientMedicationList'"
                          :VisitTypeGroupCode="'IPD'"
                          :Gynecological="true"
                          :formId="DataSubmit.Id"
                          :t2="true"
                        />
                      </div>
                      <label class="mt-10" v-if="routeType === 'Pediatric'">{{__label(MASTERDATA['IPDMRPT05'])}}</label>
                      <!-- GrowthProcess -->
                      <div class="table table-bordered table-bordered-x" v-if="routeType === 'Pediatric' && DataSubmit.GrowthProcess && DataSubmit.GrowthProcess.length">
                        <table style="width: 100%">
                          <thead>
                            <tr>
                              <th class="text-center" width="120px">{{__t('Lượt khám')}}</th>
                              <th class="text-center" width="120px">{{__t('BS chính')}}</th>
                              <th class="text-center">{{__t('Thông tin quá trình sinh trưởng')}}</th>
                              <th class="text-center" width="80px">{{__t('Sao chép')}}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in DataSubmit.GrowthProcess" :key="index">
                                <td class="text-center">
                                  <template>
                                    <div>
                                      <div>{{item.VisitCode}}</div>
                                      <div>{{item.VisitDate}}</div>
                                    </div>
                                  </template>
                                </td>
                                <td class="text-center"><AdInfo v-if="item.DoctorUsername" :ad="item.DoctorUsername" /></td>
                                <td>
                                  <template v-if="item.Data && item.Data.length">
                                    <div v-for="(e, dex) in item.Data" :key="dex">
                                      <div v-if="!e.GroupCode">
                                        <span v-if="e">* {{__label(e)}}: </span>
                                        <span v-if="e.Value"> {{e.Value}}</span>
                                      </div>
                                    </div>
                                  </template>
                                </td>
                                <td class="text-center"><BtnCopy :hideCopy="true" :value="null" @copy="handleCopyTable(item.Data)" /></td>
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="bg-gray-2 mt-10" v-if="routeType === 'Pediatric'">
                        <div class="flex align-center">
                          <div class="form-gro2up mrr20">
                            <div class="flex-box flex-center">
                              <div class="mrr5" style="min-width: 83px;">{{__label(MASTERDATA['IPDMRPT06'])}}:</div>
                              <VNumberInput style="width: 148px;" class="mrr5" v-if="MASTERDATA['IPDMRPT06']" v-model="MASTERDATA['IPDMRPT06'].Items[0].Value" :placeholder="__t('Nhập')"/>
                              <div>{{__t('child')}}</div>
                            </div>
                          </div>
                          <div class="mrr10 white-space">{{__label(MASTERDATA['IPDMRPT08'])}}</div>
                          <div>
                            <VNumberInput v-if="MASTERDATA['IPDMRPT09']" class="input-para inline mrr10" v-model="MASTERDATA['IPDMRPT09'].Items[0].Value" :placeholder="__t('Nhập')"/>
                            <div class="inline mrr5 white-space">{{__label(MASTERDATA['IPDMRPT09'])}}</div>
                            <br/><br/>
                            <VNumberInput v-if="MASTERDATA['IPDMRPT11']" class="input-para inline mrr10" v-model="MASTERDATA['IPDMRPT11'].Items[0].Value" :placeholder="__t('Nhập')"/>
                            <div class="inline mrr5 white-space">{{__label(MASTERDATA['IPDMRPT11'])}}</div>
                            <br/><br/>
                            <VNumberInput v-if="MASTERDATA['IPDMRPT13']" class="input-para inline mrr10" v-model="MASTERDATA['IPDMRPT13'].Items[0].Value" :placeholder="__t('Nhập')"/>
                            <div class="inline mrr5 white-space">{{__label(MASTERDATA['IPDMRPT13'])}}</div>
                            <br/><br/>
                            <VNumberInput v-if="MASTERDATA['IPDMRPT15']" class="input-para inline mrr10" v-model="MASTERDATA['IPDMRPT15'].Items[0].Value" :placeholder="__t('Nhập')"/>
                            <div class="inline">{{__label(MASTERDATA['IPDMRPT15'])}}</div>
                          </div>
                        </div>
                      </div>
                      <div class="bg-gray-2 mt-10" v-if="routeType === 'Pediatric'">
                        <div>
                          <div>{{__label(MASTERDATA['IPDMRPT17'])}}</div>
                          <MdRadiosInput2 :fullWidth="true" :value="MASTERDATA['IPDMRPT17']" :noneDex="6"/>
                        </div>
                        <div>
                          <textarea-autosize
                          v-if="MASTERDATA['IPDMRPT17'] && MASTERDATA['IPDMRPT17'].Items[5].Value"
                          class="form-control mrt10"
                          rows="3"
                          :placeholder="__t('Nhập')"
                          v-model="MASTERDATA['IPDMRPT17'].Items[6].Value"/>
                        </div>
                      </div>
                      <div class="row mt-10" v-if="routeType === 'Pediatric'">
                        <div class="col-md-3">
                          <div class="form-gro2up">
                            <div class="flex-box flex-center">
                              <div class="mrr10">{{__label(MASTERDATA['IPDMRPT25'])}}</div>
                              <div class="input-group mrr10" style="flex-grow: 1; width: 50px;">
                                <input :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPT25']" class="form-control" v-model="MASTERDATA['IPDMRPT25'].Items[0].Value" />
                                <!-- <VNumberInput :decimal="true" v-if="MASTERDATA['IPDMRPT25']" v-model="MASTERDATA['IPDMRPT25'].Items[0].Value" :placeholder="__t('Nhập')"/> -->
                              </div>
                              <span> kg</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-8">
                          <div class="form-gro2up">
                            <div class="flex-box flex-center">
                              <div class="mrr10">{{__label(MASTERDATA['IPDMRPT27'])}}</div>
                              <MdRadiosInput2 :value="MASTERDATA['IPDMRPT27']" :noneDex="2" />
                              <div class="input-group" style="flex-grow: 1">
                                <input v-if="MASTERDATA['IPDMRPT27'].Items[0].Value" v-model="MASTERDATA['IPDMRPT27'].Items[2].Value" class="form-control" :placeholder="__t('Nhập')" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <md-input-text :blandLabel="true" v-if="routeType === 'Pediatric' && MASTERDATA['IPDMRPT31']" v-model="MASTERDATA['IPDMRPT31']" :placeholder="__t('Nhập')"/>
                      <md-input-text :blandLabel="true" v-if="routeType === 'Pediatric' && MASTERDATA['IPDMRPT33']" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT33']"/>
                      <md-input-text :blandLabel="true" v-if="routeType === 'Pediatric' && MASTERDATA['IPDMRPT35']" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT35']"/>
                      <div class="row flex align-center mt-10" v-if="routeType === 'Pediatric'">
                        <div class="col-md-6 flex align-center">
                          <div class="mrr10">{{__label(MASTERDATA['IPDMRPT37'])}}:</div>
                          <MdRadiosInput2 :value="MASTERDATA['IPDMRPT37']" />
                        </div>
                        <div class="col-md-5 flex align-center">
                          <div class="mrr10">{{__label(MASTERDATA['IPDMRPT41'])}}</div>
                          <VNumberInput class="mrr5" style="width: 100px!important;" v-if="MASTERDATA['IPDMRPT41']" v-model="MASTERDATA['IPDMRPT41'].Items[0].Value" :placeholder="__t('Nhập')"/>
                          <div>{{__t('months old')}}</div>
                        </div>
                      </div>
                      <div class="row flex align-center mt-10" v-if="routeType === 'Pediatric'">
                        <div class="col-md-12 flex align-center">
                          <div class="mrr10">{{__label(MASTERDATA['IPDMRPT43'])}}:</div>
                          <MdRadiosInput2 :value="MASTERDATA['IPDMRPT43']" />
                        </div>
                      </div>
                      <div class="flex align-center mt-10" v-if="routeType === 'Pediatric'">
                        <div class="mrr10" style="width: 120px;">{{__label(MASTERDATA['IPDMRPT46'])}}:</div>
                        <MdRadiosInput :fullWidth="true" :value="MASTERDATA['IPDMRPT46']" :noneDex="7" />
                      </div>
                      <div class="mrt10" v-if="routeType === 'Pediatric' && MASTERDATA['IPDMRPT46'].Items[6].Value">{{__label(MASTERDATA['IPDMRPT46'].Items[7])}}</div>
                      <textarea-autosize
                          v-if="routeType === 'Pediatric' && MASTERDATA['IPDMRPT46'] && MASTERDATA['IPDMRPT46'].Items[6].Value"
                          class="form-control"
                          rows="3"
                          :placeholder="__t('Nhập')"
                          v-model="MASTERDATA['IPDMRPT46'].Items[7].Value"/>
                      <Gynecological2
                        class="mrt10"
                        v-if="routeType === 'Gynecological'"
                        ref="Gynecological2Box1"
                        :box1="true"
                        :MASTERDATA="MASTERDATA"
                        :DataSubmit="DataSubmit"/>
                      <hr/>
                    </div>
                    <div class="mrt10" v-if="routeType === 'Neonatal'">
                      <label class="block" v-if="MASTERDATA['IPDMRPT93']">{{__label(MASTERDATA['IPDMRPT93'])}} <span class="fw100">({{__t('Điền v nếu áp dụng')}}):</span></label>
                      <NeonatalTable
                      class="mrb10"
                      v-if="MASTERDATA['IPDMRPT93']"
                      :master="MASTERDATA['IPDMRPT93']"
                      :data="[MASTERDATA['IPDMRPT93'].Items[0],
                      MASTERDATA['IPDMRPT93'].Items[3],
                      MASTERDATA['IPDMRPT93'].Items[1],
                      MASTERDATA['IPDMRPT93'].Items[4],
                      MASTERDATA['IPDMRPT93'].Items[2],
                      MASTERDATA['IPDMRPT93'].Items[5],
                      MASTERDATA['IPDMRPT93'].Items[6]]"/>
                    </div>
                  </template>
                </div>
                <div id="MedicalRecord-part2-block6" class="mrb10" v-if="(routeType === 'A01_034_050919_V' && DataSubmit.Version >= 2 || routeType === 'CardiovascularForm') && MASTERDATA['IPDMRPT1680']">
                  <label class="block-title">III. {{__label(MASTERDATA['IPDMRPT1680'])}}:</label>
                  <div>{{__t2('Lưu ý: Đối với bệnh nhân can thiệp tim mạch, bác sĩ can thiệp cần hoàn thiện')}} "{{__t2('Bảng kiểm đánh giá nguy cơ trước thủ thuật đối với bệnh nhân can thiệp tim mạch')}}" ({{__t2('Phụ lục 1')}})</div>
                  <div class="ml-10">
                    <MdRadiosInput4 :disabled="DataSubmit.IsCreatedPreProcedureRiskAssessment" class="mrb10" :value="MASTERDATA['IPDMRPT1680']"/>
                  </div>
                </div>
                <div id="MedicalRecord-part2-block3">
                  <label class="block-title" v-if="checkVer2()">IV. {{__t2('Khám bệnh')}}:</label>
                  <label class="block-title" v-else>III. {{__t2('Khám bệnh')}}:</label>
                  <Neonatal :box2="true" :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA" v-if="routeType === 'Neonatal'"/>
                  <Oncology2 v-if="routeType === 'Oncology'" :box1="true" :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA"/>
                  <div class="ml-10" v-if="routeType !== 'Neonatal' && routeType !== 'Obstetrics' && routeType !== 'Oncology'">
                    <label v-if="MASTERDATA['IPDMRPTTTYT']">{{__t2(MASTERDATA['IPDMRPTTTYT'].ViName)}}:</label>
                    <div class="bg-gray-2">
                      <div class="mb-5">
                        <span class="mr-10" v-if="MASTERDATA['IPDMRPTMACH']"><b>{{__t2(MASTERDATA['IPDMRPTMACH'].ViName)}}:</b> {{MASTERDATA['IPDMRPTMACH'].Items[0].Value || 'N/A'}} {{__t2('lần/phút-mdc')}}</span>
                        <span class="mr-10" v-if="MASTERDATA['IPDMRPTNHDO']"><b>{{__t2(MASTERDATA['IPDMRPTNHDO'].ViName)}}:</b> {{MASTERDATA['IPDMRPTNHDO'].Items[0].Value || 'N/A'}} {{__t2(MASTERDATA['IPDMRPTNHDO'].Note)}}</span>
                        <span class="mr-10" v-if="MASTERDATA['IPDMRPTHUAP']"><b>{{__t2(MASTERDATA['IPDMRPTHUAP'].ViName)}}:</b> {{MASTERDATA['IPDMRPTHUAP'].Items[0].Value || 'N/A'}} {{__t2(MASTERDATA['IPDMRPTHUAP'].Note)}}</span>
                        <span class="mr-10" v-if="MASTERDATA['IPDMRPTNHTH']"><b>{{__t2(MASTERDATA['IPDMRPTNHTH'].ViName)}}:</b> {{MASTERDATA['IPDMRPTNHTH'].Items[0].Value || 'N/A'}} {{__t2(MASTERDATA['IPDMRPTNHTH'].Note)}}</span>
                        <span class="mr-10" v-if="MASTERDATA['IPDMRPTCICA']"><b>{{__t2(MASTERDATA['IPDMRPTCICA'].ViName)}}:</b> {{MASTERDATA['IPDMRPTCICA'].Items[0].Value || 'N/A'}} {{__t2(MASTERDATA['IPDMRPTCICA'].Note)}}</span>
                        <span class="mr-10" v-if="MASTERDATA['IPDMRPTCANA']"><b>{{__t2(MASTERDATA['IPDMRPTCANA'].ViName)}}:</b> {{MASTERDATA['IPDMRPTCANA'].Items[0].Value || 'N/A'}} {{__t2(MASTERDATA['IPDMRPTCANA'].Note)}}</span>
                        <span class="mr-10" v-if="MASTERDATA['IPDMRPTBBMI']"><b>{{__t2(MASTERDATA['IPDMRPTBBMI'].ViName)}}:</b> {{MASTERDATA['IPDMRPTBBMI'].Items[0].Value || 'N/A'}} {{__t2(MASTERDATA['IPDMRPTBBMI'].Note)}}</span>
                        <BtnCopy :hideCopy="true" :value="null" @copy="handleCopy3"/>
                      </div>
                      <md-input-text :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTTTYT']" v-model="MASTERDATA['IPDMRPTTTYT']" :hidelabel="true" :getFirstRow="true"/>
                      <Gynecological2
                        v-if="routeType === 'Gynecological'"
                        ref="Gynecological2Box2"
                        :box2="true"
                        :MASTERDATA="MASTERDATA"
                        :DataSubmit="DataSubmit"/>
                    </div>
                    <div v-if="routeType === 'A01_039_050919_V' && MASTERDATA['IPDMRPT10000']" class="mt-10">
                      <label>2. {{__label(MASTERDATA['IPDMRPT10000'])}}:</label>
                      <div class="bg-gray-2">
                        <md-input-text :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT10000']" :hidelabel="true"/>
                        <label>{{__label(MASTERDATA['IPDMRPT10002'])}}:</label>
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA"
                          :DataSubmit="DataSubmit"
                          :index="[0, 1]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA"
                          :DataSubmit="DataSubmit"
                          :index="[2, 3]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA"
                          :DataSubmit="DataSubmit"
                          :index="[4, 5]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA"
                          :DataSubmit="DataSubmit"
                          :index="[6, 7]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA"
                          :DataSubmit="DataSubmit"
                          :index="[8, 9]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA"
                          :DataSubmit="DataSubmit"
                          :index="[10, 11]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA"
                          :DataSubmit="DataSubmit"
                          :index="[12, 13]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA"
                          :DataSubmit="DataSubmit"
                          :index="[14, 15]"
                        />
                      </div>
                    </div>
                    <div v-if="routeType === 'A01_040_050919_V' && MASTERDATA['IPDMRPT10023']" class="mt-10">
                      <label>2. {{__label(MASTERDATA['IPDMRPT10023'])}}:</label>
                      <div class="bg-gray-2">
                        <md-input-text :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT10023']" :hidelabel="true"/>
                        <label>{{__label(MASTERDATA['IPDMRPT10025'])}}:</label>
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA"
                          :DataSubmit="DataSubmit"
                          :index="[0, 1]"
                          :MDCODE="'IPDMRPT10025'"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA"
                          :DataSubmit="DataSubmit"
                          :index="[2, 3]"
                          :MDCODE="'IPDMRPT10025'"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA"
                          :DataSubmit="DataSubmit"
                          :index="[4, 5]"
                          :MDCODE="'IPDMRPT10025'"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA"
                          :DataSubmit="DataSubmit"
                          :index="[6, 7]"
                          :MDCODE="'IPDMRPT10025'"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA"
                          :DataSubmit="DataSubmit"
                          :index="[8, 9]"
                          :MDCODE="'IPDMRPT10025'"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA"
                          :DataSubmit="DataSubmit"
                          :index="[10, 11]"
                          :MDCODE="'IPDMRPT10025'"
                        />
                      </div>
                    </div>
                    <div v-if="routeType === 'A01_195_050919_V' && MASTERDATA['IPDMRPTBNK0001']" class="mt-10">
                      <label>2. {{__label(MASTERDATA['IPDMRPTBNK0001'])}}:</label>
                      <div class="bg-gray-2">
                      <vue-scrolling-table v-if="DataSubmit.SpecialistExaminationsOPDHistories && DataSubmit.SpecialistExaminationsOPDHistories.length" class="mrb10">
                          <template slot="tbl">
                            <table class="table table-bordered table-bordered-x">
                              <thead>
                                <tr>
                                  <th width="1" class="no-wrap">{{__t('Ngày khám')}}</th>
                                  <th width="1" class="no-wrap">{{__t('Bác sĩ khám')}}</th>
                                  <th width="1" class="no-wrap">{{__t('Khoa Phòng')}}</th>
                                  <th>{{__t('Khám chuyên khoa')}}</th>
                                  <th width="1"></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr :data="item" :key="index"  v-for="(item, index) in DataSubmit.SpecialistExaminationsOPDHistories">
                                  <td class="no-wrap">{{item.ExaminationTime | formatDateWithoutSecon}}</td>
                                  <td class="no-wrap"><ad-Info :ad="item.Username"/></td>
                                  <td class="no-wrap">{{__label(item)}}</td>
                                  <td><p v-if="item.SpecialistExamination">{{item.SpecialistExamination}}</p></td>
                                  <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="handleCopy4(item.SpecialistExamination)">Copy</button></td>
                                </tr>
                              </tbody>
                            </table>
                          </template>
                        </vue-scrolling-table>
                        <md-input-text :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPTBNK0001']" :hidelabel="true"/>
                      </div>
                    </div>
                    <label class="mt-10" v-if="routeType === 'Gynecological'">{{__t2('2. Các cơ quan-mdcGy')}}:</label>
                    <label class="mt-10" v-else-if="MASTERDATA['IPDMRPTCACQ']">{{__label(MASTERDATA['IPDMRPTCACQ'])}}:</label>
                    <div class="bg-gray-2">
                      <template v-if="routeType === 'A01_039_050919_V'">
                        <div :key="index" v-for="(code, index) in IPDMRPTCACQA01_039_050919_V">
                          <template v-if="MASTERDATA[code]">
                            <label>{{__label(MASTERDATA[code])}}</label>
                            <md-input-text :hidelabel="true" v-if="code === 'IPDMRPTTHKI'" :placeholder="__t('Nhập')" :defaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
                            <md-input-text :hidelabel="true" v-else-if="code === 'IPDMRPTTIHO' || code === 'IPDMRPT10021' || code === 'IPDMRPTNTDD'" :placeholder="__t('Nhập')" v-model="MASTERDATA[code]"/>
                            <md-input-text :hidelabel="true" v-else :placeholder="__t('Nhập')" :groupDefaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
                          </template>
                        </div>
                      </template>
                      <template v-else-if="routeType === 'A01_040_050919_V'">
                        <div :key="index" v-for="(code, index) in IPDMRPTCACQA01_040_050919_V">
                          <template v-if="MASTERDATA[code]">
                            <label>{{__label(MASTERDATA[code])}}</label>
                            <md-input-text :hidelabel="true" v-if="code === 'IPDMRPTTHKI'" :placeholder="__t('Nhập')" :defaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
                            <md-input-text :hidelabel="true" v-else-if="code === 'IPDMRPTTIHO' || code === 'IPDMRPT10021' || code === 'IPDMRPTNTDD'" :placeholder="__t('Nhập')" v-model="MASTERDATA[code]"/>
                            <md-input-text :hidelabel="true" v-else :placeholder="__t('Nhập')" :groupDefaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
                          </template>
                        </div>
                      </template>
                      <template v-else>
                        <div>
                          <div v-if="routeType !== 'Gynecological'" :key="index" v-for="(code, index) in IPDMRPTCACQ">
                            <template v-if="MASTERDATA[code]">
                              <label v-if="code === 'IPDMRPTNTDD' && routeType !== 'Pediatric'">{{__t2(MASTERDATA[code].ViName)}}</label>
                              <label v-else-if="code === 'IPDMRPTNTDD' && routeType === 'Pediatric'">+ {{__t('Dinh dưỡng và các bệnh lý khác')}}</label>
                              <label v-else>{{__t2(MASTERDATA[code].ViName)}}</label>
                              <md-input-text :hidelabel="true" v-if="code === 'IPDMRPTNTDD' || code === 'IPDMRPTTHKI'" :placeholder="__t('Nhập')" :defaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
                              <md-input-text :hidelabel="true" v-else-if="code === 'IPDMRPTTIHO'" :placeholder="__t('Nhập')" v-model="MASTERDATA[code]"/>
                              <md-input-text :hidelabel="true" v-else :placeholder="__t('Nhập')" :groupDefaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
                            </template>
                          </div>
                        </div>
                      </template>
                      <Gynecological2
                        class="mrt10"
                        v-if="routeType === 'Gynecological'"
                        ref="Gynecological2Box3"
                        :box3="true"
                        :MASTERDATA="MASTERDATA"
                        :DataSubmit="DataSubmit"
                      />
                    </div>
                    <Gynecological2
                        class="mrt10"
                        v-if="routeType === 'Gynecological'"
                        ref="Gynecological2Box4"
                        :box4="true"
                        :MASTERDATA="MASTERDATA"
                        :DataSubmit="DataSubmit"/>
                    <BMTIMMACH2 v-if="routeType === 'CardiovascularForm'" class="mrt10" ref="BMTIMMACH2box2" :box2="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit"/>
                    <label class="mt-10" v-if="MASTERDATA['IPDMRPTCXNC']">{{__label(MASTERDATA['IPDMRPTCXNC'])}}:</label>
                    <div class="bg-gray-2">
                      <md-input-text :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTCXNC']" v-model="MASTERDATA['IPDMRPTCXNC']"  :hidelabel="true"/>
                    </div>
                    <label class="mt-10" v-if="MASTERDATA['IPDMRPTTTBA']">{{__label(MASTERDATA['IPDMRPTTTBA'])}}:</label>
                    <div class="bg-gray-2">
                      <md-input-text :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTTTBA']" v-model="MASTERDATA['IPDMRPTTTBA']"  :hidelabel="true"/>
                    </div>
                    <hr/>
                  </div>
                  <div class="ml-10" v-if="routeType === 'Obstetrics'">
                    <Obstetrics2
                    :MASTERDATA="MASTERDATA"
                    :DataSubmit="DataSubmit"
                    :box2="true"
                    class="mrb10"
                    ref="Obstetrics2box2"
                    :SyncPastMedicalHistory="SyncPastMedicalHistory"
                    :SyncFamilyMedicalHistory="SyncFamilyMedicalHistory"
                    />
                  </div>
                </div>
                <div id="MedicalRecord-part2-block4">
                  <div class="ml-10 mrb10" v-if="routeType === 'Obstetrics'">
                    <label v-if="MASTERDATA['IPDMRPTTTBA']">5. {{__t('Tóm tắt bệnh án')}}:</label>
                    <div class="bg-gray-2">
                      <textarea-autosize v-if="MASTERDATA['IPDMRPTTTBA']" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPTTTBA'].Items[0].Value"/>
                    </div>
                  </div>
                  <label v-if="routeType === 'Obstetrics'" class="mrl10">6. {{__t('Chẩn đoán khi vào khoa điều trị')}}:</label>
                  <label class="block-title" v-else-if="checkVer2()">V. {{__t2('Chẩn đoán khi vào khoa điều trị')}}:</label>
                  <label class="block-title" v-else-if="routeType === 'Gynecological'">IV. {{__t2('Chẩn đoán khi vào khoa điều trị-mdcGy')}}:</label>
                  <label class="block-title" v-else>IV. {{__t2('Chẩn đoán khi vào khoa điều trị')}}:</label>
                  <div class="ml-10">
                    <div class="bg-gray-2">
                      <div v-if="MASTERDATA['IPDMRPTICDC']" class="form-group">
                        <label v-if="routeType === 'Gynecological'">{{__t2('+ Mã ICD10 bệnh chính-mdcGy')}}:</label>
                        <label v-else>{{__t2(MASTERDATA['IPDMRPTICDC'].ViName)}}:</label>
                        <icd10 @icdChange="icdChange" :mdCode="'IPDMRPTICDC'" :single="true" v-model="MASTERDATA['IPDMRPTICDC'].Items[0].Value"/>
                      </div>
                      <label v-if="routeType === 'Gynecological'">{{__t2('+ Chẩn đoán bệnh chính-mdcGy')}}:</label>
                      <label v-else>{{__t2(MASTERDATA['IPDMRPTCDBC'].ViName)}}:</label>
                      <textarea-autosize v-if="MASTERDATA['IPDMRPTCDBC']" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPTCDBC'].Items[0].Value"/>
                      <Oncology2 class="mrb10" v-if="routeType === 'Oncology'" :box2="true" :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA"/>
                      <div v-if="MASTERDATA['IPDMRPTICDP']" :class="!MASTERDATA['IPDMRPTCDKT'].Items[1].Value ? 'none' : null" class="form-group">
                        <label>{{__t2(MASTERDATA['IPDMRPTICDP'].ViName)}}:</label>
                        <icd10 @icdChange="icdChange" :mdCode="'IPDMRPTICDP'" v-model="MASTERDATA['IPDMRPTICDP'].Items[0].Value"/>
                      </div>
                      <label v-if="routeType === 'Gynecological'">{{__t2('+ Chẩn đoán bệnh kèm theo (nếu có)-mdcGy')}}:</label>
                      <label v-else-if="MASTERDATA['IPDMRPTCDKT']">{{__t2(MASTERDATA['IPDMRPTCDKT'].ViName)}}:</label>
                      <MdRadiosInput2 v-if="MASTERDATA['IPDMRPTCDKT']" @change="handleChange('IPDMRPTICDP')" class="mrb10" :value="MASTERDATA['IPDMRPTCDKT']" :noneDex="0"/>
                      <textarea-autosize v-if="MASTERDATA['IPDMRPTCDKT'] && MASTERDATA['IPDMRPTCDKT'].Items[1].Value" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPTCDKT'].Items[0].Value"/>
                      <PathWay
                        v-if="MASTERDATA['IPDMRPTICDC'] || MASTERDATA['IPDMRPTCDKT']"
                        :MainDisease="MASTERDATA['IPDMRPTICDC'].Items[0].Value"
                        :CoMorbidity="MASTERDATA['IPDMRPTICDP'].Items[0].Value"
                      />
                      <label v-if="routeType === 'Gynecological'">{{__t2('+ Phân biệt-mdcGy')}}</label>
                      <label v-else-if="MASTERDATA['IPDMRPTPHBI']">{{__t2(MASTERDATA['IPDMRPTPHBI'].ViName)}}</label>
                      <md-input-text :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTPHBI']" v-model="MASTERDATA['IPDMRPTPHBI']"/>
                      <!-- Thủ thuật / Phẫu thuật -->
                      <div class="flex-box" v-if="MASTERDATA['IPDMRPTTHPT'] && routeType !== 'Obstetrics' && routeType !== 'Oncology'">
                        <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['IPDMRPTTHPT'].Items">
                          <div class="flex-box flex-center" v-if="item.DataType === 'CheckBox'">
                            <div class="v-checkbox">
                              <input type="checkbox" :id="'IPDMRPTTHPTcxo-' + index" v-model="item.Value">
                              <label :for="'IPDMRPTTHPTcxo-' + index"></label>
                            </div>
                            <span class="displaytbl"><span v-if="item">{{__label(item)}}</span></span>
                          </div>
                        </div>
                        <div style="flex-grow: 1;" class="ml-10">
                          <textarea-autosize class="form-control" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPTTHPT'].Items[2].Value"/>
                        </div>
                      </div>
                      <Oncology2 class="mrb10" v-if="routeType === 'Oncology'" :box3="true" :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA"/>
                    </div>
                    <hr/>
                  </div>
                </div>
                <div id="MedicalRecord-part2-block5">
                  <label class="block-title" v-if="checkVer2()">VI. {{__t('Trạng thái bệnh nhân')}}: {{__label(DataSubmit.Status)}}</label>
                  <label class="block-title" v-else-if="routeType !== 'Obstetrics'">V. {{__t('Trạng thái bệnh nhân')}}: {{__label(DataSubmit.Status)}}</label>
                  <!-- <label class="block-title" v-else>V. {{__t('Trạng thái bệnh nhân')}}: {{__label(DataSubmit.Status)}}</label> -->
                  <IPDMRPG :status="activeWithStatus" :routeType="routeType" v-model="DataSubmit.GeneralDatas" :Version="DataSubmit.Version" />
                </div>
              </template>
            </div>
        </div>
        <br/><br/><br/>
        <div>
          <logs :EdId="this._VisitId" :Type="'MedicalRecord/Part2'" :noDetail="true" />
          <p v-if="routeType === 'A01_034_050919_V' && DataSubmit && (DataSubmit.Version >= 2)">A01_034_290422_V</p>
          <p v-else>{{getMaForm(typeForm)}}</p>
        </div>
        <br/><br/><br/>
        <FloatBlock :showForm="!nullContent" :nullContent="nullContent" @handleBack="handleBack">
          <template slot='top'>
            <template v-if="syncInfo">
              <div style="color: #fff;text-align: right;"><b>{{__t('Dữ liệu được đồng bộ từ khoa')}}:</b> {{__label(syncInfo.Specialty)}}</div>
            </template>
            <div v-else style="color: #fff"><b>{{__t('Trạng thái bệnh nhân')}}:</b> {{__label(DataSubmit.Status)}}</div>
          </template>
          <template slot='buttons'>
            <div class="col-md-4">
              <div class="form-group1">
                <button class="btn btn-block v-white-btn" type="button" @click="$router.push({name: 'IPDDischargeMedicalReport', params: {Id: _VisitId}})"><i class="fa fa-file-o" aria-hidden="true"></i> {{__t('Báo cáo y tế ra viện')}}</button>
              </div>
            </div>
            <div class="col-md-8">
              <div class="form-group1">
                <button v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'No examination'" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="noExaminationConfirm()" @click="noExaminationConfirm()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                <div v-else class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</div>
              </div>
            </div>
          </template>
        </FloatBlock>
      </template>
      <div v-else style="padding: 20px;">
        <div class="text-center">
          <p>{{__t(getTextWarning())}}</p>
          <button class="btn btn-warning" @click="confirmPopup(nameRoute, 'BỆNH ÁN')">{{__t('Tạo mới')}}</button>
        </div>
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import MedicalRecordMixinForm from './Mixin.js'
import MixinMasterData from '@/mixins/masterdata.js'
import MedicalRecord from '@/services/IPD/MedicalRecord'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import Logs from '@/components/Logs.vue'
// import OutpatientExaminationNote from '@/services/OPD/OutpatientExaminationNote'
import VSelectBox from '@/components/VSelect.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import _ from 'lodash'
import NProgress from 'nprogress'
import EventBus from '@/lib/eventBus'
import IPDMRPG from './IPDMRPG.vue'
import Neonatal from '@/pages/IPD/MedicalRecord/Page2CPN/Neonatal2.vue'
import Obstetrics2 from '@/pages/IPD/MedicalRecord/Page2CPN/Obstetrics2.vue'
import NeonatalTable from '@/pages/IPD/MedicalRecord/Suport/NeonatalTable.vue'
import Gynecological2 from '@/pages/IPD/MedicalRecord/Page2CPN/Gynecological2.vue'
import Oncology2 from '@/pages/IPD/MedicalRecord/Page2CPN/Oncology2.vue'
import IPDMRPT10002 from './IPDMRPT10002.vue'
import Eye2 from '@/pages/IPD/MedicalRecord/Page2CPN/Eye2.vue'
import BMTIMMACH2 from '@/pages/IPD/MedicalRecord/Page2CPN/BMTIMMACH2.vue'
import UploadFileService from '@/services/IPD/UploadFileService'
import PathWay from '@/components/global/PathWay.vue'
import MdMiniInputText from '@/components/global/MdInput/MdMiniInputText.vue'
export default {
  name: 'IPDMedicalRecordPart2',
  mixins: [MixinMasterData, MedicalRecordMixinForm],
  data () {
    return {
      isErrorPop: false,
      DataSubmit: null,
      loaded: false,
      HistoryOfAllergies: null,
      InitialAssessmentAllergies: null,
      SyncHistoryOfPresentIllness: null,
      SyncPastMedicalHistory: null,
      SyncFamilyMedicalHistory: null,
      IPDMRPTCACQ: [
        'IPDMRPTTUHO',
        'IPDMRPTHOHA',
        'IPDMRPTTIHO',
        'IPDMRPTTTNS',
        'IPDMRPTTHKI',
        'IPDMRPTCOXK',
        'IPDMRPTTAMH',
        'IPDMRPTRAHM',
        'IPDMRPTMMAT',
        'IPDMRPTNTDD'
      ],
      IPDMRPTCACQA01_040_050919_V: [
        'IPDMRPTTHKI',
        'IPDMRPTTUHO',
        'IPDMRPTHOHA',
        'IPDMRPTTIHO',
        'IPDMRPT10021',
        'IPDMRPTCOXK',
        'IPDMRPTTTNS',
        'IPDMRPTNTDD'
      ],
      IPDMRPTCACQA01_039_050919_V: [
        'IPDMRPTTHKI',
        'IPDMRPTTUHO',
        'IPDMRPTHOHA',
        'IPDMRPTTIHO',
        'IPDMRPT10021',
        'IPDMRPTCOXK',
        'IPDMRPTTTNS',
        'IPDMRPTNTDD'
      ],
      groupCodeGrowthProcess: [
        'IPDMRPT07',
        'IPDMRPT08',
        'IPDMRPT17',
        'IPDMRPT26',
        'IPDMRPT27',
        'IPDMRPT32',
        'IPDMRPT34',
        'IPDMRPT36',
        'IPDMRPT37',
        'IPDMRPT42',
        'IPDMRPT43',
        'IPDMRPT46'
      ],
      isFirst: true,
      icd10Code: [
        'IPDMRPTICDTANS',
        'IPDMRPTICDKANS',
        'IPDMRPTICDCANS',
        'IPDMRPTICDPANS',
        'IPDMRPT83',
        'IPDMRPT86',
        'IPDMRPT89',
        'IPDMRPT1005',
        'IPDMRPTR1255',
        'IPDMRPTL1255',
        'IPDMRPTR1145',
        'IPDMRPTL1145'
      ],
      menu: [
        {
          index: 'I ',
          label: 'Lý do vào viện',
          blockId: '#MedicalRecord-part2-block1'
        },
        {
          index: 'II ',
          label: 'Hỏi bệnh',
          blockId: '#MedicalRecord-part2-block2'
        },
        {
          index: 'III ',
          label: 'Khám bệnh',
          blockId: '#MedicalRecord-part2-block3'
        },
        {
          index: 'IV ',
          label: 'Chẩn đoán khi vào khoa điều trị',
          blockId: '#MedicalRecord-part2-block4'
        },
        {
          index: 'V ',
          label: 'Đánh giá',
          blockId: '#MedicalRecord-part2-block5'
        }
      ],
      groupRadio: ['IPDMRPT18', 'IPDMRPT19', 'IPDMRPT20', 'IPDMRPT21', 'IPDMRPT22', 'IPDMRPT23'],
      syncInfo: null,
      dataMaster: '',
      nullContent: true,
      IsUseHandOverCheckList: true,
      pId: '',
      message: '',
      codeHinhVe: [
        'IPDMRPT1014',
        'IPDMRPTR1254',
        'IPDMRPTL1254',
        'IPDMRPTR1144',
        'IPDMRPTL1144'
      ],
      urlFile: []
    }
  },
  components: {
    ListOfCurrentMedications,
    VSelectBox,
    VDateTimePicker,
    Logs,
    IPDMRPG,
    Neonatal,
    NeonatalTable,
    Obstetrics2,
    Gynecological2,
    Oncology2,
    IPDMRPT10002,
    Eye2,
    BMTIMMACH2,
    PathWay,
    MdMiniInputText
  },
  watch: {
    'DataSubmit.Status' () {
      if (this.DataSubmit && this.DataSubmit.Status && this.menu && this.menu.length) {
        if (this.routeType === 'Obstetrics') {
          this.menu[3].label = this.DataSubmit.Status.ViName
        } else if (this.routeType === 'CardiovascularForm') {
          this.menu[5].label = this.DataSubmit.Status.ViName
        } else if (this.routeType !== 'Eye') {
          this.menu[4].label = this.DataSubmit.Status.ViName
        }
        this.isFirst = false
      }
    }
  },
  mounted () {
    this.getSpecialities()
    this.getMasterDatas({Form: 'IPDMRPT'}, () => {
      this.getData()
    })
  },
  computed: {
    activeWithStatus: function () {
      return this.DataSubmit.Status ? this.DataSubmit.Status : ''
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
    removedFile () {
      const FormCodeUrl = this.$route.meta.type
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this.DataSubmit.Id, {Urls: this.urlFile.toString(), FormCodeUrl}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    icdChange (value, code) {
      var currentValue = ''
      var val = (value || []).map(e => e.ViName)
      switch (code) {
        case 'IPDMRPTICDC':
          // IPDMRPTCDBC
          if (!this.MASTERDATA['IPDMRPTCDBC'].Items[0].Value) this.MASTERDATA['IPDMRPTCDBC'].Items[0].Value = val.join(', ')
          break
        case 'IPDMRPTICDP':
          // IPDMRPTCDKT
          currentValue = this.MASTERDATA['IPDMRPTCDKT'].Items[0].Value || ''
          this.MASTERDATA['IPDMRPTCDKT'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
          break
        case 'IPDMRPTICDT':
          // IPDMRPTBCTV
          currentValue = this.MASTERDATA['IPDMRPTBCTV'].Items[0].Value || ''
          this.MASTERDATA['IPDMRPTBCTV'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).join(', ')
          break
        case 'IPDMRPTICDK':
          // IPDMRPTBCKN
          currentValue = this.MASTERDATA['IPDMRPTBCKN'].Items[0].Value || ''
          this.MASTERDATA['IPDMRPTBCKN'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).join(', ')
          break
        default:
          break
      }
    },
    create () {
      new MedicalRecord().update('Part2/Create/' + this.typeForm + '/' + this._VisitId, {}).then(response => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    async submit () {
      if (this.routeType === 'Obstetrics') {
        this.validateForm()
      }
      if (this.routeType === 'Eye') {
        await this.$refs.Eye2.handleCheckMapMD(true)
      }
      if (this.routeType === 'CardiovascularForm') {
        await this.$refs.BMTIMMACH2box1.handleCheckMapMD(true)
      }
      if (this.MASTERDATA['IPDMRPT46'] && !this.MASTERDATA['IPDMRPT46'].Items[6].Value) {
        this.MASTERDATA['IPDMRPT46'].Items[7].Value = ''
      }
      if (this.MASTERDATA['IPDMRPT1004'] && this.MASTERDATA['IPDMRPT1004'].Items[1].Value) {
        this.MASTERDATA['IPDMRPT1004'].Items[1].Value = JSON.stringify(this.MASTERDATA['IPDMRPT1004'].Items[1].Value)
      }
      if (this.MASTERDATA['IPDMRPT1018'] && this.MASTERDATA['IPDMRPT1021'] && !this.MASTERDATA['IPDMRPT1018'].Items[0].Value && !this.MASTERDATA['IPDMRPT1018'].Items[1].Value) {
        this.MASTERDATA['IPDMRPT1021'].Items.forEach(e => {
          if (e.DataType === 'Radio') {
            e.Value = false
          } else if (e.DataType === 'Checkbox') {
            e.Value = false
          } else {
            e.Value = ''
          }
        })
      }
      // console.log('submit rhm', this.MASTERDATA['IPDMRPT10000'])
      var DataSubmit = this.getDataSubmit()
      NProgress.start()
      setTimeout(() => {
        new MedicalRecord().update('Part2/' + this.typeForm + '/' + this._VisitId, DataSubmit).then(async response => {
          this.urlFile = []
          if (this.routeType === 'A01_040_050919_V') {
            const arr1 = this.MASTERDATA['IPDMRPT10025'].Items[0].Value.length > 0 ? this.MASTERDATA['IPDMRPT10025'].Items[0].Value : []
            const arr2 = this.MASTERDATA['IPDMRPT10025'].Items[2].Value.length > 0 ? this.MASTERDATA['IPDMRPT10025'].Items[2].Value : []
            const arr3 = this.MASTERDATA['IPDMRPT10025'].Items[4].Value.length > 0 ? this.MASTERDATA['IPDMRPT10025'].Items[4].Value : []
            const arr4 = this.MASTERDATA['IPDMRPT10025'].Items[6].Value.length > 0 ? this.MASTERDATA['IPDMRPT10025'].Items[6].Value : []
            const arr5 = this.MASTERDATA['IPDMRPT10025'].Items[8].Value.length > 0 ? this.MASTERDATA['IPDMRPT10025'].Items[8].Value : []
            const arr6 = this.MASTERDATA['IPDMRPT10025'].Items[10].Value.length > 0 ? this.MASTERDATA['IPDMRPT10025'].Items[10].Value : []
            this.urlFile = [...arr1, ...arr2, ...arr3, ...arr4, ...arr5, ...arr6]
            setTimeout(() => {
              this.removedFile()
            }, 300)
          }
          if (this.routeType === 'A01_039_050919_V') {
            const arr1 = this.MASTERDATA['IPDMRPT10002'].Items[0].Value.length > 0 ? this.MASTERDATA['IPDMRPT10002'].Items[0].Value : []
            const arr2 = this.MASTERDATA['IPDMRPT10002'].Items[2].Value.length > 0 ? this.MASTERDATA['IPDMRPT10002'].Items[2].Value : []
            const arr3 = this.MASTERDATA['IPDMRPT10002'].Items[4].Value.length > 0 ? this.MASTERDATA['IPDMRPT10002'].Items[4].Value : []
            const arr4 = this.MASTERDATA['IPDMRPT10002'].Items[6].Value.length > 0 ? this.MASTERDATA['IPDMRPT10002'].Items[6].Value : []
            const arr5 = this.MASTERDATA['IPDMRPT10002'].Items[8].Value.length > 0 ? this.MASTERDATA['IPDMRPT10002'].Items[8].Value : []
            const arr6 = this.MASTERDATA['IPDMRPT10002'].Items[10].Value.length > 0 ? this.MASTERDATA['IPDMRPT10002'].Items[10].Value : []
            const arr7 = this.MASTERDATA['IPDMRPT10002'].Items[12].Value.length > 0 ? this.MASTERDATA['IPDMRPT10002'].Items[12].Value : []
            const arr8 = this.MASTERDATA['IPDMRPT10002'].Items[14].Value.length > 0 ? this.MASTERDATA['IPDMRPT10002'].Items[14].Value : []
            this.urlFile = [...arr1, ...arr2, ...arr3, ...arr4, ...arr5, ...arr6, ...arr7, ...arr8]
            this.removedFile()
          }
          if (this.routeType === 'Oncology') {
            const arr1 = this.MASTERDATA['IPDMRPT1004'].Items[0].Value ? this.MASTERDATA['IPDMRPT1004'].Items[0].Value : []
            this.urlFile = [...arr1]
            this.removedFile()
          }
          this.handlerResponse(response)
          this.toastedSuccess()
          if (this.routeType === 'Obstetrics') {
            this.$refs.Obstetrics2box1.$refs.ListOfCurrentMedications.submit(true)
            await this.$refs.Obstetrics2box1.$refs.TblWithMasterData.submit(true)
          } else if (this.routeType === 'Eye') {
            await this.$refs.Eye2.propdataFile()
            await this.$refs.Eye2.$refs.ListOfCurrentMedications.submit(this.DataSubmit.Id)
          } else {
            this.$refs.ListOfCurrentMedications.submit(true)
          }
          this.syncInfo = null
          this.reload()
        }).catch(e => {
          this._401ResponseError(e)
        })
      }, 100)
    },
    setBMI () {
      var weight = this.MASTERDATA['IPDMRPTCANA'].Items[0].Value ? parseFloat(this.MASTERDATA['IPDMRPTCANA'].Items[0].Value) : 0
      var height = this.MASTERDATA['IPDMRPTCICA'].Items[0].Value ? parseFloat(this.MASTERDATA['IPDMRPTCICA'].Items[0].Value) / 100 : 0
      this.MASTERDATA['IPDMRPTBBMI'].Items[0].Value = (weight / (height * height)).toFixed(2)
    },
    syncLastIpdData () {
      new MedicalRecord().update('Part2/Sync/' + this.typeForm + '/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.DataSubmit.Datas = response.Datas
        this.syncInfo = response
        this.DataSubmit.Cannang = response.Cannang
        if (response.InfoOldSan) {
          this.mapTableSan(response.InfoOldSan)
        }
        this.mapData()
        this.changeData()
        if (this.MASTERDATA['IPDMRPTMACH'] && this.MASTERDATA['IPDMRPTCICAANS']) {
          this.MASTERDATA['IPDMRPTMACH'].Items[0].Value = this.MASTERDATA['IPDMRPTCICAANS'].Items[0].Value
        }
        if (this.MASTERDATA['IPDMRPTNHDO'] && this.MASTERDATA['IPDMRPTCANAANS']) {
          this.MASTERDATA['IPDMRPTNHDO'].Items[0].Value = this.MASTERDATA['IPDMRPTCANAANS'].Items[0].Value
        }
        if (this.MASTERDATA['IPDMRPTHUAP'] && this.MASTERDATA['IPDMRPTNHDOANS']) {
          this.MASTERDATA['IPDMRPTHUAP'].Items[0].Value = this.MASTERDATA['IPDMRPTNHDOANS'].Items[0].Value
        }
        if (this.MASTERDATA['IPDMRPTNHTH'] && this.MASTERDATA['IPDMRPTMACHANS']) {
          this.MASTERDATA['IPDMRPTNHTH'].Items[0].Value = this.MASTERDATA['IPDMRPTMACHANS'].Items[0].Value
        }
        if (this.MASTERDATA['IPDMRPTCICA'] && this.MASTERDATA['IPDMRPTNHTHANS']) {
          this.MASTERDATA['IPDMRPTCICA'].Items[0].Value = this.MASTERDATA['IPDMRPTNHTHANS'].Items[0].Value
        }
        if (this.MASTERDATA['IPDMRPTCANA'] && this.MASTERDATA['IPDMRPTHUAPANS']) {
          this.MASTERDATA['IPDMRPTCANA'].Items[0].Value = this.MASTERDATA['IPDMRPTHUAPANS'].Items[0].Value
        }
        if (this.MASTERDATA['IPDMRPT141'] && !this.MASTERDATA['IPDMRPT141'].Items[0].Value && this.DataSubmit.NhipTho) {
          this.MASTERDATA['IPDMRPT141'].Items[0].Value = this.DataSubmit.NhipTho
        }
      })
    },
    mapData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'Painting')) console.log(exited.Value)
              if (this.codeHinhVe.includes(exited.Code)) {
                if (typeof this.JSONParse(exited.Value) === 'string') {
                  exited.Value = '[]'
                }
              }
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (this.icd10Code.includes(item.Code) || this.checkString(item.DataType, 'UploadFiles')) {
                item.Value = this.JSONParse(exited.Value, true)
              } else {
                item.Value = exited.Value
              }
            } else {
              if (this.DataSubmit.TranferInfo) {
                if (item.Code === 'IPDMRPTLDVVANS') {
                  item.Value = this.DataSubmit.TranferInfo.ResonForTransfer
                }
              }
            }
          })
        }
      }
      if (this.MASTERDATA['IPDMRPTCDKT'] && this.MASTERDATA['IPDMRPTCDKT'].Items[0].Value) {
        this.MASTERDATA['IPDMRPTCDKT'].Items[1].Value = true
      }
      this.setBMI()
      this.edited = false
    },
    getData () {
      new MedicalRecord().find('Part2/' + this.typeForm + '/' + this._VisitId).then(response => {
        this.DataSubmit = response
        this.IsUseHandOverCheckList = response.IsUseHandOverCheckList
        if (this.IsUseHandOverCheckList == null || this.IsUseHandOverCheckList === undefined) {
          this.IsUseHandOverCheckList = true
        }
        if (response && response.GrowthProcess.length) {
          if (response.GrowthProcess && response.GrowthProcess.length) {
            response.GrowthProcess.map(item => {
              if (item && item.Data.length) {
                let IPDMRPT06 = {
                  Code: 'IPDMRPT06',
                  Value: '',
                  GroupCode: '',
                  ViName: 'Con thứ mấy',
                  EnName: 'Con thứ mấy'
                }
                let IPDMRPT08 = {
                  Code: 'IPDMRPT08',
                  Value: '',
                  GroupCode: '',
                  ViName: 'Tiền thai (Para)',
                  EnName: 'Tiền thai (Para)'
                }
                let IPDMRPT17 = {
                  Code: 'IPDMRPT17',
                  Value: '',
                  GroupCode: '',
                  ViName: 'Tình trạng khi sinh',
                  EnName: 'Tình trạng khi sinh'
                }
                let IPDMRPT25 = {
                  Code: 'IPDMRPT25',
                  Value: '',
                  GroupCode: '',
                  ViName: 'Cân nặng lúc sinh',
                  EnName: 'Cân nặng lúc sinh'
                }
                let IPDMRPT27 = {
                  Code: 'IPDMRPT27',
                  Value: '',
                  GroupCode: '',
                  ViName: 'Dị tật',
                  EnName: 'Dị tật'
                }
                let IPDMRPT31 = {
                  Code: 'IPDMRPT31',
                  Value: '',
                  GroupCode: '',
                  ViName: 'Bất thường về phát triển tinh thần',
                  EnName: 'Bất thường về phát triển tinh thần'
                }
                let IPDMRPT33 = {
                  Code: 'IPDMRPT33',
                  Value: '',
                  GroupCode: '',
                  ViName: 'Bất thường về phát triển vận động',
                  EnName: 'Bất thường về phát triển vận động'
                }
                let IPDMRPT35 = {
                  Code: 'IPDMRPT35',
                  Value: '',
                  GroupCode: '',
                  ViName: 'Các bệnh lý khác',
                  EnName: 'Các bệnh lý khác'
                }
                let IPDMRPT37 = {
                  Code: 'IPDMRPT37',
                  Value: '',
                  GroupCode: '',
                  ViName: 'Nuôi dưỡng',
                  EnName: 'Nuôi dưỡng'
                }
                let IPDMRPT41 = {
                  Code: 'IPDMRPT41',
                  Value: '',
                  GroupCode: '',
                  ViName: 'Cai sữa tháng thứ',
                  EnName: 'Cai sữa tháng thứ'
                }
                let IPDMRPT43 = {
                  Code: 'IPDMRPT43',
                  Value: '',
                  GroupCode: '',
                  ViName: 'Chăm sóc',
                  EnName: 'Chăm sóc'
                }
                let IPDMRPT46 = {
                  Code: 'IPDMRPT46',
                  Value: '',
                  GroupCode: '',
                  ViName: 'Đã tiêm chủng',
                  EnName: 'Đã tiêm chủng'
                }
                item.Data.map(e => {
                  if (e.Value === 'True') {
                    e.Value = true
                  }
                  if (e.Value === 'False') {
                    e.Value = false
                  }
                  if (e.ViName.includes(':')) {
                    e.ViName = e.ViName.replace(':', '')
                    e.EnName = e.EnName.replace(':', '')
                  }
                  if (e.ViName.includes('. ')) {
                    e.ViName = e.ViName.split('. ')[1]
                    e.EnName = e.EnName.split('. ')[1]
                  }
                  if (e.ViName.includes('- ')) {
                    e.ViName = e.ViName.split('- ')[1]
                    e.EnName = e.EnName.split('- ')[1]
                  }
                  if (e.Code === 'IPDMRPT07') {
                    IPDMRPT06.Value += e.Value
                  }
                  if (e.Code === 'IPDMRPT26') {
                    IPDMRPT25.Value += e.Value + ' kg'
                  }
                  if (e.Code === 'IPDMRPT32') {
                    IPDMRPT31.Value += e.Value
                  }
                  if (e.Code === 'IPDMRPT34') {
                    IPDMRPT33.Value += e.Value
                  }
                  if (e.Code === 'IPDMRPT36') {
                    IPDMRPT35.Value += e.Value
                  }
                  if (e.Code === 'IPDMRPT42') {
                    IPDMRPT41.Value += e.Value
                  }
                  if (e.Code === 'IPDMRPT10') {
                    IPDMRPT08.Value += e.Value + ', '
                  }
                  if (e.Code === 'IPDMRPT12') {
                    IPDMRPT08.Value += e.Value + ', '
                  }
                  if (e.Code === 'IPDMRPT14') {
                    IPDMRPT08.Value += e.Value + ', '
                  }
                  if (e.Code === 'IPDMRPT16') {
                    IPDMRPT08.Value += e.Value
                  }
                  if ((!e.Value && e.Code === 'IPDMRPT10') && (!e.Value && e.Code === 'IPDMRPT12') && (!e.Value && e.Code === 'IPDMRPT14') && (!e.Value && e.Code === 'IPDMRPT16')) {
                    IPDMRPT08.Value = ''
                  }
                  if (e.GroupCode === 'IPDMRPT17') {
                    if (e.Value === true && e.Code !== 'IPDMRPT23') {
                      IPDMRPT17.Value = e.ViName
                    }
                    if (e.Value && e.Code === 'IPDMRPT24') {
                      IPDMRPT17.Value = e.Value
                    }
                  }
                  if (e.GroupCode === 'IPDMRPT27') {
                    if (e.Code === 'IPDMRPT30' && e.Value) {
                      IPDMRPT27.Value = e.Value
                    }
                    if (e.Code === 'IPDMRPT29' && e.Value) {
                      IPDMRPT27.Value = 'Không'
                    }
                  }
                  if (e.GroupCode === 'IPDMRPT37') {
                    if (e.Value) {
                      IPDMRPT37.Value = e.ViName
                    }
                  }
                  if (e.GroupCode === 'IPDMRPT43') {
                    if (e.Value) {
                      IPDMRPT43.Value = e.ViName
                    }
                  }
                  if (e.GroupCode === 'IPDMRPT46') {
                    if (e.Value && e.Code !== 'IPDMRPT53' && e.Code !== 'IPDMRPT54') {
                      if (IPDMRPT46.Value) {
                        IPDMRPT46.Value += ', '
                      }
                      IPDMRPT46.Value += e.ViName
                    }
                    if (e.Value && e.Code === 'IPDMRPT53') {
                      if (IPDMRPT46.Value) {
                        IPDMRPT46.Value += ', '
                      }
                      IPDMRPT46.Value += e.ViName + ': '
                    }
                    if (e.Value && e.Code === 'IPDMRPT54') {
                      IPDMRPT46.Value += e.Value
                    }
                  }
                })
                item.Data.push(IPDMRPT06)
                item.Data.push(IPDMRPT08)
                item.Data.push(IPDMRPT17)
                item.Data.push(IPDMRPT25)
                item.Data.push(IPDMRPT27)
                item.Data.push(IPDMRPT31)
                item.Data.push(IPDMRPT33)
                item.Data.push(IPDMRPT35)
                item.Data.push(IPDMRPT37)
                item.Data.push(IPDMRPT41)
                item.Data.push(IPDMRPT43)
                item.Data.push(IPDMRPT46)
              }
            })
          }
        }
        if (!response.Datas.length && response.TranferInfo && response.TranferInfo.ResonForTransfer && this.MASTERDATA['IPDMRPTLDVV']) {
          this.MASTERDATA['IPDMRPTLDVV'].Items[0].Value = response.TranferInfo.ResonForTransfer
        }
        this.mapData()
        this.changeData()
        if (response.IsNew) {
          this.syncLastIpdData()
        } else {
          setTimeout(() => {
            this.loaded = true
          }, 100)
        }
        if (response.CreateBy) {
          let data = {
            CreateAt: response.CreateAt,
            CreateBy: response.CreateBy
          }
          this.pushCreateBy(data)
        }
        this.SyncVisitHistory()
        this.SyncDiagnosisAndICD()
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        this.nullContent = false
        this.getMenu()
        setTimeout(() => {
          this.loaded = true
          EventBus.$emit('updateGlobalIpdTopbaInfo', this.menu)
        }, 500)
      }).catch(e => {
        this.nullContent = true
        this.loaded = true
        this.DataSubmit = false
        // if (e.status === 404) {}
      })
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
    SyncVisitHistory () {
      new MedicalRecord().update('/Part2/SyncVisitHistory/' + this.typeForm, {Id: this._VisitId}).then(response => {
        // this.HistoryOfAllergies = response.HistoryOfAllergies
        // this.HistoryOfAllergies = response.HistoryOfAllergies
        // this.InitialAssessmentAllergies = response.InitialAssessmentAllergies
        this.SyncHistoryOfPresentIllness = response.HistoryOfPresentIllness
        this.SyncPastMedicalHistory = response.PastMedicalHistory
        this.SyncFamilyMedicalHistory = response.FamilyMedicalHistory
      })
    },
    handleCopy () {
      this.MASTERDATA['IPDMRPT01'].Items[0].Value = this.DataSubmit.Allergy
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    getMenu () {
      let routeType = ''
      if (this.$route.meta.type) {
        routeType = this.$route.meta.type
      }
      if (routeType && routeType === 'Obstetrics' && this.menu) {
        const arr = [
          {
            index: 'I ',
            label: 'Lý do vào viện',
            blockId: '#MedicalRecord-part2-block1'
          },
          {
            index: 'II ',
            label: 'Hỏi bệnh',
            blockId: '#MedicalRecord-part2-block2'
          },
          {
            index: 'III ',
            label: 'Khám bệnh',
            blockId: '#MedicalRecord-part2-block3'
          },
          {
            index: 'IV',
            label: 'Đánh giá',
            blockId: '#MedicalRecord-part2-block5'
          }
        ]
        this.menu = arr
      }
      if (routeType && routeType === 'Eye' && this.menu) {
        this.menu = [
          {
            index: '1 ',
            label: 'Lý do vào viện',
            blockId: '#MedicalRecordEye-part2-block1'
          },
          {
            index: '2 ',
            label: 'Bệnh sử',
            blockId: '#MedicalRecordEye-part2-block2'
          },
          {
            index: '3 ',
            label: 'Tiền sử',
            blockId: '#MedicalRecordEye-part2-block3'
          },
          {
            index: '4.1 ',
            label: 'Khám mắt',
            blockId: '#MedicalRecordEye-part2-block4'
          },
          {
            index: '4.2 ',
            label: 'Khám bệnh toàn thân',
            blockId: '#MedicalRecordEye-part2-block11'
          },
          {
            index: '5 ',
            label: 'Xét nghiệm',
            blockId: '#MedicalRecordEye-part2-block5'
          },
          {
            index: '6 ',
            label: 'Kết luận',
            blockId: '#MedicalRecordEye-part2-block6'
          },
          {
            index: '7 ',
            label: 'Tiên lượng',
            blockId: '#MedicalRecordEye-part2-block7'
          },
          {
            index: '8 ',
            label: 'Hướng điều trị',
            blockId: '#MedicalRecordEye-part2-block8'
          },
          {
            index: '9 ',
            label: 'Tóm tắt bệnh án',
            blockId: '#MedicalRecordEye-part2-block9'
          },
          {
            index: '10 ',
            label: 'Trạng thái bệnh nhân',
            blockId: '#MedicalRecordEye-part2-block10'
          }
        ]
      }
      if (routeType && routeType === 'CardiovascularForm' && this.menu) {
        this.menu = [
          {
            index: 'I ',
            label: 'Lý do vào viện',
            blockId: '#MedicalRecord-part2-block1'
          },
          {
            index: 'II ',
            label: 'Hỏi bệnh',
            blockId: '#MedicalRecord-part2-block2'
          },
          {
            index: 'III ',
            label: 'Đánh giá nguy cơ người bệnh',
            blockId: '#MedicalRecord-part2-block6'
          },
          {
            index: 'IV ',
            label: 'Khám bệnh',
            blockId: '#MedicalRecord-part2-block3'
          },
          {
            index: 'V ',
            label: 'Chẩn đoán khi vào khoa điều trị',
            blockId: '#MedicalRecord-part2-block4'
          },
          {
            index: 'VI ',
            label: 'Trạng thái bệnh nhân',
            blockId: '#MedicalRecord-part2-block5'
          }
        ]
      }
      if (routeType === 'A01_034_050919_V' && this.DataSubmit && this.DataSubmit.Version >= 2 && this.menu) {
        this.menu = [
          {
            index: 'I ',
            label: 'Lý do vào viện',
            blockId: '#MedicalRecord-part2-block1'
          },
          {
            index: 'II ',
            label: 'Hỏi bệnh',
            blockId: '#MedicalRecord-part2-block2'
          },
          {
            index: 'III ',
            label: 'Đánh giá nguy cơ người bệnh',
            blockId: '#MedicalRecord-part2-block6'
          },
          {
            index: 'IV ',
            label: 'Khám bệnh',
            blockId: '#MedicalRecord-part2-block3'
          },
          {
            index: 'V ',
            label: 'Chẩn đoán khi vào khoa điều trị',
            blockId: '#MedicalRecord-part2-block4'
          },
          {
            index: 'VI ',
            label: 'Trạng thái bệnh nhân',
            blockId: '#MedicalRecord-part2-block5'
          }
        ]
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
    handleCopy3 () {
      let str = ''
      if (this.MASTERDATA['IPDMRPTMACH'] && this.MASTERDATA['IPDMRPTMACH'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTMACH']) + ': ' + this.MASTERDATA['IPDMRPTMACH'].Items[0].Value + ' ' + this.__t2('lần/phút-mdc')
      }
      if (this.MASTERDATA['IPDMRPTNHDO'] && this.MASTERDATA['IPDMRPTNHDO'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTNHDO']) + ': ' + this.MASTERDATA['IPDMRPTNHDO'].Items[0].Value + ' ' + this.__t2(this.MASTERDATA['IPDMRPTNHDO'].Note)
      }
      if (this.MASTERDATA['IPDMRPTHUAP'] && this.MASTERDATA['IPDMRPTHUAP'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTHUAP']) + ': ' + this.MASTERDATA['IPDMRPTHUAP'].Items[0].Value + ' ' + this.__t2(this.MASTERDATA['IPDMRPTHUAP'].Note)
      }
      if (this.MASTERDATA['IPDMRPTNHTH'] && this.MASTERDATA['IPDMRPTNHTH'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTNHTH']) + ': ' + this.MASTERDATA['IPDMRPTNHTH'].Items[0].Value + ' ' + this.__t2(this.MASTERDATA['IPDMRPTNHTH'].Note)
      }
      if (this.MASTERDATA['IPDMRPTCICA'] && this.MASTERDATA['IPDMRPTCICA'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTCICA']) + ': ' + this.MASTERDATA['IPDMRPTCICA'].Items[0].Value + ' ' + this.__t2(this.MASTERDATA['IPDMRPTCICA'].Note)
      }
      if (this.MASTERDATA['IPDMRPTCANA'] && this.MASTERDATA['IPDMRPTCANA'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTCANA']) + ': ' + this.MASTERDATA['IPDMRPTCANA'].Items[0].Value + ' ' + this.__t2(this.MASTERDATA['IPDMRPTCANA'].Note)
      }
      if (this.MASTERDATA['IPDMRPTBBMI'] && this.MASTERDATA['IPDMRPTBBMI'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTBBMI']) + ': ' + this.MASTERDATA['IPDMRPTBBMI'].Items[0].Value + ' ' + this.___t(this.MASTERDATA['IPDMRPTBBMI'].Note)
      }
      if (this.MASTERDATA['IPDMRPTTTYT'] && !this.MASTERDATA['IPDMRPTTTYT'].Items[0].Value) {
        this.MASTERDATA['IPDMRPTTTYT'].Items[0].Value = str
      }
      // return str
    },
    handleCopyTable (data) {
      if (data.length) {
        data.forEach(e => {
          if (this.MASTERDATA[e.GroupCode]) {
            this.MASTERDATA[e.GroupCode].Items.forEach(etm => {
              if (e.Code === etm.Code) {
                etm.Value = e.Value
              }
            })
          }
        })
      }
    },
    handleChange (code) {
      if (code === 'IPDMRPTICDP' && this.MASTERDATA['IPDMRPTICDP']) {
        if (this.MASTERDATA['IPDMRPTCDKT'] && !this.MASTERDATA['IPDMRPTCDKT'].Items[1].Value) {
          this.MASTERDATA['IPDMRPTICDP'].Items[0].Value = ''
        }
      }
    },
    getTextWarning () {
      return 'CHƯA CÓ BỆNH ÁN ' + this.MedicalRecordFormName + ' - BỆNH ÁN'
    },
    changeData () {
      if (this.routeType === 'Neonatal' && this.MASTERDATA['IPDMRPTTHPT']) {
        this.MASTERDATA['IPDMRPTTHPT'].Items[0].ViName = 'Thủ thuật sau sinh'
        this.MASTERDATA['IPDMRPTTHPT'].Items[0].EnName = 'Procedure after birth'
        this.MASTERDATA['IPDMRPTTHPT'].Items[1].ViName = 'Phẫu thuật sau sinh'
        this.MASTERDATA['IPDMRPTTHPT'].Items[1].EnName = 'Surgery after birth'
      }
      if (this.MASTERDATA['IPDMRPT109'] && this.DataSubmit.VongDau) {
        this.MASTERDATA['IPDMRPT109'].Items[0].Value = parseInt(this.DataSubmit.VongDau)
      }
      if (this.MASTERDATA['IPDMRPT141'] && !this.MASTERDATA['IPDMRPT141'].Items[0].Value && this.DataSubmit.NhipTho) {
        this.MASTERDATA['IPDMRPT141'].Items[0].Value = parseInt(this.DataSubmit.NhipTho)
      }
      if (this.routeType === 'Obstetrics' && this.MASTERDATA['IPDMRPTTISB']) {
        this.MASTERDATA['IPDMRPTTISB'].ViName = '3. Tiền sử bệnh'
        this.MASTERDATA['IPDMRPTTISB'].EnName = '3. Medical history'
      }
      if ((this.routeType === 'Gynecological' || this.routeType === 'CardiovascularForm') && this.MASTERDATA['IPDMRPTCXNC'] && this.MASTERDATA['IPDMRPTTTBA']) {
        this.MASTERDATA['IPDMRPTCXNC'].ViName = '4. Các xét nghiệm cận lâm sàng cần làm'
        this.MASTERDATA['IPDMRPTCXNC'].EnName = '4. Neccessary laboratory tests'
        this.MASTERDATA['IPDMRPTTTBA'].ViName = '5. Tóm tắt bệnh án'
        this.MASTERDATA['IPDMRPTTTBA'].EnName = '5. Summary'
      }
      if ((this.routeType === 'A01_195_050919_V' || this.routeType === 'A01_039_050919_V' || this.routeType === 'A01_040_050919_V') && this.MASTERDATA['IPDMRPTCACQ']) {
        this.MASTERDATA['IPDMRPTCACQ'].ViName = '3. Các cơ quan'
        this.MASTERDATA['IPDMRPTCACQ'].EnName = '3. Other organs'
        this.MASTERDATA['IPDMRPTCXNC'].ViName = '4. Các xét nghiệm cận lâm sàng cần làm'
        this.MASTERDATA['IPDMRPTCXNC'].EnName = '4. Neccessary laboratory tests'
        this.MASTERDATA['IPDMRPTTTBA'].ViName = '5. Tóm tắt bệnh án'
        this.MASTERDATA['IPDMRPTTTBA'].EnName = '5. Summary'
      }
      if (this.routeType === 'A01_039_050919_V' || this.routeType === 'A01_040_050919_V') {
        this.MASTERDATA['IPDMRPTTHKI'].ViName = '+ Tâm thần, Thần kinh'
        this.MASTERDATA['IPDMRPTTHKI'].EnName = '+ Psychological, nervous system'
        this.MASTERDATA['IPDMRPTTTNS'].ViName = '+ Tiết niệu - Sinh dục'
        this.MASTERDATA['IPDMRPTTTNS'].EnName = '+ Nephro-urological system'
        this.MASTERDATA['IPDMRPTNTDD'].ViName = '+ Khác'
        this.MASTERDATA['IPDMRPTNTDD'].EnName = '+ Others'
      }
    },
    validateForm () {
      let errors = []
      if (this.MASTERDATA['IPDMRPT807'] && this.MASTERDATA['IPDMRPT807'].Items[1].Value) {
        if (!this.MASTERDATA['IPDMRPT807'].Items[2].Value) {
          errors.push(this.MASTERDATA['IPDMRPT807'].Items[2])
        }
      }
      if (this.$refs.Obstetrics2box1.$refs.IPDMRPT818.error) {
        errors.push(this.MASTERDATA['IPDMRPT818'])
      }
      if (this.$refs.Obstetrics2box1.$refs.IPDMRPT826.error) {
        errors.push(this.MASTERDATA['IPDMRPT826'])
      }
      if (errors.length) {
        this.handlerResponse({Error: errors})
      }
    },
    mapTableSan (data) {
      setTimeout(() => {
        this.$refs.Obstetrics2box1.$refs.TblWithMasterData.mapDataTable(data)
      }, 500)
    },
    handleCopy4 (data) {
      if (this.MASTERDATA['IPDMRPTBNK0001']) {
        if (this.MASTERDATA['IPDMRPTBNK0001'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTBNK0001'].Items[0].Value += '\n' + data
        } else {
          this.MASTERDATA['IPDMRPTBNK0001'].Items[0].Value += data
        }
      }
    },
    getMaForm (typeForm) {
      let maForm = ''
      if (typeForm === 'BMTIMMACH') {
        return ''
      }
      maForm = typeForm
      return maForm
    },
    checkVer2 () {
      if (this.DataSubmit) {
        return (!this.routeType && this.DataSubmit.Version >= 2) || this.routeType === 'CardiovascularForm'
      }
      return false
    }
  }
}
</script>
<style scoped>
  .box-copy {
    float: right;
  }
  .input-para {
    width: 90px;
  }
  .error {
    border: 1px solid red!important;
  }
</style>
