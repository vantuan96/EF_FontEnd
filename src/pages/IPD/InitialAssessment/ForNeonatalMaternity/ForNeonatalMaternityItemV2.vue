<template>
  <div>
    <div v-if="loaded">
      <template v-if="DataSubmit.Datas">
        <div>
          <div class="flex mt-10">
          <div v-if="MASTERDATA['IPDOAGIANM7']" class="flex-box flex-center mb10">
            <!-- Thời gian đánh giá -->
            <label class="display-inline ml-10 mr-5 w140 mt-5" style="font-weight: bold">{{__label(MASTERDATA['IPDOAGIANM7'])}}:</label>
              <VDatePicker
                :hideTooltip="false"
                class="w1510 display-inline"
                :format="'HH:mm DD/MM/YYYY'"
                v-model="CreatedAt"
                :readonly="readOnly"
              />
              <!-- NVYT tế đánh giá -->
            <div class="flex-box flex-center">
              <label class="display-inline ml-20 mr-5" style="font-weight: bold; margin-bottom: 0">{{__t('NVYT đánh giá')}}:</label>
              <ad-Info :ad="DataSubmit.CreatedBy || 'N/A'"/>
            </div>
          </div>
          <div v-if="MASTERDATA['IPDOAGIANM226'] && this.checkSpecial === 'A01_035_050919_V'" class="flex-box flex-center mb10">
              <label class="display-inline ml-10 mr-5 mt-5" style="font-weight: bold">{{__label(MASTERDATA['IPDOAGIANM226'])}}:</label>
              <VDatePicker
                  :hideTooltip="false"
                  class="w1510 display-inline"
                  :format="'HH:mm DD/MM/YYYY'"
                  v-model="MASTERDATA['IPDOAGIANM226'].Items[0].Value"
                  :readonly="readOnly"
               />
           </div>
           <div v-if="MASTERDATA['IPDOAGIANM226'] && this.checkSpecial === 'A01_038_050919_V'" class="flex-box flex-center mb10">
              <label class="display-inline ml-10 mr-5 mt-5" style="font-weight: bold">{{__label(MASTERDATA['IPDOAGIANM226'])}}:</label>
              <VDatePicker
                  :hideTooltip="false"
                  class="w1510 display-inline"
                  :format="'HH:mm DD/MM/YYYY'"
                  v-model="arrivalTime"
                  :readonly="readOnly"
               />
           </div>
          </div>
          <!-- Block 2 -->
          <table class="table v-table-1 no-margin col-1-1" id="InitialAssessment-ForAdult-block2">
            <tr>
              <td colspan="2" class="no-padding">
                <div class="tbl-title">1. {{__t('Đánh giá trẻ sơ sinh ')}}</div>
              </td>
            </tr>
            <!-- Thông tin chung -->
            <tr v-if="MASTERDATA['IPDOAGIANM92']">
              <th width="1">
                <div class="w160">
                  <div class="mb-5 no-wrap">{{__label(MASTERDATA['IPDOAGIANM92'])}}</div>
                </div>
              </th>
              <td>
                <div v-if="MASTERDATA['A02_016_050919_VE__CHI_INFO']" class="mb10 mt-10" style="display: flex">
                  <GetInfoPid class="mrt10 mrb10" v-if="checkSpecial === 'A01_035_050919_V'" :readonly="readOnly" :Customer="Customer" @clearGetInfoPID="clearGetInfoPID" @updateInfo="updateInfo" :isGetVisitCode="true"/>
                  <div v-if="checkSpecial === 'A01_035_050919_V'" class="mrt2 mrb2" style="margin-top: 10px;">
                    <div class="form-group" :class="{'disable': !Customer.PID }">
                      <label for="DateOfBirth">{{__label(MASTERDATA['IPDOAGIANMVISITCODE01'])}}</label>
                      <div class="input-group input-group-sm">
                        <input :readonly="readOnly" placeholder="N/A" type="text" class="form-control" v-model="MASTERDATA['IPDOAGIANMVISITCODE01'].Items[0].Value"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="MASTERDATA['IPDOAGIANM92']" class="mb10 row flex-box flex-center">
                </div>
                <div v-if="MASTERDATA['IPDOAGIANM92']" class="mb10 row">
                  <!-- Tuổi thai -->
                  <div class="col-md-3" v-if="MASTERDATA['IPDOAGIANM92']">
                    <label class="display-inline">{{__label(MASTERDATA['IPDOAGIANM92'].Items[5])}}:</label>
                    <VNumberInput style="width:200px" v-if="!readOnly" :decimal="true" v-model="MASTERDATA['IPDOAGIANM92'].Items[6].Value"/>
                    <FakeInput v-else v-model="MASTERDATA['IPDOAGIANM92'].Items[6].Value" />
                  </div>
                  <!-- Cân nặng -->
                  <div class="col-md-3">
                    <label class="display-inline no-wrap">{{__label(MASTERDATA['IPDOAGIANM92'].Items[7])}}:</label>
                    <VNumberInput style="width:200px" :maxlength="10" v-if="!readOnly" :decimal="true" v-model="MASTERDATA['IPDOAGIANM92'].Items[8].Value"/>
                    <FakeInput v-else v-model="MASTERDATA['IPDOAGIANM92'].Items[8].Value" />
                  </div>
                  <!-- Chiều dài -->
                  <div class="col-md-3">
                    <label class="display-inline no-wrap">{{__t('Chiều dài(cm)')}}:</label>
                    <VNumberInput style="width:200px" v-if="!readOnly" :decimal="true" v-model="MASTERDATA['IPDOAGIANM92'].Items[10].Value"/>
                    <FakeInput v-else v-model="MASTERDATA['IPDOAGIANM92'].Items[10].Value" />
                  </div>
                  <!-- Chu vi đầu -->
                  <div class="col-md-3">
                    <label class="display-inline no-wrap">{{__t('Chu vi đầu(cm)')}}:</label>
                    <VNumberInput style="width:200px" v-if="!readOnly" :decimal="true" v-model="MASTERDATA['IPDOAGIANM92'].Items[12].Value"/>
                    <FakeInput v-else v-model="MASTERDATA['IPDOAGIANM92'].Items[12].Value" />
                  </div>
                </div>
              </td>
            </tr>
            <!-- Hồi sức sơ sinh -->
            <tr v-if="MASTERDATA['IPDOAGIANM106']" class="resuscitation">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM106'])}}</div></th>
              <td>
                <!-- Hút dịch -->
                <div class="flex-box flex-center v-checkbox" :class="readOnly ? 'disableClick' : ''">
                  <input :id="MASTERDATA['IPDOAGIANM106'].Items[0].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[0].Value">
                  <label :for="MASTERDATA['IPDOAGIANM106'].Items[0].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[0])}}</label>
                  <textarea-autosize v-if="MASTERDATA['IPDOAGIANM106'].Items[0].Value && !readOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM106'].Items[21].Value"/>
                  <FakeInput v-if="MASTERDATA['IPDOAGIANM106'].Items[0].Value && readOnly" v-model="MASTERDATA['IPDOAGIANM106'].Items[21].Value" />
                </div>
                <!-- Oxygen -->
                <div class="flex-box flex-center v-checkbox" :class="readOnly ? 'disableClick' : ''">
                  <input :id="MASTERDATA['IPDOAGIANM106'].Items[1].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[1].Value">
                  <label :for="MASTERDATA['IPDOAGIANM106'].Items[1].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[1])}}</label>
                  <textarea-autosize v-if="MASTERDATA['IPDOAGIANM106'].Items[1].Value && !readOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM106'].Items[22].Value"/>
                  <FakeInput v-if="MASTERDATA['IPDOAGIANM106'].Items[1].Value && readOnly" v-model="MASTERDATA['IPDOAGIANM106'].Items[22].Value" />
                </div>
                <div>
                  <!-- Bóp bóng -->
                  <div class="flex-box flex-center v-checkbox time" :class="readOnly ? 'disableClick' : ''">
                    <input :id="MASTERDATA['IPDOAGIANM106'].Items[2].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[2].Value">
                    <label style="font-weight: normal" :for="MASTERDATA['IPDOAGIANM106'].Items[2].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[2])}}</label>
                    <div style="transform: translateX(-22px);" class="flex-box flex-center" v-if="MASTERDATA['IPDOAGIANM106'].Items[2].Value">
                      <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[3])}}</label>
                      <v-masked-input v-if="!readOnly" placeholder="hh:mm" mask="11:11" class="form-control w160" v-model="MASTERDATA['IPDOAGIANM106'].Items[4].Value"/>
                      <FakeInput v-else v-model="MASTERDATA['IPDOAGIANM106'].Items[4].Value" />
                      <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[5])}}</label>
                      <v-masked-input v-if="!readOnly" placeholder="hh:mm" mask="11:11" class="form-control w160" v-model="MASTERDATA['IPDOAGIANM106'].Items[6].Value"/>
                      <FakeInput v-else v-model="MASTERDATA['IPDOAGIANM106'].Items[6].Value" />
                    </div>
                  </div>
                  <!-- NKQ -->
                  <div class="flex-box flex-center v-checkbox time" :class="readOnly ? 'disableClick' : ''">
                    <input :id="MASTERDATA['IPDOAGIANM106'].Items[7].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[7].Value">
                    <label :for="MASTERDATA['IPDOAGIANM106'].Items[7].Code" class="display-inline no-wrap w140" style="display: flex; align-items: center; font-weight: normal">{{__label(MASTERDATA['IPDOAGIANM106'].Items[7])}}</label>
                    <div style="transform: translateX(-22px);" class="flex-box flex-center" v-if="MASTERDATA['IPDOAGIANM106'].Items[7].Value">
                      <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[8])}}</label>
                      <v-masked-input  v-if="!readOnly" placeholder="hh:mm" mask="11:11" class="form-control w160" v-model="MASTERDATA['IPDOAGIANM106'].Items[9].Value"/>
                      <FakeInput v-else v-model="MASTERDATA['IPDOAGIANM106'].Items[9].Value" />
                      <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[10])}}</label>
                      <v-masked-input v-if="!readOnly" placeholder="hh:mm" mask="11:11" class="form-control w160" v-model="MASTERDATA['IPDOAGIANM106'].Items[11].Value"/>
                      <FakeInput v-else v-model="MASTERDATA['IPDOAGIANM106'].Items[11].Value" />
                    </div>
                  </div>
                  <!-- Ép tim -->
                  <div class="flex-box flex-center v-checkbox time" :class="readOnly ? 'disableClick' : ''">
                    <input :id="MASTERDATA['IPDOAGIANM106'].Items[12].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[12].Value">
                    <label :for="MASTERDATA['IPDOAGIANM106'].Items[12].Code" class="display-inline no-wrap w140" style="display: flex; align-items: center; font-weight: normal">{{__label(MASTERDATA['IPDOAGIANM106'].Items[12])}}</label>
                    <div style="transform: translateX(-22px);" class="flex-box flex-center" v-if="MASTERDATA['IPDOAGIANM106'].Items[12].Value">
                      <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[13])}}</label>
                      <v-masked-input v-if="!readOnly" placeholder="hh:mm" mask="11:11" class="form-control w160" v-model="MASTERDATA['IPDOAGIANM106'].Items[14].Value"/>
                      <FakeInput v-else v-model="MASTERDATA['IPDOAGIANM106'].Items[14].Value" />
                      <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[15])}}</label>
                      <v-masked-input v-if="!readOnly" placeholder="hh:mm" mask="11:11" class="form-control w160" v-model="MASTERDATA['IPDOAGIANM106'].Items[16].Value"/>
                      <FakeInput v-else v-model="MASTERDATA['IPDOAGIANM106'].Items[16].Value" />
                    </div>
                  </div>
                  <!-- Thuốc (liều) -->
                  <div class="flex-box flex-center v-checkbox" :class="readOnly ? 'disableClick' : ''">
                    <input :id="MASTERDATA['IPDOAGIANM106'].Items[17].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[17].Value">
                    <label :for="MASTERDATA['IPDOAGIANM106'].Items[17].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[17])}}</label>
                    <textarea-autosize v-if="MASTERDATA['IPDOAGIANM106'].Items[17].Value && !readOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM106'].Items[18].Value"/>
                    <FakeInput v-if="MASTERDATA['IPDOAGIANM106'].Items[17].Value && readOnly" v-model="MASTERDATA['IPDOAGIANM106'].Items[18].Value" />
                  </div>
                  <!-- Khác -->
                  <div class="flex-box flex-center v-checkbox" :class="readOnly ? 'disableClick' : ''">
                    <input :id="MASTERDATA['IPDOAGIANM106'].Items[19].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[19].Value">
                    <label :for="MASTERDATA['IPDOAGIANM106'].Items[19].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[19])}}</label>
                    <textarea-autosize v-if="MASTERDATA['IPDOAGIANM106'].Items[19].Value && !readOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM106'].Items[20].Value"/>
                    <FakeInput v-if="MASTERDATA['IPDOAGIANM106'].Items[19].Value && readOnly" v-model="MASTERDATA['IPDOAGIANM106'].Items[20].Value" />
                  </div>
                </div>
              </td>
            </tr>
            <!-- Tình trạng sơ sinh -->
            <tr v-if="MASTERDATA['IPDOAGIANM128']" class="CAB">
              <th width="1">
                <div class="w160">{{__t('Tình trạng sơ sinh')}}</div>
                <DropApgar class="mt-10" />
              </th>
              <td>
                <!-- Nhịp thở đầu tiên -->
                <div class="flex-box flex-center mb-10">
                  <label class="display-inline no-wrap mr-5">{{__label(MASTERDATA['IPDOAGIANM128'].Items[0])}}:</label>
                  <textarea-autosize v-if="!readOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM128'].Items[1].Value"/>
                  <FakeInput v-else v-model="MASTERDATA['IPDOAGIANM128'].Items[1].Value" />
                </div>
                <!-- Hỗ trợ hô hấp -->
                <div class="flex-box flex-center v-checkbox" :class="readOnly ? 'disableClick' : ''">
                  <input :id="MASTERDATA['IPDOAGIANM128'].Items[2].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM128'].Items[2].Value">
                  <label :for="MASTERDATA['IPDOAGIANM128'].Items[2].Code" class="display-inline no-wrap">{{__label(MASTERDATA['IPDOAGIANM128'].Items[2])}}:</label>
                  <textarea-autosize v-if="MASTERDATA['IPDOAGIANM128'].Items[2].Value && !readOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM128'].Items[3].Value"/>
                  <FakeInput v-if="MASTERDATA['IPDOAGIANM128'].Items[2].Value && readOnly" v-model="MASTERDATA['IPDOAGIANM128'].Items[3].Value" />
                </div>
                <!-- Vitamin K -->
                <div class="flex-box flex-center mb-10" :class="readOnly ? 'disableClick' : ''">
                  <label style="margin: 0; transform: translateY(5px);" class="display-inline no-wrap mr-5">{{__label(MASTERDATA['IPDOAGIANM128'].Items[4])}}:</label>
                  <!-- Tiêm bắp -->
                  <div class="v-checkbox">
                    <input :id="MASTERDATA['IPDOAGIANM128'].Items[5].Code" type="checkbox" v-model="MASTERDATA['IPDOAGIANM128'].Items[5].Value">
                    <label style="font-weight: normal" :for="MASTERDATA['IPDOAGIANM128'].Items[5].Code" class="displaytbl">{{__label(MASTERDATA['IPDOAGIANM128'].Items[5])}}</label>
                  </div>
                  <label v-if="MASTERDATA['IPDOAGIANM128'].Items[5].Value" class="display-inline ml-10 mr-5 w140" style="font-weight: bold; margin-top:15px">{{__label(MASTERDATA['IPDOAGIANM228'])}}:</label>
                  <VDatePicker
                    v-if="MASTERDATA['IPDOAGIANM128'].Items[5].Value"
                    :hideTooltip="false"
                    class="w1510 display-inline"
                    :format="'HH:mm DD/MM/YYYY'"
                    v-model="MASTERDATA['IPDOAGIANM228'].Items[0].Value"
                    :readonly="readOnly"
                  />
                </div>
                <!-- Bảng chỉ số Apgar -->
                <div v-if="MASTERDATA && DataSubmit && !readOnly">
                  <ApgarTable ref="ApgarTable" :DataSubmit="DataSubmit" :ApgarTableData="ApgarTableData" :MASTERDATA="MASTERDATA['IPDOAGIANM209'].Items[0].Value" :checkV2="true" :readonly="readOnly" :viewOnly="viewOnly"/>
                </div>
                <div v-if="MASTERDATA && DataSubmit && readOnly">
                  <table class="table v-table-1 no-margin col-1-1">
                  <tr>
                    <th width="1" class="no-wrap text-center">{{ __t('Điểm Apgar') }}</th>
                    <th width="1" class="no-wrap text-center">{{ __t('Tổng') }}</th>
                    <th width="1" class="no-wrap text-center">{{ __t('Mầu da') }}</th>
                    <th width="1" class="no-wrap text-center">
                      {{ __t('Nhịp thở') }}<br />
                    </th>
                    <th width="1" class="no-wrap text-center">{{ __t('Phản xạ') }}</th>
                    <th width="1" class="no-wrap text-center">
                      {{ __t('Trương lực cơ') }}
                    </th>
                    <th width="1" class="no-wrap text-center">{{ __t('Nhịp tim') }}</th>
                    <th class="no-wrap text-center">{{ __t('Ghi chú') }}</th>
                  </tr>
                  <tr v-for="(item, index) in ApgarTableData" :key="index">
                    <td style="position: relative">
                      <FakeInput
                        v-if="readonly || viewonly"
                        style="margin: 0"
                        v-model="item.ApgarScore"
                      />
                      <textarea-autosize
                        v-else
                        rows="1"
                        class="form-control"
                        :placeholder="__t('Nhập')"
                        v-model="item.ApgarScore"
                      />
                    </td>
                    <td>
                      <p class="text-center mb-0" style="transform: translateY(-10px);">
                        {{ (item.Total = calculateScore[index] || 'N/A') }}
                      </p>
                    </td>
                    <td class="text-center">
                      <div v-if="readonly || viewonly">
                        <FakeInput
                          v-if="item.SkinColor"
                          style="margin: 0"
                          v-model="item.SkinColor"
                        />
                        <div v-else>
                          <p v-if="item.SkinColor === 0" class="fake-input disable">0</p>
                          <p v-else>N/A</p>
                        </div>
                      </div>
                      <v-select v-else class='select-full-w' v-model="item.SkinColor" :placeholder="__t('Chọn')" :items="selectOption"/>
                    </td>
                    <td class="text-center">
                      <div v-if="readonly || viewonly">
                        <FakeInput
                          v-if="item.Respiration"
                          style="margin: 0"
                          v-model="item.Respiration"
                        />
                        <div v-else>
                          <p v-if="item.Respiration === 0" class="fake-input disable">0</p>
                          <p v-else>N/A</p>
                        </div>
                      </div>
                      <v-select v-else class='select-full-w' v-model="item.Respiration" :placeholder="__t('Chọn')" :items="selectOption"/>
                    </td>
                    <td class="text-center">
                      <div v-if="readonly || viewonly">
                        <FakeInput
                          v-if="item.Reflex"
                          style="margin: 0"
                          v-model="item.Reflex"
                        />
                        <div v-else>
                          <p v-if="item.Reflex === 0" class="fake-input disable">0</p>
                          <p v-else>N/A</p>
                        </div>
                      </div>
                      <v-select v-else class='select-full-w' v-model="item.Reflex" :placeholder="__t('Chọn')" :items="selectOption"/>
                    </td>
                    <td class="text-center">
                      <div v-if="readonly || viewonly">
                        <FakeInput
                          v-if="item.MuscleTone"
                          style="margin: 0"
                          v-model="item.MuscleTone"
                        />
                        <div v-else>
                          <p v-if="item.MuscleTone === 0" class="fake-input disable">0</p>
                          <p v-else>N/A</p>
                        </div>
                      </div>
                      <v-select v-else class='select-full-w' v-model="item.MuscleTone" :placeholder="__t('Chọn')" :items="selectOption"/>
                    </td>
                    <td class="text-center">
                      <div v-if="readonly || viewonly">
                        <FakeInput
                          v-if="item.HeartRate"
                          style="margin: 0"
                          v-model="item.HeartRate"
                        />
                        <div v-else>
                          <p v-if="item.HeartRate === 0" class="fake-input disable">0</p>
                          <p v-else>N/A</p>
                        </div>
                      </div>
                      <v-select v-else class='select-full-w' v-model="item.HeartRate" :placeholder="__t('Chọn')" :items="selectOption"/>
                    </td>
                    <td>
                      <FakeInput
                        v-if="readonly || viewonly"
                        style="margin: 0"
                        v-model="item.note"
                      />
                      <textarea-autosize
                        v-else
                        rows="1"
                        class="form-control"
                        :placeholder="__t('Nhập')"
                        v-model="item.note"
                      />
                    </td>
                  </tr>
                </table>
                </div>
              </td>
            </tr>
          </table>
          <table class="table v-table-1 no-margin col-1-1" id="InitialAssessment-ForAdult-block2">
            <tr>
              <td colspan="2" class="no-padding">
                <div class="tbl-title">2. {{__t('Đánh giá ngay sau sinh')}}</div>
              </td>
            </tr>
            <table
            style="overflow: hidden; margin-bottom: 0"
            class="table v-table-1 mt-10"
          >
            <tr>
              <th width="5%" class="no-wrap text-center">{{ 'STT' }}</th>
              <th width="20%" class="no-wrap text-center">
                <div>
                  <span class="block">{{ __t('Đánh giá chung') }}</span>
                  <span class="block">{{__t('(Tick nếu bình thường)')}}</span>
                </div>
              </th>
              <th width="60%" class="no-wrap text-center">
                {{ __t('Nhận xét') }}
              </th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td>
                <div class="flex-box flex-center v-checkbox" :class="readOnly ? 'disableClick' : ''">
                  <input
                    type="checkbox"
                    :id="'IPDOAGIANMAA-' + index"
                    v-model="MASTERDATA[`${item.Code}`].Items[0].Value"
                  />
                  <label
                    style="display: flex; align-items: center; font-weight: normal"
                    :for="'IPDOAGIANMAA-' + index"
                    ><p class="mt-10 ml-5">{{ __label(MASTERDATA[`${item.Code}`]) }}</p></label>
                </div>
              </td>
              <td>
                <textarea-autosize
                  v-if="!readOnly"
                  rows="1"
                  class="form-control"
                  :placeholder="__t('Nhập (nếu có)')"
                  v-model="MASTERDATA[`${item.Code}`].Items[1].Value"
                />
                <FakeInput v-else v-model="MASTERDATA[`${item.Code}`].Items[1].Value" />
              </td>
            </tr>
          </table>
          </table>
        </div>
      <br/><br/><br/>
      <div class="row">
        <div class="col-md-6 col-sm-6 text-center">
        </div>
        <div class="col-md-6 col-sm-6 text-center">
        </div>
      </div>
      <br/>
      <br/>
      <div v-if="DataSubmit.Confirm" class="row text-center mt-10">
          <div class="col-md-6 col-md-offset-6" v-if="DataSubmit.Confirm.MedicalStaff1.UserName">
            <div style="font-weight: normal">{{DataSubmit.Confirm.MedicalStaff1.ConfirmAt | formatDateHourMinutesDDMMYYY}}</div>
            <eform-signature
              :ad="DataSubmit.Confirm.MedicalStaff1.UserName"
              :title="__t('Người đánh giá ')"
            />
          </div>
          <div class="col-md-6 col-md-offset-6" v-else>
            <p class="mb-10">
              <b>{{ __t('Người đánh giá ') }}</b>
            </p>
            <i v-if="viewOnly">{{__t('Chưa xác nhận')}}</i>
            <button v-else-if="!readOnly" @click="showDoctorConfirm('Doctor', 'Người đánh giá')" class="btn v-white-btn">
              {{ __t('Xác nhận') }}
            </button>
          </div>
        </div>
      <div class="ml-5" >
        <p>A01_250_061022_VE</p>
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit" :ad="DataSubmit.UpdateBy" /> {{__t('lúc')}} {{ UpdatedAt }}</p>
      </div>
      <br/>
      <br/>
      <div v-if="!readOnly">
        <FloatBlock v-if="!readOnly" :openBack="true" @handleBack="handleBack">
          <template slot="top" v-if="synced">
            <div style="color: #fff; text-align: right">
              <b>Dữ liệu được đồng bộ từ khoa:</b> {{__t(specialty.ViName)}}
            </div>
          </template>
          <template slot='buttons'>
            <div class="col-md-2 col-sm-2">
            </div>
            <div class="col-md-2">
              <div class="form-group1">
                <p class="hidden-text">hidden-text</p>
              </div>
            </div>
            <div class="col-md-3">
            </div>
            <div class="col-md-5">
              <div class="form-group1">
                <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
        <DoctorConfirm @popupSave="confirm"/>
      </div>
      </template>
    </div>
  </div>
</template>
<script>
import ContraintNewbornAndPregnantWoman from '@/services/ContraintNewbornAndPregnantWoman'
import VDatePicker from '@/components/VDateTimePicker.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import UsersSelect2 from '@/components/UsersSelect2.vue'
import FormMixin from '../Mixi.js'
import InitialAssessment from '@/services/IPD/InitialAssessment'
import DropApgar from '@/pages/IPD/MedicalRecord/Page2CPN/DropApgar'
import Logs from '@/components/Logs.vue'
import RemoveBtn from '../Delete.vue'
import ViewOnly from './NeonatalMaternityViewV2.vue'
import ApgarTable from '@/components/IPD/ForNeonatalMaternity/ApgarTable'
import _ from 'lodash'
import moment from 'moment'
import DoctorConfirm from './popup/DoctorConfirm.vue'
import EventBus from '@/lib/eventBus'
const MODAL_WIDTH = 750
export default {
  name: 'IPDInitialAssessmentForNeonatalMaternityV2',
  mixins: [MixinForm, MixinMasterData, FormMixin],
  components: {
    Logs, RemoveBtn, VDatePicker, ViewOnly, ApgarTable, UsersSelect2, DropApgar, DoctorConfirm
  },
  props: ['viewOnly', 'VisitId', 'formId', 'NewbornCustomerId'],
  data () {
    return {
      confirmSuccess: false,
      tableData: [],
      listDoctors: [],
      arrivalTime: null,
      Stage: 1,
      selectOption: [
        {
          value: 0,
          text: '0'
        },
        {
          value: 1,
          text: '1'
        },
        {
          value: 2,
          text: '2'
        }
      ],
      DataSubmit: {},
      DataPara: null,
      loaded: false,
      menu: [
        {
          label: 'Đánh giá sản phụ',
          blockId: '#InitialAssessment-ForAdult-block1'
        },
        {
          label: 'Đánh giá trẻ sơ sinh',
          blockId: '#InitialAssessment-ForAdult-block2'
        }
      ],

      UpdatedAt: '',
      CreatedAt: '',
      IsLocked: false,
      syncInfo: null,
      specialty: '',
      synced: false,
      ParaUpdateAt: '',
      ParaUpdateBy: '',
      ParaYear: '',
      syncPara: false,
      syncListPara: [],
      isNew: null,
      checkInfoVersion: '',
      dataNewBorn: {},
      IdNewborn: this.NewbornCustomerId || this.$route.params.Item,
      Customer: {
        PID: null,
        Fullname: '',
        Gender: null,
        DateOfBirth: ''
      },
      dataMaster: null,
      ApgarTableData: [],
      readonly: true,
      viewonly: true,
      isComfirm: false,
      visitcodes: null,
      modalWidth: MODAL_WIDTH
    }
  },
  async mounted () {
    await this.getTypeOfSpecial()
    await this.getMasterDatas({Form: 'A02_016_050919_VE'}, () => {
      // this.getInfo()
      for (const property in this.MASTERDATA) {
        if (
          this.MASTERDATA[property].Order >= 149 &&
          this.MASTERDATA[property].Order < 202
        ) {
          this.tableData.push(this.MASTERDATA[property])
        }
      }
    })
  },
  watch: {
    formId: function () {
      this.getTypeOfSpecial()
      this.getMasterDatas({Form: 'A02_016_050919_VE'}, () => {
        // this.getInfo()
        this.tableData = []
        for (const property in this.MASTERDATA) {
          if (
            this.MASTERDATA[property].Order >= 149 &&
            this.MASTERDATA[property].Order < 202
          ) {
            this.tableData.push(this.MASTERDATA[property])
          }
        }
      })
    }
  },
  computed: {
    calculateScore () {
      return this.ApgarTableData.map(item => {
        let num = 0
        let isNum = false
        if (item) {
          if (item.SkinColor !== '' && item.SkinColor !== 0) {
            num += Number(item.SkinColor)
            isNum = true
          }
          if (item.Respiration !== '' && item.Respiration !== 0) {
            num += Number(item.Respiration)
            isNum = true
          }
          if (item.Reflex !== '' && item.Reflex !== 0) {
            num += Number(item.Reflex)
            isNum = true
          }
          if (item.MuscleTone !== '' && item.MuscleTone !== 0) {
            num += Number(item.MuscleTone)
            isNum = true
          }
          if (item.HeartRate !== '' && item.HeartRate !== 0) {
            num += Number(item.HeartRate)
            isNum = true
          }
        }
        if ((item.SkinColor === 0 || item.Respiration === 0 || item.Reflex === 0 || item.MuscleTone === 0 || item.HeartRate === 0) && isNum === false) {
          return '0'
        } else {
          return num
        }
      })
    },
    isReadOnly: function () {
      return this.viewOnly
    },
    readOnly: function () {
      return this.DataSubmit.IsLocked || this.DataSubmit.Confirm.MedicalStaff1.UserName || this.viewOnly || !this.hasRole('IPDUPDATEMATERNITYV2') || (this.DataSubmit.CreatedBy !== this.$store.state.account.Username)
      // return false
    },
    _ItemId: function () {
      return this.$route.params.Item || this.formId
    }
  },
  methods: {
    clearGetInfoPID () {
      this.Customer = {
        ...this.Customer,
        Fullname: '',
        Gender: '',
        DateOfBirth: '',
        PID: ''
      }
      EventBus.$emit('UpdateInfoCustomer')
      this.MASTERDATA['IPDOAGIANMVISITCODE01'].Items[0].Value = '' // Xóa visitcode
    },
    handleUpdatePID () {
      this.getTypeOfSpecial()
    },
    // popup cảnh báo dữ liệu chưa lưu
    confirmPopupBack () {
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
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    getListSoSinh () {
      new ContraintNewbornAndPregnantWoman().find('GetList/' + this._VisitId + '/IPD/A02_016_050919_VE_ForUterineLife2Hours').then(async response => {
        this.ListNewBorn = await response
      }).catch(e => {
        console.log('e: ', e)
      })
    },
    updateInfo (cus) {
      new ContraintNewbornAndPregnantWoman().update('Updated/' + this.$route.params.NewbornCustomerId + '/' + this.Customer.PID).then(res => {
        console.log('cusss', res)
        this.Customer = {
          ...this.Customer,
          Fullname: cus.Fullname,
          Gender: cus.Gender,
          DateOfBirth: cus.DateOfBirth,
          PID: cus.PID
        }
        EventBus.$emit('UpdateListSoSinh')
        this.MASTERDATA['IPDOAGIANMVISITCODE01'].Items[0].Value = cus.VisitCode
      })
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    handleConfirmData (data) {
      console.log('data', data)
      if (this.checkSpecial === 'A01_035_050919_V') {
        new InitialAssessment().update('ForNeonatalMaternityV2/Confirm/A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity_Obstetrics' + '/' + this._ItemId, data).then(response => {
          this.$modal.hide('doctorConfirm')
          this.toastedSuccess(this.$t('Lưu lại thành công !'))
          this.toastedSuccess(this.$t('Xác nhận thành công'))
          this.DataSubmit.UpdateBy = data.username
          this.UpdatedAt = moment().format('HH:mm DD/MM/YYYY')
          this.DataSubmit.Confirm.MedicalStaff1.UserName = data.username
          this.DataSubmit.Confirm.MedicalStaff1.ConfirmAt = moment()
          this.viewOnly = true
        }).catch(e => {
          this.$modal.hide('doctorConfirm')
        })
      } else if (this.checkSpecial === 'A01_038_050919_V') {
        new InitialAssessment().update('ForNeonatalMaternityV2/Confirm/A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity', data).then(response => {
          this.$modal.hide('doctorConfirm')
          this.toastedSuccess(this.$t('Lưu lại thành công !'))
          this.toastedSuccess(this.$t('Xác nhận thành công'))
          this.DataSubmit.UpdateBy = data.username
          this.UpdatedAt = moment().format('HH:mm DD/MM/YYYY')
          this.DataSubmit.Confirm.MedicalStaff1.UserName = data.username
          this.DataSubmit.Confirm.MedicalStaff1.ConfirmAt = moment()
          this.viewOnly = true
        }).catch(e => {
          this.$modal.hide('doctorConfirm')
        })
      }
    },
    async confirm (data) {
      this.isComfirm = true
      await this.submit()
      await this.handleConfirmData(data)
    },
    getDataNewBorn () {
      new InitialAssessment().find('ForNeonatalMaternityV2/A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity').then(response => {
        this.dataNewBorn = response
      }).catch(err => {
        console.log(err)
        this.dataNewBorn = null
      })
    },
    getInfo () {
      new InitialAssessment().find('ForNeonatalMaternityV2/Info/' + 'A02_016_050919_VE/' + this._VisitId + '/ForUterineLife2Hours/').then(response => {
        this.IsLocked = response.IsLocked
        this.isNew = response.isNew
        this.oldVisitId = response.OldVisitId
        if (this.checkSpecial === 'A01_035_050919_V') {
          const responseArrivalTime = moment(response.DateOfAdmission).format('HH:mm DD/MM/YYYY')
          this.arrivalTime = responseArrivalTime
        } else {
          this.arrivalTime = this.$store.state.account.CurrentPatientObj.AdmittedDate
        }
        if (response.OldDatas && response.SpecialtyOld) {
          this.syncInfo = response.OldDatas
          this.specialty = response.SpecialtyOld
        } else {
          this.syncInfo = null
          this.specialty = ''
        }
        this.loaded = true
      }).catch(e => {
        this.IsLocked = e.data.IsLocked
        this.loaded = true
        this._401ResponseError(e)
      })
    },
    mapData (response) {
      this.DataSubmit = response
      if (response.DataPara !== null) {
        this.DataPara = response.DataPara.Datas
        this.ParaUpdateAt = response.DataPara.UpdateAt
        this.ParaUpdateBy = response.DataPara.UpdateBy
        this.ParaYear = response.DataPara.Year
        this.DataPara.map(item => {
          if (item.Value) {
            this.syncPara = true
            this.syncListPara.push(item.Value)
          }
        })
        this.syncListPara = this.syncListPara.toString()
      }
      if (this.syncInfo && response.Datas.length === 0) {
        this.DataSubmit.Datas = this.syncInfo
        this.synced = true
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
              } else if (item.Code === 'IPDOAGIANM206' || item.Code === 'IPDOAGIANM208' || item.Code === 'IPDOAGIANM210') {
                item.Value = this.JSONParse(exited.Value)
              } else if (item.Code === 'IPDOAGIANM2' || item.Code === 'IPDOAGIANM4' || item.Code === 'IPDOAGIANM6') {
                item.Value = this.JSONParse(exited.Value)
                this.listDoctors.push(item.Value)
              } else {
                item.Value = exited.Value
              }
              if (item.Code === 'IPDOAGIANM210') {
                if (item.Value) {
                  this.ApgarTableData = item.Value
                } else {
                  this.ApgarTableData = []
                }
              }
            }
          })
        }
      }
      this.UpdatedAt = moment(this.DataSubmit.UpdatedAt).format('HH:mm DD/MM/YYYY')
      if (!this.MASTERDATA['IPDOAGIANM7'].Items[0].Value) {
        this.CreatedAt = moment(this.DataSubmit.CreatedAt).format('HH:mm DD/MM/YYYY')
      } else {
        this.CreatedAt = this.MASTERDATA['IPDOAGIANM7'].Items[0].Value
      }
    },
    getTypeOfSpecial () {
      new InitialAssessment().find('ForNeonatalMaternityV2/InforVersion/' + this._VisitId).then(response => {
        this.checkInfoVersion = response.IsNewVisit
        this.checkSpecial = response.MedicalRecordCode
        this.getDetail()
      }).catch(err => {
        console.log(err)
      })
    },
    clearInput () {
      if (this.MASTERDATA) {
        if (this.MASTERDATA['IPDOAGIANM106'].Items[0].Value === false && this.MASTERDATA['IPDOAGIANM106'].Items[21].Value) {
          this.MASTERDATA['IPDOAGIANM106'].Items[21].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM106'].Items[1].Value === false && this.MASTERDATA['IPDOAGIANM106'].Items[22].Value) {
          this.MASTERDATA['IPDOAGIANM106'].Items[22].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM106'].Items[2].Value === false && (this.MASTERDATA['IPDOAGIANM106'].Items[4].Value || this.MASTERDATA['IPDOAGIANM106'].Items[6].Value)) {
          this.MASTERDATA['IPDOAGIANM106'].Items[4].Value = ''
          this.MASTERDATA['IPDOAGIANM106'].Items[6].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM106'].Items[7].Value === false && (this.MASTERDATA['IPDOAGIANM106'].Items[9].Value || this.MASTERDATA['IPDOAGIANM106'].Items[11].Value)) {
          this.MASTERDATA['IPDOAGIANM106'].Items[9].Value = ''
          this.MASTERDATA['IPDOAGIANM106'].Items[11].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM106'].Items[12].Value === false && (this.MASTERDATA['IPDOAGIANM106'].Items[14].Value || this.MASTERDATA['IPDOAGIANM106'].Items[16].Value)) {
          this.MASTERDATA['IPDOAGIANM106'].Items[14].Value = ''
          this.MASTERDATA['IPDOAGIANM106'].Items[16].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM106'].Items[17].Value === false && this.MASTERDATA['IPDOAGIANM106'].Items[18].Value) {
          this.MASTERDATA['IPDOAGIANM106'].Items[18].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM106'].Items[19].Value === false && this.MASTERDATA['IPDOAGIANM106'].Items[20].Value) {
          this.MASTERDATA['IPDOAGIANM106'].Items[20].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM128'].Items[2].Value === false && this.MASTERDATA['IPDOAGIANM128'].Items[3].Value) {
          this.MASTERDATA['IPDOAGIANM128'].Items[3].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM84'].Items[5].Value === false && this.MASTERDATA['IPDOAGIANM84'].Items[6].Value) {
          this.MASTERDATA['IPDOAGIANM84'].Items[6].Value = ''
        }
      }
    },
    resetStage () {
      this.MASTERDATA['IPDOAGIANM207'].Items[0].Value.map((item, index) => {
        item.Stage = index + 1
        item.Order = index + 1
      })
    },
    addRowDelivery () {
      if (!this.MASTERDATA['IPDOAGIANM205'].Items[0].Value) {
        this.MASTERDATA['IPDOAGIANM205'].Items[0].Value = []
      } else {
        this.MASTERDATA['IPDOAGIANM205'].Items[0].Value = [...this.MASTERDATA['IPDOAGIANM205'].Items[0].Value]
      }
      this.MASTERDATA['IPDOAGIANM205'].Items[0].Value.push({
        Year: '',
        Name: ''
      })
    },
    deleteRowDelivery (index) {
      this.MASTERDATA['IPDOAGIANM205'].Items[0].Value.splice(index, 1)
    },
    addRowLabours () {
      if (!this.MASTERDATA['IPDOAGIANM207'].Items[0].Value) {
        this.MASTERDATA['IPDOAGIANM207'].Items[0].Value = []
      } else {
        this.MASTERDATA['IPDOAGIANM207'].Items[0].Value = [...this.MASTERDATA['IPDOAGIANM207'].Items[0].Value]
      }
      this.MASTERDATA['IPDOAGIANM207'].Items[0].Value.push({
        Stage: this.Stage++,
        Content: '',
        Order: this.Stage++
      })
      this.resetStage()
    },
    deleteRowLabours (index) {
      if (index === 0) {
        this.Stage = 1
      }
      this.MASTERDATA['IPDOAGIANM207'].Items[0].Value.splice(index, 1)
      this.resetStage()
    },
    submit () {
      var obj = {}
      this.MASTERDATA['IPDOAGIANM209'].Items[0].Value = this.$refs.ApgarTable.tableApgar
      this.MASTERDATA['IPDOAGIANM7'].Items[0].Value = this.CreatedAt
      if (!this.MASTERDATA['IPDOAGIANM128'].Items[5].Value) {
        this.MASTERDATA['IPDOAGIANM228'].Items[0].Value = ''
      }
      this.clearInput()
      this.DataSubmit.Datas = []
      if (this.arrivalTime && this.checkSpecial !== 'A01_038_050919_V') {
        const timeSubmit = moment(this.arrivalTime, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY')
        this.DataSubmit.Time = {
          AdmittedFrom: timeSubmit
        }
      } else if (this.checkSpecial === 'A01_038_050919_V') {
        this.DataSubmit.Time = {
          AdmittedFrom: this.$store.state.account.CurrentPatientObj.AdmittedDate
        }
      } else {
        this.DataSubmit.Time = {
          AdmittedFrom: null
        }
      }
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            if (item.Code === 'IPDOAGIANM213') {
              console.log('item', item)
            }
            var val = item.Value
            if (item.Code === 'IPDOAGIANM206') {
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'IPDOAGIANM208') {
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'IPDOAGIANM210') {
              val = JSON.stringify(item.Value)
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      this.confirmSuccess = false
      if (this.checkSpecial === 'A01_035_050919_V') {
        this.DataSubmit = {
          ...this.DataSubmit,
          NewbornCustomerId: this.$route.params.NewbornCustomerId
        }
        // save women
        new InitialAssessment().update('ForNeonatalMaternityV2/Update/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity_Obstetrics' + '/' + this._ItemId, this.DataSubmit).then(response => {
          if (!this.isComfirm) {
            this.toastedSuccess()
          }
          this.confirmSuccess = true
        }).catch(e => {
          this._401ResponseError(e)
        })
      } else if (this.checkSpecial === 'A01_038_050919_V') {
        this.DataSubmit = {
          ...this.DataSubmit
        }
        new InitialAssessment().update('ForNeonatalMaternityV2/Update/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity/', this.DataSubmit).then(response => {
          if (!this.isComfirm) {
            this.toastedSuccess()
          }
          this.confirmSuccess = true
        }).catch(e => {
          this._401ResponseError(e)
        })
      }
    },
    getDetail () {
      // sow sinh
      if (this.checkSpecial === 'A01_035_050919_V') {
        new InitialAssessment().find('ForNeonatalMaternityV2/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity_Obstetrics/' + this._ItemId).then(response => {
          this.IsLocked = response.IsLocked
          this.isNew = response.isNew
          this.$store.dispatch('setCurrentFormId', response.ID)
          this.dataMaster = JSON.stringify(this.MASTERDATA)
          var dataPid = response.NewbornCustomer
          if (dataPid) {
            this.Customer = {
              ...this.Customer,
              Fullname: dataPid.Fullname,
              Gender: dataPid.Gender,
              DateOfBirth: dataPid.DateOfBirth,
              PID: dataPid.PID
            }
          }
          if (response.OldDatas && response.SpecialtyOld) {
            this.syncInfo = response.OldDatas
            this.specialty = response.SpecialtyOld
          } else {
            this.syncInfo = null
            this.specialty = ''
          }
          this.mapData(response)
          this.loaded = true
        }).catch(e => {
          this.IsLocked = e.data.IsLocked
          this.loaded = true
          this._401ResponseError(e)
        })
      } else if (this.checkSpecial === 'A01_038_050919_V') {
        new InitialAssessment().find('ForNeonatalMaternityV2/A02_016_050919_VE/' + this._VisitId + '/' + 'ForNeonatalMaternity/').then(response => {
          this.IsLocked = response.IsLocked
          this.isNew = response.isNew
          this.$store.dispatch('setCurrentFormId', response.ID)
          this.dataMaster = JSON.stringify(this.MASTERDATA)
          var dataPid = response.NewbornCustomer
          if (dataPid) {
            this.Customer = {
              ...this.Customer,
              Fullname: dataPid.Fullname,
              Gender: dataPid.Gender,
              DateOfBirth: dataPid.DateOfBirth,
              PID: dataPid.PID
            }
          }
          this.arrivalTime = this.$store.state.account.CurrentPatientObj.AdmittedDate
          if (response.OldDatas && response.SpecialtyOld) {
            this.syncInfo = response.OldDatas
            this.specialty = response.SpecialtyOld
          } else {
            this.syncInfo = null
            this.specialty = ''
          }
          this.loaded = true
          this.mapData(response)
        }).catch(e => {
          this.IsLocked = e.data.IsLocked
          this.loaded = true
          this._401ResponseError(e)
        })
      }
    },
    getData () {
      new InitialAssessment().find('ForNeonatalMaternityV2/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity/' + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        if (response.DataPara !== null) {
          this.DataPara = response.DataPara.Datas
          this.ParaUpdateAt = response.DataPara.UpdateAt
          this.ParaUpdateBy = response.DataPara.UpdateBy
          this.ParaYear = response.DataPara.Year
          this.DataPara.map(item => {
            if (item.Value) {
              this.syncPara = true
              this.syncListPara.push(item.Value)
            }
          })
          this.syncListPara = this.syncListPara.toString()
        }
        if (this.syncInfo && response.Datas.length === 0) {
          this.DataSubmit.Datas = this.syncInfo
          this.synced = true
        }
        if (response.DateOfAdmission && !this.isNew) {
          const responseArrivalTime = moment(response.DateOfAdmission).format('HH:mm DD/MM/YYYY')
          this.arrivalTime = responseArrivalTime
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
                } else if (item.Code === 'IPDOAGIANM206' || item.Code === 'IPDOAGIANM208' || item.Code === 'IPDOAGIANM210') {
                  item.Value = this.JSONParse(exited.Value)
                } else if (item.Code === 'IPDOAGIANM2' || item.Code === 'IPDOAGIANM4' || item.Code === 'IPDOAGIANM6') {
                  item.Value = this.JSONParse(exited.Value)
                  this.listDoctors.push(item.Value)
                } else {
                  item.Value = exited.Value
                }
              }
            })
          }
        }
        this.UpdatedAt = moment(this.DataSubmit.UpdatedAt).format('HH:mm DD/MM/YYYY')
        if (!this.MASTERDATA['IPDOAGIANM7'].Items[0].Value && this.isNew) {
          this.CreatedAt = moment(this.DataSubmit.CreatedAt).format('HH:mm DD/MM/YYYY')
        } else {
          this.CreatedAt = this.MASTERDATA['IPDOAGIANM7'].Items[0].Value
        }
      }).catch(e => {
        this.DataSubmit = {}
        if (e.status === 404) {}
      })
    },
    create () {
      new InitialAssessment().update('ForNeonatalMaternityV2/Create/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity/').then(response => {
        this.reload()
      }).catch(e => {
        console.log('ForNeonatalMaternityV2/Create/', e)
      })
    },
    copy () {
      if (this.MASTERDATA['IPDOAGIANM217'].Items) {
        this.MASTERDATA['IPDOAGIANM217'].Items[1].Value = this.DataPara[0].Value
        this.MASTERDATA['IPDOAGIANM217'].Items[3].Value = this.DataPara[1].Value
        this.MASTERDATA['IPDOAGIANM217'].Items[5].Value = this.DataPara[2].Value
        this.MASTERDATA['IPDOAGIANM217'].Items[7].Value = this.DataPara[3].Value
      }
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới đánh giá ban đầu trẻ vừa sinh *?'),
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
    UpdateVisitCode (visitcode) {
      this.loaded = false
      this.MASTERDATA['IPDOAGIANMVISITCODE01'].Items[0].Value = visitcode
      var obj = {}
      if (this.arrivalTime && this.checkSpecial !== 'A01_038_050919_V') {
        const timeSubmit = moment(this.arrivalTime, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY')
        this.DataSubmit.Time = {
          AdmittedFrom: timeSubmit
        }
      } else if (this.checkSpecial === 'A01_038_050919_V') {
        this.DataSubmit.Time = {
          AdmittedFrom: this.$store.state.account.CurrentPatientObj.AdmittedDate
        }
      } else {
        this.DataSubmit.Time = {
          AdmittedFrom: null
        }
      }
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            if (item.Code === 'IPDOAGIANM213') {
              console.log('item', item)
            }
            var val = item.Value
            if (item.Code === 'IPDOAGIANM206') {
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'IPDOAGIANM208') {
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'IPDOAGIANM210') {
              val = JSON.stringify(item.Value)
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }

      if (this.checkSpecial === 'A01_035_050919_V') {
        this.DataSubmit = {
          ...this.DataSubmit,
          NewbornCustomerId: this.$route.params.NewbornCustomerId
        }
        // save women
        new InitialAssessment().update('ForNeonatalMaternityV2/Update/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity_Obstetrics' + '/' + this._ItemId, this.DataSubmit).then(response => {
          if (!this.isComfirm) {
            this.toastedSuccess()
          }
          this.confirmSuccess = true
        }).catch(e => {
          this._401ResponseError(e)
        })
      } else if (this.checkSpecial === 'A01_038_050919_V') {
        this.DataSubmit = {
          ...this.DataSubmit
        }
        new InitialAssessment().update('ForNeonatalMaternityV2/Update/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity/', this.DataSubmit).then(response => {
          if (!this.isComfirm) {
            this.toastedSuccess()
          }
          this.confirmSuccess = true
        }).catch(e => {
          this._401ResponseError(e)
        })
      }

      this.loaded = true
    }
  }
}
</script>
<style scoped>
.d-none {
  display: none;
}
.v-tab-2 .nav-tabs li {
  margin-right: 0px !important;
}
.resuscitation .v-checkbox input[type=checkbox] + label:before {
  margin-left: 0;
  margin-right: 5px;
}
.resuscitation label {
  margin-bottom: 0;
}
.resuscitation .flex-box.flex-center.time label {
  display: flex;
  align-items: center;
  font-weight: bold;
}
.CAB .v-checkbox input[type=checkbox] + label:before {
  margin-left: 0;
  margin-right: 5px;
  transform: translateY(5px);
}
.search-name {
  width: 450px;
}
.analgesia-anaesthesia:last-child {
  width: 41.5%;
  margin: 0 !important;
}
.analgesia-anaesthesia:last-child > input{
  width: 100%;
}
.v-checkbox input[type=checkbox] + label {
  text-align: left !important;
}
.detail-table td {
  background-color: #F5F5F5;
}
.v-table-1 th {
  text-align: left;
}
.d-none {
  display: none;
}
.resuscitation .v-checkbox input[type=checkbox] + label:before {
  margin-left: 0;
  margin-right: 5px;
}
.resuscitation label {
  margin-bottom: 0;
}
.resuscitation .flex-box.flex-center.time label {
  display: flex;
  align-items: center;
  font-weight: bold;
}
.CAB .v-checkbox input[type=checkbox] + label:before {
  margin-left: 0;
  margin-right: 5px;
  transform: translateY(5px);
}
.search-name {
  width: 450px;
}
.analgesia-anaesthesia:last-child {
  width: 41.5%;
  margin: 0 !important;
}
.analgesia-anaesthesia:last-child > input{
  width: 100%;
}
.v-checkbox input[type=checkbox] + label {
  text-align: left !important;
}
.detail-table td {
  background-color: #F5F5F5;
}
.v-table-1 th {
  text-align: left;
}
.disableClick {
  pointer-events: none !important;
}
</style>
