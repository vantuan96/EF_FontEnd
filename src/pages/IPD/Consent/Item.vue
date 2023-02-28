<template>
  <div v-if="loaded">
   <div v-if="NeedNew">
      <div class="text-center">
        <NewForm @createForm="createPopup" :IsLocked="IsLocked" :TitleForm="'Yêu cầu không hồi sinh tim phổi'"/>
        <!-- <p v-if="!IsLocked">{{__t('Chưa có yêu cầu không hồi sinh tim phổi')}}</p>
        <div v-else class="null-content">{{__t('AdultVitalSigns.labelNull')}}</div>
        <button class="btn btn-warning" @click="createPopup" v-if="!IsLocked">{{__t('Tạo mới')}}</button> -->
      </div>
    </div>
    <div v-else>
      <h3 v-if="!NeedNew" class="text-center cap fw600" style="font-size:30px">{{__t('Yêu cầu không hồi sinh tim phổi')}}</h3>
      <div class="box form-content">
      <div class="box-body">
        <div class="flex mt-10">
        <div><p>{{__t('Khoa ')}}:</p></div>
        <div class="ml-5">{{data.Specialty.ViName}}</div>
        </div>
        <div class="flex">
          <div><p>{{__t('Chẩn đoán')}}:</p></div>
        <div class="ml-5">{{data.Diagnosis}}</div>
        </div>
        <div class="flex">
          <div><p class="font16 font-bold" style="float:left;">{{__t('I. DÀNH CHO NGƯỜI BỆNH, THÂN NHÂN')}}</p></div>
        </div>
        <!-- <div>
            <MDRadio
            @onChange="handleChange()"
            v-model="DataRadio1"
           />
          </div> -->
        <!-- radio -->
        <div class="d-flex flex-center mb-10">
        <div class="text-center group-radio" v-if="!isReadOnly">
          <!-- <MDRadio
            @onChange="handleChange(DataRadio1)"
            v-model="DataRadio1"
           /> -->
           <MdRadiosInput4
            @change="handlechangeRadio"
            :songngu="false"
            v-model="DataRadio1"
          />
          <!-- <input type="radio" :style="isReadOnly ? 'POINTER-EVENTS: none;' : ''" id="item_01" @click="clickRadio('checkPatient', checkPatient)" name="status" value="False" v-model="data.IsCustormer">
          <label class="no-margin mr-5" for="item_01" v-html="$t('Người bệnh/ Patient')"></label>
          <input :style="isReadOnly ? 'POINTER-EVENTS: none;' : ''" type="radio" id="item_02" @click="clickRadio('checkFamily', checkFamily)" name="status" value="True" v-model="data.IsCustormer">
          <label class="no-margin" for="item_02" v-html="$t('Người nhà của người bệnh/ Family member of patient')"></label> -->
        </div>
        <div class="text-center group-radio" v-else>
          <!-- <b style="border: 1px solid #ccc;
            padding: 5px 10p
            border-radius: 18px;
            margin: 0 5px;
            background: #facc45;
            display: inline-block;width: auto;" :data="data.IsCustormer" v-if="data.IsCustormer && data.IsCustormer === 'False'">
            <span v-html="$t('Người bệnh/ Patient')"></span>
          </b>
          <b style="border: 1px solid #ccc;
            padding: 5px 10px;
            border-radius: 18px;
            margin: 0 5px;
            background: #facc45;
            display: inline-block;width: auto;" :data="data.IsCustormer" v-if="data.IsCustormer && data.IsCustormer === 'True'">
            <span v-html="$t('Người nhà của người bệnh/ Family member of patient')"></span>
          </b> -->
          <MdRadiosInput4
            :readonly="true"
            :songngu="false"
            v-model="DataRadio1"
          />
        </div>
      </div>
      <div v-if="data.IsCustormer === 'False'">
        <div class="flex">
          <div><p>{{__t('Tên tôi là')}}</p></div>
          <div class="ml-5">{{data.Custormer}}, </div>
         <div class="ml-5"><p>{{__t('là người bệnh')}}</p></div>
        </div>
        <div><p style="word-break:break-word">{{__t('Tôi đã được nghe bác sĩ điều trị giải thích và tôi hoàn toàn hiểu về tình trạng bệnh của tôi. Trong tình trạng tinh thần tỉnh táo và minh mẫn, tôi xác nhận việc từ chối thực hiện hồi sinh tim phổi cho tôi khi tình trạng bệnh của tôi đặt ra yêu cầu đó')}}</p></div>
      </div>
      <div v-if="data.IsCustormer === 'True'" class="mt-10">
        <div class="flex">
          <div class="mt-10"><p>{{__t('Tên tôi là')}}:</p></div>
          <div class="ml-5" v-if="!isReadOnly"><textarea-autosize  class="form-control w300" rows="1" :placeholder="__t('Nhập')" v-model="data.NameOfFamily"/></div>
           <div v-else class="ml-5 mr-5 mt-10">{{data.NameOfFamily}}</div>
           <div class="mt-10 mr-5"><p>{{__t('là người nhà của người bệnh')}}</p> </div>
           <div class="mt-10 mr-5">{{data.Custormer}}</div>
        </div>
        <p></p>
        <p style="word-break:break-word">{{__t('Tôi đã được nghe bác sĩ điều trị giải thích và tôi hoàn toàn hiểu về tình trạng bệnh người thân của tôi. Trong tình trạng tinh thần tỉnh táo và minh mẫn, tôi xác nhận việc từ chối thực hiện hồi sinh tim phổi cho người thân của tôi khi tình trạng bệnh người thân của tôi đặt ra yêu cầu đó')}}</p>
      </div>
      <!-- thời gian -->
      <div class="flex">
        <div :class="!isReadOnly ? 'mr-5 mt-10' : 'mt-10'"><p>{{__t('Thời gian')}}:</p></div>
        <div v-if="!isReadOnly"><VDateTimePicker v-model="data.DateTimeOfPatient" :format="vDateTimeFormat"/></div>
        <div v-else><FakeInput v-model="data.DateTimeOfPatient"/></div>
      </div>
      <div class="flex mt-10">
        <div><p>{{__t('Họ và tên')}}:</p></div>
        <div class="ml-5">{{data.IsCustormer === 'False' ? $store.state.account.CurrentPatientObj.Fullname : data.NameOfFamily}}</div>
        <p style="margin-left:100px">{{__t('Chữ ký')}}:</p>
      </div>
      <!-- <p class="mt-10">Họ và tên/ Full name: {{data.IsCustormer === 'false' ? $store.state.account.CurrentPatientObj.Fullname : data.NameOfFamily}}</p> -->
      <!-- <p class="mt-10">Chữ ký/ Signature:..........</p> -->
      <p class="font16 font-bold mt-20">{{__t('II. DÀNH CHO BÁC SĨ ĐIỀU TRỊ')}}</p>
      <div class="flex">
        <div><p>{{__t('Tên tôi là')}}:</p></div>
        <div class="ml-5">{{data.FullNameDoctor}}, </div>
        <div class="ml-5"><p>{{__t('là bác sĩ điều trị của người bệnh')}}</p></div>
        <div class="ml-5">{{data.Custormer}}</div>
      </div>
      <!-- <p>Tên tôi là/ My name is: {{data.FullNameDoctor}}, là bác sĩ điều trị của người bệnh/ is attending physician for patient: {{data.Custormer}}</p> -->
      <div v-if="data.IsCustormer === 'False'">
        <p v-if="locale === 'vi'">Tôi xác nhận rằng người bệnh {{data.Custormer}}, trong tình trạng tinh thần tỉnh táo và minh mẫn đã yêu cầu không thực hiện hồi sinh tim phổi cho người bệnh nếu tình trạng bệnh của người bệnh đặt ra yêu cầu đó. Tôi, thay mặt bệnh viện, xác nhận yêu cầu của người bệnh và tôn trọng quyết định đó của người bệnh.
        </p>
       <p v-else>I hereby certify, based on clear and convincing evidence presented to me, that patient is in mentally healthy condition and request in the event of cardiac or respiratory arrest, no resuscitation will be initiated.</p>
      </div>
      <div v-if="data.IsCustormer === 'True'">
        <p v-if="locale === 'vi'">Tôi xác nhận rằng người nhà của người bệnh {{ data.NameOfFamily}}, trong tình trạng tinh thần tỉnh táo và minh mẫn đã yêu cầu không thực hiện hồi sinh tim phổi cho người bệnh nếu tình trạng bệnh của người bệnh đặt ra yêu cầu đó. Tôi, thay mặt bệnh viện, xác nhận yêu cầu của người bệnh và tôn trọng quyết định đó của người nhà của người bệnh.
        </p>
       <p v-else>I hereby certify, based on clear and convincing evidence presented to me, that patient’s family member is in mentally healthy condition and request in the event of cardiac or respiratory arrest, no resuscitation will be initiated.</p>
      </div>
      <div class="flex">
        <div :class="!isReadOnly ? 'mr-5 mt-10' : 'mt-10'"><p>{{__t('Thời gian')}}:</p></div>
        <div v-if="!isReadOnly"><VDateTimePicker v-model="data.DateTimeOfPhysician" :format="vDateTimeFormat"/></div>
        <div v-else><FakeInput v-model="data.DateTimeOfPhysician"/></div>
      </div>
      <div class="flex mt-10">
        <div><p>{{__t('Họ và tên')}}:</p></div>
        <div class="ml-5">{{data.FullNameDoctor}}</div>
        <p style="margin-left:100px">{{__t('Chữ ký')}}:</p>
      </div>
      <!-- <p v-html="$t('Chữ ký/ Signature')"></p> -->
      <!-- upload -->
      <div class="mt-20">
       <div class="pomc-upload-area mb-10">
          <div class="row">
            <div class="col-md-7 col-sm-7" v-if="!isReadOnly">
              <p><b>{{__t('Upload ảnh')}}:</b></p>
              <p><button @click="openFile()" class="btn v-white-btn font16 font-bold btn-upload"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('UPLOAD TỪ THIẾT BỊ')}}</button></p>
              <p>{{__t('Sau khi phiếu có xác nhận/ chữ ký từ người bệnh/ người đại diện. Người dùng chụp ảnh phiếu và tải lên hệ thống.')}}</p>
            </div>
            <div class="col-md-5 col-sm-5">
              <drop-files :readonly="isReadOnly" id="mini-upload" v-model="data.Picture" :dataDropfile="dataDropfile"/>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
      <p class="mt-10">A01_032_050919_VE</p>
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="data.UpdatedBy" :ad="data.UpdatedBy" /> {{__t('lúc')}} {{ data.UpdatedAt | formatDateHourMinutesDDMMYYY }}</p>
      <FloatBlock @handleBack='handleBack()' :openBack="true" v-if="!viewOnly">
      <template slot='buttons'>
        <div class="col-md-2 col-sm-2">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-4 col-sm-4">
          <div class="form-group1">
            <button
              class="btn btn-block v-white-btn"
              type="button"
              v-shortkey="['ctrl', 'p']"
              @shortkey="print();"
              @click="print();"
              >
              <i class="fa fa-print" aria-hidden="true"></i>
              {{ __t("In") }}
              </button>
          </div>
        </div>
        <div class="col-md-6 col-sm-6" v-if="!isReadOnly">
          <div class="form-group1">
            <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
      <!-- <div v-if="!viewOnly" class="status-float-block">
        <div class="action-btn-block">
        <div class="container">
          <div class="content-container">
          <div class="row">
            <div class="col-md-2">
            <div class="form-group1">
              <button
              class="btn btn-block v-white-btn"
              type="button"
              @click="handleBack();"
              >
              <i class="fa fa-angle-double-left" aria-hidden="true"></i>
              {{ __t("Quay lại") }}
              </button>
            </div>
            </div>
            <div class="col-md-4">
            <div class="form-group1" v-if="!viewOnly">
              <button
              class="btn btn-block v-white-btn"
              type="button"
              v-shortkey="['ctrl', 'p']"
              @shortkey="print();"
              @click="print();"
              >
              <i class="fa fa-print" aria-hidden="true"></i>
              {{ __t("In") }}
              </button>
            </div>
            </div>
            <div class="col-md-6">
            <div class="form-group1" v-if="!isReadOnly && hasRole(roleSubmit)">
              <button
              class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
              v-shortkey="['ctrl', 's']"
              @shortkey="handleSubmit();"
              type="button"
              @click="handleSubmit();"
              >
              <i class="fa fa-floppy-o" aria-hidden="true"></i>
              {{ __t("btn.luu") }}
              </button>
            </div>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div> -->
    </div>
    <print
      :DataSubmit="data"
      hidden
    />
  </div>
</template>

<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
// import moment from 'moment'
import ResuscitationService from '@/services/OPD/ResuscitationService'
import DoctorConfirm from './popup/DoctorConfirm.vue'
import _ from 'lodash'
import DropFiles from '@/components/DropFiles.vue'
import DropFilesNew from '@/components/DropFilesNew.vue'
import $ from 'jquery'
import Print from './Print.vue'
import UploadFileService from '@/services/IPD/UploadFileService'

export default {
  props: ['viewOnly', 'VisitId', 'VisitType', 'checkType'],
  mixins: [MixinForm, MixinMasterData],
  components: {
    VDateTimePicker,
    DoctorConfirm,
    DropFiles,
    DropFilesNew,
    Print
  },
  data () {
    return {
      dataDropfile: {},
      data: null,
      NeedNew: false,
      Type: 'IPD',
      DataSubmit: {},
      checkEdited: false,
      CreatedAt: '',
      CreatedBy: '',
      MASTERDATA: {},
      dataMaster: {},
      popupTitle: '',
      TypeConfirm: '',
      DataType: 'Radio',
      IsLocked: false,
      loaded: false,
      count1: 0,
      count2: 0,
      BathingPoint: 0,
      WalkingPoint: 0,
      JoggingPoint: 0,
      totalPoint1: 'N/A',
      totalPoint2: 'N/A',
      totalPoint3: 'N/A',
      totalPoint4: 'N/A',
      totalPoint5: 'N/A',
      point1: 0,
      point2: 0,
      point3: 0,
      point4: 0,
      HobbiesPoint: 0,
      WorkingPoint: 0,
      VisitingPoint: 0,
      point31: 0,
      point32: 0,
      point41: 0,
      point42: 0,
      point43: 0,
      point44: 0,
      roleConfirm: '',
      roleSubmit: '',
      roleCreate: '',
      checkResult: false,
      IsLockedUser: false,
      messageWarning1: '',
      messageWarning2: '',
      messageWarning3: '',
      // new
      isCreate: false,
      checkRadio: '',
      myName: 'thanhnt135',
      dateTinePick: null,
      dateTinePick1: null,
      upload1: null,
      upload2: null,
      upload3: null,
      upload4: null,
      dataFile1: '',
      dataFile2: '',
      uploadData: {
        ViName: 'UploadFile',
        EnName: 'UploadFile',
        Code: 'IPDIAACINUPLOADCD1',
        Group: 'IPDIAACINUPLOAD',
        Order: '826',
        DataType: 'Text',
        Level: 2,
        IsReadOnly: false,
        Note: '',
        Data: '',
        Clinic: '',
        Value: '',
        Id: '',
        DefaultValue: null,
        Items: []
      },
      tabActive: 'tab2',
      checkPatient: false,
      checkFamily: false,
      dataFirst: null,
      DataRadio1: {
        Clinic: '',
        Code: 'IPDIAAUINRF',
        Data: '',
        DataType: '',
        EnName: 'Information received from',
        Group: 'IPDIAAU',
        Items: [
          {
            ViName: 'Người bệnh',
            EnName: 'Patient',
            Code: 'IPDIAAUINRFPAT',
            Group: 'IPDIAAUINRF',
            Order: 16,
            DataType: 'Radio',
            Level: 2,
            IsReadOnly: false,
            Note: '',
            Data: '',
            Clinic: '',
            Value: '',
            Id: '',
            DefaultValue: null,
            Items: []
          },
          {
            ViName: 'Người nhà của người bệnh',
            EnName: 'Family member of patient',
            Code: 'IPDIAAUINRFOTH',
            Group: 'IPDIAAUINRF',
            Order: 17,
            DataType: 'Radio',
            Level: 2,
            IsReadOnly: false,
            Note: '',
            Data: '',
            Clinic: '',
            Value: '',
            Id: '',
            DefaultValue: null,
            Items: []
          }
        ],
        Level: 1,
        Note: '',
        Order: 15,
        ViName: 'Người khai thông tin',
        locale: 'vi'
      }
    }
  },
  watch: {
    Data: function (val) {
      this.checkEdited = true
    },
    DataRadio1: function (val) {
      console.log('watch')
    }
    // 'checkPatient': function (val) {
    //   console.log('checkPatient', this.checkPatient)
    // },
    // 'checkFamily': function (val) {
    //   console.log('checkFamily', this.checkFamily)
    // }
  },
  mounted () {
    if (this.VisitType) {
      this.Type = this.VisitType
    } else {
      var VisitTypeGroupCode = this.$router.currentRoute.matched.find(m => m.meta.VisitTypeGroupCode)
      this.Type = VisitTypeGroupCode.meta.VisitTypeGroupCode
    }
    this.locale = this.$i18n.locale
    this.getData()
    this.roleCreate = this.Type === 'IPD' ? 'IPDCREATEKHSTP' : 'EDCREATEKHSTP'
    this.roleSubmit = this.Type === 'IPD' ? 'IPDUPDATEKHSTP' : 'EDUPDATEKHSTP'
    // this.getMasterDatas({Form: 'PROMFHF'}, () => {
    //   this.getData()
    //   this.getDataInfo()
    // })
  },
  computed: {
    isReadOnly: function () {
      return this.viewOnly || this.IsLocked || this.$store.state.account.Username !== this.data.CreatedBy
      // return false
    }
    //  || this.$store.state.account.Username !== this.data.CreatedBy
    // isReadOnly: function () {
    //   return this.viewOnly || this.IsLocked || this.DataSubmit.UserConfirm.UserName || this.IsLockedUser
    // }
  },
  methods: {
    handlechangeRadio () {
      this.locale = this.$i18n.locale
      if (this.DataRadio1.Items[0].Value === false && this.DataRadio1.Items[1].Value === false) {
        this.data.IsCustormer = null
      } else if (this.DataRadio1.Items[0].Value === true) {
        this.data.IsCustormer = 'False'
      } else if (this.DataRadio1.Items[1].Value === true) {
        this.data.IsCustormer = 'True'
      }
    },
    handleChange (val) {
      if (val.Items[0].Value && val.Items[0].Value === true) {
        console.log('người bệnh k')
      } else {
        console.log('người bệnh co')
      }
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
    print () {
      this.$htmlToPaper('printMe', false, 'A01_032_050919_VE')
    },
    openFile () {
      $('#dropzone').click()
    },
    openFile2 () {
      $('#dropzone').click()
    },
    clickRadio (code, value) {
      // this.data.NameOfFamily = ''
      // this.data.IsCustormer = null
    },
    removedFile () {
      var arr = this.data.Picture ? this.data.Picture : []
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this.data.Id, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    handleSubmit () {
      // this.data.Picture = JSON.stringify(this.data.Picture)
      // if ()
      if (this.DataRadio1.Items[1].Value === false) {
        this.data.NameOfFamily = ''
      }
      this.checkEdited = false
      new ResuscitationService({}, this.Type).update('/Update/' + this._VisitId, this.data).then(response => {
        this.loaded = false
        this.removedFile()
        setTimeout(() => {
          this.toastedSuccess()
          this.loaded = true
        }, 300)
        this.reload()
        // setTimeout(() => {
        //   this.getData()
        // }, 500)
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    async confirm (data) {
      if (this.checkEdited) {
        await this.handleSubmit()
      }
      new ResuscitationService({}, this.Type).update('/Confirm/' + this._VisitId, data).then(response => {
        this.$modal.hide('doctorConfirm')
        this.loaded = false
        this.getData()
        setTimeout(() => {
          this.toastedSuccess(this.$t('Xác nhận thành công'))
          this.loaded = true
        }, 300)
        this.reload()
      }).catch(e => {
        this.$modal.hide('doctorConfirm')
      })
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Bạn có chắc chắn tạo Yêu cầu không hồi sinh tim phổi'),
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
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    create () {
      new ResuscitationService({}, this.Type).update('/Create/' + this._VisitId, {}).then(response => {
        this.reload()
      })
    },
    // getDataInfo () {
    //   new ResuscitationService({}, this.Type).find('GetInfo/' + this._VisitId).then(response => {
    //     this.IsLocked = response
    //   })
    // },
    getData () {
      this.checkEdited = false
      this.hasData = false
      new ResuscitationService({}, this.Type).find('Detailt/' + this._VisitId).then(response => {
        this.data = response
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: response.Id || response.ID
        }
        console.log('yckhstp', response, this.dataDropfile)
        if (response.IsCustormer === 'False') {
          this.DataRadio1.Items[0].Value = true
        } else if (response.IsCustormer === 'True') {
          this.DataRadio1.Items[1].Value = true
        } else {
          this.DataRadio1.Items[0].Value = false
          this.DataRadio1.Items[1].Value = false
        }
        this.mapData()
        this.loaded = true
        this.IsLocked = response.IsLocked
        console.log('chua parse', response.Picture)
        this.data.Picture = this.JSONParse(response.Picture)
        console.log('sau parse', this.data.Picture)
        if (this.data.Picture1) {
          this.data.Picture1 = this.JSONParse(response.Picture1)
        }
        this.dataFirst = JSON.stringify(response)
        this.$store.dispatch('setCurrentFormId', response.Id)
      }).catch(e => {
        if (this.Type === 'IPD') {
          this.NeedNew = e.data.FORM_NOT_FOUND.NeedNew
          if (e.data.IsLocked) {
            this.IsLocked = e.data.IsLocked
          }
        } else {
          this.NeedNew = e.data.NeedNew
        }
        this.loaded = true
      })
    },
    sendSumaryData () {
      if (this.MASTERDATA['PROMFHFDATA']) {
        this.MASTERDATA['PROMFHFDATA'].Items[0].Value = JSON.stringify({
          ViTitle: 'Điểm đánh giá khả năng hạn chế thể lực (KCCQ12-PL)',
          EnTitle: 'Physical Limitation Score (KCCQ12-PL)',
          Point: this.totalPoint1 ? this.totalPoint1.toString() : '',
          Summary: '',
          Order: 3
        })
        this.MASTERDATA['PROMFHFDATA'].Items[1].Value = JSON.stringify({
          ViTitle: 'Điểm đánh giá tần suất xuất hiện triệu chứng (KCCQ12-SF)',
          EnTitle: 'Symptom Frequency Score (KCCQ12-SF)',
          Point: this.totalPoint4 ? this.totalPoint4.toString() : '',
          Summary: this.messageWarning1,
          Order: 1
        })
        this.MASTERDATA['PROMFHFDATA'].Items[2].Value = JSON.stringify({
          ViTitle: 'Điểm đánh giá Chất lượng sống (KCCQ12-QL)',
          EnTitle: 'Quality of Life Score (KCCQ12-QL)',
          Point: this.totalPoint3 ? this.totalPoint3.toString() : '',
          Summary: this.messageWarning2,
          Order: 2
        })
        this.MASTERDATA['PROMFHFDATA'].Items[3].Value = JSON.stringify({
          ViTitle: 'Điểm đánh giá hạn chế về mặt xã hội (KCCQ12-SL)',
          EnTitle: 'Social Limitation Score (KCCQ12-SL)',
          Point: this.totalPoint2 ? this.totalPoint2.toString() : '',
          Summary: this.messageWarning3,
          Order: 4
        })
        this.MASTERDATA['PROMFHFDATA'].Items[4].Value = JSON.stringify({
          ViTitle: 'Tổng điểm chất lượng cuộc sống - KCCQ12',
          EnTitle: 'Summary Score (KCCQ12)',
          Point: this.totalPoint5 ? this.totalPoint5.toString() : '',
          Summary: '',
          Order: 5
        })
      }
      let ViName = ''
      // eslint-disable-next-line no-unused-vars
      let EnName = ''
      if (this.point4 < 50) {
        ViName = 'BS cần điều chỉnh liều lợi tiểu và đánh giá nguyên nhân gây nguy cơ suy tim mất bù nếu có'
        EnName = 'Physician need adjust the diuretic dose and assess the risks for decompensated heart failure, if having'
      }
      if (this.point3 < 50) {
        ViName = ViName ? ViName + ' - BS cần xem xét lại tất cả các nguyên nhân thực tế có thể cải thiện được để điều chỉnh ngay. Tư vấn khám Bs Tâm lý/ tâm thần' : ViName + 'BS cần xem xét lại tất cả các nguyên nhân thực tế có thể cải thiện được để điều chỉnh ngay. Tư vấn khám Bs Tâm lý/ tâm thần'
        EnName = EnName ? EnName + ' - Review all improveable causes for immediate correction. Counseling and examination of psychiatrist' : EnName + 'Review all improveable causes for immediate correction. Counseling and examination of psychiatrist'
      }
      if (this.point1 < 50 && this.point2 < 50) {
        ViName = ViName ? ViName + ' - BS xem xét lại tất cả các nguyên nhân thực thể có thể cải thiện được để điều chỉnh ngay. Tư vấn khám Phục hồi chức năng, Khám Tâm lý/ tâm thần' : ViName + 'BS xem xét lại tất cả các nguyên nhân thực thể có thể cải thiện được để điều chỉnh ngay. Tư vấn khám Phục hồi chức năng, Khám Tâm lý/ tâm thần'
        EnName = EnName ? EnName + ' - Review all improvable causes for immediate correction. Counseling and examination of psychiatrist /rehabilitation' : EnName + 'Review all improvable causes for immediate correction. Counseling and examination of psychiatrist /rehabilitation'
      }
      if (this.point4 >= 50 && this.point3 >= 50 && this.point1 >= 50 && this.point2 >= 50) {
        ViName = ViName ? ViName + ' - Kết quả bình thường' : ViName + 'Kết quả bình thường'
        EnName = EnName ? EnName + ' - Normal' : EnName + 'Normal'
      }
      this.MASTERDATA['PROMFHFDATA'].Items[5].Value = JSON.stringify({
        ViTitle: 'Đề xuất hành động BS cần can thiệp',
        EnTitle: 'Suggestion for physicians/nurses according the Summary score KCCQ12',
        Point: '',
        Summary: ViName
      })
    },
    handleBack () {
      console.log('dataFirst', this.dataFirst)
      console.log('data', JSON.stringify(this.data))
      if (this.dataFirst !== JSON.stringify(this.data)) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    // popup canh bao
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
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

<style lang="stylus" scoped>

</style>
