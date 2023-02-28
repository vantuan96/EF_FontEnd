<template>
  <div id="AdultVitalSigns-PageNurse" class="AdultVitalSigns-PageNurse">
    <div class="content">
      <!-- box table -->
      <page-table @handleEdit="handleEdit" :viewOnly="viewOnly" :VisitId="VisitId"/>
      <div v-if="nullContent" class="null-content">{{__t('AdultVitalSigns.labelNull')}}</div>
      <modal name="MasterDataPopup" transition="pop-out" height="auto" :clickToClose="false" :width="modalWidth">
        <div class="sync-ed-header">{{__t('AdultVitalSigns.bigTitle')}}<i style="cursor: pointer" @click="closeModal()" class="fa fa-times pull-right fa-2" aria-hidden="true"></i></div>
        <div class="sync-ed-box" style="overflow-x: hidden">
          <div v-if="showForm" class="box-content">
            <!-- box date time -->
            <div class="box1 mrb30 flex align-center">
              <div class="box-date flex align-center space-between">
                <div class="title-date fw600">{{__t('AdultVitalSigns.labelTime1')}}</div>
                <v-date-time-picker :hideTooltip="true" v-model="time" :format="vDateTimeFormat"/>
              </div>
              <div class="name fw600">{{__t('HospitalDischargeTable.label2')}}
                <ad-Info v-if="DataSubmit.CreatedBy" :ad="DataSubmit.CreatedBy" />
                <ad-Info v-else :ad="$store.state.account.Username" />
              </div>
            </div>
            <div class="top-table">
              <table class="table observation-table">
                <template>
                  <thead>
                    <tr v-if="MASTERDATA">
                      <th rowspan="2" width="100px">
                        <div>
                          <span class="block">Nhịp thở</span>
                          <span class="block">(Lần/phút)</span>
                        </div>
                      </th>
                      <th rowspan="2" width="200px">
                        <div>
                          <span class="block">SpO2</span>
                          <span class="block">(%)</span>
                        </div>
                      </th>
                      <th rowspan="2" width="200px">
                        <div>
                          <span class="block">Huyết áp</span>
                          <span class="block">(mmHg)</span>
                        </div>
                      </th>
                      <th rowspan="2" width="100px">Mạch (Nhịp/phút)</th>
                      <th rowspan="2" width="100px">Thân nhiệt (oC)</th>
                      <th>{{__label(MASTERDATA['IPDMEWS12'])}}</th>
                      <th rowspan="2" width="120px">{{__label(MASTERDATA['IPDMEWS15'])}}</th>
                      <th rowspan="2">{{__t('AdultVitalSigns.labelCustomer5')}}</th>
                    </tr>
                    <!-- dropdwon y nghia -->
                    <tr v-if="MASTERDATA['IPDMEWS12']">
                      <th>
                        <div class="dropdown">
                          <div class="dropdown-toggle cursor fw200" id="dropdownMeaningful" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDMEWS12'].Items[1])}}
                          </div>
                          <div class="dropdown-menu" aria-labelledby="dropdownMeaningful">
                            <table class="table observation-table table-dropdow" style="width: 500px">
                              <thead>
                                <tr>
                                  <th width="50"></th>
                                  <th>{{__t('AdultVitalSigns.dropDowLabel1')}}</th>
                                  <th>{{__t('AdultVitalSigns.dropDowLabel2')}}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td style="text-align: center;" class="fw600">A</td>
                                  <td>Tỉnh táo</td>
                                  <td>Mở mắt tự nhiên, Nhận thức với xung quanh, hướng mắt theo chỉ dẫn</td>
                                </tr>
                                <tr>
                                  <td style="text-align: center;" class="fw600">V</td>
                                  <td>Đáp ứng với âm thanh</td>
                                  <td>Mở mắt khi được gọi, có thể trả lời khi được hỏi</td>
                                </tr>
                                <tr>
                                  <td style="text-align: center;" class="fw600">P</td>
                                  <td>Đáp ứng với kích thích đau</td>
                                  <td>Không trả lời được, có phản ứng với kích thích đau</td>
                                </tr>
                                <tr>
                                  <td style="text-align: center;" class="fw600">U</td>
                                  <td>Không đáp ứng</td>
                                  <td>Không phản ứng</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </th>
                      <!-- <th class="drop-meaningful"><i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDMEWS10'].Items[1])}}</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td v-if="MASTERDATA['IPDMEWS00']">
                        <div class="box-action">
                          <MDNumberInput v-model="MASTERDATA['IPDMEWS00'].Items[0].Value" :code="MASTERDATA['IPDMEWS00'].Items[0].Code"/>
                        </div>
                      </td>
                      <td v-if="MASTERDATA['IPDMEWS02']">
                        <div class="box-action">
                          <div class="checkbox-left">
                            <MDCheckbox2 v-model="MASTERDATA['IPDMEWS02']"/>
                          </div>
                          <MDNumberInput v-model="MASTERDATA['IPDMEWS02'].Items[1].Value" />
                        </div>
                      </td>
                      <td v-if="MASTERDATA['IPDMEWS05']">
                        <div class="box-action">
                          <div class="checkbox-left">
                            <MDNumberInput :placeholder="__t('AdultVitalSigns.placeholder2')" v-model="MASTERDATA['IPDMEWS05'].Items[0].Value" />
                          </div>
                          <MDNumberInput :placeholder="__t('AdultVitalSigns.placeholder1')" v-model="MASTERDATA['IPDMEWS05'].Items[1].Value" />
                        </div>
                      </td>
                      <td v-if="MASTERDATA['IPDMEWS08']">
                        <div class="box-action">
                          <MDNumberInput v-model="MASTERDATA['IPDMEWS08'].Items[0].Value" :code="MASTERDATA['IPDMEWS08'].Items[0].Code"/>
                        </div>
                      </td>
                      <td v-if="MASTERDATA['IPDMEWS10']">
                        <div class="box-action">
                          <MDNumberInput :limitDecimal="true" :decimal="true" v-model="MASTERDATA['IPDMEWS10'].Items[0].Value" :code="MASTERDATA['IPDMEWS10'].Items[0].Code"/>
                        </div>
                      </td>
                      <td v-if="MASTERDATA['IPDMEWS12']">
                        <v-select :disabeleclear="false" class='select-full-w' v-model="MASTERDATA['IPDMEWS12'].Items[0].Value" :placeholder="__t('Chọn')" :items="SENSE"/>
                      </td>
                      <td v-if="MASTERDATA['IPDMEWS15']">
                        <v-select :disabeleclear="false" class='select-full-w' v-model="MASTERDATA['IPDMEWS15'].Items[0].Value" :placeholder="__t('Chọn')" :items="RESPIRATORY"/>
                      </td>
                      <td v-if="MASTERDATA['IPDMEWS17']">
                        <p class="none">{{ getTongMews()}}</p>
                        <FakeInput :dfl="true" class="fake-input" :class="colorClass ? colorClass : null" v-model="MASTERDATA['IPDMEWS17'].Items[0].Value"/>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </table>
            </div>
            <div class="big-box">
              <div v-if="MASTERDATA['IPDMEWS19']" class="mini-box">
                <div class="box-left">
                  <p class="label fw600 fs14">{{__label(MASTERDATA['IPDMEWS19'])}}: </p>
                </div>
                <div class="box-right">
                  <v-select :disabeleclear="false" class='select-full-w box-select' v-model="MASTERDATA['IPDMEWS19'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionDiemDau"/>
                  <MDNumberInput v-model="MASTERDATA['IPDMEWS19'].Items[1].Value"  style="width: 100px;"/>
                </div>
              </div>
              <div v-if="MASTERDATA['IPDMEWS22']" class="mini-box">
                <div class="box-left">
                  <p class="label fw600 fs14">{{__label(MASTERDATA['IPDMEWS22'])}}: </p>
                  <!-- y nghia -->
                  <div class="dropdown">
                  <div class="dropdow-y-nghia" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-double-down"></i> {{__t('AdultVitalSigns.y_nghia')}}</div>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
                      <p>Trước bữa ăn sáng <span class="fw600">(T1)</span></p>
                      <p>Trước bữa ăn trưa <span class="fw600">(T2)</span></p>
                      <p>Trước bữa ăn tối <span class="fw600">(T3)</span></p>
                      <p>Sau bữa ăn sáng <span class="fw600">(S1)</span></p>
                      <p>Sau bữa ăn trưa <span class="fw600">(S2)</span></p>
                      <p>Sau bữa ăn tối <span class="fw600">(S3)</span></p>
                    </div>
                  </div>
                </div>
                <div class="box-right box-right2">
                  <v-select :disabeleclear="false" class='select-full-w box-select' v-model="MASTERDATA['IPDMEWS22'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionMaoMach"/>
                  <MDNumberInput :maxlength='20' :decimal="true" class="input-mao-mach" v-if="MASTERDATA['IPDMEWS22'].Items[0].Value" :code="MASTERDATA['IPDMEWS22'].Items[0].Code" v-model="MASTERDATA['IPDMEWS22'].Items[1].Value" />
                </div>
              </div>
              <div v-if="MASTERDATA['IPDMEWS25']" class="mini-box">
                <div class="box-left">
                  <p class="label fw600 fs14">{{__t('AdultVitalSigns.labelCustomer1')}} </p>
                  <!-- y nghia -->
                  <div class="dropdown">
                  <div class="dropdow-y-nghia" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-double-down"></i> {{__t('AdultVitalSigns.y_nghia')}}</div>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                      <h4 class="fw600">00: </h4>
                      <p class="fw600">{{__t('AdultVitalSigns.YNghiaVein.label0')}}</p>
                      <h4 class="fw600">01: </h4>
                      <p class="fw600">{{__t('AdultVitalSigns.YNghiaVein.label1')}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label2')}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label3')}}</p>
                      <h4 class="fw600">02: </h4>
                      <p class="fw600">{{__t('AdultVitalSigns.YNghiaVein.label4')}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label5')}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label6')}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label7')}}</p>
                      <h4 class="fw600">03: </h4>
                      <p class="fw600">{{__t('AdultVitalSigns.YNghiaVein.label8')}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label9')}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label10')}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label11')}}</p>
                      <h4 class="fw600">04: </h4>
                      <p class="fw600">{{__t('AdultVitalSigns.YNghiaVein.label12')}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label13')}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label14')}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label14-1') || ''}}</p>
                      <h4 class="fw600">05: </h4>
                      <p class="fw600">{{__t('AdultVitalSigns.YNghiaVein.label15')}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label16')}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label17')}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label17-1') || ''}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label17-2') || ''}}</p>
                      <p>{{__t('AdultVitalSigns.YNghiaVein.label17-3') || ''}}</p>
                    </div>
                  </div>
                </div>
                <div class="box-right box-right3">
                  <v-select :disabeleclear="false" class='select-full-w box-select box-select-vein' v-model="MASTERDATA['IPDMEWS25'].Items[1].Value" :placeholder="__t('Chọn')" :items="optionVein"/>
                  <div class="flex align-center">
                    <span style="word-break: break-word; margin-right: 5px;" class="fw600">{{__label(MASTERDATA['IPDMEWS25'].Items[3])}}:</span>
                    <div class="">
                      <p class="fake-input disable input-xutri" :class="getColorXuTri()">{{ getValueXuTri() || 'N/A' }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="MASTERDATA['IPDMEWS30']" class="mini-box">
                <div class="box-left">
                  <p class="label fw600 fs14">{{__label(MASTERDATA['IPDMEWS30'])}}: </p>
                  <!-- y nghia -->
                  <div class="dropdown">
                  <div class="dropdow-y-nghia" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-double-down"></i> {{__t('AdultVitalSigns.y_nghia')}}</div>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu3">
                      <p><span class="fw600">T:</span> Thuốc</p>
                      <p><span class="fw600">P:</span> Đạm, dịch nuôi dưỡng</p>
                      <p><span class="fw600">M:</span> Máu và chế phẩm</p>
                      <p><span class="fw600">S:</span> Sữa</p>
                      <p><span class="fw600">AN:</span> Ăn uống</p>
                      <p><span class="fw600">D:</span> Dịch truyền</p>
                    </div>
                  </div>
                </div>
                <div class="box-right box-right4">
                  <div class="bix-box-flex">
                    <div class="flex-box">
                      <MDCheckbox :noFlex="true" :indexs="[2]" v-model="MASTERDATA['IPDMEWS30']" @pushIndex="setOnchange"/>
                      <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDMEWS30'].Items[2].Value" :code="MASTERDATA['IPDMEWS30'].Items[2].Code" v-model="MASTERDATA['IPDMEWS30'].Items[3].Value" />
                    </div>
                    <div class="flex-box">
                      <MDCheckbox :noFlex="true" :indexs="[6]" v-model="MASTERDATA['IPDMEWS30']" @pushIndex="setOnchange"/>
                      <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDMEWS30'].Items[6].Value" :code="MASTERDATA['IPDMEWS30'].Items[6].Code" v-model="MASTERDATA['IPDMEWS30'].Items[5].Value" />
                    </div>
                    <div class="flex-box">
                      <MDCheckbox :noFlex="true" :indexs="[7]" v-model="MASTERDATA['IPDMEWS30']" @pushIndex="setOnchange"/>
                      <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDMEWS30'].Items[7].Value" :code="MASTERDATA['IPDMEWS30'].Items[7].Code" v-model="MASTERDATA['IPDMEWS30'].Items[0].Value" />
                    </div>
                    <div class="flex-box">
                      <MDCheckbox :noFlex="true" :indexs="[8]" v-model="MASTERDATA['IPDMEWS30']" @pushIndex="setOnchange"/>
                      <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDMEWS30'].Items[8].Value" :code="MASTERDATA['IPDMEWS30'].Items[8].Code" v-model="MASTERDATA['IPDMEWS30'].Items[1].Value" />
                    </div>
                    <div class="flex-box">
                      <MDCheckbox :noFlex="true" :indexs="[12]" v-model="MASTERDATA['IPDMEWS30']" @pushIndex="setOnchange"/>
                      <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDMEWS30'].Items[12].Value" :code="MASTERDATA['IPDMEWS30'].Items[12].Code" v-model="MASTERDATA['IPDMEWS30'].Items[9].Value" />
                    </div>
                    <div class="flex-box">
                      <MDCheckbox :noFlex="true" :indexs="[13]" v-model="MASTERDATA['IPDMEWS30']" @pushIndex="setOnchange"/>
                      <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDMEWS30'].Items[13].Value" :code="MASTERDATA['IPDMEWS30'].Items[13].Code" v-model="MASTERDATA['IPDMEWS30'].Items[10].Value" />
                    </div>
                  </div>
                  <div class="box-mini-left flex align-center">
                    <div class="fw600">{{__t('AdultVitalSigns.labelCustomer4')}} </div><span class="none">{{getTotalDichVao()}}</span>
                    <FakeInput :dfl="true" v-model="MASTERDATA['IPDMEWS30'].Items[4].Value"/>
                  </div>
                </div>
              </div>
              <div v-if="MASTERDATA['IPDMEWS45']" class="mini-box">
                <div class="box-left">
                  <p class="label fw600 fs14">{{__label(MASTERDATA['IPDMEWS45'])}}: </p>
                  <!-- y nghia -->
                  <div class="dropdown">
                  <div class="dropdow-y-nghia" id="dropdownMenu5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-double-down"></i> {{__t('AdultVitalSigns.y_nghia')}}</div>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu5">
                      <p><span class="fw600">N:</span> Nôn</p>
                      <p><span class="fw600">Ph:</span> Phân</p>
                      <p><span class="fw600">NT:</span> Nước tiểu</p>
                      <p><span class="fw600">DL:</span> Dẫn lưu</p>
                    </div>
                  </div>
                </div>
                <div class="box-right box-right5">
                  <div>
                    <!-- <MDCheckbox v-model="MASTERDATA['IPDMEWS45']"/> -->
                    <div class="bix-box-flex">
                      <div class="flex-box">
                        <MDCheckbox :noFlex="true" :indexs="[1]" v-model="MASTERDATA['IPDMEWS45']" @pushIndex="setOnchange2"/>
                        <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDMEWS45'].Items[1].Value" :code="MASTERDATA['IPDMEWS45'].Items[1].Code" v-model="MASTERDATA['IPDMEWS45'].Items[4].Value" />
                      </div>
                      <div class="flex-box">
                        <MDCheckbox :noFlex="true" :indexs="[3]" v-model="MASTERDATA['IPDMEWS45']" @pushIndex="setOnchange2"/>
                        <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDMEWS45'].Items[3].Value" :code="MASTERDATA['IPDMEWS45'].Items[3].Code" v-model="MASTERDATA['IPDMEWS45'].Items[10].Value" />
                      </div>
                      <div class="flex-box">
                        <MDCheckbox :noFlex="true" :indexs="[11]" v-model="MASTERDATA['IPDMEWS45']" @pushIndex="setOnchange2"/>
                        <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDMEWS45'].Items[11].Value" :code="MASTERDATA['IPDMEWS45'].Items[11].Code" v-model="MASTERDATA['IPDMEWS45'].Items[5].Value" />
                      </div>
                      <div class="flex-box">
                        <MDCheckbox :noFlex="true" :indexs="[7]" v-model="MASTERDATA['IPDMEWS45']" @pushIndex="setOnchange2"/>
                        <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDMEWS45'].Items[7].Value" :code="MASTERDATA['IPDMEWS45'].Items[7].Code" v-model="MASTERDATA['IPDMEWS45'].Items[9].Value" />
                      </div>
                    </div>
                  </div>
                  <div class="flex align-center space-between"><span class="fw600">{{__t('AdultVitalSigns.labelCustomer3')}}</span> <span class="none">{{getTotalDichRa()}}</span>
                    <FakeInput :dfl="true" v-model="MASTERDATA['IPDMEWS45'].Items[2].Value" /></div>
                </div>
              </div>

              <div v-if="MASTERDATA['IPDMEWS45']" class="mini-box mini-box2">
                  <div class="fs14 text fw600" style="margin-right: 5px!important;">{{__t('AdultVitalSigns.labelCustomer2')}}</div><span class="none">{{getTotalBilan()}}</span>
                  <FakeInput :dfl="true" class="input-bilan" v-model="MASTERDATA['IPDMEWS45'].Items[8].Value" />
              </div>
            </div>
          </div>
          <button v-if="!viewOnly" class="btn btn-yellow-gradient btn-block" v-shortkey="['ctrl', 's']" @shortkey="handleSubmit()" @click="handleSubmit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
        </div>
      </modal>
      <modal name="closeWarning" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
        <div class="box v-model-content-popup">
          <div class="box-header text-center">
            <div style="color: #fff">
              {{ __t('Cảnh báo') }}
            </div>
          </div>
          <div class="box-body">{{__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu')}}</div>
          <div class="form-confirm" style="display: flex; justify-content: flex-start; direction: rtl">
            <button class="btn btn-warning" @click="confirmClose()">{{__t('Đồng ý')}}</button>
            <button class="btn" style="margin-right: 12px" @click="confirmSkip()">{{__t('Hủy bỏ')}}</button>
          </div>
        </div>
      </modal>
    </div>
    <!-- footer -->
    <FloatBlock v-if="!viewOnly" :showForm="showForm" @handleBack="handleBack">
      <template slot='buttons'>
        <div class="col-md-2 col-sm-2">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-4 col-sm-4">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-6 col-sm-6" v-if="hasRole('MEWS02') && !IsLocked">
          <div class="form-group1">
            <button v-if="!showForm" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleInsert"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.them_theo_doi')}}</button>
            <!-- <button v-else class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button> -->
          </div>
        </div>
      </template>
    </FloatBlock>
  </div>
</template>

<script>
import MixinMasterData from '@/mixins/masterdata.js'
import _ from 'lodash'
import moment from 'moment'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import constants from '@/constants'
import VSelect from '@/components/VSelect.vue'
import PageTable from './PageTable.vue'
import IPDVitalSignAdult from '@/services/IPD/AdultVitalSigns/GetDetailVitalSignAdult'
import InsertVitalSignAdult from '@/services/IPD/AdultVitalSigns/InsertVitalSignAdult'
import EventBus from '@/lib/eventBus'

const MODAL_WIDTH = 1200

export default {
  name: 'AdultVitalSigns-PageNurse',
  props: {
    viewOnly: {
      type: Boolean,
      default: false
    },
    VisitId: ''
  },
  components: {
    VDateTimePicker,
    VSelect,
    PageTable
  },
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      checkEdited: false,
      dataMaster: null,
      loaded: false,
      nullContent: true,
      time: moment().format('HH:mm DD/MM/YYYY'),
      SENSE: constants.SENSE,
      RESPIRATORY: constants.RESPIRATORY,
      colorClass: '',
      showForm: false,
      DataSubmit: {
        CreatedAt: '',
        CreatedBy: '',
        Datas: [],
        Id: '',
        IsLocked: false,
        TransactionDate: '',
        UpdatedAt: '',
        VisitId: ''
      },
      optionDiemDau: [
        {
          label: 'VAS',
          value: 'VAS'
        },
        {
          label: 'FLAC',
          value: 'FLAC'
        },
        {
          label: 'FACE',
          value: 'FACE'
        },
        {
          label: 'R-FLACC',
          value: 'R-FLACC'
        },
        {
          label: 'N-PASS',
          value: 'N-PASS'
        }
      ],
      optionMaoMach: [
        {
          label: 'T1',
          value: 'T1'
        },
        {
          label: 'T2',
          value: 'T2'
        },
        {
          label: 'T3',
          value: 'T3'
        },
        {
          label: 'S1',
          value: 'S1'
        },
        {
          label: 'S2',
          value: 'S2'
        },
        {
          label: 'S3',
          value: 'S3'
        }
      ],
      optionVein: [
        {
          label: '00',
          value: '00'
        },
        {
          label: '01',
          value: '01'
        },
        {
          label: '02',
          value: '02'
        },
        {
          label: '03',
          value: '03'
        },
        {
          label: '04',
          value: '04'
        },
        {
          label: '05',
          value: '05'
        }
      ],
      MDCODES: [
        'IPDMEWS30',
        'IPDMEWS45'
      ],
      idRow: '',
      IsLocked: false
    }
  },
  mixins: [MixinMasterData],
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
    this.getMasterData()
    EventBus.$on('getNullContent', this.getNullContent)
    EventBus.$on('getIsLocked', this.getIsLocked)
  },
  computed: {
    isNew: function () {
      return !this.isReadonly && this.DataSubmit && this.DataSubmit.CreatedAt === this.DataSubmit.UpdatedAt
    },
    isReadonly: function () {
      return this.DataSubmit.ConfirmBy || this.readonly
    }
  },
  watch: {
    MASTERDATA: {
      handler () {
        if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
          this.checkEdited = true
        }
      },
      deep: true
    },
    showForm: {
      handler () {
        if (this.showForm) {
          this.$modal.show('MasterDataPopup')
        }
      }
    }
  },
  methods: {
    getMasterData () {
      this.getMasterDatas({Form: 'A02_031_220321_V'}, () => {
        // this.getData()
        this.dataMaster = JSON.stringify(this.MASTERDATA)
      })
    },
    getNullContent (val) {
      this.nullContent = val
    },
    getIsLocked (val) {
      this.IsLocked = val
    },
    // master data
    getData (id) {
      new IPDVitalSignAdult().hideErrorMsg().find(this._VisitId + '/' + id).then(response => {
        this.DataSubmit = response
        this.time = response.TransactionDate || moment().format('HH:mm DD/MM/YYYY')
        this.mapMdData2Data()
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
              } else {
              }
            })
          }
        }
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        this.checkEdited = false
      }).catch(e => {
        this.loaded = true
        if (e.status === 404) {}
      })
    },
    handleSubmit () {
      // this.$v.MASTERDATA.$touch()
      this.DataSubmit.Datas = []
      if (!this._VisitId) return
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
            } else {
            }
          })
        }
      }
      this.validateForm()
      this.mapData2MDData()
      // this.mapDataIntervention()
      const DataSubmit = Object.assign({}, this.DataSubmit)
      if (this.time) {
        DataSubmit.TransactionDate = this.time
      }
      if (this.idRow) {
        DataSubmit.Id = this.idRow
      } else {
        DataSubmit.Id = ''
      }
      new InsertVitalSignAdult().update('Insert/' + this._VisitId, DataSubmit).then(async () => {
        await this.getData()
        this.showForm = false
        this.confirmClose()
        this.toastedSuccess()
        this.getMasterData()
        EventBus.$emit('reloadTableAdultVitalSigns')
        await setTimeout(() => {
          EventBus.$emit('reloadUpdateFormAdultVitalSigns')
        }, 500)
      })
    },
    closeModal () {
      this.edited = false
      if (this.checkEdited) {
        this.$modal.show('closeWarning')
      } else {
        this.confirmClose()
      }
    },
    validateForm () {
      let errors = []
      // duong mau mao mach
      if ((this.MASTERDATA['IPDMEWS22'].Items[0].Value && this.MASTERDATA['IPDMEWS22'].Items[1].Value === '') || (this.MASTERDATA['IPDMEWS22'].Items[0].Value && this.MASTERDATA['IPDMEWS22'].Items[1].Value === null)) {
        errors.push(this.MASTERDATA['IPDMEWS22'].Items[0])
      }
      // so luong dich vao
      if ((this.MASTERDATA['IPDMEWS30'].Items[2].Value && this.MASTERDATA['IPDMEWS30'].Items[3].Value === '') || (this.MASTERDATA['IPDMEWS30'].Items[2].Value && this.MASTERDATA['IPDMEWS30'].Items[3].Value === null)) {
        errors.push(this.MASTERDATA['IPDMEWS30'].Items[2])
      }
      if ((this.MASTERDATA['IPDMEWS30'].Items[6].Value && this.MASTERDATA['IPDMEWS30'].Items[5].Value === '') || (this.MASTERDATA['IPDMEWS30'].Items[6].Value && this.MASTERDATA['IPDMEWS30'].Items[5].Value === null)) {
        errors.push(this.MASTERDATA['IPDMEWS30'].Items[6])
      }
      if ((this.MASTERDATA['IPDMEWS30'].Items[7].Value && this.MASTERDATA['IPDMEWS30'].Items[0].Value === '') || (this.MASTERDATA['IPDMEWS30'].Items[7].Value && this.MASTERDATA['IPDMEWS30'].Items[0].Value === null)) {
        errors.push(this.MASTERDATA['IPDMEWS30'].Items[7])
      }
      if ((this.MASTERDATA['IPDMEWS30'].Items[8].Value && this.MASTERDATA['IPDMEWS30'].Items[1].Value === '') || (this.MASTERDATA['IPDMEWS30'].Items[8].Value && this.MASTERDATA['IPDMEWS30'].Items[1].Value === null)) {
        errors.push(this.MASTERDATA['IPDMEWS30'].Items[8])
      }
      if ((this.MASTERDATA['IPDMEWS30'].Items[12].Value && this.MASTERDATA['IPDMEWS30'].Items[9].Value === '') || (this.MASTERDATA['IPDMEWS30'].Items[12].Value && this.MASTERDATA['IPDMEWS30'].Items[9].Value === null)) {
        errors.push(this.MASTERDATA['IPDMEWS30'].Items[12])
      }
      if ((this.MASTERDATA['IPDMEWS30'].Items[13].Value && this.MASTERDATA['IPDMEWS30'].Items[10].Value === '') || (this.MASTERDATA['IPDMEWS30'].Items[13].Value && this.MASTERDATA['IPDMEWS30'].Items[10].Value === null)) {
        errors.push(this.MASTERDATA['IPDMEWS30'].Items[13])
      }
      // so luong dich ra
      if ((this.MASTERDATA['IPDMEWS45'].Items[1].Value && this.MASTERDATA['IPDMEWS45'].Items[4].Value === '') || (this.MASTERDATA['IPDMEWS45'].Items[1].Value && this.MASTERDATA['IPDMEWS45'].Items[4].Value === null)) {
        errors.push(this.MASTERDATA['IPDMEWS45'].Items[1])
      }
      if ((this.MASTERDATA['IPDMEWS45'].Items[3].Value && this.MASTERDATA['IPDMEWS45'].Items[10].Value === '') || (this.MASTERDATA['IPDMEWS45'].Items[3].Value && this.MASTERDATA['IPDMEWS45'].Items[10].Value === null)) {
        errors.push(this.MASTERDATA['IPDMEWS45'].Items[3])
      }
      if ((this.MASTERDATA['IPDMEWS45'].Items[11].Value && this.MASTERDATA['IPDMEWS45'].Items[5].Value === '') || (this.MASTERDATA['IPDMEWS45'].Items[11].Value && this.MASTERDATA['IPDMEWS45'].Items[5].Value === null)) {
        errors.push(this.MASTERDATA['IPDMEWS45'].Items[11])
      }
      if ((this.MASTERDATA['IPDMEWS45'].Items[7].Value && this.MASTERDATA['IPDMEWS45'].Items[9].Value === '') || (this.MASTERDATA['IPDMEWS45'].Items[7].Value && this.MASTERDATA['IPDMEWS45'].Items[9].Value === null)) {
        errors.push(this.MASTERDATA['IPDMEWS45'].Items[7])
      }
      // nhip tho
      if (this.MASTERDATA['IPDMEWS00'].Items[0].Value === '' || this.MASTERDATA['IPDMEWS00'].Items[0].Value === null) {
        errors.push(this.MASTERDATA['IPDMEWS00'].Items[0])
      }
      // mach
      if (this.MASTERDATA['IPDMEWS08'].Items[0].Value === '' || this.MASTERDATA['IPDMEWS08'].Items[0].Value === null) {
        errors.push(this.MASTERDATA['IPDMEWS08'].Items[0])
      }
      // than nhiet
      if (this.MASTERDATA['IPDMEWS10'].Items[0].Value === '' || this.MASTERDATA['IPDMEWS10'].Items[0].Value === null) {
        errors.push(this.MASTERDATA['IPDMEWS10'].Items[0])
      }
      if (errors.length) {
        console.log('errors: ', errors)
        this.handlerResponse({Error: errors})
      }
    },
    handleInsert () {
      this.time = moment().format('HH:mm DD/MM/YYYY')
      this.idRow = ''
      this.nullContent = false
      this.showForm = true
      this.checkEdited = false
      // this.scroll2Bottom()
    },
    mapDataIntervention () {
      // map noi dung
      this.MDCODES.forEach(code => {
        if (this.MASTERDATA[code].Items) {
          this.MASTERDATA[code].Items.forEach(item => {
            if (item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: item.ViName,
                EnName: item.EnName,
                Code: item.Code,
                Value: item.Value,
                Group: {
                  ViName: this.MASTERDATA[code].ViName,
                  EnName: this.MASTERDATA[code].EnName,
                  Code: item.Group
                }
              })
            }
          })
        }
      })
      this.DataSubmit.Intervention = JSON.stringify(this.DataSubmit.Intervention)
    },
    getTongMews () {
      let num = 0
      let isNum = false
      // nhip tho
      if (this.MASTERDATA['IPDMEWS00'].Items[0].Value !== '' && this.MASTERDATA['IPDMEWS00'].Items[0].Value !== null) {
        isNum = true
        if (parseInt(this.MASTERDATA['IPDMEWS00'].Items[0].Value) >= 35) {
          num += 3
        }
        if (parseInt(this.MASTERDATA['IPDMEWS00'].Items[0].Value) <= 34 && parseInt(this.MASTERDATA['IPDMEWS00'].Items[0].Value) >= 30) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDMEWS00'].Items[0].Value) <= 29 && parseInt(this.MASTERDATA['IPDMEWS00'].Items[0].Value) >= 25) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDMEWS00'].Items[0].Value) <= 24 && parseInt(this.MASTERDATA['IPDMEWS00'].Items[0].Value) >= 20) {
          num += 1
        }
        if (parseInt(this.MASTERDATA['IPDMEWS00'].Items[0].Value) <= 19 && parseInt(this.MASTERDATA['IPDMEWS00'].Items[0].Value) >= 15) {
          num += 0
        }
        if (parseInt(this.MASTERDATA['IPDMEWS00'].Items[0].Value) <= 14 && parseInt(this.MASTERDATA['IPDMEWS00'].Items[0].Value) >= 10) {
          num += 1
        }
        if (parseInt(this.MASTERDATA['IPDMEWS00'].Items[0].Value) <= 9 && parseInt(this.MASTERDATA['IPDMEWS00'].Items[0].Value) >= 6) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDMEWS00'].Items[0].Value) <= 5) {
          num += 3
        }
      }
      // sp02
      if (this.MASTERDATA['IPDMEWS02'].Items[1].Value !== '' && this.MASTERDATA['IPDMEWS02'].Items[1].Value !== null) {
        isNum = true
        if (this.MASTERDATA['IPDMEWS02'].Items[0].Value) {
          if (parseInt(this.MASTERDATA['IPDMEWS02'].Items[1].Value) >= 88) {
            num += 0
          }
          if (parseInt(this.MASTERDATA['IPDMEWS02'].Items[1].Value) <= 87 && parseInt(this.MASTERDATA['IPDMEWS02'].Items[1].Value) >= 86) {
            num += 1
          }
          if (parseInt(this.MASTERDATA['IPDMEWS02'].Items[1].Value) <= 85 && parseInt(this.MASTERDATA['IPDMEWS02'].Items[1].Value) >= 84) {
            num += 2
          }
          if (parseInt(this.MASTERDATA['IPDMEWS02'].Items[1].Value) <= 83) {
            num += 3
          }
        } else {
          if (parseInt(this.MASTERDATA['IPDMEWS02'].Items[1].Value) >= 95) {
            num += 0
          }
          if (parseInt(this.MASTERDATA['IPDMEWS02'].Items[1].Value) <= 94 && parseInt(this.MASTERDATA['IPDMEWS02'].Items[1].Value) >= 90) {
            num += 1
          }
          if (parseInt(this.MASTERDATA['IPDMEWS02'].Items[1].Value) <= 89 && parseInt(this.MASTERDATA['IPDMEWS02'].Items[1].Value) >= 85) {
            num += 2
          }
          if (parseInt(this.MASTERDATA['IPDMEWS02'].Items[1].Value) <= 84) {
            num += 3
          }
        }
      }
      // huyet ap
      if (this.MASTERDATA['IPDMEWS05'].Items[0].Value !== '' && this.MASTERDATA['IPDMEWS05'].Items[0].Value !== null) {
        isNum = true
        if (parseInt(this.MASTERDATA['IPDMEWS05'].Items[0].Value) >= 180) {
          num += 3
        }
        if (parseInt(this.MASTERDATA['IPDMEWS05'].Items[0].Value) <= 179 && parseInt(this.MASTERDATA['IPDMEWS05'].Items[0].Value) >= 160) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDMEWS05'].Items[0].Value) <= 159 && parseInt(this.MASTERDATA['IPDMEWS05'].Items[0].Value) >= 150) {
          num += 1
        }
        if (parseInt(this.MASTERDATA['IPDMEWS05'].Items[0].Value) <= 149 && parseInt(this.MASTERDATA['IPDMEWS05'].Items[0].Value) >= 90) {
          num += 0
        }
        if (parseInt(this.MASTERDATA['IPDMEWS05'].Items[0].Value) <= 89 && parseInt(this.MASTERDATA['IPDMEWS05'].Items[0].Value) >= 80) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDMEWS05'].Items[0].Value) <= 79) {
          num += 3
        }
      }
      // mach
      if (this.MASTERDATA['IPDMEWS08'].Items[0].Value !== '' && this.MASTERDATA['IPDMEWS08'].Items[0].Value !== null) {
        isNum = true
        if (parseInt(this.MASTERDATA['IPDMEWS08'].Items[0].Value) >= 140) {
          num += 3
        }
        if (parseInt(this.MASTERDATA['IPDMEWS08'].Items[0].Value) <= 139 && parseInt(this.MASTERDATA['IPDMEWS08'].Items[0].Value) >= 120) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDMEWS08'].Items[0].Value) <= 119 && parseInt(this.MASTERDATA['IPDMEWS08'].Items[0].Value) >= 100) {
          num += 1
        }
        if (parseInt(this.MASTERDATA['IPDMEWS08'].Items[0].Value) <= 99 && parseInt(this.MASTERDATA['IPDMEWS08'].Items[0].Value) >= 60) {
          num += 0
        }
        if (parseInt(this.MASTERDATA['IPDMEWS08'].Items[0].Value) <= 59 && parseInt(this.MASTERDATA['IPDMEWS08'].Items[0].Value) >= 50) {
          num += 1
        }
        if (parseInt(this.MASTERDATA['IPDMEWS08'].Items[0].Value) <= 49 && parseInt(this.MASTERDATA['IPDMEWS08'].Items[0].Value) >= 40) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDMEWS08'].Items[0].Value) < 39) {
          num += 3
        }
      }
      // than nhiet
      if (this.MASTERDATA['IPDMEWS10'].Items[0].Value !== '' && this.MASTERDATA['IPDMEWS10'].Items[0].Value !== null) {
        isNum = true
        if (this.MASTERDATA['IPDMEWS10'].Items[0].Value >= 41) {
          num += 3
        }
        if (this.MASTERDATA['IPDMEWS10'].Items[0].Value <= 40.9 && this.MASTERDATA['IPDMEWS10'].Items[0].Value >= 38.5) {
          num += 2
        }
        if (this.MASTERDATA['IPDMEWS10'].Items[0].Value <= 38.4 && this.MASTERDATA['IPDMEWS10'].Items[0].Value >= 38) {
          num += 1
        }
        if (this.MASTERDATA['IPDMEWS10'].Items[0].Value <= 37.9 && this.MASTERDATA['IPDMEWS10'].Items[0].Value >= 36) {
          num += 0
        }
        if (this.MASTERDATA['IPDMEWS10'].Items[0].Value <= 35.9 && this.MASTERDATA['IPDMEWS10'].Items[0].Value >= 35.5) {
          num += 1
        }
        if (this.MASTERDATA['IPDMEWS10'].Items[0].Value <= 35.4 && this.MASTERDATA['IPDMEWS10'].Items[0].Value >= 35) {
          num += 2
        }
        if (this.MASTERDATA['IPDMEWS10'].Items[0].Value < 35) {
          num += 3
        }
      }
      // tri giac
      if (this.MASTERDATA['IPDMEWS12'].Items[0].Value !== '' && this.MASTERDATA['IPDMEWS12'].Items[0].Value !== null) {
        isNum = true
        if (this.MASTERDATA['IPDMEWS12'].Items[0].Value === 'A') {
          num += 0
        }
        if (this.MASTERDATA['IPDMEWS12'].Items[0].Value === 'V') {
          num += 2
        }
        if (this.MASTERDATA['IPDMEWS12'].Items[0].Value === 'P') {
          num += 3
        }
        if (this.MASTERDATA['IPDMEWS12'].Items[0].Value === 'U') {
          num += 3
        }
      }
      // ho tro ho hap
      if (this.MASTERDATA['IPDMEWS15'].Items[0].Value !== '' && this.MASTERDATA['IPDMEWS15'].Items[0].Value !== null && this.MASTERDATA['IPDMEWS15'].Items[0].Value !== 'Không') {
        isNum = true
        num += 2
      }
      if (num <= 2 && num >= 0 && isNum) {
        this.colorClass = 'color-blue2'
      }
      if (num === 0 && !isNum) {
        this.colorClass = ''
        num = ''
      }
      if (num <= 4 && num >= 3) {
        this.colorClass = 'color-green3'
      }
      if (num < 7 && num >= 5) {
        this.colorClass = 'color-yellow3'
      }
      if (num >= 7) {
        this.colorClass = 'color-red3'
      }
      this.MASTERDATA['IPDMEWS17'].Items[0].Value = num
      return num
    },
    getTotalDichVao () {
      let num = 0
      let isNum = false
      if (this.MASTERDATA['IPDMEWS30']) {
        if (this.MASTERDATA['IPDMEWS30'].Items[3].Value !== '' && this.MASTERDATA['IPDMEWS30'].Items[3].Value !== null) {
          num += Number(this.MASTERDATA['IPDMEWS30'].Items[3].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDMEWS30'].Items[5].Value !== '' && this.MASTERDATA['IPDMEWS30'].Items[5].Value !== null) {
          num += Number(this.MASTERDATA['IPDMEWS30'].Items[5].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDMEWS30'].Items[0].Value !== '' && this.MASTERDATA['IPDMEWS30'].Items[0].Value !== null) {
          num += Number(this.MASTERDATA['IPDMEWS30'].Items[0].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDMEWS30'].Items[1].Value !== '' && this.MASTERDATA['IPDMEWS30'].Items[1].Value !== null) {
          num += Number(this.MASTERDATA['IPDMEWS30'].Items[1].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDMEWS30'].Items[9].Value !== '' && this.MASTERDATA['IPDMEWS30'].Items[9].Value !== null) {
          num += Number(this.MASTERDATA['IPDMEWS30'].Items[9].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDMEWS30'].Items[10].Value !== '' && this.MASTERDATA['IPDMEWS30'].Items[10].Value !== null) {
          num += Number(this.MASTERDATA['IPDMEWS30'].Items[10].Value)
          isNum = true
        }
      }
      if (!isNum) {
        this.MASTERDATA['IPDMEWS30'].Items[4].Value = ''
      } else {
        this.MASTERDATA['IPDMEWS30'].Items[4].Value = num
      }
      return num
    },
    getTotalDichRa () {
      let num = 0
      let isNum = false
      if (this.MASTERDATA['IPDMEWS45']) {
        if (this.MASTERDATA['IPDMEWS45'].Items[4].Value !== '' && this.MASTERDATA['IPDMEWS45'].Items[4].Value !== null) {
          num += Number(this.MASTERDATA['IPDMEWS45'].Items[4].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDMEWS45'].Items[10].Value !== '' && this.MASTERDATA['IPDMEWS45'].Items[10].Value !== null) {
          num += Number(this.MASTERDATA['IPDMEWS45'].Items[10].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDMEWS45'].Items[5].Value !== '' && this.MASTERDATA['IPDMEWS45'].Items[5].Value !== null) {
          num += Number(this.MASTERDATA['IPDMEWS45'].Items[5].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDMEWS45'].Items[9].Value !== '' && this.MASTERDATA['IPDMEWS45'].Items[9].Value !== null) {
          num += Number(this.MASTERDATA['IPDMEWS45'].Items[9].Value)
          isNum = true
        }
      }
      if (!isNum) {
        this.MASTERDATA['IPDMEWS45'].Items[2].Value = ''
      } else {
        this.MASTERDATA['IPDMEWS45'].Items[2].Value = num
      }
      return num
    },
    getTotalBilan () {
      let num = 0
      let isNum = false
      if (this.MASTERDATA['IPDMEWS30'].Items[4].Value !== '' && this.MASTERDATA['IPDMEWS30'].Items[4].Value !== null) {
        num += Number(this.MASTERDATA['IPDMEWS30'].Items[4].Value)
        isNum = true
      }
      if (this.MASTERDATA['IPDMEWS45'].Items[2].Value !== '' && this.MASTERDATA['IPDMEWS45'].Items[2].Value !== null) {
        num -= Number(this.MASTERDATA['IPDMEWS45'].Items[2].Value)
        isNum = true
      }
      if (!isNum) {
        this.MASTERDATA['IPDMEWS45'].Items[8].Value = ''
      } else {
        this.MASTERDATA['IPDMEWS45'].Items[8].Value = num
      }
      return num
    },
    setOnchange2 (index) {
      let dex = ''
      if (index === 1) {
        dex = 4
      }
      if (index === 3) {
        dex = 10
      }
      if (index === 11) {
        dex = 5
      }
      if (index === 7) {
        dex = 9
      }
      if (this.MASTERDATA['IPDMEWS45'].Items[index].Value) {
        this.MASTERDATA['IPDMEWS45'].Items[dex].Value = ''
      }
    },
    setOnchange (index) {
      let dex = ''
      if (index === 2) {
        dex = 3
      }
      if (index === 6) {
        dex = 5
      }
      if (index === 7) {
        dex = 0
      }
      if (index === 8) {
        dex = 1
      }
      if (index === 12) {
        dex = 9
      }
      if (index === 13) {
        dex = 10
      }
      if (this.MASTERDATA['IPDMEWS30'].Items[index].Value) {
        this.MASTERDATA['IPDMEWS30'].Items[dex].Value = ''
      }
    },
    getValueXuTri () {
      // this.__t('Bỏ qua'),
      this.MASTERDATA['IPDMEWS25'].Items[3].Value = this.MASTERDATA['IPDMEWS25'].Items[1].Value
      switch (this.MASTERDATA['IPDMEWS25'].Items[1].Value) {
        case '00':
          return this.__t('AdultVitalSigns.XuTri.label0')
        case '01':
          return this.__t('AdultVitalSigns.XuTri.label1')
        case '02':
          return this.__t('AdultVitalSigns.XuTri.label2')
        case '03':
          return this.__t('AdultVitalSigns.XuTri.label3')
        case '04':
          return this.__t('AdultVitalSigns.XuTri.label4')
        case '05':
          return this.__t('AdultVitalSigns.XuTri.label5')
        default:
          return ''
      }
    },
    getColorXuTri () {
      let color = ''
      const val = this.MASTERDATA['IPDMEWS25'].Items[1].Value
      if (val) {
        if (val === '00') {
          color = 'colorGreen'
        } else if (val === '01') {
          color = 'colorYellow'
        } else {
          color = 'colorRed'
        }
      }
      return color
    },
    handleEdit (id) {
      this.showForm = true
      this.idRow = id
      this.checkEdited = false
      // this.scroll2Bottom()
      this.getData(id)
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    confirmSkip () {
      this.$modal.hide('closeWarning')
    },
    confirmClose () {
      this.showForm = false
      this.resetMdDataValueVitalSigns()
      this.$modal.hide('closeWarning')
      this.$modal.hide('MasterDataPopup')
    },
    // popup canh bao
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: 'Thông báo',
        text: 'Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu',
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'Đồng ý',
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: 'Huỷ bỏ',
            class: 'btn',
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
<style lang="stylus" scoped>
.sync-ed-header {
  text-align: center;
  font-size: 20px;
}
.name {
    margin-left: 10px;
  }
.AdultVitalSigns-PageNurse {
  .null-content {
    text-align: center;
  }
  .title-date {
    margin-right: 10px;
  }.
  .box-content {
  }
  th {
    word-wrap: break-word;
    text-align: center;
  }
  .drop-meaningful {
    cursor: pointer;
  }
  .table-dropdow td {
    text-align: left;
  }
  .box-action {
    display: flex;
    align-items: center;
  }
  .checkbox-left {
    margin-right: 10px;
  }
  .label {
    color: #333;
  }
  .big-box {
    .mini-box {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      .input-mao-mach {
        width: 100px;
      }
      .box-right {
        display: flex;
        align-items: center;
        width: 100%;
        .box-select {
          margin-right: 10px;
          width: 250px;
        }
        .box-input {
          width: 250px;
        }
        .bix-box-flex {
          display: flex;
          justify-content: space-between;
          .flex-box {
            display: flex;
            align-items: center;
            .input-checkbox {
              width: 60px;
              margin-right: 20px;
            }
          }
        }
        .box-mini-left {
          p {
            margin-right: 20px;
          }
        }
      }
      .box-right2 {
        .box-select {
          width: 160px;
        }
      }
      .box-right3 {
        .box-select {
          width: 160px;
        }
        .box-select-xu-tri {
          width: 300px;
          ul {
            li {
              color: red!important;
              a {
                color: red!important;
              }
            }
          }
        }
      }
      .box-right4, .box-right5 {
        .fake-input {
          width: 125px;
          margin-right: 0px!important;
        }
      }
      .box-right3, .box-right4, .box-right5 {
        align-items: center;
        justify-content: space-between;
      }
      .dropdow-y-nghia {
        cursor: pointer;
        width: 120px;
        border: 1px solid #ddd;
        border-radius: 4px;
        text-align: center;
        font-size: 14px;
        &:hover {
          background: #f1f1f1;
        }
      }
      .dropdown-menu {
        width: 300px;
        padding-left: 10px;
        p {
          padding-left: 10px;
        }
      }
    }
    .mini-box2 {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .text {
        margin-right: 20px;
      }
      .fake-input {
        width: 150px;
      }
      .input-bilan {
        width: 125px;
        min-height: 30px;
        padding: 5px 8px;
      }
    }
  }
}
.color-blue2 {
  background: #9FC5F8!important;
}
.color-green3 {
  background: #93C47D!important;
}
.color-yellow3 {
  background: #FFD966!important;
}
.color-red3 {
  background: #E06666!important;
}
.dropdown {
  margin-top: 5px;
}
.align-bottom {
  vertical-align: bottom !important;
}
.input-xutri {
  min-width: 80px;
  max-width: 600px;
}
.colorGreen {
  background: #43A286 !important;
  color: #FFF;
}
.colorYellow {
  background: #F4C74C !important;
  color: #FFF;
}
.colorRed {
  background: #E6472D !important;
  color: #FFF;
}
.box-select-vein {
  width: 80px!important;
}
.error {
  border: 1px solid red!important;
}
@media (max-width: 871px) {
  .box-action {
    display: block!important;
    .checkbox-left {
      margin-right: 0px!important;
    }
  }
}
</style>
