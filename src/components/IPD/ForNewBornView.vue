<template>
 <div class="box-body no-padding" v-if="DataSubmit">
  <div class="tbl-title" >1. {{__t('InitialAssessment.label2')}}</div>
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
   <tr v-if="MASTERDATA['IPDIAAUTRANS']">
    <th>{{ __label(MASTERDATA["IPDIAAUTRANS"]) }}</th>
    <td>
      <div class="flex-box">
      <div>
      <MDRadioView
      v-if="MASTERDATA['IPDIAAUTRANS']"
      :data="MASTERDATA['IPDIAAUTRANS'].Items"
     />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUTRANS'].Items[3].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUTRANS'].Items[4].Value" />
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
           __label(MASTERDATA["IPDIAAUROOM"])
          }}</b>
          <FakeInput
       style="flex-grow: 1;"
       v-model="MASTERDATA['IPDIAAUROOM'].Items[0].Value"
      />
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
      <div class="w150 display-inline mr-10" v-if="!checkTab">
       <div
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUTEMP'].Items.filter(
         i => i.Clinic === ''
        )"
       >
        <div class="mb-5">
         <b>{{ __label(item) }}</b>
         <span v-if="item.Note" class="note-text">(°C)</span>
        </div>
        <FakeInput v-model="item.Value" />
       </div>
      </div>
      <div class="w150 display-inline mr-10" v-if="!checkTab">
       <div
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAURERA'].Items.filter(
         i => i.Clinic === ''
        )"
       >
        <div class="mb-5">
         <!-- <b>{{ __label(item) }}</b> -->
         <b>{{__t('Nhịp thở')}}</b>
         <span v-if="item.Note" class="note-text">({{ __t("Lần/phút") }})</span>
        </div>
        <FakeInput v-model="item.Value" />
       </div>
      </div>
      <div class="w150 display-inline mr-10" v-if="checkTab">
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
        v-for="(item, index) in MASTERDATA['IPDIAAUHEIG'].Items"
       >
        <div class="mb-5">
         <b >{{__t('InitialAssessment.length')}}</b>
         <span class="note-text">(cm)</span>
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
      <div class="w150 display-inline mr-10">
       <div
        :key="index"
        v-for="(item, index) in MASTERDATA['IPDIAAUROUNDHEAD'].Items"
       >
        <div class="mb-5">
         <b>{{ __label(item) }}</b>
         <span class="note-text">(cm)</span>
        </div>
        <FakeInput v-model="item.Value" />
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
        <FakeInput v-model="item.Value" />
       </div>
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUBODYBUILD']">
    <th>{{ __label(MASTERDATA["IPDIAAUBODYBUILD"]) }}</th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUBODYBUILD']"
      :data="MASTERDATA['IPDIAAUBODYBUILD'].Items"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUHYGNEWBORN']">
    <th>{{ __label(MASTERDATA["IPDIAAUHYGNEWBORN"]) }}</th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUHYGNEWBORN']"
      :data="MASTERDATA['IPDIAAUHYGNEWBORN'].Items"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUCRYSOUND']">
    <th>{{ __label(MASTERDATA["IPDIAAUCRYSOUND"]) }}</th>
    <td>
     <div class="flex-box">
      <div>
       <MDRadioView
        v-if="MASTERDATA['IPDIAAUCRYSOUND']"
        :data="MASTERDATA['IPDIAAUCRYSOUND'].Items"
       />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUCRYSOUND'].Items[1].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUCRYSOUND'].Items[2].Value" />
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUNEEDIDORG']">
    <th>{{ __label(MASTERDATA["IPDIAAUNEEDIDORG"]) }}</th>
    <td><CheckboxsValue :DataType="'radio'" :data="MASTERDATA['IPDIAAUNEEDIDORG'].Items" /></td>
   </tr>
   <!-- <tr v-if="MASTERDATA['IPDIAAUITV4']">
    <th>{{ __label(MASTERDATA["IPDIAAUITV4"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUITV4'].Items" /></td>
   </tr> -->
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block3"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div  class="tbl-title">
      3. {{__t('InitialAssessment.label17')}}
     </div>
    </td>
   </tr>
    <tr v-if="MASTERDATA['IPDIAAURESASS']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAURESASS"]) }}</div>
    </th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAURESASS']"
      :data="MASTERDATA['IPDIAAURESASS'].Items"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUNEEDIDHH']">
    <th>{{ __label(MASTERDATA["IPDIAAUNEEDIDHH"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUNEEDIDHH'].Items" /></td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   v-if="!checkTab"
   id="InitialAssessment-ForAdult-block4"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title">4. {{__t('InitialAssessment.label10')}}</div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUSTATUS']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUSTATUS"]) }}</div>
    </th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUSTATUS']"
      :data="MASTERDATA['IPDIAAUSTATUS'].Items"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUNEEDIDTK']">
    <th>{{ __label(MASTERDATA["IPDIAAUNEEDIDTK"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUNEEDIDTK'].Items" /></td>
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
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUCOLORSKIN']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUCOLORSKIN"]) }}</div>
    </th>
    <td>
       <div class="flex-box">
      <div>
       <MDRadioView
      v-if="MASTERDATA['IPDIAAUCOLORSKIN']"
      :data="MASTERDATA['IPDIAAUCOLORSKIN'].Items"
     />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUCOLORSKIN'].Items[4].Value"
      >
       <FakeInput
      v-if="MASTERDATA['IPDIAAUCOLORSKIN'].Items[4].Value"
      v-model="MASTERDATA['IPDIAAUCOLORSKIN'].Items[5].Value"
     />
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUMOITURE']">
    <th>{{ __label(MASTERDATA["IPDIAAUMOITURE"]) }}</th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUMOITURE']"
      :data="MASTERDATA['IPDIAAUMOITURE'].Items"
     />
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
     <div class="tbl-title">
      6. {{__t('InitialAssessment.pain')}}
     </div>
    </td>
   </tr>
    <tr v-if="MASTERDATA['IPDIAAUSEDA']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUSEDA"]) }}</div>
    </th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUSEDA']"
      :data="MASTERDATA['IPDIAAUSEDA'].Items"
      class="mb-10"
     />
      <table
        class="table observation-table no-margin tbl-b2 mt-10"
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
              <FakeInput  v-model="MASTERDATA['IPDIAAUSCORESEDATION1'].Items[0].Value" />
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.behavior')}}</span>
              </td>
              <td >
              <FakeInput v-model="MASTERDATA['IPDIAAUSCORESEDATION2'].Items[0].Value" />
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.expression')}} </span>
              </td>
              <td >
              <FakeInput v-model="MASTERDATA['IPDIAAUSCORESEDATION3'].Items[0].Value" />
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.firmness')}} </span>
              </td>
              <td >
              <FakeInput v-model="MASTERDATA['IPDIAAUSCORESEDATION4'].Items[0].Value" />
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.vital-signs')}} </span>
              </td>
              <td >
              <FakeInput v-model="MASTERDATA['IPDIAAUSCORESEDATION5'].Items[0].Value" />
              </td>
             </template>
            </tr>

            <!-- tổng -->
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.total')}} </span>
              </td>
              <td :style="messageTotalPain <= -4 ? 'background-color:#E6A23C' : 'background-color:#409EFF'">
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
   <tr v-if="MASTERDATA['IPDIAAUPAI']">
    <th>{{ __label(MASTERDATA["IPDIAAUPAI"]) }}</th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUPAI']"
      :data="MASTERDATA['IPDIAAUPAI'].Items"
      class="mb-10"
     />
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
              <FakeInput  v-model="MASTERDATA['IPDIAAUSCOREPAIN1'].Items[0].Value" />
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.behavior')}}</span>
              </td>
              <td >
                <FakeInput  v-model="MASTERDATA['IPDIAAUSCOREPAIN2'].Items[0].Value" />
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.expression')}} </span>
              </td>
              <td >
                <FakeInput  v-model="MASTERDATA['IPDIAAUSCOREPAIN3'].Items[0].Value" />
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.firmness')}} </span>
              </td>
              <td >
                <FakeInput  v-model="MASTERDATA['IPDIAAUSCOREPAIN4'].Items[0].Value" />
              </td>
             </template>
            </tr>
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.vital-signs')}} </span>
              </td>
              <td >
              <FakeInput  v-model="MASTERDATA['IPDIAAUSCOREPAIN5'].Items[0].Value" />
              </td>
             </template>
            </tr>

            <!-- tổng -->
            <tr >
             <template v-if="!RealOnly">
              <td style="position: relative">
              <span> {{__t('InitialAssessment.total')}} </span>
              </td>
              <td :style="messageTotalPoin >= 4 ? 'background-color:#E6A23C' : 'background-color:#409EFF'">
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
    <th>{{ __label(MASTERDATA["IPDIAAUNEEDIDDAU"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUNEEDIDDAU'].Items" />
    </td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block7"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title" >
      7. {{__t('InitialAssessment.label11')}}
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUVOM']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUVOM"]) }}</div>
    </th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUVOM']"
      :data="MASTERDATA['IPDIAAUVOM'].Items"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUDIE']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUDIE"]) }}</div>
    </th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUDIE']"
      :data="MASTERDATA['IPDIAAUDIE'].Items"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUFERO']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUFERO"]) }}</div>
    </th>
    <td>
      <div class="flex-box">
      <div>
       <MDRadioView
      v-if="MASTERDATA['IPDIAAUFERO']"
      :data="MASTERDATA['IPDIAAUFERO'].Items"
     />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUFERO'].Items[2].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUFERO'].Items[3].Value" />
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUBHAB']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUBHAB"]) }}</div>
    </th>
    <td>
      <div class="flex-box">
      <div>
       <MDRadioView
      v-if="MASTERDATA['IPDIAAUBHAB']"
      :data="MASTERDATA['IPDIAAUBHAB'].Items"
     />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
       v-if="MASTERDATA['IPDIAAUBHAB'].Items[3].Value"
      >
       <FakeInput v-model="MASTERDATA['IPDIAAUBHAB'].Items[4].Value" />
      </div>
     </div>
    </td>
   </tr>
   <!-- <tr v-if="MASTERDATA['IPDIAAUBOHA']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUBOHA"]) }}</div>
    </th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUBOHA']"
      :data="MASTERDATA['IPDIAAUBOHA'].Items"
     />
    </td>
   </tr> -->
   <tr v-if="MASTERDATA['IPDIAAUSTOOLCOLOR']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUSTOOLCOLOR"]) }}</div>
    </th>
    <td>
     <MDRadioView
      v-if="MASTERDATA['IPDIAAUSTOOLCOLOR']"
      :data="MASTERDATA['IPDIAAUSTOOLCOLOR'].Items"
     />
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUNEEDIDDD']">
    <th>{{ __label(MASTERDATA["IPDIAAUNEEDIDDD"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUNEEDIDDD'].Items" /></td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block8"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title">
      8. {{__t('InitialAssessment.label13')}}
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUURINA']">
    <th width="1">
     <div class="w160">{{ __label(MASTERDATA["IPDIAAUURINA"]) }}</div>
    </th>
    <td>
      <div class="flex-box">
      <div>
       <MDRadioView
      v-if="MASTERDATA['IPDIAAUURINA']"
      :data="MASTERDATA['IPDIAAUURINA'].Items"
     />
      </div>
      <div
       style="flex-grow: 1;"
       class="ml-10"
      >
       <FakeInput
      v-if="MASTERDATA['IPDIAAUURINA'].Items[1].Value"
      v-model="MASTERDATA['IPDIAAUURINA'].Items[3].Value"
     />
     <FakeInput
      v-if="MASTERDATA['IPDIAAUURINA'].Items[4].Value"
      v-model="MASTERDATA['IPDIAAUURINA'].Items[5].Value"
     />
      </div>
     </div>
    </td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUNEEDIDTN']">
    <th>{{ __label(MASTERDATA["IPDIAAUNEEDIDTN"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUNEEDIDTN'].Items" /></td>
   </tr>
  </table>

  <table
   class="table v-table-1 no-margin col-1-1"
   id="InitialAssessment-ForAdult-block9"
  >
   <tr>
    <td colspan="2" class="no-padding">
     <div class="tbl-title" >
      9. {{__t('InitialAssessment.label14')}}
     </div>
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
     <CheckboxsValue :data="MASTERDATA['IPDIAAULIWI'].Items" />
     <FakeInput
      class="mt-10"
      v-if="MASTERDATA['IPDIAAULIWI'].Items[6].Value"
      v-model="MASTERDATA['IPDIAAULIWI'].Items[7].Value"
     />
    </td>
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
                <FakeInput v-if="item.Gender == '1'" v-model="gender1" />
                <FakeInput v-else-if="item.Gender == '0'" v-model="gender0" />
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
   <tr v-if="MASTERDATA['IPDIAAUTT']">
    <th>{{ __label(MASTERDATA["IPDIAAUTT"]) }}</th>
    <td><CheckboxsValue :data="MASTERDATA['IPDIAAUTT'].Items" /></td>
   </tr>
   <tr v-if="MASTERDATA['IPDIAAUITV10']">
    <th>{{ __label(MASTERDATA["IPDIAAUITV10"]) }}</th>
    <td>
     <div class="mb-10">
      <CheckboxsValue
       :data="[
        MASTERDATA['IPDIAAUITV10'].Items[0],
        MASTERDATA['IPDIAAUITV10'].Items[1]
       ]"
      />
     </div>
     <div class="flex-box flex-center mb-10" style="flex-flow: row wrap;">
      <CheckboxsValue :data="[MASTERDATA['IPDIAAUITV10'].Items[2]]" />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUITV10'].Items[2].Value"
       v-model="MASTERDATA['IPDIAAUITV10'].Items[4].Value"
      />
     </div>
     <div class="flex-box flex-center" style="flex-flow: row wrap;">
      <CheckboxsValue :data="[MASTERDATA['IPDIAAUITV10'].Items[3]]" />
      <FakeInput
       style="flex-grow: 1;"
       v-if="MASTERDATA['IPDIAAUITV10'].Items[3].Value"
       v-model="MASTERDATA['IPDIAAUITV10'].Items[5].Value"
      />
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
     <div class="tbl-title">
      10. {{ __t("Sàng lọc ban đầu bệnh dịch truyền nhiễm") }}
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
     <div class="tbl-title" >
      11. {{ __t("Yêu cầu khách vào thăm") }}
     </div>
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
     <div class="tbl-title">
      12. {{ __t("Các đánh giá khác nếu cần") }}
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
  <div class="row" v-if="DataSubmit.Version >= 9">
      <Confirm
      class="mt-10"
      ref="Confirm"
      :key="reset"
      :MasterDataCode="'A02_015_220321_VE'"
      :FormCode="'A02_015_220321_VE'"
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
      <p>A02_015_220321_VE</p></div>
  <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit.UpdatedBy" :ad="DataSubmit.UpdatedBy.Username" /> {{__t('lúc')}} {{ DataSubmit.UpdatedAt }}</p>
 </div>
</template>
<script>
import VDatePicker from '@/components/VDateTimePicker.vue'
import V2Select from '@/components/VSelectDisplay.vue'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
import constants from '@/constants'
import Confirm from '@/components/Form/Confirm'

export default {
  name: 'IPDInitialAssessmentForAdult',
  props: ['MASTERDATA', 'DataSubmit'],
  data () {
    return {
      gender1: 'Nam',
      gender0: 'Nữ',
      hasData: false,
      totalPoint: 0,
      messageTotalPain: 'N/A',
      messageTotalPoin: 'N/A',
      totalPaint: 0
    }
  },
  components: {
    V2Select, VDatePicker, CommunicableDiseasesScreening, Confirm
  },
  watch: {
  },
  mounted () {
    console.log('1900', this.messageTotalPain)
    this.handleSelectPain()
    this.handleSelectSedation()
  },
  computed: {
    checkTab: function () {
      return this.$route.name === 'IPDInitialAssessmentForChild'
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
