<template>
    <div>
      <h1 class="text-center form-title; margin-bottom: 10px;">{{__t('ĐÁNH GIÁ NGUY CƠ THUYÊN TẮC MẠCH')}}</h1>
      <p class="text-center">{{__t("(Áp dụng cho bệnh nhân nội khoa - Bác sĩ đánh giá lúc BN nhập viện)")}}</p>
      <div class="row container" style="width: 100%; display: flex;">
        <div class="col-2 form-group" style="width: 100%; display: inline-table">
          <label>{{__t('Từ ngày')}}</label>
          <VDateTimePicker5 :max="getMax()" v-model="parameters.FromDate" :format="vDateTimeFormat" :allday="'allday'" :placeholder="__t('Từ ngày')"/>
          <!-- <v-date-time-picker :max="parameters.ToDate" :format="vDateTimeFormat" :allday="'allday'" v-model="parameters.FromDate" ></v-date-time-picker> -->
        </div>
        <div class="col-2 form-group" style="width: 100%; display: inline-table">
          <label>{{__t('Đến ngày')}}</label>
          <v-date-time-picker :format="vDateTimeFormat" :allday="'allday'" v-model="parameters.ToDate"></v-date-time-picker>
        </div>
        <div class="col-4 form-group" style="width: 100%; display: inline-table; margin-left: 36px;">
          <label style="display: inline-block">{{__t('Người đánh giá')}}</label>
          <UsersSelect2 v-model="parameters.Assessor" />
        </div>
        <div class="col-3 form-group" style="width: 100%; display: inline-table; margin-top: 25px; margin-left: 20px;">
          <button class="btn btn-flat v-yellow-btn" style="margin-right: 20px" @click="getData()">{{__t("Lọc")}}</button>
          <button class="btn btn-flat" @click="clearFilter()">{{__t('Xóa bộ lọc')}}</button>
        </div>
      </div>
      <p style="padding: 12px;"><i>{{__t('Lọc theo thời gian bắt đầu đánh giá')}}</i></p>
      <table class="table table-striped table-bordered v-table v-table2 none-row-curso">
        <thead class="bg-1375ba">
          <tr>
            <th width="1px" class="text-center">{{__t('STT')}}</th>
            <th width="1" class="text-center">{{__t('Bắt đầu')}}</th>
            <th width="1" class="text-center no-wrap">{{__t('Kết thúc')}}</th>
            <th width="260px" class="text-center">{{__t('Đánh giá nguy cơ')}}</th>
            <th width="1" class="text-center no-wrap">{{__t('Tổng điểm')}}</th>
            <th width="1" class="text-center no-wrap">{{__t('Phân loại nguy cơ')}}</th>
            <th class="text-center">
              {{__t('Can thiệp - Điều trị')}}
              <span>
                <a class="myPopover"
                    id="notePopover"
                    data-toggle="popover"
                    title="Chú thích"
                    data-placement="bottom"
                    data-trigger="click"
                    data-html="true"
                    data-content="This is <b style='color:red;'>Simple</b> HTML Content.">
                  <i class="fa fa-angle-double-down" aria-hidden="true">{{__t('Chú thích')}}</i>
                </a>
              </span>
            </th>
            <th width="1" class="text-center no-wrap">{{__t('Người đánh giá')}}</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="listThrombosisRiskFactorAssessment && listThrombosisRiskFactorAssessment.length === 0">
          <tr>
            <td colspan="8" class="text-center">{{ __t("Không có thông tin! ") }}</td>
          </tr>
          </template>
          <template v-else v-for="(item, index) in listThrombosisRiskFactorAssessment">
              <tr :key="index + item.ItemId">
                <td class="text-center" rowspan="2">
                  {{ (parameters.pageNumber - 1) * parameters.PageSize + (index + 1) }}
                </td>
                <td rowspan="2" class="text-center">{{getFTime(item.StartingAssessment)}}</td>
                <td rowspan="2" class="text-center">{{getFTime(item.FinishingAssessment)}}</td>
                <td>
                  <p>{{__t('Đánh giá nguy cơ thuyên tắc bằng thang điểm Padua')}}</p>
                  <ContentItem :ContentItemDatas="item.VTERiskFactors" />
                </td>
                <td class="text-center fw600">{{item.PaduaTotalPoint}}</td>
                <td class="text-center fw600" :class="getTextDiem(item.PaduaTotalPoint) === 'Cao' ? 'bg-red' : ''">{{getTextDiem(item.PaduaTotalPoint)}}</td>
                <td rowspan="2">
                  <div>
                    <p style="text-align: left; padding-left: 5px;" v-if="item.ContraindicationsForAntiCoagulant && item.ContraindicationsForAntiCoagulant !== '[]'">{{__t('CCĐ thuốc chống đông - cân nhắc điều trị dự phòng bằng biện pháp cơ học')}}</p>
                    <ContentItem :ContentItemDatas="item.ContraindicationsForAntiCoagulant" />
                    <p style="text-align: left; padding-left: 5px;" v-if="item.MechanicalProphylaxis && item.MechanicalProphylaxis !== '[]'">{{__t('Điều trị')}}</p>
                    <ContentItem :ContentItemDatas="item.MechanicalProphylaxis" />
                  </div>
                </td>
                <td class="text-center" rowspan="2">
                  <div v-if="Version < 9">
                    <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                    <button v-if="(item.CreatedBy === getUser()) && item.Is24hLocked === false && !viewOnly" @click="getDetail(item.ItemId)"><i class="fa fa-pencil-square-o" aria-hidden="true">{{__t('Chi tiết')}}</i></button>
                  </div>
                  <div v-else>
                    <div v-if="(item.CreatedBy === getUser()) && item.Is24hLocked === false && !viewOnly">
                      <button @click="getDetail(item.ItemId)"><i class="fa fa-pencil-square-o" aria-hidden="true">{{__t('Chi tiết')}}</i></button>
                    </div>
                    <div v-if="item.CreatedBy && (!item.ConfirmCreated || (item.ConfirmCreated && item.ConfirmCreated.IsUnlockConfirm))">
                      <ad-Info :ad="item.CreatedBy" />
                    </div>
                    <SingleConfirm
                      :kind="'TRFAT_USERCREATED'"
                      :FormCode="'A01_165_050919_VE'"
                      :item="item" :readonly="readonly2(item)"
                      :viewOnly="viewOnly"
                      :hideLabel="true"
                      @success="success"
                      class="no-wrap mrt10"
                      :title="'Người đánh giá'"/>
                  </div>
                </td>
              </tr>
              <tr :key="index">
                <td>
                  <p>{{__t('Đánh giá nguy cơ chảy máu bằng IMPROVE')}}</p>
                  <ContentItem :ContentItemDatas="item.ConditionOfPatient" />
                </td>
                <td class="text-center fw600">{{item.IMPROVETotalPoint}}</td>
                <td class="text-center fw600" :class="getTextDiem2(item.IMPROVETotalPoint) === 'Cao' ? 'bg-red' : ''">{{getTextDiem2(item.IMPROVETotalPoint)}}</td>
              </tr>
          </template>
        </tbody>
        <tfoot v-if="listThrombosisRiskFactorAssessment && listThrombosisRiskFactorAssessment.length > 0">
          <tr>
            <td colspan="8">
              <template>
                <div class="flex space-between">
                  <div>
                    <paginate
                      :clickHandler="getData"
                      :container-class="'pagination pagination-sm no-margin v-pagination'"
                      :next-text="'»'"
                      :page-count="parameters.pages"
                      :prev-text="'«'"
                      v-if="listThrombosisRiskFactorAssessment.length > 0"
                      v-model="parameters.pageNumber">
                    </paginate>
                  </div>
                </div>
              </template>
            </td>
          </tr>
        </tfoot>
      </table>
      <!-- <div style="display: flex;flex-direction: row;justify-content: space-around;" class="bg-primary text-white">
        <div style="width: 3%; text-align: center; border-right: 1px solid darkgray; border-left: 1px solid darkgray; display: flex; align-items: center; justify-content: center;"><b>{{__t('STT')}}</b></div>
        <div style="width: 7%; text-align: center; border-right: 1px solid darkgray; display: flex; align-items: center; justify-content: center;"><b>{{__t('Bắt đầu')}}</b></div>
        <div style="width: 7%; text-align: center; border-right: 1px solid darkgray; display: flex; align-items: center; justify-content: center;"><b>{{__t('Kết thúc')}}</b></div>
        <div style="width: 25%; text-align: center; border-right: 1px solid darkgray; display: flex; align-items: center; justify-content: center;" id="danhGiaNguyCo"><b>{{__t('Đánh giá nguy cơ')}}</b></div>
        <div style="width: 10%; text-align: center; border-right: 1px solid darkgray; display: flex; align-items: center; justify-content: center;" id="tongDiem"><b>{{__t('Tổng điểm')}}</b></div>
        <div style="width: 11%; text-align: center; border-right: 1px solid darkgray; display: flex; align-items: center; justify-content: center;" id="phanLoaiNguyCo"><b>{{__t('Phân loại nguy cơ')}}</b></div>
        <div style="width: 26%; text-align: center; border-right: 1px solid darkgray; display: flex; align-items: center; justify-content: center;">
          <b>{{__t('Can thiệp - Điều trị')}}</b>
          <span>
            <a class="myPopover"
                id="notePopover"
                data-toggle="popover"
                title="Chú thích"
                data-placement="bottom"
                data-trigger="click"
                data-html="true"
                data-content="This is <b style='color:red;'>Simple</b> HTML Content.">
              <i class="fa fa-angle-double-down" aria-hidden="true">{{__t('Chú thích')}}</i>
            </a>
          </span>
        </div>
        <div style="padding: 10px; width: 11%; text-align: center; border-right: 1px solid darkgray; display: flex; align-items: center; justify-content: center;"><b>{{__t('Người đánh giá')}}</b></div>
      </div>
      <div v-if="listThrombosisRiskFactorAssessment  && listThrombosisRiskFactorAssessment.length === 0" style="margin-top: 15px;">
        <p class="text-center">{{__t("Chưa có thông tin")}}!</p>
      </div>
      <div v-else>
        <div :key="index" v-for="(item, index) in listThrombosisRiskFactorAssessment" style="display: flex;flex-direction: row;border-top: 1px solid darkgray; border-bottom: 1px solid darkgray;">
          <div style="width: 3%; text-align: center; border-right: 1px solid darkgray; border-left: 1px solid darkgray; display: flex; align-items: center; justify-content: center;"><p>{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</p></div>
          <div style="width: 7%; text-align: center; border-right: 1px solid darkgray; display: flex; align-items: center; justify-content: center;">{{item.StartingAssessment | formatDateWithoutSecon}}</div>
          <div style="width: 7%; text-align: center; border-right: 1px solid darkgray; display: flex; align-items: center; justify-content: center;">{{item.FinishingAssessment | formatDateWithoutSecon}}</div>
          <div style="width: 46%; display: grid">
            <div style="display: flex; flex-direction: row;">
              <div :style="{width: danhGiaNguyCoWidth + 1 + 'px'}" style="border-right: 1px solid darkgray;">
                <p style="text-align: left; padding-left: 5px;">{{__t('Đánh giá nguy cơ thuyên tắc bằng thang điểm Padua')}}</p>
                <ContentItem :ContentItemDatas="item.VTERiskFactors" />
              </div>
              <div :style="{width: tongDiemWidth + 1 + 'px'}" style="border-right: 1px solid darkgray; display: flex; align-items: center; justify-content: center;" v-if="item.PaduaTotalPoint > 0"><b>{{item.PaduaTotalPoint}}</b></div>
              <div :style="{width: tongDiemWidth + 1 + 'px'}" style="border-right: 1px solid darkgray; display: flex; align-items: center; justify-content: center;" v-else><b>0</b></div>
              <div :style="{width: phanLoaiNguyCoWidth + 'px'}" v-if="item.PaduaTotalPoint === 0" style="text-align: center; display: flex; flex-direction: column; justify-content: center; flex: 1 1 auto; border-right: 1px solid darkgray; border-right: 1px solid darkgray;"><b>N/A</b></div>
              <div :style="{width: phanLoaiNguyCoWidth + 'px'}" v-else-if="item.PaduaTotalPoint <  4" style="text-align: center; display: flex; flex-direction: column; justify-content: center; flex: 1 1 auto; border-right: 1px solid darkgray; border-right: 1px solid darkgray;"><b>{{__t('Thấp')}}</b></div>
              <div :style="{width: phanLoaiNguyCoWidth + 'px'}" v-else style="text-align: center; background-color: red; color: white; display: flex; flex-direction: column; justify-content: center; flex: 1 1 auto; border-right: 1px solid darkgray; border-right: 1px solid darkgray;"><b>{{__t('Cao')}}</b></div>
            </div>
            <div style="display: flex; flex-direction: row;">
              <div :style="{width: danhGiaNguyCoWidth + 1 + 'px'}" style="border-right: 1px solid darkgray; border-top: 1px solid darkgray;">
                <p style="text-align: left; padding-left: 5px;">{{__t('Đánh giá nguy cơ chảy máu bằng IMPROVE')}}</p>
                <ContentItem :ContentItemDatas="item.ConditionOfPatient" />
              </div>
              <div :style="{width: tongDiemWidth + 1 + 'px'}" style="border-right: 1px solid darkgray; border-top: 1px solid darkgray; display: flex; align-items: center; justify-content: center;" v-if="item.IMPROVETotalPoint > 0"><b>{{item.IMPROVETotalPoint}}</b></div>
              <div :style="{width: tongDiemWidth + 1 + 'px'}" style="border-right: 1px solid darkgray; border-top: 1px solid darkgray; display: flex; align-items: center; justify-content: center;" v-else><b>0</b></div>
              <div :style="{width: phanLoaiNguyCoWidth + 'px'}" v-if="item.IMPROVETotalPoint === 0" style="text-align: center; display: flex; flex-direction: column; justify-content: center; flex: 1 1 auto; border-top: 1px solid darkgray; border-right: 1px solid darkgray;"><b>N/A</b></div>
              <div :style="{width: phanLoaiNguyCoWidth + 'px'}" v-else-if="item.IMPROVETotalPoint < 7" style="text-align: center; display: flex; flex-direction: column; justify-content: center; flex: 1 1 auto; border-top: 1px solid darkgray; border-right: 1px solid darkgray;"><b>{{__t('Thấp')}}</b></div>
              <div :style="{width: phanLoaiNguyCoWidth + 'px'}" v-else style="text-align: center; background-color: red; color: white; display: flex; flex-direction: column; justify-content: center; flex: 1 1 auto; border-top: 1px solid darkgray; border-right: 1px solid darkgray;"><b>{{__t('Cao')}}</b></div>
            </div>
          </div>
          <div style="width: 26%; text-align: center; border-right: 1px solid darkgray;">
            <p style="text-align: left; padding-left: 5px;">{{__t('CCĐ thuốc chống đông - cân nhắc điều trị dự phòng bằng biện pháp cơ học')}}</p>
            <ContentItem :ContentItemDatas="item.ContraindicationsForAntiCoagulant" />
            <p style="text-align: left; padding-left: 5px;">{{__t('Điều trị')}}</p>
            <ContentItem :ContentItemDatas="item.MechanicalProphylaxis" />
          </div>
          <div style="padding: 10px; width: 11%; text-align: center; border-right: 1px solid darkgray; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div v-if="Version < 7">
              <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
            </div>
            <div v-else-if="!item.ConfirmCreated">
              <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
            </div>
            <button v-if="(item.CreatedBy === getUser()) && item.Is24hLocked === false && !viewOnly" @click="getDetail(item.ItemId)"><i class="fa fa-pencil-square-o" aria-hidden="true">{{__t('Chi tiết')}}</i></button>
            <template v-if="Version >= 7">
              <SingleConfirm
                :kind="'TRFAT_USERCREATED'"
                :FormCode="'A01_165_050919_VE'"
                :item="item" :readonly="readonly"
                :hideLabel="true"
                @success="success"
                class="no-wrap mrt10"
                :title="'Người đánh giá'"/>
            </template>
          </div>
        </div>
      </div>
      <div>
        <paginate
          :clickHandler="getData"
          :container-class="'pagination pagination-sm no-margin v-pagination'"
          :next-text="'»'"
          :page-count="parameters.pages"
          :prev-text="'«'"
          v-if="listThrombosisRiskFactorAssessment.length > 0"
          v-model="parameters.pageNumber">
        </paginate>
      </div> -->
      <p>A01_165_050919_VE</p>
      <div v-if="listThrombosisRiskFactorAssessment.length > 0">
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="UpdateBy" :ad="UpdateBy" /> {{__t('lúc')}} {{UpdateAt | formatDateWithoutSecon}}</p>
      </div>
      <div class="modal" name="assessment" id="assessment" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document" style="width: 900px;">
          <div class="modal-content" style="margin-top: 100px; width: 100%; ">
            <div class="modal-header bg-primary text-white" style="display: flex">
              <div style="width: 99%">
                <h4 class="modal-title " id="exampleModalLongTitle" style="text-align: center">{{__t('Bảng đánh giá nguy cơ thuyên tắc mạch')}}</h4>
              </div>
              <div>
                <button type="button" class="btn btn-secondary"  @click="closeModal()"><i class="fa fa-window-close" aria-hidden="true"></i></button>
              </div>
            </div>
            <div class="modal-body">
              <div class="row" style="display: flex;">
                <div class="col" style="display: flex; margin: auto">
                    <label style="margin: auto; margin-right: 10px;">{{__t('Bắt đầu đánh giá')}}</label>
                    <v-date-time-picker :readonly="readonlyModal" :format="vDateTimeFormat" v-model="StartingAssessment" :allday="'allday'" @change="isChangeStarting()" ></v-date-time-picker>
                </div>
                <div class="col" style="display: flex; margin: auto">
                    <label style="margin: auto; margin-right: 10px;">{{__t('Kết thúc đánh giá')}}</label>
                    <v-date-time-picker :readonly="readonlyModal" :format="vDateTimeFormat" v-model="FinishingAssessment"  @change="isChangeFinishing()" :min="StartingAssessment"></v-date-time-picker>
                </div>
                <div class="col" style="display: flex; margin: auto;">
                    <label style="margin: auto; margin-right: 10px;">{{__t('Người đánh giá')}}</label>
                    <ad-Info :ad="createdBy" />
                </div>
              </div>
              <div style="margin-top: 10px;">
                <!-- Đánh giá nguy cơ thuyên tắc bằng thang điểm Padua -->
                <table class="table table-striped">
                  <thead class="thead-primary">
                    <tr>
                      <th colspan="999" class="bg-primary" scope="row">{{__t('1. Đánh giá nguy cơ thuyên tắc bằng thang điểm Padua')}}</th>
                    </tr>
                    <tr>
                      <td scope="row" style="width: 90%"><b>{{__t('Yếu tố nguy cơ HKTT')}}</b></td>
                      <td scope="row" style="width: 10%; text-align: center"><b>{{__t('Điểm')}}</b></td>
                    </tr>
                  </thead>
                  <tbody>
                      <!-- Ung thư đang tiến triển -->
                      <tr v-if="MASTERDATA['IPDTRFAFMP1']">
                        <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP1'])}}</td>
                        <td>
                          <div class="btn-action radio-left">
                            <MDRadio :readonly="readonlyModal" style="width: 100%" v-model="MASTERDATA['IPDTRFAFMP1']" :fullWidth="true"/>
                          </div>
                        </td>
                      </tr>
                      <!-- Bất động trên 3 ngày -->
                      <tr v-if="MASTERDATA['IPDTRFAFMP3']">
                        <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP3'])}}</td>
                        <td>
                          <div class="btn-action radio-left">
                            <MDRadio :readonly="readonlyModal" style="width: 100%" v-model="MASTERDATA['IPDTRFAFMP3']" :fullWidth="true"/>
                          </div>
                        </td>
                      </tr>
                      <!-- Tiền sử huyết khối - thuyên tắc -->
                      <tr v-if="MASTERDATA['IPDTRFAFMP5']">
                        <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP5'])}}</td>
                        <td>
                          <div class="btn-action radio-left">
                            <MDRadio :readonly="readonlyModal" style="width: 100%" v-model="MASTERDATA['IPDTRFAFMP5']" :fullWidth="true"/>
                          </div>
                        </td>
                      </tr>
                      <!-- Chấn thương hoặc phẫu thuật trong vòng 1 tháng -->
                      <tr v-if="MASTERDATA['IPDTRFAFMP7']">
                        <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP7'])}}</td>
                        <td>
                          <div class="btn-action radio-left">
                            <MDRadio :readonly="readonlyModal" style="width: 100%" v-model="MASTERDATA['IPDTRFAFMP7']" :fullWidth="true"/>
                          </div>
                        </td>
                      </tr>
                      <!-- Từ 70 tuổi trở lên -->
                      <tr v-if="MASTERDATA['IPDTRFAFMP59']">
                        <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP59'])}}</td>
                        <td>
                          <div class="btn-action radio-left">
                            <MDRadio :readonly="readonlyModal" style="pointer-events: none;" v-model="MASTERDATA['IPDTRFAFMP59']" :fullWidth="true"/>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="MASTERDATA['IPDTRFAFMP67']">
                        <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP67'])}}</td>
                        <td>
                          <div class="btn-action radio-left">
                            <MDRadio :readonly="readonlyModal" style="width: 100%; pointer-events: none;" v-model="MASTERDATA['IPDTRFAFMP67']" :fullWidth="true"/>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="MASTERDATA['IPDTRFAFMP9']">
                        <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP9'])}}</td>
                        <td>
                          <div class="btn-action radio-left">
                            <MDRadio :readonly="readonlyModal" v-model="MASTERDATA['IPDTRFAFMP9']" :fullWidth="true"/>
                          </div>
                        </td>
                      </tr>
                      <!-- Nhiễm khuẩn cấp và/hoặc bệnh thấp -->
                      <tr v-if="MASTERDATA['IPDTRFAFMP11']">
                        <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP11'])}}</td>
                        <td>
                          <div class="btn-action radio-left">
                            <MDRadio :readonly="readonlyModal" v-model="MASTERDATA['IPDTRFAFMP11']" :fullWidth="true"/>
                          </div>
                        </td>
                      </tr>
                      <!-- Béo phì (BMI > 30) -->
                      <tr v-if="MASTERDATA['IPDTRFAFMP13']">
                        <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP13'])}}</td>
                        <td>
                          <div class="btn-action radio-left">
                            <MDRadio :readonly="readonlyModal" style="pointer-events: none;" v-model="MASTERDATA['IPDTRFAFMP13']" :fullWidth="true"/>
                          </div>
                        </td>
                      </tr>
                      <!-- Hormone tránh thai hoặc hormone thay thế -->
                      <tr v-if="MASTERDATA['IPDTRFAFMP15']">
                        <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP15'])}}</td>
                        <td>
                          <div class="btn-action radio-left">
                            <MDRadio :readonly="readonlyModal" v-model="MASTERDATA['IPDTRFAFMP15']" :fullWidth="true"/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                      <th>{{__t('Tổng điểm')}}</th>
                        <th style="text-align: center;" v-if="paduaTotal > 0">{{paduaTotal}}</th>
                        <th style="text-align: center;" v-else>0</th>
                      </tr>
                      <tr>
                        <th>{{__t('Phân loại nguy cơ')}}</th>
                        <th style="text-align: center;" v-if="paduaLevel == 0">{{__t('Thấp')}}</th>
                        <th style="text-align: center;" v-else-if="paduaLevel == 1">{{__t(`${paduaClassifyRisk[paduaLevel]}`)}}</th>
                        <th style="text-align: center; background-color: red; color: white;" v-else >{{__t(`${paduaClassifyRisk[paduaLevel]}`)}}</th>
                      </tr>
                  </tbody>
                </table>
                <!-- Đánh giá nguy cơ chảy máu bằng bảng IMPROVE -->
                <table class="table table-striped">
                  <thead class="thead-primary">
                    <tr>
                        <th colspan="999" class="bg-primary" scope="row">{{__t('2. Đánh giá nguy cơ chảy máu bằng bảng IMPROVE')}}</th>
                    </tr>
                    <tr>
                      <td scope="row" style="width: 90%"><b>{{__t('Tình trạng bệnh nhân')}}</b></td>
                      <td scope="row" style="width: 10%; text-align: center"><b>{{__t('Điểm')}}</b></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="MASTERDATA['IPDTRFAFMP17']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP17'])}}</td>
                      <td>
                        <div class="btn-action radio-left">
                          <MDRadio :readonly="readonlyModal" style="width: 100%" v-model="MASTERDATA['IPDTRFAFMP17']" :fullWidth="true"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP19']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP19'])}}</td>
                      <td>
                        <div class="btn-action radio-left">
                          <MDRadio :readonly="readonlyModal" v-model="MASTERDATA['IPDTRFAFMP19']" :fullWidth="true"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP21']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP21'])}}</td>
                      <td>
                        <div class="btn-action radio-left">
                          <MDRadio :readonly="readonlyModal" v-model="MASTERDATA['IPDTRFAFMP21']" :fullWidth="true"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP23']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP23'])}}</td>
                      <td>
                        <div class="btn-action radio-left">
                          <MDRadio :readonly="readonlyModal" style="pointer-events: none;" v-model="MASTERDATA['IPDTRFAFMP23']" :fullWidth="true"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP25']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP25'])}}</td>
                      <td>
                        <div class="btn-action radio-left">
                          <MDRadio :readonly="readonlyModal" v-model="MASTERDATA['IPDTRFAFMP25']" :fullWidth="true"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP27']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP27'])}}</td>
                      <td>
                        <div class="btn-action radio-left">
                          <MDRadio :readonly="readonlyModal" v-model="MASTERDATA['IPDTRFAFMP27']" :fullWidth="true"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP29']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP29'])}}</td>
                      <td>
                        <div class="btn-action radio-left">
                          <MDRadio :readonly="readonlyModal" style="width: 100%" v-model="MASTERDATA['IPDTRFAFMP29']" :fullWidth="true"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP31']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP31'])}}</td>
                      <td>
                        <div class="btn-action radio-left">
                          <MDRadio :readonly="readonlyModal" style="width: 100%" v-model="MASTERDATA['IPDTRFAFMP31']" :fullWidth="true"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP33']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP33'])}}</td>
                      <td>
                        <div class="btn-action radio-left">
                          <MDRadio :readonly="readonlyModal" v-model="MASTERDATA['IPDTRFAFMP33']" :fullWidth="true"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP35']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP35'])}}</td>
                      <td>
                        <div class="btn-action radio-left">
                          <MDRadio :readonly="readonlyModal" v-model="MASTERDATA['IPDTRFAFMP35']" :fullWidth="true"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP37']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP37'])}}</td>
                      <td>
                        <div class="btn-action radio-left">
                          <MDRadio :readonly="readonlyModal" style="pointer-events: none;" v-model="MASTERDATA['IPDTRFAFMP37']" :fullWidth="true"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP39']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP39'])}}</td>
                      <td>
                        <div class="btn-action radio-left">
                          <MDRadio :readonly="readonlyModal" style="pointer-events: none;" v-model="MASTERDATA['IPDTRFAFMP39']" :fullWidth="true"/>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>{{__t('Tổng điểm')}}</th>
                      <th style="text-align: center;" v-if="IMPROVETotal > 0">{{IMPROVETotal}}</th>
                      <th style="text-align: center;" v-else>0</th>
                    </tr>
                    <tr>
                      <th>{{__t('Phân loại nguy cơ')}}</th>
                      <th style="text-align: center;" v-if="IMPROVELevel == 0">{{__t('Thấp')}}</th>
                      <th style="text-align: center;" v-else-if="IMPROVELevel == 1">{{__t(`${IMPROVEClassifyRisk[IMPROVELevel]}`)}}</th>
                      <th style="text-align: center; background-color: red; color: white;" v-else >{{__t(`${IMPROVEClassifyRisk[IMPROVELevel]}`)}}</th>
                    </tr>
                  </tbody>
                </table>
                <!-- CCĐ thuốc chống đông - cân nhắc điều trị dự phòng bằng biện pháp cơ học -->
                <table class="table table-striped">
                  <thead class="thead-primary">
                    <tr>
                        <th colspan="999" class="bg-primary" scope="row">{{__t('3. CCĐ thuốc chống đông - cân nhắc điều trị dự phòng bằng biện pháp cơ học')}}</th>
                    </tr>
                    <tr>
                      <td scope="row" style="width: 90%"><b>{{__t('Biện pháp')}}</b></td>
                      <td scope="row" style="width: 10%; text-align: center"><b>{{__t('Tick thực hiện')}}</b></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="MASTERDATA['IPDTRFAFMP41']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP41'])}}</td>
                      <td>
                        <div class="btn-action radio-left" style="display: flex; justify-content: center;">
                          <input :disabled="readonlyModal" type="checkbox" v-model="MASTERDATA['IPDTRFAFMP41'].Items[0].Value" style="height: 24px;width: 24px;"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP43']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP43'])}}</td>
                      <td>
                        <div class="btn-action radio-left" style="display: flex; justify-content: center;">
                          <input :disabled="readonlyModal" type="checkbox" v-model="MASTERDATA['IPDTRFAFMP43'].Items[0].Value" style="height: 24px;width: 24px;"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP45']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP45'])}}</td>
                      <td>
                        <div class="btn-action radio-left" style="display: flex; justify-content: center;">
                          <input :disabled="readonlyModal" type="checkbox" v-model="MASTERDATA['IPDTRFAFMP45'].Items[0].Value" style="height: 24px;width: 24px;"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP47']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP47'])}}</td>
                      <td>
                        <div class="btn-action radio-left" style="display: flex; justify-content: center;">
                          <input :disabled="readonlyModal" type="checkbox" v-model="MASTERDATA['IPDTRFAFMP47'].Items[0].Value" style="height: 24px;width: 24px;"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP49']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP49'])}}</td>
                      <td>
                        <div class="btn-action radio-left" style="display: flex; justify-content: center;">
                          <input :disabled="readonlyModal" type="checkbox" v-model="MASTERDATA['IPDTRFAFMP49'].Items[0].Value" style="height: 24px;width: 24px;" />
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP51']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP51'])}}</td>
                      <td>
                        <div class="btn-action radio-left" style="display: flex; justify-content: center;">
                          <input :disabled="readonlyModal" type="checkbox" v-model="MASTERDATA['IPDTRFAFMP51'].Items[0].Value" style="height: 24px;width: 24px;"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP53']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP53'])}}</td>
                      <td>
                        <div class="btn-action radio-left" style="display: flex; justify-content: center;">
                          <input :disabled="readonlyModal" type="checkbox" v-model="MASTERDATA['IPDTRFAFMP53'].Items[0].Value" style="height: 24px;width: 24px;"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP55']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP55'])}}</td>
                      <td>
                        <div class="btn-action radio-left" style="display: flex; justify-content: center;">
                          <input :disabled="readonlyModal" type="checkbox" v-model="MASTERDATA['IPDTRFAFMP55'].Items[0].Value" style="height: 24px;width: 24px;"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDTRFAFMP57']">
                      <td style="vertical-align: middle;">{{__label(MASTERDATA['IPDTRFAFMP57'])}}</td>
                      <td>
                        <div class="btn-action radio-left" style="display: flex; justify-content: center;">
                          <input :disabled="readonlyModal" type="checkbox" v-model="MASTERDATA['IPDTRFAFMP57'].Items[0].Value"  style="height: 24px;width: 24px;"/>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- Điều trị -->
                <table class="table table-striped">
                  <thead>
                    <tr>
                        <th colspan="999" class="bg-primary" scope="row">
                          <div>
                            <b>{{__t('4. Điều trị nguy cơ')}}</b>
                            <span v-if="paduaLevel === 2">
                              <button id="detailNotes"
                                  class="btn btn-link"
                                  title="Chú thích"
                                  data-toggle="collapse"
                                  data-target="#collapseExample"
                                  aria-expanded="false"
                                  aria-controls="collapseExample">
                                <i class="fa fa-angle-double-down" aria-hidden="true">{{__t('Chú thích')}}</i>
                              </button>
                              <div class="collapse" id="collapseExample" style="margin-top: 12px">
                                <div class="card card-body" style="font-weight: normal" v-if="(paduaLevel === 2 && (IMPROVELevel === 0 || IMPROVELevel === 1) && MASTERDATA['IPDTRFAFMP63']) || (paduaTotalPoint >= 4 && IMPROVETotalPoint < 7)">
                                  <p>{{__t(notes[0])}}</p>
                                  <p>{{__t(notes[1])}}</p>
                                </div>
                                <div class="card card-body" style="font-weight: normal" v-else-if="(paduaLevel === 2 && IMPROVELevel === 2 && MASTERDATA['IPDTRFAFMP66']) || (paduaTotalPoint >= 4 && IMPROVETotalPoint >= 7)">
                                  <p>{{__t(notes[2])}}</p>
                                  <p>{{__t(notes[3])}}</p>
                                </div>
                              </div>
                            </span>
                          </div>
                        </th>
                    </tr>
                    <tr>
                      <td scope="row" style="width: 90%"><b>{{__t('Nội dung')}}</b></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="paduaLevel === 1 && MASTERDATA['IPDTRFAFMP61']">
                      <td>
                        <div class="btn-action radio-left">
                          <MDRadio :readonly="readonlyModal" style="width: 100%" v-model="MASTERDATA['IPDTRFAFMP61']"/>
                        </div>
                      </td>
                    </tr>
                    <tr v-else-if="(paduaLevel === 2 && (IMPROVELevel === 0 || IMPROVELevel === 1) && MASTERDATA['IPDTRFAFMP63']) || (paduaTotalPoint >= 4 && IMPROVETotalPoint < 7)">
                      <div class="btn-action radio-left" >
                          <MDRadio :readonly="readonlyModal" style="width: 100%"  v-model="MASTERDATA['IPDTRFAFMP63']"/>
                      </div>
                    </tr>
                    <tr v-else-if="(paduaLevel === 2 && IMPROVELevel === 2 && MASTERDATA['IPDTRFAFMP66']) || (paduaTotalPoint >= 4 && IMPROVETotalPoint >= 7)">
                      <div class="btn-action radio-left" >
                          <MDRadio :readonly="readonlyModal" style="width: 100%;" v-model="MASTERDATA['IPDTRFAFMP66']"/>
                      </div>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <b>{{__t('THỜI GIAN ĐIỀU TRỊ TRUNG BÌNH:')}} </b>{{__t('Với nội khoa: 6-14 ngày.')}}
                </div>
              </div>
            </div>
            <div class="modal-footer">
                <button id="btnClose" v-show="false" type="button" class="btn btn-secondary" data-dismiss="modal">{{__t('Đóng')}}</button>
                <button v-if="!readonlyModal" type="button" class="btn btn-primary v-yellow-btn text-black" style="width: 100%;" @click="save()"><i class="fa fa-floppy-o" style="margin-right: 10px;" aria-hidden="true" ></i>{{__t('Lưu')}}</button>
            </div>
          </div>
        </div>
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
      <FloatBlock v-if="!viewOnly">
        <template slot='buttons'>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-6 col-sm-6" v-if="isDoctor() && !Is24hLock">
            <div class="form-group1">
              <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
                type="button"
                v-shortkey="['ctrl', 's']"
                id="btnCreate" data-toggle="modal" data-target="#assessment"
                @click="createNew()">
                <i class="fa fa-plus-circle" aria-hidden="true"></i> {{__t('Thêm đánh giá')}}
              </button>
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
import ThrombosisRiskFactorAssessment from '@/services/IPD/ThrombosisRiskFactorAssessment'
import $ from 'jquery'
import ContentItem from './ContentItem.vue'
import UsersSelect2 from '@/components/UsersSelect2.vue'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import SingleConfirm from '@/components/Form/SingleConfirm.vue'
import VDateTimePicker5 from '@/components/VDateTimePicker5.vue'

const PADUACODES = [
  'IPDTRFAFMP1',
  'IPDTRFAFMP3',
  'IPDTRFAFMP5',
  'IPDTRFAFMP7',
  'IPDTRFAFMP9',
  'IPDTRFAFMP11',
  'IPDTRFAFMP13',
  'IPDTRFAFMP15',
  'IPDTRFAFMP67',
  'IPDTRFAFMP59'
]

const IMPROVECODES = [
  'IPDTRFAFMP17',
  'IPDTRFAFMP19',
  'IPDTRFAFMP21',
  'IPDTRFAFMP23',
  'IPDTRFAFMP25',
  'IPDTRFAFMP27',
  'IPDTRFAFMP29',
  'IPDTRFAFMP31',
  'IPDTRFAFMP33',
  'IPDTRFAFMP35',
  'IPDTRFAFMP37',
  'IPDTRFAFMP39'
]

const MechanicalProphylaxisCodes = [
  'IPDTRFAFMP61',
  'IPDTRFAFMP63',
  'IPDTRFAFMP66'
]

const ContraindicationsForAntiCoagulantCodes = [
  'IPDTRFAFMP41',
  'IPDTRFAFMP43',
  'IPDTRFAFMP45',
  'IPDTRFAFMP47',
  'IPDTRFAFMP49',
  'IPDTRFAFMP51',
  'IPDTRFAFMP53',
  'IPDTRFAFMP55',
  'IPDTRFAFMP57'
]

export default {
  name: 'ThrombosisRiskFactorAssessment23Index',
  mixins: [MixinMasterData],
  props: ['viewOnly', 'VisitId'],
  data () {
    return {
      listThrombosisRiskFactorAssessment: [],
      paduaTotalPoint: 0,
      paduaClassifyRisk: ['N/A', 'Thấp', 'Cao'],
      IMPROVETotalPoint: 0,
      IMPROVEClassifyRisk: ['N/A', 'Thấp', 'Cao'],
      StartingAssessment: moment(),
      FinishingAssessment: moment(),
      DataSubmit: {},
      responseDatas: null,
      danhGiaNguyCoWidth: 0,
      tongDiemWidth: 0,
      phanLoaiNguyCoWidth: 0,
      Datas: [],
      formId: null,
      createdBy: '',
      parameters: {
        FormCode: 'IPDTRFA',
        pageNumber: 1,
        pages: 1,
        FromDate: null,
        ToDate: null,
        PageSize: 5,
        Assessor: {
          Username: '',
          Fullname: ''
        },
        IPDId: this._VisitId
      },
      fullName: '',
      UpdateBy: '',
      UpdateAt: null,
      notes: [
        '(1) Ưu tiên dùng Heparine không phân đoạn cho bệnh nhân suy thận có mức lọc cầu thận <30ml/phút. Theo dõi tiểu cầu: xét nghiệm tiểu cầu lần đầu sau 4 ngày điều trị, sau đó 2 ngày/lần cho tới khi ngưng Heparine',
        '(2) Không sử dụng enoxaparine khi mức lọc cầu thận < 30ml/phút. Theo dõi tiểu cầu: không phải theo dõi tiểu cầu trong quá trình chống đông, trừ trường hợp phẫu thuật tim hở thì xét nghiệm tiểu cầu ở ngày 4',
        '(3) Tất áp lực giảm dần từ dưới lên trên: cổ chân = 18 mmHg; giữa cẳng chân = 14 mmHg; đùi = 8 mmHg. Chống chỉ định mang tất áp lực khi có bệnh động mạch chi dưới, bệnh thần kinh vi mạch do tiểu đường, có hoặc có nguy cơ loét-hoại tử da',
        '(4) Thiết bị bơm hơi ngắt quãng: Chống chỉ định bao gồm bệnh động mạch chi dưới, bệnh thần kinh vi mạch do tiểu đường, hoặc có nguy cơ loét-hoại tử da. Không nên dùng cho bệnh nhân đã nằm bất động trên 72 giờ hoặc đã được xác định có huyết khối ở tĩnh mạch chi dưới'
      ],
      isChangeStartingAssessment: false,
      isChangeFinishingAssessment: false,
      daterange: {
        startDate: null,
        endDate: null
      },
      Is24hLock: false,
      Version: '',
      readonlyModal: false
    }
  },
  components: {
    VDateTimePicker,
    ContentItem,
    UsersSelect2,
    DateRangePicker,
    SingleConfirm,
    VDateTimePicker5
  },
  mounted () {
    this.getMasterDatas({ Form: 'A01_165_050919_VE' }, () => {
      this.getData()
    })
    this.$nextTick(() => {
      this.danhGiaNguyCoWidth = $('#danhGiaNguyCo').width()
      this.tongDiemWidth = $('#tongDiem').width()
      this.phanLoaiNguyCoWidth = $('#phanLoaiNguyCo').width()
    })
    this.showNotes()
  },
  computed: {
    readonly () {
      return this.viewOnly || !this.isDoctor() || this.Is24hLock
    },
    paduaTotal: function () {
      var paduaTotal = 0
      PADUACODES.forEach(code => {
        if (this.MASTERDATA[code]) {
          this.MASTERDATA[code].Items.forEach(item => {
            if (item.DataType === 'Radio' && item.Value) {
              paduaTotal += this.parseInt(item.ViName)
            }
          })
        }
      })
      return paduaTotal
    },
    paduaLevel: function () {
      var paduaLevel = 0
      var paduaTotal = this.paduaTotal
      if (paduaTotal === 0) {
        paduaLevel = 0
      } else if (paduaTotal > 0 && paduaTotal < 4) {
        paduaLevel = 1
      } else {
        paduaLevel = 2
      }
      return paduaLevel
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
    }
  },
  methods: {
    success () {
      this.getData()
    },
    createNew () {
      this.formId = null
      this.readonlyModal = false
      var patientInfo = null
      if (this.$store.state.account.CurrentPatient) {
        patientInfo = this.$store.state.account.CurrentPatientObj
      }
      this.getMasterDatas({ Form: 'A01_165_050919_VE' }, () => {
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              if (item.Code === 'IPDTRFAFMP40') {
                if (patientInfo.Gender === 1) {
                  item.Value = true
                }
              } else if (item.Code === 'IPDTRFAFMP60') {
                if (patientInfo.Age >= 70) {
                  item.Value = true
                }
              } else if (item.Code === 'IPDTRFAFMP38') {
                if (patientInfo.Age >= 40 && patientInfo.Age <= 84) {
                  item.Value = true
                }
              } else if (item.Code === 'IPDTRFAFMP24') {
                if (patientInfo.Age >= 85) {
                  item.Value = true
                }
              } else if (item.Code === 'IPDTRFAFMP14') {
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
    },
    save () {
      var obj = {}
      this.DataSubmit.Datas = []
      this.DataSubmit.paduaTotalPoint = this.paduaTotal
      this.DataSubmit.IMPROVETotalPoint = this.IMPROVETotal
      this.DataSubmit.VTERiskFactors = []
      this.DataSubmit.ConditionOfPatient = []
      this.DataSubmit.MechanicalProphylaxis = []
      this.DataSubmit.ContraindicationsForAntiCoagulant = []

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
      PADUACODES.forEach(code => {
        if (this.MASTERDATA[code]) {
          this.MASTERDATA[code].Items.forEach(item => {
            if (item.DataType === 'Radio' && item.Value) {
              this.DataSubmit.VTERiskFactors.push({
                ViName: this.MASTERDATA[code].ViName,
                EnName: this.MASTERDATA[code].EnName
              })
            }
          })
        }
      })
      IMPROVECODES.forEach(code => {
        if (this.MASTERDATA[code]) {
          this.MASTERDATA[code].Items.forEach(item => {
            if (item.DataType === 'Radio' && item.Value) {
              this.DataSubmit.ConditionOfPatient.push({
                ViName: this.MASTERDATA[code].ViName,
                EnName: this.MASTERDATA[code].EnName
              })
            }
          })
        }
      })
      MechanicalProphylaxisCodes.forEach(code => {
        if (this.MASTERDATA[code]) {
          this.MASTERDATA[code].Items.forEach(item => {
            if ((item.DataType === 'Checkbox') && item.Value) {
              this.DataSubmit.MechanicalProphylaxis.push({
                ViName: this.MASTERDATA[code].ViName,
                EnName: this.MASTERDATA[code].EnName
              })
            }
            if ((item.DataType === 'Radio') && item.Value) {
              this.DataSubmit.MechanicalProphylaxis.push({
                ViName: item.ViName,
                EnName: item.EnName
              })
            }
          })
        }
      })
      ContraindicationsForAntiCoagulantCodes.forEach(code => {
        if (this.MASTERDATA[code]) {
          this.MASTERDATA[code].Items.forEach(item => {
            if ((item.DataType === 'Checkbox') && item.Value) {
              this.DataSubmit.ContraindicationsForAntiCoagulant.push({
                ViName: this.MASTERDATA[code].ViName,
                EnName: this.MASTERDATA[code].EnName
              })
            }
            if ((item.DataType === 'Radio') && item.Value) {
              this.DataSubmit.ContraindicationsForAntiCoagulant.push({
                ViName: item.ViName,
                EnName: item.EnName
              })
            }
          })
        }
      })

      this.DataSubmit.StartingAssessment = moment(this.StartingAssessment, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY')
      this.DataSubmit.FinishingAssessment = moment(this.FinishingAssessment, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY')
      this.DataSubmit.paduaTotalPoint = this.paduaTotal
      this.DataSubmit.IMPROVETotalPoint = this.IMPROVETotal
      this.DataSubmit.VTERiskFactors = JSON.stringify(this.DataSubmit.VTERiskFactors)
      this.DataSubmit.ConditionOfPatient = JSON.stringify(this.DataSubmit.ConditionOfPatient)
      this.DataSubmit.MechanicalProphylaxis = JSON.stringify(this.DataSubmit.MechanicalProphylaxis)
      this.DataSubmit.ContraindicationsForAntiCoagulant = JSON.stringify(this.DataSubmit.ContraindicationsForAntiCoagulant)
      this.DataSubmit.FormCode = 'IPDTRFA'
      var url = ''
      if (this.formId) {
        url = '/Update/' + this.formId
      } else {
        url = '/Create/' + this._VisitId
      }
      new ThrombosisRiskFactorAssessment().update(url, this.DataSubmit).then(response => {
        this.toastedSuccess()
        setTimeout(() => {
          $('#assessment').modal('hide')
          this.reload()
        }, 500)
      })
    },
    getData () {
      if (this.parameters.FromDate) {
        this.parameters.FromDate = `${this.parameters.FromDate}`
        if (this.parameters.FromDate.includes('Invalid')) {
          this.parameters.FromDate = ''
        }
        if (this.parameters.FromDate.includes('(')) {
          this.parameters.FromDate = this.$options.filters.formatDateWithoutSecon(this.parameters.FromDate)
        }
      }
      if (this.parameters.ToDate) {
        this.parameters.ToDate = `${this.parameters.ToDate}`
        if (this.parameters.ToDate.includes('Invalid')) {
          this.parameters.ToDate = ''
        }
        if (this.parameters.ToDate.includes('(')) {
          this.parameters.ToDate = this.$options.filters.formatDateWithoutSecon(this.parameters.ToDate)
        }
      }
      new ThrombosisRiskFactorAssessment(this.updateQuery()).all().then(response => {
        this.listThrombosisRiskFactorAssessment = response.thrombosisRisk
        this.Is24hLock = response.Is24hLock
        this.UpdateBy = this.listThrombosisRiskFactorAssessment[0].UpdateBy
        this.UpdateAt = this.listThrombosisRiskFactorAssessment[0].UpdateAt
        var bonussssss = 1
        if ((response.Count % this.parameters.PageSize) === 0) {
          bonussssss = 0
        }
        this.parameters.pages = parseInt(response.Count / this.parameters.PageSize) + bonussssss
        this.Version = response.Version
      })
    },
    getDetail (id) {
      this.formId = id
      var url = '/Detail/' + id
      this.readonlyModal = false
      new ThrombosisRiskFactorAssessment().find(url).then(response => {
        this.DataSubmit = response
        this.StartingAssessment = moment(response.StartingAssessment, 'YYYY/MM/DD HH:mm:ss')
        this.FinishingAssessment = moment(response.FinishingAssessment, 'YYYY/MM/DD HH:mm:ss')
        this.paduaTotalPoint = response.PaduaTotalPoint
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
        if ((response.ConfirmCreated && response.ConfirmCreated.ConfirmAt) && response.Version >= 9) {
          this.readonlyModal = true
        }
        $('#assessment').modal('show')
      })
    },
    goBack () {
      this.back()
    },
    updateQuery () {
      return Object.assign({}, this.parameters, {
        IPDId: this._VisitId,
        FromDate: this.parameters.FromDate === null ? '' : this.parameters.FromDate,
        ToDate: this.parameters.ToDate === null ? '' : this.parameters.ToDate,
        Assessor: this.parameters.Assessor.Username === null ? '' : this.parameters.Assessor.Username
      })
    },
    clearFilter () {
      this.parameters = {
        FormCode: 'IPDTRFA',
        IPDId: this._VisitId,
        FromDate: null,
        ToDate: null,
        Assessor: '',
        pageNumber: 1,
        pages: 1,
        PageSize: 5
      }
      this.getData()
    },
    closeModal () {
      if (this.readonlyModal) {
        this.confirmClose()
      } else {
        this.$modal.show('closeWarning')
      }
    },
    confirmClose () {
      this.$modal.hide('closeWarning')
      $('#assessment').modal('hide')
    },
    confirmSkip () {
      this.$modal.hide('closeWarning')
    },
    disableDate (date) {
      return moment().year(-1)
    },
    showNotes () {
      $('#notePopover').popover({
        html: true,
        content: function () {
          var elementId = $(this).attr('data-popover-content')
          return $(elementId).html()
        }
      })
      var notesHtml = ''
      for (let index = 0; index < this.notes.length; index++) {
        notesHtml += this.$t(this.notes[index]) + '<br>'
      }
      $('#notePopover').attr('data-content', notesHtml)
    },
    isChangeStarting () {
      this.isChangeStartingAssessment = true
    },
    isChangeFinishing () {
      this.isChangeFinishingAssessment = true
    },
    getTextDiem (diem) {
      let str = ''
      if (diem < 4) {
        str = 'Thấp'
      } else {
        str = 'Cao'
      }
      return this.__t(str)
    },
    getTextDiem2 (diem) {
      let str = 'N/A'
      if (diem < 7) {
        str = 'Thấp'
      } else {
        str = 'Cao'
      }
      return this.__t(str)
    },
    getMax () {
      if (this.parameters.ToDate && this.parameters.ToDate !== 'Invalid date') {
        return this.parameters.ToDate
      }
      return ''
    },
    readonly2 (item) {
      let check = false
      if (this.viewOnly || !this.isDoctor() || item.Is24hLocked || (item.ConfirmCreated && item.ConfirmCreated.ConfirmAt)) {
        check = true
      }
      return check
    }
  }
}
</script>
<style lang='stylus' scoped>
  >>>.popover-content {
    color: black;
  }
  >>>#notePopover{
    color: white;
    margin-left: 12px;
    cursor: pointer;
  }
  >>>#notePopover:hover {
    color: red;
  }
  >>>#detailNotes {
    color: white;
    margin-left: 12px;
  }
  >>>.popover {
    max-width: 600px;
  }
  .v-table2 {
    tbody {
      tr:nth-of-type(even) {
        background-color: #fff !important;
      }
      tr:hover {
        background: #fff !important;
      }
      tr {
        cursor: auto!important;
      }
    }
  }
</style>
