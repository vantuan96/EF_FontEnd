<template>
  <div v-if="loaded">
    <template v-if="ItemId">
      <div style="float: right;" class="italic mrb10">{{__t('Tạo mới bởi')}} <ad-info v-if="DataSubmit" :ad="DataSubmit.CreatedBy"/> {{__t('lúc')}} {{getFTime(DataSubmit.CreatedAt)}}</div>
      <table class="mrt10 table table-striped table-bordered v-table v-table2 none-row-curso" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <th colspan="4" width="1px" class="text-center">{{__t('SIGN-IN')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              <MDCheckboxGroup :readonly="IsLock24h" v-model="MASTERDATA['PMVPCTTM01']"/>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="4" width="1px">{{__label(MASTERDATA['PMVPCTTM03'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM04'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM04']" class="inline-block" :readonly="isReadOnly1 || isReadOnly2" v-model="MASTERDATA['PMVPCTTM04']"/>
            </td>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM13'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM13']" class="inline-block" :hidelabel="true" :vcheckbox="true" :readonly="isReadOnly2 || isReadOnly1" v-model="MASTERDATA['PMVPCTTM13']"/>
            </td>
          </tr>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM07'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM07']" class="inline-block" :readonly="isReadOnly1 || isReadOnly2" v-model="MASTERDATA['PMVPCTTM07']"/>
            </td>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM15'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM15']" class="inline-block" :hidelabel="true" :vcheckbox="true" :readonly="isReadOnly2 || isReadOnly1" v-model="MASTERDATA['PMVPCTTM15']"/>
            </td>
          </tr>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM10'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM10']" class="inline-block" :readonly="isReadOnly1 || isReadOnly2" v-model="MASTERDATA['PMVPCTTM10']"/>
            </td>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM17'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM17']" class="inline-block" :readonly="isReadOnly2 || isReadOnly1" v-model="MASTERDATA['PMVPCTTM17']"/>
            </td>
          </tr>
          <tr>
            <td colspan="4" style="padding-top: 0px;padding-bottom: 0px;">
              <div class="flex align-center">
                <div style="width: 50.1%;padding-top: 8px;padding-bottom: 8px;">
                  <Confirm2
                    ref="Confirm1"
                    :FormCode="'A02_053_OR_201022_V'"
                    :VisitId="_VisitId"
                    :readonly="isReadOnly1"
                    :MasterDataCode="'PMVPCTTMCF01'"
                    :FormId="DataSubmit.Id"
                    :kind="'PMVPCTTMCF01'"
                    :formcodeunlockform="'A02_053_OR_201022_V_TAB1_GM'"
                    :IsLock24h="IsLock24h"
                    :title="{ViName: 'BS Gây mê', EnName: 'Anesthesiologist'}"
                    :popupTitle="{ViName: 'BS Gây mê', EnName: 'Anesthesiologist'}"
                    @saveConfirm="handleSave"
                    @confirmSuccess="confirmSuccess1"
                  />
                </div>
                <div style="width: 50%;padding-top: 8px;padding-bottom: 8px;">
                  <Confirm2
                    ref="Confirm2"
                    :FormCode="'A02_053_OR_201022_V'"
                    :VisitId="_VisitId"
                    :readonly="isReadOnly2"
                    :MasterDataCode="'PMVPCTTMCF02'"
                    :FormId="DataSubmit.Id"
                    :kind="'PMVPCTTMCF02'"
                    :formcodeunlockform="'A02_053_OR_201022_V_TAB1_GM'"
                    :IsLock24h="IsLock24h"
                    :title="{ViName: 'ĐD Gây mê', EnName: 'Nurse anesthetist'}"
                    :popupTitle="{ViName: 'ĐD Gây mê', EnName: 'Nurse anesthetist'}"
                    @saveConfirm="handleSave"
                    @confirmSuccess="confirmSuccess2"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="4" width="1px">{{__label(MASTERDATA['PMVPCTTM20'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM21'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM21']" class="inline-block" :readonly="isReadOnly3" v-model="MASTERDATA['PMVPCTTM21']"/>
            </td>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM27'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM27']" class="inline-block" :readonly="isReadOnly3" v-model="MASTERDATA['PMVPCTTM27']"/>
            </td>
          </tr>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM24'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM24']" class="inline-block" :readonly="isReadOnly3" v-model="MASTERDATA['PMVPCTTM24']"/>
            </td>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTM30'])}}</td>
            <td width="25%" align="center">
              <MdRadiosInput4 v-if="MASTERDATA['PMVPCTTM30']" class="inline-block" :readonly="isReadOnly3" v-model="MASTERDATA['PMVPCTTM30']"/>
            </td>
          </tr>
          <tr>
            <td colspan="4" style="padding-top: 0px;padding-bottom: 0px;">
              <div class="flex align-center">
                <div style="width: 50%;important;padding-top: 8px;padding-bottom: 8px;">
                </div>
                <div style="width: 50%;padding-top: 8px;padding-bottom: 8px;">
                  <Confirm2
                    ref="Confirm3"
                    :FormCode="'A02_053_OR_201022_V'"
                    :VisitId="_VisitId"
                    :readonly="isReadOnly3"
                    :MasterDataCode="'PMVPCTTMCF03'"
                    :FormId="DataSubmit.Id"
                    :kind="'PMVPCTTMCF03'"
                    :formcodeunlockform="'A02_053_OR_201022_V_TAB1_DCKT'"
                    :IsLock24h="IsLock24h"
                    :title="{ViName: 'Điều dưỡng dụng cụ', EnName: 'Scrub nurse'}"
                    :popupTitle="{ViName: 'Điều dưỡng dụng cụ', EnName: 'Scrub nurse'}"
                    @saveConfirm="handleSave"
                    @confirmSuccess="confirmSuccess3"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="4" width="1px">{{__label(MASTERDATA['PMVPCTTM33'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4" style="border-bottom: 0px!important;">
              <div>
                <MdRadiosInput4 class="mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTM34']" :readonly="isReadOnly4" v-model="MASTERDATA['PMVPCTTM34']"/>
                <MdRadiosInput4 class="mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTM36']" :readonly="isReadOnly4" v-model="MASTERDATA['PMVPCTTM36']"/>
                <div class="flex align-center" v-if="MASTERDATA['PMVPCTTM38']">
                  <div class="no-wrap mrr5">{{__label(MASTERDATA['PMVPCTTM38'])}}:</div>
                  <VText :rows="'1'" class="full-width" :readonly="isReadOnly4" :placeholder="__t('Nhập')" v-model="MASTERDATA['PMVPCTTM38'].Items[0].Value"/>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="border-top: 0px!important;border-right: 0px!important;"></td>
            <td colspan="2" style="border-top: 0px!important;border-left: 0px!important;">
              <Confirm2
                  ref="Confirm4"
                  :FormCode="'A02_053_OR_201022_V'"
                  :VisitId="_VisitId"
                  :readonly="isReadOnly4"
                  :MasterDataCode="'PMVPCTTMCF04'"
                  :FormId="DataSubmit.Id"
                  :kind="'PMVPCTTMCF04'"
                  :formcodeunlockform="'A02_053_OR_201022_V_TAB1_CNTH'"
                  :IsLock24h="IsLock24h"
                  :title="{ViName: 'Điều dưỡng chạy ngoài', EnName: 'Circulating nurse'}"
                  :popupTitle="{ViName: 'Điều dưỡng chạy ngoài', EnName: 'Circulating nurse'}"
                  @saveConfirm="handleSave"
                  @confirmSuccess="confirmSuccess4"
                />
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
            <div class="form-group" v-if="!IsLock24h">
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
import MDCheckboxGroup from '@/components/Form/Input/MDCheckboxGroup.vue'
import VText from '@/components/Form/Input/VText.vue'
import Confirm2 from '@/components/Form/Confirm2.vue'
import MixinForm from './Mixin.js'
import FormApi from '@/services/FormAPI.js'
import MixinMasterData from '@/mixins/masterdata.js'
export default {
  name: 'ItemChild1',
  props: ['readonly', 'VisitId', 'VisitType'],
  mixins: [MixinForm, MixinMasterData],
  components: {
    MDCheckboxGroup,
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
      isReadOnly1: false,
      isReadOnly2: false,
      isReadOnly3: false,
      isReadOnly4: false,
      loaded: false,
      DataSubmit: null,
      IsLock24h: false,
      ItemId: '',
      FormName: 'Trước khi gây mê/ gây tê',
      edited: false
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A02_053_OR_201022_V_TAB11',
      hidemsg: true
    })
    this.getMasterDatas({Form: 'PMVPCTTM'}, () => {
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
      this.APIService.GetDetail(this.ItemId).then(res => {
        this.DataSubmit = res.data
        this.mapData()
        if (res.data.IsNew) {
          this.checkDinhDanh()
        }
        setTimeout(() => {
          this.confirmSuccess1()
          this.confirmSuccess2()
          this.confirmSuccess3()
          this.confirmSuccess4()
          this.edited = false
          this.loaded = true
        }, 500)
      }).catch((e) => {
        console.log(e)
        this.loaded = true
      })
    },
    handleSave () {
      let Data = {
        VisitType: this._VisitType,
        VisitId: this._VisitId,
        FormCode: 'A02_053_OR_201022_V_TAB11',
        Id: this.ItemId,
        DataSubmit: this.DataSubmit
      }
      this.saveConfirm(Data)
    },
    confirmSuccess1 () {
      setTimeout(() => {
        this.isReadOnly1 = this.readonly || this.IsLock24h || (this.$refs.Confirm1 && this.$refs.Confirm1._data.dataConfirm)
      }, 500)
    },
    confirmSuccess2 () {
      setTimeout(() => {
        this.isReadOnly2 = this.readonly || this.IsLock24h || (this.$refs.Confirm2 && this.$refs.Confirm2._data.dataConfirm)
      }, 500)
    },
    confirmSuccess3 () {
      setTimeout(() => {
        this.isReadOnly3 = this.readonly || this.IsLock24h || (this.$refs.Confirm3 && this.$refs.Confirm3._data.dataConfirm)
      }, 500)
    },
    confirmSuccess4 () {
      setTimeout(() => {
        this.isReadOnly4 = this.readonly || this.IsLock24h || (this.$refs.Confirm4 && this.$refs.Confirm4._data.dataConfirm)
      }, 500)
    },
    checkDinhDanh () {
      if (this.CurrentPatientObj && this.MASTERDATA['PMVPCTTM01']) {
        if (this.CurrentPatientObj.Fullname ||
          this.CurrentPatientObj.DateOfBirth ||
          this.CurrentPatientObj.PID) {
          this.MASTERDATA['PMVPCTTM01'].Items[0].Value = true
        }
      }
    },
    handleSubmit () {
      this.mapData2MDData()
      let DataSubmit = Object.assign({}, this.DataSubmit)
      console.log('DataSubmit', DataSubmit)
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
        title: this.__label({ViName: 'Trước khi gây mê/ gây tê', EnName: 'Before anesthesia'}),
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
  .right {
    float: right;
  }
  .inline-block {
    display: inline-block!important;
  }
</style>
