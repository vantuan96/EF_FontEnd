<template>
    <div class="main-content" id="TrickSummaryPage">
      <div v-if="loaded">
        <template v-if="DataSubmit">
          <div class="box-body-bordered">
            <!-- Thời gian làm thủ thuật -->
            <div class="row" v-if="MASTERDATA['ALLPSNEW1']">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-size: 13.5px;">{{ __t(__label(MASTERDATA['ALLPSNEW1']))}}</label>
                  <div
                    :data="item"
                    :key="index"
                    v-for="(item, index) in MASTERDATA['ALLPSNEW1'].Items"
                  >
                    <p v-if="isConfirmed">{{ item.Value | formatDateTime('HH:mm DD/MM/YYYY')}}</p>
                    <v-date-time-picker
                      v-else
                      v-model="item.Value"
                      class="select-boox no-clear"
                      :format="vDateTimeFormat"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- ICD10 trước thủ thuật -->
            <div class="row" v-if="MASTERDATA['ALLPSNEW3']">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-size: 13.5px;">{{ __t(__label(MASTERDATA['ALLPSNEW3']))}}</label>
                  <icd10 class="mrb10" :mdCode="'ALLPSNEW4'" :single="true" :readonly="isConfirmed" @icdChange="icdChange" v-model="MASTERDATA['ALLPSNEW3'].Items[0].Value"/>
                </div>
              </div>
            </div>
            <!-- Chẩn đoán trước thủ thuật -->
            <div class="row" v-if="MASTERDATA['ALLPSNEW5']">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-size: 13.5px;">{{ __t(__label(MASTERDATA['ALLPSNEW5']))}}</label>
                  <div
                    :data="item"
                    :key="index"
                    v-for="(item, index) in MASTERDATA['ALLPSNEW5'].Items"
                  >
                    <textarea-autosize v-if="item.Code === 'ALLPSNEW6'"
                      :readonly="isConfirmed"
                      :data-code="item.Code"
                      :id="item.Code"
                      :data="item"
                      class="form-control"
                      rows="3"
                      :placeholder="__t('Nhập')"
                      v-model="item.Value"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- ICD10 sau thủ thuật -->
            <div class="row" v-if="MASTERDATA['ALLPSNEW7']">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-size: 13.5px;">{{ __t(__label(MASTERDATA["ALLPSNEW7"]))}}</label>
                  <icd10 class="mrb10" :mdCode="'ALLPSNEW8'" :single="true" :readonly="isConfirmed" @icdChange="icdChange" v-model="MASTERDATA['ALLPSNEW7'].Items[0].Value"/>
                </div>
              </div>
            </div>
            <!-- Chẩn đoán sau thủ thuật -->
            <div class="row" v-if="MASTERDATA['ALLPSNEW9']">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-size: 13.5px;">{{ __t(__label(MASTERDATA["ALLPSNEW9"]))}}</label>
                  <div
                    :data="item"
                    :key="index"
                    v-for="(item, index) in MASTERDATA['ALLPSNEW9'].Items"
                  >
                    <textarea-autosize v-if="item.Code === 'ALLPSNEW10'"
                      :readonly="isConfirmed"
                      :data-code="item.Code"
                      :id="item.Code"
                      :data="item"
                      class="form-control"
                      rows="3"
                      :placeholder="__t('Nhập')"
                      v-model="item.Value"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Phương pháp thủ thuật -->
            <div class="row" v-if="MASTERDATA['ALLPSNEW11']">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-size: 13.5px;">{{ __t(__label(MASTERDATA["ALLPSNEW11"]))}}</label>
                  <div
                    :data="item"
                    :key="index"
                    v-for="(item, index) in MASTERDATA['ALLPSNEW11'].Items"
                  >
                    <textarea-autosize
                      :readonly="isConfirmed"
                      :data-code="item.Code"
                      :id="item.Code"
                      :data="item"
                      class="form-control"
                      rows="3"
                      :placeholder="__t('Nhập')"
                      v-model="item.Value"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Loại thủ thuật -->
            <div class="row" v-if="MASTERDATA['ALLPSNEW35']">
              <div class="col-md-12">
                <div class="form-group flex-box" style="float: left">
                  <label style="margin: auto; margin-right: 20px;">{{ __t(__label(MASTERDATA["ALLPSNEW35"])) }}:</label>
                  <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['ALLPSNEW35'].Items">
                    <div class="btn-action radio-left">
                      <MDRadio
                        v-if="!isConfirmed"
                        :noFlex="true"
                        :indexs="[index]"
                        v-model="MASTERDATA['ALLPSNEW35']"
                      />
                      <MDRadio
                        v-else
                        :noFlex="true"
                        :indexs="[index]"
                        v-model="MASTERDATA['ALLPSNEW35']"
                        style="pointer-events: none;"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Phương pháp vô cảm -->
            <div class="row" v-if="MASTERDATA['ALLPSNEW13']">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-size: 13.5px;">{{ __t(__label(MASTERDATA["ALLPSNEW13"]))}}</label>
                  <div
                    :data="item"
                    :key="index"
                    v-for="(item, index) in MASTERDATA['ALLPSNEW13'].Items"
                  >
                    <textarea-autosize
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    class="form-control"
                    rows="3"
                    :placeholder="__t('Nhập')"
                    v-model="item.Value"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Bác sĩ làm thủ thuật -->
            <div class="row" v-if="MASTERDATA['ALLPSNEW15']">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-size: 13.5px;">{{ __t(__label(MASTERDATA["ALLPSNEW15"]))}}</label>
                  <div
                    :data="item"
                    :key="index"
                    v-for="(item, index) in MASTERDATA['ALLPSNEW15'].Items"
                  >
                    <!-- <user-auto-suggest
                      :readonly="isConfirmed"
                      :data-code="item.Code"
                      :id="item.Code"
                      :data="item"
                      :placeholder="__label(item)"
                      v-model="item.Value"
                    /> -->
                  <UserAdV4 :readonly="isConfirmed" v-model="item.Value" ref="userAd" :placeholder="__t(__label(item))"></UserAdV4>
                  </div>
                </div>
              </div>
            </div>
            <!-- Nhân viên phụ -->
            <div class="row" v-if="MASTERDATA['ALLPSNEW17']">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-size: 13.5px;">{{ __label(MASTERDATA["ALLPSNEW17"])}}</label>
                  <div
                    :data="item"
                    :key="index"
                    v-for="(item, index) in MASTERDATA['ALLPSNEW17'].Items"
                  >
                    <UserAdV4 :readonly="isConfirmed" v-model="item.Value" ref="userAd" :placeholder="__t(__label(item))"></UserAdV4>
                    <!-- <user-auto-suggest
                      :readonly="isConfirmed"
                      :data-code="item.Code"
                      :id="item.Code"
                      :data="item"
                      :placeholder="__label(item)"
                      v-model="item.Value"
                    /> -->
                  </div>
                </div>
              </div>
            </div>
            <!-- Bác sĩ gây mê hồi sức (nếu có) -->
            <div class="row" v-if="MASTERDATA['ALLPSNEW19']">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-size: 13.5px;">{{ __label(MASTERDATA["ALLPSNEW19"])}}</label>
                  <div
                    :data="item"
                    :key="index"
                    v-for="(item, index) in MASTERDATA['ALLPSNEW19'].Items"
                  >
                    <UserAdV4 :readonly="isConfirmed" v-model="item.Value" ref="userAd" :placeholder="__t(__label(item))"></UserAdV4>
                    <!-- <user-auto-suggest
                    :readonly="isConfirmed"
                    :data-code="item.Code"
                    :id="item.Code"
                    :data="item"
                    :placeholder="__label(item)"
                    v-model="item.Value"
                    /> -->
                  </div>
                </div>
              </div>
            </div>
            <!-- Tóm tắt quá trình làm thủ thuật -->
            <div class="row" v-if="MASTERDATA['ALLPSNEW21']">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-size: 13.5px; display: flex; align-items: center; justify-content: center;"><strong>{{ __label(MASTERDATA["ALLPSNEW21"])}}</strong></label>
                  <div
                    :data="item"
                    :key="index"
                    v-for="(item, index) in MASTERDATA['ALLPSNEW21'].Items"
                  >
                    <textarea-autosize
                      :readonly="isConfirmed"
                      :data-code="item.Code"
                      :id="item.Code"
                      :data="item"
                      class="form-control"
                      rows="3"
                      :placeholder="__t('Nhập')"
                      v-model="item.Value"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Upload file and paint -->
            <div class="v-tab">
              <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" :class="{ active: tab === 'tab1' }">
                  <a
                    href="#tab1"
                    @click="tab = 'tab1'"
                    aria-controls="tab1"
                    role="tab"
                    data-toggle="tab"
                  >{{ __t("Upload từ thiết bị")}}</a>
                </li>
                <li role="presentation" :class="{ active: tab === 'tab2' }">
                  <a
                    href="#tab2"
                    @click="tab = 'tab2'"
                    aria-controls="tab2"
                    role="tab"
                    data-toggle="tab"
                  >{{ __t("Hoặc vẽ lược đồ thủ thuật")}}</a>
                </li>
              </ul>
              <div class="tab-content">
                <div
                  role="tabpanel"
                  class="tab-pane min-height-none"
                  id="tab1"
                  :class="{ active: tab === 'tab1' }"
                >
                  <div class="pomc-upload-area mb-10" v-if="MASTERDATA['ALLPSNEW23']">
                    <div class="row" v-if="isConfirmed">
                      <div class="col-md-12 col-sm-12">
                        <drop-files
                        id="mini-upload"
                        :readonly="true"
                        v-model="MASTERDATA['ALLPSNEW23'].Items[0].Value"
                      />
                      </div>
                    </div>
                    <div class="row" v-else>
                      <div class="col-md-7 col-sm-7">
                        <p>
                          <b>{{ __t("Upload ảnh")}}:</b>
                        </p>
                        <p>
                        <button
                          @click="openFile()"
                          class="btn v-white-btn font16 font-bold btn-upload"
                        >
                          <i class="fa fa-upload" aria-hidden="true"></i>
                          {{ __t("UPLOAD TỪ THIẾT BỊ") }}
                        </button>
                      </p>
                      <p>{{__t("Bác sĩ tải hình ảnh mô tả thủ thuật tại đây (cho phép tải 1 hoặc nhiều hình ảnh).")}}</p>
                      </div>
                      <div class="col-md-5 col-sm-5">
                        <drop-files
                          id="mini-upload"
                          v-model="MASTERDATA['ALLPSNEW23'].Items[0].Value"
                          :dataDropfile="dataDropfile"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  role="tabpanel"
                  class="tab-pane min-height-none"
                  id="tab2"
                  :class="{ active: tab === 'tab2'}"
                >
                  <div class="text-center pomc-upload-area">
                    <div class="EDARRPAMAPALO-BG" v-if="MASTERDATA['ALLPSNEW25']">
                      <img
                        src="static/tivi-bg.png"
                        style="width: 950px;opacity: 0.4;"
                      />
                      <div class="paint-content">
                        <Painting
                          :readonly="isConfirmed"
                          v-model="MASTERDATA['ALLPSNEW25'].Items[0].Value"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Các biến chứng trong quá trình làm thủ thuật -->
            <div class="row" v-if="MASTERDATA['ALLPSNEW27']">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-size: 13.5px;">{{ __t(__label(MASTERDATA["ALLPSNEW27"]))}}</label>
                  <div
                    :data="item"
                    :key="index"
                    v-for="(item, index) in MASTERDATA['ALLPSNEW27'].Items"
                  >
                    <textarea-autosize
                      :readonly="isConfirmed"
                      :data-code="item.Code"
                      :id="item.Code"
                      :data="item"
                      class="form-control"
                      rows="3"
                      :placeholder="__t('Nhập')"
                      v-model="item.Value"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Số mẫu bệnh phẩm nếu có - Lượng máu mất - Số đăng ký của thiết bị cấy ghép   -->
            <div class="row">
              <!-- Số mẫu bệnh phẩm nếu có -->
              <div class="col-md-4 col-sm-4">
                <div class="form-group">
                  <label style="font-size: 13px;">{{__label(MASTERDATA['ALLPSNEW29'])}}</label>
                  <div>
                    <div class="fake-input disable" v-if="isConfirmed">{{MASTERDATA['ALLPSNEW29'].Items[0].Value}}</div>
                    <template v-else>
                      <input :readonly="isConfirmed" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['ALLPSNEW29'].Items[0].Value"/>
                    </template>
                  </div>
                </div>
              </div>
              <!-- Lượng máu mất  -->
              <div class="col-md-4 col-sm-4">
                <div class="form-group">
                  <label style="font-size: 13px;">{{__label(MASTERDATA['ALLPSNEW31'])}}</label>
                  <div>
                    <div class="fake-input disable" v-if="isConfirmed">{{MASTERDATA['ALLPSNEW31'].Items[0].Value}}</div>
                    <template v-else>
                      <input :readonly="isConfirmed" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['ALLPSNEW31'].Items[0].Value"/>
                    </template>
                  </div>
                </div>
              </div>
              <!-- Số đăng ký của thiết bị cấy ghép (nếu có) -->
              <div class="col-md-4 col-sm-4">
                <div class="form-group">
                  <label style="font-size: 13px;">{{__label(MASTERDATA['ALLPSNEW33'])}}</label>
                  <div>
                    <div class="fake-input disable" v-if="isConfirmed">{{MASTERDATA['ALLPSNEW33'].Items[0].Value}}</div>
                    <template v-else>
                      <input :readonly="isConfirmed" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['ALLPSNEW33'].Items[0].Value"/>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <!-- Chân ký -->
            <div v-if="DataSubmit" class="row text-center mt-10">
              <div class="col-md-6 col-md-offset-6" v-if="DataSubmit.DoctorConfirm.UserName">
                <div style="font-weight: normal">{{ ConfirmAt }}</div>
                <eform-signature
                  :vi="true"
                  :ad="DataSubmit.DoctorConfirm.UserName"
                  :title="__t('Bác sĩ làm thủ thuật ')"
                />
              </div>
              <div class="col-md-6 col-md-offset-6" v-else>
                <p class="mb-10">
                  <b>{{ __t('Bác sĩ làm thủ thuật ') }}</b>
                </p>
                <i v-if="isConfirmed">{{__t('Chưa xác nhận')}}</i>
                <button v-else @click="showDoctorConfirm('Doctor', 'Bác sĩ làm thủ thuật ')" class="btn v-white-btn">
                  {{ __t('Xác nhận') }}
                </button>
              </div>
            </div>
          </div>
        </template>
        <FloatBlock v-if="!viewOnly" @handleBack='handleBack()' :openBack="true">
          <template slot='buttons'>
            <!-- <div v-if="!isConfirmed" class="col-md-2 col-sm-2">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group1">
              </div>
            </div> -->
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
                <button
                  style="width: 100%;"
                  class="btn btn-info pull-right"
                  type="button"
                  @click="print()"
                  v-shortkey="['ctrl', 'p']"
                  @shortkey="print()"
                >
                  <i class="fa fa-print" aria-hidden="true"></i> {{ __t("In phiếu") }}
                </button>
              </div>
            </div>
            <!-- <div class="col-md-2 col-sm-2">
              <div class="form-group1">
              </div>
            </div> -->
            <div class="col-md-6 col-sm-6" v-if="!isConfirmed">
              <div class="form-group1">
                <button v-if="!nullContent" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
              </div>
            </div>
            <div class="col-md-6 col-sm-6" v-else>
              <!-- Nothing -->
            </div>
          </template>
        </FloatBlock>
        <DoctorConfirm :popupTitle="popupTitle" :TypeConfirm="TypeConfirm" @popupSave="confirm"/>
        <logs
          v-if="!viewOnly"
          :EdId="this._ItemId"
          :Type="_VisitType + '/TrickSummary'"
        />
        <div>
        <p class="mt-10">A01_084_100822_V</p>
        </div>
        <div v-if="hiddenLog">
          <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="timeLog" :ad="timeLog[1]" /> {{__t('lúc')}} {{ timeLog[0] }}</p>
        </div>
        <div id="printMe" v-show="false" v-if="DataSubmit">
          <ViewToPrintTrickSummaryV2 :DataSubmit="DataSubmit"/>
        </div>
      </div>
      <div v-else class="loading-text"><v-loading /></div>
    </div>
</template>

<script>
// import NProgress from 'nprogress'
import UserAdV3 from '../../components/global/UserAdV3.vue'
import UserAdV4 from '../../components/global/UserAdV4.vue'
import moment from 'moment'
import Logs from '@/components/Logs.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import $ from 'jquery'
import _ from 'lodash'
import DoctorConfirm from '@/components/IPD/ForNeonatalMaternity/PopupDoctorConfirm.vue'
import DropFiles from '@/components/DropFiles.vue'
import Painting from '@/components/Painting.vue'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import ViewToPrintTrickSummaryV2 from './PrintV2.vue'
import TrickSummary from '@/services/TrickSummary'
import UploadFileService from '@/services/IPD/UploadFileService'

export default {
  name: 'TrickSummary',
  props: ['viewOnly', 'VisitId', 'Form', 'VisitType', 'formId'],
  mixins: [MixinMasterData, MixinForm],
  components: {
    dataDropfile: {},
    DropFiles,
    Painting,
    VDateTimePicker,
    DoctorConfirm,
    Logs,
    UserAdV3,
    UserAdV4,
    ViewToPrintTrickSummaryV2
  },
  mounted () {
    this.getMasterDatas({ Form: 'A01_084_100822_V' }, () => {
      this.getData()
      console.log('mounted')
    })
  },
  data () {
    return {
      hiddenLog: true,
      timeLog: [],
      nullContent: '',
      DataSubmit: {},
      dataMaster: {},
      loaded: false,
      IsLocked: false,
      CreatedBy: '',
      user: {},
      TypeConfirm: '',
      UpdateAt: '',
      popupTitle: '',
      Change: false,
      ChangeBack: false,
      VisitTypeGroupCode: 'OPD',
      tab: 'tab1',
      ConfirmAt: '',
      ListPositionAndNumber: [
        {
          Position: '',
          Number: ''
        }
      ],
      errorLists: [],
      enableEdit: false,
      enableConfirm: true,
      checkConfirm: false,
      Version: ''
    }
  },
  watch: {
    formId () {
      this.getData()
    },
    MASTERDATA: {
      handler () {
        if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
          this.checkEdited = true
          console.log('watch', this.checkEdited)
        }
        if (this.MASTERDATA['ALLPSNEW5'].Items[0].Value !== '') {
          if (this.MASTERDATA['ALLPSNEW5'].Items[0].Value === this.MASTERDATA3 || this.MASTERDATA['ALLPSNEW5'].Items[0].Value === this.MASTERDATA4) {
            this.Change = false
          } else {
            this.Change = true
          }
        }
        if (this.MASTERDATA['ALLPSNEW9'].Items[0].Value !== '') {
          if (this.MASTERDATA['ALLPSNEW9'].Items[0].Value === this.MASTERDATA7 || this.MASTERDATA['ALLPSNEW9'].Items[0].Value === this.MASTERDATA8) {
            this.ChangeBack = false
          } else {
            this.ChangeBack = true
          }
        }
        // if (this.MASTERDATA['ALLPSNEW5'].Items[0].Value !== '') {
        //   if (this.MASTERDATA['ALLPSNEW5'].Items[0].Value === this.MASTERDATA4) {
        //     console.log('join EN false')
        //     this.Change = false
        //   } else {
        //     console.log('join EN true')
        //     this.Change = true
        //   }
        // }
        // if (this.MASTERDATA['ALLPSNEW9'].Items[0].Value !== '') {
        //   if (this.MASTERDATA['ALLPSNEW9'].Items[0].Value === this.MASTERDATA8) {
        //     this.ChangeBack = false
        //     console.log('join EN false')
        //   } else {
        //     console.log('join EN true')
        //     this.ChangeBack = true
        //   }
        // }
      },
      deep: true
    }
  },
  computed: {
    isConfirmed: function () {
      // return true
      return (
        this.viewOnly ||
        this.IsLocked ||
        // this.getCurrentUsername() !== this.CreatedBy ||
        !this.enableEdit ||
        this.DataSubmit.DoctorConfirm.UserName
      )
    },
    _ItemId: function () {
      return this.formId || this.$route.params.Item
    }
  },
  methods: {
    getUsernameFromString (str) {
      if (!str) return ''
      console.log(str)
      var nstri = str.substring(
        str.indexOf('(') + 1,
        str.indexOf(')')
      )
      return nstri || str
    },
    print () {
      this.$htmlToPaperWithFooter('printMe', '', 'A01_084_100822_V')
    },
    getTimeLog (val1, val2) {
      this.timeLog = [val1, val2]
    },
    setHiddenLog () {
      this.hiddenLog = true
    },
    getICD10s (str, strICDOption, withDiagnosis) {
      var op = ''
      var data = this.JSONParse(str) || []
      var ICDOption = this.JSONParse(strICDOption) || []
      if (ICDOption) {
        data = [...data, ...ICDOption]
      }
      if (data) {
        op = [...new Set(data.map(e => e.code))].join(', ')
      }
      if (withDiagnosis) return op ? ` (${op})` : ''
      return op
    },
    icdChange (value, code) {
      // var currentValue = ''
      var val = (value || []).map(e => e.ViName)
      let item = val.join(', ')
      switch (code) {
        case 'ALLPSNEW4':
          this.MASTERDATA3 = this.MASTERDATA['ALLPSNEW3'].Items[0].Value[0].ViName
          this.MASTERDATA4 = this.MASTERDATA['ALLPSNEW3'].Items[0].Value[0].EnName
          if (this.Change === true) {
            console.log(this.MASTERDATA['ALLPSNEW3'].Items[0].Value[0].ViName, '1Front')
            console.log(item, '2Front')
          } else {
            if (this.MASTERDATA['ALLPSNEW3'].Items[0].Value[0].ViName === item || this.MASTERDATA['ALLPSNEW3'].Items[0].Value[0].EnName === item) {
              this.MASTERDATA['ALLPSNEW5'].Items[0].Value = (val.slice(0)).join(', ')
            } else if (!this.MASTERDATA['ALLPSNEW3'].Items[0].Value) {
              this.MASTERDATA['ALLPSNEW5'].Items[0].Value = this.MASTERDATA['ALLPSNEW3'].Items[0].Value
            } else {
              // nothing
            }
          }
          break
        case 'ALLPSNEW8':
          this.MASTERDATA7 = this.MASTERDATA['ALLPSNEW7'].Items[0].Value[0].ViName
          this.MASTERDATA8 = this.MASTERDATA['ALLPSNEW7'].Items[0].Value[0].EnName
          if (this.ChangeBack === true) {
            console.log(this.MASTERDATA['ALLPSNEW7'].Items[0].Value[0].ViName, '1Back')
            console.log(item, '2Back')
          } else {
            if (this.MASTERDATA['ALLPSNEW7'].Items[0].Value[0].ViName === item || this.MASTERDATA['ALLPSNEW7'].Items[0].Value[0].EnName === item) {
              this.MASTERDATA['ALLPSNEW9'].Items[0].Value = (val.slice(0)).join(', ')
            } else if (!this.MASTERDATA['ALLPSNEW7'].Items[0].Value) {
              this.MASTERDATA['ALLPSNEW9'].Items[0].Value = this.MASTERDATA['ALLPSNEW7'].Items[0].Value
            } else {
              // nothing
            }
          }
          break
      }
    },
    showDoctorConfirm (TypeConfirm, title) {
      console.log(title, 'người xác nhận')
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    async confirm (data) {
      this.checkConfirm = true
      console.log(data, 'data i receive when confirm')
      // if (data.username !== this.CreatedBy) {
      //   this.checkRole()
      // } else {
      console.log(this._ItemId, 'item id when confirm')
      if (this.checkEdited) {
        await this.handleSubmit()
        console.log('submit trước')
        console.log(this._ItemId, 'itemID when check submit')
      }
      new TrickSummary({}, this._VisitType).update('/' + 'Confirm' + '/' + this._VisitId + '/' + this._ItemId, data).then(response => {
        this.$modal.hide('doctorConfirm')
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.checkConfirm = false
        setTimeout(() => {
          this.reload()
        }, 500)
        // this.reload()
      }).catch(e => {
        this.$modal.hide('doctorConfirm')
      })
      // }
    },
    checkRole () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Lỗi phân quyền'),
        text: this.__t('Bạn không có quyền thực hiện thao tác này'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              // this.reload()
            }
          }
        ]
      })
    },
    openFile () {
      $('#dropzone').click()
    },
    getData () {
      this.loaded = false
      if (this._VisitType === 'IPD') {
        if (this.hasRole('IPDPSV23A01084')) {
          this.enableEdit = true
        } else {
          this.enableEdit = false
        }
        if (this.hasRole('IPDPSV24A01084')) {
          this.enableConfirm = true
        } else {
          this.enableConfirm = false
        }
      } else if (this._VisitType === 'ED') {
        if (this.hasRole('EDPSV23A01084')) {
          this.enableEdit = true
        }
        if (this.hasRole('EDPSV24A01084')) {
          this.enableConfirm = true
        } else {
          this.enableConfirm = false
        }
      } else if (this._VisitType === 'EOC') {
        if (this.hasRole('EOCPSV23A01084')) {
          this.enableEdit = true
        }
        if (this.hasRole('EOCPSV24A01084')) {
          this.enableConfirm = true
        } else {
          this.enableConfirm = false
        }
      } else if (this._VisitType === 'OPD') {
        if (this.hasRole('OPDPSV23A01084')) {
          this.enableEdit = true
        } else {
          this.enableEdit = false
        }
        if (this.hasRole('OPDPSV24A01084')) {
          this.enableConfirm = true
        } else {
          this.enableConfirm = false
        }
      }
      if (this.viewOnly) {
        this.resetMdDataValue()
      }
      new TrickSummary({}, this._VisitType).find('GetDetail/' + this._VisitId + '/' + this._ItemId).then(response => {
        console.log(response, 'response ')
        console.log(this._ItemId, 'item ID when get detail')
        // this.nullContent = false
        this.Version = response.Version
        this.IsLocked = response.IsLocked
        if (this.IsLocked) {
          this.enableConfirm = false
        }
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: response.formId
        }
        console.log(' tóm tắt thủ thuật', response, this.dataDropfile)
        this.CreatedBy = response.CreatedBy
        this.ConfirmAt = moment(response.ProcedureTime).format('HH:mm DD/MM/YYYY')
        this.timeLog = [moment(response.UpdatedAt).format('HH:mm DD/MM/YYYY'), response.UpdatedBy]
        this.DataSubmit = response
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else if (exited.Value && item.Code === 'ALLPSNEW1') {
                  item.Value = this.string2Moment(exited.Value)
                  console.log(item.Value, 'value timeeeeeeeeeeeeeeeee')
                } else if (exited.Value && item.Code === 'ALLPSNEW24') {
                  item.Value = (this.JSONParse(exited.Value, true))
                } else if (exited.Value && item.Code === 'ALLPSNEW4') {
                  if (exited.Value !== '') {
                    item.Value = this.JSONParse(exited.Value, true)
                  }
                } else if (exited.Value && item.Code === 'ALLPSNEW8') {
                  if (exited.Value !== '') {
                    item.Value = this.JSONParse(exited.Value, true)
                  }
                } else if (exited.Value && item.Code === 'ALLPSNEW2') {
                  item.Value = this.string2Moment(exited.Value)
                } else if (exited.Value && ['ALLPSNEW16', 'ALLPSNEW18', 'ALLPSNEW20'].includes(item.Code)) {
                  item.Value = this.JSONParse(exited.Value, true).map(e => {
                    if (typeof e === 'string') return this.getUsernameFromString(e)
                    return e
                  })
                } else {
                  item.Value = exited.Value
                }
              } else {
                if (item.Code === 'ALLPSNEW2' && item.Value === '') {
                  item.Value = moment().format('HH:mm DD/MM/YYYY')
                  // nothing
                }
                if (item.Code === 'ALLPSNEW4') {
                  item.Value = ''
                }
                if (item.Code === 'ALLPSNEW8') {
                  item.Value = ''
                }
                if (item.Code === 'ALLPSNEW16') {
                  item.Value = []
                }
                if (item.Code === 'ALLPSNEW18') {
                  item.Value = []
                }
                if (item.Code === 'ALLPSNEW20') {
                  item.Value = []
                }
              }
            })
          }
        }
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        // console.log(this.dataMaster, 'aaaaaaaaaaaaaaaaaaaaaaaaaaa')
        // console.log(this.dataMaster !== JSON.stringify(this.MASTERDATA), 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
        this.loaded = true
        setTimeout(() => {
          this.checkEdited = false
          this.edited = false
          console.log(this.edited, 'check edit when get')
        }, 1000)
      }).catch(e => {
        this.edited = false
        console.log(this.edited, 'check edit when get fail')
        this.loaded = true
        this._401ResponseError(e)
      })
    },
    handleBack () {
      this.edited = false
      if (this.checkEdited) {
        console.log('join 1')
        this.$modal.show('dialog', {
          title: this.__t('Cảnh báo'),
          text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: this.__t('Đồng ý'),
              class: 'btn',
              handler: () => {
                this.$emit('closed')
                this.$modal.hide('MasterDataPopup')
                this.$modal.hide('dialog')
                this.getLastHistory()
              }
            },
            {
              title: this.__t('Hủy bỏ'),
              class: 'btn bg-yellow',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
        })
      } else {
        this.getLastHistory()
      }
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this._ItemId, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    handleSubmit () {
      var arr = this.MASTERDATA['ALLPSNEW23'].Items[0].Value ? this.MASTERDATA['ALLPSNEW23'].Items[0].Value : []
      this.removedFile(arr)
      var obj = {}
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (item.Code === 'ALLPSNEW1') {
              val = this.moment2String(item.Value) || ''
            }
            if (item.Code === 'ALLPSNEW26') {
              console.log(this.MASTERDATA['ALLPSNEW25'].Items[0].Value, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'ALLPSNEW24') {
              val = JSON.stringify(item.Value) || '[]'
            }
            if (item.Code === 'ALLPSNEW4' || item.Code === 'ALLPSNEW8') {
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'ALLPSNEW2') {
              val = this.moment2String(item.Value) || ''
            }
            if (item.Code === 'ALLPSNEW16' || item.Code === 'ALLPSNEW18' || item.Code === 'ALLPSNEW20') {
              val = JSON.stringify(item.Value)
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
      // Call API update
      new TrickSummary({}, this._VisitType).update('/Update/' + this._VisitId + '/' + this._ItemId, this.DataSubmit).then(response => {
        this.edited = false
        console.log(this.edited, 'edited check')
        this.toastedSuccess()
        if (!this.checkConfirm) {
          setTimeout(() => {
            this.reload()
          }, 500)
        }
        // this.reload()
      }).catch(e => {
        this._401ResponseError(e)
      })
    }
    // confirmDeletePopup () {
    //   this.$modal.show('dialog', {
    //     title: this.__t('Cảnh báo'),
    //     text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
    //     class: 'v-dialog v-dialog-warning',
    //     buttons: [
    //       {
    //         title: this.__t('Đồng ý'),
    //         class: 'btn',
    //         handler: () => {
    //           this.$emit('closed')
    //           this.$modal.hide('MasterDataPopup')
    //           this.$modal.hide('dialog')
    //           this.getLastHistory()
    //         }
    //       },
    //       {
    //         title: this.__t('Hủy bỏ'),
    //         class: 'btn btn-warning',
    //         handler: () => {
    //           // this.back()
    //           this.$modal.hide('dialog')
    //         }
    //       }
    //     ]
    //   })
    // }
  }
}
</script>

<style>

</style>
