<template>
  <!-- <FormsWrap :FormCode="'A01_067_050919_VE'" :FormName="'Quá trình khám thai'"> -->
    <div v-if="loaded">
      <div v-if="List.length > 0">
        <div v-if="MASTERDATA['PRFOURE116']" class="d-flex flex-center mt-10 mb-10">
          <p class="mb-0 mr-5 no-wrap">{{__label(MASTERDATA['PRFOURE116'])}}:</p>
          <FakeInput v-model="Info.WeightBeforePregnancy"/>
        </div>
        <TblPregnancyCheckupProcess
          :top="true"
          :readonly="isReadOnlyTable"
          :FormCode="'ThePregnancyCheckupProcess'"
          :VisitId="_VisitId"
          :FormID="_ItemId"
          :VisitType="'OPD'"
          :textBtnAdd="this.__t('Thêm mới')"
          :formatTime="vDateFormat"
          :dontGetDate="false"
          :checkUserEdit="true"
          :MASTERDATA="MASTERDATA"
          @dataChanged="tableChanged = true"
          ref="TblPregnancyCheckupProcess"
        />
        <div v-if="MASTERDATA['PRFOURE118']" class="d-flex flex-center mt-10">
          <p class="w140 mb-0 mr-5 no-wrap">{{__label(MASTERDATA['PRFOURE118'])}}:</p>
          <textarea-autosize v-if="!isReadOnly" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE118'].Items[0].Value"/>
          <FakeInput v-else v-model="MASTERDATA['PRFOURE118'].Items[0].Value"/>
        </div>
        <div v-if="MASTERDATA['PRFOURE120']" class="d-flex flex-center mt-10">
          <p class="w140 mb-0 mr-5 no-wrap">{{__label(MASTERDATA['PRFOURE120'])}}:</p>
          <textarea-autosize v-if="!isReadOnly" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE120'].Items[0].Value"/>
          <FakeInput v-else v-model="MASTERDATA['PRFOURE120'].Items[0].Value"/>
        </div>
        <p class="mt-20">A01_067_050919_VE</p>
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="DataSubmit.UpdatedBy" /> {{__t('lúc')}} {{DataSubmit.UpdatedAt}}</p>
        <!-- footer -->
        <FloatBlock :openBack="true" @handleBack="handleBack" v-if="!viewOnly">
          <template slot='buttons'>
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-2 col-sm-2">
            </div>
            <div class="col-md-6 col-sm-6">
              <div v-if="!IsLocked" class="form-group1">
                <button v-if="hasRole('APIUDOPDA01_067_050919_VE')" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </div>
      <div v-else class="text-center mb-10">
        <div v-if="!viewOnly">
          <div v-if="IsLocked" style="color: red;" class="italic">
            <h4><i class="fa fa-lock" aria-hidden="true"></i> {{__t('Bạn không được phép chỉnh sửa do hồ sơ đã bị khóa theo nguyên tắc 24h!')}}</h4>
          </div>
          <h4 v-else>{{__t('Chưa có Quá trình khám thai')}}</h4>
          <button v-if="_VisitType === 'IPD' || _VisitType === 'OPD' ? !IsLocked : true" class="btn btn-warning" @click="createPopup">{{__t('Tạo mới')}}</button>
        </div>
        <div v-else>
          <h4>{{__t('Chưa có thông tin !')}}</h4>
        </div>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  <!-- </FormsWrap> -->
</template>

<script>
import FormApi from '@/services/FormAPI.js'
import TblPregnancyCheckupProcess from '@/components/OPD/PregnancyFollowUpRecord/TblPregnancyCheckupProcess'
import PregnancyFollowUpRecord from '@/services/OPD/PregnancyFollowUpRecord.js'
import FormsWrap from '@/components/Form/FormsWrap'
import MixinMasterData from '@/mixins/masterdata.js'
import VDatePicker from '@/components/VDateTimePicker.vue'
import { find } from 'lodash'
export default {
  name: 'OPDThePregnancyCheckupProcess',
  components: {
    FormsWrap, VDatePicker, TblPregnancyCheckupProcess
  },
  mixins: [MixinMasterData],
  props: [
    'viewOnly',
    'VisitId',
    'VisitType',
    'FormId'
  ],
  data () {
    return {
      DataSubmit: {},
      dataMaster: {},
      Info: {},
      List: [],
      DataTable: [],
      loaded: false,
      IsLocked: false,
      popupTitle: '',
      TypeConfirm: '',
      tableChanged: false,
      TblSubmitSuccess: false,
      FormCode: 'A01_067_050919_VE_TAB2'
    }
  },
  async mounted () {
    this.getMasterDatas({Form: 'A01_067_050919_VE'}, () => {
    })
    await this.getInfo()
    this.APIService = await new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A01_067_050919_VE_TAB2'
    })
    this.getList()
    console.log('hasRole', this.hasRole('APIUDOPDA01_067_050919_VE'))
  },
  computed: {
    isReadOnly () {
      return this.viewOnly || this.IsLocked || this.getCurrentUsername() !== this.DataSubmit.CreatedBy || !this.hasRole('APIUDOPDA01_067_050919_VE')
      // return false
    },
    isReadOnlyTable () {
      return this.viewOnly || this.IsLocked || !this.hasRole('APIUDOPDA01_067_050919_VE')
      // return false
    },
    _ItemId () {
      return this.formId || this.$route.params.Item
    }
  },
  methods: {
    getInfo () {
      new PregnancyFollowUpRecord().find('/Info/' + this.FormCode + '/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.Info = response
      }).catch(e => {
        this.IsLocked = e.data.IsLocked24h
      })
    },
    getList () {
      this.APIService.GetList().then(res => {
        if (res.FORM_NOT_FOUND && res.FORM_NOT_FOUND.ViMessage === 'Form không tồn tại') {
        } else {
          this.List = res.Datas
          this.$route.params.Item = this.List[0].Id
        }
        this.getData()
      }).catch((e) => {
        this.loaded = true
      })
    },
    getData () {
      this.APIService.GetDetail(this._ItemId + '?hidemsg=' + true).then(res => {
        this.DataSubmit = res.data
        this.IsLocked = res.IsLock24h
        this.mapData()
        this.loaded = true
      }).catch((e) => {
        console.log(e)
        this.loaded = true
      })
    },
    mapData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              item.Value = exited.Value
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              }
              if (item.Code === 'PRFOURE106') {
                item.Value = JSON.parse(exited.Value)
              }
            } else {
              item.Value = null
            }
          })
        }
      }
      if (this.MASTERDATA['PRFOURE105'] && this.MASTERDATA['PRFOURE105'].Items[0].Value) {
        this.DataTable = JSON.parse(this.MASTERDATA['PRFOURE105'].Items[0].Value)
      }
      setTimeout(() => {
        this.dataMaster = JSON.stringify(this.MASTERDATA)
      }, 1000)
    },
    async handleSubmit (str) {
      await this.$refs.TblPregnancyCheckupProcess.submit()
      this.DataSubmit.Datas = await []
      var obj = {}
      this.MASTERDATA['PRFOURE105'].Items[0].Value = JSON.stringify(this.DataTable)
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (item.Code === 'PRFOURE106') {
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
      const DataSubmit = Object.assign({}, this.DataSubmit)
      this.APIService.UpdateForm(this._ItemId, DataSubmit).then(async res => {
        if (str !== 'confirm') {
          await this.toastedSuccess()
        }
      }).catch((e) => {
        if (str === 'confirm') {
          this.reload()
        }
      })
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA) || this.tableChanged) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    // popup canh bao
    confirmPopupBack () {
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
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Quá trình khám thai'),
        text: this.$t('Tạo mới Quá trình khám thai'),
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
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    // tạo mới form
    handleCreate () {
      this.APIService.CreateForm({}).then(res => {
        this.toastedSuccess()
        this.reload()
      })
    }
  }
}
</script>
