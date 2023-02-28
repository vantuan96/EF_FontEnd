<template>
  <div>
    <!-- popup -->
    <modal name="MasterDataPopup" transition="pop-out" height="auto" :clickToClose="false" :width="modalWidth">
      <div class="sync-ed-header">{{__t('Bảng đánh giá nguy cơ thuyên tắc mạch')}} <i style="cursor: pointer" @click="closeModal()" class="fa fa-times pull-right fa-2" aria-hidden="true"></i></div>
      <div class="sync-ed-box" style="overflow-x: hidden">
        <div class="row flex-box flex-center mb-10">
          <div class="col-md-4 flex-box flex-center">
            <label class="mb-0 mr-5">{{__t('Bắt đầu đánh giá')}}:</label>
            <v-date-time-picker :readonly="readonlyPopup" :format="vDateTimeFormat" v-model="StartingAssessment" :allday="'allday'" :max="FinishingAssessment"></v-date-time-picker>
          </div>
          <div class="col-md-4 flex-box flex-center">
            <label class="mb-0 mr-5">{{__t('Kết thúc đánh giá')}}:</label>
            <v-date-time-picker :readonly="readonlyPopup" :format="vDateTimeFormat" v-model="FinishingAssessment" :min="StartingAssessment"></v-date-time-picker>
          </div>
          <div class="col-md-4 mr-0">
            <label>{{__t('Người đánh giá')}}: </label>
            <ad-Info :ad="createdBy" />
          </div>
        </div>
        <!-- Đánh giá nguy cơ thuyên tắc mạch bằng thang điểm Caprini -->
        <div class="tbl-title flex-box flex-center flex-between">
          1. {{__t('Đánh giá nguy cơ thuyên tắc mạch bằng thang điểm Caprini')}}
          <a class="collapsed" data-toggle="collapse" data-target="#block-1" aria-expanded="true" aria-controls="block-1">
            <i class="fa fa-angle-double-down"></i>
          </a>
        </div>
        <div id="block-1" class="panel-collapse collapse in">
          <table class="table v-table-1 no-margin col-1-1">
            <!-- Mỗi Dấu Hiệu Được Tính 1 Điểm -->
            <tr>
              <td>
                <div v-if="MASTERDATA['TRFASFGSP1']" class="item-1">
                  <div class="flex-box flex-center">
                    <label class="mr-20">{{__label(MASTERDATA['TRFASFGSP1'])}}</label>
                    <div class="flex-box flex-center">
                      <label class="mr-10">{{__label(MASTERDATA['TRFASFGSP1'].Items[0])}}:</label>
                      <FakeInput style="padding: 5px 20px; transform: translateY(-3px)" :dfl="true" class="fake-input color-orange2" v-model="subTotal1Point"/>
                    </div>
                  </div>
                  <div v-if="MASTERDATA['TRFASFGSP1']" class="flex-box row">
                    <div class="col-md-4 pl-10">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP1'].Items" v-if="item.DataType === 'Checkbox' && index < 13">
                        <div :class="{'pointer-none': index === 3 || index === 9}" :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP1cxo-' + index" v-model="item.Value">
                            <label :for="'TRFASFGSP1cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                    <div class="col-md-4 pl-10">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP1'].Items" v-if="item.DataType === 'Checkbox' && index >= 13 && index < 23">
                        <div :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP1cxo-' + index" v-model="item.Value">
                            <label :for="'TRFASFGSP1cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                    <div style="padding-right: 40px" class="col-md-4 pl-10">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP1'].Items" v-if="item.DataType === 'Checkbox' && index >= 23">
                        <div :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP1cxo-' + index" v-model="item.Value">
                            <label class="v-checkbox-custom" :for="'TRFASFGSP1cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <!-- Mỗi Dấu Hiệu Được Tính 2 Điểm -->
            <tr>
              <td>
                <div class="item-2" v-if="MASTERDATA['TRFASFGSP34']">
                  <div class="flex-box flex-center">
                    <label class="mr-20">{{__label(MASTERDATA['TRFASFGSP34'])}}</label>
                    <div class="flex-box flex-center">
                      <label class="mr-10">{{__label(MASTERDATA['TRFASFGSP34'].Items[0])}}:</label>
                      <FakeInput style="padding: 5px 20px; transform: translateY(-3px)" :dfl="true" class="fake-input color-orange2" v-model="subTotal2Point"/>
                    </div>
                  </div>
                  <div v-if="MASTERDATA['TRFASFGSP34']" class="flex-box row">
                    <div class="col-md-4 pl-10">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP34'].Items" v-if="item.DataType === 'Checkbox' && index < 9">
                        <div :class="{'pointer-none': index === 3}" :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP34cxo-' + index" v-model="item.Value">
                            <label :for="'TRFASFGSP34cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                    <div class="col-md-4 pl-10">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP34'].Items" v-if="item.DataType === 'Checkbox' && index >= 9 && index < 15">
                        <div :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP34cxo-' + index" v-model="item.Value">
                            <label :for="'TRFASFGSP34cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                    <div class="col-md-4 pl-10">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP34'].Items" v-if="item.DataType === 'Checkbox' && index >= 15">
                        <div :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP34cxo-' + index" v-model="item.Value">
                            <label :for="'TRFASFGSP34cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <!-- Mỗi Dấu Hiệu Được Tính 3 Điểm -->
            <tr>
              <td>
                <div class="item-3" v-if="MASTERDATA['TRFASFGSP51']">
                  <div class="flex-box flex-center">
                    <label class="mr-20">{{__label(MASTERDATA['TRFASFGSP51'])}}</label>
                    <div class="flex-box flex-center">
                      <label class="mr-10">{{__label(MASTERDATA['TRFASFGSP51'].Items[0])}}:</label>
                      <FakeInput style="padding: 5px 20px; transform: translateY(-3px)" :dfl="true" class="fake-input color-orange2" v-model="subTotal3Point"/>
                    </div>
                  </div>
                  <div v-if="MASTERDATA['TRFASFGSP51']" class="flex-box row">
                    <div class="col-md-4 pl-10">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP51'].Items" v-if="item.DataType === 'Checkbox' && index < 11">
                        <div :class="{'pointer-none': index === 3}" :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP51cxo-' + index" v-model="item.Value">
                            <label :for="'TRFASFGSP51cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                    <div class="col-md-4 pl-10">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP51'].Items" v-if="item.DataType === 'Checkbox' && index >= 11 && index < 17">
                        <div :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP51cxo-' + index" v-model="item.Value">
                            <label :for="'TRFASFGSP51cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                    <div class="col-md-4 pl-10">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP51'].Items" v-if="item.DataType === 'Checkbox' && index >= 17">
                        <div :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP51cxo-' + index" v-model="item.Value">
                            <label :for="'TRFASFGSP51cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <!-- Mỗi Dấu Hiệu Được Tính 5 Điểm -->
            <tr>
              <td>
                <div class="item-4" v-if="MASTERDATA['TRFASFGSP74']">
                  <div class="flex-box flex-center">
                    <label class="mr-20">{{__label(MASTERDATA['TRFASFGSP74'])}}</label>
                    <div class="flex-box flex-center">
                      <label class="mr-10">{{__label(MASTERDATA['TRFASFGSP74'].Items[0])}}:</label>
                      <FakeInput style="padding: 5px 20px; transform: translateY(-3px)" :dfl="true" class="fake-input color-orange2" v-model="subTotal5Point"/>
                    </div>
                  </div>
                  <div v-if="MASTERDATA['TRFASFGSP74']" class="flex-box row">
                    <div class="col-md-4 pl-10">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP74'].Items" v-if="item.DataType === 'Checkbox' && index < 7">
                        <div :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP74cxo-' + index" v-model="item.Value">
                            <label class="no-wrap" :for="'TRFASFGSP74cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                    <div class="col-md-4 pl-10">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP74'].Items" v-if="item.DataType === 'Checkbox' && index === 7">
                        <div :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP74cxo-' + index" v-model="item.Value">
                            <label class="no-wrap" :for="'TRFASFGSP74cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                    <div class="col-md-4 pl-10">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP74'].Items" v-if="item.DataType === 'Checkbox' && index === 9">
                        <div :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP74cxo-' + index" v-model="item.Value">
                            <label :for="'TRFASFGSP74cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="item-5" v-if="MASTERDATA['TRFASFGSP87']">
                  <div class="flex-box flex-center row">
                    <div class="col-md-4 pl-10">
                      <div class="flex-box flex-center">
                        <label class="mr-10">{{__label(MASTERDATA['TRFASFGSP87'].Items[0])}}</label>
                        <FakeInput style="padding: 5px 30px" :dfl="true" class="fake-input" :class="getColorVteRisk ? getColorVteRisk : null" v-model="subTotalPoint"/>
                      </div>
                    </div>
                    <div class="col-md-4 pl-10">
                      <div class="flex-box flex-center">
                        <label class="mr-10">{{__label(MASTERDATA['TRFASFGSP85'].Items[0])}}</label>
                        <FakeInput style="padding: 5px 30px" :dfl="true" class="fake-input" :class="getColorVteRisk ? getColorVteRisk : null" v-model="getValueVteRisk"/>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <!-- Đánh giá nguy cơ chảy máu theo phẫu thuật -->
        <div v-if="MASTERDATA['TRFASFGSP89']" class="tbl-title flex-box flex-center flex-between">
          2. {{__label(MASTERDATA['TRFASFGSP89'])}}
          <a class="collapsed" data-toggle="collapse" data-target="#block-2" aria-expanded="true" aria-controls="block-2">
            <i class="fa fa-angle-double-down"></i>
          </a>
        </div>
        <div v-if="MASTERDATA['TRFASFGSP89']" id="block-2" class="panel-collapse collapse in">
          <table class="table v-table-1 no-margin col-1-1">
            <tr>
              <td>
                <div class="row">
                  <div class="col-md-2">
                    <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP89'].Items[3].Value}">
                      <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP89'].Items[0].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP89'].Items[1].Value">
                      <label :for="MASTERDATA['TRFASFGSP89'].Items[0].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP89'].Items[0])}}</label>
                    </div>
                  </div>
                  <div v-if="MASTERDATA['TRFASFGSP89'].Items[1].Value" class="col-md-10 flex-box flex-item item-2-hint">
                    <i class="fa fa-lightbulb-o"></i>
                    <p class="ml-5">{{__t('Phẫu thuật tim mạch hoặc chấn thương nghiêm trọng')}}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-2">
                    <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP89'].Items[1].Value}">
                      <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP89'].Items[2].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP89'].Items[3].Value">
                      <label :for="MASTERDATA['TRFASFGSP89'].Items[2].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP89'].Items[2])}}</label>
                    </div>
                  </div>
                  <div v-if="MASTERDATA['TRFASFGSP89'].Items[3].Value" class="col-md-10 flex-box flex-center item-2-hint">
                    <i class="fa fa-lightbulb-o"></i>
                    <p class="ml-5">{{__t('Phẫu thuật vùng bụng- chậu, mạch, lồng ngực, tủy sống, thần kinh và phẫu thuật ngoại chung khác')}}</p>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <!-- Đánh giá nguy cơ chảy máu của từng bệnh nhân bằng bảng Improve -->
        <div v-if="MASTERDATA['TRFASFGSP94']" class="tbl-title flex-box flex-center flex-between">
          3. {{__label(MASTERDATA['TRFASFGSP94'])}}
          <a class="collapsed" data-toggle="collapse" data-target="#block-3" aria-expanded="true" aria-controls="block-3">
            <i class="fa fa-angle-double-down"></i>
          </a>
        </div>
        <div v-if="MASTERDATA['TRFASFGSP94']" id="block-3" class="panel-collapse collapse in">
          <table class="table table-striped">
            <thead class="thead-primary">
              <tr style="background-color: #eee">
                <td scope="row" style="width: 90%"><b>{{__t('Tình trạng bệnh nhân')}}</b></td>
                <td scope="row" style="width: 10%; text-align: center"><b>{{__t('Điểm')}}</b></td>
              </tr>
            </thead>
            <tbody>
              <tr v-if="MASTERDATA['TRFASFGSP95']">
                <td style="vertical-align: middle;">{{__label(MASTERDATA['TRFASFGSP95'])}}</td>
                <td>
                  <div class="btn-action radio-left">
                    <MDRadio :readonly="readonlyPopup" v-model="MASTERDATA['TRFASFGSP95']" :fullWidth="true"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['TRFASFGSP97']">
                <td style="vertical-align: middle;">{{__label(MASTERDATA['TRFASFGSP97'])}}</td>
                <td>
                  <div class="btn-action radio-left">
                    <MDRadio :readonly="readonlyPopup" v-model="MASTERDATA['TRFASFGSP97']" :fullWidth="true"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['TRFASFGSP99']">
                <td style="vertical-align: middle;">{{__label(MASTERDATA['TRFASFGSP99'])}}</td>
                <td>
                  <div class="btn-action radio-left">
                    <MDRadio :readonly="readonlyPopup" v-model="MASTERDATA['TRFASFGSP99']" :fullWidth="true"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['TRFASFGSP101']">
                <td style="vertical-align: middle;">{{__label(MASTERDATA['TRFASFGSP101'])}}</td>
                <td>
                  <div class="btn-action radio-left">
                    <MDRadio :readonly="readonlyPopup" style="pointer-events: none;" v-model="MASTERDATA['TRFASFGSP101']" :fullWidth="true"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['TRFASFGSP103']">
                <td style="vertical-align: middle;">{{__label(MASTERDATA['TRFASFGSP103'])}}</td>
                <td>
                  <div class="btn-action radio-left">
                    <MDRadio :readonly="readonlyPopup" v-model="MASTERDATA['TRFASFGSP103']" :fullWidth="true"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['TRFASFGSP105']">
                <td style="vertical-align: middle;">{{__label(MASTERDATA['TRFASFGSP105'])}}</td>
                <td>
                  <div class="btn-action radio-left">
                    <MDRadio :readonly="readonlyPopup" style="width: 100%" v-model="MASTERDATA['TRFASFGSP105']" :fullWidth="true"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['TRFASFGSP107']">
                <td style="vertical-align: middle;">{{__label(MASTERDATA['TRFASFGSP107'])}}</td>
                <td>
                  <div class="btn-action radio-left">
                    <MDRadio :readonly="readonlyPopup" style="width: 100%" v-model="MASTERDATA['TRFASFGSP107']" :fullWidth="true"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['TRFASFGSP109']">
                <td style="vertical-align: middle;">{{__label(MASTERDATA['TRFASFGSP109'])}}</td>
                <td>
                  <div class="btn-action radio-left">
                    <MDRadio :readonly="readonlyPopup" v-model="MASTERDATA['TRFASFGSP109']" :fullWidth="true"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['TRFASFGSP111']">
                <td style="vertical-align: middle;">{{__label(MASTERDATA['TRFASFGSP111'])}}</td>
                <td>
                  <div class="btn-action radio-left">
                    <MDRadio :readonly="readonlyPopup" v-model="MASTERDATA['TRFASFGSP111']" :fullWidth="true"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['TRFASFGSP113']">
                <td style="vertical-align: middle;">{{__label(MASTERDATA['TRFASFGSP113'])}}</td>
                <td>
                  <div class="btn-action radio-left">
                    <MDRadio :readonly="readonlyPopup" v-model="MASTERDATA['TRFASFGSP113']" :fullWidth="true"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['TRFASFGSP115']">
                <td style="vertical-align: middle;">{{__label(MASTERDATA['TRFASFGSP115'])}}</td>
                <td>
                  <div class="btn-action radio-left">
                    <MDRadio :readonly="readonlyPopup" style="pointer-events: none;" v-model="MASTERDATA['TRFASFGSP115']" :fullWidth="true"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['TRFASFGSP117']">
                <td style="vertical-align: middle;">{{__label(MASTERDATA['TRFASFGSP117'])}}</td>
                <td>
                  <div class="btn-action radio-left">
                    <MDRadio :readonly="readonlyPopup" style="pointer-events: none;" v-model="MASTERDATA['TRFASFGSP117']" :fullWidth="true"/>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['TRFASFGSP119']">
                <td style="vertical-align: middle;">{{__label(MASTERDATA['TRFASFGSP119'])}}</td>
                <td>
                  <div class="btn-action radio-left">
                    <MDRadio :readonly="readonlyPopup" v-model="MASTERDATA['TRFASFGSP119']" :fullWidth="true"/>
                  </div>
                </td>
              </tr>
              <tr style="background-color: #eee">
                <th>{{__t('Tổng điểm')}}</th>
                <th style="text-align: center;" v-if="IMPROVELevel == 0">0</th>
                <th class="color-green3" style="text-align: center;" v-else-if="IMPROVELevel == 1">{{IMPROVETotal}}</th>
                <th style="text-align: center; background-color: red; color: white;" v-else>{{IMPROVETotal}}</th>
              </tr>
              <tr style="background-color: #eee">
                <th>{{__t('Nguy cơ chảy máu')}}</th>
                <th style="text-align: center;" v-if="IMPROVELevel == 0">{{__t('Thấp')}}</th>
                <th class="color-green3" style="text-align: center;" v-else-if="IMPROVELevel == 1">{{__t(`${IMPROVEClassifyRisk[IMPROVELevel]}`)}}</th>
                <th style="text-align: center; background-color: red; color: white;" v-else>{{__t(`${IMPROVEClassifyRisk[IMPROVELevel]}`)}}</th>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- CCĐ thuốc chống đông - cân nhắc điều trị dự phòng bằng biện pháp cơ học -->
        <div v-if="MASTERDATA['TRFASFGSP125']" class="tbl-title flex-box flex-center flex-between">
          4. {{__label(MASTERDATA['TRFASFGSP125'])}}
          <a class="collapsed" data-toggle="collapse" data-target="#block-4" aria-expanded="true" aria-controls="block-4">
            <i class="fa fa-angle-double-down"></i>
          </a>
        </div>
        <div id="block-4" class="panel-collapse collapse in">
          <table class="table v-table-1 no-margin col-1-1">
            <tr>
              <td>
                <div class="item-1">
                  <div v-if="MASTERDATA['TRFASFGSP125']" class="flex-box row">
                    <div class="col-md-6">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP125'].Items" v-if="item.DataType === 'Checkbox' && index < 11">
                        <div :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP125cxo-' + index" v-model="item.Value">
                            <label :for="'TRFASFGSP125cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                    <div class="col-md-6">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP125'].Items" v-if="item.DataType === 'Checkbox' && index >= 11 && index < 23">
                        <div :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP125cxo-' + index" v-model="item.Value">
                            <label :for="'TRFASFGSP125cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <!-- CCĐ của biện pháp cơ học -->
        <div v-if="MASTERDATA['TRFASFGSP144']" class="tbl-title flex-box flex-center flex-between">
          5. {{__label(MASTERDATA['TRFASFGSP144'])}}
          <a class="collapsed" data-toggle="collapse" data-target="#block-5" aria-expanded="true" aria-controls="block-5">
            <i class="fa fa-angle-double-down"></i>
          </a>
        </div>
        <div id="block-5" class="panel-collapse collapse in">
          <table class="table v-table-1 no-margin col-1-1">
            <tr>
              <td>
                <div class="item-1">
                  <div v-if="MASTERDATA['TRFASFGSP144']" class="flex-box row">
                    <div class="col-md-6">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP144'].Items" v-if="item.DataType === 'Checkbox' && index < 7">
                        <div :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP144cxo-' + index" v-model="item.Value">
                            <label :for="'TRFASFGSP144cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                    <div class="col-md-6">
                      <template v-for="(item, index) in MASTERDATA['TRFASFGSP144'].Items" v-if="item.DataType === 'Checkbox' && index >= 7">
                        <div :data="item" :key="index" class="flex-box flex-center mr-10">
                          <div class="v-checkbox">
                            <input :disabled="readonlyPopup" type="checkbox" :id="'TRFASFGSP144cxo-' + index" v-model="item.Value">
                            <label :for="'TRFASFGSP144cxo-' + index">{{__label(item)}}</label>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <!-- Tổng hợp yếu tố nguy cơ và áp dụng biện pháp dự phòng HKTT -->
        <div v-if="MASTERDATA['TRFASFGSP157']" class="tbl-title flex-box flex-center flex-between">
          6. {{__label(MASTERDATA['TRFASFGSP157'])}}
          <a class="collapsed" data-toggle="collapse" data-target="#block-6" aria-expanded="true" aria-controls="block-6">
            <i class="fa fa-angle-double-down"></i>
          </a>
        </div>
        <div v-if="MASTERDATA['TRFASFGSP157']" id="block-6" class="panel-collapse collapse in">
          <Noted />
          <table class="table v-table-1 no-margin col-1-1">
            <tr>
              <td>
                <div class="item-1">
                  <div v-if="MASTERDATA['TRFASFGSP157']" class="flex-box row">
                    <!-- Nguy cơ HKTT thấp + Nguy cơ chảy máu thấp/ cao -->
                    <div v-if="getCombinationRisk === 1" class="col-md-6">
                      <!-- Tất áp lực (3) -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[7].Value || MASTERDATA['TRFASFGSP157'].Items[9].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[4].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[5].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[4].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[4])}}</label>
                      </div>
                      <!-- Vận động sớm -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[5].Value || MASTERDATA['TRFASFGSP157'].Items[9].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[6].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[7].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[6].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[6])}}</label>
                      </div>
                      <!-- Thiết bị bơm hơi ngắt quãng -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[5].Value || MASTERDATA['TRFASFGSP157'].Items[7].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[8].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[9].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[8].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[8])}}</label>
                      </div>
                    </div>
                    <!-- Nguy cơ HKTT trung bình + Nguy cơ chảy máu thấp -->
                    <div v-if="getCombinationRisk === 2" class="col-md-6">
                      <!-- Heparine không phân đoạn liều thấp (1) -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[3].Value || MASTERDATA['TRFASFGSP157'].Items[5].Value || MASTERDATA['TRFASFGSP157'].Items[9].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[0].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[1].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[0].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[0])}}</label>
                      </div>
                      <!-- Enoxaparine (2) -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[1].Value || MASTERDATA['TRFASFGSP157'].Items[5].Value || MASTERDATA['TRFASFGSP157'].Items[9].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[2].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[3].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[2].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[2])}}</label>
                      </div>
                      <!-- Tất áp lực (3) -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[1].Value || MASTERDATA['TRFASFGSP157'].Items[3].Value || MASTERDATA['TRFASFGSP157'].Items[9].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[4].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[5].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[4].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[4])}}</label>
                      </div>
                      <!-- Thiết bị bơm hơi ngắt quãng -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[3].Value || MASTERDATA['TRFASFGSP157'].Items[5].Value || MASTERDATA['TRFASFGSP157'].Items[1].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[8].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[9].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[8].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[8])}}</label>
                      </div>
                    </div>
                    <!-- Nguy cơ HKTT trung bình + Nguy cơ chảy máu cao -->
                    <div v-if="getCombinationRisk === 3" class="col-md-6">
                      <!-- Tất áp lực (3) -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[9].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[4].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[5].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[4].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[4])}}</label>
                      </div>
                      <!-- Thiết bị bơm hơi ngắt quãng -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[5].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[8].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[9].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[8].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[8])}}</label>
                      </div>
                    </div>
                    <!-- Nguy cơ HKTT cao + Nguy cơ chảy máu thấp -->
                    <div v-if="getCombinationRisk === 4" class="col-md-6">
                      <!-- Heparine không phân đoạn liều thấp (1) -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[3].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[0].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[1].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[0].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[0])}}</label>
                      </div>
                      <!-- Enoxaparine (2) -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[1].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[2].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[3].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[2].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[2])}}</label>
                      </div>
                      <!-- Tất áp lực (3) -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[9].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[4].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[5].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[4].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[4])}}</label>
                      </div>
                      <!-- Thiết bị bơm hơi ngắt quãng -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[5].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[8].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[9].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[8].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[8])}}</label>
                      </div>
                    </div>
                    <!-- Nguy cơ HKTT cao + Nguy cơ chảy máu cao -->
                    <div v-if="getCombinationRisk === 5" class="col-md-6">
                      <!-- Tất áp lực (3) -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[9].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[4].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[5].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[4].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[4])}}</label>
                      </div>
                      <!-- Thiết bị bơm hơi ngắt quãng -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[5].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[8].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[9].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[8].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[8])}}</label>
                      </div>
                      <p>{{__t('Khi nguy cơ chảy máu giảm, bổ sung')}}:</p>
                      <!-- Heparine không phân đoạn liều thấp (1) -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[3].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[0].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[1].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[0].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[0])}}</label>
                      </div>
                      <!-- Enoxaparine (2) -->
                      <div class="flex-box flex-center v-checkbox" :class="{'pointer-none': MASTERDATA['TRFASFGSP157'].Items[1].Value}">
                        <input :disabled="readonlyPopup" :id="MASTERDATA['TRFASFGSP157'].Items[2].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['TRFASFGSP157'].Items[3].Value">
                        <label :for="MASTERDATA['TRFASFGSP157'].Items[2].Code" class="display-inline no-wrap">{{__label(MASTERDATA['TRFASFGSP157'].Items[2])}}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <!-- box footer -->
        <div class="mt-10">
          <p style="margin: 0"><b>{{__t('THỜI GIAN ĐIỀU TRỊ')}}:</b> {{__t('đến khi bệnh nhân đi lại được hoàn toàn hoặc xuất viện (thông thường 5 – 10 ngày), cân nhắc kéo dài đến 28 ngày ở bệnh nhân phẫu thuật ung thư vùng bụng – chậu')}}.</p>
          <p style="margin: 0"><b>{{__t('Chú ý')}}:</b> {{__t('Bệnh nhân đang sử dụng thuốc chống đông trước phẫu thuật: tham vấn ý kiến bác sĩ chuyên khoa')}}.</p>
        </div>
        <br/>
        <button v-if="!viewOnly && !readonlyPopup && (!DataSubmit.ConfirmCreated || (DataSubmit.ConfirmCreated && DataSubmit.ConfirmCreated.IsUnlockConfirm)) && this.Version >= 9" class="btn btn-yellow-gradient btn-block" v-shortkey="['ctrl', 's']" @shortkey="save()" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
        <button v-if="!viewOnly && this.Version < 9" class="btn btn-yellow-gradient btn-block" v-shortkey="['ctrl', 's']" @shortkey="save()" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
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
</template>

<script>
import Noted from './Noted.vue'
import ThrombosisRiskFactorAssessment from '@/services/IPD/ThrombosisRiskFactorAssessment'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
import _ from 'lodash'
// import $ from 'jquery'

const MODAL_WIDTH = 1200
const IMPROVECODES = [
  'TRFASFGSP95',
  'TRFASFGSP97',
  'TRFASFGSP99',
  'TRFASFGSP101',
  'TRFASFGSP103',
  'TRFASFGSP105',
  'TRFASFGSP107',
  'TRFASFGSP109',
  'TRFASFGSP111',
  'TRFASFGSP113',
  'TRFASFGSP115',
  'TRFASFGSP117',
  'TRFASFGSP119'
]

export default {
  components: {
    Noted,
    VDateTimePicker
  },
  mixins: [MixinForm, MixinMasterData],
  props: ['viewOnly', 'VisitId', 'readonlyPopup', 'Version'],
  data () {
    return {
      FormCode: 'A01_049_050919_VE',
      createdBy: '',
      formId: '',
      DataSubmit: {},
      StartingAssessment: moment(),
      FinishingAssessment: moment(),
      modalWidth: MODAL_WIDTH,
      colorClass: '',
      IMPROVETotalPoint: 0,
      IMPROVEClassifyRisk: ['N/A', 'Thấp', 'Cao'],
      edited: false,
      DataMaster: {}
    }
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
  },
  computed: {
    subTotal1Point () {
      let total = 0
      if (this.MASTERDATA['TRFASFGSP1']) {
        this.MASTERDATA['TRFASFGSP1'].Items.map(item => {
          if (item.DataType === 'Checkbox' && item.Value) {
            total += 1
          }
        })
        // if (total === 0) {
        //   return 'N/A'
        // }
        return total
      }
    },
    subTotal2Point () {
      let total = 0
      if (this.MASTERDATA['TRFASFGSP34']) {
        this.MASTERDATA['TRFASFGSP34'].Items.map(item => {
          if (item.DataType === 'Checkbox' && item.Value) {
            total += 2
          }
        })
        // if (total === 0) {
        //   return 'N/A'
        // }
        return total
      }
    },
    subTotal3Point () {
      let total = 0
      if (this.MASTERDATA['TRFASFGSP51']) {
        this.MASTERDATA['TRFASFGSP51'].Items.map(item => {
          if (item.DataType === 'Checkbox' && item.Value) {
            total += 3
          }
        })
        // if (total === 0) {
        //   return 'N/A'
        // }
        return total
      }
    },
    subTotal5Point () {
      let total = 0
      if (this.MASTERDATA['TRFASFGSP74']) {
        this.MASTERDATA['TRFASFGSP74'].Items.map(item => {
          if (item.DataType === 'Checkbox' && item.Value) {
            total += 5
          }
        })
        // if (total === 0) {
        //   return 'N/A'
        // }
        return total
      }
    },
    subTotalPoint () {
      let num = 0
      let isNum = false
      if (this.subTotal1Point !== 'N/A' && this.subTotal1Point !== 0) {
        num += Number(this.subTotal1Point)
        isNum = true
      }
      if (this.subTotal2Point !== 'N/A' && this.subTotal2Point !== 0) {
        num += Number(this.subTotal2Point)
        isNum = true
      }
      if (this.subTotal3Point !== 'N/A' && this.subTotal3Point !== 0) {
        num += Number(this.subTotal3Point)
        isNum = true
      }
      if (this.subTotal5Point !== 'N/A' && this.subTotal5Point !== 0) {
        num += Number(this.subTotal5Point)
        isNum = true
      }
      if ((this.subTotal1Point === 'N/A' || this.subTotal2Point === 'N/A' || this.subTotal3Point === 'N/A' || this.subTotal5Point === 'N/A') && isNum === false) {
        return 'N/A'
      } else {
        return num
      }
    },
    getValueVteRisk () {
      if (this.subTotalPoint >= 0 && this.subTotalPoint <= 2) {
        return this.__t('Thấp')
      } else if (this.subTotalPoint >= 3 && this.subTotalPoint <= 4) {
        return this.__t('Trung bình')
      } else if (this.subTotalPoint >= 5) {
        return this.__t('Cao')
      } else {
        return 'N/A'
      }
    },
    getColorVteRisk () {
      if (this.subTotalPoint >= 0 && this.subTotalPoint <= 2) {
        return 'color-green3 text-white'
      } else if (this.subTotalPoint >= 3 && this.subTotalPoint <= 4) {
        return 'color-yellow3'
      } else if (this.subTotalPoint >= 5) {
        return 'color-red3 text-white'
      } else {
        return ''
      }
    },
    IMPROVETotal: function () {
      var IMPROVETotal = 0
      IMPROVECODES.forEach(code => {
        if (this.MASTERDATA[code]) {
          this.MASTERDATA[code].Items.forEach(item => {
            if (item.DataType === 'Radio' && item.Value) {
              IMPROVETotal += this.parseInt(item.ViName)
            }
          })
        }
      })
      return IMPROVETotal
    },
    IMPROVELevel: function () {
      var IMPROVELevel = 0
      var IMPROVETotal = this.IMPROVETotal
      if (IMPROVETotal === 0) {
        IMPROVELevel = 0
      } else if (IMPROVETotal > 0 && IMPROVETotal < 7) {
        IMPROVELevel = 1
      } else {
        IMPROVELevel = 2
      }
      return IMPROVELevel
    },
    getCombinationRisk () {
      if (this.getValueVteRisk === this.__t('Thấp')) {
        // Nguy cơ HKTT thấp + Nguy cơ chảy máu thấp/ cao
        return 1
      } else if (this.getValueVteRisk === this.__t('Trung bình') && this.IMPROVELevel === 1) {
        // Nguy cơ HKTT trung bình + Nguy cơ chảy máu thấp
        return 2
      } else if (this.getValueVteRisk === this.__t('Trung bình') && this.IMPROVELevel !== 1) {
        // Nguy cơ HKTT trung bình + Nguy cơ chảy máu cao
        return 3
      } else if (this.getValueVteRisk === this.__t('Cao') && this.IMPROVELevel === 1) {
        // Nguy cơ HKTT cao + Nguy cơ chảy máu thấp
        return 4
      } else if (this.getValueVteRisk === this.__t('Cao') && this.IMPROVELevel !== 1) {
        // Nguy cơ HKTT cao + Nguy cơ chảy máu cao
        return 5
      }
    }
  },
  methods: {
    getDetail (id) {
      this.formId = id
      var url = '/Detail/' + id
      this.getMasterDatas({ Form: 'A01_049_050919_VE' }, () => {
        new ThrombosisRiskFactorAssessment().find(url).then(response => {
          this.DataSubmit = response
          this.StartingAssessment = moment(response.StartingAssessment, 'YYYY/MM/DD HH:mm:ss')
          this.FinishingAssessment = moment(response.FinishingAssessment, 'YYYY/MM/DD HH:mm:ss')
          this.IMPROVETotalPoint = response.IMPROVETotalPoint
          this.createdBy = response.CreatedBy
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(this.DataSubmit.Datas, {Code: code})
                if (exited) {
                  if (this.checkString(item.DataType, 'Checkbox') || this.checkString(item.DataType, 'Radio')) {
                    var isTrue = (exited.Value === 'True')
                    item.Value = isTrue
                  } else {
                    item.Value = exited.Value
                  }
                }
              })
            }
          }
          this.$modal.show('MasterDataPopup')
        })
      })
    },
    create () {
      this.formId = null
      let patientInfo = null
      if (this.$store.state.account.CurrentPatient) {
        patientInfo = this.$store.state.account.CurrentPatientObj
      }
      this.getMasterDatas({ Form: 'A01_049_050919_VE' }, () => {
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              if (item.Code === 'TRFASFGSP118') {
                if (patientInfo.Gender === 1) {
                  item.Value = true
                }
              } else if (item.Code === 'TRFASFGSP55') {
                if (patientInfo.Age >= 75) {
                  item.Value = true
                }
              } else if (item.Code === 'TRFASFGSP116') {
                if (patientInfo.Age >= 40 && patientInfo.Age <= 84) {
                  item.Value = true
                }
              } else if (item.Code === 'TRFASFGSP102') {
                if (patientInfo.Age >= 85) {
                  item.Value = true
                }
              } else if (item.Code === 'TRFASFGSP5') {
                if (patientInfo.Age >= 41 && patientInfo.Age <= 60) {
                  item.Value = true
                }
              } else if (item.Code === 'TRFASFGSP38') {
                if (patientInfo.Age >= 61 && patientInfo.Age <= 74) {
                  item.Value = true
                }
              } else if (item.Code === 'TRFASFGSP11') {
                let weight = patientInfo.Weight
                let height = patientInfo.Height
                if (weight && height) {
                  let bmi = weight / ((height / 100) * (height / 100))
                  if (bmi > 30) {
                    item.Value = true
                  }
                }
              }
            })
          }
        }
      })
      this.StartingAssessment = moment().format('HH:mm DD/MM/YYYY')
      this.FinishingAssessment = moment().format('HH:mm DD/MM/YYYY')
      this.createdBy = this.getUser()
      this.$modal.show('MasterDataPopup')
    },
    save () {
      let obj = {}
      this.DataSubmit.VTERiskFactors = []
      this.DataSubmit.paduaTotalPoint = ''
      this.DataSubmit.ContraindicationsForAntiCoagulant = []
      this.DataSubmit.MechanicalProphylaxis = []
      this.DataSubmit.ConditionOfPatient = []
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      // 2. Đánh giá nguy cơ chảy máu theo phẫu thuật
      if (this.MASTERDATA['TRFASFGSP89']) {
        this.MASTERDATA['TRFASFGSP89'].Items.forEach(item => {
          if (item.DataType === 'Checkbox' && item.Value) {
            this.DataSubmit.ConditionOfPatient.push({
              ViName: item.ViName,
              EnName: item.EnName
            })
          }
        })
      }
      // 4. CCĐ thuốc chống đông - cân nhắc điều trị dự phòng bằng biện pháp cơ học
      if (this.MASTERDATA['TRFASFGSP125']) {
        this.MASTERDATA['TRFASFGSP125'].Items.forEach(item => {
          if (item.DataType === 'Checkbox' && item.Value) {
            this.DataSubmit.ContraindicationsForAntiCoagulant.push({
              ViName: item.ViName,
              EnName: item.EnName
            })
          }
        })
      }
      //  5. CCĐ của biện pháp cơ học
      if (this.MASTERDATA['TRFASFGSP144']) {
        this.MASTERDATA['TRFASFGSP144'].Items.forEach(item => {
          if (item.DataType === 'Checkbox' && item.Value) {
            this.DataSubmit.MechanicalProphylaxis.push({
              ViName: item.ViName,
              EnName: item.EnName
            })
          }
        })
      }
      // 6. Tổng hợp yếu tố nguy cơ và áp dụng biện pháp dự phòng HKTT
      if (this.MASTERDATA['TRFASFGSP157']) {
        this.MASTERDATA['TRFASFGSP157'].Items.forEach(item => {
          if (item.DataType === 'Checkbox' && item.Value) {
            this.DataSubmit.VTERiskFactors.push({
              ViName: item.ViName,
              EnName: item.EnName
            })
          }
        })
      }
      this.DataSubmit.FormCode = this.FormCode
      // 1. Đánh giá nguy cơ thuyên tắc bằng thang điểm Caprini
      if (this.subTotalPoint === 'N/A') {
        this.DataSubmit.paduaTotalPoint = 0
      } else {
        this.DataSubmit.paduaTotalPoint = this.subTotalPoint
      }
      // 3. Đánh giá nguy cơ chảy máu của từng bệnh nhân bằng bảng Improve
      this.DataSubmit.IMPROVETotalPoint = this.IMPROVETotal
      this.DataSubmit.VTERiskFactors = JSON.stringify(this.DataSubmit.VTERiskFactors)
      this.DataSubmit.ContraindicationsForAntiCoagulant = JSON.stringify(this.DataSubmit.ContraindicationsForAntiCoagulant)
      this.DataSubmit.MechanicalProphylaxis = JSON.stringify(this.DataSubmit.MechanicalProphylaxis)
      this.DataSubmit.ConditionOfPatient = JSON.stringify(this.DataSubmit.ConditionOfPatient)
      this.DataSubmit.StartingAssessment = moment(this.StartingAssessment, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY')
      this.DataSubmit.FinishingAssessment = moment(this.FinishingAssessment, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY')
      var url = ''
      if (this.formId) {
        url = '/Update/' + this.formId
      } else {
        url = '/Create/' + this._VisitId
      }
      new ThrombosisRiskFactorAssessment().update(url, this.DataSubmit).then(response => {
        this.toastedSuccess()
        setTimeout(() => {
          this.$modal.hide('MasterDataPopup')
          this.reload()
        }, 500)
      })
    },
    closeModal () {
      if (this.readonlyPopup) {
        this.$modal.hide('MasterDataPopup')
      } else {
        this.$modal.show('closeWarning')
      }
    },
    confirmSkip () {
      this.$modal.hide('closeWarning')
    },
    confirmClose () {
      this.$modal.hide('closeWarning')
      this.$modal.hide('MasterDataPopup')
    },
    openPopup () {
      this.create()
    }
  }
}
</script>
<style lang="stylus" scoped>
.tbl-title i {
  font-size: 20px;
  color: white;
  transform: translateY(2px);
  cursor pointer;
}
#block-2 {
  .item-2-hint {
    transform: translateY(7px);
    i {
      font-size: 20px;
      color: orange;
    }
    p {
      font-style: italic;
      margin-bottom: 0;
    }
  }
}
.sync-ed-header {
  text-align: center;
  font-size: 20px;
}
.flex-center {
  align-items: center;
}
.flex-between {
  justify-content: space-between;
}
.pointer-none {
  pointer-events: none;
}
.v-checkbox input[type=checkbox] + label {
  display: -webkit-inline-box;
  text-align: left;
  font-weight: normal !important;
}
.v-checkbox input[type=checkbox] + label:before {
  margin-left: 0;
  margin-right: 5px;
  transform: translateY(-5px);
  display: block;
}
.text-white {
  color: white;
  font-weight: bold;
}
.color-orange2 {
  background: #f1c232!important;
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
  background: #FF0000!important;
}
</style>
