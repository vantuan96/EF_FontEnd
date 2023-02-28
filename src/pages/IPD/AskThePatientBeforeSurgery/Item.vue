<template>
  <div v-if="loaded">
    <!-- {{NeedNew}} -->
   <div v-if="NeedNew">
      <div class="text-center">
        <NewForm @createForm="createPopup" :IsLocked="IsLocked" :TitleForm="''"/>
        <!-- <p v-if="!IsLocked">{{__t('Chưa có Yêu cầu người bệnh chuẩn bị trước khi phẫu thuật/ thủ thuật')}}</p>
        <div v-else class="null-content">{{__t('AdultVitalSigns.labelNull')}}</div>
        <button class="btn btn-warning" @click="createPopup" v-if="!IsLocked">{{__t('Tạo mới')}}</button> -->
      </div>
    </div>
    <div v-else>
      <!-- body -->
      <div class="box form-content">
        <div class="box-body">
          <p>Đối với tất cả các cuộc phẫu thuật hay thủ thuật (như nội soi đại tràng, dạ dày, soi phế quản,...) được yêu cầu thực hiện gây mê toàn thân hoặc gây tê:</p>
        </div>
      <div class="box-body" style="border: 1px solid black">
        <div class="flex">
          <div><p>Người bệnh cần&nbsp;</p></div>
          <div><p class="text-bold">phải NHỊN ĂN, NHỊN UỐNG:</p></div>
        </div>
        <div><p class="text-bold">- Từ 12 giờ đêm hôm trước, nếu như phẫu thuật vào buổi sáng hoặc</p></div>
        <div><p class="text-bold">- Từ 7h giờ sáng cùng ngày nếu ca phẫu thuật được thực hiện vào buổi chiều.</p></div>
       </div>
       <div class="mt-20"><p class="text-bold">NHỊN ĂN CÓ NGHĨA LÀ:</p></div>
       <div class="row">
        <div class="col-md-5">
            <div class="box-body" style="border: 1px solid black; height:112px; width:250px;">
              <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                  <div><p class="text-bold">- Không ăn</p></div>
                  <div><p class="text-bold">- Không uống</p></div>
                  <div><p class="text-bold">- Không hút thuốc</p></div>
                </div>
                <div class="col-md-2"></div>
              </div>
          </div>
        </div>
        <div class="col-md-2">
          <div></div>
          <div class="text-center" style="margin-top: 26px;"><i style="font-size: 60px;" class="fa fa-arrow-right" aria-hidden="true"></i></div>
          <div></div>
        </div>
        <div class="col-md-5">
          <div class="box-body" style="border: 1px solid black; height:112px;width:250px; float:right">
            <div class="mt-10"><p class="text-bold text-center">KHÔNG CÓ GÌ</p></div>
            <div><p class="text-bold text-center">QUA ĐƯỜNG MIỆNG</p></div>
          </div>
        </div>
       </div>
       <!-- tại -->
       <div class="mt-20"><p class="text-bold">TẠI SAO PHẢI LÀM NHƯ VẬY?</p></div>
       <div><p>- Tất cả các thủ thuật gây mê đều được thực hiện chỉ khi DẠ DÀY RỖNG, vì nếu không dịch và thức ăn sẽ tràn vào phổi - điều này hết sức nguy hiểm.</p></div>
       <div><p>- Nếu như bạn không thực hiện theo đúng quy định trên, cuộc phẫu thuật/ thủ thuật của bạn sẽ bị hủy bỏ.</p></div>
       <div class="mt-20"><p class="text-bold">CHÚ Ý:</p></div>
       <div><p class="text-bold">1. Trước khi nhập viện, người bệnh phải tẩy sạch móng chân, móng tay và không được đeo đồ trang sức.</p></div>
       <div><p class="text-bold">2. Người bệnh nhớ mang theo phim chụp XQ (nếu có) khi đến bệnh viện.</p></div>
       <!-- <div class="flex mt-10">
        <div :class="!isReadOnly ? 'mt-5' : ''"><p>Thời gian:</p></div>
        <div class="ml-5"><VDateTimePicker :readonly="isReadOnly" v-model="inputDate" :format="vDateTimeFormat"/></div>
      </div> -->
      <div class="mt-20">
       <div class="pomc-upload-area mb-10" v-if="!isReadOnly">
          <div class="row">
            <div class="col-md-7 col-sm-7">
              <p><b>{{__t('Upload ảnh')}}:</b></p>
              <p><button @click="openFile()" class="btn v-white-btn font16 font-bold btn-upload"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('UPLOAD TỪ THIẾT BỊ')}}</button></p>
              <!-- <p>{{__t('Sau khi phiếu có xác nhận/ chữ ký từ người bệnh/ người đại diện. Người dùng chụp ảnh phiếu và tải lên hệ thống.')}}</p> -->
            </div>
            <div class="col-md-5 col-sm-5">
              <drop-files @input="getFileData" :readonly="isReadOnly" id="mini-upload" v-model="dataFile" :dataDropfile="dataDropfile"/>
            </div>
          </div>
        </div>
        <div v-else>
          <drop-files :readonly="true" id="mini-upload" v-model="dataFile"/>
        </div>
        </div>
      </div>
      <p class="mt-10">A02_052_050919_V</p>
      <!-- {{data}} -->
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="data.UpdatedBy" :ad="data.UpdatedBy" /> {{__t('lúc')}} {{ data.UpdatedAt }}</p>
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
            <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSave"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
    </div>
    <print
    :itemDate="itemDate"
     :DataSubmit="data"
     :createdAtProp="createdAtProp"
     hidden
    />
  </div>
</template>

<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
// import moment from 'moment'
import AskThePatientBeforeSurgeryService from '@/services/IPD/AskThePatientBeforeSurgeryService'
import DoctorConfirm from './popup/DoctorConfirm.vue'
// import _ from 'lodash'
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
      fileLength: 0,
      fileLength1: 0,
      dataFileTest: ['/UploadFiles/Images/Temp/16-09-2022/a1649ffc-9498-4120-9ae7-97e79201d277.PNG'],
      data: null,
      NeedNew: false,
      IsLocked: false,
      loaded: false,
      responseList: [],
      formCode: 'A02_052_050919_V',
      IdForm: '',
      dataFile: [],
      itemDate: null,
      isEdit: false,
      createdAtProp: ''
    }
  },
  watch: {
    Data: function (val) {
      this.checkEdited = true
    }
    // 'checkPatient': function (val) {
    //   console.log('checkPatient', this.checkPatient)
    // },
    // 'checkFamily': function (val) {
    //   console.log('checkFamily', this.checkFamily)
    // }
  },
  mounted () {
    this.getList()
  },
  computed: {
    isReadOnly: function () {
      return this.viewOnly || this.IsLocked
      // return true
    }
    //  || this.$store.state.account.Username !== this.data.CreatedBy
    // isReadOnly: function () {
    //   return this.viewOnly || this.IsLocked || this.DataSubmit.UserConfirm.UserName || this.IsLockedUser
    // }
  },
  methods: {
    getFileData (data) {
      this.fileLength1 = data.length
      console.log('data', data.length)
    },
    getList () {
      new AskThePatientBeforeSurgeryService().find('GetList/IPD/' + this.formCode + '/' + this._VisitId).then(response => {
        if (response.Datas && response.Datas.length > 0) {
          this.getDetail(response.Datas[0].Id)
          this.IdForm = response.Datas[0].Id
        } else {
          this.NeedNew = response.FORM_NOT_FOUND.NeedNew
        }
      }).catch(err => {
        this.loaded = true
        this.NeedNew = err.data.FORM_NOT_FOUND.NeedNew
        this.IsLocked = err.data.IsLock24h
      })
    },
    getDetail (id) {
      this.NeedNew = false
      this.loaded = true
      new AskThePatientBeforeSurgeryService().find('GetDetail/IPD/' + this.formCode + '/' + this._VisitId + '/' + id).then(response => {
        this.data = response.data
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: response.data.Id || response.data.ID
        }
        this.createdAtProp = response.data.CreatedAt
        this.IsLocked = response.IsLock24h
        if (response.data.Datas.length > 0) {
          const File = response.data.Datas.filter(i => i.Code === 'FILE')
          if (File.length > 0) {
            this.dataFile = this.JSONParse(File[0].Value)
          }
        }
        this.fileLength = this.dataFile.length
        this.fileLength1 = this.dataFile.length
      }).catch(err => {
        console.log(err)
      })
    },
    handleSave () {
      const link = {
        Code: 'FILE',
        Value: this.dataFile
      }
      // const data1 = this.data.Datas.filter(i => i.Code === 'DATE')
      // if (data1.length === 0) {
      //   this.data.Datas.push(date)
      // } else {
      //   this.data.Datas[0].Value = this.inputDate
      // }
      const data2 = this.data.Datas.filter(i => i.Code === 'FILE')
      if (data2.length === 0) {
        this.data.Datas.push(link)
      } else {
        this.data.Datas[0].Value = this.dataFile
      }
      // if (this.fileLength !== this.dataFile.length) {
      //   this.isEdit = true
      // } else {
      //   this.isEdit = false
      // }
      this.fileLength1 = this.dataFile.length
      var arr = this.dataFile ? this.dataFile : []
      new AskThePatientBeforeSurgeryService().update('UpdateForm/IPD/' + this.formCode + '/' + this._VisitId + '/' + this.IdForm, this.data).then(response => {
        // this.loaded = false
        this.isEdit = false
        console.log('data-file-length', this.data.Datas.filter(i => i.Code === 'FILE'))
        this.toastedSuccess()
        this.removedFile(arr)
        this.getList()
        // this.reload()
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this.data.Id, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    handleCreate () {
      new AskThePatientBeforeSurgeryService().update('CreateForm/IPD/' + this.formCode + '/' + this._VisitId).then(response => {
        // this.getDetail(response.Id)
        this.reload()
        this.IdForm = response.Id
      }).catch(err => {
        console.log(err)
      })
    },
    print () {
      this.$htmlToPaper('printMe', false, 'A02_052_050919_V')
    },
    openFile () {
      $('#dropzone').click()
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Bạn có chắc chắn tạo Yêu cầu người bệnh chuẩn bị trước khi phẫu thuật/ thủ thuật?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.handleCreate()
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
    // getDataInfo () {
    //   new ResuscitationService({}, this.Type).find('GetInfo/' + this._VisitId).then(response => {
    //     this.IsLocked = response
    //   })
    // },
    getData () {
      // this.checkEdited = false
      // this.hasData = false
      // new ResuscitationService({}, this.Type).find('Detailt/' + this._VisitId).then(response => {
      //   this.data = response
      //   if (response.IsCustormer === 'False') {
      //     this.DataRadio1.Items[0].Value = true
      //   } else if (response.IsCustormer === 'True') {
      //     this.DataRadio1.Items[1].Value = true
      //   } else {
      //     this.DataRadio1.Items[0].Value = false
      //     this.DataRadio1.Items[1].Value = false
      //   }
      //   this.mapData()
      //   this.loaded = true
      //   this.IsLocked = response.IsLocked
      //   this.data.Picture = this.JSONParse(response.Picture)
      //   if (this.data.Picture1) {
      //     this.data.Picture1 = this.JSONParse(response.Picture1)
      //   }
      //   this.dataFirst = JSON.stringify(response)
      //   this.$store.dispatch('setCurrentFormId', response.Id)
      // }).catch(e => {
      //   if (this.Type === 'IPD') {
      //     this.NeedNew = e.data.FORM_NOT_FOUND.NeedNew
      //     if (e.data.IsLocked) {
      //       this.IsLocked = e.data.IsLocked
      //     }
      //   } else {
      //     this.NeedNew = e.data.NeedNew
      //   }
      //   this.loaded = true
      // })
    },
    handleBack () {
      console.log('length', this.fileLength, this.fileLength1)
      if (this.fileLength !== this.fileLength1) {
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
