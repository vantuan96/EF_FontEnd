<template>
  <div>
    <div v-show="loaded">
      <div id="Pediatric1ToUnder3Month-PageNurse" class="Pediatric1ToUnder3Month-PageNurse">
        <div class="content">
          <page-table v-if="showTable" @handleEdit="handleEdit" @checkLoaded="getLoaded" :viewOnly="viewOnly" :VisitId="VisitId" :FormCode="FormCode"/>
          <div v-if="nullContent" class="null-content">{{__t('AdultVitalSigns.labelNull')}}</div>
          <modal name="MasterDataPopup" transition="pop-out" height="auto" :clickToClose="false" :width="modalWidth">
            <div class="sync-ed-header">
              {{__t('PediatricVitalSigns.bigTitle')}} {{__t('(Từ 1 đến dưới 4 tuổi)')}}
              <i style="cursor: pointer" @click="closeModal()" class="fa fa-times pull-right fa-2" aria-hidden="true"></i>
            </div>
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
                            <div>
                              <span class="block">SpO2</span>
                              <span class="block">(%)</span>
                            </div>
                          </th>
                          <th width="200px">
                            <div>
                              <span class="block">Huyết áp</span>
                              <span class="block">(mmHg)</span>
                            </div>
                          </th>
                          <th width="100px">Mạch (Nhịp/phút)</th>
                          <th width="100px">Thân nhiệt (oC)</th>
                          <th width="100px">{{__label(MASTERDATA['IPDPEWSPDT12'])}}</th>
                          <th rowspan="2" width="100px">{{__label(MASTERDATA['IPDPEWSPDT15'])}}</th>
                          <th rowspan="2" width="100px">{{__t('Tổng PEWS')}}</th>
                        </tr>
                        <!-- dropdwon y nghia -->
                        <tr v-if="MASTERDATA['IPDPEWSPDT12']">
                          <!-- Nhip tho -->
                          <th>
                            <div class="dropdown">
                              <div class="dropdown-toggle cursor fw200" id="dropdownMeaningful" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDPEWSPDT12'].Items[1])}}
                              </div>
                              <div class="dropdown-menu dropdown-right" aria-labelledby="dropdownMeaningful">
                                <table class="table observation-table table-dropdow" style="width: 500px">
                                  <thead>
                                    <tr>
                                      <th class="no-wrap">Chỉ số</th>
                                      <th class="no-wrap">&#8805; 55</th>
                                      <th class="no-wrap">50-54</th>
                                      <th class="no-wrap">40-49</th>
                                      <th class="no-wrap">30-39</th>
                                      <th class="no-wrap">20-29</th>
                                      <th class="no-wrap">15-19</th>
                                      <th class="no-wrap">10-14</th>
                                      <th class="no-wrap">&#8804; 9</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="text-center">PEWS</td>
                                      <td class="text-center">3</td>
                                      <td class="text-center">2</td>
                                      <td class="text-center">1</td>
                                      <td class="text-center">0</td>
                                      <td class="text-center">0</td>
                                      <td class="text-center">2</td>
                                      <td class="text-center">3</td>
                                      <td class="text-center">3</td>
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
                                <i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDPEWSPDT12'].Items[1])}}
                              </div>
                              <div class="dropdown-menu dropdown-right" aria-labelledby="dropdownMeaningful">
                                <table class="table observation-table table-dropdow" style="width: 500px; margin: 0">
                                  <thead>
                                    <tr>
                                      <th class="no-wrap">Chỉ số</th>
                                      <th class="no-wrap">&#8805; 95</th>
                                      <th class="no-wrap">90-94</th>
                                      <th class="no-wrap">85-89</th>
                                      <th class="no-wrap">&#8804; 84</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="text-center">PEWS</td>
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
                          <!-- Huyet ap -->
                          <th>
                            <div class="dropdown">
                              <div class="dropdown-toggle cursor fw200" id="dropdownMeaningful" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDPEWSPDT12'].Items[1])}}
                              </div>
                              <div class="dropdown-menu dropdown-right" aria-labelledby="dropdownMeaningful">
                                <table class="table observation-table table-dropdow" style="width: 500px; margin: 0">
                                  <thead>
                                    <tr>
                                      <th class="no-wrap">Chỉ số</th>
                                      <th>&#8805; 150</th>
                                      <th>120-149</th>
                                      <th>110-119</th>
                                      <th>85-109</th>
                                      <th>80-84</th>
                                      <th>70-79</th>
                                      <th>&#8804; 69</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="text-center">PEWS</td>
                                      <td class="text-center">3</td>
                                      <td class="text-center">2</td>
                                      <td class="text-center">1</td>
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
                                <i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDPEWSPDT12'].Items[1])}}
                              </div>
                              <div class="dropdown-menu dropdown-right" aria-labelledby="dropdownMeaningful">
                                <table class="table observation-table table-dropdow" style="width: 500px; margin: 0">
                                  <thead>
                                    <tr>
                                      <th class="no-wrap">Chỉ số</th>
                                      <th class="no-wrap">&#8805; 170</th>
                                      <th class="no-wrap">160-169</th>
                                      <th class="no-wrap">150-159</th>
                                      <th class="no-wrap">140-149</th>
                                      <th class="no-wrap">130-139</th>
                                      <th class="no-wrap">120-129</th>
                                      <th class="no-wrap">110-119</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="text-center">PEWS</td>
                                      <td class="text-center">3</td>
                                      <td class="text-center">3</td>
                                      <td class="text-center">2</td>
                                      <td class="text-center">1</td>
                                      <td class="text-center">0</td>
                                      <td class="text-center">0</td>
                                      <td class="text-center">0</td>
                                    </tr>
                                    <tr>
                                      <th class="no-wrap">Chỉ số</th>
                                      <th class="no-wrap">100-109</th>
                                      <th class="no-wrap">90-99</th>
                                      <th class="no-wrap">85-89</th>
                                      <th class="no-wrap">80-84</th>
                                      <th class="no-wrap">70-79</th>
                                      <th class="no-wrap">&#8804; 69</th>
                                    </tr>
                                    <tr>
                                      <td class="text-center">PEWS</td>
                                      <td class="text-center">0</td>
                                      <td class="text-center">0</td>
                                      <td class="text-center">1</td>
                                      <td class="text-center">1</td>
                                      <td class="text-center">2</td>
                                      <td class="text-center">3</td>
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
                                <i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDPEWSPDT12'].Items[1])}}
                              </div>
                              <div class="dropdown-menu dropdown-left" aria-labelledby="dropdownMeaningful">
                                <table class="table observation-table table-dropdow" style="width: 500px; margin: 0">
                                  <thead>
                                    <tr>
                                      <th class="no-wrap">Chỉ số</th>
                                      <th class="no-wrap">&#8805; 41</th>
                                      <th class="no-wrap">40-40.9</th>
                                      <th class="no-wrap">39-39.9</th>
                                      <th class="no-wrap">38.5-38.9</th>
                                      <th class="no-wrap">38-38.4</th>
                                      <th class="no-wrap">37-37.9</th>
                                      <th class="no-wrap">36-36.9</th>
                                      <th class="no-wrap">35.5-35.9</th>
                                      <th class="no-wrap">35-35.4</th>
                                      <th class="no-wrap">&#60; 35</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="text-center">PEWS</td>
                                      <td class="text-center">3</td>
                                      <td class="text-center">2</td>
                                      <td class="text-center">2</td>
                                      <td class="text-center">2</td>
                                      <td class="text-center">1</td>
                                      <td class="text-center">0</td>
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
                          <!-- Tri giac -->
                          <th>
                            <div class="dropdown">
                              <div class="dropdown-toggle cursor fw200" id="dropdownMeaningful" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-angle-double-down"></i> {{__label(MASTERDATA['IPDPEWSPDT12'].Items[1])}}
                              </div>
                              <div class="dropdown-menu dropdown-left" aria-labelledby="dropdownMeaningful">
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
                          <td v-if="MASTERDATA['IPDPEWSPDT1']">
                            <div class="box-action">
                              <MDNumberInput v-model="MASTERDATA['IPDPEWSPDT1'].Items[0].Value" :code="MASTERDATA['IPDPEWSPDT1'].Items[0].Code"/>
                            </div>
                          </td>
                          <!-- SpO2 -->
                          <td v-if="MASTERDATA['IPDPEWSPDT3']">
                            <div class="box-action">
                              <MDNumberInput v-model="MASTERDATA['IPDPEWSPDT3'].Items[0].Value" />
                            </div>
                          </td>
                          <!-- Huyết áp -->
                          <td v-if="MASTERDATA['IPDPEWSPDT5']">
                            <div class="box-action">
                              <div class="checkbox-left">
                                <MDNumberInput style="max-width: 120px" :placeholder="__t('AdultVitalSigns.placeholder2')" v-model="MASTERDATA['IPDPEWSPDT5'].Items[0].Value" />
                              </div>
                              <MDNumberInput style="max-width: 120px" :placeholder="__t('AdultVitalSigns.placeholder1')" v-model="MASTERDATA['IPDPEWSPDT5'].Items[1].Value" />
                            </div>
                          </td>
                          <!-- Mạch -->
                          <td v-if="MASTERDATA['IPDPEWSPDT8']">
                            <div class="box-action">
                              <MDNumberInput v-model="MASTERDATA['IPDPEWSPDT8'].Items[0].Value" :code="MASTERDATA['IPDPEWSPDT8'].Items[0].Code"/>
                            </div>
                          </td>
                          <!-- Thân nhiệt -->
                          <td v-if="MASTERDATA['IPDPEWSPDT10']">
                            <div class="box-action">
                              <MDNumberInput :limitDecimal="true" :decimal="true" v-model="MASTERDATA['IPDPEWSPDT10'].Items[0].Value" :code="MASTERDATA['IPDPEWSPDT10'].Items[0].Code"/>
                            </div>
                          </td>
                          <!-- Tri giác -->
                          <td v-if="MASTERDATA['IPDPEWSPDT12']">
                            <v-select :disabeleclear="false" class='select-full-w' v-model="MASTERDATA['IPDPEWSPDT12'].Items[0].Value" :placeholder="__t('Chọn')" :items="SENSE"/>
                          </td>
                          <!-- Hỗ trợ hô hấp -->
                          <td v-if="MASTERDATA['IPDPEWSPDT15']">
                            <v-select :disabeleclear="false" class='select-full-w' v-model="MASTERDATA['IPDPEWSPDT15'].Items[0].Value" :placeholder="__t('Chọn')" :items="RESPIRATORY"/>
                          </td>
                          <!-- Tổng MEWS -->
                          <td v-if="MASTERDATA['IPDPEWSPDT17']">
                            <p class="none">{{ getTongMews()}}</p>
                            <FakeInput :dfl="true" class="fake-input" :class="colorClass ? colorClass : null" v-model="MASTERDATA['IPDPEWSPDT17'].Items[0].Value"/>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </table>
                </div>
                <div class="big-box">
                  <!-- Điểm đau -->
                  <div v-if="MASTERDATA['IPDPEWSPDT19']" class="mini-box">
                    <div class="box-left">
                      <p class="label fw600 fs14">{{__label(MASTERDATA['IPDPEWSPDT19'])}}: </p>
                    </div>
                    <div class="box-right">
                      <v-select :disabeleclear="false" class='select-full-w box-select' v-model="MASTERDATA['IPDPEWSPDT19'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionDiemDau"/>
                      <MDNumberInput v-model="MASTERDATA['IPDPEWSPDT19'].Items[1].Value"  style="width: 100px;"/>
                    </div>
                  </div>
                  <!-- Đường máu toàn phần -->
                  <div v-if="MASTERDATA['IPDPEWSPDT22']" class="mini-box">
                    <div class="box-left">
                      <p class="label fw600 fs14">{{__label(MASTERDATA['IPDPEWSPDT22'])}}: </p>
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
                        <v-select :disabeleclear="false" class='select-full-w box-select box-select-vein' v-model="MASTERDATA['IPDPEWSPDT22'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionMaoMach"/>
                        <div v-if="MASTERDATA['IPDPEWSPDT22'].Items[0].Value">
                          <MDNumberInput class="ml-10" style="max-width: 108px" :maxlength="5" :decimal="true" :code="MASTERDATA['IPDPEWSPDT22'].Items[1].Code" v-model="MASTERDATA['IPDPEWSPDT22'].Items[1].Value" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Đánh giá vein truyền -->
                  <div v-if="MASTERDATA['IPDPEWSPDT25']" class="mini-box">
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
                      <v-select :disabeleclear="false" class='select-full-w box-select box-select-vein' v-model="MASTERDATA['IPDPEWSPDT25'].Items[1].Value" :placeholder="__t('Chọn')" :items="optionVein"/>
                      <!-- Cách xử trí -->
                      <div class="flex align-center">
                        <span style="word-break: break-word; margin-right: 5px;" class="fw600">{{'Can thiệp xử trí'}}:</span>
                        <div class="">
                          <p class="fake-input disable input-xutri" :class="getColorXuTri()">{{ getValueXuTri() || 'N/A' }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="MASTERDATA['IPDPEWSPDT30']" class="mini-box">
                    <div class="box-left">
                      <!-- Số lượng dịch vào -->
                      <p class="label fw600 fs14">{{__label(MASTERDATA['IPDPEWSPDT30'])}}: </p>
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
                    <!-- Input số lượng dịch vào -->
                    <div class="box-right box-right4">
                      <div class="bix-box-flex">
                        <div class="flex-box mr-10">
                          <MDCheckbox :noFlex="true" :indexs="[2]" v-model="MASTERDATA['IPDPEWSPDT30']" @pushIndex="setOnchange"/>
                          <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDPEWSPDT30'].Items[2].Value" :code="MASTERDATA['IPDPEWSPDT30'].Items[2].Code" v-model="MASTERDATA['IPDPEWSPDT30'].Items[3].Value" />
                        </div>
                        <div class="flex-box mr-10">
                          <MDCheckbox :noFlex="true" :indexs="[4]" v-model="MASTERDATA['IPDPEWSPDT30']" @pushIndex="setOnchange"/>
                          <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDPEWSPDT30'].Items[4].Value" :code="MASTERDATA['IPDPEWSPDT30'].Items[4].Code" v-model="MASTERDATA['IPDPEWSPDT30'].Items[5].Value" />
                        </div>
                        <div class="flex-box mr-10">
                          <MDCheckbox :noFlex="true" :indexs="[6]" v-model="MASTERDATA['IPDPEWSPDT30']" @pushIndex="setOnchange"/>
                          <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDPEWSPDT30'].Items[6].Value" :code="MASTERDATA['IPDPEWSPDT30'].Items[6].Code" v-model="MASTERDATA['IPDPEWSPDT30'].Items[7].Value" />
                        </div>
                        <div class="flex-box mr-10">
                          <MDCheckbox :noFlex="true" :indexs="[8]" v-model="MASTERDATA['IPDPEWSPDT30']" @pushIndex="setOnchange"/>
                          <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDPEWSPDT30'].Items[8].Value" :code="MASTERDATA['IPDPEWSPDT30'].Items[8].Code" v-model="MASTERDATA['IPDPEWSPDT30'].Items[9].Value" />
                        </div>
                        <div class="flex-box mr-10">
                          <MDCheckbox :noFlex="true" :indexs="[10]" v-model="MASTERDATA['IPDPEWSPDT30']" @pushIndex="setOnchange"/>
                          <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDPEWSPDT30'].Items[10].Value" :code="MASTERDATA['IPDPEWSPDT30'].Items[10].Code" v-model="MASTERDATA['IPDPEWSPDT30'].Items[11].Value" />
                        </div>
                        <div class="flex-box mr-10">
                          <MDCheckbox :noFlex="true" :indexs="[12]" v-model="MASTERDATA['IPDPEWSPDT30']" @pushIndex="setOnchange"/>
                          <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDPEWSPDT30'].Items[12].Value" :code="MASTERDATA['IPDPEWSPDT30'].Items[12].Code" v-model="MASTERDATA['IPDPEWSPDT30'].Items[13].Value" />
                        </div>
                      </div>
                      <div class="box-mini-left flex align-center">
                        <div class="fw600">{{__t('AdultVitalSigns.labelCustomer4')}} </div><span class="none">{{getTotalDichVao()}}</span>
                        <FakeInput :dfl="true" v-model="MASTERDATA['IPDPEWSPDT30'].Items[1].Value"/>
                      </div>
                    </div>
                  </div>
                  <!-- Số lượng dịch ra -->
                  <div v-if="MASTERDATA['IPDPEWSPDT45']" class="mini-box">
                    <div class="box-left">
                      <p class="label fw600 fs14">{{__label(MASTERDATA['IPDPEWSPDT45'])}}: </p>
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
                    <!-- Input số lượng dịch ra -->
                    <div class="box-right box-right5">
                      <div>
                        <div class="bix-box-flex">
                          <div class="flex-box mr-10">
                            <MDCheckbox :noFlex="true" :indexs="[4]" v-model="MASTERDATA['IPDPEWSPDT45']" @pushIndex="setOnchange2"/>
                            <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDPEWSPDT45'].Items[4].Value" :code="MASTERDATA['IPDPEWSPDT45'].Items[4].Code" v-model="MASTERDATA['IPDPEWSPDT45'].Items[5].Value" />
                          </div>
                          <div class="flex-box mr-10">
                            <MDCheckbox :noFlex="true" :indexs="[6]" v-model="MASTERDATA['IPDPEWSPDT45']" @pushIndex="setOnchange2"/>
                            <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDPEWSPDT45'].Items[6].Value" :code="MASTERDATA['IPDPEWSPDT45'].Items[6].Code" v-model="MASTERDATA['IPDPEWSPDT45'].Items[7].Value" />
                          </div>
                          <div class="flex-box mr-10">
                            <MDCheckbox :noFlex="true" :indexs="[8]" v-model="MASTERDATA['IPDPEWSPDT45']" @pushIndex="setOnchange2"/>
                            <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDPEWSPDT45'].Items[8].Value" :code="MASTERDATA['IPDPEWSPDT45'].Items[8].Code" v-model="MASTERDATA['IPDPEWSPDT45'].Items[9].Value" />
                          </div>
                          <div class="flex-box mr-10">
                            <MDCheckbox :noFlex="true" :indexs="[10]" v-model="MASTERDATA['IPDPEWSPDT45']" @pushIndex="setOnchange2"/>
                            <MDNumberInput style="width: 78px;" v-if="MASTERDATA['IPDPEWSPDT45'].Items[10].Value" :code="MASTERDATA['IPDPEWSPDT45'].Items[10].Code" v-model="MASTERDATA['IPDPEWSPDT45'].Items[11].Value" />
                          </div>
                        </div>
                      </div>
                      <!-- Tổng dịch ra -->
                      <div class="flex align-center space-between"><span class="fw600">{{__t('AdultVitalSigns.labelCustomer3')}}</span> <span class="none">{{getTotalDichRa()}}</span>
                        <FakeInput :dfl="true" v-model="MASTERDATA['IPDPEWSPDT45'].Items[1].Value" />
                      </div>
                    </div>
                  </div>
                  <!-- Bilan dịch -->
                  <div v-if="MASTERDATA['IPDPEWSPDT58']" class="mini-box mini-box2">
                    <div class="fs14 text fw600" style="margin-right: 5px!important;">{{__t('AdultVitalSigns.labelCustomer2')}}</div><span class="none">{{getTotalBilan()}}</span>
                    <FakeInput :dfl="true" class="input-bilan" v-model="MASTERDATA['IPDPEWSPDT58'].Items[0].Value" />
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
            <div class="col-md-6 col-sm-6" v-if="hasRole('IPDEDIT13NHI') && !IsLocked">
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
// import PageTable from '@/components/IPD/VitalSigns/PediatricTable.vue'
import PageTable from './PageTable.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import VSelect from '@/components/VSelect.vue'
import constants from '@/constants'
import moment from 'moment'
import _ from 'lodash'
import IPDPediatricVitalSign from '@/services/IPD/PediatricVitalSigns'
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
        'IPDPEWSPDT45'
      ],
      idRow: '',
      IsLocked: false,
      dataMaster: null,
      UpdatedAt: '',
      UpdatedBy: '',
      CreatedBy: '',
      createNew: false,
      checkEdited: false,
      BloodVesselPews: null,
      BreathingPews: null,
      HypothermiaPews: null,
      TotalPews: null,
      FormCode: 'A02_034_080322_V'
    }
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
    this.getMasterDatas({Form: 'IPDPEWSPDT'}, () => {
      this.getData()
    })
    // EventBus.$on('getIsLocked', this.getIsLocked)
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
      new IPDPediatricVitalSign({FormCode: this.FormCode, IPDId: this._VisitId}).find('All/').then(response => {
        this.DataSubmit = response.listItems[0]
        this.IsLocked = response.IsLocked
        if (response.listItems.length > 0) {
          this.UpdatedAt = response.LastUpdate.UpdatedAt
          this.UpdatedBy = response.LastUpdate.UpdatedBy
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
      })
    },
    getDataDetail () {
      new IPDPediatricVitalSign().find('GetDetail/' + this._VisitId + '/' + this.idRow + '?hidemsg=' + true).then(response => {
        this.DataSubmit.Datas = response.Datas
        this.CreatedBy = response.CreatedBy
        this.time = response.TransactionDate
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
        }, 1000)
      }).catch(e => {
        this.loaded = true
        if (e.status === 404) {}
      })
    },
    create () {
      new IPDPediatricVitalSign().update('/Create/' + this._VisitId + '/' + this.FormCode + '?hidemsg=' + true).then(async response => {
        this.loaded = false
        this.idRow = await response['Id']
        if (this.createNew) {
          this.DataSubmit = {}
          await this.update()
        }
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
      this.DataSubmit.BloodVesselPews = this.BloodVesselPews
      this.DataSubmit.BreathingPews = this.BreathingPews
      this.DataSubmit.HypothermiaPews = this.HypothermiaPews
      this.DataSubmit.TotalPews = this.MASTERDATA['IPDPEWSPDT17'].Items[0].Value
      new IPDPediatricVitalSign().update('/Update/' + this._VisitId, this.DataSubmit).then(async response => {
        await this.getData()
        this.showForm = false
        this.$modal.hide('MasterDataPopup')
        this.resetMdDataValueVitalSigns()
        await setTimeout(() => {
          EventBus.$emit('reloadUpdateForm')
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
      this.checkEdited = false
    },
    setOnchange (index) {
      let dex = ''
      if (index === 2) {
        dex = 3
      }
      if (index === 4) {
        dex = 5
      }
      if (index === 6) {
        dex = 7
      }
      if (index === 8) {
        dex = 9
      }
      if (index === 10) {
        dex = 11
      }
      if (index === 12) {
        dex = 13
      }
      if (this.MASTERDATA['IPDPEWSPDT30'].Items[index].Value) {
        this.MASTERDATA['IPDPEWSPDT30'].Items[dex].Value = ''
      }
    },
    setOnchange2 (index) {
      let dex = ''
      if (index === 2) {
        dex = 3
      }
      if (index === 4) {
        dex = 5
      }
      if (index === 6) {
        dex = 7
      }
      if (index === 8) {
        dex = 9
      }
      if (index === 10) {
        dex = 11
      }
      if (this.MASTERDATA['IPDPEWSPDT45'].Items[index].Value) {
        this.MASTERDATA['IPDPEWSPDT45'].Items[dex].Value = ''
      }
    },
    validateForm () {
      let errors = []
      // duong mau toan phan
      if ((this.MASTERDATA['IPDPEWSPDT22'].Items[0].Value && this.MASTERDATA['IPDPEWSPDT22'].Items[1].Value === '') || (this.MASTERDATA['IPDPEWSPDT22'].Items[0].Value && this.MASTERDATA['IPDPEWSPDT22'].Items[1].Value === null)) {
        errors.push(this.MASTERDATA['IPDPEWSPDT22'].Items[1])
      }
      // so luong dich vao
      if ((this.MASTERDATA['IPDPEWSPDT30'].Items[2].Value && this.MASTERDATA['IPDPEWSPDT30'].Items[3].Value === '') || (this.MASTERDATA['IPDPEWSPDT30'].Items[2].Value && this.MASTERDATA['IPDPEWSPDT30'].Items[3].Value === null)) {
        errors.push(this.MASTERDATA['IPDPEWSPDT30'].Items[2])
      }
      if ((this.MASTERDATA['IPDPEWSPDT30'].Items[4].Value && this.MASTERDATA['IPDPEWSPDT30'].Items[5].Value === '') || (this.MASTERDATA['IPDPEWSPDT30'].Items[4].Value && this.MASTERDATA['IPDPEWSPDT30'].Items[5].Value === null)) {
        errors.push(this.MASTERDATA['IPDPEWSPDT30'].Items[4])
      }
      if ((this.MASTERDATA['IPDPEWSPDT30'].Items[6].Value && this.MASTERDATA['IPDPEWSPDT30'].Items[7].Value === '') || (this.MASTERDATA['IPDPEWSPDT30'].Items[6].Value && this.MASTERDATA['IPDPEWSPDT30'].Items[7].Value === null)) {
        errors.push(this.MASTERDATA['IPDPEWSPDT30'].Items[6])
      }
      if ((this.MASTERDATA['IPDPEWSPDT30'].Items[8].Value && this.MASTERDATA['IPDPEWSPDT30'].Items[9].Value === '') || (this.MASTERDATA['IPDPEWSPDT30'].Items[8].Value && this.MASTERDATA['IPDPEWSPDT30'].Items[9].Value === null)) {
        errors.push(this.MASTERDATA['IPDPEWSPDT30'].Items[8])
      }
      if ((this.MASTERDATA['IPDPEWSPDT30'].Items[10].Value && this.MASTERDATA['IPDPEWSPDT30'].Items[11].Value === '') || (this.MASTERDATA['IPDPEWSPDT30'].Items[10].Value && this.MASTERDATA['IPDPEWSPDT30'].Items[11].Value === null)) {
        errors.push(this.MASTERDATA['IPDPEWSPDT30'].Items[10])
      }
      if ((this.MASTERDATA['IPDPEWSPDT30'].Items[12].Value && this.MASTERDATA['IPDPEWSPDT30'].Items[13].Value === '') || (this.MASTERDATA['IPDPEWSPDT30'].Items[12].Value && this.MASTERDATA['IPDPEWSPDT30'].Items[13].Value === null)) {
        errors.push(this.MASTERDATA['IPDPEWSPDT30'].Items[12])
      }
      // so luong dich ra
      if ((this.MASTERDATA['IPDPEWSPDT45'].Items[2].Value && this.MASTERDATA['IPDPEWSPDT45'].Items[3].Value === '') || (this.MASTERDATA['IPDPEWSPDT45'].Items[2].Value && this.MASTERDATA['IPDPEWSPDT45'].Items[3].Value === null)) {
        errors.push(this.MASTERDATA['IPDPEWSPDT45'].Items[2])
      }
      if ((this.MASTERDATA['IPDPEWSPDT45'].Items[4].Value && this.MASTERDATA['IPDPEWSPDT45'].Items[5].Value === '') || (this.MASTERDATA['IPDPEWSPDT45'].Items[4].Value && this.MASTERDATA['IPDPEWSPDT45'].Items[5].Value === null)) {
        errors.push(this.MASTERDATA['IPDPEWSPDT45'].Items[4])
      }
      if ((this.MASTERDATA['IPDPEWSPDT45'].Items[6].Value && this.MASTERDATA['IPDPEWSPDT45'].Items[7].Value === '') || (this.MASTERDATA['IPDPEWSPDT45'].Items[6].Value && this.MASTERDATA['IPDPEWSPDT45'].Items[7].Value === null)) {
        errors.push(this.MASTERDATA['IPDPEWSPDT45'].Items[6])
      }
      if ((this.MASTERDATA['IPDPEWSPDT45'].Items[8].Value && this.MASTERDATA['IPDPEWSPDT45'].Items[9].Value === '') || (this.MASTERDATA['IPDPEWSPDT45'].Items[8].Value && this.MASTERDATA['IPDPEWSPDT45'].Items[9].Value === null)) {
        errors.push(this.MASTERDATA['IPDPEWSPDT45'].Items[8])
      }
      if ((this.MASTERDATA['IPDPEWSPDT45'].Items[10].Value && this.MASTERDATA['IPDPEWSPDT45'].Items[11].Value === '') || (this.MASTERDATA['IPDPEWSPDT45'].Items[10].Value && this.MASTERDATA['IPDPEWSPDT45'].Items[11].Value === null)) {
        errors.push(this.MASTERDATA['IPDPEWSPDT45'].Items[10])
      }
      // nhip tho
      if (this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value === '' || this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value === null) {
        errors.push(this.MASTERDATA['IPDPEWSPDT1'].Items[0])
      }
      // mach
      if (this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value === '' || this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value === null) {
        errors.push(this.MASTERDATA['IPDPEWSPDT8'].Items[0])
      }
      // than nhiet
      if (this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value === '' || this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value === null) {
        errors.push(this.MASTERDATA['IPDPEWSPDT10'].Items[0])
      }
      if (errors.length) {
        console.log('errors: ', errors)
        this.handlerResponse({Error: errors})
      }
    },
    getTotalDichRa () {
      let num = 0
      let isNum = false
      if (this.MASTERDATA['IPDPEWSPDT45']) {
        // if (this.MASTERDATA['IPDPEWSPDT45'].Items[2].Value !== '' && this.MASTERDATA['IPDPEWSPDT45'].Items[2].Value !== null) {
        //   num += Number(this.MASTERDATA['IPDPEWSPDT45'].Items[3].Value)
        //   isNum = true
        // }
        if (this.MASTERDATA['IPDPEWSPDT45'].Items[5].Value !== '' && this.MASTERDATA['IPDPEWSPDT45'].Items[5].Value !== null) {
          num += Number(this.MASTERDATA['IPDPEWSPDT45'].Items[5].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDPEWSPDT45'].Items[7].Value !== '' && this.MASTERDATA['IPDPEWSPDT45'].Items[7].Value !== null) {
          num += Number(this.MASTERDATA['IPDPEWSPDT45'].Items[7].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDPEWSPDT45'].Items[9].Value !== '' && this.MASTERDATA['IPDPEWSPDT45'].Items[9].Value !== null) {
          num += Number(this.MASTERDATA['IPDPEWSPDT45'].Items[9].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDPEWSPDT45'].Items[11].Value !== '' && this.MASTERDATA['IPDPEWSPDT45'].Items[11].Value !== null) {
          num += Number(this.MASTERDATA['IPDPEWSPDT45'].Items[11].Value)
          isNum = true
        }
      }
      if (!isNum) {
        this.MASTERDATA['IPDPEWSPDT45'].Items[1].Value = ''
      } else {
        this.MASTERDATA['IPDPEWSPDT45'].Items[1].Value = num
      }
      return num
    },
    getTotalDichVao () {
      let num = 0
      let isNum = false
      if (this.MASTERDATA['IPDPEWSPDT30']) {
        if (this.MASTERDATA['IPDPEWSPDT30'].Items[3].Value !== '' && this.MASTERDATA['IPDPEWSPDT30'].Items[3].Value !== null) {
          num += Number(this.MASTERDATA['IPDPEWSPDT30'].Items[3].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDPEWSPDT30'].Items[5].Value !== '' && this.MASTERDATA['IPDPEWSPDT30'].Items[5].Value !== null) {
          num += Number(this.MASTERDATA['IPDPEWSPDT30'].Items[5].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDPEWSPDT30'].Items[7].Value !== '' && this.MASTERDATA['IPDPEWSPDT30'].Items[7].Value !== null) {
          num += Number(this.MASTERDATA['IPDPEWSPDT30'].Items[7].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDPEWSPDT30'].Items[11].Value !== '' && this.MASTERDATA['IPDPEWSPDT30'].Items[11].Value !== null) {
          num += Number(this.MASTERDATA['IPDPEWSPDT30'].Items[11].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDPEWSPDT30'].Items[9].Value !== '' && this.MASTERDATA['IPDPEWSPDT30'].Items[9].Value !== null) {
          num += Number(this.MASTERDATA['IPDPEWSPDT30'].Items[9].Value)
          isNum = true
        }
        if (this.MASTERDATA['IPDPEWSPDT30'].Items[13].Value !== '' && this.MASTERDATA['IPDPEWSPDT30'].Items[13].Value !== null) {
          num += Number(this.MASTERDATA['IPDPEWSPDT30'].Items[13].Value)
          isNum = true
        }
      }
      if (!isNum) {
        this.MASTERDATA['IPDPEWSPDT30'].Items[1].Value = ''
      } else {
        this.MASTERDATA['IPDPEWSPDT30'].Items[1].Value = num
      }
      return num
    },
    getTotalBilan () {
      let num = 0
      let isNum = false
      if (this.MASTERDATA['IPDPEWSPDT30'].Items[1].Value !== '' && this.MASTERDATA['IPDPEWSPDT30'].Items[1].Value !== null) {
        num += Number(this.MASTERDATA['IPDPEWSPDT30'].Items[1].Value)
        isNum = true
      }
      if (this.MASTERDATA['IPDPEWSPDT45'].Items[1].Value !== '' && this.MASTERDATA['IPDPEWSPDT45'].Items[1].Value !== null) {
        num -= Number(this.MASTERDATA['IPDPEWSPDT45'].Items[1].Value)
        isNum = true
      }
      if (!isNum) {
        this.MASTERDATA['IPDPEWSPDT58'].Items[0].Value = ''
      } else {
        this.MASTERDATA['IPDPEWSPDT58'].Items[0].Value = num
      }
      return num
    },
    getValueXuTri () {
      // this.__t('Bỏ qua'),
      this.MASTERDATA['IPDPEWSPDT25'].Items[3].Value = this.MASTERDATA['IPDPEWSPDT25'].Items[1].Value
      switch (this.MASTERDATA['IPDPEWSPDT25'].Items[1].Value) {
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
      const val = this.MASTERDATA['IPDPEWSPDT25'].Items[1].Value
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
    getTongMews () {
      let num = 0
      let isNum = false
      // nhip tho
      if (this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value === '') {
        this.BreathingPews = ''
      }
      if (this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value !== '' && this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value !== null) {
        isNum = true
        if (parseInt(this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value) >= 55) {
          num += 3
          this.BreathingPews = 3
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value) <= 54 && parseInt(this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value) >= 50) {
          num += 2
          this.BreathingPews = 2
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value) <= 49 && parseInt(this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value) >= 40) {
          num += 1
          this.BreathingPews = 1
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value) <= 39 && parseInt(this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value) >= 20) {
          num += 0
          this.BreathingPews = 0
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value) <= 19 && parseInt(this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value) >= 15) {
          num += 2
          this.BreathingPews = 2
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT1'].Items[0].Value) <= 14) {
          num += 3
          this.BreathingPews = 3
        }
      }
      // sp02
      if (this.MASTERDATA['IPDPEWSPDT3'].Items[0].Value !== '' && this.MASTERDATA['IPDPEWSPDT3'].Items[0].Value !== null) {
        isNum = true
        if (parseInt(this.MASTERDATA['IPDPEWSPDT3'].Items[0].Value) >= 95) {
          num += 0
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT3'].Items[0].Value) <= 94 && parseInt(this.MASTERDATA['IPDPEWSPDT3'].Items[0].Value) >= 90) {
          num += 1
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT3'].Items[0].Value) <= 89 && parseInt(this.MASTERDATA['IPDPEWSPDT3'].Items[0].Value) >= 85) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT3'].Items[0].Value) <= 84) {
          num += 3
        }
      }
      // huyet ap toi da
      if (this.MASTERDATA['IPDPEWSPDT5'].Items[0].Value !== '' && this.MASTERDATA['IPDPEWSPDT5'].Items[0].Value !== null) {
        isNum = true
        if (parseInt(this.MASTERDATA['IPDPEWSPDT5'].Items[0].Value) >= 150) {
          num += 3
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT5'].Items[0].Value) <= 149 && parseInt(this.MASTERDATA['IPDPEWSPDT5'].Items[0].Value) >= 120) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT5'].Items[0].Value) <= 119 && parseInt(this.MASTERDATA['IPDPEWSPDT5'].Items[0].Value) >= 110) {
          num += 1
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT5'].Items[0].Value) <= 109 && parseInt(this.MASTERDATA['IPDPEWSPDT5'].Items[0].Value) >= 85) {
          num += 0
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT5'].Items[0].Value) <= 84 && parseInt(this.MASTERDATA['IPDPEWSPDT5'].Items[0].Value) >= 80) {
          num += 1
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT5'].Items[0].Value) <= 79 && parseInt(this.MASTERDATA['IPDPEWSPDT5'].Items[0].Value) >= 70) {
          num += 2
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT5'].Items[0].Value) <= 69) {
          num += 3
        }
      }
      // mach
      if (this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value === '') {
        this.BloodVesselPews = ''
      }
      if (this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value !== '' && this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value !== null) {
        isNum = true
        if (parseInt(this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value) >= 160) {
          num += 3
          this.BloodVesselPews = 3
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value) <= 159 && parseInt(this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value) >= 150) {
          num += 2
          this.BloodVesselPews = 2
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value) <= 149 && parseInt(this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value) >= 140) {
          num += 1
          this.BloodVesselPews = 1
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value) <= 139 && parseInt(this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value) >= 90) {
          num += 0
          this.BloodVesselPews = 0
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value) <= 89 && parseInt(this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value) >= 80) {
          num += 1
          this.BloodVesselPews = 1
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value) <= 79 && parseInt(this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value) >= 70) {
          num += 2
          this.BloodVesselPews = 2
        }
        if (parseInt(this.MASTERDATA['IPDPEWSPDT8'].Items[0].Value) <= 69) {
          num += 3
          this.BloodVesselPews = 3
        }
      }
      // than nhiet
      if (this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value === '') {
        this.HypothermiaPews = ''
      }
      if (this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value !== '' && this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value !== null) {
        isNum = true
        if (this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value >= 41) {
          num += 3
          this.HypothermiaPews = 3
        }
        if (this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value <= 40.9 && this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value >= 38.5) {
          num += 2
          this.HypothermiaPews = 2
        }
        if (this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value <= 38.4 && this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value >= 38) {
          num += 1
          this.HypothermiaPews = 1
        }
        if (this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value <= 37.9 && this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value >= 36) {
          num += 0
          this.HypothermiaPews = 0
        }
        if (this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value <= 35.9 && this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value >= 35.5) {
          num += 1
          this.HypothermiaPews = 1
        }
        if (this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value <= 35.4 && this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value >= 35) {
          num += 2
          this.HypothermiaPews = 2
        }
        if (this.MASTERDATA['IPDPEWSPDT10'].Items[0].Value < 35) {
          num += 3
          this.HypothermiaPews = 3
        }
      }
      // tri giac
      if (this.MASTERDATA['IPDPEWSPDT12'].Items[0].Value !== '' && this.MASTERDATA['IPDPEWSPDT12'].Items[0].Value !== null) {
        isNum = true
        if (this.MASTERDATA['IPDPEWSPDT12'].Items[0].Value === 'A') {
          num += 0
        }
        if (this.MASTERDATA['IPDPEWSPDT12'].Items[0].Value === 'V') {
          num += 2
        }
        if (this.MASTERDATA['IPDPEWSPDT12'].Items[0].Value === 'P') {
          num += 3
        }
        if (this.MASTERDATA['IPDPEWSPDT12'].Items[0].Value === 'U') {
          num += 3
        }
      }
      // ho tro ho hap
      if (this.MASTERDATA['IPDPEWSPDT15'].Items[0].Value !== '' && this.MASTERDATA['IPDPEWSPDT15'].Items[0].Value !== null && this.MASTERDATA['IPDPEWSPDT15'].Items[0].Value !== 'Không') {
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
      if (num <= 5 && num >= 3) {
        this.colorClass = 'color-green3'
      }
      if (num === 6) {
        this.colorClass = 'color-yellow3'
      }
      if (num >= 7) {
        this.colorClass = 'color-red3'
      }
      this.MASTERDATA['IPDPEWSPDT17'].Items[0].Value = num
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
.Pediatric1ToUnder3Month-PageNurse {
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
  // .checkbox-left {
  //   margin-right: 10px;
  // }
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
@media (max-width: 1300px) {
  .bix-box-flex {
    flex-flow: wrap;
  }
  // >>>.dropdown-menu.dropdown-right {
  //   left: auto;
  //   right: 0;
  // }
}
@media (max-width: 871px) {
  .box-action {
    display: block!important;
    .checkbox-left {
      margin-right: 0px!important;
    }
  }
}
>>>.dropdown-menu.dropdown-left {
  left: auto;
  right: 0;
}
</style>
