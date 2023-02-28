<template>
  <div v-if="loaded">
    <template v-if="ItemId">
      <div style="float: right;" class="italic mrb10">{{__t('Tạo mới bởi')}} <ad-info v-if="DataSubmit" :ad="DataSubmit.CreatedBy"/> {{__t('lúc')}} {{getFTime(DataSubmit.CreatedAt)}}</div>
      <table class="mrt10 table table-striped table-bordered v-table v-table2 none-row-curso" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <th colspan="4" width="1px" class="text-center">{{__label({ViName: 'TIME-OUT bổ sung (nếu áp dụng)', EnName: 'ADDITIONAL TIME-OUT (if applicable)'})}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              <MdRadiosInput4 class="inline-block mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMIII94']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMIII94']"/>
              <MdRadiosInput4 class="inline-block mrb10" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMIII96']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMIII96']"/>
            </td>
          </tr>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTMIII98'])}}</td>
            <td width="25%" align="center"><MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMIII98']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMIII98']"/></td>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTMIII101'])}}</td>
            <td width="25%" align="center"><MdRadiosInput4 v-if="MASTERDATA['PMVPCTTMIII101']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMIII101']"/></td>
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
                    :MasterDataCode="'PMVPCTTMIIICF06'"
                    :FormId="DataSubmit.Id"
                    :kind="'PMVPCTTMIIICF06'"
                    :IsLock24h="IsLock24h"
                    :title="{ViName: 'Điều dưỡng', EnName: 'Nurse'}"
                    :popupTitle="{ViName: 'Điều dưỡng', EnName: 'Nurse'}"
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
import MixinForm from './Mixin.js'
import MixinMasterData from '@/mixins/masterdata.js'
import FormApi from '@/services/FormAPI.js'
export default {
  name: 'ItemChild3',
  props: ['readonly', 'VisitId', 'VisitType'],
  mixins: [MixinForm, MixinMasterData],
  components: {
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
      loaded: false,
      DataSubmit: null,
      IsLock24h: false,
      ItemId: '',
      edited: false,
      FormName: 'Bảng kiểm (Trong quá trình thực hiện PT/TT)'
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A02_053_OR_201022_V_TAB13',
      hidemsg: true
    })
    this.getMasterDatas({Form: 'PMVPCTTMIII'}, () => {
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
    confirmSuccess () {
      setTimeout(() => {
        this.isReadOnly = this.readonly || this.IsLock24h || (this.$refs.Confirm && this.$refs.Confirm._data.dataConfirm)
      }, 500)
    },
    handleSave () {
      let Data = {
        VisitType: this._VisitType,
        VisitId: this._VisitId,
        FormCode: 'A02_053_OR_201022_V_TAB13',
        Id: this.ItemId,
        DataSubmit: this.DataSubmit
      }
      this.saveConfirm(Data)
    },
    handleSubmit () {
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
        title: this.__label({ViName: 'Bảng kiểm (Trong quá trình thực hiện PT/TT)', EnName: 'During the surgery/procedure'}),
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
