<template>
 <div class="main-content">
  <template v-if="loaded">
   <!-- <h3 class="text-center">{{__t('Bảng sàng lọc nguy cơ tự hại')}}</h3> -->
   <div class="sync-ed-box" v-if="DataSubmit">
    <table class="standing-order-tbl">
     <tr>
      <td class="bg-head b-b-2" colspan="2">
       <label class="mr-5">{{ __t("Thời gian sàng lọc") }}: </label
       ><VDateTimePicker
        :readonly="isReadonly"
        :noclearable="true"
        :hideTooltip="true"
        class="w1510 display-inline"
        :format="'HH:mm DD/MM/YYYY'"
        v-model="DataSubmit.ScreeningTime"
       />
      </td>
      <td colspan="3">
       <template v-if="syncDatas">
        <button class="btn btn-sync-data pull-right" @click="syncData();">
         {{ __t("Lấy dữ liệu đánh giá gần nhất") }}
        </button>
       </template>
      </td>
     </tr>
     <tr>
      <td class="bg-head font-bold" width="20px">{{ __t("STT") }}</td>
      <td class="bg-head font-bold">{{ __t("Câu hỏi") }}</td>
      <td class="bg-head font-bold text-center" colspan="3">
       {{ __t("Trả lời") }}
      </td>
     </tr>
     <tr v-if="MASTERDATA['EDSHRSTIHDE']">
      <td>1</td>
      <td>{{ __label(MASTERDATA["EDSHRSTIHDE"]) }}</td>
      <td v-if="isReadonly" colspan="2" class="text-center">
       <MDRadioView :data="MASTERDATA['EDSHRSTIHDE'].Items" />
      </td>
      <template v-else>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2();"
         :noFlex="true"
         :indexs="[0]"
         v-model="MASTERDATA['EDSHRSTIHDE']"
        />
       </td>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2();"
         :noFlex="true"
         :indexs="[1]"
         v-model="MASTERDATA['EDSHRSTIHDE']"
        />
       </td>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2();"
         :noFlex="true"
         :indexs="[2]"
         v-model="MASTERDATA['EDSHRSTIHDE']"
        />
       </td>
      </template>
     </tr>
     <tr v-if="MASTERDATA['EDSHRSTIHYU']">
      <td>2</td>
      <td>{{ __label(MASTERDATA["EDSHRSTIHYU"]) }}</td>
      <td v-if="isReadonly" colspan="2" class="text-center">
       <MDRadioView :data="MASTERDATA['EDSHRSTIHYU'].Items" />
      </td>
      <template v-else>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2();"
         :noFlex="true"
         :indexs="[0]"
         v-model="MASTERDATA['EDSHRSTIHYU']"
        />
       </td>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2();"
         :noFlex="true"
         :indexs="[1]"
         v-model="MASTERDATA['EDSHRSTIHYU']"
        />
       </td>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2();"
         :noFlex="true"
         :indexs="[2]"
         v-model="MASTERDATA['EDSHRSTIHYU']"
        />
       </td>
      </template>
     </tr>
     <tr v-if="MASTERDATA['EDSHRSTIWWHY']">
      <td>3</td>
      <td>{{ __label(MASTERDATA["EDSHRSTIWWHY"]) }}</td>
      <td v-if="isReadonly" colspan="2" class="text-center">
       <MDRadioView :data="MASTERDATA['EDSHRSTIWWHY'].Items" />
      </td>
      <template v-else>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2();"
         :noFlex="true"
         :indexs="[0]"
         v-model="MASTERDATA['EDSHRSTIWWHY']"
        />
       </td>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2();"
         :noFlex="true"
         :indexs="[1]"
         v-model="MASTERDATA['EDSHRSTIWWHY']"
        />
       </td>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2();"
         :noFlex="true"
         :indexs="[2]"
         v-model="MASTERDATA['EDSHRSTIWWHY']"
        />
       </td>
      </template>
     </tr>
     <tr v-if="MASTERDATA['EDSHRSTHYET']">
      <td :rowspan="MASTERDATA['EDSHRSTHYET'].Items[0].Value ? 3 : 1">4</td>
      <td>{{ __label(MASTERDATA["EDSHRSTHYET"]) }}</td>
      <td v-if="isReadonly" colspan="2" class="text-center">
       <MDRadioView :data="MASTERDATA['EDSHRSTHYET'].Items" />
      </td>
      <template v-else>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2('EDSHRSTHYET');"
         :noFlex="true"
         :indexs="[0]"
         v-model="MASTERDATA['EDSHRSTHYET']"
        />
       </td>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2('EDSHRSTHYET');"
          @change="resetData();"
         :noFlex="true"
         :indexs="[1]"
         v-model="MASTERDATA['EDSHRSTHYET']"
        />
       </td>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2('EDSHRSTHYET');"
         :noFlex="true"
         :indexs="[2]"
         v-model="MASTERDATA['EDSHRSTHYET']"
        />
       </td>
      </template>
     </tr>
     <template v-if="MASTERDATA['EDSHRSTHYET'].Items[0].Value">
      <tr>
       <td colspan="4">
        {{ __label(MASTERDATA["EDSHRST0IYH"]) }}:
        <MdRextarea
         :readonly="isReadonly"
         v-model="MASTERDATA['EDSHRST0IYH'].Items[0]"
        />
       </td>
      </tr>
      <tr>
       <td colspan="4">
        {{ __label(MASTERDATA["EDSHRST000W"]) }}
        <MdRextarea
         :readonly="isReadonly"
         v-model="MASTERDATA['EDSHRST000W'].Items[0]"
        />
        <!--
         <input class="form-control" :readonly="isReadonly" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDSHRST000W'].Items[0].Value"/>
        -->
       </td>
      </tr>
     </template>
     <tr v-if="ifPatientAnswersYes" id="EDSHRSTAYGY">
      <td
       :rowspan="
        MASTERDATA['EDSHRSTAYGY'].Items[2].Value ||
        MASTERDATA['EDSHRSTAYGY'].Items[0].Value
         ? 2
         : 1
       "
      >
       5
      </td>
      <td>{{ __label(MASTERDATA["EDSHRSTAYGY"]) }} <span required>*</span></td>
      <td v-if="isReadonly" colspan="2" class="text-center">
       <MDRadioView :data="MASTERDATA['EDSHRSTAYGY'].Items" />
      </td>
      <template v-else>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2();"
         :noFlex="true"
         :indexs="[0]"
         v-model="MASTERDATA['EDSHRSTAYGY']"
        />
       </td>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2();"
         :noFlex="true"
         :indexs="[1]"
         v-model="MASTERDATA['EDSHRSTAYGY']"
        />
       </td>
       <td class="text-center">
        <MDRadio
         @onChange="setIPDIAAUITV2();"
         :noFlex="true"
         :indexs="[2]"
         v-model="MASTERDATA['EDSHRSTAYGY']"
        />
       </td>
      </template>
     </tr>
     <tr
      v-if="
       MASTERDATA['EDSHRSTAYGY'].Items[2].Value ||
        MASTERDATA['EDSHRSTAYGY'].Items[0].Value
      "
     >
      <td colspan="4">
       {{ __t("Nhập lý do") }}:
       <MdRextarea
        :readonly="isReadonly"
        v-model="MASTERDATA['EDSHRSTAYGY'].Items[3]"
       />
      </td>
     </tr>
     <tr>
      <td colspan="5">
       <b>{{ __label(MASTERDATA["EDSHRST00SR"]) }}:</b>
       <MDRadio :readonly="true" v-model="MASTERDATA['EDSHRST00SR']" />
      </td>
     </tr>
     <tr>
      <td colspan="5">
       <p>
        <i>{{ __label(MASTERDATA["EDSHRSTNOTE1"]) }}</i>
       </p>
       <p>
        <i>{{ __label(MASTERDATA["EDSHRSTNOTE2"]) }}</i>
       </p>
      </td>
     </tr>
    </table>

    <br />
    <br />
    <br />
     <div class="row">
      <div class="col-md-4 col-sm-4 text-center"></div>
      <div class="col-md-4 col-sm-4 text-center"></div>
      <div v-if="!isReadonly" class="col-md-4 col-sm-4 text-center">
       <template v-if="isConfirm">
        <p>{{ DataSubmit.ConfirmAt }}</p>
        <eform-signature :ad="DataSubmit.ConfirmBy" :title="'Bác sĩ/ Doctor'" />
       </template>
       <template>
        <p><b>Bác sĩ/ </b><i>Doctor</i></p>
        <p v-if="!isConfirm">
         <button @click="showDoctorConfirm();" class="btn v-white-btn">
          {{ __t("Xác nhận") }}
         </button>
        </p>
       </template>
      </div>
      <div v-else class="col-md-4 col-sm-4 text-center">
       <template v-if="isConfirm">
        <p>{{ DataSubmit.ConfirmAt }}</p>
        <eform-signature :ad="DataSubmit.ConfirmBy" :title="'Bác sĩ/ Doctor'" />
       </template>
       <template v-else>
        <p><b>Bác sĩ/ </b><i>Doctor</i></p>
       </template>
      </div>
     </div>
    <br />
    <br />
    <br />
    <logs :EdId="this.$route.params.Id" :Type="'SelfHarmRiskScreeningTool'" />
    <p>A01_220_210121_VE</p>
    <br />
    <br />
    <modal
     name="doctorConfirm"
     transition="pop-out"
     id="doctor-login"
     height="auto"
     :clickToClose="false"
    >
     <div class="box v-model-content-popup">
      <div class="box-header text-center">
       <h3 class="box-title">{{ __t("Bác sĩ xác nhận") }}</h3>
       <div style="color: #fff">
        {{ __t("Vui lòng nhập tài khoản ad để xác nhận") }}
       </div>
      </div>
      <div class="form-confirm">
       <div class="form-group has-feedback">
        <input
         v-model="user.username"
         type="text"
         class="form-control"
         :placeholder="__t('Tên đăng nhập')"
        />
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
       </div>
       <div class="form-group has-feedback">
        <input
         v-model="user.password"
         type="password"
         class="form-control current-password"
         :placeholder="__t('Mật khẩu')"
        />
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
       </div>
       <div class="row">
        <div class="col-xs-6">
         <button
          type="button"
          class="btn btn-block v-white-btn"
          @click="$modal.hide('doctorConfirm');"
         >
          {{ __t("Thoát") }}
         </button>
        </div>
        <div class="col-xs-6">
         <button
          type="button"
          class="btn btn-block v-yellow-btn"
          @click="confirm();"
         >
          {{ __t("Xác nhận") }}
         </button>
        </div>
       </div>
       <p style="margin-top: 10px; text-align:center">
        {{ __t("Sử dụng tài khoản máy tính") }}
       </p>
       <p style="margin-top: 10px; text-align:center">
        {{
         __t(
          "Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu"
         )
        }}
       </p>
      </div>
     </div>
    </modal>
    <FloatBlock :openBack="true" @handleBack="handleBack">
     <template slot="buttons">
      <div class="col-md-2 col-sm-2"><div class="form-group1"></div></div>
      <div v-if="!isReadonly" class="col-md-4 col-sm-4"></div>
      <div v-if="!isReadonly" class="col-md-6 col-sm-6">
       <div class="form-group1">
        <button
        v-if="!isReadonly"
         class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
         type="button"
         v-shortkey="['ctrl', 's']"
         @shortkey="submit();"
         @click="submit();"
        >
         <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ __t("btn.luu") }}
        </button>
       </div>
      </div>
     </template>
    </FloatBlock>

   </div>
   <!--
    <div class="text-center" v-else>
      <p>{{__t('Chưa có Bảng sàng lọc nguy cơ tự hại')}}</p>
      <button class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button>
    </div>
   -->
  </template>
  <div v-else class="loading-text"><v-loading /></div>
 </div>
</template>
<script>
// import SelfHarmRiskScreeningTool from '@/services/ED/SelfHarmRiskScreeningTool'
import SelfHarmRiskScreeningToolService from '@/services/IPD/CoronaryIntervention/SelfHarmRiskScreeningToolService'
import MixinForm from '@/mixins/form.js'
import MixinMasterData from '@/mixins/masterdata.js'
import NProgress from 'nprogress'
import Logs from '@/components/Logs.vue'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import $ from 'jquery'
export default {
  name: 'SelfHarmRiskScreeningTool',
  mixins: [MixinForm, MixinMasterData],
  props: ['VisitId', 'VisitType', 'viewOnly', 'formId', 'checkReadonly'],
  data () {
    return {
      TitleForm: 'Bảng sàng lọc nguy cơ tự hại',
      loaded: false,
      DataSubmit: null,
      user: {},
      dataMaster: [],
      isConfirm: false,
      syncDatas: null
    }
  },
  components: {
    VDateTimePicker, Logs
  },
  computed: {
    isNew: function () {
      return !this.isReadonly && this.DataSubmit && this.DataSubmit.CreatedAt === this.DataSubmit.UpdatedAt
    },
    //  && this.DataSubmit.CreatedAt === this.DataSubmit.UpdatedAt
    isReadonly: function () {
      return this.DataSubmit.ConfirmBy || this.readonly || this.$route.name !== 'IPDSelfHarmRiskScreeningToolEDItem' || this.viewOnly
    },
    ifPatientAnswersYes: function () {
      return this.MASTERDATA['EDSHRSTIHDE'].Items[0].Value || this.MASTERDATA['EDSHRSTIHYU'].Items[0].Value || this.MASTERDATA['EDSHRSTIWWHY'].Items[0].Value || this.MASTERDATA['EDSHRSTHYET'].Items[0].Value ||
      this.MASTERDATA['EDSHRSTIHDE'].Items[2].Value || this.MASTERDATA['EDSHRSTIHYU'].Items[2].Value || this.MASTERDATA['EDSHRSTIWWHY'].Items[2].Value || this.MASTERDATA['EDSHRSTHYET'].Items[2].Value
    },
    _ItemId: function () {
      return this.formId || this.$route.params.Item
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'EDSHRST'}, () => {
      this.getData()
    })
  },
  watch: {
    formId: function () {
      this.getMasterDatas({Form: 'EDSHRST'}, () => {
        this.getData()
      })
    }
  },
  methods: {
    handleBack () {
      this.edited = false
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    // popup canh bao
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
    },
    syncData () {
      this.DataSubmit.Datas = this.syncDatas.Datas
      this.mapMdData2Data()
    },
    setIPDIAAUITV2 (code) {
      if (code === 'EDSHRSTHYET') {
        this.MASTERDATA['EDSHRST0IYH'].Items[0].Value = ''
        this.MASTERDATA['EDSHRST000W'].Items[0].Value = ''
      }
      // setTimeout(() => {
      //   if (this.MASTERDATA['EDSHRSTHYET'].Items[0].Value || this.MASTERDATA['EDSHRSTHYET'].Items[1].Value || this.MASTERDATA['EDSHRSTHYET'].Items[2].Value) {
      //     console.log('o')
      //     this.MASTERDATA['EDSHRST0IYH'].Items[0].Value = ''
      //     this.MASTERDATA['EDSHRST000W'].Items[0].Value = ''
      //   }
      // }, 100)
      setTimeout(() => {
        var isNegative = this.MASTERDATA['EDSHRSTIHDE'].Items[1].Value &&
                        this.MASTERDATA['EDSHRSTIHYU'].Items[1].Value &&
                        this.MASTERDATA['EDSHRSTIWWHY'].Items[1].Value &&
                        this.MASTERDATA['EDSHRSTHYET'].Items[1].Value
        var isHighRisk = !isNegative && (this.MASTERDATA['EDSHRSTAYGY'].Items[0].Value || this.MASTERDATA['EDSHRSTAYGY'].Items[2].Value)
        this.MASTERDATA['EDSHRST00SR'].Items[0].Value = isNegative
        this.MASTERDATA['EDSHRST00SR'].Items[1].Value = !isNegative && isHighRisk && this.ifPatientAnswersYes
        this.MASTERDATA['EDSHRST00SR'].Items[2].Value = !isNegative && !isHighRisk && this.ifPatientAnswersYes
      }, 200)
    },
    create () {
      new SelfHarmRiskScreeningToolService().update('/Create/' + this.$route.params.Id + '/' + this._ItemId, {}).then(response => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    validateForm () {
      $('.error').removeClass('error')
      var error = []
      if (this.ifPatientAnswersYes && !this.MASTERDATA['EDSHRSTAYGY'].Items.find(e => e.Value)) {
        error.push(this.MASTERDATA['EDSHRSTAYGY'])
      }
      if (error.length) {
        this.handlerResponse({Error: error})
      }
    },
    getSyncData () {
      new SelfHarmRiskScreeningToolService({hidemsg: true}).find('Sync/' + this.DataSubmit.Id).then(response => {
        this.syncDatas = response
        console.log('res', this.syncDatas)
        setTimeout(() => {
          this.loaded = true
        }, 500)
      }).catch(e => {
        console.log(e)
        this.loaded = true
      })
    },
    getData () {
      const id = this.VisitId ? this.VisitId : this.$route.params.Id
      new SelfHarmRiskScreeningToolService({hidemsg: true}).find(id + '/' + this._ItemId).then(response => {
        this.DataSubmit = response
        this.isConfirm = !!this.DataSubmit.ConfirmAt
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        this.mapMdData2Data()
        setTimeout(() => {
          this.loaded = true
          if (this.isNew) {
            this.getSyncData()
          }
        }, 500)
      }).catch(e => {
        console.log(e)
        this.loaded = true
      })
    },
    async submit () {
      this.validateForm()
      NProgress.start()
      this.mapData2MDData()
      var DataSubmit = Object.assign({}, this.DataSubmit)
      await new SelfHarmRiskScreeningToolService().update('/Update/' + this.$route.params.Id + '/' + this._ItemId, DataSubmit).then(response => {
        this.toastedSuccess()
        this.getData()
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    async confirm () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        await this.submit()
      }
      new SelfHarmRiskScreeningToolService().update('/Confirm/' + this.$route.params.Id + '/' + this._ItemId, this.user).then(response => {
        this.reload()
        this.$modal.hide('doctorConfirm')
      }).catch(e => {
        // this.back()
      })
    },
    showDoctorConfirm () {
      this.$modal.show('doctorConfirm')
    }
  }
}
</script>
