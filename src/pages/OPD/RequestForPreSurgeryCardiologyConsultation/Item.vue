<template>
  <div v-if="loaded">
    <div v-if="NeedNew">
      <div class="text-center">
        <h4 v-if="isCreateAthena" class="fs16">{{__t('Chưa có Phiếu yêu cầu khám chuyên khoa tim mạch tiền phẫu')}}</h4>
        <h4 v-else class="null-content">{{__t('Chưa có thông tin')}}</h4>
         <!-- && hasRole(roleCreate) -->
        <button class="btn btn-warning" @click="createPopup" v-if="!isLocked1 && !isLocked2">{{__t('Tạo mới')}}</button>
      </div>
    </div>
    <div v-else class="content box-body mt-10" style="border: 1px solid #ccc;">
      <div class="flex align-center">
        <div class="fw600 mrr5">{{__label(MASTERDATA['OPDKCKTMTP01'])}}</div>
        <div class="mrr20" style="width: 109px;">{{Info.Requestdate ? Info.Requestdate : 'N/A'}}</div>
        <div class="fw600 mrr5">{{__label(MASTERDATA['OPDKCKTMTP02'])}}</div>
        <ad-info v-if="Info.AnesthesiologistName" :ad="Info.AnesthesiologistName"/>
        <p class="mt-10" v-else>N/A</p>
        </div>
      <!-- <b class="mrr20 ">{{ __label(MASTERDATA["OPDKCKTMTP03"]) }}</b> -->
      <div class="mrt10 fw600 box-title">{{ __label(MASTERDATA["OPDKCKTMTP03"]) }}</div>
      <p class="mrr20 ">- {{ __label(MASTERDATA["OPDKCKTMTP04"]) }} {{getChuanDoan({DiagnosisAndICD: Info.Diagnosis})}}</p>
      <div class="d-flex" style="transform: translateY(-5px);">
        <p class="mrr20  w300" style="width:300px;transform: translateY(5px);">- {{ __label(MASTERDATA["OPDKCKTMTP05"]) }}</p>
        <textarea-autosize v-if="!isReadOnly" v-model="MASTERDATA['OPDKCKTMTP05'].Items[0].Value" rows="1" class="form-control" :placeholder="__t('Nhập')"/>
        <FakeInput style="width:100%" v-else v-model="MASTERDATA['OPDKCKTMTP05'].Items[0].Value" />
      </div>
      <p class="mrr20 ">- {{ __label(MASTERDATA["OPDKCKTMTP07"]) }}</p>
      <!-- dhst -->
      <div class="row" v-if="MASTERDATA['OPDKCKTMTP07']">
        <div class="col-md-2 col-25">
          <div class="form-group">
            <label>{{__t('Mạch')}}</label><i> ({{__t('nhịp/ phút')}})</i>
            <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.Pulse || 'N/A'}}</div>
          </div>
        </div>
        <div class="col-md-2 col-25">
          <div class="form-group">
            <label>{{__t('Nhiệt độ')}}</label><i> (°C)</i>
            <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.T || 'N/A'}}</div>
          </div>
        </div>
        <div class="col-md-2 col-25">
          <div class="form-group">
            <label>{{__t('Huyết áp')}}</label><i> ({{__t('nhịp/ phút')}})</i>
            <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.BP || 'N/A'}}</div>
          </div>
        </div>
        <div class="col-md-2 col-25">
          <div class="form-group">
            <label>SpO2</label><i> (%)</i>
            <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.SpO2 || 'N/A'}}</div>
          </div>
        </div>
        <div class="col-md-2 col-25">
          <div class="form-group">
            <label>{{__t('Nhịp thở')}}</label><i> ({{__t('lần/phút')}})</i>
            <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.RR || 'N/A'}}</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2 col-25">
          <div class="form-group">
            <label>{{__t('Chiều cao')}}</label><i> (cm)</i>
            <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.Height || 'N/A'}}</div>
          </div>
        </div>
        <div class="col-md-2 col-25">
          <div class="form-group">
            <label>{{__t('Cân nặng hiện tại')}}</label><i> (kg)</i>
            <div style="margin:0 !important" class="fake-input disable">{{InitialAssessment.Weight || 'N/A'}}</div>
          </div>
        </div>
        <div class="col-md-2 col-25">
          <div class="form-group">
            <label>BMI</label>
            <input class="form-control" readonly :value="bmiCalculation">
          </div>
        </div>
        <div class="col-md-2 col-25" v-if="$store.state.account.CurrentPatientObj && $store.state.account.CurrentPatientObj.Gender === 0">
          <!-- <div class="form-group" style="width: 235px;">
            <label>{{__t('Cân nặng trước khi mang thai')}}</label><i> (kg)</i>
            <div style="margin:0 !important; width:90% !important;" class="fake-input disable">{{InitialAssessment.PrePregnancyWeight || 'N/A'}}</div>
          </div> -->
          <div class="form-group">
              <label class="no-wrap">{{__label(MASTERDATA["PRANCO31"])}}<i class="unit-label"> ({{__t(MASTERDATA["PRANCO31"].Items[0].Note)}})</i></label>
              <b
                v-if="(InitialAssessment.IsApplicationCNTMT === 'False' && InitialAssessment.IsNoApplicationCNTMT === 'False') ||
                (!InitialAssessment.IsApplicationCNTMT && !InitialAssessment.IsNoApplicationCNTMT)"
                class="el-radio-view disable m-0"
              >
                N/A
              </b>
              <b v-else-if="InitialAssessment.IsNoApplicationCNTMT === 'True'" class="el-radio-view disable m-0">{{__t('Không áp dụng')}}</b>
              <div v-else-if="InitialAssessment.IsApplicationCNTMT === 'True'" class="d-flex flex-center">
                <b class="el-radio-view m-0">{{__t('Có áp dụng')}}</b>
                <div class="fake-input disable m-5">{{InitialAssessment.PrePregnancyWeight || 'N/A' }}</div>
              </div>
            </div>
        </div>
      </div>
      <!-- dhst -->
      <!-- 2. tiền sử bệnh -->
      <div class="mrt10 fw600 box-title">{{ __label(MASTERDATA["OPDKCKTMTP08"]) }}</div>
      <!-- 1 -->
      <div class="d-flex mb-5 align-items-center">
        <div class="v-checkbox align-items-center" :key="index + 'checbox'" @click="handleClickBMV(MASTERDATA['OPDKCKTMTP08'].Items[0].Value)">
          <input type="checkbox" :id="'EDARRPAMAREACradio-' + 1" v-model="MASTERDATA['OPDKCKTMTP08'].Items[0].Value">
          <label :class="isReadOnly ? 'buttonDisabled': ''" :for="'EDARRPAMAREACradio-' + 1"></label>
        </div>
        <span style="width:200px" :key="index + 'label'" class="displaytbl"><span>{{ __label(MASTERDATA['OPDKCKTMTP08'].Items[0]) }}</span></span>
        <textarea-autosize v-if="MASTERDATA['OPDKCKTMTP08'].Items[0].Value && !isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[1].Value" rows="1" class="form-control" :placeholder="__t('Nhập')"/>
        <FakeInput style="width:100%" v-if="MASTERDATA['OPDKCKTMTP08'].Items[0].Value && isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[1].Value" />
      </div>
      <!-- 2 -->
      <div class="d-flex mb-5 align-items-center">
        <div class="v-checkbox" :key="index + 'checbox'">
          <input type="checkbox" :id="'EDARRPAMAREACradio-' + 2" v-model="MASTERDATA['OPDKCKTMTP08'].Items[2].Value">
          <label :class="isReadOnly ? 'buttonDisabled': ''" :for="'EDARRPAMAREACradio-' + 2"></label>
        </div>
        <span style="width:200px" :key="index + 'label'" class="displaytbl"><span>{{ __label(MASTERDATA['OPDKCKTMTP08'].Items[2]) }}</span></span>
        <textarea-autosize  v-if="MASTERDATA['OPDKCKTMTP08'].Items[2].Value && !isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[3].Value" rows="1" class="form-control" :placeholder="__t('Nhập')"/>
        <FakeInput style="width:100%" v-if="MASTERDATA['OPDKCKTMTP08'].Items[2].Value && isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[3].Value" />
      </div>
      <!-- 3 -->
      <div class="d-flex mb-5 align-items-center">
        <div class="v-checkbox" :key="index + 'checbox'">
          <input type="checkbox" :id="'EDARRPAMAREACradio-' + 3" v-model="MASTERDATA['OPDKCKTMTP08'].Items[4].Value">
          <label :class="isReadOnly ? 'buttonDisabled': ''" :for="'EDARRPAMAREACradio-' + 3"></label>
        </div>
        <span style="width:200px" :key="index + 'label'" class="displaytbl"><span>{{ __label(MASTERDATA['OPDKCKTMTP08'].Items[4]) }}</span></span>
        <textarea-autosize  v-if="MASTERDATA['OPDKCKTMTP08'].Items[4].Value && !isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[5].Value" rows="1" class="form-control" :placeholder="__t('Nhập')"/>
        <FakeInput style="width:100%" v-if="MASTERDATA['OPDKCKTMTP08'].Items[4].Value && isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[5].Value" />
      </div>
      <!-- 4 -->
      <div class="d-flex mb-5 align-items-center">
        <div class="v-checkbox" :key="index + 'checbox'">
          <input type="checkbox" :id="'EDARRPAMAREACradio-' + 4" v-model="MASTERDATA['OPDKCKTMTP08'].Items[6].Value">
          <label :class="isReadOnly ? 'buttonDisabled': ''" :for="'EDARRPAMAREACradio-' + 4"></label>
        </div>
        <span style="width:200px" :key="index + 'label'" class="displaytbl"><span>{{ __label(MASTERDATA['OPDKCKTMTP08'].Items[6]) }}</span></span>
        <textarea-autosize v-if="MASTERDATA['OPDKCKTMTP08'].Items[6].Value && !isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[7].Value" rows="1" class="form-control" :placeholder="__t('Nhập')"/>
        <FakeInput style="width:100%" v-if="MASTERDATA['OPDKCKTMTP08'].Items[6].Value && isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[7].Value" />
      </div>
      <!-- 5 -->
      <div class="d-flex mb-5 align-items-center">
        <div class="v-checkbox" :key="index + 'checbox'">
          <input type="checkbox" :id="'EDARRPAMAREACradio-' + 5" v-model="MASTERDATA['OPDKCKTMTP08'].Items[8].Value">
          <label :class="isReadOnly ? 'buttonDisabled': ''" :for="'EDARRPAMAREACradio-' + 5"></label>
        </div>
        <span style="width:200px" :key="index + 'label'" class="displaytbl"><span>{{ __label(MASTERDATA['OPDKCKTMTP08'].Items[8]) }}</span></span>
        <textarea-autosize v-if="MASTERDATA['OPDKCKTMTP08'].Items[8].Value && !isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[9].Value" rows="1" class="form-control" :placeholder="__t('Nhập')"/>
        <FakeInput style="width:100%" v-if="MASTERDATA['OPDKCKTMTP08'].Items[8].Value && isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[9].Value" />
      </div>
      <!-- 6 -->
      <div class="d-flex mb-5 align-items-center">
        <div class="v-checkbox" :key="index + 'checbox'">
          <input type="checkbox" :id="'EDARRPAMAREACradio-' + 6" v-model="MASTERDATA['OPDKCKTMTP08'].Items[10].Value">
          <label :class="isReadOnly ? 'buttonDisabled': ''" :for="'EDARRPAMAREACradio-' + 6"></label>
        </div>
        <span style="width:200px" :key="index + 'label'" class="displaytbl"><span>{{ __label(MASTERDATA['OPDKCKTMTP08'].Items[10]) }}</span></span>
        <textarea-autosize v-if="MASTERDATA['OPDKCKTMTP08'].Items[10].Value && !isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[11].Value" rows="1" class="form-control" :placeholder="__t('Nhập')"/>
        <FakeInput style="width:100%" v-if="MASTERDATA['OPDKCKTMTP08'].Items[10].Value && isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[11].Value" />
      </div>
      <!-- 7 -->
      <div class="d-flex mb-5 align-items-center">
        <div class="v-checkbox" :key="index + 'checbox'">
          <input type="checkbox" :id="'EDARRPAMAREACradio-' + 7" v-model="MASTERDATA['OPDKCKTMTP08'].Items[12].Value">
          <label :class="isReadOnly ? 'buttonDisabled': ''" :for="'EDARRPAMAREACradio-' + 7"></label>
        </div>
        <span style="width:200px" :key="index + 'label'" class="displaytbl"><span>{{ __label(MASTERDATA['OPDKCKTMTP08'].Items[12]) }}</span></span>
        <textarea-autosize  v-if="MASTERDATA['OPDKCKTMTP08'].Items[12].Value && !isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[13].Value" rows="1" class="form-control" :placeholder="__t('Nhập')"/>
        <FakeInput style="width:100%" v-if="MASTERDATA['OPDKCKTMTP08'].Items[12].Value && isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[13].Value" />
      </div>
      <!-- 8 -->
      <div class="d-flex mb-5 align-items-center">
        <div class="v-checkbox" :key="index + 'checbox'">
          <input type="checkbox" :id="'EDARRPAMAREACradio-' + 8" v-model="MASTERDATA['OPDKCKTMTP08'].Items[14].Value">
          <label :class="isReadOnly ? 'buttonDisabled': ''" :for="'EDARRPAMAREACradio-' + 8"></label>
        </div>
        <span style="width:200px" :key="index + 'label'" class="displaytbl"><span>{{ __label(MASTERDATA['OPDKCKTMTP08'].Items[14]) }}</span></span>
        <textarea-autosize v-if="MASTERDATA['OPDKCKTMTP08'].Items[14].Value && !isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[15].Value" rows="1" class="form-control" :placeholder="__t('Nhập')"/>
        <FakeInput style="width:100%" v-if="MASTERDATA['OPDKCKTMTP08'].Items[14].Value && isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[15].Value" />
      </div>
      <!-- 9 -->
      <div class="d-flex mb-10 align-items-center">
        <div class="v-checkbox" :key="index + 'checbox'">
          <input type="checkbox" :id="'EDARRPAMAREACradio-' + 9" v-model="MASTERDATA['OPDKCKTMTP08'].Items[16].Value">
          <label :class="isReadOnly ? 'buttonDisabled': ''" :for="'EDARRPAMAREACradio-' + 9"></label>
        </div>
        <span style="width:200px" :key="index + 'label'" class="displaytbl"><span>{{ __label(MASTERDATA['OPDKCKTMTP08'].Items[16]) }}</span></span>
        <textarea-autosize :style="validateText ? 'border-color:red' : ''" v-if="MASTERDATA['OPDKCKTMTP08'].Items[16].Value && !isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[17].Value" rows="1" class="form-control" :placeholder="__t('Nhập')"/>
        <FakeInput style="width:100%" v-if="MASTERDATA['OPDKCKTMTP08'].Items[16].Value && isReadOnly" v-model="MASTERDATA['OPDKCKTMTP08'].Items[17].Value" />
      </div>
      <!-- <p v-if="validateText" class="italic mb-10" style="color:red; margin-left:205px">Không được để trống</p> -->
      <!-- 3 các triệu chứng -->
      <div class="mrt10 fw600 box-title">{{ __label(MASTERDATA["OPDKCKTMTP27"]) }}</div>
      <!-- đau ngực -->
      <div class="d-flex mb-5">
        <p class="mrr20 " style="transform: translateY(10px); width:270px">- {{ __label(MASTERDATA["OPDKCKTMTP28"]) }}</p>
        <MDRadio
          v-if="MASTERDATA['OPDKCKTMTP28'] && !isReadOnly"
          v-model="MASTERDATA['OPDKCKTMTP28']"
          />
        <MDRadioView
        v-if="MASTERDATA['OPDKCKTMTP28'] && isReadOnly"
        :data="MASTERDATA['OPDKCKTMTP28'].Items"
       />
      </div>
      <!-- khó thở -->
      <div class="d-flex mb-5">
        <p class="mrr20 " style="transform: translateY(10px);width:270px">- {{ __label(MASTERDATA["OPDKCKTMTP32"]) }}</p>
        <MDRadio
          v-if="MASTERDATA['OPDKCKTMTP32'] && !isReadOnly"
          v-model="MASTERDATA['OPDKCKTMTP32']"
          />
        <MDRadioView
        v-if="MASTERDATA['OPDKCKTMTP32'] && isReadOnly"
        :data="MASTERDATA['OPDKCKTMTP32'].Items"
       />
      </div>
      <!-- phân loại suy tim theo nyha-->
      <div class="d-flex mb-5">
        <p class="mrr20 " style="transform: translateY(10px);width:270px">- {{ __label(MASTERDATA["OPDKCKTMTP35"]) }}</p>
        <MDRadio
          v-if="MASTERDATA['OPDKCKTMTP35'] && !isReadOnly"
          v-model="MASTERDATA['OPDKCKTMTP35']"
          />
        <MDRadioView
        v-if="MASTERDATA['OPDKCKTMTP35'] && isReadOnly"
        :data="MASTERDATA['OPDKCKTMTP35'].Items"
       />
      </div>
      <!-- đánh giá khả năng hoạt động -->
      <div class="d-flex mb-10">
        <p class="mrr20 " style="transform: translateY(10px);width:270px">- {{ __label(MASTERDATA["OPDKCKTMTP41"]) }}</p>
        <MDRadio
          v-if="MASTERDATA['OPDKCKTMTP41'] && !isReadOnly"
          v-model="MASTERDATA['OPDKCKTMTP41']"
          />
        <MDRadioView
         v-if="MASTERDATA['OPDKCKTMTP41'] && isReadOnly"
         :data="MASTERDATA['OPDKCKTMTP41'].Items"
       />
      </div>
      <!-- 4.  các phương pháp điều trị đã áp dụng-->
      <div class="mrt10 fw600 box-title">{{ __label(MASTERDATA["OPDKCKTMTP44"]) }}</div>
      <div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <div>
                  <TblWithMasterData
                  :FormCode="'OPDPKGM1'"
                  :VisitId="_VisitId"
                  :VisitType="'OPD'"
                  :FormID="DataSubmit.Id"
                  :formatTime="vDateFormat"
                  :dontGetDate="true"
                  :readonly="true"
                  ref="TblWithMasterData"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 5. thông tin về ca mổ -->
      <div class="mrt10 fw600 box-title">{{ __label(MASTERDATA["OPDKCKTMTP45"]) }}</div>
      <p class="mrr20 ">- {{ __label(MASTERDATA["OPDKCKTMTP46"]) }} {{Info.TypeOfSurgery || 'N/A'}}</p>
      <p class="mrr20 ">- {{ __label(MASTERDATA["OPDKCKTMTP47"]) }} {{Info.DateOfSurgery || 'N/A'}}</p>
      <div class="d-flex">
        <p class="mrr20 " style="transform: translateY(10px);width:270px">- {{ __label(MASTERDATA["OPDKCKTMTP48"]) }}</p>
        <MDRadio
          v-if="MASTERDATA['OPDKCKTMTP48'] && !isReadOnly"
          v-model="MASTERDATA['OPDKCKTMTP48']"
          />
        <MDRadioView
        class="mb-5"
          v-if="MASTERDATA['OPDKCKTMTP48'] && isReadOnly"
          :data="MASTERDATA['OPDKCKTMTP48'].Items"
       />
      </div>
      <div class="d-flex">
        <p class="mrr20 " style="transform: translateY(10px);width:270px">- {{ __label(MASTERDATA["OPDKCKTMTP51"]) }}</p>
        <MDRadio
          v-if="MASTERDATA['OPDKCKTMTP51'] && !isReadOnly"
          v-model="MASTERDATA['OPDKCKTMTP51']"
          />
        <MDRadioView
        class="mb-5"
        v-if="MASTERDATA['OPDKCKTMTP51'] && isReadOnly"
        :data="MASTERDATA['OPDKCKTMTP51'].Items"
       />
      </div>
      <div class="d-flex mb-10">
        <p class="mrr20 " style="transform: translateY(10px);width:270px">- {{ __label(MASTERDATA["OPDKCKTMTP55"]) }}</p>
        <MDRadio
          v-if="MASTERDATA['OPDKCKTMTP55'] && !isReadOnly"
          v-model="MASTERDATA['OPDKCKTMTP55']"
          />
          <MDRadioView
        v-if="MASTERDATA['OPDKCKTMTP55'] && isReadOnly"
        :data="MASTERDATA['OPDKCKTMTP55'].Items"
       />
      </div>
      <!-- 6. lý do can thiệp -->
      <!-- 6666 -->
      <div class="mrt10 fw600 box-title">{{ __label(MASTERDATA["OPDKCKTMTP59"]) }}</div>
      <div class="flex align-center mrt10">
          <MdRadiosInput4 style="min-width: 180px" :vcheckbox="true" v-if="MASTERDATA['OPDKCKTMTP59']" :readonly="isReadOnly" :indexs="[0]" v-model="MASTERDATA['OPDKCKTMTP59']"/>
          <MdRadiosInput4 style="min-width: 180px" :vcheckbox="true" v-if="MASTERDATA['OPDKCKTMTP59']" :readonly="isReadOnly" :indexs="[1]" v-model="MASTERDATA['OPDKCKTMTP59']"/>
          <MdRadiosInput4 style="min-width: 180px" :vcheckbox="true" v-if="MASTERDATA['OPDKCKTMTP59']" :readonly="isReadOnly" :indexs="[2]" v-model="MASTERDATA['OPDKCKTMTP59']"/>
          <MdRadiosInput4 style="min-width: 180px" :vcheckbox="true" v-if="MASTERDATA['OPDKCKTMTP59']" :readonly="isReadOnly" :indexs="[3]" v-model="MASTERDATA['OPDKCKTMTP59']"/>
          <MdRadiosInput4 style="min-width: 180px" :vcheckbox="true" v-if="MASTERDATA['OPDKCKTMTP59']" :readonly="isReadOnly" :indexs="[4]" v-model="MASTERDATA['OPDKCKTMTP59']"/>
        </div>
        <!-- <div class="flex align-center">
          <MdRadiosInput4 style="min-width: 155px" :vcheckbox="true" v-if="MASTERDATA['OPDKCKTMTP59']" :readonly="isReadOnly" :indexs="[3]" v-model="MASTERDATA['OPDKCKTMTP59']"/>
          <MdRadiosInput4 style="min-width: 155px" :vcheckbox="true" v-if="MASTERDATA['OPDKCKTMTP59']" :readonly="isReadOnly" :indexs="[4]" v-model="MASTERDATA['OPDKCKTMTP59']"/>
        </div> -->
        <div class="flex align-center">
          <MdRadiosInput4 style="min-width: 160px" :vcheckbox="true" v-if="MASTERDATA['OPDKCKTMTP59']" :readonly="isReadOnly" :indexs="[5]" v-model="MASTERDATA['OPDKCKTMTP59']"/>
          <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['OPDKCKTMTP59'] && MASTERDATA['OPDKCKTMTP59'].Items[5].Value" rows="1" :readonly="isReadOnly" v-model="MASTERDATA['OPDKCKTMTP59'].Items[6].Value" :id="MASTERDATA['OPDKCKTMTP59'].Items[6].Code"/>
        </div>
      <!-- 7 đánh giá điểm nguy cơ -->
      <div class="mrt10 fw600 box-title">{{ __label(MASTERDATA["OPDKCKTMTP67"]) }}</div>
      <div class="d-flex mt-5">
        <p style="width:150px;transform: translateY(10px);">{{ __label(MASTERDATA["OPDKCKTMTP68"]) }}</p>
        <VNumberInput style="width:200px" v-if="!isReadOnly" :decimal="true" v-model="MASTERDATA['OPDKCKTMTP68'].Items[0].Value"/>
        <!-- <textarea-autosize @keypress="onlyNumber($event)" v-if="!isReadOnly" v-model="MASTERDATA['OPDKCKTMTP68'].Items[0].Value" rows="1" class="form-control" :placeholder="__t('Nhập')"/> -->
        <FakeInput style="width:200px" v-else v-model="MASTERDATA['OPDKCKTMTP68'].Items[0].Value" />
      </div>
      <div class="d-flex mt-5">
        <p style="width:150px;transform: translateY(10px);">{{ __label(MASTERDATA["OPDKCKTMTP70"]) }}</p>
        <VNumberInput style="width:200px" v-if="!isReadOnly" :decimal="true" v-model="MASTERDATA['OPDKCKTMTP70'].Items[0].Value"/>
        <!-- <textarea-autosize v-if="!isReadOnly" v-model="MASTERDATA['OPDKCKTMTP70'].Items[0].Value" rows="1" class="form-control" :placeholder="__t('Nhập')"/> -->
        <FakeInput style="width:200px" v-else v-model="MASTERDATA['OPDKCKTMTP70'].Items[0].Value" />
      </div>
    </div>
    <div v-if="!NeedNew">
      <p class="mt-10">A01_204_030320_VE</p>
      <!-- {{data}} -->
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="data.UpdatedBy" :ad="data.UpdatedBy" /> {{__t('lúc')}} {{data.UpdatedAt}}</p>
      <FloatBlock v-if="!isReadOnly" :openBack="true" @handleBack="handleBack">
      <template slot="buttons">
      <div class="col-md-2 col-sm-2"><div class="form-group1"></div></div>
      <div class="col-md-4 col-sm-4">
      </div>
      <div class="col-md-6 col-sm-6">
        <div class="flex form-group1">
        <button
          class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
          type="button"
          v-shortkey="['ctrl', 's']"
          @click="handleSave();"
        >
          <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ __t("btn.luu") }}
        </button>
        </div>
      </div>
      </template>
    </FloatBlock>
    </div>
  </div>
</template>
<script>
import TblWithMasterData from '@/components/global/TblWithMasterData'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import AskThePatientBeforeSurgeryService from '@/services/IPD/AskThePatientBeforeSurgeryService'
// import moment from 'moment'
// import UploadFileService from '@/services/IPD/UploadFileService'
import DoctorConfirm from './popup/DoctorConfirm.vue'
// import $ from 'jquery'
import Print from './Print.vue'
import _ from 'lodash'
import PreAnesthesiaConsultation from '@/services/OPD/PreAnesthesiaConsultation.js'
// var urlApi = process.env.API_URL

export default {
  props: ['viewOnly', 'VisitId', 'VisitType'],
  mixins: [MixinForm, MixinMasterData],
  components: {
    VDateTimePicker,
    DoctorConfirm,
    Print,
    TblWithMasterData
  },
  data () {
    return {
      IsApplication: '',
      loaded: true,
      freeText: '',
      formCode: 'A01_204_030320_VE',
      NeedNew: false,
      IsLocked: false,
      data: {},
      DataSubmit: [],
      InitialAssessment: {},
      fakeView: true,
      dataMaster: null,
      fillData: {},
      validateText: false,
      validateText1: false,
      Info: null,
      TableDrug: [],
      tableReadOnly: true,
      isLocked1: false,
      isLocked2: false,
      isCreateAthena: false
    }
  },
  watch: {
    // MASTERDATA: function (val) {
    //   console.log('val', this.MASTERDATA['OPDKCKTMTP08'].Items[17].Value)
    //   var str = this.MASTERDATA['OPDKCKTMTP08'].Items[17].Value
    //   this.validateText = !(str.length > 0)
    // }
  },
  mounted () {
    this.getMasterDatas({Form: 'OPDKCKTMTP'}, () => {
      this.SynsDataAnesthesia()
      this.getIsCreateForm()
      this.getList()
      this.getInfo()
    })
    this.getMasterDatas({Form: 'A03_034_200520_VE'}, async () => {})
  },
  computed: {
    isReadOnly: function () {
      return this.viewOnly || this.IsLocked
    },
    bmiCalculation: function () {
      var weight = this.InitialAssessment.Weight ? parseFloat(this.InitialAssessment.Weight) : 0
      var height = this.InitialAssessment.Height ? (parseFloat(this.InitialAssessment.Height) / 100) : 0
      if (height === 0) {
        return 'N/A'
      } else {
        return (weight / (height * height)).toFixed(2)
      }
    }
  },
  methods: {
    SynsDataAnesthesia () {
      new AskThePatientBeforeSurgeryService().find('OPD/SynsDataAnesthesia/' + this._VisitId + '/A01_204_030320_VE').then(res => {
        this.Info = res.Datas
        this.IsLocked = res.IsLock24h
        if (this.Info.Treatment) {
          this.Info.Treatment = this.JSONParse(this.Info.Treatment || [], true)
        }
        if (res.Datas && res.Datas.VitalSigns && res.Datas.VitalSigns.VitalSigns) {
          this.InitialAssessment = res.Datas.VitalSigns.VitalSigns
        }
      }).catch(err => {
        if (err.data.FORM_NOT_FOUND.ViMessage === 'NB không có chỉ định khám chuyên khoa tại Phiếu khám gây mê') {
          this.isCreateAthena = true
        }
        this.IsLocked = err.data.IsLock24h
      })
    },
    getDataPreAnes () {
      new PreAnesthesiaConsultation({}).find(this._VisitId).then(response => {
        console.log('get chi dinh', response)
        for (let i = 0; i < response.Datas.length; i++) {
          if (response.Datas[i].Code === 'PRANCO323' && response.Datas[i].Value) {
            this.isCreateAthena = true
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getLabel (data) {
      let label = {ViName: 'N/A', EnName: 'N/A'}
      if (data && data.length) {
        data.find(elm => {
          if (elm.Value) {
            label = {
              ViName: elm.ViName,
              EnName: elm.EnName
            }
          }
        })
      }
      return label
    },
    validateForm () {
      let errors = []
      if (this.getValueOfMASTERDATA2('OPDKCKTMTP08', 'OPDKCKTMTP25')) {
        if (!this.getValueOfMASTERDATA2('OPDKCKTMTP08', 'OPDKCKTMTP26')) {
          errors.push(this.MASTERDATA['OPDKCKTMTP08'].Items[17])
        }
        this.validateText = true
        setTimeout(() => {
          this.validateText = false
        }, 2000)
      }
      if (this.getValueOfMASTERDATA2('OPDKCKTMTP59', 'OPDKCKTMTP65')) {
        if (!this.getValueOfMASTERDATA2('OPDKCKTMTP59', 'OPDKCKTMTP66')) {
          errors.push(this.MASTERDATA['OPDKCKTMTP59'].Items[6])
        }
        this.validateText1 = true
        setTimeout(() => {
          this.validateText1 = false
        }, 2000)
      }
      if (errors.length) {
        console.log('errors: ', errors)
        this.handlerResponse({Error: errors})
      }
    },
    getIsCreateForm () {
      new AskThePatientBeforeSurgeryService().find('OPD/SynsDataAnesthesia/' + this._VisitId + '/' + this.formCode).then(response => {
        // this.getDetail(response.FormId)
        this.Info = response.Datas
        this.InitialAssessment = response.Datas.VitalSigns.VitalSigns
        console.log('parse', this.JSONParse(response.Datas.Treatment, true))
        if (response.Datas.Treatment) {
          this.TableDrug = this.JSONParse(response.Datas.Treatment, true)
        } else {
          this.TableDrug = []
        }
        console.log('TableDrug', this.TableDrug)
      }).catch(err => {
        console.log(err)
        this.NeedNew = err.data.FORM_NOT_FOUND.NeedNew
        this.isLocked1 = err.data.IsLock24h
        console.log('islocked', this.IsLocked)
      })
      this.loaded = true
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
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    getInfo () {
      this.loaded = true
      new PreAnesthesiaConsultation({}).find('/Info' + '/' + this._VisitId).then(response => {
        this.InitialAssessment = response.VitalSigns
        console.log('InitialAssessment', this.InitialAssessment)
        if (response.VitalSigns.IsApplication === 'False') {
          this.IsApplication = 'Không áp dụng'
        } else if (response.VitalSigns.IsApplication === '') {
          this.IsApplication = 'N/A'
        }
        this.SyncHistoryOfAllergies = response.HistoryOfAllergies
      }).catch(e => {
        // Nothing
      })
    },
    getList () {
      new AskThePatientBeforeSurgeryService().find('GetList/OPD/' + this.formCode + '/' + this._VisitId).then(response => {
        if (response.Datas && response.Datas.length > 0) {
          this.getDetail(response.Datas[0].Id)
          this.IdForm = response.Datas[0].Id
        } else {
          this.NeedNew = response.FORM_NOT_FOUND.NeedNew
        }
      }).catch(err => {
        // this.loaded = true
        this.NeedNew = err.data.FORM_NOT_FOUND.NeedNew
        this.isLocked2 = err.data.IsLock24h
      })
      this.loaded = true
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Bạn có chắc chắn tạo Phiếu yêu cầu khám chuyên khoa tim mạch tiền phẫu thuật?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.handleCreate()
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
    handleCreate () {
      new AskThePatientBeforeSurgeryService().update('CreateForm/OPD/' + this.formCode + '/' + this._VisitId).then(response => {
        this.reload()
      }).catch(err => {
        console.log(err)
      })
    },
    getDetail (id) {
      this.NeedNew = false
      this.loaded = true
      new AskThePatientBeforeSurgeryService().find('GetDetail/OPD/' + this.formCode + '/' + this._VisitId + '/' + id).then(response => {
        this.IsLocked = response.IsLock24h
        this.data = response.data
        this.DataSubmit = response.data
        this.mapData()
      }).catch(err => {
        console.log(err)
      })
    },
    handleSave () {
      this.validateForm()
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
            } else {
            }
          })
        }
      }
      this.mapData2MDData()
      const data = Object.assign({}, this.DataSubmit)
      new AskThePatientBeforeSurgeryService().update('UpdateForm/OPD/' + this.formCode + '/' + this._VisitId + '/' + this.IdForm, data).then(response => {
        console.log('rédssss', response)
        this.loaded = false
        this.reload()
        // this.getData()
        // this.getDetail(response.Id)
        setTimeout(() => {
          this.toastedSuccess()
          // this.loaded = true
        }, 300)
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    mapData () {
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
            } else {
              // if (code === 'IPDIAAULANGANS') {
              //   item.Value = null
              // }
            }
          })
        }
        this.dataMaster = JSON.stringify(this.MASTERDATA)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.buttonDisabled {
  pointer-events: none;
 }
 .box-title {
  background: #337ab7;
  padding: 7px 15px;
  font-weight: 700;
  color: #fff;
  margin: 0 -10.1px;
  border: 1px solid #337ab7;
  margin-bottom: 10px;
 }
</style>
