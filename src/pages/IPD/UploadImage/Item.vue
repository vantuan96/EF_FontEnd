<template>
  <div v-if="loaded">
    <div class="box form-content">
      <div class="flex align-center mrb10" v-if="!viewOnly">
          <div class="white-space mrr5">
            {{__t('Từ ngày')}}:
          </div>
          <div class="mrr10" style="width: 177px;">
            <v-date-time-picker :format="vDateTimeFormat" v-model="query.FromDate"/>
          </div>
          <div class="white-space mrr5">
            {{__t('Đến ngày')}}:
          </div>
          <div class="mrr10" style="width: 177px;">
            <v-date-time-picker :format="vDateTimeFormat"  v-model="query.ToDate"/>
          </div>
          <div class="white-space mrr5">
            {{__t('Staff name')}}:
          </div>
          <div class="mrr10">
            <user-ad
            v-model="query.username"
            ref="userAd"
            :placeholder="__t('Điều dưỡng/ Bác sĩ')"
          />
          </div>
          <button class="mrl10 btn v-yellow-btn mrr5"  @click="handleFilter();" type="button">{{__t('home.loc')}}</button>
          <button class="btn btn-default" type="button" @click="clearFilter();">{{__t('home.reset')}}</button>
        </div>
      <!-- filter -->
    <div v-if="!viewOnly" class="row container mt-10" style="width: 100%; display: flex; margin-left: -10px">
   </div>
   <div class="flex mt-10" v-if="!viewOnly">
    <div class="white-space mrr5" style="margin-top:15px;">
      {{__t('Tiêu đề')}}:
    </div>
    <div><textarea-autosize
      class="form-control mrb10 mrt10 w400"
      style="width: 300px"
      rows="1"
      :placeholder="__t('Nhập tiêu đề để tìm kiếm')"
      v-model="query.Title"
    /></div>
   </div>
   <!-- tablle -->
   <table class="standing-order-tbl mt-10">
   <tr>
    <th width="1" class="text-center">{{ __t("women.stt") }}</th>
    <th class="text-center">{{ __t("Tiêu đề") }}</th>
    <th class="text-center">{{ __t("Nội dung") }}</th>
    <th class="text-center">{{ __t("Staff name") }}</th>
    <th width="1" class="no-wrap">{{ __t("women.detail") }}</th>
   </tr>
   <template v-for="(item, index) in tableData">
    <tr :key="index + '-root-tr'" :class="{ 'view-full': item.view }">
     <td class="text-center">{{ query.PageNumber * 30 - 30 +  index + 1 }}</td>
     <td>
      <p>{{item.IsCheckFile ? __label(item) : item.Title || ''}}</p>
    </td>
    <td v-if="item.IsCheckFile">
      <p>{{ __t("Hình ảnh được lấy từ biểu mẫu") }} {{__label(item)}}</p>
    </td>
     <td v-else>
      <p>{{item.Content}}</p>
      </td>
     <td style="vertical-align:top; width:150px">
      <div class="text-center"><ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" /> </div>
      <div class="text-center">{{item.CreatedAt | formatDateWithoutSecon}}</div>
      <!-- <p>{{item.CreatedAt | formatDateWithoutSecon}}</p> -->
      <!-- <div><p>{{item.CreatedAt | formatDateWithoutSecon}}</p></div> -->
     </td>
     <td>
      <button
      class="btn btn-sm v-yellow-btn"
      @click="getDetail(item);"
      >
      {{ __t("Chi tiết") }}
      </button>
     </td>
    </tr>
   </template>
   <template v-if="tableData && tableData.length === 0">
    <tr>
     <td colspan="5" class="text-center hide-counter">
      {{ __t("Chưa có thông tin") }}
     </td>
    </tr>
   </template>
   <tfoot v-if="tableData && tableData.length > 0">
    <tr>
      <td colspan="5">
        <template>
          <div class="flex space-between">
            <div>
              <!-- <paginate
              :clickHandler="changePaginValue"
              :container-class="'pagination pagination-sm no-margin v-pagination'"
              :next-text="'»'"
              :page-count="query.PageSize"
              :prev-text="'«'"
              v-model="query.numberPage">
              </paginate> -->
              <paginate
                :clickHandler="changePaginValue"
                :container-class="'pagination pagination-sm no-margin v-pagination'"
                :next-text="'»'"
                :page-count="query.numberPage"
                :prev-text="'«'"
                v-if="tableData.length > 0"
                v-model="query.PageNumber">
                </paginate>
            </div>
            <div class="box-record">
              <!-- <p>Hiển thị: {{tableData.length + '/' + totalRow}} theo dõi</p> -->
            </div>
          </div>
        </template>
      </td>
    </tr>
  </tfoot>
  </table>
  </div>
    <div>
      <modal :name="'uploadInfo' + popupId" transition="pop-out" height="auto" :clickToClose="false" :width="1200">
        <!-- <i @click="handleClosePopupUpload()" style="cursor: pointer" class="fa fa-times pull-right fa-2" aria-hidden="true"></i> -->
        <div class="sync-ed-header text-center" style="background-color: #2B78E4;color: #fff">{{__t('THÔNG TIN UPLOAD')}} <i @click="handleClosePopupUpload()" style="cursor: pointer" class="fa fa-window-close pull-right" aria-hidden="true"></i> </div>
        <div class="sync-ed-box" style="overflow-x: hidden">
          <div class="row">
            <div class="col-md-6">
              <div style="margin-bottom: 30px">
                <upload-file id="mini-upload-new" v-if="!isReadOnly || isNew" :formid="IdSave" :value="imageLink" :readOnly="isReadOnly" @emitData="emitData" v-model="imageLink"/>
                <p v-if="ValidateUrl"  style="color:red; float:right; margin-bottom:30px" class="italic">{{__t('Vui lòng upload file!')}}</p>
              </div>
              <div v-for="(item, index) in preViewList" :key="index">
                  <div class="row mt-5" style="background: #efefef; height:55px;position:relative;">
                  <div class="col-md-2" style="height:55px">
                    <a :href="convertFileUrl(item.url)" target="_blank" :title="item.name">
                      <img v-if="item.type === 'PDF' || item.type === 'pdf'" :src="'static/icon-pdf.png'" style="width: 55px; height:55px ;margin: 0 auto"/>
                      <img v-else-if="item.type === 'doc' || item.type === 'docx' || item.type === 'DOC' || item.type === 'DOCX'" :src="'static/icon-docx.png'" style="width: 55px; height:55px ;margin: 0 auto"/>
                      <img v-else style="object-fit: contain; width:55px; height: 55px;" :src="convertFileUrl(item.url)">
                    </a>
                  </div>
                  <div :href="convertFileUrl(item.url)" target="_blank" :title="item.name" class="col-md-8" style="height:55px; position: absolute; left:90px;">
                    <a style="color: #333 !important" :href="convertFileUrl(item.url)" target="_blank" :title="item.name">
                      <div class="row mt-5">{{item.name}}</div>
                      <div class="row mt-10">{{item.type}}</div>
                    </a>
                  </div>
                  <div class="col-md-2" style="height:55px; position: absolute;right: 5px">
                    <!-- v-if="isNew || !isReadOnly" -->
                    <div v-if="isNew || !isReadOnly" @click="handleDeleteImage(item.url)" class="row" style="margin-top: 5px; margin-right: -5px;"><i style="cursor: pointer;" class="fa fa-times pull-right fa-2" aria-hidden="true"></i></div>
                    <div class="row" style="float: right; margin-top: 16px; margin-right: 5px;">{{item.size || '999'}} KB</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6" style="border-left: 1px solid #efefef">
              <p v-if="isNew">{{__t('Tạo mới bởi')}}: <ad-Info :ad="dataCreate.createdBy" /> {{__t('lúc')}}: {{dataCreate.createdAt | formatDateWithoutSecon}}</p>
              <p v-else>{{__t('Cập nhật bởi')}}: <ad-Info v-if="dataDetail && dataDetail.UpdatedBy" :ad="dataDetail.UpdatedBy" /> {{__t('lúc')}}: {{dataDetail && dataDetail.UpdatedAt ? dataDetail.UpdatedAt : ''}}</p>
              <!-- <p class="">{{dataCreate.UpdatedAt ? __t('Cập nhật bởi') : __t('Tạo mới bởi')}}: <ad-Info :ad="dataDetail.UpdatedBy ? dataDetail.UpdatedBy : dataDetail.CreatedBy" /> {{__t('lúc')}}: {{dataDetail.UpdatedAt ? dataDetail.UpdatedAt : dataDetail.createdAt}}</p> -->
              <div class="d-flex">
                <p class="mb-0 text-bold no-wrap w100">{{__t('Tiêu đề')}} <a style="color:red">(*)</a>:</p>
                <textarea-autosize v-if="isNew || !isReadOnly" :style="validateTitle ? 'border-color: red' : ''" :readonly="isNew ? false : isReadOnly" v-model="imageTitle" rows="3" class="form-control" :placeholder="__t('Nhập')"/>
                <!-- <FakeInput style="width:100%" v-else v-model="imageTitle" /> -->
                <p v-else-if="IsCheckFile" class="fake-input disable" style="width: 100%;"> {{__label(itemDetail)}}</p>
                <p v-else class="fake-input disable" style="width: 100%;">{{dataDetail.Title || 'N/A'}}</p>
              </div>
              <p v-if="validateTitle" class="italic" style="margin-left: 85px; margin-top: 5px; color: red">{{__t('Vui lòng bổ sung thông tin!')}}</p>
              <div class="d-flex mt-10">
                <p class="mb-0 text-bold no-wrap w100">{{__t('Nội dung')}}:</p>
                <textarea-autosize v-if="isNew || !isReadOnly" :readonly="isNew ? false : isReadOnly" v-model="imageContent" rows="3" class="form-control" :placeholder="__t('Nhập')"/>
                <!-- <FakeInput style="width:100%" v-else v-model="imageContent" /> -->
                <p v-else-if="IsCheckFile"  class="fake-input disable" style="width: 100%;">{{ __t("Hình ảnh được lấy từ biểu mẫu") }} {{__label(itemDetail)}}</p>
                <p v-else class="fake-input disable" style="width: 100%;">{{dataDetail.Content || 'N/A'}}</p>
              </div>
              <div style="justify-content: space-between; margin-top: 50px" class="d-flex" v-if="!viewOnly">
                <div>
                </div>
                <div>
                  <!-- v-if="isNew || !isReadOnly" -->
                  <div class="d-flex" v-if="isNew || !isReadOnly">
                    <button class="btn btn-flat ml-5" @click="handleRemoved()">
                    {{ __t("Xóa toàn bộ") }}
                    </button>
                    <button class="btn btn-flat v-yellow-btn ml-5" @click="handleUpdate()">
                    {{ __t("Lưu") }}
                    </button>
                    <button class="btn btn-flat ml-5" @click="handleClosePopupUpload()">
                    {{ __t("Hủy") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </modal>
    </div>
    <div>
    <modal name="previewImage" transition="pop-out" id="doctor-login" width="800px" height="600px" :clickToClose="false">
      <div class="containerImg">
        <img width="800px" height="600px" style="object-fit: contain;"  :src="imageUrl"/>
        <div class="top-right"><i style="cursor: pointer" @click="handleClose()" class="fa fa-times pull-right fa-2" aria-hidden="true"></i></div>
        <div class="right-center" style="cursor: pointer" @click="handleNextIamge()"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>
        <div class="left-center" style="cursor: pointer" @click="handleBeforeImage()"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
      </div>
    </modal>
    </div>
    <FloatBlock v-if="!viewOnly" :openBack="true" @handleBack="handleBack">
    <template slot="buttons">
     <div class="col-md-2 col-sm-2"><div class="form-group1"></div></div>
     <div class="col-md-8 col-sm-">
      <div style="float:right">
        <button style="width:275px" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleShowPopupInfo"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('UPLOAD FILE')}}</button>
        <!-- <button
        class="btn btn-flat v-yellow-btn ml-20"
        style="transform: translateY(-3px);width: 275px"
        @click="handleShowPopupInfo"
        >
        + {{__t('UPLOAD FILE')}}
    </button> -->
      </div>
     </div>
    </template>
   </FloatBlock>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
import DoctorConfirm from './popup/DoctorConfirm.vue'
import _ from 'lodash'
import DropFiles from '@/components/DropFiles.vue'
import DropFilesNew from '@/components/DropFilesNew.vue'
import UploadFile from '@/components/UploadFile.vue'
import $ from 'jquery'
import Print from './Print.vue'
import AskThePatientBeforeSurgeryService from '@/services/IPD/AskThePatientBeforeSurgeryService'
import UploadFileService from '@/services/IPD/UploadFileService'
// var urlApi = process.env.API_URL

export default {
  name: 'UploadImageFile',
  props: ['viewOnly', 'VisitId', 'VisitType', 'checkType'],
  mixins: [MixinForm, MixinMasterData],
  components: {
    UploadFile,
    viewImage: false,
    VDateTimePicker,
    DoctorConfirm,
    DropFiles,
    DropFilesNew,
    Print
  },
  data () {
    return {
      popupId: '',
      itemDetail: {},
      isEdit: false,
      IsCheckFile: false,
      activeImage: 1,
      activeUrl: '',
      settings: {
        arrows: true,
        dots: true,
        dotsClass: 'slick-dots custom-dot-class',
        edgeFriction: 0.35,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      },
      nowDate: new Date(),
      isNew: false,
      imageLink: '',
      imageContent: '',
      imageTitle: '',
      imageUrl: '/UploadFiles/Images/Temp/03-10-2022/d6d1aac1-8ce9-476d-bb43-2a3cd9fc0452/PNG',
      indexUrl: 0,
      ListImage: [
      ],
      listCarousel: ['/UploadFiles/Images/Temp/28-10-2022/33ae61d7-4d6b-49bc-91fb-6f1bd8d98f23/jpg', '/UploadFiles/Images/Temp/28-10-2022/1b6b3b56-ed43-4c08-a4be-1c0c1326c1e7/png', '/UploadFiles/Images/Temp/28-10-2022/6c223f48-b651-43fb-bdc7-de7a8ee00f28/jpg'],
      tableData: [
      ],
      Picture: '',
      data: null,
      NeedNew: false,
      Type: 'IPD',
      DataSubmit: {},
      IsLocked: false,
      loaded: false,
      roleConfirm: '',
      roleSubmit: '',
      roleCreate: '',
      checkResult: false,
      IsLockedUser: false,
      messageWarning3: '',
      // new
      isCreate: false,
      query: {
        Title: '',
        VisitId: null,
        username: '',
        Assessor: {
          Username: '',
          Fullname: ''
        },
        FromDate: null,
        ToDate: null,
        numberPage: 1,
        PageNumber: 1
      },
      validateTitle: false,
      ValidateUrl: false,
      dataCreate: {
        createdBy: '',
        createdAt: '',
        UpdatedAt: ''
      },
      dataDetail: {},
      totalRow: 0,
      formCode: 'UPLOADFILE',
      IdSave: '',
      preViewList: [],
      listNew: [],
      arrNew: [],
      firstUrl: 0,
      firstTitle: '',
      firstContent: '',
      listImageRemoved: [],
      tempList: []
    }
  },
  watch: {
    tableData: function (val) {
      console.log('table', val)
      this.tableData = val
    }
  },
  mounted () {
    this.query.FromDate = moment(moment().subtract(7, 'day').startOf('day')).format(process.env.DATETIME_FORMAT)
    this.query.ToDate = moment().format(process.env.DATETIME_FORMAT)
    this.popupId = this.makeid()
    this.getMasterDatas({Form: 'UPPLOADFILE'}, () => {
    })
    this.getList()
  },
  computed: {
    isReadOnly: function () {
      // || this.dataDetail.CreatedBy !== this.$store.state.account.Username
      if (this.dataDetail) {
        return this.viewOnly || this.IsCheckFile || this.dataDetail.CreatedBy !== this.$store.state.account.Username
      } else {
        return this.viewOnly || this.IsCheckFile
      }
      // return false
    }
  },
  methods: {
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
            }
          }
        ]
      })
    },
    handleBack () {
      this.back()
    },
    deleteItem (url) {
      const strgurl = {
        strgurl: url
      }
      new UploadFileService(strgurl).update('File/DeleteFile').then(response => {
        // this.imageLink = this.imageLink.filter(item => item !== this.convertFileUrlN(url))
        // this.preViewList = this.preViewList.filter(item => item.url !== url)
        // this.listImageRemoved.push(url)
        // this.listImageRemoved.filter(item => item !== url)
      }).catch(err => {
        console.log(err)
      })
    },
    handleRemoveFile (url) {
      this.preViewList = this.preViewList.filter(item => item.url !== url)
      this.listImageRemoved.push(url)
    },
    convertFileUrl (url) {
      var arr = [
        'png', 'jpg', 'jpeg',
        'PNG', 'JPG', 'JPEG', 'text', 'TEXT', 'pdf', 'PDF', 'doc', 'DOC', 'docx', 'DOCX'
      ]
      arr.forEach(ext => {
        url = url.replace(`.${ext}`, `/${ext}`)
      })
      return url
    },
    convertFileUrlN (url) {
      var arr = [
        'png', 'jpg', 'jpeg',
        'PNG', 'JPG', 'JPEG', 'text', 'TEXT', 'pdf', 'PDF', 'doc', 'DOC', 'docx', 'DOCX'
      ]
      arr.forEach(ext => {
        url = url.replace(`.${ext}`, `/${ext}`)
      })
      return url
    },
    emitData (value) {
      this.tempList = value
      this.preViewList = []
      // if (value.length > this.listNew.length) {
      //   if (this.listNew.length === 0) {
      //     for (let i = 0; i < value.length; i++) {
      //       const typeFile = value[i].url.split('.')
      //       console.log('type', value[i].url.split('/'))
      //       const item = {
      //         ...value[i],
      //         type: typeFile[typeFile.length - 1]
      //       }
      //       console.log('item', item)
      //       this.preViewList.push(item)
      //     }
      //   } else {
      //     this.preViewList = this.listNew.concat(value.slice(value.length - (value.length - this.listNew.length), value.length))
      //   }
      // } else {
      //   this.preViewList = this.listNew
      // }
      var arr = []
      arr = this.listNew.concat(value)
      for (let i = 0; i < arr.length; i++) {
        const typeFile = arr[i].url.split('.')
        const item = {
          ...arr[i],
          type: typeFile[typeFile.length - 1]
        }
        this.preViewList.push(item)
      }
      for (let i = 0; i < this.listImageRemoved.length; i++) {
        this.preViewList = this.preViewList.filter(item => item.url !== this.listImageRemoved[i])
      }
    },
    handleChangeImage (index) {
      this.activeImage = index
      this.activeUrl = this.ListImage[index]
    },
    openFile () {
      $('#dropzone').click()
    },
    handleDeleteFile (value) {
      console.log('value delete', value)
    },
    handleOpenView () {
      this.$modal.show('previewcaroulsel')
    },
    // bấm upload call api tạo mới
    handleShowPopupInfo () {
      this.listNew = []
      this.imageLink = ''
      this.preViewList = []
      this.ValidateUrl = false
      this.validateTitle = false
      this.isNew = true
      this.dataDetail = {}
      this.ListImage = []
      this.imageContent = ''
      this.imageTitle = ''
      this.dataCreate = {
        ...this.dataCreate,
        createdBy: this.$store.state.account.Username,
        createdAt: this.nowDate
      }
      new AskThePatientBeforeSurgeryService().update('CreateForm/' + this._VisitType + '/' + this.formCode + '/' + this._VisitId).then(response => {
        this.IdSave = response.Id
        this.$modal.show('uploadInfo' + this.popupId)
      }).catch(err => {
        console.log(err)
      })
    },
    handleDeleteImage (url) {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Bạn có chắc chắn muốn xóa hình ảnh này?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.handleRemoveFile(url)
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
    handleRemoved () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Bạn có chắc chắn muốn xóa thông tin upload này?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.handleDeleteForm()
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
    handleDeleteForm () {
      new AskThePatientBeforeSurgeryService().update('DeleteForm/' + this._VisitType + '/' + this.formCode + '/' + this._VisitId + '/' + this.IdSave).then(response => {
        // this.$modal.hide('uploadInfo')
        this.clearData()
        // this.getList()
        this.reload()
      }).catch(err => {
        console.log(err)
      })
      this.$modal.hide('uploadInfo' + this.popupId)
    },
    closePopupN () {
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
              // this.handleDeleteForm()
              this.$modal.hide('dialog')
              if (this.tempList.length > 0) {
                for (let i = 0; i < this.tempList.length; i++) {
                  this.deleteItem(this.tempList[i].url)
                }
              }
              this.$modal.hide('uploadInfo' + this.popupId)
              this.clearData()
              this.getList()
              // this.clearData()
            }
          },
          {
            title: 'Huỷ bỏ',
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    closePopup () {
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
              // this.handleDeleteForm()
              this.$modal.hide('dialog')
              this.$modal.hide('uploadInfo' + this.popupId)
              this.clearData()
            }
          },
          {
            title: 'Huỷ bỏ',
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    handleClosePopupUpload () {
      if (this.isNew) {
        if (this.imageLink || this.imageTitle || this.imageContent) {
          this.closePopupN()
        } else {
          if (this.tempList.length > 0) {
            for (let i = 0; i < this.tempList.length; i++) {
              this.deleteItem(this.tempList[i].url)
            }
          }
          this.clearData()
          this.getList()
          this.$modal.hide('uploadInfo' + this.popupId)
        }
      } else {
        if (this.IsCheckFile) {
          if (this.tempList.length > 0) {
            for (let i = 0; i < this.tempList.length; i++) {
              this.deleteItem(this.tempList[i].url)
            }
          }
          this.clearData()
          this.getList()
          this.$modal.hide('uploadInfo' + this.popupId)
        } else {
          if (this.firstUrl !== this.preViewList.length || this.firstTitle !== this.imageTitle.length || this.firstContent !== this.imageContent.length) {
            this.closePopupN()
          } else {
            if (this.tempList.length > 0) {
              for (let i = 0; i < this.tempList.length; i++) {
                this.deleteItem(this.tempList[i].url)
              }
            }
            this.clearData()
            this.getList()
            this.$modal.hide('uploadInfo' + this.popupId)
          }
        }
      }
      this.getList()
    },
    clearData () {
      this.itemDetail = null
      this.dataDetail = null
      this.ValidateUrl = false
      this.validateTitle = false
      this.IsCheckFile = false
      this.imageLink = ''
      this.imageContent = ''
      this.imageTitle = ''
      this.imageUrl = ''
      this.preViewList = []
      this.listNew = []
      // this.reload()
    },
    handleUpdate () {
      if (!this.imageTitle || this.preViewList.length === 0) {
        this.validateTitle = !this.imageTitle
        this.ValidateUrl = this.preViewList.length === 0
        // no
      } else {
        this.validateTitle = false
        this.ValidateUrl = false
        if (this.dataDetail.Id) {
          const title = this.imageTitle
          const content = this.imageContent
          const url = this.imageLink
          const pushUrl = {
            Code: 'UPPLOADFILECD1',
            Value: url,
            FormCode: null,
            Id: null,
            FormId: null,
            Items: null
          }
          const pushTitle = {
            Code: 'UPPLOADFILECD2',
            Value: title,
            FormCode: null,
            Id: null,
            FormId: null,
            Items: null
          }
          const pushContent = {
            Code: 'UPPLOADFILECD3',
            Value: content,
            FormCode: null,
            Id: null,
            FormId: null,
            Items: null
          }
          this.dataDetail.Datas = []
          this.dataDetail.Datas.push(pushUrl)
          this.dataDetail.Datas.push(pushTitle)
          this.dataDetail.Datas.push(pushContent)
          const params = {
            ...this.dataDetail
          }
          new AskThePatientBeforeSurgeryService().update('UpdateFile/' + this._VisitType + '/' + this.formCode + '/' + this._VisitId + '/' + this.dataDetail.Id, params).then(response => {
            for (let i = 0; i < this.listImageRemoved.length; i++) {
              this.deleteItem(this.listImageRemoved[i])
            }
            this.toastedSuccess(this.__t('Cập nhật thành công'))
            this.getList()
            setTimeout(() => {
              this.clearData()
              this.getList()
              this.$modal.hide('uploadInfo' + this.popupId)
              // this.handleClosePopupUpload()
            }, 300)
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.handleSave()
        }
      }
    },
    handleFilter () {
      this.query.PageNumber = 1
      this.getList()
    },
    handleSave () {
      if (!this.imageTitle || !this.imageLink) {
      //  no
      } else {
        this.MASTERDATA['UPPLOADFILE'].Items[0].Value = this.imageLink
        this.MASTERDATA['UPPLOADFILE'].Items[1].Value = this.imageTitle
        this.MASTERDATA['UPPLOADFILE'].Items[2].Value = this.imageContent
        this.DataSubmit.Datas = []
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
              }
            })
          }
        }
        this.mapData2MDData()
        const data = Object.assign({}, this.DataSubmit)
        new AskThePatientBeforeSurgeryService().update('UpdateFile/' + this._VisitType + '/' + this.formCode + '/' + this._VisitId + '/' + this.IdSave, data).then(response => {
          this.toastedSuccess(this.__t('Lưu thành công'))
          this.loaded = false
          this.query.PageNumber = 1
          this.clearData()
          this.reload()
          this.$modal.hide('uploadInfo' + this.popupId)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    handleCancel () {
      this.$modal.hide('uploadInfo' + this.popupId)
    },
    changePaginValue (value) {
      this.query.PageNumber = value
      this.getList()
    },
    handleNextIamge () {
      if (this.indexUrl === this.ListImage.length) {
        this.indexUrl = 0
      } else {
        this.indexUrl = this.indexUrl + 1
      }
      this.imageUrl = this.ListImage[this.indexUrl]
    },
    handleBeforeImage () {
      if (this.indexUrl === 0) {
        this.indexUrl = this.ListImage.length
      } else {
        this.indexUrl = this.indexUrl - 1
      }
      this.imageUrl = this.ListImage[this.indexUrl]
    },
    handleViewImange (id) {
      this.$modal.show('previewcaroulsel')
    },
    handleClose () {
      this.indexUrl = 0
      this.$modal.hide('previewImage')
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    clearFilter () {
      this.$refs.userAd.clear()
      const a = {
        Title: '',
        VisitId: null,
        username: '',
        Assessor: {
          Username: '',
          Fullname: ''
        },
        FromDate: null,
        ToDate: null,
        PageNumber: 1,
        PageSize: 30
      }
      this.query = a
      this.query.FromDate = null
      this.query.ToDate = null
      // this.clearData()
      this.getList()
      // this.reload()
    },
    getDetail (item) {
      this.getMasterDatas({Form: 'UPPLOADFILE'}, () => {
      })
      this.itemDetail = item
      this.listImageRemoved = []
      this.preViewList = []
      this.listNew = []
      this.isNew = false
      // const params1 = {
      //   ...this.query,
      //   PageSize: 30,
      //   CreatedBy: this.query.username
      // }
      // new AskThePatientBeforeSurgeryService(params1).find('GetListWithPaging/' + this._VisitType + '/' + this.formCode + '/' + this._VisitId).then(response => {
      //   this.tableData = response.Datas
      //   this.query.numberPage = response.Paging.numberPage
      // })
      var params = {}
      if (item.FormCodeUrl) {
        params = {
          FormCodeUrl: item.FormCodeUrl
        }
      } else {
        params = {}
      }
      console.log('params', params)
      new AskThePatientBeforeSurgeryService(params).find('GetDetailFile/' + this._VisitType + '/' + this.formCode + '/' + this._VisitId + '/' + item.Id).then(response => {
        this.IdSave = response.data.Id
        this.dataDetail = response.data
        this.IsCheckFile = response.data.IsCheckFile
        if (response.data.ListFileData && response.data.ListFileData.length > 0) {
          for (let i = 0; i < response.data.ListFileData.length; i++) {
            const typeFile = response.data.ListFileData[i].Url.split('.')
            const item = {
              size: response.data.ListFileData[i].FileSize,
              name: response.data.ListFileData[i].FileName.substring(0, 60),
              url: response.data.ListFileData[i].Url,
              type: typeFile[typeFile.length - 1]
            }
            this.listNew.push(item)
            this.preViewList.push(item)
          }
          this.firstUrl = this.listNew.length
          this.preViewList = this.listNew
        }
        for (let i = 0; i < response.data.Datas.length; i++) {
          if (response.data.Datas[i].Code === 'UPPLOADFILECD2' && response.data.Datas[i].Value) {
            this.imageTitle = response.data.Datas[i].Value
            this.firstTitle = response.data.Datas[i].Value
            this.dataDetail = {
              ...this.dataDetail,
              Title: response.data.Datas[i].Value
            }
          }
          if (response.data.Datas[i].Code === 'UPPLOADFILECD3' && response.data.Datas[i].Value) {
            this.imageContent = response.data.Datas[i].Value
            this.firstContent = response.data.Datas[i].Value
            this.dataDetail = {
              ...this.dataDetail,
              Content: response.data.Datas[i].Value
            }
          }
        }
        this.firstTitle = this.imageTitle.length
        this.firstContent = this.imageContent.length
        this.$modal.show('uploadInfo' + this.popupId)
      }).catch(err => {
        console.log(err)
      })
    },
    getList () {
      this.loaded = false
      // var CreatedBy = this.query.Assessor ? this.query.Assessor.username : ''
      delete this.query.Assessor
      this.$modal.hide('uploadInfo' + this.popupId)
      // delete this.query.FromDate
      const params = {
        ...this.query,
        PageSize: 30,
        CreatedBy: this.query.username
      }
      new AskThePatientBeforeSurgeryService(params).find('GetListWithPaging/' + this._VisitType + '/' + this.formCode + '/' + this._VisitId).then(response => {
        this.tableData = response.Datas
        this.query.numberPage = response.Paging.numberPage
      })
      this.loaded = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.v--modal-box.v--modal {
  overflow: hidden !important;
}
.dot {
  height: 10px;
  width: 10px;
  background-color: #fff;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  border: 0.5px solid #000;
}
.dot-active {
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  border: 1px solid #000;
}
  .search-hover {
    display: none;
  }
  .boxImage-item:hover {
    .search-hover {
      display: block;
    }
  }
  .containerImg {
    position: relative;
    text-align: center;
    color: white;
  }
  .top-right {
    position: absolute;
    top: 8px;
    right: 16px;
  }
  .right-center {
    position: absolute;
    top: 300px;
    right: 10px;
    font-size: 26px;
  }
  .left-center {
    position: absolute;
    top: 300px;
    left: 10px;
    font-size: 26px;
  }
  .fa.pull-right {
    margin-left: 0.3em;
  }
  .fa-chevron-left:before {
    color: red !important;
  }
  .fa-chevron-right:before {
    color: red !important;
  }
  .fa-remove:before, .fa-close:before, .fa-times:before {
    content: "\F00D";
    color: red;
  }
  .wrapper {
    width: 575px;
  }
  .boxImage {
    display: flex;
    flex-wrap: wrap;
  }
  .boxImage>* {
    flex: 1 1 250px;
    margin-left:20px;
    height:200px;
    cursor: pointer;
    margin-bottom: 5px;
  }
  .slick-prev:before {
    content: '\2190';
    background: #ff9c00;
  }
  .slick-next:before {
    content: '\2192';
    background: #ff9c00;
}
::v-deep .slick-dots {
  position: absolute;
  bottom: -90px;
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
}
::v-deep .slick-next:before, .slick-prev:before {
  font-family: slick;
  font-size: 20px;
  line-height: 1;
  opacity: .75;
  color: #986b6b;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
::v-deep .slick-dots {
  position: absolute;
  /* bottom: -25px; */
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
  top: 550px !important;
}
</style>
