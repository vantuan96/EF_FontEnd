<template>
  <div v-if="loaded">
    <template v-if="ItemId">
      <div style="float: right;" class="italic mrb10">{{__t('Tạo mới bởi')}} <ad-info v-if="DataSubmit" :ad="DataSubmit.CreatedBy"/> {{__t('lúc')}} {{getFTime(DataSubmit.CreatedAt)}}</div>
      <table class="mrt10 table table-striped table-bordered v-table v-table2 none-row-curso" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <th colspan="4" width="1px" class="text-center">{{__t('SIGN-OUT')}}</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th colspan="4">{{__label(MASTERDATA['PMVPCTTMIV105'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              <div class="flex align-center">
                <MdRadiosInput4 class="inline-block mrr30" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMIV106']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMIV106']"/>
                <div class="inline-block mrr5">{{__label(MASTERDATA['PMVPCTTMIV108'])}}</div>
                <VText class="inline-block" v-if="MASTERDATA['PMVPCTTMIV108']" :readonly="isReadOnly" :placeholder="__t('Nhập')" :rows="'1'" v-model="MASTERDATA['PMVPCTTMIV108'].Items[0].Value"/>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTMIV110'])}}</td>
            <td width="25%" align="center"><MdRadiosInput4 class="inline-block" v-if="MASTERDATA['PMVPCTTMIV110']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMIV110']"/></td>
            <td width="25%">{{__label({ViName: 'Dán nhãn bệnh phẩm', EnName: 'Specimen labeling completed'})}} <i>({{__label({ViName: 'đọc to nhãn bệnh phẩm, bao gồm cả tên người bệnh', EnName: 'read aloud label, including patient’s name'})}})</i></td>
            <td width="25%" align="center"><MdRadiosInput4 class="inline-block" v-if="MASTERDATA['PMVPCTTMIV113']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMIV113']"/></td>
          </tr>
          <tr>
            <td width="25%">{{__label(MASTERDATA['PMVPCTTMIV116'])}}</td>
            <td width="25%" align="center"><MdRadiosInput4 class="inline-block" v-if="MASTERDATA['PMVPCTTMIV116']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMIV116']"/></td>
            <td colspan="2"></td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="4">{{__label(MASTERDATA['PMVPCTTMIV119'])}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              <div class="mrb10">
                <MdRadiosInput4 class="inline-block" :indexs="[0]" :vcheckbox="true" v-if="MASTERDATA['PMVPCTTMIV120']" :readonly="isReadOnly" v-model="MASTERDATA['PMVPCTTMIV120']"/>
              </div>
              <div>
                <VText v-if="MASTERDATA['PMVPCTTMIV120']" :readonly="isReadOnly" :placeholder="__t('Nhập')" v-model="MASTERDATA['PMVPCTTMIV120'].Items[1].Value"/>
              </div>
              <div class="row mrt20 mrb20">
                <div class="col-xs-6"></div>
                <div class="col-xs-2"></div>
                <div class="col-xs-3">
                  <Confirm2
                    ref="Confirm"
                    :FormCode="'A02_053_OR_201022_V'"
                    :VisitId="_VisitId"
                    :readonly="isReadOnly"
                    :MasterDataCode="'PMVPCTTMIVCF07'"
                    :FormId="DataSubmit.Id"
                    :kind="'PMVPCTTMIVCF07'"
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
          <div class="col-md-6 col-sm-6" v-if="!isReadOnly && !IsLock24h">
            <div class="form-group">
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
import MixinMasterData from '@/mixins/masterdata.js'
import FormApi from '@/services/FormAPI.js'
export default {
  name: 'ItemChild4',
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
      isReadOnly: false,
      loaded: false,
      DataSubmit: null,
      IsLock24h: false,
      ItemId: '',
      edited: false,
      FormName: 'Bảng kiểm (Trước khi người bệnh rời phòng mổ)'
    }
  },
  computed: {
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A02_053_OR_201022_V_TAB14',
      hidemsg: true
    })
    this.getMasterDatas({Form: 'PMVPCTTMIV'}, () => {
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
    handleSave () {
      let Data = {
        VisitType: this._VisitType,
        VisitId: this._VisitId,
        FormCode: 'A02_053_OR_201022_V_TAB14',
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
        title: this.__label({ViName: 'Bảng kiểm (Trước khi người bệnh rời phòng mổ)', EnName: 'Before patient leaves operating'}),
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
