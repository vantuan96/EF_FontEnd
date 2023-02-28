<template>
 <div class="box-body no-padding" v-if="DataSubmit">
  <div class="tbl-title" v-if="!checkTab">1. {{ __t("Thông tin hành chính") }}</div>
  <div class="tbl-title" v-else>1. {{__t('InitialAssessment.label2')}}</div>
  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block1"
  >
   <tr v-if="MASTERDATA['IPDIAAUADFR']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUADFR"]) }}</div>
    </th>
    <td>
     <div class="flex-box">
      <div>
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUADFR']"
        :data="MASTERDATA['IPDIAAUADFR'].Items"
       />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUADFR'].Items[2].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUADFR'].Items[3].Value" />
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUARTI']">
    <th>{{ __label(MASTERDATA["IPDIAAUARTI"]) }}</th>
    <td>
     <div class="flex-box flex-center">
      <FakeInput v-model="MASTERDATA['IPDIAAUARTI'].Items[0].Value" />
      <b class="no-wrap mgl-5 mgr-5">{{
       __label(MASTERDATA["IPDIAAUACBY"])
      }}</b>
      <FakeInput
       style="flex-grow: 1;"
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
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUINRF']"
        :data="MASTERDATA['IPDIAAUINRF'].Items"
       />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUINRF'].Items[1].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUINRF'].Items[2].Value" />
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUPTCI']">
    <th>{{ __label(MASTERDATA["IPDIAAUPTCI"]) }}</th>
    <td><FakeInput v-model="MASTERDATA['IPDIAAUPTCI'].Items[0].Value" /></td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUPHON']">
    <th>{{ __label(MASTERDATA["IPDIAAUPHON"]) }}</th>
    <td>
     <div class="flex-box flex-center">
      <div>
       <FakeInput v-model="MASTERDATA['IPDIAAUPHON'].Items[0].Value" />
      </div>
      <b class="no-wrap mgl-5 mgr-5">{{
       __label(MASTERDATA["IPDIAAULANG"])
      }}</b>
      <div class="v-select">
       <FakeInput v-model="MASTERDATA['IPDIAAULANG'].Items[0].Value" />
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
   <tr v-if="MASTERDATA['IPDIAAUPULS']">
    <th width="1">
     <div class="w160">
      <div class="mb-5 no-wrap">{{ __t("Dấu hiệu sinh tồn") }}</div>
     </div>
    </th>
    <td>
     <div class="mb-5">
      <div class="w150 display-inline mr-10">
       <div
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUPULS'].Items.filter(
         i => i.Clinic === ''
        )"
       >
        <div class="mb-5">
         <b>{{ __label(item) }}</b>
         <span class="note-text">({{ __t("Lần/phút") }})</span>
        </div>
        <FakeInput v-model="item.Value" />
       </div>
      </div>
      <div class="w150 display-inline mr-10">
       <div
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUBLPR'].Items.filter(
         i => i.Clinic === ''
        )"
       >
        <div class="mb-5">
         <b>{{ __label(item) }}</b>
         <span v-if="item.Note" class="note-text">({{ __t("mmHg") }})</span>
        </div>
        <FakeInput v-model="item.Value" />
       </div>
      </div>
      <div class="w150 display-inline mr-10" >
       <div
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUSPO2'].Items"
       >
        <div class="mb-5">
         <b>{{ __label(item) }}</b>
         <span class="note-text">({{ __t("%") }})</span>
        </div>
        <FakeInput v-model="item.Value" />
       </div>
      </div>
     </div>
     <div v-if="MASTERDATA['IPDIAAUHEIG']" class="mt-5">
      <div class="w150 display-inline mr-10">
       <div
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUHEIG'].Items.filter(
         i => i.Clinic === ''
        )"
       >
        <div class="mb-5">
         <b>{{ __label(item) }}</b>
         <span v-if="item.Note" class="note-text">({{ item.Note }})</span>
        </div>
        <FakeInput v-model="item.Value" />
       </div>
      </div>
      <div class="w150 display-inline mr-10">
       <div
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUWEIG'].Items.filter(
         i => i.Clinic === ''
        )"
       >
        <div class="mb-5">
         <b>{{ __label(item) }}</b>
         <span v-if="item.Note" class="note-text">({{ item.Note }})</span>
        </div>
        <FakeInput v-model="item.Value" />
       </div>
      </div>
      <div class="w150 display-inline mr-10">
       <div class="mb-5"><b>BMI</b></div>
       <input
        type="number"
        class="v-input-md2 form-control"
        readonly
        :value="bmiCalculation"
       />
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUBOBU'] && !checkTab">
    <th>{{ __label(MASTERDATA["IPDIAAUBOBU"]) }}</th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUBOBU']"
      :data="MASTERDATA['IPDIAAUBOBU'].Items"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUHYGI']">
    <th>{{ __label(MASTERDATA["IPDIAAUHYGI"]) }}</th>
    <!-- <td>
    <div class="flex-box">
      <div>
        <CheckboxsValue :DataType="'Checkbox'" :data="MASTERDATA['IPDIAAUHYGI'].Items" />
      </div>
      <div>
      <FakeInput
      v-if="MASTERDATA['IPDIAAUHYGI'].Items[2].Value"
      v-model="MASTERDATA['IPDIAAUHYGI'].Items[3].Value"
     />
      </div>
     </div>
    </td> -->
    <td>
     <div class="flex-box">
      <div>
        <CheckboxsValue
       :DataType="'Radio'"
       :data="[MASTERDATA['IPDIAAUHYGI'].Items]"
      />
      </div>
      <div>
       <MDRadioView
        :DataType="'Radio'"
        v-if="MASTERDATA['IPDIAAUHYGI']"
        :data="MASTERDATA['IPDIAAUHYGI'].Items"
       />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUHYGI'].Items[2].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUHYGI'].Items[3].Value" />
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAURERA']">
    <th>{{ __label(MASTERDATA["IPDIAAURERA"]) }}<span style="margin-left:2px" class="note-text"
        >{{__t('InitialAssessment.label3')}}</span>
    </th>
    <td>
    <div class="flex-box">
      <div>
        <FakeInput
        style="flex-flow: row wrap;"
        class="w100 mgr-5"
        v-model="MASTERDATA['IPDIAAURERA'].Items[0].Value"/>
      </div>
      <div>
        <CheckboxsValue :data="MASTERDATA['IPDIAAURERA'].Items" />
      </div>
      <div>
        <FakeInput
      v-if="MASTERDATA['IPDIAAURERA'].Items[2].Value"
      v-model="MASTERDATA['IPDIAAURERA'].Items[3].Value"
     />
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUTEMP']">
    <th>{{ __label(MASTERDATA["IPDIAAUTEMP"]) }}<span style="margin-left:2px" class="note-text"
    >(°C)</span
    ></th>
    <td>
      <div class="flex-box">
        <div>
        <FakeInput
        class="w100 mgr-5"
        style="flex-flow: row wrap;"
        v-model="MASTERDATA['IPDIAAUTEMP'].Items[0].Value"
      />
        </div>
          <div>
            <CheckboxsValue :data="MASTERDATA['IPDIAAUTEMP'].Items" />
        </div>
      <div>
      <FakeInput
      v-if="MASTERDATA['IPDIAAUTEMP'].Items[2].Value"
      v-model="MASTERDATA['IPDIAAUTEMP'].Items[3].Value"
      />
        </div>
      </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUTEET']">
    <th>{{ __label(MASTERDATA["IPDIAAUTEET"]) }}</th>
    <td>
     <div class="flex-box flex-center">
      <CheckboxsValue :data="MASTERDATA['IPDIAAUTEET'].Items" />
      <FakeInput
      v-if="MASTERDATA['IPDIAAUTEET'].Items[3].Value"
      v-model="MASTERDATA['IPDIAAUTEET'].Items[4].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUEDEM']">
    <th>{{ __label(MASTERDATA["IPDIAAUEDEM"]) }}</th>
    <td>
     <div class="flex-box">
      <div>
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUEDEM']"
        :data="MASTERDATA['IPDIAAUEDEM'].Items"
       />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUEDEM'].Items[1].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUEDEM'].Items[2].Value" />
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUALLE']" class="borded-bottom highlighted-radio">
    <th>{{ __label(MASTERDATA["IPDIAAUALLE"]) }}</th>
    <!--
     <td>
       <div class="flex-box">
         <div>
           <div class="flex-box flex-center">
             <MDRadioView v-if="MASTERDATA['IPDIAAUALLE']" :data="MASTERDATA['IPDIAAUALLE'].Items"/>
             <allergies-select :view="true" v-model="MASTERDATA['IPDIAAUALLE'].Items[2].Value" :items="JSON.parse(MASTERDATA['IPDIAAUALLE'].Items[2].Data)"/>
           </div>
         </div>
         <div style="flex-grow: 1;" class="ml-10" v-if="MASTERDATA['IPDIAAUALLE'].Items[1].Value">
           <FakeInput v-model="MASTERDATA['IPDIAAUALLE'].Items[3].Value" />
         </div>
       </div>
     </td>
    -->
    <td>
     <MDRadioView :data="MASTERDATA['IPDIAAUALLE'].Items" />
     <span
      :data="item"
      :key="index"
      v-for="(item, index) in MASTERDATA['IPDIAAUALLE'].Items"
     >
      <template v-if="item.DataType === 'Radio' && item.Value"></template>
      <template
       v-else-if="
        item.DataType === 'Select' &&
         item.Value &&
         MASTERDATA['IPDIAAUALLE'].Items[1].Value
       "
      >
      <b>{{__label(item)}}: </b>
       <allergies-select
        :view="true"
        v-model="item.Value"
        :items="JSON.parse(item.Data)"
        class="mrr30"
       />
      </template>
      <template
       v-else-if="item.Value && MASTERDATA['IPDIAAUALLE'].Items[1].Value"
       ><b>{{__label(item)}}: </b> {{ item.Value }}</template
      >
     </span>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUMENS'] && DataSubmit && DataSubmit.Gender !== 1 && !checkTab">
    <th>
     <i>{{ __t("*Áp dụng cho người bệnh là nữ") }}</i>
    </th>
    <td>
     <div class="flex-box flex-center mb10">
      <div>
       <label class="w150 display-inline mr-10"
        >{{ __label(MASTERDATA["IPDIAAUMENS"]) }}:</label
       >
      </div>
      <div class="">
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUMENS']"
        :data="MASTERDATA['IPDIAAUMENS'].Items"
       />
      </div>
     </div>
     <div class="flex-box flex-center mb10">
      <div>
       <label class="w150 display-inline mr-10"
        >{{ __label(MASTERDATA["IPDIAAUPREG"]) }}:</label
       >
      </div>
      <div class="">
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUPREG']"
        :data="MASTERDATA['IPDIAAUPREG'].Items"
       />
      </div>
     </div>
     <div class="flex-box flex-center mb10">
      <div>
       <label class="w150 display-inline mr-10"
        >{{ __label(MASTERDATA["IPDIAAUBRFE"]) }}:</label
       >
      </div>
      <div class="">
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUBRFE']"
        :data="MASTERDATA['IPDIAAUBRFE'].Items"
       />
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUITV1']">
    <th v-if="!checkTab">{{ __label(MASTERDATA["IPDIAAUITV1"]) }}</th>
    <th v-else>{{__t('InitialAssessment.label5')}}</th>
    <td>
      <template v-if="MASTERDATA['IPDIAAUITV1'].Items[1].Value"><CheckboxValue v-model="MASTERDATA['IPDIAAUITV1'].Items[1].Value" /> {{__label(MASTERDATA['IPDIAAUITV1'].Items[1])}}</template>
    </td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block3"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div v-if="!checkTab" class="tbl-title">
      3. {{ __t("Đánh giá đau và nguy cơ ngã theo thang điểm Morse") }}
     </div>
     <div v-else class="tbl-title">
      3. {{__t('InitialAssessment.label7')}}
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUPAIN']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUPAIN"]) }}</div>
    </th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUPAIN']"
      :data="MASTERDATA['IPDIAAUPAIN'].Items"
     />
    </td>
   </tr>
   <!-- <tr
    v-if="MASTERDATA['IPDIAAUPASC'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value && !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value"
   > -->
   <tr
    v-if="MASTERDATA['IPDIAAUPASC'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value"
   >
    <th>{{ __label(MASTERDATA["IPDIAAUPASC"]) }}</th>
    <td>
     <div class="flex-box flex-center">
      <FakeInput v-model="MASTERDATA['IPDIAAUPASC'].Items[0].Value" />
      <FakeInput v-model="MASTERDATA['IPDIAAUPASC'].Items[1].Value" /><span
       class="ml-5"
       >/ 10</span
      >
     </div>
     <CheckboxsValue :data="MASTERDATA['IPDIAAUPIFCA'].Items" />
    </td>
   </tr>
   <tr
    v-if="MASTERDATA['IPDIAAUPASD'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value && !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value"
   >
    <th width="">{{ __label(MASTERDATA["IPDIAAUPASD"]) }}</th>
    <td>
     <div class="flex-box flex-center">
      <FakeInput v-model="MASTERDATA['IPDIAAUPASD'].Items[0].Value" />
      <span class="w250 mgl-5 mgr-5 text-right">{{
       __label(MASTERDATA["IPDIAAUPADU"])
      }}</span>
      <FakeInput v-model="MASTERDATA['IPDIAAUPADU'].Items[0].Value" />
     </div>
    </td>
   </tr>
   <tr
    v-if="MASTERDATA['IPDIAAUPALO'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value && !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value"
   >
    <th>{{ __label(MASTERDATA["IPDIAAUPALO"]) }}</th>
    <td>
     <div class="flex-box flex-center">
      <FakeInput v-model="MASTERDATA['IPDIAAUPALO'].Items[0].Value" />
     </div>
    </td>
   </tr>
   <tr
    v-if="MASTERDATA['IPDIAAUPAFR'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value && !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value"
   >
    <th>{{ __label(MASTERDATA["IPDIAAUPAFR"]) }}</th>
    <td>
     <div class="flex-box f2lex-center">
      <MDRadioView
      v-if="MASTERDATA['IPDIAAUPAFR']"
      :data="MASTERDATA['IPDIAAUPAFR'].Items"
      />
      <template v-if="MASTERDATA['IPDIAAUPAFR'].Items[3].Value">
       <FakeInput
        style="flex-grow: 1;"
        v-model="MASTERDATA['IPDIAAUPAFR'].Items[4].Value"
       />
      </template>
     </div>
    </td>
   </tr>
   <tr
    v-if="MASTERDATA['IPDIAAUPACH'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value && !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value"
   >
    <th>{{ __label(MASTERDATA["IPDIAAUPACH"]) }}</th>
    <td><FakeInput v-model="MASTERDATA['IPDIAAUPACH'].Items[0].Value" /></td>
   </tr>
   <tr
    v-if="MASTERDATA['IPDIAAUWMPW'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value && !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value"
   >
    <th>{{ __label(MASTERDATA["IPDIAAUWMPW"]) }}</th>
    <td><FakeInput v-model="MASTERDATA['IPDIAAUWMPW'].Items[0].Value" /></td>
   </tr>
   <tr
    v-if="MASTERDATA['IPDIAAUWMPB'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value && !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value"
   >
    <th>{{ __label(MASTERDATA["IPDIAAUWMPB"]) }}</th>
    <td><FakeInput v-model="MASTERDATA['IPDIAAUWMPB'].Items[0].Value" /></td>
   </tr>
   <!-- <tr
    v-if="MASTERDATA['IPDIAAUFRAK'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value && !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value"
   >
    <th>{{ __label(MASTERDATA["IPDIAAUFRAK"]) }}</th>
    <td>
     <span v-if="MASTERDATA['IPDIAAUFRAK'].Items[0]">{{
      __label(MASTERDATA["IPDIAAUFRAK"].Items[0])
     }}</span>
    </td>
   </tr> -->
   <tr
    v-if="MASTERDATA['IPDIAAUITV2'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value || !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value"
   >
    <th>{{ __label(MASTERDATA["IPDIAAUITV2"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUITV2'].Items" /></td>
   </tr>
   <tr
    v-if="MASTERDATA['IPDIAAUFRAK'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value && !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value"
   >
    <th>{{ __label(MASTERDATA["IPDIAAUFRAK"]) }}</th>
    <td v-if="DataSubmit.Version < 11">
     <span v-if="MASTERDATA['IPDIAAUFRAK'].Items[0]">{{
      __label(MASTERDATA["IPDIAAUFRAK"].Items[0])
     }}</span>
    </td>
    <td v-else>
      <button
        class="btn btn-sync-data"
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
    </td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   v-if="!checkTab"
   id="InitialAssessment-ForAdult-block4"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title">4. {{ __label(MASTERDATA["IPDIAAUREAS"]) }}</div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUREAS']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUREAS"]) }}</div>
    </th>
    <td>
     <div class="flex-box">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUREAS']"
       :data="MASTERDATA['IPDIAAUREAS'].Items"
      />
      <FakeInput
       v-if="MASTERDATA['IPDIAAUREAS'].Items[5].Value"
       v-model="MASTERDATA['IPDIAAUREAS'].Items[6].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUSANA']">
    <th>{{ __label(MASTERDATA["IPDIAAUSANA"]) }}</th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUSANA']"
      :data="MASTERDATA['IPDIAAUSANA'].Items"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUITV3']">
    <th>{{ __label(MASTERDATA["IPDIAAUITV3"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUITV3'].Items" /></td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block5"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title" v-if="!checkTab">
      5. {{ __t("Đánh giá về da, niêm mạc") }}
     </div>
     <div class="tbl-title" v-else>
      4. {{ __t("Đánh giá về da, niêm mạc") }}
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUCOLO']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUCOLO"]) }}</div>
    </th>
    <td>
      <div class="flex-box f2lex-center">
      <MDRadioView
      v-if="MASTERDATA['IPDIAAUCOLO']"
      :data="MASTERDATA['IPDIAAUCOLO'].Items.filter(i => i.Code === 'IPDIAAUCOLONOR' || i.Code === 'IPDIAAUCOLOOTH')"
      />
      <template v-if="MASTERDATA['IPDIAAUCOLO'].Items[5].Value">
       <FakeInput
        style="flex-grow: 1;"
        v-model="MASTERDATA['IPDIAAUCOLO'].Items[6].Value"
       />
      </template>
     </div>
     <!-- <MDRadioView
      v-if="MASTERDATA['IPDIAAUCOLO']"
      :data="MASTERDATA['IPDIAAUCOLO'].Items"
     /> -->
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUMOIS']">
    <th>{{ __label(MASTERDATA["IPDIAAUMOIS"]) }}</th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUMOIS']"
      :data="MASTERDATA['IPDIAAUMOIS'].Items"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUPRUL']">
    <th>{{ __label(MASTERDATA["IPDIAAUPRUL"]) }}</th>
    <td>
     <div class="flex-box">
      <div>
       <div class="flex-box flex-center">
        <MDRadioView
         v-if="MASTERDATA['IPDIAAUPRUL']"
         :data="MASTERDATA['IPDIAAUPRUL'].Items"
        />
        <span
         v-if="MASTERDATA['IPDIAAUPRUL'].Items[1].Value"
         class="no-wrap ml-5 mr-5"
         >{{ __label(MASTERDATA["IPDIAAUPRUL"].Items[2]) }}</span
        >
       </div>
      </div>
      <FakeInput
       v-if="MASTERDATA['IPDIAAUPRUL'].Items[1].Value"
       v-model="MASTERDATA['IPDIAAUPRUL'].Items[2].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUOTWO']">
    <th>{{ __label(MASTERDATA["IPDIAAUOTWO"]) }}</th>
    <td>
     <div class="flex-box">
      <div>
       <div class="flex-box flex-center">
        <MDRadioView
         v-if="MASTERDATA['IPDIAAUOTWO']"
         :data="MASTERDATA['IPDIAAUOTWO'].Items"
        />
        <span
         v-if="MASTERDATA['IPDIAAUOTWO'].Items[1].Value"
         class="no-wrap ml-5 mr-5"
         >{{ __label(MASTERDATA["IPDIAAUOTWO"].Items[2]) }}</span
        >
       </div>
      </div>
      <FakeInput
       v-if="MASTERDATA['IPDIAAUOTWO'].Items[1].Value"
       v-model="MASTERDATA['IPDIAAUOTWO'].Items[2].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUITV4']">
    <th>{{ __label(MASTERDATA["IPDIAAUITV4"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUITV4'].Items" /></td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block6"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title" v-if="!checkTab">
      6. {{ __t("Trạng thái thần kinh") }}
     </div>
     <div class="tbl-title" v-else>5. {{ __t("Trạng thái thần kinh") }}</div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUMEST']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUMEST"]) }}</div>
    </th>
    <td>
     <div class="flex-box">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUMEST']"
       :data="MASTERDATA['IPDIAAUMEST'].Items.filter(item => item.Code !== 'IPDIAAUMESTOTH' || item.Code !== 'IPDIAAUMESTOTH2')"
      />
      <CheckboxsValue
       :data="MASTERDATA['IPDIAAUMEST'].Items.filter(item => item.Code !== 'IPDIAAUMESTOTH' || item.Code !== 'IPDIAAUMESTOTH2')"
      />
     </div>
     <FakeInput
      class="mt-5"
      v-if="MASTERDATA['IPDIAAUMEST'].Items[5].Value"
      v-model="MASTERDATA['IPDIAAUMEST'].Items[6].Value"
     />
     <FakeInput
      class="mt-5"
      v-if="MASTERDATA['IPDIAAUMEST'].Items[7].Value"
      v-model="MASTERDATA['IPDIAAUMEST'].Items[8].Value"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUITV5']">
    <th>{{ __label(MASTERDATA["IPDIAAUITV5"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUITV5'].Items" /></td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block7"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title" v-if="!checkTab">
      7. {{ __t("Đánh giá về tâm lý") }}
     </div>
     <div class="tbl-title" v-else>6. {{ __t("Đánh giá về tâm lý") }}</div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUPSAS']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUPSAS"]) }}</div>
    </th>
    <td>
     <CheckboxsValue
      style="flex-flow: row wrap;"
      :data="MASTERDATA['IPDIAAUPSAS'].Items.filter(item => item.Code !== 'IPDIAAUPSASRES' || item.Code !== 'IPDIAAUPSASOTH')"
     />
     <FakeInput
      class="mt-5"
      v-if="MASTERDATA['IPDIAAUPSAS'].Items[6].Value"
      v-model="MASTERDATA['IPDIAAUPSAS'].Items[7].Value"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUITV6']">
    <th>{{ __label(MASTERDATA["IPDIAAUITV6"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUITV6'].Items" /></td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block8"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title" v-if="!checkTab">
      8. {{ __t("Đánh giá các hoạt động sinh hoạt hàng ngày") }}
     </div>
     <div class="tbl-title" v-else>
      7. {{ __t("InitialAssessment.label1") }}
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUPSAS']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUPSAS"]) }}</div>
    </th>
    <td>
     <table class="no-border">
      <tr>
       <td></td>
       <td>Level 1</td>
       <td>Level 2</td>
       <td>Level 3</td>
       <td class="bg-c4c4c46b">Level 4</td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAAUEADR']">
       <td class="text-right">{{ __label(MASTERDATA["IPDIAAUEADR"]) }}</td>
       <td
        :data="item"
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUEADR'].Items"
        class="text-center"
        :class="{ 'bg-c4c4c46b': index === 3 }"
       >
        <CheckboxValue v-model="item.Value" />
       </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAAUHEAR']">
       <td class="text-right">{{ __label(MASTERDATA["IPDIAAUHEAR"]) }}</td>
       <td
        :data="item"
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUHEAR'].Items"
        class="text-center"
        :class="{ 'bg-c4c4c46b': index === 3 }"
       >
        <CheckboxValue v-model="item.Value" />
       </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAAUTALK']">
       <td class="text-right">{{ __label(MASTERDATA["IPDIAAUTALK"]) }}</td>
       <td
        :data="item"
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUTALK'].Items"
        class="text-center"
        :class="{ 'bg-c4c4c46b': index === 3 }"
       >
        <CheckboxValue v-model="item.Value" />
       </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAAUVISI']">
       <td class="text-right">{{ __label(MASTERDATA["IPDIAAUVISI"]) }}</td>
       <td
        :data="item"
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUVISI'].Items"
        class="text-center"
        :class="{ 'bg-c4c4c46b': index === 3 }"
       >
        <CheckboxValue v-model="item.Value" />
       </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAAUDRES']">
       <td class="text-right">{{ __label(MASTERDATA["IPDIAAUDRES"]) }}</td>
       <td
        :data="item"
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUDRES'].Items"
        class="text-center"
        :class="{ 'bg-c4c4c46b': index === 3 }"
       >
        <CheckboxValue v-model="item.Value" />
       </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAAUPEHY']">
       <td class="text-right">{{ __label(MASTERDATA["IPDIAAUPEHY"]) }}</td>
       <td
        :data="item"
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUPEHY'].Items"
        class="text-center"
        :class="{ 'bg-c4c4c46b': index === 3 }"
       >
        <CheckboxValue v-model="item.Value" />
       </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAAUWALK']">
       <td class="text-right">{{ __label(MASTERDATA["IPDIAAUWALK"]) }}</td>
       <td
        :data="item"
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUWALK'].Items"
        class="text-center"
        :class="{ 'bg-c4c4c46b': index === 3 }"
       >
        <CheckboxValue v-model="item.Value" />
       </td>
      </tr>
      <tr v-if="MASTERDATA['IPDIAAUTAME']">
       <td class="text-right">{{ __label(MASTERDATA["IPDIAAUTAME"]) }}</td>
       <td
        :data="item"
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUTAME'].Items"
        class="text-center"
        :class="{ 'bg-c4c4c46b': index === 3 }"
       >
        <CheckboxValue v-model="item.Value" />
       </td>
      </tr>
     </table>

     <div class="mt-10">
      <b> Level 1</b>: Độc lập;<b> Level 2</b>: Cần giám sát; <b>Level 3</b>:
      Cần hỗ trợ; <b>Level 4</b>: Phụ thuộc hoàn toàn
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUITV7']">
    <th>{{ __label(MASTERDATA["IPDIAAUITV7"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUITV7'].Items.filter(item => item.Code === 'IPDIAAUITV7IAP')" /></td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block9"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title" v-if="!checkTab">
      9. {{ __label(MASTERDATA["IPDIAAUIOED"]) }}
     </div>
     <div class="tbl-title" v-else>
      8. {{ __label(MASTERDATA["IPDIAAUIOED"]) }}
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUIOED']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUIOED"]) }}</div>
    </th>
    <td>
     <div class="mb-10">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUIOED']"
       :data="MASTERDATA['IPDIAAUIOED'].Items"
      />
     </div>
     <CheckboxsValue v-if="MASTERDATA['IPDIAAUIOED'].Items[1].Value" :data="MASTERDATA['IPDIAAUIOED'].Items" />
     <FakeInput
      class="mt-10"
      v-if="MASTERDATA['IPDIAAUIOED'].Items[6].Value && MASTERDATA['IPDIAAUIOED'].Items[1].Value"
      v-model="MASTERDATA['IPDIAAUIOED'].Items[7].Value"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUNIHT']">
    <th>{{ __label(MASTERDATA["IPDIAAUNIHT"]) }}</th>
    <td><FakeInput
      class="mt-10"
      v-model="MASTERDATA['IPDIAAUNIHT'].Items[0].Value"
     /></td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block10"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title" v-if="!checkTab">
      10. {{ __t("Đánh giá về tiêu hóa và dinh dưỡng") }}
     </div>
     <div class="tbl-title" v-else>
      9. {{__t('InitialAssessment.label11')}}
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUWLOG'] && !checkTab">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUWLOG"]) }}</div>
    </th>
    <td>
     <div class="mb10">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUWLOG']"
       :data="MASTERDATA['IPDIAAUWLOG'].Items"
      />
     </div>
     <div class="flex-box" v-if="MASTERDATA['IPDIAAUWLOG'].Items[1].Value">
      <span class="mgr-5 no-wrap pt-5"
       >{{ __label(MASTERDATA["IPDIAAUHOMA"]) }} (kg)</span
      >
      <div>
       <FakeInput
        class="w100 mgr-5"
        v-model="MASTERDATA['IPDIAAUHOMA'].Items[0].Value"
       />
      </div>
      <span class="mgr-5 no-wrap pt-5">{{
       __label(MASTERDATA["IPDIAAURESO"])
      }}</span>
      <div>
       <FakeInput
        class="w100 mgr-5"
        v-model="MASTERDATA['IPDIAAURESO'].Items[0].Value"
       />
      </div>
      <span
       v-if="MASTERDATA['IPDIAAURESO'].Items[1].Value"
       class="displaytbl no-wrap  pt-5"
       ><span
        ><CheckboxValue v-model="MASTERDATA['IPDIAAURESO'].Items[1].Value" />{{
         __label(MASTERDATA["IPDIAAURESO"].Items[1])
        }}</span
       ></span
      >
     </div>
    </td>
   </tr>
   <!-- chế độ ăn -->
   <tr v-if="MASTERDATA['IPDIAAUDIET']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUDIET"]) }}</div>
    </th>
    <td>
     <div class="flex-box">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUDIET']"
       :data="MASTERDATA['IPDIAAUDIET'].Items.filter(item => item.Code === 'PDIAAUDIETNOR' || item.Code === 'IPDIAAUDIETSPE' || item.Code === 'IPDIAAUDIETSPEC' || item.Code === 'IPDIAAUDIETNOR')"
      />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUDIET'].Items[4].Value"
       v-model="MASTERDATA['IPDIAAUDIET'].Items[5].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUAPPE'] && !checkTab">
    <th>{{ __label(MASTERDATA["IPDIAAUAPPE"]) }}</th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUAPPE']"
      :data="MASTERDATA['IPDIAAUAPPE'].Items"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUSWAL'] && !checkTab">
    <th>{{ __label(MASTERDATA["IPDIAAUSWAL"]) }}</th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUSWAL']"
      :data="MASTERDATA['IPDIAAUSWAL'].Items"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUFERO']">
    <th>{{ __label(MASTERDATA["IPDIAAUFERO"]) }}</th>
    <td>
     <div class="flex-box">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUFERO']"
       :data="MASTERDATA['IPDIAAUFERO'].Items.filter(
            i =>
             i.Code === 'IPDIAAUFEROORA' ||
             i.Code == 'IPDIAAUFEROTUF' ||
             i.Code === 'IPDIAAUFEROOTH'
           )"
      />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUFERO'].Items[2].Value"
       v-model="MASTERDATA['IPDIAAUFERO'].Items[3].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUBOHA']">
    <th>{{ __label(MASTERDATA["IPDIAAUBOHA"]) }}</th>
    <td>
     <div class="flex-box">
      <!-- <MDRadioView
       v-if="MASTERDATA['IPDIAAUBOHA']"
       :data="MASTERDATA['IPDIAAUBOHA'].Items.filter(item => item.Code === 'IPDIAAUBOHAREG' || item.Code === 'IPDIAAUFEROTUF' || item.Code === 'IPDIAAUFEROOTH' || item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHANED' || item.Code === 'IPDIAAUBOHAOTH')"
      /> -->
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUBOHA']"
       :data="[MASTERDATA['IPDIAAUBOHA'].Items[0], MASTERDATA['IPDIAAUBOHA'].Items[5], MASTERDATA['IPDIAAUBOHA'].Items[2], MASTERDATA['IPDIAAUBOHA'].Items[3]]"

      />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUBOHA'].Items[3].Value"
       v-model="MASTERDATA['IPDIAAUBOHA'].Items[4].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUITV8']">
    <th>{{ __label(MASTERDATA["IPDIAAUITV8"]) }}</th>
    <td><CheckboxsValue :data="[MASTERDATA['IPDIAAUITV8'].Items[2]]" /></td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block11"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title" v-if="!checkTab">
      11. {{ __t("Đánh giá về tiết niệu") }}
     </div>
     <div class="tbl-title" v-else>10. {{ __t("Đánh giá về tiết niệu") }}</div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUURAS']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUURAS"]) }}</div>
    </th>
    <td>
     <!-- <CheckboxsValue :data="MASTERDATA['IPDIAAUURAS'].Items" /> -->
     <CheckboxsValue :data="MASTERDATA['IPDIAAUURAS'].Items.filter(item => item.Code === 'IPDIAAUURASNOR' || item.Code === 'IPDIAAUURASDIU' || item.Code === 'IPDIAAUURASCATH' || item.Code === 'IPDIAAUURASOTH')" />
     <FakeInput
      class="mt-10"
      v-if="MASTERDATA['IPDIAAUURAS'].Items[4].Value"
      v-model="MASTERDATA['IPDIAAUURAS'].Items[5].Value"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUITV9']">
    <th>{{ __label(MASTERDATA["IPDIAAUITV9"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUITV9'].Items" /></td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block12"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title" v-if="!checkTab">
      12. {{ __t("Đánh giá về yếu tố xã hội") }}
     </div>
     <div class="tbl-title" v-else>
      11. {{ __t("Đánh giá về yếu tố xã hội") }}
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUPWSI'].Items[0].Value">
      <td colspan="2">
        <div class="flex-box flex-center" style="flex-flow: row wrap;" v-if="MASTERDATA['IPDIAAUPWSI'].Items[0].Value">
          <MDRadioView v-if="MASTERDATA['IPDIAAUPWSI']" :data="MASTERDATA['IPDIAAUPWSI'].Items"/>
        </div>
      </td>
    </tr>
   <tr v-if="MASTERDATA['IPDIAAUMARR'] && !checkTab">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUMARR"]) }}</div>
    </th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUMARR']"
      :data="MASTERDATA['IPDIAAUMARR'].Items"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAURELI']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAURELI"]) }}</div>
    </th>
    <td>
     <div class="flex-box flex-center">
      <V2Select
       v-model="MASTERDATA['IPDIAAURELI'].Items[0].Value"
       :items="select2Suggest(IPDIAAURELIDATA)"
      />
      <FakeInput
       v-if="MASTERDATA['IPDIAAURELI'].Items[1].Value"
       v-model="MASTERDATA['IPDIAAURELI'].Items[1].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAULIWI']">
    <th>{{ __label(MASTERDATA["IPDIAAULIWI"]) }}</th>
    <td>
     <!-- <CheckboxsValue :data="MASTERDATA['IPDIAAULIWI'].Items" /> -->
     <CheckboxsValue :data="MASTERDATA['IPDIAAULIWI'].Items.filter(item => item.Code === 'IPDIAAULIWIPAR' || item.Code === 'IPDIAAULIWIGRA' || item.Code === 'IPDIAAULIWISM' || item.Code === 'IPDIAAULIWISD' || item.Code === 'IPDIAAULIWIOTH')" />
     <FakeInput
      class="mt-10"
      v-if="MASTERDATA['IPDIAAULIWI'].Items[6].Value"
      v-model="MASTERDATA['IPDIAAULIWI'].Items[7].Value"
     />
    </td>
   </tr>

   <tr v-if="MASTERDATA['IPDIAAUTT'] && checkTab">
    <th>{{ __label(MASTERDATA["IPDIAAUTT"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUTT'].Items" /></td>
   </tr>

   <tr v-if="MASTERDATA['IPDIAAUSL']">
    <th>{{ __label(MASTERDATA["IPDIAAUSL"]) }}</th>
    <td>
      <div class="w150 display-inline mr-10 mb-20">
        <div :key="index" v-for="(item, index) in MASTERDATA['IPDIAAUSL'].Items">
        <div class="mb-5">
        <b>{{__t('InitialAssessment.number')}}</b>
          </div>
            <FakeInput v-model="MASTERDATA['IPDIAAUSL'].Items[0].Value" />
           </div>
      </div>
       <div class="table">
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
             <template>
              <td style="position: relative">
               <!-- <VNumberInput v-model="item.Age"/> -->
               <FakeInput v-model="item.Age" />
              </td>
              <td width="110px">
                <FakeInput v-if="item.Gender === '1'" v-model="gender1" />
                <FakeInput v-if="item.Gender === '0'" v-model="gender0" />
                <!-- <radio-list v-model="item.Gender" :options="GENDERLIST" /> -->
              </td>
             </template>
            </tr>
           </tbody>
          </template>
         </table>
      </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUDTPH'] && !checkTab">
    <th>{{ __label(MASTERDATA["IPDIAAUDTPH"]) }}</th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUDTPH']"
      :data="MASTERDATA['IPDIAAUDTPH'].Items"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUEMPL'] && !checkTab">
    <th>{{ __label(MASTERDATA["IPDIAAUEMPL"]) }}</th>
    <td>
     <div class="flex-box">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUEMPL']"
       :data="MASTERDATA['IPDIAAUEMPL'].Items"
      />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUEMPL'].Items[2].Value"
       v-model="MASTERDATA['IPDIAAUEMPL'].Items[3].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUSOPR'] && !checkTab">
    <th>{{ __label(MASTERDATA["IPDIAAUSOPR"]) }}</th>
    <td>
     <div class="flex-box">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUSOPR']"
       :data="MASTERDATA['IPDIAAUSOPR'].Items"
      />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUSOPR'].Items[2].Value"
       v-model="MASTERDATA['IPDIAAUSOPR'].Items[3].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUALUS'] && !checkTab">
    <th>{{ __label(MASTERDATA["IPDIAAUALUS"]) }}</th>
    <td>
     <div class="flex-box">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUALUS']"
       :data="MASTERDATA['IPDIAAUALUS'].Items"
      />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUALUS'].Items[0].Value"
       v-model="MASTERDATA['IPDIAAUALUS'].Items[2].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUTOSD'] && !checkTab">
    <th>{{ __label(MASTERDATA["IPDIAAUTOSD"]) }}</th>
    <td>
     <div class="flex-box">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUTOSD']"
       :data="MASTERDATA['IPDIAAUTOSD'].Items"
      />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUTOSD'].Items[0].Value"
       v-model="MASTERDATA['IPDIAAUTOSD'].Items[2].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAULEIS'] && !checkTab">
    <th>{{ __label(MASTERDATA["IPDIAAULEIS"]) }}</th>
    <td>
     <div class="flex-box">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAULEIS']"
       :data="MASTERDATA['IPDIAAULEIS'].Items"
      />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAULEIS'].Items[0].Value"
       v-model="MASTERDATA['IPDIAAULEIS'].Items[2].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUSEIN'] && !checkTab">
    <th>{{ __label(MASTERDATA["IPDIAAUSEIN"]) }}</th>
    <td>
     <div class="flex-box">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUSEIN']"
       :data="MASTERDATA['IPDIAAUSEIN'].Items"
      />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUSEIN'].Items[0].Value"
       v-model="MASTERDATA['IPDIAAUSEIN'].Items[2].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUSUTE'] && !checkTab">
    <th>{{ __label(MASTERDATA["IPDIAAUSUTE"]) }}</th>
    <td>
     <div class="flex-box">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUSUTE']"
       :data="MASTERDATA['IPDIAAUSUTE'].Items"
      />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUSUTE'].Items[0].Value"
       v-model="MASTERDATA['IPDIAAUSUTE'].Items[2].Value"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUABSU'] && !checkTab">
    <th>{{ __label(MASTERDATA["IPDIAAUABSU"]) }}</th>
    <td>
     <div class="flex-box mb-10">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUABSU']"
       :data="MASTERDATA['IPDIAAUABSU'].Items"
      />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUABSU'].Items[0].Value"
       v-model="MASTERDATA['IPDIAAUABSU'].Items[2].Value"
      />
     </div>
     <div
      class="flex-box flex-center mb-5"
      v-if="MASTERDATA['IPDIAAUABSU'].Items[0].Value"
     >
      <span class="mgr-5">{{ __label(MASTERDATA["IPDIAAURATT"]) }}</span>
      <MDRadioView
       v-if="MASTERDATA['IPDIAAURATT']"
       :data="MASTERDATA['IPDIAAURATT'].Items"
      />
     </div>
     <div
      class="flex-box flex-center"
      v-if="MASTERDATA['IPDIAAUABSU'].Items[0].Value"
     >
      <span class="mgr-5">{{ __label(MASTERDATA["IPDIAAUTTSW"]) }}</span>
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUTTSW']"
       :data="MASTERDATA['IPDIAAUTTSW'].Items"
      />
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUITV10']">
    <th>{{ __label(MASTERDATA["IPDIAAUITV10"]) }}</th>
    <td>
     <div class="mb-10">
      <CheckboxsValue
       :data="[MASTERDATA['IPDIAAUITV10'].Items[0]]"
      />
     </div>
    </td>
   </tr>
  </table>

  <table
   v-if="!checkTab"
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block13"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title">
      13. {{ __t("Tham khảo đánh giá ban đầu đặc biệt") }}
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUOAIN']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUOAIN"]) }}</div>
    </th>
    <td>
     <div class="mb-10">
      <CheckboxsValue
       :DataType="'Radio'"
       :data="[
        MASTERDATA['IPDIAAUOAIN'].Items[0],
        MASTERDATA['IPDIAAUOAIN'].Items[1],
        MASTERDATA['IPDIAAUOAIN'].Items[2]
       ]"
      />
     </div>
     <div class="flex-box flex-center mb-10" style="flex-flow: row wrap;">
      <CheckboxsValue
       :DataType="'Radio'"
       :data="[MASTERDATA['IPDIAAUOAIN'].Items[3]]"
      />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUOAIN'].Items[3].Value"
       v-model="MASTERDATA['IPDIAAUOAIN'].Items[4].Value"
      />
     </div>
     <div class="mt-5">
      <i>{{
       __t(
        "Thông tin đánh giá ban đầu đặc biệt tham khảo thông tin tại tab 2: Đánh giá đặc biệt"
       )
      }}</i>
     </div>
    </td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block14"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title" v-if="!checkTab">
      14. {{ __t("Sàng lọc ban đầu bệnh dịch truyền nhiễm") }}
     </div>
     <div class="tbl-title" v-else>
      12. {{ __t("Sàng lọc ban đầu bệnh dịch truyền nhiễm") }}
     </div>
    </td>
   </tr>
   <!--
    <tr v-if="MASTERDATA['IPDIAAUPWSI']">
      <td colspan="2">
        <div class="flex-box flex-center" style="flex-flow: row wrap;" v-if="MASTERDATA['IPDIAAUPWSI'].Items[0].Value">
          <MDRadioView v-if="MASTERDATA['IPDIAAUPWSI']" :data="MASTERDATA['IPDIAAUPWSI'].Items"/>
        </div>
      </td>
    </tr>
   -->
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
          <MDRadioView
           v-if="MASTERDATA['IPDIAAUFERV']"
           :data="MASTERDATA['IPDIAAUFERV'].Items"
          />
         </td>
        </tr>
        <tr>
         <td>{{ __label(MASTERDATA["IPDIAAURUSL"]) }}</td>
         <td>
          <MDRadioView
           v-if="MASTERDATA['IPDIAAURUSL']"
           :data="MASTERDATA['IPDIAAURUSL'].Items"
          />
         </td>
        </tr>
        <tr>
         <td>{{ __label(MASTERDATA["IPDIAAUTRAV"]) }}</td>
         <td>
          <MDRadioView
           v-if="MASTERDATA['IPDIAAUTRAV']"
           :data="MASTERDATA['IPDIAAUTRAV'].Items"
          />
         </td>
        </tr>
        <tr>
         <td>{{ __label(MASTERDATA["IPDIAAUCOUG"]) }}</td>
         <td>
          <MDRadioView
           v-if="MASTERDATA['IPDIAAUCOUG']"
           :data="MASTERDATA['IPDIAAUCOUG'].Items"
          />
         </td>
        </tr>
        <tr>
         <td>{{ __label(MASTERDATA["IPDIAAUCCWS"]) }}</td>
         <td>
          <MDRadioView
           v-if="MASTERDATA['IPDIAAUCCWS']"
           :data="MASTERDATA['IPDIAAUCCWS'].Items"
          />
         </td>
        </tr>
       </table>
      </div>
      <div>
       <p>{{ __label(MASTERDATA["IPDIAAUTSIP"]) }}</p>
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUTSIP']"
        :data="MASTERDATA['IPDIAAUTSIP'].Items"
       />
       <template v-if="MASTERDATA['IPDIAAUTSIP'].Items[1].Value">
        <div class="mt-5 mb-5">{{ __label(MASTERDATA["IPDIAAULOCL"]) }}</div>
        <div class="flex-box" style="flex-flow: row wrap;">
         <MDRadioView
          v-if="MASTERDATA['IPDIAAULOCL']"
          :data="MASTERDATA['IPDIAAULOCL'].Items"
         />
         <FakeInput
          style="flex-grow: 1;"
          v-if="MASTERDATA['IPDIAAULOCL'].Items[3].Value"
          v-model="MASTERDATA['IPDIAAULOCL'].Items[4].Value"
         />
        </div>
       </template>
      </div>
     </div>
     <CommunicableDiseasesScreening
      v-model="MASTERDATA"
      :type="'IDAU'"
      :readonly="true"
      :version="DataSubmit.Version"
      v-else
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUNEID']">
    <th>{{ __label(MASTERDATA["IPDIAAUNEID"]) }}</th>
    <td>
     <div class="mb-10">
      <CheckboxsValue :data="[MASTERDATA['IPDIAAUNEID'].Items[0]]" />
      <CheckboxsValue :data="[MASTERDATA['IPDIAAUNEID'].Items[1]]" />
     </div>
     <div class="flex-box flex-center mb-10" style="flex-flow: row wrap;">
      <CheckboxsValue :data="[MASTERDATA['IPDIAAUNEID'].Items[2]]" />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUNEID'].Items[2].Value"
       v-model="MASTERDATA['IPDIAAUNEID'].Items[3].Value"
      />
     </div>
    </td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block15"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title" v-if="!checkTab">
      15. {{ __t("Yêu cầu khách vào thăm") }}
     </div>
     <div class="tbl-title" v-else>13. {{ __t("Yêu cầu khách vào thăm") }}</div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUNBDY']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUNBDY"]) }}</div>
    </th>
    <td>
     <div class="flex-box flex-center mb-10" style="flex-flow: row wrap;">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUNBDY']"
       :data="MASTERDATA['IPDIAAUNBDY'].Items"
      />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUNBDY'].Items[1].Value"
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
   id="InitialAssessment-ForAdult-block16"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title" v-if="!checkTab">
      16. {{ __t("Các đánh giá khác nếu cần") }}
     </div>
     <div class="tbl-title" v-else>
      14. {{ __t("Các đánh giá khác nếu cần") }}
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUITIN']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUITIN"]) }}</div>
    </th>
    <td>
     <div class="flex-box flex-center mb-10" style="flex-flow: row wrap;">
      <MDRadioView
       v-if="MASTERDATA['IPDIAAUITIN']"
       :data="MASTERDATA['IPDIAAUITIN'].Items"
      />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUITIN'].Items[1].Value"
       v-model="MASTERDATA['IPDIAAUITIN'].Items[2].Value"
      />
     </div>
    </td>
   </tr>
  </table>

  <br /><br /><br />
  <div class="row">
       <div class="col-md-6 col-sm-6 text-center" v-if="!checkTab">
        <template v-if="DataSubmit.UpdatedAt && DataSubmit.UpdatedBy">
         <p>{{ DataSubmit.UpdatedAt }}</p>
         <eform-signature
          :ad="DataSubmit.UpdatedBy.Username"
          :title="__t('Điều dưỡng thực hiện')"
         />
        </template>
       </div>
       <div class="col-md-6 col-sm-6 text-center"></div>
       <div style="transform: translateX(-100px);" v-if="checkTab && DataSubmit.Version >= 9">
        <Confirm
        class="mt-10"
        ref="Confirm"
        :MasterDataCode="'A02_014_220321_VE'"
        :FormCode="'A02_014_220321_VE'"
        :ReadOnly="true"
        :AdInfo="[DataSubmit.CreatedBy]"
        :VisitId="_VisitId"
        :FormId="DataSubmit.Id"
      />
       </div>
       <div class="col-md-6 col-sm-6 text-center" v-else>
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
  <div><p v-if="!checkTab">A02_013_220321_VE</p>
      <p v-else>A02_014_220321_VE</p></div>
  <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit.UpdatedBy" :ad="DataSubmit.UpdatedBy.Username" /> {{__t('lúc')}} {{ DataSubmit.UpdatedAt }}</p>
 </div>
</template>
<script>
import VDatePicker from '@/components/VDateTimePicker.vue'
import V2Select from '@/components/VSelectDisplay.vue'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
import Confirm from '@/components/Form/Confirm'
import constants from '@/constants'
import EIOService from '@/services/IPD/EIOService'
export default {
  name: 'IPDInitialAssessmentForChild',
  props: ['MASTERDATA', 'DataSubmit'],
  data () {
    return {
      hasData: false,
      gender1: 'Nam',
      gender0: 'Nữ'
    }
  },
  components: {
    V2Select, VDatePicker, CommunicableDiseasesScreening, Confirm
  },
  watch: {
  },
  mounted () {
    this.getListConfirm(this.DataSubmit.Id)
  },
  computed: {
    checkTab: function () {
      return true
    },
    IPDIAAURELIDATA: function () {
      return constants.IPDIAAURELIDATA
    },
    bmiCalculation: function () {
      var weight = this.MASTERDATA['IPDIAAUWEIG'].Items[0].Value ? parseFloat(this.MASTERDATA['IPDIAAUWEIG'].Items[0].Value) : 0
      var height = this.MASTERDATA['IPDIAAUHEIG'].Items[0].Value ? parseFloat(this.MASTERDATA['IPDIAAUHEIG'].Items[0].Value) / 100 : 0
      return (weight / (height * height)).toFixed(2)
    }
  },
  methods: {
    getListConfirm (id) {
      this.isConfirm = false
      new EIOService().find('ConfirmForms/GetList/' + id).then(res => {
        if (this.$route.name === 'IPDInitialAssessmentForChild') {
          if (res && res.length > 0) {
            this.isConfirm = true
          }
        }
        console.log('confirm child 2', this.isConfirm)
      })
    },
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
