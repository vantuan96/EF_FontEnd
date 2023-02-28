<template>
  <div class="translation-view">
    <CustomerInfo v-if="!isTranslate" :data="dataInfoCustomer"></CustomerInfo>
    <div v-if="!ForDoctor && data.Note">
      <label>{{__t('Ghi chú của bác sĩ')}}</label>
      <p class="note-text-box">{{data.Note}}</p>
    </div>
    <table class="table table-striped table-bordered v-table" id="customer-tbl" v-if="loaded">
      <thead v-if="!ForDoctor">
        <tr>
          <td colspan="2"><h4>{{__label(data)}}</h4></td>
        </tr>
      </thead>
      <thead class="thead-337ab7">
        <tr>
          <td width="50%" class="text-center">{{__t(data.FromLanguage)}}</td>
          <td width="50%" class="text-center">{{__t(data.ToLanguage)}}</td>
        </tr>
      </thead>
      <tbody class="tbl-tran">
        <tr :data="item" :key="index" v-for="(item ,index) in tmp">
          <td colspan="2" class="padding-25">
            <div class="row">
              <div v-if="MDDATAITEM[item.Code]" class="col-md-6">
                <label>{{getName(__label(MDDATAITEM[item.Code]))}}</label>
                <p v-html="item.Value" class="current-text"></p>
              </div>
              <div v-if="TOMASTERDATA[item.Code]" class="col-md-6">
                <label>{{(getName(TOMASTERDATA[item.Code].EnName))}} <button v-if="!(data.Status === 3 || (data.Status === 2 && !ForDoctor)) && item.Value" class="btn btn-sync-data" @click="handleCopy(item)">Copy</button></label>
                <p>
                  <textarea-autosize :readonly="data.Status === 3 || (data.Status === 2 && !ForDoctor)" class="form-control min-h-50" v-model="TOMASTERDATA[item.Code].Value" />
                </p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="!ForDoctor">
        <tr>
          <td>
            <button v-if="data.Status === 0 || data.Status === 1" class="btn btn-white-gradient btn-block" @click="requestConfirm">{{__t('Yêu cầu phê duyệt')}}</button>
            <b v-if="data.Status === 2"><i class="fa fa-clock-o" aria-hidden="true"></i> {{__t('Đang chờ phê duyệt')}}</b>
            <b v-if="data.Status === 3"><i class="fa fa-check" aria-hidden="true"></i>{{__t('Đã phê duyệt')}}</b>
          </td>
          <td><button v-if="data.Status !== 3 && data.Status !== 2" v-shortkey="['ctrl', 's']" @shortkey="save()" class="btn btn-yellow-gradient btn-block" @click="save()">{{__t('Lưu')}}</button></td>
        </tr>
      </tfoot>
      <tfoot v-else>
        <tr v-if="data.Status === 2">
          <td colspan="2">
            <label>{{__t('Ghi chú yêu cầu chỉnh sửa')}}</label>
            <textarea-autosize class="form-control" v-model="data.Note"/>
          </td>
        </tr>
        <tr>
          <td>
            <button v-if="data.Status === 2" class="btn btn-white-gradient" @click="RequestChange">{{__t('Yêu cầu chỉnh sửa')}}</button>
            <b v-if="data.Status === 3"><i class="fa fa-check" aria-hidden="true"></i>{{__t('Đã phê duyệt')}}</b>
            <template v-else-if="data.Status !== 2 && data.Status !== 3">
              <button v-if="isRequester" class="btn btn-danger" @click="cancel">{{__t('Hủy yêu cầu dịch')}}</button>
            </template>
          </td>
          <td>
            <div class="row">
              <div class="col-md-6"><button v-shortkey="['ctrl', 's']" @shortkey="save()" v-if="data.Status === 2" class="btn btn-yellow-gradient btn-block" @click="save()">{{__t('Lưu')}}</button></div>
              <div class="col-md-6"><button v-if="data.Status === 2" class="btn btn-yellow-gradient btn-block" @click="confirm">{{__t('Phê duyệt')}}</button></div>
            </div>
          </td>
        </tr>
      </tfoot>
      <tfoot>
        <tr>
          <td colspan="2">
            <label>{{__t('Yêu cầu dịch bởi:')}} <AdInfo :ad="data.CreatedBy" /></label>
          </td>
        </tr>
      </tfoot>
    </table>
    <div v-else class="loading-text"><v-loading/></div>
    <logs v-if="loaded" :mdcode="data.ToLanguage + MDDATA[VisitTypeGroupCode]" :EdId="this.$route.params.Id" :Type="'Translation'" />
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 * The home index page.
 */
import VLayout from '@/layouts/Default.vue'
import Translation from '@/services/Translation'
import Logs from '@/components/Logs.vue'
// import VDatePicker from '@/components/VDateTimePicker.vue'
import NProgress from 'nprogress'
// import moment from 'moment'
import _ from 'lodash'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import CustomerInfo from './CustomerInfo.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'TEMP',
  props: ['Id', 'ForDoctor', 'PkntVersion', 'isTranslate'],
  data () {
    return {
      data: {},
      dataInfoCustomer: {},
      MDDATA: {
        OPD: 'OPDTRANMR0',
        EOC: 'OPDTRANMR0',
        ED: 'EDTRANMR0',
        IPD: 'IPDTRANDMR'
      },
      MDDATAITEM: {},
      TOMASTERDATA: {},
      loaded: false,
      changeNote: null,
      tmp: [],
      EnName: '',
      FromLanguage: 'VI',
      ToLanguage: 'EN',
      VisitTypeGroupCode: 'ED',
      dataMaster: ''
    }
  },
  // VIEDTRANMR0
  // ENEDTRANMR0
  // VIOPDTRANMR0
  // ENOPDTRANMR0
  mixins: [MixinMasterData, MixinForm],
  /**
   * The components that the page can use.
   */
  components: {
    CustomerInfo,
    VLayout,
    Logs
  },
  mounted () {
    this.readNotification()
    this.getData()
  },
  watch: {
    TOMASTERDATA: {
      handler (a, b) {
        this.edited = true
      },
      deep: true
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.query.plan || !this.edited) {
      next()
      return
    }
    this.$modal.show('dialog', {
      title: this.__t('Cảnh báo'),
      text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
      class: 'v-dialog v-dialog-warning',
      buttons: [
        {
          title: this.__t('Đồng ý'),
          class: 'btn',
          handler: () => {
            next()
            this.$modal.hide('dialog')
          }
        },
        {
          title: this.__t('Hủy bỏ'),
          class: 'btn bg-yellow',
          handler: () => {
            next(false)
            this.$modal.hide('dialog')
          }
        }
      ]
    })
  },
  computed: {
    isRequester () {
      // return this.$store.state.account.Username === this.data.CreatedBy && (this.data.Datas || []).length === 0
      return this.$store.state.account.Username === this.data.CreatedBy
    }
  },
  methods: {
    RequestChange () {
      this.$modal.show('dialog', {
        title: this.__t('Yêu cầu thay đổi bản dịch!'),
        text: this.__t('Bạn có chắc gửi yêu cầu bản dịch đến thư ký chuyên môn?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.sendRequestChange()
              this.$modal.hide('dialog')
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
    },
    sendRequestChange () {
      var _Exception = [
        {
          key: 'TKCMSENDREQUESTCHANGE',
          value: 'Gửi yêu cầu thay đổi'
        }
      ]
      new Translation().update('RequestChange/' + (this.Id || this.$route.params.Id), {Note: this.data.Note, _Exception: _Exception}).then(response => {
        this.toastedSuccess()
        this.data.Status = 1
      })
    },
    sendCancel () {
      new Translation().update('Cancel/' + (this.Id || this.$route.params.Id)).then(response => {
        this.toastedSuccess('Hủy yêu cầu dịch thành công')
        this.reload()
      })
    },
    cancel () {
      this.$modal.show('dialog', {
        title: this.__t('Yêu cầu xác nhận!'),
        text: this.__t('Bạn muốn hủy yêu cầu dịch BCYT này. Bạn có chắc chắn gửi yêu cầu?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.sendCancel()
              this.$modal.hide('dialog')
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
    },
    confirm () {
      this.$modal.show('dialog', {
        title: this.__t('Xác nhận bản dịch!'),
        text: this.__t('Sau khi phê duyệt, bản dịch sẽ không được phép chỉnh sửa. Bạn có chắc chắn phê duyệt ?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.sendConfirm()
              this.$modal.hide('dialog')
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
    },
    async sendConfirm () {
      await this.save(true)
      var data = {
        _Exception: [
          {
            key: 'TKCMCONFIRM',
            value: 'Đã phê duyệt'
          }
        ]
      }
      new Translation().update('accept/' + (this.Id || this.$route.params.Id), data).then(response => {
        this.toastedSuccess()
        // this.data.Status = 3
        // push to parrent
        this.$emit('confirmed')
      })
    },
    requestConfirm () {
      this.$modal.show('dialog', {
        title: this.__t('Yêu cầu xác nhận!'),
        text: this.__t('Bạn sẽ không thể chỉnh sửa lại sau khi gửi yêu cầu phê duyệt. Bạn có chắc chắn gửi yêu cầu?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.sendRequestConfirm()
              this.$modal.hide('dialog')
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
    },
    async sendRequestConfirm () {
      await this.save(true)
      var data = {
        _Exception: [
          {
            key: 'TKCMSENDCONFIRM',
            value: 'Gửi yêu cầu phê duyệt'
          }
        ]
      }
      new Translation().update('RequestConfirm/' + (this.Id || this.$route.params.Id), data).then(response => {
        this.toastedSuccess(this.$t('Gửi phê duyệt thành công!'))
        this.data.Status = 2
      })
    },
    saveForDoctor () {
    },
    async save (hiddenmsg) {
      NProgress.start()
      this.data.Datas = []
      this.data._Exception = []
      for (const property in this.TOMASTERDATA) {
        if (this.TOMASTERDATA[property].Group) {
          this.data._Exception.push({
            key: property,
            value: this.TOMASTERDATA[property].Value,
            ViName: this.TOMASTERDATA[property].ViName,
            EnName: this.TOMASTERDATA[property].EnName
          })
          var cloneObj = this.cloneObj(this.data.Datas)
          var exited = _.findIndex(cloneObj, e => {
            return e.Code === this.TOMASTERDATA[property].Group
          })
          if (exited >= 0) {
            this.data.Datas[exited].Value.push({
              Value: this.TOMASTERDATA[property].Value || '',
              ViName: this.TOMASTERDATA[property].ViName,
              EnName: this.TOMASTERDATA[property].EnName,
              Id: this.TOMASTERDATA[property].Id
            })
          } else {
            this.data.Datas.push({
              Code: this.TOMASTERDATA[property].Group,
              Value: [
                {
                  Value: this.TOMASTERDATA[property].Value || '',
                  ViName: this.TOMASTERDATA[property].ViName,
                  EnName: this.TOMASTERDATA[property].EnName
                }
              ],
              Id: this.TOMASTERDATA[property].Id
            })
          }
        } else {
          this.data.Datas.push({
            Code: property,
            Value: this.TOMASTERDATA[property].Value || '',
            Id: this.TOMASTERDATA[property].Id
          })
        }
      }
      this.data.Datas.map(e => {
        if (typeof e.Value === 'object') {
          e.Value = JSON.stringify(e.Value)
        }
        if (e.Value === null) {
          e.Value = ''
        }
        return e
      })
      await new Translation().update('update/' + (this.Id || this.$route.params.Id), this.data).then(response => {
        if (!hiddenmsg) this.toastedSuccess()
      })
    },
    getData () {
      new Translation().find('MedicalReport/Trans/' + (this.Id || this.$route.params.Id)).then(response => {
        this.changeNote = response.Note
        this.data = response
        this.dataInfoCustomer = response
        this.VisitTypeGroupCode = response.VisitTypeGroupCode
        this.FromLanguage = response.FromLanguage
        this.ToLanguage = response.ToLanguage
        this.EnName = response.EnName
        response.FromDatas.forEach(data => {
          if (data.Value && typeof data.Value === 'object') {
            data.Value.forEach((v, index) => {
              if (v.Code !== 'OPDOENTUOI19' && v.Code !== 'OPDOENTUOI5' && v.Code !== 'OPDOENTUOI519') {
                var code = data.Code + '-' + index
                this.tmp.push({
                  Code: code,
                  Value: (v.Value).replaceAll('&emsp;', ' '),
                  ViName: (v.ViName).replaceAll('&emsp;', ' '),
                  EnName: (v.EnName).replaceAll('&emsp;', ' ')
                })
              }
            })
          } else {
            this.tmp.push(data)
          }
        })
        let tocode = response.VisitTypeGroupCode + '_' + response.EnName + '_' + response.ToLanguage
        let fromcode = response.VisitTypeGroupCode + '_' + response.EnName + '_' + response.FromLanguage
        this.getRawMasterDatas({Clinic: fromcode}, mddata => {
          mddata.forEach(e => {
            e.Items.forEach(item => {
              this.MDDATAITEM[item.Code] = {
                Code: item.Code,
                Value: (item.Value).replaceAll('&emsp;', ' '),
                ViName: (e.ViName).replaceAll('&emsp;', ' '),
                EnName: (e.EnName).replaceAll('&emsp;', ' ')
              }
            })
          })
        })
        this.getRawMasterDatas({Clinic: tocode}, mddata => {
          mddata.forEach(e => {
            e.Items.forEach(item => {
              var finded = response.Datas.find(e => e.Code === item.Code)
              var toObj = finded || response.FromDatas.find(e => e.Code === item.Code)
              if (this.isJson(toObj.Value)) {
                toObj.Value = this.JSONParse(toObj.Value)
              }
              if (toObj.Value && typeof toObj.Value === 'object') {
                toObj.Value.forEach((v, index) => {
                  var code = toObj.Code + '-' + index
                  var newObj = {
                    Code: code,
                    Value: finded ? this.formatText(v.Value) : null,
                    ViName: (v.ViName).replaceAll('&emsp;', ' '),
                    EnName: (v.EnName).replaceAll('&emsp;', ' '),
                    Group: toObj.Code,
                    Id: finded ? finded.Id : null
                  }
                  this.$set(this.TOMASTERDATA, code, newObj)
                  // this.TOMASTERDATA[code] = newObj
                  this.MDDATAITEM[code] = newObj
                })
              } else {
                this.$set(this.TOMASTERDATA, item.Code, {
                  Code: item.Code,
                  Value: finded ? this.formatText(finded.Value) : null,
                  ViName: (e.ViName).replaceAll('&emsp;', ' '),
                  EnName: (e.EnName).replaceAll('&emsp;', ' '),
                  Id: finded ? finded.Id : null
                })
                // this.TOMASTERDATA[item.Code] = {
                //   Code: item.Code,
                //   Value: finded ? finded.Value : null,
                //   ViName: e.ViName,
                //   EnName: e.EnName,
                //   Id: finded ? finded.Id : null
                // }
              }
            })
          })
          setTimeout(() => {
            this.loaded = true
          }, 500)
        })
        this.dataMaster = JSON.stringify(this.TOMASTERDATA)
      })
    },
    readNotification () {
    },
    getName (str) {
      if ((this.data.PkntVersion === 2 || this.PkntVersion === 2)) {
        str = this.dichTextVer2Pknt(str)
      } else {
        str = this.dichTextTKCM(str)
      }
      return str
    },
    handleCopy (item) {
      let rawText = (this.TOMASTERDATA[item.Code].Value || '') + (this.TOMASTERDATA[item.Code].Value ? ' ' : '') + item.Value
      this.TOMASTERDATA[item.Code].Value = this.formatText(rawText)
    },
    formatText (text) {
      if (text) {
        let convertToString = text.toString()
        return convertToString.replaceAll('&emsp;', ' ')
      }
      return text
    }
  }
}
</script>
