<template>
  <div>
    <table class="table table-striped table-bordered v-table none-row-curso" id="customer-tbl">
      <tbody>
        <tr>
          <td width="50%">
            <div>{{__label(MASTERDATA['DGNCVKDK03'])}}:</div>
          </td>
          <td>
            <MdRadiosInput4 :indexs="[0]" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK03']" v-model="MASTERDATA['DGNCVKDK03']"/>
            <MdRadiosInput4 :indexs="[1]" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK03']" v-model="MASTERDATA['DGNCVKDK03']"/>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="fw600 bg-F5F5F5">{{__label(MASTERDATA['DGNCVKDK06'])}}</td>
        </tr>
        <tr>
          <td width="50%" class="fw600 bg-F5F5F5">{{__label(MASTERDATA['DGNCVKDK07'])}}</td>
          <td class="fw600 bg-F5F5F5">{{__label(MASTERDATA['DGNCVKDK19'])}}</td>
        </tr>
        <tr>
          <td class="bg-white" width="50%">
            <MdRadiosInput4 :indexs="[0]" @change="handleChange" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK07']" v-model="MASTERDATA['DGNCVKDK07']"/>
            <MdRadiosInput4 :indexs="[1]" :wrap="true" @change="handleChange" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK07']" v-model="MASTERDATA['DGNCVKDK07']"/>
            <MdRadiosInput4 :indexs="[2]" @change="handleChange" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK07']" v-model="MASTERDATA['DGNCVKDK07']"/>
            <MdRadiosInput4 :indexs="[3]" @change="handleChange" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK07']" v-model="MASTERDATA['DGNCVKDK07']"/>
            <MdRadiosInput4 :indexs="[4]" @change="handleChange" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK07']" v-model="MASTERDATA['DGNCVKDK07']"/>
            <MdRadiosInput4 :indexs="[5]" @change="handleChange" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK07']" v-model="MASTERDATA['DGNCVKDK07']"/>
            <MdRadiosInput4 :indexs="[6]" @change="handleChange" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK07']" v-model="MASTERDATA['DGNCVKDK07']"/>
            <MdRadiosInput4 :indexs="[7]" @change="handleChange" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK07']" v-model="MASTERDATA['DGNCVKDK07']"/>
            <MdRadiosInput4 :indexs="[8]" @change="handleChange" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK07']" v-model="MASTERDATA['DGNCVKDK07']"/>
            <MdRadiosInput4 :indexs="[9]" @change="handleChange2" :miniRadio="['DGNCVKDK17', 'DGNCVKDK18']" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK07']" v-model="MASTERDATA['DGNCVKDK07']"/>
            <MdRadiosInput4 :indexs="[10]" @change="handleChange2" :miniRadio="['DGNCVKDK17', 'DGNCVKDK18']" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK07']" v-model="MASTERDATA['DGNCVKDK07']"/>
          </td>
          <td class="bg-white">
            <MdRadiosInput4 :indexs="[0]" @change="handleChange3" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK19']" v-model="MASTERDATA['DGNCVKDK19']"/>
            <MdRadiosInput4 :indexs="[1]" @change="handleChange3" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK19']" v-model="MASTERDATA['DGNCVKDK19']"/>
            <MdRadiosInput4 :indexs="[2]" @change="handleChange3" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK19']" v-model="MASTERDATA['DGNCVKDK19']"/>
            <MdRadiosInput4 :indexs="[3]" @change="handleChange3" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK19']" v-model="MASTERDATA['DGNCVKDK19']"/>
            <MdRadiosInput4 :indexs="[4]" @change="handleChange3" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK19']" v-model="MASTERDATA['DGNCVKDK19']"/>
            <MdRadiosInput4 :indexs="[5]" @change="handleChange3" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK19']" v-model="MASTERDATA['DGNCVKDK19']"/>
            <MdRadiosInput4 :indexs="[6]" @change="handleChange3" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK19']" v-model="MASTERDATA['DGNCVKDK19']"/>
            <MdRadiosInput4 :indexs="[7]" @change="handleChange3" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK19']" v-model="MASTERDATA['DGNCVKDK19']"/>
            <MdRadiosInput4 :indexs="[8]" @change="handleChange3" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK19']" v-model="MASTERDATA['DGNCVKDK19']"/>
            <MdRadiosInput4 :indexs="[9]" @change="handleChange3" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK19']" v-model="MASTERDATA['DGNCVKDK19']"/>
            <MdRadiosInput4 :indexs="[10]" :vcheckbox="true" :miniRadio="['DGNCVKDK30']" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK19']" v-model="MASTERDATA['DGNCVKDK19']"/>
          </td>
        </tr>
        <tr>
          <td class="bg-F5F5F5" width="50%">
            <div class="fw600">{{__label(MASTERDATA['DGNCVKDK35'])}}:</div>
            <MdRadiosInput4 :indexs="[0, 1]" :miniRadio="['DGNCVKDK36', 'DGNCVKDK37']" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK35']" v-model="MASTERDATA['DGNCVKDK35']"/>
          </td>
          <td class="bg-F5F5F5"><div class="fw600">{{__label(MASTERDATA['DGNCVKDK31'])}}:</div></td>
        </tr>
        <tr>
          <td width="50%" class="bg-white">
            <div style="min-height: 265px;">
              <template v-if="MASTERDATA['DGNCVKDK35'] && MASTERDATA['DGNCVKDK35'].Items[0].Value">
                <MdRadiosInput4 :indexs="[2]" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK35']" v-model="MASTERDATA['DGNCVKDK35']"/>
                <MdRadiosInput4 :indexs="[3]" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK35']" v-model="MASTERDATA['DGNCVKDK35']"/>
                <MdRadiosInput4 :indexs="[4]" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK35']" v-model="MASTERDATA['DGNCVKDK35']"/>
                <MdRadiosInput4 :indexs="[5]" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK35']" v-model="MASTERDATA['DGNCVKDK35']"/>
                <MdRadiosInput4 :indexs="[6]" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK35']" v-model="MASTERDATA['DGNCVKDK35']"/>
                <MdRadiosInput4 class="mrr10" :indexs="[7]" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK35']" v-model="MASTERDATA['DGNCVKDK35']"/>
                <VText class="full-width mrr10" id="DGNCVKDK44" v-if="MASTERDATA['DGNCVKDK35'] && MASTERDATA['DGNCVKDK35'].Items[7].Value" :readonly="isReadOnly" :placeholder="__t('Nhập')" :rows="'1'" v-model="MASTERDATA['DGNCVKDK35'].Items[8].Value"/>
              </template>
            </div>
          </td>
          <td class="bg-white on-top">
            <MdRadiosInput4 :indexs="[0]" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK31']" v-model="MASTERDATA['DGNCVKDK31']"/>
            <MdRadiosInput4 :indexs="[1]" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK31']" v-model="MASTERDATA['DGNCVKDK31']"/>
            <MdRadiosInput4 :indexs="[2]" :vcheckbox="true" :readonly="isReadOnly" v-if="MASTERDATA['DGNCVKDK31']" v-model="MASTERDATA['DGNCVKDK31']"/>
          </td>
        </tr>
      </tbody>
    </table>
    <table width="100%">
      <tr>
        <td width="50%"></td>
        <td>
          <Confirm2
            ref="Confirm"
            :FormCode="'A02_006_221221_V'"
            :VisitId="_VisitId"
            :readonly="isReadOnly"
            :MasterDataCode="'DGNCVKDK45'"
            :FormId="DataSubmit.Id"
            :kind="'DGNCVKDK45'"
            :formcodeunlockform="'A02_053_OR_201022_V_TAB1_GM'"
            :IsLock24h="isReadOnly"
            :title="{ViName: 'Bác sỹ', EnName: 'Bác sỹ'}"
            :popupTitle="{ViName: 'Bác sỹ', EnName: 'Bác sỹ'}"
            :dontConfirmSite="true"
            :DisplayName="true"
            :HasValidate="true"
            @saveConfirm="handleSave"
            @confirmSuccess="confirmSuccess"
          />
        </td>
      </tr>
    </table>
    <div class="full-width mrb10 mrt10">
      <BaseIcon :url="'PhieuDanhGiaNguyCoViKhuanDaKhang2.png'" :width="'100%'"/>
    </div>
    <FloatBlock :openBack="true" @handleBack="handleBack" v-if="!viewOnly">
        <template slot='buttons'>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-6 col-sm-6" v-if="!isReadOnly">
            <div class="form-group1">
              <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
            </div>
          </div>
        </template>
    </FloatBlock>
  </div>
</template>

<script>
import MixinMasterData from '@/mixins/masterdata.js'
import FormApi from '@/services/FormAPI.js'
import _ from 'lodash'
import VText from '@/components/Form/Input/VText.vue'
import Confirm2 from '@/components/Form/Confirm2.vue'
export default {
  name: 'A02_006_221221_VForm',
  props: ['viewOnly', 'readonly', 'VisitId', 'VisitType', 'ItemId'],
  mixins: [MixinMasterData],
  components: {
    VText, Confirm2
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
      DataSubmit: null,
      loaded: false,
      IsLock24h: false,
      edited: false,
      isReadOnly: false,
      hasErr: false
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A02_006_221221_V'
    })
    this.getMasterDatas({Form: 'DGNCVKDK'}, () => {
      this.getData()
    })
  },
  methods: {
    getData () {
      this.loaded = false
      if (!this.ItemId) return
      this.APIService.GetDetail(this.ItemId + '?hidemsg=' + true).then(res => {
        this.DataSubmit = res.data
        this.IsLock24h = res.IsLock24h
        this.mapData()
        this.confirmSuccess()
        setTimeout(() => {
          this.edited = false
          this.loaded = true
          this.$store.dispatch('setCurrentFormId', res.data.Id)
        }, 500)
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
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else {
                item.Value = exited.Value
              }
            } else {
              item.Value = null
            }
          })
        }
      }
    },
    async handleSubmit (str) {
      this.validateForm()
      this.checkData()
      await this.mapData2MDData()
      const DataSubmit = Object.assign({}, this.DataSubmit)
      this.APIService.UpdateForm(this.ItemId, DataSubmit).then(res => {
        if (str && str === 'confirm') {
        } else {
          this.toastedSuccess()
          this.reload()
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // validate form
    validateForm () {
      let errors = []
      if (this.getValueOfMASTERDATA2('DGNCVKDK35', 'DGNCVKDK43')) {
        if (!this.getValueOfMASTERDATA2('DGNCVKDK35', 'DGNCVKDK44')) {
          const obj = {
            ViName: 'Chỉ định xét nghiệm sàng lọc khác',
            EnName: 'Chỉ định xét nghiệm sàng lọc khác',
            Code: 'DGNCVKDK44'
          }
          errors.push(obj)
        }
      }
      if (errors.length) {
        this.hasErr = true
        this.handlerResponse({Error: errors})
      } else {
        this.hasErr = false
      }
    },
    handleChange () {
      if (this.MASTERDATA['DGNCVKDK07']) {
        if (this.MASTERDATA['DGNCVKDK07'].Items[0].Value ||
        this.MASTERDATA['DGNCVKDK07'].Items[1].Value ||
        this.MASTERDATA['DGNCVKDK07'].Items[2].Value ||
        this.MASTERDATA['DGNCVKDK07'].Items[3].Value ||
        this.MASTERDATA['DGNCVKDK07'].Items[4].Value ||
        this.MASTERDATA['DGNCVKDK07'].Items[5].Value ||
        this.MASTERDATA['DGNCVKDK07'].Items[6].Value ||
        this.MASTERDATA['DGNCVKDK07'].Items[7].Value ||
        this.MASTERDATA['DGNCVKDK07'].Items[8].Value) {
          this.MASTERDATA['DGNCVKDK07'].Items[9].Value = false
          this.MASTERDATA['DGNCVKDK07'].Items[10].Value = false
        }
      }
    },
    handleChange2 () {
      if (this.MASTERDATA['DGNCVKDK07']) {
        if (this.MASTERDATA['DGNCVKDK07'].Items[9].Value ||
        this.MASTERDATA['DGNCVKDK07'].Items[10].Value) {
          this.MASTERDATA['DGNCVKDK07'].Items[0].Value = false
          this.MASTERDATA['DGNCVKDK07'].Items[1].Value = false
          this.MASTERDATA['DGNCVKDK07'].Items[2].Value = false
          this.MASTERDATA['DGNCVKDK07'].Items[3].Value = false
          this.MASTERDATA['DGNCVKDK07'].Items[4].Value = false
          this.MASTERDATA['DGNCVKDK07'].Items[5].Value = false
          this.MASTERDATA['DGNCVKDK07'].Items[6].Value = false
          this.MASTERDATA['DGNCVKDK07'].Items[7].Value = false
          this.MASTERDATA['DGNCVKDK07'].Items[8].Value = false
        }
      }
    },
    handleChange3 () {
      if (this.MASTERDATA['DGNCVKDK19']) {
        if (this.MASTERDATA['DGNCVKDK19'].Items[0].Value ||
        this.MASTERDATA['DGNCVKDK19'].Items[1].Value ||
        this.MASTERDATA['DGNCVKDK19'].Items[2].Value ||
        this.MASTERDATA['DGNCVKDK19'].Items[3].Value ||
        this.MASTERDATA['DGNCVKDK19'].Items[4].Value ||
        this.MASTERDATA['DGNCVKDK19'].Items[5].Value ||
        this.MASTERDATA['DGNCVKDK19'].Items[6].Value ||
        this.MASTERDATA['DGNCVKDK19'].Items[7].Value ||
        this.MASTERDATA['DGNCVKDK19'].Items[8].Value ||
        this.MASTERDATA['DGNCVKDK19'].Items[9].Value) {
          this.MASTERDATA['DGNCVKDK19'].Items[10].Value = false
        }
      }
    },
    checkData () {
      if (this.MASTERDATA['DGNCVKDK35']) {
        if (!this.MASTERDATA['DGNCVKDK35'].Items[0].Value) {
          this.MASTERDATA['DGNCVKDK35'].Items[2].Value = false
          this.MASTERDATA['DGNCVKDK35'].Items[3].Value = false
          this.MASTERDATA['DGNCVKDK35'].Items[4].Value = false
          this.MASTERDATA['DGNCVKDK35'].Items[5].Value = false
          this.MASTERDATA['DGNCVKDK35'].Items[6].Value = false
          this.MASTERDATA['DGNCVKDK35'].Items[7].Value = false
          this.MASTERDATA['DGNCVKDK35'].Items[8].Value = ''
        }
        if (!this.MASTERDATA['DGNCVKDK35'].Items[7].Value) {
          this.MASTERDATA['DGNCVKDK35'].Items[8].Value = ''
        }
      }
    },
    handleSave (showDoctorConfirm) {
      this.handleSubmit('confirm')
      showDoctorConfirm(this.hasErr)
    },
    confirmSuccess () {
      setTimeout(() => {
        this.isReadOnly = this.readonly || this.IsLock24h || (this.DataSubmit && this.DataSubmit.ConfirmInfos && this.DataSubmit.ConfirmInfos.length && this.DataSubmit.ConfirmInfos[0].ConfirmAt) || (this.$refs.Confirm && this.$refs.Confirm._data.dataConfirm)
      }, 100)
    },
    handleBack () {
      if (this.edited) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn btn-warning',
            handler: () => {
              // this.back()
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
.bg-white {
  background: #fff!important;
}
.md-radio-label {
  color: red;
}
.error {
  border: 1px solid red!important;
}
</style>
