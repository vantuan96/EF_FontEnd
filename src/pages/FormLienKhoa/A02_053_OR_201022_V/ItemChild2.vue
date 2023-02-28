<template>
  <div v-if="loaded">
    <template v-if="ItemId">
      <div style="float: right;" class="italic mrb10">{{__t('Tạo mới bởi')}} <ad-info v-if="DataSubmit" :ad="DataSubmit.CreatedBy"/> {{__t('lúc')}} {{getFTime(DataSubmit.CreatedAt)}}</div>
      <table class="mrt10 table table-striped table-bordered v-table v-table2 none-row-curso" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <th colspan="4" width="1px" class="text-center">{{__t('TIME-OUT')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              <MdRadiosInput4 class="mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMII41']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII41']"/>
              <MdRadiosInput4 class="mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMII43']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII43']"/>
              <MdRadiosInput4 class="mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMII45']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII45']"/>
            </td>
          </tr>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTMII47'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII47']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII47']"/>
            </td>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTMII53'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII53']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII53']"/>
            </td>
          </tr>
          <tr>
            <td>{{__label(MASTERDATA['PMVPCTTMII50'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII50']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII50']"/>
            </td>
            <td>{{__label(MASTERDATA['PMVPCTTMII55'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII55']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII55']"/>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <div style="margin-bottom: 10px;"></div>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="4" width="1px">{{__label({ViName: 'Phẫu thuật viên kiểm tra', EnName: 'Surgeons review'})}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              <MdRadiosInput4 class="mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMII58']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII58']"/>
              <MdRadiosInput4 class="mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMII60']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII60']"/>
              <template v-for="(code, index) in ['PMVPCTTMII62', 'PMVPCTTMII65', 'PMVPCTTMII68']">
                <div class="flex align-center mrb10" :key="index" v-if="MASTERDATA[code]">
                  <MdRadiosInput4 style="min-width: 360px;" class="mrr10" :indexs="[0]" :vcheckbox="true" :readonly="isReadOnly" v-model="MASTERDATA[code]"/>
                  <VText :type="'number'" :maxlength="20" :decimal="true" :placeholder="__t('Nhập')" :readonly="isReadOnly" v-if="MASTERDATA[code].Items[0].Value" v-model="MASTERDATA[code].Items[1].Value"/>
                </div>
              </template>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="4" width="1px">{{__label(MASTERDATA['PMVPCTTMII71'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{__label(MASTERDATA['PMVPCTTMII72'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII72']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII72']"/>
            </td>
            <td>{{__label(MASTERDATA['PMVPCTTMII75'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII75']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII75']"/>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="4" width="1px">{{__label(MASTERDATA['PMVPCTTMII78'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{__label(MASTERDATA['PMVPCTTMII79'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII79']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII79']"/>
            </td>
            <td>{{__label(MASTERDATA['PMVPCTTMII87'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII87']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII87']"/>
            </td>
          </tr>
          <tr>
            <td>{{__label(MASTERDATA['PMVPCTTMII81'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII81']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII81']"/>
            </td>
            <td>{{__label(MASTERDATA['PMVPCTTMII90'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII90']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII90']"/>
            </td>
          </tr>
          <tr>
            <td>{{__label(MASTERDATA['PMVPCTTMII84'])}}</td>
            <td>
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMII84']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMII84']"/>
            </td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td colspan="4">
              <div class="row mrt20 mrb20">
                <div class="col-xs-6"></div>
                <div class="col-xs-2"></div>
                <div class="col-xs-3">
                  <Confirm2
                    ref="Confirm"
                    :FormCode="'A02_053_OR_201022_V'"
                    :VisitId="_VisitId"
                    :readonly="isReadOnly"
                    :MasterDataCode="'PMVPCTTMIICF05'"
                    :FormId="DataSubmit.Id"
                    :kind="'PMVPCTTMIICF05'"
                    :IsLock24h="IsLock24h"
                    :title="{ViName: 'Điều dưỡng đọc', EnName: 'Nurse'}"
                    :popupTitle="{ViName: 'Điều dưỡng đọc', EnName: 'Nurse'}"
                    @saveConfirm="handleSave"
                    @confirmSuccess="confirmSuccess"
                  />
                </div>
                <div class="col-xs-1"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p>A02_053_OR_201022_V</p>
      <LogForm :DataSubmit="DataSubmit" />
      <FloatBlock>
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
            <div class="form-group" v-if="!isReadOnly && !IsLock24h">
              <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
            </div>
          </div>
        </template>
      </FloatBlock>
    </template>
    <div v-else>
      <div class="text-center">
        <p>{{__t(`Chưa có ${FormName}`)}}</p>
        <button class="btn btn-warning" v-if="!IsLock24h && hasRole(`APICR${_VisitType}A02_053_OR_201022_V`)" @click="confirmPopup">{{__t('Tạo mới')}}</button>
      </div>
    </div>
  </div>
  <div v-else class="text-center"><v-loading/></div>
</template>

<script>
import Confirm2 from '@/components/Form/Confirm2.vue'
import VText from '@/components/Form/Input/VText.vue'
import MixinForm from './Mixin.js'
import MixinMasterData from '@/mixins/masterdata.js'
import FormApi from '@/services/FormAPI.js'
export default {
  name: 'ItemChild2',
  props: ['readonly', 'VisitId', 'VisitType'],
  mixins: [MixinForm, MixinMasterData],
  components: {
    VText,
    Confirm2
  },
  watch: {
    MASTERDATA: {
      handler (val) {
        this.edited = true
      },
      deep: true
    }
  },
  data () {
    return {
      isReadOnly: false,
      DataSubmit: null,
      IsLock24h: false,
      loaded: false,
      edited: false,
      ItemId: '',
      FormName: 'Bảng kiểm (Trước khi rạch da/ thực hiện PT/TT)'
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A02_053_OR_201022_V_TAB12',
      hidemsg: true
    })
    this.getMasterDatas({Form: 'PMVPCTTMII'}, () => {
      this.getFirstData()
    })
  },
  methods: {
    getFirstData () {
      this.APIService.CheckGetDetail().then(res => {
        this.IsLock24h = res.IsLock24h
        this.ItemId = res.Id
        this.$store.dispatch('setCurrentFormId', res.Id)
        if (res.IsCheckGetForm) {
          this.edited = false
          this.$store.dispatch('setCurrentFormId', '')
          this.loaded = true
        }
        this.getData()
      })
    },
    getData () {
      if (this.ItemId) {
        this.APIService.GetDetail(this.ItemId).then(res => {
          this.DataSubmit = res.data
          this.mapData()
          if (res.data.IsNew) {
            this.checkDinhDanh()
          }
          setTimeout(() => {
            this.confirmSuccess()
            this.edited = false
            this.loaded = true
          }, 500)
        }).catch((e) => {
          console.log(e)
          this.loaded = true
        })
      }
    },
    checkDinhDanh () {
      if (this.CurrentPatientObj && this.MASTERDATA['PMVPCTTMII43']) {
        if (this.CurrentPatientObj.Fullname ||
          this.CurrentPatientObj.DateOfBirth ||
          this.CurrentPatientObj.PID) {
          this.MASTERDATA['PMVPCTTMII43'].Items[0].Value = true
        }
      }
    },
    handleSave () {
      let Data = {
        VisitType: this._VisitType,
        VisitId: this._VisitId,
        FormCode: 'A02_053_OR_201022_V_TAB12',
        Id: this.ItemId,
        DataSubmit: this.DataSubmit
      }
      this.saveConfirm(Data)
    },
    confirmSuccess () {
      setTimeout(() => {
        this.isReadOnly = this.readonly || this.IsLock24h || (this.$refs.Confirm && this.$refs.Confirm._data.dataConfirm)
      }, 500)
    },
    handleSubmit () {
      if (this.MASTERDATA['PMVPCTTM62']) {
        if (!this.MASTERDATA['PMVPCTTM62'].Items[0].Value) {
          this.MASTERDATA['PMVPCTTM62'].Items[1].Value = ''
        }
      }
      if (this.MASTERDATA['PMVPCTTM65']) {
        if (!this.MASTERDATA['PMVPCTTM65'].Items[0].Value) {
          this.MASTERDATA['PMVPCTTM65'].Items[1].Value = ''
        }
      }
      if (this.MASTERDATA['PMVPCTTM68']) {
        if (!this.MASTERDATA['PMVPCTTM68'].Items[0].Value) {
          this.MASTERDATA['PMVPCTTM68'].Items[1].Value = ''
        }
      }
      this.mapData2MDData()
      let DataSubmit = Object.assign({}, this.DataSubmit)
      this.APIService.UpdateForm(this.ItemId, DataSubmit).then(res => {
        this.toastedSuccess()
        this.reload()
      }).catch(e => {
        console.log('e', e)
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__label({ViName: 'Trước khi rạch da/ thực hiện PT/TT', EnName: 'Before incision/begin of procedure'}),
        text: this.$t(`Tạo mới ${this.FormName}`),
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
    handleCreate () {
      this.APIService.CreateForm().then(res => {
        console.log(res)
        this.reload()
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
