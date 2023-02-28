<template>
 <div class="box-body no-padding" v-if="DataSubmit">
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
     <div class="flex-box">
      <div>
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUSPPDIA']"
        :data="MASTERDATA['IPDIAAUSPPDIA'].Items"
       />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUSPPDIA'].Items[0].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUSPPDIA'].Items[1].Value" />
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
     <div class="flex-box">
      <div>
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUSPPPRE']"
        :data="MASTERDATA['IPDIAAUSPPPRE'].Items"
       />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUSPPPRE'].Items[0].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUSPPPRE'].Items[1].Value" />
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
     <div class="flex-box">
      <div
       style="margin-top:5px"
       v-if="MASTERDATA['IPDIAAUSPPBLOODABO'].Items[0].Value"
      >
       <b class="no-wrap mgl-5 mgr-5 mt-5">{{
        __t("InitialAssessment.Abo")
       }}</b>
      </div>
      <div v-if="MASTERDATA['IPDIAAUSPPBLOODABO'].Items[0].Value">
       <FakeInput v-model="MASTERDATA['IPDIAAUSPPBLOODABO'].Items[0].Value" />
      </div>
      <div>
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUSPPBLOOD']"
        :data="MASTERDATA['IPDIAAUSPPBLOOD'].Items"
       />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUSPPBLOOD'].Items[0].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUSPPBLOOD'].Items[4].Value" />
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
     <div class="flex-box">
      <div>
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUSPPTLM']"
        :data="MASTERDATA['IPDIAAUSPPTLM'].Items"
       />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUSPPTLM'].Items[0].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUSPPTLM'].Items[2].Value" />
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
      <div>
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUSPPGBS']"
        :data="MASTERDATA['IPDIAAUSPPGBS'].Items"
       />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUSPPGBS'].Items[0].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUSPPGBS'].Items[2].Value" />
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
      <div>
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUSPPHBS']"
        :data="MASTERDATA['IPDIAAUSPPHBS'].Items"
       />
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
     <div class="flex-box flex-center">
      <div>
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUSPPOTHR']"
        :data="MASTERDATA['IPDIAAUSPPOTHR'].Items"
       />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUSPPOTHR'].Items[0].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUSPPOTHR'].Items[1].Value" />
      </div>
     </div>
    </td>
   </tr>
   <!-- hướng xử lý hỗ trợ -->
   <tr v-if="MASTERDATA['IPDIAAUSPPNEED1']">
    <th>{{ __t("InitialAssessment.label12") }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUSPPNEED1'].Items" /></td>
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
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUSPPSUR']"
      :data="MASTERDATA['IPDIAAUSPPSUR'].Items"
      class="mb-10"
     />
     <!-- bảng -->
     <table
      class="table observation-table no-margin tbl-b2 mt-10"
      v-if="MASTERDATA['IPDIAAUSPPSUR'].Items[1].Value"
     >
      <thead>
       <tr>
        <th class="text-center">{{ __t("women.stt") }}</th>
        <th class="text-center">{{ __t("women.type-of") }}</th>
        <th class="text-center no-wrap" style="width:100px">
         {{ __t("women.year") }}
        </th>
       </tr>
      </thead>
      <template v-if="listForWomen && listForWomen.length">
       <tbody>
        <tr :key="index" v-for="(item, index) in listForWomen">
         <template>
          <!--
           <TblWithMasterDataItem :readonly="readonly" :key="index" :MASTERDATA="mddata" v-model="item.Datas" v-if="!item.IsDeleted" @onDelete="onDelete(index)"/>
          -->
          <td style="position: relative; width:30px">
           <!--
            <button class="btn-pos-left" @click="remove(item, index);">
             <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
           -->
           <p style="text-align: center;">{{ index + 1 }}</p>
          </td>
          <td style="position: relative"><FakeInput v-model="item.Type" /></td>
          <td><FakeInput v-model="item.Year" /></td>
         </template>
        </tr>
        <tr>
         <!--
          <td colspan="4" class="text-center">
           <button @click="add(item);" class="btn btn-info">
            <i class="fa fa-plus" aria-hidden="true"></i> {{ __t("Thêm ") }}
           </button>
          </td>
         -->
        </tr>
       </tbody>
      </template>
     </table>
    </td>
   </tr>
   <!-- hướng xử trí hỗ trợ tiền sử phẫu thuật -->
   <tr v-if="MASTERDATA['IPDIAAUSPPNEED2']">
    <th>{{ __t("InitialAssessment.label12") }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUSPPNEED2'].Items" /></td>
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
     <div class="flex-box flex-center">
      <div class="w150 display-inline mr-10">
       <div
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUSPPPARA'].Items"
       >
        <div class="mb-5">
         <!-- <b>{{ __label(item) }}</b> -->
         <span v-if="item.Note" class="note-text">({{ __t(item.Note) }})</span>
        </div>
        <div class="flex-box flex-center" style="width:400px">
         <div>
          <!--
           <input
            class="form-control"
            v-model="item.Value"
            :placeholder="__t('Nhập')"
           />
          -->
          <FakeInput v-model="item.Value" />
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
      <div style="width:25%">
       <div class="mb-20">
        <b class="no-wrap mgl-5 mgr-5">{{ __t("women.numof-1") }}</b>
       </div>
       <div>
        <b class="no-wrap mgl-5 mgr-5">{{ __t("women.numof-2") }}</b>
       </div>
      </div>
      <div style="width:20%">
       <div class="mb-20">
        <FakeInput v-model="MASTERDATA['IPDIAAUSPPIES'].Items[0].Value" />
       </div>
       <div>
        <FakeInput v-model="MASTERDATA['IPDIAAUSPPIES'].Items[2].Value" />
       </div>
      </div>
      <div style="width:12%" class="ml-20">
       <div class="mb-20">
        <b class="no-wrap mgl-5 mgr-5">{{ __t("women.numof-year") }}</b>
       </div>
       <div>
        <b class="no-wrap mgl-5 mgr-5">{{ __t("women.numof-year") }}</b>
       </div>
      </div>
      <div style="width:20%">
       <div class="mb-20">
        <FakeInput v-model="MASTERDATA['IPDIAAUSPPIES'].Items[1].Value" />
       </div>
       <div>
        <FakeInput v-model="MASTERDATA['IPDIAAUSPPIES'].Items[3].Value" />
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
      <div><CheckboxsValue :data="MASTERDATA['IPDIAAUSPPCIP'].Items.filter(i => i.Code ==='IPDIAAUSPPCIPPH' || i.Code ==='IPDIAAUSPPCIPID')" /></div>
      <div>
       <MDRadioView
        v-if="
         MASTERDATA['IPDIAAUSPPCIPIDCH'] &&
          MASTERDATA['IPDIAAUSPPCIP'].Items[1].Value
        "
        :data="MASTERDATA['IPDIAAUSPPCIPIDCH'].Items"
       />
      </div>
      <div><CheckboxsValue :data="MASTERDATA['IPDIAAUSPPCIP'].Items.filter(i => i.Code ==='IPDIAAUSPPCIPOT')" /></div>
      <div v-if="MASTERDATA['IPDIAAUSPPCIP'].Items[2].Value">
       <FakeInput v-model="MASTERDATA['IPDIAAUSPPCIP'].Items[3].Value" />
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUSPPNEED3']">
    <th>{{ __t("InitialAssessment.label12") }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUSPPNEED3'].Items" /></td>
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
         <span v-if="item.Note" class="note-text">({{ __t(item.Note) }})</span>
        </div>
        <div class="flex-box flex-center">
         <div><FakeInput v-model="item.Value" /></div>
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
      <FakeInput v-model="MASTERDATA['IPDIAAUSPPLUD'].Items[0].Value" />
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
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUSPPLR']"
        :data="MASTERDATA['IPDIAAUSPPLR'].Items"
       />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUSPPLR'].Items[1].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUSPPLR'].Items[2].Value" />
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
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUSPPASTG']"
        :data="MASTERDATA['IPDIAAUSPPASTG'].Items"
       />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUSPPASTG'].Items[1].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUSPPASTG'].Items[2].Value" />
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUSPPNEED4']">
    <th>{{ __t("InitialAssessment.label12") }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUSPPNEED4'].Items" /></td>
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
        <MDRadioView
         v-if="MASTERDATA['IPDIAAUSPPSPN']"
         :data="MASTERDATA['IPDIAAUSPPSPN'].Items"
        />
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
        <FakeInput v-model="item.Value" />
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
        <FakeInput v-model="item.Value" />
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
        <FakeInput v-model="item.Value" />
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
        <FakeInput v-model="item.Value" />
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
        <FakeInput v-model="item.Value" />
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
        <FakeInput v-model="item.Value" />
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
        <FakeInput v-model="item.Value" />
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
        <FakeInput v-model="item.Value" />
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
        <FakeInput v-model="item.Value" />
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
        <!--
         <v-date-picker
          :hideTooltip="true"
          class="w1510 display-inline"
          :format="'HH:mm DD/MM/YYYY'"
          v-model="item.Value"
         />
        -->
        <FakeInput v-model="item.Value" />
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
        <FakeInput v-model="item.Value" />
       </div>
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUSPPNEED5']">
    <th>{{ __t("InitialAssessment.label12") }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUSPPNEED5'].Items" /></td>
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
     <div>
      <CheckboxsValue
       :data="
        MASTERDATA['IPDIAAUSPPSPRS'].Items.filter(
         i => i.Code !== 'IPDIAAUSPPSPRSCOCB' && i.Code !== 'IPDIAAUSPPSPRSOTR'
        )
       "
      />
     </div>
     <div class="flex-box mt-10 mb-10">
      <div>
       <CheckboxsValue
        :data="
         MASTERDATA['IPDIAAUSPPSPRS'].Items.filter(
          i => i.Code === 'IPDIAAUSPPSPRSCOCB'
         )
        "
       />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUSPPSPRS'].Items[0].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUSPPSPRSCOCBTE'].Items[0].Value" />
      </div>
     </div>
     <div class="flex-box">
      <div>
       <CheckboxsValue
        :data="
         MASTERDATA['IPDIAAUSPPSPRS'].Items.filter(
          i => i.Code === 'IPDIAAUSPPSPRSOTR'
         )
        "
       />
      </div>
      <div
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUSPPSPRS'].Items[6].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUSPPSPRSTTH'].Items[0].Value" />
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUSPPNEED6']">
    <th>{{ __t("InitialAssessment.label12") }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUSPPNEED6'].Items" /></td>
   </tr>
  </table>

  <br /><br /><br />
  <div class="row" v-if="DataSubmit.Version >= 9">
    <div class="col-md-6 col-sm-6 text-center"></div>
    <Confirm
    class="mt-10"
    ref="Confirm"
    :MasterDataCode="'A02_069_080121_VE'"
    :FormCode="'A02_069_080121_VE'"
    :ReadOnly="true"
    :AdInfo="[DataSubmit.CreatedBy]"
    :VisitId="_VisitId"
    :FormId="DataSubmit.Id"
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
  <br />
  <br />
  <div>
    <LastUpdateWithFormCode :FormCode="'A02_069_080121_VE'" :DataSubmit="DataSubmit"/>
  </div>
  <!--
   <p>
    {{ __t("Chỉnh sửa lần cuối bởi") }}
    <AdInfo v-if="DataSubmit.UpdatedBy" :ad="DataSubmit.UpdatedBy.Username" />
    {{ __t("lúc") }} {{ DataSubmit.UpdatedAt }}
   </p>
  -->
 </div>
</template>
<script>
import VDatePicker from '@/components/VDateTimePicker.vue'
import V2Select from '@/components/VSelectDisplay.vue'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
import constants from '@/constants'
import CreateTable from '@/services/IPD/CreateTable'
import Confirm from '@/components/Form/Confirm.vue'
export default {
  name: 'InitialAssessmentForPregnantWomen',
  props: ['MASTERDATA', 'DataSubmit'],
  data () {
    return {
      hasData: false,
      totalPoint: 0,
      totalPaint: 0,
      listForWomen: []
    }
  },
  components: {
    V2Select, VDatePicker, CommunicableDiseasesScreening, Confirm
  },
  watch: {
  },
  mounted () {
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
  computed: {
    IPDIAAURELIDATA: function () {
      return constants.IPDIAAURELIDATA
    }
  },
  methods: {
    select2Suggest (data) {
      var list = data
      if (list) {
        return list.map(e => {
          e.id = e.value
          e.name = e.vilabel
          e.label = e.vilabel
          return e
        })
      } else {
        return []
      }
    }
  }
}
</script>
