<template>
  <div>
    <div v-if="loaded">
      <template v-if="DataSubmit.Datas">
        <div v-if="isReadonly || viewOnly">
          <viewOnly
            :DataSubmit="DataSubmit"
            :listDoctor="listDoctor"
            :tableAssessed="tableAssessed"
            :viewOnly="viewOnly"
            :UpdatedAt="UpdatedAt"
            :VisitId="VisitId"
            :formId="formId"
            :FormCode="FormCode"
            @emitDoctorConfirm="showDoctorConfirm($event.TypeConfirm, $event.title)"
          />
        </div>
        <div v-else>
          <div v-if="FormCode === 'A02_016_050919_VE'">
            <!-- Bác sĩ sản khoa -->
            <div
              v-if="MASTERDATA['IPDOAGIANM1']"
              class="flex-box flex-center mb10 mt-10"
            >
              <label
                class="display-inline ml-5 mr-5 w140"
                style="font-weight: bold"
                >{{ __label(MASTERDATA['IPDOAGIANM1']) }}:
              </label>
              <div v-if="listDoctor[0] && listDoctor.length > 0"><ad-Info :ad="listDoctor[0].Username" /></div>
              <p v-else>{{ 'N/A' }}</p>
            </div>
            <!-- Bác sĩ sơ sinh -->
            <div
              v-if="MASTERDATA['IPDOAGIANM3']"
              class="flex-box flex-center mb10"
            >
              <label
                class="display-inline ml-5 mr-5 w140"
                style="font-weight: bold"
                >{{ __label(MASTERDATA['IPDOAGIANM3']) }}:</label
              >
              <div v-if="listDoctor[1] && listDoctor.length > 0"><ad-Info :ad="listDoctor[1].Username" /></div>
              <p v-else>{{ 'N/A' }}</p>
            </div>
            <!-- Nữ hộ sinh -->
            <div
              v-if="MASTERDATA['IPDOAGIANM5']"
              class="flex-box flex-center mb10"
            >
              <label
                class="display-inline ml-5 mr-5 w140"
                style="font-weight: bold"
                >{{ __label(MASTERDATA['IPDOAGIANM5']) }}:</label
              >
              <div v-if="listDoctor[2] && listDoctor.length > 0"><ad-Info :ad="listDoctor[2].Username" /></div>
              <p v-else>{{ 'N/A' }}</p>
            </div>
          </div>
          <table class="table v-table-1 no-margin mt-10">
            <thead style="border-top: 1px #ccc solid">
              <tr v-if="FormCode === 'A02_016_050919_VE'">
                <th rowspan="2" class="text-center align-middle">{{ __t('ForUterineLife2Hours.NVYTDanhGia') }}</th>
                <th rowspan="2" width="10%" class="text-center align-middle">{{ __t('Thời điểm') }}</th>
                <th rowspan="2" width="5%" class="text-center align-middle">
                  {{ __t('Khoảng thời gian sau sinh') }}
                </th>
                <th rowspan="2" width="9%" class="text-center align-middle">{{ __t('Tư thế bé') }}</th>
                <th class="text-center pb-0">{{ __t('Mầu sắc da') }}</th>
                <th rowspan="2" width="8%" class="text-center align-middle">{{ __t('Nhịp tim') }}</th>
                <th rowspan="2" width="8%" class="text-center align-middle">{{ __t('Nhịp thở') }}</th>
                <th rowspan="2" width="8%" class="text-center align-middle">{{ __t('Nhiệt độ') }}</th>
                <th class="text-center pb-0">{{ __t('Trương lực cơ') }}</th>
                <th class="text-center pb-0">{{ __t('Hoạt động') }}</th>
                <th class="text-center pb-0">{{ __t('Mã bú của bé') }}</th>
                <th class="text-center pb-0">{{ __t('Vị trí đặt bé') }}</th>
                <th rowspan="2" width="10%" class="text-center align-middle">{{ __t('ForUterineLife2Hours.GhiChu') }}</th>
              </tr>
              <!-- Ver-2 -->
              <tr v-else>
                <th rowspan="2" class="text-center align-middle">{{ __t('ForUterineLife2Hours.NVYTDanhGiaV2') }}</th>
                <th rowspan="2" width="10%" class="text-center align-middle">{{ __t('Thời điểm') }}</th>
                <th rowspan="2" width="5%" class="text-center align-middle">
                  {{ __t('Khoảng thời gian sau sinh ') }}
                </th>
                <th rowspan="2" width="9%" class="text-center align-middle">{{ __t('Tư thế bé') }}</th>
                <th class="text-center pb-0">{{ __t('Màu da') }}</th>
                <th rowspan="2" width="8%" class="text-center align-middle">{{ __t('Nhịp tim') }}</th>
                <th rowspan="2" width="8%" class="text-center align-middle">{{ __t('Nhịp thở ') }}</th>
                <th rowspan="2" width="8%" class="text-center align-middle">{{ __t('Nhiệt độ') }}</th>
                <th class="text-center pb-0">{{ __t('Trương lực cơ ') }}</th>
                <th class="text-center pb-0">{{ __t('Hoạt động') }}</th>
                <th class="text-center pb-0">{{ __t('Mã bú của bé') }}</th>
                <th class="text-center pb-0">{{ __t('Vị trí đặt bé') }}</th>
                <th rowspan="2" width="10%" class="text-center align-middle">{{ __t('Ghi chú ') }}</th>
              </tr>
              <tr>
                <th class="pt-0 h-45">
                  <div class="dropdown no-wrap">
                    <div class="dropdown-toggle cursor fw200" id="dropdownColour" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fa fa-angle-double-down"></i> {{__t('Ý nghĩa')}}
                    </div>
                    <div class="dropdown-menu" aria-labelledby="dropdownColour">
                      <table style="margin: 0" class="table observation-table table-dropdow">
                        <tr>
                          <td class="fw600 text-center">P</td>
                          <td>{{__t('Da hồng hào')}}</td>
                        </tr>
                        <tr>
                          <td class="fw600 text-center">C</td>
                          <td v-if="FormCode === 'A02_016_050919_VE'">{{__t('Da xanh')}}</td>
                          <!-- Ver-2 -->
                          <td v-else>{{__t('Da xanh ')}}</td>
                        </tr>
                        <tr v-if="FormCode !== 'A02_016_050919_VE'">
                          <td class="fw600 text-center">Y/N</td>
                          <td>{{__t('Bình thường')}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </th>
                <th class="pt-0 h-45">
                  <div v-if="FormCode === 'A02_016_050919_VE'" class="dropdown no-wrap">
                    <div class="dropdown-toggle cursor fw200" id="dropdownColour" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fa fa-angle-double-down"></i> {{__t('Ý nghĩa')}}
                    </div>
                    <div class="dropdown-menu" aria-labelledby="dropdownColour">
                      <table style="margin: 0" class="table observation-table table-dropdow">
                        <tr>
                          <td class="fw600 text-center">Y</td>
                          <td>{{__t('Bình thường')}}</td>
                        </tr>
                        <tr>
                          <td class="fw600 text-center">N</td>
                          <td>{{__t('...')}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </th>
                <th class="pt-0 h-45">
                  <div class="dropdown no-wrap">
                    <div class="dropdown-toggle cursor fw200" id="dropdownActivity" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fa fa-angle-double-down"></i> {{__t('Ý nghĩa')}}
                    </div>
                    <div class="dropdown-menu" aria-labelledby="dropdownActivity">
                      <table style="margin: 0" class="table observation-table table-dropdow">
                        <tr>
                          <td class="fw600 text-center">F</td>
                          <td>{{__t('Đang bú')}}</td>
                        </tr>
                        <tr>
                          <td class="fw600 text-center">C</td>
                          <td>{{__t('Đang trong vòng tay mẹ')}}</td>
                        </tr>
                        <tr>
                          <td class="fw600 text-center">S</td>
                          <td>{{__t('Đang ngủ')}}</td>
                        </tr>
                        <tr v-if="FormCode === 'A02_016_050919_VE'">
                          <td class="fw600 text-center">O</td>
                          <td>{{__t('Khác, ghi rõ')}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </th>
                <th class="pt-0 h-45">
                  <div class="dropdown no-wrap">
                    <div class="dropdown-toggle cursor fw200" id="dropdownFeedingCode" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fa fa-angle-double-down"></i> {{__t('Ý nghĩa')}}
                    </div>
                    <div class="dropdown-menu" aria-labelledby="dropdownFeedingCode">
                      <table style="margin: 0" class="table observation-table table-dropdow">
                        <tr>
                          <td class="fw600 text-center">A</td>
                          <td>{{__t('Mẹ tự cho bú')}}</td>
                        </tr>
                        <tr>
                          <td class="fw600 text-center">B</td>
                          <td>{{__t('Cần NHS, ĐD hỗ trợ')}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </th>
                <th class="pt-0 h-45">
                  <div class="dropdown no-wrap">
                    <div class="dropdown-toggle cursor fw200" id="dropdownFeedingCode" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fa fa-angle-double-down"></i> {{__t('Ý nghĩa')}}
                    </div>
                    <div class="dropdown-menu" aria-labelledby="dropdownFeedingCode">
                      <table style="margin: 0" class="table observation-table table-dropdow">
                        <tr>
                          <td class="fw600 text-center">SS</td>
                          <td>{{__t('Đang ấp da kề da với mẹ')}}</td>
                        </tr>
                        <tr>
                          <td class="fw600 text-center">C</td>
                          <td>{{__t('Tại nôi')}}</td>
                        </tr>
                        <tr>
                          <td class="fw600 text-center">B</td>
                          <td>{{__t('Nằm với mẹ')}}</td>
                        </tr>
                        <tr v-if="FormCode === 'A02_016_050919_VE'">
                          <td class="fw600 text-center">O</td>
                          <td>{{__t('Nơi khác, ghi rõ')}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tr
              v-for="(item, index) in tableAssessed" :key="index"
            >
              <!-- NVYT đánh giá -->
              <td class="text-center" style="position: relative">
                <button v-if="getUser() === item.StaffName" class="btn-pos-left" @click="deleteRow(item.id,index)">
                  <i aria-hidden="true" class="fa fa-trash"></i>
                </button>
                <ad-Info :ad="item.StaffName" />
              </td>
              <!-- Thời điểm -->
              <td @click="checkRowChange(index)">
                <VDatePicker
                  v-if="getUser() === item.StaffName"
                  ref="datePicker"
                  :hideTooltip="false"
                  class="display-inline"
                  :format="'HH:mm DD/MM/YYYY'"
                  v-model="item.Time"
                  @change="checkRowChange(index)"
                />
                <div v-else>
                  <FakeInput v-if="item.Time" v-model="item.Time"/>
                </div>
              </td>
              <!-- Khoảng thời gian sau sinh -->
              <td v-if="FormCode === 'A02_016_050919_VE'" @keyup="checkRowChange(index)">
                <textarea-autosize
                  v-if="getUser() === item.StaffName"
                  v-model="item.IntervalsFromTimeOfBirth"
                  rows="1"
                  class="form-control"
                  :placeholder="__t('Nhập')"
                />
                <div v-else class="text-center">
                  <span class="fake-input disable">{{item.IntervalsFromTimeOfBirth || 'N/A'}}</span>
                </div>
              </td>
              <!-- Ver-2 -->
              <td v-else @keyup="checkRowChange(index)">
                <VNumberInput
                  v-if="getUser() === item.StaffName"
                  class="m-0"
                  v-model="item.IntervalsFromTimeOfBirth"
                  :placeholder="__t('Nhập')"
                />
                <div v-else class="text-center">
                  <span class="fake-input disable">{{item.IntervalsFromTimeOfBirth || 'N/A'}}</span>
                </div>
              </td>
              <!-- Tư thế bé -->
              <td @keyup="checkRowChange(index)">
                <textarea-autosize
                  v-if="getUser() === item.StaffName"
                  v-model="item.PositionOfBaby"
                  rows="1"
                  class="form-control"
                  :placeholder="__t('Nhập')"
                />
                <div v-else class="text-center">
                  <span class="fake-input disable">{{item.PositionOfBaby || 'N/A'}}</span>
                </div>
              </td>
              <!-- Mầu sắc da -->
              <td class="text-center">
                <v-select @change="checkRowChange(index)" v-if="getUser() === item.StaffName" class='select-full-w' v-model="item.Colour" :placeholder="__t('Chọn')" :items="FormCode === 'A02_016_050919_VE' ? colourOption : colourOptionV2 "/>
                <div v-else class="text-center">
                  <span class="fake-input disable">{{item.Colour || 'N/A'}}</span>
                </div>
              </td>
              <!-- Nhịp tim -->
              <td @keyup="checkRowChange(index)">
                <textarea-autosize
                  v-if="getUser() === item.StaffName"
                  v-model="item.HeartRate"
                  rows="1"
                  class="form-control"
                  :placeholder="__t('Nhập')"
                />
                <div v-else class="text-center">
                  <span class="fake-input disable">{{item.HeartRate || 'N/A'}}</span>
                </div>
              </td>
              <!-- Nhịp thở -->
              <td @keyup="checkRowChange(index)">
                <textarea-autosize
                  v-if="getUser() === item.StaffName"
                  v-model="item.Respirations"
                  rows="1"
                  class="form-control"
                  :placeholder="__t('Nhập')"
                />
                <div v-else class="text-center">
                  <span class="fake-input disable">{{item.Respirations || 'N/A'}}</span>
                </div>
              </td>
              <!-- Nhiệt độ -->
              <td @keyup="checkRowChange(index)">
                <textarea-autosize
                  v-if="getUser() === item.StaffName"
                  v-model="item.Temperature"
                  rows="1"
                  class="form-control"
                  :placeholder="__t('Nhập')"
                />
                <div v-else class="text-center">
                  <span class="fake-input disable">{{item.Temperature || 'N/A'}}</span>
                </div>
              </td>
              <!-- Trương lực cơ -->
              <td class="text-center">
                <v-select v-if="FormCode === 'A02_016_050919_VE' && getUser() === item.StaffName" @change="checkRowChange(index)" class='select-full-w' v-model="item.Tone" :placeholder="__t('Chọn')" :items="toneOption"/>
                <textarea-autosize
                  v-else-if="FormCode === 'A02_016_061022_VE' && getUser() === item.StaffName"
                  v-model="item.Tone"
                  rows="1"
                  class="form-control mt-5"
                  :placeholder="__t('Nhập')"
                />
                <div v-else class="text-center">
                  <span class="fake-input disable">{{item.Tone || 'N/A'}}</span>
                </div>
              </td>
              <!-- Hoạt động -->
              <td class="text-center" @keyup="checkRowChange(index)">
                <div v-if="getUser() === item.StaffName">
                  <v-select @change="checkRowChange(index)" v-if="getUser() === item.StaffName" class='select-full-w' v-model="item.Activity" :placeholder="__t('Chọn')" :items="FormCode === 'A02_016_050919_VE' ? activityOption : activityOptionV2"/>
                  <textarea-autosize
                    v-if="item.Activity === 'O'"
                    v-model="item.ActivityText"
                    rows="1"
                    class="form-control mt-5"
                    :placeholder="__t('Nhập')"
                  />
                </div>
                <div v-else class="text-center">
                  <span class="fake-input disable">{{item.Activity || 'N/A'}}</span>
                  <span style="display: block; margin-top: 10px" v-if="item.ActivityText" class="fake-input disable">{{item.ActivityText || 'N/A'}}</span>
                </div>
              </td>
              <!-- Mã bú của bé -->
              <td class="text-center">
                <v-select @change="checkRowChange(index)" v-if="getUser() === item.StaffName" class='select-full-w' v-model="item.FeedingCode" :placeholder="__t('Chọn')" :items="feedingCodeOption"/>
                <div v-else class="text-center">
                  <span class="fake-input disable">{{item.FeedingCode || 'N/A'}}</span>
                </div>
              </td>
              <!-- Vị trí đặt bé -->
              <td class="text-center" @keyup="checkRowChange(index)">
                <div v-if="getUser() === item.StaffName">
                  <v-select @change="checkRowChange(index)" v-if="getUser() === item.StaffName" class='select-full-w' v-model="item.Location" :placeholder="__t('Chọn')" :items="FormCode === 'A02_016_050919_VE' ? locationOption : locationOptionV2"/>
                  <textarea-autosize
                    v-if="item.Location === 'O'"
                    v-model="item.LocationText"
                    rows="1"
                    class="form-control mt-5"
                    :placeholder="__t('Nhập')"
                  />
                </div>
                <div v-else class="text-center">
                  <span class="fake-input disable">{{item.Location || 'N/A'}}</span>
                  <span style="display: block; margin-top: 10px" v-if="item.LocationText" class="fake-input disable">{{item.LocationText || 'N/A'}}</span>
                </div>
              </td>
              <!-- Ghi chú -->
              <td @keyup="checkRowChange(index)">
                <textarea-autosize
                  v-if="getUser() === item.StaffName"
                  v-model="item.Note"
                  rows="1"
                  class="form-control"
                  :placeholder="__t('Nhập')"
                />
                <div v-else class="text-center">
                  <span class="fake-input disable">{{item.Note || 'N/A'}}</span>
                </div>
              </td>
            </tr>
          </table>
          <div class="text-center" v-if="FormCode === 'A02_016_050919_VE' && condition === 'Nurse'">
            <button @click="addRow" class="btn v-green-btn v-bottom-btn">
              <i aria-hidden="true" class="fa fa-plus"></i>
              {{ __t('Thêm mới') }}
            </button>
          </div>
          <div class="text-center" v-if="FormCode === 'A02_016_061022_VE' && !isReadonly">
            <button @click="addRow" class="btn v-green-btn v-bottom-btn">
              <i aria-hidden="true" class="fa fa-plus"></i>
              {{ __t('Thêm mới') }}
            </button>
          </div>
          <!-- Được chuyển đi lúc -->
          <div class="flex-box flex-center mt-10" v-if="MASTERDATA['IPDOAGIANM203']">
            <b class="ml-5 mr-5">{{ __label(MASTERDATA['IPDOAGIANM203']) }}:</b>
            <VDatePicker
              :hideTooltip="false"
              class="display-inline"
              :format="'HH:mm DD/MM/YYYY'"
              v-model="MASTERDATA['IPDOAGIANM203'].Items[0].Value"
            />
          </div>

          <br /><br />
          <table class="ml-5" style="width: 100%">
            <tr>
              <th>
                <label>{{ __t('2 NVYT đã kiểm tra ID') }}:</label>
              </th>
            </tr>
            <tr>
              <th
                v-if="DataSubmit.Confirm"
                style="width: 50%"
                class="text-center"
              >
                <template
                  v-if="DataSubmit.Confirm.MedicalStaff1.UserName"
                >
                  <div style="font-weight: normal">{{ Confirm1 }}</div>
                  <p>{{DataSubmit.Confirm.MedicalStaff1.FullName}}</p>
                  <p>
                    <b v-if="FormCode === 'A02_016_050919_VE'">{{ __t('Nhân viên Y tế 1') }}</b>
                    <b v-else>{{ __t('Nhân viên Y tế 1 ') }}</b>
                  </p>
                  <div>{{ DataSubmit.Confirm.MedicalStaff1.FullName }}</div>
                  <ad-Info :ad="DataSubmit.Confirm.MedicalStaff1.UserName" />
                </template>
                <div v-else>
                  <p class="mb-10">
                    <b v-if="FormCode === 'A02_016_050919_VE'">{{ __t('Nhân viên Y tế 1') }}</b>
                    <b v-else>{{ __t('Nhân viên Y tế 1 ') }}</b>
                  </p>
                  <button
                    @click="
                      showDoctorConfirm('MEDICALSTAFF1', 'Nhân viên Y tế 1')
                    "
                    class="btn v-white-btn"
                  >
                    {{ __t('Xác nhận') }}
                  </button>
                </div>
              </th>
              <th
                v-if="DataSubmit.Confirm"
                style="width: 50%"
                class="text-center"
              >
                <template
                  v-if="DataSubmit.Confirm.MedicalStaff2.UserName"
                >
                  <div style="font-weight: normal">{{ Confirm2 }}</div>
                  <p>
                    <b v-if="FormCode === 'A02_016_050919_VE'">{{ __t('Nhân viên Y tế 2') }}</b>
                    <b v-else>{{ __t('Nhân viên Y tế 2 ') }}</b>
                  </p>
                  <div>{{ DataSubmit.Confirm.MedicalStaff2.FullName }}</div>
                  <ad-Info :ad="DataSubmit.Confirm.MedicalStaff2.UserName" />
                </template>
                <div v-else>
                  <p class="mb-10">
                    <b v-if="FormCode === 'A02_016_050919_VE'">{{ __t('Nhân viên Y tế 2') }}</b>
                    <b v-else>{{ __t('Nhân viên Y tế 2 ') }}</b>
                  </p>
                  <button
                    @click="
                      showDoctorConfirm('MEDICALSTAFF2', 'Nhân viên Y tế 2')
                    "
                    class="btn v-white-btn"
                  >
                    {{ __t('Xác nhận') }}
                  </button>
                </div>
              </th>
            </tr>
          </table>
        </div>
        <br />
        <div v-if="!viewOnly" class="ml-5">
          <p>{{FormCode}}</p>
          <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit" :ad="DataSubmit.UpdateBy" /> {{__t('lúc')}} {{ UpdatedAt }}</p>
        </div>
        <DoctorConfirm
          :popupTitle="popupTitle"
          :TypeConfirm="TypeConfirm"
          @popupSave="popupSave"
        />
        <FloatBlock v-if="!viewOnly" :openBack="true" @handleBack="handleBack">
          <template slot="top" v-if="synced">
            <div style="color: #fff; text-align: right">
              <b>Dữ liệu được đồng bộ từ khoa:</b> {{__t(specialty.ViName)}}
            </div>
          </template>
          <template slot="buttons">
            <div class="col-md-2 col-sm-2"></div>
            <div class="col-md-2">
              <div class="form-group1">
                <p class="hidden-text">hidden-text</p>
              </div>
            </div>
            <div class="col-md-3">
            </div>
            <div class="col-md-5">
              <div v-if="!IsLocked" class="form-group1">
                <button
                  v-if="FormCode === 'A02_016_050919_VE' && condition === 'Nurse'"
                  class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
                  type="button"
                  v-shortkey="['ctrl', 's']"
                  @shortkey="submit()"
                  @click="submit()"
                >
                  <i class="fa fa-floppy-o" aria-hidden="true"></i>
                  {{ __t('btn.luu') }}
                </button>
                <button
                  v-if="FormCode === 'A02_016_061022_VE' && !isReadonly"
                  class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
                  type="button"
                  v-shortkey="['ctrl', 's']"
                  @shortkey="submit()"
                  @click="submit()"
                >
                  <i class="fa fa-floppy-o" aria-hidden="true"></i>
                  {{ __t('btn.luu') }}
                </button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </template>
      <div v-else style="padding: 20px;">
        <div class="text-center">
          <p>{{ __t('Chưa có đánh giá tình trạng trẻ trong 2h sau sinh') }}</p>
          <div v-if="!viewOnly">
            <button v-if="!IsLocked" class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>

<script>
import CreateTable from '@/services/IPD/CreateTable'
import viewOnly from '@/components/IPD/ForNeonatalMaternity/ForUterineLife2HoursView'
import DoctorConfirm from '@/components/IPD/ForNeonatalMaternity/PopupDoctorConfirm.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import InitialAssessment from '@/services/IPD/InitialAssessment'
import VDatePicker from '@/components/VDateTimePicker.vue'
import VSelect from '@/components/VSelect.vue'
import NProgress from 'nprogress'
import Logs from '@/components/Logs.vue'
import RemoveBtn from '../Delete.vue'
import moment from 'moment'
import _ from 'lodash'
export default {
  name: 'IPDInitialAssessmentForUterineLife2Hours',
  components: {
    VDatePicker,
    Logs,
    RemoveBtn,
    DoctorConfirm,
    viewOnly,
    VSelect,
    NProgress
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
    },
    FormCode: {
      type: String,
      default: 'A02_016_050919_VE'
    },
    formId: {
      type: String,
      default: ''
    },
    NewbornCustomerId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentTime: '',
      popupTitle: '',
      TypeConfirm: '',
      tableAssessed: [],
      tableAssessedDelete: [],
      DataSubmit: {},
      colourOption: [
        { value: 'P', label: 'P' },
        { value: 'C', label: 'C' }
      ],
      colourOptionV2: [
        { value: 'P', label: 'P' },
        { value: 'C', label: 'C' },
        { value: 'Y/N', label: 'Y/N' }
      ],
      toneOption: [
        { value: 'Y', label: 'Y' },
        { value: 'N', label: 'N' }
      ],
      activityOption: [
        { value: 'F', label: 'F' },
        { value: 'C', label: 'C' },
        { value: 'S', label: 'S' },
        { value: 'O', label: 'O' }
      ],
      activityOptionV2: [
        { value: 'F', label: 'F' },
        { value: 'C', label: 'C' },
        { value: 'S', label: 'S' }
      ],
      feedingCodeOption: [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' }
      ],
      locationOption: [
        { value: 'SS', label: 'SS' },
        { value: 'C', label: 'C' },
        { value: 'B', label: 'B' },
        { value: 'O', label: 'O' }
      ],
      locationOptionV2: [
        { value: 'SS', label: 'SS' },
        { value: 'C', label: 'C' },
        { value: 'B', label: 'B' }
      ],
      UpdatedAt: '',
      listDoctor: [],
      loaded: false,
      IsLocked: false,
      Confirm1: '',
      Confirm2: '',
      syncInfo: null,
      synced: false,
      historyList: [{
        Code: '',
        Value: ''
      }],
      listTest: [],
      isNew: null,
      oldVisitId: '',
      dataMaster: {},
      tableChanged: false
    }
  },
  mounted () {
    this.getMasterDatas({ Form: 'A02_016_050919_VE' }, () => {
      if (this.FormCode === 'A02_016_050919_VE') {
        this.getInfo()
        this.getListDoctors()
      } else {
        this.getData()
      }
    })
    this.currentTime = moment().format('HH:mm DD/MM/YYYY')
  },
  computed: {
    isReadonly () {
      if (this.FormCode === 'A02_016_050919_VE') {
        if (this.DataSubmit.Confirm) {
          return this.IsLocked || this.DataSubmit.Confirm.MedicalStaff1.UserName || this.DataSubmit.Confirm.MedicalStaff2.UserName
        }
      } else {
        return this.IsLocked || (this.DataSubmit.Confirm && this.DataSubmit.Confirm.MedicalStaff1.UserName) || (this.DataSubmit.Confirm && this.DataSubmit.Confirm.MedicalStaff2.UserName) || !this.hasRole('IPDUPDATE2HOURSV2')
      }
      // return false
    },
    condition () {
      let name = ''
      if (this.$store.state.account.Position.includes('Nurse')) {
        name = 'Nurse'
      }
      if (this.$store.state.account.Position.includes('Doctor')) {
        name = 'Doctor'
      }
      return name
    },
    _ItemId: function () {
      return this.formId || this.$route.params.Item
    }
  },
  methods: {
    createTable () {
      this.loaded = false
      console.log('tableAssessed', this.tableAssessed)
      let Table = []
      for (let i = 0; i < this.tableAssessed.length; i++) {
        console.log('i', this.tableAssessed[i])
        if (this.tableAssessed[i].id === '123' && this.tableAssessed[i].Changed) {
          const createTableData = {
            RowData: [
              {
                Code: 'Activity',
                Value: this.tableAssessed[i].Activity,
                Id: ''
              },
              {
                Code: 'ActivityText',
                Value: this.tableAssessed[i].ActivityText,
                Id: ''
              },
              {
                Code: 'Colour',
                Value: this.tableAssessed[i].Colour,
                Id: ''
              },
              {
                Code: 'FeedingCode',
                Value: this.tableAssessed[i].FeedingCode,
                Id: ''
              },
              {
                Code: 'HeartRate',
                Value: this.tableAssessed[i].HeartRate,
                Id: ''
              },
              {
                Code: 'IntervalsFromTimeOfBirth',
                Value: this.tableAssessed[i].IntervalsFromTimeOfBirth,
                Id: ''
              },
              {
                Code: 'Location',
                Value: this.tableAssessed[i].Location,
                Id: ''
              },
              {
                Code: 'LocationText',
                Value: this.tableAssessed[i].LocationText,
                Id: ''
              },
              {
                Code: 'Note',
                Value: this.tableAssessed[i].Note,
                Id: ''
              },
              {
                Code: 'PositionOfBaby',
                Value: this.tableAssessed[i].PositionOfBaby,
                Id: ''
              },
              {
                Code: 'Respirations',
                Value: this.tableAssessed[i].Respirations,
                Id: ''
              },
              {
                Code: 'StaffName',
                Value: this.tableAssessed[i].StaffName,
                Id: ''
              },
              {
                Code: 'Temperature',
                Value: this.tableAssessed[i].Temperature,
                Id: ''
              },
              {
                Code: 'Time',
                Value: this.tableAssessed[i].Time,
                Id: ''
              },
              {
                Code: 'Tone',
                Value: this.tableAssessed[i].Tone,
                Id: ''
              }
            ]
          }
          Table.push(createTableData)
        }
        if (this.tableAssessed[i].id !== '123' && this.tableAssessed[i].Changed) {
          const createTableData = {
            RowData: [
              {
                Code: 'Activity',
                Value: this.tableAssessed[i].Activity,
                Id: this.tableAssessed[i].idActivity
              },
              {
                Code: 'ActivityText',
                Value: this.tableAssessed[i].ActivityText,
                Id: this.tableAssessed[i].idActivityText
              },
              {
                Code: 'Colour',
                Value: this.tableAssessed[i].Colour,
                Id: this.tableAssessed[i].idColour
              },
              {
                Code: 'FeedingCode',
                Value: this.tableAssessed[i].FeedingCode,
                Id: this.tableAssessed[i].idFeedingCode
              },
              {
                Code: 'HeartRate',
                Value: this.tableAssessed[i].HeartRate,
                Id: this.tableAssessed[i].idHeartRate
              },
              {
                Code: 'IntervalsFromTimeOfBirth',
                Value: this.tableAssessed[i].IntervalsFromTimeOfBirth,
                Id: this.tableAssessed[i].idIntervalsFromTimeOfBirth
              },
              {
                Code: 'Location',
                Value: this.tableAssessed[i].Location,
                Id: this.tableAssessed[i].idLocation
              },
              {
                Code: 'LocationText',
                Value: this.tableAssessed[i].LocationText,
                Id: this.tableAssessed[i].idLocationText
              },
              {
                Code: 'Note',
                Value: this.tableAssessed[i].Note,
                Id: this.tableAssessed[i].idNote
              },
              {
                Code: 'PositionOfBaby',
                Value: this.tableAssessed[i].PositionOfBaby,
                Id: this.tableAssessed[i].idPositionOfBaby
              },
              {
                Code: 'Respirations',
                Value: this.tableAssessed[i].Respirations,
                Id: this.tableAssessed[i].idRespirations
              },
              {
                Code: 'StaffName',
                Value: this.tableAssessed[i].StaffName,
                Id: this.tableAssessed[i].idStaffName
              },
              {
                Code: 'Temperature',
                Value: this.tableAssessed[i].Temperature,
                Id: this.tableAssessed[i].idTemperature
              },
              {
                Code: 'Time',
                Value: this.tableAssessed[i].Time,
                Id: this.tableAssessed[i].idTime
              },
              {
                Code: 'Tone',
                Value: this.tableAssessed[i].Tone,
                Id: this.tableAssessed[i].idTone
              }
            ]
          }
          Table.push(createTableData)
        }
      }
      console.log('tablll', Table)
      const params = {
        Table: Table
      }
      console.log('params', params)
      let url = ''
      this.FormCode === 'A02_016_050919_VE' ? url = `AssessedTable/${this._VisitId}` : url = `AssessedTable/${this._ItemId}`
      new CreateTable().update(url, params).then(res => {
        console.log('res', res)
        this.loaded = true
      }).catch(error => {
        console.log('err', error)
      })
    },
    getDataTable () {
      this.loaded = false
      let url = ''
      this.FormCode === 'A02_016_050919_VE' ? url = `AssessedTable/${this.oldVisitId && this.isNew ? this.oldVisitId : this._VisitId}` : url = `AssessedTable/${this._ItemId}`
      new CreateTable().find(url).then(res => {
        console.log('listTableAPI', res.Datas)
        this.historyList = res.Datas
        for (let i = 0; i < res.Datas.length; i++) {
          // eslint-disable-next-line no-unused-expressions
          const historyData = {
            id: this.historyList[i].IdRow,
            Activity: this.historyList[i].RowData[0].Value,
            ActivityText: this.historyList[i].RowData[1].Value,
            Colour: this.historyList[i].RowData[2].Value,
            FeedingCode: this.historyList[i].RowData[3].Value,
            HeartRate: this.historyList[i].RowData[4].Value,
            IntervalsFromTimeOfBirth: this.historyList[i].RowData[5].Value,
            Location: this.historyList[i].RowData[6].Value,
            LocationText: this.historyList[i].RowData[7].Value,
            Note: this.historyList[i].RowData[8].Value,
            PositionOfBaby: this.historyList[i].RowData[9].Value,
            Respirations: this.historyList[i].RowData[10].Value,
            StaffName: this.historyList[i].RowData[11].Value,
            Temperature: this.historyList[i].RowData[12].Value,
            Time: this.historyList[i].RowData[13].Value,
            Tone: this.historyList[i].RowData[14].Value,
            // get id
            idActivity: this.historyList[i].RowData[0].Id,
            idActivityText: this.historyList[i].RowData[1].Id,
            idColour: this.historyList[i].RowData[2].Id,
            idFeedingCode: this.historyList[i].RowData[3].Id,
            idHeartRate: this.historyList[i].RowData[4].Id,
            idIntervalsFromTimeOfBirth: this.historyList[i].RowData[5].Id,
            idLocation: this.historyList[i].RowData[6].Id,
            idLocationText: this.historyList[i].RowData[7].Id,
            idNote: this.historyList[i].RowData[8].Id,
            idPositionOfBaby: this.historyList[i].RowData[9].Id,
            idRespirations: this.historyList[i].RowData[10].Id,
            idStaffName: this.historyList[i].RowData[11].Id,
            idTemperature: this.historyList[i].RowData[12].Id,
            idTime: this.historyList[i].RowData[13].Id,
            idTone: this.historyList[i].RowData[14].Id
          }
          this.tableAssessed.push(historyData)
        }
        const sortDataByTime = _.orderBy(this.tableAssessed, [(item) => moment(item.Time, 'HH:mm DD/MM/YYYY').format()], ['asc'])
        this.tableAssessed = sortDataByTime
        console.log('listtest', this.tableAssessed)
        this.loaded = true
      }).catch(error => {
        console.log('err', error)
      })
    },
    deleteDataTable () {
      console.log('deleteDataTable')
      const params = {
        TableDelete: this.tableAssessedDelete
      }
      console.log('tableDelete:', this.tableAssessedDelete)
      let url = ''
      this.FormCode === 'A02_016_050919_VE' ? url = `AssessedTable/${this._VisitId}` : url = `AssessedTable/${this._ItemId}`
      new CreateTable().update(url, params).then(res => {
        NProgress.start()
        console.log('res', res)
      }).catch(error => {
        console.log('err', error)
      })
    },
    getInfo () {
      new InitialAssessment().find('ForNewborns/Info/' + 'A02_016_050919_VE/' + this._VisitId + '/ForUterineLife2Hours/').then(response => {
        this.IsLocked = response.IsLocked
        this.isNew = response.isNew
        this.oldVisitId = response.OldVisitId
        const responseArrivalTime = moment(response.DateOfAdmission).format('HH:mm DD/MM/YYYY')
        this.arrivalTime = responseArrivalTime
        if (response.OldDatas && response.SpecialtyOld) {
          this.syncInfo = response.OldDatas
          this.specialty = response.SpecialtyOld
        } else {
          this.syncInfo = null
          this.specialty = ''
        }
        this.getData()
      }).catch(e => {
        this.IsLocked = e.data.IsLocked
        this.loaded = true
        this._401ResponseError(e)
      })
    },
    getData () {
      let url = ''
      if (this.FormCode === 'A02_016_050919_VE') {
        url = `ForNewborns/A02_016_050919_VE/${this._VisitId}/ForUterineLife2Hours/?hidemsg=${true}`
      } else {
        // API ver 2
        url = `ForUterineLife2HoursV2/A02_016_061022_VE/${this._VisitId}/ForUterineLife2Hours_Obstetrics/${this._ItemId}`
      }
      new InitialAssessment()
        .find(url)
        .then(response => {
          if (this.FormCode === 'A02_016_061022_VE') this.IsLocked = response.IsLocked
          this.DataSubmit = response
          this.$store.dispatch('setCurrentFormId', response.ID)
          if (this.syncInfo && response.Datas.length === 0) {
            this.DataSubmit.Datas = this.syncInfo
            this.synced = true
          }
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
                  } else if (
                    item.Code === 'IPDOAGIANM212'
                  ) {
                    item.Value = this.JSONParse(exited.Value)
                  } else {
                    item.Value = exited.Value
                  }
                }
              })
            }
          }
          this.UpdatedAt = moment(this.DataSubmit.UpdatedAt).format('HH:mm DD/MM/YYYY')
          if (this.DataSubmit.Confirm.MedicalStaff1.UserName) {
            this.Confirm1 = moment(this.DataSubmit.Confirm.MedicalStaff1.ConfirmAt).format('HH:mm DD/MM/YYYY')
          }
          if (this.DataSubmit.Confirm.MedicalStaff2.UserName) {
            this.Confirm2 = moment(this.DataSubmit.Confirm.MedicalStaff2.ConfirmAt).format('HH:mm DD/MM/YYYY')
          }
          this.getDataTable()
          setTimeout(() => {
            this.dataMaster = JSON.stringify(this.MASTERDATA)
          }, 1000)
          // Emit isReadonly to Item AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLife
          this.$emit('isReadonly', this.isReadonly)
          this.loaded = true
        })
        .catch(e => {
          this.loaded = true
          this.DataSubmit = false
          if (e.status === 404) {
          }
        })
    },
    getListDoctors () {
      new InitialAssessment()
        .find('ForNewborns/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity/' + '?hidemsg=' + true)
        .then(response => {
          this.DataSubmit2 = response
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(this.DataSubmit2.Datas, { Code: code })
                if (exited) {
                  if (
                    item.Code === 'IPDOAGIANM2' ||
                    item.Code === 'IPDOAGIANM4' ||
                    item.Code === 'IPDOAGIANM6'
                  ) {
                    item.Value = this.JSONParse(exited.Value)
                    this.listDoctor.push(item.Value)
                  }
                }
              })
            }
          }
        })
        .catch(e => {
          this.DataSubmit = false
          if (e.status === 404) {
          }
        })
    },
    checkRowChange (i) {
      console.log(i)
      this.tableAssessed.forEach((item, index) => {
        if (index === i) {
          Object.assign(item, item.Changed = true)
        }
      })
      this.tableChanged = true
    },
    submit () {
      this.loaded = false
      NProgress.start()
      var obj = {}
      this.DataSubmit.Time = {
        AdmittedFrom: null
      }
      if (this.MASTERDATA['IPDOAGIANM203'].Items) {
        this.MASTERDATA['IPDOAGIANM203'].Items.forEach(item => {
          var val = item.Value
          this.DataSubmit.NewbornCustomerId = this.NewbornCustomerId
          this.DataSubmit.Datas.push({
            Code: item.Code,
            Value: val,
            Group: 'IPDOAGIANM203'
          })
          obj[item.Code] = item.Value
        })
      }
      let url = ''
      if (this.FormCode === 'A02_016_050919_VE') {
        url = `ForNewborns/Update/A02_016_050919_VE/${this._VisitId}/ForUterineLife2Hours`
      } else {
        url = `ForUterineLife2HoursV2/Update/A02_016_061022_VE/${this._VisitId}/ForUterineLife2Hours_Obstetrics/${this._ItemId}`
      }
      new InitialAssessment()
        .update(url, this.DataSubmit)
        .then(async response => {
          if (this.tableAssessed.length > 0) {
            await this.createTable()
          }
          if (this.tableAssessedDelete.length > 0) {
            await this.deleteDataTable()
          }
          this.toastedSuccess()
          this.reload()
        })
        .catch(e => {
          this._401ResponseError(e)
        })
    },
    async popupSave (data) {
      if (!this.isConfirmed) {
        await this.ConfirmKyNhay(data)
      } else {
        this.ConfirmKyNhay(data)
      }
    },
    ConfirmKyNhay (data) {
      if (!this._VisitId) return ''
      let url = ''
      if (this.FormCode === 'A02_016_050919_VE') {
        url = `ForNewborns/Confirm/A02_016_050919_VE/${this._VisitId}/ForUterineLife2Hours`
      } else {
        url = `ForUterineLife2HoursV2/Confirm/A02_016_061022_VE/${this._VisitId}/ForUterineLife2Hours_Obstetrics/${this._ItemId}`
      }
      new InitialAssessment()
        .update(url, data)
        .then(async () => {
          this.toastedSuccess(this.$t('Xác nhận thành công'))
          if (this.dataMaster !== JSON.stringify(this.MASTERDATA) || this.tableChanged) {
            await this.submit()
          } else {
            this.reload()
          }
        })
        .catch(() => {})
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    addRow () {
      this.tableAssessed.push({
        id: '123',
        Activity: '',
        ActivityText: '',
        Colour: '',
        FeedingCode: '',
        HeartRate: '',
        IntervalsFromTimeOfBirth: '',
        Location: '',
        LocationText: '',
        Note: '',
        PositionOfBaby: '',
        Respirations: '',
        StaffName: this.getUser(),
        Temperature: '',
        Time: '',
        Tone: '',
        Changed: true
      })
      this.$nextTick(() => {
        if (this.$refs.datePicker) {
          for (let i = 0; i < this.$refs.datePicker.length; i++) {
            if (i === this.$refs.datePicker.length - 1) {
              this.$refs.datePicker[i].setNow()
            }
          }
        }
      })
      this.tableChanged = true
    },
    deleteRow (id, index) {
      this.tableAssessed.splice(index, 1)
      this.tableAssessedDelete.push(id)
      this.tableChanged = true
    },
    create () {
      new InitialAssessment()
        .update('ForNewborns/Create/' + 'A02_016_050919_VE/' + this._VisitId + '/ForUterineLife2Hours/')
        .then(response => {
          this.reload()
        })
        .catch(e => {
          this.back()
        })
    },
    handleBack () {
      this.edited = false
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA) || this.tableChanged) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    // popup canh bao
    confirmPopupBack () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
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
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới đánh giá tình trạng trẻ trong 2h sau sinh'),
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
    }
  }
}
</script>
<style scoped>
p {
  margin-bottom: 0;
}
select {
  border-color: #d2d6de;
  padding: 8px 0;
  color: #999;
}
.text-center span {
  display: block;
}
.pb-0 {
  padding-bottom: 0 !important;
}
.pt-0 {
  padding-top: 0;
}
.h-45 {
  height: 45px !important;
}
</style>
