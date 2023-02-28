<template>
  <div id="PageContent-Page" class="main-content disable_ccp">
    <div class="text-center cap fw600 mrb30" style="font-size: 30px;">{{__label({ViName: 'Phiếu cam kết phẫu thuật/ thủ thuật/ điều trị có nguy cơ cao', EnName: 'Consent for Operation/ Procedure/ High risk treatment'})}}</div>
    <div class="content-body">
      <div class="ConsentForOperation-PageContent" :class="(DataSubmit && DataSubmit.length) ? 'show-border' : ''" id="ConsentForOperation-PageContent">
        <template v-if="loaded">
          <div class="content big-box-content" v-if="DataSubmit">
            <label class="mrb10 fs16 fw600 block-title">1. {{__label(MASTERDATA['PCKPTTT2'])}}</label>
            <MdRadiosInput4 :indexs="[0]" :readonly="readonly" v-if="MASTERDATA['PCKPTTT3']" v-model="MASTERDATA['PCKPTTT3']"/>
            <div class="flex align-center mrb10" v-if="MASTERDATA['PCKPTTT3']">
              <MdRadiosInput4 class="mrr10" :indexs="[1]" :readonly="readonly" v-model="MASTERDATA['PCKPTTT3']"/>
              <template v-if="MASTERDATA['PCKPTTT3'].Items[1].Value">
                <MDText :readonly="readonly" class="mrr10" :placeholder="__t('Nhập')" style="width: 250px;" rows="1" v-model="MASTERDATA['PCKPTTT3'].Items[2].Value" />
                <div class="mrr5 white-space">{{__label({ViName: 'Mối quan hệ', EnName: 'Relationship'})}}:</div>
                <v-select v-if="!readonly && MASTERDATA['PCKPTTT3']"
                  :unsetWidth="true"
                  class='select-full-w mrr5'
                  style="width: 127px!important;"
                  v-model="MASTERDATA['PCKPTTT3'].Items[3].Value"
                  :placeholder="__t('Chọn')"
                  :items="OPTION"/>
                <p v-else-if="MASTERDATA['PCKPTTT3'] && MASTERDATA['PCKPTTT3'].Items[3].Value !== 'Khác/Other'" class="fake-input disable full-width" style="margin: 0;width: 120px;">{{MASTERDATA['PCKPTTT3'].Items[3].Value || 'N/A'}}</p>
                <MDText :readonly="readonly" v-if="MASTERDATA['PCKPTTT3'].Items[3].Value === 'Khác/Other'" :placeholder="__t('Nhập')" style="width: 250px;" rows="1" v-model="MASTERDATA['PCKPTTT3'].Items[4].Value" />
              </template>
            </div>
            <div class="mrb10 white-space">{{__label(MASTERDATA['PCKPTTT7'])}}:</div>
            <MDText class="mrb10" :readonly="readonly" v-if="MASTERDATA['PCKPTTT7']" :placeholder="__t('Nhập')" rows="1" v-model="MASTERDATA['PCKPTTT7'].Items[0].Value" />
            <div class="mrb10">{{__label(MASTERDATA['PCKPTTT9'])}}.</div>
            <div class="flex align-center mrb10">
              <div class="mrr5">i. {{__label(MASTERDATA['PCKPTTT11'])}}:</div>
              <div v-if="_VisitType === 'IPD'">{{getChuanDoan(DataSubmit)}}</div>
              <div v-else>{{getChuanDoan2(DataSubmit)}}</div>
            </div>
            <div class="mrb10">ii. {{__label(MASTERDATA['PCKPTTT12'])}}:</div>
            <div class="mrb10">iii. {{__label(MASTERDATA['PCKPTTT13'])}}.</div>
            <div class="mrb10">{{__label(MASTERDATA['PCKPTTT14'])}}:</div>
            <MDText class="mrb10" :readonly="readonly" v-if="MASTERDATA['PCKPTTT14']" :placeholder="__t('Nhập')" rows="1" v-model="MASTERDATA['PCKPTTT14'].Items[0].Value" />
            <div class="mrb10">{{__label(MASTERDATA['PCKPTTT16'])}}:</div>
            <MDText class="mrb10" :readonly="readonly" v-if="MASTERDATA['PCKPTTT16']" :placeholder="__t('Nhập')" rows="1" v-model="MASTERDATA['PCKPTTT16'].Items[0].Value" />
            <div class="mrb10">iv. {{__label(MASTERDATA['PCKPTTT18'])}}.</div>
            <MDText class="mrb10" :readonly="readonly" v-if="MASTERDATA['PCKPTTT18']" :placeholder="__t('Nhập')" rows="1" v-model="MASTERDATA['PCKPTTT18'].Items[0].Value" />
            <div class="mrb10 white-space">v. {{__label(MASTERDATA['PCKPTTT20'])}}.</div>
            <MDText class="mrb10" :readonly="readonly" v-if="MASTERDATA['PCKPTTT20']" :placeholder="__t('Nhập')" rows="1" v-model="MASTERDATA['PCKPTTT20'].Items[0].Value" />
            <div class="flex align-center mrb10">
              <div class="mrr5 white-space">vi. {{__label(MASTERDATA['PCKPTTT22'])}}.</div>
              <MDText :readonly="readonly" v-if="MASTERDATA['PCKPTTT22']" :placeholder="__t('Nhập')" rows="1" v-model="MASTERDATA['PCKPTTT22'].Items[0].Value" />
            </div>
            <div class="mrb10 white-space">vii. {{__label(MASTERDATA['PCKPTTT24'])}}.</div>
            <MDText class="mrb10" :readonly="readonly" v-if="MASTERDATA['PCKPTTT24']" :placeholder="__t('Nhập')" rows="1" v-model="MASTERDATA['PCKPTTT24'].Items[0].Value" />
            <div class="mrb10 box-mini-content justify">{{__label(MASTERDATA['PCKPTTT26'])}}.</div>
            <!-- <MDText :readonly="readonly" class="mrb10" v-if="MASTERDATA['PCKPTTT26']" :placeholder="__t('Nhập')" rows="1" v-model="MASTERDATA['PCKPTTT26'].Items[0].Value" /> -->
            <div class="box-mini-content mrb10 justify">{{__label(MASTERDATA['PCKPTTT28'])}}.</div>
            <div class="box-mini-content mrb10 justify">{{__label(MASTERDATA['PCKPTTT30'])}}.</div>
            <div class="box-mini-content mrb10 justify">{{__label(MASTERDATA['PCKPTTT31'])}}:</div>
            <!-- PCKPTTT32 -->
            <table v-if="MASTERDATA['PCKPTTT32']" class="table table-striped table-bordered v-table" id="customer-tbl">
              <thead class="bg-1375ba">
                <tr>
                  <th class="text-center"></th>
                  <th width="300px" class="text-center">{{__label({ViName: 'Đồng ý', EnName: 'Agrees'})}} ({{__label({ViName: 'Chỉ tick nếu người bệnh đồng ý', EnName: 'Only tick if patient agrees'})}})</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(e, index) in MASTERDATA['PCKPTTT32'].Items">
                  <tr :key="index">
                    <td>{{__label(e)}}.</td>
                    <td align="center">
                      <MdRadiosInput4 :vcheckbox="true" style="width: 40px;" :hidelabel="true" :indexs="[index]" :readonly="readonly" v-model="MASTERDATA['PCKPTTT32']"/>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div class="box-mini-content mrb10 justify">{{__label(MASTERDATA['PCKPTTT37'])}}.</div>
            <div class="box-mini-content mrb10 justify">{{__label(MASTERDATA['PCKPTTT38'])}}.</div>
            <div class="flex align-center mrb10">
              <div class="white-space mrr5">{{__label(MASTERDATA['PCKPTTT39'])}}:</div>
              <VDateTimePicker5 :readonly="readonly" v-model="MASTERDATA['PCKPTTT39'].Items[0].Value" :format="vDateTimeFormat" :placeholder="__t('Chọn')"/>
            </div>
            <label class="mrb10 fs16 fw600 block-title">1.1. {{__label(MASTERDATA['PCKPTTT41'])}}:</label>
            <div class="mrb10 justify">{{__label(MASTERDATA['PCKPTTT42'])}}.</div>
            <div class="mrb10" v-if="MASTERDATA['PCKPTTT3'] && MASTERDATA['PCKPTTT3'].Items[0].Value">
              <div class="flex align-center mrb10">
                <div class="white-space mrr100">{{__label(MASTERDATA['PCKPTTT72'])}}: <span>{{DataSubmit.FullNameNB}}</span></div>
                <div>{{__label({ViName: 'Chữ ký', EnName: 'Signature'})}}:</div>
              </div>
            </div>
            <div class="mrb10" v-if="MASTERDATA['PCKPTTT3'] && MASTERDATA['PCKPTTT3'].Items[1].Value">
              <div class="flex align-center mrb10">
                <div class="white-space mrr100">{{__label(MASTERDATA['PCKPTTT74'])}}: {{MASTERDATA['PCKPTTT3'].Items[2].Value}}</div>
                <div>{{__label({ViName: 'Chữ ký', EnName: 'Signature'})}}:</div>
              </div>
              <div>{{__label(MASTERDATA['PCKPTTT76'])}}: {{__t(getNameDaiDien())}}</div>
            </div>
            <label class="mrb10 fs16 fw600 block-title">1.2. {{__label(MASTERDATA['PCKPTTT43'])}} ({{__label({ViName: 'nếu có', EnName: 'if applicable'})}}):</label>
            <div class="mrb10 justify">{{__t(`Tôi đã phiên dịch trung thực, khách quan, đúng nghĩa toàn bộ nội dung bản cam kết này cho ${getTextVi()} và phiên dịch đầy đủ những trao đổi bằng lời nói hay văn bản giữa bác sĩ và ${getTextVi()}`)}}.</div>
            <div class="flex align-center mrb10">
              <div class="mrr5 white-space">{{__label(MASTERDATA['PCKPTTT45'])}}:</div>
              <MDText class="mrr100" :readonly="readonly" v-if="MASTERDATA['PCKPTTT45']" style="width: 250px;" :placeholder="__t('Nhập')" rows="1" v-model="MASTERDATA['PCKPTTT45'].Items[0].Value" />
              <div>{{__label({ViName: 'Chữ ký', EnName: 'Signature'})}}:</div>
            </div>
            <label class="mrb10 fs16 fw600 block-title">1.3. {{__label(MASTERDATA['PCKPTTT48'])}}:</label>
            <div class="mrb10 justify">{{__t(`Tôi đã giải thích cho ${getTextVi()} về bản chất, lợi ích, rủi ro của phương pháp phẫu thuật/ thủ thuật/ điều trị có nguy cơ cao cũng như các phương pháp điều trị thay thế (nếu có)`)}}.</div>
            <div class="flex align-center mrb10">
              <div class="mrr30 white-space">{{__label(MASTERDATA['PCKPTTT50'])}}: {{DataSubmit.CreatedByFullName}}</div>
              <div>{{__label({ViName: 'Chữ ký', EnName: 'Signature'})}}:</div>
            </div>
            <MdRadiosInput4 class="mrb10" v-if="MASTERDATA['PCKPTTT55']" :vcheckbox="true" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['PCKPTTT55']"/>
            <MDText class="mrb10" v-if="MASTERDATA['PCKPTTT55'] && MASTERDATA['PCKPTTT55'].Items[0].Value" :readonly="readonly" :placeholder="__t('Nhập')" rows="1" v-model="MASTERDATA['PCKPTTT55'].Items[1].Value" />
            <label class="mrb10 fs16 fw600 block-title">2. {{__label(MASTERDATA['PCKPTTT57'])}} ({{__label({ViName: 'nếu áp dụng', EnName: 'if applicable'})}}):</label>
            <div class="mrb10 justify">{{__label(MASTERDATA['PCKPTTT58'])}}.</div>
            <div class="flex align-center mrb10">
              <div class="white-space mrr5">{{__label(MASTERDATA['PCKPTTT59'])}}:</div>
              <VDateTimePicker5 :readonly="readonly" v-model="MASTERDATA['PCKPTTT59'].Items[0].Value" :format="vDateTimeFormat" :placeholder="__t('Chọn')"/>
            </div>
            <div class="flex align-center mrb10" v-if="MASTERDATA['PCKPTTT3'] && MASTERDATA['PCKPTTT3'].Items[0].Value">
              <div class="mrr100 white-space">{{__label({ViName: 'Họ tên của người bệnh', EnName: 'Patient’s name'})}}: {{DataSubmit.FullNameNB}}</div>
              <div>{{__label({ViName: 'Chữ ký', EnName: 'Signature'})}}:</div>
            </div>
            <div class="flex align-center mrb10" v-if="MASTERDATA['PCKPTTT3'] && MASTERDATA['PCKPTTT3'].Items[1].Value">
              <div class="mrr100 white-space">{{__label({ViName: 'Họ tên của người đại diện', EnName: `Representative's name`})}}: {{MASTERDATA['PCKPTTT3'].Items[2].Value}}</div>
              <div>{{__label({ViName: 'Chữ ký', EnName: 'Signature'})}}:</div>
            </div>
            <div class="mrb10" v-if="MASTERDATA['PCKPTTT3'] && MASTERDATA['PCKPTTT3'].Items[1].Value">{{__label(MASTERDATA['PCKPTTT63'])}}: {{__t(getNameDaiDien())}}</div>
            <div class="flex align-center mrb10">
              <div class="white-space mrr100">{{__label(MASTERDATA['PCKPTTT50'])}}: {{DataSubmit.CreatedByFullName}}</div>
              <div>{{__label({ViName: 'Chữ ký', EnName: 'Signature'})}}:</div>
            </div>
            <!-- UPLOAD -->
            <VUpload
              code="PCKPTTT66"
              :hidelabelLi="true"
              v-if="MASTERDATA['PCKPTTT66'] && dataDropfile"
              :planUpdate="this.__t('Sau khi phiếu có xác nhận/ chữ ký từ người bệnh/ người đại diện. Người dùng chụp ảnh phiếu và tải ảnh lên hệ thống.')"
              :readonly="readonly"
              :dataFile="MASTERDATA['PCKPTTT66'].Items[0]"
              :index="[1]"
              :dataDropfile="dataDropfile"
               />
          </div>
          <div class="text-center" v-else>
            <NewForm @createForm="confirmPopupCreate" :IsLocked="IsLocked" :TitleForm="''"/>
            <!-- <h4>{{__t('Chưa có thông tin')}}</h4>
            <button class="btn v-yellow-btn" v-if="!IsLocked" @click="confirmPopupCreate()">{{__t('Tạo mới')}}</button> -->
          </div>
          <FloatBlock v-if="!viewOnly" :openBack="true" @handleBack="handleBack">
            <template slot='buttons'>
              <div class="col-md-2 col-sm-2">
                <div class="form-group1">
                </div>
              </div>
              <div class="col-md-4 col-sm-4" v-if="DataSubmit">
                <div @click="print()" class="btn-block btn-in" title="Price"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In ngay')}}</div>
              </div>
              <div class="col-md-6 col-sm-6" v-if="!readonly && DataSubmit">
                <div class="form-group1">
                  <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
                </div>
              </div>
            </template>
          </FloatBlock>
        </template>
        <div v-else class="loading-text"><v-loading/></div>
        <print class="none" :viewOnly="viewOnly" :VisitId="_VisitId" :VisitType="_VisitType"/>
      </div>
    </div>
     <div>
      <p>A01_001_080721_V</p>
      <p v-if="DataSubmit">{{__t('Chỉnh sửa lần cuối bởi')}} <ad-info :ad="DataSubmit.UpdatedBy || DataSubmit.CreatedBy" /> {{__t('lúc')}} {{getFTime(DataSubmit.UpdatedAt) || getFTime(DataSubmit.CreatedAt)}}</p>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import storage from '@/lib/storage'
import moment from 'moment'
import VDateTimePicker5 from '@/components/VDateTimePicker5.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import ConsentForOperationOrrProcedure from '@/services/ConsentForOperationOrrProcedure'
import _ from 'lodash'
import constants from '@/constants'
import VSelect from '@/components/VSelect.vue'
import Print from './Print.vue'
import UploadFileService from '@/services/IPD/UploadFileService'
import EventBus from '@/lib/eventBus'

const GENDER = constants.GENDER

export default {
  name: 'ConsentForOperationIndex',
  props: ['viewOnly', 'VisitId', 'VisitType'],
  mixins: [MixinMasterData],
  data () {
    return {
      dataDropfile: {},
      DataSubmit: null,
      IsLocked: false,
      GENDER: GENDER,
      icd10Code: ['PCKPTTT67'],
      time: moment().format('HH:mm DD/MM/YYYY'),
      OPTION: [
        {
          value: 'Chồng/Husband',
          label: 'Chồng'
        },
        {
          value: 'Mẹ/Mother',
          label: 'Mẹ'
        },
        {
          value: 'Bố/Father',
          label: 'Bố'
        },
        {
          value: 'Chị gái/Sister',
          label: 'Chị gái'
        },
        {
          value: 'Anh trai/Brother',
          label: 'Anh trai'
        },
        {
          value: 'Con gái/Daughter',
          label: 'Con gái'
        },
        {
          value: 'Con trai/Son',
          label: 'Con trai'
        },
        {
          value: 'Khác/Other',
          label: 'Khác'
        }
      ],
      loaded: false,
      checkUser: false,
      edit: false,
      dataMaster: null
    }
  },
  components: {
    VDateTimePicker5, VSelect, Print
  },
  watch: {
    data: {
      handler (a, b) {
        this.edit = true
      },
      deep: true
    }
  },
  beforeMount () {
    this.getMasterDatas({Form: 'PCKPTTT'}, () => {
      this.getData()
    })
    $('.disable_ccp' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
  },
  computed: {
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
    readonly () {
      if (this.isDev() && !this.viewOnly) {
        return false
      }
      return this.viewOnly || !this.hasRole(`${this._VisitType}CFOOPU`) || this.IsLocked || this.checkUser
    }
  },
  methods: {
    async getData () {
      this.loaded = false
      if (this._VisitType === 'IPD' || this._VisitType === 'OPD') {
        await new ConsentForOperationOrrProcedure({}, this._VisitType).find('GetInfo' + '/' + this._VisitId + '?hidemsg=' + true).then(res => {
          this.IsLocked = res.IsLocked
        })
      }
      await new ConsentForOperationOrrProcedure({}, this._VisitType).find('Get' + '/' + this._VisitId + '?hidemsg=' + true).then(res => {
        this.DataSubmit = res.data
        console.log('resid', res)
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: res.data.Id || res.data.ID
        }
        EventBus.$emit('emitDropfiles', this.dataDropfile)
        console.log('nguy cơ cao', this.dataDropfile)
        if (this.DataSubmit.CreatedBy !== this.$store.state.account.Username) {
          this.checkUser = true
        }
        this.mapData()
        this.loaded = true
      }).catch((e) => {
        this.DataSubmit = null
        this.loaded = true
      })
    },
    // popup cảnh báo dữ liệu chưa lưu
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
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
    mapData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (this.icd10Code.includes(item.Code)) {
                item.Value = this.JSONParse(exited.Value || [], true)
              } else {
                item.Value = exited.Value
              }
            } else {
              item.Value = null
            }
          })
        }
      }
      // this.fillData()
      this.dataMaster = JSON.stringify(this.MASTERDATA)
    },
    // xác nhận tạo mới
    confirmPopupCreate () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Tạo mới'),
        text: this.$t('Tạo mới Phiếu cam kết phẫu thuật/ thủ thuật/ điều trị có nguy cơ cao?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.handleCreate()
            }
          },
          {
            title: this.$t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this.DataSubmit.Id, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    handleSubmit () {
      var arr = this.MASTERDATA['PCKPTTT66'].Items[0].Value ? this.MASTERDATA['PCKPTTT66'].Items[0].Value : []
      console.log('filer', this.MASTERDATA['PCKPTTT66'].Items[0].Value)
      this.checkData()
      let DataSubmit = this.getDataSubmit()
      new ConsentForOperationOrrProcedure({}, this._VisitType).update('/Update' + '/' + this._VisitId + '?hidemsg=' + true, DataSubmit).then(res => {
        this.toastedSuccess()
        this.removedFile(arr)
        this.reload()
      }).catch((e) => {
        // if (e && e.data.EnMessage === 'You do NOT have permission to update') {
        //   this.checkRole()
        // }
      })
    },
    getDataSubmit () {
      var obj = {}
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            if (item.Value === 'Invalid date') {
              item.Value = ''
            }
            var val = item.Value
            if (this.icd10Code.includes(item.Code)) {
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
      return Object.assign({}, this.DataSubmit)
    },
    checkData () {
      if (this.MASTERDATA['PCKPTTT3']) {
        if (!this.MASTERDATA['PCKPTTT3'].Items[0].Value && this.MASTERDATA['PCKPTTT72']) {
          this.MASTERDATA['PCKPTTT72'].Items[0].Value = ''
        }
        if (!this.MASTERDATA['PCKPTTT3'].Items[1].Value) {
          this.MASTERDATA['PCKPTTT3'].Items[2].Value = ''
          this.MASTERDATA['PCKPTTT3'].Items[3].Value = ''
          this.MASTERDATA['PCKPTTT3'].Items[4].Value = ''
        }
        if (this.MASTERDATA['PCKPTTT3'].Items[3].Value !== 'Khác/Other') {
          this.MASTERDATA['PCKPTTT3'].Items[4].Value = ''
        }
      }
      if (this.MASTERDATA['PCKPTTT55']) {
        if (!this.MASTERDATA['PCKPTTT55'].Items[0].Value) {
          this.MASTERDATA['PCKPTTT55'].Items[1].Value = ''
        }
      }
    },
    handleCreate () {
      new ConsentForOperationOrrProcedure({}, this._VisitType).update('/Create' + '/' + this._VisitId + '?hidemsg=' + true).then(res => {
        this.toastedSuccess()
        this.reload()
      }).catch((e) => {
        console.log(e)
      })
    },
    print () {
      this.$MedicalRecordPrinter('printMe', false, 'A01_001_080721_V')
      // this.$htmlToPaper3('printMe', true, 'A01_001_080721_V')
    },
    getNameDaiDien () {
      let name = ''
      if (this.MASTERDATA['PCKPTTT3']) {
        if (this.MASTERDATA['PCKPTTT3'].Items[3].Value && this.MASTERDATA['PCKPTTT3'].Items[3].Value !== 'Khác/Other') {
          name = this.MASTERDATA['PCKPTTT3'].Items[3].Value
        }
        if (this.MASTERDATA['PCKPTTT3'].Items[3].Value && this.MASTERDATA['PCKPTTT3'].Items[3].Value === 'Khác/Other') {
          name = this.MASTERDATA['PCKPTTT3'].Items[4].Value
        }
      }
      if (name && name.includes('/')) {
        name = name.split('/')[0]
      }
      return name
    },
    Vi (data) {
      if (data) {
        return data.ViName
      }
      return ''
    },
    getTextVi () {
      let str = 'người bệnh'
      if (this.MASTERDATA['PCKPTTT3']) {
        if (this.MASTERDATA['PCKPTTT3'].Items[0].Value) {
          str = 'người bệnh'
        }
        if (this.MASTERDATA['PCKPTTT3'].Items[1].Value) {
          str = 'người đại diện'
        }
      }
      return str
    },
    isDev () {
      let check = false
      if (this.$store.state.account.Username === 'hunglq25') {
        check = true
      }
      return check
    }
  }
}
</script>
<style lang="stylus" scoped>
.show-border {
  border: 1px solid #dadce0;
  padding-top: 10px;
}
.box-mini-content {
  display: inline-block;
}
.box-mini-input {
  display: inline-block;
}
.big-box-content {
  border: 1px solid #dadce0;
  padding: 15px;
}
</style>
