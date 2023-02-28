<template>
  <div class="main-content" id="ProcedureSummaryPage">
    <div v-if="loaded">
      <template v-if="DataSubmit">
        <div class="box-body-bordered">
          <!-- Ngày. giờ phẫu thuật -->
          <div class="row" v-if="MASTERDATA['SAPSNEW1']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{ __t(__label(MASTERDATA['SAPSNEW1'])) }}</label>
                <div
                :data="item"
                :key="index"
                v-for="(item, index) in MASTERDATA['SAPSNEW1'].Items"
                >
                  <p v-if="isConfirmed">{{ item.Value | formatDateTime('HH:mm DD/MM/YYYY') }}</p>
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
          <div class="row" v-if="MASTERDATA['SAPSNEW3']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{ __t(__label(MASTERDATA["SAPSNEW3"])) }}</label>
                <icd10 v-if="MASTERDATA['SAPSNEW3']" class="mrb10" :mdCode="'SAPSNEW4'" :readonly="isConfirmed" @icdChange="icdChange" v-model="MASTERDATA['SAPSNEW3'].Items[0].Value" />
              </div>
            </div>
          </div>
          <!-- Chẩn đoán trước phẫu thuật -->
          <div class="row" v-if="MASTERDATA['SAPSNEW5']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{ __t(__label(MASTERDATA["SAPSNEW5"])) }}
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
                  v-for="(item, index) in MASTERDATA['SAPSNEW5'].Items"
                >
                  <!-- <icd10 class="mrb10" v-if="item.Code === 'EIOPS63'" :mdCode="'EIOPS63'" :readonly="isConfirmed" @icdChange="icdChange" /> -->
                  <textarea-autosize v-if="item.Code === 'SAPSNEW6'"
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
          <div class="row" v-if="MASTERDATA['SAPSNEW7']">
            <div class="col-md-12">
              <button class="btn btn-sync-data pull-right" v-if="!viewOnly && isConfirmed === false"  @click="copyChanDoanTruocPhauThuat()">{{__t2('Tham khảo chẩn đoán trước phẫu thuật')}}</button>
              <div class="form-group">
                <label>{{ __t(__label(MASTERDATA["SAPSNEW7"])) }}</label>
                <icd10 v-if="MASTERDATA['SAPSNEW7']" class="mrb10" :mdCode="'SAPSNEW8'" :readonly="isConfirmed" @icdChange="icdChange" v-model="MASTERDATA['SAPSNEW7'].Items[0].Value" />
              </div>
            </div>
          </div>
          <!-- Chẩn đoán sau phẫu thuật -->
          <div class="row" v-if="MASTERDATA['SAPSNEW9']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{ __t(__label(MASTERDATA["SAPSNEW9"])) }}</label>
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['SAPSNEW9'].Items"
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
          <div class="row" v-if="MASTERDATA['SAPSNEW11']">
            <div class="col-md-12">
              <div class="form-group">
                <label
                  >{{ __t(__label(MASTERDATA["SAPSNEW11"])) }}</label
                >
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['SAPSNEW11'].Items"
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
          <div class="row" v-if="MASTERDATA['SAPSNEW13']">
            <div class="col-md-12">
              <div class="form-group flex-box" style="float: left">
                <label style="margin: auto; margin-right: 20px;">{{ __t(__label(MASTERDATA["SAPSNEW13"])) }}</label>
                <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['SAPSNEW13'].Items">
                  <div class="btn-action radio-left">
                    <MDRadio
                      v-if="!isConfirmed"
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['SAPSNEW13']"
                    />
                    <MDRadio
                      v-else
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['SAPSNEW13']"
                      style="pointer-events: none;"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Phân loại vết mổ -->
          <div class="row" v-if="MASTERDATA['SAPSNEW19']">
            <div class="col-md-12">
              <div class="form-group flex-box" style="float: left">
                <label style="margin: auto; margin-right: 20px;">{{ __t(__label(MASTERDATA["SAPSNEW19"])) }}
                  <!-- <i class="unit-label">{{MASTERDATA["EIOPS36"].EnName}}:</i> -->
                </label>
                <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['SAPSNEW19'].Items">
                  <div class="btn-action radio-left">
                    <MDRadio
                      v-if="!isConfirmed"
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['SAPSNEW19']"
                    />
                    <MDRadio
                      v-else
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['SAPSNEW19']"
                      style="pointer-events: none;"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Phương pháp vô cảm -->
          <div class="row" v-if="MASTERDATA['SAPSNEW25']">
            <div class="col-md-12">
              <div class="form-group">
                <label
                  >{{ __t(__label(MASTERDATA["SAPSNEW25"])) }}</label
                >
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['SAPSNEW25'].Items"
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
          <div class="row" v-if="MASTERDATA['SAPSNEW27']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{ __t(__label(MASTERDATA["SAPSNEW27"])) }}</label>
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['SAPSNEW27'].Items"
                >
                  <UserAdV4 :readonly="isConfirmed" v-model="item.Value" ref="userAd" :placeholder="__t(__label(item))"></UserAdV4>
                  <!-- <user-auto-suggest
                    :position="'ALL'"
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  /> -->
                  <!-- <user-ad :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" v-model="item.Value" :placeholder="__t('Bác sĩ')"/> -->
                </div>
              </div>
            </div>
          </div>
          <!-- Phẫu thuật viên phụ -->
          <div class="row" v-if="MASTERDATA['SAPSNEW29']">
            <div class="col-md-12">
              <div class="form-group">
                <label
                  >{{ __label(MASTERDATA["SAPSNEW29"]) }}</label
                >
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['SAPSNEW29'].Items"
                >
                  <!-- <user-auto-suggest
                    :position="'ALL'"
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  /> -->
                  <!-- <UserAdV3 :readonly="isConfirmed" v-model="item.Value" ref="userAd" :placeholder="__t(__label(item))"></UserAdV3> -->
                  <UserAdV4 :readonly="isConfirmed" v-model="item.Value" ref="userAd" :placeholder="__t(__label(item))"></UserAdV4>
                </div>
              </div>
            </div>
          </div>
          <!-- Bác sĩ gây mê hồi sức -->
          <div class="row" v-if="MASTERDATA['SAPSNEW31']">
            <div class="col-md-12">
              <div class="form-group">
                <label
                  >{{ __label(MASTERDATA["SAPSNEW31"]) }}</label
                >
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['SAPSNEW31'].Items"
                >
                  <UserAdV4 :readonly="isConfirmed" v-model="item.Value" ref="userAd" :placeholder="__t(__label(item))"></UserAdV4>
                  <!-- <user-auto-suggest
                    :position="'ALL'"
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  /> -->
                </div>
              </div>
            </div>
          </div>
          <!-- Điều dưỡng phụ mê -->
          <div class="row" v-if="MASTERDATA['SAPSNEW33']">
            <div class="col-md-12">
              <div class="form-group">
                <label
                  >{{ __label(MASTERDATA["SAPSNEW33"]) }}</label
                >
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['SAPSNEW33'].Items"
                >
                  <UserAdV4 :readonly="isConfirmed" v-model="item.Value" ref="userAd" :placeholder="__t(__label(item))"></UserAdV4>
                  <!-- <user-auto-suggest
                    :position="'ALL'"
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  /> -->
                </div>
              </div>
            </div>
          </div>
          <!-- Điều dưỡng dụng cụ -->
          <div class="row" v-if="MASTERDATA['SAPSNEW35']">
            <div class="col-md-12">
              <div class="form-group">
                <label
                  >{{ __label(MASTERDATA["SAPSNEW35"]) }}</label
                >
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['SAPSNEW35'].Items"
                >
                  <UserAdV4 :readonly="isConfirmed" v-model="item.Value" ref="userAd" :placeholder="__t(__label(item))"></UserAdV4>
                  <!-- <user-auto-suggest
                    :position="'ALL'"
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  /> -->
                </div>
              </div>
            </div>
          </div>
          <!-- Điều dưỡng chạy ngoài -->
          <div class="row" v-if="MASTERDATA['SAPSNEW37']">
            <div class="col-md-12">
              <div class="form-group">
                <label
                  >{{ __label(MASTERDATA["SAPSNEW37"]) }}</label
                >
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['SAPSNEW37'].Items"
                >
                  <UserAdV4 :readonly="isConfirmed" v-model="item.Value" ref="userAd" :placeholder="__t(__label(item))"></UserAdV4>
                  <!-- <user-auto-suggest
                    :position="'ALL'"
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                  /> -->
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
                <div class="pomc-upload-area mb-10" v-if="MASTERDATA['SAPSNEW39']">
                  <div class="row" v-if="isConfirmed">
                    <div class="col-md-12 col-sm-12">
                      <drop-files
                        id="mini-upload"
                        :readonly="true"
                        v-model="MASTERDATA['SAPSNEW39'].Items[0].Value"
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
                        v-model="MASTERDATA['SAPSNEW39'].Items[0].Value"
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
                  <div class="EDARRPAMAPALO-BG" v-if="MASTERDATA['SAPSNEW41']">
                    <img
                      src="static/tivi-bg.png"
                      style="width: 950px;opacity: 0.4;"
                    />
                    <div class="paint-content">
                      <Painting
                        :readonly="isConfirmed"
                        v-model="MASTERDATA['SAPSNEW41'].Items[0].Value"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Dẫn lưu -->
          <div class="row" style="margin-top: 20px;" v-if="MASTERDATA['SAPSNEW43']">
            <div class="col-md-12">
              <div class="form-group flex-box" style="float: left">
                <label style="margin: auto; margin-right: 20px;">{{ __t(__label(MASTERDATA["SAPSNEW43"])) }}</label>
                <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['SAPSNEW43'].Items">
                  <div class="btn-action radio-left" >
                    <MDRadio
                      v-if="!isConfirmed"
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['SAPSNEW43']"
                      @onChange="handleNoDrain()"
                    />
                    <MDRadio
                      v-else
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['SAPSNEW43']"
                      style="pointer-events: none;"
                    />
                  </div>
                </div>
                <button :readonly="isConfirmed" v-if="MASTERDATA['SAPSNEW43'].Items[0].Value && !isConfirmed" @click="handleAddMember" class="btn-add mrt10" style="margin: auto !important;">{{__t("Thêm Vị trí - Số lượng")}}</button>
              </div>
            </div>
          </div>
          <div class="row" v-if="MASTERDATA['SAPSNEW43'].Items[0].Value">
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
                <label>{{__label(MASTERDATA['SAPSNEW47'])}}</label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['SAPSNEW47'].Items">
                  <div class="fake-input disable" v-if="isConfirmed">{{item.Value}}</div>
                  <template v-else>
                    <input :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" :placeholder="__label(item)" v-model="item.Value"/>
                  </template>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group">
                <label>{{__label(MASTERDATA['SAPSNEW49'])}}</label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['SAPSNEW49'].Items">
                  <div class="fake-input disable" v-if="isConfirmed">{{item.Value}}</div>
                  <template v-else>
                    <input :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" :placeholder="__label(item)" v-model="item.Value"/>
                  </template>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group">
                <label>{{__label(MASTERDATA['SAPSNEW51'])}}</label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['SAPSNEW51'].Items">
                  <div class="fake-input disable" v-if="isConfirmed">{{item.Value}}</div>
                  <template v-else>
                    <input :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" :placeholder="__label(item)" v-model="item.Value"/>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <!-- Khác -->
          <div class="row" v-if="MASTERDATA['SAPSNEW53']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__label(MASTERDATA['SAPSNEW53'])}}</label>
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['SAPSNEW53'].Items"
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
          <h4 v-if="MASTERDATA['SAPSNEW55']">
            <b style="display: flex; align-items: center; justify-content: center;">{{ __label(MASTERDATA["SAPSNEW55"]) }}</b>
          </h4>
          <div class="row" v-if="MASTERDATA['SAPSNEW55']">
            <div class="col-md-12">
              <div class="form-group">
                <div
                  :data="item"
                  :key="index"
                  v-for="(item, index) in MASTERDATA['SAPSNEW55'].Items"
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
          <!-- Các biến chứng hoặc các diễn biến bất thường ngoài dự kiến trong quá trình phẫu thuật -->
          <div class="row" v-if="MASTERDATA['SAPSNEW57']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__label(MASTERDATA['SAPSNEW57'])}}</label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['SAPSNEW57'].Items">
                  <textarea-autosize :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                </div>
              </div>
            </div>
          </div>
          <!-- Chi tiết công cụ dụng cụ cấy ghép trên người bệnh (nếu có) -->
          <!-- Test -->
          <div class="row" style="margin-top: 20px;" v-if="MASTERDATA['SAPSNEW59']">
            <div class="col-md-12">
              <div class="form-group flex-box" style="float: left">
                <label style="margin: auto; margin-right: 20px;">{{ __t(__label(MASTERDATA["SAPSNEW59"])) }}</label>
                <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['SAPSNEW59'].Items">
                  <div class="btn-action radio-left" >
                    <MDRadio
                      v-if="!isConfirmed && ListTable.length === 0"
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['SAPSNEW59']"
                      @onChange="handleNoTable()"
                    />
                    <!-- <MDRadio
                      v-else-if="ListTable.length > 0"
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['SAPSNEW59']"
                      style="pointer-events: none;"
                    /> -->
                    <MDRadio
                      v-else
                      :noFlex="true"
                      :indexs="[index]"
                      v-model="MASTERDATA['SAPSNEW59']"
                      style="pointer-events: none;"
                    />
                  </div>
                </div>
                <!-- <button :readonly="isConfirmed" v-if="MASTERDATA['SAPSNEW59'].Items[1].Value && !isConfirmed" @click="handleAddMember" class="btn-add mrt10" style="margin: auto !important;">{{__t("Thêm Vị trí - Số lượng")}}</button> -->
                <!-- <button :readonly="isConfirmed" v-if="!MASTERDATA['SAPSNEW59'].Items[1].Value" @click="handleAddTable" class="btn-add mrt10" style="margin: auto !important;">{{__t("Thêm")}}</button> -->
              </div>
            </div>
          </div>
          <!-- End Test -->
          <div class="row" v-if="!MASTERDATA['SAPSNEW59'].Items[1].Value">
            <div class="col-md-12">
              <div class="form-group">
                <table class="standing-order-tbl" style="border-collapse: collapse;">
                  <tr>
                    <th style="text-align: center" class="bg-head" width="5%">{{__label(MASTERDATA['SAPSNEW63'])}}</th>
                    <th style="text-align: center" class="bg-head" width="25%">{{__label(MASTERDATA['SAPSNEW64'])}}</th>
                    <th style="text-align: center" class="bg-head" width="10%">{{__label(MASTERDATA['SAPSNEW65'])}}</th>
                    <th style="text-align: center" class="bg-head" width="15%">{{__label(MASTERDATA['SAPSNEW66'])}}</th>
                    <th style="text-align: center" class="bg-head" width="15%">{{__label(MASTERDATA['SAPSNEW67'])}}</th>
                    <th style="text-align: center" class="bg-head" width="25%">{{__label(MASTERDATA['SAPSNEW68'])}}</th>
                    <!-- <th style="text-align: center; border-top: none;" class="bg-head" width="5%" v-if="!isConfirmed"></th> -->
                  </tr>
                  <tr v-if="ListTable.length === 0">
                    <td colspan="7" class="text-center hide-counter">{{__t('Chưa có thông tin')}}</td>
                  </tr>
                  <tr v-else :data="item" :key="index" v-for="(item, index) in ListTable">
                    <td style="text-align: center">{{index+1}}</td>
                    <td>
                      <textarea-autosize :readonly="isConfirmed" class="form-control" :placeholder="__t('Nhập')" v-model="item.ImplantType" required/>
                    </td>
                    <td>
                      <!-- <input type="number" :readonly="isConfirmed" class="form-control" :placeholder="__t('Nhập')" v-model="item.Quantity" required/> -->
                      <MDNumberInput :readonly="isConfirmed" class="form-control" :decimal="true" v-model="item.Quantity" :placeholder="__t('Nhập')" required/>
                    </td>
                    <td>
                      <!-- <input type="number" :readonly="isConfirmed" class="form-control" :placeholder="__t('Nhập')" v-model="item.Size" required/> -->
                      <MDNumberInput :readonly="isConfirmed" class="form-control" :decimal="true" v-model="item.Size" :placeholder="__t('Nhập')" required/>
                    </td>
                    <td>
                      <textarea-autosize :readonly="isConfirmed" class="form-control" :placeholder="__t('Nhập')" v-model="item.Brand" required/>
                    </td>
                    <td style="position: relative;">
                      <textarea-autosize :readonly="isConfirmed" class="form-control" :placeholder="__t('Nhập')" v-model="item.Note" required/>
                      <button v-if="!isConfirmed" :readonly="isConfirmed" class="btn-pos-right1" @click="handleDeleteTable(index)">
                        <i class="fa fa-trash" aria-hidden="true" style="margin: auto"></i>
                      </button>
                    </td>
                    <!-- <td style="text-align: center; position: no-wrap" class="position: relative;" v-if="!isConfirmed">
                      <button  :readonly="isConfirmed" class="btn v-yellow-btn col-md-1 col-sm-1" style="width: 40px; margin-top: 1px;"  @click="handleDeleteTable(index)">
                        <i class="fa fa-trash" aria-hidden="true" style="margin: auto"></i>
                      </button>
                    </td> -->
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <!-- Trường hợp có bảng rồi nhưng không áp dụng nữa -->
          <div class="row" v-else-if="MASTERDATA['SAPSNEW59'].Items[1].Value">
            <div class="col-md-12">
              <div class="form-group">
                <table class="standing-order-tbl">
                  <tr>
                    <th style="text-align: center" class="bg-head" width="5%">{{__label(MASTERDATA['SAPSNEW63'])}}</th>
                    <th style="text-align: center" class="bg-head" width="25%">{{__label(MASTERDATA['SAPSNEW64'])}}</th>
                    <th style="text-align: center" class="bg-head" width="10%">{{__label(MASTERDATA['SAPSNEW65'])}}</th>
                    <th style="text-align: center" class="bg-head" width="15%">{{__label(MASTERDATA['SAPSNEW66'])}}</th>
                    <th style="text-align: center" class="bg-head" width="15%">{{__label(MASTERDATA['SAPSNEW67'])}}</th>
                    <th style="text-align: center" class="bg-head" width="25%">{{__label(MASTERDATA['SAPSNEW68'])}}</th>
                    <!-- <th style="text-align: center" class="bg-head" width="5%"></th> -->
                  </tr>
                  <tr v-if="ListTable.length === 0">
                    <td colspan="7" class="text-center hide-counter">{{__t('Chưa có thông tin')}}</td>
                  </tr>
                  <tr v-else :data="item" :key="index" v-for="(item, index) in ListTable">
                    <td style="text-align: center">{{index+1}}</td>
                    <td>
                      <input :readonly="true" class="form-control" :placeholder="__t('Nhập')" v-model="item.ImplantType" required />
                    </td>
                    <td>
                      <input type="number" :readonly="true" class="form-control" :placeholder="__t('Nhập')" v-model="item.Quantity" required/>
                    </td>
                    <td>
                      <input type="number" :readonly="true" class="form-control" :placeholder="__t('Nhập')" v-model="item.Size" required/>
                    </td>
                    <td>
                      <input :readonly="true" class="form-control" :placeholder="__t('Nhập')" v-model="item.Brand" required/>
                    </td>
                    <td>
                      <textarea-autosize :readonly="true" class="form-control" :placeholder="__t('Nhập')" v-model="item.Note" required/>
                    </td>
                    <td v-if="!isConfirmed" style="text-align: center">
                      <button class="btn v-yellow-btn col-md-1 col-sm-1 " style="width: 40px; margin-top: 1px;"  @click="handleDeleteTable(index)">
                        <i class="fa fa-trash" aria-hidden="true" style="margin: auto"></i>
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div style="text-align: center">
            <button :readonly="isConfirmed" v-if="!MASTERDATA['SAPSNEW59'].Items[1].Value && !isConfirmed" @click="handleAddTable" class="btn-add mrt10" style="margin: auto !important;">{{__t("Thêm")}}</button>
          </div>
          <!-- Chân ký -->
          <div class="row" style="width: 100%; display: flex;">
            <div style="width: 50%;"></div>
            <div style="width: 50%;" class="text-center">
              <template v-if="DataSubmit.ProcedureTime">
                <p class="text-center">{{DataSubmit.ProcedureTime}}</p>
                <eform-signature :ad="DataSubmit.DoctorConfirm.UserName" :title="'Bác sĩ phẫu thuật'" />
              </template>
              <template v-else>
                <p><b>{{__t('Bác sĩ phẫu thuật')}}:</b></p>
                <p><i v-if="isConfirmed">{{__t('Chưa xác nhận')}}</i><button v-else-if="enableConfirm" @click="showDoctorConfirm('Surgeon', 'Bác sĩ phẫu thuật')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
              </template>
            </div>
          </div>
          <!-- In -->
          <div id="printMe" v-show="false" v-if="DataSubmit">
            <ViewToPrintSurgeryAndProcedureSummaryV3 :Data="DataSubmit" />
          </div>
          <!-- FloatBlock -->
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
                    <div class="col-md-2 col-sm-2">
                      <div class="form-group1">
                        <button
                          style="width: 100%;"
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
                    <!-- <div class="col-md-1 col-sm-1" v-if="_VisitType !== 'IPD'"> -->
                      <!-- nothing -->
                    <!-- </div> -->
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
          <!-- FloatBlock else -->
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
          <DoctorConfirm :popupTitle="popupTitle" :TypeConfirm="TypeConfirm" @popupSave="confirm"/>
        </div>
      </template>
    </div>
    <div v-else class="loading-text"><v-loading /></div>
    <modal name="printCertificate" transition="pop-out" height="auto" :clickToClose="true" width="1000px" v-if="DataOfSurgeryCertificate.Datas">
      <div style="margin: 20px 0px;" class="text-center">
        <!-- <button class="btn v-yellow-btn btn-block" style="width: 100px; display: initial;" @click="printSurgeryCertificate()"><i class="fa fa-print" aria-hidden="true"></i>{{__t('In')}}</button> -->
      </div>
      <div class="main-content" id="SurgeryCertificate" v-if="DataOfSurgeryCertificate">
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
          <p v-if="DataOfSurgeryCertificate" style="margin-bottom: 10px;"><b style="display: inline;">Ngày phẫu thuật/</b>Surgery Date: {{data1.Value ? DataOfSurgeryCertificate.Datas.find(e => e.Code === 'IPDSURCER04').Value : ''}}</p>
          <p v-if="DataOfSurgeryCertificate.Datas" style="margin-bottom: 10px;"><b style="display: inline;">Chẩn đoán trước mổ/</b>Preoperative diagnosis: {{data2.Value ? getDiagnosisSC(DataOfSurgeryCertificate.Datas.find(e => e.Code === 'IPDSURCER08').Value) : ''}}</p>
          <p v-if="DataOfSurgeryCertificate.Datas" style="margin-bottom: 10px;"><b style="display: inline;">Chẩn đoán sau mổ/</b>Postoperative diagnosis: {{data3.Value ? getDiagnosisSC(DataOfSurgeryCertificate.Datas.find(e => e.Code === 'IPDSURCER22').Value) : ''}}</p>
          <p v-if="DataOfSurgeryCertificate.Datas" style="margin-bottom: 10px;"><b style="display: inline;">Phương pháp phẫu thuật/</b>Procedure performed: {{data4.Value ? DataOfSurgeryCertificate.Datas.find(e => e.Code === 'IPDSURCER14').Value : ''}}</p>
          <p v-if="DataOfSurgeryCertificate.Datas" style="margin-bottom: 10px;"><b style="display: inline;">Phương pháp vô cảm/</b>Method of anesthesia: {{data5.Value ? DataOfSurgeryCertificate.Datas.find(e => e.Code === 'IPDSURCER16').Value : ''}}</p>
          <p v-if="DataOfSurgeryCertificate.Datas" style="margin-bottom: 10px;"><b style="display: inline;">Phẫu thuật viên/</b>Surgeon's name: <GetUsers :listUser="getName(MASTERDATA['SAPSNEW27'].Items[0].Value)"></GetUsers></p>
          <!-- <p v-if="DataOfSurgeryCertificate.Datas" style="margin-bottom: 10px;"><b style="display: inline;">Phẫu thuật viên/</b>Surgeon's name: {{data6.Value ? getName(DataOfSurgeryCertificate.Datas.find(e => e.Code === 'IPDSURCER18').Value) : ''}}</p> -->
          <p v-if="DataOfSurgeryCertificate.Datas" style="margin-bottom: 10px;"><b style="display: inline;">Bác sĩ gây mê/</b>Anesthetist: <GetUsers :listUser="getName(MASTERDATA['SAPSNEW31'].Items[0].Value)"></GetUsers></p>
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
    <p>A01_085_120522_VE</p>
    <div v-if="hiddenLog">
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="timeLog" :ad="timeLog[1]" /> {{__t('lúc')}} {{ timeLog[0] }}</p>
    </div>
    <logs
      v-if="!viewOnly"
      :EdId="this._ItemId"
      :Type="_VisitType + '/SurgeryAndProcedureSummary'"
    />
  </div>
</template>

<script>
// import DoctorConfirm from '@/components/IPD/ForNeonatalMaternity/PopupDoctorConfirm.vue'
import UserAdV3 from '../../components/global/UserAdV3.vue'
import UserAdV4 from '../../components/global/UserAdV4.vue'
import DoctorConfirm from './popup/DoctorConfirm.vue'
import ViewToPrintSurgeryAndProcedureSummaryV3 from './PrintV3.vue'
import SurgeryAndProcedureSummaryV3 from '@/services/SurgeryAndProcedureSummaryV3'
// import ProcedureSummary from '@/services/ProcedureSummary'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import $ from 'jquery'
import _ from 'lodash'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import Logs from '@/components/Logs.vue'
// import _ from 'lodash'
// import moment from 'moment'
import SurgeryCertificatePrice from '../IPD/SurgeryCertificate/price/SurgeryCertificatePrice.vue'
// import GetSurgeryCertificate from '@/services/IPD/SurgeryCertificate/GetSurgeryCertificate'
import SurgeryCertificateV3 from '@/services/IPD/SurgeryCertificate/SurgeryCertificateV3'
import NProgress from 'nprogress'
import DropFiles from '@/components/DropFiles.vue'
import Painting from '@/components/Painting.vue'
import moment from 'moment'
import constants from '@/constants'
import GetUsers from '../../components/global/GetUsers.vue'
import UploadFileService from '@/services/IPD/UploadFileService'
const GENDER = constants.GENDER
export default {
  name: 'SurgeryAndProcedureSummary',
  props: ['viewOnly', 'VisitId', 'Form', 'VisitType', 'formId'],
  mixins: [MixinMasterData, MixinForm],
  components: { VDateTimePicker, Logs, DropFiles, Painting, UserAdV3, UserAdV4, ViewToPrintSurgeryAndProcedureSummaryV3, DoctorConfirm, SurgeryCertificatePrice, GetUsers },
  data () {
    return {
      dataDropfile: {},
      hiddenLog: true,
      timeLog: [],
      DataSubmit: null,
      loaded: false,
      IsLocked: false,
      user: {},
      popupTitle: '',
      TypeConfirm: '',
      VisitTypeGroupCode: 'OPD',
      tab: 'tab1',
      ListPositionAndNumber: [
        {
          Position: '',
          Number: ''
        }
      ],
      ListTable: [],
      errorLists: [],
      enableEdit: false,
      enableConfirm: true,
      SurgeryCertificateId: '',
      DataOfSurgeryCertificate: {},
      CustomerAddress: '',
      HaveTable: false,
      GENDER: GENDER,
      checkConfirm: false,
      data1: '',
      data2: '',
      data3: '',
      data4: '',
      data5: '',
      data6: '',
      data7: ''
    }
  },
  mounted () {
    this.getMasterDatas({ Form: 'A01_085_120522_VE' }, () => {
      this.getData()
    })
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
        this.IsLocked ||
        this.DataSubmit.DoctorConfirm.UserName ||
        !this.enableEdit
        // false
        // true
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
  methods: {
    // getUsernameFromString (str) {
    //   if (!str) return ''
    //   var sttt = str.substring(
    //     str.indexOf('(') + 1,
    //     str.indexOf(')')
    //   )
    //   return sttt || str
    // },
    getTimeLog (val1, val2) {
      this.timeLog = [val1, val2]
    },
    setHiddenLog () {
      this.hiddenLog = true
    },
    openFile () {
      $('#dropzone').click()
    },
    sync () {
      new SurgeryAndProcedureSummaryV3({}, this._VisitType)
        .update('Sync/' + this.$route.params.Id, {})
        .then(response => {
          if (response) this.MASTERDATA['SAPSNEW5'].Items[0].Value = response
        })
    },
    getData () {
      this.loaded = false
      if (this._VisitType === 'IPD') {
        if (this.hasRole('IPDSAPSV3C') || this.hasRole('IPDSAPSV3U')) {
          this.enableEdit = true
        } else {
          this.enableEdit = false
        }

        if (this.hasRole('IPDSAPSV3CF')) {
          this.enableConfirm = true
        } else {
          this.enableConfirm = false
        }
      } else if (this._VisitType === 'ED') {
        if (this.hasRole('EDSAPSV3C') || this.hasRole('EDSAPSV3U')) {
          this.enableEdit = true
        }

        if (this.hasRole('EDSAPSV3CF')) {
          this.enableConfirm = true
        } else {
          this.enableConfirm = false
        }
      } else if (this._VisitType === 'EOC') {
        if (this.hasRole('EOCSAPSV3C') || this.hasRole('EOCSAPSV3U')) {
          this.enableEdit = true
        }

        if (this.hasRole('EOCSAPSV3CF')) {
          this.enableConfirm = true
        } else {
          this.enableConfirm = false
        }
      } else {
        if (this.hasRole('OPDSAPSV3C') || this.hasRole('OPDSAPSV3U')) {
          this.enableEdit = true
        } else {
          this.enableEdit = false
        }

        if (this.hasRole('OPDSAPSV3CF')) {
          this.enableConfirm = true
        } else {
          this.enableConfirm = false
        }
      }
      if (this.viewOnly) {
        this.resetMdDataValue()
      }
      new SurgeryAndProcedureSummaryV3({}, this._VisitType).find('GetDetail/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true).then(response => {
        this.IsLocked = response.IsLocked
        console.log('rrr', response)
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: this.$route.params.Item
        }
        if (this.IsLocked) {
          this.enableConfirm = false
        }
        this.timeLog = [moment(response.UpdatedAt).format('HH:mm DD/MM/YYYY'), response.UpdatedBy]
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
                } else if (exited.Value && item.Code === 'SAPSNEW1' && !this.isConfirmed) {
                  item.Value = this.string2Moment(exited.Value)
                } else if (exited.Value && item.Code === 'SAPSNEW40') {
                  item.Value = (this.JSONParse(exited.Value, true) || [])
                } else if (exited.Value && item.Code === 'SAPSNEW46') {
                  this.ListPositionAndNumber = this.JSONParse(exited.Value, true)
                } else if (exited.Value && item.Code === 'SAPSNEW62') {
                  this.ListTable = this.JSONParse(exited.Value, true)
                } else if (exited.Value && item.Code === 'SAPSNEW4') {
                  if (exited.Value !== '') {
                    item.Value = this.JSONParse(exited.Value, true)
                  }
                } else if (exited.Value && item.Code === 'SAPSNEW8') {
                  item.Value = (this.JSONParse(exited.Value, true) || [])
                } else if (exited.Value && ['SAPSNEW28', 'SAPSNEW30', 'SAPSNEW32', 'SAPSNEW34', 'SAPSNEW36', 'SAPSNEW38'].includes(item.Code)) {
                  let data = exited.Value
                  console.log(data + 'x')
                  if (data.includes('[')) {
                    item.Value = (this.JSONParse(exited.Value, true)).map(e => {
                      if (typeof e === 'string') return this.getUsernameFromString(e)
                      return e
                    })
                  } else if (data.includes('(')) {
                    item.Value = this.getUsernameFromString(exited.Value)
                  } else if (!data.includes('[') && !data.includes('(')) {
                    item.Value = (this.JSONParse(exited.Value, true))
                  } else {
                    item.Value = exited.Value
                  }
                  console.log(item.Value + 'x')
                } else if (exited.Value && item.Code === 'SAPSNEW2') {
                  item.Value = this.string2Moment(exited.Value)
                } else {
                  item.Value = exited.Value
                }
              } else {
                if (item.Code === 'SAPSNEW2' && item.Value === '') {
                  item.Value = moment().format('HH:mm DD/MM/YYYY')
                }

                if (item.Code === 'SAPSNEW4') {
                  item.Value = []
                }
                if (item.Code === 'SAPSNEW8') {
                  item.Value = []
                }
                if (item.Code === 'SAPSNEW28') {
                  item.Value = []
                }
                if (item.Code === 'SAPSNEW30') {
                  item.Value = []
                }
                if (item.Code === 'SAPSNEW32') {
                  item.Value = []
                }
                if (item.Code === 'SAPSNEW34') {
                  item.Value = []
                }
                if (item.Code === 'SAPSNEW36') {
                  item.Value = []
                }
                if (item.Code === 'SAPSNEW38') {
                  item.Value = []
                }
              }
            })
          }
        }
        if (this.MASTERDATA['SAPSNEW43'].Items[1].Value) {
          this.ListPositionAndNumber = [
            {
              Position: '',
              Number: ''
            }
          ]
        }
        if (!this.MASTERDATA['SAPSNEW43'].Items[0].Value && !this.MASTERDATA['SAPSNEW43'].Items[1].Value) {
          this.ListPositionAndNumber = [
            {
              Position: '',
              Number: ''
            }
          ]
        }
        this.loaded = true
        setTimeout(() => {
          this.edited = false
        }, 500)
        this.GetListAllProcedureSummary()
        console.log('join here')
      }).catch(e => {
        if (this.$route.query.open) this.confirmPopup()
        this.edited = false
        this.loaded = true
      })
    },
    handleNoTable () {
      if (this.MASTERDATA['SAPSNEW59'].Items[1].Value === true) {
        this.HaveTable = true
      } else {
        this.HaveTable = false
      }
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
    handleAddTable () {
      var newItemTable = {
        No: '',
        ImplantType: '',
        Quantity: '',
        Size: '',
        Brand: '',
        Note: ''
      }
      this.ListTable.push(newItemTable)
    },
    handleDeleteTable (index) {
      this.ListTable.splice(index, 1)
    },
    icdChange (value, code) {
      var val = (value || []).map(e => e.ViName)
      switch (code) {
        case 'SAPSNEW4':
          var currentValueSAPSNEW4 = this.MASTERDATA['SAPSNEW5'].Items[0].Value || ''
          this.MASTERDATA['SAPSNEW5'].Items[0].Value = ([currentValueSAPSNEW4].concat(val.filter(e => !currentValueSAPSNEW4.includes(e)))).filter(e => e).join(', ')
          break
        case 'SAPSNEW8':
          var currentValueSAPSNEW8 = this.MASTERDATA['SAPSNEW9'].Items[0].Value || ''
          this.MASTERDATA['SAPSNEW9'].Items[0].Value = ([currentValueSAPSNEW8].concat(val.filter(e => !currentValueSAPSNEW8.includes(e)))).filter(e => e).join(', ')
          break
      }
    },
    copyChanDoanTruocPhauThuat () {
      this.MASTERDATA['SAPSNEW7'].Items[0].Value = this.MASTERDATA['SAPSNEW3'].Items[0].Value
      this.MASTERDATA['SAPSNEW9'].Items[0].Value = this.MASTERDATA['SAPSNEW5'].Items[0].Value
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirmV3')
    },
    async confirm (data) {
      this.checkConfirm = true
      if (!this.isConfirmed) {
        await this.save(true)
      }
      // new SurgeryAndProcedureSummaryV3({}, this._VisitType).find('GetListItemsByVisitId/' + this._VisitId + '?hidemsg=' + true).then(response => {
      new SurgeryAndProcedureSummaryV3({}, this._VisitType)
        .update('Confirm/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true, data)
        .then(response => {
          this.$modal.hide('doctorConfirmV3')
          // this.toastedSuccess('Xác nhận thành công')
          this.toastedSuccess(this.$t('Xác nhận thành công'))
          this.checkConfirm = false
          setTimeout(() => {
            this.reload()
          }, 500)
          // this.reload()
        })
    },
    print () {
      this.$htmlToPaperWithFooter('printMe', '', 'A01_085_120522_VE')
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
        new SurgeryCertificateV3().find('DetailById/' + this._VisitId + '/' + this.SurgeryCertificateId + '?hidemsg=' + true).then((res) => {
          // this.DataAllList = res
          this.DataOfSurgeryCertificate = res
          this.data1 = res.Datas.find(e => e.Code === 'IPDSURCER04')
          this.data2 = res.Datas.find(e => e.Code === 'IPDSURCER08')
          this.data3 = res.Datas.find(e => e.Code === 'IPDSURCER22')
          this.data4 = res.Datas.find(e => e.Code === 'IPDSURCER14')
          this.data5 = res.Datas.find(e => e.Code === 'IPDSURCER16')
          this.data6 = res.Datas.find(e => e.Code === 'IPDSURCER18')
          this.data7 = res.Datas.find(e => e.Code === 'IPDSURCER20')
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
      console.log(nameInfo, 'check nameInfo')
      // let name = nameInfo
      // if (nameInfo && nameInfo.split(' (').length) {
      //   name = nameInfo.split(' (')[0]
      // }
      console.log(nameInfo, 'check nameinFO')
      if (typeof nameInfo === 'object' || nameInfo.includes('[')) {
        // nameInfo = JSON.parse(nameInfo).map(e => e)
        if (nameInfo) {
          nameInfo = nameInfo.join(',').replace(/ *\([^)]*\) */g, '')
        }
      } else if (typeof nameInfo === 'string' && nameInfo.includes('(')) {
        console.log(nameInfo)
        if (nameInfo && nameInfo.split(' (').length) {
          nameInfo = nameInfo.split(' (')[0]
        }
      } else if (!nameInfo.includes('(') && !nameInfo.includes('[')) {
        nameInfo = nameInfo.substring(2)
      }
      return nameInfo
    },
    getDiagnosisSC (Diagnosis) {
      let str = Diagnosis
      if (Diagnosis && Diagnosis.includes('()')) {
        str = ''
      }
      return str
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this._ItemId, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    async save (hiddenMessage) {
      var arr = this.MASTERDATA['SAPSNEW39'].Items[0].Value ? this.MASTERDATA['SAPSNEW39'].Items[0].Value : []
      this.removedFile(arr)
      var obj = {}
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (
              item.Code === 'SAPSNEW1' &&
              typeof item.Value === 'object'
            ) {
              val = this.moment2String(item.Value) || ''
            }
            if (item.Code === 'SAPSNEW40') {
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'SAPSNEW42') {
              val = JSON.stringify(item.Value) || '[]'
            }
            if (item.Code === 'SAPSNEW46') {
              var stringPositionAndNumber = JSON.stringify(this.ListPositionAndNumber)
              val = stringPositionAndNumber
            }
            if (item.Code === 'SAPSNEW62') {
              var stringTable = JSON.stringify(this.ListTable)
              val = stringTable
            }
            if (item.Code === 'SAPSNEW4' || item.Code === 'SAPSNEW8') {
              val = JSON.stringify(item.Value)
            }
            if (['SAPSNEW28', 'SAPSNEW30', 'SAPSNEW32', 'SAPSNEW34', 'SAPSNEW36', 'SAPSNEW38'].includes(item.Code)) {
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'SAPSNEW2') {
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
      let yes = this.DataSubmit.Datas.find(e => e.Code === 'SAPSNEW44').Value
      let no = this.DataSubmit.Datas.find(e => e.Code === 'SAPSNEW45').Value

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
            await new SurgeryAndProcedureSummaryV3({}, this._VisitType)
              .update('Update/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true, this.DataSubmit)
              .then(response => {
                // if (!hiddenMessage) {
                this.toastedSuccess()
                // .getData()
                // }
                this.edited = false
                resolve(true)
                if (!this.checkConfirm) {
                  setTimeout(() => {
                    this.reload()
                  }, 500)
                }
              })
              .catch(e => {
                // this._401ResponseError(e)
              })
          }, 100)
        )
      }
    },
    getUsernameFromString (str) {
      if (!str) return ''
      var sttt = str.substring(
        str.indexOf('(') + 1,
        str.indexOf(')')
      )
      return sttt || str
    }
  }
}
</script>
<style>

</style>
