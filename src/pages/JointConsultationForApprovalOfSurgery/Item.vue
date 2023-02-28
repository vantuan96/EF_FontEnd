<template>
 <div class="main-content" id="StandingOrderForRetailService-page">
  <br />
  <div v-if="loaded">
   <div>
    <div class="box form-content">
     <div class="box-body">
      <div v-if="MASTERDATA['EDJCFAOSTOA']">
       <div
        class="form-group"
        :data="item"
        :key="index"
        v-for="(item, index) in MASTERDATA['EDJCFAOSTOA'].Items"
       >
        <p>
          <b>{{__label(MASTERDATA['EDJCFAOSTOA'])}}</b>: {{ item.Value }}
        </p>
       </div>
      </div>
      <div v-if="MASTERDATA['EDJCFAOSDIA']">
       <div
        class="form-group"
        :data="item"
        :key="index"
        v-for="(item, index) in MASTERDATA['EDJCFAOSDIA'].Items"
       >
        <p v-if="_VisitType === 'IPD'">
          <b>{{__label(MASTERDATA['EDJCFAOSDIA'])}}</b>: {{ getChuanDoan($store.state.account.CurrentPatientObj) }}
        </p>
        <p v-else>
          <b>{{__label(MASTERDATA['EDJCFAOSDIA'])}}</b>: {{ DataSubmit.Diagnosis || item.Value }}
        </p>
       </div>
      </div>
      <div v-if="MASTERDATA['EDJCFAOSTOJ']">
       <div
        class="form-group"
        :data="item"
        :key="index"
        v-for="(item, index) in MASTERDATA['EDJCFAOSTOJ'].Items"
       >
        <p class="d-flex flex-center">
          <b class="mr-5">{{__label(MASTERDATA['EDJCFAOSTOJ'])}}</b>:
          <v-date-times-picker
            v-if="!isConfirmed"
            style="display: inline-block;"
            v-model="item.Value"
            :format="vDateTimeFormat"
          />
          <span v-else>{{ item.Value | formatDateWithoutSecon2 }}</span>
        </p>
       </div>
      </div>
      <div v-if="MASTERDATA['EDJCFAOSSOP']">
       <div class="form-group">
        <b>{{__label(MASTERDATA['EDJCFAOSSOP'])}}</b>:
        <!-- Lý do vào viện -->
        <div v-if="MASTERDATA['EDJCFAOSCC0'].ViName" :class="{'mrb10': MASTERDATA['EDJCFAOSCC0'].Items[0].Value}">
          - <b>{{__label(MASTERDATA['EDJCFAOSCC0'])}}</b>: {{ MASTERDATA["EDJCFAOSCC0"].Items[0].Value }}
        </div>
        <!-- Tiền sử -->
        <div v-if="MASTERDATA['EDJCFAOSPHH'].ViName">
          - <b>{{ __label(MASTERDATA['EDJCFAOSPHH']) }}</b>:
          <template v-if="DataSubmit.PastMedicalHistory">
            <p class="mb-0">+ Tiền sử sản khoa:</p>
            <p class="mb-5" style="margin-left: 20px;">{{DataSubmit.PastMedicalHistory.TSSK || ''}}</p>
            <p class="mb-0">+ Tiền sử kinh nguyệt:</p>
            <p class="mb-5" style="margin-left: 20px;">{{DataSubmit.PastMedicalHistory.TSKN || ''}}</p>
            <p class="mb-0">+ Tiền sử khác:</p>
            <p class="mb-5" style="margin-left: 20px;">{{DataSubmit.PastMedicalHistory.TSK || ''}}</p>
          </template>
        </div>
        <div class="mrb10" v-if="MASTERDATA['EDJCFAOSPHH'] && MASTERDATA['EDJCFAOSPHH'].Items[0].Value">
          <p v-if="MASTERDATA['EDJCFAOSPHH'].Items[0].Value === 'null'"></p>
          <p v-else v-html="MASTERDATA['EDJCFAOSPHH'].Items[0].Value"></p>
        </div>
        <!-- Bệnh sử -->
        <div v-if="MASTERDATA['EDJCFAOSHIS'].ViName">
          - <b>{{ __label(MASTERDATA['EDJCFAOSHIS']) }}</b>:
        </div>
        <div class="mrb10" v-if="MASTERDATA['EDJCFAOSHIS'] && MASTERDATA['EDJCFAOSHIS'].Items[0].Value">
          <p v-if="MASTERDATA['EDJCFAOSHIS'].Items[0].Value === 'null'"></p>
          <p v-else v-html="MASTERDATA['EDJCFAOSHIS'].Items[0].Value"></p>
        </div>
        <!-- Thăm khám -->
        <div v-if="MASTERDATA['EDJCFAOSASS'].ViName">
          - <b>{{ __label(MASTERDATA['EDJCFAOSASS']) }}</b>:
        </div>
        <div class="mrb10" v-if="MASTERDATA['EDJCFAOSASS'] && MASTERDATA['EDJCFAOSASS'].Items[0].Value">
          <p v-html="MASTERDATA['EDJCFAOSASS'].Items[0].Value"></p>
        </div>
       </div>
      </div>
      <b v-if="DataSubmit.Version >= 4 && VisitVersion >= 10">{{ __t('Bảng kết quả XN & CĐHA & CLS') }}</b>
      <b v-else>{{ __t('Bảng xét nghiệm') }}</b>
      <button v-if="!isConfirmed" class="btn btn-sync-data" @click="sync();">
       {{ __t("Lấy dữ liệu gần nhất") }}
      </button>
      <table class="table header-table v-header-table-2 mt-5">
       <tr>
        <td class="bg-head" width="25%" v-if="MASTERDATA['EDJCFAOSTOC']">
         <b>{{ __label(MASTERDATA['EDJCFAOSTOC']) }}</b>
        </td>
        <td class="bg-head" width="25%" v-if="MASTERDATA['EDJCFAOSBIO']">
         <b>{{ __label(MASTERDATA['EDJCFAOSBIO']) }}</b>
        </td>
        <td class="bg-head" width="25%" v-if="MASTERDATA['EDJCFAOSUA0']">
         <b>{{ __label(MASTERDATA['EDJCFAOSUA0']) }}</b>
        </td>
        <td class="bg-head" v-if="MASTERDATA['EDJCFAOSBCC']">
         <b>{{ __label(MASTERDATA['EDJCFAOSBCC']) }}</b>
        </td>
       </tr>
       <tr>
        <td style="vertical-align:top">
         <div v-if="MASTERDATA['EDJCFAOSPRB']">
          <label>{{ __label(MASTERDATA['EDJCFAOSPRB']) }}</label>
          <div
           :data="item"
           :key="index + '-EDJCFAOSTGP'"
           v-for="(item, index) in MASTERDATA['EDJCFAOSTGP'].Items"
          >
           <span>- {{ __label(MASTERDATA['EDJCFAOSTGP']) }}:</span>
           <Hlabel :noStatusLabel="true" v-model="item.Value" />
          </div>
          <div
           :data="item"
           :key="index + '-EDJCFAOSPTP'"
           v-for="(item, index) in MASTERDATA['EDJCFAOSPTP'].Items"
          >
           <span>- {{ __label(MASTERDATA['EDJCFAOSPTP']) }}:</span>
           <Hlabel :noStatusLabel="true" v-model="item.Value" />
          </div>
          <div
           :data="item"
           :key="index + '-EDJCFAOSINR'"
           v-for="(item, index) in MASTERDATA['EDJCFAOSINR'].Items"
          >
           <p>
            <span>- {{ __label(MASTERDATA['EDJCFAOSINR']) }}:</span>
            <Hlabel :noStatusLabel="true" v-model="item.Value" />
           </p>
          </div>
         </div>
         <div v-if="MASTERDATA['EDJCFAOSFRG'].ViName">
          <p>
            <b>{{ __label(MASTERDATA['EDJCFAOSFRG']) }}:</b>
            <Hlabel
              :noStatusLabel="true"
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['EDJCFAOSFRG'].Items"
              v-model="item.Value"
            />
          </p>
         </div>
         <div v-if="MASTERDATA['EDJCFAOSAPT'].ViName">
            <b>{{ __label(MASTERDATA['EDJCFAOSAPT']) }}:</b>
            <div
              :data="item"
              :key="index + '-EDJCFAOSTTS'"
              v-for="(item, index) in MASTERDATA['EDJCFAOSTTS'].Items"
            >
            <span>- {{ __label(MASTERDATA['EDJCFAOSTTS']) }}:</span>
            <Hlabel :noStatusLabel="true" v-model="item.Value" />
          </div>
          <div
           :data="item"
           :key="index + '-EDJCFAOSTTC'"
           v-for="(item, index) in MASTERDATA['EDJCFAOSTTC'].Items"
          >
           <span>- {{ __label(MASTERDATA['EDJCFAOSTTC']) }}:</span>
           <Hlabel :noStatusLabel="true" v-model="item.Value" />
          </div>
         </div>
        </td>
        <td style="vertical-align:top">
         <p v-if="MASTERDATA['EDJCFAOSGLU']">
          <label>{{ __label(MASTERDATA['EDJCFAOSGLU']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSGLU'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSURE']">
          <label>{{ __label(MASTERDATA['EDJCFAOSURE']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSURE'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSCTN']">
          <label>{{ __label(MASTERDATA['EDJCFAOSCTN']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSCTN'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSNAP']">
          <label>{{ __label(MASTERDATA['EDJCFAOSNAP']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSNAP'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSKAP']">
          <label>{{ __label(MASTERDATA['EDJCFAOSKAP']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSKAP'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSCLS']">
          <label>{{ __label(MASTERDATA['EDJCFAOSCLS']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSCLS'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSAST']">
          <label>{{ __label(MASTERDATA['EDJCFAOSAST']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSAST'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSALT']">
          <label>{{ __label(MASTERDATA['EDJCFAOSALT']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSALT'].Items[0].Value"
          />
         </p>
        </td>
        <td style="vertical-align:top">
         <p v-if="MASTERDATA['EDJCFAOSGLC']">
          <label>{{ __label(MASTERDATA['EDJCFAOSGLC']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSGLC'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSPRO']">
          <label>{{ __label(MASTERDATA['EDJCFAOSPRO']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSPRO'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSLEU']">
          <label>{{ __label(MASTERDATA['EDJCFAOSLEU']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSLEU'].Items[0].Value"
          />
         </p>
        </td>
        <td style="vertical-align:top">
         <p v-if="MASTERDATA['EDJCFAOSRBC']">
          <label>{{ __label(MASTERDATA['EDJCFAOSRBC']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSRBC'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSWBC']">
          <label>{{ __label(MASTERDATA['EDJCFAOSWBC']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSWBC'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSPLT']">
          <label>{{ __label(MASTERDATA['EDJCFAOSPLT']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSPLT'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSHGB']">
          <label>{{ __label(MASTERDATA['EDJCFAOSHGB']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSHGB'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSHCT']">
          <label>{{ __label(MASTERDATA['EDJCFAOSHCT']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSHCT'].Items[0].Value"
          />
         </p>
        </td>
       </tr>
       <tr>
        <td class="bg-head" width="25%" v-if="MASTERDATA['EDJCFAOSOT0']">
          <b>{{ __label(MASTERDATA['EDJCFAOSOT0']) }}</b>
        </td>
        <td class="bg-head" colspan="2" v-if="MASTERDATA['EDJCFAOSECG']">
          <b>{{ __label(MASTERDATA['EDJCFAOSECG']) }}</b>
        </td>
        <td class="bg-head" width="25%" v-if="MASTERDATA['EDJCFAOSBG0']">
          <b>{{ __label(MASTERDATA['EDJCFAOSBG0']) }}</b>
        </td>
       </tr>
       <tr>
        <td rowspan="3" style="vertical-align:top">
         <p v-if="MASTERDATA['EDJCFAOSQT0']">
          <label>{{ __label(MASTERDATA['EDJCFAOSQT0']) }}</label>
         </p>
         <p v-if="MASTERDATA['EDJCFAOSHIV']">
          <label>{{ __label(MASTERDATA['EDJCFAOSHIV']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSHIV'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSHA0']">
          <label>{{ __label(MASTERDATA['EDJCFAOSHA0']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSHA0'].Items[0].Value"
          />
         </p>
         <p v-if="MASTERDATA['EDJCFAOSHCV']">
          <label>{{ __label(MASTERDATA['EDJCFAOSHCV']) }}</label>:
          <Hlabel
           :noStatusLabel="true"
           v-model="MASTERDATA['EDJCFAOSHCV'].Items[0].Value"
          />
         </p>
        </td>
        <td rowspan="3" colspan="2" style="vertical-align:top">
         <p v-if="MASTERDATA['EDJCFAOSECG']">
          {{ MASTERDATA["EDJCFAOSECG"].Items[0].Value }}
         </p>
        </td>
        <td style="vertical-align:top">
         <v-select
          v-if="!isConfirmed"
          class="select-full-w"
          :search="true"
          :placeholder="__t('Chọn nhóm máu')"
          v-model="MASTERDATA['EDJCFAOSBG0'].Items[0].Value"
          :items="JSONParse(MASTERDATA['EDJCFAOSBG0'].Items[0].Data)"
         />
         <span v-else>{{
          MASTERDATA["EDJCFAOSBG0"].Items[0].Value || "N/A"}}
         </span>
        </td>
       </tr>
       <tr>
        <td class="bg-head" v-if="MASTERDATA['EDJCFAOSPT0']">
          <b>{{ __label(MASTERDATA['EDJCFAOSPT0']) }}</b> ({{MASTERDATA["EDJCFAOSPT0"].Items[0].Note}})
        </td>
       </tr>
       <!-- Dự trù máu -->
       <tr>
        <td v-if="MASTERDATA['EDJCFAOSPT0']" style="vertical-align:top">
          <MDNumberInput v-if="!isConfirmed" :decimal="false" v-model="MASTERDATA['EDJCFAOSPT0'].Items[0].Value"/>
          <span v-else>{{
            MASTERDATA["EDJCFAOSPT0"].Items[0].Value || "N/A"}}
          </span>
        </td>
       </tr>
       <tr>
        <td class="bg-head" colspan="4" v-if="MASTERDATA['EDJCFAOSRAD']">
          <b>{{ __label(MASTERDATA['EDJCFAOSRAD']) }}</b>
        </td>
       </tr>
      </table>
      <!-- Chan doan hinh anh -->
      <table class="table mini-tablex mini-tablex1">
       <template v-if="CDHA && CDHA.length">
        <thead>
         <tr>
          <td width="30%">
           <b>{{ __t("Tên dịch vụ") }}</b>
          </td>
          <td width="1" class="no-wrap">
           <b>{{ __t("Người trả kết quả") }}</b>
          </td>
          <td>
           <b>{{ __t("Kết luận") }}</b>
          </td>
         </tr>
        </thead>
        <tbody>
         <tr
          :key="i"
          v-for="(it, i) in CDHA"
          v-if="!hasCDHA.includes(it.MaDichVu)"
         >
          <td>{{ it.TenDichVu }}</td>
          <td><ad-info :ad="it.NguoiTraKQ"/></td>
          <td>
           <p>{{ it.KetLuan }}</p>
          </td>
         </tr>
        </tbody>
       </template>
       <tr v-else>
        <td class="text-center">
         <p class="no-result" style="padding: 10px; margin: 0; white-space: unset;">
          {{ __t("Không có kết quả") }}
         </p>
        </td>
       </tr>
      </table>

      <br />
      <!-- Phương pháp gây mê -->
      <div class="form-group" v-if="MASTERDATA['EDJCFAOSAM0']">
        <b>{{ __label(MASTERDATA['EDJCFAOSAM0']) }}</b>:
        <template v-for="(item, index) in MASTERDATA['EDJCFAOSAM0'].Items">
          <textarea-autosize
            v-if="!isConfirmed"
            :data="item"
            :key="index"
            class="form-control"
            rows="3"
            :placeholder="__label(item)"
            v-model="item.Value"
          />
          <p v-else :data="item" :key="item.Value">{{ item.Value }}</p>
        </template>
      </div>
      <!-- Phương pháp phẫu thuật -->
      <div class="form-group" v-if="MASTERDATA['EDJCFAOSSM0']">
       <b>{{ __label(MASTERDATA['EDJCFAOSSM0']) }}</b>:
       <template v-for="(item, index) in MASTERDATA['EDJCFAOSSM0'].Items">
          <textarea-autosize
            v-if="!isConfirmed"
            :data="item"
            :key="index"
            class="form-control"
            rows="3"
            :placeholder="__label(item)"
            v-model="item.Value"
          />
          <p v-else :data="item" :key="item.Value">{{ item.Value }}</p>
       </template>
      </div>
      <!-- Loại phẫu thuật -->
      <div v-if="DataSubmit.Version >= 3">
        <b>{{ __label(MASTERDATA['EDJCFAOSTOS']) }}</b>:
        <div v-if="!isConfirmed" class="form-group d-flex flex-center">
          <div v-for="(item, index) in MASTERDATA['EDJCFAOSTOS'].Items" :key="index">
            <div class="group-radio">
              <span>
                <input type="checkbox" :id="'EDJCFAOSTOS-' + index" v-model="MASTERDATA['EDJCFAOSTOS'].Items[index].Value">
                <label :for="'EDJCFAOSTOS-' + index" @click="checkbox2Radio(MASTERDATA['EDJCFAOSTOS'].Items, MASTERDATA['EDJCFAOSTOS'].Items[index])">
                  <span class="m-0">{{ __label(MASTERDATA['EDJCFAOSTOS'].Items[index]) }}</span>
                </label>
              </span>
            </div>
          </div>
        </div>
        <div v-else v-for="(item, index) in MASTERDATA['EDJCFAOSTOS'].Items" :key="index" class="mb-10">
          <b class="el-radio-view ml-0" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
            <span>{{ __label(item) }}</span>
          </b>
        </div>
      </div>
      <!-- Các biến chứng, nguy cơ, khó khăn đặc biệt cần lưu ý -->
      <div class="form-group" v-if="MASTERDATA['EDJCFAOSCRD']">
        <b>{{ __label(MASTERDATA["EDJCFAOSCRD"]) }}</b>:
        <template v-for="(item, index) in MASTERDATA['EDJCFAOSCRD'].Items">
          <textarea-autosize
            v-if="!isConfirmed"
            :data="item"
            :key="index"
            class="form-control"
            rows="3"
            :placeholder="__label(item)"
            v-model="item.Value"
          />
          <p v-else :data="item" :key="item.Value">{{ item.Value }}</p>
        </template>
      </div>
      <div class="form-group" v-if="MASTERDATA['EDJCFAOSAM1']">
        <b>{{ __label(MASTERDATA["EDJCFAOSAM1"]) }}</b>:
        <template v-for="(item, index) in MASTERDATA['EDJCFAOSAM1'].Items">
          <textarea-autosize
            v-if="!isConfirmed"
            :data="item"
            :key="index"
            class="form-control"
            rows="3"
            :placeholder="__label(item)"
            v-model="item.Value"
          />
          <p v-else :data="item" :key="item.Value">{{ item.Value }}</p>
        </template>
      </div>
      <div v-if="DataSubmit.Version !== 1">
        <div class="flex-box flex-center">
          <CheckboxValue v-if="isConfirmed" v-model="MASTERDATA['EDJCFAOSXNCBCC'].Items[0].Value"/>
          <span v-else class="v-checkbox" style="transform: translateX(-6px);">
            <input type="checkbox" :id="'EDJCFAOSXNCBCCradio-' + 0" v-model="MASTERDATA['EDJCFAOSXNCBCC'].Items[0].Value">
            <label :for="'EDJCFAOSXNCBCCradio-' + 0"></label>
          </span>
          <span class="displaytbl"><b>{{__label(MASTERDATA['EDJCFAOSXNCBCC'].Items[0])}}</b></span>
        </div>
      </div>
      <table class="table table-no-border">
        <!-- Phau thuat vien chinh -->
        <tr v-if="MASTERDATA['EDJCFAOSSUR']">
          <td width="1" class="no-wrap" style="padding-right: 15px">
            <b>{{ __label(MASTERDATA["EDJCFAOSSUR"]) }}</b>:
          </td>
          <td>
            <div
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['EDJCFAOSSUR'].Items"
            >
              <UserAdV4
                v-if="DataSubmit.Version >= 4 && VisitVersion >= 10"
                :readonly="isConfirmed"
                v-model="item.Value"
                :placeholder="__t(__label(item))"
                :multiple="false"
              />
              <template v-else>
                <input
                  v-if="!isConfirmed"
                  type="text"
                  :placeholder="__t('Nhập')"
                  class="form-control"
                  v-model="item.Value"
                />
                <span v-else> {{ item.Value }}</span>
              </template>
            </div>
          </td>
        </tr>
        <!-- Phau thuat vien phu -->
        <tr v-if="MASTERDATA['EDJCFAOSSAS']">
        <td width="1" class="no-wrap" style="padding-right: 15px">
          <b>{{ __label(MASTERDATA["EDJCFAOSSAS"]) }}</b>:
        </td>
        <td>
          <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['EDJCFAOSSAS'].Items"
          >
            <UserAdV4
              v-if="DataSubmit.Version >= 4 && VisitVersion >= 10"
              :readonly="isConfirmed"
              v-model="item.Value"
              :placeholder="__t(__label(item))"
            />
            <template v-else>
              <input
                v-if="!isConfirmed"
                type="text"
                :placeholder="__t('Nhập')"
                class="form-control"
                v-model="item.Value"
              />
              <span v-else> {{ item.Value }}</span>
            </template>
          </div>
        </td>
        </tr>
       <tr v-if="MASTERDATA['EDJCFAOSSD0']">
        <td width="1" class="no-wrap" style="padding-right: 15px">
          <b>{{ __label(MASTERDATA["EDJCFAOSSD0"]) }}</b>:
        </td>
        <td>
         <div
          :data="item"
          :key="index"
          v-for="(item, index) in MASTERDATA['EDJCFAOSSD0'].Items"
         >
          <VDatePicker
            v-if="!isConfirmed"
            v-model="item.Value"
            :hideTooltip="true"
            :allday="'allday'"
            :format="'DD/MM/YYYY'"
          />
          <span v-else> {{ item.Value }}</span>
         </div>
        </td>
       </tr>
      </table>
      <br />
      <br />
      <br />
      <div v-if="false">
        <Confirm
          class="mt-10"
          :MasterDataCode="'JCFAOSCONFIRM'"
          :FormCode="`A01_059_090822_VE`"
          :VisitId="_VisitId"
          :FormId="DataSubmit.Id"
          :ReadOnly="viewOnly || IsFormLocked(DataSubmit)"
        />
      </div>
      <div v-else class="row">
       <div class="col-md-3 col-sm-3 text-center">
        <p class="text-center"><b>{{__t('Lãnh đạo duyệt mổ')}}</b></p>
        <template v-if="DataSubmit.CMO && DataSubmit.CMO.Username">
         <eform-signature :ad="DataSubmit.CMO.Username" />
        </template>
        <template v-else>
         <p>
          <i v-if="viewOnly || IsLocked">{{ __t("Chưa xác nhận") }}</i
          ><button
           v-else
           @click="showDoctorConfirm('CMO', 'Lãnh đạo duyệt mổ');"
           class="btn v-white-btn"
          >
           {{ __t("Xác nhận") }}
          </button>
         </p>
        </template>
       </div>
       <div class="col-md-3 col-sm-3 text-center">
        <p class="text-center"><b>{{__t('Trưởng khoa')}}</b></p>
        <template v-if="DataSubmit.HeadOfDept.Username">
         <eform-signature :ad="DataSubmit.HeadOfDept.Username" />
        </template>
        <template v-else>
         <p>
          <i v-if="viewOnly || IsLocked">{{ __t("Chưa xác nhận") }}</i
          ><button
           v-else
           @click="showDoctorConfirm('HeadOfDept', 'Trưởng khoa');"
           class="btn v-white-btn"
          >
           {{ __t("Xác nhận") }}
          </button>
         </p>
        </template>
       </div>
       <div class="col-md-3 col-sm-3 text-center">
        <p class="text-center"><b>{{__t('Bác sĩ gây mê')}}</b></p>
        <template v-if="DataSubmit.Anesthetist.Username">
         <eform-signature :ad="DataSubmit.Anesthetist.Username" />
        </template>
        <template v-else>
         <p>
          <i v-if="viewOnly || IsLocked">{{ __t("Chưa xác nhận") }}</i
          ><button
           v-else
           @click="showDoctorConfirm('Anesthetist', 'Bác sĩ gây mê');"
           class="btn v-white-btn"
          >
           {{ __t("Xác nhận") }}
          </button>
         </p>
        </template>
       </div>
       <div class="col-md-3 col-sm-3 text-center">
        <p class="text-center"><b>{{__t('Bác sỹ phẫu thuật')}}</b></p>
        <template v-if="DataSubmit.Surgeon.Username">
         <eform-signature :ad="DataSubmit.Surgeon.Username" />
        </template>
        <template v-else>
         <p>
          <i v-if="viewOnly || IsLocked">{{ __t("Chưa xác nhận") }}</i
          ><button
           v-else
           @click="showDoctorConfirm('Surgeon', 'Bác sỹ phẫu thuật');"
           class="btn v-white-btn"
          >
           {{ __t("Xác nhận") }}
          </button>
         </p>
        </template>
       </div>
      </div>
     </div>
     <modal
      name="doctorConfirm"
      transition="pop-out"
      id="doctor-login"
      height="auto"
      :clickToClose="false"
     >
      <div class="box v-model-content-popup">
       <div class="box-header text-center">
        <h3 class="box-title">{{ __t(popupTitle) }}.</h3>
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
           @click="confirm();"
          >
           {{ __t("Xác nhận") }}
          </button>
         </div>
        </div>
        <p style="margin-top: 10px; text-align:center">
         {{ __t("Sử dụng tài khoản máy tính") }}
        </p>
       </div>
      </div>
     </modal>
      <!-- footer -->
      <FloatBlock v-if="!viewOnly" @handleBack='handleBack()' :openBack="true">
        <template slot='buttons'>
          <div v-if="!isConfirmed" class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group1">
              <button class="btn btn-block v-white-btn" type="button" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In biên bản')}}</button>
            </div>
          </div>
          <div class="col-md-6 col-sm-6" v-if="!isConfirmed">
            <div class="form-group1">
              <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
            </div>
          </div>
        </template>
      </FloatBlock>
    </div>
    <p class="mt-10">{{formCode}}</p>
    <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit.UpdatedBy" :ad="DataSubmit.UpdatedBy" /> {{__t('lúc')}} {{ DataSubmit.UpdatedAt | formatDateWithoutSecon}}</p>
    <logs
     v-if="DataSubmit && !viewOnly"
     :EdId="this.$route.params.Id"
     :Type="VisitTypeGroupCode + '/JointConsultationForApprovalOfSurgery'"
    />
    <print
     :MASTERDATA="MASTERDATA"
     :DataSubmit="DataSubmit"
     :CDHA="CDHA"
     :hasCDHA="hasCDHA"
     hidden
    />
   </div>
  </div>
  <div v-else class="loading-text"><v-loading /></div>
 </div>
</template>
<script>
import EIOService from '@/services/IPD/EIOService'
import Confirm from '@/components/Form/Confirm3'
import NProgress from 'nprogress'
import MixinForm from '@/mixins/form.js'
import moment from 'moment'
import VDateTimesPicker from '@/components/VDateTimePicker.vue'
import JointConsultationForApprovalOfSurgery from '@/services/JointConsultationForApprovalOfSurgery'
import JointConsultationForApprovalOfSurgeryV2 from '@/services/JointConsultationForApprovalOfSurgeryV2'
import JointConsultationForApprovalOfSurgeryChecked from '@/services/JointConsultationForApprovalOfSurgeryChecked'
import MixinMasterData from '@/mixins/masterdata.js'
import VSelect from '@/components/VSelect.vue'
import _ from 'lodash'
import Logs from '@/components/Logs.vue'
import Print from './Print.vue'
import Customer from '@/services/IPD/Customer'
import MedicalRecordMixinForm from '@/pages/IPD/MedicalRecord/Mixin.js'
import UserAdV4 from '@/components/global/UserAdV4.vue'

const MATERDATECODE = 'EDJCFAOS'

export default {
  /**
   * The name of the page.
   */
  name: 'JointConsultationForApprovalOfSurgeryItem',
  props: ['viewOnly', 'VisitId', 'VisitType', 'formId'],
  data () {
    return {
      DataSubmit: null,
      user: {},
      formCode: 'A01_059_050919_VE',
      AntibioticsTreatmentBefore: null,
      Kind: null,
      SyncData: {},
      CDHA: null,
      loaded: false,
      IsLocked: false,
      hasCDHA: [],
      popupTitle: '',
      VisitTypeGroupCode: 'ED',
      FormCode: '',
      Customer: null,
      Lists: [],
      dataMaster: '',
      checkEdited: false,
      handleConfirm: false,
      RawSyncData: [],
      VisitVersion: null
    }
  },
  mixins: [MixinForm, MixinMasterData, MedicalRecordMixinForm],
  mounted () {
    this.getVisitVersion()
    if (!this.viewOnly) {
      this.VisitTypeGroupCode = this.getVisitGroupCode()
    } else {
      this.VisitTypeGroupCode = this._VisitType
    }
    this.getMasterDatas({Form: MATERDATECODE}, () => {
      this.init()
    })
  },
  components: {
    VDateTimesPicker, VSelect, Logs, Print, UserAdV4, Confirm
  },
  watch: {
    formId () {
      this.getMasterDatas({Form: MATERDATECODE}, () => {
        this.getData()
      })
    },
    MASTERDATA: {
      handler () {
        if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
          this.checkEdited = true
        }
      },
      deep: true
    },
    valueOfPatientIllnessAndAssessmentEye: {
      handler (val) {
        if (val && this.MASTERDATA['EDJCFAOSASS']) {
          console.log('valueOfPatientIllnessAndAssessmentEye', val)
          if (!this.MASTERDATA['EDJCFAOSASS'].Items[0].Value) {
            this.MASTERDATA['EDJCFAOSASS'].Items[0].Value = val
          }
        }
      },
      deep: true
    },
    valueOfPatientIllnessAndAssessment: {
      handler (val) {
        if (val && this.MASTERDATA['EDJCFAOSASS']) {
          console.log('valueOfPatientIllnessAndAssessment', val)
          if (!this.MASTERDATA['EDJCFAOSASS'].Items[0].Value) {
            this.MASTERDATA['EDJCFAOSASS'].Items[0].Value = val
          }
        }
      },
      deep: true
    }
  },
  computed: {
    isConfirmed: function () {
      console.log('getRoleWithType', this.getRoleWithType)
      console.log('checkConfirmed', this.checkConfirmed)
      return this.viewOnly || this.IsLocked || this.checkConfirmed || !this.getRoleWithType
    },
    checkConfirmed () {
      return (this.DataSubmit && this.DataSubmit.CMO && this.DataSubmit.CMO.Username) ||
      (this.DataSubmit && this.DataSubmit.HeadOfDept && this.DataSubmit.HeadOfDept.Username) ||
      (this.DataSubmit && this.DataSubmit.Anesthetist && this.DataSubmit.Anesthetist.Username) ||
      (this.DataSubmit && this.DataSubmit.Surgeon && this.DataSubmit.Surgeon.Username)
    },
    getRoleWithType () {
      if (this._VisitType === 'IPD') {
        return this.hasRole('IJCFA3')
      }
      if (this._VisitType === 'ED') {
        return this.hasRole('EJCFA3')
      }
      if (this._VisitType === 'OPD') {
        return this.hasRole('OPDJCFA3')
      }
    },
    getValueOfPatientIllnessAndAssessment () {
      return this.valueOfPatientIllnessAndAssessment || this.valueOfPatientIllnessAndAssessmentEye
    },
    _ItemId () {
      return this.formId || this.$route.params.Item
    },
    checkFormCode () {
      return this._VisitType === 'OPD' ? 'A01_059_090822_VE' : 'A01_059_050919_VE'
    }
  },
  methods: {
    getVisitVersion () {
      new EIOService().find('EMRForm/GetVersionByVisit/' + this._VisitId + '/' + this._VisitType).then(response => {
        this.VisitVersion = response.Version
      }).catch((e) => {
        console.log(e)
      })
    },
    async init () {
      await this.getData()
      if (this._VisitType && this._VisitType === 'IPD') {
        await this.getCustomer()
      }
      setTimeout(() => {
        this.checkEdited = false
      }, 500)
    },
    showDoctorConfirm (kind, title) {
      this.user.kind = kind
      this.popupTitle = title
      this.$modal.show('doctorConfirm')
    },
    copyToDI0SM0 (str) {
      if (this.DataSubmit.AntibioticsTreatmentBefore.includes(str)) {
      } else {
        this.DataSubmit.AntibioticsTreatmentBefore = this.trim(this.DataSubmit.AntibioticsTreatmentBefore + ', ' + str, ', ')
      }
      this.toastedInfo('Đã copy')
    },
    print () {
      this.$htmlToPaper('printMe', false, this.formCode)
    },
    submit () {
      var DataSubmit = Object.assign({}, this.DataSubmit)
      NProgress.start()
      DataSubmit.Datas = []
      if (!this.MASTERDATA['EDJCFAOSTOJ'].Items[0].Value) {
        this.MASTERDATA['EDJCFAOSTOJ'].Items[0].Value = moment(this.DataSubmit.CreatedAt).format('HH:mm DD/MM/YYYY')
      }
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (typeof item.Value === 'object') {
              val = JSON.stringify(item.Value)
            }
            if (['EDJCFAOSSURANS', 'EDJCFAOSSASANS'].includes(item.Code)) {
              val = JSON.stringify(item.Value)
            }
            DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
          })
        }
      }
      new JointConsultationForApprovalOfSurgery({}, this.VisitTypeGroupCode).update(this.checkFormCode + '/' + this._VisitId + '/' + this._ItemId, DataSubmit, '/Update/').then(response => {
        this.toastedSuccess()
        if (!this.handleConfirm) {
          this.reload()
        }
      }).catch(e => {
        // this.back()
      })
    },
    async confirm () {
      this.handleConfirm = true
      if (this.checkEdited) {
        await this.submit()
      }
      await new JointConsultationForApprovalOfSurgery({}, this.VisitTypeGroupCode).update(this.checkFormCode + '/' + this._VisitId + '/' + this._ItemId, this.user, '/Accept/').then(response => {
        this.$modal.hide('doctorConfirm')
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.reload()
      }).catch(e => {
        if (e && e.status === 403) {
          this.checkRole()
        }
      })
    },
    addNew () {
      this.DataSubmit.Orders.push({
        Drug: '',
        Concentration: '',
        SkinResult: '',
        Reason: '',
        Route: ''
      })
    },
    getIcdInfo () {
      let opd = this.$store.state.account.CurrentPatientObj
      if (this._VisitType && this._VisitType === 'IPD') {
        opd = this.Customer
      }
      let str = ''
      if (opd) {
        let icd = this.getICD10s(opd.DiagnosisAndICD.ICD, opd.DiagnosisAndICD.ICDOption, true)
        str = [opd.DiagnosisAndICD.Diagnosis, opd.DiagnosisAndICD.DiagnosisOption].filter(e => e).join('/ ') + ' ' + icd
      }
      return str
    },
    async getData () {
      this.loaded = false
      this.handleConfirm = false
      if (this._VisitType === 'IPD') {
        new JointConsultationForApprovalOfSurgeryChecked({}, this._VisitType).find(this.checkFormCode + '/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true).then(response => {
          this.IsLocked = response.IsLocked
        })
      }
      await new JointConsultationForApprovalOfSurgery({}, this._VisitType).find(this.checkFormCode + '/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        this._VisitType === 'IPD' ? this.IsLocked = response.IsLocked : this.IsLocked = response.IsLocked24h
        if (response.Version === 1) {
          this.formCode = 'A01_059_050919_VE'
        } else if (response.Version === 2) {
          this.formCode = 'A01_059_120522_VE'
        } else {
          this.formCode = 'A01_059_090822_VE'
        }
        if (response.IPDMedicalRecordOfPatient && response.IPDMedicalRecordOfPatient.FormCode) {
          this.FormCode = response.IPDMedicalRecordOfPatient.FormCode
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
                } else if (item.Code === 'EDJCFAOSTOJANS') {
                  if (this.isConfirmed) {
                    item.Value = exited.Value ? exited.Value.replace('"', '').replace('"', '') : ''
                  } else {
                    item.Value = exited.Value ? this.string2Moment(exited.Value) : new Date()
                  }
                } else if (item.Code === 'EDJCFAOSKQCDHAANS') {
                  item.Value = exited.Value ? this.JSONParse(exited.Value) : []
                  this.CDHA = item.Value
                } else if (item.Note && item.Data && this.isJson(exited.Value)) {
                  item.Value = this.JSONParse(exited.Value)
                } else if (exited.Value && ['EDJCFAOSSURANS', 'EDJCFAOSSASANS'].includes(item.Code)) {
                  let data = exited.Value
                  console.log('awaitnewJointConsultationForApprovalOfSurgery ~ data', data)
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
                } else {
                  item.Value = exited.Value
                }
              } else {
                if (item.Code === 'EDJCFAOSSURANS') {
                  item.Value = []
                }
                if (item.Code === 'EDJCFAOSSASANS') {
                  item.Value = []
                }
              }
            })
          }
        }
        if (!this.MASTERDATA['EDJCFAOSTOJ'].Items[0].Value) {
          this.MASTERDATA['EDJCFAOSTOJ'].Items[0].Value = moment(response.CreatedAt).format('HH:mm DD/MM/YYYY')
        }
        if (this.MASTERDATA['EDJCFAOSASS'] && this.MASTERDATA['EDJCFAOSASS'].Items[0].Value) {
          let arr = this.MASTERDATA['EDJCFAOSASS'].Items[0].Value.split('\n')
          arr = arr.filter(elm => {
            if (!elm.includes('True') && !elm.includes('False')) {
              return elm
            }
          })
          this.MASTERDATA['EDJCFAOSASS'].Items[0].Value = arr.join('\n')
        }
        this.changeData()
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        if (this.DataSubmit.Version >= 4 && this.VisitVersion >= 10) {
          setTimeout(() => {
            this.loaded = true
          }, 100)
        } else {
          if (response.IsNew) {
            this.sync()
          } else {
            setTimeout(() => {
              this.loaded = true
            }, 100)
          }
        }
      }).catch(e => {
        this.loaded = true
        if (e.status === 404) {}
      })
      if (this.DataSubmit && this.DataSubmit.VisitType === 'IPD' && this.FormCode && this.MASTERDATA['EDJCFAOSASS']) {
        this.MASTERDATA['EDJCFAOSASS'].Items[0].Value = 'Toàn thân: (ý thức, da niêm mạc, hệ thống hạch, tuyến giáp, vị trí, kích thước, số lượng, v.v..):\nCác cơ quan:\n+ Tuần hoàn:\n+ Hô hấp:\n+ Tiêu hoá:\n+ Thận- Tiết niệu- Sinh dục:\n+ Thần Kinh:\n+ Cơ- Xương- Khớp:\n+ Tai- Mũi- Họng:\n+ Răng- Hàm- Mặt:\n+ Mắt:\n+ Nội tiết, dinh dưỡng và các bệnh lý khác:'
        if (this.FormCode === 'A01_035_050919_V') {
          await this.getDataFillBA(this.FormCode, [1, 0])
        } else if (this.FormCode === 'A01_037_050919_V') {
          await this.getDataFillBA(this.FormCode, [14, 13, 0])
        } else if (this.FormCode === 'A01_034_050919_V') {
          await this.getDataFillBA(this.FormCode, [14, 13, 0])
        } else if (this.FormCode === 'A01_038_050919_V') {
          await this.getDataFillBA(this.FormCode, [21, 20, 19, 0])
        } else if (this.FormCode === 'A01_195_050919_V') {
          await this.getDataFillBA(this.FormCode, [14, 13, 0])
        } else if (this.FormCode === 'A01_036_050919_V') {
          await this.getDataFillBA(this.FormCode, [0])
        } else if (this.FormCode === 'A01_196_050919_V') {
          this.getDataFillBA(this.FormCode, [14, 13, 0])
        } else if (this.FormCode === 'A01_041_050919_V') {
          await this.getMasterDatas({Form: 'IPDMRPT'}, () => {
            this.getDataFillBAEye(this.FormCode, [479, 478, 0])
          })
        } else if (this.FormCode === 'BMTIMMACH') {
          await this.getDataFillBA('A01_034_050919_V', [14, 13, 0])
        } else {
          await this.getDataFillBA(this.FormCode)
        }
        this.MASTERDATA['EDJCFAOSASS'].Items[0].Value = this.valueOfPatientIllnessAndAssessment || this.valueOfPatientIllnessAndAssessmentEye
      }
    },
    async sync () {
      if (this.DataSubmit.Version >= 4 && this.VisitVersion >= 10) {
        await new JointConsultationForApprovalOfSurgeryV2().find(`Sync/${this._VisitId}/?hidemsg=true`).then(response => {
          this.handleSync(response)
          this.loaded = true
        }).catch(e => {
          this.loaded = true
          return true
        })
      } else {
        await new JointConsultationForApprovalOfSurgery({}, this.VisitTypeGroupCode).update('sync/?hidemsg=' + true, {Id: this._VisitId}).then(response => {
          this.handleSync(response)
          this.loaded = true
        }).catch(e => {
          this.loaded = true
          return true
        })
      }
    },
    handleSync (response) {
      let XetNghiem = response.XetNghiem
      this.hasCDHA = []
      let CDHA = response.CDHA
      this.DiagnosticReporting = response.DiagnosticReporting
      this.CDHA = CDHA
      this.MASTERDATA['EDJCFAOSKQCDHA'].Items[0].Value = JSON.stringify(CDHA)
      XetNghiem.forEach(e => {
        this.$set(this.SyncData, e.TestCode, e)
        this.RawSyncData.push({
          code: e.TestCode,
          data: e,
          type: 'XN'
        })
      })
      CDHA.forEach(e => {
        this.$set(this.SyncData, e.MaDichVu, e.KetLuan)
        this.RawSyncData.push({
          code: e.MaDichVu,
          data: e.KetLuan,
          type: 'CDHA'
        })
      })
      this.DiagnosticReporting.forEach(e => {
        this.RawSyncData.push({
          code: e.ServiceCode,
          data: e.Impression,
          type: 'DR'
        })
      })
      if (!this.DataSubmit) return false
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            if (this.checkString(item.DataType, 'AutoFill')) {
              let dataysnc = this.RawSyncData.find(esync => item.Data && item.Data.includes('[#]' + esync.code + '[#]'))
              if (dataysnc) item.Value = dataysnc.data
            }
          })
        }
      }
    },
    getCustomer () {
      this.loaded = false
      new Customer({noLoading: true}).find(this._VisitId).then(response => {
        this.Customer = response
        this.loaded = true
      })
    },
    handleBack () {
      this.edited = false
      if (this.checkEdited) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    // popup canh bao
    confirmPopupBack () {
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
            }
          }
        ]
      })
    },
    changeData () {
      if (this.MASTERDATA['EDJCFAOSASS'] && this.DataSubmit.PkntVersion === 2) {
        let str = this.MASTERDATA['EDJCFAOSASS'].Items[0].Value
        str = this.dichTextVer2Pknt(str)
        this.MASTERDATA['EDJCFAOSASS'].Items[0].Value = str
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
