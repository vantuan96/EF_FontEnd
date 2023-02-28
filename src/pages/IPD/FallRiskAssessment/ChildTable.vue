<template>
 <div>
  <div class="text-center" v-if="!readonly">
   <button @click="open(false);" class="uppercase btn v-yellow-btn">
    {{ __t("women.add-assess") }}
   </button>
  </div>
  <modal
   name="MasterDataPopup"
   transition="pop-out"
   height="auto"
   :clickToClose="false"
   :width="modalWidth"
  >
   <div class="sync-ed-header">
    {{ __t("Bảng đánh giá nguy cơ ngã ở trẻ em") }}
    <i
     @click="$modal.hide('MasterDataPopup');"
     class="fa fa-times pull-right fa-2"
     aria-hidden="true"
    ></i>
   </div>
   <div class="flex">
    <div class="ml-10 mt-20" style="width:50px">
     <label>{{ __t("Ngày") }}:</label>
    </div>
    <div class="mt-10" v-if="readonly">
     <FakeInput v-model="StartingAssessment" />
    </div>
    <div class="mt-10" v-else>
      <VDatePicker style="transform: translateY(2px);" :readonly="true" :hideTooltip="false" class="display-inline" :format="'HH:mm DD/MM/YYYY'" v-model="StartingAssessment"/>
     <!-- <v-date-picker
      :hideTooltip="true"
      class="w1510 display-inline"
      :format="'HH:mm DD/MM/YYYY'"
      v-model="StartingAssessment"
     /> -->
    </div>
    <div>
     <div style="margin-left: 500px;" class="mt-20 flex">
      <div>
       <label>{{ __t("Người đánh giá") }}:</label>
      </div>
      <div class="ml-5"><ad-Info :ad="createdBy" /></div>
     </div>
    </div>
   </div>
   <div class="sync-ed-box">
    <div class="row container mt-10" style="width: 100%; display: flex;">
     <!--
      <div class="col-2 form-group" style="width: 100%; display: inline-table">
        <label>{{__t('Từ ngày')}}</label>
        <v-date-time-picker :format="vDateTimeFormat" :allday="'allday'" v-model="query.FromDate" ></v-date-time-picker>
      </div>
     -->
     <!--
      <div class="col-4 form-group" style="width: 100%; display: inline-table">
       <label>{{ __t("Ngày") }}</label>
       <v-date-time-picker
        :format="vDateTimeFormat"
        :allday="'allday'"
        v-model="StartingAssessment"
       ></v-date-time-picker>
      </div>
      <div
       class="col-4 form-group"
       style="width: 100%; display: inline-table; margin-left: 36px;"
      >
       <label style="display: inline-block">{{ __t("Người đánh giá") }}</label>
       <UsersSelect2 v-model="query.Assessor" />
      </div>
     -->
     <!--
      <div class="col-3 form-group" style="width: 100%; display: inline-table; margin-top: 25px; margin-left: 20px;">
        <button class="btn btn-flat v-yellow-btn" style="margin-right: 20px" @click="getData()">{{__t("Lọc")}}</button>
        <button class="btn btn-flat" @click="clearFilter()">{{__t('Xóa bộ lọc')}}</button>
      </div>
     -->
    </div>
    <table
     v-if="checkMonth"
     class="standing-order-tbl"
     :class="{ disable: readonly }"
    >
     <tr>
      <td class="bg-head" width="270">{{ __t("women.totalPoint") }}</td>
      <td colspan="2">
       <label class="label-yellow">{{ __t("women.36month") }}</label>
      </td>
     </tr>
     <tr>
      <td class="bg-head" width="270">{{ __t("women.levelfall") }}</td>
      <td colspan="2">
       <label class="label-yellow">{{ __t("women.high") }}</label>
      </td>
     </tr>
     <!-- can thiệp -->
     <tr>
      <th></th>
      <th>{{ __t("women.Intervention") }}</th>
      <th class="no-wrap">{{ __t("women.tick") }}</th>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYPBNN']">
      <td class="bg-head" width="270" rowspan="7">
       {{ __t("women.Prepare") }}
      </td>
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYPBNN"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYPBNN']"
        v-model="MASTERDATA['IPDIAAHUMPTYPBNN']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYSDGB']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYSDGB"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYSDGB']"
        v-model="MASTERDATA['IPDIAAHUMPTYSDGB']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYNTCG']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYNTCG"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYNTCG']"
        v-model="MASTERDATA['IPDIAAHUMPTYNTCG']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYHTVK']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYHTVK"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYHTVK']"
        v-model="MASTERDATA['IPDIAAHUMPTYHTVK']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYASMB']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYASMB"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYASMB']"
        v-model="MASTERDATA['IPDIAAHUMPTYASMB']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYXNBO']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYXNBO"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYXNBO']"
        v-model="MASTERDATA['IPDIAAHUMPTYXNBO']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYLBCN']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYLBCN"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYLBCN']"
        v-model="MASTERDATA['IPDIAAHUMPTYLBCN']"
       />
      </td>
     </tr>
     <!-- tư ván -->
     <tr v-if="MASTERDATA['IPDIAAHUMPTYGSSK']">
      <td class="bg-head" width="270" rowspan="3">
       {{ __t("women.Consultation") }}
      </td>
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYGSSK"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYGSSK']"
        v-model="MASTERDATA['IPDIAAHUMPTYGSSK']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYNLVV']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYNLVV"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYNLVV']"
        v-model="MASTERDATA['IPDIAAHUMPTYNLVV']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYTVSD']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYTVSD"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYTVSD']"
        v-model="MASTERDATA['IPDIAAHUMPTYTVSD']"
       />
      </td>
     </tr>
     <!-- áp dụng dấu hiệu cảnh báo -->
     <tr v-if="MASTERDATA['IPDIAAHUMPTYDVCB']">
      <td class="bg-head" width="270" rowspan="3">
       {{ __t("women.Apply-warning") }}
      </td>
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYDVCB"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYDVCB']"
        v-model="MASTERDATA['IPDIAAHUMPTYDVCB']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYDNCB']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYDNCB"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYDNCB']"
        v-model="MASTERDATA['IPDIAAHUMPTYDNCB']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYBGNB']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYBGNB"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYBGNB']"
        v-model="MASTERDATA['IPDIAAHUMPTYBGNB']"
       />
      </td>
     </tr>
     <!-- các hỗ trợ -->
     <tr v-if="MASTERDATA['IPDIAAHUMPTYCCDC']">
      <td class="bg-head" width="270" rowspan="6">
       {{ __t("women.Assistance") }}
      </td>
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYCCDC"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYCCDC']"
        v-model="MASTERDATA['IPDIAAHUMPTYCCDC']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYCNTG']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYCNTG"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYCNTG']"
        v-model="MASTERDATA['IPDIAAHUMPTYCNTG']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYC2NTG']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYC2NTG"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYC2NTG']"
        v-model="MASTERDATA['IPDIAAHUMPTYC2NTG']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYDXD']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYDXD"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYDXD']"
        v-model="MASTERDATA['IPDIAAHUMPTYDXD']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYSDGVS']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYSDGVS"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYSDGVS']"
        v-model="MASTERDATA['IPDIAAHUMPTYSDGVS']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYHTVS']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYHTVS"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYHTVS']"
        v-model="MASTERDATA['IPDIAAHUMPTYHTVS']"
       />
      </td>
     </tr>
     <!-- Người bệnh kích động -->
     <tr v-if="MASTERDATA['IPDIAAHUMPTYTDVL']">
      <td class="bg-head" width="270" rowspan="1">
       {{ __t("women.Patients") }}
      </td>
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYTDVL"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYTDVL']"
        v-model="MASTERDATA['IPDIAAHUMPTYTDVL']"
       />
      </td>
     </tr>
    </table>

    <table v-else class="standing-order-tbl" :class="{ disable: readonly }">
     <tr>
      <th width="150">{{ __t("women.params") }}</th>
      <th>{{ __t("women.Criteria") }}</th>
      <th width="200">{{ __t("women.point") }}</th>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYAGE']">
      <td class="bg-head" width="270" rowspan="3">
       {{ __label(MASTERDATA["IPDIAAHUMPTYAGE"]) }}
      </td>
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYAGE"].Items[0]) }}
      </td>
      <td>
       <div class="group-radio full-width" style="pointer-events: none;">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYAGEradio-' + 1"
          v-model="MASTERDATA['IPDIAAHUMPTYAGE'].Items[1].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYAGEradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYAGE'].Items,
            MASTERDATA['IPDIAAHUMPTYAGE'].Items[1]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYAGE"].Items[1]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYAGE']">
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYAGE"].Items[2]) }}</td>
      <td>
       <div class="group-radio full-width" style="pointer-events: none;">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYAGEradio-' + 3"
          v-model="MASTERDATA['IPDIAAHUMPTYAGE'].Items[3].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYAGEradio-' + 3"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYAGE'].Items,
            MASTERDATA['IPDIAAHUMPTYAGE'].Items[3]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYAGE"].Items[3]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYAGE']">
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYAGE"].Items[4]) }}</td>
      <td>
       <div class="group-radio full-width" style="pointer-events: none;">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYAGEradio-' + 5"
          v-model="MASTERDATA['IPDIAAHUMPTYAGE'].Items[5].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYAGEradio-' + 5"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYAGE'].Items,
            MASTERDATA['IPDIAAHUMPTYAGE'].Items[5]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYAGE"].Items[5]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYGEN']">
      <td class="bg-head" width="270" rowspan="2">
       {{ __label(MASTERDATA["IPDIAAHUMPTYGEN"]) }}
      </td>
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYGEN"].Items[0]) }}</td>
      <td>
       <div class="group-radio full-width" style="pointer-events: none;">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYGENradio-' + 1"
          v-model="MASTERDATA['IPDIAAHUMPTYGEN'].Items[1].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYGENradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYGEN'].Items,
            MASTERDATA['IPDIAAHUMPTYGEN'].Items[1]
           );
          "
         >
          {{ __label(MASTERDATA["IPDIAAHUMPTYGEN"].Items[1]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYGEN']">
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYGEN"].Items[2]) }}</td>
      <td>
       <div class="group-radio full-width" style="pointer-events: none;">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYGENradio-' + 3"
          v-model="MASTERDATA['IPDIAAHUMPTYGEN'].Items[3].Value"
          @change="calculatePoint();"
         />
         <!--
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYGEN'].Items,
            MASTERDATA['IPDIAAHUMPTYGEN'].Items[3]
           );
          "
         -->
         <label
          :for="'IPDIAAHUMPTYGENradio-' + 3"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYGEN'].Items,
            MASTERDATA['IPDIAAHUMPTYGEN'].Items[3]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYGEN"].Items[3]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYDIA']">
      <td class="bg-head" width="270" rowspan="4">
       {{ __label(MASTERDATA["IPDIAAHUMPTYDIA"]) }}
      </td>
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYDIA"].Items[0]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYDIAradio-' + 1"
          v-model="MASTERDATA['IPDIAAHUMPTYDIA'].Items[1].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYDIAradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYDIA'].Items,
            MASTERDATA['IPDIAAHUMPTYDIA'].Items[1]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYDIA"].Items[1]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYDIA']">
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYDIA"].Items[2]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYDIAradio-' + 3"
          v-model="MASTERDATA['IPDIAAHUMPTYDIA'].Items[3].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYDIAradio-' + 3"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYDIA'].Items,
            MASTERDATA['IPDIAAHUMPTYDIA'].Items[3]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYDIA"].Items[3]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYDIA']">
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYDIA"].Items[4]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYDIAradio-' + 5"
          v-model="MASTERDATA['IPDIAAHUMPTYDIA'].Items[5].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYDIAradio-' + 5"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYDIA'].Items,
            MASTERDATA['IPDIAAHUMPTYDIA'].Items[5]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYDIA"].Items[5]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYDIA']">
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYDIA"].Items[6]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYDIAradio-' + 7"
          v-model="MASTERDATA['IPDIAAHUMPTYDIA'].Items[7].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYDIAradio-' + 7"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYDIA'].Items,
            MASTERDATA['IPDIAAHUMPTYDIA'].Items[7]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYDIA"].Items[7]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYCI']">
      <td class="bg-head" width="270" rowspan="3">
       {{ __label(MASTERDATA["IPDIAAHUMPTYCI"]) }}
      </td>
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYCI"].Items[0]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYCIradio-' + 1"
          v-model="MASTERDATA['IPDIAAHUMPTYCI'].Items[1].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYCIradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYCI'].Items,
            MASTERDATA['IPDIAAHUMPTYCI'].Items[1]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYCI"].Items[1]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYCI']">
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYCI"].Items[2]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYCIradio-' + 3"
          v-model="MASTERDATA['IPDIAAHUMPTYCI'].Items[3].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYCIradio-' + 3"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYCI'].Items,
            MASTERDATA['IPDIAAHUMPTYCI'].Items[3]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYCI"].Items[3]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYCI']">
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYCI"].Items[4]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYCIradio-' + 5"
          v-model="MASTERDATA['IPDIAAHUMPTYCI'].Items[5].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYCIradio-' + 5"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYCI'].Items,
            MASTERDATA['IPDIAAHUMPTYCI'].Items[5]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYCI"].Items[5]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYEF']">
      <td class="bg-head" width="270" rowspan="3">
       {{ __label(MASTERDATA["IPDIAAHUMPTYEF"]) }}
      </td>
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYEF"].Items[0]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYEFradio-' + 1"
          v-model="MASTERDATA['IPDIAAHUMPTYEF'].Items[1].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYEFradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYEF'].Items,
            MASTERDATA['IPDIAAHUMPTYEF'].Items[1]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYEF"].Items[1]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYEF']">
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYEF"].Items[2]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYEFradio-' + 3"
          v-model="MASTERDATA['IPDIAAHUMPTYEF'].Items[3].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYEFradio-' + 3"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYEF'].Items,
            MASTERDATA['IPDIAAHUMPTYEF'].Items[3]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYEF"].Items[3]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYEF']">
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYEF"].Items[4]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYEFradio-' + 5"
          v-model="MASTERDATA['IPDIAAHUMPTYEF'].Items[5].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYEFradio-' + 5"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYEF'].Items,
            MASTERDATA['IPDIAAHUMPTYEF'].Items[5]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYEF"].Items[5]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYRTSA']">
      <td class="bg-head" width="270" rowspan="3">
       {{ __label(MASTERDATA["IPDIAAHUMPTYRTSA"]) }}
      </td>
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYRTSA"].Items[0]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYRTSAradio-' + 1"
          v-model="MASTERDATA['IPDIAAHUMPTYRTSA'].Items[1].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYRTSAradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYRTSA'].Items,
            MASTERDATA['IPDIAAHUMPTYRTSA'].Items[1]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYRTSA"].Items[1]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYRTSA']">
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYRTSA"].Items[2]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYRTSAradio-' + 3"
          v-model="MASTERDATA['IPDIAAHUMPTYRTSA'].Items[3].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYRTSAradio-' + 3"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYRTSA'].Items,
            MASTERDATA['IPDIAAHUMPTYRTSA'].Items[3]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYRTSA"].Items[3]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYRTSA']">
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYRTSA"].Items[4]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYRTSAradio-' + 5"
          v-model="MASTERDATA['IPDIAAHUMPTYRTSA'].Items[5].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYRTSAradio-' + 5"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYRTSA'].Items,
            MASTERDATA['IPDIAAHUMPTYRTSA'].Items[5]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYRTSA"].Items[5]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYMDC']">
      <td class="bg-head" width="270" rowspan="3">
       {{ __label(MASTERDATA["IPDIAAHUMPTYMDC"]) }}
      </td>
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYMDC"].Items[0]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYMDCradio-' + 1"
          v-model="MASTERDATA['IPDIAAHUMPTYMDC'].Items[1].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYMDCradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYMDC'].Items,
            MASTERDATA['IPDIAAHUMPTYMDC'].Items[1]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYMDC"].Items[1]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYMDC']">
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYMDC"].Items[2]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYMDCradio-' + 3"
          v-model="MASTERDATA['IPDIAAHUMPTYMDC'].Items[3].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYMDCradio-' + 3"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYMDC'].Items,
            MASTERDATA['IPDIAAHUMPTYMDC'].Items[3]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYMDC"].Items[3]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYMDC']">
      <td>{{ __label(MASTERDATA["IPDIAAHUMPTYMDC"].Items[4]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAHUMPTYMDCradio-' + 5"
          v-model="MASTERDATA['IPDIAAHUMPTYMDC'].Items[5].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAHUMPTYMDCradio-' + 5"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAHUMPTYMDC'].Items,
            MASTERDATA['IPDIAAHUMPTYMDC'].Items[5]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAHUMPTYMDC"].Items[5]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr>
      <td class="bg-head" width="270">{{ __t("women.totalPoint") }}</td>
      <td></td>
      <td>
       <label class="label-yellow">{{ totalPoint }}</label>
      </td>
     </tr>
     <tr>
      <td class="bg-head" width="270">{{ __t("women.levelfall") }}</td>
      <td></td>
      <td>
       <label class="label-yellow">{{ levelPoint }}</label>
      </td>
     </tr>
     <tr>
      <th></th>
      <th>{{ __t("women.Intervention") }}</th>
      <th class="no-wrap">{{ __t("women.tick") }}</th>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYPBNN']">
      <td class="bg-head" width="270" rowspan="7">
       {{ __t("women.Prepare") }}
      </td>
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYPBNN"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYPBNN']"
        v-model="MASTERDATA['IPDIAAHUMPTYPBNN']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYSDGB']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYSDGB"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYSDGB']"
        v-model="MASTERDATA['IPDIAAHUMPTYSDGB']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYNTCG']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYNTCG"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYNTCG']"
        v-model="MASTERDATA['IPDIAAHUMPTYNTCG']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYHTVK']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYHTVK"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYHTVK']"
        v-model="MASTERDATA['IPDIAAHUMPTYHTVK']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYASMB']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYASMB"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYASMB']"
        v-model="MASTERDATA['IPDIAAHUMPTYASMB']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYXNBO']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYXNBO"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYXNBO']"
        v-model="MASTERDATA['IPDIAAHUMPTYXNBO']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYLBCN']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYLBCN"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYLBCN']"
        v-model="MASTERDATA['IPDIAAHUMPTYLBCN']"
       />
      </td>
     </tr>
     <!-- tư ván -->
     <tr v-if="MASTERDATA['IPDIAAHUMPTYGSSK']">
      <td class="bg-head" width="270" rowspan="3">
       {{ __t("women.Consultation") }}
      </td>
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYGSSK"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYGSSK']"
        v-model="MASTERDATA['IPDIAAHUMPTYGSSK']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYNLVV']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYNLVV"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYNLVV']"
        v-model="MASTERDATA['IPDIAAHUMPTYNLVV']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYTVSD']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYTVSD"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYTVSD']"
        v-model="MASTERDATA['IPDIAAHUMPTYTVSD']"
       />
      </td>
     </tr>
     <!-- áp dụng dấu hiệu cảnh báo -->
     <tr v-if="MASTERDATA['IPDIAAHUMPTYDVCB']">
      <td class="bg-head" width="270" rowspan="3">
       {{ __t("women.Apply-warning") }}
      </td>
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYDVCB"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYDVCB']"
        v-model="MASTERDATA['IPDIAAHUMPTYDVCB']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYDNCB']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYDNCB"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYDNCB']"
        v-model="MASTERDATA['IPDIAAHUMPTYDNCB']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYBGNB']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYBGNB"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYBGNB']"
        v-model="MASTERDATA['IPDIAAHUMPTYBGNB']"
       />
      </td>
     </tr>
     <!-- các hỗ trợ -->
     <tr v-if="MASTERDATA['IPDIAAHUMPTYCCDC']">
      <td class="bg-head" width="270" rowspan="6">
       {{ __t("women.Assistance") }}
      </td>
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYCCDC"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYCCDC']"
        v-model="MASTERDATA['IPDIAAHUMPTYCCDC']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYCNTG']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYCNTG"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYCNTG']"
        v-model="MASTERDATA['IPDIAAHUMPTYCNTG']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYC2NTG']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYC2NTG"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYC2NTG']"
        v-model="MASTERDATA['IPDIAAHUMPTYC2NTG']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYDXD']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYDXD"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYDXD']"
        v-model="MASTERDATA['IPDIAAHUMPTYDXD']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYSDGVS']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYSDGVS"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYSDGVS']"
        v-model="MASTERDATA['IPDIAAHUMPTYSDGVS']"
       />
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAHUMPTYHTVS']">
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYHTVS"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYHTVS']"
        v-model="MASTERDATA['IPDIAAHUMPTYHTVS']"
       />
      </td>
     </tr>
     <!-- Người bệnh kích động -->
     <tr v-if="MASTERDATA['IPDIAAHUMPTYTDVL']">
      <td class="bg-head" width="270" rowspan="1">
       {{ __t("women.Patients") }}
      </td>
      <td class="disable: true">
       {{ __label(MASTERDATA["IPDIAAHUMPTYTDVL"]) }}
      </td>
      <td>
       <MDRadio
        v-if="MASTERDATA['IPDIAAHUMPTYTDVL']"
        v-model="MASTERDATA['IPDIAAHUMPTYTDVL']"
       />
      </td>
     </tr>
     <!--
      <template v-for="dd in MDCODES2">
       <template v-if="MASTERDATA[dd]">
        <tr
         :data="item"
         :key="index + item.Code"
         v-for="(item, index) in MASTERDATA[dd].Items.filter(
          e => e.Data[level] === '1'
         )"
        >
         <td
          v-if="index === 0"
          :rowspan="
           MASTERDATA[dd].Items.filter(e => e.Data[level] === '1').length
          "
          class="bg-head font-bold"
          width="270"
         >
          {{ __label(MASTERDATA[dd]) }}
         </td>
         <td>{{ __label(item) }}</td>
         <td>
          <label
           class="container-checkbox reset"
           :for="dd + 'IPDMOFRSAD-' + index"
          >
           <input
            type="checkbox"
            :id="dd + 'IPDMOFRSAD-' + index"
            v-model="item.Value"
            @change="calculatePoint();"
           />
           <span class="checkmark"></span>
          </label>
         </td>
        </tr>
       </template>
      </template>
     -->
    </table>

    <br />
    <button
     v-if="!readonly"
     class="btn btn-yellow-gradient btn-block"
     v-shortkey="['ctrl', 's']"
     @shortkey="save();"
     @click="save();"
    >
     <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ __t("Lưu") }}
    </button>
   </div>
  </modal>
 </div>
</template>
<script>
import FallRiskAssessment from '@/services/IPD/FallRiskAssessment'
import MixinMasterData from '@/mixins/masterdata.js'
import NProgress from 'nprogress'
import _ from 'lodash'
import UsersSelect2 from '@/components/UsersSelect2.vue'
import VDatePicker from '@/components/VDateTimePicker.vue'
// import VDateTimePicker from '@/components/VDateTimePicker.vue'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import moment from 'moment'
const MODAL_WIDTH = 980
// const age = 15
const MDCODES = [
  'IPDIAAHUMPTYAGE',
  'IPDIAAHUMPTYGEN',
  'IPDIAAHUMPTYDIA',
  'IPDIAAHUMPTYCI',
  'IPDIAAHUMPTYEF',
  'IPDIAAHUMPTYRTSA',
  'IPDIAAHUMPTYMDC'
]
const MDCODES2 = [
  'IPDMMFSIRP',
  'IPDMMFSCON',
  'IPDMMFSAWS',
  'IPDMMFSAWW',
  'IPDMMFSPAA'
  // 'IPDIAAHUMPTYAGE',
  // 'IPDIAAHUMPTYGEN',
  // 'IPDIAAHUMPTYDIA',
  // 'IPDIAAHUMPTYCI',
  // 'IPDIAAHUMPTYEF',
  // 'IPDIAAHUMPTYRTSA',
  // 'IPDIAAHUMPTYMDC'
]
export default {
  name: 'Morse',
  props: ['readonly', 'VisitId', 'detail'],
  mixins: [MixinMasterData],
  data () {
    return {
      checkMonth: false,
      numberMonth: '',
      gender: '',
      DataSubmit: {
      },
      ageScore: 0,
      genderScore: 0,
      createdBy: '',
      StartingAssessment: '',
      modalWidth: MODAL_WIDTH,
      ageIndex: [0, 1],
      LEVELS: ['Thấp', 'Trung Bình', 'Cao'],
      formId: null,
      MDCODES2: MDCODES2,
      query: {
        VisitId: null,
        Assessor: {
          Username: '',
          Fullname: ''
        },
        FromDate: null,
        ToDate: null,
        PageNumber: 1,
        PageSize: 30
      },
      levelPoint: 'Thấp',
      totalPoint: 0
    }
  },
  computed: {
    age () {
      if (this.$store.state.account.CurrentPatientObj && this.$store.state.account.CurrentPatientObj.DateOfBirth && this.$store.state.account.CurrentPatientObj.AdmittedDate) {
        var now = this.$store.state.account.CurrentPatientObj.AdmittedDate.split('/')
        var dob = this.$store.state.account.CurrentPatientObj.DateOfBirth.split('/')
        return this.parseInt(now[2]) - this.parseInt(dob[2])
      }
      return 'N/A'
    },
    total: function () {
      var total = 0
      MDCODES.forEach(code => {
        if (this.MASTERDATA[code]) {
          this.MASTERDATA[code].Items.forEach(item => {
            if (item.DataType === 'Radio' && item.Data && item.Value) {
              total = total + this.parseInt(item.Data)
            }
          })
        }
      })
      return total
    },
    level: function () {
      var level = 2
      // var total = this.total
      // if (total >= 30 && total <= 49) {
      //   level = 2
      // }
      // if (total >= 50) {
      //   level = 2
      // }
      return level
    }
  },
  components: {
    VDatePicker, UsersSelect2, DateRangePicker
  },
  mounted () {
    console.log('lang', localStorage.getItem('locale'))
    // localStorage.setItem('locale', locale)
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
    this.getTotal()
    // this.getMasterDatas({Form: 'IPDMMFS'}, () => {
    // })
    this.getMasterDatas({Form: 'IPDIAAHUMPTY'}, () => {
    })
    // this.createdBy = this.getUser()
  },
  methods: {
    calculatePoint () {
      var a = 0
      a += this.ageScore + this.genderScore
      if (this.MASTERDATA['IPDIAAHUMPTYDIA'].Items[1].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYDIA'].Items[1].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYDIA'].Items[3].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYDIA'].Items[3].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYDIA'].Items[5].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYDIA'].Items[5].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYDIA'].Items[7].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYDIA'].Items[7].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYCI'].Items[1].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYCI'].Items[1].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYCI'].Items[3].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYCI'].Items[3].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYCI'].Items[5].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYCI'].Items[5].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYEF'].Items[1].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYEF'].Items[1].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYEF'].Items[3].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYEF'].Items[3].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYEF'].Items[5].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYEF'].Items[5].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYRTSA'].Items[1].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYRTSA'].Items[1].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYRTSA'].Items[3].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYRTSA'].Items[3].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYRTSA'].Items[5].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYRTSA'].Items[5].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYMDC'].Items[1].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYMDC'].Items[1].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYMDC'].Items[3].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYMDC'].Items[3].ViName)
      }
      if (this.MASTERDATA['IPDIAAHUMPTYMDC'].Items[5].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAHUMPTYMDC'].Items[5].ViName)
      }
      this.totalPoint = a
      if (a < 7) {
        this.levelPoint = 'N/A'
      } else if (a >= 7 && a <= 11) {
        this.levelPoint = this.$t('women.low')
      } else if (a >= 12) {
        this.levelPoint = this.$t('women.high')
      } else {
        this.levelPoint = 'N/A'
      }
    },
    getYearOld (birthDay) {
      // this.monthOfAge = Math.floor(moment(new Date()).diff(moment(this.Customer.DateOfBirth, 'DD/MM/YYYY'), 'months', true))
      // this.yearOfAge = moment(new Date()).diff(moment(this.Customer.DateOfBirth, 'DD/MM/YYYY'), 'years', true)
      const a = {
        month: moment(new Date()).diff(moment(birthDay, 'DD/MM/YYYY'), 'months', true),
        year: moment(new Date()).diff(moment(birthDay, 'DD/MM/YYYY'), 'years', true)
      }
      return a
    },
    open (formId) {
      // this.monthDiff()
      this.formId = formId
      this.StartingAssessment = moment().format('HH:mm DD/MM/YYYY')
      // this.getData()
      this.resetMdDataValue()
      if (this.formId) {
        this.getData()
      } else {
        new FallRiskAssessment().find('Pediatric/Infor/' + this._VisitId).then(response => {
          // mới
          const caculateBirthday = this.getYearOld(response.DateOfBirth)
          if (caculateBirthday.month < 36) {
            this.checkMonth = true
          } else if (caculateBirthday.month >= 36 && caculateBirthday.year < 7) {
            this.MASTERDATA['IPDIAAHUMPTYAGE'].Items[1].Value = true
            this.ageScore = 3
          } else if (caculateBirthday.year >= 7 && caculateBirthday.year < 13) {
            this.MASTERDATA['IPDIAAHUMPTYAGE'].Items[3].Value = true
            this.ageScore = 2
          } else if (caculateBirthday.year >= 13) {
            this.MASTERDATA['IPDIAAHUMPTYAGE'].Items[5].Value = true
            this.ageScore = 1
          }
          if (!this.checkMonth) {
            if (response.Gender === 1) {
              this.MASTERDATA['IPDIAAHUMPTYGEN'].Items[1].Value = true
              this.genderScore = 2
            } else if (response.Gender === 0) {
              this.MASTERDATA['IPDIAAHUMPTYGEN'].Items[3].Value = true
              this.genderScore = 1
            }
          }
          this.calculatePoint()
        })
        this.createdBy = this.getUser()
        this.$modal.show('MasterDataPopup')
        // this.setAgeIndex()
      }
    },
    setAgeIndex () {
      if (this.age >= 60 && this.age < 70) {
        this.ageIndex = [2, 3]
      }
      if (this.age >= 70 && this.age < 80) {
        this.ageIndex = [4, 5]
      }
      if (this.age >= 80) {
        this.ageIndex = [6, 7]
      }
      this.MASTERDATA['IPDMMFSAGE'].Items[this.ageIndex[1]].Value = true
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            if (code === 'IPDMMFSIRPUAC' && this.age > 16) {
              item.Data = '9999'
            }
            if (code === 'IPDMMFSCONPRC' && this.age <= 16) {
              item.Data = '9999'
            }
          })
        }
      }
    },
    // getDateOfBirth () {
    //   new FallRiskAssessment().find('Pediatric/Infor/' + this._VisitId).then(res => {
    //     console.log('res', res)
    //   })
    // },
    getData () {
      new FallRiskAssessment().find('Pediatric/Detail/' + this.formId).then(response => {
        this.DataSubmit = response
        this.loaded = true
        this.StartingAssessment = response.TimeAssessment ? response.TimeAssessment : moment().format('HH:mm DD/MM/YYYY')
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
                if (code === 'IPDIAAULANGANS') {
                  item.Value = null
                }
              }
            })
          }
        }
        if (response.CreatedBy !== this.getUser()) {
          this.readonly = true
        }
        this.createdBy = response.CreatedBy ? response.CreatedBy : this.getUser()
        const caculateBirthday = this.getYearOld(response.DateOfBirth)
        if (caculateBirthday.month < 36) {
          this.checkMonth = true
        } else if (caculateBirthday.month >= 36 && caculateBirthday.year < 7) {
          this.MASTERDATA['IPDIAAHUMPTYAGE'].Items[1].Value = true
          this.ageScore = 3
        } else if (caculateBirthday.year >= 7 && caculateBirthday.year < 13) {
          this.MASTERDATA['IPDIAAHUMPTYAGE'].Items[3].Value = true
          this.ageScore = 2
        } else if (caculateBirthday.year >= 13) {
          this.MASTERDATA['IPDIAAHUMPTYAGE'].Items[5].Value = true
          this.ageScore = 1
        }
        if (!this.checkMonth) {
          if (response.Gender === 1) {
            this.MASTERDATA['IPDIAAHUMPTYGEN'].Items[1].Value = true
            this.genderScore = 2
          } else {
            this.MASTERDATA['IPDIAAHUMPTYGEN'].Items[3].Value = true
            this.genderScore = 1
          }
        }
        this.edited = false
        this.$modal.show('MasterDataPopup')
        // this.setAgeIndex()
        this.calculatePoint()
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    getTotal () {
    },
    getIntervention () {
    },
    save () {
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      this.DataSubmit.Total = this.total
      this.DataSubmit.Level = this.level
      this.DataSubmit.Intervention = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            if (item.Group === 'IPDIAAHUMPTYAGE') {
              if (item.Value === true) {
                var val = true
              }
            } else {
              val = item.Value
            }
            if (MDCODES2.includes(property)) {
              val = item.Value
              //  && item.Data[this.level] === '1'
              if (val) {
                this.DataSubmit.Intervention.push({
                  ViName: item.ViName,
                  EnName: item.EnName
                })
              }
            }
            if (item.Code === 'IPDIAAHUMPTYPBNNCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYPBNN'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYPBNN'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYSDGBCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYSDGB'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYSDGB'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYNTCGCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYNTCG'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYNTCG'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYHTVKCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYHTVK'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYHTVK'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYASMBCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYASMB'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYASMB'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYXNBOCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYXNBO'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYXNBO'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYLBCNCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYLBCN'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYLBCN'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYPCNCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYPCN'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYPCN'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYGSSKCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYGSSK'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYGSSK'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYNLVVCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYNLVV'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYNLVV'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYTVSDCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYTVSD'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYTVSD'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYDVCBCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYDVCB'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYDVCB'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYBGNBCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYBGNB'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYBGNB'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYCCDCCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYCCDC'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYCCDC'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYCNTGCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYCNTG'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYCNTG'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYC2NTGCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYC2NTG'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYC2NTG'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYDXDCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYDXD'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYDXD'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYSDGVSCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYSDGVS'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYSDGVS'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYHTVSCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYHTVS'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYHTVS'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYTDVLCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYTDVL'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYTDVL'].EnName
              })
            }
            if (item.Code === 'IPDIAAHUMPTYDNCBCD1' && item.Value) {
              this.DataSubmit.Intervention.push({
                ViName: this.MASTERDATA['IPDIAAHUMPTYDNCB'].ViName,
                EnName: this.MASTERDATA['IPDIAAHUMPTYDNCB'].EnName
              })
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            // if (item.Code === 'IPDIAAHUMPTYAGECD2') {
            //   this.DataSubmit.Datas.push({
            //     Code: item.Code,
            //     Value: val,
            //     Group: property
            //   })
            // }
            obj[item.Code] = item.Value
          })
        }
      }
      var url = 'Pediatric/Create/' + this._VisitId
      if (this.formId) {
        url = 'Pediatric/Update/' + this.formId
      }
      this.DataSubmit.Intervention = JSON.stringify(this.DataSubmit.Intervention)
      this.DataSubmit = {
        ...this.DataSubmit,
        TimeAssessment: this.StartingAssessment,
        Level: this.checkMonth ? this.$t('women.high') : this.levelPoint,
        Total: this.checkMonth ? 9999 : this.totalPoint
      }
      new FallRiskAssessment().update(url, this.DataSubmit).then(response => {
        this.toastedSuccess()
        setTimeout(() => {
          this.reload()
        }, 500)
      }).catch(e => {
        // this._401ResponseError(e)
      })
    }
  }
}
</script>
