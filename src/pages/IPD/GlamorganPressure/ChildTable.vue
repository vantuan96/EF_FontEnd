<template>
 <div>
  <!-- <div class="text-center" v-if="!checkLocked">
   <button @click="open(false);" class="uppercase btn v-yellow-btn">
    {{ __t("women.addGlam") }}
   </button>
  </div> -->
  <modal
   name="MasterDataPopup"
   transition="pop-out"
   height="auto"
   :clickToClose="false"
   :width="modalWidth"
  >
   <div class="sync-ed-header">
    {{
     __t("Bảng điểm GLAMORGAN sàng lọc loét do tỳ ép ở trẻ nhi và sơ sinh")
    }}
    <i
     @click="$modal.hide('MasterDataPopup');"
     class="fa fa-times pull-right fa-2"
     aria-hidden="true"
    ></i>
   </div>
   <div class="flex">
    <div class="ml-10 mt-20">
     <label style="width:210px">{{ __t("women.timeAsset") }}:</label>
    </div>
    <div class="mt-10" v-if="readonly">
     <FakeInput v-model="StartingAssessment" />
    </div>

    <div class="mt-10" v-else>
     <v-date-picker
      :hideTooltip="true"
      class="w1510 display-inline"
      :format="'HH:mm DD/MM/YYYY'"
      v-model="StartingAssessment"
     />
    </div>
    <div>
     <div style="margin-left: 300px;" class="mt-20 flex">
      <div>
       <label>{{ __t("Người đánh giá") }}:</label>
      </div>
      <div class="ml-5"><ad-Info :ad="CreatedBy" /></div>
     </div>
    </div>
   </div>
   <div class="sync-ed-box">
    <div class="row container mt-10" style="width: 100%; display: flex;"></div>
    <table class="standing-order-tblnew" :class="{ disable: readonly }">
     <tr>
      <!-- <th width="270">{{ ___t("Thông số") }}</th> -->
      <th>{{ __t("women.risk") }}</th>
      <th style="text-align:center" width="1">{{ __t("women.point") }}</th>
     </tr>
     <!-- vận động -->
     <tr v-if="MASTERDATA['IPDIAAGLAMCANB']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMCANB"]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAGLAMCANBradio-' + 1"
          v-model="MASTERDATA['IPDIAAGLAMCANB'].Items[0].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAGLAMCANBradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAGLAMCANB'].Items,
            MASTERDATA['IPDIAAGLAMCANB'].Items[0]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAGLAMCANB"].Items[0]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <!-- trẻ không tự -->
     <tr v-if="MASTERDATA['IPDIAAGLAMUTC']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMUTC"]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAGLAMUTCradio-' + 1"
          v-model="MASTERDATA['IPDIAAGLAMUTC'].Items[0].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAGLAMUTCradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAGLAMUTC'].Items,
            MASTERDATA['IPDIAAGLAMUTC'].Items[0]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAGLAMUTC"].Items[0]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <!-- có thể vận động -->
     <tr v-if="MASTERDATA['IPDIAAGLAMSMB']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMSMB"]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAGLAMSMBradio-' + 1"
          v-model="MASTERDATA['IPDIAAGLAMSMB'].Items[0].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAGLAMSMBradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAGLAMSMB'].Items,
            MASTERDATA['IPDIAAGLAMSMB'].Items[0]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAGLAMSMB"].Items[0]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <!-- vận động bình thường theo độ tuỏi -->
     <tr v-if="MASTERDATA['IPDIAAGLAMNMRA']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMNMRA"]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAGLAMNMRAradio-' + 1"
          v-model="MASTERDATA['IPDIAAGLAMNMRA'].Items[0].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAGLAMNMRAradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAGLAMNMRA'].Items,
            MASTERDATA['IPDIAAGLAMNMRA'].Items[0]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAGLAMNMRA"].Items[0]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <!-- có áp lực -->
     <tr v-if="MASTERDATA['IPDIAAGLAMUNAL']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMUNAL"]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAGLAMUNALradio-' + 1"
          v-model="MASTERDATA['IPDIAAGLAMUNAL'].Items[0].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAGLAMUNALradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAGLAMUNAL'].Items,
            MASTERDATA['IPDIAAGLAMUNAL'].Items[0]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAGLAMUNAL"].Items[0]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <!-- đang thiếu máu nặng -->
     <tr v-if="MASTERDATA['IPDIAAGLAMSAHB']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMSAHB"]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAGLAMSAHBradio-' + 1"
          v-model="MASTERDATA['IPDIAAGLAMSAHB'].Items[0].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAGLAMSAHBradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAGLAMSAHB'].Items,
            MASTERDATA['IPDIAAGLAMSAHB'].Items[0]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAGLAMSAHB"].Items[0]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <!-- sốt dai dẳng -->
     <tr v-if="MASTERDATA['IPDIAAGLAMPPT']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMPPT"]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAGLAMPPTradio-' + 1"
          v-model="MASTERDATA['IPDIAAGLAMPPT'].Items[0].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAGLAMPPTradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAGLAMPPT'].Items,
            MASTERDATA['IPDIAAGLAMPPT'].Items[0]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAGLAMPPT"].Items[0]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <!-- kém tưới máu ngoại vi -->
     <tr v-if="MASTERDATA['IPDIAAGLAMCEC']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMCEC"]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAGLAMCECradio-' + 1"
          v-model="MASTERDATA['IPDIAAGLAMCEC'].Items[0].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAGLAMCECradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAGLAMCEC'].Items,
            MASTERDATA['IPDIAAGLAMCEC'].Items[0]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAGLAMCEC"].Items[0]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <!-- thiếu dinh dưỡng -->
     <tr v-if="MASTERDATA['IPDIAAGLAMIND']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMIND"]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAGLAMINDradio-' + 1"
          v-model="MASTERDATA['IPDIAAGLAMIND'].Items[0].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAGLAMINDradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAGLAMIND'].Items,
            MASTERDATA['IPDIAAGLAMIND'].Items[0]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAGLAMIND"].Items[0]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <!-- albumin thấp -->
     <tr v-if="MASTERDATA['IPDIAAGLAMABML']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMABML"]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAGLAMABMLradio-' + 1"
          v-model="MASTERDATA['IPDIAAGLAMABML'].Items[0].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAGLAMABMLradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAGLAMABML'].Items,
            MASTERDATA['IPDIAAGLAMABML'].Items[0]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAGLAMABML"].Items[0]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <!-- không có chỉ số albumin -->
     <tr v-if="MASTERDATA['IPDIAAGLAMDATA']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMDATA"]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAGLAMDATAradio-' + 1"
          v-model="MASTERDATA['IPDIAAGLAMDATA'].Items[0].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAGLAMDATAradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAGLAMDATA'].Items,
            MASTERDATA['IPDIAAGLAMDATA'].Items[0]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAGLAMDATA"].Items[0]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <!-- cân nặng giảm hơn -->
     <tr v-if="MASTERDATA['IPDIAAGLAMWLT1']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMWLT1"]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAGLAMWLT1radio-' + 1"
          v-model="MASTERDATA['IPDIAAGLAMWLT1'].Items[0].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAGLAMWLT1radio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAGLAMWLT1'].Items,
            MASTERDATA['IPDIAAGLAMWLT1'].Items[0]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAGLAMWLT1"].Items[0]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <!-- không tự chủ -->
     <tr v-if="MASTERDATA['IPDIAAGLAMDTT']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMDTT"]) }}</td>
      <td>
       <div class="group-radio full-width">
        <span>
         <input
          type="checkbox"
          :id="'IPDIAAGLAMDTTradio-' + 1"
          v-model="MASTERDATA['IPDIAAGLAMDTT'].Items[0].Value"
          @change="calculatePoint();"
         />
         <label
          :for="'IPDIAAGLAMDTTradio-' + 1"
          @click="
           checkbox2Radio(
            MASTERDATA['IPDIAAGLAMDTT'].Items,
            MASTERDATA['IPDIAAGLAMDTT'].Items[0]
           );
          "
          >{{ __label(MASTERDATA["IPDIAAGLAMDTT"].Items[0]) }}</label
         >
        </span>
       </div>
      </td>
     </tr>
     <tr>
      <td class="bg-head" width="270">{{ __t("women.totalPoint") }}</td>
      <!-- <td></td> -->
      <td>
       <!--
        <label v-if="totalPoint === 0" :class="backgroundLevel">0</label>
       -->
       <label :class="backgroundLevel">{{ totalPoint }}</label>
      </td>
     </tr>
     <tr>
      <td class="bg-head" width="270">{{ __t("women.levelGlam") }}</td>
      <!-- <td></td> -->
      <td>
       <label :class="backgroundLevel">{{ levelPoint }}</label>
      </td>
     </tr>
     <tr>
      <th>{{ __t("women.Intervention") }}</th>
      <th class="no-wrap" style="text-align:center">{{ __t("women.tick") }}</th>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAGLAMINTV']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMINTV"].Items[0]) }}</td>
      <td>
       <label class="container-checkbox reset" :for="1 + 'IPDIAAGLAMINTV-' + 1">
        <input
         type="checkbox"
         :id="1 + 'IPDIAAGLAMINTV-' + 1"
         v-model="MASTERDATA['IPDIAAGLAMINTV'].Items[0].Value"
         @change="calculatePoint();"
        />
        <span class="checkmark"></span>
       </label>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAGLAMINTV']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMINTV"].Items[1]) }}</td>
      <td>
       <label class="container-checkbox reset" :for="2 + 'IPDIAAGLAMINTV-' + 2">
        <input
         type="checkbox"
         :id="2 + 'IPDIAAGLAMINTV-' + 2"
         v-model="MASTERDATA['IPDIAAGLAMINTV'].Items[1].Value"
         @change="calculatePoint();"
        />
        <span class="checkmark"></span>
       </label>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAGLAMINTV']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMINTV"].Items[2]) }}</td>
      <td>
       <label class="container-checkbox reset" :for="3 + 'IPDIAAGLAMINTV-' + 3">
        <input
         type="checkbox"
         :id="3 + 'IPDIAAGLAMINTV-' + 3"
         v-model="MASTERDATA['IPDIAAGLAMINTV'].Items[2].Value"
         @change="calculatePoint();"
        />
        <span class="checkmark"></span>
       </label>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAGLAMINTV']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMINTV"].Items[3]) }}</td>
      <td>
       <label class="container-checkbox reset" :for="4 + 'IPDIAAGLAMINTV-' + 4">
        <input
         type="checkbox"
         :id="4 + 'IPDIAAGLAMINTV-' + 4"
         v-model="MASTERDATA['IPDIAAGLAMINTV'].Items[3].Value"
         @change="calculatePoint();"
        />
        <span class="checkmark"></span>
       </label>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAGLAMINTV']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMINTV"].Items[4]) }}</td>
      <td>
       <label class="container-checkbox reset" :for="5 + 'IPDIAAGLAMINTV-' + 5">
        <input
         type="checkbox"
         :id="5 + 'IPDIAAGLAMINTV-' + 5"
         v-model="MASTERDATA['IPDIAAGLAMINTV'].Items[4].Value"
         @change="calculatePoint();"
        />
        <span class="checkmark"></span>
       </label>
      </td>
     </tr>
     <tr v-if="MASTERDATA['IPDIAAGLAMINTV']">
      <td width="270">{{ __label(MASTERDATA["IPDIAAGLAMINTV"].Items[5]) }}</td>
      <td>
       <label class="container-checkbox reset" :for="6 + 'IPDIAAGLAMINTV-' + 6">
        <input
         type="checkbox"
         :id="6 + 'IPDIAAGLAMINTV-' + 6"
         v-model="MASTERDATA['IPDIAAGLAMINTV'].Items[5].Value"
         @change="calculatePoint();"
        />
        <span class="checkmark"></span>
       </label>
      </td>
     </tr>
     <tr>
      <td colspan="2" class="text-center">
       <button class="btn-add" @click="handleAddInvention">
        <i aria-hidden="true" class="fa fa-plus"></i> {{ __t("women.AddGlam") }}
       </button>
      </td>
     </tr>
     <tr v-for="(item, index) in otherInventionList" :key="index">
      <td width="270">
       <div style="position: relative;">
        <button class="btn-pos-custom" @click="remove(index);">
         <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        <div class="ml-20">
         <textarea-autosize v-model="item.text" class="form-control" rows="1" />
        </div>
       </div>
      </td>

      <td>
       <label class="container-checkbox reset">
        <input
         type="checkbox"
         :id="3434"
         v-model="item.value"
         @click="handleTickItem(item.value, index)"
        />
        <span class="checkmark"></span>
       </label>
      </td>
     </tr>
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
import Glamorgan from '@/services/IPD/Glamorgan'
import MixinMasterData from '@/mixins/masterdata.js'
import NProgress from 'nprogress'
import _ from 'lodash'
import UsersSelect2 from '@/components/UsersSelect2.vue'
import VDatePicker from '@/components/VDateTimePicker.vue'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import moment from 'moment'
import EIOService from '@/services/IPD/EIOService'
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
]
export default {
  name: 'Morse',
  props: ['readonly', 'VisitId'],
  mixins: [MixinMasterData],
  data () {
    return {
      checkConfirm: '',
      DataSubmit: {
      },
      testClick: false,
      checkLocked: false,
      backgroundLevel: 'label-default',
      CreatedBy: '',
      StartingAssessment: '',
      modalWidth: MODAL_WIDTH,
      ageIndex: [0, 1],
      LEVELS: ['Thấp', 'Trung Bình', 'Cao'],
      formId: null,
      MDCODES2: MDCODES2,
      otherInventionList: [],
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
      levelPoint: 'N/A',
      totalPoint: 'N/A',
      levelSave: '',
      totalSave: ''
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
      return level
    }
  },
  components: {
    VDatePicker, UsersSelect2, DateRangePicker
  },
  async mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
    this.getTotal()
    await this.getIsLocked()
    this.getMasterDatas({Form: 'IPDIAAGLAM'}, () => {
    })
  },
  methods: {
    handleTickItem (value, index) {
      this.otherInventionList[index].value = !value
    },
    remove (i) {
      this.otherInventionList = this.otherInventionList.filter((_, index) => index !== i)
    },
    handleAddInvention () {
      const item = {
        text: '',
        value: false
      }
      this.otherInventionList.push(item)
    },
    getIsLocked () {
      const params = {
      // ...this.query,
        VisitId: this.VisitId ? this.VisitId : this.$route.params.Id
      }
      new Glamorgan(params).find('A02_066_050919_VE/All').then(response => {
        // || !this.hasRole('IPDGLAMORGANPOST')
        if (response.IsLocked || this.readonly || !this.hasRole('IPDGLAMORGANPOST')) {
          this.checkLocked = true
        }
      })
    },
    getReadonly (value) {
      this.readonly = value
    },
    calculatePoint () {
      var a = 0
      if (this.MASTERDATA['IPDIAAGLAMCANB'].Items[0].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAGLAMCANB'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDIAAGLAMUTC'].Items[0].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAGLAMUTC'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDIAAGLAMSMB'].Items[0].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAGLAMSMB'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDIAAGLAMNMRA'].Items[0].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAGLAMNMRA'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDIAAGLAMUNAL'].Items[0].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAGLAMUNAL'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDIAAGLAMSAHB'].Items[0].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAGLAMSAHB'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDIAAGLAMPPT'].Items[0].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAGLAMPPT'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDIAAGLAMCEC'].Items[0].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAGLAMCEC'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDIAAGLAMIND'].Items[0].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAGLAMIND'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDIAAGLAMABML'].Items[0].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAGLAMABML'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDIAAGLAMDATA'].Items[0].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAGLAMDATA'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDIAAGLAMWLT1'].Items[0].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAGLAMWLT1'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDIAAGLAMDTT'].Items[0].Value) {
        a += parseInt(this.MASTERDATA['IPDIAAGLAMDTT'].Items[0].ViName)
      }
      this.totalPoint = a.toString()
      if (a === 0) {
        // điểm =0, và tích chọn 1 trong 2 ô 0đ
        if (this.MASTERDATA['IPDIAAGLAMNMRA'].Items[0].Value || this.MASTERDATA['IPDIAAGLAMDATA'].Items[0].Value) {
          this.totalPoint = '0'
          this.levelPoint = 'N/A'
          this.backgroundLevel = 'label-white'
        } else {
          this.totalPoint = 'N/A'
        }
      } else if (a > 0 && a < 10) {
        this.levelPoint = 'N/A'
        this.backgroundLevel = 'label-white'
      } else if (a >= 10 && a < 15) {
        this.levelPoint = this.$t('women.lowGlam')
        this.backgroundLevel = 'label-green'
      } else if (a >= 15 && a < 20) {
        this.levelPoint = this.$t('women.highGlam')
        this.backgroundLevel = 'label-yellow-new'
      } else if (a >= 20) {
        this.levelPoint = this.$t('women.veryHighGlam')
        this.backgroundLevel = 'label-red'
      } else {
        this.levelPoint = 'N/A'
        this.backgroundLevel = 'label-white'
      }
    },
    async open (formId) {
      this.otherInventionList = []
      this.formId = formId
      this.resetMdDataValue()
      this.checkConfirm = ''
      if (this.formId) {
        await new EIOService().find('ConfirmForms/GetDetail/' + formId).then(res => {
          this.checkConfirm = res.Id
          console.log('check', this.checkConfirm, res)
        }).catch((e) => {
        })
        this.getData()
      } else {
        this.CreatedBy = this.getUser()
        this.StartingAssessment = moment().format('HH:mm DD/MM/YYYY')
        this.MASTERDATA['IPDIAAGLAMDT'].Items[0].Value = moment().format('HH:mm DD/MM/YYYY')
        this.$modal.show('MasterDataPopup')
        this.setAgeIndex()
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
      // this.MASTERDATA['IPDMMFSAGE'].Items[this.ageIndex[1]].Value = true
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
    getData () {
      new Glamorgan().find('A02_066_050919_VE/' + this.formId).then(response => {
        this.DataSubmit = response
        this.loaded = true
        this.CreatedBy = response.CreatedBy
        this.StartingAssessment = response.StartingAssessment ? moment(response.StartingAssessment).format('HH:mm DD/MM/YYYY') : moment().format('HH:mm DD/MM/YYYY')
        if (response.CreatedBy !== this.getUser() || response.IsLocked || this.checkConfirm) {
          this.readonly = true
        }
        this.otherInventionList = this.JSONParse(response.InterventionOther)
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
        this.calculatePoint()
        this.edited = false
        this.$modal.show('MasterDataPopup')
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
      this.DataSubmit.Level = this.levelPoint
      this.DataSubmit.Intervention = []
      this.DataSubmit.InterventionOther = []
      // this.DataSubmit.InterventionOther = this.otherInventionList                                     +
      if (this.otherInventionList.length > 0) {
        for (let i = 0; i < this.otherInventionList.length; i++) {
          const item = {
            text: this.otherInventionList[i].text,
            value: this.otherInventionList[i].value
          }
          this.DataSubmit.InterventionOther.push(item)
        }
        this.DataSubmit.InterventionOther = JSON.stringify(this.DataSubmit.InterventionOther)
      }
      // this.MASTERDATA['IPDIAAGLAMINTV'].Items[6].Value = JSON.stringify(this.otherInventionList)
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
            if (item.DataType === 'Checkbox') {
              val = item.Value
              if (val) {
                this.DataSubmit.Intervention.push({
                  ViName: item.ViName,
                  EnName: item.EnName
                })
              }
            }
            // if (MDCODES2.includes(property)) {
            //  && item.Data[this.level] === '1'
            // }
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
      var url = 'Create/A02_066_050919_VE/' + this._VisitId
      if (this.formId) {
        url = 'Update/A02_066_050919_VE/' + this.$route.params.Id + '/' + this.formId
      }
      this.DataSubmit.Intervention = JSON.stringify(this.DataSubmit.Intervention)
      this.DataSubmit = {
        ...this.DataSubmit,
        StartingAssessment: this.StartingAssessment,
        Level: this.levelPoint,
        Total: this.totalPoint
      }
      new Glamorgan().update(url, this.DataSubmit).then(response => {
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
