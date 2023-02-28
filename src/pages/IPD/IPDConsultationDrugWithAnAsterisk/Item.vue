<template>
 <div id="SummaryOf15DayTreatmentItem">
  <template v-if="loaded">
   <div class="no-border mrb30">
    <div class="box-top-content">
     <div v-if="!readonly" class="row">
      <div class="col-md-12 col-sm-12">
       <div class="flex align-center mrt10">
        <div class="mrr40 flex">
         <div class="mt-5">
          <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINNGPT"]) }} </b>
         </div>
         <div :class="errorTimeTm ? '' : ''">
          <v-date-picker
           :noclearable="true"
           :hideTooltip="true"
           class="w1510 display-inline"
           :format="'HH:mm DD/MM/YYYY'"
           v-model="MASTERDATA['IPDIAACINNGPT'].Items[0].Value"
          />
         </div>
        </div>
       </div>
       <div class="align-center mt-10 mrb10">
        <!--
         <p >
          {{ __label(MASTERDATA["IPDIAACINCDBOD"]) }}:
         </p>
        -->
        <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINCDBOD"]) }}:</b>
        <!--
         <icd10
          @icdChange="icdChange"
          :single="true"
          v-model="MASTERDATA['IPDIAACINNGPT'].Items[0]"
         />
        -->
        <icd10
         @icdChange="icdChange"
         :mdCode="'IPDIAACINCDBOD'"
         :single="true"
         v-model="MASTERDATA['IPDIAACINCDBOD'].Items[0].Value"
        />
        <textarea-autosize
         :readonly="readonly"
         class="form-control mrb10 mrt10"
         rows="3"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACINCDBOD'].Items[1].Value"
        />
       </div>
       <!--
        <div class="mt-10">
         <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINCDBO"]) }} </b>
        </div>
        <div class="mt-10">
         <v-select
          class="select-full-w"
          :options="IPDIAAULANG"
          :mutableValue="null"
          :placeholder="__t('Chọn')"
          v-model="MASTERDATA['IPDIAACINNGPT'].Items[0].Value"
         ></v-select>
        </div>
        <div class="mt-10">
         <textarea-autosize
          class="form-control"
          rows="2"
          :placeholder="__t('Nhập')"
          v-model="MASTERDATA['IPDIAACINCDBO'].Items[1].Value"
         />
        </div>
       -->
       <div class="row mt-10 ml-5">
        <div class="column">
         <div class="flex align-center">
          <div class="mt-5" style="width:150px">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINPIT"]) }}:</b>
          </div>
          <div class="mt-5 w400">
           <textarea-autosize
            class="form-control"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAACINPIT'].Items[0].Value"
           />
          </div>
         </div>
         <div class="flex align-center">
          <div class="mt-5" style="width:150px">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACININ"]) }}:</b>
          </div>
          <div class="mt-5 w400">
           <textarea-autosize
            class="form-control w450"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAACININ'].Items[0].Value"
           />
          </div>
         </div>
         <div class="flex align-center">
          <div class="mt-5" style="width:150px">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINALT"]) }}:</b>
          </div>
          <div class="mt-5 w400">
           <textarea-autosize
            class="form-control w450"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAACINALT'].Items[0].Value"
           />
          </div>
         </div>
        </div>
        <div class="column">
         <div class="flex align-center">
          <div class="mt-5" style="width:150px">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINOTT"]) }}:</b>
          </div>
          <div class="mt-5 ml-5 w400">
           <textarea-autosize
            class="form-control w450"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAACINOTT'].Items[0].Value"
           />
          </div>
         </div>
         <div class="flex align-center">
          <div class="mt-5" style="width:150px">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINONS"]) }}:</b>
          </div>
          <div class="mt-5 ml-5 w400">
           <textarea-autosize
            class="form-control w450"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAACINONS'].Items[0].Value"
           />
          </div>
         </div>
         <div class="flex align-center">
          <div class="mt-5" style="width:150px">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINNAT"]) }}:</b>
          </div>
          <div class="mt-5 ml-5 w400">
           <textarea-autosize
            class="form-control w450"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAACINNAT'].Items[0].Value"
           />
          </div>
         </div>
        </div>
       </div>
       <div class="mt-10">
        <div>
         <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINAMD"]) }}:</b>
        </div>
        <div>
         <textarea-autosize
          class="form-control"
          rows="2"
          :placeholder="__t('Nhập')"
          v-model="MASTERDATA['IPDIAACINAMD'].Items[0].Value"
         />
        </div>
       </div>
       <div class="mt-10">
        <div>
         <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINVSBP"]) }}:</b>
        </div>
        <div class="flex">
         <div>
          Thông tin từ đánh giá ban đầu:
          <b class="ml-10"
           >{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[0]) }}: </b
          >{{ dataVitalSigns.BP }} (mmHg)
          <b class="ml-10"
           >{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[1]) }}: </b
          >{{ dataVitalSigns.Pulse }} l/p(bpm)
          <b class="ml-10"
           >{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[2]) }}: </b
          >{{ dataVitalSigns.RR }} l/p(bpm)
          <b class="ml-10"
           >{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[3]) }}: </b
          >N/A (%)
         </div>
         <div>
          <button
           class="btn v-yellow-btn pull-left btn-back v-white-btn ml-20"
           type="button"
           style="height:30px"
           @click="handleClickCoppy"
          >
           {{ __t("Sao chép") }}
           <!-- {{ __label(MASTERDATA["IPDIAACINSOTP"].Items[0]) }} -->
          </button>
         </div>
        </div>
       </div>
       <div class="mt-10 flex">
        <div class="mr-20">
         <div>
          <b>{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[0]) }}</b
          >(mmHg)
         </div>
         <div>
          <textarea-autosize
           class="form-control w150"
           rows="1"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINVSBP'].Items[0].Value"
          />
         </div>
        </div>
        <div class="mr-20">
         <div>
          <b>{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[1]) }}</b
          >(mmHg)
         </div>
         <div>
          <textarea-autosize
           class="form-control w150"
           rows="1"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINVSBP'].Items[1].Value"
          />
         </div>
        </div>
        <div class="mr-20">
         <div>
          <b>{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[2]) }}</b
          >(mmHg)
         </div>
         <div>
          <textarea-autosize
           class="form-control w150"
           rows="1"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINVSBP'].Items[2].Value"
          />
         </div>
        </div>
        <div>
         <div>
          <b>{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[3]) }}</b
          >(mmHg)
         </div>
         <div>
          <textarea-autosize
           class="form-control w150"
           rows="1"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINVSBP'].Items[3].Value"
          />
         </div>
        </div>
       </div>
       <div class="mt-20 text-center form-title">
        <p>{{ __label(MASTERDATA["IPDIAACINSOTP"]) }}</p>
       </div>
       <div class="mt-10">
        <div class="flex align-center">
         <div style="width:150px">
          <button
           class="btn v-yellow-btn pull-left btn-back v-white-btn mr-50"
           type="button"
           @click="handleClickNongDMV();"
           :style="
            nongDmv
             ? 'background: linear-gradient(180deg, #ffdb71 0%, #f3b600 100%);'
             : ''
           "
          >
           {{ __label(MASTERDATA["IPDIAACINSOTP"].Items[0]) }}
          </button>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <textarea-autosize
           class="form-control"
           rows="1"
           v-if="nongDmv"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINSOTP'].Items[0].Value"
          />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <button
           class="btn v-yellow-btn pull-left btn-back v-white-btn mr-50"
           type="button"
           @click="handleClickstentDmv();"
           :style="
            stentDmv
             ? 'background: linear-gradient(180deg, #ffdb71 0%, #f3b600 100%);'
             : ''
           "
          >
           {{ __label(MASTERDATA["IPDIAACINSOTP"].Items[1]) }}
          </button>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <textarea-autosize
           class="form-control"
           rows="1"
           v-if="stentDmv"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINSOTP'].Items[1].Value"
          />
         </div>
        </div>
        <!-- đường vào -->
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[2]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <textarea-autosize
           class="form-control"
           rows="1"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINSOTP'].Items[2].Value"
          />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[3]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <textarea-autosize
           class="form-control"
           rows="1"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINSOTP'].Items[3].Value"
          />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[4]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <textarea-autosize
           class="form-control"
           rows="1"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINSOTP'].Items[4].Value"
          />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[5]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <textarea-autosize
           class="form-control"
           rows="1"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINSOTP'].Items[5].Value"
          />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[6]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <textarea-autosize
           class="form-control"
           rows="1"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINSOTP'].Items[6].Value"
          />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[7]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <textarea-autosize
           class="form-control"
           rows="1"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINSOTP'].Items[7].Value"
          />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[8]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <textarea-autosize
           class="form-control"
           rows="1"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINSOTP'].Items[8].Value"
          />
         </div>
        </div>
        <div class="align-center mt-10">
         <div style="width:170px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[9]) }}:
          </b>
         </div>
         <div style="flex-grow: 1">
          <textarea-autosize
           class="form-control"
           rows="2"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINSOTP'].Items[9].Value"
          />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[10]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <textarea-autosize
           class="form-control"
           rows="1"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINSOTP'].Items[10].Value"
          />
         </div>
        </div>
       </div>
       <div class="mt-20 text-center form-title"><p>Kết quả</p></div>
       <div class="mt-10">
        <table class="table observation-table no-margin tbl-b2">
         <thead>
          <tr>
           <th rowspan="2" class="text-center">Vị trí can thiệp</th>
           <th rowspan="2" class="text-center">Tên thủ thuật</th>
           <th rowspan="2" class="text-center">Tên thiết bị</th>
           <th rowspan="2" class="text-center">Số lần bơm</th>
           <th colspan="2" class="text-center">Kết quả</th>
           <th rowspan="2" class="text-center no-wrap">Ghi chú</th>
          </tr>
          <tr>
           <td style="background-color: #f5f5f5;" class="text-center no-wrap">
            name
           </td>
           <td style="background-color: #f5f5f5;" class="text-center no-wrap">
            age
           </td>
          </tr>
         </thead>
         <template v-if="tableList && tableList.length">
          <tbody>
           <tr :key="index" v-for="(item, index) in tableList">
            <template>
             <td style="position: relative;">
              <button class="btn-pos-left" @click="removeItem(item, index);">
               <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
              <input
               class="form-control"
               v-model="item.location"
               :placeholder="__t('Nhập')"
              />
             </td>
             <td style="position: relative">
              <input
               class="form-control"
               v-model="item.nameOfProcedure"
               :placeholder="__t('Nhập')"
              />
             </td>
             <td style="position: relative">
              <input
               class="form-control"
               v-model="item.sizeOfDevice"
               :placeholder="__t('Nhập')"
              />
             </td>
             <td style="position: relative">
              <input
               class="form-control"
               v-model="item.numOfBallom"
               :placeholder="__t('Nhập')"
              />
             </td>
             <td style="position: relative">
              <input
               v-model="item.beforeResult"
               class="form-control"
               :placeholder="__t('Nhập')"
              />
             </td>
             <td style="position: relative">
              <input
               v-model="item.afterResult"
               class="form-control"
               :placeholder="__t('Nhập')"
              />
             </td>
             <td style="position: relative">
              <input
               v-model="item.note"
               class="form-control"
               :placeholder="__t('Nhập')"
              />
             </td>
            </template>
           </tr>
           <tr>
            <td colspan="7" class="text-center">
             <button @click="addItem();" class="btn btn-info">
              <i class="fa fa-plus" aria-hidden="true"></i> {{ __t("Thêm ") }}
             </button>
            </td>
           </tr>
          </tbody>
         </template>
         <tfoot v-else>
          <tr>
           <td colspan="7" class="text-center">
            <button @click="addItem" class="btn btn-info">
             <i class="fa fa-plus" aria-hidden="true"></i> {{ __t("Thêm ") }}
            </button>
           </td>
          </tr>
         </tfoot>
        </table>
       </div>
       <div class="mt-20 flex">
        <div class="image-items">
         <img src="static/img/heart.png" style="width: 300px;height:300px" />
        </div>
        <div class="ml-10" style="width:100%">
         <b>{{ __label(MASTERDATA["IPDIAACINCNVT"]) }}:</b>
         <div style="flex-grow: 1">
          <textarea-autosize
           class="form-control"
           rows="13"
           :placeholder="__t('Nhập')"
           v-model="MASTERDATA['IPDIAACINCNVT'].Items[0].Value"
          />
         </div>
        </div>
       </div>
       <div class="align-center mt-10">
        <div style="width:170px">
         <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINOES"]) }}: </b>
        </div>
        <div style="flex-grow: 1">
         <textarea-autosize
          class="form-control"
          rows="2"
          :placeholder="__t('Nhập')"
          v-model="MASTERDATA['IPDIAACINOES'].Items[0].Value"
         />
        </div>
       </div>
       <div class="mt-10">
        <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINCAES"]) }}: </b>
        <div class="row">
         <div class="columnCheckBox ml-10">
          <div>
           <div
            :data="item"
            :key="index"
            v-if="index < 3"
            v-for="(item, index) in MASTERDATA['IPDIAACINCAES'].Items"
           >
            <div class="flex-box flex-center">
             <div class="v-checkbox">
              <input
               type="checkbox"
               :id="'IPDIAACINCAEScxo-' + index"
               v-model="item.Value"
              />
              <label :for="'IPDIAACINCAEScxo-' + index"></label>
             </div>
             <span
              ><span>{{ __label(item) }}</span></span
             >
            </div>
           </div>
          </div>
         </div>
         <div class="columnCheckBox">
          <div>
           <div
            :data="item"
            :key="index"
            v-if="index > 2 && index < 6"
            v-for="(item, index) in MASTERDATA['IPDIAACINCAES'].Items"
           >
            <div class="flex-box flex-center">
             <div class="v-checkbox">
              <input
               type="checkbox"
               :id="'IPDIAACINCAEScxo-' + index + 2"
               v-model="item.Value"
              />
              <label :for="'IPDIAACINCAEScxo-' + index + 2"></label>
             </div>
             <span
              ><span>{{ __label(item) }}</span></span
             >
            </div>
           </div>
          </div>
         </div>
         <div class="columnCheckBox">
          <div
           :data="item"
           :key="index"
           v-if="index > 5 && index < 8"
           v-for="(item, index) in MASTERDATA['IPDIAACINCAES'].Items"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAACINCAEScxo-' + index + 2"
              v-model="item.Value"
             />
             <label :for="'IPDIAACINCAEScxo-' + index + 2"></label>
            </div>
            <span
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
          <div
           :data="item"
           :key="index"
           v-if="index === 8"
           v-for="(item, index) in MASTERDATA['IPDIAACINCAES'].Items"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAACINCAEScxo-' + index + 4"
              v-model="item.Value"
             />
             <label :for="'IPDIAACINCAEScxo-' + index + 4"></label>
            </div>
            <span
             ><span>{{ __label(item) }}</span></span
            >
            <div style="flex-grow: 1" class="ml-10">
             <textarea-autosize
              v-if="MASTERDATA['IPDIAACINCAES'].Items[8].Value"
              class="form-control"
              rows="1"
              :placeholder="__t('Nhập')"
              v-model="MASTERDATA['IPDIAACINCAES'].Items[9].Value"
             />
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
       <div class="align-center mt-10">
        <div style="width:170px">
         <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINNXK"]) }}: </b>
        </div>
        <div style="flex-grow: 1">
         <textarea-autosize
          class="form-control"
          rows="2"
          :placeholder="__t('Nhập')"
          v-model="MASTERDATA['IPDIAACINNXK'].Items[0].Value"
         />
        </div>
       </div>
       <div class="mt-10 row">
        <div class="column">
         <div class="flex align-center">
          <div class="mt-5 ml-10" style="width:150px">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINBLV"]) }}:</b>
          </div>
          <div class="mt-5 w400">
           <textarea-autosize
            class="form-control"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAACINBLV'].Items[0].Value"
           />
          </div>
         </div>
        </div>
        <div class="column">
         <div class="flex align-center">
          <div class="mt-5">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINSMBP"]) }}:</b>
          </div>
          <div class="mt-5 w400">
           <textarea-autosize
            class="form-control"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAACINSMBP'].Items[0].Value"
           />
          </div>
         </div>
        </div>
       </div>
       <div class="mt-10 text-center form-title">
        <p>{{ __label(MASTERDATA["IPDIAACINKLC"]) }}</p>
       </div>
       <div style="flex-grow: 1">
        <textarea-autosize
         class="form-control"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACINKLC'].Items[0].Value"
        />
       </div>
       <div class="mt-10 text-center form-title">
        <p>{{ __label(MASTERDATA["IPDIAACINSGG"]) }}</p>
       </div>
       <div style="flex-grow: 1">
        <textarea-autosize
         class="form-control"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACINSGG'].Items[0].Value"
        />
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
           {{
            __t(
             "Bác sĩ đang thực hiện tao tác xác nhận bảng hồi sinh tim phổi bao gồm thông tin hồi sinh tim phổi và bảng hồi sinh tim phổi. Để xác nhận, nhập thông tin đăng nhập phía dưới"
            )
           }}
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
             @click="$modal.hide('doctorConfirm');"
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
       <div class="mt-20">
        <div
         class="text-center"
         style="float: right;
          margin-right: 200px;"
        >
         <!-- {{DataSubmit.DoctorConfirm.UserName}} -->
         <p v-if="DataSubmit.DoctorConfirmAt">
          {{ DataSubmit.DoctorConfirmAt | formatDateHourMinutesDDMMYYY }}
         </p>
         <div>
          <b>{{ __t("Bác sĩ") }}</b>
         </div>
         <div v-if="DataSubmit.DoctorConfirm.UserName">
          <ad-Info :ad="DataSubmit.DoctorConfirm.UserName" />
         </div>
         <div v-else-if="!DataSubmit.DoctorConfirm.UserName && !readonly">
          <button
           @click="showDoctorConfirm('Doctor', 'Bác sĩ');"
           class="btn v-white-btn"
          >
           {{ __t("Xác nhận") }}
          </button>
         </div>
        </div>
       </div>
      </div>
     </div>
     <!-- bản view -->
     <div v-else class="row">
      <div class="col-md-12 col-sm-12">
       <div class="flex align-center mrt10">
        <div class="mrr40 flex">
         <div class="mt-5">
          <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINNGPT"]) }} </b>
         </div>
         <div :class="errorTimeTm ? '' : ''">
          <FakeInput v-model="MASTERDATA['IPDIAACINNGPT'].Items[0].Value" />
         </div>
        </div>
       </div>
       <div class="align-center mt-10 mrb10">
        <!--
         <p >
          {{ __label(MASTERDATA["IPDIAACINCDBOD"]) }}:
         </p>
        -->
        <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINCDBOD"]) }}:</b>
        <!--
         <icd10
          @icdChange="icdChange"
          :mdCode="'IPDIAACINCDBOD'"
          :single="true"
          v-model="MASTERDATA['IPDIAACINCDBOD'].Items[0].Value"
         />
        -->
        <icd10View
         v-if="MASTERDATA['IPDIAACINCDBOD']"
         :mdCode="'IPDIAACINCDBOD'"
         :single="true"
         v-model="MASTERDATA['IPDIAACINCDBOD'].Items[0].Value"
        />
        <FakeInput v-model="MASTERDATA['IPDIAACINCDBOD'].Items[1].Value" class="mt-10" />
        <!--
         <textarea-autosize
          :readonly="readonly"
          class="form-control mrb10 mrt10"
          rows="3"
          :placeholder="__t('Nhập')"
          v-model="MASTERDATA['IPDIAACINCDBOD'].Items[1].Value"
         />
        -->
       </div>
       <!--
        <div class="mt-10">
         <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINCDBO"]) }} </b>
        </div>
        <div class="mt-10">
         <v-select
          class="select-full-w"
          :options="IPDIAAULANG"
          :mutableValue="null"
          :placeholder="__t('Chọn')"
          v-model="MASTERDATA['IPDIAACINNGPT'].Items[0].Value"
         ></v-select>
        </div>
        <div class="mt-10">
         <textarea-autosize
          class="form-control"
          rows="2"
          :placeholder="__t('Nhập')"
          v-model="MASTERDATA['IPDIAACINCDBO'].Items[1].Value"
         />
        </div>
       -->
       <div class="row mt-10 ml-5">
        <div class="column">
         <div class="flex align-center">
          <div class="mt-5" style="width:150px">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINPIT"]) }}:</b>
          </div>
          <div class="mt-5 w400">
           <FakeInput v-model="MASTERDATA['IPDIAACINPIT'].Items[0].Value" />
          </div>
         </div>
         <div class="flex align-center">
          <div class="mt-5" style="width:150px">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACININ"]) }}:</b>
          </div>
          <div class="mt-5 w400">
           <FakeInput v-model="MASTERDATA['IPDIAACININ'].Items[0].Value" />
          </div>
         </div>
         <div class="flex align-center">
          <div class="mt-5" style="width:150px">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINALT"]) }}:</b>
          </div>
          <div class="mt-5 w400">
           <FakeInput v-model="MASTERDATA['IPDIAACINALT'].Items[0].Value" />
          </div>
         </div>
        </div>
        <div class="column">
         <div class="flex align-center">
          <div class="mt-5" style="width:150px">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINOTT"]) }}:</b>
          </div>
          <div class="mt-5 ml-5 w400">
           <FakeInput v-model="MASTERDATA['IPDIAACINOTT'].Items[0].Value" />
          </div>
         </div>
         <div class="flex align-center">
          <div class="mt-5" style="width:150px">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINONS"]) }}:</b>
          </div>
          <div class="mt-5 ml-5 w400">
           <FakeInput v-model="MASTERDATA['IPDIAACINONS'].Items[0].Value" />
          </div>
         </div>
         <div class="flex align-center">
          <div class="mt-5" style="width:150px">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINNAT"]) }}:</b>
          </div>
          <div class="mt-5 ml-5 w400">
           <FakeInput v-model="MASTERDATA['IPDIAACINNAT'].Items[0].Value" />
          </div>
         </div>
        </div>
       </div>
       <div class="mt-10">
        <div>
         <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINAMD"]) }}:</b>
        </div>
        <div>
         <FakeInput v-model="MASTERDATA['IPDIAACINAMD'].Items[0].Value" />
        </div>
       </div>
       <div class="mt-10">
        <div>
         <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINVSBP"]) }}:</b>
        </div>
        <div class="flex">
         <div>
          Thông tin từ đánh giá ban đầu:
          <b class="ml-10"
           >{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[0]) }}: </b
          >{{ dataVitalSigns.BP }} (mmHg)
          <b class="ml-10"
           >{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[1]) }}: </b
          >{{ dataVitalSigns.Pulse }} l/p(bpm)
          <b class="ml-10"
           >{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[2]) }}: </b
          >{{ dataVitalSigns.RR }} l/p(bpm)
          <b class="ml-10"
           >{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[3]) }}: </b
          >N/A (%)
         </div>
         <div>
          <!--
           <button
            class="btn v-yellow-btn pull-left btn-back v-white-btn ml-20"
            type="button"
            style="height:30px"
            @click="handleClickCoppy"
           >
            {{ __t("Sao chép") }}
           </button>
          -->
         </div>
        </div>
       </div>
       <div class="mt-10 flex">
        <div class="mr-20">
         <div>
          <b>{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[0]) }}</b
          >(mmHg)
         </div>
         <div>
          <FakeInput v-model="MASTERDATA['IPDIAACINVSBP'].Items[0].Value" />
         </div>
        </div>
        <div class="mr-20">
         <div>
          <b>{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[1]) }}</b
          >(mmHg)
         </div>
         <div>
          <FakeInput v-model="MASTERDATA['IPDIAACINVSBP'].Items[1].Value" />
         </div>
        </div>
        <div class="mr-20">
         <div>
          <b>{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[2]) }}</b
          >(mmHg)
         </div>
         <div>
          <FakeInput v-model="MASTERDATA['IPDIAACINVSBP'].Items[2].Value" />
         </div>
        </div>
        <div>
         <div>
          <b>{{ __label(MASTERDATA["IPDIAACINVSBP"].Items[3]) }}</b
          >(mmHg)
         </div>
         <div>
          <FakeInput v-model="MASTERDATA['IPDIAACINVSBP'].Items[3].Value" />
         </div>
        </div>
       </div>
       <div class="mt-20 text-center form-title">
        <p>{{ __label(MASTERDATA["IPDIAACINSOTP"]) }}</p>
       </div>
       <div class="mt-10">
        <div class="flex align-center">
         <div style="width:150px">
          <button
           class="btn v-yellow-btn pull-left btn-back v-white-btn mr-50"
           type="button"
           @click="handleClickNongDMV();"
           :style="
            nongDmv
             ? 'background: linear-gradient(180deg, #ffdb71 0%, #f3b600 100%);'
             : ''
           "
          >
           {{ __label(MASTERDATA["IPDIAACINSOTP"].Items[0]) }}
          </button>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <FakeInput v-model="MASTERDATA['IPDIAACINSOTP'].Items[1].Value" />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <button
           class="btn v-yellow-btn pull-left btn-back v-white-btn mr-50"
           type="button"
           @click="handleClickstentDmv();"
           :style="
            stentDmv
             ? 'background: linear-gradient(180deg, #ffdb71 0%, #f3b600 100%);'
             : ''
           "
          >
           {{ __label(MASTERDATA["IPDIAACINSOTP"].Items[1]) }}
          </button>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <FakeInput v-model="MASTERDATA['IPDIAACINSOTP'].Items[1].Value" />
         </div>
        </div>
        <!-- đường vào -->
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[2]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <FakeInput v-model="MASTERDATA['IPDIAACINSOTP'].Items[2].Value" />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[3]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <FakeInput v-model="MASTERDATA['IPDIAACINSOTP'].Items[3].Value" />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[4]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <FakeInput v-model="MASTERDATA['IPDIAACINSOTP'].Items[4].Value" />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[5]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <FakeInput v-model="MASTERDATA['IPDIAACINSOTP'].Items[5].Value" />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[6]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <FakeInput v-model="MASTERDATA['IPDIAACINSOTP'].Items[6].Value" />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[7]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <FakeInput v-model="MASTERDATA['IPDIAACINSOTP'].Items[7].Value" />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[8]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <FakeInput v-model="MASTERDATA['IPDIAACINSOTP'].Items[8].Value" />
         </div>
        </div>
        <div class="align-center mt-10">
         <div style="width:170px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[9]) }}:
          </b>
         </div>
         <div style="flex-grow: 1">
          <FakeInput v-model="MASTERDATA['IPDIAACINSOTP'].Items[9].Value" />
         </div>
        </div>
        <div class="flex align-center mt-10">
         <div style="width:150px">
          <b class="mrr20 fs16"
           >{{ __label(MASTERDATA["IPDIAACINSOTP"].Items[10]) }}:
          </b>
         </div>
         <div style="flex-grow: 1" class="ml-10">
          <FakeInput v-model="MASTERDATA['IPDIAACINSOTP'].Items[10].Value" />
         </div>
        </div>
       </div>
       <div class="mt-20 text-center form-title">
        <p>{{ __t("women.ketqua1") }}</p>
       </div>
       <div class="mt-10">
        <table class="table observation-table no-margin tbl-b2">
         <thead>
          <tr>
           <th rowspan="2" class="text-center">
            {{ __t("women.vitricanthiep") }}
           </th>
           <th rowspan="2" class="text-center">
            {{ __t("women.tenthuthuat") }}
           </th>
           <th rowspan="2" class="text-center">
            {{ __t("women.tenthietbi") }}
           </th>
           <th rowspan="2" class="text-center">
            {{ __t("women.solanbombong") }}
           </th>
           <th colspan="2" class="text-center">{{ __t("women.ketqua") }}</th>
           <th rowspan="2" class="text-center no-wrap">
            {{ __t("women.ghichu") }}
           </th>
          </tr>
          <tr>
           <td style="background-color: #f5f5f5;" class="text-center no-wrap">
            trước
           </td>
           <td style="background-color: #f5f5f5;" class="text-center no-wrap">
            sau
           </td>
          </tr>
         </thead>
         <template v-if="tableList && tableList.length">
          <tbody>
           <tr :key="index" v-for="(item, index) in tableList">
            <template>
             <td style="position: relative;">
              <!-- <button class="btn-pos-left" @click="removeItem(item, index);">
               <i class="fa fa-trash" aria-hidden="true"></i>
              </button> -->
              <FakeInput v-model="item.location" />
             </td>
             <td style="position: relative">
              <FakeInput v-model="item.nameOfProcedure" />
             </td>
             <td style="position: relative">
              <FakeInput v-model="item.sizeOfDevice" />
             </td>
             <td style="position: relative">
              <FakeInput v-model="item.numOfBallom" />
             </td>
             <td style="position: relative">
              <FakeInput v-model="item.beforeResult" />
             </td>
             <td style="position: relative">
              <FakeInput v-model="item.afterResult" />
             </td>
             <td style="position: relative">
              <FakeInput v-model="item.note" />
             </td>
            </template>
           </tr>
           <!--
            <tr>
             <td colspan="7" class="text-center">
              <button @click="addItem();" class="btn btn-info">
               <i class="fa fa-plus" aria-hidden="true"></i> {{ __t("Thêm ") }}
              </button>
             </td>
            </tr>
           -->
          </tbody>
         </template>
        </table>
       </div>
       <div class="mt-20 flex">
        <div class="image-items">
         <img src="static/img/heart.png" style="width: 300px;height:300px" />
        </div>
        <div class="ml-10" style="width:100%">
         <b>{{ __label(MASTERDATA["IPDIAACINCNVT"]) }}:</b>
         <div style="flex-grow: 1">
          <!--
           <textarea-autosize
            class="form-control"
            rows="13"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAACINCNVT'].Items[0].Value"
           />
          -->
          <FakeInput v-model="MASTERDATA['IPDIAACINCNVT'].Items[0].Value" />
         </div>
        </div>
       </div>
       <div class="align-center mt-10">
        <div style="width:170px">
         <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINOES"]) }}: </b>
        </div>
        <div style="flex-grow: 1">
         <FakeInput v-model="MASTERDATA['IPDIAACINOES'].Items[0].Value" />
        </div>
       </div>
       <div class="mt-10">
        <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINCAES"]) }}: </b>
        <div class="row">
         <div class="columnCheckBox ml-10">
          <div>
           <div
            :data="item"
            :key="index"
            v-if="index < 3"
            v-for="(item, index) in MASTERDATA['IPDIAACINCAES'].Items"
           >
            <div class="flex-box flex-center">
             <div class="v-checkbox mt-20">
              <FakeInput v-model="item.Value" />
              <label :for="'IPDIAACINCAEScxo-' + index"></label>
             </div>
             <span
              ><span>{{ __label(item) }}</span></span
             >
            </div>
           </div>
          </div>
         </div>
         <div class="columnCheckBox">
          <div>
           <div
            :data="item"
            :key="index"
            v-if="index > 2 && index < 6"
            v-for="(item, index) in MASTERDATA['IPDIAACINCAES'].Items"
           >
            <div class="flex-box flex-center">
             <div class="v-checkbox mt-20">
              <!--
               <input
                type="checkbox"
                :id="'IPDIAACINCAEScxo-' + index + 2"
                v-model="item.Value"
               />
              -->
              <FakeInput v-model="item.Value" />
              <label :for="'IPDIAACINCAEScxo-' + index + 2"></label>
             </div>
             <span
              ><span>{{ __label(item) }}</span></span
             >
            </div>
           </div>
          </div>
         </div>
         <div class="columnCheckBox">
          <div
           :data="item"
           :key="index"
           v-if="index > 5 && index < 8"
           v-for="(item, index) in MASTERDATA['IPDIAACINCAES'].Items"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox mt-20">
             <FakeInput v-model="item.Value" />
             <label :for="'IPDIAACINCAEScxo-' + index + 2"></label>
            </div>
            <span
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
          <div
           :data="item"
           :key="index"
           v-if="index === 8"
           v-for="(item, index) in MASTERDATA['IPDIAACINCAES'].Items"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox mt-20">
             <FakeInput v-model="item.Value" />
             <label :for="'IPDIAACINCAEScxo-' + index + 4"></label>
            </div>
            <span
             ><span>{{ __label(item) }}</span></span
            >
            <div style="flex-grow: 1" class="ml-10">
             <FakeInput v-model="MASTERDATA['IPDIAACINCAES'].Items[9].Value" />
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
       <div class="align-center mt-10">
        <div style="width:170px">
         <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINNXK"]) }}: </b>
        </div>
        <div style="flex-grow: 1">
         <FakeInput v-model="MASTERDATA['IPDIAACINNXK'].Items[0].Value" />
        </div>
       </div>
       <div class="mt-10 row">
        <div class="column">
         <div class="flex align-center">
          <div class="mt-5 ml-10" style="width:150px">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINBLV"]) }}:</b>
          </div>
          <div class="mt-5 w400">
           <FakeInput v-model="MASTERDATA['IPDIAACINBLV'].Items[0].Value" />
          </div>
         </div>
        </div>
        <div class="column">
         <div class="flex align-center">
          <div class="mt-5">
           <b class="mrr20 fs16">{{ __label(MASTERDATA["IPDIAACINSMBP"]) }}:</b>
          </div>
          <div class="mt-5 w400">
           <FakeInput v-model="MASTERDATA['IPDIAACINSMBP'].Items[0].Value" />
          </div>
         </div>
        </div>
       </div>
       <div class="mt-10 text-center form-title">
        <p>{{ __label(MASTERDATA["IPDIAACINKLC"]) }}</p>
       </div>
       <div style="flex-grow: 1">
        <FakeInput v-model="MASTERDATA['IPDIAACINKLC'].Items[0].Value" />
       </div>
       <div class="mt-10 text-center form-title">
        <p>{{ __label(MASTERDATA["IPDIAACINSGG"]) }}</p>
       </div>
       <div style="flex-grow: 1">
        <FakeInput v-model="MASTERDATA['IPDIAACINSGG'].Items[0].Value" />
       </div>
      </div>
      <div class="mt-20">
        <div
         class="text-center"
         style="float: right;
          margin-right: 200px;"
        >
         <!-- {{DataSubmit.DoctorConfirm.UserName}} -->
         <p v-if="DataSubmit.DoctorConfirmAt">
          {{ DataSubmit.DoctorConfirmAt | formatDateHourMinutesDDMMYYY }}
         </p>
         <div>
          <b>{{ __t("Bác sĩ") }}</b>
         </div>
         <div v-if="DataSubmit.DoctorConfirm.UserName">
          <ad-Info :ad="DataSubmit.DoctorConfirm.UserName" />
         </div>
         <div v-else-if="!DataSubmit.DoctorConfirm.UserName && !readonly">
          <button
           @click="showDoctorConfirm('Doctor', 'Bác sĩ');"
           class="btn v-white-btn"
          >
           {{ __t("Xác nhận") }}
          </button>
         </div>
        </div>
       </div>
     </div>
    </div>
   </div>
   <FloatBlock v-if="!viewOnly" @handleBack="handleBack">
    <template slot="buttons">
     <div class="col-md-2 col-sm-2"><div class="form-group1"></div></div>
     <div v-if="!readonly" class="col-md-4 col-sm-4">
      <!--
       <div class="form-group1">
        <button
         class="btn pull-left btn-back v-white-btn mr-50"
         type="button"
         @click="handleAddFollow"
        >
         + Thêm theo dõi
        </button>
       </div>
      -->
     </div>
     <div v-if="!readonly" class="col-md-6 col-sm-6">
      <!---->
      <div class="flex form-group1">
       <!-- 1 -->
       <button
        class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
        type="button"
        v-shortkey="['ctrl', 's']"
        @click="save();"
       >
        <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ __t("btn.luu") }}
       </button>
      </div>
     </div>
    </template>
   </FloatBlock>

   <div class="row">
    <div class="mt-10 column ml-20">
     <p>A01_076_050919_VE</p>
     <div>
      {{ __t("Chỉnh sửa lần cuối bởi") }} <AdInfo :ad="DataSubmit.UpdateBy" />{{
       __t("lúc")
      }}
      {{ DataSubmit.UpdatedAt | formatDateHourMinutesDDMMYYY }}
     </div>
    </div>
    <!---->
   </div>
  </template>
  <div v-else class="loading-text"><v-loading /></div>
 </div>
</template>
<script>

// import Customer from '@/services/IPD/Customer'
import VSelect from '@/components/VSelect.vue'
// import moment from 'moment'
// eslint-disable-next-line import/no-duplicates
import VDateTimePicker from '@/components/VDateTimePicker.vue'
// eslint-disable-next-line import/no-duplicates
import VDatePicker from '@/components/VDateTimePicker.vue'
// import constants from '@/constants'
import DateTimePicker from 'vue2-datepicker'
// import $ from 'jquery'
import _ from 'lodash'
import MixinMasterData from '@/mixins/masterdata.js'
import DoctorConfirm from './popup/PopupDoctorConfirm.vue'
import MixinForm from '@/mixins/form.js'
import SummaryOf15DayTreatmentPrice from './price/SummaryOf15DayTreatmentPrice.vue'
import SyncPrincipalTest from './SyncPrincipalTest.vue'
// import constants from '@/constants'
import CreateTable from '@/services/IPD/CreateTable'
import CoronaryInterventionService from '@/services/IPD/CoronaryIntervention/CoronaryInterventionService'
export default {
  /**
   * The name of the page.
   */
  name: 'MonitorSheetForPatientItem',
  props: ['formId', 'viewOnly', 'VisitId', 'VisitType', 'timeTMP'],
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      tableCode: 'A01_076_050919_VE',
      listForWomen: [],
      query: '',
      tableList: [],
      dataVitalSigns: {},
      readonly: false,
      showTable: false,
      errorTimeTm: false,
      errorNameTm: false,
      timeTM: '',
      nameTM: '',
      dataHeader: 0,
      defaultText: '',
      popupTitle: '',
      TypeConfirm: '',
      DataSubmit: [],
      user: {},
      tableHeader: [],
      dataMaster: [],
      DataSubmit2: [],
      TableDelete: [],
      ICD1: [],
      ICD2: [],
      DataInfo: [],
      NullRoomId: false,
      loaded: false,
      nongDmv: false,
      stentDmv: false,
      options: [],
      colorList: [
        {
          label: 'Độ 0',
          value: 'Độ 0'
        },
        {
          label: 'Độ 1',
          value: 'Độ 1'
        },
        {
          label: 'Độ 2',
          value: 'Độ 2'
        },
        {
          label: 'Độ 3',
          value: 'Độ 3'
        },
        {
          label: 'Độ 4',
          value: 'Độ 4'
        }
      ],
      temperList: [
        {
          label: 'Độ 0',
          value: 'Độ 0'
        },
        {
          label: 'Độ 1',
          value: 'Độ 1'
        },
        {
          label: 'Độ 2',
          value: 'Độ 2'
        }
      ],
      BLOODFROUABO: [
        {
          label: 'Máu nhóm A',
          value: 'A'
        },
        {
          label: 'Máu nhóm B',
          value: 'B'
        },
        {
          label: 'Máu nhóm O',
          value: 'O'
        },
        {
          label: 'Máu nhóm AB',
          value: 'AB'
        }
      ],
      moveList: [
        {
          label: 'Độ 0',
          value: 'Độ 0'
        },
        {
          label: 'Độ 1',
          value: 'Độ 1'
        },
        {
          label: 'Độ 2',
          value: 'Độ 2'
        },
        {
          label: 'Độ 3',
          value: 'Độ 3'
        }
      ],
      feverList: [
        {
          label: 'Độ 0',
          value: 'Độ 0'
        },
        {
          label: 'Độ 1',
          value: 'Độ 1'
        }
      ],
      painList: [
        {
          label: '1 điểm',
          value: '1 điểm'
        },
        {
          label: '2 điểm',
          value: '2 điểm'
        },
        {
          label: '3 điểm',
          value: '3 điểm'
        },
        {
          label: '4 điểm',
          value: '4 điểm'
        },
        {
          label: '5 điểm',
          value: '5 điểm'
        },
        {
          label: '6 điểm',
          value: '6 điểm'
        },
        {
          label: '7 điểm',
          value: '7 điểm'
        },
        {
          label: '8 điểm',
          value: '8 điểm'
        },
        {
          label: '9 điểm',
          value: '9 điểm'
        },
        {
          label: '10 điểm',
          value: '10 điểm'
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
    DoctorConfirm,
    SummaryOf15DayTreatmentPrice,
    SyncPrincipalTest,
    VDatePicker
  },
  async mounted () {
    this.currentUser = this.$store.state.account.Username
    // master data
    this.getMasterDatas({Form: 'IPDIAACIN'}, () => {
      // console.log('test1', this.MASTERDATA['IPDIAACINNGPTIP'].Items[0])
      this.getData()
      this.getTableData()
      this.getDataInfo()
    })
  },
  watch: {
    formId: function (value) {
      console.log('k', value)
      this.getData()
      this.getTableData()
    },
    timeTM: function (value) {
      console.log('time', value)
      if (value) {
        this.errorTimeTm = false
      } else {
        this.errorTimeTm = true
      }
    },
    nameTM: function (value) {
      if (value) {
        this.errorNameTm = false
      } else {
        this.errorNameTm = true
      }
    }
  },
  methods: {
    confirm () {
      const a = {
        ...this.user,
        TypeConfirm: 'DOCTOR'
      }
      new CoronaryInterventionService(this.VisitType).update('/Confirm/A01_076_050919_VE/' + this.$route.params.Id + '/' + this._ItemId, a).then(response => {
        this.$modal.hide('doctorConfirm')
        this.reload()
        this.toastedSuccess(this.$t('Xác nhận thành công'))
      }).catch(e => {
        this.$modal.hide('doctorConfirm')
      })
    },
    getDataInfo () {
      new CoronaryInterventionService().find('/Info/A01_076_050919_VE/' + this.$route.params.Id).then(res => {
        // this.dataVitalSigns = res.VitalSigns
        const data = {
          ...res.VitalSigns,
          BP: res.VitalSigns.BP ? res.VitalSigns.BP : 'N/A',
          Pulse: res.VitalSigns.Pulse ? res.VitalSigns.Pulse : 'N/A',
          RR: res.VitalSigns.RR ? res.VitalSigns.RR : 'N/A',
          SP02: 'N/A'
        }
        this.dataVitalSigns = data
        console.log('dataVitalSigns', this.dataVitalSigns)
      })
    },
    handleClickCoppy () {
      this.MASTERDATA['IPDIAACINVSBP'].Items[0].Value = this.dataVitalSigns.BP === 'N/A' ? '' : this.dataVitalSigns.BP
      this.MASTERDATA['IPDIAACINVSBP'].Items[1].Value = this.dataVitalSigns.Pulse === 'N/A' ? '' : this.dataVitalSigns.Pulse
      this.MASTERDATA['IPDIAACINVSBP'].Items[2].Value = this.dataVitalSigns.RR === 'N/A' ? '' : this.dataVitalSigns.RR
    },
    getICD10Code (icd) {
      var arr = this.JSONParse(icd) || []
      return arr.map(e => {
        return e.code
      }).join(',')
    },
    addItem () {
      const objTable = {
        id: 'id1',
        location: '',
        nameOfProcedure: '',
        sizeOfDevice: '',
        numOfBallom: '',
        beforeResult: '',
        afterResult: '',
        note: ''
      }
      this.tableList.push(objTable)
    },
    handleViewTable () {
      this.showTable = !this.showTable
    },
    handleClickNongDMV () {
      this.nongDmv = !this.nongDmv
      this.MASTERDATA['IPDIAACINSOTP'].Items[0].Value = ''
    },
    handleClickstentDmv () {
      this.stentDmv = !this.stentDmv
      this.MASTERDATA['IPDIAACINSOTP'].Items[1].Value = ''
    },
    removeItem (value, i) {
      if (value.id !== 'id1') {
        this.TableDelete.push(value.id)
      }
      this.tableList = this.tableList.filter((_, index) => index !== i)
    },
    DeleteTable () {
      const params = {
        TableDelete: this.TableDelete
      }
      new CreateTable().update(this.tableCode + '/' + this.$route.params.Id, params).then(res => {
        console.log('res', res)
      }).catch(error => {
        console.log('err', error)
      })
    },
    getTableData () {
      new CreateTable().find(this.tableCode + '/' + this.$route.params.Id).then(res => {
        var list = res.Datas
        console.log('list', list)
        if (list.length > 0) {
          for (let i = 0; i < list.length; i++) {
          // eslint-disable-next-line no-unused-expressions
            const a = {
              id: list[i].IdRow,
              location: list[i].RowData[0].Value,
              nameOfProcedure: list[i].RowData[1].Value,
              sizeOfDevice: list[i].RowData[2].Value,
              numOfBallom: list[i].RowData[3].Value,
              beforeResult: list[i].RowData[4].Value,
              afterResult: list[i].RowData[5].Value,
              note: list[i].RowData[6].Value,
              idLocation: list[i].RowData[0].Id,
              idSizeOfDevice: list[i].RowData[1].Id,
              idNumOfBallom: list[i].RowData[2].Id,
              idNameOfProcedure: list[i].RowData[3].Id,
              idBeforeResult: list[i].RowData[4].Id,
              idAfterResult: list[i].RowData[5].Id,
              idNote: list[i].RowData[6].Id
            }
            this.tableList.push(a)
          }
        }
      }).catch(error => {
        console.log('err', error)
      })
    },
    CreateTableData () {
      var Table = []
      // var RowData = []
      for (let i = 0; i < this.tableList.length; i++) {
        if (this.tableList[i].id === 'id1') {
          const a = {
            RowData: [
              {
                Code: 'location',
                Value: this.tableList[i].location,
                Id: ''
              },
              {
                Code: 'nameOfProcedure',
                Value: this.tableList[i].nameOfProcedure,
                Id: ''
              },
              {
                Code: 'sizeOfDevice',
                Value: this.tableList[i].sizeOfDevice,
                Id: ''
              },
              {
                Code: 'numOfBallom',
                Value: this.tableList[i].numOfBallom,
                Id: ''
              },
              {
                Code: 'beforeResult',
                Value: this.tableList[i].beforeResult,
                Id: ''
              },
              {
                Code: 'afterResult',
                Value: this.tableList[i].afterResult,
                Id: ''
              },
              {
                Code: 'note',
                Value: this.tableList[i].note,
                Id: ''
              }
            ]
          }
          Table.push(a)
        } else {
          const a = {
            RowData: [
              {
                Code: 'location',
                Value: this.tableList[i].location,
                Id: this.tableList[i].idLocation
              },
              {
                Code: 'nameOfProcedure',
                Value: this.tableList[i].nameOfProcedure,
                Id: this.tableList[i].idNameOfProcedure
              },
              {
                Code: 'sizeOfDevice',
                Value: this.tableList[i].sizeOfDevice,
                Id: this.tableList[i].idSizeOfDevice
              },
              {
                Code: 'numOfBallom',
                Value: this.tableList[i].numOfBallom,
                Id: this.tableList[i].idNumOfBallom
              },
              {
                Code: 'beforeResult',
                Value: this.tableList[i].beforeResult,
                Id: this.tableList[i].idBeforeResult
              },
              {
                Code: 'afterResult',
                Value: this.tableList[i].afterResult,
                Id: this.tableList[i].idAfterResult
              },
              {
                Code: 'note',
                Value: this.tableList[i].note,
                Id: this.tableList[i].idNote
              }
            ]
          }
          Table.push(a)
        }
      }
      const params = {
        Table: Table
      }
      new CreateTable().update(this.tableCode + '/' + this.$route.params.Id, params).then(res => {
        console.log('res', res)
      }).catch(error => {
        console.log('err', error)
      })
    },
    copyToOPDOENPT0 (str) {
      this.MASTERDATA['IPDSO15DTR14'].Items[0].Value = str
    },
    async save (dataComfirm) {
      if (this.tableList.length > 0) {
        this.CreateTableData()
      }
      if (this.TableDelete.length > 0) {
        this.DeleteTable()
      }
      this.DataSubmit.Datas = []
      if (!this.$route.params.Id) return
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
      new CoronaryInterventionService().update('/Update/A01_076_050919_VE/' + this.$route.params.Id + '/' + this._ItemId, data).then(() => {
        if (!dataComfirm) {
          this.toastedSuccess()
          this.reload()
        }
        if (dataComfirm) {
          this.ConfirmKyNhay2(dataComfirm)
        }
      }).catch(() => {
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
      }
    },
    getData () {
      this.loaded = false
      new CoronaryInterventionService().find('A01_076_050919_VE/' + this.$route.params.Id + '/' + this._ItemId).then(res => {
        this.DataSubmit = res
        console.log('submit', this.DataSubmit)
        if (this.$route.name !== 'IPDCoronaryIntervention' || this.$store.state.account.Position.includes('Nurse') || res.DoctorConfirmAt) {
          this.readonly = true
        }
        // if (this.dataSubmit.Datas)
        const checkNongDMV = this.DataSubmit.Datas.filter(i => i.Code === 'IPDIAACINNDMV' && i.Value !== '')
        const checkStentDmv = this.DataSubmit.Datas.filter(i => i.Code === 'IPDIAACINCSDMV' && i.Value !== '')
        this.nongDmv = checkNongDMV.length > 0
        this.stentDmv = checkStentDmv.length > 0
        this.loaded = true
        this.mapData()
        const a = this.DataSubmit.Datas.filter(i => i.Code === 'IPDIAACINNGPTIP')
        const b = JSON.parse(a[0].Value)
        this.MASTERDATA['IPDIAACINNGPT'].Items[0].Value = b
      }).catch(() => {
        this.loaded = true
      })
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopup()
      } else {
        this.back2(`/IPD/SurgeryCertificate/${this.$route.params.Id}`)
      }
    },
    // popup canh bao
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: 'Thông báo',
        text: 'Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu',
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'Đồng ý',
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back2(`/IPD/SurgeryCertificate/${this.$route.params.Id}`)
            }
          },
          {
            title: 'Huỷ bỏ',
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    syncHistoryOfPatientIllnessAndAssessment (type) {
      new CoronaryInterventionService().find('Info/' + this.$route.params.Id + '?hidemsg=' + true).then(res => {
        this.DataInfo = res
        if (res.RoomId && !type && this.NullRoomId && !this.isConfirmed) {
          this.MASTERDATA['IPDSO15DTR01'].Items[0].Value = res.RoomId
        }
        if (res.TotalMedical.ClinicalEvolution && type) {
          this.MASTERDATA['IPDSO15DTR12'].Items[0].Value = res.TotalMedical.ClinicalEvolution
        }
        if (res.TotalMedical.ResultsOfPrincipleTest && type) {
          this.MASTERDATA['IPDSO15DTR14'].Items[0].Value = res.TotalMedical.ResultsOfPrincipleTest
        }
        if ((res.TotalMedical.Treatment.MethodTreatment || res.TotalMedical.Treatment.MainDrugsUsed) && type) {
          let str = ''
          if (res.TotalMedical.Treatment.MethodTreatment) {
            str += `Phương pháp điều trị: \n + ${res.TotalMedical.Treatment.MethodTreatment}`
          }
          if (res.TotalMedical.Treatment.MethodTreatment && res.TotalMedical.Treatment.MainDrugsUsed) {
            str += '\n'
          }
          if (res.TotalMedical.Treatment.MainDrugsUsed) {
            str += `Các thuốc chính đã dùng: \n + ${res.TotalMedical.Treatment.MainDrugsUsed}`
          }
          this.MASTERDATA['IPDSO15DTR16'].Items[0].Value = str
        }
        if (res.TotalMedical.ResultsOfTreatment && type) {
          this.MASTERDATA['IPDSO15DTR18'].Items[0].Value = res.TotalMedical.ResultsOfTreatment
        }
        if (res.TotalMedical.ContinuousTreatmentAndPrognosis && type) {
          this.MASTERDATA['IPDSO15DTR20'].Items[0].Value = res.TotalMedical.ContinuousTreatmentAndPrognosis
        }
      })
    },
    icdChange (value) {
      this.MASTERDATA['IPDIAACINCDBOD'].Items[0].Value = value[0].ViName
      this.MASTERDATA['IPDIAACINCDBOD'].Items[1].Value = value[0].ViName
      // var val = (value || []).map(e => e.ViName).join(',')
      // switch (code) {
      //   case 'IPDIAACINCDBOD':
      //     // IPDMRPTCDBC
      //     if (!this.MASTERDATA['IPDIAACINCDBOD'].Items[0].Value) this.MASTERDATA['IPDIAACINCDBOD'].Items[0].Value = val
      //     break
      //   default:
      //     break
      // }
      // if (value.length > 0) {
      console.log('vvvv', value)
      // }
      console.log('value1', this.MASTERDATA['IPDIAACINCDBOD'])
    },
    icdChange2 (value) {
      var val = (value || []).map(e => e.ViName)
      var currentValue = this.MASTERDATA['IPDSO15DTR10'].Items[0].Value || ''
      this.MASTERDATA['IPDSO15DTR10'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
      if (this.ICD2) {
        const array = []
        this.ICD2.forEach(elm => {
          array.push(elm)
        })
        this.MASTERDATA['IPDSO15DTR08'].Items[0].Value = JSON.stringify(array)
      } else {
        this.MASTERDATA['IPDSO15DTR08'].Items[0].Value = ''
      }
    },
    popupSave (data) {
      if (!this.isConfirmed) {
        this.save(data)
      } else {
        this.ConfirmKyNhay2(data)
      }
    },
    ConfirmKyNhay2 (data) {
      new CoronaryInterventionService().update('/Confirm/' + this.$route.params.Id + '/' + this._ItemId, data).then(() => {
        this.scroll2Bottom()
        this.toastedSuccess()
        this.reload()
      }).catch(() => {
      })
    },
    handleCopy (data) {
      if (!data) return
      if (data.Type === 'main') {
        if (data.Icd) {
          this.ICD1 = this.JSONParse(data.Icd)
          this.MASTERDATA['IPDSO15DTR04'].Items[0].Value = data.Icd
        }
        this.MASTERDATA['IPDSO15DTR06'].Items[0].Value = data.Disease
      } else {
        if (data.Icd) {
          this.ICD2 = this.JSONParse(data.Icd)
          this.MASTERDATA['IPDSO15DTR08'].Items[0].Value = data.Icd
        }
        this.MASTERDATA['IPDSO15DTR10'].Items[0].Value = data.Disease
      }
    },
    getDataTextFill (Data, type) {
      let data = {
        Icd: '',
        Disease: '',
        CreateBy: '',
        UpdateAt: '',
        Type: ''
      }
      if (Data) {
        data = {
          Icd: '',
          Disease: '',
          CreateBy: Data.CreateBy,
          UpdateAt: Data.UpdateAt,
          Type: type
        }
        if (type === 'main') {
          data.Icd = Data.ICD10MainDisease
          data.Disease = Data.MainDisease
        } else {
          data.Icd = Data.IDC10IncludingDisease
          data.Disease = Data.IncludingDisease
        }
      }
      return data
    }
  },
  computed: {
    IPDIAAULANG: function () {
      return this.BLOODFROUABO.map((e) => e.label)
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
    isConfirmed: function () {
      return (this.DataSubmit.HeadOfDepartmentConfirmAt || this.DataSubmit.PhysicianConfirmAt || this.viewOnly || this.DataSubmit.IsLocked || (this.condition && this.condition === 'Nurse'))
    },
    _ItemId: function () {
      return this.$route.params.Item || this.formId
    }
  }
}
</script>
<style lang="stylus" scoped>
.validate-style {
 border: 1px solid red;
 border-radius: 4px;
}

.columnCheckBox {
 float: left;
 width: 32%;
}

.w400 {
 width: 430px;
}

.column {
 float: left;
 width: 50%;
}
.column2 {
 float: right;
 width: 40%;
}

.table-info {
 border: 1px solid #efefef;
 width: 120px;
 text-align: center;
 border-radius: 4px;
}

.box-collapse-title {
 text-align: left !important;
}

.box-top-content {
 border-top: 2px solid #D2D6DE;
}

.content-box2 {
 margin-bottom: 5px;

 .mini-box1, .mini-box2 {
  border: 1px solid #D2D6DE;
  padding: 6px 12px 0 12px;
  border-top: 0px;
 }

 .box-ed-content {
  background: #ffd695;
  padding: 5px;
  border-radius: 0px 0px 4px 4px;
 }
}
</style>
