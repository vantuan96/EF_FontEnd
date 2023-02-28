<template>
  <div v-if="loaded">
    <div v-if="HasData">
      <div v-if="!IsFormLocked(DataSubmit)">
        <div v-if="!syncing">
          <div class="tabs-header">
            <label required>{{__t('ETR.ngay_gio')}}</label>
            <span>
              <v-masked-input mask="11:11 11/11/1111" :placeholder="'HH:mm MM/DD/YYYY'" class="form-control datetime-input" v-model="DataSubmit.TriageDateTime"/>
            </span>
            <label>{{__t('ETR.giuong')}}</label>
            <input type="text" v-model="DataSubmit.Bed" class="form-control auto-width">
            <button v-if="DataSubmit.IsNew && getVisitTypeGroupCode() === 'ED'" class="btn btn-sync-data pull-right" @click="syncData()">{{__t('Đồng bộ đánh giá NB trong vòng 24H')}}</button>
          </div>
          <div class="tbl-title">{{__t('1. Đánh giá chung')}}</div>
          <table class="table v-table-1 no-margin">
            <tr v-if="MASTERDATA['IEOTESTSARCCOV2']">
              <th width="20%">{{__label(MASTERDATA['IEOTESTSARCCOV2'])}}</th>
              <td>
                <div class="group-radio">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['IEOTESTSARCCOV2'].Items">
                    <span :key="index" v-if="item.DataType === 'Radio'">
                      <input :class="'highlight-yes-radio-' + index" type="checkbox" :id="'IEOTESTSARCCOV2radio-' + index" v-model="item.Value">
                      <label :for="'IEOTESTSARCCOV2radio-' + index" @click="checkbox2Radio(MASTERDATA['IEOTESTSARCCOV2'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </template>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['EDAFRSPVS0']">
              <th width="20%">{{__label(MASTERDATA['EDAFRSPVS0'])}}</th>
              <td>
                <template v-if="MASTERDATA['EDAFRSPPUL']">
                  <div class="vcol150" :data="item" :key="index + 'EDAFRSPPUL'" v-for="(item,index) in MASTERDATA['EDAFRSPPUL'].Items">
                    <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{__t(item.Note)}})</span></label>
                    <input class="form-control" :placeholder="__t(item.Note)" type="text" v-model="item.Value">
                  </div>
                </template>
                <template v-if="MASTERDATA['EDAFRSPBP0']">
                  <div class="vcol150" :data="item" :key="index + 'EDAFRSPBP0'" v-for="(item,index) in MASTERDATA['EDAFRSPBP0'].Items">
                    <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{__t(item.Note)}})</span></label>
                    <input class="form-control" :placeholder="__t(item.Note)" type="text" v-model="item.Value">
                  </div>
                </template>
                <template v-if="MASTERDATA['EDAFRSPTEM']">
                  <div class="vcol150" :data="item" :key="index + 'EDAFRSPTEM'" v-for="(item,index) in MASTERDATA['EDAFRSPTEM'].Items">
                    <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{__t(item.Note)}})</span></label>
                    <input class="form-control" :placeholder="__t(item.Note)" type="text" v-model="item.Value">
                  </div>
                </template>
                <template v-if="MASTERDATA['EDAFRSPSPO']">
                  <div class="vcol150" :data="item" :key="index + 'EDAFRSPSPO'" v-for="(item,index) in MASTERDATA['EDAFRSPSPO'].Items">
                    <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{__t(item.Note)}})</span></label>
                    <input class="form-control" :placeholder="__t(item.Note)" type="text" v-model="item.Value">
                  </div>
                </template>
                <template v-if="MASTERDATA['EDAFRSPRR0']">
                  <div class="vcol150" :data="item" :key="index + 'EDAFRSPRR0'" v-for="(item,index) in MASTERDATA['EDAFRSPRR0'].Items">
                    <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{__t(item.Note)}})</span></label>
                    <input class="form-control" :placeholder="__t(item.Note)" type="text" v-model="item.Value">
                  </div>
                </template>
                <template v-if="MASTERDATA['EDAFRSPHEI']">
                  <div class="vcol150" :data="item" :key="index + 'EDAFRSPHEI'" v-for="(item,index) in MASTERDATA['EDAFRSPHEI'].Items">
                    <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{__t(item.Note)}})</span></label>
                    <number-input inline :placeholder="__label(item)" type="text" v-model="item.Value"/>
                  </div>
                </template>
                <template v-if="MASTERDATA['EDAFRSPWEI']">
                  <div class="vcol150" :data="item" :key="index + 'EDAFRSPWEI'" v-for="(item,index) in MASTERDATA['EDAFRSPWEI'].Items">
                    <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{__t(item.Note)}})</span></label>
                    <number-input inline :placeholder="__label(item)" type="text" v-model="item.Value"/>
                  </div>
                </template>
                <div class="vcol150">
                  <label>BMI</label>
                  <input type="number" class="form-control" readonly :value="bmiCalculation"/>
                </div>
                <height-and-weight v-if="DataSubmit.IsNew" @copy="push2Wh"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['EDAFRSPALL']" class="highlightedsss">
              <th width="20%">{{__label(MASTERDATA['EDAFRSPALL'])}}</th>
              <td>
                <div class="group-radio">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['EDAFRSPALL'].Items">
                    <span :key="index" v-if="item.DataType === 'Radio'">
                      <input :class="'highlight-yes-radio-' + index" type="checkbox" :id="'EDAFRSPALLradio-' + index" v-model="item.Value">
                      <label :for="'EDAFRSPALLradio-' + index" @click="checkbox2Radio(MASTERDATA['EDAFRSPALL'].Items, item)">{{__label(item)}}</label>
                    </span>
                    <span :key="index" v-else-if="item.DataType === 'Select'">
                      <allergies-select v-model="item.Value" :multi="true" :items="JSON.parse(item.Data)" v-if="MASTERDATA['EDAFRSPALL'].Items[0].Value"/>
                    </span>
                    <span :key="index" v-else style="flex-grow: 1;">
                      <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['EDAFRSPALL'].Items[0].Value"/>
                    </span>
                  </template>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['EDAFRSPPAI']">
              <th width="20%">{{__label(MASTERDATA['EDAFRSPPAI'])}}</th>
              <td>
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['EDAFRSPPAI'].Items">
                    <input type="checkbox" :id="'EDAFRSPPAIradio-' + index" v-model="item.Value">
                    <label :for="'EDAFRSPPAIradio-' + index" @click="checkbox2Radio(MASTERDATA['EDAFRSPPAI'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
                <template v-if="MASTERDATA['EDAFRSPPAI'].Items[0].Value">
                  <div class="row">
                    <template v-if="MASTERDATA['EDAFRSPPS0']">
                      <div class="col-md-3">
                        <label>{{__label(MASTERDATA['EDAFRSPPS0'])}}</label>
                        <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'EDAFRSPPS0'" v-for="(item,index) in MASTERDATA['EDAFRSPPS0'].Items">
                      </div>
                    </template>
                    <template v-if="MASTERDATA['EDAFRSPPL0']">
                      <div class="col-md-3">
                        <label>{{__label(MASTERDATA['EDAFRSPPL0'])}}</label>
                        <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'EDAFRSPPL0'" v-for="(item,index) in MASTERDATA['EDAFRSPPL0'].Items">
                      </div>
                    </template>
                    <template v-if="MASTERDATA['EDAFRSPPSD']">
                      <div class="col-md-6">
                        <label>{{__label(MASTERDATA['EDAFRSPPSD'])}}</label>
                        <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'EDAFRSPPSD'" v-for="(item,index) in MASTERDATA['EDAFRSPPSD'].Items">
                      </div>
                    </template>
                  </div>
                  <div class="v-row">
                    <div class="group-radio">
                      <b class="flex-box-label">{{__t('Tần suất đau')}}</b>
                      <template :data="item"  v-for="(item,index) in MASTERDATA['EDAFRSPPF0'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'">
                          <input type="checkbox" :id="'EDAFRSPPF0radio-' + index" v-model="item.Value">
                          <label :for="'EDAFRSPPF0radio-' + index" @click="checkbox2Radio(MASTERDATA['EDAFRSPPF0'].Items, item)">{{__label(item)}}</label>
                        </span>
                        <span :key="index" v-else style="flex-grow: 1;">
                          <textarea-autosize  :placeholder="__label(item)" class="form-control" v-model="item.Value" v-if="MASTERDATA['EDAFRSPPF0'].Items[3].Value"/>
                        </span>
                      </template>
                    </div>
                  </div>
                  <div class="v-row ">
                    <div class="group-radio">
                      <template v-if="MASTERDATA['EDAFRSPPC0']">
                        <b>{{__label(MASTERDATA['EDAFRSPPC0'])}}</b>
                        <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'EDAFRSPPC0'" v-for="(item,index) in MASTERDATA['EDAFRSPPC0'].Items">
                      </template>
                    </div>
                  </div>
                  <div class="v-row">
                    <template v-if="MASTERDATA['EDAFRSPHPU']">
                      <div class="flex-box">
                        <label class="flex-box-label">{{__label(MASTERDATA['EDAFRSPHPU'])}}</label>
                        <div class="group-radio">
                          <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['EDAFRSPHPU'].Items">
                            <template v-if="checkString(item.DataType, 'Radio')">
                              <input type="checkbox" :id="'EDAFRSPHPUradio-' + index" v-model="item.Value">
                              <label :for="'EDAFRSPHPUradio-' + index" @click="checkbox2Radio(MASTERDATA['EDAFRSPHPU'].Items, item)">{{__label(item)}}</label>
                            </template>
                          </span>
                        </div>
                        <!-- <i class="flex-box-label" v-if="MASTERDATA['EDAFRSPHPU'].Items[0].Value">Bác sĩ khai thác thông tin tại phiếu khám ngoại trú</i> -->
                      </div>
                    </template>
                  </div>
                  <div class="v-row" v-if="MASTERDATA['EDAFRSPHPU'] && MASTERDATA['EDAFRSPHPU'].Items[0].Value">
                    <template v-if="MASTERDATA['EDAFRSPPME']">
                      <div class="flex-box">
                        <label class="flex-box-label">{{__label(MASTERDATA['EDAFRSPPME'])}}</label>
                        <div class="group-radio">
                          <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['EDAFRSPPME'].Items">
                            <template v-if="checkString(item.DataType, 'Radio')">
                              <input type="checkbox" :id="'EDAFRSPPMEradio-' + index" v-model="item.Value">
                              <label :for="'EDAFRSPPMEradio-' + index" @click="checkbox2Radio(MASTERDATA['EDAFRSPPME'].Items, item)">{{__label(item)}}</label>
                            </template>
                          </span>
                        </div>
                      </div>
                    </template>
                  </div>
                </template>
              </td>
            </tr>
            <tr v-if="MASTERDATA['EDAFRSPPRE']">
              <th width="20%">{{__label(MASTERDATA['EDAFRSPPRE'])}}</th>
              <td>
                <div class="group-radio">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['EDAFRSPPRE'].Items">
                    <span :key="index" v-if="item.DataType === 'Radio'">
                      <input type="checkbox" :id="'EDAFRSPPREradio-' + index" v-model="item.Value">
                      <label :for="'EDAFRSPPREradio-' + index" @click="checkbox2Radio(MASTERDATA['EDAFRSPPRE'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </template>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['EDAFRSPBRE']">
              <th width="20%">{{__label(MASTERDATA['EDAFRSPBRE'])}}</th>
              <td>
                <div class="group-radio">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['EDAFRSPBRE'].Items">
                    <span :key="index" v-if="item.DataType === 'Radio'">
                      <input type="checkbox" :id="'EDAFRSPBREradio-' + index" v-model="item.Value">
                      <label :for="'EDAFRSPBREradio-' + index" @click="checkbox2Radio(MASTERDATA['EDAFRSPBRE'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </template>
                </div>
              </td>
            </tr>
            <tr v-if="DataSubmit.Version === 1">
              <th width="20%" v-if="MASTERDATA['EDAFRSPCDI']">{{__label(MASTERDATA['EDAFRSPCDI'])}}</th>
              <td v-if="MASTERDATA['EDAFRSPCDI']">
                <table class="no-border">
                  <tr>
                    <th width="20%">{{__label(MASTERDATA['EDAFRSPAFI'])}}</th>
                    <td>
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['EDAFRSPAFI'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'">
                            <input type="checkbox" :id="'EDAFRSPAFIradio-' + index" v-model="item.Value">
                            <label :for="'EDAFRSPAFIradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['EDAFRSPAFI'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['EDAFRSPAFI'].Items[3].Value"/>
                          </span>
                        </template>
                      </div>
                    </td>
                  </tr>
                  <template v-if="MASTERDATA['EDAFRSPAFI'].Items[0].Value">
                  <tr v-if="MASTERDATA['EDAFRSPARO']">
                    <th class="no-border">{{__label(MASTERDATA['EDAFRSPARO'])}}</th>
                    <td>
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['EDAFRSPARO'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'">
                            <input type="checkbox" :id="'EDAFRSPAROradio-' + index" v-model="item.Value">
                            <label :for="'EDAFRSPAROradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['EDAFRSPARO'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['EDAFRSPARO'].Items[3].Value"/>
                          </span>
                        </template>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="MASTERDATA['EDAFRSPTOC']">
                    <th class="no-border">{{__label(MASTERDATA['EDAFRSPTOC'])}}</th>
                    <td>
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['EDAFRSPTOC'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'">
                            <input type="checkbox" :id="'EDAFRSPTOCradio-' + index" v-model="item.Value">
                            <label :for="'EDAFRSPTOCradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['EDAFRSPTOC'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['EDAFRSPTOC'].Items[3].Value"/>
                          </span>
                        </template>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="MASTERDATA['EDAFRSPSOB']">
                    <th class="no-border">{{__label(MASTERDATA['EDAFRSPSOB'])}}</th>
                    <td>
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['EDAFRSPSOB'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'">
                            <input type="checkbox" :id="'EDAFRSPSOBradio-' + index" v-model="item.Value">
                            <label :for="'EDAFRSPSOBradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['EDAFRSPSOB'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['EDAFRSPSOB'].Items[3].Value"/>
                          </span>
                        </template>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="MASTERDATA['EDAFRSPACC']">
                    <th class="no-border">{{__label(MASTERDATA['EDAFRSPACC'])}}</th>
                    <td>
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['EDAFRSPACC'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'">
                            <input type="checkbox" :id="'EDAFRSPACCradio-' + index" v-model="item.Value">
                            <label :for="'EDAFRSPACCradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['EDAFRSPACC'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['EDAFRSPACC'].Items[3].Value"/>
                          </span>
                        </template>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="MASTERDATA['EDAFRSPDGL']">
                    <th class="no-border">{{__label(MASTERDATA['EDAFRSPDGL'])}}</th>
                    <td>
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['EDAFRSPDGL'].Items">
                          <span :key="index">
                            <input type="checkbox" :id="'EDAFRSPDGLradio-' + index" v-model="item.Value">
                            <label :for="'EDAFRSPDGLradio-' + index" @click="checkbox2Radio(MASTERDATA['EDAFRSPDGL'].Items, item)">{{__label(item)}}</label>
                          </span>
                        </template>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="MASTERDATA['EDAFRSPLCL'] && MASTERDATA['EDAFRSPDGL'] && MASTERDATA['EDAFRSPDGL'].Items[1].Value">
                    <th class="no-border">{{__label(MASTERDATA['EDAFRSPLCL'])}}</th>
                    <td>
                      <div class="group-radio">
                        <template :data="item"  v-for="(item,index) in MASTERDATA['EDAFRSPLCL'].Items">
                          <span :key="index" v-if="item.DataType === 'Radio'">
                            <input type="checkbox" :id="'EDAFRSPLCLradio-' + index" v-model="item.Value">
                            <label :for="'EDAFRSPLCLradio-' + index" @click="checkbox2Radio(MASTERDATA['EDAFRSPLCL'].Items, item)">{{__label(item)}}</label>
                          </span>
                          <span :key="index" v-else style="flex-grow: 1;">
                            <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['EDAFRSPLCL'].Items[3].Value"/>
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
                <CommunicableDiseasesScreening v-model="MASTERDATA" :type="'EDRS'" :version="DataSubmit.Version"/>
              </td>
            </tr>
          </table>
          <div class="tbl-title">{{__t('Khai thác thông tin thuốc đã dùng')}}</div>
          <div class="box box-table">
            <list-of-current-medications
              :VisitId="$route.params.Id"
              ref="ListOfCurrentMedications"
              :Type="`${getVisitTypeGroupCode()}-PatientMedicationList`"
              :VisitTypeGroupCode="getVisitTypeGroupCode()"
            />
          </div>
        </div>
        <FloatBlock>
          <template slot='buttons'>
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group1" v-if="isTestCovid2">
                <button class="btn pull-right" type="button" @click="$router.push({name: `${getVisitTypeGroupCode()}-TestCovid2Confirmation`, params: {Id: $route.params.Id}})">{{__t('Giấy xác nhận XN SARC-CoV-2')}}</button>
              </div>
              <div class="form-group1" v-else>
                <button class="btn pull-right" type="button" @click="$router.push({name: `${getVisitTypeGroupCode()}-StandingOrderForRetailService`, params: {Id: $route.params.Id}})">{{__t('Theo dõi thực hiện thuốc')}}</button>
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="form-group1">
                <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </div>
      <div v-else>
        <ReonlyForm :DataSubmit="DataSubmit" :MASTERDATATMP="MASTERDATA" />
      </div>
      <!-- <div class="tabs-footer">
        <button class="btn v-yellow-btn pull-right long-btn" type="button" @click="submit()" :disabled="!DataSubmit.TriageDateTime">{{__t('Lưu')}}</button>
        <button class="btn pull-right btn-back v-white-btn" type="button" @click="back()">{{__t('btn.quay_lai')}}</button>
      </div> -->
      <logs :EdId="this.$route.params.Id" :Type="`${getVisitTypeGroupCode()}AssessmentForRetailServicePatient`" />
    </div>
    <div v-else>
      <div class="text-center p20">
        <p>{{___t('Chưa có đánh giá ban đầu người bệnh sử dụng dịch vụ lẻ')}}</p>
        <button class="btn btn-warning" @click="confirmPopup" v-if="!IsFormLocked(DataSubmit) && !IsLocked">{{___t('Tạo mới')}}</button>
      </div>
    </div>
  </div>
  <div v-else class="loading-text"><v-loading/></div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */

// import MaskedInput from 'vue-v-masked-input'
import AssessmentForRetailServicePatient from '@/services/AssessmentForRetailServicePatient'
import ObservationTable from '@/pages/ProgressNote/ObservationTable.vue'
import Logs from '@/components/Logs.vue'
import NProgress from 'nprogress'
// import moment from 'moment'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import _ from 'lodash'
// import Ed from '@/components/ED/VIEW_ED.vue'
// import Tpc from '@/components/c_TPC.vue'
import VSelectBox from '@/components/VSelect.vue'
// import EventBus from '@/lib/eventBus'
import VDatePicker from '@/components/VDateTimePicker.vue'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import ReonlyForm from './AssessmentViewOnlyOPD.vue'

export default {
  /**
   * The name of the page.
   */
  name: 'AssessmentForm',
  data () {
    return {
      DataSubmit: {
        TriageDateTime: null,
        Room: null,
        Datas: [],
        Customer: {}
      },
      Loading: true,
      YESNOFIELD: ['ETRALL'],
      HasData: false,
      syncing: false,
      loaded: false,
      IsLocked: false
    }
  },
  mixins: [MixinMasterData, MixinForm],
  /**
   * The components that the page can use.
   */
  components: {
    // MaskedInput,
    // Ed,
    VSelectBox,
    // Tpc,
    ObservationTable,
    VDatePicker,
    Logs,
    ListOfCurrentMedications,
    CommunicableDiseasesScreening,
    ReonlyForm
  },
  mounted () {
    this.getMasterDatas({Form: 'EDAFRSP'}, () => {
      this.getRooms()
      this.getData()
    })
  },
  computed: {
    isTestCovid2: function () {
      return this.MASTERDATA['IEOTESTSARCCOV2'] && this.MASTERDATA['IEOTESTSARCCOV2'].Items[0].Value
    },
    ETRGCS: function () {
      return parseFloat(this.MASTERDATA['ETREYE'].Items[0].Value || 0) + parseFloat(this.MASTERDATA['ETRVOI'].Items[0].Value || 0) + parseFloat(this.MASTERDATA['ETRMOV'].Items[0].Value || 0)
    },
    bmiCalculation: function () {
      var weight = this.MASTERDATA['EDAFRSPWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['EDAFRSPWEI'].Items[0].Value) : 0
      var height = this.MASTERDATA['EDAFRSPHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['EDAFRSPHEI'].Items[0].Value) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    }
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
        var checked = (this.MASTERDATA['EDAFRSPAFI'].Items[0].Value && this.MASTERDATA['EDAFRSPARO'].Items[0].Value) ||
                      (this.MASTERDATA['EDAFRSPAFI'].Items[0].Value && this.MASTERDATA['EDAFRSPTOC'].Items[0].Value) ||
                      (this.MASTERDATA['EDAFRSPAFI'].Items[0].Value && this.MASTERDATA['EDAFRSPSOB'].Items[0].Value && this.MASTERDATA['EDAFRSPACC'].Items[0].Value)
        this.MASTERDATA['EDAFRSPDGL'].Items[1].Value = checked
        this.MASTERDATA['EDAFRSPDGL'].Items[0].Value = !checked
      }, 10)
    },
    push2Wh (data) {
      if (data.Weight) this.MASTERDATA['EDAFRSPWEI'].Items[0].Value = data.Weight
      if (data.Height) this.MASTERDATA['EDAFRSPHEI'].Items[0].Value = data.Height
    },
    validateForm () {
      var errors = []
      if (this.MASTERDATA['EDAFRSPALL'].Items[0].Value && !this.MASTERDATA['EDAFRSPALL'].Items[3].Value) {
        errors.push(this.MASTERDATA['EDAFRSPALL'].Items[3])
      }
      if (this.MASTERDATA['EDAFRSPALL'].Items[0].Value && !this.MASTERDATA['EDAFRSPALL'].Items[4].Value) {
        errors.push(this.MASTERDATA['EDAFRSPALL'].Items[4])
      }
      if (errors.length) {
        this.handlerResponse({Error: errors})
      }
    },
    submit () {
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
      // console.log(obj['EDAFRSPPAIYES'])
      if (!obj['EDAFRSPPAIYES']) {
        this.resetMdData('EDAFRSPPS0')
        this.resetMdData('EDAFRSPPL0')
        this.resetMdData('EDAFRSPPF0')
        this.resetMdData('EDAFRSPPC0')
        this.resetMdData('EDAFRSPHPU')
      }
      if (!obj['EDAFRSPAFIYES']) {
        this.resetMdData('EDAFRSPARO')
        this.resetMdData('EDAFRSPTOC')
        this.resetMdData('EDAFRSPSOB')
        this.resetMdData('EDAFRSPACC')
        this.resetMdData('EDAFRSPDGL')
        this.resetMdData('EDAFRSPLCL')
      }
      if (!obj['EDAFRSPDGLPOS']) {
        this.resetMdData('EDAFRSPLCL')
      }
      var DataSubmit = Object.assign({}, this.DataSubmit)
      if (DataSubmit.TriageDateTime && typeof DataSubmit.TriageDateTime === 'object') {
        DataSubmit.TriageDateTime = this.moment2String(DataSubmit.TriageDateTime)
      }
      if (DataSubmit.TriageDateTime) {
        DataSubmit._Exception.push({
          key: 'TriageDateTime',
          value: DataSubmit.TriageDateTime
        })
      }
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
      // DataSubmit.ClinicId = DataSubmit.Clinic ? DataSubmit.Clinic.Id : null
      setTimeout(() => {
        // this.DataSubmit.Room = {}
        new AssessmentForRetailServicePatient({}, this.getVisitTypeGroupCode()).update(this.$route.params.Id, DataSubmit).then(response => {
          // this.$router.push({name: 'etr', params: {Id: response.Id}})
          this.toastedSuccess()
          this.edited = false
          if (this.$refs.ListOfCurrentMedications) {
            this.$refs.ListOfCurrentMedications.submit()
          }
        }).catch(e => {
          this._401ResponseError(e)
        })
      }, 100)
    },
    resetMdData (key) {
      if (!this.MASTERDATA[key]) {
        // console.log(key)
        return
      }
      this.MASTERDATA[key].Items.forEach(item => {
        item.Value = null
      })
      this.DataSubmit.Datas.forEach(item => {
        if (item.Group === key) {
          item.Value = null
        }
      })
    },
    submitRetailServicePatient () {
      new AssessmentForRetailServicePatient({}, this.getVisitTypeGroupCode()).update(this.$route.params.Id, {}, 'confirm/').then(response => {
        this.reload()
      }).catch(e => {
        // this.$router.push({name: 'OPDInitialAssessmentShort', params: {Id: this.$route.params.Id}})
      })
    },
    remove () {
      this.$modal.show('dialog', {
        title: 'Bạn muốn xóa bệnh nhân này không?',
        text: '<p>Hành động xóa hồ sơ bệnh án của bạn sẽ được lưu lại, dữ liệu đã nhập tại hồ sơ này sẽ bị mất.</p> <b>Chú ý</b>: Chỉ người tạo hồ sơ mới có quyền xóa, bạn cũng sẽ không thể xóa hồ sơ khi bác sĩ đã nhập thông tin.',
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'Đồng ý',
            class: 'btn',
            handler: () => {
              this.removeConfirmed()
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Hủy bỏ',
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    removeConfirmed () {
      new AssessmentForRetailServicePatient({}, this.getVisitTypeGroupCode()).update('Delete/' + this.$route.params.Id, this.DataSubmit).then(response => {
        this.go2Home()
      })
    },
    syncData () {
      this.syncing = true
      new AssessmentForRetailServicePatient({}, this.getVisitTypeGroupCode()).find('Sync/' + this.$route.params.Id).then(response => {
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
    // getAllergy () {
    //   new Allergy({hidemsg: true}).update(this.$route.params.Id, {}).then(response => {
    //     if (response) {
    //       this.MASTERDATA['EDAFRSPALL'].Items[0].Value = response.Yes === 'True'
    //       this.MASTERDATA['EDAFRSPALL'].Items[1].Value = response.No === 'True'
    //       this.MASTERDATA['EDAFRSPALL'].Items[2].Value = response.Kind
    //       this.MASTERDATA['EDAFRSPALL'].Items[3].Value = response.Ans
    //     }
    //   })
    // },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới đánh giá ban đầu người bệnh sử dụng dịch vụ lẻ *?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.submitRetailServicePatient()
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
    },
    getData () {
      new AssessmentForRetailServicePatient({}, this.getVisitTypeGroupCode()).find(this.$route.params.Id + '?hidemsg=' + true).then(response => {
        this.HasData = true
        this.loaded = true
        this.DataSubmit = response
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
          this.getHeightAndWeight('EDAFRSPHEI', 'EDAFRSPWEI')
          this.getAllergy('EDAFRSPALL')
        }
        setTimeout(() => {
          this.edited = false
        }, 10)
      }).catch(e => {
        this.loaded = true
        if (e.status === 404) {
          this.IsLocked = e.data && e.data.IsLocked
        }
      })
    }
  }
}
</script>
