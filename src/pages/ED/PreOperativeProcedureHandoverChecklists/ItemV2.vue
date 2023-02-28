<template>
  <div class="main-content" id="PHC-page">
    <div v-if="loaded">
      <template v-if="IsLocked">
        <div style="border: 1px solid #ccc;padding: 10px;background: #fff;">
          <print-page
            :viewOnly="true"
            :MASTERDATA="MASTERDATA"
            :PreOperativeProcedureHandoverChecklistsData="PreOperativeProcedureHandoverChecklistsData"
            :SpongeSharpsAndInstrumentsCountsSheetsData="SpongeSharpsAndInstrumentsCountsSheetsData"
            :FormId="PreOperativeProcedureHandoverChecklistsData.Id"
            :MasterDataCode="'PHCCONFIRM'"
            :FormCode="'A03_035_201022_VE'"
            :VisitId="$route.params.Id"
          />
        </div>
        <FloatBlock>
          <template slot='buttons'>
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group1">
                <button class="btn pull-right btn-info" type="button" @click="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
              </div>
            </div>
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
              </div>
            </div>
          </template>
        </FloatBlock>
      </template>
      <template v-else>
        <div v-if="hasData">
          <template>
            <div v-if="PreOperativeProcedureHandoverChecklistsData && SpongeSharpsAndInstrumentsCountsSheetsData" hidden>
              <print-page
                :MASTERDATA="MASTERDATA"
                :PreOperativeProcedureHandoverChecklistsData="PreOperativeProcedureHandoverChecklistsData"
                :SpongeSharpsAndInstrumentsCountsSheetsData="SpongeSharpsAndInstrumentsCountsSheetsData"
                :FormId="PreOperativeProcedureHandoverChecklistsData.Id"
                :MasterDataCode="'PHCCONFIRM'"
                :FormCode="'A03_035_201022_VE'"
                :VisitId="$route.params.Id"
              />
            </div>
            <h2 class="text-center">{{__t('Bảng kiểm chuẩn bị và bàn giao người bệnh trước phẫu thuật')}}</h2>
            <table class="table v-table-1 no-margin col-1-1 mb-10">
              <!-- Hinh thuc mo -->
              <tr v-if="MASTERDATA['PHCTOP']">
                <th>
                  <div class="w160">{{ __label(MASTERDATA["PHCTOP"]) }}</div>
                </th>
                <td>
                  <div class="v-btn-checkbox group-radio">
                    <div v-for="(item,index) in MASTERDATA['PHCTOP'].Items" :key="index" class="mr-5">
                      <button :data="item" :class="{'active': (item.Value + 'str') === (index + 'str')}" class="btn btn-select btn-block" @click="item.Value = index; checkbox2RadioBox(MASTERDATA['PHCTOP'].Items, item)">{{index === 2 ? __t('Phẫu thuật trong ngày') : __label(item)}}</button>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- Chan doan -->
              <tr v-if="MASTERDATA['PHCPD0']">
                <th>
                  <div class="w160">{{ __label(MASTERDATA["PHCPD0"]) }}</div>
                </th>
                <td>
                  <textarea-autosize rows="3" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PHCPD0'].Items[0].Value"/>
                </td>
              </tr>
              <tr>
                <th v-if="MASTERDATA['PHCPD0']">
                  <div class="w160">{{ __t('Dấu hiệu sinh tồn') }}</div>
                  <div class="mt-5">
                    <button
                      class="btn btn-sync-data"
                      style="text-transform: none;"
                      @click="SyncSign(['PHCBP0', 'PHCRR0', 'PHCPUL', 'PHCTEM', 'PHCHEI', 'PHCWEI'])"
                    >
                      {{ __t("Đồng bộ") }}
                    </button>
                  </div>
                </th>
                <td v-if="MASTERDATA['PHC68']">
                  <div class="row">
                    <div v-if="MASTERDATA['PHCPUL']" class="col-md-2">
                      <label>{{__label(MASTERDATA['PHCPUL'])}} <span class="note-text">({{__t('nhịp/phút')}})</span></label>
                      <input class="form-control" v-model="MASTERDATA['PHCPUL'].Items[0].Value" :placeholder="__t('Nhập')"/>
                    </div>
                    <div v-if="MASTERDATA['PHCBP0']" class="col-md-2">
                      <label>{{__label(MASTERDATA['PHCBP0'])}} <span class="note-text">({{__t('mmHg')}})</span></label>
                      <input class="form-control" v-model="MASTERDATA['PHCBP0'].Items[0].Value" :placeholder="__t('Nhập')">
                    </div>
                    <div v-if="MASTERDATA['PHCTEM']" class="col-md-2">
                      <label>{{__t('Thân nhiệt ')}} <span class="note-text"><Unit :unit="'tempC'" /></span></label>
                      <input class="form-control" v-model="MASTERDATA['PHCTEM'].Items[0].Value" :placeholder="__t('Nhập')"/>
                    </div>
                    <div v-if="MASTERDATA['PHCRR0']" class="col-md-2">
                      <label>{{__t("InitialAssessment.tho")}} <span class="note-text">({{__t('lần/phút')}})</span></label>
                      <input class="form-control" v-model="MASTERDATA['PHCRR0'].Items[0].Value" :placeholder="__t('Nhập')"/>
                    </div>
                    <div v-if="MASTERDATA['PHCHEI']" class="col-md-2">
                      <label>{{__label(MASTERDATA['PHCHEI'])}} <span class="note-text">({{__t('cm')}})</span></label>
                      <input class="form-control" v-model="MASTERDATA['PHCHEI'].Items[0].Value" :placeholder="__t('Nhập')"/>
                    </div>
                    <div v-if="MASTERDATA['PHCWEI']" class="col-md-2">
                      <label>{{__label(MASTERDATA['PHCWEI'])}} <span class="note-text">({{__t('kg')}})</span></label>
                      <input class="form-control" v-model="MASTERDATA['PHCWEI'].Items[0].Value" :placeholder="__t('Nhập')"/>
                    </div>
                  </div>
                  <div class="d-flex flex-center mt-5">
                    <div class="text-bold no-wrap mr-5">{{ __t('Nhóm máu') }}</div>
                    <v-select
                      class="select-full-w"
                      style="width: 145px;"
                      :search="true"
                      :placeholder="__t('Chọn nhóm máu')"
                      v-model="MASTERDATA['PHC68'].Items[0].Value"
                      :items="JSONParse(MASTERDATA['PHC68'].Items[0].Data)"
                    />
                  </div>
                </td>
              </tr>
              <!-- Loai phau thuat -->
              <tr v-if="MASTERDATA['PHCDOO']">
                <th>
                  <div class="w160">{{ __t('Loại phẫu thuật') }}</div>
                </th>
                <td>
                  <div class="row">
                    <div class="col-md-9">
                      <textarea-autosize rows="2" class="form-control" style="height: 64px;" :placeholder="__t('Nhập')" v-model="MASTERDATA['PHCNOO'].Items[0].Value"/>
                    </div>
                    <div v-if="MASTERDATA['PHCDOO']" class="col-md-3">
                      <p class="text-bold">{{__t('Ngày phẫu thuật')}}</p>
                      <VDatePicker
                        class="w1510 display-inline"
                        :hideTooltip="false"
                        :format="vDateTimeFormat"
                        v-model="MASTERDATA['PHCDOO'].Items[0].Value"
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <!-- Phong mo -->
              <tr>
                <th v-if="MASTERDATA['PHCOT0']">
                  <div class="w160">{{ __label(MASTERDATA["PHCOT0"]) }}</div>
                </th>
                <td v-if="MASTERDATA['PHCOT0']">
                  <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PHCOT0'].Items[0].Value"/>
                </td>
              </tr>
              <!-- Luu y -->
              <tr v-if="MASTERDATA['PHCREM']">
                <th>
                  <div class="w160">{{ __label(MASTERDATA["PHCREM"]) }}</div>
                </th>
                <td>
                  <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PHCREM'].Items[0].Value"/>
                </td>
              </tr>
              <!-- Ngay gio ban giao -->
              <tr v-if="PreOperativeProcedureHandoverChecklistsData">
                <th>
                  <div class="w160">{{__t('Ngày giờ bàn giao')}}</div>
                </th>
                <td>
                  <VDatePicker
                    class="w1510 display-inline"
                    :hideTooltip="false"
                    :format="vDateTimeFormat"
                    v-model="PreOperativeProcedureHandoverChecklistsData.DateTimeHandover"
                  />
                </td>
              </tr>
            </table>
            <div class="v-tab">
              <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#tab1" aria-controls="tab1" role="tab" data-toggle="tab">{{__t('Nội dung bàn giao')}}</a></li>
                <li role="presentation"><a href="#tab2" aria-controls="tab2" role="tab" data-toggle="tab">{{__t('Phiếu kiểm gạc và dụng cụ phẫu thuật')}}</a></li>
              </ul>
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="tab1">
                  <table class="table v-table-1 table-bordered">
                    <tr class="text-left">
                      <th rowspan="2" class="col-1">{{__t('STT')}}</th>
                      <th rowspan="2" class="col-60">{{__t('Nội dung bàn giao')}}</th>
                      <th colspan="3" class="text-center">{{__t('Khoa')}}</th>
                      <th rowspan="2" class="col-1 no-wrap text-center">{{__t('Phòng mổ')}}</th>
                    </tr>
                    <tr class="text-center">
                      <th class="col-5">{{__t('Có')}}</th>
                      <th class="col-5">{{__t('Không')}}</th>
                      <th class="col-5">{{__t('Khác')}}</th>
                    </tr>
                    <tr v-if="MASTERDATA['PHCPIA']">
                      <td class="text-center">1</td>
                      <td>{{__label(MASTERDATA['PHCPIA'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHCPIA'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCPIAradio-' + index" v-model="item.Value">
                            <label :for="'PHCPIAradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCPIA'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCPIAradio-' + index" v-model="item.Value">
                            <label :for="'PHCPIAradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCIBC']">
                      <td class="text-center">2</td>
                      <td>{{__label(MASTERDATA['PHCIBC'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHCIBC'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCIBCradio-' + index" v-model="item.Value">
                            <label :for="'PHCIBCradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCIBC'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCIBCradio-' + index" v-model="item.Value">
                            <label :for="'PHCIBCradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCSCF']">
                      <td class="text-center">3</td>
                      <td>{{__label(MASTERDATA['PHCSCF'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHCSCF'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCSCFradio-' + index" v-model="item.Value">
                            <label :for="'PHCSCFradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCSCF'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCSCFradio-' + index" v-model="item.Value">
                            <label :for="'PHCSCFradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCPCA']">
                      <td class="text-center">4</td>
                      <td>{{__label(MASTERDATA['PHCPCA'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHCPCA'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCPCAradio-' + index" v-model="item.Value">
                            <label :for="'PHCPCAradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCPCA'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCPCAradio-' + index" v-model="item.Value">
                            <label :for="'PHCPCAradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHC36']">
                      <td class="text-center">5</td>
                      <td>{{__label(MASTERDATA['PHC36'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHC36'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHC36radio-' + index" v-model="item.Value">
                            <label :for="'PHC36radio-' + index" @click="checkbox2RadioText(MASTERDATA['PHC36'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'Checkbox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHC36radio-' + index" v-model="item.Value">
                            <label :for="'PHC36radio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCPMR']">
                      <td class="text-center">6</td>
                      <td>{{__t('Đã hoàn thành biên bản hội chẩn trước mổ, có trong hồ sơ bệnh án')}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHCPMR'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCPMRradio-' + index" v-model="item.Value">
                            <label :for="'PHCPMRradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCPMR'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCPMRradio-' + index" v-model="item.Value">
                            <label :for="'PHCPMRradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCSCP']">
                      <td class="text-center">7</td>
                      <td>{{__label(MASTERDATA['PHCSCP'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHCSCP'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCSCPradio-' + index" v-model="item.Value">
                            <label :for="'PHCSCPradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCSCP'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCSCPradio-' + index" v-model="item.Value">
                            <label :for="'PHCSCPradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCLRC']">
                      <td class="text-center">8</td>
                      <td>{{__label(MASTERDATA['PHCLRC'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHCLRC'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCLRCradio-' + index" v-model="item.Value">
                            <label :for="'PHCLRCradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCLRC'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCLRCradio-' + index" v-model="item.Value">
                            <label :for="'PHCLRCradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCXUS']">
                      <td class="text-center">9</td>
                      <td>
                        <div class="d-flex flex-center">
                          <p class="mb-0 mr-5">{{__t('Phim')}}</p>
                          <template v-for="(item,index) in MASTERDATA['PHCXUS'].Items">
                            <span :key="index" v-if="item.DataType === 'Select'">
                              <v-select v-if="allowEdit" v-model="item.Value" :items="JSONParsePHCXUS(item.Data)" :multi="true"/>
                              <p v-else class="fake-input disable mb-0" style="white-space: unset; display: inline-block">
                                {{getDataPHCXUS('vi')}}
                              </p>
                              {{__t('đã được kiểm tra và kết quả có trong hồ sơ bệnh án')}}
                            </span>
                          </template>
                        </div>
                        <div class="d-flex flex-center mt-5">
                          <p class="mb-0 mr-5">{{__label(MASTERDATA['PHC41'])}}</p>
                          <VNumberInput
                            style="max-width: 169px;"
                            class="m-0"
                            v-model="MASTERDATA['PHC41'].Items[0].Value"
                            :readonly="!allowEdit"
                            :maxlength="20"
                            :placeholder="__t('Nhập')"
                          />
                        </div>
                      </td>
                      <template v-for="(item,index) in MASTERDATA['PHCXUS'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCXUSradio-' + index" v-model="item.Value">
                            <label :for="'PHCXUSradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCXUS'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCXUSradio-' + index" v-model="item.Value">
                            <label :for="'PHCXUSradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCFF0']">
                      <td class="text-center">10</td>
                      <td v-if="MASTERDATA['PHCFF0']">
                        <div class="d-flex flex-center">
                          <p class="mb-0 mr-5">{{__label(MASTERDATA['PHCFF0'])}}</p>
                          <VDatePicker
                            class="w1510 display-inline"
                            :readonly="!allowEdit"
                            :hideTooltip="false"
                            :allday="'allday'"
                            :format="vDateTimeFormat"
                            v-model="MASTERDATA['PHCFF0'].Items[0].Value"
                          />
                        </div>
                      </td>
                      <template v-for="(item,index) in MASTERDATA['PHCFF0'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCFF0radio-' + index" v-model="item.Value">
                            <label :for="'PHCFF0radio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCFF0'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCFF0radio-' + index" v-model="item.Value">
                            <label :for="'PHCFF0radio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCEG0']">
                      <td class="text-center">11</td>
                      <td v-if="MASTERDATA['PHCEG0']">
                        <div class="d-flex flex-center">
                          <p class="mb-0 mr-5 w140">{{__label(MASTERDATA['PHCEG0'])}}</p>
                          <VDatePicker
                            class="w1510 display-inline"
                            :readonly="!allowEdit"
                            :hideTooltip="false"
                            :allday="'allday'"
                            :format="vDateTimeFormat"
                            v-model="MASTERDATA['PHCEG0'].Items[0].Value"
                          />
                        </div>
                      </td>
                      <template v-for="(item,index) in MASTERDATA['PHCEG0'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCEG0radio-' + index" v-model="item.Value">
                            <label :for="'PHCEG0radio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCEG0'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCEG0radio-' + index" v-model="item.Value">
                            <label :for="'PHCEG0radio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCAKA']" class="highlighted">
                      <td class="text-center">12</td>
                      <td>
                        <p class="mb-0 mr-5 no-wrap">{{__label(MASTERDATA['PHCAKA'])}}</p>
                        <input v-if="allowEdit" v-model="MASTERDATA['PHCAKA'].Items[0].Value" class="form-control" :placeholder="'Nhập'"/>
                        <p v-else class="fake-input disable mb-0" style="white-space: unset;">
                          {{MASTERDATA['PHCAKA'].Items[0].Value || 'N/A'}}
                        </p>
                      </td>
                      <template v-for="(item,index) in MASTERDATA['PHCAKA'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCAKAradio-' + index" v-model="item.Value">
                            <label :for="'PHCAKAradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCAKA'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCAKAradio-' + index" v-model="item.Value">
                            <label :for="'PHCAKAradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHC43']">
                      <td class="text-center">13</td>
                      <td>{{__label(MASTERDATA['PHC43'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHC43'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCSICradio-' + index" v-model="item.Value">
                            <label :for="'PHCSICradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHC43'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'Checkbox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCSICradio-' + index" v-model="item.Value">
                            <label :for="'PHCSICradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCSIC']">
                      <td class="text-center">14</td>
                      <td>{{__label(MASTERDATA['PHCSIC'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHCSIC'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCOSSradio-' + index" v-model="item.Value">
                            <label :for="'PHCOSSradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCSIC'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCOSSradio-' + index" v-model="item.Value">
                            <label :for="'PHCOSSradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHC48']">
                      <td class="text-center">15.1</td>
                      <td>{{__label(MASTERDATA['PHC48'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHC48'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHC48radio-' + index" v-model="item.Value">
                            <label :for="'PHC48radio-' + index" @click="checkbox2RadioText(MASTERDATA['PHC48'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'Checkbox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHC48radio-' + index" v-model="item.Value">
                            <label :for="'PHC48radio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHC53']">
                      <td class="text-center">15.2</td>
                      <td>{{__label(MASTERDATA['PHC53'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHC53'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHC53radio-' + index" v-model="item.Value">
                            <label :for="'PHC53radio-' + index" @click="checkbox2RadioText(MASTERDATA['PHC53'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'Checkbox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHC53radio-' + index" v-model="item.Value">
                            <label :for="'PHC53radio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCAPO']">
                      <td class="text-center">16</td>
                      <td>{{__label(MASTERDATA['PHCAPO'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHCAPO'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCAPOradio-' + index" v-model="item.Value">
                            <label :for="'PHCAPOradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCAPO'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCAPOradio-' + index" v-model="item.Value">
                            <label :for="'PHCAPOradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCNCA']">
                      <td class="text-center">17</td>
                      <td>{{__label(MASTERDATA['PHCNCA'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHCNCA'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCNCAradio-' + index" v-model="item.Value">
                            <label :for="'PHCNCAradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCNCA'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCNCAradio-' + index" v-model="item.Value">
                            <label :for="'PHCNCAradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCAMR']">
                      <td class="text-center">18</td>
                      <td>{{__label(MASTERDATA['PHCAMR'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHCAMR'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCAMRradio-' + index" v-model="item.Value">
                            <label :for="'PHCAMRradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCAMR'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCAMRradio-' + index" v-model="item.Value">
                            <label :for="'PHCAMRradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCJBP']">
                      <td class="text-center">19</td>
                      <td>{{__label(MASTERDATA['PHCJBP'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHCJBP'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCJBPradio-' + index" v-model="item.Value">
                            <label :for="'PHCJBPradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCJBP'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCJBPradio-' + index" v-model="item.Value">
                            <label :for="'PHCJBPradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHC58']">
                      <td class="text-center">20</td>
                      <td>{{__label(MASTERDATA['PHC58'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHC58'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHC58radio-' + index" v-model="item.Value">
                            <label :for="'PHC58radio-' + index" @click="checkbox2RadioText(MASTERDATA['PHC58'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'Checkbox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHC58radio-' + index" v-model="item.Value">
                            <label :for="'PHC58radio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCACC']">
                      <td class="text-center">21</td>
                      <td>
                        <p class="mb-0 mr-5 no-wrap">{{__label(MASTERDATA['PHCACC'])}}</p>
                        <input v-if="allowEdit" v-model="MASTERDATA['PHCACC'].Items[0].Value" class="form-control" :placeholder="'Nhập'"/>
                        <p v-else class="fake-input disable mb-0" style="white-space: unset;">
                          {{MASTERDATA['PHCACC'].Items[0].Value || 'N/A'}}
                        </p>
                      </td>
                      <template v-for="(item,index) in MASTERDATA['PHCACC'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCACCradio-' + index" v-model="item.Value">
                            <label :for="'PHCACCradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCACC'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCACCradio-' + index" v-model="item.Value">
                            <label :for="'PHCACCradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHC63']">
                      <td class="text-center">22</td>
                      <td>{{__label(MASTERDATA['PHC63'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHC63'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCPMGradio-' + index" v-model="item.Value">
                            <label :for="'PHCPMGradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHC63'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'Checkbox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCPMGradio-' + index" v-model="item.Value">
                            <label :for="'PHCPMGradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCICI']">
                      <td class="text-center">23</td>
                      <td>{{__label(MASTERDATA['PHCICI'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHCICI'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCICIradio-' + index" v-model="item.Value">
                            <label :for="'PHCICIradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCICI'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCICIradio-' + index" v-model="item.Value">
                            <label :for="'PHCICIradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCCBBS']">
                      <td class="text-center">24</td>
                      <td>{{__label(MASTERDATA['PHCCBBS'])}}</td>
                      <template v-for="(item,index) in MASTERDATA['PHCCBBS'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCCBBSradio-' + index" v-model="item.Value">
                            <label :for="'PHCCBBSradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCCBBS'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCCBBSradio-' + index" v-model="item.Value">
                            <label :for="'PHCCBBSradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="MASTERDATA['PHCOTH']">
                      <td class="text-center">25</td>
                      <td>
                        <p class="mb-0 mr-5">{{__label(MASTERDATA['PHCOTH'])}}</p>
                        <input v-if="allowEdit" v-model="MASTERDATA['PHCOTH'].Items[0].Value" class="form-control inline" style="width: 100%;" :placeholder="'Nhập'"/>
                        <p v-else class="fake-input disable mb-0" style="white-space: unset;">
                          {{MASTERDATA['PHCOTH'].Items[0].Value || 'N/A'}}
                        </p>
                      </td>
                      <template v-for="(item,index) in MASTERDATA['PHCOTH'].Items">
                        <td :data="item" :key="index" v-if="item.DataType === 'Radio'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'PHCOTHradio-' + index" v-model="item.Value">
                            <label :for="'PHCOTHradio-' + index" @click="checkbox2RadioText(MASTERDATA['PHCOTH'].Items, item)"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                        <td :data="item" :key="index" v-if="item.DataType === 'CheckBox'" class="text-center">
                          <div v-if="allowEdit" class="v-checkbox">
                            <input type="checkbox" :id="'PHCOTHradio-' + index" v-model="item.Value">
                            <label :for="'PHCOTHradio-' + index"></label>
                          </div>
                          <CheckboxValue v-else v-model="item.Value"/>
                        </td>
                      </template>
                    </tr>
                  </table>
                  <Confirm
                    v-if="PreOperativeProcedureHandoverChecklistsData && PreOperativeProcedureHandoverChecklistsData.Id"
                    class="mt-10"
                    :MasterDataCode="'PHCCONFIRM'"
                    :FormCode="getConfirmFormCode"
                    :VisitId="$route.params.Id"
                    :FormId="PreOperativeProcedureHandoverChecklistsData.Id"
                    :ReadOnly="IsLocked"
                    @getListConfirm="getListConfirm"
                    @handleConfirm="handleSave"
                  />
                  <logs :EdId="this.$route.params.Id" :Type="'PreOperativeProcedureHandoverChecklists'" />
                  <p style="margin: 0;margin-top: 20px;">A03_035_201022_VE</p>
                  <p class="mt-10">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="PreOperativeProcedureHandoverChecklistsData.UpdatedBy" /> {{__t('lúc')}} {{PreOperativeProcedureHandoverChecklistsData.UpdatedAt | formatDateWithoutSecon}}</p>
                  <!-- footer -->
                  <FloatBlock :openBack="true" @handleBack="back()">
                    <template slot='buttons'>
                      <div class="col-md-2 col-sm-2">
                        <div class="form-group1">
                        </div>
                      </div>
                      <div class="col-md-2 col-sm-2">
                        <div class="form-group1">
                          <button class="btn btn-info pull-right" type="button" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
                        </div>
                      </div>
                      <div class="col-md-2 col-sm-2">
                      </div>
                      <div class="col-md-6 col-sm-6">
                        <div class="form-group1">
                          <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="submitPreOperativeProcedureHandoverChecklistsData()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                        </div>
                      </div>
                    </template>
                  </FloatBlock>
                </div>
                <div role="tabpanel" class="tab-pane" id="tab2">
                  <table class="table v-table-1 table-bordered">
                    <tr class="text-left">
                      <th class="col-20" rowspan="3">
                        {{__t('Dụng vụ/vật tư')}}
                      </th>
                      <th class="col-30 text-center" colspan="4">
                        {{__t('Số lượng xuất ra')}}
                      </th>
                      <th class="col-40 text-center" colspan="7">
                        {{__t('Số lượng xuất ra')}}
                      </th>
                    </tr>
                    <tr class="text-center">
                      <th rowspan="2">{{__t('Ban đầu')}}</th>
                      <th rowspan="2">{{__t('Thêm')}}</th>
                      <th rowspan="2">{{__t('Thêm')}}</th>
                      <th rowspan="2">{{__t('Tổng')}}</th>
                      <th colspan="2">{{__t('Lần 1')}}</th>
                      <th colspan="2">{{__t('Lần 2')}}</th>
                      <th colspan="2">{{__t('Lần 3')}}</th>
                      <th rowspan="2">{{__t('Tổng')}}</th>
                    </tr>
                    <tr class="text-center">
                      <th>{{__t('Bẩn')}}</th>
                      <th>{{__t('Sạch')}}</th>
                      <th>{{__t('Bẩn')}}</th>
                      <th>{{__t('Sạch')}}</th>
                      <th>{{__t('Bẩn')}}</th>
                      <th>{{__t('Sạch')}}</th>
                    </tr>
                    <tr :data="c" :key="i" v-for="(c,i) in CODE2" class="text-left">
                      <template v-if="MASTERDATA[c]">
                        <th>
                          {{__label(MASTERDATA[c])}}
                        </th>
                        <template v-for="(item,index3) in MASTERDATA[c].Items">
                          <td :data="item" :key="index3" class="text-center" v-if="index3 <= 10">
                            <input type="text" class="form-control" v-model="item.Value"/>
                          </td>
                        </template>
                      </template>
                    </tr>
                    <template v-for="(it,i) in CODE3">
                      <tr class="text-left" :key="i + '23432'" :data="it">
                        <template v-if="MASTERDATA[it]" >
                          <td :data="item" :key="index2" class="text-center" v-for="(item,index2) in MASTERDATA[it].Items">
                            <input type="text" class="form-control" v-model="item.Value"/>
                          </td>
                        </template>
                      </tr>
                    </template>
                    <tr class="text-left">
                      <th colspan="15">
                        {{__t('Kết luận')}}
                      </th>
                    </tr>
                    <template v-if="MASTERDATA['SSACON']">
                      <tr :data="item" :key="index + 'SSACON'" v-for="(item,index) in MASTERDATA['SSACON'].Items">
                        <td v-if="item.DataType === 'Radio'" colspan="15">
                          <div class="v-checkbox radio-style-">
                            <input type="checkbox" :id="'SSACONradio-' + index" v-model="item.Value">
                            <label :for="'SSACONradio-' + index" @click="checkbox2RadioText(MASTERDATA['SSACON'].Items, item)"></label>{{__label(item)}}
                          </div>
                        </td>
                      </tr>
                    </template>
                    <tr v-if="MASTERDATA['SSADOI']">
                      <th>
                        {{__label(MASTERDATA['SSADOI'])}}
                      </th>
                      <td colspan="14">
                        <template v-for="(item,index) in MASTERDATA['SSADOI'].Items">
                          <input class="form-control" :data="item" :key="index + 'SSADOI'" v-model="item.Value" />
                        </template>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['SSAAT0']">
                      <th>
                        {{__label(MASTERDATA['SSAAT0'])}}
                      </th>
                      <td colspan="14">
                        <template v-for="(item,index) in MASTERDATA['SSAAT0'].Items">
                          <input class="form-control" :data="item" :key="index + 'SSAAT0'" v-model="item.Value" />
                        </template>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['SSAFC0']">
                      <th>
                        {{__label(MASTERDATA['SSAFC0'])}}
                      </th>
                      <td colspan="14">
                        <template v-for="(item,index) in MASTERDATA['SSAFC0'].Items">
                          <input class="form-control" :data="item" :key="index + 'SSAFC0'" v-model="item.Value" />
                        </template>
                      </td>
                    </tr>
                    <tr class="text-left">
                      <th colspan="12">
                        <div class="row">
                          <div class="col-md-3">
                            <div class="form-group">
                              <label>{{__t('PHC.thoi_gian_kiem_tra')}}</label>
                              <v-date-picker  class="full-w" :format="vDateTimeFormat" v-model="SpongeSharpsAndInstrumentsCountsSheetsData.DateTimeSheet"/>
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="form-group">
                              <label>{{__t('Điều dưỡng chuẩn bị')}}</label>
                              <input type="text" class="form-control" v-model="SpongeSharpsAndInstrumentsCountsSheetsData.ScrubNurse">
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="form-group">
                              <label>{{__t('Điều dưỡng chuyển người bệnh')}}</label>
                              <input type="text" class="form-control" v-model="SpongeSharpsAndInstrumentsCountsSheetsData.CirculatingNurse">
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="form-group">
                              <label>{{__t('Điều dưỡng tiếp nhận người bệnh')}}</label>
                              <input type="text" class="form-control" v-model="SpongeSharpsAndInstrumentsCountsSheetsData.Surgeon">
                            </div>
                          </div>
                        </div>
                      </th>
                    </tr>
                    <tr>
                      <td colspan="12">
                        <div>
                          <button class="btn pull-right btn-info" type="button" @click="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
                          <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">{{__t('btn.quay_lai')}}</button>
                        </div>
                        <br/>
                        <logs :EdId="this.$route.params.Id" :Type="'PreOperativeProcedureHandoverChecklists'" />
                      </td>
                    </tr>
                  </table>
                  <p style="mt-10">A03_035_201022_VE</p>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div v-else class="text-center">
          <h4>{{__t('Chưa có Bảng kiểm chuẩn bị và bàn giao người bệnh trước phẫu thuật')}}</h4>
          <p v-if="!IsLocked"><button class="btn btn-back v-white-btn" type="button" @click="confirmPopup()">{{__t('Tạo mới')}}</button></p>
        </div>
      </template>
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
import Confirm from '@/components/Form/Confirm3'
import PreOperativeProcedureHandoverChecklists from '@/services/ED/PreOperativeProcedureHandoverChecklists'
import SpongeSharpsAndInstrumentsCountsSheets from '@/services/ED/SpongeSharpsAndInstrumentsCountsSheets'
import VitalSign from '@/services/ED/VitalSign'
import MixinMasterData from '@/mixins/masterdata.js'
import VSelect from '@/components/VSelect.vue'
import VDatePicker from '@/components/VDateTimePicker.vue'
import PrintPage from '@/components/ED/PRINT_PHC_V2.vue'
import Logs from '@/components/Logs.vue'
import NProgress from 'nprogress'
import moment from 'moment'
import _ from 'lodash'
import MixinForm from '@/mixins/form.js'
export default {
  /**
   * The name of the page.
   */
  name: 'PHCIndexV2',
  data () {
    return {
      hasData: false,
      loaded: false,
      data: {},
      SSA: [],
      CODE2: ['SSASG0', 'SSALG0', 'SSASG1', 'SSALAP', 'SSAMEC', 'SSASPH', 'SSALNG', 'SSASNG', 'SSAENT', 'SSAOTH', 'SSAINS', 'SSASM0', 'SSANEE', 'SSASB1', 'SSASI0', 'SSAIPA'],
      CODE3: ['SSAIP1', 'SSAIP2', 'SSAIP3'],
      PreOperativeProcedureHandoverChecklistsData: {},
      SpongeSharpsAndInstrumentsCountsSheetsData: {},
      dataMaster: {},
      IsLocked: false,
      ConfirmInfo: []
    }
  },
  props: ['VisitType'],
  mixins: [MixinMasterData, MixinForm],
  /**
   * The components that the page can use.
   */
  components: {
    VSelect,
    VDatePicker,
    Logs,
    PrintPage,
    Confirm
  },
  watch: {
    PreOperativeProcedureHandoverChecklistsData: {
      handler () {
        this.edited = true
      },
      deep: true
    },
    SpongeSharpsAndInstrumentsCountsSheetsData: {
      handler () {
        this.edited = true
      },
      deep: true
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'PHC'}, () => {
      this.getPreOperativeProcedureHandoverChecklistsData()
    })
    this.getMasterDatas({Form: 'SSA'}, (SSA) => {
      this.SSA = SSA
      this.getSpongeSharpsAndInstrumentsCountsSheetsData()
    })
  },
  computed: {
    allowEdit () {
      return !(this.ConfirmInfo.length > 0 && this.ConfirmInfo[0].ConfirmBy) && !(this.ConfirmInfo.length > 0 && this.ConfirmInfo[1].ConfirmBy) && !(this.ConfirmInfo.length > 0 && this.ConfirmInfo[2].ConfirmBy)
    },
    getConfirmFormCode () {
      if (this._VisitType === 'IPD') {
        return 'IPDBKTPT'
      }
      if (this._VisitType === 'OPD') {
        return 'OPOPH'
      }
      if (this._VisitType === 'ED') {
        return 'EDBKTPT'
      }
      if (this._VisitType === 'EOC') {
        return 'EOCBKTPT'
      }
    }
  },
  methods: {
    getDataPHCXUS (l) {
      try {
        var data = []
        var arr = this.MASTERDATA['PHCXUS'].Items[4].Value
        arr.forEach(element => {
          if (l === 'vi') {
            data.push(element.label)
          } else {
            data.push(element.enlabel)
          }
        })
        var str = data.toString()
        return str || 'N/A'
      } catch (error) {
        return 'N/A'
      }
    },
    async handleSave () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        await this.submitPreOperativeProcedureHandoverChecklistsData()
      }
    },
    getListConfirm (val) {
      this.ConfirmInfo = val
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới Bảng kiểm chuẩn bị và bàn giao người bệnh trước phẫu thuật *?'),
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
    },
    async create () {
      await this.tab1()
      await this.tab2()
      this.reload()
    },
    async tab1 () {
      await new PreOperativeProcedureHandoverChecklists({}, this.getVisitTypeGroupCode()).update('create/' + this.$route.params.Id, {}).then(response => {
      })
    },
    async tab2 () {
      await new SpongeSharpsAndInstrumentsCountsSheets({}, this.getVisitTypeGroupCode()).update('create/' + this.$route.params.Id, {}).then(response => {
      })
    },
    JSONParsePHCXUS (str) {
      var arr = []
      try {
        arr = JSON.parse(str)
      } catch (error) {
        return []
      }
      arr.forEach(e => {
        e.label = e.vilabel
      })
      return arr
    },
    SyncSign (arr) {
      new VitalSign({}, this.getVisitTypeGroupCode()).find(this.$route.params.Id).then(response => {
        this.MASTERDATA[arr[0]].Items[0].Value = (response.SysBP || '') + (response.DiaBP ? `/ ${response.DiaBP}` : '')
        this.MASTERDATA[arr[1]].Items[0].Value = response.RR
        this.MASTERDATA[arr[2]].Items[0].Value = response.Pulse
        this.MASTERDATA[arr[3]].Items[0].Value = response.Temparature
        this.MASTERDATA[arr[4]].Items[0].Value = response.Height
        this.MASTERDATA[arr[5]].Items[0].Value = response.Weight
      })
    },
    print () {
      this.$htmlToPaperPHR('A4PrintPage')
    },
    setNow (item) {
      item.Value = moment(new Date()).format(this.vDateTimeFormat)
    },
    checkbox2RadioBox (items, item) {
      items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'RadioBox')) {
            element.Value = false
          }
        }
      })
    },
    submitPreOperativeProcedureHandoverChecklistsData () {
      NProgress.start()
      this.PreOperativeProcedureHandoverChecklistsData.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items && this.MASTERDATA[property].Group === 'PHC') {
          this.MASTERDATA[property].Items.forEach(item => {
            this.PreOperativeProcedureHandoverChecklistsData.Datas.push({
              Code: item.Code,
              Value: item.Code === 'PHCXUSANS' ? JSON.stringify(item.Value) : item.Value
            })
          })
        }
      }
      setTimeout(() => {
        var DataSubmit = Object.assign({}, this.PreOperativeProcedureHandoverChecklistsData)
        if (typeof DataSubmit.DateTimeHandover === 'object') {
          DataSubmit.DateTimeHandover = moment(DataSubmit.DateTimeHandover).format(this.vDateTimeFormat)
        }
        if (!DataSubmit.DateTimeHandover || DataSubmit.DateTimeHandover === 'Invalid date') {
          DataSubmit.DateTimeHandover = null
        }
        new PreOperativeProcedureHandoverChecklists({}, this.getVisitTypeGroupCode()).update(this.$route.params.Id, DataSubmit).then(response => {
          this.toastedSuccess()
          this.edited = false
          this.reload()
        }).catch(e => {
          this._401ResponseError(e)
        })
      }, 100)
      // setTimeout(() => {
      //   this.reload()
      // }, 1000)
    },
    getPreOperativeProcedureHandoverChecklistsData () {
      new PreOperativeProcedureHandoverChecklists({hidemsg: true}, this.getVisitTypeGroupCode()).find(this.$route.params.Id).then(response => {
        this.PreOperativeProcedureHandoverChecklistsData = response
        this.$store.dispatch('setCurrentFormId', response.Id)
        if (!this.PreOperativeProcedureHandoverChecklistsData.DateTimeHandover) {
          this.PreOperativeProcedureHandoverChecklistsData.DateTimeHandover = moment(new Date()).format(this.vDateTimeFormat)
        } else {
          this.PreOperativeProcedureHandoverChecklistsData.DateTimeHandover = moment(this.PreOperativeProcedureHandoverChecklistsData.DateTimeHandover, this.vDateTimeFormat)
        }
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items && this.MASTERDATA[property].Group === 'PHC') {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.PreOperativeProcedureHandoverChecklistsData.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else if (this.checkString(item.DataType, 'datetime') && exited.Value) {
                  item.Value = exited.Value
                } else {
                  item.Value = exited.Code === 'PHCXUSANS' ? this.JSONParse(exited.Value) : exited.Value
                }
              }
            })
          }
        }
        if (response.IsLocked) {
          this.IsLocked = true
        }
        this.hasData = true
        this.loaded = true
        setTimeout(() => {
          this.dataMaster = JSON.stringify(this.MASTERDATA)
          this.edited = false
        }, 500)
      }).catch(e => {
        if (e.data.IsLocked) {
          this.IsLocked = true
        }
        if (e.data.FormIsLocked) {
          this.IsLocked = true
        }
        if (e.status === 400) {
          this._404()
        }
      })
    },
    submitSpongeSharpsAndInstrumentsCountsSheetsData () {
      NProgress.start()
      this.SpongeSharpsAndInstrumentsCountsSheetsData.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items && this.MASTERDATA[property].Group === 'SSA') {
          this.MASTERDATA[property].Items.forEach(item => {
            this.SpongeSharpsAndInstrumentsCountsSheetsData.Datas.push({
              Code: item.Code,
              Value: item.Value
            })
          })
        }
      }
      setTimeout(() => {
        var DataSubmit = Object.assign({}, this.SpongeSharpsAndInstrumentsCountsSheetsData)
        if (typeof DataSubmit.DateTimeSheet === 'object') {
          DataSubmit.DateTimeSheet = moment(DataSubmit.DateTimeSheet).format(this.vDateTimeFormat)
        }
        new SpongeSharpsAndInstrumentsCountsSheets({}, this.getVisitTypeGroupCode()).update(this.$route.params.Id, DataSubmit).then(response => {
          this.toastedSuccess()
          this.edited = false
        }).catch(e => {
          this._401ResponseError(e)
        })
      }, 100)
    },
    getSpongeSharpsAndInstrumentsCountsSheetsData () {
      new SpongeSharpsAndInstrumentsCountsSheets({}, this.getVisitTypeGroupCode()).find(this.$route.params.Id).then(response => {
        // this.hasData = true
        // this.loaded = true
        this.SpongeSharpsAndInstrumentsCountsSheetsData = response
        // if (response.IsLocked) {
        //   this.IsLocked = true
        // }
        if (!this.SpongeSharpsAndInstrumentsCountsSheetsData.DateTimeSheet) {
          // this.SpongeSharpsAndInstrumentsCountsSheetsData.DateTimeSheet = moment(new Date()).format(this.vDateTimeFormat)
        } else {
          this.SpongeSharpsAndInstrumentsCountsSheetsData.DateTimeSheet = moment(this.SpongeSharpsAndInstrumentsCountsSheetsData.DateTimeSheet, this.vDateTimeFormat)
        }
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items && this.MASTERDATA[property].Group === 'SSA') {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.SpongeSharpsAndInstrumentsCountsSheetsData.Datas, {Code: code})
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
      }).catch(e => {
        // if (e.data.IsLocked) {
        //   this.IsLocked = true
        // }
        // if (e.data.FormIsLocked) {
        //   this.IsLocked = true
        // }
        this.loaded = true
        if (e.status === 400) {
          this._404()
        }
      })
    }
  }
}
</script>
