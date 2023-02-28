<template>
  <div class="main-content" id="ProcedureSummaryPage">
    <div v-if="loaded">
      <template v-if="DataSubmit">
        <div class="box-body-bordered">
          <!-- Ngày, giờ phẫu thuật -->
          <div class="row" v-if="MASTERDATA['EIOPS25']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{ __t(__label(MASTERDATA["EIOPS25"])) }}</label>
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['EIOPS25'].Items"
                >
                  <p v-if="isConfirmed">{{ item.Value | formatDateTime('HH:mm DD/MM/YYYY')}}</p>
                  <v-date-time-picker
                    v-else
                    v-model="item.Value"
                    class="select-boox no-clear"
                    :format="vDateTimeFormat"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- ICD10 Trước phẫu thuật -->
          <div class="row" v-if="MASTERDATA['EIOPS59']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{ __t(__label(MASTERDATA["EIOPS59"])) }}</label>
                <icd10 class="mrb10" :mdCode="'EIOPS60'" :readonly="isConfirmed" @icdChange="icdChange" v-model="MASTERDATA['EIOPS59'].Items[0].Value" />
              </div>
            </div>
          </div>
          <!-- Chẩn đoán trước phẫu thuật -->
          <div class="row" v-if="MASTERDATA['EIOPS11']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{ __t(__label(MASTERDATA["EIOPS11"])) }}
                  <button
                    v-if="_VisitType === 'OPD' && !isConfirmed"
                    class="btn-sync-data btn"
                    @click="sync"
                  >
                    {{ __t("Đồng bộ chẩn đoán") }}
                  </button>
                </label>
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['EIOPS11'].Items"
                >
                  <!-- <icd10 class="mrb10" v-if="item.Code === 'EIOPS63'" :mdCode="'EIOPS63'" :readonly="isConfirmed" @icdChange="icdChange" /> -->
                  <textarea-autosize v-if="item.Code === 'EIOPS12'"
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    class="form-control"
                    rows="3"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- ICD10 Sau phẫu thuật -->
          <div class="row" v-if="MASTERDATA['EIOPS61']">
            <div class="col-md-12">
              <button class="btn btn-sync-data pull-right" v-if="!viewOnly && isConfirmed === false"  @click="copyChanDoanTruocPhauThuat()">{{__t2('Tham khảo chẩn đoán trước phẫu thuật')}}</button>
              <div class="form-group">
                <label>{{ __t(__label(MASTERDATA["EIOPS61"])) }}</label>
                <icd10 class="mrb10" :mdCode="'EIOPS62'" :readonly="isConfirmed" @icdChange="icdChange" v-model="MASTERDATA['EIOPS61'].Items[0].Value" />
              </div>
            </div>
          </div>
          <!-- Chẩn đoán sau phẫu thuật -->
          <div class="row" v-if="MASTERDATA['EIOPS09']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{ __t(__label(MASTERDATA["EIOPS09"])) }}<i class="unit-label">{{MASTERDATA["EIOPS09"].Note}}</i></label>
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['EIOPS09'].Items"
                >
                  <textarea-autosize
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    class="form-control"
                    rows="3"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Phương pháp phẫu thuật -->
          <div class="row" v-if="MASTERDATA['EIOPS17']">
            <div class="col-md-12">
              <div class="form-group">
                <label
                  >{{ __t(__label(MASTERDATA["EIOPS17"])) }}
                  <i class="unit-label">{{
                    MASTERDATA["EIOPS17"].Note
                  }}</i></label
                >
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['EIOPS17'].Items"
                >
                  <textarea-autosize
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    class="form-control"
                    rows="3"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Loại phẫu thuật -->
          <div class="row" v-if="MASTERDATA['EIOPS31']">
            <div class="col-md-12">
              <div class="form-group flex-box" style="float: left">
                <label style="margin: auto; margin-right: 20px;">{{ __t(__label(MASTERDATA["EIOPS31"])) }}:</label>
                <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['EIOPS31'].Items">
                  <div class="btn-action radio-left">
                    <MDRadio
                      v-if="!isConfirmed"
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['EIOPS31']"
                    />
                    <MDRadio
                      v-else
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['EIOPS31']"
                      style="pointer-events: none;"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Phân loại vết mổ -->
          <div class="row" v-if="MASTERDATA['EIOPS36']">
            <div class="col-md-12">
              <div class="form-group flex-box" style="float: left">
                <label style="margin: auto; margin-right: 20px;">{{ __t(__label(MASTERDATA["EIOPS36"])) }}:
                  <!-- <i class="unit-label">{{MASTERDATA["EIOPS36"].EnName}}:</i> -->
                </label>
                <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['EIOPS36'].Items">
                  <div class="btn-action radio-left">
                    <MDRadio
                      v-if="!isConfirmed"
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['EIOPS36']"
                    />
                    <MDRadio
                      v-else
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['EIOPS36']"
                      style="pointer-events: none;"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Phương pháp vô cảm -->
          <div class="row" v-if="MASTERDATA['EIOPS19']">
            <div class="col-md-12">
              <div class="form-group">
                <label
                  >{{ __t(__label(MASTERDATA["EIOPS19"])) }}
                  <i class="unit-label">{{
                    MASTERDATA["EIOPS19"].Note
                  }}</i></label
                >
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['EIOPS19'].Items"
                >
                  <textarea-autosize
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    class="form-control"
                    rows="3"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Phẫu thuật viên chính -->
          <div class="row" v-if="MASTERDATA['EIOPS41']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{ __t(__label(MASTERDATA["EIOPS41"])) }}
                  <i class="unit-label">{{MASTERDATA["EIOPS41"].Note}}</i></label>
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['EIOPS41'].Items"
                >
                  <user-auto-suggest
                    :position="'ALL'"
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  />
                  <!-- <user-ad :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" v-model="item.Value" :placeholder="__t('Bác sĩ')"/> -->
                </div>
              </div>
            </div>
          </div>
          <!-- Phẫu thuật viên phụ -->
          <div class="row" v-if="MASTERDATA['EIOPS15']">
            <div class="col-md-12">
              <div class="form-group">
                <label
                  >{{ __label(MASTERDATA["EIOPS15"]) }}
                  <i class="unit-label">{{
                    MASTERDATA["EIOPS15"].Note
                  }}</i></label
                >
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['EIOPS15'].Items"
                >
                  <!-- <UserAdV4 :readonly="isConfirmed" v-model="item.Value" ref="userAd" :placeholder="__t(__label(item))"></UserAdV4> -->
                  <user-auto-suggest
                    :position="'ALL'"
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Bác sĩ gây mê hồi sức -->
          <div class="row" v-if="MASTERDATA['EIOPS01']">
            <div class="col-md-12">
              <div class="form-group">
                <label
                  >{{ __label(MASTERDATA["EIOPS01"]) }}
                  <i class="unit-label">{{
                    MASTERDATA["EIOPS01"].Note
                  }}</i></label
                >
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['EIOPS01'].Items"
                >
                  <user-auto-suggest
                    :position="'ALL'"
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Điều dưỡng phụ mê -->
          <div class="row" v-if="MASTERDATA['EIOPS43']">
            <div class="col-md-12">
              <div class="form-group">
                <label
                  >{{ __label(MASTERDATA["EIOPS43"]) }}
                  <i class="unit-label">{{
                    MASTERDATA["EIOPS43"].Note
                  }}</i></label
                >
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['EIOPS43'].Items"
                >
                  <!-- <UserAdV4 :readonly="isConfirmed" v-model="item.Value" ref="userAd" :placeholder="__t(__label(item))"></UserAdV4> -->
                  <user-auto-suggest
                    :position="'ALL'"
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Điều dưỡng dụng cụ -->
          <div class="row" v-if="MASTERDATA['EIOPS45']">
            <div class="col-md-12">
              <div class="form-group">
                <label
                  >{{ __label(MASTERDATA["EIOPS45"]) }}
                  <i class="unit-label">{{
                    MASTERDATA["EIOPS45"].Note
                  }}</i></label
                >
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['EIOPS45'].Items"
                >
                  <!-- <UserAdV4 :readonly="isConfirmed" v-model="item.Value" ref="userAd" :placeholder="__t(__label(item))"></UserAdV4> -->
                  <user-auto-suggest
                    :position="'ALL'"
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Điều dưỡng chạy ngoài -->
          <div class="row" v-if="MASTERDATA['EIOPS47']">
            <div class="col-md-12">
              <div class="form-group">
                <label
                  >{{ __label(MASTERDATA["EIOPS47"]) }}
                  <i class="unit-label">{{
                    MASTERDATA["EIOPS47"].Note
                  }}</i></label
                >
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['EIOPS47'].Items"
                >
                  <!-- <UserAdV4 :readonly="isConfirmed" v-model="item.Value" ref="userAd" :placeholder="__t(__label(item))"></UserAdV4> -->
                  <user-auto-suggest
                    :position="'ALL'"
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Lược đồ phẫu thuật -->
          <div class="v-tab">
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" :class="{ active: tab === 'tab1' }">
                <a
                  href="#tab1"
                  @click="tab = 'tab1'"
                  aria-controls="tab1"
                  role="tab"
                  data-toggle="tab"
                  >{{ __t("Upload từ thiết bị") }}</a
                >
              </li>
              <li role="presentation" :class="{ active: tab === 'tab2' }">
                <a
                  href="#tab2"
                  @click="tab = 'tab2'"
                  aria-controls="tab2"
                  role="tab"
                  data-toggle="tab"
                  >{{ __t("Hoặc vẽ lược đồ phẫu thuật") }}</a
                >
              </li>
            </ul>
            <div class="tab-content">
              <div
                role="tabpanel"
                class="tab-pane min-height-none"
                id="tab1"
                :class="{ active: tab === 'tab1' }"
              >
                <div class="pomc-upload-area mb-10" v-if="MASTERDATA['EIOPS29']">
                  <div class="row" v-if="isConfirmed">
                    <div class="col-md-12 col-sm-12">
                      <drop-files
                        id="mini-upload"
                        :readonly="true"
                        v-model="MASTERDATA['EIOPS29'].Items[0].Value"
                      />
                    </div>
                  </div>
                  <div class="row" v-else>
                    <div class="col-md-7 col-sm-7">
                      <p>
                        <b>{{ __t("Upload ảnh") }}:</b>
                      </p>
                      <p>
                        <button
                          @click="openFile()"
                          class="btn v-white-btn font16 font-bold btn-upload"
                        >
                          <i class="fa fa-upload" aria-hidden="true"></i>
                          {{ __t("UPLOAD TỪ THIẾT BỊ") }}
                        </button>
                      </p>
                      <p>{{__t("Bác sĩ tải hình ảnh mô tả phẫu thuật tại đây (cho phép tải 1 hoặc nhiều hình ảnh).")}}</p>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <drop-files
                        id="mini-upload"
                        v-model="MASTERDATA['EIOPS29'].Items[0].Value"
                        :dataDropfile="dataDropfile"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                role="tabpanel"
                class="tab-pane min-height-none"
                id="tab2"
                :class="{ active: tab === 'tab2' }"
              >
                <div class="text-center pomc-upload-area">
                  <div class="EDARRPAMAPALO-BG" v-if="MASTERDATA['EIOPS03']">
                    <img
                      src="static/tivi-bg.png"
                      style="width: 950px;opacity: 0.4;"
                    />
                    <div class="paint-content">
                      <Painting
                        :readonly="isConfirmed"
                        v-model="MASTERDATA['EIOPS03'].Items[0].Value"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Dẫn lưu -->
          <div class="row" style="margin-top: 20px;" v-if="MASTERDATA['EIOPS49']">
            <div class="col-md-12">
              <div class="form-group flex-box" style="float: left">
                <label style="margin: auto; margin-right: 20px;">{{ __t(__label(MASTERDATA["EIOPS49"])) }}:</label>
                <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['EIOPS49'].Items">
                  <div class="btn-action radio-left" >
                    <MDRadio
                      v-if="!isConfirmed"
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['EIOPS49']"
                      @onChange="handleNoDrain()"
                    />
                    <MDRadio
                      v-else
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['EIOPS49']"
                      style="pointer-events: none;"
                    />
                  </div>
                </div>
                <button :readonly="isConfirmed" v-if="MASTERDATA['EIOPS49'].Items[0].Value && !isConfirmed" @click="handleAddMember" class="btn-add mrt10" style="margin: auto !important;">{{__t("Thêm Vị trí - Số lượng")}}</button>
              </div>
            </div>
          </div>
          <div class="row" v-if="MASTERDATA['EIOPS49'].Items[0].Value">
            <div :data="item" :key="index" v-for="(item, index) in ListPositionAndNumber" style="margin: 0px 20px 0px 20px;">
              <div class="col-md-5 col-sm-5">
                <div class="form-group">
                  <input :readonly="isConfirmed" class="form-control" :placeholder="__t('Vị trí ')" v-model="item.Position" required/>
                </div>
              </div>
              <div class="col-md-5 col-sm-5">
                <div class="form-group">
                  <input :readonly="isConfirmed"  class="form-control" :placeholder="__t('Số lượng ')" v-model="item.Number" required/>
                </div>
              </div>
              <button class="btn v-yellow-btn col-md-1 col-sm-1" style="width: 40px; margin-top: 1px;"  v-if="ListPositionAndNumber.length > 1 && !isConfirmed" @click="handleDelete(index)">
                <i class="fa fa-trash" aria-hidden="true" style="margin: auto"></i>
              </button>
            </div>
          </div>
          <!-- Số mẫu bệnh phẩm - Lượng máu mất - Lượng máu truyền vào -->
          <div class="row">
            <div class="col-md-4 col-sm-4">
              <div class="form-group">
                <label>{{__label(MASTERDATA['EIOPS23'])}} <i class="unit-label">{{MASTERDATA['EIOPS23'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['EIOPS23'].Items">
                  <div class="fake-input disable" v-if="isConfirmed">{{item.Value}}</div>
                  <template v-else>
                    <input :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" :placeholder="__label(item)" v-model="item.Value"/>
                  </template>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group">
                <label>{{__label(MASTERDATA['EIOPS13'])}} <i class="unit-label">{{MASTERDATA['EIOPS13'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['EIOPS13'].Items">
                  <div class="fake-input disable" v-if="isConfirmed">{{item.Value}}</div>
                  <template v-else>
                    <input :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" :placeholder="__label(item)" v-model="item.Value"/>
                  </template>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group">
                <label>{{__label(MASTERDATA['EIOPS53'])}} <i class="unit-label">{{MASTERDATA['EIOPS53'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['EIOPS53'].Items">
                  <div class="fake-input disable" v-if="isConfirmed">{{item.Value}}</div>
                  <template v-else>
                    <input :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" :placeholder="__label(item)" v-model="item.Value"/>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <!-- Khác -->
          <div class="row" v-if="MASTERDATA['EIOPS55']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__label(MASTERDATA['EIOPS55'])}}</label>
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['EIOPS55'].Items"
                >
                  <textarea-autosize
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    class="form-control"
                    rows="3"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Trình tự phẫu thuật -->
          <h4 v-if="MASTERDATA['EIOPS27']">
            <b>{{ __label(MASTERDATA["EIOPS27"]) }}</b>
          </h4>
          <div class="row" v-if="MASTERDATA['EIOPS27']">
            <div class="col-md-12">
              <div class="form-group">
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['EIOPS27'].Items"
                >
                  <textarea-autosize
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    class="form-control"
                    rows="3"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Các biến chứng hoặc diễn biến bất thường -->
          <div class="row" v-if="MASTERDATA['EIOPS57']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__label(MASTERDATA['EIOPS57'])}} <i class="unit-label">{{MASTERDATA['EIOPS57'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['EIOPS57'].Items">
                  <textarea-autosize :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row" style="width: 100%; display: flex;">
            <div style="width: 50%;"></div>
            <div style="width: 50%;" class="text-center">
              <template v-if="DataSubmit.ProcedureTime">
                <p class="text-center">{{DataSubmit.ProcedureTime}}</p>
                <eform-signature :ad="DataSubmit.ProcedureDoctor.Username" :title="'Bác sĩ phẫu thuật'" />
              </template>
              <template v-else>
                <p><b>{{__t('Bác sĩ phẫu thuật')}}:</b></p>
                <p><i v-if="viewOnly">{{__t('Chưa xác nhận')}}</i><button v-else-if="enableConfirm" @click="showDoctorConfirm('Surgoen', 'Bác sĩ phẫu thuật ')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
              </template>
            </div>
          </div>
          <div id="printMe" v-show="false" v-if="DataSubmit">
            <ViewToPrintSurgeryAndProcedureSummary :Data="DataSubmit"/>
          </div>
          <div class="status-float-block" v-if="!viewOnly && !IsLocked">
            <div class="action-btn-block">
              <div class="container">
                <div class="content-container">
                  <div class="row">
                    <div class="col-md-2 col-sm-2">
                      <div class="form-group1">
                        <button class="btn btn-block v-white-btn" type="button" @click="backButton()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2" v-if="_VisitType === 'IPD'">
                      <button v-if="SurgeryCertificateId !== '00000000-0000-0000-0000-000000000000'"  class="btn btn-info pull-left" type="button" @click="printCertificate()" v-shortkey="['ctrl', 'p']" @shortkey="print()">
                        <i class="fa fa-print" aria-hidden="true"></i> {{ __t("In Giấy chứng nhận") }}
                      </button>
                    </div>
                    <div class="col-md-2 col-sm-2" v-else>
                      <!-- Nothing -->
                    </div>
                    <div class="col-md-2 col-sm-2" >
                      <div class="form-group1">
                        <button
                          class="btn btn-info pull-left"
                          type="button"
                          @click="print()"
                          v-shortkey="['ctrl', 'p']"
                          @shortkey="print()"
                        >
                          <i class="fa fa-print" aria-hidden="true"></i> {{ __t("In phiếu") }}
                        </button>
                      </div>
                    </div>
                    <div class="col-md-1 col-sm-1" v-if="!isConfirmed">
                      <!-- nothing -->
                    </div>
                    <div class="col-md-1 col-sm-1" v-else>
                      <!-- nothing -->
                    </div>
                    <div class="col-md-4 col-sm-4" v-if="!isConfirmed">
                      <div class="form-group1">
                        <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" v-shortkey="['ctrl', 's']" @shortkey="save()" type="button" @click="save(false)"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4" v-else>
                      <!-- Nothing -->
                    </div>
                    <div class="col-md-1 col-sm-1 back-to-top">
                      <button @click="scroll2Top()" class="btn v-yellow-btn btn-block" title="Go to top"><i class="fa fa-arrow-circle-up" aria-hidden="true"></i></button>
                    </div>
                    <div class="col-md-6 col-sm-6">
                      <div class="form-group1 hidden-on-production">
                        <router-link class="btn btn-block v-white-btn" :to="{name: 'ProcedureSummaryCertification', params: { Id: $route.params.Id }, query: { open: true}}">
                          {{__t('GIẤY CHỨNG NHẬN THỦ THUẬT')}}
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Hiển thị In -->
          <div class="status-float-block" v-if="!viewOnly && IsLocked">
            <div class="action-btn-block">
              <div class="container">
                <div class="content-container">
                  <div class="row">
                    <div class="col-md-2 col-sm-2">
                      <div class="form-group1">
                        <button class="btn btn-block v-white-btn" type="button" @click="backButton()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2" v-if="_VisitType === 'IPD'">
                      <button v-if="SurgeryCertificateId !== '00000000-0000-0000-0000-000000000000'"  class="btn btn-info pull-left" type="button" @click="printCertificate()" v-shortkey="['ctrl', 'p']" @shortkey="print()">
                        <i class="fa fa-print" aria-hidden="true"></i> {{ __t("In Giấy chứng nhận") }}
                      </button>
                    </div>
                    <div class="col-md-2 col-sm-2" v-else>
                      <!-- Nothing -->
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-group1">
                        <button
                          class="btn btn-info pull-right"
                          type="button"
                          @click="print()"
                          v-shortkey="['ctrl', 'p']"
                          @shortkey="print()"
                        >
                          <i class="fa fa-print" aria-hidden="true"></i> {{ __t("In phiếu") }}
                        </button>
                      </div>
                    </div>
                    <div class="col-md-1 col-sm-1" v-if="!isConfirmed">
                      <!-- nothing -->
                    </div>
                    <div class="col-md-1 col-sm-1" v-else>
                      <!-- nothing -->
                    </div>
                    <div class="col-md-4 col-sm-4" v-if="!isConfirmed">
                      <div class="form-group1">
                        <!-- <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" v-shortkey="['ctrl', 's']" @shortkey="save()" type="button" @click="save(false)"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button> -->
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4" v-else>
                      <!-- Nothing -->
                    </div>
                    <div class="col-md-1 col-sm-1 back-to-top">
                      <button @click="scroll2Top()" class="btn v-yellow-btn btn-block" title="Go to top"><i class="fa fa-arrow-circle-up" aria-hidden="true"></i></button>
                    </div>
                    <div class="col-md-6 col-sm-6">
                      <div class="form-group1 hidden-on-production">
                        <router-link class="btn btn-block v-white-btn" :to="{name: 'ProcedureSummaryCertification', params: { Id: $route.params.Id }, query: { open: true}}">
                          {{__t('GIẤY CHỨNG NHẬN THỦ THUẬT')}}
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <!-- Nothing -->
          </div>
        </div>
      </template>
    </div>
    <div v-else class="loading-text"><v-loading /></div>
    <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{ popupTitle }}.</h3>
          <div style="color: #fff">
            {{ __t("Vui lòng nhập tài khoản ad để xác nhận") }}
          </div>
        </div>
        <div class="form-confirm">
          <div class="form-group has-feedback">
            <input
              v-model="user.username"
              type="text"
              class="form-control"
              :placeholder="__t('Tên đăng nhập')"
            />
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input
              v-model="user.password"
              type="password"
              class="form-control current-password"
              :placeholder="__t('Mật khẩu')"
            />
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
            <div class="col-xs-6">
              <button
                type="button"
                class="btn btn-block v-white-btn"
                @click="$modal.hide('doctorConfirm')"
              >
                {{ __t("Thoát") }}
              </button>
            </div>
            <div class="col-xs-6">
              <button
                type="button"
                class="btn btn-block v-yellow-btn"
                @click="confirm()"
              >
                {{ __t("Xác nhận") }}
              </button>
            </div>
          </div>
          <p style="margin-top: 10px; text-align:center">
            {{ __t("Sử dụng tài khoản máy tính") }}
          </p>
          <p style="margin-top: 10px; text-align:center">
            {{
              __t(
                "Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu"
              )
            }}
          </p>
        </div>
      </div>
    </modal>
    <modal name="printCertificate" transition="pop-out" height="auto" :clickToClose="true" width="1000px" v-if="DataOfSurgeryCertificate.Datas">
      <div class="main-content" id="SurgeryCertificate" v-if="DataOfSurgeryCertificate" style="margin-top: 20px;">
        <div class="a4-page box" id="SurgeryCertificate-price">
          <table class="table" style="width: 100%">
            <tr style="height: 100px;">
              <th style="text-align: center;" align="center">
                <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
              </th>
            </tr>
            <tr>
              <th class="text-center" style="text-align: center;vertical-align: bottom;" align="center">
                <p class="text-center textUppercase fs20 none-mrb">GIẤY CHỨNG NHẬN PHẪU THUẬT</p>
                <p class="text-center textUppercase fs20 none-mrb">SURGERY CERTIFICATE</p>
              </th>
            </tr>
          </table>
          <br>
          <p v-if="DataOfSurgeryCertificate.CustomerInfo" style="margin-bottom: 10px;"><b style="display: inline;">Khoa/</b>Department: {{DataOfSurgeryCertificate.Khoa ? DataOfSurgeryCertificate.Khoa : ''}}</p>
          <p v-if="DataOfSurgeryCertificate.CustomerInfo" style="margin-bottom: 10px;"><b style="display: inline;">Họ, tên người bệnh/</b>Patient's Name: {{DataOfSurgeryCertificate.CustomerInfo ? DataOfSurgeryCertificate.CustomerInfo.Fullname : ''}}</p>
          <p v-if="DataOfSurgeryCertificate.CustomerInfo" style="margin-bottom: 10px;"><b style="display: inline;">Số đăng ký/</b>PID: {{DataOfSurgeryCertificate.CustomerInfo ? DataOfSurgeryCertificate.CustomerInfo.PID : ''}}</p>
          <p v-if="DataOfSurgeryCertificate.CustomerInfo" style="margin-bottom: 10px;"><b style="display: inline;">Ngày sinh/</b>D.O.B: {{DataOfSurgeryCertificate.CustomerInfo.DateOfBirth | formatDate2}}</p>
          <p v-if="DataOfSurgeryCertificate.CustomerInfo" style="margin-bottom: 10px;"><b style="display: inline;">Giới tính/</b>Gender: {{GENDER[DataOfSurgeryCertificate.CustomerInfo.Gender] || ''}}</p>
          <p v-if="DataOfSurgeryCertificate.CustomerInfo" style="margin-bottom: 10px;"><b style="display: inline;">Quốc tịch/</b>Nationality: {{DataOfSurgeryCertificate.CustomerInfo ? DataOfSurgeryCertificate.CustomerInfo.Nationality : ''}}</p>
          <p v-if="DataOfSurgeryCertificate.CustomerInfo" style="margin-bottom: 10px;"><b style="display: inline;">Địa chỉ/</b>Address: {{CustomerAddress}}</p>
          <p v-if="DataOfSurgeryCertificate.CustomerInfo" style="margin-bottom: 10px;"><b style="display: inline;">Ngày vào viện/</b>Admission Date: {{DataOfSurgeryCertificate.NgayVaoVien}}</p>
          <p v-if="DataOfSurgeryCertificate" style="margin-bottom: 10px;"><b style="display: inline;">Ngày ra viện/</b>Discharge Date: {{DataOfSurgeryCertificate.NgayRaVien}}</p>
          <p v-if="DataOfSurgeryCertificate" style="margin-bottom: 10px;"><b style="display: inline;">Ngày phẫu thuật/</b>Surgery Date: {{DataOfSurgeryCertificate.Datas.find(e => e.Code === 'IPDSURCER04').Value}}</p>
          <p v-if="DataOfSurgeryCertificate.Datas" style="margin-bottom: 10px;" ><b style="display: inline;">Chẩn đoán trước mổ/</b>Preoperative diagnosis: {{getDiagnosisSC(DataOfSurgeryCertificate.Datas.find(e => e.Code === 'IPDSURCER08').Value)}}</p>
          <p v-if="DataOfSurgeryCertificate.Datas" style="margin-bottom: 10px;"><b style="display: inline;">Chẩn đoán sau mổ/</b>Postoperative diagnosis: {{getDiagnosisSC(DataOfSurgeryCertificate.Datas.find(e => e.Code === 'IPDSURCER22').Value)}}</p>
          <p v-if="DataOfSurgeryCertificate.Datas" style="margin-bottom: 10px;"><b style="display: inline;">Phương pháp phẫu thuật/</b>Procedure performed: {{DataOfSurgeryCertificate.Datas.find(e => e.Code === 'IPDSURCER14').Value}}</p>
          <p v-if="DataOfSurgeryCertificate.Datas" style="margin-bottom: 10px;"><b style="display: inline;">Phương pháp vô cảm/</b>Method of anesthesia: {{DataOfSurgeryCertificate.Datas.find(e => e.Code === 'IPDSURCER16').Value}}</p>
          <p v-if="DataOfSurgeryCertificate.Datas" style="margin-bottom: 10px;"><b style="display: inline;">Phẫu thuật viên/</b>Surgeon's name: {{getName(DataOfSurgeryCertificate.Datas.find(e => e.Code === 'IPDSURCER18').Value)}}</p>
          <p v-if="DataOfSurgeryCertificate.Datas" style="margin-bottom: 10px;"><b style="display: inline;">Bác sĩ gây mê/</b>Anesthetist: {{getName(DataOfSurgeryCertificate.Datas.find(e => e.Code === 'IPDSURCER20').Value)}}</p>
          <div style="text-align: right;margin-bottom: 5px;" v-if="CreateAtHouse !== null">Giờ/Time {{CreateAtHouse}} Ngày/Date {{CreateAt}}</div>
          <div style="text-align: right;margin-bottom: 5px;" v-else>Giờ/Time <span>&emsp;&emsp;&emsp;&emsp;&emsp;</span> Ngày/Date <span>&emsp;&emsp;&emsp;&emsp;&emsp;</span></div>
          <table style="width: 100%">
            <tr>
              <td style="width: 33%" class="text-center">
                <p class="text-center none-mrb" style="font-size: 14px!important;"><b style="display: inline;">PHẪU THUẬT VIÊN</b></p>
                <p class="text-center none-mrb" style="font-size: 14px!important;">SURGEON</p>
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              </td>
              <td style="width: 33%" class="text-center">
                <p class="text-center none-mrb" style="font-size: 14px!important;"><b style="display: inline;">TRƯỞNG KHOA</b>/HEAD</p>
                <p class="text-center none-mrb" style="font-size: 14px!important;">OF DEPARTMENT</p>
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              </td>
              <td style="width: 33%; vertical-align: top;" class="text-center" align="top">
                <p class="text-center none-mrb" style="font-size: 14px!important;"><b style="display: inline;">GIÁM ĐỐC</b>/DIRECTOR</p>
                <br>
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              </td>
            </tr>
            <tr>
              <td><p class="text-center fw300" style="font-size: 14px!important;">{{DataOfSurgeryCertificate.ProcedureDoctor ? DataOfSurgeryCertificate.ProcedureDoctor.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p></td>
              <td><p class="text-center fw300" style="font-size: 14px!important;">{{DataOfSurgeryCertificate.Dean ? DataOfSurgeryCertificate.Dean.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p></td>
              <td><p class="text-center fw300" style="font-size: 14px!important;">{{DataOfSurgeryCertificate.Director ? DataOfSurgeryCertificate.Director.Fullname : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p></td>
            </tr>
          </table>
        </div>
      </div>
      <div style="margin: 12px 0px;" class="text-center">
        <button class="btn v-yellow-btn btn-block" style="width: 100px; display: initial;" @click="printSurgeryCertificate()"><i class="fa fa-print" aria-hidden="true"></i>{{__t('In')}}</button>
      </div>
    </modal>
    <p>A01_085_050919_VE</p>
    <logs
      v-if="!viewOnly"
      :EdId="this._ItemId"
      :Type="_VisitType + '/ProcedureSummary'"
    />
  </div>
</template>
<script>
// import UserAdV4 from '../../components/global/UserAdV4.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import ProcedureSummary from '@/services/ProcedureSummary'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import Logs from '@/components/Logs.vue'
import _ from 'lodash'
import NProgress from 'nprogress'
import $ from 'jquery'
import DropFiles from '@/components/DropFiles.vue'
import Painting from '@/components/Painting.vue'
import ViewToPrintSurgeryAndProcedureSummary from './Print.vue'
import moment from 'moment'
import SurgeryCertificatePrice from '../IPD/SurgeryCertificate/price/SurgeryCertificatePrice.vue'
import GetSurgeryCertificate from '@/services/IPD/SurgeryCertificate/GetSurgeryCertificate'
import UploadFileService from '@/services/IPD/UploadFileService'
import constants from '@/constants'
const GENDER = constants.GENDER

export default {
  name: 'ProcedureSummary',
  props: ['viewOnly', 'VisitId', 'Form', 'VisitType', 'formId'],
  mixins: [MixinMasterData, MixinForm],
  components: { VDateTimePicker, Logs, DropFiles, Painting, ViewToPrintSurgeryAndProcedureSummary, SurgeryCertificatePrice },
  data () {
    return {
      dataDropfile: {},
      DataSubmit: null,
      loaded: false,
      IsLocked: false,
      user: {},
      popupTitle: '',
      VisitTypeGroupCode: 'OPD',
      tab: 'tab1',
      ListPositionAndNumber: [
        {
          Position: '',
          Number: ''
        }
      ],
      errorLists: [],
      enableEdit: false,
      enableConfirm: true,
      SurgeryCertificateId: '',
      DataOfSurgeryCertificate: {},
      GENDER: GENDER,
      CustomerAddress: ''
    }
  },
  watch: {
    formId () {
      this.getData()
    }
  },
  computed: {
    isConfirmed: function () {
      return (
        this.viewOnly ||
        (this.DataSubmit.ProcedureTime ||
        this.DataSubmit.HeadOfDepartmentTime ||
        this.DataSubmit.DirectorTime) ||
        this.DataSubmit.IsLocked ||
        !this.enableEdit
      )
    },
    _ItemId: function () {
      return this.formId || this.$route.params.Item
    },
    CreateAtHouse: function () {
      return this.DataOfSurgeryCertificate.NgayRaVien ? this.DataOfSurgeryCertificate.NgayRaVien.split(' ')[0] : null
    },
    CreateAt: function () {
      return this.DataOfSurgeryCertificate.NgayRaVien ? this.DataOfSurgeryCertificate.NgayRaVien.split(' ')[1] : null
    },
    Datas: function () {
      return (this.DataOfSurgeryCertificate.Datas.length || [])
    }
  },
  mounted () {
    console.log('check mounted V2')
    this.getMasterDatas({ Form: 'A01_085_050919_VE' }, () => {
      this.getData()
    })
  },
  methods: {
    openFile () {
      $('#dropzone').click()
    },
    sync () {
      new ProcedureSummary({}, this._VisitType)
        .update('sync/' + this.$route.params.Id, {})
        .then(response => {
          if (response) this.MASTERDATA['EIOPS11'].Items[0].Value = response
        })
    },
    getData () {
      this.loaded = false
      if (this._VisitType === 'IPD') {
        if (this.hasRole('IPRSU5') || this.hasRole('IPRSU1')) {
          this.enableEdit = true
        } else {
          this.enableEdit = false
        }

        if (this.hasRole('IPRSU4')) {
          this.enableConfirm = true
        } else {
          this.enableConfirm = false
        }
      } else if (this._VisitType === 'ED') {
        if (this.hasRole('EPRSU1') || this.hasRole('EPRSU4')) {
          this.enableEdit = true
        }

        if (this.hasRole('EPRSU4') || this.hasRole('EPRSU5')) {
          this.enableConfirm = true
        } else {
          this.enableConfirm = false
        }
      } else if (this._VisitType === 'EOC') {
        if (this.hasRole('EOCPRS01') || this.hasRole('EOCPRS04')) {
          this.enableEdit = true
        }

        if (this.hasRole('EOCPRS05')) {
          this.enableConfirm = true
        } else {
          this.enableConfirm = false
        }
      } else {
        if (this.hasRole('OPRSU4') || this.hasRole('OPRSU1')) {
          this.enableEdit = true
        } else {
          this.enableEdit = false
        }

        if (this.hasRole('OPRSU5')) {
          this.enableConfirm = true
        } else {
          this.enableConfirm = false
        }
      }

      new ProcedureSummary({}, this._VisitType)
        .find(this._ItemId + '?hidemsg=' + true)
        .then(response => {
          console.log('rrr', response)
          this.dataDropfile = {
            ...this.dataDropfile,
            contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
            titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
            visittypeImg: this._VisitType,
            visitidImg: this._VisitId,
            formidImg: this.$route.params.Item
          }
          this.IsLocked = response.IsLocked
          // this.IsLocked = true
          if (this.IsLocked) {
            this.enableConfirm = false
          }
          this.DataSubmit = response
          this.SurgeryCertificateId = response.SurgeryCertificateId
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(this.DataSubmit.Datas, { Code: code })
                if (exited) {
                  if (
                    this.checkString(item.DataType, 'CheckBox') ||
                    this.checkString(item.DataType, 'Radio')
                  ) {
                    var isTrue = exited.Value === 'True'
                    item.Value = isTrue
                  } else if (exited.Value && item.Code === 'EIOPS25' && !this.isConfirmed) {
                    item.Value = this.string2Moment(exited.Value)
                  } else if (exited.Value && item.Code === 'EIOPS30') {
                    item.Value = (this.JSONParse(exited.Value, true) || [])
                  } else if (exited.Value && item.Code === 'EIOPS52') {
                    this.ListPositionAndNumber = this.JSONParse(exited.Value, true)
                  } else if (exited.Value && item.Code === 'EIOPS60') {
                    if (exited.Value !== '') {
                      item.Value = this.JSONParse(exited.Value, true)
                    }
                  } else if (exited.Value && item.Code === 'EIOPS62') {
                    item.Value = (this.JSONParse(exited.Value, true) || [])
                  } else if (exited.Value && item.Code === 'EIOPS26') {
                    item.Value = this.string2Moment(exited.Value)
                  } else {
                    item.Value = exited.Value
                  }
                } else {
                  if (item.Code === 'EIOPS26' && item.Value === '') {
                    item.Value = moment().format('HH:mm DD/MM/YYYY')
                  }

                  if (item.Code === 'EIOPS60') {
                    item.Value = []
                  }
                  if (item.Code === 'EIOPS62') {
                    item.Value = []
                  }
                }
              })
            }
          }

          if (this.MASTERDATA['EIOPS49'].Items[1].Value) {
            this.ListPositionAndNumber = [
              {
                Position: '',
                Number: ''
              }
            ]
          }
          if (!this.MASTERDATA['EIOPS49'].Items[0].Value && !this.MASTERDATA['EIOPS49'].Items[1].Value) {
            this.ListPositionAndNumber = [
              {
                Position: '',
                Number: ''
              }
            ]
          }
          setTimeout(() => {
            this.loaded = true
            this.edited = false
          }, 500)

          this.GetListAllProcedureSummary()
        })
        .catch(e => {
          if (this.$route.query.open) this.confirmPopup()
          this.edited = false
          this.loaded = true
          if (e.status === 404) {
          }
        })
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    async confirm () {
      if (!this.isConfirmed) {
        await this.save(true)
      }
      new ProcedureSummary({}, this._VisitType)
        .update('Confirm/' + this._ItemId, this.user)
        .then(response => {
          // this.toastedSuccess()
          this.reload()
          this.$modal.hide('doctorConfirm')
        })
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this._ItemId, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    async save (hiddenMessage) {
      var obj = {}
      // NProgress.start()
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (
              item.Code === 'EIOPS25' &&
              typeof item.Value === 'object'
            ) {
              val = this.moment2String(item.Value) || ''
            }
            if (item.Code === 'EIOPS04') {
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'EIOPS30') {
              val = JSON.stringify(item.Value) || '[]'
            }
            if (item.Code === 'EIOPS52') {
              var stringPositionAndNumber = JSON.stringify(this.ListPositionAndNumber)
              val = stringPositionAndNumber
            }

            if (item.Code === 'EIOPS60' || item.Code === 'EIOPS62') {
              val = JSON.stringify(item.Value)
            }

            if (item.Code === 'EIOPS26') {
              val = this.moment2String(item.Value) || ''
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

      let yes = this.DataSubmit.Datas.find(e => e.Code === 'EIOPS50').Value
      let no = this.DataSubmit.Datas.find(e => e.Code === 'EIOPS51').Value

      if (!yes && !no) {
        this.errorLists = []
      } else if (yes) {
        this.errorLists = []
        for (let index = 0; index < this.ListPositionAndNumber.length; index++) {
          if (this.ListPositionAndNumber[index].Position === '') {
            this.errorLists.push({
              Code: '',
              ViName: 'Vị trí',
              EnName: 'Position',
              Value: '',
              Order: 1
            })
          }

          if (this.ListPositionAndNumber[index].Number === '') {
            this.errorLists.push({
              Code: '',
              ViName: 'Số lượng',
              EnName: 'Number',
              Value: '',
              Order: 1
            })
          }
        }
      } else if (no) {
        this.errorLists = []
      }

      var hasErr = 'Lỗi'
      if (this.errorLists.length > 0) {
        this.errors = this.errorLists
        this.$modal.show('DialogError', {
          title: this.__t('Các thông tin còn thiếu'),
          text: this.__t('Bác sĩ/ Điều dưỡng vui lòng nhập đầy đủ thông tin để  hoàn thành'),
          errors: this.errorLists
        })
        this.errorLists.forEach(item => {
          $('#' + item.Code).addClass('error')
          $('#' + item.Code).on('keydown keyup click', (e) => {
            $('#' + item.Code).removeClass('error')
          })
        })
        throw hasErr
      } else {
        NProgress.start()
        await new Promise(resolve =>
          setTimeout(async () => {
            await new ProcedureSummary({}, this._VisitType)
              .update(this._ItemId, this.DataSubmit)
              .then(response => {
                if (!hiddenMessage) {
                  this.toastedSuccess()
                  // .getData()
                }
                this.edited = false
                resolve(true)
                this.reload()
              })
              .catch(e => {
                // this._401ResponseError(e)
              })
          }, 100)
        )
      }
      var arr = this.MASTERDATA['EIOPS29'].Items[0].Value ? this.MASTERDATA['EIOPS29'].Items[0].Value : []
      this.removedFile(arr)
    },
    async create () {
      new ProcedureSummary({}, this._VisitType)
        .update(this._ItemId, {}, 'Create/')
        .then(response => {
          if (this.$route.query.open) {
            this.$router.replace({ query: null })
          } else {
            this.reload()
          }
        })
        .catch(e => {
          // this.back()
        })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới tóm tắt phẫu thuật/thủ thuật'),
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
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    handleAddMember () {
      var newItem = {
        Position: '',
        Number: ''
      }
      this.ListPositionAndNumber.push(newItem)
    },
    handleDelete (index) {
      this.ListPositionAndNumber.splice(index, 1)
    },
    icdBeforeSurgeryChange (value) {
      var val = (value || []).map(e => e.ViName)
      var test = val.join(', ') + ','
      this.MASTERDATA['EIOPS11'].Items[0].Value = test
    },
    icdAfterSurgeryChange (value) {
      var val = (value || []).map(e => e.ViName)
      this.MASTERDATA['EIOPS09'].Items[0].Value += val.join(', ') + ', '
    },
    print () {
      this.$htmlToPaperWithFooter('printMe', '', 'A01_085_050919_VE')
    },
    handleNoDrain () {
      if (this.ListPositionAndNumber[0].Position === '') {
        this.isNoDrain = true
        this.ListPositionAndNumber = [
          {
            Position: '',
            Number: ''
          }
        ]
      }
    },
    icdChange (value, code) {
      var val = (value || []).map(e => e.ViName)
      switch (code) {
        case 'EIOPS60':
          var currentValueEIOPS60 = this.MASTERDATA['EIOPS11'].Items[0].Value || ''
          this.MASTERDATA['EIOPS11'].Items[0].Value = ([currentValueEIOPS60].concat(val.filter(e => !currentValueEIOPS60.includes(e)))).filter(e => e).join(', ')
          break
        case 'EIOPS62':
          var currentValueEIOPS62 = this.MASTERDATA['EIOPS09'].Items[0].Value || ''
          this.MASTERDATA['EIOPS09'].Items[0].Value = ([currentValueEIOPS62].concat(val.filter(e => !currentValueEIOPS62.includes(e)))).filter(e => e).join(', ')
          break
        default:
          break
      }
    },
    backButton () {
      if (this.edited) {
        this.$modal.show('dialog', {
          title: this.__t('Cảnh báo'),
          text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: this.__t('Đồng ý'),
              class: 'btn',
              handler: () => {
                this.$emit('closed')
                this.$modal.hide('MasterDataPopup')
                this.$modal.hide('dialog')
                this.getLastHistory()
              }
            },
            {
              title: this.__t('Hủy bỏ'),
              class: 'btn bg-yellow',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
        })
      } else {
        this.getLastHistory()
      }
    },
    printCertificate () {
      this.$modal.show('printCertificate')
    },
    GetListAllProcedureSummary () {
      if (this.SurgeryCertificateId) {
        new GetSurgeryCertificate().find('DetailById/' + this._VisitId + '/' + this.SurgeryCertificateId + '?hidemsg=' + true).then((res) => {
          // this.DataAllList = res
          this.DataOfSurgeryCertificate = res
          this.CustomerAddress = `${res.CustomerInfo.MOHAddress || ''}${res.CustomerInfo.MOHAddress && res.CustomerInfo.MOHDistrict ? ',' : ''} ${res.CustomerInfo.MOHDistrict || ''}${res.CustomerInfo.MOHDistrict && res.CustomerInfo.MOHProvince ? ',' : ''} ${res.CustomerInfo.MOHProvince || ''}`
        }).catch(e => {
          // this.back()
        })
      }
    },
    printSurgeryCertificate () {
      this.$htmlToPaper3('SurgeryCertificate', false, 'A01_151_050919_VE')
    },
    getName (nameInfo) {
      let name = nameInfo
      if (nameInfo && nameInfo.split(' (').length) {
        name = nameInfo.split(' (')[0]
      }
      return name
    },
    copyChanDoanTruocPhauThuat () {
      this.MASTERDATA['EIOPS61'].Items[0].Value = this.MASTERDATA['EIOPS59'].Items[0].Value
      this.MASTERDATA['EIOPS09'].Items[0].Value = this.MASTERDATA['EIOPS11'].Items[0].Value
    },
    getDiagnosisSC (Diagnosis) {
      let str = Diagnosis
      if (Diagnosis && Diagnosis.includes('()')) {
        str = ''
      }
      return str
    }
  }
}
</script>
