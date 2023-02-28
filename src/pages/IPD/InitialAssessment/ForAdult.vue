<template>
 <div>
  <div>
   <template v-if="loaded">
    <template v-if="DataSubmit">
     <div v-if="readonly && !checkTab">
      <ViewOnly :checkTab="checkTab" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" />
     </div>
     <div v-else-if="readonly && checkTab">
      <ViewOnlyChild :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" />
     </div>
     <div v-else>
      <!-- 1.Thông tin hành chính -->
      <div class="tbl-title" v-if="!checkTab">
       1. {{ __t("Thông tin hành chính") }}
      </div>
      <div class="tbl-title" v-else>
       1. {{ __t("InitialAssessment.label2") }}
      </div>
      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block1"
      >
        <!-- Vào khoa từ -->
        <tr v-if="MASTERDATA['IPDIAAUADFR']">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUADFR"]) }}</div>
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
              :code="MASTERDATA['IPDIAAUADFR'].Items[3].Code"
            />
            </div>
          </div>
          </td>
        </tr>
        <!-- Vận chuyển -->
        <tr v-if="MASTERDATA['IPDIAAUTRAN'] && !checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUTRAN"]) }}</th>
          <td>
          <MDRadio
            v-if="MASTERDATA['IPDIAAUTRAN']"
            v-model="MASTERDATA['IPDIAAUTRAN']"
          />
          </td>
        </tr>
        <!-- Giờ vào khoa -->
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
        <!-- Người khai thông tin -->
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
              :code="MASTERDATA['IPDIAAUINRF'].Items[2].Code"
            />
            </div>
          </div>
          </td>
        </tr>
        <!-- Người liên hệ khi cần -->
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
        <!-- Điện thoại -->
        <tr v-if="MASTERDATA['IPDIAAUPHON']">
          <th>{{ __label(MASTERDATA["IPDIAAUPHON"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <div>
            <!-- <MDNumberInput :decimal="true" :maxlength="20" v-if="DataSubmit.Version >= 10" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDIAAUPHON'].Items[0].Value"/> -->
            <!-- <VNumberInput
              v-if="DataSubmit.VersionApp >= 11"
              style="max-width: 169px;"
              class="m-0 form-control"
              v-model="MASTERDATA['IPDIAAUPHON'].Items[0].Value"
              :readonly="readonly"
              :maxlength="20"
              :placeholder="__t('Nhập')"
            /> -->
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
      <!-- 2.Đánh giá chung -->
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
        <tr v-if="MASTERDATA['IPDIAAUPULS'] && !checkTab">
          <th width="1">
          <div class="w160" v-if="DataSubmit.VersionApp >= 11">
            <div class="mb-5 no-wrap">{{ __t("Dấu hiệu sinh tồn") }}</div>
            <button v-if="check" class="btn btn-sync-data" @click="SyncVitalSignNew();">
            {{ __t("Lấy dữ liệu trong 24H") }}
            </button>
          </div>
          <div class="w160" v-else>
            <div class="mb-5 no-wrap">{{ __t("Dấu hiệu sinh tồn") }}</div>
            <button class="btn btn-sync-data" @click="SyncVitalSign();">
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
              i => i.Clinic === ''
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
              i => i.Clinic === ''
              )"
            >
              <div class="mb-5">
              <!-- <b>{{ __label(item) }}</b> -->
              <b>{{ __t("InitialAssessment.tho") }}</b>
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
            <!-- new -->
            <div class="w150 display-inline mr-10" v-if="IsExitTheOncologyMedicalRecord">
            <div>
              <div class="mb-5"><b>BSA</b><span class="note-text">(m2)</span></div>
              <div class="number-input number-input--inline">
              <input
                type="number"
                class="number-input__input form-control"
                readonly
                :value="bsaCalculation"
              />
              </div>
            </div>
            </div>
            <height-and-weight @copy="push2Wh" />
          </div>
          </td>
        </tr>
        <!-- dấu hiệu sinh tồn chil -->
        <tr v-else-if="MASTERDATA['IPDIAAUPULS'] && checkTab">
          <th width="1">
          <div class="w160">
            <div class="mb-5 no-wrap">{{ __t("Dấu hiệu sinh tồn") }}</div>
            <button class="btn btn-sync-data" @click="SyncVitalSign();">
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

            <!-- spo2 -->

            <div class="w150 display-inline mr-10" v-if="checkTab">
            <div
              :key="index"
              v-for="(item, index) in MASTERDATA['IPDIAAUSPO2'].Items"
            >
              <div class="mb-5">
              <b>{{ __label(item) }}</b>
              <span class="note-text">({{ __t("%") }})</span>
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
            <height-and-weight @copy="push2Wh" />
          </div>
          <div class="mt-5">
            <!-- {{MASTERDATA['IPDIAAUMESHEIGHT'].ViName}} -->
            <i> {{ __t("InitialAssessment.label4") }} </i>
          </div>
          </td>
        </tr>
        <!-- nhịp thở -->
        <tr v-if="MASTERDATA['IPDIAAURERA'] && checkTab">
          <th>
          {{ __label(MASTERDATA["IPDIAAURERA"])
          }}<span style="margin-left:2px" class="note-text">{{
            __t("InitialAssessment.label3")
          }}</span>
          </th>
          <td>
          <div class="flex-box flex-center">
            <div>
            <textarea-autosize
              rows="1"
              :placeholder="__t('Nhập')"
              class="form-control"
              v-model="MASTERDATA['IPDIAAURERA'].Items[0].Value"
            />
            </div>

            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAURERA'].Items.filter(
              i => i.Clinic === 'CHILDREN' && i.DataType === 'Checkbox'
            )"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAURERAcxo-' + index"
                v-model="item.Value"
                @change="changeRR(index, item.Code);"
              />
              <label :for="'IPDIAAURERAcxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
            <!--
            <div
              v-if="MASTERDATA['IPDIAAURERA'].Items[2].Value"
            >
            -->
            <b
            v-if="MASTERDATA['IPDIAAURERA'].Items[2].Value"
            style="margin-left:20px"
            class="no-wrap mgl-5 mgr-5"
            >{{ __t("InitialAssessment.label6") }}</b
            >
            <div
            style="flex-grow: 1"
            class="ml-10"
            v-if="MASTERDATA['IPDIAAURERA'].Items[2].Value"
            >
            <textarea-autosize
              class="form-control"
              rows="1"
              :placeholder="__t('Nhập')"
              v-model="MASTERDATA['IPDIAAURERA'].Items[3].Value"
            />
            </div>
            <!--
            <textarea-autosize
              v-if="MASTERDATA['IPDIAAURERA'].Items[2].Value"
              rows="1"
              :placeholder="__t('Nhập')"
              class="form-control full-width"
              v-model="MASTERDATA['IPDIAAURERA'].Items[3].Value"
            />
            -->
            <!-- </div> -->
          </div>
          </td>
        </tr>

        <!-- thân nhiệt -->
        <tr v-if="MASTERDATA['IPDIAAUTEMP'] && checkTab">
          <th>
          {{ __label(MASTERDATA["IPDIAAUTEMP"])
          }}<span style="margin-left:2px" class="note-text">(°C)</span>
          </th>
          <td>
          <div class="flex-box flex-center">
            <div class="flex-box flex-center">
            <textarea-autosize
              rows="1"
              :placeholder="__t('Nhập')"
              class="form-control"
              v-model="MASTERDATA['IPDIAAUTEMP'].Items[0].Value"
            />
            </div>

            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUTEMP'].Items.filter(
              i => i.Clinic === 'CHILDREN' && i.DataType === 'Checkbox'
            )"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUTEMPcxo-' + index"
                v-model="item.Value"
                @change="changeTemp(index, item.Code);"
              />
              <label :for="'IPDIAAUTEMPcxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
            <b
            v-if="MASTERDATA['IPDIAAUTEMP'].Items[2].Value"
            style="margin-left:20px"
            class="no-wrap mgl-5 mgr-5"
            >{{ __t("InitialAssessment.label6") }}</b
            >
            <div
            style="flex-grow: 1"
            class="flex-box flex-center ml-10"
            v-if="MASTERDATA['IPDIAAUTEMP'].Items[2].Value"
            >
            <textarea-autosize
              rows="1"
              :placeholder="__t('Nhập')"
              class="form-control"
              v-model="MASTERDATA['IPDIAAUTEMP'].Items[3].Value"
            />
            </div>
          </div>
          </td>
        </tr>

        <!-- thể trạng -->
        <tr v-if="MASTERDATA['IPDIAAUBOBU'] && !checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUBOBU"]) }}</th>
          <td>
          <MDRadio
            v-if="MASTERDATA['IPDIAAUBOBU']"
            v-model="MASTERDATA['IPDIAAUBOBU']"
          />
          </td>
        </tr>
        <!-- vệ sinh cơ thể -->
        <tr v-if="MASTERDATA['IPDIAAUHYGI'] && !checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUHYGI"]) }}</th>
          <td>
          <MDRadio
            :splitData="true"
            v-if="MASTERDATA['IPDIAAUHYGI'] && DataSubmit.VersionApp >= 11"
            v-model="MASTERDATA['IPDIAAUHYGI']"
          />
          <MDRadio
            v-else
            v-model="MASTERDATA['IPDIAAUHYGI']"
          />
          </td>
        </tr>
        <!-- vệ sinh cơ thể -->
        <tr v-if="MASTERDATA['IPDIAAUHYGI'] && checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUHYGI"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUHYGI'].Items.filter(
              i => i.DataType !== 'Text'
            )"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                @click="handleClickIPDIAAUHYGI(index);"
                type="checkbox"
                :id="'IPDIAAUHYGIcxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUHYGIcxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
            <div
            style="flex-grow: 1"
            class="flex-box flex-center ml-10"
            v-if="MASTERDATA['IPDIAAUHYGI'].Items[2].Value"
            >
            <textarea-autosize
              rows="1"
              :placeholder="__t('Nhập')"
              class="form-control"
              v-model="MASTERDATA['IPDIAAUHYGI'].Items[3].Value"
            />
            </div>
          </div>
          </td>
        </tr>

        <!-- răng miệng -->
        <tr v-if="MASTERDATA['IPDIAAUTEET'] && checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUTEET"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUTEET'].Items.filter(
              i => i.DataType !== 'Text'
            )"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUTEETcxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUTEETcxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
            <div
            style="flex-grow: 1"
            class="flex-box flex-center ml-10"
            v-if="MASTERDATA['IPDIAAUTEET'].Items[3].Value"
            >
            <textarea-autosize
              rows="1"
              :placeholder="__t('Nhập')"
              class="form-control"
              v-model="MASTERDATA['IPDIAAUTEET'].Items[4].Value"
            />
            </div>
          </div>
          </td>
        </tr>

        <tr v-else-if="MASTERDATA['IPDIAAUTEET'] && !checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUTEET"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUTEET'].Items.filter(
              i => i.Clinic !== 'CHILDREN'
            )"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUTEETcxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUTEETcxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
          </div>
          </td>
        </tr>
        <!-- Phù -->
        <tr v-if="MASTERDATA['IPDIAAUEDEM']">
          <th>{{ __label(MASTERDATA["IPDIAAUEDEM"]) }}</th>
          <td>
          <div class="flex-box">
            <div>
            <MDRadio
              @onChange="setIPDIAAUITV2('IPDIAAUEDEM');"
              v-if="MASTERDATA['IPDIAAUEDEM']"
              v-model="MASTERDATA['IPDIAAUEDEM']"
            />
            </div>
            <div
            style="flex-grow: 1"
            class="ml-10"
            v-if="MASTERDATA['IPDIAAUEDEM'].Items[1].Value"
            >
            <textarea-autosize
              class="form-control"
              rows="3"
              :placeholder="__t('Mô tả vị trí phù')"
              v-model="MASTERDATA['IPDIAAUEDEM'].Items[2].Value"
              :code="MASTERDATA['IPDIAAUEDEM'].Items[2].Code"
            />
            </div>
          </div>
          </td>
        </tr>
        <tr
          v-if="MASTERDATA['IPDIAAUALLE']"
          class="borded-bottom highlighted-radio"
        >
          <th>{{ __label(MASTERDATA["IPDIAAUALLE"]) }}</th>
          <td>
          <MDAllergies
            v-model="MASTERDATA['IPDIAAUALLE']"
            @onChange="setIPDIAAUITV2('IPDIAAUALLE');"
          />
          </td>
        </tr>
        <tr
          v-if="MASTERDATA['IPDIAAUMENS'] && DataSubmit.Gender !== 1 && !checkTab"
        >
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
            <MDRadio
              v-if="MASTERDATA['IPDIAAUMENS']"
              v-model="MASTERDATA['IPDIAAUMENS']"
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
            <MDRadio
              v-if="MASTERDATA['IPDIAAUPREG']"
              v-model="MASTERDATA['IPDIAAUPREG']"
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
            <MDRadio
              v-if="MASTERDATA['IPDIAAUBRFE']"
              v-model="MASTERDATA['IPDIAAUBRFE']"
            />
            </div>
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUITV1'] && !checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUITV1"]) }}</th>
          <td>
          <div
            :class="{
            'flex-box flex-center': true,
            'disabel-table':
              this.MASTERDATA['IPDIAAUALLE'].Items[1].Value ||
              this.MASTERDATA['IPDIAAUEDEM'].Items[1].Value
            }"
          >
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV1'].Items.filter(
              i => i.Clinic !== 'CHILDREN'
            )"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV1cxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV1cxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUITV1'] && checkTab">
          <th>{{ __t("InitialAssessment.label5") }}</th>
          <td>
          <div
            :class="{
            'flex-box flex-center': true,
            'disabel-table':
              this.MASTERDATA['IPDIAAUTEMP'].Items[2].Value ||
              this.MASTERDATA['IPDIAAURERA'].Items[2].Value
            }"
          >
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV1'].Items.filter(
              i => i.Clinic === 'CHILDREN'
            )"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV1cxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV1cxo-' + index"></label>
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
      <!-- 3.Đánh giá đau -->
      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block3"
       v-if="DataSubmit.VersionApp >= 11"
      >
        <tr>
          <td colspan="2" class="no-padding" v-if="DataSubmit.VersionApp >= 11">
            <div class="tbl-title" v-if="!checkTab">
              3. {{ __t("Đánh giá đau") }}
            </div>
            <div class="tbl-title" v-else>
              3. {{ __t("InitialAssessment.label7") }}
            </div>
          </td>
          <td colspan="2" class="no-padding" v-else>
            <div class="tbl-title" v-if="!checkTab">
              3. {{ __t("Đánh giá đau và nguy cơ ngã theo thang điểm Morse") }}
            </div>
            <div class="tbl-title" v-else>
              3. {{ __t("InitialAssessment.label7") }}
            </div>
          </td>
        </tr>
        <!-- Đau -->
        <tr v-if="MASTERDATA['IPDIAAUPAIN']">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUPAIN"]) }}</div>
          </th>
          <td>
          <div class="group-radio">
            <MDRadio
            v-if="MASTERDATA['IPDIAAUPAIN']"
            v-model="MASTERDATA['IPDIAAUPAIN']"
            />
          </div>
          </td>
        </tr>
        <!-- Điểm đau -->
        <tr
          v-if="
          MASTERDATA['IPDIAAUPASC'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUPASC"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <V2Select
            :placeholder="__t('Thang điểm')"
            v-model="MASTERDATA['IPDIAAUPASC'].Items[0].Value"
            :items="JSON.parse(MASTERDATA['IPDIAAUPASC'].Items[0].Data)"
            />
            <V2Select
            @onChange="setIPDIAAUITV2('IPDIAAUPASC');"
            :placeholder="__t('Chọn')"
            v-model="MASTERDATA['IPDIAAUPASC'].Items[1].Value"
            :items="PainscoreSelect"
            /><span class="ml-5">/ 10</span>
          </div>
          <div>
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUPIFCA'].Items"
            v-if="checkTab"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUPIFCAcxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUPIFCAcxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
          </div>
          </td>
        </tr>
        <!-- Ngày/ Thời điểm bắt đầu đau -->
        <tr
          v-if="
          MASTERDATA['IPDIAAUPASD'] &&
            !checkTab &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value
          "
        >
          <th width="">{{ __label(MASTERDATA["IPDIAAUPASD"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <input
            class="form-control w250"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUPASD'].Items[0].Value"
            />
            <span class="no-wrcap mgl-5 mgr-5 text-right">{{
            __label(MASTERDATA["IPDIAAUPADU"])
            }}</span>
            <input
            class="form-control w250"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUPADU'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <tr
          v-if="
          MASTERDATA['IPDIAAUPASD'] &&
            !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            checkTab
          "
        >
          <th width="">{{ __label(MASTERDATA["IPDIAAUPASD"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <input
            class="form-control w250"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUPASD'].Items[0].Value"
            />
            <span class="no-wrcap mgl-5 mgr-5 text-right">{{
            __label(MASTERDATA["IPDIAAUPADU"])
            }}</span>
            <input
            class="form-control w250"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUPADU'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <!-- Vị trí đau -->
        <tr
          v-if="
          MASTERDATA['IPDIAAUPALO'] &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            !checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUPALO"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="1"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUPALO'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <tr
          v-if="
          MASTERDATA['IPDIAAUPALO'] &&
            !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUPALO"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="1"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUPALO'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <!-- Tần suất đau -->
        <tr
          v-if="
          MASTERDATA['IPDIAAUPAFR'] &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            !checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUPAFR"]) }}</th>
          <td>
          <div class="flex-box">
            <div>
            <MDRadio
              v-if="MASTERDATA['IPDIAAUPAFR']"
              v-model="MASTERDATA['IPDIAAUPAFR']"
            />
            </div>
            <div
            style="flex-grow: 1"
            class="ml-10"
            v-if="MASTERDATA['IPDIAAUPAFR'].Items[3].Value"
            >
            <textarea-autosize
              class="form-control"
              rows="3"
              :placeholder="__t('Nhập')"
              v-model="MASTERDATA['IPDIAAUPAFR'].Items[4].Value"
              :code="MASTERDATA['IPDIAAUPAFR'].Items[4].Code"
            />
            </div>
          </div>
          </td>
        </tr>
        <tr
          v-if="
          MASTERDATA['IPDIAAUPAFR'] &&
            !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUPAFR"]) }}</th>
          <td>
          <div class="flex-box">
            <div>
            <MDRadio
              v-if="MASTERDATA['IPDIAAUPAFR']"
              v-model="MASTERDATA['IPDIAAUPAFR']"
            />
            </div>
            <div
            style="flex-grow: 1"
            class="ml-10"
            v-if="MASTERDATA['IPDIAAUPAFR'].Items[3].Value"
            >
            <textarea-autosize
              class="form-control"
              rows="3"
              :placeholder="__t('Nhập')"
              v-model="MASTERDATA['IPDIAAUPAFR'].Items[4].Value"
              :code="MASTERDATA['IPDIAAUPAFR'].Items[4].Code"
            />
            </div>
          </div>
          </td>
        </tr>
        <!-- Tính chất đau -->
        <tr
          v-if="
          MASTERDATA['IPDIAAUPACH'] &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            !checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUPACH"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="3"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUPACH'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <tr
          v-if="
          MASTERDATA['IPDIAAUPACH'] &&
            !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUPACH"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="3"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUPACH'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <!-- Các yếu tố làm đau hơn -->
        <tr
          v-if="
          MASTERDATA['IPDIAAUWMPW'] &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            !checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUWMPW"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="3"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUWMPW'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <tr
          v-if="
          MASTERDATA['IPDIAAUWMPW'] &&
            !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUWMPW"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="3"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUWMPW'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <!-- Các yếu tố làm bớt đau -->
        <tr
          v-if="
          MASTERDATA['IPDIAAUWMPB'] &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            !checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUWMPB"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="3"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUWMPB'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <tr
          v-if="
          MASTERDATA['IPDIAAUWMPB'] &&
            !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUWMPB"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="3"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUWMPB'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <tr
          v-if="
          MASTERDATA['IPDIAAUITV2'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value
          "
        >
          <th>{{ __t("InitialAssessment.label12") }}</th>
          <td>
          <div class="flex-box flex-center disabel-table">
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV2'].Items"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV2cxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV2cxo-' + index"></label>
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
       v-else
      >
        <tr>
          <td colspan="2" class="no-padding">
            <div class="tbl-title" v-if="!checkTab">
              3. {{ __t("Đánh giá đau và nguy cơ ngã theo thang điểm Morse") }}
            </div>
            <div class="tbl-title" v-else>
              3. {{ __t("InitialAssessment.label7") }}
            </div>
          </td>
        </tr>
        <!-- Đau -->
        <tr v-if="MASTERDATA['IPDIAAUPAIN']">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUPAIN"]) }}</div>
          </th>
          <td>
          <div class="group-radio">
            <MDRadio
            v-if="MASTERDATA['IPDIAAUPAIN']"
            v-model="MASTERDATA['IPDIAAUPAIN']"
            />
          </div>
          </td>
        </tr>
        <!-- Điểm đau -->
        <tr
          v-if="
          MASTERDATA['IPDIAAUPASC'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUPASC"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <V2Select
            :placeholder="__t('Thang điểm')"
            v-model="MASTERDATA['IPDIAAUPASC'].Items[0].Value"
            :items="JSON.parse(MASTERDATA['IPDIAAUPASC'].Items[0].Data)"
            />
            <V2Select
            @onChange="setIPDIAAUITV2('IPDIAAUPASC');"
            :placeholder="__t('Chọn')"
            v-model="MASTERDATA['IPDIAAUPASC'].Items[1].Value"
            :items="PainscoreSelect"
            /><span class="ml-5">/ 10</span>
          </div>
          <div>
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUPIFCA'].Items"
            v-if="checkTab"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUPIFCAcxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUPIFCAcxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
          </div>
          </td>
        </tr>
        <!-- Ngày/ Thời điểm bắt đầu đau -->
        <tr
          v-if="
          MASTERDATA['IPDIAAUPASD'] &&
            !checkTab &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value
          "
        >
          <th width="">{{ __label(MASTERDATA["IPDIAAUPASD"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <input
            class="form-control w250"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUPASD'].Items[0].Value"
            />
            <span class="no-wrcap mgl-5 mgr-5 text-right">{{
            __label(MASTERDATA["IPDIAAUPADU"])
            }}</span>
            <input
            class="form-control w250"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUPADU'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <tr
          v-if="
          MASTERDATA['IPDIAAUPASD'] &&
            !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            checkTab
          "
        >
          <th width="">{{ __label(MASTERDATA["IPDIAAUPASD"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <input
            class="form-control w250"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUPASD'].Items[0].Value"
            />
            <span class="no-wrcap mgl-5 mgr-5 text-right">{{
            __label(MASTERDATA["IPDIAAUPADU"])
            }}</span>
            <input
            class="form-control w250"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDIAAUPADU'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <!-- Vị trí đau -->
        <tr
          v-if="
          MASTERDATA['IPDIAAUPALO'] &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            !checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUPALO"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="1"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUPALO'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <tr
          v-if="
          MASTERDATA['IPDIAAUPALO'] &&
            !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUPALO"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="1"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUPALO'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <!-- Tần suất đau -->
        <tr
          v-if="
          MASTERDATA['IPDIAAUPAFR'] &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            !checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUPAFR"]) }}</th>
          <td>
          <div class="flex-box">
            <div>
            <MDRadio
              v-if="MASTERDATA['IPDIAAUPAFR']"
              v-model="MASTERDATA['IPDIAAUPAFR']"
            />
            </div>
            <div
            style="flex-grow: 1"
            class="ml-10"
            v-if="MASTERDATA['IPDIAAUPAFR'].Items[3].Value"
            >
            <textarea-autosize
              class="form-control"
              rows="3"
              :placeholder="__t('Nhập')"
              v-model="MASTERDATA['IPDIAAUPAFR'].Items[4].Value"
              :code="MASTERDATA['IPDIAAUPAFR'].Items[4].Code"
            />
            </div>
          </div>
          </td>
        </tr>
        <tr
          v-if="
          MASTERDATA['IPDIAAUPAFR'] &&
            !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUPAFR"]) }}</th>
          <td>
          <div class="flex-box">
            <div>
            <MDRadio
              v-if="MASTERDATA['IPDIAAUPAFR']"
              v-model="MASTERDATA['IPDIAAUPAFR']"
            />
            </div>
            <div
            style="flex-grow: 1"
            class="ml-10"
            v-if="MASTERDATA['IPDIAAUPAFR'].Items[3].Value"
            >
            <textarea-autosize
              class="form-control"
              rows="3"
              :placeholder="__t('Nhập')"
              v-model="MASTERDATA['IPDIAAUPAFR'].Items[4].Value"
              :code="MASTERDATA['IPDIAAUPAFR'].Items[4].Code"
            />
            </div>
          </div>
          </td>
        </tr>
        <!-- Tính chất đau -->
        <tr
          v-if="
          MASTERDATA['IPDIAAUPACH'] &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            !checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUPACH"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="3"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUPACH'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <tr
          v-if="
          MASTERDATA['IPDIAAUPACH'] &&
            !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUPACH"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="3"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUPACH'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <!-- Các yếu tố làm đau hơn -->
        <tr
          v-if="
          MASTERDATA['IPDIAAUWMPW'] &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            !checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUWMPW"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="3"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUWMPW'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <tr
          v-if="
          MASTERDATA['IPDIAAUWMPW'] &&
            !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUWMPW"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="3"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUWMPW'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <!-- Các yếu tố làm bớt đau -->
        <tr
          v-if="
          MASTERDATA['IPDIAAUWMPB'] &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            !checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUWMPB"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="3"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUWMPB'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <tr
          v-if="
          MASTERDATA['IPDIAAUWMPB'] &&
            !MASTERDATA['IPDIAAUPIFCA'].Items[0].Value &&
            MASTERDATA['IPDIAAUPAIN'].Items[1].Value &&
            checkTab
          "
        >
          <th>{{ __label(MASTERDATA["IPDIAAUWMPB"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <textarea-autosize
            rows="3"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUWMPB'].Items[0].Value"
            />
          </div>
          </td>
        </tr>
        <tr
          v-if="
          MASTERDATA['IPDIAAUITV2'] && MASTERDATA['IPDIAAUPAIN'].Items[1].Value
          "
        >
          <th>{{ __t("InitialAssessment.label12") }}</th>
          <td>
          <div class="flex-box flex-center disabel-table">
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV2'].Items"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV2cxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV2cxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
          </div>
          </td>
        </tr>
        <!-- Đánh giá nguy cơ ngã -->
        <tr>
          <th>{{ __label(MASTERDATA["IPDIAAUFRAK"]) }}</th>
          <td>
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
      <!-- 4.Đánh giá ban đầu nguy cơ ngã theo thang điểm Morse -->
      <table
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block4"
       v-if="DataSubmit.VersionApp >= 11"
      >
        <tr>
          <td colspan="2" class="no-padding" v-if="DataSubmit.VersionApp >= 11">
            <div class="tbl-title" v-if="!checkTab">
              4. {{ __t("Đánh giá ban đầu nguy cơ ngã theo thang điểm Morse") }}
            </div>
          </td>
        </tr>
        <!-- Đánh giá nguy cơ ngã -->
        <tr>
          <th width="1">
            <div class="w160">{{ __label(MASTERDATA["IPDIAAUFRAK"]) }}</div>
          </th>
          <td>
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
      <!-- 5.Đánh giá về hô hấp -->
      <table
       v-if="!checkTab && DataSubmit.VersionApp >= 11"
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block5"
      >
        <tr>
          <td colspan="2" class="no-padding">
          <div class="tbl-title">
            5. {{ __label(MASTERDATA["IPDIAAUREAS"]) }}
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUREAS']">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUREAS"]) }}</div>
          </th>
          <td>
          <div class="flex-box">
            <MDRadio
            :BreakOn="4"
            @onChange="setIPDIAAUITV2('IPDIAAUREAS');"
            v-if="MASTERDATA['IPDIAAUREAS']"
            v-model="MASTERDATA['IPDIAAUREAS']"
            >
            <div
              style="flex-grow: 1"
              class="ml-10"
              v-if="MASTERDATA['IPDIAAUREAS'].Items[5].Value"
            >
              <textarea-autosize
              class="form-control"
              rows="3"
              :placeholder="__t('Nhập')"
              v-model="MASTERDATA['IPDIAAUREAS'].Items[6].Value"
              />
            </div>
            </MDRadio>
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUSANA']">
          <th>{{ __label(MASTERDATA["IPDIAAUSANA"]) }}</th>
          <td>
          <div class="group-radio">
            <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSANA'].Items"
            >
            <input
              type="checkbox"
              :id="'IPDIAAUSANAradio-' + index"
              v-model="item.Value"
            />
            <label
              :for="'IPDIAAUSANAradio-' + index"
              @click="checkbox2Radio(MASTERDATA['IPDIAAUSANA'].Items, item);"
              >{{ __label(item) }}</label
            >
            </span>
          </div>
          </td>
        </tr>
        <!-- hướng xử lý hỗ trợ -->
        <tr v-if="MASTERDATA['IPDIAAUITV3'] && !checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUITV3"]) }}</th>
          <td>
          <div
            :class="{
            'flex-box flex-center': true,
            'disabel-table':
              MASTERDATA['IPDIAAUTEMP'].Items[2].Value ||
              MASTERDATA['IPDIAAUTEMP'].Items[2].Value
            }"
          >
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV3'].Items"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV3cxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV3cxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUITV3'] && checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUITV3"]) }}</th>
          <td>
          <div
            :class="{
            'flex-box flex-center': true,
            'disabel-table':
              MASTERDATA['IPDIAAUTEMP'].Items[2].Value ||
              MASTERDATA['IPDIAAUTEMP'].Items[2].Value
            }"
          >
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV3'].Items"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV3cxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV3cxo-' + index"></label>
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
       v-else-if="!checkTab && DataSubmit.VersionApp < 11"
       class="table v-table-1 no-margin col-1-1"
       id="InitialAssessment-ForAdult-block4"
      >
        <tr>
          <td colspan="2" class="no-padding">
          <div class="tbl-title">
            4. {{ __label(MASTERDATA["IPDIAAUREAS"]) }}
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUREAS']">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUREAS"]) }}</div>
          </th>
          <td>
          <div class="flex-box">
            <MDRadio
            :BreakOn="4"
            @onChange="setIPDIAAUITV2('IPDIAAUREAS');"
            v-if="MASTERDATA['IPDIAAUREAS']"
            v-model="MASTERDATA['IPDIAAUREAS']"
            >
            <div
              style="flex-grow: 1"
              class="ml-10"
              v-if="MASTERDATA['IPDIAAUREAS'].Items[5].Value"
            >
              <textarea-autosize
              class="form-control"
              rows="3"
              :placeholder="__t('Nhập')"
              v-model="MASTERDATA['IPDIAAUREAS'].Items[6].Value"
              />
            </div>
            </MDRadio>
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUSANA']">
          <th>{{ __label(MASTERDATA["IPDIAAUSANA"]) }}</th>
          <td>
          <div class="group-radio">
            <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSANA'].Items"
            >
            <input
              type="checkbox"
              :id="'IPDIAAUSANAradio-' + index"
              v-model="item.Value"
            />
            <label
              :for="'IPDIAAUSANAradio-' + index"
              @click="checkbox2Radio(MASTERDATA['IPDIAAUSANA'].Items, item);"
              >{{ __label(item) }}</label
            >
            </span>
          </div>
          </td>
        </tr>
        <!-- hướng xử lý hỗ trợ -->
        <tr v-if="MASTERDATA['IPDIAAUITV3'] && !checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUITV3"]) }}</th>
          <td>
          <div
            :class="{
            'flex-box flex-center': true,
            'disabel-table':
              MASTERDATA['IPDIAAUTEMP'].Items[2].Value ||
              MASTERDATA['IPDIAAUTEMP'].Items[2].Value
            }"
          >
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV3'].Items"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV3cxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV3cxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUITV3'] && checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUITV3"]) }}</th>
          <td>
          <div
            :class="{
            'flex-box flex-center': true,
            'disabel-table':
              MASTERDATA['IPDIAAUTEMP'].Items[2].Value ||
              MASTERDATA['IPDIAAUTEMP'].Items[2].Value
            }"
          >
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV3'].Items"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV3cxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV3cxo-' + index"></label>
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
      <!-- 6. Đánh giá về da, niêm mạc-->
      <table
       class="table v-table-1 no-margin col-1-1"
       :id="DataSubmit.VersionApp >= 11 ? 'InitialAssessment-ForAdult-block6' : 'InitialAssessment-ForAdult-block5'"
      >
        <tr v-if="DataSubmit.VersionApp >= 11">
          <td colspan="2" class="no-padding">
          <div class="tbl-title" v-if="!checkTab">
            6. {{ __t("Đánh giá về da, niêm mạc") }}
          </div>
          <div class="tbl-title" v-else>
            4. {{ __t("InitialAssessment.label9") }}
          </div>
          </td>
        </tr>
        <tr v-else>
          <td colspan="2" class="no-padding">
          <div class="tbl-title" v-if="!checkTab">
            5. {{ __t("Đánh giá về da, niêm mạc") }}
          </div>
          <div class="tbl-title" v-else>
            4. {{ __t("InitialAssessment.label9") }}
          </div>
          </td>
        </tr>
        <!-- màu sắc -->
        <tr v-if="MASTERDATA['IPDIAAUCOLO'] && !checkTab">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUCOLO"]) }}</div>
          </th>
          <td>
          <MDRadio
            @onChange="setIPDIAAUITV2('IPDIAAUCOLO');"
            v-if="MASTERDATA['IPDIAAUCOLO']"
            v-model="MASTERDATA['IPDIAAUCOLO']"
          />
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUCOLO'] && checkTab">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUCOLO"]) }}</div>
          </th>
          <td>
          <div class="flex-box flex-center">
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUCOLO'].Items.filter(
              i => i.Code == 'IPDIAAUCOLOOTH' || i.Code == 'IPDIAAUCOLONOR'
            )"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUCOLOcxo-' + index"
                v-model="item.Value"
                @change="handleClickColor(item.Code)"
              />
              <label :for="'IPDIAAUCOLOcxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
            <div
            style="flex-grow: 1"
            class="flex-box flex-center ml-10"
            v-if="MASTERDATA['IPDIAAUCOLO'].Items[5].Value"
            >
            <textarea-autosize
              rows="1"
              :placeholder="__t('Nhập')"
              class="form-control"
              v-model="MASTERDATA['IPDIAAUCOLO'].Items[6].Value"
            />
            </div>
          </div>
          </td>
        </tr>
        <!-- Độ ẩm -->
        <tr v-if="MASTERDATA['IPDIAAUMOIS']">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUMOIS"]) }}</div>
          </th>
          <td>
          <div class="group-radio">
            <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUMOIS'].Items"
            >
            <input
              type="checkbox"
              :id="'IPDIAAUMOISradio-' + index"
              v-model="item.Value"
            />
            <label
              :for="'IPDIAAUMOISradio-' + index"
              @click="checkbox2Radio(MASTERDATA['IPDIAAUMOIS'].Items, item);"
              >{{ __label(item) }}</label
            >
            </span>
          </div>
          </td>
        </tr>
        <!-- Loét do tì đè -->
        <tr v-if="MASTERDATA['IPDIAAUPRUL']">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUPRUL"]) }}</div>
          </th>
          <td>
          <div class="group-radio flex-center">
            <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUPRUL'].Items"
            v-if="index < 2"
            >
            <input
              type="checkbox"
              :id="'IPDIAAUPRULradio-' + index"
              v-model="item.Value"
            />
            <label
              :for="'IPDIAAUPRULradio-' + index"
              @click="checkbox2Radio(MASTERDATA['IPDIAAUPRUL'].Items, item);"
              >{{ __label(item) }}</label
            >
            </span>
            <template v-if="MASTERDATA['IPDIAAUPRUL'].Items[1].Value">
            <span class="no-wrap ml-5 mr-5">{{
              __label(MASTERDATA["IPDIAAUPRUL"].Items[2])
            }}</span>
            <textarea-autosize
              rows="1"
              :placeholder="__t('Nhập')"
              class="form-control"
              v-model="MASTERDATA['IPDIAAUPRUL'].Items[2].Value"
              :code="MASTERDATA['IPDIAAUPRUL'].Items[2].Code"
            />
            </template>
          </div>
          </td>
        </tr>
        <!-- Vết thương khác -->
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
              @click="checkbox2Radio(MASTERDATA['IPDIAAUOTWO'].Items, item);"
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
              :code="MASTERDATA['IPDIAAUOTWO'].Items[2].Code"
            />
            </template>
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUITV4']">
          <th>{{ __t("InitialAssessment.label12") }}</th>
          <td>
          <div class="flex-box flex-center">
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV4'].Items"
            >
            <div
              class="flex-box flex-center"
              :class="{
              'disabel-table':
                index === 0 && MASTERDATA['IPDIAAUCOLO'].Items[2].Value
              }"
            >
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV4cxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV4cxo-' + index"></label>
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
      <!-- 7. Trạng thái thần kinh -->
      <table
       class="table v-table-1 no-margin col-1-1"
       :id="DataSubmit.VersionApp >= 11 ? 'InitialAssessment-ForAdult-block7' : 'InitialAssessment-ForAdult-block6'"
      >
        <tr v-if="DataSubmit.VersionApp >= 11">
          <td colspan="2" class="no-padding">
          <div class="tbl-title" v-if="!checkTab">
            7. {{ __t("Trạng thái thần kinh") }}
          </div>
          <div class="tbl-title" v-else>
            5. {{ __t("InitialAssessment.label10") }}
          </div>
          </td>
        </tr>
        <tr v-else>
          <td colspan="2" class="no-padding">
          <div class="tbl-title" v-if="!checkTab">
            6. {{ __t("Trạng thái thần kinh") }}
          </div>
          <div class="tbl-title" v-else>
            5. {{ __t("InitialAssessment.label10") }}
          </div>
          </td>
        </tr>
        <!-- Trạng thái -->
        <tr v-if="MASTERDATA['IPDIAAUMEST'] && !checkTab">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUMEST"]) }}</div>
          </th>
          <td>
          <MDRadio
            @onChange="setIPDIAAUITV2('IPDIAAUMEST');"
            v-if="MASTERDATA['IPDIAAUMEST']"
            v-model="MASTERDATA['IPDIAAUMEST']"
          />
          <div v-if="MASTERDATA['IPDIAAUMEST'].Items[7].Value" class="mt-10">
            <textarea-autosize
            rows="1"
            :placeholder="__t('Nhập')"
            class="form-control mgl-5"
            v-model="MASTERDATA['IPDIAAUMEST'].Items[8].Value"
            :code="MASTERDATA['IPDIAAUMEST'].Items[8].Code"
            />
          </div>
          <div>
            <div
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['IPDIAAUMEST'].Items"
              v-if="item.DataType === 'Checkbox' && (MASTERDATA['IPDIAAUMEST'].Items[1].Value || MASTERDATA['IPDIAAUMEST'].Items[2].Value)" >
              <div class="flex-box flex-center">
                <div class="v-checkbox">
                  <input
                    type="checkbox"
                    :id="'IPDIAAUMESTcxo-' + index"
                    v-model="item.Value"
                  />
                  <label :for="'IPDIAAUMESTcxo-' + index"></label>
                </div>
                <span class="displaytbl">
                  <span>{{ __label(item) }}</span>
                </span>
                <textarea-autosize
                  rows="1"
                  :placeholder="__t('Nhập')"
                  class="form-control mgl-5"
                  v-if="index === 5 && item.Value"
                  v-model="MASTERDATA['IPDIAAUMEST'].Items[6].Value"
                  :code="MASTERDATA['IPDIAAUMEST'].Items[6].Code"
                />
              </div>
            </div>
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUMEST'] && checkTab">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUMEST"]) }}</div>
          </th>
          <td>
          <div class="flex-box flex-center">
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUMEST'].Items.filter(
              i =>
              i.Code === 'IPDIAAUMESTALE' ||
              i.Code === 'IPDIAAUMESTDRO' ||
              i.Code === 'IPDIAAUMESTUNC' ||
              i.Code === 'IPDIAAUMESTRTC' ||
              i.Code === 'IPDIAAUMESTRTP'
            )"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUMESTcxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUMESTcxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
          </div>
          </td>
        </tr>
        <!-- Glasgow coma -->
        <tr v-if="MASTERDATA['IPDIAAUGLCO'] && !checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUGLCO"]) }}</th>
          <td>
          <V2Select
            :disabeleclear="true"
            class="display-inline"
            v-model="MASTERDATA['IPDIAAUGLCO'].Items[0].Value"
            :placeholder="__t('Chọn')"
            :items="IPDIAAUGLCO"
          />/15
          </td>
        </tr>
        <!-- Phản xạ ánh sáng -->
        <tr v-if="MASTERDATA['IPDIAAURETL'] && !checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAURETL"]) }}</th>
          <td>
          <div class="flex-box flex-center" style="flex-flow: row wrap">
            <div class="group-radio">
            <span
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['IPDIAAURETL'].Items"
            >
              <input
              type="checkbox"
              :id="'IPDIAAURETLradio-' + index"
              v-model="item.Value"
              />
              <label
              :for="'IPDIAAURETLradio-' + index"
              @click="checkbox2Radio(MASTERDATA['IPDIAAURETL'].Items, item);"
              >{{ __label(item) }}</label
              >
            </span>
            </div>
            <div class="flex-break-sm"></div>
            <div class="flex-box flex-center">
            <span class="mgl-5 mgr-5"
              >{{ __label(MASTERDATA["IPDIAAURIPU"]) }}(mm)</span
            >
            <input
              class="form-control w150 mgr-5"
              :placeholder="__t('Nhập')"
              v-model="MASTERDATA['IPDIAAURIPU'].Items[0].Value"
            />
            </div>
            <div class="flex-box flex-center">
            <span class="mgl-5 mgr-5"
              >{{ __label(MASTERDATA["IPDIAAULEPU"]) }}(mm)</span
            >
            <input
              class="form-control w150 mgr-5"
              :placeholder="__t('Nhập')"
              v-model="MASTERDATA['IPDIAAULEPU'].Items[0].Value"
            />
            </div>
          </div>
          </td>
        </tr>
        <!-- Hướng xử trí hỗ trợ -->
        <tr v-if="MASTERDATA['IPDIAAUITV5'] && !checkTab">
          <th v-if="!checkTab">{{ __label(MASTERDATA["IPDIAAUITV5"]) }}</th>
          <th v-else>{{ __t("InitialAssessment.label12") }}</th>
          <td>
          <div class="flex-box flex-center">
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV5'].Items"
            >
            <div
              class="flex-box flex-center"
              :class="{
              'disabel-table':
                index === 1 &&
                (MASTERDATA['IPDIAAUMEST'].Items[1].Value ||
                MASTERDATA['IPDIAAUMEST'].Items[2].Value)
              }"
            >
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV5cxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV5cxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUITV5'] && checkTab">
          <th>{{ __t("InitialAssessment.label12") }}</th>
          <td>
          <div class="flex-box flex-center">
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV5'].Items.filter(i => i.Code === 'IPDIAAUITV5IAP')"
            >
            <div
              class="flex-box flex-center"
              :class="{
              'disabel-table':
                index === 1 &&
                (MASTERDATA['IPDIAAUMEST'].Items[1].Value ||
                MASTERDATA['IPDIAAUMEST'].Items[2].Value)
              }"
            >
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV5cxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV5cxo-' + index"></label>
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
      <!-- 8. Đánh giá về tâm lý-->
      <table
       class="table v-table-1 no-margin col-1-1"
       :id="DataSubmit.VersionApp >= 11 ? 'InitialAssessment-ForAdult-block8' : 'InitialAssessment-ForAdult-block7'"
      >
        <tr>
          <td colspan="2" class="no-padding" v-if="DataSubmit.VersionApp >= 11">
          <div class="tbl-title" v-if="!checkTab">
            8. {{ __t("Đánh giá về tâm lý") }}
          </div>
          <div class="tbl-title" v-else>6. {{ __t("Đánh giá về tâm lý") }}</div>
          </td>
          <td colspan="2" class="no-padding" v-else>
          <div class="tbl-title" v-if="!checkTab">
            7. {{ __t("Đánh giá về tâm lý") }}
          </div>
          <div class="tbl-title" v-else>6. {{ __t("Đánh giá về tâm lý") }}</div>
          </td>
        </tr>
        <!-- Đánh giá -->
        <tr v-if="MASTERDATA['IPDIAAUPSAS'] && !checkTab">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUPSAS"]) }}</div>
          </th>
          <td>
          <div class="flex-box flex-center" style="flex-flow: row wrap">
            <template
            v-for="(item, index) in MASTERDATA['IPDIAAUPSAS'].Items"
            v-if="item.DataType === 'Checkbox' && index < 8 && !checkTab"
            >
            <div :data="item" :key="index" class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                @click="
                item.Code === 'IPDIAAUPSASUNC' && setIPDIAAUITV2('IPDIAAUPSAS');
                "
                type="checkbox"
                :id="'IPDIAAUPSAScxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUPSAScxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span
                :class="{
                'label-b': item.Code === 'IPDIAAUPSASUNC'
                }"
                >{{ __label(item) }}</span
              ></span
              >
              <input
              style="flex-grow: 1"
              class="form-control mgl-5"
              v-if="index === 6 && item.Value"
              :placeholder="__t('Nhập')"
              v-model="MASTERDATA['IPDIAAUPSAS'].Items[7].Value"
              />
            </div>
            </template>
            <!--
            <template
              v-for="(item, index) in MASTERDATA['IPDIAAUPSAS'].Items.filter(
              (i) => i.Code === 'IPDIAAUPSASCAL'
              )"
              v-if="item.DataType === 'Checkbox' && index < 6 && checkTab"
            >
              <div :data="item" :key="index" class="flex-box flex-center">
              <div class="v-checkbox">
                <input
                @click="
                  item.Code === 'IPDIAAUPSASUNC' && setIPDIAAUITV2('IPDIAAUPSAS')
                "
                type="checkbox"
                :id="'IPDIAAUPSAScxo-' + index"
                v-model="item.Value"
                />
                <label :for="'IPDIAAUPSAScxo-' + index"></label>
              </div>
              <span class="displaytbl"
                ><span
                :class="{
                  'label-b': item.Code === 'IPDIAAUPSASUNC',
                }"
                >{{ __label(item) }}</span
                ></span
              >
              <input
                class="form-control mgl-5"
                v-if="index === 6 && item.Value"
                v-model="MASTERDATA['IPDIAAUPSAS'].Items[7].Value"
              />
              </div>
            </template>
            -->
          </div>
          <!--
            <div class="flex-box">
            <div>
              <div class="flex-box flex-center">
              <div class="v-checkbox">
                <input
                type="checkbox"
                id="'IPDIAAUPSAScxzxo'"
                v-model="MASTERDATA['IPDIAAUPSAS'].Items[6].Value"
                />
                <label for="'IPDIAAUPSAScxzxo'"></label>
              </div>
              <span class="displaytbl pt-5 mr-5"
                ><span>{{
                __label(MASTERDATA["IPDIAAUPSAS"].Items[6])
                }}</span></span
              >
              </div>
            </div>
            <textarea-autosize
              v-if="MASTERDATA['IPDIAAUPSAS'].Items[6].Value"
              rows="1"
              :placeholder="__t('Nhập')"
              class="form-control mt-5"
              v-model="MASTERDATA['IPDIAAUPSAS'].Items[7].Value"
            />
            </div>
          -->
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUPSAS'] && checkTab">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUPSAS"]) }}</div>
          </th>
          <td>
          <div class="flex-box flex-center" style="flex-flow: row wrap">
            <template
            v-for="(item, index) in MASTERDATA['IPDIAAUPSAS'].Items.filter(
              i =>
              i.Code === 'IPDIAAUPSASCAL' ||
              i.Code === 'IPDIAAUPSASCOO' ||
              i.Code === 'IPDIAAUPSASUNC' ||
              i.Code === 'IPDIAAUPSASANX' ||
              i.Code === 'IPDIAAUPSASSCA' ||
              i.Code === 'IPDIAAUPSASUNCOM'
            )"
            >
            <div :data="item" :key="index" class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                @click="
                item.Code === 'IPDIAAUPSASUNC' && setIPDIAAUITV2('IPDIAAUPSAS');
                "
                type="checkbox"
                :id="'IPDIAAUPSAScxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUPSAScxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span
                :class="{
                'label-b': item.Code === 'IPDIAAUPSASUNC'
                }"
                >{{ __label(item) }}</span
              ></span
              >
              <input
              class="form-control mgl-5"
              v-if="index === 6 && item.Value"
              v-model="MASTERDATA['IPDIAAUPSAS'].Items[7].Value"
              />
            </div>
            </template>
          </div>
          </td>
        </tr>
        <!-- Hướng xử trí hỗ trợ -->
        <tr v-if="MASTERDATA['IPDIAAUITV6']">
          <th v-if="!checkTab">{{ __label(MASTERDATA["IPDIAAUITV6"]) }}</th>
          <th v-else>{{ __t("InitialAssessment.label12") }}</th>
          <td>
          <div class="flex-box flex-center">
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV6'].Items"
            >
            <div
              class="flex-box flex-center"
              :class="{
              'disabel-table':
                index === 0 && MASTERDATA['IPDIAAUPSAS'].Items[2].Value
              }"
            >
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV6cxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV6cxo-' + index"></label>
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
      <!-- 9. Đánh giá các hoạt động sinh hoạt hằng ngày -->
      <table
       class="table v-table-1 no-margin col-1-1"
       :id="DataSubmit.VersionApp >= 11 ? 'InitialAssessment-ForAdult-block9' : 'InitialAssessment-ForAdult-block8'"
      >
       <tr>
        <td colspan="2" class="no-padding" v-if="DataSubmit.VersionApp >= 11">
          <div class="tbl-title" v-if="!checkTab">
            9. {{ __t("Đánh giá các hoạt động sinh hoạt hàng ngày") }}
          </div>
          <div class="tbl-title" v-else>
            7. {{ __t("InitialAssessment.label1") }}
          </div>
        </td>
        <td colspan="2" class="no-padding" v-else>
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
            <div
             class="v-checkbox"
             @click="index = 3 && setIPDIAAUITV2('IPDIAAUITV7');"
            >
             <input
              type="checkbox"
              :id="'IPDIAAUEADRradio-' + index"
              v-model="item.Value"
             />
             <label
              @click="checkbox2Radio(MASTERDATA['IPDIAAUEADR'].Items, item);"
              :for="'IPDIAAUEADRradio-' + index"
             ></label>
            </div>
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
            <div
             class="v-checkbox"
             @click="index = 3 && setIPDIAAUITV2('IPDIAAUITV7');"
            >
             <input
              type="checkbox"
              :id="'IPDIAAUHEARradio-' + index"
              v-model="item.Value"
             />
             <label
              @click="checkbox2Radio(MASTERDATA['IPDIAAUHEAR'].Items, item);"
              :for="'IPDIAAUHEARradio-' + index"
             ></label>
            </div>
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
            <div
             class="v-checkbox"
             @click="index = 3 && setIPDIAAUITV2('IPDIAAUITV7');"
            >
             <input
              type="checkbox"
              :id="'IPDIAAUTALKradio-' + index"
              v-model="item.Value"
             />
             <label
              @click="checkbox2Radio(MASTERDATA['IPDIAAUTALK'].Items, item);"
              :for="'IPDIAAUTALKradio-' + index"
             ></label>
            </div>
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
            <div
             class="v-checkbox"
             @click="index = 3 && setIPDIAAUITV2('IPDIAAUITV7');"
            >
             <input
              type="checkbox"
              :id="'IPDIAAUVISIradio-' + index"
              v-model="item.Value"
             />
             <label
              @click="checkbox2Radio(MASTERDATA['IPDIAAUVISI'].Items, item);"
              :for="'IPDIAAUVISIradio-' + index"
             ></label>
            </div>
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
            <div
             class="v-checkbox"
             @click="index = 3 && setIPDIAAUITV2('IPDIAAUITV7');"
            >
             <input
              type="checkbox"
              :id="'IPDIAAUDRESradio-' + index"
              v-model="item.Value"
             />
             <label
              @click="checkbox2Radio(MASTERDATA['IPDIAAUDRES'].Items, item);"
              :for="'IPDIAAUDRESradio-' + index"
             ></label>
            </div>
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
            <div
             class="v-checkbox"
             @click="index = 3 && setIPDIAAUITV2('IPDIAAUITV7');"
            >
             <input
              type="checkbox"
              :id="'IPDIAAUPEHYradio-' + index"
              v-model="item.Value"
             />
             <label
              @click="checkbox2Radio(MASTERDATA['IPDIAAUPEHY'].Items, item);"
              :for="'IPDIAAUPEHYradio-' + index"
             ></label>
            </div>
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
            <div
             class="v-checkbox"
             @click="index = 3 && setIPDIAAUITV2('IPDIAAUITV7');"
            >
             <input
              type="checkbox"
              :id="'IPDIAAUWALKradio-' + index"
              v-model="item.Value"
             />
             <label
              @click="checkbox2Radio(MASTERDATA['IPDIAAUWALK'].Items, item);"
              :for="'IPDIAAUWALKradio-' + index"
             ></label>
            </div>
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
            <div
             class="v-checkbox"
             @click="index = 3 && setIPDIAAUITV2('IPDIAAUITV7');"
            >
             <input
              type="checkbox"
              :id="'IPDIAAUTAMEradio-' + index"
              v-model="item.Value"
             />
             <label
              @click="checkbox2Radio(MASTERDATA['IPDIAAUTAME'].Items, item);"
              :for="'IPDIAAUTAMEradio-' + index"
             ></label>
            </div>
           </td>
          </tr>
         </table>

         <div class="mt-10">
          <b> Level 1</b>: {{ __t("InitialAssessment.Independent") }};<b>
           Level 2</b
          >: {{ __t("InitialAssessment.Supervision") }}; <b>Level 3</b>:
          {{ __t("InitialAssessment.Assistance") }}; <b>Level 4</b>:
          {{ __t("InitialAssessment.Dependent") }}
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUITV7'] && !checkTab">
        <th>{{ __label(MASTERDATA["IPDIAAUITV7"]) }}</th>
        <td>
         <div class="flex-box flex-center">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUITV7'].Items"
          >
           <div
            class="flex-box flex-center"
            :class="{
             'disabel-table': index === 3 && onIPDIAAUITV7()
            }"
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUITV7cxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUITV7cxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUITV7'] && checkTab">
        <th>{{ __t("InitialAssessment.label12") }}</th>
        <td>
         <div class="flex-box flex-center">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUITV7'].Items.filter(
            i => i.Code === 'IPDIAAUITV7IAP'
           )"
          >
           <div
            class="flex-box flex-center"
            :class="{
             'disabel-table': index === 3 && onIPDIAAUITV7()
            }"
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUITV7cxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUITV7cxo-' + index"></label>
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
      <!-- 10. Thiết bị cấy ghép -->
      <table
       class="table v-table-1 no-margin col-1-1"
       :id="DataSubmit.VersionApp >= 11 ? 'InitialAssessment-ForAdult-block10' : 'InitialAssessment-ForAdult-block9'"
      >
        <tr>
          <td colspan="2" class="no-padding" v-if="DataSubmit.VersionApp >= 11">
            <div class="tbl-title" v-if="!checkTab">
              10. {{ __label(MASTERDATA["IPDIAAUIOED"]) }}
            </div>
            <div class="tbl-title" v-else>
              8. {{ __label(MASTERDATA["IPDIAAUIOED"]) }}
            </div>
          </td>
          <td colspan="2" class="no-padding" v-else>
            <div class="tbl-title" v-if="!checkTab">
              9. {{ __label(MASTERDATA["IPDIAAUIOED"]) }}
            </div>
            <div class="tbl-title" v-else>
              8. {{ __label(MASTERDATA["IPDIAAUIOED"]) }}
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUIOED'] && checkTab">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUIOED"]) }}</div>
          </th>
          <td>
          <div class="flex-box flex-center" style="flex-flow: row wrap">
            <div class="group-radio">
            <template v-for="(item, index) in MASTERDATA['IPDIAAUIOED'].Items">
              <span :data="item" :key="index" v-if="item.DataType === 'Radio'">
              <input
                type="checkbox"
                :id="'IPDIAAUIOEDradio-' + index"
                v-model="item.Value"
              />
              <label
                :for="'IPDIAAUIOEDradio-' + index"
                @click="
                checkbox2RadioText(MASTERDATA['IPDIAAUIOED'].Items, item);
                "
                >{{ __label(item) }}</label
              >
              </span>
            </template>
            </div>
          </div>
          <div
            class="flex-box fl2ex-center"
            style="flex-flow: row wrap"
            v-if="MASTERDATA['IPDIAAUIOED'].Items[1].Value"
          >
            <template
            v-for="(item, index) in MASTERDATA['IPDIAAUIOED'].Items.filter(
              i => i.Code !== 'IPDIAAUIOEDPAC'
            )"
            >
            <div
              :key="index + 'IPDIAAUIOEDflex-break'"
              v-if="index === 6"
              class="flex-break"
            ></div>
            <div :data="item" :key="index" v-if="item.DataType === 'Checkbox'">
              <div class="flex-box flex-center">
              <div class="v-checkbox">
                <input
                type="checkbox"
                :id="'IPDIAAUIOEDcxo-' + index"
                v-model="item.Value"
                />
                <label :for="'IPDIAAUIOEDcxo-' + index"></label>
              </div>
              <span class="displaytbl"
                ><span>{{ __label(item) }}</span></span
              >
              </div>
            </div>
            </template>
            <div style="flex-grow: 1">
            <textarea-autosize
              v-if="MASTERDATA['IPDIAAUIOED'].Items[6].Value"
              v-model="MASTERDATA['IPDIAAUIOED'].Items[7].Value"
              :code="MASTERDATA['IPDIAAUIOED'].Items[7].Code"
              class="form-control mgl-5"
              :placeholder="__t('Nhập')"
            />
            </div>
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUIOED'] && !checkTab">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUIOED"]) }}</div>
          </th>
          <td>
          <div class="flex-box flex-center" style="flex-flow: row wrap">
            <div class="group-radio">
            <template v-for="(item, index) in MASTERDATA['IPDIAAUIOED'].Items">
              <span :data="item" :key="index" v-if="item.DataType === 'Radio'">
              <input
                type="checkbox"
                :id="'IPDIAAUIOEDradio-' + index"
                v-model="item.Value"
              />
              <label
                :for="'IPDIAAUIOEDradio-' + index"
                @click="
                checkbox2RadioText(MASTERDATA['IPDIAAUIOED'].Items, item);
                "
                >{{ __label(item) }}</label
              >
              </span>
            </template>
            </div>
          </div>
          <div
            class="flex-box fl2ex-center"
            style="flex-flow: row wrap"
            v-if="MASTERDATA['IPDIAAUIOED'].Items[1].Value"
          >
            <template v-for="(item, index) in MASTERDATA['IPDIAAUIOED'].Items">
            <div
              :key="index + 'IPDIAAUIOEDflex-break'"
              v-if="index === 6"
              class="flex-break"
            ></div>
            <div :data="item" :key="index" v-if="item.DataType === 'Checkbox'">
              <div class="flex-box flex-center">
              <div class="v-checkbox">
                <input
                type="checkbox"
                :id="'IPDIAAUIOEDcxo-' + index"
                v-model="item.Value"
                />
                <label :for="'IPDIAAUIOEDcxo-' + index"></label>
              </div>
              <span class="displaytbl"
                ><span>{{ __label(item) }}</span></span
              >
              </div>
            </div>
            </template>
            <div style="flex-grow: 1">
            <textarea-autosize
              style="margin-top: 4px; line-height: 21px;"
              v-if="MASTERDATA['IPDIAAUIOED'].Items[6].Value"
              v-model="MASTERDATA['IPDIAAUIOED'].Items[7].Value"
              :code="MASTERDATA['IPDIAAUIOED'].Items[7].Code"
              class="form-control mgl-5"
              :placeholder="__t('Nhập')"
            />
            </div>
          </div>
          </td>
        </tr>
       <!-- hướng xử lý hỗ trợ thiết bị cấy ghép -->
       <tr v-if="MASTERDATA['IPDIAAUNIHT'] && checkTab">
        <th>{{ __t("InitialAssessment.label12") }}</th>
        <td>
         <textarea-autosize
          rows="1"
          class="form-control"
          :placeholder="__t('Nhập')"
          v-model="MASTERDATA['IPDIAAUNIHT'].Items[0].Value"
         />
        </td>
       </tr>
      </table>
      <!-- 11. Đánh giá về tiêu hóa và dinh dưỡng -->
      <table
       class="table v-table-1 no-margin col-1-1"
       :id="DataSubmit.VersionApp >= 11 ? 'InitialAssessment-ForAdult-block11' : 'InitialAssessment-ForAdult-block10'"
      >
        <tr>
          <td colspan="2" class="no-padding" v-if="DataSubmit.VersionApp >= 11">
          <div class="tbl-title" v-if="!checkTab">
            11. {{ __t("Đánh giá về tiêu hóa và dinh dưỡng") }}
          </div>
          <div class="tbl-title" v-else>
            9. {{ __t("InitialAssessment.label11") }}
          </div>
          </td>
          <td colspan="2" class="no-padding" v-else>
          <div class="tbl-title" v-if="!checkTab">
            10. {{ __t("Đánh giá về tiêu hóa và dinh dưỡng") }}
          </div>
          <div class="tbl-title" v-else>
            9. {{ __t("InitialAssessment.label11") }}
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUWLOG'] && !checkTab">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUWLOG"]) }}</div>
          </th>
          <td>
          <div class="mb10">
            <div class="flex-box flex-center">
            <div class="group-radio">
              <span
              @click="
                item.Code === 'IPDIAAUWLOGYES' && setIPDIAAUITV2('IPDIAAUITV8');
              "
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['IPDIAAUWLOG'].Items"
              >
              <input
                type="checkbox"
                :id="'IPDIAAUWLOGradio-' + index"
                v-model="item.Value"
              />
              <label
                :class="{
                'label-b': item.Code === 'IPDIAAUWLOGYES'
                }"
                :for="'IPDIAAUWLOGradio-' + index"
                @click="checkbox2Radio(MASTERDATA['IPDIAAUWLOG'].Items, item);"
                >{{ __label(item) }}</label
              >
              </span>
            </div>
            </div>
          </div>
          <template v-if="MASTERDATA['IPDIAAUWLOG'].Items[1].Value">
            <div class="mb10">
            <div class="flex-box flex-center">
              <div class="group-radio">
              <span
                :data="item"
                :key="index"
                v-for="(item, index) in MASTERDATA['IPDIAAUWLOG2'].Items"
              >
                <input
                type="checkbox"
                :id="'IPDIAAUWLOG2radio-' + index"
                v-model="item.Value"
                />
                <label
                :for="'IPDIAAUWLOG2radio-' + index"
                @click="checkbox2Radio(MASTERDATA['IPDIAAUWLOG2'].Items, item);"
                >{{ __label(item) }}</label
                >
              </span>
              </div>
            </div>
            </div>
            <div
            class="flex-box flex-center"
            v-if="
              MASTERDATA['IPDIAAUWLOG2'].Items[1].Value ||
              MASTERDATA['IPDIAAUWLOG2'].Items[0].Value
            "
            >
            <span class="mgr-5 no-wrap"
              >{{ __label(MASTERDATA["IPDIAAUHOMA"]) }} (kg)</span
            >
            <input
              :placeholder="__t('Nhập')"
              class="form-control w100 mgr-5"
              v-model="MASTERDATA['IPDIAAUHOMA'].Items[0].Value"
            />
            <span class="mgr-5 no-wrap">{{
              __label(MASTERDATA["IPDIAAURESO"])
            }}</span>
            <textarea-autosize
              rows="1"
              :placeholder="__t('Nhập')"
              class="form-control mgr-5"
              v-model="MASTERDATA['IPDIAAURESO'].Items[0].Value"
            />
            <div class="flex-box flex-center">
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV6cxo-' + 2333445"
                v-model="MASTERDATA['IPDIAAURESO'].Items[1].Value"
              />
              <label :for="'IPDIAAUITV6cxo-' + 2333445"></label>
              </div>
              <span class="displaytbl no-wrap"
              ><span>{{
                __label(MASTERDATA["IPDIAAURESO"].Items[1])
              }}</span></span
              >
            </div>
            </div>
          </template>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUDIET'] && !checkTab">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUDIET"]) }}</div>
          </th>
          <td>
          <div class="group-radio">
            <span
            @click="
              item.Code === 'IPDIAAUDIETSPE' && setIPDIAAUITV2('IPDIAAUITV8');
            "
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUDIET'].Items"
            v-if="index < 3"
            >
            <input
              type="checkbox"
              :id="'IPDIAAUDIETradio-' + index"
              v-model="item.Value"
            />
            <label
              :class="{ 'label-b': item.Code === 'IPDIAAUDIETSPE' }"
              :for="'IPDIAAUDIETradio-' + index"
              @click="checkbox2RadioText(MASTERDATA['IPDIAAUDIET'].Items, item);"
              >{{ __label(item) }}</label
            >
            </span>
            <!-- <b> abc </b> -->
            <textarea-autosize
            rows="1"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUDIET'].Items[3].Value"
            />
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUDIET'] && checkTab">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUDIET"]) }}</div>
          </th>
          <td>
          <div class="group-radio">
            <span
            @click="item.Code === 'IPDIAAUDIETSPE'"
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUDIET'].Items.filter(
              i => i.Code !== 'IPDIAAUDIETVEG' && i.Code !== 'IPDIAAUDIETOTH'
            )"
            v-if="index < 3"
            >
            <input
              type="checkbox"
              :id="'IPDIAAUDIETradio-' + index"
              v-model="item.Value"
              @click="changeIPDIAAUDIET(index);"
            />
            <label :for="'IPDIAAUDIETradio-' + index" @click="checkbox2RadioText(MASTERDATA['IPDIAAUDIET'].Items, item);">{{ __label(item) }}</label>
            </span>
            <textarea-autosize
            v-if="MASTERDATA['IPDIAAUDIET'].Items[4].Value"
            rows="1"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUDIET'].Items[5].Value"
            />
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUAPPE'] && !checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUAPPE"]) }}</th>
          <td>
          <div class="group-radio">
            <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUAPPE'].Items"
            >
            <input
              type="checkbox"
              :id="'IPDIAAUAPPEradio-' + index"
              v-model="item.Value"
            />
            <label
              :for="'IPDIAAUAPPEradio-' + index"
              @click="checkbox2RadioText(MASTERDATA['IPDIAAUAPPE'].Items, item);"
              >{{ __label(item) }}</label
            >
            </span>
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUSWAL'] && !checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUSWAL"]) }}</th>
          <td>
          <div class="group-radio">
            <span
            @click="
              (item.Code === 'IPDIAAUSWALIMFL' ||
              item.Code === 'IPDIAAUSWALIMSO') &&
              setIPDIAAUITV2('IPDIAAUITV8');
            "
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUSWAL'].Items"
            >
            <input
              type="checkbox"
              :id="'IPDIAAUSWALradio-' + index"
              v-model="item.Value"
            />
            <label
              :class="{
              'label-b':
                item.Code === 'IPDIAAUSWALIMFL' || item.Code === 'IPDIAAUSWALIMSO'
              }"
              :for="'IPDIAAUSWALradio-' + index"
              @click="checkbox2RadioText(MASTERDATA['IPDIAAUSWAL'].Items, item);"
              >{{ __label(item) }}</label
            >
            </span>
          </div>
          </td>
        </tr>
        <!-- Đường ăn, uống -->
        <tr v-if="MASTERDATA['IPDIAAUFERO'] && !checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUFERO"]) }}</th>
          <td>
          <div class="group-radio">
            <span
            @click="
              item.Code === 'IPDIAAUFEROTUF' && setIPDIAAUITV2('IPDIAAUITV8');
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
            />
            <label
              :class="{ 'label-b': item.Code === 'IPDIAAUFEROTUF' }"
              :for="'IPDIAAUFEROradio-' + index"
              @click="checkbox2Radio(MASTERDATA['IPDIAAUFERO'].Items, item);"
              >{{ __label(item) }}</label
            >
            </span>
            <textarea-autosize
            style="line-height: 29px;"
            rows="1"
            v-if="MASTERDATA['IPDIAAUFERO'].Items[2].Value"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUFERO'].Items[3].Value"
            :code="MASTERDATA['IPDIAAUFERO'].Items[3].Code"
            />
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUFERO'] && checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUFERO"]) }}</th>
          <td>
          <div class="group-radio">
            <span
            @click="item.Code === 'IPDIAAUFEROTUF';"
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUFERO'].Items.filter(
              i =>
              i.Code === 'IPDIAAUFEROORA' ||
              i.Code == 'IPDIAAUFEROTUF' ||
              i.Code === 'IPDIAAUFEROOTH'
            )"
            v-if="index < 3"
            >
            <input
              type="checkbox"
              :id="'IPDIAAUFEROradio-' + index"
              v-model="item.Value"
            />
            <label
              :for="'IPDIAAUFEROradio-' + index"
              @click="checkbox2Radio(MASTERDATA['IPDIAAUFERO'].Items, item);"
              >{{ __label(item) }}</label
            >
            </span>
            <textarea-autosize
            style="line-height: 29px;"
            rows="1"
            v-if="MASTERDATA['IPDIAAUFERO'].Items[2].Value"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUFERO'].Items[3].Value"
            :code="MASTERDATA['IPDIAAUFERO'].Items[3].Code"
            />
          </div>
          </td>
        </tr>
        <!-- Thói quen đại tiện -->
        <tr v-if="MASTERDATA['IPDIAAUBOHA'] && !checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUBOHA"]) }}</th>
          <td>
          <div class="flex-box" style="flex-flow: row wrap">
            <template v-for="(item, index) in MASTERDATA['IPDIAAUBOHA'].Items.filter(item => item.Code === 'IPDIAAUBOHAREG' || item.Code === 'IPDIAAUBOHAINC' || item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHAOTH')">
              <div class="group-radio" :data="item" :key="index" :style="flexgroup(index)">
                <span @click="(item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHAINC') && setIPDIAAUITV2('IPDIAAUITV8');">
                  <input type="checkbox" :id="'IPDIAAUBOHAradio-' + index" v-model="item.Value" />
                  <label :class="{'label-b': item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHAINC'}" :for="'IPDIAAUBOHAradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIAAUBOHA'].Items, item); clickTqdt()">{{ __label(item) }}</label>
                </span>
                <textarea-autosize
                  style="line-height: 29px;"
                  rows="1"
                  v-if="item.Code === 'IPDIAAUBOHAOTH'&& item.Value"
                  :placeholder="__t('Nhập')"
                  class="form-control"
                  v-model="tqdtk"
                  :code="MASTERDATA['IPDIAAUBOHA'].Items[4].Code"
                />
              </div>
              <div v-if="index === 2" :key="index + 'flexIPDIAAUBOHAradio'" class="flex-break-sm"></div>
            </template>
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUBOHA'] && checkTab && DataSubmit.VersionApp >= 11">
          <th>{{ __label(MASTERDATA["IPDIAAUBOHA"]) }}</th>
          <td>
          <div class="flex-box" style="flex-flow: row wrap">
            <template v-for="(item, index) in MASTERDATA['IPDIAAUBOHA'].Items.filter(i => i.Code !== 'IPDIAAUBOHAINC' && i.Code !== 'IPDIAAUBOHAANS')" v-if="index < 2">
              <div class="group-radio" :data="item" :key="index" v-if="index < 2 ">
                <span @click=" (item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHANED') && setIPDIAAUITV2('IPDIAAUITV8NEW');">
                  <input type="checkbox" :id="'IPDIAAUBOHAradio-' + index" v-model="item.Value" />
                  <label :class="{'label-b': item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHANED'}" :for="'IPDIAAUBOHAradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIAAUBOHA'].Items, item); clickTqdt()" >{{ __label(item) }}</label>
                </span>
              </div>
              <div
                v-if="index === 2"
                :key="index + 'flexIPDIAAUBOHAradio'"
                class="flex-break-sm"
              ></div>
            </template>
            <template v-for="(item, index) in MASTERDATA['IPDIAAUBOHA'].Items" v-if="index === 5">
              <div class="group-radio" :data="item" :key="index">
                <span @click=" (item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHANED') && setIPDIAAUITV2('IPDIAAUITV8NEW');">
                  <input type="checkbox" :id="'IPDIAAUBOHAradio-' + index" v-model="item.Value" />
                  <label :class="{'label-b': item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHANED'}" :for="'IPDIAAUBOHAradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIAAUBOHA'].Items, item); clickTqdt()" >{{ __label(item) }}</label>
                </span>
              </div>
              <div
                v-if="index === 2"
                :key="index + 'flexIPDIAAUBOHAradio'"
                class="flex-break-sm"
              ></div>
            </template>
            <template v-for="(item, index) in MASTERDATA['IPDIAAUBOHA'].Items" v-if="index === 3">
              <div class="group-radio" :data="item" :key="index">
                <span @click=" (item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHANED') && setIPDIAAUITV2('IPDIAAUITV8NEW');">
                  <input type="checkbox" :id="'IPDIAAUBOHAradio-' + index" v-model="item.Value" />
                  <label :class="{'label-b': item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHANED'}" :for="'IPDIAAUBOHAradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIAAUBOHA'].Items, item); clickTqdt()" >{{ __label(item) }}</label>
                </span>
              </div>
              <div
                v-if="index === 2"
                :key="index + 'flexIPDIAAUBOHAradio'"
                class="flex-break-sm"
              ></div>
            </template>
            <textarea-autosize
              rows="1"
              style="flex-grow: 1"
              v-if="MASTERDATA['IPDIAAUBOHA'].Items[3].Value"
              :placeholder="__t('Nhập')"
              class="form-control"
              v-model="tqdtk"
              :code="MASTERDATA['IPDIAAUBOHA'].Items[4].Code"
            />
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUBOHA'] && checkTab && DataSubmit.VersionApp < 11">
          <th>{{ __label(MASTERDATA["IPDIAAUBOHA"]) }}</th>
          <td>
          <div class="flex-box" style="flex-flow: row wrap">
            <template v-for="(item, index) in MASTERDATA['IPDIAAUBOHA'].Items.filter(i => i.Code !== 'IPDIAAUBOHAINC' && i.Code !== 'IPDIAAUBOHAANS')" v-if="index < 2">
              <div class="group-radio" :data="item" :key="index" v-if="index < 2 ">
                <span @click=" (item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHANED') && setIPDIAAUITV2('IPDIAAUITV8');">
                  <input type="checkbox" :id="'IPDIAAUBOHAradio-' + index" v-model="item.Value" />
                  <label :class="{'label-b': item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHANED'}" :for="'IPDIAAUBOHAradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIAAUBOHA'].Items, item); clickTqdt()" >{{ __label(item) }}</label>
                </span>
              </div>
              <div
                v-if="index === 2"
                :key="index + 'flexIPDIAAUBOHAradio'"
                class="flex-break-sm"
              ></div>
            </template>
            <template v-for="(item, index) in MASTERDATA['IPDIAAUBOHA'].Items" v-if="index === 5">
              <div class="group-radio" :data="item" :key="index">
                <span @click=" (item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHANED') && setIPDIAAUITV2('IPDIAAUITV8');">
                  <input type="checkbox" :id="'IPDIAAUBOHAradio-' + index" v-model="item.Value" />
                  <label :class="{'label-b': item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHANED'}" :for="'IPDIAAUBOHAradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIAAUBOHA'].Items, item); clickTqdt()" >{{ __label(item) }}</label>
                </span>
              </div>
              <div
                v-if="index === 2"
                :key="index + 'flexIPDIAAUBOHAradio'"
                class="flex-break-sm"
              ></div>
            </template>
            <template v-for="(item, index) in MASTERDATA['IPDIAAUBOHA'].Items" v-if="index === 3">
              <div class="group-radio" :data="item" :key="index">
                <span @click=" (item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHANED') && setIPDIAAUITV2('IPDIAAUITV8');">
                  <input type="checkbox" :id="'IPDIAAUBOHAradio-' + index" v-model="item.Value" />
                  <label :class="{'label-b': item.Code === 'IPDIAAUBOHACON' || item.Code === 'IPDIAAUBOHANED'}" :for="'IPDIAAUBOHAradio-' + index" @click="checkbox2Radio(MASTERDATA['IPDIAAUBOHA'].Items, item); clickTqdt()" >{{ __label(item) }}</label>
                </span>
              </div>
              <div
                v-if="index === 2"
                :key="index + 'flexIPDIAAUBOHAradio'"
                class="flex-break-sm"
              ></div>
            </template>
            <textarea-autosize
              rows="1"
              style="flex-grow: 1"
              v-if="MASTERDATA['IPDIAAUBOHA'].Items[3].Value"
              :placeholder="__t('Nhập')"
              class="form-control"
              v-model="tqdtk"
              :code="MASTERDATA['IPDIAAUBOHA'].Items[4].Code"
            />
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUITV8'] && !checkTab">
          <th>{{ __label(MASTERDATA["IPDIAAUITV8"]) }}</th>
          <td>
          <div class="flex-box flex-center">
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV8'].Items"
            v-if="index !== 2"
            >
            <div
              class="flex-box flex-center"
              :class="{
              'disabel-table': index === 0 && onIPDIAAUITV8()
              }"
            >
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV8cxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV8cxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUITV8'] && checkTab && DataSubmit.Version >= 11">
          <th>{{ __t("InitialAssessment.label12") }}</th>
          <td>
          <div class="flex-box flex-center">
            <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV8'].Items"
            v-if="index === 2"
            >
            <div
              class="flex-box flex-center"
              :class="{
              'disabel-table': onIPDIAAUITV8Child()
              }"
            >
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV8cxoo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV8cxoo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
            </div>
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUITV8'] && checkTab && DataSubmit.Version < 11">
          <th>{{ __t("InitialAssessment.label12") }}</th>
          <td>
          <div class="flex-box flex-center">
            <div
              :data="item"
              :key="index"
              v-for="(item, index) in MASTERDATA['IPDIAAUITV8'].Items.filter(
              i => i.Code === 'IPDIAAUITV8IAP'
              )"
            >
            <div
              class="flex-box flex-center"
              :class="{
              'disabel-table': index === 0 && onIPDIAAUITV8()
              }"
            >
              <div class="v-checkbox">
              <input
                type="checkbox"
                :id="'IPDIAAUITV8cxo-' + index"
                v-model="item.Value"
              />
              <label :for="'IPDIAAUITV8cxo-' + index"></label>
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
      <!-- 12. Đánh giá về tiết niệu -->
      <table
       class="table v-table-1 no-margin col-1-1"
       :id="DataSubmit.VersionApp >= 11 ? 'InitialAssessment-ForAdult-block12' : 'InitialAssessment-ForAdult-block11'"
      >
       <tr>
        <td colspan="2" class="no-padding" v-if="DataSubmit.VersionApp >= 11">
         <div class="tbl-title" v-if="!checkTab">
          12. {{ __t("Đánh giá về tiết niệu") }}
         </div>
         <div class="tbl-title" v-else>
          10. {{ __t("InitialAssessment.label13") }}
         </div>
        </td>
        <td colspan="2" class="no-padding" v-else>
         <div class="tbl-title" v-if="!checkTab">
          11. {{ __t("Đánh giá về tiết niệu") }}
         </div>
         <div class="tbl-title" v-else>
          10. {{ __t("InitialAssessment.label13") }}
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUURAS'] && !checkTab">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUURAS"]) }}</div>
        </th>
        <td>
         <div class="flex-box flex-center" style="flex-flow: row wrap">
          <template
           :data="item"
           v-for="(item, index) in MASTERDATA['IPDIAAUURAS'].Items.filter(i => i.Code !== 'IPDIAAUURASCATH')"
          >
           <div
            @click="
             (item.Code === 'IPDIAAUURASINC' ||
              item.Code === 'IPDIAAUURASURC') &&
              setIPDIAAUITV2('IPDIAAUITV9');
            "
            :key="index"
            class="flex-box flex-center"
            v-if="item.DataType === 'Checkbox'"
           >
            <!-- {{item.Value}} -->
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUURAScxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUURAScxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span
              :class="{
               'label-b':
                item.Code === 'IPDIAAUURASINC' || item.Code === 'IPDIAAUURASURC'
              }"
              >{{ __label(item) }}</span
             ></span
            >
           </div>
           <div
            class="mgl-5"
            style="flex-grow: 1"
            :key="index"
            v-if="MASTERDATA['IPDIAAUURAS'].Items[4].Value && item.DataType === 'Text'"
           >
            <textarea-autosize
             rows="1"
             :placeholder="__t('Nhập')"
             class="form-control"
             v-model="item.Value"
             :code="MASTERDATA['IPDIAAUURAS'].Items[5].Code"
            />
           </div>
           <div
            v-if="index === 3"
            :key="index + 'flexIPDIAAUURASradio'"
            class="flex-break"
           ></div>
          </template>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUURAS'] && checkTab">
        <th width="1">
         <div class="w160">{{ __t("InitialAssessment.label13") }}</div>
        </th>
        <td>
         <div class="flex-box flex-center">
          <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUURAS'].Items.filter(
              i =>
              i.Code === 'IPDIAAUURASNOR' ||
              i.Code === 'IPDIAAUURASDIU' ||
              i.Code === 'IPDIAAUURASCATH' ||
              i.Code === 'IPDIAAUURASOTH'
            )"
            v-if="index < 2"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
                <input
                  type="checkbox"
                  :id="'IPDIAAUURAScxo-' + index"
                  v-model="item.Value"
                />
                <label :for="'IPDIAAUURAScxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
          </div>
          <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUURAS'].Items.filter(
              i =>
              i.Code === 'IPDIAAUURASNOR' ||
              i.Code === 'IPDIAAUURASDIU' ||
              i.Code === 'IPDIAAUURASCATH' ||
              i.Code === 'IPDIAAUURASOTH'
            )"
            v-if="index === 3"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
                <input
                  type="checkbox"
                  :id="'IPDIAAUURAScxo-' + index"
                  v-model="item.Value"
                />
                <label :for="'IPDIAAUURAScxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
          </div>
          <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUURAS'].Items.filter(
              i =>
              i.Code === 'IPDIAAUURASNOR' ||
              i.Code === 'IPDIAAUURASDIU' ||
              i.Code === 'IPDIAAUURASCATH' ||
              i.Code === 'IPDIAAUURASOTH'
            )"
            v-if="index === 2"
            >
            <div class="flex-box flex-center">
              <div class="v-checkbox">
                <input
                  type="checkbox"
                  :id="'IPDIAAUURAScxo-' + index"
                  v-model="item.Value"
                />
                <label :for="'IPDIAAUURAScxo-' + index"></label>
              </div>
              <span class="displaytbl"
              ><span>{{ __label(item) }}</span></span
              >
            </div>
          </div>
          <div
           style="flex-grow: 1"
           class="flex-box flex-center ml-10"
           v-if="MASTERDATA['IPDIAAUURAS'].Items[4].Value"
          >
           <textarea-autosize
            rows="1"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUURAS'].Items[5].Value"
            :code="MASTERDATA['IPDIAAUURAS'].Items[5].Code"
           />
          </div>
         </div>
        </td>
       </tr>
       <!-- Hướng xử trí hỗ trợ -->
       <tr v-if="MASTERDATA['IPDIAAUITV9'] && !checkTab">
        <th>{{ __label(MASTERDATA["IPDIAAUITV9"]) }}</th>
        <td>
         <div class="flex-box flex-center">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUITV9'].Items"
          >
           <div
            class="flex-box flex-center"
            :class="{
             'disabel-table': index === 0 && onIPDIAAUITV9()
            }"
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUITV9cxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUITV9cxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span>{{ __label(item) }}</span></span
            >
           </div>
          </div>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUITV9'] && checkTab">
        <th>{{ __t("InitialAssessment.label12") }}</th>
        <td>
         <div class="flex-box flex-center">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUITV9'].Items"
          >
           <div class="flex-box flex-center">
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUITV9cxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUITV9cxo-' + index"></label>
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
      <!-- 13. Đánh giá về yếu tố xã hội -->
      <table
       class="table v-table-1 no-margin col-1-1"
       :id="DataSubmit.VersionApp >= 11 ? 'InitialAssessment-ForAdult-block13' : 'InitialAssessment-ForAdult-block12'"
      >
       <tr>
        <td colspan="2" class="no-padding" v-if="DataSubmit.VersionApp >= 11">
         <div class="tbl-title" v-if="!checkTab">
          13. {{ __t("Đánh giá về yếu tố xã hội") }}
         </div>
         <div class="tbl-title" v-else>
          11. {{ __t("InitialAssessment.label14") }}
         </div>
        </td>
        <td colspan="2" class="no-padding" v-else>
         <div class="tbl-title" v-if="!checkTab">
          12. {{ __t("Đánh giá về yếu tố xã hội") }}
         </div>
         <div class="tbl-title" v-else>
          11. {{ __t("InitialAssessment.label14") }}
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUMARR'] && !checkTab">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUMARR"]) }}</div>
        </th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUMARR'].Items"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUMARRradio-' + index"
            v-model="item.Value"
           />
           <label
            :for="'IPDIAAUMARRradio-' + index"
            @click="checkbox2RadioText(MASTERDATA['IPDIAAUMARR'].Items, item);"
            >{{ __label(item) }}</label
           >
          </span>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAURELI']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAURELI"]) }}</div>
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
            <textarea-autosize
             class="form-control"
             :placeholder="__t('Nhập')"
             v-model="item.Value"
             v-if="MASTERDATA['IPDIAAURELI'].Items[0].Value == 6"
             :code="MASTERDATA['IPDIAAURELI'].Items[1].Code"
            />
           </span>
          </template>
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAULIWI'] && !checkTab">
        <th>{{ __label(MASTERDATA["IPDIAAULIWI"]) }}</th>
        <td>
         <div class="flex-box flex-center">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAULIWI'].Items.filter(
            i =>
             i.Code === 'IPDIAAULIWIALO' ||
             i.Code == 'IPDIAAULIWICHI' ||
             i.Code === 'IPDIAAULIWIPAR' ||
             i.Code === 'IPDIAAULIWIGRA' ||
             i.Code === 'IPDIAAULIWIOTH' ||
             i.Code === 'IPDIAAULIWIFRI' ||
             i.Code === 'IPDIAAULIWIWOH'
           )"
          >
           <div class="flex-box flex-center" v-if="item.Code === 'IPDIAAULIWIALO'">
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
           <div class="flex-box flex-center" v-if="item.Code !== 'IPDIAAULIWIALO'">
            <div class="v-checkbox">
             <input
              :disabled="hasChoose"
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
           v-if="MASTERDATA['IPDIAAULIWI'].Items[6].Value"
          >
           <textarea-autosize
            rows="1"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAULIWI'].Items[7].Value"
            :code="MASTERDATA['IPDIAAULIWI'].Items[7].Code"
           />
          </div>
         </div>
        </td>
       </tr>
       <!-- Đang ở cùng ai -->
       <tr v-if="MASTERDATA['IPDIAAULIWI'] && checkTab">
        <th>{{ __label(MASTERDATA["IPDIAAULIWI"]) }}</th>
        <td>
         <div class="flex-box flex-center">
          <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAULIWI'].Items.filter(
            i =>
             i.Code === 'IPDIAAULIWIPAR' ||
             i.Code == 'IPDIAAULIWISM' ||
             i.Code === 'IPDIAAULIWISD' ||
             i.Code === 'IPDIAAULIWIGRA' ||
             i.Code === 'IPDIAAULIWIOTH'
            )"
            v-if="index !== 2"
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
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAULIWI'].Items.filter(
            i =>
             i.Code === 'IPDIAAULIWIPAR' ||
             i.Code == 'IPDIAAULIWISM' ||
             i.Code === 'IPDIAAULIWISD' ||
             i.Code === 'IPDIAAULIWIGRA' ||
             i.Code === 'IPDIAAULIWIOTH'
            )"
            v-if="index === 2"
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
           v-if="MASTERDATA['IPDIAAULIWI'].Items[6].Value"
          >
           <textarea-autosize
            rows="1"
            :placeholder="__t('Nhập')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAULIWI'].Items[7].Value"
           />
          </div>
         </div>
        </td>
       </tr>
       <!-- Người bệnh có phải leo cầu thang hằng ngày không ? -->
       <tr v-if="MASTERDATA['IPDIAAUDTPH'] && !checkTab">
        <th>{{ __label(MASTERDATA["IPDIAAUDTPH"]) }}</th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUDTPH'].Items"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUDTPHradio-' + index"
            v-model="item.Value"
           />
           <label
            :for="'IPDIAAUDTPHradio-' + index"
            @click="checkbox2RadioText(MASTERDATA['IPDIAAUDTPH'].Items, item);"
            >{{ __label(item) }}</label
           >
          </span>
         </div>
        </td>
       </tr>
       <!-- Việc làm -->
       <tr v-if="MASTERDATA['IPDIAAUEMPL'] && !checkTab">
        <th>{{ __label(MASTERDATA["IPDIAAUEMPL"]) }}</th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUEMPL'].Items"
           v-if="item.DataType === 'Radio'"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUEMPLradio-' + index"
            v-model="item.Value"
           />
           <label
            :for="'IPDIAAUEMPLradio-' + index"
            @click="checkbox2Radio(MASTERDATA['IPDIAAUEMPL'].Items, item);"
            >{{ __label(item) }}</label
           >
          </span>
          <textarea-autosize
           style="line-height: 29px;"
           rows="1"
           v-if="MASTERDATA['IPDIAAUEMPL'].Items[2].Value"
           :placeholder="__t('Nhập')"
           class="form-control"
           v-model="MASTERDATA['IPDIAAUEMPL'].Items[3].Value"
           :code="MASTERDATA['IPDIAAUEMPL'].Items[3].Code"
          />
         </div>
        </td>
       </tr>
       <!-- Là lao động chính trong gia đình -->
       <tr v-if="MASTERDATA['IPDIAAUSOPR'] && !checkTab">
        <th>{{ __label(MASTERDATA["IPDIAAUSOPR"]) }}</th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSOPR'].Items"
           v-if="item.DataType === 'Radio'"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUSOPRradio-' + index"
            v-model="item.Value"
           />
           <label
            :for="'IPDIAAUSOPRradio-' + index"
            @click="checkbox2Radio(MASTERDATA['IPDIAAUSOPR'].Items, item);"
            >{{ __label(item) }}</label
           >
          </span>
          <textarea-autosize
           style="line-height: 29px;"
           rows="1"
           v-if="MASTERDATA['IPDIAAUSOPR'].Items[2].Value"
           :placeholder="__t('Nhập')"
           class="form-control"
           v-model="MASTERDATA['IPDIAAUSOPR'].Items[3].Value"
           :code="MASTERDATA['IPDIAAUSOPR'].Items[3].Code"
          />
         </div>
        </td>
       </tr>
       <!-- Sử dụng chất cồn -->
       <tr v-if="MASTERDATA['IPDIAAUALUS'] && !checkTab">
        <th>{{ __label(MASTERDATA["IPDIAAUALUS"]) }}</th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUALUS'].Items"
           v-if="index < 2"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUALUSradio-' + index"
            v-model="item.Value"
           />
           <label
            :for="'IPDIAAUALUSradio-' + index"
            @click="checkbox2RadioText(MASTERDATA['IPDIAAUALUS'].Items, item);"
            >{{ __label(item) }}</label
           >
          </span>
          <textarea-autosize
           style="line-height: 29px;"
           rows="1"
           v-if="MASTERDATA['IPDIAAUALUS'].Items[0].Value"
           :placeholder="__t('Mô tả chi tiết')"
           class="form-control"
           v-model="MASTERDATA['IPDIAAUALUS'].Items[2].Value"
           :code="MASTERDATA['IPDIAAUALUS'].Items[2].Code"
          />
         </div>
        </td>
       </tr>
       <!-- Thuốc lá hoặc thuốc gây nghiện -->
       <tr v-if="MASTERDATA['IPDIAAUTOSD'] && !checkTab">
        <th>{{ __label(MASTERDATA["IPDIAAUTOSD"]) }}</th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUTOSD'].Items"
           v-if="index < 2"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUTOSDradio-' + index"
            v-model="item.Value"
           />
           <label
            :for="'IPDIAAUTOSDradio-' + index"
            @click="checkbox2Radio(MASTERDATA['IPDIAAUTOSD'].Items, item);"
            >{{ __label(item) }}</label
           >
          </span>
          <textarea-autosize
           style="line-height: 29px;"
           rows="1"
           v-if="MASTERDATA['IPDIAAUTOSD'].Items[0].Value"
           :placeholder="__t('Mô tả chi tiết')"
           class="form-control"
           v-model="MASTERDATA['IPDIAAUTOSD'].Items[2].Value"
           :code="MASTERDATA['IPDIAAUTOSD'].Items[2].Code"
          />
         </div>
        </td>
       </tr>
       <!-- Hiện có rắc rối pháp lý -->
       <tr v-if="MASTERDATA['IPDIAAULEIS'] && !checkTab">
        <th>{{ __label(MASTERDATA["IPDIAAULEIS"]) }}</th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAULEIS'].Items"
           v-if="index < 2"
          >
           <input
            type="checkbox"
            :id="'IPDIAAULEISradio-' + index"
            v-model="item.Value"
           />
           <label
            :for="'IPDIAAULEISradio-' + index"
            @click="checkbox2Radio(MASTERDATA['IPDIAAULEIS'].Items, item);"
            >{{ __label(item) }}</label
           >
          </span>
          <textarea-autosize
           style="line-height: 29px;"
           rows="1"
           v-if="MASTERDATA['IPDIAAULEIS'].Items[0].Value"
           :placeholder="__t('Mô tả chi tiết')"
           class="form-control"
           v-model="MASTERDATA['IPDIAAULEIS'].Items[2].Value"
           :code="MASTERDATA['IPDIAAULEIS'].Items[2].Code"
          />
         </div>
        </td>
       </tr>
       <!-- Có dấu hiệu tự làm thương tổn bản thân -->
       <tr v-if="MASTERDATA['IPDIAAUSEIN'] && !checkTab">
        <th>{{ __label(MASTERDATA["IPDIAAUSEIN"]) }}</th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSEIN'].Items"
           v-if="index < 2"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUSEINradio-' + index"
            v-model="item.Value"
           />
           <label
            :for="'IPDIAAUSEINradio-' + index"
            @click="checkbox2Radio(MASTERDATA['IPDIAAUSEIN'].Items, item);"
            >{{ __label(item) }}</label
           >
          </span>
          <textarea-autosize
           style="line-height: 29px;"
           rows="1"
           v-if="MASTERDATA['IPDIAAUSEIN'].Items[0].Value"
           :placeholder="__t('Mô tả chi tiết')"
           class="form-control"
           v-model="MASTERDATA['IPDIAAUSEIN'].Items[2].Value"
           :code="MASTERDATA['IPDIAAUSEIN'].Items[2].Code"
          />
         </div>
        </td>
       </tr>
       <!-- Có biểu hiện muốn tự tử -->
       <tr v-if="MASTERDATA['IPDIAAUSUTE'] && !checkTab">
        <th>{{ __label(MASTERDATA["IPDIAAUSUTE"]) }}</th>
        <td>
         <div class="group-radio">
          <span
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSUTE'].Items"
           v-if="index < 2"
          >
           <input
            type="checkbox"
            :id="'IPDIAAUSUTEradio-' + index"
            v-model="item.Value"
           />
           <label
            :for="'IPDIAAUSUTEradio-' + index"
            @click="checkbox2Radio(MASTERDATA['IPDIAAUSUTE'].Items, item);"
            >{{ __label(item) }}</label
           >
          </span>
          <textarea-autosize
           style="line-height: 29px;"
           rows="1"
           v-if="MASTERDATA['IPDIAAUSUTE'].Items[0].Value"
           :placeholder="__t('Mô tả chi tiết')"
           class="form-control"
           v-model="MASTERDATA['IPDIAAUSUTE'].Items[2].Value"
           :code="MASTERDATA['IPDIAAUSUTE'].Items[2].Code"
          />
         </div>
        </td>
       </tr>
       <!-- Có dấu hiệu nghi ngờ bị lạm dụng -->
       <tr v-if="MASTERDATA['IPDIAAUABSU'] && !checkTab">
        <th>{{ __label(MASTERDATA["IPDIAAUABSU"]) }}</th>
        <td>
         <div class="flex-box flex-scenter">
          <div class="group-radio">
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUABSU'].Items"
            v-if="index < 2"
           >
            <input
             type="checkbox"
             :id="'IPDIAAUABSUradio-' + index"
             v-model="item.Value"
            />
            <label
             :for="'IPDIAAUABSUradio-' + index"
             @click="checkbox2Radio(MASTERDATA['IPDIAAUABSU'].Items, item);"
             >{{ __label(item) }}</label
            >
           </span>
          </div>
          <textarea-autosize
           style="line-height: 29px; flex-grow: 1"
           rows="1"
           v-if="MASTERDATA['IPDIAAUABSU'].Items[0].Value"
           :placeholder="__t('Mô tả chi tiết')"
           class="form-control"
           v-model="MASTERDATA['IPDIAAUABSU'].Items[2].Value"
           :code="MASTERDATA['IPDIAAUABSU'].Items[2].Code"
          />
         </div>
         <div
          class="flex-box flex-center mb-5"
          v-if="MASTERDATA['IPDIAAUABSU'].Items[0].Value"
         >
          <span class="mgr-5">{{ __label(MASTERDATA["IPDIAAURATT"]) }}</span>
          <div class="group-radio">
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAURATT'].Items"
           >
            <input
             type="checkbox"
             :id="'IPDIAAURATTradio-' + index"
             v-model="item.Value"
            />
            <label
             :for="'IPDIAAURATTradio-' + index"
             @click="checkbox2Radio(MASTERDATA['IPDIAAURATT'].Items, item);"
             >{{ __label(item) }}</label
            >
           </span>
          </div>
         </div>
         <div
          class="flex-box flex-center"
          v-if="MASTERDATA['IPDIAAUABSU'].Items[0].Value"
         >
          <span class="mgr-5">{{ __label(MASTERDATA["IPDIAAUTTSW"]) }}</span>
          <div class="group-radio">
           <span
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDIAAUTTSW'].Items"
           >
            <input
             type="checkbox"
             :id="'IPDIAAUTTSWradio-' + index"
             v-model="item.Value"
            />
            <label
             :for="'IPDIAAUTTSWradio-' + index"
             @click="checkbox2Radio(MASTERDATA['IPDIAAUTTSW'].Items, item);"
             >{{ __label(item) }}</label
            >
           </span>
          </div>
         </div>
        </td>
       </tr>
       <!-- anh chị em -->
       <tr v-if="MASTERDATA['IPDIAAUSL'] && checkTab">
        <th>{{ __label(MASTERDATA["IPDIAAUSL"]) }}</th>
        <td>
         <!--
          <div class="flex-box flex-center mb-20">
           <div class="flex-box flex-center">
            <textarea-autosize
             rows="1"
             :placeholder="__t('Nhập')"
             class="form-control"
             v-model="MASTERDATA['IPDIAAUSL'].Items[0].Value"
            />
           </div>
          </div>
         -->
         <div class="w150 display-inline mr-10 mb-20">
          <div
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUSL'].Items"
          >
           <div class="mb-5">
            <b>{{ __t("InitialAssessment.number") }}</b>
            <!-- <span class="note-text">({{ __t("%") }})</span> -->
           </div>
           <input
            class="form-control"
            v-model="item.Value"
            :placeholder="__t('Nhập')"
           />
          </div>
         </div>
         <table class="table observation-table no-margin tbl-b2">
          <thead>
           <tr>
            <th class="text-left" width="150px">
             {{ __t("InitialAssessment.age") }}
            </th>
            <th width="150px" class="text-left no-wrap">
             {{ __t("InitialAssessment.gender") }}
            </th>
           </tr>
          </thead>
          <template v-if="DataSubmit.Siblings && DataSubmit.Siblings.length">
           <tbody>
            <tr :key="index" v-for="(item, index) in DataSubmit.Siblings">
             <!--
              <template v-if="!RealOnly">
               <td><textarea-autosize v-model="item.Age" rows="1" class="form-control" :placeholder="__t('Nhập')"/></td><textarea-autosize v-model="item.Age" rows="1" class="form-control" :placeholder="__t('Nhập')"/></td>
               <td><textarea-autosize v-model="item.Gender" rows="1" class="form-control" :placeholder="__t('Nhập')"/></td>
              </template>
             -->
             <template>
              <td style="position: relative">
               <button class="btn-pos-left" @click="remove(item, index);">
                <i class="fa fa-trash" aria-hidden="true"></i>
               </button>
               <VNumberInput v-model="item.Age" />
              </td>
              <td width="110px">
               <radio-list v-model="item.Gender" :options="GENDERLIST" />
              </td>
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
       <tr v-if="MASTERDATA['IPDIAAUTT'] && checkTab">
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
       <!-- Hướng xử lý hỗ trợ -->
       <tr v-if="MASTERDATA['IPDIAAUITV10'] && !checkTab">
        <th>{{ __t("InitialAssessment.label12") }}</th>
        <td>
         <div>
          <div class="flex-box flex-center" style="flex-flow: row wrap">
           <template
            :data="item"
            v-for="(item, index) in MASTERDATA['IPDIAAUITV10'].Items"
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
               :id="'IPDIAAUITV10cxo-' + index"
               v-model="item.Value"
              />
              <label :for="'IPDIAAUITV10cxo-' + index"></label>
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
            :id="'IPDIAAUITV10cxo-' + 2"
            v-model="MASTERDATA['IPDIAAUITV10'].Items[2].Value"
           />
           <label :for="'IPDIAAUITV10cxo-' + 2"></label>
          </div>
          <span class="displaytbl w200"
           ><span>{{
            __label(MASTERDATA["IPDIAAUITV10"].Items[2])
           }}</span></span
          >
          <textarea-autosize
           rows="1"
           v-if="MASTERDATA['IPDIAAUITV10'].Items[2].Value"
           :placeholder="__t('Nhập')"
           class="form-control mgl-5"
           v-model="MASTERDATA['IPDIAAUITV10'].Items[4].Value"
          />
         </div>
         <div class="flex-box flex-center">
          <div class="v-checkbox">
           <input
            type="checkbox"
            :id="'IPDIAAUITV10cxo-' + 3"
            v-model="MASTERDATA['IPDIAAUITV10'].Items[3].Value"
           />
           <label :for="'IPDIAAUITV10cxo-' + 3"></label>
          </div>
          <span class="displaytbl w200"
           ><span>{{
            __label(MASTERDATA["IPDIAAUITV10"].Items[3])
           }}</span></span
          >
          <textarea-autosize
           v-if="MASTERDATA['IPDIAAUITV10'].Items[3].Value"
           rows="1"
           :placeholder="__t('Nhập')"
           class="form-control mgl-5"
           v-model="MASTERDATA['IPDIAAUITV10'].Items[5].Value"
           :code="MASTERDATA['IPDIAAUITV10'].Items[5].Code"
          />
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUITV10'] && checkTab">
        <th v-if="!checkTab">{{ __label(MASTERDATA["IPDIAAUITV10"]) }}</th>
        <th v-else>{{ __t("InitialAssessment.label12") }}</th>
        <td>
         <div class="flex-box flex-center">
          <div
           :data="item"
           :key="index"
           v-for="(item, index) in MASTERDATA['IPDIAAUITV10'].Items.filter(
            i => i.Code === 'IPDIAAUITV10FOH'
           )"
          >
           <div class="flex-box flex-center">
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
      <!-- 14. Tham khảo đánh giá ban đầu đặc biệt  -->
      <table
       v-if="!checkTab"
       class="table v-table-1 no-margin col-1-1"
       :id="DataSubmit.VersionApp >= 11 ? 'InitialAssessment-ForAdult-block14' : 'InitialAssessment-ForAdult-block13'"
      >
       <tr>
        <td colspan="2" class="no-padding" v-if="DataSubmit.VersionApp >= 11">
         <div class="tbl-title">
          14. {{ __t("Tham khảo đánh giá ban đầu đặc biệt") }}
         </div>
        </td>
        <td colspan="2" class="no-padding" v-else>
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
         <div class="flex-box flex-center" style="flex-flow: row wrap">
          <template
           :data="item"
           v-for="(item, index) in MASTERDATA['IPDIAAUOAIN'].Items"
          >
           <div
            :key="index"
            class="flex-box flex-center"
            v-if="item.DataType === 'Radio'"
           >
            <div class="v-checkbox">
             <input
              type="checkbox"
              :id="'IPDIAAUOAINcxo-' + index"
              v-model="item.Value"
             />
             <label :for="'IPDIAAUOAINcxo-' + index"></label>
            </div>
            <span class="displaytbl"
             ><span
              :class="{
               'label-b':
                item.Code === 'IPDIAAUOAININC' || item.Code === 'IPDIAAUOAINURC'
              }"
              >{{ __label(item) }}</span
             ></span
            >
           </div>
           <div
            class="mgl-5"
            style="flex-grow: 1"
            :key="index"
            v-if="
             item.DataType === 'Text' &&
              MASTERDATA['IPDIAAUOAIN'].Items[3].Value
            "
           >
            <textarea-autosize
             rows="1"
             :placeholder="__t('Nhập')"
             class="form-control"
             v-model="item.Value"
             :code="MASTERDATA['IPDIAAUOAIN'].Items[4].Code"
            />
           </div>
           <div
            v-if="index === 2"
            :key="index + 'flexIPDIAAUOAINradio'"
            class="flex-break"
           ></div>
          </template>
         </div>
         <div class="mt-5">
          <i>{{
           __t(
            "Thông tin đánh giá ban đầu đặc biệt tham khảo thông tin tại tab 2"
           )
          }}</i
          >:
          <router-link
           :to="{
            name: 'IPDInitialAssessmentSpecial',
            params: { Id: this.$route.params.Id }
           }"
           class="btn btn-sync-data"
           >{{ __t("NB nội trú đặc biệt") }}</router-link
          >
         </div>
        </td>
       </tr>
      </table>
      <!-- 15. Sàng lọc ban đầu bệnh dịch truyền nhiễm -->
      <table
       class="table v-table-1 no-margin col-1-1"
       :id="DataSubmit.VersionApp >= 11 ? 'InitialAssessment-ForAdult-block15' : 'InitialAssessment-ForAdult-block14'"
      >
       <tr>
        <td colspan="2" class="no-padding" v-if="DataSubmit.VersionApp >= 11">
         <div class="tbl-title" v-if="!checkTab">
          15. {{ __t("Sàng lọc ban đầu bệnh dịch truyền nhiễm") }}
         </div>
         <div class="tbl-title" v-else>
          12. {{ __t("InitialAssessment.label15") }}
         </div>
        </td>
        <td colspan="2" class="no-padding" v-else>
         <div class="tbl-title" v-if="!checkTab">
          14. {{ __t("Sàng lọc ban đầu bệnh dịch truyền nhiễm") }}
         </div>
         <div class="tbl-title" v-else>
          12. {{ __t("InitialAssessment.label15") }}
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
             @click="SyncDiseasesScreening(item.Value);"
             >{{ __t("InitialAssessment.label16") }}</label
            >
           </span>
          </div>
          <span v-if="!checkTab && DataSubmit.VersionApp >= 11" class="mgr-5">{{
           __t("Chọn vào ô này và bỏ qua mục 15")
          }}</span>
          <span v-else-if="!checkTab && DataSubmit.VersionApp < 11" class="mgr-5">{{
           __t("Chọn vào ô này và bỏ qua mục 14")
          }}</span>
          <span v-else class="mgr-5">{{
           __t("InitialAssessment.tickBox")
          }}</span>
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
                 @click="checkbox2Radio(MASTERDATA['IPDIAAUFERV'].Items, item);"
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
                 @click="checkbox2Radio(MASTERDATA['IPDIAAURUSL'].Items, item);"
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
                 @click="checkbox2Radio(MASTERDATA['IPDIAAUTRAV'].Items, item);"
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
                 @click="checkbox2Radio(MASTERDATA['IPDIAAUCOUG'].Items, item);"
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
                 @click="checkbox2Radio(MASTERDATA['IPDIAAUCCWS'].Items, item);"
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
              @click="checkbox2Radio(MASTERDATA['IPDIAAUTSIP'].Items, item);"
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
                @click="checkbox2Radio(MASTERDATA['IPDIAAULOCL'].Items, item);"
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
           :code="MASTERDATA['IPDIAAUNEID'].Items[3].Code"
          />
         </div>
        </td>
       </tr>
      </table>
      <!-- 16. Yêu cầu khách vào thăm -->
      <table
       class="table v-table-1 no-margin col-1-1"
       :id="DataSubmit.VersionApp >= 11 ? 'InitialAssessment-ForAdult-block16' : 'InitialAssessment-ForAdult-block15'"
      >
        <tr>
          <td colspan="2" class="no-padding" v-if="DataSubmit.VersionApp >= 11">
          <div class="tbl-title" v-if="!checkTab">
            16. {{ __t("Yêu cầu khách vào thăm") }}
          </div>
          <div class="tbl-title" v-else>
            13. {{ __t("InitialAssessment.permission") }}
          </div>
          </td>
          <td colspan="2" class="no-padding" v-else>
          <div class="tbl-title" v-if="!checkTab">
            15. {{ __t("Yêu cầu khách vào thăm") }}
          </div>
          <div class="tbl-title" v-else>
            13. {{ __t("InitialAssessment.permission") }}
          </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IPDIAAUNBDY']">
          <th width="1">
          <div class="w160">{{ __label(MASTERDATA["IPDIAAUNBDY"]) }}</div>
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
              @click="checkbox2Radio(MASTERDATA['IPDIAAUNBDY'].Items, item);"
              >{{ __label(item) }}</label
            >
            </span>
            <textarea-autosize
            style="line-height: 29px;"
            rows="1"
            v-if="MASTERDATA['IPDIAAUNBDY'].Items[1].Value"
            :placeholder="__t('Ghi rõ yêu cầu')"
            class="form-control"
            v-model="MASTERDATA['IPDIAAUIPAN'].Items[0].Value"
            :code="MASTERDATA['IPDIAAUIPAN'].Items[0].Code"
            />
          </div>
          <div class="mt-5">
            <i>{{ __label(MASTERDATA["IPDIAAUNISR"]) }}</i>
          </div>
          </td>
        </tr>
      </table>
      <!-- 17. Nếu không có đánh giá khác thì chọn không -->
      <table
       class="table v-table-1 no-margin col-1-1"
       :id="DataSubmit.VersionApp >= 11 ? 'InitialAssessment-ForAdult-block17' : 'InitialAssessment-ForAdult-block16'"
      >
       <tr>
        <td colspan="2" class="no-padding" v-if="DataSubmit.VersionApp >= 11">
         <div class="tbl-title" v-if="!checkTab">
          17. {{ __t("Các đánh giá khác nếu cần") }}
         </div>
         <div class="tbl-title" v-else>
          14. {{ __t("InitialAssessment.other") }}
         </div>
        </td>
        <td colspan="2" class="no-padding" v-else>
         <div class="tbl-title" v-if="!checkTab">
          16. {{ __t("Các đánh giá khác nếu cần") }}
         </div>
         <div class="tbl-title" v-else>
          14. {{ __t("InitialAssessment.other") }}
         </div>
        </td>
       </tr>
       <tr v-if="MASTERDATA['IPDIAAUITIN']">
        <th width="1">
         <div class="w160">{{ __label(MASTERDATA["IPDIAAUITIN"]) }}</div>
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
            @click="checkbox2Radio(MASTERDATA['IPDIAAUITIN'].Items, item);"
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
          :code="MASTERDATA['IPDIAAUITIN'].Items[2].Code"
         />
        </td>
       </tr>
      </table>

      <br /><br /><br />
      <div class="row">
        <div class="col-md-6 col-sm-6 text-center"></div>
        <!-- Confirm người lớn -->
        <div v-if="!checkTab && DataSubmit.VersionApp >= 11">
          <Confirm
          class="mt-10"
          :MasterDataCode="'FORADULTCONFIRM_USERCREATED'"
          :FormCode="'A02_013_220321_VE'"
          :ReadOnly="readonly"
          :AdInfo="[DataSubmit.CreatedBy]"
          :VisitId="_VisitId"
          :FormId="DataSubmit.Id"
          :saveSuccesss="saveSuccesss"
          @handleConfirm="submit('confirm')"
          @confirmSuccess="getData()"
          />
        </div>
        <div class="col-md-6 col-sm-6 text-center" v-else-if="!checkTab && DataSubmit.VersionApp < 11">
          <template v-if="DataSubmit.UpdatedAt && DataSubmit.UpdatedBy">
          <p>{{ DataSubmit.UpdatedAt }}</p>
          <eform-signature
          :ad="DataSubmit.UpdatedBy.Username"
          :title="__t('Điều dưỡng thực hiện')"
          />
          </template>
        </div>
        <!-- Confirm nhi -->
        <div v-if="checkTab && DataSubmit.VersionApp >= 9">
          <Confirm
            class="mt-10"
            ref="Confirm"
            :MasterDataCode="'A02_014_220321_VE'"
            :FormCode="'A02_014_220321_VE'"
            :ReadOnly="readonly"
            :AdInfo="[DataSubmit.CreatedBy]"
            :VisitId="_VisitId"
            :FormId="DataSubmit.Id"
            :saveSuccesss="saveSuccesss"
            @handleConfirm="submit('confirm')"
            @confirmSuccess="getData()"
          />
        </div>
        <div class="col-md-6 col-sm-6 text-center" v-else-if="checkTab && DataSubmit.VersionApp !== 9">
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
       <p v-if="!checkTab">A02_013_220321_VE</p>
       <p v-else>A02_014_220321_VE</p>
       <logs
        :EdId="this.$route.params.Id"
        :Type="'InitialAssessment/ForAdult'"
        :noDetail="true"
       />
      </div>
      <p>
       {{ __t("Chỉnh sửa lần cuối bởi") }} <AdInfo
        v-if="DataSubmit.UpdatedBy"
        :ad="DataSubmit.UpdatedBy.Username"
       /> {{ __t("lúc") }} {{ DataSubmit.UpdatedAt | formatDateWithoutSecon }}
      </p>
     </div>
     <FloatBlock v-if="!readonlyFloatBlock">
      <template slot="top" v-if="syncInfo">
       <div style="color: #fff; text-align: right">
        <b>Dữ liệu được đồng bộ từ khoa:</b> {{ __label(syncInfo.Specialty) }}
       </div>
      </template>
      <template slot="buttons">
       <div v-if="!checkTab" class="col-md-2 col-sm-2">
        <div class="form-group1"><RemoveBtn v-if="DataSubmit && DataSubmit.CreatedBy === getCurrentUsername()" /></div>
       </div>
       <div class="col-md-2">
        <div class="form-group1"><p class="hidden-text">hidden-text</p></div>
       </div>
       <div class="col-md-3">
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
       <div class="col-md-5">
        <div class="form-group1">
         <button
         v-if="!isConfirm"
          class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
          type="button"
          v-shortkey="['ctrl', 's']"
          @shortkey="submit();"
          @click="submit();"
         >
          <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ __t("btn.luu") }}
         </button>
        </div>
       </div>
      </template>
     </FloatBlock>
    </template>
    <div v-else style="padding: 20px">
     <div class="text-center" v-if="!checkTab && !DataSubmit.IsLocked">
      <p>{{ __t("Chưa có đánh giá ban đầu người bệnh nội trú") }}</p>
      <button v-if="!IsLocked" class="btn btn-warning" @click="confirmPopup">
       {{ __t("Tạo mới") }}
      </button>
     </div>
     <div v-if="checkTab && !DataSubmit.IsLocked" class="text-center">
      <p>{{ __t("InitialAssessment.label8") }}</p>
      <button
       v-if="!IsLocked"
       class="btn btn-warning"
       @click="confirmPopupChild"
      >
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
import MedicalRecords from '@/services/MedicalRecords'
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
import ViewOnly from '@/components/IPD/ForAdultView.vue'
import ViewOnlyChild from '@/components/IPD/ForChildView.vue'
import _ from 'lodash'
import EventBus from '@/lib/eventBus'
import EIOService from '@/services/IPD/EIOService'
import Confirm from '@/components/Form/Confirm'
export default {
  name: 'IPDInitialAssessmentForAdultIndex',
  mixins: [MixinForm, MixinMasterData, FormMixin],
  data () {
    return {
      parameters: {
        pageNumber: 1,
        pages: 1,
        PageSize: 99999
      },
      check: false,
      PID: '',
      time: '',
      Record: '',
      saveSuccesss: false,
      isConfirm: false,
      tqdtk: '',
      GENDERLIST: constants.GENDERLIST,
      DataSubmit: {},
      listSilings: [],
      listSiblingDelete: [],
      showButton: true,
      loaded: false,
      menu: [
      ],
      syncInfo: null,
      IsLocked: false,
      IsExitTheOncologyMedicalRecord: false,
      Version: null
    }
  },
  components: {
    V2Select,
    Logs,
    RemoveBtn,
    VDatePicker,
    CommunicableDiseasesScreening,
    ViewOnly,
    ViewOnlyChild,
    Confirm
  },
  watch: {
    MASTERDATA: {
      handler () {
        if (this.MASTERDATA['IPDIAAUDIET'].Items[2].Value && this.DataSubmit.VersionApp >= 11 && !this.checkTab) {
          console.log('abc')
          this.MASTERDATA['IPDIAAUITV8'].Items[0].Value = true
        }
        if (this.MASTERDATA['IPDIAAUFERO'].Items[1].Value && this.DataSubmit.VersionApp >= 11 && !this.checkTab) {
          console.log('abc')
          this.MASTERDATA['IPDIAAUITV8'].Items[0].Value = true
        }
        if (this.MASTERDATA['IPDIAAUBOHA'].Items[2].Value && this.DataSubmit.VersionApp >= 11) {
          this.MASTERDATA['IPDIAAUITV8'].Items[0].Value = true
          this.MASTERDATA['IPDIAAUITV8'].Items[2].Value = true
        }
        if (this.MASTERDATA['IPDIAAULIWI'].Items[0].Value && this.DataSubmit.VersionApp >= 11) {
          this.changeData()
        }
        if (this.MASTERDATA['IPDIAAUALUS'].Items[1].Value && this.DataSubmit.VersionApp >= 11) {
          this.MASTERDATA['IPDIAAUALUS'].Items[2].Value = ''
        }
        if (!this.MASTERDATA['IPDIAAUMEST'].Items[1].Value && !this.MASTERDATA['IPDIAAUMEST'].Items[2].Value && this.DataSubmit.VersionApp >= 11 && !this.checkTab) {
          this.MASTERDATA['IPDIAAUMEST'].Items[5].Value = false
          this.MASTERDATA['IPDIAAUMEST'].Items[6].Value = ''
        }
        if (!this.MASTERDATA['IPDIAAUALUS'].Items[0].Value && !this.MASTERDATA['IPDIAAUALUS'].Items[1].Value) {
          this.MASTERDATA['IPDIAAUALUS'].Items[2].Value = ''
        }
      },
      deep: true
    }
    // DataSubmit (a, b) {}
  },
  mounted () {
    this.PID = this.$store.state.account.CurrentPatientObj.PID
    this.Version = this.$store.state.account.CurrentPatientObj.Version
    this.getMasterDatas({ Form: 'IPDIAAU' }, () => {
      this.MASTERDATA['IPDIAAUITV8'].Items[1].Value = true
      this.getData()
      if (this.checkTab) {
        // const list1 = this.MASTERDATA['IPDIAAUBOHA'].Items.filter(i => i.Code === 'IPDIAAUBOHAOTH')
        // this.MASTERDATA['IPDIAAUBOHA'].Items = this.MASTERDATA['IPDIAAUBOHA'].Items.filter(i => i.Code !== 'IPDIAAUBOHAOTH').concat(list1)
        // const list2 = this.MASTERDATA['IPDIAAUURAS'].Items.filter(i => i.Code === 'IPDIAAUURASOTH')
        // this.MASTERDATA['IPDIAAUURAS'].Items = this.MASTERDATA['IPDIAAUURAS'].Items.filter(i => i.Code !== 'IPDIAAUURASOTH').concat(list2)
        // const list3 = this.MASTERDATA['IPDIAAULIWI'].Items.filter(i => i.Code === 'IPDIAAULIWIOTH')
        // this.MASTERDATA['IPDIAAULIWI'].Items = this.MASTERDATA['IPDIAAULIWI'].Items.filter(i => i.Code !== 'IPDIAAULIWIOTH').concat(list3)
      } else {
        this.MASTERDATA['IPDIAAUCOLO'].Items = this.MASTERDATA['IPDIAAUCOLO'].Items.filter(i => i.Code !== 'IPDIAAUCOLOOTH' && i.Code !== 'IPDIAAUCOLOOTHANS')
      }
      this.MASTERDATA['IPDIAAUPIFCA'].Items[0].Value = false
    })
    // eslint-disable-next-line no-undef
    if (this.Version >= 11) {
      if (this.$route.name === 'IPDInitialAssessmentForAdult') {
        this.menu = [
          {
            label: 'Thông tin hành chính',
            blockId: '#InitialAssessment-ForAdult-block1'
          },
          {
            label: 'Đánh giá chung',
            blockId: '#InitialAssessment-ForAdult-block2'
          },
          {
            label: 'Đánh giá đau',
            blockId: '#InitialAssessment-ForAdult-block3'
          },
          {
            label: 'Đánh giá ban đầu nguy cơ ngã theo thang điểm Morse',
            blockId: '#InitialAssessment-ForAdult-block4'
          },
          {
            label: 'Đánh giá về hô hấp',
            blockId: '#InitialAssessment-ForAdult-block5'
          },
          {
            label: 'Đánh giá về da, niêm mạc',
            blockId: '#InitialAssessment-ForAdult-block6'
          },
          {
            label: 'Trạng thái thần kinh',
            blockId: '#InitialAssessment-ForAdult-block7'
          },
          {
            label: 'Đánh giá về tâm lý',
            blockId: '#InitialAssessment-ForAdult-block8'
          },
          {
            label: 'Đánh giá các hoạt động sinh hoạt hàng ngày',
            blockId: '#InitialAssessment-ForAdult-block9'
          },
          {
            label: 'Thiết bị cấy ghép',
            blockId: '#InitialAssessment-ForAdult-block10'
          },
          {
            label: 'Đánh giá về tiêu hóa và dinh dưỡng',
            blockId: '#InitialAssessment-ForAdult-block11'
          },
          {
            label: 'Đánh giá về tiết niệu',
            blockId: '#InitialAssessment-ForAdult-block12'
          },
          {
            label: 'Đánh giá về yếu tố xã hội',
            blockId: '#InitialAssessment-ForAdult-block13'
          },
          {
            label: 'Tham khảo đánh giá ban đầu đặc biệt',
            blockId: '#InitialAssessment-ForAdult-block14'
          },
          {
            label: 'InitialAssessment.label15',
            blockId: '#InitialAssessment-ForAdult-block15'
          },
          {
            label: 'Yêu cầu khách vào thăm',
            blockId: '#InitialAssessment-ForAdult-block16'
          },
          {
            label: 'Các đánh giá khác nếu cần',
            blockId: '#InitialAssessment-ForAdult-block17'
          }]
      } else if (this.$route.name === 'IPDInitialAssessmentForChild') {
        this.menu = [
          {
            // const a = $t('InitialAssessment.label2'),
            // label: 'Thông tin hành chính',
            label: 'InitialAssessment.label2',
            blockId: '#InitialAssessment-ForAdult-block1'
          },
          {
            label: 'Đánh giá chung',
            blockId: '#InitialAssessment-ForAdult-block2'
          },
          {
            label: 'InitialAssessment.label7',
            blockId: '#InitialAssessment-ForAdult-block3'
          },
          {
            label: 'InitialAssessment.label9',
            blockId: '#InitialAssessment-ForAdult-block4'
          },
          {
            label: 'InitialAssessment.label10',
            blockId: '#InitialAssessment-ForAdult-block7'
          },
          {
            label: 'Đánh giá về tâm lý',
            blockId: '#InitialAssessment-ForAdult-block8'
          },
          {
            label: 'InitialAssessment.label1',
            blockId: '#InitialAssessment-ForAdult-block9'
          },
          {
            label: 'Thiết bị cấy ghép',
            blockId: '#InitialAssessment-ForAdult-block10'
          },
          {
            label: 'InitialAssessment.label11',
            blockId: '#InitialAssessment-ForAdult-block11'
          },
          {
            label: 'InitialAssessment.label13',
            blockId: '#InitialAssessment-ForAdult-block12'
          },
          {
            label: 'InitialAssessment.label14',
            blockId: '#InitialAssessment-ForAdult-block13'
          },
          {
            label: 'InitialAssessment.label15',
            blockId: '#InitialAssessment-ForAdult-block15'
          },
          {
            label: 'InitialAssessment.permission',
            blockId: '#InitialAssessment-ForAdult-block16'
          },
          {
            label: 'InitialAssessment.other',
            blockId: '#InitialAssessment-ForAdult-block17'
          }]
      }
    } else {
      if (this.$route.name === 'IPDInitialAssessmentForAdult') {
        this.menu = [
          {
            label: 'Thông tin hành chính',
            blockId: '#InitialAssessment-ForAdult-block1'
          },
          {
            label: 'Đánh giá chung',
            blockId: '#InitialAssessment-ForAdult-block2'
          },
          {
            label: 'Đánh giá đau và nguy cơ ngã theo thang điểm Morse',
            blockId: '#InitialAssessment-ForAdult-block3'
          },
          {
            label: 'Đánh giá về hô hấp',
            blockId: '#InitialAssessment-ForAdult-block4'
          },
          {
            label: 'Đánh giá về da, niêm mạc',
            blockId: '#InitialAssessment-ForAdult-block5'
          },
          {
            label: 'Trạng thái thần kinh',
            blockId: '#InitialAssessment-ForAdult-block6'
          },
          {
            label: 'Đánh giá về tâm lý',
            blockId: '#InitialAssessment-ForAdult-block7'
          },
          {
            label: 'Đánh giá các hoạt động sinh hoạt hàng ngày',
            blockId: '#InitialAssessment-ForAdult-block8'
          },
          {
            label: 'Thiết bị cấy ghép',
            blockId: '#InitialAssessment-ForAdult-block9'
          },
          {
            label: 'Đánh giá về tiêu hóa và dinh dưỡng',
            blockId: '#InitialAssessment-ForAdult-block10'
          },
          {
            label: 'Đánh giá về tiết niệu',
            blockId: '#InitialAssessment-ForAdult-block11'
          },
          {
            label: 'Đánh giá về yếu tố xã hội',
            blockId: '#InitialAssessment-ForAdult-block12'
          },
          {
            label: 'Tham khảo đánh giá ban đầu đặc biệt',
            blockId: '#InitialAssessment-ForAdult-block13'
          },
          {
            label: 'InitialAssessment.label15',
            blockId: '#InitialAssessment-ForAdult-block14'
          },
          {
            label: 'Yêu cầu khách vào thăm',
            blockId: '#InitialAssessment-ForAdult-block15'
          },
          {
            label: 'Các đánh giá khác nếu cần',
            blockId: '#InitialAssessment-ForAdult-block16'
          }]
      } else if (this.$route.name === 'IPDInitialAssessmentForChild') {
        this.menu = [
          {
            // const a = $t('InitialAssessment.label2'),
            // label: 'Thông tin hành chính',
            label: 'InitialAssessment.label2',
            blockId: '#InitialAssessment-ForAdult-block1'
          },
          {
            label: 'Đánh giá chung',
            blockId: '#InitialAssessment-ForAdult-block2'
          },
          {
            label: 'InitialAssessment.label7',
            blockId: '#InitialAssessment-ForAdult-block3'
          },
          {
            label: 'InitialAssessment.label9',
            blockId: '#InitialAssessment-ForAdult-block5'
          },
          {
            label: 'InitialAssessment.label10',
            blockId: '#InitialAssessment-ForAdult-block6'
          },
          {
            label: 'Đánh giá về tâm lý',
            blockId: '#InitialAssessment-ForAdult-block7'
          },
          {
            label: 'InitialAssessment.label1',
            blockId: '#InitialAssessment-ForAdult-block8'
          },
          {
            label: 'Thiết bị cấy ghép',
            blockId: '#InitialAssessment-ForAdult-block9'
          },
          {
            label: 'InitialAssessment.label11',
            blockId: '#InitialAssessment-ForAdult-block10'
          },
          {
            label: 'InitialAssessment.label13',
            blockId: '#InitialAssessment-ForAdult-block11'
          },
          {
            label: 'InitialAssessment.label14',
            blockId: '#InitialAssessment-ForAdult-block12'
          },
          {
            label: 'InitialAssessment.label15',
            blockId: '#InitialAssessment-ForAdult-block14'
          },
          {
            label: 'InitialAssessment.permission',
            blockId: '#InitialAssessment-ForAdult-block15'
          },
          {
            label: 'InitialAssessment.other',
            blockId: '#InitialAssessment-ForAdult-block16'
          }]
      }
    }
    this.takeInfo()
  },
  computed: {
    hasChoose: function () {
      if (this.MASTERDATA['IPDIAAULIWI'].Items[0].Value && this.DataSubmit.VersionApp >= 11) {
        return true
      } else {
        return false
      }
    },
    readonly: function () {
      // return (
      //   this.DataSubmit.CreatedBy !== this.$store.state.account.Username ||
      //   this.DataSubmit.IsLocked === true
      // )
      // if (this.getUser() === 'tungpa1') {
      //   return false
      // }
      return (this.DataSubmit.CreatedBy !== this.$store.state.account.Username) || this.DataSubmit.IsLocked || this.isConfirm
      // return false
    },
    readonlyFloatBlock: function () {
      // return (
      //   this.DataSubmit.CreatedBy !== this.$store.state.account.Username ||
      //   this.DataSubmit.IsLocked === true
      // )
      if (this.getUser() === 'tungpa1') {
        return false
      }
      return (this.DataSubmit.CreatedBy !== this.$store.state.account.Username) || this.DataSubmit.IsLocked
      // return false
    },
    checkTab: function () {
      return this.$route.name === 'IPDInitialAssessmentForChild'
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
    },
    bsaCalculation: function () {
      var weight = this.MASTERDATA['IPDIAAUWEIG'].Items[0].Value
        ? parseFloat(this.MASTERDATA['IPDIAAUWEIG'].Items[0].Value)
        : 0
      var height = this.MASTERDATA['IPDIAAUHEIG'].Items[0].Value
        ? parseFloat(this.MASTERDATA['IPDIAAUHEIG'].Items[0].Value)
        : 0
      return Math.sqrt(((weight * height) / 3600)).toFixed(2) > 0 ? Math.sqrt(((weight * height) / 3600)).toFixed(2) : null
    }
  },
  methods: {
    async SyncVitalSignNew () {
      if (this.PID) {
        console.log('takeInfo: ')
        await new MedicalRecords(this.parameters).find(this.PID).then(response => {
          this.Record = response.Visit
          this.VitalSigns = this.Record[1] ? this.Record[1].VitalSigns : this.Record[0].VitalSigns
        })
        this.MASTERDATA['IPDIAAUPULS'].Items[0].Value = this.VitalSigns.Pulse
        this.MASTERDATA['IPDIAAUBLPR'].Items[0].Value = this.VitalSigns.BP
        this.MASTERDATA['IPDIAAUTEMP'].Items[0].Value = this.VitalSigns.To
        this.MASTERDATA['IPDIAAURERA'].Items[0].Value = this.VitalSigns.RR
        this.MASTERDATA['IPDIAAUHEIG'].Items[0].Value = this.VitalSigns.Height
        this.MASTERDATA['IPDIAAUWEIG'].Items[0].Value = this.VitalSigns.Weight
        // this.MASTERDATA['IPDIAAUPULS'].Items[0].Value = this.VitalSigns.Pulse
      }
    },
    onIPDIAAUITV8Child () {
      return this.MASTERDATA['IPDIAAUBOHA'].Items[2].Value || this.MASTERDATA['IPDIAAUBOHA'].Items[5].Value
    },
    async takeInfo () {
      if (this.PID) {
        console.log('takeInfo: ')
        await new MedicalRecords(this.parameters)
          .find(this.PID)
          .then(response => {
            this.Record = response.Visit
            this.time = this.Record[1] ? this.Record[1].ExaminationTime : this.Record[0].ExaminationTime
            // if (this.Record[0].Type === 'IPD') {
            //   this.time = this.Record[0].Recept
            // } else {
            //   this.time = this.Record[1].Recept
            // }
          }).catch(e => {
          })
        var _initial = this.time
        var fromTime = new Date(_initial)
        var toTime = new Date()
        var differenceTravel = toTime.getTime() - fromTime.getTime()
        console.log(differenceTravel)
        var seconds = Math.floor(differenceTravel / 1000 / 60 / 60 / 24)
        console.log(typeof seconds, 'check seconds')
        if (seconds >= 1) {
          this.check = false
        } else {
          this.check = true
        }
      }
    },
    changeData () {
      this.MASTERDATA['IPDIAAULIWI'].Items[1].Value = ''
      this.MASTERDATA['IPDIAAULIWI'].Items[2].Value = ''
      this.MASTERDATA['IPDIAAULIWI'].Items[3].Value = ''
      this.MASTERDATA['IPDIAAULIWI'].Items[4].Value = ''
      this.MASTERDATA['IPDIAAULIWI'].Items[5].Value = ''
      this.MASTERDATA['IPDIAAULIWI'].Items[6].Value = ''
      this.MASTERDATA['IPDIAAULIWI'].Items[7].Value = ''
    },
    handleClearData () {
      if (!this.MASTERDATA['IPDIAAUMEST'].Items[5].Value) {
        this.MASTERDATA['IPDIAAUMEST'].Items[6].Value = ''
      }
      if (!this.MASTERDATA['IPDIAAUMEST'].Items[7].Value) {
        this.MASTERDATA['IPDIAAUMEST'].Items[8].Value = ''
      }
      if (!this.MASTERDATA['IPDIAAUPSAS'].Items[6].Value) {
        this.MASTERDATA['IPDIAAUPSAS'].Items[7].Value = ''
      }
      if (!this.MASTERDATA['IPDIAAUIOED'].Items[6].Value) {
        this.MASTERDATA['IPDIAAUIOED'].Items[7].Value = ''
      }
      if (!this.MASTERDATA['IPDIAAUURAS'].Items[4].Value) {
        this.MASTERDATA['IPDIAAUURAS'].Items[5].Value = ''
      }
      if (this.MASTERDATA['IPDIAAURELI'].Items[0].Value !== '6') {
        this.MASTERDATA['IPDIAAURELI'].Items[1].Value = ''
      }
      if (!this.MASTERDATA['IPDIAAULIWI'].Items[6].Value) {
        this.MASTERDATA['IPDIAAULIWI'].Items[7].Value = ''
      }
      if (!this.MASTERDATA['IPDIAAUITV10'].Items[2].Value) {
        this.MASTERDATA['IPDIAAUITV10'].Items[4].Value = ''
      }
      if (!this.MASTERDATA['IPDIAAUITV10'].Items[3].Value) {
        this.MASTERDATA['IPDIAAUITV10'].Items[5].Value = ''
      }
      if (!this.MASTERDATA['IPDIAAUNEID'].Items[2].Value) {
        this.MASTERDATA['IPDIAAUNEID'].Items[3].Value = ''
      }
      if (!this.MASTERDATA['IPDIAAUOAIN'].Items[3].Value) {
        this.MASTERDATA['IPDIAAUOAIN'].Items[4].Value = ''
      }
      if (!this.MASTERDATA['IPDIAAUNBDY'].Items[1].Value) {
        this.MASTERDATA['IPDIAAUIPAN'].Items[0].Value = ''
      }
    },
    getListConfirm (id) {
      this.isConfirm = false
      new EIOService().find('ConfirmForms/GetList/' + id).then(res => {
        console.log(this.$route.name, 'check route name')
        if (this.$route.name === 'IPDInitialAssessmentForChild') {
          if (res && res.length > 0) {
            this.isConfirm = true
          }
        } else if (this.$route.name === 'IPDInitialAssessmentForAdult') {
          if (res && res.length > 0) {
            this.isConfirm = true
          }
        }
        console.log('confirm child 1', this.isConfirm)
      })
    },
    clickTqdt () {
      this.tqdtk = ''
    },
    onlyNumber (event) {
      let keyCode = event.keyCode ? event.keyCode : event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        event.preventDefault()
      }
    },
    handleClickColor (code) {
      if (code === 'IPDIAAUCOLOOTH') {
        this.MASTERDATA['IPDIAAUCOLO'].Items[6].Value = ''
      }
    },
    changeTemp (value, code) {
      // console.log('va', value)
      // if (value === 1 && this.MASTERDATA['IPDIAAUTEMP'].Items[2].Value && this.MASTERDATA['IPDIAAURERA'].Items[2].Value) {
      //   this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = true
      // } else {
      //   this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = false
      // }
      if (this.MASTERDATA['IPDIAAUTEMP'].Items[2].Value || this.MASTERDATA['IPDIAAURERA'].Items[2].Value) {
        this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = true
      } else {
        this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = false
      }
      if (value === 0) {
        this.MASTERDATA['IPDIAAUTEMP'].Items[2].Value = false
        if (!this.MASTERDATA['IPDIAAURERA'].Items[2].Value) {
          this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = false
        }
      } else {
        this.MASTERDATA['IPDIAAUTEMP'].Items[1].Value = false
      }
    },
    changeRR (value, code) {
      // console.log('tho', value)
      // if (value === 1 && this.MASTERDATA['IPDIAAURERA'].Items[2].Value && this.MASTERDATA['IPDIAAUTEMP'].Items[2].Value) {
      //   this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = true
      // } else {
      //   this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = false
      // }
      if (this.MASTERDATA['IPDIAAUTEMP'].Items[2].Value || this.MASTERDATA['IPDIAAURERA'].Items[2].Value) {
        this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = true
      } else {
        this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = false
      }
      if (value === 0) {
        this.MASTERDATA['IPDIAAURERA'].Items[2].Value = false
        if (!this.MASTERDATA['IPDIAAUTEMP'].Items[2].Value) {
          this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = false
        }
      } else {
        this.MASTERDATA['IPDIAAURERA'].Items[1].Value = false
      }
    },
    // handleClickIPDIAAUHYGI (value) {
    //   if (value === 2) {
    //     this.MASTERDATA['IPDIAAUHYGI'].Items[2].Value = null
    //   }
    //   console.log(value, this.MASTERDATA['IPDIAAUHYGI'].Items[2])
    // },
    changeIPDIAAUDIET (value) {
      // if (value === 2) {
      //   this.MASTERDATA['IPDIAAUDIET'].Items[2].Value = ''
      // }
    },
    addItem () {
      this.DataSubmit.Siblings.push({
        VisitId: '123',
        age: '',
        gender: ''
      })
    },
    add (item) {
      this.DataSubmit.Siblings.push({
        VisitId: '123',
        age: '',
        gender: ''
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
      if (this.DataSubmit.VersionApp >= 11 && !this.checkTab) {
        if (this.MASTERDATA['IPDIAAUADFR'].Items[2].Value && !this.MASTERDATA['IPDIAAUADFR'].Items[3].Value) {
          errors.push(this.MASTERDATA['IPDIAAUADFR'].Items[3])
        }
        if (this.MASTERDATA['IPDIAAUINRF'].Items[1].Value && !this.MASTERDATA['IPDIAAUINRF'].Items[2].Value) {
          errors.push(this.MASTERDATA['IPDIAAUINRF'].Items[2])
        }
        if (this.MASTERDATA['IPDIAAUEDEM'].Items[1].Value && !this.MASTERDATA['IPDIAAUEDEM'].Items[2].Value) {
          errors.push(this.MASTERDATA['IPDIAAUEDEM'].Items[2])
        }
        if (this.MASTERDATA['IPDIAAUPAFR'].Items[3].Value && !this.MASTERDATA['IPDIAAUPAFR'].Items[4].Value) {
          errors.push(this.MASTERDATA['IPDIAAUPAFR'].Items[4])
        }
        // Validate đánh giá về da, niêm mạc
        if (this.MASTERDATA['IPDIAAUPRUL'].Items[1].Value && !this.MASTERDATA['IPDIAAUPRUL'].Items[2].Value) {
          errors.push(this.MASTERDATA['IPDIAAUPRUL'].Items[2])
        }
        if (this.MASTERDATA['IPDIAAUOTWO'].Items[1].Value && !this.MASTERDATA['IPDIAAUOTWO'].Items[2].Value) {
          errors.push(this.MASTERDATA['IPDIAAUOTWO'].Items[2])
        }
        // Validate trạng thái thần Kinh
        if (this.MASTERDATA['IPDIAAUMEST'].Items[5].Value && !this.MASTERDATA['IPDIAAUMEST'].Items[6].Value) {
          errors.push(this.MASTERDATA['IPDIAAUMEST'].Items[6])
        }
        if (this.MASTERDATA['IPDIAAUMEST'].Items[7].Value && !this.MASTERDATA['IPDIAAUMEST'].Items[8].Value) {
          errors.push(this.MASTERDATA['IPDIAAUMEST'].Items[8])
        }
        // Validate thiết bị cấy ghép
        if (this.MASTERDATA['IPDIAAUIOED'].Items[6].Value && !this.MASTERDATA['IPDIAAUIOED'].Items[7].Value) {
          errors.push(this.MASTERDATA['IPDIAAUIOED'].Items[7])
        }
        // Validate đánh giá về tiêu hóa và dinh dưỡng
        if (this.MASTERDATA['IPDIAAUFERO'].Items[2].Value && !this.MASTERDATA['IPDIAAUFERO'].Items[3].Value) {
          console.log(this.MASTERDATA['IPDIAAUBOHA'].Items[3].Value, this.MASTERDATA['IPDIAAUBOHA'].Items[4].Value, this.MASTERDATA['IPDIAAUBOHA'].Items[5].Value, 'join here')
          errors.push(this.MASTERDATA['IPDIAAUFERO'].Items[3])
        }
        // Thói quen đại tiện
        if (this.MASTERDATA['IPDIAAUBOHA'].Items[3].Value && !this.MASTERDATA['IPDIAAUBOHA'].Items[4].Value) {
          console.log('join here 2')
          errors.push(this.MASTERDATA['IPDIAAUBOHA'].Items[4])
        }
        // Validate đánh giá tiết niệu
        if (this.MASTERDATA['IPDIAAUURAS'].Items[4].Value && !this.MASTERDATA['IPDIAAUURAS'].Items[5].Value) {
          errors.push(this.MASTERDATA['IPDIAAUURAS'].Items[5])
        }
        // Validate đánh giá về yếu tố xã hội
        if (this.MASTERDATA['IPDIAAURELI'].Items[0].Value === '6' && !this.MASTERDATA['IPDIAAURELI'].Items[1].Value) {
          errors.push(this.MASTERDATA['IPDIAAURELI'].Items[1])
        }
        if (this.MASTERDATA['IPDIAAULIWI'].Items[6].Value && !this.MASTERDATA['IPDIAAULIWI'].Items[7].Value) {
          errors.push(this.MASTERDATA['IPDIAAULIWI'].Items[7])
        }
        if (this.MASTERDATA['IPDIAAUEMPL'].Items[2].Value && !this.MASTERDATA['IPDIAAUEMPL'].Items[3].Value) {
          errors.push(this.MASTERDATA['IPDIAAUEMPL'].Items[3])
        }
        if (this.MASTERDATA['IPDIAAUSOPR'].Items[2].Value && !this.MASTERDATA['IPDIAAUSOPR'].Items[3].Value) {
          errors.push(this.MASTERDATA['IPDIAAUSOPR'].Items[3])
        }
        // Validate các trường đánh dấu * trong đánh giá về yếu tố xã hội
        if (this.MASTERDATA['IPDIAAUALUS'].Items[0].Value && !this.MASTERDATA['IPDIAAUALUS'].Items[2].Value) {
          errors.push(this.MASTERDATA['IPDIAAUALUS'].Items[2])
        }
        if (this.MASTERDATA['IPDIAAUTOSD'].Items[0].Value && !this.MASTERDATA['IPDIAAUTOSD'].Items[2].Value) {
          errors.push(this.MASTERDATA['IPDIAAUTOSD'].Items[2])
        }
        if (this.MASTERDATA['IPDIAAULEIS'].Items[0].Value && !this.MASTERDATA['IPDIAAULEIS'].Items[2].Value) {
          errors.push(this.MASTERDATA['IPDIAAULEIS'].Items[2])
        }
        if (this.MASTERDATA['IPDIAAUSEIN'].Items[0].Value && !this.MASTERDATA['IPDIAAUSEIN'].Items[2].Value) {
          errors.push(this.MASTERDATA['IPDIAAUSEIN'].Items[2])
        }
        if (this.MASTERDATA['IPDIAAUSUTE'].Items[0].Value && !this.MASTERDATA['IPDIAAUSUTE'].Items[2].Value) {
          errors.push(this.MASTERDATA['IPDIAAUSUTE'].Items[2])
        }
        if (this.MASTERDATA['IPDIAAUABSU'].Items[0].Value && !this.MASTERDATA['IPDIAAUABSU'].Items[2].Value) {
          errors.push(this.MASTERDATA['IPDIAAUABSU'].Items[2])
        }
        // end validate *
        if (this.MASTERDATA['IPDIAAUITV10'].Items[3].Value && !this.MASTERDATA['IPDIAAUITV10'].Items[5].Value) {
          errors.push(this.MASTERDATA['IPDIAAUITV10'].Items[5])
        }
        // Chỉ điền nếu áp dụng
        if (this.MASTERDATA['IPDIAAUOAIN'].Items[3].Value && !this.MASTERDATA['IPDIAAUOAIN'].Items[4].Value) {
          errors.push(this.MASTERDATA['IPDIAAUOAIN'].Items[4])
        }
        // Validate báo bác sĩ điều trị trong hướng xử trí hỗ trợ
        // if (this.MASTERDATA['IPDIAAUNEID'].Items[2].Value && !this.MASTERDATA['IPDIAAUNEID'].Items[3].Value) {
        //   errors.push(this.MASTERDATA['IPDIAAUNEID'].Items[3])
        // }
        // Validate yêu cầu khách vào thăm
        if (this.MASTERDATA['IPDIAAUNBDY'].Items[1].Value && !this.MASTERDATA['IPDIAAUIPAN'].Items[0].Value) {
          errors.push(this.MASTERDATA['IPDIAAUIPAN'].Items[0])
        }
        // Validate nếu không có đánh giá khác thì chọn không
        if (this.MASTERDATA['IPDIAAUITIN'].Items[1].Value && !this.MASTERDATA['IPDIAAUITIN'].Items[2].Value) {
          errors.push(this.MASTERDATA['IPDIAAUITIN'].Items[2])
        }
      }
      if (errors.length) {
        this.handlerResponse({ Error: errors })
      }
    },
    submit (confirm) {
      this.MASTERDATA['IPDIAAUBOHA'].Items[4].Value = this.tqdtk
      this.validateForm()
      this.handleClearData()
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach((item) => {
            if (item.Code === 'IPDIAAUBOHAANS') {
              this.DataSubmit.Datas.push({
                Code: item.Code,
                Value: this.tqdtk,
                Group: property
              })
              obj[item.Code] = item.Value
            } else {
              var val1 = item.Value
              this.DataSubmit.Datas.push({
                Code: item.Code,
                Value: val1,
                Group: property
              })
              obj[item.Code] = item.Value
            }
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
      if (this.$route.name === 'IPDInitialAssessmentForChild') {
        var formCode = 'A02_014_220321_VE'
        if (this.DataSubmit.Siblings.length > 0) {
          var myJsonString = JSON.stringify(this.DataSubmit.Siblings)
          this.MASTERDATA['IPDIAAUSIBLINGDATA'].Note = JSON.stringify(myJsonString)
        }
        // console.log('note', this.MASTERDATA['IPDIAAUSIBLINGDATA'])
      } else {
        // eslint-disable-next-line no-redeclare
        var formCode = 'A02_013_220321_VE'
      }
      this.DataSubmit = {
        ...this.DataSubmit,
        SiblingDelete: this.listSiblingDelete
      }
      new InitialAssessment()
        .update('ForAdult/' + formCode + '/' + this.$route.params.Id, this.DataSubmit)
        .then((response) => {
          if (confirm === 'confirm') {
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
              // if (exited.Code === 'IPDIAAUHYGIOTH') {
              //   console.log('exited: ', exited)
              //   // console.log('data: ', this.MASTERDATA['IPDIAAUHYGI'].Items[2].Value)
              // }
              // if (code === 'IPDIAAUPASCANS') exited.Value = this.parseInt(exited.Value)
              if (isSync && noMapCode.includes(code)) {
                // noting
              } else if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
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
      if (this.$route.name === 'IPDInitialAssessmentForChild') {
        var formCode = 'A02_014_220321_VE'
      } else {
        // eslint-disable-next-line no-redeclare
        var formCode = 'A02_013_220321_VE'
      }
      new InitialAssessment()
        .find('ForAdult/' + formCode + '/' + this.$route.params.Id + '?hidemsg=' + true)
        .then((response) => {
          this.$store.dispatch('setCurrentFormId', response.Id)
          this.DataSubmit = response
          this.getListConfirm(response.Id)
          this.IsExitTheOncologyMedicalRecord = response.IsExitTheOncologyMedicalRecord
          if (response.IsNew) {
            this.syncLastIpdData()
          }
          for (let i = 0; i < response.Datas.length; i++) {
            if (response.Datas[i].Code === 'IPDIAAUBOHAANS' && response.Datas[i].Value) {
              this.tqdtk = response.Datas[i].Value
            }
            if (response.Datas[i].Code === 'IPDIAAUALLEYES' && response.Datas[i].Value === 'True') {
              this.MASTERDATA['IPDIAAUITV1'].Items[0].Value = true
            }
            if (response.Datas[i].Code === 'IPDIAAUEDEMYES' && response.Datas[i].Value === 'True') {
              this.MASTERDATA['IPDIAAUITV1'].Items[0].Value = true
            }
            if (response.Datas[i].Code === 'IPDIAAUTEMPABNOR' && response.Datas[i].Value === 'True') {
              this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = true
            }
            if (response.Datas[i].Code === 'IPDIAAURERAABNOR' && response.Datas[i].Value === 'True') {
              this.MASTERDATA['IPDIAAUITV1'].Items[1].Value = true
            }
          }
          this.mapData()
          this.IsLocked = response.IsLocked
          setTimeout(() => {
            EventBus.$emit('updateGlobalIpdTopbaInfo', this.menu)
          }, 1000)
          setTimeout(() => {
            this.loaded = true
          }, 500)
        })
        .catch((e) => {
          this.showButton = false
          this.loaded = true
          this.DataSubmit = false
          if (e.status === 404) {
          }
          if (e.data) this.IsLocked = e.data.IsLocked
          // this.IsLocked = true
          this.edited = false
        })
    },
    create () {
      if (this.$route.name === 'IPDInitialAssessmentForChild') {
        var formCode = 'A02_014_220321_VE'
      } else {
        // eslint-disable-next-line no-redeclare
        var formCode = 'A02_013_220321_VE'
      }
      new InitialAssessment()
        .update(this.$route.params.Id, {}, 'ForAdult/Create/' + formCode + '/')
        .then((response) => {
          this.reload()
        })
        .catch((e) => {
          // this.back()
        })
    },
    confirmPopupChild () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('InitialAssessment.notify'),
        text: this.$t('InitialAssessment.create-new-initial'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('InitialAssessment.btn-confirm'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.$t('InitialAssessment.btn-cancel'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: 'Thông báo',
        text: 'Tạo mới đánh giá ban đầu người bệnh nội trú *?',
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
