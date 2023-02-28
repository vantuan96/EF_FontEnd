<template>
  <div>
    <div v-show="loaded">
      <div id="NeonatalVitalSigns-PageNurse" class="NeonatalVitalSigns-PageNurse">
        <div class="content">
          <page-table v-if="showTable" @handleEdit="handleEdit" @checkLoaded="getLoaded" :viewOnly="viewOnly" :VisitId="VisitId"/>
          <div v-if="nullContent" class="null-content">{{__t('AdultVitalSigns.labelNull')}}</div>
          <modal name="MasterDataPopup" transition="pop-out" height="auto" :clickToClose="false" :width="modalWidth">
            <div class="sync-ed-header">{{__t('NeonatalVitalSigns.bigTitle')}} <i style="cursor: pointer" @click="closeModal()" class="fa fa-times pull-right fa-2" aria-hidden="true"></i></div>
            <div class="sync-ed-box" style="overflow-x: hidden">
              <div v-if="showForm" class="box-content">
                <!-- box date time -->
                <div class="box1 mrb30 flex align-center">
                  <div class="box-date flex align-center space-between">
                    <div class="title-date fw600">{{__t('AdultVitalSigns.labelTime1')}}</div>
                    <v-date-time-picker :hideTooltip="true" v-model="time" :format="vDateTimeFormat"/>
                  </div>
                  <div class="name fw600">{{__t('HospitalDischargeTable.label2')}}
                    <ad-Info v-if="CreatedBy" :ad="CreatedBy" />
                    <ad-Info v-else :ad="$store.state.account.Username" />
                  </div>
                </div>
                <div class="top-table">
                  <table class="table observation-table">
                    <template>
                      <thead>
                        <tr v-if="MASTERDATA">
                          <th width="100px">
                            <div>
                              <span class="block">Nhịp thở</span>
                              <span class="block">(Lần/phút)</span>
                            </div>
                          </th>
                          <th width="100px">
                            <span class="block">Suy hô hấp</span>
                          </th>
                          <th width="100px">
                            <div>
                              <span class="block">SpO2</span>
                              <span class="block">(%)</span>
                            </div>
                          </th>
                          <th width="100px">Mạch (Nhịp/phút)</th>
                          <th width="100px">Thân nhiệt (oC)</th>
                          <th width="100px">{{__label(MASTERDATA['IPDNEWSOBC14'])}}</th>
                          <th rowspan="2" width="100px">{{__label(MASTERDATA['IPDNEWSOBC17'])}}</th>
                          <th rowspan="2" width="100px">{{__t('Tổng NEWS')}}</th>
                        </tr>
                        <!-- dropdwon y nghia -->
                        <tr v-if="MASTERDATA['IPDNEWSOBC14']">
                          <!-- Nhip tho -->
                          <th>
                            <div class="dropdown">
                              <div class="dropdown-toggle cursor fw200" id="dropdownMeaningful" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDNEWSOBC14'].Items[1])}}
                              </div>
                              <div class="dropdown-menu dropdown-left" aria-labelledby="dropdownMeaningful">
                                <table class="table observation-table table-dropdow" style="width: 500px">
                                  <thead>
                                    <tr>
                                      <th class="no-wrap">Chỉ số</th>
                                      <th class="no-wrap">&#8805; 80</th>
                                      <th class="no-wrap">75-79</th>
                                      <th class="no-wrap">70-74</th>
                                      <th class="no-wrap">65-69</th>
                                      <th class="no-wrap">60-64</th>
                                      <th class="no-wrap">55-59</th>
                                      <th class="no-wrap">50-54</th>
                                      <th class="no-wrap">45-49</th>
                                      <th class="no-wrap">40-44</th>
                                      <th class="no-wrap">35-39</th>
                                      <th class="no-wrap">30-34</th>
                                      <th class="no-wrap">25-29</th>
                                      <th class="no-wrap">20-24</th>
                                      <th class="no-wrap">&#8804; 19</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="text-center">NEWS</td>
                                      <td>3</td>
                                      <td>3</td>
                                      <td>3</td>
                                      <td>2</td>
                                      <td>1</td>
                                      <td>0</td>
                                      <td>0</td>
                                      <td>0</td>
                                      <td>0</td>
                                      <td>0</td>
                                      <td>0</td>
                                      <td>1</td>
                                      <td>2</td>
                                      <td>3</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </th>
                          <!-- Suy ho hap -->
                          <th>
                            <div class="dropdown">
                              <div class="dropdown-toggle cursor fw200" id="dropdownMeaningful" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDNEWSOBC14'].Items[1])}}
                              </div>
                              <div class="dropdown-menu dropdown-left" aria-labelledby="dropdownMeaningful">
                                <table class="table observation-table table-dropdow" style="width: 500px; margin: 0">
                                  <thead>
                                    <tr>
                                      <th class="no-wrap">Chỉ số</th>
                                      <th>{{__t('Nặng')}}</th>
                                      <th>{{__t('Vừa')}}</th>
                                      <th>{{__t('Nhẹ')}}</th>
                                      <th>{{__t('Không')}}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="text-center">NEWS</td>
                                      <td class="text-center">3</td>
                                      <td class="text-center">2</td>
                                      <td class="text-center">1</td>
                                      <td class="text-center">0</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </th>
                          <!-- SpO2 -->
                          <th>
                            <div class="dropdown">
                              <div class="dropdown-toggle cursor fw200" id="dropdownMeaningful" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDNEWSOBC14'].Items[1])}}
                              </div>
                              <div class="dropdown-menu dropdown-left" aria-labelledby="dropdownMeaningful">
                                <table class="table observation-table table-dropdow" style="width: 500px; margin: 0">
                                  <thead>
                                    <tr>
                                      <th class="no-wrap">Chỉ số</th>
                                      <th class="no-wrap">&#8805; 95</th>
                                      <th class="no-wrap">91-94</th>
                                      <th class="no-wrap">85-90</th>
                                      <th class="no-wrap">&#8804; 84</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="text-center">NEWS</td>
                                      <td class="text-center">0</td>
                                      <td class="text-center">1</td>
                                      <td class="text-center">2</td>
                                      <td class="text-center">3</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </th>
                          <!-- Mach -->
                          <th>
                            <div class="dropdown">
                              <div class="dropdown-toggle cursor fw200" id="dropdownMeaningful" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDNEWSOBC14'].Items[1])}}
                              </div>
                              <div class="dropdown-menu dropdown-left" aria-labelledby="dropdownMeaningful">
                                <table class="table observation-table table-dropdow" style="width: 500px; margin: 0">
                                  <thead>
                                    <tr>
                                      <th class="no-wrap">Chỉ số</th>
                                      <th class="no-wrap">&#8805; 180</th>
                                      <th class="no-wrap">170-179</th>
                                      <th class="no-wrap">160-169</th>
                                      <th class="no-wrap">150-159</th>
                                      <th class="no-wrap">140-149</th>
                                      <th class="no-wrap">130-139</th>
                                      <th class="no-wrap">120-129</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="text-center">NEWS</td>
                                      <td>3</td>
                                      <td>2</td>
                                      <td>1</td>
                                      <td>0</td>
                                      <td>0</td>
                                      <td>0</td>
                                      <td>0</td>
                                    </tr>
                                    <tr>
                                      <th class="no-wrap">Chỉ số</th>
                                      <th class="no-wrap">110-119</th>
                                      <th class="no-wrap">100-109</th>
                                      <th class="no-wrap">90-99</th>
                                      <th class="no-wrap">80-89</th>
                                      <th class="no-wrap">70-79</th>
                                      <th class="no-wrap">&#8804; 69</th>
                                    </tr>
                                    <tr>
                                      <td class="text-center">NEWS</td>
                                      <td>0</td>
                                      <td>0</td>
                                      <td>0</td>
                                      <td>1</td>
                                      <td>2</td>
                                      <td>3</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </th>
                          <!-- Than nhiet -->
                          <th>
                            <div class="dropdown">
                              <div class="dropdown-toggle cursor fw200" id="dropdownMeaningful" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDNEWSOBC14'].Items[1])}}
                              </div>
                              <div class="dropdown-menu dropdown-right" aria-labelledby="dropdownMeaningful">
                                <table class="table observation-table table-dropdow" style="width: 500px; margin: 0">
                                  <thead>
                                    <tr>
                                      <th class="no-wrap">Chỉ số</th>
                                      <th class="no-wrap">&#8805; 41</th>
                                      <th class="no-wrap">40-40.9</th>
                                      <th class="no-wrap">39-39.9</th>
                                      <th class="no-wrap">38-38.9</th>
                                      <th class="no-wrap">37.5-37.9</th>
                                      <th class="no-wrap">36.5-37.4</th>
                                      <th class="no-wrap">35.5-36.4</th>
                                      <th class="no-wrap">&#8804; 35.4</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="text-center">NEWS</td>
                                      <td class="text-center">3</td>
                                      <td class="text-center">3</td>
                                      <td class="text-center">3</td>
                                      <td class="text-center">3</td>
                                      <td class="text-center">1</td>
                                      <td class="text-center">0</td>
                                      <td class="text-center">1</td>
                                      <td class="text-center">2</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </th>
                          <!-- Tri giac -->
                          <th>
                            <div class="dropdown">
                              <div class="dropdown-toggle cursor fw200" id="dropdownMeaningful" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDNEWSOBC14'].Items[1])}}
                              </div>
                              <div class="dropdown-menu dropdown-right" aria-labelledby="dropdownMeaningful">
                                <table class="table observation-table table-dropdow" style="width: 500px; margin: 0">
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
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <!-- Nhịp thở -->
                          <td v-if="MASTERDATA['IPDNEWSOBC1']">
                            <div class="box-action">
                              <MDNumberInput v-model="MASTERDATA['IPDNEWSOBC1'].Items[0].Value" :code="MASTERDATA['IPDNEWSOBC1'].Items[0].Code"/>
                            </div>
                          </td>
                          <!-- Suy ho hap -->
                          <td v-if="MASTERDATA['IPDNEWSOBC3']">
                            <div class="box-action">
                              <v-select :disabeleclear="false" class='select-full-w' v-model="MASTERDATA['IPDNEWSOBC3'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionSuyHoHap"/>
                            </div>
                          </td>
                          <!-- SpO2 -->
                          <td v-if="MASTERDATA['IPDNEWSOBC5']">
                            <div class="box-action">
                              <MDNumberInput v-model="MASTERDATA['IPDNEWSOBC5'].Items[0].Value" />
                            </div>
                          </td>
                          <!-- Mạch -->
                          <td v-if="MASTERDATA['IPDNEWSOBC10']">
                            <div class="box-action">
                              <MDNumberInput v-model="MASTERDATA['IPDNEWSOBC10'].Items[0].Value" :code="MASTERDATA['IPDNEWSOBC10'].Items[0].Code"/>
                            </div>
                          </td>
                          <!-- Thân nhiệt -->
                          <td v-if="MASTERDATA['IPDNEWSOBC12']">
                            <div class="box-action">
                              <MDNumberInput :limitDecimal="true" :decimal="true" v-model="MASTERDATA['IPDNEWSOBC12'].Items[0].Value" :code="MASTERDATA['IPDNEWSOBC12'].Items[0].Code"/>
                            </div>
                          </td>
                          <!-- Tri giác -->
                          <td v-if="MASTERDATA['IPDNEWSOBC14']">
                            <v-select :disabeleclear="false" class='select-full-w' v-model="MASTERDATA['IPDNEWSOBC14'].Items[0].Value" :placeholder="__t('Chọn')" :items="SENSE"/>
                          </td>
                          <!-- Hỗ trợ hô hấp -->
                          <td v-if="MASTERDATA['IPDNEWSOBC17']">
                            <v-select :disabeleclear="false" class='select-full-w' v-model="MASTERDATA['IPDNEWSOBC17'].Items[0].Value" :placeholder="__t('Chọn')" :items="RESPIRATORY"/>
                          </td>
                          <!-- Tổng NEWS -->
                          <td v-if="MASTERDATA['IPDNEWSOBC19']">
                            <p class="none">{{ getTongNews() }}</p>
                            <FakeInput :dfl="true" class="fake-input" :class="colorClass ? colorClass : null" v-model="MASTERDATA['IPDNEWSOBC19'].Items[0].Value"/>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </table>
                </div>
                <div class="big-box">
                  <!-- Điểm đau -->
                  <div v-if="MASTERDATA['IPDNEWSOBC21']" class="mini-box">
                    <div class="box-left">
                      <p class="label fw600 fs14">{{__label(MASTERDATA['IPDNEWSOBC21'])}}: </p>
                    </div>
                    <div class="box-right">
                      <v-select :disabeleclear="false" class='select-full-w box-select' v-model="MASTERDATA['IPDNEWSOBC21'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionDiemDau"/>
                      <MDNumberInput v-model="MASTERDATA['IPDNEWSOBC21'].Items[1].Value" style="width: 100px;"/>
                    </div>
                  </div>
                  <!-- Can nang -->
                  <div v-if="MASTERDATA['IPDNEWSOBC25']" class="mini-box">
                    <div class="box-left">
                      <p class="label fw600 fs14">{{__label(MASTERDATA['IPDNEWSOBC25'])}}: </p>
                    </div>
                    <div class="box-right box-right2">
                      <MDNumberInput style="max-width: 120px" :decimal="true" v-model="MASTERDATA['IPDNEWSOBC25'].Items[0].Value" />
                    </div>
                  </div>
                  <!-- Đường máu toàn phần -->
                  <div v-if="MASTERDATA['IPDNEWSOBC27']" class="mini-box">
                    <div class="box-left">
                      <p class="label fw600 fs14">{{__label(MASTERDATA['IPDNEWSOBC27'])}}: </p>
                      <!-- y nghia -->
                      <div class="dropdown">
                      <div class="dropdow-y-nghia" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-double-down"></i> {{__t('AdultVitalSigns.y_nghia')}}</div>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
                          <p><span class="fw600">T1: </span>Trước bữa sáng</p>
                          <p><span class="fw600">T2: </span>Trước bữa trưa</p>
                          <p><span class="fw600">T3: </span>Trước bữa tối</p>
                          <p><span class="fw600">T: </span>4.4 - 7.2 mmol/L</p>
                          <p><span class="fw600">S1: </span>Sau bữa sáng</p>
                          <p><span class="fw600">S2: </span>Sau bữa trưa</p>
                          <p><span class="fw600">S3: </span>Sau bữa tối</p>
                          <p><span class="fw600">S: </span>&#60; 10 mmol/L</p>
                        </div>
                      </div>
                    </div>
                    <div class="box-right box-right2">
                      <div class="flex-box flex-center">
                        <v-select :disabeleclear="false" class='select-full-w box-select box-select-vein' v-model="MASTERDATA['IPDNEWSOBC27'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionMaoMach"/>
                        <div v-if="MASTERDATA['IPDNEWSOBC27'].Items[0].Value">
                          <MDNumberInput class="ml-10" style="max-width: 108px" :maxlength="5" :decimal="true" :code="MASTERDATA['IPDNEWSOBC27'].Items[1].Code" v-model="MASTERDATA['IPDNEWSOBC27'].Items[1].Value" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Đánh giá vein truyền -->
                  <div v-if="MASTERDATA['IPDNEWSOBC42']" class="mini-box">
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
                      <v-select :disabeleclear="false" class='select-full-w box-select box-select-vein' v-model="MASTERDATA['IPDNEWSOBC42'].Items[1].Value" :placeholder="__t('Chọn')" :items="optionVein"/>
                      <!-- Cách xử trí -->
                      <div class="flex align-center">
                        <span style="word-break: break-word; margin-right: 5px;" class="fw600">{{'Can thiệp xử trí'}}:</span>
                        <div class="">
                          <p class="fake-input disable input-xutri" :class="getColorXuTri()">{{ getValueXuTri() || 'N/A' }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Danh gia suy ho hap -->
                  <div class="mini-box">
                    <div class="box-left">
                      <p class="label fw600 fs14">{{__label(MASTERDATA['IPDNEWSOBC47'])}} (Điểm Silverman): </p>
                    </div>
                  </div>
                  <div>
                    <table class="table observation-table">
                      <template>
                        <thead>
                          <tr v-if="MASTERDATA">
                            <th rowspan="2" width="100px">
                              <div>
                                <span class="block">Co rút ngực trên</span>
                              </div>
                            </th>
                            <th rowspan="2" width="100px">
                              <span class="block">Co rút ngực dưới</span>
                            </th>
                            <th rowspan="2" width="100px">
                              <div>
                                <span class="block">Rút lõm hõm ngực</span>
                              </div>
                            </th>
                            <th rowspan="2" width="100px">Nở cánh mũi</th>
                            <th rowspan="2" width="100px">Rên</th>
                            <th width="100px">Mức độ</th>
                          </tr>
                          <!-- dropdwon y nghia -->
                          <tr>
                            <th>
                              <div class="dropdown">
                                <div class="dropdown-toggle cursor fw200" id="dropdownMeaningful" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDNEWSOBC14'].Items[1])}}
                                </div>
                                <div class="dropdown-menu dropdown-right" aria-labelledby="dropdownMeaningful">
                                  <table class="table observation-table table-dropdow" style="width: 500px">
                                    <thead>
                                      <tr>
                                        <th rowspan="2">{{__t('Mức độ')}}</th>
                                        <th>{{__t('Không')}}</th>
                                        <th>{{__t('Nhẹ')}}</th>
                                        <th>{{__t('Vừa')}}</th>
                                        <th>{{__t('Nặng')}}</th>
                                      </tr>
                                      <tr>
                                        <td class="text-center">0</td>
                                        <td class="text-center">1-2</td>
                                        <td class="text-center">3-5</td>
                                        <td class="text-center">>5</td>
                                      </tr>
                                    </thead>
                                  </table>
                                </div>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <!-- Co rut nguc tren -->
                            <td v-if="MASTERDATA['IPDNEWSOBC47']">
                              <div class="box-action">
                                <v-select :disabeleclear="false" class='select-full-w' v-model="MASTERDATA['IPDNEWSOBC47'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionSilverMan"/>
                              </div>
                            </td>
                            <!-- Co rut nguc duoi-->
                            <td v-if="MASTERDATA['IPDNEWSOBC47']">
                              <div class="box-action">
                                <v-select :disabeleclear="false" class='select-full-w' v-model="MASTERDATA['IPDNEWSOBC47'].Items[1].Value" :placeholder="__t('Chọn')" :items="optionSilverMan"/>
                              </div>
                            </td>
                            <!-- Rut lom hom nguc -->
                            <td v-if="MASTERDATA['IPDNEWSOBC47']">
                              <div class="box-action">
                                <v-select :disabeleclear="false" class='select-full-w' v-model="MASTERDATA['IPDNEWSOBC47'].Items[2].Value" :placeholder="__t('Chọn')" :items="optionSilverMan"/>
                              </div>
                            </td>
                            <!-- No canh mui -->
                            <td v-if="MASTERDATA['IPDNEWSOBC47']">
                              <div class="box-action">
                                <v-select :disabeleclear="false" class='select-full-w' v-model="MASTERDATA['IPDNEWSOBC47'].Items[3].Value" :placeholder="__t('Chọn')" :items="optionSilverMan"/>
                              </div>
                            </td>
                            <!-- Ren -->
                            <td v-if="MASTERDATA['IPDNEWSOBC47']">
                              <div class="box-action">
                                <v-select :disabeleclear="false" class='select-full-w' v-model="MASTERDATA['IPDNEWSOBC47'].Items[4].Value" :placeholder="__t('Chọn')" :items="optionSilverMan"/>
                              </div>
                            </td>
                            <!-- Muc do -->
                            <td v-if="MASTERDATA['IPDNEWSOBC47']">
                              <p class="none">{{ MASTERDATA['IPDNEWSOBC47'].Items[5].Value = getSilverMan}}</p>
                              <FakeInput :dfl="true" class="fake-input" v-model="getMucDoSilverMan"/>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </table>
                  </div>
                  <!-- An -->
                  <div v-if="MASTERDATA['IPDNEWSOBC30']" class="mini-box">
                    <div class="box-left">
                      <p class="label fw600 fs14">{{__label(MASTERDATA['IPDNEWSOBC30'])}}: </p>
                    </div>
                    <div class="box-right box-right2">
                      <template  v-for="(item, index) in MASTERDATA['IPDNEWSOBC30'].Items">
                        <div :key="index" v-if="item.DataType === 'Checkbox'">
                          <div class="flex-box flex-center">
                            <CheckboxValue v-model="item.Value" v-if="viewOnly"/>
                            <span class="v-checkbox" :class="{'ml-10': index ===2 }" v-else>
                              <input type="checkbox" :id="'IPDNEWSOBC30radio-' + index" v-model="item.Value">
                              <label :for="'IPDNEWSOBC30radio-' + index"></label>
                            </span>
                            <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                            <div class="ml-10" v-if="MASTERDATA['IPDNEWSOBC30'].Items[0].Value && index === 0">
                              <div class="flex-box flex-center">
                                <MDNumberInput style="max-width: 120px" :code="MASTERDATA['IPDNEWSOBC30'].Items[1].Code" :decimal="true" v-model="MASTERDATA['IPDNEWSOBC30'].Items[1].Value" />
                                <p class="ml-5 mb-0">ml</p>
                              </div>
                            </div>
                            <div class="ml-10" v-if="MASTERDATA['IPDNEWSOBC30'].Items[2].Value && index === 2">
                              <div class="flex-box flex-center">
                                <MDNumberInput style="max-width: 120px" :code="MASTERDATA['IPDNEWSOBC30'].Items[3].Code" :decimal="true" v-model="MASTERDATA['IPDNEWSOBC30'].Items[3].Value" />
                                <p class="ml-5 mb-0">ml</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                  <!-- Nuoc tieu -->
                  <div v-if="MASTERDATA['IPDNEWSOBC35']" class="mini-box">
                    <div class="box-left">
                      <p class="label fw600 fs14">{{__label(MASTERDATA['IPDNEWSOBC35'])}}: </p>
                    </div>
                    <div class="box-right box-right2">
                      <div class="flex-box flex-center">
                        <MDNumberInput style="max-width: 120px" :decimal="true" v-model="MASTERDATA['IPDNEWSOBC35'].Items[0].Value" />
                        <p class="ml-5 mb-0">ml</p>
                      </div>
                    </div>
                  </div>
                  <!-- Phan -->
                  <div v-if="MASTERDATA['IPDNEWSOBC37']" class="mini-box">
                    <div class="box-left">
                      <p class="label fw600 fs14">{{__label(MASTERDATA['IPDNEWSOBC37'])}}: </p>
                    </div>
                    <div class="box-right box-right2">
                      <div class="flex-box flex-center">
                        <MDNumberInput style="max-width: 120px" :decimal="true" v-model="MASTERDATA['IPDNEWSOBC37'].Items[0].Value" />
                        <p class="ml-5 mb-0">ml</p>
                      </div>
                    </div>
                  </div>
                  <!-- Truyen dich -->
                  <div class="mini-box">
                    <div class="box-left">
                      <p class="label fw600 fs14">{{__label(MASTERDATA['IPDNEWSOBC39'])}}: </p>
                    </div>
                    <div class="box-right box-right2">
                      <textarea-autosize style="max-width: 300px" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDNEWSOBC39'].Items[0].Value"/>
                      <div class="ml-20" v-if="MASTERDATA['IPDNEWSOBC39'].Items[0].Value">
                        <div class="flex-box flex-center">
                          <MDNumberInput style="max-width: 120px" :decimal="true" :code="MASTERDATA['IPDNEWSOBC39'].Items[1].Code" v-model="MASTERDATA['IPDNEWSOBC39'].Items[1].Value" />
                          <p class="ml-5 mb-0">ml/h</p>
                        </div>
                      </div>
                    </div>
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
        <FloatBlock v-if="!viewOnly" :showForm="showForm" @handleBack='handleBack()'>
          <template slot='buttons'>
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-6 col-sm-6" v-if="hasRole('IPDNOC1') && !IsLocked">
              <div class="form-group1">
                <button v-if="!showForm" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleInsert"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.them_theo_doi')}}</button>
                <!-- <button v-else class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button> -->
              </div>
            </div>
          </template>
        </FloatBlock>
      </div>
    </div>
    <div v-show="!loaded" class="loading-text"><v-loading/></div>
  </div>
</template>

<script>
import PageTable from './PageTable.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import VSelect from '@/components/VSelect.vue'
import constants from '@/constants'
import moment from 'moment'
import _ from 'lodash'
import IPDNeonatalVitalSign from '@/services/IPD/NeonatalVitalSigns'
import EventBus from '@/lib/eventBus'

const MODAL_WIDTH = 1200

export default {
  components: {
    VDateTimePicker, VSelect, PageTable
  },
  mixins: [MixinMasterData],
  props: {
    viewOnly: {
      type: Boolean,
      default: false
    },
    VisitId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      DataSubmit: {},
      showTable: false,
      showForm: false,
      loaded: false,
      nullContent: true,
      time: moment().format('HH:mm DD/MM/YYYY'),
      SENSE: constants.SENSE,
      RESPIRATORY: constants.RESPIRATORY,
      colorClass: '',
      optionSuyHoHap: [
        {
          label: 'Không',
          value: 'Không'
        },
        {
          label: 'Nhẹ',
          value: 'Nhẹ'
        },
        {
          label: 'Vừa',
          value: 'Vừa'
        },
        {
          label: 'Nặng',
          value: 'Nặng'
        }
      ],
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
      optionSilverMan: [
        {
          label: '0',
          value: '0'
        },
        {
          label: '1',
          value: '1'
        },
        {
          label: '2',
          value: '2'
        }
      ],
      MDCODES: [
        'IPDMEWS30',
        'IPDNEWSOBC75'
      ],
      idRow: '',
      IsLocked: false,
      dataMaster: null,
      UpdatedAt: '',
      UpdatedBy: '',
      CreatedBy: '',
      createNew: false,
      checkEdited: false
    }
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
    this.getMasterDatas({Form: 'A02_030_080322_V'}, () => {
      this.getData()
    })
    EventBus.$on('getIsLocked', this.getIsLocked)
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
  computed: {
    getMucDoSilverMan () {
      if (this.getSilverMan === 0) {
        return 'Không'
      } else if (this.getSilverMan >= 1 && this.getSilverMan <= 2) {
        return 'Nhẹ'
      } else if (this.getSilverMan >= 3 && this.getSilverMan <= 5) {
        return 'Vừa'
      } else if (this.getSilverMan === '' || this.getSilverMan === 'N/A') {
        return 'N/A'
      } else {
        return 'Nặng'
      }
    },
    getSilverMan () {
      let num = 0
      let isNum = false
      if (this.MASTERDATA['IPDNEWSOBC47'].Items[0].Value !== '' && this.MASTERDATA['IPDNEWSOBC47'].Items[0].Value !== 0) {
        num += Number(this.MASTERDATA['IPDNEWSOBC47'].Items[0].Value)
        isNum = true
      }
      if (this.MASTERDATA['IPDNEWSOBC47'].Items[1].Value !== '' && this.MASTERDATA['IPDNEWSOBC47'].Items[1].Value !== 0) {
        num += Number(this.MASTERDATA['IPDNEWSOBC47'].Items[1].Value)
        isNum = true
      }
      if (this.MASTERDATA['IPDNEWSOBC47'].Items[2].Value !== '' && this.MASTERDATA['IPDNEWSOBC47'].Items[2].Value !== 0) {
        num += Number(this.MASTERDATA['IPDNEWSOBC47'].Items[2].Value)
        isNum = true
      }
      if (this.MASTERDATA['IPDNEWSOBC47'].Items[3].Value !== '' && this.MASTERDATA['IPDNEWSOBC47'].Items[3].Value !== 0) {
        num += Number(this.MASTERDATA['IPDNEWSOBC47'].Items[3].Value)
        isNum = true
      }
      if (this.MASTERDATA['IPDNEWSOBC47'].Items[4].Value !== '' && this.MASTERDATA['IPDNEWSOBC47'].Items[4].Value !== 0) {
        num += Number(this.MASTERDATA['IPDNEWSOBC47'].Items[4].Value)
        isNum = true
      }
      if ((this.MASTERDATA['IPDNEWSOBC47'].Items[0].Value === 0 || this.MASTERDATA['IPDNEWSOBC47'].Items[1].Value === 0 || this.MASTERDATA['IPDNEWSOBC47'].Items[2].Value === 0 || this.MASTERDATA['IPDNEWSOBC47'].Items[3].Value === 0 || this.MASTERDATA['IPDNEWSOBC47'].Items[4].Value === 0) && isNum === false) {
        num = 0
      }
      if ((this.MASTERDATA['IPDNEWSOBC47'].Items[0].Value === '' || this.MASTERDATA['IPDNEWSOBC47'].Items[1].Value === '' || this.MASTERDATA['IPDNEWSOBC47'].Items[2].Value === '' || this.MASTERDATA['IPDNEWSOBC47'].Items[3].Value === '' || this.MASTERDATA['IPDNEWSOBC47'].Items[4].Value === '') && isNum === false) {
        num = 'N/A'
      }
      return num
    },
    isNew: function () {
      return !this.isReadonly && this.DataSubmit && this.DataSubmit.CreatedAt === this.DataSubmit.UpdatedAt
    },
    isReadonly: function () {
      return this.DataSubmit.ConfirmBy || this.readonly
    }
  },
  methods: {
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopup()
      } else {
        this.back()
      }
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
              this.showForm = false
              // this.back()
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
    },
    getLoaded () {
      this.loaded = true
    },
    getData () {
      console.log('Form ~ getData')
      new IPDNeonatalVitalSign().find('GetByVisitId/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response.listItems[0]
        // Sort time by listItems
        if (response.listItems.length > 0) {
          let sortListItems = _.orderBy(response.listItems, [(item) => moment(item.UpdatedAt)], ['desc'])
          this.UpdatedAt = moment(sortListItems[0].UpdatedAt).format('HH:mm DD/MM/YYYY')
          this.UpdatedBy = sortListItems[0].CreatedBy
          if (this.UpdatedAt || this.UpdatedBy) {
            this.$emit('TimeLog', this.UpdatedAt, this.UpdatedBy)
          }
        }
        if (response.MachMEWS.length) {
          this.nullContent = false
          this.$emit('hiddenLog')
          this.showTable = true
        }
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
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        this.checkEdited = false
        this.loaded = true
      }).catch(e => {
        this.loaded = true
        this.IsLocked = JSON.parse(e.request.response).FormStatus
      })
    },
    getDataDetail () {
      new IPDNeonatalVitalSign().find('GetDetail/' + this._VisitId + '/' + this.idRow + '?hidemsg=' + true).then(response => {
        this.DataSubmit.Datas = response.Datas
        this.CreatedBy = response.CreatedBy
        this.time = moment(response.TransactionDate).format('HH:mm DD/MM/YYYY') || moment().format('HH:mm DD/MM/YYYY')
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
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        setTimeout(() => {
          this.checkEdited = false
        }, 500)
      }).catch(e => {
        this.loaded = true
        if (e.status === 404) {}
      })
    },
    create () {
      new IPDNeonatalVitalSign().update('/Create/' + this._VisitId + '?hidemsg=' + true).then(async response => {
        this.loaded = false
        this.idRow = await response['Id']
        await this.update()
      }).catch(e => {
        if (e.status === 404) {}
      })
    },
    update () {
      this.DataSubmit.Datas = []
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
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
          })
        }
      }
      if (this.time) {
        this.DataSubmit.TransactionDate = this.time
      }
      if (this.idRow) {
        this.DataSubmit.Id = this.idRow
      }
      new IPDNeonatalVitalSign().update('/Update/' + this._VisitId + '/' + this.DataSubmit.Id, this.DataSubmit).then(async response => {
        await this.getData()
        this.showForm = false
        this.$modal.hide('MasterDataPopup')
        this.resetMdDataValueVitalSigns()
        await setTimeout(() => {
          EventBus.$emit('reloadUpdateFormNeonatal')
        }, 500)
        await this.toastedSuccess()
        // this.reload()
      }).catch(e => {
        this._401ResponseError(e)
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
    handleSubmit () {
      this.validateForm()
      if (this.createNew) {
        this.create()
      } else {
        this.update()
      }
    },
    getIsLocked (val) {
      this.IsLocked = val
    },
    handleEdit (id) {
      this.createNew = false
      this.showForm = true
      this.idRow = id
      this.getDataDetail()
    },
    handleInsert () {
      this.createNew = true
      this.time = moment().format('HH:mm DD/MM/YYYY')
      this.idRow = ''
      this.showForm = true
      setTimeout(() => {
        this.checkEdited = false
      }, 500)
    },
    validateForm () {
      let errors = []
      //  duong mau toan phan
      if ((this.MASTERDATA['IPDNEWSOBC27'].Items[0].Value && this.MASTERDATA['IPDNEWSOBC27'].Items[1].Value === '') || (this.MASTERDATA['IPDNEWSOBC27'].Items[0].Value && this.MASTERDATA['IPDNEWSOBC27'].Items[1].Value === null)) {
        errors.push(this.MASTERDATA['IPDNEWSOBC27'].Items[1])
      }
      // truyen dich
      if ((this.MASTERDATA['IPDNEWSOBC39'].Items[0].Value && this.MASTERDATA['IPDNEWSOBC39'].Items[1].Value === '') || (this.MASTERDATA['IPDNEWSOBC39'].Items[0].Value && this.MASTERDATA['IPDNEWSOBC39'].Items[1].Value === null)) {
        errors.push(this.MASTERDATA['IPDNEWSOBC39'].Items[1])
      }
      // an - mieng
      if ((this.MASTERDATA['IPDNEWSOBC30'].Items[0].Value && this.MASTERDATA['IPDNEWSOBC30'].Items[1].Value === '') || (this.MASTERDATA['IPDNEWSOBC30'].Items[0].Value && this.MASTERDATA['IPDNEWSOBC30'].Items[1].Value === null)) {
        errors.push(this.MASTERDATA['IPDNEWSOBC30'].Items[1])
      }
      // an - sonde
      if ((this.MASTERDATA['IPDNEWSOBC30'].Items[2].Value && this.MASTERDATA['IPDNEWSOBC30'].Items[3].Value === '') || (this.MASTERDATA['IPDNEWSOBC30'].Items[2].Value && this.MASTERDATA['IPDNEWSOBC30'].Items[3].Value === null)) {
        errors.push(this.MASTERDATA['IPDNEWSOBC30'].Items[3])
      }
      // nhip tho
      if (this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value === '' || this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value === null) {
        errors.push(this.MASTERDATA['IPDNEWSOBC1'].Items[0])
      }
      // mach
      if (this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value === '' || this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value === null) {
        errors.push(this.MASTERDATA['IPDNEWSOBC10'].Items[0])
      }
      // than nhiet
      if (this.MASTERDATA['IPDNEWSOBC12'].Items[0].Value === '' || this.MASTERDATA['IPDNEWSOBC12'].Items[0].Value === null) {
        errors.push(this.MASTERDATA['IPDNEWSOBC12'].Items[0])
      }
      if (errors.length) {
        console.log('errors: ', errors)
        this.handlerResponse({Error: errors})
      }
    },
    getValueXuTri () {
      // this.__t('Bỏ qua'),
      this.MASTERDATA['IPDNEWSOBC42'].Items[3].Value = this.MASTERDATA['IPDNEWSOBC42'].Items[1].Value
      switch (this.MASTERDATA['IPDNEWSOBC42'].Items[1].Value) {
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
      const val = this.MASTERDATA['IPDNEWSOBC42'].Items[1].Value
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
    getTongNews () {
      let num = 0
      let isNum = false
      let isYellow3 = false
      // nhip tho
      if (this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value !== '' && this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value !== null) {
        isNum = true
        if (parseInt(this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value) >= 70) {
          num += 3
          isYellow3 = true
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value) >= 65 && parseInt(this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value) <= 69) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value) >= 60 && parseInt(this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value) <= 64) {
          num += 1
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value) >= 30 && parseInt(this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value) <= 59) {
          num += 0
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value) >= 25 && parseInt(this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value) <= 29) {
          num += 1
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value) >= 20 && parseInt(this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value) <= 24) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC1'].Items[0].Value) <= 19) {
          num += 3
          isYellow3 = true
        }
      }
      // suy ho hap
      if (this.MASTERDATA['IPDNEWSOBC3'].Items[0].Value !== '' && this.MASTERDATA['IPDNEWSOBC3'].Items[0].Value !== null) {
        isNum = true
        if (this.MASTERDATA['IPDNEWSOBC3'].Items[0].Value === 'Nặng') {
          num += 3
          isYellow3 = true
        }
        if (this.MASTERDATA['IPDNEWSOBC3'].Items[0].Value === 'Vừa') {
          num += 2
        }
        if (this.MASTERDATA['IPDNEWSOBC3'].Items[0].Value === 'Nhẹ') {
          num += 1
        }
        if (this.MASTERDATA['IPDNEWSOBC3'].Items[0].Value === 'Không') {
          num += 0
        }
      }
      // sp02
      if (this.MASTERDATA['IPDNEWSOBC5'].Items[0].Value !== '' && this.MASTERDATA['IPDNEWSOBC5'].Items[0].Value !== null) {
        isNum = true
        if (parseInt(this.MASTERDATA['IPDNEWSOBC5'].Items[0].Value) >= 95) {
          num += 0
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC5'].Items[0].Value) >= 91 && parseInt(this.MASTERDATA['IPDNEWSOBC5'].Items[0].Value) <= 94) {
          num += 1
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC5'].Items[0].Value) >= 85 && parseInt(this.MASTERDATA['IPDNEWSOBC5'].Items[0].Value) <= 90) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC5'].Items[0].Value) <= 84) {
          num += 3
          isYellow3 = true
        }
      }
      // mach
      if (this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value !== '' && this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value !== null) {
        isNum = true
        if (parseInt(this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value) >= 180) {
          num += 3
          isYellow3 = true
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value) >= 170 && parseInt(this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value) <= 179) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value) >= 160 && parseInt(this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value) <= 169) {
          num += 1
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value) >= 90 && parseInt(this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value) <= 159) {
          num += 0
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value) >= 80 && parseInt(this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value) <= 89) {
          num += 1
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value) >= 70 && parseInt(this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value) <= 79) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDNEWSOBC10'].Items[0].Value) <= 69) {
          num += 3
          isYellow3 = true
        }
      }
      // than nhiet
      if (this.MASTERDATA['IPDNEWSOBC12'].Items[0].Value !== '' && this.MASTERDATA['IPDNEWSOBC12'].Items[0].Value !== null) {
        isNum = true
        if (this.MASTERDATA['IPDNEWSOBC12'].Items[0].Value >= 38) {
          num += 3
          isYellow3 = true
        }
        if (this.MASTERDATA['IPDNEWSOBC12'].Items[0].Value <= 35.4) {
          num += 2
        }
        if (this.MASTERDATA['IPDNEWSOBC12'].Items[0].Value >= 37.5 && this.MASTERDATA['IPDNEWSOBC12'].Items[0].Value <= 37.9) {
          num += 1
        }
        if (this.MASTERDATA['IPDNEWSOBC12'].Items[0].Value >= 36.5 && this.MASTERDATA['IPDNEWSOBC12'].Items[0].Value <= 37.4) {
          num += 0
        }
        if (this.MASTERDATA['IPDNEWSOBC12'].Items[0].Value >= 35.5 && this.MASTERDATA['IPDNEWSOBC12'].Items[0].Value <= 36.4) {
          num += 1
        }
      }
      // tri giac
      if (this.MASTERDATA['IPDNEWSOBC14'].Items[0].Value !== '' && this.MASTERDATA['IPDNEWSOBC14'].Items[0].Value !== null) {
        isNum = true
        if (this.MASTERDATA['IPDNEWSOBC14'].Items[0].Value === 'A') {
          num += 0
        }
        if (this.MASTERDATA['IPDNEWSOBC14'].Items[0].Value === 'V') {
          num += 2
        }
        if (this.MASTERDATA['IPDNEWSOBC14'].Items[0].Value === 'P') {
          num += 3
          isYellow3 = true
        }
        if (this.MASTERDATA['IPDNEWSOBC14'].Items[0].Value === 'U') {
          num += 3
          isYellow3 = true
        }
      }
      // ho tro ho hap
      if (this.MASTERDATA['IPDNEWSOBC17'].Items[0].Value !== '' && this.MASTERDATA['IPDNEWSOBC17'].Items[0].Value !== null && this.MASTERDATA['IPDNEWSOBC17'].Items[0].Value !== 'Không') {
        isNum = true
        num += 2
      }
      if (num === 0 && !isNum) {
        this.colorClass = ''
        num = ''
      }
      if (!isYellow3) {
        if (num <= 2 && num >= 0 && isNum) {
          this.colorClass = 'color-blue2'
        }
      }
      if (!isYellow3) {
        if (num <= 5 && num >= 3) {
          this.colorClass = 'color-green3'
        }
      }
      if (isYellow3 && num < 7) {
        this.colorClass = 'color-yellow3'
      }
      if (num === 6) {
        this.colorClass = 'color-yellow3'
      }
      if (num >= 7) {
        this.colorClass = 'color-red3'
      }
      this.MASTERDATA['IPDNEWSOBC54'].Items[0].Value = isYellow3
      this.MASTERDATA['IPDNEWSOBC19'].Items[0].Value = num
      return num
    },
    confirmSkip () {
      this.$modal.hide('closeWarning')
    },
    confirmClose () {
      this.showForm = false
      this.resetMdDataValueVitalSigns()
      this.$modal.hide('closeWarning')
      this.$modal.hide('MasterDataPopup')
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
.NeonatalVitalSigns-PageNurse {
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
    justify-content: space-between;
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
        margin: 0;
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
  margin: 0;
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
>>>.dropdown-menu.dropdown-right {
  left: auto;
  right: 0;
}
@media (max-width: 1300px) {
  .bix-box-flex {
    flex-flow: wrap;
  }
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
