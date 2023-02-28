<template>
  <div>
    <div class="text-center" v-if="!readonly"><button @click="open(false)" class="uppercase btn v-yellow-btn">{{__t('THÊM LƯỢT ĐÁNH GIÁ')}}</button></div>
    <modal name="MasterDataObPopup" transition="pop-out" height="auto" :clickToClose="false" :width="modalWidth">
      <div class="sync-ed-header">{{__t('Bảng đánh giá nguy cơ ngã của thai phụ áp dụng cho nội trú sản')}} <i @click="handleBack" class="fa fa-times pull-right fa-2 cursor" aria-hidden="true"></i></div>
      <div class="sync-ed-box">
        <table class="standing-order-tbl" :class="{'disable': readonly || (isNew ? false : DataSubmit.CreatedBy !== getUser())}">
          <!-- IPDMOFRHOFA -->
          <tr v-if="MASTERDATA['IPDMOFRHOFA']">
            <td width="50px" class="p-r bg-head font-bold b-b-2" rowspan="12"><div class="text-rotate-90 no-wrap">{{__t('Noi_tru_san.tien_su')}}</div></td>
            <td class="bg-head font-bold b-b-2" width="270" rowspan="4">
              {{__label(MASTERDATA['IPDMOFRHOFA'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMOFRHOFA'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRHOFAradio-' + 1" v-model="MASTERDATA['IPDMOFRHOFA'].Items[1].Value">
                  <label :for="'IPDMOFRHOFAradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMOFRHOFA'].Items, MASTERDATA['IPDMOFRHOFA'].Items[1])">{{__label(MASTERDATA['IPDMOFRHOFA'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRHOFA']">
            <td>
              {{__label(MASTERDATA['IPDMOFRHOFA'].Items[2])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRHOFAradio-' + 3" v-model="MASTERDATA['IPDMOFRHOFA'].Items[3].Value">
                  <label :for="'IPDMOFRHOFAradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMOFRHOFA'].Items, MASTERDATA['IPDMOFRHOFA'].Items[3])">{{__label(MASTERDATA['IPDMOFRHOFA'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRHOFA']">
            <td>
              {{__label(MASTERDATA['IPDMOFRHOFA'].Items[4])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRHOFAradio-' + 5" v-model="MASTERDATA['IPDMOFRHOFA'].Items[5].Value">
                  <label :for="'IPDMOFRHOFAradio-' + 5" @click="checkbox2Radio(MASTERDATA['IPDMOFRHOFA'].Items, MASTERDATA['IPDMOFRHOFA'].Items[5])">{{__label(MASTERDATA['IPDMOFRHOFA'].Items[5])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRHOFA']">
            <td class="b-b-2">
              {{__label(MASTERDATA['IPDMOFRHOFA'].Items[6])}}
            </td>
            <td class="b-b-2">
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRHOFAradio-' + 7" v-model="MASTERDATA['IPDMOFRHOFA'].Items[7].Value">
                  <label :for="'IPDMOFRHOFAradio-' + 7" @click="checkbox2Radio(MASTERDATA['IPDMOFRHOFA'].Items, MASTERDATA['IPDMOFRHOFA'].Items[7])">N/A</label>
                </span>
              </div>
            </td>
          </tr>
          <!-- IPDMOFRHOBR -->
          <tr v-if="MASTERDATA['IPDMOFRHOBR']">
            <td class="bg-head font-bold b-b-2" width="270" rowspan="3">
              {{__label(MASTERDATA['IPDMOFRHOBR'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMOFRHOBR'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRHOBRradio-' + 1" v-model="MASTERDATA['IPDMOFRHOBR'].Items[1].Value">
                  <label :for="'IPDMOFRHOBRradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMOFRHOBR'].Items, MASTERDATA['IPDMOFRHOBR'].Items[1])">{{__label(MASTERDATA['IPDMOFRHOBR'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRHOBR']">
            <td>
              {{__label(MASTERDATA['IPDMOFRHOBR'].Items[2])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRHOBRradio-' + 3" v-model="MASTERDATA['IPDMOFRHOBR'].Items[3].Value">
                  <label :for="'IPDMOFRHOBRradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMOFRHOBR'].Items, MASTERDATA['IPDMOFRHOBR'].Items[3])">{{__label(MASTERDATA['IPDMOFRHOBR'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRHOBR']">
            <td class="b-b-2">
              {{__label(MASTERDATA['IPDMOFRHOBR'].Items[4])}}
            </td>
            <td class="b-b-2">
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRHOBRradio-' + 5" v-model="MASTERDATA['IPDMOFRHOBR'].Items[5].Value">
                  <label :for="'IPDMOFRHOBRradio-' + 5" @click="checkbox2Radio(MASTERDATA['IPDMOFRHOBR'].Items, MASTERDATA['IPDMOFRHOBR'].Items[5])">N/A</label>
                </span>
              </div>
            </td>
          </tr>
          <!-- IPDMOFRVIIM -->
          <tr v-if="MASTERDATA['IPDMOFRVIIM']">
            <td class="bg-head font-bold b-b-2" width="270" rowspan="5">
              {{__label(MASTERDATA['IPDMOFRVIIM'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMOFRVIIM'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRVIIMradio-' + 1" v-model="MASTERDATA['IPDMOFRVIIM'].Items[1].Value">
                  <label :for="'IPDMOFRVIIMradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMOFRVIIM'].Items, MASTERDATA['IPDMOFRVIIM'].Items[1])">{{__label(MASTERDATA['IPDMOFRVIIM'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRVIIM']">
            <td>
              {{__label(MASTERDATA['IPDMOFRVIIM'].Items[2])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRVIIMradio-' + 3" v-model="MASTERDATA['IPDMOFRVIIM'].Items[3].Value">
                  <label :for="'IPDMOFRVIIMradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMOFRVIIM'].Items, MASTERDATA['IPDMOFRVIIM'].Items[3])">{{__label(MASTERDATA['IPDMOFRVIIM'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRVIIM']">
            <td>
              {{__label(MASTERDATA['IPDMOFRVIIM'].Items[4])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRVIIMradio-' + 5" v-model="MASTERDATA['IPDMOFRVIIM'].Items[5].Value">
                  <label :for="'IPDMOFRVIIMradio-' + 5" @click="checkbox2Radio(MASTERDATA['IPDMOFRVIIM'].Items, MASTERDATA['IPDMOFRVIIM'].Items[5])">{{__label(MASTERDATA['IPDMOFRVIIM'].Items[5])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRVIIM']">
            <td>
              {{__label(MASTERDATA['IPDMOFRVIIM'].Items[6])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRVIIMradio-' + 7" v-model="MASTERDATA['IPDMOFRVIIM'].Items[7].Value">
                  <label :for="'IPDMOFRVIIMradio-' + 7" @click="checkbox2Radio(MASTERDATA['IPDMOFRVIIM'].Items, MASTERDATA['IPDMOFRVIIM'].Items[7])">{{__label(MASTERDATA['IPDMOFRVIIM'].Items[7])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRVIIM']">
            <td class="b-b-2">
              {{__label(MASTERDATA['IPDMOFRVIIM'].Items[8])}}
            </td>
            <td class="b-b-2">
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRVIIMradio-' + 9" v-model="MASTERDATA['IPDMOFRVIIM'].Items[9].Value">
                  <label :for="'IPDMOFRVIIMradio-' + 9" @click="checkbox2Radio(MASTERDATA['IPDMOFRVIIM'].Items, MASTERDATA['IPDMOFRVIIM'].Items[9])">N/A</label>
                </span>
              </div>
            </td>
          </tr>
          <!-- IPDMOFRHOAO -->
          <tr v-if="MASTERDATA['IPDMOFRHOAO']">
            <td class="p-r bg-head font-bold b-b-2" rowspan="10"><div class="text-rotate-90 no-wrap">{{__t('Noi_tru_san.tim_mach')}}</div></td>
            <td class="bg-head font-bold b-b-2" width="270" rowspan="4">
              {{__label(MASTERDATA['IPDMOFRHOAO'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMOFRHOAO'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRHOAOradio-' + 1" v-model="MASTERDATA['IPDMOFRHOAO'].Items[1].Value">
                  <label :for="'IPDMOFRHOAOradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMOFRHOAO'].Items, MASTERDATA['IPDMOFRHOAO'].Items[1])">{{__label(MASTERDATA['IPDMOFRHOAO'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRHOAO']">
            <td>
              {{__label(MASTERDATA['IPDMOFRHOAO'].Items[2])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRHOAOradio-' + 3" v-model="MASTERDATA['IPDMOFRHOAO'].Items[3].Value">
                  <label :for="'IPDMOFRHOAOradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMOFRHOAO'].Items, MASTERDATA['IPDMOFRHOAO'].Items[3])">{{__label(MASTERDATA['IPDMOFRHOAO'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRHOAO']">
            <td>
              {{__label(MASTERDATA['IPDMOFRHOAO'].Items[4])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRHOAOradio-' + 5" v-model="MASTERDATA['IPDMOFRHOAO'].Items[5].Value">
                  <label :for="'IPDMOFRHOAOradio-' + 5" @click="checkbox2Radio(MASTERDATA['IPDMOFRHOAO'].Items, MASTERDATA['IPDMOFRHOAO'].Items[5])">{{__label(MASTERDATA['IPDMOFRHOAO'].Items[5])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRHOAO']">
            <td class="b-b-2">
              {{__label(MASTERDATA['IPDMOFRHOAO'].Items[6])}}
            </td>
            <td class="b-b-2">
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRHOAOradio-' + 7" v-model="MASTERDATA['IPDMOFRHOAO'].Items[7].Value">
                  <label :for="'IPDMOFRHOAOradio-' + 7" @click="checkbox2Radio(MASTERDATA['IPDMOFRHOAO'].Items, MASTERDATA['IPDMOFRHOAO'].Items[7])">N/A</label>
                </span>
              </div>
            </td>
          </tr>
          <!-- IPDMOFRBPDP -->
          <tr v-if="MASTERDATA['IPDMOFRBPDP']">
            <td class="bg-head font-bold b-b-2" width="270" rowspan="3">
              {{__label(MASTERDATA['IPDMOFRBPDP'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMOFRBPDP'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRBPDPradio-' + 1" v-model="MASTERDATA['IPDMOFRBPDP'].Items[1].Value">
                  <label :for="'IPDMOFRBPDPradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMOFRBPDP'].Items, MASTERDATA['IPDMOFRBPDP'].Items[1])">{{__label(MASTERDATA['IPDMOFRBPDP'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRBPDP']">
            <td>
              {{__label(MASTERDATA['IPDMOFRBPDP'].Items[2])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRBPDPradio-' + 3" v-model="MASTERDATA['IPDMOFRBPDP'].Items[3].Value">
                  <label :for="'IPDMOFRBPDPradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMOFRBPDP'].Items, MASTERDATA['IPDMOFRBPDP'].Items[3])">{{__label(MASTERDATA['IPDMOFRBPDP'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRBPDP']">
            <td class="b-b-2">
              {{__label(MASTERDATA['IPDMOFRBPDP'].Items[4])}}
            </td>
            <td class="b-b-2">
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRBPDPradio-' + 5" v-model="MASTERDATA['IPDMOFRBPDP'].Items[5].Value">
                  <label :for="'IPDMOFRBPDPradio-' + 5" @click="checkbox2Radio(MASTERDATA['IPDMOFRBPDP'].Items, MASTERDATA['IPDMOFRBPDP'].Items[5])">N/A</label>
                </span>
              </div>
            </td>
          </tr>
          <!-- IPDMOFRDIZZ -->
          <tr v-if="MASTERDATA['IPDMOFRDIZZ']">
            <td class="bg-head font-bold b-b-2" width="270" rowspan="3">
              {{__label(MASTERDATA['IPDMOFRDIZZ'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMOFRDIZZ'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRDIZZradio-' + 1" v-model="MASTERDATA['IPDMOFRDIZZ'].Items[1].Value">
                  <label :for="'IPDMOFRDIZZradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMOFRDIZZ'].Items, MASTERDATA['IPDMOFRDIZZ'].Items[1])">{{__label(MASTERDATA['IPDMOFRDIZZ'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRDIZZ']">
            <td>
              {{__label(MASTERDATA['IPDMOFRDIZZ'].Items[2])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRDIZZradio-' + 3" v-model="MASTERDATA['IPDMOFRDIZZ'].Items[3].Value">
                  <label :for="'IPDMOFRDIZZradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMOFRDIZZ'].Items, MASTERDATA['IPDMOFRDIZZ'].Items[3])">{{__label(MASTERDATA['IPDMOFRDIZZ'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRDIZZ']">
            <td class="b-b-2">
              {{__label(MASTERDATA['IPDMOFRDIZZ'].Items[4])}}
            </td>
            <td class="b-b-2">
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRDIZZradio-' + 5" v-model="MASTERDATA['IPDMOFRDIZZ'].Items[5].Value">
                  <label :for="'IPDMOFRDIZZradio-' + 5" @click="checkbox2Radio(MASTERDATA['IPDMOFRDIZZ'].Items, MASTERDATA['IPDMOFRDIZZ'].Items[5])">N/A</label>
                </span>
              </div>
            </td>
          </tr>
          <!-- IPDMOFRPOHE -->
          <tr v-if="MASTERDATA['IPDMOFRPOHE']">
            <td class="p-r bg-head font-bold b-b-2" rowspan="8"><div class="text-rotate-90 no-wrap">{{__t('Noi_tru_san.chay_mau')}}</div></td>
            <td class="bg-head font-bold b-b-2" width="270" rowspan="5">
              {{__label(MASTERDATA['IPDMOFRPOHE'])}}
            </td>
            <td>
              <div class="ul-nomargin" v-html="__label(MASTERDATA['IPDMOFRPOHE'].Items[0])"></div>
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRPOHEradio-' + 1" v-model="MASTERDATA['IPDMOFRPOHE'].Items[1].Value">
                  <label :for="'IPDMOFRPOHEradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMOFRPOHE'].Items, MASTERDATA['IPDMOFRPOHE'].Items[1])">{{__label(MASTERDATA['IPDMOFRPOHE'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRPOHE']">
            <td>
              <div class="ul-nomargin" v-html="__label(MASTERDATA['IPDMOFRPOHE'].Items[2])"></div>
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRPOHEradio-' + 3" v-model="MASTERDATA['IPDMOFRPOHE'].Items[3].Value">
                  <label :for="'IPDMOFRPOHEradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMOFRPOHE'].Items, MASTERDATA['IPDMOFRPOHE'].Items[3])">{{__label(MASTERDATA['IPDMOFRPOHE'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRPOHE']">
            <td>
              <div class="ul-nomargin" v-html="__label(MASTERDATA['IPDMOFRPOHE'].Items[4])"></div>
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRPOHEradio-' + 5" v-model="MASTERDATA['IPDMOFRPOHE'].Items[5].Value">
                  <label :for="'IPDMOFRPOHEradio-' + 5" @click="checkbox2Radio(MASTERDATA['IPDMOFRPOHE'].Items, MASTERDATA['IPDMOFRPOHE'].Items[5])">{{__label(MASTERDATA['IPDMOFRPOHE'].Items[5])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRPOHE']">
            <td>
              <div class="ul-nomargin" v-html="__label(MASTERDATA['IPDMOFRPOHE'].Items[6])"></div>
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRPOHEradio-' + 7" v-model="MASTERDATA['IPDMOFRPOHE'].Items[7].Value">
                  <label :for="'IPDMOFRPOHEradio-' + 7" @click="checkbox2Radio(MASTERDATA['IPDMOFRPOHE'].Items, MASTERDATA['IPDMOFRPOHE'].Items[7])">{{__label(MASTERDATA['IPDMOFRPOHE'].Items[7])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRPOHE']">
            <td class="b-b-2">
              <div class="ul-nomargin" v-html="__label(MASTERDATA['IPDMOFRPOHE'].Items[8])"></div>
            </td>
            <td class="b-b-2">
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRPOHEradio-' + 9" v-model="MASTERDATA['IPDMOFRPOHE'].Items[9].Value">
                  <label :for="'IPDMOFRPOHEradio-' + 9" @click="checkbox2Radio(MASTERDATA['IPDMOFRPOHE'].Items, MASTERDATA['IPDMOFRPOHE'].Items[9])">N/A</label>
                </span>
              </div>
            </td>
          </tr>
          <!-- IPDMOFRAPAO -->
          <tr v-if="MASTERDATA['IPDMOFRAPAO']">
            <td class="bg-head font-bold b-b-2" width="270" rowspan="3">
              {{__label(MASTERDATA['IPDMOFRAPAO'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMOFRAPAO'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRAPAOradio-' + 1" v-model="MASTERDATA['IPDMOFRAPAO'].Items[1].Value">
                  <label :for="'IPDMOFRAPAOradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMOFRAPAO'].Items, MASTERDATA['IPDMOFRAPAO'].Items[1])">{{__label(MASTERDATA['IPDMOFRAPAO'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRAPAO']">
            <td>
              {{__label(MASTERDATA['IPDMOFRAPAO'].Items[2])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRAPAOradio-' + 3" v-model="MASTERDATA['IPDMOFRAPAO'].Items[3].Value">
                  <label :for="'IPDMOFRAPAOradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMOFRAPAO'].Items, MASTERDATA['IPDMOFRAPAO'].Items[3])">{{__label(MASTERDATA['IPDMOFRAPAO'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRAPAO']">
            <td class="b-b-2">
              {{__label(MASTERDATA['IPDMOFRAPAO'].Items[4])}}
            </td>
            <td class="b-b-2">
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRAPAOradio-' + 5" v-model="MASTERDATA['IPDMOFRAPAO'].Items[5].Value">
                  <label :for="'IPDMOFRAPAOradio-' + 5" @click="checkbox2Radio(MASTERDATA['IPDMOFRAPAO'].Items, MASTERDATA['IPDMOFRAPAO'].Items[5])">N/A</label>
                </span>
              </div>
            </td>
          </tr>
          <!-- IPDMOFRNITE -->
          <tr v-if="MASTERDATA['IPDMOFRNITE']">
            <td class="p-r bg-head font-bold b-b-2" rowspan="5"><div class="text-rotate-90" style="width: 150px; white-space: normal; text-align: center;">{{__t('Noi_tru_san.chuc_nang_than_kinh_gay_te')}}</div></td>
            <td class="bg-head font-bold b-b-2" width="270" rowspan="5">
              {{__label(MASTERDATA['IPDMOFRNITE'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMOFRNITE'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRNITEradio-' + 1" v-model="MASTERDATA['IPDMOFRNITE'].Items[1].Value">
                  <label :for="'IPDMOFRNITEradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMOFRNITE'].Items, MASTERDATA['IPDMOFRNITE'].Items[1])">{{__label(MASTERDATA['IPDMOFRNITE'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRNITE']">
            <td>
              {{__label(MASTERDATA['IPDMOFRNITE'].Items[2])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRNITEradio-' + 3" v-model="MASTERDATA['IPDMOFRNITE'].Items[3].Value">
                  <label :for="'IPDMOFRNITEradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMOFRNITE'].Items, MASTERDATA['IPDMOFRNITE'].Items[3])">{{__label(MASTERDATA['IPDMOFRNITE'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRNITE']">
            <td>
              {{__label(MASTERDATA['IPDMOFRNITE'].Items[4])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRNITEradio-' + 5" v-model="MASTERDATA['IPDMOFRNITE'].Items[5].Value">
                  <label :for="'IPDMOFRNITEradio-' + 5" @click="checkbox2Radio(MASTERDATA['IPDMOFRNITE'].Items, MASTERDATA['IPDMOFRNITE'].Items[5])">{{__label(MASTERDATA['IPDMOFRNITE'].Items[5])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRNITE']">
            <td>
              {{__label(MASTERDATA['IPDMOFRNITE'].Items[6])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRNITEradio-' + 7" v-model="MASTERDATA['IPDMOFRNITE'].Items[7].Value">
                  <label :for="'IPDMOFRNITEradio-' + 7" @click="checkbox2Radio(MASTERDATA['IPDMOFRNITE'].Items, MASTERDATA['IPDMOFRNITE'].Items[7])">{{__label(MASTERDATA['IPDMOFRNITE'].Items[7])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRNITE']">
            <td class="b-b-2">
              {{__label(MASTERDATA['IPDMOFRNITE'].Items[8])}}
            </td>
            <td class="b-b-2">
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRNITEradio-' + 9" v-model="MASTERDATA['IPDMOFRNITE'].Items[9].Value">
                  <label :for="'IPDMOFRNITEradio-' + 9" @click="checkbox2Radio(MASTERDATA['IPDMOFRNITE'].Items, MASTERDATA['IPDMOFRNITE'].Items[9])">N/A</label>
                </span>
              </div>
            </td>
          </tr>
          <!-- IPDMOFRATSL -->
          <tr v-if="MASTERDATA['IPDMOFRATSL']">
            <td class="p-r bg-head font-bold b-b-2" rowspan="5"><div class="text-rotate-90 no-wrap">{{__t('Noi_tru_san.van_dong')}}</div></td>
            <td class="bg-head font-bold b-b-2" width="270" rowspan="5">
              {{__label(MASTERDATA['IPDMOFRATSL'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMOFRATSL'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRATSLradio-' + 1" v-model="MASTERDATA['IPDMOFRATSL'].Items[1].Value">
                  <label :for="'IPDMOFRATSLradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMOFRATSL'].Items, MASTERDATA['IPDMOFRATSL'].Items[1])">{{__label(MASTERDATA['IPDMOFRATSL'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRATSL']">
            <td>
              {{__label(MASTERDATA['IPDMOFRATSL'].Items[2])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRATSLradio-' + 3" v-model="MASTERDATA['IPDMOFRATSL'].Items[3].Value">
                  <label :for="'IPDMOFRATSLradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMOFRATSL'].Items, MASTERDATA['IPDMOFRATSL'].Items[3])">{{__label(MASTERDATA['IPDMOFRATSL'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRATSL']">
            <td>
              {{__label(MASTERDATA['IPDMOFRATSL'].Items[4])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRATSLradio-' + 5" v-model="MASTERDATA['IPDMOFRATSL'].Items[5].Value">
                  <label :for="'IPDMOFRATSLradio-' + 5" @click="checkbox2Radio(MASTERDATA['IPDMOFRATSL'].Items, MASTERDATA['IPDMOFRATSL'].Items[5])">{{__label(MASTERDATA['IPDMOFRATSL'].Items[5])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRATSL']">
            <td>
              {{__label(MASTERDATA['IPDMOFRATSL'].Items[6])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRATSLradio-' + 7" v-model="MASTERDATA['IPDMOFRATSL'].Items[7].Value">
                  <label :for="'IPDMOFRATSLradio-' + 7" @click="checkbox2Radio(MASTERDATA['IPDMOFRATSL'].Items, MASTERDATA['IPDMOFRATSL'].Items[7])">{{__label(MASTERDATA['IPDMOFRATSL'].Items[7])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRATSL']">
            <td class="b-b-2">
              {{__label(MASTERDATA['IPDMOFRATSL'].Items[8])}}
            </td>
            <td class="b-b-2">
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRATSLradio-' + 9" v-model="MASTERDATA['IPDMOFRATSL'].Items[9].Value">
                  <label :for="'IPDMOFRATSLradio-' + 9" @click="checkbox2Radio(MASTERDATA['IPDMOFRATSL'].Items, MASTERDATA['IPDMOFRATSL'].Items[9])">N/A</label>
                </span>
              </div>
            </td>
          </tr>
          <!-- IPDMOFRNARC -->
          <tr v-if="MASTERDATA['IPDMOFRNARC']">
            <td class="p-r bg-head font-bold b-b-2" rowspan="7"><div class="text-rotate-90 no-wrap">{{__t('Noi_tru_san.thuoc')}}</div></td>
            <td class="bg-head font-bold b-b-2" width="270" rowspan="4">
              {{__label(MASTERDATA['IPDMOFRNARC'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMOFRNARC'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRNARCradio-' + 1" v-model="MASTERDATA['IPDMOFRNARC'].Items[1].Value">
                  <label :for="'IPDMOFRNARCradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMOFRNARC'].Items, MASTERDATA['IPDMOFRNARC'].Items[1])">{{__label(MASTERDATA['IPDMOFRNARC'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRNARC']">
            <td>
              {{__label(MASTERDATA['IPDMOFRNARC'].Items[2])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRNARCradio-' + 3" v-model="MASTERDATA['IPDMOFRNARC'].Items[3].Value">
                  <label :for="'IPDMOFRNARCradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMOFRNARC'].Items, MASTERDATA['IPDMOFRNARC'].Items[3])">{{__label(MASTERDATA['IPDMOFRNARC'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRNARC']">
            <td>
              {{__label(MASTERDATA['IPDMOFRNARC'].Items[4])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRNARCradio-' + 5" v-model="MASTERDATA['IPDMOFRNARC'].Items[5].Value">
                  <label :for="'IPDMOFRNARCradio-' + 5" @click="checkbox2Radio(MASTERDATA['IPDMOFRNARC'].Items, MASTERDATA['IPDMOFRNARC'].Items[5])">{{__label(MASTERDATA['IPDMOFRNARC'].Items[5])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRNARC']">
            <td class="b-b-2">
              {{__label(MASTERDATA['IPDMOFRNARC'].Items[6])}}
            </td>
            <td class="b-b-2">
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRNARCradio-' + 7" v-model="MASTERDATA['IPDMOFRNARC'].Items[7].Value">
                  <label :for="'IPDMOFRNARCradio-' + 7" @click="checkbox2Radio(MASTERDATA['IPDMOFRNARC'].Items, MASTERDATA['IPDMOFRNARC'].Items[7])">N/A</label>
                </span>
              </div>
            </td>
          </tr>
          <!-- IPDMOFRANHY -->
          <tr v-if="MASTERDATA['IPDMOFRANHY']">
            <td class="bg-head font-bold b-b-2" width="270" rowspan="3">
              {{__label(MASTERDATA['IPDMOFRANHY'])}}
            </td>
            <td>
              {{__label(MASTERDATA['IPDMOFRANHY'].Items[0])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRANHYradio-' + 1" v-model="MASTERDATA['IPDMOFRANHY'].Items[1].Value">
                  <label :for="'IPDMOFRANHYradio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDMOFRANHY'].Items, MASTERDATA['IPDMOFRANHY'].Items[1])">{{__label(MASTERDATA['IPDMOFRANHY'].Items[1])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRANHY']">
            <td>
              {{__label(MASTERDATA['IPDMOFRANHY'].Items[2])}}
            </td>
            <td>
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRANHYradio-' + 3" v-model="MASTERDATA['IPDMOFRANHY'].Items[3].Value">
                  <label :for="'IPDMOFRANHYradio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDMOFRANHY'].Items, MASTERDATA['IPDMOFRANHY'].Items[3])">{{__label(MASTERDATA['IPDMOFRANHY'].Items[3])}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['IPDMOFRANHY']">
            <td class="b-b-2">
              {{__label(MASTERDATA['IPDMOFRANHY'].Items[4])}}
            </td>
            <td class="b-b-2">
              <div class="group-radio full-width">
                <span>
                  <input type="checkbox" :id="'IPDMOFRANHYradio-' + 5" v-model="MASTERDATA['IPDMOFRANHY'].Items[5].Value">
                  <label :for="'IPDMOFRANHYradio-' + 5" @click="checkbox2Radio(MASTERDATA['IPDMOFRANHY'].Items, MASTERDATA['IPDMOFRANHY'].Items[5])">N/A</label>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="bg-head font-bold" width="270" colspan="3">
              {{__t('Tổng điểm')}}
            </td>
            <td><label class="label-yellow">{{total}}</label></td>
          </tr>
          <tr>
            <td class="bg-head font-bold" width="270"  colspan="3">
              {{__t('Phân loại (Nguy cơ ngã)')}}
            </td>
            <td><label class="label-yellow">{{__t(LEVELS[level])}}</label></td>
          </tr>
          <tr>
            <th colspan="3">{{__t('Can thiệp tương ứng với phân loại nguy cơ ngã')}}</th>
            <th class="no-wrap">{{__t('Tích thực hiện')}}</th>
          </tr>
          <template v-for="dd in MDCODES2">
            <template v-if="MASTERDATA[dd]">
              <tr :data="item" :key="index + item.Code" v-for="(item, index) in MASTERDATA[dd].Items.filter(e => e.Data[level] === '1')">
                <td colspan="2" v-if="index === 0" :rowspan="MASTERDATA[dd].Items.filter(e => e.Data[level] === '1').length" class="bg-head font-bold" width="270">
                  {{__label(MASTERDATA[dd])}}
                </td>
                <td>{{__label(item)}}</td>
                <td>
                  <label class="container-checkbox reset" :for="dd + 'IPDMOFRSAD-' + index">
                    <input type="checkbox" :id="dd + 'IPDMOFRSAD-' + index" v-model="item.Value">
                    <span class="checkmark"></span>
                  </label>
                </td>
              </tr>
            </template>
          </template>
        </table>
        <br/>
        <button v-if="!readonly && (isNew ? true : DataSubmit.CreatedBy === getUser())" class="btn btn-yellow-gradient btn-block" v-shortkey="['ctrl', 's']" @shortkey="save()" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
      </div>
    </modal>
  </div>
</template>
<script>
import FallRiskAssessment from '@/services/IPD/FallRiskAssessment'
import MixinMasterData from '@/mixins/masterdata.js'
import NProgress from 'nprogress'
import _ from 'lodash'

const MODAL_WIDTH = 980
// const age = 15
const MDCODES1 = [
  'IPDMOFRHOFA',
  'IPDMOFRHOBR',
  'IPDMOFRVIIM'
]
const MDCODES2 = [
  'IPDMOFRHOAO',
  'IPDMOFRBPDP',
  'IPDMOFRDIZZ'
]
const MDCODES3 = [
  'IPDMOFRPOHE',
  'IPDMOFRAPAO'
]
const MDCODES4 = [
  'IPDMOFRNITE'
]
const MDCODES5 = [
  'IPDMOFRATSL'
]
const MDCODES6 = [
  'IPDMOFRNARC',
  'IPDMOFRANHY'
]
export default {
  name: 'Morse',
  props: ['readonly'],
  mixins: [MixinMasterData],
  data () {
    return {
      DataSubmit: {
      },
      dataMaster: {},
      modalWidth: MODAL_WIDTH,
      ageIndex: [0, 1],
      LEVELS: ['Noi_tru_san.thap', 'Noi_tru_san.trung_binh', 'Noi_tru_san.cao'],
      formId: null,
      MDCODES2: [
        // 'IPDMOFRSAD',
        // 'IPDMOFRIRP',
        // 'IPDMOFRCON',
        // 'IPDMOFRAWT',
        // 'IPDMOFRAWA',
        // 'IPDMOFROOB',
        // 'IPDMOFRBEA',
        // 'IPDMOFRICO',
        // update
        'IPDMOFRIRP',
        'IPDMOFRCON',
        'IPDMOFRAWS',
        'IPDMOFRAWW',
        'IPDMOFRPAA'
      ],
      isNew: true
    }
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
    this.getTotal()
    this.getMasterDatas({Form: 'IPDMOFR'}, () => {
    })
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
      var totals = [MDCODES1, MDCODES2, MDCODES3, MDCODES4, MDCODES5, MDCODES6].map(items => {
        return _.max(items.map(code => {
          if (this.MASTERDATA[code]) {
            return _.max(this.MASTERDATA[code].Items.map(item => {
              return (item.DataType === 'Radio' && item.Data && item.Value) ? this.parseInt(item.Data) : 0
            }))
          } else {
            return 0
          }
        }))
      })
      return _.sum(totals)
    },
    level: function () {
      var level = 0
      var total = this.total
      if (total >= 3 && total <= 4) {
        level = 1
      }
      if (total >= 5) {
        level = 2
      }
      return level
    }
  },
  methods: {
    open (formId) {
      this.formId = formId
      // this.getData()
      this.resetMdDataValue()
      if (this.formId) {
        this.isNew = false
        this.getData()
      } else {
        this.$modal.show('MasterDataObPopup')
        this.setAgeIndex()
      }
    },
    setAgeIndex () {
      // this.MASTERDATA['IPDMMFSAGE'].Items[this.ageIndex[1]].Value = true
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            if (code === 'IPDMOFRIRPUAC' && this.age > 16) {
              item.Data = '9999'
            }
            if (code === 'IPDMOFRCONPRC' && this.age <= 16) {
              item.Data = '9999'
            }
          })
        }
      }
    },
    getData () {
      new FallRiskAssessment().find('Obstetric/Detail/' + this.formId).then(response => {
        this.DataSubmit = response
        this.loaded = true
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
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        setTimeout(() => {
          this.edited = false
        }, 100)
        this.$modal.show('MasterDataObPopup')
        this.setAgeIndex()
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
            var val = item.Value
            if (this.MDCODES2.includes(property)) {
              val = item.Value && item.Data[this.level] === '1'
              if (val) {
                this.DataSubmit.Intervention.push({
                  ViName: item.ViName,
                  EnName: item.EnName,
                  Code: item.Code,
                  Group: {
                    ViName: this.MASTERDATA[property].ViName,
                    EnName: this.MASTERDATA[property].EnName,
                    Code: item.Group
                  }
                })
              }
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      var url = 'Obstetric/Create/' + this.$route.params.Id
      if (this.formId) {
        url = 'Obstetric/Detail/' + this.formId
      }
      this.DataSubmit.Intervention = JSON.stringify(this.DataSubmit.Intervention)
      new FallRiskAssessment().update(url, this.DataSubmit).then(response => {
        this.toastedSuccess()
        setTimeout(() => {
          this.reload()
        }, 500)
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    handleBack () {
      this.isNew = true
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopupBack()
      } else {
        this.$modal.hide('MasterDataObPopup')
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
              this.$modal.hide('MasterDataObPopup')
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn btn-warning',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>
<style lang="css" scoped>
.sync-ed-header {
  position: fixed;
  width: 975px;
  z-index: 1000;
}
.sync-ed-box {
  margin-top: 43px;
}
</style>
