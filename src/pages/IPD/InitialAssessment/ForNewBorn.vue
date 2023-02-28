<template>
 <div>
  <div>
   <template v-if="loaded">
    <template v-if="DataSubmit">
     <div v-if="readonly"><ViewOnly :MASTERDATA="MASTERDATA" :messageTotalPain="messageTotalPain" :messageTotalPoin="messageTotalPoin" :DataSubmit="DataSubmit" /></div>
     <div v-else>
      <div class="tbl-title" >1. {{__t('InitialAssessment.label2')}}</div>
      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block1"
      >
       <tr v-if="MASTERDATA['IPDIAAUADFR']">
        <th width="1">
         <div class="w160">
          {{ __label(MASTERDATA["IPDIAAUADFR"]) }}
         </div>
        </th>
        <td>
         <div class="flex-box">
          <div>
           <MDRadio
            v-if="MASTERDATA['IPDIAAUADFR']"
            v-model="MASTERDATA['IPDIAAUADFR']"
           />
          </div>
          <div
           style="flex-grow: 1"
           class="ml-10"
           v-if="MASTERDATA['IPDIAAUADFR'].Items[2].Value"
          >
           <textarea-autosize
            class="form-control"
            rows="3"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUADFR'].Items[3].Value"
           />
          </div>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUTRANS']">
        <th>{{ __label(MASTERDATA["IPDIAAUTRANS"]) }}</th>
        <td>
         <div class="flex-box">
          <div>
           <MDRadio
            v-if="MASTERDATA['IPDIAAUTRANS']"
            v-model="MASTERDATA['IPDIAAUTRANS']"
           />
          </div>
          <div
           style="flex-grow: 1"
           class="ml-10"
           v-if="MASTERDATA['IPDIAAUTRANS'].Items[3].Value"
          >
           <textarea-autosize
            class="form-control"
            rows="3"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUTRANS'].Items[4].Value"
           />
          </div>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUARTI']">
        <th>{{ __label(MASTERDATA["IPDIAAUARTI"]) }}</th>
        <td>
         <div class="flex-box flex-center">
          <v-date-picker
           :hideTooltip="true"
           class="w1510 display-inline"
           :format="'HH:mm DD/MM/YYYY'"
           v-model="MASTERDATA['IPDIAAUARTI'].Items[0].Value"
          />
          <b class="no-wrap mgl-5 mgr-5">{{
           __label(MASTERDATA["IPDIAAUROOM"])
          }}</b>
          <textarea-autosize
           rows="1"
           class="form-control"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAAUROOM'].Items[0].Value"
          />
          <b class="no-wrap mgl-5 mgr-5">{{
           __label(MASTERDATA["IPDIAAUACBY"])
          }}</b>
          <textarea-autosize
           rows="1"
           class="form-control"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAAUACBY'].Items[0].Value"
          />
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUINRF']">
        <th>{{ __label(MASTERDATA["IPDIAAUINRF"]) }}</th>
        <td>
         <div class="flex-box">
          <div>
           <MDRadio
            v-if="MASTERDATA['IPDIAAUINRF']"
            v-model="MASTERDATA['IPDIAAUINRF']"
           />
          </div>
          <div
           style="flex-grow: 1"
           class="ml-10"
           v-if="MASTERDATA['IPDIAAUINRF'].Items[1].Value"
          >
           <textarea-autosize
            class="form-control"
            rows="3"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUINRF'].Items[2].Value"
           />
          </div>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUPTCI']">
        <th>{{ __label(MASTERDATA["IPDIAAUPTCI"]) }}</th>
        <td>
         <textarea-autosize
          rows="1"
          class="form-control"
          :placeholder="__t('Nhập')"
          v-model="MASTERDATA['IPDIAAUPTCI'].Items[0].Value"
         />
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUPHON']">
        <th>{{ __label(MASTERDATA["IPDIAAUPHON"]) }}</th>
        <td>
         <div class="flex-box flex-center">
          <div>
           <input
            class="form-control"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUPHON'].Items[0].Value"
           />
          </div>
          <b class="no-wrap mgl-5 mgr-5">{{
           __label(MASTERDATA["IPDIAAULANG"])
          }}</b>
          <div class="v-select w250">
           <v-select
            :options="IPDIAAULANG"
            :mutableValue="null"
            :placeholder="__t('Chọn')"
            v-model="MASTERDATA['IPDIAAULANG'].Items[0].Value"
           ></v-select>
          </div>
         </div>
        </td>
       </tr>
      </table>

      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block2"
      >
       <tr>
        <td colspan="2" class="no-padding">
         <div class="tbl-title">2. {{ __t("Đánh giá chung") }}</div>
        </td>
       </tr>
       <!-- dấu hiệu sinh tồn -->
       <tr v-if="MASTERDATA['IPDIAAUPULS']">
        <th width="1">
         <div class="w160">
          <div class="mb-5 no-wrap">
           {{ __t("Dấu hiệu sinh tồn") }}
          </div>
          <button class="btn btn-sync-data" @click="SyncVitalSign()">
           {{ __t("Lấy dữ liệu trong 24H") }}
          </button>
         </div>
        </th>
        <td>
         <div class="mb-5">
          <div class="w150 display-inline mr-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUPULS'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b>
             <span v-if="item.Note" class="note-text"
              >({{ __t(item.Note) }})</span
             >
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
          <div class="w150 display-inline mr-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUBLPR'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b>
             <span v-if="item.Note" class="note-text">({{ __t("mmHg") }})</span>
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
          <div class="w150 display-inline mr-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUTEMP'].Items.filter(
             (i) => i.Clinic === ''
            )"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b>
             <span v-if="item.Note" class="note-text">(°C)</span>
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
          <div class="w150 display-inline mr-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAURERA'].Items.filter(
             (i) => i.Clinic === ''
            )"
           >
            <div class="mb-5">
             <b>{{__t('Nhịp thở')}}</b>
             <span v-if="item.Note" class="note-text"
              >({{ __t(item.Note) }})</span
             >
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
         </div>
         <div v-if="MASTERDATA['IPDIAAUHEIG']" class="mt-5">
          <div class="w150 display-inline mr-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUHEIG'].Items"
           >
            <div class="mb-5">
             <b>{{__t('InitialAssessment.length')}}</b>
             <span class="note-text">(cm)</span>
            </div>
            <number-input
            @keypress.native="onlyNumber($event)"
             inline
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
            <!-- <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
             @keypress="onlyNumber($event)"
            /> -->
           </div>
          </div>
          <div class="w150 display-inline mr-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUWEIG'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b>
             <span v-if="item.Note" class="note-text">({{ item.Note }})</span>
            </div>
            <number-input
            @keypress.native="onlyNumber($event)"
             inline
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
          <div class="w150 display-inline mr-10">
           <div>
            <div class="mb-5"><b>BMI</b></div>
            <div class="number-input number-input--inline">
             <input
              type="number"
              class="number-input__input form-control"
              readonly
              :value="bmiCalculation"
             />
            </div>
           </div>
          </div>
          <!-- vòng đầu -->
          <div class="w150 display-inline mr-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUROUNDHEAD'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b>
             <span class="note-text">(cm)</span>
            </div>
            <number-input
            @keypress.native="onlyNumber($event)"
             inline
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
          <div class="w150 display-inline mr-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUROUNDCHEST'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b>
             <span class="note-text">(cm)</span>
            </div>
            <number-input
            @keypress.native="onlyNumber($event)"
             inline
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
          <height-and-weight @copy="push2Wh" />
         </div>
        </td>
       </tr>
       <!-- thể trạng -->
       <tr v-if="MASTERDATA['IPDIAAUBODYBUILD']">
        <th>{{ __label(MASTERDATA["IPDIAAUBODYBUILD"]) }}</th>
        <td>
         <MDRadio
          v-if="MASTERDATA['IPDIAAUBODYBUILD']"
          v-model="MASTERDATA['IPDIAAUBODYBUILD']"
         />
        </td>
       </tr>
       <!-- vệ sinh cơ thể -->
       <tr v-if="MASTERDATA['IPDIAAUHYGNEWBORN']">
        <th>{{ __label(MASTERDATA["IPDIAAUHYGNEWBORN"]) }}</th>
        <td>
         <MDRadio
          v-if="MASTERDATA['IPDIAAUHYGNEWBORN']"
          v-model="MASTERDATA['IPDIAAUHYGNEWBORN']"
         />
        </td>
       </tr>
       <!-- tiếng khóc -->
       <tr v-if="MASTERDATA['IPDIAAUCRYSOUND']">
        <th width="1">
         <div class="w160">
          {{ __label(MASTERDATA["IPDIAAUCRYSOUND"]) }}
         </div>
        </th>
        <td>
         <div class="group-radio flex-box flex-center">
          <div>
            <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUCRYSOUND'].Items"
           v-if="index < 2"
          >
           <input
           @click="handleClickSound(item)"
            type="checkbox"
            :id="'IPDIAAUCRYSOUNDradio-' + index"
            v-model="item.Value"
           />
           <label
            :class="{ 'label-b': item.Code === 'IPDIAAUCRYSOUNDABNOR' }"
            :for="'IPDIAAUCRYSOUNDradio-' + index"
            @click="checkbox2RadioText(MASTERDATA['IPDIAAUCRYSOUND'].Items, item)"
            >{{ __label(item) }}</label
           >
          </span>
          </div>
          <b v-if="MASTERDATA['IPDIAAUCRYSOUND'].Items[1].Value" style="margin-left:20px"  class="no-wrap mgl-5 mgr-5">{{__t('InitialAssessment.label6')}}</b>
          <div
           style="flex-grow: 1"
           class="ml-10"
           v-if="MASTERDATA['IPDIAAUCRYSOUND'].Items[1].Value"
          >
           <textarea-autosize
            class="form-control"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUCRYSOUND'].Items[2].Value"
           />
          </div>
         </div>
        </td>
       </tr>
      <!-- hướng xử lý hỗ trợ -->
      <tr
        v-if="
         MASTERDATA['IPDIAAUNEEDIDORG']
        "
       >
        <th>{{__t('InitialAssessment.label12')}}</th>
        <td>
         <div class="flex-box flex-center ">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUNEEDIDORG'].Items.filter(i => i.Code ==='IPDIAAUNEEDIDORGHYG')"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUNEEDIDORGcxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUNEEDIDORGcxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
          <!--  -->
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUNEEDIDORG'].Items.filter(i => i.Code ==='IPDIAAUNEEDIDORGIAP')"
          >
           <div class="flex-box flex-center" :class="MASTERDATA['IPDIAAUCRYSOUND'].Items[1].Value ? 'disabel-table' : ''">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUNEEDIDORGcxo-' + index + 1"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUNEEDIDORGcxo-' + index + 1"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
         </div>
        </td>
       </tr>
      </table>

      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block3"
      >
       <tr>
        <td colspan="2" class="no-padding">
          <div class="tbl-title" >
          3.
          {{__t('InitialAssessment.label17')}}
         </div>
        </td>
       </tr>
        <tr v-if="MASTERDATA['IPDIAAURESASS']">
        <th width="1">
         <div class="w160">
          {{ __label(MASTERDATA["IPDIAAURESASS"]) }}
         </div>
        </th>
        <td>
          <div class="flex-box flex-center">
          <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-if="index < 4"
           v-for="(item, index) in MASTERDATA['IPDIAAURESASS'].Items.filter(i => i.Code !=='IPDIAAURESASSSPO2' || i.Code !=='IPDIAAURESASSSPO2ANS')"
          >
           <input
            type="checkbox"
            :id="'IPDIAAURESASSradio-' + index"
            v-model="item.Value"
            @click="handleClickIPDIAAURESASS(item.Value, index)"
           />
           <label
            :class="{ 'label-b': item.Code === 'IPDIAAURESASSTACH' || item.Code === 'IPDIAAURESASSROI' || item.Code === 'IPDIAAURESASSAPNEA' }"
            :for="'IPDIAAURESASSradio-' + index"
            >{{ __label(item) }}</label
           >
          </span>
         </div>
          <div class="group-radio" style="flex-grow: 1" >
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAURESASS'].Items.filter(i => i.Code ==='IPDIAAURESASSSPO2')"
          >
           <input
            type="checkbox"
            :id="'IPDIAAURESASSradio-' + index + 2 "
            v-model="item.Value"
            @click="handleClickSpo2(item.Value)"
           />
           <label
            :for="'IPDIAAURESASSradio-' + index + 2"
            >{{ __label(item) }}</label
           >
          </span>
          <textarea-autosize
           rows="1"
           v-if="MASTERDATA['IPDIAAURESASS'].Items[4].Value"
           :placeholder="__t('Nhập')"
           class="form-control"
           v-model="MASTERDATA['IPDIAAURESASS'].Items[5].Value"
          />
         </div>
        </div>
          <!-- <div class="flex-box flex-center">
          <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAURESASS'].Items"
           v-if="index < 5"
          >
           <input
            type="checkbox"
            :id="'IPDIAAURESASSradio-' + index"
            v-model="item.Value"
           @click="handleClickIPDIAAURESASS(item.Value, index)"

           />
           <label
            :class="{ 'label-b': item.Code === 'IPDIAAURESASSTACH' || item.Code === 'IPDIAAURESASSROI' || item.Code === 'IPDIAAURESASSAPNEA' }"
            :for="'IPDIAAURESASSradio-' + index"
            @click="checkbox2RadioText(MASTERDATA['IPDIAAURESASS'].Items, item)"
            >{{ __label(item) }}</label
           >
          </span>
          </div>
          </div> -->
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUNEEDIDHH']">
        <th>{{ __label(MASTERDATA["IPDIAAUNEEDIDHH"]) }}</th>
        <td>
         <div class="flex-box flex-center" :class="MASTERDATA['IPDIAAURESASS'].Items[1].Value || MASTERDATA['IPDIAAURESASS'].Items[2].Value || MASTERDATA['IPDIAAURESASS'].Items[3].Value ? ' disabel-table' : ''">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUNEEDIDHH'].Items"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUNEEDIDHHcxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUNEEDIDHHcxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
          <!--  -->
         </div>
        </td>
       </tr>
      </table>
      <!-- trạng thái thần kinh -->
      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block4"
      >
       <tr>
        <td colspan="2" class="no-padding">
          <div class="tbl-title" >
          4.
          {{__t('InitialAssessment.label10')}}
         </div>
        </td>
       </tr>
        <tr v-if="MASTERDATA['IPDIAAUSTATUS']">
        <th width="1">
         <div class="w160">
          {{ __label(MASTERDATA["IPDIAAUSTATUS"]) }}
         </div>
        </th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSTATUS'].Items"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUSTATUSradio-' + index"
            v-model="item.Value"
            @click="handleClickIPDIAAUSTATUS(item.Code, item.Value)"
           />
           <label
            :class="{ 'label-b': item.Code === 'IPDIAAUSTATUSLET' || item.Code === 'IPDIAAUSTATUSCRY' }"
            :for="'IPDIAAUSTATUSradio-' + index"
            @click="checkbox2RadioText(MASTERDATA['IPDIAAUSTATUS'].Items, item)"
            >{{ __label(item) }}</label
           >
          </span>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUNEEDIDTK']">
        <th>{{ __label(MASTERDATA["IPDIAAUNEEDIDTK"]) }}</th>
        <td>
         <div class="flex-box flex-center" :class="MASTERDATA['IPDIAAUSTATUS'].Items[1].Value || MASTERDATA['IPDIAAUSTATUS'].Items[2].Value ? ' disabel-table' : ''">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUNEEDIDTK'].Items"
          >
           <div
            class="flex-box flex-center"
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUNEEDIDTKcxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUNEEDIDTKcxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
         </div>
        </td>
       </tr>
      </table>

      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block5"
      >
       <tr>
        <td colspan="2" class="no-padding">
         <div class="tbl-title">5. {{__t('InitialAssessment.label9')}}</div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUCOLORSKIN']">
        <th width="1">
         <div class="w160">
          {{ __label(MASTERDATA["IPDIAAUCOLORSKIN"]) }}
         </div>
        </th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUCOLORSKIN'].Items.filter(i => i.DataType !=='Text')"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUCOLORSKINradio-' + index"
            v-model="item.Value"
            @click="handleClickIPDIAAUCOLORSKIN(item.Code, item.Value)"
           />
           <label
            :class="{ 'label-b': item.Code === 'IPDIAAUCOLORSKINP' || item.Code === 'IPDIAAUCOLORSKINC' || item.Code === 'IPDIAAUCOLORSKINJ' || item.Code === 'IPDIAAUCOLORSKINOTH' }"
            :for="'IPDIAAUCOLORSKINradio-' + index"
            @click="checkbox2RadioText(MASTERDATA['IPDIAAUCOLORSKIN'].Items, item)"
            >{{ __label(item) }}</label
           >
          </span>
          <textarea-autosize
           rows="1"
           v-if="MASTERDATA['IPDIAAUCOLORSKIN'].Items[4].Value"
           :placeholder="__t('Nhập')"
           class="form-control"
           v-model="MASTERDATA['IPDIAAUCOLORSKIN'].Items[5].Value"
          />
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUMOITURE']">
        <th width="1">
         <div class="w160">
          {{ __label(MASTERDATA["IPDIAAUMOITURE"]) }}
         </div>
        </th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUMOITURE'].Items"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUMOITUREradio-' + index"
            v-model="item.Value"
           />
           <label
            :for="'IPDIAAUMOITUREradio-' + index"
            @click="checkbox2Radio(MASTERDATA['IPDIAAUMOITURE'].Items, item)"
            >{{ __label(item) }}</label
           >
          </span>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUOTWO']">
        <th>{{ __label(MASTERDATA["IPDIAAUOTWO"]) }}</th>
        <td>
         <div class="group-radio flex-center">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUOTWO'].Items"
           v-if="index < 2"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUOTWOradio-' + index"
            v-model="item.Value"
           />
           <label
            :for="'IPDIAAUOTWOradio-' + index"
            @click="checkbox2Radio(MASTERDATA['IPDIAAUOTWO'].Items, item)"
            >{{ __label(item) }}</label
           >
          </span>
          <template v-if="MASTERDATA['IPDIAAUOTWO'].Items[1].Value">
           <span class="no-wrap ml-5 mr-5">{{
            __label(MASTERDATA["IPDIAAUOTWO"].Items[2])
           }}</span>
           <textarea-autosize
            rows="1"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUOTWO'].Items[2].Value"
           />
          </template>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUITV4']">
        <th>{{__t('InitialAssessment.label19')}}</th>
        <td>
         <div class="flex-box flex-center">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUITV4'].Items.filter(i => i.Code ==='IPDIAAUITV4IAP')"
          >
           <div
            class="flex-box flex-center"
            :class="MASTERDATA['IPDIAAUCOLORSKIN'].Items[1].Value || MASTERDATA['IPDIAAUCOLORSKIN'].Items[2].Value || MASTERDATA['IPDIAAUCOLORSKIN'].Items[3].Value || MASTERDATA['IPDIAAUCOLORSKIN'].Items[4].Value ? 'disabel-table' : ''"
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUITV4cxo-' + index"
              v-model="item.Value"
              @click="handleClickIPDIAAUITV4(item.Code, item.Value)"
             />
             <label :for="'IPDIAAUITV4cxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
          <!-- 2 -->
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUITV4'].Items.filter(i => i.Code ==='IPDIAAUITV4WOC')"
          >
           <div
            class="flex-box flex-center"
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUITV4cxo-' + index + 2"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUITV4cxo-' + index + 2"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
         </div>
        </td>
       </tr>
      </table>

      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block6"
      >
       <tr>
        <td colspan="2" class="no-padding">
         <div class="tbl-title">6. {{__t('InitialAssessment.pain')}}</div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUSEDA']">
        <th width="1">
         <div class="w160">
          {{ __label(MASTERDATA["IPDIAAUSEDA"]) }}
         </div>
        </th>
        <td>
         <div class="group-radio mb-10">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSEDA'].Items"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUSEDAradio-' + index"
            v-model="item.Value"
            @click="handleClickIPDIAAUSEDA()"
           />
           <label
            :for="'IPDIAAUSEDAradio-' + index"
            @click="checkbox2Radio(MASTERDATA['IPDIAAUSEDA'].Items, item)"
            >{{ __label(item) }}</label
           >
          </span>
         </div>
         <!-- bảng -->
         <table
          class="table observation-table no-margin tbl-b2"
          v-if="MASTERDATA['IPDIAAUSEDA'].Items[1].Value"
         >
          <thead>
            <tr>
             <th class="text-center"  >
              {{__t('InitialAssessment.core-sedation')}}
             </th>
             <th width="80px" class="text-center no-wrap">
              {{__t('InitialAssessment.poin')}}
             </th>
            </tr>
           </thead>
          <template>
           <tbody>
            <tr >
             <template >
              <td style="position: relative">
              <span>{{__t('InitialAssessment.cry')}} </span>
              </td>
              <td >
                <!-- khóc -->
              <select class="form-control" @change="handleSelectSedation"  v-model="MASTERDATA['IPDIAAUSCORESEDATION1'].Items[0].Value">
              <option :value="'-10'">-10</option>
              <option :value="'-9'">-9</option>
              <option :value="'-8'">-8</option>
              <option :value="'-7'">-7</option>
              <option :value="'-6'">-6</option>
              <option :value="'-5'">-5</option>
              <option :value="'-4'">-4</option>
              <option :value="'-3'">-3</option>
              <option :value="'-2'">-2</option>
              <option :value="'-1'">-1</option>
              <option :value="'-0'">0</option>
            </select>
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.behavior')}}</span>
              </td>
              <td >
              <select class="form-control" @change="handleSelectSedation"  v-model="MASTERDATA['IPDIAAUSCORESEDATION2'].Items[0].Value">
                <option :value="'-10'">-10</option>
              <option :value="'-9'">-9</option>
              <option :value="'-8'">-8</option>
              <option :value="'-7'">-7</option>
              <option :value="'-6'">-6</option>
              <option :value="'-5'">-5</option>
              <option :value="'-4'">-4</option>
              <option :value="'-3'">-3</option>
              <option :value="'-2'">-2</option>
              <option :value="'-1'">-1</option>
              <option :value="'-0'">0</option>
            </select>
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.expression')}} </span>
              </td>
              <td >
            <select class="form-control" @change="handleSelectSedation"  v-model="MASTERDATA['IPDIAAUSCORESEDATION3'].Items[0].Value">
                <option :value="'-10'">-10</option>
              <option :value="'-9'">-9</option>
              <option :value="'-8'">-8</option>
              <option :value="'-7'">-7</option>
              <option :value="'-6'">-6</option>
              <option :value="'-5'">-5</option>
              <option :value="'-4'">-4</option>
              <option :value="'-3'">-3</option>
              <option :value="'-2'">-2</option>
              <option :value="'-1'">-1</option>
              <option :value="'-0'">0</option>
            </select>
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.firmness')}} </span>
              </td>
              <td >
              <select class="form-control" @change="handleSelectSedation" v-model="MASTERDATA['IPDIAAUSCORESEDATION4'].Items[0].Value">
                <option :value="'-10'">-10</option>
              <option :value="'-9'">-9</option>
              <option :value="'-8'">-8</option>
              <option :value="'-7'">-7</option>
              <option :value="'-6'">-6</option>
              <option :value="'-5'">-5</option>
              <option :value="'-4'">-4</option>
              <option :value="'-3'">-3</option>
              <option :value="'-2'">-2</option>
              <option :value="'-1'">-1</option>
              <option :value="'-0'">0</option>
            </select>
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.vital-signs')}} </span>
              </td>
              <td >
            <select class="form-control" @change="handleSelectSedation"  v-model="MASTERDATA['IPDIAAUSCORESEDATION5'].Items[0].Value">
              <option :value="'-10'">-10</option>
              <option :value="'-9'">-9</option>
              <option :value="'-8'">-8</option>
              <option :value="'-7'">-7</option>
              <option :value="'-6'">-6</option>
              <option :value="'-5'">-5</option>
              <option :value="'-4'">-4</option>
              <option :value="'-3'">-3</option>
              <option :value="'-2'">-2</option>
              <option :value="'-1'">-1</option>
              <option :value="'-0'">0</option>
            </select>
              </td>
             </template>
            </tr>

            <!-- tổng -->
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span style="font-weight:bold; font-size:15px"> {{__t('InitialAssessment.total')}} </span>
              </td>
              <td :style="totalPaint <= -4 ? 'background-color:#E6A23C' : 'background-color:#409EFF'">
                <div class="text-center" >
                  <span>{{messageTotalPain}} </span>
                </div>
              </td>
             </template>
            </tr>
            <tr>
           </tr>
           </tbody>
          </template>
         </table>
        </td>
       </tr>
       <!-- đau -->
       <tr v-if="MASTERDATA['IPDIAAUPAI']">
        <th width="1">
         <div class="w160">
          {{ __label(MASTERDATA["IPDIAAUPAI"]) }}
         </div>
        </th>
        <td>
         <div class="group-radio mb-10">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUPAI'].Items"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUPAIradio-' + index"
            v-model="item.Value"
            @click="handleClickIPDIAAUPAI()"
           />
           <label
            :for="'IPDIAAUPAIradio-' + index"
            @click="checkbox2Radio(MASTERDATA['IPDIAAUPAI'].Items, item)"
            >{{ __label(item) }}</label
           >
          </span>
         </div>
         <!-- bảng -->
         <table
          class="table observation-table no-margin tbl-b2"
          v-if="MASTERDATA['IPDIAAUPAI'].Items[1].Value"
         >
          <thead>
            <tr>
             <th class="text-center"  >
              {{__t('InitialAssessment.core-pain')}}
             </th>
             <th width="80px" class="text-center no-wrap">
              {{__t('InitialAssessment.poin')}}
             </th>
            </tr>
           </thead>
          <template>
           <tbody>
            <tr >
             <template >
              <td style="position: relative">
              <span>{{__t('InitialAssessment.cry')}} </span>
              </td>
              <td >
              <select class="form-control" @change="handleSelectPain"  v-model="MASTERDATA['IPDIAAUSCOREPAIN1'].Items[0].Value">
              <option :value="'10'">10</option>
              <option :value="'9'">9</option>
              <option :value="'8'">8</option>
              <option :value="'7'">7</option>
              <option :value="'6'">6</option>
              <option :value="'5'">5</option>
              <option :value="'4'">4</option>
              <option :value="'3'">3</option>
              <option :value="'2'">2</option>
              <option :value="'1'">1</option>
              <option :value="'0'">0</option>
            </select>
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.behavior')}}</span>
              </td>
              <td >
              <select class="form-control" @change="handleSelectPain"  v-model="MASTERDATA['IPDIAAUSCOREPAIN2'].Items[0].Value">
              <option :value="'10'">10</option>
              <option :value="'9'">9</option>
              <option :value="'8'">8</option>
              <option :value="'7'">7</option>
              <option :value="'6'">6</option>
              <option :value="'5'">5</option>
              <option :value="'4'">4</option>
              <option :value="'3'">3</option>
              <option :value="'2'">2</option>
              <option :value="'1'">1</option>
              <option :value="'0'">0</option>
            </select>
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.expression')}} </span>
              </td>
              <td >
              <select class="form-control" @change="handleSelectPain"  v-model="MASTERDATA['IPDIAAUSCOREPAIN3'].Items[0].Value">
              <option :value="'10'">10</option>
              <option :value="'9'">9</option>
              <option :value="'8'">8</option>
              <option :value="'7'">7</option>
              <option :value="'6'">6</option>
              <option :value="'5'">5</option>
              <option :value="'4'">4</option>
              <option :value="'3'">3</option>
              <option :value="'2'">2</option>
              <option :value="'1'">1</option>
              <option :value="'0'">0</option>
            </select>
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.firmness')}} </span>
              </td>
              <td >
              <select class="form-control" @change="handleSelectPain"  v-model="MASTERDATA['IPDIAAUSCOREPAIN4'].Items[0].Value">
              <option :value="'10'">10</option>
              <option :value="'9'">9</option>
              <option :value="'8'">8</option>
              <option :value="'7'">7</option>
              <option :value="'6'">6</option>
              <option :value="'5'">5</option>
              <option :value="'4'">4</option>
              <option :value="'3'">3</option>
              <option :value="'2'">2</option>
              <option :value="'1'">1</option>
              <option :value="'0'">0</option>
            </select>
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.vital-signs')}} </span>
              </td>
              <td >
              <select class="form-control" @change="handleSelectPain"  v-model="MASTERDATA['IPDIAAUSCOREPAIN5'].Items[0].Value">
              <option :value="'10'">10</option>
              <option :value="'9'">9</option>
              <option :value="'8'">8</option>
              <option :value="'7'">7</option>
              <option :value="'6'">6</option>
              <option :value="'5'">5</option>
              <option :value="'4'">4</option>
              <option :value="'3'">3</option>
              <option :value="'2'">2</option>
              <option :value="'1'">1</option>
              <option :value="'0'">0</option>
            </select>
              </td>
             </template>
            </tr>

            <!-- tổng -->
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span style="font-weight:bold;font-size:15px"> {{__t('InitialAssessment.total')}} </span>
              </td>
              <td :style="totalPoint >= 4 ? 'background-color:#E6A23C' : 'background-color:#409EFF'">
                <div class="text-center" >
                  <span>{{messageTotalPoin}} </span>
                </div>
              </td>
             </template>
            </tr>
            <tr>
           </tr>
           </tbody>
          </template>
         </table>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUNEEDIDDAU']">
        <th>{{__t('InitialAssessment.label12')}}</th>
        <td>
         <div class="flex-box flex-center" :class="this.totalPoint >= 4 || this.totalPaint <= -4 ? 'disabel-table' : ''">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUNEEDIDDAU'].Items"
          >
           <div
            class="flex-box flex-center"
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUNEEDIDDAUcxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUNEEDIDDAUcxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
         </div>
        </td>
       </tr>
      </table>
      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block7"
      >
       <tr>
        <td colspan="2" class="no-padding">
         <div class="tbl-title">
          7. {{__t('InitialAssessment.label11')}}
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUVOM']">
                <th width="1">
                  <div class="w160">
                    {{ __label(MASTERDATA["IPDIAAUVOM"]) }}
                  </div>
                </th>
                <td>
                    <div class="mb10">
                      <div class="flex-box flex-center">
                        <div class="group-radio">
                          <span
                            :data="item"
                            :key="index"
                            v-for="(item, index) in MASTERDATA['IPDIAAUVOM']
                              .Items.filter(i => i.Code ==='IPDIAAUVOMNO' || i.Code ==='IPDIAAUVOMYES')"
                          >
                            <input
                              type="checkbox"
                              :id="'IPDIAAUVOMradio-' + index"
                              v-model="item.Value"
                              @click="handleclickVOMNO(index, item.Value)"
                            />
                            <label
                              :class="{
                                'label-b': item.Code === 'IPDIAAUVOMYES'
                              }"
                              :for="'IPDIAAUVOMradio-' + index"
                              >{{ __label(item) }}</label
                            >
                          </span>
                        </div>
                      </div>
                      <div class="flex-box flex-center" v-if="MASTERDATA['IPDIAAUVOM'].Items[1].Value">
                        <div class="group-radio">
                          <span
                            :data="item"
                            :key="index"
                            v-for="(item, index) in MASTERDATA['IPDIAAUVOM']
                              .Items.filter(i => i.Code ==='IPDIAAUVOMSOMETIME' || i.Code ==='IPDIAAUVOMREG')"
                          >
                            <input
                              type="checkbox"
                              :id="'IPDIAAUVOMradio-' + index + 2"
                              v-model="item.Value"
                              @click="handleClickIPDIAAUVOM(index, item.Value)"
                            />
                            <label
                              :for="'IPDIAAUVOMradio-' + index + 2"
                              >{{ __label(item) }}</label
                            >
                          </span>
                        </div>
                      </div>
                    </div>
                </td>
              </tr>
       <tr v-if="MASTERDATA['IPDIAAUDIE']">
        <th>{{ __label(MASTERDATA["IPDIAAUDIE"]) }}</th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUDIE'].Items"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUDIEradio-' + index"
            v-model="item.Value"
           />
           <label
            :for="'IPDIAAUDIEradio-' + index"
            @click="checkbox2RadioText(MASTERDATA['IPDIAAUDIE'].Items, item)"
            >{{ __label(item) }}</label
           >
          </span>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUFERO']">
        <th>{{ __label(MASTERDATA["IPDIAAUFERO"]) }}</th>
        <td>
         <div class="group-radio">
          <span
           @click="
            item.Code === 'IPDIAAUFEROTUF' && setIPDIAAUITV2('IPDIAAUITV8')
           "
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUFERO'].Items"
           v-if="index < 3"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUFEROradio-' + index"
            v-model="item.Value"
            @click="handleClickIPDIAAUFERO(index, item.Value)"
           />
           <label
            :class="{ 'label-b': item.Code === 'IPDIAAUFEROTUF' }"
            :for="'IPDIAAUFEROradio-' + index"
            @click="checkbox2Radio(MASTERDATA['IPDIAAUFERO'].Items, item)"
            >{{ __label(item) }}</label
           >
          </span>
          <textarea-autosize
           rows="1"
           v-if="MASTERDATA['IPDIAAUFERO'].Items[2].Value"
           :placeholder="__t('Nhập')"
           class="form-control"
           v-model="MASTERDATA['IPDIAAUFERO'].Items[3].Value"
          />
         </div>
        </td>
       </tr>
       <!-- thói quen đại tiện -->
       <tr v-if="MASTERDATA['IPDIAAUBHAB']">
        <th>{{ __label(MASTERDATA["IPDIAAUBHAB"]) }}</th>
        <td>
         <div class="flex-box" style="flex-flow: row wrap">
          <template v-for="(item, index) in MASTERDATA['IPDIAAUBHAB'].Items">
           <div
            class="group-radio"
            :data="item"
            :key="index"
            v-if="index < 4"
            :style="flexgroup(index)"
           >
            <span
            >
             <input
              type="checkbox"
              :id="'IPDIAAUBHABradio-' + index"
              v-model="item.Value"
              @click="handleClickIPDIAAUBHAB(index, item.Value)"
             />
             <label
              :class="{
               'label-b':
                item.Code === 'IPDIAAUBHABCON' ||
                item.Code === 'IPDIAAUBHAB',
              }"
              :for="'IPDIAAUBHABradio-' + index"
              @click="checkbox2Radio(MASTERDATA['IPDIAAUBHAB'].Items, item)"
              >{{ __label(item) }}</label
             >
            </span>
            <textarea-autosize
             rows="1"
             v-if="MASTERDATA['IPDIAAUBHAB'].Items[3].Value && index === 3"
             :placeholder="__t('Nhập')"
             class="form-control"
             v-model="MASTERDATA['IPDIAAUBHAB'].Items[4].Value"
            />
           </div>
           <div
            v-if="index === 2"
            :key="index + 'flexIPDIAAUBHABradio'"
            class="flex-break-sm"
           ></div>
          </template>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUSTOOLCOLOR']">
        <th width="1">
         <div class="w160">
          {{ __label(MASTERDATA["IPDIAAUSTOOLCOLOR"]) }}
         </div>
        </th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSTOOLCOLOR'].Items"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUSTOOLCOLORradio-' + index"
            v-model="item.Value"
            @click="handleClickIPDIAAUSTOOLCOLOR(index, item.Value)"
           />
           <label
            :class="{ 'label-b': item.Code === 'IPDIAAUSTOOLCOLORG' || item.Code === 'IPDIAAUSTOOLCOLORB' }"
            :for="'IPDIAAUSTOOLCOLORradio-' + index"
            @click="checkbox2RadioText(MASTERDATA['IPDIAAUSTOOLCOLOR'].Items, item)"
            >{{ __label(item) }}</label
           >
          </span>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUNEEDIDDD']">
        <th>{{ __label(MASTERDATA["IPDIAAUNEEDIDDD"]) }}</th>
        <td>
         <div class="flex-box flex-center" :class="MASTERDATA['IPDIAAUVOM'].Items[1].Value || MASTERDATA['IPDIAAUSTOOLCOLOR'].Items[2].Value  || MASTERDATA['IPDIAAUSTOOLCOLOR'].Items[1].Value || MASTERDATA['IPDIAAUBHAB'].Items[2].Value  || MASTERDATA['IPDIAAUVOM'].Items[2].Value || MASTERDATA['IPDIAAUBHAB'].Items[1].Value || MASTERDATA['IPDIAAUFERO'].Items[1].Value ? 'disabel-table' : ''">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUNEEDIDDD'].Items"
          >
           <div
            class="flex-box flex-center"
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUNEEDIDDDcxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUNEEDIDDDcxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
         </div>
        </td>
       </tr>
      </table>

      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block8"
      >
       <tr>
        <td colspan="2" class="no-padding">
         <div class="tbl-title">8. {{__t('InitialAssessment.label13')}}</div>
        </td>
       </tr>
      <tr v-if="MASTERDATA['IPDIAAUURINA']">
        <th width="1">
         <div class="w160">
          {{ __label(MASTERDATA["IPDIAAUURINA"]) }}
         </div>
        </th>
        <td>
        <div class="flex-box flex-center">
          <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUURINA'].Items.filter(i => i.Code ==='IPDIAAUURINANOR' || i.Code ==='IPDIAAUURINAOLI')"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUURINAradio-' + index"
            v-model="item.Value"
            @click="ChangeIPDIAAUURINA(item.Value, index)"
           />
           <label
            :class="{ 'label-b': item.Code === 'IPDIAAUURINAOLI' }"
            :for="'IPDIAAUURINAradio-' + index"
            @click="checkbox2RadioText(MASTERDATA['IPDIAAUURINA'].Items, item)"
            >{{ __label(item) }}</label
           >
          </span>
         </div>
         <b v-if="MASTERDATA['IPDIAAUURINA'].Items[1].Value" style="margin-left:20px"  class="no-wrap mgl-5 mgr-5">{{__t('InitialAssessment.label61')}}</b>
          <div
           class="ml-10"
           v-if="MASTERDATA['IPDIAAUURINA'].Items[1].Value"
          >
           <textarea-autosize
            class="form-control"
            rows="2"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUURINA'].Items[3].Value"
           />
          </div>

          <div class="group-radio" style="flex-grow: 1" >
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUURINA'].Items.filter(i => i.Code ==='IPDIAAUURINAOTH' && i.DataType !=='Text')"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUURINAradio-' + index + 2 "
            v-model="item.Value"
            @click="ChangeIPDIAAUURINA(item.Value, 3)"
           />
           <label
            :for="'IPDIAAUURINAradio-' + index + 2"
            >{{ __label(item) }}</label
           >
          </span>
          <textarea-autosize
           rows="1"
           v-if="MASTERDATA['IPDIAAUURINA'].Items[4].Value"
           :placeholder="__t('Nhập')"
           class="form-control"
           v-model="MASTERDATA['IPDIAAUURINA'].Items[5].Value"
          />
         </div>
        </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUNEEDIDTN']">
        <th>{{__t('InitialAssessment.label12')}}</th>
        <td>
         <div class="flex-box flex-center" :class="MASTERDATA['IPDIAAUURINA'].Items[1].Value ? 'disabel-table' : ''">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUNEEDIDTN'].Items"
          >
           <div
            class="flex-box flex-center"
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUNEEDIDTNcxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUNEEDIDTNcxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
         </div>
        </td>
       </tr>
      </table>

      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block9"
      >
       <tr>
        <td colspan="2" class="no-padding">
         <div class="tbl-title" >9. {{__t('InitialAssessment.label14')}}</div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAURELI']">
        <th width="1">
         <div class="w160">
          {{ __label(MASTERDATA["IPDIAAURELI"]) }}
         </div>
        </th>
        <td>
         <div class="group-radio">
          <template
           :data="item"
           v-for="(item, index) in MASTERDATA['IPDIAAURELI'].Items"
          >
           <span :key="index" v-if="item.DataType === 'Select'">
            <V2Select
             v-model="item.Value"
             :items="select2Suggest(IPDIAAURELIDATA)"
            />
           </span>
           <span :key="index" v-else style="flex-grow: 1">
            <input
             class="form-control"
             v-model="item.Value"
             v-if="MASTERDATA['IPDIAAURELI'].Items[0].Value == 6"
            />
           </span>
          </template>
         </div>
        </td>
       </tr>
       <!-- đang ở cùng ai -->
      <tr v-if="MASTERDATA['IPDIAAULIWI']">
        <th>{{ __label(MASTERDATA["IPDIAAULIWI"]) }}</th>
        <td>
         <div class="flex-box flex-center">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAULIWI'].Items.filter(i => i.Code ==='IPDIAAULIWIPAR' || i.Code =='IPDIAAULIWISM' || i.Code ==='IPDIAAULIWISD'
            || i.Code ==='IPDIAAULIWIGRA' || i.Code ==='IPDIAAULIWIOTH')"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAULIWIcxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAULIWIcxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
          <div
           style="flex-grow: 1"
           class="flex-box flex-center ml-10"
           v-if="MASTERDATA['IPDIAAULIWI'].Items[9].Value"
          >
           <textarea-autosize
            rows="1"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAULIWI'].Items[6].Value"
           />
          </div>
         </div>
        </td>
       </tr>
       <!-- anh chị em -->
       <tr v-if="MASTERDATA['IPDIAAUSL']">
        <th>{{ __label(MASTERDATA["IPDIAAUSL"]) }}</th>
        <td>
         <!-- <div class="flex-box flex-center mb-20">
          <div class="flex-box flex-center">
           <textarea-autosize
            rows="1"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUSL'].Items[0].Value"
           />
          </div>
         </div> -->
         <div class="w150 display-inline mr-10 mb-20">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSL'].Items"
           >
            <div class="mb-5">
             <b>{{__t('InitialAssessment.number')}}</b>
             <!-- <span class="note-text">({{ __t("%") }})</span> -->
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
          <table
          class="table observation-table no-margin tbl-b2"
          v-if="!loading"
         >
          <thead>
            <tr>
             <th class="text-left" width="150px">
              {{__t('InitialAssessment.age')}}
             </th>
             <th width="150px" class="text-left no-wrap">
              {{__t('InitialAssessment.gender')}}
             </th>
            </tr>
           </thead>
          <template v-if="DataSubmit.Siblings && DataSubmit.Siblings.length">
           <tbody>
            <tr :key="index" v-for="(item, index) in DataSubmit.Siblings">
              <!-- <template v-if="!RealOnly">
              <td><textarea-autosize v-model="item.Age" rows="1" class="form-control" :placeholder="__t('Nhập')"/></td><textarea-autosize v-model="item.Age" rows="1" class="form-control" :placeholder="__t('Nhập')"/></td>
              <td><textarea-autosize v-model="item.Gender" rows="1" class="form-control" :placeholder="__t('Nhập')"/></td>
             </template> -->
             <template v-if="!RealOnly">
              <td style="position: relative">
               <button class="btn-pos-left" @click="remove(item, index)">
                <i class="fa fa-trash" aria-hidden="true"></i></button
               >
               <VNumberInput v-model="item.Age"/>
              </td>
              <td width="110px">
                <radio-list v-model="item.Gender" :options="GENDERLIST" />
              </td>
             </template>
            </tr>
            <tr>
            <td colspan="4" class="text-center">
             <button @click="add(item)" class="btn btn-info">
              <i class="fa fa-plus" aria-hidden="true"></i>
              {{ __t("Thêm ") }}
             </button>
            </td>
           </tr>
           </tbody>
          </template>

          <tfoot v-else>
           <tr>
            <td colspan="4" class="text-center">
             <button @click="addItem" class="btn btn-info">
              <i class="fa fa-plus" aria-hidden="true"></i>
              {{ __t("Thêm ") }}
             </button>
            </td>
           </tr>
          </tfoot>
         </table>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUTT']">
        <th>{{ __label(MASTERDATA["IPDIAAUTT"]) }}</th>
        <td>
         <div class="flex-box flex-center">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUTT'].Items"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUTTcxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUTTcxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUITV10']">
        <th>{{__t('InitialAssessment.label12')}}</th>
        <td>
         <div class="flex-box flex-center">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUITV10'].Items.filter(
            (i) => i.Code === 'IPDIAAUITV10FOH'
           )"
          >
           <div
            class="flex-box flex-center"
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUITV10cxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUITV10cxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
         </div>
        </td>
       </tr>
      </table>
      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block10"
      >
       <tr>
        <td colspan="2" class="no-padding">
         <div class="tbl-title">
          10. {{__t('InitialAssessment.label15')}}
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUPWSI']">
        <td colspan="2">
         <div class="flex-box flex-center" style="flex-flow: row wrap">
          <div class="group-radio">
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUPWSI'].Items"
           >
            <input
             type="checkbox"
             :id="'IPDIAAUPWSIradio-' + index"
             v-model="item.Value"
            />
            <label
             :for="'IPDIAAUPWSIradio-' + index"
             @click="SyncDiseasesScreening(item.Value)"
             >{{__t('InitialAssessment.label16')}}</label
            >
           </span>
          </div>
          <span  class="mgr-5">{{__t('InitialAssessment.select-tick10')}}
          </span>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUOAIN']">
        <th width="1">
         <div class="w160">{{ __t("Câu hỏi sàng lọc") }}</div>
        </th>
        <td>
         <div class="flex-box flex-center" v-if="DataSubmit.Version === 1">
          <div class="br1">
           <table class="no-border">
            <tr>
             <td>{{ __label(MASTERDATA["IPDIAAUFERV"]) }}</td>
             <td>
              <div class="group-radio">
               <span
                :data="item"
                :key="index"
                v-for="(item, index) in MASTERDATA['IPDIAAUFERV'].Items"
               >
                <input
                 type="checkbox"
                 :id="'IPDIAAUFERVradio-' + index"
                 v-model="item.Value"
                />
                <label
                 :for="'IPDIAAUFERVradio-' + index"
                 @click="checkbox2Radio(MASTERDATA['IPDIAAUFERV'].Items, item)"
                 >{{ __label(item) }}</label
                >
               </span>
              </div>
             </td>
            </tr>
            <tr>
             <td>{{ __label(MASTERDATA["IPDIAAURUSL"]) }}</td>
             <td>
              <div class="group-radio">
               <span
                :data="item"
                :key="index"
                v-for="(item, index) in MASTERDATA['IPDIAAURUSL'].Items"
               >
                <input
                 type="checkbox"
                 :id="'IPDIAAURUSLradio-' + index"
                 v-model="item.Value"
                />
                <label
                 :for="'IPDIAAURUSLradio-' + index"
                 @click="checkbox2Radio(MASTERDATA['IPDIAAURUSL'].Items, item)"
                 >{{ __label(item) }}</label
                >
               </span>
              </div>
             </td>
            </tr>
            <tr>
             <td>{{ __label(MASTERDATA["IPDIAAUTRAV"]) }}</td>
             <td>
              <div class="group-radio">
               <span
                :data="item"
                :key="index"
                v-for="(item, index) in MASTERDATA['IPDIAAUTRAV'].Items"
               >
                <input
                 type="checkbox"
                 :id="'IPDIAAUTRAVradio-' + index"
                 v-model="item.Value"
                />
                <label
                 :for="'IPDIAAUTRAVradio-' + index"
                 @click="checkbox2Radio(MASTERDATA['IPDIAAUTRAV'].Items, item)"
                 >{{ __label(item) }}</label
                >
               </span>
              </div>
             </td>
            </tr>
            <tr>
             <td>{{ __label(MASTERDATA["IPDIAAUCOUG"]) }}</td>
             <td>
              <div class="group-radio">
               <span
                :data="item"
                :key="index"
                v-for="(item, index) in MASTERDATA['IPDIAAUCOUG'].Items"
               >
                <input
                 type="checkbox"
                 :id="'IPDIAAUCOUGradio-' + index"
                 v-model="item.Value"
                />
                <label
                 :for="'IPDIAAUCOUGradio-' + index"
                 @click="checkbox2Radio(MASTERDATA['IPDIAAUCOUG'].Items, item)"
                 >{{ __label(item) }}</label
                >
               </span>
              </div>
             </td>
            </tr>
            <tr>
             <td>{{ __label(MASTERDATA["IPDIAAUCCWS"]) }}</td>
             <td>
              <div class="group-radio">
               <span
                :data="item"
                :key="index"
                v-for="(item, index) in MASTERDATA['IPDIAAUCCWS'].Items"
               >
                <input
                 type="checkbox"
                 :id="'IPDIAAUCCWSradio-' + index"
                 v-model="item.Value"
                />
                <label
                 :for="'IPDIAAUCCWSradio-' + index"
                 @click="checkbox2Radio(MASTERDATA['IPDIAAUCCWS'].Items, item)"
                 >{{ __label(item) }}</label
                >
               </span>
              </div>
             </td>
            </tr>
           </table>
          </div>
          <div>
           <p>{{ __label(MASTERDATA["IPDIAAUTSIP"]) }}</p>
           <div class="group-radio">
            <span
             :data="item"
             :key="index"
             v-for="(item, index) in MASTERDATA['IPDIAAUTSIP'].Items"
            >
             <input
              type="checkbox"
              :id="'IPDIAAUTSIPradio-' + index"
              v-model="item.Value"
             />
             <label
              :for="'IPDIAAUTSIPradio-' + index"
              @click="checkbox2Radio(MASTERDATA['IPDIAAUTSIP'].Items, item)"
              >{{ __label(item) }}</label
             >
            </span>
           </div>
           <!--
                        <input type="text" v-model="MASTERDATA['IPDIAAUTSIP'].Items[1].Value" />
                      -->
           <template v-if="MASTERDATA['IPDIAAUTSIP'].Items[1].Value">
            <div class="mt-5 mb-5">
             {{ __label(MASTERDATA["IPDIAAULOCL"]) }}
            </div>
            <template
             :data="item"
             v-for="(item, index) in MASTERDATA['IPDIAAULOCL'].Items"
            >
             <div
              :key="index"
              class="group-radio mb-5"
              v-if="item.DataType === 'Radio'"
             >
              <span>
               <input
                type="checkbox"
                :id="'IPDIAAULOCLradio-' + index"
                v-model="item.Value"
               />
               <label
                :for="'IPDIAAULOCLradio-' + index"
                @click="checkbox2Radio(MASTERDATA['IPDIAAULOCL'].Items, item)"
                >{{ __label(item) }}</label
               >
              </span>
             </div>
             <div
              class="mt-10"
              style="flex-grow: 1"
              :key="index"
              v-if="
               item.DataType === 'Text' &&
               MASTERDATA['IPDIAAULOCL'].Items[3].Value
              "
             >
              <textarea-autosize
               rows="1"
               :placeholder="__t('Nhập')"
               class="form-control"
               v-model="item.Value"
              />
             </div>
            </template>
            <!--
                          <div class="flex-box flex-center" style="flex-flow: row wrap;">
                            <div class="group-radio mb-5" :data="item" :key="index" v-for="(item,index) in MASTERDATA['IPDIAAULOCL'].Items" >
                              <span>
                                <input type="checkbox" :id="'IPDIAAULOCLradio-' + index" v-model="item.Value">
                                <label :for="'IPDIAAULOCLradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIAAULOCL'].Items, item)">{{__label(item)}}</label>
                              </span>
                            </div>
                          </div>
                        -->
           </template>
          </div>
         </div>
         <CommunicableDiseasesScreening
          v-model="MASTERDATA"
          :type="'IDAU'"
          :version="DataSubmit.Version"
          v-else
         />
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUNEID']">
        <th>{{ __label(MASTERDATA["IPDIAAUNEID"]) }}</th>
        <td>
         <div>
          <div class="flex-box flex-center" style="flex-flow: row wrap">
           <template
            :data="item"
            v-for="(item, index) in MASTERDATA['IPDIAAUNEID'].Items"
            v-if="index < 2"
           >
            <div
             :key="index"
             class="flex-box flex-center"
             v-if="item.DataType === 'Checkbox'"
             :class="{ 'disabel-table2s': index === 2 }"
            >
             <div class="v-checkbox">
              <input
               type="checkbox"
               :id="'IPDIAAUNEIDcxo-' + index"
               v-model="item.Value"
              />
              <label :for="'IPDIAAUNEIDcxo-' + index"></label>
             </div>
             <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
             >
            </div>
           </template>
          </div>
         </div>
         <div class="flex-box flex-center">
          <div class="v-checkbox">
           <input
            type="checkbox"
            :id="'IPDIAAUNEIDcxo-' + 2"
            v-model="MASTERDATA['IPDIAAUNEID'].Items[2].Value"
           />
           <label :for="'IPDIAAUNEIDcxo-' + 2"></label>
          </div>
          <span class="displaytbl w200"
           ><span>{{ __label(MASTERDATA["IPDIAAUNEID"].Items[2]) }}</span></span
          >
          <textarea-autosize
           rows="1"
           v-if="MASTERDATA['IPDIAAUNEID'].Items[2].Value"
           :placeholder="__t('Nhập')"
           class="form-control mgl-5"
           v-model="MASTERDATA['IPDIAAUNEID'].Items[3].Value"
          />
         </div>
        </td>
       </tr>
      </table>

      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block11"
      >
       <tr>
        <td colspan="2" class="no-padding">
         <div class="tbl-title">11. {{__t('InitialAssessment.permission')}}</div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUNBDY']">
        <th width="1">
         <div class="w160">
          {{ __label(MASTERDATA["IPDIAAUNBDY"]) }}
         </div>
        </th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index + 'IPDIAAUNBDYradio'"
           v-for="(item, index) in MASTERDATA['IPDIAAUNBDY'].Items"
           v-if="index < 2"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUNBDYradio-' + index"
            v-model="item.Value"
           />
           <label
            :for="'IPDIAAUNBDYradio-' + index"
            @click="checkbox2Radio(MASTERDATA['IPDIAAUNBDY'].Items, item)"
            >{{ __label(item) }}</label
           >
          </span>
          <textarea-autosize
           rows="1"
           v-if="MASTERDATA['IPDIAAUNBDY'].Items[1].Value"
           :placeholder="__t('Nhập')"
           class="form-control"
           v-model="MASTERDATA['IPDIAAUIPAN'].Items[0].Value"
          />
         </div>
         <div class="mt-5">
          <i>{{ __label(MASTERDATA["IPDIAAUNISR"]) }}</i>
         </div>
        </td>
       </tr>
      </table>

      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block12"
      >
       <tr>
        <td colspan="2" class="no-padding">
         <div class="tbl-title">12. {{__t('InitialAssessment.other')}}</div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUITIN']">
        <th width="1">
         <div class="w160">
          {{ __label(MASTERDATA["IPDIAAUITIN"]) }}
         </div>
        </th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index + 'IPDIAAUITINradio'"
           v-for="(item, index) in MASTERDATA['IPDIAAUITIN'].Items"
           v-if="item.DataType === 'Radio'"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUITINradio-' + index"
            v-model="item.Value"
           />
           <label
            :for="'IPDIAAUITINradio-' + index"
            @click="checkbox2Radio(MASTERDATA['IPDIAAUITIN'].Items, item)"
            >{{ __label(item) }}</label
           >
          </span>
         </div>
         <textarea-autosize
          rows="3"
          v-if="MASTERDATA['IPDIAAUITIN'].Items[1].Value"
          :placeholder="__t('Nhập')"
          class="form-control mt-10"
          v-model="MASTERDATA['IPDIAAUITIN'].Items[2].Value"
         />
        </td>
       </tr>
      </table>
      <br /><br /><br />
      <div class="row" v-if="DataSubmit.Version >= 9">
        <Confirm
        class="mt-10"
        ref="Confirm"
        :key="reset"
        :MasterDataCode="'A02_015_220321_VE'"
        :FormCode="'A02_015_220321_VE'"
        :ReadOnly="readonly"
        :AdInfo="[DataSubmit.CreatedBy]"
        :VisitId="_VisitId"
        :FormId="DataSubmit.Id"
        :saveSuccesss="saveSuccesss"
        @handleConfirm="submit('confirm')"
        @confirmSuccess="getData()"
      />
      </div>
      <div class="row" v-else>
        <div class="col-md-6 col-sm-6 text-center"></div>
        <div class="col-md-6 col-sm-6 text-center">
        <template v-if="DataSubmit.UpdatedAt && DataSubmit.UpdatedBy">
          <p>{{ DataSubmit.UpdatedAt }}</p>
          <eform-signature
          :ad="DataSubmit.UpdatedBy.Username"
          :title="__t('Điều dưỡng thực hiện')"
          />
        </template>
        </div>
      </div>
      <div>
      <p>A02_015_220321_VE</p>
      <logs
       :EdId="this.$route.params.Id"
       :Type="'InitialAssessment/ForAdult'"
       :noDetail="true"
      />
     </div>
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit.UpdatedBy" :ad="DataSubmit.UpdatedBy.Username" /> {{__t('lúc')}} {{DataSubmit.UpdatedAt | formatDateWithoutSecon}}</p>
     </div>
     <FloatBlock v-if="!readonly">
       <template slot="top" v-if="syncInfo">
       <div style="color: #fff; text-align: right">
        <b>Dữ liệu được đồng bộ từ khoa:</b>
        {{ __label(syncInfo.Specialty) }}
       </div>
      </template>
      <template slot="buttons">
       <div v-if="!checkTab" class="col-md-2 col-sm-2">
        <!-- <div class="form-group1"><RemoveBtn /></div> -->
       </div>
       <div class="col-md-2">
        <div class="form-group1">
         <p class="hidden-text">hidden-text</p>
        </div>
       </div>
       <div class="col-md-3">
        <div class="form-group1">
         <button
          class="btn pull-right btn-block"
          type="button"
          @click="
           $router.push({
            name: 'IPDFallRiskAssessment',
            params: { Id: $route.params.Id },
           })
          "
         >
          {{ __t("Đánh giá nguy cơ ngã") }}
         </button>
        </div>
       </div>
       <div class="col-md-5">
        <div class="form-group1">
         <button
          class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
          type="button"
          v-shortkey="['ctrl', 's']"
          @shortkey="submit()"
          @click="submit()"
         >
          <i class="fa fa-floppy-o" aria-hidden="true"></i>
          {{ __t("btn.luu") }}
         </button>
        </div>
       </div>
      </template>
    </FloatBlock>
    </template>
    <div v-else style="padding: 20px">
     <div class="text-center" >
      <p >{{__t('InitialAssessment.label18')}}</p>
      <button v-if="!IsLocked" class="btn btn-warning" @click="confirmPopup">
       {{ __t("Tạo mới") }}
      </button>
     </div>
    </div>
   </template>
   <div v-else class="loading-text"><v-loading /></div>
  </div>
 </div>
</template>
<script>
import Confirm from '@/components/Form/Confirm'
import VDatePicker from '@/components/VDateTimePicker.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import constants from '@/constants'
import V2Select from '@/components/VSelect.vue'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
import InitialAssessment from '@/services/IPD/InitialAssessment'
import Logs from '@/components/Logs.vue'
import FormMixin from './Mixi.js'
import RemoveBtn from './Delete.vue'
import NProgress from 'nprogress'
import ViewOnly from '@/components/IPD/ForNewBornView.vue'
import _ from 'lodash'
import EventBus from '@/lib/eventBus'
import EIOService from '@/services/IPD/EIOService'
export default {
  name: 'IPDInitialAssessmentForNewBorn',
  mixins: [MixinForm, MixinMasterData, FormMixin],
  data () {
    return {
      saveSuccesss: false,
      isConfirm: false,
      GENDERLIST: constants.GENDERLIST,
      totalPoint: 0,
      messageTotalPain: 'N/A',
      messageTotalPoin: 'N/A',
      totalPaint: 0,
      spo2: false,
      DataSubmit: {},
      listSilings: [],
      listSiblingDelete: [],
      showButton: true,
      loaded: false,
      count: 0,
      IsLocked: false,
      menu: [{
        label: 'InitialAssessment.label2',
        blockId: '#InitialAssessment-ForAdult-block1'
      },
      {
        label: 'Đánh giá chung',
        blockId: '#InitialAssessment-ForAdult-block2'
      },
      {
        label: 'InitialAssessment.label17',
        blockId: '#InitialAssessment-ForAdult-block3'
      },
      {
        label: 'InitialAssessment.label10',
        blockId: '#InitialAssessment-ForAdult-block4'
      },
      {
        label: 'InitialAssessment.label9',
        blockId: '#InitialAssessment-ForAdult-block5'
      },
      {
        label: 'InitialAssessment.pain',
        blockId: '#InitialAssessment-ForAdult-block6'
      },
      {
        label: 'InitialAssessment.label11',
        blockId: '#InitialAssessment-ForAdult-block7'
      },
      {
        label: 'InitialAssessment.label13',
        blockId: '#InitialAssessment-ForAdult-block8'
      },
      {
        label: 'InitialAssessment.label14',
        blockId: '#InitialAssessment-ForAdult-block9'
      },
      {
        label: 'InitialAssessment.label15',
        blockId: '#InitialAssessment-ForAdult-block10'
      },
      {
        label: 'InitialAssessment.permission',
        blockId: '#InitialAssessment-ForAdult-block11'
      },
      {
        label: 'InitialAssessment.other',
        blockId: '#InitialAssessment-ForAdult-block12'
      }
      ],
      syncInfo: null
    }
  },
  components: {
    V2Select,
    Logs,
    RemoveBtn,
    VDatePicker,
    CommunicableDiseasesScreening,
    ViewOnly,
    Confirm
  },
  watch: {
    DataSubmit (a, b) {}
  },
  mounted () {
    this.getMasterDatas({ Form: 'IPDIAAU' }, () => {
      this.getData()
      const list1 = this.MASTERDATA['IPDIAAUBOHA'].Items.filter(i => i.Code === 'IPDIAAUBOHAOTH')
      this.MASTERDATA['IPDIAAUBOHA'].Items = this.MASTERDATA['IPDIAAUBOHA'].Items.filter(i => i.Code !== 'IPDIAAUBOHAOTH').concat(list1)
      const list2 = this.MASTERDATA['IPDIAAUURAS'].Items.filter(i => i.Code === 'IPDIAAUURASOTH')
      this.MASTERDATA['IPDIAAUURAS'].Items = this.MASTERDATA['IPDIAAUURAS'].Items.filter(i => i.Code !== 'IPDIAAUURASOTH').concat(list2)
      const list3 = this.MASTERDATA['IPDIAAULIWI'].Items.filter(i => i.Code === 'IPDIAAULIWIOTH')
      this.MASTERDATA['IPDIAAULIWI'].Items = this.MASTERDATA['IPDIAAULIWI'].Items.filter(i => i.Code !== 'IPDIAAULIWIOTH').concat(list3)
      this.MASTERDATA['IPDIAAUNEEDIDDAU'].Items[0].Value = false
    })
  },
  computed: {
    readonly: function () {
      // return (
      //   this.DataSubmit.CreatedBy !== this.$store.state.account.Username ||
      //   this.DataSubmit.IsLocked === true
      // )
      // (this.DataSubmit.CreatedBy !== this.$store.state.account.Username)
      return this.IsLocked || this.isConfirm || (this.DataSubmit.CreatedBy !== this.$store.state.account.Username)
      // return false
    },
    IPDIAAURELIDATA: function () {
      return constants.IPDIAAURELIDATA
    },
    IPDIAAUGLCO: function () {
      var arr = []
      for (let index = 2; index < 15; index++) {
        arr.push({
          value: String(index + 1),
          label: String(index + 1)
        })
      }
      return arr
    },
    EDARRPAMAPAI: function () {
      var arr = []
      for (let index = 0; index < 10; index++) {
        arr.push({
          value: String(index + 1),
          label: String(index + 1)
        })
      }
      return arr
    },
    IPDIAAULANG: function () {
      return constants.LANGUAGES.map((e) => e.nativeName)
    },
    bmiCalculation: function () {
      var weight = this.MASTERDATA['IPDIAAUWEIG'].Items[0].Value
        ? parseFloat(this.MASTERDATA['IPDIAAUWEIG'].Items[0].Value)
        : 0
      var height = this.MASTERDATA['IPDIAAUHEIG'].Items[0].Value
        ? parseFloat(this.MASTERDATA['IPDIAAUHEIG'].Items[0].Value) / 100
        : 0
      return (weight / (height * height)).toFixed(2)
    }
  },
  methods: {
    getListConfirm (id) {
      new EIOService().find('ConfirmForms/GetList/' + id).then(res => {
        if (res && res.length > 0) {
          this.isConfirm = true
        }
      })
    },
    onlyNumber (event) {
      let keyCode = event.keyCode ? event.keyCode : event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        event.preventDefault()
      }
    },
    ChangeIPDIAAUURINA (value, index) {
      if (index === 0) {
        this.MASTERDATA['IPDIAAUURINA'].Items[1].Value = ''
        this.MASTERDATA['IPDIAAUURINA'].Items[4].Value = ''
        this.MASTERDATA['IPDIAAUURINA'].Items[5].Value = ''
        this.MASTERDATA['IPDIAAUURINA'].Items[3].Value = ''
      } else if (index === 1) {
        this.MASTERDATA['IPDIAAUURINA'].Items[0].Value = ''
        this.MASTERDATA['IPDIAAUURINA'].Items[4].Value = ''
        this.MASTERDATA['IPDIAAUURINA'].Items[5].Value = ''
        this.MASTERDATA['IPDIAAUURINA'].Items[3].Value = ''
      } else if (index === 3) {
        this.MASTERDATA['IPDIAAUURINA'].Items[0].Value = ''
        this.MASTERDATA['IPDIAAUURINA'].Items[1].Value = ''
        this.MASTERDATA['IPDIAAUURINA'].Items[5].Value = ''
        this.MASTERDATA['IPDIAAUURINA'].Items[3].Value = ''
      }
      if (index === 1 && !value) {
        this.MASTERDATA['IPDIAAUNEEDIDTN'].Items[0].Value = true
      } else {
        this.MASTERDATA['IPDIAAUNEEDIDTN'].Items[0].Value = false
      }
    },
    handleClickSpo2 (value) {
      this.spo2 = !value
    },
    handleClickIPDIAAURESASS (value, index) {
      if (!value && index === 1) {
        this.MASTERDATA['IPDIAAUNEEDIDHH'].Items[0].Value = true
        this.MASTERDATA['IPDIAAURESASS'].Items[0].Value = ''
        this.MASTERDATA['IPDIAAURESASS'].Items[2].Value = ''
        this.MASTERDATA['IPDIAAURESASS'].Items[3].Value = ''
      } else if (!value && index === 2) {
        this.MASTERDATA['IPDIAAUNEEDIDHH'].Items[0].Value = true
        this.MASTERDATA['IPDIAAURESASS'].Items[0].Value = ''
        this.MASTERDATA['IPDIAAURESASS'].Items[1].Value = ''
        this.MASTERDATA['IPDIAAURESASS'].Items[3].Value = ''
      } else if (!value && index === 3) {
        this.MASTERDATA['IPDIAAUNEEDIDHH'].Items[0].Value = true
        this.MASTERDATA['IPDIAAURESASS'].Items[0].Value = ''
        this.MASTERDATA['IPDIAAURESASS'].Items[1].Value = ''
        this.MASTERDATA['IPDIAAURESASS'].Items[2].Value = ''
      } else {
        this.MASTERDATA['IPDIAAUNEEDIDHH'].Items[0].Value = false
      }
      if (index === 0) {
        this.MASTERDATA['IPDIAAURESASS'].Items[1].Value = ''
        this.MASTERDATA['IPDIAAURESASS'].Items[2].Value = ''
        this.MASTERDATA['IPDIAAURESASS'].Items[3].Value = ''
      }
      // this.MASTERDATA['IPDIAAURESASS'].Items[4] = true
    },
    handleclickVOMNO (index, value) {
      if (index === 1) {
        this.MASTERDATA['IPDIAAUVOM'].Items[0].Value = false
      } else {
        this.MASTERDATA['IPDIAAUVOM'].Items[1].Value = false
      }
      if (index === 1 && !value) {
        this.MASTERDATA['IPDIAAUNEEDIDDD'].Items[0].Value = true
      } else if (index === 1 && value) {
        this.handleCheckClick()
      } else {
        this.handleClickFalse()
      }
    },
    handleClickIPDIAAUFERO (index, value) {
      if (index === 1 && !value) {
        this.MASTERDATA['IPDIAAUNEEDIDDD'].Items[0].Value = true
      } else if (index === 1 && value) {
        this.handleCheckClick()
      } else {
        this.handleClickFalse()
      }
    },
    handleClickIPDIAAUBHAB (index, value) {
      // eslint-disable-next-line no-mixed-operators
      if (index === 1 && !value || index === 2 && !value) {
        this.MASTERDATA['IPDIAAUNEEDIDDD'].Items[0].Value = true
      // eslint-disable-next-line no-mixed-operators
      } else if (index === 1 && value || index === 2 && !value) {
        this.handleCheckClick()
      } else {
        this.handleClickFalse()
      }
    },
    handleClickIPDIAAUSTOOLCOLOR (index, value) {
      // eslint-disable-next-line no-mixed-operators
      if (index === 1 && !value || index === 2 && !value) {
        this.MASTERDATA['IPDIAAUNEEDIDDD'].Items[0].Value = true
      // eslint-disable-next-line no-mixed-operators
      } else if (index === 1 && value || index === 2 && !value) {
        this.handleCheckClick()
      } else {
        this.handleClickFalse()
      }
    },
    handleClickFalse () {
      this.count = 0
      if (this.MASTERDATA['IPDIAAUVOM'].Items[1].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUFERO'].Items[1].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUBHAB'].Items[1].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUBHAB'].Items[2].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSTOOLCOLOR'].Items[1].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSTOOLCOLOR'].Items[2].Value) {
        this.count++
      }
      if (this.count === 0) {
        this.MASTERDATA['IPDIAAUNEEDIDDD'].Items[0].Value = false
      }
    },
    handleCheckClick () {
      this.count = 0
      if (this.MASTERDATA['IPDIAAUVOM'].Items[1].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUFERO'].Items[1].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUBHAB'].Items[1].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUBHAB'].Items[2].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSTOOLCOLOR'].Items[1].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSTOOLCOLOR'].Items[2].Value) {
        this.count++
      }
      if (this.count >= 2) {
        this.MASTERDATA['IPDIAAUNEEDIDDD'].Items[0].Value = true
      } else {
        this.MASTERDATA['IPDIAAUNEEDIDDD'].Items[0].Value = false
      }
    },
    handleClickIPDIAAUCOLORSKIN (code, value) {
      if (code === 'IPDIAAUCOLORSKINP' && !value) {
        this.MASTERDATA['IPDIAAUITV4'].Items[0].Value = true
      } else if (code === 'IPDIAAUCOLORSKINC' && !value) {
        this.MASTERDATA['IPDIAAUITV4'].Items[0].Value = true
      } else if (code === 'IPDIAAUCOLORSKINJ' && !value) {
        this.MASTERDATA['IPDIAAUITV4'].Items[0].Value = true
      } else if (code === 'IPDIAAUCOLORSKINOTH' && !value) {
        this.MASTERDATA['IPDIAAUITV4'].Items[0].Value = true
      } else {
        this.MASTERDATA['IPDIAAUITV4'].Items[0].Value = false
      }
    },
    handleClickIPDIAAUSTATUS (code, value) {
      if (code === 'IPDIAAUSTATUSLET' && !value) {
        this.MASTERDATA['IPDIAAUNEEDIDTK'].Items[0].Value = true
      } else if (code === 'IPDIAAUSTATUSCRY' && !value) {
        this.MASTERDATA['IPDIAAUNEEDIDTK'].Items[0].Value = true
      } else {
        this.MASTERDATA['IPDIAAUNEEDIDTK'].Items[0].Value = false
      }
    },
    handleClickIPDIAAUVOM (index, value) {
      if (index === 0) {
        this.MASTERDATA['IPDIAAUVOM'].Items[3].Value = ''
      }
      if (index === 1) {
        this.MASTERDATA['IPDIAAUVOM'].Items[2].Value = ''
      }
    },
    handleClickIPDIAAUSEDA () {
      if (!this.MASTERDATA['IPDIAAUSEDA'].Items[1].Value) {
        this.MASTERDATA['IPDIAAUSCORESEDATION1'].Items[0].Value = ''
        this.MASTERDATA['IPDIAAUSCORESEDATION2'].Items[0].Value = ''
        this.MASTERDATA['IPDIAAUSCORESEDATION3'].Items[0].Value = ''
        this.MASTERDATA['IPDIAAUSCORESEDATION4'].Items[0].Value = ''
        this.MASTERDATA['IPDIAAUSCORESEDATION5'].Items[0].Value = ''
      }
      if (this.totalPoint >= 4) {
        this.MASTERDATA['IPDIAAUNEEDIDDAU'].Items[0].Value = true
      } else {
        this.MASTERDATA['IPDIAAUNEEDIDDAU'].Items[0].Value = false
      }
      this.totalPaint = 0
      this.messageTotalPain = 'N/A'
    },
    handleClickIPDIAAUPAI () {
      if (!this.MASTERDATA['IPDIAAUPAI'].Items[1].Value) {
        this.MASTERDATA['IPDIAAUSCOREPAIN1'].Items[0].Value = ''
        this.MASTERDATA['IPDIAAUSCOREPAIN2'].Items[0].Value = ''
        this.MASTERDATA['IPDIAAUSCOREPAIN3'].Items[0].Value = ''
        this.MASTERDATA['IPDIAAUSCOREPAIN4'].Items[0].Value = ''
        this.MASTERDATA['IPDIAAUSCOREPAIN5'].Items[0].Value = ''
      }
      if (this.totalPaint <= -4) {
        this.MASTERDATA['IPDIAAUNEEDIDDAU'].Items[0].Value = true
      } else {
        this.MASTERDATA['IPDIAAUNEEDIDDAU'].Items[0].Value = false
      }
      this.totalPoint = 0
      this.messageTotalPoin = 'N/A'
    },
    handleClickSound (item) {
      if (item.Code === 'IPDIAAUCRYSOUNDNOR' || this.MASTERDATA['IPDIAAUCRYSOUND'].Items[1].Value) {
        this.MASTERDATA['IPDIAAUCRYSOUND'].Items[2].Value = ''
        this.MASTERDATA['IPDIAAUNEEDIDORG'].Items[1].Value = false
      } else {
        this.MASTERDATA['IPDIAAUNEEDIDORG'].Items[1].Value = true
      }
    },
    changeTemp (value) {
      if (value === 1 && this.MASTERDATA['IPDIAAUTEMP'].Items[2].Value && this.MASTERDATA['IPDIAAURERA'].Items[2].Value) {
        this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = true
      } else {
        this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = false
      }
    },
    validateSpace (value) {
      console.log('value', value)
    },
    handleSelectSedation () {
      var total1 = this.MASTERDATA['IPDIAAUSCORESEDATION1'].Items[0].Value ? parseInt(this.MASTERDATA['IPDIAAUSCORESEDATION1'].Items[0].Value) : 0
      var total2 = this.MASTERDATA['IPDIAAUSCORESEDATION2'].Items[0].Value ? parseInt(this.MASTERDATA['IPDIAAUSCORESEDATION2'].Items[0].Value) : 0
      var total3 = this.MASTERDATA['IPDIAAUSCORESEDATION3'].Items[0].Value ? parseInt(this.MASTERDATA['IPDIAAUSCORESEDATION3'].Items[0].Value) : 0
      var total4 = this.MASTERDATA['IPDIAAUSCORESEDATION4'].Items[0].Value ? parseInt(this.MASTERDATA['IPDIAAUSCORESEDATION4'].Items[0].Value) : 0
      var total5 = this.MASTERDATA['IPDIAAUSCORESEDATION5'].Items[0].Value ? parseInt(this.MASTERDATA['IPDIAAUSCORESEDATION5'].Items[0].Value) : 0
      this.totalPaint = total1 + total2 + total3 + total4 + total5
      if (this.totalPaint <= -4) {
        this.MASTERDATA['IPDIAAUNEEDIDDAU'].Items[0].Value = true
      } else {
        this.MASTERDATA['IPDIAAUNEEDIDDAU'].Items[0].Value = false
      }
      if (this.MASTERDATA['IPDIAAUSCORESEDATION1'].Items[0].Value || this.MASTERDATA['IPDIAAUSCORESEDATION2'].Items[0].Value || this.MASTERDATA['IPDIAAUSCORESEDATION3'].Items[0].Value || this.MASTERDATA['IPDIAAUSCORESEDATION4'].Items[0].Value || this.MASTERDATA['IPDIAAUSCORESEDATION5'].Items[0].Value) {
        this.messageTotalPain = this.totalPaint.toString()
      }
    },
    handleSelectPain () {
      var total1 = this.MASTERDATA['IPDIAAUSCOREPAIN1'].Items[0].Value ? parseInt(this.MASTERDATA['IPDIAAUSCOREPAIN1'].Items[0].Value) : 0
      var total2 = this.MASTERDATA['IPDIAAUSCOREPAIN2'].Items[0].Value ? parseInt(this.MASTERDATA['IPDIAAUSCOREPAIN2'].Items[0].Value) : 0
      var total3 = this.MASTERDATA['IPDIAAUSCOREPAIN3'].Items[0].Value ? parseInt(this.MASTERDATA['IPDIAAUSCOREPAIN3'].Items[0].Value) : 0
      var total4 = this.MASTERDATA['IPDIAAUSCOREPAIN4'].Items[0].Value ? parseInt(this.MASTERDATA['IPDIAAUSCOREPAIN4'].Items[0].Value) : 0
      var total5 = this.MASTERDATA['IPDIAAUSCOREPAIN5'].Items[0].Value ? parseInt(this.MASTERDATA['IPDIAAUSCOREPAIN5'].Items[0].Value) : 0
      this.totalPoint = total1 + total2 + total3 + total4 + total5
      if (this.totalPoint >= 4) {
        this.MASTERDATA['IPDIAAUNEEDIDDAU'].Items[0].Value = true
      } else {
        this.MASTERDATA['IPDIAAUNEEDIDDAU'].Items[0].Value = false
      }
      if (this.MASTERDATA['IPDIAAUSCOREPAIN1'].Items[0].Value || this.MASTERDATA['IPDIAAUSCOREPAIN2'].Items[0].Value || this.MASTERDATA['IPDIAAUSCOREPAIN3'].Items[0].Value || this.MASTERDATA['IPDIAAUSCOREPAIN4'].Items[0].Value || this.MASTERDATA['IPDIAAUSCOREPAIN5'].Items[0].Value) {
        this.messageTotalPoin = this.totalPoint.toString()
      }
    },
    changeRR (value) {
      if (value === 1 && this.MASTERDATA['IPDIAAURERA'].Items[2].Value && this.MASTERDATA['IPDIAAUTEMP'].Items[2].Value) {
        this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = true
      } else {
        this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = false
      }
    },
    handleClickIPDIAAUHYGI (value) {
      if (value === 2) {
        this.MASTERDATA['IPDIAAUHYGI'].Items[2].Value = null
      }
    },
    changeIPDIAAUDIET (value) {
      if (value === 2) {
        this.MASTERDATA['IPDIAAUDIET'].Items[2].Value = ''
      }
    },
    addItem () {
      this.DataSubmit.Siblings.push({
        VisitId: '123',
        Age: '',
        Gender: ''
      })
    },
    add (item) {
      this.DataSubmit.Siblings.push({
        VisitId: '123',
        Age: '',
        Gender: ''
      })
    },
    remove (value, i) {
      if (value.VisitId !== '123') {
        this.listSiblingDelete.push(value)
      }
      this.DataSubmit.Siblings = this.DataSubmit.Siblings.filter((_, index) => index !== i)
    },
    checkbox2RadioAndTSI () {
      setTimeout(() => {
        if (this.MASTERDATA['IPDIAAULIWI'].Items[0].Value) {
          this.resetMdDataByCode('IPDIAAULIWI', 'IPDIAAULIWIALO')
        }
        var checked =
     (this.MASTERDATA['IPDIAAUFERV'].Items[1].Value &&
      this.MASTERDATA['IPDIAAURUSL'].Items[1].Value) ||
     (this.MASTERDATA['IPDIAAUFERV'].Items[1].Value &&
      this.MASTERDATA['IPDIAAUTRAV'].Items[1].Value) ||
     (this.MASTERDATA['IPDIAAUFERV'].Items[1].Value &&
      this.MASTERDATA['IPDIAAUCOUG'].Items[1].Value &&
      this.MASTERDATA['IPDIAAUCCWS'].Items[1].Value)
        this.MASTERDATA['IPDIAAUTSIP'].Items[1].Value = checked
        this.MASTERDATA['IPDIAAUTSIP'].Items[0].Value =
     !checked &&
     (this.MASTERDATA['IPDIAAUFERV'].Items.find((e) => e.Value) !== null ||
      this.MASTERDATA['IPDIAAURUSL'].Items.find((e) => e.Value) !== null ||
      this.MASTERDATA['IPDIAAUTRAV'].Items.find((e) => e.Value) !== null ||
      this.MASTERDATA['IPDIAAUCOUG'].Items.find((e) => e.Value) !== null ||
      this.MASTERDATA['IPDIAAUCCWS'].Items.find((e) => e.Value)) !== null
      }, 100)
    },
    SyncDiseasesScreening (value) {
      if (value) return
      var mapingform = {
        OPDIAFSTOP: 'ODST',
        OPDIAFTP: 'ODTH',
        ETR: 'EDET',
        EDAFRSP: 'EDRS',
        IPDIAAU: 'IDAU'
      }
      var mapingTo = 'IDAU'
      new InitialAssessment()
        .update(
          'ForAdult/SyncDiseasesScreening/' + this.$route.params.Id,
          this.DataSubmit
        )
        .then((response) => {
          if (response && response.Code) {
            var fromCode = mapingform[response.Code]
            response.Datas.forEach((element) => {
              var itemcode = element.Code.replace(fromCode, mapingTo)
              if (itemcode) {
                var l = itemcode.length
                var parrentcode = itemcode.substring(0, l - 3)
                if (this.MASTERDATA[parrentcode]) {
                  this.MASTERDATA[parrentcode].Items.forEach((e) => {
                    if (e.Code === itemcode) {
                      e.Value = element.Value === 'True'
                    }
                  })
                }
              }
            })
          }
        })
        .catch((e) => {})
    },
    SyncVitalSign () {
      new InitialAssessment()
        .update('ForAdult/SyncVitalSign/' + this.$route.params.Id, this.DataSubmit)
        .then((response) => {
          var tagetMdCode = {
            IPDIAAUPULS: [
              'OPDIAFSTOPPULANS',
              'IPDIAAUPULSANS',
              'OPDIAFTPPULANS',
              'EDAFRSPPULANS'
            ], // mach
            IPDIAAUBLPR: [
              'OPDIAFSTOPBP0ANS',
              'IPDIAAUBLPRANS',
              'OPDIAFTPBP0ANS',
              'EDAFRSPBP0ANS'
            ], // Huyết áp
            IPDIAAUTEMP: [
              'OPDIAFSTOPTEMANS',
              'IPDIAAUTEMPANS',
              'OPDIAFTPTEMANS',
              'EDAFRSPTEMANS'
            ], // Thân nhiệt
            IPDIAAURERA: [
              'OPDIAFSTOPRR0ANS',
              'IPDIAAURERAANS',
              'OPDIAFTPRR0ANS',
              'EDAFRSPRR0ANS'
            ] // Thở
          }
          if (response) {
            for (var code in tagetMdCode) {
              this.MASTERDATA[code].Items[0].Value = (
                response.find((e) => tagetMdCode[code].includes(e.Code)) || {
                  Value: ''
                }
              ).Value
            }
          }
        })
        .catch((e) => {})
    },
    select2Suggest (data) {
      var list = data
      if (list) {
        return list.map((e) => {
          e.id = e.value
          e.name = e.vilabel
          e.label = e.vilabel
          return e
        })
      } else {
        return []
      }
    },
    flexgroup (index) {
      if (index === 3) {
        return {
          flexGrow: 1
        }
      }
      return {}
    },
    push2Wh (data) {
      if (data.Weight) this.MASTERDATA['IPDIAAUWEIG'].Items[0].Value = data.Weight
      if (data.Height) this.MASTERDATA['IPDIAAUHEIG'].Items[0].Value = data.Height
    },
    validateForm () {
      var errors = []
      if (
        this.MASTERDATA['IPDIAAUALLE'].Items[1].Value &&
    !this.MASTERDATA['IPDIAAUALLE'].Items[3].Value
      ) {
        errors.push(this.MASTERDATA['IPDIAAUALLE'].Items[3])
      }
      if (
        this.MASTERDATA['IPDIAAUALLE'].Items[1].Value &&
    !this.MASTERDATA['IPDIAAUALLE'].Items[4].Value
      ) {
        errors.push(this.MASTERDATA['IPDIAAUALLE'].Items[4])
      }
      if (errors.length) {
        this.handlerResponse({ Error: errors })
      }
    },
    submit (confirm) {
      this.validateForm()
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach((item) => {
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
      if (!obj['IPDIAAUPAINYES']) {
        this.resetMdData('IPDIAAUPASC')
        this.resetMdData('IPDIAAUPASD')
        this.resetMdData('IPDIAAUPALO')
        this.resetMdData('IPDIAAUPAFR')
        this.resetMdData('IPDIAAUPACH')
        this.resetMdData('IPDIAAUWMPW')
        this.resetMdData('IPDIAAUWMPB')
        this.resetMdData('IPDIAAUFRAK')
        this.resetMdData('IPDIAAUITV2')
      }
      var formCode = 'A02_015_220321_VE'
      if (this.DataSubmit.Siblings.length > 0) {
        var myJsonString = JSON.stringify(this.DataSubmit.Siblings)
        this.MASTERDATA['IPDIAAUSIBLINGDATA'].Note = JSON.stringify(myJsonString)
      }
      this.DataSubmit = {
        ...this.DataSubmit,
        SiblingDelete: this.listSiblingDelete
      }
      new InitialAssessment()
        .update('ForAdult/' + formCode + '/' + this.$route.params.Id, this.DataSubmit)
        .then((response) => {
          if (confirm === 'confirm') {
            this.toastedSuccess()
            this.saveSuccesss = !this.saveSuccesss
          } else {
            this.toastedSuccess()
            setTimeout(() => {
              this.reload()
            }, 500)
          }
        })
        .catch((e) => {
          // this._401ResponseError(e)
        })
    },
    resetMdDataByCode (key, current) {
      if (!this.MASTERDATA[key]) return
      this.MASTERDATA[key].Items.forEach((item) => {
        if (item.Code !== current) item.Value = null
      })
      this.DataSubmit.Datas.forEach((item) => {
        if (item.Group === key && item.Code !== current) {
          item.Value = null
        }
      })
    },
    resetMdData (key) {
      if (!this.MASTERDATA[key]) return
      this.MASTERDATA[key].Items.forEach((item) => {
        item.Value = null
      })
      this.DataSubmit.Datas.forEach((item) => {
        if (item.Group === key) {
          item.Value = null
        }
      })
    },
    mapData (isSync) {
      var noMapCode = [
        'IPDIAAUADFRAAE',
        'IPDIAAUADFRCLI',
        'IPDIAAUADFROTH',
        'IPDIAAUADFRANS',
        'IPDIAAUARTIANS'
      ]
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach((item) => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, { Code: code })
            if (exited) {
              // if (code === 'IPDIAAUPASCANS') exited.Value = this.parseInt(exited.Value)
              if (isSync && noMapCode.includes(code)) {
                // noting
              } else if (
                this.checkString(item.DataType, 'CheckBox') ||
        this.checkString(item.DataType, 'Radio')
              ) {
                var isTrue = exited.Value === 'True'
                item.Value = isTrue
              } else {
                item.Value = exited.Value
              }
            } else {
              if (code === 'IPDIAAULANGANS') {
                item.Value = null
              }
            }
          })
        }
      }
    },
    syncLastIpdData () {
      new InitialAssessment()
        .update('ForAdult/Sync/' + this.$route.params.Id + '?hidemsg=' + true)
        .then((response) => {
          this.DataSubmit.Datas = response.Datas
          this.DataSubmit.IsNew = response.IsNew
          this.syncInfo = response
          this.mapData(true)
        })
    },
    getData () {
      var formCode = 'A02_015_220321_VE'
      new InitialAssessment()
        .find('ForAdult/' + formCode + '/' + this.$route.params.Id + '?hidemsg=' + true)
        .then((response) => {
          this.DataSubmit = response
          this.$store.dispatch('setCurrentFormId', response.Id)
          this.mapData()
          if (response.IsNew) {
            this.syncLastIpdData()
          }
          this.getListConfirm(response.Id)
          this.handleSelectPain()
          this.handleSelectSedation()
          setTimeout(() => {
            EventBus.$emit('updateGlobalIpdTopbaInfo', this.menu)
          }, 1000)
          this.IsLocked = response.IsLocked
          this.loaded = true
        })
        .catch((e) => {
          this.showButton = false
          this.loaded = true
          this.DataSubmit = false
          if (e.status === 404) {
          }
          // this.IsLocked = true
          if (e.data) this.IsLocked = e.data.IsLocked
          this.edited = false
        })
    },
    create () {
      var formCode = 'A02_015_220321_VE'
      new InitialAssessment()
        .update(this.$route.params.Id, {}, 'ForAdult/Create/' + formCode + '/')
        .then((response) => {
          this.reload()
        })
        .catch((e) => {
          // this.back()
        })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: 'Thông báo',
        text: 'Tạo mới đánh giá ban đầu trẻ sơ sinh nội trú *?',
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'Tôi xác nhận',
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: 'Bỏ qua',
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
