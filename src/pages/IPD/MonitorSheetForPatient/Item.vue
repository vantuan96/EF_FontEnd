<template>
 <div id="SummaryOf15DayTreatmentItem">
  <template v-if="loaded">
   <div class="no-border mrb30">
    <div class="box-top-content">
     <div v-if="!readonly" class="row">
      <div class="col-md-12 col-sm-12">
       <div class="row mt-10">
        <div class="column">
         <div class="flex">
          <div class="mt-5 ml-10 mt-10">
           <b class="fs16">{{ __t("monitorsheet.dateTime") }}: </b>
          </div>
          <div :class="errorTimeTm ? 'validate-style' : ''">
           <v-date-picker
            @change="handleChange();"
            :noclearable="true"
            :hideTooltip="true"
            class="w1510 display-inline"
            :format="'HH:mm DD/MM/YYYY'"
            v-model="timeTM"
           />
          </div>
         </div>
        </div>
        <div class="column1">
         <div class="flex">
          <div class="mt-5">
           <b class="mrr20 fs16">{{ __t("monitorsheet.nameOfExtra") }}:</b>
          </div>
          <div
           style="flex-grow: 1"
           class="ml-10"
           :class="errorNameTm ? 'validate-style' : ''"
          >
           <textarea-autosize
            @change="handleChange();"
            class="form-control"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="nameTM"
           />
          </div>
         </div>
        </div>
       </div>
       <!--
        <div class="flex align-center mrt10 mrb10">
           <div v-if="errorTimeTm" class="mrr40 flex" style="margin-left:195px;color:red">
             không được để trống
           </div>
           <div v-if="errorTimeTm" class="mrr40 flex" :style="!errorTimeTm ? 'margin-left:600px' :'margin-left:235px;'" style="color:red">
             không được để trống
           </div>
        </div>
       -->
       <div class="mt-10">
        {{ __t("monitorsheet.note") }}
       </div>
       <div class="mt-10">
        <table class="table observation-table no-margin tbl-b2">
         <thead>
          <tr>
           <th width="100px" class="text-center">{{ __t("monitorsheet.thoigiantheodoi") }}</th>
           <th width="110px" class="text-center">
            {{ __t("monitorsheet.ngaythu") }}
           </th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.kham") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.mausacda") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.nhietdoda") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.tinhtrangtoanven") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.phu") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.dichuyen") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.dau") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.sot") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.dieuduong") }}</th>
          </tr>
          <tr>
          </tr>
         </thead>
         <template>
          <tbody>
           <tr :key="index" v-for="(item, index) in responseList">
            <template>
             <!--
              <TblWithMasterDataItem :readonly="readonly" :key="index" :MASTERDATA="mddata" v-model="item.Datas" v-if="!item.IsDeleted" @onDelete="onDelete(index)"/>
             -->
             <td style="position: relative; width:30px">
              <button
               class="btn-pos-left"
               v-if="item.createdBy === currentUser"
               @click="removeTable(item, index);"
              >
               <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
              <v-date-picker
               :hideTooltip="true"
               class="w1510 display-inline"
               :format="'HH:mm DD/MM/YYYY'"
               v-model="item.date"
               @change="handleChange();"
               v-if="item.createdBy === currentUser"
              />
              <FakeInput v-else v-model="item.date" />
             </td>
             <td style="position: relative">
              <input
               class="form-control"
               v-model="item.date2"
               :placeholder="__t('Nhập')"
               v-if="item.createdBy === currentUser"
               @change="handleChange();"
              />
              <FakeInput v-else v-model="item.date2" />
             </td>
             <td style="position: relative">
              <input
               class="form-control"
               v-model="item.call"
               v-if="item.createdBy === currentUser"
               :placeholder="__t('Nhập')"
               @change="handleChange();"
              />
              <FakeInput v-else v-model="item.call" />
             </td>
             <td>
              <!-- {{ __t("monitorsheet.mausacda") }} -->
              <v-select
               class="select-full-w"
               v-model="item.color"
               :placeholder="__t('Chọn')"
               :items="colorList"
               v-if="item.createdBy === currentUser"
               @change="handleChange();"
              />
              <FakeInput v-else v-model="item.color" />
             </td>
             <td>
              <v-select
               class="select-full-w"
               v-model="item.temper"
               :placeholder="__t('Chọn')"
               :items="temperList"
               v-if="item.createdBy === currentUser"
               @change="handleChange();"
              />
              <FakeInput v-else v-model="item.temper" />
             </td>
             <td>
              <v-select
               class="select-full-w"
               v-model="item.status"
               :placeholder="__t('Chọn')"
               :items="colorList"
               v-if="item.createdBy === currentUser"
               @change="handleChange();"
              />
              <FakeInput v-else v-model="item.status" />
             </td>
             <td>
              <v-select
               class="select-full-w"
               v-model="item.edema"
               :placeholder="__t('Chọn')"
               :items="temperList"
               v-if="item.createdBy === currentUser"
               @change="handleChange();"
              />
              <FakeInput v-else v-model="item.edema" />
             </td>
             <td>
              <v-select
               class="select-full-w"
               v-model="item.move"
               :placeholder="__t('Chọn')"
               :items="moveList"
               @change="handleChange();"
               v-if="item.createdBy === currentUser"
              />
              <FakeInput v-else v-model="item.move" />
             </td>
             <td>
              <v-select
               class="select-full-w"
               v-model="item.pain"
               :placeholder="__t('Chọn')"
               :items="painList"
               @change="handleChange();"
               v-if="item.createdBy === currentUser"
              />
              <FakeInput v-else v-model="item.pain" />
             </td>
             <td>
              <v-select
               class="select-full-w"
               v-model="item.fever"
               :placeholder="__t('Chọn')"
               :items="feverList"
               @change="handleChange();"
               v-if="item.createdBy === currentUser"
              />
              <FakeInput v-else v-model="item.fever" />
             </td>
             <td><AdInfo :ad="item.createdBy" /></td>
            </template>
           </tr>
          </tbody>
         </template>
        </table>
        <div
         class="flex table-info mt-20 mb-20"
         style="cursor:pointer; width: 150px"
         @click="handleViewTable"
        >
         <div class="mt-5 ml-5">
          <p>
           <i
            :class="
             showTable ? 'fa fa-angle-double-up' : 'fa fa-angle-double-down'
            "
            class="mr-5"
            aria-hidden="true"
           ></i
           >{{ __t("monitorsheet.table") }}
          </p>
         </div>
        </div>
        <table
         v-if="showTable"
         class="table observation-table no-margin tbl-b2"
        >
         <thead>
          <tr>
           <th width="100px" class="text-center">{{ __t("monitorsheet.chiadotonthuong") }}</th>
           <th width="110px" class="text-center">{{ __t("monitorsheet.mauda") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.nhietdoda") }}</th>
           <th width="140px" class="text-center">{{ __t("monitorsheet.tinhtrangtoanven") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.phu") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.dichuyen") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.dau") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.sot") }}</th>
          </tr>
          <tr></tr>
         </thead>
         <template>
          <tbody>
           <tr>
            <th class="text-center">{{ __t("monitorsheet.do0") }}</th>
            <td>{{ __t("monitorsheet.binhthuong") }}</td>
            <td>{{ __t("monitorsheet.binhthuong") }}</td>
            <td>{{ __t("monitorsheet.khongtonthuong") }}</td>
            <td>{{ __t("monitorsheet.khong") }}</td>
            <td>{{ __t("monitorsheet.tot") }}</td>
            <td rowspan="5">
             {{ __t("monitorsheet.who") }}
            </td>
            <td>{{ __t("monitorsheet.binhthuong") }}</td>
           </tr>
           <tr>
            <th class="text-center">{{ __t("monitorsheet.do1") }}</th>
            <td>{{ __t("monitorsheet.hong") }}</td>
            <td>{{ __t("monitorsheet.am") }}</td>
            <td>{{ __t("monitorsheet.phongrop") }}</td>
            <td>{{ __t("monitorsheet.phukhonganlom") }}</td>
            <td>{{ __t("monitorsheet.hancheit") }}</td>
            <td>{{ __t("monitorsheet.cosot") }}</td>
           </tr>
           <tr>
            <th class="text-center">{{ __t("monitorsheet.do2") }}</th>
            <td>{{ __t("monitorsheet.red") }}</td>
            <td>{{ __t("monitorsheet.nong") }}</td>
            <td>{{ __t("monitorsheet.bongdanong") }}</td>
            <td>{{ __t("monitorsheet.phuanlom") }}</td>
            <td>{{ __t("monitorsheet.hanchenhieu") }}</td>
            <td></td>
           </tr>
           <tr>
            <th class="text-center">{{ __t("monitorsheet.do3") }}</th>
            <td>{{ __t("monitorsheet.vungtainhot") }}</td>
            <td></td>
            <td>{{ __t("monitorsheet.matmovalo") }}</td>
            <td></td>
            <td>{{ __t("monitorsheet.batdong") }}</td>
            <td></td>
           </tr>
           <tr>
            <th class="text-center">{{ __t("monitorsheet.do4") }}</th>
            <td>{{ __t("monitorsheet.toitham") }}</td>
            <td></td>
            <td>{{ __t("monitorsheet.matmoloxuong") }}</td>
            <td></td>
            <td></td>
            <td></td>
           </tr>
          </tbody>
         </template>
        </table>
       </div>
      </div>
     </div>
     <!-- bản view -->
     <div v-else class="row">
      <div class="col-md-12 col-sm-12">
       <div class="flex align-center mrt10">
        <div class="mrr40 flex">
         <div class="mt-5">
          <b class="mrr20 fs16">{{ __t("monitorsheet.dateTime") }}: </b>
         </div>
         <div :class="errorTimeTm ? '' : ''">
          <FakeInput v-model="timeTM" />
         </div>
        </div>
        <div class="mrr40 flex">
         <div class="mt-5"><b class="mrr20 fs16">{{ __t("monitorsheet.nameOfExtra") }}:</b></div>
         <div :class="errorNameTm ? '' : ''">
          <!--
           <MDTextInput
            v-if="MASTERDATA['IPDSO15DTR01']"
            :readonly="isConfirmed"
            :placeholder="__t('Nhập')"
            v-model="nameTM"
            width="500px"
           />
          -->
          <FakeInput v-model="nameTM" />
         </div>
        </div>
       </div>
       <!--
        <div class="flex align-center mrt10 mrb10">
           <div v-if="errorTimeTm" class="mrr40 flex" style="margin-left:195px;color:red">
             không được để trống
           </div>
           <div v-if="errorTimeTm" class="mrr40 flex" :style="!errorTimeTm ? 'margin-left:600px' :'margin-left:235px;'" style="color:red">
             không được để trống
           </div>
        </div>
       -->
       <div class="mt-10">
        {{ __t("monitorsheet.note") }}
       </div>
       <div class="mt-10">
        <table class="table observation-table no-margin tbl-b2">
         <thead>
          <tr>
           <th width="100px" class="text-center">{{ __t("monitorsheet.thoigiantheodoi") }}</th>
           <th width="110px" class="text-center">
            {{ __t("monitorsheet.ngaythu") }}
           </th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.kham") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.mausacda") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.nhietdoda") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.tinhtrangtoanven") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.phu") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.dichuyen") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.dau") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.sot") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.dieuduong") }}</th>
          </tr>
          <tr>
           <!--
            <th :class="top ? 'th-top' : null" :style="headerStyle ? headerStyle[index] : {}" :key="index" v-for="(item, index) in mddata.Items">
              {{__label(item)}}
            </th>
           -->
          </tr>
         </thead>
         <template>
          <tbody>
           <tr :key="index" v-for="(item, index) in responseList">
            <template>
             <!--
              <TblWithMasterDataItem :readonly="readonly" :key="index" :MASTERDATA="mddata" v-model="item.Datas" v-if="!item.IsDeleted" @onDelete="onDelete(index)"/>
             -->
             <td style="position: relative; width:30px">
              <!--
               <button class="btn-pos-left" @click="removeTable(item, index);">
                <i class="fa fa-trash" aria-hidden="true"></i>
               </button>
              -->
              <FakeInput v-model="item.date" />
             </td>
             <td style="position: relative">
              <FakeInput v-model="item.date2" />
             </td>
             <td style="position: relative">
              <FakeInput v-model="item.call" />
             </td>
             <td>
              <!-- {{ __t("monitorsheet.mausacda") }} -->
              <FakeInput v-model="item.color" />
             </td>
             <td><FakeInput v-model="item.temper" /></td>
             <td><FakeInput v-model="item.status" /></td>
             <td><FakeInput v-model="item.edema" /></td>
             <td><FakeInput v-model="item.move" /></td>
             <td><FakeInput v-model="item.pain" /></td>
             <td><FakeInput v-model="item.fever" /></td>
             <td><AdInfo :ad="item.createdBy" /></td>
            </template>
           </tr>
          </tbody>
         </template>
        </table>
        <div
         class="flex table-info mt-20 mb-20"
         style="cursor:pointer; width: 150px"
         @click="handleViewTable"
        >
         <div class="mt-5">
          <p>
           <i
            :class="
             showTable ? 'fa fa-angle-double-up' : 'fa fa-angle-double-down'
            "
            class="mr-5 ml-5"
            aria-hidden="true"
           ></i
           >{{ __t("monitorsheet.table") }}
          </p>
         </div>
        </div>
        <table
         v-if="showTable"
         class="table observation-table no-margin tbl-b2"
        >
         <thead>
          <tr>
           <th width="100px" class="text-center">{{ __t("monitorsheet.chiadotonthuong") }}</th>
           <th width="110px" class="text-center">{{ __t("monitorsheet.mausacda") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.nhietdoda") }}</th>
           <th width="140px" class="text-center">{{ __t("monitorsheet.tinhtrangtoanven") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.phu") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.dichuyen") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.dau") }}</th>
           <th width="100px" class="text-center">{{ __t("monitorsheet.sot") }}</th>
          </tr>
          <tr></tr>
         </thead>
         <template>
          <tbody>
           <tr>
            <th class="text-center">{{ __t("monitorsheet.do0") }}</th>
            <td>{{ __t("monitorsheet.binhthuong") }}</td>
            <td>{{ __t("monitorsheet.binhthuong") }}</td>
            <td>{{ __t("monitorsheet.khongtonthuong") }}</td>
            <td>{{ __t("monitorsheet.khong") }}</td>
            <td>{{ __t("monitorsheet.tot") }}</td>
            <td rowspan="5">
             {{ __t("monitorsheet.who") }}
            </td>
            <td>{{ __t("monitorsheet.binhthuong") }}</td>
           </tr>
           <tr>
            <th class="text-center">{{ __t("monitorsheet.do1") }}</th>
            <td>{{ __t("monitorsheet.hong") }}</td>
            <td>{{ __t("monitorsheet.am") }}</td>
            <td>{{ __t("monitorsheet.phongrop") }}</td>
            <td>{{ __t("monitorsheet.phukhonganlom") }}</td>
            <td>{{ __t("monitorsheet.hancheit") }}</td>
            <td>{{ __t("monitorsheet.cosot") }}</td>
           </tr>
           <tr>
            <th class="text-center">{{ __t("monitorsheet.do2") }}</th>
            <td>{{ __t("monitorsheet.red") }}</td>
            <td>{{ __t("monitorsheet.nong") }}</td>
            <td>{{ __t("monitorsheet.bongdanong") }}</td>
            <td>{{ __t("monitorsheet.phuanlom") }}</td>
            <td>{{ __t("monitorsheet.hanchenhieu") }}</td>
            <td></td>
           </tr>
           <tr>
            <th class="text-center">{{ __t("monitorsheet.do3") }}</th>
            <td>{{ __t("monitorsheet.vungtainhot") }}</td>
            <td></td>
            <td>{{ __t("monitorsheet.matmovalo") }}</td>
            <td></td>
            <td>{{ __t("monitorsheet.batdong") }}</td>
            <td></td>
           </tr>
           <tr>
            <th class="text-center">{{ __t("monitorsheet.do4") }}</th>
            <td>{{ __t("monitorsheet.toitham") }}</td>
            <td></td>
            <td>{{ __t("monitorsheet.matmoloxuong") }}</td>
            <td></td>
            <td></td>
            <td></td>
           </tr>
          </tbody>
         </template>
        </table>
       </div>
      </div>
     </div>
    </div>
   </div>
   <FloatBlock v-if="!viewOnly" :openBack="true" @handleBack="handleBack">
    <template slot="buttons">
     <div class="col-md-2 col-sm-2"><div class="form-group1"></div></div>
     <div v-if="!readonly" class="col-md-4 col-sm-4">
      <div class="form-group1">
       <button
        class="btn pull-left btn-back v-white-btn mr-50 w250"
        type="button"
        @click="handleAddFollow"
       >
        + {{__t('THÊM THEO DÕI')}}
       </button>
      </div>
     </div>
     <div v-if="!readonly" class="col-md-6 col-sm-6">
      <div class="flex form-group1">
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
   <div><p>A02_041_050919_V</p></div>
   <!--
    <p>
     {{ __t("Chỉnh sửa lần cuối bởi") }} <AdInfo :ad="DataSubmit.UpdateBy" />  {{ __t("lúc") }} {{ DataSubmit.UpdatedAt | formatDateHourMinutesDDMMYYY }}
    </p>
   -->
   <div class="flex-box flex-center">
    <div class="mr-5">{{ __t("Chỉnh sửa lần cuối bởi") }}</div>
    <div class="mr-5"><AdInfo :ad="DataSubmit.UpdateBy" /></div>
    <div>
     {{ __t("lúc") }} {{ DataSubmit.UpdatedAt | formatDateHourMinutesDDMMYYY }}
    </div>
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
import MixinMasterData from '@/mixins/masterdata.js'
import DoctorConfirm from './popup/PopupDoctorConfirm.vue'
import MixinForm from '@/mixins/form.js'
import SummaryOf15DayTreatmentPrice from './price/SummaryOf15DayTreatmentPrice.vue'
import SyncPrincipalTest from './SyncPrincipalTest.vue'
import constants from '@/constants'
import CreateTable from '@/services/IPD/CreateTable'
import GetListAllMonitorSheetForPatient from '@/services/IPD/MonitorSheetForPatient/GetListAllMonitorSheetForPatient'
export default {
  /**
   * The name of the page.
   */
  name: 'MonitorSheetForPatientItem',
  props: ['formId', 'viewOnly', 'VisitId', 'VisitType', 'timeTMP'],
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      readonly: false,
      showTable: false,
      errorTimeTm: false,
      errorNameTm: false,
      timeTM: '',
      time1: '',
      name1: '',
      nameTM: '',
      dataHeader: 0,
      defaultText: '',
      popupTitle: '',
      TypeConfirm: '',
      DataSubmit: [],
      tableHeader: [],
      dataMaster: [],
      isSave: false,
      tableLength: 0,
      DataSubmit2: [],
      TableDelete: [],
      ICD1: [],
      ICD2: [],
      DataInfo: [],
      NullRoomId: false,
      loaded: false,
      responseList: [],
      colorList: [
        {
          label: 'Độ 0/Grade 0',
          value: 'Độ 0/Grade 0'
        },
        {
          label: 'Độ 1/Grade 1',
          value: 'Độ 1/Grade 1'
        },
        {
          label: 'Độ 2/Grade 2',
          value: 'Độ 2/Grade 2'
        },
        {
          label: 'Độ 3/Grade 3',
          value: 'Độ 3/Grade 3'
        },
        {
          label: 'Độ 4/Grade 4',
          value: 'Độ 4/Grade 4'
        }
      ],
      temperList: [
        {
          label: 'Độ 0/Grade 0',
          value: 'Độ 0/Grade 0'
        },
        {
          label: 'Độ 1/Grade 1',
          value: 'Độ 1/Grade 1'
        },
        {
          label: 'Độ 2/Grade 2',
          value: 'Độ 2/Grade 2'
        }
      ],
      moveList: [
        {
          label: 'Độ 0/Grade 0',
          value: 'Độ 0/Grade 0'
        },
        {
          label: 'Độ 1/Grade 1',
          value: 'Độ 1/Grade 1'
        },
        {
          label: 'Độ 2/Grade 2',
          value: 'Độ 2/Grade 2'
        },
        {
          label: 'Độ 3/Grade 3',
          value: 'Độ 3/Grade 3'
        }
      ],
      feverList: [
        {
          label: 'Độ 0/Grade 0',
          value: 'Độ 0/Grade 0'
        },
        {
          label: 'Độ 1/Grade 1',
          value: 'Độ 1/Grade 1'
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
    // this.getMasterDatas({Form: 'A01_056_050919_VE'}, () => {
    //   // this.getTableData()
    //   // this.getData()
    // })
    this.getData()
    this.getTableData()
    this.getDataHeader()
  },
  watch: {
    formId: function (value) {
      this.getData()
      this.getTableData()
      this.getDataHeader()
    },
    timeTM: function (value) {
      // this.isSave = true
      if (value) {
        this.errorTimeTm = false
      } else {
        this.errorTimeTm = true
      }
      if (value !== this.time1) {
        this.isSave = true
      } else {
        this.isSave = false
      }
    },
    nameTM: function (value) {
      // this.isSave = true
      if (value) {
        this.errorNameTm = false
      } else {
        this.errorNameTm = true
      }
      if (value !== this.name1) {
        this.isSave = true
      } else {
        this.isSave = false
      }
    }
  },
  methods: {
    handleViewTable () {
      this.showTable = !this.showTable
    },
    handleChange () {
      this.isSave = true
    },
    formatDateHourDDMMYYY () {
      const date = new Date()
      return (
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ' ' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    '/' +
    (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
    '/' +
    date.getFullYear()
      )
    },
    removeTable (value, i) {
      if (value.id !== 'id1') {
        this.TableDelete.push(value.id)
      }
      this.responseList = this.responseList.filter((_, index) => index !== i)
    },
    DeleteTable () {
      var tableCode = this._ItemId
      const params = {
        TableDelete: this.TableDelete
      }
      new CreateTable().update(tableCode + '/' + this._VisitId, params).then(res => {
        console.log('res', res)
      }).catch(error => {
        console.log('err', error)
      })
    },
    getDataHeader () {
      const tableCode = 'PTDNBTMDTUT' + this._ItemId
      new CreateTable().find(tableCode + '/' + this._VisitId).then(res => {
        this.tableHeader = res.Datas
        if (this.tableHeader.length === 0) {
          this.CreateDataHeader()
        } else {
          const timeTM = res.Datas[0].RowData.filter(i => i.Code === 'timeTM')
          const nameTM = res.Datas[0].RowData.filter(i => i.Code === 'nameTM')
          this.timeTM = timeTM[0].Value
          this.nameTM = nameTM[0].Value
          this.time1 = timeTM[0].Value
          this.name1 = nameTM[0].Value
        }
      }).catch(error => {
        console.log('err', error)
      })
    },
    getTableData () {
      this.responseList = []
      var tableCode = this._ItemId
      new CreateTable().find(tableCode + '/' + this._VisitId).then(res => {
        var list = res.Datas
        for (let i = 0; i < list.length; i++) {
          // eslint-disable-next-line no-unused-expressions
          const a = {
            id: list[i].IdRow,
            date: list[i].RowData[0].Value,
            date2: list[i].RowData[1].Value,
            call: list[i].RowData[2].Value,
            color: list[i].RowData[3].Value,
            temper: list[i].RowData[4].Value,
            status: list[i].RowData[5].Value,
            edema: list[i].RowData[6].Value,
            move: list[i].RowData[7].Value,
            pain: list[i].RowData[8].Value,
            fever: list[i].RowData[9].Value,
            createdBy: list[i].RowData[10].Value,
            idDate: list[i].RowData[0].Id,
            idDate2: list[i].RowData[1].Id,
            idCall: list[i].RowData[2].Id,
            idColor: list[i].RowData[3].Id,
            idTemper: list[i].RowData[4].Id,
            idStatus: list[i].RowData[5].Id,
            idEdema: list[i].RowData[6].Id,
            idMove: list[i].RowData[7].Id,
            idPain: list[i].RowData[8].Id,
            idFever: list[i].RowData[9].Id,
            idCreatedBy: list[i].RowData[10].Id
          }
          this.responseList.push(a)
          this.dataMaster.push(a)
        }
        this.DataSubmit2 = this.dataMaster
        // this.dataMaster = this.responseList
        this.tableLength = list.length
      }).catch(error => {
        console.log('err', error)
      })
    },
    UpdateDataHeader () {
      var tableCode = 'PTDNBTMDTUT' + this._ItemId
      var Table = []
      console.log('header', this.tableHeader)
      const a = {
        RowData: [
          {
            Code: 'timeTM',
            Value: this.timeTM,
            Id: this.tableHeader[0].RowData[0].Id
          },
          {
            Code: 'nameTM',
            Value: this.nameTM,
            Id: this.tableHeader[0].RowData[1].Id
          }
        ]
      }
      Table.push(a)
      const params = {
        Table: Table
      }
      new CreateTable().update(tableCode + '/' + this._VisitId, params).then(res => {
        console.log('update', res)
      }).catch(error => {
        console.log('err', error)
      })
    },
    CreateDataHeader () {
      var tableCode = 'PTDNBTMDTUT' + this._ItemId
      var Table = []
      // var RowData = []
      const a = {
        RowData: [
          {
            Code: 'timeTM',
            Value: this.timeTM,
            Id: ''
          },
          {
            Code: 'nameTM',
            Value: this.nameTM,
            Id: ''
          }
        ]
      }
      Table.push(a)
      const params = {
        Table: Table
      }
      new CreateTable().update(tableCode + '/' + this._VisitId, params).then(res => {
        console.log('res', res)
        this.getDataHeader()
      }).catch(error => {
        console.log('err', error)
      })
    },
    CreateTableData () {
      var tableCode = this._ItemId
      var Table = []
      // var RowData = []
      for (let i = 0; i < this.responseList.length; i++) {
        if (this.responseList[i].id === 'id1') {
          const a = {
            RowData: [
              {
                Code: 'date',
                Value: this.responseList[i].date,
                Id: ''
              },
              {
                Code: 'date2',
                Value: this.responseList[i].date2,
                Id: ''
              },
              {
                Code: 'call',
                Value: this.responseList[i].call,
                Id: ''
              },
              {
                Code: 'color',
                Value: this.responseList[i].color,
                Id: ''
              },
              {
                Code: 'temper',
                Value: this.responseList[i].temper,
                Id: ''
              },
              {
                Code: 'status',
                Value: this.responseList[i].status,
                Id: ''
              },
              {
                Code: 'edema',
                Value: this.responseList[i].edema,
                Id: ''
              },
              {
                Code: 'move',
                Value: this.responseList[i].move,
                Id: ''
              },
              {
                Code: 'pain',
                Value: this.responseList[i].pain,
                Id: ''
              },
              {
                Code: 'fever',
                Value: this.responseList[i].fever,
                Id: ''
              },
              {
                Code: 'createdBy',
                Value: this.responseList[i].createdBy,
                Id: ''
              }
            ]
          }
          Table.push(a)
        } else {
          const a = {
            RowData: [
              {
                Code: 'date',
                Value: this.responseList[i].date,
                Id: this.responseList[i].idDate
              },
              {
                Code: 'date2',
                Value: this.responseList[i].date2,
                Id: this.responseList[i].idDate2
              },
              {
                Code: 'call',
                Value: this.responseList[i].call,
                Id: this.responseList[i].idCall
              },
              {
                Code: 'color',
                Value: this.responseList[i].color,
                Id: this.responseList[i].idColor
              },
              {
                Code: 'temper',
                Value: this.responseList[i].temper,
                Id: this.responseList[i].idTemper
              },
              {
                Code: 'status',
                Value: this.responseList[i].status,
                Id: this.responseList[i].idStatus
              },
              {
                Code: 'edema',
                Value: this.responseList[i].edema,
                Id: this.responseList[i].idEdema
              },
              {
                Code: 'move',
                Value: this.responseList[i].move,
                Id: this.responseList[i].idMove
              },
              {
                Code: 'pain',
                Value: this.responseList[i].pain,
                Id: this.responseList[i].idPain
              },
              {
                Code: 'fever',
                Value: this.responseList[i].fever,
                Id: this.responseList[i].idFever
              },
              {
                Code: 'createdBy',
                Value: this.responseList[i].createdBy,
                Id: this.responseList[i].idCreatedBy
              }
            ]
          }
          Table.push(a)
        }
      }
      const params = {
        Table: Table
      }
      new CreateTable().update(tableCode + '/' + this._VisitId, params).then(res => {
        console.log('res', res)
      }).catch(error => {
        console.log('err', error)
      })
    },
    handleAddFollow () {
      const object = {
        id: 'id1',
        date: this.formatDateHourDDMMYYY(),
        date2: '',
        call: '',
        color: '',
        temper: '',
        status: '',
        edema: '',
        move: '',
        pain: '',
        fever: '',
        createdBy: this.$store.state.account.Username
      }
      this.responseList.push(object)
    },
    copyToOPDOENPT0 (str) {
      this.MASTERDATA['IPDSO15DTR14'].Items[0].Value = str
    },
    async save () {
      if (!this.timeTM) {
        this.errorTimeTm = true
      }
      if (!this.nameTM) {
        this.errorNameTm = true
      }
      if (this.timeTM && this.nameTM) {
        this.updateData()
        this.UpdateDataHeader()
        if (this.responseList.length > 0) {
          this.CreateTableData()
        }
        if (this.TableDelete.length > 0) {
          this.DeleteTable()
        }
        // if (this.tableHeader.length > 0 && this.tableHeader[0].RowData[0].Id) {
        //   this.UpdateDataHeader()
        // }
        this.isSave = false
        this.reload()
      }
    },
    updateData () {
      new GetListAllMonitorSheetForPatient().update('/Update/A02_041_050919_V/' + this._VisitId + '/' + this._ItemId).then(() => {
        this.toastedSuccess()
      }).catch(() => {
      })
    },
    getData () {
      this.loaded = false
      new GetListAllMonitorSheetForPatient().find('A02_041_050919_V/' + this._VisitId + '/' + this._ItemId).then(res => {
        this.DataSubmit = res
        if (res.CreatedBy !== this.$store.state.account.Username || this.$route.name !== 'IPDMonitorSheetForPatientItem' || this.$store.state.account.Position.includes('Doctor') || res.IsLocked) {
          this.readonly = true
        }
        this.loaded = true
      }).catch(() => {
        this.loaded = true
      })
    },
    handleBack () {
      if (this.responseList.length !== this.tableLength || this.isSave) {
        this.confirmPopup()
      } else {
        this.$router.push({name: 'ListPatientInIPD'})
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
              this.$router.push({name: 'ListPatientInIPD'})
              // this.back2(`/IPD/SurgeryCertificate/${this._VisitId}`)
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
      new GetListAllMonitorSheetForPatient().find('Info/' + this._VisitId + '?hidemsg=' + true).then(res => {
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
      this.ICD1 = []
      if (value.length) {
        this.ICD1 = value
        this.MASTERDATA['IPDSO15DTR04'].Items[0].Value = JSON.stringify(value)
        if (!this.MASTERDATA['IPDSO15DTR06'].Items[0].Value) {
          this.MASTERDATA['IPDSO15DTR06'].Items[0].Value = value[0].ViName
        }
      } else {
        this.MASTERDATA['IPDSO15DTR04'].Items[0].Value = ''
      }
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
      new GetListAllMonitorSheetForPatient().update('/Confirm/' + this._VisitId + '/' + this._ItemId, data).then(() => {
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
      return constants.LANGUAGES.map((e) => e.nativeName)
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
}

.column {
 margin-left: 5px;
 float: left;
 width: 40%;
}

.w250 {
 width: 250px;
}

.column1 {
 float: left;
 width: 59%;
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
