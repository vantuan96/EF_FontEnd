<template>
  <div>
    <div v-if="loaded">
      <Print
        id="printMe"
        :DataSubmit="DataSubmit"
        :valueICD10="valueICD10"
        :MASTERDATA="MASTERDATA"
        hidden
      />
      <div class="text-center" v-if="nullContent">
        <NewForm @createForm="createPopup" :IsLocked="IsLocked" :TitleForm="''"/>
        <!-- <p v-if="!IsLocked">{{__t('Chưa có phiếu cam kết truyền máu và các chế phẩm máu')}}</p>
        <div v-else class="null-content">{{__t('AdultVitalSigns.labelNull')}}</div>
        <button class="btn btn-warning" @click="createPopup" v-if="!IsLocked">{{__t('Tạo mới')}}</button> -->
      </div>
      <div v-else>
        <div class="box box-table">
          <div class="box-body" style="padding-right: 21px;">
            <!-- Thông tin người bệnh -->
            <div id="Block1_ConsentForTransfusionBlood">
              <label class="block-title">1. {{__t('THÔNG TIN NGƯỜI BỆNH')}}:</label>
              <span class="flex align-center mrb10 ml-20">
                <p class="mb-0">{{__label(MASTERDATA["TOBABDP1"])}}:</p>
                <span class="ml-5">{{getChuanDoanVer1(DataSubmit)}}</span>
              </span>
              <span class="flex align-center mrb10 ml-20">
                <p class="mb-0">{{__label(MASTERDATA["TOBABDP3"])}}:</p>
                <span class="ml-5">{{MASTERDATA["TOBABDP3"].Items[0].Value}}</span>
              </span>
              <hr/>
            </div>
            <!-- Cam kết của người bệnh -->
            <div id="Block2_ConsentForTransfusionBlood">
              <label class="block-title">2. {{__t('CAM KẾT CỦA NGƯỜI BỆNH/ NGƯỜI ĐẠI DIỆN')}}:</label>
              <MDRadio style="padding-left: 5px;" :indexs="[0]" :readonly="isConfirmed" v-if="MASTERDATA['TOBABDP5'] && !isConfirmed" v-model="MASTERDATA['TOBABDP5']"/>
              <div class="flex align-center mrb-10" v-if="MASTERDATA['TOBABDP5']">
                <MDRadio style="padding-left: 5px;padding-bottom: 2px; padding-right: 2px;" :indexs="[2]" :readonly="isConfirmed" v-if="MASTERDATA['TOBABDP5']" v-model="MASTERDATA['TOBABDP5']"/>
                <template v-if="MASTERDATA['TOBABDP5'].Items[2].Value === true">
                  <MDText :readonly="isConfirmed" class="mrr10" :placeholder="__t('Nhập')" style="width: 250px;" rows="1" v-model="MASTERDATA['TOBABDP58'].Items[0].Value" />
                  <div class="mrr5 white-space">{{__t('Mối quan hệ')}}:</div>
                  <v-select
                    v-if="!isConfirmed"
                    class='select-full-w'
                    style="width: 150px!important;"
                    :placeholder="__t('Chọn')"
                    :items="BLOODRELATION"
                    v-model="MASTERDATA['TOBABDP54'].Items[0].Value"
                  />
                  <MDText v-else :readonly="isConfirmed" class="mrr10" :placeholder="__t('Nhập')" style="width: 200px;" rows="1" v-model="MASTERDATA['TOBABDP54'].Items[0].Value" />
                  <div v-if="MASTERDATA['TOBABDP54'].Items[0].Value === 'Khác/ Other'" style="width: 250px; padding-left: 6px; padding-top: 1px;">
                    <MDText :readonly="isConfirmed" class="mrr10" :placeholder="__t('Nhập')" style="width: 250px;" rows="1" v-model="MASTERDATA['TOBABDP56'].Items[0].Value" />
                  </div>
                </template>
              </div>
              <hr/>
              <div class="ml-18">
              </div>
              <div class="ml-18">
                <p><b>a.</b> {{__label(MASTERDATA["TOBABDP10"])}}</p>
                <p class="justify">{{__label(MASTERDATA["TOBABDP13"])}}</p>
                <ul class="roman justify">
                  <li>{{__label(MASTERDATA['TOBABDP13'].Items[0])}}</li>
                  <li>{{__label(MASTERDATA['TOBABDP13'].Items[1])}}</li>
                  <li>{{__label(MASTERDATA['TOBABDP13'].Items[2])}}</li>
                  <li>
                    <div class="col-md-1.5 padding-right-0">
                      <label class="container-checkbox" style="margin: 12px 8px 5px 10px;" v-if="!isConfirmed">
                        <p style="padding: 1px;">{{__label(MASTERDATA['TOBABDP17'])}}</p>
                        <input type="checkbox" v-model="MASTERDATA['TOBABDP17'].Items[0].Value" required>
                        <span class="checkmark"></span>
                      </label>
                      <label class="container-checkbox" style="margin: 12px 8px 5px 10px;" disabled v-else>
                        <p style="padding: 1px;">{{__label(MASTERDATA['TOBABDP17'])}}</p>
                        <input type="checkbox" v-model="MASTERDATA['TOBABDP17'].Items[0].Value" required>
                        <span class="checkmark"></span>
                      </label>
                      <textarea-autosize
                        style="margin-left: 7px;"
                        v-if="MASTERDATA['TOBABDP17'].Items[0].Value === true"
                        :readonly="isConfirmed"
                        class="form-control"
                        rows="3"
                        :placeholder="__t('Nhập')"
                        v-model="MASTERDATA['TOBABDP17'].Items[1].Value"
                        :code="MASTERDATA['TOBABDP17'].Items[1].Code"
                      />
                    </div>
                  </li>
                  <li>
                    <div class="col-md-1.5 padding-right-0">
                      <label class="container-checkbox" style="margin: 12px 8px 5px 10px;" v-if="!isConfirmed">
                        <p style="padding: 1px;">{{__label(MASTERDATA['TOBABDP20'])}}</p>
                        <input type="checkbox" v-model="MASTERDATA['TOBABDP20'].Items[0].Value">
                        <span class="checkmark"></span>
                      </label>
                      <label class="container-checkbox" style="margin: 12px 8px 5px 10px;" disabled v-else>
                        <p style="padding: 1px;">{{__label(MASTERDATA['TOBABDP20'])}}</p>
                        <input type="checkbox" v-model="MASTERDATA['TOBABDP20'].Items[0].Value">
                        <span class="checkmark"></span>
                      </label>
                      <textarea-autosize
                        style="margin-left: 7px;"
                        v-if="MASTERDATA['TOBABDP20'].Items[0].Value === true"
                        :readonly="isConfirmed"
                        class="form-control"
                        rows="3"
                        :placeholder="__t('Nhập')"
                        v-model="MASTERDATA['TOBABDP20'].Items[1].Value"
                        :code="MASTERDATA['TOBABDP20'].Items[1].Code"
                      />
                    </div>
                  </li>
                </ul>
              </div>
              <div class="ml-18 justify">
                <p><b>b.</b> {{__label(MASTERDATA["TOBABDP23"])}}</p>
                <div class="row" v-if="MASTERDATA['TOBABDP24']">
                  <div class="col-md-12">
                    <div class="form-group" style="display: flex; align-items: center; justify-content: flex-end">
                      <label style="margin-right: 8px; margin-top:2px;">{{__label(MASTERDATA['TOBABDP24'])}}</label>
                      <div
                        :data="item"
                        :key="index"
                        v-for="(item, index) in MASTERDATA['TOBABDP24'].Items"
                      >
                        <v-date-time-picker
                          v-if="isConfirmed"
                          v-model="item.Value"
                          :readonly="true"
                          :format="vDateTimeFormat"
                        />
                        <v-date-time-picker
                          v-else
                          v-model="item.Value"
                          :format="vDateTimeFormat"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="ml-18">
                <label>2.1. {{__t('XÁC NHẬN CỦA NGƯỜI BỆNH/ NGƯỜI ĐẠI DIỆN')}}:</label>
                <p class="justify" v-html="$t('Tôi xác nhận đã hiểu nội dung của bản cam kết này thông qua trao đổi với bác sỹ và xác nhận tôi đã có cơ hội hỏi và nhận được các đầy đủ các câu trả lời, thông tin mong muốn. Tôi không còn bất cứ thắc mắc hay câu hỏi nào và <b>ĐỒNG Ý</b> nhận truyền máu/ chế phẩm máu.')"></p>
                <div v-if="MASTERDATA['TOBABDP5'].Items[0].Value === true">
                  <span class="flex align-center mrb10">
                    <div style="width: 60%;">
                      <label>{{__label(MASTERDATA["TOBABDP27"])}}</label>
                      <!-- <span>Họ tên của người bệnh/ <i>Patient’s name</i>:</span> -->
                      <span v-if="MASTERDATA['TOBABDP27']" class="mb-5 ml-5">{{MASTERDATA['TOBABDP27'].Items[0].Value}}</span>
                    </div>
                    <div class="mb-5 ml-5" style="width:40%; text-align: center; font-size: 14px; display: flex; justify-content: flex-start">{{__t('Chữ ký')}}</div>
                  </span>
                </div>
                <div v-else-if="MASTERDATA['TOBABDP5'].Items[2].Value === true">
                  <span class="flex align-center mrb10">
                    <div style="width: 60%">
                      <label>{{__label(MASTERDATA["TOBABDP29"])}}</label>
                      <!-- <span>Họ tên của người đại diện/ <i>Representative's name</i>:</span> -->
                      <span v-if="MASTERDATA['TOBABDP58'].Items[0].Value" class="mb-5 ml-5">{{MASTERDATA['TOBABDP58'].Items[0].Value}}</span>
                    </div>
                    <div class="mb-5 ml-5" style="width: 40%; text-align: center; font-size: 14px; display: flex; justify-content: flex-start">{{__t('Chữ ký')}}</div>
                  </span>
                  <span class="flex align-center mrb10">
                    <span>{{__t('Ghi rõ quan hệ với người bệnh nếu người ký là người đại diện')}}: {{getNameDaiDien()}}</span>
                  </span>
                </div>
              </div>
              <br/>
              <br/>
              <hr/>
              <!-- Xác nhận của phiên dịch viên -->
              <div class="ml-18">
                <label>2.2. {{__t('XÁC NHẬN CỦA PHIÊN DỊCH VIÊN (nếu có)')}}:</label>
                <p v-if="MASTERDATA['TOBABDP5'].Items[0].Value === true" class="justify">{{__t('Tôi đã phiên dịch trung thực, khách quan, đúng nghĩa toàn bộ nội dung bản cam kết này cho người bệnh và phiên dịch đầy đủ những trao đổi bằng lời nói hay văn bản giữa bác sĩ và người bệnh')}}</p>
                <p v-else-if="MASTERDATA['TOBABDP5'].Items[2].Value === true" class="justify">{{__t('Tôi đã phiên dịch trung thực, khách quan, đúng nghĩa toàn bộ nội dung bản cam kết này cho người đại diện và phiên dịch đầy đủ những trao đổi bằng lời nói hay văn bản giữa bác sĩ và người đại diện')}}</p>
                <div>
                  <span class="flex align-center mrb10">
                    <label>{{__label(MASTERDATA["TOBABDP34"])}}</label>
                    <MDText :readonly="isConfirmed" class="mrr10" :placeholder="__t('Nhập')" style="width: 250px; margin-left: 10px;" rows="1" v-model="MASTERDATA['TOBABDP34'].Items[0].Value" />
                    <div class="mb-5 ml-5" style=" width:40%; margin-left: 125px;; text-align: center; font-size: 14px; display: flex; justify-content: flex-start">{{__t('Chữ ký')}}:</div>
                  </span>
                </div>
              </div>
              <br/>
              <br/>
              <hr/>
              <!-- Xác nhận của bác sĩ -->
              <div class="ml-18">
                <label>2.3. {{__t('XÁC NHẬN CỦA BÁC SỸ')}}:</label>
                <!-- <p class="justify">{{__label(MASTERDATA["TOBABDP36"])}}</p> -->
                <p v-if="MASTERDATA['TOBABDP5'].Items[0].Value === true" class="justify">{{__t('Tôi đã giải thích cho người bệnh về bản chất, lợi ích, rủi ro của việc truyền máu cũng như các phương pháp thay thế (nếu có)')}}.</p>
                <p v-else-if="MASTERDATA['TOBABDP5'].Items[2].Value === true" class="justify">{{__t('Tôi đã giải thích cho người đại diện về bản chất, lợi ích, rủi ro của việc truyền máu cũng như các phương pháp thay thế (nếu có)')}}.</p>
                <div>
                  <span class="flex align-center mrb10">
                    <div style="width: 60%;">
                      <label>{{__label(MASTERDATA["TOBABDP37"])}}:</label>
                      <span v-if="MASTERDATA['TOBABDP37'].Items[0].Value" class="mb-5 ml-5">{{MASTERDATA['TOBABDP37'].Items[0].Value}}</span>
                    </div>
                    <div class="mb-5 ml-5" style=" width: 40%; text-align: center; font-size: 14px; display: flex; justify-content: flex-start">{{__t('Chữ ký')}}:</div>
                  </span>
                </div>
                <div class="col-md-1.5 padding-right-0">
                  <label class="container-checkbox" style="margin: 12px 8px 5px 0px;" v-if="!isConfirmed">
                    <p style="padding: 1px;">{{__label(MASTERDATA['TOBABDP39'])}}</p>
                    <input type="checkbox" v-model="MASTERDATA['TOBABDP39'].Items[0].Value">
                    <span class="checkmark"></span>
                  </label>
                  <label class="container-checkbox" style="margin: 12px 8px 5px 0px;" disabled v-else>
                    <p style="padding: 1px;">{{__label(MASTERDATA['TOBABDP39'])}}</p>
                    <input type="checkbox" v-model="MASTERDATA['TOBABDP39'].Items[0].Value">
                    <span class="checkmark"></span>
                  </label>
                  <textarea-autosize
                    v-if="MASTERDATA['TOBABDP39'].Items[0].Value === true"
                    :readonly="isConfirmed"
                    class="form-control"
                    rows="3"
                    :placeholder="__t('Nhập')"
                    v-model="MASTERDATA['TOBABDP39'].Items[1].Value"
                    :code="MASTERDATA['TOBABDP39'].Items[1].Code"
                  />
                </div>
              </div>
              <br/>
              <br/>
              <hr/>
            </div>
            <!-- Xác nhận hủy cam kết đã ký -->
            <div id="Block3_ConsentForTransfusionBlood">
              <div class="ml-18 justify">
                <label class="block-title">3. {{__t('XÁC NHẬN HỦY CAM KẾT ĐÃ KÝ (nếu áp dụng)')}}:</label>
                <p style="padding: 1px;">{{__label(MASTERDATA['TOBABDP42'])}}</p>
                <div class="row" v-if="MASTERDATA['TOBABDP43']">
                  <div class="col-md-12">
                    <div class="form-group" style="display: flex; align-items: center; justify-content: flex-end">
                      <label style="margin-right: 8px; margin-top:2px;">{{__label(MASTERDATA['TOBABDP43'])}}:</label>
                      <div
                        :data="item"
                        :key="index"
                        v-for="(item, index) in MASTERDATA['TOBABDP43'].Items"
                      >
                        <v-date-time-picker
                          v-if="isConfirmed"
                          v-model="item.Value"
                          :readonly="true"
                          :format="vDateTimeFormat"
                        />
                        <v-date-time-picker
                          v-else
                          v-model="item.Value"
                          :format="vDateTimeFormat"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="MASTERDATA['TOBABDP5'].Items[0].Value === true">
                  <div>
                    <span class="flex align-center mrb10">
                      <div style="width: 60%;">
                        <label>{{__label(MASTERDATA["TOBABDP45"])}}:</label>
                        <!-- <span>Họ tên của người bệnh/ <i>Patient’s name</i>:</span> -->
                        <span v-if="MASTERDATA['TOBABDP27']" class="mb-5 ml-5">{{MASTERDATA['TOBABDP27'].Items[0].Value}}</span>
                      </div>
                      <div class="mb-5 ml-5" style=" width: 40%; text-align: center; font-size: 14px; display: flex; justify-content: flex-start">{{__t('Chữ ký')}}:</div>
                    </span>
                  </div>
                <br/>
                </div>
                <div v-else-if="MASTERDATA['TOBABDP5'].Items[2].Value === true">
                  <div>
                    <span class="flex align-center mrb10">
                      <div style="width: 60%;">
                        <label>{{__label(MASTERDATA["TOBABDP45"].Items[1])}}:</label>
                        <!-- <span>Họ tên của người đại diện/ <i>Representative’s name</i>:</span> -->
                        <span v-if="MASTERDATA['TOBABDP58'].Items[0].Value" class="mb-5 ml-5">{{MASTERDATA['TOBABDP58'].Items[0].Value}}</span>
                      </div>
                      <div class="mb-5 ml-5" style=" width: 40%; text-align: center; font-size: 14px; display: flex; justify-content: flex-start">{{__t('Chữ ký')}}:</div>
                    </span>
                  </div>
                  <div>
                    <span class="flex align-center mrb10">
                      <label>{{__label(MASTERDATA["TOBABDP48"])}}: {{getNameDaiDien()}}</label>
                    </span>
                  </div>
                </div>
                <div>
                  <span class="flex align-center mrb10">
                    <div style="width: 60%;">
                      <label>{{__label(MASTERDATA["TOBABDP37"])}}:</label>
                      <span v-if="MASTERDATA['TOBABDP37'].Items[0].Value" class="mb-5 ml-5">{{MASTERDATA['TOBABDP37'].Items[0].Value}}</span>
                    </div>
                    <div class="mb-5 ml-5" style=" width: 40%; text-align: center; font-size: 14px; display: flex; justify-content: flex-start">{{__t('Chữ ký')}}:</div>
                  </span>
                </div>
                <br/>
                <br/>
              </div>
            </div>
          </div>
          <!-- Ảnh -->
          <div class="mt-10 ml-20 mr-20">
            <div class="pomc-upload-area mb-10" v-if="MASTERDATA['TOBABDP52']">
              <div class="row">
                <div class="col-md-7 col-sm-7" v-if="!isConfirmed">
                  <p><b>{{__t('Upload ảnh')}}:</b></p>
                  <p><button @click="openFile()" class="btn v-white-btn font16 font-bold btn-upload"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('UPLOAD TỪ THIẾT BỊ')}}</button></p>
                  <p>{{__t('Sau khi phiếu có xác nhận/ chữ ký từ người bệnh/ người đại diện. Người dùng chụp ảnh phiếu và tải lên hệ thống')}}</p>
                </div>
                <div class="col-md-5 col-sm-5">
                  <drop-files v-if="dataDropfile" :readonly="isConfirmed" id="mini-upload" v-model="dataPicture" :dataDropfile="dataDropfile"/>
                </div>
              </div>
            </div>
          </div>
          <!-- FloatBlock -->
          <FloatBlock v-if="!viewOnly" :openBack="true" @handleBack="handleBack">
            <template slot="buttons">
              <div class="col-md-2 col-sm-2"><div class="form-group1"></div></div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group1">
                <button
                  class="btn btn-block v-white-btn"
                  type="button"
                  v-shortkey="['ctrl', 'p']"
                  @shortkey="print();"
                  @click="print();"
                >
                  <i class="fa fa-print" aria-hidden="true"></i> {{ __t("In") }}
                </button>
                </div>
              </div>

              <div v-if="!isConfirmed" class="col-md-6 col-sm-6">
                <div class="flex form-group1">
                <button
                  class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
                  type="button"
                  v-shortkey="['ctrl', 's']"
                  @click="handleSubmit();"
                >
                  <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ __t("btn.luu") }}
                </button>
                </div>
              </div>
            </template>
          </FloatBlock>
        </div>
        <div>
          <p class="mt-10">A01_006_080721_V</p>
        </div>
        <div v-if="hiddenLog">
          <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="timeLog" :ad="timeLog[1]" /> {{__t('lúc')}} {{ timeLog[0] }}</p>
        </div>
      </div>
      <!-- sss -->
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>

<script>
import VSelect from '@/components/VSelect.vue'
import $ from 'jquery'
import MixinMasterdata from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import DropFiles from '@/components/DropFiles.vue'
import _ from 'lodash'
import ConsentForTransfusionOfBlood from '@/services/ConsentForTransfusionOfBlood'
import Print from './Print.vue'
import UploadFileService from '@/services/IPD/UploadFileService'
export default {
  name: 'ConsentForTransfusionOfBloodAndBloodDerivedProductsItem',
  mixins: [MixinForm, MixinMasterdata],
  props: ['viewOnly', 'VisitId', 'VisitType'],
  components: {VDateTimePicker, DropFiles, VSelect, Print},
  data () {
    return {
      dataDropfile: {},
      fullNameDoctor: '',
      dataPicture: [],
      dataMaster: {},
      checkEdited: '',
      CreatedBy: '',
      hiddenLog: true,
      timeLog: [],
      userName: '',
      loaded: false,
      nullContent: true,
      IsLocked: false,
      familyList: [],
      DataSubmit: [],
      ICD10: [],
      ICD10Options: [],
      dataICD10: '',
      valueICD10: '',
      BLOODRELATION: [
        {
          value: 'Chồng',
          label: 'Chồng'
        },
        {
          value: 'Mẹ',
          label: 'Mẹ'
        },
        {
          value: 'Bố',
          label: 'Bố'
        },
        {
          value: 'Chị gái',
          label: 'Chị gái'
        },
        {
          value: 'Anh trai',
          label: 'Anh trai'
        },
        {
          value: 'Con gái',
          label: 'Con gái'
        },
        {
          value: 'Con trai',
          label: 'Con trai'
        },
        {
          value: 'Khác',
          label: 'Khác'
        }
      ]
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'A01_006_080721_V'}, () => {
      this.getData()
    })
  },
  watch: {
    MASTERDATA: {
      handler () {
        if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
          this.checkEdited = true
        }
      },
      deep: true
    }
  },
  methods: {
    getChuanDoanVer1 (response) {
      let str = ''
      let str2 = ''
      var res = null
      if (response) {
        res = response
      }
      if (res) {
        // if (res.ChanDoanBenhChinh !== '') {
        if (res.ChanDoanBenhChinh) {
          if (str) {
            str += '/ '
          }
          str += res.ChanDoanBenhChinh
          console.log(str, 'str 1')
        }
        // if (res.ChanDoanBenhKemTheo !== '') {
        if (res.ChanDoanBenhKemTheo) {
          if (str) {
            str += '/ '
          }
          str += res.ChanDoanBenhKemTheo
          console.log(str2, 'str 2')
        }
        if (res.ICD10 && res.ICD10 !== '""' && res.ICD10 !== 'null') {
          var str3 = ''
          console.log(res.ICD10, 'checker')
          let ICD = this.JSONParse(res.ICD10)
          console.log(ICD, 'checkICD')
          ICD.forEach(e => {
            if (str3) {
              str3 += ', '
            }
            str3 += e.code
          })
        }
        if (res.ICDOptions && res.ICDOptions !== '""' && res.ICDOptions !== 'null') {
          var str4 = ''
          let ICDOptions = this.JSONParse(res.ICDOptions || [], true)
          ICDOptions.forEach(e => {
            if (str4) {
              str4 += ', '
            }
            str4 += e.code
          })
        }
        if (str3) {
          str2 += str3
        }
        if (str4) {
          if (str2) {
            str2 += '/ '
          }
          str2 += str4
        }
        if (str2) {
          str += ` (${str2})`
        }
      }
      return str
    },
    getNameDaiDien () {
      let name = ''
      if (this.MASTERDATA['TOBABDP54']) {
        if (this.MASTERDATA['TOBABDP54'].Items[0].Value === 'Khác/ Other') {
          name = this.MASTERDATA['TOBABDP56'].Items[0].Value
        }
        if (this.MASTERDATA['TOBABDP54'].Items[0].Value !== 'Khác/ Other') {
          name = this.MASTERDATA['TOBABDP54'].Items[0].Value
        }
      }
      return this.$t(name)
    },
    checkData () {
      if (this.MASTERDATA['TOBABDP5'].Items[0].Value === false && this.MASTERDATA['TOBABDP5'].Items[2].Value === false) {
        this.MASTERDATA['TOBABDP58'].Items[0].Value = ''
        this.MASTERDATA['TOBABDP54'].Items[0].Value = ''
        this.MASTERDATA['TOBABDP56'].Items[0].Value = ''
      }
      if (this.MASTERDATA['TOBABDP5'].Items[0].Value === true) {
        this.MASTERDATA['TOBABDP58'].Items[0].Value = ''
        this.MASTERDATA['TOBABDP54'].Items[0].Value = ''
        this.MASTERDATA['TOBABDP56'].Items[0].Value = ''
      }
      if (this.MASTERDATA['TOBABDP17'].Items[0].Value === false) {
        this.MASTERDATA['TOBABDP17'].Items[1].Value = ''
      }
      if (this.MASTERDATA['TOBABDP20'].Items[0].Value === false) {
        this.MASTERDATA['TOBABDP20'].Items[1].Value = ''
      }
      if (this.MASTERDATA['TOBABDP39'].Items[0].Value === false) {
        this.MASTERDATA['TOBABDP39'].Items[1].Value = ''
      }
      if (this.MASTERDATA['TOBABDP54'].Items[0].Value !== 'Khác/ Other') {
        this.MASTERDATA['TOBABDP56'].Items[0].Value = ''
      }
    },
    getTimeLog (val1, val2) {
      this.timeLog = [val1, val2]
    },
    setHiddenLog () {
      this.hiddenLog = true
    },
    print () {
      this.$htmlToPaper('printMe', false, 'A01_006_080721_V')
    },
    async getData () {
      if (this._VisitType === 'IPD') {
        await new ConsentForTransfusionOfBlood({}, this._VisitType).find('GetInfo' + '/' + this._VisitId).then(response => {
          this.IsLocked = response
        })
      } else {
        // Nothing
      }
      new ConsentForTransfusionOfBlood({}, this._VisitType).find('A01_006_080721_V' + '/' + this._VisitId).then(response => {
        this.nullContent = false
        this.DataSubmit = response
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: this.DataSubmit.Id || this.DataSubmit.ID
        }
        this.fullNameDoctor = response.FullNameCreatedBy
        this.IsLocked = response.IsFormLocked
        this.CreatedBy = response.CreatedBy
        this.timeLog = [response.UpdatedAt, response.CreatedBy]
        this.$store.dispatch('setCurrentFormId', response.Id)
        this.MASTERDATA['TOBABDP3'].Items[0].Value = response.Specialty.ViName
        this.MASTERDATA['TOBABDP37'].Items[0].Value = response.FullNameCreatedBy
        this.MASTERDATA['TOBABDP27'].Items[0].Value = response.CustomerFullName
        for (let i = 0; i < response.length; i++) {
          if (response[i.Code === 'TOBABDP53']) {
            this.MASTERDATA['TOBABDP52'].Items[0].Value = this.JSONParse(response[i].Value)
          }
        }
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'Checkbox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                  console.log('join')
                } else if (exited.Value && item.Code === 'TOBABDP53') {
                  console.log('join 1')
                  console.log(exited.Value, 'check value receive when upload image')
                  item.Value = (this.JSONParse(exited.Value, true) || [])
                  console.log(item.Value, 'check value')
                } else {
                  item.Value = exited.Value
                }
              } else {
                // Nothing
              }
            })
          }
        }
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        for (let i = 0; i < response.length; i++) {
          if (response[i.Code === 'TOBABDP53']) {
            this.MASTERDATA['TOBABDP52'].Items[0].Value = this.JSONParse(response[i].Value)
          }
        }
        this.dataPicture = this.MASTERDATA['TOBABDP52'].Items[0].Value
        this.loaded = true
      }).catch(e => {
        this.loaded = true
      })
    },
    validateForm () {
      let errors = []
      if (this.MASTERDATA['TOBABDP17'].Items[0].Value && this.MASTERDATA['TOBABDP17'].Items[1].Value === '') {
        errors.push(this.MASTERDATA['TOBABDP17'].Items[1])
      }
      if (this.MASTERDATA['TOBABDP20'].Items[0].Value && this.MASTERDATA['TOBABDP20'].Items[1].Value === '') {
        errors.push(this.MASTERDATA['TOBABDP20'].Items[1])
      }
      if (this.MASTERDATA['TOBABDP39'].Items[0].Value && this.MASTERDATA['TOBABDP39'].Items[1].Value === '') {
        errors.push(this.MASTERDATA['TOBABDP39'].Items[1])
      }
      if (errors.length) {
        console.log('errors: ', errors)
        this.handlerResponse({Error: errors})
      }
    },
    handleSubmit () {
      this.validateForm()
      this.save()
    },
    save () {
      this.checkData()
      var obj = {}
      this.MASTERDATA['TOBABDP52'].Items[0].Value = this.dataPicture
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              console.log('check exited')
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (item.Code === 'TOBABDP53') {
                item.Value = JSON.stringify(item.Value)
              } else {
                item.Value = exited.Value
              }
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      new ConsentForTransfusionOfBlood({}, this._VisitType).update('/' + 'update' + '/' + 'A01_006_080721_V' + '/' + this._VisitId, this.DataSubmit).then(response => {
        console.log(this.DataSubmit, 'data submit')
        this.removedFile()
        this.toastedSuccess()
        this.reload()
      })
    },
    removedFile () {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this.DataSubmit.Id, {Urls: this.dataPicture.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    openFile () {
      $('#dropzone').click()
    },
    create () {
      new ConsentForTransfusionOfBlood({}, this._VisitType).update('/' + 'create' + '/' + 'A01_006_080721_V' + '/' + this._VisitId).then(response => {
        this.getData()
      })
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Thông báo'),
        text: this.$t('Tạo mới Phiếu cam kết truyền máu và các chế phẩm máu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    confirmPopup () {
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
              this.back()
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
    },
    remove (i) {
      this.familyList = this.familyList.filter((_, index) => index !== i)
    },
    handleAddMember () {
      const a = {
        relationship: '',
        other: ''
      }
      this.familyList.push(a)
    }
  },
  computed: {
    isConfirmed: function () {
      // return (
      //   this.viewOnly ||
      //   this.IsLocked ||
      //   this.getCurrentUsername() !== this.CreatedBy
      //   // false
      // )
      return false
    }
  }
}
</script>

<style>
  .ml-18 {
    margin-left: 18px;
  }
  .justify {
    text-align: justify;
  }
</style>
