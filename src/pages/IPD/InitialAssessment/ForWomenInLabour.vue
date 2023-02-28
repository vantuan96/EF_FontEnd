<template>
 <div>
  <div>
   <template v-if="loaded">
    <template v-if="DataSubmit">
     <div v-if="readonly">
      <ViewOnly
       :MASTERDATA="MASTERDATA"
       :listForWomen="listForWomen"
       :DataSubmit="DataSubmit"
      />
     </div>
     <div v-else>
      <div class="tbl-title">1. {{ __t("women.history") }}</div>
      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block1"
      >
       <!-- tiểu đường -->
       <tr v-if="MASTERDATA['IPDIAAUSPPDIA']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPDIA"]) }}</div>
        </th>
        <td>
         <div class="group-radio flex-box flex-center">
          <div>
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPDIA'].Items"
            v-if="index < 1"
           >
            <input
             @click="handleClickIPDIAAUSPPDIA(index, item.Value);"
             type="checkbox"
             :id="'IPDIAAUSPPDIAradio-' + index"
             v-model="item.Value"
            />
            <label
             :class="{ 'label-b': item.Code === 'IPDIAAUSPPDIAYES' }"
             :for="'IPDIAAUSPPDIAradio-' + index"
             @click="
              checkbox2RadioText(MASTERDATA['IPDIAAUSPPDIA'].Items, item);
             "
             >{{ __label(item) }}</label
            >
           </span>
          </div>
          <div
           style="flex-grow: 1"
           class="ml-10"
           v-if="MASTERDATA['IPDIAAUSPPDIA'].Items[0].Value"
          >
           <textarea-autosize
            class="form-control"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUSPPDIA'].Items[1].Value"
           />
          </div>
         </div>
        </td>
       </tr>
       <!-- cao huyết ap -->
       <tr v-if="MASTERDATA['IPDIAAUSPPPRE']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPPRE"]) }}</div>
        </th>
        <td>
         <div class="group-radio flex-box flex-center">
          <div>
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPPRE'].Items"
            v-if="index < 1"
           >
            <input
             @click="handleClickIPDIAAUSPPPRE(index, item.Value);"
             type="checkbox"
             :id="'IPDIAAUSPPPREradio-' + index"
             v-model="item.Value"
            />
            <label
             :class="{ 'label-b': item.Code === 'IPDIAAUSPPPREYES' }"
             :for="'IPDIAAUSPPPREradio-' + index"
             @click="
              checkbox2RadioText(MASTERDATA['IPDIAAUSPPPRE'].Items, item);
             "
             >{{ __label(item) }}</label
            >
           </span>
          </div>
          <div
           style="flex-grow: 1"
           class="ml-10"
           v-if="MASTERDATA['IPDIAAUSPPPRE'].Items[0].Value"
          >
           <textarea-autosize
            class="form-control"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUSPPPRE'].Items[1].Value"
           />
          </div>
         </div>
        </td>
       </tr>
       <!-- nhóm máu -->
       <tr v-if="MASTERDATA['IPDIAAUSPPBLOOD']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPBLOOD"]) }}</div>
        </th>
        <td>
         <div class="flex-box flex-center">
          <!--
           <div class="group-radio">
            <span
             :data="item"
             :key="index"
             v-for="(item, index) in MASTERDATA['IPDIAAUSPPBLOOD'].Items"
             v-if="index < 1"
            >
             <input
              type="checkbox"
              :id="'IPDIAAUSPPBLOODradio-' + index"
              v-model="item.Value"
              @click="ChangeIPDIAAUSPPBLOOD(item.Value, item.Code);"
             />
             <label
              :class="{ 'label-b': item.Code === 'IPDIAAUSPPABO' }"
              :for="'IPDIAAUSPPBLOODradio-' + index"
              @click="
               checkbox2RadioText(MASTERDATA['IPDIAAUSPPBLOOD'].Items, item);
              "
              >{{ __label(item) }}</label
             >
            </span>
           </div>
           <div
            class="ml-10"
            v-if="MASTERDATA['IPDIAAUSPPBLOOD'].Items[0].Value"
           >
            <textarea-autosize
             class="form-control mr-10"
             rows="2"
             :placeholder="__t('Nhập')"
             v-model="MASTERDATA['IPDIAAUSPPBLOOD'].Items[4].Value"
            />
           </div>
          -->
          <!-- abo -->
          <!-- <label>{{ __t("Nhóm máu ABO") }}</label> -->
          <!--
           <v-select
            class="select-full-w"
            v-model="MASTERDATA['IPDIAAUSPPBLOOD'].Items[0].Value"
            :placeholder="__t('Nhập nhóm máu ABO')"
            :items="BLOODFROUABO"
           />
          -->
          <div class="group-radio mr-10 flex-box flex-center">
           <div>
            <b style="margin-left:20px" class="no-wrap mgl-5 mgr-5">{{
             __t("InitialAssessment.Abo")
            }}</b>
           </div>
           <div class="v-select w250">
           <v-select
            :options="IPDIAAULANG"
            :mutableValue="null"
            :placeholder="__t('Chọn')"
            v-model="MASTERDATA['IPDIAAUSPPBLOODABO'].Items[0].Value"
           ></v-select>
          </div>
           <!-- <div>
            <V2Select
             class="select-full-w"
             v-model="MASTERDATA['IPDIAAUSPPBLOODABO'].Items[0].Value"
             :placeholder="__t('Nhập nhóm máu ABO')"
             :items="BLOODFROUABO"
            />
           </div> -->
          </div>
          <div class="group-radio" style="flex-grow: 1">
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPBLOOD'].Items.filter(
             i =>
              i.Code === 'IPDIAAUSPPABOP' ||
              i.Code === 'IPDIAAUSPPABOCH' ||
              i.Code === 'IPDIAAUSPPABOUN'
            )"
           >
            <input
             type="checkbox"
             :id="'IPDIAAUSPPBLOODradio-' + index + 2"
             v-model="item.Value"
             @click="ChangeIPDIAAUSPPBLOOD(item.Value, item.Code);"
            />
            <label
             :class="{ 'label-b': item.Code === 'IPDIAAUSPPABOCH' }"
             :for="'IPDIAAUSPPBLOODradio-' + index + 2"
             @click="
              checkbox2RadioText(MASTERDATA['IPDIAAUSPPBLOOD'].Items, item);
             "
             >{{ __label(item) }}</label
            >
           </span>
           <!--
            <textarea-autosize
             rows="1"
             v-if="MASTERDATA['IPDIAAUSPPBLOOD'].Items[4].Value"
             :placeholder="__t('Nhập')"
             class="form-control"
             v-model="MASTERDATA['IPDIAAUSPPBLOOD'].Items[5].Value"
            />
           -->
          </div>
         </div>
        </td>
       </tr>
       <!-- Thalassemia -->
       <tr v-if="MASTERDATA['IPDIAAUSPPTLM']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPTLM"]) }}</div>
        </th>
        <td>
         <div class="flex-box flex-center">
          <div class="group-radio">
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPTLM'].Items"
            v-if="index < 1"
           >
            <input
             type="checkbox"
             :id="'IPDIAAUSPPTLMradio-' + index"
             v-model="item.Value"
             @click="handleClickIPDIAAUSPPTLM(index, item.Value);"
            />
            <label
             :class="{ 'label-b': item.Code === 'IPDIAAUSPPTLMYES' }"
             :for="'IPDIAAUSPPTLMradio-' + index"
             @click="
              checkbox2RadioText(MASTERDATA['IPDIAAUSPPTLM'].Items, item);
             "
             >{{ __label(item) }}</label
            >
           </span>
          </div>
          <!--
           <b v-if="MASTERDATA['IPDIAAUSPPBLOOD'].Items[1].Value" style="margin-left:20px"  class="no-wrap mgl-5 mgr-5">{{__t('InitialAssessment.label61')}}</b>
          -->
          <div class="ml-10 mr-10" v-if="MASTERDATA['IPDIAAUSPPTLM'].Items[0].Value">
           <textarea-autosize
            class="form-control"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUSPPTLM'].Items[2].Value"
           />
          </div>

          <div class="group-radio" style="flex-grow: 1">
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPTLM'].Items.filter(
             i => i.Code === 'IPDIAAUSPPTLMUN'
            )"
           >
            <input
             type="checkbox"
             :id="'IPDIAAUSPPTLMradio-' + index + 2"
             v-model="item.Value"
             @click="handleClickIPDIAAUSPPTLM(item.Value, 3);"
            />
            <label
             :for="'IPDIAAUSPPTLMradio-' + index + 2"
             @click="
              checkbox2RadioText(MASTERDATA['IPDIAAUSPPTLM'].Items, item);
             "
             >{{ __label(item) }}</label
            >
           </span>
           <!--
            <textarea-autosize
            rows="1"
            v-if="MASTERDATA['IPDIAAUSPPTLM'].Items[4].Value"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUSPPTLM'].Items[5].Value"
            />
           -->
          </div>
         </div>
        </td>
       </tr>
       <!-- Liên cầu b -->
       <tr v-if="MASTERDATA['IPDIAAUSPPGBS']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPGBS"]) }}</div>
        </th>
        <td>
         <div class="flex-box flex-center">
          <div class="group-radio">
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPGBS'].Items"
            v-if="index < 1"
           >
            <input
             type="checkbox"
             :id="'IPDIAAUSPPGBSradio-' + index"
             v-model="item.Value"
             @click="handleClickIPDIAAUSPPGBS(index, item.Value);"
            />
            <label
             :class="{ 'label-b': item.Code === 'IPDIAAUSPPGBSYES' }"
             :for="'IPDIAAUSPPGBSradio-' + index"
             @click="
              checkbox2RadioText(MASTERDATA['IPDIAAUSPPGBS'].Items, item);
             "
             >{{ __label(item) }}</label
            >
           </span>
          </div>
          <!--
           <b v-if="MASTERDATA['IPDIAAUSPPBLOOD'].Items[1].Value" style="margin-left:20px"  class="no-wrap mgl-5 mgr-5">{{__t('InitialAssessment.label61')}}</b>
          -->
          <div class="ml-10 mr-10" v-if="MASTERDATA['IPDIAAUSPPGBS'].Items[0].Value">
           <textarea-autosize
            class="form-control"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUSPPGBS'].Items[2].Value"
           />
          </div>

          <div class="group-radio" style="flex-grow: 1">
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPGBS'].Items.filter(
             i => i.Code === 'IPDIAAUSPPGBSUN'
            )"
           >
            <input
             type="checkbox"
             :id="'IPDIAAUSPPGBSradio-' + index + 2"
             v-model="item.Value"
             @click="handleClickIPDIAAUSPPGBS(6, item.Value);"
            />
            <label
             :for="'IPDIAAUSPPGBSradio-' + index + 2"
             @click="
              checkbox2RadioText(MASTERDATA['IPDIAAUSPPGBS'].Items, item);
             "
             >{{ __label(item) }}</label
            >
           </span>
           <!--
            <textarea-autosize
            rows="1"
            v-if="MASTERDATA['IPDIAAUSPPTLM'].Items[4].Value"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUSPPTLM'].Items[5].Value"
            />
           -->
          </div>
         </div>
        </td>
       </tr>
       <!-- HbSAg -->
       <tr v-if="MASTERDATA['IPDIAAUSPPHBS']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPHBS"]) }}</div>
        </th>
        <td>
         <div class="flex-box flex-center">
          <div class="group-radio">
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPHBS'].Items"
           >
            <input
             type="checkbox"
             :id="'IPDIAAUSPPHBSradio-' + index"
             v-model="item.Value"
             @click="handleClickIPDIAAUSPPHBS(index, item.Value);"
            />
            <label
             :for="'IPDIAAUSPPHBSradio-' + index"
             :class="{ 'label-b-nonunderline': item.Code === 'IPDIAAUSPPHBSP' }"
             @click="
              checkbox2RadioText(MASTERDATA['IPDIAAUSPPHBS'].Items, item);
             "
             >{{ __label(item) }}</label
            >
           </span>
          </div>
         </div>
        </td>
       </tr>
       <!-- khác -->
       <tr v-if="MASTERDATA['IPDIAAUSPPOTHR']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPOTHR"]) }}</div>
        </th>
        <td>
         <div class="group-radio flex-box flex-center">
          <div>
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPOTHR'].Items"
            v-if="index < 1"
           >
            <input
             type="checkbox"
             :id="'IPDIAAUSPPOTHRradio-' + index"
             v-model="item.Value"
             @click="handleClickIPDIAAUSPPOTHR(item.Value);"
            />
            <label
             :class="{ 'label-b': item.Code === 'IPDIAAUSPPOTHRYES' }"
             :for="'IPDIAAUSPPOTHRradio-' + index"
             @click="
              checkbox2RadioText(MASTERDATA['IPDIAAUSPPOTHR'].Items, item);
             "
             >{{ __label(item) }}</label
            >
           </span>
          </div>
          <div
           style="flex-grow: 1"
           class="ml-10"
           v-if="MASTERDATA['IPDIAAUSPPOTHR'].Items[0].Value"
          >
           <textarea-autosize
            class="form-control"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUSPPOTHR'].Items[1].Value"
           />
          </div>
         </div>
        </td>
       </tr>
       <!-- hướng xử lý hỗ trợ -->
       <tr v-if="MASTERDATA['IPDIAAUSPPNEED1']">
        <th>{{ __t("InitialAssessment.label12") }}</th>
        <td>
         <div class="flex-box flex-center ">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPNEED1'].Items.filter(
            i => i.Code === 'IPDIAAUSPPNEED1ANS'
           )"
          >
           <div
            class="flex-box flex-center"
            :class="
             MASTERDATA['IPDIAAUSPPHBS'].Items[0].Value ||
             MASTERDATA['IPDIAAUSPPDIA'].Items[0].Value ||
             MASTERDATA['IPDIAAUSPPPRE'].Items[0].Value ||
             MASTERDATA['IPDIAAUSPPBLOOD'].Items[0].Value ||
             MASTERDATA['IPDIAAUSPPBLOOD'].Items[2].Value ||
             MASTERDATA['IPDIAAUSPPHBS'].Items[0].Value ||
             MASTERDATA['IPDIAAUSPPOTHR'].Items[0].Value ||
             MASTERDATA['IPDIAAUSPPTLM'].Items[0].Value ||
             MASTERDATA['IPDIAAUSPPGBS'].Items[0].Value
              ? 'disabel-table'
              : ''
            "
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUSPPNEED1cxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUSPPNEED1cxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
          <!---->
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPNEED1'].Items.filter(
            i => i.Code === 'IPDIAAUSPPNEED1NONE'
           )"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUSPPNEED1cxo-' + index + 1"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUSPPNEED1cxo-' + index + 1"></label>
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
       id="InitialAssessment-ForAdult-block2"
      >
       <tr>
        <td colspan="2" class="no-padding">
         <div class="tbl-title">2. {{ __t("women.Surgical-history") }}</div>
        </td>
       </tr>
       <!-- tiền sử phẫu thuật -->
       <tr v-if="MASTERDATA['IPDIAAUSPPSUR']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPSUR"]) }}</div>
        </th>
        <td>
         <div class="group-radio mb-10">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPSUR'].Items"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUSPPSURradio-' + index"
            v-model="item.Value"
            @click="handleClickIPDIAAUSPPSUR(index);"
           />
           <label
            :class="{ 'label-b': item.Code === 'IPDIAAUSPPSURYES' }"
            :for="'IPDIAAUSPPSURradio-' + index"
            @click="checkbox2Radio(MASTERDATA['IPDIAAUSPPSUR'].Items, item);"
            >{{ __label(item) }}</label
           >
          </span>
         </div>
         <!-- bảng -->
         <table
          class="table observation-table no-margin tbl-b2"
          v-if="MASTERDATA['IPDIAAUSPPSUR'].Items[1].Value"
         >
          <thead>
           <tr>
            <th class="text-center">{{ __t("women.stt") }}</th>
            <th class="text-center">{{ __t("women.type-of") }}</th>
            <th class="text-center no-wrap" style="width:100px">{{ __t("women.year") }}</th>
           </tr>
           <tr>
            <!--
             <th :class="top ? 'th-top' : null" :style="headerStyle ? headerStyle[index] : {}" :key="index" v-for="(item, index) in mddata.Items">
               {{__label(item)}}
             </th>
            -->
           </tr>
          </thead>
          <template v-if="listForWomen && listForWomen.length">
           <tbody>
            <tr :key="index" v-for="(item, index) in listForWomen">
             <template v-if="!RealOnly">
              <!--
               <TblWithMasterDataItem :readonly="readonly" :key="index" :MASTERDATA="mddata" v-model="item.Datas" v-if="!item.IsDeleted" @onDelete="onDelete(index)"/>
              -->
              <td style="position: relative; width:30px">
               <button class="btn-pos-left" @click="remove(item, index);">
                <i class="fa fa-trash" aria-hidden="true"></i>
               </button>
               <p style="text-align: center;">{{ index + 1 }}</p>
              </td>
              <td style="position: relative">
               <input
                class="form-control"
                v-model="item.Type"
                :placeholder="__t('Nhập')"
               />
              </td>
              <td><VNumberInput v-model="item.Year" /></td>
             </template>
            </tr>
            <tr>
             <td colspan="4" class="text-center">
              <button @click="add(item);" class="btn btn-info">
               <i class="fa fa-plus" aria-hidden="true"></i> {{ __t("Thêm ") }}
              </button>
             </td>
            </tr>
           </tbody>
          </template>
          <tfoot v-else>
           <tr>
            <td colspan="4" class="text-center">
             <button @click="addItem" class="btn btn-info">
              <i class="fa fa-plus" aria-hidden="true"></i> {{ __t("Thêm ") }}
             </button>
            </td>
           </tr>
          </tfoot>
         </table>
        </td>
       </tr>
       <!-- hướng xử trí hỗ trợ tiền sử phẫu thuật -->
       <tr v-if="MASTERDATA['IPDIAAUSPPNEED2']">
        <th>{{ __t("InitialAssessment.label12") }}</th>
        <td>
         <div class="flex-box flex-center ">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPNEED2'].Items.filter(
            i => i.Code === 'IPDIAAUSPPNEED2ANS'
           )"
          >
           <div
            class="flex-box flex-center"
            :class="
             MASTERDATA['IPDIAAUSPPSUR'].Items[1].Value ? 'disabel-table' : ''
            "
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUSPPNEED2cxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUSPPNEED2cxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
          <!---->
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPNEED2'].Items.filter(
            i => i.Code === 'IPDIAAUSPPNEED2NONE'
           )"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUSPPNEED2cxo-' + index + 1"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUSPPNEED2cxo-' + index + 1"></label>
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
         <div class="tbl-title">3. {{ __t("women.Obstetrics-history") }}</div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUSPPPARA']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPPARA"]) }}</div>
        </th>
        <td>
          <div v-if="syncPara" class="flex-box flex-center mb-10">
            <div class="font-nomal-text mr-5">Thông tin Para được khai thác gần nhất lúc {{ParaUpdateAt}} bởi <ad-Info :ad="ParaUpdateBy"/> là {{syncListPara}}</div>
            <button type="button" class="btn v-yellow-btn" @click="copy()">{{__t('Sao chép')}}</button>
          </div>
         <div class="flex-box flex-center">
          <div class="w150 display-inline mr-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPPARA'].Items"
           >
            <div class="mb-5">
             <!-- <b>{{ __label(item) }}</b> -->
             <span v-if="item.Note" class="note-text"
              >({{ __t(item.Note) }})</span
             >
            </div>
            <div class="flex-box flex-center" style="width:400px">
             <div>
              <input
               class="form-control"
               v-model="item.Value"
               :placeholder="__t('Nhập')"
              />
             </div>
             <div class="ml-20">
              {{ __label(item) }}
              <!-- <p> {{getDesciption(1)}} </p> -->
             </div>
            </div>
           </div>
          </div>
         </div>
        </td>
       </tr>
       <!-- tiền sử các lần sinh trước -->
       <tr v-if="MASTERDATA['IPDIAAUSPPIES']">
        <th>{{ __label(MASTERDATA["IPDIAAUSPPIES"]) }}</th>
        <td>
         <div style="width:100%" class="flex-box flex-center mb-20">
          <div style="width:23%">
           <div class="mb-20">
            <b class="no-wrap mgl-5 mgr-5">{{ __t("women.numof-1") }}</b>
           </div>
           <div>
            <b class="no-wrap mgl-5 mgr-5">{{ __t("women.numof-2") }}</b>
           </div>
          </div>
          <div style="width:20%">
           <div class="mb-20">
            <input
             class="form-control"
             :placeholder="__t('Nhập')"
             v-model="MASTERDATA['IPDIAAUSPPIES'].Items[0].Value"
            />
           </div>
           <div>
            <input
             class="form-control"
             :placeholder="__t('Nhập')"
             v-model="MASTERDATA['IPDIAAUSPPIES'].Items[2].Value"
            />
           </div>
          </div>
          <div style="width:11%" class="ml-20">
           <div class="mb-20">
            <b class="no-wrap mgl-5 mgr-5">{{ __t("women.numof-year") }}</b>
           </div>
           <div>
            <b class="no-wrap mgl-5 mgr-5">{{ __t("women.numof-year") }}</b>
           </div>
          </div>
          <div style="width:12%">
           <div class="mb-20">
            <input
             class="form-control"
             :placeholder="__t('Nhập')"
             v-model="MASTERDATA['IPDIAAUSPPIES'].Items[1].Value"
            />
           </div>
           <div>
            <input
             class="form-control"
             :placeholder="__t('Nhập')"
             v-model="MASTERDATA['IPDIAAUSPPIES'].Items[3].Value"
            />
           </div>
          </div>
         </div>
         <!--
          <div class="flex-box flex-center">
           <b class="no-wrap mgl-5 mgr-5">{{__t('women.numof-2')}}</b>
           <div>
            <input
             class="form-control"
             :placeholder="__t('Nhập')"
             v-model="MASTERDATA['IPDIAAUSPPIES'].Items[0].Value"
            />
           </div>
           <b class="no-wrap mgl-5 mgr-5">{{__t('women.numof-year')}}</b>
           <div class="v-select w250">
            <input
             class="form-control"
             :placeholder="__t('Nhập')"
             v-model="MASTERDATA['IPDIAAUSPPIES'].Items[0].Value"
            />
           </div>
          </div>
         -->
        </td>
       </tr>
       <!-- Lưu ý các lần sinh trước -->
       <tr v-if="MASTERDATA['IPDIAAUSPPCIP']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPCIP"]) }}</div>
        </th>
        <td>
         <div class="flex-box flex-center">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPCIP'].Items"
           v-if="index < 2"
          >
           <div class="flex-box flex-center mr-10">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUSPPCIPcxo-' + index"
              v-model="item.Value"
              @change="handleClickIPDIAAUSPPCIP(item.Value, item.Code);"
             />
             <label :for="'IPDIAAUSPPCIPcxo-' + index"></label>
            </div>
            <span
             class="displaytbl"
             :class="{
              'label-b':
               item.Code === 'IPDIAAUSPPCIPPH' ||
               item.Code === 'IPDIAAUSPPCIPID'
             }"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
          <!-- radio -->
          <div
           class="group-radio mr-10"
           v-if="MASTERDATA['IPDIAAUSPPCIP'].Items[1].Value"
          >
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPCIPIDCH'].Items"
           >
            <input
             type="checkbox"
             :id="'IPDIAAUSPPCIPIDCHradio-' + index"
             v-model="item.Value"
            />
            <label
             :class="{
              'label-b':
               item.Code === 'IPDIAAUSPPCIPIDCHFC' ||
               item.Code === 'IPDIAAUSPPCIPIDCHVC'
             }"
             :for="'IPDIAAUSPPCIPIDCHradio-' + index"
             @click="
              checkbox2RadioText(MASTERDATA['IPDIAAUSPPCIPIDCH'].Items, item);
             "
             >{{ __label(item) }}</label
            >
           </span>
          </div>
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPCIP'].Items.filter(
            i => i.Code === 'IPDIAAUSPPCIPOT'
           )"
          >
           <div class="flex-box flex-center mr-10">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUSPPCIPcxo-' + index + 3"
              v-model="item.Value"
              @change="handleCklickIPDIAAUSPPCIPOther();"
             />
             <label :for="'IPDIAAUSPPCIPcxo-' + index + 3"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
          <div
           style="flex-grow: 1"
           class="ml-10"
           v-if="MASTERDATA['IPDIAAUSPPCIP'].Items[2].Value"
          >
           <textarea-autosize
            class="form-control"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUSPPCIP'].Items[3].Value"
           />
          </div>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUSPPNEED3']">
        <th>{{ __t("InitialAssessment.label12") }}</th>
        <td>
         <div class="flex-box flex-center ">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPNEED3'].Items.filter(
            i => i.Code === 'IPDIAAUSPPNEED3ANS'
           )"
          >
           <div
            class="flex-box flex-center"
            :class="
             MASTERDATA['IPDIAAUSPPCIP'].Items[0].Value ||
             MASTERDATA['IPDIAAUSPPCIP'].Items[1].Value
              ? 'disabel-table'
              : ''
            "
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUSPPNEED3cxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUSPPNEED3cxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
          <!---->
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPNEED3'].Items.filter(
            i => i.Code === 'IPDIAAUSPPNEED3NONE'
           )"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUSPPNEED3cxo-' + index + 1"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUSPPNEED3cxo-' + index + 1"></label>
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

      <!-- trạng thái thần kinh -->
      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block4"
      >
       <tr>
        <td colspan="2" class="no-padding">
         <div class="tbl-title">4. {{ __t("women.Fetus-condition") }}</div>
        </td>
       </tr>
       <!-- tình trạng thai nhi -->
       <tr v-if="MASTERDATA['IPDIAAUSPPGLA']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPGLA"]) }}</div>
        </th>
        <td>
         <div class="flex-box flex-center">
          <div class="w150 display-inline mr-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPGLA'].Items"
           >
            <div class="mb-5">
             <!-- <b>{{ __label(item) }}</b> -->
             <span v-if="item.Note" class="note-text"
              >({{ __t(item.Note) }})</span
             >
            </div>
            <div class="flex-box flex-center">
             <div>
              <input
               class="form-control"
               v-model="item.Value"
               :placeholder="__t('Nhập')"
              />
             </div>
             <div class="ml-20">
              tuần
              <!-- <p> {{getDesciption(1)}} </p> -->
             </div>
            </div>
           </div>
          </div>
         </div>
        </td>
       </tr>
       <!-- ngày siêu âm gần nhất -->
       <tr v-if="MASTERDATA['IPDIAAUSPPLUD']">
        <th>{{ __label(MASTERDATA["IPDIAAUSPPLUD"]) }}</th>
        <td>
         <div class="flex-box flex-center">
           <v-date-picker :hideTooltip="true" v-model="MASTERDATA['IPDIAAUSPPLUD'].Items[0].Value" :format="'DD/MM/YYYY'"/>
          <!-- <v-date-picker
           :hideTooltip="true"
           class="w1510 display-inline"
           :format="'HH:mm DD/MM/YYYY'"
           v-model="MASTERDATA['IPDIAAUSPPLUD'].Items[0].Value"
          /> -->
         </div>
        </td>
       </tr>
       <!-- kết quả siêu âm gần nhất -->
       <tr v-if="MASTERDATA['IPDIAAUSPPLR']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPLR"]) }}</div>
        </th>
        <td>
         <div class="group-radio flex-box flex-center">
          <div>
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPLR'].Items"
            v-if="index < 2"
           >
            <input
             @click="handleClickIPDIAAUSPPLR(index, item.Value);"
             type="checkbox"
             :id="'IPDIAAUSPPLRradio-' + index"
             v-model="item.Value"
            />
            <label
             :class="{ 'label-b': item.Code === 'IPDIAAUSPPARL' }"
             :for="'IPDIAAUSPPLRradio-' + index"
             @click="
              checkbox2RadioText(MASTERDATA['IPDIAAUSPPLR'].Items, item);
             "
             >{{ __label(item) }}</label
            >
           </span>
          </div>
          <!-- <b
           v-if="MASTERDATA['IPDIAAUSPPLR'].Items[1].Value"
           style="margin-left:20px"
           class="no-wrap mgl-5 mgr-5"
           >{{ __t("InitialAssessment.label6") }}</b
          > -->
          <span  v-if="MASTERDATA['IPDIAAUSPPLR'].Items[1].Value"
           style="margin-left:20px"
           class="no-wrap mgl-5">
            {{ __t("InitialAssessment.label6") }}
          </span>

          <div
           style="flex-grow: 1"
           class="ml-10"
           v-if="MASTERDATA['IPDIAAUSPPLR'].Items[1].Value"
          >
           <textarea-autosize
            class="form-control"
            rows="1"
            :placeholder="__t('women.place-holder')"
            v-model="MASTERDATA['IPDIAAUSPPLR'].Items[2].Value"
           />
          </div>
         </div>
        </td>
       </tr>
       <!-- có tiêm trưởng thành phổi -->
       <tr v-if="MASTERDATA['IPDIAAUSPPASTG']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPASTG"]) }}</div>
        </th>
        <td>
         <div class="group-radio flex-box flex-center">
          <div>
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPASTG'].Items"
            v-if="index < 2"
           >
            <input
             @click="handleClickIPDIAAUSPPASTG(index, item.Value);"
             type="checkbox"
             :id="'IPDIAAUSPPASTGradio-' + index"
             v-model="item.Value"
            />
            <label
             :for="'IPDIAAUSPPASTGradio-' + index"
             @click="
              checkbox2RadioText(MASTERDATA['IPDIAAUSPPASTG'].Items, item);
             "
             >{{ __label(item) }}</label
            >
           </span>
          </div>
          <!-- <b
           v-if="MASTERDATA['IPDIAAUSPPASTG'].Items[1].Value"
           style="margin-left:20px"
           >{{ __t("women.Number-of-injection") }}</b
          > -->
          <span  v-if="MASTERDATA['IPDIAAUSPPASTG'].Items[1].Value"
           style="margin-left:20px">
            {{ __t("women.Number-of-injection") }}
          </span>
          <div
           style="flex-grow: 1"
           class="ml-10"
           v-if="MASTERDATA['IPDIAAUSPPASTG'].Items[1].Value"
          >
           <textarea-autosize
            class="form-control"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUSPPASTG'].Items[2].Value"
           />
          </div>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUSPPNEED4']">
        <th>{{ __t("InitialAssessment.label12") }}</th>
        <td>
         <div class="flex-box flex-center ">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPNEED4'].Items.filter(
            i => i.Code === 'IPDIAAUSPPNEED4ANS'
           )"
          >
           <div
            class="flex-box flex-center"
            :class="
             MASTERDATA['IPDIAAUSPPLR'].Items[1].Value ? 'disabel-table' : ''
            "
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUSPPNEED4cxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUSPPNEED4cxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
          <!---->
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPNEED4'].Items.filter(
            i => i.Code === 'IPDIAAUSPPNEED4NONE'
           )"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUSPPNEED4cxo-' + index + 1"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUSPPNEED4cxo-' + index + 1"></label>
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
         <div class="tbl-title">
          5. {{ __t("women.Initial-nursing-examination") }}
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUSPPSPN']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPSPN"]) }}</div>
        </th>
        <td>
         <div class="flex-box flex-center mb-10">
          <div>
           <b>{{ __t("women.Fetal-presentation") }}</b>
          </div>
          <div class="ml-10">
           <div class="group-radio">
            <span
             :data="item"
             :key="index"
             v-for="(item, index) in MASTERDATA['IPDIAAUSPPSPN'].Items"
            >
             <input
              type="checkbox"
              :id="'IPDIAAUSPPSPNradio-' + index"
              v-model="item.Value"
             />
             <label
              :for="'IPDIAAUSPPSPNradio-' + index"
              @click="
               checkbox2RadioText(MASTERDATA['IPDIAAUSPPSPN'].Items, item);
              "
              >{{ __label(item) }}</label
             >
            </span>
           </div>
          </div>
         </div>
         <div class="flex-box flex-center mb-10">
          <div>
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPCCTC'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b> <span class="note-text">(cm)</span>
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
          <!-- 2 -->
          <div class="ml-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPVB'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b> <span class="note-text">(cm)</span>
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
          <!-- 3 -->
          <div class="ml-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPTLT'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b> <span class="note-text">(kg)</span>
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
         </div>
        </td>
       </tr>
       <!-- theo dõi ctg -->
       <tr v-if="MASTERDATA['IPDIAAUSPPSPN']">
        <th width="1">
         <div class="w160">{{ __t("women.CTG") }}</div>
        </th>
        <td>
         <div class="flex-box flex-center mb-10">
          <div>
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPHR'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b>
             <span class="note-text">{{ __t("women.HR") }}</span>
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
          <!-- 2 -->
          <div class="ml-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPTSCC'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b>
             <!--
              <span  class="note-text"
               >(cm)</span
              >
             -->
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
         </div>
        </td>
       </tr>
       <!-- KHÁM -->
       <tr v-if="MASTERDATA['IPDIAAUSPPSPN']">
        <th width="1">
         <div class="w160">{{ __t("women.Vaginal-examination") }}</div>
        </th>
        <td>
         <div class="flex-box flex-center mb-10">
          <!-- độ xoá ctc -->
          <div>
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPDXCT'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b> <span class="note-text">(%)</span>
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
          <!-- 2 -->
          <div class="ml-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPDMCT'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b> <span class="note-text">(cm)</span>
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
          <!-- màng ối -->
          <div class="ml-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPMO'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b>
             <!--
              <span  class="note-text"
               >(cm)</span
              >
             -->
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
          <!-- nước ối -->
          <div class="ml-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPNOAF'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b>
             <!--
              <span  class="note-text"
               >(cm)</span
              >
             -->
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
         </div>
         <!-- thời gian ối vỡ -->
         <div class="flex-box flex-center mb-10">
          <!-- độ xoá ctc -->
          <div>
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPTOMR'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b>
             <!--
              <span  class="note-text"
               >(%)</span
              >
             -->
            </div>
            <v-date-picker
             :hideTooltip="true"
             class="w1510 display-inline"
             :format="'HH:mm DD/MM/YYYY'"
             v-model="item.Value"
            />
           </div>
          </div>
          <!-- 2 -->
          <div class="ml-10">
           <div
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPFHP'].Items"
           >
            <div class="mb-5">
             <b>{{ __label(item) }}</b>
            </div>
            <input
             class="form-control"
             v-model="item.Value"
             :placeholder="__t('Nhập')"
            />
           </div>
          </div>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUSPPNEED5']">
        <th>{{ __t("InitialAssessment.label12") }}</th>
        <td>
         <div class="flex-box flex-center ">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPNEED5'].Items.filter(
            i => i.Code === 'IPDIAAUSPPNEED5ANS'
           )"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUSPPNEED5cxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUSPPNEED5cxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
          <!---->
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPNEED5'].Items.filter(
            i => i.Code === 'IPDIAAUSPPNEED5NONE'
           )"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUSPPNEED5cxo-' + index + 1"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUSPPNEED5cxo-' + index + 1"></label>
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
         <div class="tbl-title">6. {{ __t("women.Special-requests") }}</div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUSPPSPRS']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUSPPSPRS"]) }}</div>
        </th>
        <td>
         <div style="width:100%" class="flex-box flex-center mb-10">
          <div style="width:23%">
           <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPSPRS'].Items.filter(
             i =>
              i.Code === 'IPDIAAUSPPSPRSCOCB' ||
              i.Code === 'IPDIAAUSPPSPRSICBB' ||
              i.Code === 'IPDIAAUSPPSPRSECBB' ||
              i.Code === 'IPDIAAUSPPSPRSOTR'
            )"
           >
            <div class="flex-box flex-center">
             <div class="v-checkbox">
              <input
              class="label-b"
               type="checkbox"
               :id="'IPDIAAUSPPSPRScxo-' + index"
               v-model="item.Value"
               @change="hanldeClickItemLeft(item.Code, item.Value);"
              />
              <label :for="'IPDIAAUSPPSPRScxo-' + index"></label>
             </div>
             <span
               :class="{
               'label-b': item.Code !== 'IPDIAAUSPPSPRSOTR',
              }"
              class="displaytbl"
              :style="
               item.Code === 'IPDIAAUSPPSPRSOTR' ? '' : 'font-weight:bold'
              "
              ><span>{{ __label(item) }}</span></span
             >
            </div>
           </div>
          </div>
          <div style="width:40%;">
           <div
            :style="
             MASTERDATA['IPDIAAUSPPSPRS'].Items[6].Value
              ? 'transform: translateY(-44px)'
              : 'transform: translateY(-60px)'
            "
           >
            <input
             v-if="MASTERDATA['IPDIAAUSPPSPRS'].Items[0].Value"
             class="form-control"
             :placeholder="__t('Nhập')"
             v-model="MASTERDATA['IPDIAAUSPPSPRSCOCBTE'].Items[0].Value"
            />
           </div>
           <div
            :style="
             !MASTERDATA['IPDIAAUSPPSPRS'].Items[0].Value
              ? 'transform: translateY(57px)'
              : 'transform: translateY(40px)'
            "
           >
            <input
             v-if="MASTERDATA['IPDIAAUSPPSPRS'].Items[6].Value"
             class="form-control"
             :placeholder="__t('Nhập')"
             v-model="MASTERDATA['IPDIAAUSPPSPRSTTH'].Items[0].Value"
            />
           </div>
          </div>
          <div style="width:23%;margin-top: -45px;margin-left: 50px;">
           <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSPPSPRS'].Items.filter(
             i =>
              i.Code === 'IPDIAAUSPPSPRSCOUC' ||
              i.Code === 'IPDIAAUSPPSPRLEL' ||
              i.Code === 'IPDIAAUSPPSPRSPNB'
            )"
           >
            <div class="flex-box flex-center">
             <div class="v-checkbox">
              <input
               type="checkbox"
               :id="'IPDIAAUSPPSPRScxo-' + index + 4"
               v-model="item.Value"
               @change="hanldeClickItemLeft(item.Code);"
              />
              <label :for="'IPDIAAUSPPSPRScxo-' + index + 4"></label>
             </div>
             <span class="displaytbl" style="font-weight:bold"
             :class="{
               'label-b': item.Code !== 'IPDIAAUSPPSPRSOTR',
              }"
              ><span>{{ __label(item) }}</span></span
             >
            </div>
           </div>
          </div>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUSPPNEED6']">
        <th>{{ __t("InitialAssessment.label12") }}</th>
        <td>
         <div class="flex-box flex-center ">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPNEED6'].Items.filter(i => i.Code ==='IPDIAAUSPPNEED6BSDT')"
          >
           <div class="flex-box flex-center" :class="
             MASTERDATA['IPDIAAUSPPSPRS'].Items[0].Value || MASTERDATA['IPDIAAUSPPSPRS'].Items[1].Value || MASTERDATA['IPDIAAUSPPSPRS'].Items[2].Value || MASTERDATA['IPDIAAUSPPSPRS'].Items[3].Value || MASTERDATA['IPDIAAUSPPSPRS'].Items[4].Value || MASTERDATA['IPDIAAUSPPSPRS'].Items[5].Value? 'disabel-table' : ''
            ">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUSPPNEED6cxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUSPPNEED6cxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSPPNEED6'].Items.filter(i => i.Code !=='IPDIAAUSPPNEED6BSDT')"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUSPPNEED6cxo-' + index + 2 "
              v-model="item.Value"
             />
             <label :for="'IPDIAAUSPPNEED6cxo-' + index + 2"></label>
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

      <br /><br /><br />
      <div class="row" v-if="DataSubmit.Version >= 9">
        <div class="col-md-6 col-sm-6 text-center"></div>
        <div class="col-md-6 col-sm-6 text-center">
          <Confirm
          class="mt-10"
          ref="Confirm"
          :MasterDataCode="'A02_069_080121_VE'"
          :FormCode="'A02_069_080121_VE'"
          :ReadOnly="readonly"
          :AdInfo="[DataSubmit.CreatedBy]"
          :VisitId="_VisitId"
          :FormId="DataSubmit.Id"
          @confirmSuccess="getData()"
          :saveSuccesss="saveSuccesss"
          @handleConfirm="submit('confirm')"
        />
    </div>
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
       <LastUpdateWithFormCode :FormCode="'A02_069_080121_VE'" :DataSubmit="DataSubmit"/>
      </div>
      <!-- <p>
       {{ __t("Chỉnh sửa lần cuối bởi") }}
       <AdInfo
        v-if="DataSubmit.UpdatedBy"
        :ad="DataSubmit.UpdatedBy.Username"
       />
       {{ __t("lúc") }} {{ DataSubmit.UpdatedAt | formatDateWithoutSecon }}
      </p> -->
     </div>
     <FloatBlock v-if="!readonly">
      <template slot="top" v-if="syncInfo">
       <div style="color: #fff; text-align: right">
        <b>Dữ liệu được đồng bộ từ khoa:</b> {{ __label(syncInfo.Specialty) }}
       </div>
      </template>
      <template slot="buttons">
       <div class="col-md-2 col-sm-2"><div class="form-group1"></div></div>
       <div class="col-md-4 col-sm-4">
        <div class="form-group1">
         <button
          class="btn pull-right btn-block"
          type="button"
          @click="
           $router.push({
            name: 'IPDFallRiskAssessment',
            params: { Id: $route.params.Id }
           });
          "
         >
          {{ __t("Đánh giá nguy cơ ngã") }}
         </button>
        </div>
       </div>
       <div class="col-md-6 col-sm-6" v-if="!readonly">
        <div class="form-group1">
         <button
          class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
          type="button"
          v-shortkey="['ctrl', 's']"
          @click="submit"
         >
          <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ __t("btn.luu") }}
         </button>
        </div>
       </div>
      </template>
     </FloatBlock>
    </template>
    <div v-else style="padding: 20px">
     <div class="text-center">
      <p>{{ __t("InitialAssessment.label-women") }} </p>
      <!-- v-if="!IsLocked" -->
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
import VDatePicker from '@/components/VDateTimePicker.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
// eslint-disable-next-line import/no-duplicates
import constants from '@/constants'
import V2Select from '@/components/VSelect.vue'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
import InitialAssessment from '@/services/IPD/InitialAssessment'
import CreateTable from '@/services/IPD/CreateTable'
import Logs from '@/components/Logs.vue'
import FormMixin from './Mixi.js'
import RemoveBtn from './Delete.vue'
import NProgress from 'nprogress'
import ViewOnly from '@/components/IPD/ForWomenInLabourView.vue'
import _ from 'lodash'
import EventBus from '@/lib/eventBus'
import TblWithMasterDataItem from '@/components/global/TblWithMasterDataItem.vue'
import Confirm from '@/components/Form/Confirm'
import EIOService from '@/services/IPD/EIOService'

// eslint-disable-next-line import/no-duplicates
// import utils from '@/constants'
export default {
  name: 'IPDInitialAssessmentForNewBorn',
  mixins: [MixinForm, MixinMasterData, FormMixin],
  data () {
    return {
      saveSuccesss: false,
      GENDERLIST: constants.GENDERLIST,
      totalPoint: 0,
      messageTotalPain: 'N/A',
      messageTotalPoin: 'N/A',
      totalPaint: 0,
      spo2: false,
      DataSubmit: {},
      mddata: {},
      listCreate: [],
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
      historyList: [{
        Code: '',
        Value: ''
      }],
      TableDelete: [],
      listForWomen: [],
      showButton: true,
      loaded: false,
      count: 0,
      IsLocked: false,
      menu: [{
        label: 'women.history',
        blockId: '#InitialAssessment-ForAdult-block1'
      },
      {
        label: 'women.Surgical-history',
        blockId: '#InitialAssessment-ForAdult-block2'
      },
      {
        label: 'women.Obstetrics-history',
        blockId: '#InitialAssessment-ForAdult-block3'
      },
      {
        label: 'women.Fetus-condition',
        blockId: '#InitialAssessment-ForAdult-block4'
      },
      {
        label: 'women.Initial-nursing-examination',
        blockId: '#InitialAssessment-ForAdult-block5'
      },
      {
        label: 'women.Special-requests',
        blockId: '#InitialAssessment-ForAdult-block6'
      }
      ],
      syncInfo: null,
      ParaUpdateAt: '',
      ParaUpdateBy: '',
      syncPara: false,
      syncListPara: [],
      isConfirm: false
    }
  },
  components: {
    V2Select,
    Logs,
    RemoveBtn,
    VDatePicker,
    CommunicableDiseasesScreening,
    ViewOnly,
    TblWithMasterDataItem,
    Confirm
  },
  watch: {
    DataSubmit (a, b) {}
  },
  mounted () {
    this.getMasterDatas({ Form: 'IPDIAAUSPP' }, () => {
      // EventBus.$emit('updateGlobalIpdTopbaInfo', this.menu)
      this.getData()
      // this.getTableData()
    })
  },
  computed: {
    readonly: function () {
      // return (
      //   this.DataSubmit.CreatedBy !== this.$store.state.account.Username ||
      //   this.DataSubmit.IsLocked === true
      // )
      return (this.DataSubmit.CreatedBy !== this.$store.state.account.Username) || this.DataSubmit.IsLocked || this.isConfirm
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
      return this.BLOODFROUABO.map((e) => e.label)
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
    onlyNumber (event) {
      let keyCode = event.keyCode ? event.keyCode : event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        event.preventDefault()
      }
    },
    getListConfirm (id) {
      new EIOService().find('ConfirmForms/GetList/' + id).then(res => {
        this.isConfirm = res.length > 0
      })
    },
    handleClickIPDIAAUSPPASTG () {
      this.MASTERDATA['IPDIAAUSPPASTG'].Items[2].Value = ''
    },
    hanldeClickItemLeft (code, value) {
      if (code === 'IPDIAAUSPPSPRSICBB' && value) {
        this.MASTERDATA['IPDIAAUSPPSPRS'].Items[2].Value = false
      }
      if (code === 'IPDIAAUSPPSPRSECBB' && value) {
        this.MASTERDATA['IPDIAAUSPPSPRS'].Items[1].Value = false
      }
      if (code === 'IPDIAAUSPPSPRSCOCB') {
        this.MASTERDATA['IPDIAAUSPPSPRSCOCBTE'].Items[0].Value = ''
      }
      if (code === 'IPDIAAUSPPSPRSOTR') {
        this.MASTERDATA['IPDIAAUSPPSPRSTTH'].Items[0].Value = ''
      }
      var count = 0
      for (let i = 0; i < this.MASTERDATA['IPDIAAUSPPSPRS'].Items.length - 1; i++) {
        if (this.MASTERDATA['IPDIAAUSPPSPRS'].Items[i].Value) {
          count++
        }
      }
      if (count > 0) {
        this.MASTERDATA['IPDIAAUSPPNEED6'].Items[0].Value = true
      } else {
        this.MASTERDATA['IPDIAAUSPPNEED6'].Items[0].Value = false
      }
    },
    handleClickIPDIAAUSPPCIP (value, code) {
      // this.MASTERDATA['IPDIAAUSPPCIP'].Items[3].Value = ''
      if (this.MASTERDATA['IPDIAAUSPPCIP'].Items[0].Value || this.MASTERDATA['IPDIAAUSPPCIP'].Items[1].Value) {
        this.MASTERDATA['IPDIAAUSPPNEED3'].Items[0].Value = true
      } else {
        this.MASTERDATA['IPDIAAUSPPNEED3'].Items[0].Value = false
      }
      if (code === 'IPDIAAUSPPCIPID') {
        this.MASTERDATA['IPDIAAUSPPCIPIDCH'].Items[0].Value = ''
        this.MASTERDATA['IPDIAAUSPPCIPIDCH'].Items[1].Value = ''
      }
    },
    handleCklickIPDIAAUSPPCIPOther () {
      this.MASTERDATA['IPDIAAUSPPCIP'].Items[3].Value = ''
    },
    handleClickIPDIAAUSPPLR (index, value) {
      this.MASTERDATA['IPDIAAUSPPLR'].Items[2].Value = ''
      if (index === 1) {
        if (!value) {
          this.MASTERDATA['IPDIAAUSPPNEED4'].Items[0].Value = true
        } else {
          this.MASTERDATA['IPDIAAUSPPNEED4'].Items[0].Value = false
        }
      } else {
        this.MASTERDATA['IPDIAAUSPPNEED4'].Items[0].Value = false
      }
    },
    handleClickIPDIAAUSPPDIA (index, value) {
      if (index === 0 && !value) {
        this.MASTERDATA['IPDIAAUSPPNEED1'].Items[0].Value = true
      } else if (index === 0 && value) {
        this.handleCheckClick()
      } else {
        this.handleClickFalse()
      }
      if (index === 0) {
        this.MASTERDATA['IPDIAAUSPPDIA'].Items[1].Value = ''
      }
    },
    handleClickIPDIAAUSPPTLM (index, value) {
      this.MASTERDATA['IPDIAAUSPPTLM'].Items[2].Value = ''
      if (index === 0 && !value) {
        this.MASTERDATA['IPDIAAUSPPNEED1'].Items[0].Value = true
      } else if (index === 0 && value) {
        this.handleCheckClick()
      } else {
        this.handleClickFalse()
      }
    },
    handleClickIPDIAAUSPPGBS (index, value) {
      this.MASTERDATA['IPDIAAUSPPGBS'].Items[2].Value = ''
      if (index === 0 && !value) {
        this.MASTERDATA['IPDIAAUSPPNEED1'].Items[0].Value = true
      } else if (index === 0 && value) {
        this.handleCheckClick()
      } else {
        this.handleClickFalse()
      }
      // if (index === 6) {
      //   this.handleClickFalse()
      // }
    },
    handleClickIPDIAAUSPPSUR (index) {
      if (index === 0) {
        this.MASTERDATA['IPDIAAUSPPSUR'].Items[1].Value = false
      } else {
        this.MASTERDATA['IPDIAAUSPPSUR'].Items[0].Value = false
      }
      if (index === 1 && !this.MASTERDATA['IPDIAAUSPPSUR'].Items[1].Value) {
        this.MASTERDATA['IPDIAAUSPPNEED2'].Items[0].Value = true
      } else {
        this.MASTERDATA['IPDIAAUSPPNEED2'].Items[0].Value = false
      }
    },
    handleClickIPDIAAUSPPPRE (index, value) {
      if (index === 0 && !value) {
        this.MASTERDATA['IPDIAAUSPPNEED1'].Items[0].Value = true
      } else if (index === 0 && value) {
        this.handleCheckClick()
      } else {
        this.handleClickFalse()
      }
      if (index === 0) {
        this.MASTERDATA['IPDIAAUSPPPRE'].Items[1].Value = ''
      }
    },
    handleClickIPDIAAUSPPHBS (index, value) {
      if (index === 0 && !value) {
        this.MASTERDATA['IPDIAAUSPPNEED1'].Items[0].Value = true
      } else if (index === 0 && value) {
        this.handleCheckClick()
      } else {
        this.handleClickFalse()
      }
    },
    handleClickIPDIAAUSPPOTHR (value) {
      this.MASTERDATA['IPDIAAUSPPOTHR'].Items[1].Value = ''
      if (value) {
        this.handleCheckClick()
      } else {
        this.handleClickFalse()
      }
      if (!value) {
        this.MASTERDATA['IPDIAAUSPPNEED1'].Items[0].Value = true
      } else {
        this.handleCheckClick()
        this.handleClickFalse()
      }
    },
    ChangeIPDIAAUSPPBLOOD (value, code) {
      // eslint-disable-next-line no-mixed-operators
      if (code === 'IPDIAAUSPPABO' && !value || code === 'IPDIAAUSPPABOCH' && !value) {
        this.MASTERDATA['IPDIAAUSPPNEED1'].Items[0].Value = true
      // eslint-disable-next-line no-mixed-operators
      } else if (code === 'IPDIAAUSPPABO' && value || code === 'IPDIAAUSPPABOCH' && value) {
        this.handleCheckClick()
      } else {
        this.handleClickFalse()
      }
    },
    handleClickFalse () {
      this.count = 0
      if (this.MASTERDATA['IPDIAAUSPPDIA'].Items[0].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSPPPRE'].Items[0].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSPPBLOOD'].Items[0].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSPPBLOOD'].Items[2].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSPPHBS'].Items[0].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSPPOTHR'].Items[0].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSPPTLM'].Items[0].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSPPGBS'].Items[0].Value) {
        this.count++
      }
      if (this.count === 0) {
        this.MASTERDATA['IPDIAAUSPPNEED1'].Items[0].Value = false
      }
    },
    handleCheckClick () {
      this.count = 0
      if (this.MASTERDATA['IPDIAAUSPPDIA'].Items[0].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSPPPRE'].Items[0].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSPPBLOOD'].Items[0].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSPPBLOOD'].Items[2].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSPPHBS'].Items[0].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSPPOTHR'].Items[0].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSPPTLM'].Items[0].Value) {
        this.count++
      }
      if (this.MASTERDATA['IPDIAAUSPPGBS'].Items[0].Value) {
        this.count++
      }
      if (this.count >= 2) {
        this.MASTERDATA['IPDIAAUSPPNEED1'].Items[0].Value = true
      } else {
        this.MASTERDATA['IPDIAAUSPPNEED1'].Items[0].Value = false
      }
    },
    addItem () {
      this.listForWomen.push({
        id: '123',
        Code: '',
        Value: ''
      })
    },
    add (item) {
      this.listForWomen.push({
        id: '123',
        Code: '',
        Value: ''
      })
    },
    remove (value, i) {
      if (value.id !== '123') {
        this.TableDelete.push(value.id)
      }
      this.listForWomen = this.listForWomen.filter((_, index) => index !== i)
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
            IPDIAAUSPPCIP: [
              'OPDIAFSTOPTEMANS',
              'IPDIAAUSPPCIPANS',
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
    CreateTable () {
      var tableCode = 'womenTable'
      var Table = []
      // var RowData = []
      for (let i = 0; i < this.listForWomen.length; i++) {
        if (this.listForWomen[i].id === '123') {
          const a = {
            RowData: [
              {
                Code: 'code',
                Value: this.listForWomen[i].Type
              },
              {
                Code: 'code',
                Value: this.listForWomen[i].Year
              }
            ]
          }
          Table.push(a)
        }
      }
      const params = {
        Table: Table
      }
      new CreateTable().update(tableCode + '/' + this.$route.params.Id, params).then(res => {
        console.log('res', res)
      }).catch(error => {
        console.log('err', error)
      })
    },
    DeleteTable () {
      var tableCode = 'womenTable'
      const params = {
        TableDelete: this.TableDelete
      }
      new CreateTable().update(tableCode + '/' + this.$route.params.Id, params).then(res => {
        console.log('res', res)
      }).catch(error => {
        console.log('err', error)
      })
    },
    submit (confirm) {
      // this.validateForm()
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
      var formCode = 'A02_069_080121_VE'

      this.DataSubmit = {
        ...this.DataSubmit
        // TableDelete: this.TableDelete,
        // Table: Table1
      }
      if (this.listForWomen.length > 0) {
        this.CreateTable()
      }
      if (this.TableDelete.length > 0) {
        this.DeleteTable()
      }
      new InitialAssessment()
        .update('ForAdult/' + formCode + '/' + this.$route.params.Id, this.DataSubmit)
        .then((response) => {
          if (confirm === 'confirm') {
            console.log('vao')
            this.saveSuccesss = !this.saveSuccesss
            this.toastedSuccess()
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
    getTableData () {
      var tableCode = 'womenTable'
      new CreateTable().find(tableCode + '/' + this.$route.params.Id).then(res => {
        this.historyList = res.Datas
        for (let i = 0; i < res.Datas.length; i++) {
          // eslint-disable-next-line no-unused-expressions
          const a = {
            Type: this.historyList[i].RowData[0].Value,
            Year: this.historyList[i].RowData[1].Value,
            id: this.historyList[i].IdRow
          }
          this.listForWomen.push(a)
        }
      }).catch(error => {
        console.log('err', error)
      })
    },
    getData () {
      var formCode = 'A02_069_080121_VE'
      new InitialAssessment()
        .find('ForAdult/' + formCode + '/' + this.$route.params.Id + '?hidemsg=' + true)
        .then((response) => {
          this.$store.dispatch('setCurrentFormId', response.Id)
          this.getTableData()
          this.DataSubmit = response
          this.getListConfirm(response.Id)
          if (response.DataPara !== null) {
            this.DataPara = response.DataPara.Datas
            this.ParaUpdateAt = response.DataPara.UpdateAt
            this.ParaUpdateBy = response.DataPara.UpdateBy
            this.DataPara.map(item => {
              if (item.Value) {
                this.syncPara = true
                this.syncListPara.push(item.Value)
              }
            })
            this.syncListPara = this.syncListPara.toString()
          }
          this.mapData()
          if (response.IsNew) {
            this.syncLastIpdData()
          }
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
      var formCode = 'A02_069_080121_VE'
      new InitialAssessment()
        .update(this.$route.params.Id, {}, 'ForAdult/Create/' + formCode + '/')
        .then((response) => {
          this.reload()
        })
        .catch((e) => {
          // this.back()
        })
    },
    copy () {
      if (this.MASTERDATA['IPDIAAUSPPPARA'].Items) {
        this.MASTERDATA['IPDIAAUSPPPARA'].Items[0].Value = this.DataPara[0].Value
        this.MASTERDATA['IPDIAAUSPPPARA'].Items[1].Value = this.DataPara[1].Value
        this.MASTERDATA['IPDIAAUSPPPARA'].Items[2].Value = this.DataPara[2].Value
        this.MASTERDATA['IPDIAAUSPPPARA'].Items[3].Value = this.DataPara[3].Value
      }
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: 'Thông báo',
        text: 'Tạo mới đánh giá ban đầu sản phụ chuyển dạ *?',
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
<style scoped>
 .table .table {
    background-color: #fff;
    width: 70%;
    transform: translateX(120px);
 }
  .mx-calendar-time {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display:none;
  }
</style>
