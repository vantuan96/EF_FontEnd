<template>
  <div id="BloodTransfusionChecklistItem" v-if="loaded">
    <div v-if="Version === 1">  <div class="box-collapse no-border" :class="{'open': open1}">
      <div class="box-collapse-title">
        <b>{{__t('PHẦN I: XÉT NGHIỆM HÒA HỢP MIỄN DỊCH TRUYỀN MÁU')}}</b>
        <div class="collapse-box-action" @click="open1 = !open1">
          <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
          <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
        </div>
      </div>
      <div class="box-collapse-content">
        <div class="border-center">
          <div class="row">
            <div class="col-md-6 col-sm-6">
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Chẩn đoán')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <div class="fake-input disable"><p>{{data.Diagnosis || 'N/A'}}</p></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Khoa/ Phòng')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <div class="fake-input disable">{{__label(data.Specialty)}}</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Số giường')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <template v-if="isBlock1Confirm">{{data.BedNo || 'N/A'}}</template>
                    <input v-else class="form-control input-md" v-model="data.BedNo" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Loại chế phẩm truyền')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <template v-if="isBlock1Confirm">{{data.TypeOfBloodProducts || 'N/A'}}</template>
                    <v-select v-else class='select-full-w' @onSelect="onSelect" :search="true" v-model="data.TypeOfBloodProducts" :placeholder="__t('Nhập')" :items="BloodNames"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Số lượng')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <template v-if="isBlock1Confirm">{{data.Quanlity}}</template>
                    <div v-else class="d-flex flex-center w140">
                      <MDNumberInput :decimal="false" v-model="data.Quanlity"/>
                      <p class="ml-5 my-0">ml</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Tên người cho máu/ Mã số')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <template v-if="isBlock1Confirm">{{data.Code || 'N/A'}}</template>
                    <v-select v-else class='select-full-w' @onSelect="onSelectCode" :search="true" v-model="data.Code" :placeholder="__t('Nhập')" :items="BloodCodes"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Ngày lấy máu/ Điều chế')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <template v-if="isBlock1Confirm">{{data.DateOfBloodCollection || 'N/A'}}</template>
                    <v-date-picker v-else :hideTooltip="true" v-model="data.DateOfBloodCollection" class="full-w" :format="vDateFormat"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Hạn dùng')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <template v-if="isBlock1Confirm">{{data.Expiry || 'N/A'}}</template>
                    <v-date-picker v-else :hideTooltip="true" :allday="'allday'" v-model="data.Expiry" class="full-w" :format="vDateFormat"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Thời gian rã đông (plasma)')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="row">
                    <div class="col-md-6 col-sm-6" style="padding-right: 0">
                      <div class="form-group">
                        <template v-if="isBlock1Confirm">{{data.ThawedTimeAt || 'N/A'}}</template>
                        <span class="wap-datepicker" v-else>
                          <DateTimePicker
                            :editable="false"
                            :value-type="'format'"
                            class="v-datetime full-w"
                            type="datetime"
                            v-model="data.ThawedTimeAt"
                            :placeholder="__t('Chọn')"
                            :format="vDateTimeFormat"
                            :disabled-date="notAfterThawedTimeTo"
                            :disabled-time="notAfterThawedTimeTo"
                            :lang="'vi'"
                          />
                          <div class="ext-btn">
                            <span class="glyphicon glyphicon-time icon-now" @click="setNow('ThawedTimeAt')"></span>
                          </div>
                        </span>
                      </div>
                    </div>
                    <div class="col-md-6 col-sm-6" style="padding-left: 0">
                      <div class="form-group">
                        <template v-if="isBlock1Confirm">{{data.ThawedTimeTo || 'N/A'}}</template>
                        <span class="wap-datepicker" v-else>
                          <DateTimePicker
                            :editable="false"
                            :value-type="'format'"
                            class="v-datetime full-w"
                            type="datetime"
                            v-model="data.ThawedTimeTo"
                            :placeholder="__t('Chọn')"
                            :format="vDateTimeFormat"
                            :lang="'vi'"
                            :disabled-date="notBeforeThawedTimeAt"
                            :disabled-time="notBeforeTimeThawedTimeAt"
                          />
                          <div class="ext-btn">
                            <span class="glyphicon glyphicon-time icon-now" @click="setNow('ThawedTimeTo')"></span>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="boxed border-center">
          <div class="row">
            <div class="col-md-6 col-sm-6">
              <div class="row">
                <div class="col-md-5 col-sm-5">
                  <label>{{__t('Nhóm máu ABO người bệnh')}}:</label>
                </div>
                <div class="col-md-7 col-sm-7">
                  <div class="form-group">
                    <div class="fake-input disable sm-fake-input">{{data.PatientBloodTypeABO || 'N/A'}}</div> Rh: <div class="fake-input disable sm-fake-input">{{data.PatientBloodTypeRH || 'N/A'}}</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5 col-sm-5">
                  <label>{{__t('Nhóm máu ABO người cho')}}:</label>
                </div>
                <div class="col-md-7 col-sm-7">
                  <div class="form-group">
                    <div class="fake-input disable sm-fake-input">{{data.DonorBloodTypeABO || 'N/A'}}</div> Rh: <div class="fake-input disable sm-fake-input">{{data.DonorBloodTypeRH || 'N/A'}}</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <label>{{__t('Các xét nghiệm khác')}}:</label>
                </div>
                <div class="col-md-12 col-sm-12">
                  <!-- <vue-autosuggest
                    v-model="data.OtherCheckTests"
                    :suggestions="OTHERTESTS"
                    :input-props="inputProps">
                  </vue-autosuggest> -->
                  <div class="form-group" >
                    <div class="group-radio no-flex" v-if="OtherCheckTestsInput">
                      <span :data="item" :key="'EIOSOSCSOISNC-' + index" v-for="(item,index) in OTHERTESTS">
                        <input :disabled="isBlock1Confirm" type="checkbox" :id="'EIOSOSCSOISNCradio-' + index" v-model="OtherCheckTestsInput[index]">
                        <label :for="'EIOSOSCSOISNCradio-' + index">{{__t(item.label)}}</label>
                      </span>
                    </div>
                  </div>
                  <template v-if="OtherCheckTestsInput[5]">
                    <template v-if="isBlock1Confirm">{{data.OtherTests || 'N/A'}}</template>
                    <textarea-autosize v-else rows="2" class="form-control" v-model="data.OtherTests" :placeholder="__t('Nhập')" />
                  </template>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label>{{__t('Kết quả xét nghiệm hòa hợp')}}:</label>
              <table class="table table-bordered table-bordered-x no-margin middel-table">
                <tr>
                  <th></th>
                  <th>{{__t('Môi trường muối')}}</th>
                  <th>37<sup>o</sup>C/ Anti Globulin</th>
                </tr>
                <tr>
                  <th>{{__t('Ống 1')}}</th>
                  <td>
                    <template v-if="isBlock1Confirm">{{data.MajorCrossMatchSalt || 'N/A'}}</template>
                    <v-select v-else :disabeleclear="true" class='select-full-w' v-model="data.MajorCrossMatchSalt" :placeholder="__t('Chọn')" :items="DataSelect"/>
                  </td>
                  <td>
                    <template v-if="isBlock1Confirm">{{data.MajorCrossMatchAntiGlobulin || 'N/A'}}</template>
                    <v-select v-else :disabeleclear="true" class='select-full-w' v-model="data.MajorCrossMatchAntiGlobulin" :placeholder="__t('Chọn')" :items="DataSelect"/>
                  </td>
                </tr>
                <tr>
                  <th>{{__t('Ống 2')}}</th>
                  <td>
                    <template v-if="isBlock1Confirm">{{data.MinorCrossMatchSalt || 'N/A'}}</template>
                    <v-select v-else :disabeleclear="true" class='select-full-w' v-model="data.MinorCrossMatchSalt" :placeholder="__t('Chọn')" :items="DataSelect"/>
                  </td>
                  <td>
                    <template v-if="isBlock1Confirm">{{data.MinorCrossMatchAntiGlobulin || 'N/A'}}</template>
                    <v-select v-else :disabeleclear="true" class='select-full-w' v-model="data.MinorCrossMatchAntiGlobulin" :placeholder="__t('Chọn')" :items="DataSelect"/>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <br/><br/>
        <div class="row">
          <div class="col-md-4 col-sm-4 text-center">
            <div v-if="data.HeadOfLabConfirmTime">{{data.HeadOfLabConfirmTime}}</div>
            <p><b>{{__t('Người phụ trách xét nghiệm')}}</b></p>
            <div  v-if="data.HeadOfLabConfirmTime"><ad-Info :ad="data.HeadOfLab.Username" /></div>
            <div v-else>
              <i v-if="viewOnly || data.IsLocked">{{__t('Chưa xác nhận')}}</i>
              <button v-else @click="showDoctorConfirm('HeadOfLab', 'Người phụ trách xét nghiệm')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
            </div>
          </div>
          <div class="col-md-4 col-sm-4 text-center">
            <div v-if="data.FirstTechnicianConfirmTime">{{data.FirstTechnicianConfirmTime}}</div>
            <p><b>{{__t('Người làm xét nghiệm thứ 1')}}</b></p>
            <div  v-if="data.FirstTechnicianConfirmTime"><ad-Info :ad="data.FirstTechnician.Username" /></div>
            <div v-else>
              <i v-if="viewOnly || data.IsLocked">{{__t('Chưa xác nhận')}}</i>
              <button v-else @click="showDoctorConfirm('FirstTechnician', 'Người làm xét nghiệm thứ 1')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
            </div>
          </div>
          <div class="col-md-4 col-sm-4 text-center" >
            <div v-if="data.SecondTechnicianConfirmTime">{{data.SecondTechnicianConfirmTime}}</div>
            <p><b>{{__t('Người làm xét nghiệm thứ 2')}}</b></p>
            <div  v-if="data.SecondTechnicianConfirmTime"><ad-Info :ad="data.SecondTechnician.Username" /></div>
            <div v-else>
              <i v-if="viewOnly || data.IsLocked">{{__t('Chưa xác nhận')}}</i>
              <button v-else @click="showDoctorConfirm('SecondTechnician', 'Người làm xét nghiệm thứ 2')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
            </div>
          </div>
        </div>
        <br/><br/>
      </div>
    </div>
    <div class="box-collapse no-border" :class="{'open': open2}">
      <div class="box-collapse-title">
        <b>{{__t('PHẦN II: THEO DÕI TRUYỀN MÁU LÂM SÀNG')}}</b>
        <div class="collapse-box-action" @click="open2 = !open2">
          <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
          <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
        </div>
      </div>
      <div class="box-collapse-content">
        <div class="border-center">
          <div class="row">
            <div class="col-md-6 col-sm-6">
              <div class="row">
                <div class="col-md-5 col-sm-5">
                  <label>{{__t('Lần truyền máu thứ')}}:</label>
                </div>
                <div class="col-md-7 col-sm-7">
                  <div class="form-group">
                    <template v-if="isBlock2Confirm">{{data.NumberOfBloodTransfusion || 'N/A'}}</template>
                    <v-select v-else :disabeleclear="true" class='select-full-w' v-model="data.NumberOfBloodTransfusion" :placeholder="__t('Chọn')" :items="Quanlity"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5 col-sm-5">
                  <label>{{__t('Định nhóm người cho')}}:</label>
                </div>
                <div class="col-md-7 col-sm-7">
                  <div class="form-group">
                    <div class="fake-input disable sm-fake-input">Nhóm máu {{data.DonorBloodTypeABO || 'N/A'}} Rh {{data.DonorBloodTypeRH || 'N/A'}}</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5 col-sm-5">
                  <label>{{__t('Định nhóm người nhận')}}:</label>
                </div>
                <div class="col-md-7 col-sm-7">
                  <div class="form-group">
                    <div class="fake-input disable sm-fake-input">Nhóm máu {{data.PatientBloodTypeABO || 'N/A'}} Rh {{data.PatientBloodTypeRH || 'N/A'}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="row">
                <div class="col-md-5 col-sm-5">
                  <label>{{__t('Phản ứng chéo tại giường')}}:</label>
                </div>
                <div class="col-md-7 col-sm-7">
                  <div class="form-group">
                    <template v-if="isBlock2Confirm">{{data.Crossmatch || 'N/A'}}</template>
                    <v-select v-else :disabeleclear="true" class='select-full-w' v-model="data.Crossmatch" :placeholder="__t('Chọn')" :items="HarmonyList"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5 col-sm-5">
                  <label>{{__t('Bắt đầu truyền hồi')}}:</label>
                </div>
                <div class="col-md-7 col-sm-7">
                  <div class="form-group">
                    <template v-if="isBlock2Confirm">{{data.StartTransfusionAt || 'N/A'}}</template>
                    <v-date-time-picker v-else v-model="data.StartTransfusionAt" class=" select-boox" :format="vDateTimeFormat"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <table class="table table-bordered table-bordered-x no-margin middel-table">
          <tr>
            <th class="no-wrap" width="1">{{__t('Thời gian')}}</th>
            <th class="text-center" width="1"><div class="no-wrap">{{__t('Tốc độ truyền')}}</div><div class="note-text">{{__t('(mm/h)')}}</div></th>
            <th class="text-center" width="1"><div class="no-wrap">{{__t('Màu sắc da, niêm mạc')}}</div></th>
            <th class="text-center" width="1"><div class="no-wrap">{{__t('Nhịp thở')}}</div><div class="note-text">{{__t('(1/phút)')}}</div></th>
            <th class="text-center" width="1"><div class="no-wrap">{{__t('Huyết áp')}}</div><div class="note-text">{{__t('(mmHg)')}}</div></th>
            <th class="text-center" width="1"><div class="no-wrap">{{__t('Thân nhiệt')}}</div><div class="note-text">{{__t('(Độ C)')}}</div></th>
            <th>{{__t('Những diễn biến khác')}}</th>
          </tr>
          <tbody v-if="data.Datas && data.Datas.length">
            <tr :key="index" v-for="(item, index) in data.Datas" v-if="!item.Removed">
              <template v-if="isBlock2Confirm || item.CreatedBy !== currentUser">
                <td class="no-wrap"><p>{{item.Time || 'N/A'}}</p></td>
                <td class="no-wrap"><p>{{item.TransfusionSpeed || 'N/A'}}</p></td>
                <td class="no-wrap"><p>{{item.ColorOfSkin || 'N/A'}}</p></td>
                <td class="no-wrap"><p>{{item.BreathsPerMinute || 'N/A'}}</p></td>
                <td class="no-wrap"><p>{{item.PulsePerMinute || 'N/A'}}</p></td>
                <td class="no-wrap"><p>{{item.Temp || 'N/A'}}</p></td>
                <td><p>{{item.Other || 'N/A'}}</p></td>
              </template>
              <template v-else>
                <td style="position: relative">
                  <button v-if="!item.Id" class="btn-pos-left" @click="item.Removed = true"><i class="fa fa-trash" aria-hidden="true"></i></button>
                  <v-date-time-picker v-model="item.Time" class=" select-boox" :format="vDateTimeFormat"/>
                </td>
                <td><input class="form-control" v-model="item.TransfusionSpeed" /></td>
                <td><textarea-autosize rows="2" class="form-control" v-model="item.ColorOfSkin" :placeholder="__t('Nhập')"/></td>
                <td><input class="form-control" v-model="item.BreathsPerMinute" /></td>
                <td><input class="form-control" v-model="item.PulsePerMinute" /></td>
                <td><input class="form-control" v-model="item.Temp" /></td>
                <td><textarea-autosize rows="2" class="form-control" v-model="item.Other" :placeholder="__t('Nhập')"/></td>
              </template>
            </tr>
          </tbody>
          <tr v-else>
            <td colspan="7" class="text-center">{{__t('Chưa có theo dõi')}}</td>
          </tr>
        </table>
        <div class="text-center" v-if="!isBlock2Confirm">
          <button class="btn v-green-btn v-bottom-btn" @click="newData()"><i aria-hidden="true" class="fa fa-plus"></i> {{__t('THÊM THEO DÕI')}}</button>
        </div>
        <br/>
        <div class="row">
          <div class="col-md-3 col-sm-3">
            <label>{{__t('Ngừng truyền hồi')}}:</label>
          </div>
          <div class="col-md-9 col-sm-9">
            <div class="form-group">
              <template v-if="isBlock2Confirm">{{data.StopTransfusionAt || 'N/A'}}</template>
              <v-date-time-picker v-else v-model="data.StopTransfusionAt" class=" select-boox" :format="vDateTimeFormat"/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-sm-3">
            <label>{{__t('Số lượng máu thực tế đã truyền')}}:</label>
          </div>
          <div class="col-md-9 col-sm-9">
            <div class="form-group">
              <template v-if="isBlock2Confirm">{{data.ActualAmountOfBloodTransmitted || 'N/A'}}</template>
              <input v-else class="form-control input-md" v-model="data.ActualAmountOfBloodTransmitted" /> ml
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-sm-3">
            <label>{{__t('Nhận xét quá trình truyền máu')}}:</label>
          </div>
          <div class="col-md-9 col-sm-9">
            <div class="form-group">
              <template v-if="isBlock2Confirm"><p>{{data.Remark || 'N/A'}}</p></template>
              <textarea-autosize v-else rows="2" class="form-control" v-model="data.Remark" :placeholder="__t('Nhập')"/>
            </div>
          </div>
        </div>
        <br/><br/>
        <div class="row">
          <div class="col-md-6 col-sm-6 text-center">
            <div v-if="data.PhysicianConfirmTime">{{data.PhysicianConfirmTime}}</div>
            <p><b>{{__t('Bác sĩ điều trị')}}</b></p>
            <div  v-if="data.PhysicianConfirmTime"><ad-Info :ad="data.Physician.Username" /></div>
            <div v-else>
              <i v-if="viewOnly || data.IsLocked">{{__t('Chưa xác nhận')}}</i>
              <button v-else @click="showDoctorConfirm('Physician', 'Bác sĩ điều trị')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 text-center">
            <div v-if="data.NurseConfirmTime">{{data.NurseConfirmTime}}</div>
            <p><b>{{__t('Điều dưỡng')}}</b></p>
            <div  v-if="data.NurseConfirmTime"><ad-Info :ad="data.Nurse.Username" /></div>
            <div v-else>
              <i v-if="viewOnly || data.IsLocked">{{__t('Chưa xác nhận')}}</i>
              <button v-else @click="showDoctorConfirm('Nurse', 'Điều dưỡng')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
            </div>
          </div>
        </div>
        <br/><br/>
      </div>
      <br/><br/>
      <div>
        <logs v-if="!viewOnly" :EdId="this.Id" :Type="'BloodTransfusionChecklist/Detail'" :noDetail="true" />
        <p>A02_74_260421_VE</p>
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="data.UpdatedBy" :ad="data.UpdatedBy" /> {{__t('lúc')}} {{ data.UpdatedAt | formatDateHourMinutesDDMMYYY }}</p>
      </div>
    </div>
    <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t(popupTitle)}}.</h3>
          <div style="color: #fff">{{__t('Vui lòng nhập tài khoản ad để xác nhận')}}</div>
        </div>
        <div class="form-confirm">
          <div class="form-group has-feedback">
            <input v-model="user.username" type="text" class="form-control" :placeholder="__t('Tên đăng nhập')"/>
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input v-model="user.password" type="password" class="form-control current-password" :placeholder="__t('Mật khẩu')"/>
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-white-btn" @click="$modal.hide('doctorConfirm')">{{__t('Thoát')}}</button>
            </div>
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-yellow-btn" @click="confirm()">{{__t('Xác nhận')}}</button>
            </div>
          </div>
          <p style="margin-top: 10px; text-align:center">{{__t('Sử dụng tài khoản máy tính')}}</p>
          <p style="margin-top: 10px; text-align:center">{{__t('Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu')}}</p>
        </div>
      </div>
    </modal>
    <div class="status-float-block" v-if="!viewOnly && !data.IsLocked">
      <div class="action-btn-block">
        <div class="container">
          <div class="content-container">
            <div class="row">
              <div class="col-md-2 col-sm-2">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="handleBack"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group1">
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
                <div class="form-group1">
                  <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"  v-shortkey="['ctrl', 's']" @shortkey="save()" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></div>
    <!-- ver2 -->
    <div v-else><div class="box-collapse no-border" :class="{'open': open1}">
      <div class="d-flex flex-center brsac-form pointer-none mt-10 mb-10">
        <div class="text-center group-radio">
          <input type="radio" id="item_01" name="status" value="false" v-model="data.IsFrequently">
          <label class="no-margin" for="item_01">{{__t("Cấp cứu ")}}</label>
          <input type="radio" id="item_02" name="status" value="true" v-model="data.IsFrequently">
          <label class="no-margin" for="item_02">{{__t("Thường quy")}}</label>
        </div>
      </div>
      <div class="box-collapse-title">
        <b>{{__t('PHẦN I: XÉT NGHIỆM HÒA HỢP MIỄN DỊCH TRUYỀN MÁU')}}</b>
        <div class="collapse-box-action" @click="open1 = !open1">
          <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
          <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
        </div>
      </div>
      <div class="box-collapse-content">
        <div class="border-center">
          <div class="row">
            <div class="col-md-6 col-sm-6">
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Chẩn đoán')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <div v-if="data.Diagnosis !== null" class="fake-input disable ml-0"><p class="mb-0">{{data.Diagnosis}}</p></div>
                    <div v-else class="fake-input disable ml-0"><p class="mb-0">{{'N/A'}}</p></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Khoa/ Phòng')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <div class="fake-input disable ml-0">{{__label(data.Specialty)}}</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Số giường')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <template v-if="isBlock1Confirm">{{data.BedNo || 'N/A'}}</template>
                    <input v-else class="form-control input-md" v-model="data.BedNo" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Loại chế phẩm truyền')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <template v-if="isBlock1Confirm">{{data.TypeOfBloodProducts || 'N/A'}}</template>
                    <v-select v-else class='select-full-w' @onSelect="onSelect" :search="true" v-model="data.TypeOfBloodProducts" :placeholder="__t('Nhập')" :items="BloodNames"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Số lượng')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <template v-if="isBlock1Confirm">{{data.Quanlity}}</template>
                    <div v-else class="d-flex flex-center w140">
                      <MDNumberInput :decimal="true" v-model="data.Quanlity"/>
                      <p class="ml-5 my-0">ml</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Tên người cho máu/ Mã số')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <template v-if="isBlock1Confirm">{{data.Code || 'N/A'}}</template>
                    <v-select v-else class='select-full-w' @onSelect="onSelectCode" :search="true" v-model="data.Code" :placeholder="__t('Nhập')" :items="BloodCodes"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Ngày lấy máu/ Điều chế')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <template v-if="isBlock1Confirm">{{data.DateOfBloodCollection || 'N/A'}}</template>
                    <v-date-picker v-else :hideTooltip="true" v-model="data.DateOfBloodCollection" class="full-w" :format="vDateFormat"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Hạn dùng')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="form-group">
                    <template v-if="isBlock1Confirm">{{data.Expiry || 'N/A'}}</template>
                    <v-date-picker v-else :hideTooltip="true" :allday="'allday'" v-model="data.Expiry" class="full-w" :format="vDateFormat"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-3">
                  <label>{{__t('Thời gian rã đông (plasma)')}}:</label>
                </div>
                <div class="col-md-9 col-sm-9">
                  <div class="row">
                    <div class="col-md-6">
                      <VDateTimePicker3 :readonly="isBlock1Confirm" v-model="data.ThawedTimeAt" :max="data.ThawedTimeTo" :format="vDateTimeFormat"/>
                    </div>
                    <div style="padding-left: 7px;" class="col-md-6">
                      <VDateTimePicker3 :readonly="isBlock1Confirm" v-model="data.ThawedTimeTo" :min="data.ThawedTimeAt" :format="vDateTimeFormat"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="boxed border-center">
          <div class="row">
            <div class="col-md-6 col-sm-6">
              <div class="row">
                <div class="col-md-5 col-sm-5">
                  <label>{{__t('Nhóm máu ABO người bệnh')}}:</label>
                </div>
                <div class="col-md-7 col-sm-7">
                  <div class="form-group">
                    <div class="fake-input disable sm-fake-input">{{data.PatientBloodTypeABO || 'N/A'}}</div> Rh: <div class="fake-input disable sm-fake-input">{{data.PatientBloodTypeRH || 'N/A'}}</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5 col-sm-5">
                  <label>{{__t('Nhóm máu ABO người cho')}}:</label>
                </div>
                <div class="col-md-7 col-sm-7">
                  <div class="form-group">
                    <div class="fake-input disable sm-fake-input">{{data.DonorBloodTypeABO || 'N/A'}}</div> Rh: <div class="fake-input disable sm-fake-input">{{data.DonorBloodTypeRH || 'N/A'}}</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <label>{{__t('Các xét nghiệm khác')}}:</label>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <div :class="{'pointer-none': isBlock1Confirm}" class="group-radio no-flex" v-if="OtherCheckTestsInput">
                      <span :data="item" :key="'EIOSOSCSOISNC-' + index" v-for="(item,index) in OTHERTESTS">
                        <input :disabled="isBlock1Confirm" type="checkbox" :id="'EIOSOSCSOISNCradio-' + index" v-model="OtherCheckTestsInput[index]">
                        <label :for="'EIOSOSCSOISNCradio-' + index">{{__t(item.label)}}</label>
                      </span>
                    </div>
                  </div>
                  <template v-if="OtherCheckTestsInput[5]">
                    <template v-if="isBlock1Confirm">{{data.OtherTests || 'N/A'}}</template>
                    <textarea-autosize v-else rows="2" class="form-control" v-model="data.OtherTests" :placeholder="__t('Nhập')" />
                  </template>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label>{{__t('Kết quả xét nghiệm hòa hợp')}}:</label>
              <table class="table table-bordered table-bordered-x no-margin middel-table">
                <tr>
                  <th></th>
                  <th>{{__t('Môi trường muối')}}</th>
                  <th>{{__t('Môi trường AHG')}}</th>
                </tr>
                <tr>
                  <th>{{__t('Ống 1')}}</th>
                  <td>
                    <template v-if="isBlock1Confirm">{{data.MajorCrossMatchSalt || 'N/A'}}</template>
                    <v-select v-else :disabeleclear="true" class='select-full-w' v-model="data.MajorCrossMatchSalt" :placeholder="__t('Chọn')" :items="DataSelect"/>
                  </td>
                  <td>
                    <template v-if="isBlock1Confirm">{{data.MajorCrossMatchAntiGlobulin || 'N/A'}}</template>
                    <v-select v-else :disabeleclear="true" class='select-full-w' v-model="data.MajorCrossMatchAntiGlobulin" :placeholder="__t('Chọn')" :items="DataSelect"/>
                  </td>
                </tr>
                <tr>
                  <th>{{__t('Ống 2')}}</th>
                  <td>
                    <template v-if="isBlock1Confirm">{{data.MinorCrossMatchSalt || 'N/A'}}</template>
                    <v-select v-else :disabeleclear="true" class='select-full-w' v-model="data.MinorCrossMatchSalt" :placeholder="__t('Chọn')" :items="DataSelect"/>
                  </td>
                  <td>
                    <template v-if="isBlock1Confirm">{{data.MinorCrossMatchAntiGlobulin || 'N/A'}}</template>
                    <v-select v-else :disabeleclear="true" class='select-full-w' v-model="data.MinorCrossMatchAntiGlobulin" :placeholder="__t('Chọn')" :items="DataSelect"/>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <br/><br/>
        <div class="row">
          <div class="col-md-4 col-sm-4 text-center">
            <div v-if="data.HeadOfLabConfirmTime">{{data.HeadOfLabConfirmTime}}</div>
            <p><b>{{__t('Người phụ trách xét nghiệm')}}</b></p>
            <div  v-if="data.HeadOfLabConfirmTime"><ad-Info :ad="data.HeadOfLab.Username" /></div>
            <div v-else>
              <i v-if="viewOnly || data.IsLocked">{{__t('Chưa xác nhận')}}</i>
              <button v-else @click="showDoctorConfirm('HeadOfLab', 'Người phụ trách xét nghiệm')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
            </div>
          </div>
          <div class="col-md-4 col-sm-4 text-center">
            <div v-if="data.FirstTechnicianConfirmTime">{{data.FirstTechnicianConfirmTime}}</div>
            <p><b>{{__t('Người làm xét nghiệm thứ 1')}}</b></p>
            <div  v-if="data.FirstTechnicianConfirmTime"><ad-Info :ad="data.FirstTechnician.Username" /></div>
            <div v-else>
              <i v-if="viewOnly || data.IsLocked">{{__t('Chưa xác nhận')}}</i>
              <button v-else @click="showDoctorConfirm('FirstTechnician', 'Người làm xét nghiệm thứ 1')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
            </div>
          </div>
          <div class="col-md-4 col-sm-4 text-center" >
            <div v-if="data.SecondTechnicianConfirmTime">{{data.SecondTechnicianConfirmTime}}</div>
            <p><b>{{__t('Người làm xét nghiệm thứ 2')}}</b></p>
            <div  v-if="data.SecondTechnicianConfirmTime"><ad-Info :ad="data.SecondTechnician.Username" /></div>
            <div v-else>
              <i v-if="viewOnly || data.IsLocked">{{__t('Chưa xác nhận')}}</i>
              <button v-else @click="showDoctorConfirm('SecondTechnician', 'Người làm xét nghiệm thứ 2')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
            </div>
          </div>
        </div>
        <br/><br/>
      </div>
    </div>
    <div class="box-collapse no-border" :class="{'open': open2}">
      <div class="box-collapse-title">
        <b>{{__t('PHẦN II: THEO DÕI TRUYỀN MÁU LÂM SÀNG')}}</b>
        <div class="collapse-box-action" @click="open2 = !open2">
          <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
          <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
        </div>
      </div>
      <div class="box-collapse-content">
        <div class="border-center">
          <div class="row">
            <div class="col-md-6 col-sm-6">
              <div class="row">
                <div class="col-md-5 col-sm-5">
                  <label>{{__t('Lần truyền máu thứ')}}:</label>
                </div>
                <div class="col-md-7 col-sm-7">
                  <div v-if="isBlock2Confirm" class="form-group">
                    <div class="fake-input disable sm-fake-input">{{data.NumberOfBloodTransfusion || 'N/A'}}</div>
                  </div>
                  <div v-else class="form-group w140">
                    <MDNumberInput :decimal="false" v-model="data.NumberOfBloodTransfusion"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5 col-sm-5">
                  <label>{{__t('Định nhóm người cho')}}:</label>
                </div>
                <div class="col-md-7 col-sm-7">
                  <div class="form-group">
                    <div class="fake-input disable sm-fake-input">Nhóm máu {{data.DonorBloodTypeABO || 'N/A'}} Rh {{data.DonorBloodTypeRH || 'N/A'}}</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5 col-sm-5">
                  <label>{{__t('Định nhóm người nhận')}}:</label>
                </div>
                <div class="col-md-7 col-sm-7">
                  <div class="form-group">
                    <div class="fake-input disable sm-fake-input">Nhóm máu {{data.PatientBloodTypeABO || 'N/A'}} Rh {{data.PatientBloodTypeRH || 'N/A'}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="row">
                <div class="col-md-5 col-sm-5">
                  <label>{{__t('Phản ứng chéo tại giường')}}:</label>
                </div>
                <div class="col-md-7 col-sm-7">
                  <div class="form-group">
                    <template v-if="isBlock2Confirm">{{data.Crossmatch || 'N/A'}}</template>
                    <v-select v-else :disabeleclear="false" class='select-full-w' v-model="data.Crossmatch" :placeholder="__t('Chọn')" :items="HarmonyList"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5 col-sm-5">
                  <label>{{__t('Bắt đầu truyền hồi')}}:</label>
                </div>
                <div class="col-md-7 col-sm-7">
                  <div class="form-group">
                    <template v-if="isBlock2Confirm">{{data.StartTransfusionAt || 'N/A'}}</template>
                    <v-date-time-picker v-else v-model="data.StartTransfusionAt" class=" select-boox" :format="vDateTimeFormat"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <table class="table table-bordered table-bordered-x no-margin middel-table">
          <tr>
            <th class="no-wrap" width="1">{{__t('Thời điểm mh')}}</th>
            <th class="no-wrap" width="1">{{__t('Thời gian')}}</th>
            <th class="text-center" width="1"><div class="no-wrap">{{__t('Tốc độ truyền')}}</div><div class="note-text">{{__t('(mm/h)')}}</div></th>
            <th class="text-center"><div>{{__t('Màu sắc da, niêm mạc')}}</div></th>
            <th class="text-center" style="width: 8%;"><div>{{__t('Nhịp thở')}}</div><div class="note-text">{{__t('(1/phút)')}}</div></th>
            <th class="text-center" style="width: 8%;"><div class="no-wrap">{{__t('Huyết áp')}}</div><div class="note-text">{{__t('(mmHg)')}}</div></th>
            <th class="text-center" width="1"><div class="no-wrap">{{__t('Thân nhiệt')}}</div><div class="note-text">{{__t('(Độ C)')}}</div></th>
            <th>{{__t('Những diễn biến khác')}}</th>
            <th width="1">{{__t('Người thêm')}}</th>
          </tr>
          <tbody v-if="data.Datas && data.Datas.length">
            <tr :key="index" v-for="(item, index) in data.Datas">
              <template v-if="isBlock2Confirm || item.CreatedBy !== currentUser">
                <td class="no-wrap"><p>{{__t(getPreiod(item.Period)) || 'N/A'}}</p></td>
                <td class="no-wrap"><p>{{item.Time || 'N/A'}}</p></td>
                <td class="no-wrap"><p>{{item.TransfusionSpeed || 'N/A'}}</p></td>
                <td class="no-wrap"><p>{{item.ColorOfSkin || 'N/A'}}</p></td>
                <td class="no-wrap"><p>{{item.BreathsPerMinute || 'N/A'}}</p></td>
                <td class="no-wrap"><p>{{item.PulsePerMinute || 'N/A'}}</p></td>
                <td class="no-wrap"><p>{{item.Temp || 'N/A'}}</p></td>
                <td><p>{{item.Other || 'N/A'}}</p></td>
                <td><ad-Info :ad="item.CreatedBy"/></td>
              </template>
              <template v-else>
                <td style="position: relative">
                  <button class="btn-pos-left" v-if="item.CreatedBy === currentUser && !viewOnly" @click="handleRemoveItem(item, index)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                  <v-select :disabeleclear="false" class='select-full-w' v-model="item.Period" :placeholder="__t('Chọn')" :items="PeriodList"/>
                </td>
                <td><v-date-time-picker v-model="item.Time" class=" select-boox" :format="vDateTimeFormat"/></td>
                <td><textarea-autosize rows="2" class="form-control" v-model="item.TransfusionSpeed" :placeholder="__t('Nhập')"/></td>
                <td><textarea-autosize rows="2" class="form-control" v-model="item.ColorOfSkin" :placeholder="__t('Nhập')"/></td>
                <td>
                  <MDNumberInput :decimal="false" v-model="item.BreathsPerMinute"/>
                </td>
                <td>
                  <MDNumberInput :maxlength="7" :pulse="true" v-model="item.PulsePerMinute"/>
                </td>
                <td>
                  <MDNumberInput :decimal="true" v-model="item.Temp"/>
                </td>
                <td><textarea-autosize rows="2" class="form-control" v-model="item.Other" :placeholder="__t('Nhập')"/></td>
                <td><ad-Info :ad="item.CreatedBy"/></td>
              </template>
            </tr>
          </tbody>
          <tr v-else>
            <td colspan="9" class="text-center">{{__t('Chưa có theo dõi')}}</td>
          </tr>
        </table>
        <div class="text-center" v-if="!isBlock2Confirm">
          <button class="btn v-green-btn v-bottom-btn" @click="newData()"><i aria-hidden="true" class="fa fa-plus"></i> {{__t('THÊM THEO DÕI')}}</button>
        </div>
        <br/>
        <div class="row">
          <div class="col-md-3 col-sm-3">
            <label>{{__t('Ngừng truyền hồi')}}:</label>
          </div>
          <div class="col-md-9 col-sm-9">
            <div class="form-group">
              <template v-if="isBlock2Confirm">{{data.StopTransfusionAt || 'N/A'}}</template>
              <v-date-time-picker v-else v-model="data.StopTransfusionAt" class=" select-boox" :format="vDateTimeFormat"/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-sm-3">
            <label>{{__t('Số lượng máu thực tế đã truyền')}}:</label>
          </div>
          <div class="col-md-9 col-sm-9">
            <div class="form-group">
              <template v-if="isBlock2Confirm">{{data.ActualAmountOfBloodTransmitted || 'N/A'}}</template>
              <div v-else class="d-flex flex-center w140">
                <MDNumberInput :decimal="true" v-model="data.ActualAmountOfBloodTransmitted"/>
                <p class="ml-5 my-0">ml</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-sm-3">
            <label>{{__t('Nhận xét quá trình truyền máu')}}:</label>
          </div>
          <div class="col-md-9 col-sm-9">
            <div class="form-group">
              <template v-if="isBlock2Confirm"><p>{{data.Remark || 'N/A'}}</p></template>
              <v-select v-else class='select-full-w' v-model="data.Remark" :placeholder="__t('Chọn')" :items="RemarkList"/>
            </div>
          </div>
        </div>
        <br/><br/>
        <div class="row">
          <div class="col-md-6 col-sm-6 text-center">
            <div v-if="data.PhysicianConfirmTime">{{data.PhysicianConfirmTime}}</div>
            <p><b>{{__t('Bác sĩ điều trị tm')}}</b></p>
            <div  v-if="data.PhysicianConfirmTime"><ad-Info :ad="data.Physician.Username" /></div>
            <div v-else>
              <i v-if="viewOnly || data.IsLocked">{{__t('Chưa xác nhận')}}</i>
              <button v-else @click="showDoctorConfirm('Physician', 'Bác sĩ điều trị')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 text-center">
            <div v-if="data.NurseConfirmTime">{{data.NurseConfirmTime}}</div>
            <p><b>{{__t('Điều dưỡng')}}</b></p>
            <div  v-if="data.NurseConfirmTime"><ad-Info :ad="data.Nurse.Username" /></div>
            <div v-else>
              <i v-if="viewOnly || data.IsLocked">{{__t('Chưa xác nhận')}}</i>
              <button v-else @click="showDoctorConfirm('Nurse', 'Điều dưỡng')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
            </div>
          </div>
        </div>
        <br/><br/>
      </div>
      <br/><br/>
      <div>
        <logs v-if="!viewOnly" :EdId="this.Id" :Type="'BloodTransfusionChecklist/Detail'" :noDetail="true" />
        <p>A02_74_080322_VE</p>
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="data.UpdatedBy" :ad="data.UpdatedBy" /> {{__t('lúc')}} {{ data.UpdatedAt | formatDateHourMinutesDDMMYYY}}</p>
      </div>
    </div>
    <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t(popupTitle)}}.</h3>
          <div style="color: #fff">{{__t('Vui lòng nhập tài khoản ad để xác nhận')}}</div>
        </div>
        <div class="form-confirm">
          <div class="form-group has-feedback">
            <input v-model="user.username" type="text" class="form-control" :placeholder="__t('Tên đăng nhập')"/>
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input v-model="user.password" type="password" class="form-control current-password" :placeholder="__t('Mật khẩu')"/>
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-white-btn" @click="$modal.hide('doctorConfirm')">{{__t('Thoát')}}</button>
            </div>
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-yellow-btn" @click="confirm()">{{__t('Xác nhận')}}</button>
            </div>
          </div>
          <p style="margin-top: 10px; text-align:center">{{__t('Sử dụng tài khoản máy tính')}}</p>
          <p style="margin-top: 10px; text-align:center">{{__t('Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu')}}</p>
        </div>
      </div>
    </modal>
    <div class="status-float-block" v-if="!viewOnly && !data.IsLocked">
      <div class="action-btn-block">
        <div class="container">
          <div class="content-container">
            <div class="row">
              <div class="col-md-2 col-sm-2">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="handleBack"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group1">
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
                <div class="form-group1">
                  <button v-if="!isBlock1Confirm || !isBlock2Confirm" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"  v-shortkey="['ctrl', 's']" @shortkey="save()" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  </div>
</template>
<script>

import BloodTransfusionChecklist from '@/services/ED/BloodTransfusionChecklist'
import Customer from '@/services/IPD/Customer'
import VSelect from '@/components/VSelect.vue'
import moment from 'moment'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import VDateTimePicker3 from '@/components/VDateTimePicker3.vue'
import constants from '@/constants'
import Logs from '@/components/Logs.vue'
import DateTimePicker from 'vue2-datepicker'
import $ from 'jquery'
export default {
  /**
   * The name of the page.
   */
  name: 'BloodTransfusionChecklistItem',
  props: ['formId', 'viewOnly', 'VisitId', 'VisitType'],
  data () {
    return {
      timeNow: moment().format('HH:mm DD/MM/YYYY'),
      opd: null,
      TableDeleted: [],
      MAJORCROSS: constants.MAJORCROSS,
      CROSSMATCH: constants.CROSSMATCH,
      OTHERTESTS: constants.OTHERTESTS,
      Id: this.formId || this.$route.params.Item,
      currentUser: '',
      OtherCheckTestsInput: [false, false, false, false, false, false, false, false, false, false],
      open1: true,
      open2: true,
      data: {
      },
      BloodNames: [],
      BloodCodes: [],
      Quanlity: [],
      popupTitle: '',
      user: {},
      inputProps: {
        // id: 'autosuggest__input',
        class: 'form-control',
        placeholder: 'Nhập'
      },
      loaded: false,
      firstData: null,
      Version: 1,
      removeList: [],
      HarmonyList: [
        {
          value: 'Hòa hợp',
          label: this.$t('Hòa hợp')
        },
        {
          value: 'Không hòa hợp',
          label: this.$t('Không hòa hợp')
        }
      ],
      PeriodList: [
        {
          value: 1,
          label: this.$t('Trước truyền')
        },
        {
          value: 2,
          label: this.$t('Trong truyền')
        },
        {
          value: 3,
          label: this.$t('Sau truyền')
        }
      ],
      dataMaster: null,
      checkEdited: false,
      RemarkList: [
        {
          value: 'Không có phản ứng truyền máu',
          label: this.$t('Không có phản ứng truyền máu')
        },
        {
          value: 'Phản ứng truyền máu mức độ nhẹ',
          label: this.$t('Phản ứng truyền máu mức độ nhẹ')
        },
        {
          value: 'Phản ứng truyền máu mức độ trung bình',
          label: this.$t('Phản ứng truyền máu mức độ trung bình')
        },
        {
          value: 'Phản ứng truyền máu mức độ nặng',
          label: this.$t('Phản ứng truyền máu mức độ nặng')
        }
      ],
      DataSelect: [
        {
          value: 'Âm tính',
          label: this.$t('Âm tính')
        },
        {
          value: 'Dương tính 1+',
          label: this.$t('Dương tính 1+')
        },
        {
          value: 'Dương tính 2+',
          label: this.$t('Dương tính 2+')
        },
        {
          value: 'Dương tính 3+',
          label: this.$t('Dương tính 3+')
        },
        {
          value: 'Dương tính 4+',
          label: this.$t('Dương tính 4+')
        },
        {
          value: 'Không thực hiện',
          label: this.$t('Không thực hiện')
        }
      ]
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VSelect,
    VDateTimePicker,
    DateTimePicker,
    VDateTimePicker3,
    Logs
  },
  mounted () {
    this.data.TableDeleted = []
    this.currentUser = this.$store.state.account.Username
    this.getData()
    for (let index = 0; index < 10; index++) {
      this.Quanlity.push({
        value: String(index + 1),
        label: String(index + 1)
      })
    }
  },
  computed: {
    IPDIAAULANG: function () {
      return this.DataSelect.map((e) => e.label)
    },
    HarmonyListMap: function () {
      return this.HarmonyList.map((e) => e.label)
    },
    isBlock1Confirm () {
      if (this._VisitType === 'IPD') {
        return this.viewOnly || (this.data.HeadOfLabConfirmTime || this.data.FirstTechnicianConfirmTime || this.data.SecondTechnicianConfirmTime) || this.data.IsLocked || !this.hasRole('IBLTC4')
      } else {
        return this.viewOnly || (this.data.HeadOfLabConfirmTime || this.data.FirstTechnicianConfirmTime || this.data.SecondTechnicianConfirmTime) || this.data.IsLocked || !this.hasRole('EBLTC4')
      }
    },
    isBlock2Confirm () {
      if (this._VisitType === 'IPD') {
        return this.viewOnly || (this.data.PhysicianConfirmTime || this.data.NurseConfirmTime) || this.data.IsLocked || !this.hasRole('IBLTC4')
      } else {
        return this.viewOnly || (this.data.PhysicianConfirmTime || this.data.NurseConfirmTime) || this.data.IsLocked || !this.hasRole('EBLTC4')
      }
    }
  },
  watch: {
    formId () {
      this.getData()
    },
    MASTERDATA: {
      handler () {
        if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
          this.checkEdited = true
        }
      },
      deep: true
    }
  },
  methods: {
    getPreiod (value) {
      if (value === 1) {
        return 'Trước truyền'
      } else if (value === 2) {
        return 'Trong truyền'
      } else {
        return 'Sau truyền'
      }
    },
    handleRemoveItem (item, inde) {
      if (item.Id) {
        this.removeList.push(item.Id)
        this.data.TableDeleted = this.removeList
      }
      console.log('data', this.data.TableDeleted)
      this.data.Datas = this.data.Datas.filter((_, index) => index !== inde)
    },
    getNamePeriod (name) {
      if (name === 1) {
        return 'Trước truyền'
      } else if (name === 2) {
        return 'Trong truyền'
      } else if (name === 3) {
        return 'Sau truyền'
      } else {
        return 'N/A'
      }
    },
    onlyNumber (event, value) {
      let keyCode = event.keyCode ? event.keyCode : event.which
      console.log('key code', this.data.Quanlity)
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        event.preventDefault()
      } else {
        if (this.data.Quanlity && this.data.Quanlity.length > 5) {
          this.data.Quanlity = this.data.Quanlity.slice(0, 5)
        }
      }
    },
    setNow (type) {
      this.data[type] = moment(new Date()).format(this.vDateTimeFormat)
    },
    notBeforeThawedTimeAt (date) {
      if (!this.data.ThawedTimeAt) {
        return false
      }
      return moment(date) <= moment(this.data.ThawedTimeAt, this.vDateTimeFormat).add(-1, 'days')
    },
    minutesOfDay (m) {
      return m.minutes() + m.hours() * 60
    },
    notBeforeTimeThawedTimeAt (date) {
      if (!this.data.ThawedTimeAt) {
        return false
      }
      return this.minutesOfDay(moment(date)) < this.minutesOfDay(moment(this.data.ThawedTimeAt, this.vDateTimeFormat)) && moment(date) <= moment(this.data.ThawedTimeAt, this.vDateTimeFormat)
    },
    notAfterThawedTimeTo (date) {
      if (!this.data.ThawedTimeTo) {
        return false
      }
      return moment(date) > moment(this.data.ThawedTimeTo, this.vDateTimeFormat)
    },
    save () {
      if (this.data.ThawedTimeTo === 'Invalid date') {
        this.data.ThawedTimeTo = null
      }
      if (this.data.ThawedTimeAt === 'Invalid date') {
        this.data.ThawedTimeAt = null
      }
      var OtherCheckTests = this.OtherCheckTestsInput.map((e, index) => {
        if (e) return this.OTHERTESTS[index].value
        return false
      })
      this.data.OtherCheckTests = OtherCheckTests.filter(e => e).join(',')
      this.data.Datas = this.data.Datas.filter(e => !e.Removed)
      // const params = {
      //   ...this.data,
      //   ...this.TableDeleted
      // }
      new BloodTransfusionChecklist({}, this._VisitType).update('Detail/' + this.Id, this.data).then(response => {
        if (response.ViMessage !== 'Thành công') {
          this.toastedError(response.ViMessage)
        } else {
          this.toastedSuccess()
        }
        this.getData()
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    confirm () {
      this.save()
      new BloodTransfusionChecklist({}, this._VisitType).update('Confirm/' + this.Id, this.user).then(response => {
        this.toastedSuccess(this.$t('Xác nhận thành công')).getData()
        this.$modal.hide('doctorConfirm')
      }).catch(e => {
        // this.back()
      })
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    newData () {
      this.data.Datas.push({
        Time: moment().format('HH:mm DD/MM/YYYY'),
        TransfusionSpeed: '',
        ColorOfSkin: '',
        BreathsPerMinute: '',
        PulsePerMinute: '',
        Temp: '',
        Other: '',
        Removed: false,
        CreatedBy: this.currentUser,
        isDelete: false
      })
      console.log('new data', this.data.Datas)
    },
    onSelectCode (item) {
      if (item.value) {
        this.data.DonorBloodTypeABO = item.BloodTypeABO
        this.data.DonorBloodTypeRH = item.BloodTypeRH
      } else {
        this.data.DonorBloodTypeABO = 'N/A'
        this.data.DonorBloodTypeRH = 'N/A'
      }
    },
    onSelect (item) {
      this.BloodCodes = []
      if (item.value) {
        this.data.Supplies.filter(e => e.Name === item.value).forEach(name => {
          name.Datas.forEach(e => {
            if (e.Code) {
              this.BloodCodes.push({
                value: e.Code,
                label: e.Code,
                ...e
              })
            }
          })
        })
        if (this.BloodCodes.length === 1) {
          this.data.Code = this.BloodCodes[0].Code
          this.data.DonorBloodTypeABO = this.BloodCodes[0].BloodTypeABO
          this.data.DonorBloodTypeRH = this.BloodCodes[0].BloodTypeRH
        } else {
          this.data.Code = ''
          this.data.DonorBloodTypeABO = 'N/A'
          this.data.DonorBloodTypeRH = 'N/A'
        }
      } else {
        this.data.DonorBloodTypeABO = 'N/A'
        this.data.DonorBloodTypeRH = 'N/A'
        // this.data.Quanlity = 0
      }
    },
    getData () {
      if (this._VisitType === 'IPD') {
        new Customer({noLoading: true}).find(this._VisitId).then(response => {
          var opd = response
          var icd = this.getICD10s(opd.DiagnosisAndICD.ICD, opd.DiagnosisAndICD.ICDOption, true)
          this.data.Diagnosis = [opd.DiagnosisAndICD.Diagnosis, opd.DiagnosisAndICD.DiagnosisOption].filter(e => e).join(', ') + ' ' + icd
        })
      }
      this.Id = this.formId || this.$route.params.Item
      this.loaded = false
      this.BloodNames = []
      new BloodTransfusionChecklist({}, this._VisitType).find('Detail/' + this.Id).then(response => {
        this.Version = response.Version
        if (response.ViMessage) {
          this.alert('Lỗi', response.ViMessage)
        } else {
          if (response.IsLocked) {
            $('.add-btn-active').hide()
          }
          this.loaded = true
          this.data = response
          this.data = {
            ...this.data,
            TableDeleted: []
          }
          this.firstData = JSON.stringify(response)
          this.data.Supplies.forEach(element => {
            element.Datas.forEach(e => {
              if (e.Code) {
                this.BloodCodes.push({
                  value: e.Code,
                  label: e.Code,
                  ...e
                })
              }
            })
            if (!this.BloodNames.find(e => e.value === element.Name) && element.Name) {
              this.BloodNames.push({
                value: element.Name,
                label: element.Name,
                ...element
              })
            }
          })
          var tmp = (this.data.OtherCheckTests || '').split(',')
          this.OtherCheckTestsInput = this.OTHERTESTS.map(e => {
            return tmp.includes(e.value)
          })
        }
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        setTimeout(() => {
          this.checkEdited = false
        }, 500)
      })
    },
    // handleBack () {
    //   this.edited = false
    //   if (this.checkEdited) {
    //     this.confirmPopup()
    //   } else {
    //     this.back()
    //   }
    // },
    handleBack () {
      if (this.firstData !== JSON.stringify(this.data)) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    // popup canh bao
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
    }
  }
}
</script>
<style lang="stylus" scoped>
.middel-table th {
  vertical-align: top !important;
  text-align: center !important;
}
</style>
