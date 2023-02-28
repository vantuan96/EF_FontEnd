<template>
  <div>
    <div v-if="loaded">
      <Print :DataSubmit="DataSubmit" :CreatedAt="time" :CreatedBy="CreatedBy" :DataInfo="DataInfo" :MASTERDATA="MASTERDATA" :Customer="$store.state.account.CurrentPatientObj"/>
      <div class="text-center" v-if="nullContent">
        <p v-if="!IsLocked && hasRole('GENBRCAPOST')">{{__t('Chưa có Phiếu đánh giá tiêu chuẩn chỉ định xét nghiệm gen BRCA 1/2')}}<sup style="font-size: 10px;">1</sup></p>
          <div v-else style="color: red;" class="italic">
          <h4><i class="fa fa-lock" aria-hidden="true"></i> {{__t('Bạn không được phép chỉnh sửa do hồ sơ đã bị khóa theo nguyên tắc 24h!')}}</h4>
        </div>
        <button class="btn btn-warning" @click="createPopup" v-if="!IsLocked && hasRole('GENBRCAPOST')">{{__t('Tạo mới')}}</button>
      </div>
      <div :class="{'isReadOnly':isReadOnly}" v-else>
        <div class="row">
          <div class="col-md-6">
            <div v-if="DataSubmit" class="flex-box flex-center mb-10">
              <label class="display-inline ml-5 mr-5" style="font-weight: bold">{{__t('Ngày đánh giá')}}:</label>
                <!-- <p>{{this.MASTERDATA['OPDGENBRCA53']}}</p> -->
                <div>
                  <!-- <VDatePicker :class="{'form-control': isReadOnly, 'no-margin': isReadOnly}" :readonly="isReadOnly" :hideTooltip="false" class="display-inline" :format="vDateFormat" v-model="time" :max="timeNow" :min="$store.state.account.CurrentPatientObj.AdmittedDate"/> -->
                  <!-- <VDateTimePicker3 :class="{'form-control': isReadOnly, 'no-margin': isReadOnly}" :readonly="isReadOnly" :hideTooltip="true" v-model="time" :max="timeNow" :min="$store.state.account.CurrentPatientObj.AdmittedDate" :format="'DD/MM/YYYY'"/> -->
                  <v-date-picker :class="{'form-control': isReadOnly, 'no-margin': isReadOnly}" :readonly="isReadOnly" v-model="time" :hideTooltip="true" :format="'DD/MM/YYYY'" :max="timeNow" :minDate="timeMin"/>
                </div>
            </div>
          </div>
          <div class="col-md-6">
            <div v-if="DataSubmit" class="flex-box flex-center" style="transform: translateY(5px)">
              <label class="display-inline ml-5 mr-5" style="font-weight: bold; margin-bottom: 0">Người thực hiện:</label>
              <div class="search-name">
                <ad-Info :ad="CreatedBy" />
              </div>
            </div>
          </div>
        </div>
        <div class="tbl-title">{{__t('Chỉ định xét nghiệm gen BRCA 1/2 nếu đáp ứng được một hoặc một số tiêu chí dưới đây:')}}</div>
        <table class="table v-table-1 no-margin col-1-1" id="GENBRCA1-block1">
          <tr>
            <td style="max-width: 500px;">
              <p style="font-style: italic">Lưu ý: Xét nghiệm di truyền cho người không có chẩn đoán ung thư chỉ nên xem xét khi không có sẵn thành viên nào của gia đình đã bị ung thư phù hợp với chỉ định để xét nghiệm.</p>
              <!-- Checkbox-1 -->
              <div class="mt-10" v-if="MASTERDATA['OPDGENBRCA1']">
                <template v-for="(item, index) in MASTERDATA['OPDGENBRCA1'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center mb-10">
                      <CheckboxValue style="font-size: 14px;" v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDGENBRCA1radio-' + index" v-model="item.Value">
                        <label :for="'OPDGENBRCA1radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
              </div>
              <!-- Checkbox2 -->
              <div class="mt-10" v-if="MASTERDATA['OPDGENBRCA3']">
                <template v-for="(item, index) in MASTERDATA['OPDGENBRCA3'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center mb-10">
                      <CheckboxValue style="font-size: 14px;" v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDGENBRCA3radio-' + index" v-model="item.Value">
                        <label :for="'OPDGENBRCA3radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
                <!-- Checkbox2 child -->
                <div v-if="MASTERDATA['OPDGENBRCA3']" :class="{'pointer-none disable-text': !MASTERDATA['OPDGENBRCA3'].Items[0].Value}">
                  <!-- Checkbox2 child 1 -->
                  <div class="checkbox-rounded flex-box flex-center ml-20">
                    <!-- <div class="col-md-6" v-if="!isReadOnly">
                      <MDRadio v-if="MASTERDATA['OPDGENBRCA3']" v-model="MASTERDATA['OPDGENBRCA3']" :indexs="[1]" :fullWidth="false"/>
                    </div> -->
                    <span class="v-checkbox" style="display: flex" v-if="!isReadOnly">
                      <input type="checkbox" :id="'OPDGENBRCA3radio-' + 1" v-model="MASTERDATA['OPDGENBRCA3'].Items[1].Value">
                      <label @click="checkbox2Radio(MASTERDATA['OPDGENBRCA3'].Items, MASTERDATA['OPDGENBRCA3'].Items[1])" :for="'OPDGENBRCA3radio-' + 1"></label>
                      <span class="displaytbl"><span>{{__label(MASTERDATA['OPDGENBRCA3'].Items[1])}}</span></span>
                    </span>
                      <!-- <label @click="checkbox2Radio(MASTERDATA['EIOCAARRECCA'].Items, item)" :for="'PHCSCFradio-' + index"></label> -->
                    <div v-else style="display: flex">
                      <CheckboxValue v-model="MASTERDATA['OPDGENBRCA3'].Items[1].Value"/>
                      <span class="displaytbl"><span>{{__label(MASTERDATA['OPDGENBRCA3'].Items[1])}}</span></span>
                    </div>
                  </div>
                  <!-- Checkbox 2 child 2 -->
                  <div class="checkbox-rounded flex-box flex-center ml-20">
                    <!-- <div class="col-md-6" v-if="!isReadOnly">
                      <MDRadio v-if="MASTERDATA['OPDGENBRCA3']" v-model="MASTERDATA['OPDGENBRCA3']" :indexs="[2]" :fullWidth="false"/>
                    </div> -->
                    <span class="v-checkbox" style="display: flex" v-if="!isReadOnly">
                      <input type="checkbox" :id="'OPDGENBRCA3radio-' + 2" v-model="MASTERDATA['OPDGENBRCA3'].Items[2].Value">
                      <label @click="checkbox2Radio(MASTERDATA['OPDGENBRCA3'].Items, MASTERDATA['OPDGENBRCA3'].Items[2])" :for="'OPDGENBRCA3radio-' + 2"></label>
                      <span class="displaytbl"><span>{{__label(MASTERDATA['OPDGENBRCA3'].Items[2])}}</span></span>
                    </span>
                    <div v-else style="display: flex">
                      <CheckboxValue v-model="MASTERDATA['OPDGENBRCA3'].Items[2].Value"/>
                      <span class="displaytbl"><span>{{__label(MASTERDATA['OPDGENBRCA3'].Items[2])}}</span></span>
                    </div>
                  </div>
                </div>
                  <!-- Element of checkbox 2 child 2 -->
                  <div v-if="MASTERDATA['OPDGENBRCA7']" :class="{'pointer-none disable-text': !MASTERDATA['OPDGENBRCA3'].Items[2].Value}" class="row ml-10" >
                    <div class="col-md-12">
                      <template v-for="(item, index) in MASTERDATA['OPDGENBRCA7'].Items">
                        <div v-if="index >= 0" :key="index">
                          <div :key="index" v-if="item.DataType === 'Checkbox'">
                            <div class="flex-box flex-center ml-20">
                              <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                              <span class="v-checkbox" v-else>
                                <input type="checkbox" :id="'OPDGENBRCA7radio-' + index" v-model="item.Value">
                                <label :for="'OPDGENBRCA7radio-' + index"></label>
                              </span>
                              <span class="displaytbl"><span>{{__label(item)}}</span></span>
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                  <!-- Checkbox 2 child 3 -->
                <div v-if="MASTERDATA['OPDGENBRCA3']" :class="{'pointer-none disable-text': !MASTERDATA['OPDGENBRCA3'].Items[0].Value}">
                  <div class="checkbox-rounded flex-box flex-center ml-20">
                    <!-- <div class="col-md-6" v-if="!isReadOnly">
                      <MDRadio v-if="MASTERDATA['OPDGENBRCA3']" v-model="MASTERDATA['OPDGENBRCA3']" :indexs="[3]" :fullWidth="false"/>
                    </div> -->
                    <span class="v-checkbox" style="display: flex" v-if="!isReadOnly">
                      <input type="checkbox" :id="'OPDGENBRCA3radio-' + 3" v-model="MASTERDATA['OPDGENBRCA3'].Items[3].Value">
                      <label @click="checkbox2Radio(MASTERDATA['OPDGENBRCA3'].Items, MASTERDATA['OPDGENBRCA3'].Items[3])" :for="'OPDGENBRCA3radio-' + 3"></label>
                      <span class="displaytbl"><span>{{__label(MASTERDATA['OPDGENBRCA3'].Items[3])}}</span></span>
                    </span>
                    <div v-else style="display: flex">
                      <CheckboxValue v-model="MASTERDATA['OPDGENBRCA3'].Items[3].Value"/>
                      <span class="displaytbl"><span>{{__label(MASTERDATA['OPDGENBRCA3'].Items[3])}}</span></span>
                    </div>
                  </div>
                    <!-- comment -->
                    <div :class="{'pointer-none disable-text': !MASTERDATA['OPDGENBRCA3'].Items[3].Value}" class="row ml-10">
                      <div class="col-md-12">
                        <template v-for="(item, index) in MASTERDATA['OPDGENBRCA13'].Items">
                          <div v-if="index >= 0" :key="index">
                            <div :key="index" v-if="item.DataType === 'Checkbox'">
                              <div class="flex-box flex-center ml-20">
                                <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                                <span class="v-checkbox" v-else>
                                  <input type="checkbox" :id="'OPDGENBRCA13radio-' + index" v-model="item.Value">
                                  <label :for="'OPDGENBRCA13radio-' + index"></label>
                                </span>
                                <span class="displaytbl"><span>{{__label(item)}}</span></span>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                </div>
                  <!-- Checkbox 2 child 4 -->
                <div v-if="MASTERDATA['OPDGENBRCA3']" :class="{'pointer-none disable-text': !MASTERDATA['OPDGENBRCA3'].Items[0].Value}">
                  <div class="checkbox-rounded flex-box flex-center ml-20">
                    <!-- <div class="col-md-6" v-if="!isReadOnly">
                      <MDRadio v-if="MASTERDATA['OPDGENBRCA3']" v-model="MASTERDATA['OPDGENBRCA3']" :indexs="[4]" :fullWidth="false"/>
                    </div> -->
                    <span class="v-checkbox" style="display: flex" v-if="!isReadOnly">
                      <input type="checkbox" :id="'OPDGENBRCA3radio-' + 4" v-model="MASTERDATA['OPDGENBRCA3'].Items[4].Value">
                      <label @click="checkbox2Radio(MASTERDATA['OPDGENBRCA3'].Items, MASTERDATA['OPDGENBRCA3'].Items[4])" :for="'OPDGENBRCA3radio-' + 4"></label>
                      <span class="displaytbl"><span>{{__label(MASTERDATA['OPDGENBRCA3'].Items[4])}}</span></span>
                    </span>
                    <div v-else style="display: flex">
                      <CheckboxValue v-model="MASTERDATA['OPDGENBRCA3'].Items[4].Value"/>
                      <span class="displaytbl"><span>{{__label(MASTERDATA['OPDGENBRCA3'].Items[4])}}</span></span>
                    </div>
                  </div>
                  <!-- >=1 người có quan hệ huyết thống với  -->
                    <div :class="{'pointer-none disable-text': !MASTERDATA['OPDGENBRCA3'].Items[4].Value}" class="row ml-10">
                      <div class="col-md-12">
                        <template v-for="(item, index) in MASTERDATA['OPDGENBRCA16'].Items">
                          <div :key="index">
                            <div :key="index" v-if="item.DataType === 'Checkbox'">
                              <div class="flex-box flex-center ml-20">
                                <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                                <span class="v-checkbox" v-else>
                                  <input type="checkbox" :id="'OPDGENBRCA16radio-' +index" v-model="item.Value">
                                  <label :for="'OPDGENBRCA16radio-' + index"></label>
                                </span>
                                <span class="displaytbl"><span>{{__label(item)}}</span></span>
                              </div>
                            </div>
                            <div class="row ml-20" :class="{'pointer-none disable-text': !MASTERDATA['OPDGENBRCA16'].Items[0].Value}" v-if="index === 0">
                              <div class="col-md-12" v-if="!isReadOnly">
                                <!-- <MDRadio v-if="MASTERDATA['OPDGENBRCA18']" v-model="MASTERDATA['OPDGENBRCA18']" :indexs="[0,1,2]" :fullWidth="false"/>
                                <MDRadio v-if="MASTERDATA['OPDGENBRCA18']" v-model="MASTERDATA['OPDGENBRCA18']" :indexs="[3,4]" :fullWidth="false"/> -->
                                <template v-for="(item, index) in MASTERDATA['OPDGENBRCA18'].Items">
                                  <div :key="index">
                                    <div :key="index" v-if="item.DataType === 'Radio'">
                                      <div class="checkbox-rounded flex-box flex-center ml-20" style="width: 100%; display: flex; flex-direction: row">
                                        <div v-if="index >= 0 && index <3" style="width: 50%">
                                          <span class="v-checkbox" style="display: flex" v-if="!isReadOnly">
                                            <input type="checkbox" :id="'OPDGENBRCA18radio-' + index" v-model="item.Value">
                                            <label @click="checkbox2Radio(MASTERDATA['OPDGENBRCA18'].Items, item)" :for="'OPDGENBRCA18radio-' + index"></label>
                                            <span class="displaytbl"><span>{{__label(item)}}</span></span>
                                          </span>
                                        </div>
                                        <div v-if="index >=3" style="width: 50%">
                                          <span class="v-checkbox" style="display: flex" v-if="!isReadOnly">
                                            <input type="checkbox" :id="'OPDGENBRCA18radio-' + index" v-model="item.Value">
                                            <label @click="checkbox2Radio(MASTERDATA['OPDGENBRCA18'].Items, item)" :for="'OPDGENBRCA18radio-' + index"></label>
                                            <span class="displaytbl"><span>{{__label(item)}}</span></span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </template>
                              </div>
                              <div v-if="isReadOnly">
                                <template v-for="(item, index) in MASTERDATA['OPDGENBRCA18'].Items">
                                  <div :key="index" v-if="index===0 || index===1 || index===2 || index===3 || index===4" class="flex-box flex-center ml-20" style="display: flex">
                                    <CheckboxValue v-model="item.Value"/>
                                    <span class="displaytbl"><span>{{__label(item)}}</span></span>
                                  </div>
                                </template>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                </div>
              </div>
              <!-- Checkbox3 -->
              <div class="mt-10" v-if="MASTERDATA['OPDGENBRCA26']">
                <template v-for="(item, index) in MASTERDATA['OPDGENBRCA26'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center mb-10">
                      <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDGENBRCA26radio-' + index" v-model="item.Value">
                        <label :for="'OPDGENBRCA26radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
              </div>
              <!-- Checkbox4 -->
              <div class="mt-10" v-if="MASTERDATA['OPDGENBRCA28']">
                <template v-for="(item, index) in MASTERDATA['OPDGENBRCA28'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center mb-10">
                      <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDGENBRCA28radio-' + index" v-model="item.Value">
                        <label :for="'OPDGENBRCA28radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
              </div>
              <!-- Checkbox5 -->
              <div class="mt-10" v-if="MASTERDATA['OPDGENBRCA30']">
                <template v-for="(item, index) in MASTERDATA['OPDGENBRCA30'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center mb-10">
                      <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDGENBRCA30radio-' + index" v-model="item.Value">
                        <label :for="'OPDGENBRCA30radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
              </div>
              <!-- Checkbox6 -->
              <div class="mt-10" v-if="MASTERDATA['OPDGENBRCA32']">
                <template v-for="(item, index) in MASTERDATA['OPDGENBRCA32'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center mb-10">
                      <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDGENBRCA32radio-' + index" v-model="item.Value">
                        <label :for="'OPDGENBRCA32radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
              </div>
              <!-- Checkbox7 -->
              <div class="mt-10" v-if="MASTERDATA['OPDGENBRCA34']">
                <template v-for="(item, index) in MASTERDATA['OPDGENBRCA34'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center mb-10">
                      <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDGENBRCA34radio-' + index" v-model="item.Value">
                        <label :for="'OPDGENBRCA34radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
                <!-- Checkbox7 child -->
                <div :class="{'pointer-none disable-text': !MASTERDATA['OPDGENBRCA34'].Items[0].Value}" class="row">
                  <div class="col-md-12">
                    <template v-for="(item, index) in MASTERDATA['OPDGENBRCA34'].Items">
                      <div v-if="index > 0" :key="index">
                        <div :key="index" v-if="item.DataType === 'Radio'">
                          <div class="checkbox-rounded flex-box flex-center ml-20">
                            <!-- <div class="col-md-12" v-if="!isReadOnly && index === 1">
                              <MDRadio style="font-size: 13.5px; margin-left: 8px;" v-if="MASTERDATA['OPDGENBRCA34']" v-model="MASTERDATA['OPDGENBRCA34']" :indexs="[1]" :fullWidth="true" />
                              <MDRadio style="font-size: 13.5px; margin-right:15px;" v-if="MASTERDATA['OPDGENBRCA34']" v-model="MASTERDATA['OPDGENBRCA34']" :indexs="[2]" :fullWidth="false" />
                              <MDRadio style="font-size: 13.5px; margin-right:15px;" v-if="MASTERDATA['OPDGENBRCA34']" v-model="MASTERDATA['OPDGENBRCA34']" :indexs="[3]" :fullWidth="false" />
                            </div> -->
                            <span class="v-checkbox" style="display: flex" v-if="!isReadOnly">
                              <input type="checkbox" :id="'OPDGENBRCA34radio-' + index" v-model="item.Value">
                              <label @click="checkbox2Radio(MASTERDATA['OPDGENBRCA34'].Items, item)" :for="'OPDGENBRCA34radio-' + index"></label>
                              <span class="displaytbl"><span>{{__label(item)}}</span></span>
                            </span>
                            <div v-if="isReadOnly" style="display: flex">
                              <CheckboxValue style="width: 20px;" v-model="item.Value"/>
                              <span style="font-size: 13.5px;" class="displaytbl"><span>{{__label(item)}}</span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <!-- Checkbox8 -->
              <div class="mt-10" v-if="MASTERDATA['OPDGENBRCA39']">
                <template v-for="(item, index) in MASTERDATA['OPDGENBRCA39'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center mb-10">
                      <CheckboxValue style="max-width: 20px; width: 25px;" v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDGENBRCA39radio-' + index" v-model="item.Value">
                        <label :for="'OPDGENBRCA39radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
              </div>
              <!-- Checkbox9 -->
              <div class="mt-10" v-if="MASTERDATA['OPDGENBRCA41']">
                <template v-for="(item, index) in MASTERDATA['OPDGENBRCA41'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center mb-10">
                      <CheckboxValue style="max-width: 20px; width: 22px;" v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDGENBRCA41radio-' + index" v-model="item.Value">
                        <label :for="'OPDGENBRCA41radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
              </div>
              <!-- Checkbox10 -->
              <div class="mt-10" v-if="MASTERDATA['OPDGENBRCA43']">
                <template v-for="(item, index) in MASTERDATA['OPDGENBRCA43'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center mb-10">
                      <CheckboxValue style="max-width: 20px; width: 31px;" v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDGENBRCA43radio-' + index" v-model="item.Value">
                        <label :for="'OPDGENBRCA43radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
              </div>
            </td>
          </tr>
        </table>
        <div class="tbl-title">{{__t('Chỉ định xét nghiệm đa gen khi:')}}</div>
        <table class="table v-table-1 no-margin col-1-1" id="GENBRCA1-block2">
          <tr>
            <td>
              <!-- Checkbox evaluate1 -->
              <div class="mt-10" v-if="MASTERDATA['OPDGENBRCA45']">
                <template v-for="(item, index) in MASTERDATA['OPDGENBRCA45'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center mb-10">
                      <CheckboxValue style="width: 20px;" v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDGENBRCA45radio-' + index" v-model="item.Value">
                        <label :for="'OPDGENBRCA45radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
              </div>
              <!-- Checkbox evaluate2 -->
              <div class="mt-10" v-if="MASTERDATA['OPDGENBRCA47']">
                <template v-for="(item, index) in MASTERDATA['OPDGENBRCA47'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center mb-10">
                      <CheckboxValue style="max-width: 20px; width: 23px;" v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDGENBRCA47radio-' + index" v-model="item.Value">
                        <label :for="'OPDGENBRCA47radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
              </div>
            </td>
          </tr>
        </table>
        <p class="mt-10" style="font-style: italic">(1) Genetic/Familial High -Risk Assessment: Breast and Ovarian (BRCA-1 & GENE -1). Version 3,2019- Jan 18, 2019.</p>
        <!-- Chân ký -->
        <div v-if="DataSubmit" class="row text-center mt-10">
          <div class="col-md-6 col-md-offset-6" v-if="DataSubmit.Confirm.User.UserName">
            <div style="font-weight: normal">{{ ConfirmAt }}</div>
            <eform-signature
              :vi="true"
              :ad="DataSubmit.Confirm.User.UserName"
              :title="'Người thực hiện'"
            />
          </div>
          <div class="col-md-6 col-md-offset-6" v-else>
            <p class="mb-10">
              <b>Người thực hiện</b>
            </p>
            <i v-if="isReadOnly">{{__t('Chưa xác nhận')}}</i>
            <button v-else @click="showDoctorConfirm('Doctor', 'Người thực hiện')" class="btn v-white-btn">
              {{ __t('Xác nhận') }}
            </button>
          </div>
        </div>
        <!-- Footer -->
        <FloatBlock v-if="!isReadOnly" @handleBack='handleBack()' :openBack="true">
        <!-- <FloatBlock @handleBack='handleBack()' :openBack="true"> -->
          <template slot='buttons'>
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group1">
                <button class="btn btn-info pull-right" type="button" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
              </div>
            </div>
            <div class="col-md-6 col-sm-6" v-if="!IsLocked">
              <div class="form-group1">
                <button v-if="!nullContent" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
        <DoctorConfirm :popupTitle="popupTitle" :TypeConfirm="TypeConfirm" @popupSave="confirm"/>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>

<script>
import Print from './Print'
import OPDGENBRCA from '@/services/OPD/OPDGENBRCA'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import DoctorConfirm from '@/components/IPD/ForNeonatalMaternity/PopupDoctorConfirm.vue'
import UsersSelect2 from '@/components/UsersSelect2.vue'
import _ from 'lodash'
import moment from 'moment'
export default {
  components: {
    UsersSelect2,
    DoctorConfirm,
    Print
  },
  mixins: [MixinForm, MixinMasterData],
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
      timeMin: moment(this.$store.state.account.CurrentPatientObj.AdmittedDate, 'HH:MM DD/MM/YYYY').format('DD/MM/YYYY'),
      timeNow: moment().format('DD/MM/YYYY'),
      DataInfo: null,
      FormCode: 'A03_119_201119_V',
      DataSubmit: {},
      dataMaster: {},
      loaded: false,
      IsLocked: false,
      nullContent: true,
      time: '',
      CreatedAt: '',
      CreatedBy: '',
      ConfirmAt: '',
      popupTitle: '',
      TypeConfirm: '',
      checkEdited: false,
      fullWidth: '1200px'
    }
  },
  mounted () {
    this.getInfo()
    this.getMasterDatas({Form: 'A03_119_201119_V'}, () => {
      this.getData()
    })
  },
  watch: {
    MASTERDATA: {
      handler () {
        this.checkResult()
        this.resetCheck()
        if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
          this.checkEdited = true
        }
      },
      deep: true
    }
  },
  computed: {
    isReadOnly () {
      return this.viewOnly || this.IsLocked || this.getCurrentUsername() !== this.CreatedBy || this.DataSubmit.Confirm.User.UserName || !this.hasRole('GENBRCAPOST')
      // return this.viewOnly || this.IsLocked
    }
  },
  methods: {
    print () {
      this.$htmlToPaper('printMe', false, 'A03_119_201119_V')
    },
    getInfo () {
      new OPDGENBRCA().find('/' + 'Info' + '/' + this.FormCode + '/' + this._VisitId).then(response => {
        this.DataInfo = response
        this.IsLocked = response.IsLocked24h
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    getData () {
      new OPDGENBRCA().find('/' + this.FormCode + '/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.nullContent = false
        this.DataSubmit = response
        if (response.Datas) {
          this.$emit('hiddenLog')
        }
        this.CreatedBy = response.CreatedBy
        this.CreatedAt = moment(response.CreatedAt).format('DD/MM/YYYY')
        this.$emit('TimeLog', moment(response.UpdatedAt).format('HH:mm DD/MM/YYYY'), response.UpdateBy)
        this.ConfirmAt = moment(response.Confirm.User.ConfirmAt).format('HH:mm DD/MM/YYYY')
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
        if (this.MASTERDATA['OPDGENBRCA53'].Items[0].Value === '') {
          this.time = this.CreatedAt
        } else {
          this.time = this.MASTERDATA['OPDGENBRCA53'].Items[0].Value
        }
        // if (this.MASTERDATA['OPDGENBRCA53'].Items[0].Value !== 'No Record' || this.MASTERDATA['OPDGENBRCA53'].Items[0].Value !== '') {
        // }
        if (this.MASTERDATA['OPDGENBRCA53'].Items[0].Value === 'No Record') {
          this.time = ''
        }
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        setTimeout(() => {
          this.checkEdited = false
        }, 800)
        this.loaded = true
      }).catch(e => {
        this.loaded = true
        this._401ResponseError(e)
      })
    },
    create () {
      new OPDGENBRCA().update('/' + 'Create' + '/' + this.FormCode + '/' + this._VisitId).then(response => {
        this.reload()
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    resetCheck () {
      if (!this.MASTERDATA['OPDGENBRCA3'].Items[0].Value) {
        this.resetMdData('OPDGENBRCA3')
      }
      if (!this.MASTERDATA['OPDGENBRCA3'].Items[2].Value) {
        this.resetMdData('OPDGENBRCA7')
      }
      if (!this.MASTERDATA['OPDGENBRCA3'].Items[3].Value) {
        this.resetMdData('OPDGENBRCA13')
      }
      if (!this.MASTERDATA['OPDGENBRCA3'].Items[4].Value) {
        this.resetMdData('OPDGENBRCA16')
      }
      if (!this.MASTERDATA['OPDGENBRCA16'].Items[0].Value) {
        this.resetMdData('OPDGENBRCA18')
      }
      if (!this.MASTERDATA['OPDGENBRCA34'].Items[0].Value) {
        this.resetMdData('OPDGENBRCA34')
      }
    },
    checkResult () {
      if (this.MASTERDATA) {
        if (this.MASTERDATA['OPDGENBRCA1'].Items[0].Value || this.MASTERDATA['OPDGENBRCA3'].Items[0].Value ||
        this.MASTERDATA['OPDGENBRCA26'].Items[0].Value || this.MASTERDATA['OPDGENBRCA28'].Items[0].Value ||
        this.MASTERDATA['OPDGENBRCA30'].Items[0].Value || this.MASTERDATA['OPDGENBRCA32'].Items[0].Value ||
        this.MASTERDATA['OPDGENBRCA34'].Items[0].Value || this.MASTERDATA['OPDGENBRCA39'].Items[0].Value ||
        this.MASTERDATA['OPDGENBRCA41'].Items[0].Value || this.MASTERDATA['OPDGENBRCA43'].Items[0].Value ||
        this.MASTERDATA['OPDGENBRCA45'].Items[0].Value || this.MASTERDATA['OPDGENBRCA47'].Items[0].Value) {
          this.MASTERDATA['OPDGENBRCA49'].Items[0].Value = false
          this.MASTERDATA['OPDGENBRCA51'].Items[0].Value = true
        } else {
          this.MASTERDATA['OPDGENBRCA49'].Items[0].Value = true
          this.MASTERDATA['OPDGENBRCA51'].Items[0].Value = false
        }
      }
    },
    async popupSave (data) {
      if (!this.isConfirmed) {
        await this.ConfirmKyNhay(data)
      } else {
        this.ConfirmKyNhay(data)
      }
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    async confirm (data) {
      if (data.username !== this.CreatedBy) {
        this.checkRole()
      } else {
        if (this.checkEdited) {
          await this.handleSubmit()
        }
        new OPDGENBRCA().update('/' + 'Confirm' + '/' + this.FormCode + '/' + this._VisitId, data).then(response => {
          this.$modal.hide('doctorConfirm')
          this.toastedSuccess(this.$t('Xác nhận thành công'))
          setTimeout(() => {
            this.reload()
          }, 800)
        }).catch(e => {
          this.$modal.hide('doctorConfirm')
        })
      }
    },
    handleSubmit () {
      if (this.time === null) {
        this.MASTERDATA['OPDGENBRCA53'].Items[0].Value = 'No Record'
      } else {
        this.MASTERDATA['OPDGENBRCA53'].Items[0].Value = this.time
      }
      var obj = {}
      this.DataSubmit.Datas = []
      this.resetCheck()
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
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      new OPDGENBRCA().update('/' + 'Update' + '/' + this.FormCode + '/' + this._VisitId, this.DataSubmit).then(response => {
        this.toastedSuccess()
        this.reload()
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    handleBack () {
      if (this.checkEdited) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới Phiếu đánh giá tiêu chuẩn chỉ định xét nghiệm GEN BRCA 1/2'),
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
    confirmPopup () {
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
    checkRole () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Lỗi phân quyền'),
        text: this.__t('Bạn không có quyền thực hiện thao tác này'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              // this.reload()
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
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
label [for="radio-OPDGENBRCA36"]{
  color: red;
}
</style>
